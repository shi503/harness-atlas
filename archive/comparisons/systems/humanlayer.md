---
title: "HumanLayer — the multiplayer control plane, and the strongest attack on the category"
tier: reference
project: loomwarp
created: "2026-08-30"
status: DRAFT
owner: KD
source: "clones: humanlayer @ 99abe673 (2026-06-18) · fold @ c0075770 (2026-08-29) · humanlayer-skills @ 3c262914 (2026-08-13) · advanced-context-engineering-for-coding-agents @ f2bc7aec (2026-08-04) · rpi-coordination-template @ 90a4e7b2 (2026-08-03) · 12-factor-agents @ d20c7283 (2025-09-21)"
---

# HumanLayer

**Why this file exists at all.** HumanLayer was in this corpus from the beginning — as a *critic*.
[`../03-jtbd.md`](../03-jtbd.md) §5 quotes Dex Horthy's keynote and Kyle Mistele's lights-off factory
under *"positions worth answering"*;
[`../2026-08-research/05-harness-factors.md`](../2026-08-research/05-harness-factors.md) uses
12-Factor Agents as the genre model for our own fourteen factors. **We cited the argument and never
catalogued the company.** The company's live tagline is:

> **"The multiplayer control plane for your software factory"**

which is, close to word for word, the sentence [`../03-jtbd.md`](../03-jtbd.md) uses for LoomWarp.
This is the nearest competitor in the corpus, and it was recorded as a footnote.

---

## 1. What it is

Four things, and it matters that they are separable — this is a **method**, distributed several ways,
with a product underneath.

| | | |
|---|---|---|
| **12-Factor Agents** | 25.6k★, Apache-2.0 / CC-BY-SA, 2025-03-30 | The most-adopted principle manifesto in the space. Twelve factors, single-agent altitude |
| **ACE-FCA** | 2.6k★, essay + benchmarks | *Advanced Context Engineering for Coding Agents* — **frequent intentional compaction** and the **research → plan → implement** loop |
| **`fold`** | `@humanlayer/fold`, active | Effect-native, provider-agnostic agent core, CLI and TUI. The live OSS line |
| **humanlayer.com** | $0 / $100-per-seat / Enterprise | The product: *"The Multiplayer Coding Agent Workspace"* |

**And one thing that is now gone.** `humanlayer/humanlayer` — the 11.4k★ monorepo containing `hld`
(the Go approvals daemon), `hlyr` (the CLI + MCP server), `humanlayer-wui` (CodeLayer, Tauri+React)
and `claudecode-go` — carries a README that now reads, in full:

> *"public issues repo for humanlayer — the code here is pretty much all deprecated — you can try the
> rebuild of humanlayer at https://humanlayer.com — thanks for all your support — dex"*

Last substantive push **2026-06-19**. The teardown below reads it as **archaeology**, which is
legitimate and in some ways more useful than reading a live repo: it is the design its authors
abandoned, and you can see exactly which parts survived into the product.

---

## 2. The argument — *Why Software Factories Fail*

The corpus has been quoting this keynote from a schedule listing. The **full text is in the clone**,
`advanced-context-engineering-for-coding-agents/wsff.md`, 705 lines. Quotes here are exact.

The chain, compressed:

1. **Claude Code won because Anthropic RL'd the model *inside the harness*** — *"the first time a lab
   trained a model against the exact tools they were going to ship it with."* Corollary, attributed
   to an OpenAI talk: *"if you build a harness but you don't own the weights and can't RL the model
   inside it, you'll always be at a disadvantage to a team that owns both."*
2. **RL rewards a one-dimensional signal.** SWE-bench-style tasks score `FAIL_TO_PASS` and
   `PASS_TO_PASS`. **There is no penalty for bad design.**
3. **The reward signal cannot reach design, because design has no fast oracle:**

   > *"Tests give you feedback in seconds, but the cost function of bad architecture is measured in
   > weeks, months, maybe even years."*

   > *"if a model could reliably tell good code from bad, it might have written the good version to
   > begin with, but maintainability has no fast oracle, so we can't reward for it during RL"*

4. **Therefore review agents raise the floor but not the ceiling** — *"they don't move the ceiling,
   because the ceiling is whatever we managed to teach the model in RL."*
5. **So put the human back, at the highest-leverage point** — not on the code:

   > *"A bad line of code is… a bad line of code. But a bad line of a **plan** could lead to hundreds
   > of bad lines of code. And a bad line of **research** … could land you with thousands of bad
   > lines of code."*

