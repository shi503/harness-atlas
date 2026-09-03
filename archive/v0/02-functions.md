---
title: "The functions — a harness from first principles"
tier: spec
project: loomwarp
created: "2026-08-11"
updated: "2026-08-27"
respec: "2026-08-27"
status: ARCHIVED
owner: KD
supersedes: archive/02-elements.md
---

# The functions

**What this is.** What a team-scale harness must *do*, derived rather than inherited. **Twelve
functions**, in five bands, each a decision a team makes and can be graded on — and, for each, what
plugs in to perform it.

**Why it was re-spec'd on 2026-08-27.** The predecessor,
[`../archive/02-elements.md`](../02-elements.md), carried **four vocabularies for one unit**:

| Vocabulary | Where | What it claimed to be |
|---|---|---|
| Elements `E0`–`E11` | that file, §6 | the model |
| Jobs `J1`–`J17` | [`03-jtbd.md`](../../comparisons/03-jtbd.md) | *"Genre A: **functions**"* (its own §4) |
| Components, 18 | [`02-component-matrix.md`](../../comparisons/02-component-matrix.md) | *"a function is something performed; a component is something present"* (its own §5) |
| Concepts, 17 | [`01-concepts.md`](../../comparisons/01-concepts.md) §3.x | the definitions |

That distinction never survived contact with a reader, and the corpus said so out loud:
*"element/concept/component are all trying to convey the same thing — a function and capability of the
harness. The component itself might be something like llm-wiki, but in the system it's the memory."*

**That sentence names the missing axis.** The predecessor had a provider view (its §9), but its values
were `native · you · LoomWarp · nobody` — a build-versus-buy attribution. It never named gbrain, an OKF
wiki, or a decision ledger as **things that plug in**, and it defined no contract they could plug into.
A model that cannot say *what fills a function* cannot answer the question a team actually asks.

**The order this is built in**, and it is deliberate: **primitives → functions → scopes → providers.**
[`06-frameworks-addendum.md`](../../comparisons/2026-08-research/06-frameworks-addendum.md)
§0 warns that mapping one kind of object onto another is *"a translation, not an identity."* Building
them in order is how the translation stays visible.

> **IDs are stable identifiers, not sort order.** `F0`–`F11` map 1:1 onto the archived `E0`–`E11` — no
> re-ordering, no merges, no splits. The rename is a vocabulary change, not a model change. Crosswalk:
> [`../archive/00-README.md`](../00-README.md). **Read the band table, not the numbers, for
> order.**

---

## 0. The ruling — four vocabularies, one unit

**FUNCTION is the unit.** Everything else is a view of it, or a thing that fills it.

```
FUNCTION   what the harness must do          F0–F11
SCOPE      for whom, and over what           individual | team  ×  project | org
PROVIDER   what plugs in and performs it     native · gbrain · OKF · decision-ledger · LoomWarp · you
```

**A provider implements one or more functions, at one or more scopes, against a declared contract.**
That relation is the whole addition. It is what *"you can plug in gbrain, llm-wiki, or the decision
ledger"* means when written down.

### 0.1 What happens to the other three vocabularies

None is deleted. Each is demoted to the view it was always doing well.

| Was | Becomes | Why it survives |
|---|---|---|
| **Jobs `J1`–`J17`** | the **evidence layer** for a function — measured attention, modelled or not | The CORE/OURS line in [`03-jtbd.md`](../../comparisons/03-jtbd.md) was **measured against a 562-session corpus rather than asserted.** It is the least-invented artifact we have. Demote it as a *vocabulary*; never as evidence. **IDs unchanged** |
| **Components, 18** | **sub-functions** where they decompose a function; **provider coverage** where they score a system | The five context rows — `Individual memory`, `Team memory`, `Context assembly`, `Capture loop`, `Provenance → outcome join` — are sub-functions of `F3`, not peers of `Harness adapter` |
| **Concepts, 17** | the **definitions layer** | Its *"confused with"* column is the most useful thing in the corpus for a new reader and has no substitute here |

### 0.2 Why not simply rename everything to "function" and stop

Because three of the four were never competing with the unit — they were competing with *each other*
for the right to be it. The jobs measure, the components decompose, the concepts define. **Only the
**elements** claimed to be the model, so only the elements were renamed.**

### 0.3 The SCOPE model

**Scope is an axis, not a property of a store.** Four peer systems make the individual/team boundary a
first-class primitive; the predecessor had nowhere to put it, which
[`01-concepts.md`](../../comparisons/01-concepts.md) §3.6 records as *"the largest single gap
this analysis found"* and `OPEN-5` has carried since.

|  | **project** — this codebase | **org** — everywhere |
|---|---|---|
| **individual** | my notes on this repo | my preferences, everywhere I work |
| **team** | this squad, this repo | the org's canon |

**The peers disagree about which cells exist, and that disagreement is the finding:**

| System | Its scope primitive | Cells it serves |
|---|---|---|
| **gbrain** | `brain × source` — a *brain* is a database instance (personal or team); a *source* is a git repo inside it | all four, as two axes |
| **QM** | `scope` — `user:` / `channel:` / `project:`, each with its own memory, files, keychain, permissions, crons, sandbox | three named, the 2×2 collapsed |
| **Indigo HQ** | `core/` vs `personal/`, skip-on-collision symlinks | two, as an overlay |
| **generic-cerebro** | `projects/<p>/decision-log/` vs `_dev/<username>/` | two, by directory |
| **gstack** | `~/.gstack/projects/<slug>/`, slug resolved by walking to the **outermost** repo root | one, individual-by-default; team is opt-in sync |
| **SageOx** | the shared Ledger, per-repo and cross-machine | team; whether a personal scope exists is not stated |

