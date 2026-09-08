# HANDOFF — FeatureLead-ClaudeCode (W8 deliverable 3)

**Completed:** 2026-09-04
**Epic:** harness-atlas — the re-cut
**Workstream PRD:** `fractal/workstreams/W8-template-v2.md`, deliverable 3 — the sample profile on
Template v2, for harness **Claude Code** (`anthropics/claude-code` @ `v2.1.261`, commit
`d7dbd9a09f59775726ed14bbea8fc9dfdff62f7b`).
**Procedure:** `skills/harness-teardown/SKILL.md` v2, full run (not `--sanity`, not `--restructure`).
Read first, in full, per the dispatch: `CLAUDE.md`, the v2 skill (all ten sections, the checklist,
the `<details>` rules, the Do NOTs), `W8-template-v2.md`, `content/claude-code/00-README.md`,
`20-consolidated-guide.md` §1, `assets/projects/claude-code/agentic-loop.mmd`,
`content/claude-code-draft.md` §F. Branch `template-v2`, stayed on it throughout.

## Summary of Work Completed

1. **`content/claude-code.md`** — full Template v2 profile, all ten numbered H2s in order.
   `## 6. Details` at line 220 (at the "at or before 220" ceiling); file is 542 lines total. 33
   matrix rows and 33 `####` detail headings, in checklist order, verified by script (`grep -c`).
   Card written last, after §2–§9.
2. **Four vendor diagrams verified today** against the docs (fetch, not recall), matching the
   `claude-code-draft.md` §F finding that Anthropic ships several unrelated diagrams: the product-level
   agentic loop (`how-claude-code-works`), the SDK message-level loop (`agent-sdk/agent-loop`), the
   subagent-vs-agent-team topology (`agent-teams`), and session-continuity/resume-vs-fork
   (`how-claude-code-works`). A fifth, the hook-lifecycle diagram, was found today (raw `.md` fetch of
   `hooks`) — not confirmed in the prior sanity run.
3. **Diagrams — 3 redrawn/transcribed, 2 undrawn:**
   - `assets/projects/claude-code/agentic-loop.mmd` — header refreshed (sha, re-read date); content
     unchanged; used as the system map (§2).
   - `assets/projects/claude-code/turn-and-hook-lifecycle.mmd` — new; the agentic loop combined with
     the per-turn hook sequence, transcribed from `hooks`' own lifecycle diagram and event table.
   - `assets/projects/claude-code/subagents-vs-agent-teams.mmd` — new; transcribed from `agent-teams`'
     own comparison diagram, used as the delegation workflow (3c is `●`).
   - `assets/projects/claude-code/permission-decision-audit.mmd` — new; transcribed from the permission
     rule-evaluation order (`permissions`) joined to the `tool_decision` telemetry event
     (`monitoring-usage`) — the signature workflow nearest the structured output.
   - Undrawn, listed in §9 by title and URL: session-continuity; the SDK message-loop diagram.
   - Every embedded mermaid block diffs empty against its `.mmd` file (checked with `diff`).
4. **Obligations (step 11):**
   - (a) `comparisons/systems/90-short-profiles.md` §1 — Claude Code row rewritten, *"Torn down
     2026-09-04"*, linking `content/claude-code.md#1-at-a-glance`.
   - (b) `components/ALIGNMENT.md` §2 — new Claude Code column, all 33 rows, verbatim copy
     of the profile's §4 marks; totals **17 / 14 / 2** match the card and the profile's §4 totals row.
     A dated addition note and a general "every column is a copy of its profile's §4" line added above
     the table, per the deliverable's instruction — this line did not exist before.
   - (c) `components/MATRIX.md` §1 — the existing Claude Code column re-checked cell by
     cell against the new profile. One cell corrected: **Communication channel** `○→◐` (Channels — a
     feature that did not exist at this file's 2026-08-11 read). The "primitive sets themselves" table's
     Claude Code row also corrected (dropped "settings" as `(supporting)`, added dynamic workflow and
     instruction file, both dated and cited). All other cells re-checked and left unchanged, with the
     re-check itself recorded in a dated note.
   - (d) Structured output stated once, in the card, §6 8b/8c, and the third workflow: the
     `claude_code.interaction` OTel trace whose `claude_code.tool` spans carry the `tool_decision`
     permission-audit record.
   - (e) `index.md` §1 — Claude Code row → `content/claude-code.md`, state `v2 (2026-09-04)`, deep-read
     folder named alongside it.
   - Also: one line at the top of `content/claude-code/00-README.md` pointing up at the profile;
     `comparisons/systems/claude-code.md`'s pointer re-targeted to the profile (kept as a pointer, not
     duplicated); `README.md` highlight-reel cell → `content/claude-code.md`, thesis line as "In one
     line", structured output marked verified 2026-09-04.
5. `node scripts/check-doc-links.mjs` — **PASS** (1498 links, 60 anchors checked; the link checker's
   new anchor-resolution mode caught four root-relative paths I wrote from muscle memory —
   `content/claude-code/...` and `comparisons/...` instead of `claude-code/...` and `../comparisons/...`
   — all four fixed before this HANDOFF).

