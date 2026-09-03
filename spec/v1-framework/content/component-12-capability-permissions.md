---
title: "4b · Capability Permissions"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "4 Capabilities"
sublayer: "4b"
function: "F6 (split)"
job: "J5"
horizon: "emerging"
img: img/120-capability-permissions.png
wave: W3
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 4b · Capability Permissions

**Layer 4 Capabilities** · function `F6 (split)` · job `J5`

> **Who may invoke this, and against what?**
>
> Capability Permissions is **the grant**, scoped to the capability rather than to the action. A
> capability declares what it may reach; an actor is granted the capability; an actor without the grant
> cannot invoke it. It is a **decision**, and it is the one `F6` clause the three-way policy split
> loses.

**This component exists because the crosswalk would not close without it.** `F6 Policy` opens *"What an
agent may do"* — which is neither a standard (`3e`), nor a bar on output (`8a`), nor a mechanism (`2c`).
It is a decision about a grant, and without a home for it `J5 bound` — a **CORE, converged** job — would
carry a mechanism and no decision ([`CROSSWALK.md`](../CROSSWALK.md) §2.1).

**Three components hold three different objects, and conflating any two of them hides a zero.**

| Object | Where | Reads as |
|---|---|---|
| **The named bound** — a description of a kind of work | `3a` Control | `frontend-dev`, `soc2` |
| **The grant** — this capability, to this actor, against this target | **`4b`** | a declaration on the package |
| **The binding** — the point the model cannot reach | `2c` Enforcement | an enforcement point, enumerated there |

**Scoping to the capability is what makes this different from an allowlist.** An action-scoped rule
says *no writes to production*. A capability-scoped grant says *this deploy runbook may write to
staging, and nothing else may write anywhere* — which survives the addition of a new tool, because the
grant travels with the package rather than with the enumeration of what exists today.

> ⚠️ **The layer-5 counterpart does not exist, and this is where the hole becomes visible.** Between
> *what an agent may do* and *what it sees* sits **RBAC over context**, which the Indigo analysis calls
> **whitespace #1 in the entire category** and which `NEXT-STEPS.md` §3.2 records as *"currently nobody's
> job."* Layer 4 has this row. **Layer 5 has no counterpart.** The twelve-layer structure does not close
> that gap — it turns it from a paragraph into a missing cell in a visible grid, which is the most this
> wave can honestly claim ([`CROSSWALK.md`](../CROSSWALK.md) §3.5).

**How do we work?** *"Each capability declares who may invoke it and against what, and an agent that has not been granted one cannot reach it."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The closest published thing to a per-capability grant: `allowed-tools` is **one of the six portable skill frontmatter fields**, so a capability carries its own tool surface across harnesses. Everything else in its policy ladder is action-scoped | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*Two constraints that break control-plane designs* |
| **Deep Agents** | `FilesystemPermission` — `operations · paths · mode` — is **path-scoped, not capability-scoped**: it grants against a target rather than to a package. Absolute paths are required, `..` is rejected outright. ⚠️ Resolution is first-match-wins with an `allow` default, so grant order is semantic | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §2 *Permissions* |
| **MCP** | Grants at **connection granularity** — a project declares which servers exist, and therefore which tool surface any agent in it can reach. Coarse, real, and the field's most widely deployed answer to this question | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | Grants a **workspace**, not a capability: `permissions.additionalDirectories: ["../repo1", "../repo2"]` is the whole authorisation model of the multi-repo template. Its finer-grained control is human approval at call time, which is a different mechanism at a different layer | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §5, §7 |
| **ours** | Risk tiers scoped to **action classes rather than to capabilities**, so installing a capability into a new repo grants nothing and forbids nothing. The grant does not travel with the package | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* |

**Horizon:** `emerging` — `03-jtbd.md` §2 `J5` *"Who"* — scoped to the capability rather than the action, two peers and no shared word: QM's per-scope keychain view and permissions, Indigo's hook profiles

**The consequence.** Every peer here has built a grant and none of them attaches it to the unit a team
actually ships. **So the most portable object in the framework — the capability package — travels without
its own authority**, and a team that grants by action instead has to re-enumerate every time the tool
surface changes, always one release behind the surface it is describing.
