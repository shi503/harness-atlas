# HANDOFF: W3-vocabulary-ledger

**Epic:** harness-atlas — the re-cut
**Mode:** interactive — with KD, 2026-09-04, in the same session as W8a.
**PRD:** `W3-vocabulary-ledger.md` (amended 2026-09-03: `content/`).
**Method:** a read-only harvest by a sub-agent (`scratchpad/W3-harvest.md`, 78 term rows from nine
profiles, two drafts, the two grids and seven short teardowns), then eight classification questions
put to KD with recommended answers; `vocabulary.md` written from the answers.

## Produced

`vocabulary.md`, filled. §1 concepts: 1.1 collisions, one row per referent (`workspace` × 6, `session`
× 5, `agent` × 3 shapes, `command`, `policies`, `harness` × 3, `bot`); 1.2 seventeen synonym sets;
1.3 the five orphans ruled (`gateway`, `runtime` → altitudes; `sandbox` → absorbed at `2c`/`6b`;
`session`, `workspace` → collisions); 1.4 the seeded terms; 1.5 undercounts. §2 the index, system →
primitive → component, for every profile and every short teardown.

## KD's rulings (the corrections log)

| # | Question | Ruling |
|---|---|---|
| 1 | HQ's "five pillars" — no source in the repo | *"if you're citing that indigo's own documentation says that it's 11, then you can replace their reported architecture."* Row rewritten to the eleven rows `indigo-hq.md` documents, marked relayed; "five pillars" and the "Projects" gloss dropped |
| 2 | `workspace` / `session` collisions — row shape | *"they should get their own meaning within that system, but likely point to a concept/component that we have listed."* One row per referent, each classified; standing line: neither word may name a future component |
| 3 | Vendor-named objects our §C missed | Record them, flag `UNDERCOUNT`; profile gaps → ISSUE-007 |
| 4 | `●` cells with no nameable primitive | Downgrade to `◐` with a dated note; `0a` keeps `●` under a stated convention → ISSUE-008; `W6-matrix-backfill.md` amended |
| 5 | `session`-as-transcript | `5a` and `8b`, as written |
| 6 | Instruction files (`AGENTS.md` / `CLAUDE.md` / rules) | `3d` Configuration, as written |
| 7 | Hooks folded into Pi `extension` / OpenCode `plugin` | `●` at `2b` — the extension is the named unit; the design disagreement is the ledger row |
| 8 | OpenClaw at `7a` — six task-shaped objects | `◐`, none the single sanctioned way. **Grid cell to change** (04 §2 OpenClaw `7a`, currently `●`) — applied by W8b when OpenClaw is restructured, or by W6 |

**AC-4** (KD corrected at least one classification live): ruling 1 rewrote a seeded row; ruling 8
changes a grid cell.

## Acceptance criteria

- **AC-1** Every `●` in `02-component-matrix.md` §1 has its primitive name in the ledger — **met with
  a named exception list**: the cells no teardown can name are ISSUE-008, and KD's ruling turns them
  into `◐` rather than inventing a name.
- **AC-2** The five orphan nouns each have a row saying which component absorbs them or that they are
  an altitude, with the citation — met (§1.3); harvested from the vendors' own words, never invented.
- **AC-3** No row borrows a word and changes its referent — met by construction: collisions are split
  per referent, and HQ's *Projects* (the test case) is gone because it had no source.
- **AC-4** — met, above.

## Open items

- **Anchors.** §2 cites `§C` by prose; once a profile is on Template v2 its rows are addressable as
  `content/<name>.md#<id>-<slug>` and the index should link them (W8b re-points).
- **Pi's count** (8 + 3 vs 5 + 3) — re-run under rule 4 in W8c.
- **`murmur` (SageOx)** — no verbatim definition found; not classified.
- **FRACTAL / LoomWarp `●` cells at Agent definitions etc.** — their profiles now exist
  (`content/fractal.md`, `content/loomwarp.md`); W6 re-sources those cells from the profiles.
- **Claude Code's rows** in §2 are from the sanity draft; replace from `content/claude-code.md`
  (v2, 2026-09-04) when W6 or the next ledger pass touches them — 8 primitives, contestable.

## Commits

`94866c1` — `vocabulary.md`, ISSUE-007, ISSUE-008, W6 amendment. This HANDOFF rides with the W8
skill-revision commit.
