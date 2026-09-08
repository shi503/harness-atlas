---
title: "Transfer manifest — what to lift, adapt, rebuild, or leave"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# Transfer manifest

**What this is.** Every mechanism in `generic-cerebro`, with two verdicts: whether the harness now supplies it natively, and what LoomWarp should therefore do about it.

**Why two verdicts.** `loomwarp-team-system` `references/claude-code/30-gap-analysis-loomwarp.md` (private) established that for five of seven elements the harness now supplies substantial native mechanism, with verdicts of *adopt* or *re-found*. A mechanism that Claude Code already provides must not be ported from a predecessor — porting it means maintaining a worse version of something free. So the first question for every row is not *"is this good?"* but *"is this still ours to build?"*

**The headline.** Almost everything executable is superseded. Almost everything contractual is not.

---

## 1. Verdict key

| Verdict | Meaning |
|---|---|
| **LIFT** | Take close to verbatim. No native equivalent, low adaptation cost |
| **ADAPT** | The pattern transfers; the implementation needs rework for a federated estate |
| **REBUILD** | The idea is right, the implementation is wrong or single-repo-bound |
| **SKIP — native** | The harness supplies it. Do not port |
| **SKIP — content** | Initiative-specific. Not machinery |
| **HAVE** | LoomWarp already has it, from this or another source |

---

## 2. The manifest

### Estate — *native coverage: high · gap-analysis verdict: re-found*

| Mechanism | Native? | LoomWarp state | Verdict | Effort |
|---|---|---|---|:--:|
| Repo system map with per-repo grounding commands | No | absent | **ADAPT** | S |
| Sibling-checkout path convention as a citation format | Partial | absent | **ADAPT** | S |
| Content-hash doc-ID + resolver (designed, unbuilt) | No | absent | **REBUILD** | M |
| Hub-holds-no-product-code identity boundary | No | implicit | **LIFT** | XS |

The system map is the row worth taking. It is not a registry — it is a table of *grounding commands*: for each repo, the literal command to run before asserting anything about its current state. That is a discipline the native monorepo guidance does not supply, and it directly serves the composing agent in [`01`](./01-the-composition-contract.md).

### Context — *native coverage: low · verdict: build. This is the differentiation*

| Mechanism | Native? | LoomWarp state | Verdict | Effort |
|---|---|---|---|:--:|
| **Memory / knowledge / decision routing doctrine** | No | **absent** | **LIFT** | **XS** |
| `paths:`-scoped rule files | **Yes** — `.claude/rules/` with `paths:` | absent | **LIFT** (use native) | S |
| Parent-child instruction hierarchy | **Yes** | absent | **SKIP — native** | — |
| Librarian tier with two concurrency models | No | absent | **ADAPT** | M |
| `_INBOX` → raw → sources → synthesis pipeline | No | absent | **ADAPT** | M |
| Capture separated from interpretation | No | absent | **LIFT** | XS |
| Report-never-edit posture for corpus automation | No | absent | **LIFT** | XS |
| Committed lexical retrieval floor | No | absent | **REBUILD** | M |
| Published retrieval quality/cost trade | No | absent | **LIFT** | XS |
| Context provenance joined to outcome | No | **unbuilt everywhere** | **BUILD** | L |

Context is where the gap analysis says to spend the recovered effort, and it is where this predecessor has the most that is genuinely unclaimed. The routing doctrine is the cheapest high-value item in the whole manifest: one rule file, hours of work, and it fills a cell the crosswalk currently records as a parenthetical.

### Control — *native coverage: high · verdict: adopt, delete the hand-rolled resolver*

| Mechanism | Native? | LoomWarp state | Verdict | Effort |
|---|---|---|---|:--:|
| **The composition contract (C-1…C-8)** | **No** | partial | **LIFT** | **S** |
| PRD template with read/write manifest + CI gate | No | template exists, thinner | **LIFT** | S |
| Tier-0 intent doc with cache discipline + precedence | No | **HAVE** (own strategist) | **ADAPT** | S |
| Orchestrator context-economy + delegation threshold | No | absent | **LIFT** | XS |
| Blueprint as a *declaration* of dependency edges | No | **HAVE** | — | — |
| `router.py` state machine | **Yes** — agent teams: task dependencies, file-locked claiming | **HAVE** (vendored, same defect) | **SKIP — native** | — |
| Per-subtree state isolation workaround | n/a | absent | **SKIP** | — |
| Defect register + pre-decomposition triage gate | No | **HAVE** (register), gate absent | **LIFT** (the gate) | XS |
| Release-cut archive discipline + never-archive list | No | absent | **LIFT** | S |
| Five-status PRD vocabulary vs three-status router | n/a | n/a | **SKIP — defect** | — |

