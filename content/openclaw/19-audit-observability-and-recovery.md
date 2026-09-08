---
status: DRAFT
title: "Audit, observability, recovery, and the maturity scorecard"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Audit, observability, recovery, and the maturity scorecard

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

Four evidence surfaces, and each one states its own limits. That is the through-line: the audit
ledger says what it does not prove, telemetry says what it does not measure, recovery says what it
does not resume, and the scorecard scores the product rather than a deployment.

---

## 1. The audit ledger

*"The Gateway keeps a bounded, metadata-only audit ledger in the shared OpenClaw state database."* It
answers *"which agent ran, when, and how did it end"*, *"which tool actions did a run execute"*, and —
when message auditing is on — whether an inbound message reached dispatch and an outbound one reached
a terminal state.

**What it stores:** *"identity, ordering, provenance, action, status, and normalized outcome codes."*

**What it never stores:** *"prompts, message bodies, tool arguments, tool results, attachments,
filenames, URLs, command output, or raw error text."*

### Three record families

| Family | Actions | Default |
|---|---|---|
| Agent runs | `agent.run.started`, `agent.run.finished` | **on** |
| Tool actions | `tool.action.started`, `tool.action.finished` | **on** |
| Messages | `message.inbound.processed`, `message.outbound.{queued,platform-started,finished}` | **off** |

Every record carries a stable event id, a monotonic owner sequence, a lifecycle timestamp, actor,
action, status, `schemaVersion: 1` and `redaction: "metadata_only"`.

`logging.audit.messages` takes `off` (default), `direct`, or `all`. **`direct` is a privacy boundary
enforced by proof**: *"a message is classified as a direct conversation only when destination facts
prove it… Weaker signals, such as policy state or the originating conversation, can classify a message
as `group` (excluding it from `direct` collection) but can never claim `direct`. Messages that cannot
be proven direct are classified `unknown` and are not recorded in `direct` mode."*

### Pseudonyms, and what they are not

Account, conversation, message and target identifiers export **only** as installation-local keyed
pseudonyms `hmac-sha256:v1:<keyId>:<digest>`. The key is generated on first use, domain-separated per
identifier kind, and lives in the same database.

> *"This is **correlation, not anonymization**: anyone with read access to the state database also has
> the key and can test candidate raw identifiers against the pseudonyms. RPC and CLI exports never
> include the key."*

### Run identity inspection

Execution-identity recording is **off by default, including on fresh installs and upgrades**, and
needs both `logging.audit.enabled` and `logging.audit.executionIdentity` true plus a restart.
*"no environment-variable alias or silent migration enables the feature."* Retained contexts stay
inspectable for 30 days.

Terminal operator approvals, shared outbound delivery, and scheduled/task/flow runs are
**owner-native** sources: run inspection adapts or joins them directly and *"does not copy approvals
into the audit ledger or the generic decision-fact table."* A `runId` alone *"never joins one of these
rows to an execution."*

### Coverage limits, stated as such

> *"Treat it as evidence of what was recorded, not as proof of what happened."*
> *"**Absence of a row proves nothing.** Pre-admission inbound drops, sends from plugin-local or
> direct-send paths that bypass shared durable delivery, a dropped admission envelope, and crash-lost
> queued work can leave no record."*
> *"It is not a lossless compliance archive; if you need one, use an external system fed by
> OpenTelemetry or channel-level tooling."*

Crash-ambiguous outbound sends record `unknown` *"rather than invented outcomes."*

### Retention

Queries never return records older than **30 days**; `audit_events` caps at **100,000 rows**, pruned
at startup, hourly, and on later writes, *"at most 1,024 expired rows"* per transaction.
`outbound_message_progress` holds non-terminal outbound rows, capped at **200,000** with the same 30
days; it is *"created idempotently only on the first enabled progress write"* and stays absent
otherwise. *"Retention maintenance keeps running even when collection is disabled."*

CLI and RPC: `openclaw audit`, and `audit.activity.list`
([`16`](./16-the-gateway-protocol-and-apis.md)).

---

## 2. OpenTelemetry and Prometheus

Export goes through the official **`diagnostics-otel`** plugin over **OTLP/HTTP (protobuf)**, with an
optional stdout-JSONL mirror for container log pipelines.

*"Exporters attach only when both the diagnostics surface and the plugin are enabled, so in-process
cost stays near zero by default."*

