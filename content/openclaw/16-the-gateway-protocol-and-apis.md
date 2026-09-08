---
status: DRAFT
title: "The Gateway protocol and the HTTP APIs"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# The Gateway protocol and the HTTP APIs

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"The Gateway WS protocol is the single control plane and node transport for OpenClaw."* Every
client — CLI, Control UI, macOS app, iOS/Android nodes, headless nodes — connects over one WebSocket
and *"declare[s] a **role** and **scope** at handshake time."* Three HTTP surfaces sit alongside it on
the same port, and each has its own security posture.

---

## 1. Transport and framing

WebSocket, text frames, JSON payloads. **The first frame must be a `connect` request.**

| Frame | Shape |
|---|---|
| Request | `{type:"req", id, method, params, traceparent?}` |
| Response | `{type:"res", id, ok, payload\|error}` |
| Event | `{type:"event", event, payload, seq?, stateVersion?}` |

Errors are `{ code, message, details?, retryable?, retryAfterMs? }`.

**Limits.** Pre-connect frames cap at **64 KiB** (`MAX_PREAUTH_PAYLOAD_BYTES`); afterwards
`hello-ok.policy.maxPayload` and `maxBufferedBytes` apply. With diagnostics on, oversized inbound
frames and slow outbound buffers emit `payload.large` events carrying *"`surface`, byte sizes,
limits, and a safe reason code, **never** message bodies, attachment contents, raw frame bytes,
tokens, cookies, or secrets."*

**Compression.** `permessage-deflate` is offered; frames of 4 KiB and up compress while *"smaller
frames such as streaming deltas stay raw. Context takeover is disabled in both directions."* Payload
limits apply to the **inflated** size.

**Tracing.** An authenticated client may attach a W3C `traceparent` per request frame. Malformed
values within the 128-character limit *"keep the default fresh request trace and do not fail the
RPC"*; longer values invalidate the frame. *"The initial `connect` request never establishes trace
context for later frames… do not treat the WebSocket itself as one trace."*

**Backpressure.** Authenticated operator requests share a bounded start queue; on exhaustion the
Gateway *"returns retryable `UNAVAILABLE` before the method runs."*

Published packages: `@openclaw/gateway-protocol` (schemas, validators, types, frame helpers, version
constants, plus a downloadable `protocol.schema.json` that is *"not an exported import subpath"*) and
`@openclaw/gateway-client` (reference Node client plus a browser-safe entry). *"Package release
versions are separate from the wire protocol version and the root `openclaw` CLI release."*

---

## 2. Roles and scopes

