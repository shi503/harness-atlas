---
title: "6c · Estate"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "6 Workspaces"
sublayer: "6c"
function: "F2"
job: "—"
horizon: "emerging"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 6c · Estate

**Layer 6 Workspaces** · function `F2` · job `—`

> **What code exists, and what does a change here break there?**
>
> Estate is **the Registry** of repositories with their owners, boundaries and interfaces; **the
> Workspace Resolution** that lets an agent reach across them; and **the Routing** that says which
> repo a piece of work belongs to and what it impacts. It is discoverable and routable **without
> being merged**.

**Two of the three ship natively and the third ships nowhere, which is the whole grade.** Reaching
across repositories is a solved configuration problem, enumerated in the peer row below.
**Cross-repo impact analysis is not solved by anybody**: nothing native knows that a change in A
affects B, and that is the differentiated job this component keeps rather than dissolving into vendor
config ([`02-functions.md`](../archive/v0/02-functions.md) §6 `F2`).

> ⚠️ **`OPEN-15` survives the rebuild verbatim, and this file is where it has to earn its keep.**
> The original worry: *"a team with one repo cannot tell [Estate and Product] apart, and the grid
> would show two rows moving together."* Making them `6a` and `6c` inside one layer does not dissolve
> that — **it makes the correlation visible instead of arguable** ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md)
> §3.6). The distinction that survives a one-repo team is the one below.

**The test, stated so a one-repo team can run it.** [`6a`](./6a-product.md) Product answers
*what are we building and what may it not become*; Estate answers *what is here and who owns it*. A
team with a single repo still has both, and they still fail differently: **Product fails when a
constraint nobody wrote gets violated; Estate fails when nobody can say who owns the module that
broke.** They correlate at one repo and diverge permanently at two — which is an argument for keeping
both rows and reading the pair, not for merging them into a score that hides whichever is worse.

**The routing here is not the routing at `3b`.** `F2`'s third system resolves *which repository a
piece of work belongs to*; [`3b`](./3b-routing.md) resolves *which actor picks it up*. Both
are deterministic resolutions against a list, and they resolve against **different lists** — an
estate and a roster — which is why `F2` was checked against `O-3` and carried whole rather than
decomposed ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §2).

**What this layer is not.** It is not [`1a`](./1a-environment.md) Environment. **Estate is
the *code* row of that inventory**, and what the rest of the inventory contains — and why its absence
matters — is argued there rather than here.

**How do we work?** *"We work across six repos as one workspace — here is the registry, here is who owns what, and here is what a change in A does to B."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The complete **reach** half and none of the **inventory** half: `additionalDirectories`, `--add-dir`, `worktree.sparsePaths`, `symlinkDirectories` and upward discovery. ⚠️ And a published constraint that breaks estate designs built on hierarchy — **project settings load only from the starting directory** and are not inherited from parent directories the way context files are | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Estate row, §*Two constraints that break control-plane designs* |
| **Deep Agents** | `○` on the estate object, and the reason is architectural rather than an oversight: its scoping unit is a **backend**, addressed by type, not a set of repositories with owners. Its own teardown records the omission in the same family — *"no team altitude… no notion of who approved anything"* | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *Backends*, §8 |
| **MCP** | **Nothing here, and one honest near-miss.** A server list is a per-project declaration of *connections*, which is the closest the field comes to an inventory — of systems to call, never of code you own, with no owner field and no impact edge | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The most instructive result, because it is a **verdict**: the multi-repo coordination template listed its repos and their descriptions in a context file, and its own README then retired that arrangement into the product's Workspaces feature. **A hand-written estate description was the part that did not survive contact with a real workspace primitive** — what did survive is `3e`'s claim, and is read there | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §5 |
| **LoomWarp** | `registry/repositories.yaml` behind a schema, with registry-driven clone — **genuinely built, and two repos wide.** Ownership is recorded; impact analysis is not, so the differentiated third of the function is the third it does not have | [`loomwarp.md`](../content/loomwarp.md#6c-estate) · [`02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 |

**Horizon:** `emerging` — `02-functions.md` §6 `F2` — native workspace resolution ships (`additionalDirectories`, `--add-dir`, `worktree.sparsePaths`, nested discovery); **cross-repo impact analysis ships nowhere**. The object is real, the vocabulary is not — workspace vs estate vs virtual monorepo

**The consequence.** The reach is free and the map is not, so most teams arrive at multi-repo work
with an agent that can open any file and cannot say what depends on it. **What that costs is not
access but blast radius**: every change is either over-reviewed because nobody can bound its effect,
or under-reviewed because somebody guessed — and the guess is invisible until the repository nobody
thought to check is the one that breaks.
