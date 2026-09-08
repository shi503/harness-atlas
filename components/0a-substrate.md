---
title: "0a · Substrate"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "0 Foundation"
sublayer: "0a"
function: "F0"
job: "J13"
horizon: "shipped"
graded: false
requires: []
---

[← the roster](./00-README.md) — all 33, and the graded split · [CROSSWALK](./CROSSWALK.md) — recorded gaps and the rulings that closed them · [RELATIONS](./RELATIONS.md) — the `requires` graph

### 0a · Substrate

**Layer 0 Foundation** · function `F0` · job `J13`

> **What do we run on?**
>
> Substrate is **the Model** you rent, **the Harness** it executes in, and **the Adapter** surface that
> keeps your work portable across more than one of either. It is the only layer chosen before every
> other layer, and the only one whose cost is paid on the way out rather than on the way in.

**The model is a decision, not an input.** The field's own equation is `Agent = Model + Harness`, and the
earlier ruling that excluded the model — *"an input to `F0`, deliberately not a function"* — proved only
that we do not **build** it. It never proved we do not **choose** it. Which model runs which job, and at
what price, is upstream of routing and upstream of accounting, and both of those are graded elsewhere as
though the answer were already settled ([`02-functions.md`](../archive/v0/02-functions.md) §2 `C-2`).

**The harness is the choice with the blast radius**, and whether a team builds one or adopts one
wholesale is `2a`'s question rather than this one. What separates a mature answer from an accidental one
is that the mature one is **written down**: which runtime, which models, and what would be lost by
moving.

**The Adapter decision has a published price, and the price is the decision.** The Agent Skills spec
permits six frontmatter fields outside Claude Code — `name`, `description`, `license`, `compatibility`,
`metadata`, `allowed-tools` — and a disallowed field is a hard error, not a warning. Every
harness-specific feature used is capability chosen over portability. **Record the trade and you have made
the choice; leave it unrecorded and the choice still happened.**

**And there is a fourth sub-decision the field asks and most pre-flights do not: how far out of
distribution is this work?** The rule is *per task, not per domain* — a legal-AI team is out of
distribution on legal reasoning and squarely in distribution on editing files. That is why the answer is
a set of profiles rather than one verdict.

> ⚠️ **The name is carried under protest, and the protest travels with it.** `Substrate` is unattested in
> any published stack diagram — the field says *Models and Inference*, or *Compute and Foundation
> Models*. It is kept because renaming it here would be the fourth rename of the same unit, which
> [`02-functions.md`](../archive/v0/02-functions.md) §0.5 forbids. **Deferred, not settled** (`C-3`).

**How do we work?** *"We run on one named harness and one named model, and we can say what we would lose by moving off either."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The substrate itself — the one harness in the corpus that everything else installs into. Its own portability boundary is published: six portable skill fields, and a disallowed field is *a hard error, not a warning* | [`systems/claude-code.md`](../archive/comparisons/systems/claude-code.md) §*Two constraints that break control-plane designs* |
| **Deep Agents** | `profiles/`, split `provider/` and `harness/`, with `excluded_tools` and `excluded_middleware` — the edit-file implementation is swapped **by model family**, and the tool surface shrinks *"when a provider or model needs a smaller or differently described surface"* | [`systems/langchain-deepagents.md`](../archive/comparisons/systems/langchain-deepagents.md) §2 *Profiles — the in/out-of-distribution rule, in code* |
| **MCP** | **Nothing here, and that is the correct reading.** MCP is *"external tool or data connections"* — a mechanism for reaching systems, not for choosing the ground you reach them from. It attaches at `1a` and `2a` | [`07-verified-inventories.md`](../archive/comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | `fold` — a provider-agnostic agent core — plus the sharpest published argument for why this layer is consequential: *"the first time a lab trained a model against the exact tools they were going to ship it with,"* and the corollary that a team owning the harness but not the weights *"will always be at a disadvantage"* | [`systems/humanlayer.md`](../archive/comparisons/systems/humanlayer.md) §1, §2 |
| **LoomWarp** | **Claude Code only, portability posture undecided.** Recorded rather than deferred | [`loomwarp.md`](../content/loomwarp.md#0a-substrate) |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 8 · ◐ 2 · ○ 0** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#0a-substrate) | ● | Model swap (Sonnet/Opus/Fable) + 5-provider substrate (API, Bedrock, Vertex, Foundry, Claude Platform on AWS) |
| [Codex](../content/codex.md#0a-substrate) | ● | OpenAI Responses API wire protocol; 31+ providers via `model_providers`; OAuth/API-key/enterprise-token auth |
| [FRACTAL](../content/fractal.md#0a-substrate) | ◐ | Per-agent model in agent-file frontmatter; no portability adapter |
| [Gas City](../content/gas-city.md#0a-substrate) | ● | 15 named provider CLIs; per-agent `provider`/`option_defaults`/`upstream` |
| [Grok](../content/grok.md#0a-substrate) | ● | Model-pluggable, 31+ backends; Bot's model choice fully managed |
| [Hermes](../content/hermes.md#0a-substrate) | ● | Nous Portal + 40+ providers; two-tier main + `auxiliary.<task>` models |
| [LoomWarp](../content/loomwarp.md#0a-substrate) | ◐ | Claude Code only, model per agent role; own spec calls portability undecided |
| [OpenClaw](../content/openclaw.md#0a-substrate) | ● | 70+ providers + failover; utility/image/media slots — model-pluggable, not named |
| [OpenCode](../content/opencode.md#0a-substrate) | ● | 75+ providers via the AI SDK + models.dev; first-party Zen/Go gateways |
| [Pi](../content/pi.md#0a-substrate) | ● | 31 API-key providers + subscriptions + local llama.cpp; custom providers via extension |

**Horizon:** `shipped` — `03-jtbd.md` §2 `J13` *"Who"* — three peers ship substrate selection as a named primitive: gstack `--host`, Gas City's Factory Worker Protocol, QM's per-scope adapters

**The consequence.** Every layer above this one is chosen on top of an answer given here, usually
before anyone was writing the answer down. A team that cannot name its substrate has not avoided the
decision — it has made it once, silently, and will discover the price at the migration it did not plan.
