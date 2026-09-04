---
title: "Pi — the coding harness that names its refusals as loudly as its primitives"
tier: reference
project: harness-atlas
created: "2026-09-03"
status: DRAFT
owner: Claude (harness-teardown --sanity)
source: "github.com/earendil-works/pi @ v0.84.4 (tag 2026-08-28) · packages/coding-agent/docs · read 2026-09-03"
provenance: OBSERVED
---

# Pi — Earendil Works / Mario Zechner

**Why this file exists.** This is a **sanity run** of `skills/harness-teardown/SKILL.md`, executed against Pi
because Pi already has a Template‑A page (`content/pi.md`) — the run tests the *skill*, not the harness. Written
to `content/pi-draft.md` per `--sanity`; none of the four downstream obligations were performed (no edits to
`90-short-profiles.md`, `04-harness-alignment.md`, `02-component-matrix.md`, or `content/pi.md` itself). See
§F → **Skill findings** for what this run learned about the procedure, and a section-by-section diff against the
existing `content/pi.md`.

**In one screen.** Pi is a minimal TypeScript/Node coding-agent CLI (`@earendil-works/pi-coding-agent`) built on
two lower-altitude packages it also publishes — `pi-ai` (unified multi-provider LLM API) and `pi-agent-core` (the
`Agent` class: tool-calling loop, state, event stream). It ships four built-in tools (`read`, `write`, `edit`,
`bash`), a two-rung settings ladder (global → project), JSONL tree-structured sessions, and five sanctioned
extension points — **Extension, Skill, Prompt Template, Theme, Pi Package** — through which everything else is
meant to be added. It ships **no** permission system, sandbox, sub-agents, plan mode, built-in to-dos, background
bash, or MCP client, and says so in its own README as a numbered refusal list, not as a gap. Runs its own loop
(`Agent` from `pi-agent-core`); a still-undocumented experimental protocol/server/client trio (`pi-protocol`,
`pi-server`, `pi-client`) hints at a durable multi-presentation future the shipped docs do not yet describe.

**What it does not claim.** §D. The load-bearing lines: "Pi does not include a built-in permission system…By
default, it runs with the permissions of the user and process that launched it" (root README); "the Pi coding
agent intentionally does not have a sandbox" (SECURITY.md, Out of Scope); and the six-item refusal list in the
coding-agent README's Philosophy section — no MCP, no sub-agents, no permission popups, no plan mode, no
built-in to-dos, no background bash.

---

Access date for every source: **2026-09-03**. Marks: ✅ direct (primary read) · ◐ relayed (secondary) ·
⚠️ unverified.

`REPO` = https://github.com/earendil-works/pi · `RAW` = https://raw.githubusercontent.com/earendil-works/pi/main ·
`DOCS` = `RAW`/packages/coding-agent/docs · `CA` = `RAW`/packages/coding-agent · `SITE` = https://pi.dev/docs/latest

## A. Identity

| Field | Value | Mark | Source |
|---|---|---|---|
| Canonical name | **Pi** (npm `@earendil-works/pi-coding-agent`; binary `pi`) | ✅ | `CA`/package.json; `CA`/README.md |
| Prior names / homes | Repo was `badlogic/pi-mono`; `github.com/badlogic/pi-mono` now 301-redirects to `github.com/earendil-works/pi`. The rename is incomplete in the docs: root `package.json` `name` is still `"pi-monorepo"`; `docs/session-format.md`, `docs/compaction.md`, `docs/json.md`, `docs/development.md`, and root `AGENTS.md`'s changelog-attribution rule all still link to `github.com/earendil-works/**pi-mono**`; the community skills repo linked from `docs/skills.md` is `badlogic/pi-skills` | ✅ | `curl -I` on the old URL, 2026-09-03; `RAW`/package.json; the docs pages named |
| Owner / maintainer | GitHub org **earendil-works** ("Earendil Works", Austria, blog `earendil.com`). `LICENSE` copyright is held personally by **Mario Zechner** (GitHub `badlogic`, blog `mariozechner.at`) — the pi-mono repo's original individual owner, not the org | ✅ | `gh api users/earendil-works`; `gh api users/badlogic`; `RAW`/LICENSE |
| GitHub URL | https://github.com/earendil-works/pi (default branch `main`) | ✅ | `gh api repos/earendil-works/pi` |
| License | MIT | ✅ | `gh api` `license.spdx_id`; `RAW`/LICENSE |
| Stars | 101,457 stars, 12,616 forks (2026-09-03) | ✅ | `gh api repos/earendil-works/pi` |
| Language | TypeScript 10.66 MB; JavaScript 460 KB; Shell 31 KB; CSS 23 KB; C 10 KB; HTML, PowerShell, Batchfile minor | ✅ | `gh api repos/earendil-works/pi/languages` |
| Repo created | 2025-08-09 | ✅ | `gh api` `created_at` |
| First release | `v0.12.0`, 2025-12-02 — **~4 months after repo creation**, i.e. the repo predates its own first tag | ✅ | `gh api repos/earendil-works/pi/releases --paginate` (257 releases total, oldest read) |
| Latest release | `v0.84.4`, 2026-08-28; matches `packages/coding-agent/package.json` `version` field | ✅ | `gh api .../releases`; `RAW`/packages/coding-agent/package.json |
| Install | `npm install -g --ignore-scripts @earendil-works/pi-coding-agent`; `curl -fsSL https://pi.dev/install.sh \| sh` | ✅ | `DOCS`/quickstart.md |
| Website / docs | https://pi.dev · docs at https://pi.dev/docs/latest; docs source root read here: `packages/coding-agent/docs/` (25 pages + `docs.json`) | ✅ | `DOCS`/index.md; `gh api` tree |
| What it says it is (verbatim) | GitHub About: *"AI agent toolkit: unified LLM API, agent loop, TUI, coding agent CLI"* · coding-agent README: *"Pi is a minimal terminal coding harness."* · `package.json` `description`: *"Coding agent CLI with read, bash, edit, write tools and session management"* | ✅ | `gh api` `description`; `CA`/README.md; `CA`/package.json |

### Inclusion test

**1. Does state persist across sessions? Where, in what format?**
**Yes** — JSONL, tree-structured. *"Sessions are stored as JSONL (JSON Lines) files. Each line is a JSON object
with a `type` field. Session entries form a tree structure via `id`/`parentId` fields, enabling in-place branching
without creating new files."* Auto-saved under `~/.pi/agent/sessions/--<cwd>--/<ts>_<uuid>.jsonl`; version field
has migrated v1→v2→v3; resumed/forked/cloned via `/resume`, `--session`, `--fork`, `/tree`. ✅ `DOCS`/session-format.md,
`DOCS`/sessions.md. A second, undocumented persistence path exists: `@earendil-works/pi-session-backend-sqlite-node`
provides a `node:sqlite`-backed `SessionRepo`, listed in the monorepo but not referenced from `docs.json` or any
docs page. ✅ (existence) `RAW`/packages/session-backends/sqlite-node/README.md · ⚠️ (production status/relationship
to the shipped JSONL format, unverified).

