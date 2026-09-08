---
title: "3c · Composition"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "3 System Stacks"
sublayer: "3c"
function: "new"
job: "—"
horizon: "emerging"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 3c · Composition

**Layer 3 System Stacks** · function `new` · job `—`

> **What is this agent made of?**
>
> Composition is the assembly of **the system that does the work** — which middleware wraps which call,
> in what **order**; which **subagent** owns which context; which skills are in scope. `3a` sequences
> the work. This assembles the worker, and it is a separate thing to be good or bad at.

**The first decision in composition is an isolation decision, and it is published and empirical.**
Subagents *"operate in parallel to the central agent loop, in their own context"* and return results to
the parent, **whereas skills execute within the calling agent's context**. That single sentence is the
clearest statement of the boundary anywhere, and the boundary it draws is about **context isolation,
not capability** ([`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1).
Everything else in this component follows from it: composing an agent is deciding what shares a context
window with what.

**Order is architecture.** A stack where human-in-the-loop wraps everything — including whatever the
team added — behaves differently from one where it is inserted wherever it was declared, and neither is
readable unless the order is written down. **A composed system with no declared order is a system whose
behaviour is an artifact of import sequence.**

**And composition needs a floor.** The strongest published pattern here is a **protected core**: a set
of scaffolding a profile is not permitted to strip, enforced by raising rather than by convention. That
is the difference between an extensible system and a system whose extension points can quietly remove
its guarantees.

**Why it is new rather than a re-cut of `3a`.** `F4` sequences *work*. Nothing in `F0`–`F16` owns the
assembly of the runner. Two peers built the object independently and named it differently — the
condition [`12-horizon.md`](../spec/v1-framework/12-horizon.md) §2 defines as `emerging`, and the place where a
framework can contribute a word rather than stake a claim.

**What this layer is not.** It is not `2a`, which enumerates the insertion points a harness *offers*;
this decides which of them a given agent *uses*. It is not `4a`, which is what capabilities exist at
all.

**How do we work?** *"An agent here is assembled from named parts — which middleware wraps the call, which subagent owns which context — and we can change one part without rewriting the rest."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | Composition by **primitive**, not by stack: skills subsume custom commands and **can fork into subagents**; subagents carry isolated context, `memory:` scopes and worktree support. The parts are first-class and the assembly is not declared anywhere a reader can diff | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Skills and Subagents rows |
| **Deep Agents** | The most explicit implementation in the corpus: a **default stack written in order**, with user middleware inserted at a named position, harness-profile middleware after it, and human-in-the-loop last so it wraps everything. Plus a **protected core** a profile may not strip, enforced with `ValueError` | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *The default stack, in order* |
| **MCP** | Composition of the **tool surface** only — which servers are attached, and therefore which calls exist. It says nothing about what shares a context window, which is the decision this component is about | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | `fold` composes a session as **an event log plus a projection** — `EventLog`, `Projection`, `Compaction`, `StopConditions`. A session is a log you fold into state, which makes reconstruction free and is a genuinely different assembly model from a middleware stack | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §6 |
| **LoomWarp** | Agent definitions exist and score `●` in its own matrix; **the assembly does not**. There is no declared stack, no protected core, and no statement of what shares a context with what | [`02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 |

**Horizon:** `emerging` — `11-architecture.md` §3.1 — two peers, no shared word: Claude Code's 29 lifecycle events and DeepAgents' middleware stack, *"the same design reached independently"*

**The consequence.** A team that owns its parts and not their arrangement can add a capability and
cannot predict what it changed. **The failure is not that composition is missing — every system composes
something — it is that the composition is implicit,** and an implicit arrangement cannot be reviewed,
cannot be inherited by the next person, and cannot be given a floor.
