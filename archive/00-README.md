---
title: "The archive — superseded models, and the crosswalks that reach them"
tier: spec
project: harness-atlas
created: "2026-08-27"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# The archive

**What this is.** Superseded models, kept whole, with the crosswalk tables that let a reader arrive
from an old citation and land in the right place.

**Why it exists rather than a delete.** Three of the corpus's own rules make deletion the wrong trade.
`FM-7` names *orphaned research* — two generations of analysis on one system that never cite each other,
so findings get rediscovered. The claims register only works if the claim being corrected is still
readable. And [`07-the-map.md`](./07-the-map.md) established the method: **this corpus retires a
vocabulary by writing a ruling, publishing a crosswalk, and re-heading the loser — never by removing
it.** That happened for `N1`–`N12`, again for `E`→`F`, and a third time on 2026-09-01 when the whole
`v0/` corpus was archived under the twelve-layer rebuild — which makes it a practice rather than an
improvisation.

---

## 1. What is here

| File | Was canonical | Superseded by | Why it is still cited |
|---|---|---|---|
| [`02-elements.md`](./02-elements.md) | 2026-08-11 → 2026-08-27 | [`../v0/02-functions.md`](./v0/02-functions.md) | §4's job-placement table and §5's published-component survey are evidence the successor still rests on |
| [`07-the-map.md`](./07-the-map.md) | never — a derivation | [`../v0/02-functions.md`](./v0/02-functions.md) | The `N→E` derivation, and the **precedent for how a vocabulary is retired here** |

**The v0 corpus, archived whole 2026-09-01** — moved unedited by `git mv`, superseded by
[`../v1-framework/`](./spec/v1-framework/00-README.md), whose
[`CROSSWALK.md`](./spec/v1-framework/CROSSWALK.md) resolves every `F0`–`F16` citation (§2, zero orphans)
and every job (§1):

| File | Was canonical | Superseded by | Why it is still cited |
|---|---|---|---|
| [`v0/02-functions.md`](./v0/02-functions.md) | 2026-08-27 → 2026-09-01 | [`CROSSWALK.md`](./spec/v1-framework/CROSSWALK.md) §2 | The ancestor model. The vocabulary checker still parses its §1 map block for `F<n>` names; the successor re-argues every row rather than copying one |
| [`v0/11-architecture.md`](./v0/11-architecture.md) | 2026-08-31 → 2026-09-01 | the twelve-layer structure, `CROSSWALK.md` §0 | §1 is KD's layer note — **the design the rebuild executed** |
| [`v0/03-maturity.md`](./v0/03-maturity.md) | 2026-08-27 → 2026-09-01 | ❌ *rebuild pending* (`W7`+) | The six stages, *minimum governs*, the evidence rule, the 3→4 threshold — all carried forward |
| [`v0/09-context-layer.md`](./v0/09-context-layer.md) | 2026-08-27 → 2026-09-01 | layer 5 (`5a`/`5b`/`5c`) | §4's routing doctrine entered `5b` by the 2026-09-01 ledger ruling; §7's conformance surface feeds the README's conformance spectrum |
| [`v0/06-lineage.md`](./v0/06-lineage.md) | — a derivation | `CROSSWALK.md` §3.10 | §6's two rulings still constrain; Ruling 1 is honored in writing at §3.10. §2's loop-model survey feeds `harness-map-v1` |
| [`v0/00-the-framework-from-agile.md`](./v0/00-the-framework-from-agile.md) · [`v0/01-problem.md`](./v0/01-problem.md) · [`v0/04-decision-layers.md`](./v0/04-decision-layers.md) · [`v0/05-preflight-spec.md`](./v0/05-preflight-spec.md) · [`v0/10-context-gap-analysis.md`](./v0/10-context-gap-analysis.md) · [`v0/references.md`](./v0/references.md) · [`v0/00-README.md`](./v0/00-README.md) | 2026-08 → 2026-09-01 | [`../v1-framework/00-README.md`](./spec/v1-framework/00-README.md) | Argument, gap registers and sources the component files cite by section |

One exception left the corpus rather than entering the archive: `12-horizon.md` (authored 2026-08-31,
new work, not the superseded model) moved to
[`../v1-framework/12-horizon.md`](./spec/v1-framework/12-horizon.md).

Also superseded, held in place rather than moved because it is linked from outside `specs/`:
[`../../references/elements.md`](./elements.md) — the **seven-element** model
(`E1 Workspace` … `E7 Learning`), carrying its own banner since 2026-08-27.

---

