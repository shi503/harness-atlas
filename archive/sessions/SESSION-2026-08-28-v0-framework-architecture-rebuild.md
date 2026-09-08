---
title: "Session record — the architecture rebuild that was designed and not built"
tier: reference
project: harness-atlas
created: "2026-08-28"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# Session record — 2026-08-27/28, the v0-framework architecture rebuild

**Session:** <https://claude.ai/code/session_01PaxQSScTnPD8s5uNoTYeRu>
**Thread:** `b6965999-4bb0-40c7-955d-4ae632e22449` — *"as loomwarp-cto-architect let's review NEXT-STEPS.md…"*
**Branch:** `master` direct
**Range:** `94f327c..f18de51`, non-contiguous — interleaved with `6e99188c`'s commits

**What this is.** The counterpart to [`SESSION-2026-08-28-respec.md`](./SESSION-2026-08-28-respec.md).
That record is written from the thread that **shipped the wrong thing**. This one is written from the
thread that **designed the right thing and did not ship it.** Read together they are one incident.

**Read this if** you are picking up the greenfield rebuild. §2 is the architecture that was approved
and never built — it is the only place it exists. §3 is the file-level inventory of ours / theirs /
missed.

---

## 1. Provenance

Sibling threads, per `SESSION-2026-08-28-respec.md` §Provenance. **This thread is `b6965999`** — the
4.8 MB one that record identifies as *"the original thread, the one that was supposed to do this work…
the largest of the four, so the thread that was supposed to do this work has the most context on it
and the least to show."*

That sentence was accurate when written. This record is the correction to the second half of it.

| | Path |
|---|---|
| Plan file | `~/.claude/plans/as-loomwarp-cto-architect-agent-let-s-fuzzy-storm.md` |
| Subagent transcripts (11 this session) | `/private/tmp/claude-501/-Users-kevindeng-Googlyeye-Monsters-loomwarp-team-system/b6965999-.../tasks/` |

---

## 2. ⭐ The architecture that was designed and not built

**This section is the reason the record exists.** The design was iterated with KD across four rounds
of feedback and approved. No folder was created. It exists nowhere else.

### 2.1 The shape

**Nine bands, bottom-up** — *"this is an architecture framework so we're building a foundation then up
and out."*

```
  ⑨ LIFECYCLE          cadence · learning · instrumentation      ← acts on the harness
  ⑧ TRUST              policy · evidence
  ⑦ STACK WORKFLOWS    control · capability · standards      (n stacks per team)
  ─────────────────────────────────────────────────────────────────────────
  ⑥ PRODUCT            workspace · projects · repo directives      ⟳ compounds
  ⑤ CONTEXT MGMT       write · select · compress · isolate         ⟳ compounds
  ─────────────────────────────────────────────────────────────────────────
  ④ ORG                humans · accountability · decision rights
  ③ ACTORS             agents · scopes · sessions
  ② WORK ENVIRONMENT   the ontology map · adapters · middleware · hooks
  ① FOUNDATION         model(s) · runtime
```

### 2.2 The five ideas that make it different from what shipped

**A — `PRODUCT` exists.** KD: *"where the outcomes land… in software the deliverable is to the codebase
and likely has directives (eg. loomwarp can only be configured as a monorepo or virtual-monorepo)."*
**There is no product/workspace layer in the shipped model at all.** `F2 Estate` is *what code exists*,
which is inventory, not deliverable.

**B — The `⟳` pair, and it is the sharpest structural claim either thread produced.** KD: *"this
alongside the product layer are the dynamic growing deliverable that makes your agent and agent
harness better over time."*

> `PRODUCT` and `CONTEXT MANAGEMENT` are **the only two layers that accumulate.** Everything below them
> is configured once and revisited rarely; everything above them is machinery that runs.

That is a sharper statement than *"knowledge compounds or it is not knowledge"* — it says **where**
compounding physically happens, and it explains why those two are the layers a team cannot buy.

**C — `WORK ENVIRONMENT` is a declared inventory, and the adapters are derived from it.** KD: *"as a
user, i just might list all the components and tools i use and then **the ai builds the taxonomy and
creates connections**… this is a similar function that MCP is handling as an adapter, but **my harness
isn't aware of it until it happens.**"*

