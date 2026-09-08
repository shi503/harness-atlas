---

## title: "The frameworks in full — what each model actually says, row by row"
tier: reference
project: loomwarp
created: "2026-08-26"
status: DRAFT
owner: KD

# The frameworks, explained

**What this is.** An addendum to `[02-harness-taxonomies.md](./02-harness-taxonomies.md)`. Every framework
cited anywhere in this research folder, named, sourced, and explained **at the level of its individual
rows** — what each pillar, level, component, factor and primitive actually represents, and what it is
arguing.

**Why it exists.** `02` §5 asserts that the field converged on a *pillars × maturity levels* shape. That
assertion was made from the **shape** of four grids. The **row sets** of three of them had never been
read — they were recorded as counts (`9 × 5`, `5 × 25`, `L0–L5`) taken from secondary summaries. This
addendum reads the primary sources. **Three corrections resulted, one of them material.** See §6.

**Sourcing notation.** ✅ **direct** = fetched and read on 2026-08-26 for this document.
◐ **relayed** = reached this corpus through a summarising fetch layer, per
`[99-source-hygiene.md](./99-source-hygiene.md)` §5. ⚠️ **unverified** = shape recorded, contents never
confirmed.

---



## 0. There are three genres here, and conflating them is the mistake

The single most useful thing to hold before reading any of these: **the models in this landscape answer
three different questions, and they are not competitors.** A function taxonomy cannot tell you how
mature you are; a maturity grid cannot tell you what to build; a manifesto cannot grade anything.


| Genre                       | The question it answers                      | Shape                     | Unit of a row                                        | Examples                                                                            |
| --------------------------- | -------------------------------------------- | ------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **A · Function taxonomy**   | *What is a harness made of?*                 | Flat list, 4–8 items      | A **function** the runtime performs                  | AAIF · Meng · Macedo · Böckeler · Chan · Weng · Trivedy                             |
| **B · Readiness grid**      | *How good is ours, and what do we fix next?* | 2-D matrix, rows × levels | A **pillar** you can be independently good or bad at | Factory.ai · Microsoft · Debois · **LoomWarp's Grid**                               |
| **C · Principle manifesto** | *How should we build it?*                    | Flat, numbered, unranked  | A **principle** you hold or violate                  | 12-Factor App · 12-Factor Agents · `[05-harness-factors.md](./05-harness-factors.md)` |


**And underneath all three sits a fourth thing that is not a model at all: the primitive set** — the
concrete named units a specific system actually ships. §4.

Two structural observations that fall out of the table and matter more than any individual framework:

1. **Genre A rows and Genre B rows are not the same kind of object.** *"Context Manager"* is a component
  that exists or does not. *"Context"* as a Grid row is a **capacity you hold at a stage**. Mapping one
   onto the other — which `02` §2 does, correctly — is a translation, not an identity.
2. **Nobody has published a model that spans two genres.** The field has function lists with no maturity
  axis, and maturity grids whose rows are engineering hygiene rather than harness functions. LoomWarp's
   Grid is the only artifact in this corpus whose **rows are harness functions and whose columns are
   maturity stages** — which is a more specific and more defensible novelty claim than "we have a grid."

---



## 1. Genre A — the function taxonomies

*These answer "what is a harness made of." Read them as parts lists.*

### 1.1 AAIF — the standards-body definition ◐ relayed

`github.com/aaif/ws-taxonomy-landscape`, commit **2026-08-19**. The most citable because it is a
standards body rather than a vendor or an individual.

> *"A harness is the software control layer that sits between an AI model and the external world,
> enabling it to execute a breadth of complex tasks."*


| #   | Function                 | What it actually means                                                                 | The failure it names                                                   |
| --- | ------------------------ | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 1   | **Control Flow**         | Orchestrating the loop and its **stopping conditions** — when to iterate, when to halt | The agent that never terminates, or terminates early and calls it done |
| 2   | **Environment Access**   | Connections to tools, APIs, browsers — the agent's hands                               | A model that can reason but not act                                    |
| 3   | **State & Memory**       | Persisting context across turns                                                        | Starting ignorant every session                                        |
| 4   | **Input/Output Shaping** | Prompt templates going in, parsing coming out                                          | Free-text output nothing downstream can consume                        |
| 5   | **Observability**        | Logging and evals                                                                      | Not being able to say what happened                                    |


**How to read the closing sentence.** *"Restrains, coordinates, and empowers"* is doing real work — it
puts **restraint first**, ahead of capability. That ordering is the standards body's opinion about what
a harness is *for*, and it is the same opinion as `E5 Policy`.

**What is absent, and it is a long list:** no permissions or bounding as a named function (it is folded
into Control Flow), no validation distinct from observability, no recovery, no cost, no human
coordination, no compounding, no distribution.

**The single most consequential detail is a blank field.** AAIF's accepted-term list includes
**"Autonomy level"** with its definition marked *"pending — term accepted; definition under working
group discussion"*, and the `broaderTerm` field — the one that records which concept contains which —
**is deliberately unfilled throughout.** The field's own standards body has ratified the vocabulary and
declined to ratify the hierarchy. Every "layer diagram" in circulation is therefore someone's opinion,
not a standard.

### 1.2 Meng et al. — `H = (E, T, C, S, L, V)` ◐ relayed (repo-sourced, not paper-sourced)

*"Agent Harness for Large Language Model Agents: A Survey"*, preprints.org
`10.20944/preprints202604.0428.v3`, **2026-04-09**. The finest-grained taxonomy found, and the only one
expressed as a formal tuple — which is itself a claim: *these six and no others constitute a harness.*


| Symbol | Component                | What it owns                                                      | Why it is split out                                                          |
| ------ | ------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **E**  | **Execution Loop**       | Observe → think → act, termination conditions, **error recovery** | Recovery lives here, which is why nobody models it separately                |
| **T**  | **Tool Registry**        | Typed tool catalog, **routing**, monitoring, schema validation    | Routing is buried here — see §5.2                                            |
| **C**  | **Context Manager**      | What enters the window, compaction, retrieval                     | Separated from S because *what the agent sees now* ≠ *what the system knows* |
| **S**  | **State Store**          | Persistence across turns and sessions, crash recovery             | The durable half of memory                                                   |
| **L**  | **Lifecycle Hooks**      | Auth, logging, policy enforcement, instrumentation                | The extension points — where policy actually binds                           |
| **V**  | **Evaluation Interface** | Action trajectories, intermediate states, success signals         | Promoted out of observability because *did it work* ≠ *what happened*        |


**Two structural moves worth stealing.** It **splits State Store from Context Manager**, and it
**promotes Evaluation out of Observability**. Both splits are ones LoomWarp already makes — `E2 Context`
vs. persistence, and `E6 Evidence` as its own element rather than a logging feature. Meng is independent
corroboration that those seams are real.

It also defines a **"Harness Completeness Matrix"** across 23 systems and 110+ papers, claiming
production-ready systems implement all six. **Note the shape:** that is a systems × components grid with
binary cells — Genre B's structure with Genre A's rows, and no maturity axis. It is the nearest thing in
the published literature to what LoomWarp's Grid does, and it stops one step short.

> ⚠️ preprints.org returned HTTP 403. These definitions come from the authors' companion repo. The
> "Completeness Matrix" claim has **not** been read in the paper.



### 1.3 Macedo — `T1–T4`, a membership test ◐ relayed

