---
status: DRAFT
title: "Programmatic execution — headless CLI and the Agent SDK"
tier: reference
project: harness-atlas
source: "https://code.claude.com/docs/en/headless, /agent-sdk/overview, /cli-reference"
source_verified: "2026-08-10"
---

# Programmatic execution

> **Drafted 2026-08-10 by `claude-opus-5`, not yet verified.** Attested, not captured — see [`00-README.md`](./00-README.md).

Two ways to run Claude Code without a human at the terminal: the **CLI in non-interactive mode**
(`claude -p`), and the **Agent SDK** as a Python or TypeScript library. Both run the same agent loop.

---

## `claude -p`

```bash
claude -p "Find and fix the bug in auth.py" --allowedTools "Read,Edit,Bash"
```

Exit code **0** on success, non-zero on failure — scripts can branch on it. An invalid flag is
reported to stderr before the run starts; a failure *inside* the run (missing authentication, say) is
printed as the result on **stdout**.

Flags that conflict with `-p`: `--bg` is rejected; `--cloud` with a task description is rejected;
`--cloud` with a session ID queues a message into that cloud session and exits.

### `--bare` — the recommended mode for scripts and CI

```bash
claude --bare -p "Summarize README.md" --allowedTools "Read"
```

Skips auto-discovery of hooks, skills, plugins, MCP servers, auto memory, and CLAUDE.md. **The point
is determinism**: a hook in a teammate's `~/.claude` or an MCP server in the project's `.mcp.json`
will not run, because bare mode never reads them.

> The docs state `--bare` **will become the default for `-p` in a future release.**

In bare mode Claude Code **never reads OAuth credentials or the system keychain** — set
`ANTHROPIC_API_KEY`, or supply an `apiKeyHelper` in `--settings` JSON. Bedrock, Google Cloud's Agent
Platform, and Microsoft Foundry still read their own provider credentials. Bare mode gives Claude
Bash, file read, and file edit; load anything else explicitly:

| To load | Flag |
|---|---|
| System prompt additions | `--append-system-prompt`, `--append-system-prompt-file` |
| Settings | `--settings <file-or-json>` |
| MCP servers | `--mcp-config <file-or-json>` |
| Custom agents | `--agents <json>` |
| A plugin | `--plugin-dir <path>`, `--plugin-url <url>` |

---

## Output formats

```bash
claude -p "Summarize this project" --output-format json
```

- `text` (default)
- `json` — structured, with `result`, `session_id`, and metadata including `total_cost_usd` and a
  per-model cost breakdown (client-side estimates; they can differ from the bill)
- `stream-json` — newline-delimited JSON events

### Schema-constrained output

```bash
claude -p "Extract the main function names from auth.py" \
  --output-format json \
  --json-schema '{"type":"object","properties":{"functions":{"type":"array","items":{"type":"string"}}},"required":["functions"]}'
```

The structured value lands in `structured_output`. An invalid schema exits with
`Error: --json-schema is not a valid JSON Schema` plus the validator's diagnostic (v2.1.205+; before
that an invalid schema was silently ignored and returned unstructured text). The `format` keyword is
accepted but treated as an annotation, not enforced.

### Streaming

```bash
claude -p "Explain recursion" --output-format stream-json --verbose --include-partial-messages
```

The last line is a `result` message with final text, cost, and session metadata. If your consumer
reads slowly, Claude Code waits for the queue to drain, scaling with backlog up to **30 seconds**
(v2.1.214+; previously ~2s, which could truncate large responses).

**Following subagents.** Subagent messages appear as `assistant` and `user` messages whose
`parent_tool_use_id` is the spawning tool call's ID; main-conversation messages carry `null`. By
default only subagent `tool_use` and `tool_result` blocks are emitted — pass
`--forward-subagent-text` or set `CLAUDE_CODE_FORWARD_SUBAGENT_TEXT` to also emit text and thinking
blocks (v2.1.211+). With either enabled, messages forward from **every nesting depth** (v2.1.219+),
so the full tree is reconstructible by following `parent_tool_use_id`.

**Retry events.** `system/api_retry` fires before each retry with `attempt`, `max_retries`,
`retry_delay_ms`, `error_status`, and an `error` category from: `authentication_failed`,
`oauth_org_not_allowed`, `billing_error`, `rate_limit`, `overloaded`, `invalid_request`,
`model_not_found`, `server_error`, `max_output_tokens`, `unknown`.

---

## CI gating on the `system/init` event

`system/init` is the first stream event (unless `plugin_install` or hook events precede it) and
reports the model, tools, MCP servers, and loaded plugins. It is the right place to fail a build.

| Field | Use |
|---|---|
| `plugins` | Plugins that loaded, each with `name` and `path` |
| `plugin_errors` | Load-time errors, each with `plugin`, `type`, `message`. Includes unsatisfied dependency versions and `--plugin-dir` failures. **Key omitted when there are none** — so a CI gate can fail on presence |
| `mcp_servers` | Servers in the session, each with `name` and `status` |
| `mcp_server_errors` | `--mcp-config` entries skipped by validation, each with `name`, `type` (`unknown_type`, `url_missing_type`, `invalid_config`, `reserved_name`), `message`. Key omitted when none (v2.1.219+) |
| `capabilities` | Protocol behaviors this version implements (e.g. `interrupt_receipt_v1`). **Feature-detect with this instead of comparing version strings** (v2.1.205+) |

