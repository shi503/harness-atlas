# HANDOFF: W5-component-pages

**Epic:** harness-atlas — the re-cut
**Mode:** headless, executed inside W11 rather than as its own fan-out — the transform turned out to be
mechanical, so one sequential pass was cheaper than one feature-lead per layer.
**Branch:** `template-v2`. **PRD:** `W5-component-pages.md`, amended 2026-09-08 before execution.

## Produced

| Deliverable | Where | State |
|---|---|---|
| 33 component pages | `components/<id>-<name>.md` | Carried from the spec sources, de-bled, re-pointed |
| The roster | `components/00-README.md` | The ID register, plus the graded split |
| The live rulings register | `components/CROSSWALK.md` | §3 carried verbatim, anchors intact |
| The `requires` graph | `components/RELATIONS.md` | §3 carried verbatim |
| `graded:` ×33, `requires:` ×33 | page frontmatter | 23 graded · 10 catalogued · 11 carry edges |
| The corpus table | every page | Ten harnesses, each cell that harness's own mark and words |

## The PRD was wrong about the premise, and it was amended before execution

W5 said the pages must be *"rebuilt from a template rather than trimmed from the 150-line spec
entries."* **The sources were 74–97 lines, mean ~82** — already at `CLAUDE.md`'s ~80-line Tier-2
target. The rebuild instruction rested on a number nobody had checked. Struck, with the reason
recorded in the PRD, and the effort dropped from L to M.

The closing instruction — *move `spec/v1-framework/content/` to `archive/v1-framework-content/`* — was
struck for the same reason. The 33 were `git mv`'d **out** of `spec/` before the rest of it was
archived, so no residue was left behind and no `superseded_by:` pointer was needed: the file **is** the
successor, carried rather than copied.

## Acceptance criteria

- **AC-1** No page over 100 lines. **Not met, and the cap is the wrong number now.** Pages run
  **84–112 lines; six exceed 100.** Each gained a ten-row corpus table the cap predates — and that
  table is the PRD's own §Deliverable item, *"the comparison table: for each harness in `content/`"* —
  so the cap and the deliverable were never consistent with each other. **Recorded, not silently
  widened:** raising a cap to match what was built is how a budget stops meaning anything.
- **AC-2** Every cell claiming a primitive links to an anchor in `content/` that exists. **Met** —
  checker resolves 2,219 links and 1,201 anchors, up from 757 anchors before Tier 2.
- **AC-3** `graded:` on all 33, with a reason where it disagrees with the hypothesis. **Met** — 23
  graded, 10 catalogued, four carry a `graded_reason:`. Split published at `00-README.md`.
- **AC-4** `3c` states plainly that it performs no job and is required by nothing, and proposes the
  deletion test. **Met** — and the seeded graph confirms it: `3c` has one outbound edge and zero
  inbound, the weakest node in the set.

## Two things the next person needs

1. **ISSUE-022 — `graded:` has two claimants and they disagree.** W7's PRD says `grid.html`'s rows
   become the `graded: true` components; CROSSWALK §3.7 is a KD ruling of 2026-09-01 saying the grid
   runs on twelve layer rows with the 33 as drill-down, ruled *ahead of* W7 for that reason. The field
   is set either way; the grid was not touched. **KD to rule.**
2. **ISSUE-009 closed** — the `grid.html` generator claim is struck. `scripts/gen-grid-rows.mjs` did
   not survive the spin-out, so the rows are hand-maintained and drift is neither impossible nor
   detected. Struck rather than restored, per *markdown is not code*. Note this also makes CROSSWALK
   §3.7's account of its own execution unreliable.

## Not done here

The `requires:` edges are the **thirteen cited** ones only. §3.2's seven proposed edges were left
staged, per its own `AC-2`: *"an edge nobody can cite is deleted in session, not kept as decoration."*
Two of the seven are marked **likely delete** by their own author. Confirming or deleting them is a
ruling, not a transform.
