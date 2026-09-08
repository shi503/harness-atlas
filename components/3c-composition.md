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
graded: false
requires: ["2a"]
---

[← the roster](./00-README.md) — all 33, and the graded split · [CROSSWALK](./CROSSWALK.md) — recorded gaps and the rulings that closed them · [RELATIONS](./RELATIONS.md) — the `requires` graph

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
condition [`12-horizon.md`](../archive/spec/v1-framework/12-horizon.md) §2 defines as `emerging`, and the place where a
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

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 6 · ◐ 4 · ○ 0** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#3c-composition) | ● | [**Subagent**](../content/claude-code.md#5-primitives) + [**Agent team**](../content/claude-code.md#5-primitives) (experimental, off by default) |
| [Codex](../content/codex.md#3c-composition) | ● | [**Subagent**](../content/codex.md#5-primitives) TOML roles; thread-spawn graph persists delegation |
| [FRACTAL](../content/fractal.md#3c-composition) | ◐ | Four tier-agent role files; overlay mechanism (`*.local.md`) |
| [Gas City](../content/gas-city.md#3c-composition) | ◐ | No sub-agent delegation; composition happens by **importing packs** |
| [Grok](../content/grok.md#3c-composition) | ● | [**Agent / Subagent / Persona / Role**](../content/grok.md#5-primitives) — three objects |
| [Hermes](../content/hermes.md#3c-composition) | ● | [**Profile**](../content/hermes.md#5-primitives) = agent; Bot Mode; `delegate_task` subagents, depth 1 |
| [LoomWarp](../content/loomwarp.md#3c-composition) | ◐ | Five role files; the composition runtime itself is Claude Code's |
| [OpenClaw](../content/openclaw.md#3c-composition) | ● | [**Agent**](../content/openclaw.md#5-primitives) config entries + sub-agents + experimental swarm |
| [OpenCode](../content/opencode.md#3c-composition) | ● | [**Agent**](../content/opencode.md#5-primitives) — Markdown + frontmatter, `mode: primary\|subagent\|all` |
| [Pi](../content/pi.md#3c-composition) | ◐ | No sub-agents; the shipped `subagent/` example spawns separate `pi` processes |

**Horizon:** `emerging` — `11-architecture.md` §3.1 — two peers, no shared word: Claude Code's 29 lifecycle events and DeepAgents' middleware stack, *"the same design reached independently"*

**The consequence.** A team that owns its parts and not their arrangement can add a capability and
cannot predict what it changed. **The failure is not that composition is missing — every system composes
something — it is that the composition is implicit,** and an implicit arrangement cannot be reviewed,
cannot be inherited by the next person, and cannot be given a floor.

> ### The deletion test — stated plainly, because hiding it would be the tell
>
> **On the seeded graph this component performs no job and is required by nothing.** It carries one
> outbound edge — it *requires* [`2a`](./2a-adapters-and-middleware.md) — and **zero inbound**: no
> other component's argument says it cannot work without composition
> ([`RELATIONS.md`](RELATIONS.md) §3.1, thirteen cited edges, none of them ending here). On a graph
> that sparse it is the weakest node in the set.
>
> **The test, and it is cheap:** delete `3c` and re-read the corpus. If every claim it carries can be
> made at `2a` (which insertion points a harness *offers*) or at [`3d`](./3d-configuration.md) (what
> a given agent is *configured* with), the component was a distinction without a gradeable object and
> should retire by ruling, per the standing rule that a vocabulary retires by writing a ruling,
> publishing a crosswalk and re-heading the loser.
>
> **What the test has to beat.** The corpus reads `emerging` here on two peers with no shared word —
> Claude Code's lifecycle events and Deep Agents' middleware stack, *"the same design reached
> independently"*. Independent arrival is the strongest evidence in this atlas that a component is
> real rather than invented, and it is the argument a deletion has to answer. **Recorded as open, not
> resolved:** nobody has run this test, and W5's `AC-4` asks that the page say so rather than let the
> row sit unexamined because it is easier to keep a row than to kill one.
