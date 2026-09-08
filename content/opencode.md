---
title: "OpenCode — the coding harness with an org-grade permission ladder"
tier: reference
project: harness-atlas
created: "2026-09-02"
updated: "2026-09-07"
status: DRAFT
owner: KD
source: "github.com/anomalyco/opencode (formerly sst/opencode) @ v1.18.26 · opencode.ai/docs · read 2026-09-02"
provenance: OBSERVED
template: "v2 (restructured from the v1 read of 2026-09-02, no re-read)"
verification:
  derived_from:
    - "github.com/anomalyco/opencode (formerly sst/opencode) @ v1.18.26 · opencode.ai/docs · read 2026-09-02"
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

# OpenCode — Anomaly

***A Bun/TypeScript client-server coding agent whose defining move is a mechanical permission ladder — `allow`/`ask`/`deny` globs where a denied rule survives `--auto` and a global policy overrides a project's attempt to re-enable it — merged up a nine-rung configuration chain into managed settings and MDM.***

> **Profile drafted 2026-09-02 by `claude-opus-5`, not yet verified.** Attested, not captured — see `verification:` above.

## 1. At a glance

| | |
|---|---|
| **Altitude** | Runtime — runs the loop itself (Bun/TypeScript client-server); ships an ACP server, `serve` API and SDK for embedding → [§7](#7-identity-and-inclusion-test) |
| **Primitives** | 10, ⚠️ contestable — agent · command · skill · plugin · tool · permission · rules · MCP server · reference · policy → [§5](#5-primitives) |
| **Structured output** | ⚠️ not stated at the v1 read → [§10](#10-unverified) |
| **Binds mechanically?** | Yes, in several layers — `permission` allow/ask/deny, `deny` surviving `--auto` → [2c](#2c-enforcement) |
| **State persists** | SQLite `opencode.db` at `~/.local/share/opencode/`, resumable and forkable; no memory feature → [5a](#5a-individual-memory) |
| **Serves** | One operator per session process; enterprise SSO, MDM and Zen admin/member roles sit above it → [10b](#10b-org) |
| **Refuses** | No published refusal list — checked README and docs nav, found no non-goals section → [§5](#5-primitives) |
| **Coverage** | ● 10 · ◐ 13 · ○ 10 · n/a 0 → [§4](#4-component-matrix) |
| **Source** | anomalyco/opencode @ v1.18.26 (formerly `sst/opencode`) · `opencode.ai/docs` · read 2026-09-02 |
| **Unverified** | 9 items → [§10](#10-unverified) |

### 1a. Positioning stats

`+1 · +1 · +2 · −3 · +2† · +2 · +1` — the seven DX dimensions, in order.

> **⚠️ Drafted 2026-09-07, not yet verified.** Derived entirely from OpenCode's own docs, README,
> CONTRIBUTING and repo/API facts already in this profile — no source reopened for scoring. No
> person has re-read these seven values yet. [`01-scorecard.md`](../spectrums/01-scorecard.md) §1
> R11 says how the banner comes off.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `────●──` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Context | nothing survives | `●──────` | shared, durable, retrievable |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `─────●─` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `────●──` | observability, efficiency, routing |

**†** the one **graded** dimension; every other row is a position, not a score. **Neither end is better.** Ten axes sit beneath these seven — `I +1 · II +1 · III +2 · IV +3 · V +3 · VI +2 · VII +2 · VIII 0 · IX −2 · X +1` — and four of them feed no cell above by design.

→ [`spectrums/positioning.md`](../spectrums/positioning.md) · [`positions/opencode.yaml`](../spectrums/positions/opencode.yaml) · [`01-scorecard.md`](../spectrums/01-scorecard.md) · [`00-README.md`](../spectrums/00-README.md)

*Scored 2026-09-07 against this profile as read 2026-09-02. This table is the **one sanctioned echo** of the scorecard — derived from the same YAML that renders `positioning.md`. Re-score in the YAML, never here.*

### 1b. Contents

[§1 At a glance](#1-at-a-glance) · [1a Positioning stats](#1a-positioning-stats) · [§2 System map](#2-system-map) · [§3 Workflows](#3-workflows) · [§4 Component matrix](#4-component-matrix) · [§5 Primitives](#5-primitives) · [§6 Details](#6-details) · [§7 Identity and inclusion test](#7-identity-and-inclusion-test) · [§8 Limits](#8-limits) · [§9 Sources](#9-sources) · [§10 Unverified](#10-unverified)

**Deep read** — [`content/opencode/`](opencode/00-README.md), a 9-document configuration and
extensibility reference set at a finer grain than §6:
[config and rules](opencode/01-config-and-rules.md) · [permissions](opencode/02-permissions.md) ·
[policies](opencode/03-policies.md) · [agents](opencode/04-agents.md) ·
[the tool registry](opencode/05-the-tool-registry.md) ·
[skills and commands](opencode/06-skills-and-commands.md) ·
[plugins, hooks and events](opencode/07-plugins-hooks-and-events.md) ·
[the consolidated guide](opencode/20-consolidated-guide.md)

*Read 2026-09-08 at `v1.18.29`, six days and three releases after this profile's source read. Its
scope is the configurable surface only — the TUI, desktop, web, server, SDK, ACP, GitHub, GitLab and
Slack surfaces of [11a](#11a-surfaces), the provider catalogue of [0a](#0a-substrate), and formatters
and LSP are deliberately outside it.*

## 2. System map

**Diagram inventory not done at the 2026-09-02 read — pending the diagram pass (W8c).** No `assets/projects/opencode/` exists, and no vendor diagram was inventoried at the source read. A recorded gap, not an absence: the read predates the diagram obligation.

**How it thinks about work.** A unit of work is one turn inside a session, mediated by an agent — **build** (full access) or **plan** (read-only) — carrying its own permission profile. The loop is the Bun/TypeScript process itself, calling providers through the Vercel AI SDK; most tool calls pass through the `permission` ladder (`allow`/`ask`/`deny`, last-match-wins, `deny` surviving `--auto`) before they execute, and a handful — `doom_loop`, `external_directory`, `.env` reads — are gated even when nothing else is. A session is a SQLite row plus a snapshot chain, resumable and reversible via `/undo`. Work lands as file edits and shell effects, or — through the GitHub Action, GitLab component or Slack bot — as a branch, a PR, an MR reply or a thread message.

## 3. Workflows

**Not written at the 2026-09-02 read — pending the diagram pass (W8c).** A recorded gap. Three sequences a workflow pass should draw, each already evidenced in §6:

1. **The turn and the permission gate** — prompt → agent selection (`build`/`plan`) → tool call → `permission` check (a `tool.execute.before` hook may throw to block) → execution → session write to SQLite ([2c](#2c-enforcement), [3a](#3a-control), [8b](#8b-evidence)).
2. **Configuration resolution up the nine-rung ladder** — remote `.well-known/opencode` → global → `OPENCODE_CONFIG` → project → `.opencode/` dirs → inline env → managed settings → macOS MDM ([3d](#3d-configuration)).
3. **GitHub/GitLab delegation** — an `/opencode` or `/oc` comment trigger → branch and PR, or a commit to the existing PR / an MR reply ([6d](#6d-delivery), [11a](#11a-surfaces)).

## 4. Component matrix

`● named primitive · ◐ partial, present-not-first-class · ○ absent (pages named in §6) · n/a does not apply at this altitude`

**Marks copied verbatim from OpenCode's column in [`04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2; not re-derived at the restructure.**

| # | Component | Mark | Primitive / note |
|---|---|:-:|---|
| **0 · Foundation** | | | |
| [0a](#0a-substrate) | Substrate | ● | 75+ providers via the AI SDK + models.dev; first-party Zen/Go gateways |
| **1 · Environment** | | | |
| [1a](#1a-environment) | Environment | ◐ | Local shell/filesystem/web tools; `references` mounts dirs; no sandbox shipped |
| **2 · Agent Harness** | | | |
| [2a](#2a-adapters--middleware) | Adapters & Middleware | ● | [**MCP server**](#5-primitives) + plugin `tool`/hook registry; AI SDK abstraction |
| [2b](#2b-hooks) | Hooks | ● | [**Plugin**](#5-primitives) — 20 typed hook keys + ~25 bus events, JS/TS |
| [2c](#2c-enforcement) | Enforcement | ● | [**Permission**](#5-primitives) allow/ask/deny, survives `--auto`; [**Policy**](#5-primitives) for providers |
| **3 · System Stacks** | | | |
| [3a](#3a-control) | Control | ● | build/plan agents; `ask` approvals; `question` tool; non-interactive `run` |
| [3b](#3b-routing) | Routing | ◐ | Per-agent `model`/`small_model`; manual selection, no resolver |
| [3c](#3c-composition) | Composition | ● | [**Agent**](#5-primitives) — Markdown + frontmatter, `mode: primary\|subagent\|all` |
| [3d](#3d-configuration) | Configuration | ● | [**Rules**](#5-primitives) + nine-rung config ladder to managed settings/MDM |
| [3e](#3e-standards) | Standards | ○ | No shipped rules pack; formatters and LSP are the vehicles |
| **4 · Capabilities** | | | |
| [4a](#4a-capability) | Capability | ● | [**Skill**](#5-primitives) · [**Plugin**](#5-primitives) · [**Tool**](#5-primitives) · [**MCP server**](#5-primitives) · [**Reference**](#5-primitives); no marketplace |
| [4b](#4b-capability-permissions) | Capability Permissions | ● | `permission.skill`/`tools` globs; per-agent frontmatter; MCP tool gating |
| **5 · Context ⟳** | | | |
| [5a](#5a-individual-memory) | Individual Memory | ○ | No memory feature; SQLite session history + `AGENTS.md` only |
| [5b](#5b-team-memory) | Team Memory | ○ | Committed `AGENTS.md` + org remote config; no shared learning |
| [5c](#5c-knowledge) | Knowledge | ○ | No RAG/embeddings; grep/glob/LSP symbols + `references` + community MCPs |
| **6 · Workspaces ⟳** | | | |
| [6a](#6a-product) | Product | ○ | No PRD/spec object |
| [6b](#6b-infrastructure) | Infrastructure | ◐ | Local by default; `serve`+`attach`; experimental workspace-adapter API |
| [6c](#6c-estate) | Estate | ◐ | [**Reference**](#5-primitives) — aliased external dirs/repos; no cross-repo impact analysis |
| [6d](#6d-delivery) | Delivery | ◐ | GitHub Action + GitLab CI/Duo open PRs/MRs from a comment |
| **7 · Workflow Tasks** | | | |
| [7a](#7a-workflow-tasks) | Workflow Tasks | ◐ | `todowrite` tool + [**Command**](#5-primitives) templates; no ticket/plan object |
| **8 · Trust** | | | |
| [8a](#8a-evals) | Evals | ○ | Nothing shipped for users; project's own CI/tests only |
| [8b](#8b-evidence) | Evidence | ◐ | Share pages, `/export`+`import`, `run --format json`; no receipt-bound gate |
| [8c](#8c-observability) | Observability | ◐ | OpenTelemetry in source, undocumented; logs; SSE `/event` stream |
| [8d](#8d-efficiency) | Efficiency | ◐ | Auto-compaction, `small_model`, `steps` cap, `opencode stats`; no spend cap |
| **9 · IMPROVE** | | | |
| [9a](#9a-learning) | Learning | ○ | No auto-capture; `/init` one-shot `AGENTS.md` regeneration only |
| [9b](#9b-rituals) | Rituals | ○ | Nothing shipped; users encode as [**Command**](#5-primitives)s or agents |
| [9c](#9c-cadence) | Cadence | ○ | No scheduler; event-triggered via GitHub/GitLab/Slack only |
| [9d](#9d-anti-fragile-lifecycle) | Anti-fragile Lifecycle | ◐ | Resume/fork/undo, `doom_loop` guard, staged migrations; no defect ledger |
| [9e](#9e-raise-the-floor) | Raise the Floor | ◐ | `/init`, agent/MCP/GitHub wizards, `$schema`; no `doctor` command |
| [9f](#9f-diagnose-the-bottleneck) | Diagnose the Bottleneck | ○ | Nothing beyond `opencode stats`; no maturity scoring |
| **10 · Teams & Agents** | | | |
| [10a](#10a-roster) | Roster | ◐ | Named agents (build/plan/general/explore/scout); no identity/registry beyond the name |
| [10b](#10b-org) | Org | ◐ | `ask` permissions + enterprise SSO/MDM/Zen roles; no RACI |
| **11 · Surfaces** | | | |
| [11a](#11a-surfaces) | Surfaces | ● | TUI, desktop, web, server, SDK, IDE ext, ACP, GitHub/GitLab, Slack |
| **● 10 · ◐ 13 · ○ 10 · n/a 0** | | | |

## 5. Primitives

| Primitive | Path / key | Project's own definition (verbatim) | Source |
|---|---|---|---|
| Agent | `.opencode/agents/<name>.md`; `agent.<name>` in `opencode.json`; `opencode agent create` | *"Agents are specialized AI assistants that can be configured for specific tasks and workflows. They allow you to create focused tools with custom prompts, models, and tool access."* | ✅ `/docs/agents/` |
| Command | `.opencode/commands/<name>.md`; `command.<name>`; invoked `/name` | Frontmatter `template` (required), `description`, `agent`, `model`, `subtask`; `$ARGUMENTS`, `` !`cmd` ``, `@file` | ✅ `/docs/commands/` |
| Skill | `.opencode/skills/<name>/SKILL.md`; plus `.claude/skills/`, `.agents/skills/` | *"reusable instructions that OpenCode discovers from your repository or home directory"*, loaded *"on-demand through a native `skill` tool"* | ✅ `/docs/skills/` |
| Plugin | `.opencode/plugins/*.ts`; `plugin: ["pkg"]`; `opencode plugin <module>` | *"Plugins allow you to extend OpenCode by hooking into various events and customizing behavior."* | ✅ `/docs/plugins/`, raw `plugin/src/index.ts` |
| Tool (custom) | `.opencode/tools/<name>.ts`; `tool()` helper | Filename becomes the tool name; zod args; *"Custom tools override built-in tools with the same name."* | ✅ `/docs/custom-tools/` |
| Permission | `permission.<tool>` in `opencode.json`; per-agent frontmatter | *"decide whether a given action should run automatically, prompt you, or be blocked"* — `allow`/`ask`/`deny` | ✅ `/docs/permissions/` |
| Rules | `AGENTS.md` (walks up; `CLAUDE.md` fallback); `instructions: [...]`; `/init` | Instruction files applied to a directory and its subdirectories, stated precedence order | ✅ `/docs/rules/` |
| MCP server | `mcp.<name>: {type, command\|url, ...}`; `opencode mcp add\|list\|auth\|debug` | *"extend OpenCode with external tools via the Model Context Protocol"*; tools *"automatically become available to the LLM"* | ✅ `/docs/mcp-servers/` |
| Reference *(newer)* | `references.<alias>: {path\|repository, branch, description, hidden}` | Grants access to *"directories outside the current project... other repositories"* | ✅ `/docs/references/` |
| Policy *(experimental)* | `experimental.policies: [{effect, action: "provider.use", resource}]` | *"control whether OpenCode may use configured resources like LLM providers"* — global overrides project | ✅ `/docs/policies/` |
| (supporting) models.dev catalog | provider/model registry behind `/models`, `/connect` | Model listing service backing `model`/`provider.<id>` — not user-authored | ✅ `/docs/providers/` |
| (supporting) SQLite session store | `~/.local/share/opencode/opencode.db`; `opencode db query\|path` | The harness's own state store, not a unit a user authors | ✅ raw `database.ts` |

**Legacy note.** A `modes/` directory is still accepted *"for backwards compatibility"*, but `/docs/modes/` 404s; that **Agent** superseded **Mode** is inferred (◐), not vendor-stated.

**Count:** 10 primitives (8 core + 2 newer), 2 supporting *(as counted at the 2026-09-02 read)*. **Verdict:** ⚠️ contestable — past the 5–7 healthy band, short of 12+ accommodation failure, and with **no published refusal list** to narrow it the way Pi's does. Leans accommodation rather than disciplined subtraction; `references` and `policies` are recent additions and whether the set keeps growing past 10 is not observable from one read.

**No refusal list.** Checked the README and every docs-nav page for a non-goals section; none exists — the card reads *"no published refusal list"* rather than quoting one.

## 6. Details

`✅ direct · ↪ relayed · ⚠️ unverified`

### 0 · Foundation

#### 0a Substrate
<details>
<summary>● 75+ providers via the AI SDK + models.dev; first-party Zen/Go gateways</summary>

**Ships.** Model-agnostic via the Vercel AI SDK plus models.dev — *"75+ LLM providers"* (Anthropic, OpenAI, Google Vertex, Bedrock, Azure, OpenRouter, Ollama, Copilot, Groq, xAI, DeepSeek, Together, Hugging Face, local llama.cpp/LM Studio, any OpenAI-compatible endpoint). First-party gateways **Zen** (pay-per-token) and **Go** ($10/mo, 25 models). Model variants per provider. 
**Path.** `model`, `small_model`, `provider.<id>.*`; `/models`, `/connect`; `--model`, `--variant` 
**Source.** ✅ `/docs/providers/`, `/docs/models/`, `/docs/zen/`, `/docs/go/`

</details>

### 1 · Environment

#### 1a Environment
<details>
<summary>◐ Local shell/filesystem/web tools; <code>references</code> mounts dirs; no sandbox shipped</summary>

**Ships.** Local shell (`bash`; `!` runs shell), filesystem (read/edit/write/glob/grep/apply_patch), web (`webfetch`; `websearch` gated by env flags), LSP diagnostics. Local machine by default; remote via `opencode serve` + `attach`. `external_directory` permission gates paths outside cwd; `references` mounts other dirs/repos. No browser tool, no container sandbox shipped. 
**Path.** `permission.external_directory`; `references` key; `opencode serve`/`attach` 
**Source.** ✅ `/docs/tools/`, `/docs/permissions/`, `/docs/references/`, `/docs/server/`

**More.** [`02-permissions.md`](opencode/02-permissions.md) §8 — the absence of any documented sandbox or threat model, naming the five pages checked · §6 — how a configured `reference` is auto-allowed through the `external_directory` boundary while normal tool permissions still apply

</details>

### 2 · Agent Harness

#### 2a Adapters & Middleware
<details>
<summary>● <b>MCP server</b> + plugin <code>tool</code>/hook registry; AI SDK abstraction</summary>

**Ships.** Provider abstraction via `@ai-sdk/*` + models.dev. Tool registry: built-ins + `.opencode/tools/*.ts` + MCP + plugin `tool` hook (collision overrides built-ins). MCP client (local or remote, OAuth with Dynamic Client Registration; `opencode mcp add|list|auth|debug`). Middleware via plugin hooks `chat.params`, `chat.headers`, `tool.definition`, two `experimental.chat.*.transform` hooks; `provider` and `auth` hooks. 
**Path.** `mcp` key; `plugin` key; `packages/plugin/src/index.ts` Hooks type 
**Source.** ✅ `/docs/mcp-servers/`, `/docs/plugins/`, `/docs/custom-tools/`

**More.** [`05-the-tool-registry.md`](opencode/05-the-tool-registry.md) — the four tool sources in one namespace, MCP local/remote option tables, OAuth with RFC 7591, the `<server>_<tool>` prefix rule and the one stated collision rule · [`07-plugins-hooks-and-events.md`](opencode/07-plugins-hooks-and-events.md) §2 — the plugin context including `serverUrl` and `experimental_workspace`

</details>

#### 2b Hooks
<details>
<summary>● <b>Plugin</b> — 20 typed hook keys + ~25 bus events, JS/TS</summary>

**Ships.** Twenty typed plugin hook keys — `dispose`, `event`, `config`, `tool`, `auth`, `provider`, `chat.message`, `chat.params`, `chat.headers`, `permission.ask`, `command.execute.before`, `tool.execute.before`/`after`, `tool.definition`, `shell.env`, four `experimental.*` transforms — plus ~25 bus event names for the `event` hook (command, file, installation, LSP, message, permission, server, session, todo, TUI). JS/TS, not shell scripts. 
**Path.** `.opencode/plugins/*.ts`; npm via `plugin: [...]` 
**Source.** ✅ `/docs/plugins/`, raw `plugin/src/index.ts`

**More.** [`07-plugins-hooks-and-events.md`](opencode/07-plugins-hooks-and-events.md) — every hook key with what it can change, the four-step load order, and the event inventory. **`packages/plugin/src/index.ts` defines 21 hook keys and the SDK's `Event` union 32 types as of 2026-09-08**; this row's 20 and ~25 are the 2026-09-02 read

</details>

#### 2c Enforcement
<details>
<summary>● <b>Permission</b> allow/ask/deny, survives <code>--auto</code>; <b>Policy</b> for providers</summary>

**Ships.** `permission.<tool>`: `allow`/`ask`/`deny`, glob, last-match-wins; defaults allow except `doom_loop`/`external_directory` (ask) and `*.env` reads (deny). `--auto` approves what is not explicitly denied — **`deny` rules are still enforced.** `tools.<name>: false` removes a tool. Per-agent `permission` overrides global. `experimental.policies` (`deny provider.use`) — *"global policies override project policies."* A plugin `tool.execute.before` may throw to block. No OS sandbox shipped (see [1a](#1a-environment), [6b](#6b-infrastructure)). 
**Path.** `opencode.json` `permission`, `tools`, `experimental.policies` 
**Source.** ✅ `/docs/permissions/`, `/docs/policies/`, `/docs/plugins/`

**More.** [`02-permissions.md`](opencode/02-permissions.md) — the ladder in full: three published key inventories reconciled against the schema, the wildcard grammar, the shipped `.env` defaults, what `--auto` leaves standing, and the `permission.ask` hook · [`03-policies.md`](opencode/03-policies.md) — the statement shape and the global-over-project inversion

</details>

### 3 · System Stacks

#### 3a Control
<details>
<summary>● build/plan agents; <code>ask</code> approvals; <code>question</code> tool; non-interactive <code>run</code></summary>

**Ships.** Two primary agents: **build** (full access) and **plan** (read-only) — Tab cycles. Per-call `ask` prompts. A `question` tool lets the agent ask the user mid-run. `steps` caps iterations per agent. `opencode run` is non-interactive (`--auto`, `--format json`, `--title`, `--file`). Session contract via `POST /session/:id/message` (sync) or `prompt_async`. 
**Path.** `permission`; `steps`; CLI `run` 
**Source.** ✅ `/docs/agents/`, `/docs/tools/`, `/docs/cli/`

</details>

#### 3b Routing
<details>
<summary>◐ Per-agent <code>model</code>/<code>small_model</code>; manual selection, no resolver</summary>

**Nothing here** as an automatic resolver — checked `/docs/agents/`, `/docs/models/`, `/docs/config/`. 
**What exists instead.** Per-agent `model`/`temperature`/`top_p`/`variant`; `small_model` for lightweight tasks; `default_agent`; subagent selection *"based on descriptions"* by the primary agent or `@mention`; `permission.task` restricts targets; `subagent_depth` (default 1). 
**Source.** ✅ `/docs/agents/`, `/docs/models/`, `/docs/config/`

</details>

#### 3c Composition
<details>
<summary>● <b>Agent</b> — Markdown + frontmatter, <code>mode: primary|subagent|all</code></summary>

**Ships.** An **agent** is a Markdown file with frontmatter (`description` required, `mode: primary|subagent|all`, `model`, `prompt`, `steps`, `permission`, `color`, `hidden`) plus a body as system prompt, or JSON `agent.<name>`. Built-ins: build, plan (primary); general, explore, scout (subagents); compaction, title, summary (hidden). `opencode agent create` runs a wizard. 
**Path.** `~/.config/opencode/agents/*.md`, `.opencode/agents/*.md`; `agent` key 
**Source.** ✅ `/docs/agents/`

**More.** [`04-agents.md`](opencode/04-agents.md) — every option key with its default, the eight built-ins including the three hidden system agents, child-session navigation, and the legacy `mode` object's fold into `agent`

</details>

#### 3d Configuration
<details>
<summary>● <b>Rules</b> + nine-rung config ladder to managed settings/MDM</summary>

**Ships.** Instruction files `AGENTS.md` (walks up), `CLAUDE.md` fallback, `~/.config/opencode/AGENTS.md`; `instructions: [...]` (globs, remote URLs). Config: `opencode.json`/`.jsonc` (project), global config, `OPENCODE_CONFIG*` env vars. Precedence low→high: remote `.well-known/opencode` → global → `OPENCODE_CONFIG` → project → `.opencode/` dirs → inline env → managed settings → macOS MDM. *"Merged together, not replaced."* 
**Path.** as listed 
**Source.** ✅ `/docs/rules/`, `/docs/config/`

**More.** [`01-config-and-rules.md`](opencode/01-config-and-rules.md) — all eight numbered rungs, the three loading points documented or implemented outside them, the merge semantics (`instructions` is the one unioned array), the MDM plist paths, and the `AGENTS.md` chain's first-match-wins rule

</details>

#### 3e Standards
<details>
<summary>○ No shipped rules pack; formatters and LSP are the vehicles</summary>

**Nothing here** as a shipped standard — checked `/docs/formatters/`, `/docs/lsp/`, `/docs/rules/`. 
**What exists instead.** Formatters (biome, prettier, ruff, gofmt, rustfmt, custom `command`), disabled by default. 30+ LSP servers feed diagnostics back. `AGENTS.md` is user-authored; `/init` *"references existing rule sources like Cursor rules."* 
**Source.** ✅ `/docs/formatters/`, `/docs/lsp/`, `/docs/rules/`

</details>

### 4 · Capabilities

#### 4a Capability
<details>
<summary>● <b>Skill</b> · <b>Plugin</b> · <b>Tool</b> · <b>MCP server</b> · <b>Reference</b>; no marketplace</summary>

**Ships.** Five resource types. Skills follow the Agent Skills standard, discovered from four directory roots plus Claude/Codex-compatible dirs. Plugins (npm, auto-installed by Bun, or local). Custom tools. Commands. MCP servers. References mount external dirs/repos. **No first-party marketplace** — the ecosystem page lists 26 community plugins, 11 projects, 2 agent packs. 
**Path.** as listed 
**Source.** ✅ `/docs/skills/`, `/docs/plugins/`, `/docs/references/`, `/docs/ecosystem/`

**More.** [`06-skills-and-commands.md`](opencode/06-skills-and-commands.md) — the six skill discovery roots, the name regex and 1–1024-character description limit, the `<available_skills>` block, and the command template's three substitutions · [`05-the-tool-registry.md`](opencode/05-the-tool-registry.md) — custom-tool naming and the `<filename>_<exportname>` rule

</details>

#### 4b Capability Permissions
<details>
<summary>● <code>permission.skill</code>/<code>tools</code> globs; per-agent frontmatter; MCP tool gating</summary>

**Ships.** `permission.skill` with globs; `tools: {skill: false}` disables skills entirely; per-agent skill/tool permission in frontmatter; MCP tools gated by `tools` globs, re-enabled per-agent; `permission.task` globs which subagents may spawn (denied ones removed from the Task tool's own description); `experimental.policies` for providers. 
**Path.** `permission`, `tools`, agent frontmatter 
**Source.** ✅ `/docs/skills/`, `/docs/mcp-servers/`, `/docs/policies/`

**More.** [`02-permissions.md`](opencode/02-permissions.md) §§2, 6 — which keys accept the object form, why the key set is open (`additionalProperties` in the schema), and the carve-out that lets an operator `@`-mention a subagent `permission.task` denies

</details>

### 5 · Context ⟳

#### 5a Individual Memory
<details>
<summary>○ No memory feature; SQLite session history + <code>AGENTS.md</code> only</summary>

**Nothing here** — checked README, docs nav, config page; a code search for `embedding` under `packages/opencode/src` returned zero hits. 
**What exists instead.** Persistent session history in SQLite plus `project/<slug>/storage/`; user-authored `~/.config/opencode/AGENTS.md`; resumable transcripts. No auto-captured memory file. Community plugin `opencode-supermemory` exists on the ecosystem page. 
**Source.** ✅ `/docs/troubleshooting/`, `/docs/rules/`

</details>

#### 5b Team Memory
<details>
<summary>○ Committed <code>AGENTS.md</code> + org remote config; no shared learning</summary>

**Nothing here** — checked `/docs/rules/`, `/docs/config/`. 
**What exists instead.** Committed `AGENTS.md` *"for team consistency"*, org remote config at `.well-known/opencode`, shared transcripts via `/share` — file sharing, not shared learning. 
**Source.** ✅ `/docs/rules/`, `/docs/config/`, `/docs/ecosystem/`

</details>

#### 5c Knowledge
<details>
<summary>○ No RAG/embeddings; grep/glob/LSP symbols + <code>references</code> + community MCPs</summary>

**Nothing here** — a code search for `embedding` returned zero hits. 
**What exists instead.** Retrieval by `grep`/`glob`/LSP workspace symbols, `webfetch`, `websearch`, `references` for external repos, and community MCPs (Context7, Grep by Vercel) named in examples. 
**Source.** ✅ `/docs/tools/`, `/docs/mcp-servers/`

</details>

### 6 · Workspaces ⟳

#### 6a Product
<details>
<summary>○ No PRD/spec object</summary>

**Nothing here** — checked the docs index and config pages. No PRD or spec object; work lands directly in the working tree, and GitHub/GitLab bots act on issues, PRs and MRs. 
**Source.** ✅ (absence recorded at the 2026-09-02 read)

</details>

#### 6b Infrastructure
<details>
<summary>◐ Local by default; <code>serve</code>+<code>attach</code>; experimental workspace-adapter API</summary>

**Ships.** Local process by default. Remote: `opencode serve` + `attach [url]`, `opencode web --hostname 0.0.0.0`, mDNS. GitHub Action / GitLab CI run it on runners. `experimental_workspace.register(type, adapter)` — a plugin API for isolated workspaces; community `opencode-daytona` runs sessions in isolated Daytona sandboxes. `packages/containers` is CI images only, not an agent sandbox.
**Path.** plugin `experimental_workspace`; CLI 
**Source.** ✅ `/docs/server/`, raw `example-workspace.ts`, `/docs/ecosystem/`

</details>

#### 6c Estate
<details>
<summary>◐ <b>Reference</b> — aliased external dirs/repos; no cross-repo impact analysis</summary>

**Ships.** `references.<alias>`: an alias to a local `path` or a Git `repository`, surfaced in `@` autocomplete and system context; `external_directory` permission gates paths outside cwd. No cross-repo impact analysis of any kind. 
**Path.** `references`, `permission.external_directory` 
**Source.** ✅ `/docs/references/`, `/docs/permissions/`

</details>

#### 6d Delivery
<details>
<summary>◐ GitHub Action + GitLab CI/Duo open PRs/MRs from a comment</summary>

**Ships.** GitHub: `opencode github install`; Action triggers on `/opencode`/`/oc` in issue/PR/review comments; *"Create a new branch, implement the changes, and open a PR"* or commit to the same PR. GitLab: CI component `nagyv/gitlab-opencode` and GitLab Duo `@opencode` (triage/implement/review). No deploy step of its own.
**Path.** `.github/workflows/opencode.yml`; GitLab CI include 
**Source.** ✅ `/docs/github/`, `/docs/gitlab/`

</details>

### 7 · Workflow Tasks

#### 7a Workflow Tasks
<details>
<summary>◐ <code>todowrite</code> tool + <b>Command</b> templates; no ticket/plan object</summary>

**Ships.** `todowrite` tool (*"Manage todo lists during coding sessions"*; off for subagents by default) with a `todo.updated` event; the Task tool spawns subagent child sessions; `command` templates with `$ARGUMENTS`, `` !`cmd` ``, `@file`, `subtask: true`. No ticket or plan object. 
**Path.** `todowrite`; `.opencode/commands/*.md` 
**Source.** ✅ `/docs/tools/`, `/docs/commands/`

**More.** [`06-skills-and-commands.md`](opencode/06-skills-and-commands.md) §2 — every command option, `$ARGUMENTS` against positional `$1`…`$n`, and `subtask` forcing a subagent invocation even for a `primary` agent

</details>

### 8 · Trust

#### 8a Evals
<details>
<summary>○ Nothing shipped for users; project's own CI/tests only</summary>

**Nothing here** for user work — checked raw `AGENTS.md`, formatters/LSP pages. 
**What exists instead.** The project's own CI/tests (`bun typecheck`; *"Avoid mocks"*). Formatters and LSP diagnostics are post-edit checks, not a ship gate for user work. 
**Source.** ✅ raw `AGENTS.md`, `/docs/formatters/`, `/docs/lsp/`

</details>

#### 8b Evidence
<details>
<summary>◐ Share pages, <code>/export</code>+<code>import</code>, <code>run --format json</code>; no receipt-bound gate</summary>

**Ships.** Share pages (`opncd.ai/s/<share-id>`; `/unshare` deletes); `/export` (Markdown) in the TUI; `opencode export [--sanitize]`/`import` (JSON); `opencode run --format json` for a raw event stream; a `session.diff` event; file-change snapshots. **Nothing requires an artifact before a unit closes** — evidence exists on demand, not by gate. 
**Path.** as listed 
**Source.** ✅ `/docs/share/`, `/docs/tui/`, `/docs/cli/`

</details>

#### 8c Observability
<details>
<summary>◐ OpenTelemetry in source, undocumented; logs; SSE <code>/event</code> stream</summary>

**Ships.** Logs at `~/.local/share/opencode/log/`, `--log-level DEBUG`. **OpenTelemetry** (`otlp.ts`) reads `OTEL_EXPORTER_OTLP_ENDPOINT`/`_HEADERS`, exporting logs and traces via `@effect/opentelemetry`. **Not documented on the docs site** — a v2 spec draft marks the config key for removal in favour of standard OTel env vars. SSE stream at `GET /event`. 
**Path.** env vars; source 
**Source.** ✅ `/docs/troubleshooting/`; raw `otlp.ts` (docs gap noted)

</details>

#### 8d Efficiency
<details>
<summary>◐ Auto-compaction, <code>small_model</code>, <code>steps</code> cap, <code>opencode stats</code>; no spend cap</summary>

**Ships.** `compaction: {auto: true, prune: false, reserved}`; `/compact`; `session.compacted` event; `small_model` for cheap tasks; `steps` caps iterations *"for users who wish to control costs"*; `opencode stats [--days --tools --models --project]` reports usage and cost; per-provider cache-key setting; Zen/Go usage limits. **No spend budget or limit of any kind.** 
**Path.** config keys; CLI 
**Source.** ✅ `/docs/config/`, `/docs/cli/`, raw `session/llm.ts`

</details>

### 9 · IMPROVE

#### 9a Learning
<details>
<summary>○ No auto-capture; <code>/init</code> one-shot <code>AGENTS.md</code> regeneration only</summary>

**Nothing here** as capture — checked docs nav, rules page. 
**What exists instead.** `/init` regenerates `AGENTS.md` from a repo scan, once, on request — not a capture mechanism, and no stated promotion path from a lesson to an authored capability. 
**Source.** ✅ `/docs/rules/`

</details>

#### 9b Rituals
<details>
<summary>○ Nothing shipped; users encode as <b>Command</b>s or agents</summary>

**Nothing here** — checked `/docs/agents/`, `/docs/commands/`. 
**What exists instead.** Users can encode rituals as commands or agents (docs give "review" and "security auditor" examples), but nothing is shipped or named as a ritual. 
**Source.** ✅ `/docs/agents/`, `/docs/commands/`

</details>

#### 9c Cadence
<details>
<summary>○ No scheduler; event-triggered via GitHub/GitLab/Slack only</summary>

**Nothing here** — a code search for `cron` returned zero hits. 
**What exists instead.** Event-triggered runs only: the GitHub Action on comment events, GitLab CI/Duo, and the Slack bot per thread. 
**Source.** ✅ gh code search; `/docs/github/`, raw `packages/slack/README.md`

</details>

#### 9d Anti-fragile Lifecycle
<details>
<summary>◐ Resume/fork/undo, <code>doom_loop</code> guard, staged migrations; no defect ledger</summary>

**Ships.** Resume via `--continue`/`--fork`; `/undo`/`/redo` over snapshots; `doom_loop` guard (identical call ×3 → ask); auto-compaction with a `reserved` buffer; `session.error` event; `session_interrupt` (Esc); export/import as backup; `Database` migrations; `autoupdate: true|false|"notify"`. **No defect ledger** — recovery is runtime resilience, not a lifecycle. 
**Path.** as listed 
**Source.** ✅ `/docs/config/`, `/docs/cli/`, raw `database.ts`

</details>

#### 9e Raise the Floor
<details>
<summary>◐ <code>/init</code>, agent/MCP/GitHub wizards, <code>$schema</code>; no <code>doctor</code> command</summary>

**Ships.** `/init`, `opencode agent create`, `opencode github install`, `opencode mcp add`, `opencode plugin <module>`, `/connect` provider onboarding, `$schema` for config, `opencode mcp debug`, a curated Zen model list. **No `doctor` command** — checked `/docs/cli/`, `/docs/rules/`. 
**Path.** CLI 
**Source.** ✅ `/docs/cli/`, `/docs/rules/`, `/docs/zen/`

</details>

#### 9f Diagnose the Bottleneck
<details>
<summary>○ Nothing beyond <code>opencode stats</code>; no maturity scoring</summary>

**Nothing here** — checked `/docs/cli/`. No maturity or readiness scoring of any kind; `opencode stats` (usage by day, tool, model, project) is the nearest. 
**Source.** ✅ `/docs/cli/`

</details>

### 10 · Teams & Agents

#### 10a Roster
<details>
<summary>◐ Named agents (build/plan/general/explore/scout); no identity/registry beyond the name</summary>

**Ships.** Named agents — build, plan, general, explore, scout, plus hidden system agents — and user-defined agents; `opencode agent list`; `@name` mentions. **No identity/registry beyond the name** — `packages/identity` exists but is undocumented (⚠️ purpose unverified). 
**Path.** `agent` key; `agents/` dir 
**Source.** ✅ `/docs/agents/`, gh tree

</details>

#### 10b Org
<details>
<summary>◐ <code>ask</code> permissions + enterprise SSO/MDM/Zen roles; no RACI</summary>

**Ships.** Human-in-the-loop posture is `ask` permissions + the `question` tool + `--auto`; `plan` vs `build` agents. Enterprise SSO, central config, gateway-only routing; managed settings and macOS MDM *"enforced automatically."* Zen has *"Team workspace support with admin/member roles"* and per-member usage limits. `opencode serve` uses one basic-auth pair, not per-user accounts. **No ownership, RACI or escalation model.** 
**Path.** as listed 
**Source.** ✅ `/docs/permissions/`, `/docs/enterprise/`, `/docs/zen/`, `/docs/server/`

**More.** [`01-config-and-rules.md`](opencode/01-config-and-rules.md) §§2, 4 — the managed-settings directories, the `ai.opencode.managed` plist paths and MDM deployment, `opencode debug config` as the verification step, and the two inputs that reach the resolved config outside the numbered chain

</details>

### 11 · Surfaces

#### 11a Surfaces
<details>
<summary>● TUI, desktop, web, server, SDK, IDE ext, ACP, GitHub/GitLab, Slack</summary>

**Ships.** A terminal TUI, a beta desktop app (Tauri), a web UI, a headless server (`opencode serve`, OpenAPI + SSE), the `@opencode-ai/sdk`, a VS Code/Cursor/Windsurf/VSCodium extension, ACP (`opencode acp`) for Zed/JetBrains/avante.nvim/CodeCompanion.nvim, a GitHub Action, GitLab CI/Duo, and **Slack** (Socket Mode bot, not on the docs site). Discord and mobile via community projects. **No IDE integration beyond the extension is shipped.** 
**Path.** as listed 
**Source.** ✅ `/docs/`, `/docs/server/`, `/docs/sdk/`, `/docs/acp/`, `/docs/github/`, raw `packages/slack/README.md`, `/docs/ecosystem/`

</details>

## 7. Identity and inclusion test

<details>
<summary>Identity · inclusion test · loop question</summary>

| Field | Value |
|---|---|
| Canonical name | **OpenCode** — npm `opencode-ai`; binary `opencode` ✅ |
| Prior names / homes | Repo was `sst/opencode`; `github.com/sst/opencode` 301s to `github.com/anomalyco/opencode`. Pre-history (a Go-based "opencode" that became Crush) not checked at primary source ⚠️ |
| Owner / maintainer | GitHub org **anomalyco**; LICENSE reads *"Copyright (c) 2025 opencode"* ✅ |
| GitHub URL | `github.com/anomalyco/opencode` (default branch `dev`) ✅ |
| License | **MIT** ✅ |
| Stars | 203,146 stars, 26,458 forks (2026-09-02) ✅ |
| Language | TypeScript (26.9 MB); runtime is **Bun** ✅ |
| Repo created | 2025-04-30 ✅ |
| First release | tag `0.0.45`, 2025-05-14 ✅ |
| Latest release | **v1.18.26**, 2026-09-01; last push 2026-09-02 ✅ |
| Install | curl script; `npm install -g opencode-ai`; brew, pacman, choco, scoop ✅ |
| Website / docs | `opencode.ai/docs`; desktop app (beta) at `opencode.ai/download` ✅ |
| What it says it is, verbatim | *"The open source AI coding agent... available as a terminal-based interface, desktop app, or IDE extension."* ✅ |

**Does state persist across sessions, where, in what format?** **Yes — sessions, messages and todos, no memory feature.** SQLite `opencode.db` (`Database.path()`, `OPENCODE_DB` overridable); `opencode db [query|path]`. Resume via `--continue/-c`/`--fork`; export/import. Snapshots back `/undo`/`/redo`. Instruction state is static `AGENTS.md`, not auto-written memory. ✅

**Does it serve more than one person?** **Primarily one operator per process, with team-facing surfaces above it.** Org config from `.well-known/opencode`, managed settings and MDM *"enforced automatically."* Enterprise SSO, gateway-only routing. Zen's *"Team workspace support with admin/member roles"* and per-member usage limits. `opencode serve` uses one basic-auth pair, not per-user accounts. GitHub Action, GitLab Duo and the Slack bot answer many people, each in its own session. **Verdict:** one operator per instance; team is shared config and bots, not a multi-user session store. ✅

**Does it bind mechanically, or only by prose?** **Mechanically, in several layers.** `permission` (`allow`/`ask`/`deny`, last-match-wins) — *"Explicit `deny` rules are still enforced"* under `--auto`. `tools: {name: false}` removes a tool entirely. `experimental.policies` — *"global policies override project policies."* Plugin hooks can block by throwing. `doom_loop`, `external_directory` and `.env` reads are gated by default. No OS sandbox is shipped; isolation is via a community plugin or the experimental workspace-adapter API. ✅

**Loop question.** **Runs the loop itself.** A Bun/TypeScript client-server app calling providers through the AI SDK, with its own tool registry, permission engine, session store and TUI/web/desktop clients. Adapters it ships *for other harnesses*: none — only compatibility **reads** (`CLAUDE.md` fallback, `.claude/skills/`). Adapters it exposes *to be driven by others*: `opencode acp`, `opencode serve` + SDK, `opencode attach`. Other systems ship adapters for it: kimaki (Discord), opencode.nvim, portal, OpenChamber, CodeNomad, `nagyv/gitlab-opencode`. ✅

**Altitude.** **Runtime.** One operator per session process, its own loop and store, with an ACP server, an HTTP/SSE API and an SDK for anyone who wants to embed or drive it.

</details>

## 8. Limits

<details>
<summary>What it does not claim, in the vendor's words</summary>

**From `/docs/config/`** ✅

> *"Experimental options are not stable. They may change or be removed without notice."*

**From `CONTRIBUTING.md`** ✅

> Accepted: *"Bug fixes"*, *"Additional LSPs / Formatters"*, *"Improvements to LLM performance"*,
> *"Support for new providers"*, *"Fixes for environment-specific quirks"*, *"Missing standard
> behavior"*, *"Documentation improvements."* *"Any UI or core product feature must go through a
> design review with the core team before implementation"* — a PR bypassing this *"will likely be
> closed."*

**From `/docs/enterprise/`** ✅

> *"OpenCode does not store your code or context data. All processing happens locally or through
> direct API calls to your AI provider."* (Exception: `/share` is cached on the opencode.ai CDN.)
> Self-hosted share pages are *"currently on the roadmap."*

**From `/docs/acp/`, `/docs/formatters/`, `/docs/config/`** ✅

> *"Some built-in slash commands like `/undo` and `/redo` are currently unsupported"* over ACP.
> *"Formatters are disabled by default; enable them in your config before OpenCode will run
> them."* Disabling snapshots means *"changes made by the agent cannot be rolled back through the
> UI."* Default `subagent_depth: 1` *"prevents those subagents from launching additional
> subagents."*

**From `/docs/windows-wsl/`, `/docs/share/`, README** ✅

> *"While OpenCode can run directly on Windows, we recommend using Windows Subsystem for Linux
> (WSL)."* *"Only share conversations that don't contain sensitive information."* Third-party
> projects using "opencode" in their name must state they are *"not built by the OpenCode team and
> is not affiliated with us in any way."* The desktop app is *"beta."*

**Deprecations** ✅ `agents.mdx`, `/docs/config/`, `/docs/policies/`

> `maxSteps` → `steps`; agent `tools` *"is **deprecated**. Prefer the agent's `permission`
> field"*; `theme`/`keybinds`/`tui` moved to `tui.json`; `disabled_providers`/`enabled_providers`
> superseded by policies.

**No non-goals section exists in the README or docs** — checked. ✅

</details>

## 9. Sources

<details>
<summary>Primary · secondary · placement · diagrams not redrawn</summary>

**All primary sources accessed 2026-09-02. No source was re-read at the 2026-09-07 restructure.**

**Primary — GitHub API and repo.** `gh api repos/anomalyco/opencode` (stars, forks, license, language, dates) · `.../languages` · `.../releases` (first and last pages) · `.../git/trees/ dev?recursive=1` · `search/code` (`embedding`, `cron`) · the `sst/opencode` 301 redirect check.

**Primary — files.** `README.md` · `LICENSE` · `CONTRIBUTING.md` · `AGENTS.md` · `packages/opencode/package.json` · `packages/plugin/src/index.ts` · `packages/plugin/src/example-workspace.ts` · `packages/core/src/database/database.ts` · `packages/core/src/observability/otlp.ts` · `packages/opencode/src/session/llm.ts` · `packages/slack/README.md` · `specs/v2/config.md` · raw `packages/web/src/content/docs/*.mdx`.

**Primary — docs site.** `opencode.ai/docs/` and every page under `/config/`, `/providers/`, `/models/`, `/agents/`, `/permissions/`, `/policies/`, `/plugins/`, `/rules/`, `/skills/`, `/commands/`, `/custom-tools/`, `/tools/`, `/mcp-servers/`, `/references/`, `/server/`, `/sdk/`, `/cli/`, `/tui/`, `/web/`, `/ide/`, `/acp/`, `/share/`, `/github/`, `/gitlab/`, `/enterprise/`, `/troubleshooting/`, `/formatters/`, `/lsp/`, `/zen/`, `/go/`, `/ecosystem/`, `/windows-wsl/`. 404s noted at read time: `/docs/modes/`, `/docs/desktop/`, `/docs/sessions/`.

**Secondary (↪).** None recorded — every citation above is a primary repo, API, or `opencode.ai/docs` fetch.

**Placement.** Short-profiles row: [`comparisons/systems/90-short-profiles.md`](../comparisons/systems/90-short-profiles.md) §1 (OpenCode was not present there before this read) · grid columns: [`comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2 and [`comparisons/02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 · index row: [`index.md`](../index.md).

**Diagrams not redrawn.** **No diagram inventory was taken at the 2026-09-02 read.** Whether OpenCode's docs contain vendor diagrams is unknown and unrecorded — a gap in the read, not a finding about the vendor. The diagram pass (W8c) opens the sources and records what it finds.

</details>

## 10. Unverified

<details>
<summary>9 items</summary>

- **The lineage before `sst/opencode`** — a Go-based "opencode" that became Crush — not checked at primary source. ⚠️
- **The exact behaviour/purpose of monorepo packages** `identity`, `console`, `enterprise`, `codemode`, `sdk-next`, `session-ui`, `stats`, `function` — only directory names were read. ⚠️
- **Whether `packages/slack` is published and supported** — has a README but no docs-site page. Existence ✅; support status ⚠️.
- **OpenTelemetry export is in source** but undocumented; whether it is enabled in the shipped `latest` channel build was not verified. ⚠️
- **A "Desktop" docs page and a "Sessions" docs page both 404'd** — desktop facts come from the README only. ⚠️
- **Whether the `project/<slug>/storage/` JSON layout** on the troubleshooting page is still live alongside SQLite, or a legacy description — not verified. ⚠️
- **Zen model names and prices** were quoted as fetched, not cross-checked. ◐
- **The 203,146-star figure** is what the GitHub API returned on 2026-09-02, reported as read, not independently cross-checked. ✅ as read.

**Added at the 2026-09-07 restructure, and not a source question:** no single **structured output** artifact is named at the v1 read — candidates are the session database, the share page and the PR or MR itself, but none is stated as *the* one artifact this harness optimises for. §1 marks it accordingly.

</details>
