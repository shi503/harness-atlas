---
title: "Pre-flight — the decision generator, with the Grid as its input"
tier: spec
project: loomwarp
created: "2026-09-01"
status: DRAFT
owner: KD
wave: W7
extends: archive/v0/05-preflight-spec.md
---

[← 00-README](./00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](./CROSSWALK.md) — the derivation for every component · [the Grid](../../maturity/grid.html) — the instrument this reads

# Pre-flight — the decision generator

**What it is.** A single self-contained HTML page a team runs together. It walks the layers bottom-up,
records what the team chooses, and emits a config that drives installation.

**What it is not.** A funnel. For most components, on most teams, the right answer is a capability that
already exists natively — and the generator must say so plainly. See §7.

**What changed, and it is the whole reason for the rebuild.** The ancestor
([`../archive/v0/05-preflight-spec.md`](../../archive/v0/05-preflight-spec.md), marked ❌ *rebuild*) treated
maturity as a **filter it applied at the end** — Phase 0 collected a self-grade and the questionnaire got
shorter. `B-1`'s recorded consequence inverts that: **the Grid is the input, not a preamble.** A team
picks a target stage and the generator proposes the decisions a team at that stage should make and
**hides the ones they should skip**. The hiding is the product.

**Status: spec only.** No HTML in this pass, and the ancestor's reason still holds — this document is
written so the build is mechanical.

---

## 1. Why the Grid is the input rather than a questionnaire section

`B-1` (`NEXT-STEPS.md` §4, KD 2026-08-26): decisions can be *"'pre-recommended' based on your maturity
selection in the grid."* The consequence recorded there is the sharpest one in that document — **the Grid
stops being only a diagnostic and becomes an input to the generator.**

That is now buildable in a way it was not when the ancestor was written, because three artifacts landed
that supply every input the generator needs, and **none of them has to be authored again for this page:**

| The generator needs | It already exists as | Which means |
|---|---|---|
| The set of questions | each component's **opening question**, one per component, collected in [`00-README.md`](./00-README.md)'s nav table | the question set is not written here; it is read |
| The answer template per question | the **six-rung ladder** per layer, held in `scripts/gen-grid-rows.mjs` and rendered by [`grid.html`](../../maturity/grid.html) | an answer is a rung, so answers are pre-templated by construction |
| Where a team is, and where it is going | the Grid's **click-to-set self-grade** and its **minimum**, already computed as `s-min` and named as `s-min-n` | the gate has a value to gate against |
| Which questions to skip | the gates in §4, each derived from a recorded rule | the hiding is arguable rather than tuned |

**So the generator is mostly assembly, and that is the claim to check first.** If building it turns out to
require writing a new question set, a new answer taxonomy or a new maturity model, something is wrong with
one of the three artifacts above and **that** is the finding — not a reason to write the fourth.

---

## 2. Shape

Carried from the ancestor's §2 unchanged except where noted.

| Property | Decision |
|---|---|
| **Format** | Single self-contained `.html` — no network, no CDN, no build step |
| **Where it lives** | `projects/loomwarp/artifacts/preflight.html`, plus published as a shareable artifact |
| **Runtime** | Opens from disk or a link. All state in-page; nothing transmitted |
| **Session length** | Target 20–30 minutes for a team, ~5 for an individual doing a first pass |
| **Persistence** | Answers encode into the URL fragment so a partial session is shareable and resumable |
| **Input** | **NEW —** accepts the Grid's per-layer grades directly, or lets a team set them inline on an embedded copy of the same instrument |

**Why HTML and not a CLI.** Unchanged: the audience includes people who will not run a CLI — a PM, a lead,
a security reviewer. The output *feeds* a CLI; the input should not require one.

---

## 3. The flow

**Bottom-up, in layer order**, replacing the ancestor's five bands. The order is not a preference: it is
the order [`00-README.md`](./00-README.md) is read in, and it is forced at least once — *"you cannot write an
adapter for a system you have not declared"* ([`1a`](../../components/1a-environment.md)), which puts
layer 1 before layer 2 for a structural reason rather than a stylistic one.

