---
status: DRAFT
title: "Hooks — full reference"
tier: reference
project: loomwarp
source: "https://code.claude.com/docs/en/hooks"
source_verified: "2026-08-10"
---

# Hooks — full reference

Hooks are the **deterministic** layer. They fire on their event regardless of what the model decides,
cost zero context unless they return output, and are the only mechanism that turns an instruction
into an enforced boundary.

There are **29 lifecycle events** and **five handler types**.

---

## Events

Cadence: once per session (`SessionStart`, `SessionEnd`), once per turn (`UserPromptSubmit`, `Stop`,
`StopFailure`), or per tool call (`PreToolUse`, `PostToolUse`).

| Event | Fires when |
|---|---|
| `SessionStart` | A session begins or resumes |
| `Setup` | `--init-only`, `--init`, or `--maintenance` in `-p` mode — one-time preparation in CI |
| `UserPromptSubmit` | Before Claude processes a prompt |
| `UserPromptExpansion` | A user-typed command expands into a prompt |
| `PreToolUse` | Before a tool call executes — **can block** |
| `PermissionRequest` | A tool call needs a permission decision |
| `PermissionDenied` | The auto-mode classifier denied a tool call |
| `PostToolUse` | After a tool call succeeds |
| `PostToolUseFailure` | After a tool call fails |
| `PostToolBatch` | After a batch of parallel tool calls resolves, before the next model call |
| `Notification` | Claude Code sends a notification |
| `MessageDisplay` | While assistant message text is displayed |
| `SubagentStart` | A subagent is spawned |
| `SubagentStop` | A subagent finishes |
| `TaskCreated` | A task is created via `TaskCreate` |
| `TaskCompleted` | A task is marked completed |
| `Stop` | Claude finishes responding |
| `StopFailure` | The turn ends due to an API error (output and exit code ignored) |
| `TeammateIdle` | An agent-team teammate is about to go idle |
| `InstructionsLoaded` | A `CLAUDE.md` or `.claude/rules/*.md` file loads into context — at session start **and** on lazy load |
| `ConfigChange` | A configuration file changes mid-session |
| `CwdChanged` | The working directory changes (e.g. Claude runs `cd`) |
| `DirectoryAdded` | A directory is added via `/add-dir` or the SDK `register_repo_root` control request |
| `FileChanged` | A watched file changes on disk — `matcher` names the filenames to watch |
| `WorktreeCreate` | A worktree is being created — **replaces default git behavior** |
| `WorktreeRemove` | A worktree is being removed |
| `PreCompact` | Before context compaction |
| `PostCompact` | After compaction completes |
| `Elicitation` | An MCP server requests user input during a tool call |
| `ElicitationResult` | After a user responds to an elicitation, before the response is sent back |

**LoomWarp note:** `InstructionsLoaded` is the load-bearing event for LoomWarp's context-provenance
thesis. It is the only native surface that reports **which instruction files loaded, when, and why**.
Its matcher values are `session_start`, `nested_traversal`, and `compact`. A hook on this event is
the natural emitter for a per-run context manifest.

---

## Configuration

