---
status: DRAFT
title: "The learning loop — skill_manage, the background review, and /learn"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/skills · .../features/memory · .../features/curator · .../configuration"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# The learning loop — `skill_manage`, the background review, and `/learn`

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

The headline claim — *"the only agent with a built-in learning loop"* — resolves into **three writers**
and **one gate**. Which writer produced a skill determines what may later happen to it, so this
document and [`06`](./06-curator.md) only make sense together.

---

## 1. The three writers, and why the distinction is load-bearing

| Writer | Trigger | Marked `created_by: agent`? | Curator may touch it? |
|---|---|---|---|
| **Foreground agent** — `skill_manage` during a conversation | The system prompt asks it to record a non-trivial workflow | **No** — *"they are considered user-directed"* | **No** |
| **Background review fork** — the post-turn self-improvement pass | Roughly every 10 agent turns | **Yes** — the only path that calls `mark_agent_created()` | **Yes** |
| **You** — hand-written `SKILL.md`, or an external skills directory | — | No (`created_by: null` or absent) | **No** |

> *"Currently, only the **background self-improvement review fork** sets this marker … The background
> fork runs with a write origin of `"background_review"` (via `tools/skill_provenance.py`), which is the
> only path that triggers the `mark_agent_created()` call in `skill_manage`."*

The practical consequence is stated as a warning: *"Your hand-written skills are NOT curated."* And the
inverse consequence, on autonomous improvement: *"The background review fork refuses to patch a skill
that isn't curator-managed, so if it notices one of your skills is outdated it will say so and
recommend adoption rather than edit it."*

## 2. `skill_manage` — the tool

*"This is the agent's **procedural memory** — when it figures out a non-trivial workflow, it saves the
approach as a skill for future reuse."*

| Action | Use for | Key params |
|---|---|---|
| `create` | New skill from scratch | `name`, `content` (full SKILL.md), optional `category` |
| `patch` | Targeted fixes (**preferred**) | `name`, `old_string`, `new_string` |
| `edit` | Major structural rewrites | `name`, `content` (full replacement) |
| `delete` | Remove a skill entirely | `name` |
| `write_file` | Add/update supporting files | `name`, `file_path`, `file_content` |
| `remove_file` | Remove a supporting file | `name`, `file_path` |

`patch` is preferred *"because only the changed text appears in the tool call."*

### When the agent is asked to write one

Three stated triggers:

- *"When it worked out a multi-step workflow worth repeating"*
- *"When it hit errors or dead ends and found the working path"*
- *"When the user corrected its approach"*

### What a skill is supposed to contain

The house rule, which is what stops the loop degrading into a session log:

> *"it captures **lessons, not logs**: a pitfall is a generalizable rule plus one clause of *why* (the
> mechanism), attached to the step it affects, stated once. Incident narration, PR or issue numbers,
> dates, and quoted chat are not skill content; the rule has to stand without the story behind it."*

Always-on rules go in `SKILL.md`; `references/` holds *"a small set of files named by topic (a decision
table, a recipe, provider quirks), extended in place rather than accumulated one file per session."*
Skills *"do not restate what is already loaded every turn (the repo's `AGENTS.md`, tool schemas)."*

**An advisory linter runs on `create` and on `references/` writes**, returning findings in the tool
result. Two named rules exist for exactly the degradation above:

| Rule | Fires on |
|---|---|
| `incident-log-shape` | *"a body dense in PR/issue numbers"* |
| `references-sprawl` | *"more than 60 reference files"* |

> *"They warn; they never block a write."*

## 3. The background self-improvement review

The pass that makes the loop autonomous. It forks after a turn and can write memory entries, patch
skills, or create a new umbrella skill.

| Property | Value |
|---|---|
| Cadence | *"its periodic review pass (~every 10 agent turns)"* |
| Model | The **main chat model** by default — *"replaying the conversation — which is already warm in the prompt cache, so it's cheap cache reads"* |
| Cheaper route | `auxiliary.background_review.provider` / `.model`; the vendor reports *"substantially lower cost (~3–5× in benchmarks)"* |
| Digest | A different model *"automatically replays a compact **digest** of the conversation (recent turns verbatim + a summary of older ones)"* rather than the full transcript, since it cannot reuse the parent's cache |
| Capture parity | *"in testing, memory capture was identical and skill capture near-identical to the main-model review"* |
| Disable | `auxiliary.background_review.enabled: false` — *"automatic post-turn forks do not spawn; manual `/refine` still works"* |
| Accounting | Persisted in `session_model_usage` with `task='background_review'`; a completion line lands in `agent.log` as `Background review complete: thread=bg-review calls=… in=… out=… result=…` |

### Reasoning effort is not independently settable on a same-model review

> *"A review using the same model as the parent **always inherits the parent's reasoning effort**.
> Setting `auxiliary.background_review.reasoning_effort` does not override it, whether the route is
> `auto` or explicitly selects the parent provider/model."*

