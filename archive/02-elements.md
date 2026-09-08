---
title: "The elements — a harness from first principles (ARCHIVED)"
tier: spec
project: harness-atlas
created: "2026-08-11"
updated: "2026-08-27"
archived: "2026-08-27"
status: ARCHIVED
superseded_by: archive/v0/02-functions.md
owner: KD
provenance: AUTHORED
---

> ## ⛔ ARCHIVED — superseded by [`../v0/02-functions.md`](./v0/02-functions.md)
>
> **This document is history. Do not cite it as the model.**
>
> It was canonical from 2026-08-11 to 2026-08-27. It is retained because §4's job-placement table and
> §5's component survey are evidence the successor still cites, and because deleting the derivation
> would make the successor unfalsifiable.
>
> **What changed, and why.** This document carried the distinction that broke: §4 called the jobs
> *"Genre A: **functions**"* while §5 drew the line as *"a function is something performed; a component
> is something present."* Alongside the 18 matrix components and the 17 concepts, that left **four
> vocabularies for one unit.** The ruling in [`../v0/02-functions.md`](./v0/02-functions.md) §2
> collapses them: **FUNCTION** is the unit, **SCOPE** is who it serves, **PROVIDER** is what performs it.
>
> **Vocabulary.** `E<n>` here maps 1:1 onto `F<n>` in the successor — see [`00-README.md`](./00-README.md)
> for the crosswalk. This file keeps `E<n>` by design; renaming an archive does not migrate history,
> it corrupts it.
>
> **Two defects recorded on the way out**, both of which the successor fixes:
> 1. **§1's map and §6's headings disagreed.** The map read `E0 Intelligence` and banded
>    `FOUNDATION / PROCESS / LIFECYCLE`; §6 read `E0 Substrate` and `Band: GROUND / MOTION / IMPROVE`.
>    Both were in this file simultaneously.
> 2. **The vocabulary check could not catch that**, because `check-element-vocabulary.mjs` skips the
>    canonical file itself — `if (rel === SPEC || exemptionFor(rel)) continue;`. **The one document the
>    vocabulary is parsed from was the one document not checked against it.**

# The elements

**What this is.** What a team-scale harness is made of, derived rather than inherited. Twelve
elements, in five bands, each a decision a team makes and can be graded on.

**Why it was rewritten on 2026-08-27.** The previous version was *conflicted* — it carried nine
elements, an unratified twelve-node proposal, three open questions about its own count, and at least
seven contradictions with other documents in the corpus. A reference that argues with itself cannot
be the source of truth for anything. §2 resolves every conflict on the record; nothing is quietly
edited away.

**The order this is built in**, and it is deliberate: **primitives → taxonomy → components →
framework → factors.** Those are four different kinds of object, and
`[../../references/comparisons/2026-08-research/06-frameworks-addendum.md](./comparisons/2026-08-research/06-frameworks-addendum.md)`
§0 warns that mapping one onto another is *"a translation, not an identity."* Building them in order
is how the translation stays visible.

> **IDs are stable identifiers, not sort order.** `E0`–`E8` keep the numbers they have had since
> 2026-08-11 so that ~250 citations across 24 files do not break. `E9`–`E11` are the additions. This
> is the same rule `[../../references/comparisons/03-jtbd.md](./comparisons/03-jtbd.md)`
> applies to jobs — *"J1–J12 keep their numbers… J13–J17 are the additions."* **Read the band table,
> not the numbers, for order.**

---



## 1. The map

```
FOUNDATION    E0 Intelligence ──── what we run on: the llm model(s) and the runtime
what we       E1 Surfaces  ──── where work is seen and done
run on
                    │
STRUCTURE     E2 Estate    ──── what code exists
what we       E3 Context   ──── what the agent knows
work in       E9 Roster    ──── who exists, human and agent
                    │
PROCESS       E4 Control   ──── how work is scoped, sequenced and recovered
how work      E5 Capability ─── what the team can do, packaged
moves
                    │
TRUST         E6 Policy    ──── what is allowed, and the hardening bar
why we        E7 Evidence  ──── how we know it happened
trust it
                    │
LIFECYCLE     E10 Cadence  ──── what runs on a schedule, and what it emits
work on the   E8 Learning  ──── how convention graduates into the sanctioned way
harness       E11 Instrumentation ─ what it costs, and what limits us
itself
```

Read top to bottom: decisions can only be made downward. You cannot choose a Control model before you
know your Substrate.

> KD Note: I need help making changes to the map: 
>
> 1. Bottom-up visualization.  this is an architecture framwork so we're building a foundation then up and out. 
> 2. Renaming: GROUND -> FOUNDATION, MOTION -> PROCESS, IMPROVE -> LIFECYCLE

`IMPROVE` **is the band every published instrument omits**, and omitting it is our own recorded
error — `[03-jtbd.md](./comparisons/03-jtbd.md)` notes that these jobs are *"Voss's
system and oversight loop"* and that **we reproduced the field's omission.** It is also the only band
whose output re-enters the system.

---



## 2. The conflicts, resolved

Every contradiction found in the corpus as of 2026-08-27, with the ruling and what it rests on.
**Nothing here is edited away silently** — the losing argument is stated so a reader can disagree.


