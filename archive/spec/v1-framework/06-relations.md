---
title: "06-relations — the typed relations over the 33, pre-drawn"
tier: spec
project: harness-atlas
created: "2026-09-01"
status: ARCHIVED
disposition: SCAFFOLD
owner: KD
extends: spec/v1-framework/CROSSWALK.md
workstream: harness-map-v1
provenance: AUTHORED
---

# The typed relations — pre-drawn, not decided

> ## ⚠️ SCAFFOLD — this file is deliberately unfinished
>
> `fractal/workstreams/harness-map-v1.md` runs in **SCAFFOLD** mode: *"the agent prepares, renders and
> revises; KD corrects live… a session of this workstream that produces a finished map without KD in
> the loop has failed its own premise."* This file is **step 1 of that PRD's session shape** — the
> skeleton drawn before the first working session, so that the session is spent on judgment rather
> than on transcription.
>
> **Nothing below is ruled.** Every edge is either **cited** — traceable to a sentence in a component
> file that asserts it — or **proposed**, meaning it is structurally obvious and *nobody has written it
> down*, which under `AC-2` means it gets confirmed in session or deleted. Do not cite this file as
> settled structure.

**What this is.** The relation set the layer list cannot carry. [`00-README.md`](./00-README.md) is a
reading order; [`CROSSWALK.md`](./CROSSWALK.md) §3.10 rules that the typed-relations half of lineage
Ruling 1 — *"typed relations and verb-bounding, not a pretty diagram of nested rings"* — **is still
owed**. This is that half, drawn.

**The unit is the component, and no new IDs exist.** Nodes are `0a`–`11a`, exactly the 33. Jobs
(`J1`–`J17`) and inherited function IDs (`F0`–`F16`) appear as **annotations on nodes**, never as
nodes. A map that mints an ID fails its own acceptance criteria.

---

## 1. The six relation types

Revived from [`../archive/07-the-map.md`](../../07-the-map.md) §7, which prototyped them over the
retired `N<n>` vocabulary and was archived with it. The types survive the rename; the node IDs do not.

| Relation | Reads | What it enforces | State here |
|---|---|---|---|
| `performs` | a component performs a job | Every job has a component, or a written reason it has none | **Complete** — §2 |
| `requires` | `3b` **requires** `10a` | A configuration choosing one without the other is **wrong, not merely early** | **Seeded** — §3 |
| `records-in` | where the decision physically lives | Checkable by `check-referenced-artifacts.mjs` | **Thin** — §4 |
| `provided-by` | native · vendor · you · **nobody** | *"nobody"* is a valid and useful answer | **Deferred** — §5 |
| `graded-by` | stage 1–6, from the Grid | The maturity view | **External** — §5 |
| `targets` | the *correct* stage for this team | Supplied by the target function, never written | **Blocked** — §5 |

**`requires` is the one that does real work.** The archived prototype says why and the sentence still
governs: *"it makes some configurations wrong rather than merely early."* Everything else on this page
is annotation; §3 is the model.

---

## 2. `performs` — component → job

Generated from each component file's `job:` frontmatter. Seventeen jobs, seventeen homes, zero
orphans — [`CROSSWALK.md`](./CROSSWALK.md) §1 is the derivation this reproduces mechanically.

| Component | performs | Component | performs |
|---|---|---|---|
| `0a` Substrate | `J13` | `6a` Product | — |
| `1a` Environment | — | `6b` Infrastructure | — |
| `2a` Adapters & Middleware | — | `6c` Estate | — |
| `2b` Hooks | — | `6d` Delivery | `J10` |
| `2c` Enforcement | `J5` · `J15` | `7a` Workflow Tasks | `J4` |
| `3a` Control | `J4` · `J7` · `J5` | `8a` Evals | `J6` · `J15` |
| `3b` Routing | `J3` | `8b` Evidence | `J8` |
| `3c` Composition | — | `8c` Observability | `J8` |
| `3d` Configuration | — | `8d` Efficiency | `J12` |
| `3e` Standards | `J15` | `9a` Learning | `J9` · `J6` |
| `4a` Capability | `J10` | `9b` Rituals | `J11` |
| `4b` Capability Permissions | `J5` | `9c` Cadence | — |
| `5a` Individual Memory | `J1` · `J2` | `9d` Anti-fragile Lifecycle | — |
| `5b` Team Memory | `J1` · `J2` | `9e` Raise the Floor | `J16` |
| `5c` Knowledge | `J1` | `9f` Diagnose the Bottleneck | `J17` |
| | | `10a` Roster | `J14` |
| | | `10b` Org | `J14` |
| | | `11a` Surfaces | `J11` |