[arXiv:2606.10106](https://arxiv.org/abs/2606.10106), **2026-06-08**. The only source in the corpus that
states an **inclusion test** rather than a wishlist — four questions, and if you answer no to any, the
thing you built is not a harness.


| Test   | The question, verbatim                                                | What it is really asking                                                       |
| ------ | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **T1** | *"Is there a reasoning, action, and observation loop at runtime?"*    | Is there a loop *at runtime*, or did you just chain prompts at authoring time? |
| **T2** | *"Is there a tool interface to perceive and alter the environment?"*  | Can it change the world, or only describe it?                                  |
| **T3** | *"Is there active management of what enters and leaves the context?"* | **Active** — a folder the agent can read is not context management             |
| **T4** | *"Is there at least one control mechanism independent of the model?"* | Is any guardrail enforced somewhere the model cannot reach?                    |


**Optional** in Macedo's account: memory · verifier · retry with model switching · observability/audit ·
guardrails · deterministic handlers.

**T4 is the most important single sentence in the taxonomy literature for our purposes.** *A control
mechanism independent of the model* is exactly `E5 Policy`'s principle and Factor `VII`'s statement —
and Macedo makes it a **membership condition**, not a maturity nicety. A system whose only guardrails
are prose in a prompt is, on this test, not a harness at all. That is a far stronger framing of the
policy argument than "we should add enforcement," and it was arrived at independently.

**The tension worth noticing:** T4 makes model-independent control *mandatory* while listing *guardrails*
as optional. The resolution is that T4 requires **one** such mechanism to exist; the optional list is
about breadth. But the wording is loose enough that it should be quoted carefully.

### 1.4 Böckeler — Guides and Sensors ◐ relayed

[martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html),
**2026-04-02**. A control-theory framing rather than a parts list, which makes it the most transferable
idea in the set.


|             | Definition                                                                                                                                                 | Control-theory term | Examples                                          |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | ------------------------------------------------- |
| **Guides**  | *"anticipate the agent's behaviour and aim to steer it before it acts… increase the probability that the agent creates good results in the first attempt"* | **Feedforward**     | context files, instructions, scaffolds, templates |
| **Sensors** | *"observe after the agent acts and help it self-correct"*                                                                                                  | **Feedback**        | linters, tests, type checkers, evals              |


**It is not a flat pair — it is 2 × 2 × 3.** The two are cross-cut by:

- **Execution mode:** *computational* (deterministic — a linter) vs. *inferential* (a model judging)
- **Regulation category:** *maintainability* · *architecture fitness* · *behaviour*

Twelve cells. Which makes Böckeler, quietly, a **grid too** — and its rows are harness functions. It is
the closest published relative of the Grid that nobody in this corpus has treated as one.

**The liftable insight, and it is the sharpest sentence in the whole literature review:**

> Sensors are *"particularly powerful when they produce signals that are **optimised for LLM
> consumption**, e.g. custom linter messages that include instructions for the self-correction — **a
> positive kind of prompt injection**."*

This is Factor `VIII`. And it indicts us directly: **our evidence artifacts — HANDOFF documents, evidence
bundles, event records — are written for humans.** A HANDOFF that a human reads and acts on is a Genre-A
observability feature. A HANDOFF written so the *next agent* can act on it without a human translating
is a sensor. We have built the former and named it the latter.

Also worth keeping: *"Engineering a user harness for a coding agent is a specific form of context
engineering"* — Böckeler collapses the two terms that `02` §4 shows the rest of the field nests in
opposite directions.

### 1.5 Chan et al. — agent infrastructure ◐ relayed

[arXiv:2501.10114](https://arxiv.org/abs/2501.10114), v3 **2025-06-19**, TMLR. The oldest source here and
the only one at **governance altitude**:

> *"Technical systems and shared protocols external to agents that mediate and influence their
> interactions with and impacts on their environments."*


| Category        | Contents                                                                               | What it is for                                              |
| --------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Attribution** | identity binding · certification · agent IDs                                           | Knowing **which** agent did a thing, and on whose authority |
| **Interaction** | agent channels · oversight layers · inter-agent communication · **commitment devices** | How agents reach each other and how humans sit above that   |
| **Response**    | incident reporting · **rollbacks**                                                     | What happens after something goes wrong                     |


**Use it precisely and narrowly.** It has nothing on context assembly, memory, routing, decomposition or
cost — it is not a runtime taxonomy and **must not be used as a harness-function spine.** But it is:

- the **nearest published home for provenance** (*Attribution*) — which matters because `J8 prove` is
marked *contested* and this is the strongest external anchor for it;
- the **nearest published home for recovery** (*Response → rollbacks*) — the only place `J7` is named
rather than folded into an execution loop;
- the **only source that names human oversight as a first-class layer** — the sole `●` in `J11`'s row.

**"Commitment devices" is the underused term.** A mechanism by which an agent binds itself in advance to
a constraint it cannot later renegotiate. That is what a work contract *is*, and it is better vocabulary
than "scope."

### 1.6 Weng and Trivedy — the practitioner lists ◐ relayed

Both are cited in `[../03-jtbd.md](../03-jtbd.md)` as convergence evidence rather than as taxonomies to
adopt, and the distinction matters: they are descriptions of practice, not attempts at completeness.

**Weng**, *Harness Engineering* (Lil'Log, **2026-07-04**) — orchestrate execution · plan · call tools and
act · perceive and manage context · store artifacts · evaluate results · permission control · persistent
state. **Eight, and it is the only practitioner list that names permission control as a peer function.**
Weng also nests loop engineering, context engineering *and* evals **inside** harness engineering — one
side of the altitude dispute in `02` §4.

**Trivedy**, *Anatomy of an Agent Harness* (LangChain, **2026-03-10**) — system prompts · tools/skills/MCPs
· bundled infrastructure · orchestration logic · hooks and middleware. **Five, and notice what kind of
list it is:** these are *artifacts you ship*, not *functions you perform*. It is the closest thing in
Genre A to a primitive set, which is why it reads differently from the rest.

### 1.7 The weaker taxonomies ⚠️ unverified

- **Externalization** ([arXiv:2604.08224](https://arxiv.org/abs/2604.08224), 2026-04-09) — Memory ·
Skills · Protocols, with *harness engineering* as the unification layer above them. Another vote for
harness-as-container.
- **HarnessX** ([arXiv:2606.14249](https://arxiv.org/abs/2606.14249)) — prompts · tools · memory · control
flow. A four-item restatement of AAIF; adds nothing.
- **Agent Cloud Stack** ([arXiv:2606.20570](https://arxiv.org/abs/2606.20570)) — seven layers, and **the
only taxonomy in the entire corpus that gives economics a first-class slot**: *"Agent Economy:
Marketplace + Economic Primitives."* This is the one exception to the `J12` absence claim, and it is
worth stating as such — it is a *marketplace* economics slot, about agents transacting, not about a
team knowing what its own run cost. The `J12` claim survives, but this citation belongs next to it.

> ⚠️ **Do not cite** `agentic-ai.readthedocs.io` or its seven-layer "ETCLOVG" taxonomy. Per
> `[99-source-hygiene.md](./99-source-hygiene.md)` §1.1 it fabricates a survey citation and mis-attributes
> Meng's arXiv ID. It is the most plausible-looking wrong source in this space.

---



## 2. Genre B — the readiness grids

*These answer "how good is ours." Read them as diagnostic instruments — and read the **aggregation rule**
first, because that is where they differ and where they fail.*

### 2.1 Factory.ai — Agent Readiness ✅ direct

[factory.ai/product/agent-readiness](https://factory.ai/product/agent-readiness) ·
[docs.factory.ai/agent-readiness/overview](https://docs.factory.ai/agent-readiness/overview) ·
[launch post](https://factory.ai/news/agent-readiness)

**What it grades: a repository.** Not an organisation, not a harness. This is the crucial framing point
and the corpus had it slightly wrong. Factory's question is *"how well does this codebase support
autonomous development"* — the agent is a given, the **environment** is what is being assessed.

**The nine pillars** (docs version — see the count discrepancy below):


| #   | Pillar                        | What it measures                                                                                        |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1   | **Style & Validation**        | *"Linters, type checkers, and formatters catch obvious errors instantly"*                               |
| 2   | **Build System**              | Clear, deterministic commands for verification before committing                                        |
| 3   | **Testing**                   | *"Fast unit and integration tests create tight feedback loops"*                                         |
| 4   | **Documentation**             | Setup, testing and deployment instructions where an agent will find them                                |
| 5   | **Development Environment**   | Reproducible environments — same result on any machine                                                  |
| 6   | **Debugging & Observability** | Runtime visibility: logging, tracing, metrics                                                           |
| 7   | **Security**                  | *"Branch protection, secret scanning, and code owners prevent agents from introducing security issues"* |
| 8   | **Task Discovery**            | Infrastructure for an agent to **identify and scope its own work**                                      |
| 9   | **Product & Experimentation** | Measuring impact and understanding user behaviour                                                       |


**The five levels:**


| Level | Name             | Definition                                                                       |
| ----- | ---------------- | -------------------------------------------------------------------------------- |
| 1     | **Functional**   | *"Code runs, but requires manual setup and lacks automated validation"*          |
| 2     | **Documented**   | Basic documentation and process exist; some automation                           |
| 3     | **Standardized** | *"Clear processes are defined, documented, and **enforced through automation**"* |
| 4     | **Optimized**    | Designed for productivity: fast feedback, continuous measurement                 |
| 5     | **Autonomous**   | *"Systems are self-improving with sophisticated orchestration"*                  |


**Four findings from reading it directly, all of which change how we cite it:**

1. **The count is contested inside Factory's own material.** The launch post and Factory's own X
  announcement say **eight axes**, and name two pillars the docs do not — *Code Quality* and *Security &
   Governance* — while omitting *Task Discovery* and *Product & Experimentation*. The docs say **nine
   pillars**. This is `FM-3` documentation drift occurring in a vendor's flagship framework, two weeks
   after launch. **Cite the docs, cite the count as "8–9, disputed in source," and note the drift** — it
   is a live example of the failure mode our own corpus is built to avoid.
2. **There is a threshold rule after all, and** `02` **§5 overstates its absence.** Progression requires
  passing **80% of the criteria at each level to unlock the next**. That is a conjunctive gate with a
   20% tolerance — meaningfully closer to *minimum-governs* than to averaging. **The corrected claim:
   Factory gates on criteria within a level but still resolves to a single overall level and never names
   a governing pillar.** Our rule is still distinct; the distinction is narrower than stated.
3. **Level 3 is explicitly the target** — *"Level 3 is the target. Most teams should aim here first,"*
  described as where agents can handle *"routine maintenance: bug fixes, tests, docs, dependency
   upgrades."* Compare LoomWarp: **our commitment threshold is 3 → 4**, and Factory's Level 3 definition
   — *"enforced through automation"* — is our **Level 4** definition. **Factory places mechanical
   enforcement one column to the left of where we do.** Either they are more optimistic about what
   automation-enforced means, or we are one column stricter. Worth deciding on purpose, because it
   changes every comparative claim we make about stage numbers.
4. **Pillars 1–7 are ordinary delivery maturity relabelled.** Linters, builds, tests, docs, reproducible
  envs, observability, branch protection — CI hygiene, renamed for the agent era. This confirms
   `[04-primitives-ontology-platform.md](./04-primitives-ontology-platform.md)` §3's note: **a meaningful
   share of "AI readiness" is just delivery maturity.** The two genuinely agent-native pillars are
   **8 Task Discovery** and, arguably, **9 Product & Experimentation** — and *Task Discovery* is the one
   that should worry us, because it is `J3 route`'s neighbour, published by a competitor, as a graded
   pillar.

**The open-source reimplementation, read directly** ✅ *2026-08-26* —
`[kodustech/agent-readiness](https://github.com/kodustech/agent-readiness)`, self-described as *"the
open-source alternative to Factory.ai's Agent Readiness."*


|                        |                                                                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Shape**              | **7 pillars × 5 levels**, **39 automated checks**, 10+ languages                                                                              |
| **Pillars**            | Style & Linting · Testing · Documentation · Dev Environment · **CI/CD** · **Code Health** · Security                                          |
| **Levels**             | *Foundational* → *Autonomous*; **same 80%-of-criteria-per-tier rule as Factory**                                                              |
| **Run as**             | `npx @kodus/agent-readiness .` — CLI, local, plus `--ci --min-level` and JSON output                                                          |
| **Output**             | **Per-pillar scores *and* an overall level**, plus a generated web dashboard                                                                  |
| **Licence / adoption** | **MIT · 99 stars**                                                                                                                            |
| **Pitch**              | Local (*"data never leaves your machine"*), free, vendor-agnostic, configurable — against Factory's proprietary, cloud, token-metered product |


**Three things this changes, and one it does not.**

1. **A third row set.** Factory docs say 9, Factory's launch says 8, the clone says 7 — and the clone
  promotes *CI/CD* and *Code Health* to pillars while dropping *Task Discovery* and *Product &
   Experimentation* entirely. **The two agent-native pillars are exactly the two the open-source clone
   did not reproduce**, which is a decent proxy for which pillars are hard.
2. `--ci --min-level` **is a minimum-style gate, and it is the closest anything gets to our rule.** It
  fails a build below a floor. **But it floors the *overall* level, not the weakest pillar** — so a
   repo with six strong pillars and one at zero still passes. The rule is still ours; the mechanism is
   no longer unique.
3. **It is small.** 99 stars against 12-Factor Agents' 25.5k. The instrument is *available* free, not
  *established* free.
4. **What it does not change:** it grades a repository. Nobody in this row is grading the system a team
  works inside. See §5.4.



### 2.2 Microsoft — Agentic AI adoption maturity model ✅ direct

[learn.microsoft.com/en-us/agents/adoption-maturity-model](https://learn.microsoft.com/en-us/agents/adoption-maturity-model/)
· published **2026-03-31**, updated **2026-05-20**.

**What it grades: an enterprise.** Explicitly derived from **CMM** — the model states this outright,
which makes it the most conventional artifact in the set and the one whose lineage is clearest.

**Five levels, on CMM's numbering:**


| Level | Name           | Definition                                                                                                                           |
| ----- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 100   | **Initial**    | *"Unplanned and experimental. Capabilities are inconsistent, siloed, and dependent on individuals rather than repeatable practices"* |
| 200   | **Repeatable** | *"Early patterns and practices begin to emerge… still informal and uneven"*                                                          |
| 300   | **Defined**    | *"Formally defined, documented, and supported by governance, standards, and operating models"*                                       |
| 400   | **Capable**    | *"Agents are embedded into enterprise planning and operations"*                                                                      |
| 500   | **Efficient**  | *"The organization operates as an agent-first enterprise… continuously improved"*                                                    |


**Five capability pillars:**


| Pillar                         | What it covers                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------- |
| **AI strategy and experience** | Business alignment, leadership priorities, long-term strategy, UX goals         |
| **Business strategy**          | Redesigning end-to-end processes for human–agent collaboration; measuring value |
| **AI governance and security** | Guardrails, controls, oversight, lifecycle governance, risk and compliance      |
| **Technology and data**        | Scalable secure foundations, architectures, data access patterns                |
| **Organization and culture**   | People, roles, incentives, ways of working                                      |


Plus **Responsible AI, explicitly described as embedded across all dimensions rather than being a
sixth pillar** — a deliberate anti-pattern-avoidance move: they refused to let the cross-cutting concern
become a row that could be scored low and ignored. Worth remembering when we are next tempted to make
something a row.

**Three findings:**

1. **"5 pillars × 25 capabilities, 4 segments" as recorded in** `02` **§5 is wrong.** It is **5 pillars × 5
  levels**. The "25" is almost certainly the **25 cells of the published quick-reference grid**
   (5 × 5), read as a capability count by a summarising layer. **There are no "4 segments."** Correct
   the row.
2. **It is entirely org-posture, with no harness content whatsoever.** Not one pillar concerns context
  assembly, tool interfaces, control flow, or evidence. This is the **opposite altitude** from
   Factory.ai — Microsoft grades the enterprise, Factory grades the repository, and **neither grades
   the system in between**. That gap is precisely where LoomWarp's Grid sits, and it is a better way to
   position it than "ours has more rows."
3. **Microsoft's second "Agent Readiness Framework" is not a competing grid** ✅ *fetched 2026-08-26*.
  `aka.ms/AgentReadinessFramework` redirects to a gated **e-book** backed by a survey of *500
   decision-makers across 13 countries and 16 industries*. Its five pillars map 1:1 onto the maturity
   model's — strategic business alignment · business process transparency and value mapping · secure
   scalable technology and data · organisational readiness · responsible AI governance. **No levels, no
   grid, C-level audience, contact form attached.** It is the demand-generation front end of the same
   five pillars.
   **But the naming collision is real and matters:** Factory.ai ships *Agent Readiness* (a repository
   scanner), Microsoft ships *Agent Readiness* (an executive e-book), `kodustech` ships *agent-readiness*
   (a CLI), and `agent-ready.org` ships another. **Four different things, one name. Do not adopt it as
   ours.**

**The row it belongs in, corrected:**


| Model                                        | Shape (corrected)                                         |
| -------------------------------------------- | --------------------------------------------------------- |
| Microsoft Agentic AI adoption maturity model | **5 pillars × 5 levels (CMM 100–500), RAI cross-cutting** |




### 2.3 Debois — Agent Enablement maturity ✅ direct on the pillars, ⚠️ on the stages

Patrick Debois (who coined *DevOps*), now at Tessl. Presented at AI Native DevCon London 2026 and
across the Tessl podcast/blog corpus.

**Three pillars — and each pillar is itself stated as a progression, which is the design:**


| Pillar         | Debois's own framing                                                                        | Progression it describes                                                     |
| -------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Enablement** | Fluency with agents                                                                         | *individual experimentation → team → org-level fluency*                      |
| **Platform**   | *"agent tooling that runs like a real delivery pipeline: **fast, observable, cost-aware**"* | ad hoc tooling → pipeline-grade infrastructure                               |
| **Governance** | Accountability                                                                              | *ad-hoc guardrails → real evaluation, telemetry, and accountable agent work* |


**Cross-cut by the four CDLC phases:** **generate · evaluate · distribute · observe.**

So the artifact is 3 pillars × 4 stages × 4 phases = **48 gradeable cells**, and — per `02` §5 — **no
governing rule across them.**

**Two things to take from Debois, one of which forces a qualification to our sharpest finding:**

1. **"Agent Enablement" as a named org function.** *"What's showing up is a new function: a team that
  enables other teams to get real leverage out of their agents."* It *"defines standards for skills,
   evals, and workflows, and sits next to DevOps and Platform Engineering."* **This is LoomWarp's job
   description, published by the person who named DevOps**, with an adoption pattern attached (Cisco,
   Adobe: one team enables another, then the central pieces get absorbed into the platform). It is the
   strongest available answer to *"who buys this and what is their title."*
2. **⚠️ Cost is not quite absent from every structural model.** Debois's Platform pillar is defined as
  *"fast, observable, **cost-aware**."* `02` §3 and `05-harness-factors.md` `XIV` both state that **no**
   published structural model contains cost. **The precise, defensible version:** cost appears in the
   published models only as an **adjective qualifying another pillar** (Debois) or as **marketplace
   economics between agents** (Agent Cloud Stack) — **never as a named function with its own row, its own
   artifact, and a join to outcome.** That is still a strong claim and it is now one that survives
   contact with the sources. **The unqualified version does not, and should be fixed in both files.**

> ⚠️ The four maturity stages under each pillar were not retrieved. The pillar definitions above are
> from Tessl's own blog and podcast material, which is closer than the previous relay but still not the
> primary talk.



### 2.4 Hassan et al. — **the correction: this is not an autonomy ladder** ✅ direct

[arXiv:2509.06216](https://arxiv.org/abs/2509.06216) — **Ahmed E. Hassan, Hao Li, Dayi Lin, Bram Adams,
Tse-Hsun Chen, Yutaro Kashiwa, Dong Qiu**, *"Agentic Software Engineering: Foundational Pillars and a
Research Roadmap."*

`02` **§5 lists this as an "L0–L5 autonomy ladder." It is not one. The paper contains no such ladder.**
The row is wrong and must be replaced. What the paper actually contains is more interesting to us than
what we thought it contained.

**What it argues.** It names the era **SE 3.0** and proposes **Structured Agentic Software Engineering
(SASE)**: that software engineering's four classical foundational pillars must be re-founded for
agents.


| The four pillars | The re-founding                                                              |
| ---------------- | ---------------------------------------------------------------------------- |
| **Actors**       | Not just humans — agents are first-class actors with standing in the process |
| **Processes**    | Designed for agent execution, not adapted from human workflow                |
| **Tools**        | Built for agent consumption                                                  |
| **Artifacts**    | Produced and consumed by agents, not only by people                          |


**Two modalities:** *SE for humans* and *SE for agents*, held as symbiotic rather than sequential.

**Two environments, and this is the part we should care about:**


| Environment                           | What it is                                                                   | Its named outputs                                          |
| ------------------------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Agent Command Environment (ACE)**   | *"A control hub where people coordinate agent teams and provide mentorship"* | **Merge-Readiness Packs** · **Consultation Request Packs** |
| **Agent Execution Environment (AEE)** | *"A workspace where agents complete tasks independently"*                    | **agent-initiated callbacks** requesting human expertise   |


**Why this correction is worth more than the error cost.** Three of our own constructs turn out to have
a peer-reviewed antecedent we did not know we had:


| Ours                                           | Hassan's                                                                 | What it means                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| HANDOFF / evidence bundle                      | **Merge-Readiness Pack**                                                 | `J8 prove` has an academic name and a defined shape                                         |
| Factor `IX` — *escalate with a recommendation* | **Consultation Request Pack** — a *packaged*, agent-initiated escalation | `J7 recover` is not as thinly modelled as we recorded                                       |
| `J11 coordinate humans`                        | **The ACE/AEE split itself**                                             | Human coordination gets a **named environment**, not a hook. Chan is no longer the only `●` |


**And the ACE/AEE split is a genuine structural idea we do not have.** We have one environment with
permission tiers inside it. Hassan separates **where humans command** from **where agents execute** as
two distinct environments with a defined protocol between them (packs out, callbacks in). That is a
cleaner architecture for `J11` than anything in our element model, and it is the strongest single
takeaway from re-reading these sources.

**Correct the** `02` **§5 row to:**


| Model                                                  | Shape                                                                                                                                       |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| Hassan et al. (arXiv:2509.06216) — *Agentic SE / SASE* | 4 re-founded pillars (actors · processes · tools · artifacts) × 2 modalities × 2 environments — **a research roadmap, not a maturity grid** |


**And note the consequence:** removing Hassan leaves the "everyone published a grid" claim resting on
**three** external grids, not four. The claim still holds — Factory, Microsoft and Debois are three
independent grids and the strongest of the four was never the ladder — but the count in `00-README.md`
§2.3 and `02` §5 must change.

### 2.5 LoomWarp — the Grid ✅ ours

Seven elements × six stages. From `[../../elements.md](../../archive/elements.md)` §3. Reproduced here so this
addendum is readable standalone.


|                   | **1 Absent**                 | **2 Individual**             | **3 Shared**                      | **4 Governed**                                        | **5 Default**                                           | **6 Self-improving**                                 |
| ----------------- | ---------------------------- | ---------------------------- | --------------------------------- | ----------------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| **E1 Workspace**  | Repos found by memory        | One dev's local clone layout | Documented layout others copy     | Machine-readable registry, owners, interfaces         | Registry drives clone, routing, impact analysis         | Registry self-updates from the estate                |
| **E2 Context**    | Whatever's in the window     | Personal `CLAUDE.md`         | Shared, committed context files   | Versioned, owned, layered, reviewed like code         | Resolved as a bundle per job, hashed + provenanced      | Agents propose context updates; staleness auto-flags |
| **E3 Control**    | Ad hoc prompting             | One-off scripts              | Documented workflow humans follow | Declared dependency graph, deterministic resolver     | Cross-repo dispatch from contract, no human in the loop | Graph re-plans from observed outcomes                |
| **E4 Capability** | Tribal knowledge             | Personal prompt library      | Shared skills folder              | Versioned packages, owners, standards tier            | Distributed via marketplace, permissioned, telemetered  | Capabilities retire and promote on usage evidence    |
| **E5 Policy**     | Whatever the agent can reach | Per-dev permission prompts   | Agreed tiers, documented in prose | Enforced at a point the model cannot reach; deny wins | Risk-tiered per action, fresh authz at each effect      | Policy tunes from denial and incident evidence       |
| **E6 Evidence**   | "It says it's done"          | Exit codes and logs          | Structured handoff docs           | Schema-valid events + bundles, blocking gates         | Every claim resolves to an artifact; independent eval   | Outcome evals can retroactively invalidate a handoff |
| **E7 Learning**   | Nothing persists             | Individual notes             | A wiki someone maintains          | Curated synthesis with owners and review dates        | Evaluated outcomes promote reviewed changes             | Regression-tested promotion with rollback            |


**What each element represents, in one line each** — the part the other grids do not have, because their
rows are hygiene categories rather than system functions:


| Element           | The capacity it names                                                                          | Jobs it serves |
| ----------------- | ---------------------------------------------------------------------------------------------- | -------------- |
| **E1 Workspace**  | An estate of independently owned repos, discoverable and routable **without merging them**     | `J3`           |
| **E2 Context**    | Knowledge served as a **resolvable bundle with provenance and freshness** — not a folder       | `J1` `J2`      |
| **E3 Control**    | Decomposition, dependency resolution and dispatch **with zero model in the decision loop**     | `J3` `J4`      |
| **E4 Capability** | *How we work*, packaged and versioned so it **travels without the hub**                        | `J10`          |
| **E5 Policy**     | What an agent may do, **decided outside the prompt and enforced where the model cannot reach** | `J5`           |
| **E6 Evidence**   | Every claim points at an artifact. **Completion is proven, never asserted**                    | `J6` `J8`      |
| **E7 Learning**   | Evaluated outcomes **promote versioned changes back** into Context and Capability              | `J9`           |


**Three rules no other grid in this landscape has.** These, not the row count, are the contribution:


| Rule                         | Statement                                                                              | What it kills                               |
| ---------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Minimum governs**          | *The fabric tears at its thinnest warp section*                                        | The averaged score                          |
| **The evidence rule**        | *If you cannot point at the artifact, you are one column to the left*                  | Aspirational self-grading                   |
| **The commitment threshold** | 3 → 4 is a decision, not a drift — structure stops being social and becomes mechanical | The illusion that documentation is progress |


**And the self-grade the instrument produces on us** (`elements.md` §3): E1 3 · E2 2 · E3 4 · E4 2 ·
**E5 1** · E6 3 · **E7 1**. Mean 2.3 — the flattering number. Minimum 1 — the diagnosing one.

### 2.6 The AI-Native Organizational Maturity Framework — ours, org altitude

`[../../AI-Native Organizational Maturity Framework.md](../../maturity/AI-Native-Organizational-Maturity-Framework.md)`.
**4 dimensions × 6 stages, grouped into 3 eras.** This is our Microsoft-equivalent: it grades the
organisation, not the structure.


| Dimension    | What it measures                                   | Low → High                                                                                                     |
| ------------ | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Strategy** | How explicit is the company's point of view on AI? | *"Everyone should try AI"* → *"These workflows are AI-first, these are human-only, and these are the metrics"* |
| **Culture**  | How safe and normal is AI usage?                   | secret use, stigma → clear norms, peer learning, strong review culture                                         |
| **Process**  | How embedded is AI in actual work?                 | random prompting → defined flows, reusable patterns, QA gates, escalation rules                                |
| **Outcomes** | Is the org measuring real gains?                   | anecdotes → measured cycle time, throughput, quality, defect rate, cost-to-serve                               |


**Six stages in three eras:** *Resistant · Opportunistic* (**Era 1 — AI as Tool**) → *Assisted ·
Systematized* (**Era 2 — AI as Workflow**) → ⚡ **commitment threshold** ⚡ → *AI-First · AI-Native*
(**Era 3 — AI as Operating Model**).

**The bridge to the Grid** (`elements.md` §3) — same six stages, same threshold, different subject:


| Stage | Grid — this **element** is…                                                            | Org — this **team** is… | Bottleneck          |
| ----- | -------------------------------------------------------------------------------------- | ----------------------- | ------------------- |
| 1     | Absent                                                                                 | Resistant               | Trust               |
| 2     | Individual                                                                             | Opportunistic           | Repeatability       |
| 3     | Shared                                                                                 | Assisted                | Workflow design     |
| —     | ⚡ **the commitment threshold** — structure stops being social and becomes mechanical ⚡ |                         |                     |
| 4     | Governed                                                                               | Systematized            | Operating model     |
| 5     | Default                                                                                | AI-First                | Org redesign        |
| 6     | Self-improving                                                                         | AI-Native               | Strategic coherence |


**The connecting rule: your minimum element stage is your organisation's real stage.** A team with
`E2` at 5 and `E5` at 1 is not AI-First. It is Opportunistic with uneven investment, and it will exhibit
the Stage-2 failure mode — capability trapped in individuals — however sophisticated its best thread
looks.

**Its own best idea, which the Grid does not carry:** the **innovation vs. FOMO driver distinction**.
Orgs exit Stage 1 for one of two reasons, and the reason predicts whether they break the threshold or
stall at 3 forever. *"Innovation-driven orgs ask what should we stop doing. FOMO-driven orgs ask what
should we add."* That is a one-question diagnostic for a sales conversation.

### 2.7 `generic-cerebro`'s rubric — ours, the ancestor

18 rows × 6 stages, across five bands — **posture · practices · threshold markers · operating mechanics ·
signals**. Per `[../systems/kd-built-frameworks/07-transfer-manifest.md](../systems/kd-built-frameworks/07-transfer-manifest.md)`
§4 this is **the direct ancestor of the Grid**: same six stages, same three-era framing, same threshold
at 3 → 4, same *minimum diagnoses / average flatters* argument. Its self-grade lands at 4.3 current
against 4.9 target — **and the document argues its own averages are the misleading number.**

**Three format features to take into the Grid**, none of which any external model has:

1. **Two markers per row — current *and* target.** The gap is the artifact; one score is not actionable.
2. **A boundary column** — is this gap ours to close, or is something outside the team capping us? That
  single column turns a self-assessment into a negotiation surface with leadership.
3. **Grader-uncertainty flags** — the rubric names which of its own scores are most contestable and
  would most move the mean. *A self-grade that tells you where to argue with it is far more credible
   than one that does not.*



### 2.8 The aggregation rules, side by side

**This table is the whole Genre-B argument in one place.** The rows differ everywhere; the interesting
divergence is the last column.


| Model                      | Grades                   | Rows                      | Levels                      | **How it resolves to a verdict**                                                               |
| -------------------------- | ------------------------ | ------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------- |
| **Factory.ai**             | a repository             | 8–9 pillars *(disputed)*  | 5 (Functional → Autonomous) | One overall level; **80% of criteria per level to unlock the next**; no governing pillar named |
| **Microsoft**              | an enterprise            | 5 pillars                 | 5 (CMM 100–500)             | Per-pillar level, no stated combination rule; RAI deliberately not a row                       |
| **Debois**                 | a context practice       | 3 pillars × 4 CDLC phases | 4                           | Per cell, **no governing rule at all** (48 cells)                                              |
| **Hassan**                 | *(not a grid)*           | 4 re-founded SE pillars   | —                           | n/a — a research roadmap                                                                       |
| **AI-Native Org (ours)**   | an organisation          | 4 dimensions              | 6, in 3 eras                | Per dimension; *"the gap between dimensions is where friction lives"*                          |
| **generic-cerebro (ours)** | an organisation          | 18 rows, 5 bands          | 6                           | Weighted mean **published alongside the argument that the mean misleads**                      |
| **LoomWarp Grid (ours)**   | **a system's structure** | **7 elements**            | **6**                       | **The minimum governs. Named, and it is the point**                                            |


---



## 3. Genre C — the principle manifestos

*These answer "how should we build it." They cannot grade anything, and that is deliberate.*

### 3.1 12-Factor App — the genre's origin

Adam Wiggins, Heroku, **2011**. The reason every list of this shape exists. Its move was to state
platform requirements as **portable principles rather than a product**, which is why it outlived Heroku.

### 3.2 12-Factor Agents — the most adopted artifact in the space ◐ relayed

`github.com/humanlayer/12-factor-agents`, HumanLayer, **2025-03-30**, **25.5k stars**. Flat and
deliberately unranked. Glossed below — **the titles are verbatim; the gloss is ours**:


| #   | Factor                                           | What it is arguing                                                                      |
| --- | ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| 1   | Natural Language to Tool Calls                   | The core transformation: prose in, structured call out                                  |
| 2   | Own your prompts                                 | Do not let a framework hide the prompt from you                                         |
| 3   | Own your context window                          | Assembly is your code, not the library's                                                |
| 4   | Tools are just structured outputs                | Demystifies tools — a tool call is a JSON shape, not magic                              |
| 5   | Unify execution state and business state         | One state, not a shadow copy the agent reasons over                                     |
| 6   | Launch/Pause/Resume with simple APIs             | Long-running work must be interruptible                                                 |
| 7   | Contact humans with tool calls                   | **Human input is a tool the agent invokes** — the cleanest published statement of `J11` |
| 8   | Own your control flow                            | The loop is yours to write, not the framework's to own                                  |
| 9   | Compact Errors into Context Window               | Failures belong in the loop, summarised — the seed of Böckeler's sensors                |
| 10  | Small, Focused Agents                            | Bound the surface; do not build one agent that does everything                          |
| 11  | Trigger from anywhere, meet users where they are | The agent is reachable from Slack, cron, webhook — not just a terminal                  |
| 12  | Make your agent a stateless reducer              | `f(state, event) → state`. The whole architecture in one line                           |


**The three things to know about it.**

1. **It is written at the single-agent, single-operator altitude.** *Own your* appears three times.
  Excellent, and about one person running one loop. **The team altitude is unclaimed.**
2. **Its own author moved past it.** Dex Horthy published the twelve in March 2025 and then keynoted
  *"Harness Engineering is not Enough: Why Software Factories Fail"* at the World's Fair in 2026.
   **The genre's leading practitioner has said the form is insufficient and has not published the
   replacement.**
3. **Its colleague supplied the field evidence.** Kyle Mistele ran a lights-off factory for six months:
  *"bad code compounded, and agents created problems that agents couldn't solve — until we had to throw
   it all away. But this is a survivor's guide, not an obituary."*



### 3.3 The fourteen harness factors — ours

`[05-harness-factors.md](./05-harness-factors.md)`. The successor written at the **team** altitude. Each is
an imperative + the failure it prevents + the artifact that proves it + the job it serves.


| #    | Factor                                     | Job       | Prevents                                                    |
| ---- | ------------------------------------------ | --------- | ----------------------------------------------------------- |
| I    | One way to do each thing                   | *meta*    | The agent inventing a fourth way because three exist        |
| II   | Route deterministically                    | `J3`      | A probabilistic answer to a question that has a correct one |
| III  | Context is instruction, not overview       | `J1`      | Paying 20%+ per run for context that does not help          |
| IV   | Memory routes by ownership                 | `J2`      | Team facts dying in a per-user store                        |
| V    | Scope only narrows                         | `J5`      | A local grant silently widening what the estate allows      |
| VI   | Declare the edges                          | `J4`      | Work starting before its dependency landed                  |
| VII  | The gate does not run on the model         | `J5` `J6` | Every guardrail being prose the model may ignore            |
| VIII | Feedback is addressed to the machine       | `J6`      | A correction loop that needs a human translator             |
| IX   | Escalate with a recommendation             | `J7`      | An escalation that moves the problem, not the decision      |
| X    | Every claim points at an artifact          | `J8`      | *"It said it was done"*                                     |
| XI   | Knowledge compounds or it is not knowledge | `J9`      | Relearning the same lesson every quarter                    |
| XII  | Capability travels without the hub         | `J10`     | A skill that works for its author and nobody else           |
| XIII | Work is addressable by the whole team      | `J11`     | The bottleneck every harness hits at the second user        |
| XIV  | Cost is a first-class signal               | `J12`     | A system nobody can justify continuing to buy               |


**Why fourteen and not twelve.** Forcing the genre's number would drop `XIII` and `XIV` — precisely the
two least modelled anywhere. **Choosing the shape of the answer over its content is the failure this
whole research folder exists to avoid.**

**What would falsify each.** Every factor is stated so it can fail — *if teams that honour* `III` *do not
outperform teams that write repository overviews,* `III` *is wrong.* **A factor nobody could disprove is a
slogan.** None of the three genres above does this, and it is the cheapest credibility we have.

---



## 4. Primitives — the layer beneath all three genres

**Definition** (`[../01-concepts.md](../01-concepts.md)` §3.17): *a minimal, named, composable unit that
the harness makes the **single sanctioned way** to express something.*

**The defining property is not what a primitive does — it is that there is one of it.** A feature is
something the system *can* do; a primitive is something the system makes you do *one way*. A team with
two ways to declare a unit of work has no work primitive — it has two conventions and a coin flip. Where
a human picks one and remembers, **an agent picks differently each session, or invents a fourth.**

**Why this is the honest answer to "what does harness architecture look like."** `primitive` occurs **33
times** in the World's Fair corpus, two talks carry it in the title, and every serious system defines a
set. **A system's primitive set *is* its architecture** — it says what exists, what composes with what,
and what the one sanctioned way to do each thing is.


| System            | Its primitive set                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------- |
| **Gas City**      | formula · agent · bead · order · pack                                                        |
| **QM**            | scope                                                                                        |
| **FRACTAL**       | BLUEPRINT · workstream · HANDOFF                                                             |
| **Claude Code**   | seven (skills, agents, hooks, commands, MCP, settings, memory)                               |
| **LoomWarp**      | registry · context bundle · work contract · capability package · risk tier · evidence bundle |
| **Hassan (SASE)** | Merge-Readiness Pack · Consultation Request Pack · callback                                  |


1. **On "ontology."** `[04-primitives-ontology-platform.md](./04-primitives-ontology-platform.md)` §4 settles
this: **say** `primitive`**.** Ontology's durable half — Palantir's *"kinetic elements"*, Huang's *"permitted
verbs"*, Coyle's *"typed entities that tools must respect"* — is **a primitive set with bounded verbs**,
and the word itself now carries analytics baggage (13 of 14 ontology-branded vendors are enterprise-data
semantics; three were absorbed during 2026; Cube renamed its `semantic-layer` page to *"The AI context
layer"*). Where the verb-bounding idea needs a name, **describe it** — *a primitive that names its
permitted actions* — rather than importing a claim we will have to defend by 2027.

**On "platform."** Same section: platform is **how the primitives reach a team**, not a layer above them.
DORA lists platform engineering as **one of seven peer AI capabilities**; Debois puts it as one of three
peer pillars. It is `J10 distribute`.

---



## 5. Concept synthesis — the seven things that actually matter



### 5.1 The field agreed on the words and refused to agree on the hierarchy

AAIF ratified the vocabulary, marked *"Autonomy level"* as **pending working-group discussion**, and left
`broaderTerm` **deliberately unfilled**. Meanwhile *harness* is used at two altitudes simultaneously — QM
calls itself *"a multiplayer agent harness"* whose loop **runs Claude Code, Pi and OpenCode, which are
themselves harnesses**; Microsoft says harness ⊂ framework; Parallel says the opposite. **This is not our
confusion to resolve by picking a side; it is a documented, unresolved gap** — which is what licenses
introducing **process layer** as a fix to a named problem rather than as house vocabulary.

### 5.2 Three functions are absent from every published model, and one is now qualified


| Gap              | Status after re-reading the sources                                                                                                                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Routing**      | **Holds.** Buried inside Meng's *Tool Registry*, absent from AAIF, Macedo, Chan, 12-Factor. But **Factory.ai now ships** `Task Discovery` **as a graded pillar** — the nearest neighbour, published by a competitor. The gap is closing from the readiness side, not the taxonomy side |
| **Cost**         | **Holds, with a required qualification.** Debois's Platform pillar says *"cost-aware"*; Agent Cloud Stack has *"Agent Economy."* **Cost appears as an adjective or as marketplace economics — never as a named function with its own artifact joined to outcome.** Say that version    |
| **Distribution** | **Holds.** Appears obliquely as "skills" or "golden path." Debois and DORA both treat platform as delivery, which is corroboration for the framing, not a competing model                                                                                                              |


**The cost finding remains the sharpest thing in the research, because the two axes disagree.** The
practitioner corpus is saturated — `cost` 70, `budget` 23, `spend` 22, `throughput` 21, and a dedicated
`AI Architects: Tokenmaxxing` track — while every structural model omits it as a row. **A high-attention
operational concern with no home in any model of what a harness is.** That is a much stronger claim than
*"we thought of it first,"* and two independent methods reached it: the term census in
`[01](./01-worldsfair-2026-vocabulary.md)` and the cross-reference in `[02](./02-harness-taxonomies.md)` §2.

### 5.3 A large share of "AI readiness" is delivery maturity wearing a new label

Seven of Factory's nine pillars are linting, builds, tests, docs, reproducible environments,
observability and branch protection. DORA frames **version control** as *"a critical safety net as AI
accelerates the velocity of change"* and **small batches** as *"counteracting the risk of instability."*
Both are ordinary engineering discipline relabelled.

**This cuts two ways and we should say both.** It means much of the market's readiness advice is
recycled — and it means **the genuinely new rows are identifiable by elimination.** In Factory's list
that is `Task Discovery`. In ours it is `E5 Policy`, `E6 Evidence`, `E7 Learning` and the `J12` row that
does not exist yet. **Anything that would have been good advice in 2019 is not our differentiator.**

### 5.4 The instruments grade three different subjects, and the middle one is empty

```
   Microsoft  ──────────►  an ENTERPRISE      strategy, culture, governance, value
   AI-Native Org (ours) ─►  an ORGANISATION    posture, process, outcomes
                                    ▲
   ╔═══════════════════════════════════════════════════════════════╗
   ║  ← the empty altitude: the SYSTEM the team actually works in  ║
   ║     LoomWarp's Grid is the only instrument here               ║
   ╚═══════════════════════════════════════════════════════════════╝
                                    ▼
   Factory.ai  ─────────►  a REPOSITORY       linters, builds, tests, docs
   Meng's matrix ───────►  a HARNESS          six components, present/absent, no stages
```

**This is a better positioning line than "ours has seven rows."** Microsoft cannot tell you your context
layer is unversioned. Factory cannot tell you your policy is prose. Meng can tell you a component is
missing but not that it is *immature*. **The instrument that grades the structure a team works inside,
with maturity stages, does not exist outside this repository.**

### 5.5 The aggregation rule is the real contribution, and it is now a narrower claim

Factory: one overall level, **80% of criteria per level** to progress. Microsoft: per-pillar, no stated
combination. Debois: 48 cells, no rule. `generic-cerebro`: publishes a weighted mean **and argues against
it**. Ours: **the minimum governs, stated as the point.**

**The honest formulation after reading the sources:** Factory does have a *within-level* threshold, so
"nobody has any gating mechanic" is wrong. **What remains true and unmatched: nobody names which pillar
decides the verdict, and nobody publishes a rule that a single weak pillar caps the whole system
regardless of the others.** That is defensible, it is methodological, and it should be argued rather than
assumed.

### 5.6 Feedback written for humans is a category error we are currently making

Böckeler's sensor insight — *signals optimised for LLM consumption* — plus 12-Factor's #9 *compact errors
into the context window*, plus Hassan's **Consultation Request Packs**, all point the same way: **the
artifacts a harness emits should be addressed to the next agent, not to the next human.**

Our HANDOFF documents, evidence bundles and event records are written for people. That is `E6` at
column 3 by design — *structured handoff docs* — and it is a ceiling, not a bug we introduced. **The move
to column 4+ is not more schema; it is changing the addressee.**

### 5.7 The two grids we did not know we had

**Böckeler is a grid** (2 × 2 × 3 = 12 cells, rows are harness functions) and **Meng's Completeness
Matrix is a grid** (23 systems × 6 components, binary cells). Neither is treated as one anywhere in this
corpus. Both strengthen §5's *"everyone who published structure published a grid"* — which is important,
because removing Hassan took the external count from four to three.

**Recount:** Factory · Microsoft · Debois · **Böckeler** · **Meng's matrix** = five external grids,
of which two have harness-function rows and none has a maturity axis on those rows. **The claim is
stronger after the correction than before it.**

---



## 6. Corrections this addendum forces on the corpus

Three, in descending order of materiality. All three are `FM-3` — a claim recorded from a summary and
carried forward without a primary read.


| #     | Where                     | Recorded as                                           | Actually                                                                                                                                                                 | Fix                                                                                                                                                                           |
| ----- | ------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | `02` §5, `00-README` §2.3 | *Hassan et al. — L0–L5 autonomy ladder*               | *Agentic Software Engineering: Foundational Pillars and a Research Roadmap* — 4 re-founded SE pillars, 2 modalities, ACE/AEE. **No autonomy ladder exists in the paper** | Replace the row; move Hassan out of Genre B into its own category; add ACE/AEE and the two Pack primitives to `J7`/`J11` evidence                                             |
| **2** | `02` §5                   | *Microsoft — 5 pillars × 25 capabilities, 4 segments* | **5 pillars × 5 CMM levels (100–500)**, RAI cross-cutting. "25" is the 5×5 quick-reference grid; **there are no 4 segments**                                             | Correct the shape                                                                                                                                                             |
| **3** | `02` §3, `05` `XIV`       | *No published structural model contains cost*         | Debois's Platform pillar is *"fast, observable, **cost-aware**"*; Agent Cloud Stack has *"Agent Economy"*                                                                | Qualify to: *cost appears only as an adjective on another pillar or as inter-agent marketplace economics — never as a named function with its own artifact joined to outcome* |


**Two sharpenings that are not errors but weaken an overstatement:**

- **Factory.ai does have a gating mechanic** — 80% of criteria per level. `02` §5's *"none of them says
which cell decides"* is still true at the **pillar** level; the sentence should say so precisely.
- **Factory's own pillar count is disputed inside Factory's own material** — 8 in the launch post and X
announcement (with *Code Quality* and *Security & Governance*), 9 in the docs (with *Task Discovery*
and *Product & Experimentation*). Cite the docs and note the drift.

**One competitive fact that changes a strategy claim:** an open-source clone of Agent Readiness already
exists (`[kodustech/agent-readiness](https://github.com/kodustech/agent-readiness)`).
`[00-README.md](./00-README.md)` §F-5 argues the maturity diagnostic is our best adoption wedge *because it
costs an adopter nothing to try.* **Somebody else has already made a readiness diagnostic free.** The
wedge now has to be the *altitude* (§5.4) and the *rule* (§5.5), not the existence of a grid.

---



## 7. What we need to understand from all of this

**Six things, stated as what they change.**

1. **Do not argue that the Grid is novel because it is a grid.** It is not — five external grids exist.
  Argue **altitude** (nobody grades the system a team works inside) and **rule** (nobody names the cell
   that decides). Both survive contact with the primary sources; "we have a grid" does not.
2. `J3 route` **and** `J12 account` **are still the two real gaps, and they are different kinds of gap.**
  Routing is *converging on us* — Factory ships `Task Discovery`, Meng buries routing in the Tool
   Registry, Tan names it exactly. Cost is *unclaimed* — high practitioner attention, no structural home.
   **Cost is the more defensible novelty; routing is the more urgent build.**
3. **Policy is a membership condition, not a maturity nicety.** Macedo's T4 says a system with no
  model-independent control is not a harness. Our `E5` sits at **1**, and the only live run used
   `bypassPermissions`. **On the field's own published inclusion test, LoomWarp does not currently
   qualify as a harness.** That is the strongest possible framing for why v1 makes enforced policy
   non-negotiable — and it is someone else's test, not our self-criticism.
4. **Change who our artifacts are addressed to.** Böckeler's sensors, 12-Factor's #9, and Hassan's
  Consultation Request Packs converge: harness output belongs to the next agent. Our `E6` is
   human-addressed and therefore capped at column 3.
5. **Take the ACE/AEE split seriously.** Hassan gives human coordination a named *environment* with a
  defined protocol — packs out, callbacks in. We have permission tiers inside one environment. This is
   the cleanest external answer to `J11` and we found it by accident while correcting an error.
6. **Take the three rubric features from** `generic-cerebro` **into the Grid** — current *and* target markers,
  a boundary column, grader-uncertainty flags. No external model has any of them, they cost one column
   each, and the third is the highest-credibility-per-word change available: **a self-grade that tells
   you where to argue with it.**

**And one process lesson, which is the reason this addendum exists.** Three of the four grids in `02` §5
were cited by **shape** from a secondary summary. One was a different paper entirely, one had the wrong
dimensions, and one supported a claim we had overstated. **The section's argument survived — it is
stronger now — but it survived by luck.** `99-source-hygiene.md` §5 already says anything destined for
external publication must be re-pulled from the raw source. **The rule needs to apply one step earlier:
before a source becomes load-bearing for a claim, not before the claim is published.**

---

---



## 7A. Decisions taken — 2026-08-26

Recorded here because §7 states what the evidence *means*; this states what we *did about it*.


| #       | Decision                                                                                                                            | Where it landed                                                                                                                                                                       |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **D-1** | **Apply all three corrections to the parent documents**, and recount §5 to include Böckeler and Meng's Completeness Matrix as grids | `[02-harness-taxonomies.md](./02-harness-taxonomies.md)` §3 + §5 · `[00-README.md](./00-README.md)` §2.3 · `[05-harness-factors.md](./05-harness-factors.md)` `XIV` + §3                    |
| **D-2** | **Hold mechanical enforcement at column 4**, against Factory.ai's Level 3, and say why                                              | `[../../elements.md](../../archive/elements.md)` §3 — new *"Where we differ from the market, deliberately"* note, with the adopter translation row **LoomWarp 4 ≈ Factory 3 ≈ Microsoft 300** |
| **D-3** | **Four findings become work** — see the table below                                                                                 | this section                                                                                                                                                                          |
| **D-4** | **F-5's wedge stays open pending research** — research now done, §7B; the rewrite is not yet made                                   | `[../00-README.md](../00-README.md)` §F-5                                                                                                                                             |




### D-2, stated once so it can be quoted

**Factory's Level 3 is CI automation. Our column 4 is a control the model cannot reach.** A test suite
the agent can skip, disable or route around is socially enforced, not mechanically enforced — column 3.
Macedo's `T4` is the external authority for that reading, and it states model-independent control as a
**membership condition**, not a maturity nicety. **Consequence: our stage numbers are one column stricter
than the market's from 3 upward, and every comparative claim must say so.**

### D-3 — the four work items


| #       | Item                                                                                                                                                                            | Why now                                                                                                                                                                                                          | The external authority                                                                                                                                       | Element    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| **W-1** | **Rewrite the v1 policy scope around Macedo's** `T4`                                                                                                                            | On the field's own published inclusion test, a system with no model-independent control **is not a harness**. `E5` sits at **1** and the only live run used `bypassPermissions`, which skips deny rules entirely | [arXiv:2606.10106](https://arxiv.org/abs/2606.10106) `T4`                                                                                                    | `E5`       |
| **W-2** | **Re-address evidence artifacts to the next agent, not the next human**                                                                                                         | `E6` is capped at column 3 by its *addressee*, not by its schema. Three independent sources converge on this                                                                                                     | Böckeler's sensors · 12-Factor #9 · Hassan's Consultation Request Packs                                                                                      | `E6`       |
| **W-3** | **Evaluate the ACE/AEE split for** `J11` — needs an ADR                                                                                                                         | We have permission tiers inside one environment. Hassan has two environments with a defined protocol: **Merge-Readiness Packs out, agent-initiated callbacks in.** Cleaner, and peer-reviewed                    | [arXiv:2509.06216](https://arxiv.org/abs/2509.06216)                                                                                                         | `E3` `E6`  |
| **W-4** | **Take the three rubric features into the Grid** — current *and* target markers, a **boundary column** (ours to close, or externally capped?), and **grader-uncertainty flags** | No external model has any of them. One column each. The third is the highest credibility-per-word change available: *a self-grade that tells you where to argue with it*                                         | `generic-cerebro`'s 18-row rubric, via `[../systems/kd-built-frameworks/07-transfer-manifest.md](../systems/kd-built-frameworks/07-transfer-manifest.md)` §4 | *the Grid* |


**Sequencing note.** `W-1` before `W-2`: an evidence artifact addressed to an agent, in a system where
the agent can disable the gate that produced it, is a worse artifact than the human-addressed one it
replaces. `W-4` is independent and cheap. `W-3` is a design question, not a build.

---



## 7B. The competitive research behind the open F-5 decision

`[../00-README.md](../00-README.md)` §F-5 argues the maturity diagnostic is our best adoption wedge
*"because it costs an adopter nothing to try."* Two facts were checked directly before rewriting it.
**The rewrite is deliberately not made here** — this section is the evidence it should be made from.


| Finding                                         | Evidence                                                                                                      | What it does to F-5                                                                                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A free readiness diagnostic exists**          | `kodustech/agent-readiness` — MIT, `npx`-runnable, 7 pillars, 39 checks, per-pillar + overall scores, CI gate | **The "costs nothing to try" half of the wedge is gone.** Somebody else made it free first                                                                          |
| **It is early, not established**                | **99 stars.** Compare 12-Factor Agents at 25.5k                                                               | The wedge is *eroded*, not *lost*. There is time, and no incumbent                                                                                                  |
| **It grades a repository**                      | Pillars are linting, tests, CI/CD, code health, security                                                      | **Does not touch our altitude.** It cannot tell you your context layer is unversioned or your policy is prose                                                       |
| **Its CI gate is a floor on the overall level** | `--ci --min-level`                                                                                            | The closest anything gets to minimum-governs — **and it still floors the aggregate, not the weakest pillar.** Our rule survives; the *mechanism* is no longer novel |
| **Microsoft's second "Agent Readiness"**        | A gated e-book, 500-decision-maker survey, five pillars, **no levels**                                        | Not a competing instrument. But **four different artifacts now share the name "Agent Readiness"** — do not adopt it                                                 |


**What the evidence supports when F-5 is rewritten:** the wedge is **altitude** (§5.4 — nobody grades
the system a team works inside) plus **the governing rule** (§5.5 — nobody names the cell that decides).
**What it no longer supports:** *"it costs an adopter nothing to try"* as the differentiator, and *"none
of our peers grades you"* as stated — the peer set in that sentence was gstack, Gas City, QM, Indigo and
SageOx, and it is still true of them, but the relevant competitor is no longer in that set.

**Still open, and worth one pass before the rewrite:** whether `agent-ready.org` and the
*"Enterprise AI Agent Maturity Model"* (agility-at-scale) are further entrants, and whether Factory's
`Task Discovery` pillar has published criteria — it is `J3 route`'s nearest neighbour and the only
agent-native pillar a competitor grades.

## 8. Source ledger


| Framework                                    | Genre | Primary source                                                                                                                | Status                                         |
| -------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Factory.ai Agent Readiness                   | B     | [docs.factory.ai/agent-readiness/overview](https://docs.factory.ai/agent-readiness/overview)                                  | ✅ **direct 2026-08-26**                        |
| Microsoft Agentic AI adoption maturity model | B     | [learn.microsoft.com/en-us/agents/adoption-maturity-model](https://learn.microsoft.com/en-us/agents/adoption-maturity-model/) | ✅ **direct 2026-08-26**                        |
| Hassan et al. — Agentic SE / SASE            | —     | [arXiv:2509.06216](https://arxiv.org/abs/2509.06216)                                                                          | ✅ **direct 2026-08-26**                        |
| Debois — Agent Enablement                    | B     | tessl.io/speaker/patrickdebois `https://tessl.io/speaker/patrickdebois/` + blog corpus                                       | ◐ pillars direct-ish; **4 stages unretrieved** | **⚠️ 404, checked 2026-09-08 — link dead at the publisher; the citation is kept because the claim rests on it, and the title is the thing to search for**
| AAIF taxonomy                                | A     | [github.com/aaif/ws-taxonomy-landscape](https://github.com/aaif/ws-taxonomy-landscape)                                        | ◐ relayed                                      |
| Meng et al. `H=(E,T,C,S,L,V)`                | A     | [10.20944/preprints202604.0428.v3](https://doi.org/10.20944/preprints202604.0428.v3) — **403**                                | ◐ **repo-sourced, not paper-sourced**          |
| Macedo — T1–T4                               | A     | [arXiv:2606.10106](https://arxiv.org/abs/2606.10106)                                                                          | ◐ relayed                                      |
| Böckeler — Guides/Sensors                    | A     | [martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html)              | ◐ relayed                                      |
| Chan et al. — agent infrastructure           | A     | [arXiv:2501.10114](https://arxiv.org/abs/2501.10114) (TMLR)                                                                   | ◐ relayed                                      |
| Weng — Harness Engineering                   | A     | [lilianweng.github.io](https://lilianweng.github.io/), 2026-07-04                                                             | ◐ relayed                                      |
| Trivedy — Anatomy of an Agent Harness        | A     | [blog.langchain.com](https://blog.langchain.com/), 2026-03-10                                                                 | ◐ relayed                                      |
| 12-Factor Agents                             | C     | [github.com/humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents)                                      | ◐ relayed                                      |
| Externalization                              | A     | [arXiv:2604.08224](https://arxiv.org/abs/2604.08224)                                                                          | ⚠️ **unverified**                              |
| HarnessX                                     | A     | [arXiv:2606.14249](https://arxiv.org/abs/2606.14249)                                                                          | ⚠️ **unverified**                              |
| Agent Cloud Stack                            | A     | [arXiv:2606.20570](https://arxiv.org/abs/2606.20570)                                                                          | ⚠️ **unverified**                              |
| `agentic-ai.readthedocs.io` "ETCLOVG"        | —     | —                                                                                                                             | ❌ **fabricated — do not cite**                 |


**Still unretrieved and worth one pass:** Debois's four maturity stages · Meng's Completeness Matrix from
the paper itself · Macedo's full text · the three weaker arXiv taxonomies · Factory's published criteria
for the `Task Discovery` pillar (`J3`'s nearest neighbour, and the only agent-native pillar a
competitor grades) · `agent-ready.org` and the *Enterprise AI Agent Maturity Model* as possible further
entrants.

---



## 9. References

Full citations for everything this document quotes or grades. **Access dates are given for the four
sources fetched directly for this addendum on 2026-08-26**; everything else carries the status recorded
in §8 and in `[99-source-hygiene.md](./99-source-hygiene.md)`.

### 9.1 Readiness grids (Genre B)

**Factory.ai — Agent Readiness** ✅ *accessed 2026-08-26*

- Model reference, nine pillars and five levels — [https://docs.factory.ai/agent-readiness/overview](https://docs.factory.ai/agent-readiness/overview)
- Product page — [https://factory.ai/product/agent-readiness](https://factory.ai/product/agent-readiness)
- Launch announcement (**eight** axes; the count discrepancy) — [https://factory.ai/news/agent-readiness](https://factory.ai/news/agent-readiness)
- Launch post on X, *"Scores across eight axes place each repo at one of five maturity levels"* — [https://x.com/FactoryAI/status/2014036139343224979](https://x.com/FactoryAI/status/2014036139343224979)
- Open-source reimplementation, `@kodus/agent-readiness` — MIT, 7 pillars, 39 checks, 99 stars —
[https://github.com/kodustech/agent-readiness](https://github.com/kodustech/agent-readiness) ✅ *accessed 2026-08-26*
- Further entrants, **unread** — [https://agent-ready.org/](https://agent-ready.org/) ⚠️ ·
*Enterprise AI Agent Maturity Model* [https://agility-at-scale.com/ai/agents/enterprise-ai-agent-maturity-model/](https://agility-at-scale.com/ai/agents/enterprise-ai-agent-maturity-model/) ⚠️

**Microsoft — Agentic AI adoption maturity model** ✅ *accessed 2026-08-26*

- Introduction, five levels and five pillars — [https://learn.microsoft.com/en-us/agents/adoption-maturity-model/](https://learn.microsoft.com/en-us/agents/adoption-maturity-model/)
- Pillar articles — `maturity-model-strategy` · `maturity-model-business-process` ·
`maturity-model-security-governance` · `maturity-model-technology` · `maturity-model-readiness`
- The separately-named **Agent Readiness Framework** it aligns to — [https://aka.ms/AgentReadinessFramework](https://aka.ms/AgentReadinessFramework),
which 301-redirects to [https://info.microsoft.com/ww-landing-ai-agent-assessment.html](https://info.microsoft.com/ww-landing-ai-agent-assessment.html): a gated e-book
backed by a 500-decision-maker survey across 13 countries and 16 industries. **Five pillars, no levels,
C-level audience.** ✅ *accessed 2026-08-26*
- Its stated CMM sibling, Platform Engineering Capability Model —
[https://learn.microsoft.com/en-us/platform-engineering/platform-engineering-capability-model](https://learn.microsoft.com/en-us/platform-engineering/platform-engineering-capability-model)

**Patrick Debois (Tessl) — Agent Enablement** ◐

- Speaker page and talk index — https://tessl.io/speaker/patrickdebois/ `https://tessl.io/speaker/patrickdebois/` **⚠️ 404, checked 2026-09-08 — link dead at the publisher; the citation is kept because the claim rests on it, and the title is the thing to search for**
- *The Context Flywheel: Why the Best AI Coding Teams Will Win on Context* — [https://tessl.io/blog/the-context-flywheel-why-the-best-ai-coding-teams-will-win-on-context/](https://tessl.io/blog/the-context-flywheel-why-the-best-ai-coding-teams-will-win-on-context/)
- *The State of the AI Coding Stack: Agent Skills, Harnesses, and Enablement*, AI Native DevCon London 2026 — [https://tessl.io/blog/the-state-of-the-ai-coding-stack-agent-skills-harnesses-and-enablement-at-ai-native-devcon-london-2026](https://tessl.io/blog/the-state-of-the-ai-coding-stack-agent-skills-harnesses-and-enablement-at-ai-native-devcon-london-2026)
- *AI Native DevCon Day 1: Making AI Agents Ready for Enterprise* — [https://tessl.io/blog/ai-native-devcon-day-1-making-ai-agents-ready-for-enterprise/](https://tessl.io/blog/ai-native-devcon-day-1-making-ai-agents-ready-for-enterprise/)
- Podcast, *From DevOps to AI* — https://tessl.io/podcast/from-devops-to-patrick-debois-shares-strategies-for-successful-ai-integration-and-cultural-change `https://tessl.io/podcast/from-devops-to-patrick-debois-shares-strategies-for-successful-ai-integration-and-cultural-change` **⚠️ 404, checked 2026-09-08 — link dead at the publisher; the citation is kept because the claim rests on it, and the title is the thing to search for**
- ⚠️ **The four maturity stages under each pillar remain unretrieved.**

**Ahmed E. Hassan, Hao Li, Dayi Lin, Bram Adams, Tse-Hsun Chen, Yutaro Kashiwa, Dong Qiu** —
*"Agentic Software Engineering: Foundational Pillars and a Research Roadmap"* ✅ *accessed 2026-08-26*

- [https://arxiv.org/abs/2509.06216](https://arxiv.org/abs/2509.06216)
- **Cited in this corpus until 2026-08-26 as an "L0–L5 autonomy ladder." It is not one.** See §2.4 and §6.



### 9.2 Function taxonomies (Genre A)

- **AAIF**, `ws-taxonomy-landscape`, commit 2026-08-19 — [https://github.com/aaif/ws-taxonomy-landscape](https://github.com/aaif/ws-taxonomy-landscape)
- **Meng et al.**, *"Agent Harness for Large Language Model Agents: A Survey"*, preprints.org,
`10.20944/preprints202604.0428.v3`, 2026-04-09 — [https://doi.org/10.20944/preprints202604.0428.v3](https://doi.org/10.20944/preprints202604.0428.v3)
(**HTTP 403**; definitions in this corpus are from the authors' companion repo, not the paper)
- **Macedo**, arXiv:2606.10106, 2026-06-08 — [https://arxiv.org/abs/2606.10106](https://arxiv.org/abs/2606.10106)
- **Birgitta Böckeler**, *"Harness Engineering"*, martinfowler.com, 2026-04-02 — [https://martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html)
- **Chan et al.**, *"Infrastructure for AI Agents"*, arXiv:2501.10114 v3, TMLR — [https://arxiv.org/abs/2501.10114](https://arxiv.org/abs/2501.10114)
- **Lilian Weng**, *"Harness Engineering"*, Lil'Log, 2026-07-04 — [https://lilianweng.github.io/](https://lilianweng.github.io/)
- **Trivedy**, *"Anatomy of an Agent Harness"*, LangChain, 2026-03-10 — [https://blog.langchain.com/](https://blog.langchain.com/)
- **Externalization**, arXiv:2604.08224 — [https://arxiv.org/abs/2604.08224](https://arxiv.org/abs/2604.08224) ⚠️
- **HarnessX**, arXiv:2606.14249 — [https://arxiv.org/abs/2606.14249](https://arxiv.org/abs/2606.14249) ⚠️
- **Agent Cloud Stack**, arXiv:2606.20570 — [https://arxiv.org/abs/2606.20570](https://arxiv.org/abs/2606.20570) ⚠️
*(the one published taxonomy with an economics slot — see §5.2)*



### 9.3 Principle manifestos (Genre C)

- **Adam Wiggins**, *The Twelve-Factor App*, Heroku, 2011 — [https://12factor.net](https://12factor.net)
- **HumanLayer / Dex Horthy**, *12-Factor Agents*, 2025-03-30, 25.5k stars — [https://github.com/humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents)
- **Dex Horthy**, *"Harness Engineering is not Enough: Why Software Factories Fail"*, AI Engineer
World's Fair 2026, Main Stage — schedule entry in `[data/aie-worldsfair-2026-schedule.md](./data/aie-worldsfair-2026-schedule.md)`
- **Kyle Mistele**, *"Loop Engineering from first principles"*, same corpus — the six-month lights-off
factory account quoted in §3.2



### 9.4 Supporting evidence cited in the analysis

- **DORA**, seven AI capabilities incl. platform engineering, updated 2025-11-25 — [https://dora.dev/](https://dora.dev/)
(⚠️ `dora.dev/research/2026/roi-report/` returns 404 — see `[99-source-hygiene.md](./99-source-hygiene.md)` §4)
- **Gloaguen, Mündler, Müller, Raychev, Vechev (ETH Zürich)** — the context-file study behind Factor `III`:
*repository overviews are not helpful; instructions are well followed*, at 20%+ added cost.
⚠️ **Two briefs give different IDs — arXiv:2602.11988 vs arXiv:2604.21090. Confirm before either
number enters prose.** This finding is load-bearing.
- **Nielsen Norman Group**, *The UX Maturity Model* — the genre ancestor for our six stages —
[https://www.nngroup.com/articles/ux-maturity-model/](https://www.nngroup.com/articles/ux-maturity-model/)
- **AI Engineer World's Fair 2026 schedule**, 562 sessions — extracted locally and committed at
`[data/](./data)`. **Quotes traced to it are exact**; it is the only source in this folder with that status.



### 9.5 Internal documents this addendum depends on


| Document                                                                                                              | What it supplies                                                    |
| --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `[../../elements.md](../../archive/elements.md)`                                                                              | The Grid, the three rules, the self-grade, the org bridge           |
| `[../../AI-Native Organizational Maturity Framework.md](../../maturity/AI-Native-Organizational-Maturity-Framework.md)`  | 4 dimensions × 6 stages × 3 eras; the innovation-vs-FOMO diagnostic |
| `[../03-jtbd.md](../03-jtbd.md)`                                                                                      | `J1`–`J12`, the convergence line, the scorecard                     |
| `[../01-concepts.md](../01-concepts.md)` §3.17                                                                        | The definition of `primitive`                                       |
| `[../02-component-matrix.md](../02-component-matrix.md)`                                                              | Components × systems, the `●◐○` notation                            |
| `[../systems/kd-built-frameworks/07-transfer-manifest.md](../systems/kd-built-frameworks/07-transfer-manifest.md)` §4 | The 18-row rubric's lineage and the three features to take          |
| `[02-harness-taxonomies.md](./02-harness-taxonomies.md)`                                                                | The taxonomies this expands, and the §5 rows this corrects          |
| `[05-harness-factors.md](./05-harness-factors.md)`                                                                      | The fourteen factors                                                |
| `[99-source-hygiene.md](./99-source-hygiene.md)`                                                                        | The standing caveat on quotation, and the fabrication register      |


---

*Companion:* `[02-harness-taxonomies.md](./02-harness-taxonomies.md)` *— the taxonomies this expands ·*
`[05-harness-factors.md](./05-harness-factors.md)` *— the fourteen ·*
`[04-primitives-ontology-platform.md](./04-primitives-ontology-platform.md)` *— why primitives are the unit ·*
`[../../elements.md](../../archive/elements.md)` *— the Grid ·*
`[99-source-hygiene.md](./99-source-hygiene.md)` *— the standing caveats*