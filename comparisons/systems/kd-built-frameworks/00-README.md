---
title: "Teardown — generic-cerebro (prior art, self)"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# generic-cerebro — the prior art

**What this folder is.** A full teardown of `generic-cerebro`, the agent-OS this author built and ran before LoomWarp, documented at mechanism level so LoomWarp can inherit what works and skip what the harness has since absorbed.

**Why it exists.** The comparison corpus profiles eight systems. The only one of the author's own systems in it is *upstream* FRACTAL — 74 lines, "by reference," pinned at a commit. The larger, far more iterated system is absent from the crosswalk, the component matrix and the JTBD doc, and survives only as five marginal notes asking for exactly this treatment. Meanwhile [`../../00-README.md`](../../00-README.md) §F-5 claims the standards tier is the one row where LoomWarp stands alone — a claim this folder falsifies, because that tier is inherited prior art.

**The thesis.** The transferable asset is not orchestration code. [`../../../claude-code/30-gap-analysis-loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/claude-code/30-gap-analysis-loomwarp.md) already established that four of seven elements now have substantial native implementations, and priced the hand-rolled resolver at approximately zero. What survives that verdict is a set of **contracts about what a dispatching agent must compose before it dispatches** — and those are what [`01-the-composition-contract.md`](./01-the-composition-contract.md) names, [`adr-seeds/`](../../../archive/adr-seeds/README.md) records, and [`ENRICHMENT-PLAN.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md) sequences.

---

## Reading order

| # | Document | What it settles |
|---|---|---|
| 01 | [`01-the-composition-contract.md`](./01-the-composition-contract.md) | **Start here.** The eight contracts a dispatching agent honours, and why they outlive the resolver |
| 02 | [`02-generic-cerebro.md`](./02-generic-cerebro.md) | The system teardown and the credibility check, in the self-teardown shape |
| 03 | [`03-fractal-as-iterated.md`](./03-fractal-as-iterated.md) | What changed between upstream FRACTAL and this instantiation |
| 04 | [`04-decision-ledger.md`](./04-decision-ledger.md) | The decision store — schema, guards, write path |
| 05 | [`05-context-and-the-librarian.md`](./05-context-and-the-librarian.md) | The wiki substrate, the librarian tier, retrieval, capture rituals |
| 06 | [`06-capability-and-standards.md`](./06-capability-and-standards.md) | Plugins, distribution, the standards tier and its compounding half |
| 07 | [`07-transfer-manifest.md`](./07-transfer-manifest.md) | **The payoff.** Every mechanism → port verdict, reconciled against the native-coverage verdicts |
| 08 | [`08-appendix-schemas.md`](./08-appendix-schemas.md) | Lift-ready schemas and templates |
| — | [`adr-seeds/`](../../../archive/adr-seeds/README.md) | 19 store-format ADR drafts, `status: proposed`, staged not filed |
| — | [`ENRICHMENT-PLAN.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md) | The go/no-go table, each row backed by a dispatchable workstream |

Read **01 → 07** for the argument. 02–06 are reference.

---

## 1. Does it pass the inclusion test?

[`../../00-README.md`](../../00-README.md) §1 sets three questions. A system needs all three to be a peer rather than an adjacent tool. Run honestly:

| # | Question | Verdict |
|---|---|---|
| 1 | **Does it persist across sessions?** | **Pass.** 1,445 markdown files, a 242-entry decision store, a 279-document retrieval index, and nine path-scoped rule files that load on glob match. Nothing here dies with the process. |
| 2 | **Does it serve more than one person?** | **Pass, thinly.** Six plugins distributed through a marketplace manifest, an onboarding path written for a second person, a testflight run with a teammate. But the bus factor is 1 and the second-person install has never fully succeeded unassisted. |
| 3 | **Does it bind mechanically?** | **Fail.** Verified this session: no `.claude/settings.json`, no hooks directory anywhere in the repo, no `"hooks"` key in any JSON. Every guardrail is prose in `CLAUDE.md` and `.claude/rules/**` that a model may ignore. The enforcement layer is specced and unbuilt. |

**Two of three.** The third failure is not incidental — it is the same hole LoomWarp grades at Stage 1 on Policy, and it is why several of the ADR seeds pair a contract with the hook that would enforce it. A system that fails question 3 is, by the corpus's own definition, a style guide with excellent filing.

That verdict is worth stating plainly at the top rather than buried in a credibility check, because it sets the ceiling on everything downstream: **`generic-cerebro` is the strongest available evidence for what these contracts do when a disciplined operator follows them, and no evidence at all for what they do when someone does not.**

---

## 2. The notes this folder answers

Four annotations in the corpus were effectively pre-filed requests. Each is answered:

| Note | Ask | Answered in |
|---|---|---|
| [`../../00-README.md`](../../00-README.md) §F-2b | *"our generic-cerebro has a librarian… see if we can find the librarian and how it's supposed to be processed and managed"* | [`05`](./05-context-and-the-librarian.md) §1–§3 — it is a **tier**, not an agent, and the automation half exists but is explicitly local-only |
| [`../../00-README.md`](../../00-README.md) §5 | *brain × source* — and keeping the decision ledger as ours | [`04`](./04-decision-ledger.md) §5 — where it beats the incumbent on attribution, and where the join it does **not** close leaves the matrix row honest |
| [`../../01-concepts.md`](../../01-concepts.md) §3 | *"adopt the latest version of FRACTAL that has been iterated on in generic-cerebro"* | [`03`](./03-fractal-as-iterated.md) — the full delta, including the parts not worth adopting |
| [`../../01-concepts.md`](../../01-concepts.md) §3.15 | *"all of our rituals are similarly manually invoked and were not fully integrated"* | [`05`](./05-context-and-the-librarian.md) §4 — confirmed, with the one automation that did land and the filename that admits its limit |

---

## 3. Genericization boundary

`generic-cerebro` is a working corpus for a healthcare engineering team. This folder documents its **machinery**, not its content.

**Removed:** company and product names, the initiative's name, sibling product-repo names, teammate initials other than the corpus owner's, ticket keys, and anything touching regulated data. Absolute local paths do not appear in prose.

**Retained:** identifier *shapes* — `D-NNN`, `CH-NN`, `FM-N`, `WS-N`, `ISSUE-NNN`. These carry structural meaning (a decision ledger *has* stable IDs; a failure-mode register *is* numbered) without carrying content, and dropping them would make the mechanisms unreadable. Where a specific decision or issue is cited, it is cited by ID and by what it decided, never by who or what it was about.

**One consequence worth naming:** some claims in this folder are therefore weaker than their evidence. Where a mechanism's justification is a specific incident, the incident is described in kind rather than in particular. That is the intended trade.

---

## 4. Where the numbers came from

Every count in this folder was re-verified against the working tree on 2026-08-11 rather than copied from the system's own documentation — because [`02`](./02-generic-cerebro.md) §5 documents that system's own counts disagreeing with each other across three surfaces, and a hand-copied number is exactly how that failure propagates.

Retrieval-derived claims cite `file:line` per the corpus convention. Structural claims cite a path. Counts cite the command that produced them where the command is not obvious.

---

*Companion: [`../../01-concepts.md`](../../01-concepts.md) — the vocabulary · [`../../02-component-matrix.md`](../../02-component-matrix.md) — the rubric · [`../fractal.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/fractal.md) — the upstream this iterated from · [`../loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) — the successor*
