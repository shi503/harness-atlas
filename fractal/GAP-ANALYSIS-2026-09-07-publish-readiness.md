---
title: "Gap analysis — publish readiness at the Template-v2 milestone"
tier: fractal
status: DRAFT
provenance: DERIVED
created: "2026-09-07"
owner: KD
---

# Gap Analysis — publish readiness at the Template-v2 milestone

**Status:** in progress — awaiting KD's ratification of §2 · **Created:** 2026-09-07
**Scope:** can this corpus be made public as it stands, and what must land first
**Predecessor:** none. `archive/v0/10-context-gap-analysis.md` is pre-spinout and unrelated — this
opens a fresh ID space at `GAP-01`.
**Binding:** no `STRATEGIST-*.md` exists; FRACTAL runs un-routed here by design (`CLAUDE.md`
§Workstreams). The definition of done is substituted in §2 from two artifacts already in the repo.

---

## Executive finding

**The corpus is one commit and a visibility flip away from publishing 74 hyperlinks into a private
repository, and its own CI gate cannot see them.**

`scripts/check-doc-links.mjs` validates *local* markdown links only. It reports **PASS on 1,690 links
and 757 anchors** while 74 markdown hyperlinks point at
`https://github.com/shi503/loomwarp-team-system`, which `gh api` confirms is **private**. To a public
reader every one is a 404. The gate is green and the corpus is not shippable, which is the precise
failure the standing rule *"the whole bar is: links resolve"* was written to prevent.

The second finding is structural: **Tier 2 does not exist.** `CLAUDE.md:13` declares
`components/<id>-<name>.md`, one page per component; `git ls-files components` returns zero. But the
material is closer to done than the W5 PRD believes — see `GAP-02`.

- **Gaps:** 13 total — **5 at P0**, 5 at P1, 3 at P2
- **Blocking dependencies:** `GAP-03` (checker) gates verification of `GAP-01`. `GAP-04` gates
  `GAP-02`. `GAP-02` gates W7.
- **The governing constraint:** whether the **un-recut estate** (`spec/` · `comparisons/` · `craft/` ·
  `archive/`) ships with the corpus. **68 of the 74 dead links live there**, and `index.md` opens
  eight doors into it. Hold it back and publish is days away; ship it and publish is weeks away.

---

## 1. What was audited, and what was not

Ratified by KD, 2026-09-07.

| | |
|---|---|
| **In scope** | `README.md` · `index.md` · `components/` · `content/*.md` (ten profiles) · `spectrums/` · the cross-cutting contracts · the instrument (`skills/`, `scripts/`) |
| **In scope, narrowly** | The un-recut estate — **for reachability and bleed only**, not content quality. A public reader can reach it, so its links and its LoomWarp-specific content are publish facts |
| **Out of scope** | Content quality of `spec/` · `comparisons/` · `craft/` · `archive/`; **correctness of the ten profiles' findings** about their vendors; `maturity/` and `grid.html` (blocked behind W5 regardless) |

**Prior-work boundary.** `shi503/loomwarp-team-system` is private. It is cited here by *visibility,
count and link-shape only* — never by content. `content/loomwarp.md` already handles this correctly:
every reference is a backticked provenance string marked `(private)`, not a hyperlink. That is the
pattern the other 74 should follow.

---

## 2. Definition of done — the outline KD asked for

No Strategist exists. These two artifacts, both already in the repo and neither authored by this
analysis, are the substitute. **Ratify or amend before the gap inventory is worked.**

### 2.1 Intent — `README.md:12`, KD verbatim, 2026-09-03

> *…each individual page has a harness with its system design, declared primitives/components, and a
> consolidated guide … allows viewers to digest a harness in a meaningful way from just visiting the
> GitHub page.*

**The operative clause is "from just visiting the GitHub page."** It makes second-person readiness the
gate, not demo readiness: the test is a stranger on github.com with no clone, no context and no help.

### 2.2 The gate — four conditions, each machine-checkable

