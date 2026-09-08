---
status: DRAFT
title: "Memory, dreaming, and the knowledge wiki"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Memory, dreaming, and the knowledge wiki

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"OpenClaw memory is a set of plain files and one SQLite index, organized into tiers with different
trust levels, write rules, and injection behavior."* The architecture is stated as five principles, a
five-tier model, one primary writer, and two recall lanes — and the security argument runs through
all of them.

---

## 1. Five stated principles

1. **No hidden state.** *"The model only remembers what is written to files in the agent workspace.
   Every memory surface is inspectable and editable with a text editor."*
2. **Writing is the hard part.** *"what degrades memory systems is unreliable write-time curation"* —
   so curation moves *"off the busy reply path and into a dedicated background pass."*
3. **The write path is the security boundary.** *"Content-level scanning of memory cannot catch
   poisoned facts reliably, so OpenClaw enforces provenance at write time and gates promotion
   structurally instead of trying to detect bad memories later."*
4. **Deterministic gates, model judgment inside them.** *"Scoring, thresholds, eligibility, matching,
   and lifecycle are deterministic code."*
5. **Failures never block replies.** *"A memory subsystem that is down degrades recall quality; it
   never eats a turn."*

---

## 2. The tier model

| Tier | Surface | Written by | Injected |
|---|---|---|---|
| Instructions | `AGENTS.md` and workspace instruction files | Human only | Always, at session start |
| Curated core | `MEMORY.md`, `USER.md` | Dreaming consolidation; direct user request | At session start when provenance is eligible; budgeted |
| Episodic | `memory/YYYY-MM-DD.md`, session transcripts | Agent during work; memory flush; transcript capture | **Never**; searchable on demand |
| Prospective | Standing intents (SQLite) and cron jobs | `intent` tool; scheduled tasks | Only when a trigger fires |
| Review | `DREAMS.md`, dreaming reports | Dreaming phases | Never; for human reading |

*"The boundary that matters most is between the **curated core** and the **episodic** tier."*

---

## 3. Provenance — closed sets in SQLite columns

*"Every entry in the memory index carries provenance metadata stored as SQLite columns the model
cannot write through prose."*

| Field | Closed set / meaning |
|---|---|
| **Origin class** | `owner` (typed by the owner in a trusted channel) · `agent` (derived by the agent from owner content) · `untrusted` (derived from external content — web pages, tool output, non-owner participants) · `system` (scaffolding: heartbeat prompts, cron preambles) |
| **Session kind** | interactive · cron · heartbeat · sub-agent run |
| **Observed timestamp** | Dates the fact |
| **Supersession key** | Lineage, *"so newer observations can supersede older ones instead of accumulating beside them"* |

*"Classification is conservative… It is never defaulted to `owner`."*

Two hygiene rules follow directly from the metadata:

- **Session-kind gating.** *"Cron, heartbeat, and sub-agent sessions do not produce durable memory
  candidates."*
- **Recall-loop prevention.** Content injected from memory *"is structurally marked and never
  re-extracted as a new memory. A fact recalled one hundred times stays one fact."*

**Turn-level taint.** When a tool result declares network-sourced content, *"the rest of that turn is
marked tainted: every assistant message produced after that result carries the taint… The taint
clears on the next user message."* The vendor names the gap itself: *"only tools that declare their
results as network-sourced participate, so output from tools that do not — local file reads, for
example — does not taint the turn."*

**Workspace files are inside the trust boundary.** *"any process that can edit them already controls
the agent workspace, so handwritten notes remain promotion-eligible without extra authentication."*
But a memory flush *"records the least-trusted class for the whole file; trusted lines in a
downgraded file intentionally lose promotion eligibility so untrusted content cannot ride a trusted
file hash."*

---

## 4. Dreaming — the one primary writer

*"Durable memory has exactly one primary writer: the dreaming consolidation pass. Everything else
feeds it."* Enabled by default, three phases.

**Light and REM** stage and reflect — dedupe recent signals, stage candidates, build theme
reflections, record reinforcement — *"all without touching long-term memory."*

**Deep promotes through two gates in sequence:**

