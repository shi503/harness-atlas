---
status: DRAFT
title: "Subagents — full reference"
tier: reference
project: harness-atlas
source: "https://code.claude.com/docs/en/sub-agents"
source_verified: "2026-08-10"
---

# Subagents — full reference

> **Drafted 2026-08-10 by `claude-opus-5`, not yet verified.** Attested, not captured — see [`00-README.md`](./00-README.md).

A subagent is a specialized worker with its own context window, system prompt, tool access, and
permissions. It works independently and returns a summary. Subagents work **within a single
session**; for independent sessions see `05-multi-agent-orchestration.md`.

They buy you five things: context preservation, tool-access constraints, reusable configuration,
specialized behavior, and cost control by routing to cheaper models.

---

## Built-in subagents

| Agent | Model | Tools | Purpose |
|---|---|---|---|
| `Explore` | Inherits, **capped at Opus** on the Claude API | Read-only; Write and Edit denied | File discovery, code search |
| `Plan` | Inherits | Read-only; Write and Edit denied | Codebase research during plan mode |
| `general-purpose` | Inherits | Every tool available to subagents | Complex multi-step work |
| `claude` | Inherits | Every tool available to subagents | Catch-all; the default agent for a dispatched background session |
| `statusline-setup` | Sonnet | — | `/statusline` |
| `claude-code-guide` | Haiku | — | Questions about Claude Code features |

**`Explore` and `Plan` skip your CLAUDE.md files and the parent session's git status** to keep
research fast and cheap. Every other built-in and every custom subagent loads both. There is no
frontmatter field to change this.

As of v2.1.198 `Explore` inherits the main conversation's model rather than always running Haiku. To
force it cheap, define a user or project subagent named `Explore` with `model: haiku` — it overrides
the built-in and keeps its own `model` field.

Restricting built-ins:

- Block one type: `permissions.deny: ["Agent(Explore)"]`
- Block all delegation: deny the `Agent` tool itself
- Remove only `Explore` and `Plan`: `CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS=1` (v2.1.198+)
- Non-interactive / SDK: `CLAUDE_AGENT_SDK_DISABLE_BUILTIN_AGENTS=1` removes all built-ins

---

## Scope and precedence

| Location | Scope | Priority |
|---|---|---|
| Managed settings `.claude/agents/` | Organization-wide | 1 (highest) |
| `--agents` CLI flag (JSON) | Current session | 2 |
| `.claude/agents/` | Current project | 3 |
| `~/.claude/agents/` | All your projects | 4 |
| Plugin `agents/` | Where the plugin is enabled | 5 (lowest) |

Note this is the **opposite** of skills, where personal beats project.

- Project subagents are discovered by walking up from the cwd; every `.claude/agents/` between there
  and the repo root is scanned. Where nested directories define the same `name`, the definition
  **closest to the working directory** wins (v2.1.178+).
- `--add-dir` directories are scanned too.
- Directories are scanned **recursively**; subfolders do not affect identity for project and user
  scopes — identity comes only from the `name` field. **Keep names unique across the whole tree**:
  duplicates in the same directory load only one, chosen by filesystem read order. `/doctor` reports
  these.
- Plugin `agents/` subfolders **do** become part of the scoped identifier:
  `agents/review/security.md` in `my-plugin` registers as `my-plugin:review:security`.
- Claude Code watches `~/.claude/agents/` and `.claude/agents/` and picks up edits within seconds, no
  restart. Two exceptions: creating a scope's **first** agent file in a new directory, and sessions
  started with `--disable-slash-commands`.

### `/agents` no longer creates agents

As of v2.1.198, `/agents` prints a reminder to ask Claude or edit `.claude/agents/` directly. The
files, frontmatter, and locations are unchanged; only the terminal wizard was removed. `/agents` is
also a different thing from `claude agents` (agent view).

---

## Frontmatter reference

Only `name` and `description` are required. Note the casing: subagent fields are **camelCase**
(`disallowedTools`), unlike skills' kebab-case.

