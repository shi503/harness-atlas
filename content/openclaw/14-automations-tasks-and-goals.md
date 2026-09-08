---
status: DRAFT
title: "Automations, tasks, flows, and goals"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Automations, tasks, flows, and goals

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

Six task-shaped objects coexist here, and the docs draw the boundaries themselves. Start with the
vendor's own routing table before reaching for any of them:

| Scenario | Use |
|---|---|
| Single background job | A plain **task** |
| Multi-step pipeline driven by plugin code | **Task Flow** (managed) |
| Detached ACP or subagent spawn | **Task Flow** (mirrored, created automatically) |
| One-shot reminder | An **automation** job |
| A concrete outcome to keep visible across many turns of one session | A **goal** |
| A standing policy in prose | **Standing orders** |
| "When X happens, remind me" | A **standing intent** — [`07`](./07-memory-dreaming-and-the-knowledge-wiki.md) |

The disclaimers are the vendor's: *"A goal is not a task queue."* The Workboard plugin's Kanban cards
are *"not a replacement for GitHub Issues, Linear, Jira."*

---

## 1. Automations (cron)

The scheduler *"runs inside the Gateway process, not inside the model."* Five schedule kinds:

| Kind | Flag | Description |
|---|---|---|
| `at` | `--at` | One-shot timestamp, ISO 8601 or relative (`20m`) |
| `every` | `--every` | Fixed interval (`10m`, `1h`, `1d`) |
| `cron` | `--cron` | 5- or 6-field expression, optional `--tz` |
| `on-exit` | `--on-exit` | *"Fire once when a watched command exits… survives turn teardown"*; optional `--on-exit-cwd` |
| `stream` | `--stream-command` | *"Fire from batched lines produced by a supervised long-lived command"* |

Timestamps without a timezone are UTC. `--tz` interprets an offset-less `--at` or evaluates a cron
expression in an IANA zone; cron without `--tz` uses the Gateway host zone. *"`--tz` is not valid with
`--every` or `--on-exit`."*

**Top-of-hour expressions are staggered by default** — minute `0` with a wildcard hour is *"staggered
by up to 5 minutes to reduce load spikes."* `--exact` forces precise timing; `--stagger 30s` sets an
explicit window (cron only).

Delivery is `announce` / `webhook` / `none`; jobs persist in SQLite.

### Stream sources

A stream schedule keeps an operator-authored argv command running under the Gateway. *"Stream
schedules are event-driven, never time-due."* `mode: "line"` accepts every line; `mode: "match"` only
lines matching the compiled regex. A batch closes after `batchMs` of quiet (default **250 ms**,
clamped 50–5000) or at `maxBatchBytes` (default **16384**, clamped 1024–65536), where it ends with
`[truncated]`.

*"Match mode always evaluates complete lines against their full text, even past `maxBatchBytes`… a
line cut at the bounded raw-intake limit is only a prefix, so it is treated as unmatched rather than
letting an end-anchored pattern fire on the cut."*

Backpressure is bounded, not queued: *"Only one payload fire and one bounded pending batch are
retained per job."* Later lines coalesce, counted in `streamCoalescedBatches`; drops in
`streamDroppedBatches`. *"Failed payloads are not retried because they may not be idempotent."* Five
consecutive runs shorter than 60 seconds leave the job in an error state.

### Event triggers (condition watchers)

A headless condition script on an `every`, `cron` or `stream` schedule, returning
`{ fire, message?, state? }`. Previous state arrives as the **deeply frozen** `trigger.state`; stream
gates also get `trigger.streamBatch`. **State is capped at 16 KB.** `once: true` disables the job
after its first fired payload.

Budgets: *"Trigger schedules have a built-in minimum interval of 30 seconds. Each evaluation has a
30-second wall-clock budget and up to 5 tool calls."*

**The failure semantics are load-bearing:** *"If a fired payload run fails, the returned `state` is
**not** persisted — the next evaluation sees the previous state and can fire again, so write scripts as
read-only checks and keep actions in the payload."*

Authoring advice with a real failure mode behind it: *"Author watchers around **actionable state**,
not only success: a watcher that goes quiet when its check fails or times out looks healthy while
broken."*

