---
title: "SESSION 2026-08-31 — the framework rebuild, W1–W2, and how to resume"
tier: pm
project: loomwarp
created: "2026-08-31"
status: ARCHIVED
owner: KD
---

# Session handoff — 2026-08-31

**Written to survive a model switch.** The next session resumes on a **fable** model with none of this
thread's context. Everything needed to pick up is here or linked from here; nothing important lives
only in the transcript.

**One-line state:** the framework rebuild is **2 of 7 waves done** and stopped at a review gate KD
asked for. Nothing else in the repo advanced.

---

## 1. Resume here

**Read, in this order:**

1. `fractal/workstreams/framework-v1.md` — **the PRD. It governs.** 13 ACs, 7 waves, the twelve-layer structure, and the four resolved open items in §The structure
2. `projects/loomwarp/specs/v1-framework/CROSSWALK.md` — §0 the structure and the count · §0.1 decomposed vs split · §1.1 the homeless-jobs correction · §3 what is still open
3. `.claude/fractal/workstreams/framework-v1/HANDOFF.md` — the W1–W2 evidence table
4. This file §4 for what is next

**Then execute W3.** The dispatch prompt shape that worked is in §5.

**Do not** start W6 (the archive move) without re-reading the preconditions — it is the only
irreversible wave.

---

## 2. What this session did

### 2.1 Two competitor teardowns, read at source

Seven repos cloned to `~/Googlyeye-Monsters/` and pinned. **HumanLayer had no teardown at all** — it
was in the corpus only as a critic — and **Deep Agents' teardown was transcript-only**.

| File | |
|---|---|
| `references/comparisons/systems/humanlayer.md` | **new** — passes the corpus's own inclusion test on all three questions. Tagline is *"The multiplayer control plane for your software factory"*, which is our positioning sentence, shipped |
| `references/comparisons/systems/langchain-deepagents.md` | **rewritten from source** at `3a0f68c`. Four of its conclusions did not survive |
| `2026-08-research/08-humanlayer-and-deepagents-recheck.md` | **new** — the corrections ledger |

**The finding that matters:** `deepagents/openwiki/.claims/` ships **515 claims** with per-claim
`sha256` evidence pinning, drift-tolerant line fingerprints, and a run manifest pinning `gitHead` and
the generating model. That is **three of the four properties** of our provenance claim, shipped MIT at
28.7k stars. **What survives is narrow and must be stated in these words:** *openwiki pins what a
**document** asserts about a repository; `F7` pins what an **agent saw during a run**, who owned it,
and what came of the work. The unit is a page; ours is a run.*

**And the corroboration is now first-party from the critic.** Horthy's full keynote text (`wsff.md`,
cloned) says: *"there's no way to backprop the incident to the decision that caused it."* **That is
`F7` stated as an impossibility claim by the person the corpus files under *positions worth
answering*.**

### 2.2 The manifesto spine

`EXPLAINER-PLAN.md` — *"How do we work?"* promoted from a per-function framing device to the spine.
It was already in `02-functions.md` **12 of 12 times** and never lifted to the title. All fourteen
factor answers are drafted at §3.1.

`specs/v0/12-horizon.md` — the fourth axis (`shipped · emerging · claimed · bet`), each with an
evidence rule. **`applied: false`** at the time of writing; the 33 stubs now carry markers.

### 2.3 The framework rebuild

`fractal/workstreams/architecture-rebuild.md` was **superseded by banner** — three rounds of
amendment made it unexecutable. Replaced by `fractal/workstreams/framework-v1.md`.

**W1 and W2 ran and stopped.** See §3.

---

## 3. Where the work actually stands

| Workstream | State | Evidence |
|---|---|---|
| **`framework-v1`** | **W1–W2 done, W3–W7 not started** | `.claude/fractal/workstreams/framework-v1/HANDOFF.md` |
| `architecture-rebuild` | **superseded**, will never run | banner at the top of its PRD |
| `process-amendment` | **never run** | no HANDOFF. This is why `scripts/measure-doc-shape.mjs` does not exist |
| `BLUEPRINT-LoomWarp-V1` | **1 of 11 complete** | `.state.json` — only `VendorProvenance`. `FractalRegrounding` gates all of Phase 1 |

> **How "done" is determined here:** a workstream is complete when a `HANDOFF.md` exists. Un-routed
> workstreams have no `.state.json` entry, so **the HANDOFF file is the state.** Two PRDs exist with
> no HANDOFF and nothing in the system flags that.

