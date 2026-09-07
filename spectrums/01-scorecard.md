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
someone deciding whether to keep reading. The compression is uneven on purpose: the layer **compresses
in the middle** (DX-2, DX-3, DX-5 each read several sources) and **passes straight through at the ends**
(DX-1 ≡ axis I, DX-7 ≡ axis X). A reader who notices that two dimensions compress nothing and suspects
padding should find the answer here rather than infer one.

---

## 1. Requirements — three rules on top of R1–R7

[`00-README.md`](00-README.md) §1's R1–R7 govern every dimension below, with the exception R9 names.
These three are the scorecard's own.

### R8 · Authored, never computed

**A dimension's value is read by a person from the sources in its `reads:` block.** No dimension is an
average, a sum, or any function of axis values. `reads:` names what a scorer *opens*, never what a
formula *consumes*.

**The reason, stated here because a rule without its reason gets optimised away.** Axes VI and VII are
`shape: centred` — `0` is the healthy place and `|value|` is distance from it, not a position. No
arithmetic maps a centred axis onto a polar one. `VI = +3` means **accommodation failure, twelve or
more sanctioned ways, undisciplined**; a roll-up that averaged it into DX-2 *Constraint form* would
read it as "highly structured" and report the exact opposite of the truth. The next contributor who
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
from the repo's standing rule that absence is recorded, never inferred. Two live cases appear on the
first harness scored, so this is not a hypothetical.

---

## 2. The schema

### 2.1 Definition — one per dimension, in this file

```yaml
- id: operator-scale              # kebab-case, stable, never renamed (retire and supersede instead)
  dx: 1                           # display order. The id is stable; dx may be re-ordered
  name: "Operator scale"
  question: "How many people can it serve at once?"
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
```

### 2.2 Position — the `scorecard:` block

Lives in the same `positions/<harness>.yaml` as the ten axes, under a sibling key. Field rules are
[`00-README.md`](00-README.md) §2.3's, unchanged — including `split:` and `gap:`.

```yaml
  scorecard:
    - id: constraint-form
      dx: 2
      value: 1
      mark: direct
      reads_opened:
        axes:    ["binding-force: +3", "primitive-discipline: +1 (inverted)"]
        profile: ["2c", "3a", "2b", "§7 Q3"]
      because: "Mechanical at the tool-call boundary, prose everywhere upstream of it."
```

### 2.3 Glyphs — and where they may appear

| Glyph set | Means | Lives only in |
|---|---|---|
| `───●───` | a **position** on a polar dimension. The sign is a place, not a score | `spectrums/positions.md` |
| `▰▰▰▰▱` | a **fill** on a graded dimension. More is more | `spectrums/positions.md` |

**These never leave `spectrums/`.** The repo already keeps two mark systems apart — coverage
`● ◐ ○ n/a` in the grids and a profile's §4, source `✅ ↪ ⚠️` in a profile's §6 onward — and a third
pairing loose in the corpus would undo that. The distinction *between* the two sets above is the same
move the house already makes: a different glyph vocabulary is how a different kind of claim announces
itself.

---

## 3. What the scorecard does not carry

**Five of the ten axes feed no headline cell.** They are not dropped and not left unscored.

> **The scorecard is a face, not a filter.** All ten axes are scored for every harness, always, in
> `positions/<harness>.yaml`. Detail-only governs **display**, never scoring. A harness with a
> scorecard but an unscored axis is malformed.

| Axis | Why it has no headline cell | Read it at |
|---|---|---|
| **II** State durability | Splits across DX-1 and DX-6 without belonging to either. A headline cell would have to name a place, not a position | [§3 II](00-README.md) |
| **IV** Loop ownership | `dual_allowed: true` — it can hold two values at once, and **a headline cell structurally cannot**. Not a taste call | [§3 IV](00-README.md) |
| **VII** Control posture | *What may run unattended* is orthogonal to DX-2, not a component of it: a deterministic pipeline can run unattended, and a prose-led harness can be approval-first. Its shape is also still contested | [§3 VII](00-README.md) |
| **VIII** Proof ceremony | *How is completion known* is an analyst's question; no DX reader arrives with it | [§3 VIII](00-README.md) |
| **IX** Improvement loop | Same, and it is the axis most likely to move as a harness matures — so a headline cell would go stale fastest | [§3 IX](00-README.md) |