Three levels of nesting: event → matcher group → handler list.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm *)",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh",
            "args": [],
            "timeout": 600,
            "statusMessage": "Checking..."
          }
        ]
      }
    ]
  }
}
```

### Where hooks can be defined

| Location | Scope | Shareable |
|---|---|---|
| `~/.claude/settings.json` | All projects | No |
| `.claude/settings.json` | Single project | Yes — commit it |
| `.claude/settings.local.json` | Single project, you only | No — gitignored |
| Managed policy settings | Organization-wide | Yes — admin-controlled |
| Plugin `hooks/hooks.json` | Where the plugin is enabled | Yes — bundled |
| Skill or agent frontmatter | While that component is active | Yes — in the component file |

**Hooks merge across all levels.** All matching hooks run in **parallel**. The same handler defined
in multiple settings files runs once; plugin copies stay separate.

Project-level **subagent frontmatter** hooks require accepting the **workspace trust dialog** for the
folder containing the agent file (v2.1.218+). Until trusted, the subagent still runs but its
frontmatter hooks are skipped with an error in the debug log. User-level agents and `--agents`
definitions run without this step.

---

## Matchers

| Matcher value | Evaluated as |
|---|---|
| `"*"`, `""`, omitted | Match all |
| Letters, digits, `_`, `-`, spaces, `,`, `\|` | Exact string or list — `Bash`, `Edit\|Write` |
| Contains any other character | **Unanchored JavaScript regex** — `^Notebook`, `mcp__memory__.*` |

A scoped name containing a colon (`my-plugin:db-agent`) therefore evaluates as a regex — anchor it
as `^my-plugin:db-agent$` to match only that agent. A hyphenated matcher like `db-agent` matches
exactly on v2.1.195+; on earlier versions it also fired for `prod-db-agent`.

### What each event matches on

| Event | Matcher input | Examples |
|---|---|---|
| `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, `PermissionDenied` | Tool name | `Bash`, `Edit\|Write`, `mcp__.*` |
| `SessionStart` | Start method | `startup`, `resume`, `clear`, `compact`, `fork` |
| `Setup` | CLI flag | `init`, `maintenance` |
| `SessionEnd` | End reason | `clear`, `resume`, `logout`, `prompt_input_exit` |
| `Notification` | Notification type | `permission_prompt`, `idle_prompt`, `auth_success` |
| `SubagentStart`, `SubagentStop` | Agent type | `general-purpose`, `Explore`, custom names |
| `PreCompact`, `PostCompact` | Trigger | `manual`, `auto` |
| `ConfigChange` | Config source | `user_settings`, `project_settings`, `policy_settings` |
| `StopFailure` | Error type | `rate_limit`, `overloaded`, `authentication_failed` |
| `InstructionsLoaded` | Load reason | `session_start`, `nested_traversal`, `compact` |
| `UserPromptExpansion` | Command name | Skill/command names |
| `Elicitation`, `ElicitationResult` | MCP server name | Configured server names |
| `CwdChanged`, `UserPromptSubmit`, `PostToolBatch`, `Stop`, `MessageDisplay` | **No matcher support** | — |

MCP tools use `mcp__<server>__<tool>`. Plugin-scoped servers use
`mcp__plugin_<plugin-name>_<server-name>__<tool>` — a matcher written against the bare server key
**never fires**.

---

## Handler types

### 1. `command`

```json
{
  "type": "command",
  "command": "node",
  "args": ["${CLAUDE_PROJECT_DIR}/hooks/check.js", "--fix"],
  "async": false,
  "asyncRewake": false,
  "shell": "bash",
  "if": "Bash(git *)",
  "timeout": 600,
  "statusMessage": "Validating..."
}
```

**Exec form vs shell form.** With `args`, the command is spawned directly — no shell tokenization,
path placeholders are plain strings. **This is the recommended form when using path placeholders.**
Without `args`, shell tokenization applies and you get pipes, `&&`, redirects, and globs.

- `async: true` — runs in the background without blocking.
- `asyncRewake: true` — runs in the background and **wakes Claude on exit code 2 only**. stdout and
  stderr surface as a system reminder.

### 2. `http`

```json
{
  "type": "http",
  "url": "http://localhost:8080/hooks/pre-tool-use",
  "headers": { "Authorization": "Bearer $MY_TOKEN" },
  "allowedEnvVars": ["MY_TOKEN"],
  "timeout": 600
}
```

The event JSON is POSTed. Response handling: 2xx empty = success; 2xx plain text = success, text
added as context; 2xx JSON = parsed as a decision; **non-2xx = non-blocking error, the action
continues**.

### 3. `mcp_tool`

```json
{
  "type": "mcp_tool",
  "server": "my_server",
  "tool": "security_scan",
  "input": { "file_path": "${tool_input.file_path}" }
}
```

`${path}` substitution pulls from the hook's JSON input. For a plugin's own bundled server, `server`
takes the scoped form `plugin:<plugin-name>:<server-name>`.

### 4. `prompt`

```json
{
  "type": "prompt",
  "prompt": "Is this command safe to run? The command is: $ARGUMENTS",
  "model": "claude-opus-4-1-20250805",
  "timeout": 30
}
```

`$ARGUMENTS` is the hook input JSON. Defaults to a fast model.

### 5. `agent`

```json
{
  "type": "agent",
  "prompt": "Verify this is a safe operation. Details: $ARGUMENTS",
  "timeout": 60
}
```

The subagent can use Read, Grep, and Glob before returning a decision. This is the "agentic verifier"
handler — an LLM-judge gate as a first-class harness primitive.

### Common fields

