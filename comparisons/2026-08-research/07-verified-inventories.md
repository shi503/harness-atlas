---
title: "Verified inventories — the object lists, read at source"
tier: reference
project: loomwarp
created: "2026-08-28"
status: DRAFT
owner: KD
---

# Verified inventories

**What this is.** The named object lists this corpus needs, each **read from its primary source**
rather than from our own summary of it. Lists only. The arguments live in the files that cite them.

**Why it exists.** The corpus was audited on 2026-08-27 and the finding was not that it is prose —
`06-frameworks-addendum.md` alone carries 245 table rows. The finding was narrower and worse:

> **It catalogues other people's object models thoroughly and never builds its own, and where it does
> name objects it names them from secondary reads.** Three diagrams in 2,802 lines. No component
> diagram, no interface, no schema, no insertion-point spec.

Two fabrications were caught in the space of one session by going back to source. Both are recorded
in §6, because the method is the point: **a summarizer that reflows a page will invent a plausible
title, and a plausible title is indistinguishable from a real one at citation time.**

**Sourcing marks**, the corpus convention: **✅ direct** — primary source read · **◐ relayed** —
reputable secondary only · **⚠️ unverified** — could not establish.

---

## 1. ⭐ The eight configuration mechanisms ✅ direct

**Galster, Mohsenimofidi, Lulla, Abubakar, Treude, Baltes — *"Harness Engineering for Agentic AI
Coding Tools: An Exploratory Study"*, arXiv:2602.14690.** Submitted 2026-02-16 (v1), last revised
2026-06-30 (v5). cs.SE. <https://arxiv.org/abs/2602.14690>

**This is the only empirically-derived inventory of where configuration attaches to an agent**, across
2,853 GitHub repositories and five tools. Our corpus cited *"eight configuration mechanisms"* and
**never named them.** Read from the raw v5 HTML.

Two definitions the paper sets out, and both are worth adopting:

> A **configuration mechanism** is *"a means for developers to tailor tool and agent behavior to a
> project or workflow."*
> A **configuration artifact** is *"a tangible instance of a mechanism: either a single configuration
> file … or a directory bundling several configuration files that together define one artifact."*

### Table 1, reproduced

| # | Mechanism | Description (verbatim) | Claude Code | Copilot | Codex | Cursor | Gemini |
|---|---|---|---|---|---|---|---|
| 1 | **Context Files** | *"Markdown file loaded into the context each session."* | `CLAUDE.md` | `.github/copilot-instructions.md`, `.github/instructions/*.md` ᵃ | `AGENTS.md`, `AGENTS.override.md` | `AGENTS.md`, `.cursorrules` ᶜ | `GEMINI.md` |
| 2 | **Settings** | *"JSON/TOML config for project-level tool behavior."* | `.claude/settings(.local)?.json` | – ᵇ | `.codex/config.toml` | `.cursor/cli.json` | `.gemini/settings.json`, `config.yaml` |
| 3 | **Skills** | *"Reusable knowledge and invocable workflows."* | `.claude/skills/` | `.github/skills/` | `.codex/skills/` | `.cursor/skills/` | `.gemini/skills/` |
| 4 | **Subagents** | *"Specialized agents that operate in parallel to the central agent loop, in their own context."* | `.claude/agents/` | `.github/agents/` | – | `.cursor/agents/` | – |
| 5 | **Commands** | *"User-triggered shortcuts for predefined prompts."* | `.claude/commands/` | – | – | `.cursor/commands/` | `.gemini/commands/` |
| 6 | **Hooks** | *"Scripts executed at specific agent lifecycle points."* | `.claude/settings.json` | `.github/hooks/*.json` | – | `.cursor/hooks.json` | `.gemini/settings.json` |
| 7 | **Rules** | *"System-level instructions to control agent behavior."* | – | – | `.codex/rules/` | `.cursor/rules/` | – |
| 8 | **MCP** | *"External tool or data connections via the Model Context Protocol."* | `.mcp.json` | – ᵇ | `.codex/config.toml` | `.cursor/mcp.json` | `.gemini/settings.json` |

ᵃ *"Copilot also supports CLAUDE.md, AGENTS.md, and GEMINI.md."*
ᵇ *"Configured via the GitHub web UI, not via files in the project repository."*
ᶜ *"Cursor deprecated .cursorrules and now suggests using AGENTS.md instead."*

