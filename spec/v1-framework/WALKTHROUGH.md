---
title: "Walkthrough — how to read v1, and how to review it from first principles"
tier: pm
project: loomwarp
created: "2026-09-01"
status: ACTIVE
owner: KD
---

# Walkthrough — the v1 framework

**Who this is for.** Two readers: KD, evaluating the corpus fresh; and a reviewing agent asked to
test it **from first principles**. Both get the same document deliberately — a reviewer briefed
differently from the owner reviews a different corpus.

**What v1 is, in one paragraph.** A framework for how a team of humans and agents does software
work, stated as **twelve layers containing thirty-three components**. The **component is the
gradeable function** — the unit a team can be scored on; the **layer is navigation** (and, in the
Grid, a warp thread). The structure was **derived from seventeen jobs-to-be-done** and supersedes a
seventeen-function model (`F0`–`F16`), with every job and every old function ID resolved in a
crosswalk with zero orphans. It is benchmarked three ways: against four peer systems read at source,
against a four-value evidence axis (`shipped · emerging · claimed · bet`), and by whether a stranger
can locate themselves in it in fifteen minutes.

---

## 1. The reading order — three passes

### Pass 1 — the stranger pass (15 minutes, timed, do this FIRST)

Open [`00-README.md`](./00-README.md) cold. Do not open anything else. The goal: **name your own
weakest layer** before the timer runs out. Then, optionally, open `references/grid.html` in a
browser, click your grades in, and see whether the **Minimum — governs** card (`s-min-n`, the weakest
layer(s) at the current stage floor) names what you already suspected.

This pass is a benchmark, not a warm-up (`AC-13`, recorded PENDING-KD in `HANDOFF-W7.md`). **If you
cannot do it, the finding is about the README, not about you** — write down the sentence where you
got lost. A reviewing agent should run this pass too, honestly: read only the README, commit to a
weakest-layer guess for a hypothetical team, and only then read on.

### Pass 2 — the structural pass (does the skeleton hold?)

1. [`CROSSWALK.md`](./CROSSWALK.md) **§0** — the structure and the two operations (§0.1
   DECOMPOSED vs SPLIT — the difference is load-bearing: a split gets no roll-up because a roll-up
   spanning layers would let a high grade hide a zero, defeating *minimum governs*).
2. **§1 and §2** — the two derivations. §1: all 17 jobs → components. §2: all 17 old functions →
   components, with a *discarded* column and **no row reading "renamed"** (three renamings is what
   produced the duplicate-model problem this rebuild ends).
3. **§3** — the register: what is ruled (✅ dated), what is open, what is recorded-not-hidden.
4. Two or three component files, sampled (see §4 below for which).

### Pass 3 — the evidence pass (do the claims survive their citations?)

Pick any peer-table cell in any component file and follow the link to the teardown section it
names. Check two things: the link resolves, **and the cited section actually says what the cell
claims**. This corpus's own evidence rule (`07-verified-inventories.md` §6, in
`../../references/comparisons/2026-08-research/`): *a relayed count is usually fine; a relayed name
is not.* One cell that fails this test is a real finding — report the exact cell.

---

## 2. How to interpret what you read — the conventions

- **Every component file has the same skeleton:** opens on a question · a neutral definition ·
  boundary paragraphs ("What this layer is not") · a one-line **How do we work?** sentence a real
  team would say · a five-peer implementation table (Claude Code · Deep Agents · MCP · HumanLayer ·
  ours) · a **Horizon** marker with its evidence · closes on a consequence, not a feature.
- **Horizon markers are graded claims about the field, not about us.** `shipped` needs ≥2 peers
  shipping it as a named primitive, cited by file and section. `emerging` = 1–2 peers who disagree
  about the vocabulary (the disagreement is the tell). `claimed` = named publicly, nothing shipped.
  `bet` = ours, uncorroborated, said out loud. A marker can be downgraded by evidence, never
  upgraded by argument. Rules: [`12-horizon.md`](./12-horizon.md) §2.
