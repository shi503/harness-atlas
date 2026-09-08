---
status: DRAFT
title: "FRACTAL — the consolidated guide"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 6398f6db (pinned) · @ 9905012 (HEAD, §8 only) · harness-atlas @ 7d1bb14"
version_at_capture: "6398f6db (2026-04-20)"
source_verified: "2026-09-08"
---

# FRACTAL — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `github.com/shi503/fractal-agent-system` at **`6398f6db`** (2026-04-20), **2026-09-08**.

One pass over the whole thing, for a reader with ten minutes. Every claim here is sourced in a numbered
document; this page carries the shape, not the field names.

---

## 1. The mental model

**FRACTAL is a filing system with one state machine attached.** A unit of work is a **workstream**: a
BLUEPRINT entry paired with a PRD file, decomposed by an Architect from a Strategist's intent document,
executed by a Feature Lead, closed by a HANDOFF. Nothing here runs a turn. The loop belongs entirely to
whatever harness session has the role file open; `router.py` starts no agent, holds no session, and
imports no `subprocess`.

**Two things move in opposite directions, and confusing them is the whole trap:**

- **State is mechanical, and it is thin.** `.state.json` is a flat map from agent name to one of three
  strings. `router.py next` resolves the ready set with zero LLM calls, exactly as advertised.
- **Evidence is prose, and it is thick.** The HANDOFF, the PULSE, the four evaluation templates, the
  file manifest, the acceptance criteria — every one of them is markdown a model writes and a model
  reads. Nothing parses any of it.

The router is genuinely deterministic about *which workstream may start*. It has no opinion whatsoever
about *whether the last one actually finished*. Both halves of that sentence are load-bearing.

---

## 2. The five things to know

1. **`router.py update … COMPLETE` checks two things: the name is a key in the state file, and the
   status is one of three strings.** It never looks for a HANDOFF, never reads a PRD, never re-runs a
   build. The word `HANDOFF` does not appear in the file. — [`04`](./04-router.md) §3
2. **`router.py init` re-run wipes every `COMPLETE` back to `NOT_STARTED`, silently, exit 0.** The
   prohibition is stated in four documents and guarded by no line of code — and `BEST-PRACTICES.md`
   records that it has already happened once in production. — [`04`](./04-router.md) §4
3. **The status vocabulary has no reject value.** `NOT_STARTED | IN_PROGRESS | COMPLETE`; `REJECTED`
   exits 1. The four-layer evaluation pipeline's reject path is expressible only as writing a
   workstream backwards. — [`06`](./06-the-evaluation-layers.md) §3
4. **The BLUEPRINT's `prd:` key is never read, and its `feature_lead` is the state key.** The
   dependency graph is over agent names; the document defining the work is a string nothing resolves.
   Two workstreams sharing a name collapse into one entry silently. — [`03`](./03-blueprint-and-workstream-prd.md) §1
