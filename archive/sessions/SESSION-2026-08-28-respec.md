---
title: "Session record — the function re-spec, and why it churned"
tier: reference
project: harness-atlas
created: "2026-08-28"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# Session record — 2026-08-27/28, the function re-spec

**Session:** <https://claude.ai/code/session_013Mk7QA5FWskvw2RM3vBQqz>
**Branch:** `respec/functions-and-context-layer` → merged to `master` at `cf21836`
**Range:** `05305e3..d017434`

### Provenance — where the raw material lives

**Machine-local and outside this repo.** None of it is committed; transcripts are ~83 MB and would
violate the public-by-default constraint. Paths are recorded so a thread with filesystem access can
reach them, and so a thread without one knows what it cannot see.

| | Path |
|---|---|
| **This session's transcript** | `~/.claude/projects/-Users-kevindeng-Googlyeye-Monsters-loomwarp-team-system/6e99188c-ea7c-400b-9854-5f33706dc771.jsonl` (4.0 MB) |
| Job dir — holds the run state and timeline | `~/.claude/jobs/6e99188c/` |
| Subagent transcripts (8 this session) | `/private/tmp/claude-501/-Users-kevindeng-Googlyeye-Monsters-loomwarp-team-system/c73ff118-.../tasks/*.output` |
| Plan file | `~/.claude/plans/one-of-the-components-stateful-moler.md` |
| Architect's PRD draft | `~/.claude/plans/one-of-the-components-stateful-moler-agent-a13f740e354375db6.md` |

**Sibling threads in the same project**, newest first — the transcript dir holds ~83 MB across all:

| Thread | Size | Opens with |
|---|---:|---|
| `6e99188c` | 4.0 MB | *"looking at our …02-harness-taxonomies.md…"* — **this session** |
| **`b6965999`** | **4.8 MB** | *"as loomwarp-cto-architect let's review …NEXT-STEPS.md and familiarize ourselves…"* — **the original thread, the one that was supposed to do this work** |
| `eaf7b428` | 4.5 MB | Same opening message as this session — a sibling run of the same request |
| `79d3f2e2` | 0.2 MB | *"what tools do we have installed in our cursor plugins and environment?"* |

**Two things this tells you before you read anything.** `eaf7b428` and `6e99188c` share a first
message, so **the same request was run twice** and only one outcome was merged — check both before
assuming a finding is new. And `b6965999` is the largest of the four, so the thread that was *supposed*
to do this work has the most context on it and the least to show.

**Working dir:** `/Users/kevindeng/Googlyeye-Monsters/loomwarp-team-system`

**What this is.** A record written for **another thread** — the one that was supposed to do some of
this work — so it can see what happened without replaying the session. It states what was asked, what
shipped, what went wrong, and what is still open.

**Read this if** you are picking up the v0 rebuild, the context layer, or the process amendment. The
diagnosis in §4 is the part that generalises.

---

## 1. What shipped

`05305e3..fc9a46c` — **68 files, +8,443 / −1,031.** Pushed to `origin/master`.

| Commit | What |
|---|---|
| `426d907` | The ruling, the `E<n>→F<n>` rename, the context-layer spec, five provider teardowns, the gap analysis, navigation |
| `1c83fa8` | The `element→function` noun rename, four classes of damage it caused, stale counts, the OPEN-register sweep, the `03-maturity` conflict |
| `877d6f5` | Stale prose references to the now-archived model |
| `cf21836` | Merge to master (no-ff) |
| `fc9a46c` | `fractal/workstreams/process-amendment.md` — the diagnosis as a dispatchable PRD |

### The model change

**FUNCTION is the unit · SCOPE is who it serves · PROVIDER is what performs it.**

`E0`–`E11` → `F0`–`F11`, 1:1, no re-ordering. The noun *element* → *function*. Jobs `J1`–`J17` demote
from a vocabulary to the **evidence layer**, IDs intact. `specs/archive/` holds the two superseded
models whole, with crosswalks forward.

### New artifacts

| Path | What |
|---|---|
| `projects/loomwarp/specs/v0/02-functions.md` | The canonical model. §0 is the ruling that ends four parallel vocabularies |
| `projects/loomwarp/specs/v0/09-context-layer.md` | The first **function spec** — `F3` as a pluggable contract, 25 provider obligations |
| `projects/loomwarp/specs/v0/10-context-gap-analysis.md` | `F3` graded 4 verbs × 4 lenses. `GAP-24…34`, `C-14…18` |
| `projects/loomwarp/references/comparisons/systems/context-providers/` | Six files — gbrain · OKF/wiki-langgraph · three decision ledgers · beads · native memory · a 25-row provider matrix |
| `projects/loomwarp/specs/archive/` | `02-elements.md`, `07-the-map.md`, and the `E→F` crosswalk |
| `fractal/workstreams/process-amendment.md` | The process fix, un-routed by design |

### Findings worth carrying forward

- **`GAP-24` is one parameter.** `context/memory/decision-ledger/storage/config.ts` hardcodes
  `DEFAULT_STORE_DIR`; `StorageOptions.storeDir` exists and is unused. 1,428 lines of working code are
  one constructor argument from being scope-aware. **P0 / XS, the cheapest P0 in the corpus.**
