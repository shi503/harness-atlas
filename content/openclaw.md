---
title: "OpenClaw — the gateway that hosts other harnesses as runtimes"
tier: reference
project: harness-atlas
created: "2026-09-02"
updated: "2026-09-07"
status: DRAFT
owner: KD
source: "github.com/openclaw/openclaw @ v2026.8.2 · docs.openclaw.ai (590 pages, docs.json) · read 2026-09-02"
provenance: OBSERVED
template: "v2 (restructured from the v1 read of 2026-09-02, no re-read)"
verification:
  derived_from:
    - "github.com/openclaw/openclaw @ v2026.8.2 · docs.openclaw.ai (590 pages, docs.json) · read 2026-09-02"
  grounded_against:
    - "§4 component matrix — 33 rows against the sources above"
    - "§5 primitives, §7 identity table, §9 sources"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-02"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is an ATTESTATION, not a capture. This profile was written before the corpus recorded
    authorship; KD attested opus on 2026-09-08 under ruling 2026-09-08-authorship-provenance, which
    also requires this sentence. drafted_on is the date the profile was authored; it was restructured to Template v2 on 2026-09-07 without a re-read.
    The separate drafted banner in §1a covers the seven DX values, which were scored later and are a
    different analysis with its own date.
---

# OpenClaw — Peter Steinberger · OpenClaw Foundation

***A TypeScript gateway daemon whose defining move is hosting: it owns the channels (~30 messaging surfaces), credentials and control-plane API, and either runs its own agent loop or hands the turn to Codex, Claude Code, or eleven-plus ACP harnesses as pluggable runtimes — with a named session owner, operator roles and scopes, and a maturity scorecard it runs on itself.***

> **Profile drafted 2026-09-02 by `claude-opus-5`, not yet verified.** Attested, not captured — see `verification:` above.

## 1. At a glance