**No two agree.** Some have two axes, some have three flat values, one has a single store with
opt-in sharing. **A model that treats scope as a property cannot represent that disagreement; one that
treats it as an axis can.** Hence the 2×2.

> **Every provider must declare which cells it serves.** Serving one cell is legal. Being unable to say
> which cell is not — that is the condition under which a fact silently lands where no teammate's agent
> can see it, which is `J2`'s recorded failure.

### 0.4 What a PROVIDER is

> **A provider implements one or more functions, at one or more declared scopes, against a contract.**

**A provider is not a system.** [`02-component-matrix.md`](../../comparisons/02-component-matrix.md)'s
columns — Claude Code, gstack, Gas City, QM, Indigo, SageOx, FRACTAL, generic-cerebro, LoomWarp — are
**process layers**: whole systems compared against each other. A provider is a **component inside one
function**. Different axis. Merging them is the genre error the addendum warns about, so the matrix does
not gain provider columns and this document does not gain system columns.

| | Process layer | Provider |
|---|---|---|
| Answers | *"what does this whole system do?"* | *"what fills this one function?"* |
| Compared in | `02-component-matrix.md` | the function's own spec |
| Example | gstack | gbrain, for `F3` at `individual × org` |

**The provider values, and what each means:**

| Value | Meaning |
|---|---|
| **native** | the harness already does it; adopting it is the recommendation |
| a **named product** | gbrain · an OKF bundle · a decision ledger · a work tracker |
| **LoomWarp** | we build it, because nobody does it at team altitude |
| **you** | it is a decision only the adopting team can make; we supply the question |
| **nobody** | unclaimed by the field. Three functions are here — see §9 |

**A function whose provider is a named product needs a contract**, or "pluggable" is a slogan. The first
one written is [`09-context-layer.md`](./09-context-layer.md) §6, for `F3`. It is the model for the rest:
a table of MUST/SHOULD obligations, each citing the peer that demonstrates it, scoreable `●◐○` without
editing the table.

### 0.5 The commitment

**This is the third numbering of the same twelve** (`N1`–`N12` → `E0`–`E11` → `F0`–`F11`), and the
second in a fortnight. Two of those were derivations landing; this one is a vocabulary ruling.

> **There will not be a fourth.** A rename costs ~550 citations across 28 files and buys clarity only
> the first time. If the model is wrong again, the fix is a new *function*, not a new *letter*. This
> paragraph exists so that a future editor has to argue with it.

`C-3` is the standing precedent: `Substrate` is recorded as unattested and **kept anyway**, because the
rename cost exceeded the clarity gained. Same test, same answer.

### 0.6 The check contract, stated here and not only in the script

`scripts/check-element-vocabulary.mjs` parses the canonical names from **§1's map block**. Editing that
block is how a function is renamed.

> **This file is checked against itself.** It did not used to be. The scan loop opened
> `if (rel === SPEC || exemptionFor(rel)) continue;` — the one document the vocabulary was parsed from
> was the one document never validated against it, which is how the predecessor came to read `E0` as
> *Intelligence* in its §1 and as *Substrate* in its §6 simultaneously, with every check green.
>
> **Fixed 2026-08-27** (`C-13`): the self-exemption is gone, and the map parse is anchored on the §1
> heading rather than *"the first fenced block"* — §0 now carries a fenced diagram too, and first-fence-wins
> would have silently parsed the wrong one. The check also now reports a stale `E<n>` prefix as an error
> rather than ignoring it.
>
> **A validator that cannot see its own source cannot detect drift at the source, only downstream of it.**

---

## 1. The map

**Read from the bottom.** This is an architecture: a foundation, then up and out. Nothing at a layer
can be chosen before the layers beneath it are settled — you cannot pick a Control model before you
know your Substrate, and you cannot write an adapter for a system you have not declared.

```
                                          ⟳ = the layers that accumulate      | 5-band
  ⑨  LIFECYCLE       F10 Cadence          what runs on a schedule, + emits    | LIFECYCLE
     work on the     F8 Learning         how convention graduates            | LIFECYCLE
     harness itself  F11 Instrumentation  what it costs, and what limits us   | LIFECYCLE
                          ▲
  ⑧  TRUST           F6 Policy           what is allowed, + the hardening bar| TRUST
     why we trust it F7 Evidence         how we know it happened             | TRUST
                          ▲
  ⑦  STACK           F4 Control          how work is scoped and sequenced    | PROCESS
     WORKFLOWS       F5 Capability       what the team can do, packaged      | PROCESS
     n per team      F16 Standards        what good looks like                | PROCESS
                          ▲
  ⑥  PRODUCT      ⟳  F15 Product          where outcomes land, + directives   | —
     what we deliver F2 Estate           what code exists                    | STRUCTURE
                          ▲
  ⑤  CONTEXT      ⟳  F3 Context          what the agent knows                | STRUCTURE
     what we know
                          ▲
  ④  ORG             F14 Org              accountability and decision rights  | —
     who answers     F1 Surfaces         where work is seen and done         | FOUNDATION
                          ▲
  ③  ACTORS          F9 Roster           who exists, human and agent         | STRUCTURE
     who does it
                          ▲
  ②  ENVIRONMENT     F12 Environment      the declared work environment       | —
     what we reach   F13 Adapters         adapters, middleware, hooks         | —
                          ▲
  ①  FOUNDATION      F0 Substrate        the model(s) and the runtime        | FOUNDATION
     what we run on
```

**Two partitions, one set.** The nine bands are the **architecture** — what sits on what. The right-hand
column is the coarser **five-band** grouping this document shipped on 2026-08-27, retained because
`03-maturity.md`, `04-decision-layers.md` and `05-preflight-spec.md` are all keyed to it. Full
reconciliation, and the argument for each addition:
[`11-architecture.md`](./11-architecture.md) §5. Whether both survive is `OPEN-17`.

