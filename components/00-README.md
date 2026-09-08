---
title: "Tier 2 — the components, and the roster that names them"
tier: components
status: DRAFT
provenance: AUTHORED
created: "2026-09-08"
owner: KD
---

# The components

**Thirty-three components under twelve layers.** The layer is navigation; **the component is the
gradeable function.** One page each: what it is, the single best example, and a peer table whose every
cell links into a harness profile.

Start at [`../index.md`](../index.md) for the shape, [`../README.md`](../README.md) for the argument.

---

## The roster — this file is the register

**Component IDs are `<layer><letter>`, `0a`…`11a`.** This table is where they live. It was the one
thing the corpus asserted and never located: the contract pointed at a specification's derivation
table, which is an argument for the ID space rather than a register of it.

**Two independent derivations agree on all thirty-three**, which is why this table can be trusted
without a checker counting it:

1. **Each page's own `sublayer:` frontmatter** — carried since 2026-08-31, one per file.
2. **The teardown skill's inline checklist**, [`harness-teardown/SKILL.md` §`## 4. Component matrix`](../skills/harness-teardown/SKILL.md#-4-component-matrix--50),
   which states in bold that it *"is inline on purpose and is never read from a spec."*

Those two were written eight days apart from different sources and produce the same 33 ids and the
same 33 names. **If they ever disagree, this table is wrong and the skill is right** — the skill is
what a teardown actually runs against.

**The `Anchor` column is the profile anchor**, not this page's. Every harness profile in
[`../content/`](../content/) carries the same 33 `#### <id> <Component>` headings, so
`content/<harness>.md#2b-hooks` lands on that harness's Hooks detail. That is the mechanism the whole
atlas turns on: one component, every harness, one hop.