## AC evidence (per `W8-template-v2.md`)

- **AC-1**: `## 6. Details` at line 220 (≤220 ✓). File 542 lines (≤600 ✓). 33 matrix rows, 33 `####`
  headings (checked: `grep -c "^#### "` → 33; `grep -c "^| \["` in §4 → 33). Matrix totals `17/14/2`
  = card's Coverage row = `04-harness-alignment.md` §2's Claude Code column total. **Met.**
- **AC-2**: `grep` confirms no `◐` outside `## 4.`–`## 5.` except the `<summary>` mini-recap lines the
  skill's own §6 template shows (`— 2a ● · 2b ● · 2c ●` style); no `✅`/`↪`/`⚠️` before `## 6.` after two
  rounds of fixing — the §5 Primitives table template has a "Source" column that the skill's own rule
  5a (source marks only in §6–§10) contradicts; I resolved this by keeping the citation but dropping the
  mark in §5 (see Skill findings). No `◐ (proposal)` anywhere. **Met, with a template ambiguity flagged.**
- **AC-3**: All 4 embedded mermaid blocks diff empty against their `.mmd` (checked with `diff`, all
  clean). Every `%%` header carries page, sha, read date. No workflow invents a sequence — all three are
  transcribed from a vendor diagram or an explicit vendor ordering statement, quoted in the caption.
  No DERIVED overlay was needed (Claude Code ships its own diagrams). **Met.**
- **AC-4**: `node scripts/check-doc-links.mjs` PASS, anchors resolved. **The render check (deliverable
  4 — mermaid/`<details>` rendering in Chrome/Safari/Firefox on `github.com`) is out of scope for this
  dispatch**, which was scoped to deliverable 3 only; the PRD's session shape (step 3) assigns the
  render check and KD review to the Architect after this HANDOFF lands. Not attempted here.
- **AC-5**: Not evaluable by the Feature Lead — KD's review and the resulting skill revision are the
  Architect's step, downstream of this HANDOFF. Skill findings below are the input to that revision.
- **AC-6**: The skill was not re-read for the 33 rows at runtime; they were typed from the skill file
  as loaded once at session start, matching the rule ("never reads the 33 rows from a file"). `CLAUDE.md`
  and the concepts doc were cited by name, not pasted.

## Summary of Work Not Completed

- Deliverable 4's render evidence (Chrome/Safari/Firefox, `#2b-hooks` fragment navigation) — explicitly
  the Architect's step per the PRD's session shape, not this dispatch's scope.
- A handful of secondary pages named but not reopened today (`champion-kit.md`, `communications-kit.md`,
  `troubleshooting.md`, `errors.md` in full, `model-config.md`, `context-window.md`) — flagged in §10
  of the profile rather than silently assumed from the 2026-08-10 local read.

## Technical Debt

- None introduced. The profile's own §10 carries 9 honestly-scoped unverified items; none is a
  shortcut taken to finish faster — each is a real boundary of what a one-day primary-source read can
  cover for a harness this large.

## Key Decisions

