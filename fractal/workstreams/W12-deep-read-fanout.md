# Workstream PRD: W12-deep-read-fanout

**Epic:** harness-atlas — the re-cut
**Mode:** interactive — with KD (four decisions taken in session, recorded below); headless fan-out for the remaining eight
**Dependencies:** W10 (both skills), W11 (publish readiness). Blocks nothing.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W12-deep-read-fanout-HANDOFF.md`.
**Status:** ready-for-agent (phase 3 only — phases 1 and 2 are complete)

## Goal

KD, 2026-09-08, reviewing the merged `template-v2` branch:

> *"it looks like we haven't completed the breakdown and consolidated guides for each of the harnesses
> similar to what was built for content/claude-code … check and see if we added the skill and if it's
> still doing the deep-dive consolidation … then let's see if we can add the remaining content for the
> other harnesses"*

The skill existed and had **never been run**. Three things blocked it, and all three were repaired
before the first deep read was attempted:

1. Its gate required a list of "highlighted harnesses" that was never written, so it stopped every time.
2. Its `allowed-tools` omitted `AskUserQuestion`, so it could not have negotiated scope even if asked.
3. Its only exemplar, `content/claude-code/`, carried **77 LoomWarp mentions** across all twelve
   documents — a rule-9 violation in the folder held up as the model.

## Decisions taken

| # | Decision | Where it is ruled |
|---|---|---|
| 1 | Pilot one harness, then fan out. **Codex CLI** first | this PRD |
| 2 | **Drop the highlighted gate.** Depth is negotiated per commission | `RULING-2026-09-08-deep-read-claims.md` |
| 3 | The vendor's claim ledger lives in `00-README.md`; the guide **maps claim → mechanism without grading** | `RULING-2026-09-08-deep-read-claims.md` |
| 4 | Shape: **navigation fixed, content free** — `00` and `20` always, everything between is the vendor's | the skill |
| 5 | Strip the exemplar's LoomWarp framing; add the claim block | this PRD |
| 6 | **Line count is not a requirement**; conciseness is, via a deletion test | the skill |
| 7 | Record **when an analysis ran, who ran it, and on what model** | `RULING-2026-09-08-authorship-provenance.md` |
| 8 | Backfill existing files as opus, **marked as an attestation** | `RULING-2026-09-08-authorship-provenance.md` |
| 9 | Codex's scope: CLI/runtime **plus** the cloud and IDE surfaces | this PRD; disclosed in `content/codex/00-README.md` |

## Deliverables

**Phase 1 — the skill and the rules.** ✅ complete
- `skills/harness-deep-read/SKILL.md` amended: depth **and scope** negotiation replacing the gate,
  `AskUserQuestion` added, the claim requirement with three outcomes, the free shape, the deletion test,
  the authorship block, the drift rule.
- `skills/harness-teardown/SKILL.md`: `verification:` added to the frontmatter spec, budget 11 → 22.
- Two rulings, both indexed in `RULINGS.md`. R11's scope extension recorded in `spectrums/01-scorecard.md`.

**Phase 2 — the exemplar and the backfill.** ✅ complete
- `content/claude-code/` stripped: nine `## LoomWarp notes` sections, one LoomWarp-specific policy
  appendix, nine inline note paragraphs, six prose mentions rewritten, the `30-` row removed, the
  comparative summary replaced, `project: loomwarp` → `harness-atlas` in eleven files.
- Claim ledger and `verification:` added to `00-README.md`; claim → mechanism close added to `20-`.
- Ten profiles backfilled with `verification:`, each marked as attested rather than captured.

**Phase 3 — the fan-out.** ⏳ not started
Eight remaining, as parallel `feature-lead` sub-agents per the W4 precedent, **re-reading the skill
between each of the first few** rather than dispatching all eight at once (see ISSUE-023).

Order: **OpenClaw** · OpenCode · Hermes · Grok · **Pi** · Gas City · **LoomWarp** · FRACTAL.

## Acceptance criteria

- **AC-1** `node scripts/check-doc-links.mjs` PASS with anchors. ✅
- **AC-2** `git status` clean at close.
- **AC-3** No coverage mark (`● ◐ ○`) appears anywhere under a deep-read folder. ✅ for `content/codex/`.
- **AC-4** No `30-` document exists in any deep-read folder. ✅
- **AC-5** Every deep read carries a claim ledger and a `verification:` block with a **captured**
  `drafted_by`; every document carries the one-line drafted note. ✅ for `content/codex/`.
- **AC-6** Both directions wired: the profile's §1b lists every document, §6 rows link out, the folder
  points back up, `index.md` names the folder. ✅ for Codex.
- **AC-7** Each deep read's findings against the skill are logged before the next is commissioned.
  ✅ ISSUE-023.

## Do NOT

- Dispatch all eight at once. ISSUE-023 falsified four parts of the skill on the *first* run; the next
  two harnesses are the ones most likely to falsify more.
- Let a deep read restate the profile. It exists to hold what §6 links **out** to.
- Re-read a profile to resolve drift against a deep read. Carry both figures with both dates.
- Create a `30-`, score anything, or compare one harness to another inside a set.
- Write `drafted_by` as a guess.

## Open

1. **Does LoomWarp get a deep read at all?** Its sources are a private repository, so no citation in the
   set can resolve for a public reader. W11 established a backticked-provenance discipline for exactly
   this, but a whole folder of unresolvable citations is a different proposition from 32 of them in a
   profile. **Recommendation: last, and decided on its own once the other seven are done.**
2. **Does `wiki-nav` run over the new folders?** It has never been run; its first run touches ~100 files.
   Out of scope here, named so it is not forgotten.

---

*Brief: KD, 2026-09-08, reviewing the merged `template-v2` branch. Prior art: `content/claude-code/`,
until today the only deep read in the corpus, and the sole example the skill was inferred from.*
