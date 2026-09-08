---
title: "The harness factors — a map of what a team-scale harness needs"
tier: reference
project: loomwarp
created: "2026-08-26"
status: DRAFT
owner: KD
---

# The harness factors

**What this is.** Fourteen principles describing what a harness needs once more than one person
depends on it — the map for *"what does harness architecture look like, and what is required."*

**Why this form.** [**12-Factor App**](https://12factor.net) (Wiggins, 2011) is the reference genre for
this kind of document, and [**12-Factor Agents**](https://github.com/humanlayer/12-factor-agents)
(HumanLayer, 25.5k stars) is its most-adopted agent-era descendant. Two things make the successor worth
writing:

1. **12-Factor Agents is written at the single-agent, single-operator altitude** — *"own your control
   flow"*, *"own your context window"*, *"make your agent a stateless reducer."* Excellent, and about
   one agent in one loop. **The team altitude is unclaimed.**
2. **Its own author moved past it.** Dex Horthy published the twelve factors in March 2025 and then
   keynoted *"Harness Engineering is not Enough: Why Software Factories Fail"* at the World's Fair in
   2026. **The genre's leading practitioner has said the form is insufficient and has not published
   the replacement.**

**What each factor is.** A principle stated as an imperative, with the failure it prevents and the
artifact that proves you have it. Each traces to a job in [`../03-jtbd.md`](../03-jtbd.md) and to a
cited source. **None was invented to reach a round number** — see §4 on the count.

---

## 1. The fourteen

### I · One way to do each thing

> Every task a team repeats has exactly one sanctioned primitive.

**Prevents:** the agent inventing a fourth way because three exist. A human offered three ways to run
tests picks one and remembers; an agent picks differently each session.
**Proof:** a named primitive set, small enough to hold in the head — five to seven — and a check that a
second way has not appeared.
**Source:** Orobator (Reddit), *"the engineering primitives that make this possible"* ·
[`../01-concepts.md`](../01-concepts.md) §3.17. **Job:** *meta — it is what makes the rest enforceable.*

### II · Route deterministically

> Which agent, which skills, which context — decided with no model in the decision loop.

**Prevents:** a probabilistic answer to a question that has a correct one.
**Proof:** a resolver whose output is reproducible from its inputs.
**Source:** Tan — *"a resolver is an org chart. A task comes in and it decides which markdown file or
who handles it."* **Job:** `J3` — **absent from every published harness taxonomy.**

### III · Context is instruction, not overview

> Give the agent constraints it must respect, not a map of the territory.

**Prevents:** paying 20% more per run for context that does not help.
**Proof:** context files that are imperative; the absence of a repository overview nobody reads.
**Source:** ETH Zürich, [arXiv:2602.11988](https://arxiv.org/abs/2602.11988) — *"repository overviews…
are not helpful"* while *"instructions… are well followed."* **Job:** `J1`.

### IV · Memory routes by ownership

> Route a fact by who it belongs to, not by what is easiest to write.

**Prevents:** team-relevant facts landing in a per-user store no teammate's agent can see — a shadow
source of truth.
**Proof:** a written routing rule, and a test: *would another teammate's agent need this to be correct
about the project?* If yes, it is not a memory.
**Source:** `generic-cerebro`'s routing doctrine · gbrain's `brain × source` · Indigo's `core/` vs
`personal/`. **Job:** `J2`.

### V · Scope only narrows

> A narrower scope may tighten a rule. It may never loosen one.

**Prevents:** a permission granted locally that silently widens what the whole estate allows.
**Proof:** monotonic evaluation — deny wins from any scope.
**Source:** QM's *"narrower scopes can only tighten, never loosen"*, reached independently by Claude
Code's deny-wins precedence. **Job:** `J5`.

### VI · Declare the edges

> Dependencies are a reviewable artifact, not something the orchestrator infers at runtime.

**Prevents:** work starting before what it depends on has landed.
**Proof:** a graph with real edges, and evidence they were exercised.
**Source:** FRACTAL's BLUEPRINT · Gas City's formulas · *"dependency edges are the product."*
**Job:** `J4`.

### VII · The gate does not run on the model

> At least one control the model cannot reach, argue with, or route around.

**Prevents:** every guardrail being prose the model may ignore.
**Proof:** a hook, a deny rule, managed settings, a CI gate — something outside the prompt.
**Source:** Macedo's **T4**, stated as a *membership condition* for being a harness at all
([arXiv:2606.10106](https://arxiv.org/abs/2606.10106)) · Böckeler's *Guides*. **Job:** `J5` `J6`.

### VIII · Feedback is addressed to the machine

> Error output is written for the agent that must act on it, not the human who used to.

**Prevents:** a correction loop that requires a person to translate the failure.
**Proof:** linter and test output carrying the instruction for its own fix.
**Source:** Böckeler — *"signals optimised for LLM consumption, e.g. custom linter messages that
include instructions for the self-correction — a positive kind of prompt injection."* **Job:** `J6`.

### IX · Escalate with a recommendation

> Retry is bounded. When it runs out, escalation carries a proposed decision.

**Prevents:** an escalation that moves the problem without moving the decision.
**Proof:** a retry ceiling, and escalations that name what failed, what was tried, and what to do.
**Source:** `generic-cerebro`'s C-6 — bounded at two, then stop. **Job:** `J7`.

### X · Every claim points at an artifact

> Completion is proven, never asserted. Absences are asserted, never omitted.

**Prevents:** *"it said it was done."*
**Proof:** an evidence record per unit of work; a handoff whose "not completed" section says `None`
rather than being skipped.
**Source:** FRACTAL's HANDOFF · Govindarajan (OpenAI) — *"a model proposes, the harness commits, and
the receipt proves it."* **Job:** `J8`.

### XI · Knowledge compounds or it is not knowledge

> The system gets better as it is used, or the capture loop is decoration.

**Prevents:** the same lesson being relearned every quarter.
**Proof:** Karpathy's test — ***does knowledge compound, or does it just get retrieved?***
**Source:** the llm-wiki pattern · `generic-cerebro`'s finding-classes promoting into standards.
**Job:** `J9` — **absent from every published harness taxonomy.**

### XII · Capability travels without the hub

> No shipped capability hard-depends on one machine's filesystem.

**Prevents:** a skill that works for its author and nobody else.
**Proof:** installation from a registry into a repo that has never seen the hub.
**Source:** `generic-cerebro`'s distribution rule, learned by breaking it. **Job:** `J10` —
**absent from every published harness taxonomy.**

### XIII · Work is addressable by the whole team

> No work, and no context, trapped on one person's machine.

**Prevents:** the bottleneck every harness hits at the second user.
**Proof:** any teammate can open a session someone else started and see what it saw.
**Source:** Superconductor — *"For a solo developer, coding agents are a superpower. For a team, they
surface new kinds of bottlenecks: coordination, visibility, review, and shared context"* · QM's rooms ·
OpenClaw's opposite pole, *"designed for a single operator."* **Job:** `J11`.

### XIV · Cost is a first-class signal

> What the work cost, and what it returned, are recorded alongside what it did.

**Prevents:** a system nobody can justify continuing to buy.
**Proof:** cost attributed per unit of work and joined to its outcome.
**Source:** an entire `AI Architects: Tokenmaxxing` track; `cost` 70 · `budget` 23 · `spend` 22 in the
corpus — against **no published harness taxonomy that gives it a row.** **Job:** `J12`.

> **Qualified 2026-08-26.** *"Zero published taxonomies contain it"* was too strong. Cost appears twice:
> as an **adjective on another pillar** — Debois's Platform pillar is *"fast, observable, **cost-aware**"*
> — and as **inter-agent marketplace economics** in Agent Cloud Stack's *"Agent Economy."* **Neither is a
> named function with its own artifact joined to outcome, which is what this factor requires.** See
> [`06-frameworks-addendum.md`](./06-frameworks-addendum.md) §5.2.

---

## 2. Rendering A — by team scale

*Each factor enters where the previous stage broke. This is the reading for **what do we build next**.*

```
SOLO ─ one operator, one repo
  I    one way to do each thing
  III  context is instruction
  VII  the gate does not run on the model
  │
  └─ breaks when: a second person needs what lives on your machine

TEAM ─ several people, one shared harness
  IV   memory routes by ownership
  V    scope only narrows
  VIII feedback is addressed to the machine
  XIII work is addressable by the whole team
  │
  └─ breaks when: nobody owns the root, conventions drift, no one can tell whose rule wins

MULTI-TEAM ─ several teams, many repos
  II   route deterministically
  VI   declare the edges
  IX   escalate with a recommendation
  XII  capability travels without the hub
  │
  └─ breaks when: you cannot say what happened, or what it cost

ORG ─ audited, regulated, budgeted
  X    every claim points at an artifact
  XI   knowledge compounds
  XIV  cost is a first-class signal
```

**What it argues.** Every harness in this landscape was built single-operator — OpenClaw says so
outright. **Each factor that appears later is one that broke at the step before**, which is why the
process layers exist at all: co-location was the assumption, and it failed at the second user.

**Its weakness, stated.** Placement is an argument, not a measurement. Several factors are genuinely
needed at every scale — `VII` most obviously — and filing them once understates that. Read the stage as
*where you can no longer get away without it*, not as *where it starts to matter*.

---

## 3. Rendering B — by maturity stage

*The same fourteen as Grid rows, graded 1–6. This is the reading for **how are we doing**.*

```
                            1        2        3        4        5        6
                          ad hoc  personal  social  MECHANICAL owned  self-improving
  I    one way              ·        ·        ●        ·        ·        ·
  II   route determ.        ·        ·        ·        ●        ·        ·
  III  context              ·        ·        ●        ·        ·        ·
  IV   memory routing       ·        ●        ·        ·        ·        ·
  V    scope narrows        ·        ●        ·        ·        ·        ·
  VI   declare edges        ·        ·        ·        ●        ·        ·
  VII  the gate         ►   ●        ·        ·        ·        ·        ·   ◄ the minimum
  VIII machine feedback     ●        ·        ·        ·        ·        ·
  IX   escalate w/ rec.     ·        ●        ·        ·        ·        ·
  X    artifact-backed      ·        ·        ●        ·        ·        ·
  XI   compounds            ●        ·        ·        ·        ·        ·
  XII  travels              ·        ●        ·        ·        ·        ·
  XIII addressable          ●        ·        ·        ·        ·        ·
  XIV  cost             ►   ●        ·        ·        ·        ·        ·   ◄ the minimum
                                              ╰─ 3 → 4: the commitment threshold ─╯

  the fabric tears at its thinnest warp thread — the grade is the minimum, not the mean
```

*Illustrative placements above are LoomWarp's, drawn from `references/elements.md` §3 and the v1 gap
analysis. They are a worked example of the instrument, not a ratified self-grade.*

**What it argues.** One vocabulary shared with `03-maturity.md`, and it preserves **minimum governs** —
which the research found unmatched. Factory.ai gates on **80% of criteria per level** but still assigns
one overall level; Microsoft grades per pillar with no stated combination rule; Debois grades 48 cells
with none. **None of them names the cell that decides, and none publishes a rule that one weak pillar
caps the system.** It also matches the field's dominant published form: everyone who ships structure
ships pillars × levels. *(Claim narrowed 2026-08-26 —
[`06-frameworks-addendum.md`](./06-frameworks-addendum.md) §5.5.)*

**Its weakness, stated.** It grades *you* rather than describing *the architecture* — which is not the
question this document was asked to answer.

---

## 4. On the count, and on what these are not

**Fourteen, not twelve, and the two extra are deliberate.** Forcing twelve would drop `XIII` and `XIV` —
which are precisely the two the research found **least modelled anywhere**, and `XIV` is the sharpest
finding in the whole analysis: practitioners are saturated with cost while **no published harness
taxonomy contains it**. Dropping them to fit a genre convention would be choosing the shape of the
answer over its content. 12-Factor Agents itself carries an honourable-mention thirteenth; the form
tolerates it.

**These are not functions.** The twelve functions in [`../../../specs/v0/02-functions.md`](../../archive/v0/02-functions.md)
are things you *implement and grade*. These are principles you *hold*. A factor can be honoured by
several functions, and a function can honour several factors.

**These are not jobs either.** [`../03-jtbd.md`](../03-jtbd.md) says what a system must *do*; this says
*how it must do it*. Every factor names its job, and the mapping is deliberately not one-to-one —
`J5 bound` needs both `V` and `VII`, and `J6 validate` needs both `VII` and `VIII`.

**What would falsify a factor.** Each is stated so it can fail: if teams that honour `III` do not
outperform teams that write repository overviews, `III` is wrong. If cost attribution turns out never to
change a decision, `XIV` is decoration. **A factor nobody could disprove is a slogan.**

---

## 5. Candidates — factors noticed, not yet admitted

A rule seen in practice that none of `I`–`XIV` states. **NOTICED costs one line and no research**, per
[`../../docs/agents/intake.md`](../../docs/agents/intake.md) §2. Admission is §4's count argument — no
factor was invented to reach a round number — plus the falsification test: a factor that cannot be
disproven is a slogan. A factor admitted here syncs to **three** places, all in this file: §1, the two
renderings in §2 and §3, and §4's count.

| Candidate | The rule, in the imperative | Job | Where seen | State |
|---|---|---|---|---|
| *(open)* | A factor covering `J13`–`J17` | `J13` `J14` `J15` `J16` `J17` | `CROSSWALK.md` §3.6, `C-10` | **NOTICED**, carried since 2026-08-31. The fourteen cover only `J1`–`J12`; five jobs have components and no factor. Factor `I` maps to no job at all |

---

*Companion: [`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md) — why primitives
are the unit · [`../03-jtbd.md`](../03-jtbd.md) — the jobs these serve ·
[`02-harness-taxonomies.md`](./02-harness-taxonomies.md) — the published lists these extend*
