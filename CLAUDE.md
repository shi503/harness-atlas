# harness-atlas — conventions

A benchmarking and systems-design instrument for agent harnesses: decompose any harness into named
primitives, score it against a fixed component list, and place it on a maturity range. LoomWarp is
one peer column here, scored by the same rules, with no special status.

## Shape — three tiers, every link bidirectional

| Tier | Where | Rule |
|---|---|---|
| 1 · the shape | `index.md` | One screen. The grid first, the maturity range second. Every noun links down. No prose walls |
| 2 · components | `components/<id>-<name>.md` | One page per component, ~80 lines: what it is, the single best example, the comparison table with a `structured output` row, every cell linking into a Tier-3 anchor |
| 3 · harnesses | `harnesses/<name>.md` | One page per harness, in the shape `skills/harness-teardown/SKILL.md` prescribes. Anchored per section |

Cross-cutting: `vocabulary.md` (term → concept → who says it → our component → instances) and
`maturity/` (the range argument and `grid.html`, the instrument).

Un-recut material lives under `spec/`, `comparisons/`, `craft/`. History lives under `archive/`.
`RULING-2026-09-02-spinout.md` says what came from where.

## Standing rules

- **Markdown is not code.** No guard-gating, count checks, vocabulary checks, or generator contracts. The whole bar is: links resolve (`node scripts/check-doc-links.mjs`) and git is clean.
- **Absence is recorded, never inferred.** Every `○` in a grid names the pages that were checked.
- **A primitive set is 5–7 and forces a choice.** A set that grows without bound is a feature list wearing the word.
- **Do not borrow a word and change its referent.** The vocabulary ledger exists so two systems doing the same thing under different names stay classifiable.
- **Archive by ruling, never by deletion.** A vocabulary retires by writing a ruling, publishing a crosswalk, and re-heading the loser.
- **Vendor's words only** in a teardown's primitives table. Verbatim, cited, dated.

## Frontmatter

`status:` is one of `DRAFT · ACTIVE · PERMANENT · ARCHIVED · SUPERSEDED`. Provenance is a separate
field: `provenance: INHERITED | OBSERVED | DERIVED | AUTHORED`. Everything under `archive/` is
`ARCHIVED` or `SUPERSEDED`.

## Workstreams

FRACTAL runs **un-routed** here: no router, no blueprint YAML, no state file. A workstream is a PRD
in `fractal/workstreams/`, executed by the `feature-lead` agent (or interactively with KD where the
PRD says `Mode: interactive`), and closed by a `HANDOFF.md` beside it. Defects in the process go in
`fractal/ISSUES.md`, append-only.

Skills live at repo-root `skills/`, never `.claude/skills/`. A distributable skill carries its
operational checklist inline and cites canonical guides by name, never by path.

## Agent skills

### Issue tracker

Issues and specs live as FRACTAL workstream PRDs under `fractal/workstreams/`, not a separate ticket
store. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-role vocabulary (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix),
applied as a `Status:` line in a PRD's header. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root, created lazily. See
`docs/agents/domain.md`.
