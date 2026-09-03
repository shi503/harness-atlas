---
title: "The LoomWarp Elements and the Grid (superseded)"
tier: reference
project: loomwarp
created: "2026-08-04"
updated: "2026-08-27"
status: SUPERSEDED
superseded_by: archive/v0/02-functions.md
owner: KD
---

# The LoomWarp Elements and the Grid

> # ⛔ SUPERSEDED — do not cite this file for the element model
>
> **The canonical element map is [`../specs/v0/02-functions.md`](./v0/02-functions.md) §1**, and
> it is the map `scripts/check-element-vocabulary.mjs` parses. This document is retained as history.
>
> **Why this matters more than a normal supersession.** This file numbers seven elements `E1–E7`;
> v0 numbers nine `E0–E8`, and **the renumber is total, not additive**. `E3` here means *Control*
> and `E3` there means *Context*. `E6` here means *Evidence* and `E6` there means *Policy*. Two
> live schemes with colliding IDs made every cross-document element citation in the corpus
> ambiguous. Closing that is why this banner exists.
>
> ## Translation
>
> | This file (superseded) | Canonical v0 | Note |
> |---|---|---|
> | — | **`E0 Substrate`** | New. Was listed below as the non-element *"Adapters / runtime-neutrality"*; overturned — three of three comparable systems build it |
> | **`E1 Workspace`** | **`E2 Estate`** *and* **`E1 Surfaces`** | Split. "Workspace" meant *repos*; the half about where work is **seen and done** — and which surface is the source of truth — had no home |
> | **`E2 Context`** | **`E3 Context`** | Renumbered only |
> | **`E3 Control`** | **`E4 Control`** | Renumbered only |
> | **`E4 Capability`** | **`E5 Capability`** | Renumbered only |
> | **`E5 Policy`** | **`E6 Policy`** | Renumbered only |
> | **`E6 Evidence`** | **`E7 Evidence`** | Renumbered only |
> | **`E7 Learning`** | **`E8 Learning`** | Renumbered only |
>
> ## What is *not* superseded
>
> **The Grid machinery**, which v0 extends rather than replaces: six stages, **the minimum governs
> rather than the mean**, and *"if you cannot point at the artifact, you are one column to the
> left."* Also §3's **D-2** note — that we hold mechanical enforcement at column 4 against
> Factory.ai's level 3, making our stages one column stricter from 3 upward.
>
> `references/grid.html` rendered this file's seven rows until 2026-09-01; it now renders the twelve
> layers, generated from the canonical map by `scripts/gen-grid-rows.mjs`. `R-6` closed.

**Status:** SUPERSEDED — retained as history. See the banner above.
**Owned by, now:** [`../specs/v0/02-functions.md`](./v0/02-functions.md) (the elements) and
[`../specs/v0/03-maturity.md`](./v0/03-maturity.md) (the stages).
**Audience:** anyone tracing why the element set changed, or reading a document that still cites `E1–E7`.

---

## 1. Why the metaphor is load-bearing (and where it stops)

A loom holds two kinds of thread. The **warp** is strung first — fixed, held under tension, running the length of the fabric. The **weft** is where the work is and it's passed across it, over and under, one pass at a time. The warp never becomes the product. It is the structure that makes the product possible, and you cannot weave on a warp you have not strung.

That is the whole architecture:

| Loom | LoomWarp | Meaning |
|---|---|---|
| **Warp** | The 7 **elements** | The persistent structure: repos, context, control, capability, policy, evidence, learning. Strung once, held under tension, reused by every job. |
| **Weft** | A **workstream** | One bounded unit of work, passed across the warp. The thing that actually gets made. |
| **Thread count** | **Maturity stage** | How densely each warp section is strung. Low count tears under load; high count bears weight. |
| **The grid** | **The LoomWarp Grid** | elements × thread count — the 7 × 6 matrix in §3. |

The claim this metaphor is making, precisely: **reliability and scale are properties of the warp, not of the weft.** Making an individual workstream better is weaving a nicer thread. Making the *system* reliable means stringing more warp. That is the difference between an AI widget and AI infrastructure, and it is the whole reason this project exists.

The corollary is the one that actually bites: **fabric tears at its thinnest warp section.** A team at Stage 5 on Context and Stage 1 on Policy does not have a Stage 3 system. It has a Stage 5 system with a hole in it, and every weft thread crossing that hole has nothing to hold onto. Maturity is per-element and the *minimum* governs — this is why a single averaged maturity score is misleading and why the Grid has seven rows instead of one.