- **The Briefing is an integration, not a build.** `InstructionsLoaded` already fires, and
  `references/claude-code/03-hooks.md` already calls it *"the load-bearing event for LoomWarp's
  context-provenance manifest."* Both sentences were already in the repo; nothing connected them.
- **The individual/team boundary is also an access-control question**, not only routing and ownership.
  Answers a question `03-jtbd.md` §4 raised and left unassigned for four months.
- **`"Nobody in the landscape has provenance"` is false.** Google's OKF v0.2 ships it as a schema. The
  claim narrows to per-*run* vs per-*document* resolution and survives, with a falsifier dated
  **2026-12-01**.
- **The census counted the differentiator and missed the category** — `context layer` = 13 uncounted
  against `provenance` = 9 counted. Ten terms added; method fix in `01-worldsfair-2026-vocabulary.md`
  §2.4.

---

## 2. What was asked vs what was delivered

**This is the primary defect. Everything in §4 follows from it.**

KD expected a **greenfield rebuild of `specs/v0/` in a new folder**, with the existing corpus as
research input only. A folder named `v0-framework-architecture-rebuild/` was expected and **was never
created**.

What was delivered: an **incremental rename-and-patch of the existing files**. The literal action was
`cp 02-elements.md 02-functions.md` followed by editing. §0 was new; §6–§9 — the twelve function
bodies, the factors, the expansion, the provider view — carried forward under a mechanical rename.

**Where it went wrong:** an `AskUserQuestion` offered "full re-spec" as one of four visually-equal
options with a one-line cost note. KD answered *"archive and full re-spec, this should be a clean
understanding of how we view the framework."* That was read as *rewrite in place*. It meant *archive
the old, write the new from scratch*. **The ambiguity was never checked.**

---

## 3. The chronology, compressed

1. Explainer on pillars-and-maturity grids → fetched three unread primary sources → **three corrections
   to the corpus**, incl. that `arXiv:2509.06216` is not an autonomy ladder.
2. Installed `learning-opportunity` and `gap-analysis` skills to user space; genericized the latter off
   its hardcoded project.
3. Ontology / knowledge-graph / provenance discussion → gbrain, OKF, decision-ledger teardowns.
4. **The context-layer request** → plan mode → 7-wave plan → approved → executed.
5. Pass 1 shipped. KD: *"it looks like we only fixed some of the items in v0."*
6. Pass 2 — the noun rename and its damage. Pass 3 — stale prose references.
7. Merged, pushed.
8. KD: *"i'm concerned and unhappy… i thought we were going to be rebuilding the v0/ folder from first
   principles and greenfield."* → this diagnosis.

---

## 4. The diagnosis

### 4.1 What the assistant got wrong

| | |
|---|---|
| **Read an ambiguous scope answer the cheap way** | `cp` + edit, never asked what "archive" meant |
| **Shipped a half-rename as done** | `E<n>→F<n>` (549 refs) declared complete while `element→function` (240 refs) was untouched. **KD caught it, not the assistant** |
| **Treated four green checks as verification** | Every real defect in passes 2 and 3 was found by reading the diff. No check found one |
| **Renamed around KD's notes** | 33 `KD Note` blocks exist; 4 were engaged. Three untouched ones question their own document's premise |
| **Read the Strategist's self-diagnosis and never surfaced it** | `fractal/STRATEGIST-loomwarp.md:108`, in KD's voice: *"we're going to need to trim and refactor the strategist on product guidelines vs initialization"* |

**Damage the codemod caused and pass 2 repaired:** 15 broken articles ("an function"), 6 historical
forms wrongly renamed ("seven-function" for a superseded scheme), **KD's verbatim quote rewritten**, and
§0.2's argument made circular by renaming the word it argues about.

### 4.2 The mechanical root cause

**The codemod's blast radius exceeded the verifier's scan radius by three directories.**

```
scripts/rename-elements-to-functions.mjs   ROOTS = [projects, standards, fractal, docs]
scripts/rename-element-noun.mjs            ROOTS = [projects, standards, fractal, docs]
scripts/check-*.mjs   (all four)           projects/  only
```

Scripted edits landed in `standards/`, `fractal/`, and `docs/` **where nothing looks**. This is a
configuration mismatch, not a judgment failure, and it is fixable in one shared constant.

### 4.3 Three structural findings

**A — The harness has no product anchor, and a harness with nothing to point at points its rigor at
itself.**

| | generic-cerebro | loomwarp |
|---|---:|---:|
| Architect agent: product/user/domain lines | 34 / 168 (**20%**) | **0 / 203 (0%)** |
| Strategist failure modes about documents + gates | 2 / 11 | **6 / 8** |
| Strategist failure modes about anyone *using* it | 1 / 11 | **0 / 8** |
| Principles about serving people | 2 / 7 | **0 / 7** |
| v1 definition-of-done gates as user outcomes | 3 / 4 | **1 / 4** |
| Revision | rev5 | **rev1** |

