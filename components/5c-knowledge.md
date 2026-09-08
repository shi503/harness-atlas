---
title: "5c · Knowledge"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "5 Context"
sublayer: "5c"
function: "F3.3"
job: "J1"
horizon: "shipped"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 5c · Knowledge

**Layer 5 Context** · function `F3.3` · job `J1`

> **Where does an agent go to find out what we know?**
>
> `5c` is the retrievable body — the llm-wiki, the domain corpus, the indexed reference an agent reads
> **on demand rather than on load**. `F3.3` in the dotted notation introduced at
> [`5a`](./5a-individual-memory.md). Its distinguishing property is not size. It is that **you
> can say which version was read.**

**Memory is routed by owner; knowledge is retrieved by need.** `5a` and `5b` are *what was learned, and
whose it is*. This is *what is true about the domain, and where to look it up* — a different write path,
a different failure mode, and the reason the three are graded apart rather than as one context score.

**The property that makes this gradeable is the version, not the volume.** A wiki an agent can read is
table stakes; a wiki that can tell you **which revision produced an answer** is the thing that turns
retrieval into evidence. The strongest published implementation makes that concrete at claim
granularity — and it stops one step short of the join, which is where our own claim lives.

**Retrieval is not compounding, and the boundary matters.** Karpathy's bar is the sharpest in the
category — ***does knowledge compound, or does it just get retrieved?*** — and it is a question about
`9a` Learning, not about this store. **`5c` is where knowledge lives; whether it appreciates is graded
one layer at a time above.** A team can have an excellent corpus and no ratchet, and the framework should
show that as two rows, not one average.

**What this layer is not.** It is not `5b` Team Memory — that is convention **and the governed
decision ledger**, loaded every session; a decision cached here is a copy, and the ledger wins. It is not `6c` Estate — that is *what code exists*. **And it is not the Briefing**, which
assembles all three stores per job; its own gap is recorded at
[`5a`](./5a-individual-memory.md).

**How do we work?** *"There is one place an agent retrieves what we know about this domain, and we can show which version it read."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | Nested context files with lazy loading — a **load-time** mechanism, not a retrieval one. It ships no corpus, no index and no versioned read; the building blocks for reporting what loaded exist and nothing writes the joined record | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Context row, §*What it does not provide* |
| **Deep Agents** | `openwiki/` — a machine-maintained code wiki with **claim-level evidence pinning**: 27 sidecar files, **515 claims**, each with a page-version hash and a **drift-tolerant line fingerprint** that hashes the first and last cited lines plus three lines of context either side, so a citation *"fails loudly when the cited region itself moves"*. The run manifest pins the commit, the model and the timestamp. **Hashing ✅ · version pinning ✅ · reconstruction ✅ · owner attribution ✗ · join to outcome ✗** — and the unit is a **page**, where ours is a **run** | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §4 |
| **MCP** | The field's default retrieval plumbing — *"external tool or data connections"*, resolved per call. It reaches a corpus and returns no version you can point at afterwards, which is precisely the gap between retrieval and evidence | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | `thoughts/searchable/` — a **hard-link tree**, read-only, built *"to allow AI tools to search your thoughts content without needing to follow symlinks."* A retrieval affordance designed for the agent rather than for the human, which is the addressee move this corpus argues for elsewhere and rarely sees implemented | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §4 |
| **ours** | **No distinct corpus at all** — the same `context/` tree graded at `5b` is doing both jobs, team convention and domain knowledge in one place, with no index and no versioned read. **The one row in layer 5 where a peer is ahead on the property we claim** | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* |

**Horizon:** `shipped` — `12-horizon.md` §3.1 — two teardowns cited: SageOx's `ox agent prime` (`systems/sageox.md`) and HumanLayer's `thoughts` (`systems/humanlayer.md` §4), a separate repo mounted into every code repo, hook-enforced

**The consequence.** This is the most-built component in the whole framework and the one where our own
position narrowed hardest: context assembly ships, at scale, funded. **What is still scarce is not the
corpus but the receipt** — which version an agent read, under whose authority, and what came of it. A
team that builds the store and not the record gets an agent that is well informed and unaccountable, and
those are not the same problem solved twice.