| #        | The conflict                                                                                                                                                                                                                     | Resolved                                                                                             | On what                                                                                                                                                                                                                                                                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **C-1**  | **Two element schemes.** `references/elements.md` numbered seven `E1–E7`; this file numbers `E0–E8`. `E3` meant *Control* in one and *Context* in the other                                                                      | **This file is canonical.** `elements.md` re-headed `SUPERSEDED` 2026-08-27 with a translation table | It is the map `scripts/check-element-vocabulary.mjs` parses                                                                                                                                                                                                                                                                                      |
| **C-2**  | **Is the model an element?** §1 of `01-concepts.md` puts **MODEL** at the bedrock; §3.1 excludes it as *"an input to* `E0`*… ✅ Correctly excluded"*; `03-agentos-harness-multiplayer.md` says *"model as bedrock, below Ground"* | **Named, inside** `E0`**, as an explicit sub-decision.** The exclusion is overturned                 | The field's own equation is `Agent = Model + Harness`. The old argument proved the model is *not built by us*; it never proved it is *not decided by us*, and a map records decisions. `J3 route` and `J12 account` both hang off it                                                                                                             |
| **C-3**  | **Is** `Substrate` **the right name?**                                                                                                                                                                                           | **Kept, under protest, and recorded as debt**                                                        | ⚠️ `Substrate` is **unattested in any published stack diagram** — the field says *Models and Inference* (Perrone), *Compute and Foundation Models* (Menlo). Renaming costs 25 citations across 24 files and would re-open `C-1`'s ambiguity one week after closing it. **Deferred, not settled**                                                 |
| **C-4**  | **Adapters: element or cross-cutting property?** `elements.md` called runtime-neutrality a deliberate non-element                                                                                                                | **A property of** `E0`**, not a peer element**                                                       | Three of three comparable systems build it, which overturned "non-element". But LangChain's *model profiles* show it is a **per-task** property, not a standalone thing you construct                                                                                                                                                            |
| **C-5**  | `Agent = Model + Harness` (harness contains context) vs `Agent = harness + model + context` (context is a peer)                                                                                                                  | **Context is a peer.** `E3` stays separate from `E0`                                                 | LangChain states the three-part split directly; our structure already agreed. See `[../../references/comparisons/systems/langchain-deepagents.md](./comparisons/systems/langchain-deepagents.md)` §2                                                                                                                              |
| **C-6**  | **Is our primitive set stated?** `01-concepts.md` §3.17 says *"unanswered"*; `06-frameworks-addendum.md` §4 lists six. **Both committed**                                                                                        | **§3 states it once.** The addendum's six are adopted with one correction                            | `02-component-matrix.md`: *"you cannot claim 'one way to do each thing' until you can name the things."* Leaving it blank was the finding; leaving it blank *twice, differently* is just drift                                                                                                                                                   |
| **C-7**  | **Rituals** — dismissed on frequency (`standup` 0, `ceremon` 0, `ritual` 1), then reopened                                                                                                                                       | `E10 Cadence` **is an element**                                                                      | The dismissal answered the wrong question and applied **two thresholds to two concepts** — `multiplayer` (6) was called *"real"*, Rituals (1) dead. A ritual is not a meeting; it is **a scheduled loop that emits an artifact**, and the corpus supports that: cron reviews, scheduled checks, `transcri` 12. `J17` **has no input without it** |
| **C-8**  | **Stewardship** — agent or gate? (`OPEN-9`)                                                                                                                                                                                      | **Agent, over an evidence corpus**                                                                   | No longer a design question. **LangSmith Engine is a shipped implementation**: a background agent that reads traces, files issues with linked evidence, and proposes changes to prompt, context and harness. `generic-cerebro`'s tier split (agent over `wiki/`, gate over `decision-log/`) remains the finer answer                             |
| **C-9**  | **Job layers (7) vs element bands (4)**                                                                                                                                                                                          | **Five bands**, adding `IMPROVE`                                                                     | Four of the six homeless jobs cluster in one layer. `03-jtbd.md` §4: *"not four separate gaps — one gap with four names"*                                                                                                                                                                                                                        |
| **C-10** | **The 14 factors cover only** `J1`**–**`J12`**.** `J13`–`J17` have no factor; factor `I` has no job                                                                                                                              | **Recorded as a live seam**, §8                                                                      | Not resolvable here — it is a change to `05-harness-factors.md`. Stating it beats silence                                                                                                                                                                                                                                                        |
| **C-11** | `OPEN-2` — one element holding two systems at different maturity (`E3` Fabric/Briefing, `E5` Standards/Catalog)                                                                                                                  | **Grade at the system level, roll up as the minimum**                                                | The third option the previous draft named and did not take. It is the only one consistent with *minimum-governs*: a stage-0 Briefing should drag `E3` to 1, not average to 2                                                                                                                                                                     |
| **C-12** | `OPEN-3` — should there be nine?                                                                                                                                                                                                 | **Twelve.** Every addition closes a homeless job                                                     | The count grew because the *jobs* grew from 12 to 17, not because the model inflated. `E7`+`E8` remains the strongest merge candidate if it must shrink                                                                                                                                                                                          |


**Still open, and marked as such:** `C-3` (the `Substrate` name), `C-10` (the factor seam), and
`OPEN-12` (does Planning deserve its own element — see §8).

---



## 3. Primitives — the sanctioned units

A **primitive** is *"a minimal, named, composable unit that the harness makes the single sanctioned
way to express something"* — `01-concepts.md` §3.17. **The defining property is not what it does; it
is that there is one of it.**

> *"A human offered three ways to run tests picks one and remembers. **An agent offered three ways
> picks differently each session, or invents a fourth.**"*

**Ours, stated once (resolves** `C-6`**):**


| Primitive              | The one sanctioned way to express…       | Element |
| ---------------------- | ---------------------------------------- | ------- |
| **registry entry**     | that a repo exists and who owns it       | `E2`    |
| **context bundle**     | what an agent was given, at what version | `E3`    |
| **work contract**      | a unit of work and its dependency edges  | `E4`    |
| **capability package** | a distributable unit of how we work      | `E5`    |
| **risk tier**          | how dangerous an action is               | `E6`    |
| **evidence bundle**    | that something happened, provably        | `E7`    |


Six, which is inside the five-to-seven range every real primitive set occupies — *"a set that grows
without bound is a feature list wearing the word."*

**The correction to the addendum's list:** it is a set of **six**, not a claim of completeness. Three
elements — `E9 Roster`, `E10 Cadence`, `E11 Instrumentation` — **have no primitive yet**, and that is
the honest reading of why they are the three nobody provides. A primitive is what you get *after* the
convention graduates (`J16`), not before.

**How peers compare** — the crispest sets force a choice rather than accommodating one:


| System                     | Primitives                                                                |
| -------------------------- | ------------------------------------------------------------------------- |
| **Claude Code**            | skill · subagent · hook · plugin · MCP server · settings · agent team     |
| **LangChain / DeepAgents** | **middleware** · model profile · sub-agent · skill · sandbox · filesystem |
| **Gas City**               | formula · agent · **bead** · order · pack · Event Stream                  |
| **QM**                     | **scope** · posture · adapter                                             |
| **FRACTAL**                | BLUEPRINT · workstream · PRD · HANDOFF · PULSE                            |


