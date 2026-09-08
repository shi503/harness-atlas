---
title: "v0 — References: the agentOS landscape"
tier: spec
project: harness-atlas
created: "2026-08-11"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# References — the agentOS landscape

**What this is.** The systems, essays, and maturity models that shaped v0, with what each one
contributes and where it disagrees with us. **This is the sourced catalog.**

**Why it comes with the spec rather than after it.** Three findings from this landscape changed the
function model directly. A reader should be able to check them.

> **The analysis moved.** Per-system teardowns, the concept vocabulary, the component matrix and the
> jobs-to-be-done view now live at
> [`../../references/comparisons/`](../../comparisons) — outside `specs/` because the
> landscape outlives any spec version. **Start at
> [`comparisons/01-concepts.md`](../../comparisons/01-concepts.md)**, which defines
> "agentOS", separates *harness* from *process layer*, and scores the function model against fifteen
> concepts. Four of them turn out to have no function at all — and one of those, **rituals**, passes
> v0's own two-question test and may subsume two of the others.
>
> Two findings from that pass revise this document and are marked inline below: the **standards
> layer** (§1.5) and the **narrowing of the provenance claim** (§3).

---

## 1. The systems

| System | Owner | Shape | Harness stance | License / status |
|---|---|---|---|---|
| **Claude Code** | Anthropic | The harness itself — tools, agent loop, extension layer | n/a — it *is* one | Commercial |
| **gstack** | Garry Tan | Role-based process opinion; 35+ slash-command skills chained into a sprint loop | **Multi-host install** — `--host claude\|codex\|opencode\|cursor\|factory\|slate\|kiro\|hermes\|gbrain` | MIT |
| **Gas Town / Gas City / Beads** | Steve Yegge | Software factory; declarative composable primitives | **Factory Worker Protocol** — abstracts codex, claude, gemini, amp, opencode, pi | Open source |
| **QM (Quartermaster)** | Y Combinator | Multiplayer org harness; scope-first, durable core | **Adapters** for Pi, OpenCode, Codex, Claude Code — selectable per user or per room | MIT, v0.1.0 |
| **Indigo HQ** | Indigo (seed) | Filesystem shared context layer under coding agents; tenancy, hooks, secrets, sync app | `AGENTS.md`↔`CLAUDE.md` symlink; Claude Code, Codex, Cursor | Mixed — flagship repos unlicensed |
| **SageOx / Ox** | SageOx ($15M seed) | Agentic context infrastructure — automatic decision capture, Ledger, session priming | Hooks, plugins or instruction files across ~12 harnesses | MIT (CLI); commercial console |
| **FRACTAL** | upstream (`shi503/fractal-agent-system`) | Four-tier single-repo orchestration | Claude Code only | — |
| **LoomWarp** | this repo | Estate + governance + provenance across an estate | *to be decided by `F0`* | — |

> **Two systems added 2026-08-11.** Indigo HQ is the closest structural analogue to LoomWarp;
> **SageOx is the closest competitor to `F3`'s Briefing** and its existence narrows a claim this
> document previously made. Teardowns: [`indigo-hq.md`](../../comparisons/systems/indigo-hq.md)
> · [`sageox.md`](../../comparisons/systems/sageox.md).
>
> **A category correction.** Of the systems above, only Claude Code is a *harness*. gstack, Gas City,
> QM, Indigo, SageOx, FRACTAL and LoomWarp are **process layers installed into harnesses** — which is
> why each ships an adapter. See [`comparisons/01-concepts.md`](../../comparisons/01-concepts.md) §2.

### The three findings that changed the model

**Finding 1 — three of three build a harness adapter layer.**

`references/elements.md:63` lists *"Adapters / runtime-neutrality"* as a deliberate non-element: *"a
cross-cutting property of F2 and F4, not a thing you construct."* Every comparable system constructs
it, and treats it as a headline:

| System | The primitive | What it enables |
|---|---|---|
| gstack | `./setup --host <name>` | Same skills installed into nine different agent runtimes |
| Gas City | **Factory Worker Protocol** — "a standardized interface abstracting differences between CLI coding agents" | *"Permits seamless agent substitution without modifying formulas"* |
| QM | Adapters for Pi / OpenCode / Codex / Claude Code | *"Per-user or per-room model selection without infrastructure changes"* |

