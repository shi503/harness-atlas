---
title: "The HORIZON axis — what ships, what is claimed, and what we are betting on"
tier: spec
project: harness-atlas
created: "2026-08-30"
status: ARCHIVED
owner: KD
extends: archive/v0/02-functions.md
applied: true
provenance: AUTHORED
---

# The HORIZON axis

**What this is.** A fourth axis on the model — after `FUNCTION`, `SCOPE` and `PROVIDER` — recording
**how established each thing in the framework is**, with an evidence rule per value.

> ✅ **Applied 2026-09-01.** All 33 components in [`00-README.md`](./00-README.md) carry a horizon
> marker — `shipped` 12 · `emerging` 13 · `bet` 7 · `claimed` 1. This file argues the axis and works
> four examples, now confirmed against the live components. What applying it actually meant — and
> what is still not true of it — is §5.

---

## 1. The problem it solves

**The model mixes tenses in one list and cannot tell the reader which is which.**

The clearest instance is the band inventory under discussion in
[`11-architecture.md`](../../v0/11-architecture.md) §1, where `Configuration` — which ships in every harness on
the market — sits as a numbered peer of `Anti-fragile Lifecycle`, which ships nowhere and is a
position we hold. Both are rendered as layers. A reader cannot tell that one is an observation and the
other is a wager.

**This is not a cosmetic problem, because the framework's sharpest claims are claims about absence.**
*"Routing, cost and distribution are absent from every published taxonomy."* *"Nobody names the pillar
that decides the verdict."* *"Zero of seven peers ship the standards tier."* Every one of those is
unreadable without knowing whether the ground is unclaimed **yet** or unclaimed **in principle** — and
the corpus has already had to narrow the provenance claim three times, each time because a reader
could reasonably have taken *"unclaimed"* to mean the stronger thing.

**And the discipline already exists — for competitive claims only.**
[`references/comparisons/00-README.md`](../../../comparisons/00-README.md) §6 publishes a
re-check schedule with dates and falsification conditions; §F-4 carries three dated narrowings.
**HORIZON is that discipline applied to the architecture instead of only to the landscape.**

---

## 2. The four values

Each value carries an **evidence rule**, modelled on the sourcing rule in
[`02-component-matrix.md`](../../../comparisons/02-component-matrix.md) §1 — *every `●` traces
to a cited primitive in that system's teardown.* A marker without its evidence is not a marker.

| Horizon | Means | Evidence required to claim it |
|---|---|---|
| **`shipped`** | ≥2 peers ship it as a **named primitive** | **two teardowns cited**, by file and section |
| **`emerging`** | 1–2 peers, **no convergence on vocabulary** | name them **and** name their disagreement |
| **`claimed`** | named publicly, **no shipped implementation** | cite the claim **and** cite the absence |
| **`bet`** | ours, **uncorroborated** | say so out loud |

**Three rules govern the set.**

**The bar is two, and it is inherited.** `shipped` requires two peers because that is the
corroboration standard the corpus already uses to promote a concept — `00-README.md` §F-2: *"a
first-class primitive in at least two peer systems — the same corroboration standard that promoted
Substrate and Surfaces in the first place."* HORIZON does not invent a threshold; it reuses one.

**`emerging` is defined by vocabulary, not by count.** The distinguishing property is that peers have
built the thing and **have not agreed what to call it**. That is a different and more useful signal
than "only two have it," because disagreement about the name is what tells you the concept has not
stabilised — and it is precisely where a framework can contribute a word.

**A marker can only ever be downgraded by evidence, never upgraded by argument.** `bet` → `claimed` →
`emerging` → `shipped` requires new citations. The reverse — discovering that something we called
`shipped` has one peer, not two — requires only a correction. **The axis is asymmetric on purpose:
it is easier to lose ground than to take it.**

---

## 3. Four worked examples

Drawn from what the 2026-08-30 source-read verified, so each example passes its own evidence rule.
**All four are now confirmed against the live components** — the ID has changed for three of the
four, under the rebuild's supersession rule (`CROSSWALK.md` §2); the marker has not changed for any
of them.

### 3.1 `5c` Knowledge (formerly `F3 Context`) → **`shipped`**

Two peers, both cited, both shipping context assembly as a named primitive:

- SageOx's `ox agent prime` — [`references/comparisons/systems/sageox.md`](../../../comparisons/systems/sageox.md); the claim it forced is recorded at `00-README.md` §F-4
- HumanLayer's `thoughts` — [`references/comparisons/systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §4; a separate git repo mounted into every code repo, hook-enforced, generating the harness's own instruction file

**Rule satisfied:** two teardowns, by file and section.

**Confirmed live:** [`content/component-15-knowledge.md`](../../../components/5c-knowledge.md) carries
`Horizon: shipped` and cites this section by number. `CROSSWALK.md` §2 decomposed `F3 Context` three
ways under `O-3` — `F3.1` `5a` Individual Memory · `F3.2` `5b` Team Memory · `F3.3` `5c` Knowledge —
and this example's evidence, context assembly as a named primitive, is the `5c` third.

