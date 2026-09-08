---
title: "2b · Hooks"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "2 Agent Harness"
sublayer: "2b"
function: "F13.2"
job: "—"
horizon: "shipped"
graded: false
requires: []
---

[← the roster](./00-README.md) — all 33, and the graded split · [CROSSWALK](./CROSSWALK.md) — recorded gaps and the rulings that closed them · [RELATIONS](./RELATIONS.md) — the `requires` graph

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
> survey ([`07-verified-inventories.md`](../archive/comparisons/2026-08-research/07-verified-inventories.md) §1).

**The phase sets converged, and nobody agreed to converge.** `fold` names four — `preRequest`,
`preToolUse`, `postToolUse`, `onComplete`. Deep Agents names six middleware hooks, five of them with an async twin.
Claude Code names 29 events. **Three independent teams, three languages, and the same shape: wrap the
request, wrap the tool, bracket the session.** The corpus's own reading is that the insertion-point set
should be treated as **a converged interface rather than a per-vendor detail**
([`systems/humanlayer.md`](../archive/comparisons/systems/humanlayer.md) §6).

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
| **Claude Code** | 29 lifecycle events with a real permission-decision protocol. The distinguishing capability is that a handler can **deny *and rewrite input***, which makes a hook an editor of the call rather than a veto on it | [`systems/claude-code.md`](../archive/comparisons/systems/claude-code.md) §*What it provides, in one screen* — Hooks row |
| **Deep Agents** | Hooks *as* middleware, which is the interesting divergence: **there is no separate hook mechanism at all**, so a vendor has collapsed the two components this framework grades apart. How the resulting stack is arranged is `3c`'s concern | [`systems/langchain-deepagents.md`](../archive/comparisons/systems/langchain-deepagents.md) §2 *Middleware — the insertion points, counted in code* |
| **MCP** | **Nothing here.** MCP is a connection mechanism; it has no lifecycle of its own to fire on and is a separate row in the same survey table. Recorded rather than stretched | [`07-verified-inventories.md`](../archive/comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, rows 6 and 8 |
| **HumanLayer** | The clearest demonstration that a hook is a **binding** and not an automation: `thoughts/` is enforced by a *"pre-commit hook — prevents `thoughts/` from being committed to your code repo"* and a *"post-commit hook — syncs thoughts changes to your thoughts repository."* **Not prose. Hooks.** Plus `fold`'s four-phase `HookPhase` type | [`systems/humanlayer.md`](../archive/comparisons/systems/humanlayer.md) §4, §6 |
| **LoomWarp** | **`○`, recorded against itself**: no hooks, no handler bound at any lifecycle point. Every convention the repository holds is held by somebody remembering it | [`03-jtbd.md`](../archive/comparisons/03-jtbd.md) §2 `J5` |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 8 · ◐ 0 · ○ 2** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#2b-hooks) | ● | [**Hook**](../content/claude-code.md#5-primitives) — 33 events, fail-open by default, 5 handler types |
| [Codex](../content/codex.md#2b-hooks) | ● | [**Hook**](../content/codex.md#5-primitives) — 11 named lifecycle events; MCP-tool hooks fail open |
| [FRACTAL](../content/fractal.md#2b-hooks) | ○ | Nothing here — no hook system of its own, any instance |
| [Gas City](../content/gas-city.md#2b-hooks) | ● | `on_boot`/`pre_start`/`session_*`/`work_query`/order triggers/`gc hook` |
| [Grok](../content/grok.md#2b-hooks) | ● | [**Hook**](../content/grok.md#5-primitives) — 15 named events; fail open |
| [Hermes](../content/hermes.md#2b-hooks) | ● | [**Hook**](../content/hermes.md#5-primitives) — plugin, shell (Claude-Code-compatible) and gateway events |
| [LoomWarp](../content/loomwarp.md#2b-hooks) | ○ | Checked `.claude/settings.local.json`, `policy/tier-*.json`; none of its own |
| [OpenClaw](../content/openclaw.md#2b-hooks) | ● | Two typed tiers + webhooks — internal observe-only, plugin [**Hook**](../content/openclaw.md#5-primitives) can block |
| [OpenCode](../content/opencode.md#2b-hooks) | ● | [**Plugin**](../content/opencode.md#5-primitives) — 20 typed hook keys + ~25 bus events, JS/TS |
| [Pi](../content/pi.md#2b-hooks) | ● | ~40 typed lifecycle events, TypeScript handlers; `tool_call` can block |

**Horizon:** `shipped` — `07-verified-inventories.md` §1 Table 1, row 6 — *"scripts executed at specific agent lifecycle points"*, shipped with published configuration paths in **four of the five tools surveyed** across 2,853 repositories

**The consequence.** A convention that depends on someone remembering it is a convention that survives
exactly as long as the person who wrote it stays on the team. A hook is the cheapest place in the whole
framework to convert an intention into a fact, and the survey says most repositories still have not
spent it.
