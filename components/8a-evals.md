---
title: "8a · Evals"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "8 Trust"
sublayer: "8a"
function: "F6 (split)"
job: "J6 · J15"
horizon: "shipped"
graded: true
requires: []
---

[← the roster](./00-README.md) — all 33, and the graded split · [CROSSWALK](./CROSSWALK.md) — recorded gaps and the rulings that closed them · [RELATIONS](./RELATIONS.md) — the `requires` graph

### 8a · Evals

**Layer 8 Trust** · function `F6 (split)` · job `J6 · J15`

> **What does the work have to clear before it ships?**
>
> Evals is **the bar the output must clear**, and **the check that decides** whether it did. It is the
> **post-hoc** half of enforcement: the Sensors that inspect work already done, as distinct from the
> Guides that helped write it. Its defining property is that the check **blocks** rather than
> advises — and that the agent did not write it.

**This is one appearance of one mechanism, and the file has to say which.** The mechanism lives at
[`2c`](./2c-enforcement.md) Enforcement, in the harness, and it presents twice: **Guides**
pre-hoc at [`3e`](./3e-standards.md), **Sensors and Evals** post-hoc here. That is Böckeler's
split, and the enumeration of the mechanism ladder belongs to `2c` and is not repeated here. **What
`8a` owns is the judgement** — the bar, and the verdict against it.

> **What layer 8 grades is a judgement, and this row is where the judging happens.** That is why
> enforcement sits beneath it rather than beside it — the cardinality of Trust and the reason
> enforcement is not one of its rows are settled at [`2c`](./2c-enforcement.md)
> ([`CROSSWALK.md`](../archive/spec/v1-framework/CROSSWALK.md) §2.1).

**`eval` scores 263 — the single most-discussed term in the field** — and the volume is the problem
rather than the evidence. Everything from a unit test to an LLM judge is called an eval, so the
gradeable property cannot be *has evals*. **It is whether some layer blocks.** The clearest published
shape is four layers with the bottom two blocking and a **false-positive register** attached, because
a gate that fires wrongly and has nowhere to record it is a gate teams learn to route around.

**`J15 secure and harden` splits, and the half that lands here is the one that decays quietly.** The
split and its two failure modes are argued at [`2c`](./2c-enforcement.md); what this row owns
is the *harden* half — the vulnerability surface and the quality long tail. **The evidence for taking
it seriously is a measurement**: `security` scores **62** with its own conference track, and is
**absent from every published harness taxonomy**. A team grading its output bar on permissions alone
scores well while shipping the long tail
([`03-jtbd.md`](../archive/comparisons/03-jtbd.md) §2 `J15`).

**And the ceiling argument has to be answered here rather than deflected.** The strongest published
attack on this component is that review agents *"don't move the ceiling, because the ceiling is
whatever we managed to teach the model in RL"* — maintainability has no fast oracle, so it cannot be
rewarded ([`systems/humanlayer.md`](../archive/comparisons/systems/humanlayer.md) §2). **If
that holds, `8a` raises the floor and stops**, which is exactly why [`8b`](./8b-evidence.md)
exists as a separate row and why the ordering of human review is [`9b`](./9b-rituals.md)'s.

**What this layer is not.** It is not `3e`, which authors the standard. It is not
[`8b`](./8b-evidence.md), which records what happened — a verdict is a judgement, a record is
a fact, and a team can have immaculate telemetry over a bar nobody set.

