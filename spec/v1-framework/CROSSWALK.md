---
title: "CROSSWALK — jobs to components, functions to components, and what is still open"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
extends: archive/v0/02-functions.md
wave: W1
---

# CROSSWALK

**What this is.** The two closing arguments for the twelve-layer framework, and the register of what it
does not close. **§1** answers *why does this function exist* by deriving every component from a job.
**§2** answers *where did my old citation go* by giving every `F0`–`F16` a destination. **§3** names what
is still missing, dated.

**Why it is written before any component file.** A wrong component found here costs a table row; found
after twenty files are filled it costs twenty files. Nothing in this file was copied from
[`../archive/v0/02-functions.md`](../../archive/v0/02-functions.md) — the ancestor is **re-argued**, per the corpus rule
that a vocabulary retires *"by writing a ruling, publishing a crosswalk, and re-heading the loser."*

---

## 0. The structure this crosswalk closes over

**Twelve layers, thirty-three components.** The layer is navigation; **the component is the gradeable
function**. Component IDs are `<layer><letter>`, the notation the PRD already uses at `3e Standards` and
`8d Efficiency`.

| Layer | Components |
|---|---|
| **11 Surfaces** | `11a` Surfaces |
| **10 Teams & Agents** | `10a` Roster · `10b` Org |
| **9 IMPROVE** | `9a` Learning · `9b` Rituals · `9c` Cadence · `9d` Anti-fragile Lifecycle · `9e` Raise the Floor · `9f` Diagnose the Bottleneck |
| **8 Trust** | `8a` Evals · `8b` Evidence · `8c` Observability · `8d` Efficiency |
| **7 Workflow Tasks** | `7a` Workflow Tasks |
| **6 Workspaces** ⟳ | `6a` Product · `6b` Infrastructure · `6c` Estate · `6d` Delivery |
| **5 Context** ⟳ **= `F3`** | `5a` Individual Memory · `5b` Team Memory · `5c` Knowledge |
| **4 Capabilities** | `4a` Capability · `4b` Capability Permissions |
| **3 System Stacks** | `3a` Control · `3b` Routing · `3c` Composition · `3d` Configuration · `3e` Standards |
| **2 Agent Harness** | `2a` Adapters & Middleware · `2b` Hooks · `2c` Enforcement |
| **1 Environment** | `1a` Environment |
| **0 Foundation** | `0a` Substrate |

> **The count, stated once, because it is the defect this rebuild exists to end.**
> **12 layers · 33 components · 17 inherited function IDs (`F0`–`F16`) · 17 jobs (`J1`–`J17`).**
> [`../archive/v0/02-functions.md`](../../archive/v0/02-functions.md) carries `F0`–`F16` in its §1 map, *"in five bands"* at
> its line 16, and *"The twelve functions"* as its §6 heading — three counts in one file, with four
> checkers green. `AC-10`'s count check is written against the number above.

### 0.1 Two operations, and the difference is load-bearing

`O-3` rules that a decomposed function **keeps the parent ID as a layer-level roll-up** while children take
dotted sub-IDs — `C-11` applied literally, *grade at the system level, roll up as the minimum*. Executing
that rule against thirty-three components surfaced a second operation it does not cover.

| | **DECOMPOSED** | **SPLIT** |
|---|---|---|
| **When** | every part lands inside **one** layer | the parts cross a **layer boundary** |
| **The ID** | bare `F<n>` is kept as the roll-up over its own children; each child takes `F<n>.<k>` | **no roll-up.** The bare `F<n>` resolves to a list of destinations |
| **Why** | `C-11` — a stage-0 child drags the parent to 0 rather than averaging | a roll-up spanning layers would let a high grade in one layer hide a zero in another, which is *minimum-governs* defeated |
| **Cites as** | `F3` → `F3.1` `F3.2` `F3.3` | `F6` → `2c` · `3e` · `4b` · `8a` |

**Neither is a rename.** The corpus has renamed the same twelve units three times (`N`→`E`→`F`) and
[`../archive/v0/02-functions.md`](../../archive/v0/02-functions.md) §0.5 forbids a fourth. **No row in §2 reads "renamed."**

**Where the layer-level roll-up applies.** The structure block writes `=` for exactly one layer — *"5
Context ⟳ = F3"* — and prefixes a function ID only to the component that carries it elsewhere
(*"F5 Capability (tool repo) · Capability Permissions"*). **Layer 5 is therefore the only layer that is a
function.** `F13` and `F8` decompose within a layer without being that layer, and take the same dotted
treatment over their own children.

---

## 1. DERIVATION — `J1`–`J17` → component

**Answers *why does this function exist*.** This is `B-1` executed: functions are job-derived. Source is
[`../../references/comparisons/03-jtbd.md`](../../comparisons/03-jtbd.md), whose §3 scorecard
records **six jobs with no function** — `J7` `J11` `J12` `J14` `J16` `J17`.

