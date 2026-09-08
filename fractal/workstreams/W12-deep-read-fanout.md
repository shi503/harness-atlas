# Workstream PRD: W12-deep-read-fanout

**Epic:** harness-atlas — the re-cut
**Mode:** interactive — with KD (four decisions taken in session, recorded below); headless fan-out for the remaining eight
**Dependencies:** W10 (both skills), W11 (publish readiness). Blocks nothing.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W12-deep-read-fanout-HANDOFF.md`.
**Status:** ready-for-agent (phase 3 only — phases 1 and 2 are complete)

## Goal

KD, 2026-09-08, reviewing the merged `template-v2` branch:

> *"it looks like we haven't completed the breakdown and consolidated guides for each of the harnesses
> similar to what was built for content/claude-code … check and see if we added the skill and if it's
> still doing the deep-dive consolidation … then let's see if we can add the remaining content for the
> other harnesses"*

The skill existed and had **never been run**. Three things blocked it, and all three were repaired
before the first deep read was attempted:

1. Its gate required a list of "highlighted harnesses" that was never written, so it stopped every time.
2. Its `allowed-tools` omitted `AskUserQuestion`, so it could not have negotiated scope even if asked.
3. Its only exemplar, `content/claude-code/`, carried **77 LoomWarp mentions** across all twelve
   documents — a rule-9 violation in the folder held up as the model.

## Decisions taken

| # | Decision | Where it is ruled |
|---|---|---|
| 1 | Pilot one harness, then fan out. **Codex CLI** first | this PRD |
| 2 | **Drop the highlighted gate.** Depth is negotiated per commission | `RULING-2026-09-08-deep-read-claims.md` |
| 3 | The vendor's claim ledger lives in `00-README.md`; the guide **maps claim → mechanism without grading** | `RULING-2026-09-08-deep-read-claims.md` |
| 4 | Shape: **navigation fixed, content free** — `00` and `20` always, everything between is the vendor's | the skill |
| 5 | Strip the exemplar's LoomWarp framing; add the claim block | this PRD |
| 6 | **Line count is not a requirement**; conciseness is, via a deletion test | the skill |
| 7 | Record **when an analysis ran, who ran it, and on what model** | `RULING-2026-09-08-authorship-provenance.md` |
| 8 | Backfill existing files as opus, **marked as an attestation** | `RULING-2026-09-08-authorship-provenance.md` |
| 9 | Codex's scope: CLI/runtime **plus** the cloud and IDE surfaces | this PRD; disclosed in `content/codex/00-README.md` |

## Deliverables

**Phase 1 — the skill and the rules.** ✅ complete
- `skills/harness-deep-read/SKILL.md` amended: depth **and scope** negotiation replacing the gate,
  `AskUserQuestion` added, the claim requirement with three outcomes, the free shape, the deletion test,
  the authorship block, the drift rule.
- `skills/harness-teardown/SKILL.md`: `verification:` added to the frontmatter spec, budget 11 → 22.
- Two rulings, both indexed in `RULINGS.md`. R11's scope extension recorded in `spectrums/01-scorecard.md`.

**Phase 2 — the exemplar and the backfill.** ✅ complete
- `content/claude-code/` stripped: nine `## LoomWarp notes` sections, one LoomWarp-specific policy
  appendix, nine inline note paragraphs, six prose mentions rewritten, the `30-` row removed, the
  comparative summary replaced, `project: loomwarp` → `harness-atlas` in eleven files.
- Claim ledger and `verification:` added to `00-README.md`; claim → mechanism close added to `20-`.
- Ten profiles backfilled with `verification:`, each marked as attested rather than captured.

**Phase 3 — the fan-out.** ⏳ not started

### The eight, measured

Coverage is the best available proxy for how much surface there is to document, and the primitive
count for how much *vendor vocabulary* exists to cut by. Sources re-probed 2026-09-08: all six external
repositories were pushed that day and all four documentation roots return `200`.

