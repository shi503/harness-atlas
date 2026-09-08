---
status: DRAFT
title: "Tools and the tool catalog"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Tools and the tool catalog

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"**Tools** are callable actions, **skills** teach agents how to work, and **plugins** add runtime
capabilities."* This document is the first of those three: what exists, and the two mechanisms for
using a catalog too large to put in a prompt. Which of them a model may call is
[`13`](./13-tool-policy-approvals-and-sandboxing.md).

*"The model only sees tools that survive the active profile, allow/deny policy, provider
restrictions, sandbox state, channel permissions, and plugin availability."*

---

## 1. The built-in categories

| Category | Representative tools |
|---|---|
| Runtime | `exec`, `process`, `terminal`, `code_execution` |
| Files | `read`, `write`, `edit`, `apply_patch`, `ls` |
| Human input | `ask_user`, `secrets` |
| Web | `web_search`, `x_search`, `web_fetch` |
| Browser | `browser` |
| Operator UI | `screen` |
| Session progress | `progress_card` — *"unavailable to sub-agents"* |
| Messaging and channels | `message` |
| Sessions and agents | `sessions_*`, `agents_wait`, `subagents`, `agents_list`, `session_status`, `get_goal`, `create_goal`, `update_goal` |
| Automation | `cron`, `heartbeat_respond` |
| Gateway and nodes | `gateway`, `nodes` |
| Media | `view_image`, `image_generate`, `music_generate`, `video_generate`, `tts` |
| Large catalogs | `exec`, `wait`, `tool_search_code`, `tool_search`, `tool_describe` |

*"The table lists representative tools so you can recognize the surface. It is not the full policy
reference"* — that is `/gateway/config-tools`.

One behaviour worth knowing about `edit`: it *"supports targeted formatting changes, including
removing trailing spaces or replacing Unicode quotes, dashes, and spaces. These changes are applied
even when the old and new text would compare equal after fuzzy normalization."*

The `ls` tool is a directory-discovery primitive that works **without granting shell execution**: it
returns *"whole, JSON-quoted names and a filename cursor when another page is available,"* paged to
the model's tool-result budget, *"no partial filename is returned."* A custom sandbox backend
provides it through `SandboxFsBridge.readDirectory(...)`; when that method is absent, *"`ls` is hidden
… and OpenClaw does not fall back to reading the host filesystem."*

---

## 2. Choosing among tool, skill, and plugin

The vendor's own three-way test:

- **A tool** when the agent needs to *act* — *"a typed function the agent can call… Visible tools are
  sent to the model as structured function definitions."*
- **A skill** when *"the agent already has the tools it needs, but needs a repeatable workflow, review
  rubric, command sequence, or operating constraint."* — [`08`](./08-skills-and-the-skill-workshop.md)
- **A plugin** when *"the capability has code, credentials, lifecycle hooks, manifest metadata, or
  installable packaging."* — [`09`](./09-plugins-and-the-plugin-sdk.md)

---

## 3. Two ways to carry a large catalog

Both are **experimental OpenClaw agent-runtime surfaces**, and both are distinct from any
similarly-named surface owned by a hosted runtime — *"Codex harness runs use Codex-native code mode,
native tool search, deferred dynamic tools, and nested tool calls instead of `tools.codeMode` or
`tools.toolSearch`."*

### Tool Search

*"one compact way to discover and call large tool catalogs… useful when the run has many available
tools but the model is likely to need only a few of them."*

The model receives *"a bounded directory of the available trusted tool names and descriptions."*
Setting `tools.toolSearch: true` selects one `tool_search_code` tool plus *"any direct-only tools
whose structured results cannot cross the compact bridge."* The code tool runs a short JavaScript
body in an isolated Node subprocess behind an `openclaw.tools` bridge:

```js
const hits = await openclaw.tools.search("create a GitHub issue");
const tool = await openclaw.tools.describe(hits[0].id);
return await openclaw.tools.call(tool.id, { title: "…", body: "…" });
```