| Field | Description |
|---|---|
| `name` | Lowercase letters and hyphens. Hooks receive it as `agent_type`. The filename need not match. **Cannot contain `:`** — reserved for plugin-scoped identifiers; such a file is not loaded (v2.1.218+) |
| `description` | When Claude should delegate to this subagent |
| `tools` | Allowlist. Inherits everything available to subagents if omitted. If nothing in the list resolves, the subagent usually **fails to launch** with an error naming the entries. To preload skills use `skills`, not `Skill` here |
| `disallowedTools` | Denylist, removed from the inherited or specified list |
| `model` | `sonnet` \| `opus` \| `haiku` \| `fable` \| full ID (`claude-opus-5`) \| `inherit`. Default `inherit` |
| `permissionMode` | `default` \| `acceptEdits` \| `auto` \| `dontAsk` \| `bypassPermissions` \| `plan` \| `manual` (alias for `default`, v2.1.200+). **Ignored for plugin subagents** |
| `maxTurns` | Maximum agentic turns before the subagent stops |
| `skills` | Skills to **preload** — full content injected at startup, not just descriptions |
| `mcpServers` | MCP servers for this subagent. Either a name referencing a configured server, or an inline definition. **Ignored for plugin subagents** |
| `hooks` | Lifecycle hooks scoped to this subagent. **Ignored for plugin subagents** |
| `memory` | `user` \| `project` \| `local` — persistent cross-session memory directory |
| `background` | `true` = always run as a background task. Unset = Claude chooses; as of v2.1.198 background is the default |
| `effort` | `low` \| `medium` \| `high` \| `xhigh` \| `max` |
| `isolation` | `worktree` — run in a temporary git worktree branched from your **default branch**, not the parent's `HEAD`. Auto-cleaned if the subagent makes no changes |
| `color` | `red` \| `blue` \| `green` \| `yellow` \| `purple` \| `orange` \| `pink` \| `cyan` |
| `initialPrompt` | Auto-submitted as the first user turn when the agent runs as the **main** session (`--agent` or the `agent` setting). Commands and skills are processed. Prepended to any user prompt |

> **Plugin subagents cannot use `hooks`, `mcpServers`, or `permissionMode`** — for security reasons
> these are ignored when loading from a plugin. If you need them, copy the file into
> `.claude/agents/` or `~/.claude/agents/`.

### Defining subagents on the CLI

```bash
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  }
}'
```

Accepts the same fields, with `prompt` in place of the markdown body. These exist only for that
session and are never written to disk.

---

## Tool availability — two filters

Subagents inherit built-in and MCP tools from the main conversation, then **two filters** apply.
Forks skip both and receive the main conversation's exact tool pool.

**Filter 1 — removed from every subagent**, even if listed in `tools`:
`Agent` (at the depth limit), `AskUserQuestion`, `EndConversation`, `EnterPlanMode`, `ExitPlanMode`
(unless `permissionMode: plan`), `ScheduleWakeup`, `TaskOutput`, `WaitForMcpServers`, `Workflow`.

**Filter 2 — background subagents** (the default) keep every MCP tool but only these built-ins:
`Read`, `Grep`, `Glob`, `Bash`, `PowerShell`, `Edit`, `Write`, `NotebookEdit`, `WebFetch`,
`WebSearch`, `TodoWrite`, `Skill`, `ToolSearch`, `EnterWorktree`, `ExitWorktree`, `Monitor`,
`TaskStop`, `SendMessage`, `Artifact`.

> **The same definition resolves to different tools in the foreground and the background.** The
> removal is silent unless it leaves `tools` resolving to nothing. This is a real source of confusing
> behavior — a subagent that works when Claude runs it in the foreground can lose a tool when the
> same definition runs in the background.

Agent-team teammates additionally keep the task and cron tools: `TaskCreate`, `TaskGet`, `TaskList`,
`TaskUpdate`, `CronCreate`, `CronDelete`, `CronList`.

If both `tools` and `disallowedTools` are set, `disallowedTools` applies **first**, then `tools`
resolves against what remains. A tool in both is removed.

Both fields accept MCP server-level patterns: `mcp__<server>` or `mcp__<server>__*`. In
`disallowedTools`, `mcp__*` removes every MCP tool from every server.

### Restricting which subagents can be spawned

```yaml
tools: Agent(worker, researcher), Read, Bash   # allowlist
tools: Agent, Read, Bash                       # any subagent
# omitting Agent entirely: cannot spawn subagents
```

The `Agent(type, type)` allowlist **only applies to an agent running as the main thread** via
`claude --agent`. Inside a subagent definition, listing `Agent` permits nesting but the type list in
parentheses is ignored.

---

## Permission modes

