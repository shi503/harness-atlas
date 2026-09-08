---
status: DRAFT
title: "Telemetry and evidence — OpenTelemetry"
tier: reference
project: harness-atlas
source: "https://code.claude.com/docs/en/monitoring-usage"
source_verified: "2026-08-10"
---

# Telemetry and evidence — OpenTelemetry

> **Drafted 2026-08-10 by `claude-opus-5`, not yet verified.** Attested, not captured — see [`00-README.md`](./00-README.md).

Claude Code emits **metrics**, **events (OTel logs)**, and — in beta — **distributed traces**. This
is the native evidence substrate: schema'd, attributed, exportable, and already carrying per-agent,
per-skill, per-plugin, per-MCP-server cost and outcome attribution.

**The attribution fields on `claude_code.api_request` are the least-cited part of this surface**, and
they are what makes per-agent, per-skill and per-plugin cost attribution possible without a wrapper.

---

## Enabling

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_METRICS_EXPORTER=otlp
export OTEL_LOGS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
export OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer your-token"
claude
```

Exporters: `console`, `otlp`, `prometheus` (metrics only), `none`.
Protocols: `grpc`, `http/json`, `http/protobuf`, with per-signal overrides
(`OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`, `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`, etc.).

Export intervals: metrics `OTEL_METRIC_EXPORT_INTERVAL` (default **60000** ms), logs
`OTEL_LOGS_EXPORT_INTERVAL` (default **5000** ms), traces `OTEL_TRACES_EXPORT_INTERVAL` (**5000** ms).
Temporality defaults to `delta`.

For organization-wide deployment, put these in the managed settings `env` block. Managed `env`
variables have high precedence and cannot be overridden; conflicting developer-set variables are
removed with a warning visible under `claude --debug`. Note from `08-policy-and-governance.md` that
the telemetry exporter keys are treated as a **unit** across managed sources — an exporter endpoint
from one source can never pair with credentials from another.

**Dynamic credentials:** `otelHeadersHelper` in `~/.claude/settings.json` points at a script
generating headers, refreshed on `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` (default **1740000**
ms ≈ 29 minutes).

**mTLS:** for `http/*`, `CLAUDE_CODE_CLIENT_CERT`, `CLAUDE_CODE_CLIENT_KEY`,
`CLAUDE_CODE_CLIENT_KEY_PASSPHRASE`, `NODE_EXTRA_CA_CERTS`. For `grpc`, the standard
`OTEL_EXPORTER_OTLP_CLIENT_KEY` / `_CLIENT_CERTIFICATE` / `_CERTIFICATE` set, with per-signal variants.

---

## Content capture and redaction

**Off by default.** These toggles decide how much of the actual work is recorded.

| Variable | Effect |
|---|---|
| `OTEL_LOG_USER_PROMPTS` | Include full prompt text |
| `OTEL_LOG_ASSISTANT_RESPONSES` | Include response text (falls back to `OTEL_LOG_USER_PROMPTS` if unset) |
| `OTEL_LOG_TOOL_DETAILS` | Include tool parameters and names — Bash commands, **skill names**, MCP names, file paths |
| `OTEL_LOG_TOOL_CONTENT` | Include tool input/output. Requires tracing; truncated |
| `OTEL_LOG_RAW_API_BODIES` | Export full API request/response. `1` = inline (truncated), `file:<dir>` = written to files |
| `CLAUDE_CODE_OTEL_CONTENT_MAX_LENGTH` | Truncation limit in UTF-16 units. Default **61440** (60 KB) |

> **`OTEL_LOG_TOOL_DETAILS=1` is the switch that makes attribution usable.** Without it, skill names,
> command names, workflow names, and third-party plugin names are redacted to generic values
> (`custom`, `mcp`, `third-party`). Every "which skill is actually used" or "what did this agent run"
> question depends on it.

---

## Cardinality controls

| Variable | Default | Adds |
|---|---|---|
| `OTEL_METRICS_INCLUDE_SESSION_ID` | `true` | `session.id` |
| `OTEL_METRICS_INCLUDE_VERSION` | `false` | `app.version` |
| `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` | `true` | account attributes |
| `OTEL_METRICS_INCLUDE_ENTRYPOINT` | `false` | `app.entrypoint` |
| `OTEL_METRICS_INCLUDE_RESOURCE_ATTRIBUTES` | `true` | `OTEL_RESOURCE_ATTRIBUTES` on datapoints |

Multi-team attribution:

```bash
export OTEL_RESOURCE_ATTRIBUTES="department=engineering,team.id=platform,cost_center=eng-123"
```

---

## Standard attributes

On every metric and event: `session.id`, `app.version`, `app.entrypoint` (cli, sdk-ts, sdk-py, …),
`organization.id`, `user.account_uuid`, `user.account_id`, `user.id` (anonymous, persisted),
`user.email` (OAuth), `terminal.type`, plus anything in `OTEL_RESOURCE_ATTRIBUTES`.

**Event-only attributes** — and these are the correlation keys:

| Attribute | Meaning |
|---|---|
| `prompt.id` | UUID correlating a user prompt with every subsequent event |
| `message.uuid` | Transcript entry UUID |
| `client_request_id` | Client-generated UUID for API correlation |
| `workspace.host_paths` | Host workspace directories (string array) |
| `workflow.run_id` | Workflow run ID, prefixed `wf_` |
| `workflow.name` | Workflow name (redacted to `custom` unless `OTEL_LOG_TOOL_DETAILS=1`) |

---

## Metrics

| Metric | Unit | Additional attributes |
|---|---|---|
| `claude_code.session.count` | — | `start_type` (fresh/resume/continue/agents_view) |
| `claude_code.lines_of_code.count` | — | `type` (added/removed), `model` |
| `claude_code.pull_request.count` | — | — |
| `claude_code.commit.count` | — | — |
| `claude_code.cost.usage` | USD | `model`, `query_source` (main/subagent/auxiliary), `speed`, `effort`, **`agent.name`, `skill.name`, `plugin.name`, `marketplace.name`, `mcp_server.name`, `mcp_tool.name`** |
| `claude_code.token.usage` | tokens | `type` (input/output/cacheRead/cacheCreation), `model`, `query_source`, `speed`, `effort`, + attribution |
| `claude_code.code_edit_tool.decision` | — | `tool_name`, `decision` (accept/reject), `source` (config/hook/user_permanent/user_temporary/user_abort/user_reject), `language` |
| `claude_code.active_time.total` | s | `type` (user/cli) |

**The attribution set in bold is the important part.** Cost and tokens are broken down by agent,
skill, plugin, marketplace, MCP server, and MCP tool — so "what did this capability cost us" is
answerable without instrumentation.

---

## Events

All carry `event.name`, `event.timestamp` (ISO 8601), and `event.sequence`.

| Event | Fires | Key attributes |
|---|---|---|
| `claude_code.user_prompt` | A prompt is submitted | `prompt_length`, `prompt`, `message.uuid`, `command_name`, `command_source` (`builtin`/`custom`/`mcp`) |
| `claude_code.assistant_response` | Model returns text (v2.1.193+) | `response_length`, `response`, `model`, `request_id`, `message.uuid`, `query_source` |
| `claude_code.tool_result` | A tool completes | `tool_name`, `tool_use_id`, `success`, `duration_ms`, `error_type`, `error`, `decision_type`, `decision_source`, `tool_input_size_bytes`, `tool_result_size_bytes`, `mcp_server_scope`, `tool_parameters`, `tool_input` |
| `claude_code.api_request` | An API request is made | `model`, `cost_usd`, `cost_usd_micros`, `duration_ms`, `input_tokens`, `output_tokens`, `cache_read_tokens`, `cache_creation_tokens`, `request_id`, `client_request_id`, `speed`, `query_source`, `effort`, + full attribution set |
| `claude_code.api_error` | A request fails | `model`, `error`, `status_code`, `duration_ms`, `attempt`, `request_id`, + attribution |
| `claude_code.api_refusal` | `stop_reason: "refusal"` | `model`, `request_id`, `query_source`, `attempt`, `effort`, `server_fallback_hop`, `has_category`, `has_explanation`, `category` |
| `claude_code.api_request_body` / `_response_body` | With `OTEL_LOG_RAW_API_BODIES` | `body` or `body_ref`, `body_length`, `body_truncated`, `model`, `query_source` |
| `claude_code.tool_decision` | A permission decision is made | `tool_name`, `tool_use_id`, `decision` (accept/reject), `tool_source` (`builtin`/`mcp`/`sdk_host_builtin_mcp`), `source`, `tool_parameters` |
| `claude_code.permission_mode_changed` | Mode changes | `from_mode`, `to_mode`, `trigger` (shift_tab/exit_plan_mode/auto_gate_denied/auto_opt_in) |
| `claude_code.auth` | `/login` or `/logout` | `action`, `success`, `auth_method`, `error_category`, `status_code` |
| `claude_code.mcp_server_connection` | Connect / disconnect / fail | `status`, `transport_type`, `server_scope` (user/project/local), `duration_ms`, `error_code`, `is_plugin`, `plugin_id_hash`, `plugin.name`, `server_name`, `error` |
| `claude_code.internal_error` | Internal error caught | `error_name`, `error_code` |
| `claude_code.plugin_installed` | Install completes | `marketplace.is_official`, `install.trigger` (cli/ui), `plugin.name`, `plugin.version`, `marketplace.name` |
| `claude_code.plugin_loaded` | Plugin enabled at session start | `plugin.name`, `marketplace.name`, `plugin.version`, `plugin.scope` (official/org/user-local/default-bundle), `enabled_via` (default-enable/org-policy/seed-mount/user-install), `plugin_id_hash`, `has_hooks`, `has_mcp`, `host_owned_mcp`, `skill_path_count`, `command_path_count` |
| `claude_code.skill_activated` | A skill is invoked | `skill.name`, `invocation_trigger` (command / Claude / nested skill) |

**`claude_code.tool_decision` is the permission audit trail.** Every accept and reject, with the
*source* of the decision — `config` (a rule), `hook`, `user_permanent`, `user_temporary`,
`user_abort`, `user_reject`. A policy denial is an observable event, not something you have to infer.

**`claude_code.plugin_loaded` is capability provenance at session start** — plugin name, version,
marketplace, scope, how it was enabled, and whether it carries hooks or MCP.

---

## Distributed traces (beta)

```bash
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
```

### Span hierarchy

```text
claude_code.interaction
├── claude_code.llm_request
├── claude_code.hook                    (detailed tracing only)
└── claude_code.tool
    ├── claude_code.tool.blocked_on_user
    ├── claude_code.tool.execution
    └── (Agent tool) subagent spans
```

| Span | Notable attributes |
|---|---|
| `claude_code.interaction` | `user_prompt`, `user_prompt_length`, `interaction.sequence`, `interaction.duration_ms` |
| `claude_code.llm_request` | `model`, `gen_ai.system`, `gen_ai.request.model`, `query_source`, **`agent_id`, `parent_agent_id`**, `workflow.run_id`, `workflow.name`, `speed`, `duration_ms`, `ttft_ms`, token counts, `request_id`, `attempt`, `success`, `status_code`, `error`, `response.has_tool_call`, `stop_reason` |
| `claude_code.tool` | `tool_name`, `duration_ms`, `result_tokens`, `agent_id`, `parent_agent_id`, `workflow.run_id`, `tool_use_id`, `file_path` (Read/Edit/Write), `full_command` (Bash), `skill_name` (Skill), `subagent_type` (Agent) |
| `claude_code.tool.blocked_on_user` | `duration_ms`, `decision`, `source` |
| `claude_code.tool.execution` | `duration_ms`, `tool_use_id`, `success`, `error` |
| `claude_code.hook` | `hook_event`, `hook_name`, `num_hooks`, `hook_definitions`, `duration_ms`, `num_success`, `num_blocking`, `num_non_blocking_error`, `num_cancelled` |

**`agent_id` and `parent_agent_id` reconstruct the full agent tree**, including nested subagents and
workflow agents. Bash and PowerShell subprocesses automatically inherit `TRACEPARENT` when tracing is
active (`CLAUDE_CODE_PROPAGATE_TRACEPARENT=1` to force it), giving end-to-end distributed tracing
into whatever those subprocesses call. The W3C `traceparent` header is sent on model requests, and
the API's `traceresponse` is recorded as a span link.

---

## Verification

- Metrics: check the backend for `claude_code.session.count` after a session starts.
- Logs-only: submit a prompt, look for `claude_code.user_prompt`.
- Failures: `claude --debug` shows OTel export errors in the debug log.
