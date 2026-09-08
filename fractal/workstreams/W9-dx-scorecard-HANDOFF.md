# HANDOFF: W9-dx-scorecard

**Epic:** harness-atlas — the re-cut
**Mode:** interactive (architect + KD). No fan-out; the scoring pass is authored.
**Branch:** `template-v2`, pushed. Phases 0 and 2 landed; **phase 1 is held behind W8a AC-5.**
**PRD:** `W9-dx-scorecard.md`. Plan: `~/.claude/plans/looking-at-the-spectrums-curious-bird.md`.

## Produced

| # | Deliverable | Where | State |
|---|---|---|---|
| 1 | Seven DX dimensions | `spectrums/01-scorecard.md` | New. R8/R9/R10; exactly one graded dimension |
| 2 | The sheet, corrected | `spectrums/00-README.md` | Committed verbatim first (`e33ee3c`), then corrected. Template-A sweep, `split:` and `gap:` field rules, `Headline` row on all ten axes |
| 3 | The intake process | `docs/agents/intake.md` | New. 4 triggers, 5 states, 9 kinds routed with counted sync costs |
| 4 | Ruling index | `rulings/00-README.md` | New. 14 rulings indexed, 2 open questions. No ruling text moved |
| 5 | Component ceremony | `CROSSWALK.md` §3.13 | New. Two-peers test cited from `04-harness-alignment.md`, not re-invented. 4 candidates seeded from ISSUE-007 |
| 6 | Candidates sections | `vocabulary.md` §1.6 · `03-jtbd.md` §6 · `05-harness-factors.md` §5 · `01-scorecard.md` §5 | New in each |
| 7 | **The scoring pass** | `spectrums/positions/claude-code.yaml` · `spectrums/positions.md` | **The first thing this repo has ever scored** |
| 8 | Wiring | `index.md` §2 · `CLAUDE.md` · `04-harness-alignment.md` §1 note · `SKILL.md` exit clause | Done |
| — | ISSUE-009 | `fractal/ISSUES.md` | `grid.html`'s claimed generator does not exist |

## Claude Code — the first fingerprint

`+1 · +1 · +3 · −2 · +3† · −3 · +3`

Ten axes: `I +1 · II 0 · III +3 · IV +3 · V 0 · VI +1 · VII 0 · VIII 0 · IX 0 · X +3`.
Probation, excluded from the fingerprint: `surface-breadth +3 · routing-determinism −1 · knowledge-depth −1`.

## The R3 falsification check (AC-6)

The sheet's §6: *"If backfilling a profile requires opening a vendor source, R3 is violated and that
axis is a component request in disguise."*

**Zero violations.** Three questions arose and **no vendor source was opened for any of them**:

| Axis | The question | Resolution |
|---|---|---|
| **III** | Does `bypassPermissions` defeat the OS sandbox? | Scored `+3` on managed settings, stated verbatim in §7. `gap:` recorded |
| **V** | Does the CLI run a non-Anthropic model? | Scored `0` on the `0a` row — five hosts, one model family. `gap:` recorded |
| **DX-5** | How many plugins do the marketplaces hold? | Scored `+3` on stars, tags, standard co-publication, marketplace existence. `gap:` recorded |

**The check produced a schema change.** R5 was all-or-nothing — score it, or `null` with
`pages_checked` — with no way to say *"I scored it, and here is the question that would move it."*
Dropping that silently is inference by omission. The optional **`gap:`** field is now in
`00-README.md` §2.3, and a `gap:` recurring on one axis across three harnesses is an R3 warning that
routes to `intake.md` as a candidate component.

## Render evidence (AC-8)

github.com, branch `template-v2`, `spectrums/positions.md`, Chrome, 2026-09-07, dark theme.

1. **The character sheet passes.** All seven position strips align down one column — the code span
   forces monospace, which was the design bet. At render they read as genuine sliders: `1` and `2`
   just right of centre, `3` and `7` hard right, `4` left, `6` hard left. The `†` is visible on
   `5 Ecosystem` without opening anything, and the graded row's fill `▰▰▰▰▰` is **visually distinct
   from the position strips at a glance** — the glyph-vocabulary split works as intended.
   `<details>` renders collapsed.
2. **The corpus table failed and was fixed.** At nine columns the fingerprint cell wrapped to four
   lines and stopped being a fingerprint. The column was **dropped** — it is redundant with the seven
   per-dimension columns beside it and with the fingerprint heading each harness's own section. The
   reason is recorded inline in `positions.md` so it is not re-added.

## Acceptance criteria

- **AC-1** Checker PASS — 1,580 links, 78 anchors. **Met.**
- **AC-2** `git status` clean; `spectrums/` tracked. **Met.**
- **AC-3** Seven dimensions, each with non-empty `reads:` and both anchor sets. Exactly one carries
  `grades: true`, naming `2026-09-07-dx-scorecard`, which exists in `rulings/00-README.md`. **Met.**
- **AC-4** Five detail-only axes in `01-scorecard.md` §3; `Headline` row on all ten in `00-README.md`
  §3; all ten scored. **Met, after correction** — see below.