| Job | Band | Primary component | Also lands in | Was |
|---|---|---|---|---|
| **J13** choose the ground | GROUND | **`0a` Substrate** | — | `F0` |
| **J1** compose context | KNOW | **`5a` `5b` `5c`**, rolled up as `F3` | — | `F3` |
| **J2** remember | KNOW | **`5a` Individual Memory · `5b` Team Memory** | — | `F3`, undifferentiated ⚠️ |
| **J4** decompose and sequence | MOVE | **`3a` Control** | `7a` Workflow Tasks | `F4` |
| **J7** recover | MOVE | **`3a` Control** — its *Recovery* system | `10b` Org (the escalation target) | **none** → `F4` |
| **J3** route | MOVE | **`3b` Routing** | — | `F4` |
| **J10** distribute | EQUIP | **`4a` Capability** | `6d` Delivery | `F5` |
| **J14** know who exists | EQUIP | **`10a` Roster** — *who exists* | **`10b` Org** — *who answers* | **none** |
| **J5** bound | TRUST | **`3a` Control** — the decision, declared as a named bound (`frontend-dev`, `soc2`) | **`2c` Enforcement** — the mechanism · **`4b` Capability Permissions** — the per-package grant | `F6` |
| **J6** validate | TRUST | **`8a` Evals** | `9a` Learning (what the finding becomes) | `F7` `F8` |
| **J15** secure and harden | TRUST | **`8a` Evals** — *is the output safe enough to ship* | `3e` Standards (pre-hoc) · `2c` Enforcement (secrets, sandbox) | `F6`, partially ⚠️ |
| **J8** prove | TRUST | **`8b` Evidence** | layer 5 as `F3` (the context half of the join) | `F3` `F7` |
| **J11** coordinate humans | TOGETHER | **`11a` Surfaces** | `9b` Rituals (the scheduled half) | **none** |
| **J9** compound | IMPROVE | **`9a` Learning** | — | `F8` |
| **J16** raise the floor | IMPROVE | **`9e` Raise the Floor** | — | **none** → folded into `F8` |
| **J17** diagnose the bottleneck | IMPROVE | **`9f` Diagnose the Bottleneck** | `8d` Efficiency (its input) | **none** → folded into `F11` |
| **J12** account | IMPROVE | **`8d` Efficiency** | `9f` (which consumes it) | **none** → folded into `F11` |

**Seventeen jobs, seventeen homes. Zero orphans, zero discards.**

### 1.1 The six homeless jobs, verified rather than assumed

The scorecard's `none` column was written 2026-08-26 and **four of the six were quietly given homes on
2026-08-27** in [`../archive/v0/02-functions.md`](../../archive/v0/02-functions.md) §6, which the scorecard was never updated
to reflect. Verified line by line:

| Job | Scorecard says | `02-functions.md` §6 actually says | Now |
|---|---|---|---|
| `J7` recover | none | `F4 Control`: *"`J7 recover` lands here (`C-9`)… They are control flow"* | `3a` |
| `J16` raise the floor | none | `F8 Learning`: *"`J16 raise the floor`… belongs here, because it is a promotion"* | `9e` — **promoted out of `F8` to its own component** |
| `J17` diagnose | none | `F11 Instrumentation`: *"The Constraint (which function is the minimum)"* | `9f` — **promoted out of `F11`** |
| `J12` account | none | `F11 Instrumentation`: *"The Accounting (cost and return per unit of work)"* | `8d` |
| `J14` know who exists | none | `F9 Roster` added, then `F14 Org` split from it (`C-25`) | `10a` + `10b` |
| **`J11` coordinate humans** | **none** | **nothing. It is the one job that was never given a function.** | **`11a`, and the argument is below** |

> **Correction to the dispatch brief.** It records the four newly-housed jobs as *"`J7`→Control's Recovery,
> `J14`→layer 10, `J12`→`8d` Efficiency, `J9`→Learning."* **`J9` was never homeless** — the scorecard gives it
> `F8`. The fourth is **`J16`**, and the brief's list omits **`J11`**, which is the only job in the seventeen
> that has never had a function at all. Recorded here rather than silently corrected.

### 1.2 `J11` → `11a` Surfaces — the one job that needs an argument

`03-jtbd.md` §2 rules `J11` out of `F1` explicitly: *"`F1 Surfaces` covers source-of-truth, not channel."*
**That objection was to `F1` as a function inside a nine-band stack. It does not survive `F1` becoming a
layer.** Layer 11 is *where work is seen and done* — and a channel is precisely a place work is seen.

**Four peers ship channel as a first-class surface**, and they disagree on the word, which is the
`emerging` condition rather than an absence — `03-jtbd.md` §2 `J11` *"Who"*: QM **rooms** · Claude Tag *"one
shared Claude per channel"* · Superconductor *"every agent session shared and addressable"* · SageOx
*"multiplayer by default"*.

**This is a widening of `F1`, not a rename of it.** `F1` keeps its ID and its source-of-truth clause; it
gains the channel clause `J11` needed. The crosswalk row in §2 says **widened**, and names what was added.

### 1.3 `J15` is the one job whose halves land in different layers

*Secure* — secrets, sandbox, credentials an agent never holds — is a **mechanism**, and lands at `2c`.
*Harden* — vulnerability and code quality — is a **bar**, and lands at `8a`, with its pre-hoc half at `3e`.
`03-jtbd.md` §2 already argues these are different failure modes on different timescales: *"`J5` fails as a
breach, this fails as a slow accumulation nobody notices."* **Two failure modes, two layers** is the
structure agreeing with the evidence rather than a job being smeared.

---

## 2. SUPERSESSION — `F0`–`F16` → component

**Answers *where did my old citation go*.** Every one of the seventeen inherited IDs resolves. **No row
reads "renamed."**

