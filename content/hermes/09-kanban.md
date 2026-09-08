---
status: DRAFT
title: "Kanban — the task, the lane, and the lifecycle it owns"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/kanban · .../features/kanban-worker-lanes"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Kanban — the task, the lane, and the lifecycle it owns

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

The hierarchy the vendor draws, and the sentence the whole design rests on:

```text
Hermes Kanban  =  canonical task lifecycle + audit trail
Worker lane    =  implementation executor for one assigned card
Reviewer       =  human or human-proxy that gates "done"
GitHub PR      =  upstreamable artifact (optional, for code lanes)
```

> *"Hermes Kanban owns lifecycle truth — `ready` → `running` → `review` / `blocked` / `done` /
> `archived`. Worker lanes execute work but never own that truth; everything they do flows back through
> the kanban kernel via the `kanban_*` tools."*

---

## 1. Core concepts

| Concept | Definition |
|---|---|
| **Board** | *"a standalone queue of tasks with its own SQLite DB, workspaces directory, and dispatcher loop."* A new install has exactly one, `default` |
| **Task** | *"a row with title, optional body, one assignee (a profile name), status (`triage \| todo \| ready \| running \| blocked \| review \| done \| archived`), optional tenant namespace, optional idempotency key"* |
| **Link** | A `task_links` row recording parent → child. *"The dispatcher promotes `todo → ready` when all parents are `done`"* |
| **Comment** | *"the inter-agent protocol. Agents and humans append comments; when a worker is (re-)spawned it reads the full comment thread as part of its context"* |
| **Workspace** | The directory a worker operates in — three kinds, below |
| **Dispatcher** | *"a long-lived loop that, every N seconds (default 60): reclaims stale claims, reclaims crashed workers …, promotes ready tasks, atomically claims, spawns assigned profiles"* |
| **Tenant** | *"optional string namespace *within* a board … Tenants are a soft filter; boards are the hard isolation boundary"* |

## 2. The three workspace kinds

| Kind | Path | On completion |
|---|---|---|
| `scratch` (default) | `~/.hermes/kanban/workspaces/<id>/` (or under `boards/<slug>/` on non-default boards) | **Deleted** — *"scratch is ephemeral by design"* |
| `dir:<path>` | An existing shared directory — *"Obsidian vault, mail ops dir, per-account folder"* | **Preserved** |
| `worktree` | A git worktree under `.worktrees/<id>/`; `worktree:<path>` pins the target | **Preserved** |

**Scratch cleanup has an escape hatch and a failure mode.** Files declared through
`kanban_complete(artifacts=[...])` *"are copied into durable per-task attachment storage before
cleanup; existing deliverable paths in legacy completion summaries receive the same treatment. Other
scratch files are removed."* And: *"A missing declared scratch artifact keeps the task in-flight so the
worker can correct the path and retry."* The first scratch workspace on an install logs a warning and
emits a `tip_scratch_workspace` event on the task.

**`dir:` must be absolute.** *"Relative paths like `dir:../tenants/foo/` are rejected at dispatch
because they'd resolve against whatever CWD the dispatcher happens to be in, which is ambiguous and a
confused-deputy escape vector."* Beyond that the path is trusted: *"it's your box, your filesystem, the
worker runs with your uid. This is the trusted-local-user threat model."*

## 3. Boards

> *"Per-board isolation is absolute"* — a separate SQLite DB at
> `~/.hermes/kanban/boards/<slug>/kanban.db` (the `default` board stays at `~/.hermes/kanban.db` for
> back-compat), separate `workspaces/` and `logs/`, and workers that *"see **only** their board's
> tasks"* because the dispatcher pins `HERMES_KANBAN_BOARD` in the child environment.

*"Linking tasks across boards is not allowed (keeps the schema simple)."* Board slugs are immutable —
only the display name can be renamed. Archiving moves the directory to `boards/_archived/<slug>-<ts>/`
and is recoverable by moving it back; hard delete is *"`rm -rf` the board dir. No recovery."*

