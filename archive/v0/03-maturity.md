---
title: "v0-03 — Maturity: two axes, three thresholds"
tier: spec
project: harness-atlas
created: "2026-08-11"
status: ARCHIVED
owner: KD
prior_art: "generic-cerebro → wiki/synthesis/ai-native-maturity.md; references/AI-Native Organizational Maturity Framework.md"
provenance: AUTHORED
---

# Maturity: two axes, three thresholds

**What this document is for.** A team asking *"how do we work?"* is really asking two questions at
once: *where are we now* and *where should we be*. This is the diagnostic that answers both, and the
specification for the interactive artifact that will present it.

**It merges two prior models** that disagree with each other in one important place — and the
disagreement turns out to be the most useful thing in either of them.

---

## 1. Two axes, not one

The single most common framing error in AI-native maturity models is treating AI maturity as a
scalar. It is not. A team has **two** independent maturities, and the interesting information is in
the gap between them.

| Axis | Question | Prior art |
|---|---|---|
| **AI-native maturity** | *How deeply is AI designed into how we work?* | The six-stage rubric (NN/g-derived) |
| **Delivery maturity** | *How good is the software engineering underneath?* | CI/CD, test coverage, review discipline, observability, operability |

Crossing them produces the diagnosis that a single number hides:

```
                   DELIVERY MATURITY  →
                   low                          high
              ┌──────────────────────┬──────────────────────┐
         high │  FAST SLOP           │  THE TARGET          │
              │                      │                      │
  AI-NATIVE   │  Ships constantly,   │  Ships fast, and it  │
  MATURITY    │  ships broken. Agents│  holds. Agents amplify│
      ↑       │  amplify a weak      │  a strong process.   │
              │  process.            │                      │
              ├──────────────────────┼──────────────────────┤
         low  │  PRE-AI              │  ARTISANAL           │
              │                      │                      │
              │  Nothing works well  │  Excellent software,  │
              │  yet. At least it's  │  built slowly by hand.│
              │  honest.             │  Nothing is wrong —   │
              │                      │  it just won't scale. │
              └──────────────────────┴──────────────────────┘
```

**Why this matters more than it looks.** Agents are a multiplier on your existing process. A team at
delivery-maturity 2 that adopts agents aggressively does not become a good team quickly — it becomes
a *bad team quickly*, and the volume makes the badness harder to see. The prior work set a
deliberately high delivery bar (enterprise-platform scale, full CI/CD, best practices implemented
*through* AI coding practices) precisely because the AI-native target was high. **The two must be
raised together, and that is the whole reason for the second axis.**

**Diagnostic rule:** if your AI-native stage exceeds your delivery stage by two or more, stop raising
the first one.

---

## 2. The six stages

Carried from the prior rubric, which keeps the NN/g UX Maturity six-stage grain deliberately — the
political and decision-making axis matters, and five-stage models tend to collapse Resistant into
Opportunistic in a way that hides a real organizational shift.

| | **Era 1 — AI as Tool** | | **Era 2 — AI as Workflow** | | **Era 3 — AI as Operating Model** | |
|---|---|---|---|---|---|---|
| **Stage** | **1 Resistant** | **2 Opportunistic** | **3 Assisted** | **4 Systematized** | **5 AI-First** | **6 AI-Native** |
| **One-liner** | "Prove it's safe" | "Let people experiment" | "Where can AI remove toil?" | "Which workflows are AI-by-default?" | "How should work happen if intelligence is abundant?" | "What is uniquely human?" |
| **AI is treated as** | Risk surface — sandboxed | Personal productivity tool | Preferred tool, team default | **Shared infrastructure** | Teammate; humans are "agent bosses" | First-class worker, autonomous in bounded contexts |
| **Bottleneck** | Trust | Repeatability | Workflow design | Operating model | Organization redesign | Strategic coherence |
| **Failure mode** | **Moral panic** — fear-driven restriction kills learning | **Hero culture** — capability trapped in individuals | **Prompt theater** — AI bolted on, work structure unchanged | **Bureaucracy without redesign** — governance layered, throughput unchanged | **Speed without judgment** — domain errors slip past | **Automation without accountability** — no audit trail where it matters |

**The finish line has moved.** What counted as AI-native in early 2025 — Copilot adoption, a shared
prompt library — is now stage 3–4. The 2026 threshold markers are **harness engineering**, **AI
factories with telemetry**, **agent teammates with real scope**, and **outcome metrics that retire
usage leaderboards before they invert**.

---

## 3. Three thresholds

**This is the correction.** The two prior documents place the commitment threshold in different
places, and reconciling them is not a matter of picking one.

| Source | Threshold placed at | Called |
|---|---|---|
| `references/elements.md` | **3 → 4** | *"structure stops being social and becomes mechanical"* |
| The prior AI-native rubric | **4 → 5** (Era 2 → Era 3) | *"a binary org-level commitment"* |

