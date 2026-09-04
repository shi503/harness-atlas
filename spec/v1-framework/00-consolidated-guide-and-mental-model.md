---
title: "The harness framework, consolidated — the mental model"
tier: spec
project: loomwarp
created: "2026-09-01"
status: DRAFT
owner: KD
extends: spec/v1-framework/00-README.md
---

# The harness framework, consolidated — the mental model

One opinionated read of what a team-scale agent harness is made of: what the field has already
published, what LoomWarp adds, and which layer you are actually asking about when you have a problem.
Written for someone who has to **operate** a team on this — not for someone auditing the derivation.

**Three documents, three jobs, and it is worth being blunt about the difference.**
[00-MAP.md](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/00-MAP.md) is a **provenance index** — which files are ours, which are other
people's, which are dead. [00-README.md](./00-README.md) is the **specification** — the twelve layers
and thirty-three components, each with its argument. **This file is the mental model**: the shape you
carry in your head, the rules that fall out of it, and the table you look at when you are trying to
work out whether the thing that just went wrong was a Standards problem or an Enforcement problem.

---



## 1. The mental model

> **⚠️ Re-ordered 2026-09-02, and the rest of the corpus does not know yet.** The layers below are
> renumbered so that the drawing and the numbering agree again. `CROSSWALK.md` §0 still reads 12
> layers in the old order, the 33 component files still carry the old IDs, and the Grid still draws
> the old warp threads. **This section is ahead of canon on purpose** — §1.2 carries the mapping, and
> the downstream rename is queued rather than done.

A team-scale harness is a **stack of layers inside a bounding box**, read from the bottom. A unit of
work descends through the decisions the team has already made, picks up what the team has
accumulated, and rises through the judgements the team makes about it — until it crosses the surface,
where people are.

```
 ╔═ WORK ENVIRONMENT ════════════════════════════════════════════════════════════╗
 ║  How work gets done here at all — the rooms, tools, norms and calendars that   ║
 ║  exist whether or not anyone configured them. Everything below sits inside it. ║
 ║                                                                               ║
 ║                    ┌──────────────────────────────────────┐                   ║
 ║      people  ────► │ 12  Users & Rituals                  │   ABOVE THE       ║
 ║                    │     who is in the loop, and why      │   SURFACE         ║
 ║  ══════════════════╪══════════════════════════════════════╪═════════════════  ║
 ║   the membrane ──► │ 11  Surfaces & Workflows             │   where humans    ║
 ║                    │     where work is seen and agreed    │   and agents meet ║
 ║  ══════════════════╪══════════════════════════════════════╪═════════════════  ║
 ║                    │ 10  Agents & Team Services           │                   ║
 ║                    ├──────────────────────────────────────┤   JUDGEMENTS      ║
 ║                    │  9  Lifecycle                        │   that RUN        ║
 ║                    ├──────────────────────────────────────┤   — re-decided    ║
 ║                    │  8  Trust                            │     every unit    ║
 ║                    ╞══════════════════════════════════════╡                   ║
 ║                    │  7  Projects & Platform          ⟳   │   ACCUMULATES     ║
 ║                    │  6  Knowledge Systems            ⟳   │   — and cannot    ║
 ║                    ╞══════════════════════════════════════╡     be bought     ║
 ║                    │  5  Control & Task Execution         │                   ║
 ║                    │  4  Capabilities                     │   DECISIONS       ║
 ║                    │  3  Harness Systems & Stacks         │   that BIND       ║
 ║                    │  2  Agent Harness — native or custom │   — settled once, ║
 ║                    │  1  Workspace Environment            │     revisited     ║
 ║                    │  0  Foundation — models and runtime  │     rarely        ║
 ║                    └──────────────────────────────────────┘                   ║
 ╚═══════════════════════════════════════════════════════════════════════════════╝
```

### 1.1 What each layer answers