- **Primitive count: 8, not the pre-existing corpus's 7.** The 2026-08-11 `02-component-matrix.md`
  listed `settings` as a primitive and omitted dynamic workflows and the instruction file. Rule 4's
  stricter definition ("infrastructure the harness owns is `(supporting)` unless named as a first-class
  authoring unit") moves `settings` to supporting; `docs/workflows`' own comparison table and the
  glossary's `CLAUDE.md` entry earn dynamic workflow and the instruction file their own rows instead.
  Marked `⚠️ contestable` per rule 4, with the narrower 7-primitive reading stated as the alternative.
- **Two altitudes recorded** (rule 7): runtime for the session, plus an org-policy layer (managed
  settings, the Claude apps gateway, Code Review) over many single-operator runtimes. This is the
  inverse framing of the corpus's existing note about LoomWarp/Gas City sitting *under* Claude Code —
  here the extra altitude sits *over* it.
- **Deep read left as-is, not rewritten.** The 13-document `content/claude-code/` folder (2026-08-10)
  stays the profile's deep read per the PRD; I did not update its per-page content, only its top pointer
  line. Detail rows that cite it mark it `↪` and note what changed since (e.g., hook count 29→33).
- Implemented as specified otherwise.

## New Dependencies Added

None.

## Verification Evidence

| Gate | Command | Result | Notes |
|------|---------|--------|-------|
| Doc-link check | `node scripts/check-doc-links.mjs` | PASS | 1498 links, 60 anchors resolved |
| Matrix/heading counts | `grep -c "^#### "`, `grep -c "^| \["` (§4) | PASS (33/33) | |
| §6 heading position | `grep -n "^## 6. Details"` | PASS (line 220) | at the ceiling, not over |
| File length | `wc -l` | PASS (542 ≤ 600) | |
| Mermaid parity | `diff` against each `.mmd` | PASS (4/4 empty) | |
| Coverage-mark scope | `awk`/`grep` for `◐` outside §4–§5 | PASS (only `<summary>` recaps, per template) | |
| Source-mark scope | `grep` for `✅↪⚠️` before `## 6.` | PASS after 2 fixes | §5 table's own "Source" column conflicts with rule 5a — see Skill findings |
| Quality pass | `git diff` review | PASS | no AI slop found — no placeholder text, no invented quotes, every `**Ships**` line cites what it claims |
| Secrets scan | `grep -rn 'password\|secret\|api_key\|token\|credential'` over changed files | PASS | matches are documented settings-key names (`ANTHROPIC_API_KEY`, `CLAUDE_CODE_OAUTH_TOKEN`), not credential values |
| Personal-data scan | `grep -rn 'email\|ssn\|date_of_birth\|full_name'` over changed files | PASS | no matches beyond doc prose about the *feature* named "email" in OAuth flows |

*(This is a documentation-only workstream — no `npm`/build/lint/test gate applies; the doc-link checker
and the diagram-parity/heading-position checks above are the real CI gate for this repo.)*

## Skill findings

Every place Template v2's rules were ambiguous or did not fit, for the skill revision before fan-out:

- **§5 Primitives' own table template has a "Source" column, but rule 5a says source marks (`✅↪⚠️`)
  are allowed only in §6–§10, and AC-2 says the same.** I resolved this by keeping the citation text in
  §5's Source column but dropping the `✅` marks — the rule and the template contradict each other and
  the rule (being a "rule that overrides everything below") should win, but the template's own worked
  example doesn't show this resolution. The skill should either drop the "Source" column header from
  §5's template or explicitly say marks are stripped there.
- **The `<details><summary>` mini-recap in §6 (`— 2a ● · 2b ● · 2c ●`) is a coverage mark used outside
  §4, which reads as a violation of "no `◐` outside §4" until you notice the skill's own §6 template
  shows exactly this.** Worth a one-line carve-out in rule 5b so a mechanical AC-2 check doesn't flag it.
- **A harness this large produces more diagrams than the "redraw the nearest one" rule anticipates,
  confirmed again today.** Five vendor diagrams exist at four different altitudes (product loop, SDK
  message loop, subagent/team topology, session-continuity, hook lifecycle) — one more than the sanity
  run found (the hook-lifecycle diagram, discovered only via a raw `.md` fetch; the docs-index-navigated
  page render doesn't surface the same image markup a summarization pass sees). **Recommend the skill's
  step 2 explicitly say: fetch at least one page's raw `.md` source, not just the rendered/summarized
  version, since a WebFetch-summarized pass can silently drop an `<img>` an author would want to redraw.**
- **The 33-row template still assumes a harness this size fits one page; it does not comfortably.**
  Six rows (2b, 3c, 4a, 5a/8b via the deep read, 8c) each have a Tier-2-page's worth of primary material.
  The link-out mechanism worked, but I had to make a judgment call on *how much* to inline before linking
  out (~3–5 lines of summary before the citation) that the skill doesn't specify a number for. A concrete
  target ("summarize in ≤3 lines, then link") would remove that judgment call.
- **Rule 4's primitive count remains the hardest rule to apply honestly, and got harder, not easier,
  between the 2026-08-10 read and today**, because the harness's own feature surface grew (dynamic
  workflows, agent teams went from unmentioned to documented) between reads. A harness this actively
  shipped needs the skill to say explicitly that the primitive count is a snapshot, not a fact, and that
  re-reading it later is expected to change it — which rule 4 already implies but doesn't say outright.
- **The three-question inclusion test's Q2 needed the "split by layer" answer again**, exactly as the
  2026-09-03 sanity run found for the same harness. This confirms (not just repeats) that the test's
  phrasing should explicitly allow a layered answer as legitimate, not just tolerate it.
- **Rule 7's "two altitudes" note is written for a *lower* altitude sitting under a runtime (LoomWarp,
  Gas City installing into Claude Code); it does not explicitly anticipate a runtime with an org-policy
  layer sitting *over* it** (managed settings, gateways). I recorded it as a second bold altitude line,
  which the rule's letter permits ("record both") but its worked example doesn't show this direction.
- **The obligation to add "one line above the table stating every column is a copy of its profile's §4"
  in `04-harness-alignment.md` (deliverable 3, item b) reads as new — no prior harness's addition
  included this line.** I added it now; every future harness added to that table inherits it, so this
  is a one-time debt the skill or the PRD should note is now paid for good, not per-harness.
- **`gh api` pagination for tags/releases (213 tags, 209 releases) needed manual paging** (`?page=`) to
  find the true earliest tag — the skill's step 1 says "resolve... the tag or commit you are reading"
  but doesn't mention that finding the *earliest* tag (for the identity table's "First release" field)
  requires walking to the last page of a paginated `gh api` response. Worth a one-line tip.

## Router

Not applicable — this repo runs un-routed (`CLAUDE.md` §Workstreams). No `router.py` command was run.