**The v1 framework specification, archived whole 2026-09-08** — moved by `git mv` under the Tier-2
re-cut, superseded by [`../components/`](../components/00-README.md), whose roster resolves every
component ID and whose [`CROSSWALK.md`](../components/CROSSWALK.md) and
[`RELATIONS.md`](../components/RELATIONS.md) carry the two registers that had to stay live. Full
account and per-file table: [`spec/00-README.md`](./spec/00-README.md).

| File | Was canonical | Superseded by | Why it is still cited |
|---|---|---|---|
| [`spec/v1-framework/CROSSWALK.md`](./spec/v1-framework/CROSSWALK.md) | 2026-08-31 → 2026-09-08 | §0 by [`components/00-README.md`](../components/00-README.md); §3 by [`components/CROSSWALK.md`](../components/CROSSWALK.md) | §1–§2 are the only map from a retired `F0`–`F16` citation to a live component |
| [`spec/v1-framework/00-README.md`](./spec/v1-framework/00-README.md) | 2026-08-31 → 2026-09-08 | [`components/00-README.md`](../components/00-README.md) | Its 33-row index is superseded; its per-layer argument is reproduced nowhere else |
| [`spec/v1-framework/06-relations.md`](./spec/v1-framework/06-relations.md) | 2026-08-31 → 2026-09-08 | §3 by [`components/RELATIONS.md`](../components/RELATIONS.md) | The relation model the `requires` graph is one part of — `performs`, `records-in`, the loop overlay |
| [`spec/v1-framework/12-horizon.md`](./spec/v1-framework/12-horizon.md) | 2026-08-31 → 2026-09-08 | ❌ *nothing yet* | Every component's `horizon:` is scored against its §2 definitions |
| [`spec/v1-framework/05-preflight.md`](./spec/v1-framework/05-preflight.md) · [`00-consolidated-guide-and-mental-model.md`](./spec/v1-framework/00-consolidated-guide-and-mental-model.md) · [`WALKTHROUGH.md`](./spec/v1-framework/WALKTHROUGH.md) · [`spec/EXPLAINER-PLAN.md`](./spec/EXPLAINER-PLAN.md) | 2026-08-27 → 2026-09-08 | the twelve-layer structure, `components/` | The preflight ordering rule `2a` cites; the mental model, never re-cut; the plan `README.md` superseded |

**Three smaller archivals landed in the same ruling.** [`craft/`](./craft/01-source-hohpe.md) — the
Hohpe source and the harness sizing lens — went because it is architect-craft material rather than
harness anatomy, and it had **zero inbound markdown links**, so nothing pointed at it to break.
`adr-seeds/`, 22 store-format ADR drafts, went as unfinished internal decisions and were
**deleted outright on 2026-09-08**; `git log -- archive/adr-seeds` is the only record, and the pages
that cited them no longer do.
[`claude-code-draft.md`](./claude-code-draft.md) and [`pi-draft.md`](./pi-draft.md) were
pre-template drafts sitting in the shipped tier, superseded by the profiles that replaced them; both
carry a `superseded_by:` pointer, which the 2026-09-01 whole-directory archival did not.


### `comparisons/` — archived 2026-09-08

The grids, the jobs, the concept ledger and the short teardowns. **43 documents**, moved whole.