> **KD Note, and its status.**
>
> 1. **Bottom-up visualization** — *"this is an architecture framework, so we're building a foundation
>    then up and out."* **Done 2026-08-28.** The block above reads bottom-to-top and the
>    *"decisions can only be made downward"* sentence is re-stated from the correct end. The full
>    architecture, with the mermaid rendering, is [`11-architecture.md`](./11-architecture.md) §1.
> 2. **Renaming GROUND → FOUNDATION, MOTION → PROCESS, IMPROVE → LIFECYCLE** — **done 2026-08-27.**
>    It had been applied to this block and never to §6's headings, which is how the two halves of one
>    document came to disagree. Both now match. See [`../archive/00-README.md`](../00-README.md)
>    §4.1

**`F12`–`F16` are additions, not a renumbering.** `F0`–`F11` keep their IDs and meanings exactly.
This is §0.5's rule applied — *"the fix is a new **function**, not a new **letter**"* — and the five
are argued individually in [`11-architecture.md`](./11-architecture.md) §5.1. **None of them has a
provider contract**, so none may be described as pluggable (§0.4).

`LIFECYCLE` **is the band every published instrument omits**, and omitting it is our own recorded
error — `[03-jtbd.md](../../comparisons/03-jtbd.md)` notes that these jobs are *"Voss's
system and oversight loop"* and that **we reproduced the field's omission.** It is also the only band
whose output re-enters the system.

---

## 2. The conflicts, resolved

Every contradiction found in the corpus as of 2026-08-27, with the ruling and what it rests on.
**Nothing here is edited away silently** — the losing argument is stated so a reader can disagree.


| #        | The conflict                                                                                                                                                                                                                     | Resolved                                                                                             | On what                                                                                                                                                                                                                                                                                                                                          |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **C-1**  | **Three numbering schemes.** `references/elements.md` numbered seven `E1–E7`; `../archive/02-elements.md` numbered twelve `E0–E11`, a total renumber (`E3` meant *Control* in one and *Context* in the other); this file numbers the same twelve `F0–F11`                                                                      | **This file is canonical.** Both predecessors carry banners and crosswalks; the `E→F` hop is 1:1 with no re-ordering | It is the map `scripts/check-element-vocabulary.mjs` parses. **§2.4 records the commitment not to rename a fourth time** |
| **C-2**  | **Is the model a function?** §1 of `01-concepts.md` puts **MODEL** at the bedrock; §3.1 excludes it as *"an input to* `F0`*… ✅ Correctly excluded"*; `03-agentos-harness-multiplayer.md` says *"model as bedrock, below Ground"* | **Named, inside** `F0`**, as an explicit sub-decision.** The exclusion is overturned                 | The field's own equation is `Agent = Model + Harness`. The old argument proved the model is *not built by us*; it never proved it is *not decided by us*, and a map records decisions. `J3 route` and `J12 account` both hang off it                                                                                                             |
| **C-3**  | **Is** `Substrate` **the right name?**                                                                                                                                                                                           | **Kept, under protest, and recorded as debt**                                                        | ⚠️ `Substrate` is **unattested in any published stack diagram** — the field says *Models and Inference* (Perrone), *Compute and Foundation Models* (Menlo). Renaming costs 25 citations across 24 files and would re-open `C-1`'s ambiguity one week after closing it. **Deferred, not settled**                                                 |
| **C-4**  | **Adapters: function or cross-cutting property?** `elements.md` called runtime-neutrality a deliberate non-element                                                                                                                | **A property of** `F0`**, not a peer function**                                                       | Three of three comparable systems build it, which overturned "non-element". But LangChain's *model profiles* show it is a **per-task** property, not a standalone thing you construct                                                                                                                                                            |
| **C-5**  | `Agent = Model + Harness` (harness contains context) vs `Agent = harness + model + context` (context is a peer)                                                                                                                  | **Context is a peer.** `F3` stays separate from `F0`                                                 | LangChain states the three-part split directly; our structure already agreed. See `[../../references/comparisons/systems/langchain-deepagents.md](../../comparisons/systems/langchain-deepagents.md)` §2                                                                                                                              |
| **C-6**  | **Is our primitive set stated?** `01-concepts.md` §3.17 says *"unanswered"*; `06-frameworks-addendum.md` §4 lists six. **Both committed**                                                                                        | **§3 states it once.** The addendum's six are adopted with one correction                            | `02-component-matrix.md`: *"you cannot claim 'one way to do each thing' until you can name the things."* Leaving it blank was the finding; leaving it blank *twice, differently* is just drift                                                                                                                                                   |
| **C-7**  | **Rituals** — dismissed on frequency (`standup` 0, `ceremon` 0, `ritual` 1), then reopened                                                                                                                                       | `F10 Cadence` **is a function**                                                                      | The dismissal answered the wrong question and applied **two thresholds to two concepts** — `multiplayer` (6) was called *"real"*, Rituals (1) dead. A ritual is not a meeting; it is **a scheduled loop that emits an artifact**, and the corpus supports that: cron reviews, scheduled checks, `transcri` 12. `J17` **has no input without it** |
| **C-8**  | **Stewardship** — agent or gate? (`OPEN-9`)                                                                                                                                                                                      | **Agent, over an evidence corpus**                                                                   | No longer a design question. **LangSmith Engine is a shipped implementation**: a background agent that reads traces, files issues with linked evidence, and proposes changes to prompt, context and harness. `generic-cerebro`'s tier split (agent over `wiki/`, gate over `decision-log/`) remains the finer answer                             |
| **C-9**  | **Job layers (7) vs function bands (4)**                                                                                                                                                                                          | **Five bands**, adding `IMPROVE`                                                                     | Four of the six homeless jobs cluster in one layer. `03-jtbd.md` §4: *"not four separate gaps — one gap with four names"*                                                                                                                                                                                                                        |
| **C-10** | **The 14 factors cover only** `J1`**–**`J12`**.** `J13`–`J17` have no factor; factor `I` has no job                                                                                                                              | **Recorded as a live seam**, §8                                                                      | Not resolvable here — it is a change to `05-harness-factors.md`. Stating it beats silence                                                                                                                                                                                                                                                        |
| **C-11** | `OPEN-2` — one function holding two systems at different maturity (`F3` Fabric/Briefing, `F5` Standards/Catalog)                                                                                                                  | **Grade at the system level, roll up as the minimum**                                                | The third option the previous draft named and did not take. It is the only one consistent with *minimum-governs*: a stage-0 Briefing should drag `F3` to 1, not average to 2                                                                                                                                                                     |
| **C-12** | `OPEN-3` — should there be nine?                                                                                                                                                                                                 | **Twelve.** Every addition closes a homeless job                                                     | The count grew because the *jobs* grew from 12 to 17, not because the model inflated. `F7`+`F8` remains the strongest merge candidate if it must shrink                                                                                                                                                                                          |