Named spans include `openclaw.run`, `openclaw.model.call`, `openclaw.tool.execution` and
`openclaw.exec`. Representative metrics: `openclaw.tool.execution.duration_ms` (histogram),
`openclaw.tool.execution.blocked` (counter, with `openclaw.deniedReason`), `openclaw.tool.loop`,
`openclaw.exec.duration_ms` (attrs `openclaw.exec.target`, `.mode`, `openclaw.outcome`,
`openclaw.failureKind`), `openclaw.skill.used`.

**Trace context reaches the provider, but only from the real span.** *"Provider calls receive a W3C
`traceparent` header from the actual current OpenTelemetry model-call span when the provider transport
accepts custom headers. Diagnostic IDs remain local correlation keys, and **plugin-emitted trace
context is not propagated**."*

Config lives under `diagnostics.otel.*` (`endpoint`, `protocol`, `serviceName`, `traces`, …), and
`diagnostics.otel` restarts *"only its exporter service, flushing the old generation before starting
the new one."* A separate `diagnostics-prometheus` plugin serves metrics; structured logs carry
`traceId` / `spanId` / `parentSpanId` under `logging.*`.

---

## 3. Update checks and feature statistics

Two different things, with two different defaults:

| | Default | Contents |
|---|---|---|
| **Update check** | **On**, daily | *"whether a newer version exists… the OpenClaw version, operating system, Node.js version, CPU architecture, and request surface"* |
| **Anonymous feature statistics** | **Off** | *"configured channels and providers, plugin inventory, and a retained session-creation count."* When enabled they *"ride along with that same daily update check instead of adding a second request"* |

*"They do not measure individual plugin invocations, messages, model requests, or active users."*
Public aggregates at `telemetry.openclaw.ai`. `openclaw telemetry show` prints exactly what would be
sent; `update.checkOnStart: false` disables both. The vendor's own framing: *"Declining is a
completely normal choice and changes nothing about how OpenClaw works for you."*

`VISION.md` states the standing rule: *"OpenClaw sends no usage analytics, tracking identifiers, or
telemetry attribution to the project unless the operator turned that on themselves."*

---

## 4. Restart recovery

| State | Storage | Across restart |
|---|---|---|
| Conversation history | Per-agent SQLite | *"Untouched; sessions continue from the stored transcript"* |
| Accepted Control UI follow-ups | Per-agent SQLite pending inputs + browser outbox | Re-admitted when the browser reconnects |
| Interrupted main-session turn | Per-agent SQLite session row and transcript | *"Automatically resumed or reconciled a few seconds after startup"* |
| Subagent runs | Shared state SQLite | *"Registry restored on boot; interrupted runs resumed"* |
| Background tasks | Shared state SQLite | *"Reconciled on boot; orphaned runs recovered or marked lost"* |
| Queued outbound deliveries | SQLite delivery queue | *"Drained after restart; undelivered replies are retried"* |
| Scheduled (cron) jobs | SQLite cron store | *"the scheduler re-arms on boot"* |
| Restart continuation | SQLite restart sentinel | *"One-shot follow-up dispatched to the session that asked for the restart"* |
| Gateway terminal PTYs | Process memory | **Not recovered** |

The browser outbox *"retains accepted text and attachments until the Gateway confirms transcript
consumption"* and checks the saved receipt before resubmitting — *"The old queue and execution
authority are never reused."*

**What is not resumed**, and why each:

- Sessions with another owner: **subagent** sessions (subagent recovery), **cron** sessions (the
  scheduler re-runs), **ACP-managed** sessions (*"the connected IDE or client owns the resume"*).
- *"Work that was never admitted: messages arriving during the drain window are rejected with an
  explicit restart error rather than silently queued into a dying process."*
- Gateway terminal PTYs.
- *"Standalone embedded turns cannot take over a main session with pending restart recovery because
  they do not share the gateway's lifecycle owner."*

The three-attempt recovery budget and its refresh conditions are in
[`06`](./06-sessions-compaction-and-pruning.md) §3.

---

## 5. Doctor

*"`openclaw doctor` is the repair and migration tool for OpenClaw. It fixes stale config/state, checks
health, and provides actionable repair steps."*

| Mode | Behaviour |
|---|---|
| `openclaw doctor` | Interactive checks. **Not read-only** — it *"can copy legacy config and migrate state without `--fix`"* |
| `--yes` | Accept default non-service repairs without prompting |
| `--fix` (alias `--repair`) | Apply recommended non-service repairs; *"entering maintenance while preserving the installed gateway service definition"* |
| `--lint` (`--json`) | Diagnostics only. **Exit code `1` means findings, not a failed command** |

