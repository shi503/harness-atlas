---
title: "agentOS, harness, multiplayer — what each term actually means in 2026"
tier: reference
project: loomwarp
created: "2026-08-25"
status: DRAFT
owner: KD
---

# Three contested terms

**What this is.** Current, sourced definitions for the three terms LoomWarp's positioning depends on.
Two of our standing claims turned out to be wrong; both corrections are here.

---

## 1. `agentOS` — six senses, and the one we claimed is misattributed

**Zero occurrences across 562 World's Fair sessions**, verified twice
([`01`](./01-worldsfair-2026-vocabulary.md) §2.1). The term lives in vendor marketing, not in
practitioner speech, and it has fragmented rather than converged:

| # | Sense | Who | Status |
|---|---|---|---|
| a | Vertical banking platform | **Fiserv agentOS**, launched 2026-05-14 | GA targeted Aug 2026, unconfirmed |
| b | Hosting runtime for agents you build | **Agno AgentOS** — *"serves agents, teams, and workflows through a FastAPI application you own and host"* | Active, framework-agnostic |
| c | OS-abstraction research | **AIOS** — LLM-as-kernel ([arXiv:2403.16971](https://arxiv.org/abs/2403.16971), COLM 2025) | Stable academic reference, no 2026 successor found |
| d | Vertical CX platform | **Infobip AgentOS** | Active |
| e | Vertical legal platform | **Legora aOS**, ~2026-05-07 | Secondary source only |
| f | Consumer OS framing | **Microsoft** "Windows as an agentic OS" | Drew severe public backlash on privacy and user control |

### The correction

`../00-README.md` §1 claims a fourth sense — *"a team's persistent context, policy and evidence
layer"* — and attributes it to Indigo HQ and SageOx. **Neither company uses the term.**

- **SageOx** self-describes as *"the hivemind for human–agent teams"*, category *"agentic context
  infrastructure."* It avoids OS framing entirely.
- **Indigo HQ** says *"the AI Operating System for **companies**"* — human-worker framing, and never
  "agentOS" or "agent operating system."
- **YC's QM** says *"harness."*

**The category is real, funded and correctly identified. Its self-chosen vocabulary is not ours.** The
serious builders in exactly our slot all declined the word — a revealed preference worth more than any
frequency count.

**Consequence.** Adopting `agentOS` means fighting five louder incumbents for a word none of our actual
peers use. Retitle, and keep the six senses as a recorded cautionary note about naming.

---

## 2. `harness` — consensus formed, and it formed fast

Roughly eight months from jargon to infrastructure:

| Signal | Evidence |
|---|---|
| **Encyclopaedia** | A Wikipedia article, last edited 2026-08-22 |
| **Survey literature** | [arXiv:2606.24937](https://arxiv.org/abs/2606.24937) lists *"agent harness design and context management"* as a covered topic |
| **Empirical study** | [arXiv:2602.14690](https://arxiv.org/abs/2602.14690) — 2,853 repos, eight configuration mechanisms |
| **Shipped API namespace** | **Microsoft** `HarnessAgent` (.NET) / `create_harness_agent` (Python), GA per InfoQ 2026-08 |
| **Standards body** | AAIF taxonomy entry, commit 2026-08-19 |
| **Conference** | 113 corpus hits, a track, a Main Stage keynote track |

**The canonical formula** — Trivedy, LangChain, 2026-03-10: **`Agent = Model + Harness`**, where a
harness is *"every piece of code, configuration, and execution logic that isn't the model itself."*

### What this settles for us

**The model sits outside the harness.** `01-problem.md` §2 row 1 derives Substrate as *"a model, **and**
a harness that gives it tools and a loop"*, which the field now reads as a category error — and which
already contradicts `01-concepts.md` §3.1, where the model is *"an **input** to `F0`, deliberately not
a function."* KD's own note asking whether the model is the foundation is pointing at this seam. The
stack diagram forces the answer: **model as bedrock, below Ground; Substrate is the harness.**

### What is still contested

Harness *versus* framework, runtime, scaffold and orchestrator is **not** settled. Microsoft says its
Harness *"composes existing Agent Framework building blocks"* — harness ⊂ framework. Parallel says the
inverse. **Anthropic's own engineering post uses "harness," "scaffold" and "orchestration"
interchangeably and offers no definition.** Definition converged; taxonomy did not. See
[`02`](./02-harness-taxonomies.md) §4 for the altitude problem this creates.

### A live design disagreement worth naming

**Thin versus fat.** Garry Tan: *"keep the harness thin… every improvement to the model automatically
improves every skill, while the deterministic layer stays perfectly reliable"* — the *thin harness, fat
skills* stance. Microsoft ships a batteries-included Harness. These are opposite bets on where value
accrues, and our *deterministic control, probabilistic labor* principle takes a side. Worth saying so
explicitly.

---

## 3. `multiplayer` — concurrent **humans**, not concurrent agents

The cleanest free distinction available, and it holds across every source checked.

> *"The phrase 'multiplayer AI' is often used for several models talking to one another, but for
> development teams, the more useful definition is broader: **several people can see the work**."*

| System | Usage |
|---|---|
| **QM** | *"A multiplayer agent harness for work. In Slack and on the web."* Every **employee, room and project** gets its own scope, each with its own memory, files, keychain, permissions, scheduled jobs and durable sandbox |
| **Anthropic Claude Tag** | Explicitly multiplayer — *one shared Claude per channel*, shared with the channel, remembering it over time |
| **SageOx** | *"Multiplayer by default"* — shared Ledger across agents, machines and teammates |
| **Superconductor** | *"Agentic engineering is going multiplayer"* — every agent session shared and addressable |
| **OpenClaw** | The explicit opposite pole: *"It is designed for **a single operator**."* |

**Concurrent agents have different words:** *agent team* (orchestrator-led, the dominant enterprise
pattern) · *swarm* (decentralized; one source argues it is only warranted beyond ~50 concurrent agents;
note **OpenAI archived Swarm** in favour of a supervisor-pattern SDK) · *fleet* (the population noun) ·
*orchestration* (the operational practice).

**Adopt this split.** It is already conventional, it costs nothing, and it removes a real ambiguity in
our own documents — where "multiplayer" currently appears only as QM's self-description.

### The job it names

Superconductor states the team problem better than our own documents do:

> *"For a solo developer, coding agents are a superpower. **For a team, they surface new kinds of
> bottlenecks: coordination, visibility, review, and shared context.**… with no work or context trapped
> on any one developer's machine."*

That is `J11 coordinate humans`, and it is why the harness broadened to the team.

---

*Companion: [`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md) · [`05-standards-layer.md`](./05-standards-layer.md)*