**Where the metaphor stops.** The brand vocabulary does not enter the code. `workstream`, `BLUEPRINT`, `router`, `HANDOFF`, and `Feature Lead` stay the words the system uses, because `worktree`, `fork`, and `pattern` already carry specific, different meanings inside Claude Code and agent tooling. "Warp," "weft," and "thread count" are how we *explain* the structure; they are not identifiers. This document is the only place the metaphor does real work.

---

## 2. The seven elements

Ordered as the loop they form: *structure → know → decide → do-with → constrain → prove → improve.*

| # | Element | One sentence | Mechanism |
|---|---|---|---|
| **E1** | **Workspace** | The virtual monorepo — a bootstrap repo plus a machine-readable registry that makes an estate of independently owned repos discoverable and routable without merging them. | `registry/repositories.yaml`, registry-driven clone, gitignored children, `repository.schema.json`‡ |
| **E2** | **Context** | Layered, owned, versioned knowledge served to an agent as a resolvable bundle with provenance and freshness — not a folder it happens to be able to read. | `context/` org → domain → repo layers, path-scoped rules, `context-artifact.schema.json`‡, `resolve-context-bundle.cjs`‡, the wiki substrate |
| **E3** | **Control** | Deterministic decomposition, dependency resolution, and dispatch of scoped work, with zero model in the decision loop. | BLUEPRINT → `router.py` → `dispatch.py`, `work-contract.schema.json`‡ |
| **E4** | **Capability** | The packaged, versioned, distributable unit of *how we work* — skills, agents, plugins, standards — with owners, permissions, and no hard dependency on the hub's filesystem. | `skills/`, plugin + marketplace shape, `standards/`, `capability.schema.json`‡ |
| **E5** | **Policy** | What an agent may do — decided outside the prompt, enforced at a point the model cannot reach, and recorded as a structured decision. | **Enforcement points**: permission tiers, hooks, AST-level lint rules, conformance tests, CI gates. Plus risk tiers R0–R4 and deny-wins evaluation |
| **E6** | **Evidence** | Every claim points at an artifact: structured events, evidence bundles, handoffs, evaluations, traces. Completion is proven, never asserted. | `events.jsonl` (CloudEvents-shaped), `evidence.schema.json`‡, `handoff.schema.json`‡, the eval tiers |
| **E7** | **Learning** | Evaluated outcomes promote versioned changes back into Context and Capability, under owner approval, with rollback. | raw → sources → synthesis loop, compounding finding-classes, promotion gates |

> **‡ = specified, not built.** Verified against the working tree and full git history on 2026-08-26:
> **no `.schema.json` file exists anywhere in this repository**, and the bundle resolver has never been
> committed. Seven schemas and one script are named above as mechanisms; all eight are design intent.
>
> They are kept in the table because the design is real and the shape is decided — but they are marked,
> because §3 of this document states the rule *"if you cannot point at the artifact, you are one column
> to the left"*, and an unmarked mechanism column is precisely how a reader ends up one column to the
> right. This table previously violated the rule the same document states, which is `FM-3` occurring in
> the artifact that defines it. Enforced from now on by `scripts/check-referenced-artifacts.mjs`.

### What the README's four bullets actually were

The current README lists four elements and ends with *"KD Note: I think there might have been more 'elements'."* There were. Three were missing and one was two:

| README bullet as written | Actually |
|---|---|
| 1. opinionated project structure (virtual mono-repo) | **E1 Workspace** |
| 2. consistent, easily shared context layer | **E2 Context** |
| 3. workflows for how work gets scoped, built, tested, and evaluated | **E3 Control** *and* **E6 Evidence** — "scoped and built" is Control; "tested and evaluated" is Evidence. Different owners, very different maturity. Collapsing them is what let the weakest one hide. |
| 4. requirements, frameworks, integrations — "how we work" and "what good looks like" | **E4 Capability** *and* **E5 Policy** — "what good looks like" is Capability (standards, skills); "what you're allowed to do" is Policy (enforcement). |
| *(absent)* | **E7 Learning** |
> KD Note: I didn't finish the README bullets, it was WIP and we needed to fill in the rest

Worth noticing which ones went unnamed: **Policy and Learning — precisely the two with the weakest implementation.** The naming gap and the capability gap are the same gap. You cannot name a warp thread you have not strung.

### Deliberate non-elements

Named here so the count stops inflating:

- **Workers / execution runtime.** The framework's own principle is *deterministic control, probabilistic labor* — which makes the worker substitutable by design. Claude Code today, something else tomorrow. It appears in every diagram; it is not something LoomWarp builds or owns.
- **Adapters / runtime-neutrality.** A cross-cutting property of E2 and E4, not a thing you construct.
- **Retrieval / search.** An E2 implementation detail. Nowhere near settled enough to be a headline.

*(Historical note: the architecture record calls these "planes" and counts seven; an earlier diagram counts six. Mapping is 1:1 except that Workers is dropped and Capability is added. "Element" is the word going forward. No code renames.)*

---

## 3. The Grid

Seven warp threads, six thread counts. Grade each row independently; the fabric is governed by the **minimum**, not the mean.

| | **1 Absent** | **2 Individual** | **3 Shared** | **4 Governed** | **5 Default** | **6 Self-improving** |
|---|---|---|---|---|---|---|
| **E1 Workspace** | Repos found by memory | One dev's local clone layout | Documented layout others copy | Machine-readable registry, owners, interfaces | Registry drives clone, routing, impact analysis | Registry self-updates from the estate |
| **E2 Context** | Whatever's in the window | Personal `CLAUDE.md` | Shared, committed context files | Versioned, owned, layered, reviewed like code | Resolved as a bundle per job, hashed + provenanced | Agents propose context updates; staleness auto-flags |
| **E3 Control** | Ad hoc prompting | One-off scripts | Documented workflow humans follow | Declared dependency graph, deterministic resolver | Cross-repo dispatch from contract, no human in the loop | Graph re-plans from observed outcomes |
| **E4 Capability** | Tribal knowledge | Personal prompt library | Shared skills folder | Versioned packages, owners, standards tier | Distributed via marketplace, permissioned, telemetered | Capabilities retire and promote on usage evidence |
| **E5 Policy** | Whatever the agent can reach | Per-dev permission prompts | Agreed tiers, documented in prose | Invariants enforced mechanically at a point the model cannot reach; deny wins | Risk-tiered per action, fresh authz at each effect | Policy tunes from denial and incident evidence |
| **E6 Evidence** | "It says it's done" | Exit codes and logs | Structured handoff docs | Schema-valid events + evidence bundles, blocking gates | Every claim resolves to an artifact; independent evaluation | Outcome evals can retroactively invalidate a handoff |
| **E7 Learning** | Nothing persists | Individual notes | A wiki someone maintains | Curated synthesis with owners and review dates | Evaluated outcomes promote reviewed changes | Regression-tested promotion with rollback |

> KD Note: we should use the AI-native maturity guide here and go from traditional -> AI-native
> I struggle with this because it isn't as clear and evident as the original AI-native maturity document that had clearly demarcated the gaps: `references/AI-Native Organizational Maturity Framework.md`

**How to read a row.** Find the rightmost cell that is *true with evidence*, not aspirational. If you cannot point at the artifact, you are one column to the left.

**The threshold.** Columns 1–3 are personal and social — they scale with the people who remember them. Column 4 is where structure becomes mechanical: enforced by the harness rather than by good intentions. That boundary (3 → 4) is where "an AI widget" becomes "AI infrastructure," and it is a commitment, not a drift. Teams stall at 3 indefinitely; they do not slide into 4.

> **Where we differ from the market, deliberately (decided 2026-08-26).** Factory.ai's Agent Readiness places mechanical enforcement at **Level 3** — *"clear processes are defined, documented, and enforced through automation"* — which is our **Level 4** wording. **We hold enforcement at 4, and the reason is that the two are not the same enforcement.** Factory's Level 3 is CI automation: linters, builds and tests that run without being asked. Our column 4 requires a control **at a point the model cannot reach** — Macedo's `T4`, stated in the literature as a *membership condition* for being a harness at all. A test suite the agent can skip, disable, or route around is column 3 by our reading and column 3 is where it belongs: agreed, documented, and socially enforced.
>
> The consequence is that **our stage numbers are one column stricter than the market's from 3 upward**, and any cross-instrument comparison must say so. A translation row for adopters who hold both scores: **LoomWarp 4 ≈ Factory 3 ≈ Microsoft 300 (Defined)**. Evidence and the full Factory row set: [`comparisons/2026-08-research/06-frameworks-addendum.md`](../comparisons/2026-08-research/06-frameworks-addendum.md) §2.1.

### The bridge to organizational maturity

The Grid grades **elements** — structural completeness of a warp thread. The established AI-native maturity models grade an **organization** — its posture, culture, and operating model. They are different subjects, but they are the same six stages with the same commitment threshold at 3 → 4, because they are two views of one thing: an org's posture is what its structure permits.