Doctor owns the migration contract from `VISION.md`: *"When a config change makes existing user config
invalid, the same change needs a doctor migration. `openclaw doctor --fix` should detect the old
shape, explain it, back it up when needed, and rewrite it to the canonical format."* Core-owned config
is repaired in core doctor code; *"plugin-owned config is repaired by that plugin's doctor contract"*
declared as `doctorContract` / `doctorHealthChecks` in the plugin manifest
([`09`](./09-plugins-and-the-plugin-sdk.md)).

Seven doctor sub-pages: `running`, `checks`, `config-migrations`, `provider-repairs`,
`state-and-sessions`, `gateway-and-services`, `workspace-and-dreams`. Adjacent: `gateway/health`,
`gateway/diagnostics`, `gateway/troubleshooting`, `openclaw triage`, and
`openclaw backup create|verify|restore`.

**Security audit** is a separate collector-based command: `openclaw security audit [--fix]`, with
findings carrying `checkId`s, suppressions under `security.audit.suppressions`, and plugin
participation through `api.registerSecurityAuditCollector(...)`. The `gateway/security/*` group covers
an exposure runbook, secure file operations, dependency locking, audit checks and rate limiting;
`security/THREAT-MODEL-ATLAS` and `security/formal-verification` sit beside it.

---

## 6. The maturity scorecard — the product scoring itself

*"A practical view of what is ready, what is proven, and what still needs work."* Generated by
`pnpm maturity:render` from `taxonomy.yaml` and `qa/maturity-scores.yaml`; `pnpm maturity:check`
*"fails while this file is stale."*

**Scale at this read: 50 surfaces, 280 capability areas, 4 families.** *"Coverage comes from
deterministic QA evidence; quality and completeness are maintained as reviewed maturity scores."*

**Headline at this read: 68%, band Alpha** — Coverage Experimental 16%, Quality Alpha 64%,
Completeness Beta 71%.

| Band | Range |
|---|---|
| Experimental | 0–50% |
| Alpha | 50–70% |
| Beta | 70–80% |
| Stable | 80–95% |
| Clawesome | 95–100% |

The per-surface taxonomy uses a six-level scale, each with a stated promotion criterion:

| Level | Name | Meaning | Promotion requires |
|---|---|---|---|
| M0 | Planned | *"Direction is known, but no supported user path exists"* | Design issue, owner, target surface |
| M1 | Experimental | *"Implemented behind caveats, flags, source builds, or maintainer-only flows"* | A maintainer can run the scenario from current main |
| M2 | Alpha | *"Real users can try it, but breaking changes and incomplete UX are expected"* | Documented setup, basic tests, known caveats, one real-environment proof |
| M3 | Beta | *"Public path exists and the main workflow is usable with bounded caveats"* | Install/update docs, regression tests, support runbook, scenario proof across the expected environment |
| M4 | Stable | *"Recommended path for normal users. Failures are treated as regressions"* | Release gate, doctor/troubleshooting path, broad docs, repeated real-world proof |
| M5 | Clawesome | *"Polished, delightful, well-instrumented, and competitive with the best comparable workflow"* | Stable plus a user scorecard pass across representative users |

*"A surface is a product area… Each surface contains categories, and each category contains the
capability-level checks that QA scenarios cover. Use the scorecard for release-level judgment; use
this page to inspect the model underneath it."*

Representative surface levels at this read: CLI **M4** (7 areas, 90% complete), Gateway runtime
**M4** (13 areas, 89%), Agent Runtime **M3** (9 areas, 79%), Session/memory/context engine **M3**
(9 areas, 79%), Channel framework **M3** (8 areas, 79%).

**Its subject is OpenClaw itself.** The scorecard rates the product's own surfaces; nothing here
scores a user's deployment.

---

## 7. Testing and QA

`help/testing` splits into suites, live workflows, Docker, QA runners, contracts and writing tests;
`concepts/qa-e2e-automation` and `concepts/personal-agent-benchmark-pack` sit under Release & CI. The
benchmark pack is *"a small repo-backed QA scenario pack for local personal assistant workflows… not
a generic model benchmark."* Plugins declare `qaRunners` metadata *"the shared `openclaw qa` host can
inspect."* The CI tree (`ci/pipeline`, `watching-runs`, `checkout`, `scope-and-routing`, `runners`,
`capacity`, `release-validation`, `scheduled-workflows`, `local-proof`) documents OpenClaw's own
pipeline.
