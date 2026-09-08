---
title: "RULING 2026-09-08 — the v1 specification, craft, and the ADR drafts are archived; the live registers leave first"
status: PERMANENT
owner: KD
created: "2026-09-08"
provenance: AUTHORED
---

# Ruling — the archival

**What retired.** The v1 framework specification, `craft/`, the 22 store-format ADR drafts, and the
two pre-template profile drafts. KD, 2026-09-08, reviewing the publish-readiness audit: *"spec/ craft/
… they should likely be moved into archive/ since they are not fit to publish."*

**Why now rather than at the spin-out.** `RULING-2026-09-02-spinout.md` already anticipated it — of
`spec/v1-framework/**` it says *"the 33 component files are re-cut source for W5, then archived."*
What it could not know is that the re-cut would be a **move rather than a rewrite**: the sources were
74–97 lines against Tier 2's ~80-line target, so they were carried into `components/` intact and no
residue was left behind to archive. What remained was argument about a decision already taken.

**Method.** `git mv`, then two mechanical passes recorded in
[`scripts/rewrite-paths-2026-09-08.mjs`](scripts/rewrite-paths-2026-09-08.mjs): 69 inbound links
re-pointed to the new paths, and 196 outbound links re-based because the moved files changed depth.
Three directory links without trailing slashes were fixed by hand. Checker passes at 2,252 links and
1,201 anchors, `--external` unchanged.

## What moved

| From | To | Note |
|---|---|---|
| `spec/v1-framework/**` (8) | `archive/spec/v1-framework/` | The specification, less its 33 components and its two live registers |
| `spec/EXPLAINER-PLAN.md` | `archive/spec/EXPLAINER-PLAN.md` | Superseded by `README.md` at W0, 2026-09-03; never re-headed until now |
| `craft/**` (2) | `archive/craft/` | Architect-craft, not harness anatomy. **Zero inbound markdown links** — nothing pointed at it to break |
| `comparisons/systems/kd-built-frameworks/adr-seeds/**` (23) | `archive/adr-seeds/` | 22 ADR drafts and a README. Unfinished internal decisions |
| `content/claude-code-draft.md`, `content/pi-draft.md` | `archive/` | Pre-template drafts sitting in the shipped tier; `W8-template-v2-HANDOFF.md` ordered this once the real profiles existed |

## What left the specification *before* it was archived, and why

**A live rule cannot live in the archive.** `CLAUDE.md` requires everything under `archive/` to be
`ARCHIVED` or `SUPERSEDED`; a register the live tier reads every day is neither. So two sections were
carried out first, **headings verbatim**, and pointer stubs left behind:

| Section | To | What made it live |
|---|---|---|
| `CROSSWALK.md` §3 | [`components/CROSSWALK.md`](components/CROSSWALK.md) | Six ruling **texts** — `RULINGS.md` §*Why an index* names this file as one of three sanctioned homes for one — plus §3.13, the register where a 34th component waits |
| `06-relations.md` §3 | [`components/RELATIONS.md`](components/RELATIONS.md) | The thirteen cited `requires` edges, read by every component page's `requires:` frontmatter |

Carrying the headings verbatim meant **all seven anchors `RULINGS.md` points into §3 still resolve**;
only the path changed. That is why this was preferable to relocating six ruling texts into root
`RULING-*.md` files, which `RULINGS.md` argues against by name as *"large, low-value churn"* and which
would have detached each ruling from the gap it closes.

## Re-heading — the rule this ruling settles

The standing rule says *archive by ruling, never by deletion* and *re-head the loser*. The precedent
disagreed with itself: files archived **individually** carry a `⛔ ARCHIVED` banner, while the twelve
files of the 2026-09-01 whole-directory archival were `git mv`'d unedited and carry none.

**Ruled: a whole-directory archival re-heads by index and frontmatter, and banners only the files
carrying inbound citations from live material.** The banner exists to catch a reader arriving from a
citation; a file nothing live cites has no such reader, and 42 banners nobody reads is how a warning
stops being read at all. Concretely, and done here:

- a banner and a per-file table at [`archive/spec/00-README.md`](archive/spec/00-README.md);
- a **second table with a bolded lead-in** in [`archive/00-README.md`](archive/00-README.md), the form
  the 2026-09-01 archival established;
- `status:` and `provenance:` normalised on **all 56** files now under `archive/`.

**The precedent defect is fixed in the same pass.** All 21 pre-existing archive files lacked
`provenance:` entirely — a 100% violation of the field `CLAUDE.md` mandates — and all 21 still said
`project: loomwarp` nine months after the spin-out. Both corrected. The two profile drafts carry
`superseded_by:` pointers, which the 2026-09-01 archival did not.

## Recorded, not resolved

**Eighteen live citations now point into the archive.** The nine `kd-built-frameworks` documents were
kept and their ADR drafts were not, on KD's ruling of 2026-09-08 — so five of those nine cite
`ADR-006`…`ADR-024` across the boundary. Legal: `archive/00-README.md`'s *"Why it is still cited"*
column exists for exactly this. Unusual enough to write down. **The cleaner cut is to archive
`kd-built-frameworks/` whole**, and it stays available.

Two side findings logged rather than silently corrected: `kd-built-frameworks/00-README.md` describes
*"19 store-format ADR drafts"* against **22** actual, and `ADR-025`–`ADR-027` are linked from nowhere.

## Not done here, by design

`comparisons/` stays published in full — KD, 2026-09-08: *"3) but clean up what's necessary."* That
decision is load-bearing rather than lenient: the 33 component pages make 199 peer citations and only
about 35 have a `content/` target, so holding `comparisons/` back would have made Tier 2 unbuildable
without first tearing down HumanLayer and Deep Agents.
