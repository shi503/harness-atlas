---
title: "Component crosswalk — the recorded gaps, the rulings that closed six, and the candidates register"
tier: components
status: ACTIVE
provenance: INHERITED
created: "2026-08-31"
updated: "2026-09-08"
owner: KD
---

# Component crosswalk — recorded gaps

**What this is.** The live half of the v1 framework's `CROSSWALK.md`: thirteen recorded gaps in the
33-component structure, **six of them closed by a dated ruling** whose text lives here, and §3.13, the
register where a candidate for a thirty-fourth component waits.

**Why it is here and not in the archive.** The other half of that file — §1 *derivation* (why each
component exists) and §2 *supersession* (where every retired `F0`–`F16` citation lands) — argues for a
decision already taken, so it reads as history and was archived with the rest of the specification on
2026-09-08. **This half is not history.** [`../RULINGS.md`](../RULINGS.md) names it as one of three
sanctioned homes for a ruling's text, and `CLAUDE.md` requires everything under `archive/` to be
`ARCHIVED` or `SUPERSEDED` — a live rule cannot live there. The section headings below are carried
**verbatim**, so every anchor that pointed into §3 still resolves; only the path changed.

The roster of the 33 is [`00-README.md`](00-README.md). The derivation is
[`../spec/v1-framework/CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §1–§2.

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



`C-7` ([`../archive/v0/02-functions.md`](../archive/v0/02-functions.md) §2) resolved the Rituals question with the ruling
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

The marker is already argued and already honest: [`12-horizon.md`](../spec/v1-framework/12-horizon.md) §3.4 rules it
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
| **`OPEN-5`** — the `individual \| team × project \| org` axis has nowhere to live | **Closed** by layer 5. `5a`/`5b` are the individual/team boundary as structure; the project/org half is the `SCOPE` axis, still unfilled per [`12-horizon.md`](../spec/v1-framework/12-horizon.md) §4.1 |
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
[`../../references/grid.html`](../maturity/grid.html), carrying each layer's components as drill-down text.

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
doctrine ([`../archive/v0/09-context-layer.md`](../archive/v0/09-context-layer.md) §4, adopted verbatim from the prior
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

[`../archive/v0/06-lineage.md`](../archive/v0/06-lineage.md) §6 Ruling 1 — *"the map is not a layer cake… The map we owe
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
  [`../archive/07-the-map.md`](../archive/07-the-map.md) §7 prototyped exactly that (`performs` ·
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
  [`../archive/v0/09-context-layer.md`](../archive/v0/09-context-layer.md) §7's conformance surface — never joined into
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

**This engages [`../archive/v0/02-functions.md`](../archive/v0/02-functions.md) §0.5 directly, because
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
[`../../comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §1 states the
evidence rule for the `emerging` / `claimed` / `bet` markers: ***two peers shipping it as a named
primitive***. That is the test. It is cited, not re-invented.

**Probation.** A candidate object is named in profiles as a `◐`-with-note or a detail-row line and
**never given a matrix row**. It costs nothing until it graduates — which matters, because admission
costs twenty-four edits (ten enumerations, twelve profile matrices, `maturity/grid.html` and
`assets/templates/layer-stack.mmd`; the full list is in
[`../../docs/agents/intake.md`](../docs/agents/intake.md) §3).

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

*The design: [`../archive/v0/11-architecture.md`](../archive/v0/11-architecture.md) §1 · The jobs:
[`../../references/comparisons/03-jtbd.md`](../comparisons/03-jtbd.md) · The ancestor,
re-argued and never copied: [`../archive/v0/02-functions.md`](../archive/v0/02-functions.md) · The horizon rule:
[`12-horizon.md`](../spec/v1-framework/12-horizon.md) §2*
