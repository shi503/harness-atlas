---
title: "Comparisons — the agent harness landscape"
updated: "2026-08-26"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# The agent harness landscape

**What this is.** The framework for understanding what an agent harness is, and a concept-first
comparison of the systems LoomWarp competes with, learns from, or is confused with. It exists because
the category we position inside had never been defined here.

**Why it lives in `references/` rather than `specs/v0/`.** The landscape outlives any one spec
version and moves on its own cadence. Two of the six systems here changed materially within the last quarter. Like [`../elements.md`](../archive/elements.md), this is durable reference material.

**Status.** DRAFT, compiled 2026-08-11. Every capability claim carries a source and an access date. Inferred ratings are marked as inferred.

---

## Reading order

| # | Document | What it settles |
|---|---|---|
| 01 | [`01-concepts.md`](./01-concepts.md) | **Start here.** The vocabulary — fifteen concepts defined, the harness/process-layer distinction, and the crosswalk of what each system calls what |
| 02 | [`02-component-matrix.md`](./02-component-matrix.md) | The same systems by component. Two rows carry the whole competitive picture |
| 03 | [`03-jtbd.md`](./03-jtbd.md) | What each system says it is *for*, and where the jobs converge |
| — | [`systems/`](./systems) | Per-system teardowns |
| — | [`systems/kd-built-frameworks/`](./systems/kd-built-frameworks) | **Prior art.** The predecessor system, its transfer manifest, 22 staged ADRs, and a go/no-go enrichment plan |
| — | [`2026-08-research/`](./2026-08-research) | **The re-check, 2026-08-25.** What the 2026 practitioner community actually calls things, measured against a committed 562-session corpus — and the five claims in this corpus it corrects |

Read **01** alone if you want the concepts. Read **01 → 02 → 03** for the argument. The teardowns are reference, not narrative.

> **§1 was rewritten 2026-08-26** after measurement overturned the category name — see §1.1. Sections
> 2 onward still carry claims from the 2026-08-11 compilation; the corrections that apply to them are
> listed at [`2026-08-research/00-README.md`](./2026-08-research/00-README.md) §1, and the standards-layer
> and provenance findings have been folded in where they appear.

---

## 1. The category, and what to call it

### 1.1 Not "agentOS" — the term is not practitioner vocabulary

> **Rewritten 2026-08-26.** This section previously proposed *agentOS* as the category name, gave it
> four senses, and claimed the fourth for the systems here. **Measurement overturned it.**

