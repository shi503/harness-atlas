---
title: "NEXT-STEPS — spin the harness framework out into its own repo"
tier: pm
project: loomwarp
created: "2026-09-02"
status: ARCHIVED
owner: KD
audience: "Fable-level architect agent"
session: "https://claude.ai/code/session_015DgCNbVrPEc51m5NiGJv3Y"
---

# Handoff — spin the harness framework out into its own repo

**Who this is for.** A Fable-level architect agent, working interactively with KD. **You are being asked to architect, plan, ingest and decompose — not to execute the re-cut.** The re-cut is feature-lead work you will specify and dispatch.

**Read this file whole before touching anything.** It is self-contained on purpose: the conversation that produced it is at the `session` link above, and you should not need it.

---

## 1. Why this split, in three sentences

**The framework cannot grade LoomWarp honestly while it lives inside LoomWarp.** [`references/comparisons/02-component-matrix.md`](../../comparisons/02-component-matrix.md) already records LoomWarp's primitive set as *"— unstated. Artifacts exist; a set does not"* and its column as mostly `○`/`◐`. That reading is correct and it is uncomfortable to hold inside the product's own repo.

**Two artifacts got fused.** A *maturity spectrum* — a diagnostic answering *where are we, what breaks next* — and a *primitive catalog* — an ontology answering *what are the parts, who ships one*. The rule that every component must be a gradeable row forces a six-rung ladder onto things that only have an answer. [`specs/v1-framework/content/component-01-substrate.md`](../../spec/v1-framework/content/component-01-substrate.md) is the worked example: it holds four unrelated decisions (which model, which harness, the portability trade, how far out of distribution the work is) held together by a numbering scheme, and carries its own name under protest.

**The shape got buried in prose.** The most effective artifact in this corpus is a grid — `02-component-matrix.md`. The least effective is a 500-line guide. The re-cut is a **wiki of short linked pages**, not a document.

[`NEXT-STEPS.md`](./NEXT-STEPS.md) §2 anticipated this and set the constraint that kept it cheap: *"write it so the split stays a `git mv`."* It largely held — 78% of the corpus moves without re-argument.

**What the new repo is for**, stated so the alignment gate has something to test against:

1. **The range argument.** Harness solutions are a spectrum indexed to team maturity, the way Agile ranges from lean startup to SAFe 6.0. KD's framing, preserved verbatim: *solution spaces are somewhat individual, similar to how teams have different IDE preferences — being able to name the layers and their interactions allows us to better design connections.*
2. **The instrument.** A benchmarking and systems-design tool that decomposes any harness into its named primitives and scores it, so the shape of harnesses can be tracked as they develop. LoomWarp appears as one peer column, scored by the same rules, with no special status.

---

## 2. The alignment gate — first, and blocking

**Nothing moves and no teardown runs until this lands.** KD's instruction: *"before starting the moves and teardowns, we want to align on the presentation and most valuable assets to bring forward and rebuild."*

Two routes, both acceptable — KD picks:

- **Rework the consolidated guide in place** first, then migrate a corpus that already knows what it is becoming.
- **Move the raw material first**, and run the alignment as the new repo's opening work with the archive sitting next to it.

Either way, produce written answers to three questions:

| Question | Why it blocks |
|---|---|
| **What does the front page look like?** One screen. The shape, everything linking down. | This is the failure being corrected. Agreeing presentation *after* migrating guarantees the density comes back |
| **Which assets carry forward, and in what form?** Ranked, not listed. | Starting ranking below. Roughly 3,000 of 30,000 lines have earned it; the rest is derivation and belongs in the archive |
| **What gets rebuilt rather than moved?** | The 33 component files are the sharp case — they are spec entries, and Tier 2 needs short pages with a comparison table. Moving them unchanged with intent to edit later is precisely how the 500-line guide happened |

**Starting ranking, to be argued with rather than accepted:**

1. `references/comparisons/02-component-matrix.md` — the grid. The most effective page in the corpus.
2. The five Template-A harness teardowns in `references/comparisons/systems/harnesses/`.
3. `references/comparisons/01-concepts.md` §3.17 — the definition of a primitive.
4. `references/comparisons/04-harness-alignment.md` §2 — the 33-component view across five harnesses.
5. The maturity ladder — `references/AI-Native Organizational Maturity Framework.md` and `references/grid.html`.

**Output:** a ranked carry-forward list and a front-page sketch, agreed with KD. That is the gate.

---

## 3. Before anything moves

**Two hazards recorded in this repo's own defect ledger, both directly load-bearing here.**