| Harness | Coverage | Primitives | Sources | Depth | The thing that will bite |
|---|---|---|---|---|---|
| **Pi** | ● 6 · ◐ 11 · ○ 16 | 8 | `earendil-works/pi` (103k★, MIT) · `packages/coding-agent/docs` | **Index**, or a thin Standard | A **published refusal list**. If any harness is honestly `00` + `20`, it is this one — which is exactly what the amended §3 newly permits and nothing has tested |
| **OpenClaw** | ● 20 · ◐ 10 · ○ 3 | 12+ | `openclaw/openclaw` (389k★) · `docs.openclaw.ai`, 590 pages with a `docs.json` | **Exhaustive** | The largest surface inventory in the corpus — ~30 channels, 11+ ACP runtimes. The `docs.json` is a machine-readable outline; use it rather than inferring one |
| **Hermes** | ● 20 · ◐ 10 · ○ 3 | 9 | `NousResearch/hermes-agent` (243k★, MIT) · `hermes-agent.nousresearch.com` | Standard→Exhaustive | Self-authored skills and the Curator ageing capabilities out — the memory character caps are the grain worth assembling |
| **OpenCode** | ● 10 · ◐ 13 · ○ 10 | 10 | `anomalyco/opencode` (205k★, MIT) · `opencode.ai/docs` | Standard | A nine-rung configuration chain and the `allow`/`ask`/`deny` ladder. Closest in shape to Codex's `01`+`06`, so the least likely to teach anything new |
| **Grok** | ● 19 · ◐ 10 · ○ 4 | Build 8 · Bot 6 | `xai-org/grok-build` (26k★, Apache-2.0) · `docs.x.ai/grok-bot` | Standard | **Two products, no primary source resolving them into one** — Codex's scope question, but harder, because one is open-source and one is closed and hosted |
| **Gas City** | ● 13 · ◐ 14 · ○ 6 | 6, healthy | `gastownhall/gascity` (1.2k★, MIT) · `docs/`, `engdocs/` | Standard | The cleanest run of the eight: six named primitives, a documented admission test, two in-repo doc trees |
| **LoomWarp** | ● 3 · ◐ 19 · ○ 11 | **0 named** | Private repo, KD's | **Decide before dispatching** | See below |
| **FRACTAL** | ● 3 · ◐ 11 · ○ 19 | 5 | Three instances, two public repos | **Decide before dispatching** | See below |

### The fifth falsification, visible before it happens

**The skill assumes a vendor, and two of these harnesses do not have one.** §4 requires a claim ledger
drawn from *"the landing or product page, the repository README's pitch, the documentation's own
introduction, the launch or announcement post."* LoomWarp and FRACTAL are KD's own systems. There is no
marketing surface, no launch post, and nothing written to persuade — which is the exact thing §4 exists
to quarantine.

**The deeper problem is the cut itself.** A deep read is cut by *"the harness's own surfaces — whatever
it calls them."* LoomWarp's profile records **zero named primitives, stated once and superseded**, and
`◐ 19` — a system whose vocabulary is mostly borrowed. FRACTAL is `○ 19`. There may not be enough
vendor vocabulary in either to cut a folder by, and forcing one would produce a set organised by *our*
components wearing the vendor's numbering, which is the one thing §1 forbids.

**Recommendation: neither is dispatched with the other six.** Both are decided on their own, after the
public six are done and the skill has stopped changing.

### Order — superseded 2026-09-08 by KD's ruling

The sequencing argument below is **kept as the reasoning, not as the plan**. KD, 2026-09-08, on the
Codex pilot: *"I think that the quality of the codex was good enough to justify dispatching sub-agents
to tackle the entire set of the remaining harnesses."*

**All eight dispatch in parallel**, as `feature-lead` sub-agents, one per harness. The staged
alternative — Pi, then OpenClaw, then a fan-out of four — was recommended on ISSUE-023's logic that
falsification comes from difference. That logic still holds and is why the risks are named per harness
in the table above; what changed is the judgement that the pilot de-risked the skill enough to pay for
eight runs at once rather than four rounds of one.

