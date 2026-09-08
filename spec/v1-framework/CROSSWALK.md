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

## 3. RECORDED GAPS — moved 2026-09-08

**This section is live and was carried out of this file**, to
[`../../components/CROSSWALK.md`](../../components/CROSSWALK.md), when the v1 specification was
archived. Six of its thirteen subsections hold the **text of a ruling** — `RULINGS.md` names this
file as one of three sanctioned homes for one — and `CLAUDE.md` requires everything under `archive/`
to be `ARCHIVED` or `SUPERSEDED`. A live rule cannot live in the archive, so the register left and
the derivation stayed.

**The headings were carried verbatim**, so every `#3.1`…`#3.13` anchor that pointed here still
resolves at the new path. §3.13, the component-candidates register, is likewise live there.
