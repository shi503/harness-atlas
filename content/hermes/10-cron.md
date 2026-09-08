---
status: DRAFT
title: "Cron — a fresh session on a schedule, and its attempt ledger"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/cron"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Cron — a fresh session on a schedule, and its attempt ledger

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

Two facts shape everything else. A job runs in **a completely fresh agent session** — so the prompt
must be self-contained. And **inference settings are user-owned** — the agent that can create, pause,
edit and remove jobs cannot choose which model they burn.

---

## 1. The tick

*"Cron execution is handled by the gateway daemon. The gateway ticks the scheduler every 60 seconds."*
On each tick:

1. loads jobs from `~/.hermes/cron/jobs.json`
2. checks `next_run_at` against the current time
3. starts a fresh `AIAgent` session for each due job
4. optionally injects one or more attached skills into that fresh session
5. runs the prompt to completion
6. delivers the final response
7. updates run metadata and the next scheduled time

*"A file lock at `~/.hermes/cron/.tick.lock` prevents overlapping scheduler ticks from double-running
the same job batch."*

**Recursion is disabled**: *"Cron-run sessions cannot recursively create more cron jobs. Hermes disables
cron management tools inside cron executions to prevent runaway scheduling loops."*

## 2. Model resolution, and the drift guard

Resolution at fire time: **per-job pin → `cron.model` in `config.yaml` → the global default from
`hermes model`.**

| Layer | Who sets it |
|---|---|
| Per-job pin | **You** — dashboard, `hermes cron create/edit --model … --provider …`, or `jobs.json`. *"The agent's `cronjob` tool cannot set or change per-job models — inference pins are user-owned"* |
| `cron.model` / `cron.model_provider` | A cron-fleet default. *"switching your chat model with `hermes model` or `/model` never touches your cron fleet"* |
| Global default | Only when neither of the above is set |

**The unpinned case fails closed.** Hermes snapshots provider and model at creation; if the global
default later changes, the job *"skips the run, makes no inference call, and alerts you **once** — the
job stays skipped (and silent) on subsequent ticks until you act or the config is restored."* The
stated purpose: *"This prevents an unattended job from silently inheriting a switch to a paid
provider/model."*

A consumed finite one-shot cannot be updated — *"create a new future one-shot with an explicit provider
and model instead."*

Opting out is explicit:

```yaml
cron:
  model_drift_guard: false     # unpinned jobs follow every global change
```

> *"With the guard disabled, unattended unpinned jobs immediately inherit changed global defaults. A
> switch to a paid provider or model can therefore spend money on every scheduled run."*

**Per-job reasoning effort** is a separate pin — `none`, `minimal`, `low`, `medium`, `high`, `xhigh`,
`max`, `ultra` — set with `--reasoning-effort`, overriding both `agent.reasoning_effort` and
`agent.reasoning_overrides` for that job. Also *"deliberately not exposed on the agent's `cronjob`
tool — model configuration stays a user decision."* Unsupported levels *"are clamped or omitted by the
provider at request time"*, and it has no effect on a `no_agent` job.

## 3. Pre-dispatch validation

Before building any agent machinery, the scheduler checks that the run can succeed:

- the provider API key resolves — *"skipped when a `fallback_providers` chain is configured, since the
  fallback path may rescue a missing primary key"*
- attached skills are ready — *"no missing required environment variables, commands, or credential
  files"*
- delivery platform targets are known and credentialed — *"`local`/`origin` targets are never checked"*

On failure `last_status` becomes `blocked_config`, **one** alert is delivered (*"it is not repeated
every tick"*), and *"**no LLM call is made** — a misconfigured job never spends tokens."* The next
healthy run clears the state so a future break alerts again. `cron.preflight: false` restores the old
behaviour.

## 4. The execution ledger

*"Hermes records each claimed cron attempt in the profile-local `~/.hermes/cron/executions.db` before
executor or provider dispatch."*

```
claimed → running → completed | failed | unknown        (terminal states are immutable)
```

`unknown` is assigned narrowly: *"After restart, Hermes marks an abandoned attempt `unknown` only when
the original PID and process-start fingerprint prove that its owner is gone. Unknown attempts are audit
records and are never automatically rerun."*

`hermes cron runs [job-id] --limit 20` (alias `history`) inspects attempts. *"Terminal history is
bounded; active attempts are never pruned. The ledger is included in quick backups."*

### Replay protection, and its stated limits

Attempts record *"their exact scheduled instant, separately from the time they were claimed."* If an old
`jobs.json` snapshot re-arms an occurrence the ledger records as completed, *"Hermes skips that replay
and re-anchors recurring jobs"* — *"even when the snapshot predates the dispatch stamp or the original
run started late."* Manual runs *"do not consume a scheduled occurrence's identity."*

And the honest ceiling:

> *"This is not an exactly-once side-effect guarantee: legacy rows without an identity, pruned history,
> unavailable ledgers, and interrupted attempts cannot prove completion. Restoring the ledger itself to
> an older backup also removes that evidence."*

## 5. Schedule formats

| Form | Examples |
|---|---|
| **Relative delays** (one-shot) | `in 30m`, `in 2h`, `in 1d` |
| **Intervals** (recurring) | `30m` (*"bare durations are recurring"*), `every 30m`, `every 2h`, `every 1d`, `every hour` |
| **Natural day/time** (recurring) | `every monday 9am`, `every day at 9am`, `weekdays at 9am`, `weekends at 10am`, `daily at 7am`, `monday, wednesday at 9am` |
| **Cron expressions** | `0 9 * * *`, `0 9 * * 1-5`, `0 9 * * MON-FRI`, `0 */6 * * *`, `30 8 1 * *`, `0 0 * * 0` |
| **ISO timestamps** (one-time) | `2026-03-15T09:00:00` |

Times accept `9am`, `9:30pm`, `14:00`, bare 24-hour hours (`at 7`), `noon` and `midnight`. Natural
forms *"compile to cron expressions internally (they require the `croniter` package, installed by
default)."*

