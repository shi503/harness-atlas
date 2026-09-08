---
title: "8b · Evidence"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "8 Trust"
sublayer: "8b"
function: "F7"
job: "J8"
horizon: "shipped"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 8b · Evidence

**Layer 8 Trust** · function `F7` · job `J8`

> **How does someone who was not there come to believe it?**
>
> Evidence is **the ledger**: every completion claim resolves to an artifact. It holds **the Event
> Stream** of what happened, **the Verdict** as a typed result rather than parsed prose, and — the
> part that is still scarce — **the Join** between the context a unit of work saw and what came of
> it. Completion is proven, never asserted.

**The field observes runs thoroughly and does not join them, and the corpus can measure the gap.**
Across the 562-session corpus: `trace` 65 · `audit` 39 · `evidence` 22 · `attribut` 14 — against
**`provenance` 9 · `receipt` 4**. Observation is saturated; the join is not
([`00-README.md`](../comparisons/00-README.md) §F-4).

**The claim is `claimed`, not `bet`, and the distinction is dated.** Govindarajan (OpenAI) named the
**run receipt** on a conference stage — *"a model proposes, the harness commits, and the receipt
proves it"*, covering *"what woke it up, which state did it inherit, what authority did it use, what
executed, and what evidence survived."* **No shipped implementation was demonstrated**, which is
exactly what `claimed` means: the ground is named and not taken, and *"nobody is claiming this"*
should not be said again without a date on it
([`12-horizon.md`](../spec/v1-framework/12-horizon.md) §3.3).

**The nearest shipped thing stops in a specific place, and naming where is what makes the marker
honest.** Deep Agents' `openwiki` ships content hashing, version pinning and reconstruction and has
neither owner attribution nor a join to outcome — **the mechanism is enumerated at
[`5c`](./5c-knowledge.md)**, where it is graded as retrieval. What matters here is the unit:
it pins **what a document asserts about a repository**, and the join is over **a run**. A staleness
detector for prose is a real thing and a different one.

**And the sharpest corroboration comes from a critic.** Describing why bad design cannot be learned,
the keynote this corpus files under *positions worth answering* states the missing mechanism in the
same words: ***"there's no way to backprop the incident to the decision that caused it."*** **This
component is the affirmative form of that impossibility claim** — and its author's own answer is the
cheaper one, moving humans upstream rather than building the join, which is the argument that has to
be met at scale rather than dismissed
([`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §2, §10).

**What this layer is not.** It is not [`8c`](./8c-observability.md) Observability — a trace
shows *the steps*, a ledger holds *the claims*, and a team can watch every step of work whose
completion nobody recorded. It is not [`5c`](./5c-knowledge.md), which stores what was read;
this records **that it was read, by whom, and what followed**. ⚠️ It is also the named candidate for a
third accumulating layer, and the argument for why it is excluded today lives with the `⟳` falsifier
at [`5a`](./5a-individual-memory.md) rather than here.

**How do we work?** *"'Done' means the tests ran and here is the record — we can show you what was run and what it produced."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The most complete raw material anywhere, and **nothing that writes the joined record.** OTel metrics, events and spans attributed by agent, skill, plugin, marketplace and MCP server; a full permission audit trail via `claude_code.tool_decision` carrying decision and source. The building blocks report *what loaded* and *what was decided*; the correlation keys exist; **nothing reconstructs the join** | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Evidence row, §*What it does not provide* |
| **Deep Agents** | The closest thing in the corpus to **a run receipt somebody actually shipped**, and it is on a benchmark rather than on a unit of work: every scorecard number footnoted to a run ID, a date, a judge model, a harness SHA, the sandbox, the rollout count and the wall-clock — including the honest note that **14 of 246 errored trials are scored as failures**. A reproducibility manifest, published | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §4, §5 *Evidence* |
| **MCP** | **Nothing here.** A per-call connection mechanism emits no durable record of its own; whatever is known about an MCP call is known because the harness around it wrote it down. That is why the attribution in the Claude Code row is keyed *by* MCP server rather than *from* one | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | **Every approval is an evidence record**, because the decision carries prose rather than a bit — the approval API is enumerated at [`2c`](./2c-enforcement.md), where it is the mechanism. What is `8b`'s is the consequence: a ledger whose entries explain *why*, produced as a side effect of the gate rather than as a separate logging step | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §7 |
| **LoomWarp** | `events.jsonl`, CloudEvents-shaped — **8 real events, none schema-validated, and the outcome regexed out of markdown.** It is nonetheless the only column in the matrix already holding *both halves* of the join, an inherited decision store and a structured run-event stream: **for everyone else the join is a build; here it is an integration that has not happened** | [`loomwarp.md`](../content/loomwarp.md#8b-evidence) · [`02-component-matrix.md`](../comparisons/02-component-matrix.md) §1 |

**Horizon:** `shipped` — `03-jtbd.md` §2 `J8` *"Who"* — Claude Code OTel with full attribution; Gas City's Event Stream; SageOx's Ledger; QM's durable Postgres. ⚠️ The **join** to context is a separate marker and stays `claimed` — `12-horizon.md` §3.3

**The consequence.** The ledger is the cheapest row in Trust to reach and the easiest to mistake for
finished, because a stream of events looks like proof. **What separates a record from a receipt is
whether a stranger can reconstruct one past run from it** — and the honest state of the field is that
five systems can tell you what happened and none can tell you what it was working from when it
happened.