**This is the row that matters.** The resolver is superseded; the contracts around it are not. Agent teams dispatch tasks — they do not tell you that a task needs an enumerated read/write manifest, a runnable gate, and a self-containment guarantee. See [`01-the-composition-contract.md`](./01-the-composition-contract.md) and [`03-fractal-as-iterated.md`](./03-fractal-as-iterated.md) §3 for why the state machine specifically must not come across.

### Capability — *native coverage: high · verdict: adopt; keep `standards/`*

| Mechanism | Native? | LoomWarp state | Verdict | Effort |
|---|---|---|---|:--:|
| Plugin + marketplace distribution | **Yes** — plugins, marketplaces, SHA pinning, semver, `validate --strict` | `sync-skills.sh` | **SKIP — native** | — |
| Audience-cut plugins + asymmetric governance | No | absent | **LIFT** | XS |
| Personal namespace at user scope, never reviewed | Partial | absent | **LIFT** | XS |
| **Distribution rule — no hub-path dependency** | No | absent | **LIFT** | **XS** |
| Naming what distribution cannot reach | No | absent | **LIFT** | XS |
| Standards tier + inheritance contract | No | **HAVE** | — | — |
| **Compounding finding-class tier + promotion** | No | **absent** | **ADAPT** | **M** |
| Triggering-is-the-description discipline | Partial | absent | **LIFT** | XS |
| `disable-model-invocation` floor for side-effecting skills | **Yes** (the field) | absent (the policy) | **LIFT** | XS |
| Duplicate agent definitions across scopes | n/a | n/a | **SKIP — defect** | — |

### Policy — *native coverage: high · verdict: the gate is now a config change*

| Mechanism | Native? | LoomWarp state | Verdict | Effort |
|---|---|---|---|:--:|
| Anything enforcing | — | — | **`generic-cerebro` has nothing to give here** | — |
| Autonomy layer table (who owns which gate) | No | policy tiers exist | **LIFT** | XS |
| Named permission gates in onboarding | No | absent | **ADAPT** | S |

**The predecessor is empty on this function.** No settings file, no hooks, no validators — verified. Every ADR seed that pairs a contract with a hook is proposing something *neither* system has built. That pairing is the point: adopting the contracts alone reproduces this predecessor's exact ceiling.

### Evidence — *native coverage: medium-high · verdict: adopt for run evidence, build the join*

| Mechanism | Native? | LoomWarp state | Verdict | Effort |
|---|---|---|---|:--:|
| Layered evaluation, bottom two blocking | No | absent | **LIFT** | S |
| False-positive register in the judgment template | No | absent | **LIFT** | XS |
| Diff-scope check against the declared manifest | Partial | absent | **ADAPT** | S |
| Handoff evidence table + explicit-`None` discipline | No | template exists, thinner | **LIFT** | XS |
| Bounded retry, escalate with a recommendation | No | absent | **LIFT** | XS |
| Model-free heartbeat check | No | **HAVE** (pulse skill) | **ADAPT** | XS |
| Structured run events | **Yes** — OTel with full attribution | `events.jsonl` | **SKIP — native** | — |
| Decision-store audit trail with before/after hashes | No | **HAVE** (inherited code) | — | — |
| **Decision → work-outcome join** | No | **unbuilt everywhere** | **BUILD** | L |

### Learning — *native coverage: medium · verdict: adopt the eval loop, build the promotion gate*

| Mechanism | Native? | LoomWarp state | Verdict | Effort |
|---|---|---|---|:--:|
| Finding-class → standards promotion | No | absent | **ADAPT** | M |
| Synthesis tier with `sources:` provenance | No | absent | **ADAPT** | S |
| Promotion ceremony into the decision store | No | store present, ceremony absent | **LIFT** | S |
| Nightly maintenance automation | No | absent | **REBUILD** — theirs cannot leave one machine | M |
| **The 18-row maturity rubric** | No | Grid exists (7 rows) | **ADAPT** | S |