| Was | Operation | Now | Discarded | The argument |
|---|---|---|---|---|
| **`F0` Substrate** | carried | **`0a` Substrate** | — | 1:1. `C-3`'s protest against the name travels with it, unresolved |
| **`F1` Surfaces** | **widened** | **`11a` Surfaces** | — | Keeps *the codified source-of-truth decision*; **gains the channel clause** so `J11` has a home. §1.2 |
| **`F2` Estate** | carried | **`6c` Estate** | — | 1:1. Checked against `O-3` and **does not decompose**: its three systems — Registry, Workspace Resolution, Routing — are one gradeable object, and the *routing* it names is *which repo work belongs to*, not `3b`'s *which actor* |
| **`F3` Context** | **decomposed** | **layer 5 = `F3`** · `F3.1` `5a` Individual Memory · `F3.2` `5b` Team Memory · `F3.3` `5c` Knowledge | — | `O-3` verbatim. Promotes `02-functions.md` §0.3's `individual \| team × project \| org` from an unfilled axis to visible structure. Closes `OPEN-5` |
| **`F4` Control** | **split** | **`3a` Control** (decomposition, graph, dispatch, recovery) · **`3b` Routing** (`J3`) · **`7a` Workflow Tasks** (the *work contract*) | — | Crosses layers 3 and 7, so no roll-up. **The split is `C-24` fixed structurally**: `router.py` is machinery and sits at `3a`; the **work contract it reads** is the configurable primitive and is graded at `7a` |
| **`F5` Capability** | carried | **`4a` Capability** | — | 1:1. Checked against `O-3` and **does not decompose**: its second system, *The Standards*, already left under `C-26`, and what remains — *The Catalog* — is single. `4b` is **not** `F5.2`; the structure block prefixes the ID to `4a` alone |
| **`F6` Policy** | **split** | **`2c` Enforcement** (the mechanism) · **`3a` Control** (*what an agent may do* — **ruled to Control 2026-08-31**) · **`4b` Capability Permissions** (the per-package grant) · **`8a` Evals** (*the bar the output must clear*) · **`3e` Standards** (*what good looks like*) | — | `C-9` merged two halves into `F6` noting *"the two halves fail differently."* **This separates what `C-9` merged.** Storage of all four is layer 5. See §2.1 |
| **`F7` Evidence** | carried | **`8b` Evidence** | — | 1:1. The **join** to context — the differentiated half — is the layer-5 roll-up × `8b`, and stays `claimed` |
| **`F8` Learning** | **decomposed** | `F8.1` **`9a` Learning** · `F8.2` **`9e` Raise the Floor** | — | Both inside layer 9, so `F8` is kept as the roll-up. `02-functions.md` §6 put `J16` *inside* `F8`; layer 9 gives it its own row because `F8` promotes **knowledge** and `J16` promotes **convention**, and `03-jtbd.md` §2 calls the second *"the mechanism that creates primitives"* |
| **`F9` Roster** | carried | **`10a` Roster** | — | 1:1 |
| **`F10` Cadence** | carried | **`9c` Cadence** | — | 1:1. ⚠️ **Contested by `9b` Rituals** — see §3.1 |
| **`F11` Instrumentation** | **split** | **`8c` Observability** (the Trace) · **`8d` Efficiency** (the Accounting, `J12`) · **`9f` Diagnose the Bottleneck** (the Constraint, `J17`) | — | Crosses layers 8 and 9, so no roll-up — **and the crossing is the point**: `03-jtbd.md` §2 `J17` states its own maturity gate, *"`J17` depends on rituals and on `J12`."* A function whose parts depend on each other across an ordering boundary is not one gradeable row |
| **`F12` Environment** | carried | **`1a` Environment** | — | 1:1 |
| **`F13` Adapters** | **decomposed** | `F13.1` **`2a` Adapters & Middleware** · `F13.2` **`2b` Hooks** | — | Both inside layer 2. Hooks are **not new** — `11-architecture.md` §3 defines `F13` as *"adapters, middleware, hooks"*. Splitting them is what `OPEN-16` asked for: `F13` **becomes the layer**, and the two mechanisms in it are graded apart |
| **`F14` Org** | carried | **`10b` Org** | — | 1:1 |
| **`F15` Product** | carried | **`6a` Product** | — | 1:1. Checked against `O-3` and **does not decompose**: `C-22` defines `F15` as *the deliverable and its directives*. `6b` Infrastructure and `6d` Delivery are **not** named inside it and are therefore marked **new** below, with arguments, rather than absorbed as `F15.2`/`F15.3` |
| **`F16` Standards** | carried, **and widened** | **`3e` Standards** | — | 1:1, plus `F6`'s *what good looks like* half (`standards/architecture-patterns.md`, `engineering-principles.md`, `ci-cd.md`, `testing-patterns.md`) |

**Nothing about a function is discarded.** Two *partitions* are:

| Discarded | Superseded by | Why |
|---|---|---|
| The **five-band** grouping — `FOUNDATION` · `STRUCTURE` · `PROCESS` · `TRUST` · `LIFECYCLE` | the twelve layers | `OPEN-17`. Two partitions of one set is the multiplicity `C-14` ruled against, and keeping both is how *"in five bands"* and *"the twelve functions"* survived in one file alongside a nine-band map |
| The **nine-band** numbering ①–⑨ | the twelve layers | `OPEN-18`. Superseded by KD's twelve-layer note, [`../archive/v0/11-architecture.md`](../../archive/v0/11-architecture.md) §1 |

### 2.1 The `F6` split, and the clause the three-way split loses

The PRD states Policy *"splits three ways"* — **what good looks like** → `3e`; **the bar the output must
clear** → layer 8; **the enforcement mechanism** → layer 2; storage of all of it → layer 5.