| # | Condition | Check | Today |
|---|---|---|---|
| **G1** | Every link a public reader can click resolves **publicly** | `check-doc-links.mjs` extended to external HEAD checks (`GAP-03`) | ❌ 74 dead |
| **G2** | Every tier `CLAUDE.md` declares exists, or `CLAUDE.md` stops declaring it | `git ls-files components \| wc -l` vs the declared 33 | ❌ 0 of 33 |
| **G3** | Every profile is comparable cell-for-cell | 33 `####`, coverage triple sums to 33, budgets held | ✅ 10/10 uniform · ❌ 1 over budget |
| **G4** | The repo is legally and mechanically publishable | `LICENSE` exists · repo public · branch merged | ❌ all three |

### 2.3 The three ship tiers — what "publish" means

**Recommended: publish T1, hold T2, keep T3 private.** It satisfies G1–G4 in days rather than weeks,
and it breaks no promise, because a promise not made cannot break.

| Tier | Contents | Rule |
|---|---|---|
| **T1 · ships** | `README.md` · `index.md` · `content/*.md` ×10 · `content/claude-code/` · `spectrums/` · `vocabulary.md` · `RULINGS.md` · `CLAUDE.md` · `assets/` | Must be clean of private links and of un-recut doors |
| **T2 · ships when built** | `components/` ×33 · `maturity/` | Declared as forthcoming, or not declared |
| **T3 · does not ship yet** | `spec/` · `comparisons/` · `craft/` · `archive/` · `fractal/` | Where 68 of 74 dead links and 100% of the LoomWarp bleed live. Recut or hold |

---

## 3. The matrix — 8 units × 4 lenses

**L1 external** — what an AI engineer comparing this against a *Claude Code teardown* post or
`12-factor-agents` expects. **L2 parity** — against the best thing this repo has already produced
(`content/claude-code/`, twelve documents). **L3 conformance** — against `CLAUDE.md`'s three-tier
table and seven standing rules. **L4 readiness** — a stranger, on github.com, no clone.

| Unit | L1 External | L2 Parity | L3 Conformance | L4 Readiness |
|---|---|---|---|---|
| **U1 · `README.md`** | ✅ strong | ✅ | ⚠️ diagrams a tier that is empty | ✅ zero private links, zero T3 doors |
| **U2 · `index.md`** | ✅ | ✅ | ⚠️ links an empty `components/` | ❌ eight doors into T3 |
| **U3 · `components/`** | ❌ absent | ❌ | ❌ declared, not built | ❌ |
| **U4 · `content/*.md` ×10** | ✅ strongest unit | ✅ | ✅ 10/10 uniform | ⚠️ 1 over budget · 9 pending diagrams |
| **U5 · `spectrums/`** | ✅ novel | ✅ | ⚠️ R11 banners | ⚠️ reads as internal |
| **U6 · contracts** | — | — | ❌ declares a tier that does not exist | ⚠️ |
| **U7 · un-recut estate** | ❌ | ❌ | ❌ 33/33 breach the peer rule | ❌ 68 dead links |
| **U8 · instrument** | ✅ skill is good | ✅ | ⚠️ | ❌ gate cannot see the blocker |

**Minimum governs.** `U3` and `U7` are the corpus's grade. Raising `U4` — already the strongest unit —
is measurable and worthless.

---

## 4. Claims register

Every capability assertion in a shipped document, checked against the artifact.