- **`fractal/ISSUES.md` `ISSUE-008`** — a directory move in this repo has **already destroyed a parallel thread's untracked work once**. `git status` must be clean before anything moves. At the time of writing there are ~45 modified files under `projects/loomwarp/`, two modified scripts, and untracked `draft/` and `references/kd-drafts/`.
- **`ISSUE-004`** — FRACTAL cannot bootstrap itself into a repo where it is not installed. The new repo needs FRACTAL stood up **by hand** before any workstream can be dispatched into it.

**Repo name is undecided.** Proposal: `harness-atlas`, sibling to `loomwarp-team-system`. KD's call; nothing below depends on it.

---

## 4. Migration manifest

Paths relative to `projects/loomwarp/`. Totals: **160 files, 38,734 lines.**

### Moves — 131 files, 30,374 lines (78%)

| Source | Files | Lines | Becomes |
|---|--:|--:|---|
| `specs/v1-framework/**` (incl. 33 `content/component-*.md`) | 40 | 4,981 | the framework spec → re-cut into Tier-2 pages |
| `references/comparisons/**` minus 3 product files | 71 | 18,523 | teardowns, matrices, the 2026-08 research corpus |
| `references/claude-code/**` minus `30-gap-analysis-loomwarp.md` | 12 | 4,031 | the Claude Code teardown, already 13 docs deep |
| `references/AI-Native Organizational Maturity Framework.md` + `kd-drafts/` (3) | 4 | 1,305 | **the maturity spectrum — moves, per KD's ruling** |
| `references/architect-craft/**` | 2 | 1,054 | the sizing lens and the Hohpe source |
| `EXPLAINER-PLAN.md` | 1 | 259 | seed for the new front door |
| `references/grid.html` | asset | — | the instrument |

> **On the maturity model:** KD ruled it moves — *"primarily moves. We may bring something back in later as an install and config layer for LoomWarp after we've aligned it."* Treat the return path as expected, not as a reversal.

### Stays with LoomWarp — 9 files, 1,618 lines

`plan.md` · `specs/v1/*` (4) · `references/claude-code/30-gap-analysis-loomwarp.md` · `references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md` · `references/comparisons/systems/loomwarp.md` · `references/comparisons/systems/fractal.md`

**One exception.** `systems/loomwarp.md` is **re-authored in the new repo as a peer teardown** using the same template as every other harness. The LoomWarp-owned copy stays as the product's self-assessment; the new repo's copy is a scored column. **Its primitive-set row stays blank until someone earns it** — that blank is a finding, not an omission.

### Session records — 4 files, 1,123 lines
`NEXT-STEPS.md` and the three `SESSION-*.md`. **Copy into `archive/sessions/`, do not move.** They are LoomWarp's working record and the new repo's provenance simultaneously.

### Archive in place — 16 files, 5,619 lines
`specs/archive/**` and `references/elements.md`. Only three carry an explicit `ARCHIVED`/`SUPERSEDED` status; the other thirteen are archived by directory location while their frontmatter still says `DRAFT` or `PERMANENT`. **Fix the frontmatter during the move.**

**Archive by ruling, never by deletion.** This corpus has a documented method and you should follow it: a vocabulary retires *by writing a ruling, publishing a crosswalk, and re-heading the loser*. One dated ruling saying what retired and why.

---

## 5. The target information architecture

Three tiers. Every tier short, every link bidirectional.

```
TIER 1 — the shape                    ONE screen. System / domain / loop level.
  index.md                            The layer stack, the maturity range, the four
                                      altitudes. Every noun links down. No prose walls.
        │
        ▼
TIER 2 — component pages              ONE page per component. ~80 lines.
  components/<id>-<name>.md           · what it is, one paragraph
                                      · the single best example, named and cited
                                      · the comparison table: for each harness, its
                                        NAMED PRIMITIVE for this component, the citation,
                                        and the verbatim line that proves it
                                      · a `structured output` row (see below)
                                      · every cell links INTO a Tier-3 anchor
        │
        ▼
TIER 3 — harness teardowns            ONE page per harness. Deep-research consolidated
  harnesses/<name>.md                 guide from the teardown skill (§6). Anchored per
                                      section so Tier-2 links land precisely.

CROSS-CUTTING
  vocabulary.md                       term → concept → who says it → our component →
                                      instances.
  maturity.md + grid.html             the range argument and the instrument.
```

