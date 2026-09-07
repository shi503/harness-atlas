---
title: "The spectrum sheet — where a harness sits, on ten axes with no good end"
tier: reference
project: harness-atlas
created: "2026-09-04"
status: DRAFT
owner: KD
provenance: DERIVED
---

# The spectrum sheet

**What this is.** A fixed set of ten named continua, each scored `−3…+3` per harness, that compresses a
33-row profile into one scannable fingerprint. It is the third instrument in this repo, and it does a
job the other two cannot.

**Why it is not a grade.** Every axis below has **two live poles and two stated costs**. `+3` on
*operator scale* is not better than `−3`; it is a different harness for a different buyer, and it costs
you solo velocity. An axis where you cannot name what the high end costs you is not a spectrum — it is
a maturity grade wearing a slider, and it belongs in [`../maturity/`](../maturity/), not here.

**Where the form came from.** Directly from the persona sheets: ten `−3…+3` meters, fixed across every
persona, tuned per instance, rendered as sliders beside the long form. The compression is the point —
a reader who will not read 33 rows will read ten sliders. Nothing about the technique is
health-tech-specific; what is specific is *which* axes, and the derivation is in §2.

---

## 0. Three instruments, one separation

| Instrument | Where | Question | Verdict shape |
|---|---|---|---|
| **The grid** | [`../comparisons/02-component-matrix.md`](../comparisons/02-component-matrix.md) · [`04-harness-alignment.md`](../comparisons/04-harness-alignment.md) | *What does it ship?* | `●` `◐` `○` per component |
| **The spectrum sheet** | here | *Where does it sit?* | `−3…+3` per axis, **no good end** |
| **The maturity range** | [`../maturity/`](../maturity/) | *How are we doing?* | 1–6, **minimum governs** |

The grid says a harness has enforcement. The sheet says whether that enforcement is prose, a gate the
model can route around, or a control outside the prompt. The range says whether your team is good
enough yet. **Only the third one grades**, and it grades a team, not a harness.

**Vocabulary note — not "the heuristics".** In [`../comparisons/2026-08-research/05-harness-factors.md`](../comparisons/2026-08-research/05-harness-factors.md)
and in the outside literature (compaction rules, sandboxing by default, bounded iteration), a
*heuristic* is an architectural **rule you hold**. This sheet is a **measurement you take**. Reusing the
word would break the teardown skill's own rule 3. Proposed ledger row: `spectrum` → *a named continuum
with two live poles, scored per harness* → ours → not a component, an instrument.

---

## 1. Requirements — what makes an axis admissible

Derived from first principles, then checked against the repo's standing rules. An axis that fails any
of these is rejected, and the rejection is written down.

| # | Requirement | Test | Why |
|---|---|---|---|
| **R1** | **Two live poles** | Name a harness *in this corpus* sitting at each end | An axis with a vacant pole is an aspiration, i.e. a grade |
| **R2** | **Both costs statable** | Fill `cost_of_plus` **and** `cost_of_minus` | The anti-grade test. Enforced by the schema: a definition missing either field is not a spectrum |
| **R3** | **Derivable from the profile** | Scoreable from §B / §C / §D of an existing profile, with **no new research** | Makes the sheet backfillable across 11 profiles for the price of reading them. An axis needing fresh vendor reads is a 34th component request, not an axis |
| **R4** | **Evidence per score** | Every non-null value names the §B rows or §C primitives it came from, and carries `✅ ◐ ⚠️` | Same mark vocabulary as the profiles. No unmarked claims |
| **R5** | **Absence is recorded, never inferred** | Unscoreable ⇒ `value: null` **plus** the pages checked | The repo's standing rule, applied to scores. A missing score is never a `0` |
| **R6** | **It discriminates** | ≥3 distinct values across the scored corpus — **or** its flatness is a published finding, named | A flat axis is noise, unless the flatness is the point (see `cost-visibility`) |
| **R7** | **House-owned and fixed** | The same ten for every harness; no per-harness axes, ever | A harness that "needs its own axis" is telling you the sheet is wrong. Fix the sheet in a dated revision; do not fork it |

