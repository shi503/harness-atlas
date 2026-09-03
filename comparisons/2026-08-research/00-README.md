---
title: "August 2026 research — the landscape, re-checked"
tier: reference
project: loomwarp
created: "2026-08-25"
status: DRAFT
owner: KD
---

# August 2026 research

**What this is.** A re-check of the landscape claims in [`../`](..) against the 2026 practitioner
community, conducted 2026-08-25. It exists because the comparison corpus was compiled on 2026-08-11
and set a **2026-12-01** re-check date for two contested claims. Two weeks later, five claims were
already wrong.

**What is new here.** The corpus's original pass read vendor documentation. This one adds a
**countable primary source** — the full 562-session schedule of the AI Engineer World's Fair 2026,
extracted and [committed](./data) — so vocabulary claims are reproducible with a `grep` rather than
resting on an author's reading.

---

## Reading order

| # | Document | What it settles |
|---|---|---|
| 01 | [`01-worldsfair-2026-vocabulary.md`](./01-worldsfair-2026-vocabulary.md) | **Start here.** What the field actually calls things, counted |
| 02 | [`02-harness-taxonomies.md`](./02-harness-taxonomies.md) | Every published list of harness functions, and the three slots absent from all of them |
| 03 | [`03-agentos-harness-multiplayer.md`](./03-agentos-harness-multiplayer.md) | Current definitions of the three terms our positioning depends on |
| 04 | [`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md) | **Primitives are the unit of harness architecture.** Ontology's durable half is the same idea in other words; platform is a delivery mechanism |
| 05 | [`05-harness-factors.md`](./05-harness-factors.md) | **The map.** Fourteen factors, in the 12-factor form, rendered both by team scale and by maturity stage |
| 05 | [`05-standards-layer.md`](./05-standards-layer.md) | AAIF, MCP, AGENTS.md, A2A, memory interop — and five corrections |
| 06 | [`06-frameworks-addendum.md`](./06-frameworks-addendum.md) | **Every framework, row by row.** What each pillar, level, component and primitive represents — plus three corrections forced by reading the primary sources |
| 07 | [`07-verified-inventories.md`](./07-verified-inventories.md) | **The object lists, read at source.** The eight configuration mechanisms (arXiv:2602.14690v5) · Gas City's six primitives and the machinery beneath them · the six-questions binding · Meng confirmed. **Plus the two fabrications this corpus produced**, and the sourcing rule that caught them |
| 99 | [`99-source-hygiene.md`](./99-source-hygiene.md) | Failed fetches, unverified claims, and **two fabrications found circulating** |
| — | [`data/`](./data) | The corpus, and how to query it |

---

## 1. What we got wrong

Stated first, because a re-check that leads with what it confirmed is marketing.

| # | Our claim | Reality |
|---|---|---|
| 1 | The corpus is titled *"the **agentOS** and harness landscape"* and builds a four-sense taxonomy | **Zero uses across 562 sessions.** Six senses now, not four — and **the sense we claimed is misattributed**: neither SageOx nor Indigo uses the term |
| 2 | *"MCP v2 … on the roadmap"* | **No such thing.** MCP is date-versioned; the current spec (2026-07-28) is a stateless-core rewrite |
| 3 | AAIF "170+ members", 3 projects, A2A "on the roadmap" | **247 members, 5 projects**, A2A landed and joined 2026-08-19 |
| 4 | *"No MCP for memory exists"* | A **W3C Community Group** launched 2026-06-03 and an IETF submission concluded 2026-07-29. Early, unadopted — but no longer a vacuum |
| 5 | `F-5`: the standards tier is the one row where LoomWarp stands alone | Already falsified in-corpus by [`../systems/kd-built-frameworks/`](../systems/kd-built-frameworks) — it is inherited prior art |

---

## 2. What changed the framework

### 2.1 The model sits outside the harness

`Agent = Model + Harness` is the field's canonical formula, and *harness* now has a Wikipedia article,
survey-literature entry, a shipped **Microsoft API namespace**, and an AAIF definition dated six days
before this research. `01-problem.md` §2 row 1 derives Substrate as *"a model, **and** a harness"* —
which the field reads as a category error, and which already contradicted `01-concepts.md` §3.1.

**This settles KD's open question about where the model belongs:** bedrock, below Ground, drawn on the
stack diagram it is currently missing from.

### 2.2 The hierarchy did not emerge — and that is the finding

KD asked to let a hierarchy emerge from the research rather than forcing one. It did not, for a
reason worth recording: **AAIF's taxonomy file leaves `broaderTerm` deliberately unfilled** and marks
*"Autonomy level"* as *"term accepted; definition under working group discussion."* The field's own
standards body has agreed the vocabulary and not the containment.

Meanwhile the most-adopted artifact in the space is a **flat list of twelve** — 12-Factor Agents, 25.5k
stars — whose author, Dex Horthy, then keynoted *"Harness Engineering is not Enough."* **The canonical
form is a flat twelve; its author has publicly concluded that form is insufficient; nobody has
published the successor.**

### 2.3 Everyone who published structure published a *grid*, not a tree

> **Revised 2026-08-26.** The counts below were recorded from secondary summaries; three were checked
> against primary sources and two were wrong. See [`06-frameworks-addendum.md`](./06-frameworks-addendum.md)
> §2 and §6.

Factory.ai **8–9 pillars × 5 levels** *(disputed in Factory's own material)* · Microsoft **5 pillars ×
5 CMM levels** · Debois 3 pillars × 4 stages × 4 CDLC phases · Böckeler 2 × 2 × 3 · Meng's Completeness
Matrix 23 × 6 · **LoomWarp 7 functions × 6 stages**. Structurally the same artifact, six different row
sets. **Hassan et al. was removed — it is a research roadmap, not an autonomy ladder.**

**So the Grid is the field's dominant form, not an outlier — and its governing rule remains unmatched.**
*The fabric tears at its thinnest warp section.* Factory gates on **80% of criteria per level** but still
resolves to one overall level and names no governing pillar; Microsoft states no combination rule;
Debois grades 48 cells with none. **Nobody names the cell that decides, and nobody publishes a rule that
a single weak pillar caps the whole system.** That is the methodological contribution, and it is a
narrower claim than the one first recorded here.

### 2.4 Primitives are the unit — ontology and platform are not umbrellas above them

**`primitive` occurs 33 times**, two talks carry it in the title, and every system in the corpus
defines a set: Gas City's *formula · agent · bead · order · pack*, QM's *scope*, Claude Code's seven,
FRACTAL's *BLUEPRINT · workstream · HANDOFF*. **A system's primitive set is its architecture** — which
makes it the honest answer to *"what does harness architecture look like."*

The defining property is that **there is one of each**. A team with two ways to declare a unit of work
has no work primitive, it has two conventions and a coin flip — and where a human would pick one and
remember, an agent picks differently each session or invents a fourth.

**Ontology is not a competitor to that idea; it is the same idea in analytics vocabulary.** Its durable
half — Palantir's *"kinetic elements"*, Ken Huang's *"permitted verbs"*, Coyle's *"typed entities that
tools must respect"* — is **a primitive set with bounded verbs**. What the evidence rejects is
ontology-as-*description*: the ETH study finds repository overviews unhelpful while instructions are
well followed, and a companion study found Markdown ties JSON and S-expressions. **Say `primitive`; the
BI baggage is not worth carrying.**

**Platform stays a delivery mechanism.** DORA lists it as one of seven peer capabilities defined by
distribution — *"the automated, secure pathways that allow AI's benefits to scale."* It is `J10`, not a
layer. Detail: [`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md).

