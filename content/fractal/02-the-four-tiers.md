---
status: DRAFT
title: "FRACTAL — the four tiers"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 6398f6db059598e381336601b21609928cf24034"
version_at_capture: "6398f6db (2026-04-20)"
source_verified: "2026-09-08"
---

# The four tiers

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `github.com/shi503/fractal-agent-system` at **`6398f6db`** (2026-04-20), **2026-09-08**.

---

## 1. The four role files

Four markdown files under `.claude/agents/`, each a Claude Code agent definition with YAML frontmatter
and a prose body. No fifth tier is named anywhere in the tree.

**Every frontmatter carries exactly four keys** — `name`, `description`, `model`, `color` — checked on
all four files. There is no `tools:`, no `allowed-tools:`, no path scope: a role's restrictions live
entirely in the prose below the frontmatter.

| Tier | File | Lines | `model:` | `color:` | Sole output |
|---|---|---:|---|---|---|
| 0 · Strategist | `strategist.md` | 253 | `opus` | `purple` | `STRATEGIST-{project}.md` |
| 1 · Architect | `architect.md` | 215 | `opus` | `blue` | BLUEPRINT + one PRD per workstream |
| 2 · Feature Lead | `feature-lead.md` | 197 | `sonnet` | `green` | `HANDOFF.md`, `PULSE.md`, the code |
| 3 · Sub-Agent | `sub-agent.md` | 39 | `sonnet` | `yellow` | a report to its Feature Lead |

`model:` accepts `haiku | sonnet | opus | inherit`. All four shipped files pin a concrete value;
`inherit` is documented as valid and used nowhere. Every file repeats the same comment: *"Context
window (200K vs 1M) is set by your plan, not this field."*

**Model assignment is a hand-edited text field.** Nothing reads it at dispatch time —
`router.py` prints a workstream's `model` value in `next` and does nothing else with it, and
`SETUP-CLAUDE-CODE.md` §7 states plainly that *"`model` is a hint to the Architect"*.

The recommended tiers, and the reason for the one that changed:

| Role | Recommended | Stated reason (`BEST-PRACTICES.md` §5) |
|---|---|---|
| Sub-Agent | `sonnet` | *"upgraded from `haiku`… Haiku reliably hallucinates on TypeScript generics, Angular 21 signal patterns… and framework-specific decorators. The cost saving is not worth the hallucination rate."* |
| Feature Lead | `sonnet` | *"reads full multi-file manifests, needs reliable framework knowledge"* |
| Architect | `opus` | *"strategic reasoning, dependency graph analysis, and HANDOFF evaluation — not speed"* |
| any implementation work | never `opus` | *"Don't use Opus for Feature Lead workstreams. The latency is noticeable and the additional quality over Sonnet isn't worth it"* |

---

## 2. What each tier is forbidden from doing

The separation is stated as prohibitions, in each file's own words. Nothing enforces any of them.

**Strategist.** *"You are NOT an implementor. You do not write code, generate blueprints, or create
workstream PRDs. Your sole output is a well-formed Strategist document."*

**Architect.** *"The Architect never writes code — only strategizes, structures, and delegates."*
*"Never consume tokens on implementation — your context is for orchestration, not code details."*
Delegation threshold: anything *"More than 3 steps, OR Changes to more than 2 files/modules"*. Handled
directly and never delegated: *"BLUEPRINT authoring, workstream PRD writing, HANDOFF evaluation,
escalation triage."*

**Feature Lead.** *"You do not make architectural decisions — you implement exactly what the PRD
specifies."* Four hard constraints: read the whole PRD first, read every read-manifest file before
writing, stay inside the manifest, run the gate before HANDOFF. It may spawn **up to 2** Sub-Agents,
for tasks that are *"Mechanical… Fully specified… Confined to 1–2 files"*, and must not delegate
*"tasks that require understanding the surrounding codebase — those require your context."*

**Sub-Agent.** *"You receive one task, execute it precisely, verify it passes acceptance criteria, and
terminate. You have no context beyond what you are given in this session."* *"One task only — if you
discover scope beyond the task, stop and report it, do not expand."*

**Router command restrictions** are stated identically in `feature-lead.md` and `README.md` *"Known
Gotchas"* #6: a Feature Lead may run `router.py update <name> COMPLETE` and nothing else; `init` and
`next` are the Architect's. [`04`](./04-router.md) §4 records what the code does when the restriction
is ignored.

---

## 3. The Background-Agent Guard

`strategist.md` opens — before the role description, as the first section after frontmatter — with a
guard that no other role file has:

> **STOP.** Before doing anything else, determine how you were invoked… If you were spawned as a
> background sub-agent… with no interactive user present — DO NOT proceed… A Strategist doc generated
> without user input is worse than no doc at all — it gives the Architect false confidence in a mandate
> that was never actually validated.