**Both are right. They are different thresholds.** Naming them separately is more useful than either
document alone:

```
  1 ──── 2 ──── 3 ═══╤═══ 4 ═══╤═══ 5 ═══╤═══ 6
                     │         │         │
              ⚡ MECHANICAL     │         │
              the harness holds │         │
              the line, not     │         │
              good intentions   │         │
                                │         │
                        ⚡ ORGANIZATIONAL │
                        a binary commitment│
                        — hybrid produces  │
                        two-speed teams    │
                                           │
                                    ⚡ EVIDENTIAL
                                    needs a corpus of
                                    evaluated outcomes
                                    that only exists
                                    after running at 4–5
```

| Threshold | Between | What must become true | Why teams stall here |
|---|---|---|---|
| ⚡ **Mechanical** | 3 → 4 | Rules are enforced by the harness, not by documentation. Deny rules, hooks, managed settings | Column 3 *feels* like progress and costs nothing organizationally. Teams stay indefinitely |
| ⚡ **Organizational** | 4 → 5 | A binary org-level decision to redesign roles around abundant intelligence | Hybrid at org level produces two-speed teams that cannot collaborate. Stage 3–4 teams that do not cross burn out fighting friction |
| ⚡ **Evidential** | 5 → 6 | A corpus of evaluated outcomes to improve *from* | Nobody starts at 6. Claiming 6 while Evidence sits at 2 is a learning loop with nothing to learn from |

**The mechanical threshold is the one a framework can move.** The organizational one is a leadership
decision no tool supplies. The evidential one is a function of time spent operating at 4–5. Being
clear about which is which prevents the most expensive mistake in adoption: **buying tools to solve
an organizational problem.**

---

## 4. Grading

Grade **each function independently** on the six stages. Two rules carried forward:

> **Evidence rule.** Find the rightmost cell that is *true with evidence*, not aspirational. If you
> cannot point at the artifact, you are one column to the left.
>
> **Minimum rule.** The fabric is governed by the **minimum**, not the mean. A team at 5 on Context
> and 1 on Policy is not a 3 — it is a 5 with a hole in it, and every unit of work crossing that hole
> has nothing to hold onto.

The mean flatters; the minimum diagnoses. This is why the grid has rows instead of a score.

### Per-function ladders

**Four of six columns.** Stages 2 (*Individual*) and 5 (*Default*) are omitted here for width; the
interactive artifact carries all six per row. **This is an abbreviation, not a model with four stages** —
the threshold that matters, 3 → 4, is visible either way.

> **Where a function's authoritative grade lives.** A row here is a **roll-up**. Where a function has
> been decomposed and graded per sub-unit, that finer grade governs and this row is a summary of it.
> `C-11` is the rule: *grade at the system level, roll up as the minimum.*
>
> **`F3 Context` is the first function to have one.**
> [`10-context-gap-analysis.md`](./10-context-gap-analysis.md) grades it across its four verbs —
> `write` · `select` · `compress` · `isolate` — and the minimum is **`write`, at 0**, because there is
> no scope model, no routing rule, and no provenance field. **Read the `F3` row below as the Fabric's
> ladder, not as `F3`'s grade.** A single-row ladder for a decomposed function is exactly how the
> predecessor's *"`F3` graded 2"* came to hide a zero.

| Function | 1 Absent | 3 Shared | 4 Governed *(mechanical threshold)* | 6 Self-improving |
|---|---|---|---|---|
| **F0 Substrate** | Whatever each dev installed | Documented setup others copy | Declared harness + recorded portability constraint; second person installs unaided | Capability moves between harnesses on evidence |
| **F1 Surfaces** | Work lives wherever it landed | Team agrees where things go | **SoT codified**; integrations configured; flow direction stated | Surfaces reconcile automatically; drift is flagged |
| **F2 Estate** | Repos found by memory | Documented layout | Machine-readable registry, owners, interfaces | Registry self-updates from the estate |
| **F3 Context** | Whatever's in the window | Shared committed context files | Versioned, owned, layered, reviewed like code | Agents propose updates; staleness auto-flags |
| **F4 Control** | Ad hoc prompting | Documented workflow humans follow | Declared dependency graph, deterministic resolver | Graph re-plans from observed outcomes |
| **F5 Capability** | Tribal knowledge | Shared skills folder | Versioned packages, owners, **standards tier** | Capabilities retire and promote on usage evidence |
| **F6 Policy** | Whatever the agent can reach | Agreed tiers, documented in prose | **Enforced where the model cannot reach; deny wins** | Policy tunes from denial and incident evidence |
| **F7 Evidence** | "It says it's done" | Structured handoff docs | Schema-valid events, blocking gates | Outcome evals can retroactively invalidate a handoff |
| **F8 Learning** | Nothing persists | A wiki someone maintains | Curated synthesis, owners, review dates | Regression-tested promotion with rollback |
| **F9 Roster** | Nobody knows who is on the team, human or agent | A list someone maintains | Machine-readable roster; `J3` resolves against it | Roster updates from observed participation |
| **F10 Cadence** | Nothing runs on a schedule | Recurring meetings humans remember | Scheduled loops that **emit an artifact**; triggers are declared | Cadence tunes from what its own emissions show |
| **F11 Instrumentation** | Cost is invisible | Spend is reviewed monthly, in aggregate | **Cost attributed per unit of work** and joined to outcome | Routing and budget adjust from measured return |

