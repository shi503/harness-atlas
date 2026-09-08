---
status: DRAFT
title: "FRACTAL — HANDOFF and PULSE"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 6398f6db059598e381336601b21609928cf24034"
version_at_capture: "6398f6db (2026-04-20)"
source_verified: "2026-09-08"
---

# HANDOFF and PULSE

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `github.com/shi503/fractal-agent-system` at **`6398f6db`** (2026-04-20), **2026-09-08**.
Pulse behaviours marked **reproduced** were obtained by executing the shipped `router.py` against
constructed PULSE files on the read date.

The two artifacts a Feature Lead produces. Both are markdown; both are gitignored by default
([`01`](./01-install-and-repository-layout.md) §5); one of them is machine-read.

---

## 1. HANDOFF — three templates, three different section lists

The HANDOFF is the card's structured output and the object the whole evaluation pipeline judges.
**Three files in the tree define its shape, and no two agree.**

| Section | `docs/HANDOFF.md` | `skills/handoff/SKILL.md` | `agents/feature-lead.md` |
|---|:-:|:-:|:-:|
| Summary of Work Completed | ✓ | ✓ | ✓ |
| Summary of Work Not Completed | ✓ | ✓ | ✓ |
| Technical Debt *(as "Technical Debt Register")* | ✓ | ✓ | ✓ |
| Key Decisions Made | ✓ | ✓ | ✓ |
| **Deterministic Eval Results** (§5, prose bullets) | ✓ | — | — |
| **Verification Evidence** (a 5-row table) | — | ✓ | ✓ |
| **New Dependencies Added** | — | — | ✓ |
| `**Blueprint:**` header field | — | ✓ | — |

`docs/HANDOFF.md` is the odd one: it predates the table, carries five worked examples instead of
placeholders, and opens with the line `_This file is machine-readable. Do not edit manually._` —
which is true of no HANDOFF in this system, and which also heads `ROUTING_LOGIC/README.md`.

**`BEST-PRACTICES.md` §6 points at the template the agents do not use:**

> HANDOFF.md must include build gate results. A HANDOFF without build evidence is opinion, not
> evidence. The template includes a §5 Deterministic Eval section. Require Feature Leads to fill it in.

Only `docs/HANDOFF.md` has a §5. The two templates a Feature Lead actually follows have a Verification
Evidence table instead, and neither is numbered.

### The Verification Evidence table

The form both agent-facing templates use:

```markdown
| Gate | Command | Result | Notes |
|------|---------|--------|-------|
| Lint | `[project lint command]` | PASS / FAIL | |
| Build | `[project build command]` | PASS / FAIL | |
| Typecheck | `[project typecheck command]` | PASS / FAIL / N/A | |
| Tests | `[project test command]` | PASS (X/Y) / FAIL / N/A | [new specs added, if any] |
| Quality pass | `/quality-pass` | PASS / SKIP | [slop items removed, if any] |
<!-- | Compliance scan | `[scan commands]` | PASS / FAIL | Enable for regulated projects | -->
```

A sixth row, **Compliance scan**, ships commented out in both. The commands it would run are in
`feature-lead.md`, also inside an HTML comment (step 6 of the Session Protocol): three `grep` pipelines
over `git diff --name-only main...HEAD` for credentials, personal identifiers and hardcoded hosts, each
ending `|| echo "PASS"`. `architect.md` names the row in its gate — *"For regulated projects, verify the
compliance scan row is present and PASS"* — for a row that is commented out until an adopter uncomments
it in two files.

**What the table is, precisely.** It is the Feature Lead's own transcription of command output into
markdown. Nothing captures the output, and nothing compares the transcription to a re-run. The
Architect's stated remedy is to run the commands again itself — *"Re-run the scan commands from the
deterministic eval template to validate the Feature Lead's reported results"* — which is a second
session doing the same thing, not a check. `router.py` never sees the table
([`04`](./04-router.md) §3).

### Who writes it, and when

`feature-lead.md`'s background-agent path is a single bash block: `mkdir -p`, a heredoc writing
`HANDOFF.md`, then — in the same block, with nothing between —

```bash
python3 .claude/fractal/router.py update "${NAME}" COMPLETE
```

The `/handoff` skill does the same in four ordered steps: build gate, write HANDOFF, `update COMPLETE`,
`next`. Its step 5 then prints a reminder: *"Review `…/HANDOFF.md` before accepting."* The state already
says `COMPLETE` when that reminder is printed. What this contradicts, and where, is
[`06`](./06-the-evaluation-layers.md) §3.

The one guard is prose, at the top of the skill: **"CRITICAL: Do not generate the HANDOFF or mark
COMPLETE if the build gate fails."** `docs/HANDOFF.md` says it a second way: *"The HANDOFF is only valid
if the build passed. Do NOT generate this document if the build is failing."*

---

## 2. PULSE — the one machine-read artifact

An append-only markdown file at `workstreams/{kebab}/PULSE.md`, holding fenced JSON blocks. The full
contract, from `docs/PULSE.md` and the `/pulse` skill:

```json
{
  "timestamp": "2026-02-27 22:00:00 UTC",
  "status": "BLOCKED",
  "tasks_completed": "2/5",
  "blockers": "Database connection timeout",
  "escalation_needed": true
}
```

