---
status: DRAFT
title: "Grok Build — sessions on disk, and the memory system"
tier: reference
project: harness-atlas
product: "Grok Build"
source: "xai-org/grok-build @ 7581004 — user-guide 13, 17"
version_at_capture: "commit 7581004 (SOURCE_REV eb4a894), no tags"
source_verified: "2026-09-08"
---

# Grok Build — sessions on disk, and the memory system

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Build**, the Apache-2.0 Rust runtime. **Grok Bot's memory is opaque** — its docs state
what a Bot remembers and never where or in what format; see
[`09`](./09-bot-bots-and-the-agent-computer.md) §3. Nothing in this document describes Grok Bot.

Read against `xai-org/grok-build` at commit `7581004`, **2026-09-08**. No tags exist.

Two stores, on different lifecycles. **A session is per-run and on by default; memory is cross-session
and off by default.**

---

## 1. The session directory

*"Grok stores each session in its own directory, grouped by working directory. It URL-encodes the
working directory to name the group. When the encoded name exceeds 255 bytes, it instead uses a slug
plus a hash and records the original path in a `.cwd` file inside the group."*

```
~/.grok/sessions/<encoded-cwd>/<session-id>/
  summary.json            # metadata: summary/title, timestamps, model ID, message counts
  updates.jsonl           # ACP session update stream (conversation + tool calls)
  chat_history.jsonl      # raw chat messages sent to the model
  plan.json               # TODO/task list state
  rewind_points.jsonl     # rewind points for /rewind undo
  signals.json            # session signals (token usage, tool/turn counters)
  feedback.jsonl          # user feedback and ratings
  compaction_checkpoints/ # saved state from compaction (manual or auto)
  subagents/              # per-subagent metadata (meta.json)
```

*"`updates.jsonl` is the authoritative conversation log that drives `/resume` and session restore."*
Each line *"is a self-contained ACP session update event."* The smaller state files are plain JSON
rather than JSONL. Child sessions of subagents *"live in the normal sessions tree"*; only their
metadata sits under `subagents/`.

**`summary.json` is the index entry**, recording `info`, `session_summary`, `generated_title`,
`title_is_manual`, `created_at`, `updated_at`, `num_messages`, `num_chat_messages`,
`current_model_id`, `parent_session_id` (*"the source session for a fork or restore"*), `agent_name`,
`last_turn_summary` and `last_recap`.

**A second index exists alongside the files.** *"`grok sessions search` additionally maintains a local
SQLite FTS5 index over session titles and prompts for fast keyword search."*

**Titles are generated, then frozen, then yours.** Generation starts after the first prompt, is
regenerated *"at a couple of early turns and frozen"*, and *"a manual `/rename` always wins: once you
rename a session, automatic generation never overrides it."* `/rename --auto` hands it back.

### Lifecycle operations

`/resume` (TUI, CLI `-r`, or the welcome screen) · `/fork` · `/rewind` — which explicitly *"does not
restore files on disk"* · `/compact`, with auto-compact at a configurable context threshold ·
`/session-info` · `grok sessions` and `grok usage` subcommands · worktree sessions.

---

## 2. Memory — experimental, and disabled by default

*"Memory is experimental and disabled by default."* Five-rung enablement, highest first:

1. a hidden deprecated compatibility flag, when supplied
2. `GROK_MEMORY` env var — `1`/`true` enables, `0`/`false` disables
3. `[memory] enabled` in the effective TOML
4. managed remote settings
5. **default: disabled**

`GROK_MEMORY=0` *"disable[s] memory for the process even when TOML or remote settings enable it."*
`/memory on` / `off` toggles within a session and *"does not persist to `config.toml`"*; toggling off
*"removes access to memory tools but keeps existing files on disk."*

### Where it lives

| Location | Scope |
|---|---|
| `~/.grok/memory/MEMORY.md` | Global — *"Facts that apply across all your projects"* |
| `~/.grok/memory/<project-slug>-<hash8>/MEMORY.md` | Workspace |
| `~/.grok/memory/<project-slug>-<hash8>/sessions/` | Per-session summaries and logs |