## 4. The dispatcher

Runs **inside the gateway** by default (`kanban.dispatch_in_gateway: true`). *"One dispatcher sweeps all
boards per tick."*

`_default_spawn` runs `hermes -p <assignee> chat -q <prompt>` — *"(or the equivalent module form when
the `hermes` shim isn't on `$PATH`)"* — inside the task's pinned workspace, with these variables set:

| Variable | Carries |
|---|---|
| `HERMES_KANBAN_TASK` | the task id the worker is operating on |
| `HERMES_KANBAN_DB` | absolute path to the per-board SQLite file |
| `HERMES_KANBAN_BOARD` | board slug |
| `HERMES_KANBAN_WORKSPACES_ROOT` | root of the board's workspace tree |
| `HERMES_KANBAN_WORKSPACE` | absolute path to *this* task's workspace |
| `HERMES_KANBAN_RUN_ID` | the current run's id (for the lifecycle gate) |
| `HERMES_KANBAN_CLAIM_LOCK` | the claim lock string (`<host>:<pid>:<uuid>`) |
| `HERMES_PROFILE` | the worker's own profile name (for `kanban_comment` author attribution) |
| `HERMES_TENANT` | tenant namespace, if the task has one |

An unresolvable assignee leaves the task on `ready` with a `skipped_nonspawnable` event — *"they are
not silently dropped or executed by an arbitrary fallback."* After `kanban.failure_limit` consecutive
spawn failures on the same task (default **2**) the dispatcher auto-blocks it with the last error.

### Descendant process scope

The assignment belongs to the dispatcher worker, not to everything it starts:

> *"Hermes subprocess helpers carry a non-owner fence into shells, execution kernels, cron deliveries,
> hooks, language servers, and ordinary stdio MCP servers. Later children remain fenced even when a
> script removes the inherited task ID: CLI and tool mutations are rejected, rather than treating that
> script as an orchestrator."*

Workers *"may only perform lifecycle handoffs and attach files to their assigned task; `unblock` remains
orchestrator-only."* Integration authors are pointed at
`agent.delegation_context.delegated_child_subprocess_env`, *"at the actual spawn, after merging
environment overrides."*

And its stated limit: *"This is cooperative runtime scoping, **not OS confinement**: it does not prevent
arbitrary code from deliberately erasing lineage metadata or opening SQLite directly."*

## 5. The lifecycle terminator — exactly one

> *"Every claim must end in exactly one of"*:

| Terminator | Result |
|---|---|
| `kanban_complete(summary=…, metadata=…)` | Status flips to `done` |
| `kanban_request_review(summary=…, metadata=…, reviewer=…)` | Status flips to `review`; the dispatcher loads the bundled `sdlc-review` skill unless `kanban.review_dispatch` is disabled |
| `kanban_block(reason=…)` | Status flips to `blocked`; *"The dispatcher respawns when `kanban_unblock` runs"* |
| The process exits without a tool call | The kernel reaps it and emits `crashed`, `gave_up`, or `timed_out` — *"This is the failure path"* |

> *"The kanban kernel enforces that exactly one of these terminates each run. A worker that calls
> neither and exits normally is treated as crashed."*

A reviewer approves with `kanban_complete`, returns rework with `kanban_request_changes`, or escalates a
genuine external blocker with `kanban_block`.

**Do not put secrets in a handoff**: *"Do not place secrets, tokens, or raw PII in `summary` or
`metadata`; run rows are durable."*

The worker- and orchestrator-side contract is not documentation the agent has to find — it is injected:
*"the kanban lifecycle and reference details are injected into the worker's system prompt automatically
(the `KANBAN_GUIDANCE` block in `agent/prompt_builder.py`)."*

## 6. Lane shapes