---



## 4. Taxonomy — what a harness *does*

Genre A: **functions**. The seventeen jobs in
`[03-jtbd.md](./comparisons/03-jtbd.md)`, which were measured against a corpus rather
than asserted. Not repeated here; the mapping to elements is what this document owes.

**All seventeen are now placed.** Six had no element and two were miscovered:


| Job                               | Was              | Now                                                                  |
| --------------------------------- | ---------------- | -------------------------------------------------------------------- |
| `J13` choose the ground           | `E0`             | `E0` — both sub-decisions, model **and** runtime                     |
| `J1` compose context · `J8` prove | `E3` · `E3`+`E7` | unchanged                                                            |
| `J2` remember                     | `E3` ⚠️          | `E3`, as the **write** sub-decision — where individual-vs-team lives |
| `J4` decompose                    | `E4`             | unchanged                                                            |
| `J7` **recover**                  | **none**         | `E4` — retry, escalation and self-heal are control flow              |
| `J3` route                        | `E4`             | `E4`, **resolving against** `E9`                                     |
| `J10` distribute                  | `E5`             | unchanged                                                            |
| `J14` **know who exists**         | **none**         | `E9 Roster`                                                          |
| `J5` bound                        | `E6`             | unchanged                                                            |
| `J6` validate                     | `E7` `E8`        | `E7`, and `E10` when scheduled                                       |
| `J15` **secure and harden**       | `E6` ⚠️          | `E6`, widened from *permission* to *permission + hardening bar*      |
| `J11` **coordinate humans**       | **none**         | `E1` (channel) + `E10` (rhythm)                                      |
| `J9` compound                     | `E8`             | unchanged                                                            |
| `J16` **raise the floor**         | **none**         | `E8` — graduating convention into the sanctioned way                 |
| `J17` **diagnose the bottleneck** | **none**         | `E11`, fed by `E10`                                                  |
| `J12` **account**                 | **none**         | `E11`                                                                |


**Where** `J17` **gets its input.** `03-jtbd.md` states the dependency and strands it: *"*`J17` *requires*
`J12 account` ***and ritualized checks**."* Nothing produced that measurement because Rituals had been
ruled out. `E10 Cadence` is that producer. **If cadence is not modelled, the Grid computes a
bottleneck that nothing ever refreshes.**

---



## 5. Components — what a harness is *made of*

Distinct from §4: a function is something performed; a component is something present. The published
component lists, side by side, with what each **omits**:


| Source                   | Components                                                                                              | Omits                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **AAIF**                 | Control Flow · Environment Access · State & Memory · I/O Shaping · Observability                        | permissions, validation, recovery, cost, coordination, distribution |
| **Meng et al.**          | Execution Loop · Tool Registry · Context Manager · State Store · Lifecycle Hooks · Evaluation Interface | policy, cost, distribution, people                                  |
| **LangChain DeepAgents** | Execution environment · Delegation · Steering · Context management                                      | **policy, evidence, distribution, roster, cost**                    |
| **Macedo**               | `T1` loop · `T2` tools · `T3` context · `T4` **a control independent of the model**                     | — (an inclusion test, not an inventory)                             |


**The pattern across all four is the finding.** Every published component list stops at the boundary
of one agent doing one task. **Nothing above that line is a component of a harness as the field
defines it** — see §9.

### The mechanism layer: where you insert things

LangChain is the only source that says **where in the loop** you customise, rather than what a
harness contains. This is the verb-bounding that
`[04-primitives-ontology-platform.md](./comparisons/2026-08-research/04-primitives-ontology-platform.md)`
§5 says is the durable half of ontology:


| Insertion point             | What goes there                           | Our element         |
| --------------------------- | ----------------------------------------- | ------------------- |
| before the agent is invoked | setup, environment                        | `E0` `E3`           |
| before each model call      | **summarization**                         | `E3` (compress)     |
| wrapping the model call     | prompt caching, **model profiles**        | `E0` `E3`           |
| wrapping the tool call      | **context offloading**, permission checks | `E3` (write) · `E6` |


Claude Code's 29 lifecycle events and DeepAgents' middleware are the same design reached
independently. **An insertion point is mechanically checkable in a way an abstract noun is not** —
which is why this table, not §5's inventories, is what a conformance check can be written against.

### And the context bucket decomposes

`E3` was one of the two oversized elements. The field already split it — **Lance Martin's four
verbs**, with **Anthropic's** techniques as the fill:


| Verb         | Techniques                                       | Job       | Where our maturity actually diverges                  |
| ------------ | ------------------------------------------------ | --------- | ----------------------------------------------------- |
| **write**    | structured note-taking, agentic memory           | `J2`      | the individual-vs-team boundary — uncovered until now |
| **select**   | just-in-time retrieval, the Briefing, provenance | `J1`      | **the Briefing does not exist**                       |
| **compress** | compaction, tool-result clearing                 | `J1`      | native, and improving fast — least differentiated     |
| **isolate**  | sub-agents, path-scoped rules                    | `J1` `J5` | where context engineering becomes a bound             |


This is `C-11`'s resolution made concrete: **grade the four sub-decisions, roll up as the minimum.**
`E3` graded "2" was hiding a zero.

## 6. The elements

Each entry carries: the definition · the *"how do we work?"* answer a human can say out loud · the
systems · the artifact you point at · who provides it.