Claude Code **skips** invalid `--mcp-config` entries and the run continues and exits cleanly — so
without checking these fields, a server that never loaded is invisible. When stderr is captured by a
CI runner rather than a terminal, no warning is printed at all; the errors appear only in these
fields.

With `--mcp-config` and `-p`, Claude Code waits for pending servers before the first turn, up to
`MCP_TIMEOUT` (default 30s) (v2.1.221+).

---

## Permissions in non-interactive mode

```bash
claude -p "Run the test suite and fix any failures" --allowedTools "Bash,Read,Edit"
claude -p "Apply the lint fixes" --permission-mode acceptEdits
```

`--allowedTools` uses full permission-rule syntax:

```bash
claude -p "Look at my staged changes and create an appropriate commit" \
  --allowedTools "Bash(git diff *),Bash(git log *),Bash(git status *),Bash(git commit *)"
```

The **space before `*`** matters: `Bash(git diff *)` enforces a word boundary; `Bash(git diff*)`
would also match `git diff-index`.

For locked-down CI, `--permission-mode dontAsk` denies anything not in `permissions.allow` or the
read-only command set. `acceptEdits` auto-approves writes and common filesystem commands, but other
shell commands and network requests still need an allow rule — **the run aborts when one is
attempted**.

There is no one to prompt in `-p` mode, so tool calls follow configured rules without interactive
confirmation.

---

## Session management

```bash
claude -p "Review this codebase for performance issues"
claude -p "Now focus on the database queries" --continue

session_id=$(claude -p "Start a review" --output-format json | jq -r '.session_id')
claude -p "Continue that review" --resume "$session_id"
```

As of v2.1.223, Claude Code finds a session **by ID in any project on the machine** — the two
commands no longer need to run from the same directory.

---

## Process lifecycle

- **Background Bash tasks** started during a `-p` run are terminated ~5 seconds after the final
  result and stdin close. (Before v2.1.163 a never-exiting background process held the invocation
  open indefinitely.)
- **Background subagents and workflows are exempt** from the 5-second grace, because their result is
  part of the final output — `claude -p` waits. From v2.1.182 that wait is capped at **10 minutes**;
  adjust with `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS`, or `0` for no limit.
- **SIGTERM** aborts the in-progress turn, terminates the process tree of any running Bash command,
  runs `SessionEnd` hooks, and exits **143**.

---

## Skills and commands in `-p`

User-invoked skills and custom commands work: include `/skill-name` in the prompt string and it
expands before running. Terminal-only built-ins such as `/login` are unavailable. `/model`, `/effort`,
`/fast`, `/color`, and `/rename` accept a value as an argument (`/model sonnet`), `/mcp` prints a text
status summary, and `/config key=value` sets any setting — all v2.1.205+.

Note from `02-skills.md`: a forked skill (`context: fork`) **always waits** in `-p` mode regardless of
its `background` setting.

---

## Piping

```bash
cat build-error.txt | claude -p 'concisely explain the root cause of this build error' > output.txt
git diff main | claude -p "you are a typo linter. report filename:line and the issue. return nothing else."
```

**Piped stdin is capped at 10MB**; exceeding it exits with an error and non-zero status. For larger
inputs, write to a file and reference the path. If stdin is unreadable, Claude Code warns to stderr
and continues with the command-line prompt.

---

## The Agent SDK

Python and TypeScript libraries running the same agent loop, tools, and context management in **your
own process**.

| If you're... | Use |
|---|---|
| Building an agent without implementing the tool loop | **Agent SDK** |
| Doing interactive development or one-off terminal tasks | **Claude Code CLI** |
| Calling the API and implementing the loop yourself | **Client SDK** |
| Running long agents without managing your own sandbox or session infra | **Managed Agents** (hosted REST API, separate product) |

To drive the same loop from another language, run the CLI as a subprocess with `-p` and
`--output-format json`. This is the documented approach for callers outside Python and TypeScript,
and it remains available to Python and TypeScript callers that would rather not take the SDK as a
dependency.

Everything from the CLI carries over: built-in tools, hooks, subagents, MCP, permissions, sessions,
skills, commands, memory, and plugins (loadable by local path). Skills, commands, and memory load
from the project's `.claude/` and `~/.claude/` the same way — controllable via `settingSources`.

SDK-specific pages worth knowing: `structured-outputs`, `custom-tools`, `tool-search`,
`session-storage` (persist sessions to external storage), `file-checkpointing`, `cost-tracking`,
`observability` (OpenTelemetry), `hosting`, and `secure-deployment`.

**Licensing note from the docs:** "Unless previously approved, Anthropic does not allow third party
developers to offer claude.ai login or rate limits for their products, including agents built on the
Claude Agent SDK. Use API key authentication instead." There are also branding rules — "Claude Agent"
is permitted, "Claude Code" is not.