| Mode | Behavior |
|---|---|
| `default` | Standard checking with prompts |
| `acceptEdits` | Auto-accept file edits and common filesystem commands in the working directory or `additionalDirectories` |
| `auto` | A background classifier reviews commands and protected-directory writes |
| `dontAsk` | Auto-deny prompts. Explicitly allowed tools still work |
| `bypassPermissions` | Skip prompts |
| `plan` | Read-only exploration |

**Parent precedence.** If the parent uses `bypassPermissions` or `acceptEdits`, that takes precedence
and cannot be overridden. If the parent uses **auto mode**, the subagent inherits auto mode and its
own `permissionMode` is **ignored** — the classifier evaluates its calls with the parent's rules.

Even `bypassPermissions` still prompts for: explicit `ask` rules, connector tools your org set to
`ask`, MCP tools marked `requiresUserInteraction`, root/home removals such as `rm -rf /`, and the
`isolatePeerMachines` approval.

---

## Scoping MCP servers to a subagent

```yaml
---
name: browser-tester
description: Tests features in a real browser using Playwright
mcpServers:
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
  - github        # reference an already-configured server
---
```

Inline definitions use the `.mcp.json` schema and support `stdio`, `http`, `sse`, and `ws`. **Inline
servers connect when the subagent starts and disconnect when it finishes**; string references share
the parent session's connection.

This is the documented way to keep an MCP server's tool descriptions out of the main conversation's
context entirely — define it inline on the subagent rather than in `.mcp.json`.

MCP restrictions that apply to the main session also cover subagent frontmatter (v2.1.153+):
`--strict-mcp-config`, `--bare`, enterprise managed MCP config, and the
`allowedMcpServers`/`deniedMcpServers` policies. Blocked servers are skipped with a warning.

---

## Preloading skills

```yaml
---
name: api-developer
description: Implement API endpoints following team conventions
skills:
  - api-conventions
  - error-handling-patterns
---
```

The **full content** of each listed skill is injected at startup. This controls what is *preloaded*,
not what is *accessible* — without it, the subagent can still discover and invoke project, user, and
plugin skills via the Skill tool. To block that, omit `Skill` from `tools` or add it to
`disallowedTools`.

You **cannot** preload a skill with `disable-model-invocation: true`, including the bundled
`/verify` and `/code-review`. Missing or disabled skills are skipped with a debug-log warning.

---

## Persistent memory

```yaml
memory: user     # or project, or local
```

| Scope | Location | Use when |
|---|---|---|
| `user` | `~/.claude/agent-memory/<agent-name>/` | Learnings apply across all projects |
| `project` | `.claude/agent-memory/<agent-name>/` | Project-specific and shareable via version control |
| `local` | `.claude/agent-memory-local/<agent-name>/` | Project-specific, not checked in |

`project` is the documented recommended default. When enabled, the subagent's system prompt gains
memory read/write instructions plus the first **200 lines or 25KB** of `MEMORY.md` in that directory,
and Read/Write/Edit are automatically enabled.

Subagent memory is part of auto memory: turning auto memory off (`autoMemoryEnabled: false` or
`CLAUDE_CODE_DISABLE_AUTO_MEMORY`) makes the `memory` field a no-op.

---

## What loads at startup

A **non-fork** subagent's initial context:

- **System prompt** — the agent's own prompt plus environment details, *not* the full Claude Code
  system prompt.
- **Task message** — the delegation prompt Claude writes.
- **CLAUDE.md files** — every level the main conversation loads, including `~/.claude/CLAUDE.md`,
  project rules, `CLAUDE.local.md`, and managed policy files. `Explore` and `Plan` skip this.
- **Git status** — a snapshot from the start of the parent session. Absent outside a git repo or
  when `includeGitInstructions` is `false`. `Explore` and `Plan` skip it.
- **Preloaded skills** — full content of anything in `skills`.
- **Sibling roster** (v2.1.206+) — a system reminder listing `main` and every other *named* agent,
  each a valid `to` for `SendMessage`. Appears only when the subagent's tools include `SendMessage`
  and at least one other agent has a name. It is a snapshot taken at start.

What **never** reaches a non-fork subagent: your output style, the main conversation's auto memory,
and the parent's context-window size (a subagent's window is sized by its own model).

`--append-subagent-system-prompt` (v2.1.205+, non-interactive) appends text to the end of **every**
subagent's system prompt, including nested ones.

---

## Foreground vs background

As of v2.1.198 subagents run in the **background by default**; Claude runs one in the foreground when
it needs the result before continuing.

- Background subagents surface permission prompts in your main session, naming the asking subagent
  (v2.1.186+). Approve to continue; Esc denies that one call without stopping the subagent.
