---
status: DRAFT
title: "The tool registry — four sources, one namespace"
tier: reference
project: harness-atlas
source: "https://opencode.ai/docs/tools · https://opencode.ai/docs/custom-tools · https://opencode.ai/docs/mcp-servers · https://opencode.ai/config.json"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# The tool registry — four sources, one namespace

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `opencode.ai/docs` at **v1.18.29**, **2026-09-08**.

Tools reach the model from four places — built-ins, `.opencode/tools/`, MCP servers, and plugin
`tool` hooks — and they land in **one flat namespace**. Every gate downstream, from `permission` keys
to `tools` toggles, matches a wildcard against a name in that namespace, which is why the naming
rules below are load-bearing rather than cosmetic.

---

## 1. Built-ins

*"By default, all tools are **enabled** and don't need permission to run."* The thirteen documented on
`/docs/tools#built-in`:

| Tool | Permission key | Note |
|---|---|---|
| `bash` | `bash` | *"Execute shell commands in your project environment"* |
| `edit` | `edit` | *"exact string replacements"* |
| `write` | `edit` | *"It will overwrite existing files if they already exist"* |
| `apply_patch` | `edit` | see §2 |
| `read` | `read` | *"supports reading specific line ranges"* |
| `grep` | `grep` | full regex, via ripgrep |
| `glob` | `glob` | *"Returns matching file paths sorted by modification time"* |
| `lsp` | `lsp` | **experimental** — *"only available when `OPENCODE_EXPERIMENTAL_LSP_TOOL=true` (or `OPENCODE_EXPERIMENTAL=true`)"*. Operations: `goToDefinition`, `findReferences`, `hover`, `documentSymbol`, `workspaceSymbol`, `goToImplementation`, `prepareCallHierarchy`, `incomingCalls`, `outgoingCalls` |
| `skill` | `skill` | loads a `SKILL.md` — [`06`](./06-skills-and-commands.md) |
| `todowrite` | `todowrite` | *"disabled for subagents by default"* |
| `webfetch` | `webfetch` | retrieval from a named URL |
| `websearch` | `websearch` | see §3 |
| `question` | `question` | *"allows the LLM to ask the user questions during a task"* — header, question text, options, and a custom answer |

**Three more tool names appear only as permission keys**, with no entry on the tools page: `list`,
`task` and `todoread`. Checked `/docs/tools/`, `/docs/agents#permissions` and `/docs/permissions/`. A
fourth, a batch tool, exists as the schema flag `experimental.batch_tool` — *"Enable the batch
tool"* — and is described nowhere else; checked the same three pages plus `/docs/config/`.

**Retrieval runs on ripgrep.** *"tools like `grep` and `glob` use ripgrep under the hood. By default,
ripgrep respects `.gitignore`."* A `.ignore` file in the project root re-admits paths — the docs'
example is `!node_modules/`, `!dist/`, `!build/`.

---

## 2. `apply_patch` behaves unlike its siblings

Three exceptions, all stated on the tools page and all relevant to plugin authors:

- **The hook name is not the tool name you might guess.** *"check `input.tool === "apply_patch"` (not
  `"patch"`)"*.
- **The argument is not a path.** *"`apply_patch` uses `output.args.patchText` instead of
  `output.args.filePath`."*
- **Paths live inside the payload**, in marker lines relative to the project root:
  `*** Add File: src/new-file.ts`, `*** Update File: src/existing.ts`,
  `*** Move to: src/renamed.ts`, `*** Delete File: src/obsolete.ts`.

A `tool.execute.before` hook written against `filePath` therefore sees nothing on a patch.

---

## 3. `websearch` is gated and unauthenticated

*"only available when using the OpenCode or OpenCode Go provider, or when either the
`OPENCODE_ENABLE_EXA` or `OPENCODE_ENABLE_PARALLEL` environment variable is set to any truthy
value"*. And: *"No API key is required — the tool connects directly to the backend's hosted MCP
service without authentication."*

