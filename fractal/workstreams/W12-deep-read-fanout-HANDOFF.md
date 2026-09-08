# HANDOFF: W12-deep-read-fanout

**Completed:** 2026-09-08
**Epic:** harness-atlas — the re-cut
**Branch:** `deep-read-fanout`. **PRD:** `W12-deep-read-fanout.md`.
**All three phases complete.** Phase 3 landed 2026-09-08 on KD's ruling to dispatch all eight at once.

## What landed

| | Where | State |
|---|---|---|
| The skill, amended | `skills/harness-deep-read/SKILL.md` | 135 → 256 lines; gate replaced, four post-pilot fixes applied |
| The teardown skill | `skills/harness-teardown/SKILL.md` | `verification:` in the frontmatter spec; budget 11 → 22 |
| Two rulings | `rulings/2026-09-08-deep-read-claims.md`, `rulings/2026-09-08-authorship-provenance.md` | Both indexed in `rulings/00-README.md`; R11's extension recorded in `01-scorecard.md` |
| The exemplar, stripped | `content/claude-code/` (12 files) | 77 LoomWarp mentions → 2, both inside the dated strip record |
| Authorship, backfilled | 10 profiles + `content/claude-code/` | `verification:` blocks, marked attested |
| **The pilot** | `content/codex/` (13 files, ~1,340 lines) | Standard depth; both directions wired |
| Findings | `fractal/ISSUES.md` ISSUE-023 | Four falsifications, all fixed in the skill |

**Gate:** `node scripts/check-doc-links.mjs` — **PASS**, 2,445 local links and 1,207 anchors.

## The pilot falsified the skill in four places, which was its job

`harness-deep-read` was inferred from one folder. Running it on Codex showed four places where Claude
Code's accidents had been written down as the genre's rules — full argument in **ISSUE-023**:

1. **Scope is a separate question from depth.** Codex publishes three non-nested outlines; depth was
   answerable and *which outline* was not. Claude Code has one docs tree, so this never came up.
2. **"The repository" is two source classes.** Codex's `docs/` is now stubs behind two redirects; the
   substance lives in `codex-rs/*/README.md`, the only home of execpolicy's grammar and the memory
   pipeline's phases.
3. **The claim test needed a third outcome.** A claim can be *outside the set's scope* rather than
   unmechanised; recording that as an absence would be false. It occurred once in Codex and three
   times in the Claude Code retrofit.
4. **Profile and deep read drift visibly.** Codex's profile says 11 hook events at its 2026-09-03
   read; the docs say 12 today. §6 now carries both figures with both dates rather than picking one.

## Four things worth your eye

**The exemplar was worse than the audit said.** W11 reported the LoomWarp framing re-headed. It had
re-headed one paragraph of `00-README.md`. All twelve documents carried it: nine `## LoomWarp notes`
sections, nine inline note paragraphs, a convention advertising them, a whole appendix auditing
LoomWarp's `policy/tier-*.json`, and eleven files still stamped `project: loomwarp` despite W10's AC-6
calling for exactly that fix. Had the fan-out gone first, this shape would have been copied eight times.

**Two LoomWarp mentions remain, deliberately.** Both are inside a dated note in `00-README.md` saying
what was removed and why. The plan's verification called for zero; *archive by ruling, never by
deletion* argues for the record. **Deviation reported rather than resolved unilaterally — delete the
note if you disagree.**

**The backfill is an attestation, and the repo holds a counterexample.**
`W0-alignment-HANDOFF.md:117` records three sanity teardowns run on **sonnet**. No other run recorded a
model. So every backfilled `drafted_by: "claude-opus-5"` carries a `note:` saying it is your attestation
of 2026-09-08, not a capture. `content/codex/00-README.md` is the first with a genuinely captured value.
The archived `--sanity` drafts were excluded.

**Codex's scope is wider than its profile's, on your instruction, and it shows.**
`11-beyond-the-cli.md` covers cloud, IDE, desktop and web; the profile's §7 excludes all of them
because *"Codex" names three OpenAI products*. That document has **no §6 counterpart**, nothing links
out to it, and `00-README.md` says so plainly. It is the one place the set and the profile describe
different subjects.

## Not done

- **Phase 3 — eight harnesses.** Order in the PRD. ISSUE-023 argues against dispatching all eight at
  once: **Pi** may be the first honest `00` + `20` set, and **LoomWarp** cannot carry a resolvable
  citation. Re-read the skill after each of those two.
- **`wiki-nav` has still never been run**, and there is now a thirteenth folder for it to cover.
- **Nothing is committed.** The branch `deep-read-fanout` holds the work; no commit was made, per the
  standing rule that commits happen when you ask.