- **"Nothing here" cells are findings, not gaps.** Seventeen of eighteen MCP cells in layers 6–11
  say it, with reasons — the protocol sits below those layers' altitude, and the README says so
  once. Do not read an empty cell as laziness; check whether its reason holds.
- **Length follows content.** Files run 69–97 lines (`content/component-15-knowledge.md` to
  `content/component-09-configuration.md`, measured by `wc -l`). The original 129-line floor was
  measured against its cited comparator and found fabricated (CROSSWALK §3.8); padding is the
  defect, not brevity.
- ***Minimum governs.*** A layer's grade is its weakest component's grade. This one rule explains
  several structural choices: why splits get no roll-up, why layers 2 and 3 are graded apart, and
  why the Grid can run on 12 rows without losing the 33.
- **The corpus retires by ruling and crosswalk, never by deletion.** The ancestor model is whole at
  `../archive/v0/`, reached by crosswalk rows. Archived prose keeps its superseded counts by
  design — it is history, not assertion.

---

## 3. What is decided — do not re-litigate, do test the implementation

These are KD rulings, dated in [`CROSSWALK.md`](./CROSSWALK.md) §3 and the PRD
(`fractal/workstreams/framework-v1.md`). A reviewer's job is to check they were **implemented
faithfully and consistently**, not to reopen them:

| Ruling | Where |
|---|---|
| Twelve layers, thirty-three components; layer 5 **is** `F3` with dotted children | PRD §Structure, CROSSWALK §0 |
| `9b` Rituals and `9c` Cadence separate; `9d` is **the closed loop** (`bet`) | §3.1, §3.2 |
| Grid warp threads = the 12 layers, 33 as drill-down | §3.7 |
| Layer 2 is **`Agent Harness`**; layer 3 keeps **`System Stacks`**; never merged | PRD §Open (O-7/O-7b) |
| The decision ledger is **the governed tier of `5b` Team Memory**; ADRs are its project-scoped cell | §3.9 |
| The layers are navigation, the 33 are the primitive set; the typed-relations map is owed by `harness-map-v1` | §3.10 |
| Enforcement is mechanical at `2c`, presented twice (Guides pre-hoc at `3e`, Sensors post-hoc at layer 8) | PRD O-5, `component-05` |

A high-value review finding is a place where two files implement one ruling **differently** — that
defect class produced most of the 90+ fixes the build's own independent reads caught.

## 4. What is deliberately open — fair game, and already on the register

Check [`CROSSWALK.md`](./CROSSWALK.md) §3 before reporting a gap: **a gap already recorded there is
not a discovery** (though a new argument about one is welcome). The open set: the Briefing has no
component (§3.3) · `OPEN-9` stewardship has no owner (§3.4) · RBAC-over-context is nobody's job
(§3.5) · pre-decision judgment (`A1`/`A3`/`A4`) has no home (§3.11) · the roster (`10a`) is
specified and does not exist · `03-maturity.md`'s ladder rebuild is pending · the 33 per-component
images are recorded debt.

**Where to sample component files for review:** `component-28` (the hardest ruling — a `bet` with a
named, dated falsifier and a corrected evidence trail left visible) · `component-05` (the
two-appearance enforcement split) · `component-26`/`component-27` (one ruling, two files — the
duplicate-model risk) · `component-13`/`component-14` (the `⟳` accumulate claim and the governed
tier) · `component-03` (vendor-provided layer + the versioning amendment).

---

## 5. For the first-principles reviewer — what to attack

1. **The falsifiable claims, on their stated falsifiers.** Idea B (*only* layers 5 and 6
   accumulate — the README names what would break it) · `9d`'s losing condition (*a recorded
   failure changing a later run with no person carrying it across*) · the altitude answer (a dated
   forward claim, conceded for open source today) · the scope boundary (*a team whose deliverable
   lives in version control*). Attack the falsifier itself: is it actually testable, and is it the
   right one?