5. **A PULSE file with no ```` ```json ```` fence reports `HEARTBEAT_OK`, and so does one whose latest
   heartbeat is three years old.** Silence and health are the same signal, and nothing measures the
   30-minute cadence the system asks for. — [`05`](./05-handoff-and-pulse.md) §4

---

## 3. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| Fix what the project is *for* | Strategist doc, ten sections | [`02`](./02-the-four-tiers.md) §4 |
| Declare which work can run in parallel | BLUEPRINT `dependencies` | [`03`](./03-blueprint-and-workstream-prd.md) §1 |
| Give a fresh session everything it needs | Workstream PRD, six sections | [`03`](./03-blueprint-and-workstream-prd.md) §2 |
| Advance the epic | `router.py next` / `update` | [`04`](./04-router.md) §1 |
| Record that work is done, with evidence | HANDOFF + Verification Evidence table | [`05`](./05-handoff-and-pulse.md) §1 |
| Raise a blocker without an LLM call | PULSE + `router.py pulse` | [`05`](./05-handoff-and-pulse.md) §2 |
| Judge a completed workstream | Layers 1–2, Architect-owned | [`06`](./06-the-evaluation-layers.md) §1 |
| Ask whether it was the right thing | Layers 3–4, Strategist-owned, non-blocking | [`06`](./06-the-evaluation-layers.md) §1 |
| Record a defect in the framework itself | `ISSUES.md` | [`06`](./06-the-evaluation-layers.md) §6 |
| Customise a role without forking it | `*.local.md` overlay — read the caveat first | [`02`](./02-the-four-tiers.md) §5 |
| Run it with no state machine at all | The un-routed layout | [`07`](./07-the-un-routed-instance.md) |

---

## 4. Enforcement, ordered

Four bands, and only the first is code:

1. **The state machine** — three transitions over a flat map, plus dependency resolution. Real,
   mechanical, and narrow.
2. **The command restrictions** — who may run `init`, `next`, `update`. Prose in the role files;
   nothing checks the caller.
3. **The evidence contract** — HANDOFF must exist, must carry pasted output, must not be written on a
   failing build. Prose in three templates that do not agree with each other.
4. **The evaluation layers** — a checklist, a copy-paste prompt, two persona templates. All markdown,
   filled in by hand, none invoked by anything.

**Band 1 is enforced by code. Bands 2–4 are enforced by an agent choosing to comply.** The system's own
most candid document says so about the sharpest case: *"`router.py update COMPLETE` without writing
HANDOFF.md produces no audit trail… You end up with a state file that says 'COMPLETE' but no record of
what was built, what wasn't, or whether the build passed."*

That is not a hidden defect; it is a stated boundary. What the tree does not contain is any statement of
where the boundary should sit — recorded as an absence in §5.

---

## 5. Where the documentation stops

Absences across this set, each naming what was checked:

- **No refusal list, and no non-goals section.** Checked `README.md`, `BEST-PRACTICES.md`,
  `The FRACTAL Multi-Agent System.md`, `SETUP-CLAUDE-CODE.md` and `docs/` for a heading of the form
  *will not / does not / non-goals / out of scope*. `README.md`'s *"When to Use FRACTAL"* names when
  the overhead is not worth paying — *"Skip it for: single-file fixes, small features, tasks under ~2
  hours"* — which is a fit statement, not a refusal.
- **No positioning copy at all.** What was checked is in [`00`](./00-README.md).
- **No tests for `router.py`.** No `test_*.py`, `*_test.py`, `tests/` or `conftest.py` anywhere in the
  tree; the only CI at the pinned commit is `.github/dependabot.yml`. The one piece of code in the
  system is unexercised by anything but use.
- **No cost, budget or token accounting.** Grepped the whole tree for budget, spend and cost-cap
  vocabulary; the only hits are the Strategist intake folder's reading budget for *its own* context
  window, which is a word count in a README, not a runtime control.
- **No logging, event stream or observability object.** `router.py` was read in full: every output is
  `print()` to stdout and the only file written is `.state.json`.
- **No concurrency control.** `save_state` is a plain truncating write. Two Feature Leads calling
  `update` at once race; nothing in the tree mentions it.
- **No attempt counter behind the 2-attempt retry policy.** Checked the state file's shape, all three
  HANDOFF templates and `router.py`. `BEST-PRACTICES.md` §6 names the consequence in passing.
- **No hook system of FRACTAL's own.** Grepped for lifecycle-hook vocabulary; the hits are the bundled
  Next.js demo's React hooks and a `webhooks/` directory in its example tree.
- **No threat-model or trust-boundary statement.** Checked `README.md`, `BEST-PRACTICES.md`,
  `docs/permissions-guide.md` and `docs/soc2-compliance.md`. The nearest is the README's
  *"HUMAN ONLY"* note advising caution before enabling `--dangerously-skip-permissions`.

---

## 6. Where a document and the code disagree

Self-authored markdown states intent in the present tense as though it were implemented. Each row below
was checked against the source tree; **the code column is what happens.** No row is a verdict.

| The document says | The code does | Where |
|---|---|---|
| *"HANDOFF evaluation is an approval gate"*; the state advances on evidence | `cmd_update` checks a dict key and a string, then writes. Reproduced: `NOT_STARTED → COMPLETE` succeeds in a directory containing no HANDOFF, no PULSE and no `workstreams/` at all | [`04`](./04-router.md) §3 |
| *"Feature Leads must never run `router.py init`"* — stated four times | No guard, no prompt, no backup. Re-running wipes every `COMPLETE`, exit 0. Reproduced | [`04`](./04-router.md) §4 |
| *"`feature_lead` names must be unique across the entire blueprint"* | Duplicates collapse into one state key. Reproduced: a two-workstream BLUEPRINT initialises *"with 1 workstreams"* | [`04`](./04-router.md) §5 |
| Layer 1 and Layer 2 *"Blocks HANDOFF? **Yes**"*; the diagram shows *"reject (max 2x)"* | No status can express a rejection. `REJECTED` exits 1. Reproduced | [`06`](./06-the-evaluation-layers.md) §3 |
| *"emit a heartbeat… every 30 minutes"*; PULSE is the escalation trail | Nothing measures elapsed time — a 2023 timestamp reads `HEARTBEAT_OK` — and only the **last** JSON block is parsed, so an earlier escalation disappears. Both reproduced | [`05`](./05-handoff-and-pulse.md) §4 |
| The install is `cp -r ./example-claude ./.claude`, then `python3 .claude/fractal/router.py status` | The payload directory is tracked as `example-claude/FRACTAL/`. 58 path references inside that payload say lowercase `fractal/`; three say `FRACTAL/` | [`01`](./01-install-and-repository-layout.md) §3 |
| *"FRACTAL supports an overlay mechanism"* (`*.local.md`), present tense | FRACTAL ships nothing that performs it; the appending is attributed to the host harness. A second document in the same tree calls it *"Speculative — no direct source evidence"* | [`02`](./02-the-four-tiers.md) §5 |
| *"The template includes a §5 Deterministic Eval section. Require Feature Leads to fill it in"* | Only `docs/HANDOFF.md` has a §5. The two templates a Feature Lead follows carry a Verification Evidence table instead, and the three section lists do not match | [`05`](./05-handoff-and-pulse.md) §1 |
| *"Mark COMPLETE only after HANDOFF accepted"* — in six documents | Both agent-facing execution paths mark COMPLETE in the same block that writes the HANDOFF, before any evaluation. The code accepts either order and the state file cannot tell them apart | [`06`](./06-the-evaluation-layers.md) §3 |
| *"No PULSE artifacts = no escalation trail"* | The shipped `.gitignore` excludes `workstreams/*/PULSE.md` and `workstreams/*/HANDOFF.md`. The trail exists on one machine | [`01`](./01-install-and-repository-layout.md) §5 |
| *"skills/ # fractal-init, pulse, handoff, gap-analysis, commit-summarize"* — five | The installable payload ships six; the repository's own tree has seven. Two of the seven use a different frontmatter shape from the other five | [`01`](./01-install-and-repository-layout.md) §2 |
| Three example PRDs and the required PRD template end with *"/pulse … /handoff"* | The framework's own default is background-agent mode, where *"skills cannot fire… just text, not an execution"* — and its anti-pattern table lists assuming otherwise | [`05`](./05-handoff-and-pulse.md) §5 |
| `docs/HANDOFF.md` and `ROUTING_LOGIC/README.md` open *"This file is machine-readable. Do not edit manually."* | Neither is read by any program. Both are hand-maintained prose | [`05`](./05-handoff-and-pulse.md) §1 |

One more, not a code disagreement but a source one: **the profile's recorded upstream HEAD could not be
reproduced.** `content/fractal.md` records HEAD as `60393054` on 2026-09-03, *"29 commits past the
pinned read"*, carrying four directories and a marketplace install path. On 2026-09-08 `origin/main` is
`9905012`, **four** commits past the pinned read, none of those directories exists, and
`git cat-file -t 60393054` reports *"Not a valid object name"* against a full clone with all
pull-request refs fetched. Both reads are carried with their dates; neither is adjusted.

---

## 7. The stated intents, walked against what this set documented

The ledger in [`00-README.md`](./00-README.md) records what FRACTAL's own markdown says it is for. This
walks each to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, or records that
nothing was found and says what was checked, or says the claim falls outside this set's scope. There is
no verdict column and none is implied.

| Stated intent, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"a hierarchical framework for orchestrating teams of AI agents"* | Four role files with fixed responsibilities and stated prohibitions — [`02`](./02-the-four-tiers.md) §1–2 |
| *"It addresses context drift"* | The workstream PRD as the sole context a fresh session receives, with an exhaustive read/write manifest — [`03`](./03-blueprint-and-workstream-prd.md) §2 |
| *"…serialization of parallel work"* | `dependencies` in the BLUEPRINT and `router.py next`'s ready-set resolution — [`03`](./03-blueprint-and-workstream-prd.md) §1, [`04`](./04-router.md) §1 |
| *"…and cost inefficiency"* | Per-role model assignment in agent frontmatter, plus the recommended tiers — [`02`](./02-the-four-tiers.md) §1. **No spend mechanism found**; checked `router.py` in full, the agent files, the BLUEPRINTs and the whole tree for budget and cost-cap vocabulary. The `model:` field is a hint the router prints and does not act on |
| *"Flow control lives in Python (`router.py`), not in LLM prompts"* | Five commands, zero LLM calls, over a flat state map — [`04`](./04-router.md) §1–2. The flow it controls is which workstream may start; §6 records what it does not control |
| *"Hard Context Resets — Each agent starts with a clean, well-defined context file"* | The PRD's required sections and file manifest — [`03`](./03-blueprint-and-workstream-prd.md) §2; the Sub-Agent's *"You have no context beyond what you are given in this session"* — [`02`](./02-the-four-tiers.md) §2. Delivered by dispatch convention; nothing enforces that a session was started clean |
| *"Four tiers with explicit model assignments. Match model cost to task complexity"* | `model:` in agent frontmatter and on each BLUEPRINT workstream — [`02`](./02-the-four-tiers.md) §1. Both are author-time text fields |
| *"Tool Trace as Truth — Evaluation is based on actual build/lint/test output, not agent self-reporting"* | The Verification Evidence table and Layer 1's checklist — [`05`](./05-handoff-and-pulse.md) §1, [`06`](./06-the-evaluation-layers.md) §2. The table is the Feature Lead's own transcription; the stated check on it is the Architect re-running the commands in a second session, which is a person or a model, not code |
| *"the system is predictable and… agents remain focused on assigned tasks"* | Predictability: the state machine, §1. Focus: the file manifest and the *"do not touch files not listed"* constraint, prose in `feature-lead.md` and `sub-agent.md` — [`02`](./02-the-four-tiers.md) §2 |
| *"The FRACTAL system manages non-determinism — not eliminates it"* | The 2-attempt retry policy and the escalation ladder — [`06`](./06-the-evaluation-layers.md) §4. Nothing counts the attempts |
| *"The Architect never writes code… Each tier does exactly one thing"* | Four prohibitions, one per role file, plus the delegation threshold — [`02`](./02-the-four-tiers.md) §2. **No mechanism found** that restricts a role's tools or paths; checked all four agent files' frontmatter, which carry only `name`, `description`, `model` and `color`. The one tool restriction in the tree is on a skill, not a role — [`06`](./06-the-evaluation-layers.md) §5 |
| *"HANDOFF evaluation is an approval gate — do not mark COMPLETE without reviewing"* | [`06`](./06-the-evaluation-layers.md) §3, where six documents say this and the two execution paths do the opposite |
| *"A HANDOFF without build evidence is opinion, not evidence"* | The Verification Evidence table — [`05`](./05-handoff-and-pulse.md) §1 |
| *"`router.py update COMPLETE` without writing HANDOFF.md produces no audit trail"* | [`04`](./04-router.md) §3 — reproduced exactly as described |
| *"The PRD is the only context a Feature Lead gets"* | [`03`](./03-blueprint-and-workstream-prd.md) §2, and the four authoring rules that follow from it |
| *"A Strategist doc generated without user input is worse than no doc at all"* | The Background-Agent Guard and its `STRATEGIST-BLOCKED.md` output — [`02`](./02-the-four-tiers.md) §3. The determination of how the agent was invoked is the agent's own; nothing supplies it |
| *"Use it when the epic has 3+ workstreams… Skip it for… tasks under ~2 hours"* | **A fit statement, not a mechanism.** Nothing measures epic size or refuses a small one. Checked `router.py`, `/fractal-init` and the agent files for any threshold |
| *"FRACTAL runs **un-routed** here: no router, no blueprint YAML, no state file"* | [`07`](./07-the-un-routed-instance.md) — the substitution table, and the terminal-artifact convention that replaces the state row |

**One claim falls outside this set's scope and is not an absence.** The profile reads a third instance,
`C`; its deltas were true on 2026-09-03 and the repository returns 404 on 2026-09-08. Nothing here
confirms, restates or re-derives them. What was checked is in [`00-README.md`](./00-README.md).

---

**Up:** [`../fractal.md`](../fractal.md) · **index:** [`00-README.md`](./00-README.md)