### 2.5 Three job-slots are absent from every published taxonomy

**Routing · cost accounting · distribution.** Two independent methods — the term census and the
taxonomy cross-reference — reached the same gap.

**Cost is the sharpest, because the two axes disagree.** Practitioners are saturated with it (`cost` 70,
`budget` 23, `spend` 22, `throughput` 21, plus an entire `Tokenmaxxing` track) and **every structural
model omits it.** A high-attention operational concern with no home in any model of what a harness is —
a far stronger claim than "we thought of it first."

### 2.6 Our provenance claim has a name now, and it survives in its narrowed form

Vinoth Govindarajan (OpenAI): *"A model proposes, the harness commits, and **the receipt proves it**"* —
a **run receipt** covering *"what woke it up, which state did it inherit, what authority did it use,
what executed, and what evidence survived."* That is `F3`'s Briefing plus `F7`'s Verdict, stated better
than we state it.

The corpus check: `trace` 65 · `audit` 39 · `evidence` 22 · **`provenance` 9 · `receipt` 4**. The field
is fully engaged with *observing runs*; the **join** stays scarce. **The narrowed claim from the
previous pass survives this test. The broad one would not have** — which is the argument for having
narrowed it.

### 2.7 Evidence that cuts against `F3`

The ETH Zürich AGENTS.md study finds context files do **not** generally improve task success while
adding **20%+ inference cost**, and that **repository overviews specifically are unhelpful** while
*instructions* are well followed. A companion study found **Markdown ties JSON and S-expressions** —
formality buys error detectability, not performance.

