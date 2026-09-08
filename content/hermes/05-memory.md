---
status: DRAFT
title: "Memory — two files, two hard caps, one frozen snapshot"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/memory · .../which-file-does-what · .../configuration"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Memory — two files, two hard caps, one frozen snapshot

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

*"Hermes Agent has bounded, curated memory."* Three design choices do all the work: the caps are
**hard**, overflow is an **error rather than a truncation**, and the injected block is **frozen at
session start**. Each is a deliberate trade, and each is stated as one.

---

## 1. The two stores

| File | Purpose | Char limit | Typical entries |
|---|---|---|---|
| **`MEMORY.md`** | *"Agent's personal notes — environment facts, conventions, things learned"* | **2,200 chars (~800 tokens)** | 8–15 |
| **`USER.md`** | *"User profile — your preferences, communication style, expectations"* | **1,375 chars (~500 tokens)** | 5–10 |

Both live in `~/.hermes/memories/`. Total resident cost is given as **~1,300 tokens** per session,
fixed.

## 2. The caps are hard, and overflow errors

> *"Character limits keep memory focused. Memory does **not** auto-compact: when a write would exceed
> the limit, the `memory` tool returns an error instead of silently dropping entries."*

The error is designed to be actionable — it returns the current entries so the agent can consolidate in
the same turn:

```json
{
  "success": false,
  "error": "Memory at 2,100/2,200 chars. Adding this entry (250 chars) would exceed the limit.
            Consolidate now: use 'replace' to merge overlapping entries into shorter ones or
            'remove' stale or less important entries (see current_entries below), then retry
            this add — all in this turn.",
  "current_entries": ["..."],
  "usage": "2,100/2,200"
}
```

**`replace` is bound by the limit too**: *"swapping an entry for a longer one can still overflow, so the
new content must be shortened (or another entry removed) to fit."*

The stated best practice: *"When memory is above 80% capacity (visible in the system prompt header),
consolidate entries before adding new ones."*

## 3. The frozen snapshot

The block as it appears in the system prompt — note that the agent is shown its own remaining capacity:

```
══════════════════════════════════════════════
MEMORY (your personal notes) [67% — 1,474/2,200 chars]
══════════════════════════════════════════════
User's project is a Rust web service at ~/code/myapi using Axum + SQLx
§
This machine runs Ubuntu 22.04, has Docker and Podman installed
§
User prefers concise responses, dislikes verbose explanations
```

Entries are separated by `§` and may be multiline; the header names the store and the usage.

> *"The system prompt injection is captured once at session start and never changes mid-session. This is
> intentional — it preserves the LLM's prefix cache for performance. When the agent adds/removes memory
> entries during a session, the changes are persisted to disk immediately but won't appear in the system
> prompt until the next session starts. Tool responses always show the live state."*

This is the documented cause of *"I told it my name mid-session and it acted like it never heard it"* —
the save worked, the injected block did not refresh.

## 4. The `memory` tool

Three actions. **There is no `read`** — *"memory content is automatically injected into the system
prompt at session start."*

| Action | Semantics |
|---|---|
| `add` | Add a new entry |
| `replace` | Replace an entry, matched by a **unique substring** in `old_text` |
| `remove` | Remove an entry, matched the same way |

*"The `old_text` parameter just needs to be a unique substring that identifies exactly one entry."* A
substring matching multiple entries *"returns an error asking for a more specific match."*

Two further behaviours:

- **Duplicate prevention** — *"The memory system automatically rejects exact duplicate entries"*,
  returning success with a "no duplicate added" message.
- **Security scanning** — entries are scanned *"for injection and exfiltration patterns before being
  accepted, since they're injected into the system prompt."* Content matching threat patterns (prompt
  injection, credential exfiltration, SSH backdoors) or containing invisible Unicode is blocked.

### The write gate

```yaml
memory:
  write_approval: false     # false = write freely (default) | true = require approval
```

| Value | Behaviour |
|---|---|
| `false` (default) | Write freely — *"the gate is off (the pre-gate behaviour)"* |
| `true` | Interactive CLI foreground writes **prompt inline** — *"entries are small enough to read in full."* Everywhere else — messaging platforms, scripts, and the background self-improvement review — writes are **staged** for `/memory pending` |

