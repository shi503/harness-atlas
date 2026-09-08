---
title: "EXPLAINER-PLAN — the manifesto, spined on one question"
tier: pm
project: harness-atlas
created: "2026-08-30"
status: ARCHIVED
owner: KD
supersedes-section: "NEXT-STEPS.md §2.2 (the README outline)"
provenance: AUTHORED
---

# The manifesto plan

**What this is.** The plan for the public explainer, restructured around the question the framework
actually answers. [`NEXT-STEPS.md`](../sessions/NEXT-STEPS.md) §2 settled *where* it is authored, *what shape* it
takes and *what rule* protects the repo split. All three stand. This settles **what holds it
together**, which §2 left as a category label.

**What it does not change.** No factor is added, dropped or renumbered. The ten README sections keep
their order and their sources. The `git mv` option stays open.

---

## 1. The spine

> # How do we work?

**This is not a new idea to add. It is a convention to promote.**
[`specs/v0/02-functions.md`](../v0/02-functions.md) already carries a
`> **How do we work?**` line under **every one of its twelve function bodies — 12 of 12** — adopted as
a per-function framing device and never lifted to the title.

And it is corroborated by a competitor. [`references/comparisons/03-jtbd.md`](../comparisons/03-jtbd.md)
§5 records Ryan Cooke (WorkOS) defining the software factory as *"the way work gets planned, scoped,
and verified, and the conventions and judgment calls that define your engineering culture"* — annotated
in our own file as **"That is this project's thesis, published by someone else."**

**Why the question rather than the category.** Categories move every quarter — *agentOS* was zero-use,
*harness* now spans two altitudes, *process layer* is a term we invented. And the leading practitioner
in the space has publicly bet against the category surviving:

> *"I'm reasonably confident that coding agents will be commoditized. The hard part will be the team
> and workflow transformation."* — Horthy, `wsff.md`

A framework named after a tool is priced like a tool. A framework named after a question outlives the
tools that answer it.

### 1.1 The three forms, and why this is structural rather than a slogan

The question takes a **different grammatical form in each of the three genres**
([`references/comparisons/2026-08-research/06-frameworks-addendum.md`](../comparisons/2026-08-research/06-frameworks-addendum.md) §0).
That is what makes it a spine and not a tagline.

| Genre | Artifact | The question's form | Status |
|---|---|---|---|
| **A · function taxonomy** | the functions | **declarative** — a sentence a team says about itself | **already there, 12/12** |
| **C · principle manifesto** | the fourteen factors | **imperative**, plus the sentence a team can say once it holds the principle | §3 |
| **B · readiness grid** | the six maturity stages | **the same question, answered six ways** | §4 — the payoff |

### 1.2 The editing test this produces

> **A function, factor or stage that cannot answer *"how do we work?"* in one sentence a real team
> would say out loud is not ready to publish.**

Companion to the test [`NEXT-STEPS.md`](../sessions/NEXT-STEPS.md) already sets — *"anything that would have been
good advice in 2024 is not our differentiator."* That one governs **content**; this one governs
**form**. Both are cheap to run and both delete text.

**A failed sentence is a finding about the factor, not a licence to invent prose.** If a factor cannot
produce one, record that; do not write around it.

---

## 2. Revised README outline

Ten sections, order and sources unchanged from [`NEXT-STEPS.md`](../sessions/NEXT-STEPS.md) §2.2. **Three change.**

| § | Section | Change |
|---|---|---|
| **1** | **Title + claim** | Re-led by the question. Category label demoted to subtitle |
| **2** | The short version | Each factor gains its one-sentence answer, so the list reads as **fourteen answers**, not fourteen imperatives |
| 3 | Visual nav | unchanged |
| 4 | How we got here | unchanged — the Agile-assumptions argument stays narrative, not spine |
| 5 | Why this altitude | unchanged — still the strongest section |
| 6 | What a harness is made of | unchanged |
| **7** | **How we benchmark** | Reframed from *"how good is ours"* to *"six answers, and how to tell which is yours."* §4 below. **Still blocked on the function count**, as §2.2 records |
| 8 | The factors again | unchanged |
| 9 | What we do not claim | unchanged — counter-positions, falsifier per factor |
| 10 | Related work | unchanged — attribution is what makes this a dissemination |

### 2.1 The title block

```
# How do we work?

### Principles for building the system a team runs its agents in.
```

The category label survives as the subtitle, which is where a label belongs: it tells a reader what
shelf this is on. The question tells them why to pick it up.

---

## 3. The factor-file template

