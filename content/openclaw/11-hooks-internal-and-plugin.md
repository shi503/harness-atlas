---
status: DRAFT
title: "Hooks — the two tiers"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Hooks — the two tiers

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

Two hook systems with two different powers, and the docs open by telling you which one you want.

| You want to… | Use |
|---|---|
| Save context on `/new`, log commands, react to session and message events | **Internal hooks** — `HOOK.md` plus a handler |
| *"Modify prompts, intercept tools, control replies, or use lifecycle contracts with priorities and return values"* | **Plugin hooks** — `api.on(...)` |
| Let another service start work over HTTP | **Webhooks** — [`14`](./14-automations-tasks-and-goals.md) |

**The one-line difference:** internal hooks *"Returned values do not block, cancel, or rewrite the
operation."* Plugin hooks can.

---

# Part 1 — Internal hooks

*"small JavaScript or TypeScript handlers that run in the Gateway process when OpenClaw emits an
event."*

## 1.1 The fifteen events

Subscribe to an exact key or a bare family (`command`, `session`, `agent`, `gateway`, `message`).
*"`session:compact` is not a family or a wildcard; subscribe to the two exact compaction keys."*

| Event | Trigger and wait behaviour |
|---|---|
| `command:new` | Authorized new-session command handling, or a Gateway session operation emitting new-command hooks; **awaited** |
| `command:reset` | Authorized reset-command handling or Gateway session reset; **awaited** |
| `command:stop` | Stop-command handling after the abort request; **awaited, no reply delivery** |
| `session:auto-reset` | Session replaced by daily/idle policy; *"dispatched independently of the successor turn"* |
| `session:compact:before` | Before compaction work; **awaited** |
| `session:compact:after` | After successful compaction; **awaited** |
| `session:patch` | An authorized Gateway patch is applied, or a model-selection path persists a change; async |
| `agent:bootstrap` | Workspace bootstrap resolution **before context injection**; **awaited** |
| `gateway:startup` | After hook loading and sidecar/channel startup; *"does not delay initial Gateway bind"* |
| `gateway:shutdown` | Shutdown begins, before channel/plugin teardown; bounded wait |
| `gateway:pre-restart` | Shutdown has a finite expected-restart delay; bounded wait |
| `message:received` | Accepted inbound dispatch with a session key; async observation |
| `message:transcribed` | Pre-agent preprocessing has non-empty audio transcript text; async |
| `message:preprocessed` | Media/link preprocessing completed or skipped; async |
| `message:sent` | A delivery owner reports a send outcome; async — *"Inspect `context.success`"* |

*"Do not subscribe the same handler to both `command` and `command:new` unless you want it called
twice."*

**These are observation points, not an audit trail.** *"Suppressed/duplicate inbound dispatches and
paths with no session key can omit them… Fast native-command paths can skip preprocessing events.
`preprocessed` means that phase was passed, not that every attachment or link was successfully
understood."* Compaction can skip or fail after its before event, and retries can emit it again.

An unknown subscription such as `command:nwe` *"is still registered, but the loader warns and
`hooks info` reports them. Core does not emit them."*

## 1.2 The event object

| Field | Meaning |
|---|---|
| `type` | Family: `command`, `session`, `agent`, `gateway`, `message` |
| `action` | Action within the family — `new`, `compact:before`, … |
| `sessionKey` | Session correlation key; Gateway events use a Gateway key |
| `timestamp` | `Date` when the event object was created |
| `context` | Event-specific data |
| `messages` | *"Initially empty string array; only certain producers consume it as replies"* |

*"Treat context as an observation, not a live state-editing API… patch events carry cloned snapshots.
The explicit mutable exception is `agent:bootstrap`'s `context.bootstrapFiles`."*

**`event.messages` is not a send API.** Four producers, four different fates:

| Producer | What happens |
|---|---|
| Chat command handling for `/new` and `/reset` | Awaits handlers, joins with blank lines, replies to the originating channel, preserving account and thread context |
| Gateway session reset/create RPCs emitting `command:new`/`command:reset` | Handlers run; *"messages are not routed as chat replies"* |
| `session:compact:before` / `:after` | Forwarded to the caller's compaction-notice callback, *"that callback owns delivery"* |
| Everything else | *"Ignored as replies"* — `/stop`, auto-reset, message events, bootstrap, patch, Gateway lifecycle |

*"Append messages before the handler's promise settles; detached work that pushes later can miss the
producer's delivery step."*

## 1.3 `HOOK.md` frontmatter

| Key | Meaning |
|---|---|
| `events` | Event-key array. **At least one is needed to register a handler** |
| `export` | Function export name; defaults to `default` |
| `hookKey` | Config-entry key; defaults to the hook name. *"Discovery collisions still use the hook name"* |
| `emoji` · `homepage` | Display |
| `os` | Allowed Node platforms — `darwin`, `linux`, `win32` |
| `requires.bins` · `.anyBins` · `.env` · `.config` | All / at least one / every var non-blank / every dotted path truthy |
| `always` | Bypasses binary, env and config requirements — *"does not bypass OS or enablement policy"* |
| `install` | Informational descriptors (`kind`: `bundled`, `npm`, `git`). *"This metadata does not install dependencies"* |

## 1.4 Discovery, and who may replace whom

| Source | Collision behaviour |
|---|---|
| Bundled | Shipped with OpenClaw |
| Plugin | Declared by active plugins; **can replace bundled names** |
| Managed — `<stateDir>/hooks/` | **Can replace bundled and plugin names** |
| Extra dirs — `hooks.internal.load.extraDirs` | Same policy as managed. Later dirs beat earlier ones; **managed beats extra dirs** |
| Workspace — `<workspace>/hooks/` | *"can add names but **cannot replace** bundled, plugin, or managed names. Explicit opt-in required"* |

An `extraDirs` path may be a pack root, a single-hook root, or an ordinary collection directory —
*"discovery does not recurse into another pack or collection."* The warning is explicit: *"Only add
trusted directories: any extra path opens hook-name selection across discovery sources beyond named
entries."* Handler files must stay inside their hook directory; *"Symlinks escaping those boundaries
are rejected."*

**Hook files are not watched.** Config and selected-workspace changes reload discovery in `hybrid`
mode, but *"Hook files and metadata are not watched; restart after editing them."*

## 1.5 Selection rules

| Configuration | Selection |
|---|---|
| `hooks.internal.enabled: false` | Off |
| No master flag, no enabled entries, no extra dirs, no tracked installs | Directory-hook loading skipped |
| Named entries, master omitted or true | *"Enabled names form an allowlist; `enabled: true` on the master does not broaden it"* |
| Master true, no named entries or installs | Open-ended discovery of eligible hooks |
| Tracked hook packs declaring names | Those names join the selection; explicit `enabled: false` still disables a non-plugin hook |
| Non-empty `load.extraDirs`, or a tracked install with no name list | **Open-ended discovery**, not restricted to that directory |

Workspace hooks *"always need `entries.<hookKey>.enabled: true`."*

**Three separate checks, kept separate deliberately:** *requirements satisfied*, *enabled by config*,
*loaded*. The CLI's `ready`, `eligible` and `loadable` fields cover the first two plus a non-empty
event list — *"They do **not** prove that the Gateway imported the handler, that the global selection
includes it, or that its event has fired. After changes, verify the actual side effect."*

Reload prepares handlers before swapping them: *"If a selected handler cannot load, the previous
handlers stay active… Reload does not replay `gateway:startup`."*

**`--agent <id>` is a workspace selector, not a registry.** *"The saved
`hooks.internal.entries.<hookKey>` entry is global… A loaded handler must filter the event's agent or
session when it should only act for a particular agent."* And `hooks enable`/`disable` *"always
inspect and modify **local config**"*, never a remote Gateway.

## 1.6 The five bundled hooks