**The directory degrades gracefully:** it *"scales with the active model's context window. When space
is tight, descriptions shorten before tool names are omitted; every authorized catalog entry remains
searchable and callable."*

**Local inference routes turn it on by themselves.** *"Local inference routes use structured Tool
Search automatically when `tools.toolSearch` is unset. This defers tool schemas while keeping the
policy-approved capabilities available. It does not enable lean mode or remove optional tools."* The
default *"follows the active model for each run, including model switches and fallbacks, without
changing another agent's settings."*

### Code Mode

Off by default, opt-in through **Settings → Agents & Tools → Labs**. *"The Labs switch writes the
`"auto"` tier, which engages only for models marked as preferred Code Mode performers. This is the
global default; agent and model overrides take precedence."*

When enabled, *"the model no longer sees every enabled tool schema; instead, it sees `exec`, `wait`,
and any direct-only tool whose structured result cannot cross the JSON-only guest bridge."* The model
writes a small JavaScript or TypeScript program against the hidden catalog, executed in a
**QuickJS-WASI worker**; `exec` takes a JSON `{ code, language }` payload.

**`exec` here is not a shell.** *"In OpenClaw code mode, `command` is a JavaScript or TypeScript alias
for `code`, not a shell command… Recognizable shell commands are rejected before guest execution."*
`config` key: `tools.codeMode.enabled`.

---

## 4. Provider-backed tool surfaces

Several categories are thin cores fed by plugin-registered providers, so what the tool can do depends
on which plugin is enabled:

- **Web search** — twelve provider pages in the navigation: Brave, DuckDuckGo, Exa, Gemini, Grok,
  Kimi, MiniMax, Ollama, Parallel, Perplexity, SearXNG, Tavily.
- **Web fetch** — `web_fetch`, plus Firecrawl as a registered fetch provider.
- **Media** — image, music and video generation, TTS, PDF, and media understanding, each backed by
  `register*Provider` capabilities ([`09`](./09-plugins-and-the-plugin-sdk.md)).
- **Browser** — a dedicated browser profile, a Chrome extension, browser control, and an optional
  **sandboxed browser** on the Docker backend only ([`13`](./13-tool-policy-approvals-and-sandboxing.md)).

Concurrency guard on media: while a session-backed generation task is active, *"repeating the call for
the same prompt/request returns the matching active task status instead of starting a duplicate, while
a distinct prompt can start its own task."*

---

## 5. Chat and UI tools

`ask_user` pauses for *"a structured decision owned by the user"*; `secrets` obtains a credential
*"without seeing it"*; `progress_card` updates the parent session's durable progress card;
`show_widget` renders a bounded HTML document through a registered widget presenter — core *"validates
the canonical `show_widget` schema, composes the bounded HTML document, and passes immutable HTML plus
an optional hosted URL to `present(...)`."* Also `btw`, `reactions`, `screen`, `canvas`.

---

## 6. Context and reasoning controls

`tools/loop-detection`, `tools/thinking`, `tools/tokenjuice` and `tools/trajectory` are documented as
their own surfaces under the Capabilities tab, alongside `tools/llm-task` and `tools/lobster`.

---

## 7. MCP as a tool source

`mcp.servers` registers outbound MCP servers (stdio, HTTP, SSE) whose tools join the catalog under a
provider-safe prefix — *"non-`[A-Za-z0-9_-]` characters become `-`, names that do not start with a
letter get an `mcp-` prefix, and long or duplicate prefixes may be truncated or suffixed."*
`api.registerMcpServerConnectionResolver(...)` supplies a per-requester transport for a static server
name. Management and the two-way direction (`openclaw mcp serve`) are in
[`16`](./16-the-gateway-protocol-and-apis.md); the second allow gate that sandboxed sessions must pass
is in [`13`](./13-tool-policy-approvals-and-sandboxing.md).
