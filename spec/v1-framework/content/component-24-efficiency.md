---
title: "8d · Efficiency"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "8 Trust"
sublayer: "8d"
function: "F11 (split)"
job: "J12"
horizon: "emerging"
img: img/240-efficiency.png
wave: W4
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 8d · Efficiency

**Layer 8 Trust** · function `F11 (split)` · job `J12`

> **What did that cost, and was it worth buying again?**
>
> Efficiency is **the Accounting**: what a unit of work cost, what it returned, and the **join**
> between the two. The unit is the thing that makes it a Trust concern rather than a finance one — a
> cost attached to a **workstream** answers a business question; a cost attached to a token does not.

**The two measurement axes disagree here, and the disagreement is the finding.** Practitioners are
saturated with the topic — `cost` 70 · `budget` 23 · `spend` 22 · `throughput` 21 · `tokenmax` 13,
with an entire conference track — and **no published harness taxonomy treats budget as a named
function**: not AAIF, Meng, Macedo, Böckeler, Chan or 12-Factor. *"A high-attention operational
concern with no home in any model of what a harness is"* is a much stronger claim than having thought
of it first ([`03-jtbd.md`](../../../comparisons/03-jtbd.md) §2 `J12`).

**The claim was narrowed once, and the narrowed version is the one that ships.** *"Nobody joins cost
to outcome"* is too strong: eval platforms already track feedback score, latency and tokens per
experiment and per task. **What survives is the altitude and the unit** — everyone measures the cost
of an *experiment*; nobody measures what a *workstream* cost the team, or joins that to whether it
shipped ([`02-functions.md`](../../../archive/v0/02-functions.md) §6 `F11`).

**And the field's only published per-team figure comes from a competitor, unprompted.** *"Our team of
three is averaging about $12k on opus per month"*
([`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §3). That is one
number, from one team, in a marketing essay — and it is the entire corpus of per-team cost evidence,
which says more about the row than any argument for it could.

**This row is `9f`'s input, and that is what keeps it out of the finance department.** *"You cannot
detect a constraint without measurement"*, and
[`9f`](./component-30-diagnose-the-bottleneck.md) states its own dependency on this job explicitly. An
accounting nobody diagnoses from is a report; **the reason it sits in Trust is that a team which
cannot say what work costs cannot be trusted to say what to stop doing.**

**What this layer is not.** It is not [`8c`](./component-23-observability.md) — the same event stream
carries both, and reading it for *sequence* and reading it for *spend* are different maturities on
the same wire. It is not `9f`, which consumes this and names the constraint; measurement is a reading,
diagnosis is a judgement, and collapsing them is how a dashboard becomes a substitute for a decision.

**How do we work?** *"We know what a piece of work cost and what it returned, and we can say whether it was worth buying again."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The only native implementation, and it is **attribution without a unit**: OTel emits cost and tokens keyed by `agent.name`, `skill.name`, `plugin.name`, `marketplace.name` and `mcp_server.name`. That answers *which component spent it* completely and *what did this piece of work cost* not at all — the dimensions are the harness's parts, not the team's work | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides* — Evidence row |
| **Deep Agents** | **Nothing, and its own teardown says so in this row's words**: *"no per-unit-of-work cost accounting."* The harness has a full evaluation surface that reports latency and tokens **per experiment**, so the instrumentation exists and is pointed at the model rather than at the work — which is the unit distinction this row rests on, arriving as a design choice rather than as an omission | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §5, §8 |
| **MCP** | **Nothing here, and it is a boundary rather than an omission.** MCP is a connection mechanism; the spend it causes is measured on the harness side, which is why the Claude Code row above can key cost *by* MCP server. There is no accounting inside the protocol to have | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The corpus's **only published per-team cost figure** — *"about $12k on opus per month"* for a team of three — reported in prose rather than instrumented, alongside a named two-week failure on a race condition. Not a system; a **register**, and the one nobody else in this landscape has adopted | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §3 |
| **ours** | `○`. Cost is invisible: no per-workstream accounting, no budget, and no figure of our own to put beside the one above. The dispatch record exists and carries no spend, which is this row's stage-1 cell exactly — *"cost is invisible"* | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* · [`03-maturity.md`](../../../archive/v0/03-maturity.md) §4 |

**Horizon:** `emerging` — `03-jtbd.md` §2 `J12` — two implementations, and they disagree on the unit: Claude Code attributes cost per agent, skill, plugin and MCP server; DX/Jellyfish instrument org throughput. **No harness taxonomy names budget as a function.** `cost` 70 · `budget` 23

**The consequence.** A team that cannot price a unit of work cannot retire one, so every capability it
adds is permanent by default — and the first serious question from outside the team, *what is this
returning*, has no answer that is not an anecdote. **The absence is not felt while the invoice is
small**, which is why the row is usually reached after it would have been most useful.
