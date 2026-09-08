---
title: "v0-01 — The problem, from first principles"
tier: spec
project: harness-atlas
created: "2026-08-11"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# The problem, from first principles

This document derives the concepts without looking at what this repo built. Where the derivation
lands on something `references/elements.md` already named, that is noted as **corroboration** — but nothing is inherited.

---

## 1. The same question that needs to be answered for today's AI teams. 

Every team's first challenge is to answer this one question: 
> **How do we work?**

While most projects, teams, and orgs think they've answered this with culture, processes, and guidelines, AI-enabled teams need to be much more specific and codify the process in ways both humans and agents can understand. 

This project reframes the question to: *How do we **as an AI-enabled team** work?* and provides the framework and a mental model that describes the necessary concepts, tools, and answers for teams reach their next stage in AI-maturity.  

#### Digging deeper - Common failures to "How does our AI-native team work?"; 
The most common failure for teams is they don't fully commit to codifying their process or assume that it can be distributed among individuals. The question is unanswerable as stated, because it bundles three that have different owners, different artifacts, and different failure modes.

```
                    "How does our AI-native team work?"
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        │                           │                           │
  How does work              What does good              How does this
   get done?                   look like?                get implemented?
        │                           │                           │
  intake → scope →          standards · DoD ·           the harness ·
  execute → verify →        evaluation · review          the config ·
  ship → learn                                           the install
        │                           │                           │
  owner: team lead          owner: architect /          owner: platform /
                            senior IC                    whoever set it up
        │                           │                           │
  answer: "We work          answer: "Here's our          answer: "Individuals
  in agile development"      coding guidelines"          build their own harness"
        │                           │                           │
  fails as:                 fails as:                    fails as:
  "everyone does it         "it works when Sam           "it works on
   differently"              does it"                     Sam's machine"
```
> KD Note: there's some tweaks from the original version that need to get cleaned up.  this section needs to be better spun within the common failure modes within stages 2-3 where "decisions aren't documented" , "people problems", "policies go stale", etc... Overall, this is supposed to capture that as AI workflows encompass the entire work process, we haven't described or built infrastructure for agents to participate in the entire process. (eg. you need to state you have a github and it's in volved at phases X,Y,Z etc...)

Three observations about this tree, each of which shapes everything downstream.

**The three branches fail independently.** A team can have an excellent answer to *how work gets
done* and no answer to *what good looks like* — that team ships quickly and ships badly. A team can
have both and no answer to *how this gets implemented* — that team has a wiki page nobody can act on.
The branches do not substitute for each other.

**Only the third branch is new.** "How does work get done" and "what does good look like" are old
questions with a century of management literature behind them. The third — *how is the answer
installed into the tools so that it actually binds* — is the one AI changed, because for the first
time the worker reads the documentation. At the very minimum, the work needs to be done and evident through .md files and processed along the way. 

**A framework's job is the third branch.** The first two are the team's answers; nobody can supply
them from outside. What a framework can supply is the structure that makes those answers
*implementable, portable, and enforceable*. This is a narrower claim than "LoomWarp tells you how to
work," and it is the honest one.

> **LOOMWARP is inspired from the vertical threads on a loom that provide the underlying structure that each team's fabric is built on.** The framework establishes the essential concepts, infrastructure, and AI workflows that tie together multiple threads into cohesive units of work. 
Loomwarp Framework provides a basic construct to the "who, what, where, when, why, and what actually happened" that answers "how work gets done" 
---

## 2. The derivation

Ask a narrower question, whose answers are checkable:

> **What must exist for an agent to do a unit of work well, repeatedly, across a team?**

Walk one unit of work end to end and name what it touches. Each name is a candidate function.