6. **And the real product of review is not correctness — it is mental alignment.** *"the biggest
   source of internal unrest … was the lack of mental alignment. I was starting to lose touch with
   what our product was and how it worked."*

**The one sentence in this file that our own thesis should be read against.** Describing why bad
design is unlearnable, the essay's diagram caption is:

> *"A bad decision leads to random slop leads to a bug/incident weeks or months later — and **there's
> no way to backprop the incident to the decision that caused it**."*

**That is `F7`'s join — the join between what an agent saw and what came of it — stated as the
central unsolved problem, by the person the corpus files under *positions worth answering*.** He does
not claim to solve it. He routes around it by moving humans upstream. See §8.

**And the closing move is `J17`.** The final section is literally titled *"a theory of constraints
(2026 edition)"*: *"Models are good at some things, not so good at others. How do you optimize your
process in light of those constraints?"*

---

## 3. The method — ACE-FCA, and what it actually prescribes

> *"designing your ENTIRE WORKFLOW around context management, and keeping utilization in the 40%-60%
> range"* — `ace-fca.md`

Three steps, each with a published prompt that is a real file in the clone:

| Phase | Prompt | What it produces |
|---|---|---|
| **Research** | `.claude/commands/research_codebase.md` | *"Understand the codebase, the files relevant to the issue, and how information flows"* |
| **Plan** | `.claude/commands/create_plan.md` | *"the exact steps … being super precise about the testing / verification steps in each phase"* |
| **Implement** | `.claude/commands/implement_plan.md` | *"Step through the plan, phase by phase"*, compacting status back into the plan file after each verified phase |

Only implementation happens in a worktree; *"we tend to do everything else on main."*

**Its own stated distribution of effort** — the honest part, and the part a maturity model should
copy:

- ~40% of tasks are one-shot, or one-shot with light feedback
- medium tasks get product and system design in **one** document, no phases
- only large things get the whole ladder

**The cost is published.** *"our team of three is averaging about $12k on opus per month."* That is a
number `J12 account` has nowhere else in the corpus.

**And so is a failure.** *"In August the whole team spent 2 weeks spinning circles on a really tricky
race condition."* A stated-limitation register, in prose, unprompted —
[`../00-README.md`](../00-README.md) §5 row 10 wants exactly this.

---

## 4. `thoughts/` — the context layer, and it is the row we said nobody has

`hlyr/THOUGHTS.md` and `hlyr/src/thoughtsConfig.ts`. This is the most directly transferable mechanism
in the whole teardown.

**A separate git repository**, mounted into every code repo:

```
your-project/                     ~/thoughts/
├── src/                          ├── repos/
├── thoughts/                     │   ├── your-project/
│   ├── alice/     ───────────────┼──►│   ├── alice/       (individual)
│   ├── shared/    ───────────────┼──►│   └── shared/      (team, per repo)
│   ├── global/    ───────────────┼──►└── another-project/
│   │   ├── alice/                └── global/
│   │   └── shared/                   ├── alice/           (individual, cross-repo)
│   ├── searchable/                   └── shared/          (team, cross-repo)
│   └── CLAUDE.md   ← auto-generated
```

Four properties worth naming:

1. **The individual/team boundary is a directory, and it is crossed with the cross-repo boundary.**
   `alice` × `shared` on one axis, per-repo × `global` on the other. That is a **2×2**, and it is
   strictly more expressive than gbrain's `brain × source`, Indigo's `core`/`personal`, or QM's
   scope. [`../00-README.md`](../00-README.md) §F-2 row 1 says `F3` has no place for this
   distinction. Here is a fourth peer treating it as first-class, and the sharpest shape of it.
2. **It binds mechanically.** *"Pre-commit hook — prevents `thoughts/` from being committed to your
   code repo. Post-commit hook — syncs thoughts changes to your thoughts repository."* Not prose.
   Hooks. This passes [`../00-README.md`](../00-README.md) §1.4 question 3 — the question our own
   system fails.
3. **`searchable/` is a hard-link tree** *"to allow AI tools to search your thoughts content without
   needing to follow symlinks"*, read-only to prevent edits. **A retrieval affordance built for the
   agent rather than for the human** — the addressee move `06-frameworks-addendum.md` W-2 argues for,
   applied to a filesystem.
4. **`thoughts/CLAUDE.md` is auto-generated.** The context layer writes the harness's instruction
   file. That is a **context adapter**, which is row 2 of
   [`../02-component-matrix.md`](../../../components/MATRIX.md) — the row added 2026-08-27 whose emptiness
   was *"the finding."* It is not empty any more.

---

