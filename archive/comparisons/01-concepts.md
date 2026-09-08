---
title: "Comparisons — the concept vocabulary"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# The concept vocabulary

**What this is.** One definition per concept that the agent-tooling landscape argues about, with the
distinction it is most often confused with, which LoomWarp function owns it, whether that function actually covers it, and what each system in the landscape calls the same thing.

**Why it exists.** The landscape has no shared vocabulary. "Harness" names four different layers
depending on who is speaking; "memory" collapses two things with different owners; "agent" means a file in one system and a process in another. Every comparison table downstream of this document depends on the terms meaning one thing, so they are fixed here first.

**How to read a concept.** Five fields. `Covered?` is the honest one — it records whether the v0
function model actually handles the concept, and three of them say no.

---

## 1. The stack, in one screen

The layers, from rented to owned. Most category confusion is two adjacent layers being given the same name.

```
  MODEL              rented · commoditized · swappable
    │                Claude · GPT · Gemini · Grok
    ▼
  HARNESS            the loop that runs the agent
    │                Claude Code · Codex · OpenClaw · Hermes · goose · Cursor
    ▼
  PROCESS LAYER      how *your team* works, installed into a harness
    │                gstack · LoomWarp · FRACTAL · Indigo HQ · QM · Gas City
    ▼
  CONTEXT            what the agent knows — individual and team
    │                CLAUDE.md · the llm-wiki · gbrain · ox Knowledge Bubbles
    ▼
  EVIDENCE           what happened, and whether it can be proven
                     OTel · ox Ledger · Gas City Event Stream · events.jsonl
```

Two of these are owned by you and unique; one is rented; one is chosen. Garry Tan's equation covers the top three — *frontier model + your context + a harness* — and the landscape's disagreements are almost entirely about the two layers his equation compresses.

> KD Note: this is excellent, i think that i would extend it as follows: 
> 1. Model
> 2. Harness
> 3. Framework/Process layer
> 4. Context: Team vs Individual
> 5. Project Definitions and Planning - what you are building, 
> 6. "The Work" - implementation, how it is done, the steps to finish
> 7. Evaluation - how well did we do it, test validation, etc...
> 8. Evidence - what happened
> 9. Rituals - comms, interactions, cron jobs, automations, etc... 
> 10. Learning and improvement
> As a PM, see if I missed anything or how this can be improved. consider if this model is a stronger presentation as "10 steps/layers" or "6-7 layers" where "the work" consollidates 5-7 and 8-10 get consollidated into observe and learn.  

---

## 2. The category error worth fixing first

**gstack, LoomWarp, FRACTAL, Indigo HQ and QM are not harnesses.** They are process layers installed *into* harnesses. The tell is that each one ships an adapter: gstack has `--host`, QM has adapters per user or room, Gas City has the `provider` field ⚠️ *ISSUE-004*, Indigo has the `AGENTS.md`↔`CLAUDE.md` symlink. You do not write an adapter for the thing you are.

The distinction matters because it changes what `F0 Substrate` is. As written, `F0` bundles "which runtime" and "what keeps our work portable" into one function — but those are decisions at two different layers, made by different people, with different reversal costs. Choosing Claude Code is a harness decision. Deciding your skills must survive a move off it is a process-layer decision.

