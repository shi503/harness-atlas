---
status: DRAFT
title: "Grok Build — hooks, the fifteen lifecycle events"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — user-guide 10, docs/custom-hooks.md, docs/hooks-and-plugins.md"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — hooks, the fifteen lifecycle events

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Grok Bot ships no user-authored hooks** — its
pre-action check is a model-based Auto Review rule, which is policy rather than a script; see
[`11`](./11-bot-approvals-security-and-teams.md) §2.

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

*"A hook is a shell command or HTTP endpoint that Grok calls when a specific lifecycle event occurs."*

---

## 1. The fifteen events

Three cadences: *"once per session (`SessionStart`, `SessionEnd`), once per turn (`UserPromptSubmit`,
`Stop`, `StopFailure`), and on every tool call inside the turn (`PreToolUse`, `PostToolUse`,
`PostToolUseFailure`)."*

| Event | When it fires | Blocking? |
|---|---|:-:|
| `SessionStart` | A session starts. **Does not fire for a subagent's own session** | no |
| `UserPromptSubmit` | You submit a prompt | **yes** — can block the prompt |
| `PreToolUse` | A tool is about to run | **yes** — can deny |
| `PostToolUse` | A tool finishes, including a built-in logical error such as a non-zero `run_terminal_command` exit | no, but can replace the output the model sees |
| `PostToolUseFailure` | A tool fails to dispatch, or an MCP tool returns an error result | no, but can feed `additionalContext` |
| `PermissionDenied` | The permission system denies a tool call | no |
| `Stop` | A turn ends on a genuine completion | **yes** — can block the stop |
| `StopFailure` | A turn ends because of an API error | no |
| `StopCancelled` | Runs **instead of** `Stop` when a turn ends without completing | no |
| `Notification` | User-attention events (`idle_prompt`, `permission_prompt`, `task_complete`, …) | no |
| `SubagentStart` | A subagent starts | no |
| `SubagentStop` | A subagent's turn ends, once, in the subagent | **yes** — can block the stop |
| `PreCompact` | Compaction is about to run | no |
| `PostCompact` | Compaction completes | no |
| `SessionEnd` | The session ends. Carries `subagentType` for a child session | no |

`SubagentEnd` is an accepted alias for `SubagentStop`. **Everything not marked blocking is passive:**
*"its output is recorded but does not change control flow."*

**`Stop` and `StopCancelled` are exclusive**, and the distinction is where most porting errors live.
`StopCancelled` fires on *"a user interrupt (Ctrl+C / Esc / a client stop), a declined permission
prompt, the `--max-turns` limit, or a no-progress bail-out."* A gate written only on `Stop` never sees
any of those.

---

## 2. Where hooks come from

Ten sources, all merged.

| Scope | Path | Trusted? |
|---|---|---|
| Global | `~/.grok/hooks/*.json` | always |
| Global | `~/.claude/settings.json` (and `settings.local.json`) | always — configurable compat |
| Global | `~/.cursor/hooks.json` | always — configurable compat |
| Project | `<project>/.grok/hooks/*.json` | **requires trust** |
| Project | `<project>/.claude/settings.json` (and `settings.local.json`) | **requires trust** — configurable compat |
| Project | `<project>/.cursor/hooks.json` | **requires trust** — configurable compat |
| Config | `~/.grok/config.toml` | always |
| Config | `managed_config.toml` (`$GROK_HOME` and `/etc/grok`) | always |
| Config | `requirements.toml` (user and system) | always |
| Plugin | bundled inside installed plugins | per-plugin |