- A background subagent's result reaches Claude as a completion notification in a later turn. Claude
  waits for that notification before reporting results (v2.1.211+).
- `Ctrl+B` backgrounds a running task. `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1` disables all
  background functionality.
- Completed background subagents stay in `/tasks`, marked done and sorted below running work
  (v2.1.208+). Failed or stopped ones leave the list.

---

## Nesting and concurrency limits

**Depth.** By default a subagent can spawn subagents up to **three layers** below the main
conversation. At the limit, `Agent` is withheld from every subagent except a fork (where the tool
stays listed but errors instead of spawning). Change it with
`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`; `1` turns nesting off.

> Version history matters here: v2.1.172–v2.1.216 allowed five layers and no override;
> v2.1.217–v2.1.218 defaulted to **one**; v2.1.219 raised the default to three.

**Concurrency.** With **20** subagents running, spawning another fails with
`Concurrent subagent limit reached` and the error tells Claude not to retry. Change it with
`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` (v2.1.217+). Sessions with **ultracode** active are exempt.
There is no cap on the total spawned over a session. An in-session fork via `/subtask` takes a slot
but is never blocked; **resuming** a finished subagent takes a slot without checking the limit, so
resumes can push past it.

---

## Resuming subagents

Each invocation creates a new instance with fresh context. To continue, Claude uses `SendMessage`
with the agent's ID or name as `to`. `SendMessage` does not require agent teams to be enabled — only
structured team-protocol messages (`shutdown_request`, `plan_approval_response`) do.

- **`Explore` and `Plan` are one-shot** and return no agent ID, so they cannot be resumed. Use
  `general-purpose` or a custom subagent.
- A completed subagent receiving a `SendMessage` **auto-resumes in the background**. Same for one
  Claude stopped with `TaskStop`.
- A subagent **you** stopped (`x` in `/tasks`, or an SDK `stop_task`) does **not** auto-resume
  (v2.1.191+); the send is refused. Type into its transcript to clear the stop.
- Resuming starts a new run under the same ID, so it shows as running again (v2.1.205+).
- `SendMessage` verifies a name still refers to the same agent it reached earlier (v2.1.199+); if a
  newer agent took the name, the send is refused with the current owner named. Scoped to the
  conversation; resets on `/clear`.

Transcripts live at `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl`, are
unaffected by main-conversation compaction, persist across restarts within the session, and are
deleted after `cleanupPeriodDays` (default 30).

**Messages between agents are task direction, not authority** (v2.1.198+). Two limits hold
regardless of sender: no agent message counts as approval for a pending permission prompt, and no
agent message can change a subagent's permission settings, `CLAUDE.md`, or configuration.

---

## Forks

A **fork** inherits the entire conversation instead of starting fresh. Start one with `/subtask`
(v2.1.212+; `/fork` on v2.1.161–v2.1.211).

| | Fork | Named subagent |
|---|---|---|
| Context | Full conversation history | Fresh, with the passed prompt |
| System prompt and tools | Same as main session | From the definition, filtered for background |
| Model | Same as main session | From the `model` field |
| Permissions | Prompts surface in your terminal | Surface in your main session when background |
| Prompt cache | **Shared with main session** | Separate cache |

Because the fork's system prompt and tool definitions are identical to the parent, its first request
reuses the parent's prompt cache — **forking is cheaper than spawning a fresh subagent** for tasks
needing the same context. A fork cannot spawn further forks. `CLAUDE_CODE_FORK_SUBAGENT=1` enables
fork mode explicitly (and makes every subagent background); `0` disables it everywhere.

---

## Subagent output scanning

Claude Code scans each subagent's final report before Claude reads it (v2.1.210+). A subagent may
have read files, web pages, or command output you never reviewed, and that text can carry
instructions aimed at the main conversation. The scan **never removes or rewords** anything; it makes
two visible changes:

- **Backslash insertion** into text imitating Claude Code's own output — a `<system-reminder>` tag,
  or a line starting `Human:` or `Assistant:`.
- **A marker line** prefixed `[harness: subagent output matched instruction-shaped pattern(s):` when
  the report imitates such a tag or mentions permission settings like `bypassPermissions` or
  `--dangerously-skip-permissions`.

It does not judge maliciousness and does not change what an instruction can do — a resulting tool
call still goes through permission checks and sandboxing. It is **not** a substitute for restricting
what a subagent can reach.