| Hook | Events | Does |
|---|---|---|
| `boot-md` | `gateway:startup` | Runs workspace `BOOT.md` instructions at startup |
| `bootstrap-extra-files` | `agent:bootstrap` | Adds matching workspace bootstrap files to context |
| `command-logger` | `command` | Appends emitted command events to a JSONL log |
| `compaction-notifier` | `session:compact:before`, `:after` | Adds compaction status notices on supported delivery paths |
| `session-memory` | `command:new`, `command:reset`, `session:auto-reset` | Saves recent conversation excerpts to workspace memory (`messages` default `15`, optional `llmSlug`, optional `model`) |

*"Enabling a different internal hook does not enable `boot-md`."*

---

# Part 2 — Plugin hooks

**Forty-two named hooks in seven groups** at this read, registered through `api.on(name, handler,
opts?)` inside a synchronous `register(api)`.

## 2.1 Six execution contracts

| Kind | Contract |
|---|---|
| **Modify** | Sequential; results merge per the hook's contract. *"Returning a rewrite does not generally change the event passed to later handlers"* |
| **Claim** | Sequential; *"the first `{ handled: true }` wins and skips remaining handlers"* |
| **Gate** | Sequential; *"a block stops remaining handlers"* |
| **Observe** | **Concurrent**; return values ignored. The emitter may await or fire-and-forget |
| **Sync modify/gate** | Synchronous, priority order, each handler sees the latest message. *"Promises are ignored with a warning"* |
| **Evaluate** | Concurrent, producing *"separate attributed outcomes"* |

Priority defaults to `0`, higher first, registration order breaking ties. *"Priority does not
serialize observation side effects… Return modifications explicitly instead of relying on in-place
mutation."*

## 2.2 The catalog