**Folder trust is unified and coarse.** *"The first time you open a project with hooks, you must trust
it before its project hooks will run; until then they are silently skipped."* Trust is granted with
`/hooks-trust` or `--trust`, recorded in `~/.grok/trusted_folders.toml`. A grant *"trusts the whole
folder for **MCP, LSP, hooks, project instructions, and project skills** together, and covers
subdirectories of the same repository. A nested git checkout under that folder is a separate workspace
and is not covered."* Disabling folder trust (`GROK_FOLDER_TRUST=0` or `[folder_trust] enabled =
false`) *"ungates those surfaces together."*

**Silently skipped is the operative phrase.** An untrusted project hook is not an error and not a
block. Enforcement that depends on a project hook has no signal when the folder was never trusted.

### Hooks in TOML

The same `hooks` object is read from `config.toml`, `managed_config.toml` and `requirements.toml`.
*"The TOML is structurally identical to the JSON hook object, so an existing hook transliterates
directly."*

```toml
[[hooks.PreToolUse]]
matcher = "Bash|Write|Edit"
hooks = [
  { type = "command", command = "/opt/guard/pretooluse.sh", timeout = 10 },
]
```

Three properties of the config-file form:

- **Additive across layers.** *"Every layer's hooks run; a lower-priority layer adds hooks but never
  replaces another layer's block."* Identical hooks are deduplicated, *"keeping the highest-authority
  copy."*
- **Provenance labels.** `/hooks` tags each by origin — `managed:`, `requirements/user:`, `user:`.
- **No read-time expansion.** *"A literal `${VAR}` in a `command` or `url` reaches the hook runner
  unchanged… the runner performs the single expansion."*

---

## 3. Matchers

`matcher` is a regular expression, and **what it tests depends on the event**:

| Event class | The matcher tests |
|---|---|
| `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionDenied` | the tool name |
| `Notification` | the notification type |
| `SubagentStart`, `SubagentStop` | the subagent type (e.g. `explore`) |
| `SessionStart` | the start source (`startup`, `resume`, …) |
| `SessionEnd` | the end reason |
| `PreCompact`, `PostCompact` | the compaction trigger (`manual` or `auto`) |
| `StopFailure` | one of six error types: `rate_limit`, `authentication_failed`, `invalid_request`, `server_error`, `max_output_tokens`, `unknown` |
| `StopCancelled` | one of six reasons: `user_interrupt`, `permission_rejected`, `permission_cancelled`, `max_turns`, `no_progress`, `unknown` |
| `Stop`, `UserPromptSubmit` | nothing — *"A matcher on `Stop` or `UserPromptSubmit` is ignored with a warning (those events always fire)"* |

**Two matcher traps, both stated.** MCP calls routed through the internal `use_tool` dispatcher
*"appear as the qualified `server__tool` name (e.g. `linear__save_issue`), so match on that, not the
dispatcher name."* And on `Notification`, `idle_prompt` fires on *"any turn end, then sustained idle"*
while `permission_prompt` *"fires only when a permission UI is actually waiting."*

Claude-style tool names are aliased onto native ones inside a matcher —
[`01`](./01-build-harness-compatibility.md) §3.

---

## 4. Resolution, in four steps

Verbatim structure from UG/10 §How a Hook Resolves:

1. **Select matching groups.** Every group whose `matcher` matches runs; an empty or omitted matcher
   matches everything.
2. **Run the handlers in order**, each receiving the event as JSON on stdin, *"until one returns
   `deny` (which stops the chain)."* Handlers from different sources are merged and identical ones
   deduplicated. **Every handler sees the model's original tool input**: *"a `PreToolUse`
   `updatedInput` is applied only after all handlers finish, so one handler cannot see another's
   rewrite (the last rewrite wins)."*
3. **Apply the decision.** First `deny` blocks a `PreToolUse`; `block` on `Stop`/`SubagentStop` keeps
   the agent working; on `PostToolUse` *"the tool has already run, so nothing is blocked and every
   hook runs."*
4. **Fail open.** *"A handler that times out, crashes, or emits malformed output is recorded in the
   scrollback but never blocks the action."*

**The one exception to fail-open** is a `PreToolUse` `updatedInput` that fails the tool's schema:
*"the rewrite cannot run safely, so the call is blocked and reported as an invalid-input error."*

**Timeouts:** default 5 seconds, *"or 600 for `Stop`/`SubagentStop`/`PostToolUse` gates."* SDK-registered
`PreToolUse` client gates default to 30 seconds; either is overridable per matcher group via
`timeoutS`, *"capped at 600."*

---

## 5. The decision vocabulary

For `PreToolUse`, written as JSON on stdout:

| Intent | Form |
|---|---|
| Allow | `{"decision": "allow"}` |
| Deny | `{"decision": "deny", "reason": "…"}` |
| Ask the user | `{"decision": "ask", "reason": "…"}` |
| No opinion | `{"decision": "defer"}` |
| Rewrite the input | `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "updatedInput": {…}}}` |
| Tell the model something | `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": "…"}}` |

