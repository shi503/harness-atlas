---
title: "6d · Delivery"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "6 Workspaces"
sublayer: "6d"
function: "new"
job: "J10"
horizon: "bet"
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 6d · Delivery

**Layer 6 Workspaces** · function `new` · job `J10`

> **How does a finished change get to production?**
>
> Delivery is **the path** — the one route from a merged change to a running system, with its
> **gates**, its **rollback** and its **promotion steps** written down. Its defining property is
> singularity: there is one path, and **an agent's work travels it exactly like a person's**.

**`J10 distribute` splits here, and the split is the argument for the row being new.** Debois's CDLC
names *distribute* and means the delivery of **capability** — getting a skill or a runbook to every
repo and every person, which is [`4a`](./4a-capability.md)'s object. Nothing in `F0`–`F16`
names the delivery of the **product**
([`03-jtbd.md`](../comparisons/03-jtbd.md) §0, §2 `J10`). The evidence that this is
a real hole rather than a tidy one is sitting in this repository: `standards/ci-cd.md` exists **with
no function to hang it on** — the same shape that produced `F14`, a decision-rights table with
nothing to attach it to ([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §2.2).

**One path is the grade, not automation.** A team with three deploy scripts and a person who knows
which one to use has not automated less than a team with one; it has decided less. And the moment an
agent is in the loop, an undecided path is worse than a manual one — a human picks the right script by
knowing which release this is, and an agent picks the first one it finds.

**The agent-equivalence test is what makes this gradeable at all.** *Does an agent's change reach
production by the same route as ours, through the same gates, with the same rollback?* A **yes** is
checkable. A **no** is the specific failure this row exists to name: a parallel path, usually faster,
usually with one gate skipped, invented because the real one was inconvenient at 2am.

**What this layer is not.** It is not [`8a`](./8a-evals.md) Evals — the bar the output must
clear is a judgement, and this is the road it travels once it has cleared. It is not
[`6b`](./6b-infrastructure.md), which is the environment the change *lands in* rather than the
route it takes to get there.

**How do we work?** *"There is one path from a finished change to production, and an agent's work travels it exactly like ours."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | `●` on distribution of **capability** — the mechanism is enumerated at [`4a`](./4a-capability.md) — and **nothing on delivery of a product**. The distinction this row rests on is visible in that one cell: the field's most complete shipping mechanism ships *the harness's own parts* and stops at the boundary its own docs draw | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Distribution row |
| **Deep Agents** | The only peer whose agent reaches production by **the same road a person's change does**: `dcode` runs headless in GitHub Actions, so the delivery path is the repository's existing pipeline rather than a parallel one. **That is the agent-equivalence test passed in a config file.** What the CI surface *restricts* once it is there is enforcement and is graded at [`2c`](./2c-enforcement.md) | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §5 *Distribution* |
| **MCP** | **Nothing here.** It is a call-time connection mechanism with no notion of a release, a gate or a rollback. Naming it in this row would be stretching a tool surface into a pipeline | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | Delivery expressed as **where work is allowed to happen**: only implementation runs in a worktree and *"we tend to do everything else on main"*, so the route to production is defined by which stage of the work you are in rather than by a pipeline. **A phase gate, not a path** — which answers the singularity question and leaves the rollback question untouched | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3 |
| **LoomWarp** | `standards/ci-cd.md` — **the bar written and the path unbuilt.** Seven standards guides describe what good delivery looks like; no repository in the estate is wired to a route that enforces any of it, and the one live run bypassed the controls it did have | [`loomwarp.md`](../content/loomwarp.md#6d-delivery), §*Credibility check* |

**Horizon:** `bet` — No harness taxonomy names delivery of the **product**. Debois's CDLC names *distribute* (`03-jtbd.md` §0) and means delivery of **capability**, which is `4a`. `standards/ci-cd.md` exists in this repo with no function to hang it on. Said out loud

**The consequence.** The most common state is a delivery path that is **mature for humans and
undefined for agents** — the pipeline was built when every change had a person behind it, and nobody
went back to ask whether the new contributor could use it. That reads as maturity for exactly as long
as it takes for one change to reach production down a route no one had reviewed, and the reason it is
hard to catch beforehand is that nothing was broken: **a second path is not a failure until it is the
one that shipped.**
