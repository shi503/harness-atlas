---
status: DRAFT
title: "Plugins, hooks and events"
tier: reference
project: harness-atlas
source: "https://opencode.ai/docs/plugins · anomalyco/opencode packages/plugin/src/index.ts · packages/sdk/js/src/gen/types.gen.ts"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# Plugins, hooks and events

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `opencode.ai/docs` and `anomalyco/opencode` at **v1.18.29**, **2026-09-08**.

> *"Plugins allow you to extend OpenCode by hooking into various events and customizing behavior."*

**A plugin is a JavaScript or TypeScript module**, not a shell script and not a subprocess: *"a
JavaScript/TypeScript module that exports one or more plugin functions. Each function receives a
context object and returns a hooks object."* It runs in the OpenCode process with the SDK client in
hand, which is why a hook can change a decision rather than only observe one.

Two inventories matter and they are different things. **Hook keys** are the object a plugin returns —
twenty-one of them, defined in `packages/plugin/src/index.ts`. **Events** are the payloads delivered
to the single `event` hook and to the server's SSE stream — thirty-two types in the SDK.

---

## 1. Loading

**Local files** in `.opencode/plugins/` or `~/.config/opencode/plugins/` are *"automatically loaded
at startup"*. **npm packages** are named in the `plugin` array; *"Both regular and scoped npm packages
are supported"*, and *"npm plugins are installed automatically using Bun at startup. Packages and
their dependencies are cached in `~/.cache/opencode/node_modules/`."*

**Load order**, verbatim, with *"all hooks run in sequence"*:

1. Global config (`~/.config/opencode/opencode.json`)
2. Project config (`opencode.json`)
3. Global plugin directory (`~/.config/opencode/plugins/`)
4. Project plugin directory (`.opencode/plugins/`)

*"Duplicate npm packages with the same name and version are loaded once. However, a local plugin and
an npm plugin with similar names are both loaded separately."*

**Default plugins exist and are not listed on this page.** `OPENCODE_DISABLE_DEFAULT_PLUGINS`
(*"Disable default plugins"*) and the global `--pure` flag (*"Run without external plugins"*) both
appear in the CLI reference; `/docs/plugins/` names neither. One default plugin's contents are known
by reading the source — see [`06`](./06-skills-and-commands.md) §1.

---

## 2. The plugin's own context

```js
export const MyPlugin = async ({ project, client, $, directory, worktree }) => { … }
```

| Field | Verbatim |
|---|---|
| `project` | *"The current project information"* |
| `directory` | *"The current working directory"* |
| `worktree` | *"The git worktree path"* |
| `client` | *"An opencode SDK client for interacting with the AI"* |
| `$` | *"Bun's shell API for executing commands"* |

`PluginInput` in `packages/plugin/src/index.ts` carries two more that the page does not list:
`serverUrl`, and `experimental_workspace` with a single method,
`register(type: string, adapter: WorkspaceAdapter)`. A `WorkspaceAdapter` implements `configure`,
`create`, `remove` and `target`, and a `WorkspaceTarget` is either `{type: "local", directory}` or
`{type: "remote", url, headers}`. Gated by `OPENCODE_EXPERIMENTAL_WORKSPACES`, per the CLI
reference's experimental table. No documentation page describes it — checked `/docs/plugins/`,
`/docs/config/`, `/docs/server/`.

**Logging is not `console.log`.** *"Use `client.app.log()` instead"*, with levels `debug`, `info`,
`warn`, `error`.

**Dependencies** need a `package.json` in the config directory; *"OpenCode runs `bun install` at
startup to install these."*

---

## 3. Every hook key

All twenty-one, from the `Hooks` interface at v1.18.29, grouped by what they can do.

**Lifecycle and registration**

| Key | Signature note |
|---|---|
| `dispose` | `() => Promise<void>` |
| `event` | receives `{ event: Event }` — the bus, §4 |
| `config` | receives the resolved `Config` |
| `tool` | a map of name → `ToolDefinition`; see [`05`](./05-the-tool-registry.md) §6 |
| `auth` | an `AuthHook` — a provider id plus `oauth` and/or `api` methods with typed prompts |
| `provider` | a `ProviderHook` — an id and an optional `models` resolver |

**The request path**

