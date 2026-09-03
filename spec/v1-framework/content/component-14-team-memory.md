---
title: "5b · Team Memory"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "5 Context"
sublayer: "5b"
function: "F3.2"
job: "J1 · J2"
horizon: "emerging"
img: img/140-team-memory.png
wave: W3
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 5b · Team Memory

**Layer 5 Context** · function `F3.2` · job `J1 · J2`

> **What has to be true for anyone else's agent?**
>
> `5b` is the store of facts and conventions this project's work depends on, **owned by the team rather
> than by whoever wrote them**, and loaded by every agent that touches it. `F3.2` in the dotted notation
> introduced at [`5a`](./component-13-individual-memory.md), which also carries the layer's `⟳` claim and
> its falsifier.

**The best available evidence says this store should be smaller than instinct suggests.** The ETH study
of context files found that *"providing context files does **not** generally improve task success rates,
while increasing inference cost by over 20% on average"* — and, decisively for what belongs here, that
**instructions are well followed while repository overviews are not helpful**
([`02-functions.md`](../../../archive/v0/02-functions.md) §6 `F3`).

**So the design rule is scoping, ownership and enforceable constraint — not coverage.** *More context is
not better; more constraint is.* A team memory that grows toward describing the repository is paying 20%
to tell an agent what it can already read. **One that grows toward stating decisions is buying the one
thing an agent cannot derive.** The same conclusion arrives from the vendor's own large-codebase
guidance, which names the failure exactly — *conventions drift, files go stale, and no one owns the
root* — and answers it with scoping and ownership rather than with more documentation.

**Ownership is what separates this from a shared folder.** A fact arriving from `5a` needs an owner on
arrival — not an author, an owner — or the store acquires the exact failure it was built to prevent: a
fact nobody wrote, nobody maintains, and every agent believes.

**The governed tier is the decision ledger** *(ruled 2026-09-01 — [CROSSWALK §3.9](../CROSSWALK.md))*.
The routing doctrine's third destination — a fact that is shared **and** change-managed with named
ownership — lands here, above the convention tier, and three rules make it a tier rather than a folder:
**promotion is a ceremony** (entering acquires an owner, a status and an audit entry — a `write` that
reaches it directly has not implemented routing); **precedence** (when copies disagree the ledger wins;
a memory may cache a decision, the ledger is canonical); and **supersession is recorded, never deleted**.
The industry's **ADR** practice is this tier applied to one codebase — the `team × project` cell — which
is why the practice feels universal and the tier still needs naming: the org column has no ADR
convention to borrow. ([`../../archive/v0/09-context-layer.md`](../../../archive/v0/09-context-layer.md) §4.)

**And the field disagrees about the cells.** No two peers agree on which scope divisions exist —
per-user, per-room, per-repo, per-org, cross-repo — which is the `emerging` condition, and the reason
this framework names the boundary rather than the schema.

**What this layer is not.** It is not `5c` Knowledge — a domain corpus an agent retrieves *from* — and it
is not `3e` Standards, which is *what good looks like*. **Standards are stored here and graded there**,
which is exactly the separation that keeps a mature standards tier from being scored as a full context
layer. And it is not [`8b`](./component-22-evidence.md) Evidence — that records *what happened*; this holds
*what we decided*, and `8b`'s unbuilt join runs **to** this ledger, which must exist for the join to have
a left side.

**How do we work?** *"If another teammate's agent would need a fact to be correct about this project, it lands in the team's store rather than mine."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The most-adopted surface in the field, by a distance: per-directory context files with **lazy nested loading**, path-scoped rules, `claudeMdExcludes`, and an `InstructionsLoaded` hook that reports *which* instruction files loaded and why. Reporting what loaded is the raw material for provenance and stops one step short of it | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides* — Context row, §*What it does not provide* |
| **Deep Agents** | `ContextHubBackend` — *"store files in a LangSmith Hub agent repo (persistent)"* — a **hosted, cross-session, cross-agent context store** addressed by typed entries. It is the one peer here whose team store is a product rather than a directory, and its own teardown notes that this routes persistence to a paid surface | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §2 *Backends*, §6 |
| **MCP** | Connects an agent to a team's system of record and carries **no ownership or freshness model** with it. Retrieval without ownership is the failure this component is defined against | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | `thoughts/shared/` per repo and `global/shared/` across them — **the team half of the 2×2**, and the only peer whose team store is scoped per-repo *and* across repos at the same time | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §4 |
| **ours** | Two tiers, and the previous grade only saw one: the convention tier is a `context/` tree of org → domain layers — **83 lines of markdown** — and the governed tier is **live at `context/memory/decision-ledger/`**: five ADRs on a v2.0 schema with required RACI attribution, a TypeScript storage engine with atomic writes, an append-only audit and a derived SQLite index. **A grade that counted the markdown and missed the ledger was right for the wrong reason.** The resolver that would enforce version, hash and expiry over both was specified and does not exist | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* · [`systems/context-providers/03-decision-ledger.md`](../../../comparisons/systems/context-providers/03-decision-ledger.md) |

**Horizon:** `emerging` — `02-functions.md` §0.3 — three peers, three names: QM `scope`, SageOx's shared Ledger, gbrain's team brain. `03-jtbd.md` §2 `J2` records the disagreement: no two agree on which scope cells exist. The governed tier is `emerging` on its own evidence: SageOx ships a Ledger and its teardown grades it at Evidence (`systems/sageox.md` §*Primitives*), while the routing doctrine files it under Context — **the placement disagreement between shipping systems is itself the `emerging` tell**

**The consequence.** This is the store every system in the landscape has, which makes it the row where
having one proves nothing. **What separates a team memory from a folder is that a fact in it has an owner
and a scope**, and the published evidence is that a store without those two properties costs more than it
returns — measurably, at over 20% on the invoice, before anyone counts what a stale convention does to
the work.