```
  ┌─ 0 · WHERE ARE YOU ─────────────────────────────────────────┐
  │  Team size · repo count · per-layer grade (from the Grid)    │
  │  Target stage  ·  delivery maturity                          │
  └──────────────────────────────────────────────────────────────┘
                    ↓  gates every question below
  ┌─ GROUND ─────────────────────────────────────────────────────┐
  │  0 Foundation · 1 Environment                                │
  ├─ MECHANISM ──────────────────────────────────────────────────┤
  │  2 Agent Harness · 3 System Stacks · 4 Capabilities          │
  ├─ WHAT ACCUMULATES  ⟳ ────────────────────────────────────────┤
  │  5 Context · 6 Workspaces        ← never skippable, see §4.5 │
  ├─ MOTION ─────────────────────────────────────────────────────┤
  │  7 Workflow Tasks                                            │
  ├─ TRUST ──────────────────────────────────────────────────────┤
  │  8 Trust                                                     │
  ├─ ABOVE ──────────────────────────────────────────────────────┤
  │  9 IMPROVE · 10 Teams & Agents · 11 Surfaces                 │
  └──────────────────────────────────────────────────────────────┘
                    ↓
  ┌─ OUTPUT ─────────────────────────────────────────────────────┐
  │  Decision record · deferral list · file manifest · commands  │
  └──────────────────────────────────────────────────────────────┘
```

**Three paths through it, and the shortest one is legitimate.** *Accept the defaults* takes about two
minutes and produces a valid record. *Walk the required questions* is the 20–30 minute session. *Open every
conditional* is for a team that already knows it is at stage 4 and is arguing about stage 5.

---

## 4. The gates — what gets hidden, and where each rule comes from

**This section is the specification.** Everything else in this document is shape.

**The standing constraint: each gate cites a recorded rule.** A gate that cannot cite one is a tuning
parameter wearing a rule's clothes, and the honest response is to not ship it. **Five qualify. There is no
sixth, and the shortness of this list is the finding** — the corpus supports far less automatic hiding than
a generator designer would like.

### 4.1 The ladder gate — the primary one

**Rule.** For each layer, a team sees the rungs from **its current grade** up to **its target stage**, and
nothing above. A layer already at or above target collapses to a one-line confirmation.

**Where it comes from.** The ladder is the answer set, and the ancestor already stated the behaviour —
*"a team targeting stage 3 is shown a materially shorter questionnaire than one targeting stage 5"*
([`../archive/v0/05-preflight-spec.md`](../../archive/v0/05-preflight-spec.md) §3). What is new is that the
rungs now exist as data rather than as prose, so *materially shorter* is computed instead of estimated.

### 4.2 The stated-prerequisite gate — and there is exactly one

**Rule.** [`9f` Diagnose the Bottleneck](../../components/9f-diagnose-the-bottleneck.md) is hidden until
both `9b` Rituals and `8d` Efficiency have been answered at all — that is, until neither sits at stage 1.

**Where it comes from.** [`03-jtbd.md`](../../comparisons/03-jtbd.md) §2 `J17`, verbatim:
*"**This is not a job a young harness can do.** You cannot detect a constraint without measurement, and
measurement means ritualized, scheduled checks… **`J17` depends on rituals and on `J12 account`**, which is
why it appears late on the scale axis and why it is **the only job here with a stated prerequisite**."*

**The last clause governs the whole section.** The corpus names one prerequisite across the seventeen jobs.
**Manufacturing the other sixteen is exactly the failure this rebuild exists to avoid** — the ancestor
already warns that a generator's power to say *"skip this"* is the same power that makes it a funnel.

**And what the passage does not supply is a number.** It states a **dependency**, not a threshold.
*"Both answered"* is the strongest form the citation actually licenses; *"both at stage 3"* would read more
precisely and would be this section's own §4-opening warning — a tuning parameter wearing a rule's clothes —
committed on the one gate that claims to be derived rather than chosen.

### 4.3 The evidential gate

**Rule.** The stage-6 rung of every layer is unavailable while [`8b` Evidence](../../components/8b-evidence.md)
sits below 4.

**Where it comes from.** [`03-maturity.md`](../../archive/v0/03-maturity.md) §3's third threshold —
*"⚡ Evidential, 5 → 6: a corpus of evaluated outcomes to improve from… Claiming 6 while Evidence sits at 2
is a learning loop with nothing to learn from."* The retiring Grid published this as a note; here it
becomes a gate.

