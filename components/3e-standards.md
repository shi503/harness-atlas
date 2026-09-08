---
title: "3e · Standards"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "3 System Stacks"
sublayer: "3e"
function: "F16 (widened)"
job: "J15"
horizon: "bet"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 3e · Standards

**Layer 3 System Stacks** · function `F16 (widened)` · job `J15`

> **What does good look like here, before anyone writes anything?**
>
> Standards is *what good looks like*, authored as an artifact — versioned, owned, and inherited by
> every repo that installs it. It is **the pre-hoc appearance of enforcement**: the Guides that help an
> agent write it correctly, as distinct from the Sensors that check what was written.

**One mechanism, and this is the half that acts first.** `2c` holds the mechanism. `8a` holds the
post-hoc appearance — evals and sensors, checking work that was done. **This is the pre-hoc appearance,
and it is stored in layer 5**, because a standard is knowledge before it is a rule and the store that
serves it to an agent is the context layer. Böckeler names the pair; the factor set carries both halves
as separate imperatives ([`2c-enforcement.md`](./2c-enforcement.md)).

**The inheritance contract is the whole artifact.** *Reference, never copy. Tighten, never contradict.*
Without it a standards tier is a folder of opinions that diverge on first fork; with it, a repo can raise
the bar locally and cannot lower it — the same **monotonic narrowing** invariant two independent peers
reached on the permission side, arriving here on the quality side.

**`F16` was carved out of `F5 Capability`, and is now widened rather than renamed.** `F5` held two
systems — *The Standards* and *The Catalog* — and grading them as one *"averages a 4 and a 2 into a 2,
and the standards work disappears."* `F16` is the standards half promoted; `4a` is the catalog. On top of
that, it absorbs the half of `F6 Policy` that is *what good looks like* —
`standards/architecture-patterns.md`, `standards/engineering-principles.md`, `standards/ci-cd.md`,
`standards/testing-patterns.md` — while *the bar the output must clear* (`standards/definition-of-done.md`,
`standards/evaluation-doctrine.md`) goes to layer 8. **This separates what `C-9` merged**, on `C-9`'s own
observation that *"the two halves fail differently"* ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §2.1).

**A standard is a primitive rather than machinery** — the line `3a` draws against its own resolver —
and that is why this component is gradeable at all: you configure a standard. A team that has adopted a
linter has not thereby acquired a standards tier.

**What this layer is not.** It is not process opinion. gstack encodes a *sequence* — plan, review, QA,
ship — which is adjacent and different: **it tells you the order, not the bar.**

**How do we work?** *"An agent writing code here is handed our patterns and principles before it starts, and a repo can tighten them but never loosen them."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | `○`. It ships the *surfaces* a standard could live on — nested context files, path-scoped rules, `claudeMdExcludes` — and no standards **system**: no inheritance contract, no versioning, no ownership, nothing that makes a local file a tightening of a shared one | [`02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 — *Standards tier* row · [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Context row |
| **Deep Agents** | The nearest published object, and it is post-hoc by construction: `RubricMiddleware` lets a caller **declare what done looks like** and then grades against it at the moment the agent would finish. **The declaration is a standard; the grading is a sensor** — one component holding both appearances, which is the cleanest illustration of why the framework separates them. It also ships a full threat model, and *"no other system in this corpus ships"* one | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *Rubric*, §5 *Policy* |
| **MCP** | **Nothing here.** A connection mechanism carries no opinion about quality, and cannot | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The most instructive evidence in the corpus, and it is a **survival result**: when the multi-repo coordination template was absorbed into the product, what its own README says still justifies the repo is *"shared `AGENTS.md`, skills, etc."* — **the orchestration got absorbed; the canon did not.** Separately, 12-Factor Agents at 25.6k★ is the most-adopted principle manifesto in the space, at single-agent altitude | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §5, §1 |
| **LoomWarp** | Seven guides, roughly 970 lines, behind a real inheritance contract — *reference never copy, tighten never contradict*. **The one row in the component matrix where it is alone.** ⚠️ And the row has a second half it does not have: named review finding-classes that any review may append to and that **promote into canon once hardened** | [`loomwarp.md`](../content/loomwarp.md#3e-standards) · [`02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 — *Reading the three rows that matter* |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 1 · ◐ 1 · ○ 8** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#3e-standards) | ◐ | Agent Skills open standard (co-published) + JSON Schema for structured output |
| [Codex](../content/codex.md#3e-standards) | ○ | No rules-pack artifact; execpolicy's `justification` field is the nearest |
| [FRACTAL](../content/fractal.md#3e-standards) | ○ | Nothing here at the pinned commit; C ships six guides |
| [Gas City](../content/gas-city.md#3e-standards) | ○ | Generated schemas + OpenAPI 3.1 + a wire-typing refusal list exist, scoped narrowly ⚠️ mark and detail disagree at the v1 read |
| [Grok](../content/grok.md#3e-standards) | ○ | No opinionated standard shipped; rules + pinned plugins are the vehicle |
| [Hermes](../content/hermes.md#3e-standards) | ○ | No versioned rules-pack primitive; skills and distributions carry practice |
| [LoomWarp](../content/loomwarp.md#3e-standards) | ● | [**Standards tier**](../content/loomwarp.md#5-primitives) — seven guides, a stated inheritance contract |
| [OpenClaw](../content/openclaw.md#3e-standards) | ○ | No versioned rules-pack for user projects; templates only |
| [OpenCode](../content/opencode.md#3e-standards) | ○ | No shipped rules pack; formatters and LSP are the vehicles |
| [Pi](../content/pi.md#3e-standards) | ○ | No rules pack shipped; prompt templates and pinned packages are the vehicles |

**Horizon:** `bet` — `02-functions.md` §6 `F5` — *"Nobody ships the Standards system. Not Claude Code, not gstack, not Gas City, not QM."* gstack encodes process opinion, which is adjacent and different: it tells you the sequence, not the bar. Said out loud

**The consequence.** The marker is a `bet`, and the falsifier is cheap and dated: if a peer ships an
owned, versioned standards artifact with an inheritance contract, this moves to `emerging` on that
citation alone. **What a team loses in the meantime is not a document but an argument it has to win
again every session** — a bar that exists only as a review comment is re-litigated on every unit of work,
and an agent re-litigates it every time, because it has no memory of having lost.