### 3.1 The seven waves

| Wave | | What it produces |
|---|---|---|
| **W1** | ✅ | `CROSSWALK.md` — both directions closed, 17/17 jobs, 17/17 functions, zero orphans |
| **W2** | ✅ | 33 stubs — frontmatter, the `How do we work?` sentence, the horizon marker |
| **W3** | ⬜ | **layers 0–5 filled — 15 files.** Definition · sub-concepts · peer implementation row · diagram |
| **W4** | ⬜ | layers 6–11 filled — 18 files |
| **W5** | ⬜ | `00-README.md` ≤260 lines · the bottom-up diagram · the altitude answer · the software-scope answer |
| **W6** | ⬜ | **irreversible.** `git mv specs/v0 → specs/archive/v0` · checker repoint · count check |
| **W7** | ⬜ | `grid.html` rows generated from the spec · preflight rebuilt as the ad-lib artifact |

---

## 4. The structure, as ruled

**Twelve layers, thirty-three sub-layers. The layer is navigation; the sub-layer is the gradeable function.**

```
11 Surfaces          11a Surfaces
10 Teams & Agents    10a Roster · 10b Org
 9 IMPROVE           9a Learning · 9b Rituals · 9c Cadence · 9d Anti-fragile Lifecycle ·
                     9e Raise the Floor · 9f Diagnose the Bottleneck
 8 Trust             8a Evals · 8b Evidence · 8c Observability · 8d Efficiency
 7 Workflow Tasks    7a Workflow Tasks
 6 Workspaces     ⟳  6a Product · 6b Infrastructure · 6c Estate · 6d Delivery
 5 Context        ⟳  = F3.  5a Individual Memory · 5b Team Memory · 5c Knowledge
 4 Capabilities      4a Capability · 4b Capability Permissions
 3 System Stacks     3a Control · 3b Routing · 3c Composition · 3d Configuration · 3e Standards
 2 Agent Harness     2a Adapters & Middleware · 2b Hooks · 2c Enforcement
 1 Environment       1a Environment
 0 Foundation        0a Substrate
```

### 4.1 Rulings — implement, do not re-open

| # | Ruling |
|---|---|
| **O-3** | Decomposed functions keep the parent ID as a **layer roll-up**; children take **dotted sub-IDs**. Layer 5 **is** `F3`; children are `F3.1/F3.2/F3.3`. `C-11` applied literally |
| **O-4** | Layer 9 is **`IMPROVE`**, six sub-layers. *Anti-fragile lifecycle* is a peer, not an umbrella |
| **O-5** | Enforcement is **mechanical in layer 2**, presented twice — **Guides** pre-hoc (`3e`, stored in layer 5) and **Sensors/Evals** post-hoc (layer 8). Böckeler's split. Trust keeps exactly four sub-layers |
| **O-7** | Layers 2 and 3 stay **separate** — independent maturity is what makes a Grid row, and a merged layer hides a zero. Layer 2's file must say the layer **may be entirely vendor-provided** and that adopting one wholesale is a legitimate answer, not a low grade |
| **J5** | `J5 bound` → **`3a` Control**, declared as a **named bound** (`frontend-dev`, `soc2`). `2c` is the mechanism, `4b` the per-package grant |
| **`9b`/`9c`** | **Separate.** `9c` = the schedule; `9b` = the human practice it serves. **`C-7` is narrowed, not reversed** |
| **`9d`** | **The closed loop** — the feedback wiring between the other five. *"Every failure makes the next run less likely to fail the same way."* Horizon `bet` |
| **Definitions** | Land in **W3/W4**, not a separate pass. KD's call, made against the note that 21 of 33 sub-layers have no definition anywhere in the repo |

### 4.2 Two findings from W1 worth carrying

**Decomposed vs split are different operations** (`CROSSWALK.md` §0.1). Decomposed = all parts inside
one layer, parent survives as a roll-up. **Split = parts cross a layer boundary, so there is no
roll-up** — a roll-up spanning layers would let a high grade in one layer hide a zero in another,
which is *minimum-governs* defeated. `F6` is split four ways and correctly has no parent.

**The "six homeless jobs" figure was stale** (`CROSSWALK.md` §1.1). Four of the six were quietly given
homes in `02-functions.md` §6 on 2026-08-27 and the `03-jtbd.md` scorecard was never updated.
**`J11 coordinate humans` is the only job of the seventeen that was never given a function.**