`STRATEGIST-loomwarp.md` is cerebro's rev5 **minus §8 Roadmap and §9 Source Control** — and §8 Roadmap
is the most product-facing section in either file.

**B — We built markdown-as-code enforcement that cerebro deliberately does not have.**

generic-cerebro has **zero Node validation scripts, no CI, no workflows.** Its markdown discipline is a 22-line
advisory rule that concedes *"this repo has no prettier / markdownlint / editorconfig"*, plus an LLM
`wiki-lint` skill whose stated contract is *"You report; you do not silently rewrite."*

LoomWarp has **487 lines of doc enforcement, pointed almost entirely at itself**, scanning
`projects/**` only. Which is why this went uncaught: `.claude/agents/loomwarp-cto-architect.md`
documents four control-repo paths — `fractal/ARCHITECT-loomwarp.md`, `fractal/README.md`,
`fractal/templates/`, `fractal/EVAL_TEMPLATES/` — **and none of the four exist.** The Architect's own
definition is an instance of `FM-1` and `FM-3`.

**C — The tooling gap explains the churn.** cerebro: **6 plugins, 39 versioned skills, a
marketplace.** LoomWarp: **0 plugins, 7 loose skills**, copied by a shell script with no versions.
LoomWarp has **4 of `cerebro-tools`' 16** — missing the entire
`explore → create-plan → execute → review → deslop → document` front half, **which is exactly what was
hand-rolled badly this session.** cerebro has 9 path-scoped `.claude/rules/` files; LoomWarp has zero.

### 4.4 Manifesto grade — vs `12-factor-agents`

| | 12-factor | `02-functions.md` | `00-the-framework-from-agile.md` |
|---|---:|---:|---:|
| Words per top-level section | 407 | **984** | ~230 |
| Tables per 100 lines | **0** | 2.82 | — |
| ID tokens per 100 lines | 2.4 (0 formal) | **25.9**, across **8 namespaces** | **1.7** |
| `you`/`your` per 100 lines | **15.4** | 3.4 | 16 |
| Prose legible without the corpus | ~100% | **41%** | **87%** |

**The number that matters:** one 12-factor factor averages 407 words; one LoomWarp function entry
averages 354. **The atoms are the same size.** The blow-up is **5,587 words of meta-apparatus** wrapped
around them — §0 + §2 + §9 are 28% of the document, about LoomWarp's own vocabulary history. A
word-count rubric scores the two identical and misses everything.

**Grade: C−.** The vocabulary's history is explained well; the harness itself is explained poorly. The
best document in the corpus is the one this session never touched substantively — and it is the
shortest.

---

## 5. Open, and where it lives

| Thread | State |
|---|---|
| **The v0 greenfield rebuild** | **Not started.** KD's shape: new folder, blank page, old corpus as research input only, nothing carried without re-argument. Gated on its own intent block |
| **The 33 KD notes** | KD's instruction: *"a separate track or sub-agent… in a FRACTAL workstream."* Not this thread's job |
| **`W-1`…`W-4`** | Four work items approved earlier, deferred because the wave was scoped docs-only — `06-frameworks-addendum.md` §7A |
| **F-5's adoption wedge** | Research done and recorded; the rewrite deliberately not made — `references/comparisons/00-README.md` §F-5 |
| **`OPEN-13`, `OPEN-14`** | `09-context-layer.md` §10. `OPEN-14` decides **integrate vs build** for the Briefing |
| **Bottom-up map** | KD's request #1 on the `02-functions.md` §1 map. Band renames done; inversion not |
| **`STRATEGIST-loomwarp.md:108`** | KD's own note that the Strategist conflates product guidelines with initialization. Disposition owed |

---

## 6. For the thread picking this up

**Do these three before anything else.**

1. **Write a Wave Intent block and get it confirmed** before any wave that creates, moves, archives or
   renames files. Six fields; the first is *after-state paths*. Written for this session, the missing
   rebuild folder would have been visible in one line. Spec: `fractal/workstreams/process-amendment.md`
   AC-4.
2. **Do not trust the check scripts as verification.** They see links and IDs. They cannot see a
   renamed noun, an altered quotation, a broken article, or prose naming a file that no longer exists.
   **Read the diff.**
3. **Read the `KD Note` blocks before touching a document, and state a disposition per block.** They are
   the highest-signal content in the corpus. Three of them question whether their own document's premise
   is right.

**One checker behaviour to know about.** `check-referenced-artifacts.mjs` reads *any* backticked token
with a code/config extension as a claim that the path exists in this repo. Writing this record tripped
it twice on prose — once on a bare file extension, once on a machine-local filename outside the repo.
Neither was a defect. It fires on **shape, not meaning**, and that is the same class of blindness §4.2
describes. Fold it into the allowlist work rather than rephrasing around it forever.

**Two things not to repeat:** do not add a fifth enforcement script — the four we have caught none of
this session's defects. And do not rewrite a quotation, ever, including by codemod.

---

*Process fix: `fractal/workstreams/process-amendment.md` · Prior handoff:
[`NEXT-STEPS.md`](./NEXT-STEPS.md) · Front door: `loomwarp-team-system` `00-MAP.md` (private)*