**That enumeration drops `F6`'s headline clause.** `F6`'s own definition opens *"What an agent may do"* —
which is neither a standard, nor a bar on output, nor a mechanism. It is a **decision**, and its destination
is **`4b` Capability Permissions**, the component the structure block already carries and the PRD's
paragraph does not account for. Recorded here rather than resolved silently, because without it `J5 bound`
— a `CORE, converged` job — would have only a mechanism and no decision, and the crosswalk would not close.

**`O-5` is unaffected.** Enforcement is still mechanical at `2c` and presented twice: **Guides** pre-hoc at
`3e`, **Sensors/Evals** post-hoc at `8a`. Trust keeps exactly four components; enforcement is not a fifth.

### 2.2 The six new components, each with its argument for being new

`AC-2` requires every new function to be marked **new** with an argument. Six components have no ancestor
in `F0`–`F16`.

| New | Argument for being new | Nearest thing that is not it |
|---|---|---|
| **`3c` Composition** | `F4` sequences **work**. This assembles the **system that does the work** — which middleware wraps which call, which subagent owns which context. Two peers built it independently and named it differently: *"Claude Code's 29 lifecycle events and DeepAgents' middleware are the same design reached independently"* ([`../archive/v0/11-architecture.md`](../../archive/v0/11-architecture.md) §3.1) | `3a` Control — the graph, not the assembly |
| **`3d` Configuration** | The only empirically-derived inventory in the corpus is an inventory of **exactly this**: eight configuration mechanisms across five tools and 2,853 repositories ([`07-verified-inventories.md`](../../comparisons/2026-08-research/07-verified-inventories.md) §1). Nothing in `F0`–`F16` owns the configuration surface itself — `F13` owns adapters, `F3` owns what context files *contain* | ⚠️ `11-architecture.md` `OPEN-18` rules Configuration **fails the band test** — *"it attaches to other bands and has no lifecycle of its own."* **That test is for layers. It passes as a component**, and this is why it is `3d` and not a thirteenth layer |
| **`6b` Infrastructure** | Nothing in `F0`–`F16` holds the **runtime a project deploys into**. `F0` is what the *agent* runs on; `F12` is the declared inventory of what the team *reaches*; neither is the project's own environment. Three peers ship it under three names ([`12-horizon.md`](./12-horizon.md) §3.2) | `F0` Substrate · `F12` Environment |
| **`6d` Delivery** | The path from a finished change to production. `standards/ci-cd.md` exists in this repo **with no function to hang it on** — the same shape that produced `F14` (`C-25`, a decision-rights table with no function) | `J10 distribute` ships **capability**; this ships **product**. Debois's CDLC names *distribute*, and means the first |
| **`9b` Rituals** | ⚠️ **Contested. See §3.1.** `OPEN-8` was reopened by `03-jtbd.md` §4 and closed by `C-7` **into `F10 Cadence`**, on the same reframe that makes Rituals a candidate | `9c` Cadence — and the argument that they differ is not yet made |
| **`9d` Anti-fragile Lifecycle** | ⚠️ **Contested. See §3.2.** `O-4` demotes it from umbrella to peer of Learning / Rituals / Cadence | `9a` · `9c` · `9e` — collectively |

---

## 3. RECORDED GAPS

**What this framework does not close, named and dated 2026-08-31.** A gap recorded is worth more than a
gap padded.

### 3.1 ✅ RULED 2026-08-31 — `9b` Rituals and `9c` Cadence are separate components

> **KD's ruling:** *"rituals are separate from cadence."*
>
> **The surviving distinction is the one offered below and it is now taken:** `9c` Cadence is **the
> schedule** — cron, hooks, triggers, the nightly maintenance pass. `9b` Rituals is **the human practice
> the schedule serves** — review, retro, planning, handoff: a loop with a person in it.
>
> **This narrows `C-7`, and the narrowing is recorded rather than left implicit.** `C-7` ruled the Rituals
> question *into* `F10 Cadence` on the reframe *"a ritual is not a meeting; it is a scheduled loop that
> emits an artifact."* That reframe is now read as covering **only the scheduled half**. The half `C-7`
> did not address — *who is in the loop, and what they are there to do* — is `9b`. **`C-7` is narrowed,
> not reversed:** every claim it made about `F10` still stands.
>
> **`AC-7` bites, as this section predicted, and the answer is that it should.** A pure schedule *is*
> machinery, so `9c` Cadence is graded on **what it emits** — `F10`'s own definition already says *"and
> the artifact each run leaves behind"* — never on the trigger itself. `9c`'s W3 file must state that.
>
> **Layer 9 keeps six components. The framework stays at 33.**

*Original escalation, retained as the argument the ruling answers:*



`C-7` ([`../archive/v0/02-functions.md`](../../archive/v0/02-functions.md) §2) resolved the Rituals question with the ruling
**`F10 Cadence` is a function**, on this reframe: *"A ritual is not a meeting; it is **a scheduled loop that
emits an artifact**."* `F10`'s definition is then written as *"The checks that run without being asked, and
the artifact each run leaves behind."*

**Those are the same object.** Layer 9 carries both as peers, and the PRD's §3 disposition — *`OPEN-8`
closed by Rituals* — closes with a component whose content `C-7` already assigned elsewhere. **This is the
duplicate-model shape the rebuild exists to end**, arriving one layer up.

