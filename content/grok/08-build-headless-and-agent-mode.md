---
status: DRAFT
title: "Grok Build — headless mode and agent mode (ACP)"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — user-guide 14, 15"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — headless mode and agent mode (ACP)

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Grok Bot exposes no API and no embedding
surface** — desktop and iOS apps only; see [`09`](./09-bot-bots-and-the-agent-computer.md) §5.

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

Two non-interactive entry points, and the guide distinguishes them in one line: *"For a one-shot prompt
that prints and exits, use `grok -p`… Agent mode runs Grok as a long-lived server that clients talk to
over ACP (JSON-RPC). Use it from IDEs, SDKs, eval harnesses, and custom apps."*

---

## 1. Headless flags

**Prompt and session:** `-p, --single <PROMPT>` · `--prompt-json <JSON>` · `--prompt-file <PATH>` ·
`--verbatim` · `-s, --session-id <ID>` (**creates**, does not resume; errors on a non-UUID or an ID
already in use) · `-r, --resume <ID_OR_TITLE>` · `-c, --continue` · `--fork-session` · `--cwd <PATH>`.

**Resume by title has documented ambiguity rules:** case-insensitive, *"a sole manually renamed match
wins among duplicates; remaining duplicates error with their IDs; UUID-shaped values always take the ID
path; scripts should prefer IDs."*

**Model and effort:** `-m, --model` · `--reasoning-effort` / `--effort`, canonical levels `none`,
`minimal`, `low`, `medium`, `high`, `xhigh`, `max` — *"each a distinct tier; a model only accepts the
levels its menu advertises."*

**Permissions:** `--yolo` / `--always-approve` · `--permission-mode <MODE>` · `--allow <RULE>` ·
`--deny <RULE>` (both repeatable) · `--sandbox <PROFILE>`.

**Headless-only, ignored with a warning in the TUI:** `--tools` (allowlist; *"MCP meta-tools remain
available unless denied"*) · `--disallowed-tools` (*"Supports `Agent` entries"*) · `--max-turns <N>` ·
`--agents <JSON>`.

**Additional:** `--agent <NAME>` · `--system-prompt-override` · `--no-plan` · `--no-subagents` ·
`--disable-web-search` · `--no-alt-screen` · `--rules <TEXT>` · `--no-auto-update` ·
`--include-partial-messages`.

**Worktree:** `--worktree [NAME]` creates one *"from the current checkout (dirty changes included) and
run[s] the session there. Launching from a subdirectory lands in the same subdirectory of the
worktree."* Not combinable with `--fork-session`. `--ref` / `--worktree-ref` bases it on a
branch/tag/commit instead — *"a clean checkout, no dirty overlay."*

One documented pointer to the compatibility layer: *"for deny-by-default use `defaultMode` in
`.claude/settings.json`"* — the flag set has no native equivalent
([`01`](./01-build-harness-compatibility.md) §2).

---

## 2. Four output formats

| Format | Shape |
|---|---|
| `plain` (default) | human-readable text |
| `json` | one object after completion |
| `streaming-json` | NDJSON, one `type`-tagged object per line, *"derived from the agent's ACP session updates"* |
| `streaming-messages-json` | NDJSON *"in the Messages API `stream-json` wire format"* |

**`json`** carries response text, stop reason, session ID, request ID, plus `thought` when reasoning is
present. *"When the prompt reached the model, the same object also carries spend fields (`usage`,
`num_turns`, `modelUsage`, cost). `stopReason` is the snake_case ACP/Messages token."*

**`streaming-json` event types:** `text` · `thought` · `tool_call` · `tool_call_update` · `usage` ·
`plan` · `available_commands` · `end` · `error`. *"`end` is always the last event."* Grok *"may also
emit `max_turns_reached` and `auto_compact_*` events; treat the list as non-exhaustive and switch on
`type`."*

**Two different stop-reason vocabularies travel on the same stream.** `end.stopReason` is *"the turn
stop reason in snake_case (`end_turn`, `max_tokens`, `max_turn_requests`, `refusal`, `cancelled`)"*;
*"the verbatim per-response provider reason (e.g. `tool_use`, `pause_turn`) is on the `usage` line's
`stopReason`."* A consumer reading `stopReason` without knowing which line it came from will
occasionally read the other vocabulary.

**`streaming-messages-json` is a compatibility format with a stated fidelity caveat.** *"The
data-bearing surface matches the Messages shape exactly… A consumer that reconstructs messages, reads
spend, or detects errors works without changes."* But: *"Grok emits the fields it has real data for and
omits pure-placeholder fields it cannot fill, rather than zero-filling them. As a result, those two
lines [`system`/`init` and terminal `result`] may not pass strict `init`/`result` schema validation."*
The named omissions are `claude_code_version`, `output_style` and `plugins`. The vendor's own advice:
*"For a clean xAI-native stream with no placeholder shape, use `streaming-json`."*