```
/memory pending             # list staged writes (auto ones tagged [auto])
/memory approve <id>        # apply one (or 'all')
/memory reject <id>         # drop one (or 'all')
/memory approval on         # turn the gate on (or 'off') and persist it
```

The named use case: *"This is the answer to 'the agent saved a wrong assumption about me': set
`write_approval: true`, and every save — especially the unprompted background ones — waits for your
yes/no before it ever enters your profile."*

## 5. Turning the stores off

```yaml
memory:
  memory_enabled: true
  user_profile_enabled: true
  memory_char_limit: 2200   # ~800 tokens
  user_char_limit: 1375     # ~500 tokens
  write_approval: false
```

Three distinct off-states, and they are not the same:

| Configuration | Effect |
|---|---|
| Both `memory_enabled` and `user_profile_enabled` `false` | *"the `memory` tool is dropped from the schema and its guidance block is dropped from the system prompt, so the model is never told about a tool it cannot use."* An external `memory.provider` is unaffected and keeps its own tools |
| Only `memory_enabled: false` | The tool stays (it backs the profile store); the prompt swaps full guidance for a profile-only block; the schema advertises only the `user` target and rejects `MEMORY.md` writes. The inverse configuration mirrors it |
| `memory` under `agent.disabled_toolsets` | *"the heavier switch: it hides external provider tools too"* |

## 6. Session search — the unbounded half

`session_search` is the other recall path, and the documentation contrasts the two directly:

| | Persistent memory | Session search |
|---|---|---|
| Capacity | ~1,300 tokens total | Unlimited (all sessions) |
| Speed | Instant (in system prompt) | *"~20ms FTS5 query, ~1ms scroll"* |
| Cost | Token cost in every prompt | *"Free — no LLM calls"* |
| Management | Manually curated by agent | Automatic — all sessions stored |

All CLI and messaging sessions land in `~/.hermes/state.db` with FTS5 full-text search. *"Search
queries return actual messages from the DB — no LLM summarization, no truncation"*, and the agent
*"can also scroll forward/backward inside any session it finds."*

The division of labour, stated: *"**Memory** is for critical facts that should always be in context.
**Session search** is for 'did we discuss X last week?' queries."*

## 7. `/journey` — viewing, pruning and correcting what was learned

The learning journey is *"a timeline view of everything Hermes has learned — saved skills and memory
entries plotted over time … with a playable 'constellation' scrubber."* One graph, three surfaces:
`hermes journey` in the terminal (aliases `hermes learning`, `hermes memory-graph`; flags `--play`,
`--fps`, `--width`/`--height`, `--no-color`, `--json`), `/journey` as a TUI overlay, and the desktop
Star Map panel.

It is also the editing surface:

| Command | What it does |
|---|---|
| `hermes journey list` | List node ids — skill names and `memory:<source>:<index>` ids for memory chunks |
| `hermes journey delete <node> [-y]` | *"Skills are **archived** (restorable), memory chunks are removed"* |
| `hermes journey edit <node>` | Open the node's `SKILL.md` or memory chunk in `$EDITOR` |

## 8. External providers

*"Hermes ships with 8 external memory provider plugins — including Honcho, OpenViking, Mem0,
Hindsight, Holographic, RetainDB, ByteRover, and Supermemory."*

> *"External providers run **alongside** built-in memory (never replacing it) and add capabilities like
> knowledge graphs, semantic search, automatic fact extraction, and cross-session user modeling."*

`hermes memory setup` picks and configures one; `hermes memory status` reports what is active. Exactly
one provider is active at a time — see [`11`](./11-plugins-and-extension-points.md#4-single-select-provider-kinds).

## 9. One writer per home

Repeated here from the profiles page because the failure surfaces as memory corruption:

> *"Don't point two agent processes at the same Hermes home directory. Memory writes are automatic and
> load back into the system prompt at session start, so two writers sharing one home will compound each
> other's entries into state neither of them (nor you) authored."*

*"Memory is scoped per profile by design"* — the prescribed answers are a second profile, or an external
provider when the two genuinely need shared memory.
