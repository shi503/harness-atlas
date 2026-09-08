---
title: "Contributing — how a teardown gets made, and what would make yours mergeable"
tier: reference
status: DRAFT
provenance: AUTHORED
created: "2026-09-08"
owner: KD
---

# Contributing

**The useful contribution here is a teardown.** Not a typo fix — though those are welcome — but a
harness read from its own sources and written into the same shape as the ten already here, so it can
be compared to them cell for cell.

This page tells you how that is done and what would get it merged. It is short because the actual
instructions are in [`skills/harness-teardown/SKILL.md`](skills/harness-teardown/SKILL.md), which is
the template every profile in [`content/`](content/) was produced by.

---

## The four rules that decide whether a page is mergeable

Everything else is style. These are not.

**1 · Vendor's words only, in a primitives table.** Verbatim, cited, dated. If a harness calls the
thing a *Bead*, the table says **Bead** — not *"task object"*. The whole point of the vocabulary
ledger is that two systems doing the same thing under different names stay classifiable, and that
only works if nobody quietly translates.

**2 · Absence is recorded, never inferred.** Every `○` names the pages that were checked:
*"Nothing here — checked the README, the docs index, settings and examples."* Never *"appears to
lack"*, never a silent blank. **An absence you did not look for is not a finding.**

**3 · Primary sources first.** The repository, the official documentation, the changelog, the API. A
blog post about a harness is a secondary source and is marked `↪`. Something you could not verify is
marked `⚠️` and says so — the profile has a section for exactly that, and filling it honestly is
worth more than a clean-looking page.

**4 · A profile describes its harness and nothing else.** No comparison to another harness, no
placement in the corpus, no explanation of why the file exists. **The grids compare.** A profile that
argues about its neighbours cannot be read on its own, which is the one thing it has to be.

---

## What a teardown actually costs

Roughly a day, most of it reading. The shape is fixed — a thirty-second card, the vendor's system map
and workflows redrawn, a 33-row coverage matrix, the primitive set counted, then details, limits,
sources and unverified items collapsed beneath.

**The 33 rows are not negotiable, and you do not need to look them up** — they are inline in the
skill. If you find something no row carries, that is a finding, not a licence to add a row: record it
as a candidate in [`components/CROSSWALK.md`](components/CROSSWALK.md) §3.13. **A teardown never
admits a component; a ruling does**, because a 34th component costs 24 edits across the corpus.

---

## The one automated check

```bash
node scripts/check-doc-links.mjs              # local links and heading anchors
node scripts/check-doc-links.mjs --external   # every external link, for a reader who is not you
```

**That is the entire gate**, and it is deliberate: *markdown is not code* — no count checks, no
vocabulary linting, no generator contracts. Links resolve and git is clean. The `--external` pass
exists because on 2026-09-07 the local check passed while 74 links pointed into a private repository,
green gate and unpublishable corpus.

---

## Disagreeing with something already here

**Open an issue rather than editing the claim.** This corpus changes a rule, an id or a name by
**writing a ruling** — see [`RULINGS.md`](RULINGS.md) — and it retires a vocabulary by publishing a
crosswalk and re-heading the loser, never by deleting it. A correction that leaves no trace of what it
corrected makes the next reader re-derive the argument.

If you have found something wrong, the most valuable form is: **the claim, the file and line, the
primary source that contradicts it, and the date you checked.** That is a ruling waiting to be
written.

## Not currently accepted

- New components. See above — that is a ruling.
- Changes to `archive/`. It is history; it is corrected by a note, not an edit.
- Marketing copy for a harness, including your own. This is a teardown corpus, and a page that reads
  like a landing page fails rule 4 on the first paragraph.