1. **The deterministic gate.** Candidates ranked by weighted signals — *"retrieval relevance, recall
   frequency, query diversity, recency, multi-day recurrence, conceptual richness"* — and must pass
   all thresholds. *"Candidates with origin class `untrusted` or `system` are excluded structurally,
   before any prompt is built. This is a precondition, not a score penalty: no amount of recall
   frequency promotes untrusted content into the curated core."*
2. **The consolidation step.** Gated candidates plus the current `MEMORY.md` go to a model turn that
   produces a revised file — duplicates merged, superseded entries retired by supersession key,
   source references preserved as daily-note anchors.

**Acceptance is validated, not assumed.** Output is accepted *"only if it passes structural
validation, stays within the bootstrap file budget, and does not lose more than a bounded fraction of
existing entries. A rejected rewrite falls back to the previous append-only behavior for that
sweep."*

**Write safety is optimistic concurrency.** The content hash captured when the input was built is
re-checked immediately before an atomic rename; *"If anything else modified the file in the meantime
(an editor, another session), the rewrite is aborted for that sweep and the append fallback runs
instead."* Every accepted rewrite stores its pre-image and appends a human-readable summary to
`DREAMS.md`. *"The residual race window is milliseconds wide and recoverable; this tradeoff is
accepted by design in exchange for not requiring every editor of a plain Markdown file to share a
lock."*

---

## 5. Recall — two lanes, split by cost

### Lane 1 — always on, zero model calls

- **Bootstrap injection.** `MEMORY.md` and `USER.md` load at session start *"only when that runtime
  classifies their provenance as eligible."* Ineligible or unsupported classifications are omitted
  from automatic context but stay reachable through explicit tools. Eligible files *"refresh per turn
  within budgets so long-lived sessions pick up consolidation results without restarting."*
- **Ranked search.** `memory_search` scores *"hybrid relevance multiplied by an exponential recency
  decay (30-day half-life) and an importance multiplier."* Importance is **1 to 10**, assigned once
  at write time; entries without it rank neutrally.
- **Trigger injection.** Writers attach short trigger phrases; each inbound message runs *"a fast
  lexical and vector prefilter"* against them. **Score at or above `0.72`, at most three per turn**,
  injected as a compact hidden context block.

Both signals are trailing HTML comments on the entry line:

```markdown
- Keep the gateway on loopback. <!-- trigger: gateway setup, network safety --> <!-- importance: 9 -->
```

*"When either annotation is absent, the index keeps its column `NULL`, so older entries remain
neutral and never become trigger candidates until a writer adds metadata."*

**Auto-injection is restricted to the curated tier.** *"daily notes and transcripts never
auto-inject, regardless of match strength… This restriction is a security property, not a tuning
choice."*

### Lane 2 — escalation

A real sub-agent turn that can search and read across conversation history. By default it runs only
when **both** deterministic conditions hold: the message shows recall intent (explicit references to
the past, temporal phrasing, direct questions about prior decisions), **and** lane 1 produced no
strong hit. `mode: "always"` makes it unconditional; `mode: "off"` disables it.

---

## 6. Project-scoped memory

A second retrieval boundary for repository work. Memory written inside a Git repository carries a
trailing annotation:

```markdown
- Use the release helper for package validation. <!-- project: github.com/openclaw/openclaw -->
```

Identity comes from the **normalized `origin` remote**, so clones and linked worktrees converge on
one key while *"Forks intentionally remain separate because their remotes name different
repositories."* A repository without an `origin` uses its absolute root path. Semicolons are escaped
*"so one key cannot become multiple list entries."*

**The active set is ephemeral and capped at four keys**, most-recent-first, evicting beyond the cap.
*"it is not persisted or restored, so a new session or process starts with an empty set."* A
sub-agent *"derives its own active set rather than inheriting its parent's."*

Effects, precisely bounded:

- **Ranked search** boosts entries from any repository in the active set, mildly demotes entries from
  another repository, leaves untagged memory neutral. *"All retained keys have the same boost."*
- **Trigger injection is stricter**: *"a tagged entry is eligible only while **every** project key on
  that entry is in the active set."*
- Each full turn gets *"a compact, separately budgeted project-memory block"* from curated entries.
- **New memories receive only the current key, not the whole active set.**
- *"`USER.md` and standing intents remain user-level and are never project-scoped."*

The stated purpose: *"a build workaround learned in one codebase should not silently steer work in
another."*

