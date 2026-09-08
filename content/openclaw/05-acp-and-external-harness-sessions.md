---
status: DRAFT
title: "ACP and external harness sessions"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# ACP and external harness sessions

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

The second hosting path, and the one with the widest reach: an external process speaking the
[Agent Client Protocol](https://agentclientprotocol.com/), launched and routed by OpenClaw but
running outside its sandbox. *"OpenClaw owns routing, background-task state, delivery, bindings, and
policy; the harness owns its provider login, model catalog, filesystem behavior, and native tools."*

---

## 1. Four directions, one protocol name

The vendor opens the page by disambiguating them, because three of the four are easy to conflate:

| You want to… | Use | Notes |
|---|---|---|
| Bind or control the native runtime in this conversation | `/codex bind`, `/codex threads` | The embedded path — [`04`](./04-agent-runtimes-and-hosted-harnesses.md) |
| Run an external harness **through** OpenClaw | `/acp …`, `sessions_spawn({ runtime: "acp" })` | This document |
| Expose an OpenClaw session **as** an ACP server | `openclaw acp` | Bridge mode: an IDE or client speaks ACP to OpenClaw over stdio or WebSocket |
| Reuse a local AI CLI as a text-only fallback | CLI backends | *"Not ACP: no OpenClaw tools, no ACP controls, no harness runtime"* |

A fifth adjacent direction: `openclaw mcp serve` lets an external MCP client *"connect … directly to
existing OpenClaw channel conversations"* — [`16`](./16-the-gateway-protocol-and-apis.md).

---

## 2. Installation and the readiness gate

```bash
openclaw plugins install @openclaw/acpx
openclaw config set plugins.entries.acpx.enabled true
```

`/acp doctor` is the readiness check. **The capability hides itself when it cannot work:** *"OpenClaw
only teaches agents about ACP spawning when ACP is **truly usable**: ACP must be enabled, dispatch
must not be disabled, the current session must not be sandbox-blocked, and a runtime backend must be
loaded and healthy. If any condition fails, ACP skills and `sessions_spawn` ACP guidance stay
hidden."*

**If `plugins.allow` is set it is a restrictive inventory and must include `acpx`**, or the installed
backend is *"intentionally blocked."*

---

## 3. The harness ids

Seventeen coding-harness targets are listed for `/acp spawn <id>` and
`sessions_spawn({ runtime: "acp", agentId })`:

| Id | Backend, as OpenClaw names it |
|---|---|
| `claude` | Claude Code ACP adapter |
| `codex` | Codex ACP adapter — *"Explicit ACP fallback only when native `/codex` is unavailable or ACP is requested"* |
| `copilot` | GitHub Copilot ACP adapter |
| `cursor` | Cursor CLI ACP (`cursor-agent acp`) |
| `droid` | Factory Droid CLI |
| `fast-agent` | fast-agent-mcp ACP adapter, fetched on demand with `uvx` |
| `gemini` | Gemini CLI ACP adapter |
| `iflow` | iFlow CLI |
| `kilocode` | Kilo Code CLI |
| `kimi` | Kimi/Moonshot CLI |
| `kiro` | Kiro CLI |
| `mux` | Mux CLI ACP adapter, fetched on demand with `npx` |
| `opencode` | OpenCode ACP adapter |
| `openclaw` | *"OpenClaw Gateway bridge through `openclaw acp`"* |
| `qoder` | Qoder CLI |
| `qwen` | Qwen Code / Qwen CLI |
| `trae` | Trae CLI ACP adapter |

*"`pi` (pi-acp) is also registered in the acpx backend but is not a coding harness in the same sense
as the others above."*

Every one of them requires its **own vendor auth already present on the Gateway host**, and *"model
ids are not portable across harnesses."* Custom acpx aliases can be configured in acpx itself, but
OpenClaw still checks `acp.allowedAgents` and any `agents.entries.*.runtime.acp.agent` mapping before
dispatch.

---

## 4. The sandbox boundary — stated as a warning, not a footnote

> *"ACP sessions currently run on the host runtime, **not** inside the OpenClaw sandbox."*
> *"The external harness can read/write according to its own CLI permissions and the selected `cwd`."*
> *"OpenClaw's sandbox policy does **not** wrap ACP harness execution."*
> *"OpenClaw still enforces ACP feature gates, allowed agents, session ownership, channel bindings, and Gateway delivery policy."*
> *"Use `runtime: 'subagent'` for sandbox-enforced OpenClaw-native work."*

Two consequences the docs make mechanical rather than advisory:

- *"If the requester session is sandboxed, ACP spawns are blocked"* for both the tool and the slash
  command.
- *"`sessions_spawn` with `runtime: 'acp'` does not support `sandbox: 'require'`."*

The `acpx` harness has its own permission surface under `plugins.entries.acpx.config`, because *"ACPX
sessions have no interactive TTY for permission prompts"*:

| Setting | Values |
|---|---|
| `permissionMode` | `approve-reads` · `approve-all` · `deny-all` |
| `nonInteractivePermissions` | `fail` (abort when a prompt would be required) · `deny` (deny and continue) |

*"ACPX harness permissions do not loosen host exec approvals, and host exec approvals do not loosen
ACPX harness prompts."*

---

## 5. Binding a conversation

Three binding shapes, and `--bind` and `--thread` are mutually exclusive.

**`--bind here|off`** pins the current conversation in place — no child thread. Only on channels that
advertise current-conversation binding; *"Bindings persist across gateway restarts."*

**`--thread auto|here|off`** binds a channel thread or topic. `auto` binds the active thread or
creates one; `here` requires one; `off` starts unbound. Built-in thread support: **Discord** threads
and channels, **Telegram** topics. Requires `acp.enabled=true`, `acp.dispatch.enabled` (default on),
and `session.threadBindings.spawnSessions=true` for Discord and Telegram.

**Persistent `bindings[]` entries** with `type: "acp"`:

| Field | Meaning |
|---|---|
| `bindings[].type` | `"acp"` |
| `bindings[].match` | Per-channel peer shape — Discord `peer.id=<channelOrThreadId>`, Slack `channelId`/`user:` forms, Telegram `<chatId>:topic:<topicId>`, WhatsApp E.164 or group JID, iMessage `chat_id:*` preferred |
| `bindings[].agentId` | The owning OpenClaw agent id |
| `bindings[].acp.mode` | `"persistent"` or `"oneshot"` |
| `bindings[].acp.label` · `.cwd` · `.backend` | Operator label, working directory, backend override |

Per-agent defaults live at `agents.entries.*.runtime` — `type: "acp"`, `runtime.acp.agent`,
`.backend`, `.mode`, `.cwd`. **Override precedence:** `bindings[].acp.*` → `agents.entries.*.runtime.acp.*`
→ global ACP defaults.

Configured bindings *"forward the owning agent's explicit model and thinking policy."* Changing one
*"updates the existing session before its next turn without replacing the conversation"*, each option
is saved **only after the harness accepts it**, and *"Model and thinking changes are independent, not
an atomic batch."* Removing a default *"is not a backend reset"* — OpenClaw retains the session's last
selection when no policy remains.

**Gateway commands stay local.** *"`/acp …`, `/status`, and `/session` are never sent as normal prompt
text to a bound ACP harness."*

---

## 6. `sessions_spawn` for ACP

| Param | Type | Notes |
|---|---|---|
| `task` | string, required | Initial prompt |
| `runtime` | `"acp"`, required | Defaults to `subagent`; must be set explicitly |
| `agentId` | string | Harness id; falls back to `acp.defaultAgent` |
| `thread` | boolean, default `false` | Request thread binding where supported |
| `mode` | `"run"` \| `"session"`, default `"run"` | `"session"` **requires** `thread: true` |
| `cwd` | string | Validated by backend and runtime policy; omitted, it inherits the **target agent's** workspace, and a missing inherited path falls back to the backend default while a real access error surfaces |
| `label` | string | Operator-facing |
| `resumeSessionId` | string | ACP-only. *"The agent replays its conversation history via `session/load`."* Not found ⇒ *"the spawn fails with a clear error - no silent fallback to a new session"* |
| `streamTo` | `"parent"` | ACP-only. Streams progress summaries back as system events |

Session keys differ by runtime: `agent:<agentId>:acp:<uuid>` for ACP, `agent:<agentId>:subagent:<uuid>`
for native sub-agents.

**Session owner and harness are separate.** *"a session owned by `work` can run the `claude`
harness. Owner-aware manager calls carry `agentId`; `agent` remains the harness name."*

---

## 7. Delivery — interactive versus parent-owned

**Interactive** sessions keep talking on a visible surface: follow-ups route straight to the ACP
session and output returns to the same channel, thread or topic. When the harness asks for structured
input mid-turn, OpenClaw presents *"supported form fields as transient Gateway questions in batches
of up to three,"* single- and multi-select capped at four choices. A URL request *"shows the literal
HTTP(S) URL with explicit Continue and Decline choices; OpenClaw does not fetch or open it."*
Explicitly secret fields use *"a warned, ephemeral text-reply prompt"* and are *"never stored in a
Gateway question record."*

**Parent-owned one-shot** sessions are background children: they run on the same background lane as
native sub-agent spawns, *"so a slow ACP harness does not block unrelated main-session work,"* and
report back through the task-completion announce path. *"Do **not** treat this path as a
peer-to-peer chat between parent and child."*

**The envelope boundary.** OpenClaw's internal completion metadata is converted to a plain prompt
before it crosses to an external harness: *"The raw `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` envelope
should never be sent to external harnesses or persisted as ACP user transcript text."* Seeing that
marker is listed as a bug symptom in the troubleshooting table.

**The A2A echo guard.** `sessions_send` normally runs an agent-to-agent follow-up after injecting a
message. OpenClaw skips it *"only when the requester is the parent of its own parent-owned one-shot
ACP child"*, because otherwise *"running A2A on top of task completion can wake the parent with the
child's result, forward the parent's reply back into the child, and create a parent/child echo
loop."* Results then report `delivery.status="skipped"` alongside a `targetDisposition` of `queued`
or `steered`.

---

## 8. The `/acp` control surface

| Command | Does |
|---|---|
| `/acp spawn` | Create a session; optional current-conversation or thread bind |
| `/acp cancel` | Cancel the in-flight turn; *"it does not delete the binding or session metadata"* |
| `/acp steer` | Send a steer instruction to a running session |
| `/acp close` | Close the session and unbind thread targets |
| `/acp status` | Backend, mode, state, runtime options, capabilities, runtime- and backend-level ids |
| `/acp set-mode` · `/acp set` | Runtime mode; generic runtime config write |
| `/acp cwd` · `/acp model` · `/acp permissions` · `/acp timeout` | Working directory, model, approval profile, timeout |
| `/acp reset-options` | Clear runtime overrides; closes a retained runtime without starting a new backend |
| `/acp sessions` · `/acp doctor` · `/acp install` | List, health-check, print install steps |

**Authorization splits the table.** The runtime controls — `spawn`, `cancel`, `steer`, `close`,
`status`, `set-mode`, `set`, `cwd`, `permissions`, `timeout`, `model`, `reset-options` — *"require
owner identity from external channels and `operator.admin` from internal Gateway clients."*
Authorized non-owners keep `sessions`, `doctor`, `install` and `help`, and their `/acp sessions`
*"lists only the current bound or requester session."*

### Canonical options, and how they reach a backend

| Command | Canonical option | Sent as the backend advertises |
|---|---|---|
| `/acp set thinking <level>` | `thinking` | prefers `thinking`, then `effort`, `reasoning_effort`, `thought_level` |
| `/acp permissions <profile>` | `permissionProfile` | `approval_policy`, `permission_profile`, `permissions`, `permission_mode` |
| `/acp timeout <seconds>` | `timeoutSeconds` | `timeout`, `timeout_seconds` |
| `/acp model <id>` | `model` | normalised per adapter; reasoning suffixes such as `openai/gpt-5.4/high` map to `reasoning_effort` |

When a backend returns its accepted controls, *"OpenClaw keeps an already-selected thinking level in
sync with that response. A model switch may lower the level or remove thinking support; subsequent
turns and reconnects use the accepted selection instead of replaying the old level. Backend defaults
do not become new session overrides."*

**Target resolution order** for any `/acp` action: explicit target (key, then UUID-shaped id, then
label) → the current thread or conversation binding → the requester session. Failing that,
`Unable to resolve session target: …`.

---

## 9. Lifecycle and cleanup

Spawn creates or resumes a runtime session, records ACP metadata in the OpenClaw session store, and
may create a background task when the run is parent-owned — see
[`14`](./14-automations-tasks-and-goals.md). Task maintenance closes terminal or orphaned
parent-owned one-shot sessions. *"Persistent ACP sessions are preserved while an active conversation
binding remains; stale persistent sessions without an active binding are closed so they cannot be
silently resumed after the owning task is done."*

*"Turn completion waits for queued output delivery. If delivery fails, OpenClaw cancels the active
turn and waits for backend cleanup before starting the next queued turn."* `close` ends the session
from OpenClaw's side and removes the binding, *"A harness may still keep its own upstream history if
it supports resume."* The acpx plugin *"cleans up OpenClaw-owned wrapper and adapter process trees
after `close`, and reaps stale OpenClaw-owned ACPX orphans during Gateway startup."*