| # | The unit of work needs to… | Which requires | Candidate |
|---|---|---|---|
| 1 | run at all | **a model** — rented, commoditized, outside the system you build — plus **a harness** that gives it tools and a loop | **Substrate** *(the harness; the model is the input)* |
| 2 | be requested and its result seen | somewhere the request arrives and the answer lands — chat, tracker, repo, inbox | **Surfaces** |
| 3 | reach the code | a known set of repositories with owners and boundaries | **Estate** |
| 4 | know what it is doing | project knowledge — conventions, architecture, domain, history | **Context** |
| 5 | be scoped and sequenced | decomposition, dependencies, dispatch | **Control** |
| 6 | know how the team does this | reusable skills, agents, standards — *what good looks like*, packaged | **Capability** |
| 7 | be prevented from doing harm | boundaries enforced somewhere the model cannot reach | **Policy** |
| 8 | be believed when it says it is done | artifacts a human or another agent can check | **Evidence** |
| 9 | make the next one better | evaluated outcomes flowing back into 4 and 6 | **Learning** |

> **On row 1, corrected 2026-08-26.** This read *"a model, **and** a harness"*, which put the model
> inside the function. The field's canonical formula is **`Agent = Model + Harness`** — the harness is
> *"every piece of code, configuration, and execution logic that isn't the model itself"* (Trivedy,
> LangChain, 2026-03-10). The model sits **outside**, and `E0 Substrate` is the harness plus the
> portability posture.
>
> This also resolves a contradiction the corpus was carrying: `comparisons/01-concepts.md` §3.1 already
> called the model *"an **input** to `E0`, deliberately not an element"*, which row 1 flatly contradicted.
> And it answers the open question about where the model belongs in the picture — **bedrock, below
> Ground**, on the stack diagram rather than absent from it.

Nine candidates. Now test them.

---

## 3. The two-question test

Not everything that appears in this walkthrough is a function. Two questions decide.

> **(a) Independence.** Can a team be at a materially different maturity on this than on its
> neighbours?
>
> **(b) Evidence.** Can you point at an artifact that proves it exists?

Question (a) is what makes a diagnostic useful. If two candidates always move together, they are one
function described twice, and splitting them adds a row without adding information. If they routinely
diverge — and especially if collapsing them lets the weaker one hide behind the stronger — they are
two.

> **This test now also governs a third question, added 2026-08-27:
> *is this a function, or is it a provider of one?*** [`02-functions.md`](./02-functions.md) §0.4 draws
> the line: a **function** is what the harness must do; a **provider** is what performs it. gbrain, an
> OKF bundle and a decision ledger all pass (a) and (b) handsomely and are **not functions** — they are
> three providers of `F3`. **Passing the two-question test makes a candidate real; it does not make it a
> row.**

Question (b) is what keeps the framework honest. A candidate you cannot point at is an aspiration.
The Grid rule inherited from `references/elements.md` applies: *if you cannot point at the artifact,
you are one column to the left.*

### Running the test

| Candidate | (a) Independent? | (b) Artifact? | Verdict |
|---|---|---|---|
| **Substrate** | Yes — a team can be deep on Claude Code and have zero portability | `.claude/settings.json`, adapter config, the install script | **Function** |
| **Surfaces** | Yes — mature repo hygiene coexists routinely with chaotic Slack-as-SoT | The codified SoT decision; integration config | **Function** |
| **Estate** | Yes | A registry, or a documented layout | **Function** |
| **Context** | Yes | `CLAUDE.md`, rules, a context manifest | **Function** |
| **Control** | Yes | A blueprint, a workflow script, a task graph | **Function** |
| **Capability** | Yes | A skills directory, a standards tier, a marketplace | **Function** |
| **Policy** | Yes — and this is the one that most often lags everything else | Permission rules, hooks, managed settings | **Function** |
| **Evidence** | Yes | Events, evaluation records, traces | **Function** |
| **Learning** | Yes — almost always the last to exist | A promotion gate, an eval corpus | **Function** |

All nine pass. That is a suspiciously clean result, so state the counter-argument plainly:

> **The case against a large count.** `references/elements.md` warns against inflating the count and names
> three deliberate non-elements to hold the line. Every function added costs a Grid row, a column in
> every comparison table, and a section in every document — and a framework with nine dimensions is
> harder to hold in the head than one with five. **`OPEN-3`** — **resolved as `C-12`: twelve.** See [`02-functions.md`](./02-functions.md) §2 for the
> merge candidates and what each merge would cost.

### Two candidates that fail the test

Worth recording so the count stops growing later.

