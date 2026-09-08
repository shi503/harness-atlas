---
status: DRAFT
title: "FRACTAL — the un-routed instance"
tier: reference
project: harness-atlas
source: "harness-atlas working tree @ 7d1bb149a7936987fcaaeb31cede78ed1f7310b3"
version_at_capture: "7d1bb14 (2026-09-08)"
source_verified: "2026-09-08"
---

# The un-routed instance

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against the `harness-atlas` working tree at **`7d1bb14`** (2026-09-08), on the read date. This is
the profile's instance `R`. Everything here is pinned to what was read at that commit; the tree was
under concurrent modification and later states may differ.

Instance `R` runs FRACTAL's document conventions with the state machine removed. It is the case the
design does not describe: `README.md` treats `router.py` as Core Principle #1, and this instance has
no `router.py` at all. What follows is what survives, and what replaces each thing the router did.

---

## 1. What is absent, verified

`find` across the tree at `7d1bb14`, excluding `node_modules/` and `.git/`, returns **zero** hits for
each of:

| Absent | Upstream equivalent |
|---|---|
| `router.py` | `.claude/fractal/router.py` (and two more copies) |
| any `BLUEPRINT-*.yaml` | the parsed dependency graph |
| `.state.json` | the whole of persisted state |
| `.claude/fractal/` | the framework directory |
| `.claude/skills/` | the six or seven `SKILL.md` files |
| `EVAL_TEMPLATES/` | the four evaluation templates |
| `STRATEGIST-*.md`, `FRACTALSYSTEM-*.md` | Tier 0's two outputs |
| `PULSE.md` (any) | the heartbeat artifact |

What is present: **two agent files** (`.claude/agents/architect.md`, `feature-lead.md`), a `fractal/`
directory at the repository root holding workstream PRDs and their HANDOFFs, `fractal/ISSUES.md`, a
§ Workstreams section in the root `CLAUDE.md`, and four files under `docs/agents/`. Skills live at the
repository root as `skills/`, not under `.claude/`.

The declaration is one paragraph in `CLAUDE.md`:

> FRACTAL runs **un-routed** here: no router, no blueprint YAML, no state file. A workstream is a PRD
> in `fractal/workstreams/`, executed by the `feature-lead` agent (or interactively with KD where the
> PRD says `Mode: interactive`), and closed by a `HANDOFF.md` beside it. Defects in the process go in
> `fractal/ISSUES.md`, append-only.

---

## 2. The substitutions, one per router command

| Upstream mechanism | What replaces it here |
|---|---|
| `router.py init` — create the state file | Nothing. There is no state to initialise |
| `.state.json` — where "done" lives | **The terminal artifact.** A workstream is complete when `fractal/workstreams/<Wn>-<slug>-HANDOFF.md` exists on disk |
| `router.py next` — resolve the ready set | The `**Dependencies:**` line in each PRD header, read by a person or the Architect |
| `router.py update … COMPLETE` | Writing the HANDOFF. There is no second act |
| `router.py status` — N/M and the groups | Listing the directory: PRDs without a matching `-HANDOFF.md` are open |
| `router.py pulse` — parse the heartbeat | Nothing. No PULSE file exists in the tree |
| BLUEPRINT `feature_lead` as state key | `Wn` — a sequential workstream number in the filename |

**Every PRD declares this in its own header**, on a line the upstream PRD template has no field for:

```
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W12-deep-read-fanout-HANDOFF.md`.
```

A fan-out PRD names one artifact per unit instead: *"One HANDOFF per harness:
`fractal/workstreams/W4-<harness>-HANDOFF.md`."* Naming the file **in the PRD, before the work starts**
is what makes existence-on-disk a usable completion signal — the expected path is declared rather than
derived, which is the gap `U` leaves open in its kebab-casing convention
([`03`](./03-blueprint-and-workstream-prd.md) §3).

---

## 3. The PRD header block, and `Mode:`

Upstream workstream PRDs open straight into `## Goal`. Here every PRD opens with a fixed block:

| Field | Values seen at `7d1bb14` |
|---|---|
| `**Epic:**` | one string, shared by all thirteen |
| `**Mode:**` | `headless` · `interactive — with KD` · a sentence combining both for a phased PRD |
| `**Dependencies:**` | prose naming blocking `Wn`s, or `none`; often with what it blocks in turn |
| `**Routing:**` | always `un-routed`, plus the terminal artifact path |
| `**Status:**` | present on the two most recent PRDs only — a triage label |

`docs/agents/issue-tracker.md` specifies the block and the four required sections beneath it —
`## Goal`, `## Deliverable`, `## Acceptance criteria`, `## Do NOT`. **All thirteen PRDs at `7d1bb14`
carry all four**, checked by heading match; PRDs add sections freely on top (`## Decisions taken`,
`## Open`, `## Scope`).

`**Status:**` is the one field wired to an external vocabulary. `docs/agents/triage-labels.md` maps five
roles — `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix` — onto this
process, and states the substitution explicitly: *"Since this repo's tracker … is FRACTAL workstream
PRDs rather than a labelled tracker, apply the label as a `**Status:**` line in the PRD's header block
… rather than an actual tag."*

**`Mode:` has no upstream counterpart, and it does real work.** Upstream distinguishes interactive from
background-agent execution inside the Feature Lead's own instructions
([`05`](./05-handoff-and-pulse.md) §5); here it is a field on the PRD, decided by the author before
dispatch, and it visibly changes what the closing artifact looks like.

---

## 4. Two HANDOFF shapes

Twelve HANDOFF files at `7d1bb14`, closing thirteen PRDs, in two families.

**Family A — five files, upstream's shape.** The four HANDOFFs of the `W4` fan-out and one of the `W8`
fan-out: the seven upstream sections in upstream order (Summary of Work Completed / Not
Completed, Technical Debt, Key Decisions, New Dependencies Added, Verification Evidence), plus an
`## AC evidence` section keyed to the PRD's criteria, plus **two sections upstream has no equivalent
for**: `## Skill findings` and `## Router / process notes`. All five came from PRDs whose `Mode:` is a
headless fan-out.

**Family B — seven files, a free shape.** `## Produced` (usually a deliverable table), then some of
`## Acceptance criteria`, `## Open items`, `## Commits`, plus per-workstream sections. Six of the seven
came from PRDs whose `Mode:` names an interactive component; the correlation is not exact — `W5`'s
HANDOFF is Family B and its own header records why: *"headless, executed inside W11 rather than as its
own fan-out — the transform turned out to be mechanical, so one sequential pass was cheaper."*

### The Verification Evidence table, substituted

Upstream's five rows are Lint / Build / Typecheck / Tests / Quality pass. A repository with no build
cannot fill them, and the table is not skipped — it is **replaced, with the substitution stated in the
table itself**. From `W4-fractal-HANDOFF.md`:

| Gate | Command | Result |
|---|---|---|
| Doc-link check | `node scripts/check-doc-links.mjs` | PASS — *"182 files scanned, 1465 links checked"* |
| Manifest scope | `git status --short` | PASS — every changed path named |
| Quality pass | `git diff` review | PASS |
| Secrets scan | the `grep` pipeline from the agent file | PASS |
| Personal-data scan | the `grep` pipeline from the agent file | PASS |
| Environment-value scan | the `grep` pipeline from the agent file | PASS |
| CI gate | *"N/A — docs-only workstream"* | **N/A**, with the reason quoted from `CLAUDE.md` |

The three scan rows are the compliance block that ships commented out upstream
([`05`](./05-handoff-and-pulse.md) §1), uncommented and made mandatory here. The `N/A` row is the one
that matters: rather than dropping a gate that does not apply, the table keeps the row and records why
it is empty.

### `## Router / process notes`

The R-only closing section, and the exact place the missing router is accounted for. In full, from
`W4-fractal-HANDOFF.md`:

> Per `CLAUDE.md` §Workstreams, this repo runs **un-routed**: no `router.py`, no BLUEPRINT YAML, no
> `.state.json`. **No router command was run.** This HANDOFF is the completion signal for W4 #4.

Upstream's bash block ends with a router call; here the same slot holds a sentence saying no call was
made and naming what stands in for it.

---

## 5. `ISSUES.md` — the same object, a different lifecycle

