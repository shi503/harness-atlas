---
status: DRAFT
title: "Hermes Agent — the consolidated guide"
tier: reference
project: harness-atlas
source: "NousResearch/hermes-agent @ v0.21.1 (tag v2026.9.7) · https://hermes-agent.nousresearch.com/docs"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Hermes Agent — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `NousResearch/hermes-agent` and `hermes-agent.nousresearch.com/docs` at
**v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

One pass over the whole surface, for a reader with ten minutes. Every claim here is sourced in a
numbered document; this page carries the shape, not the field names.

---

## 1. The mental model

**One directory is the boundary; one file is the top of the prompt.** A profile is a Hermes home
directory, and *"Since 119+ files in the codebase resolve paths via `get_hermes_home()`"* everything —
config, `.env`, `SOUL.md`, memories, skills, sessions, cron jobs, state database — scopes to it. Inside
it, `SOUL.md` occupies slot #1 of the system prompt. Both are stated as identity boundaries and neither
is a security one.

**The system writes to itself, on a clock, in three places.** This is what makes Hermes structurally
different from a harness that only reads configuration:

| Writer | Cadence | Writes |
|---|---|---|
| Background self-improvement review | ~every 10 agent turns | Memory entries and skills |
| The **Curator** | Every 7 days, after 2 hours idle | Skill state transitions, optionally consolidations |
| The agent, in the foreground | Whenever it solves something worth repeating | Skills, memory |

**Everything the system writes is bounded, and bounded differently.** Memory is bounded by a **hard
character cap** that errors rather than truncates. Skills are bounded by **ageing** — unused for 30
days is `stale`, 90 days is `archived`. The two mechanisms have the same purpose and opposite shapes:
memory refuses new material until you make room; skills accept everything and quietly retire what
stopped earning its place.

---

## 2. The six rules that matter most