- **AC-5** 10 axes + 3 probation + 7 dimensions scored; zero URLs in `evidence`. **Met.**
- **AC-6** Run and recorded above. **Met.**
- **AC-7** Nine kinds routed to files that exist; §3.13 cites the two-peers test. **Met.**
- **AC-8** Recorded above — one pass, one failure fixed. **Met.**
- **AC-9** Glyphs used only under `spectrums/`. **Met, criterion amended** — see below.
- **AC-10** No Template-A reference outside the one dated mapping note. **Met, criterion amended.**

## Corrections made during execution

1. **Five detail-only axes, not four.** The plan said II, IV, VIII, IX. Axis **VII Control posture**
   asks *what may run unattended*, which is orthogonal to DX-2 rather than a component of it — a
   deterministic pipeline can run unattended, and a prose-led harness can be approval-first. It feeds
   no dimension. Five of ten feed the headline; five do not.
2. **Axis V scored `0`, not the planned `−1`.** The `0a` row states five providers swappable in
   configuration, which is the `0` anchor verbatim. `−3` requires *one model family **and** one host*;
   only the first half holds. Recorded as a `split:`.
3. **AC-9 and AC-10 were unsatisfiable as written**, and were amended in the PRD with their reasons
   rather than quietly passed. AC-10 asked for zero occurrences of `§A`–`§G` in the sheet, but the note
   that *maps* Template A onto Template v2 must quote the old names to be useful, and eight profiles
   are still Template A until W8b.
4. **`index.md` renumbered**, so five inbound references to "§3 the layers" were **de-numbered** rather
   than re-pointed — a distributable skill should not depend on another file's section numbering.

## Findings

1. **Axis X's R6 exemption is falsified on its first data point.** `00-README.md` §3 X predicts
   *"near-total clustering at `−3`"* and keeps the axis because *"the emptiness is the result."*
   Claude Code scores **`+3`**. One point does not overturn a prediction, but it must now be
   **re-checked, not repeated**.
2. **R10 was written for a hypothetical and met four real cases immediately** — axes I and V, DX-6,
   and the probation axis `routing-determinism` all needed `split:` on the first harness scored.
3. **Axis VII's contested shape survives untested** — `polar` and `centred` both read `0` here.
   Settling it needs a harness that is unambiguously autonomous-by-default.
4. **R6 is untestable at N=1.** This pass proves the *procedure*, not the instrument. `positions.md`
   says so in a blockquote rather than letting a reader infer the instrument was validated.
5. **`§7` was the unlock.** Every profile's identity block carries licence, stars, repo age, releases
   and the vendor's self-description, cited and dated, and no instrument read it. It is what makes
   DX-4, DX-5 and DX-6 scoreable without new research — R3 never needed extending, only correcting.

## Not completed

- **Phase 1**, held behind **W8a AC-5**: the `Scorecard` card row in `SKILL.md` §1 and in
  `content/claude-code.md` §1, plus the profile's back-link to `positions.md`. It edits the exact
  artifact under KD's review. `positions.md` → profile links already work one-directionally.
- **Ten of eleven harnesses unscored**, by design (PRD *Do NOT*): they are Template A, and W8b
  renumbers their sections.

## Open items

- **`spectrum` names two instruments.** Four files call the *maturity* framework "the spectrum"; the
  sheet's §0 silently renamed it *"the maturity range."* Recorded in `vocabulary.md` §1.6 and
  `rulings/00-README.md` *Open*. **KD's ruling.**
- **DX-5's `contested_by` is written and unargued.** If nobody ever argues it in either direction, the
  exception was a shrug rather than a ruling — `01-scorecard.md` §6 says so as a falsifier.
- **`surface-breadth` promotion** is blocked on R6, which needs more scored harnesses.
- **W9 does not block W8b.** Since W8b is what makes this instrument testable, W8b should arguably run
  first. KD's call.

## Commits (branch `template-v2`)

`e33ee3c` the draft, verbatim · `07695c3` scorecard, intake, ruling index · `5c42837` the scoring pass ·
*(this commit)* corpus-table fix and this HANDOFF.

---

## Superseded by the 2026-09-07 revision — forward pointer, appended not rewritten

Everything above is the record of W9 as it landed and is left intact. Later the same day KD revised
the seven dimensions and renamed the rendered page. **Three references above are now stale by name:**

- `spectrums/positions.md` is **`spectrums/positioning.md`** — ruling `2026-09-07-positioning-rename`.
  The `spectrums/positions/` folder and the YAML `positions:` key are unchanged.
- The seven dimensions named in deliverable 1 were revised — four ids retired and superseded, DX-4's
  polarity reversed, DX-5 narrowed. Ruling `2026-09-07-dx-revision`, text at `01-scorecard.md` §7.
- The Claude Code fingerprint recorded in deliverable 7, `+1 · +1 · +3 · −2 · +3† · −3 · +3`, is
  superseded by `+1 · +1 · +3 · +2 · +2† · −3 · +3`. It is kept in the YAML under
  `superseded_scorecard:`, not deleted.

Appended per the standing rule that a vocabulary retires by ruling and a crosswalk, never by deletion.