**On the count.** Ten, matching the persona sheets — not because ten is principled, but because ten
sliders is the readable limit and the precedent is yours. Unlike a primitive set, there is no 5–7 rule
here: this is an instrument, not an authoring surface. Three more axes sit on probation in §4.

---

## 2. The schema

Two blocks. The **definition** block lives here, once. The **position** block is authored per harness.

### 2.1 Definition — one per axis, in this file

```yaml
- id: operator-scale              # kebab-case, stable, never renamed (retire and supersede instead)
  name: "Operator scale"
  question: "Who is this harness for?"
  shape: polar                    # polar → the sign is a position, neither end better
                                  # centred → 0 is the healthy place, |value| is distance from it
  poles:
    minus: "single-operator"
    plus:  "multi-tenant"
  anchors:                        # only −3 / 0 / +3 are defined; ±1, ±2 are interpolations
    "-3": "…"
    "0":  "…"
    "+3": "…"
  evidence_rows: ["10a", "10b", "5b", "6c", "4b"]   # §B component ids the score is read from
  corpus_anchor:                  # R1 — a real harness at each end, cited
    minus: "OpenClaw — 'designed for a single operator'"
    plus:  "QM — per-scope rooms and adapters"
  cost_of_plus:  "…"              # R2 — mandatory, both
  cost_of_minus: "…"
  dual_allowed: false             # true only where skill rule 7 applies (two altitudes both true)
  status: core                    # core | probation | retired
```

### 2.2 Position — one block per harness

Authored at teardown time (a new §G in Template A) or backfilled from an existing profile.

```yaml
spectrums:
  schema_version: 1
  harness: codex-cli
  profile: content/codex.md
  scored: "2026-09-04"
  scorer: KD
  positions:
    - id: operator-scale
      value: -3                   # integer −3…+3, or null
      mark: direct                # direct ✅ | relayed ◐ | unverified ⚠️
      evidence: ["§B 10b", "§C refusal list"]
      because: "No tenancy object anywhere; settings are per-machine."   # ≤25 words
    - id: loop-ownership
      value: 0
      dual: 3                     # second position, only where dual_allowed: true
      dual_because: "Hosts other loops and installs into them — both evidenced, skill rule 7."
      mark: direct
      evidence: ["§A altitude", "§B 2a"]
      because: "Ships adapters for other runtimes and an app-server of its own."
    - id: cost-visibility
      value: null                 # R5 — never a 0
      unscored_because: "No telemetry or billing page exists at the read commit."
      pages_checked: ["DOCS/configuration", "REPO/README", "REPO/docs/"]
```

### 2.3 Field rules

| Field | Rule |
|---|---|
| `value` | Integer `−3…+3`, or `null`. **Never `0` to mean "unknown"** — `0` is a claim that the harness sits in the middle |
| `mark` | Mirrors the profile's own marks. A score inherits the **weakest** mark of the rows it rests on |
| `evidence` | Non-empty whenever `value` is non-null. Points at §B row ids or §C primitive names — **never at a URL**; the profile already holds the citation |
| `because` | One sentence, ≤25 words. If it needs two, the axis is doing two jobs |
| `unscored_because` + `pages_checked` | Both mandatory when `value: null`. This is the `○` rule from the grids, verbatim |
| `dual` / `dual_because` | Permitted only where the definition sets `dual_allowed: true`. Today: `loop-ownership` only |
| `scored` / `scorer` | A score is dated and attributed. Re-scoring appends a dated note; it does not overwrite |

---

## 3. The ten axes

`shape: polar` unless marked. Anchors given at `−3 · 0 · +3`.

### I · Operator scale — *who is this harness for?* `polar`