| Lane | Shape |
|---|---|
| **Hermes profile lane** (default) | Assignee is a profile name; the dispatcher spawns `hermes -p <profile>`; `KANBAN_GUIDANCE` is injected; `kanban_*` tools terminate the run. *"No setup beyond defining the profile"* |
| **Orchestrator profile lane** | *"a Hermes profile whose toolset includes `kanban` but excludes `terminal` / `file` / `code` / `web` for implementation. Its job is decomposing a high-level goal into child tasks via `kanban_create` + `kanban_link` and stepping back"* |
| **Plugin lane** | A registered non-spawnable identifier; the plugin supplies its own `spawn_fn` receiving `task`, `workspace`, `board` and returning an optional pid for crash detection |

There is **no fixed roster**: *"The orchestrator … discovers your profile names via `hermes profile
list` — there's no fixed roster the system assumes."*

**An external CLI lane is documented as not-yet-paved.** *"`spawn_fn` is a parameter on
`dispatch_once`, and a plugin could register its own `spawn_fn` for a non-Hermes assignee, but the
surrounding integration work … is still per-integration design work."* The contract above is stated as
*"the constraints any such lane must satisfy"*, with the implementation shape left open.

## 7. Failure modes the dispatcher already handles

| Mode | Behaviour |
|---|---|
| **Stale claim TTL** | Reclaimed after `DEFAULT_CLAIM_TTL_SECONDS` (**15 min** default) — *"but only if the worker process has actually died. A live worker (slow model spending 20+ min in one tool-free LLM call) gets the claim *extended* instead of killed"* |
| **Crashed worker** | A vanished host-local PID is detected by `detect_crashed_workers`; `consecutive_failures` increments and the task *"may auto-block when the breaker trips"* |
| **Run-level retry** | The `expected_run_id` parameter on terminating tools lets a worker *"fail fast if its own run was already superseded"* |
| **Per-task max runtime** | `task.max_runtime_seconds` hard-caps wall clock *"regardless of PID liveness. Catches genuinely-deadlocked workers"* |
| **Stranded-task detection** | A ready task with no claim within `kanban.stranded_threshold_seconds` (default **30 min**) surfaces in `hermes kanban diagnostics`; severity escalates to error at 2× and critical at 6×. *"Catches typo'd assignees, deleted profiles, and down external worker pools in one signal"* |
| **Review dependency deadlock** | A parent sticky-blocked with `review-required:` while children remain dependency-gated in `todo` produces an immediate `review_dependency_deadlock` error. *"The diagnostic is read-only … but never removes a user block automatically"* |

## 8. The event reference

*"Every transition appends a row to `task_events`."* Each row carries an optional `run_id` *"so UIs can
group events by attempt"*, and kinds fall into three clusters for filtering
(`hermes kanban watch --kinds completed,gave_up,timed_out`).

### Lifecycle

| Kind | Payload | When |
|---|---|---|
| `created` | `{assignee, status, parents, tenant}` | Task inserted. `run_id` is `NULL` |
| `promoted` | — | `todo → ready` because all parents hit `done` |
| `claimed` | `{lock, expires, run_id}` | Dispatcher atomically claimed a `ready` task |
| `completed` | `{result_len, summary?}` | Task hit `done`. `summary` is the first-line handoff, **400-char cap**; the full version lives on the run row |
| `blocked` | `{reason, kind, recurrences}` | `kind` is the typed reason — `needs_input`, `capability`, `transient`, or `null` |
| `dependency_wait` | `{reason, kind}` | Blocked with `kind=dependency` — routes to `todo` (parent-gated, auto-promoted) instead of `blocked`. *"No human needed"* |
| `block_loop_detected` | `{reason, kind, recurrences, limit}` | Unblocked and re-blocked for the same reason `BLOCK_RECURRENCE_LIMIT` times (default **2**) — routes to `triage` *"breaking the unblock↔re-block loop"* |
| `unblocked` | — | Resets `consecutive_failures` but *"deliberately preserves `block_recurrences` so the loop breaker keeps its memory"* |
| `archived` | — | Hidden from the default board |

### Edits

| Kind | Payload |
|---|---|
| `assigned` | `{assignee}` — including unassignment |
| `edited` | `{fields}` — title or body |
| `reprioritized` | `{priority}` |
| `status` | `{status}` — a dashboard drag-drop wrote a status directly |

### Worker telemetry

| Kind | Payload | When |
|---|---|---|
| `spawned` | `{pid}` | Dispatcher started a worker process |
| `heartbeat` | `{note?}` | Worker signalled liveness during a long operation |
| `reclaimed` | `{stale_lock}` | Claim TTL expired without completion |
| `crashed` | `{pid, claimer}` | Worker PID gone but TTL had not expired |
| `timed_out` | `{pid, elapsed_seconds, limit_seconds, sigkill}` | `max_runtime_seconds` exceeded; SIGTERM then SIGKILL after **5 s** grace |
| `stale` | `{elapsed_seconds, last_heartbeat_at, heartbeat_age_seconds, timeout_seconds, pid, terminated}` | Ran past `kanban.dispatch_stale_timeout_seconds` (default **4 h**) **and** no heartbeat in the last hour. *"Does NOT tick the failure counter (stale is dispatcher-side absence detection, not a worker fault)"* |
| `reconciled` | `{reason, claim_lock, claim_expires, worker_pid}` | Orphaned card with broken claim bookkeeping and no live worker — *"none of the TTL/crash/stale paths could ever recover it."* Gated by `kanban.reconcile_orphans` (default `true`) |
| `respawn_guarded` | `{reason}` | Refused to re-spawn this tick — `blocker_auth`, `recent_success`, or `active_pr` |
| `spawn_failed` | `{error, failures}` | One spawn attempt failed; counter increments, task returns to `ready` |
| `protocol_violation` | `{pid, claimer, exit_code, protocol_violation}` | *"Worker exited successfully while the task was still `running`, usually because it answered without calling `kanban_complete` or `kanban_block`"* |
| `gave_up` | `{failures, effective_limit, limit_source, error}` | Circuit breaker fired; task auto-blocks with the last error |

**The three `respawn_guarded` reasons**, each a deliberate pause rather than a failure:
`blocker_auth` (*"last failure was a quota/auth/429 error — wait for the rate window to reset"*),
`recent_success` (*"a completed run happened in the last hour — wait for review before re-running"*),
`active_pr` (*"a GitHub PR URL appears in a recent comment — a prior worker already opened a PR"*).

**Protocol violations get their own retry budget**: up to `_PROTOCOL_VIOLATION_FAILURE_LIMIT` (default
**3**) *consecutive* violations, with per-task `max_retries` overriding; below the bound the task simply
returns to `ready`, and at the bound the dispatcher also emits `gave_up` and auto-blocks.

`gave_up`'s effective limit resolves in order: *"task `max_retries`, then dispatcher `failure_limit` /
`kanban.failure_limit`, then the built-in default."*

## 9. Runs and the audit trail

Worker stdout/stderr goes to `<board-root>/logs/<task_id>.log`, and the row-level record is durable:

- `task_runs` rows carry *"the `log_path`, exit code (where available), summary, and metadata."*
- `task_events` rows carry every transition.
- *"`kanban_show` returns both, so a reviewer (or a follow-up worker) reading the task gets the full
  history without needing dashboard access."*

`hermes kanban tail <task_id>` follows live; `hermes kanban runs <task_id>` lists historical attempts;
`hermes kanban watch` streams events board-wide.

## 10. What it deliberately is not

> *"Kanban is deliberately single-host. `~/.hermes/kanban.db` is a local SQLite file and the dispatcher
> spawns workers on the same machine. Running a shared board across two hosts is not supported — there's
> no coordination primitive for 'worker X on host A, worker Y on host B,' and the crash-detection path
> assumes PIDs are host-local."*

The stated workaround: *"run an independent board per host and use `delegate_task` / a message queue to
bridge them."*

The complete design — *"architecture, concurrency correctness, comparison with other systems,
implementation plan, risks, open questions"* — is a PDF in the repository at
`docs/hermes-kanban-v1-spec.pdf`, not on the documentation site. It was listed, not opened, at this
read.
