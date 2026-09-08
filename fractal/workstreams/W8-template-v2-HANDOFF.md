# HANDOFF: W8-template-v2 (W8a — the skill and the sample)

**Epic:** harness-atlas — the re-cut
**Mode:** interactive (architect + KD) for the skill and the gate; one feature-lead for the sample.
**Branch:** `template-v2`, pushed to `shi503/harness-atlas` for the render check. Not merged — the
review gate (AC-5) is KD's.
**PRD:** `W8-template-v2.md`. Plan: `~/.claude/plans/reviewing-some-of-the-rippling-shannon.md`.

## Produced

| Deliverable | Where | State |
|---|---|---|
| 1 · Skill v2 | `skills/harness-teardown/SKILL.md` | Written, then revised twice: from the sample's skill findings, and from the render check (layout B) |
| 2 · Anchor-aware link checker | `scripts/check-doc-links.mjs` | Resolves `#slug` against GitHub heading slugs; skips links in code fences; still only "links resolve" |
| 3 · The sample | `content/claude-code.md` @ `anthropics/claude-code` v2.1.261 (`d7dbd9a`), read 2026-09-04 | 671 lines; `## 6. Details` at line 220; ● 17 · ◐ 14 · ○ 2; 8 primitives ⚠️ contestable; 3 vendor diagrams transcribed + the map, 2 listed undrawn; new column in `04-harness-alignment.md` §2; `02` re-checked; rows in `90-short-profiles.md` and `index.md`; README highlight cell; `content/claude-code/` kept as the deep read with a pointer up |
| 4 · Render evidence | this file, below | Passed in Chrome 152 after layout B |
| — · W3 in parallel | `vocabulary.md`, `W3-vocabulary-ledger-HANDOFF.md` | Done, same window |

## The render check (deliverable 4)

github.com, branch `template-v2`, `content/claude-code.md`, Chrome 152, 2026-09-04.

1. **Layout A** (twelve per-layer `<details>` holding the `####` headings): mermaid rendered (4
   iframes); the collapsed layers rendered with their mark recaps; **a link to `#2b-hooks` scrolled
   without opening the layer** — `details.open` stayed `false` both on page load with the fragment
   and on clicking the matrix row's own link. GitHub's anchor handling (`user-content-` ids, its own
   scroll) bypasses the browser's native auto-expand; setting `location.hash` to the prefixed id by
   hand did open it in Chrome, which confirms the cause is GitHub's handler, not the browser. So the
   failure is GitHub-wide, and Safari/Firefox would not rescue it.
2. **Layout B** (`###` layer headings and `####` component headings outside; each component's body
   in a `<details>` whose `<summary>` is its §4 mark and note): page loads scrolled to `2b Hooks`
   (heading top 125 px), the heading is visible, its body collapsed beneath it with the summary
   *"● Hook — 33 events, fail-open by default, 5 handler types"*; 33 `h4`, 33 component `<details>`,
   12 layer `h3`, 4 mermaid iframes; no heading inside a collapsible. **Pass.** The mechanism is now
   plain heading anchors, which every renderer honours; no browser-specific expand behaviour is
   relied on.

Conversion of the sample was mechanical (`scratchpad/layout-b.mjs`, one-shot, not committed):
each `<summary>` was derived from the profile's own §4 row, so the two echoes match by construction.

## Acceptance criteria

- **AC-1** `## 6. Details` at line 220 (≤ 220); 671 lines (≤ 700, cap raised from 600 for layout B,
  recorded in the PRD); 33 matrix rows, 33 `####`, 33 `<details>` in order; totals ● 17 · ◐ 14 · ○ 2
  equal in card, §4 and the `04` column. **Met.**
- **AC-2** `◐` only in §4 and the two echoes; `✅ ↪ ⚠️` from §5 on (`⚠️ contestable` on the count is
  a rule-4 modifier, now stated); zero `◐ (proposal)`. **Met.**
- **AC-3** Four embedded mermaid blocks diff empty against `assets/projects/claude-code/*.mmd`;
  headers carry page · sha · date; no DERIVED overlay needed; no invented sequence. **Met.**
- **AC-4** Checker PASS (1,499 links, 60 anchors); render check passed as above. **Met.**
- **AC-5** KD's review of the rendered sample — **pending.** The skill was already revised from the
  sample's skill findings (five, all folded in) and from the render check.
- **AC-6** 33 rows inline in the skill; `CLAUDE.md` and the concepts doc cited by name. **Met.**

## Skill revisions made in this workstream

From the sample's findings: rule 4 — `⚠️ contestable` is a count modifier, counts are snapshots with
a read date; rule 5a — marks allowed in §5's Source column; rule 5b — the card's Coverage row and
the per-component `<summary>` are the only echoes of §4; step 1 — page the API for the first tag;
step 2 — fetch docs raw so diagrams are not dropped. From the render check: §6 is layout B; step 4
and step 12 updated; whole-file cap 700.

## For KD's review (the gate)

Open `https://github.com/shi503/harness-atlas/blob/template-v2/content/claude-code.md`. The questions
the template is trying to answer, in the order the page asks them: does the card give you the harness
in thirty seconds; does the system map plus the paragraph under it give you the mental model; do the
three workflows show how it handles work; does the matrix scan; is the outline under it usable; is
anything left that reads as justification rather than signal. Say what changed; the skill is revised
from that before W8b starts.

## Next

1. KD review → skill revision → merge `template-v2` into `main`.
2. **W8b** — Pi `--restructure` pilot (tests the DERIVED overlay and the rule-4 note), then seven
   restructures; grid edits serialized by the architect.
3. **W8c** — the diagram pass over the eight.
4. **W4 resumes** on v2: Cursor → Cline, one at a time.

## Open items

- `spectrums/00-README.md` — KD's untracked draft (the spectrum sheet: ten `−3…+3` axes). Not
  committed by W8; if it is meant to feed the card, that is a skill change after the review.
- `content/claude-code-draft.md` and `content/pi-draft.md` — archive by ruling once the real Pi
  profile is restructured (Claude Code's real profile now exists).
- Safari and Firefox were not exercised; layout B depends on nothing browser-specific.

## Commits (branch `template-v2`)

`abf92dd` skill v2 + checker + PRD + ISSUE-006 · `94866c1` vocabulary ledger · `134c195` the Claude
Code sample · `17cde50` skill revision + W3 HANDOFF · `7e5fe91` layout B · *(this commit)* this
HANDOFF.