| **C-13** | **The vocabulary check exempts its own source of truth.** `check-element-vocabulary.mjs` parses canonical names from §1, then skips this file: `if (rel === SPEC \|\| exemptionFor(rel)) continue;` | **Fixed 2026-08-27.** The self-exemption is removed, the canonical file is now scanned, and the map parse is anchored on the §1 heading rather than "the first fenced block" | The predecessor read `E0` as *Intelligence* in §1 and as *Substrate* in §6 **simultaneously, with all checks green.** A validator that cannot see its own source cannot detect drift at the source — the same defect shape as a peer's write-gate regex being narrower than its schema |
| **C-14** | **Four vocabularies named one unit** — elements, jobs, components, concepts | **FUNCTION is the unit; SCOPE and PROVIDER are the other two axes.** §0 | The distinction the predecessor drew — *"a function is something performed; a component is something present"* — is real but was load-bearing for nothing, and it left the reader with four ID spaces for twelve boxes |


| **C-20** | **The `C-` namespace collided.** This register's `C-14` and [`10-context-gap-analysis.md`](./10-context-gap-analysis.md)'s `C-14` were authored the same day, both declaring themselves a continuation | **This register keeps `C-14`; the claims register renumbered to `C-15`–`C-19`** | `C-` is **one global sequence**. A conflict and a claim are different genres but not different ID spaces — the gap analysis's own ID note already said *"one global sequence"* for `GAP` and did not apply it to `C` |
| **C-21** | **The architecture is a stack; the model is a grid. One document held both.** §1 read top-down while calling itself a foundation-first framework | **Split.** [`11-architecture.md`](./11-architecture.md) holds the nine-band stack; this file holds the graded model. §1 now carries both partitions with the crosswalk in `11` §5 | `06-frameworks-addendum.md` §0: mapping one genre onto another is *"a translation, not an identity."* A readiness grid and a layered stack are different objects and were being asserted as one |
| **C-22** | **There was no layer for where outcomes land.** `F2 Estate` is *what code exists* — inventory, not deliverable | **`F15 Product` added.** Carries the deliverable and its directives (e.g. monorepo or virtual-monorepo only) | KD: *"where the outcomes land… in software the deliverable is to the codebase and likely has directives."* The largest hole in the shipped model, and nothing in `F0`–`F11` covered it |
| **C-23** | **The harness holds no model of what it can reach.** MCP adapts per call; nothing declares the environment first | **`F12 Environment` + `F13 Adapters` added** — declare the inventory, derive the adapters | KD: *"my harness isn't aware of it until it happens."* A per-call adapter cannot answer *what can I reach*, *who owns it*, or *what breaks if it goes away*. Does **not** overturn `C-4`, which is about model portability — see [`11-architecture.md`](./11-architecture.md) §5.1 |
| **C-24** | **We grade machinery as though it were configurable.** `F4 Control`'s upper ladder rungs describe a deterministic resolver — which is plumbing, not a decision | **Named, not fixed.** Gas City's line adopted: *a primitive is a thing you configure; machinery is a thing that runs* | `router.py` and `dispatch.py` are machinery. The gradeable object is the **work contract** the resolver reads. Fixing it means rewriting `F4`'s ladder in [`03-maturity.md`](./03-maturity.md) — **out of scope, and owed** |
| **C-25** | **`F9 Roster` answered *who exists* and was asked *who answers*.** [`04-decision-layers.md`](./04-decision-layers.md) §3 carries a decision-rights table with no function to hang it on | **`F14 Org` added**, split from `F9` | KD: *"actors (eg. agents) should explicitly be named alongside the org."* Two questions, two owners, two maturities |
| **C-26** | **`F5 Capability` holds two systems and this file already said so** — *"grading `F5` as a single number averages a 4 and a 2 into a 2, and the standards work disappears"* | **`F16 Standards` split out** | `C-11` ruled *grade at the system level, roll up as the minimum*. This takes the split one step further because **Standards is one of the four rows carrying LoomWarp's real claim**, and it was invisible inside `F5` |

**Still open, and marked as such:** `C-3` (the `Substrate` name), `C-10` (the factor seam), **`C-24`
(machinery graded as configurable)**, `OPEN-12` (does Planning deserve its own function — see §8), and
`OPEN-15`–`OPEN-17` in [`11-architecture.md`](./11-architecture.md) §6.

> **`C-13` is fixed, not open** — it was listed here as both simultaneously. The self-exemption was
> removed on 2026-08-27 and §0.6 records the fix.

---



