---
title: "W11 evening run — what landed, what I stopped short of, and the four things that are yours"
tier: fractal
status: DRAFT
provenance: AUTHORED
created: "2026-09-08"
owner: KD
---

# Evening run — report

**Fourteen commits on `template-v2`, tree clean, both gates green.**

The headline: **`node scripts/check-doc-links.mjs --external` now reports 72 resolved, 2 unverifiable,
0 dead.** On its first run this evening it reported 12 dead. That is the defect the whole workstream
existed for — 74 hyperlinks into a private repository, invisible to a gate that only checked local
paths — and it is closed.

| | Before | Now |
|---|---|---|
| Local links / anchors | 1,690 / 757 | **2,300 / 1,203** |
| External links dead | 12 (never checked) | **0** |
| Private-repo hyperlinks | 74 | **0** (1 remaining is a fenced example) |
| `components/` | empty directory | **36 files** |
| `archive/` files missing `provenance:` | 21 of 21 | **0 of 57** |
| Tier-2 pages opening into the archive | would have been 33 | **0** |

---

## The four things waiting for you

1. **R11 sign-off** — all ten `spectrums/positions/*.yaml` are still `verified: false`, untouched.
   Not delegable: R11 requires a person, and its own falsifier says a corpus left at `verified: false`
   *"launders unreviewed scores as honestly-labelled unreviewed scores and then ships them anyway"* —
   an agent flipping that bit is the laundering.
2. **The licence choice.** No `LICENSE` file was created. The argument and the ready text are in
   [`LICENSING-RECOMMENDATION.md`](./LICENSING-RECOMMENDATION.md): CC-BY-4.0 for the prose, MIT for
   `scripts/` and `skills/`, and a `NOTICE` covering quoted vendor docs and the redrawn diagrams.
   Applying it is three files and one decision.
3. **The `status: DRAFT` → `ACTIVE` flip.** Not touched, for the same reason as R11 — it is the same
   claim in a different field.
4. **`git push` and the visibility flip.** Nothing has reached a remote.

## Three decisions I need you to take

**ISSUE-022 — `grid.html` has two claimants and they contradict each other.** W7's PRD says its rows
become the `graded: true` components (23 rows); **CROSSWALK §3.7 is your ruling of 2026-09-01** saying
the grid runs on twelve layer rows with the 33 as drill-down, and it states it was ruled *ahead of* W7
for exactly that reason. Both cannot hold. I set `graded:` on all 33 — it is worth having either way —
and **did not touch the grid.** My read is that W7's line 17 and `AC-1` are stale, but a PRD is not
struck by an agent noticing a conflict. *Second-order:* §3.7 says it was executed by
`scripts/gen-grid-rows.mjs`, which does not exist, so the ruling's own record of its execution is
unreliable — read `grid.html` rather than trusting either document.

**W6's two grid columns — deferred, deliberately.** Adding HumanLayer and Deep Agents to
`04-harness-alignment.md` §2 is 66 coverage marks derived from prose that carries no mark. A third is
unambiguous; the middle band — *"the nearest published thing"*, *"routed to a separate paid product"*,
*"hooks **as** middleware"* — sits between `◐` and `○`, and the choice changes what the grid claims. A
wrong grid cell is this corpus's cardinal defect. **The good news: ISSUE-001's actual complaint is
largely discharged** — all 33 Tier-2 pages now carry a cited entry for each of these two harnesses, 66
entries with the vendor's words. What remains is a reading pass over pages that now exist.

**`adr-seeds/` — you ruled one way and the shape argues the other.** You chose *keep the 9 documents,
archive the 23 ADR drafts*. Done — and it leaves **eighteen live citations pointing into the archive**,
because five of the nine kept documents cite `ADR-006`…`ADR-024` inline. Legal, and recorded in the
ruling. The cleaner cut is archiving `kd-built-frameworks/` whole; it stays available.

---

## What landed, by step

**1 · The `W11` PRD.** Five commits already carried the tag against a workstream that had no PRD — a
defect in this repo's own convention, committed by the agent enforcing it. Written after the fact and
recorded as such.