| Stage | **Grid** — this element is… | **Org maturity** — this team is… | Bottleneck |
|---:|---|---|---|
| 1 | **Absent** — no structure exists | **Resistant** — AI is a risk surface to be sandboxed | Trust |
| 2 | **Individual** — one person's setup | **Opportunistic** — personal productivity, not team capability | Repeatability |
| 3 | **Shared** — documented, copied by hand | **Assisted** — shared templates; humans still orchestrate everything | Workflow design |
| — | ⚡ **the commitment threshold** — structure stops being social and becomes mechanical ⚡ | | |
| 4 | **Governed** — enforced by the harness, owned, versioned | **Systematized** — AI designed into core workflows with gates and measurement | Operating model |
| 5 | **Default** — work is designed assuming it | **AI-First** — roles redesigned around abundant intelligence | Org redesign |
| 6 | **Self-improving** — it tunes from its own evidence | **AI-Native** — agents own sub-workflows; internal capability becomes product | Strategic coherence |

**The rule that connects them: your minimum element stage is your organization's real stage.** A team with beautiful context engineering (E2 at 5) and no enforcement (E5 at 1) is not an AI-First organization. It is an Opportunistic one that has invested unevenly — and it will exhibit the Stage-2 failure mode (capability trapped in individuals, unreproducible by anyone else) no matter how sophisticated its strongest thread looks.

This is why the Grid has seven rows and why a single averaged maturity score misleads. The average flatters; the minimum diagnoses.

Two failure modes the bridge makes visible, both common:

- **Structure without commitment (stalling at 3).** Everything is documented, shared, and copied by hand — and nothing is enforced. Teams stay here indefinitely because column 3 feels like progress and costs nothing organizationally. Column 4 requires deciding that the harness, not the human, holds the line.
- **Claiming 6 on a thin E6.** A self-improving element needs a corpus of evaluated outcomes to improve *from*. Any element graded 6 while E6 (Evidence) sits at 2 is claiming a learning loop with nothing to learn from.

**The second threshold.** Columns 5 → 6 requires a corpus of evaluated outcomes that does not exist until you have been running at 4–5 for a while. Nobody starts at 6, and a system claiming 6 on an element where it scores 2 on E6 (Evidence) is claiming a learning loop with nothing to learn from.

### Grid self-grade — LoomWarp today

| Element | Stage | Evidence |
|---|---:|---|
| E1 Workspace | **3** | `registry/repositories.yaml` exists and is read for path resolution; 2 repos; submodules, one private, so a second person cannot clone |
| E2 Context | **2** | 83 lines of markdown across org + domain. A bundle resolver enforcing version/hash/expiry is **specified and unwritten** — no such file exists in this repo (verified 2026-08-26). Nothing enforces context freshness today |
| E3 Control | **4** | `router.py` is a real deterministic resolver and `dispatch.py` dispatches from a contract — but **zero dependency edges have ever been exercised**, so the resolver's core claim is unproven |
| E4 Capability | **2** | 7 skills, 6 vendored verbatim, 1 original and documentation-only. Standards tier does not exist |
| E5 Policy | **1** | 4 tier files, 1 wired, and the only live run used `bypassPermissions` — which skips deny rules entirely. The shipped diagram claims `acceptEdits`. This is the thinnest warp section |
| E6 Evidence | **3** | 8 real events and an outcome classifier that correctly refuses to trust exit codes — but outcome is regexed out of markdown and no event is schema-validated |
| E7 Learning | **1** | The architecture diagram labels it DESIGNED ONLY. Correct and honest |

**Minimum = 1. The fabric tears at E5 and E7.** The mean (2.3) is the misleading number; E5 is the real one, and it is the reason the v1 scope line makes enforced policy non-negotiable.

---

## 4. What this grid is for

Three uses, in descending order of value:

1. **Scoping.** v1 targets a *minimum column*, not a mean. Raising E5 from 1 → 4 does more for the system than raising E2 from 2 → 5, because the fabric is governed by the minimum.
2. **Honest positioning.** Every claim in the README maps to a cell. If the cell is not evidenced, the claim is future tense, and future tense does not belong in a README.
3. **Adoption diagnosis.** A team adopting LoomWarp grades themselves on the same seven rows. The framework's job is to move them right on the rows they are weakest, which is a different conversation than "install this tool."

---

*Companion documents: `../specs/v1/01-gap-analysis.md` scores these rows against four external lenses. `positioning.md` states what may be claimed. `../plan.md` tracks the roadmap.*
