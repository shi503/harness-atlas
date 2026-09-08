---
title: "1a · Environment"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "1 Environment"
sublayer: "1a"
function: "F12"
job: "—"
horizon: "bet"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 1a · Environment

**Layer 1 Environment** · function `F12` · job `—`

> **What can we reach?**
>
> Environment is **the declared inventory** of every system the team works across — org, teams,
> projects, repos with their path aliases, SaaS, execution environments, data systems — where each
> **entry** names its **adapter**, its **interface**, its **auth**, its **owner** and **the version it
> is pinned to**. It is a map, and it is written before anything tries to use it.

**This is ports and adapters, applied one altitude up.** The architect *declares* the work environment;
the system *derives* the taxonomy and the reach. Layer 1 owns the declaration. `2a` owns the derivation.
The order is not cosmetic — **you cannot write an adapter for a system you have not declared**, which is
also why this layer sits below every layer that consumes it.

**The gap it closes, stated precisely, because it is the only reason the layer exists.** MCP adapts **per
call**. Nothing in the harness holds a model of *what exists* before the call is made. So the harness
cannot answer three questions a team asks constantly and a per-call adapter structurally cannot:
*what can I reach?*, *who owns it?*, and *what breaks if it goes away?*
([`11-architecture.md`](../archive/v0/11-architecture.md) §3.)

**The fourth question is temporal, and it was missing until 2026-09-01: *what breaks when it
upgrades?*** An inventory without a version field describes a system that never changes underneath you,
and no declared system has that property — **MCP itself is date-versioned**: no "MCP v2" exists, the
spec an adapter speaks is a date, currently 2026-07-28
([`90-short-profiles.md`](../comparisons/systems/90-short-profiles.md) §*Standards*).
The peers already treat components this way — Claude Code ships **SHA pinning and semver dependencies**
in its distribution surface and a `plugin_loaded` event that **reports versions**
([`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides,
in one screen* — Distribution row); Deep Agents' CI docs say **pin a reviewed SHA rather than `main`**
([`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md)
§5 *Distribution*). Our own record is the counter-example: the vendored `fractal/` machinery is *"pinned
at a commit, not a version. No upgrade path is defined"*
([`systems/fractal.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/fractal.md) §*Credibility check*) — the
exact exposure a version column in this inventory exists to make visible.

**MCP is therefore split across two layers, and the split is the argument.** It is **declared** here — as
an entry with an owner and an auth model — and **adapted** at `2a`, where it attaches to the loop. A tool
list discovered at call time is reach without inventory; an inventory without an adapter is a document.
The framework needs both and grades them separately.

**What this layer is not.** It is not `6c` Estate, which is *what code exists* — repos, owners,
boundaries, cross-repo impact. Estate is one row inside this inventory, and the rest of the inventory —
the SaaS, the data systems, the execution environments — has never had a home at all.

**How do we work?** *"Every system we work across is declared in one place with its owner, its interface and its auth — before anything tries to reach it."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | Reach without inventory. `additionalDirectories`, `--add-dir`, `worktree.sparsePaths`, `symlinkDirectories` and upward discovery all extend *where the agent may look*; none of them is a declaration of what exists, who owns it, or what it costs to lose | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides, in one screen* — Estate row |
| **Deep Agents** | The nearest published thing to a declared environment, and it is a **backend list** rather than an inventory: `state` · `store` · `filesystem` · `local_shell` · `sandbox` · `composite` · `context_hub` · `langsmith`. Its `THREAT_MODEL.md` goes further than anyone — **six named trust boundaries** and five data classifications — but that is a map of risk, not a map of systems | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *Backends*, §5 *Policy* |
| **MCP** | **Declared here, adapted at `2a`.** The mechanism is defined as *"external tool or data connections via the Model Context Protocol,"* configured per tool at `.mcp.json` and four other published per-tool paths. A server list is the closest the field comes to a declaration — and it is a list of **connections**, not of systems with owners | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The most concrete peer instance, and it is four files: `rpi-coordination-template` grants `permissions.additionalDirectories: ["../repo1", "../repo2"]` and its `CLAUDE.md` *lists the repos and their descriptions*. **A declared inventory of two entries, with descriptions and no owners** — and its own README retires it into the product's Workspaces feature | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §5 |
| **ours** | `registry/repositories.yaml` with a schema — built, two repos, one of them a private submodule that blocks a clean clone. **That is the Estate row of the inventory and nothing else**: no SaaS, no data systems, no execution environments, no auth model | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* |

**Horizon:** `bet` — `11-architecture.md` §5.1 — *"Nothing in `F0`–`F11` holds a declared inventory of systems the team works across."* No peer declares the environment before the call. Said out loud: this is ours and uncorroborated

**The consequence.** A harness that learns what exists by trying to touch it can act, and cannot plan.
Every capability that depends on knowing the shape of the estate — impact analysis, ownership routing,
a credible answer to *what breaks if this goes away* — is unavailable not because it is hard but because
nothing was ever asked to write the list down.
