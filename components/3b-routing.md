---
title: "3b · Routing"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "3 System Stacks"
sublayer: "3b"
function: "F4 (split)"
job: "J3"
horizon: "emerging"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 3b · Routing

**Layer 3 System Stacks** · function `F4 (split)` · job `J3`

> **Who picks this up?**
>
> Routing is the resolution of a unit of work to **an actor**, **a capability set** and **a context
> set** — deterministically, against a list, with no model in the decision loop. `3a` decides *what
> runs next*. This decides *who runs it*, and the two are independently gradeable.

**The distinction the field has not named is between dispatching *a* task and dispatching *the right*
task.** No published harness taxonomy elevates routing to a layer; it survives buried inside a *tool
registry*, which is a different object — a catalogue of what can be called, not a rule about who calls
it. Tan states the shape exactly: *"a resolver is an org chart. A task comes in and it decides which
markdown file or who handles it"* ([`03-jtbd.md`](../comparisons/03-jtbd.md) §2 `J3`).

**A resolver is only as good as the list it resolves against**, and that list is `10a` Roster. The
dependency is published — *"`J3 route` requires `J14 know who exists`. 'A resolver is an org chart'
presumes the chart"* — and it is the reason routing so often degrades into the model choosing a
subagent by name similarity.

> ⚠️ **A structural observation, recorded rather than resolved.** The stack rule is that nothing at a
> layer is chosen before the layers beneath it are settled. `3b` resolves against `10a`, which sits seven
> layers above it. **That is a real upward dependency in a bottom-up architecture**, and it is stated
> here because the alternative is that a reader finds it. It does not follow that either component is
> mis-placed — the roster is a *Teams & Agents* object by every other test — but the ordering claim is
> weaker than the diagram implies, and **cardinality and placement are KD decisions, not taken here**
> ([`03-jtbd.md`](../comparisons/03-jtbd.md) §3 *Dependencies between jobs*).

**What makes it deterministic is what makes it gradeable.** A rule that resolves — `frontend-dev` work
goes to the actor holding that bound, in the repo the estate says owns it — can be read, diffed and
disagreed with before it runs. A model choosing an agent produces the same outcome sometimes and cannot
be reviewed at all.

**How do we work?** *"Who picks up a piece of work is decided by a rule that resolves against our roster, not by a model's guess."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | `◐` — agent teams claim work with **file locks**, which is contention control rather than routing: it decides *that only one teammate takes a unit*, not *which teammate should*. There is no roster to resolve against | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Orchestration row |
| **Deep Agents** | Routing exists and is aimed at a different axis: `profiles/` resolves **which implementation for which model family** — the substrate question, graded at `0a`. Sub-agent selection itself is left to the model | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *Profiles* |
| **MCP** | The nearest published thing, and it is narrow: a call is routed to **a server**, declared per project. That is registry resolution — *which connection*, never *which actor* | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | A **named set** rather than a rule: six purpose-built subagents — `codebase-locator`, `codebase-analyzer`, `codebase-pattern-finder`, `thoughts-locator`, `thoughts-analyzer`, `web-search-researcher`. Naming the destinations is most of the work; the selection is still the model's | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §7 |
| **LoomWarp** | `router.py` — a deterministic resolver, and one of the few things in its column that is genuinely built. ⚠️ It resolves against a blueprint, **not against a roster**, because no roster exists — which makes it a sequencer wearing a router's name | [`loomwarp.md`](../content/loomwarp.md#3b-routing) |

**Horizon:** `emerging` — `03-jtbd.md` §2 `J3` — *"Nobody, as a named function."* Three peers build it and disagree on the word: Gas City `formulas → beads → orders`, QM scope-based, generic-cerebro's project architect

**The consequence.** Three peers built this and none of them named it, which is precisely the condition
in which a framework can contribute a word rather than a claim. **What a team loses without it is not
throughput but reviewability**: when the assignment is a model's judgement, there is nothing to argue
with after a unit of work goes to the wrong place, and nothing to change so that it does not happen
again.