**The subject is `8b`, not layer 8, and the distinction is load-bearing.** Under *minimum governs* layer 8
reads **1** — because `8d` Efficiency is 1 — while `8b` Evidence is that layer's strongest thread. Gating on
the layer would fire the gate for a reason the rule does not describe. **This is the one gate that needs
component granularity the Grid does not carry**, so the generator must ask for `8b` directly rather than
read it off the twelve rows.

**The threshold 4 is chosen, and is marked as chosen.** §3 supplies the subject and the direction; the
nearest thing it supplies to a number is that the corpus *"only exists after running at 4–5."* **4 is the
low end of that, taken deliberately — it is not quoted, and it is the only number in this section that a
citation does not carry.**

### 4.4 The delivery gate — the one that can refuse

**Rule.** If the target stage exceeds delivery maturity by 2 or more, the generator **leads with that** and
recommends raising delivery first, before it shows a single component question.

**Where it comes from.** [`03-maturity.md`](../../archive/v0/03-maturity.md) §1: *"if your AI-native stage
exceeds your delivery stage by two or more, stop raising the first one."* It is also honesty requirement 4
in the ancestor's §6, carried unchanged into §7 below. **This is the only gate that can stop a session.**

### 4.5 The accumulation exception — what may never be hidden

**Rule.** Layers 5 Context and 6 Workspaces are asked at every target stage, including stage 2.

**Where it comes from.** [`00-README.md`](./00-README.md)'s idea **B**: they are the only two layers that
accumulate, and *"the two a team cannot buy: you can rent a model, adopt a harness and import a standards
pack; you cannot import what your team has learned or the product it has built."* A skipped question about
a layer that compounds is not deferred — **it is a decision taken by default and paid for later.**

### 4.6 What is not gated, and is not a gate

- **Horizon markers do not hide anything.** `shipped` / `emerging` / `claimed` / `bet`
  ([`12-horizon.md`](./12-horizon.md) §2) grade **the field's corroboration**, not a team's readiness.
  Hiding a `bet` from a young team would be reasonable-sounding and would be the generator inventing a
  rule the axis does not carry. **They are shown as a labelled confidence badge instead**, so a team can
  weigh a recommendation without the page weighing it for them.
- **Machinery is not asked about at all.** `router.py` and `dispatch.py` are machinery, not configurable
  primitives; the question at layer 7 is about the **work contract**, which is the thing a team configures
  (`AC-7`; [`7a`](../../components/7a-workflow-tasks.md)). A generator that asks a team to configure a
  resolver has mistaken the graded object.

---

## 5. The question set

**Structure carried from the ancestor's §4 unchanged:** per component, **one required question plus
conditionals**, and **every question carries a recommended default** so a team can accept the whole thing
and refine later.

**What is new is where the text comes from.** The required question **is the component's own opening
question**, and the answer template **is the layer's ladder**. Neither is authored here.

| Slot | Filled from | Example (`3e` Standards) |
|---|---|---|
| **Required question** | the component's opening question | *"What does good look like here, before anyone writes anything?"* |
| **Answer template** | the layer's rungs at and below target | *documented workflow humans follow · standards with an inheritance contract · standards promote from observed outcomes* |
| **Default** | the rung at the target stage, unless the corpus records a stronger one | **Adopt and adapt** the standards pack |
| **Escape** | **free text on every question**, always | *"Other —"* |
| **Confidence** | the component's horizon marker | `bet` — ours, uncorroborated |

### Phase 0 — Where are you

Carried from the ancestor's Phase 0, with the grid import promoted from optional to primary.

| Q | Type | Notes |
|---|---|---|
| Team size | number | Drives whether layer 11's integrations matter |
| Repos in scope | number | 1 repo skips most of `6c` Estate |
| **Grade per layer** | the Grid | **Import, or set inline.** Twelve values, not thirty-three — `O-6`, [`CROSSWALK.md`](./CROSSWALK.md) §3.7 |
| Target stage | 1–6 | **Default: current + 1 on the minimum layer, not across the board** — carried verbatim from the ancestor, which took it from *minimum governs* |
| Delivery maturity | 1–6 | Fires §4.4 |

### The recorded defaults, carried