| Layer | id | Component | The question the row answers | Horizon | Profile anchor |
|---|---|---|---|---|---|
| **0 · Foundation** | `0a` | [Substrate](0a-substrate.md) | Which model, which harness underneath, and what it costs to move | `shipped` | `#0a-substrate` |
| **1 · Environment** | `1a` | [Environment](1a-environment.md) | What can the loop reach — shell, filesystem, network, other systems | `bet` | `#1a-environment` |
| **2 · Agent Harness** | `2a` | [Adapters & Middleware](2a-adapters-and-middleware.md) | How the loop reaches any of it — providers, MCP, ACP, SDK, protocol | `shipped` | `#2a-adapters--middleware` |
|  | `2b` | [Hooks](2b-hooks.md) | Which lifecycle events fire, in what language, fail-open or fail-closed | `shipped` | `#2b-hooks` |
|  | `2c` | [Enforcement](2c-enforcement.md) | What binds mechanically — deny lists, sandboxes, trust gates, and what survives auto modes | `shipped` | `#2c-enforcement` |
| **3 · System Stacks** | `3a` | [Control](3a-control.md) | How intent becomes work allowed to start — plan mode, approvals, run contracts | `shipped` | `#3a-control` |
|  | `3b` | [Routing](3b-routing.md) | Which model or agent gets which job, and who decides | `emerging` | `#3b-routing` |
|  | `3c` | [Composition](3c-composition.md) | Sub-agents, delegation, system-prompt composition | `emerging` | `#3c-composition` |
|  | `3d` | [Configuration](3d-configuration.md) | Instruction files, settings precedence, scopes, managed settings | `shipped` | `#3d-configuration` |
|  | `3e` | [Standards](3e-standards.md) | Sanctioned ways to express things — schemas, conventions, refusal lists | `bet` | `#3e-standards` |
| **4 · Capabilities** | `4a` | [Capability](4a-capability.md) | Skills, tools, packages — what the team can do and how it travels | `shipped` | `#4a-capability` |
|  | `4b` | [Capability Permissions](4b-capability-permissions.md) | Who may use which capability, and how that is expressed | `emerging` | `#4b-capability-permissions` |
| **5 · Context ⟳** | `5a` | [Individual Memory](5a-individual-memory.md) | What one operator's session remembers, where, in what format | `emerging` | `#5a-individual-memory` |
|  | `5b` | [Team Memory](5b-team-memory.md) | What is shared across people and survives them | `emerging` | `#5b-team-memory` |
|  | `5c` | [Knowledge](5c-knowledge.md) | Curated, retrievable, cited context beyond memory | `shipped` | `#5c-knowledge` |
| **6 · Workspaces ⟳** | `6a` | [Product](6a-product.md) | Where the work lands and what it is not allowed to become | `bet` | `#6a-product` |
|  | `6b` | [Infrastructure](6b-infrastructure.md) | Runtimes, containers, remote execution, provisioning | `emerging` | `#6b-infrastructure` |
|  | `6c` | [Estate](6c-estate.md) | The inventory of repos, services and environments the team owns | `emerging` | `#6c-estate` |
|  | `6d` | [Delivery](6d-delivery.md) | How work ships — CI, PR flow, release cut | `bet` | `#6d-delivery` |
| **7 · Workflow Tasks** | `7a` | [Workflow Tasks](7a-workflow-tasks.md) | The unit of work, written down — tickets, beads, plans, todos | `emerging` | `#7a-workflow-tasks` |
| **8 · Trust** | `8a` | [Evals](8a-evals.md) | What work must clear before it ships — benchmarks, rubrics, judges | `shipped` | `#8a-evals` |
|  | `8b` | [Evidence](8b-evidence.md) | The record that it did — receipts, audit logs, transcripts | `shipped` | `#8b-evidence` |
|  | `8c` | [Observability](8c-observability.md) | Spans, metrics, events, and where they go | `shipped` | `#8c-observability` |
|  | `8d` | [Efficiency](8d-efficiency.md) | Token, cost and time accounting, and what acts on it | `emerging` | `#8d-efficiency` |
| **9 · IMPROVE** | `9a` | [Learning](9a-learning.md) | What happens to a lesson after it is learned — authored skills, memory curation | `emerging` | `#9a-learning` |
|  | `9b` | [Rituals](9b-rituals.md) | Recurring human practices the harness knows about — reviews, retros | `emerging` | `#9b-rituals` |
|  | `9c` | [Cadence](9c-cadence.md) | Schedules, loops, cron, heartbeats | `shipped` | `#9c-cadence` |
|  | `9d` | [Anti-fragile Lifecycle](9d-anti-fragile-lifecycle.md) | How failure is captured and turned into a rule — defect ledgers, post-mortems | `bet` | `#9d-anti-fragile-lifecycle` |
|  | `9e` | [Raise the Floor](9e-raise-the-floor.md) | Mechanisms that lift the worst case — templates, guardrails, golden paths | `bet` | `#9e-raise-the-floor` |
|  | `9f` | [Diagnose the Bottleneck](9f-diagnose-the-bottleneck.md) | Instruments that show where throughput is lost | `bet` | `#9f-diagnose-the-bottleneck` |
| **10 · Teams & Agents** | `10a` | [Roster](10a-roster.md) | Who is on the team — agents, people, roles, owners | `emerging` | `#10a-roster` |
|  | `10b` | [Org](10b-org.md) | Teams of teams, tenancy, operators and scopes | `claimed` | `#10b-org` |
| **11 · Surfaces** | `11a` | [Surfaces](11a-surfaces.md) | Where work is seen and agreed — TUI, IDE, chat, web, and which version is true | `emerging` | `#11a-surfaces` |
**Horizon** is the component's own marker — `shipped` · `emerging` · `bet` · `claimed` — carried from
each page's frontmatter. It says how much of the field has built this thing, not how good it is.

---

## Where this came from

These pages are **carried, not re-authored.** They were written 2026-08-31 as the v1 framework's
component entries and moved here on 2026-09-08 at 74–97 lines each, against this tier's ~80-line
target — the rebuild the plan once called for turned out to be a rename, a de-bleed and a re-point.
`provenance: INHERITED` on each page records that.

The **derivation** — why each component exists, and where every retired `F0`–`F16` citation lands —
is the crosswalk's §1 and §2. It is an argument about a decision already taken, so it reads as
history and lives with the history.

