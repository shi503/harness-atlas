---
title: "NEXT-STEPS — session synthesis and the plan for the rewrite"
tier: pm
project: loomwarp
created: "2026-08-26"
status: ARCHIVED
owner: KD
---

# Next steps

**What this is.** The handoff from the 2026-08-26 research session. It states what we now believe,
plans the rewrite in two parts, and inventories what is dirty. **Written to survive a context
compaction** — anyone (or any agent) picking this up should need nothing else to resume.

**How to use it.** Leave `> KD Note:` inline anywhere. Open decisions are at the bottom, deliberately.

---

## ✍️ KD — feedback goes here

*Space held for your notes before anything downstream is written. Nothing below is executed until
this section is filled or explicitly waived.*

**On the TL;DR (Part 1 §1):**

> KD note: I think another novel thing to understand here is that most harnesses are targeted at the "software factory" but similar to gbrain and other contemporaries, we're extending some of the popular frameworks to get a pulse-check on the zeitgeist as well as develop an understanding of where we're going. 
> a major challenge i'm having right now is imagining what the functions are and how best to group them.  let's try to visualize those so we can get specific about what structures and pages we're going to document. 
> there are components that 12-factor-agents does well like describing the "loops" of workflows that we need to accomplish and how they visualize the different flows quickly. 
> **On the explainer outline (Part 1 §2):** this structure looks good in terms of what we're trying to structure the one page. 

**On the dirty inventory (Part 2):**

> KD note: I'm less confident that we have this clear until we can finalize the shape of our Part 1

