---
status: DRAFT
title: "FRACTAL — the four evaluation layers"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 6398f6db059598e381336601b21609928cf24034"
version_at_capture: "6398f6db (2026-04-20)"
source_verified: "2026-09-08"
---

# The four evaluation layers

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `github.com/shi503/fractal-agent-system` at **`6398f6db`** (2026-04-20), **2026-09-08**.

---

## 1. The four layers

`The FRACTAL Multi-Agent System.md` states them as a table; four markdown templates under
`EVAL_TEMPLATES/` fill them in.

| Layer | Owner | Blocks HANDOFF? | What it checks | Template | Lines |
|---|---|---|---|---|---:|
| 1 · Deterministic | Architect | *"Yes"* | *"Build, lint, typecheck, security audit, diff scope"* | `deterministic-eval.md` | 117 |
| 2 · LLM Judgment | Architect | *"Yes"* | *"Intent alignment, architecture idioms, security/compliance, pattern consistency"* | `llm-judgment-eval.md` | 88 |
| 3 · Qualitative Persona | Strategist | *"No (informs backlog)"* | *"Would real users trust this? Workflow fit, UX, domain accuracy"* | `qualitative-persona-eval.md` | 110 |
| 4 · Strategic Benchmark | Strategist | *"No (informs roadmap)"* | *"Are we building the right thing? Competitive positioning"* | `strategic-benchmark-eval.md` | 84 |

`architect.md` adds the operating rule: *"When Layers 1–2 pass, mark workstream COMPLETE and move on.
The Architect does NOT block on qualitative feedback"*, and *"Layer 2 — LLM Judgment: …Skip for
mechanical workstreams (migrations, config)."*

`BEST-PRACTICES.md` §3 states the design constraint that keeps four layers from collapsing into one:
*"Each evaluation layer must produce differentiated output. If two layers say the same things, one is
redundant."* And on 3 and 4: *"Qualitative layers (3-4) must NOT block shipping. They inform the
backlog. The eval pipeline stalls if persona feedback blocks individual workstreams."*

---

## 2. What each template actually is

**Every one of them is a markdown file a human or an agent fills in by hand.** None is executable, none
is invoked by `router.py`, and none produces a machine-readable result.

**Layer 1 — `deterministic-eval.md`** is a seven-section checklist: Lint, Build, Type-Check, Test,
Security/Compliance, Diff Scope Verification, Final Result. Each of the first four is a single unticked
checkbox plus a five-row table of *"Common commands by stack"* (Next.js, Angular, Python, Go, Rust) —
so the template supplies candidate commands and the reader supplies the run. Section 6 is the only one
that names a command as its own check: *"Changes confined to files in workstream write manifest:
`git diff --name-only main...HEAD`"*. Its header reads *"Completed by Architect after Feature Lead
HANDOFF. All items must pass before marking COMPLETE."*

**Layer 2 — `llm-judgment-eval.md`** is a **copy-paste prompt**: *"Copy the prompt below into a new
Claude session. Paste the workstream PRD and code diff where indicated."* Seven assessment questions;
the judge's reply is pasted back under `## LLM Judge Response`, and the Architect's own note under
`## Architect's Assessment`. There is no API call, no scoring rubric and no structured output format —
the judge answers *"Yes / No / Partially"* in prose.

Questions 6 and 7 exist because of an observed miss, recorded in `BEST-PRACTICES.md` §3: *"The default
Layer 2 template misses architectural inconsistencies. The pilot missed that a static upgrade banner
coexisted with a new notification system (two parallel upgrade channels). Q6 catches this… Q7 forces
concrete remediation."* Q7 is stated as an instruction to the judge: *"Do NOT describe the gap in
general terms. State exactly: the file path, the function or component name, and the specific change
required."*

The template also carries a **`## Known False Positives — Do Not Flag`** section, seeded with one real
entry — `gt(createdAt)` with `ORDER BY DESC`, correct for forward cursor pagination — and the
instruction *"Update as you find them."* `BEST-PRACTICES.md` §3 names this as the mechanism: *"Every
time the judge makes a mistake, document the pattern so future evaluations skip it."* It is a
hand-maintained suppression list inside a prompt template; nothing reads it but the next reader.

**Layers 3 and 4** are persona and pillar templates, both filled with TaskFlow examples and both
carrying a *"Customizing for Your Project"* section. Layer 3's scoring is a 1–5 scale per persona;
Layer 4 scores milestone-level pillars. Both are Strategist-owned and neither gates a workstream.

---

## 3. Who marks a workstream COMPLETE, and when

**Four documents in the same tree give three different answers.**