---

# Phase 3 — the eight, 2026-09-08

**87 documents, 20,033 lines.** With Claude Code and Codex: **118 documents, 23,850 lines, ten of ten
harnesses.** Gate green at 3,456 links / 1,241 anchors. `git status` clean.

| Harness | Docs | Lines | Depth | What the run turned up |
|---|--:|--:|---|---|
| OpenClaw | 21 | 4,737 | Exhaustive | Re-pinned to a release published that morning; 12 drift figures; the team version the 2026-09-07 ruling predicted is present |
| Hermes | 13 | 3,070 | Standard+ | Re-pinned to a release published the previous day; the corpus's sharpest refusal quote |
| Grok | 13 | 2,665 | Standard | Two products held apart by four redundant markers per document; two claim ledgers, two claim walks |
| Gas City | 12 | 2,261 | Standard | Resolved two of the profile's §10 unverified items; found the docs host 301-redirects |
| FRACTAL | 10 | 1,904 | Standard | **Ran the code.** See below |
| LoomWarp | 10 | 1,587 | Standard | **15 doc/code disagreements, inheritance proven by hash** |
| OpenCode | 9 | 1,443 | Standard | Nine-rung config chain assembled; four same-version vendor self-disagreements |
| Pi | 5 | 919 | Standard | Declined the Index option and argued why |

## Four things that are yours

**1 · Two bugs in your own systems, both reproduced.**

`router.py`'s gate is *weaker than `content/fractal.md` claims*. The card says it gates on a HANDOFF's
pasted build output without checking whether that output is true. It **never looks for a HANDOFF at
all** — `cmd_update` checks that the name is a key in `.state.json` and that the status is one of three
strings. The string `HANDOFF` does not occur in the file. Reproduced: `NOT_STARTED → COMPLETE`, exit 0,
in a directory with no `workstreams/`, no HANDOFF, no PULSE. **`init` has no guard either** — re-running
wipes every `COMPLETE`, exit 0, no prompt, no backup, and `BEST-PRACTICES.md` §4 records that this
already happened once in production.

LoomWarp's HANDOFF classifier is **inverted**. `classify()` matches `\|\s*PASS\b[^|]*\|` — a cell
*beginning* with PASS. Run against the shipped files: both HANDOFF templates, placeholders intact,
classify **COMPLETE**; both real HANDOFFs write `| **PASS** |`, which starts with `**`, so
`any_pass=False` → **UNKNOWN**. Unfilled templates pass; finished work does not. The doctrine in the
same repo warns that *"the word 'FAIL' in a sentence flips the result"* — the real failure is its exact
inverse.

**2 · A second phantom source in the FRACTAL profile.** `content/fractal.md` says it was *"re-checked
against HEAD `60393054`"*; that SHA returns **HTTP 422, no commit found**, confirmed independently. The
primary pin `6398f6db` resolves, so the `U` reading stands — but the drift re-check and its
*"+32,875/−3,853 across 303 files"* figure are fictional (actual: 4 commits, 16 files, +1,506/−230), and
**three of §10's unverified items rest on it**. With the vanished `generic-cerebro`, one profile now
cites two sources nobody can open. ISSUE-024 and its addendum.

**3 · Three fabricated quotations, found by audit, all corrected.** Two in the committed Codex set and
one in Pi, where six refusals that appear as six headings with prose between them had been published as
a single `·`-joined sentence. The cause is now a rule: **a summarising fetch tool returns paraphrase,
and paraphrase inside quotation marks is fabrication.** Capture from raw source. An audit script lives
in the session scratchpad; it is a heuristic, not a gate, and it cannot resolve repo-file citations.

**4 · The skill was wrong in thirty-six places and is now 381 lines.** ISSUE-025 has the record. Seven
defects were found independently by three or more agents, which is the only evidence available that
they are real rather than one agent's taste. Two of the falsified heuristics were written by me: §2's
claim that a published refusal list suggests an Index read (backwards — it is the surface most needing a
page), and the phase-3 map's claim that coverage predicts depth (independent — Pi has the thinnest
coverage and the largest single doc file in the corpus).

## Not done

- **Two skill questions stay open** (ISSUE-025): depth does not compose across products, and §5's link
  contract assumes one document per §6 row where Grok needed two on nine of seventeen.
- **`wiki-nav` has still never been run**, and there are now ten deep-read folders for it to cover.
- **The profiles are not re-read.** Every drift found here is carried in the deep reads with both dates,
  per ruling `2026-09-04-w3-q3`. Ten profiles now have a newer companion; that is a queue, not a defect.