| | |
|---|---|
| **−3** | Single operator, stated. Nothing in the design contemplates a second person |
| **0** | Shareable by convention. A second person can copy the files; no mechanism knows they exist |
| **+3** | Multi-tenant. Named operators, scopes or rooms, per-tenant policy the harness itself enforces |
| **Rows** | `10a` `10b` `5b` `6c` `4b` |
| **Anchors** | `−3` OpenClaw, *"designed for a single operator"* · `+3` QM's per-scope rooms |
| **Cost of +3** | Every feature must be scoped before it ships; solo velocity drops |
| **Cost of −3** | The second-user bottleneck — coordination, visibility, review, shared context |

This is the axis KD named ("team size"), and it is the spine of
[`05-harness-factors.md`](../comparisons/2026-08-research/05-harness-factors.md) §2's SOLO → TEAM →
MULTI-TEAM → ORG rendering. That rendering is the fuller reading; this is its compression.

### II · State durability — *what survives the process?* `polar`

| | |
|---|---|
| **−3** | Ephemeral. Context window only; a crash loses the run |
| **0** | File-backed and local. Transcripts and session files on one machine, resumable by their author |
| **+3** | Durable and queryable. State in a store any authorized session can resume, query and join |
| **Rows** | `5a` `5b` `7a` `8b` |
| **Anchors** | `+3` beads — dependency-aware task graph in a Dolt SQL database, atomic claiming |
| **Cost of +3** | A schema to migrate and a store to run; state outlives the reason it was written |
| **Cost of −3** | No resumption, no audit, no second reader |

### III · Binding force — *what actually stops the model?* `polar`

| | |
|---|---|
| **−3** | Prose only. Every rule is an instruction the model may ignore |
| **0** | A gate exists and the model can reach it. Hooks or deny lists that auto modes bypass |
| **+3** | Mechanical. At least one control outside the prompt that no mode bypasses |
| **Rows** | `2b` `2c` `4b` `3a` |
| **Anchors** | `+3` Macedo's **T4**, stated as a *membership condition* for being a harness at all |
| **Cost of +3** | False stops and friction; the escape hatch becomes a design problem of its own |
| **Cost of −3** | Every guardrail is a suggestion |

Factor `VII`. The `0` notch is the *doctrine ≠ code* case the teardown skill names as the normal case —
the docs say a gate exists; the code says it was bypassed. Score the code.

### IV · Loop ownership — *how much of the loop do you own?* `polar` · `dual_allowed: true`

| | |
|---|---|
| **−3** | Installs into someone else's loop — a process layer |
| **0** | Hosts loops it does not own — a gateway, shipping adapters both ways |
| **+3** | Runs the loop itself — a runtime |
| **Rows** | `0a` `2a` `3c`, plus §A's loop question |
| **Anchors** | `−3` FRACTAL, LoomWarp · `0` Hermes, OpenClaw · `+3` Codex CLI, Pi, OpenCode |
| **Cost of +3** | You own model churn, every adapter, and every regression in the substrate |
| **Cost of −3** | You inherit every host's limits and cannot fix them |

The altitude taxonomy made ordinal. **Dual scoring is required, not tolerated**: Gas City both hosts
loops and installs into them, and skill rule 7 says record both. A *hosted product* (loop not
user-visible) scores `+3` with `loop_visible: false` — it is not a fourth notch.

### V · Substrate portability — *what does moving cost?* `polar`

| | |
|---|---|
| **−3** | Bound. One model family, one host; moving is a rewrite |
| **0** | Configurable. Provider swap in config, feature parity uneven |
| **+3** | Protocol-mediated. MCP/ACP/SDK, adapters in both directions; moving is a config line |
| **Rows** | `0a` `2a` `3e` |
| **Cost of +3** | Lowest-common-denominator features; no substrate-specific depth |
| **Cost of −3** | Lock-in — but you get everything the substrate has |

`J13`'s finding applies directly: **adapters are the maturity tell — you write one only after the first
choice hurt.** A `+3` here is usually evidence of a past `−3`.

### VI · Primitive discipline — *how many sanctioned ways?* **`centred`**