| | Layer | The question it answers |
|--:|---|---|
| **X** | **Work Environment** | How does work get done here at all? *(the frame, not a layer — see §1.3)* |
| 12 | Users & Rituals | Who is in the loop, and what are they there to do? |
| 11 | Surfaces & Workflows | Where is work seen and agreed, and which version of it is true? |
| 10 | Agents & Team Services | Who exists, and who answers for it? |
| 9 | Lifecycle | What happens to a lesson after it is learned? |
| 8 | Trust | Whether to believe it |
| 7 | Projects & Platform ⟳ | What the team delivers, and the platform it ships on |
| 6 | Knowledge Systems ⟳ | What the team knows, and how an agent gets it |
| 5 | Control & Task Execution | What is the unit of work, and what runs next? |
| 4 | Capabilities | What can the team do, and how does it travel? |
| 3 | Harness Systems & Stacks | Where does our opinion attach? |
| 2 | Agent Harness | Where does a rule stop being a request? |
| 1 | Workspace Environment | What can we reach? |
| 0 | Foundation | What models and runtime do we build on? |

### 1.2 The renumber, and how cheap it turned out to be

**Only three layers actually move, and they permute among themselves.** Everything from Trust upward
keeps its number; everything from Capabilities down keeps its number. Control drops below the
accumulating pair, and the pair shifts up one.

| Was | Now | Layer | Component IDs |
|---|---|---|---|
| 0–4 | **0–4** | Foundation → Capabilities | unchanged |
| **7** | **5** | Control & Task Execution *(was Workflow Tasks)* | `7a` → `5a` |
| **5** | **6** | Knowledge Systems *(was Context)* | `5a` `5b` `5c` → `6a` `6b` `6c` |
| **6** | **7** | Projects & Platform *(was Workspaces)* | `6a`–`6d` → `7a`–`7d` |
| 8–11 | **8–11** | Trust → Surfaces | unchanged |
| — | **12** | Users & Rituals | **new** — absorbs `9b` Rituals |

**The three renames collide with each other**, so the component rename has to be done in one atomic
pass or not at all: `7a` becomes `5a` while `5a` becomes `6a` while `6a` becomes `7a`. Queued, not
done.

### 1.3 Three properties govern every choice you make in it

***Where is the membrane?*** Layer 11 Surfaces is not one layer among twelve — it is **the boundary
between the people and the machinery.** Everything above it is human practice; everything below is
configured system. That is why Rituals moved up out of Lifecycle: a retro is a thing people do at a
surface, not a mechanism the harness runs.

***Is it configured, or does it accumulate?*** Layers 0–5 are chosen and then mostly left alone.
Layers 8–12 run on every unit of work. **Only layers 6 and 7 grow with use** — and they are the two a
team cannot buy. You can rent a model, adopt a harness, and import a standards pack; you cannot
import what your team has learned or the product it has built.

***Is it a decision or a mechanism?*** The framework separates these deliberately and repeatedly, and
almost every confused conversation about agent governance is the two collapsed into one. *What an
agent may do* is a named bound at [`3a` Control](./content/component-06-control.md); *what stops it* is
[`2c` Enforcement](./content/component-05-enforcement.md). *Who exists* is
[`10a` Roster](./content/component-31-roster.md); *who answers* is
[`10b` Org](./content/component-32-org.md). **A team can have precise bounds and no enforcement, or
comprehensive enforcement over bounds nobody named — and those are different failures with different
fixes.**

***What is your minimum?*** The layer is navigation; **the component is the gradeable primitive**; and
a layer grades at its weakest component, never its average. *Minimum governs* is the whole diagnostic
posture of this framework: you do not have a score, you have a **bottleneck**.

---

## 2. What the field already published, and the three slots nobody has

Six enumerations of "what a harness is made of" exist. Read together, they agree on a runtime core
and are silent above it.