The ancestor's §4 defaults were argued when they were written and **none of the arguments expired with the
vocabulary.** They are carried by component rather than by `F<n>`, and this is the full carried set:

| Component | Question | Carried default |
|---|---|---|
| `0a` Substrate | Primary harness · portability posture | Claude Code · **portable-where-cheap** |
| `2c` Enforcement | Enforcement layer · risk posture | **Deny + hooks** · standard |
| `3a` Control | Control model | **Native subagents** |
| `3e` Standards | Standards tier | **Adopt and adapt** |
| `4a` Capability | Distribution | **Plugin/marketplace** at ≥2 repos |
| `5a` `5b` | Which scope cells you keep | **team × project** + **individual × org** |
| `5c` Knowledge | Where a fact goes | **Adopt the written routing rule** |
| `6c` Estate | Registry needed? | **No** below 4 repos |
| `8b` Evidence | Evidence shape | **Structured results** |
| `9a` Learning | Learning loop | **Not yet** below target stage 5 |
| `11a` Surfaces | **Which surface is the source of truth** | **Repo markdown** |

> **The source-of-truth question remains the highest-value question in the generator**, and the ancestor's
> handling is carried without change: if a team answers *"we haven't decided"*, the output leads with that
> as finding #1. It is still the cheapest high-impact fix available to most teams.

**The table above covers thirteen of the thirty-three. Twenty have no carried default**, because the
ancestor asked one question per function against a model of twelve and this framework grades thirty-three.
**Most of the twenty are a mechanical exercise** — the ancestor's `F6` answer set already covers `2c`, and
its `F7` answers cover `8a` and `8c`; they need splitting, not inventing.

**Four are not mechanical, because they are structure the ancestor had no question for at all:**
[`1a` Environment](../../components/1a-environment.md),
[`6a` Product](../../components/6a-product.md), [`6d` Delivery](../../components/6d-delivery.md) and
[`10b` Org](../../components/10b-org.md). Note that layer 6 **did** have an ancestor question — `6c` Estate
carries `F2`'s registry default in the table above — so what is missing at layer 6 is its product and
delivery halves, not the layer. `10b` is missing because *who answers for this* was nobody's question in
the model the ancestor was written against.

**All four are `bet` or `claimed`.** That correlation is not a coincidence: a component with no corroborated
peer implementation is a component nobody has had to write a default for yet, and it is the argument for
writing these four last. **Recorded rather than invented here.**

---

## 6. Output

Three artifacts from one run, carried from the ancestor's §5 with the deferral section promoted.

**A. The decision record** — markdown, for the repo. The primary output.

```markdown
# How we work — <team>
Generated <date> · target stage 4 · delivery maturity 3

| Layer | Choice | Provider | Owner | Recorded in |
|---|---|---|---|---|
| 0 Foundation | Claude Code, portable-where-cheap | native | @lead | .claude/settings.json |
| 2 Agent Harness | deny + hooks, standard posture | native | @security | .claude/settings.json |
| 11 Surfaces | SoT = repo markdown → Linear, Slack | native MCP | @lead | docs/source-of-truth.md |

## What we deliberately are not doing yet
- 9f Diagnose the Bottleneck — gated: needs 9b Rituals and 8d Efficiency at 3 (03-jtbd.md §2, J17)
- 9a Learning — target stage 4 does not require it
```

**B. The file manifest** — what to create, with the commands.

**C. `preflight.json`** — machine-readable, consumed by an installer and re-importable to resume. Keyed by
component ID rather than by `F<n>`, and carrying the target stage and each gate that fired, so **a reader
six months later can see what the page decided not to ask.**

---

## 7. Honesty requirements

**Non-negotiable in the build.** Without these it is a funnel, and a funnel is worse than no tool. The
ancestor's six are carried; two are added, and both are debts this rebuild created.

1. **"Native" is a first-class answer, and often the recommended one.** The generator must not treat it as
   a lesser outcome. *(The ancestor asserted a nine-of-twelve majority defaulting to a native provider.
   That count was taken against the retired model and **is not restated here** — it must be recomputed
   against the thirty-three before build, per the discipline in [`CROSSWALK.md`](./CROSSWALK.md) §3.8.
   `scripts/check-function-count.mjs` rejected the quoted form of this sentence, which is the guard doing
   its job on the first new document written after it landed.)*
