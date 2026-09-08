---
title: "Primitives, ontology and platform — what a frontier harness needs"
tier: reference
project: loomwarp
created: "2026-08-25"
updated: "2026-08-26"
status: DRAFT
owner: KD
---

# What a frontier harness needs

**What this is.** Three candidate architectural layers, tested against the question *does a
cutting-edge harness need this?* — not against the question *does the industry say this word?*

> ### ⚠️ This document was rewritten 2026-08-26, and the reason matters
>
> The first version asked the wrong question. It tested **whether the industry uses the terms
> "ontology" and "shared primitives"**, found low usage, and concluded neither was a real layer.
>
> **Term frequency measures what a field discusses, not what a system needs** — and for a *frontier*
> harness that is exactly backwards, because the capabilities that matter most are routinely the ones
> nobody has named yet.
>
> The error was also concrete. The document reported **`shared primitives` = 0** across the
> 562-session corpus. The two-word phrase is genuinely absent — but **`primitive` alone occurs 33
> times**, two talks carry it in the title, and *every system in the comparison corpus defines a
> primitive set*. A string match against one phrasing was allowed to stand as an architectural verdict.
>
> **What changed in the rewrite:** primitives are promoted from *rejected* to *the central finding*.
> The ontology analysis is re-cut — its durable half turns out to *be* the primitive idea in other
> vocabulary. Platform's verdict stands, because that one was always argued on mechanism. And the
> naming analysis is demoted to §4, where it answers the question it can actually answer: what to call
> things.

---

## 1. Primitives — core, critical, and the thing the corpus was already reasoning in

### 1.1 The definition

> A **primitive** is a minimal, named, composable unit that the harness makes the **single sanctioned
> way** to express something. The defining property is not what it does — it is that **there is one of
> it**.

Full treatment, with the crosswalk of every system's set:
[`../01-concepts.md`](../01-concepts.md) §3.17.

### 1.2 Why one way, specifically

A human offered three ways to run tests picks one and remembers. **An agent offered three ways picks
differently each session, or invents a fourth.** There is no accumulated preference to fall back on,
and every extra sanctioned path multiplies against every session.

So the harness's job is not to be flexible. **It is to make the right way the only way**, so the agent
reaches for the team's established practice — its skills, its engineering principles, its definition
of done — instead of generating a plausible new one.

This is the mechanism behind the clearest statement of it in the corpus, Andrew Orobator (Reddit):

> *"If you can express correctness as a binary — does it compile, do the tests pass, does the lint
> check clear — you can remove the human from that loop entirely. The AI submits. The gate checks. If
> red, it adjusts and resubmits. **Spin at the gate until green.**"*

**That works only because there is exactly one gate.** Two lint configurations and the binary is no
longer binary. The primitive is what makes the loop closable.

### 1.3 The evidence it is architectural, not decorative

| Signal | Evidence |
|---|---|
| **Corpus frequency** | `primitive` **33** · `reusable` 15 · `consistent` 13 · `composab` 9 · `golden path` 6 · `building block` 6 |
| **Talks titled on it** | *"The New Primitives: Building AI-Native Software"* (Kramer, Daily) · *"Spin at the Gate Until Green: The Engineering Primitives Behind Self-Driving Codebases"* (Orobator, Reddit) |
| **Named as the unit of architecture** | *"composing the full set of Oracle primitives into one harness"* · *"which primitives matter, where the human checkpoints belong"* · *"the three primitives every production agent needs"* · *"search is becoming the most critical primitive in AI infrastructure"* |
| **Named as a maturity direction** | *"moving from flexible, atomic primitives to **Composite Workflows** that encapsulate business logic"* — primitives compose upward as a system matures |
| **Every peer defines a set** | Gas City *"declarative composable primitives"* · QM's teardown has a `## The primitives` section · so does FRACTAL's · Claude Code ships seven |

**And our own corpus was already built on it.** [`../02-component-matrix.md`](../../../components/MATRIX.md)
defines `●` as *"owns it as a named primitive"* and applies it across 18 components × 9 systems. The
notation was load-bearing and the term undefined — which is how a search for one phrasing could return
zero and read as an absence.

### 1.4 What a primitive set looks like when it is good

Two patterns hold across every system in the corpus, and both are testable:

**It is small — five to seven.** Claude Code: skill, subagent, hook, plugin, MCP server, settings,
agent team. Gas City: formula, agent, bead, order, pack, Event Stream. QM: scope, posture, adapter. **A
primitive set that grows without bound is a feature list wearing the word**, because the whole value is
that a reader can hold the set in their head.

**It forces choices rather than accommodating them.** Gas City makes you pick *beads or Linear* for
work tracking. QM makes every scope — user or room — carry the same bundle: memory, files, keychain
view, permissions, crons, sandbox. **Accommodation is how you get two ways to do something**, which is
the failure the primitive exists to prevent.

### 1.5 The open question this leaves us

**LoomWarp's primitive set is unanswered.** We have artifacts — `registry/repositories.yaml`,
BLUEPRINT, workstream, HANDOFF, `events.jsonl`, the standards tier — but no stated set, no claim that
each is the single sanctioned way, and no test that a second one has not appeared. That is a finding,
not an oversight: **you cannot claim "one way to do each thing" until you can name the things.**

---

## 2. Ontology — the durable half is the primitive idea in other vocabulary

### 2.1 What the evidence actually rejects

The first version rejected ontology partly on usage. The usage argument is weak and now sits in §4.
**The mechanism argument is strong, and it survives intact**, because it tests whether the thing works
rather than whether people say it.

