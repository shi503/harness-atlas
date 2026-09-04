---
title: "Lineage — the published models we sit among"
tier: spec
project: loomwarp
created: "2026-08-27"
status: ARCHIVED
owner: KD
---

# Lineage

**What this is.** The survey of published models for describing *how AI-assisted work gets done*, so
that what we build extends a recognised lineage instead of inventing a parallel vocabulary. One
entry per model: what it actually says, where it came from, **what we take**, and **what we do not**.

**Why it exists.** `NEXT-STEPS.md` asks to *"clearly mark ourselves within the lineage of this
emerging space."* You cannot do that by asserting adjacency — you do it by reproducing each model
faithfully enough that a reader can check, then saying precisely which part you are building on.

**Posture, decided 2026-08-27: cite and corroborate. Do not adopt a spine.** This document does not
pick a parent framework. It establishes what exists so that [`07-the-map.md`](../07-the-map.md) can
place itself against it.

**Sourcing notation**, the corpus convention: **✅ direct** — primary source read · **◐ relayed** —
reputable secondary only · **⚠️ unverified** — could not establish; do not build on it.

> **Read [`../../references/comparisons/2026-08-research/99-source-hygiene.md`](../../comparisons/2026-08-research/99-source-hygiene.md)
> before citing anything here.** It records two fabrications already circulating in this space —
> a survey paper that does not exist, and a maturity model misattributed to Anthropic. Section 1
> below documents how close this project came to producing a third.

---

## 0. What was already surveyed, and is not repeated here

The **function taxonomies** and **readiness grids** are catalogued in full elsewhere. This document
does not duplicate them:

| Where | What it holds |
|---|---|
| [`../../references/comparisons/2026-08-research/02-harness-taxonomies.md`](../../comparisons/2026-08-research/02-harness-taxonomies.md) | AAIF's five functions · Meng's `H = (E,T,C,S,L,V)` · Macedo's `T1–T4` · Böckeler's Guides and Sensors · Chan et al. · HumanLayer's 12-Factor Agents |
| [`../../references/comparisons/2026-08-research/06-frameworks-addendum.md`](../../comparisons/2026-08-research/06-frameworks-addendum.md) | Factory.ai · Microsoft · Debois · Hassan · and the three-genre split that governs how any of them may be mapped onto another |

**What is new here** is the third thing neither of those covers: the **loop models**, the **context
engineering decompositions**, and the **published stack diagrams** — which is where the answers to
*"what is the foundation called"* and *"how does context decompose"* actually live.

---

## 1. ⚠️ The correction this survey opened with

**Our own corpus recorded a framework that does not exist.**

[`01-worldsfair-2026-vocabulary.md`](../../comparisons/2026-08-research/01-worldsfair-2026-vocabulary.md)
§4 carried a row reading **"The five loops."** There is no published framework by that name.

Voss's actual sentence is *"I counted at least **four** distinct architectures hiding behind that one
word."* He names four, then **proposes oversight as a fifth of his own**. "The five loops" is a
community compression that our corpus recorded as a proper noun — one citation away from becoming
the third fabrication in `99-source-hygiene.md`'s list.

Corrected at source on 2026-08-27, along with its one downstream citation in
[`../../references/comparisons/03-jtbd.md`](../../comparisons/03-jtbd.md) §IMPROVE.

**Cite it as *Voss's loop taxonomy* or *the loopcraft stack*. Never as "the Five Loops."**

The general lesson is the one `06-frameworks-addendum.md` §6 already drew after three grid rows were
found to be wrong: *"the section's argument survived — it is stronger now — but it survived by
luck."* Same failure mode, same fix.

---

## 2. The loop models

Two of these are load-bearing and **orthogonal to each other**, which is a stronger position than
any single anchor: one cuts by *nesting*, the other by *timescale*.

### 2.1 Voss's loop taxonomy — the nesting axis ✅ direct

