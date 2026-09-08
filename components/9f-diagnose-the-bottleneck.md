---
title: "9f · Diagnose the Bottleneck"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "9 IMPROVE"
sublayer: "9f"
function: "F11 (split)"
job: "J17"
horizon: "bet"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 9f · Diagnose the Bottleneck

**Layer 9 IMPROVE** · function `F11 (split)` · job `J17`

> **What is limiting us, and what do we fix next?**
>
> Diagnosis is **the Constraint**: which part of the system is currently binding throughput, named as
> one thing rather than a list. Its defining property is that **the answer moves when you fix it** —
> a diagnosis that returns the same answer after the fix was not a diagnosis.

**This is Theory of Constraints arriving in the field without the label.** No harness taxonomy names
it; DX and Jellyfish instrument *throughput* and none of them names the constraint. And the corpus
disagrees with the models loudly: **`bottleneck` 37 · `constraint` 26 — larger than most of the
original twelve functions** — carried by substantive statements rather than incidental ones, from
*"the real bottlenecks are left and right of code: planning, orchestration, review, and operations"*
to *"human-only code reviews create massive bottlenecks"*
([`03-jtbd.md`](../comparisons/03-jtbd.md) §2 `J17`).

**We already implement it, and did not know that was what we had built.** The Grid at
[`references/grid.html`](../maturity/grid.html) computes the weakest thread and displays it as
`s-neck`, *"what actually limits you next"*, driven off the same **minimum-governs** rule that makes a
layer's grade its weakest component. **The thinnest warp thread *is* the bottleneck**, so the maturity
diagnostic does not merely grade a team — it names what to fix next, and the answer moves as they fix
it. *"The artifact was ahead of the framework"*
([`NEXT-STEPS.md`](../archive/sessions/NEXT-STEPS.md) §3).

**It is the one job in the seventeen with a stated prerequisite, and the gate is real.** *"This is not
a job a young harness can do."* You cannot detect a constraint without measurement; measurement means
checks running on a cadence and an accounting to read. **`J17` depends on
[`9c`](./9c-cadence.md) and on [`8d`](./8d-efficiency.md)** — which is why `F11` split
across layers 8 and 9 rather than decomposing inside one: **a function whose parts depend on each
other across an ordering boundary is not one gradeable row**
([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §2).

**The gradeable property is that it is a single answer with a consequence attached.** A dashboard
showing twelve numbers has not diagnosed anything; a team that can say *review is the constraint this
month, here is the measurement, and here is what we stopped doing about the other eleven* has. **The
minimum is the diagnosis and the mean is the flattery** — which is why the Grid has rows instead of a
score ([`03-maturity.md`](../archive/v0/03-maturity.md) §4).

**What this layer is not.** It is not `8d` Efficiency, which produces the reading this consumes:
measurement is a fact, diagnosis is a judgement, and a team can have complete cost attribution and no
named constraint. It is not [`9e`](./9e-raise-the-floor.md), which acts on what this finds.

**How do we work?** *"We can name the one thing limiting us this month, and the answer moves when we fix it."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | **Nothing, and the boundary is the reason.** It emits the raw material completely — the attribution is read at [`8d`](./8d-efficiency.md) — and holds **no model of the team's process to locate a constraint *in***. Diagnosis needs a structure to be a bottleneck *of*, and a harness bounded at one repo has none. Perfect measurement over no structure yields a dashboard | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Evidence row |
| **Deep Agents** | The nearest published artifact and it diagnoses **models, not teams**: a cross-model scorecard with per-category breakdown, `pass@k` / `avg@k`, and a frozen lite profile — genuinely comparative and pointed at the harness's own performance. Its own teardown records that team altitude is absent, which is where a bottleneck would have to live | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §5 *Evidence*, §8 |
| **MCP** | **Nothing here.** It is one of the things a diagnosis ranges *over*, never the thing that ranges — a connection can be the constraint, and cannot name one | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The one peer that reaches this altitude in prose, and it names the discipline outright — its keynote closes on a section titled *"a theory of constraints (2026 edition)"*: *"Models are good at some things, not so good at others. How do you optimize your process in light of those constraints?"* **An argument, published, with no instrument under it** | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §2 |
| **LoomWarp** | **The one row where it ships the mechanism and everyone else ships the observation.** `s-neck` computes the binding constraint from the minimum across warp threads, with the woven-fabric SVG marking `TEARS HERE` on the weakest. ⚠️ And the honest half: it runs on a self-grade a person types in, so the diagnosis is real and the measurement feeding it is not | [`references/grid.html`](../maturity/grid.html) · [`loomwarp.md`](../content/loomwarp.md#9f-diagnose-the-bottleneck) |

**Horizon:** `bet` — `03-jtbd.md` §2 `J17` — *"No harness taxonomy"* names it, and *"Nobody, as a named capability"* ships it; DX and Jellyfish instrument throughput without naming the constraint. `bottleneck` 37 · `constraint` 26. Said out loud

**The consequence.** What a team loses without this row is not insight but **sequencing**. Everything
is improvable, so improvement goes wherever attention already was — toward the rows somebody enjoys,
or the ones a vendor just made easy — and the one thing actually holding the system back stays exactly
as it is while eleven others get better. **The work is real, the effort is real, and the throughput
does not move**, which is the most demoralising failure in the framework and the hardest to argue with
from inside.