**Ten of the 33 perform no job, and that is the map's first honest reading.** `1a` `2a` `2b` `3c`
`3d` `6a` `6b` `6c` `9c` `9d`. Three of them (`3c` `3d` `6b`) are marked `new` in the crosswalk —
they exist because the *function* model needed them, not because a job demanded them. **A component
that performs no job and is required by nothing is the exact shape `AC-4`'s deletion test is looking
for**, so this column should be read next to §3 rather than on its own.

---

## 3. `requires` — the model — moved 2026-09-08

**This section is live and was carried out of this file**, to
[`../../components/RELATIONS.md`](../../../components/RELATIONS.md), when the v1 specification was
archived. The thirteen cited edges are the source for the `requires:` frontmatter every component
page carries, so they are read rather than remembered — and `CLAUDE.md` requires everything under
`archive/` to be `ARCHIVED` or `SUPERSEDED`. A register the live tier reads cannot live in the
archive, so it left; the relation *model* around it argues for a settled structure and stayed.

**The headings were carried verbatim**, so any `#3.1` / `#3.2` anchor still resolves at the new path.

## 4. `records-in` — where the decision physically lives

Only three components name a durable artifact of their own in the corpus. This relation was supposed
to be the one `check-referenced-artifacts.mjs` enforces, and today there is almost nothing for it to
check.