One file per factor, per the `12-factor-agents` shape §2.2 adopts. Extends the existing
[`references/comparisons/2026-08-research/05-harness-factors.md`](../comparisons/2026-08-research/05-harness-factors.md)
§1 structure with **two fields**, both of which the corpus already requires informally:

```markdown
### <N> · <Imperative>

> <the principle, one line>

**How do we work?** "<one sentence a team says about itself once it holds this>"

**Prevents:**   <the failure it prevents>            ← existing
**Proof:**      <the artifact that shows you have it> ← existing
**Source:**     <attributed, dated>                   ← existing
**Job:**        J<n>                                  ← existing
**Horizon:**    <shipped | emerging | claimed | bet>  ← NEW — values from specs/v0/12-horizon.md
**Falsifier:**  <what would show this factor is wrong> ← NEW as a field
```

**Neither new field invents a requirement.** `05-harness-factors.md` §4 already states *"each is
stated so it can fail… a factor nobody could disprove is a slogan"* — `Falsifier:` promotes that from
prose to a slot. `Horizon:` is defined in [`specs/v0/12-horizon.md`](./v1-framework/12-horizon.md) and is
**left blank in this pass**, per the scope decision there.

### 3.1 All fourteen answers, drafted

**The test in §1.2, run.** Drafted here so the remaining work is editing rather than invention, and so
a failure would have surfaced now rather than at publication. **All fourteen produced a sentence.**

| # | Factor | *How do we work?* |
|---|---|---|
| **I** | One way to do each thing | *"There is one way to run tests here, and it is written down."* |
| **II** | Route deterministically | *"Who picks up a piece of work is decided by a rule, not by a model."* |
| **III** | Context is instruction, not overview | *"Our context files tell the agent what to do, not what the repo is."* |
| **IV** | Memory routes by ownership | *"A fact lands where its owner is, so no teammate's agent misses it."* |
| **V** | Scope only narrows | *"A local setting can tighten a rule here. It can never loosen one."* |
| **VI** | Declare the edges | *"Work does not start until what it depends on has landed, and the graph says so."* |
| **VII** | The gate does not run on the model | *"At least one of our controls is something the agent cannot talk its way past."* |
| **VIII** | Feedback is addressed to the machine | *"When something fails here, the error tells the agent how to fix it."* |
| **IX** | Escalate with a recommendation | *"When an agent gives up, it hands us a decision, not a problem."* |
| **X** | Every claim points at an artifact | *"'Done' here means there is a record, and we can show it to you."* |
| **XI** | Knowledge compounds or it is not knowledge | *"We do not relearn the same lesson twice — it gets promoted into the standard."* |
| **XII** | Capability travels without the hub | *"Anything we build can be installed into a repo that has never seen ours."* |
| **XIII** | Work is addressable by the whole team | *"Any of us can open a session someone else started and see what it saw."* |
| **XIV** | Cost is a first-class signal | *"We know what a piece of work cost, and whether it was worth it."* |

**Two observations from running the test.**

**The sentences are shorter than the imperatives.** That is the point — a principle is written for the
person implementing it; the answer is written for the person deciding whether to. `II` in imperative
form needs *"which agent, which skills, which context — decided with no model in the decision loop"*;
in answer form it needs eleven words.

**Not one of them requires naming a vendor**, which is the vendor-neutrality test
[`NEXT-STEPS.md`](../sessions/NEXT-STEPS.md) §2 already sets, passed fourteen times.

### 3.2 The worked example