Each of the ten axes carries a reciprocal **Headline** row in [`00-README.md`](00-README.md) §3, so
the fact is recorded in the file that owns the axes and not only in the file that declines them.

---

## 4. The seven dimensions

`shape: polar` unless marked. Anchors at `−3 · 0 · +3`.

### DX-1 · Operator scale — *how many people can it serve at once?* `polar`

| | |
|---|---|
| **−3** | Single operator, stated. Nothing in the design contemplates a second person |
| **0** | Shareable by convention. A second person can copy the files; no mechanism knows they exist |
| **+3** | Multi-tenant. Named operators, scopes or rooms, per-tenant policy the harness enforces |
| **Reads · axes** | `I operator-scale` — **pass-through** |
| **Reads · profile** | §7 *"does it serve more than one person"* · `10b` `10a` `3d` |
| **Cost of high** | Every feature must be scoped before it ships; solo velocity drops |
| **Cost of low** | The second-user bottleneck — coordination, visibility, review, shared context |

### DX-2 · Constraint form — *is intent imposed by inference, or by machine?* `polar`

| | |
|---|---|
| **−3** | Prose-led. Every rule is an instruction the model may ignore |
| **0** | Mixed. A gate exists at some boundaries; the rest is instruction |
| **+3** | Machine-led. Controls outside the prompt decide, and no mode bypasses them |
| **Reads · axes** | `III binding-force` · `VI primitive-discipline` **⟲ inverted** |
| **Reads · profile** | `2b` `2c` `3a` `3e` · §7 *"does it bind mechanically, or only by prose"* |
| **Cost of high** | False stops and friction; the escape hatch becomes a design problem of its own |
| **Cost of low** | Every guardrail is a suggestion |

> **`reads.note` — mandatory, and the most important line in this file.** Axis VI is `centred`; it is
> read **for direction only and inverted**. `VI = +3` (accommodation — twelve or more, or no published
> set) is evidence of a **low** DX-2: many sanctioned ways means the model chooses. `VI = −3` (a
> published refusal list) is evidence of a **high** DX-2. Axis VII is `centred` and is **not read here
> at all** — see §3. This note is what makes "authored" a design rather than an excuse.

**On the name.** Not *harness posture*: `posture` is occupied three ways — the *Permission posture*
synonym set and QM's own primitive `posture` in [`../vocabulary.md`](../vocabulary.md), and axis VII
*Control posture*. Not *structured output*, which in this repo means **the one artifact a harness
optimises for**, not the JSON-schema sense. The low anchor says *prose-led*, matching axis III's own
`−3 Prose only`; the repo has no term *prompt-only*.

### DX-3 · Footprint — *how much of the working world does it touch?* `polar`

| | |
|---|---|
| **−3** | One surface, one place work happens. A terminal, and nothing else |
| **0** | Two or three surfaces, or one surface plus a declared execution environment |
| **+3** | Many surfaces with a stated source of truth, several execution environments, delivery and telemetry out |
| **Reads · axes** | `surface-breadth` *(probation — [`00-README.md`](00-README.md) §5)* |
| **Reads · profile** | `11a` `6b` `6d` `8c` `1a` |
| **Cost of high** | N surfaces to keep true, and *"which version is true"* becomes a real question |
| **Cost of low** | It cannot meet people where they already work |

**This dimension is the strongest live argument for promoting `surface-breadth` out of probation** —
its left half is that axis and its right half is grid rows. Promotion still needs the R6 check
[`00-README.md`](00-README.md) §5 asks for, which is untestable until more than one harness is scored.

### DX-4 · Domain breadth — *one named use case, or general?* `polar`

