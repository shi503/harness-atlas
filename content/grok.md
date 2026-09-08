---
title: "Grok Bot / Grok Build — one vendor's hosted teammate and its open-source runtime"
tier: reference
project: harness-atlas
created: "2026-09-02"
updated: "2026-09-07"
status: DRAFT
owner: KD
source: "github.com/xai-org/grok-build @ 72a6125 (2026-09-01, no tags) · docs.x.ai/grok-bot (beta, launched 2026-08-11) · x.ai/news · read 2026-09-02"
provenance: OBSERVED
template: "v2 (restructured from the v1 read of 2026-09-02, no re-read)"
---

# Grok Bot / Grok Build — SpaceXAI

***One vendor, two products, read as a pair because no primary source resolves them into one: Grok Build is an Apache-2.0 Rust runtime with the fullest compatibility surface in this corpus — reading Claude Code's and Cursor's config, hooks and permissions live — while Grok Bot is a closed, hosted teammate taught by demonstration on its own persistent cloud computer.***

## 1. At a glance

| | |
|---|---|
| **Altitude** | Build: runtime, runs the loop itself · Bot: hosted product, loop not user-visible → [§7](#7-identity-and-inclusion-test) |
| **Primitives** | Build 8 ⚠️ contestable · Bot 6 healthy — two products, two sets → [§5](#5-primitives) |
| **Structured output** | ⚠️ not stated at the v1 read |
| **Binds mechanically?** | Build: default no, configured yes (kernel sandbox) · Bot: partly, model-based Auto Review → [2c](#2c-enforcement) |
| **State persists** | Build: session JSONL + Markdown/SQLite memory, off by default · Bot: opaque per-Bot store → [5a](#5a-individual-memory) |
| **Serves** | Build: one operator + fleet-enforced config · Bot: one computer/member, team/org admin roles → [10b](#10b-org) |
| **Refuses** | no published refusal list at the v1 read → [§5](#5-primitives) |
| **Coverage** | ● 19 · ◐ 10 · ○ 4 → [§4](#4-component-matrix) |
| **Source** | xai-org/grok-build @ 72a6125 (no tags) · docs.x.ai/grok-bot (beta) · read 2026-09-02 |
| **Unverified** | 12 items → [§10](#10-unverified) |

### 1a. Positioning stats

`+1 · +1 · +2 · 0 · 0† · +3 · +1` — the seven DX dimensions, in order.

> **⚠️ Drafted 2026-09-07, not yet verified.** Derived from Grok Build's repo and in-tree user guide and from Grok Bot's docs and launch post, read 2026-09-02 — grounded against §4, §5 and §7 below. No person has re-read these seven values yet, and **this file scores a two-product pair on one member** (Grok Build); Grok Bot's divergence is recorded as `split:` in the YAML, not a second card. [`01-scorecard.md`](../spectrums/01-scorecard.md) §1 R11 says how the banner comes off.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `────●──` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Context | nothing survives | `───●───` | shared, durable, retrievable |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▱▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `────●──` | observability, efficiency, routing |

**†** the one **graded** dimension; every other row is a position, not a score. **Neither end is better, and the pair is not scored twice** — Grok Build carries every value above; Grok Bot's divergence lives only in the YAML's `split:` fields, sharpest at **DX-6 Ownership** (Build +3 Apache-2.0 self-hostable, Bot −3 closed and hosted) and **DX-1 Org scale**. Ten axes sit beneath these seven — `I +1 · II 0 · III 0 · IV +3 · V +2 · VI +1 · VII 0 · VIII +2 · IX 0 · X +2` — and four of them feed no cell above by design.

→ [`spectrums/positioning.md`](../spectrums/positioning.md) · [`positions/grok.yaml`](../spectrums/positions/grok.yaml) · [`01-scorecard.md`](../spectrums/01-scorecard.md) · [`00-README.md`](../spectrums/00-README.md)

*Scored 2026-09-07 against this profile as read 2026-09-02. This table is the **one sanctioned echo** of the scorecard — derived from the same YAML that renders `positioning.md`, so the two match by construction. Re-score in the YAML, never here.*

### 1b. Contents

[§1 At a glance](#1-at-a-glance) · [1a Positioning stats](#1a-positioning-stats) · [§2 System map](#2-system-map) · [§3 Workflows](#3-workflows) · [§4 Component matrix](#4-component-matrix) · [§5 Primitives](#5-primitives) · [§6 Details](#6-details) · [§7 Identity and inclusion test](#7-identity-and-inclusion-test) · [§8 Limits](#8-limits) · [§9 Sources](#9-sources) · [§10 Unverified](#10-unverified)

No deep-read folder exists for Grok.

## 2. System map

**Diagram inventory not done at the 2026-09-02 read — pending the diagram pass (W8c).** No `assets/projects/grok/` exists, and no vendor diagram was inventoried when the source read was taken. This is a recorded gap, not an absence: the read predates the diagram obligation.

**How it thinks about work.** Grok Build's unit of work is a session: `~/.grok/sessions/<cwd>/<id>/` holds `updates.jsonl` as *"the authoritative conversation log,"* alongside `plan.json`/`plan.md`, compaction checkpoints and rewind points. The loop is `xai-grok-shell`; a tool call is authorized by an ordered stack — a `PreToolUse` hook, then `deny`/`ask`/`allow` rules, then remembered grants, then mode policy — before it reaches the model. Grok Bot's unit of work is a task handed to a named teammate on its own persistent cloud computer: the Bot proposes an action, an approval card or an Auto Review rule decides, and the result lands in `/workspace`, a browser session, or a routine's run history. Neither product's docs say whether the same loop sits under both.

## 3. Workflows

**Not written at the 2026-09-02 read — pending the diagram pass (W8c).** A recorded gap. Three sequences a workflow pass should draw, each already evidenced in §6 and needing no new source read:

1. **A Build turn's authorization stack** — prompt → `PreToolUse` hook (can deny) → permission rule
   `deny`/`ask`/`allow` → remembered grant → mode policy → tool call → `PostToolUse` (can replace model-visible output) → `Stop` hook (can block, capped at 8 continuations) ([2b](#2b-hooks), [2c](#2c-enforcement)).
2. **A Bot task from request to receipt** — request or routine trigger → proposed action → approval
   card or Auto Review rule → execution on the cloud computer or under local-computer policy → result in the conversation, `/workspace`, or a routine run record ([3a](#3a-control), [8b](#8b-evidence)).
3. **Teach-by-demonstration to a saved routine** — a browser recording (≤10 min) → a drafted skill →
   human review → save → attach to a schedule or event trigger → run history kept for 20 runs ([9a](#9a-learning), [9c](#9c-cadence)).

## 4. Component matrix

`● named primitive · ◐ partial, present-not-first-class · ○ absent (pages named in §6) · n/a does not apply at this altitude`

**Marks copied verbatim from Grok's single column in [`04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2; not re-derived at the restructure.** That grid holds one Grok column, not two — where Build and Bot diverge on a row, the note below carries the distinction; the mark is the one already published.

| # | Component | Mark | Primitive / note |
|---|---|:-:|---|
| **0 · Foundation** | | | |
| [0a](#0a-substrate) | Substrate | ● | Model-pluggable, 31+ backends; Bot's model choice fully managed |
| **1 · Environment** | | | |
| [1a](#1a-environment) | Environment | ◐ | Local shell + FS (Build); cloud VM (Bot); no declared inventory |
| **2 · Agent Harness** | | | |
| [2a](#2a-adapters--middleware) | Adapters & Middleware | ● | [**MCP server**](#5-primitives) + plugin; Claude/Cursor compat readers |
| [2b](#2b-hooks) | Hooks | ● | [**Hook**](#5-primitives) — 15 named events; fail open |
| [2c](#2c-enforcement) | Enforcement | ● | [**Permission rule / mode**](#5-primitives) + kernel sandbox, off by default |
| **3 · System Stacks** | | | |
| [3a](#3a-control) | Control | ● | Plan mode + [**Goal**](#5-primitives) — token budget, evidence review |
| [3b](#3b-routing) | Routing | ◐ | Manual model routing; `spawn_subagent` picks a type, no resolver |
| [3c](#3c-composition) | Composition | ● | [**Agent / Subagent / Persona / Role**](#5-primitives) — three objects |
| [3d](#3d-configuration) | Configuration | ● | Three config files — user · fleet · signed pin, different authors |
| [3e](#3e-standards) | Standards | ○ | No opinionated standard shipped; rules + pinned plugins are the vehicle |
| **4 · Capabilities** | | | |
| [4a](#4a-capability) | Capability | ● | [**Skill**](#5-primitives) + [**Plugin / Marketplace**](#5-primitives), SHA-pinnable |
| [4b](#4b-capability-permissions) | Capability Permissions | ● | Per-tool, per-skill, org allowlists on the same [**permission rule**](#5-primitives) |
| **5 · Context ⟳** | | | |
| [5a](#5a-individual-memory) | Individual Memory | ● | Bot memory (opaque); Build's memory off by default |
| [5b](#5b-team-memory) | Team Memory | ○ | Nothing shared across people; config travels by VCS, not memory |
| [5c](#5c-knowledge) | Knowledge | ◐ | Hybrid BM25+vector memory search; `/deep-research` verifier shard |
| **6 · Workspaces ⟳** | | | |
| [6a](#6a-product) | Product | ○ | No PRD/spec object; closest is `plan.md`'s Context section |
| [6b](#6b-infrastructure) | Infrastructure | ● | [**Computer**](#5-primitives) (Bot's cloud VM) + sandbox profile (Build) |
| [6c](#6c-estate) | Estate | ○ | No multi-repo model; one repo discovered at a time |
| [6d](#6d-delivery) | Delivery | ◐ | Git ACP methods, headless CI; no PR/deploy flow |
| **7 · Workflow Tasks** | | | |
| [7a](#7a-workflow-tasks) | Workflow Tasks | ◐ | `plan.json`/`todo_write`; routine run history; no ticket object |
| **8 · Trust** | | | |
| [8a](#8a-evals) | Evals | ◐ | No eval harness; `/goal`'s independent evidence review is nearest |
| [8b](#8b-evidence) | Evidence | ● | [**Session**](#5-primitives) — `updates.jsonl` authoritative, per-turn cost |
| [8c](#8c-observability) | Observability | ● | External OTEL (alpha, content-free by default) + dashboard usage |
| [8d](#8d-efficiency) | Efficiency | ● | Compaction, pruning, `/goal --budget <tokens>`, no spend cap |
| **9 · IMPROVE** | | | |
| [9a](#9a-learning) | Learning | ● | [**Teach-by-demonstration**](#5-primitives) (Bot) + `/create-skill` (Build) |
| [9b](#9b-rituals) | Rituals | ◐ | `review-changes` workflow; use-case templates, not rituals |
| [9c](#9c-cadence) | Cadence | ● | [**Routine**](#5-primitives) (Bot) + `/loop`/scheduler (Build) |
| [9d](#9d-anti-fragile-lifecycle) | Anti-fragile Lifecycle | ◐ | Resume/fork/rewind, doom-loop resample; VM recover/reset |
| [9e](#9e-raise-the-floor) | Raise the Floor | ◐ | `grok inspect`/`doctor`, Claude-settings import; onboarding wizard |
| [9f](#9f-diagnose-the-bottleneck) | Diagnose the Bottleneck | ◐ | Session self-diagnostics only; no maturity scoring |
| **10 · Teams & Agents** | | | |
| [10a](#10a-roster) | Roster | ● | [**Bot**](#5-primitives) roster (≤50) + Build's agent dashboard |
| [10b](#10b-org) | Org | ● | Three-file config ownership (Build) + team/org admin roles (Bot) |
| **11 · Surfaces** | | | |
| [11a](#11a-surfaces) | Surfaces | ● | TUI + ACP into 4 editors (Build); desktop + iOS apps (Bot) |
| **● 19 · ◐ 10 · ○ 4** | | | |

## 5. Primitives

**Grok Build — 8 primitives, second tier of 5 more plus 3 config files, ⚠️ contestable**

| Primitive | Path / key | Project's own definition (verbatim) | Source |
|---|---|---|---|
| Project rules | `AGENTS.md` (+ aliases), `<dir>/.grok/rules/*.md`, `~/.grok/rules/` | *"Project rules are Markdown files that Grok reads and adds to its context… the primary mechanism for teaching Grok about your project's conventions."* | ✅ UG/12 |
| Skill | `.grok/skills/`, `~/.grok/skills/`, `.agents/skills/`, compat dirs | *"A skill is a directory that contains a `SKILL.md` file… Use a skill for a repeatable procedure that's too specific for AGENTS.md but too long to retype."* | ✅ UG/08 |
| Plugin / Marketplace | plugin dir + `hooks.json`/`.mcp.json`/`.lsp.json`; `.grok-plugin/marketplace.json` | *"A plugin bundles skills, slash commands, agents, hooks, and MCP servers into one installable unit."* | ✅ UG/09 |
| Hook | `~/.grok/hooks/*.json`, `.grok/hooks/*.json`, TOML `hooks` table | *"A hook is a shell command or HTTP endpoint that Grok calls when a specific lifecycle event occurs."* | ✅ UG/10 |
| MCP server | `[mcp_servers.<name>]`, `.mcp.json`, `grok mcp add` | *"An MCP server is a process that exposes tools to Grok over a standardized protocol."* | ✅ UG/07 |
| Permission rule / mode | `[permission] allow/ask/deny`; `--allow`/`--deny` | *"**Modes** set how often Grok asks for approval… **Rules** set which tools are allowed, asked about, or blocked."* | ✅ UG/22 |
| Sandbox profile | `--sandbox <profile>`; `~/.grok/sandbox.toml` | *"The kernel enforces these limits for the process lifetime"* (Landlock / Seatbelt). | ✅ UG/18 |
| Agent / Subagent / Persona / Role | `.grok/agents/*.md`, `.grok/roles/*.toml`, `.grok/personas/*.toml` | *"An agent defines the session itself. A persona shapes how a subagent behaves within a session."* | ✅ UG/16 |

Second tier, also first-class in the docs but not user-authoring units: **Session** (`~/.grok/sessions/…`), **Memory** (`~/.grok/memory/`, experimental, off by default), **Workflow** (`.grok/workflows/*.rhai`), **Plan** (`plan.md`), **Goal** (`/goal`) — ✅ UG/13, UG/17, UG/19. Plus the three config files named at `3d`, *"written by different people."*

**Count:** 8 primitives, 5 second-tier + 3 config files (supporting). **Verdict:** ⚠️ contestable — one past the 5–7 healthy band, with no refusal posture to explain the excess, unlike Pi's disputed count (`ISSUE-007`), which at least has a stated refusal list behind it.

**Grok Bot — 6 primitives, healthy**

| Primitive | Path / key | Project's own definition (verbatim) | Source |
|---|---|---|---|
| Bot | Sidebar → New; Bot actions → Edit Profile | *"A Bot is a durable AI teammate with a name, a job, its own conversation, and working context that develops over time."* | ✅ BOT/bots |
| Computer (Agent Computer) | one per account; `/workspace` | *"Each Bot runs on a persistent cloud VM with a browser, filesystem, and terminal."* | ✅ BOT/overview |
| Skill | ask the Bot, or Teach a task; Settings → Plugins → Yours | *"A skill is a reusable set of instructions for how to do a task."* | ✅ BOT/skills-routines-and-automations |
| Routine | Bot → conversation details → Routines | *"A routine tells one Bot when to run a workflow — on a schedule or, where supported, after an event."* | ✅ BOT/skills-routines-and-automations |
| Plugin / Connector | Settings → Plugins; Team Settings → MCP | *"Connectors give a Bot a structured way to work with supported services… shown as Plugins."* | ✅ BOT/computer-and-apps |
| Approval / Auto-review rule | approval card; Settings → General → Auto-review | *"Require Approval rules always stop matching actions for you. Always Allow rules let matching actions proceed only when the automated review does not identify another reason to stop."* | ✅ BOT/approvals-security-and-privacy |

**Count:** 6 primitives, 0 supporting. **Verdict:** healthy — inside the 5–7 band.

**No published refusal list for either product** — checked UG/01–27 and every BOT/ page; neither names what it will not ship the way Pi does.

## 6. Details

`✅ direct · ↪ relayed · ⚠️ unverified`

### 0 · Foundation

#### 0a Substrate
<details>
<summary>● Model-pluggable, 31+ backends; Bot's model choice fully managed</summary>

**Ships.** Build defaults to hosted models (`grok-4.5`/`grok-4.6`, docs disagree) but is fully pluggable: `[model.<id>]` with `base_url`, three `api_backend` protocols (`chat_completions`, `responses`, Anthropic `messages`), documented examples for Claude, OpenAI, Ollama, Together, local llama.cpp-class servers, per-subagent model routing, and a fleet-pinned `allowed_models` list. Bot ships no model picker at all — *"Model choice is fully managed by the product."*
**Path.** `~/.grok/config.toml` `[models]`, `[model.<id>]` (Build); none (Bot).
**Source.** ✅ UG/11 §Supported API Backends · ✅ BOT/teams-and-enterprises §Availability

</details>

### 1 · Environment

#### 1a Environment
<details>
<summary>◐ Local shell + FS (Build); cloud VM (Bot); no declared inventory</summary>

**Ships.** Build: local shell/filesystem tools (`read_file`, `run_terminal_command`, `web_search`/`web_fetch` with SSRF fail-closed), no built-in browser tool (MCP only), plus a remote WebSocket server (`grok agent serve`) and a Grove NFS/FUSE mount (`grok clone`). Bot: a persistent Linux VM per user with browser, filesystem and terminal; optional local-computer execution on the member's own machine under an approval policy.
**Nothing here** as a declared systems inventory for either product — checked UG/01, UG/05, UG/20, UG/27, BOT/computer-and-apps.
**Path.** `[toolset.*]` (Build); Settings → General → Agent (Bot).
**Source.** ✅ UG/01 §Tools · ✅ BOT/computer-and-apps

</details>

### 2 · Agent Harness

#### 2a Adapters & Middleware
<details>
<summary>● <b>MCP server</b> + plugin; Claude/Cursor compat readers</summary>

**Ships.** MCP client (stdio, HTTP/SSE, streamable, native OAuth), tool namespacing `server__tool`, `grok mcp add/remove/enable/doctor`; plugins bundle skills+commands+agents+hooks+MCP; ACP `x.ai/*` extension methods (`fs`, `git`, `terminal`, `session`); compat readers for `.mcp.json`, `~/.claude.json`, `.cursor/mcp.json`. Bot: connectors/plugins from the Cursor marketplace, MCP under team policy — no adapter *for* another harness.
**Path.** `[mcp_servers.<name>]`, `[plugins]` (Build); Settings → Plugins (Bot).
**Source.** ✅ UG/07 · ✅ UG/09 §Reference · ✅ BOT/computer-and-apps §Connect an app

</details>

#### 2b Hooks
<details>
<summary>● <b>Hook</b> — 15 named events; fail open</summary>

**Ships.** Fifteen named lifecycle events (`SessionStart`…`SessionEnd`, `PreToolUse` and `Stop` blocking, `PostToolUse` can replace model-visible output), handler types `command`/`http`, regex matchers, `Stop` capped at 8 continuations, Cursor camelCase names and Claude tool aliases accepted. *"All failures fail open."* Bot ships no user-authored hooks — Auto Review rules are evaluated before an action runs, but as policy, not a script.
**Path.** `~/.grok/hooks/*.json`, `.grok/hooks/*.json`, plugin `hooks/hooks.json`.
**Source.** ✅ UG/10 §Hook Events, §How a Hook Resolves

</details>

#### 2c Enforcement
<details>
<summary>● <b>Permission rule / mode</b> + kernel sandbox, off by default</summary>

**Ships.** Authorization order: `PreToolUse` hook → `deny`/`ask`/`allow` rule → remembered grant → built-in read-only auto-approval → mode policy (`default`…`bypassPermissions`). Sandbox profiles (`workspace`/`devbox`/`read-only`/`strict`/custom) are kernel-enforced (Landlock/Seatbelt) but **off by default**; admin lock via signed `requirements.toml` can disable bypass mode. Bot: approval cards plus a model-based Auto Review (*"Require Approval… always wins"*); explicitly *"Do not use separate Bots as a security boundary."*
**Path.** `[permission]`, `--sandbox`, `~/.grok/sandbox.toml` (Build); Settings → Auto-review (Bot).
**Source.** ✅ UG/22 · ✅ UG/18 · ✅ BOT/approvals-security-and-privacy

</details>

### 3 · System Stacks

#### 3a Control
<details>
<summary>● Plan mode + <b>Goal</b> — token budget, evidence review</summary>

**Ships.** Plan mode: a state machine (`Inactive`→`Active`→`ExitPending`) gating every file but `plan.md`, with an approval view (approve/request changes/inline comments). `/goal <objective> --budget <tokens>` *"only marks the goal complete after an independent evidence review confirms the claim"*; `.rhai` workflows carry an `agent_budget` cap. Bot: boundaries stated in the request, approval checkpoints, a recommended test-run-before-enabling ladder for routines.
**Path.** `/plan`, `~/.grok/sessions/<id>/plan.md`, `[goal]`, `.grok/workflows/*.rhai`.
**Source.** ✅ UG/19 · ✅ UG/04 §`/goal` · ✅ BOT/skills-routines-and-automations §Test before enabling

</details>

#### 3b Routing
<details>
<summary>◐ Manual model routing; <code>spawn_subagent</code> picks a type, no resolver</summary>

**Ships.** Per-subagent, per-persona and per-skill model/effort settings; the model itself calls `spawn_subagent` with a `subagent_type`, depth-limited to one. Bot: no model routing — *"you are not the router between tools"*; Bots message each other and pass ownership by `@` mention, with a documented *"chief of staff"* pattern of specialists.
**Path.** `[subagents.models.<type>]`, `SKILL.md` `model`/`effort` (Build); `@` mentions (Bot).
**Source.** ✅ UG/16 §Built-in Agent Types · ✅ BOT/bots §Organize a team of Bots

</details>

#### 3c Composition
<details>
<summary>● <b>Agent / Subagent / Persona / Role</b> — three objects</summary>

**Ships.** Agent definitions (`.md` + frontmatter), roles (`default_capability_mode`, model, prompt file), and personas (`instructions`, `inputs`/`outputs` contracts) are three separate objects where the row wants one; subagents are depth-limited to one, with `isolation: worktree` and `resume_from`. Bot's composition is the Bot itself — profile (name, title, description, avatar) plus per-Bot enabled skills and routines; duplication copies configuration, never memory or history.
**Path.** `.grok/agents/*.md`, `.grok/roles/*.toml`, `.grok/personas/*.toml` (Build); Edit Profile (Bot).
**Source.** ✅ UG/16 §Agents vs Personas · ✅ BOT/bots

</details>

#### 3d Configuration
<details>
<summary>● Three config files — user · fleet · signed pin, different authors</summary>

**Ships.** *"Three files configure Grok Build, and they are written by different people"*: `config.toml` (user), `managed_config.toml` (fleet default), signed `requirements.toml` (pins nobody can override — `allowed_models`, `disable_bypass_permissions_mode`). Precedence: CLI flags → env → signed pins/MDM → env overlay → user config → managed default → built-in defaults; `grok inspect` shows which layer won. Instruction files load `AGENTS.md`/`CLAUDE.md`/aliases home→root→cwd, deeper wins. Bot: a Bot's own description (durable rules) plus team rules from the Cursor dashboard, scoped to Cursor/Bot/both — no files.
**Path.** `~/.grok/config.toml`, `/etc/grok/{managed_config,requirements}.toml` (Build); dashboard (Bot).
**Source.** ✅ UG/26 §How to configure · ✅ BOT/teams-and-enterprises §Team rules

</details>

#### 3e Standards
<details>
<summary>○ No opinionated standard shipped; rules + pinned plugins are the vehicle</summary>

**Nothing here** as a shipped opinionated standard — checked UG/12, UG/09, BOT/teams-and-enterprises.
**What exists instead.** Committed `.grok/rules/*.md`, SHA-pinnable marketplace plugins, workspace-synced *"server"*-scope skills, and org `managed_config.toml` are the vehicles; the docs suggest categories (build/test, style, PR rules) but ship none. Bot: a few short team rules from the dashboard, no versioned standards artifact.
**Source.** ✅ UG/12 §What to Put in Project Rules · ✅ UG/09 §Require pinned versions

</details>

### 4 · Capabilities

#### 4a Capability
<details>
<summary>● <b>Skill</b> + <b>Plugin / Marketplace</b>, SHA-pinnable</summary>

**Ships.** Skills = `SKILL.md` with rich frontmatter (`allowed-tools`, `disable-model-invocation`, `model`, `effort`); locations span its own dirs plus Claude's and Cursor's. Plugins bundle skills+commands+agents+hooks+MCP; marketplaces (`.grok-plugin/marketplace.json`) install by owner/repo, git URL or local path, with `require_sha` pinning and `grok plugin validate`. Bot: skills are saved by asking, or **taught by demonstration** — a ≤10-minute browser recording becomes a draft skill you review — enabled per Bot, no documented file format.
**Path.** `.grok/skills/`, `.grok/plugins/`, `[[marketplace.sources]]` (Build); Settings → Plugins (Bot).
**Source.** ✅ UG/08 · ✅ UG/09 · ✅ BOT/skills-routines-and-automations §Teach a workflow by demonstration

</details>

#### 4b Capability Permissions
<details>
<summary>● Per-tool, per-skill, org allowlists on the same <b>permission rule</b></summary>

**Ships.** `[permission]` globs down to `MCPTool(server__tool)`; `disabled_mcp_tools` per-server deny lists; per-skill `allowed-tools`/`disable-model-invocation`; per-agent `tools`/`mcpInheritance`; plugin agents cannot declare `bypassPermissions` or their own MCP servers; org `allowedMcpServers` and `strictKnownMarketplaces`. Bot: skills enabled per Bot, connectors account-wide (*"not isolated to one Bot"*), team MCP allow/deny with a self-add toggle.
**Path.** `[permission]`, `disabled_mcp_tools`, `SKILL.md` frontmatter (Build); Team Settings → MCP (Bot).
**Source.** ✅ UG/22 §MCP Rules · ✅ BOT/teams-and-enterprises §Plugins and MCP policy

</details>

### 5 · Context ⟳

#### 5a Individual Memory
<details>
<summary>● Bot memory (opaque); Build's memory off by default</summary>

**Ships.** Build: experimental, **disabled by default** (`GROK_MEMORY=1`); Markdown at `~/.grok/memory/MEMORY.md` (global) and per-workspace, SQLite FTS5 (+ vector when configured), automatic session-end summaries, idle flush, auto-`/dream` consolidation, manual `/remember`/`/flush`. Bot: *"named Bots keep memory, files, browser sessions, and preferences across turns"* — format and location undocumented; *"not a substitute for an authoritative source."*
**Path.** `~/.grok/memory/`, `[memory.*]` (Build); opaque per-Bot store (Bot).
**Source.** ✅ UG/13 · ✅ BOT/bots §What a Bot remembers

</details>

#### 5b Team Memory
<details>
<summary>○ Nothing shared across people; config travels by VCS, not memory</summary>

**Nothing here** — memory lives under `$HOME` for Build; *"user skills… stay personal and unshared."* Cross-Bot sharing exists (shared `/workspace`, group chats, *"one Bot can continue from work another Bot saved"*) but cross-**person** sharing is only copying a Bot's configuration by public link, without memory or history.
**Source.** ✅ UG/13 §How Memory Is Stored · ✅ BOT/bots §Share a Bot

</details>

#### 5c Knowledge
<details>
<summary>◐ Hybrid BM25+vector memory search; <code>/deep-research</code> verifier shard</summary>

**Ships.** Build: `memory_search`/`memory_get` hybrid BM25 (0.3) + vector (0.7); codebase graph indexing; `/deep-research` *"gathers structured claims with source evidence, cross-checks each claim on an independent verifier shard."* No wiki/RAG over external corpora built in. Bot: web browsing and connectors only; no documented retrieval index.
**Path.** `[memory.search]`, `[features] codebase_indexing`, `/deep-research`.
**Source.** ✅ UG/13 §Memory Search · ✅ UG/04 §`/deep-research`

</details>

### 6 · Workspaces ⟳

#### 6a Product
<details>
<summary>○ No PRD/spec object; closest is <code>plan.md</code>'s Context section</summary>

**Nothing here** — checked UG/19, BOT/skills-routines-and-automations. Closest: `plan.md`'s required Context section and verification section (Build); a skill's stated *"When to use it / How to validate the result / What requires approval"* (Bot) — process shape, not a product/spec object.
**Source.** ✅ UG/19 §The Plan File

</details>

#### 6b Infrastructure
<details>
<summary>● <b>Computer</b> (Bot's cloud VM) + sandbox profile (Build)</summary>

**Ships.** Build runs locally with an optional OS-level sandbox (Landlock/Seatbelt, *"not a separate VM"*), git worktrees for subagents, a self-hosted `grok agent serve`, and a Grove NFS/FUSE mount. *"Grok's hosted cloud sandboxes do not run `grok agent serve`."* Bot: *"each computer is a managed Linux virtual machine dedicated to one member,"* non-root, durable storage across Kill/Reset/Update, static egress IPs.
**Path.** `--sandbox`, `.grok/sandbox.toml`, `grok clone` (Build); dashboard → computers (Bot).
**Source.** ✅ UG/18 §Trade-offs · ✅ BOT/teams-and-enterprises §How isolation works

</details>

#### 6c Estate
<details>
<summary>○ No multi-repo model; one repo discovered at a time</summary>

**Nothing here** for either product — Build discovers rules/config *"from the repo root down to the current working directory,"* one repo at a time, memory keyed by `origin` remote; Bot works across apps, not repos.
**Source.** ✅ UG/12 §How Discovery Works · ✅ UG/13 §How Memory Is Stored

</details>

#### 6d Delivery
<details>
<summary>◐ Git ACP methods, headless CI; no PR/deploy flow</summary>

**Ships.** No built-in PR/deploy flow. ACP `x.ai/git/*` (status/stage/commit/diffs/discard); read-only git commands auto-approve, `git push` stays on the dangerous list; headless mode *"for scripting/CI"* with JSON output formats; a built-in `review-changes` workflow. Bot: examples only — a Bot filing a ticket and handing off to another; *"keep production changes behind approval."*
**Path.** `grok -p --output-format json`, `/workflow review-changes`.
**Source.** ✅ UG/14 §Command-Line Options · ✅ UG/22 §Dangerous Commands

</details>

### 7 · Workflow Tasks

#### 7a Workflow Tasks
<details>
<summary>◐ <code>plan.json</code>/<code>todo_write</code>; routine run history; no ticket object</summary>

**Ships.** `todo_write` → `plan.json`, a todo pane and a tasks pane for subagents/background/loops; no external ticket integration built in (Linear/GitHub only via MCP). Bot: conversations per Bot, routines keeping the 20 most recent run records; no ticket object.
**Path.** `~/.grok/sessions/<id>/plan.json` (Build); routine run history (Bot).
**Source.** ✅ UG/17 §Storage Layout · ✅ BOT/skills-routines-and-automations §Manage routines

</details>

### 8 · Trust

#### 8a Evals
<details>
<summary>◐ No eval harness; <code>/goal</code>'s independent evidence review is nearest</summary>

**Ships.** Nothing shipped as a user-facing eval harness; ACP/headless is positioned *"for SDKs, eval harnesses, and custom apps."* `/goal`'s independent evidence review and `/deep-research`'s verifier shard are adversarial checks, not a gate every unit clears. Bot: a routine's *"Test run… performs real work"* plus a review checklist.
**Path.** `/goal`, `/deep-research` (Build); routine Test run (Bot).
**Source.** ✅ UG/04 §`/goal` · ✅ BOT/skills-routines-and-automations §Test before enabling

</details>

#### 8b Evidence
<details>
<summary>● <b>Session</b> — <code>updates.jsonl</code> authoritative, per-turn cost</summary>

**Ships.** Session record on disk — `updates.jsonl` *"the authoritative conversation log,"* `chat_history.jsonl`, `feedback.jsonl`, compaction checkpoints; `grok usage <id>` per-turn token/cost; headless JSON carries `usage`/`total_cost_usd_ticks`; *"the scrollback and the transcript keep the real output"* even when a hook replaces what the model sees. Bot: the conversation shows the proposed action and its inputs; routine run records; *"an audit view of Bot actions is coming"* — not yet shipped.
**Path.** `~/.grok/sessions/<id>/updates.jsonl` (Build); conversation + Routines view (Bot).
**Source.** ✅ UG/17 §Storage Layout · ✅ BOT/teams-and-enterprises §Audit

</details>

#### 8c Observability
<details>
<summary>● External OTEL (alpha, content-free by default) + dashboard usage</summary>

**Ships.** External OpenTelemetry (alpha), double opt-in, content-free by default with four gates (`OTEL_LOG_USER_PROMPTS`, `_ASSISTANT_RESPONSES`, `_TOOL_DETAILS`, `_TOOL_CONTENT`) that turn content on per class; events include `skill_activated`, `plugin_loaded`, `permission_mode_changed`, `compaction`. Separate first-party telemetry to Mixpanel and local logs. Bot: *"spend and usage appear on the dashboard usage page"*; no OTEL, no audit log yet.
**Path.** `[telemetry] otel_*`, `OTEL_*` env (Build); Cursor dashboard usage page (Bot).
**Source.** ✅ UG/24 · ✅ BOT/teams-and-enterprises §Availability and Billing

</details>

#### 8d Efficiency
<details>
<summary>● Compaction, pruning, <code>/goal --budget &lt;tokens&gt;</code>, no spend cap</summary>

**Ships.** Auto-compact at 85% context, `/compact`, two-pass compaction, tool-result pruning, MCP output cap (20,000 bytes), `/context`/`/usage` breakdowns, `/goal --budget <tokens>`, workflow `agent_budget` (default 128, range 1–1024). Bot: its own usage plane, weekly team allowances; *"No per-product spend cap exists yet"*; routines may pause after a long absence *"to control unattended usage."*
**Path.** `[session] auto_compact_threshold_percent`, `[compaction.*]` (Build); dashboard (Bot).
**Source.** ✅ UG/13 §Pruning Settings · ✅ BOT/teams-and-enterprises

</details>

### 9 · IMPROVE

#### 9a Learning
<details>
<summary>● <b>Teach-by-demonstration</b> (Bot) + <code>/create-skill</code> (Build)</summary>

**Ships.** Build: `/create-skill` drafts a `SKILL.md` from a description; `/create-workflow` and `/workflow save` capture a run's script; memory `/dream` *"consolidates scattered memory fragments."* No auto-skill-creation from ordinary sessions. Bot: record a browser task (≤10 min), *"review the skill the Bot creates,"* attach it to a routine — capture from doing, not from a transcript.
**Path.** `/create-skill`, `/create-workflow`, `/dream` (Build); Teach a task (Bot).
**Source.** ✅ UG/08 §Creating Skills · ✅ BOT/skills-routines-and-automations §Teach a workflow by demonstration

</details>

#### 9b Rituals
<details>
<summary>◐ <code>review-changes</code> workflow; use-case templates, not rituals</summary>

**Ships.** Build's built-in `review-changes` workflow and plan-mode's inline-comment approval are the nearest thing to an encoded ritual; no standup/retro object. Bot: use-case templates (Sales Outbound, Chief of Staff, Bug Reproduction…) and example routines (*"Monday scoreboard"*) are illustrations, not shipped rituals.
**Path.** `/workflow review-changes` (Build); onboarding use-case list (Bot).
**Source.** ✅ UG/04 §`/workflow` · ✅ BOT/use-cases

</details>

#### 9c Cadence
<details>
<summary>● <b>Routine</b> (Bot) + <code>/loop</code>/scheduler (Build)</summary>

**Ships.** Build: `/loop [interval] <prompt>` (*"auto-expire after 7 days,"* 50-task cap), `scheduler_create`/`_list`/`_delete`, a `monitor` tool for streamed output — all die with the session process. Bot: **routines** on a schedule or an event (*"a Slack message or a GitHub notification"*), running *"while your laptop is closed,"* up to 50 per Bot, 20 run records kept.
**Path.** `/loop`, `scheduler_*` (Build); Bot → Routines (Bot).
**Source.** ✅ UG/20 §The /loop Command · ✅ BOT/skills-routines-and-automations §Create a routine

</details>

#### 9d Anti-fragile Lifecycle
<details>
<summary>◐ Resume/fork/rewind, doom-loop resample; VM recover/reset</summary>

**Ships.** Build: `/resume`, `/fork`, `/rewind` (*"does not restore files on disk"*), compaction checkpoints, `[doom_loop_recovery]` *"resample confident tool-call loops,"* inference retries, typed `Stop` failure categories, `grok update`/`/doctor fix`. Bot: Recover/Update/Reset Agent Computer *"preserving durable state"*; user-authored routine failure policy (*"report the failure instead of using old data"*); *"approvals… do not reverse work already completed."*
**Path.** `~/.grok/sessions/`, `[doom_loop_recovery]` (Build); Settings → Beta (Bot).
**Source.** ✅ UG/17 · ✅ BOT/computer-and-apps §Update, recover, or reset

</details>

#### 9e Raise the Floor
<details>
<summary>◐ <code>grok inspect</code>/<code>doctor</code>, Claude-settings import; onboarding wizard</summary>

**Ships.** `grok inspect` (loaded rules/skills/MCP/plugins by vendor origin), `/doctor [fix]`, `grok mcp doctor`, `/tour`, and **Ctrl+I "Import Claude settings."** Bot: onboarding *"collects information about tools the user employs to suggest Bot types"*; an admin setup wizard (privacy mode, billing, seats).
**Path.** `grok inspect`, `/doctor`, `/tour` (Build); first-run onboarding (Bot).
**Source.** ✅ UG/01 · ✅ UG/22 §Claude Code Compatibility · ✅ BOT/get-started

</details>

#### 9f Diagnose the Bottleneck
<details>
<summary>◐ Session self-diagnostics only; no maturity scoring</summary>

**Ships.** Only session-level self-diagnostics for either product — `/doctor`, `grok inspect` (*"compatibilityStatus: unresolved"*), `/context`, OTEL `startup.phase_duration`. No maturity or readiness scoring.
**Source.** ✅ UG/04 · ✅ UG/24 §Metrics

</details>

### 10 · Teams & Agents

#### 10a Roster
<details>
<summary>● <b>Bot</b> roster (≤50) + Build's agent dashboard</summary>

**Ships.** Build: agent definitions, built-in types (`grok-build`/`explore`/`plan`), personas and roles, plus an Agent Dashboard listing every top-level session grouped by state (peek/reply/dispatch/pin/stop). Bot: *"the Bots are the roster"* — named, avatar'd, up to 50 Bots and group chats combined, pinnable, shareable by public link.
**Path.** `/config-agents`, `/dashboard` (Build); sidebar (Bot).
**Source.** ✅ UG/16 · ✅ BOT/bots

</details>

#### 10b Org
<details>
<summary>● Three-file config ownership (Build) + team/org admin roles (Bot)</summary>

**Ships.** Build's ownership is a file boundary — `requirements.toml` (pin) beats `managed_config.toml` (fleet) beats `config.toml` (user) beats project config; *"your own `deny` and `ask` rules win over a managed `allow`."* Bot's ownership is a role — individual member, **team admin**, **organization admin**, with the explicit rung *"team admin rights are not enough"* to remove a computer. Neither ships RACI or escalation objects.
**Path.** config layers (Build); Cursor dashboard roles (Bot).
**Source.** ✅ UG/26 §How to configure · ✅ BOT/teams-and-enterprises §Manage member computers

</details>

### 11 · Surfaces

#### 11a Surfaces
<details>
<summary>● TUI + ACP into 4 editors (Build); desktop + iOS apps (Bot)</summary>

**Ships.** Build: full-screen mouse-interactive TUI, headless CLI, ACP stdio/WebSocket server/relay into Zed, Neovim, Emacs and marimo (JetBrains *"coming soon"*); no chat-channel surface built in. Bot: desktop app (macOS/Windows/Linux) and an iOS companion (text, dictation, photos, approvals, a noVNC-style Agent Computer view); Slack/GitHub only as event *sources*; no API.
**Path.** `grok`, `grok agent stdio|serve|headless` (Build); desktop/iOS apps (Bot).
**Source.** ✅ UG/15 §Compatible clients · ✅ BOT/get-started · ✅ BOT/mobile

</details>

## 7. Identity and inclusion test

<details>
<summary>Identity · inclusion test · loop question</summary>

**Grok Build**

| Field | Value |
|---|---|
| Canonical name | **Grok Build** (binary `grok`; build artifact `xai-grok-pager`) ✅ |
| Prior names / homes | None found at primary source; secondary sources call it "Grok CLI" ✅/↪ |
| Owner / maintainer | SpaceXAI (GitHub org `xai-org`) ✅ |
| GitHub URL | `github.com/xai-org/grok-build` ✅ |
| License | Apache-2.0 for first-party code; vendored ports keep their own licences ✅ |
| Stars | 26,383 (2026-09-02); forks 4,950 ✅ |
| Language | Rust ✅ |
| Repo created | 2026-07-14; announced 2026-07-15 ✅ |
| First release | ⚠️ no GitHub releases or tags exist; changelog page returned 403 |
| Latest release | ⚠️ same — no tags; last commit 2026-09-01, sha `72a6125` ✅ (commit only) |
| Install | `curl -fsSL https://x.ai/cli/install.sh \| bash`; `cargo run` from source ✅ |
| Website / docs | `docs.x.ai/build` · in-repo user guide (`.../docs/user-guide/`) ✅ |
| What it says it is, verbatim | *"SpaceXAI's terminal-based AI coding agent. It runs as a full-screen TUI that understands your codebase, edits files, executes shell commands, searches the web, and manages long-running tasks."* ✅ |

**Grok Bot**

| Field | Value |
|---|---|
| Canonical name | **Grok Bot**; one agent is a **Bot** ✅ |
| Prior names / homes | *"an internal prototype"* before public launch; no prior public name ✅ |
| Owner / maintainer | SpaceXAI; operated on Cursor account infrastructure ✅ |
| GitHub URL | none — closed, hosted ✅ (absence) |
| License | closed; no repo linked from any x.ai/docs.x.ai page ✅ (absence) |
| Stars | n/a (no repo) |
| Language | n/a (no repo) |
| Repo created | n/a |
| First release / launch | **2026-08-11**, *"Early beta"* ✅ |
| Latest release | beta, unversioned at read ✅ |
| Install | download at x.ai/bot; sign in with a Cursor account (SSO supported) ✅ |
| Website / docs | `docs.x.ai/grok-bot` ✅ |
| What it says it is, verbatim | *"AI teammates you can give real work to. Bots can sign and use apps and websites just like you do on a persistent cloud computer."* ✅ |

**Does state persist across sessions, where, in what format?** **Yes, for both, differently.** Build: session JSONL under `~/.grok/sessions/…`, resumable/forkable; memory Markdown+SQLite, **off by default**. Bot: *"named Bots keep memory, files, browser sessions, and preferences across turns"* — files live in a shared `/workspace`; memory format is undocumented. ✅ UG/13, UG/17 · ✅ BOT/overview

**Does it serve more than one person?** **Build: primarily one operator, with real org-enforced config** — `managed_config.toml`, signed `requirements.toml`, team OAuth — but no named tenant object; memory and grants stay under `$HOME`. **Bot: one computer per member**, with team-admin and organization-admin roles managing the fleet from the Cursor dashboard; a shared Bot copies configuration only, *"not your computer, logins, or conversation history."* ✅ UG/09, UG/22, UG/26 · ✅ BOT/teams-and-enterprises, BOT/bots

**Does it bind mechanically, or only by prose?** **Build: mechanically by default order, with two stated failure modes.** `deny` rules always win the permission engine regardless of order; a kernel sandbox (Landlock/Seatbelt) is available and unbypassable by any mode **but ships off by default**; *"Hooks fail open. If a hook script crashes, times out, or is missing, the tool call proceeds as if the hook had allowed it."* **Bot: mechanically at the approval layer, with a model-based backstop** — *"Auto Review is model-based and should complement, not replace, least privilege"*; *"Do not use separate Bots as a security boundary."* ✅ UG/18, UG/22 · ✅ BOT/approvals-security-and-privacy

**Loop question.** **Build runs the loop itself** — `xai-grok-shell` is *"agent runtime + leader/stdio/headless entry points"* — and exposes it via ACP and a self-hosted server; it reads Claude's and Cursor's conventions live rather than hosting either. **Bot is a hosted product whose loop is not user-visible.** **Whether Bot's loop is Build is unverified at source**: the Build repo ships a `bot.*` relay protocol and a Computer Hub tool registry (`GROK_BOT_TOOL_IDS`) that talk to a Bot's box, and its own docs say *"Grok's hosted cloud sandboxes do not run `grok agent serve`"* — shared plumbing ✅, "Bot runs on Build" ⚠️. No further primary source resolves it. ✅ repo `xai-tool-protocol`, `xai-computer-hub-core` · ✅ UG/15

**Altitude.** **Build: runtime** — one loop, embeddable via ACP/SDK, reads other harnesses' files without hosting them. **Bot: hosted product (loop not user-visible)** — a persistent cloud computer per member, consumed through connectors and approval cards, exposing no SDK of its own.

</details>

## 8. Limits

<details>
<summary>What it does not claim, in the vendor's words</summary>

**Grok Build** ✅

> *"External contributions are not accepted."* / *"The public tree is published for source transparency and local builds."* — README, CONTRIBUTING.md

> *"Hooks fail open. If a hook script crashes, times out, or is missing, the tool call proceeds as if the hook had allowed it."* — UG/22

> *"Allow rules are not a closed allowlist… Treat the read-only command list as a convenience, not a security boundary."* — UG/22

> *"Memory is experimental and disabled by default."* — UG/13

> *"Sandbox mode is off by default."* *"Child-network blocking is enforced on Linux only… On macOS it is a no-op."* — UG/18

> *"Only the top-level session spawns subagents. A subagent cannot spawn its own subagents: the maximum nesting depth is one."* — UG/16

> *"Codex's `skills`, `rules`, `agents`, `mcps`, and `hooks` cells are reserved and currently inert."* — UG/05

> *"This is a server you run yourself — Grok's hosted cloud sandboxes do not run `grok agent serve`."* — UG/15

**Grok Bot** ✅

> *"Grok Bot is in beta."* *"Enterprise users can join a waitlist for future access."* — x.ai/news

> *"Do not use separate Bots as a security boundary."* *"Sharing a Bot is not a security boundary."* *"Auto Review is model-based and should complement, not replace, least privilege and explicit approval boundaries."* — BOT/approvals-security-and-privacy

> *"An audit view of Bot actions is coming."* *"Model choice is fully managed by the product."* *"No [per-product spend cap] exists yet."* — BOT/teams-and-enterprises

> *"Memory is not a substitute for an authoritative source."* — BOT/bots

> *"One Bot can run one computer-use task on its screen at a time." "Android and iPad aren't supported at launch."* — BOT/faq

</details>

## 9. Sources

<details>
<summary>Primary · secondary · placement · diagrams not redrawn</summary>

**All primary sources accessed 2026-09-02. No source was re-read at the 2026-09-07 restructure.**

**Primary — Grok Build.** `gh api repos/xai-org/grok-build` (+ `/commits`, `/releases`, `/tags`, `/contents/...`) · `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `SOURCE_REV` · all 27 files of `crates/codegen/xai-grok-pager/docs/user-guide/` (UG/01–27) · `crates/codegen/xai-grok-shell/README.md` · `crates/common/xai-tool-protocol/src/methods.rs` · `crates/common/xai-computer-hub-core/src/lib.rs` · `gh api search/code` for "bot relay", "landlock" · `x.ai/news/grok-build-open-source` · `docs.x.ai/build/{overview,enterprise,modes-and-commands}`.

**Primary — Grok Bot.** `x.ai/news/introducing-grok-bot` · `docs.x.ai/grok-bot/{overview,get-started,use-cases,skills-routines-and-automations,computer-and-apps,approvals-security-and-privacy,teams-and-enterprises,bots,faq,mobile}`.

**Secondary (↪).** `ai-sdk.dev/providers/ai-sdk-harnesses/grok-build` (Vercel's own docs for its Build adapter — primary for that adapter) · a blog comparing Bot/Automations/Build, checked only for the Bot↔Build claim and making none · WebSearch snippets used only to locate primary pages.

**Placement.** Short-profiles row: [`comparisons/systems/90-short-profiles.md`](../comparisons/systems/90-short-profiles.md) §1 · grid columns: [`comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2 and [`comparisons/02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 · index row: [`index.md`](../index.md) · positioning: [`spectrums/positioning.md`](../spectrums/positioning.md).

**Diagrams not redrawn.** **No diagram inventory was taken at the 2026-09-02 read.** Whether either product's docs carry vendor diagrams is unknown and unrecorded — a gap in the read, not a finding about the vendor. The diagram pass (W8c) opens the sources and records what it finds.

</details>

## 10. Unverified

<details>
<summary>12 items</summary>

- **Grok Build's current version number** — no GitHub releases/tags exist; changelog page returns 403; only `0.2.1xx`-style example strings appear in docs. ⚠️
- **Whether Grok Bot's agent loop is Grok Build** — the repo ships a `bot.*` relay protocol and a Computer Hub tool registry (`GROK_BOT_TOOL_IDS`), but no xAI page states the relationship and no reputable secondary asserts it either. ⚠️
- **Grok Bot's skill file format / storage location** — whether it is `SKILL.md`-compatible is never stated. ⚠️
- **Grok Bot's memory format and location** — opaque throughout. ⚠️
- **Whether `docs.x.ai/build/overview`'s sidebar link to "Grok Bot Overview" is more than navigation** — the fetch tool reported the sibling list as "likely"; treated as nav only. ⚠️
- **Default model discrepancy** — UG/11 says new sessions start on `grok-4.5`; `docs.x.ai/build/overview` says `grok-4.6`. Both read directly; which applies depends on build. ✅ both quoted, ⚠️ which is current.
- **Ownership naming** — every primary source says "SpaceXAI"; no page explains a rename from "xAI", and the merger context comes only from secondary snippets. ↪
- **`[harness] disable_workspace_teleport`** exists in the config reference with a one-line description ("kill switch for per-turn workspace snapshots"); its purpose beyond that is undocumented. ⚠️
- **JetBrains support** — docs say "Coming soon," no date. ⚠️
- **Bot pricing** — only plan-inclusion statements were found on primary pages; secondary snippets disagree with each other. ⚠️ not reported.
- **Grok Bot's "Troubleshooting" and "Settings and notifications" pages** — referenced by other Bot pages but not fetched. ⚠️
- **The date Bot's own audit view ships** — *"an audit view of Bot actions is coming"* names no date. ⚠️

**Added at the 2026-09-07 restructure, and not source questions:** the primitive-discipline split between Build (⚠️ contestable, 8 past the 5–7 band) and Bot (healthy, 6) is recorded but not resolved into one number (§5); no diagram inventory exists for either product (§2, §3, §9); and whether the scoring sheet's `split:` mechanism should gain a formal "product pair" case, distinct from the posture-vs-mechanism case it was built for, is an open question about the instrument, not about Grok.

</details>
