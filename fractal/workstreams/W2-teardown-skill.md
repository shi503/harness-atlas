# Workstream PRD: W2-teardown-skill

**Epic:** harness-atlas — the re-cut
**Mode:** headless
**Dependencies:** W0 landed. Blocking for W4.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W2-teardown-skill-HANDOFF.md`.

> **Amended 2026-09-03 by W0.** Authored directly in the W0 session by the architect, not dispatched
> headless — KD's call (*"you are drafting the high-level and key pages… the template for a
> tear-down"*). `harnesses/` is now `content/`. The sanity run (AC-2) is three harnesses, not one, and
> writes `content/<name>-draft.md`. The layer renumber was struck, so AC-3 binds to the original
> twelve. A **diagram rule** was added: redraw the harness's own architecture diagram as mermaid under
> `assets/projects/<harness>/` when its docs carry one; never invent one. Sanity outputs are run by
> sub-agents in parallel.

## Goal

Codify **Template A** — the shape all five files in `content/` already share byte-for-byte — as a
skill, so teardowns can fan out to one feature-lead per harness and come back comparable. This is
the highest-leverage artifact in the epic.

## Deliverable

`skills/harness-teardown/SKILL.md`. Frontmatter: `name`, `description`, `argument-hint`,
`disable-model-invocation: true`, `allowed-tools` scoped to read, grep, glob, `gh api`, write. The
**33-row component list is inline in the skill** — never read from `spec/`. Sections, in order:

| § | Contents | Rule |
|---|---|---|
| frontmatter | `title · tier · project · created · status · owner · source (repo @ sha · docs · read <date>) · provenance: OBSERVED` | |
| opener | `**Why this file exists.**` / `**In one screen.**` / `**What it does not claim.**` | fixed, bolded, three paragraphs |
| legend | `✅ direct · ◐ relayed · ⚠️ unverified` | every factual cell carries one |
| **A** Identity | 13-row field table · verbatim *"what it says it is"* quotes · the three-question inclusion test (does state persist, and where? does it serve more than one person? does it bind mechanically or only by prose?) · **the loop question** from `comparisons/04-harness-alignment.md` §4.1 (only it separates a host from a runtime) · harness-or-process-layer probe · primitive preview | |
| **B** 33 rows | fixed order `0a`…`11a` | absence is written `**Nothing here** — checked README, docs index, settings, examples`. Never inferred |
| **C** Primitives | `Primitive · path/key · project's own definition (verbatim) · source` | vendor's words only. Count them: 5–7 healthy, 12+ accommodation failure, a published refusal list is the strongest form |
| **D** Limitations | blockquotes grouped by source doc | no commentary |
| **E** Sources | primary (repo/API, the literal `gh api` commands run) / secondary | |
| **F** Could NOT verify | bulleted, marked, reasoned | mandatory and non-empty |

**Downstream obligations, encoded as skill steps** because skipping them is a live bug (ISSUE-001):
(a) a row in `comparisons/systems/90-short-profiles.md` marked *Torn down `<date>`*; (b) a column in
`comparisons/04-harness-alignment.md` §2; (c) a column in `comparisons/02-component-matrix.md` §1;
(d) a `structured output` line — the one artifact this harness optimises.

## Acceptance criteria

- **AC-1** The skill never references a path in this repo for its checklist; it cites `CLAUDE.md`
  and the concepts doc by name.
- **AC-2** Sanity run: execute the skill in `--sanity` mode against **three** harnesses that already
  have material in the corpus — Pi (the cleanest existing Template-A page), Claude Code and Gas City
  (both documentation-dense, "a-tier candidates") — each into `content/<name>-draft.md`. Pi is
  diffed against `content/pi.md`; the other two are read against `content/claude-code/` and
  `comparisons/systems/gas-city.md`. Record in the HANDOFF whether the result holds up section by
  section. Differences are findings about the skill, not edits to the existing pages. Whether any
  draft is promoted to a real profile is a later decision, not this workstream's.
- **AC-3** Every one of the 33 rows in the inline list matches the IDs in
  `spec/v1-framework/CROSSWALK.md` §0 — the original twelve layers. The renumber was struck.

## Do NOT

- Read the 33 rows from a spec file at runtime. Edit any existing teardown. Add a 34th row.

---

*Brief: handoff §6 · house convention: skills at repo-root `skills/` · the distribution rule from `standards/README.md` rule 3, quoted in `CLAUDE.md`.*
