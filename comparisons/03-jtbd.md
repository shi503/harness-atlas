---
title: "Comparisons — the jobs a process layer must do"
tier: reference
project: loomwarp
created: "2026-08-11"
updated: "2026-08-26"
status: DRAFT
owner: KD
---

# The jobs a process layer must do

**What this is.** The functional jobs any system in this category has to perform for a team — what a
harness or process layer is *for*, stated as work rather than as positioning. Each job carries who does it and how, which function owns it, and whether it is **converged** in the field or **ours**. Seventeen jobs, grouped by the layer they live at and ordered from most established to least modelled.

**Why it was rewritten.** The first version of this document recorded one job statement per system in
each vendor's own marketing words, then clustered them into four pains. KD's note:

> *"I don't think that the JTBD was correctly rendered and executed to what I was expecting to
> **define** the JTBD for what harnesses (or agentOS etc.) should be doing. For example, some of the
> JTBD's that they all cover is solving things like 'memory' or context management, orchestration,
> validation, self-healing."*

That is right, and the distinction matters: *"stop babysitting"* is a pain a vendor sells against;
*"recover from a failed step without a human"* is a job a system either does or does not do. The
vendor statements survive as [Appendix A](#appendix-a--how-each-system-describes-its-own-problem) —
they are real data about positioning, just not the answer to this question.

**Where the job list comes from.** Not invented. Four published enumerations converge, and KD's list
overlaps them almost exactly:

| Source | What it enumerates |
|---|---|
| **Weng**, *Harness Engineering* (Lil'Log, 2026-07-04) | orchestrate execution · plan · call tools and act · perceive and manage context · store artifacts · evaluate results · permission control · persistent state |
| **Trivedy**, *Anatomy of an Agent Harness* (LangChain, 2026-03-10) | system prompts · tools/skills/MCPs · bundled infrastructure · orchestration logic · hooks and middleware |
| **AAIF** taxonomy (2026-08-19) | control flow · environment access · state & memory · I/O shaping · observability |
| **Debois**, *Agent Enablement* + CDLC (Tessl) | enablement · platform · governance; generate · evaluate · distribute · observe |
| **KD** | memory · context management · orchestration · validation · self-healing |

Full cross-reference: [`2026-08-research/02-harness-taxonomies.md`](./2026-08-research/02-harness-taxonomies.md).

---

> **Status note, 2026-08-27.** Jobs are the **evidence layer** for functions, not a rival vocabulary —
> [`../../specs/v0/02-functions.md`](../archive/v0/02-functions.md) §0.1. **IDs are unchanged**, because
> the CORE/OURS line here was *measured against a 562-session corpus rather than asserted* and is the
> least-invented artifact in the corpus. Demoted as a vocabulary; never as evidence.
>
> `J1`, `J2` and `J8` are specified as a pluggable contract at
> [`../../specs/v0/09-context-layer.md`](../archive/v0/09-context-layer.md). **§4's open question —
> *"Is permission-aware context one job or two?"*, raised here and left unassigned — is answered** in
> that spec §5.1: one function (`F3`), with the enforcement point in `F6`. Recorded as `OPEN-13` because
> the alternative was not argued out.

## 1. How the convergence line is drawn

Every job carries a status, because *"what does everyone do"* and *"what do we add"* are different
questions and blurring them is how a comparison document becomes a brochure.

| Status | Test |
|---|---|
| **CORE — converged** | Named by two or more independent published sources, and every serious system does it |
| **CORE — contested** | Everyone does it; they disagree on *how*. The disagreement is the interesting part |
| **OURS** | We assert it belongs and the field has not named it. **Must carry the argument, not just the assertion** |

Status was **measured, not asserted**, on two axes that can disagree:

1. **Practitioner attention** — occurrences across the 562-session AI Engineer World's Fair 2026
   corpus, committed at [`2026-08-research/data/`](./2026-08-research/data) and reproducible with one
   `grep`.
2. **Structural modelling** — whether any published harness taxonomy contains the job at all.

**The cells where those two disagree are the most useful thing in this document.** A job the whole
field discusses but no model of a harness contains is a real gap, and a much stronger claim than
"we thought of it first."

> **This measurement corrected the first draft in three places.** `J7 recover` and `J12 account` were
> drafted as *ours* on intuition; the corpus says otherwise for `J7`, and says something better and
> different for `J12`. `Scope` was drafted as a new concept; it is core vocabulary we should adopt
> rather than invent. Recording that here rather than quietly fixing it, because the correction is
> the evidence that the line is drawn on data.

---

## 2. The seventeen jobs

**Flat list, grouped by the layer each job lives at**, and ordered within each group from *most
established* to *newest and least modelled*. The groups run the same way — `GROUND` is universal and
ancient; `IMPROVE` is where the field has barely started.

**Job IDs are stable identifiers, not sort order.** `J1`–`J12` keep their numbers from the previous
version so that [`2026-08-research/05-harness-factors.md`](./2026-08-research/05-harness-factors.md) and
the function crosswalk do not break. `J13`–`J17` are the additions.

`● does it · ◐ partial · ○ absent`  ·  CC = Claude Code · GC = Gas City · Ox = SageOx · gc = generic-cerebro


---

## GROUND — what you run on

Decided once, rarely revisited, and it constrains everything below it.


### J13 · Choose the ground — **CORE, universally practised and never modelled as a job**

> Decide which model, which harness, and which adapters you are building on — and record what the
> choice costs you.

| | |
|---|---|
| **Named by** | Nobody, *as a job*. Every taxonomy treats the substrate as a given and starts above it |
| **Function** | `F0 Substrate` |
| **Who** | Everyone does it; almost nobody records it. gstack `--host` · Gas City's Factory Worker Protocol · QM's per-scope adapters · Indigo's `AGENTS.md`↔`CLAUDE.md` symlink |
| **Why it is a job** | `Agent = Model + Harness` makes the substrate a *choice*, and choosing badly constrains every job below it. **Adapters are the maturity tell** — you write one only after the first choice hurt |
| **Corpus** | `harness` 113 — the layer is discussed constantly; *selecting* it is discussed as a given |


---

## KNOW — what the agent knows

The most-modelled layer in the field, and the one where the evidence is most uncomfortable.


### J1 · Compose context — **CORE, converged**

> When an agent starts a unit of work, assemble what it needs to know about this codebase, this
> convention set and this task — so it does not begin ignorant every session.

| | |
|---|---|
| **Named by** | Weng (*perceive and manage context*) · AAIF (*I/O shaping*) · Trivedy · Meng (*Context Manager*) · Macedo (*T3*) |
| **Function** | `F3 Context` |
| **Who** | CC ● nested `CLAUDE.md` + path-scoped rules · Ox ● `ox agent prime` · Indigo ● charter + three-tier search · gc ● wiki + qmd retrieval · GC ◐ · QM ● per-scope context |
| **Contested** | *How much.* The ETH study finds context files do **not** generally improve success and add 20%+ cost, with **repository overviews specifically unhelpful** while **instructions are well followed**. More context is not better; more *constraint* is |


### J2 · Remember — **CORE, converged; the individual/team split is contested**

> Persist what was learned across sessions, machines and people — and route each fact to the right
> store, so team knowledge does not die in one person's cache.

| | |
|---|---|
| **Named by** | AAIF (*State & Memory*) · Meng (*State Store*) · Weng · a whole `Memory & Continual Learning` track |
| **Function** | `F3 Context` — **which does not distinguish individual from team** |
| **Who** | gbrain ● `brain × source` · Indigo ● `core/` vs `personal/` · Ox ● shared Ledger · QM ● per-scope memory · gc ● the routing doctrine · CC ◐ auto-memory, per-user |
| **The gap** | Four peers treat the individual/team boundary as a first-class primitive and `F3` has no place for it. `generic-cerebro`'s test is the cheapest available fix: *"Would another teammate's agent need this to be correct about the project?"* If yes, it is not a memory — it is team knowledge |


---

## MOVE — how work is scoped and sequenced

Established at the top, unnamed at the bottom.


### J4 · Decompose and sequence — **CORE, converged**

> Turn intent into scoped units with real dependency edges, and dispatch them in an order that
> respects those edges.

| | |
|---|---|
| **Named by** | AAIF (*Control Flow*) · Meng (*Execution Loop*) · Macedo (*T1*) · 12-Factor (*own your control flow*) |
| **Function** | `F4 Control` |
| **Who** | CC ● agent teams with file-locked claiming · GC ● formulas · FRACTAL ● BLUEPRINT → router → dispatch · Indigo ● Ralph loop · QM ● |
| **Contested** | *Whether dependency edges are worth declaring.* FRACTAL and Gas City say yes; the Ralph loop says one task per iteration and let the loop sort it out |


### J7 · Recover — **CORE, thinly modelled**

> When a step fails, retry, escalate or self-heal — without a human noticing every time.

| | |
|---|---|
| **Named by** | AAIF's *Accuracy & Reliability* working group (*"failure management, SLA definition, and recovery protocols"*) · Chan (*Response → rollbacks*) · Meng (inside *Execution Loop*) |
| **Function** | **None.** Nearest is `F4 Control` |
| **Who** | gc ● bounded at two retries, then escalate **with a recommendation** · Indigo ● Ralph loop re-runs from fresh context · CC ◐ · GC ◐ wake modes |
| **Corpus** | `escalat` 17 · `recover` 14 · `retry` 10 · `rollback` 5 · `self-heal` 3 |
| **Status note** | **Drafted as *ours*; corrected to core.** The field discusses it and one standards-body working group names it. What is thin is the *modelling* — only Chan gives it a slot. The escalation-with-a-recommendation rule is the transferable part: an escalation without one moves the problem without moving the decision |


### J3 · Route — **OURS, with corroboration**

> Given a task, pick the right agent, the right skills and the right context — and do it
> deterministically, without a model in the decision loop.

| | |
|---|---|
| **Named by** | **Nobody, as a named function.** Buried inside Meng's *Tool Registry*; absent from AAIF, Macedo, Chan, 12-Factor |
| **Function** | `F4 Control` |
| **Who** | LoomWarp ● `router.py` · GC ● formulas → beads → orders · QM ● scope-based · gc ● the project architect · CC ◐ agent teams |
| **Why ours** | Tan names it exactly — *"a resolver is an org chart. A task comes in and it decides which markdown file or who handles it"* — but **no published taxonomy elevates routing to a layer.** It is the difference between dispatching *a* task and dispatching *the right* task |


---

## EQUIP — what the team can do, and who does it

Both jobs here are emerging: the field ships the mechanisms and names neither as a function.


### J10 · Distribute — **OURS, with corroboration**

> Get capability to every repo and every person, versioned, without a hard dependency on one
> machine's filesystem.

| | |
|---|---|
| **Named by** | **Absent from every harness taxonomy.** DORA's *platform engineering* capability is the nearest — *"the automated, secure pathways that allow AI's benefits to scale across the organization"* — but that is a delivery model, not a harness function |
| **Function** | `F5 Capability` |
| **Who** | CC ● plugins, marketplaces, SHA pinning, semver · gstack ● `--host` install · Indigo ● Rust sync app · QM ● · LoomWarp ◐ a `cp -r` loop with a known removal defect |
| **The rule worth keeping** | A distributed capability never hard-depends on the hub's filesystem. `generic-cerebro` learned this by breaking it |


### J14 · Know who exists — **EMERGING**

> Maintain a model of the people and agents doing the work: who they are, what each may do, and who
> answers for the result.

| | |
|---|---|
| **Named by** | Chan (*Identity Binding · Agent IDs · Certification*) · AAIF's *Identity & Trust* working group — *"delegation protocols, cross-domain identity, and how permissions flow across agent-to-agent interactions"* |
| **Function** | **None** |
| **Who** | QM ● per-scope identity with a central core for identity, policy and audit · Factory ● *"agents as employees"* with persistent identity, scoped permissions, audit trail, escalation path · Indigo ● worker registry · CC ◐ agent definitions, no roster |
| **Corpus** | `identity` **29** · `org chart` 1 · `roster` 1 — **the concept is well attested; the word "graph" is not** |
| **Why it matters** | **This is what `J3 route` resolves against.** Tan's line — *"a resolver is an org chart"* — assumes an org chart exists. `J3` says pick the right agent; nothing in the twelve said where the roster lives, who owns it, or how a human and an agent are represented in the same model |


---

## TRUST — why the output can be believed

The loudest layer in the corpus, and the one where our own claim narrows.


### J5 · Bound — **CORE, converged**

> Decide what the agent may do, enforce it where the model cannot reach, and record every denial.

| | |
|---|---|
| **Named by** | Macedo (**T4** — *"at least one control mechanism independent of the model"*, a membership condition) · Meng (*Lifecycle Hooks*) · Chan (*Identity & Trust*) · Böckeler (*Guides*) |
| **Function** | `F6 Policy` |
| **Who** | CC ● deny rules, hooks, managed settings, sandbox · Indigo ● hook profiles minimal/standard/strict · QM ● strict/auto/dangerous, monotonic narrowing · GC ● wake modes · LoomWarp ○ **nothing; no settings file, no hooks** |
| **Corpus** | `isolat` 38 · `permission` 27 · `boundar` 20 · `scope` family 21 |


### J6 · Validate — **CORE, converged; the loudest concern in the field**

> Decide whether the work is actually good, with gates that block rather than advise.

| | |
|---|---|
| **Named by** | Meng (*Evaluation Interface*) · AAIF (folded into *Observability*) · Böckeler (*Sensors*) · its own `Evals` track |
| **Function** | `F7 Evidence` + `F8 Learning` |
| **Who** | gc ● four layers, bottom two blocking, with a false-positive register · Indigo ● CI as back-pressure · CC ● `skill-creator` eval harness · GC ● multi-model adversarial review |
| **Corpus** | **`eval` 263 — the single most-discussed term in the field.** `code review` 29, called *"the tightest constraint in the system"* |
| **Worth stealing** | Böckeler's insight that feedback should be *"optimised for LLM consumption, e.g. custom linter messages that include instructions for the self-correction."* Our evidence artifacts are written for humans |


### J15 · Secure and harden — **CORE, converged in practice, absent from every harness taxonomy**

> Close the vulnerability surface and the quality long tail — the last 10–20% that separates
> demoable from shippable.

| | |
|---|---|
| **Named by** | AAIF's *Security & Privacy* WG · Forrester AEGIS (six domains, security only) · **not by AAIF's harness definition, Meng, Macedo, Böckeler, Chan or 12-Factor** |
| **Function** | `F6 Policy` covers *permission*; **nothing covers vulnerability or code quality** |
| **Who** | Indigo ● secrets-as-execution-context, agents never hold credentials · CC ● sandbox, managed settings · GC ● multi-model adversarial review · gc ● layered eval with a false-positive register |
| **Corpus** | `security` **62**, with its own 10-session track · `code quality` 5 · `technical debt` 2 |
| **Why it is distinct from `J5`** | `J5 bound` asks *what is this agent allowed to do*. This asks *is the output safe and good enough to ship*. **Different failure modes**: `J5` fails as a breach, this fails as a slow accumulation nobody notices — Osmani's *comprehension debt*. Horthy's keynote is precisely the argument that this one has a ceiling |


### J8 · Prove — **CORE, contested. The join is ours**

> Show what the agent actually saw, under what authority, and what came of it — so completion is
> verified rather than asserted.

| | |
|---|---|
| **Named by** | Chan (*Attribution*) · AAIF (*Observability & Traceability*) · **Govindarajan (OpenAI) — the run receipt** |
| **Function** | `F3` Briefing + `F7` Verdict |
| **Who** | CC ● OTel with full attribution · GC ● Event Stream · Ox ● Ledger · QM ● durable Postgres · gc ● hash-verified decision store · LoomWarp ◐ `events.jsonl`, 8 events, none schema-validated |
| **Corpus** | `trace` 65 · `audit` 39 · `evidence` 22 · `attribut` 14 · **`provenance` 9 · `receipt` 4** |
| **Where it narrows** | *"A model proposes, the harness commits, and **the receipt proves it**"* — a run receipt covering *"what woke it up, which state did it inherit, what authority did it use, what executed, and what evidence survived."* **The idea is claimed; no implementation was demonstrated.** The field observes runs thoroughly; the **join between context set and outcome** is what stays scarce, and that is the defensible claim |


---

## TOGETHER — once more than one person depends on it

The break that produced this whole category of system.


### J11 · Coordinate humans — **CORE, emerging**

> Let several people see, share and act on the same agent work — without context trapped on one
> developer's machine.

| | |
|---|---|
| **Named by** | Chan (*Interaction → oversight layers*) · absent from AAIF, Meng, Macedo |
| **Function** | **None.** `F1 Surfaces` covers source-of-truth, not channel |
| **Who** | QM ● rooms, per-scope everything · Claude Tag ● one shared Claude per channel · Superconductor ● every agent session shared and addressable · Ox ● *"multiplayer by default"* · OpenClaw ○ *"designed for a single operator"* |
| **Corpus** | `multiplayer` 6 — narrow, and consistently meaning **concurrent humans**. Concurrent *agents* are fleets, swarms, orchestration |
| **Why it matters** | Superconductor states the problem better than we do: *"For a solo developer, coding agents are a superpower. For a team, they surface new kinds of bottlenecks: coordination, visibility, review, and shared context."* **This is why the harness broadened to the team** |


---

## IMPROVE — jobs performed on the harness itself, not on a unit of work

**This layer is why the list grew.** J1–J12 were all things a system does *for a unit of work*.
KD's additions exposed a second altitude — diagnosing, hardening and accounting for the harness
itself. That is Voss's *system* and *oversight* loop ◐, and by Voss's own account the outermost ring
was still labelled `"????"` in the field's diagram until July 2026. **We reproduced the omission**,
which is the best available explanation for why these four are the least modelled anywhere.

> ◐ **Sourcing, tightened 2026-08-27.** *Voss's loop taxonomy*, not "the five loops" — there is no
> published framework by that name, and the `"????"` ring is Voss's description of swyx's diagram
> rather than a direct read of it. Full sourcing limits:
> [`2026-08-research/01-worldsfair-2026-vocabulary.md`](./2026-08-research/01-worldsfair-2026-vocabulary.md) §4.


### J9 · Compound — **OURS, with corroboration**

> Make the next unit of work better than the last, so knowledge appreciates instead of being
> rediscovered.

| | |
|---|---|
| **Named by** | **Absent from every published harness taxonomy.** Karpathy's llm-wiki names the *pattern*; no function list contains it |
| **Function** | `F8 Learning` |
| **Who** | gbrain ● · Ox ● automatic capture via hooks · gc ● finding-classes promoting into standards · Indigo ◐ manual `/learn` · CC ◐ `skill-creator` · LoomWarp ○ designed only |
| **The bar** | Karpathy's, and it is the sharpest in the category: ***does knowledge compound, or does it just get retrieved?*** |
| **Contested** | *Automatic versus ratified capture.* SageOx bet $15M that manual curation is the failure mode; `generic-cerebro` treats **unratified** capture as the failure mode and spends the friction on a promotion gate. Both cannot be right |


### J16 · Raise the floor — **OURS. The mechanism that creates primitives**

> Graduate a working convention into the single sanctioned way, and keep doing it — so the floor
> rises instead of the harness going stagnant.

| | |
|---|---|
| **Named by** | **Nobody as a job.** CNCF platform engineering has *golden paths* — *"the curated, pre-approved blueprints that make the secure, compliant choice the easiest choice"* — but as an artifact, not as a ratchet |
| **Function** | **None.** `F8 Learning` promotes *knowledge*; this promotes *convention* |
| **Who** | gstack ● *"at the end of every task, ask the agent to skillify what it did"* · gc ● finding-classes hardening into standards · CC ◐ `skill-creator` · everyone else ○ |
| **Corpus** | `harden` 10 · `golden path` 6 · `best practice` 3 · **`stagnat` 0** |
| **Why it is ours, and why it matters most** | [`04-primitives-ontology-platform.md`](./2026-08-research/04-primitives-ontology-platform.md) establishes that a primitive set *is* a harness's architecture. **This is the job that produces one.** Primitives are the static state — *there is one way*; this is the dynamic — *how a second way gets retired*. And the failure it prevents is the one nobody models: **a harness does not stay still. Without a ratchet the floor drops**, conventions multiply, and the agent starts reinventing. That `stagnat` scores **0** is the point — decay is not being discussed at all |


### J17 · Diagnose the bottleneck — **CORE by attention, absent from every model. Maturity-gated**

> Know which constraint is currently limiting throughput, and therefore what to fix next — and know
> when the harness itself must evolve.

| | |
|---|---|
| **Named by** | **No harness taxonomy.** The idea is Theory of Constraints, arriving in this field without the label |
| **Function** | **None** — though the Grid's *minimum governs* rule is already this, unrecognised |
| **Who** | Nobody, as a named capability. DX/Jellyfish instrument *throughput*; none of them names the constraint |
| **Corpus** | `bottleneck` **37** · `constraint` **26** — **larger than most of the original twelve.** Substantive, not incidental: *"the real bottlenecks are left and right of code: planning, orchestration, review, and operations"* · *"Governance Is the Real Bottleneck to AI ROI"* · Uber — *"human-only code reviews create massive bottlenecks"*, *"the monorepo bottleneck"* |
| **The maturity gate** | **This is not a job a young harness can do.** You cannot detect a constraint without measurement, and measurement means ritualized, scheduled checks — code review on a cadence, quality checks on cron or hooks. **`J17` depends on rituals and on `J12 account`**, which is why it appears late on the scale axis and why it is the only job here with a stated prerequisite |
| **Why it is the wedge** | The Grid already computes this and does not say so. **The thinnest warp thread *is* the bottleneck** — so the maturity diagnostic does not merely grade a team, it names what to fix next, and the answer moves as they fix it. `00-README.md` F-5 found the diagnostic is the one asset that costs an adopter nothing to try. This is what it is *for* |


### J12 · Account — **OURS. The sharpest cell in the document**

> Show what the work cost and what it returned, so the business can decide whether to keep buying it.

| | |
|---|---|
| **Named by** | **No harness taxonomy treats budget as a named function.** Not AAIF, Meng, Macedo, Böckeler, Chan or 12-Factor. The nearest is one arXiv stack's *"Agent Economic Primitives"* |
| **Function** | **None** |
| **Who** | CC ● OTel cost attributed by agent, skill, plugin, MCP server · DX/Jellyfish ● measurement products · everyone else ○ |
| **Corpus** | `cost` 70 · `budget` 23 · `spend` 22 · `throughput` 21 · `tokenmax` 13 — **plus an entire `AI Architects: Tokenmaxxing` track** |
| **Why this is the sharpest** | **The two axes disagree, and that disagreement *is* the finding.** Practitioners are saturated with cost; every structural model omits it. A high-attention operational concern with no home in any model of what a harness is. That is far stronger than "we thought of it first" — and it answers KD's mandate that the framework must *"provide a clear ROI to the business."* Note the honest boundary: measurement products own the *instrumentation*. What is unclaimed is cost as a **first-class function of the framework**, joined to the work it paid for |

---

---

## 3. The scorecard

Ordered as above. **Attention** is corpus occurrences; **modelled** is whether any published harness
taxonomy contains the job at all. The rows where those two disagree are the useful ones.

| Layer | Job | Attention | Modelled? | Status | Function |
|---|---|---|---|---|---|
| GROUND | J13 choose the ground | `harness` 113 | ❌ **not as a job** | CORE — unmodelled | `F0` |
| KNOW | J1 compose context | heavy | ✅ all | CORE — converged | `F3` |
| KNOW | J2 remember | heavy | ✅ all | CORE — split uncovered | `F3` ⚠️ |
| MOVE | J4 decompose | heavy | ✅ all | CORE — converged | `F4` |
| MOVE | J7 recover | present | ◐ thin | CORE — thinly modelled | **none** |
| MOVE | **J3 route** | present | ❌ **none** | **OURS** | `F4` |
| EQUIP | **J10 distribute** | present | ❌ **none** | **OURS** | `F5` |
| EQUIP | **J14 know who exists** | `identity` 29 | ◐ Chan, AAIF WG | **EMERGING** | **none** |
| TRUST | J5 bound | heavy | ✅ most | CORE — converged | `F6` |
| TRUST | J6 validate | **`eval` 263** | ✅ most | CORE — converged | `F7` `F8` |
| TRUST | **J15 secure and harden** | **`security` 62** | ❌ **none** | CORE — unmodelled | `F6` ⚠️ |
| TRUST | J8 prove | heavy | ◐ partial | CORE — the join is ours | `F3` `F7` |
| TOGETHER | J11 coordinate humans | `multiplayer` 6 · `transcri` 12 | ◐ Chan only | CORE — emerging | **none** |
| IMPROVE | **J9 compound** | pattern named | ❌ **none** | **OURS** | `F8` |
| IMPROVE | **J16 raise the floor** | `harden` 10 · **`stagnat` 0** | ❌ **none** | **OURS** | **none** |
| IMPROVE | **J17 diagnose the bottleneck** | **`bottleneck` 37 · `constraint` 26** | ❌ **none** | **OURS** — gated | **none** |
| IMPROVE | **J12 account** | **`cost` 70 + own track** | ❌ **none** | **OURS** | **none** |

**Seven of seventeen are ours or emerging; six have no function.** The concentration is the finding:
**every job in `IMPROVE` is unmodelled, and three of the four have no function.** That is not four
separate gaps — it is one gap with four names, and it is the altitude the field has not reached.

**Two rows are unmodelled despite heavy attention, and they are the strongest claims here.**
`J15 secure` (`security` 62, with its own track) and `J17 diagnose` (`bottleneck` 37 + `constraint`
26) are discussed constantly by practitioners and contained by no model of what a harness is. That
pattern — high attention, zero structure — was already true of `J12 account`, and it is now true three
times. **Three independent instances of the same shape is a claim about the field, not about us.**

### Dependencies between jobs

Most jobs are independent. Three are not, and the ordering matters for anyone building:

- **`J17 diagnose` requires `J12 account` and ritualized checks.** You cannot name a constraint without
  measurement, and measurement means code review, quality checks and evals running on a cadence —
  cron, hooks, or a scheduled agent. This is why `J17` is late on the scale axis.
- **`J3 route` requires `J14 know who exists`.** *"A resolver is an org chart"* presumes the chart.
- **`J16 raise the floor` consumes `J6 validate` and `J9 compound`.** A convention graduates to a
  golden path because evidence accumulated that it works.

---

## 4. What the jobs say about the function model

Six jobs have no function. Grouped by what they imply:

| Jobs with no function | What it suggests |
|---|---|
| `J7 recover` | Sits under `F4 Control`, or joins a Trust-band function |
| `J11 coordinate humans` · **Rituals** | The `Rituals` candidate — see below |
| `J14 know who exists` | New. The roster is neither `F2 Estate` (repos) nor `F5 Capability` (skills) |
| `J15 secure and harden` | `F6 Policy` needs to widen, or a Trust-band function splits |
| `J16 raise the floor` · `J17 diagnose` · `J12 account` | **A missing band.** All three act on the harness rather than on the work |

> **`OPEN-3` now has a sharper test than "is nine too many."** Ask instead: *does every job the field
> agrees on have somewhere to live?* Six do not — and four of those six cluster in one layer, which
> argues for **one new band rather than four new functions.**

### On `Rituals` — I was wrong, and `OPEN-8` reopens

The previous version argued the corpus killed Rituals: `standup` 0, `ceremon` 0, `peer review` 0.

**That argument applied two different thresholds to two concepts.** It called `multiplayer` (**6**)
*"real but emerging"* and Rituals (`ritual` 1) dead — while **`transcri` scores 12**, twice
`multiplayer`. The test was run until it produced the answer already drafted.

**And it tested the wrong thing.** KD's mechanism: transcription adoption made meetings
**machine-readable**. The ritual now emits an artifact a harness can consume — which is a different
claim from *"agents don't attend standups."* A ritual is not a meeting; it is **a scheduled loop that
produces an artifact**, and on that definition the corpus supports it directly — cron-triggered
reviews, scheduled quality checks, the nightly maintenance pass.

**That reframing also makes `J17` possible.** Scheduled checks are what produce the measurement a
bottleneck diagnosis reads. So Rituals is not a soft cultural add-on: **it is the instrumentation
layer `J17` depends on.** `OPEN-8` reopens on those grounds, alongside `OPEN-9`.

### Two questions the additions raise that the model cannot currently answer

**Does the framework assume software?** `J10` distributes to *repos*; `J8` proves against *commits*;
`J15` hardens *code*. If the deliverable is a PDF, a campaign or a research brief, most of this still
applies and some of it does not. **The framework has never stated its own scope**, and it should —
either as a deliberate boundary or as a gap.

**Is permission-aware context one job or two?** `J5 bound` governs what an agent may *do*; `J1 compose`
governs what it *sees*. Governing what it may *see* — RBAC over context — falls between them, and the
Indigo landscape analysis called it **whitespace #1** in the whole category. It is currently nobody's
job in this list.

---

## 5. Positions worth answering

A comparison document that cites only supporters of its own category is marketing.

- **Dex Horthy** (HumanLayer), *"Harness Engineering is not Enough: Why Software Factories Fail"* —
  Main Stage keynote. Models are rewarded for passing tests, not for preserving design quality;
  verifying architectural quality takes months, so the reward signal cannot propagate. **If he is
  right, J6 has a ceiling no amount of J1–J5 can raise.** Our answer is `J8` — if you cannot verify
  quality quickly, you can at least record what produced it and evaluate retroactively. That is a
  claim we should make explicitly rather than leaving implied.
- **Kyle Mistele** (HumanLayer) ran a lights-off factory for six months: *"bad code compounded, and
  agents created problems that agents couldn't solve — until we had to throw it all away."* The
  strongest available argument for `J8` and against maximal autonomy.
- **Ryan Cooke** (WorkOS), *"No, That's Not a Software Factory"* — the factory is *"the way work gets
  planned, scoped, and verified, and the conventions and judgment calls that define your engineering
  culture."* **That is this project's thesis, published by someone else.** Corroboration, and a
  warning that the position is not ours alone.

---

## Appendix A — how each system describes its own problem

*Preserved from the first version of this document. These are vendor positioning statements —
real data about where each system will invest next, but not an answer to what a process layer
must do. KD's notes are retained inline.*


### Gas City — *stop babysitting*

> When I am cycling between terminals re-injecting context and guardrails by hand, I want a factory that runs multi-agent workflows unattended, so I can build software at a scale my attention does not bound.

Yegge's problem statement is babysitting, and every primitive answers it: formulas make the workflow declarative, orders make it trigger-driven, the Factory Worker Protocol makes the worker substitutable, the Event Stream tells you what happened while you were not watching. The framing is industrial — *"a system for building, validating, deploying, operating, and maintaining production software."*

### SageOx — *stop losing the conversation*

> When my team's decisions live in discussions my coding agent never saw, I want those decisions captured automatically and loaded into every session, so no agent or teammate starts from zero.

The sharpest problem statement in the landscape, and the most specific:

> *"AI agents are missing all the discussions your team is having."*
> *"Every agent session starts with everything your team already knows."*
> *"Your assistants stop being strangers. They know what your team knows."*

Note what is load-bearing: **automatic** capture. Everyone else's capture loop is manual — Indigo's `/learn`, gstack's *"ask the agent to skillify what it did"*, our `F8`. SageOx built a hardware device to capture in-person conversation because it treats manual capture as the failure.
### gstack / gbrain — *stop renting your own judgment*

> When my leverage lives in a tool somebody else owns, I want my context and procedures in files I control, so the compounding accrues to me rather than to the platform.

Tan's job is custody, not productivity — productivity is the evidence, custody is the point:

> *"Skill files are yours. Own your skills because if you don't, your job becomes a skill file."*

And the compounding discipline that makes it work: *"Never do one-off work… At the end of every task, ask the agent to skillify what it did."* The job is served by making every task leave a reusable artifact behind.

### QM — *stop the multiplayer mess*

> When many people and many agents work in one org, I want isolated workspaces that can also meet in shared rooms, so we get collaboration without shared-state chaos.

Scope is the answer to the job: an isolated bundle per user or per room containing memory, files,
keychain view, permissions, crons, and a durable sandbox. The durability requirement follows from the same job — *"nothing important lives only in a model's context window"* — because multiplayer work outlives any one session.
### Indigo HQ — *stop re-explaining the company*

> When every agent session starts ignorant of our conventions, policies and infrastructure, I want a governed shared context layer underneath whichever agent we use, so the company's knowledge is installed rather than re-typed.

The job is served through pure open standards — `AGENTS.md` symlinked to `.claude/CLAUDE.md`, `SKILL.md`, hooks — which is also the strategic bet: ride the standards rather than fight them.

### Claude Code — *make the agent capable in this repo*

> When I need an agent to do real work in a real codebase, I want tools, memory, permissions and extension points that work out of the box, so capability is not a project.

The harness's job is bounded at the harness. It is deliberately not answering the team-scale or
org-scale question, which is exactly the room every process layer above is occupying.

### FRACTAL — *stop unbounded agent work*

> When an agent's scope drifts and its output cannot be trusted, I want tiered decomposition with explicit handoff gates, so each unit of work is bounded and its completion is checked and verifiably complete built to our standards.
### generic-cerebro — *stop every agent starting from a different truth*

> When every repository, agent and teammate works from a different copy of what we know and what we decided, I want one canonical surface that every agent retrieves from and every decision is promoted into, so the system appreciates as we use it instead of fragmenting.

Its own words for the property: *"the system improves itself as we use it — every ingest, decision
and synthesis appreciates what's available to the next agent invocation."* Two things are worth
noting against the other statements here. **The job is convergence, not autonomy** — the problem being solved is divergent truth across people and repos, which is a different problem from Gas City's babysitting or FRACTAL's scope drift, and it is the one job in this list that gets worse rather than better as the team grows. And **its answer to capture is deliberately manual**: an inbox, an ingest step, a promotion ceremony. Where SageOx treats manual capture as the failure mode, this system treats *unratified* capture as the failure mode, and spends the friction on the promotion boundary instead. Teardown: [`systems/kd-built-frameworks/`](./systems/kd-built-frameworks).

> KD note: similar to YC's qm (aka quartermaster) generic-cerebro was also supposed to be the multiplayer solution to an org's problems. Obviously this seems the implementation was deficient in its current state so we should "beg borrow steal" and combine the best of both worlds from our competitors in the v1 of our loomwarp implementation. 
> - We should also note that this was most similar to Gas City where the end-goal was to create AI-first and AI-native team workflows that were targeting enterprise grade production software.  In the long-term planning for the original cerebro, this would be a clinical grade SaaS software with full CI/CD, SOC2 compliance, and multi-tenancy for self-serve clients. A significantly higher bar and likely the most mature on the best practice software scale. 

### LoomWarp — *prove what the agent saw*

> When work spans repositories and I cannot tell what context produced a result, I want a control plane that records what the agent saw, at which version, under which policy, and what evidence resulted, so completion can be verified rather than asserted.

**Read against its predecessor, this is a narrowing rather than a continuation.** The predecessor's job is *make one truth available*; LoomWarp's is *prove which truth was used*. The second is the harder and less-served problem — and the predecessor is direct evidence for why the narrowing was right, since it achieved convergence across 1,445 documents and still could not answer what any given agent actually saw.

> KD Note: similar to our previous notes on generic-cerebro, we should assume that our goal is to 1) express what is the best framework that captures where our industry is headed 2) adopt solutions that cover a majority of the needs for teams that are trying to ship production grade software across a large-scale virtual monorepo (or monorepo) and can comparatively scale to our small AI-enabled teams. (like Gas City)