**2 · The `requires` graph left the spec.** Second application of the seam the CROSSWALK split set:
`06-relations.md` §3 → `components/RELATIONS.md`, headings verbatim.

**3 · W5 closed.** `graded:` on all 33 (23 graded, 10 catalogued, four disagree with the PRD's
hypothesis and say why on the page), `requires:` from the 13 cited edges only, and the deletion test
`3c` was owed — the seeded graph confirms it has one outbound edge and zero inbound, the weakest node
in the set. **AC-1's 100-line cap is recorded as breached, not widened:** pages run 84–112 because
each carries the corpus table the same PRD asks for.

**4 · The archival by ruling.** `spec/`, `craft/`, the ADR drafts and the two superseded profile
drafts. `rulings/2026-09-08-archival.md`. All 33 Tier-2 nav banners re-pointed first, so no component
page opens into the archive. The re-heading rule the precedent could not settle is now ruled: *a
whole-directory archival re-heads by index and frontmatter, and banners only the files carrying
inbound citations from live material.*

**5 · Both gates green.** 45 private hyperlinks converted to backticked provenance; three genuinely
rotted public links de-linked; **ISSUE-004 closed and re-sourced** — the disproven *Factory Worker
Protocol* stood in six `comparisons/` files while `README.md` bragged about disproving it, and every
citation now names Gas City's actual mechanism, the `provider` field. ISSUE-003, ISSUE-009, ISSUE-010
closed.

**7 · W10's two skills.** `harness-deep-read` and `wiki-nav`, both open decisions taken on the PRD's
standing recommendations and marked as taken. `content/claude-code/00-README.md` re-headed off its
pre-spin-out *"LoomWarp-oriented reading"* framing, which was a rule-9 violation in the one folder the
corpus holds up as the model.

**9 · Publish-state drafts.** `CONTRIBUTING.md`, the README "Start here" strip, the licensing
recommendation.

---

## Four things I got wrong, and caught

**GAP-09 was a phantom.** I flagged `content/claude-code.md` as breaching its budget at 726/700 with
§6 at 275/220. **ISSUE-013 had already ruled those caps obsolete** — ≤760 and ≤275 — and all ten
profiles are inside them. What was actually wrong: the ruling never reached
`skills/harness-teardown/SKILL.md`, which still taught 220/700, so the next teardown would have been
built to numbers retired the day before. Fixed.

**I created a citation that resolved and lied.** Re-pointing 32 LoomWarp citations to
`content/loomwarp.md#<anchor>` left trailing `§*Architecture*` references naming headings that exist
only in the *superseded* short profile. Caught before commit; the anchor already names the exact
detail, so the stale suffix is gone.

**I broke thirteen links and the gate stayed green.** A substitution dropped the closing paren on
every citation in `RELATIONS.md`. `[text](target` is not a link the checker can see — no target to
resolve, nothing to report, PASS. **Logged as ISSUE-021**, because the fix is cheap and the decision
of whether a new check earns its place against *markdown is not code* is yours.

**I wrote a forward reference into `CLAUDE.md` that was false for four commits** — a path under
`archive/spec/` that did not exist until step 4. It is prose, so the checker never saw it. It resolved
itself when the archival landed, which is luck rather than method.

---

## Not done, and why

- **`wiki-nav` has never been run.** Its first run touches ~100 files and its acceptance criterion is
  a clean second run — that is a reviewable act, not an unattended one.
- **`harness-deep-read` has never been exercised.** It was written from one example, which makes it a
  hypothesis about a genre until the next commissioned read tests it.
- **W7's grid re-point** — blocked on ISSUE-022 above.
- **W8c, the diagram pass** — nine profiles still say *"pending the diagram pass"*, and
  `assets/projects/` covers 5 of 10 harnesses. Untouched; it needs source reads.
- **QM's teardown** — still the front of the W4 queue, still unmeasured, and axis I's `+3` anchor
  still rests on it.
