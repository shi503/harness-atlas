# HANDOFF — FeatureLead-GasCity (W4 #2)

**Completed:** 2026-09-03
**Epic:** harness-atlas — the re-cut
**Workstream PRD:** `fractal/workstreams/W4-teardowns.md` (amended block, 2026-09-03), for harness
**Gas City** (Gas Town Hall, `gastownhall/gascity` @ `4071143` on `main`/`edge`; latest tagged release
`v1.4.1`, `6106663`, 2026-08-15).
**Procedure:** `skills/harness-teardown/SKILL.md`, full run (not `--sanity`) — building on the
`--sanity` draft at `content/gas-city-draft.md` (2026-09-03), every claim re-opened and re-marked
against the primary source read today, per the dispatch instructions. Read first, in full: `CLAUDE.md`,
`W4-teardowns.md`, the skill (all 33 rows inline), `W0-alignment-HANDOFF.md` §7 (the sanity findings —
primitive count six not seven, no "Factory Worker Protocol"), `W4-codex-HANDOFF.md` (prior run's skill
findings), and `content/codex.md` (the shape of a finished profile).

## Summary of Work Completed

1. **`content/gas-city.md`** — full Template-A profile. Frontmatter pinned to `gastownhall/gascity` @
   `4071143` (main/edge; latest tagged release `v1.4.1` / `6106663`), read date 2026-09-03. Opener
   (three paragraphs), legend, §A Identity (13-field table, three-question inclusion test answered
   per-layer per Rule 7, loop question recording **both** altitudes — gateway/host, with a nested
   install-into-a-loop mechanism for Skills and `gc hook` — primitive preview, structured-output line),
   a `## Diagram` section, §B (all 33 rows), §C (primitive table, count 6 + 5 supporting, verdict
   5–7 healthy), §D (nine grouped quote blocks), §E (primary/secondary sources, every `gh api` command
   run today), §F (nine non-empty bullets).
2. Every primary-source citation in the sanity draft was **re-opened today**, not carried forward
   unread: fresh `gh clone --depth 1` of `gascity`/`gastown`/`beads`/`wasteland`/`gascity-packs`,
   fresh `gh api` calls for identity/releases/tags/contributors/search, and direct reads of
   `trust-boundaries.md`, `dashboard.md`, `service-protocol-v0.md`, `nine-concepts.md`,
   `primitive-test.md`, `gastown-command-map.md`, `usage-facts-v0.md`, `understanding-formulas.md`,
   `capabilities-for-coding-agent-users.md`, `invariants.md`, `coming-from-gastown.md`,
   `mol-review-quorum.toml`, and `beads/README.md`. Repo HEAD had moved (`a6b72d8` this morning →
   `4071143` today, 32 commits on `main`); commit and release identity fields were updated to match.