| Component | records-in | Status |
|---|---|---|
| `3a` Control | `router.py` · `dispatch.py` (**machinery** — the graded primitive is `7a`'s contract) | built |
| `5b` Team Memory | the decision ledger — the governed tier ruled at [`CROSSWALK.md`](./CROSSWALK.md) §3.9 | ruled, unbuilt |
| `8b` Evidence | `events.jsonl`, CloudEvents-shaped — *"8 real events, none schema-validated"* | partial |

**Thirty of the 33 have no recorded artifact.** For a framework whose own argument is that a rule the
model can skip is column 3, that is the sharpest number on this page.

---

## 5. The three relations this file cannot supply

**`provided-by` is deferred, not forgotten.** Each component file already carries a peer table —
Claude Code · Deep Agents · MCP · HumanLayer · ours — and collapsing five cells into one of
`native · vendor · you · nobody` is a **judgment per node**, which is exactly the work SCAFFOLD mode
reserves for the session. Pre-deciding 33 of them headlessly is the failure mode the PRD names.

**`graded-by` is external and already generated.** The stage per layer lives in
[`grid.html`](../../../maturity/grid.html), whose rows are generated from
[`CROSSWALK.md`](./CROSSWALK.md) §0 by `scripts/gen-grid-rows.mjs`. The map should **read** that, never
restate it.

**`targets` is blocked, and has been since the prototype.** The archived §7 already recorded the
blocker: *targets* is *"supplied by the target function — `09-config.md`, not yet written."* It is
still not written. `loomwarp-team-system` `00-MAP.md` (private) §4 lists **the target function** — team scale ×
production-quality expectation → your correct target — as *"the strongest differentiator available and
the one nobody has published"*, and as **not yet written**. Until it exists, `targets` has no source
and the map should render the column empty rather than guess.

---

## 6. `run-by` — the column that is supposed to embarrass us

The PRD is explicit that this is a deliverable and not a defect: *"the repo currently has no roster,
which the map will make loudly visible."*

| Component | run-by | Source |
|---|---|---|
| `9b` Rituals | **both** — *"the agent runs the interview; it does not answer it"* | [`component-26`](../../../components/9b-rituals.md) |
| **the other 32** | **unassigned** | nothing in the corpus names a seat |

**One of 33.** The framework can tell a team that Routing is its bottleneck and cannot tell it whose
job Routing is — which is `10a` Roster's data, and `10a` is `emerging` with no instance in this repo.
The map makes this a visibly empty column instead of an unasked question.

---

## 7. Loops — the overlay, in Voss's vocabulary

Vocabulary is **Voss's loop taxonomy** ([`06-lineage.md`](../../v0/06-lineage.md) §2.1), five
strictly nested rings — Execution · Task · Product · System · Oversight — *"each has an exit
condition; the outermost has none, and that is the argument."* Never "the Five Loops"; the rings are
lineage, not our spine.

### 7.1 The one loop the framework names

[`9d` Anti-fragile Lifecycle](../../../components/9d-anti-fragile-lifecycle.md) **is** a circuit, ruled
so 2026-08-31, and it sits at Voss's **System** ring — the outer loop that studies and maintains the
primary system.

```
   9f  diagnose  ──►  9e  raise the floor  ──►  9a  promote into canon
    ▲                                                    │
    │                                                    ▼
   8d/8c  measured  ◄──  9b  a person in it  ◄──  9c  schedule the check
```

**Horizon `bet`, and the honest reading of that marker is on this diagram.** Every node in the
circuit exists; **the circuit does not.** `9d` is graded on whether the loop closes, and no edge in it
has been exercised end to end in this repo.

### 7.2 The loops peers actually ship, drawn for contrast

Both sit **inside** the ring `9d` claims — Voss's Task ring, not the System ring — which is why they
are near misses rather than counterexamples.

| Peer | The loop | Ring | Where it stops |
|---|---|---|---|
| **Deep Agents** | Rubric grader resumes the agent until `satisfied`, `failed`, or `max_iterations` | Task | Bounded within one run; nothing survives to the next |
| **HumanLayer** | research → plan → implement, compacting status back into the plan file after each verified phase | Task | The human is the loop's memory |

**The contrast is the argument.** Two peers close a loop inside a task; nobody closes one across
tasks. That is what `9d` is betting on, and drawing the two on the same canvas is what makes the bet
legible instead of grand.

---

## 8. What the session has to decide

Carried into the working session as questions, not answered here.

- **Q1 — Is there a seventh relation, and does `AC-1` survive it?** The corpus's most-stated relation
  is not on the list of six: **`distinct-from`**, the *What this layer is not* paragraph that all 33
  files carry. It is load-bearing — it is how a reader avoids grading the wrong row — and `AC-1`
  requires every edge to be one of six. Add it, or render the contrasts as node text rather than edges.
- **Q2 — Do the eight configuration mechanisms need `attaches-at`?** [`00-README.md`](./00-README.md)
  binds each of Galster et al.'s eight to exactly one component (MCP to two). That is a typed relation
  from a *non-node* to a node, and none of the six express it.
- **Q3 — Are the circuit's edges `requires`, or a distinct `feeds`?** §7.1 draws six edges that are
  sequence, not dependency: `9e` genuinely cannot run without `9f`'s finding, but `9c` can schedule a
  check that `9a` never wrote. Collapsing both into `requires` overstates the graph.
- **Q4 — Which of §3.2's seven survive?** Two are flagged **likely delete** by their own argument.
- **Q5 — Does `3c` Composition survive `AC-4`?** It performs no job, is required by nothing, and
  requires one thing. On the seeded graph it is the weakest node, and the deletion test is the place
  to find out whether that is real or an artifact of thin citation.

---

## 9. The finding this file produced before the session started

**The corpus is dense in contrasts and sparse in dependencies.** Thirty-three components state what
they are *not* — a discipline that shows on every page — and thirteen citable `requires` edges exist
between them. That asymmetry is what a layer list rewards: a stack invites you to say what each layer
is distinct from, and never asks what it cannot work without.

**It is also the reason `minimum governs` is currently unfalsifiable in practice.** The rule says a
team's grade is its weakest component. With a sparse `requires` graph, a weak component has almost no
demonstrable downstream effect — you cannot show what a zero at `3c` actually breaks. **A denser,
cited `requires` graph is what would turn *minimum governs* from a posture into a prediction**, and
that is a better argument for building this map than "the layer list is not a system map."

---

## 10. How this becomes the map

Per the PRD's deliverable clause: **graph data generated from a declared source block, never
hand-coded twice**, with `scripts/gen-grid-rows.mjs` as the precedent and its contract — *re-run
produces zero diff*.

1. This file is the source of truth for `performs`, `requires`, `records-in` and `run-by`. Node
   identity and layer membership come from [`CROSSWALK.md`](./CROSSWALK.md) §0; stages come from the
   Grid. **Nothing is typed in twice.**
2. A generator emits the graph data; `references/harness-map.html` renders it — pan/zoom,
   relation-type toggles, loop highlighting, a `run-by` filter, click-through to each component file.
3. `AC-4`'s deletion test and `AC-5`'s worked JTBD example run **against the rendered map, in
   session**, and their outcomes amend §3 and §8 here.

---

*The ruling this executes: [`CROSSWALK.md`](./CROSSWALK.md) §3.10 · the prototype:
[`../archive/07-the-map.md`](../../07-the-map.md) §7 · the loop survey:
[`06-lineage.md`](../../v0/06-lineage.md) §2 · the reading order:
[`00-README.md`](./00-README.md) · the mental model:
[`00-consolidated-guide-and-mental-model.md`](./00-consolidated-guide-and-mental-model.md)*