`F3 Context` assumes layered, owned, versioned knowledge is better. The best available evidence says
layered **overviews** are worse than nothing, while **constraints** work. `F3` should be re-specified
around scoping, ownership and enforceable constraint — converging with the `Scope` candidate and with
Anthropic's own large-codebase guidance.

### 2.8 Ceremonies were abandoned, not under-served

`standup` 0 · `ceremon` 0 · `peer review` 0 · `ritual` 1, against `code review` **29**. One talk is
titled *"Agents Don't Do Standups."* This bears on `OPEN-8`, and the corpus leans toward *verdict*
rather than *gap*, with review the survivor.

---

## 3. Positions we should engage rather than omit

A corpus citing only supporters of its own category is marketing.

- **Dex Horthy** (HumanLayer), *"Harness Engineering is not Enough: Why Software Factories Fail"* —
  Main Stage keynote. Models are rewarded for passing tests, not for preserving design quality;
  verifying architectural quality takes months, so the reward signal cannot propagate. **The strongest
  published attack on this whole category.**
- **Kyle Mistele** (HumanLayer) — ran a lights-off factory for six months: *"bad code compounded, and
  agents created problems that agents couldn't solve — until we had to throw it all away."*
- **Ryan Cooke** (WorkOS), *"No, That's Not a Software Factory"* — the factory is *"the way work gets
  planned, scoped, and verified, and the conventions and judgment calls that define your engineering
  culture."* **This is LoomWarp's position, published by someone else, six weeks earlier.**

---

## 4. Method, and its limits

Two rounds of delegated research plus direct verification of the load-bearing claims. The schedule PDF
was downloaded and extracted locally because summarising fetch tools cannot decode it.

**Where verification changed an answer.** A delegated agent reported that the `Harness Engineering`,
`Context Engineering` and `Agentic Engineering` tracks did not exist. Its supervisor overturned that
against the PDF; it was then confirmed a third time directly against ai.engineer. **All three are
tracks.** Single-source research was not safe here, and the corrections are logged in
[`99`](./99-source-hygiene.md) §3.

**Frequency is a proxy for attention, not importance.** A term the flagship venue never uses is evidence
the field has not converged on it — not evidence the underlying concern is unreal. `J12 account` is
exactly this distinction: heavily discussed, structurally unmodelled.

> ### ⚠️ And this distinction was violated once, in this folder
>
> The first version of [`04`](./04-primitives-ontology-platform.md) tested **whether the industry uses
> the words "ontology" and "shared primitives"**, found low usage, and concluded neither was a real
> architectural layer. **That is the wrong question.** Term frequency measures what a field discusses,
> not what a system needs — and for a *frontier* harness it is exactly backwards, because the
> capabilities that matter most are routinely the ones nobody has named yet.
>
> The failure was concrete: `shared primitives` really does score **0**, but **`primitive` alone occurs
> 33 times**, two talks carry it in the title, and every system in the comparison corpus defines a
> primitive set. A string match against one phrasing stood as an architectural verdict.
>
> **The rule:** a zero in the census means *"the field has not settled on this word."* It never means
> *"the capability does not matter."* To test necessity, test the **mechanism** — as
> [`04`](./04-primitives-ontology-platform.md) §2.1 does with the ETH context-file study — not the
> vocabulary.

**What this pass did not establish** is in [`99`](./99-source-hygiene.md): the shared-primitives and
internal-developer-platform thread never returned; the web-search budget was exhausted partway; and one
arXiv ID is contested between briefs and must be confirmed before it is cited.

---

## 5. Re-check schedule

The previous pass set 2026-12-01 and was overtaken in two weeks. Shortening it, and naming the
falsifier for each:

| What | Dies if | By |
|---|---|---|
| **The provenance claim** | Anyone ships a run receipt joined to outcomes; the W3C memory CG produces an adopted profile | **2026-10-01** |
| **The standards layer** | Any AAIF roadmap item lands; the 2026-08-22 MCP roadmap is read | **2026-10-01** |
| **The vocabulary census** | AI Engineer Code Summit (Nov 10–12) or NYC (Oct 12–14) shifts the track names | **After Code Summit** |
| **`agentOS` is dead** | The term reappears in practitioner speech rather than vendor marketing | Opportunistically |
| **Grid novelty** | Anyone publishes a capability grid with a governing-minimum rule | **2026-12-01** |

---

*Companion: [`../00-README.md`](../00-README.md) — the landscape · [`../../../specs/v0/`](../../archive/v0) — what this feeds*
