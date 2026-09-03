---
title: "10b · Org"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "10 Teams & Agents"
sublayer: "10b"
function: "F14"
job: "J14"
horizon: "claimed"
img: img/320-org.png
wave: W4
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 10b · Org

**Layer 10 Teams & Agents** · function `F14` · job `J14`

> **Who answers for this, and who may change it?**
>
> Org is **decision rights** — which role owns which layer outright, is consulted on which, and may
> not unilaterally change what — together with **the escalation target**: the named person an agent
> reaches when it hits the edge of its authority. It is about **authority**, and it holds no
> mechanism of its own.

**The rule this row carries is asymmetric, and the asymmetry is the point.** *Nobody unilaterally
loosens Trust.* **Adding a deny rule is an individual decision; removing one is not.** That is the
same monotonic-narrowing invariant two peers reached independently on the permission side, stated here
as an **authority** rule rather than a config behaviour — because the mechanism lives at
[`2c`](./component-05-enforcement.md) and the question of *who is allowed to reach for it* does not
([`04-decision-layers.md`](../../../archive/v0/04-decision-layers.md) §3).

**An escalation needs a destination, and this is it.** [`3a`](./component-06-control.md) owns the
transferable rule that *an escalation carries a proposed decision*; what `3a` cannot supply is
**whom it carries that decision to.** An escalation with a recommendation and no named recipient
moves the problem to whoever is watching, which is how a bounded retry policy quietly becomes an
interrupt for the person nearest the terminal ([`CROSSWALK.md`](../CROSSWALK.md) §1).

**The marker is `claimed` and the absence is the more useful half.** The claim is real and public —
Chan's *Identity Binding* and AAIF's *Identity & Trust* working group name delegation protocols and
*"how permissions flow across agent-to-agent interactions."* **The absence is in this repository**: a
decision-rights table exists at `04-decision-layers.md` §3 with **no function to hang it on and no
implementation behind it**, which is the shape that argued `F14` into existence in the first place
([`11-architecture.md`](../../../archive/v0/11-architecture.md) §5.1).

> ⚠️ **`OPEN-9` stewardship is open, and it lands nearest to this row.** *Who maintains the system* is
> not *who decides it*, and only the second is recorded anywhere. The prior art has the better answer
> — **an agent over the optimistic tier, a gate over the locked one, split at the promotion event** —
> and the twelve layers give it no home: the nearest are [`9a`](./component-25-learning.md), which
> promotes, and this row, which decides, and **neither owns the steward.** We have neither today, so
> *"we already have a gate"* is not available as an argument
> ([`CROSSWALK.md`](../CROSSWALK.md) §3.4).

**What this layer is not.** It is not [`10a`](./component-31-roster.md) Roster — that is *who exists*,
this is *who answers*. It is not `2c`: this decides that a rule may not be loosened by one person, and
`2c` is where a rule stops being a request. Grading them together is how a team with comprehensive
enforcement and no stated authority scores well right up to the first disagreement about who may turn
it off.

**How do we work?** *"Who may decide what is written down, and an agent that reaches the edge of its authority escalates to a named person."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | Authority expressed as **settings precedence rather than as roles**: managed settings bind non-overridably above project settings, which encodes *someone outranks you* without saying who. ⚠️ And the honest register worth imitating — its own docs call managed settings *"a client-side control, not a security boundary"* | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides* — Policy row, §*Register worth imitating* |
| **Deep Agents** | **Nothing here, stated by its own teardown**: *"no notion of who approved anything."* Its threat model — enumerated at [`1a`](./component-02-environment.md) — maps *where trust changes hands* in rigorous detail while holding **no model of who holds it**, which is the cleanest available illustration that **a boundary and an authority are different objects**, and that shipping the first does not get you the second | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §5, §8 |
| **MCP** | **Nothing here, and the gap is one the field has named.** MCP grants at connection granularity and carries no notion of who authorised the grant. Delegation across agents is exactly what the standards-body working group above says is *unsettled*, which makes this a live absence rather than a settled boundary | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 · [`03-jtbd.md`](../../../comparisons/03-jtbd.md) §2 `J14` |
| **HumanLayer** | The most complete implementation of the **escalation half** in the corpus, and what makes it one is the routing rather than the decision: **contact channels across Slack, email, CLI and web**, so the escalation reaches a person where they already are instead of waiting in a terminal nobody is watching. **A destination, not a pause** — the approval mechanism itself is graded at [`2c`](./component-05-enforcement.md) | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §7 |
| **ours** | A **decision-rights table for six roles across the twelve layers, written and unwired.** It is a real artifact and the only one of its kind in the corpus; nothing reads it, nothing enforces it, and no agent in this repository has an escalation target that resolves to a person | [`04-decision-layers.md`](../../../archive/v0/04-decision-layers.md) §3 · [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* |

**Horizon:** `claimed` — `03-jtbd.md` §2 `J14` *"Named by"* — Chan's *Identity Binding* and AAIF's *Identity & Trust* WG name delegation protocols and how permissions flow across agents. The absence: `02-functions.md` §6 `F9` records the provider as **nobody**, and `04-decision-layers.md` §3 carries a decision-rights table with no implementation behind it

**The consequence.** Decision rights are the one thing on this list a tool cannot supply, which is why
they are usually the last thing written and the first thing needed. **A team that has not stated them
has them anyway** — held by seniority and proximity — and the cost arrives at the moment an agent
does something nobody authorised, when the useful question turns out not to be *how did it get
permission* but *who was supposed to have said no.*