The working definition this corpus uses, adapted from the [AI-Harnesses census](https://github.com/danielrosehill/AI-Harnesses) (April 2026):

> A **harness** is the orchestration layer that runs an agent — the tool-dispatch loop, permissions,
> context assembly, and session lifecycle. It is distinct from a *framework* (for building agents)
> and a *backend* (for inference).
>
> A **process layer** is a package of capability, standards, and workflow installed into one or more
> harnesses. It does not run the loop; it shapes what the loop does.

That census also records that *"the terminology is still fluid and not universally agreed upon"* —
which is the honest state of the category and the reason this document exists.

---

## 3. The concepts

### 3.1 Model

| | |
|---|---|
| **Definition** | The frontier LLM performing the reasoning. Rented, metered, and substitutable |
| **Confused with** | The harness. "We use Claude" is ambiguous between Claude the model and Claude Code the harness |
| **v0 function** | None — it is an *input* to `F0`, deliberately not a function |
| **Covered?** | ✅ Correctly excluded. `references/elements.md:62` names workers/runtime a non-element because *deterministic control, probabilistic labor* makes them substitutable by design |
| **Called** | "frontier model" (Tan) · "provider" (Gas City agent config) · "worker" (FRACTAL, LoomWarp) |

One nuance the v0 set does not capture. Gas City runs its code-review formula across Codex, Claude and Gemini *in parallel* because *"each one has been trained differently and has a different point of view."* That makes model choice a **quality** technique, not just a portability property — the model is still not a function, but multi-model adversarial review is a Learning technique v0 does not name.

### 3.2 Harness

|                   |                                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Definition**    | The orchestration layer that runs the agent loop: tool dispatch, permissions, context assembly, session lifecycle                                               |
| **Confused with** | The model above it, and the process layer installed into it                                                                                                     |
| **v0 function**    | `F0 Substrate`                                                                                                                                                  |
| **Covered?**      | ⚠️ Partially — `F0` conflates the runtime with the portability posture. See §2                                                                                  |
| **Called**        | "harness" (Tan, Faros, the census) · "runtime" (Claude Code) · abstracted by the `provider` field (Gas City) ⚠️ *not "Factory Worker Protocol" — ISSUE-004*, "adapters" (QM, SageOx), "`--host`" (gstack) |

Real harnesses in scope: Claude Code, Codex CLI, Cursor, OpenClaw, Hermes, goose, Gemini CLI, Amp, Droid, Aider, Pi, Windsurf, Cline, Antigravity, Kiro.

**gbrain's design principle is worth adopting or rejecting explicitly.**
[Thin harness, fat skills](https://github.com/garrytan/gbrain/blob/master/docs/ethos/THIN_HARNESS_FAT_SKILLS.md) argues for three layers — fat skills on top (*"where 90% of the value lives"*), a thin ~200-line harness in the middle, deterministic tooling underneath — with the decision rule:

> *"If it's a lookup table, it's code. If the agent needs to think, it's a skill."*
> *"Push intelligence UP into skills. Push execution DOWN into deterministic tooling."*

That is **deterministic control, probabilistic labor** derived independently and stated more
operationally than our version. Two teams converging on the same split is corroboration; the
phrasing is better than ours and the decision rule is directly liftable into `standards/`.

### 3.3 Process layer

| | |
|---|---|
| **Definition** | A package of workflow, standards and capability installed into one or more harnesses. Shapes what the loop does without running it |
| **Confused with** | The harness. This is the error §2 fixes |
| **v0 function** | **None** — v0 has no name for the category LoomWarp itself occupies |
| **Covered?** | ❌ Not covered. `F5 Capability` covers the *units*; nothing names the layer |
| **Called** | "software factory" (Gas City) · "multiplayer org harness" (QM, self-described) · "shared context layer" (Indigo) · "your exact setup" (gstack) |

Worth stating plainly: LoomWarp is a process layer that has not named its own category. Every peer
has a phrase for what it is. We describe ourselves by our differentiator (provenance) rather than by
our category, which makes the positioning harder than it needs to be.

### 3.4 Agent

| | |
|---|---|
| **Definition** | A bounded, named worker with its own scope, tools and instructions — defined in a file or built into the harness |
| **Confused with** | The model (an agent is a *configuration* of one) and a skill (an agent has a loop; a skill is a procedure) |
| **v0 function** | `F5 Capability` |
| **Covered?** | ✅ Yes |
| **Called** | "subagent" (Claude Code) · "agents" with scope/wake-mode/provider/model (Gas City) · "workers" via `worker.yaml` (Indigo) · "coworker" (SageOx) · four tiers (FRACTAL) |

Indigo's auto-generated worker registry (`worker.yaml` → registry → `/run {worker} {skill}`) is the
cleanest pattern seen for making agents discoverable rather than remembered.

### 3.5 Skills

| | |
|---|---|
| **Definition** | A named, reusable procedure in markdown that an agent executes. The unit of *how we do this* |
| **Confused with** | Agents (skills have no loop) and standards (skills are procedure; standards are the bar) |
| **v0 function** | `F5 Capability` — the Catalog half |
| **Covered?** | ✅ Yes |
| **Called** | "SKILL.md" (open standard, Agent Skills) · "formulas" for the multi-step case (Gas City) · "skill files" (Tan) |

Tan's acceptance test is the most usable definition in the landscape: *"A skill file as an employee.
It has one capability, one job written down clearly enough that someone new could execute it… If a smart intern could follow it, an agent can run it."*

And the custody argument, which makes this a political property rather than a technical one:
*"Own your skills because if you don't, your job becomes a skill file."*

### 3.6 Memory and context — individual vs. team

| | |
|---|---|
| **Definition** | What the agent knows. **Individual**: one person's accumulated context and preferences. **Team**: the shared, governed body of knowledge the org owns |
| **Confused with** | Each other — constantly, and it is the most consequential confusion in the category |
| **v0 function** | `F3 Context` |
| **Covered?** | ◐ **Covered as of 2026-08-27** by [`../../specs/v0/09-context-layer.md`](../v0/09-context-layer.md) §3 — the individual/team × project/org 2×2, with every provider required to declare which cells it serves. **`OPEN-5` resolved.** Still the largest gap this analysis found; it is now the largest one *closed*. And the framing widened: §5 shows it is **also an access-control question**, not only routing and ownership, and the individual/team boundary is the axis three peers are built on |
| **Called** | "brain" personal or team, with "sources" inside it (gbrain) · "scope" — user or room (QM) · `core/` vs `personal/` overlay (Indigo) · "Knowledge Bubbles" + "Team Context" (SageOx) · auto-memory + `memory:` scopes (Claude Code) |

This is the largest single gap this analysis found. Every serious system has a primitive for the
boundary:

| System | The primitive | The rule it encodes |
|---|---|---|
| **gbrain** | *brain* (a database instance, personal or team) × *source* (a git repo inside it) | Two axes, so sharing and thin-client setups both work. *"The repo is the source of truth; the database enables retrieval"* |
| **QM** | *scope* — an isolated bundle of memory, files, keychain view, permissions, crons, sandbox | *"Many isolated agent-workspaces that can also meet in shared rooms"* |
| **Indigo HQ** | `core/` (release-shipped, replaced wholesale) vs `personal/` (overlay, symlinked, cannot override core) | Vendor updates and user customization never collide |
| **SageOx** | Knowledge Bubbles → Ledger, per-repo and cross-machine | Team decisions outlive the session and the machine |

`F3 Context` currently describes one undifferentiated fabric. gbrain's *brain × source* is the most
precise of these and the cheapest for us to adopt as vocabulary.

### 3.7 The llm-wiki

| | |
|---|---|
| **Definition** | The team's compounding knowledge artifact — an LLM-maintained, interlinked markdown corpus that gains value as it is used, as distinct from a corpus that is merely searched |
| **Confused with** | RAG. The whole point is that it is *not* query-time retrieval |
| **v0 function** | `F3 Context` at team scale, with the loop belonging to `F8 Learning` |
| **Covered?** | ⚠️ Partially — `F3` has the artifact, `F8` has the loop, and nothing joins them |
| **Called** | "LLM Wiki" (Karpathy) · "brain" (gbrain) · "hivemind" (SageOx) · "the library" (Tan) · `companies/{co}/knowledge/` (Indigo) |

Karpathy's structure (gist, April 2026): `raw/` immutable sources → `wiki/` LLM-maintained pages → **`CLAUDE.md` as the co-evolved schema**, plus an `index.md` catalog and an append-only `log.md` journal. Each ingested source touches 10–15 pages; query answers get filed back as pages so exploration compounds.

**Adopt its acceptance test verbatim.** It is the sharpest bar in the landscape and it is the one we
should be graded against too:

> **Does knowledge compound, or does it just get retrieved?**

Scale markers, for calibration: Tan's personal library is ~220,000 markdown pages; gbrain's deployed index is 155,795 pages, 24,589 people, 5,340 companies.

> KD Note: this is explicitly where we want to create the default version which is found in generic-cerebro where we were about to adopt the wiki-langGraph https://github.com/varunyn/wiki-langGraph from varunyn and combine it with the decision ledger which is our provenance.  This in the end combined with the other team context features in generic-cerebro is what drives our provenance. 

### 3.8 Tasks and flow

| | |
|---|---|
| **Definition** | How intent becomes scoped, ordered units of work, and how those units get dispatched |
| **Confused with** | The project board (where work is *tracked*, §3.10) — different concern, different owner |
| **v0 function** | `F4 Control` |
| **Covered?** | ✅ Yes |
| **Called** | "formulas" TOML workflows (Gas City) · "Ralph loop" (Indigo) · agent teams / dynamic workflows / `/plan` (Claude Code) · BLUEPRINT → router → dispatch (FRACTAL, LoomWarp) · the skill chain (gstack) |

Tan names our `router.py` exactly: *"A resolver is an org chart. A task comes in and it decides which markdown file or who handles it."* Same primitive, better one-liner.

gstack's mechanism is worth naming because v0 does not: skills **chain through artifacts** —
`/office-hours` writes a design doc that `/plan-eng-review` reads, which writes a test plan `/qa` picks up. That is FRACTAL's HANDOFF pattern arrived at independently, and it is a Control primitive distinct from a dependency graph.

> here we want to adopt the latest version of FRACTAL that has been iterated on in generic-cerebro 
> we likely need to add the @paths concept from gas city as well as some other reference features to our routers that we've developed so far. 
### 3.9 Communication

| | |
|---|---|
| **Definition** | The channels through which humans talk to each other about the work, and through which humans and agents talk to each other |
| **Confused with** | Surfaces (`F1`), which is about *which record is authoritative*, not about the conversation |
| **v0 function** | **None** |
| **Covered?** | ❌ **Not covered** |
| **Called** | "rooms" — shared scopes where people and agents meet (QM) · Slack/web/admin/portal plugins over one API (QM) · Ox Dot + Console (SageOx) · Event Stream notifications (Gas City) |

`F1 Surfaces` was split out of Workspace to capture *where work is seen and done*, but the definition that landed is about the source-of-truth decision. The conversational channel is a different thing:
QM's rooms are a first-class primitive precisely because multiplayer work needs a place where several people and several agents share state.

SageOx makes this its entire problem statement — *"AI agents are missing all the discussions your team is having"* — and built a hardware device (Ox Dot) to capture in-person conversation. Whether or not that is the right answer, the problem is real and v0 does not name it.

### 3.10 The project board

| | |
|---|---|
| **Definition** | Where units of work are tracked, assigned and seen — by humans and by agents |
| **Confused with** | Task decomposition (`F4`). Decomposition produces the units; the board holds them |
| **v0 function** | Split awkwardly between `F1 Surfaces` and `F4 Control` |
| **Covered?** | ⚠️ Partially — open thread `R-5` in `specs/v0/references.md` flags it and does not settle it |
| **Called** | "beads" — JSON work units in git beside the code (Gas City) · Linear/Jira · GitHub Issues · `workspace/` threads and handoffs (Indigo) |

Gas City forces this as an explicit team choice — **beads or Linear** — which is the right shape: a
decision, recorded, not a default. Beads is the interesting answer because it makes work units
diffable, reviewable and co-located with the code, which is the same argument `F1` uses for
repo-markdown-as-SoT. That consistency is an argument for beads-shaped tracking that v0 has not made.

> I don't think that's entirely true, FRACTAL artifacts and workstreams, QUEUE.md, roadmap, and project layer-planning create the "blueprint" of what is going to be done and then the architect composes each task into a PRD task-flow of work that encompasses the entire "work to be done" from planning, implementation, review, and submit.  
> we might need to review how generic-cerebro operates through this lens.  

### 3.11 Human in the loop

| | |
|---|---|
| **Definition** | Where a human must approve, and what happens while they are not there. An *approval placement* decision, distinct from a permission decision |
| **Confused with** | Policy (`F6`). Policy says what is *allowed*; this says who confirms and when |
| **v0 function** | Folded into `F6 Policy` |
| **Covered?** | ❌ **Not covered as its own decision** — and every peer treats it as one |
| **Called** | permission modes (Claude Code) · "strict / auto / dangerous" postures where *narrower scopes can only tighten* (QM) · hook profiles minimal/standard/strict (Indigo) · "wake mode" per agent (Gas City) · CI back-pressure as the reviewer (Indigo's Ralph loop) |

Three systems ship a **named three-level posture**. That convergence is strong evidence this is a
first-class decision rather than a configuration detail — and it is exactly the kind of decision
`05-preflight-spec.md` should be asking about, framed as *where does a human sit* rather than only as *what is denied*.

Note also the pattern where the gate is not a person at all: Indigo's Ralph loop uses
typecheck/build/test as **back-pressure**, which is the mechanical substitute for a human reviewer
and maps to our `F7` blocking gates.

> KD Note: we should compare this with some of the reframing of the 10 (or 7) stack where this pattern is clearly folded in.  This is mainly comprised as defining your team's standards and procedures (which get referenced and routed by the architect at implementation)  as well as the skills that get invoked by architect-level agents when executing the skills and processes to know what our systems look like. 
> A pattern that we should establish with LoomWarp is the JIT theory where when we point to folders like `standards/` the README.md in each of these key concepts can dictate and instruct agents on what should be done there.  

### 3.12 Observability

| | |
|---|---|
| **Definition** | What can be known about a run after it happened: cost, tokens, traces, tool decisions, outcomes, and evaluations of those outcomes |
| **Confused with** | Evaluation. Observability is the record; evaluation is the judgment applied to it |
| **v0 function** | `F7 Evidence` (record) + `F8 Learning` (judgment and promotion) |
| **Covered?** | ✅ Yes, and the two-function split is right — the industry term collapses them and ours does not |
| **Called** | OpenTelemetry metrics/events/traces (Claude Code) · "Event Stream" (Gas City) · "Ledger" (SageOx) · durable Postgres state (QM) · `events.jsonl` (LoomWarp) |

The industry uses "observability" for the whole span. Keeping `F7` and `F8` separate is defensible
and worth defending: `F7` can and routinely does exceed `F8`, which is the independence test passing.

> KD Note: ok interesting, let's think about how this interacts with our reframing of the 10 (or 7) stack of patterns and then gets propagated into the LoomWarp framework and pattern. 

### 3.13 Planning and project context

| | |
|---|---|
| **Definition** | The specs, plans and decisions for the work in flight — as distinct from durable org knowledge |
| **Confused with** | Team memory (§3.6). Planning context is hot and short-lived; team memory is cold and durable. The promotion path between them is `F8` |
| **v0 function** | `F3 Context`, with the plans themselves as `F1` artifacts |
| **Covered?** | ⚠️ Partially — v0 does not distinguish hot planning context from durable knowledge |
| **Called** | `workspace/` threads and handoffs (Indigo) · PRD → Ralph loop (Indigo) · `/plan` and plan files (Claude Code) · `specs/` (this repo) |

You flagged this as where the team spends most of its time, and that is consistent with what the
peers optimize: gstack's entire Think→Plan half of the loop is five skills deep before any code is
written. Worth noting that v0's own `F3` ladder describes durable context maturity and says nothing about planning artifacts, even though `specs/` is the largest artifact in this repository.

### 3.14 Surfaces and Substrate

| | |
|---|---|
| **Definition** | *(As currently written)* Substrate = the runtime and its adapters. Surfaces = where work arrives, is discussed, tracked and delivered, plus which is authoritative |
| **v0 function** | `F0`, `F1` |
| **Covered?** | ⚠️ Both are umbrellas holding two things each |

You asked whether these are too abstract. The analysis says **not too abstract, but each is two
concepts wearing one name**:

- **`F0 Substrate`** holds *harness choice* (§3.2) and *portability posture* (§3.3) — different
  layers, different owners, different reversal costs.
- **`F1 Surfaces`** holds *source-of-truth* (well covered) and *communication channel* (§3.9, not
  covered at all). The SoT half is doing all the work in the current text.

That is a finding for the function-model pass, not an edit to make here. Recorded, not acted on.

### 3.15 Rituals

| | |
|---|---|
| **Definition** | The recurring, structured practices by which a team synchronizes — intake, planning, review, standup, retro, incident, release — and the stated place the agent participates in each |
| **Confused with** | Control (`F4`). `F4` is how *work* moves, machine to machine. Rituals are how *people and agents* synchronize, and they are where the human sits |
| **v0 function** | **None** |
| **Covered?** | ❌ **Not covered — and it passes v0's own two-question test** |
| **Called** | the sprint loop, `/office-hours` … `/retro` (gstack) · the Ralph loop (Indigo) · HANDOFF gates (FRACTAL) · rooms, as the venue (QM) · risk-scaled adversarial review doctrine (QM) |

**It passes the test in `01-problem.md` §3, which is worth checking rather than asserting.**

*(a) Independence.* gstack is high-ritual, low-control — five planning skills deep, no dependency
graph. FRACTAL is the inverse — router, dispatch and HANDOFF gates, with no retro, no office hours, no review ceremony. Two systems diverging in opposite directions is the independence test passing cleanly, not marginally.

> KD Note: the router and dispatch etc... are all part of the task flow of how code gets implemented.  All of our rituals are similarly manually invoked and were not fully integrated in generic-cerebro since we had not reached that level of maturity.  For example, because transcripts were manually created via Google Meet Transcribe, we brought them into the _INBOX/ and then used the /meeting-standup-summary to ingest our meetings into our LLM-wiki

*(b) Artifact.* A slash command, a review checklist, a retro document, an agenda template. `/retro` and `/office-hours` ship as skills.

**Three reasons it is more than a tenth row.**

**It is the answer to the open note in `01-problem.md:52`** — that AI workflows now encompass the entire work process and we have not built infrastructure for agents to participate in all of it. The reason agents participate in one phase is that only one phase, coding, has been encoded. Intake, planning, review, retro and incident remain tribal. Rituals name the phases the agent has not been admitted to.

**It unifies three gaps this document found separately.** A peer review *is* a human-in-the-loop
placement (§3.11). A retro *is* where `F8` Learning happens for humans. A standup *is* the
communication channel (§3.9). Those may be fragments of one concept rather than three holes — which is a better outcome than three new functions.

**It reframes what the corpus already dismissed.** `specs/v0/references.md` §1 calls gstack *"process opinion"* and treats it as adjacent. *Ritual* is the more precise word, and it makes gstack's sprint loop legible as a capability system rather than a taste preference.

**The cost, stated plainly.** Adopting this partially reverses `01-problem.md` §5, which says the
framework deliberately supplies no process opinion. The resolution exists but must be explicit: we do not say *hold a retro on Friday*; we say **your rituals are versioned capabilities — here is the shape, here is where the agent participates, here is the artifact each one emits.** That is the third branch applied to ritual, and gstack demonstrates it is implementable. It is still a change to a stated position, not a smooth addition, and it lands against `OPEN-3`, which asked whether the count was too high and was resolved as twelve.

### 3.16 Stewardship

| | |
|---|---|
| **Definition** | Who maintains the system that produces the work, as distinct from who produces the work. Curation, staleness, contradiction, retirement |
| **Confused with** | Agent (§3.4). A steward *is* an agent role, but stewardship is a question every function has and most functions answer with silence |
| **v0 function** | Partially `04-decision-layers.md` §3 — but that table records who **decides**, not who **maintains** |
| **Covered?** | ⚠️ Partially, and the two activities are conflated |
| **Called** | **librarian** (Tan) · **Quartermaster** (QM — the product is named after the role) · `/update-hq` wholesale `core/` replacement (Indigo) · automatic capture (SageOx — the position that no steward is needed) |

**The landscape actively disagrees here, which makes it worth naming.**

| Position | System | Claim |
|---|---|---|
| A named curator | Tan | *"A brain nobody curates is a garbage dump with great search."* Provenance tracking, contradiction checks, active pruning |
| Automate the curator away | SageOx | Manual curation *is* the failure mode. The $15M bet is on automatic capture |
| Vendor owns it | Indigo | `core/` is replaced wholesale on update; `personal/` cannot override it |
| Nobody | LoomWarp, Gas City, FRACTAL | `F8` Learning is designed-only |

**The sharper question is not whether to have a librarian — it is whether the steward is an agent or a gate.** LoomWarp's §2.3 says *mechanical over prose, prefer the gate*.

> ⚠️ **Corrected 2026-08-26.** This section previously argued against a steward agent on the grounds that *"`resolve-context-bundle.cjs` already enforces version, hash and expiry"*, so no failure remained for an agent to catch. **That was false.** No such file exists in this repo and none ever has — verified against full git history. **Nothing enforces context freshness today**, so `STRATEGIST` §2.6's test — name the measurable failure of the simpler design first — has not actually been run. `OPEN-9` is reopened on corrected facts, and the honest position is that we have *neither* a gate nor a steward.

The prior art has a better answer than either. `generic-cerebro` splits stewardship by **content tier**: an optimistic `wiki/` tier where an agent reports and never silently rewrites, and a locked `decision-log/` tier where a gate with RACI ownership is the only write path. **Agent and gate, divided at the promotion event** — see [`systems/kd-built-frameworks/05-context-and-the-librarian.md`](./systems/kd-built-frameworks/05-context-and-the-librarian.md).

Two observations the rest of this corpus missed:

**QM is named Quartermaster.** A quartermaster does not fight; they provision, account for, and
distribute supplies. The nearest peer is named after a stewardship role, and this corpus cataloguedthe product without reading its name. That is the clearest statement in the landscape that someonehas to own supply.

**It fits the loom metaphor better than anything else in the model.** Doer agents — Feature Lead,
Sub-Agent, CodeWorker — weave the **weft**. Steward agents maintain the **warp**.
[`../elements.md`](../elements.md) §1 says the metaphor does real work in exactly one document; this
would be the second place it earns its keep, and it explains *why* the two kinds of agent are
different rather than merely listing tiers.

> KD Note: yes, we need one and this should be an interactive session similar to how our previous `/initiative-interview` skills would run sessions with our human product owner(s) to triage the decision ledger and should similarly be cataloging and mending issues in our processes.  (`generic-cerebro` → `.claude/plugins/cerebro-planning/skills/decision-ledger-v2/SKILL.md` and `.../skills/initiative-interview`)

---

## 4. The crosswalk

What each system calls the same concept. `—` means the system does not name it as a distinct thing.

| Concept | Claude Code | gstack / gbrain | Gas City | QM | Indigo HQ | SageOx | generic-cerebro | LoomWarp |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Harness** | *is one* | `--host` | `provider` field, 15 CLIs ⚠️ *ISSUE-004* | adapters | AGENTS.md symlink | agent matrix | Claude Code only — no adapter | `F0` (undecided) |
| **Agent** | subagent | — | agents | — | workers | coworkers | 4 tiered agents, model-assigned | Feature Lead / Sub-Agent |
| **Skills** | skills | skill files | formulas | skills | SKILL.md | — | 39 skills in 6 audience-cut plugins | skills / plugins |
| **Individual memory** | auto-memory | personal brain | — | user scope | `personal/` | — | auto-memory **+ a routing rule** | (claude auto-memory) |
| **Team memory** | — | team brain | — | room scope | `core/` + knowledge | Knowledge Bubbles | `wiki/` + `projects/` | `context/` |
| **llm-wiki** | — | gbrain | — | — | knowledge + qmd | hivemind | `wiki/` + committed BM25 index | context fabric |
| **Context assembly** | CLAUDE.md load | — | — | scope bundle | charter + policies | **`ox agent prime`** | `paths:` rules auto-load on match | the Briefing *(unbuilt)* |
| **Task flow** | agent teams, workflows | skill chain | formulas | — | Ralph loop | `ox plan enrich` | BLUEPRINT → router → PRD → HANDOFF | BLUEPRINT → router |
| **Project board** | — | — | **beads** | — | `workspace/` | — | CH-item backlog + ticket bridge skill | was QUEUE.md (from fractal) should probably stub in linear |
| **Communication** | — | — | Event Stream | **rooms** | — | Ox Dot / Console | digest / standup / brief skills → chat | —<br>should consider slack |
| **Human in loop** | permission modes | — | wake mode | **strict/auto/dangerous** | hook profiles | — | `disable-model-invocation` + named gates | risk tiers R0–R4 |
| **Policy** | deny rules, hooks, managed settings | — | — | command policy | hooks | — | **— (prose only; no hooks exist)** | `F6` tiers |
| **Evidence** | OTel | evals | Event Stream | Postgres | — | **Ledger** | HANDOFF + 4-layer eval ladder | `events.jsonl` |
| **Capture loop** | skill-creator | "skillify it" | — | — | `/learn` (manual) | **automatic** | `_INBOX` → ingest → sources → synthesis | `F8` *(unbuilt)* |
| **Standards** | — | — | — | — | — | — | **`standards/` + compounding finding-classes** | **`standards/`** |
| **Rituals** | — | **sprint loop** | formulas | — | Ralph loop | — | sprint-close, digests, nightly cron *(local-only)* | HANDOFF (incorrect, in generic-cerebro this was the manual cerebro-planning skills that were ran after meetings or sprints) |
| **Stewardship** | — | **librarian** | — | ***Quartermaster*** | `/update-hq` | *automated away* | **librarian tier** (a content property, not a person) | — |

Full teardown of the new column: [`systems/kd-built-frameworks/`](./systems/kd-built-frameworks).

**The `standards/` row is no longer LoomWarp alone.** The predecessor shipped the tier first, behind the same *reference-never-copy / tighten-never-contradict* inheritance contract, plus a compounding half LoomWarp does not have. What survives of the claim is narrower and worth stating precisely: among systems a stranger can *adopt*, LoomWarp is still the only entry — the predecessor has no licence, no releases and one operator. See [`systems/kd-built-frameworks/06-capability-and-standards.md`](./systems/kd-built-frameworks/06-capability-and-standards.md) §5.

**`ox agent prime` still occupies the row we claimed was ours**, and the new column does not contest it. `paths:`-scoped auto-loading is context *routing*, not assembly — it decides which instructions attach to what you are touching, and never produces a resolvable bundle with provenance.

**Stewardship gains its second real answer, and it is a different kind of answer.** One peer names its product after the role, one automates it away as a failure mode. The predecessor makes stewardship a property of the **content** — an editorial tier declared in frontmatter, carrying optimistic concurrency for capture and pessimistic concurrency for change-managed decisions over one corpus. That sidesteps the person-or-bot dichotomy the other two answers are trapped in, and it is the shape [`00-README.md`](./00-README.md) §F-2b was asking about.

**Two rows are worth reading as a pair.** **Rituals** is populated by every process layer and empty for the harness — the correct shape, and evidence the concept belongs at our altitude rather than the runtime's. **Policy** is now the mirror image: populated for the harness and for the two systems that lean on it, and *empty for the predecessor* — which has 130 workstreams of authoring discipline and not one mechanical check. That single cell is the argument for `loomwarp-team-system` `references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md` (private) P-1.

### 4.1 Rows the crosswalk is missing

Each of these is named as a distinct thing by two or more systems — the same corroboration standard that promoted Rituals and Stewardship into the table above. Proposed, not adopted; settling them is the function-model pass.

| Proposed concept | Who treats it as first-class | Currently |
|---|---|---|
| **Decision record** — a ratified, owned, auditable decision as distinct from a note that reads like one | generic-cerebro (ledger + a single write path) · SageOx (Ledger) · Gas City (beads as work units in git) | Folded into **Evidence**, which conflates *what happened* with *what we decided* |
| **Context routing** — which instructions attach to what, and where a given fact belongs | generic-cerebro (`paths:` rules + the routing doctrine) · Indigo (`core/` vs `personal/`) · QM (scope) | Folded into **Context assembly**, which is a different job — routing decides what attaches, assembly decides what gets bundled |
| **Lifecycle** — how an artifact is retired, archived, or superseded | generic-cerebro (release-cut archives, `status:` headers, supersession pointers) · nobody else | No row. Every system accumulates; one has a documented way to stop |
| **Maturity diagnostic** — grading an adopter and telling them what to skip | generic-cerebro (18-row rubric) · LoomWarp (the Grid) | No row — and [`00-README.md`](./00-README.md) §F-5 identifies it as our better adoption wedge |

**Decision record and Context routing are the two with real consequences.** The first would give the function model somewhere to put a decision that is not an event; the second would separate two jobs currently sharing one cell, and the separation is exactly what makes the predecessor's `paths:` mechanism legible as a distinct primitive rather than a weaker form of assembly.

**Lifecycle is the surprising one.** No system in this corpus except the predecessor has a documented answer to *how does an artifact stop being current* — and its own register names artifact accumulation as a failure mode it is still losing to. A row nobody scores on is still worth having, because it names an absence everybody shares.

---

## 5. Coverage scorecard

Your thirteen concepts against the v0 function model, plus two the analysis added (**#14, #15**) and
one it had to introduce to make the vocabulary work at all (**#3**).

| # | Concept | v0 function | Covered? |
|---|---|---|---|
| 1 | Model | *(input to `F0`)* | ✅ correctly excluded |
| 2 | Harness | `F0` | ⚠️ conflated with portability |
| 3 | Agent | `F5` | ✅ |
| 4 | Skills | `F5` Catalog | ✅ |
| 5 | Memory — individual vs team | `F3` | ❌ **not distinguished** |
| 6 | llm-wiki | `F3` + `F8` | ⚠️ artifact and loop not joined |
| 7 | Tasks and flow | `F4` | ✅ |
| 8 | Communication | — | ❌ **no function** |
| 9 | Observability | `F7` + `F8` | ✅ split is correct |
| 10 | Project board | `F1`/`F4` | ⚠️ unsettled (`R-5`) |
| 11 | Human in the loop | inside `F6` | ❌ **not its own decision** |
| 12 | Planning context | `F3` | ⚠️ hot vs durable not distinguished |
| 13 | Surfaces / Substrate | `F0`, `F1` | ⚠️ each holds two concepts |
| 14 | **Rituals** | — | ❌ **no function — and it passes the two-question test** |
| 15 | **Stewardship** | `04` §3, partially | ⚠️ conflated with decision rights |

**Four not covered, six partially, five clean.** The four gaps — individual/team memory,
communication, human-in-the-loop placement, and rituals — are each a first-class primitive in at
least two peer systems, which is the same corroboration standard that promoted Substrate and Surfaces in the first place.

**And the gaps may not be four.** §3.15 argues that communication, human-in-the-loop placement and he human half of the capture loop are all *instances* of ritual — a peer review is an approval placement, a standup is a channel, a retro is where learning happens for people. If that holds, the model needs **one** new function rather than three, which is the cheaper and more defensible outcome. Testing that is the first job of the function-model pass.

**A further concept has no home in either direction:** the *process layer* (§3.3) is the category
LoomWarp occupies and neither the functions nor the vocabulary names it.

---

### 3.17 Primitives

| | |
|---|---|
| **Definition** | A minimal, named, composable unit that the harness makes the **single sanctioned way** to express something |
| **Confused with** | A feature. A feature is something the system can do; a primitive is something the system makes you do *one way* |
| **v0 function** | Cross-cutting. `F5 Capability` packages them; `F4 Control` composes them; `F6 Policy` bounds them |
| **Covered?** | ❌ **Not covered — and this document's own notation depends on it.** [`02-component-matrix.md`](../../components/MATRIX.md) marks `●` as *"owns it as a named primitive"* across 18 components and 9 systems, and the term was never defined |
| **Called** | "primitives" (Gas City, QM, Daily, Reddit, Oracle) · "building blocks" · "golden paths" (CNCF platform engineering) · "the new primitives" (Kramer) |

**The defining property is not what a primitive does — it is that there is one of it.** A team with
two ways to declare a unit of work has no work primitive; it has two conventions and a coin flip.

**Why this matters more for a harness than for ordinary software.** A human offered three ways to run
tests picks one and remembers. **An agent offered three ways picks differently each session, or
invents a fourth.** Every additional sanctioned path multiplies against every session, and the model
has no memory of which one the team preferred last time. So the harness's job is to make the right way
the *only* way, and the payoff is that the agent reaches for the established practice instead of
reinventing one.

That is the mechanism behind Andrew Orobator's (Reddit) *"Spin at the Gate Until Green"*:

> *"If you can express correctness as a binary — does it compile, do the tests pass, does the lint
> check clear — you can remove the human from that loop entirely. The AI submits. The gate checks. If
> red, it adjusts and resubmits."*

**Correctness is expressible as a binary only because there is exactly one gate.** He names the
enabling set outright — *"the engineering primitives that make this possible: **personas** (consistent
behavior at the agent level), **skills** (composable, reusable prompt modules), **worklogs**
(accountability across sessions), **postmortems** (turning failures into constraints), and
**spec-driven development**."*

Kwindla Kramer (Daily) makes the generational claim: *"every piece of software with a human-facing
surface will be built from new, LLM-centric primitives — just like every piece of software today has
networking, threads/async routines, UI on top of some flavor of Model/View/Controller… **We're just
starting to invent these new primitives.**"*

**The crosswalk — what each system actually names.** This is the most direct answer in the corpus to
*"what does harness architecture look like"*, because a system's primitive set is its architecture:

| System | Its primitive set |
|---|---|
| **Claude Code** | skill · subagent · hook · plugin · MCP server · settings · agent team |
| **Gas City** | formula (TOML workflow) · agent · **bead** (git-native work unit) · order (trigger) · pack (distribution bundle) · Event Stream |
| **QM** | **scope** (user or room, with its own memory, files, keychain, permissions, crons, sandbox) · posture · adapter |
| **Indigo HQ** | company · worker · command · thread · skill |
| **MCP** | tool · resource · prompt |
| **FRACTAL** | BLUEPRINT · workstream · PRD · HANDOFF · PULSE |
| **generic-cerebro** | decision entry · finding-class · `paths:`-scoped rule file · wiki tier |
| **LoomWarp** | **— unanswered, and that it is not obvious is the finding** |

Two observations from that table. **The systems that force a choice have the crispest sets** — Gas
City makes you pick *beads or Linear*, QM makes every scope carry the same bundle. And **the count is
small everywhere**: five to seven. A primitive set that grows without bound is a feature list wearing
the word.

**Where the ontology argument actually lands.** The durable half of the ontology case — Palantir's
*"kinetic elements (actions, functions, dynamic security)"*, Ken Huang's *"permitted verbs"*, Frank
Coyle's *"typed entities and relationships that tools must respect"* — is **a primitive set with
bounded verbs**, described in business-intelligence vocabulary. See
[`2026-08-research/04-primitives-ontology-platform.md`](./2026-08-research/04-primitives-ontology-platform.md).


## 6. What this changes downstream

Recorded as findings for the function-model pass. **Not acted on here**, per the scope discipline in
`fractal/STRATEGIST-loomwarp.md` §4.

| # | Finding | Bears on |
|---|---|---|
| **C-1** | Harness and process layer are different categories; `F0` holds both | `F0` definition; `02-functions.md` §3 |
| **C-2** | Individual vs team memory is the axis three peers are built on; `F3` does not have it | `F3`; possibly `OPEN-2` |
| **C-3** | Communication has no function. QM's *rooms* is the primitive | `F1` split, or a tenth function |
| **C-4** | Human-in-the-loop placement is a named three-level posture in three systems | `F6`; `05-preflight-spec.md` §4 Phase 3 |
| **C-5** | Karpathy's *does knowledge compound?* is a better bar than `F3`'s ladder wording | `03-maturity.md` §4 |
| **C-6** | `ox agent prime` ships the Briefing. Our claim must narrow to the *provenance manifest joined to outcome* | `02-functions.md` §6; `references.md` §3 |
| **C-7** | gbrain's *thin harness, fat skills* rule is our own principle, better stated | `standards/`; `STRATEGIST` §2.2 |
| **C-8** | LoomWarp has no phrase for its own category | positioning |
| **C-9** | **Rituals passes the two-question test and has no function.** It may subsume C-3 and C-4 rather than adding to them, and it is the answer to the open note at `01-problem.md:52`. Cost: it partially reverses `01-problem.md` §5's no-process-opinion stance | `02-functions.md`; `01-problem.md` §5; `OPEN-3` |
| **C-10** | **Stewardship is conflated with decision rights.** The real question is *agent or gate* — and `STRATEGIST` §2.6 requires a measurable failure of the gate before adding an agent. None has been named. Also: doer agents weave the weft, steward agents maintain the warp | `04-decision-layers.md` §3; `../elements.md` §1 |

---

*Next: [`02-component-matrix.md`](../../components/MATRIX.md) — the same systems, by component.*