Provider values: **native** (Claude Code ships it) · **gstack** · **Gas City** · **QM** ·
**LoomWarp** · **you** (nobody ships it; it is your team's answer).

---



### Band: GROUND — *what we run on*

Decided rarely, by a platform owner or lead. Highest blast radius. Failure mode: **lock-in.**

---



#### `E0 Substrate` — the harness layer

> **Definition.** The runtime an agent executes in, and the adapter layer that keeps your work
> portable across more than one of them.
>
> **How do we work?** *"We run on Claude Code. Our capabilities are written so they'd survive a move,
> and here's what we'd lose."*

Garry Tan's equation is the cleanest statement of why this is an element at all:

> **frontier model** (rented, commoditized) **+ your context** (owned, unique) **+ a harness**
> = an agent acting as a fast version of you.

Two of the three terms are things you own. The harness is the one you choose, and choosing it badly
is the one mistake that constrains every element below.

**The model is named here, and that reverses a prior call (**`C-2`**).** `01-concepts.md` §3.1 excluded it
as *"an input to* `E0`*, deliberately not an element."* The argument was that *deterministic control,
probabilistic labor* makes the worker substitutable by design, so it is *"not something LoomWarp
builds or owns."* **That proves the model is not built by us; it never proved it is not decided by
us** — and by the same reasoning we would drop the Harness system too, which nobody proposes. Three
things make it a real decision: the field's own equation is `Agent = Model + Harness`; `J3 route` and
`J12 account` both hang off *which model runs which job at what cost*; and model choice is already a
**quality** technique, not only a portability property — Gas City runs its code-review formula across
three models in parallel because *"each one has been trained differently and has a different point of
view."*

**And a fourth sub-decision, from LangChain: how far out of distribution is your work?**

> *"The more in distribution you are of what the models are trained on, then the better the
> off-the-shelf harness will be."*

Crucially it is **per task, not per domain** — a legal-AI team is out of distribution on legal work
and *in* distribution on editing files. DeepAgents implements this as **model profiles**, swapping the
edit-file implementation per model. **This is the question that determines both the harness answer and
the portability answer, and** `05-preflight-spec.md` **does not ask it.**


|              |                                                                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | **The Model** (which model, or models, and when to use more than one) · The Harness (which runtime) · The Adapter (what makes capability portable) · The Install (how a second person gets it) |
| **Artifact** | `.claude/settings.json`, the install script, the adapter config, the portability constraint written down                                                                                       |
| **Provider** | Harness: **native**. Adapter: **gstack** (`--host`), **Gas City** (Factory Worker Protocol), **QM** (Pi/OpenCode/Codex/Claude Code). LoomWarp: **undecided**                                   |


**Why this is new.** `references/elements.md:63` called this a deliberate non-element. Three of three
comparable systems build it as a headline primitive — see `[references.md](./v0/references.md)` §2. That
is corroboration strong enough to overturn the call.

**The honest tension.** Portability has a real price: the Agent Skills spec permits only six
frontmatter fields outside Claude Code (`name`, `description`, `license`, `compatibility`,
`metadata`, `allowed-tools`), and a disallowed field is a hard error, not a warning. Every
Claude-Code-only feature you use — `context: fork`, dynamic context injection, `paths` scoping — is
capability you are choosing over portability. **That trade should be explicit and recorded, not
discovered during a migration.** Recording it *is* the Adapter system, even if you never migrate.

---



#### `E1 Surfaces` — where work is seen and done

> **Definition.** The places work arrives, is discussed, is tracked, and is delivered — and the
> codified decision about which one is the single source of truth.
>
> **How do we work?** *"Plans live in markdown in the repo. That's the source of truth. It flows out
> to Linear and Slack; those are views, not originals."*


|              |                                                                                                                                                                                                         |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Source of Truth (the codified answer) · The Integrations (Slack, Gmail, Drive, GitHub, Linear/Jira, the wiki) · The Flow (which direction data moves, and what is authoritative when they disagree) |
| **Artifact** | A written SoT decision · MCP server config · the sync direction, stated                                                                                                                                 |
| **Provider** | Integrations: **native** (MCP) or **QM** (surfaces as plugins over one API). SoT decision: **you**                                                                                                      |


**Why this is split out of Workspace.** "Workspace" previously meant *repos*. But when an agent is
asked "what did we decide about X?", the answer might be in Slack, a Google Doc, a Linear comment, a
PR thread, or a markdown file — and if the team has not decided which of those is authoritative, the
agent cannot either. This is not a nice-to-have; it is the most common reason an agent confidently
gives a stale answer.

QM names the layer directly: *"surfaces are plugins, not the product"* — Slack, web UI, admin panel,
and public portal are all optional plugins over one HTTP API, with the same identity and
configuration carrying between them. Gas City surfaces the same question as an explicit choice
(beads vs Linear for work tracking).

**KD's recommendation, marked as a default rather than a rule:**

> Markdown plans and specs in the repository are the source of truth. They flow *outward* to
> Jira/Confluence/Linear/Slack, which are views. The reasons: they are versioned, they are diffable,
> they are what the agent reads natively, and they survive a tool migration.
>
> **This is a team choice that must be codified, not a law.** A team whose work genuinely originates
> in Linear should say so and make the repo the view. What is not acceptable is leaving it
> unstated — that is the failure mode.

---



### Band: STRUCTURE — *what we work in*

Decided by an architect, per quarter or per repo. Failure mode: **sprawl.**

---



#### `E2 Estate` — the code

> **Definition.** The set of repositories the team works across, with owners, boundaries, and
> interfaces — discoverable and routable without merging them.
>
> **How do we work?** *"We work across six repos as one workspace. Here's the registry, here's who
> owns what, here's what changes in A affect B."*


|              |                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Registry (what exists, who owns it) · The Workspace Resolution (how an agent reaches across repos) · The Routing (which repo a piece of work belongs to, and what it impacts) |
| **Artifact** | `registry/repositories.yaml`; per-package `CLAUDE.md` and settings; a documented layout                                                                                           |
| **Provider** | Workspace resolution: **native** (`additionalDirectories`, `--add-dir`, `worktree.sparsePaths`, nested discovery). Registry + routing: **LoomWarp** or **you**                    |


Claude Code's monorepo guide is effectively the official description of the virtual-monorepo pattern
— see `references/claude-code/07-context-and-memory.md`. What it does not do is **cross-repo impact
analysis**: nothing native knows that a change in A affects B. That is the registry's differentiated
job, and the reason this element survives rather than dissolving into native config.

**One hard constraint worth stating here because it breaks control-plane designs:** project settings
in `.claude/settings.json` load **only from the starting directory** and are not inherited from
parent directories the way `CLAUDE.md` files are.

---



#### `E3 Context` — what the agent knows

> **Definition.** Layered, owned, versioned knowledge served to an agent as a resolvable bundle with
> provenance and freshness — not a folder it happens to be able to read.
>
> **How do we work?** *"Every job gets a briefing. We can show you exactly what the agent saw, at
> which version, and reconstruct it later."*


|              |                                                                                                                                                                                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | **The Context Fabric** — the authored layers: org → domain → repo → package · **The Briefing** — the per-job resolved bundle with hashes, versions, and owners                                                                                                                                                       |
| **Artifact** | Fabric: `CLAUDE.md`, `.claude/rules/`, per-package files. Briefing: a manifest per run, joined to that run's outcome                                                                                                                                                                                                 |
| **Provider** | Fabric: **native** — and native is *good* here (path-scoped rules, lazy nested loading, `claudeMdExcludes`, auto memory). Briefing: **LoomWarp only** — *narrowed 2026-08-26: the **idea** is claimed (OpenAI's "run receipt"); no implementation was demonstrated. See* `references/comparisons/00-README.md` *F-4* |


> **⚠️ Evidence that cuts against this element's premise, added 2026-08-26.** `E3` assumes layered,
> owned, versioned knowledge is better than less of it. The best available study says that is wrong
> past a threshold. Gloaguen, Mündler, Müller, Raychev and Vechev (ETH Zürich),
> *[Evaluating AGENTS.md](https://arxiv.org/abs/2602.11988)*:
>
> > *"providing context files does **not** generally improve task success rates, while increasing
> > inference cost by over 20% on average… while **instructions** in the context files are well
> > followed by coding agents, **repository overviews** … **are not helpful**."*
>
> A companion study found architecture context cut navigation steps 33–44% with **no significant
> difference across formats** — Markdown tied JSON and S-expressions. Formality buys error
> *detectability*, not performance.
>
> **What this changes.** The Fabric should be re-specified around **scoping, ownership and enforceable
> constraint** rather than around coverage. *Instructions* work; *overviews* cost money and do not.
> That converges with Anthropic's own large-codebase guidance, which names this exact failure —
> *"conventions drift, files go stale, and no one owns the root"* — and answers it with scoping and
> ownership rather than more documentation. It is also the strongest argument for the `Scope`
> candidate in `00-the-framework-from-agile.md` §8. **It does not touch the Briefing**, which is a
> per-job manifest of what was actually resolved, not an authored overview.
>
> *Confirm the arXiv ID before external citation — two research briefs gave different numbers; see*
> `[../../references/comparisons/2026-08-research/99-source-hygiene.md](./comparisons/2026-08-research/99-source-hygiene.md)` *§2.*

**This is the element where LoomWarp has a claim nobody else is making.** Native Claude Code has the
building blocks — the `InstructionsLoaded` hook reports which instruction files loaded, when, and
why; `claude_code.plugin_loaded` reports plugin versions; the OTel event stream carries correlation
keys (`session_id`, `prompt_id`, `agent_id`, `workflow.run_id`). What no system has is **content
hashing, version pinning, owner attribution, a manifest per unit of work, and the join to that
work's outcome.**

Garry Tan independently names *provenance tracking — maintaining source attribution for every fact* —
as a core practice. The prior AI-native rubric names context provenance as the single most-cited gap
in its own self-grade. Two independent sources reaching the same conclusion is the strongest signal
in this document.

---



#### `E9 Roster` — who exists, human and agent

> **Definition.** The model of who does the work — people and agents in one list — what each may do,
> and who answers for the result.
>
> **How do we work?** *"Every actor is in one roster with a scope and an accountable human. When work
> is routed, it resolves against that list."*


|              |                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Actors (who exists) · The Scopes (what each may do) · The Accountability (who answers when it goes wrong) |
| **Artifact** | A roster file; agent definitions carrying owners; RACI on the decisions each may take                         |
| **Provider** | **nobody**                                                                                                    |


**Why this is new.** `J14 know who exists` had no element, and `J3 route` **depends on it** — Tan's
line, *"a resolver is an org chart,"* presumes the chart exists. Nothing in the previous twelve jobs
said where the roster lives, who owns it, or how a human and an agent are represented in the same
model.

**The peer-reviewed precedent.** Hassan et al. (`arXiv:2509.06216`) make **actors** one of four
foundational pillars of agentic software engineering, alongside processes, tools and artifacts. Ours
was the only one of the four with no home.

**Why nobody provides it.** Identity is the closest published work — `identity` 29 in the corpus,
with Chan et al.'s attribution category and an AAIF working group — but that is *authentication*, not
*a team's model of who is on it*. The gap is real and it is upstream of routing.

---



### Band: MOTION — *how work moves*

Decided by the team, per epic. Reversible. Failure mode: **inconsistency.**

---



#### `E4 Control` — how work is scoped and sequenced

> **Definition.** Deterministic decomposition, dependency resolution, and dispatch of scoped work,
> with no model in the decision loop.
>
> **How do we work?** *"Intent goes in, a dependency graph comes out, workstreams dispatch in order,
> and nothing starts before its dependencies land."*


|              |                                                                                                                                                                                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Decomposition (intent → scoped units) · The Dependency Graph · The Dispatcher · **The Recovery** (bounded retry, escalation, self-heal)                                                                                                                                   |
| **Artifact** | A blueprint, a workflow script, a task graph with real edges                                                                                                                                                                                                                  |
| **Provider** | **native** — agent teams (task dependencies with file-locked claiming and automatic unblocking) and dynamic workflows (`pipeline()`, resumable, 16 concurrent / 1,000 per run). Also **Gas City** (formulas, beads, orders) and **QM**. LoomWarp: `router.py` + `dispatch.py` |


`J7 recover` **lands here (**`C-9`**).** Retry, escalation and self-heal had no element and were left
with *"nearest is* `E4 Control`*."* They are control flow: the same dependency graph that decides what
runs next decides what happens when a step fails. Factor **IX** — *escalation carries a proposed
decision* — governs it, and the escalation is only meaningful because the graph knows what is blocked.

**The honest read.** This is where the native layer moved most between LoomWarp's architecture being
set and today, and it is the element most worth re-examining rather than defending. What native does
*not* have is **durable execution across process death** — workflows resume only within a session,
and agent teams do not restore in-process teammates on `/resume`. That gap is real and is the
legitimate argument for a control plane. It is a different problem from dependency resolution, and
only the first is unsolved.

---



#### `E5 Capability` — what the team can do

> **Definition.** The catalog and the standards — packaged, versioned, distributable units of *how we
> work* and *what good looks like*, with owners and no hard dependency on a hub's filesystem.
>
> **How do we work?** *"Our review checklist, deploy runbook, and testing patterns are versioned
> capabilities. Any repo installs them; they update centrally."*


|              |                                                                                                                                                                                                                                        |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | **The Standards** — *what good looks like*: engineering principles, definition of done, testing patterns, evaluation doctrine, CI/CD · **The Catalog** — *how it travels*: skills, agents, plugins, marketplace, versioning, ownership |
| **Artifact** | Standards: `standards/` with an inheritance contract. Catalog: `marketplace.json`, `enabledPlugins`, pinned versions                                                                                                                   |
| **Provider** | Catalog: **native** (plugins, marketplaces, SHA pinning, semver dependencies, `renames` for removal), **gstack**, **QM**. Standards: **LoomWarp** or **you** — nobody ships this                                                       |


**The split matters and hides a real signal.** LoomWarp's Standards tier is ~970 lines across seven
guides with a genuine inheritance contract (*reference never copy*, *tighten never contradict*) —
that is mature work. Its Catalog is a `cp -r` loop with a known defect where a deleted skill stays
installed forever. Grading E5 as a single number averages a 4 and a 2 into a 2, and the standards
work disappears.

**Nobody ships the Standards system.** Not Claude Code, not gstack, not Gas City, not QM. gstack
encodes *process* opinion (`/office-hours` → `/plan-eng-review` → `/qa` → `/ship`), which is adjacent
but different: it tells you the sequence, not the bar. This is genuinely unclaimed ground.

---



### Band: TRUST — *why we trust it*

Decided by lead and org, continuously. Cheap to add; expensive to have skipped. Failure mode:
**"it said it was done."**

---



#### `E6 Policy` — what is allowed

> **Definition.** What an agent may do — decided outside the prompt, enforced at a point the model
> cannot reach, and recorded as a structured decision — **and the bar the output must clear before it
> is allowed to ship.**
>
> **How do we work?** *"Agents can't touch production or read secrets. That's enforced by the
> harness, not by asking nicely, and every denial is logged."*


|              |                                                                                                                                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Boundaries (rules) · The Enforcement (the point the model cannot reach) · The Escalation (what happens on denial) · **The Hardening Bar** (vulnerability surface and the quality long tail) |
| **Artifact** | `permissions.deny` rules, `PreToolUse` hooks, managed settings, the denial events                                                                                                               |
| **Provider** | **native**, comprehensively — and this is worth internalizing                                                                                                                                   |


`J15 secure and harden` **lands here, and it widens the element (**`C-9`**).** `03-jtbd.md` marked it
`E6` ⚠️ because *"*`E6` *covers permission; nothing covers vulnerability or code quality."* It is
widened rather than split, because both halves answer *what is this allowed to become* and both are
enforced at the same place — a gate. **The two halves fail differently, and that is worth stating:**
`J5 bound` fails as a **breach**, visible and immediate; `J15` fails as **a slow accumulation nobody
notices** — Osmani's *comprehension debt*.

⚠️ It carries the corpus's second-largest unmodelled signal — `security` **62**, with its own
conference track, and **absent from every published harness taxonomy.** A team that graded `E6` on
permissions alone would score well while shipping the long tail.

The enforcement ladder, cheapest first, from `references/claude-code/08-policy-and-governance.md`:


| Layer                   | Binds                                                          | Cost             |
| ----------------------- | -------------------------------------------------------------- | ---------------- |
| Permission `deny` rules | Built-in tools + recognized Bash file commands                 | Nearly zero      |
| `PreToolUse` hooks      | Anything decidable in a script; can deny **and rewrite input** | Zero context     |
| Managed settings        | All of the above, non-overridably                              | Admin deployment |
| Sandbox                 | **Arbitrary subprocesses**                                     | OS-level setup   |


QM independently arrives at a three-posture model — **strict / auto / dangerous** — with the rule
that *narrower scopes can only tighten, never loosen*. That monotonic-narrowing property is the same
invariant as deny-wins-from-any-scope. Two systems converging on it independently suggests it is the
right invariant.

**The uncomfortable part:** this is the element where the enforcement is essentially free and teams
skip it anyway, because nothing visibly breaks until something does. It is the most common thinnest
warp section.

---



#### `E7 Evidence` — how we know it happened

> **Definition.** The ledger. Every claim points at an artifact: structured events, evidence bundles,
> handoffs, evaluations, traces. Completion is proven, never asserted.
>
> **How do we work?** *"'Done' means the tests ran and here's the record. We can show cost per
> workstream and every permission decision."*


|              |                                                                                                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Systems**  | The Event Stream · The Verdict (typed, schema-validated results rather than parsed prose) · The Trace (the agent tree, joined) |
| **Artifact** | OTel metrics/events/spans; `--json-schema` results; evaluation records                                                         |
| **Provider** | **native**, more than most people realise                                                                                      |


Native OpenTelemetry emits cost and tokens attributed by `agent.name`, `skill.name`, `plugin.name`,
`marketplace.name`, `mcp_server.name`; a full permission audit trail (`claude_code.tool_decision`
with `decision` and `source`); skill activation records; and beta distributed traces with
`agent_id`/`parent_agent_id` reconstructing the whole agent tree. Gas City has an **Event Stream** as
a named primitive; QM keeps durable state in Postgres on the principle that *"nothing important lives
only in a model's context window."*

**What is missing everywhere is the join to E3.** The correlation keys exist. Nothing writes the
joined record of *context set → outcome*, and nothing reconstructs it. **E3's Briefing and E7's
Verdict are one piece of work**, and together they are the differentiated claim.

---



### Band: IMPROVE — *work done on the harness itself, not on a unit of work*

Decided by whoever owns the harness, continuously. Failure mode: **stagnation.**

**This band is why the count grew.** `E0`–`E7` all act *for a unit of work*. These three act *on the
system that produces units of work*, and every published instrument omits them — a gap
`03-jtbd.md` attributes to *"Voss's system and oversight loop"* and admits **we reproduced.** It is
also the only band whose output re-enters the map.

---



#### `E10 Cadence` — what runs on a schedule, and what it emits

> **Definition.** The checks that run without being asked, and the artifact each run leaves behind.
>
> **How do we work?** *"Review runs nightly, quality checks run on hooks, and each one emits a record.
> That record is what the bottleneck report reads."*


|              |                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Schedule (what runs, how often) · The Emission (what artifact each run leaves) · The Read (who consumes it) |
| **Artifact** | cron and hook configuration; the emitted records themselves                                                     |
| **Provider** | Triggers: **native** (hooks, scheduled sessions). The emission contract: **you**                                |


**Why this reverses a closed decision (**`OPEN-8`**,** `C-7`**).** Rituals were dismissed on corpus
frequency — `standup` 0, `ceremon` 0, `ritual` 1, and one talk titled *"Agents Don't Do Standups."*
That measured **the wrong thing**, and it applied two thresholds to two concepts: `multiplayer` (6)
was called *"real but emerging"* while Rituals (1) was called dead.

**A ritual is not a meeting. It is a scheduled loop that emits an artifact** — and the corpus supports
*that* directly: cron-triggered reviews, scheduled quality checks, nightly maintenance,
`transcri` 12. Transcription is what made the meeting machine-readable; the cadence is what makes it
repeatable.

**The stakes are higher than the count.** `J17 diagnose the bottleneck` requires measurement, and
measurement means scheduled checks. **Without this element,** `J17` **has no input** — which is the best
available explanation for why the Grid computes a bottleneck that nothing refreshes.

---



#### `E8 Learning` — how it gets better

> **Definition.** Evaluated outcomes **promote** versioned changes back into Context and Capability,
> under owner approval, with rollback.
>
> **How do we work?** *"When a review finds the same class of bug twice, it becomes a rule. Changes
> to how we work are reviewed and revertible."*

**Narrowed 2026-08-27 (**`C-9`**).** This element **promotes**; it does not **measure**. `J16 raise the floor` — graduating a working convention into the single sanctioned way — belongs here, because it is
a promotion and it is *the mechanism that creates primitives*. `J12 account` and `J17 diagnose` are
readings, not promotions, and moved to `E11 Instrumentation`. Collapsing the two is how a system ends
up claiming a learning loop with nothing to learn from.


|              |                                                                                                                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Eval Corpus · The Promotion Gate (approval + rollback) · The Retirement path (capabilities that stop earning their keep)                                                                                                                  |
| **Artifact** | `evals.json`, `grading.json`, `benchmark.json`; a promotion record; usage telemetry                                                                                                                                                           |
| **Provider** | Corpus: **native** (`skill-creator` — isolated per-case runs, assertion grading with evidence, with/without benchmarking, blind A/B, description tuning) + subagent `memory:` scopes. Promotion gate and retroactive invalidation: **nobody** |


**This element is further along than "designed only" suggests**, because the substrate arrived
natively. `skill-creator` is a working implementation of the eval pyramid `standards/evaluation-doctrine.md`
describes. What remains genuinely unbuilt anywhere is *promotion with rollback* and *retroactive
invalidation of an accepted result* — and those are correctly placed at the far end of the maturity
scale.

---



#### `E11 Instrumentation` — what it costs, and what limits us

> **Definition.** What the harness measures about itself: what a unit of work cost, what it returned,
> and which constraint is currently binding.
>
> **How do we work?** *"We know what a workstream costs, we know our throughput, and we can name the
> one thing limiting us this month."*


|              |                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Accounting (cost and return per unit of work) · The Constraint (which element is the minimum) · The Join (cost tied to outcome, not to a run) |
| **Artifact** | cost and latency recorded per unit of work, joined to its outcome; the named bottleneck                                                           |
| **Provider** | **nobody at this altitude**                                                                                                                       |


**Why it is separate from** `E8 Learning`**.** Learning *promotes* — it graduates a convention into the
sanctioned way. This *measures*. `J16 raise the floor` is a promotion and belongs to `E8`; `J12 account` and `J17 diagnose` are readings and belong here. Collapsing them is what let a system claim
a learning loop with nothing to learn from.

**The claim, narrowed 2026-08-27.** `03-jtbd.md` calls `J12 account` **OURS** — *"the sharpest cell
in the document"* — on the grounds that nobody joins cost to outcome. **That is now too strong.**
LangSmith tracks feedback score, latency and tokens per experiment and per task, and Chase states it
plainly: *"you probably don't just care about accuracy. You also probably care about latency and
cost."* Debois says *"cost-aware"*; Agent Cloud Stack gives economics a layer.

**What survives, and it is worth defending:** cost as a first-class signal **at the team-system
altitude, joined to a unit of work rather than to an eval run.** Everyone measures the cost of an
experiment. Nobody measures what a *workstream* cost the team, or joins that to whether it shipped.

---



## 7. Factors — how the elements are governed

Elements and factors are different objects, and the corpus is explicit about it: **elements are
implemented and graded; factors are held.** Genre B and Genre C. The fourteen factors live in
`[../../references/comparisons/2026-08-research/05-harness-factors.md](./comparisons/2026-08-research/05-harness-factors.md)`;
what this document owes is the mapping.


| Element               | Governing factors                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `E0 Substrate`        | **I** one way to do each thing                                                                    |
| `E1 Surfaces`         | **XIII** work is addressable by the whole team                                                    |
| `E2 Estate`           | **XII** capability travels without the hub                                                        |
| `E3 Context`          | **III** context is instruction, not overview · **IV** memory routes by ownership                  |
| `E4 Control`          | **II** route deterministically · **VI** declare the edges · **IX** escalate with a recommendation |
| `E5 Capability`       | **XII** capability travels without the hub                                                        |
| `E6 Policy`           | **V** scope only narrows · **VII** the gate does not run on the model                             |
| `E7 Evidence`         | **VIII** feedback is addressed to the machine · **X** every claim points at an artifact           |
| `E8 Learning`         | **XI** knowledge compounds or it is not knowledge                                                 |
| `E9 Roster`           | **— none**                                                                                        |
| `E10 Cadence`         | **— none**                                                                                        |
| `E11 Instrumentation` | **XIV** cost is a first-class signal                                                              |


**⚠️ The seam (**`C-10`**), stated rather than hidden.** The fourteen factors were written against
`J1`–`J12`. `J13`**,** `J14`**,** `J15`**,** `J16` **and** `J17` **have no factor**, and factor `I` has no job — it is
declared meta. Two of the three new elements are therefore ungoverned.

That is not a defect in the elements; it is a gap in the manifesto, and it matters because the
explainer is planned as *"one content file per factor."* **A manifesto silent on the five newest jobs
is silent on exactly the material the research found least modelled anywhere.** Closing it is a change
to `05-harness-factors.md`, not to this file.

**Note the shape of the hole:** the missing factors are all about *who* (`J14`), *when* (`J11`),
*how hard* (`J15`), and *getting better* (`J16`, `J17`). The fourteen are a manifesto about **doing a
unit of work well**. They have very little to say about **running a team.**

---



## 8. The expansion — from a software harness to the work of a company

**The pattern in §5 is the thesis.** Every published component list stops at the same boundary:

```
   LangChain / DeepAgents   execution env · delegation · steering · context mgmt
   AAIF                     control flow · env access · state · I/O · observability
   Meng                     loop · tools · context · state · hooks · evaluation
   ─────────────────────────────────────────────────────────────────────────────
   everything above this line is one agent doing one task
   ─────────────────────────────────────────────────────────────────────────────
   E1 Surfaces        where the team sees the work
   E2 Estate          more than one repo
   E5 Capability      getting it to another person
   E6 Policy          what the team permits
   E7 Evidence        proving it to someone who did not watch
   E9 Roster          who else is on this
   E10 Cadence        what happens when nobody is watching
   E11 Instrumentation  what it cost the business
```

**None of those are oversights.** They are *out of scope for a software harness*, correctly. Chase
puts policy, evidence and cost in a **separate product** (LangSmith), not in DeepAgents — and that
separation is the honest architecture for the altitude he is working at.

**Our framework starts at that line and expands outward.** Each element above it is a place where a
decision stops being about *the agent* and starts being about *the company*:


| The software question           | The company question                                       | Element |
| ------------------------------- | ---------------------------------------------------------- | ------- |
| what tools can this agent call? | what is this **team** permitted to do, and who signed off? | `E6`    |
| did the run succeed?            | can a person who was not there **believe** it?             | `E7`    |
| what did this eval cost?        | what did this **workstream** cost, and did it return?      | `E11`   |
| which sub-agent handles this?   | which **person or agent** is accountable?                  | `E9`    |
| where is the file?              | which **surface** is authoritative when two disagree?      | `E1`    |
| how do I install this skill?    | how does it reach **another team's repo**, versioned?      | `E5`    |


**This is the altitude claim, restated as a direction rather than a gap.** `06-frameworks-addendum.md`
§5.4 makes it a hole — *"the instrument that grades the structure a team works inside does not exist."*
Stated as an expansion it is more useful and more falsifiable: **we are taking a component list that
stops at one agent and one task, and carrying each component outward until it describes how a company
works.**

Two consequences worth stating plainly:

- **It bounds the framework.** `03-jtbd.md` asks whether the framework assumes software — `J10`
distributes to *repos*, `J8` proves against *commits*, `J15` hardens *code*. The answer this gives:
**it starts in software because that is where the harness came from, and the expansion is what
carries it out.** The elements above the line are already deliverable-agnostic; the ones below are
not, and that asymmetry is the honest scope statement.
- **It predicts where the vendors go.** Slack, GitHub, Linear and Notion are all pushing *upward*
across that same line, from surface toward planning and coordination. `08-providers.md` ‡ — not yet
written — is where that gets evidence and a falsifier.

---



## 9. The provider view

The same twelve, read as *"who should build this?"* This is the table the pre-flight generator walks,
and the one that makes coexistence structural.


| Element                 | Recommended provider for most teams                                               | LoomWarp's differentiated role                                           |
| ----------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| E0 Substrate            | **native** + write the portability constraint down                                | The constraint, recorded                                                 |
| E1 Surfaces             | **native** (MCP) + **you** decide SoT                                             | The SoT decision as a codified, checkable artifact                       |
| E2 Estate               | **native** config                                                                 | Registry-driven routing and cross-repo impact analysis                   |
| E3 Context              | **native** fabric                                                                 | **The Briefing — the differentiation**                                   |
| E4 Control              | **native** teams/workflows                                                        | Durable execution across process death                                   |
| E5 Capability           | **native** marketplace                                                            | **The Standards tier — unclaimed by everyone**                           |
| E6 Policy               | **native**, fully                                                                 | Risk tiering; policy as a versioned, distributable artifact              |
| E7 Evidence             | **native** OTel                                                                   | **The join to E3**                                                       |
| E8 Learning             | **native** `skill-creator`                                                        | Promotion with rollback                                                  |
| **E9 Roster**           | **nobody**                                                                        | Unclaimed. Identity work exists; a team's model of who is on it does not |
| **E10 Cadence**         | Triggers **native** (hooks, scheduled sessions); the emission contract is **you** | Unclaimed at this altitude                                               |
| **E11 Instrumentation** | **nobody** at team altitude; LangSmith and Harbor at the eval altitude            | Cost joined to a *unit of work*, not to an eval run                      |


**Three of twelve have no provider at all** — `E9`, `E10`, `E11` — and they are the three newest. The jobs analysis, the instrument survey and this table reach that finding independently, from three directions.

**Four rows carry LoomWarp's real claim:** the Briefing (E3), the Standards (E5), the join (E7), and
promotion with rollback (E8). Everything else is a recommendation to adopt something that already
exists — which is the honest answer and a better product than pretending otherwise.

---

*Next:* `[03-maturity.md](./v0/03-maturity.md)` *— how a team grows along these, and where the thresholds
are.*

---



# KD Thoughts and mental model:

- so far it feels like some of this will feel too abstract and expansive for most individuals.  we need to provide a "holistic view" but also consider how to make this 'grok-able' for an audience where they can see it and instantly relate to what is being presented. 
- the elements are likely correct but this feels a little unrecognizable to someone looking to understand this at a high-level since we're basically decomposing some of what might be at a mature enterprise framework like "Scaled Agile Framework" (SAFe 6.0) into a simple "agile" or "lean startup" model infographic.