| # | Claim (`file:line`) | Reality | Verdict |
|---|---|---|---|
| 1 | `CLAUDE.md:13` — Tier 2 is `components/<id>-<name>.md`, one page per component | `git ls-files components` → **0**; dir created 2026-09-02, never filled | **FALSE** |
| 2 | `CLAUDE.md:36` — *"The whole bar is: links resolve"* | Checker is local-only; 74 external hyperlinks unvalidated, all into a private repo | **OVERSTATED** |
| 3 | `index.md:100` — *"empty until W5"* | Accurate, and the only place the corpus admits it | **TRUE** |
| 4 | `README.md:3` — *"Every profile is built the same way"* | 10/10: 33 `####`, 37 `<details>`, coverage sums to 33 | **TRUE** |
| 5 | `spec/v1-framework/content/*.md` ×33 — `img:` frontmatter | `spec/v1-framework/img/` holds **1** file, an SVG. 33 PNGs absent | **FALSE** |
| 6 | `W5-component-pages.md:11` — *"trimmed from the 150-line spec entries"* | Sources are **74–97 lines, mean ~82**. `CLAUDE.md`'s Tier-2 target is *~80 lines* | **FALSE** |
| 7 | `comparisons/02-component-matrix.md:53`, `04-harness-alignment.md:124` — *"eighteen concept rows"* | Grid has **19** | **FALSE** |
| 8 | `CLAUDE.md:5` — *"LoomWarp is one peer column here … with no special status"* | **33 of 33** component sources carry an `**ours**` self-assessment row | **FALSE** |
| 9 | `spec/v1-framework/00-consolidated-guide-and-mental-model.md` — claims a generator | Logged 2026-09-07 as ISSUE-009; still standing | **FALSE** |
| 10 | `content/claude-code/00-README.md` — *"13 documents"* | Holds **12**. Logged as ISSUE-010 | **FALSE** |

**Six FALSE claims. Each is a gap below.**

---

## 5. Gap inventory

**Priority** — P0 blocks publish · P1 required for credibility · P2 next version
**Effort** — XS <1h · S <½d · M 1–2d · L 3–5d · XL >1w

| ID | Unit | Gap | P | Effort | Blocks |
|---|---|---|---|---|---|
| `GAP-01` | U7 | 74 hyperlinks into a private repo | **P0** | M | publish |
| `GAP-02` | U3 | Tier 2 declared, zero built | **P0** | M | W7, publish |
| `GAP-03` | U8 | Gate cannot see external links | **P0** | S | verifying `GAP-01` |
| `GAP-04` | U7 | 33/33 sources carry an `**ours**` row + `project: loomwarp` | **P0** | S | `GAP-02` |
| `GAP-05` | U6 | No `LICENSE`; repo private; 29 commits unmerged | **P0** | XS | publish |
| `GAP-06` | U3 | 33/33 sources cite the superseded corpus, 0/33 the recut one | P1 | S | `GAP-02` |
| `GAP-07` | U7 | 33 dead `img:` references | P1 | XS | — |
| `GAP-08` | U7 | Disproven "Factory Worker Protocol" still load-bearing | P1 | S | — |
| `GAP-09` | U4 | `claude-code.md` breaches both budgets | P1 | S | — |
| `GAP-10` | U4 | 9 of 10 profiles pending the diagram pass; W8c has no PRD | P1 | M | — |
| `GAP-11` | U2 | `index.md` opens 8 doors into T3 | P1 | XS | publish |
| `GAP-12` | U6 | Stale counts: "eighteen concept rows" ×2, "13 documents" | P2 | XS | — |
| `GAP-13` | U6 | W8b has no HANDOFF; 6 PRDs name terminal artifacts that do not exist | P2 | S | — |

---

### GAP-01: 74 hyperlinks resolve only for KD

**What's missing:** A public reader clicking any of 74 links gets GitHub's 404. They are not broken
paths — they are correct paths into `shi503/loomwarp-team-system`, which `gh api` reports
`private | true`.

**Evidence:**
```
grep -rn '](https://github.com/shi503/loomwarp-team-system' --include="*.md" . | wc -l   # 74
gh api repos/shi503/loomwarp-team-system --jq .visibility                                # private
```
Distribution: `spec/` 36 · `comparisons/` 24 · `archive/` 8 · `craft/` 5 · `content/` 1
(`content/claude-code/00-README.md:75`).

**Approach:** Convert each to the pattern `content/loomwarp.md` already uses — a backticked
provenance string marked `(private)`, no hyperlink. `content/loomwarp.md` is the worked example: it
cites the same repo eight times and creates zero dead links. **Only the `content/` one is in T1**, so
holding T3 back reduces this from 74 to 1.

**What NOT to do:** Do not make the LoomWarp repo public to fix the links. That inverts the
dependency — the atlas would then require a second repo's visibility to stay readable.

---

### GAP-02: Tier 2 is declared in three places and built in none

