# Workstream PRD: W0-alignment

**Epic:** harness-atlas — the re-cut
**Mode:** **interactive — with KD. Nothing else starts until this lands.**
**Dependencies:** W1 (this repo exists, links resolve). Reads the spin-out handoff §2 as its brief.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W0-alignment-HANDOFF.md`.

## Goal

Agree presentation and the most valuable assets *before* teardown or rebuild, so the density of the
500-line guide does not come back. KD's instruction, verbatim: *"before starting the moves and
teardowns, we want to align on the presentation and most valuable assets to bring forward and
rebuild."*

## Deliverable

Three written answers, in `index.md` and this workstream's HANDOFF:

1. **The front page.** `index.md` rebuilt to one screen. The instrument leads (decided 2026-09-02):
   the grid, then the maturity range, then the layer stack, then the words. Every noun links down.
2. **The ranked carry-forward list.** Ranked, not listed. Starting order to argue with: the component
   matrix · the five Template-A teardowns · `01-concepts.md` §3.17 · `04-harness-alignment.md` §2 ·
   the maturity ladder + `grid.html`. Roughly 3,000 of 30,000 lines have earned it.
3. **Move vs. rebuild, per asset.** Decided for the 33 components (rebuild from a template, W5).
   Decide for everything else on the ranked list.

Also settle or strike the two defaults carried from the interview: mint the renumbered layer IDs in
W5, and the five-value status enum.

## Acceptance criteria

- **AC-1** `index.md` fits one screen at 100% zoom, has no paragraph over three lines, and every
  link resolves.
- **AC-2** The ranked list has a rank, a form (*as-is · trimmed · rebuilt · archived*), and one line
  of reason per entry. Nothing is "moved unchanged with intent to edit later."
- **AC-3** KD has said "that's wrong" at least once and the page changed in the same session.
- **AC-4** The problem statement, from first principles, exists as a draft KD wrote — even one
  paragraph. The current guide opens with a summary, not an argument (handoff §10). Not delegated.

## Session shape

1. Agent pre-draws `index.md` from the stub and the handoff §5, and lists the corpus with line
   counts and a proposed rank.
2. KD corrects live. Agent edits and re-renders.
3. HANDOFF: the final list, the corrections log, and which of W2–W7 changed shape as a result.

## Do NOT

- Run any teardown, rebuild any component page, or move any file. This is the gate, not the work.
- Produce a finished front page from a headless run.

---

*Brief: `archive/sessions/NEXT-STEPS-framework-spinout.md` §2, §5, §10.*