- **Workers / execution runtime.** Fails (a). The framework's own principle is *deterministic
  control, probabilistic labor*, which makes the worker substitutable by design. It appears in every
  diagram; you do not build or own it. *(Note: "which worker, and how do we stay portable across
  them" **does** pass, and that is Substrate. The worker is not a function; the adapter is.)*
- **Retrieval / search.** Fails (a) — it moves with Context, never independently of it. An
  implementation detail of Context, and not settled enough to be a headline.

---

## 4. Grouping: the layers of decision making

Twelve functions is a list, not a model. What makes it a model is that the functions are decided by
different people, at different cadences, with radically different costs to reverse.

| Band | The decision is | Functions | Typically decided by | Cadence | Cost to change later |
|---|---|---|---|---|---|
| **Ground** | *What we run on* | Substrate · Surfaces | Platform owner / team lead | Once, revisited yearly | **Very high** — everything sits on it |
| **Structure** | *What we work in* | Estate · Context | Architect | Per quarter, per repo | High — migrations |
| **Motion** | *How work moves* | Control · Capability | The team | Per epic, per workstream | Moderate — reversible |
| **Trust** | *Why we trust it* | Policy · Evidence · Learning | Lead + org | Per action, continuous | Low to change, **high to have skipped** |
> KD Note: i'm also not sure if we need to underpin some of the "grouping" that they're built on a foundation of LLM models and that makes up the foundation and core shift.  hm...
  something to think about (would it make sense if the visual was inverted... )
  
This grouping is the answer to "layers of decision making." Three properties make it useful:

**Cost to reverse decreases as you go down; cost of omission increases.** Getting Substrate wrong is expensive to fix and obvious immediately. Skipping Policy is cheap to fix and *invisible until something goes wrong* — which is precisely why it is the band teams skip.

**You can only decide downward.** You cannot meaningfully choose a Control model before you know
your Substrate, and you cannot write Policy before you know what Surfaces exist to be governed. The
pre-flight generator (`05-preflight-spec.md`) walks the bands in this order for that reason.

**Each band has a characteristic failure.** Ground fails as lock-in. Structure fails as sprawl.
Motion fails as inconsistency. Trust fails as *"it said it was done."*

---

## 5. What a framework can and cannot supply

Stated plainly, because it bounds every claim downstream.

| | Who supplies it |
|---|---|
| *How work gets done* — your intake, your review culture, your cadence | **The team.** A framework supplies shapes, not answers |
| *What good looks like* — your standards, your definition of done | **The team.** A framework supplies the inheritance contract and the place to put them |
| *How this gets implemented* — install, config, enforcement, portability | **The framework.** This is the part that is genuinely mechanizable |

A corollary that should be uncomfortable: **most teams should adopt more than they build.** For most
functions, on most teams, the right answer is a capability that already exists — native Claude Code,
a plugin, gstack, QM. A framework whose every function resolves to "build it with us" is selling,
not helping. `02-functions.md` carries a **provider** column for exactly this reason, and the
pre-flight generator treats "native" as a first-class answer rather than a fallback.

---

## 6. Where this lands relative to the prior framing

For the reader coming from `references/elements.md`:

| v0 | Prior | Change |
|---|---|---|
| E0 Substrate | *(deliberate non-element)* | **Promoted.** Corroborated 3/3 by gstack, Gas City, QM |
| E1 Surfaces | *(absent)* | **New.** Split from Workspace; named by QM as the plugin layer |
| E2 Estate | E1 Workspace | Renamed; narrowed to repositories now that Surfaces exists |
| E3 Context | E2 Context | Same concept, redefined as a system rather than a property |
| E4 Control | E3 Control | Same |
| E5 Capability | E4 Capability | Redefined — was the *unit*, now the *catalog and standards that hold the units* |
| E6 Policy | E5 Policy | Redefined — was a *principle*, now the enforcement layer |
| E7 Evidence | E6 Evidence | Redefined — was a *principle*, now the ledger |
| E8 Learning | E7 Learning | Redefined — was a *process*, now the promotion gate |

The derivation reached seven of the prior nine independently, which is a reasonable sign the original
decomposition was sound. The two it did not reach are the two the landscape says were missing.

---

*Next: [`02-functions.md`](./02-functions.md) — the elements in full, with providers.*