| Source                                                 | Shape                                                                                                                                                                      | What it enumerates                                                                                      | What it omits                                                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **AAIF** — the standards body, `ws-taxonomy-landscape` | One term plus an inline gloss (⚠️ *not* five taxonomy terms — see [02-harness-taxonomies.md](../../comparisons/2026-08-research/02-harness-taxonomies.md) §1) | Control Flow · Environment Access · State & Memory · I/O Shaping · Observability                        | Permissions, recovery, cost, human coordination, distribution. And `broaderTerm` is **deliberately unfilled on every entry** |
| **Meng et al.** — survey, 2026-04                      | `H = (E, T, C, S, L, V)` — the finest-grained                                                                                                                              | Execution Loop · Tool Registry · Context Manager · State Store · Lifecycle Hooks · Evaluation Interface | Everything above one agent                                                                                                   |
| **Macedo** — arXiv, 2026-06                            | `T1–T4`, an **inclusion test** rather than a wishlist                                                                                                                      | Loop · tool interface · active context management · ≥1 control mechanism *independent of the model*     | Optional-izes memory, verification, audit, guardrails                                                                        |
| **Böckeler** — martinfowler.com, 2026-04               | **Guides & Sensors** — feedforward vs feedback control                                                                                                                     | Steering before the act; signals after it, *optimised for model consumption*                            | Not a component list at all — a control-theory cut across one                                                                |
| **Chan et al.** — TMLR, agent infrastructure           | Governance altitude                                                                                                                                                        | Attribution · Interaction · Response                                                                    | Context assembly, memory, routing, decomposition, cost. **Do not use as a harness spine**                                    |
| **HumanLayer** — 12-Factor Agents, 25.6k★              | Flat manifesto, deliberately unranked                                                                                                                                      | 12 factors, own-your-context / own-your-control-flow / small focused agents                             | Ranking, and anything above the single agent                                                                                 |


**The three slots absent from every one of them: routing, cost accounting, and distribution.** Nobody
elevates model or actor routing to a layer — it is buried inside a tool registry. No taxonomy treats
budget as a named function, while the practitioner corpus is saturated with it (`cost` 70 · `budget`
23 · `spend` 22 · `throughput` 21 across 562 conference sessions). Distribution appears only
obliquely, as "skills" or "a golden path."

**And the structural finding underneath those three: every published model is a model of one agent.**
Macedo's four conditions, Meng's six-tuple, AAIF's gloss, the twelve factors — each answers *how do
you build an agent that works*. **Nothing grades the system a team works inside.** AAIF's own
`broaderTerm` field, unfilled across the file, is that gap made literal: the field's standards body
has agreed the vocabulary and has not agreed the hierarchy.

**That empty altitude is what the stack is for.** Layers 0–5 are the published core,
re-cut. Layers 6–12 are the altitude nobody has filled — and that is also, honestly, where all eight
of this framework's uncorroborated markers sit (§9).

---



## 3. The eight rules that matter most

**Rule 1 — The minimum governs, not the mean.**
A layer grades at its weakest component. A team sitting at stage 5 everywhere except Enforcement, which is at stage 1, is a stage-1 team — because the failure that will actually happen is the enforcement one. The practical consequence: **you never need to fix everything, and you never get to choose what to fix next.** `9f` [Diagnose the Bottleneck](./content/component-30-diagnose-the-bottleneck.md) is the component that makes this an operating practice rather than a slogan.

**Rule 2 — If it must hold every time, it is not a prompt.**
This is Macedo's `T4` — *a control mechanism independent of the model* — made a graded row.
`3e` [Standards](./content/component-10-standards.md) shapes behaviour; it does not bind it.
`2c` [Enforcement](./content/component-05-enforcement.md) binds. Writing a constraint into a rules file
and calling it a control is the single most common category error in this space, and it is a category
error precisely because the two are different components with different grades.

**Rule 3 — Only two layers accumulate; everything else is configured or runs.**
Context (5) and Workspaces (6) are the `⟳` pair. This is a **falsifiable** claim, not a slogan: the
named losing condition is a third accumulating layer, and the named candidate is
`8b` [Evidence](./content/component-22-evidence.md) — excluded today only because its entries feed
forward as *measurement*, never as *content an agent reads to do the next unit of work better*. Show
an evidence store whose prior entries are retrieved as context for a new run and the pair becomes a
triple.

**Rule 4 — Declare the environment; derive the adapters.**
MCP adapts per call and the harness never holds a model of what exists. So the inventory is
**declared** at `1a` [Environment](./content/component-02-environment.md) — owner, interface, auth —
and the reach is **derived** at `2a` [Adapters & Middleware](./content/component-03-adapters-and-middleware.md).
They are graded apart because *a tool list discovered at call time is reach without inventory*, and a
team can have excellent reach and no idea what it is reaching.

**Rule 5 — Grade the primitive, never the machinery.**

> A primitive is a thing you configure. Machinery is a thing that runs.