### 3.2 `6b` Infrastructure (the `Workspaces` candidate) → **`emerging`**

Three peers have built it. **All three call it something different**, which is the value's defining
condition:

| Peer | Its name | Source |
|---|---|---|
| QM | `scope` — memory, files, keychain, permissions, crons, **durable sandbox** | [`systems/qm.md`](../../../comparisons/systems/qm.md), "The primitives" |
| HumanLayer | **worktree** — N repos + a coordination repo on one branch | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §5 |
| Deep Agents | `SandboxBackendProtocol.id` — the handle a session reattaches to | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §2 |

**Rule satisfied:** three peers named, and their disagreement named — *scope* vs *worktree* vs
*backend id* are three words for an addressable, durable, per-task work environment.

**Why the marker mattered here.** Workspaces was, at the time, the leading candidate for a new band.
It became layer 6, "Workspaces ⟳" — and this specific claim, an addressable, durable, per-task work
environment, landed at [`6b` Infrastructure](../../../components/6b-infrastructure.md), whose own
`Horizon:` line cites this section by number with the same three peers and the same three names.
`CROSSWALK.md` §2.2 argues `6b` as new against exactly this evidence. Layer 6 did not converge on one
word for everything in it either — `6a` Product, `6c` Estate and `6d` Delivery are three more
components under the same layer, each carrying its own marker (`bet`, `emerging`, `bet`). The
`emerging` marker was right about the vocabulary and right about the stakes: the object was real
before the word was, and proposing the word turned out to be the contribution.

### 3.3 The provenance → outcome join, inside `8b` Evidence (formerly `F7`) → **`claimed`**

The claim: Govindarajan (OpenAI), the **run receipt** — *"a model proposes, the harness commits, and
the receipt proves it"* — recorded at `00-README.md` §F-4, with the note that **no shipped
implementation was demonstrated.**

The absence, verified at source and this is the part that makes the marker honest: Deep Agents'
`openwiki/.claims` ships content hashing, version pinning and reconstruction over 515 claims —
**three of the four properties** — and has neither owner attribution nor a join to outcome. It pins
what a *document* asserts about a repository; the join is over a *run*.
[`08-humanlayer-and-deepagents-recheck.md`](../../../comparisons/2026-08-research/08-humanlayer-and-deepagents-recheck.md) §2.

**Rule satisfied:** the claim cited, and the absence cited — including the nearest thing to an
implementation and exactly where it stops.

**And this is the example that shows why the axis pays for itself.** Marked `claimed`, the row is
readable and defensible. Left unmarked, it reads as either *"nobody has thought of this"* (false since
the keynote) or *"nobody has built it"* (true, and much narrower than the sentence suggests).

**Confirmed live:** [`content/component-22-evidence.md`](../../../components/8b-evidence.md) cites this
section verbatim — *"The join to context is a separate marker and stays `claimed` —
`12-horizon.md` §3.3."* `8b` Evidence's own base capability, the ledger and the OTel trace, is marked
`shipped`; this join is the one sub-claim inside it that is not, and the component file keeps the two
markers distinct rather than letting the stronger one overwrite the weaker.

### 3.4 `9d` Anti-fragile Lifecycle → **`bet`**

No peer ships it. No one has named it on a stage. It is a position about where the field goes, held by
us.

**Rule satisfied:** said out loud.

**Confirmed live:**
[`content/component-28-anti-fragile-lifecycle.md`](../../../components/9d-anti-fragile-lifecycle.md)
carries `Horizon: bet` under the same name and the same reasoning — no peer ships a closed improvement
loop; LangSmith Engine, the nearest, proposes rather than promotes. `CROSSWALK.md` §2.2 records `9d` as
**contested** (`O-4` demotes it from umbrella to peer of Learning / Rituals / Cadence) — a live dispute
about the component's shape, not about its marker.

**What `bet` buys.** A bet marked as a bet is a contribution; a bet rendered as a peer of
`Configuration` is an overclaim a reviewer will find in thirty seconds. The corpus already applies
this standard to itself — `00-MAP.md` §1's `AUTHORED` class warns *"the claims we would have to defend
in public. Lead with these. There are fewer than you think."*

---

## 4. Related axes

**HORIZON is the fourth axis, and it composes rather than competes.**

| Axis | Question | Where |
|---|---|---|
| `FUNCTION` | what does it do | [`02-functions.md`](../../v0/02-functions.md) §0.1 |
| `SCOPE` | for whom — `individual \| team × project \| org` | [`02-functions.md`](../../v0/02-functions.md) §0.3 |
| `PROVIDER` | what performs it, against a contract | [`02-functions.md`](../../v0/02-functions.md) §0.4 |
| **`HORIZON`** | **how established is it** | **this file** |

### 4.1 A note on "too many pillars"

Recorded here because it is an axis problem, and the answer already exists.

> KD, 2026-08-30: *"maybe these are too many pillars and some might only be applicable to the team
> context."*

