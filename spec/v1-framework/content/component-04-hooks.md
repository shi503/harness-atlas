---
title: "2b · Hooks"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "2 Agent Harness"
sublayer: "2b"
function: "F13.2"
job: "—"
horizon: "shipped"
img: img/040-hooks.png
wave: W3
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 2b · Hooks

**Layer 2 Agent Harness** · function `F13.2` · job `—`

> **When does something happen without anyone remembering to run it?**
>
> A hook is a script the harness runs at a **lifecycle point the harness defines** — not a wrapper the
> caller composes. That difference is the whole of why it is graded apart from `2a`: middleware is
> **yours to arrange**, and a hook fires whether or not anyone arranged anything.

**Hooks attach at layer 2, and the assignment is not ours to argue.** The published definition of the
mechanism is *"scripts executed at specific agent lifecycle points"*, and it ships with configuration
paths in **four of the five tools surveyed**. Where the configuration mechanisms attach *as a set* is
`3d`'s question; that this one attaches here is settled.

> ⚠️ **The source enumerates the mechanism and not the points.** *"The lifecycle points are never
> enumerated"* in the published paper, which also contains no agent-loop diagram and no insertion-point
> taxonomy. Any list of phases in this framework is cited to a **vendor's own code**, never to the
> survey ([`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1).

**The phase sets converged, and nobody agreed to converge.** `fold` names four — `preRequest`,
`preToolUse`, `postToolUse`, `onComplete`. Deep Agents names six middleware hooks, five of them with an async twin.
Claude Code names 29 events. **Three independent teams, three languages, and the same shape: wrap the
request, wrap the tool, bracket the session.** The corpus's own reading is that the insertion-point set
should be treated as **a converged interface rather than a per-vendor detail**
([`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §6).

**The mechanism converged; how many teams took it is unmeasured.** Hooks is one of three mechanisms
the survey gives **no standalone absolute count anywhere** — per-mechanism adoption is published as a
figure and nowhere as prose. **A converged, near-free mechanism whose uptake nobody has counted is a gap
in the evidence, and the honest move is to leave it as one rather than estimate.**

**What this layer is not.** A hook is the **place**; what is decided there is `2c` Enforcement, and the
same hook point carries both the deny decision and, at other phases, work that has nothing to do with
policy at all. Grading them together is how a team with rich automation and no gate scores well.

**How do we work?** *"Things happen at fixed points in the loop because we configured them there, not because someone remembered to run them."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | 29 lifecycle events with a real permission-decision protocol. The distinguishing capability is that a handler can **deny *and rewrite input***, which makes a hook an editor of the call rather than a veto on it | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides, in one screen* — Hooks row |
| **Deep Agents** | Hooks *as* middleware, which is the interesting divergence: **there is no separate hook mechanism at all**, so a vendor has collapsed the two components this framework grades apart. How the resulting stack is arranged is `3c`'s concern | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §2 *Middleware — the insertion points, counted in code* |
| **MCP** | **Nothing here.** MCP is a connection mechanism; it has no lifecycle of its own to fire on and is a separate row in the same survey table. Recorded rather than stretched | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, rows 6 and 8 |
| **HumanLayer** | The clearest demonstration that a hook is a **binding** and not an automation: `thoughts/` is enforced by a *"pre-commit hook — prevents `thoughts/` from being committed to your code repo"* and a *"post-commit hook — syncs thoughts changes to your thoughts repository."* **Not prose. Hooks.** Plus `fold`'s four-phase `HookPhase` type | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §4, §6 |
| **ours** | **`○`, recorded against ourselves**: no hooks, no handler bound at any lifecycle point. Every convention this repository holds is held by somebody remembering it | [`03-jtbd.md`](../../../comparisons/03-jtbd.md) §2 `J5` |

**Horizon:** `shipped` — `07-verified-inventories.md` §1 Table 1, row 6 — *"scripts executed at specific agent lifecycle points"*, shipped with published configuration paths in **four of the five tools surveyed** across 2,853 repositories

**The consequence.** A convention that depends on someone remembering it is a convention that survives
exactly as long as the person who wrote it stays on the team. A hook is the cheapest place in the whole
framework to convert an intention into a fact, and the survey says most repositories still have not
spent it.
