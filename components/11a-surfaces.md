---
title: "11a · Surfaces"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "11 Surfaces"
sublayer: "11a"
function: "F1 (widened)"
job: "J11"
horizon: "emerging"
graded: false
graded_reason: "disagrees with the layer-6-12 hypothesis: the page frames source-of-truth as a decision rather than a tool — *one of only two consequential decisions this system forces anyone to take* — and a decision is answered, not climbed"
requires: []
---

[← the roster](./00-README.md) — all 33, and the graded split · [CROSSWALK](./CROSSWALK.md) — recorded gaps and the rulings that closed them · [RELATIONS](./RELATIONS.md) — the `requires` graph

### 11a · Surfaces

**Layer 11 Surfaces** · function `F1 (widened)` · job `J11`

> **Where is the work seen, and which version of it is true?**
>
> Surfaces is **the Source of Truth** — the codified answer to which place is authoritative — **the
> Integrations** that carry the work outward as views, and **the Channel** where several people and
> several agents act on the same work. The top layer, and the only one every other layer is looked at
> through.

**`F1` is widened here rather than renamed, and the widening has an argument.** The original ruling put
`J11 coordinate humans` outside this function: *"`F1 Surfaces` covers source-of-truth, not channel."*
**That objection was to `F1` as one function inside a nine-band stack, and it does not survive `F1`
becoming a layer.** Layer 11 is *where work is seen and done*, and **a channel is precisely a place
work is seen.** `F1` keeps its ID and its source-of-truth clause and gains the channel clause `J11`
needed ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §1.2).

**Four peers ship channel as a first-class surface and disagree on the word**, which is the `emerging`
condition rather than an absence: QM's **rooms** · Claude Tag's *"one shared Claude per channel"* ·
Superconductor's *"every agent session shared and addressable"* · SageOx's *"multiplayer by default"*.
And `multiplayer` scores 6, narrowly and consistently meaning **concurrent humans** — concurrent
*agents* are fleets and swarms, which is a different problem with a different vocabulary
([`03-jtbd.md`](../comparisons/03-jtbd.md) §2 `J11`).

**The source-of-truth decision is the one this row actually grades, and it is a decision rather than a
tool.** When an agent is asked *what did we decide about X*, the answer may be in Slack, a document, a
comment, a PR thread or a file — and **if the team has not decided which is authoritative, the agent
cannot either.** That is the most common reason an agent confidently gives a stale answer. Markdown in
the repository is the recommended default and explicitly **not a law**; what is unacceptable is leaving
it unstated ([`02-functions.md`](../archive/v0/02-functions.md) §6 `F1`).

**The problem statement a competitor writes better than we do is the reason this layer exists at all:**
*"For a solo developer, coding agents are a superpower. For a team, they surface new kinds of
bottlenecks: coordination, visibility, review, and shared context."* **That is why the harness
broadened to the team**, and it is why the top layer of a bottom-up stack is the one about being seen.

**What this layer is not.** It is not [`9b`](./9b-rituals.md) Rituals — `J11` lands in both,
and the split is that a surface is **where** people meet while a ritual is **what they are there to
do.** It is not [`6c`](./6c-estate.md) Estate, which is where the code is; a surface is where
the work about the code is visible, and the two disagree constantly.

**How do we work?** *"Plans live in markdown in the repo and that is the source of truth — Linear and Slack are views, and any of us can open a session someone else started."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The integrations and neither of the other two: MCP carries work outward to any surface a team names, and there is **no source-of-truth decision to record it in and no shared channel**. Its own boundary explains the shape — the harness is deliberately *"not answering the team-scale or org-scale question"*, and a shared surface is that question | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides, in one screen* · [`03-jtbd.md`](../comparisons/03-jtbd.md) Appendix A |
| **Deep Agents** | One surface, shipped as a protocol: the **Agent Client Protocol** for editor integration, alongside a terminal agent and a headless CI entry point. That is three *places to invoke from* rather than a place work is **shared**, and its own teardown names the missing half — no multi-person coordination | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §1, §8 |
| **MCP** | **The field's default answer to integrations, and it is the mechanism rather than the decision.** *"External tool or data connections"* wires an agent to Slack, a tracker or a wiki with equal ease — which is exactly why the source-of-truth question gets harder rather than easier as the connections multiply. **Reach is not authority** | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The sharpest **shared** surface in the corpus and it is sold as one — *"The Multiplayer Coding Agent Workspace"*, seated and priced, with sessions and artifacts as product primitives. Its human contact reaches Slack, email, CLI and web, and `resolved` exists as a state precisely because **a control plane never owns every channel** | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §1, §6, §7 |
| **LoomWarp** | The **SoT decision made and codified** — markdown plans in the repo, flowing outward as views — which is one of only two consequential decisions this system forces anyone to take. ⚠️ And nothing else in the row: no channel, no project board, no communication surface, all three recorded `○` | [`loomwarp.md`](../content/loomwarp.md#11a-surfaces) · [`02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 7 · ◐ 3 · ○ 0** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#11a-surfaces) | ● | CLI, VS Code, JetBrains, Desktop, web, Slack — *"the same underlying Claude Code engine"* |
| [Codex](../content/codex.md#11a-surfaces) | ● | CLI/TUI, app-server embedding several IDEs, desktop app, Codex Web, SDK, MCP |
| [FRACTAL](../content/fractal.md#11a-surfaces) | ◐ | CLI/IDE session + HANDOFF/PULSE markdown; no dashboard or web UI |
| [Gas City](../content/gas-city.md#11a-surfaces) | ● | `gc session attach` TUI, web dashboard, HTTP+SSE API, `gc`/`bd` CLIs |
| [Grok](../content/grok.md#11a-surfaces) | ● | TUI + ACP into 4 editors (Build); desktop + iOS apps (Bot) |
| [Hermes](../content/hermes.md#11a-surfaces) | ● | CLI/TUI/desktop/dashboard/API/ACP/MCP/A2A/voice + 35-platform gateway |
| [LoomWarp](../content/loomwarp.md#11a-surfaces) | ◐ | CLI only — headless dispatch or a human-run second window; markdown is the record |
| [OpenClaw](../content/openclaw.md#11a-surfaces) | ● | CLI/TUI/Control UI/mobile/~30 channels/RPC/HTTP/MCP; no IDE |
| [OpenCode](../content/opencode.md#11a-surfaces) | ● | TUI, desktop, web, server, SDK, IDE ext, ACP, GitHub/GitLab, Slack |
| [Pi](../content/pi.md#11a-surfaces) | ◐ | TUI · print · JSON · RPC · SDK · experimental remote protocol; no IDE shipped |

**Horizon:** `emerging` — `03-jtbd.md` §2 `J11` *"Who"* — four peers, four names: QM **rooms**, Claude Tag *"one shared Claude per channel"*, Superconductor *"every agent session shared and addressable"*, SageOx *"multiplayer by default"*. `multiplayer` 6, narrow and consistently meaning concurrent humans

**The consequence.** This is the layer a team sees first and builds last, and the failure is not that
work is invisible — it is that it is visible in four places that disagree. **An unstated source of
truth does not stay unstated; it gets decided per session, by whichever surface the agent reached
first**, and the resulting answer is confident, sourced, and wrong in a way nobody can trace back to
the moment the choice was never made.