All thirty-three components are configurable primitives; that is the membership test. Ours, named:
`router.py` and `dispatch.py` are machinery and sit at `3a`; **the work contract they read is the
primitive**, and it is graded one layer up at [7a](./content/component-20-workflow-tasks.md). A grid
that scores machinery has graded whether a team installed something.

**Rule 6 — The decision and the mechanism are always separate rows.**
`3a` bound vs `2c` enforcement · `10a` roster vs `10b` authority · `8b` ledger vs `8c` trace ·
`5b` store vs `5c` retrieval · `3e` standard vs `8a` bar. Each pair fails apart, and each file names
the failure its partner cannot see. When a component feels like it duplicates another, check which
half of one of these pairs you are looking at.

**Rule 7 — A horizon marker is downgraded by evidence, never upgraded by argument.**
`bet` → `claimed` → `emerging` → `shipped` requires new citations. The reverse — discovering that
something we called `shipped` has one peer, not two — requires only a correction. **The axis is
asymmetric on purpose: it is easier to lose ground than to take it.**

**Rule 8 — The numbering is a reading order, not a dependency order, and the exception is published.**
Layers are numbered in *the order a team comes to need them*. At least one dependency runs upward —
`3b` [Routing](./content/component-07-routing.md) resolves against
`10a` [Roster](./content/component-31-roster.md), seven layers above it — and other components publish
storage and resolution relations that cross layers. **The typed-relations map that would carry those
edges properly is owed and not written** (§10).

---



## 4. The thirty-three, in one page

Read the question column in sequence. **The first question your team cannot answer in one sentence is
your weakest layer.** The third column is the sentence a team that *has* it would actually say —
which is the test, because you either recognise your own team in it or you do not.


