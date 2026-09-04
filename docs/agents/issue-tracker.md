# Issue tracker: FRACTAL workstreams

Issues and specs for this repo live as FRACTAL workstream PRDs, not GitHub issues or a generic
`.scratch/` tracker. This repo already runs its own un-routed FRACTAL process (see `CLAUDE.md` →
Workstreams); this file wires the mattpocock skills' generic "issue tracker" vocabulary onto that
process rather than introducing a second, competing one.

## Conventions

- A **ticket** (in mattpocock-skills' vocabulary) is a **workstream PRD**: one file per workstream at
  `fractal/workstreams/<Wn>-<slug>.md`, numbered sequentially from the next unused `Wn`.
- Every PRD opens with the same header block: `**Epic:**`, `**Mode:**` (`headless`, or
  `interactive — with KD` when the PRD says so), `**Dependencies:**` (prose, naming blocking `Wn`s or
  `none`), `**Routing:**` (always `un-routed` — no router, no blueprint YAML, no state file), followed
  by `## Goal`, `## Deliverable`, `## Acceptance criteria`, and `## Do NOT`.
- A workstream closes with a `HANDOFF.md` beside its PRD: `fractal/workstreams/<Wn>-<slug>-HANDOFF.md`
  (or one per fan-out unit, e.g. `fractal/workstreams/W4-<harness>-HANDOFF.md`, when a PRD says
  "fan out").
- **Process defects** (bugs in the FRACTAL process itself, not product/feature work) don't get a PRD —
  they're appended as a new `## ISSUE-NNN — <title>` entry to `fractal/ISSUES.md`, with
  `**Severity:**` (`CRITICAL`/`WARN`/`MINOR`), `**Found:**`, and `**Assigned:**` fields, per the file's
  existing entries.

## When a skill says "publish to the issue tracker"

For planned work (a new workstream from `/to-tickets`, or a task `/triage` marks ready-for-agent):
create a new PRD at `fractal/workstreams/<Wn>-<slug>.md`, following the header shape above, with `Wn`
the next unused number.

For a process defect: append an entry to `fractal/ISSUES.md` instead — never a PRD.

## When a skill says "fetch the relevant ticket"

Read `fractal/workstreams/<Wn>-<slug>.md` directly (the user will normally give the `Wn` id or the
path). For a process defect, read its `## ISSUE-NNN` entry in `fractal/ISSUES.md`.

## Triage state

This repo's PRDs don't currently carry a triage `Status:` line — a PRD only exists once it's ready to
build. When `/triage` lands a raw report here, add a `**Status:**` line to the header block (values
from `docs/agents/triage-labels.md`) so its triage state travels with the file until a `feature-lead`
picks it up.

## Wayfinding operations

Used by `/wayfinder`, for the foggy pre-PRD phase — a fog-clearing scratch process distinct from the
workstreams that survive it. Kept out of `fractal/workstreams/` so an in-flight map never looks like a
committed PRD:

- **Map**: `fractal/wayfinding/<effort>/map.md` (the Notes / Decisions-so-far / Fog body).
- **Child ticket**: `fractal/wayfinding/<effort>/issues/NN-<slug>.md`, numbered from `01`, with the
  question in the body. A `Type:` line records the ticket type (`research`/`prototype`/`grilling`/
  `task`); a `Status:` line records `claimed`/`resolved`.
- **Blocking**: a `Blocked by: NN, NN` line near the top. A ticket is unblocked when every file it
  lists is `resolved`.
- **Frontier**: scan `fractal/wayfinding/<effort>/issues/` for files that are open, unblocked, and
  unclaimed; first by number wins.
- **Claim**: set `Status: claimed` and save before any work.
- **Resolve**: append the answer under an `## Answer` heading, set `Status: resolved`, then append a
  context pointer to `map.md`'s Decisions-so-far.
- **Collapse**: when the map clears, run `/to-spec` on it to produce a real
  `fractal/workstreams/<Wn>-<slug>.md` PRD. The map and its children aren't deleted, but they stop
  being the source of truth once the PRD lands.