**The one distinction that could survive**, offered for KD's ruling and not taken here: **`9c` Cadence is
the schedule (machinery — cron, hooks, triggers); `9b` Rituals is the human practice the schedule serves
(review, retro, planning — a loop with a person in it).** If that holds, `AC-7` bites immediately: a pure
schedule is *a thing that runs*, and machinery is not graded. If it does not hold, layer 9 has five
components, not six, and the framework has thirty-two.

### 3.2 ✅ RULED 2026-08-31 — `9d` Anti-fragile Lifecycle is the closed loop

> **KD's ruling:** `9d` is **the feedback wiring between the other five** — the thing that makes them a
> loop rather than five independent activities.
>
> `9f` diagnoses → `9e` raises the floor → `9a` promotes the lesson into canon → `9c` schedules the check
> → `9b` puts a person in it → the next run is measured → `9f` diagnoses again. **`9d` is that circuit.**
>
> **It has a sentence no neighbour can write**, which is the test §3.2 said it had to pass:
> *"Every failure makes the next run less likely to fail the same way."* Each neighbour describes one arc;
> only `9d` describes the closure.
>
> **This is what "anti-fragile" means** — not *resilient* (survives stress unchanged) but *anti-fragile*
> (improves because of stress). The name was carrying the claim all along; what was missing was the object.
>
> **The horizon marker stays `bet`.** No peer ships a closed improvement loop — **LangSmith Engine** is the
> nearest and it **proposes rather than promotes**: it clusters traces into issues, writes prompt and code
> fixes, opens GitHub PRs, and builds a trace→fix→eval loop, **with a human approving at every decision
> point**. **A bet marked as a bet is a contribution.** *(Evidence re-verified 2026-09-01 at
> langchain.com/langsmith/engine, supplied by KD — the name is real and the product is closer than
> "reports" implied; the loop still does not close without a person at the merge. The teardown
> `systems/langchain-deepagents.md` does not cover Engine — recorded as a teardown gap.)*
>
> **Layer 9 keeps six components. The 12 layers were never at issue** — this was always a question about
> one component inside layer 9, not about the layer.

*Original escalation, retained as the argument the ruling answers:*



`O-4` makes *anti-fragile lifecycle* a **peer** of Learning / Rituals / Cadence rather than an umbrella over
them. Executing that leaves no residue: `9a` takes promotion of knowledge, `9c` takes the schedule, `9e`
takes retirement of the second way, `9f` takes diagnosis. Every candidate sentence for `9d` restates one of
them — which `AC-3` names as **a finding about the component, not a gap to pad**.

The marker is already argued and already honest: [`12-horizon.md`](./12-horizon.md) §3.4 rules it
**`bet`** — *"No peer ships it. No one has named it on a stage. It is a position about where the field goes,
held by us."* **A bet marked as a bet is a contribution. A bet with no distinct sentence is a layer name.**
The cheapest resolution is that `9d` is the **name of layer 9**, which `O-4` has already renamed `IMPROVE`.

### 3.3 The Briefing has no component of its own

Layer 5's three children are **stores** — individual, team, knowledge. `F3`'s other system, **The Briefing**
(*the per-job resolved bundle with hashes, versions, and owners*), is the assembly step that joins them, and
it is **LoomWarp's own differentiated claim** — `02-functions.md` §6 marks its provider **LoomWarp**, narrowed
2026-08-26 to *"the idea is claimed; no implementation was demonstrated."*

It is reachable today only as the layer-5 roll-up. That is defensible under `C-11` — the roll-up is the
minimum of its children — but it means **the framework's sharpest context claim is graded as an average of
three stores rather than as itself.** A `5d Briefing` would close it. **Cardinality is a KD decision and is
not taken here.**

### 3.4 `OPEN-9` stewardship — no component, and the argument that used to close it is gone

The two-tier answer exists in the prior art — **an agent over the optimistic tier, a gate over the locked
one, split at the promotion event** (`C-8`; `generic-cerebro`'s tier split; **LangSmith Engine** as the shipped
agent half — *"your proactive agent engineer"*, verified 2026-09-01 at langchain.com/langsmith/engine: the
agent proposes over the optimistic tier and the human merge is the gate over the locked one). **It has no component in the twelve.** The nearest are `9a` Learning (which promotes) and `10b`
Org (which decides), and neither owns the steward.

**We have neither today**, so *"we already have a gate"* is not available as an argument — `B-3` records that
the argument which previously closed `OPEN-9` rested on an enforcement mechanism that does not exist.

### 3.5 RBAC over context — still nobody's job, and now visibly so

Between `J5` (what an agent may **do**) and `J1` (what it **sees**). The Indigo analysis calls it
**whitespace #1 in the entire category**; `NEXT-STEPS.md` §3.2 says it is *"currently nobody's job."*

**The twelve-layer structure does not close it — it makes the hole legible.** Layer 4 has `4b Capability
Permissions`. Layer 5 has no counterpart. The gap is now a **missing cell in a visible grid** rather than a
paragraph in a landscape file, which is the most this wave can honestly claim.

### 3.6 Dispositions carried in

