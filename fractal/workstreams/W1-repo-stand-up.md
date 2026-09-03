# Workstream PRD: W1-repo-stand-up

**Epic:** harness-atlas — the re-cut
**Mode:** headless (executed 2026-09-02 in the spin-out session; recorded here so the epic is whole)
**Dependencies:** none. Blocking for everything else.
**Routing:** un-routed. Terminal artifact: `fractal/workstreams/W1-repo-stand-up-HANDOFF.md`.

## Goal

A sibling repo that holds the corpus, resolves every link, has a settled status enum, and can run a
feature-lead against a PRD without a router.

## Deliverable

`RULING-2026-09-02-spinout.md` and the tree it describes: `index.md` stub, `harnesses/`,
`comparisons/`, `maturity/`, `craft/`, `spec/`, `archive/`, `vocabulary.md` seed, `CLAUDE.md`,
`.claude/agents/{architect,feature-lead}.md`, `fractal/ISSUES.md`, the eight PRDs,
`scripts/check-doc-links.mjs` and the one-shot `scripts/rewrite-paths.mjs`.

## Acceptance criteria

- **AC-1** `git status` was clean in the source repo before the copy (checkpoint `de3ce64`).
- **AC-2** `node scripts/check-doc-links.mjs` exits 0. Zero inline links point at `specs/v0/`.
- **AC-3** `grep -rh '^status:' . | sort -u` shows only the five enum values.
- **AC-4** The source repo marks every copied file `SUPERSEDED` with a `superseded_by:` pointer and
  carries its own dated ruling.
- **AC-5** Pushed to `github.com/shi503/harness-atlas`.

## Do NOT

- Re-cut anything. Install a router. Rewrite the seven scripts that stay.

---

*Brief: handoff §3, §4, §9, §11.*
