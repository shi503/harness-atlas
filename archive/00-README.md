---
title: "The archive — superseded models, and the crosswalks that reach them"
tier: spec
project: loomwarp
created: "2026-08-27"
status: ARCHIVED
owner: KD
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
[`../v1-framework/`](../spec/v1-framework/00-README.md), whose
[`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) resolves every `F0`–`F16` citation (§2, zero orphans)
and every job (§1):

| File | Was canonical | Superseded by | Why it is still cited |
|---|---|---|---|
| [`v0/02-functions.md`](./v0/02-functions.md) | 2026-08-27 → 2026-09-01 | [`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §2 | The ancestor model. The vocabulary checker still parses its §1 map block for `F<n>` names; the successor re-argues every row rather than copying one |
| [`v0/11-architecture.md`](./v0/11-architecture.md) | 2026-08-31 → 2026-09-01 | the twelve-layer structure, `CROSSWALK.md` §0 | §1 is KD's layer note — **the design the rebuild executed** |
| [`v0/03-maturity.md`](./v0/03-maturity.md) | 2026-08-27 → 2026-09-01 | ❌ *rebuild pending* (`W7`+) | The six stages, *minimum governs*, the evidence rule, the 3→4 threshold — all carried forward |
| [`v0/09-context-layer.md`](./v0/09-context-layer.md) | 2026-08-27 → 2026-09-01 | layer 5 (`5a`/`5b`/`5c`) | §4's routing doctrine entered `5b` by the 2026-09-01 ledger ruling; §7's conformance surface feeds the README's conformance spectrum |
| [`v0/06-lineage.md`](./v0/06-lineage.md) | — a derivation | `CROSSWALK.md` §3.10 | §6's two rulings still constrain; Ruling 1 is honored in writing at §3.10. §2's loop-model survey feeds `harness-map-v1` |
| [`v0/00-the-framework-from-agile.md`](./v0/00-the-framework-from-agile.md) · [`v0/01-problem.md`](./v0/01-problem.md) · [`v0/04-decision-layers.md`](./v0/04-decision-layers.md) · [`v0/05-preflight-spec.md`](./v0/05-preflight-spec.md) · [`v0/10-context-gap-analysis.md`](./v0/10-context-gap-analysis.md) · [`v0/references.md`](./v0/references.md) · [`v0/00-README.md`](./v0/00-README.md) | 2026-08 → 2026-09-01 | [`../v1-framework/00-README.md`](../spec/v1-framework/00-README.md) | Argument, gap registers and sources the component files cite by section |

One exception left the corpus rather than entering the archive: `12-horizon.md` (authored 2026-08-31,
new work, not the superseded model) moved to
[`../v1-framework/12-horizon.md`](../spec/v1-framework/12-horizon.md).

Also superseded, held in place rather than moved because it is linked from outside `specs/`:
[`../../references/elements.md`](./elements.md) — the **seven-element** model
(`E1 Workspace` … `E7 Learning`), carrying its own banner since 2026-08-27.

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

*Canonical model: [`../v1-framework/00-README.md`](../spec/v1-framework/00-README.md) · the archived
ancestor: [`v0/02-functions.md`](./v0/02-functions.md) · the seven-element ancestor:
[`../../references/elements.md`](./elements.md)*
