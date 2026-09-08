---
status: DRAFT
title: "Dispatch and outcome classification"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `control/dispatch.py`, `control/events.jsonl`, `skills/handoff/SKILL.md`, `skills/cross-repo-dispatch/SKILL.md`, `.claude/agents/feature-lead.md`, `docs/ARCHITECTURE.md`, `standards/evaluation-doctrine.md`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# Dispatch and outcome classification

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

`control/dispatch.py` is 345 lines and is described in the tree as *"the one substantial new
component"* (`README.md` layout table) and *"345 lines of novel code"*
(`fractal/STRATEGIST-loomwarp.md` FM-1). It has two subcommands, `run` and `reset`.

Its governing rule is stated in its own module docstring: classify the outcome **"WITHOUT trusting
the process exit code."**

---

## 1. `run` — the loop

```
router.py next  →  parse stdout  →  for each ready workstream:
   read prd + context_bundle  →  assemble prompt
   target_mode == "headless"  →  spawn, wait, classify, write evidence, maybe update state
   otherwise                  →  write the prompt to a file, print a command, log, return "PRINTED"
```

**The ready list is recovered by regex over another program's human-readable output.**
`router_next` runs `router.py … next`, captures stdout, and applies
`re.findall(r"->\s+(\S+)\s+\[model", result.stdout)`. The router's `cmd_next` prints
`  -> {name}  [model: {model}]`; the extraction depends on that exact spacing and on the literal
`[model` following the name. The router's own docstring for that command describes different output
— *"Prints the names of all ready workstreams to stdout, one per line"* — which would not match.

## 2. The assembled prompt

`assemble_prompt` produces three parts in order:

1. **A background-agent guard**, hard-coded in the function. It names the mode
   (*"assume BACKGROUND AGENT mode"*), forbids one call (*"Do **not** call `ask_followup_question` —
   no human is attached to this session and the call will hang forever with no responder"*), and
   states the escalation contract: on genuine ambiguity or *"a second consecutive build/lint/test
   failure"*, emit a PULSE with `escalation_needed: true` and stop.
2. **The context bundle**, each file wrapped as `--- {path} ---` followed by its whole text.
3. **The PRD**, wrapped as `--- PRD ---`.

The whole thing is passed as a single `-p` argument. Nothing is truncated, hashed, or recorded — the
resolved context set exists only inside that argv string, which is not persisted for a headless run.
For `target_mode: human` it *is* persisted, to `control/.assembled/{feature_lead}.md`, which is
gitignored.

## 3. The two invocations

| | headless | human |
|---|---|---|
| Built by | `dispatch_headless` | `dispatch_human` |
| Binary | `resolve_claude_binary()` — `LOOMWARP_CLAUDE_BIN`, else `shutil.which("claude")`, else `~/.claude/local/claude` | the shell's own `claude` alias, in a person's terminal |
| Flags | `-p`, `--agent`, `--permission-mode bypassPermissions`, `--output-format json`, `--max-budget-usd` | `-p`, `--agent`, `--permission-mode acceptEdits` |
| Bounded by | `timeout=LOOMWARP_DISPATCH_TIMEOUT_SEC` (default 600) | nothing |
| Returns | one of four outcomes | the literal string `PRINTED` |

`resolve_claude_binary()` exists because `subprocess.run` with an argument list does not go through
a shell, and *"`claude` is frequently a shell ALIAS… so a bare 'claude' silently raises
FileNotFoundError."* It raises with an actionable message rather than failing at dispatch time.

**`--permission-mode` is a literal, not a field.** `bypassPermissions` is written into the argument
list; no blueprint field, environment variable or policy file changes it. The code carries the
reason as a comment tagged `ADR-005`:

> `bypassPermissions` is the confirmed-working path for tonight's live dispatch — but it also skips
> the tier-3 DENY rules, which is a real, named limitation, not a solved problem.

`docs/ARCHITECTURE.md`'s dispatch-sequence diagram labels the same arrow
`claude -p --agent feature-lead --permission-mode acceptEdits`. The diagram and the code disagree;
the code is what runs. The repository's own `docs/BUILD-LOG.md` records the same gap in prose and
`STRATEGIST-loomwarp.md` names it as failure mode **FM-2, "policy theater"**, whose stated guard is
*"`bypassPermissions` banned by a mechanical check, not a convention."* No such check exists in the
tree.

**The budget is one number, declared unmeasured.** `MAX_BUDGET_USD` reads
`LOOMWARP_DISPATCH_MAX_BUDGET`, default `"5"`, passed as `--max-budget-usd`. The module docstring:
*"this is a starting point, not a measured value; re-tune it from the actual spike run's real cost."*

---

## 4. `classify()` — the four outcomes, and the two regexes

```python
def classify(repo_path, kebab):
    h = handoff_path(repo_path, kebab)
    if os.path.exists(h):
        content = open(h).read()
        any_fail = bool(re.search(r"\|\s*FAIL\s*\|", content))
        any_pass = bool(re.search(r"\|\s*PASS\b[^|]*\|", content))
        if any_pass and not any_fail:
            return "COMPLETE", content
        if any_fail:
            return "FAILED", content
    p = pulse_path(repo_path, kebab)
    if os.path.exists(p) and router_pulse_alert(p):
        return "BLOCKED", open(p).read()
    return None, None
```

| Outcome | Condition | Effect |
|---|---|---|
| `COMPLETE` | a `HANDOFF.md` exists, `any_pass` and not `any_fail` | **the only outcome that calls `router.py update`** |
| `FAILED` | a `HANDOFF.md` exists and `any_fail` | evidence written, state untouched |
| `BLOCKED` | no HANDOFF verdict, and `router.py pulse` prints `HEARTBEAT_ALERT` | evidence written, state untouched |
| `UNKNOWN` | none of the above | evidence written, state untouched |

**The two regexes are not symmetric, and the asymmetry is the whole behaviour.**

- `any_pass` — `\|\s*PASS\b[^|]*\|` — matches a cell that *begins* with `PASS` and then allows any
  non-pipe text. `| PASS / FAIL / N/A |` matches. `| PASS (12/12) |` matches.
- `any_fail` — `\|\s*FAIL\s*\|` — matches only a cell whose entire content is `FAIL`.
  `| PASS / FAIL / N/A |` does not match. `| FAIL (2/10) |` does not match. `| **FAIL** |` does not
  match.

Three consequences follow, checked by running the shipped patterns against the shipped files at this
commit:

**A HANDOFF written from either template, with the placeholders left in, classifies as `COMPLETE`.**
`skills/handoff/SKILL.md` ships the row `| Lint | \`[project lint command]\` | PASS / FAIL | |`;
`.claude/agents/feature-lead.md` ships `| Lint | \`[lint cmd]\` | PASS/FAIL | |`. Both give
`any_pass = True, any_fail = False`. The first is a vendored skill distributed to every registered
sibling repository ([`05-skill-distribution-and-the-registry.md`](./05-skill-distribution-and-the-registry.md)).

**Both real HANDOFF files in the control repository classify as neither.** `.claude/fractal/
workstreams/vendor-provenance/HANDOFF.md` and `.../framework-v1/HANDOFF.md` write their verdicts as
`| **PASS** |`. The bold markers sit between the pipe and the word, so `any_pass` is `False` — and
with no FAIL cell either, `classify()` falls through to the PULSE check and then to `UNKNOWN`.

**A mixed result reports `COMPLETE`.** A HANDOFF whose build row reads `| PASS |` and whose test row
reads `| FAIL (2/10) |` satisfies `any_pass` and not `any_fail`.

### What the tree says the classifier does

Three documents describe this function, each using a word the code does not implement —
*standalone*:

| Source | Wording |
|---|---|
| `control/dispatch.py` module docstring | *"a real HANDOFF.md exists with a standalone \"PASS\" table cell and no \"FAIL\" cell"* |
| `docs/ARCHITECTURE.md` sequence diagram | *"HANDOFF.md with a standalone PASS cell, no FAIL cell"* |
| `skills/cross-repo-dispatch/SKILL.md` | *"a standalone `PASS` table cell with no `FAIL` cell is read as COMPLETE"* |

And `standards/evaluation-doctrine.md` §1, in the same repository, forbids the mechanism outright:

> **Never parse prose for structure.** Deriving pass/fail by pattern-matching a markdown table is
> brittle by construction — the word "FAIL" in a sentence flips the result. Emit structured evidence.

The observed behaviour inverts the doctrine's own example: the word `FAIL` inside a wider cell does
*not* flip the result, and the word `PASS` inside one does.

### The state vocabularies do not meet

`classify()` produces four outcomes; `router.py` accepts three statuses, none of which is `FAILED`,
`BLOCKED` or `UNKNOWN` ([`01-the-vendored-core.md`](./01-the-vendored-core.md) §1). Only `COMPLETE`
crosses. A workstream that returns `FAILED` stays `NOT_STARTED`, so the next `dispatch.py run`
re-dispatches it, with no attempt counter anywhere — against `evaluation-doctrine.md` §2's
*"Two-attempt maximum."* `IN_PROGRESS` is never written by any code path in either file.

---

## 5. Evidence written per headless run

Into `context/evidence/{feature_lead}/`:

| File | Content |
|---|---|
| `run.json` | `exit_code`, `duration_sec`, `stdout_tail` — the last 4000 characters of stdout |
| `{OUTCOME}.md` | the classifying text verbatim: the HANDOFF, the PULSE, or a generated line for `UNKNOWN` |

**stderr is not captured.** `subprocess.run(..., capture_output=True)` collects it and nothing reads
it. `ISSUE-004` records the cost directly — a bootstrap failure wrote `exit_code=1` with
`stdout_tail: ""`, and *"an evidence bundle that omits stderr on a non-zero exit is not evidence."*

**`timed_out` is inferred, not observed.** The `UNKNOWN` text is built as
`timed_out={exit_code is None}`. `exit_code` is only ever `None` on the `TimeoutExpired` branch, so
the field reports whether that branch ran — `OBS-005` records one run measured at 3874s against a
600s nominal cap that reported `timed_out=False`.

The whole directory is gitignored (`context/evidence/*`, with `!context/evidence/.gitkeep`), so at
this commit `context/evidence/` contains `.gitkeep` and nothing else.

---

## 6. `control/events.jsonl`

One JSON object per line, appended by `log_event`, which stamps `timestamp` itself as
`%Y-%m-%dT%H:%M:%SZ`. There is **no schema file for it anywhere in the repository**, against the same
doctrine's *"Every event validates against a schema. An unvalidated event stream is a log, not
evidence."*

Three shapes are emitted by the code:

| `type` | Emitted by | Fields |
|---|---|---|
| `dispatch_start` | `dispatch_headless` | `workstream`, `type`, `mode`, `repo` |
| `dispatch_end` | `dispatch_headless` | `workstream`, `type`, `mode`, `outcome`, `duration_sec`, `exit_code` |
| `dispatch_printed` | `dispatch_human` | `workstream`, `type`, `mode`, `repo`, `assembled_prompt` |

The file holds 13 lines at this commit, spanning 2026-08-04T01:37:29Z to 2026-08-05T00:17:52Z. Two of
them do not correspond to any code path in `dispatch.py`:

- `{"workstream": "FeatureLead-ActivityBadgeNotify", "type": "dispatch_end", "mode": "human",
  "outcome": "COMPLETE", "note": "executed as a dry run tonight…"}` — `dispatch_human` emits only
  `dispatch_printed` and returns `"PRINTED"`; no `log_event` call in the file has a `note` key.
- `FeatureLead-ToySpike` has two `dispatch_start` lines (01:37:29Z, 01:38:14Z) and one
  `dispatch_end`. Starts and ends are not paired by anything, and an interrupted run leaves an open
  start.

---

## 7. `reset` — what it clears, and what it does not

`cmd_reset` deletes `fractal/.state.json`, runs `git reset --hard && git clean -fd` in every
registered repo path that has a `.git` entry, removes every directory under `context/evidence/`, and
re-runs `router.py init`.

Two limits are printed by the command itself, and a third is in its docstring:

- *"`git clean -fd` also removes the synced skills/ (they're untracked in each sibling) — re-run
  `control/sync-skills.sh` after this."*
- *"does not close stray PRs/branches on GitHub — check `gh pr list` per sibling."*
- The `.git` check is `os.path.exists`, not `isdir`, *"A submodule's `.git` is a FILE (gitlink), not
  a directory"* — the inverted form silently skipped every sibling until it was corrected.

`reset` iterates the blueprint's own workstreams for repo paths, and `git reset --hard` is
unconditional on those paths. There is no confirmation prompt and no dry-run flag.
