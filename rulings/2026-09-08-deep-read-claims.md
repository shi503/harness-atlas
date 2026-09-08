---
title: "RULING 2026-09-08 — a deep read is commissioned by depth, not by eligibility; it carries the vendor's claims, and its guide maps them without grading"
status: PERMANENT
owner: KD
created: "2026-09-08"
provenance: AUTHORED
---

# Ruling — the deep read's gate, its claims, and the limit on its test

Three decisions, taken together because they are one revision of one skill. KD, 2026-09-08, reviewing
why nine harnesses have no deep read: *"it is not clear whether or not these are fully ready to run
all the subsets."*

## 1. The highlighted gate is retired

**What it said.** `harness-deep-read` opened: *"Only for a highlighted harness … The list of
highlighted harnesses is maintained by KD; if you were not told this harness is on it, stop and ask."*
The rule came from W10's open decision 1, ruled on the PRD's standing recommendation.

**Why it is struck.** The list was never written. A gate pointing at a file that does not exist stops
every run, which is why the skill was never exercised once in the month it existed — recorded in
`W10-deep-read-and-wiki-nav-HANDOFF.md` and again in the W11 evening report. The gate also asked the
wrong question: *may I* varies rarely, and by the time it was tested the answer was "all ten". What
actually varies is *how much*, and by a factor of ten between the smallest harness in the corpus and
the largest.

**What replaces it.** **No eligibility gate.** Any harness with a profile may have a deep read. The
skill's step one is now a depth agreed with the commissioner, through `AskUserQuestion`, at one of
three settings — **Index** (`00` + `20` only), **Standard**, **Exhaustive**. KD: *"the skill can be
run as deep as the user wants, just confirm with askuserquestion how deep and how much they want to
go."*

**A consequence worth naming.** The skill's `allowed-tools` did not include `AskUserQuestion`, so it
could not have negotiated anything even had it been asked to. Added in the same revision.

## 2. A deep read carries the vendor's claims

`00-README.md` now carries a block of what the vendor says the harness is **for** — verbatim, each
with source URL and capture date, from the landing page, the repo README pitch, the docs
introduction, and the launch post. `20-consolidated-guide.md` closes by walking those claims against
the mechanisms the set documented, one row per claim.

**The source hierarchy inverts here, and only here.** The skill ranks primary sources for *mechanism*:
repository, official docs, changelog, with blog posts secondary. For a claim of **intent** that is
backwards — the vendor is the only authority on what it says its own product is for, so its marketing
copy is the primary source for that claim and is marked as a claim, never as a finding.

**This is continuous with R11, not new.** Ruling `2026-09-07-drafted-until-verified` — [`spectrums/01-scorecard.md` §1 R11](../spectrums/01-scorecard.md#r11--drafted-until-verified) — already admits
*"the developer's own explanations, the documentation, the release notes, the README and the marketing
copy"* as derivation sources, and already states why they need a disclaimer: *"A harness that calls
itself enterprise-ready is evidence about its intent, not about its tenancy model."*

## 3. The claim test records; it does not grade

**The limit, and it is the operative sentence of this ruling.** The consolidated guide maps each claim
to the document carrying the mechanism behind it. Where no mechanism was found, that is written as a
**recorded absence naming what was checked** — the corpus's standing *absence is recorded, never
inferred*. **It never issues a verdict.** No "overstated", no "fails to deliver", no "marketing only",
no score, no coverage mark.

**Why the limit exists.** Checking a vendor's claim against its own documented mechanisms is not
comparison — rule 9 is intact, no second harness is named — but it *is* evaluation, and this corpus
grades in exactly one place: `spectrums/`, on seven declared dimensions of which one is admitted as
graded. A second grading instrument growing quietly inside a reference folder would be a rubric nobody
ruled on, applied by whoever happened to write that guide.

**What is preserved by the limit.** A claim with no mechanism behind it is already legible as one —
the row says the claim, and the row says nothing was found. The reader draws the conclusion. Writing
the conclusion for them adds no information and costs the corpus its one grading boundary.

**Recorded as KD's decision, with the objection stated.** This option was offered as *"the highest
value, but it is grading — the corpus reserves that for the profile and the scorecard, so it would
need a ruling to admit."* KD took it. This ruling is that admission, and §3 is the condition it is
admitted under. A person may widen it here, in one place.

## What changed

| File | Change |
|---|---|
| [`skills/harness-deep-read/SKILL.md`](../skills/harness-deep-read/SKILL.md) | Gate replaced by §2's depth negotiation; `AskUserQuestion` added to `allowed-tools`; §4 claims and the test; §7's source hierarchy inverted for intent |
| `fractal/workstreams/W10-deep-read-and-wiki-nav.md` | Open decision 1 is superseded — its answer was "a standing list", and the list is retired rather than written |

Two further changes in the same revision are ruled elsewhere: the shape rule (*navigation fixed,
content free*) and the deletion of the line budget are skill craft, not corpus rules, and are recorded
in the skill itself. The authorship block is
[`rulings/2026-09-08-authorship-provenance.md`](./2026-09-08-authorship-provenance.md).