| | |
|---|---|
| **−3** | Refusal list. Publishes what it will not ship; the set is narrow on purpose |
| **0** | Healthy. 5–7 named primitives, and the set forces a choice |
| **+3** | Accommodation. 12+, or no published set — every request became a unit |
| **Rows** | §C count and verdict, directly |
| **Cost of +3** | The agent invents a fourth way because three exist (factor `I`) |
| **Cost of −3** | Use cases it simply cannot serve, and will not |

**The one centred axis in the core set.** The repo already holds the opinion — *5–7 healthy · 12+
accommodation failure · refusal list* — so here `|value|` is distance from health, not a position. It
is included because it is free: §C already produces the verdict, and the sheet only has to carry it.

### VII · Control posture — *what may run unattended?* **`centred`** ⚠️ *shape contested*

| | |
|---|---|
| **−3** | Approval-first. Every state-changing action needs a human yes |
| **0** | Asymmetric. Read-only auto-approved; irreversible operations gated |
| **+3** | Autonomous. Bounded unattended runs are the default path |
| **Rows** | `3a` `2c` `9c` `7a` |
| **Cost of +3** | Blast radius, and a bill nobody watched accrue |
| **Cost of −3** | The human is the throughput ceiling |

Marked `centred` because the outside literature converges on the asymmetric boundary as the answer.
**This is the one shape call in the sheet that is a judgement, not a reading** — if `+3` is a
legitimate destination rather than an overshoot, this axis is `polar` and the marking is wrong. Flagged
for ruling.

### VIII · Proof ceremony — *how is completion known?* `polar`

| | |
|---|---|
| **−3** | Assertion. The record is the chat transcript |
| **0** | Artifacts on demand. Logs and receipts exist; nothing requires one per unit |
| **+3** | Receipt-bound. No unit closes without an artifact, and absences are asserted, not omitted |
| **Rows** | `8b` `8c` `9d` |
| **Anchors** | `+3` FRACTAL's HANDOFF, whose *"not completed"* section must say `None` rather than be skipped |
| **Cost of +3** | A ceremony tax on every one-line change |
| **Cost of −3** | *"It said it was done."* |

Factor `X`.

### IX · Improvement loop — *what happens to a lesson?* `polar`

| | |
|---|---|
| **−3** | Static. The harness is identical after a thousand runs |
| **0** | Capture without promotion. Lessons are written down; nothing installs them |
| **+3** | Compounding. A lesson becomes an authored capability by a defined path |
| **Rows** | `9a` `9d` `9e` `5c` |
| **Anchors** | `+3` finding-classes promoting into standards; the llm-wiki pattern |
| **Cost of +3** | Curation burden, drift, and rules that outlive the reason they were written |
| **Cost of −3** | The same lesson relearned every quarter |

Factor `XI`, and Karpathy's test: ***does knowledge compound, or does it just get retrieved?***

### X · Cost visibility — *what did the work cost, and did anyone act on it?* `polar`

| | |
|---|---|
| **−3** | Unmetered. Nothing records what a run cost |
| **0** | Metered. Tokens and time surfaced per session, joined to nothing |
| **+3** | Attributed. Cost per unit of work, joined to its outcome |
| **Rows** | `8d` `8c` `8b` |
| **Cost of +3** | Instrumentation that only pays for itself at org scale |
| **Cost of −3** | A system nobody can justify continuing to buy |

Factor `XIV`, and the sharpest finding in the research: practitioners are saturated with cost while **no
published harness taxonomy gives it a row**. **This axis is expected to fail R6** — near-total clustering
at `−3`. It is retained under R6's exemption, because an empty column here is the same kind of finding
the `Context adapter` row is in the component matrix: *the emptiness is the result*. If it fills in, the
landscape moved.

---

## 4. Probation, promotion, retirement

Three axes are argued but not admitted. A probation axis is scored in the sheet with
`status: probation` and is **excluded from the fingerprint** until promoted.