2. **Deferral is a valid outcome and must be visible.** A team leaving with three deferrals has succeeded.
3. **No component defaults to LoomWarp where a native capability exists**, and each that does states what
   it costs.
4. **The fast-slop warning is mandatory** — §4.4, and it is the one gate that can stop a session.
5. **Every recommendation cites its source.** No unsourced claims about anyone's capabilities, ours or a
   competitor's. The component files already carry the peer rows this draws on.
6. **Nothing leaves the page.** No network calls, no analytics, no telemetry. A team's maturity self-grade
   is sensitive.
7. **NEW — a hidden question is visibly hidden, and names the gate that hid it.** Collapsed, not absent,
   with the rule and its citation one click away. The ancestor required this of Phase 0 (*"visible, so
   nothing feels hidden"*); with hiding promoted to the point of the tool, it applies to every gate.
8. **NEW — the self-grade the whole page runs on is a person's opinion, and the page must say so.**
   [`9f`](../../components/9f-diagnose-the-bottleneck.md) records this against the Grid in its own
   implementation row: *"the diagnosis is real and the measurement feeding it is not."* A generator that
   inherits that input and hides its provenance has laundered an opinion into a plan.

---

## 8. Build notes

| Concern | Approach |
|---|---|
| **Single file** | Inline all CSS/JS. No CDN — a strict CSP would block it if published as an artifact |
| **Theme** | Readable in light and dark; full light palette on `:root`, overridden under `prefers-color-scheme` and `[data-theme]` |
| **Responsive** | Usable on a laptop in a meeting room; wide tables scroll inside their own container |
| **State** | In-page; encode to URL fragment for resume and sharing |
| **Accessibility** | Keyboard-navigable throughout — it will be driven by one person on a shared screen |
| **Rows** | **NEW —** the layer rows and their ladders come from `scripts/gen-grid-rows.mjs`, the same generator [`grid.html`](../../maturity/grid.html) runs on. **Two artifacts, one row set, generated** — which is `B-2`'s design note applied a second time |

**Sequencing, and the half of it that is still owed.** The ancestor made this page wait on a maturity
explorer that did not exist. **The Phase 0 input it waited for now does** —
[`grid.html`](../../maturity/grid.html) runs on the twelve layers and its rows are generated, which is why
this rebuild is buildable and the ancestor was not.

**The rest of that explorer does not exist.** [`03-maturity.md`](../../archive/v0/03-maturity.md) §7 specs five
views — the ladder, the grid, the **two-axis AI-native × delivery plot**, the thresholds, and the
anti-pattern cards — and `grid.html` implements the grid plus a bridge table.
[`../../00-MAP.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/00-MAP.md) and [`../../NEXT-STEPS.md`](../../archive/sessions/NEXT-STEPS.md) both still carry
`03-maturity.md` at ❌. **What that costs this document specifically: §4.4's delivery gate needs the delivery
axis the unbuilt two-axis view was to supply**, so that gate runs on a number a team types rather than one
the instrument computes — which makes it the weakest-instrumented of the five.

---

## 9. Open questions

| # | Question |
|---|---|
| **PF-1** | Does the generator emit files directly, or only a manifest a human or agent applies? **Carried unresolved.** The draft assumes manifest — safer, and it keeps the artifact side-effect-free |
| **PF-2** | Does it need a *grade our current setup* mode that reads an existing repo rather than only greenfield? **Carried.** Probably yes, later, and it would be a skill rather than the HTML page |
| **PF-3** | How does the decision record stay current after install? **Carried.** Candidate: a `SessionStart` hook that flags drift between the emitted config and actual config |
| **PF-4** | **NEW —** should the page write the three missing defaults (`6a`, `6d`, `10b`) itself when a team answers, promoting an observed answer to a recommended one? That is a learning loop over the framework, which is layer 9's altitude applied to the framework rather than to a team — and it is **exactly the kind of claim that needs a corroborating peer before it is built** |

---

*Back to [`00-README.md`](./00-README.md) · the derivation in [`CROSSWALK.md`](./CROSSWALK.md) · the ancestor at [`../archive/v0/05-preflight-spec.md`](../../archive/v0/05-preflight-spec.md)*