**2. Does it serve more than one person?**
**No** — one operator per process, and no org layer was found anywhere in the read docs. Checked
`docs/settings.md`, `docs/providers.md`, `docs/custom-provider.md`, `docs/extensions.md` for enterprise/SSO/MDM:
the only "SSO"/"enterprise" hits are inside a *worked example* showing how an extension author could wire OAuth
for a **custom model provider** (`custom-provider-gitlab-duo`) — not a Pi-native org feature. There is no managed
settings tier, no per-seat pricing, no admin/member role model (contrast OpenCode's MDM + Zen workspaces).
Collaboration is by artifact, not by concurrent session: `/share` uploads *"as private GitHub gist with shareable
HTML link"*, and the root README runs a public-good campaign asking users to publish their own session JSONL to
Hugging Face (`badlogic/pi-share-hf`, `badlogicgames/pi-mono` dataset). A sibling first-party repo,
`earendil-works/pi-chat`, is named for "Slack/chat automation and workflows" but was not read at primary source.
✅ (settings/providers/extensions/custom-provider checked) · ⚠️ (pi-chat, not opened).

**3. Does it bind mechanically, or only by prose?**
**Only by prose, or by code you write yourself — nothing ships mechanically enforced.**
*"Pi does not include a built-in permission system for restricting filesystem, process, network, or credential
access. By default, it runs with the permissions of the user and process that launched it."* (root README).
*"Pi does not include a built-in sandbox…This is intentional."* (`docs/security.md`, "No Built-in Sandbox").
The closest things to mechanical binding, both coarse and CLI-level, not runtime-conditional: `--tools` /
`--exclude-tools` / `--no-builtin-tools` / `--no-tools` allowlist/denylist tool names for the whole run, and
**project trust** gates which *config/extension files load* — it explicitly does **not** gate what a loaded
extension may then do (*"It is not a sandbox and it does not restrict what the model can ask tools to do after
you start working in a directory."*). Anything finer — confirm-before-`rm -rf`, path protection — is a named
*example extension* (`permission-gate.ts`, `protected-paths.ts`) the user must install or write; real isolation
means running the whole process or its tools inside Gondolin/Docker/OpenShell. ✅ root README; `DOCS`/security.md;
`DOCS`/extensions.md (examples table); `DOCS`/containerization.md.

**Harness or process layer? — the loop question.**
Pi **runs the loop itself**: the CLI/TUI (`packages/coding-agent`) drives an `Agent` from
`@earendil-works/pi-agent-core` ("Stateful agent with tool execution and event streaming. Built on
`@earendil-works/pi-ai`.") over the unified provider layer in `@earendil-works/pi-ai`. ✅ `RAW`/packages/agent/README.md.
*Adapters it ships for other harnesses:* none in the "host another harness's loop" sense. It ships a **read-compat
shim**: it loads `CLAUDE.md` alongside `AGENTS.md` as a context file, and `settings.json` can point `skills` at
`~/.claude/skills` or `~/.codex/skills` — reading another harness's convention, not hosting its loop. ✅
`DOCS`/skills.md ("Using Skills from Other Harnesses"); `CA`/README.md ("Context Files"). *Adapters it exposes to
be driven by others:* an RPC mode over stdin/stdout (strict LF-delimited JSONL, `pi --mode rpc`), an embeddable
Node SDK (`createAgentSession`, `AgentSessionRuntime`), and an **experimental, undocumented** durable
multi-presentation protocol — `@earendil-works/pi-protocol` (CBOR-framed, "Protocol version `8`"), `pi-server`,
`pi-client` — present in the monorepo but linked from no docs page. ✅ `DOCS`/rpc.md, `DOCS`/sdk.md; `RAW`/packages/
{protocol,server,client}/README.md · ⚠️ maturity/adoption of the experimental trio unverified. No MCP client/server
and no Agent Client Protocol (ACP) support were found — `gh api search/code` for "agent client protocol" inside
this repo returns zero matches, and the README refuses MCP by name (§C). ✅ *Other systems shipping adapters for
Pi:* none found — there is no ecosystem/integrations page (contrast OpenCode's `/docs/ecosystem/`); checked
`docs.json`, `docs/index.md`, and the root README's "All Packages" table. ✅ (absence checked, pages named above).
**Altitude: process layer, running its own loop — with an experimental gateway/server layer visible in source but
not yet surfaced in documentation.**

### Primitive set (see §C for definitions)
`Extension` · `Skill` · `Prompt Template` · `Theme` · `Pi Package`
Supporting: `Tool` (registered by an Extension) · `Command` (registered by an Extension, or auto-derived from a
Prompt Template) · Context file (`AGENTS.md` / `CLAUDE.md`).

### Structured output
The **session JSONL file** — the tree-structured, versioned transcript at `~/.pi/agent/sessions/…/<uuid>.jsonl`.
Every other artifact (HTML export, gist share, `--mode json` event stream, RPC replies) is a read or a
transformation of it. ✅ `DOCS`/session-format.md, `DOCS`/sessions.md.

---

## B. Component table (33 rows)

| # | Component | What it ships | Path / mechanism | Source (2026-09-03) | Mark |
|---|---|---|---|---|---|
| 0a | Substrate | Model-agnostic via the `pi-ai` package. Subscriptions: Anthropic Claude Pro/Max, OpenAI ChatGPT Plus/Pro (Codex), GitHub Copilot, xAI, OpenRouter, "Radius" (`pi-messages` gateway). API keys: ~24 named providers (Anthropic, OpenAI, Azure OpenAI, DeepSeek, NVIDIA NIM, Google Gemini/Vertex, Bedrock, Mistral, Groq, Cerebras, Cloudflare AI Gateway/Workers AI, xAI, OpenRouter, Vercel AI Gateway, ZAI, OpenCode Zen/Go, Hugging Face, Fireworks, Together, Baseten, Kimi, MiniMax, Xiaomi MiMo). Local: llama.cpp router (`/login llama.cpp`, `/llama`). Custom providers/models via `~/.pi/agent/models.json` (OpenAI/Anthropic/Google-shaped APIs) or an extension (`pi.registerProvider()`) for anything else, including OAuth. Catalogs cached in `~/.pi/agent/models-store.json`. | `--provider`, `--model`, `/model`, `/login`; `models.json`; `pi.registerProvider()` | `CA`/README.md; `DOCS`/providers.md, `DOCS`/models.md, `DOCS`/custom-provider.md | ✅ |
| 1a | Environment | Local shell (`bash`/`powershell` tools; `!`/`!!` prefix in the editor), filesystem (`read`, `write`, `edit`, plus opt-in `grep`/`find`/`ls`). **No built-in web/network tool** — the model reaches the network only through `bash`/`powershell` if those are enabled. No container/sandbox shipped; isolation is external (see 2c/6b). Runs on the local machine only; there is no first-party remote-attach analogue to OpenCode's `serve`/`attach` in the documented surface (the experimental `pi-server` may become one — unverified). | `--tools/-t`, `--exclude-tools/-xt`, `--no-builtin-tools/-nbt`, `--no-tools/-nt` | `CA`/README.md (Tool Options; "Available built-in tools"); `DOCS`/security.md | ✅ |
| 2a | Adapters & Middleware | Provider abstraction = `pi-ai`. Tool registry = 4 built-ins + opt-in read-only trio + extension `pi.registerTool()` (can override a built-in by name). **No MCP** by design (see §C refusal list; "Build CLI tools with READMEs (see Skills), or build an extension that adds MCP support."). Middleware = the Extension event system (18+ typed hook points, below). An experimental binary protocol (`pi-protocol`, CBOR framing, versioned) exists for a not-yet-documented client/server split. | `pi.registerTool()`; `.pi/extensions/*.ts` | `CA`/README.md (Philosophy); `DOCS`/extensions.md; `RAW`/packages/protocol/README.md | ✅ |
| 2b | Hooks | Extension lifecycle events (TypeScript, in-process — not a separate hook language): `project_trust`, `resources_discover`, `session_start/_info_changed/_before_switch/_before_fork/_before_compact/_compact/_compact_failed/_before_tree/_tree/_shutdown`, `before_agent_start`, `agent_start/_end/_settled`, `ui_prompt_start/_end`, `turn_start/_end`, `message_start/_update/_end`, `tool_execution_start/_update/_end`, `context`, `before_provider_headers`, `before_provider_request`, `after_provider_response`, `model_select`, `thinking_level_select`, `tool_call` (**can block**, mutate input), `tool_result` (**can modify**), `user_bash`, `input`. Fail mode is explicit: *"tool_call errors block the tool (fail-safe)"*; other extension errors are logged and the agent continues. | `~/.pi/agent/extensions/*.ts`, `.pi/extensions/*.ts`; `pi.on(event, handler)` | `DOCS`/extensions.md (Events, Error Handling) | ✅ |
| 2c | Enforcement | Nothing mechanical ships by default (see Inclusion Test Q3). What exists: coarse CLI tool allow/deny (`--tools`/`--exclude-tools`), project trust (gates *file loading*, not tool execution), `auth.json` written with `0600` permissions, and extension-authored gates that can `return { block: true, terminate?: true }` from `tool_call`. What survives an unattended/`-p`/`--auto`-style run: nothing — there is no `--auto` flag and no "deny survives everything" concept to survive, because there is no deny concept in the core. Real enforcement is pushed to the OS/container boundary (Gondolin micro-VM, Docker, or NVIDIA OpenShell policy sandbox). | as listed | root README ("Permissions & Containerization"); `DOCS`/security.md; `DOCS`/containerization.md; `DOCS`/providers.md (auth.json perms) | ✅ |
| 3a | Control | No plan mode, no approval-popup flow shipped (refused by name, §C). Control that does exist: project trust before loading dynamic config; the **message queue** during a run (Enter = steering message delivered after the current tool batch, Alt+Enter = follow-up delivered after all work finishes, Escape aborts and restores queue); `-p`/`--mode json`/`--mode rpc` give three different non-interactive run contracts; RPC exposes `abort`, `abort_bash`, `abort_retry`. | `/settings` (`steeringMode`, `followUpMode`); CLI modes; RPC commands | `CA`/README.md (Message Queue, Modes); `DOCS`/rpc.md | ✅ |
| 3b | Routing | Purely user-driven, not automatic: `--model`/`--provider`, `/model` (Ctrl+L), `/scoped-models` + Ctrl+P/Shift+Ctrl+P to cycle a fixed pattern list, `--thinking`/`/thinking` (off…max). **No task-based auto-routing and no cheap/"small model" concept** exist in Pi (unlike OpenCode's `small_model`) — checked `CA`/README.md CLI reference and `DOCS`/settings.md in full; there is exactly one active model per session, chosen by the human. | `--model`, `/model`, `/scoped-models`, `--models` | `CA`/README.md; `DOCS`/settings.md | ✅ |
| 3c | Composition | **Refused.** *"No sub-agents. There's many ways to do this. Spawn pi instances via tmux, or build your own with extensions, or install a package that does it your way."* Nothing ships: no sub-agent object, no delegation primitive, no system-prompt composition beyond replace/append (`.pi/SYSTEM.md`, `APPEND_SYSTEM.md`) and per-extension `before_agent_start` message injection. Checked `CA`/README.md, `DOCS`/extensions.md, `DOCS`/sdk.md — no "agent" type distinct from the single `Agent` runtime class. | — | `CA`/README.md (Philosophy) | ✅ |
| 3d | Configuration | Two-rung ladder only: `~/.pi/agent/settings.json` (global) < `.pi/settings.json` (project, nested-object merge). No remote/managed/MDM tier was found — checked `DOCS`/settings.md in full (contrast OpenCode's nine-rung ladder ending in macOS MDM). Context files: `AGENTS.md`/`CLAUDE.md` walking up from cwd plus `~/.pi/agent/AGENTS.md`; `AGENTS.override.md` replaces both for a directory. CLI env overrides: `PI_CODING_AGENT_DIR`, `PI_CODING_AGENT_SESSION_DIR`, `PI_PACKAGE_DIR`, etc. `--no-*` flags combine with explicit loads to bypass settings.json per-run. | `~/.pi/agent/settings.json`, `.pi/settings.json`, `AGENTS.md`/`CLAUDE.md`/`AGENTS.override.md`, `.pi/SYSTEM.md` | `DOCS`/settings.md; `CA`/README.md (Context Files, Environment Variables); `DOCS`/environment-variables.md | ✅ |
| 3e | Standards | Nothing here. No built-in formatter or LSP integration was found — the only "language servers" mention in the docs names them as an example of an *ordinary local process a shell command might invoke*, not a Pi feature (checked `DOCS`/security.md, `CA`/README.md table of contents, `DOCS`/settings.md). `AGENTS.md`/`CLAUDE.md` is entirely user-authored free text; no shipped rules pack, refusal-list schema, or convention artifact beyond the Agent Skills frontmatter spec skills must follow. | — | `DOCS`/security.md; `CA`/README.md; `DOCS`/settings.md | ✅ |
| 4a | Capability | **Skill** — `SKILL.md` per the [Agent Skills standard](https://agentskills.io/specification) ("warning about most violations but remaining lenient"; Pi *does not* require the skill name to match its parent directory, an intentional deviation because "that rule is suboptimal for shared skill directories used across multiple agent harnesses"). **Extension** — TypeScript module, `pi.registerTool/registerCommand/on(...)`. **Prompt Template** — Markdown, `/name` expansion with `$1`/`$@`/`${n:-default}` slicing. **Theme** — JSON TUI color file. **Pi Package** — npm/git bundle of any of the above via a `pi` key in `package.json` or convention directories; installed with `pi install npm:…`/`git:…`/local path, listed on a package gallery at pi.dev/packages. No first-party MCP-server capability. | `.pi/{extensions,skills,prompts,themes}/`, `~/.pi/agent/{same}`, `~/.agents/skills/`, `.agents/skills/` | `DOCS`/extensions.md, `DOCS`/skills.md, `DOCS`/prompt-templates.md, `DOCS`/themes.md, `DOCS`/packages.md | ✅ |
| 4b | Capability Permissions | Coarse only: `--tools`/`--exclude-tools`/`--no-builtin-tools`/`--no-tools` by tool **name**, and `--no-extensions`/`--no-skills`/`--no-prompt-templates`/`--no-themes`/`--no-context-files` toggle whole discovery classes. `pi config` enables/disables individual installed-package resources (global or `-l` project scope). No per-agent or per-role permission object exists (there is no "agent" to scope to; see 3c). Skill/extension code itself is unrestricted once loaded — *"Extensions execute arbitrary code, and skills can instruct the model to perform any action including running executables."* | CLI flags; `pi config` | `CA`/README.md (Resource Options, Package Commands); `DOCS`/packages.md | ✅ |
| 5a | Individual Memory | Nothing shipped as a "memory" feature. What exists: the persistent JSONL session tree (5a's actual substrate — see Inclusion Test Q1) and user-authored `~/.pi/agent/AGENTS.md`. No auto-captured memory file, no embedding store (checked `CA`/README.md, `DOCS`/index.md nav — no memory page exists). | — | `DOCS`/session-format.md; `CA`/README.md | ✅ |
| 5b | Team Memory | Nothing shipped. Closest: a committed, shared `AGENTS.md`/`CLAUDE.md` (convention, not enforced sync) and the OSS-session-sharing campaign (`pi-share-hf` → Hugging Face datasets), which is publication for research reuse, not team-facing shared memory. Checked `CA`/README.md, `DOCS`/index.md nav. | — | `CA`/README.md; root README | ✅ |
| 5c | Knowledge | Nothing shipped (no RAG/embeddings; no built-in web-search or web-fetch tool — see 1a). Retrieval is whatever `grep`/`find`/`ls`/`bash` can do locally, or whatever a Skill/Extension/MCP-alternative adds. The Agent Skills specification's "progressive disclosure" (descriptions always in context, full `SKILL.md` loaded on demand) is the nearest built-in mechanism, but it is a capability primitive (4a), not a knowledge store. | — | `CA`/README.md (built-in tools list); `DOCS`/skills.md | ✅ |
| 6a | Product | Nothing shipped — no PRD/spec object of any kind. Work lands directly in the working tree the `bash`/`edit`/`write` tools touch. Checked `CA`/README.md, `DOCS`/index.md nav. | — | `CA`/README.md | ✅ |
| 6b | Infrastructure | Runs locally on the host by default; no first-party remote server/attach surface in the *documented* product (contrast OpenCode's `serve`/`attach`/`web`). Three documented containment patterns, none built-in: **Gondolin** extension (routes built-in tools + `!` commands into a local Linux micro-VM, host keeps `pi`/auth), **plain Docker** (whole process in a container), **NVIDIA OpenShell** (policy-controlled sandbox via a gateway, local or remote Kubernetes). An **undocumented experimental** trio — `pi-server` (durable Session/Agent-harness hosting, facet routing), `pi-client`, `pi-protocol` (CBOR wire format) — exists in the monorepo but ships no docs-site page; env vars `PI_SERVER_DIR`/`PI_SERVER_ID` hint at it from the user-facing side. | Extension + `Dockerfile.pi` + `openshell` CLI, as documented | `DOCS`/containerization.md; `RAW`/packages/{server,client,protocol}/README.md; `DOCS`/environment-variables.md | ✅ (docs) / ⚠️ (experimental trio's maturity) |
| 6c | Estate | Nothing shipped. No cross-repo mount/reference object (contrast OpenCode's `references` key) was found — checked `CA`/README.md, `DOCS`/settings.md, `DOCS`/index.md nav for "reference"/"estate"/"workspace mount" terms. | — | `CA`/README.md; `DOCS`/settings.md | ✅ |
| 6d | Delivery | Nothing shipped for end-user work — no PR-bot, no GitHub Action / GitLab CI component for driving Pi against a user's repo (contrast OpenCode). The only CI/release material found is Pi's **own** dev pipeline: `.github/workflows/build-binaries.yml`, npm trusted publishing via GitHub Actions OIDC, `announce-pi-dev-release` verifying the npm tarball before `pi.dev/api/latest-version` reports it, lockstep versioning ("all packages share one version… No major releases."). The one "GitLab" hit in the docs is an example extension registering GitLab Duo as a **model provider**, not a delivery integration. | — | root `AGENTS.md` (Releasing); `DOCS`/custom-provider.md, `DOCS`/extensions.md (examples table) | ✅ |
| 7a | Workflow Tasks | **Refused.** *"No built-in to-dos. They confuse models. Use a TODO.md file, or build your own with extensions."* Nothing ships as a task/ticket/plan object. An example extension (`todo.ts`) demonstrates a stateful todo tool via `appendEntry`, but it is sample code, not a shipped feature. | — | `CA`/README.md (Philosophy); `DOCS`/extensions.md (Examples Reference) | ✅ |
| 8a | Evals | Nothing for **end-user** work — no user-facing benchmark/rubric/judge. What exists is dev-facing: `packages/evals` — *"behavioral, model-backed checks for Pi workflows"* built on `vitest-evals`, adapting a real `AgentSession` to test extensions/skills/model routing against a live provider (`npm run eval`), plus the plain `npm run check`/`./test.sh` contributor gate (must pass before a PR per CONTRIBUTING.md). Both evaluate **Pi itself**, not a user's product. | `npm run eval`; `npm run check`; `./test.sh` | `RAW`/packages/evals/README.md; root `CONTRIBUTING.md`, root `AGENTS.md` | ✅ |
| 8b | Evidence | Session JSONL (full untruncated tree, including compacted-away messages — *"The full history remains in the JSONL file; use `/tree` to revisit"*), `/export` (HTML), `pi --export <in> [out]`, `/share` (private gist with shareable HTML link), `--mode json` (full event stream to stdout), `/session` (file/ID/message count/tokens/cost). No signed/immutable audit-log object beyond the JSONL file itself. | as listed | `CA`/README.md (Sessions, Commands); `DOCS`/session-format.md, `DOCS`/json.md | ✅ |
| 8c | Observability | Minimal, and narrowly scoped to Pi's own install lifecycle, not to session/agent spans. Two independent startup features: an **update check** (pings `pi.dev/api/latest-version`, disable via `PI_SKIP_VERSION_CHECK`) and **install/update telemetry** (one anonymous version ping to `pi.dev/api/report-install`, plus optional provider-attribution headers for OpenRouter/Cloudflare/NVIDIA NIM; opt out via `enableInstallTelemetry: false` or `PI_TELEMETRY=0`; `PI_OFFLINE` disables all of it). A hidden `/debug` command writes rendered TUI + last LLM messages to `~/.pi/agent/pi-debug.log`. Separately, `@earendil-works/pi-telemetry` is a **generic, vendor-neutral span/attribute/event contract library** for extension authors to instrument *their own* code — it ships "no exporter, global current-span state, or dependency on a telemetry backend," and the coding-agent CLI's own `src/core/telemetry.ts` only implements the install-ping check above, not spans. No OpenTelemetry integration was found anywhere in the read source or docs (checked via `gh api search/code` and the downloaded doc set). | `PI_TELEMETRY`, `PI_OFFLINE`, `PI_SKIP_VERSION_CHECK`, `enableInstallTelemetry` | `CA`/README.md ("Telemetry and update checks"); `RAW`/packages/coding-agent/src/core/telemetry.ts; `RAW`/packages/telemetry/README.md | ✅ |
| 8d | Efficiency | Footer shows live token/cache/cost (`↑` input, `↓` output, `R` cache read, `W` cache write, `CH` cache-hit rate) and context usage. Compaction settings (`reserveTokens` default 16384, `keepRecentTokens` default 20000, auto-triggered or `/compact`); retry settings (`retry.enabled`, `maxRetries`); `PI_CACHE_RETENTION=long` extends provider prompt-cache TTL. No cost-cap/budget-enforcement mechanism was found (compare OpenCode's `steps` cap "for users who wish to control costs") — checked `DOCS`/settings.md in full. | as listed | `CA`/README.md (Interactive Mode footer); `DOCS`/settings.md; `DOCS`/compaction.md; `DOCS`/environment-variables.md | ✅ |
| 9a | Learning | Nothing shipped. No auto-capture of a session into a Skill, no memory-curation step. The docs *invite* the user to ask the agent to author a Skill/Extension/Prompt Template ("pi can create skills. Ask it to build one for your use case."), which is a prompting convention, not a mechanism. | — | `DOCS`/skills.md, `DOCS`/extensions.md, `DOCS`/prompt-templates.md (callout lines) | ✅ |
| 9b | Rituals | Nothing shipped. No named review/retro object; the closest is the maintainers' own `CONTRIBUTING.md` triage cadence, which is a human process around the repo, not a feature of the harness. | — | root `CONTRIBUTING.md` | ✅ |
| 9c | Cadence | Nothing shipped. No cron/heartbeat/schedule primitive — checked the full downloaded doc set for "cron"/"schedule"/"heartbeat"; the only hits are an unrelated scheduled `npm audit` GitHub Actions workflow (Pi's own repo hygiene) and `summarization_retry_scheduled` (a compaction-retry backoff event, not a cadence feature). | — | root README (Supply-chain hardening); `DOCS`/rpc.md, `DOCS`/sdk.md (retry-event names) | ✅ |
| 9d | Anti-fragile Lifecycle | Branch-level recovery only, and by explicit design deferral for file-level recovery: *"Pi runs in your current working directory and can modify files there. Use git or another checkpointing workflow if you want easy rollback."* — Pi ships no file-change undo/redo/snapshot system (checked `CA`/README.md, `DOCS`/keybindings.md — the one `undo` keybinding, `tui.editor.undo`/Ctrl+Z, undoes typed *editor text*, not file writes). What Pi does ship: `/tree`/`/fork`/`/clone` branch navigation (nothing is ever overwritten — see Inclusion Test Q1), auto-compaction recovery on context overflow, and configurable auto-retry (`retry.enabled`, `maxRetries`) for transient provider/summarization failures. | `/tree`, `/fork`, `/clone`; `retry.*` settings | `DOCS`/quickstart.md ("First session"); `DOCS`/keybindings.md; `DOCS`/sessions.md; `DOCS`/compaction.md | ✅ |
| 9e | Raise the Floor | `pi config` (enable/disable installed package resources, global or project), the in-repo "ask pi to build a skill/extension/theme/package" callouts on every customization doc page, curated skill repositories linked from `docs/skills.md` (Anthropic Skills, `badlogic/pi-skills`). No `pi doctor`/health-check command and no golden-path scaffolding template were found — checked the full CLI reference in `CA`/README.md. | `pi config` | `DOCS`/packages.md; `DOCS`/skills.md; `CA`/README.md (CLI Reference) | ✅ |
| 9f | Diagnose the Bottleneck | Nothing beyond the per-session stats already covered in 8d/8b (`/session`, footer, `--list-models`). No aggregate/fleet-level throughput or maturity instrument was found — checked `CA`/README.md CLI reference in full. | — | `CA`/README.md | ✅ |
| 10a | Roster | **Refused at the root**: because sub-agents are refused (3c), there is no roster object — one model, one operator, one session. No agent registry, no named built-in agents (contrast OpenCode's build/plan/explore/scout). | — | `CA`/README.md (Philosophy) | ✅ |
| 10b | Org | Nothing shipped. No tenancy, no admin/member roles, no managed/MDM settings tier, no escalation model — checked `DOCS`/settings.md, `DOCS`/providers.md, `DOCS`/custom-provider.md, `DOCS`/extensions.md in full (see Inclusion Test Q2 for the SSO/enterprise false-positive check). | — | pages named above | ✅ |
| 11a | Surfaces | TUI (default; experimental `--tui-mode fullscreen`), print mode (`-p`), JSON event-stream mode (`--mode json`), RPC mode over stdin/stdout (`--mode rpc`), embeddable Node SDK (`createAgentSession`/`createAgentSessionRuntime`). No first-party web UI, desktop app, or IDE extension surface — contrast OpenCode/Claude Code. Extensions can add custom TUI components (`ctx.ui.custom()`) and, per the README's own example list, can "Make pi look like Claude Code." The sibling repo `earendil-works/pi-chat` (Slack/chat automation) was named but not opened. An undocumented experimental server/client pair (6b) may be a future non-TUI surface. | as listed | `CA`/README.md (CLI Reference, Extensions "What's possible"); `DOCS`/sdk.md, `DOCS`/rpc.md, `DOCS`/json.md | ✅ (shipped) / ⚠️ (pi-chat) |

---

## C. Primitive set (name · path · project's own definition)

| Primitive | Path / key | Project's definition (verbatim) | Source |
|---|---|---|---|
| **Extension** | `~/.pi/agent/extensions/*.ts` (global), `.pi/extensions/*.ts` (project), or a Pi Package | *"Extensions are TypeScript modules that extend pi's behavior. They can subscribe to lifecycle events, register custom tools callable by the LLM, add commands, and more."* | `DOCS`/extensions.md ✅ |
| **Skill** | `~/.pi/agent/skills/`, `~/.agents/skills/`, `.pi/skills/`, `.agents/skills/` (cwd → ancestors), or a Pi Package | *"Skills are self-contained capability packages that the agent loads on-demand. A skill provides specialized workflows, setup instructions, helper scripts, and reference documentation for specific tasks."* Implements the [Agent Skills standard](https://agentskills.io/specification), "warning about most violations but remaining lenient." | `DOCS`/skills.md ✅ |
| **Prompt Template** | `~/.pi/agent/prompts/*.md`, `.pi/prompts/*.md`, or a Pi Package | *"Prompt templates are Markdown snippets that expand into full prompts."* Filename → command name; `$1`/`$@`/`${n:-default}` argument substitution. | `DOCS`/prompt-templates.md ✅ |
| **Theme** | `~/.pi/agent/themes/*.json`, `.pi/themes/*.json`, or a Pi Package | *"Themes are JSON files that define colors for the TUI."* Built-in: `dark`, `light`; hot-reload on file change. | `DOCS`/themes.md ✅ |
| **Pi Package** | npm (`pi install npm:@foo/bar`) or git (`pi install git:host/user/repo@ref`) or local path | *"Pi packages bundle extensions, skills, prompt templates, and themes so you can share them through npm or git. A package can declare resources in `package.json` under the `pi` key, or use conventional directories."* | `DOCS`/packages.md ✅ |
| *(supporting)* **Tool** | registered via `pi.registerTool()` inside an Extension | *"Custom tools override built-in tools with the same name"* when the name collides. Not independently installable — always arrives through an Extension. | `DOCS`/extensions.md ✅ |
| *(supporting)* **Command** | registered via `pi.registerCommand()`, or auto-derived from a Prompt Template filename | Invoked as `/name`; Skills also auto-register as `/skill:name`. | `DOCS`/extensions.md, `DOCS`/prompt-templates.md, `DOCS`/skills.md ✅ |
| *(supporting)* **Context file** | `AGENTS.md` *or* `CLAUDE.md` (both loaded, both concatenated); `AGENTS.override.md` replaces either for one directory | *"Pi loads `AGENTS.md` (or `CLAUDE.md`) at startup"*; *"If a directory contains `AGENTS.override.md`, Pi loads it instead of `AGENTS.md` or `CLAUDE.md` from that directory."* Note: two sanctioned filenames for the identical slot is itself a borderline case against the primitive definition — see §F, Skill findings. | `CA`/README.md ✅ |

**Count:** 5 primitives, 3 supporting.
**Verdict: 5–7, healthy.** The set forces a real choice (behavior→Extension, on-demand instructions→Skill,
reusable prompt→Prompt Template, appearance→Theme, distribution→Pi Package) and nothing else is offered for
those jobs. It is reinforced by the strongest form a primitive set can take — a **refusal list**, quoted here in
full because it is the primary evidence for the verdict, not just color:

> *"**No MCP.** Build CLI tools with READMEs (see Skills), or build an extension that adds MCP support. […]*
> ***No sub-agents.** There's many ways to do this. Spawn pi instances via tmux, or build your own with*
> *extensions, or install a package that does it your way.*
> ***No permission popups.** Run in a container, or build your own confirmation flow with extensions inline with*
> *your environment and security requirements.*
> ***No plan mode.** Write plans to files, or build it with extensions, or install a package.*
> ***No built-in to-dos.** They confuse models. Use a TODO.md file, or build your own with extensions.*
> ***No background bash.** Use tmux. Full observability, direct interaction."*
> — `CA`/README.md, "Philosophy" ✅

---

## D. Stated limitations / "what it does not claim" (quoted)

**Root `README.md`**
> "Pi does not include a built-in permission system for restricting filesystem, process, network, or credential
> access. By default, it runs with the permissions of the user and process that launched it."

**`docs/security.md`**
> "Pi does not include a built-in sandbox. Built-in tools can read files, write files, edit files, and run shell
> commands with the permissions of the pi process. Extensions are TypeScript modules that run with the same
> permissions… This is intentional… A partial in-process sandbox would be easy to misunderstand as a security
> boundary while still depending on the host shell, filesystem, package managers, credentials, and extension
> code."

> "Project trust is only an input-loading guard… It does not make untrusted code, untrusted prompts, or untrusted
> model output safe. Prompt injection from repository files, comments, documentation, context files, or build
> output is expected local-agent risk and cannot be reliably prevented by pi."

**Root `SECURITY.md`**
> "Pi relies on users installing trustworthy extensions and loading trustworthy skills and only to use pi within
> trusted repositories. This is because files like `AGENTS.md` or instructions in comments can be used to prompt
> inject the coding agent trivially and this cannot be protected against."

> Out of scope (selected): "Local code execution or sandboxing behavior (the Pi coding agent intentionally does
> not have a sandbox)"; "Behavior of pi extensions or skills installed by the user"; "Risks from working in
> untrusted repositories"; "Prompt injection attacks"; "Reports about malicious model output."

**`CA`/README.md, "Philosophy"**
> "Pi ships with powerful defaults but skips features like sub agents and plan mode. Instead, you can ask pi to
> build what you want or install a third party pi package that matches your workflow." — plus the full refusal
> list quoted in §C.

**`CA`/README.md, "Quick Start"**
> "Pi runs in your current working directory and can modify files there. Use git or another checkpointing
> workflow if you want easy rollback."

**Root `CONTRIBUTING.md`**
> "If your feature does not belong in the core, it should be an extension. PRs that bloat the core will likely be
> rejected." / "**You must understand your code.** If you cannot explain what your changes do and how they
> interact with the rest of the system, your PR will be closed."

---

## E. Sources (all accessed 2026-09-03)

**Primary**
- `gh api repos/earendil-works/pi` (identity, license, stars, forks, dates)
- `gh api repos/earendil-works/pi/languages`
- `gh api repos/earendil-works/pi/releases --paginate` (257 releases, first/last tag)
- `gh api repos/earendil-works/pi/tags`
- `gh api repos/earendil-works/pi/git/trees/main`, `.../git/trees/<sha>?recursive=1` (repo layout; `packages/`; `packages/coding-agent/docs/` tree)
- `gh api users/earendil-works`, `gh api users/badlogic`
- `gh api "search/code?q=telemetry+repo:earendil-works/pi+path:packages/coding-agent/src"`
- `gh api "search/code?q=ACP+repo:earendil-works/pi"`, `gh api "search/code?q=%22agent+client+protocol%22+repo:earendil-works/pi"`
- `curl -I https://github.com/badlogic/pi-mono` (301 redirect confirmation)
- Raw files under `https://raw.githubusercontent.com/earendil-works/pi/main/`: `README.md`, `AGENTS.md`,
  `SECURITY.md`, `CONTRIBUTING.md`, `LICENSE`, `package.json`, and under `packages/coding-agent/`: `README.md`,
  `package.json`, and every page in `docs/` — `index.md`, `quickstart.md`, `usage.md`, `security.md`,
  `settings.md`, `skills.md`, `extensions.md`, `sessions.md`, `session-format.md`,
  `environment-variables.md`, `keybindings.md`, `providers.md`, `models.md`, `sdk.md`, `rpc.md`,
  `containerization.md`, `compaction.md`, `custom-provider.md`, `development.md`, `json.md`, `packages.md`,
  `prompt-templates.md`, `themes.md`, `tui.md` (headers only)
- Package READMEs read at primary source for cross-checks: `packages/agent/README.md`,
  `packages/telemetry/README.md`, `packages/chord/README.md`, `packages/protocol/README.md`,
  `packages/client/README.md`, `packages/server/README.md`, `packages/session-backends/sqlite-node/README.md`,
  `packages/evals/README.md`
- `packages/coding-agent/src/core/telemetry.ts` (raw source, to verify the install-ping-only scope of 8c)

**Secondary** — none used. Every claim in this draft traces to a primary-source page or `gh api` call above; no
blog post, review, or search snippet was relied on for a factual cell. (Mario Zechner's blog posts are cited
inside quoted *vendor* text — e.g. the README's "Philosophy" section links
`mariozechner.at/posts/2025-11-30-pi-coding-agent/` as its own rationale — but the posts themselves were not
opened or used as a source here.)

---

## F. Things I could NOT verify

- The relationship between the shipped JSONL session format and the undocumented
  `@earendil-works/pi-session-backend-sqlite-node` package — which one is authoritative, whether the SQLite
  backend is used by the CLI at all today, or is purely a library surface for embedders. ⚠️ (existence ✅, role ⚠️)
- The maturity, activation path, and intended audience of the experimental `pi-protocol`/`pi-server`/`pi-client`
  trio — no docs-site page references them, and `PI_SERVER_DIR`/`PI_SERVER_ID` are the only user-facing hooks
  found. ⚠️
- `earendil-works/pi-chat` ("Slack/chat automation and workflows") — named in the root README but not opened;
  cannot confirm whether it hosts Pi's loop, wraps it, or is a separate product. ⚠️
- Whether `badlogic/pi-skills` (linked from `docs/skills.md`) is still maintained under the personal `badlogic`
  account post-rename, or is itself due to move to `earendil-works` — not checked. ⚠️
- The npm-only `@earendil-works/pi-tui` package's public API surface — only referenced from README links and the
  Extensions doc's "Available Imports" table; the package itself was not opened. ⚠️
- Whether `pi.dev/docs/latest` (the hosted docs site) matches the `packages/coding-agent/docs/` source read here
  verbatim, or has drifted — this run read the repo source per the task's instruction, not the rendered site. ⚠️
- Live behavior (e.g., actual tool-call blocking, actual compaction cut points) — this run is a documentation
  read, not an executed session; every ✅ mark above means "read at the cited primary-source page/API," not
  "observed running." ⚠️ (applies uniformly; not repeated per row)

### Skill findings

*(This subsection is prescribed by `--sanity` and speaks about the skill, not about Pi.)*

- **The template fit unusually well for a harness whose whole identity is "we refuse things."** Rule 2
  ("absence is recorded, never inferred") and rule 4's refusal-list carve-out ("If the harness publishes a list
  of what it will *not* ship, quote it here") turned out to be load-bearing for Pi in a way they might not be for
  a harness that merely *omits* features without naming them. Recommend the SKILL call this out explicitly:
  a harness with a **named** refusal list should have that list quoted in *both* §C (as instructed) and echoed
  briefly in the opener's "In one screen" paragraph, because it is thesis-level information, not a component
  detail. I did this, but the current SKILL only tells you to quote it in §C.
- **Ambiguous rule: what counts as "a primitive that is confused with a feature" when the harness names five
  things but the natural reading groups them 3+2 (content types vs. distribution)?** `Extension`/`Skill`/`Prompt
  Template`/`Theme` are all "things you write instructions/code into"; `Pi Package` is a *packaging format* for
  the other four, not a peer capability. The SKILL's fixed shape (`§C: one row per primitive`) has no place to
  record that one row is a meta-primitive over the others — I noted it in the Verdict prose, but a rubric this
  strict about row shape gave me no structured place for "this primitive set has an internal hierarchy."
  Recommend: allow (not require) a one-line "shape" note under the Verdict when a primitive set is not flat.
- **Ambiguous rule: does "one sanctioned way" (§01-concepts.md 3.17) survive an intentional two-name
  compatibility alias?** Pi loads *both* `AGENTS.md` and `CLAUDE.md` for the identical slot, by design, for
  cross-harness portability. Per 3.17's own worked example ("A team with two ways to declare a unit of work has
  no work primitive"), this should disqualify Context File as a primitive — which is exactly why I filed it under
  *(supporting)*, not as a numbered primitive — but the SKILL gives no explicit guidance on whether a
  documented, intentional compatibility alias is different in kind from an accidental "two conventions and a
  coin flip." I resolved it by judgment; a future run might resolve it the other way and the page would look
  inconsistent with this one for no principled reason. Recommend the SKILL or `01-concepts.md` add one sentence
  distinguishing "two names, one team decided both are canonical" from "two ways, no one decided."
- **Hardest section to fill from primary sources: 8c Observability and 6b Infrastructure**, both because Pi ships
  a *generically named but narrowly scoped* thing (`pi-telemetry` the package vs. `telemetry.ts` the
  install-ping check share a name-root but not a function) and because the true state of the art
  (`pi-protocol`/`pi-server`/`pi-client`) is real, dated, versioned code with **zero** docs-site linkage. The
  SKILL's rule 6 ("primary sources first… the repo… its docs directory") does not say what to do when the repo
  contradicts the docs directory by *silence* — i.e., when a whole subsystem exists in source but is absent from
  every page `docs.json` enumerates. I treated "exists in source, absent from docs nav" as ✅-existence +
  ⚠️-maturity, but the SKILL has no rule number to point to for that split; I would have benefited from one.
- **The 33-row order occasionally fights the "loop question" altitude call.** Because Pi refuses sub-agents (3c)
  and has no MCP (2a), five or six rows in a row read "Nothing here, refused" back-to-back (2a, 3c, 7a, 10a all
  quote the same Philosophy paragraph). This is accurate and rule-compliant, but a reader scanning §B alone (the
  skill's own stated audience use-case: "scan §B and see what it ships and what it does not") will hit a wall of
  near-identical refusal quotes before reaching the identity of what Pi *does* do (Extension/Skill/Prompt
  Template/Theme). Nothing in the SKILL is wrong here — this is a property of Pi, not the template — but it is
  worth flagging that the fixed row order does not let a "refused, see §C" cross-reference collapse repeated
  citations of the same source paragraph the way a human editor would.
- **`--sanity`'s "write to `content/<name>-draft.md`" instruction was unambiguous and easy to follow**; the only
  friction was procedural, not textual: step 9 ("Downstream obligations… skip all four under `--sanity`") reads
  naturally only once you already know it exists, because step-order in the Procedure places step 9 *after* the
  page-writing steps, but the `--sanity` section itself is documented separately, after §F, further down the
  file. A reader executing top-to-bottom for the first time (as I did) reaches "write the four downstream files"
  in step 9 before having read the `--sanity` override that cancels it. I did not act on step 9 incorrectly
  because I had already read the whole file per this task's own instructions, but a strict "read once, execute
  linearly" agent could act on step 9 before reaching the override. Recommend moving the `--sanity` block (or at
  least a one-line forward-reference) to sit immediately above step 9, not after §F.

### Diff against `content/pi.md` (existing Template-A page), read only after this draft was written

I opened `content/pi.md` only now, per the task's instruction, solely to produce this comparison. I made **no**
edits to it and copied no prose from it into the sections above (all of which were written before I opened it).
`content/pi.md` was read 2026-09-02; this draft was read 2026-09-03 — one calendar day apart, which matters for
one of the findings below.

**Where `content/pi.md` is more complete than this draft — genuine gaps in this run, not method differences:**

- **It enumerates `packages/coding-agent/examples/extensions/`** (`subagent/`, `plan-mode/`, `git-checkpoint.ts`,
  `auto-commit-on-exit.ts`, `file-trigger.ts`, `ssh.ts`, and more) and reads their per-example READMEs. That
  directory is named in the SKILL's own step 2 ("the examples directory") and I never opened it — I read the
  *docs* tree in full but not the *examples* tree. This is a real, avoidable gap: `content/pi.md`'s rows 3a
  (Control), 3c (Composition), and 7a (Workflow Tasks) are richer for it — e.g. it names the shipped
  `subagent/README.md` pattern (agent personas as Markdown at `~/.pi/agent/agents/*.md`, `scout.md`/`planner.md`/
  `reviewer.md`/`worker.md`, `agentScope: "both"|"project"`) as the concrete shape of "build your own" for the
  refused sub-agents primitive. My draft's row 3c states the refusal correctly but stops there. **`content/pi.md`
  is more useful here; this draft should have opened the examples tree.**
- **It reads `docs/usage.md`'s "Design Principles" section**, which restates the refusal list in the vendor's own
  words a second time, independently of the README. I downloaded `usage.md` in my initial batch fetch but never
  actually opened its content — confirmed just now: `usage.md` line 305-309 does carry this section, and I missed
  it. Where I quote the refusal list, I have only the README source; `content/pi.md` has two independent
  citations for the same claim. **`content/pi.md` is more thorough here.**
- **It checked the npm registry** (`registry.npmjs.org/@mariozechner%2Fpi-coding-agent` and
  `@earendil-works%2Fpi-coding-agent`) and found an intermediate package identity — `@mariozechner/pi-coding-agent`
  (created 2025-11-12, deprecated at 0.73.1) — between the original personal scope and the current
  `@earendil-works` scope. My draft's "Prior names / homes" row covers the GitHub-level rename (`badlogic/pi-mono`
  → `earendil-works/pi`) and the *docs' internal* residue of the old repo name, but never checked the npm
  registry, so it missed this middle step in the package's identity history entirely. **`content/pi.md` is more
  complete here; this is a real gap**, not an emphasis difference — I had no way to know about the intermediate
  npm scope from GitHub alone.
- **It cites the maintainer's own blog post** (`mariozechner.at/posts/2026-04-08-ive-sold-out/`) for governance
  detail — "I'm a shareholder of Earendil and in charge of all pi decisions, along with Armin and Colin" and "It
  will stay MIT licensed… the fork button on GitHub still works." My draft's Owner/maintainer row is limited to
  what `gh api` and the LICENSE file show (org bio, personal copyright holder) and does not reach this
  governance texture. Since this SKILL run followed rule 6 ("primary sources first… Blog posts… are `◐` and go
  in §E under Secondary") and I did not fetch any blog post at all, this is a legitimate scope difference, not a
  correction: **`content/pi.md`'s version is richer, but mine is stricter about rule 6** (it never asked me to
  fetch a blog for identity facts, and I didn't). Whether the richer read is worth the ◐ marks it would need is
  a judgment call the SKILL leaves open.
- **It opened `earendil-works/pi-chat`** and reports concrete claims from its README (Discord/Telegram bridging,
  "Durable memory — account-wide and channel-specific memory files"). My draft explicitly declined to open this
  sibling repo and marked it ⚠️ across three rows (Inclusion Test Q2, 5a, 11a). This was a deliberate scope
  choice on my part (the task named Pi's docs root as `packages/coding-agent/docs`, and pi-chat is a separate
  repository), but it means my draft is honestly incomplete where `content/pi.md` is populated. **Neither is
  "wrong"; this is the clearest case in the whole comparison of a scope boundary the SKILL does not draw for
  you** — nothing in the Procedure says whether a named sibling repository is in-bounds for "read the whole docs
  surface." See Skill findings below.

**Where the two drafts genuinely disagree because the source itself changed between reads — not an error in
either draft:**

- **`packages/server/README.md` is a different document on 2026-09-02 vs. 2026-09-03.** `content/pi.md` quotes it
  saying *"Experimental. This package is under active development and may change or be removed without
  notice… This package does not provide a standalone CLI or coding-agent service,"* and describes a
  `PiServer`/`PiClient`/`SessionLease` (exclusive/shared) model with "Treat peers as untrusted." The same file,
  fetched today, opens instead with *"Experimental local server for the new durable Session and Agent Harness
  interfaces"* and describes `RoutedServerServiceHost`, `RoutedSessionHandle.attachClient()`, and
  attachment-scoped routing — no `SessionLease`, no "Treat peers as untrusted" line, no "does not provide a
  standalone CLI" line. **This is a real one-day rewrite of an experimental package's README, not a
  transcription error in either draft** — it is direct evidence for both drafts' shared caveat that this
  subsystem is unstable, and a caution about citing an experimental, doc-site-unlinked package as if it were a
  stable primary source. Star count also moved (100,782 → 101,457) in the same window, as expected for a live
  API value.
- **Primitive-set boundaries.** `content/pi.md`'s §C lists 5 primitives *plus* `Session`, `Settings`, and
  `Context file` as full primitive rows (8 total) with `Project trust`, `Tool`, and `models.json` as supporting
  (11 total). This draft lists the same 5 primitives but keeps `Context file` as *(supporting)* only, and does
  not give `Session` or `Settings` their own primitive rows at all, reasoning that "the single sanctioned way to
  express [customization]" (01-concepts.md §3.17) most naturally covers the five *extensibility* mechanisms,
  while Session/Settings/Context-file are closer to load-bearing infrastructure every harness in the corpus has
  some version of, not a "primitive" specific to what makes Pi's set 5–7 and forcing-a-choice. **I cannot call
  this a correction in either direction** — 3.17 defines a primitive by "the single sanctioned way to express
  something," which Settings and Sessions arguably satisfy just as much as Skill or Theme do. This is the
  clearest case in the whole page of the ambiguous-rule finding below: the SKILL does not say whether
  infrastructure objects (session, settings) that also happen to be singular/sanctioned count toward the 5–7
  primitive-set count, or sit outside it as scaffolding. Two independent runs of the same skill against the same
  harness produced two different, both-defensible primitive-set boundaries — which is exactly the kind of
  inconsistency rule 4 ("A primitive set is 5–7 and forces a choice… Count it") is trying to prevent, and the
  SKILL's current text does not give enough to prevent it.