> **RQ1, verbatim:** *"We identified eight configuration mechanisms spanning from static context (e.g.,
> Context Files) to executable and external integrations (e.g., Skills, MCP). Two mechanisms (Context
> Files and Skills) are supported by all five tools. … Despite this convergence, **no single tool
> implements all eight mechanisms.**"*

### Adoption, as published

| Mechanism | Adoption |
|---|---|
| **Context Files** | **4,768 files across 2,586 of 2,853 repos (90.6%)**; *"61.5 to 100% of repositories across all tools"* |
| **Skills** | **601 Skills in 158 repos.** Mean 3.8/repo, median 2, max 28. Only 29 (4.8%) exceed the 500-line `SKILL.md` guidance |
| **Subagents** | **450 across 131 repos.** Mean 3.44, median 2, max 17 |
| **Rules** | 72.8% of *Cursor* repos |
| **Settings** | 62.3% of *Gemini* repos |
| everything else | *"No other mechanism exceeds 20% adoption for Claude, Copilot, Cursor, or Gemini."* |

**Context-file types** (of 4,768): `CLAUDE.md` 1,640 (34.4%) · `AGENTS.md` 1,508 (31.6%) ·
`copilot-instructions.md` 1,393 (29.2%) · `GEMINI.md` 154 (3.2%) · `.cursorrules` 73 (1.5%).

**Repos per tool** (n=2,853, multi-tool overlaps): Claude Code 1,297 · Copilot 957 · **AGENTS.md-only
493** · Cursor 327 · Gemini 175 · **Codex 4**. 70.6% single-tool; 17.3% AGENTS.md-only.

**Skill resource directories:** `scripts/` (executable) · `references/` (read on demand) · `assets/`
(static). **514 of 601 (85.5%) have none** — *"Skills predominantly rely on static instructions rather
than executable scripts."*

### The sharpest architectural claim in the paper

> Subagents *"operate in parallel to the central agent loop, in their own context"* and **return
> results to the parent agent, whereas Skills execute within the calling agent's context.**

That single sentence is the clearest published statement of the Skills-vs-Subagents boundary, and it
is a **context-isolation** distinction, not a capability one.

And the headline, which is a direct challenge to how this corpus frames its own subject:

> *"**Harness engineering in open source today is therefore mostly context engineering.**"*

### ⚠️ What the paper does NOT contain

- **No per-mechanism frequency table.** Per-mechanism adoption is Figure 3, a heatmap image. The
  figures above are the only counts stated in prose. **Commands, Hooks and MCP have no standalone
  absolute counts anywhere. Do not supply them.**
- **No agent-loop diagram and no insertion-point taxonomy.** If anything in this corpus attributes one
  to this paper, that attribution is wrong. Hooks are *"scripts executed at specific agent lifecycle
  points"* — **the lifecycle points are never enumerated.**
- ⚠️ **2,926 vs 2,853.** v1 says 2,926; v2–v5 say 2,853, after two cleanup steps. **Cite v5.**
- ⚠️ Claude Code is described as *not* natively supporting `AGENTS.md` as of the Feb 2026 snapshot — a
  point-in-time claim that may have aged.

---

## 2. Gas City — six primitives, and the machinery beneath them ✅ direct

`docs.gascity.com/getting-started/how-gas-city-works`. Page subtitle: *"the six primitives that
compose into that orchestration."*

| Primitive | Role | Is | Key idea |
|---|---|---|---|
| **Agent** | **WHO** | *"a configured worker — name, provider, prompt template, scope"* | *"pure configuration, so define as many as you like; the platform assumes none exists"* |
| **Bead** | **WHAT** | *"one unit of work — ID, title, status, type"* | *"the universal substrate: tasks, mail, sessions, convoys are all beads differing only by `type`"* |
| **Formula** | **HOW** | *"a reusable, written-down method applied over work"* | *"applying it **produces** work: a formula materializes as beads that outlive the file and any session"* |
| **Rig** | **WHERE** | *"an external project (usually a git repo) registered with the city"* | *"each rig gets its own bead namespace and agent scope"* |
| **Pack** | **CONFIGURES** | *"the unit of configuration — declares agents, formulas, orders"* | *"the City **is** a pack: the one rooted at this deployment"* |
| **Event** | **OBSERVE** | *"an outbound notification fired by activity"* | *"**fired, not polled**; humans and agents both watch the stream"* |

