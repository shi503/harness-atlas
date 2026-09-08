---
title: "4a · Capability"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "4 Capabilities"
sublayer: "4a"
function: "F5"
job: "J10"
horizon: "shipped"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 4a · Capability

**Layer 4 Capabilities** · function `F5` · job `J10`

> **What can the team do, and how does it travel?**
>
> Capability is **the Catalog**: packaged, versioned, owned units of *how we work*, installable into any
> repo and any person's machine. The unit is the **capability package**; the properties that make it one
> are a **version**, an **owner**, and **no hard dependency on the hub's filesystem**.

**`F5`'s other half already left, and this component is what remains.** *The Standards* — *what good
looks like* — is `3e`. What is graded here is *how it travels*, and the split exists because grading them
as one *"averages a 4 and a 2 into a 2, and the standards work disappears"*
([`02-functions.md`](../archive/v0/02-functions.md) §6 `F5`).

**The rule worth keeping is a negative one, and it was learned by breaking it: a distributed capability
never hard-depends on the hub's filesystem.** A capability that only works on the machine it was authored
on is not distributed; it is copied.

**Removal is the tell, not installation.** Every system in this landscape can put a file somewhere.
What separates a catalog from a copy loop is whether **removing a capability at the source removes it
everywhere** — and that is precisely the property our own implementation lacks.

**The enabling half is discovery, and the corpus measured the gap.** `discover` scores 50 in the
practitioner corpus and `registry` scores **0** — the concept is large and the word is absent.
**An agent that cannot find the capability reinvents it**, which is *one way to do each thing* failing
one level down.

> ⚠️ **The uncomfortable measurement on this component's own premise.** Of 601 published Skills,
> **514 (85.5%) ship no executable resource at all** — no `scripts/`, no `references/`, no `assets/` —
> which the survey reads as *"static instructions rather than executable scripts."* **Any claim that
> skills are a capability-*distribution* mechanism has to reckon with that**: most of what travels today
> is instruction, and instruction is `5b`'s object, not this one
> ([`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1).

**How do we work?** *"Any repo can install a capability we built, it stays pinned to a version, and removing it here removes it there."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The most complete catalog in the corpus: plugins, marketplaces, **SHA pinning**, semver dependencies, `validate --strict`, and `renames` — which is the removal path most implementations skip | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Distribution row |
| **Deep Agents** | Distribution as **ordered overlay**: skill sources resolve *base → user → project → team*, last-one-wins, which makes the individual/team boundary a property of **list order** rather than a separate subsystem. Plus a headless CI entry point with the discipline stated — *pin a reviewed SHA rather than `main`* | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *Skills*, §5 *Distribution* |
| **MCP** | A genuine distribution channel for a **different unit**: it distributes *tools and data connections*, not *procedures*. A team can have every MCP server it needs and still have no way to ship its own review checklist | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | Method distributed as capability: published prompts as real files, 27 slash commands including `create_handoff` and `resume_handoff`, and a skills repo carried separately from the product | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3, §7 |
| **LoomWarp** | `◐` — a `cp -r` loop **with a known removal defect where a deleted skill stays installed forever.** The catalog is the immature half of a function whose other half is its strongest row | [`loomwarp.md`](../content/loomwarp.md#4a-capability) · [`03-jtbd.md`](../comparisons/03-jtbd.md) §2 `J10` |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 9 · ◐ 1 · ○ 0** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#4a-capability) | ● | [**Skill**](../content/claude-code.md#5-primitives) + MCP + [**Plugin**](../content/claude-code.md#5-primitives) bundling both |
| [Codex](../content/codex.md#4a-capability) | ● | [**Skill**](../content/codex.md#5-primitives) + [**Plugin**](../content/codex.md#5-primitives) bundling skills/MCP; ten dogfooded project skills |
| [FRACTAL](../content/fractal.md#4a-capability) | ● | 7 first-class `SKILL.md` files at U |
| [Gas City](../content/gas-city.md#4a-capability) | ● | [**Pack**](../content/gas-city.md#5-primitives) bundles agents/formulas/orders/skills; `gascity-packs` registry |
| [Grok](../content/grok.md#4a-capability) | ● | [**Skill**](../content/grok.md#5-primitives) + [**Plugin / Marketplace**](../content/grok.md#5-primitives), SHA-pinnable |
| [Hermes](../content/hermes.md#4a-capability) | ● | [**Skill**](../content/hermes.md#5-primitives) — `SKILL.md`, agentskills.io-compatible, eight install sources |
| [LoomWarp](../content/loomwarp.md#4a-capability) | ◐ | Seven skills, synced by `cp -r`; a documented removal defect |
| [OpenClaw](../content/openclaw.md#4a-capability) | ● | [**Skill**](../content/openclaw.md#5-primitives) + [**Plugin**](../content/openclaw.md#5-primitives) + ClawHub registry |
| [OpenCode](../content/opencode.md#4a-capability) | ● | [**Skill**](../content/opencode.md#5-primitives) · [**Plugin**](../content/opencode.md#5-primitives) · [**Tool**](../content/opencode.md#5-primitives) · [**MCP server**](../content/opencode.md#5-primitives) · [**Reference**](../content/opencode.md#5-primitives); no marketplace |
| [Pi](../content/pi.md#4a-capability) | ● | [**Pi package**](../content/pi.md#5-primitives) bundling [**skill**](../content/pi.md#5-primitives) · extension · prompt template · theme |

**Horizon:** `shipped` — `03-jtbd.md` §2 `J10` *"Who"* — Claude Code plugins, marketplaces, SHA pinning, semver; gstack `--host` install; Indigo's Rust sync app

**The consequence.** Every published harness taxonomy omits distribution, and every real system builds
it — which is the clearest available evidence that taxonomies are written about one agent and systems are
built for teams. **The cost of getting it wrong is not that a capability is missing; it is that the same
capability exists in four repos at four versions**, and nobody can say which one is the sanctioned way.