| | |
|---|---|
| **Altitude** | Gateway / host — runs its own loop *and* hosts Codex, Claude Code, 11+ ACP harnesses as runtimes → [§7](#7-identity-and-inclusion-test) |
| **Primitives** | 12+, accommodation failure — gateway · agent · workspace files · channel + binding · skill · plugin · hook · tool policy/exec approvals/sandbox · automation/heartbeat · node · session · agent runtime → [§5](#5-primitives) |
| **Structured output** | ⚠️ not stated at the v1 read → [§5](#5-primitives) |
| **Binds mechanically?** | Yes, at several layers — exec approvals only tighten, role-required sandbox never degrades to host → [2c](#2c-enforcement) |
| **State persists** | Workspace Markdown, per-agent SQLite, shared `state.sqlite`; *"there is no hidden state"* → [5a](#5a-individual-memory) |
| **Serves** | Many, at the gateway layer — team gateway with session owner and roles; *"one trust domain,"* not multi-tenant → [10b](#10b-org) |
| **Refuses** | No published refusal list found at the v1 read → [§5](#5-primitives) |
| **Coverage** | ● 20 · ◐ 10 · ○ 3 · n/a 0 → [§4](#4-component-matrix) |
| **Source** | github.com/openclaw/openclaw @ v2026.8.2 · docs.openclaw.ai (590 pages) · read 2026-09-02 |
| **Unverified** | 13 items → [§10](#10-unverified) |

### 1a. Positioning stats

`0 · +2 · +3 · +2 · +1† · +3 · +2` — the seven DX dimensions, in order.

> **⚠️ Drafted 2026-09-07, not yet verified.** Derived from OpenClaw's own README, VISION.md and docs site — grounded against §4, §5 and §7 below. No person has re-read these seven values yet. [`01-scorecard.md`](../spectrums/01-scorecard.md) §1 R11 says how the banner comes off.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `───●───` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─────●─` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Context | nothing survives | `─────●─` | shared, durable, retrievable |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `─────●─` | observability, efficiency, routing |

**†** the one **graded** dimension; every other row is a position, not a score. **Neither end is better.** Ten axes sit beneath these seven — `I 0 · II 2 · III 3 · IV 0 (dual +3) · V 3 · VI 3 · VII 0 · VIII 0 · IX 2 · X 2` — and four of them feed no cell above by design.

→ [`spectrums/positioning.md`](../spectrums/positioning.md) · [`positions/openclaw.yaml`](../spectrums/positions/openclaw.yaml) · [`01-scorecard.md`](../spectrums/01-scorecard.md) · [`00-README.md`](../spectrums/00-README.md)

*Scored 2026-09-07 against this profile as read 2026-09-02. This table is the **one sanctioned echo** of the scorecard — derived from the same YAML that renders `positioning.md`, so the two match by construction. Re-score in the YAML, never here.*

### 1b. Contents

[§1 At a glance](#1-at-a-glance) · [1a Positioning stats](#1a-positioning-stats) · [§2 System map](#2-system-map) · [§3 Workflows](#3-workflows) · [§4 Component matrix](#4-component-matrix) · [§5 Primitives](#5-primitives) · [§6 Details](#6-details) · [§7 Identity and inclusion test](#7-identity-and-inclusion-test) · [§8 Limits](#8-limits) · [§9 Sources](#9-sources) · [§10 Unverified](#10-unverified)

No deep-read folder exists for OpenClaw.

## 2. System map

**Diagram inventory not done at the 2026-09-02 read — pending the diagram pass (W8c).** No `assets/projects/openclaw/` exists, and no vendor diagram was inventoried when the source read was taken. This is a recorded gap, not an absence: the read predates the diagram obligation.

**How it thinks about work.** A unit of work is one turn in one session, run either by the embedded runtime (`runEmbeddedAgent`) or handed to a pluggable agent runtime — the Codex app-server, Claude Code via the Agent SDK, or an ACP harness — selected per model or per agent. Entry is a channel message, a cron or heartbeat tick, or a webhook; nothing gates entry structurally, but tool policy, exec approvals and sandbox scope gate what the turn may then do, and role-required sandboxing "never degrades to host execution" when it fails. Work lands as tool effects, chat replies, and — where the operator installed the machinery — background-task records, task-flow state, or workboard cards; the receipt is a metadata-only audit-ledger row plus the session transcript.

## 3. Workflows

**Not written at the 2026-09-02 read — pending the diagram pass (W8c).** A recorded gap. The three sequences a workflow pass should draw, each already evidenced in §6 and needing no new source read:

1. **The turn, across two hook tiers** — internal event (`message:received`) → plugin lifecycle (`before_agent_run` → `before_tool_call`, can block → `after_tool_call` → `agent_end`) → internal event (`message:sent`) ([2b](#2b-hooks)).
2. **Message-to-agent routing by specificity** — inbound message → `bindings[]` matched exact peer > parent peer > peer wildcard > guild+roles > guild > team > account > channel > default, first-in-config wins ties ([3b](#3b-routing)).
3. **Runtime handoff** — `agentRuntime.id` resolution → embedded loop, Codex app-server, Claude Code Agent SDK, or an ACP harness, sandboxed except ACP, which runs outside it ([2a](#2a-adapters--middleware), [1a](#1a-environment)).

## 4. Component matrix

`● named primitive · ◐ partial, present-not-first-class · ○ absent (pages named in §6) · n/a does not apply at this altitude`

**Marks copied verbatim from OpenClaw's column in [`04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2; not re-derived at the restructure.**

| # | Component | Mark | Primitive / note |
|---|---|:-:|---|
| **0 · Foundation** | | | |
| [0a](#0a-substrate) | Substrate | ● | 70+ providers + failover; utility/image/media slots — model-pluggable, not named |
| **1 · Environment** | | | |
| [1a](#1a-environment) | Environment | ◐ | Shell/filesystem/browser/network tools; `tools.exec.host` declares where, not an inventory |
| **2 · Agent Harness** | | | |
| [2a](#2a-adapters--middleware) | Adapters & Middleware | ● | [**Plugin**](#5-primitives) SDK + MCP client/server + Code Mode |
| [2b](#2b-hooks) | Hooks | ● | Two typed tiers + webhooks — internal observe-only, plugin [**Hook**](#5-primitives) can block |
| [2c](#2c-enforcement) | Enforcement | ● | [**Tool policy / Exec approvals / Sandbox**](#5-primitives) — role-required sandbox never degrades to host |
| **3 · System Stacks** | | | |
| [3a](#3a-control) | Control | ◐ | Exec-approval gates + goals; no plan-mode primitive |
| [3b](#3b-routing) | Routing | ● | `bindings[]` specificity ladder — [**Channel + Binding**](#5-primitives) |
| [3c](#3c-composition) | Composition | ● | [**Agent**](#5-primitives) config entries + sub-agents + experimental swarm |
| [3d](#3d-configuration) | Configuration | ● | Strict-schema config + [**Workspace bootstrap files**](#5-primitives), two-bucket precedence |
| [3e](#3e-standards) | Standards | ○ | No versioned rules-pack for user projects; templates only |
| **4 · Capabilities** | | | |
| [4a](#4a-capability) | Capability | ● | [**Skill**](#5-primitives) + [**Plugin**](#5-primitives) + ClawHub registry |
| [4b](#4b-capability-permissions) | Capability Permissions | ● | Per-agent skill/tool allowlists; `before_install` can block |
| **5 · Context ⟳** | | | |
| [5a](#5a-individual-memory) | Individual Memory | ● | Workspace Markdown + hybrid `memory_search`; dreaming promotes it |
| [5b](#5b-team-memory) | Team Memory | ◐ | Shared sessions + provenance; no governed person-to-person promotion |
| [5c](#5c-knowledge) | Knowledge | ● | `memory-wiki` — structured claims with evidence and provenance |
| **6 · Workspaces ⟳** | | | |
| [6a](#6a-product) | Product | ○ | Nothing PRD-shaped; goals and Workboard both disclaim the role |
| [6b](#6b-infrastructure) | Infrastructure | ● | Sandbox backends, [**Node**](#5-primitives), cloud workers, experimental fleet |
| [6c](#6c-estate) | Estate | ◐ | Managed worktrees only; no multi-repo model documented |
| [6d](#6d-delivery) | Delivery | ○ | No built-in pipeline; `pull-request-review-flow` is OpenClaw's own repo |
| **7 · Workflow Tasks** | | | |
| [7a](#7a-workflow-tasks) | Workflow Tasks | ◐ | Six task-shaped objects, vendor concedes the overlap itself |
| **8 · Trust** | | | |
| [8a](#8a-evals) | Evals | ◐ | Personal-agent benchmark pack; dev-facing, not a ship gate |
| [8b](#8b-evidence) | Evidence | ● | (supporting) [**Audit ledger**](#5-primitives) — metadata-only by construction |
| [8c](#8c-observability) | Observability | ● | OTel spans + Prometheus; no telemetry unless opted in |
| [8d](#8d-efficiency) | Efficiency | ● | Compaction + cache-TTL + per-goal budget; no spend cap |
| **9 · IMPROVE** | | | |
| [9a](#9a-learning) | Learning | ● | Self-learning + Skill Workshop review gate + dreaming promotion |
| [9b](#9b-rituals) | Rituals | ◐ | Bootstrap ritual + heartbeat + Custodian playbook; no human rituals |
| [9c](#9c-cadence) | Cadence | ● | [**Automation (cron) / Heartbeat**](#5-primitives) inside the Gateway process |
| [9d](#9d-anti-fragile-lifecycle) | Anti-fragile Lifecycle | ◐ | Restart recovery + failover + `doctor --fix`; no defect ledger |
| [9e](#9e-raise-the-floor) | Raise the Floor | ◐ | `onboard`, `doctor --fix`, security-audit `--fix`; templates for every file |
| [9f](#9f-diagnose-the-bottleneck) | Diagnose the Bottleneck | ◐ | Maturity scorecard — for itself, not a user's deployment |
| **10 · Teams & Agents** | | | |
| [10a](#10a-roster) | Roster | ● | Named [**Agent**](#5-primitives) identities + Custodian + default persona |
| [10b](#10b-org) | Org | ● | (supporting) [**Operator roles / scopes**](#5-primitives) + session owner/participant |
| **11 · Surfaces** | | | |
| [11a](#11a-surfaces) | Surfaces | ● | CLI/TUI/Control UI/mobile/~30 channels/RPC/HTTP/MCP; no IDE |
| **● 20 · ◐ 10 · ○ 3 · n/a 0** | | | |

## 5. Primitives

| Primitive | Path / key | Project's own definition (verbatim) | Source |
|---|---|---|---|
| Gateway | `~/.openclaw/openclaw.json`; port `127.0.0.1:18789`; `openclaw gateway` | *"A single long-lived Gateway owns all messaging surfaces… The Gateway owns channel connections, config, credentials, and the control-plane API."* | ✅ `/concepts/architecture` · `/start/why-openclaw` |
| Agent | `agents.entries.<agentId>` | *"workspace: Directory containing SOUL.md, AGENTS.md, USER.md, and local files."* *"agentDir: State directory for auth profiles and session store."* | ✅ `/concepts/multi-agent` · `/gateway/config-agents` |
| Workspace bootstrap files | `~/.openclaw/workspace/{AGENTS.md,SOUL.md,USER.md,IDENTITY.md,BOOTSTRAP.md,MEMORY.md}` | *"AGENTS.md: Operating instructions… Loaded at the start of every session."* *"SOUL.md: Persona, tone, and boundaries."* | ✅ `/concepts/agent-workspace` |
| Channel + Binding | `channels.<name>.*`; top-level `bindings[]` | *"OpenClaw can talk to you on any chat app you already use."* Bindings: *"Most-specific wins."* — bundles two objects | ✅ `/channels` · `/concepts/multi-agent` |
| Skill | `<workspace>/skills/<name>/SKILL.md` | *"markdown instruction files that teach the agent how and when to use tools."* *"OpenClaw follows the AgentSkills spec."* | ✅ `/tools/skills` |
| Plugin | `openclaw.plugin.json`; `plugins.*` | *"Plugins extend OpenClaw with channels, model providers, agent harnesses, tools, skills, speech… and other runtime capabilities."* Run in process. | ✅ `/tools/plugin` · `VISION.md` |
| Hook | Internal: `hooks/<name>/HOOK.md`+`handler.ts`. Plugin: `api.on(<event>)` | Internal: *"small JavaScript or TypeScript handlers that run in the Gateway process when OpenClaw emits an event."* Plugin `before_tool_call`: *"Rewrite tool params, block execution, or require approval."* | ✅ `/automation/hooks` · `/plugins/hooks` |
| Tool policy / Exec approvals / Sandbox | `tools.{profile,allow,deny,exec,sandbox}` | *"Tool policy gates whether the exec tool itself is callable; approvals gate which commands the exec tool can run after it's invoked."* Sandbox: *"not a perfect security boundary, but it materially limits filesystem and process access."* — bundles three | ✅ `/tools/exec-approvals` · `/gateway/sandboxing` |
| Automation (cron) / Heartbeat | `cron.*`; `agents.defaults.heartbeat.*` | Scheduler *"runs inside the Gateway process, not inside the model."* Heartbeat: *"a system-owned automation that runs periodic agent turns in the main session."* | ✅ `/automation/cron-jobs` · `/gateway/heartbeat` |
| Node | `gateway.nodes.*`; `openclaw devices approve` | *"A node is a companion device (macOS/iOS/watchOS/Android/headless) that connects to the Gateway with `role: "node"`."* | ✅ `/nodes` |
| Session | `~/.openclaw/agents/<id>/agent/openclaw-agent.sqlite` | *"Session key is a routing selector, not an authorization token."* | ✅ `/concepts/session` · `/gateway/security` |
| Agent runtime (harness) | `agentRuntime.id` at `agents.defaults.models["provider/model"]` | *"owns one prepared model loop: it receives the prompt, drives model output, handles native tool calls, and returns the finished turn to OpenClaw."* Harness = *"the implementation that provides an agent runtime (code term)."* | ✅ `/concepts/agent-runtimes` |
| (supporting) Audit ledger | `~/.openclaw/state/openclaw.sqlite` `audit_events` | *"bounded, metadata-only audit ledger in the shared OpenClaw state database"* — *"never stores prompts, message bodies, tool arguments, tool results."* | ✅ `/gateway/audit` |
| (supporting) Operator roles / scopes | `gateway.roles.definitions.<role>.{sessions,agents,scopes,sandbox}` | *"Session ownership, visibility, and presence are usability features, not security boundaries."* Session owner *"in the style of a GitHub issue assignee."* | ✅ `/gateway/operator-scopes` · `/concepts/multi-user` |

**Count:** 12 primitives, 2 supporting *(as counted at the 2026-09-02 read; the two supporting rows are added at this restructure — see ISSUE-007)*. **Verdict:** 12+ named units — the corpus's own count ([`04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §3.3) — puts OpenClaw past the 5–7 healthy band into **accommodation failure**, most visibly at `7a`, where six task-shaped objects (background tasks, task flow, goals, standing orders, standing intents, workboard) coexist and the vendor's own docs concede the overlap: *"A goal is not a task queue"*; the workboard *"is not a replacement for GitHub Issues, Linear, Jira."*

No published refusal list was found at the v1 read.

## 6. Details

`✅ direct · ↪ relayed · ⚠️ unverified`

### 0 · Foundation

#### 0a Substrate
<details>
<summary>● 70+ providers + failover; utility/image/media slots — model-pluggable, not named</summary>

**Ships.** Model-pluggable across 70+ listed providers (Anthropic, OpenAI, Google, Bedrock, Azure, Mistral, Groq, OpenRouter, DeepSeek, xAI, GitHub Copilot, LiteLLM, ClawRouter, Ollama, llama.cpp, vLLM, and more); ~100 provider/channel plugins in the repo's `extensions/`. Model failover via `{primary, fallbacks}`; separate utility/image/media/pdf model slots.
**Path.** `agents.defaults.model.primary`; `models.providers.<id>.{baseUrl,api,apiKey,models}`
**Source.** ✅ `/providers` · `/gateway/config-tools` · `/gateway/config-agents` · GitHub `extensions/`

</details>

### 1 · Environment

#### 1a Environment
<details>
<summary>◐ Shell/filesystem/browser/network tools; <code>tools.exec.host</code> declares where, not an inventory</summary>

**Ships.** Shell (`exec`, `process`, `code_execution`), filesystem (`read/write/edit/apply_patch`), browser (dedicated profile, Chrome extension), network (`web_search`/`web_fetch`/`x_search`), device peripherals via paired nodes. Local host by default; Docker/Podman/SSH/OpenShell sandboxes, cloud workers, a host PTY terminal in Control UI.
**Path.** `tools.*`; `tools.exec.host = gateway|node|sandbox|auto`
**Source.** ✅ `/tools` · `/gateway/sandboxing` · `/nodes` · `/gateway/security`

</details>

### 2 · Agent Harness

#### 2a Adapters & Middleware
<details>
<summary>● <b>Plugin</b> SDK + MCP client/server + Code Mode</summary>

**Ships.** Built-in tool registry with tool groups; provider abstraction; plugin SDK (`api.on`, `api.registerHook`, register channels/providers/tools/harnesses); MCP client (stdio/HTTP/SSE) and MCP server mode (`openclaw mcp serve`); Code Mode; tool search; OpenAI-compatible HTTP API.
**Path.** `mcp.servers`; `plugins.*`; `openclaw.plugin.json`; `tools.codeMode.enabled`
**Source.** ✅ `/tools/mcp` · `/tools/plugin` · `/plugins/hooks` · `VISION.md`

</details>

#### 2b Hooks
<details>
<summary>● Two typed tiers + webhooks — internal observe-only, plugin <b>Hook</b> can block</summary>

**Ships.** Internal hooks (`command:new`, `session:compact:*`, `message:*`, `gateway:*`, …) are observe-only — *"Returned values do not block, cancel, or rewrite the operation."* Plugin lifecycle hooks (~45 named events across model, tool, session and agent stages) include `before_tool_call`, which can block, cancel or require approval. Webhook ingress (Gmail, IMAP).
**Path.** `<workspace>/hooks/<name>/HOOK.md`+`handler.ts`; plugin `api.on(...)`
**Source.** ✅ `/automation/hooks` · `/plugins/hooks` · `/gateway/configuration`

</details>

#### 2c Enforcement
<details>
<summary>● <b>Tool policy / Exec approvals / Sandbox</b> — role-required sandbox never degrades to host</summary>

**Ships.** Tool policy (`tools.profile`, allow/deny, groups); exec modes `deny/allowlist/ask/auto/full` with per-agent allowlists and `argPattern`, `askFallback` defaulting to `deny`; `tools.elevated` break-glass (off by default); role-required sandboxing — *"failures never degrade to host execution"*; blocking plugin hooks; channel gates; owner-only control-plane tools.
**Path.** `tools.exec.mode`, `tools.exec.ask`; `gateway.roles.definitions.<role>.sandbox: "required"`
**Source.** ✅ `/tools/exec-approvals` · `/gateway/sandboxing` · `/gateway/security`

</details>

### 3 · System Stacks

#### 3a Control
<details>
<summary>◐ Exec-approval gates + goals; no plan-mode primitive</summary>

**Ships.** Exec approvals broadcast to macOS app / Control UI / `exec.approval.resolve`; `ask_user` tool; `auto` mode *"sends misses through auto-review before falling back to human approval"*; a run contract via `agent` RPC; Goals (`create_goal` only on explicit request); standing orders in `AGENTS.md` prose (approval gates, escalation rules).
**No plan-mode primitive was found.**
**Path.** `tools.exec.ask`; `exec.askFallback`; `/goal`; `AGENTS.md`
**Source.** ✅ `/tools/exec-approvals` · `/concepts/agent-loop` · `/tools/goal` · `/automation/standing-orders`

</details>

#### 3b Routing
<details>
<summary>● <code>bindings[]</code> specificity ladder — <b>Channel + Binding</b></summary>

**Ships.** Message→agent routing via `bindings[]` matched on channel/account/peer/guild, with a published specificity ladder — *"exact peer > parent peer > peer wildcard > guild+roles > guild > team > account > channel > default"*, first-in-config wins ties. Per-agent model routing with fallbacks; agent-to-agent off by default; group-chat mention patterns.
**Path.** `bindings[]`; `openclaw agents bind/unbind/bindings`
**Source.** ✅ `/concepts/multi-agent` · `/gateway/config-agents` · `/tools/acp-agents`

</details>

#### 3c Composition
<details>
<summary>● <b>Agent</b> config entries + sub-agents + experimental swarm</summary>

**Ships.** Agent = `agents.entries.<agentId>` (workspace, agentDir, model, identity, tools, skills, sandbox). Sub-agents — *"background agent runs spawned from an existing agent run"* — depth ≤5, `maxConcurrent` 8; sub-agent context injects only `AGENTS.md`. Swarm (experimental, opt-in orchestration of many sub-agents from a Code Mode script).
**No agent-definition file** — agents are config entries plus a workspace.
**Path.** `agents.entries.*`; `agents.defaults.subagents.*`
**Source.** ✅ `/gateway/config-agents` · `/tools/subagents` · `/tools/swarm`

</details>

#### 3d Configuration
<details>
<summary>● Strict-schema config + <b>Workspace bootstrap files</b>, two-bucket precedence</summary>

**Ships.** `~/.openclaw/openclaw.json` (JSON5, strict schema — unknown keys fail startup, `$include`, hot reload); the *"two-bucket rule"* — root-level siblings hold infrastructure/cross-agent defaults, `agents.defaults` holds agent-loop behavior, `agents.entries` may override. Precedence: env vars > inline `env.vars` > `.env` > shell env. Workspace instruction files are size-capped.
**Path.** `openclaw config get/set/patch/validate`; `openclaw configure`
**Source.** ✅ `/gateway/configuration` · `/concepts/agent-workspace`

</details>

#### 3e Standards
<details>
<summary>○ No versioned rules-pack for user projects; templates only</summary>

**Nothing here** as a versioned rules-pack / style-guide inheritance mechanism for user projects — checked `/reference/AGENTS.default`, `/concepts/soul`, `/tools/custodian-skills`.
**What exists instead.** Shipped templates only (AGENTS/SOUL/USER/IDENTITY/BOOTSTRAP/BOOT/HEARTBEAT); a default `AGENTS.md` (*"Don't dump directories or secrets into chat"*); custodian skills (Gather/Mutate/Repair/Prove/Report). The repo's own `AGENTS.md` is for contributors, not a product feature.
**Source.** ✅ `/reference/AGENTS.default` · `/concepts/soul` · `/tools/custodian-skills`

</details>

### 4 · Capabilities

#### 4a Capability
<details>
<summary>● <b>Skill</b> + <b>Plugin</b> + ClawHub registry</summary>

**Ships.** Skills — *"markdown instruction files that teach the agent how and when to use tools,"* following the Agent Skills spec; ~50 bundled. ClawHub — *"the public registry for OpenClaw skills and plugins"* — install by `@owner/slug`, `git:`, or path; a lockfile; publish gated by GitHub account age. Plugins — manifest `openclaw.plugin.json`, ~160 bundled in `extensions/`.
**Path.** `<workspace>/skills/<name>/SKILL.md`; `openclaw skills install`; `openclaw plugins install`
**Source.** ✅ `/tools/skills` · `/clawhub` · `/tools/plugin` · GitHub `skills/`, `extensions/`

</details>

#### 4b Capability Permissions
<details>
<summary>● Per-agent skill/tool allowlists; <code>before_install</code> can block</summary>

**Ships.** Per-agent skill allowlists (`[]` = none); per-agent tool allow/deny; `tools.byProvider.<id>.profile`; sandboxed MCP/plugin tools gated by `tools.sandbox.tools.alsoAllow`; `plugins.allow` inventory; node command allow/deny; owner-only tools (`gateway`, `cron`); `before_install` hook can block skill/plugin installs.
**Path.** `agents.entries.<id>.skills`; `tools.byProvider.*`; `plugins.allow`
**Source.** ✅ `/gateway/config-tools` · `/gateway/security` · `/nodes` · `/plugins/hooks`

</details>

### 5 · Context ⟳

#### 5a Individual Memory
<details>
<summary>● Workspace Markdown + hybrid <code>memory_search</code>; dreaming promotes it</summary>

**Ships.** Per-agent workspace Markdown — `MEMORY.md`, `memory/YYYY-MM-DD.md`, `USER.md`, `DREAMS.md` — manual (*"just ask it: 'Remember that I prefer TypeScript.'"*) and automatic (daily notes auto-load; a pre-compaction memory-flush turn; dreaming promotion into `MEMORY.md`). Hybrid `memory_search` (vector+keyword). Imports from Claude Code, Codex, Hermes into `memory/imports/<tool>/`.
**Path.** `~/.openclaw/workspace/MEMORY.md`, `memory/`; `memory.search.provider`
**Source.** ✅ `/concepts/memory` · `/concepts/dreaming` · `/install/migrating-claude`

</details>

#### 5b Team Memory
<details>
<summary>◐ Shared sessions + provenance; no governed person-to-person promotion</summary>

**Ships.** Shared sessions on a team gateway visible to all operators; dreaming reconciles across agents sharing a workspace; memory-provenance tracks entry origin per agent/session, with *"promotion markers"* in `MEMORY.md`; admission policy and `memory forget`.
**No governed promotion between people is documented** — *"Promoted memories have no time-based retention bound… neither admission nor forgetting is a general erasure guarantee."*
**Path.** `plugins.entries.memory-core.config.dreaming.*`
**Source.** ✅ `/concepts/memory-provenance` · `/concepts/dreaming` · `/start/teams`

</details>

#### 5c Knowledge
<details>
<summary>● <code>memory-wiki</code> — structured claims with evidence and provenance</summary>

**Ships.** `memory_search`/`memory_get` hybrid retrieval over memory files and transcripts (SQLite vector index). **memory-wiki** plugin — *"compiles durable knowledge into a navigable wiki: deterministic pages, structured claims with evidence, provenance"* — `openclaw wiki init/ingest/compile/lint/search`, an Obsidian-compatible vault, registered as *"a non-exclusive memory corpus supplement."*
**Path.** `openclaw memory search`; `openclaw wiki *`; `<vault>/`
**Source.** ✅ `/concepts/memory` · `/plugins/memory-wiki`

</details>

### 6 · Workspaces ⟳

#### 6a Product
<details>
<summary>○ Nothing PRD-shaped; goals and Workboard both disclaim the role</summary>

**Nothing here** — checked `/gateway/configuration`, README, docs index, the examples nav.
**What exists instead.** **Goals** — *"one durable objective attached to the current OpenClaw session"*; *"A goal is not a task queue."* Workboard plugin Kanban cards — *"not a replacement for GitHub Issues, Linear, Jira."* Standing orders in prose.
**Source.** ✅ `/tools/goal` · `/plugins/workboard`

</details>

#### 6b Infrastructure
<details>
<summary>● Sandbox backends, <b>Node</b>, cloud workers, experimental fleet</summary>

**Ships.** Gateway daemon (`openclaw gateway`, `openclaw daemon install` — launchd/systemd/schtasks); sandbox backends `docker`/`podman`/`ssh`/`openshell`; **Nodes** — paired companion devices, including headless nodes hosting MCP servers; **Cloud workers** — *"move a session's coding work onto a throwaway cloud machine"* via Crabbox; install guides for a dozen platforms; multi-tenant `openclaw fleet` (experimental).
**Path.** `agents.defaults.sandbox.*`; `gateway.nodes.*`; `cloudWorkers.*`; `openclaw fleet create`
**Source.** ✅ `/gateway/sandboxing` · `/nodes` · `/gateway/cloud-workers` · `/gateway/multi-tenant-hosting`

</details>

#### 6c Estate
<details>
<summary>◐ Managed worktrees only; no multi-repo model documented</summary>

**Ships.** **Managed worktrees** — *"Run agent tasks in isolated git checkouts with automatic snapshots and cleanup,"* branch `openclaw/<name>`. `cloudWorkers.projectProfiles` per-repo profiles.
**No explicit multi-repository functionality is documented** — the vendor's own line — and no cross-repo impact analysis.
**Path.** `worktreeRoot`
**Source.** ✅ `/concepts/managed-worktrees` · `/gateway/cloud-workers`

</details>

#### 6d Delivery
<details>
<summary>○ No built-in pipeline; <code>pull-request-review-flow</code> is OpenClaw's own repo</summary>

**Nothing here** as a built-in PR/CI/deploy pipeline for user work — checked `/web/control-ui`, `docs.json` nav.
**What exists instead.** Session rails surface "pull requests" in Control UI chat; git co-author credit on team gateways; `gh-issues`/`github` bundled skills; worktrees block cleanup on unpushed commits. The `pull-request-review-flow`/`ci` docs describe OpenClaw's *own* repo automation, not a user feature.
**Source.** ✅ `/web/control-ui` · `/reference/pull-request-review-flow` · `VISION.md`

</details>

### 7 · Workflow Tasks

#### 7a Workflow Tasks
<details>
<summary>◐ Six task-shaped objects, vendor concedes the overlap itself</summary>

**Ships.** **Background tasks** — an activity ledger of detached work (`queued→running→ succeeded/failed/timed_out/cancelled/lost`, 7-day retention). **Task Flow** — *"durable record of multi-step work with its own status, JSON state, revision counter."* **Goals** (session-scoped).
**Standing orders** and **standing intents** (event-conditioned, 24h cooldown, 3-fire cap).
**Workboard** Kanban. No plan/todo primitive for the model beyond goals.
**Path.** `~/.openclaw/state/openclaw.sqlite` `task_runs`, `flow_runs`; `openclaw tasks *`
**Source.** ✅ `/automation/tasks` · `/automation/taskflow` · `/tools/goal` · `/plugins/workboard`

</details>

### 8 · Trust

#### 8a Evals
<details>
<summary>◐ Personal-agent benchmark pack; dev-facing, not a ship gate</summary>

**Ships.** Project CI (`pnpm test` Vitest 13 shards, e2e Playwright, `test:live`). **Personal agent benchmark pack** — *"a small repo-backed QA scenario pack for local personal assistant workflows… not a generic model benchmark"* — scenarios cover reminder routing, memory recall, secret redaction, approval denial. `skill_proposal_evaluate` hook gates Skill Workshop drafts pass/revise/block.
**Not a ship gate for user work** — dev-facing only.
**Path.** `qa/scenarios/personal/*.yaml`
**Source.** ✅ `/help/testing` · `/concepts/personal-agent-benchmark-pack` · `/maturity/scorecard`

</details>

#### 8b Evidence
<details>
<summary>● (supporting) <b>Audit ledger</b> — metadata-only by construction</summary>

**Ships.** Transcripts (SQLite + archived JSONL, forkable; redaction always on). **Audit ledger** — *"bounded, metadata-only… in the shared OpenClaw state database"* recording `agent.run.*`/ `tool.action.*` events — *"never stores prompts, message bodies, tool arguments, tool results"*; 30-day/100k-row cap; needs `operator.read`. Task ledger with a `lost` state.
**Path.** `state/openclaw.sqlite` `audit_events`; `openclaw audit`
**Source.** ✅ `/gateway/audit` · `/concepts/session` · `/automation/tasks`

</details>

#### 8c Observability
<details>
<summary>● OTel spans + Prometheus; no telemetry unless opted in</summary>

**Ships.** Structured logs with `traceId`/`spanId`/`parentSpanId`; **OpenTelemetry** plugin (`diagnostics-otel`) — traces/metrics/logs, spans `openclaw.model.call`, `openclaw.tool.execution`, `openclaw.exec` — *"Raw model/tool content is not exported by default."* `diagnostics-prometheus` plugin; a Debug/Logs tab. No usage analytics unless the operator opts in.
**Path.** `diagnostics.otel.*`; `logging.*`
**Source.** ✅ `/logging` · `/gateway/opentelemetry` · `/gateway/telemetry`

</details>

#### 8d Efficiency
<details>
<summary>● Compaction + cache-TTL + per-goal budget; no spend cap</summary>

**Ships.** Compaction (`safeguard`/`default` modes, `keepRecentTokens=20000`, memory-flush before compacting); cost accounting from per-provider pricing, `/status`, `/usage`, `/context`, a Usage tab; prompt caching with cache-TTL pruning; context-window caps; loop detection. Goals expose *"token usage, and token budget."*
**No hard spend budget or kill-switch is documented anywhere.**
**Path.** `agents.defaults.compaction.*`; `agents.entries.*.params.cacheRetention`
**Source.** ✅ `/concepts/compaction` · `/reference/token-use` · `/gateway/config-agents`

</details>

### 9 · IMPROVE

#### 9a Learning
<details>
<summary>● Self-learning + Skill Workshop review gate + dreaming promotion</summary>

**Ships.** **Self-learning** — *"turns corrections and successful work into reusable skills. Skills are the durable unit"* — via Experience Review (auto after ≥10 model iterations) and Immediate Repair.
**Skill Workshop** governs proposals (`autonomous.mode="auto"`, `maxPending` 50, a review-gate hook).
**Dreaming** — background memory consolidation in three phases, promoting into `MEMORY.md` and a `DREAMS.md` diary, nightly cron.
**Path.** `skills.workshop.*`; `plugins.entries.memory-core.config.dreaming.*`
**Source.** ✅ `/tools/self-learning` · `/concepts/dreaming`

</details>

#### 9b Rituals
<details>
<summary>◐ Bootstrap ritual + heartbeat + Custodian playbook; no human rituals</summary>

**Ships.** A *"bootstrap ritual"* (`BOOTSTRAP.md`, one-time first-run); heartbeat check-ins; nightly dreaming sweep; Skill Workshop review queue; Custodian playbook (Gather→Mutate→Repair→Prove→Report).
**No named human rituals** (standup/retro/planning) for users were found.
**Path.** `BOOTSTRAP.md`; `agents.defaults.heartbeat`
**Source.** ✅ `/concepts/agent-workspace` · `/gateway/heartbeat` · `/tools/custodian-skills`

</details>

#### 9c Cadence
<details>
<summary>● <b>Automation (cron) / Heartbeat</b> inside the Gateway process</summary>

**Ships.** **Automations/cron** running inside the Gateway process — `at`/`every`/`cron`/`on-exit`/ `stream` schedules, delivery `announce`/`webhook`/`none`, SQLite-persisted. **Heartbeat** — *"a system-owned automation that runs periodic agent turns in the main session"* (default every 30m, active-hours gated). Webhook ingress; standing intents (event-triggered).
**Path.** `cron.*`; `agents.defaults.heartbeat.*`
**Source.** ✅ `/automation/cron-jobs` · `/gateway/heartbeat`

</details>

#### 9d Anti-fragile Lifecycle
<details>
<summary>◐ Restart recovery + failover + <code>doctor --fix</code>; no defect ledger</summary>

**Ships.** Restart recovery — *"work that was interrupted mid-turn is detected and resumed automatically,"* a durable three-attempt dispatch budget, tombstoning; model failover plus auth-profile rotation; retries (3 attempts, jittered); a durable outbound queue; tasks marked `lost` after a grace period; `openclaw doctor --fix` migrations; `openclaw backup create/verify/restore`.
**No defect ledger** — recovery is runtime resilience, not a closed improvement loop.
**Path.** `openclaw doctor`; `openclaw backup`
**Source.** ✅ `/gateway/restart-recovery` · `/concepts/retry` · `/gateway/doctor`

</details>

#### 9e Raise the Floor
<details>
<summary>◐ <code>onboard</code>, <code>doctor --fix</code>, security-audit <code>--fix</code>; templates for every file</summary>

**Ships.** `openclaw onboard`/`setup` wizards (including `--import-from claude`); `openclaw doctor` — *"the repair and migration tool… fixes stale config/state, checks health, provides actionable repair steps"*; safe defaults if config is missing; templates for every workspace file; `openclaw security audit --fix`; an "Ask OpenClaw" setup-and-repair agent in Control UI; Custodian agent.
**Path.** `openclaw doctor`; `openclaw security audit`
**Source.** ✅ `/gateway/doctor` · `/gateway/security` · `/web/control-ui`

</details>

#### 9f Diagnose the Bottleneck
<details>
<summary>◐ Maturity scorecard — for itself, not a user's deployment</summary>

**Ships.** **Maturity scorecard** — *"a practical view of what is ready, what is proven, and what still needs work"* over 50 surfaces / 280 capability areas, bands Experimental→Clawesome, taxonomy M0–M5, *"deliberately evidence-led"* from QA IDs. `openclaw security audit` findings with `checkId`s; `openclaw doctor`; `openclaw tasks audit`.
**This scores the product itself** — no team-maturity/readiness scoring for users.
**Path.** `taxonomy.yaml`; `openclaw security audit`
**Source.** ✅ `/maturity/scorecard` · `/maturity/taxonomy` · `/gateway/security`

</details>

### 10 · Teams & Agents

#### 10a Roster
<details>
<summary>● Named <b>Agent</b> identities + Custodian + default persona</summary>

**Ships.** Named agents (`agents.entries.<agentId>.identity {name, theme, emoji, avatar}`); `IDENTITY.md` — *"The agent's name, vibe, and emoji"*; `SOUL.md` persona; `openclaw agents list/add/delete/set-identity`; a system Custodian agent; sub-agent/swarm children; a default "Molty" persona; a Control UI Agents page.
**Path.** `agents.entries.*.identity`; `IDENTITY.md`
**Source.** ✅ `/gateway/config-agents` · `/concepts/agent-workspace` · `/start/lore`

</details>

#### 10b Org
<details>
<summary>● (supporting) <b>Operator roles / scopes</b> + session owner/participant</summary>

**Ships.** Session **creator** (immutable) / **owner** — *"in the style of a GitHub issue assignee"* — / **participants**; operator roles (`gateway.roles.definitions.<role>.{sessions,agents,scopes, sandbox}`); scopes (`operator.read/write/admin/pairing/approvals/questions/talk`); channel owner vs. non-owner senders; escalation rules in standing-orders prose; HITL posture via exec modes. *"Session ownership, visibility, and presence are usability features, not security boundaries"* — the vendor's own bound on the claim.
**Path.** `gateway.roles.definitions.*`; `operator.*` scopes
**Source.** ✅ `/concepts/multi-user` · `/gateway/operator-scopes` · `/automation/standing-orders`

</details>

### 11 · Surfaces

#### 11a Surfaces
<details>
<summary>● CLI/TUI/Control UI/mobile/~30 channels/RPC/HTTP/MCP; no IDE</summary>

**Ships.** CLI, TUI, Control UI (Vite+Lit SPA — Chat, Sessions, Tasks, Automations, Plugins, Skills, Devices, Usage, Debug/Logs, Terminal, Browser panel), WebChat, a macOS menu-bar app, iOS/Android/watchOS apps, ~30 chat channels (WhatsApp, Telegram, Discord, Slack, Signal, iMessage, Teams, Matrix, …), WebSocket RPC, two HTTP APIs (OpenAI-compatible, OpenResponses), MCP server mode, Discord Activities.
**No IDE plugin was found.**
**Path.** `gateway.controlUi.*`; `channels.*`
**Source.** ✅ `/web/control-ui` · `/concepts/architecture` · `docs.json` nav

</details>

## 7. Identity and inclusion test

<details>
<summary>Identity · inclusion test · loop question</summary>

| Field | Value |
|---|---|
| Canonical name | **OpenClaw** — README, package.json `name: "openclaw"` ✅ |
| Prior names / homes | *"It evolved through several names and shells: Warelay -> Clawdbot -> Moltbot -> OpenClaw."* Clawdbot from 2025-11-25; renamed Moltbot 2026-01-27 *"following a trademark request from Anthropic"*; renamed OpenClaw 2026-01-30 ✅ `VISION.md` · `/start/lore` |
| Owner / maintainer | Creator Peter Steinberger (credits page); copyright holder *"OpenClaw Foundation"* (LICENSE); SECURITY.md maintainers include *"engineers and security researchers from organizations such as NVIDIA and Tencent"* ✅ (each fact) / ↪ (creator attribution — lore/credits pages, no GitHub org owner listing fetched) |
| GitHub URL | `github.com/openclaw/openclaw` (default branch `main`) ✅ |
| License | **MIT** (LICENSE, package.json, npm). GitHub API reports `spdx_id: NOASSERTION` — the detector doesn't classify it; the file text is the MIT template ✅ |
| Stars | 388,584 stars, 81,595 forks, 6,072 open issues (2026-09-02) ✅ |
| Language | TypeScript; pnpm monorepo; Node `>=22.22.3<23 \|\| >=24.15.0<25 \|\| >=25.9.0` ✅ |
| Repo created | 2025-11-24T10:16:47Z ✅ |
| First release | npm package created 2026-01-29 (first publish `0.0.1`, then `2026.1.29-beta.1` on 2026-01-30). Oldest git tags `v0.1.0`–`v0.1.3`, `v1.0.4` predate the rename ✅ (npm) / ⚠️ (tag dates) |
| Latest release | **v2026.8.2**, published 2026-09-01T16:00:56Z; 250 versions on npm; a `v2026.9.1-beta.1` tag exists ✅ |
| Install | `curl -fsSL https://openclaw.ai/install.sh \| bash` (macOS/Linux/WSL2); `npm install -g openclaw@latest`; then `openclaw onboard --install-daemon` ✅ |
| Website / docs | `docs.openclaw.ai` ✅ |
| What it says it is, verbatim | *"OpenClaw is an AI assistant that runs on your devices and meets you in the channels you already use."* GitHub description: *"Your own personal AI assistant. Any OS. Any Platform. The lobster way. 🦞"* VISION.md: *"OpenClaw is the AI that actually does things. It runs on your devices, in your channels, with your rules."* ✅ |

**Does state persist across sessions, where, in what format?** **Yes.** Workspace Markdown at `~/.openclaw/workspace/` (`MEMORY.md`, daily `memory/` notes, `USER.md`, `DREAMS.md`) — *"The model only remembers what gets saved to disk; there is no hidden state."* Per-agent session SQLite plus archived JSONL transcripts; a shared `state/openclaw.sqlite` for tasks, flows, audit and cron; a vector memory index. Restart recovery resumes interrupted work automatically. ✅ `/concepts/memory` · `/concepts/session` · `/gateway/restart-recovery`

**Does it serve more than one person?** **Yes, with an explicit trust caveat.** *"One OpenClaw gateway that a whole team uses… roles that bound what each person can do."* Multi-user mode adds session ownership, participant history and presence. Limit: *"not a hostile multi-tenant security boundary for mutually adversarial users sharing one agent or gateway"* — *"one gateway is one trust domain."* True multi-tenancy is *"one complete Gateway instance per tenant"* via the experimental `openclaw fleet`. Default posture: *"a personal assistant for one trusted operator."* ✅ `/start/teams` · `/concepts/multi-user` · `/start/why-openclaw`

**Does it bind mechanically, or only by prose?** **Mechanically, at several layers; the workspace Markdown is prose.** Tool policy, exec approval modes (`deny→full`, `askFallback` deny), and role-required sandboxing — *"failures never degrade to host execution"* — sit outside the prompt. Blocking plugin hooks can cancel a tool call. By contrast, internal hooks *"cannot block, cancel, or modify operations,"* the `AGENTS.md` `## Tools` section *"does not control tool availability; it is only guidance,"* and memory *"does not enforce policy."* ✅ root README · `/gateway/security` · `/plugins/hooks`

**Loop question.** **Runs the loop itself, and hosts other harnesses as pluggable runtimes.** *"The agent loop is the serialized, per-session run that turns a message into actions and a reply"* — executed by the embedded runtime (`runEmbeddedAgent`, package `@openclaw/agent-core`, runtime id `openclaw`). It also hosts Codex (app-server), Copilot, and Claude Code (via the Agent SDK) as agent-runtime plugins, plus eleven-plus ACP harnesses (`claude`, `codex`, `cursor`, `gemini`, `opencode`, …) via `@openclaw/acpx` — *"OpenClaw's sandbox policy does not wrap ACP harness execution."* Adapters travel both ways: `openclaw migrate claude` imports `CLAUDE.md`/`SKILL.md`/`.mcp.json`, explicitly naming what does **not** import (Claude hooks, permissions, `.claude/rules/`, subagents); `openclaw mcp serve` exposes OpenClaw itself to another MCP client. No other system shipping an adapter *for* OpenClaw was found (not searched exhaustively). ✅ `/concepts/agent-loop` · `/concepts/agent-runtimes` · `/tools/acp-agents` · `/install/migrating-claude`

**Altitude.** **Gateway / host.** Runs its own embedded agent loop *and* hosts Codex, Claude Code and eleven-plus ACP harnesses as pluggable runtimes it does not own — both altitudes evidenced above, per skill rule 7.

</details>

## 8. Limits

<details>
<summary>What it does not claim, in the vendor's words</summary>

**From `SECURITY.md`** ✅

> *"OpenClaw is local-first agent infrastructure for trusted operators; it is not designed as a shared multi-tenant boundary between adversarial users on one gateway."* … *"Anyone who can operate an agent can make it do anything that agent can do. Session ownership, visibility, and presence are usability features, not security boundaries."* … *"OpenClaw does not currently run a paid bug bounty program."*

**From `/start/why-openclaw`** ✅

> *"Sandboxing is off by default. Out of the box, OpenClaw is a personal assistant for one trusted operator."* *"One gateway is one trust domain. Roles and session ownership are collaboration guardrails."* *"Promoted memories have no time-based retention bound… neither admission nor forgetting is a general erasure guarantee."* *"Tenancy means one gateway cell per tenant, and fleet is still experimental."*

**From `/gateway/sandboxing`** ✅

> *"This is not a perfect security boundary, but it materially limits filesystem and process access."* *"The Gateway process always stays on the host; only tool execution moves into the sandbox."*

**From `/tools/acp-agents`** ✅

> *"The external harness can read/write according to its own CLI permissions and the selected `cwd`. OpenClaw's sandbox policy does not wrap ACP harness execution."*

**From `/plugins/hooks`** ✅

> Internal hooks: *"Returned values do not block, cancel, or rewrite the operation."* Memory: *"can preserve approval context, but it does not enforce policy."*

**Package/feature disclaimers** ✅

> Fleet: *"experimental: its commands, flags, and container profile can change between releases without a deprecation window."* *"The Fleet operator and the host are trusted by every tenant. Resistance to a compromised host is a non-goal."* Swarm: *"One-shot collector children"* only; *"No saved workflow definitions or graph DSL."* Workboard: *"not a replacement for GitHub Issues, Linear, Jira."* Benchmark pack: *"not a generic model benchmark."*

**From `VISION.md`** ✅

> *"Core stays lean; optional capabilities should usually ship as plugins."* *"OpenClaw runtime code reads the current configuration schema only. We do not keep long-lived aliases or compatibility branches."* *"OpenClaw sends no usage analytics, tracking identifiers, or telemetry attribution to the project unless the operator turned that on themselves."*

</details>

## 9. Sources

<details>
<summary>Primary · secondary · placement · diagrams not redrawn</summary>

**All primary sources accessed 2026-09-02. No source was re-read at the 2026-09-07 restructure.**

**Primary — GitHub API and repo.** `gh api repos/openclaw/openclaw`, `/releases/latest`, `/releases?per_page=100`, `/contents/`, `/contents/docs`, `/contents/docs/maturity`, `/contents/skills`, `/contents/extensions` · `git ls-remote --tags` · `npm view openclaw time/version/license`.

**Primary — files.** `README.md` · `package.json` · `LICENSE` · `VISION.md` · `SECURITY.md` · `AGENTS.md` · `CHANGELOG.md` (grep only) · `docs/docs.json` (590-page nav) · `docs/ci.md`.

**Primary — docs site.** `docs.openclaw.ai` across `/gateway/*`, `/tools/*`, `/automation/*`, `/plugins/*`, `/concepts/*`, `/nodes`, `/channels`, `/clawhub`, `/providers`, `/cli`, `/web/control-ui`, `/start/*`, `/reference/*`, `/help/testing`, `/maturity/*`, `/install/migrating-claude`.

**Secondary (↪).** None read at the 2026-09-02 source read.

**Placement.** Short-profiles row: [`comparisons/systems/90-short-profiles.md`](../comparisons/systems/90-short-profiles.md) §1 · grid columns: [`comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2 and [`comparisons/02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 · index row: [`index.md`](../index.md) · positioning: [`spectrums/positioning.md`](../spectrums/positioning.md).

**Diagrams not redrawn.** **No diagram inventory was taken at the 2026-09-02 read.** Whether OpenClaw's 590-page docs site carries vendor diagrams is unknown and unrecorded — it is a gap in the read, not a finding about the vendor. The diagram pass (W8c) opens the sources and records what it finds.

</details>

## 10. Unverified

<details>
<summary>13 items</summary>

- **First release date** — repo created 2025-11-24; npm package first published 2026-01-29 (`0.0.1`). Earlier tags `v0.1.0`–`v1.0.4` exist but their dates were not fetched, and any earlier npm name (e.g. `clawdbot`) was not checked. ⚠️
- **Exact star count on the HTML repo page** — taken from the GitHub API (388,584), not the rendered page. ✅ API / ⚠️ page.
- **GitHub's license label** shows `NOASSERTION`; the LICENSE file is verbatim MIT with "OpenClaw Foundation" as holder. Whether the Foundation is a legal entity was not checked. ⚠️
- **Peter Steinberger as creator** comes from the credits/lore pages. No GitHub org owner listing was fetched. ↪ / ✅
- **Whether any third-party system ships an adapter *for* OpenClaw** (beyond its own MCP-serve / HTTP APIs) — not searched exhaustively. ⚠️
- **Full plugin SDK register-method list** (`registerTool`, `registerChannel`, …) — only `api.on` and `api.registerHook` were surfaced; `plugins/sdk-*` pages in the nav were not read. ⚠️
- **Bundled plugin count** — the `extensions/` listing returned 162 entries (includes non-plugin files); "~160" is approximate. ✅ count / ⚠️ exact plugin count.
- **Channel count** — a fetch summary said "32+"; the nav has ~30 channel pages. ↪
- **`contextPruning` config keys** — referenced near the compaction area but not confirmed on the pages read. ⚠️
- **`docs/maturity` mapping to repo `taxonomy.yaml`** — the file exists at the repo root; the scorecard page did not name it. ⚠️ (linkage inferred)
- **Fetch summaries were produced by a summarizing model** over the primary pages; quoted phrases are as returned and were not independently re-checked against page HTML. Treat individual wording as ✅-with-that-caveat.

**Added at the 2026-09-07 restructure, and not source questions:** the primitive table carries an ISSUE-007 undercount — the metadata-only audit ledger and operator roles/scopes were load-bearing in §B but never listed in v1's §C — folded into §5/§6 here, but not re-run against rule 4's primitive-vs-supporting test against a live source; and **no diagram inventory exists** for this harness (§2, §3, §9).

</details>