### The distinction worth stealing outright: primitives vs machinery

The page **never defines "primitive" abstractly.** It defines it *by contrast*:

> *"Three pieces of role-agnostic plumbing run the primitives, and you configure no role around any of
> them… **None of this machinery knows what your agents do. It's the substrate the six primitives sit
> on.**"*

| Machinery | What it does |
|---|---|
| **Orchestrator** | *"runs formulas, drives each bead graph forward, and reconciles live agents against what your config declares"* |
| **Bead store** | *"durable work — every unit of work is a bead that survives an agent crash, so the orchestrator always has ground truth to resume from"* |
| **Event bus** | *"fires activity outward so humans and agents can watch what's happening"* |

> **A primitive is a thing you configure. Machinery is a thing that runs.**

We have never drawn that line, and it is exactly the line between our gradeable functions and
`router.py` / `dispatch.py`. And the reason the vocabulary exists at all:

> *"What makes it a **platform** and not one fixed orchestrator: the orchestrator hardcodes **zero
> roles** — no built-in 'manager' or 'reviewer.' Every role is configuration supplied through a
> **Pack**… so the same engine becomes Gas Town, Ralph, or whatever you configure."*

### Their documentation pattern, reverse-engineered

Every one of the six entries follows it **exactly**, and the uniformity is the point — no entry is a
stub, none sprawls:

```
### <Primitive>
A **<name>** is *<question word>* … — <one-line definition>.     ← always this shape
<3–5 sentences introducing sub-concepts, each **bolded** on first use>
<inline code for concrete handles: `gc sling`, `pack.toml`, `bead.created`>
<final sentence is a durability / consequence claim, never a feature>
                                              90–130 words. No code block. No sub-diagram.
```

Two further moves: the deep-dive guide **re-opens with the same one-line definition verbatim** rather
than rewording it — drift prevented socially rather than mechanically; and **the diagram's alt text is
a full sentence of documentation**, so the page reads correctly with images off.

---

## 3. The six-questions binding ◐ relayed

**Gene Conroy-Jones, *"Building Production Grade Applications using Agent Orchestration"*,
foursignals.dev, 2026-07-31.** A practitioner case study, and partly a marketing surface for the
author's fractional-CTO practice — a strong existence proof, not an independent survey.

Same six primitives as §2, independently arrived at, and the framing is the contribution:

> *"**Six primitives, and every orchestrator has to answer the same six questions.**"*
> *"Three of those six are where tools actually differ."*

The three where tools differ — **Bead, Formula, Event**:

> *"Most have a task list, few have a durable work graph. Most have prompts, few have a workflow
> definition you can diff in a pull request. **Almost none fire events you can audit afterwards.**"*

And the layer argument:

> *"Those five are frameworks for building agent **applications**… Almost none of them orchestrate
> coding agents against your own repository, **which is a different problem with different
> primitives**."*

**Method note worth carrying:** neither source defines *primitive* abstractly. Both define the **set**
by binding each member to an unavoidable question. That is a better construction than a definition —
it makes the set falsifiable, because a seventh question would mean a seventh primitive.

⚠️ The post's `Why It Matters` / `Key Takeaways` / `Insight` sections came back paraphrased, not
verbatim. Do not quote those three without a re-fetch.

---

## 4. Meng et al. — `H = (E, T, C, S, L, V)` ✅ direct, and confirmed

`github.com/Gloriaameng/Awesome-Agent-Harness`. CC-BY-4.0. Paper: *"Agent Harness for Large Language
Model Agents: A Survey"*, Preprints DOI `10.20944/preprints202604.0428.v3`.

**Our corpus recorded this correctly.** The tuple notation is real:

> *"We introduce a formal definition of the agent execution harness as a six-component tuple:
> H = (E, T, C, S, L, V)"* … *"elevating it from implicit infrastructure to an explicit research
> target."*

| Component | Symbol | Role (verbatim) |
|---|---|---|
| Execution Loop | **E** | Observe-think-act cycle, termination conditions, error recovery |
| Tool Registry | **T** | Typed tool catalog, routing, monitoring, schema validation |
| Context Manager | **C** | What enters the context window, compaction, retrieval |
| State Store | **S** | Persistence across turns/sessions, crash recovery |
| Lifecycle Hooks | **L** | Auth, logging, policy enforcement, instrumentation |
| Evaluation Interface | **V** | Action trajectories, intermediate states, success signals |