**The vocabulary ledger is load-bearing, not tidying.** Without it, two systems doing the same thing under different names are unclassifiable. Demonstrated live in the source session: `beads` was assumed to be a decision ledger and is in fact a **dependency-aware task graph in a Dolt SQL database** — hash IDs (`bd-a1b2`), hierarchical (`bd-a3f8.1.1`), atomic claiming via `--claim`, and typed relations *blocks · relates-to · duplicates · supersedes · replies-to*. It lands at `3a` Control and `7a` Workflow Tasks, **and** carries `bd remember` / `bd prime` at `5a`/`5c`. One tool, three components, and no way to say so without the ledger. Seed it with: beads, `thoughts` (HumanLayer), `llm-wiki` / `openwiki` (Deep Agents), `ox agent prime` (SageOx), HQ's five pillars, and the five orphan nouns in §9.3.

**Add a `structured output` row to every component comparison table.** Each harness optimises one, and reading down that column states each system's thesis in a line:

| System | Its structured output |
|---|---|
| beads | the typed `bead` record + relation graph |
| HumanLayer | the plan file, compacted after each verified phase |
| Deep Agents | the rubric verdict (`satisfied`/`failed`/`max_iterations`) + benchmark manifest |
| Claude Code | OTel spans + `tool_decision` audit records |
| HQ | the file tree itself — Knowledge / Skills / Projects / Workers / Policies |
| LoomWarp | `events.jsonl` — 8 real events, none schema-validated |

---

## 6. The teardown skill

Codify **Template A** — the shape all five files in `references/comparisons/systems/harnesses/` already share byte-for-byte. **This is the highest-leverage artifact in the plan; it is what lets feature-leads parallelize.**

**Location:** `skills/harness-teardown/SKILL.md`. Note the house convention — skills live at repo-root `skills/`, **not** `.claude/skills/`. Follow the existing frontmatter shape (`name`, `description`, `argument-hint`, `disable-model-invocation: true`) and scope `allowed-tools` the way `skills/quality-pass/SKILL.md` does.

**The binding constraint**, from `standards/README.md`: *"A distributed skill must never hard-depend on a path in this repo… A distributable skill carries its operational checklist inline and cites the canonical guide by name."* **The 33-row component list must be inline in the skill**, not read from a spec file.

| § | Contents | Rule |
|---|---|---|
| frontmatter | `title · tier · project · created · status · owner · source (repo @ sha · docs · read <date>) · provenance: OBSERVED` | |
| opener | `**Why this file exists.**` / `**In one screen.**` / `**What it does not claim.**` | fixed, bolded, three paragraphs |
| legend | `✅ direct · ◐ relayed · ⚠️ unverified` | every factual cell carries one |
| **A** Identity | 13-row field table · verbatim *"what it says it is"* quotes · **the three-question inclusion test** (does state persist, and where? does it serve more than one person? does it bind mechanically or only by prose?) · harness-or-process-layer probe · primitive preview | add the **loop question** from `04-harness-alignment.md` §4.1 — the inclusion test separates a process layer from dotfiles, but only the loop question separates a host from a runtime |
| **B** 33 rows | fixed order `0a`…`11a` | absence is written `**Nothing here** — checked README, docs index, settings, examples`. **Never inferred** |
| **C** Primitives | `Primitive · path/key · project's own definition (verbatim) · source` | vendor's words only. **Count them:** 5–7 is healthy, 12+ is accommodation failure, and a published refusal list is the strongest form |
| **D** Limitations | blockquotes grouped by source doc | no commentary |
| **E** Sources | primary (repo/API, including the literal `gh api` commands run) / secondary | |
| **F** Could NOT verify | bulleted, marked, reasoned | **mandatory and non-empty** |

**Downstream obligations — encode as skill steps, because skipping them is a live bug.** A teardown must also produce (a) a row in `systems/90-short-profiles.md` marked *Torn down `<date>`*, (b) a column in `04-harness-alignment.md` §2, and (c) a column in `02-component-matrix.md` §1. **HumanLayer and LangChain Deep Agents each have a ~385-line teardown and neither has a matrix column** — their findings live only in prose. Fix both during the re-cut.

---

## 7. FRACTAL decomposition

Model the PRDs on `fractal/workstreams/harness-map-v1.md`: header block (`Epic / Model / Dependencies / Target repo / Target mode`), `## Goal`, `## Deliverable`, `## Acceptance criteria` as independently-checkable `AC-n`, `## Session shape`, `## Do NOT`, and a trailing provenance line.

