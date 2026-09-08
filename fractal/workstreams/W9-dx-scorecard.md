# Workstream PRD: W9-dx-scorecard

**Epic:** harness-atlas — the re-cut
**Mode:** interactive — with KD (the naming and the two rulings); the scoring pass is authored, not dispatched
**Dependencies:** W8a AC-5 (KD's review of `content/claude-code.md`) for phase 1 only. Phases 0 and 2 have none. **Does not block W8b.**
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W9-dx-scorecard-HANDOFF.md`.

## Goal

`spectrums/00-README.md` specifies ten `−3…+3` axes and two output files that have never existed.
Nothing has been scored, so three of the sheet's four falsifiers (§6) cannot fire. KD's ask, 2026-09-07:
a **developer-experience character sheet** — seven high-level concerns readable in thirty seconds by
someone who will never open ten anchors — and a documented **identification → research → graduation**
process so a newly-discovered thing is recorded and routed to a source of truth instead of dying in prose.

**This workstream is a proof of procedure, not a validation of the instrument.** R6 (an axis
discriminates only if it takes ≥3 distinct values) is untestable at one scored harness, and the
"identical fingerprints" falsifier is unreachable. The corpus finding waits for W8b.

## Deliverable

1. **`spectrums/01-scorecard.md`** — seven DX dimensions as a *headline layer* over the ten axes.
   Separate file, not a section of `00-README.md`: that file states R2, the anti-grade rule, and
   housing R2's exception inside it is how a rule quietly dies. Three new rules: **R8** authored never
   computed (with its reason — axes VI and VII are `centred`, and no arithmetic maps a centred axis
   onto a polar one); **R9** a graded dimension is declared in four places; **R10** split, never average.
   Exactly one dimension carries `grades: true` (DX-5 Ecosystem, per KD 2026-09-07), with
   `because_grades:` and `contested_by:` both mandatory so the exception stays retirable.
2. **`spectrums/00-README.md` corrected** — the Template-A sweep (`§A/§B/§C/§D`, `§G`, `codex` →
   Template v2 section numbers), R3's stale enumeration fixed to include §7, an R7 dated revision line,
   a `Headline` row on all ten axes, and new optional `split:` and `gap:` field rules.
3. **`docs/agents/intake.md`** — sibling to `issue-tracker.md`/`triage-labels.md`/`domain.md`. Four
   triggers, five states (NOTICED → RESEARCHED → PROBATION → ADMITTED → REJECTED/RETIRED, generalized
   from `spectrums/00-README.md` §4), and a routing table covering nine kinds of new thing with the
   sync cost of each counted, not estimated. Discovery and research use `fractal/wayfinding/` as
   `docs/agents/issue-tracker.md` §"Wayfinding operations" already specifies; the durable record is a
   candidates table inside each SoT, in that SoT's own idiom.
4. **`rulings/00-README.md`** — an index, not a store. Rulings keep their three existing homes; every
   "where the text is" cell is an anchored link, so the existing link checker validates it.
5. **`CROSSWALK.md` §3.13** — the probation/promotion/retirement ceremony ported to components, using
   the **two peers shipping it as a named primitive** test that `components/ALIGNMENT.md`
   already states and nobody connected to `SKILL.md`'s *"Do not add a 34th row."* Seeded from the four
   objects ISSUE-007 names.
6. **Candidates sections** — `vocabulary.md` §1.6, `comparisons/03-jtbd.md` §6,
   `comparisons/2026-08-research/05-harness-factors.md` §5, `spectrums/01-scorecard.md` §4.
7. **The scoring pass** — `spectrums/positions/claude-code.yaml` (`schema_version: 2`) scoring ten
   axes, three probation axes and seven dimensions, plus `spectrums/positions.md` carrying the corpus
   table and the first rendered character sheet.
8. **Wiring** — `index.md` and `CLAUDE.md` gain the lines `00-README.md` §5 says are owed;
   `04-harness-alignment.md` §1 gains a pointer note **only**.

## Acceptance criteria

- **AC-1** `node scripts/check-doc-links.mjs` PASS with anchors resolved, now also covering every
  `rulings/00-README.md` target and the `positions.md` → profile link. No new script.
- **AC-2** `git status` clean; `spectrums/` tracked.
- **AC-3** Every dimension definition carries a non-empty `reads:` and both anchor sets, and either
  both R2 cost fields **or** `grades: true` + `because_grades:` + `contested_by:`. **Exactly one**
  carries `grades: true`, naming a ruling that exists in `rulings/00-README.md`.
- **AC-4** The **five** detail-only axes — II, IV, **VII**, VIII, IX — each appear in
  `01-scorecard.md` §3 with a stated reason, and **all ten** carry a reciprocal `Headline` row in
  `00-README.md` §3 naming either the dimension they feed or their detail-only status. **All ten axes
  are scored** in the YAML — detail-only governs display, never scoring.
  *(Corrected during execution, 2026-09-07: the plan said four. Axis VII `Control posture` asks what
  may run unattended, which is orthogonal to DX-2 — a deterministic pipeline can run unattended and a
  prose-led harness can be approval-first — so it feeds no dimension. Five of ten feed the headline,
  five do not.)*
- **AC-5** `positions/claude-code.yaml` scores 10 axes + 3 probation + 7 dimensions; every `evidence`
  entry points only at profile sections and component ids, **zero URLs**; every `null` carries
  `unscored_because` + `pages_checked`.
- **AC-6** The R3 falsification check is run and its result written into the HANDOFF, naming every
  question the profile could not answer and confirming no vendor source was opened.
- **AC-7** `intake.md` §3 routes all nine kinds to files that exist, each with a counted sync cost.
  `CROSSWALK` §3.13 states the two-peers test **by citation, not re-invention**.
- **AC-8** Rendered on github.com from the branch: the position strips align down the column, `†` is
  visible on DX-5 without opening anything, the fingerprint reads in under three seconds. Browser and
  date recorded, per the W8a precedent.
- **AC-9** No new mark system escapes: the scorecard glyphs are **used** only under `spectrums/`;
  `● ◐ ○ n/a` and `✅ ↪ ⚠️` are untouched everywhere. *(Amended during execution: this PRD and its
  HANDOFF name the glyphs in order to state the rule. Naming a mark is not using one — the test is
  whether a glyph carries a claim about a harness outside `spectrums/`, and none does.)*
- **AC-10** `spectrums/00-README.md` cites no Template-A section as if it were current, and names no
  v1 profile as its worked example. *(Amended during execution: the original wording — zero occurrences
  of `§A`…`§G` — is unsatisfiable, because the §1 note that **maps** Template A onto Template v2 must
  quote the old names to be useful, and eight profiles are still Template A until W8b. Two occurrences
  remain, both inside that mapping sentence. A checkable restatement: no Template-A reference outside
  the one dated mapping note.)*

## Do NOT

- Compute any DX value from axis values. R8 exists because averaging a `centred` axis into a polar one
  reports the opposite of the truth.
- Add a second `grades: true` dimension without its own dated ruling.
- Add a `## 11.` to any profile, or a 34th component row.
- Re-head or archive `components/ALIGNMENT.md` — KD's ruling 2026-09-07 keeps it as the
  prose inventory and findings-generator. A pointer note only.
- Put `▰▱` or `─●` anywhere outside `spectrums/`.
- Write any script that checks counts, regenerates a table, or validates the YAML. The bar is the link
  checker (`CLAUDE.md` — *markdown is not code*).
- Score a second harness in this workstream. The other ten are v1; W8b renumbers their sections and
  would invalidate every evidence path written now.

## Session shape

1. **Phase 0** — no gate; reads the profile, never edits it. The draft committed verbatim, then
   corrected; `01-scorecard.md`; `intake.md`; `rulings/00-README.md`; the rulings; `CROSSWALK` §3.13; the
   candidates sections; wiring; ISSUE-009.
2. **Phase 2** — the scoring pass. `positions/claude-code.yaml` and `positions.md`.
3. **Phase 1** — gated on W8a AC-5, because it edits the exact artifact under KD's review: the
   `Scorecard` card row in `SKILL.md` §1 and in `content/claude-code.md` §1, and the profile's
   back-link to `positions.md`. Held until the review lands.

---

*Brief: KD, 2026-09-07 — the six proposed DX categories, cost added as a seventh, DX-5 admitted as
graded, `04-harness-alignment.md` kept as a reference. Plan:
`~/.claude/plans/looking-at-the-spectrums-curious-bird.md`. Prior instrument: W8 Template v2.*