**What's missing:** 33 pages at `components/<id>-<name>.md`. `CLAUDE.md:13` declares them,
`README.md:128` diagrams them, `index.md:100` links the empty directory.

**Evidence:** `git ls-files components | wc -l` → `0`.

**Approach — and this is the finding that changes the estimate.** The W5 PRD says the pages must be
*"rebuilt from a template rather than trimmed from the 150-line spec entries."* **The sources are not
150 lines.** All 33 exist at `spec/v1-framework/content/component-NN-*.md`, **74–97 lines, mean ~82** —
against `CLAUDE.md`'s Tier-2 target of *~80 lines*. They already carry what the target asks for: one
idea, a peer-implementation table with citations, a horizon line.

So W5 is **not a rewrite. It is a four-step mechanical transform**, and it can fan out:

1. Rename `component-NN-<name>.md` → `<id>-<name>.md` per `CROSSWALK.md` §0's ID table
2. Strip `project: loomwarp` / `owner` / `wave` / `extends` frontmatter (`GAP-04`)
3. Delete the `**ours**` row; LoomWarp re-enters as an ordinary peer row (`GAP-04`)
4. Re-point every peer citation from `comparisons/systems/<x>.md` to `content/<x>.md#<id>-<slug>`
   (`GAP-06`)

**Effort M, not L.** That is the single largest correction this analysis makes to the standing plan.

**What NOT to do:** Do not author 33 pages from scratch. The prose is already good, cited, and
argued; the defect is metadata and citation targets, not content.

---

### GAP-03: the gate is green on the defect that blocks publishing

**What's missing:** External-link validation. `scripts/check-doc-links.mjs` resolves local paths and
GitHub heading anchors; it never issues a network request.

**Evidence:** `node scripts/check-doc-links.mjs` → `PASS — every local markdown link resolves`
(1,690 links, 757 anchors), with `GAP-01` fully present.

**Approach:** Add an opt-in `--external` pass: collect `https://` hrefs, `HEAD` each, cache by URL,
fail on 404/403. Keep it opt-in so the default stays offline and fast.

**What NOT to do:** Do not add a vocabulary or count checker alongside it. `CLAUDE.md`'s
*"markdown is not code"* rule is deliberate. This is the one exception, and it earns it by catching a
defect that is invisible to a human reader and fatal to a public one.

---

### GAP-04: the peer rule is violated at the source of Tier 2

**What's missing:** `CLAUDE.md:5` states LoomWarp is *"one peer column here, scored by the same rules,
with no special status."* All 33 component sources end their peer table with a row labelled
`**ours**` — a first-person self-assessment no other harness gets — and 29 of them link it into the
private repo. All 33 carry `project: loomwarp` frontmatter.

**Evidence:**
```
cd spec/v1-framework/content
grep -l '\*\*ours\*\*' *.md | wc -l        # 33
grep -l '^project: loomwarp' *.md | wc -l  # 33
```

**Approach:** Mechanical, one pass. `**ours**` → `**LoomWarp**`, cited to
`content/loomwarp.md#<id>-<slug>` like every other peer. Strip the project frontmatter. Do this
**before** `GAP-02` copies the files, or it is done 33 times twice.

**What NOT to do:** Do not delete the row. Its content is a real scored finding; only its framing and
its citation target are wrong.

---

### GAP-05: the repo cannot legally or mechanically be published

**What's missing:** `LICENSE` absent · `CONTRIBUTING` absent · `shi503/harness-atlas` is
`private | true` · 29 commits sit unmerged on `template-v2`.

**Evidence:** `ls LICENSE*` → no matches · `gh api repos/shi503/harness-atlas --jq .license` → `none`
· `git log --oneline main..HEAD | wc -l` → 29.

**Approach:** A license decision is KD's, not this analysis's. The corpus quotes vendor documentation
extensively under a stated citation discipline, which argues for a documentation license (CC-BY-4.0)
over a code license. Merge `template-v2` before flipping visibility, so the public history opens on
the recut, not on the pre-template corpus.

---

### GAP-06 through GAP-13 — summary

