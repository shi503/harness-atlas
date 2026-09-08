---
title: "9c · Cadence"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "9 IMPROVE"
sublayer: "9c"
function: "F10"
job: "—"
horizon: "shipped"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 9c · Cadence

**Layer 9 IMPROVE** · function `F10` · job `—`

> **What runs without anyone asking?**
>
> Cadence is **the Schedule** — what runs, how often, on what trigger — **the Emission**, the artifact
> each run leaves behind, and **the Read**, whoever consumes it. Three parts, and only two of them are
> graded.

> **`AC-7` bites here, and the answer is that it should.** A pure schedule *is* machinery — *a thing
> that runs* — and machinery is not graded. **`9c` is therefore graded on what it emits**, never on
> the trigger itself: `F10`'s own definition is *"the checks that run without being asked, **and the
> artifact each run leaves behind**"*, and the second clause is the gradeable one. Cron is free; a
> record something else reads is not ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §3.1).

**The reframe that rescued this function is about machine-readability, not about meetings.** The
corpus was read for `standup` 0, `ceremon` 0, `ritual` 1 and the function was pronounced dead — while
**`transcri` scored 12**, twice `multiplayer`, which the same document had called *"real but
emerging."* Two thresholds for two concepts, producing an answer already drafted. **Transcription is
what made the emitted artifact machine-readable**, and once a scheduled loop emits something a harness
can consume, the object is real regardless of whether anyone attends anything
([`02-functions.md`](../archive/v0/02-functions.md) §6 `F10`).

**The Read is what separates emission from logging, and it is where most teams stop.** A nightly job
that writes a report nobody parses has met the letter of this row and none of its point. The
gradeable question is narrow and checkable: **name the consumer.** If the answer is *a person, when
they remember*, the row is at stage 3, whatever the cron table says.

**And the consumer that matters is one layer along.** [`9f`](./9f-diagnose-the-bottleneck.md)
cannot name a constraint without measurement, and measurement means checks running on a cadence.
**Without this component `J17` has no input** — which is the best available explanation for why the
Grid computes a bottleneck that nothing refreshes. The dependency is stated from `9f`'s side, where it
is a maturity gate; here it is simply the answer to *who reads this.*

**What this layer is not.** It is not [`9b`](./9b-rituals.md) Rituals, which is the human
practice this schedule serves — the ruling that separates them is narrow and deliberate. It is not
[`2b`](./2b-hooks.md) Hooks: a hook is a **lifecycle point the harness defines**, and cadence
is **time or condition you chose**. The same hook mechanism carries both, which is precisely why they
are graded apart.

**How do we work?** *"Review runs nightly and quality checks run on hooks, and every run leaves a record that something else reads."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | Triggers, natively and completely — hooks and scheduled sessions — and **no emission contract**. The schedule half is free; what a run must leave behind, and in what shape, is left entirely to the team, which is the split this row is built on | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Hooks row · [`02-functions.md`](../archive/v0/02-functions.md) §9 |
| **Deep Agents** | **Nothing here, and the near-miss is instructive.** It ships the most re-readable emitted artifact in the corpus — [`8a`](./8a-evals.md)'s scorecard — and **nothing schedules it**: no cron, no trigger, no standing job. A perfect emission with no cadence produces one comparison, taken whenever somebody remembered, which is the half of this row that is not free | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §5 *Evidence* |
| **MCP** | **Nothing here.** MCP has no clock and no lifecycle of its own to fire on — it is a separate row from Hooks in the same survey table for that reason, and it is invoked rather than scheduled | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, rows 6 and 8 |
| **HumanLayer** | Cadence bound to a **phase boundary rather than to a clock**: status is compacted back into the plan file after each *verified* phase. The trigger is the work reaching a checkpoint — a legitimate and under-modelled third answer beside cron and lifecycle events, and the one that emits by construction, because the artifact the phase updates **is** the record | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3 |
| **ours** | `○` — nothing runs on a schedule and no handler is bound at any lifecycle point. Every recurring check this repository holds runs because somebody remembered it, which is stage 1 of this row's ladder: *"nothing runs on a schedule"* | [`03-jtbd.md`](../comparisons/03-jtbd.md) §2 `J5` · [`03-maturity.md`](../archive/v0/03-maturity.md) §4 |

**Horizon:** `shipped` — `02-functions.md` §2 `C-7` — cron-triggered reviews and scheduled quality checks ship natively (hooks, scheduled sessions) and as Gas City's trigger-driven orders; `transcri` 12 is what made the emitted artifact machine-readable

**The consequence.** The trigger is the cheapest thing in this layer and the emission is the whole
value, so the common failure is a team that automates a check and produces nothing durable from it.
**A scheduled run that leaves no artifact is indistinguishable, one week later, from not having run**
— and everything above this row that wanted to measure improvement is left reading the only record
that survived, which is somebody's memory of whether it looked fine.