| Candidate | Poles | Why not yet |
|---|---|---|
| `surface-breadth` `11a` | one surface ↔ many, with a stated source of truth | Plausible, but `11a` in the grid may already carry it. Needs an R6 check before it earns a slider |
| `routing-determinism` `3b` | the model decides ↔ a resolver decides | Factor `II`, and **absent from every published harness taxonomy** — which is an argument for it. Held back only because most profiles will score `−3` and it may duplicate X's problem |
| `knowledge-depth` `5c` | none ↔ curated, retrievable, cited | `5c` is the only component meeting the `shipped` horizon rule; may be better served by the grid |

**Promotion.** A probation axis joins the core when it takes ≥3 distinct values across the scored
corpus (R6) and both cost fields are filled (R2). Promotion is a dated revision of this file.

**Retirement.** A core axis whose scored corpus lands within one notch is retired to probation with a
dated note — **unless** its flatness is published as a finding, in which case the finding is named in
the axis and it stays. Retired ids are never reused (R7).

---

## 5. Producing and placing a sheet

**Where it lives.** `spectrums/positions.md` — one table, harnesses down, the ten axes across, mirroring
the grid genre. The YAML position blocks are the source of truth and sit beside it as
`spectrums/positions/<harness>.yaml`. This keeps Template A untouched for the eleven existing profiles.

**How it is authored.**

- **Backfill** (existing profiles): read §A–§D of the profile only. R3 guarantees this is sufficient.
  If it is not, the axis is wrong, not the profile.
- **New teardowns**: a §G in Template A — *the position block, and nothing else*. It comes after §F, so
  it is scored from a finished profile rather than steering one. **Skipped under `--sanity`**, like the
  other four downstream obligations.

**Obligations on adding a sheet** — the same shape as the teardown skill's step 9, and for the same
reason (ISSUE-001 exists because obligations were advice):

1. a row in `spectrums/positions.md`;
2. the YAML block committed beside it;
3. any axis scored `null` names its pages checked;
4. a link from the profile to its row, and back.

**Not yet wired.** This file is not linked from [`../index.md`](../index.md) or `CLAUDE.md` — both are
Tier-0/1 and the instrument is unratified. Two lines, on KD's word.

---

## 6. What would falsify this

Stated so it can fail, per the house rule that a factor nobody could disprove is a slogan.

- **If two harnesses with identical fingerprints turn out to be obviously different choices**, the ten
  axes are the wrong ten and the compression is lossy in the place that mattered.
- **If scorers disagree by more than one notch on the same profile**, the anchors are underspecified —
  the fix is more anchor text at `±1`/`±2`, not a longer sheet.
- **If backfilling a profile requires opening a vendor source**, R3 is violated and that axis is a
  component request in disguise.
- **If no reader ever uses the sheet to choose or reject a harness**, it is decoration — the same
  charge factor `XIV` levels at cost accounting that changes no decision.

---

## 7. Open — the fit function

**Deliberately unanswered.** Ten positions do not compose into an answer, and this file does not claim
they do. Three candidate readings, and the choice is a ruling, not a derivation:

| Reading | Rule | What it costs |
|---|---|---|
| **Fingerprint only** | No aggregation. You read the shape and decide | Honest; gives a buyer no ranking at all |
| **Distance to a target** | The buyer states their own ten, and harnesses sort by distance | Powerful, and requires the buyer to know themselves |
| **Minimum governs** | Borrow the maturity range's rule — the weakest axis caps the read | Consistent with the house, but re-introduces a *good end*, which R2 exists to forbid |

The third is the tempting one and probably the wrong one: *minimum governs* only makes sense on axes
that have a better end, and eight of these ten do not.

---

*Companions: [`../comparisons/2026-08-research/05-harness-factors.md`](../comparisons/2026-08-research/05-harness-factors.md) — the fourteen rules these axes measure against · [`../skills/harness-teardown/SKILL.md`](../skills/harness-teardown/SKILL.md) — §A's inclusion test, which axes I–III make continuous · [`../maturity/AI-Native-Organizational-Maturity-Framework.md`](../maturity/AI-Native-Organizational-Maturity-Framework.md) — the instrument that does grade*
