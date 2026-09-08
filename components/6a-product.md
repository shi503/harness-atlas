---
title: "6a · Product"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "6 Workspaces"
sublayer: "6a"
function: "F15"
job: "—"
horizon: "bet"
graded: true
requires: []
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 6a · Product

**Layer 6 Workspaces** · function `F15` · job `—`

> **Where does the work land, and what is it not allowed to become?**
>
> Product is **the deliverable** — the thing the team actually ships — together with **the
> directives** on it: the constraints on that destination, written down before any work starts. The
> deliverable is not the finding. **The directives are.**

**Everyone has a deliverable; almost nobody has written what it may not become.** That asymmetry is
the whole reason this is a graded row rather than an obvious one. KD's own instance is exact —
*"LoomWarp can only be configured as a monorepo or virtual-monorepo"* — and
[`11-architecture.md`](../archive/v0/11-architecture.md) §5.1 records it as **the largest hole** in the
inherited model: *"There is no layer for where outcomes land."* A constraint on the deliverable that
lives in one person's head is re-argued on every unit of work, and an agent re-argues it every
session.

> ### ⟳ Layer 6 is the second of only two layers that accumulate.
>
> Everything below layer 5 is **configured**; everything above layer 6 **runs**. Between them sit the
> two a team cannot buy — you can rent a model and import a standards pack, and you can import
> neither the context your team has accumulated nor **the product it has built**
> ([`11-architecture.md`](../archive/v0/11-architecture.md) §2). The claim's named, dated **falsifier** is
> stated once, at [`5a`](./5a-individual-memory.md), and is not restated here.

**What accumulates here is the directive set, not the artifact count.** A codebase growing is not a
layer maturing. What compounds is the number of constraints the team has *made explicit* — this
deploys as a monorepo, this ships behind a flag, this is never a breaking change — because each one
is a decision that never has to be taken twice.

**What this layer is not.** It is not [`6c`](./6c-estate.md) Estate, which is the
**inventory** — what code exists, who owns it, what a change in one repo does to another. Product is
what is being *built* and the rules it obeys; Estate is the ground it is built on, and the two are
graded apart because a team can hold a precise directive set across a repository map nobody
maintains. It is not [`6d`](./6d-delivery.md), which is the **path** to production, nor
[`6b`](./6b-infrastructure.md), which is the runtime it lands in.

**How do we work?** *"We can point at where a piece of work lands, and the constraints on that destination were written down before the work started."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | **Nothing, deliberately.** Its job is *"make the agent capable in this repo"*; the deliverable is the thing the repo is *for*, and that sits outside the boundary it drew on purpose — **the boundary itself is quoted and used at [`11a`](./11a-surfaces.md)**, where it answers the team-scale question directly | [`03-jtbd.md`](../comparisons/03-jtbd.md) Appendix A |
| **Deep Agents** | The nearest published directives in the corpus, and they constrain **its own** deliverable rather than a customer's: four stated principles — *opinionated · extensible · model-agnostic · production-ready* — and, in the threat model enumerated at [`1a`](./1a-environment.md), **an explicit out-of-scope list with rationale**. Writing down what a product will not do is exactly this component's move, one altitude down | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §1, §5 |
| **MCP** | **Nothing here, and it is a level-of-altitude fact rather than a gap.** MCP is *"external tool or data connections"*; a connection mechanism has no notion of a thing being shipped, so there is nothing for it to constrain | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The one peer with a named object in this space: **artifact**, alongside task, session, worktree and repository. It is *the output of a session*, not *the thing the team ships*, and the difference is the component — an artifact accumulates per run; a deliverable is what the runs are for | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §6 |
| **LoomWarp** | **The directive KD names is real and is nowhere on disk.** The honesty register it does keep is about *implementation status* — BUILT / PARTIAL / DESIGNED-ONLY tagging — which is a directive on the documentation, not on the product | [`loomwarp.md`](../content/loomwarp.md#6a-product) |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 0 · ◐ 0 · ○ 10** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#6a-product) | ○ |  |
| [Codex](../content/codex.md#6a-product) | ○ |  |
| [FRACTAL](../content/fractal.md#6a-product) | ○ | Nothing here — no statement of what output may not become |
| [Gas City](../content/gas-city.md#6a-product) | ○ | Work lands as commits/PRs; no "must not become" statement found |
| [Grok](../content/grok.md#6a-product) | ○ | No PRD/spec object; closest is `plan.md`'s Context section |
| [Hermes](../content/hermes.md#6a-product) | ○ | Nothing PRD-like |
| [LoomWarp](../content/loomwarp.md#6a-product) | ○ | No statement of what its own output may not become |
| [OpenClaw](../content/openclaw.md#6a-product) | ○ | Nothing PRD-shaped; goals and Workboard both disclaim the role |
| [OpenCode](../content/opencode.md#6a-product) | ○ | No PRD/spec object |
| [Pi](../content/pi.md#6a-product) | ○ |  |

**Horizon:** `bet` — `11-architecture.md` §5.1 `F15` — *"The largest hole. There is no layer for where outcomes land."* No peer names the deliverable or its directives as a harness function. Said out loud

**The consequence.** A team that has not written its directives still has them — held by whoever last
won the argument, and unavailable to anyone who was not in it. **The cost is not a missing document;
it is that the constraint is discovered by violating it**, at the point where an agent has already
built the thing the constraint forbade and nobody can say when the rule was made.