|                       | Component                    | The question it answers                                          | You have it when a teammate can say…                                                                                                       | H          |
| --------------------- | ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| **0 Foundation**      | `0a` Substrate               | What do we run on?                                               | *"We run on one named harness and one named model, and we can say what we would lose by moving off either."*                               | `shipped`  |
| **1 Environment**     | `1a` Environment             | What can we reach?                                               | *"Every system we work across is declared in one place with its owner, its interface and its auth — before anything tries to reach it."*   | `bet`      |
| **2 Agent Harness**   | `2a` Adapters & Middleware   | How does the loop reach any of it?                               | *"Every declared system has one adapter, and swapping the harness underneath does not change how our work reaches it."*                    | `shipped`  |
|                       | `2b` Hooks                   | When does something happen without anyone remembering to run it? | *"Things happen at fixed points in the loop because we configured them there, not because someone remembered."*                            | `shipped`  |
|                       | `2c` Enforcement             | Where does a rule stop being a request?                          | *"At least one of our controls is something the agent cannot talk its way past, and every denial is recorded."*                            | `shipped`  |
| **3 System Stacks**   | `3a` Control                 | How does intent become work that is allowed to start?            | *"Intent goes in, a dependency graph comes out, and nothing starts before what it depends on has landed."*                                 | `shipped`  |
|                       | `3b` Routing                 | Who picks this up?                                               | *"Who picks up a piece of work is decided by a rule that resolves against our roster, not by a model's guess."*                            | `emerging` |
|                       | `3c` Composition             | What is this agent made of?                                      | *"An agent here is assembled from named parts, and we can change one part without rewriting the rest."*                                    | `emerging` |
|                       | `3d` Configuration           | Where does our opinion attach?                                   | *"Each project declares its own harness configuration in files we own, and the agent reads it rather than being told."*                    | `shipped`  |
|                       | `3e` Standards               | What does good look like, before anyone writes anything?         | *"An agent writing code here is handed our patterns before it starts, and a repo can tighten them but never loosen them."*                 | `bet`      |
| **4 Capabilities**    | `4a` Capability              | What can the team do, and how does it travel?                    | *"Any repo can install a capability we built, it stays pinned to a version, and removing it here removes it there."*                       | `shipped`  |
|                       | `4b` Capability Permissions  | Who may invoke this, and against what?                           | *"Each capability declares who may invoke it and against what, and an ungranted agent cannot reach it."*                                   | `emerging` |
| **5 Context ⟳**       | `5a` Individual Memory       | What do I know that the team has not agreed to?                  | *"What I have learned working here follows me between repos, and it does not land in the team's canon by accident."*                       | `emerging` |
|                       | `5b` Team Memory             | What has to be true for anyone else's agent?                     | *"If another teammate's agent would need a fact to be correct about this project, it lands in the team's store rather than mine."*         | `emerging` |
|                       | `5c` Knowledge               | Where does an agent go to find out what we know?                 | *"There is one place an agent retrieves what we know about this domain, and we can show which version it read."*                           | `shipped`  |
| **6 Workspaces ⟳**    | `6a` Product                 | Where does the work land, and what may it not become?            | *"We can point at where a piece of work lands, and the constraints on that destination were written down before the work started."*        | `bet`      |
|                       | `6b` Infrastructure          | Where does the work actually happen?                             | *"An agent gets a working, disposable environment for the job, and it is created the same way every time."*                                | `emerging` |
|                       | `6c` Estate                  | What code exists, and what does a change here break there?       | *"We work across six repos as one workspace — here is the registry, here is who owns what, and here is what a change in A does to B."*     | `emerging` |
|                       | `6d` Delivery                | How does a finished change get to production?                    | *"There is one path from a finished change to production, and an agent's work travels it exactly like ours."*                              | `bet`      |
| **7 Workflow Tasks**  | `7a` Workflow Tasks          | What is the unit of work, written down?                          | *"Review, deploy, incident are each written down as a task with its inputs, its done-condition and its owner — and there is one of each."* | `emerging` |
| **8 Trust**           | `8a` Evals                   | What must the work clear before it ships?                        | *"Nothing ships until it clears a bar we wrote down, and the check that decides is one the agent did not write."*                          | `shipped`  |
|                       | `8b` Evidence                | How does someone who was not there come to believe it?           | *"'Done' means the tests ran and here is the record — we can show you what was run and what it produced."*                                 | `shipped`  |
|                       | `8c` Observability           | What did it actually do?                                         | *"We can see what an agent did, step by step, after the fact, without asking it what it did."*                                             | `shipped`  |
|                       | `8d` Efficiency              | What did that cost, and was it worth buying again?               | *"We know what a piece of work cost and what it returned, and we can say whether it was worth buying again."*                              | `emerging` |
| **9 IMPROVE**         | `9a` Learning                | What happens to a lesson after it is learned?                    | *"When a review finds the same class of problem twice it becomes a rule, and that change was reviewed and can be reverted."*               | `emerging` |
|                       | `9b` Rituals                 | Who is in the loop, and what are they there to do?               | *"Review, retro and planning each have a scheduled slot and a stated place the agent participates — and each leaves an artifact."*         | `emerging` |
|                       | `9c` Cadence                 | What runs without anyone asking?                                 | *"Review runs nightly and quality checks run on hooks, and every run leaves a record that something else reads."*                          | `shipped`  |
|                       | `9d` Anti-fragile Lifecycle  | What closes the loop?                                            | *"Every failure makes the next run less likely to fail the same way."*                                                                     | `bet`      |
|                       | `9e` Raise the Floor         | How does a second way of doing something get retired?            | *"When a second way of doing something appears, one of them is retired — we do not accumulate two."*                                       | `bet`      |
|                       | `9f` Diagnose the Bottleneck | What is limiting us, and what do we fix next?                    | *"We can name the one thing limiting us this month, and the answer moves when we fix it."*                                                 | `bet`      |
| **10 Teams & Agents** | `10a` Roster                 | Who is on this team?                                             | *"Every actor, human or agent, is in one list with a scope and an accountable human."*                                                     | `emerging` |
|                       | `10b` Org                    | Who answers for this, and who may change it?                     | *"Who may decide what is written down, and an agent that reaches the edge of its authority escalates to a named person."*                  | `claimed`  |
| **11 Surfaces**       | `11a` Surfaces               | Where is the work seen, and which version is true?               | *"Plans live in markdown in the repo and that is the source of truth — Linear and Slack are views."*                                       | `emerging` |




---



## 5. Choosing the right layer

The most common failure in using this framework is grading the wrong row. Almost every one of these
pairs is a decision/mechanism split (Rule 6).