| WS | Mode | What it does | Parallel? |
|---|---|---|---|
| **W0 · alignment** | **interactive** | The §2 gate: front-page shape, ranked carry-forward list, move-vs-rebuild call | **blocking — nothing starts without it** |
| **W1 · repo-stand-up** | headless | Create repo, stand up FRACTAL by hand, `git mv` the manifest, fix §9's breakage | blocking for the rest |
| **W2 · teardown-skill** | headless | Author `skills/harness-teardown/SKILL.md` per §6. Sanity-check by running it once on a harness that already has a teardown and reading whether the result holds up | blocking for W4 |
| **W3 · vocabulary-ledger** | **interactive** | The term ledger per §5 | after W1 |
| **W4 · teardowns** | headless, **fan out** | One opus feature-lead per harness. The corpus names the next two: **Codex** (two systems here embed its app-server as a runtime) and **goose** (the AAIF-hosted harness). Then the eleven named-but-untorn: Cursor, Amp, Aider, Gemini CLI, Kiro, Antigravity, Droid, Windsurf, Cline. Plus re-authoring `loomwarp.md` as a peer | **yes — this is the parallelism** |
| **W5 · component-pages** | headless, **fan out** | 33 Tier-2 pages cut to §5's shape. One lead per layer | **yes** |
| **W6 · matrix-backfill** | headless | HumanLayer + Deep Agents columns; the five orphan nouns (§9.3); fix the stale *"eighteen concept rows"* prose — the grid actually has 19 rows and 14 columns | after W4 |
| **W7 · maturity-recut** | **interactive** | The graded-vs-catalogued split (§8.2). Re-point the grid | after W5 |

---

## 8. Carried forward — four open items, all explicitly kept

### 8.1 The layer renumber
Applied **only** in `specs/v1-framework/00-consolidated-guide-and-mental-model.md` §1: thirteen layers plus a `Work Environment` bounding box, with Users & Rituals above the Surfaces membrane (people above, machinery below). `CROSSWALK.md`, the 33 component files, and `grid.html` still carry the old twelve. The mapping is in §1.2 of that file. **Only three layers move and they permute among themselves** — Control `7`→`5`, Context `5`→`6`, Workspaces `6`→`7` — so the component rename is one atomic pass or none: `7a`→`5a` while `5a`→`6a` while `6a`→`7a`.

Open naming calls inside it: `Knowledge Systems` collides with component `5c` Knowledge; `Surfaces & Workflows` collides with `7a` Workflow Tasks (KD says this collision is intentional — SDLC artifacts live at the surface and decompose into structured tasks below); and layer 7 may genuinely split, since **platform engineering / the IDP is the industry-standard vocabulary for three of its four components** (software catalog → Estate, environments → Infrastructure, golden paths → Delivery) **and has no word for the product itself** — which corroborates *"the product is a layer"* by absence rather than assertion.

### 8.2 Graded vs. catalogued
Mark each component as having maturity stages or only an answer. Working hypothesis: layers 0–4 are mostly catalogued, 6–12 mostly graded. Propose as a frontmatter field so it is mechanical rather than prose. **This is the fix for the fused-artifacts problem in §1.**

### 8.3 Missing taxonomy rows
`session` · `gateway` · `runtime` · `sandbox` · `workspace` are named primitives in shipped systems and are rows in **neither** grid. `04-harness-alignment.md` §4.1 already argues `gateway` and `runtime` are an **altitude** problem — process layer / gateway-host / runtime / hosted product — rather than a component problem. `session`, `sandbox` and `workspace` have no such account and are simply absorbed into rows that ask a different question.

**Harvest these from each harness's own docs, code and natural-language instructions — do not invent them.** KD's instruction: these concepts *"should more likely be disseminated from each harness's documentation, their code, and the natural language instructions that are evaluated."*

### 8.4 Latent vs. deterministic space, and the lit/dark factory
**Neither is in the corpus.** Grepped and confirmed: *latent* appears only as the podcast name; *software factory* appears only via Ryan Cooke's *"No, That's Not a Software Factory"* and HumanLayer's tagline *"the multiplayer control plane for your software factory."*

- **Garry Tan's latent/deterministic distinction** — KD cites it as a clean way to understand what each harness routes. **The citation could not be verified from this session; it needs a source before use.**
- **The lit/dark factory and multiplayer agents** are KD's stated new frontier past the sixth maturity stage. Currently unwritten, and it is the forward half of the range argument.

---

## 9. Breakage to fix during the move

