# HANDOFF — FeatureLead-LoomWarp (W4 #3)

**Completed:** 2026-09-03
**Epic:** harness-atlas — the re-cut
**Workstream PRD:** `fractal/workstreams/W4-teardowns.md` (amended block, 2026-09-03), for harness
**LoomWarp** (`shi503/loomwarp-team-system` @ `8844df6f4bc48f8a563340eb3163401792e000d5`, private repo,
read via a local clone plus authenticated `gh api`).
**Procedure:** `skills/harness-teardown/SKILL.md`, full run (not `--sanity`), with the PRD's explicit
peer rule for LoomWarp: same template as any other harness, no special status, and its primitive-set
row stays blank until earned by the files, not assumed from the RULING or the self-assessment. Read
first, in full: `CLAUDE.md`, `fractal/workstreams/W4-teardowns.md` (amended block, item 3's rule),
`skills/harness-teardown/SKILL.md` (33 rows inline), `RULING-2026-09-02-spinout.md`,
`fractal/workstreams/W4-codex-HANDOFF.md` and `W4-gas-city-HANDOFF.md` (prior runs' skill findings),
and `content/gas-city.md` (a finished profile, including the two-altitude convention).

## Summary of Work Completed

1. **`content/loomwarp.md`** — full Template-A profile. Frontmatter pinned to
   `shi503/loomwarp-team-system` @ `8844df6` (private, single contributor, no license, no releases),
   read date 2026-09-03. Opener (three paragraphs), legend, §A Identity (13-field table, three-question
   inclusion test answered per-layer per Rule 7, loop question — process layer with a nested
   install-into-Claude-Code mechanism for agent files and skills, primitive preview, structured-output
   line), a `## Diagram` section, §B (all 33 rows, absence rows naming the pages/greps checked), §C
   (primitive table **empty**, count `0 named`, verdict, plus a clearly separated "candidates the files
   suggest but LoomWarp does not name" table), §D (six grouped quote blocks), §E (primary/secondary
   sources, every `gh api` command run), §F (seven non-empty bullets plus a "Skill findings"
   subsection, since the PRD asked for skill findings even on a real run).
2. **§C's finding, verified rather than assumed**: the now-superseded `specs/archive/v0/02-functions.md`
   §3 *did* once state a concrete six-primitive table for LoomWarp (registry entry, context bundle,
   work contract, capability package, risk tier, evidence bundle), resolving a conflict it labelled
   `C-6`. Grepping the *current* `specs/v1-framework/` tree for those six exact names found only two
   surviving as concrete objects (work contract, capability package), scattered across separate
   component files, never regathered into one stated set. `V1`'s own "primitives" language
   (*"all thirty-three components are configurable primitives"*) is a generic grading rule for any
   harness it scores, not a claim about LoomWarp's own authoring surface — confirmed by reading both
   documents in full, not inferred from the corpus's own prior claim. This repo's existing
   `comparisons/02-component-matrix.md` §1 line (*"— unstated. Artifacts exist; a set does not"*) and
   `comparisons/00-README.md`'s inclusion-test-3 failure were both re-verified against the files and
   held.
3. **`assets/projects/loomwarp/dispatch-loop.mmd`** — the "Dispatch sequence" diagram from
   `docs/ARCHITECTURE.md` (the diagram nearest the loop question), redrawn from a `sequenceDiagram`
   into the house `flowchart TD` notation. The other two diagrams in the same file (repo topology;
   six-plane architecture) are named, not redrawn, in §F per the diagram rule for multiple diagrams.
4. **`comparisons/systems/90-short-profiles.md`** §1 — a new **LoomWarp** row added (none existed),
   marked *Torn down 2026-09-03*, linking to `content/loomwarp.md`, placed in the same table Gas City
   already sits in despite the section's own header line (*"These run the agent loop. LoomWarp installs
   into one of these; it is not one"*) — the row's text names that tension rather than hiding it.
5. **`comparisons/04-harness-alignment.md`** §2 — a LoomWarp column added to the 33-row table (header,
   all 33 rows, and the "Column totals" line: **LoomWarp 3 / 19 / 11**), plus a dated addition note
   above the table explaining the process-layer altitude and why several cells read as thinner
   analogues than Gas City's. Every existing column (Hermes/Pi/OpenClaw/OpenCode/Grok/Codex/Gas City)
   is byte-identical to before this run; only new cells were added. (Caught and fixed my own arithmetic
   error in the totals line before finalizing — first draft said 2/15/16 against a column that actually
   sums to 3/19/11.)
6. **`comparisons/02-component-matrix.md`** §1 — the *existing* LoomWarp column re-checked cell by cell
   against the new profile's §B, per the PRD ("correct only wrong cells with dated notes"). One cell was
   wrong: **Context assembly** `○→◐` — `control/dispatch.py`'s `build_prompt_for()` genuinely
   concatenates a workstream's `context_bundle:` files into the dispatched prompt, a real mechanical
   assembly step the prior `○` missed. Every other LoomWarp cell (including both existing `●`s —
   Standards tier, Agent definitions) was checked against the profile and left unchanged. The
   primitive-sets sub-table's LoomWarp row (*"— unstated. Artifacts exist; a set does not"*) was
   re-verified and found already correct — no edit needed there.
7. **The `structured output` line, verified per the PRD's explicit instruction**: `control/events.jsonl`
   — read whole and parsed. **13 lines, three event types** (`dispatch_start`, `dispatch_end`,
   `dispatch_printed`). **Not schema-validated**: `find . -iname "*.schema.json"` across the whole
   LoomWarp repo (excluding `.venv`/`node_modules`) returned zero hits. This is a sharper finding than
   the corpus's prior assumption — LoomWarp's own `standards/evaluation-doctrine.md` states the bar
   this artifact must clear (*"Every event validates against a schema. An unvalidated event stream is a
   log, not evidence"*) and the shipped artifact does not clear it, by the vendor's own words. Quoted in
   §A and §D of the profile.
8. `node scripts/check-doc-links.mjs` — **PASS** (180 files scanned, 1453 links checked).

## AC evidence (per `W4-teardowns.md`)

- **AC-1** (§A–F present, §F non-empty, every `○` names pages/checks): met. Every absence row in §B
  names what was checked (e.g. row 5c: "checked `context/`, `skills/`, `standards/` and grepped for
  'RAG,' 'embedding,' 'knowledge base,' 'retriev*'"). §F carries seven bullets plus Skill findings.
- **AC-2** (row in `90-short-profiles.md`, column in `04-harness-alignment.md` §2, column re-check in
  `02-component-matrix.md` §1, all in this HANDOFF): met — items 4, 5, 6 above.
- **AC-3** (§C counts and gives the verdict): met, in the shape the PRD specifically asked for —
  **0 named**, verdict states plainly that this is a fourth category (a stated absence at two altitudes,
  not 5–7 / 12+ / a refusal list), with the superseded six-primitive table and its two-of-six survival
  rate recorded as evidence, and a strictly separated "candidates the files suggest" table that the
  verdict does not draw on.
- **AC-4** (structured-output line, one artifact not a list, verified): met — item 7 above.

## Summary of Work Not Completed

- **`repos/notify-service`'s current GitHub visibility was not independently re-queried.** The
  "cannot `git clone --recursive`" claim rests on `registry/repositories.yaml`'s `visibility: private`
  field plus the self-assessment, not a fresh `gh api repos/shi503/loomwarp-notify-service` call this
  pass — that second repo is outside this workstream's file manifest to touch, and the registry field
  is itself a primary-source read. Flagged in §F rather than silently assumed.
- **`git log -p -- control/events.jsonl` was not run**, so whether the file has ever held more than its
  current 13 lines (e.g., a since-removed earlier event type) is unverified. The structured-output
  finding is about the file's current content, stated as such.
- **The decision ledger's "adapted from real prior art" provenance claim** (`docs/ARCHITECTURE.md`)
  was not traced to a specific named prior system — `docs/BUILD-LOG.md` was read for this and did not
  resolve it beyond the general prior-work-boundary constraint already quoted in §D. Flagged in §F.
- **Which of `BLUEPRINT-LoomWarp-V1.yaml`'s ten workstreams have actually completed** was not fully
  reconstructed — `fractal/.state.json` is gitignored and absent from the working tree at this read;
  the evidence directories found suggest partial progress but I did not walk the full sequence. Flagged
  in §F rather than guessed.

All other acceptance criteria and manifest items: **met**.

## Technical Debt

None introduced in this repo. The profile documents several things *inside LoomWarp* that read as
technical debt at the product (the classifier-vs-doctrine contradiction; the unschema'd event log
against its own stated rule; the roster tension between `.claude/agents/*.md` and the framework's own
field-level "nobody provides `F9`" finding) — these are findings about LoomWarp, not shortcuts taken in
this workstream.

## Key Decisions

- **§C's verdict names a fourth shape the skill's rule 4 doesn't yet have a slot for** ("stated once, in
  a superseded document, then dropped") rather than forcing LoomWarp into "0, contestable" or
  reconstructing the old six as a live range. This follows the PRD's explicit instruction more literally
  than the skill's generic rule 4 branches do; recorded as a Skill finding for the Architect rather than
  silently picking one existing branch.
- **The candidates table is deliberately separated from the verdict**, per the task's explicit
  instruction that "that separation is the whole point." Six candidates are named (registry entry,
  context bundle, work contract, capability package, risk tier, evidence bundle) with their real,
  individually-verified status — none is presented as evidence toward a nonzero primitive count.
- **`SELF` (the product's own self-assessment) was read in full and cited only as secondary (◐)**,
  per the dispatch instructions and Rule 6 — every `✅` cell in the profile traces to a file I read
  directly this pass, not to a paraphrase of the self-assessment's own claims, even where the two agree.
  Places where the self-assessment's count was stale against a fresh read are noted explicitly (e.g.,
  `events.jsonl` grew from the self-assessment's "8 real events" to 13 lines by this read).
- **The loop-question altitude (process layer) required no two-altitude recording** (Rule 7), unlike
  Gas City — LoomWarp installs into exactly one harness (Claude Code) by one mechanism (file copying),
  with no separate "hosts many loops" layer underneath it. Recorded as a clean single-altitude case in
  the profile and as a Skill finding (no friction this run).
- No deviation from the PRD's file manifest. No new project guides were needed beyond the skill itself.

## New Dependencies Added

None.

## Verification Evidence

| Gate | Command | Result | Notes |
|------|---------|--------|-------|
| Doc-link check | `node scripts/check-doc-links.mjs` | **PASS** | 180 files scanned, 1453 links checked |
| Manifest scope | `git status --short` | **PASS** | `content/loomwarp.md` (new), `assets/projects/loomwarp/dispatch-loop.mmd` (new), and the three named comparison files. No other harness profile, `spec/`, or `components/` touched; no file in the LoomWarp source repo touched (read-only) |
| Quality pass | `git diff` review | **PASS** | No AI slop found: no dead scaffolding, no `console.log`-equivalent, no unnecessary defensive branches. Profile length and structure match the genre precedent set by `content/codex.md` and `content/gas-city.md` |
| Secrets scan | `grep -rn 'password\|secret\|api_key\|token\|credential' <changed files> \| grep -iv 'test\|mock\|example\|type\|interface'` | **PASS** | Zero hits across all five changed paths (including the new `content/loomwarp.md`, explicitly re-checked after the general scan returned nothing) |
| Personal-data scan | `grep -rn 'email\|ssn\|date_of_birth\|full_name' <changed files> \| grep -iv 'test\|mock\|type\|interface'` | **PASS** | Zero hits |
| Environment-value scan | `grep -rn 'localhost:\|127\.0\.0\.1\|0\.0\.0\.0' <changed files> \| grep -iv 'test\|\.env\|config\.example'` | **PASS** | Zero hits |
| CI gate (this repo) | N/A — docs-only workstream | **N/A** | Per `CLAUDE.md` and the skill: "Markdown is not code... The whole bar is: links resolve... and git is clean." No `npm run build`/`tsc`/`lint`/`test` gate applies to this repo |

## Skill findings (for the Architect — LoomWarp is the first system in this queue that already speaks
this skill's own vocabulary back at it, which is a genuinely different research case)

- **Rule 4 has no named branch for "the vendor stated a primitive set once, in a document it has since
  superseded, and the current document does not restate it."** The existing branches are *stated and
  counted*, *stated as a range and marked contestable*, or *never stated, build a defensible range*.
  LoomWarp is none of these cleanly — it is *stated, then two of six survived, scattered, uncollected*.
  I resolved it by treating "0 named" as correct for the *current* product (matching this repo's own
  prior corpus finding, independently re-verified rather than assumed), and by putting the superseded
  table's survival rate into the verdict's reasoning rather than into a reconstructed count. A future
  run on a system with this exact shape would benefit from the skill naming this branch explicitly,
  because the two-of-six detail is easy to lose if a runner treats "primitive set: unstated" as license
  to skip checking whether an *earlier* stated set exists and partially survived.
- **A system that has already absorbed this skill's own inclusion-test and primitive-definition
  language, and applies it to itself and to peers, is a distinct hazard from a system that merely ships
  primitives.** LoomWarp's `V1` framework quotes this corpus's own primitive definition near-verbatim
  and runs its own version of the inclusion test on other systems. Distinguishing "LoomWarp's own
  primitives" from "LoomWarp's copy of our vocabulary, run against itself" took deliberate, repeated
  care — every place §C or §B cites `V0`/`V1`, I checked whether the object described is something
  LoomWarp *ships* versus something LoomWarp *says about the field, including itself*. Worth naming as
  a durable hazard the skill should call out for any future self-referential system (a strong candidate:
  FRACTAL, next in the W4 queue, which is also KD-built and also carries this corpus's vocabulary).
- **The doctrine-vs-shipped-mechanism contradiction found at rows 3a/8a/8c (evaluation-doctrine.md's
  "never parse prose for structure" / "an unvalidated event stream is a log, not evidence" versus the
  actually-shipped `classify()` and `events.jsonl`) is a fourth shape of source disagreement**, distinct
  from the three already named across the queue: Codex's "two docs disagree about one interface's
  status," Gas City's "one doc mischaracterizes another it cites as canonical," and this one — **a
  vendor's own stated engineering principle, contradicted by its own shipped code, both primary, both
  current, no ambiguity about which is right.** Rule 5 handled this fine in practice (quote both, no
  smoothing), but three real instances across three consecutive teardowns suggests the rule's examples
  should grow a fourth case rather than leaving each runner to re-derive the right disclosure shape.
- **The two-altitude rule (Rule 7) needed no invocation here** — LoomWarp is a clean single-altitude
  process-layer case, unlike Gas City. No friction, no addition needed.
- **No framework/process defect found** — nothing rose to the bar in `docs/agents/issue-tracker.md`;
  the items above are skill-content findings, reported here per the PRD, not process bugs.

## Router / process notes

Per `CLAUDE.md` §Workstreams, this repo runs **un-routed**: no `router.py`, no BLUEPRINT YAML, no
`.state.json`. No router command was run. This HANDOFF is the completion signal for W4 #3; per
`W4-teardowns.md`'s Session shape, the architect reviews and the queue proceeds to W4 #4 (FRACTAL).
