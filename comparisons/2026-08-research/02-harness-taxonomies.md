---
title: "Published harness taxonomies, and the three slots absent from every one"
tier: reference
project: loomwarp
created: "2026-08-25"
status: DRAFT
owner: KD
---

# What a harness is made of — the published lists

**What this is.** Every enumerated taxonomy of harness functions found in the 2026 literature,
reproduced faithfully, plus the analysis of what none of them contain.

**Why it matters.** `03-jtbd.md` is being rebuilt around the functional jobs a system in this category
must perform. That list is only credible if it is checked against what the field has already
enumerated — otherwise it is invention wearing research clothes. This is the check.

---

## 1. The taxonomies

### AAIF — the standards-body definition *(most citable)*

`github.com/aaif/ws-taxonomy-landscape`, commit **2026-08-19** — six days before this research.

> **definition:** *"A harness is the software control layer that sits between an AI model and the
> external world, enabling it to execute a breadth of complex tasks."*
>
> **scopeNote:** *"…the harness manages: **Control Flow** (orchestrating the loop and stopping
> conditions); **Environment Access** (connections to tools, APIs, and browsers); **State & Memory**
> (persisting context across turns); **Input/Output Shaping** (prompt templates and parsing); and
> **Observability** (logging and evals). Ultimately, the harness restrains, coordinates, and empowers a
> foundational model to operate effectively within a specific system."*

**Five functions.** Note the exclusions: no permissions/bounding, no validation as distinct from
observability, no recovery, no cost, no human coordination, no compounding, no distribution.

> **⚠️ Corrected 2026-08-28, re-read from `taxonomy/taxonomy-data.js` at source.** The five are **not
> five taxonomy terms.** There are **no term records** named `Control Flow`, `Environment Access`,
> `State & Memory`, `Input/Output Shaping` or `Observability` — each was checked individually. They
> exist **only as the inline parenthetical inside the single `Harness` term's `scopeNote`**, quoted
> above. There are therefore **no per-function definitions to cite**, and anything that presents them
> as a five-row taxonomy with scopeNotes of their own — including §2's matrix column below — is
> reading a list out of one sentence.
>
> **What this does and does not cost us.** The quotation is accurate and the *exclusions* still hold —
> AAIF's only published account of what a harness manages omits permissions, recovery, cost,
> coordination and distribution. What we may **not** say is that AAIF *published a five-function
> taxonomy*. It published one term with an illustrative gloss.
>
> **Two refinements to the deferral claim**, which was directionally right and imprecise:
>
> - It covers **three fields, not one**. The file header: *"`definition`, `category` and `broaderTerm`
>   are intentionally deferred on every entry below. This is a decision of the Taxonomy & Landscape
>   workstream, **not an oversight, and not an invitation to fill them in**… this pass is deliberately
>   flat and top-level only."* Definitions are debated *term by term* at a weekly sync.
> - **The source contradicts itself, and we should say so rather than quote around it.** The header
>   claims `definition` is deferred on *every* entry, yet `Harness` carries a full definition **and the
>   only non-empty `scopeNote` in the file**. Whether that is a sanctioned exception or an unreverted
>   commit could not be determined. Cite the header's "every entry" claim only with this caveat.
>
> **Format, for anyone re-checking:** not SKOS/RDF, not YAML, not JSON-LD — a **JavaScript file** of
> object literals, self-described as *"SKOS-Lite"*. Fields: `term`, `category`, `aliases`,
> `broaderTerm`, `definition`, `scopeNote`, `relatedTerms`, `contrastsWith`, `workgroups`.
>
> ⚠️ The **2026-08-19 commit date** cited above could not be confirmed; GitHub did not expose a
> last-commit date through fetch. Unverified in both directions.

**The most consequential detail is a blank field.** AAIF's accepted-term list includes **"Autonomy
level"** with its definition marked *"pending — term accepted; definition under working group
discussion"*, and `broaderTerm` is deliberately unfilled across the file. **The field's own standards
body has agreed the vocabulary and has not agreed the hierarchy.** See §4.