| Item | Disposition |
|---|---|
| **`OPEN-5`** — the `individual \| team × project \| org` axis has nowhere to live | **Closed** by layer 5. `5a`/`5b` are the individual/team boundary as structure; the project/org half is the `SCOPE` axis, still unfilled per [`12-horizon.md`](./12-horizon.md) §4.1 |
| **`OPEN-8`** — Rituals | **Contested.** The PRD closes it with `9b`; `C-7` already closed it with `F10`. See §3.1. **✅ Closed 2026-08-31** — KD's ruling in §3.1 fixes `9b` Rituals and `9c` Cadence as separate components; `C-7` is narrowed to the scheduled half, not reversed |
| **`OPEN-9`** — stewardship | **Open.** See §3.4 |
| **`OPEN-15`** — does `F2` survive alongside `F15` | **Both survive**, as `6c` and `6a` in one layer. ⚠️ The original worry stands verbatim: *"a team with one repo cannot tell them apart, and the grid would show two rows moving together."* Now two rows in the same layer, where the correlation is at least visible |
| **`OPEN-16`** — is `F13` a function or the mechanism layer beneath all functions | **Answered: it is the layer.** `F13` becomes layer 2 Agent Harness and decomposes into `2a`/`2b`. The cross-cutting evidence that made it an open question was the argument for promoting it |
| **`OPEN-17`** — do the nine bands replace the five, or coexist | **Answered: replaced.** Both partitions are discarded (§2). Becomes moot in fact at `W6`, when `specs/v0/` is archived |
| **`OPEN-18`** — which candidate bands fold into which | **Answered** by the twelve-layer list. `Workspaces` and `Surfaces` became layers; `Configuration` became `3d` — passing as a component, failing the band test it was measured against |
| **`C-24`** — machinery graded as configurable | **Structurally fixed, and now graded.** `F4`'s split puts machinery at `3a` and the work contract at `7a`. `AC-7` was owed at `W5`. **✅ Closed 2026-09-01** — `00-README.md` §*Primitives and machinery* states it: all 33 components are configurable primitives, machinery is not graded, and ours is named (`router.py`, `dispatch.py` at `3a`; the work contract graded at `7a`) — see `HANDOFF-W5.md` |
| **`C-3`** — `Substrate` is unattested | **Carried, unresolved.** Renaming it here would be the fourth rename `02-functions.md` §0.5 forbids |
| **`C-10`** — the fourteen factors cover only `J1`–`J12` | **Carried.** `J13`–`J17` now have components and still have no factor |

### 3.7 ✅ RULED 2026-09-01 — `O-6`: the Grid's warp threads are the 12 layers; the 33 are drill-down

The escalation threshold in the PRD is stated against *"~28 sub-layers × 6 stages ≈ 168 cells."* **The
crosswalk produces 33.** That is **198 cells**, an 18% overshoot on an estimate that was already flagged as
the reason to escalate early. Raised in the HANDOFF and ruled by KD 2026-09-01:

**`grid.html` runs on 12 warp threads — the layers — with the 33 components as drill-down.** *Minimum
governs* already makes a layer's grade its weakest component, so `s-neck`, the live minimum/mean readout and
the woven-fabric SVG run unchanged on the layer rows. `B-2`'s *"preserve the form, change the row set"*
survives intact — the row set is the layer. Ruled ahead of `W7` so `AC-11`'s generator
(`scripts/gen-grid-rows.mjs`) was written to it rather than retrofitted. **Executed 2026-09-01 at `W7`:** the
generator parses the §0 table above and emits the twelve layer rows into
[`../../references/grid.html`](../../maturity/grid.html), carrying each layer's components as drill-down text.

### 3.8 `AC-3`'s length floor is not what the comparator shows

`AC-3` requires **129–260 lines** per component file, *"matching the observed range of
`content/factor-NN-*.md`."* Measured against the checkout at `~/Googlyeye-Monsters/12-factor-agents` @
`d20c7283`: the twelve canonical factor files run **12 to 260 lines**, median ≈ 63, and **only two of twelve
reach 129**. The 129 floor is not observed in the source it cites.

This matters because the floor is the pressure that produces padding, and the same AC warns *"a file with
nothing to say is a finding, not a gap to pad."* **Recorded so `W3` and `W4` are not written to a fabricated
minimum.**

### 3.9 ✅ RULED 2026-09-01 — the decision ledger is the governed tier of `5b` Team Memory

KD: *"the decision ledger is a type of memory."* No new component; the count stays 33. The routing
doctrine ([`../archive/v0/09-context-layer.md`](../../archive/v0/09-context-layer.md) §4, adopted verbatim from the prior
art and sitting unclaimed as `GAP-33` since 2026-08-11) now maps onto layer 5 whole: *personal memory* →
`5a` · *the knowledge base* → `5c` · *"the decision log, via promotion"* → **`5b`'s governed tier**.

Four properties travel with the ruling, all from the doctrine's own text:

- **Precedence** — when copies disagree, **the ledger wins**. A memory may cache a decision; the ledger
  is canonical.
- **Promotion is a ceremony, not a copy** — entering the governed tier acquires an owner, a status, and
  an audit entry. A `write` that reaches it directly has not implemented routing.
- **ADRs are the project-scoped instantiation** — the industry's ADR practice is this tier applied to
  one codebase's architecture, the `team × project` cell of the 2×2. The tier itself spans the org
  column too.
- **The ledger is a harness component that gets tracked** — it is graded inside `5b`'s row, and it
  carries a version like any other component (see the 2026-09-01 versioning amendment at `1a`/`2a`/`3d`).

This also ends the conflation `01-concepts.md` §4.1 recorded — *"Folded into Evidence, which conflates
what happened with what we decided."* `8b` keeps the join **to** decisions; `5b` holds the decisions.
The Briefing (§3.3) remains a separate, still-open `5d` candidate — this ruling does not touch it.

### 3.10 ✅ RULED 2026-09-01 — lineage Ruling 1 reconciled: the layers are navigation, the components are the primitive set

