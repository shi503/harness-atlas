---
status: DRAFT
title: "Event — fifty-one types, four envelopes, three output modes"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · engdocs/architecture/event-bus.md · docs/reference/events.md · docs/reference/schema/events.json · engdocs/architecture/invariants.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Event — fifty-one types, four envelopes, three output modes

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

*"An event is how you observe what's happening — an immutable, append-only record fired by city
activity, not something the other primitives consume. Every event carries a monotonically increasing
sequence number, so a watcher can replay the stream from any point."*
— `docs/getting-started/how-gas-city-works.md`

The event type catalogue is documented in one place — a contributor-facing architecture page — while
the wire shapes are documented in three others. This document puts them together.

---

## 1. The type catalogue

`engdocs/architecture/event-bus.md` §"Event Type Constants" tables every constant in
`events.KnownEventTypes`, each of which *"must have a registered payload for the API/SSE
projection."* **Fifty-one constants across fourteen prefixes**, at this read:

| Prefix | Count | Types |
|---|:-:|---|
| `session.` | 9 | `woke` · `stopped` · `crashed` · `draining` · `undrained` · `quarantined` · `idle_killed` · `suspended` · `updated` |
| `bead.` | 3 | `created` · `closed` · `updated` |
| `mail.` | 7 | `sent` · `read` · `archived` · `marked_read` · `marked_unread` · `replied` · `deleted` |
| `convoy.` | 2 | `created` · `closed` |
| `controller.` | 2 | `started` · `stopped` |
| `supervisor.` | 4 | `started` · `shutdown_requested` · `request` · `fs_pressure.skipped_tick` |
| `city.` | 4 | `suspended` · `resumed` · `created` · `unregister_requested` |
| `request.` | 6 | `result.city.create` · `result.city.unregister` · `result.session.create` · `result.session.message` · `result.session.submit` · `failed` |
| `order.` | 3 | `fired` · `completed` · `failed` |
| `extmsg.` | 7 | `bound` · `unbound` · `group_created` · `adapter_added` · `adapter_removed` · `inbound` · `outbound` |
| `provider.` | 1 | `swapped` |
| `worker.` | 1 | `operation` |
| `project.` | 1 | `identity.stamped` |
| `events.` | 1 | `rotated` |

**Two are registered but never fired.** `session.quarantined` and `session.suspended` are both
listed as *"Registered/reserved; no production emitter today"* — a distinction a consumer building a
state machine on the stream needs, and one that only this table records.

**`supervisor.started` classifies the previous exit, best-effort.** It is *"emitted once per
startup, classifying how the previous supervisor instance exited (`clean` … `crash` … `unknown` —
no evidence of a prior instance) from the clean-shutdown handoff token"*, and the page states the
limit rather than leaving it: *"Attribution is best-effort across binary up/downgrades: a
mixed-version window can misattribute one start, self-correcting on the next cycle."*

**`supervisor.request` is deliberately lossy.** It *"Omits request bodies, raw origins, raw remote
addresses, and query strings."*

### 1a. Two lists, at two dates

The table above is dated by its own page header: *"Last verified against code: 2026-04-25."*
`CHANGELOG.md` `[Unreleased]` describes a `storage.binding.*` family that is **not** in it —
*"`storage.binding.not_configured` … The fifth `storage.binding.*` type carries the same
`StorageBindingOutcomePayload` as the other four"* — and describes `proven_beads` being added to
that family's payload. Neither list contradicts the other; the architecture page is four months
older than the changelog entry. A consumer enumerating types should read
`internal/events/events.go`, which both sources name as the definition site.

---

## 2. Reading the stream

`gc events` is *"a CLI reflection of the supervisor event APIs. The API is the source of truth."*
Four HTTP endpoints back it:

| Scope | List | Stream |
|---|---|---|
| City | `GET /v0/city/{cityName}/events` | `GET /v0/city/{cityName}/events/stream` |
| Supervisor | `GET /v0/events` | `GET /v0/events/stream` |

**The output shape depends on both the mode and the scope**, and the DTO differs in all four
combinations. This is the matrix `docs/reference/events.md` states across five subsections:

| Mode | City scope | Supervisor scope |
|---|---|---|
| **List** (`gc events`) | `TypedEventStreamEnvelope` | `TypedTaggedEventStreamEnvelope` |
| **Stream** (`--watch` / `--follow`) | `EventStreamEnvelope` | `TaggedEventStreamEnvelope` |
| **Cursor** (`--seq`) | plain text: the `X-GC-Index` head, e.g. `21` | plain text: a composite, e.g. `alpha:4,beta:9,mc-city:21` |