The reason is cache parity: *"Reasoning settings, the system prompt, the full conversation snapshot, and
tool definitions stay byte-identical to the parent at fork birth so the review can reuse its
prompt-cache prefix."* The stated alternatives are tuning `memory.nudge_interval` /
`skills.creation_nudge_interval`, disabling automatic reviews, or routing to a different model — and
the documentation states plainly that *"These frequency and routing controls do not decouple same-model
reasoning."*

### The review's tool whitelist

*"Background review can use memory, skill-management, and read-only file tools by default."* One
narrow extension point:

```yaml
auxiliary:
  background_review:
    extra_tools:
      - propose_shared_memory
```

*"The tool must already be available to the parent agent; this setting only adds it to the review
fork's runtime whitelist. It does not enable arbitrary tools, and tools not listed here remain denied."*
The default is an empty list, and the stated guidance is *"prefer tools that stage a proposal for human
review rather than applying external or destructive changes directly."*

### Deferral on a local GPU

The one case where the review does not run at turn end:

> *"When the review's runtime is the **managed local llama-server** … the same fork occupies the GPU
> your next prompt needs — for minutes on a large model — and sending a new prompt cancels it,
> discarding the learning."*

```yaml
auxiliary:
  background_review:
    defer: auto            # auto (default) | never
    defer_max_age_s: 1800  # run a queued review anyway after this long
```

`auto` queues only reviews whose runtime resolves to the managed local server; every other runtime
spawns immediately. Queued reviews **coalesce per session** (a newer snapshot replaces the older —
*"the review replays the whole conversation, so nothing is lost"*), a preempted review is **re-queued
rather than discarded**, and `/refine` always runs immediately. *"The queue is in-memory: reviews still
pending when the app exits are dropped."*

## 4. `/learn` — sourcing a skill from material

*"`/learn` is the fast way to turn something you already know — or a pile of reference material — into
a reusable skill, without hand-writing the `SKILL.md`."* Five source shapes are given as examples: a
local SDK or doc directory, an online doc page, *"the workflow you just walked the agent through in
this conversation"*, pasted notes, and a whole book or docs corpus.

**Large sources become knowledge-base skills** rather than one file or a lossy summary:

> *"a lean `SKILL.md` carrying the source's core mental models plus an index, with one distilled file
> per chapter or topic under `references/` … Reference files cost nothing until a question needs one …
> so query cost stays proportional to the answer, not the source."*

Two further properties: re-running `/learn` on the same topic *"folds it into the existing skill rather
than creating a duplicate"*, and the distillation *"never reproduces passages of the source text."*

**`/learn` has no model-tool footprint of its own**: *"it builds a standards-guided prompt and hands it
to the agent as a normal turn. The agent saves the result with the `skill_manage` tool"* — so the write
gate below applies. The same command works from the CLI, the gateway, the TUI and the dashboard,
*"since there is no separate ingestion engine."*

## 5. The write gate — `skills.write_approval`

```yaml
skills:
  write_approval: false     # false = write freely (default) | true = require approval
```

When on, **every** `skill_manage` write stages, *"regardless of whether the write came from a
foreground turn or the background review"* — the stated reason being that *"a SKILL.md is too large to
review inline."*

```
/skills pending             # list staged skill writes + a one-line gist each
/skills diff <id>           # full unified diff
/skills approve <id>        # apply it (or 'all')
/skills reject <id>         # drop it (or 'all')
/skills approval on         # turn the gate on (or 'off') and persist it
```

Staged writes survive restarts under `~/.hermes/pending/skills/<id>.json`. On a messaging platform the
diff is truncated for chat; the CLI, the dashboard or the pending JSON file carry the whole change.

**A separate, independent setting is a content scanner, not a gate:**

```yaml
skills:
  guard_agent_created: true   # default: false
```

> *"The scanner is **off by default** — real agent workflows that legitimately touch `~/.ssh/` or
> mention `$OPENAI_API_KEY` were tripping the heuristic too often."*

When on, a flagged write raises an approval prompt with the scanner's rationale. The documentation is
explicit that the two are unrelated: *"the two are independent."*

Memory has the same-shaped gate under `memory.write_approval` — see
[`05`](./05-memory.md#the-write-gate).

## 6. What the loop tells you it did

`display.memory_notifications` governs the chat line only, never whether the review runs or writes:

| Value | Behaviour |
|---|---|
| `off` | *"No chat notification. The review still runs and still writes — you just don't see a line for it."* |
| `on` (default) | Generic line, e.g. `💾 Memory updated`, `💾 Skill 'foo' patched` |
| `verbose` | A compact preview — `💾 Memory ➕ User prefers terse replies`, or an `"old" → "new"` skill diff snippet |

Settable per platform via `display.platforms.<platform>.memory_notifications`. Reporting is honest
about what actually landed: *"Staged writes awaiting approval and rolled-back batches are not reported
as completed changes. Batch summaries use the applied results rather than assuming requested writes
ran."*

## 7. Two nudge intervals with no documented defaults

`memory.nudge_interval` and `skills.creation_nudge_interval` are both named as the knobs that reduce
review frequency, and **neither default value is stated** — checked `features/memory`,
`features/skills`, `features/curator` and `user-guide/configuration`. The only frequency figure the
documentation gives for the loop is the curator page's *"~every 10 agent turns"* for the background
review pass.