*"The decision can be written as top-level `decision` or as `hookSpecificOutput.permissionDecision`…
The canonical `permissionDecision` decides when present; the top-level `decision` applies only when it
is absent."* Legacy `approve` and `block` spellings work. A value outside the set *"is a hook failure,
which fails open unless the hook also exits 2, in which case the deny stands."*

**`allow` is weaker than it reads.** *"An `allow` means only 'not blocked' — it does not auto-approve a
call the user would otherwise be asked about."*

**`ask` is the sharpest primitive here, and it has an exact ceiling.** It forces the permission prompt,
overriding *"always-approve mode, auto mode, a saved 'always allow' grant, a safe command."* There is
never a second prompt — *"where you would have been asked anyway, the ask only re-labels that one."*
But:

- *"An `ask` cannot widen anything"* — a policy deny, an auto-mode block, or plan mode still decides.
- Under `dontAsk`, *"an ask turns an otherwise-approved call into a denial."*
- A client blanket-approving every prompt still approves it: the ask *"overrides the manager's
  always-approve, auto, saved-grant, and safe-command paths, not a client that blanket-approves every
  prompt."*

**And it is unavailable to one class of hook.** *"Only hooks configured in a settings file (command and
HTTP hooks) can ask, defer, or send `additionalContext`: a `PreToolUse` hook registered through the
grok-agent-sdk can allow or deny, and the rest is dropped."*

### `UserPromptSubmit`

Exit 2 or `{"decision": "block", "reason": …}` rejects the prompt. *"The reason is shown to you and is
never added to the model's context."* Only a typed prompt can be blocked — *"auto-wake turns (task and
subagent completions, scheduler fires) and subagent sessions run the hook observe-only."* Default
timeout 30 seconds; a timeout fails open and the prompt proceeds.

**A blocked prompt leaves almost no trace.** *"It never enters the conversation history the model sees
on later turns, the on-disk session record, or the session summary… after a session restart the
blocked bubble is gone from the scrollback, exactly because nothing was stored."* One exception:
*"your client's local prompt history (the up-arrow recall) keeps the text, recorded at submit time
before the hook runs."*

### Stop gates

*"The hook fires again after each continuation, and the built-in cap ends the turn after 8"* — check
`stopHookActive` to give up earlier. Inside a subagent the gate fires as `SubagentStop`; *"agent-
frontmatter `Stop` hooks are automatically remapped"*, and *"a `Stop` hook only gates the main agent."*

---

## 6. The environment a hook runs in

**Reserved, always injected:** `GROK_HOOK_EVENT`, `GROK_HOOK_NAME`, `GROK_SESSION_ID`,
`GROK_WORKSPACE_ROOT`, and `CLAUDE_PROJECT_DIR` (an alias for the last). *"Any values you attempt to
set for them via the `env` field in your hook JSON are stripped at load time (a warning is logged), and
the runner always injects the real values at spawn time."*

**Plugin hooks additionally get** `GROK_PLUGIN_ROOT` and `GROK_PLUGIN_DATA` (plus Claude aliases);
*"the plugin adapter ensures the official plugin values always win over any user-declared values."*

**Common stdin fields on every event:** `hookEventName`, `sessionId`, `cwd`, `workspaceRoot`,
`timestamp`, `permissionMode` (`default`, `auto`, `plan`, `bypassPermissions`), `promptId` (*"absent
for session-scoped events"*), plus `toolUseId` and `toolInputTruncated`. The two event-name keys carry
different spellings of the same fact — see [`01`](./01-build-harness-compatibility.md) §4.

---

## 7. What is not documented

- **No cap on how many hooks may be registered.** Checked UG/10 in full, UG/26 §`hooks`,
  `docs/custom-hooks.md`, `docs/hooks-and-plugins.md`.
- **No hook signing or integrity check.** Trust is folder-scoped and binary; nothing verifies the
  script's contents. Checked UG/10, UG/22, UG/09 §Trust and security.
- **No threat-model statement** for the hook surface. The nearest thing is the stated fail-open
  behaviour and the sandbox write-deny in [`04`](./04-build-permissions-and-sandbox.md) §4. Checked
  UG/10, UG/18, UG/22, `SECURITY.md`.
