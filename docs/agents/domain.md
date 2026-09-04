# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the
codebase.

## Before exploring, read these

- **`CONTEXT.md`** at the repo root, or
- **`CONTEXT-MAP.md`** at the repo root if it exists: it points at one `CONTEXT.md` per context. Read
  each one relevant to the topic.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in. In multi-context repos, also
  check `src/<context>/docs/adr/` for context-scoped decisions.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest
creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and
`/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

This repo's own vocabulary ledger — `vocabulary.md` (term → concept → who says it → our component →
instances) — is a separate, pre-existing artifact from `RULING-2026-09-02-spinout.md`'s spin-out. Treat
it as authoritative alongside `CONTEXT.md` once one exists; don't duplicate its entries into
`CONTEXT.md`.

## File structure

Single-context repo (this repo, and most repos):

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-....md
│   └── 0002-....md
└── (component/harness/comparison trees, per CLAUDE.md's Shape)
```

Multi-context repo (presence of `CONTEXT-MAP.md` at the root): not applicable here — no monorepo
signal was found (no `pnpm-workspace.yaml`, no `packages/*`).

## Use the glossary's vocabulary

When your output names a domain concept (in a workstream PRD, a refactor proposal, a hypothesis, a
component page), use the term as defined in `CONTEXT.md` (once it exists) and `vocabulary.md`. Don't
drift to synonyms the glossary explicitly avoids — this repo's own standing rule is "do not borrow a
word and change its referent."

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language
the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (...), but worth reopening because…_