Three independent teams solving the same problem the same way is the strongest available evidence
that it is a real structural function. It became `F0 Substrate`.

**Finding 2 — QM already named the missing half of Workspace.**

> *"Surfaces are plugins, not the product."*

QM's Slack integration, web UI, admin panel, and public portal are all optional plugins over one HTTP
API, with *"the same identity and configuration carrying between Slack and the web app."* That is
precisely the layer LoomWarp's "Workspace" was missing — where work is *seen and done*, as distinct
from where code lives. It became `F1 Surfaces`.

Gas City surfaces the same question as an explicit team choice — **beads or Linear** for work
tracking — which is exactly the shape `F1` has to handle: a decision, recorded, not a default.

**Finding 3 — nobody ships a standards tier.**

Not Claude Code, not gstack, not Gas City, not QM. gstack encodes *process* opinion — `/office-hours`
→ `/plan-eng-review` → `/qa` → `/ship` — which is adjacent but different: it names the sequence, not
the bar. *"What good looks like"*, as a versioned, owned, inherited artifact, is unclaimed ground.
This is why `F5 Capability` splits into Standards and Catalog.

---

## 1.5 The standards layer *(added 2026-08-11)*

Not systems, but the substrate all of them ride — and the layer whose economics changed most
recently. The original draft of this document omitted it entirely.

The **Agentic AI Foundation** formed under the Linux Foundation in December 2025, stewarding
Anthropic's **MCP**, OpenAI's **AGENTS.md** and Block's **goose**. **Agent Skills / `SKILL.md`** was
published as an open cross-platform standard the same month.

**Current state, re-checked 2026-08-26** — the figures below replace an earlier paragraph that was
already stale two weeks after it was written:

| | |
|---|---|
| **Members** | **247** as of 2026-08-13, +57 in three months. New Gold members include Visa, Wells Fargo and Alibaba — a heavy financial-services and APAC tilt |
| **Hosted projects** | **Five** — MCP · goose · AGENTS.md · agentgateway · **A2A**, which landed at v1.0 in March 2026 and joined AAIF on 2026-08-19 |
| **MCP spec** | **There is no "MCP v2."** The spec is date-versioned; the current one is **2026-07-28**, the largest revision to date — the protocol went from bidirectional and stateful to **request/response and stateless**, with Tasks, MCP Apps and Enterprise Managed Authorization moved out of core into a formal extensions framework |
| **MCP adoption** | 110M+ monthly downloads — *as of April 2026; the figure is dated and should be re-sourced before external citation* |
| **AGENTS.md** | v1.0 is current and defines **no frontmatter and no required fields**. A 1.1 adding optional `description` and `tags` is proposed, not shipped |
| **Memory interop** | **AAIF has no memory working group.** Interop sits at a W3C Community Group (launched 2026-06-03, 21 participants) and an IETF independent submission that concluded 2026-07-29. Early, unadopted |

**The consequence that bears hardest on `F3`:** the July MCP revision is explicitly hostile to hidden
session state — *"if your server needs to carry state across calls, mint an explicit handle from a tool
and have the model pass it back as an argument."* **MCP has deliberately closed the door on being a
memory substrate.** Any design assuming it would grow into team memory must assume otherwise.

Full detail: [`../../references/comparisons/2026-08-research/05-standards-layer.md`](../../comparisons/2026-08-research/05-standards-layer.md).

**The consequence, and it bears directly on `F0`:** *the formats are commoditized.* Nobody wins by
owning a file format anymore, and the competition moved up-stack to sync, governance, secrets, memory
and the capture loop. Riding the standards is now cheap — which strengthens the *portable-where-cheap*
default in `05-preflight-spec.md` §4 and weakens any argument for a bespoke format.

Sources and the full table: [`comparisons/systems/90-short-profiles.md`](../../comparisons/systems/90-short-profiles.md) §4.

---

## 2. System notes

### Claude Code — Anthropic

Docs: <https://code.claude.com/docs/en/> · index at `/docs/llms.txt` · any page's raw markdown by
appending `.md`

Full analysis in [`../../references/claude-code/`](../../content/claude-code) — 13 documents read
from the official docs on 2026-08-10, covering the extension layer through v2.1.224.

