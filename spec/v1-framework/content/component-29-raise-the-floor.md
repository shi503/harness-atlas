---
title: "9e · Raise the Floor"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "9 IMPROVE"
sublayer: "9e"
function: "F8.2"
job: "J16"
horizon: "bet"
img: img/290-raise-the-floor.png
wave: W4
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 9e · Raise the Floor

**Layer 9 IMPROVE** · function `F8.2` · job `J16`

> **How does a second way of doing something get retired?**
>
> Raising the floor is **the ratchet**: a working convention graduates into the single sanctioned way,
> and the alternatives are **removed** rather than deprecated. It promotes *convention*, and the
> graded half is the retirement, not the graduation.

**A primitive set is a harness's architecture, and this is the job that produces one.** Primitives are
the static state — *there is one way to express this*. This is the dynamic — **how a second way gets
retired.** Without the ratchet a primitive set is an aspiration that ages into a feature list, which
is the same failure `01-concepts.md` §3.17 defines a primitive against, arriving through time rather
than through design ([`03-jtbd.md`](../../../comparisons/03-jtbd.md) §2 `J16`).

**The failure it prevents is the one nobody models, and the corpus can prove the omission with a
number.** `harden` scores 10, `golden path` 6, `best practice` 3 — and **`stagnat` scores 0.** Harness
decay is not being discussed at all. *"A harness does not stay still. Without a ratchet the floor
drops"*, conventions multiply, and the agent starts reinventing — which is *one way to do each thing*
failing one level down, silently, over months.

**The nearest published thing is an artifact where this needs a mechanism.** CNCF platform engineering
has *golden paths* — *"the curated, pre-approved blueprints that make the secure, compliant choice the
easiest choice"* — and a blueprint is a **thing**, published once. **A ratchet is a repeated act**, and
the distinction is the whole component: a team can hold an excellent set of golden paths beside four
other ways of doing the same job, all of them still working, none of them removed.

**Removal is the tell, and it is the property the corpus keeps finding absent.** The same shape is
graded one layer down at [`4a`](./component-11-capability.md), where the question is whether a
capability can be *un*-installed. **Here it is a question about authority rather than about
plumbing:** anything can add a sanctioned way, and a team that has never withdrawn one has not
demonstrated this row, whatever its documentation asserts.

**What this layer is not.** It is not [`9a`](./component-25-learning.md) Learning. `F8` decomposed on
exactly this line: `9a` promotes **knowledge** — a fact, a lesson, a rule — and this promotes
**convention**, the sanctioned way of doing something. It is not
[`3e`](./component-10-standards.md) Standards, which is the artifact the convention lands *in*;
authoring a standard and retiring its competitor are different maturities on the same shelf.

**How do we work?** *"When a second way of doing something appears, one of them is retired — we do not accumulate two."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | `◐`, and the gap is a missing **act** rather than a missing mechanism: **nothing decides that one way is now the way, and nothing withdraws the others.** Both halves it would need are already shipped and graded elsewhere — the evidence a promotion rests on at [`8a`](./component-21-evals.md), the removal path at [`4a`](./component-11-capability.md) — which makes this the clearest case in the corpus of a ratchet that is missing only its decision | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides* — Distribution and Learning rows |
| **Deep Agents** | The nearest mechanical floor in the corpus — the protected core, graded at [`3c`](./component-08-composition.md) — and reading it from *this* row is what shows the gap. ⚠️ **It holds a floor fixed; it does not raise one**, which is the whole difference between a floor and a ratchet | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §2 *The default stack, in order* |
| **MCP** | **Nothing here.** Its adoption pattern is the opposite of a ratchet — servers accumulate, and the protocol carries no notion of one connection superseding another. A surface designed for addition has nothing to say about retirement | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The corpus's one natural experiment in what a floor survives: when the multi-repo orchestration was absorbed into the product, the canon it carried outlived the machinery around it — **the survival result itself is [`3e`](./component-10-standards.md)'s**, and what it demonstrates *here* is that a floor and the system enforcing it can be retired independently, which is the condition a ratchet has to operate in | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §5 |
| **ours** | `○`, and the gap is precisely the compounding half of our strongest row. The standards tier is real; **the mechanism that feeds it is not** — named review finding-classes that any review may append to and that promote into canon once hardened is the half of that row the prior art had and we do not | [`02-component-matrix.md`](../../../comparisons/02-component-matrix.md) §1 — *Reading the three rows that matter* |

**Horizon:** `bet` — `03-jtbd.md` §2 `J16` — *"Nobody as a job."* CNCF's golden paths are the nearest and are an artifact, not a ratchet. **`stagnat` scores 0** — harness decay is not being discussed at all. Said out loud

**The consequence.** Decay is the only failure in this framework with no event: nothing breaks, no
alarm fires, and the harness simply becomes a place where four things are true at once. **A team
notices it as *the agent keeps doing it the old way*** — which reads as a model problem and is a
convention problem, because the old way is still sanctioned and nobody ever said otherwise.
