---
status: DRAFT
title: "Runtimes and exec providers — one exit-code contract, four subsystems"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/reference/exec-session-provider.md · docs/reference/exec-beads-provider.md · docs/reference/herdr-provider.md · docs/guides/configuring-an-agent.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Runtimes and exec providers — one exit-code contract, four subsystems

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

Four subsystems — sessions, beads, mail and events — each accept a user-supplied script in place of
their built-in backend, and all four use the same calling convention and the same three exit codes.
The vendor documents them on separate pages that never state the shared shape. This assembles it.

---

## 1. The shared contract

**Calling convention.** The script receives the operation name as its first argument, and is
*"exec'd directly — no shell"*:

```text
<script> <operation> [args...]
```

**Exit codes**, identical across the exec session and exec beads pages:

| Code | Meaning |
|---|---|
| `0` | Success (stdout holds the result, when any) |
| `1` | Failure (stderr holds the error message) |
| `2` | **Unknown operation — treated as success** |

**Exit `2` is the versioning mechanism**, and both pages state the same rationale:
*"when Gas City adds an operation, an older script returns exit 2 and the provider treats it as a
no-op success, so scripts only implement the operations they care about."* A backend is therefore
never required to be complete, and a forward-incompatible harness upgrade degrades to a silent
no-op rather than an error — which is worth knowing in both directions.

**Selection follows one shape per subsystem** — environment variable, then `city.toml`, then the
default:

| Subsystem | Env override | Config key | Default |
|---|---|---|---|
| Session | `GC_SESSION` | `[session] provider` | `tmux` |
| Beads | `GC_BEADS` | `[beads] provider` | `bd` (Dolt-backed) |
| Events | `GC_EVENTS` | `[events] provider` | file JSONL at `.gc/events.jsonl` |
| Usage | — | `[usage] provider` | *"local"* — `.gc/usage.jsonl` |

Each accepts the `exec:<script>` form, taking *"an absolute path"* or *"a bare name resolved on
PATH"*. Beads and events additionally accept `fake` / `fail` test doubles; usage accepts
`discard` / `fake`.

---

## 2. Session runtimes

The **runtime** is *"where the session's box lives"*, selected **city-wide**, not per agent.
Built-ins from `docs/guides/configuring-an-agent.md` §"Axis 5":

| Value | What it is |
|---|---|
| `tmux` | local, the default **and the fallback** |
| `subprocess` | *"local, headless"* |
| `k8s` | *"pods"* |
| `ssh:user@host` | *"a remote box over SSH"* |
| `exec:<script>` | *"a pluggable exec session pack — this is how sandbox / micro-VM runtime packs plug in"* |
| `herdr` | a built-in name for a third-party backend; see §4 |

`attach = false` on an agent *"let[s] gc pick a lighter runtime (subprocess) where the city allows
it."*

**Transport is a different axis from runtime** — see [`02-agent.md`](./02-agent.md) §1. The
per-agent `session` field selects a transport and *"accepts only `acp`, `tmux`, or omission"*.

---

## 3. The session protocol — seventeen operations

`docs/reference/exec-session-provider.md` tables the full `runtime.Provider` surface. The protocol
is named **RPP**, and *"version 0 is the only version today."*

| Operation | Invocation | Stdin | Stdout |
|---|---|---|---|
| `start` | `script start <name>` | JSON config | — |
| `provision` | `script provision <name>` | JSON config | — |
| `stop` | `script stop <name>` | — | — |
| `interrupt` | `script interrupt <name>` | — | — |
| `is-running` | `script is-running <name>` | — | `true` / `false` |
| `is-attached` | `script is-attached <name>` | — | `true` / `false` |
| `attach` | `script attach <name>` | tty passthrough | tty passthrough |
| `process-alive` | `script process-alive <name>` | process names, one per line | `true` / `false` |
| `nudge` | `script nudge <name>` | message text | — |
| `set-meta` | `script set-meta <name> <key>` | value | — |
| `get-meta` | `script get-meta <name> <key>` | — | value (empty = not set) |
| `remove-meta` | `script remove-meta <name> <key>` | — | — |
| `peek` | `script peek <name> <lines>` | — | captured text |
| `list-running` | `script list-running <prefix>` | — | one name per line |
| `get-last-activity` | `script get-last-activity <name>` | — | RFC3339 or empty |
| `exec` | `script exec <name>` | command | combined output (*"op exit == command exit"*) |
| `protocol` | `script protocol` | — | handshake JSON |