---
## KD Notes — other jobs, concepts and primitives, and where each landed

*Raised 2026-08-26. Every item is dispositioned; nothing is silently dropped. The original wording is
preserved under each verdict.*

| # | KD's item | Disposition |
|---|---|---|
| 1 | **Platform / graduate golden paths** | → **`J16 raise the floor`.** Note this is *not* the "platform" rejected in `04` — that was platform-as-delivery (DORA). This is the **ratchet**, and it is the mechanism that produces a primitive set |
| 2 | **Bottlenecks** | → **`J17 diagnose the bottleneck`.** `bottleneck` 37 + `constraint` 26, larger than most of the original twelve. Maturity-gated on ritualized checks, per KD |
| 3 | **Organization graph** | → **`J14 know who exists`.** `identity` 29 carries it; "graph" does not. It is what `J3 route` resolves against |
| 4 | **Operational ontology** — org, objects, context, lineage, decision-making | **Absorbed, and KD's phrasing is better than ours.** This is [`01-concepts.md`](./01-concepts.md) §3.17's *primitive set with bounded verbs*, plus `J8`'s lineage. Recorded there |
| 5 | **LLM / agent / harness — selecting the configuration** | → **`J13 choose the ground`.** Universally practised, modelled as a job by nobody |
| 6 | **Adapters** | **Covered** — `F0`'s Adapter system, and the tell that separates a process layer from a harness. KD's *"feature of a more mature harness"* is now a placement on the scale axis in [`05-harness-factors.md`](./2026-08-research/05-harness-factors.md) §2 |
| 7 | **Tools / skill registry** | **Folded into `J10 distribute` as its enabling half.** `discover` **50** · `registry` 0 — the concept is huge, the word absent. **An agent that cannot find the skill reinvents it**, which is Factor `I` failing one level down |
| 8 | **Active vs agentic managers** — *captain + quartermaster* | **`OPEN-9`, reopened.** The captain/quartermaster split is sharper than what the corpus had: **captain sets direction, quartermaster maintains stores** — precisely the doer/steward line. Reopened because the argument that closed it rested on an enforcement mechanism that does not exist |
| 9 | **Data access management for agents** | **Recorded as an open question in §4**, not folded away. It sits between `J5 bound` (what an agent may *do*) and `J1 compose` (what it *sees*); governing what it may see is neither. The Indigo analysis called RBAC-over-context **whitespace #1** in the category, so this deserves more than a footnote |
| 10 | **Delivered work output** — GitHub, PDFs, GTM | **Recorded as a scope question in §4.** The framework assumes software throughout and has never said so. That should be a stated boundary or a stated gap |
| 11 | **Rituals** | **`OPEN-8`, reopened — and the previous dismissal was wrong.** See §4. The reframe that matters is KD's: a ritual is **a scheduled loop that emits an artifact**, not a meeting, and transcription made those artifacts machine-readable. On that definition it is also the instrumentation `J17` depends on |
| 12 | **Security, trust, code quality** | → **`J15 secure and harden`.** `security` **62** with its own track, and absent from every harness taxonomy. Genuinely distinct from `J5 bound`: different failure mode, different timescale |
| 13 | **Config and maturity model** — *raise the floor vs. let it go stagnant* | **Merged with #1 into `J16`.** The decay half is the original contribution: **`stagnat` scores 0**, so nobody is discussing harness decay at all |

**Five became jobs; two reopened as `OPEN` items; two became recorded questions; four were absorbed
into existing concepts.** The hit rate is high because these came from operating a system rather than
from reading about one — and the four in `IMPROVE` all landed in the same gap, which is what surfaced
the missing altitude.

---

*Companion: [`02-component-matrix.md`](./02-component-matrix.md) — the same systems by component ·
[`2026-08-research/02-harness-taxonomies.md`](./2026-08-research/02-harness-taxonomies.md) — the published function lists ·
[`00-README.md`](./00-README.md) — the landscape*
