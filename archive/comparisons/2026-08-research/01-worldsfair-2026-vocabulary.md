---
title: "What the 2026 practitioner community actually calls things"
tier: reference
project: loomwarp
created: "2026-08-25"
status: DRAFT
owner: KD
---

# The 2026 vocabulary census

**What this is.** A term-frequency census of the AI Engineer World's Fair 2026 — 562 sessions, the
largest technical conference for AI engineers — plus the verbatim talk titles and abstracts that carry
definitions. Corpus: [`data/aie-worldsfair-2026-schedule.md`](./data/aie-worldsfair-2026-schedule.md).

**Why it exists.** LoomWarp's documents assert what the industry calls things. Until this pass those
assertions rested on the author's reading rather than on a countable source, and two of them turned
out to be wrong. Every claim below is reproducible with one `grep`.

**How to read the numbers.** Case-insensitive **occurrences** over the committed corpus, not matching
lines.

> ### ⚠️ What this census can and cannot answer
>
> **Frequency measures what a field discusses. It does not measure what a system needs.** This census
> is strong evidence for **what to call a thing** and near-worthless for **what to build** — and for a
> *frontier* harness the distinction is decisive, because the capabilities that matter most are
> routinely the ones nobody has named yet.
>
> **This has already cost one wrong conclusion.** An earlier draft of
> [`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md) reported
> **`shared primitives` = 0** and concluded that primitives were not a real architectural layer. The
> two-word phrase is genuinely absent — but **`primitive` alone occurs 33 times**, two talks carry it
> in the title, and every system in the comparison corpus defines a primitive set. The null result was
> an artifact of matching one phrasing, and it was allowed to stand as a verdict.
>
> **The rule that follows:** a zero here means *"the field has not settled on this word."* It never
> means *"the capability does not matter."* To ask whether something is necessary, test the mechanism
> — as [`04`](./04-primitives-ontology-platform.md) does with the ETH context-file study — not the
> vocabulary.

**Every number in §1 is mechanically checked.** `node scripts/check-research-counts.mjs` re-measures
each claim against the corpus; the table below is the source of truth and the script has no second
list. It exists because the first draft of this document got four counts wrong by carrying them from
research briefs instead of measuring, and produced the rest with a command whose meaning differs
between BSD and GNU grep.

---

## 1. The census

```bash
grep -io "<term>" data/aie-worldsfair-2026-schedule.md | wc -l
```

| Term | Hits | Reading |
|---|---:|---|
| `eval` | 263 | The most-discussed concern in the field |
| `harness` | 113 | **The year's core term.** Also a track and a keynote track |
| `memory` | 121 | Established; also a track |
| `cost` | 70 | Heavy practitioner attention |
| `trace` | 65 | Observability is mature |
| `audit` | 39 | " |
| `primitive` | 33 | **A first-class concept.** Two talks put it in the title |
| `isolat` | 38 | Scope/sandboxing is core |
| `code review` | 29 | Named "the tightest constraint in the system" |
| `permission` | 27 | Core |
| `budget` · `spend` · `throughput` | 23 · 22 · 21 | Cost is a live operational concern |
| `boundar` | 20 | Core |
| `escalat` | 17 | Recovery vocabulary exists |
| `scope` family | 21 | Core |
| `recover` · `retry` · `rollback` | 14 · 10 · 5 | " |
| `attribut` | 14 | |
| `tokenmax` | 13 | Has its own track |
| `reusable` | 15 | The composability half of the primitive idea |
| `consistent` | 13 | " |
| `context graph` | 10 | **Outranks `ontolog`** |
| `composab` | 9 | " |
| `golden path` | 6 | The "one sanctioned way" idea, from platform engineering |
| `building block` | 6 | " |
| `standardi` | 5 | " |
| `atomic` | 4 | " |
| `provenance` | 9 | **Scarce** |
| `software factory` | 7 | Contested; has a track |
| `ontolog` | 6 | 2 sessions, both in the sponsored Graphs track |
| `multiplayer` | 6 | Narrow, vendor-associated |
| `receipt` | 4 | **Scarce** |
| `self-heal` | 3 | |
| `ritual` · `retro` | 1 · 1 | |
| `spec graph` | 1 | One abstract |
| `context layer` | 13 | **The category name — and it outranks `provenance` (9), which this table calls Scarce.** Added 2026-08-27; see §2.4 |
| `knowledge graph` | 8 | The store behind a context layer. Uncounted until 2026-08-27 |
| `company brain` | 4 | The org-scale ambition, and the security problem — see §3 |
| `shared context` | 4 | The team half, named directly |
| `semantic layer` | 3 | The analytics lineage of the same idea; vendors are leaving the term |
| `lineage` | 3 | Provenance in data-engineering vocabulary |
| `access control` · `blast radius` | 3 · 3 | **Context as a security surface.** Both from the company-brain argument |
| `context repo` | 1 | *"versioned, testable, portable"* — one abstract |
| **`team context`** | **0** | **The field has no word for the half every system needs.** Four peers build the individual/team boundary as a primitive and none names it |
| **`agentos`** | **0** | |
| **`agent operating system`** | **0** | |
| **`shared primitives`** | **0** | |
| **`domain model`** | **0** | |
| **`standup`** · **`ceremon`** · **`peer review`** | **0** · **0** · **0** | |

---

## 2. The three findings that change our documents

### 2.1 `agentOS` is not practitioner vocabulary

Zero occurrences across 562 sessions, and zero for `agent ops`, `AIOps` and `LLMOps` — **the community
did not go the XOps route.** Independently confirmed against
[ai.engineer/worldsfair/2026](https://www.ai.engineer/worldsfair/2026) (accessed 2026-08-25): the term
appears nowhere in the 32-track list.

This matters because [`../00-README.md`](../00-README.md) is titled *"The agentOS and harness
landscape"* and builds a four-sense taxonomy on the term. See
[`03-agentos-harness-multiplayer.md`](./03-agentos-harness-multiplayer.md) for the six senses and the
misattribution.

### 2.2 The tracks are the field's own category list

The 32 tracks are the highest-signal data in the corpus, because a track name is the organisers'
claim about what the categories *are*. Those bearing on how teams run agents:

| Track | Sessions |
|---|---:|
| `AI-Native Enterprises` | 23 |
| **`Software Factories`** — also a Main Stage keynote track | 22 |
| `Autoresearch` — also a keynote track | 16 |
| **`Harness Engineering`** — also a keynote track | 13 |
| `Agentic Engineering` | 12 |
| `Claws & Personal Agents` · `Context Engineering` · `Memory & Continual Learning` · `Sandbox & Platform Engineering` · `Graphs` | 11 each |
| `Evals` · `AI Architects: Show my Workflow` | 10 each |
| `AI Architects: Tokenmaxxing` | 9 |
| `Forward Deployed Engineering` | 9 |
| `AI Architects: AI Factories` | 7 |

Note what has a track and what does not. **Harness engineering, context engineering, evals, memory and
platform each have one. Ontology does not — it sits inside `Graphs`, which is Neo4j-sponsored and of
whose 11 sessions exactly one concerns software engineering.**

### 2.3 Ceremonies were abandoned, not under-served

`standup` 0 · `ceremon` 0 · `peer review` 0 · `ritual` 1 · `retro` 1 — against `code review` **29**,
which one Software Factories abstract calls *"the tightest constraint in the system."* One talk is
titled **"Agents Don't Do Standups: Building the Post-Engineer Engineering Org."**

Two readings, and the corpus does not settle it:

1. **Gap** — ceremonies still matter, nobody adapted them for agents, and this is open ground.
2. **Verdict** — ceremonies were human coordination overhead that agents dissolve, and the one that
   survives is already handled under its own name.

The corpus leans to (2), with review as the exception. This bears directly on `OPEN-8`.

---


### 2.4 The census counted the differentiator and missed the category

**`context layer` occurs 13 times. `provenance` occurs 9, and §1 marks it "Scarce."** Both were in the
committed corpus on 2026-08-25. Only one was counted.

Nine other terms in the same family went uncounted with it — `knowledge graph`, `company brain`,
`shared context`, `semantic layer`, `lineage`, `access control`, `blast radius`, `context repo`, and
`team context` at zero. All ten were added on 2026-08-27 and are now re-measured by
`scripts/check-research-counts.mjs` on every run.

**The cause is a method defect, not an oversight.** This census was built by testing terms the corpus
already used — so it could **confirm or refute existing vocabulary, and could not discover any.** It was
structurally incapable of finding a word we had not already written down, which is exactly the case
where a census is most valuable.

> **The method fix:** a census needs a **discovery pass** over the corpus's own high-frequency n-grams,
> not only a **confirmation pass** over the author's term list. Run the discovery pass first; let it
> propose terms; then confirm.

**This is the second instance of the shape**, which is what makes it a defect rather than an accident.
§1's own warning box already records the first: `shared primitives` = 0, with the caveat that *"a zero
here means the field has not settled on this word. It never means the capability does not matter."*
That caveat is now doing double duty — it covers `team context` = 0 as well, and it does so against the
corpus's own largest recorded gap. [`../01-concepts.md`](../01-concepts.md) §3.6 calls the
individual/team boundary *"the largest single gap this analysis found."* **The field has no word for the
half of it that matters.**

**What it does not change.** The `provenance` = 9 reading stands, and the cost finding in
[`02-harness-taxonomies.md`](./02-harness-taxonomies.md) §3 stands. What changes is a claim about
*novelty of the category*: the context layer is not an unnamed space we are entering first. It is a
named, attested category with a Google-backed schema (OKF v0.2) and at least two production talks. **Our
claim has to be about the contract and the altitude, not about the territory being empty.**


## 3. Verbatim definitions worth quoting

**The harness formula** — Vivek Trivedy, LangChain, *"The Anatomy of an Agent Harness"*, 2026-03-10:

> *"A harness is every piece of code, configuration, and execution logic that isn't the model itself."*
> **`Agent = Model + Harness`**

**The fullest definition** — Lilian Weng, *"Harness Engineering for Self-Improvement"*, Lil'Log,
2026-07-04:

> *"A **harness** is the system surrounding a base model that orchestrates execution and decides how
> the model thinks and plans, calls tools and acts, perceives and manages context, stores artifacts,
> and evaluates results."*

Weng nests **loop engineering, context engineering and evals inside harness engineering** — which is
the altitude problem in [`02-harness-taxonomies.md`](./02-harness-taxonomies.md) §4.

**The receipt** — Vinoth Govindarajan, OpenAI, *"Your Agent Didn't Fail. Your Harness Did"*:

> *"A model proposes, the harness commits, and **the receipt proves it**."* — with a **run receipt**
> audit: *"what woke it up, which state did it inherit, what authority did it use, what executed, and
> what evidence survived."*

That is `F3`'s Briefing plus `F7`'s Verdict, stated more crisply than we state it. See
[`00-README.md`](./00-README.md) §3 for what it does and does not do to our claim.

**Multiplayer** — Arjun Singh, Superconductor:

> *"For a solo developer, coding agents are a superpower. **For a team, they surface new kinds of
> bottlenecks: coordination, visibility, review, and shared context.**… with no work or context
> trapped on any one developer's machine."*

**The factory, contested** — Ryan Cooke, WorkOS, *"No, That's Not a Software Factory"*: a sandbox is
not a factory; what matters is *"the way work gets planned, scoped, and verified, and the conventions
and judgment calls that define your engineering culture."* **This is LoomWarp's position, published by
someone else.**

**The strongest attack on the category** — Dex Horthy, HumanLayer, Main Stage keynote *"Harness
Engineering is not Enough: Why Software Factories Fail."* And his colleague Kyle Mistele, *"Loop
Engineering from first principles"*:

> *"We ran our own [lights-off software factory] for six months, and we have the scars to prove it —
> **bad code compounded, and agents created problems that agents couldn't solve** — until we had to
> throw it all away. But this is a survivor's guide, not an obituary."*

**Agent Enablement as an org function** — Patrick Debois (who coined "DevOps"), now at Tessl:

> *"What's showing up is **a new function: a team that enables other teams to get real leverage out of
> their agents.**… **Enablement** … **Platform** … **Governance**."*

---

**The context layer, named as infrastructure** — Prukalpa Sankar, Founder & Co-CEO, Atlan.
*"WTF Is the Context Layer? The Missing Infrastructure for Production Agents"*, `Context Engineering`
Track 8, p. 61 of the committed schedule:

> *"…most agents still can't answer a simple business question correctly. You ship a demo that works.
> You deploy it. The business abandons it in a month. **The missing variable is context: the business
> definitions, procedural knowledge, and operational norms that make a human expert valuable.** …
> the architecture of a context layer: **how context repos work (versioned, testable, portable)**, how
> simulation environments catch failures before deployment, **how agent traces compound back into
> shared context** … why your context needs to be open (MCP, Iceberg, deploy to any framework) — and
> what happens when it isn't."*

Drawn from *"hundreds of production deployments."* **Versioned, testable, portable** is our `F3`
Fabric requirement stated by someone else; **traces compounding back into shared context** is `F8`
Learning's promotion loop.

**The company brain, and why it is a security problem** — Tanmai Gopal, CEO/cofounder, PromptQL.
`Claws & Personal Agents` Track 1, p. 34. Deployed at Fortune 100 banks and a 70-person startup:

> *"Everyone wants a shared 'company brain' … But it's nearly impossible to build one, because **the
> moment AI scrapes everyone's data into one place, a single wrong answer to the wrong person is a
> breach.** … Ergo, company brain projects can only ever ship to the few people who already had access
> to everything, or stay hobbled with strictly public information (eg: River at Shopify)."*

His blueprint names four problems: **permissions for shared data and tools · a shared context layer
with its own access control · scoping the blast radius of wrong context · auto-learning without
auto-leaking.**

**This is the framing this corpus did not have.** Every prior treatment of the individual/team boundary
here — [`../01-concepts.md`](../01-concepts.md) §3.6, `generic-cerebro`'s routing doctrine, `J2` — frames
it as **ownership and routing**. Gopal frames it as **access control**, and only one of those framings
has a breach as its failure mode. Adopted as §5 of
[`../../../specs/v0/09-context-layer.md`](../../v0/09-context-layer.md). Naming the River-at-Shopify
failure publicly is rare and worth citing.


## 4. New vocabulary worth knowing

| Term | Source | Meaning |
|---|---|---|
| **Loop engineering** | swyx, Osmani, Mistele | The outer loop as the engineering surface. *"The agent runs the inner execution loop; I set the direction"* |
| **Voss's loop taxonomy** ‡ | Laurie Voss, *"What the Hell Is a Loop, Anyway?"*, O'Reilly Radar 2026-07-29; and Dhinakaran & Voss, Arize, 2026-07 | execution → task (Ralph) → product (factory) → system (autoresearch) → **oversight**. Strictly nested rings, each with an exit condition; the outermost has **none**, which is the argument. Voss reports the outermost ring was labelled `"????"` in swyx's diagram before he named it |
| **Three developer loops** | Gene Kim & Steve Yegge, *Vibe Coding*; IT Revolution 2025-10-20 | inner (sec–min) · middle (hrs–days) · outer (wks–months), each running **prevent → detect → correct**. A **timescale** axis, orthogonal to Voss's nesting axis — two independent models that do not compete |
| **Dark / Lit factory** | Addy Osmani, 2026-07-20 | Code shipping without human review, versus *"the same pipeline with the lights left on where judgment lives"* |
| **Comprehension debt** | Osmani | *"the widening gap between how much code exists and how much any human still understands"* |
| **Back pressure** | Osmani | *"you can only hand a loop as much autonomy as you can cheaply and reliably verify"* |
| **Claw** | OpenClaw lineage; Sam Bhagwat, Mastra | A harness in a box, listening to events, with channels and a heartbeat, running AFK. *"Steinberger's law: every harness will expand until it becomes a Claw"* |
| **Run receipt** | Govindarajan, OpenAI | Above |
| **Agent readiness** | multiple | *"structured codebases, deterministic APIs, per-agent scoped credentials, atomic and idempotent operations, structured execution traces, and explicit thresholds for when the agent stops"* |
| **Tokenmaxxing** | own track | Cost as a first-class engineering concern |
| **Velocity sickness** | Matt Dailey, Ref | *"What Happens When Your Whole Team Gets 10x Faster"* |


> **‡ Corrected 2026-08-27 — this row previously read "The five loops."** There is no published
> framework by that name. Voss writes *"I counted at least **four** distinct architectures hiding
> behind that one word,"* names four, and then **proposes oversight as a fifth of his own**. "The
> five loops" is a community compression, not a proper noun, and citing it as one is how a
> fabrication starts — see [`99-source-hygiene.md`](./99-source-hygiene.md) for the two already
> circulating in this space. **Cite it as *Voss's loop taxonomy* or *the loopcraft stack*.**
>
> Two further sourcing limits, recorded rather than smoothed over:
>
> - **swyx's *"Loopcraft: The Art of Stacking Loops"*** (Latent.Space, 2026-06-12) is the diagram
>   lineage and **could not be retrieved** — paywalled. The `"????"` ring is *Voss's description of
>   swyx's diagram*, not a direct read of it. Claims that swyx's own stack contains a "token loop"
>   trace only to AI-generated aggregator pages and **must not be cited**.
> - **Osmani's *"Loop Engineering"*** (2026-06-07) is **five *primitives*, not five loops** —
>   automations, worktrees, skills, plugins/connectors, sub-agents, plus state/memory. It is widely
>   miscited as "five loops." Do not repeat that.

---

*Companion: [`02-harness-taxonomies.md`](./02-harness-taxonomies.md) — the published function lists ·
[`00-README.md`](./00-README.md) — what all of this changes*
