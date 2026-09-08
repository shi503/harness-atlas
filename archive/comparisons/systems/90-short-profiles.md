---
title: "Comparisons — short profiles"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# Short profiles

**What this is.** One entry per system that did not earn a full teardown, with why it did not. Kept
short deliberately — these are here so the category census is complete, not because each needs
analysis.

**Sourcing tiers**, marked per entry so nothing over-claims:
`[V]` verified from a primary source this pass · `[S]` from a secondary source · `[C]` from the
April 2026 harness census, self-identification only.

---

## 1. Harnesses

These run the agent loop. LoomWarp installs *into* one of these; it is not one.

| System | Owner | Note | Src |
|---|---|---|---|
| **Claude Code** | Anthropic | **Torn down 2026-09-04** — [`content/claude-code.md`](../../../content/claude-code.md#1-at-a-glance), Template v2. An agent loop wrapped in an "agentic harness"; 7–8 contestable primitives; structured output is the `claude_code.interaction` OTel trace carrying the `tool_decision` permission-audit record | `[V]` |
| **Codex CLI** | OpenAI | **Torn down 2026-09-03** — [`content/codex.md`](../../../content/codex.md). A runtime split into an engine and a wire protocol (the app-server); Hermes and OpenClaw both embed it. Contestable 8-primitive set, mid-migration on two fronts (`sandbox_mode`/`[permissions]`; `codex mcp-server` deprecated for the app-server) | `[V]` |
| **Gas City** | Gas Town Hall (`gastownhall`) | **Torn down 2026-09-03** — [`content/gas-city.md`](../../../content/gas-city.md), replacing this section's prior entry (`comparisons/systems/gas-city.md`, now `SUPERSEDED`). A gateway/host over 15+ coding-agent CLIs, six primitives (Agent, Bead, Formula, Rig, Pack, Event) gated by a documented SDK-admission test, and a documented deletion of a prior primitive. The short profile's two claims — a seven-item primitive count and a "Factory Worker Protocol" — did not survive the primary-source read: the real count is six, and no FWP was found under any name | `[V]` |
| **LoomWarp** | KD (`shi503`) | **Torn down 2026-09-03** — [`content/loomwarp.md`](../../../content/loomwarp.md). A process layer sitting in this table by the same exception Gas City does: it installs *into* Claude Code (agent files, skills) rather than running a loop itself. Zero primitives named in its own current words — a superseded six-primitive table did not survive the rewrite into its current framework, and two of the six (work contract, capability package) are the only ones still named concretely. Private, unreleased, single-contributor, one live dispatch run, which bypassed its own policy tier | `[V]` |
| **FRACTAL** | KD (`shi503`) | **Torn down 2026-09-03** — [`content/fractal.md`](../../../content/fractal.md). Sits here by the same installs-into exception as Gas City and LoomWarp — no loop of its own. Three instances graded together: upstream (public, MIT, zero releases), the fork `generic-cerebro` (156 workstreams, independently rediscovered the flat-state-file defect), and this repo's own un-routed instance, which runs the document conventions with `router.py` deleted. Five vendor-named artifacts (STRATEGIST · BLUEPRINT · workstream/PRD · HANDOFF · PULSE), `⚠️ contestable`. Two of five claims in this corpus's own delta document about what the fork added — `pulse`, the `ISSUES.md` register — did not survive a direct re-check against the pinned upstream commit; they ship upstream already | `[V]` |
| **goose** | Block | Local-first agent framework; combines LLMs, extensible tools, MCP-based integration. **An AAIF founding project** — governance now sits with the Linux Foundation, not Block | `[V]` |
| **Cursor** | Anysphere | IDE-attached; team rules. Named among the top closed-source coding harnesses of 2026 | `[S]` |
| **Antigravity** | Google | Named among the top closed harnesses of 2026 | `[S]` |
| **Kiro** | AWS | Target of gstack `--host` | `[S]` |
| **OpenClaw** | Peter Steinberger · OpenClaw Foundation | **Torn down 2026-09-02** — [`harnesses/openclaw.md`](../../../content/openclaw.md). A gateway that hosts other harnesses as runtimes; the only system in the corpus to ship a session *owner* | `[V]` |
| **Hermes** | Nous Research | **Torn down 2026-09-02** — [`harnesses/hermes.md`](../../../content/hermes.md). Self-improving; kanban owns *"lifecycle truth"*; imports from Claude Code, Codex and OpenClaw | `[V]` |
| **Pi** | Mario Zechner · Earendil | **Torn down 2026-09-02** — [`harnesses/pi.md`](../../../content/pi.md). The runtime under QM; refuses MCP, subagents, permissions, plan mode and to-dos by design | `[V]` |
| **OpenCode** | Anomaly | **Torn down 2026-09-02** — [`harnesses/opencode.md`](../../../content/opencode.md). Coding-harness control case; nine-rung config precedence ending in MDM | `[V]` |
| **Grok Bot / Grok Build** | SpaceXAI | **Torn down 2026-09-02** — [`harnesses/grok.md`](../../../content/grok.md). Hosted always-on teammate (beta 2026-08-11) paired with the Apache-2.0 Rust harness; whether one runs on the other is ⚠️ unstated at source | `[V]` |
| **Amp** | Sourcegraph | Named in Gas City's `provider` list; SageOx ships a plugin for it ⚠️ *was "Gas City's FWP" — ISSUE-004* | `[S]` |
| **Gemini CLI · Droid · Aider · Windsurf · Cline** | various | Appear in SageOx's support matrix and Gas City's `provider` list ⚠️ *was "FWP list" — ISSUE-004*. Not separately assessed | `[S]` |

**Why most got no teardown — and why four now have.** The harness layer is not where LoomWarp
competes, and Claude Code — the one we run on — already has 12 documents of analysis. That held for
the seventeen-function model. v1's upper-layer markers (`emerging`, `claimed`, `bet`) need peer
citations the process layers could not supply, so on 2026-09-02 Hermes, Pi, OpenClaw, OpenCode and
Grok Bot / Grok Build were read at source against all thirty-three components. The synthesis — including where the
inclusion test above breaks — is [`../04-harness-alignment.md`](../../../components/ALIGNMENT.md).

---

## 2. Other things called "agentOS"

The term is contested. These are the senses this corpus is **not** using, recorded so the definition
in [`../00-README.md`](../00-README.md) is legible as a choice.

| System | The sense of "agentOS" | Why it is out of scope | Src |
|---|---|---|---|
| **Fiserv agentOS** | A vertical platform for deploying agents across banking workflows; launched May 2026 | Domain platform, not a developer-team layer. Shares only the name | `[S]` |
| **Agno AgentOS** | A pre-built FastAPI server with sessions, streaming, RBAC and observability | An application-hosting runtime for agents you build — a *framework* concern, not a team-process one | `[S]` |
| **AIOS** (academic) | LLM-as-kernel research line; OS abstractions — scheduling, memory, syscalls — for agents | Research framing. Useful vocabulary, no adoptable artifact | `[S]` |
| **Microsoft Agent Framework** | AutoGen + Semantic Kernel converged; 1.0 GA April 2026. Shipped "Agent Harness" and hosted agents at BUILD 2026 | Enterprise agent-building framework. Its "harness" is a hosting concept, not a team-process layer | `[S]` |

**The finding.** Four incompatible senses of one term, all current in 2026. Any document of ours
using "agentOS" without defining it is unreadable to half its audience. See
[`../00-README.md`](../00-README.md) §1.

---

## 3. Adjacent categories — named, not profiled

These solve neighbouring problems. Listed so the boundary is explicit rather than implied.

| Category | Systems | Why adjacent, not peer |
|---|---|---|
| **Memory infrastructure** | Mem0, Letta, Zep, Cognee | Solve agent memory as a service. No team-process opinion, no governance layer. **Watch item:** the Indigo analysis predicts a memory interop standard under AAIF, and whoever writes it takes ground from `F3` | `[S]` |
| **Enterprise knowledge** | Glean, Dust | Org-wide search and assistants with real permission models. Glean has permission-aware retrieval — the thing `F3` would need for regulated adoption — but not the coding-agent layer | `[S]` |
| **Agent frameworks** | LangGraph, CrewAI, AG2, deepagents | For *building* agents, not for running a team's process. The census explicitly separates frameworks from harnesses | `[C]` |
| **Dev agents with org knowledge** | Devin (Cognition), Factory | Compete for the same budget and absorb some of the same jobs, but sell a managed agent rather than a layer you own. Tan's custody argument is the direct counter-position | `[S]` |
| **Rule-sync utilities** | Ruler, ai-rules-sync, Continue.dev | Fan out rules across tools. A single component of `F3`, productized. Cheap to adopt; nothing to learn structurally | `[S]` |
| **Durable execution** | Temporal, and LangGraph's persistence layer | **Worth flagging.** `F4`'s "durable execution across process death" gap is unclaimed *within the agent-harness category* — but it is a solved problem in workflow engineering. Claiming it as novel would be a category error | `[S]` |

---

## 4. The standards layer

Not systems, but the substrate all of them ride. This layer changed materially in December 2025 and
`specs/v0/references.md` does not mention it.

| Standard | Status | Bears on |
|---|---|---|
| **MCP** | Anthropic-contributed, now stewarded by the **Agentic AI Foundation** under the Linux Foundation. 110M+ monthly downloads *(as of April 2026 — dated)*. **No "MCP v2" exists**; the spec is date-versioned and the current one, **2026-07-28**, made the protocol stateless and moved Tasks/Apps/EMA into extensions | `F1` integrations; `F0` |
| **AGENTS.md** | OpenAI-contributed, AAIF-stewarded. v1.0 — the first stable behavioural specification, with goose-based validation tooling — is on the roadmap | `F3`; `F0` portability |
| **Agent Skills / `SKILL.md`** | Published as an open cross-platform standard. Six frontmatter fields portable outside Claude Code; a disallowed field is a hard error | `F5` Catalog; `F0` |
| **goose** | Block-contributed, AAIF-stewarded | `F0` |
| **A2A governance** | Inter-agent trust chain spec, RFC-complete target Q3 2026 | `F6`; future `F7` |
| **AAIF security conformance** | Certification programme in the roadmap | `F6` |
| **`llms.txt`** | De facto convention for agent-readable site indexes | `F3` |

**Why this matters more than it looks.** The AAIF formed in December 2025 and reached **247 members and five hosted projects by August 2026** (A2A joined 2026-08-19). The
consequence, stated well in the Indigo analysis: *the formats are commoditized.* **Nobody wins by
owning a file format anymore** — the competition moved up-stack to sync, governance, secrets, memory,
and the capture loop. That is a direct argument for where `F0`'s portability posture should land:
riding the standards is now cheap, and the differentiation has to be elsewhere.

---

## 5. The census

[danielrosehill/AI-Harnesses](https://github.com/danielrosehill/AI-Harnesses) is a point-in-time
snapshot (April 2026) of projects self-identifying as agent harnesses — 20+ entries including
`bytedance/deer-flow`, `langchain-ai/deepagents`, `HKUDS/OpenHarness`, `thu-nmrc/OpenHarness`,
`truffle-ai/dexto`, `mastersof-ai/harness`.

Two things worth taking from it rather than the entries themselves:

1. **The definition** used in [`../01-concepts.md`](../01-concepts.md) §2 — harness vs. framework vs.
   backend.
2. **Its stated caveat:** *"the terminology is still fluid and not universally agreed upon."* That is
   the honest state of the category and the reason the vocabulary document exists.

---

## Sources

- [danielrosehill/AI-Harnesses](https://github.com/danielrosehill/AI-Harnesses) · accessed 2026-08-11
- [Linux Foundation — AAIF formation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) · [aaif.io](https://aaif.io/) · accessed 2026-08-11
- [Fiserv agentOS](https://investors.fiserv.com/news-releases/news-release-details/fiserv-launches-agentos-operating-system-agentic-ai-banking) · accessed 2026-08-11
- [Microsoft Agent Framework at BUILD 2026](https://devblogs.microsoft.com/agent-framework/microsoft-agent-framework-at-build-2026-announce/) · accessed 2026-08-11
- [AIOS / LiteCUA](https://arxiv.org/pdf/2505.18829) · accessed 2026-08-11
- [Top 10 AI Agent Harnesses 2026](https://explainx.ai/blog/top-10-open-closed-source-agent-harnesses-2026) · accessed 2026-08-11
- Adjacent-category entries derive from the Indigo landscape analysis (2026-06-04) and are **two
  months stale**; treat funding and valuation figures as directional only.
