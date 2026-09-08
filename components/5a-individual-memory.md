---
title: "5a · Individual Memory"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "5 Context"
sublayer: "5a"
function: "F3.1"
job: "J1 · J2"
horizon: "emerging"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 5a · Individual Memory

**Layer 5 Context** · function `F3.1` · job `J1 · J2`

> **What do I know that the team has not agreed to?**
>
> `5a` is the store for what one person — and the agents acting for them — has learned and not yet
> published: preferences, working notes, the half-formed rule that is right until someone checks it.
> Its defining property is not privacy. It is that **nothing lands in the team's canon by accident.**

> **Layer 5 is the one layer that *is* a function, and this is where its notation is introduced.**
> **Layer 5 = `F3 Context`.** Its three children take dotted sub-IDs — **`F3.1` `5a` Individual
> Memory**, **`F3.2` `5b` Team Memory**, **`F3.3` `5c` Knowledge** — so **every existing `F3` citation
> still resolves and no new ID namespace opens.** The bare `F3` is kept as the **roll-up**, graded as the
> minimum of its children rather than their average, which is `C-11` applied literally: a stage-0 child
> drags the parent down instead of averaging away
> ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §0.1, §2).
>
> ⚠️ **And the roll-up carries a cost that is recorded rather than fixed.** `F3`'s other system — **The
> Briefing**, the per-job resolved bundle with hashes, versions and owners — is the assembly step that
> joins these three stores, and it has **no component of its own.** It is reachable today only as the
> layer-5 roll-up, which means **the framework's sharpest context claim is graded as the minimum of three
> stores rather than as itself.** A `5d Briefing` would close it. **Cardinality is a KD decision and is
> not taken here** ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §3.3).

> ### ⟳ Layer 5 is one of only two layers that accumulate.
>
> Everything below it is **configured** — chosen once, revisited rarely. Everything above it
> **runs** — it does not grow. Between them sit layer 5 and layer 6, and **those are the
> two a team cannot buy.** You can rent a model, adopt a harness, install a policy tier and import a
> standards pack. You cannot import the context your team has accumulated about its own product
> ([`11-architecture.md`](../archive/v0/11-architecture.md) §2).
>
> **The falsifier, named and dated 2026-09-01.** The claim fails if a third layer accumulates, and the
> named candidate is **`8b` Evidence**: the ledger grows monotonically with use and cannot be imported
> from another team, which is two of the three properties. It is excluded today on the third — the
> ledger feeds forward only as **measurement**, into `9f` diagnosis and `9c` cadence, never as
> **content** an agent reads to do the next unit of work better. **Show an evidence store whose prior
> entries are retrieved as context for a new run, and the `⟳` pair becomes a triple.**

**The routing test is the cheapest thing in this layer, and it is not ours.** *"Would another teammate's
agent need this to be correct about the project?"* If yes, it is not a memory — **it is team knowledge**,
and it belongs at `5b` ([`03-jtbd.md`](../comparisons/03-jtbd.md) §2 `J2`).

**The boundary is a 2×2, and only one axis is filled.** Four peers treat individual-versus-team as a
first-class primitive, and the strongest of them crosses it with a second axis — **per-project versus
cross-repo**. That closes `OPEN-5`'s first axis as visible structure; the `project | org` half is the
`SCOPE` axis and is **still unfilled** ([`12-horizon.md`](../spec/v1-framework/12-horizon.md) §4.1).

**How do we work?** *"What I have learned working here follows me between repos, and it does not land in the team's canon by accident."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | `◐` — auto memory, per-user, alongside nested context files. The individual store exists; the **boundary** between it and the team's does not, so the routing decision is left to whoever is typing | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Context row · [`03-jtbd.md`](../comparisons/03-jtbd.md) §2 `J2` |
| **Deep Agents** | Memory as a **backend choice** — `store`, `context_hub` — plus `MemoryMiddleware` in the default stack, and the individual tier expressed as **list position**: skill sources resolve *base → user → project → team*, last-one-wins | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *Backends*, §2 *Skills* |
| **MCP** | **No memory model of its own.** It can connect an agent to a store somebody else owns, which makes it plumbing for this component and never an answer to it | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The sharpest shape in the corpus, and it is a **directory**: `thoughts/<user>/` against `thoughts/shared/`, crossed with per-repo `repos/<project>/` against `global/`. **A real 2×2**, strictly more expressive than the three peers that treat individual-versus-team as one axis | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §4 |
| **LoomWarp** | `○`. The individual/team boundary is one of three concepts the component matrix records as treated as first-class by peers and not covered by this framework's component model at all | [`02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 · [`loomwarp.md`](../content/loomwarp.md#5a-individual-memory) |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 5 · ◐ 1 · ○ 4** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#5a-individual-memory) | ● | `CLAUDE.md` + auto memory (`MEMORY.md`) + subagent `memory:` scopes |
| [Codex](../content/codex.md#5a-individual-memory) | ● | Automatic two-phase memory pipeline; git-baselined `~/.codex/memories/` |
| [FRACTAL](../content/fractal.md#5a-individual-memory) | ○ | Nothing here — defers to the host harness's own default |
| [Gas City](../content/gas-city.md#5a-individual-memory) | ◐ | Per-agent session logs, `wake_mode`; Beads' `bd remember`/`bd prime` one layer down |
| [Grok](../content/grok.md#5a-individual-memory) | ● | Bot memory (opaque); Build's memory off by default |
| [Hermes](../content/hermes.md#5a-individual-memory) | ● | [**Memory**](../content/hermes.md#5-primitives) — `MEMORY.md`/`USER.md` under hard char caps, auto-nudged |
| [LoomWarp](../content/loomwarp.md#5a-individual-memory) | ○ | No operator-scoped object; own spec defers this to Claude Code's default |
| [OpenClaw](../content/openclaw.md#5a-individual-memory) | ● | Workspace Markdown + hybrid `memory_search`; dreaming promotes it |
| [OpenCode](../content/opencode.md#5a-individual-memory) | ○ | No memory feature; SQLite session history + `AGENTS.md` only |
| [Pi](../content/pi.md#5a-individual-memory) | ○ | No memory feature — grep of docs and README found none |

**Horizon:** `emerging` — `02-functions.md` §0.3 — four peers make the individual boundary a first-class primitive under four names: gbrain `brain × source`, Indigo `personal/`, generic-cerebro `_dev/<username>/`, gstack per-project slug

**The consequence.** Without this row a team has one store, and every private note in it is a claim the
whole team's agents will act on. **The failure is not lost knowledge — it is unratified knowledge
promoted by proximity**, and it is invisible until an agent confidently applies one person's working
assumption to somebody else's repository.
