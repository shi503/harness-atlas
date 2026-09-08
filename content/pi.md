---
title: "Pi — the minimal harness that refuses its own primitives"
tier: reference
project: harness-atlas
created: "2026-09-02"
updated: "2026-09-07"
status: DRAFT
owner: KD
source: "github.com/earendil-works/pi (formerly badlogic/pi-mono) @ v0.84.4 · packages/coding-agent/docs · read 2026-09-02"
provenance: OBSERVED
template: "v2 (restructured from the v1 read of 2026-09-02, no re-read)"
verification:
  derived_from:
    - "github.com/earendil-works/pi (formerly badlogic/pi-mono) @ v0.84.4 · packages/coding-agent/docs · read 2026-09-02"
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

# Pi — Mario Zechner · Earendil

***A TypeScript terminal harness whose defining move is subtraction: it publishes what it will not
ship — MCP, sub-agents, permission popups, plan mode, to-dos, background bash — and ships each as an
example extension instead, so the loop is minimal and everything above it is yours to author.***

> **Profile drafted 2026-09-02 by `claude-opus-5`, not yet verified.** Attested, not captured — see `verification:` above.

## 1. At a glance

| | |
|---|---|
| **Altitude** | Runtime — runs the loop itself, and ships an SDK and RPC mode for embedding → [§7](#7-identity-and-inclusion-test) |
| **Primitives** | 8, ⚠️ contestable — extension · skill · prompt template · theme · pi package · session · settings · context file → [§5](#5-primitives) |
| **Structured output** | The session JSONL **tree** — `id`/`parentId` branching, with `usage`, `cost`, model and `stopReason` per entry → [8b](#8b-evidence) |
| **Binds mechanically?** | Only where you install the mechanism — *"Pi does not include a built-in permission system"* → [2c](#2c-enforcement) |
| **State persists** | Session JSONL at `~/.pi/agent/sessions/--<path>--/`, resumable and forkable; no memory feature → [5a](#5a-individual-memory) |
| **Serves** | One operator; project `.pi/settings.json` *"can be shared with your team"*, and nothing else knows a second person exists → [10b](#10b-org) |
| **Refuses** | A published refusal list — *"No MCP. No sub-agents. No permission popups. No plan mode. No built-in to-dos. No background bash."* → [§5](#5-primitives) |
| **Coverage** | ● 6 · ◐ 11 · ○ 16 · n/a 0 → [§4](#4-component-matrix) |
| **Source** | earendil-works/pi @ v0.84.4 · `packages/coding-agent/docs` · read 2026-09-02 |
| **Unverified** | 9 items → [§10](#10-unverified) |

### 1a. Positioning stats

`−1 · −2 · +2 · −3 · +2† · +3 · +1` — the seven DX dimensions, in order.

> **⚠️ Drafted 2026-09-07, not yet verified.** Derived from Pi's own README, docs and RFC index, and
> the maintainer's post about the Earendil sale — grounded against §4, §5 and §7 below. No person has
> re-read these seven values yet. [`01-scorecard.md`](../spectrums/01-scorecard.md) §1 R11 says how the
> banner comes off.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `──●────` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─●─────` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Context | nothing survives | `●──────` | shared, durable, retrievable |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `────●──` | observability, efficiency, routing |

**†** the one **graded** dimension; every other row is a position, not a score. **Neither end is
better.** Ten axes sit beneath these seven — `I −1 · II 0 · III −1 · IV +3 · V +2 · VI −2 · VII +2 ·
VIII +1 · IX 0 · X +1` — and four of them feed no cell above by design.

→ [`spectrums/positioning.md`](../spectrums/positioning.md#3-pi) ·
[`positions/pi.yaml`](../spectrums/positions/pi.yaml) ·
[`01-scorecard.md`](../spectrums/01-scorecard.md) · [`00-README.md`](../spectrums/00-README.md)

*Scored 2026-09-07 against this profile as read 2026-09-02. This table is the **one sanctioned echo**
of the scorecard — derived from the same YAML that renders `positioning.md`, so the two match by
construction. Re-score in the YAML, never here.*

### 1b. Contents

[§1 At a glance](#1-at-a-glance) · [1a Positioning stats](#1a-positioning-stats) ·
[§2 System map](#2-system-map) · [§3 Workflows](#3-workflows) ·
[§4 Component matrix](#4-component-matrix) · [§5 Primitives](#5-primitives) ·
[§6 Details](#6-details) · [§7 Identity and inclusion test](#7-identity-and-inclusion-test) ·
[§8 Limits](#8-limits) · [§9 Sources](#9-sources) · [§10 Unverified](#10-unverified)

**Deep read** — [`content/pi/`](./pi/00-README.md), a 5-document extensibility reference set at a finer
grain than §6: [the refusals](./pi/01-the-refusals.md) · [extensions](./pi/02-extensions.md) ·
[resources, scope and trust](./pi/03-resources-scope-and-trust.md) ·
[the consolidated guide](./pi/20-consolidated-guide.md)

*Read 2026-09-08 at `v0.85.1`, six days and one tag after this profile's source read. Deliberately
three surface documents: Pi's own `DOCS/` is thorough and well-navigated, so only the three things it
leaves unassembled earn a page — `00-README.md` says which and why.*

`content/pi-draft.md` is a superseded `--sanity` draft, kept as history and not a reading path.

## 2. System map

**Diagram inventory not done at the 2026-09-02 read — pending the diagram pass (W8c).** No
`assets/projects/pi/` exists, and no vendor diagram was inventoried when the source read was taken.
This is a recorded gap, not an absence: the read predates the diagram obligation.

**How it thinks about work.** A unit of work is one turn in one session, and the session is a
**tree**, not a line — every entry carries an `id` and a `parentId`, so branching happens in place
rather than by copying a file. The loop itself is `@earendil-works/pi-agent-core`; the CLI wraps it as
`AgentSession`. Nothing gates entry and nothing gates a tool call by default — *"By default, it runs
with the permissions of the user and process that launched it."* What shapes a run is the extension
set the operator installed: ~40 typed lifecycle events, one of which (`tool_call`) can block. Work
lands as file edits and shell effects; the receipt is the session file, which is also the thing you
resume, fork, export and share.

## 3. Workflows

**Not written at the 2026-09-02 read — pending the diagram pass (W8c).** A recorded gap. The three
sequences a workflow pass should draw, each already evidenced in §6 and needing no new source read:

1. **The turn and the extension event chain** — `input` → `before_agent_start` → `turn_start` →
   `tool_call` (can block) → `tool_execution_*` → `tool_result` → `turn_end` → `agent_end`
   ([2b](#2b-hooks)).
2. **Session as a tree** — `/fork`, `/clone`, `/tree`, branch summaries, and where compaction enters
   ([8b](#8b-evidence), [8d](#8d-efficiency)).
3. **Package install and resource resolution** — `pi install npm:|git:` → project trust →
   per-scope enable/disable → hot reload ([4a](#4a-capability), [4b](#4b-capability-permissions)).

## 4. Component matrix

`● named primitive · ◐ partial, present-not-first-class · ○ absent (pages named in §6) · n/a does not apply at this altitude`

**Marks copied verbatim from Pi's column in [`04-harness-alignment.md`](../components/ALIGNMENT.md) §2; not re-derived at the restructure.**

| # | Component | Mark | Primitive / note |
|---|---|:-:|---|
| **0 · Foundation** | | | |
| [0a](#0a-substrate) | Substrate | ● | 31 API-key providers + subscriptions + local llama.cpp; custom providers via extension |
| **1 · Environment** | | | |
| [1a](#1a-environment) | Environment | ○ | Local shell and filesystem at the launching user's permissions; no declared inventory |
| **2 · Agent Harness** | | | |
| [2a](#2a-adapters--middleware) | Adapters & Middleware | ● | [**Extension**](#5-primitives) `ExtensionAPI` + SDK + RPC + JSON — **no MCP, by refusal** |
| [2b](#2b-hooks) | Hooks | ● | ~40 typed lifecycle events, TypeScript handlers; `tool_call` can block |
| [2c](#2c-enforcement) | Enforcement | ◐ | No built-in permission system or sandbox; `--tools` allowlist and project trust are the levers |
| **3 · System Stacks** | | | |
| [3a](#3a-control) | Control | ◐ | No plan mode; the shipped `plan-mode/` example is one |
| [3b](#3b-routing) | Routing | ○ | Manual model routing only; no automatic delegation rules |
| [3c](#3c-composition) | Composition | ◐ | No sub-agents; the shipped `subagent/` example spawns separate `pi` processes |
| [3d](#3d-configuration) | Configuration | ● | [**Context file**](#5-primitives) + [**Settings**](#5-primitives) with project-over-global merge |
| [3e](#3e-standards) | Standards | ○ | No rules pack shipped; prompt templates and pinned packages are the vehicles |
| **4 · Capabilities** | | | |
| [4a](#4a-capability) | Capability | ● | [**Pi package**](#5-primitives) bundling [**skill**](#5-primitives) · extension · prompt template · theme |
| [4b](#4b-capability-permissions) | Capability Permissions | ◐ | Skill `allowed-tools`, per-package filtering, per-scope enable/disable; no per-user ACLs |
| **5 · Context ⟳** | | | |
| [5a](#5a-individual-memory) | Individual Memory | ○ | No memory feature — grep of docs and README found none |
| [5b](#5b-team-memory) | Team Memory | ○ | Project `.pi/` shared via VCS; nothing team-aware |
| [5c](#5c-knowledge) | Knowledge | ○ | No RAG, embeddings or wiki; SQLite FTS over own sessions in a separate package |
| **6 · Workspaces ⟳** | | | |
| [6a](#6a-product) | Product | ○ | |
| [6b](#6b-infrastructure) | Infrastructure | ◐ | Gondolin micro-VM, Docker, NVIDIA OpenShell, SSH — all delegated outward |
| [6c](#6c-estate) | Estate | ○ | No multi-repo model; sessions keyed per working directory |
| [6d](#6d-delivery) | Delivery | ○ | Nothing built in; git examples only |
| **7 · Workflow Tasks** | | | |
| [7a](#7a-workflow-tasks) | Workflow Tasks | ○ | Deliberately none — *"They confuse models. Use a TODO.md file"* |
| **8 · Trust** | | | |
| [8a](#8a-evals) | Evals | ◐ | `packages/evals` with baseline/candidate lift — dev-facing, not a ship gate |
| [8b](#8b-evidence) | Evidence | ● | [**Session**](#5-primitives) JSONL tree — the receipt, with per-entry `usage` and `cost` |
| [8c](#8c-observability) | Observability | ◐ | `pi-telemetry` vendor-neutral contracts — **no exporter shipped** |
| [8d](#8d-efficiency) | Efficiency | ◐ | Token/cost/cache footer, compaction, cache retention, thinking budgets; **no spend limits** |
| **9 · IMPROVE** | | | |
| [9a](#9a-learning) | Learning | ○ | No auto-capture; self-extension is the stated posture |
| [9b](#9b-rituals) | Rituals | ○ | Nothing encoded; user-authored prompt templates only |
| [9c](#9c-cadence) | Cadence | ○ | Nothing here; `pi -p` from cron is the external route |
| [9d](#9d-anti-fragile-lifecycle) | Anti-fragile Lifecycle | ◐ | Retry budgets, auto-compaction recovery, staged `pi update` with rollback |
| [9e](#9e-raise-the-floor) | Raise the Floor | ◐ | Installer, `/login`, `/settings`, `pi config` TUI; no `doctor`, no `init` |
| [9f](#9f-diagnose-the-bottleneck) | Diagnose the Bottleneck | ○ | Nothing here; `/session` stats are the nearest |
| **10 · Teams & Agents** | | | |
| [10a](#10a-roster) | Roster | ○ | Nothing built in; the subagent example uses Markdown personas |
| [10b](#10b-org) | Org | ○ | Single operator; no ownership, RACI or escalation |
| **11 · Surfaces** | | | |
| [11a](#11a-surfaces) | Surfaces | ◐ | TUI · print · JSON · RPC · SDK · experimental remote protocol; no IDE shipped |
| **● 6 · ◐ 11 · ○ 16 · n/a 0** | | | |

## 5. Primitives

| Primitive | Path / key | Project's own definition (verbatim) | Source |
|---|---|---|---|
| Extension | `~/.pi/agent/extensions/*.ts`; `.pi/extensions/`; `-e <path\|npm:\|git:>` | *"Extensions are TypeScript modules that extend pi's behavior. They can subscribe to lifecycle events, register custom tools callable by the LLM, add commands, and more."* | ✅ `DOCS/extensions.md` |
| Skill | `~/.pi/agent/skills/`, `~/.agents/skills/`, `.pi/skills/`; `SKILL.md` with `name`, `description` | *"Skills are self-contained capability packages that the agent loads on-demand… Pi implements the Agent Skills standard, warning about most violations but remaining lenient."* | ✅ `DOCS/skills.md` |
| Prompt template | `~/.pi/agent/prompts/*.md`, `.pi/prompts/*.md`; invoked `/name` | *"Prompt templates are Markdown snippets that expand into full prompts."* | ✅ `DOCS/prompt-templates.md` |
| Theme | `~/.pi/agent/themes/*.json`, `.pi/themes/`; `--theme` | *"Built-in: `dark`, `light`. Themes hot-reload."* | ✅ `CA/README.md` |
| Pi package | `package.json` → `"pi": { extensions, skills, prompts, themes }` + keyword `pi-package` | *"Pi packages bundle extensions, skills, prompt templates, and themes so you can share them through npm or git."* — bundles the four above | ✅ `DOCS/packages.md` |
| Session (tree) | `~/.pi/agent/sessions/--<path>--/<timestamp>_<uuid>.jsonl` | *"Sessions are stored as JSONL files with a tree structure. Each entry has an `id` and `parentId`, enabling in-place branching without creating new files."* | ✅ `CA/README.md` |
| Settings | `~/.pi/agent/settings.json` (global), `.pi/settings.json` (project) | *"Pi uses JSON settings files with project settings overriding global settings."* | ✅ `DOCS/settings.md` |
| Context file | `~/.pi/agent/AGENTS.md`; `AGENTS.md`/`CLAUDE.md` up the tree; `AGENTS.override.md` | *"Pi loads `AGENTS.md` (or `CLAUDE.md`) at startup… All matching files are concatenated."* | ✅ `CA/README.md` |
| (supporting) Project trust | `~/.pi/agent/trust.json`; `defaultProjectTrust`; `/trust` | *"Project trust controls whether pi loads project-local settings, resources, packages, and extensions. It is not a sandbox…"* | ✅ `DOCS/security.md` |
| (supporting) Tool | built-ins `read bash powershell edit write grep find ls`; `pi.registerTool()` | *"By default, pi gives the model four tools: `read`, `write`, `edit`, and `bash`."* | ✅ `CA/README.md` |
| (supporting) models.json | `~/.pi/agent/models.json` | *"Add providers via `~/.pi/agent/models.json` if they speak a supported API… For custom APIs or OAuth, use extensions."* | ✅ `CA/README.md` |

**Count:** 8 primitives, 3 supporting *(as counted at the 2026-09-02 read)*. **Verdict:** ⚠️ contestable
— one past this corpus's 5–7 healthy band, and **the count is disputed against itself**: this profile's
source read gave 8 + 3 on 2026-09-02, and the `--sanity` draft gave 5 + 3 on 2026-09-03 from the same
sources. `fractal/ISSUES.md` ISSUE-007 records the disagreement; rule 4's primitive-vs-supporting
definition is the resolution and **has not been re-run at a source read**. Carried forward unchanged.

**The published refusal list**, quoted in full — the clearest in this corpus, and the reason the
verdict is not simply "accommodation":

> *"**No MCP.** Build CLI tools with READMEs (see Skills), or build an extension that adds MCP support.
> **No sub-agents.** There's many ways to do this. Spawn pi instances via tmux, or build your own with
> extensions, or install a package that does it your way. **No permission popups.** Run in a container,
> or build your own confirmation flow with extensions inline with your environment and security
> requirements. **No plan mode.** Write plans to files, or build it with extensions, or install a
> package. **No built-in to-dos.** They confuse models. Use a TODO.md file, or build your own with
> extensions. **No background bash.** Use tmux. Full observability, direct interaction."* — ✅ `CA/README.md`

## 6. Details

`✅ direct · ↪ relayed · ⚠️ unverified`

### 0 · Foundation

#### 0a Substrate
<details>
<summary>● 31 API-key providers + subscriptions + local llama.cpp; custom providers via extension</summary>

**Ships.** Model-pluggable via `@earendil-works/pi-ai` — *"Unified multi-provider LLM API (OpenAI, Anthropic, Google, …)"*. Subscriptions: Anthropic Claude Pro/Max, OpenAI ChatGPT Plus/Pro, GitHub Copilot. 31 API-key providers listed including Bedrock, Vertex, Azure OpenAI, Mistral, Groq, Cerebras, xAI, OpenRouter, Together, Fireworks. Local via llama.cpp router. Thinking levels `off…max`.
**Path.** `/model`, `/thinking`, `--provider`, `--model provider/id:thinking`; `~/.pi/agent/models.json`; `pi.registerProvider()` in an extension
**Source.** ✅ `CA/README.md` §Providers & Models · `DOCS/models.md` · `DOCS/custom-provider.md`

</details>

### 1 · Environment

#### 1a Environment
<details>
<summary>○ Local shell and filesystem at the launching user's permissions; no declared inventory</summary>

**Nothing here** as a declared systems inventory — checked `CA/README.md`, `DOCS/index.md`, `DOCS/settings.md`, `DOCS/containerization.md`.
**What exists instead.** Local shell and filesystem with the launching user's permissions. Built-in tools `read`, `bash`, `powershell`, `edit`, `write`, `grep`, `find`, `ls`; the model gets four by default. Pluggable operations (`ReadOperations`, `BashOperations`, …) plus a bash `spawnHook` let an extension redirect execution — examples `ssh.ts`, `sandbox/`, `gondolin/`.
**Source.** ✅ `CA/README.md` §Quick Start · `DOCS/extensions.md` §Remote Execution

</details>

### 2 · Agent Harness

#### 2a Adapters & Middleware
<details>
<summary>● <b>Extension</b> ExtensionAPI + SDK + RPC + JSON — no MCP, by refusal</summary>

**Ships.** Provider abstraction `pi-ai`; loop `pi-agent-core`; tool registry and middleware via `ExtensionAPI` — `registerTool`, `on(event)`, `registerCommand`, `registerProvider`, `registerFlag`, `setActiveTools`, `sendMessage`, and an inter-extension bus. Provider-request middleware at `before_provider_headers` / `before_provider_request` / `after_provider_response`. Process integration by `--mode rpc` (JSONL), `--mode json`, and the SDK. Experimental remote protocol `pi-protocol` (CBOR frames), `pi-client`, `pi-server`.
**No MCP, and it is a refusal, not a gap** — *"**No MCP.** Build CLI tools with READMEs, or build an extension that adds MCP support."* A third-party MCP adapter package is listed on the gallery.
**Path.** `pi.*` ExtensionAPI · `--mode rpc|json` · `@earendil-works/pi-{protocol,client,server}`
**Source.** ✅ `DOCS/extensions.md` §ExtensionAPI Methods · `CA/README.md` §Philosophy · package READMEs

**More.** [`02-extensions.md`](./pi/02-extensions.md) — the twenty-six `pi.*` methods grouped, both context objects, built-in tool override and the pluggable-operations path · [`01-the-refusals.md`](./pi/01-the-refusals.md) §3 — **no MCP example ships**, naming what was checked

</details>

#### 2b Hooks
<details>
<summary>● ~40 typed lifecycle events, TypeScript handlers; <code>tool_call</code> can block</summary>

**Ships.** Extensions subscribe to named lifecycle events across seven groups — startup (`project_trust`), resources, session (`session_start`, `session_before_switch`/`_fork`/`_compact`, all cancellable, `session_tree`, `session_shutdown`), agent (`before_agent_start` which can inject a message or modify the system prompt, `turn_start`/`_end`, `message_*`, `tool_execution_*`, `context`, the three provider events), model (`model_select`, `thinking_level_select`), tool (`tool_call` — **can block**, input mutable; `tool_result` — can modify), user bash, and input (intercept/transform).
**Handlers are TypeScript, not shell scripts.**
**Path.** `~/.pi/agent/extensions/*.ts`, `.pi/extensions/*.ts`, `-e <path>`; `pi.on("<event>", handler)`
**Source.** ✅ `DOCS/extensions.md` §Events, §Lifecycle Overview · `CA/CHANGELOG.md` 0.84.4

**More.** [`02-extensions.md`](./pi/02-extensions.md) — every event with what its handler may return, and the ordering rules each stated once. **Counts 36 events in eight groups as of 2026-09-08 at v0.85.1**; this row's "~40, seven groups" is the 2026-09-02 read at v0.84.4. Both stand

</details>

#### 2c Enforcement
<details>
<summary>◐ No built-in permission system or sandbox; <code>--tools</code> allowlist and project trust are the levers</summary>

**Ships.** Nothing by default — *"Pi does not include a built-in permission system for restricting filesystem, process, network, or credential access."* The mechanical levers that do exist: the `tool_call` handler returning `{ block: true, reason, terminate }` (with *"tool_call errors block the tool (fail-safe)"*); CLI `--tools` allowlist, `--exclude-tools`, `--no-tools`, `--no-builtin-tools`, and `defaultTools`; **project trust**, which gates loading of `.pi/` settings, extensions, skills and prompts. OS isolation is delegated outward to Gondolin, Docker or NVIDIA OpenShell.
**The vendor bounds the claim itself** — *"Project trust is only an input-loading guard… It does not make untrusted code, untrusted prompts, or untrusted model output safe."*
**Path.** `pi.on("tool_call")` · `--tools` · `~/.pi/agent/trust.json`, `defaultProjectTrust`, `/trust`
**Source.** ✅ `DOCS/extensions.md` §tool_call · `CA/README.md` §Tool Options · `DOCS/security.md`

**More.** [`03-resources-scope-and-trust.md`](./pi/03-resources-scope-and-trust.md) §§2–3 — exactly what trust gates, what it never gates, and the three-step resolution order · [`02-extensions.md`](./pi/02-extensions.md) §2 — `tool_call`'s block contract, input mutation without re-validation, and the conditional `terminate`

</details>

### 3 · System Stacks

#### 3a Control
<details>
<summary>◐ No plan mode; the shipped <code>plan-mode/</code> example is one</summary>

**Ships.** No built-in plan mode — *"**No plan mode.** Write plans to files, or build it with extensions, or install a package."* The shipped example supplies `/plan`, a `--plan` flag, `Ctrl+Alt+P`, plan extraction and `[DONE:n]` markers. Approval affordances: the project-trust prompt at startup, `ctx.ui.confirm()` for extensions, `timed-confirm.ts`. Run contracts: interactive, `-p` print, `--mode json`, `--mode rpc` with `streamingBehavior: "steer" | "followUp"`, and a message queue where Enter steers and Alt+Enter follows up.
**Path.** `EX/plan-mode/` · `--mode rpc` `prompt` · `steeringMode`/`followUpMode`
**Source.** ✅ `CA/README.md` §Philosophy, §Message Queue · `EX/plan-mode/README.md` · `DOCS/rpc.md`

**More.** [`01-the-refusals.md`](./pi/01-the-refusals.md) §4 — the plan-mode example's full command allowlist and blocklist, and the refusal's stated reason from the 2025-11-30 post

</details>

#### 3b Routing
<details>
<summary>○ Manual model routing only; no automatic delegation rules</summary>

**Nothing here** as a resolver — checked `CA/README.md` §Commands, `DOCS/settings.md`, `DOCS/extensions.md`.
**What exists instead.** Manual model selection: `/model`, Ctrl+P cycling over a scoped list (`--models "claude-*,gpt-4o"`, `enabledModels`, `/scoped-models`), per-model thinking defaults, the `model_select` event, `pi.setModel()`. Examples `handoff.ts` (cross-provider handoff) and `preset.ts`. Agent routing exists only inside the subagent example, where the caller names the agent.
**Source.** ✅ `CA/README.md` §Model Options · `DOCS/extensions.md` §Examples Reference

</details>

#### 3c Composition
<details>
<summary>◐ No sub-agents; the shipped <code>subagent/</code> example spawns separate <code>pi</code> processes</summary>

**Ships.** No built-in sub-agents — *"**No sub-agents.** … Spawn pi instances via tmux, or build your own with extensions."* The shipped example makes each subagent *"a separate `pi` process"*, with agent definitions as Markdown at `~/.pi/agent/agents/*.md` and `.pi/agents/*.md` (project scope off by default), sample personas `scout`, `planner`, `reviewer`, `worker`, and workflow presets as prompt templates. System-prompt composition: `.pi/SYSTEM.md` replaces, `APPEND_SYSTEM.md` appends, `--system-prompt` / `--append-system-prompt`, and `before_agent_start` can modify.
**Path.** `EX/subagent/` · `~/.pi/agent/agents/*.md` · `agentScope`, `confirmProjectAgents`
**Source.** ✅ `EX/subagent/README.md` · `CA/README.md` §Philosophy, §System Prompt

**More.** [`01-the-refusals.md`](./pi/01-the-refusals.md) §4 — the three tool modes, the caps (max 8 tasks, 4 concurrent, 50 KB per task), agent-frontmatter fields, model inheritance, and the manual symlink install

</details>

#### 3d Configuration
<details>
<summary>● <b>Context file</b> + <b>Settings</b> with project-over-global merge</summary>

**Ships.** Instruction files `AGENTS.md` or `CLAUDE.md` loaded from `~/.pi/agent/AGENTS.md`, every parent directory walking up, and cwd — all concatenated; `AGENTS.override.md` replaces that directory's file; `--no-context-files` disables. Settings at `~/.pi/agent/settings.json` (global) and `.pi/settings.json` (project, *"overrides global"*, nested objects merged, `defaultProjectTrust`/`httpProxy` global-only, project `defaultTools` replaces rather than merges). Keybindings, `PI_CODING_AGENT_DIR`, `PI_PACKAGE_DIR`, and a session-dir precedence chain.
**Path.** `~/.pi/agent/{settings,keybindings}.json` · `.pi/settings.json` · `pi config`
**Source.** ✅ `CA/README.md` §Context Files, §Settings · `DOCS/settings.md` §Project Overrides

**More.** [`03-resources-scope-and-trust.md`](./pi/03-resources-scope-and-trust.md) §§1, 5 — the four resource types against all six sources, path resolution per settings file, and the merge rule

</details>

#### 3e Standards
<details>
<summary>○ No rules pack shipped; prompt templates and pinned packages are the vehicles</summary>

**Nothing here** as a shipped standard — checked `DOCS/prompt-templates.md`, `DOCS/packages.md`, `DOCS/extensions.md`.
**What exists instead.** Vehicles that could carry one: prompt templates, skills, `AGENTS.md`, and versioned pi packages pinned by npm `@ver` or git `@tag`. The example `claude-rules.ts` loads rules from files. The repo's own `AGENTS.md` is a concrete rules file for its contributors.
**Source.** ✅ `DOCS/prompt-templates.md` · `DOCS/packages.md` · `REPO/AGENTS.md`

</details>

### 4 · Capabilities

#### 4a Capability
<details>
<summary>● <b>Pi package</b> bundling <b>skill</b> · extension · prompt template · theme</summary>

**Ships.** Four resource types in one container. Skills follow the Agent Skills standard and load from four directory roots plus Claude/Codex skill dirs. Extensions, prompt templates and themes each have global and project roots. **Pi packages** bundle all four: `pi install npm:@foo/pi-tools[@ver]`, `git:github.com/user/repo[@ref]`, https, ssh or a local path; `-l` installs project-local; `pi list`, `pi update --all|--extensions|--self`, `pi remove`; manifest is a `"pi"` key in `package.json` plus the keyword `pi-package`. Registry is npm search on that keyword plus the gallery at pi.dev/packages, **which showed 5,618 packages at the read**. `/reload` hot-reloads.
**Path.** `pi install` · `~/.pi/agent/{npm,git}/` · `.pi/{npm,git}/` · https://pi.dev/packages
**Source.** ✅ `DOCS/packages.md` · `DOCS/skills.md` · `CA/README.md` §Pi Packages

**More.** [`03-resources-scope-and-trust.md`](./pi/03-resources-scope-and-trust.md) §4 — the three source types with their install roots and pinning behaviour, the dependency rule, and cross-scope dedup. **The gallery showed 5,536 on 2026-09-08**; this row's 5,618 is the 2026-09-02 read

</details>

#### 4b Capability Permissions
<details>
<summary>◐ Skill <code>allowed-tools</code>, per-package filtering, per-scope enable/disable; no per-user ACLs</summary>

**Ships.** Skill frontmatter `allowed-tools` (*"Space-delimited list of pre-approved tools (experimental)"*) and `disable-model-invocation: true`. Per-tool control by `--tools`/`--exclude-tools`/`defaultTools` and `pi.setActiveTools()`. Per-package filtering in the settings object form with glob include/exclude and `+path`/`-path`. `pi config` enables or disables each resource, global versus project. Project resources load only after trust.
**No per-user ACLs** — there is no user model to hang them on ([10b](#10b-org)).
**Path.** `SKILL.md` frontmatter · `settings.json` package objects · `pi config`
**Source.** ✅ `DOCS/skills.md` §Frontmatter · `DOCS/packages.md` §Package Filtering

**More.** [`03-resources-scope-and-trust.md`](./pi/03-resources-scope-and-trust.md) §4 — the full filter grammar (`!`, `+path`, `-path`, `[]`) and why filters only ever narrow

</details>

### 5 · Context ⟳

#### 5a Individual Memory
<details>
<summary>○ No memory feature — grep of docs and README found none</summary>

**Nothing here** — checked `CA/README.md`, every `DOCS/*.md`, `DOCS/settings.md`, `DOCS/sessions.md`, `DOCS/extensions.md`. A grep for *"memory"* excluding in-memory/RAM senses returned nothing: no memory files, no auto-memory.
**What exists instead.** Manual global instructions at `~/.pi/agent/AGENTS.md`; resumable session transcripts (`-c`, `/resume`); extension state written into the session via `pi.appendEntry()` (*"Session persistence — Store state that survives restarts"*). The sibling `pi-chat` claims *"Durable memory — account-wide and channel-specific memory files"* — ↪ separate repo, README only.
**Source.** ✅ `CA/README.md` · `DOCS/*.md` · ↪ pi-chat README

</details>

#### 5b Team Memory
<details>
<summary>○ Project <code>.pi/</code> shared via VCS; nothing team-aware</summary>

**Nothing here** — checked `CA/README.md`, `DOCS/index.md`, `DOCS/settings.md`, `DOCS/packages.md`.
**What exists instead.** Project `.pi/settings.json` and `.pi/` resources shared through version control — *"can be shared with your team, and pi installs any missing packages automatically on startup after the project is trusted"* — which is file sharing, not shared learning. `pi-share-hf` publishes sessions to Hugging Face datasets, a public corpus rather than a team one.
**Source.** ✅ `DOCS/packages.md` · root README §Share your OSS coding agent sessions

</details>

#### 5c Knowledge
<details>
<summary>○ No RAG, embeddings or wiki; SQLite FTS over own sessions in a separate package</summary>

**Nothing here** in the CLI — checked `DOCS/index.md`, `DOCS/sessions.md`, `CA/README.md`.
**What exists instead.** `@earendil-works/pi-session-backend-sqlite-node` provides *"SQLite session repository, migrations, materialized views, and optional FTS search"* for `pi-agent-core` sessions — retrieval over your own transcripts, not curated knowledge. `/tree` and `/resume` search by typing. Web search only through skills.
**Source.** ✅ `packages/session-backends/sqlite-node/README.md` · `DOCS/sessions.md`

</details>

### 6 · Workspaces ⟳

#### 6a Product
<details>
<summary>○ Nothing here</summary>

**Nothing here** — checked `CA/README.md`, `DOCS/index.md`, the examples directory. No PRD or spec object of any kind.
**Source.** ✅ (absence recorded at the 2026-09-02 read)

</details>

#### 6b Infrastructure
<details>
<summary>◐ Gondolin micro-VM, Docker, NVIDIA OpenShell, SSH — all delegated outward</summary>

**Ships.** A local process by default, with three documented isolation patterns, none of them Pi's own: **Gondolin** (an extension; host `pi`, tools inside a local Linux micro-VM with cwd mounted at `/workspace`; needs Node ≥ 23.6 and QEMU); **plain Docker** (`Dockerfile.pi`, cwd bind-mount, named volume for `~/.pi/agent`); **NVIDIA OpenShell** (*"policy-controlled sandbox with filesystem, process, network, credential, and inference controls"*, local or remote Kubernetes gateway). SSH remote execution via the `ssh.ts` example. Experimental remote sessions over `pi-server`. Standalone Bun binaries.
**Path.** `EX/gondolin/` · `Dockerfile.pi` · `openshell sandbox create` · `--ssh`
**Source.** ✅ `DOCS/containerization.md` · `DOCS/extensions.md` §Remote Execution

**More.** [`01-the-refusals.md`](./pi/01-the-refusals.md) §2 — `sandbox/` and `gondolin/` as the shipped answer to the permission refusal, and the fact that **neither carries a README**

</details>

#### 6c Estate
<details>
<summary>○ No multi-repo model; sessions keyed per working directory</summary>

**Nothing here** — checked `DOCS/session-format.md`, `DOCS/skills.md`, `CA/README.md`.
**What exists instead.** Sessions are keyed per working directory (`sessions/--<path>--/`); context files and `.agents/skills` walk parent directories *"up to git repo root"*. One directory at a time, with no inventory of the others.
**Source.** ✅ `DOCS/session-format.md` · `DOCS/skills.md` §Locations

</details>

#### 6d Delivery
<details>
<summary>○ Nothing built in; git examples only</summary>

**Nothing here** — checked `CA/README.md`, `DOCS/index.md`, `DOCS/packages.md`.
**What exists instead.** Examples: `git-checkpoint.ts` (stash on turns), `auto-commit-on-exit.ts`, `git-merge-and-resolve.ts`, `dirty-repo-guard.ts`, `github-issue-autocomplete.ts`. CI use is `pi -p` with guidance on `GIT_TERMINAL_PROMPT` and `GIT_SSH_COMMAND` for package installs. `/share` uploads a private gist.
**Source.** ✅ `DOCS/extensions.md` §Examples Reference · `DOCS/packages.md` §git

</details>

### 7 · Workflow Tasks

#### 7a Workflow Tasks
<details>
<summary>○ Deliberately none — <i>"They confuse models. Use a TODO.md file"</i></summary>

**Nothing here, by refusal** — *"**No built-in to-dos.** They confuse models. Use a TODO.md file, or build your own with extensions."* This is a refusal-list entry, not a gap.
**What exists instead.** The `todo.ts` example (*"Stateful tool with persistence"*) and the plan-mode example's `/todos` with `[DONE:n]` progress markers.
**Source.** ✅ `CA/README.md` §Philosophy · `EX/plan-mode/README.md`

**More.** [`01-the-refusals.md`](./pi/01-the-refusals.md) §§1–2 — the refusal's stated reason, and the two shipped examples that supply to-dos anyway

</details>

### 8 · Trust

#### 8a Evals
<details>
<summary>◐ <code>packages/evals</code> with baseline/candidate lift — dev-facing, not a ship gate</summary>

**Ships.** `packages/evals` — *"behavioral, model-backed checks for Pi workflows"* — adapts a real `AgentSession` to `vitest-evals`: `createPiCodingAgentHarness({ name, model, noTools, transformSystemPrompt, output })`, `describeEval`, and `evalHarnessTable({ baseline, candidate(s), repetitions })` computing pass-rate lift plus token, latency and cost deltas. Artifacts land in `.eval/`. Unit and e2e tests run through `./test.sh` with a faux provider needing no real keys.
**Not a gate.** It is a development harness for comparing prompts, skills and models — nothing requires a unit of work to clear it before shipping.
**Path.** `npm run eval -- --provider … --model …` · `.eval/runs.jsonl`
**Source.** ✅ `packages/evals/README.md` · `REPO/AGENTS.md` §Commands

</details>

#### 8b Evidence
<details>
<summary>● <b>Session</b> JSONL tree — the receipt, with per-entry <code>usage</code> and <code>cost</code></summary>

**Ships.** The session file *is* the receipt. Every user, assistant, tool, compaction, branch-summary and custom entry carries `id`, `parentId`, `usage`, `cost`, model and `stopReason`. `/session` shows file, ID, tokens and cost; `/export [file]` writes HTML or JSONL; `--export` works headlessly; `/share` uploads a private gist with HTML; `/import` reads one back; `--mode json` streams every `AgentSessionEvent`. Bash tools receive `PI_SESSION_ID` and `PI_SESSION_FILE` for external attribution, and `AI_AGENT=pi` marks the process.
**This is the card's structured output** — and unusually, the same artifact is both the receipt and the resumable state ([5a](#5a-individual-memory)).
**Path.** `~/.pi/agent/sessions/--<path>--/<timestamp>_<uuid>.jsonl`
**Source.** ✅ `DOCS/session-format.md` · `DOCS/sessions.md` · `DOCS/json.md`

</details>

#### 8c Observability
<details>
<summary>◐ <code>pi-telemetry</code> vendor-neutral contracts — no exporter shipped</summary>

**Ships.** `@earendil-works/pi-telemetry` — *"Vendor-neutral telemetry contracts"* — supplying `TelemetryContext`/`TelemetrySpan`, a no-op context, an in-memory context and typed schemas, with *"no exporter, global current-span state, or dependency on a telemetry backend. Applications can … provide an adapter for OpenTelemetry, Sentry, logs, or another backend."* (RFC 0019, Implemented, 2026-04-14.) Provider-level inspection through `before_provider_request` / `after_provider_response`. Startup pings: `enableInstallTelemetry` (anonymous, `PI_TELEMETRY=0` to disable) and opt-in `enableAnalytics`; `--offline` disables both.
**The contract ships; the pipe does not.** No built-in OTel exporter.
**Path.** `@earendil-works/pi-telemetry` · `PI_TELEMETRY`, `PI_OFFLINE`
**Source.** ✅ `packages/telemetry/README.md` · `DOCS/settings.md` §Telemetry

</details>

#### 8d Efficiency
<details>
<summary>◐ Token/cost/cache footer, compaction, cache retention, thinking budgets; no spend limits</summary>

**Ships.** The footer shows tokens in and out, cache read and write, cache-hit rate, cost and context usage; `/session` totals include tool-reported usage. **Compaction** fires automatically once `contextTokens > contextWindow - reserveTokens` (default 16,384), keeping `keepRecentTokens` (20,000), and also mid-run between a tool result and the next response; `/compact [instructions]` is manual and `session_before_compact` customises it; branch summaries fire on `/tree` switch. Caching is controllable through `PI_CACHE_RETENTION=long` (Anthropic 1h, OpenAI 24h), `showCacheMissNotices` and a cached websocket transport. `thinkingBudgets` trade depth for cost per level.
**No spend budget or limit of any kind** — the accounting is complete and the enforcement is absent.
**Path.** `/compact` · `reserveTokens`, `keepRecentTokens` · `PI_CACHE_RETENTION` · `thinkingBudgets`
**Source.** ✅ `DOCS/compaction.md` · `DOCS/settings.md` §Compaction, §Retry · `CA/README.md`

</details>

### 9 · IMPROVE

#### 9a Learning
<details>
<summary>○ No auto-capture; self-extension is the stated posture</summary>

**Nothing here** as capture — checked `DOCS/skills.md`, `DOCS/extensions.md`, `DOCS/packages.md`, root README.
**What exists instead, and it is a genuine posture.** Each capability doc opens with the same banner: *"pi can create extensions/skills/prompt templates/pi packages. Ask it to build one for your use case."* The promotion path from lesson to authored capability is real and stated; what is missing is anything that notices a lesson happened. Session sharing through `pi-share-hf` is framed as improving agents generally, not this install.
**Source.** ✅ `DOCS/skills.md`, `DOCS/extensions.md`, `DOCS/packages.md` banners

**More.** [`20-consolidated-guide.md`](./pi/20-consolidated-guide.md) §5 — all five banners quoted, and the recorded absence of any scaffold, generator or `init` behind them

</details>

#### 9b Rituals
<details>
<summary>○ Nothing encoded; user-authored prompt templates only</summary>

**Nothing here** — checked `DOCS/prompt-templates.md`, `EX/subagent/README.md`.
**What exists instead.** User-authored prompt templates the docs illustrate as `/review` over a staged diff, `pr` for reviewing PRs from URLs, `is` for issues, `cl` to audit changelog entries before a release; and the subagent example's `implement-and-review.md` preset. Every one of these is an example, not a shipped ritual.
**Source.** ✅ `DOCS/prompt-templates.md` · `EX/subagent/README.md`

</details>

#### 9c Cadence
<details>
<summary>○ Nothing here; <code>pi -p</code> from cron is the external route</summary>

**Nothing here** — a grep of the docs for cron and schedule returned only retry-scheduling events.
**What exists instead.** External triggers: the `file-trigger.ts` example (*"File watcher triggers messages"*), `pi -p` invoked from cron, and `pi-chat`'s `/chat-spawn-all` tmux workers.
**Source.** ✅ `DOCS/extensions.md` §Examples Reference · `CA/README.md` §Modes

</details>

#### 9d Anti-fragile Lifecycle
<details>
<summary>◐ Retry budgets, auto-compaction recovery, staged <code>pi update</code> with rollback</summary>

**Ships.** Agent-level retry with exponential backoff (`retry.enabled`, `maxRetries` 3, `baseDelayMs` 2000) and a separate provider-level retry budget. Auto-compaction *"triggers on context overflow (recovers and retries)"*, with `summarization_retry_scheduled`/`attempt_start`/`finished` events. Resumption by `-c`, `-r`, `--session`, plus tree, fork and clone. `session_shutdown` fires on Ctrl+C, Ctrl+D, SIGHUP and SIGTERM. *"Extension errors are logged, agent continues."* `pi update` *"installs the exact checked version into a staged, lockfile-backed release and activates it only after verification, leaving the current release intact if the update fails."*
**No defect ledger** — recovery is runtime resilience, not a lifecycle that turns failure into a rule.
**Path.** `retry.*` settings · `pi update` · `git-checkpoint.ts`
**Source.** ✅ `DOCS/settings.md` §Retry · `DOCS/packages.md` · `DOCS/extensions.md` §Error Handling

</details>

#### 9e Raise the Floor
<details>
<summary>◐ Installer, <code>/login</code>, <code>/settings</code>, <code>pi config</code> TUI; no <code>doctor</code>, no <code>init</code></summary>

**Ships.** A one-line installer, a `/login` provider picker, a `/settings` UI, `/hotkeys`, `/changelog`, and a `pi config` TUI. The startup header lists every loaded `AGENTS.md`, template, skill and extension, and the docs add *"you can also ask the agent to explain itself"*. `--verbose` for detail. An experimental first-time setup sits behind `PI_EXPERIMENTAL=1`.
**No `doctor` command and no project `init` wizard were found** — checked `DOCS/index.md`, `DOCS/quickstart.md`, `CA/README.md`.
**Source.** ✅ `DOCS/index.md` · `DOCS/quickstart.md` · RFC index

</details>

#### 9f Diagnose the Bottleneck
<details>
<summary>○ Nothing here; <code>/session</code> stats are the nearest</summary>

**Nothing here** — checked `DOCS/extensions.md`, `DOCS/skills.md`, `CA/README.md`. No maturity or readiness scoring of any kind.
**What exists instead.** `/session` statistics, `ctx.getContextUsage()` for extensions, and skill validation warnings.
**Source.** ✅ `DOCS/extensions.md` §ExtensionContext · `DOCS/skills.md` §Validation

</details>

### 10 · Teams & Agents

#### 10a Roster
<details>
<summary>○ Nothing built in; the subagent example uses Markdown personas</summary>

**Nothing here** — checked `CA/README.md`, `DOCS/index.md`.
**What exists instead.** The subagent example's named personas as Markdown in `~/.pi/agent/agents/` — `scout`, `planner`, `reviewer`, `worker`. Process identity is the `AI_AGENT=pi` environment marker. Sessions can be named with `/name` or `--name`.
**Source.** ✅ `EX/subagent/README.md` · `CA/README.md` §Environment Variables

</details>

#### 10b Org
<details>
<summary>○ Single operator; no ownership, RACI or escalation</summary>

**Nothing here** — checked `DOCS/security.md`, `DOCS/settings.md`, `packages/server/README.md`.
**What exists instead.** Human-in-the-loop posture is whatever an extension builds — `ctx.ui.confirm`, the `permission-gate.ts` example — plus a project-trust yes or no. The experimental `pi-server`/`pi-client` pair lets multiple *clients* attach to a session with exclusive or shared leases, but ships no auth and no user model, and instructs *"Treat peers as untrusted."* QM layers approval modes above Pi; that is QM's design, not Pi's.
**Source.** ✅ `packages/server/README.md`, `packages/client/README.md` · ↪ QM README

</details>

### 11 · Surfaces

#### 11a Surfaces
<details>
<summary>◐ TUI · print · JSON · RPC · SDK · experimental remote protocol; no IDE shipped</summary>

**Ships.** A terminal TUI (regular or experimental fullscreen, with images, mermaid and themes); print mode `-p` with stdin piping; `--mode json`; `--mode rpc`; a Node SDK; and the experimental remote protocol over a Unix socket. `/share` produces an HTML gist and `/export` an HTML file; the package gallery is a web surface. Chat channels are **not in Pi** — the sibling `pi-chat` extension bridges Discord and Telegram. **No IDE integration is shipped**; the RPC doc only says it is *"useful for embedding the agent in other applications, IDEs, or custom UIs."* Platform docs cover Windows, Termux and tmux.
**The terminal is the source of truth**; every other surface is a projection of a session file.
**Source.** ✅ `CA/README.md` §Interactive Mode, §Modes · `DOCS/tui.md` · `DOCS/rpc.md` · ↪ pi-chat README

</details>

## 7. Identity and inclusion test

<details>
<summary>Identity · inclusion test · loop question</summary>

| Field | Value |
|---|---|
| Canonical name | **Pi** — *"Pi Agent Harness"* is the monorepo title, the binary is `pi`, the CLI package is *"pi coding agent"* ✅ |
| Prior names / homes | `badlogic/pi-mono` → `earendil-works/pi` (old URL redirects). npm `@mariozechner/pi-coding-agent` (2025-11-12, deprecated) → `@earendil-works/pi-coding-agent` (2026-05-07) ✅ GitHub API, npm registry, `CHANGELOG` §0.74.0 |
| Owner / maintainer | Created by Mario Zechner; since April/May 2026 an Earendil product. Zechner: *"I'm a shareholder of Earendil and in charge of all pi decisions, along with Armin and Colin."* LICENSE still reads *"Copyright (c) 2025 Mario Zechner"* ✅ |
| GitHub URL | `github.com/earendil-works/pi` ✅ |
| License | **MIT** — *"pi is MIT licensed. It will stay MIT licensed."* ✅ GitHub API `license.spdx_id: MIT`; LICENSE file; maintainer's post |
| Stars | 100,782 stars, 12,529 forks (2026-09-02) ✅ `gh api` |
| Language | TypeScript ✅ GitHub API |
| Repo created | 2025-08-09; first commits 2025-08-11 ✅ GitHub API |
| First release | ⚠️ uncertain — `CHANGELOG`'s oldest entry is `0.10.0` (2025-11-25); the old npm package was created 2025-11-12; the oldest release object paged from the API is v0.25.4 (2025-12-21). Earlier versions went to npm before GitHub Releases were used ✅ (each fact) / ⚠️ (the date itself) |
| Latest release | **v0.84.4**, 2026-08-28; last push 2026-09-02 ✅ |
| Install | `npm install -g --ignore-scripts @earendil-works/pi-coding-agent` or `curl -fsSL https://pi.dev/install.sh \| sh` ✅ |
| Website / docs | `pi.dev` · docs mirror `pi.dev/docs/latest` · gallery `pi.dev/packages` · RFCs `rfc.earendil.com/keyword/pi/` ✅ |
| What it says it is, verbatim | *"Pi is a minimal terminal coding harness. Adapt pi to your workflows, not the other way around, without having to fork and modify pi internals."* and *"Pi ships with powerful defaults but skips features like sub agents and plan mode. Instead, you can ask pi to build what you want or install a third party pi package that matches your workflow."* ✅ `CA/README.md` |

**Does state persist across sessions, where, in what format?** **Yes — transcripts and config, but there is no memory feature.** Sessions auto-save as JSONL at `~/.pi/agent/sessions/--<path>--/<timestamp>_<uuid>.jsonl`, tree-structured by `id`/`parentId`, format version 3, resumable with `pi -c`, `pi -r`, `--session` and `--fork`. Other state under `~/.pi/agent/`: `settings.json`, `auth.json`, `trust.json`, `models.json`, `keybindings.json`, `AGENTS.md`. A grep for *"memory"* across the docs found no feature. ✅ `DOCS/session-format.md`, `DOCS/sessions.md`

**Does it serve more than one person?** **One operator.** It *"runs with the permissions of the user account that starts it."* Team affordances are config sharing only: project `.pi/settings.json` *"can be shared with your team, and pi installs any missing packages automatically on startup after the project is trusted."* The experimental `pi-server`/`pi-client` pair lets multiple clients attach to sessions with leases, but states *"Treat peers as untrusted"* and ships no auth, no user model and no coding-agent service. ✅ `DOCS/security.md`, `DOCS/packages.md`, `packages/server/README.md`

**Does it bind mechanically, or only by prose?** **Mechanically only where you install the mechanism; nothing mechanical by default.** *"Pi does not include a built-in permission system for restricting filesystem, process, network, or credential access."* The levers that exist — a blocking `tool_call` handler, the `--tools` allowlist, project trust, delegated OS isolation — are all opt-in. Instruction files are prose only, and the security doc bounds even the trust gate: *"It does not make untrusted code, untrusted prompts, or untrusted model output safe."* ✅ root README, `DOCS/security.md`

**Loop question.** **Runs the loop itself.** The agent loop is `@earendil-works/pi-agent-core` (`Agent`, `agent.prompt()`, an event stream) built on `pi-ai`; the CLI wraps it as `AgentSession`. It is also **embeddable** by a documented SDK, `--mode rpc` and `--mode json`. It ships adapters that *read* other harnesses' conventions — Claude Code and Codex skill directories, `CLAUDE.md` as a context file — but installs into no other harness's loop. Other systems adapt to it: QM drives Pi as one of its pluggable agent loops (QM's README, not Pi's). ✅ `packages/agent/README.md`, `DOCS/sdk.md`, `DOCS/skills.md`

**Altitude.** **Runtime.** One operator, one loop, one directory at a time — and an SDK for anyone who wants to host it.

</details>

## 8. Limits

<details>
<summary>What it does not claim, in the vendor's words</summary>

**From `CA/README.md` §Philosophy** ✅

> *"Pi is aggressively extensible so it doesn't have to dictate your workflow. Features that other tools bake in can be built with extensions, skills, or installed from third-party pi packages. This keeps the core minimal while letting you shape pi to fit how you work."*

**From root README §Permissions & Containerization** ✅

> *"Pi does not include a built-in permission system for restricting filesystem, process, network, or credential access. By default, it runs with the permissions of the user and process that launched it. If you need stronger boundaries, containerize or sandbox Pi."*

**From `DOCS/security.md` §No Built-in Sandbox** ✅

> *"Pi does not include a built-in sandbox. Built-in tools can read files, write files, edit files, and run shell commands with the permissions of the pi process. Extensions are TypeScript modules that run with the same permissions. … This is intentional. … A partial in-process sandbox would be easy to misunderstand as a security boundary … Real isolation needs to come from the operating system or a virtualization/container boundary."*
>
> *"Prompt injection from repository files, comments, documentation, context files, or build output is expected local-agent risk and cannot be reliably prevented by pi."*

**Package-level disclaimers** ✅

> `packages/server/README.md`: *"Experimental. This package is under active development and may change or be removed without notice."* … *"This package does not provide a standalone CLI or coding-agent service."*
> `packages/protocol/README.md`: *"The protocol is experimental and has no compatibility guarantees."*
> `packages/client/README.md`: *"`PiClient` does not reconnect automatically."* / *"Treat peers as untrusted."*
> `packages/telemetry/README.md`: *"no exporter, global current-span state, or dependency on a telemetry backend."*

**Skills spec deviation** ✅ `DOCS/skills.md`

> *"Pi allows skill names to differ from their parent directory even though the standard disallows it; that rule is suboptimal for shared skill directories used across multiple agent harnesses."*

**Ownership and governance** ✅ maintainer's post, 2026-04-08

> *"pi is MIT licensed. It will stay MIT licensed."* … *"No CLA, no DCO, no new hoops to jump through."* … *"And if you ever feel like we've lost the plot, the fork button on GitHub still works. Always will."*

</details>

## 9. Sources

<details>
<summary>Primary · secondary · placement · diagrams not redrawn</summary>

**All primary sources accessed 2026-09-02. No source was re-read at the 2026-09-07 restructure.**

**Primary — GitHub API and repo.** `gh api repos/badlogic/pi-mono` (redirects to `earendil-works/pi`; stars, forks, license, language, dates) · `gh api .../releases` and tags · `gh api .../contents/packages`, `.../packages/coding-agent/docs`, `.../examples/extensions`, `.../examples/sdk`, `.../packages/session-backends` · `gh api .../commits?until=2025-08-12`.

**Primary — files.** `REPO/README.md` · `REPO/LICENSE` · `REPO/AGENTS.md` · `CA/README.md` · `CA/package.json` · `CA/CHANGELOG.md` · `DOCS/{index,quickstart,usage,settings,security,containerization,extensions,skills,packages,prompt-templates,sessions,session-format,compaction,sdk,rpc,json,providers,models,custom-provider,environment-variables,themes,tui,keybindings,development}.md` and `docs.json` · `EX/subagent/README.md` · `EX/plan-mode/README.md` · `packages/{agent,ai,tui,telemetry,evals,server,client,protocol}/README.md` · `packages/session-backends/sqlite-node/README.md`.

**Primary — registries and sites.** npm registry for both package scopes · `pi.dev/packages` (5,618 packages at fetch) · `rfc.earendil.com/keyword/pi/` (titles and status only) · the maintainer's post of 2026-04-08.

**Secondary (↪).** `earendil-works/pi-chat` README (sibling repo, README only) · `yc-software/qm` README, grepped raw for Pi and harness lines · search-result snippets for QM reviews and a Wikipedia entry, used for context and for no named feature.

**Placement.** Short-profiles row: [`archive/comparisons/systems/90-short-profiles.md`](../archive/comparisons/systems/90-short-profiles.md) §1 · grid columns: [`components/ALIGNMENT.md`](../components/ALIGNMENT.md) §2 and [`components/MATRIX.md`](../components/MATRIX.md) §1 · index row: [`index.md`](../index.md) · positioning: [`spectrums/positioning.md`](../spectrums/positioning.md#3-pi).

**Diagrams not redrawn.** **No diagram inventory was taken at the 2026-09-02 read.** Whether Pi's docs contain vendor diagrams is unknown and unrecorded — it is a gap in the read, not a finding about the vendor. The diagram pass (W8c) opens the sources and records what it finds.

</details>

## 10. Unverified

<details>
<summary>9 items</summary>

- **OpenClaw embedding Pi via the SDK** — a search snippet only, never read at OpenClaw's source. ⚠️
- **QM's Pi integration mechanism** (SDK, RPC or subprocess) — QM's README confirms Pi as a harness option; its adapter code was not read, and Pi's own docs never mention QM. ↪
- **Package names of the third-party MCP adapter and multi-agent packages** on the gallery — descriptions were captured, identifiers were not. ⚠️ (existence ✅)
- **The maintainer's post names a new npm scope `@earendil/pi`** which differs from the published `@earendil-works/pi-coding-agent`. The registry value is the one reported.
- **Root README calls `pi-chat` "Slack/chat automation"** but the pi-chat README documents Discord and Telegram only. ⚠️ possible drift between the two READMEs.
- **`examples/extensions/sandbox/`** has no README (404); only `index.ts`, `package.json` and lockfiles exist. Its behaviour beyond the one-line docs table entry was not read. ⚠️
- **The version at which the v4 lane-based session APIs and the experimental `PiClient` landed** — both sit under `## [0.84.0]` in the CHANGELOG; entries above were not read to rule out an earlier partial landing. ↪
- **RFC contents** — only the index was fetched. No RFC body was read, so nothing is quoted beyond titles and status.
- **First release date** — the CHANGELOG starts at 0.10.0 and the old npm package at 2025-11-12; nothing was found covering August to November 2025.

**Added at the 2026-09-07 restructure, and not source questions:** the primitive count is disputed 8 versus 5 against the same sources (ISSUE-007, unresolved); and **no diagram inventory exists** for this harness (§2, §3, §9).

</details>