The published column header is **"Role"**, not "definition" — there is no longer per-component
definition prose, and **no sub-categories.** The second axis is by *system category*, not by
component subdivision.

**Harness Completeness Matrix** — `✓ full · ≈ partial · ✗ absent`, **24 systems** (our corpus said 23):
Full-Stack (4): Claude Code, OpenClaw/PRISM, AIOS, OpenHands · Multi-Agent (6): MetaGPT, AutoGen,
ChatDev, CAMEL, DeerFlow, DeepAgents · General Frameworks (3): LangChain, LangGraph, LlamaIndex ·
Specialized (2): SWE-agent, agent-qa · Capability Modules (5): MemGPT, Voyager, Reflexion, Generative
Agents, Concordia · Evaluation Infra (4): HAL, AgentBench, OSWorld, BrowserGym.
**Only OpenClaw / PRISM scores ✓ on all six.**

⚠️ Last-commit date could not be verified; the README's *"v4 (2026-04-14)"* is a citation date.

---

## 5. AAIF — see the correction, not this file

The five names in AAIF's `Harness` scopeNote are **not five taxonomy terms**, and this corpus
presented them as one. The full correction, with the three-field deferral and the source's internal
contradiction, is at
[`02-harness-taxonomies.md`](./02-harness-taxonomies.md) §1.

---

## 6. The method, and the two fabrications it caught

Both were produced the same way — **a summarizing fetch reflowing a page and filling a gap** — and
both were caught only by pulling raw source. `99-source-hygiene.md` already records two fabrications
circulating *in the field*. These two were **ours**.

| # | The fabrication | How it was caught |
|---|---|---|
| **1** | **AAIF's "five harness functions" presented as five taxonomy terms with scopeNotes of their own.** No such records exist; each was checked individually | Fetching `taxonomy/taxonomy-data.js` and grepping for each term |
| **2** | **A title that does not exist.** A summarizing fetch of arXiv:2602.14690**v1** returned *"Configuring Agentic AI Coding Tools: An Exploratory Study."* The real title is *"**Harness Engineering** for Agentic AI Coding Tools: An Exploratory Study"* | Pulling the raw v5 HTML via `curl` rather than the summarizer |

**The rule this justifies, and it costs almost nothing:** anything that becomes a canonical list gets
fetched from primary source, and every item carries its URL and a ✅/◐/⚠️ mark. A relayed count is
usually fine. **A relayed *name* is not** — names are what get quoted, and a wrong one propagates
silently because it reads exactly like a right one.

⚠️ **Verbatim-fidelity caveat on everything above.** WebFetch's extraction reflows text; two fetches
of the same AAIF record returned identical prose with different line-wrapping. Wording is reliable;
exact whitespace is not. **For byte-exact quotation in a published document, clone and read locally.**

---

## 7. What these change

| Finding | Consequence |
|---|---|
| **The eight mechanisms** | The empirical answer to *where does configuration attach* — the mechanism layer beneath our functions. `F0`/`F1`'s adapter story should be written against these eight, not invented |
| **Primitives vs machinery** | A line we have never drawn. Our gradeable functions are primitives; `router.py` and `dispatch.py` are machinery. Grading machinery as though it were configurable is a category error waiting to happen |
| **The six-questions binding** | A construction, not a definition — and it makes a primitive set falsifiable |
| **Skills execute in the caller's context; Subagents do not** | A context-isolation boundary, published and empirical. Directly relevant to `F3`'s `isolate` verb |
| **85.5% of Skills ship no executable resource** | *"Static instructions rather than executable scripts."* Any claim that skills are a capability-distribution mechanism must reckon with this |
| ⚠️ *"Harness engineering… is mostly context engineering"* | The strongest published challenge to this framework's altitude claim. It deserves an answer in `08-not-claimed`, not a rebuttal in passing |

---

*Sources are linked inline. The arguments that use these lists live in*
[`02-harness-taxonomies.md`](./02-harness-taxonomies.md) *,*
[`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md) *and*
[`06-frameworks-addendum.md`](./06-frameworks-addendum.md)*.*