Three roles: `operator` (*"control-plane client (CLI/UI/automation)"*), `node` (*"capability host
(camera/screen/canvas/system.run)"*), `worker` (*"cloud execution host on the dedicated, closed worker
protocol"*).

**The full closed set of operator scopes — eight:**

`operator.read` · `operator.write` · `operator.admin` · `operator.approvals` · `operator.questions` ·
`operator.pairing` · `operator.talk` · `operator.talk.secrets`

*"`operator.write` continues to satisfy `operator.talk` for compatibility… Voice-device setup can
issue the narrower Talk grant without general Gateway write access."*

**Four reserved prefixes always resolve to `operator.admin`**, whatever a plugin requests:
`config.*`, `exec.approvals.*`, `wizard.*`, `update.*`.

**Method scope is only the first gate.** *"Some slash commands reached through `chat.send` apply
stricter command-level checks: persistent `/config set` and `/config unset` writes require
`operator.admin` even for gateway clients that already hold a lower operator scope."*

`node.pair.approve` adds an approval-time check on top of `operator.pairing`, escalating by the
pending request's declared commands ([`18`](./18-nodes-and-companion-devices.md)).

---

## 3. Versioning and the N-1 node window

| Constant | Value |
|---|---|
| `PROTOCOL_VERSION` | `4` |
| `MIN_CLIENT_PROTOCOL_VERSION` | `4` |
| `MIN_NODE_PROTOCOL_VERSION` | `3` |
| `MIN_PROBE_PROTOCOL_VERSION` | `3` |

*"Operator and UI clients must include the current protocol in that range."* Only clients with **both**
`role: "node"` and `client.mode: "node"` may use N-1, and the window is narrow:
*"Device auth, pairing, scopes, command policy, and exec approvals are unchanged by this compatibility
window. Plugin-owned node capabilities and commands are withheld until the node upgrades to the
current protocol."*

Reference-client defaults: request timeout **30 s**, preauth/connect-challenge **15 s** (raisable via
`OPENCLAW_HANDSHAKE_TIMEOUT_MS`), reconnect backoff **1 s → 30 s**, fast-retry clamp **250 ms** after
a device-token close. Schemas generate from TypeBox — `pnpm protocol:gen`, `:swift`, `protocol:check`.

---

## 4. RPC method families

Grouped in the docs as: **system and identity** · **models and usage** · **channels and login
helpers** · **plugin management** · **messaging and logs** · **operator terminal** · **Talk and TTS** ·
**secrets, config, update and wizard** · **agent and workspace helpers** · **session control** ·
**device pairing and device tokens** · **node pairing, invoke and pending work** · **approval
families** · **Control UI commands** · **automation, skills and tools**.

**Discovery is deliberately partial, and the docs say so.** *"`hello-ok.features.methods` is a
conservative discovery list… it is not a generated dump of every method, and some methods (for example
`push.test`, `web.login.start`, `web.login.wait`, `sessions.usage`) are intentionally excluded from
discovery even though they are real, callable methods. **Treat this as feature discovery, not a full
enumeration.**"*

A representative shape from the system family: `gateway.suspend.prepare` *"creates a short
cooperative-suspension lease only when tracked Gateway work is idle. While prepared, authenticated
WebSocket connects remain available, but only `gateway.suspend.*` and an exact targeted non-safe
`gateway.restart.request` may run."* The older `gateway.restart.preflight` is deprecated and
read-only — *"It does not close admission, create a suspension lease, or provide the atomic full-work
fence."*

---

## 5. The two ledger RPCs

`audit.activity.list` requires `operator.read` and gives *"a stable newest-first view of agent run,
tool action, inbound-message, and terminal outbound-message metadata."* Queries exclude records older
than **30 days**; the ledger caps at **100,000 records** ([`19`](./19-audit-observability-and-recovery.md)).

Params: exact `agentId` / `sessionKey` / `runId`; `kind` (`agent_run` · `tool_action` · `message`);
`status` (`started` · `succeeded` · `failed` · `cancelled` · `timed_out` · `blocked` · `unknown`);
message `direction` and `channel`; inclusive `after` / `before` in Unix ms; `limit` **1–500**; a
`cursor`. Result: `{ events: AuditActivityEventV1[], nextCursor?: string }`.

Four variant schemas discriminated by `eventType` — `agent_run`, `tool_action`, `inbound_message`,
`outbound_message` — all carrying `schemaVersion: 1`, `eventId`, `sequence`, `sourceSequence`,
`occurredAt`, `kind`, `action`, `status`, `actor` and `redaction`. Identity references use the exact
`hmac-sha256:v1:<32 hex key id>:<64 hex digest>` form.

The task ledger has its own RPCs on the same page.

---

## 6. The HTTP surfaces

Three, multiplexed onto the Gateway port, each enabled separately under `gateway.http.endpoints`.

### OpenAI-compatible

| Method | Path |
|---|---|
| POST | `/v1/chat/completions` |
| GET | `/v1/models` · `/v1/models/{id}` |
| POST | `/v1/embeddings` |

*"Requests run as a normal Gateway agent run (same codepath as `openclaw agent`), so routing,
permissions, and config match your Gateway."* Enabled with
`gateway.http.endpoints.chatCompletions.enabled`.

### OpenResponses

`POST /v1/responses`, enabled separately by `gateway.http.endpoints.responses.enabled`. It carries the
richer surface: input items (`message`, `function_call_output`, `reasoning`, `item_reference`),
client-side function tools, `input_image` and `input_file` with documented limits, SSE streaming,
usage and an explicit incognito-session-continuation path.

### `POST /tools/invoke`

Direct tool invocation. Default max body **2 MB**.

> **The security boundary, in the vendor's own words:** *"Treat this endpoint as a **full
> operator-access** surface for the gateway instance. HTTP bearer auth here is not a narrow per-user
> scope model. A valid Gateway token/password for this endpoint should be treated like an
> owner/operator credential."*

*"For shared-secret auth modes (`token` and `password`), the endpoint restores the normal full
operator defaults even if the caller sends a narrower `x-openclaw-scopes` header. Shared-secret auth
also treats direct tool invokes on this endpoint as owner-sender turns."*

### HTTP auth modes

| `gateway.auth.mode` | How |
|---|---|
| `token` | `Authorization: Bearer <token>` — `gateway.auth.token` or `OPENCLAW_GATEWAY_TOKEN` |
| `password` | Same header — `gateway.auth.password` or `OPENCLAW_GATEWAY_PASSWORD` |
| `trusted-proxy` | Requests must arrive from a configured trusted proxy injecting identity headers; same-host loopback proxies need `gateway.auth.trustedProxy.allowLoopback = true` |
| `none` | Private-ingress open auth |

Under `trusted-proxy`, an internal same-host caller may fall back to the password — but *"Any
`Forwarded`, `X-Forwarded-*`, or `X-Real-IP` header evidence keeps the request on the trusted-proxy
path instead."* With `gateway.auth.rateLimit`, repeated auth failures return `429` with
`Retry-After`.

---

## 7. OpenClaw as an MCP server

`openclaw mcp serve` runs OpenClaw *"as an MCP server"* over stdio, letting an external MCP client
*"read/send OpenClaw channel conversations."* It is the reciprocal of the ACP bridge in
[`05`](./05-acp-and-external-harness-sessions.md).

`openclaw mcp`'s other subcommands are the **client-side registry** for `mcp.servers` —
`list`, `show`, `status`, `doctor`, `probe`, `add`, `set`, `configure`, `tools`, `login`, `logout`,
`reload`, `unset`. *"`list`, `show`, `set`, and `unset` only read and write OpenClaw-managed
`mcp.servers` entries… They do not include mcporter servers from `config/mcporter.json`."*
`mcp.servers.<name>.codex` scopes a server to a hosted runtime's thread projection and *"is stripped
before native config handoff."*

*"ACP bridge mode does not accept per-session MCP server injection; configure gateway/plugin bridges
instead."*

---

## 8. Embedding and clients

`/gateway/embedding` covers supervising the Gateway as a child process; `/gateway/clients` covers
building one, including exact-version install commands. Networking and discovery have their own
group — `gateway/pairing`, `gateway/discovery`, `gateway/portals`, `gateway/bonjour` — and remote
access is documented across `gateway/remote`, `gateway/stable-https-url`, `gateway/tailscale` and
`gateway/cloudflare-access`.
