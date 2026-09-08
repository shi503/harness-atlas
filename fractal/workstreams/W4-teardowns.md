# Workstream PRD: W4-teardowns

**Epic:** harness-atlas — the re-cut
**Mode:** headless, **fan out** — one feature-lead per harness, in parallel
**Dependencies:** W2 (the skill). W3 helpful, not blocking.
**Routing:** un-routed. One HANDOFF per harness: `fractal/workstreams/W4-<harness>-HANDOFF.md`.

## Goal

Tier 3 populated by the skill, comparably, so Tier 2 has cells to link into.

> **Amended 2026-09-03 by W0.** Output directory is `content/` (was `harnesses/`). The queue changed:
> **Gas City replaces goose** (KD: *"never heard of it"*), and **FRACTAL is added** after LoomWarp as a
> second KD-built peer, so the README highlight reel has a Template-A page to land on. Each harness
> is dispatched to one sub-agent; the architect stays in the planning session. The skill now carries
> a diagram rule (step 6) — obey it per harness.

## Deliverable

One `content/<name>.md` per target, produced by `skills/harness-teardown/SKILL.md`, plus its
four downstream obligations. Order:

1. **Codex** — two systems in the corpus embed its app-server as a runtime.
2. **Gas City** — Yegge's software factory; documentation-dense; short profile already at
   `comparisons/systems/gas-city.md` (replaces goose in this slot).
3. **LoomWarp** — re-authored as a **peer**, same template, no special status. The LoomWarp-owned
   `systems/loomwarp.md` in the source repo stays as the product's self-assessment. **Its
   primitive-set row stays blank until someone earns it** — that blank is a finding.
4. **FRACTAL** — KD-built, run un-routed in this very repo; the same peer rule as LoomWarp. The
   delta doc at `comparisons/systems/kd-built-frameworks/03-fractal-as-iterated.md` is a source,
   not the profile.
5. **QM (Quartermaster) — promoted to the front of the untorn queue, 2026-09-07.** It is cited in
   `spectrums/00-README.md` as axis I's `+3` corpus anchor — *"per-scope rooms and adapters"* — and
   **has never been torn down**; the only source is the short profile at
   `comparisons/systems/qm.md`. ISSUE-015 measured axis I across ten scored harnesses at `−2` to
   `+1`: **both poles vacant**, and R1 says an axis with a vacant pole is *"an aspiration, i.e. a
   grade."* KD's ruling, 2026-09-07: *"this does need to be a teardown to prove it."* Until QM is a
   scored profile, axis I's upper anchor rests on a harness the instrument has never measured.
6. **The emerging multi-tenant motion — a category to watch, not yet a queue.** KD, 2026-09-07:
   *"multi-tenant agent harnesses are definitely an emerging motion (see also Buzz, OpenClaw
   Teams)."* Two of these already touch the corpus: **OpenClaw shipped a team version after its
   2026-09-02 read** — recorded as the strongest re-read candidate in `positions/openclaw.yaml` —
   and **Buzz** appears nowhere in this corpus except the World's Fair transcript data. If the
   motion is real, axis I's `+3` anchor stops being vacant on its own, and the vacancy recorded in
   ISSUE-015 is a **dated observation about 2026-09, not a permanent property of the category.**
   Candidates for a later wave: Buzz · OpenClaw Teams (as a re-read) · QM.
7. The named-but-untorn: Cursor · Amp · Aider · Gemini CLI · Kiro · Antigravity · Droid · Windsurf · Cline.
   goose drops off the priority list; it may rejoin here if someone makes the case.

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