> **The warning the vendor prints:** *"Condition-trigger scripts and `script` payloads run unattended
> by default with the owning agent's **full tool policy, including `exec`**. Stream schedules also keep
> operator-authored commands running unattended. Treat these surfaces as unattended code execution
> with that agent's permissions."*

The hard stop is `cron.triggers.enabled: false`, which disables condition scripts, script payloads
**and** stream schedules together.

Approvals raised by automation runs behave differently from interactive ones — see
[`13`](./13-tool-policy-approvals-and-sandboxing.md) §4.

---

## 2. Tasks — the activity ledger

Five sources create task records, each with its own default notification policy:

| Source | Runtime type | Default notify |
|---|---|---|
| ACP background runs | `acp` | `done_only` |
| Subagent orchestration | `subagent` | `done_only` |
| Automation jobs (all types) | `cron` | `silent` |
| CLI operations through the gateway | `cli` | `silent` |
| Session-backed media generation | `cli` | `silent` |

**What does not create a task:** *"Heartbeat turns… Normal interactive chat turns… Direct `/command`
responses."*

### Lifecycle

`queued` → `running` → `succeeded` \| `failed` \| `timed_out`; `queued`/`running` → `cancelled`;
`queued`/`running` → `lost` after *"a 5-minute grace period"* without authoritative backing state.

**`blocked` is a terminal outcome, not a status.** *"Execution and result delivery are separate. A
subagent task can remain `succeeded` while its `deliveryStatus` is `session_queued` or `failed`. The
terminal outcome is `succeeded` after delivery and `blocked` when the work finished but the result
could not be handed back."* Blocked tasks appear in both `--status blocked` and `--status succeeded`,
*"because the underlying execution succeeded."*

**Terminal states do not downgrade.** *"an operator-cancelled or already-`failed`/`timed_out`/`lost`
task stays that way even if a success signal arrives afterwards."*

`lost` is runtime-aware, and the rules differ per runtime: for ACP, *"only a live in-process ACP turn
in the Gateway proves the run is alive; persisted session metadata alone does not"*; for subagents,
the child session disappeared or carries a restart-recovery tombstone; for automations, the runtime no
longer tracks the job and durable history shows no terminal result. *"Offline CLI audit stays
conservative and never reclaims ACP tasks."*

### Delivery

**Direct** to the channel target when `requesterOrigin` exists — *"Group and channel task completions
are instead routed through the requester session so the parent agent can write the visible reply."*
**Session-queued** otherwise: *"the update is queued as a system event in the requester's session and
surfaces on the next heartbeat."*

Storage: `~/.openclaw/state/openclaw.sqlite`, `task_runs`. CLI: `openclaw tasks list|show|cancel|audit`,
the `/tasks` chat board, and a Control UI tab.

---

## 3. Task Flow

*"durable record of multi-step work with its own status, JSON state, revision counter."* Two sync
modes:

**Managed** — plugin code creates the flow with a goal and controller id and drives it. *"`createManaged`
creates state, not an execution. `runTask` links an existing execution; it does not launch one."*
Transitions (`setWaiting`, `resume`, `finish`, `fail`, `requestCancel`) *"require the latest expected
revision. Check every result, including `finish`."*

Linking has an authority rule worth quoting because it closes an obvious forgery path: *"Linking
requires the existing authoritative backing task, its canonical `runId` and child session key, the
correct task runtime and the same owner session… **A copied session key or invented run ID is not
authority.**"*

**Mirrored** — created automatically when a detached ACP or subagent run starts, *"so detached spawns
get a stable flow handle for status and retry surfaces without a controller."* Shown as sync mode
`task_mirrored`.

### Flow statuses — eight

| Status | Meaning |
|---|---|
| `queued` | Created, not yet progressing |
| `running` | Actively progressing |
| `waiting` | Managed flow parked on wait metadata (timer, external event) |
| `blocked` | Waiting on a blocking condition, **or** ended without a usable result |
| `succeeded` · `failed` | Terminal |
| `cancelled` | Cancel requested and all child tasks settled |
| `lost` | Lost its authoritative backing state |

*"`blocked` is the only status whose terminal meaning depends on the record. A managed flow with no
`endedAt` remains resumable. A `blocked` flow with `endedAt` is finished."*

