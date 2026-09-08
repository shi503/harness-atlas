---
title: "RULING 2026-09-08 — R11's verification block extends from the scorecard to every authored analysis; the backfill is an attestation and says so"
status: PERMANENT
owner: KD
created: "2026-09-08"
provenance: AUTHORED
---

# Ruling — who ran an analysis, when, and on what model

KD, 2026-09-08: *"let's add some context to the frontmatter or a `> Note:` for when an analysis was
run, who it was run by, and what model was used to run it. for now we can default to opus models."*

## 1. The shape already existed — it was scoped to one folder

Ruling `2026-09-07-drafted-until-verified` (**R11**) gave `spectrums/positions/*.yaml` a
`verification:` block: `derived_from`, `grounded_against`, `drafted_by`, `drafted_on`, `verified`,
`verified_by`, `verified_on`, `note`. All ten position files carry it, all ten say
`drafted_by: "claude-opus-5"`, and `verified: false` renders a visible drafted banner on every profile
card.

**No new field is minted.** R11's block is **extended in scope** from the sheet to every authored
analysis in the corpus: profiles at `content/*.md`, deep-read folders at `content/<name>/`, and the
positions that already have it. A scope change to a ruled rule is a ruling, which is why this is a
file and not a quiet edit to `01-scorecard.md`.

**What extends with it.** The semantics, not just the fields. `verified: false` means *drafted*, a
human review pass is the only thing that flips it, and a missing block is **malformed, not verified**.
An analysis that says who drafted it but cannot be signed off is exactly the state R11 was built to
make visible.

## 2. Where it goes, and at what grain

| Where | Form |
|---|---|
| `content/*.md` — profiles | The full `verification:` block in frontmatter, plus the drafted banner already rendered in §1a |
| `content/<name>/00-README.md` | The full block in frontmatter |
| `content/<name>/NN-*.md` | A one-line note under the title: `> **Drafted <date> by \`<model>\`, not yet verified.**` |
| `spectrums/positions/*.yaml` | Unchanged — this is where the shape came from |

**Frontmatter and a visible line, both.** Frontmatter is queryable and survives editing; the visible
line is what a reader on GitHub actually sees, which is the whole reason R11 renders a banner rather
than trusting the YAML. A twelve-document folder does not need twelve nine-line blocks — the index
carries the block, the documents carry the line.

## 3. The backfill is an attestation, and the files say so

**What the record actually contains.** One handoff in this repo names a model:
`W0-alignment-HANDOFF.md` records *"Three sub-agents
(sonnet), in parallel, `--sanity` mode, 2026-09-03"* — the three `--sanity` drafts, now superseded and
under `archive/`. **Every other run recorded nothing.** For the ten live profiles and the twelve
Claude Code deep-read documents, the model was never captured.

**The ruling.** Those files are backfilled `drafted_by: "claude-opus-5"` on KD's attestation, and
every backfilled block carries in `note:` that **this is an attestation of 2026-09-08, not a value
captured at write time.** The archived `--sanity` drafts are excluded: the record says sonnet, and
they are history.

**Why the distinction is not pedantry.** R11's own text says *"Absence of verification is recorded,
never inferred"*, and the corpus's oldest standing rule says the same of every absence. A provenance
field that silently infers its own provenance defeats the only thing it exists to do — and the repo
already holds the counterexample that proves the inference would be wrong somewhere, because not
every run was opus.

**Going forward, `drafted_by` is captured.** The exact model id, written by the model that is running,
at the moment it writes. A guess is a defect.

## What changed

| File | Change |
|---|---|
| [`skills/harness-teardown/SKILL.md`](../skills/harness-teardown/SKILL.md) | Frontmatter spec gains the `verification:` block; budget raised 11 → 22 |
| [`skills/harness-deep-read/SKILL.md`](../skills/harness-deep-read/SKILL.md) | §6 gains the authorship block and the one-line per-document form |
| [`spectrums/01-scorecard.md`](../spectrums/01-scorecard.md#r11--drafted-until-verified) | R11 records that its block is no longer scoped to the sheet |
| `content/*.md` (10), `content/claude-code/**` (12) | Backfilled, marked as attested |
