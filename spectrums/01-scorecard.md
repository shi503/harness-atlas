---
title: "The DX scorecard — seven dimensions, read over the ten axes"
tier: reference
project: harness-atlas
created: "2026-09-07"
updated: "2026-09-07"
status: DRAFT
owner: KD
provenance: DERIVED
---

# The DX scorecard

**What this is.** Seven named dimensions, each `−3…+3`, that a reader can take in at a glance — the
character-sheet face of [`00-README.md`](00-README.md)'s ten axes. It answers *what is this thing, and
what does adopting it cost me?* The ten axes answer *how does it behave?* Both are read from the same
profile and stored in the same file, `positions/<harness>.yaml`.

**It is not a fourth instrument.** The grid says what a harness ships; the sheet says where it sits;
the range grades a team. This is the sheet's headline layer, not a new question — see
[`00-README.md`](00-README.md) §0.

**Why seven and not ten.** Ten sliders is the readable limit for an analyst; seven is the limit for
someone deciding whether to keep reading. The compression is uneven on purpose: **six of the seven
compress**, each reading two or more sources, and exactly one — DX-1, ≡ axis I — passes straight
through. A reader who notices that one dimension compresses nothing and suspects padding should find
the answer here rather than infer one.

> **These seven were revised on 2026-09-07, after the first harness was scored against the originals.**
> Four ids were retired and superseded, DX-4's polarity was reversed, and DX-5 was narrowed. The whole
> revision, and what it invalidated, is **[§7](#7-dated-revision--2026-09-07)**. Read it before citing
> any fingerprint written earlier than that date.

---

## 1. Requirements — four rules on top of R1–R7

[`00-README.md`](00-README.md) §1's R1–R7 govern every dimension below, with the exception R9 names.
These four are the scorecard's own.

### R8 · Authored, never computed

**A dimension's value is read by a person from the sources in its `reads:` block.** No dimension is an
average, a sum, or any function of axis values. `reads:` names what a scorer *opens*, never what a
formula *consumes*.

**The reason, stated here because a rule without its reason gets optimised away.** Axes VI and VII are
**Axis VI is** `shape: centred` — `0` is the healthy place and `|value|` is distance from it, not a
position. No arithmetic maps a centred axis onto a polar one. (Axis VII was also `centred` until
2026-09-07, when Pi's `+2` falsified the marking — ruling `2026-09-07-axis-vii-polar`. VI is now the
only one, and R8 stands on it alone.) `VI = +3` means **accommodation failure, twelve or
more sanctioned ways, undisciplined**; a roll-up that averaged it into DX-2 would read it as "heavy"
and report something the axis never said. DX-2 does read axis VI — but for **bulk only**, under a
mandatory `reads.note`, which is a person's judgement and not a function. The next contributor who
thinks a script would be nice should read this paragraph first.

### R9 · A graded dimension is declared

R2 — *both costs statable* — is the anti-grade test and governs the ten axes and six of the seven
dimensions unchanged. **DX-5 Ecosystem is admitted as a graded dimension** by ruling
`2026-09-07-dx-scorecard`. A graded dimension declares itself in **four** places, so the exception can
never be read as an oversight:

| Where | Form |
|---|---|
| The definition | `grades: true`, plus `because_grades:` and `contested_by:` — **both mandatory** |
| The R2 fields | `cost_of_high:` is **absent, not null**. Its absence *is* the claim: we tried and could not fill it honestly |
| The rendered card | a different glyph vocabulary — a fill meter `` `▰▰▰▰▱` `` where every polar row shows a position strip `` `───●───` `` — plus a `†` suffix |
| Here | R9 names the dimension and cites the ruling by id |

**Exactly one dimension carries `grades: true` today.** A second requires its own dated ruling. Two
would kill R2 by attrition rather than by decision, which is the failure mode this rule exists to
prevent.

`contested_by` is what keeps the exception **retirable**. It is mandatory because a graded dimension
with no recorded counter-argument can never be argued back to polar.

### R10 · Split, never average

Where two halves of a harness disagree and the axis is not `dual_allowed`, record `split:` naming the
half scored and the half not, and score **the half the profile states most directly**. Never take a
mean. Ported from the teardown skill's rule 7 — *when two altitudes are both true, record both* — and
from the repo's standing rule that absence is recorded, never inferred. Five live cases appear on the
first harness scored, so this is not a hypothetical.

### R11 · Drafted until verified

**Every position on this sheet is an interpretation, and the sheet says so on its face until a person
has checked it.**

**What a position is derived from.** A dimension is read from *how the harness presents itself* —
the developer's own explanations, the documentation, the release notes, the README and the marketing
copy — **grounded against the code and configuration the profile could actually observe**. Where the
two disagree, the observed artifact wins, and the disagreement is recorded rather than resolved
silently. This is R3 restated at the scorecard's altitude: the profile is the source, and no vendor
page is opened at scoring time.

**Why that needs a disclaimer.** Positioning material is written to persuade. A harness that calls
itself *enterprise-ready* is evidence about its intent, not about its tenancy model, and a scorer
reading fast will import the claim as a fact. Recording the derivation on the card is what keeps a
reader from mistaking a vendor's self-description for a measurement.

**The mechanism.** Every `positions/<harness>.yaml` carries a `verification:` block (§2.3). While
`verified: false`, the rendered card shows a **drafted** banner naming the deriver and the date. **A
human review pass is the only thing that removes it** — a person re-reads the seven values against the
profile, sets `verified: true`, and signs `verified_by` and `verified_on`. Nothing else clears it: not
age, not a re-render, not a second model.

**Absence of verification is recorded, never inferred.** A card with no `verification:` block at all is
malformed, not verified. This is the repo's standing rule applied to the sheet's own provenance.

---

## 2. The schema

### 2.1 Definition — one per dimension, in this file

```yaml
- id: org-scale                   # kebab-case, stable, never renamed (retire and supersede instead)
  dx: 1                           # display order. The id is stable; dx may be re-ordered
  name: "Org scale"
  question: "Is it built for one operator, or for many users across an organization?"
  ends:
    low:  "single operator"
    high: "multi-tenant, many teams"
  shape: polar                    # polar | graded. NEVER centred — see R8
  grades: false
  reads:                          # R8 — what a scorer OPENS, never a formula's inputs
    axes:    ["operator-scale"]                  # ids from 00-README.md §3
    profile: ["§7 · serves more than one person", "10b", "10a", "3d"]
    note: ~                       # mandatory where a read is inverted, partial, or declined
  anchors:                        # only −3 / 0 / +3 defined; ±1, ±2 interpolate
    "-3": "…"
    "0":  "…"
    "+3": "…"
  cost_of_high: "…"               # R2 — mandatory unless grades: true, in which case ABSENT
  cost_of_low:  "…"               # R2 — always mandatory
  because_grades: ~               # mandatory IFF grades: true; one sentence + the ruling id
  contested_by:   ~               # mandatory IFF grades: true; the argument that would retire it
  status: core                    # core | probation | retired
  supersedes: ~                   # the retired id this dimension replaces, if any
```

**A dimension id and an axis id may coincide, and two of them used to.** Before the 2026-09-07
revision DX-1 and DX-7 carried the same ids as axes I and X, because both were pass-throughs — which
meant `operator-scale` and `cost-visibility` each named two different things. The revision ended that
by accident rather than by design, and the outcome is kept on purpose: **every DX id is now distinct
from every axis id.** A future pass-through should mint its own id rather than borrow the axis's.

### 2.2 Position — the `scorecard:` block

Lives in the same `positions/<harness>.yaml` as the ten axes, under a sibling key. Field rules are
[`00-README.md`](00-README.md) §2.3's, unchanged — including `split:` and `gap:`.

```yaml
  scorecard:
    - id: weight-class
      dx: 2
      value: 1
      mark: direct
      reads_opened:
        axes:    ["proof-ceremony: 0", "primitive-discipline: +1 (bulk only)"]
        profile: ["§5 count", "§1 Structured output", "2c", "8b"]
      because: "Eight named units is real machinery; nothing requires an artifact per unit."
      split:   "Machinery scored; rigor alone is 0."
```

### 2.3 Verification — the `verification:` block

One per harness file, at the top level beside `spectrums:`. R11 owns it.

```yaml
verification:
  derived_from: ["vendor documentation", "repo README and release notes", "product/marketing copy"]
  grounded_against: ["the component matrix §4", "the primitives §5", "the identity table §7"]
  drafted_by: "claude-opus-5"     # or a person's initials, if a person drafted it
  drafted_on: "2026-09-07"
  verified: false                 # a human review pass is the ONLY thing that flips this
  verified_by: ~                  # mandatory IFF verified: true
  verified_on: ~                  # mandatory IFF verified: true
  note: ~                         # where positioning and observed code disagreed, and which won
```

**Rendering.** `verified: false` renders the drafted banner on the card in
[`positioning.md`](positioning.md). `verified: true` renders a one-line signature instead. There is no
third state — a missing block is malformed.

### 2.4 Glyphs — and where they may appear

| Glyph set | Means | Cells | Mapping | Lives only in |
|---|---|:-:|---|---|
| `───●───` | a **position** on a polar dimension. The sign is a place, not a score | 7 | the `●` sits at index `value + 3`, so `−3` is hard left and `+3` hard right | `spectrums/positioning.md` |
| `▰▰▰▰▱` | a **fill** on a graded dimension. More is more | 6 | `value + 3` cells filled, so `−3` is empty and `+3` is full | `spectrums/positioning.md` |

**The fill mapping was undefined until 2026-09-07** — `+3` rendered as five `▰` with no stated rule,
which meant no other value could be rendered without inventing one. Six cells is the smallest width
that maps all seven values exactly with no rounding, and rounding is what would have let two different
scores render identically.

**These never leave `spectrums/`**, bar the one sanctioned echo in a profile's §1a. The repo already
keeps two mark systems apart — coverage `● ◐ ○ n/a` in the grids and a profile's §4, source
`✅ ↪ ⚠️` in a profile's §6 onward — and a third pairing loose in the corpus would undo that. The
distinction *between* the two sets above is the same move the house already makes: a different glyph
vocabulary is how a different kind of claim announces itself.

---

## 3. What the scorecard does not carry

**Three of the ten axes feed no headline cell.** They are not dropped and not left unscored.

> **The scorecard is a face, not a filter.** All ten axes are scored for every harness, always, in
> `positions/<harness>.yaml`. Detail-only governs **display**, never scoring. A harness with a
> scorecard but an unscored axis is malformed.

| Axis | Why it has no headline cell | Read it at |
|---|---|---|
| **IV** Loop ownership | `dual_allowed: true` — it can hold two values at once, and **a headline cell structurally cannot**. Not a taste call | [§3 IV](00-README.md) |
| **VII** Control posture | *What may run unattended* is orthogonal to DX-2: a heavyweight harness can run unattended, and a lightweight one can be approval-first. **Its shape is no longer contested** — ruled `polar` 2026-09-07 — so it is now detail-only by scope alone, and eligible for a dimension if one ever needs it | [§3 VII](00-README.md) |
| **IX** Improvement loop | *What happens to a lesson* is an analyst's question, and it is the axis most likely to move as a harness matures — so a headline cell would go stale fastest | [§3 IX](00-README.md) |

**Axis II was detail-only until 2026-09-07 and is not any more.** The old reason was that it *"splits
across DX-1 and DX-6 without belonging to either."* It now has a home of its own: **DX-4 Context**
reads it directly. Detail-only drops from four axes to three. Note the two are not the same question —
axis II asks *what survives the process*, DX-4 asks *what the harness knows about your work* — and Gas
City is where they part company; see DX-4.

**Axis VIII was detail-only until 2026-09-07 and is not any more.** The old reason was that *how is
completion known* is an analyst's question no DX reader arrives with. Under DX-2 **Weight class** they
do arrive with it: *"expected rigor"* and *"heavy validation"* are the same question in a buyer's
words. VIII is now read directly by DX-2 — see §7.

Each of the ten axes carries a reciprocal **Headline** row in [`00-README.md`](00-README.md) §3, so
the fact is recorded in the file that owns the axes and not only in the file that declines them.

---

## 4. The seven dimensions

`shape: polar` unless marked. Anchors at `−3 · 0 · +3`.

### DX-1 · Org scale — *one operator, or many users across an organization?* `polar`

`id: org-scale` · supersedes `operator-scale` *(retired as a DX id 2026-09-07; axis I keeps it)*

| | |
|---|---|
| **−3** | **Single operator.** Built for one person, one machine, one specific user flow. Nothing in the design contemplates a second person |
| **0** | **Shareable by convention.** A second person can copy the files; no mechanism knows they exist |
| **+3** | **Multi-tenant, many teams.** Built to support multiple users, teams and an org's needs at enterprise scale — named operators, scopes or tenants, and per-tenant policy the harness itself enforces |
| **Reads · axes** | `I operator-scale` — **pass-through**, and the only one left |
| **Reads · profile** | §7 *"does it serve more than one person"* · `10b` `10a` `3d` `4b` |
| **Cost of high** | Every feature must be scoped before it ships; solo velocity drops |
| **Cost of low** | The second-user bottleneck — coordination, visibility, review, shared context |

**On the name.** *Org scale*, not *operator scale*. The old name described the unit being counted; this
one describes the destination, which is the question a buyer actually asks. The id change is a
retire-and-supersede under the §2.1 rule, not a rename, and it has the side effect of freeing
`operator-scale` to mean exactly one thing — axis I.

### DX-2 · Weight class — *how much harness is this, and what is it built to produce?* `polar`

`id: weight-class` · supersedes `constraint-form` *(retired 2026-09-07)*

Named on the fighter-weight-class analogy: the class indexes **bulk**, and it tells you what kind of
fight the thing is built for. It is what a developer needs to know to predict complexity, inference
cost, expected rigor, and the production quality of what comes out.

| | |
|---|---|
| **−3** | **Light-weight.** A minimal or thin harness. Simple natural-language instructions, few loops, minimal or no verification. What it produces is what the model produced |
| **0** | **Mid.** Structured in places — some named units, some checks — with no standard that every unit must clear before it closes |
| **+3** | **Heavy-weight.** A heavily structured harness expected to deploy production-quality code and processes. Heavy rigor and validation, and domain-specific or opinionated outputs the harness itself checks against |
| **Reads · axes** | `VIII proof-ceremony` — **direct** · `VI primitive-discipline` — **bulk only** |
| **Reads · profile** | §5 count and verdict · §1 *Structured output* · §3 Workflows — how many named loops · `2c` `8b` `8a` |
| **Cost of high** | Ceremony tax on every one-line change, high inference cost per unit of work, and rigor that outlives the reason it was written |
| **Cost of low** | Nothing catches what the model got wrong, and the output quality is whatever the day's model happened to give you |

> **`reads.note` — mandatory, and the most important line in this file.** Axis VI is `centred`, and
> **only its bulk is read here, never its verdict.** A published set of twelve is *more harness* than a
> published set of five; that is all this dimension takes from it. Axis VI's own claim — that 12+ is
> **accommodation failure** — is a health judgement that says nothing about weight class, and importing
> it would turn a `+3` into a criticism. A refusal list (`VI = −3`) is likewise not evidence of a light
> harness: refusing to ship a unit is a heavy-weight move. **Score the count; discard the verdict.**
> Axis VIII, by contrast, is polar and is read directly: receipt-bound is heavy, assertion is light.
> Axis VII is **not read here at all** — see §3. It was `centred` until 2026-09-07 and is now `polar`,
> which makes it *eligible* to be read by a dimension; that it still is not is a scoping decision, not
> a shape constraint. This note is what makes "authored" a
> design rather than an excuse.

**What replaced what.** `constraint-form` asked *is intent imposed by inference, or by machine?* That
question survives — it is **axis III `binding-force`**, where it always lived, and it is now read at
the detail layer only. Weight class asks a bigger question that binding force is one input to. A
harness can bind mechanically and still be light: a single deny-list and nothing else.

**On the name.** Not *harness posture*: `posture` is occupied three ways — the *Permission posture*
synonym set and QM's own primitive `posture` in [`../vocabulary.md`](../vocabulary.md), and axis VII
*Control posture*. Not *structured output*, which in this repo means **the one artifact a harness
optimises for**, not the JSON-schema sense. Not *complexity*, which grades.

### DX-3 · Surfaces & extendability — *how many interaction points, plugins and environments?* `polar`

`id: surfaces-extendability` · supersedes `footprint` *(retired 2026-09-07)*

| | |
|---|---|
| **−3** | **One surface.** One place work happens, often a CLI, and nothing else. No published extension point |
| **0** | **A market.** Several surfaces, **or** a published extension mechanism with a marketplace or registry for plugins and skills |
| **+3** | **A platform.** Many surfaces with a stated source of truth, several execution environments, published plugin / hook / protocol extension points, and delivery and telemetry out |
| **Reads · axes** | `surface-breadth` *(probation — [`00-README.md`](00-README.md) §5)* |
| **Reads · profile** | `11a` `6b` `6d` `8c` `1a` · `2b` hooks · `4a` capability and plugin bundling · `2a` adapters |
| **Cost of high** | N surfaces to keep true, *"which version is true"* becomes a real question, and every extension point is a compatibility promise |
| **Cost of low** | It cannot meet people where they already work, and nothing can be extended without forking it |

**Hooks and plugins are scored here, not under DX-5.** They are extension *points* — machinery the
vendor ships. What third parties actually built with them is DX-5. The boundary matters because the
same paragraph of a vendor's docs is evidence for both, and without the line drawn the two dimensions
would collide on identical evidence — the exact failure §6 names as a falsifier.

**This dimension is the strongest live argument for promoting `surface-breadth` out of probation** —
its left half is that axis and its right half is grid rows. Promotion still needs the R6 check
[`00-README.md`](00-README.md) §5 asks for, which is untestable until more than one harness is scored.

**On the spelling.** *Extendability*, KD's coinage 2026-09-07, kept over the more usual
*extensibility* because it is the word the dimension was named in. Recorded so it is not silently
normalised later.

### DX-4 · Context — *what does it remember about my project, and what can it look up?* `polar`

`id: context` · supersedes `domain-specialization` *(retired 2026-09-07)*, which superseded
`domain-breadth` *(retired the same day)*

| | |
|---|---|
| **−3** | **Nothing survives.** No memory object, nothing shared, nothing retrievable. A session starts empty and ends empty |
| **0** | **File-backed and local.** Instructions and transcripts persist for one operator on one machine; nothing is shared with anyone and nothing is curated for retrieval |
| **+3** | **Shared, durable and retrievable.** Team-visible memory that survives its author, beside curated knowledge the agent can cite |
| **Reads · axes** | `II state-durability` |
| **Reads · profile** | `5a` Individual Memory · `5b` Team Memory · `5c` Knowledge |
| **Cost of high** | A store to run and a schema to migrate; context outlives the reason it was written, and stale memory is worse than none |
| **Cost of low** | Every session re-explains the project, and nothing one person learns reaches anyone else |

**Why this dimension exists, and what it replaced.** `domain-specialization` read `0` on **seven of
ten** — every one of them the `0` anchor verbatim. KD's diagnosis, 2026-09-07: *"domain is largely
project specific, and more an example of the guide / sensor convention we build into a project or
agent's definition."* A domain is authored **into** a harness, and R3 requires a dimension be derivable
from the **harness** profile. It was measuring the wrong altitude, and no re-anchoring fixes that.

**Why Context and not the broader cluster.** The proposal on the table was one vector covering domain,
steering, observability, trust/safety and standards. Measured against the corpus, four of those five
are already read or near-flat: observability is DX-7's, trust/safety is DX-2's, `3e Standards` is
`○` on eight of ten, and steering (`3a` `3b` `3c`) puts six of ten at 5–6 of 6. Bundling them would
rebuild the DX-3/DX-5 collision the same day's earlier revision was written to fix.

**Layer 5 was read by nothing at all**, and it discriminates better than anything already on the sheet
— **six distinct values across ten harnesses**, with Pi, OpenCode and FRACTAL at a clean floor. It is
also the sharpest available reading of *context engineering*: the part of it that is a property of the
harness rather than of the project.

**On `state-durability` as the axis input.** Axis II asks *what survives the process*; this dimension
asks *what the harness knows about your work*. They are close but not the same, and **Gas City is the
case that proves it** — durable, queryable task state (axis II `+3`) beside no memory and no knowledge
(`5a◐ 5b◐ 5c○`). Where the two disagree, score the layer-5 reading and record the axis in a `split:`.

### DX-5 · Ecosystem — *how many people have built on it?* **`graded †`**

`id: ecosystem` · unchanged id, **anchors narrowed 2026-09-07**

| | |
|---|---|
| **−3** | **Tribal.** Low or no adoption outside its authors. Little or no community building; no second author |
| **0** | **Adopted.** A real user base and some third-party authors. No network effect yet, and longevity unproven |
| **+3** | **Wide adoption**, extensive evidence of people building on the platform, and **longevity** — sustained releases over time, with network economies where each new author makes it more valuable to the next |
| **Reads · axes** | — none |
| **Reads · profile** | §7 Stars · Repo created · First / Latest release · release or tag count · any named third-party author or extension count |
| **Cost of low** | You build every integration yourself, and nothing you build travels |
| **Cost of high** | **absent — see `because_grades`** |

> **`reads.note` — the DX-3 boundary, mandatory.** **The existence of a marketplace, a plugin API, a
> hook system or a co-published standard is DX-3, not this.** Those are extension points the vendor
> ships. This dimension reads only **how many people actually came** — adoption, third-party
> authorship, longevity, network effects. Narrowed by ruling `2026-09-07-dx-revision` because the old
> `+3` anchor said *"registries, marketplaces, or a co-published standard"*, which is the same evidence
> DX-3's `0` anchor now claims. Two dimensions scoring the identical paragraph is the collision §6
> names as a falsifier, so it was cut here rather than there.

`because_grades:` — *"KD ruled 2026-09-07 that this dimension may grade. R2's `cost_of_high` cannot be
filled honestly: no reader in this corpus would choose a smaller ecosystem for its own sake. The
exception is scoped to this one dimension; R2 governs the ten axes and the other six unchanged."*

`contested_by:` — *"A large ecosystem costs churn, supply-chain surface, plugin quality variance, and
breaking changes in a version you do not control. If a future scorer can state that as a reason a
buyer would choose `−3`, this dimension becomes polar and the exception retires."*

**On the name.** `Ecosystem`, not *ecosystem maturity*. [`../maturity/`](../maturity/) grades a
**team**; a harness dimension carrying the word *maturity* would collide with the one instrument in
this repo that is allowed to grade — and this dimension already borrows that instrument's licence.
Two collisions in one name is one too many.

### DX-6 · Ownership — *rented, or yours?* `polar`

`id: ownership` · unchanged 2026-09-07

| | |
|---|---|
| **−3** | Rented. No OSS licence, a compiled artifact, one vendor's model family |
| **0** | Source-available, or open source bound to one substrate you do not control |
| **+3** | Yours. OSS licence, self-hostable, substrate-pluggable; a fork is a real option |
| **Reads · axes** | `V substrate-portability` |
| **Reads · profile** | §7 License · §7 Install · `0a` `6b` |
| **Cost of high** | You own the substrate, the upgrades, and the org policy a vendor would otherwise run for you |
| **Cost of low** | Lock-in, and no fork when the roadmap turns away from you |

**This dimension stays polar, and the cost of the high end is not a formality.** Claude Code is the
demonstration: `10b`, `3d` and `6d` are strong **because** it is proprietary — managed settings, a
hosted review service and an org analytics plane are things a vendor runs for you. Admitting a second
`grades: true` here would have ended R2 by attrition; the cost was statable, so it is stated.

### DX-7 · Cost controls & efficiency — *what did it cost, and can you pull on it?* `polar`

`id: cost-controls` · supersedes `cost-visibility` *(retired as a DX id 2026-09-07; axis X keeps it)*

| | |
|---|---|
| **−3** | **Unmetered, unrestricted.** Nothing records what a run cost, and nothing bounds it |
| **0** | **Metered.** Tokens and time surfaced per session, joined to nothing, with no shipped mechanism that reduces or caps spend |
| **+3** | **Controlled.** Cost observability attributed to the unit of work, **plus** shipped token-efficiency gains — compaction, caching, effort levels — **plus** model measurement and routing, and a spend bound the harness enforces |
| **Reads · axes** | `X cost-visibility` — the observability third · `routing-determinism` *(probation)* — the routing third |
| **Reads · profile** | `8d` Efficiency · `8c` Observability · `8b` Evidence · `3b` Routing · `5a`/`7a` for what compaction survives |
| **Cost of high** | Instrumentation and routing machinery that only pays for itself at org scale — and efficiency measures that silently change what the model sees |
| **Cost of low** | A bill nobody can attribute, and nothing to pull on when it turns out to be too high |

> **`reads.note` — this is no longer a pass-through, mandatory.** Axis X measures **visibility only**;
> this dimension measures visibility, efficiency and control. Two of its three thirds are read from
> grid rows and a probation axis, not from axis X. A scorer who copies axis X's value into this cell
> is scoring one third of the dimension. Widened by ruling `2026-09-07-dx-revision`.

**This dimension is about mechanisms, not price.** *"Is it expensive to run"* is a different question,
it grades, and **no profile carries a price** — so it fails R3 and is out of scope by construction.
What is in scope is everything a harness *ships* to make the answer knowable and smaller: meters,
attribution, caches, compaction, effort levels, cheaper-model routing, spend limits. Published 2026
harness benchmarks report the same task costing `$0.07`–`$2.26` on harness choice alone; that spread is
a reason this dimension exists, not a thing this dimension measures.

---

## 5. Probation, promotion, retirement

Identical in shape to [`00-README.md`](00-README.md) §4, and for the same reason. A probation dimension
is defined here with `status: probation`, is **excluded from the fingerprint**, and is scored so that
R6 has data to judge it on.

| Candidate | Ends | Why not yet |
|---|---|---|
| *(none)* | | The seven are KD's, revised 2026-09-07. The first candidate arrives from a scorer, not from this file |

**Promotion** — a candidate joins the seven when it takes ≥3 distinct values across the scored corpus
(R6) and satisfies R2 or R9. Promotion is a dated revision of this file plus a ruling.
**Retirement** — a dimension whose scored corpus lands within one notch retires to probation with a
dated note, unless its flatness is published as a finding.
Candidates are recorded here and routed by [`../docs/agents/intake.md`](../docs/agents/intake.md).

### Retired ids — never reused

| Retired id | Retired | Superseded by | Note |
|---|---|---|---|
| `operator-scale` *(as a DX id)* | 2026-09-07 | `org-scale` | Axis I still carries this id. The collision is what the retirement removed |
| `constraint-form` | 2026-09-07 | `weight-class` | The question survives as axis III `binding-force`, read at the detail layer |
| `footprint` | 2026-09-07 | `surfaces-extendability` | |
| `domain-breadth` | 2026-09-07 | `domain-specialization` | **Polarity reversed**, not merely renamed |
| `cost-visibility` *(as a DX id)* | 2026-09-07 | `cost-controls` | Axis X still carries this id. The collision is what the retirement removed |

---

## 6. What would falsify this

- **If a reader takes longer to read seven dimensions than ten axes**, the compression failed and the
  layer is decoration.
- **If two harnesses share a fingerprint and are obviously different choices**, the seven are the wrong
  seven — the same falsifier [`00-README.md`](00-README.md) §6 states for the axes, and it fires here
  first because seven values collide sooner than ten.
- **If two dimensions score the same sentence of a profile**, one of them is redundant. This nearly
  happened to DX-3 and DX-5 on 2026-09-07 and was fixed by narrowing DX-5; if it recurs anywhere else,
  the fix is a boundary note in both, or a retirement.
- **If a scorer needs a formula**, R8's reason was wrong and the centred axis is reconcilable after all.
- **If `contested_by` on DX-5 is never argued in either direction**, the exception was not a ruling but
  a shrug.
- **If a card sits at `verified: false` across the whole corpus indefinitely**, R11 is a disclaimer
  nobody intends to discharge, which is worse than no disclaimer — it launders unreviewed scores as
  honestly-labelled unreviewed scores and then ships them anyway.

---

## 7. Dated revision — 2026-09-07

**KD revised the seven after the first harness was scored against the originals.** Ruling
`2026-09-07-dx-revision`. R7 is not relaxed: it forbids **per-harness** dimensions, and these seven
remain house-owned and applied identically to every harness.

| DX | Was | Is | Kind of change |
|:-:|---|---|---|
| **1** | `operator-scale` · Operator scale | `org-scale` · **Org scale** | Rename. Anchors sharpened; the question is unchanged |
| **2** | `constraint-form` · Constraint form | `weight-class` · **Weight class** | **Re-referent.** Different question, different reads. The old question returns to axis III |
| **3** | `footprint` · Footprint | `surfaces-extendability` · **Surfaces & extendability** | **Widened.** Plugins and hooks are now scored here; a marketplace anchor added at `0` |
| **4** | `domain-breadth` · Domain breadth | `domain-specialization` · **Domain specialization** | **Polarity reversed** — general→specific. Both positioning *and* machinery now required for `+3` |
| **4** *(again, same day)* | `domain-specialization` | `context` · **Context** | **Re-referent.** It measured an instance property — a domain is authored *into* a harness, and R3 wants a harness property. Now reads layer 5, which no dimension read before. Ruling `2026-09-07-dx4-context` |
| **5** | `ecosystem` · Ecosystem | `ecosystem` · Ecosystem | **Narrowed.** Marketplaces and standards move to DX-3; this reads adoption, third-party authorship and longevity only |
| **6** | `ownership` · Ownership | `ownership` · Ownership | Unchanged |
| **7** | `cost-visibility` · Cost visibility | `cost-controls` · **Cost controls & efficiency** | **Widened.** No longer a pass-through: adds efficiency mechanics and model routing to visibility |

**What this invalidated.**

1. **Every fingerprint written before this date.** DX-4's sign is reversed, so a `−2` is now a `+2` and
   the two are not the same claim. DX-2 and DX-7 changed what they measure, so their old values were
   answers to questions no longer asked.
2. **Two `vocabulary.md` rows**, `constraint form` and `footprint`, both CLAIMED on 2026-09-07 and
   retired the same day. Recorded there as retirements rather than deleted, per the standing rule.
3. **Axis VIII's detail-only status** (§3), which DX-2 now reads.
4. **The one scored harness.** Claude Code was re-scored in the same pass and its card carries both
   fingerprints, so the change is legible rather than silent — see
   [`positioning.md`](positioning.md#2-claude-code).

**What it did not touch.** The ten axes in [`00-README.md`](00-README.md) §3 are unchanged in
definition, anchors and polarity. Only their `Headline` rows moved.

**R11 was added in the same pass** and is not part of this revision's argument — it is a separate
ruling, `2026-09-07-drafted-until-verified`, recorded at §1.

---

*Companions: [`00-README.md`](00-README.md) — the ten axes this reads over ·
[`positioning.md`](positioning.md) — the scored corpus and the rendered cards ·
[`../docs/agents/intake.md`](../docs/agents/intake.md) — how a candidate dimension is recorded and routed ·
[`../comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §1 — the flat
identity table this compresses, kept as the prose inventory it is.*
