---
status: DRAFT
title: "Memory, rollouts and session state"
tier: reference
project: harness-atlas
source: "openai/codex codex-rs/memories/README.md · codex-rs/thread-store/README.md"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Memory, rollouts and session state

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openai/codex` at **rust-v0.153.4**, **2026-09-08**.

**Two layers.** The **thread store** persists what happened. The **memory pipeline** reads that
history back and rewrites it into durable artifacts. The first is bookkeeping; the second runs a
model against your own history, unattended, and commits the result.

---

## 1. The thread store

`codex-thread-store` is *"the storage boundary for Codex threads"* — a `ThreadStore` trait with local
and in-memory implementations, and the note that *"Other storage implementations may live outside this
repository."*

| Component | Role |
|---|---|
| `ThreadStore::append_items` | The raw canonical history append. **Does not infer metadata from item contents** |
| `ThreadStore::update_thread_metadata` | The *only* metadata write API |
| `LiveThread` | Preferred API for an active session — owns metadata sync, applies rollout persistence policy |
| `ThreadManager` | Routes metadata mutations for loaded and cold threads through one entrypoint |
| `LocalThreadStore` | History as `codex-rollout` JSONL; queryable metadata in SQLite where available |
| `RolloutRecorder` | The local JSONL writer |

**The design rule is stated and load-bearing:** *"New metadata observation semantics should live above
`ThreadStore`. Stores persist explicit metadata fields, but raw history appends remain history-only."*
History and interpretation are deliberately separated, which is what lets a rollout be replayed
without inheriting a previous run's conclusions.

`LocalThreadStore` maintains JSONL and name-index compatibility explicitly *"so reading old or
SQLite-less local storage keeps working"* — the JSONL is the durable format; SQLite is an index.

---

## 2. The memory pipeline — when it runs

Triggered when a **root session starts**, and only if **all** of:

- the session is not ephemeral
- the memory feature is enabled
- the session is **not a sub-agent session**
- the state DB is available

It then runs **asynchronously in the background**, in two ordered phases. The sub-agent exclusion is
what stops delegation from multiplying memory work.

---

## 3. Phase 1 — rollout extraction, per thread

Eligible rollouts are selected from the state DB by startup claim rules: from allowed interactive
session sources, within a configured age window, **idle long enough** to avoid summarising an active
rollout, not already claimed by another worker, and within startup scan limits.

Each claimed rollout is filtered to memory-relevant items and sent to a model, which returns
structured output:

- `raw_memory` — detailed
- `rollout_summary` — compact
- `rollout_slug` — optional

**Secrets are redacted from the generated memory fields.**

Jobs run in parallel under a fixed concurrency cap, each **leased in the state DB before processing**
so concurrent workers cannot duplicate work. Failures are marked with **retry backoff** rather than
hot-looping. Outcomes are `succeeded`, `succeeded_no_output`, or `failed`.

---

## 4. Phase 2 — global consolidation

Phase 2 claims **a single global lock** before touching the memories root, so only one consolidation
inspects or mutates the workspace at a time.

**Selection** ranks stage-1 outputs by `usage_count`, then by most recent `last_usage` /
`generated_at`. Memories whose `last_usage` falls outside `max_unused_days` are ignored; those with no
`last_usage` fall back to `generated_at`, so a fresh never-used memory can still be selected.

**Artifacts**, under a memories root that is *"a git-baseline directory, initialized under
`~/.codex/memories/.git`"*:

| Artifact | Content |
|---|---|
| `raw_memories.md` | Merged raw memories, stable ascending thread-id order |
| `rollout_summaries/` | One summary file per selected rollout |
| `phase2_workspace_diff.md` | Git-style diff from the previous successful baseline |

Stale summaries and expired extension resources are pruned so removal **appears in the workspace
diff** rather than happening invisibly.

**If there are no changes after sync and pruning, the job succeeds and exits.** Otherwise Codex
spawns an internal consolidation sub-agent, points it at `phase2_workspace_diff.md`, and runs it:

> *"with no approvals, no network, and local write access only"*

and *"disables collab for that agent (to prevent recursive delegation)"*.

After success, the git baseline resets; the diff file is removed **before** the reset *"so deleted
content is not kept in the prompt artifact or unreachable git objects."*

**The shape to hold on to:** an unattended model run, with write access to the user's own memory
directory, gated by a lease and a lock rather than by an approval — and the git baseline is what makes
its output reviewable after the fact rather than before it.
