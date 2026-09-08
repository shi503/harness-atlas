---
title: "Codex CLI — OpenAI's runtime, embedded as often as it is run"
tier: reference
project: harness-atlas
created: "2026-09-03"
updated: "2026-09-07"
status: DRAFT
owner: FeatureLead-Codex (W8b)
source: "github.com/openai/codex @ rust-v0.153.2 (79016fc) · docs/, codex-rs/, developers.openai.com/codex → learn.chatgpt.com/codex · read 2026-09-03"
provenance: OBSERVED
template: "v2 (restructured from v1 read 2026-09-03, no re-read)"
---

# Codex CLI — OpenAI

***A Rust engine and a JSON-RPC wire protocol so that embedding Codex and driving it from a terminal are the same integration — one core session addressable from CLI, IDE, SDK, MCP, or another harness's runtime.***

## 1. At a glance

| | |
|---|---|
| **Altitude** | Runtime — runs the loop itself; embeddable via SDK, app-server, MCP client → [§7](#7-identity-and-inclusion-test) |
| **Primitives** | 8, ⚠️ contestable — AGENTS.md · skill · plugin · subagent · hook · MCP server · permission profile · execpolicy rule → [§5](#5-primitives) |
| **Structured output** | The Thread — persisted, resumable, forkable app-server conversation record → [8b](#8b-evidence) |
| **Binds mechanically?** | Yes — native OS sandbox on every platform, plus a policy DSL over shell calls → [2c](#2c-enforcement) |
| **State persists** | Rollout JSONL + SQLite at `$CODEX_HOME`; git-baselined memory pipeline → [5a](#5a-individual-memory) |
| **Serves** | One operator by default; a named workspace/admin layer serves many → [10b](#10b-org) |
| **Refuses** | No published refusal list — mid-migration on `sandbox_mode` vs. permission profiles instead → [§5](#5-primitives) |
| **Coverage** | ● 14 · ◐ 13 · ○ 6 · n/a 0 → [§4](#4-component-matrix) |
| **Source** | openai/codex @ rust-v0.153.2 (79016fc) · `docs/`, `codex-rs/`, `learn.chatgpt.com` · read 2026-09-03 |
| **Unverified** | 8 items → [§10](#10-unverified) |

### 1a. Positioning stats

`+1 · +2 · +3 · 0 · +2† · +1 · 0` — the seven DX dimensions, in order.

> **⚠️ Drafted 2026-09-07, not yet verified.** Derived from this profile as read 2026-09-03 — no vendor source was opened at scoring time. No person has re-read these seven values yet. [`01-scorecard.md`](../spectrums/01-scorecard.md) §1 R11 says how the banner comes off.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─────●─` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `────●──` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `───●───` | observability, efficiency, routing |

**†** the one **graded** dimension; every other row is a position, not a score. **Neither end is better.** Ten axes sit beneath these seven — `I +1 · II 0 · III +3 · IV +3 · V +1 · VI +1 · VII 0 · VIII +1 · IX +2 · X 0` — and four of them feed no cell above by design.

→ [`spectrums/positioning.md`](../spectrums/positioning.md) · [`positions/codex.yaml`](../spectrums/positions/codex.yaml) · [`01-scorecard.md`](../spectrums/01-scorecard.md) · [`00-README.md`](../spectrums/00-README.md)

*Scored 2026-09-07 against this profile as read 2026-09-03. This table is the **one sanctioned echo** of the scorecard — derived from the same YAML that renders `positioning.md`, so the two match by construction. Re-score in the YAML, never here.*

### 1b. Contents

[§1 At a glance](#1-at-a-glance) · [1a Positioning stats](#1a-positioning-stats) · [§2 System map](#2-system-map) · [§3 Workflows](#3-workflows) · [§4 Component matrix](#4-component-matrix) · [§5 Primitives](#5-primitives) · [§6 Details](#6-details) · [§7 Identity and inclusion test](#7-identity-and-inclusion-test) · [§8 Limits](#8-limits) · [§9 Sources](#9-sources) · [§10 Unverified](#10-unverified)

No deep-read folder exists for Codex CLI.

## 2. System map

Redrawn from `codex-rs/docs/protocol_v1.md`'s own sequence diagram, **"Basic UI Flow"** — *"a single user input, followed by a 2-turn task"* (openai/codex @ rust-v0.153.2, commit `79016fc`; source is a design doc in the tree, not linked from the docs nav). A second diagram in the same file, "Task Interrupt," is listed, not redrawn — [§9](#9-sources).

```mermaid
%% Redrawn in house notation from openai/codex's own sequence diagram, "Basic UI Flow",
%% in codex-rs/docs/protocol_v1.md (openai/codex @ rust-v0.153.2, commit 79016fc).
%% Source is a design doc in the tree, source-only, not linked from the docs nav.
%% Original caption: "A single user input, followed by a 2-turn task." A second diagram,
%% "Task Interrupt", sits beside it in the same file and is listed, not redrawn, in §F.
%% This flowchart compresses the original mermaid sequenceDiagram's UI/Daemon/Model swimlanes
%% into the house loop shape; no node or edge not in the original text is added.
%% Accessed 2026-09-03.
flowchart TD
  cfg(["Op::ConfigureSession"]) --> session["Session<br/><i>current config &amp; state</i>"]
  session -->|"Op::UserTurn"| task["Task<br/><i>runs until no output remains,<br/>Op::Interrupt, or blocked on approval</i>"]
  task --> turn["Turn: prompt + prior output"]
  turn --> model[["Model<br/><i>Responses API</i>"]]
  model -->|"response: exec / patch"| gate{"Event::ExecApprovalRequest<br/><i>sandbox + approval policy</i>"}
  gate -->|"Op::ExecApproval::Allow"| exec["ExecStart → exec / apply_patch → ExecStop"]
  gate -.->|"deny / Op::Interrupt"| interrupted(["Event::Error(interrupted)"])
  exec --> complete["Event::TurnComplete<br/><i>stdout fed to next Turn</i>"]
  complete -->|"more output"| turn
  model -->|"response: message + completed"| agentmsg["Event::AgentMessage"]
  agentmsg --> done(["Event::TurnComplete<br/>Task ends"])
  ui(("UI<br/><i>CLI/TUI · IDE ext · app-server client</i>")) -.->|"drives"| cfg
  ui -.->|"Op::Interrupt"| task
```

**How it thinks about work.** A unit of work is one `Turn` inside a `Task` inside a `Session`, and every one of those objects is addressed the same way whether driven from the terminal or from an embedder — the **app-server**'s JSON-RPC surface names the identical `Thread`/`Turn`/`Item` objects the CLI itself runs on. Nothing proceeds without a gate: a model response that wants to execute or patch raises `Event::ExecApprovalRequest`, checked against the sandbox and approval policy before `ExecStart` runs. Work lands as shell effects and file edits; the receipt is the rollout, which is also what a resumed session, an SDK caller, or an IDE extension reads back.

## 3. Workflows

**Not written at the 2026-09-03 read — pending the diagram pass (W8c).** A recorded gap. Three sequences a workflow pass should draw, each already evidenced in §6 and needing no new source read:

1. **Task Interrupt** — the second sequence diagram in `codex-rs/docs/protocol_v1.md`, inventoried alongside the redrawn one but not drawn this pass ([§9](#9-sources); evidenced at [3a](#3a-control)'s `approval_policy` and [2c](#2c-enforcement)'s exec gate).
2. **Subagent delegation** — a `/agent` spawn, the resulting parent/child thread-spawn edge, and how `agent-graph-store` marks it `Open`/`Closed` ([3c](#3c-composition)).
3. **Memory two-phase consolidation** — Phase 1 leasing a rollout, Phase 2's single-lock consolidation into `MEMORY.md`/`skills/` under a git baseline, and the reset after success ([5a](#5a-individual-memory)).

## 4. Component matrix

`● named primitive · ◐ partial, present-not-first-class · ○ absent (pages named in §6) · n/a does not apply at this altitude`

**Marks copied verbatim from Codex's column in [`04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2; not re-derived at the restructure.**

| # | Component | Mark | Primitive / note |
|---|---|:-:|---|
| **0 · Foundation** | | | |
| [0a](#0a-substrate) | Substrate | ● | OpenAI Responses API wire protocol; 31+ providers via `model_providers`; OAuth/API-key/enterprise-token auth |
| **1 · Environment** | | | |
| [1a](#1a-environment) | Environment | ◐ | Local shell/filesystem under OS sandbox; network proxy; `exec-server` remote mode — no declared inventory |
| **2 · Agent Harness** | | | |
| [2a](#2a-adapters--middleware) | Adapters & Middleware | ● | [**MCP server**](#5-primitives) client + app-server JSON-RPC + SDK; `mcp-server` deprecated |
| [2b](#2b-hooks) | Hooks | ● | [**Hook**](#5-primitives) — 11 named lifecycle events; MCP-tool hooks fail open |
| [2c](#2c-enforcement) | Enforcement | ● | `sandbox_mode` + [**Permission profile**](#5-primitives) coexist; native OS sandbox; [**Execpolicy rule**](#5-primitives) |
| **3 · System Stacks** | | | |
| [3a](#3a-control) | Control | ● | `approval_policy` gates; Collaboration-mode plan/default templates; typed `PlanDelta` stream |
| [3b](#3b-routing) | Routing | ◐ | Subagent model/effort routing only; no general job-to-model resolver |
| [3c](#3c-composition) | Composition | ● | [**Subagent**](#5-primitives) TOML roles; thread-spawn graph persists delegation |
| [3d](#3d-configuration) | Configuration | ● | [**AGENTS.md**](#5-primitives) + config.toml at 5+ scopes; `requirements.toml` floor |
| [3e](#3e-standards) | Standards | ○ | No rules-pack artifact; execpolicy's `justification` field is the nearest |
| **4 · Capabilities** | | | |
| [4a](#4a-capability) | Capability | ● | [**Skill**](#5-primitives) + [**Plugin**](#5-primitives) bundling skills/MCP; ten dogfooded project skills |
| [4b](#4b-capability-permissions) | Capability Permissions | ● | Per-MCP `enabled_tools`; `skills.config`; admin `allowed_permission_profiles` |
| **5 · Context ⟳** | | | |
| [5a](#5a-individual-memory) | Individual Memory | ● | Automatic two-phase memory pipeline; git-baselined `~/.codex/memories/` |
| [5b](#5b-team-memory) | Team Memory | ○ | No shared/team memory object; `AGENTS.md` is shared config, not memory |
| [5c](#5c-knowledge) | Knowledge | ◐ | `web_search` retrieval; SQLite FTS over own rollouts only |
| **6 · Workspaces ⟳** | | | |
| [6a](#6a-product) | Product | ○ | |
| [6b](#6b-infrastructure) | Infrastructure | ● | Per-task cloud container; proxy-gated egress; remote `code-mode`/`exec-server` |
| [6c](#6c-estate) | Estate | ◐ | Git worktrees at the product layer; no cross-repo inventory |
| [6d](#6d-delivery) | Delivery | ◐ | `codex exec` named CI entry; dogfood skills for PR flow, not a shipped primitive |
| **7 · Workflow Tasks** | | | |
| [7a](#7a-workflow-tasks) | Workflow Tasks | ◐ | Cloud-task object at the product layer; no local CLI task primitive |
| **8 · Trust** | | | |
| [8a](#8a-evals) | Evals | ◐ | `guardian-context` review/scoring gate; not a benchmark harness |
| [8b](#8b-evidence) | Evidence | ● | Rollout JSONL+SQLite; `agent-identity` signs per-agent `AgentAssertion` headers |
| [8c](#8c-observability) | Observability | ● | `codex-otel` OTLP traces/logs/metrics; `SessionTelemetry`; `analytics.enabled` |
| [8d](#8d-efficiency) | Efficiency | ◐ | Reasoning-effort/verbosity knobs; token usage per turn; no spend cap |
| **9 · IMPROVE** | | | |
| [9a](#9a-learning) | Learning | ◐ | Memory Phase 2 rewrites `skills/`, no approval gate, no network |
| [9b](#9b-rituals) | Rituals | ○ | Nothing encoded; dogfood review skills are examples, not rituals |
| [9c](#9c-cadence) | Cadence | ○ | No cron/schedule primitive in the CLI |
| [9d](#9d-anti-fragile-lifecycle) | Anti-fragile Lifecycle | ◐ | Leased retry on memory jobs; compaction hooks; resumable `response_id` |
| [9e](#9e-raise-the-floor) | Raise the Floor | ◐ | Managed-config fallback to a compatible value; no `doctor`/init wizard |
| [9f](#9f-diagnose-the-bottleneck) | Diagnose the Bottleneck | ○ | Nothing here; no self-scorecard |
| **10 · Teams & Agents** | | | |
| [10a](#10a-roster) | Roster | ◐ | `agent-roles` + `agent-identity`; three built-in roles — no unified roster doc |
| [10b](#10b-org) | Org | ◐ | `managed_config.toml` over user config; `requirements.toml` pin; roles page unread |
| **11 · Surfaces** | | | |
| [11a](#11a-surfaces) | Surfaces | ● | CLI/TUI, app-server embedding several IDEs, desktop app, Codex Web, SDK, MCP |
| **● 14 · ◐ 13 · ○ 6 · n/a 0** | | | |

## 5. Primitives

| Primitive | Path / key | Project's own definition (verbatim) | Source |
|---|---|---|---|
| AGENTS.md (alias: `AGENTS.override.md`, always wins at its level) | `~/.codex/AGENTS.md`; `AGENTS.md`/`AGENTS.override.md` from git root down to cwd | *"Codex reads `AGENTS.md` files before doing any work. By layering global guidance with project-specific overrides, you can start each task with consistent expectations, no matter which repository you open."* | ✅ `LEARN/codex/agent-configuration/agents-md` |
| Skill | `SKILL.md` + optional `scripts/`, `references/`, `assets/`, `agents/openai.yaml`; five-tier discovery, `.agents/skills` up to bundled | *"Use agent skills to extend ChatGPT and Codex with task-specific capabilities. A skill packages instructions, resources, and optional scripts so either product can follow a workflow reliably."* | ✅ `LEARN/codex/build-skills` |
| Plugin (bundles: skills, MCP server) | `.codex-plugin/plugin.json` | *"A plugin is an installable package that can include skills, an MCP server, or both."* | ✅ `LEARN/codex/build-plugins` |
| Subagent | `~/.codex/agents/*.toml` (personal), `.codex/agents/*.toml` (project); required keys `name`, `description`, `developer_instructions` | *"you can additionally define custom agents with different model configurations and instructions for different tasks"* — distinct from the built-in default, worker and explorer roles | ✅ `LEARN/codex/agent-configuration/subagents` |
| Hook | `hooks.json`, `.codex/hooks.json`, inline `[hooks]` in `config.toml` | *"Hooks are an extensibility framework for Codex... enabling features such as: Send the chat to a custom logging/analytics engine"* | ✅ `LEARN/codex/hooks` |
| MCP server (client-side config) | `[mcp_servers.<name>]` in `config.toml`; `codex mcp add` | a stdio or streamable-HTTP server definition — *"command that starts the server"* / *"Server address"* — that the model can call as a tool | ✅ `LEARN/codex/extend/mcp` |
| Permission profile | `[permissions.<name>]`; selected via `default_permissions`; admin `allowed_permission_profiles` | a named bundle of filesystem/network rules (*"`[permissions.workspace.network]`... Hosts must match the allowlist (unless denied)"*) selected by name rather than a single global mode | ✅ `RS/network-proxy/README.md` |
| Execpolicy rule | `prefix_rule(pattern=[...], decision?, justification?, match?, not_match?)` in a `.rules` file | *"Policy engine and CLI built around `prefix_rule(...)` plus `host_executable(...)`... `decision` defaults to `allow`; valid values: `allow`, `prompt`, `forbidden`."* | ✅ `RS/execpolicy/README.md` |
| (supporting) config.toml / Settings | `~/.codex/config.toml`, `.codex/config.toml`, `/etc/codex/config.toml`, `managed_config.toml`, `requirements.toml` | the layered settings surface every other primitive is configured through; harness-owned per rule 4, not itself authored as the single sanctioned way to express one thing | ✅ `LEARN/docs/config-file/config-reference` |
| (supporting) Rollout (session store) | `$CODEX_HOME` (default `~/.codex`), JSONL + SQLite | *"Rollout persistence and discovery for Codex session files."* | ✅ `RS/rollout/src/lib.rs` |
| (supporting) Memory pipeline | `~/.codex/memories/` (git-baselined) | automatic two-phase consolidation ([5a](#5a-individual-memory)); not user-authored, so not a primitive under rule 4 despite being a first-class shipped capability | ✅ `RS/memories/README.md` |
| (supporting) Thread / Turn / Item | app-server object model | *"Thread: A conversation between a user and the Codex agent... Turn: One turn of the conversation... Item: Represents user inputs and agent outputs as part of the turn"* | ✅ `RS/app-server/README.md` |

**Count:** 8 primitives, 4 supporting. **Verdict:** ⚠️ contestable — one past this corpus's 5–7 healthy band, and not settled: OpenAI publishes no primitive list, so this count is built from eight independently-documented, singly-named authoring surfaces, and a defensible reader could fold it to six (folding Execpolicy rule into Permission profile as one enforcement primitive) or split it to nine (stdio vs. streamable-HTTP MCP servers counted separately). Two pieces of primary evidence say this harness is mid-consolidation rather than finished: `sandbox_mode` and `[permissions.<profile>]` coexist for the same job ([2c](#2c-enforcement)), and `codex mcp-server` is deprecated in favor of the app-server while an in-tree doc for the same interface still calls it "experimental" ([§8](#8-limits)).

There is no published refusal list for this harness.

## 6. Details

`✅ direct · ↪ relayed · ⚠️ unverified`

### 0 · Foundation

#### 0a Substrate
<details>
<summary>● OpenAI Responses API wire protocol; 31+ providers via <code>model_providers</code>; OAuth/API-key/enterprise-token auth</summary>

**Ships.** OpenAI's Responses API is the wire protocol for every provider — three reserved built-in IDs (`openai` default, `ollama`, `lmstudio`) that cannot be overridden, plus `[model_providers.<id>]` for any endpoint that speaks Responses. Default model example in the docs is `gpt-5.6`; per-turn overrides for reasoning effort and verbosity are accepted by the app-server and MCP-server call surfaces. Auth: ChatGPT sign-in (OAuth), API key, or an enterprise access token; a separate `agent-identity` crate signs Ed25519/Curve25519 "AgentAssertion" headers for automated callers.
**Path.** `~/.codex/config.toml` `[model_providers.*]` · `codex login [--with-api-key|--with-access-token]`
**Source.** ✅ `LEARN/docs/config-file/config-advanced` · ✅ `LEARN/codex/auth` · ✅ `RS/agent-identity/src/lib.rs` · ✅ `LEARN/docs/config-file/config-basic`

</details>

### 1 · Environment

#### 1a Environment
<details>
<summary>◐ Local shell/filesystem under OS sandbox; network proxy; <code>exec-server</code> remote mode — no declared inventory</summary>

**Ships.** Local shell and filesystem under the host-OS sandbox backend ([2c](#2c-enforcement)); a local HTTP/SOCKS5 network proxy gates outbound traffic; `codex exec-server` spawns and controls subprocesses over a PTY, with a remote mode that registers against an environment registry over a Noise-relay websocket for containerized callers. No declared systems inventory beyond that.
**Path.** `codex exec-server [--remote URL --environment-id ID]` · `permissions.<profile>.network`
**Source.** ✅ `RS/exec-server/README.md` · ✅ `RS/network-proxy/README.md`

</details>

### 2 · Agent Harness

#### 2a Adapters & Middleware
<details>
<summary>● <b>MCP server</b> client + app-server JSON-RPC + SDK; <code>mcp-server</code> deprecated</summary>

**Ships.** MCP client (stdio and streamable-HTTP servers, `codex mcp add`); the **app-server** — JSON-RPC 2.0 over stdio (default), an experimental/unsupported websocket, or a unix-socket-with-websocket-upgrade, "similar to MCP"; a TypeScript and Python **SDK** over the same interface; connectors/Apps — MCP servers that can return UI components, distributed through a plugin marketplace. `codex mcp-server` (Codex *as* an MCP server) is deprecated in favor of the app-server.
**Path.** `~/.codex/config.toml` `[mcp_servers.*]` · `codex app-server [--listen ...]` · `@openai/codex-sdk`
**Source.** ✅ `LEARN/codex/extend/mcp` · ✅ `RS/app-server/README.md` · ✅ `LEARN/codex/codex-sdk` · ✅ `RS/connectors/src/lib.rs`

</details>

#### 2b Hooks
<details>
<summary>● <b>Hook</b> — 11 named lifecycle events; MCP-tool hooks fail open</summary>

**Ships.** Eleven named lifecycle events — `SessionStart`/`SessionEnd`, `PreToolUse`/`PostToolUse`, `PermissionRequest`, `UserPromptSubmit`, `Stop`/`Interrupt`, `PreCompact`/`PostCompact`, `SubagentStart`/`SubagentStop` — configured in `hooks.json` or an inline `[hooks]` table, matched by regex "matcher groups," discovered from `~/.codex/`, project `.codex/`, and plugin bundles. External processes, any language. Command hooks block via exit code `2` or `{"decision": "block"}`; MCP-tool hooks fail open. Admins can force `allow_managed_hooks_only = true`.
**Path.** `~/.codex/hooks.json`, `.codex/hooks.json`, `[hooks]` in `config.toml`
**Source.** ✅ `LEARN/codex/hooks` · ✅ `REPO/blob/main/docs/config.md`

</details>

#### 2c Enforcement
<details>
<summary>● <code>sandbox_mode</code> + <b>Permission profile</b> coexist; native OS sandbox; <b>Execpolicy rule</b></summary>

**Ships.** `sandbox_mode` (`read-only` / `workspace-write` / `danger-full-access`) enforced by the native OS backend on every platform — macOS Seatbelt, Linux Landlock falling back to a bundled `bwrap`, Windows elevated/restricted-token backends that "fail closed instead of running with weaker enforcement" — **and**, coexisting, a newer named `[permissions.<profile>]` system with admin `allowed_permission_profiles`. `execpolicy`'s `prefix_rule` DSL classifies shell commands independently. `requirements.toml` is the floor neither layer can relax.
**Path.** `sandbox_mode`, `[permissions.<name>]`, `default_permissions` · `execpolicy check --rules <file>`
**Source.** ✅ `RS/core/README.md` · ✅ `RS/execpolicy/README.md` · ✅ `LEARN/codex/sandboxing` · ✅ `LEARN/codex/enterprise/admin-setup`

</details>

### 3 · System Stacks

#### 3a Control
<details>
<summary>● <code>approval_policy</code> gates; Collaboration-mode plan/default templates; typed <code>PlanDelta</code> stream</summary>

**Ships.** `approval_policy` (`untrusted` / `on-request` / `never`) gates each `ExecApprovalRequest`. **Collaboration mode** ships two built-in prompt templates, `plan.md` and `default.md`, and the wire protocol streams a typed `EventMsg::PlanDelta` when the model emits a plan block — a first-class plan mode, not a bolt-on example. `guardian-context`'s synchronous review plus async scoring backs `auto_review.policy`.
**Path.** `approval_policy` · `collaborationMode/list` (app-server) · `auto_review.policy`
**Source.** ✅ `RS/collaboration-mode-templates/src/lib.rs` · ✅ `RS/docs/protocol_v1.md` · ✅ `RS/guardian-context/src/lib.rs` · ↪ `LEARN/docs/config-file/config-reference` (key listed, page not read for behavior)

</details>

#### 3b Routing
<details>
<summary>◐ Subagent model/effort routing only; no general job-to-model resolver</summary>

**Ships.** `agents.default_subagent_model` / `agents.default_subagent_reasoning_effort` route delegated subagent work to a model/effort distinct from the main turn's; per-call overrides (`model`, `sandbox`, `approval-policy`) are also accepted when Codex is driven as an MCP tool. No general "which job goes to which model" router beyond the subagent split was found.
**Path.** `[agents]` in `config.toml`
**Source.** ✅ `LEARN/codex/agent-configuration/subagents`

</details>

#### 3c Composition
<details>
<summary>● <b>Subagent</b> TOML roles; thread-spawn graph persists delegation</summary>

**Ships.** **Subagents**: standalone TOML files at `~/.codex/agents/` (personal) or `.codex/agents/` (project), each requiring `name`, `description`, `developer_instructions`, optionally `model`/`sandbox_mode`/`mcp_servers`/`skills.config`; three built-in roles ship by default — default, worker and explorer. `/agent` switches between active threads. `agent-roles` resolves named role config plus spawn-time nickname candidates; `agent-graph-store` persists the parent/child thread-spawn graph (`Open`/`Closed` edges) so delegation is a queryable structure, not just files on disk.
**Path.** `~/.codex/agents/*.toml`, `.codex/agents/*.toml` · `agents.max_concurrent_threads_per_session`
**Source.** ✅ `LEARN/codex/agent-configuration/subagents` · ✅ `RS/agent-roles/src/agent_role_config.rs` · ✅ `RS/agent-graph-store/src/types.rs`

</details>

#### 3d Configuration
<details>
<summary>● <b>AGENTS.md</b> + config.toml at 5+ scopes; <code>requirements.toml</code> floor</summary>

**Ships.** `AGENTS.md` (alias `AGENTS.override.md`, always wins at its level): global `~/.codex/AGENTS.md`, then every parent directory walking up from cwd, concatenated root→leaf, truncated at `project_doc_max_bytes` (32 KiB default), rebuilt every run. `config.toml` at five-plus scopes: user (`~/.codex/config.toml`), project (`.codex/config.toml`, only once trusted, unable to override machine-local provider/auth/telemetry-routing keys), system (`/etc/codex/config.toml`), `managed_config.toml`, macOS MDM profiles, and `requirements.toml` as the top admin layer local configuration cannot relax.
**Path.** `~/.codex/AGENTS.md`, `AGENTS.override.md` · `~/.codex/config.toml`, `.codex/config.toml`, `/etc/codex/config.toml`, `managed_config.toml`, `requirements.toml`
**Source.** ✅ `LEARN/codex/agent-configuration/agents-md` · ✅ `LEARN/docs/config-file/{config-basic,config-advanced,config-reference}` · ✅ `LEARN/codex/enterprise/managed-configuration`

</details>

#### 3e Standards
<details>
<summary>○ No rules-pack artifact; execpolicy's <code>justification</code> field is the nearest</summary>

**Nothing here** as a "what good looks like" artifact — checked `README.md`, the repo's own `AGENTS.md` (322 lines, a concrete instance, not a standards product), `LEARN/codex/build-skills`, `LEARN/codex/build-plugins`, `LEARN/docs/config-file/config-reference`.
**What exists instead.** `execpolicy`'s optional `justification` field, "surfaced in different contexts (for example, in approval prompts or rejection messages)" — a reason attached to a rule, not a bar a change must clear.
**Source.** ✅ (absence, pages above) · ✅ `RS/execpolicy/README.md`

</details>

### 4 · Capabilities

#### 4a Capability
<details>
<summary>● <b>Skill</b> + <b>Plugin</b> bundling skills/MCP; ten dogfooded project skills</summary>

**Ships.** **Skills**: `SKILL.md` + optional `scripts/`, `references/`, `assets/`, `agents/openai.yaml`, built on the open `agentskills.io` standard, five-tier discovery from repo `.agents/skills` up to bundled system skills. **Plugins**: an installable package that can include skills, an MCP server, or both, manifest `.codex-plugin/plugin.json`, distributed through a marketplace (OpenAI / workspace / personal tabs, GitHub sync). The repo dogfoods ten of its own project skills at `.codex/skills/`.
**Path.** `.agents/skills/`, `~/.agents/skills/`, `/etc/codex/skills` · `.codex-plugin/plugin.json`
**Source.** ✅ `LEARN/codex/build-skills` · ✅ `LEARN/codex/build-plugins` · ✅ `LEARN/codex/plugins` · ✅ `gh api repos/openai/codex/contents/.codex/skills`

</details>

#### 4b Capability Permissions
<details>
<summary>● Per-MCP <code>enabled_tools</code>; <code>skills.config</code>; admin <code>allowed_permission_profiles</code></summary>

**Ships.** Per-MCP-server `enabled_tools`/`disabled_tools`/`default_tools_approval_mode` (`auto`/`prompt`/`writes`/`approve`); `apps.*` config for connector/app tool controls; `skills.config` context-token budgets and per-skill enable/disable; admin-side `allowed_permission_profiles` and per-feature-key gating (`computer_use`, `browser_use`, `browser_use_full_cdp_access`) that can zero out a capability workspace-wide.
**Path.** `[mcp_servers.<name>]` keys · `[apps]` · `[skills.config]` · `allowed_permission_profiles`
**Source.** ✅ `LEARN/codex/extend/mcp` · ✅ `LEARN/docs/config-file/config-reference` · ✅ `LEARN/codex/enterprise/admin-setup`

</details>

### 5 · Context ⟳

#### 5a Individual Memory
<details>
<summary>● Automatic two-phase memory pipeline; git-baselined <code>~/.codex/memories/</code></summary>

**Ships.** An automatic, two-phase pipeline, triggered on a non-ephemeral root session when enabled. **Phase 1** claims eligible rollouts, sends each to a model for a structured `raw_memory`/`rollout_summary`, redacts secrets, stores results with lease/retry backoff so failures don't hot-loop. **Phase 2** (single global lock) consolidates the top-N stage-1 outputs into `~/.codex/memories/{raw_memories.md, rollout_summaries/, MEMORY.md, memory_summary.md, skills/}` under a **git-baselined** directory, via an internal sub-agent that runs with no approvals, no network, local write access only, delegation disabled to prevent recursion, resetting the baseline after it succeeds.
**Path.** `~/.codex/memories/` (git repo) · `codex-memories-read`, `codex-memories-write` crates
**Source.** ✅ `RS/memories/README.md`

</details>

#### 5b Team Memory
<details>
<summary>○ No shared/team memory object; <code>AGENTS.md</code> is shared config, not memory</summary>

**Nothing here** as a shared/team memory object — checked `RS/memories/README.md` (keyed to one machine's state DB, no sync described), `LEARN/codex/enterprise/admin-setup`, `LEARN/codex/enterprise/skills`. Project-scoped `AGENTS.md` and repo-checked-in skills/plugins are shared *configuration*, not memory.
**Source.** ✅ (absence, pages above)

</details>

#### 5c Knowledge
<details>
<summary>◐ <code>web_search</code> retrieval; SQLite FTS over own rollouts only</summary>

**Ships.** `web_search` config (`disabled` / `cached` / `indexed` / `live`) is retrieval, not a curated or cited store; the rollout crate's `search.rs` provides SQLite full-text search over the operator's own past sessions only. No RAG, embeddings or wiki feature found.
**Path.** `web_search` in `config.toml` · `RS/rollout/src/search.rs`
**Source.** ✅ `LEARN/docs/config-file/config-reference` · ✅ `RS/rollout` directory listing

</details>

### 6 · Workspaces ⟳

#### 6a Product
<details>
<summary>○ Nothing here</summary>

**Nothing here** — checked `README.md`, `AGENTS.md`, `LEARN/codex/cli`. No PRD or spec object of any kind; the nearest is a cloud task ([7a](#7a-workflow-tasks)), which is a work unit, not a deliverable boundary.
**Source.** ✅ (absence, pages above)

</details>

#### 6b Infrastructure
<details>
<summary>● Per-task cloud container; proxy-gated egress; remote <code>code-mode</code>/<code>exec-server</code></summary>

**Ships.** A local process by default, under the native sandbox ([2c](#2c-enforcement)). Cloud/Codex-Web environments run each task in a per-task **container**, checked out at a branch or commit SHA from a universal image with pre-installed languages and tools; agent internet access is off by default and all outbound traffic passes an HTTP/HTTPS proxy; container state caches for up to 12 hours. A `code-mode` crate wires a remote gRPC session for out-of-process execution; `exec-server`'s remote mode registers with an environment registry over a Noise-relay websocket.
**Path.** `RS/code-mode/src/lib.rs` · `RS/exec-server/README.md`
**Source.** ✅ `LEARN/codex/environments/cloud-environment` · ✅ `RS/code-mode/src/lib.rs` · ✅ `RS/exec-server/README.md`

</details>

#### 6c Estate
<details>
<summary>◐ Git worktrees at the product layer; no cross-repo inventory</summary>

**Ships.** Git worktrees supported at the product layer (ChatGPT desktop app); the repo's own `.codex/environments/` directory is a worked local example — "the repository, worktree, and commands remain on the computer or remote development environment that contains the project." No cross-repo estate inventory or impact-analysis object was found in the CLI itself.
**Path.** `.codex/environments/`
**Source.** ✅ `LEARN/codex/environments/git-worktrees` · ✅ `gh api repos/openai/codex/contents/.codex`

</details>

#### 6d Delivery
<details>
<summary>◐ <code>codex exec</code> named CI entry; dogfood skills for PR flow, not a shipped primitive</summary>

**Ships.** `codex exec` is named as the non-interactive/CI entry point ("compose with scripts and CI"), though the dedicated exec docs page 404s both in-repo and on the docs site. The repo's own dogfood skills (`codex-pr-body`, `babysit-pr`, four `code-review-*` skills) are worked examples of PR-flow automation built on Skills, not a shipped delivery primitive.
**Path.** `.codex/skills/{codex-pr-body,babysit-pr,code-review*}`
**Source.** ✅ `LEARN/codex/cli` · ✅ `gh api repos/openai/codex/contents/.codex/skills` · ⚠️ `docs/exec.md`, `LEARN/codex/exec` both 404

</details>

### 7 · Workflow Tasks

#### 7a Workflow Tasks
<details>
<summary>◐ Cloud-task object at the product layer; no local CLI task primitive</summary>

**Ships.** A **cloud task** object exists at the product layer (`codex-cloud-tasks` crate: task creation with a diff-review UI). Nothing comparable was found as a local CLI primitive; the plan-mode `PlanDelta` stream is text, not a persisted task object.
**Path.** `RS/cloud-tasks/src/*`
**Source.** ↪ (crate/file listing; contents not read beyond names)

</details>

### 8 · Trust

#### 8a Evals
<details>
<summary>◐ <code>guardian-context</code> review/scoring gate; not a benchmark harness</summary>

**Ships.** `guardian-context`'s "synchronous Guardian review and asynchronous scoring" backs `auto_review.policy`; no public docs page describing its user-facing behavior was found. A review/gate mechanism, not a benchmark harness with baseline/candidate comparisons.
**Path.** `[auto_review]` in `config.toml` · `RS/guardian-context/`
**Source.** ✅ `RS/guardian-context/src/lib.rs` (doc comment) · ⚠️ no user-facing docs page found

</details>

#### 8b Evidence
<details>
<summary>● Rollout JSONL+SQLite; <code>agent-identity</code> signs per-agent <code>AgentAssertion</code> headers</summary>

**Ships.** The rollout (JSONL + SQLite state DB) is the receipt, keyed by `ThreadId`/`RolloutId`, with compaction, search and a `ThreadStore` write boundary separating raw history appends from metadata mutation. `agent-identity` additionally signs Ed25519/Curve25519 "AgentAssertion" headers when a containerized caller registers an agent task.
**Path.** `RS/rollout/`, `RS/thread-store/README.md`, `RS/agent-identity/src/lib.rs`
**Source.** ✅ (all three, direct file reads)

</details>

#### 8c Observability
<details>
<summary>● <code>codex-otel</code> OTLP traces/logs/metrics; <code>SessionTelemetry</code>; <code>analytics.enabled</code></summary>

**Ships.** `codex-otel`: OTLP HTTP/gRPC trace, log and metric exporters, an in-memory exporter for tests, a `SessionTelemetry` API for session-scoped business event emission, W3C tracestate propagation, and a `Statsig` exporter shorthand. `analytics.enabled` is a separate opt-in config key. App-server tracing can emit JSON to stderr via `LOG_FORMAT=json`.
**Path.** `RS/otel/README.md` · `analytics.enabled`
**Source.** ✅ `RS/otel/README.md` · ✅ `RS/app-server/README.md`

</details>

#### 8d Efficiency
<details>
<summary>◐ Reasoning-effort/verbosity knobs; token usage per turn; no spend cap</summary>

**Ships.** `model_reasoning_effort` / `model_verbosity` are the only cost/quality knobs found; `Event::TurnComplete` carries token usage per turn. No spend cap or dollar-denominated budget was found.
**Path.** `model_reasoning_effort`, `model_verbosity`
**Source.** ✅ `RS/docs/protocol_v1.md` · ✅ `LEARN/docs/config-file/config-reference`

</details>

### 9 · IMPROVE

#### 9a Learning
<details>
<summary>◐ Memory Phase 2 rewrites <code>skills/</code>, no approval gate, no network</summary>

**Ships.** The memory Phase 2 agent is explicitly allowed to update `MEMORY.md`, `memory_summary.md` and `skills/` as part of consolidation, running with no approvals, no network, local write access only — an autonomous write to the user's own skill directory with no stated human review step.
**Path.** `RS/memories/README.md` §Phase 2
**Source.** ✅ (direct read; the absence of a review-gate mention is a checked absence)

</details>

#### 9b Rituals
<details>
<summary>○ Nothing encoded; dogfood review skills are examples, not rituals</summary>

**Nothing here** — checked the hooks event list (no review/retro event), `LEARN/codex/build-skills`, `AGENTS.md`. The repo's own dogfood skills (`code-review-*`, `babysit-pr`) are the nearest thing — a ritual encoded as a skill an operator chooses to run, not a harness-level object.
**Source.** ✅ (absence, pages above)

</details>

#### 9c Cadence
<details>
<summary>○ No cron/schedule primitive in the CLI</summary>

**Nothing here** in the CLI itself — checked the hooks event list, the full config-reference key list, the subagent docs. No cron/schedule primitive found; whether Codex Web's cloud tasks support scheduling was not confirmed this pass.
**Source.** ⚠️ (absence checked in the CLI; cloud-product scheduling unconfirmed)

</details>

#### 9d Anti-fragile Lifecycle
<details>
<summary>◐ Leased retry on memory jobs; compaction hooks; resumable <code>response_id</code></summary>

**Ships.** No single named "lifecycle" object, but real recovery machinery: memory Phase-1 jobs are leased/claimed with retry backoff instead of hot-looping; `PreCompact`/`PostCompact` hooks bracket rollout compaction; a `Turn`'s `response_id` bookmark lets a task resume after `Op::Interrupt`; `exec-server`'s forward mode lets a reconnect flow resume a retained destination session.
**Path.** `RS/memories/README.md` · `RS/rollout/src/compression.rs` · `RS/docs/protocol_v1.md` · `RS/exec-server/README.md`
**Source.** ✅ (all four, direct reads)

</details>

#### 9e Raise the Floor
<details>
<summary>◐ Managed-config fallback to a compatible value; no <code>doctor</code>/init wizard</summary>

**Ships.** The managed-config layer falls back to "a compatible value" rather than erroring when a value conflicts with an enforced rule — the nearest vendor-side floor-raising mechanism found. No `codex doctor` or onboarding-wizard command was found in the surfaces read.
**Path.** `requirements.toml` conflict resolution
**Source.** ✅ `LEARN/codex/enterprise/managed-configuration` (checked `LEARN/codex/cli`, install docs — no doctor-equivalent found)

</details>

#### 9f Diagnose the Bottleneck
<details>
<summary>○ Nothing here; no self-scorecard</summary>

**Nothing here** — checked `RS/otel/README.md`, `LEARN/codex/enterprise/admin-setup`, `LEARN/codex/cli`. No self-scorecard or maturity/readiness object of any kind.
**Source.** ✅ (absence, pages above)

</details>

### 10 · Teams & Agents

#### 10a Roster
<details>
<summary>◐ <code>agent-roles</code> + <code>agent-identity</code>; three built-in roles — no unified roster doc</summary>

**Ships.** `agent-roles` resolves named role configuration (description, nickname candidates) for spawned subagents; three built-in roles ship — default, worker and explorer; `agent-identity` gives each spawned agent a signed, verifiable identity. No single user-facing "roster" doc page describes the two together as one object.
**Path.** `RS/agent-roles/`, `RS/agent-identity/`
**Source.** ✅ (both crates, direct reads); ⚠️ no roster-framed docs page found

</details>

#### 10b Org
<details>
<summary>◐ <code>managed_config.toml</code> over user config; <code>requirements.toml</code> pin; roles page unread</summary>

**Ships.** A "Roles and workspace permissions" page is referenced but was not itself read this pass. What was read: `managed_config.toml` (fleet) sits over user `config.toml`, with `requirements.toml` pins neither can override.
**Path.** `requirements.toml`, `managed_config.toml`
**Source.** ✅ `LEARN/codex/enterprise/admin-setup`, `LEARN/codex/enterprise/managed-configuration` · ⚠️ roles-and-workspace-permissions page not read

</details>

### 11 · Surfaces

#### 11a Surfaces
<details>
<summary>● CLI/TUI, app-server embedding several IDEs, desktop app, Codex Web, SDK, MCP</summary>

**Ships.** CLI/TUI (terminal); an **app-server** for arbitrary product embedding — the VS Code extension is the vendor's own worked example, with Cursor and Windsurf via the same extension, Xcode a native integration, and JetBrains its own AI Assistant integration; the ChatGPT desktop app's integrated terminal (scoped to its current project or worktree) and local environments; **Codex Web** at `chatgpt.com/codex`; a TypeScript/Python SDK; MCP (client always, server deprecated). One of the widest surface counts read in this corpus.
**Path.** (see per-surface sources)
**Source.** ✅ `LEARN/codex/ide` · ✅ `LEARN/codex/integrated-terminal` · ✅ `LEARN/codex/environments/local-environment` · ✅ `REPO/blob/main/README.md`

</details>

## 7. Identity and inclusion test

<details>
<summary>Identity · inclusion test · loop question</summary>

| Field | Value |
|---|---|
| Canonical name | **Codex CLI** — binary `codex`; npm package `@openai/codex`; Rust workspace `codex-rs` ✅ |
| Prior names / homes | Same repo since creation, no redirect. "Codex" now names three OpenAI products sharing only the word: this CLI/runtime, **Codex Web** (the hosted cloud agent at `chatgpt.com/codex`), and OpenAI's 2021 code-completion model (unrelated, retired API). Every claim in this profile is about the CLI/runtime only. The CLI itself was rewritten: it launched as a TypeScript tool; `codex-cli/` is now only an npm launcher (`bin/codex.js`) for a prebuilt Rust binary ✅ |
| Owner / maintainer | OpenAI ✅ `gh api repos/openai/codex` |
| GitHub URL | https://github.com/openai/codex ✅ |
| License | Apache-2.0 ✅ `gh api repos/openai/codex`; `REPO/blob/main/LICENSE` |
| Stars | 121,310 stars, 18,591 forks (2026-09-03) ✅ `gh api repos/openai/codex` |
| Language | Rust (`codex-rs/`, Bazel + Cargo) ✅ |
| Repo created | 2025-04-13; first commit 2025-04-16 ("Initial commit") ✅ |
| First release | npm `0.1.2504161551`, published 2025-04-16 (same day as the initial commit) ✅ |
| Latest release | **`rust-v0.153.2`**, 2026-09-03 (npm `dist-tags.latest` matches) ✅ |
| Install | `curl -fsSL https://chatgpt.com/codex/install.sh \| sh` (Mac/Linux) or the PowerShell equivalent; `npm install -g @openai/codex`; `brew install --cask codex` ✅ |
| Website / docs | `developers.openai.com/codex` (308-redirects to `learn.chatgpt.com/docs`); product page `openai.com/codex/`; Codex Web at `chatgpt.com/codex` ✅ |
| What it says it is, verbatim | *"Codex CLI is a coding agent from OpenAI that runs locally on your computer."* ✅ `REPO/blob/main/README.md` |

**Does state persist across sessions, where, in what format?** **Yes, on multiple tracks.** Every conversation is a **rollout** — JSONL history plus SQLite-backed metadata/search under `$CODEX_HOME` (default `~/.codex`), exposed through a `ThreadStore` trait. `AGENTS.md`/`AGENTS.override.md` and `config.toml` persist instructions and settings at global, project, system and managed scopes. A two-phase memory pipeline turns old rollouts into `~/.codex/memories/` under a git-baselined directory. Agent-to-agent structure persists too: `agent-graph-store` tracks parent/child thread-spawn edges across subagent delegation. ✅ `RS/rollout/src/lib.rs`, `RS/thread-store/README.md`, `RS/memories/README.md`, `RS/agent-graph-store/src/types.rs`

**Does it serve more than one person? — Answered per layer.** **Local CLI, one operator.** Nothing in the CLI itself models a second user; sandboxing and approval apply to the local account that started `codex`. **ChatGPT Business/Enterprise/Edu workspace layer, yes.** Admins push `requirements.toml` and a `managed_config.toml` through a supported channel; named permission profiles are allowlisted per workspace (`allowed_permission_profiles`); feature keys (`computer_use`, `browser_use`, `browser_use_full_cdp_access`) can be disabled org-wide. ✅ `LEARN/codex/cli`, `LEARN/codex/sandboxing`, `LEARN/codex/enterprise/admin-setup`

**Does it bind mechanically, or only by prose?** **Mechanically, and natively** — Codex drives the operating system's own sandbox on every platform rather than an in-process approximation: macOS Seatbelt; Linux Landlock falling back to bubblewrap; Windows an elevated and an unelevated backend, each enforcing a defined subset of policies and failing closed rather than weakening enforcement. A separate local network proxy enforces per-domain allow/deny lists. `execpolicy` classifies shell invocations before they run — "still in preview." `requirements.toml` is the hard floor: "local configuration cannot relax" it. ✅ `RS/core/README.md`, `RS/network-proxy/README.md`, `RS/execpolicy/README.md`, `LEARN/docs/config-file/config-reference`

**Loop question.** **Runs the loop itself.** Codex runs one prepared model loop — `Codex`/`Session`/`Task`/`Turn`, talking to the OpenAI Responses API over a Submission-Queue/Event-Queue pair. What it exposes for others to embed is the **app-server** — JSON-RPC 2.0 over stdio, an experimental websocket, or a unix-socket-with-websocket-upgrade — naming three core primitives, Thread/Turn/Item; a TypeScript and Python SDK wrap the same interface. What it reads from others, one-way: `external-agent-migration` imports Claude Code and Cursor hooks, MCP config, memory files, subagents and model settings into Codex's own shapes; no adapter runs the reverse direction, and Codex ships no ACP implementation — checked the `codex-rs` crate list, no `acp` crate exists. Per this corpus's own prior read, other systems have named Codex's app-server as an embeddable runtime option ◐ (relayed, not re-verified against their own source this pass). Codex does not host other harnesses' loops itself. ✅ `RS/docs/protocol_v1.md`, `RS/app-server/README.md`, `LEARN/codex/codex-sdk`, `RS/external-agent-migration/src/lib.rs`

**Altitude.** **Runtime.** One prepared model loop, exposed identically to every embedder through the app-server.

</details>

## 8. Limits

<details>
<summary>What it does not claim, in the vendor's words</summary>

**From `LEARN/codex/mcp-server`** ✅ — *"`codex mcp-server` is deprecated. Use the Codex app server instead."*

**From `codex-rs/docs/codex_mcp_interface.md`** ✅ (direct file read — the same interface, a different document, dated differently) — *"This document describes Codex's experimental MCP server interface... Status: experimental and subject to change without notice."*

**From `RS/app-server/README.md`** ✅ — *"Websocket transport is currently experimental and unsupported. Do not rely on it for production workloads."*

**From `LEARN/codex/sandboxing`** ✅ — *"read-only: The agent can inspect files, but it can't edit files or run commands without approval."* *"workspace-write: The agent can read files, edit within the workspace, and run routine local commands inside that boundary."* *"danger-full-access: The agent runs without sandbox restrictions. This removes the filesystem and network boundaries and should be used only when you want the agent to act with full access."*

**From `LEARN/codex/enterprise/admin-setup`** ✅ — *"Repository configuration can supply defaults and reusable workflows. It can't grant workspace, model, Platform API, or connected-system access."*

**From `LEARN/codex/hooks`** ✅ — *"Non-managed hooks must be reviewed and trusted before they run."* *"Errors, missing servers, and unavailable tools don't block the operation."* (MCP-tool hooks fail open)

**From `LEARN/codex/environments/local-environment`** ✅ — *"Local environments are available only in Codex in the ChatGPT desktop app."*

**From `RS/execpolicy/README.md`** ✅ — *"Note: `execpolicy` commands are still in preview. The API may have breaking changes in the future."*

**From `RS/memories/README.md`** ✅ (a limitation by omission, not a quoted disclaimer) — the Phase 2 consolidation agent runs "with no approvals, no network, and local write access only," which constrains the agent's own actions but does not bound what the pipeline is allowed to change (`MEMORY.md`, `memory_summary.md`, `skills/`).

</details>

## 9. Sources

<details>
<summary>Primary · secondary · placement · diagrams not redrawn</summary>

**All primary sources accessed 2026-09-03. No source was re-read at the 2026-09-07 restructure.**

**Primary — GitHub API / repo.** `gh api repos/openai/codex` (metadata) · `gh api .../releases` and tags (paged to the last page) · `gh api .../commits` (paged to the last page, first commit `59a180d`) · `gh api .../contents/{README.md,AGENTS.md,LICENSE,docs,codex-rs,codex-cli,sdk,.codex,.codex/skills}`.

**Primary — files.** `REPO/blob/main/{README,AGENTS}.md`, `LICENSE`, `codex-cli/package.json` · `REPO/blob/main/docs/{agents_md,authentication,config,sandbox}.md` (stub redirects) · `RS/docs/protocol_v1.md`, `RS/docs/codex_mcp_interface.md` · `RS/{execpolicy,memories,otel,core,thread-store,thread-manager-sample,network-proxy,exec-server,app-server}/README.md` · `RS/external-agent-migration/src/lib.rs` · `RS/{agent-roles/src/agent_role_config.rs, agent-identity/src/lib.rs, code-mode/src/lib.rs, guardian-context/src/lib.rs, connectors/src/lib.rs, collaboration-mode-templates/src/lib.rs, agent-graph-store/src/types.rs, rollout/src/lib.rs, rollout/src/rollout_file_name.rs, rollout/src/config.rs}` · `https://registry.npmjs.org/@openai/codex`.

**Primary — vendor docs (via WebFetch, directed at the vendor's own URL).** `LEARN/codex/{cli,security-administration,sandboxing,hooks,app-server,mcp-server,auth,codex-sdk,ide,integrated-terminal,plugins}` · `LEARN/codex/agent-configuration/{agents-md,subagents}` · `LEARN/codex/{build-skills,build-plugins,extend/mcp}` · `LEARN/codex/environments/{local-environment,cloud-environment,git-worktrees}` · `LEARN/codex/enterprise/{admin-setup,managed-configuration,skills}` · `LEARN/docs/config-file/{config-basic,config-advanced,config-reference}` · `https://developers.openai.com/codex` (308 redirect, observed directly).

**Secondary (↪), used only for orientation.** WebSearch snippets confirming which docs URLs to fetch directly; migration-tooling commentary (the migration mechanism claims rest on `RS/external-agent-migration/src/lib.rs`, read directly); a search-surfaced architecture-overview page, not opened.

**Placement.** Short-profiles row: [`comparisons/systems/90-short-profiles.md`](../comparisons/systems/90-short-profiles.md) §1 · grid columns: [`comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2 and [`comparisons/02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 · index row: [`index.md`](../index.md).

**Diagrams not redrawn.** **"Task Interrupt"** — the second sequence diagram in `codex-rs/docs/protocol_v1.md`, the same file as the redrawn "Basic UI Flow" — listed, not drawn, per the rule for multiple diagrams in one document. The diagram pass (W8c) draws it.

</details>

## 10. Unverified

<details>
<summary>8 items</summary>

- **The exact rollout/session directory name under `$CODEX_HOME`.** `RS/rollout/src/config.rs` confirms `codex_home` as the root and `RS/rollout/src/rollout_file_name.rs` confirms the filename shape, but no file read states the subdirectory literally. ⚠️
- **"Roles and workspace permissions"** (referenced from `LEARN/codex/enterprise/skills`) was not itself fetched — [10b](#10b-org)'s org answer rests on the admin-setup and managed-configuration pages only. ◐
- **`docs/exec.md` / `codex exec`'s full flag surface** — both the in-repo stub and `LEARN/codex/exec` returned 404 this pass; [6d](#6d-delivery)'s CI-entrypoint claim rests on one line from `LEARN/codex/cli`'s overview, not a dedicated page. ⚠️
- **`docs/slash_commands.md`** similarly 404s in-repo and at `LEARN/codex/slash-commands`; the built-in slash-command list beyond `/agent` was not enumerated. ⚠️
- **Whether Codex Web's cloud tasks support scheduled/cron execution** ([9c](#9c-cadence)) — the `cloud-tasks` crate's file names were read as a listing only; contents were not opened. ⚠️
- **Whether other systems in fact embed the Codex app-server as described** ([§7](#7-identity-and-inclusion-test) loop question) — reused from this corpus's own prior read rather than re-verified against their source this pass. ◐
- **`guardian-context`'s user-facing behavior** ([8a](#8a-evals)) — the crate's doc comment confirms the mechanism and `auto_review.policy` is a real config key, but no docs page describing what a user sees when Guardian review fires was found. ◐
- **WebFetch-mediated quotes carry residual paraphrase risk.** Every `LEARN/*` citation was read by directing a fetch at the vendor's own URL and receiving back a processed summary, not raw HTML viewed directly; material in quotation marks was returned already quoted by that process, but wording drift from a direct-HTML read cannot be ruled out. Marked ✅ throughout per this repo's existing convention, flagged here rather than silently assumed exact.

**Added at the 2026-09-07 restructure, and not a source question:** §3 Workflows was not drawn at the 2026-09-03 read, and the second protocol diagram ("Task Interrupt") was inventoried but not redrawn — see §3 and §9.

</details>