- **`GAP-06`** All 33 component sources cite `comparisons/systems/*.md` (the superseded short
  profiles); **none** cites `content/*.md`. Every Tier-2 cell would land a reader on the old corpus.
  Fold into `GAP-02` step 4.
- **`GAP-07`** 33 `img:` frontmatter refs; `spec/v1-framework/img/` holds one SVG. Drop the field or
  draw the images — do not leave a named mechanism that does not exist.
- **`GAP-08`** ISSUE-004: the disproven *Factory Worker Protocol* still supports the Amp and Gemini CLI
  rows in `90-short-profiles.md` and a design callout in `02-component-matrix.md`, plus the horizon
  line of `component-01-substrate.md`. `README.md:117` handles it correctly and is the model.
- **`GAP-09`** `content/claude-code.md` — 726 lines (cap 700), `## 6.` at line 275 (cap 220). The
  only profile out of budget; it was the sample, restructured before the caps moved.
- **`GAP-10`** Nine of ten profiles carry the literal string *"pending the diagram pass (W8c)"*;
  `assets/projects/` holds 5 of 10 harnesses. **W8c is referenced in six files and has no PRD.**
- **`GAP-11`** `index.md` links eight T3 files. Under the recommended ship tiering these become
  either dead or doors into unshipped material — re-point or annotate.
- **`GAP-12`** *"eighteen concept rows"* against a 19-row grid, twice; *"13 documents"* against 12.
- **`GAP-13`** W8b landed nine profiles across six commits with no `HANDOFF.md`; W1, W2, W5, W6, W7
  and W10 all name terminal artifacts that do not exist.

---

## 6. Sequence

**By blocking dependency, not by priority.**

| # | Do | Why here | Effort |
|---|---|---|---|
| 1 | `GAP-03` — teach the checker external links | Nothing downstream is verifiable until the gate can see the defect | S |
| 2 | `GAP-05` — license, merge `template-v2` | Independent of everything; unblocks the flip | XS |
| 3 | `GAP-04` + `GAP-07` — de-bleed the 33 sources in place | Must precede `GAP-02` or it is paid twice | S |
| 4 | **Ratify §2.3 ship tiering** | Decides whether `GAP-01` is a 74-link job or a 1-link job | — |
| 5 | `GAP-01` + `GAP-11` — private links, index doors | Now scoped by the decision at step 4 | XS–M |
| 6 | `GAP-02` + `GAP-06` — build Tier 2, fan out | Sources are now clean and re-pointable | M |
| 7 | `GAP-09`, `GAP-08`, `GAP-12` — budgets and stale claims | Independent polish | S |
| 8 | `GAP-10` — write the W8c PRD, run the diagram pass | Last; improves a unit already passing | M |

**Is the gate reachable in current scope?** **Yes — steps 1–5 are ~1.5 days and clear every P0 except
`GAP-02`.** If §2.3 is ratified as recommended (hold T3), the corpus is publishable at step 5 with
Tier 2 declared forthcoming. Step 6 raises it from *publishable* to *the thing the README describes*.

**Scope escalation:** `GAP-02` as re-estimated (M, mechanical) is a **reduction** of W5's declared
scope. That is a Strategist-level amendment to the W5 PRD, not an Architect decision — the PRD's
"rebuilt from a template, not trimmed" instruction was written against a factually wrong premise about
the source files and should be formally struck.

---

## 7. What this analysis does not cover

- **Whether the ten profiles are right about their vendors.** Structure, uniformity and budgets were
  checked; no vendor source was re-read. A profile can be perfectly shaped and wrong.
- **Content quality of `spec/` · `comparisons/` · `craft/` · `archive/`.** Audited for reachability
  and LoomWarp bleed only, per §1. `craft/` in particular was flagged by KD as off-topic for the
  framework and is **not** assessed here.
- **`maturity/` and `grid.html`.** Excluded by ratification; blocked behind `GAP-02` regardless.
- **Coverage breadth.** Ten harnesses with QM, Buzz and nine named systems untorn is recorded as a
  stated boundary, not scored as a gap.
- **Prose quality anywhere.** No unit was assessed for readability beyond structural conformance.