*"The supervisor form adds `city` because the merged event bus spans multiple cities."*

Three behaviours that only the reference states:

- **Cursor mode is not JSONL.** *"`gc events --seq` does **not** emit JSONL. It prints a single
  plain-text cursor to stdout."*
- **Heartbeats never reach you.** *"Heartbeat SSE frames are consumed internally and are **not**
  written to stdout."*
- **Empty is success.** *"If `--watch` times out without a match, stdout is empty and the command
  exits successfully."*

**Streams start at the head unless told otherwise**: *"API streams without `after_seq`,
`after_cursor`, or `Last-Event-ID` start at the current event head. Pass the `event_cursor` returned
by async POST responses when waiting for request-result events after the POST returns."*

Filter flags — `--type`, `--since`, `--payload-match`, `--after`, `--after-cursor` — *"only filter
which objects are emitted. They do not change the JSON shape."* `--payload-match` is the one with a
shape dependency: for `bead.*` events the path differs depending on whether you read through a
running city's API (which *"re-projects a registered payload into its typed variant"*) or not.

A machine-readable line schema ships at `docs/reference/schema/events.json`, an `anyOf` over the
four envelope DTOs, whose `description` restates the source of truth: *"The referenced DTO schemas
live in the supervisor OpenAPI document; the API remains the source of truth."*

---

## 3. The bus underneath

*"The 'bus' is the delivery machinery beneath it — an append-only log that carries fired events to
subscribers"* (`nine-concepts.md`). Two tiers: *"critical (bounded queue for infrastructure) and
optional (fire-and-forget for audit)."*

The `events.Provider` interface is `Record`, `List`, `LatestSeq`, `Watch`, `Close`. `Recorder` is
the write-only sub-interface, and its contract is **best-effort by design**: *"Contains a single
method `Record(Event)` that is best-effort: errors are logged to stderr, never returned to
callers."* A `Discard` sentinel *"silently drops all events."*

An `Event` is `Seq` (`uint64`), `Type` (a dotted string), `Ts`, `Actor`, `Subject`, `Message`, and
an optional `Payload` (`json.RawMessage`).

**Backend selection**, in precedence order: `GC_EVENTS` → `[events] provider` in `city.toml` →
default. Valid values: `""` (the default `FileRecorder`), `"fake"` (in-memory), `"fail"` (a broken
test double), `"exec:<script-path>"` (user-supplied — see
[`08`](./08-runtimes-and-exec-providers.md)).

The default store is `.gc/events.jsonl`, JSONL/NDJSON, one self-contained object per line. The
`FileRecorder` watcher polls: *"If no new events, sleep 250ms and retry."* Rotation is a command
(`gc events rotate`) and fires `events.rotated` *"carrying the archived seq range."*

Any provider implementation must pass a published conformance suite —
`internal/events/eventstest/conformance.go`, *"20+ subtests that any Provider must pass"*, plus
`RunConcurrencyTests`.

---

## 4. Events close the automation loop

Events are not only for watching. *"An event-triggered order **reads** the stream to decide when its
formula runs — so the same notifications humans watch can drive the fleet, with no specific agent
role required."* The `event` trigger matches *"events after a cursor position"*, and its cursor is
per-`ScopedName` — see [`04-formula.md`](./04-formula.md) §4.

Consumers, from `docs/guides/capabilities-for-coding-agent-users.md` and
`docs/getting-started/how-gas-city-works.md`: `bd show --watch`, `gc events --follow`, the web
dashboard's live view, the HTTP+SSE API for chat clients, and *"agents and bd hooks observe and emit
too"* (`gc event emit` is the emit door, documented as *"best-effort custom event recording"*).

---

## 5. The typing rule that makes all of this hold

`engdocs/architecture/invariants.md` is the contract behind the envelopes, and two of its numbered
rules bear directly on events:

- **§3.7 "Every event type has a typed wire payload"**, enforced by a named test —
  `TestEveryKnownEventTypeHasRegisteredPayload`.
- **§3.2 "Spec is generated, never hand-written."** The OpenAPI document and the JSON Schemas come
  from Huma registrations in `internal/api/` via `go run ./cmd/genspec`, and
  `.githooks/pre-commit` *"regenerates and stages all of these on any staged Go change, so a clean
  commit cannot leave them stale."* Freshness tests back it: `TestOpenAPISpecInSync`,
  `TestSchemaFreshness`, `TestCLIDocsFreshness`.

The same page's **§7 "What is out of scope"** is the refusal list — including
*"**WebSocket transport.** HTTP + SSE only"* — and is quoted in full in
[`10-trust-boundaries.md`](./10-trust-boundaries.md) §4.
