---
title: "9a · Learning"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "9 IMPROVE"
sublayer: "9a"
function: "F8.1"
job: "J9 · J6"
horizon: "emerging"
img: img/250-learning.png
wave: W4
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 9a · Learning

**Layer 9 IMPROVE** · function `F8.1` · job `J9 · J6`

> **What happens to a lesson after it is learned?**
>
> Learning is **promotion**: an evaluated outcome becomes a versioned change to the team's canon,
> under **owner approval**, with **rollback**. It promotes *knowledge* — a fact, a rule, a lesson —
> and it is graded on the gate, not on the capture.

**This row is where the field's sharpest bar gets answered rather than asked.**
[`5c`](./component-15-knowledge.md) poses it — *does knowledge compound, or does it just get
retrieved?* — and correctly declines to answer, because a store cannot. **The answer is a gate or it
is nothing**: knowledge appreciates exactly to the degree that something decides a lesson is now
canon, records who decided, and can undo it. Everything else in the loop is capture
([`03-jtbd.md`](../../../comparisons/03-jtbd.md) §2 `J9`).

**The field disagrees about the failure mode, and both positions are funded.** SageOx bet $15M that
**manual** curation is the failure — engineering around it in software and in hardware, because
*"AI agents are missing all the discussions your team is having."* `generic-cerebro` treats
**unratified** capture as the failure and spends the friction on a promotion gate. **Both cannot be
right**, and the disagreement is what makes this row `emerging` rather than settled: the mechanism is
built four ways and nobody has agreed what it is for.

**What is genuinely unbuilt anywhere is the second half of the definition.** The corpus for evaluating
outcomes arrived natively. **Promotion with rollback, and retroactive invalidation of an accepted
result, are shipped by nobody** — including by the peer that regenerates a machine-maintained wiki
from its own repository, which *"does not promote a claim to canon or invalidate downstream work when
a claim breaks"* ([`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §8).

**And promotion has an owner problem this row does not close.** *Who maintains the canon*, as distinct
from who decides it, is `OPEN-9`, and it is recorded once — from the authority side, at
[`10b`](./component-32-org.md). What this file can say is narrower and still useful: **a promotion gate
with no named steward is a gate with no queue**, and the corpus's own instance of that is a nightly
ingest job whose filename ends in a note that it only runs on one laptop.

**What this layer is not.** It is not [`9e`](./component-29-raise-the-floor.md), which promotes
**convention** and retires the second way. `F8` decomposed on exactly that line: this promotes what
the team *knows*; `9e` promotes what the team *does* ([`CROSSWALK.md`](../CROSSWALK.md) §2). It is
not [`8a`](./component-21-evals.md), which produces the finding this consumes.

**How do we work?** *"When a review finds the same class of problem twice it becomes a rule, and that change to how we work was reviewed and can be reverted."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | `◐` — the eval half is real and is enumerated at [`8a`](./component-21-evals.md), and subagent `memory:` scopes give a lesson somewhere to land. **What is absent is the step between them**: nothing native takes a finding, writes it into canon under an owner's approval, and keeps a way back out. The corpus exists; the gate does not | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides* — Learning row |
| **Deep Agents** | `openwiki` is the nearest published loop and it is a **regeneration** rather than a promotion: an agent rewrites the wiki from git history under standing instructions, with per-claim evidence pinning. Its own teardown draws the boundary this row needs — *"no promotion, no rollback, no retroactive invalidation"* | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §4, §8 |
| **MCP** | **Nothing here.** It can connect an agent to the store a lesson would land in, which makes it plumbing for the capture step and never an answer to the gate. Promotion is a decision, and a connection mechanism holds none | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | Learning as **mental alignment rather than artifact**, which is a real and under-argued position: the stated product of review is not correctness but that the team does not *"lose touch with what our product was and how it worked."* A loop that improves the people is measured differently from one that improves the canon, and this peer is explicit about which it is buying | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §2 |
| **ours** | `○` — **designed only, and labelled so in our own architecture record**, which is the honest register and not a grade. The eval doctrine that would feed the gate is written; nothing captures, nothing promotes, nothing rolls back | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture* |

**Horizon:** `emerging` — `03-jtbd.md` §2 `J9` *"Who"* — gbrain, SageOx (automatic capture via hooks), generic-cerebro (finding-classes promoting into standards). The disagreement is named and load-bearing: SageOx treats **manual** capture as the failure mode, generic-cerebro treats **unratified** capture as the failure mode. Both cannot be right

**The consequence.** Capture is cheap and every system in the landscape has some, which makes *having
a learning loop* uninformative. **The grade is the gate**: whether a lesson has an owner, a review and
a way back out. A loop without one accumulates claims rather than knowledge — and the second time the
team hits the same problem, the rule is already written down somewhere nobody was required to read.