---

## 3. Exit codes, and what an interrupt leaves behind

| Code | Meaning |
|---|---|
| `0` | success |
| `1` | *"Authentication failure, network error, or runtime error"* |
| `130` | SIGINT (Ctrl+C) — `128 + 2` |
| `143` | SIGTERM — `128 + 15` |

On a signal: *"Session state saved up to the last completed tool call · File modifications by tools are
**not rolled back** · Exit code is 130 … and 143 …; CI pipelines can distinguish these from a normal
error (exit code `1`)."* Resume with `grok -p "continue" --resume "<id>"`.

---

## 4. Agent mode — three transports

| Transport | Command | Notes |
|---|---|---|
| stdio | `grok agent --always-approve stdio` | *"the common local integration path"*; JSON-RPC on stdin/stdout |
| WebSocket server | `grok agent --always-approve serve --bind 127.0.0.1:2419 --secret <token>` | *"The process keeps state across client reconnects"* |
| WebSocket relay | `grok agent --always-approve headless --grok-ws-url wss://…` | *"To reach the agent over the internet"* |

*"If you omit `--secret`, the agent prints a generated token at startup"*, or set `GROK_AGENT_SECRET`.

**And the boundary the vendor draws around it:** *"This is a server you run yourself — Grok's hosted
cloud sandboxes do not run `grok agent serve`."*

ACP covers *"Sessions (create, load, resume) · Prompts and streamed replies · Tool call updates ·
Reasoning / thought streams · Permission prompts when the session is not always-approve."*

---

## 5. The `x.ai/*` extension surface

Nine categories beyond base ACP:

| Category | Prefix | Examples |
|---|---|---|
| Filesystem | `x.ai/fs/*` | `list`, `exists`, `read_file`, `write_file` |
| Git | `x.ai/git/*` | `status`, `stage`, `commit`, `diffs`, `discard` |
| Git worktree | `x.ai/git/worktree/*` | `create`, `remove`, `apply`, `list`, `gc` |
| Search | `x.ai/search/*` | `fuzzy/open`, `fuzzy/change`, `content` |
| Terminal | `x.ai/terminal/*` | `create`, `kill`, `output`, `wait_for_exit` |
| Session management | `x.ai/session/*` | `fork`, `resolve_local_for_worktree_resume` |
| Conversation & history | `x.ai/*` | `prompt_history`, `rewind/*`, `compact_conversation` |
| Authentication | `x.ai/auth/*` | `get_url`, `submit_code` |
| Feedback & telemetry | `x.ai/*` | `feedback`, `telemetry/*` |

*"The `x.ai/*` set is SpaceXAI-specific and may expand across releases, so treat it as non-exhaustive
and discover the available methods from the agent's `initialize` response."*

**Agent-to-client notifications:** `x.ai/search/fuzzy/status` · `x.ai/git/worktree/status` ·
`x.ai/fs_notify` · `x.ai/fs/index` · `x.ai/fs/index/delta` · `x.ai/session_notification` (*"diff
review, retry state, auto-compact"*) · `x.ai/session/update`.

### Live session options

`session/new` and `session/load` return a typed `configOptions` list — *"standard ACP, not an `x.ai/`
extension"* — changed with `session/set_config_option`. Two options exist:

- `model` — *"Switches the session model (`allowed_models`, chat gateway routing). Value must be a
  string id."*
- `reasoning_effort` — *"Applies effort to the current model without changing the model (no prompt
  rewrite, no `allowed_models` gate)… Dropped with a warning when the model does not advertise
  `supportsReasoningEffort`."*

The response is *"the **complete, updated** option list"*, mirrored to every subscribed client by a
`config_option_update` notification. *"Boolean values are rejected; exposing boolean options is not
implemented yet."*

### `_meta` on `session/new`

`rules` (appended to the system prompt) · `systemPromptOverride` · `agentProfile` · `yoloMode` ·
`autoMode` (*"Superseded when always-approve is already on"*) · `pluginDirs`
([`05`](./05-build-skills-plugins-and-mcp.md) §2) · `GROK_CONFIG` as the env-side equivalent
([`02`](./02-build-configuration-and-project-rules.md) §3).

### Clients

Zed, Neovim (CodeCompanion, avante.nvim), Emacs (`agent-shell`) and marimo notebook are listed
**Supported**; JetBrains is **"Coming soon"** with no date.

---

## 6. What is not documented

- **No versioning statement for the `x.ai/*` methods.** *"May expand across releases"* is said;
  removal or deprecation policy is not. Checked UG/15 in full.
- **No rate limit or concurrency cap on `grok agent serve`.** Checked UG/15 §Server mode, §WebSocket
  relay, UG/26 §`agent`.
- **No documented TLS story for the relay.** `wss://` appears in the example; certificate handling is
  not described. Checked UG/15 §WebSocket relay.
