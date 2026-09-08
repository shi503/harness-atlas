---
status: DRAFT
title: "Extensions — every event, and what each one can do"
tier: reference
project: harness-atlas
source: "earendil-works/pi @ v0.85.1 · packages/coding-agent/docs/extensions.md"
version_at_capture: "v0.85.1"
source_verified: "2026-09-08"
---

# Extensions — every event, and what each one can do

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `DOCS/extensions.md` at **v0.85.1**, **2026-09-08**.

`DOCS/extensions.md` is **3,023 lines** — the largest file in Pi's documentation by a factor of three,
and the only place the extension surface is written down. It opens with a `Lifecycle Overview` ASCII
diagram showing *when* events fire; the diagram does not say *what a handler may return*, and that is
spread across roughly six hundred lines of per-event prose below it. This page is the return contract,
in one table.

---

## 1. The events — 36 named, in eight groups

**"Can"** is what a handler's return value does. `notify` means the return value is ignored.

| Event | Group | Can |
|---|---|---|
| `project_trust` | Startup | **Decide trust.** Returns `{ trusted: "yes" \| "no" \| "undecided", remember? }`. First yes/no wins and suppresses the built-in prompt |
| `resources_discover` | Resource | **Add paths.** Returns `{ skillPaths, promptPaths, themePaths }`. `reason: "startup" \| "reload"` |
| `session_start` | Session | notify. `reason: "startup" \| "reload" \| "new" \| "resume" \| "fork"` |
| `session_info_changed` | Session | notify. Fires on `/name`, RPC, `pi.setSessionName()` |
| `session_before_switch` | Session | **Cancel.** `{ cancel: true }`. `reason: "new" \| "resume"` |
| `session_before_fork` | Session | **Cancel.** `{ cancel: true }`. `position: "before"` for `/fork`, `"at"` for `/clone` |
| `session_before_compact` | Session | **Cancel, or supply the summary.** `{ compaction: { summary, firstKeptEntryId, tokensBefore, usage? } }` |
| `session_compact` | Session | notify |
| `session_compact_failed` | Session | notify. Carries `errorMessage`, `aborted`, `willRetry`, `fromExtension` |
| `session_before_tree` | Session | **Cancel, or supply the branch summary.** `{ summary: { summary, usage?, details } }` |
| `session_tree` | Session | notify |
| `session_shutdown` | Session | notify. `reason: "quit" \| "reload" \| "new" \| "resume" \| "fork"` |
| `before_agent_start` | Agent | **Inject a message, and/or replace the system prompt.** Chained: each handler sees the previous handler's `systemPrompt` |
| `agent_start` | Agent | notify |
| `agent_end` | Agent | notify — *"Pi may still auto-retry, auto-compact and retry, or continue with queued follow-up messages"* |
| `agent_settled` | Agent | notify — the settled signal, *"no retry/compaction/follow-up left"* |
| `ui_prompt_start` | Agent | notify only, *"best-effort and … not awaited"*. `kind: "select" \| "confirm" \| "input" \| "editor" \| "custom"` |
| `ui_prompt_end` | Agent | notify only |
| `turn_start` | Agent | notify |
| `turn_end` | Agent | notify. Carries `message`, `toolResults` |
| `message_start` | Agent | notify |
| `message_update` | Agent | notify — assistant streaming only |
| `message_end` | Agent | **Replace the finalized message.** *"The replacement must keep the same `role`"* |
| `tool_execution_start` | Agent | notify |
| `tool_execution_update` | Agent | notify. Carries `partialResult` |
| `tool_execution_end` | Agent | notify. Carries `result`, `isError` |
| `context` | Agent | **Replace the message array.** `event.messages` is a *"deep copy, safe to modify"* |
| `before_provider_headers` | Agent | **Mutate headers in place.** String adds or overrides; `null` deletes |
| `before_provider_request` | Agent | **Replace the payload.** Chained in load order; `undefined` keeps it |
| `after_provider_response` | Agent | notify. `status` + normalized `headers`, before the stream body is consumed |
| `model_select` | Model | notify. `source: "set" \| "cycle" \| "restore"` |
| `thinking_level_select` | Model | notify — *"handler return values are ignored"* |
| `tool_call` | Tool | **Block, and mutate the input.** `{ block: true, reason?, terminate? }`; `event.input` is mutable in place |
| `tool_result` | Tool | **Patch the result.** Partial patches of `content`, `details`, `isError`, `usage`; chained |
| `user_bash` | User bash | **Intercept `!` / `!!`.** Return `{ operations }` to redirect, or `{ result }` to replace outright |
| `input` | Input | **Intercept.** `{ action: "continue" \| "transform" \| "handled" }`. `source: "interactive" \| "rpc" \| "extension"` |