---

## 5. Dispatching W3

`framework-v1` is **un-routed** — no `router.py`, no `dispatch.py`, no blueprint edit.
`.state.json` must stay byte-identical (`2bd47717bfb313578598446300b62067`). Dispatch means launching a
`feature-lead` agent against the PRD.

**The prompt shape that worked for W1–W2:** point at the PRD as governing · state the stop point
explicitly · paste the Wave Intent block as already-satisfied so AC-1 is not re-asked · list what is
**decided** versus what must **escalate** · give the reading order · restate the non-negotiable
constraints · name the deliverable.

**For W3 specifically:**

- Scope: **layers 0–5 only, 15 files.** Stop before W4.
- Gate: **peer implementation row present per file** — Claude Code · Deep Agents · MCP · HumanLayer ·
  ours, each citing a teardown by file and section.
- **`AC-3`'s "129–260 lines" floor is wrong and is not to be met.** Measured at `d20c7283`, the real
  comparator distribution excluding redirect stubs is **12–260, median ≈ 57, only 2 of 12 at or above
  129.** Writing to a 129-line floor would force padding into most files. **Length follows content.**
- Layer 2's file carries the vendor-provided statement from `O-7`.
- Layer 5's three files are the first place `F3`'s dotted sub-IDs appear in prose.

---

## 6. Open, and none of it blocks W3

| # | Item | Where |
|---|---|---|
| `3.3` | The Briefing has no sub-layer of its own | `CROSSWALK.md` §3.3 |
| `3.4` | `OPEN-9` stewardship — no sub-layer; the argument that used to close it rested on a file that never existed | §3.4 |
| `3.5` | **RBAC over context** — between `J5` and `J1`. The Indigo analysis calls it **whitespace #1 in the category**; still nobody's job | §3.5 |
| `O-6` | **The Grid takes 33 rows, not ~28 — 198 cells.** Recommendation on the table: make the Grid's warp threads the **12 layers**, since *minimum governs* already makes a layer its weakest sub-layer, so `s-neck` and the fabric SVG run unchanged and the 33 becomes drill-down. **✅ RULED 2026-09-01: adopted** — see `CROSSWALK.md` §3.7 | §3.7 |
| `O-7b` | Layer 2/3 **naming** — recommendation recorded: keep `System Stacks`, rename `Harness` → `Agent Harness`. **✅ RULED 2026-09-01: adopted and applied** — structure blocks, layer-2 stubs, and the PRD now read `Agent Harness` | PRD §Open |

---

## 7. Known defects, recorded not hidden

**`02-component-matrix.md` carries reflow damage**, committed deliberately at KD's direction in
`6fd6155`. Frontmatter `title:` became `## title:` inside the `---` fence so the YAML no longer
parses, and all **11 markdown links are wrapped in backticks** so they render as code.
**`check-doc-links.mjs` passes because backticked links are no longer links.** Repair is a small
standalone job; extending the link checker to flag the backticked-link pattern would stop it
recurring.

**The count contradiction is still live** until W6. `02-functions.md` §1's map block carries `F0`–`F16`
while line 16 says *"in five bands"* and §6 is headed *"The twelve functions"*; seven other files
assert twelve. `AC-10`'s count check closes it, and its evidence requirement is **two runs** — passing,
and **failing when seeded with a wrong count.** A guard nobody has watched fail is not known to work.

---

## 8. Parked, deliberately

- **`BLUEPRINT-LoomWarp-V1`** — 10 of 11 workstreams `NOT_STARTED`. Different epic, different clock.
  `FractalRegrounding` gates Phase 1.
- **`process-amendment`** — never run. Its `AC-6` is why `scripts/measure-doc-shape.mjs` does not exist.
- **`W-1`–`W-4` and `ADR-028`** — carried in the PRD's manifest as recorded work, not executed.
  **`W-1` before `W-2`**, per `NEXT-STEPS` §3.1.
- **The 5-dimension shape rubric** — not selected as a benchmark this pass. The benchmark is peer
  teardowns · horizon axis · stranger-adoption.

---

*The PRD: `fractal/workstreams/framework-v1.md` · the crosswalk:
`specs/v1-framework/CROSSWALK.md` · the prior planning this executes: `NEXT-STEPS.md` §4 `B-1`/`B-2` ·
the landscape: `references/comparisons/`*