The short version for v0: the extension layer is far more capable than when LoomWarp's architecture
was set. Skills subsume custom commands and can fork into subagents; hooks expose 29 lifecycle events
with a real permission-decision protocol; plugins and marketplaces provide SHA-pinned versioned
distribution; agent teams and dynamic workflows provide dependency-aware orchestration; and
OpenTelemetry emits per-agent, per-skill, per-plugin cost and outcome attribution.

**What it does not provide** — and this is the boundary v0's differentiation sits on: a versioned,
hashed, owner-attributed manifest of the context an agent actually saw, joined to that work's
outcome.

### gstack — Garry Tan

- Repo: <https://github.com/garrytan/gstack> (MIT)
- Talk: [**Own Your Intelligence**](https://www.ycrootaccess.com/p/garry-tan-own-your-intelligence) — YC Root Access

**Shape.** 35+ slash-command skills organised as a sprint loop: **Think** (`/office-hours`,
`/plan-ceo-review`) → **Plan** (`/plan-eng-review`, `/plan-design-review`, `/plan-devex-review`,
`/autoplan`) → **Build** (`/spec`, `/investigate`) → **Review** (`/review`, `/codex`, `/cso`) →
**Test** (`/qa`, `/benchmark`, `/canary`) → **Ship** (`/ship`, `/land-and-deploy`,
`/document-release`) → **Reflect** (`/retro`).

**What makes it more than a prompt library** is that the skills *chain through artifacts*:
`/office-hours` writes a design doc that `/plan-eng-review` reads, which writes a test plan that
`/qa` picks up. That artifact chain is the mechanism, and it is close to what `F4 Control` means by
sequencing.

**Coexistence is a designed feature.** `--prefix` yields `/gstack-qa` instead of `/qa` to avoid
collisions with other skill packs; `/pair-agent` connects Claude Code, OpenClaw, Hermes, Codex, and
Cursor to one shared browser with per-agent isolated tabs and scoped tokens.

**Garry Tan's equation**, which `F0 Substrate` adopts as its one-liner:

> **frontier model** (rented, commoditized) **+ your context** (owned, unique) **+ a harness**
> (OpenClaw, Claude Code, …) = an agent acting as a fast version of you.

And the ownership argument, which is the clearest available statement of why portability is a
*political* property and not just a technical one:

> *"Skill files are yours. Own your skills because if you don't, your job becomes a skill file."*

He contrasts two futures: skills in *your* repo, travelling with you; or skills in the company repo,
executing your judgment indefinitely without you. That is `F0`'s portability posture question, stated
as a stake rather than a config option.

### Gas Town / Gas City / Beads — Steve Yegge

- [Announcing Gas City 1.0](https://sellsbrothers.com/announcing-gas-city-1-0) *(via Chris Sells)*
- [Welcome to Gas City](https://steve-yegge.medium.com/welcome-to-gas-city-57f564bb3607)
- [Gas Town: from Clown Show to v1.0](https://steve-yegge.medium.com/gas-town-from-clown-show-to-v1-0-c239d9a407ec)
- [Gas Town](https://yegge.ai/gastown) · [The Continuous Thunderdome](https://yegge.ai/essays/the-shape-of-things-to-come/)
- [Gas Town's Agent Patterns, Design Bottlenecks, and Vibecoding at Scale](https://maggieappleton.com/gastown) — Maggie Appleton
- [Gas Town, Beads, and the Rise of Agentic Development](https://softwareengineeringdaily.com/podcasts/gas-town-beads-and-the-rise-of-agentic-development-with-steve-yegge/) — SE Daily

**Framing.** A *software factory* — "a system for building, validating, deploying, operating, and
maintaining production software." The problem it names is babysitting: engineers cycling between
terminals, re-injecting context and guardrails by hand.

**Primitives**, and their nearest v0 function:

| Gas City | v0 |
|---|---|
| **Formulas** — TOML step-by-step multi-agent workflows | F4 Control |
| **Agents** — modular, reusable across formulas; scope, wake mode, provider, model | F5 Capability |
| **Beads** — tiny trackable work units, JSON in git alongside code | F4 Control / F1 Surfaces |
| **Orders** — trigger-based automations | *(no v0 equivalent — see below)* |
| **Packs** — shareable bundles of agents, formulas, orders | F5 Capability (Catalog) |
| **Event Stream** — notification and logging across orchestrated work | F7 Evidence |
| **Factory Worker Protocol** — abstracts CLI coding agents | **F0 Substrate** |

**Orders has no v0 equivalent, and that is worth noting.** Trigger-based automation — *when X
happens, run Y* — is expressible natively as hooks and scheduled tasks, so it may be an
implementation detail of F4 rather than a missing function. Flagged rather than resolved.

**The multi-provider argument** is worth quoting because it is a quality argument, not a portability
one: the code-review-loop formula runs Codex, Claude, and Gemini in parallel because *"each one has
been trained differently and has a different point of view."* Portability is the side effect;
adversarial diversity is the point.

### QM (Quartermaster) — Y Combinator

- [Inside QM: a system design teardown of Y Combinator's multiplayer agent harness](https://atul4u.medium.com/inside-qm-a-system-design-teardown-of-y-combinators-multiplayer-agent-harness-d5482cd8d5d3)
- MIT, v0.1.0, released late July 2026. `@yc-software/qm`. No hosted SaaS — deployments run in
  customer-owned cloud accounts

**The single most transferable idea: scope as a first-class primitive.** Each scope — an individual
user or a shared room — gets an isolated bundle containing memory, files, keychain view, permissions,
crons, web apps, and a durable sandbox. This is how it supports *"many isolated agent-workspaces that
can also meet in shared rooms"* without shared-state chaos.

Other design decisions that bear on v0:

| QM decision | Bears on |
|---|---|
| **Headless core** owning identity, policy, scheduling — *"every turn runs through one central core"* | F6 Policy — one choke point |
| **Durable substrate** in Postgres — *"nothing important lives only in a model's context window"* | F7 Evidence; F4's durable-execution gap |
| **Three postures** — strict / auto / dangerous, where *narrower scopes can only tighten, never loosen* | F6 Policy — the same monotonic-narrowing invariant as deny-wins |
| **Tiny tool surface** — primarily `execute` in a durable sandbox where installed packages persist | F0 Substrate |
| **Surfaces as plugins** — Slack, web UI, admin, portal over one HTTP API | **F1 Surfaces** |
| *"The agent acts as the person it's working for, with their credentials and their permissions, and everything it does is audited"* | F6 + F7 |

**Its honesty is worth imitating.** QM documents that *"the command policy is bypassable"* and
classifies itself as *"a speed bump against mistakes and injection, not a sandbox boundary"*, and
publishes known limitations (plaintext sandbox credentials during use, admin access to unencrypted
transcripts). Claude Code's docs make the same move about managed settings — *"a client-side control,
not a security boundary."* LoomWarp should inherit that register rather than over-claim.

### FRACTAL — upstream

`shi503/fractal-agent-system`. Four tiers — Strategist, Architect, Feature Lead, Sub-Agent — with
BLUEPRINT → router → dispatch and HANDOFF gates. Single-repo, Claude Code only. Vendored here at
`6398f6db…`; zero tags and zero releases as of 2026-08-04. LoomWarp is this, federated across an
estate.

---

## 3. Positioning

Where each system concentrates. Nobody occupies all four.

```
            PROCESS OPINION                      ORCHESTRATION
       "here is the sequence"                "here is the factory"
              gstack                            Gas City
                 │                                  │
                 └──────────────┬───────────────────┘
                                │
         ┌──────────────────────┴──────────────────────┐
         │                                             │
    MULTIPLAYER                                 GOVERNANCE
  "many people, one org"                   "prove it, across an estate"
         QM                                     LoomWarp
```

| System | Concentrates on | Does not claim |
|---|---|---|
| **gstack** | Process opinion; role-based sprint loop | Multi-repo estate; policy enforcement; provenance |
| **Gas City** | Orchestration at factory scale; provider diversity | Maturity diagnosis; standards |
| **QM** | Multiplayer org deployment; scope isolation; durable core | Process opinion; standards; context provenance |
| **LoomWarp** | Estate governance; context provenance; maturity diagnosis | Process opinion (deliberately — see `01-problem.md` §5) |

**Two things LoomWarp has that none of the others claim:**

1. **A maturity diagnostic.** gstack, Gas City, and QM are toolkits. None grades you or tells you
   what to skip. `03-maturity.md` is genuinely differentiated — and it is also the thing that makes
   *"adopt native, don't build"* a credible recommendation rather than a concession.
2. **Context provenance joined to outcome.** Named independently as a gap by Garry Tan (*provenance
   tracking — maintaining source attribution for every fact*) and by the prior AI-native rubric (the
   single most-cited gap in its own self-grade). Still unclaimed.

> ### ⚠️ Correction, 2026-08-11 — claim 2 has narrowed
>
> Claim 2 as written above is **half false**. SageOx's `ox agent prime` ships context assembly from
> team memory into every agent session, across roughly a dozen harnesses, MIT-licensed and funded at
> $15M. Context assembly is no longer unclaimed.
>
> What survives is narrower and sharper:
>
> > Context **provenance** — a hashed, versioned, owner-attributed manifest of what an agent saw,
> > reconstructable after the fact and joined to that work's outcome — is still unclaimed by anyone
> > in the comparison set.
>
> That narrower claim now has **four** independent corroborations rather than two: Tan, the prior
> rubric, `references/claude-code/30-gap-analysis-loomwarp.md`, and the Indigo landscape analysis's
> whitespace #4 — *"no one can answer 'what context did the agent see, from which source, when, and
> who approved it.'"*
>
> **Falsifier, so this can be checked rather than believed:** the claim dies if SageOx adds version
> pinning and per-run manifest reconstruction to its Ledger, if Anthropic ships team context sync, or
> if a memory interop standard lands under AAIF. All three are predicted within 12–18 months of June
> 2026. **Re-check by 2026-12-01.**
>
> **Also worth noting:** claim 1 (the maturity diagnostic) survives untouched and is arguably the
> better wedge — it costs an adopter nothing to try, whereas provenance is unbuilt. See
> [`comparisons/03-jtbd.md`](../../comparisons/03-jtbd.md) §3.

---

## 4. Maturity model prior art

Primary source: `generic-cerebro` → `wiki/synthesis/ai-native-maturity.md`
— a six-stage × three-era rubric with per-stage failure modes, a self-grading protocol, and a
vocabulary bridge. Cited for structure and pattern shape only; `03-maturity.md` extends it with the
second axis and the three named thresholds.

| Framework | Contribution |
|---|---|
| [NN/g UX Maturity Model](https://www.nngroup.com/articles/ux-maturity-model/) | The direct ancestor — six stages, and the presentation style the interactive artifact should follow |
| [ELEKS AI-SDLC maturity](https://eleks.com/blog/ai-sdlc-maturity-model) | Five stages; collapses 1↔2 and has no equivalent for stage 4 |
| [Uvik — what is an AI-native company](https://uvik.net/blog/what-is-ai-native-company) | Five stages, nothing below Assisted |
| Gartner AI Maturity (5 levels, 7 pillars) | Maps ~1:1 through 5; no stage 6 |
| [Microsoft Frontier Firm Maturity Model](https://www.hubsite365.com/en-ww/crm-pages/maturity-model-for-microsoft-365-may-2026-frontier-firm-maturity-model-perspective-cd28147e-d56b-4718-837e-fab7fc19a3d4.htm) | "Agent boss" ≈ 5, "Frontier Firm" ≈ 6 |
| [Faros — harness engineering](https://www.faros.ai/blog/harness-engineering) · [TechTimes](https://www.techtimes.com/articles/316587/20260513/harness-engineering-emerges-fourth-paradigm-ai-engineering.htm) | Names harness engineering as a discipline: **Agent = Model + Harness** |
| **Karpathy — LLM OS · Software 3.0 · [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)** (Apr 2026) | The category's intellectual frame and its acceptance criteria. `raw/` immutable sources → `wiki/` LLM-maintained pages → `CLAUDE.md` as the co-evolved schema, plus `index.md` and an append-only `log.md`. **Explicitly not query-time RAG** — the corpus compounds. Its one-line bar is sharper than anything in `03-maturity.md`: ***does knowledge compound, or does it just get retrieved?*** |
| [McKinsey — State of AI Trust 2026](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/state-of-ai-trust-in-2026-shifting-to-the-agentic-era) | Defines mature as 5–6; *"1% mature"* industry-wide |
| MIT Sloan 2026 | *"85% use, 29% embedded"* — locates most orgs at 2–3 |
| BCG AI at Work | *"High tool usage, limited gains"* — diagnoses the 2→3 failure |
| [Atlassian AI insights](https://www.atlassian.com/blog/teamwork/ai-insights-january-2026) · [Pragmatic Engineer — tokenmaxxing](https://blog.pragmaticengineer.com/the-pulse-tokenmaxxing-as-a-weird-new-trend/) | The Goodhart inversion — usage leaderboards gamed at Meta and Amazon |

**The consistent finding across all of them:** usage is near-universal, embedding is rare. That gap
*is* the 2→3→4 climb, and closing it is what a framework is for.

---

## 5. Open threads

| # | Thread | Status |
|---|---|---|
| **R-1** | Gas City's **Orders** (trigger-based automation) has no v0 function. Probably an F4 implementation detail expressible as hooks + scheduled tasks — confirm before the next revision | **Still open.** "Probably" has been the answer for two revisions; close it or name it |
| **R-2** | QM's **scope** primitive is more precise than anything in v0. Its bundle — memory, files, keychain, permissions, crons, sandbox — cuts *across* F1/F3/F6. Worth evaluating whether v0 needs a scope concept or whether the bands cover it | **Answered: v0 needs it.** Scope is the individual-vs-team memory boundary, and three more systems have a primitive for it — gbrain's *brain × source*, Indigo's `core`/`personal`, SageOx's Knowledge Bubbles. See [`01-concepts.md`](../../comparisons/01-concepts.md) §3.6 |
| **R-3** | gstack's **artifact chain** (`/office-hours` → `/plan-eng-review` → `/qa`) is a Control pattern v0 does not name. Related to FRACTAL's HANDOFF | **Corroborated, still unnamed.** Indigo's Ralph loop uses CI as back-pressure between iterations — a third independent arrival at *work does not advance without a checkable artifact* |
| **R-4** | Gas City's multi-provider *quality* argument (adversarial diversity across differently-trained models) is an F8 Learning technique, not just an F0 property. Not currently captured | **Recorded, deferred.** Presumes `F8` infrastructure that does not exist. Backlog against F8, not v1 |
| **R-5** | Beads stores work units as JSON in git alongside code — a concrete answer to F1's SoT question that neither this repo nor the peers treat as settled | **Sharpened.** Beads is consistent with our own repo-markdown-as-SoT argument, and v0 has never made that consistency argument. Gas City forces *beads or Linear* as an explicit choice; `05-preflight-spec.md` has no project-board question |

### New threads from the comparisons pass *(2026-08-11)*

| # | Thread |
|---|---|
| **R-6** | **Harness ≠ process layer.** `F0 Substrate` bundles two decisions at different layers with different owners and reversal costs. Consequence for `02-functions.md` §3 |
| **R-7** | **Communication has no function.** QM's *rooms* and SageOx's whole problem statement occupy a layer `F1 Surfaces` does not cover — `F1` is about which record is authoritative, not about the channel |
| **R-8** | **Human-in-the-loop placement is not `F6 Policy`.** Three systems ship a named three-level posture (QM strict/auto/dangerous · Indigo minimal/standard/strict · Gas City wake mode). Policy says what is *allowed*; this says who confirms and when |
| **R-9** | **LoomWarp has no phrase for its own category.** Every peer does: *software factory*, *multiplayer org harness*, *shared context layer* |
| **R-10** | **Karpathy's bar is better than our ladder wording.** *"Does knowledge compound, or does it just get retrieved?"* is a sharper `F3`/`F8` test than `03-maturity.md` §4 currently has |
| **R-11** | **`F4`'s durable-execution gap is only unclaimed within this category.** Temporal and LangGraph's persistence layer solve it in workflow engineering. Claiming novelty would be a category error |
| **R-12** | **We would fail our own drift audit.** `references/elements.md` says seven elements; `specs/v0/02-elements.md` says nine; nothing mechanical reconciles them. FM-3, in our own repo, in the document arguing for mechanical enforcement |
| **R-13** | **Rituals is a function-shaped hole.** Every process layer has one — gstack's sprint loop, Indigo's Ralph loop, FRACTAL's HANDOFF, QM's review doctrine — and the harness has none, which is the correct shape for a concept at our altitude. Passes both halves of the two-question test |
| **R-14** | **Nobody agrees on stewardship.** Tan wants a librarian; SageOx bets automatic capture removes the need; Indigo lets the vendor own it; three systems have nobody. That disagreement is a signal the question is live, not settled |

---

*Back to [`00-README.md`](./00-README.md)*