**Laurie Voss, *"What the Hell Is a Loop, Anyway?"*, O'Reilly Radar, 2026-07-29** —
<https://www.oreilly.com/radar/what-the-hell-is-a-loop-anyway/>
Co-authored variant: **Dhinakaran & Voss, Arize, 2026-07** —
<https://arize.com/blog/what-is-a-loop-in-ai-engineering-anyway/>

Strictly nested rings. **Each has an exit condition; the outermost has none, and that is the
argument.**

| # | Loop | What repeats | Exits on | Attributed by Voss to |
|---|---|---|---|---|
| 1 | **Execution** | *"call a tool, read the result, decide the next action, and repeat until there are no more tool calls to make"* | the agent deciding it is done | Osmani — *"the inner execution loop"* |
| 2 | **Task** | *"restart a coding agent against the same specification over and over,"* fresh context each iteration | spec compliance + passing tests | Huntley, the **Ralph loop** |
| 3 | **Product** | *"the whole lifecycle of developing software with autonomy"* — triage, spec, implement, review, verify, ship, monitor | signals *"from outside the codebase entirely: new issues, production logs, user feedback"* | Tížková (Factory), Lloyd (Warp) |
| 4 | **System** | *"the inner loop is your primary system doing user-facing work, and the outer loop studies and maintains the primary system"* — prompts, evals, harnesses, models | evals, judges, filtered feedback, explicit human query | Gavrilescu — *autoresearch* |
| 5 | **Oversight** | *"where goals get set, budgets get allocated, and work gets culled"* | **none** | **Voss's own addition.** *"The one ring where a human should live"* |

**What we take.** The nesting relation, and the vocabulary for altitude. Our `IMPROVE` job layer
already leans on it — [`../../references/comparisons/03-jtbd.md`](../../comparisons/03-jtbd.md)
says the four `IMPROVE` jobs *"are Voss's system and oversight loop"* and that **we reproduced the
field's omission**, which is the best available explanation for why `J12`, `J16` and `J17` are the
least modelled jobs anywhere.

**What we do not take.** The rings as our spine. Rings 1–2 are agent-internal and we do not build
there; and see §6 on why a containment tree is the wrong shape for our map regardless.

### 2.2 swyx — *"Loopcraft: The Art of Stacking Loops"* ⚠️ unverified

Latent.Space, 2026-06-12, plus the opening talk at AI Engineer World's Fair. **Could not be
retrieved** — paywalled.

This is the diagram Voss is responding to, and the `"????"` outermost ring is **Voss's description of
swyx's diagram**, not a direct read of it. Claims circulating that swyx's own stack contains a
*"token loop"* beneath execution trace **only to AI-generated aggregator pages** and must not be
cited.

Verified verbatim from swyx: *"One might argue the entire game of the next century is to be able to
stack loops as effectively as possible."*

### 2.3 Kim & Yegge — the timescale axis ✅ direct

**Gene Kim & Steve Yegge, *"The Three Developer Loops"*, from *Vibe Coding*; IT Revolution,
2025-10-20** —
<https://itrevolution.com/articles/the-three-developer-loops-a-new-framework-for-ai-assisted-coding/>

| Loop | Timescale | What runs in it |
|---|---|---|
| **Inner** | seconds–minutes | edit, run, observe |
| **Middle** | hours–days | integrate, review, verify |
| **Outer** | weeks–months | plan, architect, learn |

Each loop runs the same triad: **prevent → detect → correct**.

**What we take.** The second axis, and the triad. This is the more establishment lineage — Kim is
Phoenix Project and DORA — and **a timescale cut is genuinely different from a nesting cut**. Two
independent, well-cited models that do not compete is a far better anchor than one. The triad is
also directly usable: it says of any control *when* it acts, which is a distinction our own
`F6 Policy` ladder makes only implicitly.

**What we do not take.** Three loops as a target count. Our altitude is a *team's system*, which
sits across their middle and outer loops rather than inside one.

### 2.4 Others, cited but not adopted