## 5. Multi-repo — built, then absorbed

`rpi-coordination-template` is four files, and it is LoomWarp's shape:

- `.claude/settings.json` grants `permissions.additionalDirectories: ["../repo1", "../repo2"]`
- `CLAUDE.md` lists the repos and their descriptions
- sessions are run **from the coordination repo**, never from a member repo
- for a task, `rpi:setup-worktree` creates `workspaces/<task-slug>/` containing a worktree of **each
  participating repo plus the coordination repo**, all on the same branch

**A unit of work is therefore N worktrees across N repos, plus a control repo, on one branch.** That
is a virtual monorepo with a control plane, in four files.

**And its own README retires it:**

> *"⚠️ NOTE — if you are using humanlayer and have found your way to this repo, it is very possible
> that the [Workspaces feature] obviates the need for a standalone repo, or at least the claude
> config and additionalRepos part of it. You may still want this setup for shared AGENTS.md, skills,
> etc."*

`docs.humanlayer.com/guide/workspaces` confirms the product primitives — **tasks, sessions,
worktrees, repositories, artifacts** — and a `/rpi:configure-workspaces` skill. ◐ fetch-layer.

**The residue is the interesting part.** What survived the move into the product is *shared
`AGENTS.md` and skills* — the standards-and-capability tier. The orchestration got absorbed; the
canon did not.

### `<important if>` — conditional context, as a technique

Both the coordination template and the `improve-claude-md` skill use `<important if="condition">`
blocks. The skill states the mechanism plainly:

> *"Claude Code injects a system reminder with every CLAUDE.md that says: 'this context may or may not
> be relevant… ' … The more content that isn't applicable to the current task, the more likely Claude
> is to ignore everything — including the parts that matter."*
> Rule of thumb: *"if it's relevant to 90%+ of tasks, leave it bare. If it's relevant to a specific
> kind of work, wrap it."*

**Context assembly performed by the model at read time rather than by a resolver at load time.** It
is cheaper than a Briefing and strictly weaker — nothing records which blocks fired. Worth holding
next to `F3` as the low-cost baseline any assembly mechanism has to beat.

---

## 6. Primitives it names

| Layer | Its primitive set |
|---|---|
| **Product** | **task** · **session** · **artifact** · **worktree** · repository |
| **Method (RPI)** | research · plan · implement — plus **PRD** and **TDD** as the split variant |
| **`thoughts`** | thoughts repo · `repos/` vs `global/` · `<user>` vs `shared` · `searchable/` |
| **`hld` (deprecated)** | session · approval · contact channel · event |
| **`fold`** | event log · projection · **hook phase** · skill · subagent · stop condition · compaction |

Five at the product layer — inside the five-to-seven band.

**A vocabulary discrepancy, recorded rather than resolved.** The keynote (`wsff.md`, 2026-08) names
four phases: *Product Requirements · System Architecture · Program Design · Vertical Slices*. The
docs name three — *Research · Design · Implementation* — with **RPI** and **PRD-oriented** as
variants. The marketing site was fetched as **QRSPI**, six phases. **Three phase vocabularies from
one company inside one quarter.** This is `FM-3` documentation drift in a competitor, and it is worth
noting only because [`../00-README.md`](../00-README.md) §F-6 files the identical defect against us.

### `fold`'s hook phases — and a three-way convergence

`packages/fold-core/src/HookRunner/Errors.ts`:

```ts
export type HookPhase = 'preRequest' | 'preToolUse' | 'postToolUse' | 'onComplete'
```

**Four phases.** Set that beside Deep Agents' middleware hooks (`before_agent` / `before_model` /
`wrap_model_call` / `wrap_tool_call` / `after_agent`) and Claude Code's lifecycle events. Three
independent teams, three languages, and the *shape* is the same: **wrap the request, wrap the tool,
bracket the session.** [`../02-component-matrix.md`](../../../components/MATRIX.md) should treat the
insertion-point set as a converged interface, not a per-vendor detail.

`fold-core` is also **event-log-plus-projection** — `EventLog`, `Projection`, `Compaction`,
`StopConditions`. A session is a log you fold into state. That architecture makes reconstruction
free, which is worth noting against `F7`, though `fold` does not currently use it that way.

---

## 7. Human-in-the-loop, as actually implemented

The deprecated daemon is still the clearest published implementation of the primitive the company is
named after.

- **Contact channels**: Slack, email, CLI, web (`CLAUDE.md`)
- **Flow**: `Claude Code → MCP → hlyr → JSON-RPC → hld → HumanLayer Cloud API`, with TUI and WUI both
  attached to `hld`
