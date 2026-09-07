# harness-atlas — conventions

A benchmarking and systems-design instrument for agent harnesses: decompose any harness into named
primitives, score it against a fixed component list, and place it on a maturity range. LoomWarp is
one peer column here, scored by the same rules, with no special status.

## Shape — three tiers, every link bidirectional

| Tier | Where | Rule |
|---|---|---|
| 0 · the manifesto | `README.md` | The argument and the highlights, what GitHub renders first. KD's problem statement verbatim, the five-minute script, the anatomy diagram, a curated reel — never the full list |
| 1 · the shape | `index.md` | One screen. The grid first, the maturity range second, the layers, the words. Every noun links down, including every profile. No prose walls |
| 2 · components | `components/<id>-<name>.md` | One page per component, ~80 lines: what it is, the single best example, the comparison table with a `structured output` row, every cell linking into a Tier-3 anchor |
| 3 · profiles | `content/<name>.md` | One page per harness, in the shape `skills/harness-teardown/SKILL.md` prescribes (Template v2 since 2026-09-04: card → system map → workflows → `●◐○` matrix → primitives → collapsed details). Anchored per component: `content/<name>.md#<id>-<slug>`, e.g. `#2b-hooks`. A deep-read folder `content/<name>/` may sit beside the page and is linked out to, never inlined. (Was `harnesses/` until 2026-09-03 — renamed in W0 to match the 12-factor-agents page architecture) |

Cross-cutting: `vocabulary.md` (term → concept → who says it → our component → instances),
`spectrums/` (the sheet's two faces — `01-scorecard.md`, seven DX dimensions for a thirty-second read,
over `00-README.md`'s ten `−3…+3` axes; scores in `positions/<harness>.yaml`, rendered in
`positions.md`. Neither grades, bar one declared dimension), `RULINGS.md` (the index of decisions that
changed a rule, an id or a name — the text stays where it was written),
`maturity/` (the range argument and `grid.html`, the instrument), and `assets/` (`templates/` for the
standardized core-concept diagrams, `projects/<harness>/` for per-harness ones; `.mmd` is canonical,
pages embed a copy, a `.png` beside it is an optional render).

Component IDs are the **original twelve layers** (`0a`…`11a`, per `spec/v1-framework/CROSSWALK.md`
§0). The 13-layer renumber in the consolidated guide §1 was struck in W0 on 2026-09-03: the landscape
moves too fast to keep re-minting IDs.

Un-recut material lives under `spec/`, `comparisons/`, `craft/`. History lives under `archive/`.
`RULING-2026-09-02-spinout.md` says what came from where.

## Standing rules

- **Markdown is not code.** No guard-gating, count checks, vocabulary checks, or generator contracts. The whole bar is: links resolve (`node scripts/check-doc-links.mjs`) and git is clean.
- **Absence is recorded, never inferred.** Every `○` in a grid names the pages that were checked.
- **A primitive set is 5–7 and forces a choice.** A set that grows without bound is a feature list wearing the word.
- **Do not borrow a word and change its referent.** The vocabulary ledger exists so two systems doing the same thing under different names stay classifiable.
- **Archive by ruling, never by deletion.** A vocabulary retires by writing a ruling, publishing a crosswalk, and re-heading the loser.
- **Vendor's words only** in a teardown's primitives table. Verbatim, cited, dated.
- **Coverage marks and source marks never share a table.** `● ◐ ○ n/a` say how much of a component a system ships and live in the grids and a profile's matrix; `✅ ↪ ⚠️` say whose words a claim rests on and live in a profile's details and provenance. `◐` is never a source mark.
- **High signal, low noise.** A profile describes its harness and nothing else — no corpus placement, no "why this file exists", no comparison to another harness. The grids compare.

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

### Intake

How a newly-discovered thing is recorded and routed: four triggers, five states (NOTICED → RESEARCHED
→ PROBATION → ADMITTED → REJECTED), and a routing table naming each source of truth and its sync cost.
A 34th component costs 24 edits, which is why probation exists. See `docs/agents/intake.md`.

### Domain docs

Single-context: `CONTEXT.md` + `docs/adr/` at the repo root, created lazily. See
`docs/agents/domain.md`.