---

## 7. The user model — `USER.md` as directives

Separate from `MEMORY.md` *"because preference adherence and fact recall fail differently."* The
format contract:

- Entries are **imperative directives** — *"'Always', 'Never', 'Prefer' — not observations about what
  the user once said."*
- Each carries status metadata: date observed, active or superseded.
- **Updates supersede in place.** *"A changed preference rewrites the directive; it never appends a
  contradicting one, because append-only preference history reliably causes models to answer from the
  stale value."*

---

## 8. Standing intents — prospective memory compiled out of the model

Three destinations, chosen by shape:

| Intent shape | Compiled into |
|---|---|
| Time-based (*"remind me Friday"*) | A cron job, at the moment it is uttered — [`14`](./14-automations-tasks-and-goals.md) |
| Event-based (*"when the release comes up, mention the changelog"*) | A per-agent SQLite row via the `intent` tool, with machine-checkable fields: keywords, optional trigger embedding, channel and sender scope, expiry, fire budget, cooldown |
| Aspirations that cannot be compiled | Markdown, tagged with review dates so dreaming can expire or escalate them |

*"Every inbound message runs a deterministic prefilter against armed intents; a hit injects the intent
as hidden context for the reply. **No model call happens in the matching path.**"*

**Lifecycle is explicit state**: `pending`, `armed`, `fired`, `done`, `cancelled`, `expired`.
**Anti-nagging is structural**: default cooldown **24 hours**, default budget **3 fires**, expiry
after **90 days**, at most **3 intents injected per turn**.

---

## 9. The security model, stated as four properties

- **Unforgeable provenance.** *"Origin labels live in SQLite columns written by classification code,
  never parsed out of memory text. Prose claiming to be from the owner does not make it owner
  content."*
- **Quarantine by tier.** Untrusted content *"can be stored, indexed, and explicitly searched, but it
  is structurally barred from the curated core and from auto-injection."* The only prompt paths are
  explicit tool calls and the escalation lane, *"both of which wrap results in untrusted-content
  framing."*
- **Taint propagates through consolidation.** *"Dreaming's gates check the provenance of candidates,
  not just their scores, so untrusted content cannot launder itself into `MEMORY.md` through a daily
  note and a theme reflection."*
- **Review surfaces.** Every consolidation writes its summary and pre-image trail to `DREAMS.md`;
  the Dreams UI exposes phase state, staged candidates and promoted entries.

---

## 10. Deletion, and what it does not cover

Automatic session ingestion records source sessions for staged entries, and consolidation carries
those origins forward, so `openclaw memory forget` *"can remove tracked entries derived from selected
sessions and exclude those session IDs from future ingestion."* Admission policy can separately
exclude matching sources from dreaming ingestion and session backfill.

**The vendor states the limit itself:** *"Neither control covers every workspace write or retained
copy."* The retained-data boundaries live at `/concepts/memory-provenance`.

---

## 11. The knowledge wiki layer

The `memory-wiki` plugin *"compiles durable knowledge into a navigable wiki: deterministic pages,
structured claims with evidence, provenance."* CLI: `openclaw wiki init/ingest/compile/lint/search`,
producing an Obsidian-compatible vault. It registers as *"a non-exclusive memory corpus supplement"*
through `api.registerMemoryCorpusSupplement(...)` — see
[`09`](./09-plugins-and-the-plugin-sdk.md) — rather than replacing the index.

---

## 12. Configuration map

| Concern | Key |
|---|---|
| Dreaming enable, cadence, model | `plugins.entries.memory-core.config.dreaming` |
| Session admission exclusions | `plugins.entries.memory-core.config.memoryPolicy` |
| Search providers, hybrid tuning | `memory.search` |
| Escalation lane mode and scope | `plugins.entries.active-memory` |
| Cross-conversation recall | `agents.entries.<id>.memory.search.rememberAcrossConversations` |
| Flush behaviour | `agents.defaults.compaction.memoryFlush` |
| Memory plugin selection | `plugins.slots.memory` |

Alternative engines ship as plugins: `memory-lancedb`, `memory-honcho`, `memory-builtin`, plus
`memory-wiki` as a supplement. *"Memory architecture is mostly convention over configuration."*