**How do we work?** *"Nothing ships until it clears a bar we wrote down, and the check that decides is one the agent did not write."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The `skill-creator` eval harness — isolated per-case runs, assertion grading **with evidence**, with/without benchmarking and blind A/B. Note what it grades: **the capability, not the work**. It is a working eval pyramid pointed at the skill, and nothing native points one at the output of a unit of work | [`systems/claude-code.md`](../archive/comparisons/systems/claude-code.md) §*What it provides* — Learning row |
| **Deep Agents** | The most complete answer in the corpus, and it is **two objects**. In the loop, `RubricMiddleware` grades at the moment the agent would finish, **per criterion**, on the vocabulary `satisfied` \| `needs_revision` \| `failed` — with a validator that **rejects a grader's own output when the overall verdict contradicts the per-criterion verdicts**, a consistency check on the judge itself. Out of it, 136 evals across 8 categories and a published cross-model scorecard. The *declaration* half of the rubric is a standard and is graded at [`3e`](./3e-standards.md); **the grading is the sensor, and it is this row** | [`systems/langchain-deepagents.md`](../archive/comparisons/systems/langchain-deepagents.md) §2 *Rubric*, §5 *Evidence* |
| **MCP** | **Nothing here, and the reason is the same one that keeps enforcement out of the connection layer.** A tool surface carries no opinion about whether its output is good. Every judgement in this row is made by the harness around it | [`07-verified-inventories.md`](../archive/comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | The clearest published **argument against over-investing here**, from the company that sells review: models are rewarded on `FAIL_TO_PASS` / `PASS_TO_PASS` and *"there is no penalty for bad design"*, because *"tests give you feedback in seconds, but the cost function of bad architecture is measured in weeks."* Its answer is to move the human upstream rather than to build a better sensor | [`systems/humanlayer.md`](../archive/comparisons/systems/humanlayer.md) §2 |
| **LoomWarp** | `standards/definition-of-done.md` and `standards/evaluation-doctrine.md` — **the bar written, the sensor absent.** The doctrine describes an eval pyramid that a vendor has since implemented and LoomWarp has not; `events.jsonl` classifies outcomes by regexing markdown, which is a reading rather than a gate | [`loomwarp.md`](../content/loomwarp.md#8a-evals) |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 0 · ◐ 8 · ○ 2** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#8a-evals) | ◐ | Code Review's multi-agent verification pipeline — explicitly non-blocking |
| [Codex](../content/codex.md#8a-evals) | ◐ | `guardian-context` review/scoring gate; not a benchmark harness |
| [FRACTAL](../content/fractal.md#8a-evals) | ◐ | Four-layer model (Deterministic→LLM→Persona→Benchmark), dev-facing |
| [Gas City](../content/gas-city.md#8a-evals) | ○ | Nothing here — only a `retry-eval` control-bead *kind*, not a quality gate |
| [Grok](../content/grok.md#8a-evals) | ◐ | No eval harness; `/goal`'s independent evidence review is nearest |
| [Hermes](../content/hermes.md#8a-evals) | ◐ | `evals/` dir, ~17k tests; dev-facing, no ship-gate for skills |
| [LoomWarp](../content/loomwarp.md#8a-evals) | ◐ | A real five-layer doctrine; the shipped classifier is the anti-pattern it forbids |
| [OpenClaw](../content/openclaw.md#8a-evals) | ◐ | Personal-agent benchmark pack; dev-facing, not a ship gate |
| [OpenCode](../content/opencode.md#8a-evals) | ○ | Nothing shipped for users; project's own CI/tests only |
| [Pi](../content/pi.md#8a-evals) | ◐ | `packages/evals` with baseline/candidate lift — dev-facing, not a ship gate |

**Horizon:** `shipped` — `03-jtbd.md` §2 `J6` *"Who"* — generic-cerebro's four layers with the bottom two blocking and a false-positive register; Indigo's CI as back-pressure; Claude Code's `skill-creator` eval harness; Gas City's multi-model adversarial review. `eval` 263, the most-discussed term in the corpus

**The consequence.** This is the loudest row in the field and the one where volume is least
informative — a team can hold every eval in the category and still ship whatever it likes, because
none of them blocks. **The gradeable question is not how much you check but what your checks are
allowed to stop**, and the answer to that is a single fact about the team rather than a feature of
the harness.