2. **The derivation, not just the result.** Take one job (say `J11`) or one old function (say `F6`)
   and re-derive its landing from the source files (`../../references/comparisons/03-jtbd.md`,
   `../archive/v0/02-functions.md`). Does the crosswalk's argument survive your independent read?
3. **The seams between neighbours.** The build's defect ledger says territory bleed and duplicated
   arguments were the dominant failure mode. Read two adjacent components (`5b`/`5c`, `2a`/`2b`,
   `6a`/`6c`) and ask: could I grade a team differently on these two, or are they one thing wearing
   two names? (`OPEN-15` at §3.6 already concedes this worry for `6a`/`6c` — push on it.)
4. **The structure against its own rules.** The H7 deletion test has **never been run** (assigned to
   `harness-map-v1`): for any layer, what breaks if it is deleted? A layer whose deletion breaks
   nothing is a finding. So is a thirty-fourth component with a real argument — the bar is
   CROSSWALK §2.2's three-column shape: *new · argument for being new · nearest thing that is not it*.
5. **The instrument.** Open `../../references/grid.html`. Does *minimum governs* actually govern?
   Does the **Bottleneck** card name a layer a team would act on, and is that answer distinct from
   what the **Minimum — governs** card already names — or is it silently recomputing the same thing
   under a different label? Do the 12 rows lose anything the 33 carried that a `title` drill-down
   does not recover?
6. **Report findings in the corpus's own register:** the claim, the file and line, the evidence you
   checked at source, and what would change your mind. Confidence without a checked citation is the
   defect class this corpus polices hardest — in itself and in you.

## 6. Verify mechanically before trusting any of it

```
node scripts/check-doc-links.mjs            # every local link resolves
node scripts/check-referenced-artifacts.mjs # every referenced artifact exists or says it doesn't yet
node scripts/check-element-vocabulary.mjs   # F<n>-name pairs match the archived canon
node scripts/check-research-counts.mjs      # every claimed count reproduces
node scripts/check-function-count.mjs       # one count, one place: 12 · 33 · 17 · 17
node scripts/gen-grid-rows.mjs              # grid rows regenerate from the map; re-run = zero diff
```

All six pass at `76a0a88`. A guard has value only if it has been watched to fail — the count
check's seeded failure is pasted in `HANDOFF-W6.md`, and the generator's four failure modes in
`HANDOFF-W7.md` (both under `.claude/fractal/workstreams/framework-v1/`).

---

## 7. The map of files

| File | What it is |
|---|---|
| [`00-README.md`](./00-README.md) | Navigation, the 33-row question table, the two dated answers, the five ideas, the conformance spectrum |
| [`CROSSWALK.md`](./CROSSWALK.md) | The derivation (§1), the supersession (§2), the rulings-and-gaps register (§3) |
| [`content/component-01…33`](../../components/0a-substrate.md) | The 33 components, bottom-up |
| [`12-horizon.md`](./12-horizon.md) | The evidence axis and its rules |
| [`05-preflight.md`](./05-preflight.md) | The Grid-as-input adoption questionnaire |
| [`img/000-the-twelve-layers.svg`](./img/000-the-twelve-layers.svg) | The bottom-up diagram; the `⟳` pair visibly distinct |
| `../../references/grid.html` | The maturity instrument — 12 warp threads, rows generated |
| `../archive/v0/` + [`../archive/00-README.md`](../../archive/00-README.md) | The ancestor, whole, with crosswalk rows |
| `fractal/workstreams/framework-v1.md` (repo root) | The governing PRD — thirteen ACs, seven waves |
| `.claude/fractal/workstreams/framework-v1/HANDOFF*.md` | Per-wave evidence tables, escalations, and defect ledgers |
| `fractal/workstreams/harness-map-v1.md` | The successor: the typed-relations system map, built interactively |