| | |
|---|---|
| **−3** | Names one domain in its own first sentence, and refuses adjacent ones |
| **0** | Built for one domain, usable outside it without ceremony |
| **+3** | General-purpose by construction; the domain is whatever the operator brings |
| **Reads · axes** | — none |
| **Reads · profile** | §7 *"what it says it is, verbatim"* · the `Genre` row · §5's refusal list, if any |
| **Cost of high** | Shallow everywhere; no domain-specific depth anyone would pay for |
| **Cost of low** | Adjacent use cases it cannot serve, and a market it has chosen not to have |

**Prior art, and why it is not reused as a name.**
[`../comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §1 carries a
categorical `Genre` row — *"coding, terminal-first"*, *"personal assistant, channel-first"* — and its
§3.1 argues genre **predicts which components are `●`**. That row stays exactly as it is: reusing the
word `Genre` for a `−3…+3` scale would borrow a word and change its referent. This dimension is the
continuous reading of the same observation, and cites it.

### DX-5 · Ecosystem — *how much world exists around it?* **`graded †`**

| | |
|---|---|
| **−3** | Tribal. Proprietary or unshared; no extension point, no second author |
| **0** | Extendable. A published extension mechanism, few or no third-party extensions |
| **+3** | Wide adoption and an extension market — registries, marketplaces, or a co-published standard |
| **Reads · axes** | — none |
| **Reads · profile** | §7 Stars · Repo created · First/Latest release · `4a` `2a` `3e` |
| **Cost of low** | You build every integration yourself, and nothing you build travels |
| **Cost of high** | **absent — see `because_grades`** |

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

### DX-7 · Cost visibility — *what did it cost, and did anyone act on it?* `polar`

| | |
|---|---|
| **−3** | Unmetered. Nothing records what a run cost |
| **0** | Metered. Tokens and time surfaced per session, joined to nothing |
| **+3** | Attributed. Cost per unit of work, joined to its outcome |
| **Reads · axes** | `X cost-visibility` — **pass-through** |
| **Reads · profile** | `8d` `8c` `8b` |
| **Cost of high** | Instrumentation that only pays for itself at org scale |
| **Cost of low** | A system nobody can justify continuing to buy |

**This dimension is about visibility, not price.** *"Is it expensive to run"* is a different question,
it grades, and **no profile carries a price** — so it fails R3 and is out of scope by construction.
Published 2026 harness benchmarks report the same task costing `$0.07`–`$2.26` on harness choice alone;
that spread is a reason this dimension exists, not a thing this dimension measures.

---

## 5. Probation, promotion, retirement

Identical in shape to [`00-README.md`](00-README.md) §4, and for the same reason. A probation dimension
is defined here with `status: probation`, is **excluded from the fingerprint**, and is scored so that
R6 has data to judge it on.

| Candidate | Ends | Why not yet |
|---|---|---|
| *(none)* | | The seven are KD's, 2026-09-07. The first candidate arrives from a scorer, not from this file |

**Promotion** — a candidate joins the seven when it takes ≥3 distinct values across the scored corpus
(R6) and satisfies R2 or R9. Promotion is a dated revision of this file plus a ruling.
**Retirement** — a dimension whose scored corpus lands within one notch retires to probation with a
dated note, unless its flatness is published as a finding. **Retired ids are never reused.**
Candidates are recorded here and routed by [`../docs/agents/intake.md`](../docs/agents/intake.md).

---

## 6. What would falsify this

- **If a reader takes longer to read seven dimensions than ten axes**, the compression failed and the
  layer is decoration.
- **If two harnesses share a fingerprint and are obviously different choices**, the seven are the wrong
  seven — the same falsifier [`00-README.md`](00-README.md) §6 states for the axes, and it fires here
  first because seven values collide sooner than ten.
- **If a scorer needs a formula**, R8's reason was wrong and the centred axes are reconcilable after all.
- **If `contested_by` on DX-5 is never argued in either direction**, the exception was not a ruling but
  a shrug.

---

*Companions: [`00-README.md`](00-README.md) — the ten axes this reads over ·
[`positions.md`](positions.md) — the scored corpus and the rendered cards ·
[`../docs/agents/intake.md`](../docs/agents/intake.md) — how a candidate dimension is recorded and routed ·
[`../comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §1 — the flat
identity table this compresses, kept as the prose inventory it is.*