Ports-and-adapters. The architect *declares*; the system *derives*. Covers org, teams, projects, repos
with path aliases and definitions, SaaS, execution environments, data systems — each entry naming its
adapter, interface, auth and owner. **This closes the gap KD named: MCP adapts per-call while the
harness never holds a model of what exists.**

**D — `ACTORS` and `ORG` are named separately.** KD: *"actors (eg. agents) should explicitly be named
alongside the org."* Shipped model has `F9 Roster` — one row for both.

**E — `STANDARDS` is its own component.** KD: *"Looks like we lost things like standards."* It is one
of the four rows carrying LoomWarp's real claim and it is currently a sub-system inside `F5 Capability`.

### 2.3 The publishing shape

Per KD: *"12-factor lists each factor or component as its own .md — this also makes sense within our
system as well since **each of the components would be a functioning system**."* Verified against the
local checkout at `~/Googlyeye-Monsters/12-factor-agents`: README is **260 lines** of navigation;
`content/factor-NN-slug.md` runs **129–260 lines**; `img/NNN-slug.png` numbered to match.

| Band | Components — one file each |
|---|---|
| ① FOUNDATION | `01 model` · `02 runtime` |
| ② WORK ENVIRONMENT | `03 work-environment` · `04 adapters-and-middleware` |
| ③ ACTORS | `05 actors` · `06 scopes-and-sessions` |
| ④ ORG | `07 org-and-accountability` · `08 surfaces` |
| ⑤ CONTEXT MGMT ⟳ | `09 context-management` |
| ⑥ PRODUCT ⟳ | `10 product-and-workspace` |
| ⑦ STACK WORKFLOWS | `11 control` · `12 capability` · `13 standards` |
| ⑧ TRUST | `14 policy` · `15 evidence` |
| ⑨ LIFECYCLE | `16 cadence` · `17 learning-and-instrumentation` |

Each on the **Gas City entry template** — question-word opening sentence, sub-concepts bolded on first
use, inline code for concrete handles, ending on a consequence rather than a feature, 90–130 words at
orientation tier — with a **neutral definition plus an implementation row** (Claude Code · DeepAgents ·
MCP · ours), which is how vendor-neutrality and *build on Claude Code, play nice* coexist.

### 2.4 The vocabulary, settled empirically

Both `docs.gascity.com` and foursignals.dev use **primitive**, and **neither defines it abstractly** —
both define the *set* by binding each member to an unavoidable question (WHO · WHAT · HOW · WHERE ·
CONFIGURES · OBSERVE). A construction, not a definition: **a seventh question would mean a seventh
primitive.**

And the line neither thread has yet drawn:

> **A primitive is a thing you configure. Machinery is a thing that runs.**

Gas City's machinery is *Orchestrator · Bead store · Event bus*. Ours is `router.py` and `dispatch.py`
— **and we currently grade them as though they were configurable.** Full inventory:
[`references/comparisons/2026-08-research/07-verified-inventories.md`](../../comparisons/2026-08-research/07-verified-inventories.md) §2.

---

## 3. Inventory — ours, theirs, missed

### 3.1 What this thread shipped — 7 commits, 4,359 insertions

| Commit | What | Files |
|---|---|---|
| `0c0fded` | Landed the frameworks addendum (1,062 lines, uncommitted for two days) + its five corrections | 7 |
| `90d1928` | **Closed the two-scheme collision** (`E3` meant Control *and* Context) · `00-MAP.md` front door + provenance table · **the five-loops fabrication corrected at source** | 5 |
| `430221e` | The lineage survey · the twelve-node map proposal · `check-doc-links.mjs` | 4 |
| `3634501` | LangChain transcript as primary source + the teardown | 3 |
| `fcafaeb` | **Rebuilt `02-elements.md` from first principles** — twelve elements, twelve conflicts resolved on the record | 5 |
| `07dfe11` | **Fixed three function IDs the codemod got wrong** · widened the checker to `standards`/`fractal`/`docs` · the AAIF correction | 5 |
| `f18de51` | **`07-verified-inventories.md`** — the eight configuration mechanisms, Gas City's primitives/machinery, the six-questions binding, Meng confirmed, and the two fabrications | 2 |