- **Approval statuses** (`hld/PROTOCOL.md`): `NULL` (no approval needed) · `pending` · `approved` ·
  `denied` · `resolved` *(generically resolved — external resolution)*
- **Interface** (`hld/approval/types.go`): `CreateApproval` · `GetPendingApprovals` ·
  `ApproveToolCall(id, comment)` · `DenyToolCall(id, reason)`

**Two design decisions worth stealing.** Approve carries a **comment** and deny carries a **reason** —
the decision is a record, not a bit. And `resolved` exists as a distinct terminal state for approvals
settled outside the system, which is the honest acknowledgement that a control plane never owns every
channel.

**Also present:** six named subagents (`codebase-locator`, `codebase-analyzer`,
`codebase-pattern-finder`, `thoughts-locator`, `thoughts-analyzer`, `web-search-researcher`) and
**27 slash commands** including `create_handoff.md` and `resume_handoff.md`. FRACTAL's HANDOFF,
independently arrived at, in a competitor's `.claude/` directory.

---

## 8. Credibility check

| | |
|---|---|
| **Shipping?** | Yes, and paid — $100/user/month, free ≤3 seats. ◐ fetch-layer on pricing |
| **Adopted?** | 12-Factor Agents at **25.6k★** is the most-adopted artifact in this corpus by an order of magnitude |
| **Dogfooded?** | Extensively and verifiably — the `.claude/` directory in the clone *is* the method, and the essay links its own prompts to files in it |
| **Self-serving?** | Yes and it says so: *"okay so clearly you have something to sell me."* The argument that models cannot learn design is also the argument for buying a human-review product |
| **Falsifiable?** | Partly. The BAML claims name real merged PRs (BoundaryML#2259, #2357, #2330). The *"models degrade codebase quality"* claim rests on an argument about RL reward shape, not a measurement |
| **Honest about limits?** | Unusually — a named two-week failure, a published token bill, *"I won't even try to convince you that research/plan/implement is the right approach for most teams — it probably isn't"* |
| ⚠️ **Sourcing** | §§2–7 are clone-exact at the SHAs in the frontmatter. Pricing, the QRSPI phase list and the Workspaces description are **fetch-layer**, marked ◐ inline |

**The inclusion test** ([`../00-README.md`](../00-README.md) §1.4): persists across sessions ✅
(`thoughts` is a git repo; `hld` has a store) · serves more than one person ✅ (shared tier, seats,
design reviews) · binds mechanically ✅ (pre/post-commit hooks, `additionalDirectories`, approval
daemon). **Passes all three. It is a peer column, not a short profile.**

---

## 9. What to steal, in priority order

| # | Take | Where it lands |
|---|---|---|
| **1** | **`thoughts` as the shape of `F3`** — separate repo, `repos/` × `global/` crossed with `<user>` × `shared`, symlinked in, hooks enforcing the boundary, hard-linked `searchable/` for agents, generated `CLAUDE.md` | `F3` + the empty `Context adapter` row. This is the most complete answer in the corpus to `F-2` row 1, and it is four files of shell |
| **2** | **Leverage-ordered review** — review the research, then the plan, then the code, because errors multiply downward | `F6`/`J8`. Our human-in-the-loop posture asks *how much autonomy*; this asks *at which artifact*, which is the better question |
| **3** | **Approve-with-comment / deny-with-reason, and a `resolved` state** | `F6`/`F7`. Makes every approval an evidence record, and admits out-of-band resolution |
| **4** | **The published effort distribution** — 40% one-shot, medium gets one doc, only large gets the ladder | The maturity diagnostic. A ladder that does not tell you when to skip it will be skipped entirely |
| **5** | **Publish the token bill** — *"$12k on opus per month"* for a team of three | `J12 account`. The only per-team cost figure in the corpus |
| **6** | **`<important if>` conditional context** | `F3` — the cheap baseline the Briefing must beat, and a real technique regardless |
| **7** | **The stated-limitation register in prose** — a named two-week failure, in the marketing essay | Everything. Corroborates `00-README.md` §5 row 10 from a third source |
| **8** | **Coordination repo + per-task multi-repo worktree set on one branch** | `F0`/`F1`. Our virtual-monorepo shape, with a working reference implementation and a published verdict on where it stops scaling |

---

## 10. What this does to our claims

**① The critic and the competitor are the same company, and the corpus separated them.**
[`../03-jtbd.md`](../03-jtbd.md) §5 answers Horthy's argument with `J8` — *"if you cannot verify
quality quickly, you can at least record what produced it and evaluate retroactively."* That answer is
**better than the corpus knew**, because Horthy's own text names the missing mechanism in our words:
*"there's no way to backprop the incident to the decision that caused it."* **Our `F7` is the
affirmative form of his impossibility claim.** That should be stated explicitly, and it is the single
strongest external corroboration the provenance thesis has.

**② …and his answer is the cheaper one, which is the real challenge.** He does not build the join. He
moves the human upstream to research and plan, where a mistake is cheap to catch, and accepts that
retroactive attribution is unavailable. **A reviewer will ask why we are building the expensive
mechanism when a competitor got the outcome by reordering its review queue.** The answer has to be
about scale — leverage-ordered review is bounded by how many plans one person can read, and it does
not survive the multi-repo, multi-team case — but the corpus does not currently make that argument
anywhere.

**③ `OPEN-8` (Rituals) should close in favour of first-class.** RPI is a named, shipped, documented,
skill-distributed phase set with an artifact per phase and a stated human checkpoint at each. It is
sold. It has variants (RPI vs PRD-oriented). **It is precisely KD's definition — a scheduled loop that
emits an artifact.** Fourth independent peer; the corroboration standard is met twice over.

**④ `F-2` row 1 is settled by evidence, and the answer is a 2×2.** Individual vs team memory is not
one axis. `thoughts` crosses it with per-repo vs cross-repo. `F3` should carry both or explicitly
decline the second.

**⑤ The `Context adapter` row has an occupant.** `02-component-matrix.md`'s newest row was added with
the note that its emptiness was the finding. `thoughts` fills it — separate store, mounted into the
harness, generating the harness's own instruction file.

**⑥ 12-Factor Agents can be cited as verified.** Read from disk at `d20c7283`. The twelve are exactly
as the corpus records them, and Factor 7 — *Contact humans with tool calls* — makes human contact a
**structured output** (`RequestHumanInput` with `urgency` and `format`) rather than a control-flow
break. That is the design decision the whole company follows from, and it belongs in `F6`.

**⑦ A path claim, dated, for the whole category.** OSS process layer (2025-03 → 2026-06) → deprecated
in place → hosted product with the same primitives, plus a live OSS agent core with no process opinion
in it (`fold`). **The method stayed free; the coordination became the product.** Everything in
[`../00-README.md`](../00-README.md)'s layer-3 row should be read against that trajectory, ours
included.

---

## 11. Sources

**Clones** (all under `/Users/kevindeng/Googlyeye-Monsters/`, read 2026-08-30; quotes exact):

| Path | SHA | Files cited |
|---|---|---|
| `humanlayer/` | `99abe673` | `CLAUDE.md` · `hld/PROTOCOL.md` · `hld/approval/types.go` · `hlyr/THOUGHTS.md` · `hlyr/src/thoughtsConfig.ts` · `.claude/{agents,commands}/` |
| `advanced-context-engineering-for-coding-agents/` | `f2bc7aec` | `ace-fca.md` · `wsff.md` · `side-quests/where-does-the-time-go.md` |
| `fold/` | `c0075770` | `README.md` · `packages/fold-core/src/HookRunner/Errors.ts` |
| `rpi-coordination-template/` | `90a4e7b2` | `README.md` · `CLAUDE.md` · `.claude/settings.json` |
| `humanlayer-skills/` | `3c262914` | `plugins/improve-claude-md/skills/improve-claude-md/SKILL.md` |
| `12-factor-agents/` | `d20c7283` | `README.md` · `content/factor-*.md` |

**Fetch-layer** — marked ◐ where used, per
[`../2026-08-research/99-source-hygiene.md`](../2026-08-research/99-source-hygiene.md) §5:

- <https://www.humanlayer.dev/> — tagline, pricing tiers, the **QRSPI** six-phase list
- <https://docs.humanlayer.com/guide/workspaces> — task/session/worktree/repository primitives
- <https://docs.humanlayer.com/explanation/workflow-phases> — Research · Design · Implementation; RPI
  vs PRD-oriented; PRD and TDD

**Not established.** Whether QRSPI is current product vocabulary or superseded by the three-phase docs
model; whether `humanlayer.com` and `humanlayer.dev` are the same product surface; seat count,
revenue, or any adoption figure for the paid product.

---

*Companion: [`langchain-deepagents.md`](./langchain-deepagents.md) · the corrections these two force:
[`../2026-08-research/08-humanlayer-and-deepagents-recheck.md`](../2026-08-research/08-humanlayer-and-deepagents-recheck.md)*