The **live register of open questions** — recorded gaps, candidates for a thirty-fourth component,
and the rulings that closed six of them — is [`CROSSWALK.md`](CROSSWALK.md) beside this file. A
thirty-fourth component is admitted by a ruling, never by a teardown, and it costs 24 edits: see
[`../docs/agents/intake.md`](../docs/agents/intake.md).

---

## The graded split

**`graded:` says whether a component has maturity *stages* or only an *answer*.** A component with a
ladder can be climbed; one with an answer is given or it is not. The working hypothesis W5 set was
*layers 0–4 mostly `false`, 6–12 mostly `true`* — the CONFIGURED half is decided once, the
ACCUMULATES and RUNS halves compound. **Twenty-nine of the thirty-three agree with it; the four that
do not each carry a `graded_reason:` on their own page.**

**Graded — 23 have stages**

`2c` [Enforcement](2c-enforcement.md) · `3e` [Standards](3e-standards.md) · `4a` [Capability](4a-capability.md) · `5a` [Individual Memory](5a-individual-memory.md) · `5b` [Team Memory](5b-team-memory.md) · `5c` [Knowledge](5c-knowledge.md) · `6a` [Product](6a-product.md) · `6b` [Infrastructure](6b-infrastructure.md) · `6c` [Estate](6c-estate.md) · `6d` [Delivery](6d-delivery.md) · `7a` [Workflow Tasks](7a-workflow-tasks.md) · `8a` [Evals](8a-evals.md) · `8b` [Evidence](8b-evidence.md) · `8c` [Observability](8c-observability.md) · `8d` [Efficiency](8d-efficiency.md) · `9a` [Learning](9a-learning.md) · `9b` [Rituals](9b-rituals.md) · `9c` [Cadence](9c-cadence.md) · `9d` [Anti-fragile Lifecycle](9d-anti-fragile-lifecycle.md) · `9e` [Raise the Floor](9e-raise-the-floor.md) · `9f` [Diagnose the Bottleneck](9f-diagnose-the-bottleneck.md) · `10a` [Roster](10a-roster.md) · `10b` [Org](10b-org.md)

**Catalogued — 10 have an answer**

`0a` [Substrate](0a-substrate.md) · `1a` [Environment](1a-environment.md) · `2a` [Adapters & Middleware](2a-adapters-and-middleware.md) · `2b` [Hooks](2b-hooks.md) · `3a` [Control](3a-control.md) · `3b` [Routing](3b-routing.md) · `3c` [Composition](3c-composition.md) · `3d` [Configuration](3d-configuration.md) · `4b` [Capability Permissions](4b-capability-permissions.md) · `11a` [Surfaces](11a-surfaces.md)

**The four that disagree with the hypothesis**

| | Called | Because |
|---|---|---|
| `2c` Enforcement | `true` | the page names an explicit ladder — deny rules, hooks, managed settings, sandbox — where each rung binds more and costs more to deploy |
| `3e` Standards | `true` | a standards tier accumulates — guides authored, then an inheritance contract, then findings promoted into canon — and the page grades a peer as holding one half of that and not the other |
| `4a` Capability | `true` | the page grades catalog maturity directly, from a `cp -r` loop with a broken removal path up to SHA pinning, semver and renames |
| `11a` Surfaces | `false` | the page frames source-of-truth as a decision rather than a tool — *one of only two consequential decisions this system forces anyone to take* — and a decision is answered, not climbed |

> **Open, and not for an agent to close.** W7's PRD says `grid.html`'s rows become the `graded: true`
> components. **[CROSSWALK §3.7](CROSSWALK.md#37--ruled-2026-09-01--o-6-the-grids-warp-threads-are-the-12-layers-the-33-are-drill-down)
> is a KD ruling of 2026-09-01 saying the opposite** — the grid runs on twelve warp threads, the
> layers, with the 33 as drill-down — and says it was ruled *ahead of* W7 for exactly that reason.
> The two cannot both hold. Recorded in [`../fractal/ISSUES.md`](../fractal/ISSUES.md); the field is
> set either way, because the split is worth having whichever artifact ends up reading it.