1. **Only the background review's skills are curated.** A skill you asked for, or wrote yourself, is
   invisible to the Curator — it will never be staled, archived, or autonomously patched. A library can
   *"look fully curated while most of it is untouchable."* — [`06`](./06-curator.md#6-adoption--the-gap-and-closing-it-by-declaration)
2. **The memory block is frozen at session start.** A mid-session save lands on disk immediately and
   does not appear in the prompt until the next session. This is deliberate — it preserves the prefix
   cache — and it is the documented cause of *"it acted like it never heard it."* —
   [`05`](./05-memory.md#3-the-frozen-snapshot)
3. **Memory overflow is an error, not a truncation.** *"Memory does **not** auto-compact"* — the tool
   returns the current entries and the agent must consolidate in the same turn. —
   [`05`](./05-memory.md#2-the-caps-are-hard-and-overflow-errors)
4. **Only one project context file type loads per session.** `.hermes.md` → `AGENTS.override.md` →
   `AGENTS.md` → `CLAUDE.md` → `.cursorrules`, first match wins. The *chain* that merges from git root
   downward operates only within the type that won. — [`02`](./02-context-files.md#2-rule-one--exclusive-selection)
5. **`approvals.deny` and the hardline blocklist sit below `--yolo`; nothing else does.** Both are
   consulted before YOLO, `approvals.mode: off` and "allow always". Every other layer is bypassable. —
   [`08`](./08-approvals-and-write-safety.md#3-yolo-mode-and-the-floor-beneath-it)
6. **A shell hook fails open unless you tell it not to.** *"A crashed secret-scanner must not silently
   allow the tool call it was supposed to vet"* — `fail_closed: true` is opt-in and valid only on
   `pre_tool_call`. — [`07`](./07-hooks.md#4-shell-hooks)

---

## 3. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| Set who the agent *is* | `SOUL.md` | [`01`](./01-profiles-and-soul.md) |
| Run a second agent with its own state | A profile | [`01`](./01-profiles-and-soul.md) |
| State project conventions in prose | `AGENTS.md` / `.hermes.md` | [`02`](./02-context-files.md) |
| Package a repeatable procedure | A skill | [`03`](./03-skills.md) |
| Turn a book, a doc site or a walked-through workflow into one | `/learn` | [`04`](./04-the-learning-loop.md#4-learn--sourcing-a-skill-from-material) |
| Keep a small durable fact always in context | Memory | [`05`](./05-memory.md) |
| Find something said weeks ago | `session_search` | [`05`](./05-memory.md#6-session-search--the-unbounded-half) |
| Stop the skill library growing without bound | The Curator | [`06`](./06-curator.md) |
| Act on a lifecycle moment, or rewrite a tool call | A hook | [`07`](./07-hooks.md) |
| Block a class of command unconditionally | `approvals.deny` | [`08`](./08-approvals-and-write-safety.md#4-approvalsdeny--the-user-editable-floor) |
| Hand work between agents with an audit trail | Kanban | [`09`](./09-kanban.md) |
| Run something unattended on a schedule | Cron | [`10`](./10-cron.md) |
| Add a tool, a channel, or a backend | A plugin | [`11`](./11-plugins-and-extension-points.md) |

---

## 4. The learning loop, end to end

A turn finishes. Roughly every ten turns, a **background fork** of `AIAgent` replays the conversation —
on the main model by default, because *"it's already warm in the prompt cache"* — and may write a
memory entry or a skill. That fork is the **only** path that stamps `created_by: agent`, and that stamp
is the sole thing that puts a skill inside the Curator's jurisdiction.

Seven days later, on an idle machine, the Curator forks again. Its first phase is deterministic and
free: unused for 30 days becomes `stale`, unused for 90 becomes `archived` into
`~/.hermes/skills/.archive/`. Its second phase — merging near-duplicates into class-level umbrellas —
is **off by default** because it *"costs aux-model tokens on every run and makes broad structural
changes to your library"*, at a stated 50–100 API calls per sweep.

Three things make the loop reversible rather than merely automatic:

- **It never deletes.** *"the worst outcome is archival … which is recoverable."*
- **Every mutation is ledgered** — actor, action, evidence, and per-file `{path, sha256}` manifests
  with contents content-addressed — so a single mutation can be rolled back, and *"foreground deletes
  are ledgered too"*, meaning a hard-deleted skill can be resurrected.
- **Every real pass is preceded by a tar.gz snapshot**, and the rollback that restores it takes its own
  snapshot first, so the rollback is itself reversible.

And two make it consentable: `skills.write_approval` stages every write for `/skills diff`, and
`memory.write_approval` does the same for memory — both applying *"regardless of whether the write came
from a foreground turn or the background review."*

— [`04`](./04-the-learning-loop.md), [`05`](./05-memory.md), [`06`](./06-curator.md)

---

## 5. Enforcement, ordered

Five layers, and only the last is enforced outside the agent process:

1. **`approvals.deny` globs and the hardline blocklist.** Checked before YOLO, before
   `approvals.mode`, before an "allow always" entry. No override flag exists for the blocklist.
2. **The approval gate.** `smart` scores with an auxiliary model; `manual` always asks; `off` disables.
   Headless surfaces (`cron_mode`, `single_query_mode`, `unattended_mode`) each default to `deny`.
3. **File write safety.** A path denylist plus optional `HERMES_WRITE_SAFE_ROOT`, applied to
   `write_file` and `patch` only — with **no prompt and no chat-side override**.
4. **Hooks.** A `pre_tool_call` hook can block or rewrite a call; a plugin callback that times out on
   that hook **fails closed**, while other bounded hooks fail open.
5. **OS-level isolation.** A non-default terminal backend, or whole-process wrapping via the Docker
   image or NVIDIA OpenShell.

**The project names layer 5 as the only boundary, in as many words:**

> *"**The only security boundary against an adversarial LLM is the operating system.** Nothing inside
> the agent process constitutes containment — not the approval gate, not output redaction, not any
> pattern scanner, not any tool allowlist."*
> — `SECURITY.md` §2.2, read 2026-09-08

Layers 1–4 are classified in that same document as *"in-process heuristics"* — *"They are useful. They
are not boundaries"* — and bypassing them is out of scope for the security channel while explicitly
welcome as an ordinary issue or pull request. — [`08`](./08-approvals-and-write-safety.md)

---

## 6. What runs unattended, and what stops it

Four things act without a human in the turn, each with a different brake:

| Actor | Brake |
|---|---|
| Background self-improvement review | `write_approval` staging; `enabled: false`; deferral behind an idle GPU |
| Curator | `min_idle_hours`, a one-interval first-run deferral, `pause`, `pin`, and a snapshot before every mutating pass |
| Cron | Pre-dispatch validation that spends no tokens on a misconfigured job; a model-drift guard that fails closed on an unpinned job; `cron_mode: deny` |
| Kanban dispatcher | Claim TTLs that extend rather than kill a live worker, a consecutive-failure breaker, a separate protocol-violation budget, and three named `respawn_guarded` reasons |

The pattern across all four is the same shape: **detect absence rather than assume failure, and prefer a
recoverable pause to a destructive action.** `stale` in kanban *"Does NOT tick the failure counter"*;
a never-used skill *"is not archived until it is at least `stale_after_days` old"* because *"Zero uses
is absence of evidence"*; an abandoned cron attempt is marked `unknown` only when the PID fingerprint
*"prove[s] that its owner is gone"*, and *"Unknown attempts … are never automatically rerun."*

---

## 7. Where the documentation stops

Absences recorded across this set, each naming what was checked:

- **Default values for `memory.nudge_interval` and `skills.creation_nudge_interval`** — both named as
  the knobs that reduce review frequency, neither given a default. Checked `features/memory`,
  `features/skills`, `features/curator`, `user-guide/configuration`.
  [`04` §7](./04-the-learning-loop.md#7-two-nudge-intervals-with-no-documented-defaults)
- **The kanban design spec** — *"architecture, concurrency correctness, comparison with other systems,
  implementation plan, risks, open questions"* — is a PDF in the repository at
  `docs/hermes-kanban-v1-spec.pdf`, not on the documentation site. Listed, not opened, at this read.
  [`09` §10](./09-kanban.md#10-what-it-deliberately-is-not)
- **The `AGENTS.override.md` rung** appears in the five-item context chain on `features/context-files`
  and is absent from the four-item chain on `which-file-does-what`, both read the same day. Recorded,
  not resolved. [`02` §2](./02-context-files.md#2-rule-one--exclusive-selection)
- **Terminal-backend count** — the repository README says *"Seven terminal backends — local, Docker,
  SSH, Singularity, Modal, Daytona, and Vercel Sandbox"*; the product landing page says *"Five backends
  — local, Docker, SSH, Singularity, Modal."* Both captured 2026-09-08.

**Where the documentation lives**, and it is worth knowing before starting a read:

- The hosted site at `hermes-agent.nousresearch.com/docs` renders **`website/docs/`** in the
  repository. The markdown sources there are the substantive text and are what this set was read
  against; the hosted pages are the same content.
- The repository's **`docs/` directory is a different thing entirely** — design specs, RFCs, an ADR
  file, `profile-routing.md`, `session-lifecycle.md`, `state-db-recovery.md`, observability and
  security notes, and the kanban PDF. A reader who opens `docs/` expecting the user guide will not find
  it.
- Several surfaces documented here appear in `website/docs/user-guide/features/` but **not** in that
  directory's own `overview.md` — the Curator and Kanban among them. The features overview is not a
  complete index.

---

## 8. The claims, walked against what this set documented

The claim ledger in [`00-README.md`](./00-README.md) records what Nous Research says Hermes is for.
This walks each claim to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, or records that
nothing was found and says what was checked. There is no verdict column and none is implied.

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"The self-improving AI agent"* / *"The Agent That Grows With You"* | The background review fork, `skill_manage`, and the Curator's lifecycle — [`04`](./04-the-learning-loop.md), [`06`](./06-curator.md) |
| *"it creates skills from experience"* | `skill_manage(create)` on three stated triggers, plus `/learn` — [`04` §2](./04-the-learning-loop.md), [`04` §4](./04-the-learning-loop.md#4-learn--sourcing-a-skill-from-material) |
| *"improves them during use"* | `skill_manage patch/edit`, counted as `patch_count` in `.usage.json`; the Curator's opt-in consolidation pass patches drift — [`04`](./04-the-learning-loop.md), [`06` §3](./06-curator.md#3-phase-2--llm-consolidation-off-by-default) |
| *"nudges itself to persist knowledge"* | The post-turn background review at ~every 10 turns, with `memory.nudge_interval` / `skills.creation_nudge_interval` as its frequency knobs — [`04` §3](./04-the-learning-loop.md#3-the-background-self-improvement-review). **The nudge intervals' defaults are a recorded absence** — [§7](#7-where-the-documentation-stops) |
| *"searches its own past conversations"* | `session_search` over `~/.hermes/state.db` with FTS5, *"no LLM summarization, no truncation"* — [`05` §6](./05-memory.md#6-session-search--the-unbounded-half) |
| *"builds a deepening model of who you are across sessions"* | `USER.md` under a 1,375-char cap, written by the agent's `memory` tool; eight external providers add *"cross-session user modeling"* alongside it — [`05`](./05-memory.md) |
| *"Bounded, curated memory that persists across sessions"* | Two files, two hard caps, error-on-overflow, frozen-snapshot injection — [`05`](./05-memory.md) |
| *"Skills … follow a progressive disclosure pattern to minimize token usage"* | Three loading levels, `skills_list()` at ~3k tokens resident — [`03` §1](./03-skills.md#1-progressive-disclosure--three-levels) |
| *"compatible with the agentskills.io open standard"* | **Named, not mechanised in this set.** The compatibility is asserted in the README and the skills page; no conformance surface was opened. Checked: `features/skills`, `reference/skills-catalog`, the README |
| *"Built-in cron scheduler with delivery to any platform"* | A 60-second gateway tick, `jobs.json`, an `executions.db` attempt ledger, and `deliver:` targets — [`10`](./10-cron.md) |
| *"a work queue where every handoff is a row any profile (or human) can see and edit"* | The kanban board's task, comment and event rows; `KANBAN_GUIDANCE` injected into every worker — [`09`](./09-kanban.md) |
| *"Custom code at lifecycle points for logging, alerts, and guardrails"* | Four hook systems over one dispatcher, with a documented block/modify wire protocol — [`07`](./07-hooks.md) |
| *"extends Hermes without modifying core code"* | The `ctx.*` registration API, five discovery sources, capability consent — [`11`](./11-plugins-and-extension-points.md) |
| *"Run it on a $5 VPS, a GPU cluster, or serverless infrastructure"* | **Outside this set's scope.** Deployment topology, terminal backends and the gateway's hosting were not documented here; this set is cut by what a builder configures inside a running Hermes. Named so it is not read as an absence |
| *"Isolated Sandboxing"* (landing page) | Two isolation postures, with the project's own statement of what each does and does not confine — [`08` §7](./08-approvals-and-write-safety.md#7-the-refusal--the-boundary-the-project-names-in-full) |
