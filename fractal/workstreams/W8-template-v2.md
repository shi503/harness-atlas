# Workstream PRD: W8-template-v2

**Epic:** harness-atlas — the re-cut
**Mode:** interactive for the skill and the review gate (architect + KD); headless fan-out for the sample and the restructures (one feature-lead per harness)
**Dependencies:** W0, W2, W4 #1–#4 (the four profiles KD reviewed). Blocks W4's remaining queue, W5, W6.
**Routing:** un-routed. Terminal artifacts: `W8-template-v2-HANDOFF.md` (the skill and the review gate), `W8-<harness>-HANDOFF.md` per sample or restructure.

## Goal

KD's review of the first four W4 profiles (2026-09-04): *too long, not glanceable; missing the
diagrams, system map and workflows; the 33-row table has bad UX; too much justification and file
attribution.* The pre-template `content/claude-code/` folder with its consolidated guide is the
best current example. Template v2 makes every profile read like that: a 30-second top, the picture
first, a matrix you scan, details you open.

## Deliverable

1. **`skills/harness-teardown/SKILL.md` at v2** — the page spec in the plan
   (`~/.claude/plans/reviewing-some-of-the-rippling-shannon.md`, "The v2 page spec"): ten numbered
   H2s, an at-a-glance card written last, system map and workflows before the matrix, a
   `●/◐/○` matrix grouped by layer with every row linking to its detail anchor, details in twelve
   `<details>` blocks with `#### <id> <Component>` headings, provenance collapsed at the end. Two
   mark systems that never share a table: coverage `● ◐ ○ n/a ᴴ` (§4 only) and source `✅ ↪ ⚠️`
   (§6–§10 only). New rule 9: high signal, low noise. New mode `--restructure`. The 33-row
   checklist stays inline and gains an anchor column.
2. **`scripts/check-doc-links.mjs`** resolves `#anchor` against the target file's heading slugs.
   Still only "links resolve" — no content guard.
3. **The sample: `content/claude-code.md`**, from sources, on the v2 skill, by a feature-lead. One
   page; `content/claude-code/` stays as the deep read it links out to. New column in
   `04-harness-alignment.md` §2; anchor citations in `02-component-matrix.md` §1; rows in
   `90-short-profiles.md` and `index.md`; README highlight cell re-pointed.
4. **Render evidence** from branch `template-v2` on github.com: mermaid renders, `<details>` renders,
   `content/claude-code.md#2b-hooks` opens the collapsed layer in Chrome, Safari, Firefox. Fragment
   navigation failing anywhere → layout B (headings outside, small `<details>` per row) before
   any fan-out.
5. **W8b** — Pi `--restructure` pilot, then Hermes · OpenClaw · OpenCode · Grok · Codex · Gas City ·
   LoomWarp · FRACTAL restructured (no re-read; marks copied from the 04 column; diagram slots
   written as recorded gaps). Grid obligations serialized by the architect. `content/pi-draft.md`
   and `content/claude-code-draft.md` archived by ruling once their real profiles exist.
6. **W8c** — the diagram pass over the eight: inventory, redraw map + workflows, `updated:` bumped.

## Acceptance criteria

- **AC-1** For every v2 profile: `## 6. Details` starts at or before line 220; the file is ≤ 600
  lines; 33 matrix rows and 33 `####` detail headings in checklist order; the matrix totals equal
  the card's Coverage row and the harness's column totals in `04-harness-alignment.md` §2.
- **AC-2** No `◐` outside `## 4.`–`## 5.`; no `✅`, `↪` or `⚠️` before `## 6.`; zero `◐ (proposal)`.
- **AC-3** Every embedded mermaid block diffs empty against its `assets/projects/<harness>/*.mmd`;
  every `%%` header carries page · sha · read date; a DERIVED overlay says so in header and caption;
  no workflow the vendor does not describe as a sequence.
- **AC-4** `node scripts/check-doc-links.mjs` PASS with anchors resolved; the render check in
  deliverable 4 passed and is recorded with the date and browsers in the HANDOFF.
- **AC-5** KD reviewed the rendered sample on the branch and said what changed; the skill was
  revised from the sample's `Skill findings` before the fan-out started.
- **AC-6** The skill never reads the 33 rows from a file; `CLAUDE.md` and the concepts doc are cited
  by name.

## Session shape

1. Architect: branch `template-v2`; PRD; ISSUE-006; SKILL v2; link checker; `CLAUDE.md`, `README.md`,
   `assets/README.md` edits. Commit per unit.
2. Dispatch: *"use the feature-lead agent to execute workstream `fractal/workstreams/W8-template-v2.md`,
   deliverable 3, for harness Claude Code."*
3. Push the branch; render check; KD review; skill revision; merge.
4. W3 (vocabulary) runs in the same window, interactive, independent.
5. W8b pilot → fan-out → serialized grid edits → W8c → W4 resumes on v2.

## Do NOT

- Dispatch any W4 teardown before deliverable 4 passes and KD has reviewed the sample.
- Regenerate a v1 profile from sources under W8b — restructure only; the diagram pass is W8c.
- Re-score any existing grid cell during a restructure; copy the column, re-point the citations.
- Put coverage marks in §6–§10 or source marks in §4. Put mermaid inside `<details>`.

---

*Brief: KD's review, 2026-09-04 (quoted in the plan's Context). Plan:
`~/.claude/plans/reviewing-some-of-the-rippling-shannon.md`. Prior template: W2.*