**Handlers are TypeScript modules, not shell scripts**, and run in the Pi process with its permissions.

---

## 2. The ordering rules, each stated once

These are the parts a reader gets wrong from the lifecycle diagram alone. Each appears exactly once in
`DOCS/extensions.md`.

**Parallel tool execution is the default, and it splits three orders apart.** Sibling tool calls from
one assistant message are *"preflighted sequentially, then executed concurrently."* So:
`tool_execution_start` fires *"in assistant source order during the preflight phase"*;
`tool_execution_update` *"may interleave across tools"*; `tool_execution_end` fires *"in tool completion
order"*; and the final `toolResult` message events are *"still emitted later in assistant source
order."* A handler that assumes one order gets a different one.

**`tool_call` cannot see its siblings.** *"`tool_call` is not guaranteed to see sibling tool results
from that same assistant message in `ctx.sessionManager`."* It *is* guaranteed to see everything up to
and including the current assistant tool-calling message — Pi drains prior agent events first.

**Mutating `tool_call` input skips validation.** *"No re-validation is performed after your mutation."*

**`terminate` is conditional.** *"`terminate` only applies to a blocked call; the agent stops early
only when every finalized result in the batch is terminating."*

**Provider headers fire once, not per attempt.** *"Runs once per provider request; retries reuse the
same headers rather than re-firing the hook."*

**Payload rewrites are invisible to `ctx.getSystemPrompt()`.** `before_provider_request` can rewrite or
remove provider-level system instructions, and *"those payload-level changes are not reflected by
`ctx.getSystemPrompt()`"*, which reports Pi's own string.

**Input resolves in five steps**, and extension commands pre-empt the `input` event entirely:

1. extension commands (`/cmd`) — *"if found, handler runs and input event is skipped"*
2. `input` fires, on **raw** text — `/skill:foo` and `/template` are not yet expanded
3. skill commands expand
4. prompt templates expand
5. agent processing begins at `before_agent_start`

Transforms chain across handlers; the **first** handler returning `handled` wins.

**Session replacement tears down and rebinds.** On `/new`, `/resume`, `/fork`, `/clone`: the
`session_before_*` event fires and can cancel, then `session_shutdown` fires *for the old extension
instance*, then extensions are reloaded and rebound, then `session_start` fires with
`previousSessionFile`, then `resources_discover`. The docs' own instruction: *"Do cleanup work in
`session_shutdown`, then reestablish any in-memory state in `session_start`."* A section titled
*"Session replacement lifecycle and footguns"* covers what breaks otherwise.

**`project_trust` runs before project extensions exist.** *"Only user/global extensions and CLI `-e`
extensions participate; project-local extensions are not loaded until after trust is resolved."* Its
`ctx` is a reduced one — *"cwd, mode, hasUI, and select/confirm/input/notify UI helpers"* — not the
full `ExtensionContext`.

**Errors do not stop the agent.** `DOCS/extensions.md` §Error Handling: extension errors are logged and
the agent continues. The exception is `tool_call`, where an error blocks the tool — the fail-safe
direction.

---

## 3. The API surface, grouped

`pi` is the `ExtensionAPI`; `ctx` is the `ExtensionContext` a handler receives; commands get a wider
`ExtensionCommandContext`. Twenty-six `pi.*` methods, by what they are for:

| Purpose | Methods |
|---|---|
| Events and tools | `on`, `registerTool`, `getActiveTools`, `getAllTools`, `setActiveTools` |
| Sending into the loop | `sendMessage`, `sendUserMessage`, `appendEntry` |
| Session metadata | `setSessionName`, `getSessionName`, `setLabel` |
| Commands and input | `registerCommand`, `getCommands`, `registerShortcut`, `registerFlag` |
| Rendering | `registerMessageRenderer`, `registerEntryRenderer`, `registerMarkdownTransformer` |
| Model | `setModel`, `getThinkingLevel`, `setThinkingLevel` |
| Providers | `registerProvider`, `unregisterProvider` |
| Process and bus | `exec`, `events` |