| Model | Source | Items | Note |
|---|---|---|---|
| **Four stacked loops** ✅ | Runkle, LangChain, 2026-06-16 — <https://www.langchain.com/blog/the-art-of-loop-engineering> | agent · verification · event-driven · hill-climbing | Explicitly credits loopcraft |
| **Loop Engineering** ✅ | Osmani, 2026-06-07 — <https://addyosmani.com/blog/loop-engineering/> | automations · worktrees · skills · plugins/connectors · sub-agents, plus state/memory | ⚠️ **These are five *primitives*, not five loops.** Frequently miscited as "five loops." Do not repeat that |
| **Back pressure** ✅ | Osmani | — | *"you can only hand a loop as much autonomy as you can cheaply and reliably verify."* The sharpest one-line statement of why autonomy is gated on evidence |

**The named lineage everyone now cites:** *Prompt Engineering → Context Engineering → Harness
Engineering → Loop Engineering.* ⚠️ The most-quoted proof point — Boris Cherny's *"I don't prompt
Claude anymore… my job is to write loops"* — **could not be extracted from a primary source.** Treat
as reported.

---

## 3. Anthropic's published structures

Relevant because Claude Code is the substrate most of this project assumes, and because the survey
found a naming problem worth stating plainly.

> ⚠️ **Anthropic publishes no "surfaces" or "layers" framework.** It publishes named *techniques* and
> one named loop. Where our documents say *surfaces*, that word is **ours** and should be introduced
> as ours — the nine "extension surfaces" in
> [`../../references/claude-code/01-extension-surfaces.md`](../../content/claude-code/01-extension-surfaces.md)
> are our organising of Anthropic's docs, not Anthropic's own frame.

| Structure | Source | Items |
|---|---|---|
| **The agent loop** ✅ | *Building agents with the Claude Agent SDK*, 2025-09-29 | **gather context → take action → verify work → repeat** |
| **The workflow taxonomy** ✅ | *Building Effective Agents*, 2024-12-19 | augmented LLM, then: prompt chaining · routing · parallelization (sectioning, voting) · orchestrator-workers · evaluator-optimizer · agents |
| **Progressive disclosure** ✅ | *Equipping agents… with Agent Skills*, 2025-10-16 | L1 metadata preloaded → L2 `SKILL.md` body on judged relevance → L3 bundled files on demand |

**What we take.** *Routing* and *evaluator-optimizer* are published names for two things we assert
as ours — a useful check on `J3 route`, which
[`02-harness-taxonomies.md`](../../comparisons/2026-08-research/02-harness-taxonomies.md)
§3 records as absent from every *harness taxonomy*. It is absent as a **harness function**; it is not
absent as a **workflow pattern**. Our claim must say which.

The distinction *workflows are predefined code paths, agents direct their own* is also the cleanest
published statement of **deterministic control, probabilistic labor**, which we hold as a principle
and have been stating in house vocabulary.

---

## 4. Context engineering — the decomposition we were not using

This is the direct answer to *"context engineering encompasses a large bulk."* **The field already
decomposed it.** We have been treating as one row what three independent sources treat as four to
five.

### 4.1 The definition ✅ direct

**Philipp Schmid, ~2025-06-30** — <https://www.philschmid.de/context-engineering>

> *"the discipline of designing and building dynamic systems that provide the right information and
> tools, in the right format, at the right time, to give an LLM everything it needs to accomplish a
> task."*

Three properties: **systematic** not ad hoc · **dynamic** not static · **comprehensive** not just
instructions.

⚠️ A four-operation restatement circulating as Schmid's — *offloading / reduction / retrieval /
isolation* — **could not be attributed to him.** Do not cite it as his.

### 4.2 The four verbs — the widest-adopted cut ✅ direct

**Lance Martin (LangChain), 2025-06-23** —
<https://rlancemartin.github.io/2025/06/23/context_engineering/>