**Anything missing / wrong:**
> KD note: overall this is headed in the right direction.  I will write intro in slides at some point where the process of trying to publish my harness and current thinking of what was developed in the past few months led me to the effort to try and understand the shape that the industry is headed with harness engineering.  specifically this is challenging becuase we are trying to solve these at different altitudes (your words, not mine, still trying to feel whether or not that's the right word) where similar to how agile has been adopted (lean ux vs SAFe6.0) these look dramtically different in terms of software development maturity and size of teams.  this is why i believe its necessary for me to show (via grid) how these processes scale depending on your expectations of production quality. 
> another thing that i believe is important for us to start to name is where the zeitgeist is headed.  some of these concepts are named in the jtbd and other pieces but things like org/actor distribution, platform with shared primitives, harness "self-healing" -> evolution, active agent "librarian" etc...
> let's try to validate our primitives, taxonomy, components, ontology, factors, concepts, etc... and propose how we would visualize this similar to how 12-factor and other contemporaries have tried to capture this to clearly mark ourselves within the lineage of this emerging space. 

---



## 1. What this session established

Nine commits, ~6,000 lines. The findings, in the order they matter:


| #      | Finding                                                                                                                                                                                                                           | Evidence                                          |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **1**  | **The empty altitude.** Microsoft grades an *enterprise*. Factory.ai grades a *repository*. Meng grades a *harness*, present/absent, no stages. **Nothing grades the system a team actually works inside, with maturity stages.** | `2026-08-research/06-frameworks-addendum.md` §5.4 |
| **2**  | **Three genres exist and conflating them is the mistake** — function taxonomies · readiness grids · principle manifestos                                                                                                          | `06` §0                                           |
| **3**  | **Seventeen jobs**, grouped by layer, with a CORE/OURS line that was *measured*, not asserted                                                                                                                                     | `03-jtbd.md`                                      |
| **4**  | **Fourteen factors** in the 12-factor form, rendered by team scale and by maturity stage                                                                                                                                          | `2026-08-research/05-harness-factors.md`          |
| **5**  | `primitive` **defined** — *the single sanctioned way*. A system's primitive set **is** its architecture                                                                                                                           | `01-concepts.md` §3.17                            |
| **6**  | **Routing · cost · distribution are absent from every published taxonomy.** Cost qualified but holding                                                                                                                            | `02-harness-taxonomies.md` §3, `06` §5.2          |
| **7**  | **Our column 4 is one column stricter than the market's.** Factory's L3 is CI automation; ours is a control the model cannot reach                                                                                                | `06` D-2                                          |
| **8**  | **Evidence written for humans is a category error.** `F6` is capped at column 3 by its *addressee*, not its schema                                                                                                                | `06` §5.6                                         |
| **9**  | **Minimum-governs narrowed, still unmatched.** Factory gates at 80% within a level — but **nobody names the pillar that decides the verdict**                                                                                     | `06` §5.5                                         |
| **10** | **Nine phantom artifacts purged**, and three conformance checks now prevent recurrence                                                                                                                                            | commit `56fd5af`                                  |


**The editing test this produced**, and it should govern every line of the rewrite:

> **Anything that would have been good advice in 2024 is not our differentiator.**



### 1.1 What we got wrong, and corrected

Recorded because the corrections are load-bearing, not cosmetic.


| Was                                                                                  | Now                                                                                                                                                               |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nine artifacts asserted as existing and enforcing — seven schemas, two scripts       | **None existed.** `elements.md` §2 listed seven in its *Mechanism* column while §3 states *"if you cannot point at the artifact, you are one column to the left"* |
| `specs/v1` cancelled 11 documents because *"the specs already exist as JSON Schema"* | **They do not.** The reasoning survives as an argument for *writing* them                                                                                         |
| *"agentOS"* in the corpus title, four senses, two attributed to Indigo and SageOx    | **Zero usage** in 562 sessions; six senses; **neither company uses the term**                                                                                     |
| Provenance *"unclaimed by everyone"*                                                 | OpenAI named the **run receipt** on stage. The idea is claimed; no implementation shipped                                                                         |
| Primitives dismissed on `shared primitives` = 0                                      | `primitive` **= 33**, two talks titled on it. **Frequency measures what a field discusses, not what a system needs**                                              |
| Rituals dismissed on `standup` 0 / `ceremon` 0                                       | Two thresholds applied to two concepts — `multiplayer` (6) was called *"real"*. `transcri` **= 12**                                                               |
| *"No taxonomy contains cost"*                                                        | Qualified: Debois says *"cost-aware"*; Agent Cloud Stack has *"Agent Economy."* **Neither is a named function joined to outcome**                                 |


---



## 2. Part 1 — the explainer

> **Extended 2026-08-30 by [`EXPLAINER-PLAN.md`](../../spec/EXPLAINER-PLAN.md).** Everything settled below still
> holds. What that file adds is the **spine** — *"How do we work?"* — the factor-file template, and a
> reframing of §2.2's README §1, §2 and §7. **Read §2.2's outline through it.**

**Settled:** authored inside `projects/loomwarp/` at public quality; the repo-split decision waits
until the content exists.

**The rule that protects that option:** *write it so the split stays a* `git mv`*.* Vendor-neutral
throughout; LoomWarp appears only as **a** reference implementation, never as the subject.
**A factor that cannot be stated without naming LoomWarp is not a factor — it is a feature.** That
doubles as an editing test on all fourteen, and it is why 12-factor-app was adopted: it was not a
Heroku advertisement.

### 2.1 TL;DR — the framework in one screen

> **Everyone has told you how to build an agent. Nobody has told you how to build the system your
> team runs them in — or how to tell whether yours is any good.**
>
> This is a framework for **AI-native team harnesses**: the layer above the coding agent, where a
> team's context, standards, policy and evidence live. It answers three questions the field currently
> answers separately or not at all:
>
> - **What is it made of?** Seventeen jobs any team-scale harness performs, and the primitive sets
> real systems use to perform them.
> - **How should it be built?** Fourteen factors — imperative principles, each with the failure it
> prevents and the artifact that proves it.
> - **How good is ours?** A maturity grid where **the minimum governs, not the mean** — because the
> fabric tears at its thinnest thread, and that thread is your bottleneck.
>
> **The wager:** harness engineering became the discipline of 2026, and every instrument built for it  
> grades the wrong subject. Enterprise readiness models grade your *organisation*. Repo-readiness  
> checklists grade your *codebase*. Component matrices grade a *single agent's* runtime. **Nothing**  
> **grades the system your team actually works inside.** That is the altitude this occupies.

**Three things it deliberately does not claim**, because the research killed or narrowed them: we did
not invent provenance · context assembly already ships in `ox agent prime` · much of what passes for
"AI readiness" is 2019 delivery hygiene relabelled.

### 2.2 Outline — modelled on `12-factor-agents`

That repo is **260 README lines + one content file per factor + one image per factor.** The README is
navigation and narrative; the substance sits in the per-factor files. Same shape:

```
<explainer>/
  README.md                    the ~260-line front door
  content/factor-01-….md ×14   one file per factor
  img/ …                       one diagram per factor
```


| §   | Section                       | Content                                                                                                                                                                                | Source                               |
| --- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| 1   | **Title + claim**             | *"Principles for building reliable AI-native team harnesses"*                                                                                                                          | —                                    |
| 2   | **The short version**         | The 14 factors, each linking to its content file                                                                                                                                       | `05-harness-factors.md` §1           |
| 3   | **Visual nav**                | 14-image grid                                                                                                                                                                          | new                                  |
| 4   | **How we got here**           | Every harness was built single-operator. Three assumptions broke: shared context, co-location, trust. **The Agile-assumptions argument belongs here — as narrative, not as the spine** | `00-the-framework-from-agile.md` §3  |
| 5   | **Why this altitude**         | **The empty-altitude diagram.** The strongest section; nothing else in the field says it                                                                                               | `06` §5.4                            |
| 6   | **What a harness is made of** | The 17 jobs, compressed; primitive sets as the architecture                                                                                                                            | `03-jtbd.md`, `01-concepts.md` §3.17 |
| 7   | **How we benchmark**          | The Grid · minimum-governs · the 3→4 threshold · **the honest note that our column 4 is stricter than the market's**                                                                   | `grid.html`, `06` D-2                |
| 8   | **The factors again**         | Repeat list, per the genre                                                                                                                                                             | —                                    |
| 9   | **What we do not claim**      | Narrowed claims · counter-positions (Horthy, Mistele, Cooke) · the falsifier per factor                                                                                                | `03-jtbd.md` §5                      |
| 10  | **Related work**              | Every framework, credited. **Attribution is what makes this a dissemination rather than a land-grab**                                                                                  | `06` §8–9                            |


**Only §7 is blocked** by the function count. The jobs and factors stand on their own, so most of the
explainer can be drafted in parallel with the model settling.

---



## 3. Part 2 — inventory of what needs fixing

`✅ current · ◐ partially updated · ⚠️ needs work · ❌ rebuild`


| Document                                                  |     | Needs                                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------- | --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `specs/v0/00-README.md`                                   | ⚠️  | `OPEN-1..9` statuses stale; two reopened today                                                                                                                                                                                                                                                                                |
| `specs/v0/00-the-framework-from-agile.md`                 | ⚠️  | Spine settled as the unit-of-work derivation; the doc still leads on Agile. **Demote to one on-ramp among several**                                                                                                                                                                                                           |
| `specs/v0/01-problem.md`                                  | ◐   | Model/harness corrected. Still owes the promoted derivation and the `:51` note                                                                                                                                                                                                                                                |
| `specs/v0/02-elements.md`                                 | ⚠️  | `F3` re-spec'd against the ETH evidence. ~~**Blocked on B-1**~~ — **unblocked 2026-09-01, B-1 executed; still owed.** `F3` is now layer 5, decomposed into `5a`/`5b`/`5c` (`CROSSWALK.md` §2)                                                                                                                                                                                                                                                                   |
| `specs/v0/03-maturity.md`                                 | ❌   | Rebuild on the AI-Native framework + three rubric upgrades (current *and* target markers, boundary column, uncertainty flags). ~~**Blocked on B-1**~~ — **unblocked 2026-09-01, B-1 executed; still owed.** Its §7 explorer is only part-built: `grid.html` covers the grid, not the two-axis plot or the anti-pattern cards (`specs/v1-framework/05-preflight.md` §8)                                                                                                                                                                             |
| `specs/v0/04-decision-layers.md`                          | ⚠️  | Warps/levers vocabulary; Trust band                                                                                                                                                                                                                                                                                           |
| `specs/v0/05-preflight-spec.md`                           | ✅   | **DONE 2026-09-01 — `B-1` executed.** Rebuilt as `specs/v1-framework/05-preflight.md`; the lever inventory it was gated on is `CROSSWALK.md` §1–§2. Was: rebuild as the ad-lib artifact, gated on the lever inventory — which B-1 now partly defines                                                                                                                                                                                                                               |
| `specs/v0/references.md`                                  | ✅   | Standards layer corrected 2026-08-26                                                                                                                                                                                                                                                                                          |
| `references/elements.md`                                  | ⚠️  | Seven elements, `‡`-marked, fork-edited. ~~**Blocked on B-1/B-2**~~ — **unblocked 2026-09-01, both executed; still owed.** Its §*What is not superseded* still says `grid.html` renders its seven rows, which stopped being true when `B-2` landed                                                                                                                                                                                                                                                               |
| `references/grid.html`                                    | ✅   | **DONE 2026-09-01 — `B-2` executed**, including the design note: `E` is generated from `CROSSWALK.md` §0 by `scripts/gen-grid-rows.mjs`, the form is preserved and `s-neck` still computes. Was: **Preserve the form — it is the best artifact in the repo.** Hard-codes seven in one `const E=[…]`. **It already computes the bottleneck** (`s-neck`), which `J17` only now names as a job — the artifact was ahead of the framework. Re-point at the settled model; consider generating `E` from the spec so it cannot drift |
| `specs/v1/00-README.md` · `01-gap-analysis` · `02-prd-v1` | ◐   | Phantom claims purged and `‡`-marked. `03-open-decisions.md` and `references/positioning.md` **hit the folder's own 30-day delete rule on 2026-09-03**                                                                                                                                                                        |
| `plan.md`                                                 | ◐   | Category and provenance corrected. Self-grade still seven-element                                                                                                                                                                                                                                                             |
| `references/comparisons/**`                               | ✅   | Current through 2026-08-26                                                                                                                                                                                                                                                                                                    |
| `comparisons/00-README.md` §2+                            | ⚠️  | §1 rewritten; sections 2 onward still pre-re-check                                                                                                                                                                                                                                                                            |
| **Fork session's work**                                   | ⚠️  | `06-frameworks-addendum.md` (1,062 lines) **+ edits to five files, all uncommitted.** Needs review and a commit                                                                                                                                                                                                               |




### 3.1 Work items carried forward

From `06` §7A, sequenced — `W-1` **before** `W-2`, because an evidence artifact addressed to an agent,
in a system where the agent can disable the gate that produced it, is worse than the human-addressed
one it replaces:


| #           | Item                                                                                                     |
| ----------- | -------------------------------------------------------------------------------------------------------- |
| **W-1**     | Rewrite the v1 policy scope around Macedo's `T4` — model-independent control as a *membership condition* |
| **W-2**     | Re-address evidence artifacts to the next agent rather than the next human                               |
| **W-3**     | ADR on the ACE/AEE split for `J11` — a design question, not a build                                      |
| **W-4**     | Take the three rubric features into the Grid. Independent and cheap                                      |
| **ADR-028** | Project-scoped agents — an architect carries its own policy and standards scope. Planned, never written  |




### 3.2 Two scope questions the model cannot currently answer

- **Does the framework assume software?** `J10` distributes to *repos*; `J8` proves against *commits*;
`J15` hardens *code*. If the deliverable is a PDF or a GTM campaign, some of this holds and some does
not. **The framework has never stated its own scope.**
- **Is permission-aware context one job or two?** `J5` governs what an agent may *do*; `J1` governs
what it *sees*. Governing what it may *see* — RBAC over context — falls between them, and the Indigo
analysis called it **whitespace #1** in the entire category. It is currently nobody's job.

---



## 4. Open decisions



### B-1 · The function count — **DECIDED 2026-08-26: job-derived** · **EXECUTED 2026-09-01**

> **Executed** in `specs/v1-framework/CROSSWALK.md` §1 (every job derives a sub-layer, zero orphans) and in
> `specs/v1-framework/05-preflight.md`, which builds the *pre-recommended* consequence below into the
> generator's gates rather than leaving it as an optimisation.

> **KD:** *"likely job derived, we want to group them logically since some of them have nested
> decisions a team has to make (eg. what is your tech spec infrastructure?) and can be
> 'pre-recommended' based on your maturity selection in the grid."*

**What this settles.** Functions derive from the seventeen jobs rather than from the inherited seven or
the proposed nine. Grouping is logical, and **a function may carry nested decisions** — a team choosing
its substrate is really answering several sub-questions in sequence.

**What it opens, and it is the most interesting consequence in this document.** *Pre-recommended based
on maturity selection* means **the Grid stops being only a diagnostic and becomes an input to the
pre-flight generator.** Pick your target stage; the generator proposes the decisions a team at that
stage should make and hides the ones they should skip. `05-preflight-spec.md` already sketches this in
its Phase 0 gating — this makes it the point rather than an optimisation.

**Still to work out:** how many groups, what the nested-decision structure looks like as a data shape,
and whether the four `IMPROVE` jobs become **one new band** (the evidence leans this way — `J16`,
`J17` and `J12` all act on the harness rather than on a unit of work) or are distributed.

### B-2 · v1 migration and `grid.html` — **DECIDED: yes, eventually** · **EXECUTED 2026-09-01**

> **Executed** in `references/grid.html`: twelve layer rows per the `O-6` ruling (`CROSSWALK.md` §3.7), the
> form preserved intact, and the design note below carried out — `E` is generated by
> `scripts/gen-grid-rows.mjs` from `CROSSWALK.md` §0.

> **KD:** *"yes, eventually. there's just parts of that html that we want to keep functionally but in
> the end we're still showing the maturity and how frameworks scale."*

**Preserve functionally:** click-to-set cells, the live minimum/mean readout, the woven-fabric SVG with
`TEARS HERE` on the weakest thread, the bottleneck stat, and the org-stage bridge table. **What
changes is the row set, not the instrument.**

**One design note worth acting on:** `E` is a hard-coded literal, which is exactly how `grid.html` and
the specs drift apart. Generating it from the spec — the way `check-element-vocabulary.mjs` already
parses the canonical map out of `02-functions.md` §1 — would make drift impossible rather than merely
detectable.

### B-3 · `OPEN-8` rituals and `OPEN-9` stewardship — **context, as requested**

> **KD:** *"uncertain on the issue here... leave some context for me to understand."*

Both were argued closed earlier in the session and both reopened. Here is what each actually asks.

#### `OPEN-8` — should **Rituals** be a function?

**A ritual is a recurring team practice with a stated place for the agent** — standup, code review,
retro, office hours.


|                                     |                                                                                                                                                                                                                                                                                                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **For**                             | It passes v0's own two-question test. *Independence:* gstack is high-ritual and low-control (five planning skills, no dependency graph); FRACTAL is the exact inverse (router, dispatch, HANDOFF, no retro). *Evidence:* `/retro` and `/office-hours` ship as skills                                     |
| **Against**                         | The corpus says the field abandoned the vocabulary — `standup` **0**, `ceremon` **0**, `peer review` **0**, `ritual` **1**. One talk is titled *"Agents Don't Do Standups"*                                                                                                                              |
| **Your counter, which reopened it** | Transcription made meetings **machine-readable** (`transcri` **12**, twice `multiplayer`). On that reading a ritual is **not a meeting — it is a scheduled loop that emits an artifact**, and the corpus supports *that* directly: cron-triggered reviews, scheduled quality checks, nightly maintenance |
| **My error**                        | I called `multiplayer` (6) *"real but emerging"* and Rituals (1) dead — **two thresholds for two concepts**, producing the answer I had already drafted                                                                                                                                                  |


**The live question:** is *ritual* a function, or is it `J6 validate` + `J11 coordinate` with a
**cadence** attached? **The stakes are higher than they look**: on your reframing, scheduled checks are
what produce the measurement `J17 diagnose the bottleneck` reads. **If rituals are not modelled,**
`J17` **has no input.**

#### `OPEN-9` — is the **steward** an agent or a gate?

**Who *maintains* the system, as distinct from who *decides* it.** `04-decision-layers.md` §3 records
only the second.


| Position                                                     | Who                                                                        |
| ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| A named **librarian**                                        | Garry Tan — *"a brain nobody curates is a garbage dump with great search"* |
| **Automate it away** — manual curation *is* the failure mode | SageOx, $15M                                                               |
| **The vendor owns it** — `core/` replaced wholesale          | Indigo HQ                                                                  |
| **Nobody**                                                   | LoomWarp · Gas City · FRACTAL                                              |


**Why it reopened.** I answered *"gate"* on the grounds that `resolve-context-bundle.cjs` already
enforced version, hash and expiry, so `STRATEGIST` §2.6's test — *name the measurable failure of the
simpler design before adding an agent* — had no answer. **That file does not exist and never has.** The argument
was void, and the test was never actually run against a real gate.

**The prior art has a better answer than the one I gave.** `generic-cerebro` splits stewardship **by
content tier**: `wiki/` is optimistic, with an **agent** steward that reports and never silently
rewrites; `decision-log/` is locked with RACI, and a **gate** is the only write path. **Agent *and*
gate, divided at the promotion event.** Your captain/quartermaster framing maps onto it exactly —
**captain sets direction, quartermaster maintains stores.**

**The live question:** does LoomWarp adopt the two-tier split, and is stewardship an **function** (a
thing you grade) or a **role** (a thing you staff)? Note we currently have neither a steward nor a
gate, so *"we already have a gate"* is not available as an argument.

### B-4 · `ENRICHMENT-PLAN` go/no-go and the 11 cancelled v1 documents — **open**

`P-1` is the only row that moves the minimum grade, and it is `S` effort on native primitives. The
eleven cancelled documents were cancelled on a justification now known to be false; whether they stay
cancelled is a live call.

---



## 5. Sequence

```
NOW          NEXT-STEPS.md  ← this file, plus KD's feedback above
   ↓
THEN         B-1 — derive the functions from the jobs --> harden the framework and make it clear, concise, and publish ready
             unblocks 02-elements · 03-maturity · grid.html · every crosswalk
             B-2/B-3/B-4 follow cheaply once the model is fixed
   ↓
WORKSTREAM   the explainer — internal, public quality, vendor-neutral
             14 factors · 14 diagrams · the empty-altitude argument
             §7 waits on B-1; everything else can start
```

---

*Companion:* `[references/comparisons/](../../comparisons)` *— the landscape ·*
`[references/comparisons/2026-08-research/](../../comparisons/2026-08-research)` *— the evidence ·*
`[specs/v0/](../v0)` *— the framework being rewritten*