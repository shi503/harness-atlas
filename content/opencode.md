---
title: "OpenCode — the coding harness with an org-grade permission ladder, read at source"
tier: reference
project: loomwarp
created: "2026-09-02"
status: DRAFT
owner: KD
source: "github.com/anomalyco/opencode (formerly sst/opencode) @ v1.18.26 · opencode.ai/docs · read 2026-09-02"
provenance: OBSERVED
---

# OpenCode — Anomaly

**Why this file exists.** OpenCode is the third loop [`../qm.md`](../comparisons/systems/qm.md)'s subject drives, beside
Pi and Claude Code, and it was not in [`../90-short-profiles.md`](../comparisons/systems/90-short-profiles.md) at all. It
is read here because it is the coding-harness control case: the same genre as Claude Code, Pi and
Codex, with the fullest published **configuration precedence ladder** of any system in the corpus.
Read against the 33 components; synthesis at
[`../../04-harness-alignment.md`](../comparisons/04-harness-alignment.md).

**In one screen.** A Bun/TypeScript client-server coding agent (TUI, desktop, web, IDE, ACP, GitHub
Action, GitLab component, Slack bot). Agents are Markdown files with frontmatter (`mode: primary |
subagent | all`); permissions are `allow / ask / deny` with last-match-wins globs where **`deny`
survives `--auto`** and a **global policy overrides a project's attempt to re-enable it**; config
merges up a nine-rung ladder ending in managed settings and macOS MDM. Twenty-one typed plugin hook
keys. No memory, no learning, no cadence, no rituals, no evals for user work — and no non-goals
section saying so.

**What it does not claim.** §D. The load-bearing lines: experimental options unstable; no sandbox;
one operator per instance; OpenTelemetry export exists in source and not in docs.

---

# OpenCode — harness research (primary-source read, 2026-09-02)

Marks: ✅ direct (read at primary source) · ◐ relayed (reputable secondary) · ⚠️ unverified.
All GitHub API figures were pulled with `gh api` on 2026-09-02. Docs pages were fetched from opencode.ai/docs and the raw source in `packages/web/src/content/docs/*.mdx` on the `dev` branch.

---

## A. Identity

| Field | Value | Mark | Source |
|---|---|---|---|
| Canonical name | **OpenCode** (package `opencode-ai` on npm; binary `opencode`) | ✅ | https://opencode.ai/docs/ ; `packages/opencode/package.json` |
| Prior name / prior home | Repo was `sst/opencode`; `https://github.com/sst/opencode` now returns HTTP 301 → `https://github.com/anomalyco/opencode` | ✅ | curl -I, 2026-09-02 |
| Pre-history (the Go-based "opencode" by opencode-ai that became Crush) | not checked | ⚠️ | — |
| Owner / maintainer | GitHub org **anomalyco** (Anomaly). LICENSE reads "Copyright (c) 2025 opencode" | ✅ | https://github.com/anomalyco/opencode ; `LICENSE` |
| GitHub URL | https://github.com/anomalyco/opencode (default branch `dev`) | ✅ | gh api |
| License | MIT (`license.spdx_id: MIT`; LICENSE file is MIT text) | ✅ | gh api ; raw LICENSE |
| Stars / forks | **203,146 stars**, 26,458 forks (2026-09-02) | ✅ | `gh api repos/anomalyco/opencode` |
| Language | TypeScript (26.9 MB TS; MDX 7.6 MB; CSS 1.0 MB; Astro, Shell, Nix, Dockerfile minor). Runtime is **Bun** | ✅ | `gh api .../languages`; `packages/opencode/package.json` (`@types/bun`, `@tsconfig/bun`) |
| Repo created | 2025-04-30 | ✅ | gh api `created_at` |
| First release on Releases page | tag `0.0.45`, published 2025-05-14 | ✅ | gh api releases page 9 (last page) |
| Latest release | **v1.18.26**, 2026-09-01; `packages/opencode/package.json` version 1.18.26 | ✅ | https://github.com/anomalyco/opencode/releases ; raw package.json |
| Last push | 2026-09-02T09:24:36Z | ✅ | gh api `pushed_at` |
| Install | `curl -fsSL https://opencode.ai/install \| bash`; `npm install -g opencode-ai`; `brew install anomalyco/tap/opencode`; `sudo pacman -S opencode`; `choco install opencode`; `scoop install opencode` | ✅ | https://opencode.ai/docs/ |
| Desktop app | beta; macOS (Apple Silicon + Intel), Windows, Linux; opencode.ai/download | ✅ | README |

