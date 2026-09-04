# Workstream PRD: W5-component-pages

**Epic:** harness-atlas — the re-cut
**Mode:** headless, **fan out** — one feature-lead per layer
**Dependencies:** W0 (the shape is agreed), W4 for at least Codex and goose (so cells have targets).
**Routing:** un-routed. One HANDOFF per layer: `fractal/workstreams/W5-layer-<n>-HANDOFF.md`.

## Goal

Tier 2: one page per component, ~80 lines, **rebuilt from a template rather than trimmed from the
150-line spec entries** — decided 2026-09-02. Moving them unchanged with intent to edit later is
precisely how the 500-line guide happened.

## Deliverable

`components/<id>-<name>.md` × 33, each:

- what it is — **one paragraph**, taken from the old `spec/v1-framework/content/component-NN.md`
  and cut to its one idea (the old file holds four ideas held together by a numbering scheme;
  `component-01-substrate.md` is the worked example of the failure);
- the single best example, named and cited;
- the comparison table: for each harness in `content/` (renamed from `harnesses/` in W0,
  2026-09-03), its **named primitive** for this component, the citation, and the verbatim line that
  proves it — every cell linking into a Tier-3 anchor;
- a `structured output` row;
- a frontmatter field `graded: true | false` — has maturity stages, or only an answer (handoff §8.2:
  the fix for the fused-artifacts problem; working hypothesis: layers 0–4 mostly `false`,
  6–12 mostly `true`);
- a `requires:` list, cited — the corpus is dense in contrasts and sparse in dependencies; 13
  citable `requires` edges exist (`spec/v1-framework/06-relations.md`). Add only edges you can cite.

**IDs.** ~~Default carried from the interview: mint the renumbered IDs (Control `7`→`5`, Context
`5`→`6`, Workspaces `6`→`7`; all three permute together, one atomic pass).~~ **Struck by W0 on
2026-09-03** — keep the original twelve (`spec/v1-framework/CROSSWALK.md` §0). KD: *"they're just
causing conflicts and the landscape evolves quickly."* The skill's inline list already uses them;
the grid must match.

After all 33 land: move `spec/v1-framework/content/` to `archive/v1-framework-content/` with
`status: SUPERSEDED` and `superseded_by:` pointing at the new page.

## Acceptance criteria

- **AC-1** No page over 100 lines. No page with a second paragraph of definition.
- **AC-2** Every table cell that claims a primitive links to an anchor in `content/` that exists.
- **AC-3** `graded:` set on all 33, with one line of reason where it disagrees with the hypothesis.
- **AC-4** `3c` Composition: the page states plainly that it performs no job and is required by
  nothing on the seeded graph, and proposes the deletion test rather than hiding it.

## Do NOT

- Copy a spec entry and trim. Invent a `requires` edge. Grade a catalogued component.

---

*Brief: handoff §1, §5, §8.1, §8.2, §12.*