| Field | Read by `router.py`? | Notes |
|---|---|---|
| `escalation_needed` | **yes** — the only branch | Absent ⇒ `False` ⇒ `HEARTBEAT_OK` |
| `timestamp` | printed only | Never parsed, never compared to now. Absent ⇒ `"unknown"` |
| `status` | printed only | Free text. `docs/PULSE.md`'s own example uses `BLOCKED`, which is not a router status |
| `tasks_completed` | printed only | A string like `"2/5"`. Absent ⇒ `"unknown"` |
| `blockers` | printed only, on alert | Absent ⇒ printed as `"none"` |

Cadence and trigger are prose, in `feature-lead.md`: *"If the session runs longer than 30 minutes or you
hit a blocker, emit a heartbeat."* The two shipped example blocks in the agent file and the skill both
hard-code `"status": "IN_PROGRESS"` and `"escalation_needed": false`, leaving `tasks_completed` as the
literal `"X/Y"` for the model to fill.

---

## 3. Escalation

`cmd_pulse` prints one of two words. On `HEARTBEAT_ALERT` the Feature Lead's instruction is
*"Surface the escalation immediately. Stop work. Report the blocker to the user for Architect review"*;
`architect.md` responsibility 6 is the receiving end — *"When `router.py pulse` returns
HEARTBEAT_ALERT, review the blocker and provide unblocking guidance."*

In an interactive session the alert is followed by `ask_followup_question` with three fixed
suggestions: *"Provide guidance to unblock" · "Descope this part of the workstream" · "Escalate to the
Architect"*. In background-agent mode no such call is made and the alert is stdout text the agent must
notice in its own output.

---

## 4. Six pulse behaviours, reproduced

Run against the shipped `router.py` at the pinned commit:

| # | PULSE file | Output | exit |
|---|---|---|---|
| A | markdown with no ```` ```json ```` fence | `HEARTBEAT_OK (no pulse entries found)` | 0 |
| B | an `escalation_needed: true` block, then a later `false` block | `HEARTBEAT_OK` — the alert is invisible | 0 |
| C | one block, `"timestamp": "2023-01-01T00:00:00Z"` | `HEARTBEAT_OK` | 0 |
| D | `{"escalation_needed": true, "status": "BLOCKED"}` | `HEARTBEAT_ALERT`, `Timestamp: unknown`, `Blockers: none` | **0** |
| E | a bare JSON object, no fence | `HEARTBEAT_OK (no pulse entries found)` | 0 |
| F | a fenced block containing `{oops` | `HEARTBEAT_ALERT: Could not parse latest pulse entry.` | 0 |

Read together:

- **A and E are the important pair.** A PULSE file that was never written, or written without the exact
  ```` ```json ```` fence, reports healthy. Silence and health are the same signal.
- **B is the append-only log's blind spot.** `re.findall(...)[-1]` reads the last block; every earlier
  escalation in the file is never examined. The artifact accumulates history that the checker does not
  consult.
- **C is the missing clock.** Nothing in the system measures the 30-minute cadence it asks for.
- **D shows the exit code.** `HEARTBEAT_ALERT` exits 0, so a shell caller must match the string.
  It also shows the defaults: a missing `blockers` field prints as `none` **on an alert**, which reads
  as "escalating, no blocker".
- **F is the one fail-loud case.** Malformed JSON is the only input the checker refuses to interpret
  as healthy.

`BEST-PRACTICES.md` §6 states what a missing PULSE costs, in the vendor's words: *"No PULSE artifacts =
no escalation trail. If Feature Leads complete work without emitting PULSE heartbeats, you have no
record of what happened during execution, where blockers occurred, or whether the 2-attempt retry
policy was applied. PULSE is cheap — require it for any workstream taking more than 30 minutes."*

---

## 5. Skill or bash — the two execution modes

Both artifacts have two production paths, and choosing wrongly produces nothing at all.

| | Interactive Claude Code session | Background agent (the default) |
|---|---|---|
| PULSE | `/pulse {FeatureLead-Name}` | `cat >> PULSE.md` heredoc, then `router.py pulse <path>` |
| HANDOFF | `/handoff {FeatureLead-Name}` | build commands, `cat > HANDOFF.md` heredoc, then `router.py update … COMPLETE` |

`feature-lead.md` states the default and the reason: *"**Default is background agent.** …When in doubt,
assume background agent mode and use bash."* `BEST-PRACTICES.md` §6 explains why the skills cannot
substitute: *"When Feature Leads run as background agents (Agent tool) — the default and recommended
mode — skills cannot fire. The `/pulse` and `/handoff` text in the model's output is just text, not an
execution."* Its §8 lists the mistake as an anti-pattern: *"Assume `/pulse` and `/handoff` work inside
background agents."*

**The example PRDs ask for the path that does not work.** All three shipped workstream PRDs end their
Session Protocol with *"/pulse if > 30 min or blocked; /handoff on completion"*, as does the required
PRD template in `SETUP-CLAUDE-CODE.md` §8 — a slash-command instruction inside the document read by the
agent that, by the framework's own default, cannot execute one.

---

**Next:** [`06-the-evaluation-layers.md`](./06-the-evaluation-layers.md) — what judges the HANDOFF.