**`fcafaeb` is the direct ancestor of `02-functions.md`.** The other thread's literal action was
`cp 02-elements.md 02-functions.md` plus editing — so this thread's twelve elements, five bands and
twelve-conflict register are what shipped, under a rename it did not perform.

### 3.2 Overlap

| | Files |
|---|---|
| **Ours only** | `07-verified-inventories.md` · `langchain-deepagents.md` · `data/langchain-harness-evals-talk.md` · `00-MAP.md` · `check-doc-links.mjs` · `03-jtbd.md` · `06-frameworks-addendum.md` |
| **Both touched** | `02-harness-taxonomies.md` · `01-worldsfair-2026-vocabulary.md` · `05-harness-factors.md` · `2026-08-research/00-README.md` · `comparisons/00-README.md` · `elements.md` · `06-lineage.md` · `check-element-vocabulary.mjs` · `standards/README.md` · `standards/evaluation-doctrine.md` · `fractal/ISSUES.md` · **`02-elements.md` → `02-functions.md` / `archive/`** |
| **Theirs only** | `02-functions.md` · `09-context-layer.md` · `10-context-gap-analysis.md` · `context-providers/` (6) · `specs/archive/` · `01-concepts.md` · `02-component-matrix.md` · `04-primitives-ontology-platform.md` · `99-source-hygiene.md` · `STRATEGIST-loomwarp.md` · `fractal/workstreams/` (2) · the two codemods |

**No content was lost to the collision.** Both threads' work is committed and green. The cost was
duplicated effort and one class of damage — §4.

### 3.3 ⚠️ Missed — what should have been written and was not

**By this thread** (designed, approved, never created):

| Owed | State |
|---|---|
| `specs/v0-framework/` — the greenfield folder under **any** name | **Never created.** Their §2 names the expected folder `v0-framework-architecture-rebuild/`; KD later named it `v0-framework/`. Neither exists |
| `content/component-01…17` — one file per component, 12-factor shape | **Not started** |
| `img/` — one diagram per component | **Not started** |
| The bottom-up architecture diagram | **Not drawn.** KD's request #1, open in *both* threads |
| `PRODUCT` / `WORK ENVIRONMENT` / `ACTORS` / `ORG` / `STANDARDS` as first-class | **Absent from the shipped model** |

**By both threads:**

| Owed | Why it matters |
|---|---|
| **The eight configuration mechanisms wired into the model** | Landed as an inventory 2026-08-28; **not connected to any function.** It is the empirical answer to *where configuration attaches*, and `F0`/`F1`'s adapter story should be written against it rather than invented |
| **The `primitive` vs `machinery` line applied** | We grade `router.py`/`dispatch.py` as configurable. They are machinery |
| **An answer to *"harness engineering… is mostly context engineering"*** | Galster et al.'s headline is the strongest published challenge to our altitude claim. Recorded, unanswered |
| **The 33 `KD Note` blocks** | 4 engaged across both threads. Three question their own document's premise |

---

## 4. The two-thread mishap

### 4.1 What happened

Both threads received the same intent from KD and neither knew the other existed.

| | `b6965999` — this thread | `6e99188c` — the respec thread |
|---|---|---|
| Read the intent as | **greenfield rebuild in a new folder** | rewrite in place |
| Produced | a plan, approved after 4 rounds of KD feedback | 68 files, +8,443 / −1,031 |
| Executed | **`A-0` only — and reversed it** | fully |
| Failure mode | **designed and did not ship** | **shipped and did not check** |

The collision surfaced when this thread ran `git mv specs/v0 specs/_archive/…` per its approved plan
and the move swept ~1,800 lines of the other thread's **uncommitted** work — including untracked files
— into an archive directory. It was reversed immediately; `find` confirmed every file restored. **The
near-miss is the finding**, not the recovery: a `git mv` on a directory moves untracked files too, and
nothing warned.

### 4.2 Root cause

