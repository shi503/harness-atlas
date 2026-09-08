# Intake: how a new thing is discovered, researched, and admitted

When a teardown, a scoring pass, or a read turns up something the atlas has no row for, this file says
**what kind of thing it is** and **where it gets recorded**. It exists because the repo had four
admission tests scattered across four files, no trigger to fire any of them, and one hard prohibition
(`skills/harness-teardown/SKILL.md` — *"Do not add a 34th row or rename one"*) with no exit.

Named `intake`, not *routing*: `Routing` is component `3b` and also a workstream PRD header field.

**Two things this is not.** It is not a second ledger — the durable record of a candidate lives in the
source of truth that will eventually own it, in that file's own idiom, so `vocabulary.md` does not
acquire a rival. And it is not a gate: NOTICED costs one line and no research, which is the whole
point. A trigger nobody can afford to pull is not a trigger.

## 1. Triggers — what you saw, and what it actually is

Most discoveries are **vocabulary rows**, not new components. Start here.

| What happened | What it is | Route |
|---|---|---|
| A teardown hits a vendor-named, load-bearing object that fits no component row | **Almost always a vocabulary row.** A component only if it passes the two-peers test in §3 | `vocabulary.md` §1.6 |
| One word appears in two profiles with two referents | A **COLLISION** row. Never a candidate anything | `vocabulary.md` §1.1 |
| Two systems use different words for one referent | A **SYNONYM** row | `vocabulary.md` §1.2 |
| A profile's §4 leans on an object its §5 never lists | An **UNDERCOUNT** — a defect in that profile, not a new thing | `vocabulary.md` §1.5 + `fractal/ISSUES.md` |
| A scorer cannot place a harness without opening a vendor source | An **R3 violation.** `spectrums/00-README.md` §6 already calls this *"a component request in disguise"* | rejected axis change **and** a candidate component |
| The same `gap:` recurs on one axis across three harnesses | The profile template is not capturing something the instrument needs | candidate component, or a skill revision |
| Two harnesses score identical fingerprints but are obviously different choices | A candidate **axis** or **dimension** | `spectrums/00-README.md` §4 or `01-scorecard.md` §5 |
| A vendor names a unit its own docs treat as first-class, and the profile's §5 does not carry it | A **primitive** — the vendor's list, not ours | that profile's §5 candidates table |
| The FRACTAL process itself misbehaved | A **defect**, not a candidate | `fractal/ISSUES.md` |
| A decision changed a rule, an id, or a name | A **ruling** | write it, then index it in `rulings/00-README.md` |

## 2. The five states

Generalized from `spectrums/00-README.md` §4, which wrote this ceremony for axes. Nothing here is new
machinery; it is that ceremony applied to everything else.

1. **NOTICED** — append one line to the candidates table of the source of truth in §3, dated, saying
   what you saw and where. **No research required. No permission required.** This is the step the repo
   was missing, and its cheapness is the design.
2. **RESEARCHED** — open a wayfinding ticket at `fractal/wayfinding/<effort>/issues/NN-<slug>.md` with
   `Type: research`, per `issue-tracker.md` §"Wayfinding operations". Claim it, answer it under an
   `## Answer` heading, resolve it, and append the pointer to that effort's `map.md`.
3. **PROBATION** — recorded in its SoT's candidates table with its admission test named, and **used
   but excluded from the headline**. A probation component is described in profiles as a `◐`-with-note
   or a detail-row line and **never given a matrix row**. A probation axis or dimension is scored and
   excluded from the fingerprint.
4. **ADMITTED** — by ruling, with the full sync cost in §3 paid **in one commit**. A partial sync is
   worse than no sync: it puts two counts in the corpus and the repo has been there.
5. **REJECTED or RETIRED** — recorded and dated, **never deleted** (`CLAUDE.md` — *archive by ruling*).
   **Ids are never reused.** A rejection that is not written down gets re-argued in six months.

**Why wayfinding for the middle step, and not for the record.** `issue-tracker.md` §"Wayfinding
operations" already specifies exactly the right research mechanics and has never been used; inventing
a parallel mechanism would repeat the mistake that file was written to prevent. But wayfinding is
explicitly disposable — *"they stop being the source of truth once the PRD lands"* — and a candidate
register must outlive its research. So: research in wayfinding, record in the SoT.

## 3. The routing table