1. **36 files link to `specs/v0/`, which no longer exists** (it moved to `specs/archive/v0/`), including three `superseded_by:` frontmatter values. Pre-existing; the link checker passes because the archive path resolves. Fold the fix into the move.
2. **Three filesystem escapes break literally** — `references/architect-craft/02-harness-sizing-lens.md` lines 40, 380, 387 reference `../../../../standards/README.md` and `../../../../fractal/STRATEGIST-loomwarp.md`. Re-point or inline.
3. **Take one script: `check-doc-links.mjs`**, with the scan root re-pointed. Leave the other seven — four parse LoomWarp canon and would need rewriting for nothing, two are self-labelled THROWAWAY, and `verify-vendored.mjs` only matters where `router.py` is vendored.
4. **There is no root `CLAUDE.md` or `AGENTS.md` anywhere** in the current repo; conventions live only inside two agent files. The new repo should have one.
5. **`status:` vocabulary is inconsistent** — 105 `DRAFT`, 22 `proposed`, plus `PRIMARY-SOURCE`/`SCAFFOLD`/`PERMANENT` in no enum, and two files where an enum comment leaked into the value. Settle one enum; it makes the archive legible.

---

## 10. What KD holds — do not delegate these

1. **The problem statement, from first principles.** Worked through in conversation, then written. The current consolidated guide opens with a summary, not an argument.
2. **The 5-minute script** — what the repo is and does. Worth stealing HQ's three-beat narrative form — *"Memory lives in files → The harness loads it → The system compounds"* — which is the same configured / accumulates / runs split told as a story rather than drawn as a stack.

---

## 11. Standing rules you must not break

- **Markdown is not code.** Guard-gating is **off** by standing ruling: *"the checks are adding overhead and we are still in an ideation phase — these are .md files and not code."* Do not re-impose count checks, vocabulary checks, or generator contracts in the new repo.
- **Verification is two things and no more.** `git status` clean before the move, history spot-checked after; and one link-resolution pass confirming the 36 dead `specs/v0/` links are gone. That is the whole bar.
- **A primitive set is 5–7 and forces a choice.** `01-concepts.md` §3.17: *a minimal, named, composable unit that the harness makes the single sanctioned way to express something.* Pi holds at eight **by subtracting** — six refused features shipped as example extensions. OpenClaw runs past twelve with six task-shaped objects where the grid wants one. **A set that grows without bound is a feature list wearing the word.**
- **Do not borrow a word and change its referent.** HQ's *"Projects"* means *shared goals, plans, and work in progress* — the Control layer, not the deliverable layer. This is exactly what `9e` Raise the Floor exists to prevent.
- **Absence is recorded, never inferred.** Every `○` names the pages checked.

---

## 12. Findings to carry, so they are not rediscovered

- **The corpus is dense in contrasts and sparse in dependencies.** All 33 components state what they are *not*; [`specs/v1-framework/06-relations.md`](../../spec/v1-framework/06-relations.md) found **13 citable `requires` edges** between them. The consequence is sharp: **_minimum governs_ is currently unfalsifiable in practice** — with a sparse graph you cannot show what a zero at `3c` actually breaks. A denser cited `requires` graph is what turns it from a posture into a prediction, and that is a better argument for the map than *"the layer list is not a system map."*
- **`3c` Composition performs no job, is required by nothing, and requires one thing** — the weakest node on the seeded graph and the first target for a deletion test.
- **The `shipped` horizon rule is met by one marker in twelve.** `12-horizon.md` §2 requires two teardowns cited by file and section; only `5c` Knowledge does. Eleven cite a synthesis document that names peers without pointing at their teardowns. Relax the rule and record the relaxation, or re-cite eleven.
- **LoomWarp's primitive set is blank** — the one system in the matrix we cannot currently evaluate is ours.
- **The provenance chain is already designed and just needs to be made navigable**: teardown §B row (sourced, dated, marked) → `04-harness-alignment.md` §2 cell → `02-component-matrix.md` §1 cell. §5's three-tier wiki *is* that chain with links.
- **The "md as code" over-index has a content cost, not just a process cost.** Guards, ID schemes, crosswalks and count checks are real discipline. What they bought was component files holding four ideas held together by a numbering scheme instead of one idea stated well. The re-cut is the correction.

---

*The plan this executes was authored 2026-09-02 in the session linked in the frontmatter. The corpus it migrates: [`00-MAP.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/00-MAP.md) · the framework: [`specs/v1-framework/00-README.md`](../../spec/v1-framework/00-README.md) · the mental model in flight: [`specs/v1-framework/00-consolidated-guide-and-mental-model.md`](../../spec/v1-framework/00-consolidated-guide-and-mental-model.md) · the open register: [`specs/v1-framework/CROSSWALK.md`](../../spec/v1-framework/CROSSWALK.md) §3*