| Source | What it says |
|---|---|
| `agents/feature-lead.md` | The bash block writes `HANDOFF.md` and then, with nothing in between, runs `router.py update "${NAME}" COMPLETE` |
| `skills/handoff/SKILL.md` | Step 2 writes the HANDOFF, **step 3** runs `update … COMPLETE`, **step 5** prints *"Review `…/HANDOFF.md` before accepting"* |
| `README.md` → How It Works | *"7. **Handoff** runs the build gate, generates `HANDOFF.md`, marks the workstream `COMPLETE` · 8. **Architect** evaluates HANDOFF artifacts"* |
| `agents/architect.md` | *"When Layers 1–2 pass, mark workstream COMPLETE and move on"*; *"**HANDOFF evaluation is an approval gate** — do not mark COMPLETE without reviewing the handoff artifact"* |
| `skills/fractal-init/SKILL.md` | *"After HANDOFF accepted, run: `python3 …/router.py update <FeatureLeadName> COMPLETE`"* |
| `SETUP-CLAUDE-CODE.md` §9 | `# After HANDOFF accepted:` then the same command |
| `BEST-PRACTICES.md` §4 | *"Mark `IN_PROGRESS` before starting, COMPLETE only after HANDOFF accepted… If you mark COMPLETE before reviewing the HANDOFF, you lose the review gate"* |
| `BEST-PRACTICES.md` §8 | Anti-pattern: *"Mark `COMPLETE` before reviewing HANDOFF · **Why It's Harmful:** Loses the review gate, tech debt goes unregistered"* |

The two agent-facing execution paths — the ones an agent actually runs — mark `COMPLETE` at handoff
time, before any evaluation. Four documents, including the one that lists it as an anti-pattern against
itself, say `COMPLETE` comes after acceptance. `EVAL_TEMPLATES/deterministic-eval.md`'s own header
takes the second position: *"All items must pass before marking COMPLETE."*

**The code arbitrates neither way.** `cmd_update` accepts the string from whoever types it
([`04`](./04-router.md) §3), so both orderings are equally executable and the state file cannot tell
them apart afterwards.

**And the reject path has nowhere to go.** The status vocabulary is `NOT_STARTED | IN_PROGRESS |
COMPLETE` and nothing else — `REJECTED` is refused with exit 1. A Layer 1 or Layer 2 failure is
therefore expressible in state only by writing the workstream *backwards* to `IN_PROGRESS`, which is
indistinguishable from a workstream that was simply started. The *"Blocks HANDOFF? Yes"* column of the
table in §1 describes a block the state machine has no value for.

---

## 4. The 2-attempt retry policy

Stated identically in `architect.md` and the system overview:

| Attempt | Action |
|---|---|
| **1st fail** | *"Architect provides specific feedback (file:line references). Feature Lead fixes and resubmits."* |
| **2nd fail** | *"Stop. Do NOT retry. Escalate to the next tier: Feature Lead → Architect → Strategist/User."* |

Escalation is an `ask_followup_question` call with four fixed suggestions — *"Rework — send back for
another attempt" · "Descope — remove from this epic" · "Defer — move to tech debt backlog" · "Accept —
ship with documented tech debt"*. The system overview gives the reason in one line: *"If a layer fails
twice, escalate to the next tier up — do not loop indefinitely."*

**Nothing counts attempts.** There is no attempt field in `.state.json`, no counter in the HANDOFF
template, and no code that increments anything. `BEST-PRACTICES.md` §6 notes the consequence in
passing, listing *"whether the 2-attempt retry policy was applied"* among the things you lose when a
workstream produces no PULSE artifacts — i.e. the only record that a retry happened is a prose
heartbeat the author was asked to write.

---

## 5. `/quality-pass` — the gate before the gate

A sixth skill, run by the Feature Lead *"after implementing a workstream and before `/handoff`"*, whose
result is the fifth row of the Verification Evidence table. Its stated purpose:

> Identify and remove "AI slop" introduced since the last commit **without** changing intended
> behavior, product logic, or security posture. This command is for **code quality cleanup**. It is
> **not** a refactor, redesign, or feature change tool.

It is the only skill in the tree with an `allowed-tools` list — `Bash(git diff *)`, `Read`, `Grep`,
`Glob`, `Edit` — which is the one place in FRACTAL where a capability's tool surface is narrowed.

---

## 6. `ISSUES.md` — the ledger for defects in the framework itself

Not an evaluation layer, but the place a failed one is recorded. `.claude/fractal/ISSUES.md` ships at
the pinned commit with a header, a template and one real entry:

> Persistent tracker for framework-level bugs and anomalies discovered during execution. Agents append
> here when they encounter unexpected router, skill, or agent behavior. **The Architect triages OPEN
> issues before authoring each new BLUEPRINT phase.**
>
> **Severity levels:** CRITICAL (breaks state machine / blocks execution) | WARN (degrades quality) |
> MINOR (polish)
> **Lifecycle:** OPEN → resolved by a workstream HANDOFF that fixes it → update Status to RESOLVED +
> link HANDOFF

Each entry carries `Discovered by`, `Symptom`, `Impact`, `Recommended fix` and `Status`, under a
heading of the form `## [YYYY-MM-DD] [SEVERITY] Short title`. **Resolution is an in-place edit**: the
`Status:` line changes from `OPEN` to `RESOLVED`. The one shipped entry — a deprecated Prisma seed
configuration, `MINOR`, discovered by `FeatureLead-SchemaPrisma` at an M1.1 handoff eval — is `OPEN`.

Instance `R` keeps the same object with a different resolution mechanism —
[`07`](./07-the-un-routed-instance.md) §4.

---

**Next:** [`07-the-un-routed-instance.md`](./07-the-un-routed-instance.md) — the same design with the
router removed.
