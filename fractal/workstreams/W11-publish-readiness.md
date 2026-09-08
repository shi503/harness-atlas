# Workstream PRD: W11-publish-readiness

**Epic:** harness-atlas — the re-cut
**Mode:** headless for the mechanical work; **four items are reserved to KD and no agent may take them** (see *Do NOT*)
**Dependencies:** W8b (the ten v2 profiles) and W9 (the ten scored positions) landed. **Completes W5**, which was never closed. **Unblocks W7**, which waits on `graded:`.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W11-publish-readiness-HANDOFF.md`.
**Status:** ready-for-agent

> **Written after the fact, 2026-09-08.** Five commits (`217d17d`…`d838dcb`) already carry the `W11`
> tag against a workstream that had no PRD — a defect in this repo's own convention, that a workstream
> *is* a PRD in `fractal/workstreams/`. This file records what those commits did and what the rest of
> the queue will do. Recorded rather than backdated.

## Goal

Make the corpus publishable to a stranger on github.com, and stop there.

The audit — `fractal/GAP-ANALYSIS-2026-09-07-publish-readiness.md`, 13 gaps, 5 at P0 — found the
governing defect: **74 markdown hyperlinks pointed into `shi503/loomwarp-team-system`, which is
private**, while `scripts/check-doc-links.mjs` reported PASS on 1,690 local links. The gate was green
and the corpus was unshippable, because the invariant *"this path exists on disk"* was right for a
private repo and became the wrong question the moment publishing was on the table. The author cannot
reproduce the reader's failure: their own credentials make all 74 links work.

The definition of done is KD's own problem statement at `README.md:12` — *"digest a harness in a
meaningful way from just visiting the GitHub page"* — which makes **second-person readiness** the
gate, not demo readiness. Delivery vehicle is a five-minute AI Tinkerers demo and a talk that
deep-links into permanent URLs.

## Deliverable

**Landed 2026-09-08, five commits:**

1. **`--external` on the link checker**, opt-in, plus `.github/workflows/links.yml` — the directory
   did not exist. Fails on 404/410/DNS only; 403 reports `SKIPPED`, because bot-hostile hosts refuse
   datacenter IPs and gating on them makes the bar *"whether Cloudflare likes us today."* First run:
   87 unique URLs, 72 resolved, **12 dead** — nine the private repo, and **three genuine rot nothing
   had ever caught.**
2. **Tier 2 exists.** The 33 sources carried out of `spec/v1-framework/content/` into `components/`,
   renamed by their own `sublayer:` frontmatter, de-bled (`project: loomwarp`, 33 dead `img:` refs),
   196 references re-relativised. `CLAUDE.md` declared this tier since the spin-out; `git ls-files
   components` returned zero for six days.
3. **The peer rule enforced at the source of Tier 2.** All 33 `**ours**` rows — a first-person
   self-assessment no other harness got — became LoomWarp peer rows cited to
   `content/loomwarp.md#<id>-<slug>`. Findings untouched; only who is speaking changed.
4. **`components/00-README.md`, the ID register**, reconciling the two sources the corpus actually
   ran on. `CLAUDE.md:27` had named a *derivation* as the authority. **`CROSSWALK` split at its seam**:
   §3 is a live register holding six ruling texts and moved to `components/CROSSWALK.md`; §1–§2 argue
   for a settled decision and stay to be archived. Headings verbatim, so all seven `RULINGS.md`
   anchors still resolve.
5. **The corpus table on every component page** — all ten harnesses, each cell that harness's own
   mark and own words from its §4 matrix, linking to its detail. This is `README.md`'s *"compare it to
   the next one cell for cell"* becoming a page.

**Remaining, this queue:**

6. **Complete W5** — `requires:` from the 13 cited edges, `graded:` on all 33 (what W7 waits on), and
   AC-4's deletion test for `3c`. Carry `06-relations.md` §3 live first, same seam as CROSSWALK.
7. **The archival by ruling** — `spec/`, `craft/`, the ADR drafts, the two superseded `-draft.md`
   files. `RULING-2026-09-08-<slug>.md`, directory-level mapping table, second table in
   `archive/00-README.md`, and the precedent defect fixed: **21 of 21** existing `archive/` files lack
   `provenance:` and still say `project: loomwarp`.
8. **Shipped-tier cleanup** — the disproven *Factory Worker Protocol* still standing as a real
   primitive in six `comparisons/` files; the remaining private hyperlinks; the three rotted public
   links; stale counts; `content/claude-code.md`'s budget.
9. **W6 matrix backfill** — HumanLayer and Deep Agents columns. Closes ISSUE-001, open since the
   spin-out.
10. **W10's two skills**, and **W7's headless half**.
11. **Publish-state drafts** — `CONTRIBUTING.md`, licence files with the recommendation stated and the
    choice left open, the README nav strip.

## Acceptance criteria

- **AC-1** `node scripts/check-doc-links.mjs` PASS, and `--external` reports **zero** hard 404s.
- **AC-2** Zero markdown hyperlinks to `github.com/shi503/loomwarp-team-system`. Backticked
  `(private)` provenance mentions are the correct form and are expected to remain.
- **AC-3** Every tier `CLAUDE.md` declares exists at a live path: `components/*.md` is 36 files, and
  `CLAUDE.md` lines 13 and 27 both resolve.
- **AC-4** All 33 component pages carry `graded:` and, where applicable, `requires:`. No Tier-2 page
  opens with a link into the archive.
- **AC-5** `git status --porcelain` clean; `git log main..template-v2` empty after the merge.
- **AC-6** `git log origin/template-v2..template-v2` **non-empty** — evidence nothing was pushed.

## Do NOT

**Four things belong to KD and no agent may do them, tonight or otherwise:**

- **Set `verified: true` in `spectrums/positions/`.** R11 requires *a person*, and its own falsifier
  (`spectrums/01-scorecard.md:488`) says a corpus left at `verified: false` *"launders unreviewed
  scores as honestly-labelled unreviewed scores and then ships them anyway."* An agent flipping that
  bit is exactly the laundering the rule names.
- **Flip `status:` to `ACTIVE`** on any page whose completeness is a person's judgment. It is the same
  claim in a different field.
- **Choose the licence.** It is a legal decision about quoted vendor material.
- **`git push`, or change repository visibility.** One-way doors.

Also: do not delete anything the archive should receive; do not invent a `requires` edge §3.2 stages
but nobody cites; do not fan out overnight — ISSUE-016 is a fan-out `git add -A` accident, and
unattended is when nobody catches it.

---

*Brief: `fractal/GAP-ANALYSIS-2026-09-07-publish-readiness.md`; KD's rulings of 2026-09-07 and
2026-09-08 on ship tiering, the archival scope, and the autonomy boundary for this run.*