| Key | Can change |
|---|---|
| `chat.message` | the incoming `UserMessage` and its `parts` |
| `chat.params` | `temperature`, `topP`, `topK`, `maxOutputTokens`, `options` |
| `chat.headers` | the outgoing `headers` map |
| `tool.definition` | *"Modify tool definitions (description and parameters) sent to LLM"* — `{ description, parameters }` |

**Execution**

| Key | Can change |
|---|---|
| `permission.ask` | `{ status: "ask" \| "deny" \| "allow" }` — the decision itself |
| `command.execute.before` | the `parts` a slash command expands to |
| `tool.execute.before` | `output.args` — or throw, which blocks the call |
| `tool.execute.after` | `title`, `output`, `metadata` |
| `shell.env` | `output.env` — *"Inject environment variables into all shell execution (AI tools and user terminals)"* |

**Experimental** — all six carry the `experimental.` prefix in the key itself

| Key | Can change |
|---|---|
| `experimental.chat.messages.transform` | the whole `messages` array |
| `experimental.chat.system.transform` | the `system` string array |
| `experimental.provider.small_model` | which model serves as `small_model` |
| `experimental.session.compacting` | `context[]`, or `prompt` to replace the compaction prompt entirely |
| `experimental.compaction.autocontinue` | `enabled` — *"Set to `false` to skip the synthetic user 'continue' turn"* |
| `experimental.text.complete` | the completed `text` of one part |

**Two of these are the enforcement surface.** `permission.ask` returns an action from the same
`allow`/`ask`/`deny` vocabulary the config uses, and `tool.execute.before` blocks by throwing — the
docs' worked example is an `.env` guard that throws on `input.tool === "read"`. Both run in-process,
both are ordinary JavaScript, and a plugin that can register one can register the other.

**Compaction is fully overridable.** `experimental.session.compacting` *"fires before the LLM
generates a continuation summary"*; setting `output.prompt` *"completely replaces the default
compaction prompt"*, and *"The `output.context` array is ignored in this case."*

---

## 4. Events

**Thirty-two types in the SDK's `Event` union** at v1.18.29
(`packages/sdk/js/src/gen/types.gen.ts`), which is what the `event` hook and the server's SSE stream
carry:

| Group | `type` values |
|---|---|
| Server | `server.connected` · `server.instance.disposed` |
| Installation | `installation.updated` · `installation.update-available` |
| LSP | `lsp.client.diagnostics` · `lsp.updated` |
| Message | `message.updated` · `message.removed` · `message.part.updated` · `message.part.removed` |
| Permission | `permission.updated` · `permission.replied` |
| Session | `session.created` · `session.updated` · `session.deleted` · `session.status` · `session.idle` · `session.error` · `session.diff` · `session.compacted` |
| File | `file.edited` · `file.watcher.updated` |
| VCS | `vcs.branch.updated` |
| Todo | `todo.updated` |
| Command | `command.executed` |
| PTY | `pty.created` · `pty.updated` · `pty.exited` · `pty.deleted` |
| TUI | `tui.prompt.append` · `tui.command.execute` · `tui.toast.show` |

**`/docs/plugins#events` lists twenty-eight names in twelve groups, and the two lists differ.** The
page omits `server.instance.disposed`, `installation.update-available`, `vcs.branch.updated` and all
four `pty.*` types. It adds three names that are hook keys rather than members of the union —
`shell.env`, `tool.execute.before`, `tool.execute.after`. And it names `permission.asked`, which the
generated union does not carry: `packages/schema/src/v1/permission.ts` defines
`{ type: "permission.asked" }` and is what the TUI, the ACP bridge and `opencode run` switch on,
while `types.gen.ts` defines `permission.updated`. **Recorded as read at v1.18.29; not adjudicated
here.**

An `OPENCODE_EXPERIMENTAL_EVENT_SYSTEM` flag — *"Enable experimental event system"* — appears in the
CLI reference and on no other page; checked `/docs/plugins/`, `/docs/server/`, `/docs/config/`.

---

## 5. Drift against this profile's source read

The profile records **20** hook keys and *"~25 bus events"*, read at **v1.18.26 on 2026-09-02**. This
document counts **21** hook keys and **32** SDK event types at **v1.18.29 on 2026-09-08**. Both are
reported as read; six days and three releases separate them.