The prescribed behaviour is to write `STRATEGIST-BLOCKED.md` into the framework directory, with a
timestamp, a reason and a required action, and then stop.

**The determination is the agent's own.** Nothing in the tree tells an agent how it was invoked: no
environment variable, no flag, no wrapper. The guard asks the model to introspect and then obey.

---

## 4. The Strategist document's ten sections

The Strategist's single output has a fixed section list, interviewed one at a time:

| § | Section | What it fixes |
|---|---|---|
| 0 | What Right Looks Like | Competitive benchmark table; *"anchors all Layer 3/4 evaluations"* |
| 1 | Project Mandate | *"A single, clear sentence describing the overall goal"* |
| 2 | Core Intent & Guiding Principles | Values *"in priority order"* |
| 3 | Definition of Done (High-Level) | Verifiable outcomes for the whole project |
| 4 | Constraint Architecture | *"Non-negotiable rules (tech stack, budget, timeline, services)"* |
| 5 | Failure Mode Register | *"Subtle ways the project fails EVEN IF it meets technical requirements"* |
| 6 | Autonomy Level | *"supervised / semi-autonomous / autonomous"* |
| 7 | Platform Evolution Strategy | Current phase and transition criteria |
| 8 | Milestone Roadmap | Checkpoints, compliance gates, evaluator archetypes |
| 9 | Source Control Preferences | *"When does the Architect commit and create PRs?"* |

Three interview modes are offered up front via `ask_followup_question` — Full Discovery (~20
questions), Focused (~12), and an update path for an existing document. The Strategist also generates a
second, project-local file, `FRACTALSYSTEM-{project}.md`, described in `architect.md` as *"The
localized reference for how the FRACTAL multi-agent system operates in this project."*

**§9 exists because of an observed failure.** `BEST-PRACTICES.md` §7: *"Without documented preferences,
each session independently decides when to commit. This produces either no commits… or too many
commits."*

**The intake folder** at `fractal/intake/` is what the Strategist reads at session start. Its README
sets a budget in words rather than code — *"~50,000 tokens total across all files"*, *"Max files: 5–8"*,
*"Max per file: 200–300 lines"* — and states a hard limitation: *"The Strategist will NOT fetch URLs
during the interview."* The folder's contents are gitignored; the README is not.

---

## 5. The agent overlay

The one customisation mechanism FRACTAL ships for the role files themselves. A `*.local.md` beside a
base agent is *"appended to the base agent's context"*:

```
.claude/agents/
├── architect.md           # Base agent (don't edit — upgradeable)
├── architect.local.md     # Your project-specific overrides
├── feature-lead.md
└── feature-lead.local.md
```

Stated purpose: *"Project-specific tech stack details · Custom design principles · Additional forbidden
patterns · Domain-specific terminology"*, so that *"When you pull a new version of FRACTAL, replace the
base agent files. Your `.local.md` overrides persist untouched."* The README marks it optional:
*"If you prefer to edit the base files directly (simpler, but requires re-applying changes on upgrade),
that works too."*

**The shipped base files are not neutral bases.** `architect.md` names the demo project in its second
line — *"the CTO collaborator for **TaskFlow**, a self-hosted, HIPAA-aware, keyboard-first kanban
platform"* — and carries 30 lines of Next.js/Prisma/Supabase stack and standards below it. The
README's own *"What to Customize"* table asks the adopter to change *"Project name, tech stack, design
principles, technical standards"* in that file, which is editing the base rather than overlaying it.

**No mechanism reads a `.local.md`.** The appending is attributed to the host harness's agent loader —
*"When an agent is invoked, Claude Code reads both the base file and the `.local.md` file"* — and
FRACTAL ships nothing that performs, verifies or depends on it. No `.local.md` file exists in the tree.

**And one of FRACTAL's own documents, at the same commit, calls the pattern speculative.**
`docs/harness-upgrade-roadmap.md` (dated 2026-04-14, six days before the pinned commit; header
*"Status: Advisory (not yet encoded as a BLUEPRINT)"*) lists it as backlog item **#24** —
*"**Agent-overlay (`.local.md`) pattern** for per-project Architect/Feature Lead customization without
forking"*, sourced as *"inferred from public source; not cited"* — and then places it under
*"Out of scope / deferred"*:

> **Agent-overlay `.local.md` pattern** (#24). Speculative — no direct source evidence, and current
> single-project FRACTAL usage doesn't need it yet.

The README describes the same pattern in the present tense as a supported feature. Both statements
ship in the same tree at the same commit; there is no code to arbitrate between them.

---

**Next:** [`03-blueprint-and-workstream-prd.md`](./03-blueprint-and-workstream-prd.md) — what the
Architect writes.