| You want to…                                                  | That is                        | Not                                                  |
| ------------------------------------------------------------- | ------------------------------ | ---------------------------------------------------- |
| Declare that a system exists, with an owner and an auth model | `1a` Environment               | `2a` — reach without inventory                       |
| Reach that system from inside the loop                        | `2a` Adapters & Middleware     | `1a` — an inventory nothing can call                 |
| Make something happen at a fixed point in the agent loop      | `2b` Hooks                     | `9c` Cadence — that fires on a clock                 |
| Make something run without anyone asking                      | `9c` Cadence                   | `2b` — that fires on the loop                        |
| Stop an agent from touching a path, every single time         | `2c` Enforcement               | `3e` Standards — a rule the model can decline        |
| Say what an agent is allowed to be doing at all               | `3a` Control — the named bound | `2c` — that is the mechanism, not the decision       |
| Decide the order work happens in                              | `3a` Control                   | `7a` — that is the contract, not the graph           |
| Decide *who* picks a piece of work up                         | `3b` Routing                   | `3a` — sequencing is not assignment                  |
| Decide what shares a context window                           | `3c` Composition               | `10a` — a list of agent definitions is not a roster  |
| Say what "good" means here, before anyone writes anything     | `3e` Standards                 | `8a` Evals — that is the bar after the fact          |
| Say what the work may not *become*                            | `6a` Product                   | `3e` — how it is written ≠ what it may be            |
| Ship a capability to six repos and keep it pinned             | `4a` Capability                | copying files; `6d` is for changes, not capabilities |
| Say who may invoke that capability, and against what          | `4b` Capability Permissions    | `2c` — path-level control is a different grain       |
| Record a fact every teammate's agent must have                | `5b` Team Memory               | `5a` — that is yours, on purpose                     |
| Give an agent somewhere to look something up                  | `5c` Knowledge                 | `5b` — a store is not a retrieval surface            |
| Give an agent a disposable place to work                      | `6b` Infrastructure            | `6c` — that is what exists, not where you run        |
| Know what a change in repo A breaks in repo B                 | `6c` Estate                    | `6b`                                                 |
| Write down what "review" actually is                          | `7a` Workflow Tasks            | `3a`'s machinery                                     |
| Know, step by step, what an agent did                         | `8c` Observability             | `8b` — a trace shows steps                           |
| Prove to someone who was not there that it is done            | `8b` Evidence                  | `8c` — a ledger holds claims                         |
| Know whether the work was worth the money                     | `8d` Efficiency                | `8c`                                                 |
| Turn a repeated review finding into a rule                    | `9a` Learning                  | a retro that leaves no artifact                      |
| Retire the *second* way of doing something                    | `9e` Raise the Floor           | `9a` — adding a rule is not removing one             |
| Name the one thing limiting you this month                    | `9f` Diagnose the Bottleneck   | `8d` — that is its input                             |
| Know who exists                                               | `10a` Roster                   | `10b`                                                |
| Know who answers for it, and who may change it                | `10b` Org                      | `10a`                                                |
| Decide where the truth of a plan lives                        | `11a` Surfaces                 | a habit                                              |


---



## 6. A reference setup, by scale

The layer numbering **is** the adoption order, so this section is mostly a place to stop reading.
Everything past your scale should honestly grade **Absent**, and Absent is the correct grade for
something you do not need yet.

### One developer, one repo

`0a` Substrate · `3d` Configuration · `5a` Individual Memory · `5c` Knowledge.

One harness, one model, a configuration file you own, and somewhere to look things up. Nothing else
is load-bearing at this scale, and a solo developer who builds a roster has built a spreadsheet.

### A team, one repo

Add `2b` Hooks · `2c` Enforcement · `3e` Standards · `5b` Team Memory · `7a` Workflow Tasks ·
`8a` Evals · `10a` Roster.

**This is where the commitment threshold sits** — the grid's stage 4, *Governed*. The transition
that defines it: facts stop living in one person's head (`5a` → `5b`), and at least one control stops
being a request (`3e` → `2c`). A team that adds `5b` without `2c` has documented its intentions.

### A team, many repos — an estate

Add `4a` Capability · `4b` Capability Permissions · `6c` Estate · `6d` Delivery · `11a` Surfaces.

Distribution becomes a named function the moment there is a second consumer, and *which version of
the plan is true* becomes a question the moment there are two places to read it.