**Workspace identity is the git remote, not the path.** *"The identity is the `origin` remote in
`org/repo` form when the directory is a Git repository with an `origin` remote, or the directory path
otherwise. Because clones and worktrees of the same repository share an `origin` remote, they also
share one memory directory."*

Indexing is SQLite: **FTS5** for keyword search, **vec0** for vector search *"when an embedding model
is configured."* A file watcher (`[memory] watcher.enabled`, default `true`) reindexes external edits.

---

## 3. What writes to memory, and when

Four writers, three of them silent.

**Session-end metadata summary** — `session.save_on_end`, default `true`. It records message counts,
*"Topics: the first few substantive user prompts from the session, up to five"*, and the UTC date and
time. **It is built without a model call**: *"Grok builds the summary from conversation metadata
without an LLM call, without added latency."* Trivial sessions are skipped — *"fewer than three
substantive prompts, or fewer than 50 bytes of user text."* And the scope is bounded: *"The summary
does not record tool usage, file paths, or shell commands."*

**`/flush`** — an LLM-generated summary of the session's most important content, written to a dated
session log. Configured under `[compaction.memory_flush]`, *"not `[memory]`, because it is a compaction
behavior"*: `soft_threshold_tokens` 4000 (headroom before the compact threshold that triggers it),
`max_flush_write_chars` 8000, `idle_timeout_secs` 300 (`0` disables idle flushes),
`semantic_dedup_threshold` defaulting to `0.92` cosine similarity, and an optional `flush_model`.

**`/remember`** — the only writer that announces itself: *"Memory saved to ~/.grok/memory/MEMORY.md"*.

**`/dream`** — consolidation. *"Dream reorganizes individual session logs and memory entries into a
coherent, deduplicated knowledge base."* It runs automatically under `[memory.dream]`: `enabled` true,
`min_hours` 24, `min_sessions` 5, `check_interval_secs` 3600, `stale_lock_secs` 3600.

**Three of the four run without a scrollback message.** *"Background saves — flush, dream, and
session-end — run silently and do not post a scrollback message."*

---

## 4. Retrieval

Two model-facing tools: `memory_search` and `memory_get`.

**Scoring** starts in one mode and changes when configured. *"The default embedding model is unset, so
memory starts in full-text-only mode. If you configure an embedding model, search combines vector
similarity (weight `0.7`) with BM25 text similarity (weight `0.3`)."* Minimum score threshold defaults
to `0.7`.

**Source weights** under `[memory.search.source_weights]` — `workspace`, `session`, `global`, all
defaulting to `1.0`.

**Temporal decay** under `[memory.search.temporal_decay]` — `half_life_days` 30.0. *"Only session
chunks decay. Global and workspace memories are exempt since they contain curated long-term
knowledge."*

**MMR re-ranking** under `[memory.search.mmr]` — `lambda` 0.7, where *"0.0 = max diversity, 1.0 = pure
relevance."*

**Staleness is surfaced rather than enforced.** *"When a session memory is old, Grok attaches a
staleness note to it in search results. Older results get a stronger reminder to verify the current
state before you rely on them."* Global and workspace memories never receive them.

---

## 5. Pruning — the other half of the token story

Configured under `[compaction.pruning]`, defaults: `enabled` true, `keep_last_n_turns` 3,
`soft_trim_threshold` 4000 characters, `soft_trim_head` 1500, `soft_trim_tail` 1500,
`hard_clear_age_turns` 10 — after which *"tool results are replaced with a placeholder."*

Pruning acts on the live conversation; memory acts across conversations. Both live under
`[compaction]`, which is why a reader looking for either under `[memory]` finds only half of it.

---

## 6. What is not documented

- **No retention or eviction policy for `~/.grok/sessions/`.** `/compact` reduces a session's history
  and `grok sessions` lists them; nothing states when or whether a session directory is removed.
  Checked UG/17 §Checking Disk Usage, §Session Storage Details, UG/26 §`session`.
- **No stated cap on total memory size.** Chunk size (`max_chunk_chars` 1600) and per-flush write
  (`max_flush_write_chars` 8000) are capped; the store is not. Checked UG/13 §Configuration Reference
  in full.
- **No encryption-at-rest statement** for either store. Checked UG/13, UG/17, UG/18, UG/24,
  `SECURITY.md`.