## 3. Primitives — the sanctioned units

A **primitive** is *"a minimal, named, composable unit that the harness makes the single sanctioned
way to express something"* — `01-concepts.md` §3.17. **The defining property is not what it does; it
is that there is one of it.**

> *"A human offered three ways to run tests picks one and remembers. **An agent offered three ways
> picks differently each session, or invents a fourth.**"*

**Ours, stated once (resolves** `C-6`**):**


| Primitive              | The one sanctioned way to express…       | Function |
| ---------------------- | ---------------------------------------- | ------- |
| **registry entry**     | that a repo exists and who owns it       | `F2`    |
| **context bundle**     | what an agent was given, at what version | `F3`    |
| **work contract**      | a unit of work and its dependency edges  | `F4`    |
| **capability package** | a distributable unit of how we work      | `F5`    |
| **risk tier**          | how dangerous an action is               | `F6`    |
| **evidence bundle**    | that something happened, provably        | `F7`    |


Six, which is inside the five-to-seven range every real primitive set occupies — *"a set that grows
without bound is a feature list wearing the word."*

**The correction to the addendum's list:** it is a set of **six**, not a claim of completeness. Three
functions — `F9 Roster`, `F10 Cadence`, `F11 Instrumentation` — **have no primitive yet**, and that is
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



## 4. The evidence layer — the jobs, and what they measure

Genre A: **functions**. The seventeen jobs in
`[03-jtbd.md](../../comparisons/03-jtbd.md)`, which were measured against a corpus rather
than asserted. Not repeated here; the mapping to functions is what this document owes.

**All seventeen are now placed.** Six had no function and two were miscovered:


| Job                               | Was              | Now                                                                  |
| --------------------------------- | ---------------- | -------------------------------------------------------------------- |
| `J13` choose the ground           | `F0`             | `F0` — both sub-decisions, model **and** runtime                     |
| `J1` compose context · `J8` prove | `F3` · `F3`+`F7` | unchanged                                                            |
| `J2` remember                     | `F3` ⚠️          | `F3`, as the **write** sub-decision — where individual-vs-team lives |
| `J4` decompose                    | `F4`             | unchanged                                                            |
| `J7` **recover**                  | **none**         | `F4` — retry, escalation and self-heal are control flow              |
| `J3` route                        | `F4`             | `F4`, **resolving against** `F9`                                     |
| `J10` distribute                  | `F5`             | unchanged                                                            |
| `J14` **know who exists**         | **none**         | `F9 Roster`                                                          |
| `J5` bound                        | `F6`             | unchanged                                                            |
| `J6` validate                     | `F7` `F8`        | `F7`, and `F10` when scheduled                                       |
| `J15` **secure and harden**       | `F6` ⚠️          | `F6`, widened from *permission* to *permission + hardening bar*      |
| `J11` **coordinate humans**       | **none**         | `F1` (channel) + `F10` (rhythm)                                      |
| `J9` compound                     | `F8`             | unchanged                                                            |
| `J16` **raise the floor**         | **none**         | `F8` — graduating convention into the sanctioned way                 |
| `J17` **diagnose the bottleneck** | **none**         | `F11`, fed by `F10`                                                  |
| `J12` **account**                 | **none**         | `F11`                                                                |


**Where** `J17` **gets its input.** `03-jtbd.md` states the dependency and strands it: *"*`J17` *requires*
`J12 account` ***and ritualized checks**."* Nothing produced that measurement because Rituals had been
ruled out. `F10 Cadence` is that producer. **If cadence is not modelled, the Grid computes a
bottleneck that nothing ever refreshes.**

---



## 5. Sub-functions — what the published component lists decompose

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
`[04-primitives-ontology-platform.md](../../comparisons/2026-08-research/04-primitives-ontology-platform.md)`
§5 says is the durable half of ontology:


| Insertion point             | What goes there                           | Our function         |
| --------------------------- | ----------------------------------------- | ------------------- |
| before the agent is invoked | setup, environment                        | `F0` `F3`           |
| before each model call      | **summarization**                         | `F3` (compress)     |
| wrapping the model call     | prompt caching, **model profiles**        | `F0` `F3`           |
| wrapping the tool call      | **context offloading**, permission checks | `F3` (write) · `F6` |


Claude Code's 29 lifecycle events and DeepAgents' middleware are the same design reached
independently. **An insertion point is mechanically checkable in a way an abstract noun is not** —
which is why this table, not §5's inventories, is what a conformance check can be written against.

### And the context bucket decomposes

`F3` was one of the two oversized functions. The field already split it — **Lance Martin's four
verbs**, with **Anthropic's** techniques as the fill:


| Verb         | Techniques                                       | Job       | Where our maturity actually diverges                  |
| ------------ | ------------------------------------------------ | --------- | ----------------------------------------------------- |
| **write**    | structured note-taking, agentic memory           | `J2`      | the individual-vs-team boundary — uncovered until now |
| **select**   | just-in-time retrieval, the Briefing, provenance | `J1`      | **the Briefing does not exist**                       |
| **compress** | compaction, tool-result clearing                 | `J1`      | native, and improving fast — least differentiated     |
| **isolate**  | sub-agents, path-scoped rules                    | `J1` `J5` | where context engineering becomes a bound             |


This is `C-11`'s resolution made concrete: **grade the four sub-decisions, roll up as the minimum.**
`F3` graded "2" was hiding a zero.

## 6. The twelve functions

Each entry carries: the definition · the *"how do we work?"* answer a human can say out loud · the
systems · the artifact you point at · who provides it.