### Several teams

Add `8b` Evidence · `8d` Efficiency · `10b` Org · and the whole of layer 9.

At this scale the questions are all about **belief across a boundary** — proving completion to
someone who was not there, naming who answers, and closing the loop so a lesson learned in one team
reaches another. This is also, not coincidentally, where the framework's uncorroborated markers
cluster (§9).

---



## 7. Enforcement, ordered

Pick the cheapest rung that actually binds. This is the LoomWarp reading of the ladder that
[20-consolidated-guide.md](../../content/claude-code/20-consolidated-guide.md) §5 documents for
Claude Code specifically.


| Rung                                                 | Graded at                            | Binds                                       | Cost                 |
| ---------------------------------------------------- | ------------------------------------ | ------------------------------------------- | -------------------- |
| A written standard, inherited *tighten-never-loosen* | `3e` Standards                       | Nothing. It **steers**                      | Authoring            |
| A permission `deny` rule                             | `2c` Enforcement                     | Built-in tools and recognized file commands | Nearly zero          |
| A `PreToolUse` hook that exits non-zero              | `2b` + `2c`                          | The same, plus anything a script can decide | Latency              |
| Managed settings                                     | `2c` Enforcement                     | Everything above, non-overridably           | Admin deployment     |
| Sandbox                                              | `0a` Substrate · `6b` Infrastructure | **Arbitrary subprocesses**                  | OS-level setup       |
| A human approval that carries prose                  | `10b` Org + `11a` Surfaces           | The decision itself                         | A person's attention |


**Two things this ordering makes visible that a flat list does not.** The bottom rung and the top
rung are graded in *different layers* — which is why "we take security seriously" and "we have a deny
rule" are not answers to the same question. And the last rung is the only one that produces evidence
as a side effect: an approval carrying *why* is an `8b` ledger entry that nobody had to write
separately.

---



## 8. Grading — six stages, twelve threads, one bottleneck

Each of the twelve layers is graded on the same six-stage ladder, and the team's stage is the
**minimum across the twelve**, never the mean.


|       | Stage                                     | The org it corresponds to                                                 |
| ----- | ----------------------------------------- | ------------------------------------------------------------------------- |
| 1     | **Absent**                                | Resistant — AI is a risk surface to be sandboxed                          |
| 2     | **Individual**                            | Opportunistic — personal productivity, not team capability                |
| 3     | **Shared**                                | Assisted — shared templates; humans still orchestrate everything          |
| **4** | **Governed** ← *the commitment threshold* | Systematized — AI designed into core workflows with gates and measurement |
| 5     | **Default**                               | AI-First — roles redesigned around abundant intelligence                  |
| 6     | **Self-improving**                        | AI-Native — agents own sub-workflows; internal capability becomes product |


**The threshold is real and it is at 4.** Stages 1–3 are things a team drifts into. Stage 4 is the
first one that requires somebody to decide something and write it down, which is why every gate,
ledger and named owner in this framework appears at that rung or above.

Two artifacts operationalise this. [grid.html](../../maturity/grid.html) is the instrument — twelve
sliders, and its rows are **generated** from [CROSSWALK.md](./CROSSWALK.md) §0 so drift is impossible
rather than detectable. [05-preflight.md](./05-preflight.md) is the generator that turns a grid
reading into a decision record, gated so a team sees only the rungs between where it is and where it
is going.

**The conformance spectrum — what a teammate may diverge on.** A member's personal stack may
legitimately differ on the vendor-providable core (layers 0, 1, 2, and `3a`–`3d`) and on `5a`. Three
things conform, under *tighten, never loosen*: `3e` Standards, `5b`'s governed tier including the
decision ledger, and `6a`'s directive set. **You may bring your own harness. You may not bring your
own definition of good, your own version of a decision, or your own product constraints.**

---



## 9. Horizon — how much of this actually ships

Every component carries one of four evidence markers, so a reader can tell an observation from a
wager without inferring it from tone.


