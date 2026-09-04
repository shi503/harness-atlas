# HANDOFF: W0-alignment

**Epic:** harness-atlas — the re-cut
**Mode:** interactive — with KD, 2026-09-03. Session: https://claude.ai/code/session_01LYBCAHQe1GS1PCoUdGoZo5
**PRD:** `W0-alignment.md`. Brief: `archive/sessions/NEXT-STEPS-framework-spinout.md` §2, §5, §10.
**Method:** the `grilling` interview (mattpocock-skills), four rounds plus a closing round; every
decision below was put to KD as a question with a recommended answer, and the answer recorded.

## 1. Decisions — the corrections log

Numbered in the order they were made. KD's words are quoted where they were verbatim.

1. **This session is W0.** *"yes, this is the alignment."* Everything below is the gate's output.
2. **The manifesto lives in `README.md`**, not `index.md`. Both files stay: README is the argument
   and a curated reel (*"pull out the interesting ones + Loomwarp and FRACTAL"*); `index.md` is the
   one-screen shape and links to every profile. The agent's proposal to fold `index.md` into README
   was **rejected** — *"Keep both."*
3. **Authoring split.** The architect drafts the high-level pages in-session — README, `index.md`,
   the teardown skill, the core diagrams; per-harness teardowns are dispatched to sub-agents *"to
   preserve our context window."*
4. **Rendering:** plain markdown, GitHub is the viewer, links must work when clicked. No build step.
5. **`harnesses/` → `content/`.** The agent had summarised "no new `content/` directory"; KD
   corrected: *"we still need the content/ folder which would probably hold each of the teardown
   pages."* Confirmed as a rename: *"simpler than specifying to harness vs agent vs whatever else
   people adopt and follows similar webpage architecture"* — the `12-factor-agents` shape
   (`README.md` → `content/<page>.md`, `img/`).
6. **`assets/` is new**, split `templates/` (standardized core-concept diagrams) and
   `projects/<harness>/` (per-harness diagrams, drawn only when the harness's own docs carry one).
   `.mmd` is canonical; a `.png` beside it is an optional render, cut after the diagram stops
   changing. *"eventually we want the README.md to have a .png so it just renders."*
7. **Three diagrams now, all mermaid:** the twelve-layer stack, the harness-loop anatomy, the wiki
   map.
8. **The teardown skill is written now**, in this session (W2 pulled forward), and standardized so it
   produces *"a comprehensive 'profile'."*
9. **The W2 sanity run is a sanity run.** The agent proposed promoting the Claude Code and Gas City
   runs to real profiles; KD: *"it was a sanity check. we can keep with the W2 plan… we'll decide if
   we want to keep them later or not."* Three harnesses (Pi, Claude Code, Gas City), outputs at
   `content/<name>-draft.md`.
10. **The layer renumber is struck.** *"let's strike the layers numbers since they're just causing
    conflicts and the landscape evolves quickly."* Original twelve; `CROSSWALK.md` §0 is the ID
    authority.
11. **W4 queue:** Codex → **Gas City** (*"replace goose. never heard of it."*) → LoomWarp →
    **FRACTAL** (*"add it"*) → the nine untorn.
12. **PRDs amended in place**, each with a dated line, not HANDOFF-only. Commits per logical unit,
    no push.

**AC-3** (KD said "that's wrong" and the page changed in-session): met three times — items 2, 5, 9.

## 2. The front page (Deliverable 1 · AC-1, AC-4)

- `README.md` — Tier 0, the manifesto. Opens with KD's problem statement **verbatim, spelling fixed
  only**, attributed *"KD, 2026-09-03"* — that paragraph is the AC-4 draft KD wrote. Then the
  five-minute script in HQ's three-beat form (*memory lives in files → the harness loads them → the
  system compounds*), the harness-loop anatomy diagram, "how to read a profile", a six-harness
  highlight reel (Claude Code, Pi, Hermes, Gas City, LoomWarp, FRACTAL), the wiki map, the standing
  rules in one line.
- `index.md` — Tier 1, rebuilt from the stub. Instrument → range → layers → words. Links **every**
  profile (six on the template or pre-template, seven short teardowns, the queue in order). Embeds
  the layer stack. Records the renumber as struck. Every link resolves (checker: 1,414 links, PASS).
  AC-1's "one screen at 100% zoom" is close but not measured; KD to judge on first read.
- `CLAUDE.md` — Shape table gains Tier 0; Tier 3 is `content/`; `assets/` and the ID ruling added.

## 3. The ranked carry-forward list (Deliverable 2 · AC-2)

Rank · asset · form (*as-is · trimmed · rebuilt · archived*) · reason. The starting order from the
brief held; nothing in the interview contested it. Additions are marked.