**`agentOS` appears zero times across the 562 sessions of the AI Engineer World's Fair 2026** — the
field's flagship venue — and so do `agent ops`, `AIOps` and `LLMOps`. The community did not go the
XOps route. Verified twice: against the committed corpus at
[`2026-08-research/data/`](./2026-08-research/data), and directly against
[ai.engineer/worldsfair/2026](https://www.ai.engineer/worldsfair/2026).

There are now **six** live senses, not four, and they are diverging rather than converging:

| Sense | Who |
|---|---|
| Vertical banking platform | Fiserv agentOS, May 2026 |
| Hosting runtime for agents you build | Agno AgentOS — FastAPI, sessions, RBAC |
| OS-abstraction research | AIOS — LLM-as-kernel |
| Vertical CX platform | Infobip AgentOS |
| Vertical legal platform | Legora aOS |
| Consumer OS framing | Microsoft, *"Windows as an agentic OS"* — which drew severe public backlash |

**And the sense this document claimed was misattributed.** It named Indigo HQ and SageOx as using the
term for a team context layer. **Neither does.** SageOx says *"the hivemind for human–agent teams"* and
calls the category *"agentic context infrastructure."* Indigo says *"the AI Operating System for
**companies**"* — human-worker framing, never "agentOS." YC's QM says *"harness."*

**The builders in exactly this category all declined the word.** That revealed preference matters more
than any count.

### 1.2 The word that won is *harness* — and it spans two altitudes

In roughly eight months: a Wikipedia article, entry into survey literature, an empirical study of
2,853 repos, an **AAIF taxonomy definition** (2026-08-19), and a **shipped Microsoft API namespace**
(`HarnessAgent`, GA August 2026). In the corpus: **113 occurrences**, a track, and a Main Stage
keynote track.

The canonical formula, from Trivedy (LangChain, 2026-03-10):

> **`Agent = Model + Harness`** — a harness is *"every piece of code, configuration, and execution
> logic that isn't the model itself."*

**But one word now names two different layers.** QM self-describes as *"a multiplayer agent harness"*
and its agent loop **runs Pi, OpenCode and Claude Code** — themselves harnesses. Weng nests loop
engineering, context engineering *and* evals **inside** harness engineering. Microsoft says its Harness
*"composes existing Agent Framework building blocks"*; Parallel says the reverse. **AAIF's taxonomy
file leaves the `broaderTerm` field — the one that would record which contains which — unfilled.**

### 1.3 What we call ourselves: a **process layer**

> A **process layer** is a package of workflow, standards and capability installed into one or more
> harnesses. It does not run the agent loop; it shapes what the loop does.

**The tell is that every system in this category ships an adapter**, and you do not write an adapter
for the thing you are: gstack has `--host`, QM has per-user and per-room adapters, Gas City has the
Factory Worker Protocol, Indigo has the `AGENTS.md`↔`CLAUDE.md` symlink.

This is **the one term in this repository we invent rather than adopt**, and it is offered as a
proposed resolution to the altitude collision above — with the evidence attached — not as house
vocabulary. Everywhere else, [the field's word comes first and is attributed on first
use](./2026-08-research/01-worldsfair-2026-vocabulary.md).

### 1.4 The inclusion test

Three questions; a system needs all three to be a peer rather than an adjacent tool:

1. **Does it persist across sessions?** If state dies with the process, it is a harness feature.
2. **Does it serve more than one person?** If it only configures one developer's setup, it is dotfiles.
3. **Does it bind mechanically?** If every rule is advisory prose the model may ignore, it is a style
   guide.

Applying it: Claude Code fails (2) *as a layer* — it is the harness underneath. Mem0 fails (3). Ruler
fails (1) and (3). gstack, Gas City, QM, Indigo HQ, SageOx and LoomWarp all pass.

**And so does the test cut against us.** [`systems/kd-built-frameworks/`](./systems/kd-built-frameworks)
runs it on the author's own prior system and it **fails question 3** — no settings file, no hooks,
every guardrail prose. LoomWarp currently fails the same question for the same reason.

---

## 2. The four-layer stack

Adapted from the Indigo landscape analysis, which is the clearest published version of this picture.

```
┌──────────────────────────────────────────────────────────────┐
│ 4 · CONCEPTUAL FRAMING                                       │
│     Karpathy — LLM OS · Software 3.0 · LLM Wiki (Apr 2026)   │
│     Tan — model + context + harness · custody & compounding  │
├──────────────────────────────────────────────────────────────┤
│ 3 · PROCESS LAYERS  ← where LoomWarp lives                   │
│     gstack/gbrain · Gas City · QM · Indigo HQ · SageOx       │
│     FRACTAL · LoomWarp                                       │
├──────────────────────────────────────────────────────────────┤
│ 2 · OPEN STANDARDS AND CAPABILITIES                          |
|     Agentic AI Foundation, Linux Foundation                  │
│     MCP · AGENTS.md · Agent Skills/SKILL.md · goose · A2A    │
├──────────────────────────────────────────────────────────────┤
│ 1 · HARNESSES                                                │
│     Claude Code · Codex · Cursor · OpenClaw · Hermes · goose │
└──────────────────────────────────────────────────────────────┘
```

**Layer 2 changed the economics and `specs/v0/` does not mention it.** The Agentic AI Foundation formed under the Linux Foundation in December 2025, stewarding MCP (110M+ monthly downloads *as of April 2026 — dated*), AGENTS.md and goose. **As of 2026-08-13 it has 247 members and five hosted projects**, A2A having joined on 2026-08-19. The consequence: *the formats are commoditized.* Nobody wins by owning a file format anymore. The competition moved up-stack to sync, governance, secrets, memory, and the capture loop — which is a direct argument about where `F0`'s portability posture should land. Riding the standards is now cheap.

---

## 3. What got what treatment

| Treatment | Systems | Why |
|---|---|---|
| **Full teardown** | [gstack/gbrain](./systems/gstack-gbrain.md) · [Gas City](./systems/gas-city.md) · [Indigo HQ](./systems/indigo-hq.md) · [SageOx](./systems/sageox.md) · [LoomWarp](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) | Direct peers with primary sources available |
| **Full teardown — context providers** | [`systems/context-providers/`](./systems/context-providers) — 5 teardowns + a 25-row provider matrix | Components inside **one function** (`F3`), scored against one contract. A different axis from the columns of this corpus: those are process layers, these are what plugs into a function |
| **Full teardown — prior art** | [generic-cerebro](./systems/kd-built-frameworks) — 9 documents + 22 ADR seeds + an enrichment plan | Not a peer: no licence, no releases, one operator. It is the system LoomWarp descends from, with primary sources fully available, and it holds mechanisms four of the notes below were already asking about |
| **Full teardown — harnesses** (added 2026-09-02) | [`systems/harnesses/`](../harnesses) — Hermes · Pi · OpenClaw · OpenCode · Grok Bot / Grok Build, each against all 33 v1 components · synthesis at [`04-harness-alignment.md`](./04-harness-alignment.md) | Not peers — they run the loop. Read because v1's upper-layer markers need peer citations, and because two of them (OpenClaw, Hermes) **host other harnesses**, which breaks §1.3's adapter tell and §1.4's test. `04` §4.1 proposes a third altitude |
| **By reference** | [Claude Code](./systems/claude-code.md) · [QM](./systems/qm.md) · [FRACTAL](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/fractal.md) | Deep analysis already exists in this repo; these link rather than duplicate |
| **Short profile** | Harnesses, other "agentOS" senses, adjacent categories, the standards layer | [`systems/90-short-profiles.md`](./systems/90-short-profiles.md) |

LoomWarp gets the identical template to the competitors, including the credibility check. A
comparison corpus where only the author's system escapes scrutiny is marketing.

---

## 4. Findings

### F-1 · We had a category error, and it is in `F0`

gstack, LoomWarp, FRACTAL, Indigo HQ and QM are **not harnesses**. They are process layers installed into harnesses — which is exactly why each ships an adapter. `F0 Substrate` currently bundles *which runtime* and *what keeps our work portable* into one function; those are decisions at two layers, made by different people, with different reversal costs. Detail: [`01-concepts.md`](./01-concepts.md) §2.

### F-2 · Four concepts have no home in the function model

| Concept | Who treats it as first-class | v0 |
|---|---|---|
| **Individual vs. team memory** | gbrain (*brain × source*), QM (*scope*), Indigo (`core`/`personal`), SageOx | `F3` does not distinguish them |
| **Communication** | QM (*rooms*), SageOx (Ox Dot/Console) | No function |
| **Human-in-the-loop placement** | QM, Indigo, Gas City — three independent three-level postures | Folded inside `F6` as *what is allowed* |
| **Rituals** | gstack (the sprint loop), Indigo (Ralph loop), FRACTAL (HANDOFF), QM (review doctrine) | No function — **and it passes v0's own two-question test** |

Each is a first-class primitive in at least two peer systems — the same corroboration standard that promoted Substrate and Surfaces in the first place. Full scorecard:
[`01-concepts.md`](./01-concepts.md) §5.

**They may collapse to one.** [`01-concepts.md`](./01-concepts.md) §3.15 argues that communication,
human-in-the-loop placement and the human half of the capture loop are *instances* of ritual — a peer review is an approval placement, a standup is a channel, a retro is where learning happens for people. If that holds, the model needs one new function rather than three. Testing it is the first job of the function-model pass.

**And rituals answers the open note at `01-problem.md:52`** — that AI workflows now encompass the whole work process and we have not built infrastructure for agents to participate in all of it. Only one phase, coding, has been encoded. Rituals name the phases the agent has not been admitted to.

### F-2b · Stewardship is conflated with decision rights

Who *maintains* the system is not who *decides* it, and `04-decision-layers.md` §3 only records the second. The landscape actively disagrees about the first: Tan wants a named **librarian**, SageOx bets $15M that manual curation *is* the failure mode, Indigo lets the vendor replace `core/` wholesale, and LoomWarp, Gas City and FRACTAL have nobody.

The sharper question is **agent or gate.**

> ⚠️ **Corrected 2026-08-26.** This finding previously answered *gate*, on the grounds that `resolve-context-bundle.cjs` already enforced version, hash and expiry. **No such file exists in this repo and none ever has** — verified against full git history. Nothing enforces context freshness today, so `STRATEGIST` §2.6's test was never actually run against a real gate. **`OPEN-9` is reopened.** The prior art's answer — an agent over an optimistic tier, a gate over a locked one, split at the promotion event — is better than the one this section gave.

Two things worth recording: **QM is named Quartermaster** — the nearest peer is named after a
stewardship role, and this corpus catalogued the product without reading its name. And the split maps onto the loom: **doer agents weave the weft; steward agents maintain the warp** — the second place the metaphor earns its keep.
> i agree with Tan and I believe that our generic-cerebro has a librarian.  ask `generic-cerebro` → `.claude/agents/cerebro-cto-architect.md` and see if it can find it or search in its `wiki/` to see if we can find the librarian and how it's supposed to be processed and managed. at a low level we would probably have these as automations that run cleanup and promote to decision log. 

**Answered 2026-08-11 — and it is a third kind of answer.** The librarian there is neither a person nor a bot: it is an **editorial tier declared in frontmatter**, carrying its own concurrency model. Capture is optimistic (anyone writes, git merges); change-managed decisions are pessimistic (locks plus a conflict audit, owners only) — two models over one corpus, selected by what the content *is*. That sidesteps the person-or-bot dichotomy the other two answers in this row are stuck in. The automation half exists as speculated — a nightly job doing inbox ingestion and a lint pass — and its own filename ends `.LOCAL-ONLY.sh`, because hosted scheduling could not reach local tooling. So: the tier is real, the promotion ceremony is real, and the automation runs on one laptop. Full mechanism at [`systems/kd-built-frameworks/05-context-and-the-librarian.md`](./systems/kd-built-frameworks/05-context-and-the-librarian.md).
### F-3 · A fourth concept has no name in either direction — **resolved 2026-08-26**

**Process layer** — the category LoomWarp occupies. Every peer has a phrase for what it is: *software
factory*, *multiplayer org harness*, *shared context layer*. We described ourselves by our
differentiator rather than by our category, which made positioning harder than it needed to be.

**Now named in §1.3, and the gap turned out to be the field's rather than only ours.** *Harness* spans
two altitudes — QM is "a harness" that runs three other harnesses — and AAIF's own taxonomy leaves the
containment field unfilled. `plan.md` carries the new category line.

### F-4 · Our headline claim narrowed, and the corpus says so plainly

`specs/v0/02-elements.md` calls the Briefing *"LoomWarp only — does not exist yet."* SageOx's
`ox agent prime` ships context assembly from team memory into every session, across a dozen
harnesses, MIT, funded at $15M in May 2026. Half that claim is now false.

The defensible statement is smaller and sharper:

> Context assembly is shipping and well funded. Context **provenance** — a hashed, versioned,
> owner-attributed manifest of what an agent saw, reconstructable after the fact and joined to that
> work's outcome — is still unclaimed by everyone in this corpus.

That narrower claim is corroborated four times independently: Garry Tan (*"a brain nobody curates is a garbage dump with great search"* — provenance tracking, contradiction checks, a librarian), the prior AI-native rubric's self-grade, our own Claude Code gap analysis, and the Indigo analysis's whitespace #4 — *"no one can answer 'what context did the agent see, from which source, when, and who approved it.'"*

> **Narrowed again, 2026-08-26 — and the second narrowing is the important one.** The claim above says
> provenance is *"unclaimed by everyone."* It is no longer unclaimed as an **idea**. Vinoth Govindarajan
> (OpenAI), *"Your Agent Didn't Fail. Your Harness Did"*:
>
> > *"A model proposes, the harness commits, and **the receipt proves it**."* — a **run receipt** audit:
> > *"what woke it up, which state did it inherit, what authority did it use, what executed, and what
> > evidence survived."*
>
> That is `F3`'s Briefing plus `F7`'s Verdict, named on a conference stage, more crisply than this
> corpus names it. **No shipped implementation was demonstrated**, so the ground is not taken — but
> *"nobody is claiming this"* is false, and a claim of that shape should not be made again without a
> date on it.
>
> **What survives is measurable.** Across the 562-session corpus: `trace` 65 · `audit` 39 ·
> `evidence` 22 · `attribut` 14 — against **`provenance` 9 · `receipt` 4**. The field is thoroughly
> engaged with *observing runs*. The **join** between what an agent saw and what came of it is what
> stays scarce. **The narrow claim survives a test the broad one would have failed** — which is the
> argument for having narrowed it in the first place, and for narrowing it again now.

### F-5 · Two assets we already have, and do not lead with

The component matrix has one row where LoomWarp stands alone with a `●`: **the standards tier**. Zero of seven peers ship *what good looks like* as a versioned, owned, inherited artifact — and ours exists today at ~970 lines with a real inheritance contract.

The second is **the maturity diagnostic**. None of gstack, Gas City, QM, Indigo or SageOx grades you or tells you what to skip. It costs an adopter nothing to try, which makes it a better wedge than provenance — which is unbuilt and now contested.

Both are shipped. Both sit behind a claim that is neither.

> **Open, with evidence gathered (2026-08-26).** The *"costs an adopter nothing to try"* half of this
> wedge no longer holds: [`kodustech/agent-readiness`](https://github.com/kodustech/agent-readiness) is
> an MIT-licensed, `npx`-runnable readiness diagnostic — 7 pillars, 39 checks, per-pillar and overall
> scores, and a CI gate. It is early (**99 stars**) and it grades **a repository**, so it does not reach
> our altitude — but the free-to-try argument is now somebody else's too. **The decision on what
> replaces it is deliberately not made here.** The evidence to make it from, including Microsoft's
> separate e-book also called *Agent Readiness* and the four-way collision on that name, is in
> [`2026-08-research/06-frameworks-addendum.md`](./2026-08-research/06-frameworks-addendum.md) §7B.

> KD Note: sure, we're going to highlight these as parts of the evaluation framework. 

**Correction (2026-08-11): the standards-tier half of F-5 is inherited, not novel.** `generic-cerebro` shipped the tier first — 849 lines across six guides, behind the identical *reference never copy* / *tighten never contradict* contract — **plus a compounding half LoomWarp does not have**, where review finding-classes accumulate and promote into canon. The defensible claim narrows to: among process layers *a stranger can adopt*, LoomWarp is still the only entry, because the predecessor has no licence, no releases and one operator. The maturity-diagnostic half of F-5 is likewise descended from that repository's 18-row rubric. Neither correction weakens the wedge; both change who may be credited with it. See [`systems/kd-built-frameworks/06-capability-and-standards.md`](./systems/kd-built-frameworks/06-capability-and-standards.md) §5 and [`systems/kd-built-frameworks/07-transfer-manifest.md`](./systems/kd-built-frameworks/07-transfer-manifest.md) §4.

### F-6 · We would currently fail our own drift audit

[`../elements.md`](../archive/elements.md) describes **seven** functions and publishes a seven-row self-grade.
`specs/v0/02-elements.md` describes **nine**. Nothing mechanical reconciles them. The v0 README's "supersedes the framing of" note is prose, not a check.

This is the exact symptom that flagged Indigo's marketing-versus-code drift — inconsistent counts across surfaces — and it is `STRATEGIST-loomwarp.md` FM-3 occurring in our own repository while a document arguing for mechanical enforcement is being written. It should be closed by a conformance test, not by an edit.

> KD Note: as we refine, this is something that we'll address.  first we need to nail down the structure, and then we can audit. 

---

## 5. What is worth stealing

Consolidated from the teardowns, highest value first.

| # | Pattern | From | For |
|---|---|---|---|
| 1 | **`brain × source`** — personal/team database × git repo inside it | gbrain | `F3` — closes the largest vocabulary gap |
| 2 | **Automatic capture** via session/prompt/tool/compaction hooks | SageOx | `F8` — our loop is manual |
| 3 | **Thin harness, fat skills** decision rule | gbrain | `standards/` — a test our principle lacks |
| 4 | **`prime` as a verb** | SageOx | `F3` — "the Briefing" is a noun nobody can act on |
| 5 | **`core/` vs `personal/` overlay**, skip-on-collision | Indigo | `F3`/`F5` |
| 6 | **Beads** — work units as JSON in git beside the code | Gas City | `F1`/`F4` — and consistent with our own SoT argument |
| 7 | **Three-level posture**, named | QM · Indigo · Gas City | `F6` — human-in-the-loop placement |
| 8 | **The artifact chain** between skills | gstack | `F4` — distinct from a dependency graph |
| 9 | **Documentation drift as a CI failure** | QM | FM-3 — and F-6 above is the case for it |
| 10 | **The stated-limitation register** | QM · SageOx · Anthropic | Everything |

Ten more from the prior-art teardown, ranked and sequenced in [`systems/kd-built-frameworks/ENRICHMENT-PLAN.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md). The four that would land soonest:

| # | Pattern | From | For |
|---|---|---|---|
| 11 | **The composition contract** — read/write manifest, runnable gate, session protocol, and the rule that a worker starts with nothing else | generic-cerebro | `F3` — what agent teams do *not* give you |
| 12 | **The routing question** — *would another teammate's agent need this to be correct?* decides memory vs. knowledge vs. decision | generic-cerebro | `F2`/`F7` — fills our parenthesised individual-memory cell |
| 13 | **Compounding finding-classes that promote into standards** | generic-cerebro | `F7` — the missing half of F-5's own row |
| 14 | **Librarian as a content tier**, with optimistic concurrency for capture and pessimistic for decisions | generic-cerebro | Stewardship — the answer F-2b was asking for |
> KD Note: This is great: 
> "Provenance feature" - yes, this is generally great and works. 
>   1. brain x source. this is exactly where we were at with our generic-cerebro where we started to build in the llm-wiki-langgraph (https://github.com/varunyn/wiki-langGraph) and `generic-cerebro` → `tools/decision-ledger`
>    5. curious about beads, but for now lets keep decision-ledger as our own, but beads is an obvious corollary
>
> **Answered 2026-08-27** — [`systems/context-providers/04-beads-and-gas-city.md`](./systems/context-providers/04-beads-and-gas-city.md).
> The corollary is now specific: **beads is to `F1` what the decision-ledger is to `F3`** — a git-native,
> diffable, co-located artifact store — **and neither emits a per-run manifest.** Gas City's own
> *what it does not claim* line names *context provenance*, which makes beads the **negative control**:
> the git-native argument was made, by the same author, for a neighbouring object, and never transferred. 
>    10 - yes, stated limitation register is great.  

---

## 6. Re-check schedule

This corpus has a shelf life. Two claims are contested and one source set is already stale.

| What | Why | By |
|---|---|---|
| **The provenance claim** | Dies if SageOx adds version pinning and per-run manifest reconstruction, or if Anthropic ships team context sync, or if a memory interop standard lands under AAIF. All three are predicted within 12–18 months of June 2026 | **2026-12-01** |
| **Indigo figures** | Sourced from a 2026-06-04 analysis; two months stale at time of writing | Before any external citation |
| **The standards layer** | ~~AGENTS.md v1.0, MCP v2 and the A2A governance spec are all on the AAIF roadmap~~ — **overtaken 2026-08-26.** AGENTS.md v1.0 is current, A2A has landed, and **there is no MCP v2**: the spec is date-versioned and 2026-07-28 made it stateless. See [`2026-08-research/05-standards-layer.md`](./2026-08-research/05-standards-layer.md) | ~~2026-12-01~~ **done** |
| **The component matrix** | Five cells are marked inferred rather than verified — [`02-component-matrix.md`](./02-component-matrix.md) §5 | Opportunistically |

---

## 7. What this corpus deliberately did not do

- **No changes to the function model.** Findings F-1 through F-3 have obvious consequences for `F0`,  `F1`, `F3` and `F6`. Acting on them is the next pass, per the scope discipline in
  `fractal/STRATEGIST-loomwarp.md` §4.
- **No rewrite of `01-problem.md`.** It has better inputs now — the process-layer category, the three  uncovered concepts, and a set of candidates the two-question test was never run against.
- **No resolution of `OPEN-1/2/3`.** `01-concepts.md` §5 makes them easier to settle and does not  settle them.
- **No code renames.** This is documentation vocabulary only, per `STRATEGIST` §4.

---

*Companion: [`../elements.md`](../archive/elements.md) — the functions and the Grid ·
[`../claude-code/`](../harnesses/claude-code) — the harness we run on ·
[`../../specs/archive/v0/references.md`](../archive/v0/references.md) — the sourced catalog*