[`../archive/v0/06-lineage.md`](../../archive/v0/06-lineage.md) §6 Ruling 1 — *"the map is not a layer cake… The map we owe
a reader is not a containment tree of abstract layers — it is the set of primitives a harness needs, in
the order a team comes to need them"* — demanded honoring or overturning **in writing**. This is the
honoring:

- **The 33 components are that primitive set**, numbered bottom-up in adoption order. Each is a
  gradeable function, not a container; no component is *inside* another.
- **The 12 layers are navigation**, and after `O-6` (§3.7) they are literally the warp threads — a
  reading aid and a Grid compression, not a containment claim. The structure block's own first line has
  said this since W1: *the layer is navigation; the component is the gradeable function.*
- **The typed-relations half of the ruling is still owed.** Ruling 1's consequence demands *"typed
  relations and verb-bounding — not a pretty diagram of nested rings."* The archived
  [`../archive/07-the-map.md`](../../archive/07-the-map.md) §7 prototyped exactly that (`performs` ·
  `provided-by` · `requires` · `records-in` · `graded-by` · `targets`) and was retired with the
  vocabulary it described. That deliverable — the relations over the 33, plus a `run-by` column naming
  the human or agent that operates each, plus the loop overlay in Voss's loop-taxonomy vocabulary — is
  assigned to the **`harness-map-v1`** workstream (post-W7, built interactively per
  `references/architect-craft/02-harness-sizing-lens.md` §7.1's SCAFFOLD finding).

### 3.11 Recorded 2026-09-01 — two gaps, and one absence closed by amendment

- **Pre-decision judgment has no home.** `references/architect-craft/02-harness-sizing-lens.md` §3.1:
  the twelve layers house `A8` (layer 9 IMPROVE) and none of `A1` *frame the space*, `A3` *surface
  hidden assumptions*, `A4` *right-size complexity*. The layers cover the work and its improvement;
  they cover the judgment **before** the work essentially not at all. Named, not closed.
- **The conformance spectrum is unstated.** Which layers a member's personal stack may diverge on
  (layers 0–3's core, `5a`) versus which conform under *tighten-never-loosen* (`3e` Standards, `5b`'s
  governed tier, `6a` Product) exists in halves — `3e`'s inheritance contract and
  [`../archive/v0/09-context-layer.md`](../../archive/v0/09-context-layer.md) §7's conformance surface — never joined into
  one statement. Assigned to `W5`'s `00-README.md`.
  **✅ Closed 2026-09-01** — [`00-README.md`](./00-README.md) §*The conformance spectrum* now carries the
  joined statement, dated 2026-09-01 and citing this entry back: layers 0–2, `3a`–`3d`, and `5a` may
  diverge; `3e`, `5b`'s governed tier (including the decision ledger), and `6a` conform under
  tighten-never-loosen.
- **Harness self-versioning was absent everywhere and is closed by amendment**, not recorded as a gap:
  the 2026-09-01 amendment adds it to `1a` (the entry declares a version), `2a` (the adapter asserts
  compatibility) and `3d` (the mechanisms carry versions), on citations already in the teardowns. The
  peers were ahead; the framework had not looked.

### 3.12 ✅ RULED 2026-09-01 — the gradeable unit is named `component`, and `sub-layer` retires

> **KD's ruling:** the gradeable unit is a **component**, not a **sub-layer**. The layer is navigation;
> **the component is the gradeable function** — one sentence, one noun, everywhere it appears.
> Component IDs are unchanged: `<layer><letter>` (`5b`, `9d`, …) still names the position, and the
> scheme is **not evidence for the losing noun** — an ID that survives a naming ruling untouched was
> never partisan to it.
>
> **The count sentence is restated in the vocabulary it now keeps:**
> **12 layers · 33 components · 17 inherited function IDs (`F0`–`F16`) · 17 jobs (`J1`–`J17`).**

**This engages [`../archive/v0/02-functions.md`](../../archive/v0/02-functions.md) §0.5 directly, because
that section was written to require exactly this.** §0.5 commits: *"This is the third numbering of the
same twelve (`N1`–`N12` → `E0`–`E11` → `F0`–`F11`)… **There will not be a fourth.** A rename costs ~550
citations across 28 files and buys clarity only the first time… This paragraph exists so that a future
editor has to argue with it."* Here is the argument.

**§0.5's ban is on renumbering the same twelve units a fourth time.** `N`→`E`→`F` is one identical set
of twelve, relettered three times over one fortnight. This ruling touches none of that: `F0`–`F16` are
untouched, archived, and every one of them still resolves through §2's supersession crosswalk exactly as
it did before this section was written. **`component` names a different set** — the thirty-three §1
derives from the seventeen jobs, a set that did not exist when §0.5 was written and that no prior letter
has ever named. This is a **naming**, not a **renaming**, and §0.5's cost argument — the ~550 citations,
the 28 files, *"buys clarity only the first time"* — does not transfer to it, because the noun it
retires was never the published one to begin with: [`00-README.md`](./00-README.md) says `component` 75
times and `sub-layer` zero; the 33 filenames under `content/` already read `component-NN-*.md`; and the
majority of this document's own W1–W7 prose already says `component`. **The loser was never load-bearing
outside this file.**

**The falsifier, stated so a reader can use it.** If a reader can show that `sub-layer` was in fact the
published, cited noun that downstream work depends on — a workstream PRD keyed to it, an external
citation of it, a generated artifact that reads it — **then this is the fourth rename `02-functions.md`
§0.5 forbids, and this ruling should be reversed**, not patched around.

**Why the fork happened, and why it went unnoticed.** `scripts/check-element-vocabulary.mjs` parses and
polices `E<n> Name` / `F<n> Name` pairs — it has never had a rule about the noun that names the *set*
those pairs belong to, so this file could carry "sub-layer" ~41 times and "component" 4 times while
`00-README.md` carried the reverse, and the guard would report nothing: the unit noun sits entirely
outside what it reads. `02-functions.md` §0.6 names this exact class of blindness in its own guard:
*"A validator that cannot see its own source cannot detect drift at the source, only downstream of
it."* **Recorded here as a known, accepted gap.** KD has decided not to add a vocabulary guard for the
unit noun during this ideation phase — these are markdown files being argued over, not code with a
runtime to protect, and a second guard is not the fix for a naming decided in one sitting. No guard is
written by this ruling.

**Consequence.** `sub-layer` retires wherever it names the unit, migrated across this crosswalk,
`05-preflight.md`, and the 33 component files, judged instance by instance rather than by a blind
substitution. It is kept, deliberately, inside quotations of other documents, which do not change. Two scripts were anchored on the retired
noun and broke on the migration: `scripts/check-function-count.mjs` and `scripts/gen-grid-rows.mjs` both
parsed §0's canonical count line against the literal string *"thirty-three sub-layers"*, and both hard-
errored — *could not find the canonical count line* — rather than reporting a count mismatch. Both were
repaired the same day: each parser now accepts either noun, and `check-function-count.mjs`'s prose scan
was widened to watch `components` as well, since a scan still watching only the retired word would have
gone silently blind. **That widening has a cost this ruling accepts:** `component` is ordinary English in
a way `sub-layer` was not, so the prose scan now collides with unrelated uses — the first, `00-MAP.md`'s
description of a research matrix's *"18 components × 9 systems"*, is a recorded exemption. Expect more.
The noun that could not be checked has been traded for one that will be over-checked. Guard-gating is
disabled for this phase, so neither script gates work today; both are repaired so that re-enabling them
is a decision rather than a discovery.

---

### 3.13 Component candidates — probation, promotion, retirement

**Recorded 2026-09-07 (W9).** `skills/harness-teardown/SKILL.md` §4 states *"Do not add a 34th row or
rename one"* and gave that prohibition no exit. This is the exit. It is not a relaxation: the
prohibition still binds every teardown, and admission is a ruling, not a judgement call.

**The admission test already existed and nobody connected it.**
[`../../comparisons/04-harness-alignment.md`](../../comparisons/04-harness-alignment.md) §1 states the
evidence rule for the `emerging` / `claimed` / `bet` markers: ***two peers shipping it as a named
primitive***. That is the test. It is cited, not re-invented.

**Probation.** A candidate object is named in profiles as a `◐`-with-note or a detail-row line and
**never given a matrix row**. It costs nothing until it graduates — which matters, because admission
costs twenty-four edits (ten enumerations, twelve profile matrices, `maturity/grid.html` and
`assets/templates/layer-stack.mmd`; the full list is in
[`../../docs/agents/intake.md`](../../docs/agents/intake.md) §3).

**Promotion** requires all three: the two-peers test met; an argument that **no current row absorbs
it** — the `2.2` shape, *"the nearest thing that is not it"*; and the twenty-four-place sync paid in
**one commit**. Promotion is a ruling **and** a `SKILL.md` revision, because the skill owns the anchor
slugs.

**Retirement** is by ruling: re-head, never delete, per `CLAUDE.md`. **Ids are never reused.**

#### The current candidates

Seeded from the objects `fractal/ISSUES.md` ISSUE-007 already names as UNDERCOUNTs. Each was noticed
in a teardown and never routed anywhere — precisely the failure this section closes. **None is
proposed for admission**; they are recorded so the argument is not re-run from scratch.

| Object | Vendor's words | Peers seen | Nearest row that may already absorb it | State |
|---|---|---|---|---|
| `gateway` | *"the gateway never opens an inbound port"*; `gateway.profile_routes` | Hermes; OpenClaw and Gas City sit at the same altitude | `3b` Routing · `2a` Adapters | **PROBATION** — one peer names it as an object; the altitude is already carried by §1's loop question |
| audit ledger | *"never stores prompts, message bodies, tool arguments, tool results"* — metadata only | OpenClaw | `8b` Evidence | **PROBATION** — a *property of* `8b`, not a peer of it. Likely resolves as a vocabulary row |
| operator roles / scopes | creator · owner · participant; session owner *"in the style of a GitHub issue assignee"* | OpenClaw; QM's rooms and scopes | `10b` Org · `4b` Capability Permissions | **PROBATION** — two peers, but `10b`'s own question already asks *who answers* |
| `/goal` | a goal with a token budget and an independent evidence review | Hermes | `3a` Control · `7a` Workflow Tasks | **REJECTED** 2026-09-07 — one peer, and `3a`'s question covers it. Recorded, not deleted |

**The count stays 33.** Nothing here changes it.

---

*The design: [`../archive/v0/11-architecture.md`](../../archive/v0/11-architecture.md) §1 · The jobs:
[`../../references/comparisons/03-jtbd.md`](../../comparisons/03-jtbd.md) · The ancestor,
re-argued and never copied: [`../archive/v0/02-functions.md`](../../archive/v0/02-functions.md) · The horizon rule:
[`12-horizon.md`](./12-horizon.md) §2*
