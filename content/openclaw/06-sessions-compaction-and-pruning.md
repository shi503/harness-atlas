---
status: DRAFT
title: "Sessions, compaction, and pruning"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Sessions, compaction, and pruning

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

A session is the unit that holds context and bounds concurrency. Three separate mechanisms keep it
from growing without limit — reset, compaction and pruning — and they are not substitutes.

---

## 1. Where session state lives

| Path | Holds |
|---|---|
| `~/.openclaw/agents/<agentId>/agent/openclaw-agent.sqlite` | Session rows, transcripts, per-agent runtime state, model auth profiles, routing state, standing intents |
| `~/.openclaw/agents/<agentId>/sessions/` | Archived transcript files; legacy migration sources |
| `~/.openclaw/agents/<agentId>/sessions/sessions.json` | Legacy row-migration source only |
| `~/.openclaw/state/openclaw.sqlite` | Shared state — tasks, flows, cron, audit, workspace setup |

Three lifecycle timestamps on each row, and they are not interchangeable:

- `sessionStartedAt` — when the current `sessionId` began; **daily reset uses this**.
- `lastInteractionAt` — last user or channel interaction; **idle lifetime uses this**.
- `updatedAt` — last row mutation; *"useful for listing and pruning, but not authoritative for
  daily/idle reset freshness."*

**A legacy store is a hard startup stop, not a silent import.** *"If startup finds a legacy store, it
refuses readiness and prints the Doctor command for the active profile instead of silently starting
with empty history."* `openclaw doctor --fix` performs the import.

---

## 2. Reset policy

Default is `session.reset.mode: "none"` — *"sessions keep the same `sessionId`; compaction manages
the active context as the conversation grows."*

| Mode | Trigger | Freshness measured from |
|---|---|---|
| `none` | never | — |
| `daily` | a local hour, `session.reset.atHour` default `4` (0–23) on the Gateway host | `sessionStartedAt` |
| `idle` | `session.reset.idleMinutes` of inactivity | `lastInteractionAt` |
| manual | `/new`, `/reset`; `/new <model>` also switches model | — |

*"When both daily and idle resets are configured, whichever expires first wins."*

**System-event turns do not keep a session alive.** *"Heartbeat, cron, exec, and other system-event
turns may write session metadata, but those writes do not extend daily or idle reset freshness."*
When a reset rolls the session, *"queued system-event notices for the old session are discarded so
stale background updates are not prepended to the first prompt in the new session."*

Overrides: `session.resetByType` (`direct`, `group`, `thread`) and `session.resetByChannel`. Doctor
migrates legacy `dm` entries to `direct` and `session.idleMinutes` to `session.reset.idleMinutes`;
*"the schema rejects both retired forms."*

---

## 3. Restart recovery

*"When a Gateway restart interrupts an active turn, OpenClaw tries to continue the existing session
automatically."* The budget is **three attempts that fail to start a backend turn**. *"Once a real
backend turn starts, the budget refreshes, so a later Gateway restart does not consume the old
allowance. Accepting, queueing, or preparing a resume request alone does not refresh it."*

CLI backends that do not report turn acceptance *"refresh the budget only after observed assistant
output or tool activity; silent startup does not refresh it."*

When the budget is exhausted the transcript survives; recovery is manual — **Resume in new session**
in WebChat, or `/new` / `/reset` elsewhere.

---

## 4. Session maintenance

```json5
{ session: { maintenance: {
  mode: "enforce",              // "warn" only reports
  pruneAfter: "30d",
  archiveDashboardAfter: "7d",  // false or 0 disables this dashboard trigger
  maxEntries: 5000,
  preserveRecent: false,        // opt in with a duration such as "7d"
} } }
```

`maxEntries` counts **unarchived** rows; archived rows do not consume the cap. Under pressure,
*"cleanup archives the oldest eligible ordinary sessions instead of deleting their transcripts."*

**What is disposable and what is protected** is a closed distinction worth memorising:

- **Disposable** — *"Synthetic runtime sessions such as cron, hooks, heartbeat, ACP, and sub-agents."*
- **Protected** — *"Pinned root sessions, active or admitted work, model-locked sessions, and durable
  external conversation pointers."*

Consequence: *"the unarchived total can therefore remain above the cap when protected rows alone
exceed it."*

*"Only root sessions can be pinned; child/subagent sessions live in their parent's tree and reject
pin requests."*

Model-run probe rows (`agent:*:explicit:model-run-<uuid>`) carry a fixed `24h` retention that is
**pressure-gated** — removed only when maintenance pressure is reached, and before the broader
stale-entry cutoff. *"Normal direct, group, thread, cron, hook, heartbeat, ACP, and sub-agent
sessions do not inherit this 24h retention."*

`openclaw sessions cleanup --enforce` applies the cap immediately.

---

## 5. Compaction