3. **New finding beyond the sanity draft**: the "Primitive Test" as paraphrased by
   `engdocs/architecture/nine-concepts.md` ("Atomicity — can it be decomposed into existing
   primitives?") is **not verbatim and not the same test** as the canonical doc it cites,
   `engdocs/contributors/primitive-test.md` (whose actual "Atomicity" condition is about concurrency
   safety of a *capability* joining the SDK layer, not decomposability of a *primitive*). Recorded in
   §C and §F with both texts quoted; the six-primitive count itself is unaffected (stated directly in
   `how-gas-city-works.md`), but the "published admission gate for the primitive set" framing is
   narrower than the sanity draft credited it.
4. **`assets/projects/gas-city/six-primitives.mmd`** — refreshed comment header (pointer from
   `gas-city-draft.md` to `content/gas-city.md`, commit updated to `4071143`); diagram content
   unchanged, confirmed identical to the vendor's own `primitives.excalidraw`/`.svg` today.
5. **`comparisons/systems/90-short-profiles.md`** §1 — added a dedicated **Gas City** row (none
   existed; only indirect mentions inside the Amp and Gemini CLI rows referenced its now-disproven
   "FWP list" — left untouched, see Not Completed below), marked *Torn down 2026-09-03*, linking to
   `content/gas-city.md`.
6. **`comparisons/systems/gas-city.md`** — NOT deleted. Added a dated superseded notice at the top,
   set frontmatter `status: SUPERSEDED` and `superseded_by: content/gas-city.md`, naming both failed
   claims (seven-item primitive count; "Factory Worker Protocol").
7. **`comparisons/04-harness-alignment.md`** §2 — a Gas City column added to the 33-row table (header,
   separator, and all 33 rows), a dated addition note above the table explaining that several cells
   read as an *analogue* rather than a like-for-like instance because Gas City is not itself a runtime,
   and an updated "Column totals" line: **Gas City 13 / 14 / 6**. Every existing column
   (Hermes/Pi/OpenClaw/OpenCode/Grok/Codex) is byte-identical to before this run.
8. **`comparisons/02-component-matrix.md`** §1 — the *existing* Gas City column re-checked cell by
   cell against the new profile, per the PRD ("do not re-score the others"). Three wrong cells
   corrected, each with a dated note in the callout above the table: **Individual memory** `○→◐`
   (session logs + Beads' `bd remember`/`bd prime`), **Team memory** `○→◐` (shared Dolt-backed bead
   store + Mail), **Context assembly** `○→◐` (automatic per-turn context seeding from role + live
   work items/mail, per `docs/guides/capabilities-for-coding-agent-users.md`). Every other Gas City
   cell in the 18-row grid checked and left unchanged. The "primitive sets themselves" sub-table's
   Gas City row was also corrected (dropped "order" and "Event Stream," added Rig, fixed "bead" from
   "git-native work unit" to Dolt-backed). The §5 "Ratings marked as inferred" line for Gas City ·
   Individual memory was rewritten to describe the correction rather than the old absence claim.
9. **Deleted `content/gas-city-draft.md`** — superseded by `content/gas-city.md`.
10. **`node scripts/check-doc-links.mjs`** — **PASS** (178 files, 1441 links). Deleting the draft
    orphaned one existing link in `README.md`'s highlight-reel table (`[content/gas-city-draft.md]`);
    retargeted that single link to `content/gas-city.md` as a direct, unavoidable consequence of the
    authorized deletion — no other README content was reviewed or changed (Codex's W4 #1 run left
    README untouched entirely, and I followed that precedent everywhere except this one broken link).

## AC evidence (per `W4-teardowns.md`)

- **AC-1** (§A–F present, §F non-empty, every `○` names pages checked): met. Every absence row in §B
  names what was checked (e.g. row 5c: "checked `docs/guides/index.md`, `docs/reference/index.md`,
  and grepped the whole `docs/` tree for 'RAG,' 'embedding,' 'knowledge base,' and 'retriev*'"). §F
  carries nine bullets.
- **AC-2** (row in `90-short-profiles.md`, column in `04-harness-alignment.md` §2, column re-check in
  `02-component-matrix.md` §1, all in this HANDOFF): met — items 5, 7, 8 above.
- **AC-3** (§C counts and gives the verdict): met — **6 primitives, 5 supporting; verdict 5–7,
  healthy** — the strongest primitive-set evidence in the corpus, with a named SDK-admission
  framework and a documented deletion (`dd90ac0a`, "Agent Protocol" → `internal/session`).
- **AC-4** (structured-output line, one artifact not a list): met — **the Bead**, quoted from
  `engdocs/architecture/nine-concepts.md`: "Beads is the universal persistence substrate. All domain
  state flows through a single interface."

## Summary of Work Not Completed

- **The Amp and Gemini CLI rows in `90-short-profiles.md` §1 still cite Gas City's "FWP list"** as
  fact (lines 39–40 before this run), which this profile's §F disproves (zero `gh api search/code`
  hits for the name or "FWP" as a protocol). Not corrected — those rows are about Amp and Gemini CLI,
  not Gas City, and are outside this PRD's four listed downstream obligations. Flagged for the
  Architect; a one-line correction to each row is cheap once authorized.
- **`comparisons/02-component-matrix.md` §2's decision row** ("Gas City: beads or Linear for work
  tracking") and **§4's design-principle callout** ("Multi-model adversarial review... across Codex,
  Claude and Gemini in parallel") were **not** re-checked or corrected. The second is directly
  contradicted by this pass's primary-source read of `mol-review-quorum.toml`, the shipped core-pack
  formula, which is parameterized for **two** provider lanes plus a synthesis step, not a hardcoded
  three-way Codex/Claude/Gemini fan-out (§F). Both are outside "§1 as a process layer," the column the
  PRD authorized me to re-check; flagged rather than silently fixed or silently left wrong.
- **`index.md`** was not reviewed or updated (not in the write manifest; it already points generically
  at `comparisons/systems/` for process layers and was not broken by this run).
- The "Agent Protocol" deletion commit (`dd90ac0a`) was not independently re-verified against raw
  commit metadata this pass — the working clone is `--depth 1` with no history; the claim rests on
  `nine-concepts.md`'s own text (◐, not ✅ on the commit fact itself, though ✅ on the vendor's own
  documentation of it).
