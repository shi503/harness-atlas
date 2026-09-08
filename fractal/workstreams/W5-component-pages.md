# Workstream PRD: W5-component-pages

**Epic:** harness-atlas — the re-cut
**Mode:** headless, **fan out** — one feature-lead per layer
**Dependencies:** W0 (the shape is agreed), W4 for at least Codex and goose (so cells have targets).
**Routing:** un-routed. One HANDOFF per layer: `fractal/workstreams/W5-layer-<n>-HANDOFF.md`.

> **Amended 2026-09-08 by W11 (publish readiness).** Two instructions below rest on a premise that
> was measured and found false, and are struck. **(1) The "150-line spec entries" do not exist.** The
> 33 sources at `spec/v1-framework/content/` are **74–97 lines, mean ~82** — already at the ~80-line
> Tier-2 target `CLAUDE.md` states. The rebuild-don't-trim instruction was written against a wrong
> number; W5 is a **mechanical transform**, not a re-authoring, and its effort drops from L to M.
> **(2) The sources are extracted first, in place, and never enter the archive** — so the closing
> "move `spec/v1-framework/content/` to `archive/v1-framework-content/`" is struck too. Under W11
> the whole of `spec/` is archived by ruling; de-bleeding the 33 *after* that move would pay the cost
> on files whose relative depth had already changed, and would archive the Tier-2 source and then
> un-archive it. Order is now: de-bleed in place → `git mv` to `components/` → re-point → **then**
> archive the remainder of `spec/`.
>
> Four defects the transform must fix, each measured 33/33: an `**ours**` LoomWarp self-row (which
> violates `CLAUDE.md`'s *"one peer column … no special status"*), `project: loomwarp` frontmatter,
> citations pointing at the **superseded** `comparisons/systems/*.md` rather than `content/*.md`, and
> an `img:` field naming a PNG that does not exist. See the plan of record and
> `fractal/GAP-ANALYSIS-2026-09-07-publish-readiness.md` §5 (GAP-02, GAP-04, GAP-06, GAP-07).

## Goal

Tier 2: one page per component, ~80 lines, ~~**rebuilt from a template rather than trimmed from the
150-line spec entries** — decided 2026-09-02~~ **struck 2026-09-08: the sources are already ~82 lines;
this is a mechanical transform.** Moving them unchanged with intent to edit later is
precisely how the 500-line guide happened — which is why the transform below is enumerated rather
than left to judgement.

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

~~After all 33 land: move `spec/v1-framework/content/` to `archive/v1-framework-content/` with
`status: SUPERSEDED` and `superseded_by:` pointing at the new page.~~ **Struck 2026-09-08 by W11.**
The 33 are `git mv`'d out of `spec/` into `components/` *before* the rest of `spec/` is archived, so
no residue is left behind to archive and no `superseded_by:` pointer is needed — the file **is** the
successor, carried forward rather than copied. `RULING-2026-09-02-spinout.md` §*What moved* row 1
anticipated *"re-cut source for W5, then archived"* on the assumption the re-cut was a rewrite; it is
a move, so the second half does not apply.

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