| Field | Notes |
|---|---|
| `type` | Required |
| `if` | Permission-rule filter, tool events only — `"Bash(git *)"`, `"Edit(*.ts)"` |
| `timeout` | Seconds. Defaults: 600 (command/http/mcp_tool), 30 (prompt), 60 (agent). Per-event: `UserPromptSubmit` 30s, `MessageDisplay` 10s, `SessionEnd` shares a 1.5s budget raised to 60s max |
| `statusMessage` | Custom spinner text |
| `once` | Skill frontmatter only — run once per session, then remove |

**Bash `if` matching is shell-aware.** It checks subcommands, `$()`, and backticks, and strips
leading `VAR=value` assignments. `Bash(rm *)` matches `echo $(rm -rf /)`. Parse failures **fail
open** — the hook runs anyway.

---

## Input

Every event receives:

```json
{
  "session_id": "abc123",
  "prompt_id": "550e8400-e29b-41d4-a716-446655440000",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/current/working/directory",
  "permission_mode": "default|plan|acceptEdits|auto|dontAsk|bypassPermissions",
  "hook_event_name": "PreToolUse",
  "effort": { "level": "low|medium|high|xhigh|max" }
}
```

Inside a subagent, add `agent_id` and `agent_type`. Tool events add `tool_name`, `tool_input`, and
`tool_use_id`.

---

## Output — exit codes

| Exit code | Meaning |
|---|---|
| `0` | Success. **stdout is parsed for JSON on this code only** |
| `2` | Blocking error. stderr is fed to Claude as the reason; JSON is ignored |
| Other | Non-blocking error. Action proceeds; stderr shown with an error notice |

### Where exit code 2 actually blocks

| Blocks | Effect |
|---|---|
| `PreToolUse` | Blocks the tool call |
| `PermissionRequest` | Denies permission |
| `UserPromptSubmit` | Blocks the prompt and erases it |
| `UserPromptExpansion` | Blocks the expansion |
| `Stop` / `SubagentStop` | Prevents stopping; work continues |
| `TeammateIdle` | Prevents idle; teammate keeps working |
| `TaskCreated` | Rolls back task creation |
| `TaskCompleted` | Prevents completion |
| `ConfigChange` | Blocks the change (not policy settings) |
| `PostToolBatch` | Stops the agentic loop before the next model call |
| `PreCompact` | Blocks compaction |
| `Elicitation` / `ElicitationResult` | Denies / blocks the response |
| `WorktreeCreate` | Any non-zero exit fails creation |

Non-blocking: `PostToolUse`, `PostToolUseFailure`, `PermissionDenied` (code ignored), `Notification`,
`StopFailure` (output and code ignored), and the rest.

**LoomWarp note:** `TaskCreated`, `TaskCompleted`, and `TeammateIdle` are quality gates on the agent-
team task list — exit 2 to reject a task marked complete that has not met its acceptance criteria,
and send feedback back to the agent. This is the "handoff gate" LoomWarp's evaluation doctrine
describes, available natively.

---

## Output — JSON

Must exit 0. Universal fields:

| Field | Default | Effect |
|---|---|---|
| `continue` | `true` | `false` stops Claude entirely |
| `stopReason` | — | Message shown when `continue: false` |
| `suppressOutput` | `false` | Hide stdout from the transcript (still in the debug log) |
| `systemMessage` | — | Warning shown to the user |
| `terminalSequence` | — | OSC 0/1/2/9/99/777 or BEL escape sequence |
| `hookSpecificOutput` | — | Event-specific structured output |
| `additionalContext` | — | Context string for Claude, inside `hookSpecificOutput` |

`additionalContext` lands at: the start of the conversation (`SessionStart`, `Setup`,
`SubagentStart`), alongside the prompt (`UserPromptSubmit`, `UserPromptExpansion`), next to the tool
result (`PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`), or at end of turn
(`Stop`, `SubagentStop`).

### Decision protocols

**Top-level `decision`** — for `UserPromptSubmit`, `UserPromptExpansion`, `PostToolUse`,
`PostToolUseFailure`, `PostToolBatch`, `Stop`, `SubagentStop`, `ConfigChange`, `PreCompact`:

```json
{ "decision": "block", "reason": "Deployment target is production; manual approval required" }
```

**`PreToolUse` permission decision** — the enforcement point:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny|allow|ask|defer",
    "permissionDecisionReason": "Database writes blocked by policy"
  }
}
```

It can also **rewrite the tool input**:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "allow",
    "updatedInput": { "command": "npm run lint" }
  }
}
```

