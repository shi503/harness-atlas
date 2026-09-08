# HANDOFF — FeatureLead-Fractal (W4 #4)

**Completed:** 2026-09-03
**Epic:** harness-atlas — the re-cut
**Workstream PRD:** `fractal/workstreams/W4-teardowns.md` (amended block, 2026-09-03), for harness
**FRACTAL** — three instances: upstream `shi503/fractal-agent-system` (pinned at the LoomWarp-vendored
commit `6398f6db059598e381336601b21609928cf24034`), the fork `shi503/generic-cerebro` (local clone,
pinned `2cd56e7`), and this repo's own un-routed instance (`fractal/`, `.claude/agents/{architect,
feature-lead}.md`, `CLAUDE.md` § Workstreams).
**Procedure:** `skills/harness-teardown/SKILL.md`, full run (not `--sanity`), with the PRD's explicit
peer rule (same template, no special status) and rule 8 (sibling products sharing vocabulary — every
row in `content/fractal.md` names which instance a claim is about). Read first, in full: `CLAUDE.md`,
`fractal/workstreams/W4-teardowns.md` (amended block, item 4), `skills/harness-teardown/SKILL.md`
(whole skill, including rule 5's self-referential-system hazard clause), `fractal/workstreams/
W4-loomwarp-HANDOFF.md` (prior run, skill findings), and `content/loomwarp.md` (finished peer profile).

## Summary of Work Completed

1. **`content/fractal.md`** — full Template-A profile, 33 rows, every cell naming its instance (`U`
   upstream / `C` generic-cerebro / `R` this repo). Frontmatter pins `U` at `6398f6db` (the exact commit
   LoomWarp's own `vendor/manifest.json` names), `C` at `2cd56e7`, `R` at this repo's working tree.
   Opener, legend, §A Identity (13-field table for `U`, brief identity notes for `C`/`R`, three-question
   inclusion test and loop question each answered per-instance per rule 7, primitive preview, structured
   -output line), a `## Diagram` section, §B (all 33 rows), §C (five vendor-named primitives, `⚠️
   contestable`, plus a dated table checking each of `03-fractal-as-iterated.md`'s five claimed
   fork-additions directly against the pinned commit — two survived, three did not), §D (five grouped
   quote blocks across `U`, `C`, and `R`), §E (primary/secondary sources, every `gh api` and `git`
   command run), §F (six non-empty bullets plus a Skill findings subsection).
2. **The inclusion test's three-question answer, given per instance (rule 7)**: state persistence,
   "serves more than one person," and mechanical-vs-prose binding are each answered for `U`, `C`, and
   `R` separately, since they diverge materially — `R` in particular has no mechanical binding of any
   kind (no router exists to even parse a PULSE), which the profile records as *structurally* absent,
   not merely undetected.
3. **The loop question**: process layer at all three instances. `U` runs no agent loop of its own
   (`router.py` never spawns a `claude` subprocess — unlike LoomWarp's `dispatch.py`, which does); work
   happens because a human or an already-open session reads a role file and acts. `U` installs into
   Claude Code first-class and documents a thinner, "community-supported" translation path into Cursor
   (`SETUP-CURSOR.md`). `R` installs by the thinnest path of the three: two agent files, no plugin, no
   `.claude/fractal/` directory at all.
4. **§C's sharpest finding, verified rather than assumed**: this repo's own
   `comparisons/systems/kd-built-frameworks/03-fractal-as-iterated.md` frames four objects as things
   the fork (`generic-cerebro`) added over upstream — the `pulse` router subcommand, an append-only
   `ISSUES.md` register with a pre-decomposition triage gate, four evaluation templates, and archive
   discipline. Re-checked directly against the pinned commit (not against that document's word, per
   rule 5's self-referential-system hazard clause): **`pulse`, `ISSUES.md`, and all four evaluation
   templates already ship at `6398f6db`** — `cmd_pulse()` is byte-for-byte the same regex-parse-latest-
   JSON-block logic; `.claude/fractal/ISSUES.md` exists with the same template, severities, and
   lifecycle rule; all four `EVAL_TEMPLATES/*.md` files are present. Only dual-blueprint-schema
   normalization and archive discipline (`_archive/`) are confirmed genuine `C`-only additions,
   verified present in `C/.claude/FRACTAL/router.py` and `C`'s tree, absent from `U` at the pinned
   commit. This is disclosed in §C's own dated correction table and in §F as the run's central
   methodological finding: a delta document written by the same author as both systems being compared
   can go stale the moment either side moves, and was never re-diffed against the commit it names.
5. **A second, related drift finding, kept out of every mark**: upstream's current HEAD (`60393054`,
   pushed today) has diverged from the pinned commit by 29 commits and 303 files (`+32,875/-3,853`
   lines), adding a `standards/` directory, `tools/decision-ledger/`, `tools/wiki-index/`, a
   `.claude-plugin/` marketplace manifest, and `paths:`-scoped rule files — closing several of the exact
   gaps the referenced upstream profile's own credibility check names ("no standards tier," "no context
   provenance"). This is recorded in §A's Install field, §B row 3e, §F, and the dated notes added to
   `components/MATRIX.md` and `04-harness-alignment.md` §2 — and explicitly **never** used
   to change a §B/§C mark, per the PRD's instruction to pin at the vendored commit.
6. **`assets/projects/fractal/tier-diagram.mmd`** — upstream's own `README.md` "## Architecture"
   `graph TB` diagram (byte-identical at the pinned commit and at `U-HEAD`, confirmed by diff), redrawn
   into the house `flowchart TD` notation with the two arrow styles (delegate down / validate up) kept
   distinct. No second diagram exists anywhere in the tree, so no "list the others in §F" case applied.
7. **`comparisons/systems/90-short-profiles.md`** §1 — a new **FRACTAL** row added, marked *Torn down
   2026-09-03*, linking to `content/fractal.md`, placed in the same "Harnesses" table LoomWarp and Gas
   City already sit in by the same installs-into exception, per the PRD's instruction to place it where
   the file's structure puts process layers (no dedicated "process layers" section exists; this is
   where the file already puts them).
8. **`components/ALIGNMENT.md`** §2 — a FRACTAL column added to the 33-row table (header,
   all 33 rows, and the "Column totals" line: **FRACTAL 3 / 11 / 19**), a dated addition note above the
   table explaining the grading is against the pinned commit (not LoomWarp's federated build on top of
   it) and naming the five rows where LoomWarp's own additions diverge from FRACTAL's bare substrate.
   Every existing column (Hermes/Pi/OpenClaw/OpenCode/Grok/Codex/Gas City/LoomWarp) is byte-identical to
   before this run; only new cells were added.
9. **`components/MATRIX.md`** §1 — the *existing* FRACTAL column re-checked cell by cell
   against the new profile's §B, per the PRD ("correct only wrong cells with dated notes"). Two cells
   were wrong: **Harness adapter** `○→◐` (`SETUP-CURSOR.md`'s documented Cursor translation path, the
   same shape as Hermes's `◐ᴴ`) and **Skills** `◐→●` (seven first-class `SKILL.md` files, installed
   once with no ongoing sync mechanism, unlike LoomWarp's `cp -r`-with-removal-defect). Every other
   FRACTAL cell was checked and left unchanged, including **Standards tier** (`○`, correct at the pinned
   commit; the HEAD contradiction is flagged in prose, not used to flip the cell). The primitive-sets
   sub-table's FRACTAL row was corrected from two entries (`workstream`, `PRD`) to one aliased pair per
   rule 3, and the count marked `⚠️ contestable` since the vendor never states the five as a set.
10. `node scripts/check-doc-links.mjs` — **PASS** (182 files scanned, 1465 links checked).

## AC evidence (per `W4-teardowns.md`)

- **AC-1** (§A–F present, §F non-empty, every `○` names pages/checks): met. Every absence row in §B
  names what was checked across all three instances where relevant (e.g. row 2b: "grepped for
  `PreToolUse`/`PostToolUse`/hook definitions... across `U`, `C`, `R`; none found"). §F carries six
  bullets plus a Skill findings subsection.
- **AC-2** (row in `90-short-profiles.md`, column in `04-harness-alignment.md` §2, column re-check in
  `02-component-matrix.md` §1, all in this HANDOFF): met — items 7, 8, 9 above.
- **AC-3** (§C counts and gives the verdict): met — **5 named, `⚠️ contestable`**, `3` supporting,
  with the vendor-vs-fork accounting table required by the dispatch instructions kept strictly separate
  from the count itself.
- **AC-4** (structured-output line, one artifact not a list, verified): met — **HANDOFF.md**, chosen
  over PULSE (more literally machine-structured but optional and interim) and ISSUES (anomaly-only) on
  the tie-break that HANDOFF is the one artifact every unit of work must produce before state advances,
  by the vendor's own stated design intent, at all three instances.

All other acceptance criteria and manifest items: **met**.

## Summary of Work Not Completed

- **The exact commit(s) in the 29-commit drift window that added `standards/`, `tools/decision-ledger/`,
  `tools/wiki-index/`, and the plugin marketplace to upstream were not individually dated.**
  `git log 6398f6db..HEAD --oneline` was not walked commit-by-commit; the finding is bounded to
  "present at HEAD, absent at the pinned commit." Flagged in §F.
- **`03-fractal-as-iterated.md`'s framing was checked against the pinned commit only, not against any
  upstream state earlier than that commit.** The document is dated 2026-08-11, after the pinned commit
  (2026-04-20); whether an even earlier upstream revision genuinely lacked `pulse`/`ISSUES.md`/eval
  templates (making the document's framing merely stale rather than simply wrong) was not investigated.
  Flagged in §F with the reasoning that either way the document was never re-diffed against the commit
  it names, which is the operative finding.
- **`generic-cerebro`'s skill count (39) and standards line-count (849) were taken from the secondary
  document, not independently re-run this pass** — unlike the blueprint count (32) and workstream
  directory count (156), which were independently verified and found to differ from the secondary
  document's own numbers (27, 130), consistent with the fork having grown since that document was
  written. Flagged in §F.
- **Whether `docs/permission-templates/*.json` at `U` is byte-identical to LoomWarp's
  `policy/tier-*.json`** was not diffed directly — only the file names and four-tier shape were
  compared. Flagged in §F.

## Technical Debt

None introduced in this repo. The profile documents debt *inside* the FRACTAL family (the flat
`.state.json`'s missing edge storage, convergently rediscovered by `generic-cerebro`; `U`'s own
`router.py update` accepting any string on faith; `R`'s agent files carrying unreconciled TaskFlow
demo-project residue such as a `fixtures/taskflow/` path reference) — these are findings about the
subject, not shortcuts taken in this workstream.

## Key Decisions

- **The structured-output tie-break (HANDOFF vs. PULSE) is named explicitly as a judgment call** in
  §A and revisited in §F's Skill findings, since PULSE is the more literally machine-parseable artifact
  and a future run could reasonably resolve the tie the other way. I weighted "mandatory and terminal
  for every unit of work" over "more rigidly typed," consistent with the vendor's own README naming
  HANDOFF as the point of the whole design.
- **§C's vendor-vs-fork accounting table is deliberately kept separate from the primitive count**,
  mirroring the LoomWarp HANDOFF's candidates-table precedent, per the same reasoning: mixing a
  correction-of-a-secondary-source finding into the primitive verdict itself would blur two different
  claims (what FRACTAL's primitives are vs. who gets credit for `pulse`/`ISSUES.md`).
- **Rows about the un-routed instance (`R`) mark absences as "structurally absent" rather than plain
  `○`-with-no-comment** wherever a mechanism was deliberately deleted (no router exists to check a
  PULSE) rather than merely unbuilt — recorded as a Skill finding for the Architect (a notational gap
  the current mark vocabulary doesn't capture).
- **§B rows stayed near, but in several cases exceeded, the skill's own "~8 lines, then link out"
  budget**, given three instances per row. No row was split into a linked appendix this pass; recorded
  as a Skill finding rather than resolved unilaterally, since the PRD did not ask for a fourth,
  per-instance appendix file and adding one would have grown the write manifest beyond what was
  authorized.
- No deviation from the PRD's file manifest. No new project guides were needed beyond the skill itself.

## New Dependencies Added

None.

## Verification Evidence

| Gate | Command | Result | Notes |
|------|---------|--------|-------|
| Doc-link check | `node scripts/check-doc-links.mjs` | **PASS** | 182 files scanned, 1465 links checked |
| Manifest scope | `git status --short` | **PASS** | `content/fractal.md` (new), `assets/projects/fractal/tier-diagram.mmd` (new), and the three named comparison files. No other harness profile, `spec/`, `components/`, or `fractal/` file touched; no file in either external repo touched (read-only) |
| Quality pass | `git diff` review | **PASS** | No AI slop found: no dead scaffolding, no `console.log`-equivalent, no unnecessary defensive branches. Profile length and structure match the genre precedent set by `content/loomwarp.md` and `content/gas-city.md`, scaled for three instances |
| Secrets scan | `grep -rn 'password\|secret\|api_key\|token\|credential' <changed files> \| grep -iv 'test\|mock\|example\|type\|interface'` | **PASS** | Zero hits across all five changed paths |
| Personal-data scan | `grep -rn 'email\|ssn\|date_of_birth\|full_name' <changed files> \| grep -iv 'test\|mock\|type\|interface'` | **PASS** | Zero hits |
| Environment-value scan | `grep -rn 'localhost:\|127\.0\.0\.1\|0\.0\.0\.0' <changed files> \| grep -iv 'test\|\.env\|config\.example'` | **PASS** | Zero hits |
| CI gate (this repo) | N/A — docs-only workstream | **N/A** | Per `CLAUDE.md` and the skill: "Markdown is not code... The whole bar is: links resolve... and git is clean." No `npm run build`/`tsc`/`lint`/`test` gate applies to this repo |

## Skill findings (for the Architect — a three-instance, self-referential subject)

- **A delta document between two systems from the same author is not just a secondary source about
  the two systems — it is itself a claim about a diff that can go stale the moment either side moves,
  and should be re-diffed at read time, not read as history.** `03-fractal-as-iterated.md` framed
  `pulse`, `ISSUES.md`, and the four eval templates as the fork's own additions; a direct check against
  the exact upstream commit it names found three of those five already shipping upstream. Rule 5's
  self-referential-system hazard clause (flagged after the LoomWarp run as "worth naming for FRACTAL
  specifically") predicted a hazard here and it materialized, but in a sharper form than LoomWarp's:
  not "this system quotes our vocabulary about itself" but "this system's own internal comparison
  document about a sibling system was wrong about the sibling."
- **A three-instance subject strains §B's row shape more than §A's.** The identity table, inclusion
  test, and loop question tolerate three instances by addition; a 33-row table asking for "what it
  ships / path / source / mark" per row does not compress three instances' findings into the skill's
  own ~8-line-then-link-out budget without real loss. Worth the skill naming an explicit fallback (a
  linked per-instance appendix) for the next multi-instance subject, since this run did not build one
  and instead compressed inline past the stated budget in several rows.
- **The un-routed instance (`R`) surfaced a mark-vocabulary gap**: several of its `○`s are the harness's
  one mechanical component being *deliberately deleted* (no router exists to check anything against),
  not merely *unbuilt*. Rule 2's "absence is recorded, never inferred" handled this fine once stated in
  prose per row, but the mark itself (`○`) cannot distinguish "never built" from "built elsewhere in the
  family, removed here." A notational convention for a future run on a deliberately-reduced fork would
  help (e.g. `○ (n/a — mechanism deleted)`).
- **The structured-output tie-break between a heartbeat and a completion report is a real, recurring
  decision this skill's rule 9(d) doesn't yet resolve explicitly.** LoomWarp's case was clean (one real
  event log, nothing else competitive). FRACTAL's case had two live candidates with opposite strengths
  (PULSE more literally structured; HANDOFF more central and vendor-emphasized) — worth the skill
  stating the tie-break rule (mandatory-and-terminal beats rigidly-typed-but-optional) rather than
  leaving each runner to re-derive it.
- **No framework/process defect found** — nothing rose to the bar for a new entry in this repo's own
  `fractal/ISSUES.md`; the items above are skill-content findings, reported here per the PRD, not
  process bugs in `harness-atlas` itself.

## Router / process notes

Per `CLAUDE.md` §Workstreams, this repo runs **un-routed**: no `router.py`, no BLUEPRINT YAML, no
`.state.json`. No router command was run. This HANDOFF is the completion signal for W4 #4; per
`W4-teardowns.md`'s Session shape, the architect reviews and the queue proceeds to the named-but-untorn
harnesses (item 5).
