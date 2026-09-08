# HANDOFF: W12-deep-read-fanout (phases 1–2)

**Completed:** 2026-09-08
**Epic:** harness-atlas — the re-cut
**Branch:** `deep-read-fanout`. **PRD:** `W12-deep-read-fanout.md`.
**Phases 1 and 2 are complete. Phase 3 — the eight remaining harnesses — is not started.**

## What landed

| | Where | State |
|---|---|---|
| The skill, amended | `skills/harness-deep-read/SKILL.md` | 135 → 256 lines; gate replaced, four post-pilot fixes applied |
| The teardown skill | `skills/harness-teardown/SKILL.md` | `verification:` in the frontmatter spec; budget 11 → 22 |
| Two rulings | `RULING-2026-09-08-deep-read-claims.md`, `RULING-2026-09-08-authorship-provenance.md` | Both indexed in `RULINGS.md`; R11's extension recorded in `01-scorecard.md` |
| The exemplar, stripped | `content/claude-code/` (12 files) | 77 LoomWarp mentions → 2, both inside the dated strip record |
| Authorship, backfilled | 10 profiles + `content/claude-code/` | `verification:` blocks, marked attested |
| **The pilot** | `content/codex/` (13 files, ~1,340 lines) | Standard depth; both directions wired |
| Findings | `fractal/ISSUES.md` ISSUE-023 | Four falsifications, all fixed in the skill |

**Gate:** `node scripts/check-doc-links.mjs` — **PASS**, 2,445 local links and 1,207 anchors.

## The pilot falsified the skill in four places, which was its job

`harness-deep-read` was inferred from one folder. Running it on Codex showed four places where Claude
Code's accidents had been written down as the genre's rules — full argument in **ISSUE-023**:

1. **Scope is a separate question from depth.** Codex publishes three non-nested outlines; depth was
   answerable and *which outline* was not. Claude Code has one docs tree, so this never came up.
2. **"The repository" is two source classes.** Codex's `docs/` is now stubs behind two redirects; the
   substance lives in `codex-rs/*/README.md`, the only home of execpolicy's grammar and the memory
   pipeline's phases.
3. **The claim test needed a third outcome.** A claim can be *outside the set's scope* rather than
   unmechanised; recording that as an absence would be false. It occurred once in Codex and three
   times in the Claude Code retrofit.
4. **Profile and deep read drift visibly.** Codex's profile says 11 hook events at its 2026-09-03
   read; the docs say 12 today. §6 now carries both figures with both dates rather than picking one.

## Four things worth your eye

**The exemplar was worse than the audit said.** W11 reported the LoomWarp framing re-headed. It had
re-headed one paragraph of `00-README.md`. All twelve documents carried it: nine `## LoomWarp notes`
sections, nine inline note paragraphs, a convention advertising them, a whole appendix auditing
LoomWarp's `policy/tier-*.json`, and eleven files still stamped `project: loomwarp` despite W10's AC-6
calling for exactly that fix. Had the fan-out gone first, this shape would have been copied eight times.

**Two LoomWarp mentions remain, deliberately.** Both are inside a dated note in `00-README.md` saying
what was removed and why. The plan's verification called for zero; *archive by ruling, never by
deletion* argues for the record. **Deviation reported rather than resolved unilaterally — delete the
note if you disagree.**

**The backfill is an attestation, and the repo holds a counterexample.**
`W0-alignment-HANDOFF.md:117` records three sanity teardowns run on **sonnet**. No other run recorded a
model. So every backfilled `drafted_by: "claude-opus-5"` carries a `note:` saying it is your attestation
of 2026-09-08, not a capture. `content/codex/00-README.md` is the first with a genuinely captured value.
The archived `--sanity` drafts were excluded.

**Codex's scope is wider than its profile's, on your instruction, and it shows.**
`11-beyond-the-cli.md` covers cloud, IDE, desktop and web; the profile's §7 excludes all of them
because *"Codex" names three OpenAI products*. That document has **no §6 counterpart**, nothing links
out to it, and `00-README.md` says so plainly. It is the one place the set and the profile describe
different subjects.

## Not done

- **Phase 3 — eight harnesses.** Order in the PRD. ISSUE-023 argues against dispatching all eight at
  once: **Pi** may be the first honest `00` + `20` set, and **LoomWarp** cannot carry a resolvable
  citation. Re-read the skill after each of those two.
- **`wiki-nav` has still never been run**, and there is now a thirteenth folder for it to cover.
- **Nothing is committed.** The branch `deep-read-fanout` holds the work; no commit was made, per the
  standing rule that commits happen when you ask.
