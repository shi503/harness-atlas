---
title: "2a · Adapters & Middleware"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "2 Agent Harness"
sublayer: "2a"
function: "F13.1"
job: "—"
horizon: "shipped"
img: img/030-adapters-and-middleware.png
wave: W3
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 2a · Adapters & Middleware

**Layer 2 Agent Harness** · function `F13.1` · job `—`

> **How does the loop reach any of it?**
>
> `2a` is **the derived reach**: one **adapter** per system declared at `1a`, and the **middleware**
> that wraps the agent loop at the points those adapters attach to. Declaration is upstream and is
> graded separately. This layer is what turns a list of systems into something an agent can act
> through.

> **This layer may be entirely vendor-provided, and adopting one wholesale is a legitimate answer
> rather than a low grade.** Claude Code, Codex, Deep Agents and `fold` each ship the whole of it.
> A team can run on a vendor harness and have no system stack of its own at all — which is why layers
> 2 and 3 are graded apart. Merging them would let one high mark hide the other's zero.

**An adapter is the maturity tell.** You write one only after the first substrate choice hurt, which is
why its presence separates a process layer from a set of prompts. What the adapter buys is not
portability in the abstract — it is the ability to change the answer at `0a` without rewriting how the
work reaches anything.

**Middleware is the insertion point, and an insertion point is mechanically checkable in a way an
abstract noun is not.** That is the whole reason this component is gradeable: you can enumerate where a
harness lets you wrap, and you cannot enumerate a value. What the wrap points have converged on, and
who agreed with whom, is `2b`'s evidence and is not restated here.

**MCP is adapted here.** MCP resolves a tool **per call**; this layer is where that resolution is bound
to something the harness already holds. **The declaration, and the argument for grading the declared and
the derived apart, are at `1a`** — this file owns only the derived half.

**The adapter is also where compatibility is asserted** *(added 2026-09-01)*. `1a`'s entry declares the
version a system is pinned to; the adapter declares **the version it speaks** — the MCP spec date, the
harness release, the semver range — which is what turns a migration from a discovery into a diff of two
declared values. The peers already ship the machinery: Claude Code's **semver dependencies,
`validate --strict` and `renames`** are a compatibility contract for exactly this layer's components
([`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides,
in one screen* — Distribution row), and its portable-skill frontmatter carries a literal
**`compatibility`** field where *a disallowed field is a hard error, not a warning* (same file, §*Two
constraints*). This matters doubly because no two harnesses grow alike — a member running a personal
adapter stack is the expected case, not the exception — and **an unversioned personal adapter is
invisible drift** where a versioned one is a declared, diffable divergence.

**What this layer is not.** It is not `2b` Hooks — a hook fires at a **fixed lifecycle point** the
harness defines, and this is the **wrap** around a call the harness makes. It is not `3c` Composition,
which decides *which* of these parts a given agent is assembled from.

**How do we work?** *"Every declared system has one adapter, and swapping the harness underneath does not change how our work reaches it."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | **It ships no middleware abstraction distinct from its lifecycle events** — the wrap surface and the hook surface are one object. That is an observation about the vendor rather than a gap in the framework: the wrap-versus-fixed-point distinction `2a` and `2b` are graded apart on does not exist inside it. Its adapter story is the plugin and MCP surface, and its portability boundary is published rather than discovered | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides, in one screen*, §*Two constraints that break control-plane designs* |
| **Deep Agents** | The most explicit implementation in the corpus. **Six insertion points, five of them with an async twin** — `wrap_model_call`, `wrap_tool_call`, `before_agent`, `after_agent`, `before_model`, `after_model` — with `wrap_model_call` carrying three-quarters of the weight. The package is explicit that this is the *primitive*: a plain tool *"is only invoked **by** the LLM, not **before** the LLM call."* What a profile may and may not strip from that stack is `3c`'s concern, not this one | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §2 *Middleware — the insertion points, counted in code* |
| **MCP** | **The adapted half of the split.** *"External tool or data connections via the Model Context Protocol"* — a per-call resolution mechanism, published with its per-tool configuration paths. It is the field's default answer to *reach*, and it holds no model of what exists | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The one shipped **context adapter** in the corpus: `thoughts/` is a separate git repository mounted into every code repo, and `thoughts/CLAUDE.md` is **auto-generated** — the context layer writes the harness's own instruction file. The component matrix added that row with the note that its emptiness *was* the finding | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §4 · [`02-component-matrix.md`](../../../comparisons/02-component-matrix.md) §1 |
| **ours** | **`○` on both adapter rows** — harness adapter and context adapter — in our own matrix, with Claude Code as the single supported runtime | [`02-component-matrix.md`](../../../comparisons/02-component-matrix.md) §1 · [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*What it is* |

**Horizon:** `shipped` — `11-architecture.md` §3.1 — Claude Code's 29 lifecycle events and DeepAgents' middleware, *"the same design reached independently"*; `03-jtbd.md` KD-notes #6 records the adapter as the tell that separates a process layer from a harness

**The consequence.** A team with no adapter has not chosen its harness — it has married it, and will find
out on the day the choice changes underneath it. A team with adapters and no declared environment has
reach it cannot audit. **Neither failure announces itself; both are discovered during a migration.**