Provider values: **native** (Claude Code ships it) · **gstack** · **Gas City** · **QM** ·
**LoomWarp** · **you** (nobody ships it; it is your team's answer).

---



### Band: FOUNDATION — *what we run on*

Decided rarely, by a platform owner or lead. Highest blast radius. Failure mode: **lock-in.**

---



#### `F0 Substrate` — the harness layer

> **Definition.** The runtime an agent executes in, and the adapter layer that keeps your work
> portable across more than one of them.
>
> **How do we work?** *"We run on Claude Code. Our capabilities are written so they'd survive a move,
> and here's what we'd lose."*

Garry Tan's equation is the cleanest statement of why this is a function at all:

> **frontier model** (rented, commoditized) **+ your context** (owned, unique) **+ a harness**
> = an agent acting as a fast version of you.

Two of the three terms are things you own. The harness is the one you choose, and choosing it badly
is the one mistake that constrains every function below.

**The model is named here, and that reverses a prior call (**`C-2`**).** `01-concepts.md` §3.1 excluded it
as *"an input to* `F0`*, deliberately not a function."* The argument was that *deterministic control,
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
comparable systems build it as a headline primitive — see `[references.md](./references.md)` §2. That
is corroboration strong enough to overturn the call.

**The honest tension.** Portability has a real price: the Agent Skills spec permits only six
frontmatter fields outside Claude Code (`name`, `description`, `license`, `compatibility`,
`metadata`, `allowed-tools`), and a disallowed field is a hard error, not a warning. Every
Claude-Code-only feature you use — `context: fork`, dynamic context injection, `paths` scoping — is
capability you are choosing over portability. **That trade should be explicit and recorded, not
discovered during a migration.** Recording it *is* the Adapter system, even if you never migrate.

---



#### `F1 Surfaces` — where work is seen and done

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



#### `F2 Estate` — the code

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
job, and the reason this function survives rather than dissolving into native config.

**One hard constraint worth stating here because it breaks control-plane designs:** project settings
in `.claude/settings.json` load **only from the starting directory** and are not inherited from
parent directories the way `CLAUDE.md` files are.

---



#### `F3 Context` — what the agent knows

> **Definition.** Layered, owned, versioned knowledge served to an agent as a resolvable bundle with
> provenance and freshness — not a folder it happens to be able to read.
>
> **How do we work?** *"Every job gets a briefing. We can show you exactly what the agent saw, at
> which version, and reconstruct it later."*


|              |                                                                                                                                                                                                                                                                                                                      |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | **The Context Fabric** — the authored layers: org → domain → repo → package · **The Briefing** — the per-job resolved bundle with hashes, versions, and owners                                                                                                                                                       |
| **Artifact** | Fabric: `CLAUDE.md`, `.claude/rules/`, per-package files. Briefing: a manifest per run, joined to that run's outcome                                                                                                                                                                                                 |
| **Provider** | **Pluggable — contract at [`09-context-layer.md`](./09-context-layer.md) §6.** Fabric: **native** is a good default here (path-scoped rules, lazy nested loading, `claudeMdExcludes`, auto memory); **gbrain**, an **OKF** bundle and the **decision-ledger** are the named alternatives, each declaring which scope cells it serves per §0.3. Briefing: **LoomWarp** — *narrowed 2026-08-26: the **idea** is claimed (OpenAI's "run receipt"); no implementation was demonstrated. See* `references/comparisons/00-README.md` *F-4* |


> **⚠️ Evidence that cuts against this function's premise, added 2026-08-26.** `F3` assumes layered,
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
> `[../../references/comparisons/2026-08-research/99-source-hygiene.md](../../comparisons/2026-08-research/99-source-hygiene.md)` *§2.*

**This is the function where LoomWarp has a claim nobody else is making.** Native Claude Code has the
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



#### `F9 Roster` — who exists, human and agent

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


**Why this is new.** `J14 know who exists` had no function, and `J3 route` **depends on it** — Tan's
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



### Band: PROCESS — *how work moves*

Decided by the team, per epic. Reversible. Failure mode: **inconsistency.**

---



#### `F4 Control` — how work is scoped and sequenced

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


`J7 recover` **lands here (**`C-9`**).** Retry, escalation and self-heal had no function and were left
with *"nearest is* `F4 Control`*."* They are control flow: the same dependency graph that decides what
runs next decides what happens when a step fails. Factor **IX** — *escalation carries a proposed
decision* — governs it, and the escalation is only meaningful because the graph knows what is blocked.

**The honest read.** This is where the native layer moved most between LoomWarp's architecture being
set and today, and it is the function most worth re-examining rather than defending. What native does
*not* have is **durable execution across process death** — workflows resume only within a session,
and agent teams do not restore in-process teammates on `/resume`. That gap is real and is the
legitimate argument for a control plane. It is a different problem from dependency resolution, and
only the first is unsolved.

---



#### `F5 Capability` — what the team can do

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
installed forever. Grading F5 as a single number averages a 4 and a 2 into a 2, and the standards
work disappears.

**Nobody ships the Standards system.** Not Claude Code, not gstack, not Gas City, not QM. gstack
encodes *process* opinion (`/office-hours` → `/plan-eng-review` → `/qa` → `/ship`), which is adjacent
but different: it tells you the sequence, not the bar. This is genuinely unclaimed ground.

---



### Band: TRUST — *why we trust it*

Decided by lead and org, continuously. Cheap to add; expensive to have skipped. Failure mode:
**"it said it was done."**

---



#### `F6 Policy` — what is allowed

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


`J15 secure and harden` **lands here, and it widens the function (**`C-9`**).** `03-jtbd.md` marked it
`F6` ⚠️ because *"*`F6` *covers permission; nothing covers vulnerability or code quality."* It is
widened rather than split, because both halves answer *what is this allowed to become* and both are
enforced at the same place — a gate. **The two halves fail differently, and that is worth stating:**
`J5 bound` fails as a **breach**, visible and immediate; `J15` fails as **a slow accumulation nobody
notices** — Osmani's *comprehension debt*.

⚠️ It carries the corpus's second-largest unmodelled signal — `security` **62**, with its own
conference track, and **absent from every published harness taxonomy.** A team that graded `F6` on
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

**The uncomfortable part:** this is the function where the enforcement is essentially free and teams
skip it anyway, because nothing visibly breaks until something does. It is the most common thinnest
warp section.

---



#### `F7 Evidence` — how we know it happened

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

**What is missing everywhere is the join to F3.** The correlation keys exist. Nothing writes the
joined record of *context set → outcome*, and nothing reconstructs it. **F3's Briefing and F7's
Verdict are one piece of work**, and together they are the differentiated claim.

---



### Band: LIFECYCLE — *work done on the harness itself, not on a unit of work*

Decided by whoever owns the harness, continuously. Failure mode: **stagnation.**

**This band is why the count grew.** `F0`–`F7` all act *for a unit of work*. These three act *on the
system that produces units of work*, and every published instrument omits them — a gap
`03-jtbd.md` attributes to *"Voss's system and oversight loop"* and admits **we reproduced.** It is
also the only band whose output re-enters the map.

---



#### `F10 Cadence` — what runs on a schedule, and what it emits

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
measurement means scheduled checks. **Without this function,** `J17` **has no input** — which is the best
available explanation for why the Grid computes a bottleneck that nothing refreshes.

---



#### `F8 Learning` — how it gets better

> **Definition.** Evaluated outcomes **promote** versioned changes back into Context and Capability,
> under owner approval, with rollback.
>
> **How do we work?** *"When a review finds the same class of bug twice, it becomes a rule. Changes
> to how we work are reviewed and revertible."*

**Narrowed 2026-08-27 (**`C-9`**).** This function **promotes**; it does not **measure**. `J16 raise the floor` — graduating a working convention into the single sanctioned way — belongs here, because it is
a promotion and it is *the mechanism that creates primitives*. `J12 account` and `J17 diagnose` are
readings, not promotions, and moved to `F11 Instrumentation`. Collapsing the two is how a system ends
up claiming a learning loop with nothing to learn from.


|              |                                                                                                                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Eval Corpus · The Promotion Gate (approval + rollback) · The Retirement path (capabilities that stop earning their keep)                                                                                                                  |
| **Artifact** | `evals.json`, `grading.json`, `benchmark.json`; a promotion record; usage telemetry                                                                                                                                                           |
| **Provider** | Corpus: **native** (`skill-creator` — isolated per-case runs, assertion grading with evidence, with/without benchmarking, blind A/B, description tuning) + subagent `memory:` scopes. Promotion gate and retroactive invalidation: **nobody** |


**This function is further along than "designed only" suggests**, because the substrate arrived
natively. `skill-creator` is a working implementation of the eval pyramid `standards/evaluation-doctrine.md`
describes. What remains genuinely unbuilt anywhere is *promotion with rollback* and *retroactive
invalidation of an accepted result* — and those are correctly placed at the far end of the maturity
scale.

---



#### `F11 Instrumentation` — what it costs, and what limits us

> **Definition.** What the harness measures about itself: what a unit of work cost, what it returned,
> and which constraint is currently binding.
>
> **How do we work?** *"We know what a workstream costs, we know our throughput, and we can name the
> one thing limiting us this month."*


|              |                                                                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Systems**  | The Accounting (cost and return per unit of work) · The Constraint (which function is the minimum) · The Join (cost tied to outcome, not to a run) |
| **Artifact** | cost and latency recorded per unit of work, joined to its outcome; the named bottleneck                                                           |
| **Provider** | **nobody at this altitude**                                                                                                                       |


**Why it is separate from** `F8 Learning`**.** Learning *promotes* — it graduates a convention into the
sanctioned way. This *measures*. `J16 raise the floor` is a promotion and belongs to `F8`; `J12 account` and `J17 diagnose` are readings and belong here. Collapsing them is what let a system claim
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



## 7. Factors — how the functions are governed

Functions and factors are different objects, and the corpus is explicit about it: **functions are
implemented and graded; factors are held.** Genre B and Genre C. The fourteen factors live in
`[../../references/comparisons/2026-08-research/05-harness-factors.md](../../comparisons/2026-08-research/05-harness-factors.md)`;
what this document owes is the mapping.


| Function               | Governing factors                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `F0 Substrate`        | **I** one way to do each thing                                                                    |
| `F1 Surfaces`         | **XIII** work is addressable by the whole team                                                    |
| `F2 Estate`           | **XII** capability travels without the hub                                                        |
| `F3 Context`          | **III** context is instruction, not overview · **IV** memory routes by ownership                  |
| `F4 Control`          | **II** route deterministically · **VI** declare the edges · **IX** escalate with a recommendation |
| `F5 Capability`       | **XII** capability travels without the hub                                                        |
| `F6 Policy`           | **V** scope only narrows · **VII** the gate does not run on the model                             |
| `F7 Evidence`         | **VIII** feedback is addressed to the machine · **X** every claim points at an artifact           |
| `F8 Learning`         | **XI** knowledge compounds or it is not knowledge                                                 |
| `F9 Roster`           | **— none**                                                                                        |
| `F10 Cadence`         | **— none**                                                                                        |
| `F11 Instrumentation` | **XIV** cost is a first-class signal                                                              |


**⚠️ The seam (**`C-10`**), stated rather than hidden.** The fourteen factors were written against
`J1`–`J12`. `J13`**,** `J14`**,** `J15`**,** `J16` **and** `J17` **have no factor**, and factor `I` has no job — it is
declared meta. Two of the three new functions are therefore ungoverned.

That is not a defect in the functions; it is a gap in the manifesto, and it matters because the
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
   F1 Surfaces        where the team sees the work
   F2 Estate          more than one repo
   F5 Capability      getting it to another person
   F6 Policy          what the team permits
   F7 Evidence        proving it to someone who did not watch
   F9 Roster          who else is on this
   F10 Cadence        what happens when nobody is watching
   F11 Instrumentation  what it cost the business
```

**None of those are oversights.** They are *out of scope for a software harness*, correctly. Chase
puts policy, evidence and cost in a **separate product** (LangSmith), not in DeepAgents — and that
separation is the honest architecture for the altitude he is working at.

**Our framework starts at that line and expands outward.** Each function above it is a place where a
decision stops being about *the agent* and starts being about *the company*:


| The software question           | The company question                                       | Function |
| ------------------------------- | ---------------------------------------------------------- | ------- |
| what tools can this agent call? | what is this **team** permitted to do, and who signed off? | `F6`    |
| did the run succeed?            | can a person who was not there **believe** it?             | `F7`    |
| what did this eval cost?        | what did this **workstream** cost, and did it return?      | `F11`   |
| which sub-agent handles this?   | which **person or agent** is accountable?                  | `F9`    |
| where is the file?              | which **surface** is authoritative when two disagree?      | `F1`    |
| how do I install this skill?    | how does it reach **another team's repo**, versioned?      | `F5`    |


**This is the altitude claim, restated as a direction rather than a gap.** `06-frameworks-addendum.md`
§5.4 makes it a hole — *"the instrument that grades the structure a team works inside does not exist."*
Stated as an expansion it is more useful and more falsifiable: **we are taking a component list that
stops at one agent and one task, and carrying each component outward until it describes how a company
works.**

Two consequences worth stating plainly:

- **It bounds the framework.** `03-jtbd.md` asks whether the framework assumes software — `J10`
distributes to *repos*, `J8` proves against *commits*, `J15` hardens *code*. The answer this gives:
**it starts in software because that is where the harness came from, and the expansion is what
carries it out.** The functions above the line are already deliverable-agnostic; the ones below are
not, and that asymmetry is the honest scope statement.
- **It predicts where the vendors go.** Slack, GitHub, Linear and Notion are all pushing *upward*
across that same line, from surface toward planning and coordination. `08-providers.md` ‡ — not yet
written — is where that gets evidence and a falsifier.

---



## 9. The provider view

The same twelve, read as *"what fills this?"* — the question §0.4 makes answerable. This is the table
the pre-flight generator walks, and the one that makes coexistence structural.

**Read the middle column as a recommendation and the right column as a claim.** A function whose named
providers are real products is one we integrate; a function whose provider is `nobody` is one we either
build or leave honestly empty.

| Function | Named providers | Recommended default | LoomWarp's differentiated role |
|---|---|---|---|
| `F0` Substrate | Claude Code · Codex · OpenCode · Pi | **native** + write the portability constraint down | The constraint, recorded |
| `F1` Surfaces | native (MCP) · Linear · **beads** (git-native work units) | **native** + **you** decide SoT | The SoT decision as a codified, checkable artifact |
| `F2` Estate | native config · a registry | **native** | Registry-driven routing and cross-repo impact analysis |
| **`F3` Context** | **native fabric · gbrain · an OKF bundle · the decision-ledger** — **contract at [`09-context-layer.md`](./09-context-layer.md) §6** | **native** fabric, plus one store per scope cell | **The Briefing** — per-*run* resolution, joined to outcome |
| `F4` Control | native teams/workflows · Temporal · Gas City formulas | **native** | Durable execution across process death |
| `F5` Capability | native marketplace · gstack skills · packs | **native** marketplace | **The Standards tier — unclaimed by everyone** |
| `F6` Policy | native permissions + hooks | **native**, fully | Risk tiering; policy as a versioned, distributable artifact |
| `F7` Evidence | native OTel · LangSmith | **native** OTel | **The join to `F3`** |
| `F8` Learning | native `skill-creator` | **native** | Promotion with rollback |
| **`F9` Roster** | **nobody** | — | Unclaimed. Identity work exists; a team's model of who is on it does not |
| **`F10` Cadence** | native triggers (hooks, scheduled sessions); the emission contract is **you** | **native** triggers | Unclaimed at this altitude |
| **`F11` Instrumentation** | **nobody** at team altitude; LangSmith and Harbor at the eval altitude | — | Cost joined to a *unit of work*, not to an eval run |

**Three of twelve have no provider at all** — `F9`, `F10`, `F11` — and they are the three newest. The
jobs analysis, the instrument survey and this table reach that finding independently, from three
directions.

**Four rows carry LoomWarp's real claim:** the Briefing (`F3`), the Standards (`F5`), the join (`F7`),
and promotion with rollback (`F8`). Everything else is a recommendation to adopt something that already
exists — which is the honest answer and a better product than pretending otherwise.

**`F3` is the only row with a written contract.** That is the state of the work, not a design choice:
one function has been specified as pluggable and eleven have not. The others carry provider *names*,
which is a recommendation, not an interface. **Do not describe them as pluggable until they have a §6.**

---

*Next:* `[03-maturity.md](./03-maturity.md)` *— how a team grows along these, and where the thresholds
are.*

---



# KD Thoughts and mental model:

- so far it feels like some of this will feel too abstract and expansive for most individuals.  we need to provide a "holistic view" but also consider how to make this 'grok-able' for an audience where they can see it and instantly relate to what is being presented. 
- the functions are likely correct but this feels a little unrecognizable to someone looking to understand this at a high-level since we're basically decomposing some of what might be at a mature enterprise framework like "Scaled Agile Framework" (SAFe 6.0) into a simple "agile" or "lean startup" model infographic.