**Durability covers records, not execution.** *"Waiting metadata alone does not register a timer or
event listener. Use an automation or controller-owned event handler for wakeups; never blindly replay
side effects after a revision conflict."* Records live in `flow_runs`; each write bumps `revision` and
a stale expected revision gets a conflict. Retention: **7 days after finishing**, except *"resumable
managed `blocked` flows are retained regardless of age."*

---

## 4. Goals — session-scoped, budgeted

*"one durable objective attached to the current OpenClaw session."* Six statuses:

| Status | Meaning |
|---|---|
| `active` | The session is pursuing it |
| `paused` | Operator paused it; `/goal resume` reactivates |
| `blocked` | A real blocker was reported |
| `budget_limited` | The token budget was reached |
| `usage_limited` | *"reserved for a future usage-limit stop state"* |
| `complete` | Terminal — *"use `/goal clear` before starting another goal"* |

*"`/new` and `/reset` clear the current session goal."*

**Token budgets** are set through `create_goal`'s `token_budget` and *"measured from the session's
fresh token count at goal-creation time."* If only a stale snapshot exists, OpenClaw waits for the
next fresh one *"so tokens spent before the goal existed are not charged to it."* Reaching the budget
moves the goal to `budget_limited` — *"it tells the operator and the agent that the goal is no longer
actively being pursued until it is resumed or cleared."* Resuming opens a new window.

> *"Token budgets are a session-goal guardrail, not a billing cap."*

---

## 5. Heartbeat — a system-owned automation

*"a system-owned automation that runs periodic agent turns in the main session."*

| Default | Value |
|---|---|
| Interval | `30m`; Anthropic OAuth/token auth bumps it to `1h` **only while `heartbeat.every` is unset**. `0m` disables the cadence |
| Delivery target | `owner` — first concrete `commands.ownerAllowFrom`, then channel `allowFrom`, and *"never sends this route to a group"*. `target: "last"` follows the recent conversation; `"none"` is internal-only |
| Timeout | `agents.defaults.timeoutSeconds` if set, else the cadence **capped at 600 seconds** |
| Active hours | `heartbeat.activeHours`, checked in the configured timezone; outside it, skipped until the next tick inside |

**The prompt is sent verbatim** as the scheduled user message, and *"Heartbeat runs use the same
system prompt as ordinary agent turns; there is no heartbeat-specific system-prompt section."* The
default body is deliberately narrow and tells the agent *"not to infer or repeat old tasks from prior
chats, so a default install stays quiet."*

**Response contract:** reply `NO_REPLY` when nothing needs attention, or call `heartbeat_respond` with
`notify: false` (silent, *"remembered as bounded internal context for the next user turn"*) or
`notify: true` plus `notificationText`. *"When present, the structured tool response takes precedence
over the text fallback."* The legacy `HEARTBEAT_OK` acknowledgment is accepted *"at the **start or end**
of a reply"* and drops the reply when the remainder is at most **300 characters**; in the middle it
*"is not treated specially."*

**Deferral rules:** scheduled heartbeats defer while the main queue or automation work is active or
queued, while any reply or embedded run for the same agent is active, and while the target session has
active work. *"Immediate and manual wakes bypass the broad same-agent active-run check, but still
honor the main, automation, and target-session busy guards. Sibling agents do not pause each other."*

**Heartbeat scratch is prose only now.** *"Runtime heartbeats do not parse `tasks:` text as
schedules; create new recurring work as automations."* `openclaw doctor --fix` converts an older
structured `tasks:` block into ordinary automation jobs, preserving interval and last-run timing.

*"a heartbeat run itself does not create a task record."*

---

## 6. Standing orders and the Workboard

**Standing orders** are policy in `AGENTS.md` prose — programs with named execution steps, explicit
"what NOT to do" sections, escalation rules and response matrices. They are guidance, not enforcement
([`02`](./02-agents-workspaces-and-the-context-engine.md)).

**Workboard** is a plugin providing Kanban cards, with the vendor's own scope disclaimer above.

---

## 7. Webhooks

HTTP ingress that lets another service start work, documented under
`/automation/cron-jobs/webhooks` with a dedicated Gmail path
(`/automation/cron-jobs/gmail`) and IMAP ingress at `/automation/imap`. Hook HTTP contract, agent
payload, session policy, mapping and retries live in `/gateway/config-hooks`.