**The trade being accepted, stated so it is not a surprise:** a defect the skill still carries lands
in eight folders instead of one. The mitigation is that each agent writes only inside
`content/<harness>/` and `content/<harness>.md`, and reports findings rather than editing shared files
— `index.md`, `fractal/ISSUES.md` and this PRD are consolidated centrally after the runs return.

**And the two self-authored systems dispatch too.** KD: *"loomwarp and fractal will need to be broken
down based on just the code and what is described in the markdown."* That answers open question 2
below — the skill now carries a **§4 "When there is no vendor"** branch: record the absence of
positioning copy naming what was checked, substitute a stated-intent ledger from the system's own
markdown cited to file and commit, and **ground each stated intent against the code**, because
self-authored markdown fails by stating intent in the present tense as though it were implemented.

### One source is gone

**`shi503/generic-cerebro` — FRACTAL's instance `C`, pinned in the profile at `2cd56e7` — returns 404
as of 2026-09-08.** Not renamed: an authenticated repository search across the account, private
included, returns only `fractal-agent-system` and `loomwarp-team-system`. Instances `U` (upstream,
public) and `R` (this repo) are reachable; `C` is not. The FRACTAL deep read covers `U` and `R` and
**records `C` as unreachable at the read date** rather than relaying the profile's 2026-09-03 figures
as though re-verified. Logged as ISSUE-024.

## Acceptance criteria

- **AC-1** `node scripts/check-doc-links.mjs` PASS with anchors. ✅
- **AC-2** `git status` clean at close.
- **AC-3** No coverage mark (`● ◐ ○`) appears anywhere under a deep-read folder. ✅ for `content/codex/`.
- **AC-4** No `30-` document exists in any deep-read folder. ✅
- **AC-5** Every deep read carries a claim ledger and a `verification:` block with a **captured**
  `drafted_by`; every document carries the one-line drafted note. ✅ for `content/codex/`.
- **AC-6** Both directions wired: the profile's §1b lists every document, §6 rows link out, the folder
  points back up, `index.md` names the folder. ✅ for Codex.
- **AC-7** Each deep read's findings against the skill are logged before the next is commissioned.
  ✅ ISSUE-023.

## Do NOT

- Dispatch all eight at once. ISSUE-023 falsified four parts of the skill on the *first* run; the next
  two harnesses are the ones most likely to falsify more.
- Let a deep read restate the profile. It exists to hold what §6 links **out** to.
- Re-read a profile to resolve drift against a deep read. Carry both figures with both dates.
- Create a `30-`, score anything, or compare one harness to another inside a set.
- Write `drafted_by` as a guess.

## Open

1. **Do LoomWarp and FRACTAL get deep reads at all?** Two problems, and the second is the real one.
   LoomWarp's sources are private, so no citation in the set resolves for a public reader — W11's
   backticked-provenance discipline covers 32 citations in a profile, not a whole folder of them. But
   both harnesses also lack the thing the genre is cut by: **there is no vendor, no claim ledger to
   capture, and — LoomWarp names zero primitives — very little surface vocabulary to organise a folder
   around.** **Recommendation: decided on their own, after the public six, and a "no" is a legitimate
   answer that should be written as a ruling rather than left as a gap.**
2. **Does the skill need a self-authored variant?** Following from 1: if the answer to either is yes,
   §4's claim ledger needs a defined behaviour when no marketing surface exists. Recording *"no claim
   ledger — this system publishes no positioning copy; checked README, docs/ and the repository
   description"* is the corpus-consistent form, but it is not written down.
3. **Does `wiki-nav` run over the new folders?** It has never been run; its first run touches ~100 files,
   and there are now two deep-read folders for it to cover. Out of scope here, named so it is not
   forgotten.

---

*Brief: KD, 2026-09-08, reviewing the merged `template-v2` branch. Prior art: `content/claude-code/`,
until today the only deep read in the corpus, and the sole example the skill was inferred from.*
