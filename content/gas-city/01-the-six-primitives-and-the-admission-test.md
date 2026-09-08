---
status: DRAFT
title: "The six primitives, the admission test, and one documented deletion"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/getting-started/how-gas-city-works.md · engdocs/contributors/primitive-test.md · engdocs/architecture/nine-concepts.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# The six primitives, the admission test, and one documented deletion

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`** (main/edge), **2026-09-08**.

Gas City states its primitive set in one place, gates additions to its SDK layer from a second,
maps its Go packages onto the set from a third, and records the removal of a former primitive in a
footnote to that third. This document puts the four together, because no page carries more than one
of them and two of them disagree.

---

## 1. The set, in the vendor's own table

`docs/getting-started/how-gas-city-works.md` is the canonical statement. Its columns are **Role**,
**Is**, and **Key idea**; every word below is that page's.

| Primitive | Role | Is | Key idea |
|---|---|---|---|
| **Agent** | WHO | *"a configured worker — name, provider, prompt template, scope"* | *"pure configuration, so define as many as you like; the platform assumes none exists"* |
| **Bead** | WHAT | *"one unit of work — ID, title, status, type"* | *"the universal substrate: tasks, mail, sessions, convoys are all beads differing only by `type`"* |
| **Formula** | HOW | *"a reusable, written-down method applied over work"* | *"applying it produces work: a formula materializes as beads that outlive the file and any session"* |
| **Rig** | WHERE | *"an external project (usually a git repo) registered with the city"* | *"each rig gets its own bead namespace and agent scope"* |
| **Pack** | CONFIGURES | *"the unit of configuration — declares agents, formulas, orders"* | *"the City is a pack: the one rooted at this deployment"* |
| **Event** | OBSERVE | *"an outbound notification fired by activity"* | *"fired, not polled; humans and agents both watch the stream"* |

Three things sit **underneath** the six rather than beside them, and the same page names them
*"the machinery underneath"* — *"three pieces of role-agnostic plumbing"*: the **orchestrator**,
the **bead store**, and the **event bus**. *"None of this machinery knows what your agents do."*

Four further nouns recur across the docs without appearing in that table — **Order**, **Convoy**,
**Session**, and **Provider**. Each is defined on the same page as a facet of one of the six:
an Order *"automates when a formula runs"*; a Convoy is *"a container bead that groups related
work"*; *"When an agent is running it is a **session**"*; and *"Role (the kind), identity (the
running instance), and pool (the set) are all facets of the single **Agent** primitive"*
(`docs/guides/capabilities-for-coding-agent-users.md`).

---

## 2. The admission test — and what it actually gates

The test lives at `engdocs/contributors/primitive-test.md`, headed **"The Primitive Test"**. Its own
first sentence states the question it answers, and it is **not** "may this become a seventh
primitive":

> *"Decision framework for whether a capability belongs in Gas City's SDK primitive layer or in the
> consumer layer (agent prompts, `bd` CLI, user config, external binaries)."*

**A capability belongs in the SDK only if all three hold.** *"If any condition fails, it belongs in
the consumer layer."*

| # | Condition, as headed | The test, verbatim |
|---|---|---|
| 1 | **Atomicity — can agents do it safely without races?** | *"Can two agents hit this operation simultaneously?"* · *"Does the underlying tool (bd, git, tmux) already provide atomicity?"* · *"Is there a read-check-write pattern that could race?"* |
| 2 | **Does it become MORE useful as models improve?** | *"Imagine a model 10x more capable. Does this capability become less necessary (→ consumer layer) or exactly as necessary (→ primitive)?"* |
| 3 | **Is it transport or cognition?** | *"Does any line of Go contain a judgment call? If yes, the decision belongs in the prompt, not the code."* |

The page then publishes its own worked verdicts, which is the part that makes it a test rather than
a slogan.

**Ruled in** — *"Bead CRUD, hook with conflict detection · Git worktree create/remove/list ·
Session start/stop/attach · Event append · Config parse/validate."*

**Ruled out** — *"Done flow orchestration (fails 'more useful as models improve' — model decides) ·
Stale hook recovery strategy (fails 'transport, not cognition' — judgment) · Bidirectional hook
tracking (fails Atomicity — two `bd` calls suffice) · Agent bead creation (fails Atomicity — `bd
create` works) · Label management (fails Atomicity — `bd label` is safe)."*

**And a third outcome the framing implies but the summary hides: fix upstream.** *"If a capability
fails the Primitive Test only because the underlying tool has a concurrency bug, the right fix is in
the tool — not a wrapper in Gas City. Gas City wraps tools for ergonomics (consistent API), not to
paper over bugs."* The worked case is `bd slot set hook` — a *"read-check-write race"* routed to the
`beads` project rather than absorbed.

### 2a. Two pages state condition 1 differently, and still do

`engdocs/architecture/nine-concepts.md` restates the test under the heading **"The Primitive Test"**
and frames it as *"Before adding a new primitive, apply three necessary conditions"* — a different
question from the canonical page's SDK-versus-consumer split. Its condition 1 is also a different
test:

| Page | Condition 1 |
|---|---|
| `engdocs/contributors/primitive-test.md` (linked as canonical from the other) | *"Atomicity — can agents do it safely without races?"* |
| `engdocs/architecture/nine-concepts.md` | *"Atomicity — can it be decomposed into existing primitives? If yes, it's derived, not primitive."* |

Decomposability and race-safety are not the same property. The divergence was present at this
read; the two pages link to each other, and `nine-concepts.md` names the other as the source
(*"see [`engdocs/contributors/primitive-test.md`]"*). Recorded, not resolved.

`nine-concepts.md` has otherwise been re-headed to subordinate itself. Its title is now
**"Code-layering View (implements the six primitives)"**, and it opens: *"The authoritative
user-facing model is the six primitives … Read that first … It does not introduce a competing
taxonomy."* Its own mapping table is the useful part — see [`20`](./20-consolidated-guide.md) §2.

---

## 3. The deletion, verified

`nine-concepts.md` carries the removal as a blockquote under primitive 1, Session:

> *"**History.** This primitive was named "Agent Protocol" and exposed a dedicated `agent.Agent` /
> `agent.Handle` interface until commit `dd90ac0a` (Mar 8 2026). The interface was removed;
> responsibilities live in `internal/session/` and `internal/runtime/`."*

The commit resolves. `gh api repos/gastownhall/gascity/commits/dd90ac0a` returns
`dd90ac0a1a42303b1424c8a8f5a48a31f6aa4aae`, **2026-03-08**, authored by `julianknutsen`, titled
*"feat: session-first migration — remove agent.Agent from reconciler and CLI"*, touching 44 files.
Its own body states the size and the replacement:

> *"Deleted (net -2794 LOC): internal/agent/agent.go (Agent/Handle interfaces, managed struct, New,
> HandleFor), internal/agent/fake.go, fake_test.go, agent_test.go, cmd/gc/build_agent.go,
> build_agent_test.go, build_agents.go"*

The files the message names are `removed` in the commit's own file list, and the interface's two
surviving helpers were extracted rather than deleted: `internal/agent/session_name.go`
(`SessionNameFor`) and `internal/agent/hints.go` (`StartupHints`) are `added` in the same commit.
`session_name.go` is still the **Primary implementation** named by
`docs/reference/specs/identity-separator-contract-v1.md` — see [`02-agent.md`](./02-agent.md) §5.

---

## 4. Where each primitive is documented

| Primitive | Concept page | Normative spec | Architecture note | This set |
|---|---|---|---|---|
| Agent | `guides/configuring-an-agent.md` | `reference/specs/identity-separator-contract-v1.md` | `engdocs/architecture/session.md`, `prompt-templates.md` | [`02`](./02-agent.md) |
| Bead | `tutorials/06-beads.md` | — (the `bd` CLI is a separate project) | `engdocs/architecture/beads.md`, `life-of-a-bead.md` | [`03`](./03-bead.md) |
| Formula | `guides/understanding-formulas.md` | `reference/specs/formula-spec-v1.md`, `-v2.md` | `engdocs/architecture/formulas.md`, `orders.md`, `dispatch.md` | [`04`](./04-formula.md) |
| Rig | `getting-started/how-gas-city-works.md` §Rig | — | `reference/internal/beads-topology.md` | [`05`](./05-rig.md) |
| Pack | `guides/understanding-packs.md` | `reference/specs/pack-spec.md` | `engdocs/architecture/config.md` | [`06`](./06-pack.md) |
| Event | `reference/events.md` | `reference/schema/events.json` | `engdocs/architecture/event-bus.md` | [`07`](./07-event.md) |

**No spec exists for Bead or Rig**, and their absence is structural rather than an oversight:
`bd`, the bead CLI, is a separate upstream project (`gastownhall/beads`), and Rig has no substrate
layer of its own — `nine-concepts.md` says so directly: *"The substrate has no separate layer for
**Rig** … it is a config-declared location that work runs in."* Checked for a spec:
`docs/reference/specs/` (six files, listed in `docs/docs.json`), `docs/reference/index.md`, and the
`engdocs/specs/` tree (which holds only a `fix/` subdirectory).