### Meng et al. — `H = (E, T, C, S, L, V)` *(finest-grained)*

*"Agent Harness for Large Language Model Agents: A Survey"*, preprints.org
`10.20944/preprints202604.0428.v3`, **2026-04-09**. Not on arXiv.

| | Component | Scope |
|---|---|---|
| **E** | Execution Loop | Observe-think-act cycle, termination conditions, error recovery |
| **T** | Tool Registry | Typed tool catalog, routing, monitoring, schema validation |
| **C** | Context Manager | What enters the context window, compaction, retrieval |
| **S** | State Store | Persistence across turns/sessions, crash recovery |
| **L** | Lifecycle Hooks | Auth, logging, policy enforcement, instrumentation |
| **V** | Evaluation Interface | Action trajectories, intermediate states, success signals |

Also defines a **"Harness Completeness Matrix"** across 23 systems and 110+ papers, claiming
production-ready systems implement all six. A finer-grained superset of AAIF: it splits State Store
from Context Manager and promotes Evaluation out of Observability.

> ⚠️ Sourced from the authors' companion repo, not the paper PDF — preprints.org returned HTTP 403.

### Macedo — `T1–T4`, necessary and sufficient

[arXiv:2606.10106](https://arxiv.org/abs/2606.10106), submitted **2026-06-08**. The only source found
that states an inclusion test rather than a wishlist.

- **T1** — *"Is there a reasoning, action, and observation loop at runtime?"*
- **T2** — *"Is there a tool interface to perceive and alter the environment?"*
- **T3** — *"Is there active management of what enters and leaves the context?"*
- **T4** — *"Is there at least one control mechanism independent of the model?"*

Required: agent loop · tool registry · context manager · control mechanisms. **Optional:** memory ·
verifier · retry with model switching · observability/audit · guardrails · deterministic handlers.

**T4 is worth internalising.** *A control mechanism independent of the model* is `F6 Policy`'s
principle — enforcement at a point the model cannot reach — arrived at independently and made a
membership condition.

### Böckeler — Guides and Sensors

[martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html),
**2026-04-02**.

> - ***Guides* (feedforward controls)** — *"anticipate the agent's behaviour and aim to steer it before
>   it acts… increase the probability that the agent creates good results in the first attempt"*
> - ***Sensors* (feedback controls)** — *"observe after the agent acts and help it self-correct.
>   Particularly powerful when they produce signals that are optimised for LLM consumption, e.g. custom
>   linter messages that include instructions for the self-correction — a positive kind of prompt
>   injection."*

Cross-cut by **computational vs inferential** execution, and three regulation categories —
maintainability, architecture fitness, behaviour. So 2 × 2 × 3, not a flat pair. Also:
*"Engineering a user harness for a coding agent is a specific form of context engineering."*

**The sensor insight is directly liftable:** feedback optimised for model consumption rather than human
consumption. Our evidence artifacts are written for humans.

### Chan et al. — agent infrastructure *(governance altitude)*

[arXiv:2501.10114](https://arxiv.org/abs/2501.10114), v3 **2025-06-19**, TMLR. *"Technical systems and
shared protocols external to agents that mediate and influence their interactions with and impacts on
their environments."*

**Attribution** (identity binding · certification · agent IDs) · **Interaction** (agent channels ·
oversight layers · inter-agent communication · commitment devices) · **Response** (incident reporting ·
rollbacks).

A governance/ecosystem taxonomy, not a runtime one — it has nothing on context assembly, memory,
routing, decomposition or cost. **Do not use it as a harness-function spine.** But *Attribution* is the
nearest published home for provenance, and *Response → rollbacks* is the nearest for recovery.

### HumanLayer — 12-Factor Agents *(most adopted)*

`github.com/humanlayer/12-factor-agents`, created **2025-03-30**, **25.5k stars**.

> 1. Natural Language to Tool Calls · 2. Own your prompts · 3. Own your context window · 4. Tools are
> just structured outputs · 5. Unify execution state and business state · 6. Launch/Pause/Resume with
> simple APIs · 7. Contact humans with tool calls · 8. Own your control flow · 9. Compact Errors into
> Context Window · 10. Small, Focused Agents · 11. Trigger from anywhere, meet users where they are ·
> 12. Make your agent a stateless reducer

A manifesto shape — flat and deliberately unranked.

### Others, weaker

**Externalization** ([arXiv:2604.08224](https://arxiv.org/abs/2604.08224), 2026-04-09) — Memory ·
Skills · Protocols · Harness Engineering as the unification layer. **HarnessX**
([arXiv:2606.14249](https://arxiv.org/abs/2606.14249)) — prompts · tools · memory · control flow.
**Agent Cloud Stack** ([arXiv:2606.20570](https://arxiv.org/abs/2606.20570)) — seven layers, and the
**only** taxonomy found giving economics a first-class slot ("Agent Economy: Marketplace + Economic
Primitives").

---

## 2. Cross-reference against our twelve jobs

| Our job | AAIF | Meng | Macedo | Chan | Verdict |
|---|:--:|:--:|:--:|:--:|---|
| J1 compose context | ● | ● C | ● T3 | ○ | **converged** |
| J2 remember | ● | ● S | ◐ opt | ○ | **converged** |
| J3 route | ○ | ◐ *inside Tool Registry* | ○ | ○ | **absent as a named function** |
| J4 decompose & sequence | ◐ control flow | ● E | ● T1 | ○ | converged |
| J5 bound | ○ | ◐ L | ● T4 | ◐ | converged, unevenly named |
| J6 validate | ◐ *inside observability* | ● V | ◐ opt | ○ | converged |
| J7 recover | ○ | ◐ *inside E* | ◐ opt | ● rollbacks | thinly modelled |
| J8 prove | ◐ logging | ○ | ◐ opt | ● Attribution | **contested** |
| J9 compound | ○ | ○ | ○ | ○ | **absent** |
| J10 distribute | ○ | ○ | ○ | ○ | **absent** |
| J11 coordinate humans | ○ | ○ | ○ | ● oversight | emerging |
| J12 account | ○ | ○ | ○ | ○ | **absent** |

`● names it · ◐ contains it inside another function · ○ absent`

---

## 3. The finding: three slots absent from every taxonomy

**Routing · cost accounting · distribution.** No harness taxonomy treats budget as a named function.
Nobody elevates model routing to a layer — it is buried inside a tool registry. Distribution appears
only obliquely, as "skills" or a golden path.

**And cost is the sharpest of the three, because the two axes disagree.** The practitioner corpus is
saturated with it — `cost` 70, `budget` 23, `spend` 22, `throughput` 21, plus a dedicated
`AI Architects: Tokenmaxxing` track.

> **Qualified 2026-08-26.** *"Every structural model omits it"* is too strong. Cost appears twice in the
> published models — as an **adjective on another pillar** (Debois's Platform: *"fast, observable,
> **cost-aware**"*) and as **inter-agent marketplace economics** (Agent Cloud Stack's *"Agent Economy"*).
> **The defensible claim: cost is never a named function with its own row, its own artifact, and a join
> to outcome.** See [`06-frameworks-addendum.md`](./06-frameworks-addendum.md) §5.2. **A high-attention operational
concern with no home in any model of what a harness is.** That is a far stronger and more defensible
claim than "we thought of it first."

Two independent methods reached the same gap: the term census in
[`01`](./01-worldsfair-2026-vocabulary.md) and this cross-reference.

---

## 4. The altitude problem, and why nobody has fixed it

**One word spans two levels.**

- **QM** self-describes as *"a multiplayer agent harness"* — and its agent loop **runs Pi, OpenCode and
  Claude Code**, which are themselves harnesses.
- **Weng** nests loop engineering, context engineering *and* evals **inside** harness engineering.
- **Microsoft** ships `HarnessAgent` and says its Harness *"composes existing Agent Framework building
  blocks rather than defining a separate agent runtime"* — harness ⊂ framework.
- **Parallel** says the opposite: frameworks supply building blocks, a harness is *"a full runtime
  system with opinionated defaults."*

So *harness* names both the thing that runs one agent loop and the thing that runs a team's worth of
them. AAIF's `broaderTerm` field — the one that would record which contains which — **is unfilled**,
along with `definition` and `category`, and the file says so deliberately: *"this pass is deliberately
flat and top-level only."* See the correction in §1.

Our **process layer** is a proposed resolution: *a package of workflow, standards and capability
installed into one or more harnesses; it does not run the loop, it shapes what the loop does.* This is
the one place in the corpus where inventing a term is justified, and it should be introduced as a fix
to a named problem with this evidence attached — not as house vocabulary.

---

## 5. What this says about hierarchy — a correction

The first read of this evidence was *"the field's taxonomy is flat, so ours is flat."* That is half
right, and the accurate version is more useful:

**The field has converged on a *shape* — pillars × maturity levels — and diverged completely on the
pillars.**

> **Revised 2026-08-26** against primary sources. Three rows of the original table were recorded from
> secondary summaries and two were wrong. Full row sets, definitions and evidence in
> [`06-frameworks-addendum.md`](./06-frameworks-addendum.md) §2.

**Five published grids:**

| Model | Shape | What it grades |
|---|---|---|
| Factory.ai Agent Readiness | **8–9 pillars × 5 levels** *(count disputed in Factory's own material)* | a repository |
| Microsoft Agentic AI adoption maturity model | **5 pillars × 5 CMM levels (100–500)**, RAI cross-cutting | an enterprise |
| Debois context maturity (Tessl) | 3 pillars × 4 stages × 4 CDLC phases — 48 cells | a context practice |
| Böckeler, *Guides and Sensors* | 2 × 2 × 3 — 12 cells, **rows are harness functions** | a harness's controls |
| Meng et al., *Harness Completeness Matrix* | 23 systems × 6 components, binary cells, **no maturity axis** | a harness |
| **LoomWarp's Grid** | **7 functions × 6 stages** | **the system a team works inside** |

**Removed from this table: Hassan et al. ([arXiv:2509.06216](https://arxiv.org/abs/2509.06216)).** It was
listed here as an *"L0–L5 autonomy ladder."* **The paper contains no autonomy ladder.** It is *"Agentic
Software Engineering: Foundational Pillars and a Research Roadmap"* — four re-founded SE pillars (actors ·
processes · tools · artifacts), two modalities, and an **Agent Command Environment / Agent Execution
Environment** split whose protocol (Merge-Readiness Packs out, agent-initiated callbacks in) is directly
relevant to `J7` and `J11`. See the addendum §2.4.

**Added:** Böckeler and Meng's Completeness Matrix, neither previously treated as a grid. **The claim is
stronger after the correction than before it** — five external grids, two with harness-function rows, and
**none with a maturity axis on those rows.**

Structurally the same artifact, six different row sets. **Nobody has published a containment hierarchy of
jobs; everybody who published structure published a grid.** So the Grid is not an outlier and is not
under-structured — it is the field's dominant form.

**And its governing rule remains unmatched — as a narrower claim than first stated.** *The fabric tears at
its thinnest warp section* — the minimum governs, not the mean.

- **Factory.ai does have a gating mechanic:** progression requires passing **80% of the criteria at each
  level** to unlock the next. *"Nobody has any threshold rule"* was wrong. But it still resolves to a
  single overall level and never names a governing pillar.
- **Microsoft** grades per pillar and states no combination rule at all.
- **Debois** grades 48 cells with no governing rule.

**What survives, and is worth defending:** nobody names the cell that decides the verdict, and nobody
publishes a rule that **a single weak pillar caps the whole system regardless of the others.** That is a
methodological addition, not a borrowed one — and it should be argued rather than assumed.

---

*Companion: [`06-frameworks-addendum.md`](./06-frameworks-addendum.md) — every framework row by row ·
[`01-worldsfair-2026-vocabulary.md`](./01-worldsfair-2026-vocabulary.md) — the census ·
[`99-source-hygiene.md`](./99-source-hygiene.md) — what could not be verified*