| Verb | Means |
|---|---|
| **Write** | save context *outside* the window — scratchpads, memory |
| **Select** | pull context *into* the window — retrieval, memory selection |
| **Compress** | retain only the tokens needed — summarisation, trimming |
| **Isolate** | split context across agents, environments, state objects |

### 4.3 The technique inventory that fills those cells ✅ direct

**Anthropic, *"Effective context engineering for AI agents"*, 2025-09-29** —
<https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents>

Definition: *"the set of strategies for curating and maintaining the optimal set of tokens during LLM
inference."* Techniques: **compaction · structured note-taking (agentic memory) · sub-agent
architectures · just-in-time context · tool-result clearing.** Named concepts: **context rot** and
**progressive disclosure**.

They map onto Martin's verbs cleanly — compaction is *compress*, note-taking is *write*, sub-agents
are *isolate*, just-in-time is *select*.

**What we take.** Both, joined. This is the decomposition `07-the-map.md` uses to split our oversized
context node, and it is well-cited enough to use without argument.

**What we do not take.** The framing that context engineering is the whole game. Our own evidence
cuts against the descriptive half — see §6.

---

## 5. The stack diagrams, and what the bottom layer is called

Directly relevant to *"we aren't labeling the foundation."*

| Source | Date | Layers, bottom → top | ✓ |
|---|---|---|---|
| **Perrone**, *The AI Agents Stack (2026 Edition)*, O'Reilly Radar — <https://www.oreilly.com/radar/the-ai-agents-stack-2026-edition/> | 2026-06-08 | **Models and Inference** → Protocols and Tools → Memory and Knowledge → Frameworks and SDKs → Eval and Observability → Guardrails and Safety | ✅ |
| **Menlo Ventures**, *The Modern AI Stack* | — | **Compute and Foundation Models** → Data → Deployment → Observability | ✅ |
| **Letta**, *The AI Agents Stack* | 2024-11 | **LLM models & storage** → agent frameworks → agent hosting/serving | ✅ |
| **a16z**, *Emerging Architectures for LLM Applications* | 2023-06 | not layered — a dataflow, with orchestration frameworks as the named middle | ✅ |
| **Ours** — [`../../references/comparisons/01-concepts.md`](../../comparisons/01-concepts.md) §1 | 2026-08-11 | **MODEL** → HARNESS → PROCESS LAYER → CONTEXT → EVIDENCE | — |

⚠️ **No canonical Sequoia stack diagram was found.** Their AI writing is thesis prose, not a layer
map. Do not cite Sequoia for one.

### Two findings that land on our own vocabulary

**⚠️ `Substrate` is not attested in any published stack diagram found.** Our `F0 Substrate` is house
vocabulary occupying the one slot where the field has settled names. That is a naming decision to
make deliberately in [`02-functions.md`](./02-functions.md), not to inherit by default. The published options are *Models
and Inference*, *Compute and Foundation Models*, and plain *harness*.

**Our own stack already names the model, and our function list already excludes it.** `01-concepts.md`
§1 puts **MODEL** at the bedrock; §3.1 then rules it *"✅ Correctly excluded"* from the functions as
*"an input to `F0`."* And
[`03-agentos-harness-multiplayer.md`](../../comparisons/2026-08-research/03-agentos-harness-multiplayer.md)
already concluded the opposite: *"stack diagram forces the answer: **model as bedrock, below
Ground**; Substrate is the harness."* **Three of our own documents disagree.** The field's own
equation — **`Agent = Model + Harness`** — settles it toward naming the foundation. `07-the-map.md`
resolves this in writing, preserving the original argument.

---

## 6. ⛔ The two rulings that constrain what we build next

Both already made in this corpus. Honor them, or overturn them in writing with a reason.

**Ruling 1 — the map is not a layer cake.**
[`04-primitives-ontology-platform.md`](../../comparisons/2026-08-research/04-primitives-ontology-platform.md) §5:

> *"KD asked to let a hierarchy emerge rather than forcing one. **It did not emerge, and the reason
> is the finding.** AAIF's taxonomy file leaves `broaderTerm` deliberately unfilled… everyone who has
> published structure published a **grid, not a tree**… But 'no hierarchy' is not the same as 'no
> map.' The map we owe a reader is not a containment tree of abstract layers — it is **the set of
> primitives a harness needs, in the order a team comes to need them.**"*

**Ruling 2 — ontology-as-description measurably fails.** Same file, §2.1, on ETH Zürich
`arXiv:2602.11988`: *"providing context files does **not** generally improve task success rates,
while increasing inference cost by over 20% on average… **repository overviews are not helpful**."*
What survives is the **imperative** half — Coyle's *"typed entities and relationships that tools must
respect, cardinality and domain restrictions that catch malformed tool calls before they execute."*

**Consequence for [`02-functions.md`](./02-functions.md):** a set of primitives in adoption order, with typed relations and
verb-bounding — not a pretty diagram of nested rings. **The rings are lineage and vocabulary; they
are not the deliverable.**

---

## 7. Published ontologies of agentic work

| Work | Source | What it names | ✓ |
|---|---|---|---|
| **Agentic Software Engineering: Foundational Pillars and a Research Roadmap** | Hassan, Li, Lin, Adams, Chen, Kashiwa, Qiu — arXiv **2509.06216**, v3 2026-06-24 | Pillars **actors · processes · tools · artifacts** · the **SE-for-Humans / SE-for-Agents** duality · **ACE** (Agent Command Environment) and **AEE** (Agent Execution Environment), with **Merge-Readiness Packs** out and **Consultation Request Packs** in · **SASE** as the vision | ✅ |
| **AgentO: An Ontology for Modeling Agentic AI Systems** | Springer, 2026 | A formal semantic-web ontology. Systems-modelling, **not** developer workflow | ◐ exists, not read |
| **AI-DLC (AI-Driven Development Lifecycle)** | IBM | *"what would the SDLC look like if AI had always existed?"* | ◐ exists, not read |
| **Agentic SDLC in practice** | PwC, 2026 | The human/AI role blend across the SDLC | ◐ exists, not read |

**Hassan is the strongest academic anchor available, it is already in our corpus, and we have never
built on it.** It is tracked as `W-3` — an ADR on the ACE/AEE split for `J11 coordinate humans` — and
`06-frameworks-addendum.md` §2.4 already had to correct the record once, because it had been
recorded as an autonomy ladder and contains no such thing.

Its **actors · processes · tools · artifacts** quartet is worth testing our node set against: it is
peer-reviewed, it is about *work* rather than about *runtimes*, and `actors` covers the roster that
`J14 know who exists` currently has no home for.

---

## 8. Where we sit

Stated as claims that can be checked, not as positioning.

| | |
|---|---|
| **Genre** | We publish in all three of `06-frameworks-addendum.md` §0's genres — jobs (function taxonomy), the Grid (readiness grid), factors (manifesto). §0 also notes **nobody has published a model spanning two.** That is the shape claim, and it is narrower and more defensible than "we have a grid" |
| **Altitude** | Ring 3–4 in Voss's terms; the middle-to-outer loop in Kim & Yegge's. Meng grades ring 1. Factory grades ring 2–3 artifacts. Microsoft and the AI-Native framework grade ring 5. **The instrument for a team's own system does not exist outside this repository** |
| **The hole we fill** | AAIF's `broaderTerm` is unfilled — the field agreed the vocabulary and **not** the containment. We do not fill it with a tree (§6, Ruling 1); we fill it with a primitive set in adoption order |
| **What is genuinely unclaimed** | The **target function** — that the *correct* stage depends on team scale and production-quality expectation. Every instrument surveyed assumes one ladder everyone climbs |

---

*Next: [`02-functions.md`](./02-functions.md) — the twelve functions, their relations, and the foundation named.*
*Vendors and their direction of travel are `08-providers.md` ‡ — **not yet written**, and deliberately
separate: this document is about **models**, that one is about **who is currently doing the job**.**