**`PostToolUse` result rewriting** — redaction before Claude reads the output:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "updatedToolOutput": "Redacted output for security"
  }
}
```

Other event-specific shapes: `PermissionRequest` → `decision: {behavior, updatedInput}`;
`PermissionDenied` → `{retry: true}`; `MessageDisplay` → `displayContent` (transcript unchanged);
`Elicitation`/`ElicitationResult` → `{action, content}`; `WorktreeCreate` → print the path to stdout,
or `worktreePath` for HTTP hooks.

### Critical interaction with permission rules

Hook decisions **do not bypass permission rules**:

- A matching **deny** rule blocks the call regardless of what the hook returned.
- A matching **ask** rule still prompts, even when the hook returned `"allow"`.
- But a hook that **exits 2** stops the call *before* rules are evaluated — so it beats allow rules.

The documented pattern for "allow everything except a specific list": put `"Bash"` in the allow list
and register a `PreToolUse` hook that rejects the specific commands.

---

## Path placeholders

| Placeholder | Meaning |
|---|---|
| `${CLAUDE_PROJECT_DIR}` | Project root. Also set in the environment of stdio MCP servers and plugin LSP servers |
| `${CLAUDE_PLUGIN_ROOT}` | Plugin install directory — **changes on plugin update** |
| `${CLAUDE_PLUGIN_DATA}` | Plugin persistent data directory — **survives plugin updates** |

Also exported as environment variables on spawned processes, along with `$CLAUDE_CODE_REMOTE`
(`"true"` in web environments), `$CLAUDE_CODE_BRIDGE_SESSION_ID` (Remote Control, v2.1.199+),
`$CLAUDE_EFFORT`, and for plugins `$CLAUDE_PLUGIN_OPTION_<KEY>`. `OTEL_*` exporter variables are
**removed** from all hook subprocesses.

---

## Execution environment

Hooks run in the current working directory, with Claude Code's environment, and **without a
controlling terminal** (macOS/Linux v2.1.139+) — they cannot access `/dev/tty` or write escape
sequences directly. Use `terminalSequence` for notifications.

---

## Enterprise controls

| Setting | Effect |
|---|---|
| `allowManagedHooksOnly` | Blocks user, project, and plugin hooks. Plugins force-enabled in managed `enabledPlugins` are exempt |
| `allowedHttpHookUrls` | URL allowlist for HTTP hook handlers. Supports `*`. Undefined = unrestricted, `[]` = block all. **Arrays merge** |
| `httpHookAllowedEnvVars` | Environment variables permitted in HTTP headers |
| `disableAllHooks` | Disables all hooks **except managed policy hooks**, and the custom status line |

---

## Inspecting hooks

`/hooks` opens a read-only browser: every event with its hook count, drill into matchers and handler
details, labeled by source (User Settings, Project Settings, Local Settings, Plugin Hooks, Session
Hooks, Built-in Hooks). Claude Code records which hooks matched, their exit codes, and their output
in the debug log — `claude --debug`.

---

## Worked example — block destructive Bash

`.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm *)",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-rm.sh",
            "args": []
          }
        ]
      }
    ]
  }
}
```

`.claude/hooks/block-rm.sh` (must be `chmod +x`, or the hook fails instead of blocking):

```bash
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command')

if echo "$COMMAND" | grep -q 'rm -rf'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "Destructive command blocked by hook"
    }
  }'
else
  exit 0   # no decision; normal permission flow applies
fi
```

On Windows, write the script in PowerShell and add `"shell": "powershell"` to the hook entry.

---

## LoomWarp notes

- **The five handler types collapse a design LoomWarp had planned to build.** `type: agent` is an
  agentic verifier with tool access; `type: prompt` is a cheap LLM judge; `type: http` is a policy
  service call; `type: mcp_tool` routes into an existing server. The eval pyramid's "deterministic
  check → model judge → escalate" is expressible entirely in hook config.
- **`PostToolUse` `updatedToolOutput` is a redaction point.** Any evidence-bundle work that must not
  leak secrets into a transcript has a native place to sit.
- **`SubagentStart` / `SubagentStop` with an agent-type matcher is the right emitter for LoomWarp's
  PULSE and HANDOFF events**, replacing filesystem-convention discovery. This directly addresses
  ISSUE-001 (HANDOFF path resolution) and GAP-18 (terminal state derived from markdown parsing) —
  the state becomes observed at the event, not inferred from a file.
- **`allowManagedHooksOnly` plus `enabledPlugins` is the enforcement story** for a control repo that
  wants its policy hooks to be non-negotiable in sibling repos.