- `docs/reference/specs/identity-separator-contract-v1.md`, newly visible in `docs/docs.json`'s nav
  tree, was not opened this pass (§F).

All other acceptance criteria and manifest items: **met**.

## Technical Debt

None introduced in the repo. The two items above (Amp/Gemini FWP mentions; the Codex/Claude/Gemini
three-way review claim in `02-component-matrix.md` §4) are pre-existing inaccuracies this pass's
primary-source read surfaced but was not authorized to fix — recorded here and in the file itself
(§F) rather than silently corrected outside scope.

## Key Decisions

- **Built on the `--sanity` draft rather than re-researching from zero, but re-verified every claim
  against a fresh primary-source open today**, per the dispatch instruction ("do not carry a ⚠️
  forward unread"). Concretely: fresh `git clone --depth 1` of all five `gastownhall` repos today,
  fresh `gh api` calls (identity, releases, tags, contributors, two `search/code` queries), and direct
  re-reads of every file the draft's §D quotes and every file behind a ⚠️/◐ mark in its §F. The repo
  had moved 32 commits since the draft (`a6b72d8` → `4071143`); commit/release identity fields were
  updated accordingly, though no cited doc's *content* had changed.
- **The primitive-test discrepancy (§C) was disclosed rather than smoothed over.** `nine-concepts.md`'s
  paraphrase of the admission test and the canonical `primitive-test.md`'s actual three conditions
  answer different questions (primitive decomposability vs. SDK/consumer-layer capability placement).
  Per Rule 5 ("when two primary sources disagree, quote both"), I quoted `primitive-test.md` verbatim
  in §C rather than repeat the sanity draft's paraphrase, and named the discrepancy explicitly instead
  of treating the two documents as interchangeable. This does not change the six-primitive count
  (stated directly and independently in `how-gas-city-works.md`) or the 5–7/healthy verdict.
- **Component-matrix corrections limited to what the PRD authorized** ("re-check every cell of that
  existing column... correct only cells that are wrong... do not re-score the others"). I corrected
  three cells (Individual memory, Team memory, Context assembly) where my profile's §B directly
  contradicts the existing `○`, and the primitive-set sub-table row. I did not touch the decisions
  table (§2) or design-principles callout (§4) even where I found a contradiction (the three-way
  review-formula claim), since those are outside "§1" — reported instead, above.
- **The one `README.md` link retarget** (draft → real profile) was the minimal fix required to keep
  `check-doc-links.mjs` passing after the authorized deletion; no other README content was reviewed,
  matching the precedent Codex's W4 #1 run set (README left otherwise untouched — it still lacks a
  Codex row entirely).
- No new project guides were needed beyond the skill itself (a docs/teardown workstream matches the
  skill's own "Applies To" scope).

## New Dependencies Added

None.

## Verification Evidence

| Gate | Command | Result | Notes |
|------|---------|--------|-------|
| Doc-link check | `node scripts/check-doc-links.mjs` | **PASS** | 178 files scanned, 1441 links checked |
| Manifest scope | `git status --short` | **PASS** | `content/gas-city.md` (new), `content/gas-city-draft.md` (deleted), `assets/projects/gas-city/six-primitives.mmd`, the three named comparison files, `comparisons/systems/gas-city.md`, plus one necessary link retarget in `README.md` (see Key Decisions). No other harness profile, `spec/`, or `components/` touched |
| Quality pass | `git diff` review | **PASS** | No AI slop found: no dead scaffolding, no `console.log`-equivalent, no unnecessary defensive branches. Profile length matches the genre precedent set by `content/codex.md` and the sanity draft |
| Secrets scan | `grep -n 'password\|secret\|api_key\|token\|credential' <changed files> \| grep -iv 'test\|mock\|example\|type\|interface'` | **PASS, hits reviewed** | Hits are pre-existing rows (Codex/Hermes/OpenCode/Grok secrets cells, token-budget prose) and this profile's own documentation of Gas City's stated env-var-stripping list and token/cost accounting rows. No credential, key, or password value is present anywhere in the diff |
| Personal-data scan | `grep -n 'email\|ssn\|date_of_birth\|full_name' <changed files> \| grep -iv 'test\|mock\|type\|interface'` | **PASS** | Zero hits |
| Environment-value scan | `grep -n 'localhost:\|127\.0\.0\.1\|0\.0\.0\.0' <changed files> \| grep -iv 'test\|\.env\|config\.example'` | **PASS, one hit reviewed** | `content/gas-city.md`'s §D quotes the vendor's own docs verbatim ("defaults to loopback (`127.0.0.1`)"), describing Gas City's own dashboard bind default — not an environment leak in this repo's own configuration |
| CI gate (this repo) | N/A — docs-only workstream | **N/A** | Per `CLAUDE.md` and the skill: "Markdown is not code... The whole bar is: links resolve... and git is clean." No `npm run build`/`tsc`/`lint`/`test` gate applies to this repo |

## Skill findings (for the Architect — a real run, not `--sanity`, on a system the skill has already
been sanity-tested against once)

- **Rebuilding on top of a same-day `--sanity` draft, while re-verifying every claim, worked but is
  slower than either extreme** (pure re-research, or trusting the draft outright). The instruction to
  "not carry a ⚠️ forward unread" was the right call here: it caught a genuine new finding (the
  primitive-test discrepancy) that a straight promotion of the draft would have missed, and it caught
  that the repo had moved 32 commits since the morning read — small but real drift a same-day
  assumption would not have surfaced. Worth naming explicitly in the skill's `--sanity` section: a
  same-day promotion is not the same as "already verified today."
- **Rule 5's "two primary sources disagree" case needs a slot for "one document mischaracterizes
  another it cites as canonical," not just "two documents disagree about the same fact."**
  `nine-concepts.md` doesn't contradict `primitive-test.md`'s stated conditions — it paraphrases them
  into a different question (decomposability of a primitive, vs. SDK/consumer-layer placement of a
  capability) while presenting the paraphrase as the same test. Rule 5's existing guidance ("quote
  both, newer commit wins") assumes the two texts are rival answers to one question; here they are
  answers to two different questions, one of which cites the other as its source. `content/codex.md`'s
  HANDOFF flagged an adjacent but distinct gap (two docs disagreeing about one interface's status,
  deprecated vs. experimental) — this is a third shape, not covered by either existing gap.
- **The component-matrix re-check instruction ("correct only cells that are wrong... do not re-score
  the others") was easy to follow for the 18-row grid but ambiguous at its edges** — the same document
  has a decisions table (§2) and a design-principles callout (§4) that also make Gas-City-specific
  factual claims (one of which, the three-way review-formula claim, I found directly wrong). The PRD's
  "§1" scoping resolved it for me, but a future run given a vaguer "re-check the matrix" instruction
  would need to decide for itself whether "the existing column" means one table or the whole document
  section, and I'd flag that boundary explicitly next time rather than infer it.
- **The two-altitude recording (Rule 7) and the sibling-vocabulary rule (Rule 8) both held up cleanly
  on a second application** — no new gap found here beyond what the sanity draft already surfaced.
- **No framework/process defect found** — nothing rose to the bar in `docs/agents/issue-tracker.md`;
  the items above are skill-content findings, reported here per the PRD, not process bugs.

## Router / process notes

Per `CLAUDE.md` §Workstreams, this repo runs **un-routed**: no `router.py`, no BLUEPRINT YAML, no
`.state.json`. No router command was run. This HANDOFF is the completion signal for W4 #2; per
`W4-teardowns.md`'s Session shape, the architect reviews and the queue proceeds to W4 #3 (LoomWarp).
