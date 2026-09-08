---
status: DRAFT
title: "Hooks — four systems, one dispatcher"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/hooks · .../features/plugins"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Hooks — four systems, one dispatcher

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

*"Hermes has four hook systems that run custom code at key lifecycle points."* They differ in where
they are declared, where they run, and — the distinction that matters most — **whether they can stop
anything**.

---

## 1. The four systems

| System | Registered via | Runs in | Use case |
|---|---|---|---|
| **Gateway hooks** | `HOOK.yaml` + `handler.py` in `~/.hermes/hooks/` | Gateway only | Logging, alerts, webhooks |
| **Plugin hooks** | `ctx.register_hook()` in a plugin | CLI + Gateway | Tool interception, metrics, guardrails |
| **Shell hooks** | `hooks:` block in profile `config.yaml` | CLI + Gateway + Desktop/TUI/dashboard chat | Drop-in scripts for blocking, auto-formatting, context injection |
| **Outbound webhooks** | `hooks.outbound:` in `config.yaml` | CLI + Gateway | Push signed lifecycle events to external HTTP endpoints |

> *"Hooks are not all passive: directive/control hooks can change flow, transforms can replace content,
> and a shell `pre_tool_call` hook can block or fail closed."*

Shell hooks and plugin hooks are the same event namespace and the same dispatcher; the gateway system is
a separate namespace.

## 2. Gateway event hooks

A directory under `~/.hermes/hooks/<name>/` with two files:

```yaml
# HOOK.yaml
name: my-hook
description: Log all agent activity to a file
events:
  - agent:start
  - agent:end
  - command:*        # wildcards are supported
```

The handler *"must be named `handle`"*, receives `event_type: str` and `context: dict`, may be `async
def` or `def`, and *"Errors are caught and logged, never crashing the agent."* Gateway hooks fire
*"without blocking the main agent pipeline"* — they observe, they do not gate.

### Every gateway event, with its context keys

| Event | When it fires | Context keys |
|---|---|---|
| `gateway:startup` | Gateway process starts | `platforms` |
| `session:start` | New messaging session created | `platform`, `user_id`, `session_id`, `session_key` |
| `session:end` | Session ended (before reset) | `platform`, `user_id`, `session_key` |
| `session:reset` | User ran `/new` or `/reset` | `platform`, `user_id`, `session_key` |
| `session:compress` | Context compression completed | `platform`, `session_id`, `old_session_id`, `in_place` (bool), `compression_count` |
| `agent:start` | Agent begins processing a message | `platform`, `user_id`, `chat_id`, `thread_id`, `chat_type` (`dm`/`group`/`forum`), `session_id`, `message` (truncated to 500 chars) |
| `agent:step` | Each iteration of the tool-calling loop | `platform`, `user_id`, `session_id`, `iteration`, `tool_names` |
| `agent:end` | Agent finishes processing | as `agent:start`, plus `response` (truncated to 500 chars) |
| `reaction:added` | An emoji reaction added to a visible message (Slack adapter currently) | `platform`, `reaction`, `user_id`, `item_user_id`, `item_type`, `channel_id`, `message_ts`, `team_id`, `event_ts`, `raw_event` |
| `reaction:removed` | An emoji reaction removed | same shape as `reaction:added` |
| `command:*` | Any slash command executed | `platform`, `user_id`, `command`, `args` |

`session:compress` distinguishes two compaction shapes: `in_place: true` means the transcript was
compacted on the same id; `false` means it rotated from `old_session_id`.

`reaction:added` requires *"the `reactions:read` scope + the `reaction_added` bot event subscription;
the bot must be a member of the channel."*

## 3. Plugin hooks

Registered programmatically and fired in **both CLI and gateway** sessions. The documented event
catalogue spans the tool, LLM, session, subagent, gateway, approval, transcription and kanban
lifecycles:

| Group | Events |
|---|---|
| Tool | `pre_tool_call` (**can block**), `post_tool_call`, `transform_tool_result`, `transform_terminal_output` |
| Model | `pre_llm_call` (**injects context**), `post_llm_call`, `transform_llm_output`, `transform_api_error_classification`, API-request observers |
| Verify gate | `pre_verify` (**can continue the turn**) |
| Session | `on_session_start`, `on_session_end`, `on_session_finalize`, `on_session_reset` |
| Subagent | `subagent_start`, `subagent_stop` |
| Gateway | `pre_gateway_dispatch` (**can block**), `gateway_platform_event` |
| Approval | `pre_approval_request`, `post_approval_response` |
| Voice | `pre_transcription` |
| Skills | `on_skill_lifecycle` |
| Kanban | lifecycle observers, worker-lifecycle, task-mutation and dispatch observers — e.g. `kanban_task_claimed` (dispatcher process), `kanban_task_completed`, `kanban_task_blocked` (worker process) |