| # | Asset | Form | Reason |
|---|---|---|---|
| 1 | `comparisons/02-component-matrix.md` | as-is | The most effective page in the corpus. Prose labels stale (ISSUE-003), W6 |
| 2 | The five Template-A profiles → `content/{pi,hermes,openclaw,opencode,grok}.md` | as-is | Already the shape the skill codifies; the skill was derived from them |
| 3 | `comparisons/01-concepts.md` §3.17 | as-is | The definition of a primitive; quoted in README |
| 4 | `comparisons/04-harness-alignment.md` §2, §4.1 | as-is | The 33-row view and the loop question; §4.1's altitude table is now the README's "altitude" column |
| 5 | `maturity/AI-Native-Organizational-Maturity-Framework.md` + `grid.html` | as-is until W7 | The range; re-pointed to `graded:` components in W7 |
| 6 | `content/claude-code/` (13 docs, 2026-08-10) *(added)* | as-is, as a **source** | Pre-template deep read. Its §1 "seven insertion points" seeded the harness-loop diagram. A template profile is the W2 sanity draft; promotion is a later call |
| 7 | `spec/v1-framework/00-consolidated-guide-and-mental-model.md` | trimmed (mined) | The layer-stack drawing was lifted into a mermaid diagram with the **original** numbering; the rest stays un-recut. Its §1 renumber is now explicitly not canon |
| 8 | `spec/v1-framework/content/component-*.md` (33) | rebuilt | W5, from a template, ~80 lines each; then archived with `superseded_by:` |
| 9 | `comparisons/systems/*.md` short teardowns (Gas City, HumanLayer, Deep Agents, Indigo HQ, QM, SageOx, gstack/gbrain) | as-is until W4 promotes each | Sources for template profiles; Gas City is second in the queue |
| 10 | `comparisons/systems/kd-built-frameworks/` | as-is | Source for the FRACTAL peer profile (W4 #4) |
| 11 | `vocabulary.md` seed | as-is → filled in W3 | Load-bearing; next interactive workstream |
| 12 | `craft/` | as-is | The sizing lens; not on the front page |
| 13 | `spec/EXPLAINER-PLAN.md` | **superseded** by `README.md` | Was the seed for the front door; the front door now exists. Re-head to `SUPERSEDED` with `superseded_by: README.md` in the next pass — not done in W0, which moved nothing else |
| 14 | `archive/**` | archived | By ruling, already |

## 4. Move vs. rebuild (Deliverable 3)

The 33 components: **rebuild** (W5, unchanged). Everything else on the list above: **as-is**, with two
exceptions — the consolidated guide is mined not moved (#7), and `EXPLAINER-PLAN.md` is superseded
(#13). The "settle or strike" defaults: the five-value status enum was already settled in W1
(`CLAUDE.md` Frontmatter); the layer renumber is **struck** (decision 10).

## 5. Which of W2–W7 changed shape

| WS | Change | Where recorded |
|---|---|---|
| W2 | Authored in-session, not headless. Sanity run = 3 harnesses → `content/<name>-draft.md`. AC-3 binds to the original twelve. Diagram rule added. | `W2-teardown-skill.md`, amended block |
| W3 | Path only (`content/`). Still interactive, still next. | `W3-vocabulary-ledger.md` |
| W4 | Output dir `content/`. Queue: Codex → Gas City → LoomWarp → FRACTAL → nine. goose dropped. Four obligations (the `structured output` line was already the fourth). | `W4-teardowns.md`, amended block |
| W5 | Path only; renumber struck (strike-through kept visible). | `W5-component-pages.md` |
| W6 | Path; drafts excluded from AC-1; AC-4 closes ISSUE-003. | `W6-matrix-backfill.md` |
| W7 | No change. Still where the frontier past stage six gets written, not the README. | — |
| W1 | Done before this session. No change. | — |

## 6. W0's own "Do NOT", and where it was crossed

The PRD forbade running a teardown, rebuilding a component page, or moving a file. Three crossings,
each at KD's direction, each logged here rather than hidden:

1. **A move** — `git mv harnesses content` (commit `fb59b63`), plus a link-href pass over 20 files
   including `archive/`; historical prose untouched; checker PASS.
2. **W2 executed** — `skills/harness-teardown/SKILL.md` written (commit `bca15f1`).
3. **Three sanity teardowns dispatched** to sub-agents in `--sanity` mode. They write drafts only and
   touch no grid. Findings in §7.

## 7. Sanity-run findings (W2 · AC-2)

_Pending — three sub-agents running (Pi, Claude Code, Gas City). This section is appended when they
report, with a section-by-section verdict per harness and the consolidated list of skill defects._

## 8. Open items carried forward

- **PNG renders** for the three core diagrams: cut after KD's first correction pass, not before.
  (The Mermaid validator rendered all three valid on 2026-09-03.)
- **ISSUE-003** — stale `systems/harnesses/…` link labels in `comparisons/`. W6.
- **`spec/EXPLAINER-PLAN.md`** — re-head as `SUPERSEDED`. Next pass.
- **The highlight reel** links Claude Code, Gas City and FRACTAL to pre-template material until W4
  lands their profiles; each cell says so.
- **Hermes's `structured output`** in the README ("the kanban that owns *lifecycle truth*") is taken
  from its profile's opener, not from a `structured output` line — that line does not exist yet in
  the five existing profiles. W4's obligation (d) adds it to new profiles; the five existing ones
  need it back-filled. Log for W6 or a small follow-up.
- **`docs/agents/`** (mattpocock-skills tracker config) points the skills' generic "issue tracker"
  at `fractal/workstreams/`; wayfinder maps go under `fractal/wayfinding/`. Not FRACTAL canon, just
  wiring; delete if unused.

## 9. Next

1. **KD reads `README.md` and `index.md` and corrects live.** AC-1's one-screen call is KD's.
2. **W3 vocabulary-ledger** — interactive, next.
3. **W4 #1 Codex** — dispatch one feature-lead: *"use the feature-lead agent to execute workstream
   `fractal/workstreams/W4-teardowns.md` for harness Codex."*
4. Decide, after reading §7, whether any of the three drafts is promoted.

## Commits

| Commit | What |
|---|---|
| `5e2c2b3` | mattpocock-skills tracker config (`docs/agents/`, `CLAUDE.md` block) |
| `fb59b63` | `harnesses/` → `content/` rename + link pass |
| `fa12ef2` | README manifesto, index.md shape, CLAUDE.md |
| `bca15f1` | teardown skill, `assets/templates/` |
| _(next)_ | PRD amendments, ISSUE-003, this HANDOFF; then the three sanity drafts |