---

## 5. Vocabulary bridge

When a stakeholder arrives with someone else's model, translate rather than argue.

| External framework | Maps to |
|---|---|
| **NN/g UX Maturity** | 1:1 — same six-stage shape, applied to AI instead of UX. The direct ancestor |
| **ELEKS AI-SDLC** (Traditional · AI-Supported · AI-Assisted · AI-Native · AI-Autonomous) | 1 · 2 · 3 · 5 · 6 — **no clean equivalent for stage 4**, which is where the mechanical threshold sits |
| **Uvik 5-stage AI-Native Company** | AI-Assisted ≈ 3 · AI-Enabled ≈ 4 · AI-First ≈ 5 · AI-Native ≈ 6; nothing at 1–2 |
| **Gartner AI Maturity** (5 levels, 7 pillars) | Roughly 1:1 through 5; no stage 6 — their Level 5 is "Transformational" |
| **Microsoft Frontier Firm** (2026) | "Agent boss" ≈ 5 · "Frontier Firm" ≈ 6 |
| **BCG AI at Work** — *"high usage, limited gains"* | Diagnoses the 2 → 3 transition failure |
| **MIT Sloan** — *"85% use, 29% embedded"* | Locates most orgs empirically at 2–3 |
| **McKinsey State of AI Trust** — *"1% mature"* | Defines mature as 5–6 |

The recurring finding across all of them: **usage is near-universal, embedding is rare.** That gap is
the 2 → 3 → 4 climb, and it is what a framework is for.

---

## 6. Anti-patterns

Named so they can be recognised in the artifact rather than discovered in a retrospective.

| Anti-pattern | What it looks like | The tell |
|---|---|---|
| **Averaging the grid** | "We're a 3.5 overall" | The mean hides the hole. Ask for the minimum |
| **Claiming a stage from a purchase** | "We're stage 4, we bought Claude Code" | Stage 4 requires *enforcement*, not a license |
| **Cosmetic threshold markers** | Named bots with no delegated scope; a leaderboard with no outcome metric | Pre-stage-4 teams adopting stage-5 markers produce theatre |
| **The Goodhart inversion** | Token-usage leaderboard becomes a target | Retire usage as a KPI at stage 5. It is observability, not a target |
| **Skipping the guarantee band** | Motion functions at 4, Policy and Evidence at 1 | The cheapest band to build and the most expensive to have skipped |
| **Raising AI maturity past delivery maturity** | Fast slop | If the gap is ≥2, stop and raise delivery |
| **Buying tools for the organizational threshold** | Another platform purchase to fix a 4 → 5 stall | No tool crosses that threshold. Only a decision does |

---

## 7. Spec for the interactive artifact

**Not built in this pass.** Specified here so it can be built directly.

**Shape.** A single self-contained HTML page, no network, openable from the repo or shared as a link.
Modeled on the NN/g UX-maturity presentation: pick a stage, see what it actually looks like.

**Views.**

1. **The ladder** — six stages across, with per-stage one-liner, what it looks like, failure mode,
   and what graduation requires. Click a stage to expand.
2. **The grid** — twelve functions × six stages. Click any cell for its definition and the artifact that
   evidences it. Self-grade inline; the minimum is computed and displayed prominently, the mean shown
   greyed with a note about why it misleads.
3. **The two-axis plot** — place yourself on AI-native × delivery; the quadrant names the diagnosis
   and the recommended next move.
4. **Thresholds** — the three inflection points, what crosses each, and why teams stall.
5. **Anti-patterns** — §6 as cards.

**Interactions.** Self-grade each function as `[N]` current and `→[M]` target. Compute gap. For each
gap, ask one question: **is this gap internal capability or externally imposed?** (a policy, budget,
or standard outside the team's control). That single annotation is what turns a maturity score into a
negotiation artifact — it makes implicit boundaries explicit so they can be discussed.

**Output.** Export the grade as markdown for the repo, and as a JSON blob the pre-flight generator
(`05-preflight-spec.md`) reads to pre-fill target stages.

**Honesty requirements**, non-negotiable in the build:

- The minimum is displayed at least as prominently as any average.
- A cell cannot be marked achieved without naming the artifact.
- Stage 6 is reachable in the UI but carries the evidential-threshold warning.
- No function's recommended provider defaults to LoomWarp where a native capability exists.

---

*Next: [`04-decision-layers.md`](./04-decision-layers.md) — who decides what, and what it costs to
change later.*
