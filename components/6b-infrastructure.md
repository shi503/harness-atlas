---
title: "6b · Infrastructure"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "6 Workspaces"
sublayer: "6b"
function: "new"
job: "—"
horizon: "emerging"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 6b · Infrastructure

**Layer 6 Workspaces** · function `new` · job `—`

> **Where does the work actually happen?**
>
> Infrastructure is **the working environment** a unit of work gets — an addressable, durable,
> disposable place with the project's own runtime in it. Three properties make it one: it is
> **created the same way every time**, it is **reattachable** after the session that made it has
> gone, and it is **destroyable** without touching anything else.

**This is the object three peers built and none of them named the same way**, which is precisely the
`emerging` condition [`12-horizon.md`](../spec/v1-framework/12-horizon.md) §2 defines: *"peers have built the
thing and have not agreed what to call it."*

| Peer | Its word | What the word carries |
|---|---|---|
| **QM** | `scope` | memory, files, keychain view, permissions, crons, and a **durable sandbox** |
| **HumanLayer** | **worktree** | N repos plus a coordination repo, all on one branch, per task |
| **Deep Agents** | `SandboxBackendProtocol.id` | the handle a session **reattaches** to |

*Scope*, *worktree* and *backend id* are three words for one thing, and the disagreement is the
evidence rather than the noise. **A framework can contribute the word here; it cannot claim the
ground** ([`12-horizon.md`](../spec/v1-framework/12-horizon.md) §3.2).

**Reattachment is the property that separates this from a temp directory.** Anything can `mkdir`. A
graded infrastructure row is one where the environment **outlives the process that created it** and
can be re-entered by name — which is the same durability argument QM makes about state, *"nothing
important lives only in a model's context window"*, applied to the place the work happens rather than
to the record of it.

**And it is the row where the two adjacent layers get borrowed from.** This is **not**
[`0a`](./0a-substrate.md) Substrate — that is what the *agent* runs on, chosen once for the
team — and it is **not** [`1a`](./1a-environment.md) Environment, which is the declared
inventory of what the team can *reach*. Layer 6's runtime is the **project's own**: the database this
service needs, the seeded fixtures, the container it deploys into. `1a` says the system exists;
`6b` is where a copy of it is stood up so work can happen against it.

**What this layer is not.** It is not [`6d`](./6d-delivery.md) Delivery. Standing up an
environment and shipping through one are different failures: this one fails as *"it works on the
machine that built it"*; delivery fails as *"it never reaches production the same way twice."*

**How do we work?** *"An agent gets a working, disposable environment for the job, and it is created the same way every time."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | Worktree support on subagents and `worktree.sparsePaths` — real isolation primitives, and **no environment model above them**: nothing names an environment, holds a handle to it, or rebuilds it. ⚠️ And the published durability gap read at [`3a`](./3a-control.md) lands hardest on *this* row rather than on control flow — **a workspace you cannot reattach to after a crash is a directory** | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Subagents and Estate rows, §*What it does not provide* |
| **Deep Agents** | The most explicit implementation, and it is a **typed backend rather than a place**: `state` · `store` · `filesystem` · `local_shell` · `sandbox` · `composite`, with sandbox integrations shipped as separate partner packages — Daytona, Modal, Runloop, Vercel, QuickJS. Choosing where files and shell live is a constructor argument, which is the strongest available statement that this is a configurable primitive | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §1, §2 *Backends* |
| **MCP** | **Nothing here.** It connects an agent to a system that already exists somewhere; it neither creates an environment nor holds a handle to one. Standing one up is the job it presupposes | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The sharpest shape for a multi-repo team, and it is **four files**: `rpi:setup-worktree` builds `workspaces/<task-slug>/` containing a worktree of every participating repo *plus the coordination repo*, all on one branch. **A unit of work is N worktrees on one branch** — a virtual monorepo per task. And the discipline that makes it cheap: only implementation happens in a worktree, *"we tend to do everything else on main"* | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3, §5 |
| **ours** | **Nothing at all, and the absence has a name in our own credibility check**: a private submodule means a stranger cannot `git clone --recursive`, so the environment cannot be created a second time by anyone. That is this row failing at stage 1, not at the margins | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Credibility check* |

**Horizon:** `emerging` — `12-horizon.md` §3.2 — three peers, three names: QM `scope` with a durable sandbox (`systems/qm.md` §26), HumanLayer `worktree` (`systems/humanlayer.md` §5), Deep Agents `SandboxBackendProtocol.id` (`systems/langchain-deepagents.md` §2)

**The consequence.** An environment nobody can rebuild is a person, not infrastructure — and the tell
is not that it fails, but that it succeeds exactly once. **The row is cheap to reach and expensive to
have skipped**, because every layer above it inherits the assumption that work can be repeated: an
eval that cannot be re-run, a bottleneck reading that cannot be reproduced, and a delivery path
tested in a place that no longer exists are all this row's failure arriving somewhere else.