| Horizon    | Means                                         | Evidence required                         | Count  |
| ---------- | --------------------------------------------- | ----------------------------------------- | ------ |
| `shipped`  | ≥2 peers ship it as a **named primitive**     | Two teardowns cited, by file and section  | **12** |
| `emerging` | 1–2 peers, **no convergence on vocabulary**   | Name them **and** name their disagreement | **13** |
| `claimed`  | Named publicly, **no shipped implementation** | Cite the claim **and** cite the absence   | **1**  |
| `bet`      | Ours, **uncorroborated**                      | Say so out loud                           | **7**  |


`emerging` is defined by vocabulary, not by count: peers have built the thing and have not agreed
what to call it — which is precisely where a framework can contribute a word.

**Where the eight uncorroborated markers sit is the honest shape of the claim.** Six of the eight
`bet`/`claimed` rows are at layer 6 or above. The field's shipped surface thins as you climb, which
is Galster et al.'s finding — *"harness engineering in open source today is therefore mostly context
engineering"* — restated structurally. **This framework's answer is a dated forward claim, not a
description of the present**, and it dies if teams reach layer-8-and-up outcomes on context
engineering alone. Re-check **2027-03-01**.

> ⚠️ **Open, and the reader should know it.** Of the twelve `shipped` markers, **one —** `5c` **Knowledge —
> cites two teardowns by file and section as §2's rule requires.** The other eleven cite
> `03-jtbd.md` §2 *"Who"*, a synthesis document that names peers without pointing at their teardowns,
> or (for `2b` Hooks) a single survey. Either the rule relaxes and the relaxation is recorded, or
> eleven markers are re-cited. Unresolved as of 2026-09-01.

---



## 10. Where this framework stops

Honest boundaries, in the same spirit as
[20-consolidated-guide.md](../../content/claude-code/20-consolidated-guide.md) §10. These are the
places to attack it.

- **The layer list is not the system map.** A stack of twelve boxes carries no edges. The
typed-relations map — the relation set over the thirty-three, a `run-by` column naming who operates
each, and the loop overlay — is specified at [CROSSWALK.md](./CROSSWALK.md) §3.10 and **owed by the**
`harness-map-v1` **workstream**. Until it lands, §1's diagram is a reading order wearing a system
map's clothes, and the one dependency that runs upward (`3b` → `10a`) is admitted rather than drawn.
The skeleton is pre-drawn at [06-relations.md](./06-relations.md), and its first reading is that
**the corpus is dense in contrasts and sparse in dependencies** — thirteen citable `requires` edges
across 33 nodes, which is why *minimum governs* is currently a posture rather than a prediction.
- **Nothing here says who operates a component.** The `run-by` column is drawn and it is empty: one
of 33 nodes names a seat. The framework can tell a team that Routing is its bottleneck and cannot
tell it whose job Routing is.
- **It has never been run against a team other than its author's.** Thirty-three components, one
self-teardown, and zero external gradings. The instrument exists; the calibration does not.
- **v1 assumes software in version control, and says so.** `J10` distributes to repos, `J8` proves
against commits, `J15` hardens code; the empirical base is 2,853 GitHub repositories and five
coding harnesses. The *shape* of layers 5, 8, 9, 10 and 11 plausibly describes any team whose work
leaves auditable artifacts — but every citation behind them is from software, so the wider claim is
not made.
- **The** `shipped` **bar is met in full by one marker in twelve** (§9).
- **The checks check documents against documents.** Six guard scripts enforce that counts agree,
links resolve, vocabulary is single and frequency claims reproduce. **None checks a document
against the behaviour it describes**, which is why the framework's most serious defects have all
been found by reading rather than by running. Guard-gating is advisory during this ideation phase.

**What is deliberately open, dated, and in one place:** [CROSSWALK.md](./CROSSWALK.md) §3 —
stewardship (`OPEN-9`), RBAC over context, the Briefing's missing component, and the rest. That
register is the honest answer to *what does this not close*, and it is meant to be read before
anyone builds on this.

---

*The specification:* [00-README.md](./00-README.md) *· The derivation:*
[CROSSWALK.md](./CROSSWALK.md) *· The jobs:*
[03-jtbd.md](../../comparisons/03-jtbd.md) *· The horizon rule:*
[12-horizon.md](./12-horizon.md) *§2 · The instrument:*
[grid.html](../../maturity/grid.html) *· The generator:* [05-preflight.md](./05-preflight.md) *·
How to review it:* [WALKTHROUGH.md](./WALKTHROUGH.md)