Three steps: older turns are summarised into one compact entry, the summary is saved in the
transcript, recent messages are kept intact. *"The full conversation history stays on disk.
Compaction only changes what the model sees on the next turn."*

**Tool pairing is preserved structurally.** If a split point lands inside a tool block, *"OpenClaw
moves the boundary so the pair stays together."*

**Two modes, and new configs get the stricter one.** *"New configs default
`agents.defaults.compaction.mode` to `'safeguard'` (stricter guardrails, summary quality audits). Set
`mode: 'default'` explicitly to opt out."* In safeguard mode the final budget is applied **before**
validation; required headings must survive in the retained body, and pending asks and exact
identifiers must survive *"in the exact text that would be stored."* Invalid output gets a configured
number of corrective attempts, and *"If no finalized summary passes, compaction stops before writing
a transcript entry, keeps the original history, and surfaces the existing recovery outcome."*

**Auto-compaction** is on by default, running near the context limit or on a provider
context-overflow error (*"in which case OpenClaw compacts and retries"*). OpenClaw matches *"dozens of
provider-specific overflow error strings"* — `request_too_large`, `context length exceeded`,
`input exceeds the maximum number of tokens`, Bedrock's
`input token count exceeds the maximum number of input tokens`, `input is too long for the model`,
`ollama error: context length exceeded`.

**Cancellation is not rollback.** *"a compaction that already completed remains in the transcript and
is still counted, without sending a late reply."*

**Required versus optional work.** *"The built-in OpenClaw runtime performs required checkpointing
and compaction before inference. In persistent Gateway sessions, optional memory flushing and
compaction wait until reply delivery has settled."* `openclaw agent --local` skips optional post-turn
work entirely; *"the next command performs required maintenance before inference."*
`agents.defaults.compaction.enabled: false` disables proactive threshold compaction and optional
maintenance — *"Overflow-recovery compaction and manual `/compact` remain available."*

### Compaction knobs

| Key | Effect |
|---|---|
| `agents.defaults.compaction.mode` | `safeguard` (new-config default) or `default` |
| `.model` | `provider/model-id` or a configured alias. *"An explicit … override remains exact and does not inherit the session fallback chain"*; a bare value matching both an alias and a literal model id resolves to **the literal** |
| `.identifierPolicy` | `"strict"` by default — preserves opaque identifiers; `"off"` disables |
| `.memoryFlush.model` | Model for the silent pre-compaction memory-flush turn — [`07`](./07-memory-dreaming-and-the-knowledge-wiki.md) |
| `.provider` | A plugin-registered compaction provider. **Setting it forces `mode: "safeguard"`** |
| `keepRecentTokens` | Recent-token floor; full reference at `/reference/session-management-compaction` |

**Images never reach the summariser.** Omitted images receive markers such as
`[image data omitted from summary input]`, capped at *"at most 847 UTF-8 bytes per summarizer
request"* across all added markers, role labels and separators. *"Custom compaction providers still
receive the original message content."*

A registered provider that fails or returns empty *"falls back through the built-in safeguard
summarizer and its configured quality checks. Provider-local timeouts do not bypass those checks."*

---

## 6. Pruning — a different thing from compaction

`agents.defaults.contextPruning.mode: "cache-ttl"` trims **tool results only**, to keep prompt-cache
prefixes stable between compaction cycles.

**Where it runs depends on the route.** For provider `anthropic` with the `anthropic-messages` API,
API-key auth and the default endpoint, OpenClaw *"delegates pruning to Anthropic's server-side
tool-result clearing… Full local history is retained. `ttl` does not gate this path."* Derived
parameters, with no config surface of their own:

| Parameter | Value |
|---|---|
| `trigger` | `max(50000, floor(contextWindow * 0.3))` input tokens |
| `keep` | The 3 most recent tool uses and their results |
| `clear_at_least` | `max(12500, floor(contextWindow * 0.05))` input tokens |
| `exclude_tools` | Tool names excluded by `tools.deny` or outside `tools.allow` |

Other eligible routes prune locally after the cache TTL expires.

**Smart defaults fire once, and only for one provider family.** The bundled Anthropic plugin
auto-configures on first auth-profile resolution, *"but only for fields you have not already set
explicitly"*:

| Auth mode | `contextPruning.mode` | `contextPruning.ttl` | `heartbeat.every` |
|---|---|---|---|
| OAuth/token (incl. Claude CLI reuse) | `cache-ttl` | `1h` | `1h` |
| API key | `cache-ttl` | `1h` | `30m` |

*"other providers get pruning `off` unless you configure it."*

**Turning pruning off does not undo it.** *"Existing client-side projections keep replaying,
including after a Gateway restart, until compaction removes their results or the session is reset."*

|  | Pruning | Compaction |
|---|---|---|
| What | Trims tool results | Summarises conversation |
| Persisted | Client projections persist; server clearing keeps full local history | Summary persists in transcript or provider replay state |
| Scope | Tool results only | Entire conversation |