`ExtensionContext` adds the read side and the controls: `ui`, `mode`, `hasUI`, `cwd`,
`isProjectTrusted()`, `sessionManager`, `modelRegistry` / `model` / `thinkingLevel` / `scopedModels`,
`signal`, `isIdle()` / `abort()` / `hasPendingMessages()`, `shutdown()`, `getContextUsage()`,
`compact()`, `getSystemPrompt()`.

`ExtensionCommandContext` adds session control a handler cannot have: `getSystemPromptOptions()`,
`waitForIdle()`, `newSession()`, `fork(entryId)`, `navigateTree(targetId)`, `switchSession(path)`,
`reload()`.

**`ctx.signal` is the cancellation channel.** Passing it to nested `fetch()` and model calls is what
makes Esc cancel work an extension started.

**Custom tools can override built-ins by name.** Registering a tool named `read` replaces the built-in
`read`. Pluggable operations (`ReadOperations`, `BashOperations`, …) and a bash `spawnHook` let an
extension redirect *where* execution happens without replacing the tool — the mechanism behind
`ssh.ts`, `sandbox/` and `gondolin/`.

---

## 4. Where extensions load from

| Location | Scope |
|---|---|
| `~/.pi/agent/extensions/*.ts` | Global |
| `~/.pi/agent/extensions/*/index.ts` | Global, subdirectory |
| `.pi/extensions/*.ts` | Project — **only after trust** |
| `.pi/extensions/*/index.ts` | Project, subdirectory — **only after trust** |
| `extensions` array in `settings.json` | Paths or directories |
| `packages` array in `settings.json` | npm or git |
| `-e` / `--extension <path\|npm:\|git:>` | One run; `-e npm:…` installs to a temp directory for that run only |

`--no-extensions` disables discovery; combining it with explicit `-e` loads exactly those, ignoring
settings. Full resolution across all five resource types is in
[`03-resources-scope-and-trust.md`](./03-resources-scope-and-trust.md).

**Four packages are bundled for import** and must be `peerDependencies` at `"*"`, never bundled:
`@earendil-works/pi-coding-agent` (types), `typebox` (tool schemas), `@earendil-works/pi-ai`,
`@earendil-works/pi-tui`. Node built-ins are available. Package installs are production installs
(`npm install --omit=dev`), so `devDependencies` are absent at runtime.

---

## 5. The examples tree

`packages/coding-agent/examples/extensions/` held **79 entries** at v0.85.1 — 70 files, one of them
the README, and 9 directories. It is documented twice, with different groupings and different one-line
descriptions: a **67-row** table in `DOCS/extensions.md` §Examples Reference, keyed by API, and grouped
tables in `examples/extensions/README.md`, keyed by purpose. The two lists are not the same length, so
the docs table is not a complete index of the tree. **Eleven entries have no row in it** —
`border-status-editor.ts`, `built-in-tool-renderer.ts`, `commands.ts`, `dynamic-resources/`,
`hidden-thinking-label.ts`, `kimi-deferred-tools.ts`, `minimal-mode.ts`, `rpc-demo.ts`,
`tic-tac-toe.ts`, `titlebar-spinner.ts`, `working-message-test.ts` — eight of which *do* appear in
`examples/extensions/README.md`. Three appear in neither: `border-status-editor.ts`, `commands.ts`,
`working-message-test.ts`.
**Nothing in the tree is installed by default**;
`examples/extensions/README.md` gives `-e` for a single run or a copy into `~/.pi/agent/extensions/`.
The five that supply Pi's refused features are mapped in [`01-the-refusals.md`](./01-the-refusals.md) §2.

**Two directories carry no README** — `sandbox/` and `gondolin/`, each holding only `index.ts`,
`package.json`, a lockfile and `.gitignore`. Checked at v0.85.1: their directory listings, and both
docs tables. Their one-line descriptions are the whole documentation.

---

## 6. What the documentation does not state

- **No total event count is published.** The 36 above were counted from the per-event headings under
  `DOCS/extensions.md` §Events at v0.85.1; the vendor's `Lifecycle Overview` is a diagram and the
  §Events section has no summary table. Checked: `DOCS/extensions.md`, `DOCS/index.md`, `CA/README.md`.
- **No version is given for when an event was added**, in the docs. The per-release record is
  `CA/CHANGELOG.md` — `ui_prompt_start` / `ui_prompt_end` appear there under `0.84.4`.
- **No stated limit on handler count, ordering control, or extension priority.** Ordering is
  *"extension load order"* throughout; how load order is determined across the seven sources in §4 is
  not stated. Checked: `DOCS/extensions.md`, `DOCS/settings.md` §Resources, `DOCS/packages.md`.