### Three categories, and they behave differently

> *"**observers** ignore returns, **transforms** accept the first valid string replacement, and
> **directive/control** hooks consume documented return shapes. Plugin middleware is a separate registry
> and surface, not another hook category."*

### The timeout, and which way it fails

```yaml
plugins:
  hook_callback_timeout: 30   # seconds; 0 disables; values above 600 are clamped
```

> *"If a Python plugin callback on a **timeout-bounded** hook (hot-path observers such as
> `post_tool_call` / `pre_llm_call`, plus the policy hook `pre_tool_call`) **blocks** longer than
> `plugins.hook_callback_timeout` … it is abandoned without joining the worker so the agent loop
> continues. Timed-out or still-running `pre_tool_call` callbacks **fail closed** (block the tool);
> other bounded hooks fail open (skip)."*

`subagent_stop` has a documented caller-thread contract and is *"never moved onto a timeout worker."*
Shell hooks keep their own per-entry `timeout`.

Two further rules for authors: callbacks receive keyword arguments and *"Always accept `**kwargs` for
forward compatibility"*; and correlation fields (`turn_id`, `api_request_id`, `task_id`, `session_id`,
`api_call_count`) *"are hook-specific and may be absent. Treat IDs as opaque."*

**The authoritative event list is `hermes_cli.plugins.VALID_HOOKS`.** *"`hermes hooks list` lists
configured shell/outbound hooks, not every available event; `hermes hooks test <event>` reports the
valid set only when an invalid event is supplied."*

## 4. Shell hooks

The drop-in path — *"No Python plugin authoring required"* — declared in the profile's `config.yaml`
and spawned as subprocesses.

```yaml
hooks:
  <event_name>:                  # must be in VALID_HOOKS
    - matcher: "<regex>"         # optional; pre/post_tool_call only
      command: "<shell command>" # required; runs via shlex.split, shell=False
      timeout: <seconds>         # optional; default 60, capped at 300
      fail_closed: <bool>        # optional; default false. pre_tool_call only
                                 # `failClosed` also accepted

hooks_auto_accept: false
```

Config-parse behaviour is specified: a typo'd event produces a *"Did you mean X?"* warning and is
skipped; unknown keys inside an entry are ignored; a missing `command` is a skip-with-warning;
`timeout > 300` is clamped with a warning; `fail_closed` on any event other than `pre_tool_call` warns
and is ignored.

### How they compare with the other two

| Dimension | Shell hooks | Plugin hooks | Gateway hooks |
|---|---|---|---|
| Declared in | `hooks:` in `config.yaml` | `register()` in a plugin | `HOOK.yaml` + `handler.py` |
| Lives under | `~/.hermes/agent-hooks/` (by convention) | `~/.hermes/plugins/<name>/` | `~/.hermes/hooks/<name>/` |
| Language | Any (Bash, Python, Go binary, …) | Python only | Python only |
| Runs in | CLI + Gateway | CLI + Gateway | Gateway only |
| Can block a tool call | **Yes** (`pre_tool_call`) | **Yes** (`pre_tool_call`) | No |
| Can inject LLM context | Yes (`pre_llm_call`) | Yes (`pre_llm_call`) | No |
| Consent | First-use prompt per `(event, command)` pair | Implicit (Python plugin trust) | Implicit (dir trust) |
| Inter-process isolation | **Yes** (subprocess) | No (in-process) | No (in-process) |

### The wire protocol

JSON on **stdin**, optional JSON on **stdout**.

```json
{
  "hook_event_name": "pre_tool_call",
  "tool_name":       "terminal",
  "tool_input":      {"command": "rm -rf /"},
  "session_id":      "sess_abc123",
  "cwd":             "/home/user/project",
  "extra":           {"task_id": "...", "tool_call_id": "..."}
}
```

`tool_name` and `tool_input` are `null` for non-tool events. `extra` carries all event-specific kwargs
(`user_message`, `conversation_history`, `child_role`, `duration_ms`, …), and *"Unserialisable values
are stringified rather than omitted."*

Every response shape accepts two spellings — a Hermes-canonical form and a Claude Code / Cursor-style
form, *"normalised internally"*:

| Intent | Hermes-canonical | Compatible spelling |
|---|---|---|
| **Block** a `pre_tool_call` | `{"action": "block", "message": "…"}` | `{"decision": "block", "reason": "…"}` |
| **Modify** a `pre_tool_call` — rewrite args before dispatch | `{"action": "modify", "args": {…}}` | `{"decision": "modify", "tool_input": {…}}` |
| **Inject** context on `pre_llm_call` | `{"context": "Today is Friday, 2026-04-17"}` | — |
| **Continue** at the verify gate (`pre_verify`) | `{"action": "continue", "message": "…"}` | `{"decision": "block", "reason": "…"}` |
| **No-op** | any empty / non-matching output | — |

The `modify` shape is the capability worth knowing: a hook can **rewrite the tool call**, not only vote
on it.

*"Malformed JSON, non-zero exit codes, and timeouts log a warning but never abort the agent loop."*

### Exit code 2

A `pre_tool_call` hook exiting **2** blocks the call even with no block JSON. The message resolves in
priority order: *"stdout block JSON (`reason` / `message`), when present; the first 400 characters of
stderr; a generic `"Blocked by shell hook."` default."* For every other event, exit 2 is *"treated like
any other non-zero exit."*

### Fail-open is the default; fail-closed is the security posture

> *"By default shell hooks **fail open** … That is the right default for observability hooks — but wrong
> for security gates. A crashed secret-scanner must not silently allow the tool call it was supposed to
> vet."*

| Failure | Fail-open (default) | `fail_closed: true` |
|---|---|---|
| Command not found / not executable | warn, proceed | **block** |
| Timeout | warn, proceed | **block** |
| Non-JSON stdout (e.g. a stack trace) | warn, proceed | **block** |
| Clean exit, valid no-op JSON (`{}`) | proceed | proceed |

A blocked call reports `hook <command> failed closed: <reason>`. `hermes hooks test` *"reflects these
semantics — the `parsed` line shows exactly the block shape the dispatcher would receive."*

### Consent, and the thing consent does not cover

Each unique `(event, command)` pair prompts once and persists to
`~/.hermes/shell-hooks-allowlist.json`. Three bypasses, any one sufficient: `--accept-hooks`,
`HERMES_ACCEPT_HOOKS=1`, or `hooks_auto_accept: true`.

> *"Non-TTY runs (gateway, cron, CI) need one of these three — otherwise any newly-added hook silently
> stays un-registered and logs a warning."*

And the gap, stated plainly:

> *"**Script edits are silently trusted.** The allowlist keys on the exact command string, not the
> script's hash, so editing the script on disk does not invalidate consent."*

`hermes hooks doctor` *"flags mtime drift so you can spot edits and decide whether to re-approve."*

The manual allowlist format is an `approvals` array of `{event, command}` objects, and the command
string *"must match the configured hook command exactly. A path-keyed object with a `sha256` field is
not the expected format and will not approve the hook."*

### Ordering

> *"Python plugins are registered first (`discover_and_load()`), shell hooks second
> (`register_from_config()`), so Python `pre_tool_call` block decisions take precedence in tie cases. The
> first valid block wins."*

### The CLI

| Command | What it does |
|---|---|
| `hermes hooks list` | Configured hooks with matcher, timeout, and consent status |
| `hermes hooks test <event> [--for-tool X] [--payload-file F]` | Fire every matching hook against a synthetic payload, print the parsed response |
| `hermes hooks revoke <command>` | Remove every allowlist entry matching it (takes effect on next restart) |
| `hermes hooks doctor` | Exec bit, allowlist status, mtime drift, JSON output validity, rough execution time |

### The trust boundary they sit on

> *"Shell hooks run with **your full user credentials** — same trust boundary as a cron entry or a shell
> alias. Treat the `hooks:` block in `config.yaml` as privileged configuration."*

The stated review discipline: only reference scripts you wrote or reviewed, keep them in
`~/.hermes/agent-hooks/` so the path is auditable, re-run `hermes hooks doctor` after pulling a shared
config, and review PRs touching the `hooks:` section as CI configuration.

## 5. Outbound webhooks

*"the push-side mirror of the inbound webhook platform: inbound webhooks wake Hermes when the world
changes; outbound webhooks tell the world when Hermes does something."* A `hooks.outbound:` list of
endpoints and the lifecycle events each cares about; Hermes POSTs a **signed** JSON payload on a match,
*"no polling on the receiving end."*

Named uses include notifying CI on `on_session_end`, tracking `subagent_stop` across a fleet, feeding
`post_tool_call` into monitoring with a `matcher` — and *"Wake *another* Hermes instance: point the URL
at that instance's inbound webhook."*