`fractal/ISSUES.md` at `7d1bb14`: **24 numbered entries** plus **five dated addenda**, under a header
that keeps upstream's three severities with re-worded meanings — *"CRITICAL (blocks dispatch) · WARN
(degrades correctness) · MINOR"*. Distribution at the read date: 20 `WARN`, 9 `MINOR`, no `CRITICAL`.

| | Upstream (`U`) | Here (`R`) |
|---|---|---|
| Heading | `## [YYYY-MM-DD] [SEVERITY] Short title` | `## ISSUE-NNN — <title>` — sequential id, not a date |
| Fields | `Discovered by`, `Symptom`, `Impact`, `Recommended fix`, `Status` | `Severity`, `Found` (date + context), `Assigned` (a `Wn`, or `none`, or a named person) |
| Resolution | edit the `Status:` line `OPEN` → `RESOLVED` | **append a dated addendum**; the original entry is never edited |

**There are zero `Status:` lines in the file.** Upstream's `OPEN → RESOLVED` field is not present, and
the lifecycle it named is replaced by append-only correction: `## ISSUE-011 addendum, 2026-09-07 — the
proposed fix does not hold; a narrower one is ruled instead`, `## ISSUE-013 addendum, 2026-09-07 — the
… "breaches" were a mid-flight measurement, not a defect`, `## ISSUE-001 update, 2026-09-08 — …`. An
entry that turned out to be wrong is superseded in place by a later heading rather than corrected in
the original. `CLAUDE.md` names the property — *"append-only"* — without naming the mechanism.

**One thing the agent file asks for that the file does not have.** `.claude/agents/feature-lead.md`
instructs an agent to append an issue *"with `Status: OPEN`"*. No entry in `fractal/ISSUES.md` has ever
carried that field, and the file's own header defines no such field. The instruction is inherited from
upstream's ledger format and was not adjusted with the rest of the file.

---

## 6. The agent files are upstream files with a one-line override

Both role files here are descendants of upstream's, grown from 215 → 267 lines (`architect.md`) and
197 → 257 (`feature-lead.md`). Additions: a `## §0. Reading rules (agent discipline)` table of word
caps and tier discipline, a `## Project Guides` section, a `## Data Safety` list, and — in the
Architect — `### Knowledge Retrieval Discipline`.

**The un-routing is applied as a preamble, not a rewrite.** Both files carry, above the role
description, one blockquote:

> **This repo runs un-routed.** There is no `router.py`, no BLUEPRINT YAML, no `.state.json`, and no
> `.claude/fractal/` directory. Workstream PRDs live at `fractal/workstreams/<WS>.md`; the HANDOFF goes
> to `fractal/workstreams/<WS>-HANDOFF.md`; issues go in `fractal/ISSUES.md`. Wherever the text below
> says `.claude/fractal/…` read `fractal/…`, and skip every router command.

Everything below that line is the routed text. `feature-lead.md` still carries the full HANDOFF bash
block ending in `python3 .claude/fractal/router.py update "${NAME}" COMPLETE`, the PULSE block ending
in `router.py pulse`, and the three-bullet *"Router command restrictions (CRITICAL)"*. `architect.md`
still instructs the reader to run `router.py status`, to author a BLUEPRINT from
`.claude/fractal/templates/blueprint-template.yaml`, to read `.claude/fractal/STRATEGIST-taskflow.md`
first, and to re-run the commands in `.claude/fractal/EVAL_TEMPLATES/deterministic-eval.md`. Both
still open by naming the upstream demo project — *"the CTO collaborator for **TaskFlow**, a
self-hosted, keyboard-first kanban tracker"* — and `feature-lead.md`'s CI gate step is a five-command
Next.js block introduced with *"For TaskFlow:"*.

**None of those paths exists.** Checked at `7d1bb14`: `.claude/fractal/`, `.claude/fractal/templates/`,
`EVAL_TEMPLATES/`, `fixtures/taskflow/`, and every `STRATEGIST-*.md` / `FRACTALSYSTEM-*.md` — all
absent. The reader is asked to translate on the fly, on every read, from a preamble at the top. It is
the thinnest possible port: nothing is forked, nothing diverges, and the whole cost is paid at read
time by whoever is reading.

---

**Next:** [`08-the-kernel.md`](./08-the-kernel.md) — a surface added upstream after the pinned commit.