**Agent turn (8):** `before_model_resolve` (modify — override provider or model before session
messages load) · `agent_turn_prepare` (modify) · `before_prompt_build` (modify — add context, narrow
the turn's tools, or post-policy enrichment) · `before_agent_run` (**gate**) · `before_agent_reply`
(**claim** — synthetic reply or silence) · `before_agent_finalize` (modify — request one more model
pass) · `agent_end` (observe) · `heartbeat_prompt_contribution` (modify).

**Conversation observation (4):** `model_call_started` / `model_call_ended` — *"Sanitized
provider/model call metadata… **No prompt or response content**"* · `llm_input` · `llm_output`.

**Tools (5):** `before_tool_call` (modify/gate — *"Rewrite tool params, block execution, or require
approval"*) · `after_tool_call` (observe) · `resolve_exec_env` (modify) · `tool_result_persist` (sync
modify) · `before_message_write` (sync modify/gate).

**Messages and delivery (8):** `inbound_claim` · `channel_pairing_requested` · `message_received` ·
`message_sending` (modify/gate) · `reply_payload_sending` (modify/gate) · `message_sent` ·
`before_dispatch` (claim) · `reply_dispatch` (claim).

*"`inbound_claim` is not a global pre-routing broadcast. OpenClaw invokes it only for the plugin that
owns the message's core-managed conversation binding."*

**Sessions and compaction (5):** `session_start` / `session_end` · `before_compaction` /
`after_compaction` (*"no rewrite or veto result"*) · `before_reset`.

`session_end.reason` is a closed set: `new`, `reset`, `idle`, `daily`, `compaction`, `deleted`,
`shutdown`, `restart`, `unknown`. Successful engine-owned compaction emits `after_compaction` even
with `compactedCount: 0`; failed or aborted attempts emit nothing.

**Subagents (4):** `subagent_spawned` · `subagent_ended` · `subagent_progress` ·
`subagent_delivery_target` (modify; *"The first returned `origin` wins"*).

Correlation trap worth naming: `subagent_ended` carries `targetSessionKey`, `targetKind`
(`"subagent"` or `"acp"`), `reason`, optional `outcome` (`ok` / `error` / `timeout` / `killed` /
`reset` / `deleted`), `runId`, `endedAt`, `accountId`, `sendFarewell` — and *"It does **not** include
`agentId` or `childSessionKey`; use `targetSessionKey` to correlate."*

**Lifecycle (8):** `gateway_start` / `gateway_stop` · `cron_reconciled` · `cron_changed` ·
`before_install` (modify/gate) · `skill_proposal_evaluate` (evaluate) · `skill_proposal_changed` ·
`skill_changed`.

## 2.3 Registration options

| Option | Effect |
|---|---|
| `matcher` | Non-empty list of **canonical OpenClaw tool ids** for `before_tool_call`/`after_tool_call`. *"Empty lists, wildcards, blanks, and provider-specific aliases are invalid"* |
| `priority` | Higher runs first |
| `registrationId` | Stable identity within a plugin; skill evaluators use it as `evaluatorId` |
| `timeoutMs` | Per-handler async await budget |
| `eligibleTriggers` | `before_agent_reply` only — `cron`, `heartbeat`, `user` |
| `eligibleDispatchKinds` | `reply_dispatch` only — `agent`, `acp` |
| `requiresToolAuthority` | `before_prompt_build` only; runs after the host finalizes the turn's tool surface and supplies ephemeral `ctx.toolAuthority` |

*"Trigger eligibility is enforced by the host before it invokes the handler."* Omitted, empty,
malformed **or partly unknown** lists *"remain unrestricted, so the hook runs for those turns."*

## 2.4 Timeouts and failure policy — fail closed, or log and continue

| Hooks | Default timeout | On thrown error or timeout |
|---|---|---|
| `before_agent_run`, `before_tool_call`, `before_install` | 15 s | **Fail closed** — block the run, tool call, or install |
| `before_agent_finalize`, `before_prompt_build`, `message_sending`, `reply_payload_sending`, `resolve_exec_env` | 15 s | Log and skip that handler; retain other results |
| `agent_end`, `before_compaction`, `after_compaction`, `skill_changed`, `skill_proposal_changed` | 30 s | Log and continue |
| `channel_pairing_requested` | 2 s | Log and continue |
| `gateway_stop` | 5 s | Log and continue shutdown |
| `skill_proposal_evaluate` | 120 s | Record an attributed error outcome |
| Other async hooks, including claim hooks | none unless configured | Log and continue |
| `tool_result_persist`, `before_message_write` | none (synchronous) | Sync errors logged; failed results ignored |

**A timeout bounds an await; it does not cancel anything.** *"A timed-out handler promise continues
running because hook callbacks do not receive a timeout-owned cancellation signal… The hook dispatch
can release its Gateway admission while that plugin work is still in progress."*

**The rule that follows:** *"For a policy requirement, use a fail-closed gate rather than assuming an
observation or delivery hook will reject the operation on failure."*

Operators override budgets without patching plugin code — `plugins.entries.<id>.hooks.timeouts.<hookName>`
beats `plugins.entries.<id>.hooks.timeoutMs`, which beats the plugin-authored value; both accept
positive integers up to `600000` ms.

Shutdown and restart share **one 2-second total `session_end` drain budget across all active sessions
and plugin handlers** — *"the budget is not per handler."* On expiry OpenClaw logs
`shutdown session-end drain timed out` and continues.

## 2.5 Not every runtime emits every hook

*"The catalog is the registration API, not a promise that every runtime emits every hook."*
`before_agent_run` is implemented by the embedded and CLI runners only; native tool, transcript and
compaction boundaries differ per hosted runtime — see
[`04`](./04-agent-runtimes-and-hosted-harnesses.md).

## 2.6 Deprecations named at this read

Plaintext channel envelopes in `inbound_claim` and `message_received` (prefer `event.bodyForAgent`
and `event.content`); `onResolution` in `before_tool_call` now uses the typed `PluginApprovalResolution`
union (`allow-once` / `allow-always` / `deny` / `timeout` / `cancelled`) instead of a free-form
string; `api.registerSessionExtension` and `api.enqueueNextTurnInjection` remain as top-level aliases
for `api.session.state.registerSessionExtension(...)` and
`api.session.workflow.enqueueNextTurnInjection(...)`.
