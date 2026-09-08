---
title: "7a · Workflow Tasks"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "7 Workflow Tasks"
sublayer: "7a"
function: "F4 (split)"
job: "J4"
horizon: "emerging"
graded: true
requires: []
---

[← the roster](./00-README.md) — all 33, and the graded split · [CROSSWALK](./CROSSWALK.md) — recorded gaps and the rulings that closed them · [RELATIONS](./RELATIONS.md) — the `requires` graph

### 7a · Workflow Tasks

**Layer 7 Workflow Tasks** · function `F4 (split)` · job `J4`

> **What is the unit of work, written down?**
>
> A workflow task is **the work contract**: one named piece of work with its **inputs**, its
> **done-condition**, its **owner** and its **bound**, expressed as an artifact rather than as a
> conversation. The workflows a team actually runs — review, deploy, incident — are each one of
> these, and **there is one of each.**

**This layer exists because the graded object was the wrong object.** `F4 Control` split across layers
3 and 7 to fix that: [`3a`](./3a-control.md) holds the decomposition, the graph, the
dispatcher and the recovery path — and `router.py` and `dispatch.py`, which are machinery and are not
graded. **The contract those resolvers read is the configurable primitive, and it is graded here**
([`11-architecture.md`](../archive/v0/11-architecture.md) §4, `C-24`; the primitive-versus-machinery line
itself is stated in full once, in [`00-README.md`](../archive/spec/v1-framework/00-README.md), where `AC-7` lands it).

**A team does not configure a resolver. It configures the contract** — and the difference is visible
in what each is good for. A resolver either exists or it does not; a contract can be reviewed,
diffed, argued with before it runs, and inherited by whoever picks the work up next. **That is the
whole test for whether something belongs in this framework at all.**

**Every peer builds this unit and none of them agree on the noun.** Gas City calls a unit of work a
**bead**, *"the universal substrate: tasks, mail, sessions, convoys are all beads differing only by
`type`"*, and the method applied over it a **formula** — *"applying it **produces** work: a formula
materializes as beads that outlive the file and any session."* FRACTAL calls it a **workstream PRD**.
Deep Agents' evaluation harness types a task as `environment` + `solution` + `tests` +
`instruction.md`. **Four teams, four words, one shape** — which is the `emerging` condition
([`12-horizon.md`](../archive/spec/v1-framework/12-horizon.md) §2).

**The done-condition is what makes it a contract rather than a ticket.** A unit of work whose
completion is asserted by the thing that did it is not a contract; it is a claim. The published
implementation worth reading is a rubric declared up front and graded at the moment the agent would
otherwise finish — *"what done looks like"*, written before the work and evaluated against the
transcript after it.

**What this layer is not.** It is not [`3a`](./3a-control.md), which sequences these
units and decides which runs next. It is not [`9c`](./9c-cadence.md) Cadence, which decides
*when* one runs without being asked. It is not [`11a`](./11a-surfaces.md), where the unit is
**seen** — a board is a view of these, and a team can have an immaculate board over contracts that
say nothing.

**How do we work?** *"The workflows we actually run — review, deploy, incident — are each written down as a task with its inputs, its done-condition and its owner, and there is one of each."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The unit exists and is **runtime state rather than an artifact** — the orchestration mechanics it carries are enumerated at [`3a`](./3a-control.md). What matters here is the form: **a task you cannot open in an editor and diff is a thing that runs, not a thing you configure**, which is this row's own distinction met on the wrong side of it | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides* — Orchestration row |
| **Deep Agents** | Two answers at two altitudes. Inside the loop, a **todo list** in the default middleware stack — the weakest form of the object. Outside it, its eval harness types a task as **`environment` + `solution` + `tests` + `instruction.md`**, which is a genuine work contract with a done-condition, built for grading rather than for doing | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §2 *The default stack, in order*, §3 |
| **MCP** | **Nothing here.** MCP resolves a call. It has no notion of a unit of work, an owner or a done-condition — and a tool surface with no contract over it is exactly the condition where an agent's own summary becomes the completion record | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | **task** as a first-class product primitive alongside session, artifact, worktree and repository — and the contract distributed as files rather than held in a runtime: a published prompt per phase, with the plan required to be *"super precise about the testing / verification steps in each phase"*. **The done-condition is written into the artifact**, which is the property this row grades | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3, §6 |
| **LoomWarp** | A **work-contract schema** and the workstream PRD behind it — the object this row grades, and one of the few things in its column that is genuinely built. ⚠️ The contract is real; what has never been exercised is the graph around it, which is `3a`'s row and a different grade | [`loomwarp.md`](../content/loomwarp.md#7a-workflow-tasks) · [`fractal.md`](../content/fractal.md#7a-workflow-tasks) |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 4 · ◐ 5 · ○ 1** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#7a-workflow-tasks) | ◐ | `TodoWrite` + agent-team shared task list — session/team-scoped, not durable |
| [Codex](../content/codex.md#7a-workflow-tasks) | ◐ | Cloud-task object at the product layer; no local CLI task primitive |
| [FRACTAL](../content/fractal.md#7a-workflow-tasks) | ● | [**Workstream (PRD)**](../content/fractal.md#5-primitives) — the stated unit of work |
| [Gas City](../content/gas-city.md#7a-workflow-tasks) | ● | [**Bead**](../content/gas-city.md#5-primitives) `open`→`in_progress`→`closed`; **Convoy** groups related work |
| [Grok](../content/grok.md#7a-workflow-tasks) | ◐ | `plan.json`/`todo_write`; routine run history; no ticket object |
| [Hermes](../content/hermes.md#7a-workflow-tasks) | ● | [**Kanban task**](../content/hermes.md#5-primitives) — SQLite board, *"owns lifecycle truth"* |
| [LoomWarp](../content/loomwarp.md#7a-workflow-tasks) | ● | [**Work contract**](../content/loomwarp.md#5-primitives) — a BLUEPRINT entry + PRD, named in the current spec |
| [OpenClaw](../content/openclaw.md#7a-workflow-tasks) | ◐ | Six task-shaped objects, vendor concedes the overlap itself |
| [OpenCode](../content/opencode.md#7a-workflow-tasks) | ◐ | `todowrite` tool + [**Command**](../content/opencode.md#5-primitives) templates; no ticket/plan object |
| [Pi](../content/pi.md#7a-workflow-tasks) | ○ | Deliberately none — *"They confuse models. Use a TODO.md file"* |

**Horizon:** `emerging` — `11-architecture.md` §4 — the work contract is the configurable primitive and the resolver is machinery (`C-24`). Peers ship the unit under three names: Gas City `beads`/`orders`, FRACTAL's workstream PRD, QM's per-scope tasks

**The consequence.** A layer whose only artifact is a resolver grades a team on whether it installed
something. **Grading the contract instead asks whether the team has decided what a piece of work
is** — and that question survives every substrate change beneath it, because the resolver is
replaceable and the contract is the thing the next one will have to read.