**`SCOPE` is the answer, and the reason it does not feel like one is that its cells are unfilled.**
[`02-functions.md`](../../v0/02-functions.md) §0.3 defines `individual | team × project | org` and requires
*"every provider must declare which cells it serves."* Functions do not currently declare theirs. So
every reader applies every pillar to themselves and reasonably concludes there are too many.

**The diagnosis is therefore not *too many pillars* but *pillars whose scope cells are unstated*.**
`F14 Org` at `individual × project` is genuinely empty — that is information about the model, not a
reason to delete the row. Deleting a pillar because it does not apply at one scope is the error `§0.3`
already argues against: *"a model that treats scope as a property cannot represent that disagreement;
one that treats it as an axis can."*

> **Filling the scope cells is not done in this pass.** It is the cheaper of the two remaining axis
> jobs and should be scheduled ahead of applying HORIZON.

---

## 5. Applied, and what applying it turned out to mean

**The axis was applied.** All 33 components carry a horizon marker, landed in the same pass that filled
the components' bodies — commit `7281d8c`, 2026-09-01, workstreams W3–W4. The result lives in two
places, and they agree:

1. **[`00-README.md`](./00-README.md)**'s 33-row table, `Horizon` column — the single reading surface,
   and the one that carries the census.
2. **Each `content/component-NN-*.md` file**, twice over — a `horizon:` frontmatter key and a body
   `**Horizon:**` line naming the marker, the peers, and the citation the marker rests on.

Confirm with:

```
grep -rn "Horizon:" projects/loomwarp/specs/ projects/loomwarp/references/comparisons/2026-08-research/05-harness-factors.md
```

That now returns a hit in every one of the 33 component files — one `**Horizon:**` line apiece — plus
several inside this file, which discusses the marker by name and so matches its own search; the exact
count here will drift with this file's prose and is not the fact worth fixing on. `05-harness-factors.md`
contributes none — its `Horizon:` slot was never filled. Thirty-three components, thirty-three
component-level hits: the grep is now proof the axis is applied, not proof that it isn't.

**The census, re-summed here rather than trusted from the caption:** `shipped` 12 · `emerging` 13 ·
`bet` 7 · `claimed` 1 — 33 total, matching `00-README.md`'s own count.

**The plan below is kept as the historical record of what this file originally proposed on
2026-08-30 — it is not what happened, and is retained rather than deleted so the supersession is
visible:**

> **Sequence, if it is taken up:**
>
> 1. **Factors first.** Fourteen, and the `Horizon:` slot already exists in the factor template at
>    [`../../EXPLAINER-PLAN.md`](../EXPLAINER-PLAN.md) §3. Each factor already names a source, so
>    the citation work is mostly done.
> 2. **Functions second**, once `F12`–`F16` have bodies — marking a function that has no section is
>    marking a table row.
> 3. **Bands last, or never.** Band structure is unsettled (`11-architecture.md` §6 `OPEN-15…18`), and
>    marking a horizon on a band that may fold into another band is work that gets thrown away.

**What actually happened instead.** The rebuild that produced `CROSSWALK.md` superseded the
seventeen functions with the thirty-three components before this pass ran, so step 2 above was
overtaken by a different rebuild rather than executed. Markers were applied directly to the 33
resulting components, in the same pass that filled their bodies — not sequenced through
factors-then-functions-then-bands. **Factors were never marked**: `05-harness-factors.md`'s
`Horizon:` slot is still empty, confirmed by the grep above matching nothing in that file. **Bands
were folded into the twelve layers by the same rebuild** (`CROSSWALK.md` §2, `OPEN-17` and `OPEN-18`),
so "bands last, or never" resolved to *never* — by supersession, not by choice.

**What is not yet true: the markers are not checked mechanically.** The closing line below used to say
that once every function, factor and band carried a marker *and the markers were checked
mechanically*, this file would retire into the definition of a field rather than a proposal for one.
The first half happened — every component carries a marker. **The second half has not**: guard-gating
is disabled for this phase (the owner's ruling — these are markdown files in ideation, and the six
guard scripts were adding overhead before the shape stabilized). Nothing today mechanically enforces
that a `shipped` row cites two teardowns by file and section, that a `claimed` row cites both the claim
and the absence, or that a downgrade never quietly reverts to an upgrade. §2's rule is a discipline the
components are holding themselves to, not a gate a script holds them to. Say that plainly rather than
let "applied" read as "enforced."

**What would retire this file, restated.** Once guard-gating is re-enabled for this phase and a check
holds every component's marker to its §2 evidence rule, this file becomes the definition of a field
rather than a proposal for one, and its §3 examples remain its test fixtures — now against live
components instead of the pre-rebuild vocabulary they were first written against.

---

*The model: [`02-functions.md`](../../v0/02-functions.md) · The manifesto this feeds:
[`../../EXPLAINER-PLAN.md`](../EXPLAINER-PLAN.md) · The evidence discipline it copies:
[`../../references/comparisons/02-component-matrix.md`](../../../comparisons/02-component-matrix.md) §1
and [`../../references/comparisons/00-README.md`](../../../comparisons/00-README.md) §6*