## 6. No-agent mode — a script on a schedule

`no_agent=True` skips the agent entirely: *"The scheduler runs your script on schedule and delivers its
stdout directly."*

```bash
hermes cron create "every 5m" \
  --no-agent --script memory-watchdog.sh \
  --deliver telegram --name "memory-watchdog"
```

| Outcome | Behaviour |
|---|---|
| Script stdout (trimmed) | Delivered verbatim as the message |
| **Empty stdout** | **Silent tick, no delivery** — *"the watchdog pattern: 'only say something when something is wrong'"* |
| Non-zero exit or timeout | An error alert is delivered — *"a broken watchdog can't fail silently"* |
| `{"wakeAgent": false}` on the last line | Silent tick — the same gate LLM jobs use |

*"No tokens, no model, no provider fallback — the job never touches the inference layer."*

Two constraints on the script itself:

- **Interpreter**: `.sh` / `.bash` run under `bash` from `PATH` when available, *"otherwise `/bin/bash`
  (important on Windows Git Bash)"*; anything else runs under `sys.executable`.
- **Location**: *"Scripts must resolve inside `$HERMES_HOME/scripts/` — relative names, absolute paths,
  and `~`-prefixed paths are accepted when the resolved target stays in that directory; paths that
  escape it are rejected."*
- **Environment**: sanitized via `_sanitize_subprocess_env` — *"provider API credentials and other
  Hermes-managed secrets are **not** inherited by cron scripts."*

The agent can wire one up end to end: it writes the check script to `~/.hermes/scripts/` with
`write_file`, then calls `cronjob(action="create", …, no_agent=True)`, choosing `no_agent` *"when the
message content is fully determined by the script."*

## 7. Skills, workdir and chaining

- **Skills.** A job carries `skill` / `skills` — *"zero, one, or multiple"* — injected into the fresh
  session. A skill named by any job (including a paused or disabled one) is protected from curator
  auto-transitions — see [`06` §2](./06-curator.md#2-phase-1--deterministic-transitions).
- **Project directory.** A job's `workdir` sets where it runs; project skills load only if that repo was
  previously trusted — see [`03` §4](./03-skills.md#4-where-skills-are-found-and-which-wins).
- **Chaining.** *"Cron jobs run in isolated sessions with no memory of previous runs."* `context_from`
  wires one job's most recent output into another's prompt at runtime.
- **Timeout.** `cron.script_timeout_seconds`, default 3600.
- **Failure nudge.** `cron.failure_nudge_threshold` (default **3**, `0` disables) adds a review nudge to
  a delivered message once a job has failed that many consecutive runs. *"One-shot jobs never nudge."*

## 8. Storage

Jobs are plain JSON at `~/.hermes/cron/jobs.json`; output lands in
`~/.hermes/cron/output/{job_id}/{timestamp}.md`. *"Job definitions … survive `hermes update`, gateway
restarts, and machine reboots."* Writes are atomic *"so interrupted writes do not leave a partially
written job file behind."* `model` and `provider` are stored as `null` when unpinned and resolved at
execution time — *"They only appear in the job record when a per-job override is set."*

**Do not patch `jobs.json` directly.** The stated reason is a silent failure: *"Direct edits can fail
silently when file write safety blocks the path (for example when `HERMES_WRITE_SAFE_ROOT` is set), and
the file-mutation verifier footer is the authoritative signal that nothing was saved."* Use the
`cronjob` tool, `hermes cron`, or `/cron`.

## 9. Self-contained prompts, and prompt scanning

> *"Cron jobs run in a completely fresh agent session. The prompt must contain everything the agent
> needs that is not already provided by attached skills."*

The documentation's own contrast is `"Check on that server issue"` against `"SSH into server
192.168.1.100 as user 'deploy', check if nginx is running with 'systemctl status nginx', and verify
https://example.com returns HTTP 200."`

Prompts are scanned at creation and update time: *"Prompts containing invisible Unicode tricks, SSH
backdoor attempts, or obvious secret-exfiltration payloads are blocked."*

## 10. Headless approval posture

A cron job that trips a dangerous-command prompt has no human to answer it. `approvals.cron_mode`
governs the outcome and defaults to `deny` — see
[`08` §2](./08-approvals-and-write-safety.md#2-approval-configuration). The hardline blocklist applies
regardless of that setting, including when `cron_mode: approve`.
