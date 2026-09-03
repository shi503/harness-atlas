# Workstream PRD: W4-teardowns

**Epic:** harness-atlas — the re-cut
**Mode:** headless, **fan out** — one feature-lead per harness, in parallel
**Dependencies:** W2 (the skill). W3 helpful, not blocking.
**Routing:** un-routed. One HANDOFF per harness: `fractal/workstreams/W4-<harness>-HANDOFF.md`.

## Goal

Tier 3 populated by the skill, comparably, so Tier 2 has cells to link into.

## Deliverable

One `harnesses/<name>.md` per target, produced by `skills/harness-teardown/SKILL.md`, plus its
three downstream obligations. Order:

1. **Codex** — two systems in the corpus embed its app-server as a runtime.
2. **goose** — the AAIF-hosted harness.
3. **LoomWarp** — re-authored as a **peer**, same template, no special status. The LoomWarp-owned
   `systems/loomwarp.md` in the source repo stays as the product's self-assessment. **Its
   primitive-set row stays blank until someone earns it** — that blank is a finding.
4. The named-but-untorn: Cursor · Amp · Aider · Gemini CLI · Kiro · Antigravity · Droid · Windsurf · Cline.

## Acceptance criteria

- **AC-1** Each file passes the skill's own shape: sections A–F present, §F non-empty, every `○`
  in §B names the pages checked.
- **AC-2** Each harness has its row in `90-short-profiles.md`, its column in
  `04-harness-alignment.md` §2, and its column in `02-component-matrix.md` §1, in the same HANDOFF.
- **AC-3** §C counts its primitives and says which of 5–7 / 12+ / refusal-list it is.
- **AC-4** The `structured output` line is present and is one artifact, not a list.

## Session shape

Dispatch: *"use the feature-lead agent to execute workstream `fractal/workstreams/W4-teardowns.md`
for harness `<name>`."* One harness per agent. The agent reads the skill, runs it, writes the
three obligations, hands off.

## Do NOT

- Infer a row. Edit another harness's file. Touch `spec/` or `components/`.

---

*Brief: handoff §4 (the LoomWarp exception), §6, §7.*
