---
title: "Hermes Agent — the personal harness whose headline feature is learning"
tier: reference
project: harness-atlas
created: "2026-09-02"
updated: "2026-09-07"
status: DRAFT
owner: KD
source: "github.com/NousResearch/hermes-agent @ v0.21.0 (tag v2026.8.31) · docs at hermes-agent.nousresearch.com · read 2026-09-02"
provenance: OBSERVED
template: "v2 (restructured from v1 read 2026-09-02, no re-read)"
verification:
  derived_from:
    - "github.com/NousResearch/hermes-agent @ v0.21.0 (tag v2026.8.31) · docs at hermes-agent.nousresearch.com · read 2026-09-02"
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

# Hermes Agent — Nous Research

***A Python personal-agent harness whose defining move is authoring its own skills from what it did — memory under hard character caps, a Curator that ages capabilities out — while binding mechanically through deny globs, a hardline blocklist and fail-closed hooks it explicitly refuses to call a security boundary.***

> **Profile drafted 2026-09-02 by `claude-opus-5`, not yet verified.** Attested, not captured — see `verification:` above.

## 1. At a glance

| | |
|---|---|
| **Altitude** | Runtime — runs its own loop (`AIAgent`, ~12k LOC); also hosts the Codex app-server for `openai/*` turns → [§7](#7-identity-and-inclusion-test) |
| **Primitives** | 9, ⚠️ contestable — profile · SOUL.md · skill · memory · plugin · hook · cron job · context file · kanban task → [§5](#5-primitives) |
| **Structured output** | ⚠️ not stated at the v1 read — kanban ("owns lifecycle truth") and the skill/memory loop are candidates → [7a](#7a-workflow-tasks) |
| **Binds mechanically?** | Yes — deny globs, a hardline blocklist YOLO cannot bypass, fail-closed hooks; vendor: *"nothing… constitutes containment"* → [2c](#2c-enforcement) |
| **State persists** | `~/.hermes/memories/{MEMORY,USER}.md` (hard char caps) + `state.db` SQLite/FTS5, per profile → [5a](#5a-individual-memory) |
| **Serves** | Single-tenant by declaration; Admin/Regular tiers + managed scope; no tenant object → [10b](#10b-org) |
| **Refuses** | No published refusal list found at the v1 read → [§5](#5-primitives) |
| **Coverage** | ● 20 · ◐ 10 · ○ 3 · n/a 0 → [§4](#4-component-matrix) |
| **Source** | NousResearch/hermes-agent @ v0.21.0 (v2026.8.31) · `hermes-agent.nousresearch.com/docs` · read 2026-09-02 |
| **Unverified** | 9 items → [§10](#10-unverified) |

### 1a. Positioning stats

`0 · +2 · +3 · 0 · +2† · +3 · +2` — the seven DX dimensions, in order.

> **⚠️ Drafted 2026-09-07, not yet verified.** Derived from Hermes's own README, docs and SECURITY.md
> as carried into this profile — no source was opened at scoring time. Grounded against §4, §5 and §7
> below. No person has re-read these seven values yet. [`01-scorecard.md`](../spectrums/01-scorecard.md)
> §1 R11 says how the banner comes off.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `───●───` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─────●─` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Context | nothing survives | `───●───` | shared, durable, retrievable |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `─────●─` | observability, efficiency, routing |

**†** the one **graded** dimension; every other row is a position, not a score. **Neither end is better.** Ten axes sit beneath these seven — `I 0 · II +1 · III +3 · IV +3 · V +3 · VI +1 · VII 0 · VIII +1 · IX +3 · X +1` — and four of them feed no cell above by design.

→ [`spectrums/positioning.md`](../spectrums/positioning.md) · [`positions/hermes.yaml`](../spectrums/positions/hermes.yaml) · [`01-scorecard.md`](../spectrums/01-scorecard.md) · [`00-README.md`](../spectrums/00-README.md)

*Scored 2026-09-07 against this profile as read 2026-09-02. This table is the **one sanctioned echo** of the scorecard — derived from the same YAML that renders `positioning.md`, so the two match by construction. Re-score in the YAML, never here.*

### 1b. Contents

[§1 At a glance](#1-at-a-glance) · [1a Positioning stats](#1a-positioning-stats) · [§2 System map](#2-system-map) · [§3 Workflows](#3-workflows) · [§4 Component matrix](#4-component-matrix) · [§5 Primitives](#5-primitives) · [§6 Details](#6-details) · [§7 Identity and inclusion test](#7-identity-and-inclusion-test) · [§8 Limits](#8-limits) · [§9 Sources](#9-sources) · [§10 Unverified](#10-unverified)

**Deep read** — [`content/hermes/`](./hermes/00-README.md), a 13-document reference set at a finer grain
than §6: [profiles and SOUL.md](./hermes/01-profiles-and-soul.md) ·
[context files](./hermes/02-context-files.md) · [skills](./hermes/03-skills.md) ·
[the learning loop](./hermes/04-the-learning-loop.md) · [memory](./hermes/05-memory.md) ·
[the Curator](./hermes/06-curator.md) · [hooks](./hermes/07-hooks.md) ·
[approvals and write safety](./hermes/08-approvals-and-write-safety.md) ·
[kanban](./hermes/09-kanban.md) · [cron](./hermes/10-cron.md) ·
[plugins and extension points](./hermes/11-plugins-and-extension-points.md) ·
[the consolidated guide](./hermes/20-consolidated-guide.md)

*Read 2026-09-08 at `v0.21.1` (tag `v2026.9.7`), six days and one release after this profile's source
read at `v0.21.0`. Four figures moved between the two reads; the deep read's
[`00-README.md`](./hermes/00-README.md) carries both with both dates.*

## 2. System map

**Diagram inventory not done at the 2026-09-02 read — pending the diagram pass (W8c).** No `assets/projects/hermes/` exists, and no vendor diagram was inventoried when the source read was taken. This is a recorded gap, not an absence: the read predates the diagram obligation.

**How it thinks about work.** A unit of work is one turn inside `AIAgent` (`run_agent.py`, ~12k LOC; default `max_turns` 500, compression at 50% of context), running under one **profile** — the top-level container for identity (`SOUL.md`), memories, skills, sessions and its own `state.db`. Nothing gates entry beyond `approvals.mode: smart`, which auto-approves read-only actions and stops on higher-risk ones; a hardline blocklist and always-blocked write paths hold regardless of mode. Work lands as file edits, shell effects, or a **kanban task** moving through `triage→todo→ready→running→blocked/review→done`, and the receipt is the session in `state.db`, exportable as JSONL, HTML or Markdown.

## 3. Workflows

**Not written at the 2026-09-02 read — pending the diagram pass (W8c).** A recorded gap. The three sequences a workflow pass should draw, each already evidenced in §6 and needing no new source read:

1. **The turn and the hook chain** — `pre_tool_call` (can block) → tool execution → `post_tool_call` → `pre_llm_call` → `on_stream_*` → `session:compress` at 50% context ([2b](#2b-hooks), [8d](#8d-efficiency)).
2. **Kanban dispatch** — `triage→todo→ready→running→blocked/review→done`, dispatcher polling every 60s and spawning `hermes -p <assignee> chat -q <prompt>` ([7a](#7a-workflow-tasks), [3c](#3c-composition)).
3. **Skill authoring and promotion** — a repeated workflow triggers `skill_manage` → optional `write_approval` gate → **Curator** active→stale→archived ([9a](#9a-learning), [4a](#4a-capability)).

## 4. Component matrix

`● named primitive · ◐ partial, present-not-first-class · ○ absent (pages named in §6) · n/a does not apply at this altitude`

**Marks copied verbatim from Hermes's column in [`04-harness-alignment.md`](../components/ALIGNMENT.md) §2; not re-derived at the restructure.**

| # | Component | Mark | Primitive / note |
|---|---|:-:|---|
| **0 · Foundation** | | | |
| [0a](#0a-substrate) | Substrate | ● | Nous Portal + 40+ providers; two-tier main + `auxiliary.<task>` models |
| **1 · Environment** | | | |
| [1a](#1a-environment) | Environment | ◐ | Seven terminal backends declare where shell runs; no systems inventory |
| **2 · Agent Harness** | | | |
| [2a](#2a-adapters--middleware) | Adapters & Middleware | ● | [**Plugin**](#5-primitives) API + MCP client — 70+ tools, ~28 toolsets |
| [2b](#2b-hooks) | Hooks | ● | [**Hook**](#5-primitives) — plugin, shell (Claude-Code-compatible) and gateway events |
| [2c](#2c-enforcement) | Enforcement | ● | Deny globs + hardline blocklist YOLO cannot bypass; fail-closed hooks |
| **3 · System Stacks** | | | |
| [3a](#3a-control) | Control | ● | `/goal gate add` — completion contract with deterministic gates |
| [3b](#3b-routing) | Routing | ● | `gateway.profile_routes` most-specific-first; price/latency provider routing |
| [3c](#3c-composition) | Composition | ● | [**Profile**](#5-primitives) = agent; Bot Mode; `delegate_task` subagents, depth 1 |
| [3d](#3d-configuration) | Configuration | ● | [**Context file**](#5-primitives) + `config.yaml` / managed `/etc/hermes/` precedence |
| [3e](#3e-standards) | Standards | ○ | No versioned rules-pack primitive; skills and distributions carry practice |
| **4 · Capabilities** | | | |
| [4a](#4a-capability) | Capability | ● | [**Skill**](#5-primitives) — `SKILL.md`, agentskills.io-compatible, eight install sources |
| [4b](#4b-capability-permissions) | Capability Permissions | ● | Per-platform toolsets, per-package MCP allowlist, skill trust levels |
| **5 · Context ⟳** | | | |
| [5a](#5a-individual-memory) | Individual Memory | ● | [**Memory**](#5-primitives) — `MEMORY.md`/`USER.md` under hard char caps, auto-nudged |
| [5b](#5b-team-memory) | Team Memory | ○ | Kanban is shared work state, not memory; no team tier |
| [5c](#5c-knowledge) | Knowledge | ◐ | FTS5 over own sessions; `llm-wiki` skill; RAG needs external provider |
| **6 · Workspaces ⟳** | | | |
| [6a](#6a-product) | Product | ○ | Nothing PRD-like |
| [6b](#6b-infrastructure) | Infrastructure | ● | Six terminal backends incl. Docker/singularity/modal; egress firewall |
| [6c](#6c-estate) | Estate | ◐ | `hermes project` multi-folder + worktrees; no cross-repo impact analysis |
| [6d](#6d-delivery) | Delivery | ◐ | GitHub skill + webhook `deliver: github_comment`; no built-in pipeline |
| **7 · Workflow Tasks** | | | |
| [7a](#7a-workflow-tasks) | Workflow Tasks | ● | [**Kanban task**](#5-primitives) — SQLite board, *"owns lifecycle truth"* |
| **8 · Trust** | | | |
| [8a](#8a-evals) | Evals | ◐ | `evals/` dir, ~17k tests; dev-facing, no ship-gate for skills |
| [8b](#8b-evidence) | Evidence | ● | Exportable sessions, trajectory files, cron ledger, approval history |
| [8c](#8c-observability) | Observability | ● | OTLP gateway plane, *"content-free by construction"*; Langfuse plugin |
| [8d](#8d-efficiency) | Efficiency | ● | 50% `ContextCompressor`, prompt caching, `/usage`; no spend cap |
| **9 · IMPROVE** | | | |
| [9a](#9a-learning) | Learning | ● | `skill_manage` autonomous authoring + **Curator** active→stale→archived |
| [9b](#9b-rituals) | Rituals | ◐ | Bundled rituals-as-skills (weekly-review, sdlc-review); no standup object |
| [9c](#9c-cadence) | Cadence | ● | [**Cron job**](#5-primitives) — `jobs.json` + `executions.db` attempt ledger |
| [9d](#9d-anti-fragile-lifecycle) | Anti-fragile Lifecycle | ◐ | Fallback chains, s6 auto-restart, checkpoints/rollback; no defect ledger |
| [9e](#9e-raise-the-floor) | Raise the Floor | ◐ | `hermes setup`/`doctor`; profile distributions; no retirement mechanism |
| [9f](#9f-diagnose-the-bottleneck) | Diagnose the Bottleneck | ◐ | Self-diagnostics only (`doctor`, `/context`); no maturity scoring |
| **10 · Teams & Agents** | | | |
| [10a](#10a-roster) | Roster | ● | Bot Mode — *"a roster of named Bots,"* one per profile |
| [10b](#10b-org) | Org | ◐ | Admin/Regular tiers, managed scope; no RACI or agent-org registry |
| **11 · Surfaces** | | | |
| [11a](#11a-surfaces) | Surfaces | ● | CLI/TUI/desktop/dashboard/API/ACP/MCP/A2A/voice + 35-platform gateway |
| **● 20 · ◐ 10 · ○ 3 · n/a 0** | | | |

## 5. Primitives

| Primitive | Path / key | Project's own definition (verbatim) | Source |
|---|---|---|---|
| Profile | `~/.hermes/profiles/<name>/` (default `~/.hermes/`); `hermes profile create/use/list/…` | ⚠️ **Not captured — the v1 row truncated after listing subcommands.** Nearest documented language (3c): *"A Bot is fundamentally a Hermes profile — … There's no separate primitive to learn."* | ⚠️ (v1 row truncated) |
| SOUL.md | `$HERMES_HOME/SOUL.md` (never from cwd) | *"The agent's primary identity — personality, tone, communication style, what to avoid stylistically."* *"It occupies slot #1 in the system prompt, replacing the hardcoded default identity."* | ✅ `which-file-does-what`; `features/personality` |
| Skill | `~/.hermes/skills/<name>/SKILL.md`; `.hermes/skills/`; `.agents/skills/` | *"Skills are on-demand knowledge documents the agent can load when needed. They follow a **progressive disclosure** pattern to minimize token usage and are compatible with the agentskills.io open standard."* | ✅ `features/skills` |
| Memory | `~/.hermes/memories/MEMORY.md`, `USER.md`; `memory` tool | Files are *"injected into the system prompt as a frozen snapshot at session start."* MEMORY.md = *"environment facts, project conventions, tool quirks"*; USER.md = *"Your profile including name, role, preferences, and communication style."* | ✅ `features/memory` |
| Plugin | `~/.hermes/plugins/<name>/plugin.yaml` + `__init__.py` (`register(ctx)`) | A plugin *"extends Hermes without modifying core code"* adding *"custom tools, hooks, and integrations."* *"No sandbox: Capabilities are trust/audit layers, not isolation; plugins run as native Python."* | ✅ `features/plugins` |
| Hook | Plugin `ctx.register_hook(<event>, cb)`; shell `config.yaml → hooks:`; gateway `~/.hermes/hooks/<name>/HOOK.yaml` | *"Custom code at lifecycle points for logging, alerts, and guardrails."* `pre_tool_call` *"Can Block: Yes – return {\"action\": \"block\", …}"*. | ✅ `features/hooks` |
| Cron job | `~/.hermes/cron/jobs.json`; `cronjob` tool | README: *"Built-in cron scheduler with delivery to any platform."* Docs: *"Each job runs in a fresh agent session with no chat history. The prompt must be self-contained."* | ✅ README; `features/cron` |
| Context file | `.hermes.md`/`HERMES.md`, `AGENTS.override.md`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules` | *"Auto-discovery of project configuration files"*; assembled *"under `# Project Context` header"*; *"Deeper files appear later in the prompt, so more specific guidance takes precedence."* | ✅ `features/context-files` |
| Kanban task | `~/.hermes/kanban.db`; `kanban_*` tools | *"a work queue where every handoff is a row any profile (or human) can see and edit."* *"Hermes Kanban owns lifecycle truth"* while *"worker lanes execute work but never own that truth."* | ✅ `features/kanban` |
| (supporting) Toolset | `config.yaml → toolsets:`, `custom_toolsets:` | *"Toolsets are named bundles of tools that control what the agent can do."* Types: Core, Composite, Platform. | ✅ `features/tools` |

**Count:** 9 primitives, 1 supporting *(as counted at the 2026-09-02 read)*. **Verdict:** ⚠️ contestable — two past this corpus's 5–7 healthy band, but not 12+ and no published refusal list, so this reads as accommodation-adjacent rather than either a defended narrow set or a defended wide one. No refusal list was found at the v1 read — checked `SECURITY.md`, `AGENTS.md`, README.

## 6. Details

`✅ direct · ↪ relayed · ⚠️ unverified`

### 0 · Foundation

#### 0a Substrate
<details>
<summary>● Nous Portal + 40+ providers; two-tier main + <code>auxiliary.&lt;task&gt;</code> models</summary>

**Ships.** Model-pluggable: Nous Portal (OAuth, "300+ models"), OpenRouter, OpenAI, Anthropic, custom OpenAI-compatible endpoints, plus Bedrock/Vertex/Azure/Mistral extras and 40+ env-var providers. Three API modes (chat completions, Codex responses, Anthropic messages). Two-tier model system: main model + `auxiliary.<task>` models (compression, vision, approval scoring, MCP routing, title, skill search, curator). Fallback chains; Mixture-of-Agents as a "virtual model provider." Minimum 64k context required.
**Path.** `~/.hermes/config.yaml → model:`, `model_aliases:`, `auxiliary.<task>`, `fallback_providers`, `moa:`
**Source.** ✅ `docs/user-guide/configuring-models`, `reference/environment-variables`, `features/mixture-of-agents`, `pyproject.toml`

</details>

### 1 · Environment

#### 1a Environment
<details>
<summary>◐ Seven terminal backends declare where shell runs; no systems inventory</summary>

**Ships.** Shell (`terminal`, `process` with background/PTY), filesystem, browser (CDP), network (`web_search`/`web_extract`, SSRF blocking of private ranges), computer-use, LSP servers. Seven terminal backends: `local` (default), `docker`, `ssh`, `singularity`, `modal`, `daytona`, `vercel_sandbox`. Windows native, WSL2, Termux supported.
**Nothing here** as a declared systems inventory — checked `features/tools`, `user-guide/docker`, `user-guide/security`, `AGENTS.md`.
**Path.** `config.yaml → terminal: {backend, cwd, timeout, docker_image, …}`
**Source.** ✅ `docs/user-guide/features/tools`, `user-guide/docker`, `user-guide/security`

</details>

### 2 · Agent Harness

#### 2a Adapters & Middleware
<details>
<summary>● <b>Plugin</b> API + MCP client — 70+ tools, ~28 toolsets</summary>

**Ships.** Central tool registry ("70+ registered tools across ~28 toolsets," self-registering). Provider abstraction in `agent/` + `runtime_provider.py`. Plugin API (`register(ctx)` with `ctx.register_tool/hook/command/cli_command/skill/system_prompt_section`) and backends for image/video gen, memory, context engines, model providers, gateway platforms, approval transports. MCP client (`mcp_servers:` stdio+HTTP; per-server include/exclude; tool-search deferral). `execute_code` RPC lets scripts call tools over a Unix socket.
**Path.** `tools/registry.py`, `plugins/`, `config.yaml → mcp_servers`, `tool_search:`
**Source.** ✅ `docs/developer-guide/architecture`, `features/plugins`, `features/mcp`, `features/tool-search`, `features/code-execution`

**More.** [`11-plugins-and-extension-points.md`](./hermes/11-plugins-and-extension-points.md) — every `ctx.*` registration point, five discovery sources with two opposite collision rules, what `plugins.enabled` does not gate, and `ctx.call_mcp`'s per-server allowlist

</details>

#### 2b Hooks
<details>
<summary>● <b>Hook</b> — plugin, shell (Claude-Code-compatible) and gateway events</summary>

**Ships.** Three hook systems. **Plugin hooks** via `ctx.register_hook()` — blocking `pre_tool_call`, `pre_gateway_dispatch`; context-injecting `pre_llm_call`; gate `pre_verify`; transforms and observers across session, agent, model, tool and input lifecycles; kanban-worker events. **Shell hooks** in `config.yaml → hooks:` (any language, JSON on stdio, `matcher` regex, `fail_closed`, exit 2 blocks — *"Claude Code compatible"*), with a first-use consent allowlist. **Gateway event hooks** as `~/.hermes/hooks/<name>/HOOK.yaml` + `handler.py` for platform/session/agent events (observe-only), plus signed outbound webhooks. `session:compress` is the compaction event.
**Path.** `config.yaml → hooks:`, `~/.hermes/agent-hooks/`, `~/.hermes/hooks/`; `hermes hooks list/test/revoke/doctor`
**Source.** ✅ `docs/user-guide/features/hooks`

**More.** [`07-hooks.md`](./hermes/07-hooks.md) — every gateway event with its context keys, the plugin event catalogue and its fail-closed timeout, the shell wire protocol including the `modify` rewrite shape, and the consent model's stated gap. **The docs now count four hook systems as of 2026-09-08**, with outbound webhooks as the fourth; this row's three is the 2026-09-02 read

</details>

#### 2c Enforcement
<details>
<summary>● Deny globs + hardline blocklist YOLO cannot bypass; fail-closed hooks</summary>

**Ships.** `approvals.mode: smart|manual|off`; `approvals.deny:` fnmatch patterns checked before YOLO or approval settings; a **hardline blocklist** (`rm -rf /`, fork bombs, ~40 patterns) YOLO cannot override; `--yolo`/`HERMES_YOLO_MODE=1` with a red banner; `cron_mode`/`unattended_mode` auto-deny/approve. Always-blocked write paths (`~/.ssh/`, `.env*`) + `HERMES_WRITE_SAFE_ROOT`. `pre_tool_call` fails closed on timeout. Container hardening on sandbox backends; Docker egress isolation via internal/egress networks + Squid allowlist; skill install trust levels `builtin→official→trusted→community→dangerous`; MCP subprocess env scrubbing; `hermes security audit`.
**Path.** `config.yaml → approvals`, `security.*`, `skills.write_approval`
**Source.** ✅ `docs/user-guide/security`, `docs/security/network-egress-isolation.md`

**More.** [`08-approvals-and-write-safety.md`](./hermes/08-approvals-and-write-safety.md) — the three headless approval defaults, the hardline blocklist in full, `approvals.deny`'s matching semantics and its own threat-model note, every approval trigger, the protected write paths. **The `SECURITY.md` sentence quoted here has been extended since**: as of 2026-09-08 it reads *"…not any pattern scanner, **not any tool allowlist**"*, preceded by *"The only security boundary against an adversarial LLM is the operating system."*

</details>

### 3 · System Stacks

#### 3a Control
<details>
<summary>● <code>/goal gate add</code> — completion contract with deterministic gates</summary>

**Ships.** `/plan [task]` writes a markdown plan; `/goal <text>` a standing goal judged by an auxiliary model, `/goal draft` a *"structured completion contract,"* `/goal gate add <command>` deterministic quality gates, `goals.max_turns` (20). `pre_verify` hook *"gates agent continuation"* at code-edit verify. Approval prompts (`/approve`, `/deny`; ACP three tiers); API `POST /v1/runs/{run_id}/approval`; kanban states `triage→todo→ready→running→blocked/review→done`; run contracts for subagents. No dedicated plan mode withholding tool access.
**Path.** `config.yaml → goals`, `approvals`; `SessionDB.state_meta`
**Source.** ✅ `reference/slash-commands`, `features/goals`, `features/hooks`, `features/kanban`

</details>

#### 3b Routing
<details>
<summary>● <code>gateway.profile_routes</code> most-specific-first; price/latency provider routing</summary>

**Ships.** Model routing: `auxiliary.<task>` per-task models, `fallback_providers`/`fallback_chain`, OpenRouter/Portal `provider_routing` (`sort: price|throughput|latency`), credential pools, per-cron model pins, `delegation.model/provider` for cheaper workers, MoA reference/aggregator split. Agent routing: `gateway.profile_routes` (guild/channel/thread → profile, most-specific-first), kanban `task.assignee` → profile lane, `@name` mentions in Bot Mode, cron `deliver:` targets.
**Path.** `config.yaml → auxiliary`, `fallback_providers`, `delegation`, `gateway.profile_routes`
**Source.** ✅ `docs/profile-routing.md`, `user-guide/configuring-models`

</details>

#### 3c Composition
<details>
<summary>● <b>Profile</b> = agent; Bot Mode; <code>delegate_task</code> subagents, depth 1</summary>

**Ships.** An agent = a **profile** (`~/.hermes/profiles/<name>/`, own config, `.env`, `SOUL.md`, memories, skills, sessions, `state.db`). Bot Mode: *"A Bot is fundamentally a Hermes profile — … There's no separate primitive to learn."* Subagents via `delegate_task(goal, context, role="orchestrator"|"leaf")`; `max_spawn_depth` 1 default; leaf children blocked from `delegate_task`/`clarify`/`memory`/`send_message`/`cronjob`; `worktree_isolation: true`. `/review` spawns a reviewer subagent. No agent-definition file format beyond profile dirs and distributions.
**Path.** `hermes profile create/use/list/…`; `~/.hermes/profiles/<name>/`
**Source.** ✅ `docs/user-guide/bot-mode`, `features/delegation`, `profile-distributions`

**More.** [`01-profiles-and-soul.md`](./hermes/01-profiles-and-soul.md) — the `HERMES_HOME` mechanism, `HERMES_HOME` versus `HOME` and `terminal.home_mode`, the profile/workspace/sandbox distinction, and the one-writer-per-home rule

</details>

#### 3d Configuration
<details>
<summary>● <b>Context file</b> + <code>config.yaml</code> / managed <code>/etc/hermes/</code> precedence</summary>

**Ships.** `$HERMES_HOME/SOUL.md` (identity, slot #1); project context in priority order `.hermes.md`/`HERMES.md` (walks to git root) → `AGENTS.override.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`, git-root→cwd merge, "deeper files appear later." Settings at `~/.hermes/config.yaml` (non-secrets), `~/.hermes/.env` (secrets); precedence CLI args → `config.yaml` → `.env` → defaults;
**managed** `/etc/hermes/` overrides user for pinned keys. Scopes: managed → profile home → project (`.hermes/skills`, `.hermes/plugins` opt-in) → session. `/init` generates `AGENTS.md`.
**Path.** `~/.hermes/config.yaml`, `~/.hermes/.env`, `/etc/hermes/config.yaml`; `hermes config get/set/check/migrate`
**Source.** ✅ `docs/user-guide/which-file-does-what`, `docs/user-guide/settings`, `managed-scope`

**More.** [`02-context-files.md`](./hermes/02-context-files.md) — all seven context files, truncation and read-timeout keys · [`01-profiles-and-soul.md`](./hermes/01-profiles-and-soul.md) — `SOUL.md`'s slot #1 and the eight-slot prompt stack. **The assembly rule reads differently as of 2026-09-08**: *"Only **one** project context type is loaded per session (first match wins)"*, with the git-root-downward merge operating **within** the winning type — this row's priority-order assembly is the 2026-09-02 read

</details>

#### 3e Standards
<details>
<summary>○ No versioned rules-pack primitive; skills and distributions carry practice</summary>

**Nothing here** as a standalone versioned rules-pack primitive — checked `reference/skills-catalog`, `profile-distributions`, `features/built-in-plugins`.
**What exists instead.** Bundled skills encoding practice (`test-driven-development`, `systematic-debugging`, `requesting-code-review`, `hermes-agent-skill-authoring`), versioned via `hermes skills update/check` and registry taps; profile distributions ship `config.yaml` + `SOUL.md` + `skills/` as a versioned git repo (`distribution.yaml`); managed scope pins org config; `security-guidance` plugin appends warnings on risky patterns.
**Source.** ✅ `docs/reference/skills-catalog`, `features/skills`, `profile-distributions`

</details>

### 4 · Capabilities

#### 4a Capability
<details>
<summary>● <b>Skill</b> — <code>SKILL.md</code>, agentskills.io-compatible, eight install sources</summary>

**Ships.** Skills (`SKILL.md`, YAML frontmatter `name/description/version/platforms/…`) at `~/.hermes/skills/`, project `.hermes/skills/` or `.agents/skills/`, `skills.external_dirs`, `~/.hermes/skill-bundles/`. Eight sources: official, skills.sh, `/.well-known/skills/index.json`, GitHub `owner/repo/skills/name` + taps, ClawHub, LobeHub, browse.sh, direct URL. `hermes skills browse/search/inspect/install`.
**Path.** `~/.hermes/skills/<name>/SKILL.md`; `hermes skills …`
**Source.** ✅ `docs/reference/skills-catalog`, `features/skills`

**More.** [`03-skills.md`](./hermes/03-skills.md) — the full `SKILL.md` frontmatter, progressive disclosure's three levels with their token costs, the project→local→external precedence ladder, project trust and scan-time quarantine, all eight install sources and the four trust levels

</details>

#### 4b Capability Permissions
<details>
<summary>● Per-platform toolsets, per-package MCP allowlist, skill trust levels</summary>

**Ships.** Per-platform toolsets (`hermes-cli` full; `hermes-webhook` four tools only; `hermes-acp` drops several; `kanban` opt-in even under `all`); per-cron-job `enabled_toolsets`; subagent `allowed_toolsets` ("parent-broadening toolsets get rejected"); MCP per-server `tools.include/exclude`; plugin `capabilities:` grants + `mcp_allowlist` (zero MCP access by default); skill trust levels + `hermes skills trust /path`; `skills.write_approval`/`memory.write_approval` gates.
**Path.** `config.yaml → toolsets`, `plugins.entries.<p>.mcp_allowlist`
**Source.** ✅ `reference/toolsets-reference`, `features/plugins`, `features/skills`

**More.** [`11-plugins-and-extension-points.md`](./hermes/11-plugins-and-extension-points.md) — capability consent, update re-consent, the non-interactive fail-closed case, legacy keys that open a gate, and the `mcp_allowlist` rules · [`03-skills.md`](./hermes/03-skills.md) — the four trust levels and what `--force` cannot override

</details>

### 5 · Context ⟳

#### 5a Individual Memory
<details>
<summary>● <b>Memory</b> — <code>MEMORY.md</code>/<code>USER.md</code> under hard char caps, auto-nudged</summary>

**Ships.** `~/.hermes/memories/MEMORY.md` (2,200-char cap) and `USER.md` (1,375-char cap), Markdown, error-not-truncate on overflow, "injected into the system prompt as a frozen snapshot at session start." Written by the agent's `memory` tool with periodic nudges and a post-turn "Background Review" on the auxiliary model; optional `write_approval`. `session_search` over `state.db` FTS5. `/journey` timeline; `/refine` runs memory/skill self-improvement. External providers (Honcho, Mem0, …) optional.
**Path.** `~/.hermes/memories/{MEMORY,USER}.md`; `config.yaml → memory_enabled, write_approval, memory_char_limit`
**Source.** ✅ `docs/user-guide/features/memory`

**More.** [`05-memory.md`](./hermes/05-memory.md) — the overflow error verbatim, the injected block's format, all three tool actions with substring matching, three distinct off-states, the `write_approval` staging flow, `/journey`'s prune-and-correct verbs

</details>

#### 5b Team Memory
<details>
<summary>○ Kanban is shared work state, not memory; no team tier</summary>

**Nothing here** as a first-party shared/team memory tier — checked `features/memory`, `features/kanban`, `user-guide/bot-mode`.
**What exists instead.** Kanban (`~/.hermes/kanban.db`) is shared *work state* — "every handoff is a row any profile (or human) can see and edit" — not memory. Bot Mode group chats persist rooms across machines. Honcho provider offers a paid "multi-peer … workspace-level shared environment," third-party.
**Source.** ✅ `features/kanban`, `features/memory-providers`, `features/honcho`

</details>

#### 5c Knowledge
<details>
<summary>◐ FTS5 over own sessions; <code>llm-wiki</code> skill; RAG needs external provider</summary>

**Ships.** Built-in FTS5 full-text search over own sessions (`session_search`); `@file/@folder/@diff` context references; `web_search`/`web_extract`; bundled `llm-wiki` skill ("Karpathy's LLM Wiki: build/query interlinked markdown KB"), `grounded-citations`, `obsidian`/`notion` skills. Embedding/RAG only via external memory providers (Mem0, Hindsight, Supermemory, RetainDB) or MCP.
**Both curated-KB candidates are opt-in skills, not built-in.**
**Path.** `state.db`; `config.yaml → memory provider`; skills
**Source.** ✅ `user-guide/sessions`, `features/context-references`, `reference/skills-catalog`

</details>

### 6 · Workspaces ⟳

#### 6a Product
<details>
<summary>○ Nothing here</summary>

**Nothing here** — checked `features/overview`, `docs/index`, the examples/skills catalog. No PRD or spec object of any kind. Closest is `hermes project` multi-folder workspaces, which is estate (6c), not a product artifact.
**Source.** ✅ (absence recorded at the 2026-09-02 read)

</details>

#### 6b Infrastructure
<details>
<summary>● Six terminal backends incl. Docker/singularity/modal; egress firewall</summary>

**Ships.** Terminal backends `docker`, `ssh`, `singularity` (HPC), `modal` (serverless), `daytona`, `vercel_sandbox` (snapshot-backed persistence); whole-agent Docker image with s6 supervision, `flake.nix`; `hermes egress` credential firewall/iron-proxy for remote sandboxes; multi-machine Bot Mode via Desktop relay or `hermes peer add`; experimental Hermes Relay connector ("never opens an inbound port"); remote dashboard backend (`hermes serve`).
**Path.** `config.yaml → terminal.backend`, `hermes peer`, `hermes egress`
**Source.** ✅ `user-guide/docker`, `messaging/relay`, `user-guide/bot-mode`, `SECURITY.md`

</details>

#### 6c Estate
<details>
<summary>◐ <code>hermes project</code> multi-folder + worktrees; no cross-repo impact analysis</summary>

**Ships.** `hermes project` multi-folder workspaces spanning repos; git worktrees (`/worktree new`, `hermes -w`, `.worktrees/<name>/` on branch `hermes/<name>`, per-subagent `worktree_isolation`); kanban workspaces under `~/.hermes/kanban/workspaces/`; context-file discovery per repo.
**No cross-repo change-impact analysis found** — checked `features/overview`, `git-worktrees`, `kanban`, `lsp`.
**Source.** ✅ `user-guide/git-worktrees`, `features/kanban`, `features/delegation`

</details>

#### 6d Delivery
<details>
<summary>◐ GitHub skill + webhook <code>deliver: github_comment</code>; no built-in pipeline</summary>

**Nothing built in** as a PR/deploy pipeline — checked `features/overview`, `reference/skills-catalog`.
**What exists instead.** `github` skill (PRs, issues, reviews via `gh` CLI); `claude-code`/`codex`/ `opencode` delegation skills; `requesting-code-review`, `sdlc-review` skills; `/review`, `/diff`; webhooks receive GitHub/GitLab `pull_request`/`push` and can `deliver: github_comment`; kanban `review` state and `kanban.review_dispatch`; checkpoints/rollback (shadow git repo, `/rollback`).
**Path.** skills dir; `config.yaml → kanban.review_dispatch`
**Source.** ✅ `reference/skills-catalog`, `messaging/webhooks`, `checkpoints-and-rollback`

</details>

### 7 · Workflow Tasks

#### 7a Workflow Tasks
<details>
<summary>● <b>Kanban task</b> — SQLite board, <i>"owns lifecycle truth"</i></summary>

**Ships.** `todo` tool; `/plan`; `/goal`/`/subgoal`. **Kanban** — durable task board, `~/.hermes/kanban.db` (or per-board), tools `kanban_show/list/create/complete/block/unblock/ request_review/request_changes/comment/attach/heartbeat/link`, statuses `triage→todo→ready→running→blocked/review→done→archived`; dispatcher polls every 60s, spawning `hermes -p <assignee> chat -q <prompt>`. Cron jobs as JSON in `~/.hermes/cron/jobs.json`. *"Hermes Kanban owns lifecycle truth"* while *"worker lanes execute work but never own that truth."*
**Path.** `~/.hermes/kanban.db`; `hermes kanban`; `/kanban`
**Source.** ✅ `features/kanban`, `features/kanban-worker-lanes`, `reference/slash-commands`

**More.** [`09-kanban.md`](./hermes/09-kanban.md) — three workspace kinds and their cleanup rules, the dispatcher's nine environment variables, the four lifecycle terminators, six handled failure modes, and every `task_events` kind with its payload

</details>

### 8 · Trust

#### 8a Evals
<details>
<summary>◐ <code>evals/</code> dir, ~17k tests; dev-facing, no ship-gate for skills</summary>

**Ships.** Repo `evals/` with `browser_use/`, `compaction/`, `core_tool_deferral/`, `readtool/`, `session_search_schema/`; "~17k tests across ~900 files as of May 2026" via `scripts/run_tests.sh`; `batch_runner.py` for model evaluation with `statistics.json`; `/goal gate add <command>` deterministic gates; `pre_verify` hook gate; LSP diagnostics after edits.
**Not a ship gate for skills or agents** — no user-facing eval harness found.
**Path.** `evals/`, `tests/`, `scripts/run_tests.sh`
**Source.** ✅ GitHub contents API for `evals/*`, `AGENTS.md`, `features/goals`

</details>

#### 8b Evidence
<details>
<summary>● Exportable sessions, trajectory files, cron ledger, approval history</summary>

**Ships.** Sessions in `state.db` exportable via `hermes sessions export` (JSONL, HTML, Markdown, "Claude Code JSONL format compatible with Hugging Face Agent Trace Viewer," `--redact`); trajectory files (ShareGPT JSONL); cron `~/.hermes/cron/executions.db` attempt ledger (`claimed→running→completed/failed/unknown`); delivery ledger "at-least-once"; subagent live transcripts; `hermes approvals` history; kanban attachments; `hermes dump`, `hermes debug`.
**Path.** `state.db`; `~/.hermes/cron/executions.db`; `hermes sessions export`
**Source.** ✅ `user-guide/sessions`, `developer-guide/trajectory-format`, `features/cron`

</details>

#### 8c Observability
<details>
<summary>● OTLP gateway plane, <i>"content-free by construction"</i>; Langfuse plugin</summary>

**Ships.** Observer-hooks contract (backend-neutral); bundled `observability/langfuse` plugin ("Traces turns / LLM calls / tools to Langfuse"); gateway monitoring plane exporting OTLP/HTTP metrics/traces/logs, *"content-free by construction,"* hashed install id; NeMo Relay shared metrics (extras `nemo-relay`, `otlp`); logs `agent.log`/`errors.log`/`gateway.log` (`hermes logs`); `/context` breakdown; `hermes prompt-size`.
**Path.** `docs/observability/{README,monitoring}.md`; `plugins/observability/langfuse/`
**Source.** ✅ `docs/observability/README.md`, `docs/observability/monitoring.md`

</details>

#### 8d Efficiency
<details>
<summary>● 50% <code>ContextCompressor</code>, prompt caching, <code>/usage</code>; no spend cap</summary>

**Ships.** `ContextCompressor` at 50% (`compression.threshold`, `target_ratio`, `protect_last_n`), gateway hygiene at 85%, `/compress`, `session:compress` hook; prompt caching "system_and_3" (4 `cache_control` breakpoints, "~75%" input-cost reduction), 1-hour cross-session prefix cache; frozen memory snapshot preserves cache; tool-search schema deferral; `execute_code` "zero-context-cost" pipelines; cron `no_agent=True` script-only jobs; `/usage`, `/insights`, `hermes insights`; `credential-pools`; `/fast`; `reasoning_effort` pins.
**No hard spend budget found** — checked configuration, env-vars, insights pages.
**Path.** `config.yaml → compression`, `tool_search`, `auxiliary`
**Source.** ✅ `developer-guide/context-compression-and-caching`, `features/memory`, `features/tool-search`

</details>

### 9 · IMPROVE

#### 9a Learning
<details>
<summary>● <code>skill_manage</code> autonomous authoring + <b>Curator</b> active→stale→archived</summary>

**Ships. The core claim.** Autonomous skill creation via `skill_manage` (`create/patch/edit/write_file/ remove_file`) triggered *"when it worked out a multi-step workflow worth repeating… hit errors… user corrected its approach"*; skills *"self-improve during use."* `/learn <what>` distills a reusable skill; `/refine`. Memory nudges + Background Review. **Curator** (`curator:` config; active→stale→ archived, optional LLM consolidation, `~/.hermes/skills/.archive/`). `/journey` timeline; `/suggestions` automation suggestions; trajectories logged for training.
**Path.** `~/.hermes/skills/`, `.usage.json`; `config.yaml → curator, skills.write_approval`
**Source.** ✅ `features/skills`, `features/curator`, `features/memory`, README

**More.** [`04-the-learning-loop.md`](./hermes/04-the-learning-loop.md) — the three writers and why only one is curated, every `skill_manage` action, the advisory linter's two rules, the background review's cadence, cost, cache parity and GPU deferral, and both write gates · [`06-curator.md`](./hermes/06-curator.md) — the four thresholds, the three-condition agent-created test, adoption, pinning, and undo at three depths

</details>

#### 9b Rituals
<details>
<summary>◐ Bundled rituals-as-skills (weekly-review, sdlc-review); no standup object</summary>

**Ships.** Encoded as bundled skills: `weekly-review-planning`, `requesting-code-review`, `sdlc-review`, `meeting-action-items`, `teams-meeting-pipeline`, `email-inbox-triage`, `competitor-news-monitor`, `test-driven-development`, `systematic-debugging`, `spike`, `dogfood`; `/review`; Automation Blueprints (`/blueprint <name>`; catalog names not captured, ⚠️). README cron examples: "Daily reports, nightly backups, weekly audits."
**No standup/retro object named.**
**Path.** skills dir; `metadata.hermes.blueprint`
**Source.** ✅ (blueprint names ⚠️) `reference/skills-catalog`, `reference/automation-blueprints-catalog`

</details>

#### 9c Cadence
<details>
<summary>● <b>Cron job</b> — <code>jobs.json</code> + <code>executions.db</code> attempt ledger</summary>

**Ships.** `cronjob` tool + `hermes cron create/list/pause/resume/…`; jobs run "in a fresh agent session with no chat history"; attempt ledger `~/.hermes/cron/executions.db` (`claimed→running→completed/failed/unknown`); output `~/.hermes/cron/output/{job_id}/{timestamp}.md`; misfire grace, `failure_streak`; `hermes cron doctor`. Each job carries `skill`/`skills` (zero, one or multiple, injected into the fresh session), `workdir`, and `cron.script_timeout_seconds` (default 3600) — a field the first read's row omitted ↪, docs-confirmed ✅.
**Path.** `~/.hermes/cron/jobs.json`; `hermes cron …`
**Source.** ✅ README, `features/cron`

**More.** [`10-cron.md`](./hermes/10-cron.md) — the tick's seven steps, model resolution and the fail-closed drift guard, pre-dispatch validation that spends no tokens, the ledger's replay protection and its stated limits, all five schedule formats, and no-agent mode

</details>

#### 9d Anti-fragile Lifecycle
<details>
<summary>◐ Fallback chains, s6 auto-restart, checkpoints/rollback; no defect ledger</summary>

**Ships.** Provider fallback on 429/5xx/auth, credential refresh; interrupt handling discards abandoned API threads; session resume (`--continue`, `--resume`, lineage after compression); delivery-ledger redelivery after crash; gateway circuit breaker; s6 auto-restart ~1s; cron `failure_streak`, durable incidents; subagent stall detection (450s) with structured failure; checkpoints `/rollback` with an agent-write ledger; `hermes backup`/`import`; `hermes update` staged with rollback.
**No defect ledger** — recovery is runtime resilience, not a closed improvement loop.
**Path.** `hermes cron doctor`; `hermes update`; `~/.hermes/checkpoints/store/`
**Source.** ✅ `developer-guide/agent-loop`, `features/cron`, `checkpoints-and-rollback`

</details>

#### 9e Raise the Floor
<details>
<summary>◐ <code>hermes setup</code>/<code>doctor</code>; profile distributions; no retirement mechanism</summary>

**Ships.** `hermes setup` wizard (Quick/Portal, Full, Blank Slate); `hermes doctor`, `hermes hooks doctor`, `hermes cron doctor`; `hermes config check/migrate`; `/init` generates `AGENTS.md`; auto-created starter `SOUL.md`; personality presets; profile distributions + `hermes profile install`; Automation Blueprints ("no cron syntax required"); `hermes import-agent`/`claw migrate`; dashboard form editor ("150+ auto-discovered fields").
**No retirement mechanism found** for a second way once it appears.
**Path.** `hermes setup`; `hermes doctor`; `hermes profile install`
**Source.** ✅ `getting-started/quickstart`, `reference/cli-commands`, `profile-distributions`

</details>

#### 9f Diagnose the Bottleneck
<details>
<summary>◐ Self-diagnostics only (<code>doctor</code>, <code>/context</code>); no maturity scoring</summary>

**Ships.** `hermes doctor`, `hermes cron doctor` (exits 1 on issues), `hermes hooks doctor`, `hermes security audit`, `hermes status`, `hermes prompt-size`, `/context`, `hermes insights` analytics, `/suggestions` (proposes automations from usage).
**No maturity/readiness scoring found** — checked `cli-commands`, `slash-commands`, `features/overview`.
**Path.** `hermes doctor`; `hermes insights`
**Source.** ✅ `reference/cli-commands`, `reference/slash-commands`

</details>

### 10 · Teams & Agents

#### 10a Roster
<details>
<summary>● Bot Mode — <i>"a roster of named Bots,"</i> one per profile</summary>

**Ships.** **Bot Mode** (v0.21.0, desktop, default-on): "a roster of named Bots" — one per profile, with name, title, description, deterministic avatar, canonical Bot Chat, `@name-device` handles across machines, `message_agent` tool, group chats (≤3 rounds, ≤10 messages/send, live interruption is "future work"). `/agents` live subagent tree; `hermes peer add` registry of peer gateways; A2A agent cards.
**Path.** `~/.hermes/profiles/<name>/`; Settings → Plugins → Bots
**Source.** ✅ `user-guide/bot-mode`, `reference/slash-commands`

</details>

#### 10b Org
<details>
<summary>◐ Admin/Regular tiers, managed scope; no RACI or agent-org registry</summary>

**Ships.** Thin. Gateway user tiers Admin/Regular (`allow_admin_from`, `user_allowed_commands`, `/whoami`); `@user` escalation from bot group chats; kanban `assignee`, `kanban_block` → human `kanban_unblock`, `kanban_request_review` → reviewer; managed scope admin vs. user; approval posture `smart|manual|off|yolo` + `unattended_mode`.
**No RACI/ownership registry for agents** — `developer-guide/codebase-ownership` is contributor code ownership, not agent org.
**Path.** `config.yaml → allow_admin_from`; managed `/etc/hermes/`
**Source.** ✅ `user-guide/security`, `user-guide/managed-scope`

</details>

### 11 · Surfaces

#### 11a Surfaces
<details>
<summary>● CLI/TUI/desktop/dashboard/API/ACP/MCP/A2A/voice + 35-platform gateway</summary>

**Ships.** CLI (`hermes chat`), TUI (`hermes --tui`, Ink/React), Electron Desktop (macOS/Windows/Linux, Bot Mode, plugins), Web Dashboard (`hermes dashboard`, :9119, REST `/api/*`), OpenAI-compatible API server (:8642), IDE via ACP (VS Code, Zed, JetBrains), MCP server (`hermes mcp serve`), A2A, voice mode + wake word (can join a voice channel, transcribe, and speak back — `/voice tts`, `/voice leave` ✅ docs-confirmed), and a messaging gateway with 35 platform docs (Telegram, Discord, Slack, WhatsApp, Signal, Teams, Matrix, DingTalk, Feishu, WeCom, and more).
**Path.** `gateway/platforms/`, `ui-tui/`, `apps/`, `acp_adapter/`
**Source.** ✅ `user-guide/tui`, `user-guide/desktop`, `features/web-dashboard`, `features/acp`, `features/mcp`

</details>

## 7. Identity and inclusion test

<details>
<summary>Identity · inclusion test · loop question</summary>

| Field | Value |
|---|---|
| Canonical name | **Hermes Agent** (package `hermes-agent`; CLI `hermes`) ✅ `pyproject.toml` |
| Prior names / homes | None found. Import paths **from** Claude Code, Codex and OpenClaw (`hermes import-agent`, `claw migrate`) exist but are migrations, not prior names ✅ README |
| Owner / maintainer | **Nous Research** (GitHub org `NousResearch`) ✅ |
| GitHub URL | `github.com/NousResearch/hermes-agent` ✅ |
| License | **MIT** — LICENSE at repo root; API `spdx_id: MIT` ✅ |
| Stars | 239,705 stars · 48,999 forks · 38,638 open issues (2026-09-02) ✅ `gh api` |
| Language | Python (primary); JS/TS surfaces (`ui-tui/`, `apps/`, `web/`); `requires-python >=3.11,<3.14` ✅ |
| Repo created | 2025-07-22 ✅ `gh api` |
| First release | ⚠️ uncertain — oldest dated tag `v2026.3.12`; secondary sources state 2026-02-25 ✅ (tag) / ↪ (date) |
| Latest release | **v0.21.0**, tag `v2026.8.31`, published 2026-08-31 ("The Pantheon Release") ✅ |
| Install | `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash`; Docker `nousresearch/hermes-agent`; desktop DMG/EXE ✅ |
| Website / docs | `hermes-agent.nousresearch.com` · docs `/docs` (Docusaurus, source `website/docs/`) ✅ |
| What it says it is, verbatim | *"The self-improving AI agent built by Nous Research. It's the only agent with a built-in learning loop — it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions."* ✅ GitHub README |

**Does state persist across sessions, where, in what format?** **Yes.** `~/.hermes/memories/MEMORY.md` (2,200-char cap) and `USER.md` (1,375-char cap), Markdown, *"injected into the system prompt as a frozen snapshot at session start."* `~/.hermes/state.db` — SQLite (WAL), full message history, FTS5 index. Session resume via `--continue`, `--resume <id|name>`. ✅ `features/memory`, `user-guide/sessions`

**Does it serve more than one person?** **Primarily one operator, with bounded multi-user surfaces.** SECURITY.md: *"Hermes Agent operates as a single-tenant personal agent."* Gateway ships Admin/Regular tiers per platform scope, allowlists, default deny. **Managed scope** (`/etc/hermes/config.yaml`) *"lets an administrator push a baseline of configuration and secrets that a standard (non-root) user cannot override."* Profile distributions share an agent *definition*, never memories/sessions. No team/org/ tenant object; profiles are per-machine home directories. ✅ `SECURITY.md`, `user-guide/managed-scope`

**Does it bind mechanically, or only by prose?** **Yes, several mechanical binds, with an explicit disclaimer that in-process ones are heuristics, not security boundaries.** `approvals.deny:` fnmatch patterns checked "before YOLO or approval mode settings"; a hardline blocklist YOLO cannot override; `pre_tool_call` can return `{"action":"block"}`, fails closed on timeout; always-blocked write paths. *"nothing inside the agent process constitutes containment — not the approval gate, not output redaction, not any pattern scanner."* OS-level isolation is the one load-bearing boundary. ✅ `SECURITY.md`

**Loop question.** **Runs the loop itself, and also hosts another harness's loop for one scoped condition.** `run_agent.py`'s `AIAgent` class is *"core conversation loop (~12k LOC)"*, default `max_turns` 500, compression at 50%. `model.openai_runtime: codex_app_server` hands `openai/*` turns to the Codex CLI app-server *"instead of running its own tool loop"* (losing `delegate_task`, `memory`, `session_search`, `todo`) — a real host relationship, scoped to one provider. Ships import adapters
**from** Claude Code, Codex and OpenClaw; ships an MCP server, an ACP server, and an A2A server/client so other hosts can reach it. Other systems claim adapters *for* it (VS Code ACP extension, Buzz Desktop) — stated on Hermes docs, not verified at those third parties ⚠️. ✅ `developer-guide/agent-loop`, `features/codex-app-server-runtime`, `features/mcp`, `features/acp`

**Altitude.** **Runtime — and, dually, a gateway/host for the Codex app-server swap** (rule 7: two altitudes both true, evidenced above). Primary: runs its own loop by default, one profile at a time.

</details>

## 8. Limits

<details>
<summary>What it does not claim, in the vendor's words</summary>

**From `SECURITY.md`** ✅

> *"nothing inside the agent process constitutes containment — not the approval gate, not output
> redaction, not any pattern scanner."* In-process components are "accident-prevention" heuristics;
> "defeating them is not a vulnerability." Out of scope: "Prompt injection without chained outcomes",
> "Third-party skills/plugins — boundary is operator review before install", "Public exposure without
> controls — operator responsibility". "No bug bounty program."
>
> *"Terminal-backend isolation confines shell and file operations to containers/sandboxes, but leaves
> Python processes (code execution, MCP, plugins) uncontained on the host."*

**From `docs/user-guide/profiles`** ✅

> *"Not a sandbox … The agent still has the same filesystem access as your user account."* *"Never
> point two agent processes at the same profile."*

**From `features/plugins`** ✅

> *"No sandbox: Capabilities are trust/audit layers, not isolation; plugins run as native Python."*
> *"Single active provider: Memory, context engines, and model selection allow only one active choice
> at a time."*

**From `user-guide/managed-scope`** ✅

> *"Enforcement is filesystem permissions only"*; managed `.env` "remains world-readable"; "No support
> for macOS/Windows native locations, signed files, or remote device management."

**From `features/kanban`, `kanban-worker-lanes`** ✅

> *"Single-host only (PIDs are host-local, no cross-machine coordination)"*; "No task linking across
> separate boards."

**From `features/goals`** ✅

> *"Judge fallibility: The auxiliary model judge can mark goals complete prematurely or continue
> unnecessarily"*; "Single-session scope."

**From `features/mcp`, `features/codex-app-server-runtime`** ✅

> *"Stdio-only transport currently supported (no native HTTP server mode)."* `delegate_task`, `memory`,
> `session_search`, `todo` "become unavailable on this runtime."

**From `getting-started/quickstart`** ✅

> *"Hermes Agent requires a model with at least 64,000 tokens of context."*

**From `AGENTS.md`** ✅

> *"extended primarily through plugins and skills, not by growing the core"*; "A plugin that needs to
> edit core files is a design smell."

</details>

## 9. Sources

<details>
<summary>Primary · secondary · placement · diagrams not redrawn</summary>

**All primary sources accessed 2026-09-02. No source was re-read at the 2026-09-07 restructure.**

**Primary — GitHub API and repo.** `gh api repos/NousResearch/hermes-agent` · `.../releases/latest` and `.../releases?per_page=100&page=1` · `.../tags?per_page=100` · `.../contents/` (root, `/docs`, `/docs/observability`, `/docs/middleware`, `/docs/security`, `/docs/kanban`, `/evals` and subdirectories, `/plugins`, `/website/docs` and subdirectories).

**Primary — files.** `README.md` · `LICENSE` · `AGENTS.md` · `SECURITY.md` · `SOUL.md` · `pyproject.toml` · `docs/observability/{README,monitoring}.md` · `docs/security/network-egress-isolation.md`.

**Primary — docs site.** `hermes-agent.nousresearch.com` — `/docs/getting-started/quickstart`; `/docs/user-guide/{configuration,cli,security,sessions,profiles,which-file-does-what,bot-mode, managed-scope,checkpoints-and-rollback,profile-distributions,git-worktrees,docker, import-from-other-agents,configuring-models,desktop,tui}`; `/docs/user-guide/features/{overview,skills, memory,memory-providers,honcho,delegation,cron,context-files,context-references,mcp,tools,hooks, plugins,built-in-plugins,kanban,kanban-worker-lanes,goals,loops,heartbeat,deliverable-mode,curator, personality,api-server,web-dashboard,acp,provider-routing,mixture-of-agents,code-execution, tool-search,codex-app-server-runtime,batch-processing,lsp}`; `/docs/user-guide/messaging/*`; `/docs/developer-guide/{architecture,agent-loop,trajectory-format,contributing,codebase-ownership, context-compression-and-caching,subagent-lifecycle-api}`; `/docs/reference/{cli-commands, slash-commands,environment-variables,toolsets-reference,skills-catalog, automation-blueprints-catalog}`.

**Secondary (↪).** hermes-agent.org/about, layer3labs.io/guides/hermes-agent-explained, petronellatech.com — release-date corroboration only. Tom Crawshaw (The AI Architects), *Every Hermes Agent Concept Explained for Normal People*, YouTube `lGtBPrSrnjY`, 2026-08-24 — a practitioner walkthrough read at the v1 pass; two field corrections it surfaced (the cron job `skill`/`skills` field at `9c`, and the voice-channel-join surface at `11a`) were checked against the docs and carried into §6 above, marked accordingly. Its other operator-side observations (a manual-compaction ritual, prose-based model routing, a kanban demo) were not carried into this restructure — they read as comparisons to other harnesses and practitioner narrative rather than component facts, which rule 9 now excludes from a profile page; the material stands in the v1 file's git history.

**Placement.** Short-profiles row: [`archive/comparisons/systems/90-short-profiles.md`](../archive/comparisons/systems/90-short-profiles.md) · grid columns: [`components/ALIGNMENT.md`](../components/ALIGNMENT.md) §2 and [`components/MATRIX.md`](../components/MATRIX.md) §1 · index row: [`index.md`](../index.md) · positioning: [`spectrums/positioning.md`](../spectrums/positioning.md).

**Diagrams not redrawn.** **No diagram inventory was taken at the 2026-09-02 read.** Whether Hermes's docs contain vendor diagrams (e.g. the agent-loop or kanban-lifecycle pages) is unknown and unrecorded — a gap in the read, not a finding about the vendor. The diagram pass (W8c) opens the sources and records what it finds.

</details>

## 10. Unverified

<details>
<summary>9 items</summary>

- **Exact first public release date.** GitHub releases API returns only 8 releases (Aug 2026 onward); oldest version tag is `v2026.3.12`; repo created 2025-07-22. The "2026-02-25" launch date is from secondary sources only. ↪
- **Automation Blueprint names** — the catalog page renders client-side; no names captured. ⚠️
- **Full verbatim README** — fetched via a summarizing step; feature bullets and commands are as returned, not every sentence was captured.
- **`docs/middleware/README.md` content** — only the file listing was read, not the content. ⚠️
- **`hermes project` subcommand list** — taken from a search snippet of the docs' cli-commands page, not the page body. ↪
- **Third-party adapters "for" Hermes** (VS Code ACP Client extension listing, Buzz Desktop runtime detection) — stated on Hermes docs; not verified at those projects. ⚠️
- **Whether `/todo` exists as a slash command** — the `todo` *tool* is documented; no `/todo` slash command appeared in the slash-commands reference.
- **Any spend/budget cap** (dollars or tokens per session) — none found in configuration, env-vars, or insights pages; absence not proven past what was checked.
- **Tests count "~17k tests across ~900 files"** — from `AGENTS.md` dated "as of May 2026"; not re-counted.

**Added at the 2026-09-07 restructure, and not source questions:** **no diagram inventory exists** for this harness (§2, §3, §9); the **Profile primitive's verbatim definition and source citation are missing from the v1 read** — the table row was truncated mid-sentence (§5); the practitioner video's non-factual, cross-harness-comparing observations were dropped per rule 9 rather than carried forward (§9).

</details>