Gloaguen, Mündler, Müller, Raychev and Vechev (ETH Zürich),
[*Evaluating AGENTS.md*](https://arxiv.org/abs/2602.11988):

> *"providing context files does **not** generally improve task success rates, while increasing
> inference cost by over 20% on average… while **instructions** in the context files are well followed
> by coding agents, **repository overviews**, although popular and recommended by model providers,
> **are not helpful**."*

> ⚠️ A second brief gave `arXiv:2604.21090`. **Confirm the ID before external citation** —
> [`99-source-hygiene.md`](./99-source-hygiene.md) §2.

**A "repository overview" is the prose form of *give the agent a map of the domain*, and it measurably
fails.** Corroborating: [arXiv:2604.13108](https://arxiv.org/abs/2604.13108) found architecture context
cut navigation steps 33–44% with **no significant difference across four formats** — S-expression,
JSON, YAML and Markdown tied. **Formality bought error *detectability*, not performance.**

So what fails is **ontology-as-description**. What works is the imperative half.

### 2.2 What the evidence supports — and it is the same idea as §1

The strongest pro-ontology case in the corpus, Frank Coyle (UC Berkeley):

> *"the missing layer is an explicit ontology: a formal, shared map of the domain's concepts,
> relationships, and constraints… **typed entities and relationships that tools must respect**,
> **cardinality and domain restrictions that catch malformed tool calls before they execute**, and **a
> shared vocabulary that keeps coordinators and subagents talking about the same things**."*

Read the three clauses as mechanisms rather than as representation: **things tools must respect** ·
**restrictions that catch bad calls before they execute** · **one shared vocabulary**. That is
`J5 bound`, `J6 validate` and `J3 route` — and it is a **primitive set with bounded verbs**.

Palantir is the only vendor genuinely in this slot, and its own definition gives the game away: the
ontology carries *"semantic functions (objects, properties, links)"* **and** *"kinetic elements
(actions, functions, dynamic security)."* Ken Huang's version is blunter — entities plus *"the specific
actions (verbs) agents are **permitted** to execute upon them."*

**Verdict, reversed from the first draft.** Ontology is not a competing umbrella that loses to
primitives. **Its durable core *is* the primitive idea, expressed in business-intelligence vocabulary
and carrying that field's baggage.** What we should take is the *verb-bounding* — a primitive that
names its permitted actions is stronger than one that names only its shape.

**What the evidence does not support** is that this must be a graph, must be formal, or must not be
markdown. Every source arguing for the **representation** is vendor-authored or unreplicated; every
source arguing for the **enforcement** has evidence behind it. Tessl bet a company on the formal
version and now leads with *"Skills are the new code"* — prose markdown.

### 2.3 Two mechanisms worth taking

1. **The drift gate** — spec-versus-code divergence as a **blocking merge condition**. This is the
   enforcement half made operational, and it is what turns a primitive from a convention into a
   constraint.
2. **Ownership-path scoping** — context scoped to who owns the code. Converges with the `Scope`
   candidate and with Anthropic's own large-codebase guidance, which names the failure precisely —
   *"conventions drift, files go stale, and no one owns the root"* — and answers it with scoping and
   ownership rather than more documentation.

---

## 3. Platform — a delivery mechanism, and that verdict stands

This one was argued on mechanism from the start, so the reframe does not move it.

**DORA** — the most methodologically serious programme in the field — lists platform engineering as
**one of seven peer AI capabilities** (updated 2025-11-25), defined by distribution:

> **Platform engineering** — *"A platform provides the automated, secure pathways that allow AI's
> benefits to scale across the organization."*

The other six: AI-accessible internal data · a clear and communicated AI stance · healthy data
ecosystems · user-centric focus · version control · working in small batches.

**Debois** reaches the same place from the org chart — **Enablement · Platform · Governance** as three
pillars of *Agent Enablement*, where platform is *"agent tooling that runs like a real delivery
pipeline: fast, observable, cost-aware."* The World's Fair track `Sandbox & Platform Engineering` uses
the word for compute substrate and isolation.

**Verdict: platform is how the primitives reach a team, not a layer above them.** Peer in the org
chart, delivery model in substance. It is `J10 distribute`.

> **Note for `03-maturity.md`.** DORA frames *version control* as *"a critical safety net as AI
> accelerates the velocity of change"* and *working in small batches* as *"counteracting the risk of
> instability."* Both are ordinary engineering discipline relabelled as AI-readiness — the same move
> Factory.ai's Agent Readiness makes with build, test and docs. **A meaningful share of "AI readiness"
> is just delivery maturity**, and the rebuild should say so rather than implying everything is new.

---

## 4. What to *call* these things — the naming evidence, demoted

This section answers the only question frequency can answer.

| Term | Corpus | Reading |
|---|---:|---|
| `primitive` | **33** | Established. **Use it** |
| `context graph` | 10 | Rising; Gartner's forward-looking noun |
| `golden path` | 6 | Platform-engineering lineage for "one sanctioned way" |
| `ontolog` | 6 | 2 sessions, both in the sponsored `Graphs` track |
| `spec graph` | 1 | One abstract |
| `shared primitives` · `domain model` | 0 | Not phrases in this field |

**Vendors are leaving the word.** Cube renamed its `semantic-layer` page to *"The AI context layer."*
Stardog dropped it; RelationalAI never used it. Three ontology-branded vendors were absorbed during
2026. Of 14 vendors checked, **13 are enterprise-data semantics for analytics and RAG**; Palantir is
named **once** in 562 sessions and cited by no other vendor.

**Recommendation: say `primitive`.** It is well-attested, harness-native, and carries no
business-intelligence baggage. Where the verb-bounding idea needs a name, describe it — *a primitive
that names its permitted actions* — rather than importing "ontology" and inheriting an analytics claim
by 2027.

---

## 5. What this says about hierarchy

KD asked to let a hierarchy emerge rather than forcing one. **It did not emerge, and the reason is the
finding.**

**AAIF's taxonomy file leaves `broaderTerm` deliberately unfilled** and marks *"Autonomy level"* as
*"term accepted; definition under working group discussion."* The field's standards body has agreed the
vocabulary and **not** the containment. The most-adopted artifact in the space is a **flat list of
twelve** whose author then keynoted *"Harness Engineering is not Enough."*

**And everyone who has published structure published a grid, not a tree** — Factory.ai 9×5, Microsoft
5×25, Debois 3×4, LoomWarp 7×6.

**But "no hierarchy" is not the same as "no map."** A primitive set *is* an architecture: it says what
exists, what composes with what, and what the single way to do each thing is. The map we owe a reader
is not a containment tree of abstract layers — it is **the set of primitives a harness needs, in the
order a team comes to need them.** That is
[`05-harness-factors.md`](./05-harness-factors.md).

---

*Companion: [`../01-concepts.md`](../01-concepts.md) §3.17 — the definition ·
[`02-harness-taxonomies.md`](./02-harness-taxonomies.md) — the published function lists ·
[`05-harness-factors.md`](./05-harness-factors.md) — the map*
