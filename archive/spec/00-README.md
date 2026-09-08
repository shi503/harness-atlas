---
title: "The v1 framework specification — archived whole, 2026-09-08"
tier: spec
project: harness-atlas
status: ARCHIVED
provenance: AUTHORED
created: "2026-09-08"
owner: KD
---

> # ⛔ ARCHIVED — this is the specification the corpus was cut from, not the corpus
>
> **Canonical 2026-08-31 → 2026-09-08.** Superseded by [`../../components/`](../../components/00-README.md),
> which holds the same thirty-three components as pages a reader can open. **Do not cite this tree as
> the model.** It is kept because the successor still rests on its arguments, and because a reader
> arriving from an old citation has to land somewhere true.

# The v1 framework, archived

**What happened.** The specification's 33 component entries left this tree on 2026-09-08 and became
Tier 2 at [`../../components/`](../../components/00-README.md) — carried, not rewritten: they were
already 74–97 lines against that tier's ~80-line target. What stayed is the **argument** around them,
and argument about a decision already taken is history.

**Two live registers left with them**, because a rule the live tier reads cannot sit in the archive:

| Section | Went to | Why it is live |
|---|---|---|
| `CROSSWALK.md` §3 | [`../../components/CROSSWALK.md`](../../components/CROSSWALK.md) | Six ruling **texts**, and §3.13's candidates register — `rulings/00-README.md` names it as a sanctioned home for a ruling |
| `06-relations.md` §3 | [`../../components/RELATIONS.md`](../../components/RELATIONS.md) | The thirteen cited `requires` edges, read by every page's `requires:` frontmatter |

Both were carried **headings verbatim**, so every anchor that pointed into them still resolves at the
new path. Pointer stubs are left at both sources.

## What is here

| File | What it still carries | Why it is still cited |
|---|---|---|
| [`v1-framework/00-README.md`](./v1-framework/00-README.md) | The twelve layers read bottom-up, and a 33-row component index | The index is **superseded** by the roster; the per-layer argument is not reproduced anywhere else |
| [`v1-framework/CROSSWALK.md`](./v1-framework/CROSSWALK.md) | §1 derivation — every component from a job; §2 supersession — every `F0`–`F16` citation's destination | The only map from a retired function ID to a live component |
| [`v1-framework/06-relations.md`](./v1-framework/06-relations.md) | The six relation types, `performs`, `records-in`, the loop overlay | The relation model the `requires` graph is one part of |
| [`v1-framework/12-horizon.md`](./v1-framework/12-horizon.md) | The `shipped`/`emerging`/`bet`/`claimed` definitions | Every component page's `horizon:` field is scored against §2 |
| [`v1-framework/05-preflight.md`](./v1-framework/05-preflight.md) | The preflight sequence and its ordering constraints | Cited by `2a`'s `requires` edge as the source of *you cannot write an adapter for a system you have not declared* |
| [`v1-framework/00-consolidated-guide-and-mental-model.md`](./v1-framework/00-consolidated-guide-and-mental-model.md) | The mental model, un-recut | The best single narrative statement of the framework; never re-cut, and the reason W8's template exists |
| [`v1-framework/WALKTHROUGH.md`](./v1-framework/WALKTHROUGH.md) | A worked read of the framework | — |
| [`EXPLAINER-PLAN.md`](./EXPLAINER-PLAN.md) | The plan `README.md` superseded | Recorded as superseded at W0, 2026-09-03 |

**One correction carried in.** `00-consolidated-guide-and-mental-model.md` claimed `grid.html`'s rows
were *generated* so drift was impossible. The generator did not survive the spin-out; the sentence was
struck on 2026-09-08 rather than the script restored, per *markdown is not code* (ISSUE-009).