**`provision` is the one that needs explaining, and the docs name it.** *"Box without agent (the
un-weld). `provision` is `start` MINUS the agent launch: it creates/prepares the box (PreStart,
SessionSetup, SessionSetupScript, SessionLive — every box step `start` runs EXCEPT spawning the
agent in tmux) and returns."* This is the mechanism behind the *"relaunches the agent in the warm
box"* behaviour of an upstream switch — [`02-agent.md`](./02-agent.md) §3.

### 3a. A pack can ship a runtime

```toml
[runtimes.cloudflare]
command = "scripts/gc-runtime-cloudflare"   # pack-relative, or PATH name
protocol = 0
```

*"City composition registers the name into the runtime selection registry, so `city.toml` selects it
like a builtin."* The rules, verbatim in substance:

- *"A `command` containing a path separator resolves relative to the pack directory; a bare name
  resolves on PATH at session start."*
- *"`protocol` declares the RPP version the executable speaks … any other value fails composition."*
- *"Name collisions with builtin runtimes or other packs are composition errors — **no silent
  shadowing**. Identical re-declarations of the same pack reached through a diamond import graph
  dedupe."*
- The `pack-runtimes` doctor check verifies each declared executable and its handshake.
  *"An executable with no `protocol` op is the version-0 floor and passes; a present-but-broken
  handshake fails."*
- *"Config reload enforces the same registration rules, and rebuilds the session provider when the
  declaration behind the selected name changes."*

Verification commands: `gc runtime check <name>` is *"the smoke test"*, `gc runtime conformance
<name>` *"the full requirement-coded suite"*. The runtime command group also carries the drain
protocol — `gc runtime drain`, `drain-ack`, `drain-check`, `undrain`, `heartbeat`,
`request-restart` — which is what pairs with `session.draining` / `session.undrained` in
[`07-event.md`](./07-event.md) §1.

---

## 4. herdr — a third-party backend with an in-repo reference page

*"[herdr](https://herdr.dev) is a terminal workspace manager built for AI coding agents. Gas City
ships a native **herdr** session-provider backend as an **opt-in** alternative to tmux: one shared
herdr session-server per city, one workspace per rig (and one for the town), and one tab per agent.
tmux stays the default backend and the fallback — herdr is additive."*

It is a **builtin runtime name** — *"no pack or `[runtimes.*]` declaration is needed"* — verified
against *"herdr 0.7.1+"*, and *"If the binary is missing, sessions selected onto herdr fail to
start."*

**The page's most useful content is a trap it documents rather than fixes.** herdr is city-wide
only, and the per-agent `session` field cannot reach it:

> *"`session = "tmux"` does not keep an agent on tmux. The herdr provider does not implement the
> transport-capability check, so the pin is neither honored nor rejected; the agent falls back to
> the base provider and runs on herdr."*

`session = "herdr"` is rejected at validation with a named warning — *"agent "dog-1": session
"herdr" is not a valid session transport (use "acp", "tmux", or omit)"* — while
`session = "acp"` is *"the one per-agent lever that changes which backend an agent runs on"*, moving
that agent onto the separate ACP backend.

---

## 5. The beads, events and usage providers

**Beads.** *"Gas City's exec beads provider delegates each `beads.Store` operation to a
user-supplied script, the same pattern the exec session provider uses for sessions. It makes the
bead store a pluggable boundary: change one config line and Gas City persists beads through your
script instead of the default `bd` (Dolt-backed) store."*

Its "Why" section is the clearest statement anywhere of what the seam is for — *"A different beads
engine — for example `beads_rust` (`br`), a SQLite + JSONL hybrid with no JVM/Dolt dependency"*,
*"Custom persistence — bead writes that also trigger S3 snapshots, git commits"*, and
*"Alternative databases — Postgres, SQLite, flat files, or any backend reachable from a CLI."*

Two operational facts the session page has no equivalent of: *"Mutations pass their payload as JSON
on **stdin**; reads return JSON on **stdout**. Each invocation has a **30-second timeout**. The
script is spawned fresh per operation; there is no long-lived process to manage."*

**Events.** `exec.Provider` *"delegates all operations to a user-supplied script via fork/exec with
JSON wire protocol"* and must pass the published conformance suite —
[`07-event.md`](./07-event.md) §3.

**Usage.** `[usage] provider` selects the usage-fact sink: *"`discard` / `fake` → drop all facts;
`exec:<script>` → user-supplied script (JSON fact per line on stdin); `""` / `local` → durable
file-backed JSONL at `.gc/usage.jsonl` (default)."* This is what `gc costs` reads —
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §6.

Mail rides the same seam by construction rather than by a separate protocol: mail is a bead of type
`message`, so an exec beads provider carries it. `docs/reference/trust-boundaries.md` nonetheless
lists *"`exec:` beads, mail, and events providers"* as one execution surface.