Sync costs are **counted, not estimated**. Read the cost before proposing the thing.

| Kind | Admission test | Source of truth | Candidates recorded in | Sync cost | Ruler |
|---|---|---|---|:-:|---|
| **Component** (a 34th row) | **Two peers shipping it as a named primitive** — `components/ALIGNMENT.md` §1's own evidence rule for its `emerging`/`claimed`/`bet` markers. Reused, not invented | `skills/harness-teardown/SKILL.md` §4 checklist — it owns the anchor slugs | `components/CROSSWALK.md` §3.13 | **24** | KD |
| **Axis** (an 11th) | R1–R7, all seven | `spectrums/00-README.md` §3 | `spectrums/00-README.md` §4 | 3 + one per scored harness | KD |
| **DX dimension** (an 8th) | R1–R3, R6, and R8–R10 | `spectrums/01-scorecard.md` §4 | `spectrums/01-scorecard.md` §5 | 3 + one per scored harness | KD |
| **Job** (a `J18`) | `comparisons/03-jtbd.md` §1's convergence line, measured on both axes | `comparisons/03-jtbd.md` §2 | `comparisons/03-jtbd.md` §6 | **5** | KD |
| **Factor** (a `XV`) | `comparisons/2026-08-research/05-harness-factors.md` §4's count argument | that file, §1 | that file, §5 | **3**, one file | KD |
| **Vocabulary term** | Two systems one referent (SYNONYM), or one word two referents (COLLISION) | `vocabulary.md` §1.1–§1.5 | `vocabulary.md` §1.6 | **1 file, 2 places** — the right §1.x table and the §2 index | feature-lead; KD for a retirement |
| **Primitive** | **Not repo-owned.** The vendor's own list, per the teardown skill's rule 4 | that harness's profile §5 | that profile's `candidates` table, which rule 4 already specifies | **5** | feature-lead |
| **Defect** | It is a bug in the process, not the product | `fractal/ISSUES.md` | n/a — append-only, no candidate state | **1** | anyone |
| **Ruling** | It changes a rule, an id, or a name | the ruling's own text, in one of three legitimate homes | n/a | **2** — the text and one `rulings/00-README.md` row | KD |

### The 24 places a component touches

Ten full enumerations, twelve profile matrices, and two generated-looking artifacts that are not:

`components/00-README.md` (the roster) · `archive/spec/v1-framework/00-README.md` (owns `horizon`) ·
`00-consolidated-guide-and-mental-model.md` §4 · `skills/harness-teardown/SKILL.md` §4 (owns the anchor
slugs) · `index.md`'s layer-stack mermaid · `assets/templates/layer-stack.mmd` (declares itself canonical) ·
`maturity/grid.html` `sub:` fields (**hand-maintained** — its generator did not survive the spin-out,
see ISSUE-009) · `components/ALIGNMENT.md` §2 · `components/RELATIONS.md` §2
(owns the `performs` edges) · one new `components/<id>-<name>.md` · **and the
`## 4. Component matrix` of all twelve profiles under `content/`.**

**This number is the argument for probation.** A candidate that never gets a matrix row costs nothing
until it graduates. Twenty-four edits is what *admission* costs, and it is why admission is a ruling.

## 4. Why a candidates table, and not a status column

`vocabulary.md` holds 57 rows across **five different table schemas** (§1.1–§1.5). Adding a `status`
column costs five schema edits plus 57 row edits, and leaves every admitted row carrying a field that
reads `admitted` forever. A sixth table — §1.6 *Candidates* — costs one edit and keeps the admitted
ledger clean, which is the property that makes it readable.

The same reasoning applies to `03-jtbd.md`, `05-harness-factors.md` and the two spectrum files: the
candidates live in a section of their own, not as a column on the thing they aspire to join.

## 5. What this is not allowed to become

Per `CLAUDE.md` — *markdown is not code*:

- **No script** validates a candidates table, counts its rows, or checks that a sync was complete.
- **No CI gate.** The bar is `node scripts/check-doc-links.mjs` and a clean tree, unchanged.
- **No required frontmatter.** A candidate is one line in a table.

The enforcement that does exist is structural: every SoT link in this file and every ruling target in
`rulings/00-README.md` is a markdown link with a heading anchor, and the link checker resolves anchors. A row
that points nowhere breaks the one check the repo has.