The docs' own division of labour: *"Use `websearch` when you need to find information (discovery),
and `webfetch` when you need to retrieve content from a specific URL (retrieval)."*

---

## 4. Custom tools

*"Tools are defined as **TypeScript** or **JavaScript** files"*, in `.opencode/tools/` or
`~/.config/opencode/tools/`. *"However, the tool definition can invoke scripts written in **any
language** — TypeScript or JavaScript is only used for the tool definition itself."*

**Naming is positional.** *"The **filename** becomes the **tool name**."* With more than one export:
*"Each export becomes **a separate tool** with the name **`<filename>_<exportname>`**."*

**Arguments** are Zod. `tool.schema` *"is just Zod"*; importing `z` directly and returning a plain
object works identically.

**Context** passed to `execute`: `agent`, `sessionID`, `messageID`, `directory`, `worktree`. *"Use
`context.directory` for the session working directory. Use `context.worktree` for the git worktree
root."*

External npm packages require a `package.json` in the config directory — *"OpenCode runs
`bun install` at startup to install these."*

---

## 5. MCP servers

> *"Once added, MCP tools are automatically available to the LLM alongside built-in tools."*

**Local** (`type: "local"`):

| Option | Required | Note |
|---|:-:|---|
| `command` | yes | array of command and arguments |
| `cwd` | | *"Relative paths resolve from the workspace"* |
| `environment` | | env vars for the server process |
| `enabled` | | on startup |
| `timeout` | | *"Timeout in ms for fetching tools… Defaults to 5000"* |

**Remote** (`type: "remote"`): `url` required; `headers`, `enabled`, `timeout`, and `oauth`
(`clientId`, `clientSecret`, `scope`).

**OAuth is automatic.** OpenCode will *"Detect the 401 response and initiate the OAuth flow"*, *"Use
**Dynamic Client Registration (RFC 7591)** if supported by the server"*, and *"Store tokens securely
for future requests"*. Managed with `opencode mcp auth <name>`, `opencode mcp list`,
`opencode mcp logout <name>`.

**Naming is prefixed.** *"MCP server tools are registered with server name as prefix, so to disable
all tools for a server simply use `"mymcpservername_*": false`."*

`experimental.mcp_timeout` — *"Timeout in milliseconds for model context protocol (MCP) requests"* —
exists in the schema and on no documentation page; checked `/docs/mcp-servers/` and `/docs/config/`.

**The stated cost.** *"When you use an MCP server, it adds to the context… Certain MCP servers, like
the GitHub MCP server, tend to add a lot of tokens and can easily exceed the context limit."*

---

## 6. Plugin tools, and who wins a collision

A plugin returns tools under the `tool` hook key, built with the same `tool()` helper as a custom
tool — see [`07`](./07-plugins-hooks-and-events.md).

> *"If a plugin tool uses the same name as a built-in tool, the plugin tool takes precedence."*

That is the only collision rule stated across the four sources. What happens when a custom tool file
and an MCP tool resolve to the same name is not documented — checked `/docs/custom-tools/`,
`/docs/mcp-servers/`, `/docs/tools/` and `/docs/plugins/`.

---

## 7. Removing a tool, versus gating it

**`tools.<name>: false` removes it from the registry.** It accepts globs, so `"my-mcp*": false`
drops every tool from a server. The documented pattern for per-agent enablement is to disable
globally and re-enable in an agent's own `tools` block. Since `v1.1.1` the block is deprecated and
merged into `permission` — see [`02`](./02-permissions.md) §7 for the conversion and which side wins.

**`experimental.primary_tools`** is a schema-only array: *"Tools that should only be available to
primary agents."* No documentation page describes it — checked `/docs/tools/`, `/docs/agents/`,
`/docs/config/`.

**Output is truncated before it reaches the model.** `tool_output.max_lines` (default **2000**) and
`tool_output.max_bytes` (default **51200**): *"When output exceeds either limit, the full text is
written to the truncation directory and a preview is returned."* Schema only; not on `/docs/tools/`
or `/docs/config/`.