| File | Was canonical | Superseded by | Why it is still cited |
|---|---|---|---|
| [`components/MATRIX.md`](../components/MATRIX.md) | → 2026-09-08 | the 33 pages in [`components/`](../components/00-README.md) | The 19-row × 14-column grid. The component pages carry the same comparison per component, live and anchored |
| [`components/ALIGNMENT.md`](../components/ALIGNMENT.md) | → 2026-09-08 | [`spectrums/01-scorecard.md`](../spectrums/01-scorecard.md) as a rubric; `components/` as a grid | §1 was already superseded-but-kept by ruling `2026-09-07-alignment-reference`; §2's 33-row harness view is what the component pages replaced |
| [`comparisons/01-concepts.md`](./comparisons/01-concepts.md) | → 2026-09-08 | [`vocabulary.md`](../vocabulary.md) | §3.17's definition of a primitive is cited from live pages and reproduced nowhere else |
| [`comparisons/systems/`](./comparisons/systems) (16) | → 2026-09-08 | [`content/`](../index.md#1-the-instrument) for the ten torn down | The six never recut — HumanLayer, Deep Agents, Indigo HQ, QM, SageOx, gstack/gbrain — exist **only** here. QM in particular still anchors axis I's `+3` |
| [`comparisons/2026-08-research/`](./comparisons/2026-08-research) | — raw capture | — | Conference schedules and transcripts quoted by the concept ledger. Never canonical, never superseded, kept as sources |

**Two files did not come here.** [`components/MATRIX.md`](../components/MATRIX.md) (was
`02-component-matrix.md`) and [`components/ALIGNMENT.md`](../components/ALIGNMENT.md) (was
`04-harness-alignment.md`) are **live**, in `components/`, beside `CROSSWALK.md` and `RELATIONS.md`.
They are cross-component instruments rather than per-component pages, which is why they sit there and
not under an `<id>-<name>.md` filename. KD ruled them out of this archival on 2026-09-08: the Start-here
strip and `index.md` §1 both route to the grid, and Tier 0 should not open its front door onto history.

**Why the rest moved.** `comparisons/` held the comparison instrument before Tier 2 existed. Once the 33
component pages shipped — each carrying the same per-component comparison, anchored and linked from
every profile — what remained was a second copy of a live answer plus the material that was never
recut. The second copy is history; the never-recut material is the reason the directory is archived
rather than deleted.

**What did not move with it.** The six un-recut short teardowns are still the only source for six
systems, and `index.md` still routes to them. **An archived path that is the sole source for a live
claim is a debt, not a resolution** — it is why `QM` sits at the front of the teardown queue.

---

## 2. The crosswalk — `E<n>` → `F<n>`

**1:1, no re-ordering, no merges, no splits.** The rename is a vocabulary change, not a model change:
what moved is the noun and the ruling around it, not the twelve boxes.

| Archived | Canonical | Name | Band (archived §6 → canonical §1) |
|---|---|---|---|
| `E0` | **`F0`** | Substrate *(the map block said `Intelligence`; see §4)* | GROUND → **FOUNDATION** |
| `E1` | **`F1`** | Surfaces | GROUND → **FOUNDATION** |
| `E2` | **`F2`** | Estate | STRUCTURE |
| `E3` | **`F3`** | Context | STRUCTURE |
| `E9` | **`F9`** | Roster | STRUCTURE |
| `E4` | **`F4`** | Control | MOTION → **PROCESS** |
| `E5` | **`F5`** | Capability | MOTION → **PROCESS** |
| `E6` | **`F6`** | Policy | TRUST |
| `E7` | **`F7`** | Evidence | TRUST |
| `E10` | **`F10`** | Cadence | IMPROVE → **LIFECYCLE** |
| `E8` | **`F8`** | Learning | IMPROVE → **LIFECYCLE** |
| `E11` | **`F11`** | Instrumentation | IMPROVE → **LIFECYCLE** |

## 3. The prior crosswalk — `N<n>` → `E<n>` → `F<n>`

The full chain, for a citation that predates both renames. The `N→E` half is in
[`07-the-map.md`](./07-the-map.md); this table only composes it forward so a reader does not have to.

**Three vocabularies, one set of twelve.** That is the argument for stopping: a fourth rename would cost
more than the clarity it buys, and [`../v0/02-functions.md`](./v0/02-functions.md) §2 records the
commitment not to make one.

---

## 4. Two defects recorded on the way out

Both are fixed in the successor. Both are worth keeping because they are instances of failure modes
this corpus already names, occurring inside the document that names them.

**4.1 — The canonical file contradicted itself.** `02-elements.md` §1's map block read `E0 Intelligence`
and banded `FOUNDATION / STRUCTURE / PROCESS / TRUST / LIFECYCLE`. §6's headings read `E0 Substrate` and
`Band: GROUND / … / MOTION / … / IMPROVE`. A `KD Note` inside §1 asked for exactly that rename; it was
applied to the map and never to the bodies. **This is `FM-3` documentation drift, inside the definition
of the vocabulary, in a repo whose comparison corpus diagnoses `FM-3` in competitors.**

**4.2 — The check could not have caught it.** `scripts/check-element-vocabulary.mjs` parses the
canonical names from `02-elements.md` §1 and then scans every markdown file for `E<n> Name` pairs that
disagree — except that its scan loop opens with:

```js
if (rel === SPEC || exemptionFor(rel)) continue;
```

**The one document the vocabulary is parsed from was the one document never checked against it.** A
validator that exempts its own source of truth cannot detect drift at the source, only downstream of it.

This is the same shape as a finding recorded against a peer system — `generic-cerebro`'s decision-ledger
pre-commit hook accepts `D-\d{1,3}` while its schema accepts `^D-[0-9]{1,4}[a-z]?$`, so a schema-valid
`D-1234.md` is silently skipped by the only unbypassable gate. **A validator and its enforcement point
disagreeing is the same defect in both cases**, and it is the reason `02-functions.md` §1 states the
check contract in the document itself rather than only in the script.

---

*Canonical model: [`../v1-framework/00-README.md`](./spec/v1-framework/00-README.md) · the archived
ancestor: [`v0/02-functions.md`](./v0/02-functions.md) · the seven-element ancestor:
[`../../references/elements.md`](./elements.md)*
