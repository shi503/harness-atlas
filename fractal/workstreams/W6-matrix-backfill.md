# Workstream PRD: W6-matrix-backfill

**Epic:** harness-atlas — the re-cut
**Mode:** headless
**Dependencies:** W3, W4.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W6-matrix-backfill-HANDOFF.md`.

## Goal

Every teardown in the corpus has its column, and the grid's own prose describes the grid.

## Deliverable

- Columns for **HumanLayer** and **LangChain Deep Agents** in `comparisons/02-component-matrix.md`
  §1 and `comparisons/04-harness-alignment.md` §2, sourced from their existing ~385-line teardowns
  under `comparisons/systems/`. Closes ISSUE-001.
- The five orphan nouns (`session` · `gateway` · `runtime` · `sandbox` · `workspace`) resolved per
  W3's ledger: a row, or a stated altitude, never silently absorbed.
- The stale *"eighteen concept rows"* prose fixed: the grid has 19 rows and 14 columns at the time
  of writing; count again before writing the number.
- The `shipped` horizon rule: `archive/spec/v1-framework/12-horizon.md` §2 requires two teardowns cited by
  file and section; only `5c` Knowledge meets it. Either re-cite the eleven or relax the rule **and
  record the relaxation** in a dated note.

## Acceptance criteria

- **AC-1** Every file under `content/` (renamed from `harnesses/` in W0) and every Template-A file
  under `comparisons/systems/` has a column in both grids. Zero exceptions, or each named with a
  reason. Draft files (`content/<name>-draft.md`, the W2 sanity outputs) are excluded until promoted.
- **AC-4** ISSUE-003 closed: the `systems/harnesses/…` link labels in `comparisons/` read
  `content/…`.
- **AC-2** Every new `●` cites a primitive by name and file; every `○` names the pages checked.
- **AC-3** The count prose matches `wc` of the table.

> **Amended 2026-09-04 by W3.** A `●` with no nameable primitive in any teardown (the list is
> ISSUE-008 and `vocabulary.md` §2) becomes `◐` with a dated note — a **correction** under the
> sourcing rule ("every `●` traces to a cited primitive"), not a re-score. `0a` Substrate keeps `●`
> under the stated convention *`●` at 0a = model-pluggable, not named*. Under Template v2 the
> profile's §4 matrix is the source of truth and `04-harness-alignment.md` §2 copies it; apply the
> downgrade in the profile first where a v2 profile exists.

## Do NOT

- Re-score an existing column (a downgrade under ISSUE-008 is a correction, see above). Add a component row.

---

*Brief: handoff §6 (the two missing columns), §7, §8.3, §12.*