**What it says it is (verbatim):**
- GitHub About: "The open source coding agent." ✅ (gh api `description`)
- README tagline: "The open source AI coding agent." ✅
- Docs intro: "OpenCode is an open source AI coding agent. It's available as a terminal-based interface, desktop app, or IDE extension." ✅ (https://opencode.ai/docs/)

**Key dependencies (what the loop is built on):** `ai` (Vercel AI SDK) + `@ai-sdk/anthropic` 3.0.111, `@ai-sdk/openai` 3.0.84, `@ai-sdk/google` 3.0.73; `@modelcontextprotocol/sdk` 1.29.0; `@agentclientprotocol/sdk` 0.21.0; `drizzle-orm`; `effect`; `@opentui/core`; `solid-js`; `zod`. ✅ (raw `packages/opencode/package.json`)

### The three-question inclusion test

**1. Does state persist across sessions? Where, in what format?**
Yes — sessions, messages and todos persist; there is no "memory" feature.
- Data dir: `~/.local/share/opencode/` (macOS/Linux), `%USERPROFILE%\.local\share\opencode` (Windows). Contains `auth.json` (credentials), `log/`, and `project/<project-slug>/storage/` (git repos) or `project/global/storage/` (non-git). ✅ https://opencode.ai/docs/troubleshooting/
- Primary store is a **SQLite database**: `Database.path()` returns `join(Global.Path.data, "opencode.db")` (or `opencode-<channel>.db` on non-prod channels; overridable with `OPENCODE_DB`, including `:memory:`). `opencode db [query]` opens "an interactive sqlite3 shell or run a query"; `opencode db path` prints the path. ✅ `packages/core/src/database/database.ts`; `packages/opencode/src/cli/cmd/db.ts`; https://opencode.ai/docs/cli/
- Resume: `opencode --continue/-c`, `--session/-s <id>`, `--fork`; `/sessions` in TUI; `opencode session list|delete`; `opencode export` ("Export session data as JSON", `--sanitize`) and `opencode import` ("from a JSON file or OpenCode share URL"). ✅ https://opencode.ai/docs/cli/
- Snapshots of file changes (`snapshot: true` default) back `/undo` and `/redo`. ✅ https://opencode.ai/docs/config/
- Instruction state is static files (`AGENTS.md`), not auto-written memory. `/init` generates `AGENTS.md`. ✅ https://opencode.ai/docs/rules/
- No memory/embedding subsystem: code search for `embedding` under `packages/opencode/src` = 0 hits; docs nav has no memory page. Community plugin `opencode-supermemory` ("Persistent memory across sessions using Supermemory") exists in the ecosystem page. ✅ gh code search; https://opencode.ai/docs/ecosystem/

**2. Does it serve more than one person?**
Primarily one operator per process, with organisation-level config and several team-facing surfaces:
- Org config: remote config from a `.well-known/opencode` endpoint ("Remote config is loaded first, serving as the base layer"), managed settings at `/Library/Application Support/opencode/`, `/etc/opencode/`, `%ProgramData%\opencode`, and macOS MDM preference domain `ai.opencode.managed` ("the settings are enforced automatically"). ✅ https://opencode.ai/docs/config/
- Enterprise: SSO to "obtain credentials for your internal AI gateway", central config, gateway-only routing, per-seat pricing. ✅ https://opencode.ai/docs/enterprise/
- Share links (`/share`, `share: manual|auto|disabled`) "so you can collaborate with teammates". ✅ https://opencode.ai/docs/share/
- Zen (optional gateway) has "Team workspace support with admin/member roles" and per-member usage limits. ✅ https://opencode.ai/docs/zen/
- Server (`opencode serve`) protected by a single `OPENCODE_SERVER_PASSWORD`/`OPENCODE_SERVER_USERNAME` basic-auth pair — no per-user accounts inside the agent. ✅ https://opencode.ai/docs/server/
- GitHub Action, GitLab Duo, and a Slack bot package answer many people, each in its own session. ✅ (see 11a)
- Verdict: one operator per instance; team = shared config + shared transcripts + bots, not a multi-user session store.

**3. Does it bind mechanically or only by prose?**
Mechanically, in several layers:
- `permission` config: `"allow" | "ask" | "deny"` per tool, with glob patterns; "Rules are evaluated by pattern match, with the **last matching rule winning**." `--auto` "automatically approve[s] permission requests that are not explicitly denied. … Explicit `"deny"` rules are still enforced." ✅ https://opencode.ai/docs/permissions/ (raw permissions.mdx lines 24–36, 91)
- `tools: { "<name>": false }` removes tools entirely. ✅ https://opencode.ai/docs/config/
- `experimental.policies` (`effect: deny`, `action: provider.use`) — "global policies override project policies, preventing repositories from re-enabling globally denied providers." ✅ https://opencode.ai/docs/policies/
- Plugin hooks can block: `tool.execute.before` example throws `new Error("Do not read .env files")`; docs say hooks can "Block operations by throwing errors". ✅ https://opencode.ai/docs/plugins/
- `doom_loop` (same tool call ×3 → ask), `external_directory` (default ask), `.env` reads denied by default, `steps` cap per agent, `subagent_depth` (default 1). ✅ permissions/agents/config pages
- No OS sandbox shipped (see 1a/6b); isolation is via community plugin (Daytona) or the experimental workspace adapter API.

**Harness or process layer?** It **runs the loop itself**: a Bun/TypeScript client-server app that calls providers through the AI SDK, with its own tool registry, permission engine, session store and TUI/web/desktop clients. ✅
- Adapters it ships *for other harnesses*: none in the "run inside X" sense. It ships **compatibility reads** of other harnesses' files: `CLAUDE.md` fallback, `~/.claude/CLAUDE.md`, `.claude/skills/`, `~/.claude/skills/`, `.agents/skills/`. ✅ rules/skills pages
- Adapters it exposes *to be driven by others*: `opencode acp` (Agent Client Protocol subprocess; Zed ACP registry, JetBrains `acp.json`, avante.nvim, CodeCompanion.nvim); `opencode serve` HTTP/SSE API + `@opencode-ai/sdk`; `opencode attach`. ✅ https://opencode.ai/docs/acp/ ; /server/ ; /sdk/
- Other systems shipping adapters for it (named on its own ecosystem page): kimaki (Discord), opencode.nvim, portal (mobile web UI), OpenChamber, CodeNomad; GitLab CI component `nagyv/gitlab-opencode`. ✅ https://opencode.ai/docs/ecosystem/ ; /gitlab/

### Primitive set (see §C for definitions)
`agent` · `command` · `skill` · `plugin` · `tool` (custom tool) · `permission` · rules (`AGENTS.md` / `instructions`) · `mcp` — plus two newer first-class keys: `references` and `experimental.policies`.

---

## B. Component table (33 rows)

| # | Component | What it ships | Path / mechanism | Source (2026-09-02) | Mark |
|---|---|---|---|---|---|
| 0a | Substrate | Model-agnostic via Vercel AI SDK + models.dev; "75+ LLM providers". Named: Anthropic, OpenAI, Google Vertex, Bedrock, Azure OpenAI, OpenRouter, Ollama, GitHub Copilot, Groq, xAI, DeepSeek, Together, Hugging Face, local (llama.cpp, LM Studio). Any OpenAI-compatible endpoint. First-party gateways: **OpenCode Zen** (pay-per-token, 60+ models) and **OpenCode Go** ($10/mo, 25 open models). Model variants (Anthropic `high`/`max`; OpenAI `none`…`xhigh`). | `model`, `small_model`, `provider.<id>.{options,models,whitelist,blacklist}` in `opencode.json`; `/models`, `/connect`; creds in `~/.local/share/opencode/auth.json`; `--model`, `--variant` | /docs/providers/, /docs/models/, /docs/zen/, /docs/go/ | ✅ |
| 1a | Environment | Local shell (`bash` tool; `!` prefix runs shell), filesystem (read/edit/write/glob/grep/apply_patch), web (`webfetch`; `websearch` via Exa/Parallel gated by `OPENCODE_ENABLE_EXA=1`/`OPENCODE_ENABLE_PARALLEL=1`), LSP diagnostics. Runs on the local machine; remote = run `opencode serve` elsewhere and `attach`. `external_directory` permission gates paths outside cwd. `references` mount other dirs/repos. No browser tool. No container sandbox shipped. | tools page; `permission.external_directory`; `references` key; `opencode serve`/`attach` | /docs/tools/, /docs/permissions/, /docs/references/, /docs/server/ | ✅ |
| 2a | Adapters & Middleware | Provider abstraction = AI SDK (`@ai-sdk/*`) + models.dev catalog; tool registry = built-ins + `.opencode/tools/*.ts` + MCP + plugin `tool` hook (name-collision overrides built-ins); MCP client (local `type: "local"` command / remote `type: "remote"` url, OAuth w/ Dynamic Client Registration, `opencode mcp add\|list\|auth\|logout\|debug`); middleware = plugin hooks `chat.params`, `chat.headers`, `tool.definition`, `experimental.chat.messages.transform`, `experimental.chat.system.transform`; `provider` and `auth` hooks. | `mcp` key; `plugin` key; `packages/plugin/src/index.ts` Hooks type | /docs/mcp-servers/, /docs/plugins/, /docs/custom-tools/, raw plugin index.ts | ✅ |
| 2b | Hooks | Plugin hook keys (from `packages/plugin/src/index.ts`): `dispose`, `event`, `config`, `tool`, `auth`, `provider`, `chat.message`, `chat.params`, `chat.headers`, `permission.ask`, `command.execute.before`, `tool.execute.before`, `tool.execute.after`, `tool.definition`, `shell.env`, `experimental.chat.messages.transform`, `experimental.chat.system.transform`, `experimental.provider.small_model`, `experimental.session.compacting`, `experimental.compaction.autocontinue`, `experimental.text.complete`. Bus events for the `event` hook (docs): `command.executed`; `file.edited`, `file.watcher.updated`; `installation.updated`; `lsp.client.diagnostics`, `lsp.updated`; `message.part.removed`, `message.part.updated`, `message.removed`, `message.updated`; `permission.asked`, `permission.replied`; `server.connected`; `session.created`, `session.compacted`, `session.deleted`, `session.diff`, `session.error`, `session.idle`, `session.status`, `session.updated`; `todo.updated`; `tui.prompt.append`, `tui.command.execute`, `tui.toast.show`. Hooks are JS/TS, not shell scripts. | `.opencode/plugins/*.ts`, `~/.config/opencode/plugins/`, npm via `plugin: [...]`; `.opencode/package.json` deps installed by `bun install` at startup | /docs/plugins/ ; raw `packages/plugin/src/index.ts` | ✅ |
| 2c | Enforcement | `permission.<tool>`: `allow/ask/deny`, glob patterns, last-match-wins; defaults allow except `doom_loop`, `external_directory` = ask; `*.env` read = deny. `--auto` cannot override `deny`. `tools.<name>: false` removes tool. Per-agent `permission` overrides global. `permission.task` globs which subagents may be spawned; `permission.skill` globs skills. `experimental.policies` deny `provider.use`. Plugin `tool.execute.before` may throw to block; `permission.ask` hook can auto-answer. Managed settings / MDM enforce org config. No sandbox. | `opencode.json` `permission`, `tools`, `experimental.policies`; managed paths | /docs/permissions/, /docs/policies/, /docs/config/, /docs/plugins/ | ✅ |
| 3a | Control | Two primary agents: **build** (full access) and **plan** (read-only: edit deny, bash ask) — Tab cycles. Per-call approval prompts (`ask`). `question` tool lets the agent ask the user mid-run. `steps` caps agentic iterations per agent. `opencode run` non-interactive with `--auto`, `--format json`, `--title`, `--file`. Session contract via server API `POST /session/:id/message` (sync) / `prompt_async`. | agents page; `permission`; `steps`; CLI `run` | /docs/agents/, /docs/tools/, /docs/cli/ | ✅ |
| 3b | Routing | Per-agent `model` (and `temperature`, `top_p`, `variant`); `small_model` for lightweight tasks (title generation); `default_agent`; `command` frontmatter `agent:` and `model:`; subagent selection "based on descriptions" by the primary agent or `@mention`; `permission.task` restricts targets; `subagent_depth` (default 1). `experimental.provider.small_model` hook. Model priority: `--model` > config > last used > internal priority. | `agent.<name>.model`, `default_agent`, `subagent_depth`, `permission.task` | /docs/agents/, /docs/models/, /docs/config/ | ✅ |
| 3c | Composition | **Agent** = markdown file with frontmatter (`description` required, `mode: primary\|subagent\|all`, `model`, `temperature`, `top_p`, `prompt`, `steps`, `permission`, `color`, `hidden`, `disable`) + body as system prompt; or `agent.<name>` in JSON. Built-ins: build, plan (primary); general, explore, scout (subagents); compaction, title, summary (hidden system agents). `opencode agent create` wizard. Subagent runs are child sessions navigable with `session_child_*` keybinds. | `~/.config/opencode/agents/*.md`, `.opencode/agents/*.md`; `agent` key | /docs/agents/ | ✅ |
| 3d | Configuration | Instruction files: `AGENTS.md` (project root, walks up), `CLAUDE.md` fallback, `~/.config/opencode/AGENTS.md`, `~/.claude/CLAUDE.md` fallback; `instructions: [...]` with globs and remote URLs (5 s timeout). Config: `opencode.json`/`.jsonc` (project), `~/.config/opencode/opencode.json` (global), `OPENCODE_CONFIG`, `OPENCODE_CONFIG_CONTENT`, `OPENCODE_CONFIG_DIR`; `tui.json`. Precedence low→high: remote `.well-known/opencode` → global → `OPENCODE_CONFIG` → project → `.opencode/` dirs → inline env → managed settings → macOS MDM. "Configuration files are merged together, not replaced." `{env:VAR}` and `{file:path}` substitution. `$schema: https://opencode.ai/config.json`. | as listed | /docs/rules/, /docs/config/ | ✅ |
| 3e | Standards | Formatters (`formatter: true` or per-formatter; biome, prettier, ruff, gofmt, rustfmt, etc.; custom `command` with `$FILE`) — disabled by default. LSP servers (30+, `lsp: true`) feed diagnostics back. No shipped rules pack / style guide artifact; `AGENTS.md` is user-authored. `/init` "references existing rule sources like Cursor rules". | `formatter`, `lsp` keys | /docs/formatters/, /docs/lsp/, /docs/rules/ | ✅ |
| 4a | Capability | **Skills**: `SKILL.md` with frontmatter `name` (`^[a-z0-9]+(-[a-z0-9]+)*$`), `description`, optional `license`, `compatibility`, `metadata`; discovered from `.opencode/skills/`, `~/.config/opencode/skills/`, `.claude/skills/`, `~/.claude/skills/`, `.agents/skills/`, `~/.agents/skills/`; loaded on demand via native `skill` tool. **Plugins**: npm (auto-installed by Bun) or local; `opencode plugin <module> [--global]`. **Custom tools**: `.opencode/tools/*.ts` (`tool()` helper from `@opencode-ai/plugin`, zod args; filename = tool name; named exports → `file_export`). **Commands**: `.opencode/commands/*.md`. **MCP servers**. **References** (`references.<alias>.{path\|repository,branch,description,hidden}`) mount external dirs/repos. No first-party marketplace; ecosystem page lists 26 community plugins, 11 projects, 2 agent packs; community aggregators awesome-opencode, opencode.cafe. | as listed | /docs/skills/, /docs/plugins/, /docs/custom-tools/, /docs/commands/, /docs/references/, /docs/ecosystem/ | ✅ |
| 4b | Capability Permissions | `permission.skill` with globs (`"internal-*": "deny"`); `tools: { skill: false }` disables skills; per-agent skill/tool permission in frontmatter; MCP tools gated by `tools` with globs (`"mymcp_*"`) and re-enabled per-agent; `permission.task` globs subagents (denied ones are removed from the Task tool description); `experimental.policies` for providers. | `permission`, `tools`, agent frontmatter | /docs/skills/, /docs/mcp-servers/, /docs/agents/, /docs/policies/ | ✅ |
| 5a | Individual Memory | Nothing here as a feature. What exists: persistent session history in SQLite (`opencode.db`) + `project/<slug>/storage/`; user-authored `~/.config/opencode/AGENTS.md`; `/init`-generated project `AGENTS.md`. No auto-captured memory file. Checked README, docs nav, config page. | — | /docs/troubleshooting/, /docs/rules/ | ✅ |
| 5b | Team Memory | Nothing here. Closest: committed `AGENTS.md` ("Commit project-level AGENTS.md files to version control for team consistency"), org remote config `.well-known/opencode`, shared transcripts via `/share`. Community: `opencode-supermemory` plugin. | — | /docs/rules/, /docs/config/, /docs/ecosystem/ | ✅ |
| 5c | Knowledge | Nothing here (no RAG/embeddings; 0 code hits for `embedding`). Retrieval is `grep`/`glob`/`find.symbols` (LSP workspace symbols), `webfetch`, `websearch` (Exa/Parallel), `references` for external repos, and community MCPs (Context7, Grep by Vercel named in docs examples). | — | /docs/tools/, /docs/mcp-servers/, gh code search | ✅ |
| 6a | Product | Nothing here — no PRD/spec object. Work lands in the working tree; GitHub/GitLab bots act on issues/PRs/MRs. | — | checked docs index, config | ✅ |
| 6b | Infrastructure | Runs locally on the host. Remote: `opencode serve` + `opencode attach [url]`, `opencode web --hostname 0.0.0.0`, mDNS. GitHub Action / GitLab CI run it on runners. `experimental_workspace.register(type, adapter)` plugin API (`configure/create/remove/target`) for isolated workspaces — example plugin creates a folder; community `opencode-daytona` "run OpenCode sessions in isolated Daytona sandboxes". `packages/containers` = CI images only, not agent sandboxes. | plugin `experimental_workspace`; CLI | /docs/server/, /docs/web/, raw `packages/plugin/src/example-workspace.ts`, `packages/containers/README.md`, /docs/ecosystem/ | ✅ |
| 6c | Estate | `references` key: alias → local `path` or Git `repository` (+`branch`), surfaced in `@` autocomplete and in system context; `external_directory` permission. No cross-repo impact analysis. | `references`, `permission.external_directory` | /docs/references/, /docs/permissions/ | ✅ |
| 6d | Delivery | GitHub: `opencode github install`; Action `anomalyco/opencode/github@latest`; triggers on `/opencode` or `/oc` in issue/PR/review comments; "Create a new branch, implement the changes, and open a PR" or commit to the same PR; OIDC token exchange or `use_github_token`. GitLab: CI component `$CI_SERVER_FQDN/nagyv/gitlab-opencode/opencode@2` and GitLab Duo `@opencode` (triage / implement via MR / review). No deploy step. | `.github/workflows/opencode.yml`; GitLab CI include | /docs/github/, /docs/gitlab/ | ✅ |
| 7a | Workflow Tasks | `todowrite` tool ("Manage todo lists during coding sessions"; disabled for subagents by default), `todo.updated` event; Task tool spawns subagent child sessions; custom `command` templates with `$ARGUMENTS`, `$1..`, `` !`cmd` `` shell injection, `@file` refs, `subtask: true`. No ticket/plan object. | `todowrite`; `.opencode/commands/*.md`; `command` key | /docs/tools/, /docs/commands/ | ✅ |
| 8a | Evals | Nothing shipped for users. Project's own CI/tests only (`bun typecheck`; AGENTS.md "Avoid mocks"). Formatters/LSP diagnostics act as post-edit checks. | — | raw AGENTS.md, /docs/formatters/, /docs/lsp/ | ✅ |
| 8b | Evidence | Share pages `opncd.ai/s/<share-id>` (full history, messages, metadata; `/unshare` deletes); `/export` (Markdown) in TUI; `opencode export [--sanitize]` (JSON) and `opencode import <file\|share-url>`; `opencode run --format json` raw event stream; `session.diff` event; snapshots; `/details` toggles tool output. | as listed | /docs/share/, /docs/tui/, /docs/cli/ | ✅ |
| 8c | Observability | Logs: `~/.local/share/opencode/log/` (last 10 files), `--log-level DEBUG`, `--print-logs`. **OpenTelemetry**: `packages/core/src/observability/otlp.ts` reads `OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_HEADERS`, `OTEL_RESOURCE_ATTRIBUTES`; exports logs (`/v1/logs`) and traces via `@effect/opentelemetry` + `@opentelemetry/exporter-trace-otlp-http`; resource `service.name=opencode`, attrs `opencode.client`, `opencode.run`. Not documented on the docs site (the v2 spec says `experimental.openTelemetry` config is to be removed in favour of "standard OpenTelemetry environment"). SSE event stream at `GET /event`. Community: Helicone session plugin. | env vars; source | /docs/troubleshooting/; raw `otlp.ts`; `specs/v2/config.md` | ✅ (docs gap noted) |
| 8d | Efficiency | `compaction: { auto (default true), prune (default false), reserved }`; `/compact`; `session.compacted` event; `experimental.session.compacting` and `experimental.compaction.autocontinue` hooks; `small_model` for cheap tasks; `steps` cap ("for users who wish to control costs"); `opencode stats [--days --tools --models --project]` "token usage and cost statistics"; `provider.<id>.options.setCacheKey`; Zen/Go usage limits. AI SDK `maxRetries: input.retries ?? 0` in `session/llm.ts`. | config keys; CLI | /docs/config/, /docs/cli/, /docs/agents/, raw llm.ts | ✅ |
| 9a | Learning | Nothing here. No auto-capture or skill creation from sessions. `/init` regenerates `AGENTS.md` from repo scan (one-shot). | — | checked docs nav, rules page | ✅ |
| 9b | Rituals | Nothing here. Users can encode rituals as `commands/*.md` or agents (docs give "review"/"security auditor" agent examples), but nothing shipped or named. | — | /docs/agents/, /docs/commands/ | ✅ |
| 9c | Cadence | Nothing scheduled (0 code hits for `cron` under `packages/opencode/src`). Event-triggered runs: GitHub Action on comment events; GitLab CI/Duo; Slack bot (`packages/slack`) per thread. Emits PR/comment/MR replies. | — | gh code search; /docs/github/, /docs/gitlab/, raw `packages/slack/README.md` | ✅ |
| 9d | Anti-fragile lifecycle | Resume `--continue`/`--session`/`--fork`; `/undo` `/redo` on snapshots (disable → "changes made by the agent cannot be rolled back through the UI"); `doom_loop` guard (identical call ×3 → ask); auto-compaction with `reserved` buffer; `session.error` event; `session_interrupt` (Esc); export/import backup; `Database` migrations (`DatabaseMigration`); provider `timeout`/`chunkTimeout`; `installation.updated`, `autoupdate: true\|false\|"notify"`. | as listed | /docs/config/, /docs/permissions/, /docs/cli/, /docs/tui/, raw database.ts | ✅ |
| 9e | Raise the floor | `/init` (AGENTS.md generator), `opencode agent create` wizard, `opencode github install` wizard, `opencode mcp add`, `opencode plugin <module>`, `/connect` provider onboarding, `$schema` for config, `opencode mcp debug`, curated Zen model list "tested and verified to work well with OpenCode", built-in agents/formatters/LSPs, docs Windows/WSL guidance. No `doctor` command. | CLI | /docs/cli/, /docs/rules/, /docs/zen/ | ✅ |
| 9f | Diagnose the bottleneck | Nothing here beyond `opencode stats` (usage) and `opencode mcp debug`. No maturity/readiness scoring. | — | /docs/cli/ | ✅ |
| 10a | Roster | Named agents: build, plan, general, explore, scout (+ hidden compaction, title, summary) and user-defined agents in `agents/*.md`; `opencode agent list`; `@name` mentions; `color` per agent. No identity/registry beyond the name; `packages/identity` exists in the monorepo but is undocumented. | `agent` key; `agents/` dir | /docs/agents/, /docs/cli/, gh tree | ✅ (identity pkg ⚠️ purpose unverified) |
| 10b | Org | Human-in-the-loop posture = `ask` permissions + `question` tool + `--auto`; `plan` vs `build` agents; enterprise SSO + gateway-only + managed/MDM config; Zen workspaces admin/member roles; no ownership/RACI/escalation model. | as listed | /docs/permissions/, /docs/tools/, /docs/enterprise/, /docs/zen/ | ✅ |
| 11a | Surfaces | TUI (`opencode`), desktop app (beta; Tauri — `packages/desktop`), web UI (`opencode web`), headless server (`opencode serve`, OpenAPI at `/doc`, SSE `/event`), `@opencode-ai/sdk`, VS Code / Cursor / Windsurf / VSCodium extension (auto-installs from integrated terminal; `Cmd+Esc`), ACP (`opencode acp`) for Zed, JetBrains, avante.nvim, CodeCompanion.nvim, GitHub Action, GitLab CI/Duo, **Slack** (`packages/slack` — `@opencode-ai/slack`, Socket Mode bot, one session per thread; not on docs site), Discord via community `kimaki`; mobile via community `portal`. | as listed | /docs/, /docs/tui/, /docs/web/, /docs/server/, /docs/sdk/, /docs/ide/, /docs/acp/, /docs/github/, /docs/gitlab/, raw slack README, /docs/ecosystem/ | ✅ |

---

## C. Primitive set

| Primitive | Path / config key | Project's own definition (verbatim where available) |
|---|---|---|
| **Agent** | `.opencode/agents/<name>.md`, `~/.config/opencode/agents/<name>.md`; `agent.<name>` in `opencode.json`; `opencode agent create` | "Agents are specialized AI assistants that can be configured for specific tasks and workflows. They allow you to create focused tools with custom prompts, models, and tool access." (`mode: primary\|subagent\|all`) — /docs/agents/ ✅ |
| **Command** | `.opencode/commands/<name>.md`, `~/.config/opencode/commands/`; `command.<name>` key; invoked `/name` | Frontmatter `template` (required), `description`, `agent`, `model`, `subtask`; `$ARGUMENTS`, `$1..`, `` !`cmd` ``, `@file` — /docs/commands/ ✅ |
| **Skill** | `.opencode/skills/<name>/SKILL.md`, `~/.config/opencode/skills/`, plus `.claude/skills/`, `~/.claude/skills/`, `.agents/skills/`, `~/.agents/skills/` | "Agent skills are reusable instructions that OpenCode discovers from your repository or home directory" loaded "on-demand through a native `skill` tool" — /docs/skills/ ✅ |
| **Plugin** | `.opencode/plugins/*.ts`, `~/.config/opencode/plugins/`; `plugin: ["pkg"]`; `opencode plugin <module>`; types from `@opencode-ai/plugin` | "Plugins allow you to extend OpenCode by hooking into various events and customizing behavior." Signature `async ({ project, client, $, directory, worktree, experimental_workspace, serverUrl }) => Hooks` — /docs/plugins/, raw index.ts ✅ |
| **Tool** (custom) | `.opencode/tools/<name>.ts`, `~/.config/opencode/tools/`; `tool()` helper; or plugin `tool: {}` | Filename becomes tool name; zod args; "Custom tools override built-in tools with the same name" — /docs/custom-tools/ ✅ |
| **Permission** | `permission.<tool>` (string or glob map) in `opencode.json`; per-agent `permission` in frontmatter | "OpenCode uses the `permission` config to decide whether a given action should run automatically, prompt you, or be blocked." Values `allow` / `ask` / `deny` — /docs/permissions/ ✅ |
| **Rules** | `AGENTS.md` (project, walks up; `CLAUDE.md` fallback), `~/.config/opencode/AGENTS.md`; `instructions: [...]` (globs, URLs); `/init` | Instruction files applied to the directory and subdirectories; precedence local AGENTS.md → local CLAUDE.md → global AGENTS.md → `~/.claude/CLAUDE.md` — /docs/rules/ ✅ |
| **MCP server** | `mcp.<name>: { type: "local"\|"remote", command\|url, environment, headers, oauth, enabled, timeout }`; `opencode mcp add\|list\|auth\|logout\|debug` | "MCP servers extend OpenCode with external tools via the Model Context Protocol"; tools "automatically become available to the LLM" — /docs/mcp-servers/ ✅ |
| *Reference* (newer) | `references.<alias>: { path \| repository, branch, description, hidden }` | Grants access to "directories outside the current project, including documentation, shared libraries, examples, or other repositories"; `@alias` in autocomplete — /docs/references/ ✅ |
| *Policy* (experimental) | `experimental.policies: [{ effect, action: "provider.use", resource }]` | "Policies control whether OpenCode may use configured resources like LLM providers" — distinct from permissions; last match wins; global overrides project — /docs/policies/ ✅ |
| Legacy: *Mode* | `modes/` directory still accepted "for backwards compatibility"; `/docs/modes/` returns 404 | config.mdx line 58 lists `modes/` among plural dirs — ✅ (that modes were replaced by agents is inferred, ◐) |

---

## D. Stated limitations (quoted)

- Experimental: "Experimental options are not stable. They may change or be removed without notice." — /docs/config/ ✅
- Contribution scope: accepted = "Bug fixes", "Additional LSPs / Formatters", "Improvements to LLM performance", "Support for new providers", "Fixes for environment-specific quirks", "Missing standard behavior", "Documentation improvements". "Any UI or core product feature must go through a design review with the core team before implementation." PRs bypassing this "will likely be closed." — raw CONTRIBUTING.md ✅
- Data: "OpenCode does not store your code or context data. All processing happens locally or through direct API calls to your AI provider." (exception: `/share` cached on opencode.ai CDN) — /docs/enterprise/ ✅
- Self-hosted share pages: "currently on the roadmap" — /docs/enterprise/ ✅
- ACP: "Some built-in slash commands like `/undo` and `/redo` are currently unsupported." — /docs/acp/ ✅
- Formatters: "Formatters are disabled by default; enable them in your config before OpenCode will run them." — /docs/formatters/ ✅
- LSP tool is experimental (`OPENCODE_EXPERIMENTAL_LSP_TOOL=true`); `websearch` needs `OPENCODE_ENABLE_EXA=1` or `OPENCODE_ENABLE_PARALLEL=1` — /docs/tools/ ✅
- Snapshots: disabling means "changes made by the agent cannot be rolled back through the UI." — /docs/config/ ✅
- Subagents: default `subagent_depth: 1` "prevents those subagents from launching additional subagents." — /docs/config/ ✅
- Windows: "While OpenCode can run directly on Windows, we recommend using Windows Subsystem for Linux (WSL)" — /docs/windows-wsl/ ✅
- Share privacy: "Only share conversations that don't contain sensitive information" — /docs/share/ ✅
- Naming: projects using "opencode" in their name should state they are "not built by the OpenCode team and is not affiliated with us in any way." — README ✅
- Desktop app: "beta" — README ✅
- Deprecations: `maxSteps` → `steps`; agent `tools` "is **deprecated**. Prefer the agent's `permission` field"; top-level `theme`, `keybinds`, `tui` deprecated in favour of `tui.json`; `disabled_providers`/`enabled_providers` superseded by policies. — agents.mdx, /docs/config/, /docs/policies/ ✅
- No non-goals section exists in README or docs (checked). ✅

---

## E. Sources (all accessed 2026-09-02)

GitHub / raw
- https://github.com/anomalyco/opencode (page) and `gh api repos/anomalyco/opencode`, `.../languages`, `.../releases` (pages 1 and 9), `.../git/trees/dev?recursive=1`, `search/code`
- https://github.com/sst/opencode (301 redirect check)
- https://github.com/anomalyco/opencode/releases
- https://github.com/anomalyco/opencode/tree/dev/packages
- https://github.com/anomalyco/opencode/tree/dev/packages/slack, /containers, /enterprise, /console
- https://raw.githubusercontent.com/anomalyco/opencode/dev/README.md
- https://raw.githubusercontent.com/anomalyco/opencode/dev/LICENSE
- https://raw.githubusercontent.com/anomalyco/opencode/dev/CONTRIBUTING.md
- https://raw.githubusercontent.com/anomalyco/opencode/dev/AGENTS.md
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/opencode/package.json
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/plugin/src/index.ts
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/plugin/src/example-workspace.ts
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/core/src/database/database.ts
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/core/src/observability/otlp.ts
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/opencode/src/cli/cmd/db.ts
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/opencode/src/session/llm.ts
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/slack/README.md
- https://raw.githubusercontent.com/anomalyco/opencode/dev/specs/v2/config.md
- https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/web/src/content/docs/{plugins,permissions,config,agents}.mdx

Docs site (opencode.ai)
- https://opencode.ai/docs/ · /config/ · /providers/ · /models/ · /agents/ · /permissions/ · /policies/ · /plugins/ · /rules/ · /skills/ · /commands/ · /custom-tools/ · /tools/ · /mcp-servers/ · /references/ · /server/ · /sdk/ · /cli/ · /tui/ · /web/ · /ide/ · /acp/ · /share/ · /github/ · /gitlab/ · /enterprise/ · /network/ · /troubleshooting/ · /formatters/ · /lsp/ · /keybinds/ · /themes/ · /zen/ · /go/ · /ecosystem/ · /windows-wsl/
- 404 on 2026-09-02: /docs/modes/, /docs/desktop/, /docs/sessions/

---

## F. Things I could NOT verify

- The lineage before `sst/opencode` (the Go "opencode" that became Crush) — not checked at primary source. ⚠️
- Exact behaviour/purpose of monorepo packages `identity`, `console`, `enterprise`, `codemode`, `sdk-next`, `session-ui`, `stats`, `function` — only directory names read; `enterprise/README.md` is a SolidStart scaffold README with no product description. ⚠️
- Whether the `packages/slack` bot is published/supported (it has a README but no docs page). Existence ✅; support status ⚠️.
- OpenTelemetry export is in source (`otlp.ts`) but not on the docs site; whether it is enabled in the shipped `latest` channel build — not verified. ⚠️
- The docs-nav item "Desktop" page and a "Sessions" page 404'd; desktop facts come from README only.
- Session storage: SQLite is confirmed in source; whether the `project/<slug>/storage/` JSON layout in the troubleshooting page is still the live format or legacy — not verified. ⚠️
- Zen model names/prices quoted from the page as fetched (e.g. "GPT 5.6", "Claude Opus 5") — reported as read, not cross-checked. ◐
- The "203.1k" star figure looked high; it is what the GitHub API returned (`stargazers_count: 203146`) on 2026-09-02. ✅ as read.
- No language-percentage breakdown on the repo page; bytes from `/languages` API used instead.