**Neither thread checked the working tree against its own assumptions before acting.** This thread's
plan was written against `HEAD = fcafaeb` and executed against a tree that had moved far past it.
`git status` was run — and read as *"my uncommitted work"* rather than *"someone else's."*

The single cheapest guard is the one their record already specifies: a **Wave Intent block with
after-state paths, confirmed before any wave that creates, moves, archives or renames files**
(`fractal/workstreams/process-amendment.md` AC-4). Written for either thread, the collision is visible
in one line. **Add one field: the `HEAD` the plan was written against, re-checked immediately before
execution.**

### 4.3 What the checks did and did not catch

Consistent with their §4.2, and this thread produced the confirming instance.

| | |
|---|---|
| **Caught by a check** | Nothing. Every defect in both threads was found by reading a diff or re-fetching a source |
| **The scan/write asymmetry, closed** | `rename-*.mjs` wrote to `projects`, `standards`, `fractal`, `docs`; all four checkers read `projects/` only. Three files asserted wrong function↔name pairs for a full day, green. `check-element-vocabulary.mjs` now walks all four — **and the fix was verified by reintroducing the error and confirming a FAIL**, not by observing a pass |
| **Still open** | The other three checkers still read `projects/` only |

### 4.4 The finding that generalises

**Both fabrications this incident produced were ours, and both came from the same mechanism** — a
summarizing fetch reflowing a page and filling a gap:

- AAIF's *"five harness functions"* presented as five taxonomy terms with scopeNotes of their own. **No
  such records exist.**
- A paper title that does not exist — a summarizer returned *"Configuring Agentic AI Coding Tools"*;
  the real title is *"**Harness Engineering** for Agentic AI Coding Tools."*

> **A relayed count is usually fine. A relayed *name* is not.** Names are what get quoted, and a wrong
> one propagates silently because it reads exactly like a right one.

Full record: `07-verified-inventories.md` §6.

---

## 5. Still open

| # | Item | Where |
|---|---|---|
| **1** | **The greenfield rebuild** — still not started, by either thread | §2 is the design |
| **2** | **Bottom-up map** — KD request #1, open in both threads | `02-functions.md` §1 |
| **3** | Wire the eight configuration mechanisms into `F0`/`F1` | `07-verified-inventories.md` §1 |
| **4** | Apply primitives-vs-machinery; stop grading machinery | `07-verified-inventories.md` §2 |
| **5** | Answer *"mostly context engineering"* | owed in a not-claimed section |
| **6** | Widen the other three checkers to match the codemods' roots | `scripts/` |
| **7** | Duplicate `C-14` — defined in `02-functions.md` **and** `10-context-gap-analysis.md` | both |
| **8** | `specs/archive/00-README.md` §3 announces an `N→E→F` table and contains none | archive |
| **9** | `03-maturity.md` asserts nine, rows only to `F8` | `specs/v0/` |
| **10** | The 33 `KD Note` blocks | KD: *"a separate track or sub-agent… in a FRACTAL workstream"* |

---

## 6. For the consolidated thread

**Three things, in order.**

1. **Decide §2 before anything else: does the nine-band architecture survive, or does the shipped
   five-band model stand?** They are not compatible. The shipped model has no `PRODUCT` layer, no
   declared work environment, and folds actors and org into one row — three things KD asked for
   explicitly. Everything downstream depends on this answer, and **it is the only question in this
   record that is genuinely KD's.**
2. **Re-check `HEAD` immediately before executing any plan**, and never `git mv` a directory without
   `git status` first — it moves untracked files.
3. **Read `07-verified-inventories.md` before writing any object list.** It is the only file in the
   corpus where every item carries a URL and a direct/relayed/unverified mark, and §6 records why that
   matters.

**Two not to repeat:** do not treat green checks as verification — they caught nothing across two
threads and ~12,000 changed lines. And do not run a codemod whose write surface is wider than any
checker's read surface.

---

*Counterpart: [`SESSION-2026-08-28-respec.md`](./SESSION-2026-08-28-respec.md) · Process fix:
`fractal/workstreams/process-amendment.md` · Front door: [`00-MAP.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/00-MAP.md)*