**Factor `XIV · Cost is a first-class signal` is written out in full first**, so the other thirteen are
transcription rather than design. It is the right choice for three reasons:
`05-harness-factors.md` §4 calls it *"the sharpest finding in the whole analysis"*; it is the one **no
published harness taxonomy gives a row**; and it now has a real citation from a competitor —
HumanLayer's *"our team of three is averaging about $12k on opus per month"*
([`references/comparisons/systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3),
which is the only per-team cost figure anywhere in the corpus.

Note the factor's own recorded qualification travels with it: *"zero published taxonomies contain it"*
was narrowed on 2026-08-26 to *"neither is a named function with its own artifact joined to outcome."*
**The narrowed version is the one that gets published.**

---

## 4. §7 reframed — the Grid as six answers

> **`B-1` and `B-2` executed 2026-09-01.** The Grid this section is written around now runs on the twelve
> layers with its rows generated from [`specs/v1-framework/CROSSWALK.md`](./v1-framework/CROSSWALK.md) §0
> ([`references/grid.html`](../../maturity/grid.html)), and the generator it feeds is specified at
> [`specs/v1-framework/05-preflight.md`](./v1-framework/05-preflight.md). **The six answers below are
> unaffected** — the stages did not change, only the row set they are graded across.

**The payoff, and the section that most needs the spine.**

A maturity grid framed *"how good are you?"* is a scorecard, and every competitor ships one —
Factory.ai, Microsoft, Debois, Böckeler, Meng. A grid framed **"here are six answers to *how do we
work?*, and yours is the fourth"** says the thing none of them can, because **none of them names a
question their levels are answers to.**

It also states KD's own reading of the landscape structurally rather than rhetorically:

> **The question is constant. What matures is the complexity of the answer** — as agent capability
> and quality expectations expand.

Six answers, drafted against the six stages already in
[`specs/v0/03-maturity.md`](../v0/03-maturity.md) §2. **The stage definitions do not change**; this
adds one row to a table that already has *One-liner*, *AI is treated as*, *Bottleneck* and *Failure
mode*:

| Stage | *How do we work?* |
|---|---|
| **1 Resistant** | *"Carefully, and mostly without it. AI is a risk we are containing."* |
| **2 Opportunistic** | *"However each person worked it out. It works for whoever built it."* |
| **3 Assisted** | *"With AI on the parts we have found it good at, by team default."* |
| **4 Systematized** | *"Through a harness. The thing we maintain is the workflow, not the prompt."* |
| **5 AI-First** | *"We design the work for abundant intelligence, and people supervise it."* |
| **6 AI-Native** | *"Agents do bounded work end to end. We own judgment, accountability and the record."* |

**Read the column and the argument makes itself.** Stage 2's answer is about a *person*; stage 4's is
about a *system*; stage 6's is about *what humans keep*. That is the same progression
`03-maturity.md` already grades — it just becomes legible in one column instead of four.

**And it makes the existing threshold visible.** The 3→4 jump is where the sentence stops naming
people and starts naming an artifact. That is exactly the mechanical threshold §3 of `03-maturity.md`
places there, and it is the first time the ladder's own text says why the jump is the hard one.

> ⚠️ **Not applied in this pass.** `03-maturity.md` is marked ❌ *rebuild* in
> `loomwarp-team-system` `00-MAP.md` (private) §3 and its §4 ladders carry only 4 of 6 columns. Adding a row to a table
> queued for rebuild is churn. **These six sentences are drafted here and land when that file is
> rebuilt.**

---

## 5. What this pass deliberately did not do

| Not done | Why | Where it is tracked |
|---|---|---|
| **Mechanical enforcement** of the question | This is planning and manifesto setup. Enforcement is the natural follow-on, and `scripts/check-element-vocabulary.mjs` is the pattern — canonical list parsed from one file, exit non-zero on violation | here, §6 |
| **Applying horizon markers** | The axis is argued before ~20 judgment calls are made on it | [`specs/v0/12-horizon.md`](./v1-framework/12-horizon.md) §5 |
| **Band restructuring** | KD: *"some of these do get folded into some of these systems and layers."* Folding is likely, and renumbering mid-flight is the `FM-3` defect this corpus punishes in others | [`specs/v0/11-architecture.md`](../v0/11-architecture.md) §6 `OPEN-18` |
| **Writing `F12`–`F16` bodies** | They exist only as a justification table in `11-architecture.md` §5.1. **This is why the count is 12/12 and not 17/17**, and it is what blocks README §7 | §6 below |
| **Editing `NEXT-STEPS.md` §2** beyond a pointer | §2 sits inside the section holding KD's inline feedback | — |

---

## 6. The one real blocker

**README §7 cannot be written until `F12`–`F16` have bodies.**

Twelve of the seventeen functions carry the question. Five do not — not because the convention lapsed, but because
those five were added in [`specs/v0/11-architecture.md`](../v0/11-architecture.md) §5.1 as a table
of *why each is not a rename*, and never given sections in
[`specs/v0/02-functions.md`](../v0/02-functions.md).

Each needs the same block every other function has: definition · *How do we work?* · Systems ·
Artifact · Provider. `F12 Environment` and `F13 Adapters` have most of their content already drafted
in `11-architecture.md` §3.

**This is the next unit of work after this plan**, and it is bounded: five function bodies, in the
shape of the twelve that already exist.

---

*Companion: [`NEXT-STEPS.md`](../sessions/NEXT-STEPS.md) §2 — where the explainer is authored and the rule that
protects the split · [`specs/v0/12-horizon.md`](./v1-framework/12-horizon.md) — the `Horizon:` field's values ·
[`references/comparisons/2026-08-research/05-harness-factors.md`](../comparisons/2026-08-research/05-harness-factors.md)
— the fourteen factors this templates*