---

## 3. The Grid delta

What LoomWarp could evidence with the LIFT and ADAPT rows landed. Current grades from [`../../../elements.md`](../../../elements.md) §3.

| Function | Now | After | What moves it |
|---|:--:|:--:|---|
| Estate | 3 | 3 | Nothing here moves it; the native re-founding does |
| Context | 2 | **4** | Routing doctrine, `paths:` rules, librarian tier, capture pipeline — layered, owned, reviewable |
| Control | 4 | 4 | Already 4. The contracts make the 4 *true* rather than resting on an unexercised resolver |
| Capability | 2 | **4** | Native plugins + governance + the compounding tier |
| Policy | **1** | **1** | **Nothing here moves it.** The predecessor is empty on this function |
| Evidence | 3 | **4** | Blocking gates, evidence tables, diff-scope checks |
| Learning | 1 | **3** | Finding-classes and synthesis are *"a wiki someone maintains"* — honestly stage 3, not higher |

**Minimum stays 1.** That is the whole point of the delta table and the reason it is here rather than buried.

The fabric is governed by its thinnest section, and this transfer does not touch it. Six of seven rows improve and the system's real grade does not move at all, because prior art cannot supply an enforcement layer its author never built. **Policy is a config change on native primitives, not a port** — the gap analysis says so, and it is the only work in this whole exercise that changes the minimum.

Two corollaries worth stating:

- **Sequence Policy first or accept that the delta is cosmetic.** Every contract lifted from [`01`](./01-the-composition-contract.md) lands as prose until a hook makes it bind. That is exactly how the predecessor got to 130 workstreams with a bus factor of one.
- **Do not claim 6 anywhere.** [`../../../elements.md`](../../../elements.md) §3 warns that a self-improving function needs a corpus of evaluated outcomes to improve from. Nothing here supplies that corpus.

---

## 4. The maturity rubric — a note on lineage

The predecessor's 18-row self-grading rubric is the direct ancestor of the Grid. Same six stages, same three-era framing, same commitment threshold at 3 → 4, same argument that *the minimum diagnoses and the average flatters*. LoomWarp's own v0 specs already cite it as prior art.

The Grid grades **structural completeness of seven elements**. The rubric grades **an organization across five bands** — posture, practices, threshold markers, operating mechanics, and signals — in 18 rows, each with a current stage, a target, and a boundary annotation classifying the gap as internal-capability or externally-imposed.

They are not competitors; they are two instruments at different altitudes, and [`../../00-README.md`](../../00-README.md) §F-5 correctly identifies the maturity diagnostic as a better adoption wedge than provenance, *because it costs an adopter nothing to try.* The rubric makes that wedge sharper in three ways worth taking:

1. **Two markers per row, not one** — current *and* target. The gap is the artifact; a single score is not actionable.
2. **The boundary annotation** — is this gap ours to close, or is something outside the team capping us? That single column turns a self-assessment into a negotiation surface with leadership.
3. **Grader-uncertainty flags** — the rubric names which of its own scores are most contestable and would most move the mean. A self-grade that tells you where to argue with it is far more credible than one that does not.

**Recommendation:** keep the Grid as the headline diagnostic — seven rows is the right resolution for adoption — and take the two-marker format, the boundary column, and the uncertainty flags into it. Cite the rubric as the fine-grained instrument for teams that want a deeper pass.

---

## 5. Reading this manifest in one line

**Take the contracts, the doctrines and the loops. Leave the code.** Everything executable in the predecessor is either superseded by the harness or defective in a way both systems independently discovered. Everything contractual is unclaimed by the harness, unclaimed by the landscape, and sitting in a repository with no licence and one operator.

---

*Companion: [`01-the-composition-contract.md`](./01-the-composition-contract.md) — the highest-value rows · `loomwarp-team-system` `references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md` (private) — the same rows, sequenced and decidable · `loomwarp-team-system` `references/claude-code/30-gap-analysis-loomwarp.md` (private) — the native-coverage verdicts*
