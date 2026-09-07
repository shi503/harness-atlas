# Workstream PRD: W10-deep-read-and-wiki-nav

**Epic:** harness-atlas — the re-cut
**Mode:** interactive — with KD (two open decisions in §Open); headless fan-out once a deep read is commissioned
**Dependencies:** W9 phase 1 (the `1b. Contents` subsection this extends). Does not block W8b.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W10-deep-read-and-wiki-nav-HANDOFF.md`.

## Goal

KD, 2026-09-07, reviewing the Claude Code profile:

> *"the project teardown and consolidated guide that claude code has (others do not) is actually still
> valuable … and we would likely want to turn this type of content into a skill and then run it for
> highlighted projects"*

> *"create a skill for each project table of contents — project index.md and table of contents index
> footer — similar to a wiki where you can see other related categories and topics, it's likely that
> we'll need to create a skill that can index and maintain a footer 'project table of contents' that
> is updated generated to create a 'wiki-style' navigation for these .md files"*

Two skills. One **produces** a deep read; the other **navigates** what exists. They are separate
because they run at different times and on different cadences — a deep read is commissioned once per
highlighted harness; navigation is maintained continuously across the whole tree.

**The prior art is one folder.** `content/claude-code/` — twelve documents, 4,045 lines, organized by
**extension surface** rather than by the 33 components, with a consolidated guide at `20-`. It is the
only one in the corpus and it predates the spin-out. It is also the reason the profile can stay at 719
lines: §6's detail rows link out instead of inlining full field and event tables.

## Deliverable

### 1. `skills/harness-deep-read/SKILL.md` — the reference-set skill

Generalizes the `content/claude-code/` genre into a repeatable one. Must specify at minimum:

- **What a deep read is, and what it is not.** It is a finer-grained companion to a profile's §6, cut
  by the vendor's *own* surface vocabulary, not by the 33 components. It is **not** a second profile,
  not a rewrite of the docs, and not a place for corpus placement or comparison.
- **The house-neutral framing.** The existing folder's `00-README.md` opens *"LoomWarp is an agent-OS
  built on top of Claude Code… every capability LoomWarp duplicates is maintenance debt"* — pre-spin-out
  framing that now violates rule 9 (*a profile describes its harness and nothing else*). The skill must
  state the neutral form and the existing folder must be re-headed to it.
- **The file shape**: `00-README.md` as the folder index with provenance and a freshness statement;
  `NN-<surface>.md` documents numbered from `01`; a consolidated guide at `20-`; the `30-` slot
  reserved for a consumer-specific gap analysis that **lives with the consumer, not here** (this is
  exactly what happened to `30-gap-analysis-loomwarp.md` at the spin-out).
- **The link contract, both directions.** The profile's `1b. Contents` links every document by name;
  §6 detail rows link out to the document that carries the full table; the folder's `00-README.md`
  points back up to the profile as the entry point.
- **Provenance.** Every document carries the docs root, the read date, and the version at capture.
  A deep read is a **snapshot**, and the skill must say how a stale one is marked rather than silently
  trusted — the existing folder is a 2026-08-10 read cited by a 2026-09-04 profile, and says so.
- **Rules inherited by name**, not by path: vendor's words only; absence recorded, never inferred;
  primary sources first; high signal, low noise.

### 2. `skills/wiki-nav/SKILL.md` — the navigation skill

Maintains wiki-style navigation across the tree. Must specify:

- **The footer block** — a delimited, regenerable region at the foot of a markdown file carrying:
  where this page sits, its siblings, its parent index, and related categories. Delimited so the skill
  can rewrite the block without touching authored prose.
- **The folder index** — `00-README.md` per content folder, listing its documents with a one-line
  description each.
- **Which files get one, and which never do.** Candidate: `content/**`, `components/**`, `spectrums/`,
  `comparisons/`. Never: `archive/**` (frozen), `fractal/workstreams/**` (a PRD is not a wiki page),
  or `README.md`/`index.md` (Tier 0 and 1 are hand-authored — the manifesto is not generated).
- **Idempotence.** Running it twice produces no diff. This is the property that makes it safe to run
  after every workstream.
- **The relationship to Tier 0/1.** `index.md` stays the hand-authored one-screen shape. The footer is
  *local* navigation — siblings and parents — and never duplicates the index's curated reel.

## Acceptance criteria

- **AC-1** `node scripts/check-doc-links.mjs` PASS with anchors. Every generated footer link resolves.
- **AC-2** `git status` clean.
- **AC-3** **Neither skill ships a script.** Both are agent-run, per `CLAUDE.md` — *markdown is not
  code; no guard-gating, no generator contracts*. "Regenerable" means an agent rewrites a delimited
  block by reading the tree, not that a `.mjs` file does. A footer that only a script can maintain is
  a generator contract and is out of scope. (The repo has already been burned here once — see
  ISSUE-009, where a doc claims `grid.html` is generated by a script that did not survive the spin-out.)
- **AC-4** `wiki-nav` is **idempotent**: run twice on a clean tree, the second run produces no diff.
- **AC-5** Each skill carries its operational checklist **inline** and cites canonical guides **by
  name, never by path** — the distributable-skill rule in `CLAUDE.md`.
- **AC-6** `content/claude-code/00-README.md` is re-headed to the house-neutral framing, its
  `project: loomwarp` frontmatter corrected to `harness-atlas`, and its document count reconciled
  (12 local, the thirteenth cited as living with LoomWarp — see ISSUE-010).
- **AC-7** The deep-read skill is exercised on **one** harness end to end before any fan-out, the way
  W8 exercised Template v2 on a sample before restructuring eight.

## Do NOT

- Write a script to generate footers, indexes, or counts. See AC-3.
- Put a footer on `README.md`, `index.md`, or anything under `archive/`.
- Let a deep read restate the profile. It exists to hold what §6 links **out** to.
- Commission deep reads for every harness. They are for **highlighted** projects — the selection rule
  is an open decision below, and until it is ruled, one harness.
- Reuse the `30-` slot for anything but a consumer-specific gap analysis, and never keep one here.

## Open — two decisions for KD

1. **Which harnesses are "highlighted"?** A deep read is roughly 4,000 lines of work. Candidate rules:
   the harness the team runs on (Claude Code alone, today); every harness scoring `+3` on DX-5
   Ecosystem; or a standing list KD maintains. **Recommendation: a standing list**, because the other
   two make the corpus decide, and the cost is high enough that a person should.
2. **Does the wiki footer go on profiles at all?** A profile already has `1b. Contents`. A footer would
   be a second navigation block on the same page. **Recommendation: no footer on `content/*.md`
   profiles** — `1b` is that page's navigation; the footer serves the deep-read folders, `components/`,
   and `comparisons/`, which have no equivalent.

---

*Brief: KD, 2026-09-07, reviewing the rendered Claude Code profile at W8a AC-5. Prior art:
`content/claude-code/`, twelve documents, the only deep read in the corpus.*
