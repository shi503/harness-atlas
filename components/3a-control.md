---
title: "3a · Control"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "3 System Stacks"
sublayer: "3a"
function: "F4 (split)"
job: "J4 · J7 · J5"
horizon: "shipped"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 3a · Control

**Layer 3 System Stacks** · function `F4 (split)` · job `J4 · J7 · J5`

> **How does intent become work that is allowed to start?**
>
> Control is **the decomposition** of intent into scoped units, **the dependency graph** with real
> edges, **the dispatcher** that respects them, **the recovery** path when a step fails, and **the
> named bound** each unit runs under. No model sits in that decision loop.

> **Ruled 2026-08-31 — `J5 bound` is part of Control.** KD: *"this is part of the control function.
> in ours things like `frontend-dev` or `soc2` etc… are descriptions for these."* **The decision of what
> an agent may do is declared as a named bound** — a role or compliance descriptor — and Control owns it.
> `2c` Enforcement is the mechanism that holds it; `4b` is the per-package grant. Control already owns
> `J7 recover`, so it holds both *what an agent may do* and *what happens when it cannot*.

**A named bound is a decision, and it reads as one.** `frontend-dev` and `soc2` are not permission sets;
they are descriptions of a kind of work, and the permission set is derived from them one layer down.
That is why the decision is graded here and the mechanism is graded at `2c` — **a team can have precise
bounds and no enforcement, or comprehensive enforcement over bounds nobody named**, and those are
different failures with different fixes.

**Recovery is control flow, not a Trust concern.** The same graph that decides what runs next decides
what happens when a step fails: bounded retry, then escalation, then self-heal. And the transferable
rule from the prior art is narrow and cheap — **an escalation carries a proposed decision**. An
escalation without one moves the problem without moving the decision.

> **`AC-7` bites here, and the split is the answer.** `router.py` and `dispatch.py` are **machinery** —
> *a thing that runs* — and machinery is not graded. **The gradeable object is the work contract the
> resolver reads**, and it is graded at `7a`, one layer up. A team does not configure a resolver; it
> configures the contract. `F4`'s split across layers 3 and 7 is that correction made structural rather
> than annotated ([`11-architecture.md`](../archive/v0/11-architecture.md) §4, `C-24`).

**What this layer is not.** It is not `3b` Routing — *which actor* picks the unit up is a separate
resolution against a separate list, and a team can sequence perfectly while assigning by guesswork.

**How do we work?** *"Intent goes in, a dependency graph comes out, and nothing starts before what it depends on has landed."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The most complete native answer: agent teams with **task dependencies, file-locked claiming and automatic unblocking**, plus dynamic workflows — resumable, 16 concurrent, 1,000 per run. ⚠️ And the published gap that is the honest argument for anything above it: **no durable execution across process death** — workflows resume only within a session | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Orchestration row, §*What it does not provide* |
| **Deep Agents** | Delegation and a task list rather than a graph — `TodoListMiddleware` and `SubAgentMiddleware` in a declared stack — with the loop **bounded** at the other end by a rubric grader that resumes the agent until `satisfied`, `failed`, or `max_iterations` | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *The default stack*, §2 *Rubric* |
| **MCP** | **Nothing here.** MCP resolves a call, not a sequence; it has no notion of a unit of work, a dependency, or a bound | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | Sequencing as a **method rather than a graph** — research → plan → implement, each with a published prompt, compacting status back into the plan file after each verified phase, with only implementation happening in a worktree. And a published effort distribution that says when to skip it: *"~40% of tasks are one-shot"* | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3 |
| **ours** | `BLUEPRINT` → `router.py` → `dispatch.py` with a work-contract schema. **Built — and zero dependency edges have ever been exercised**, which is the difference between shipping a graph and having used one | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* |

**Horizon:** `shipped` — `03-jtbd.md` §2 `J4` *"Who"* — Claude Code agent teams with file-locked claiming; Gas City formulas; FRACTAL `BLUEPRINT` → router → dispatch

**The consequence.** The field agrees on decomposition and disagrees on whether the edges are worth
declaring — one camp builds the graph, the other runs one task per iteration and lets the loop sort it
out. **That disagreement is survivable; declaring edges you have never exercised is not.** A dependency
graph that has never blocked anything is a diagram, and it will fail the first time it is asked to be
load-bearing.
