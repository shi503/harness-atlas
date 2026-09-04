# Workstream PRD: W3-vocabulary-ledger

**Epic:** harness-atlas — the re-cut
**Mode:** **interactive — with KD**
**Dependencies:** W1. Feeds W4, W5, W6.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W3-vocabulary-ledger-HANDOFF.md`.

## Goal

Make two systems doing the same thing under different names classifiable. `beads` was assumed to
be a decision ledger and is in fact a dependency-aware task graph — one tool, three components, and
no way to say so without the ledger. This is load-bearing, not tidying.

## Deliverable

`vocabulary.md` filled: `term → concept (vendor's words, cited) → who says it → our component(s) →
instances`. Every seeded row completed; every term used as a primitive in any file under
`content/` (renamed from `harnesses/` in W0, 2026-09-03) present.

## Acceptance criteria

- **AC-1** Every `●` in `comparisons/02-component-matrix.md` §1 has its primitive name in the ledger.
- **AC-2** The five orphan nouns — `session` · `gateway` · `runtime` · `sandbox` · `workspace` —
  each have a row that says either which component absorbs them or that they are an altitude, with
  the citation. **Harvested from each harness's own docs, code and natural-language instructions.
  Never invented.**
- **AC-3** No row borrows a word and changes its referent. HQ's *Projects* is the test case.
- **AC-4** KD has corrected at least one classification live.

## Do NOT

- Add rows for concepts no shipped system names. Rename a component to match a vendor's word.

---

*Brief: handoff §5 (the ledger), §8.3 (the orphan nouns), §11 (the referent rule).*
