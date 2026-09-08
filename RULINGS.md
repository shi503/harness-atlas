---
title: "RULINGS — the index of decisions that changed a rule, an id, or a name"
tier: reference
project: harness-atlas
created: "2026-09-07"
updated: "2026-09-07"
status: PERMANENT
owner: KD
provenance: AUTHORED
---

# Rulings

**An index, not a store.** A ruling's text stays where it was written. This table says a ruling exists,
what it decided in one line, and where to read it.

**Why an index and not a migration.** All three existing homes are legitimate: a root
`RULING-<date>-<slug>.md` for a repo-wide decision; a `### N ✅ RULED <date> — …` heading inside
[`components/CROSSWALK.md`](components/CROSSWALK.md) §3, where it sits with the gap it
closes (carried out of `spec/v1-framework/` on 2026-09-08 when the specification was archived — a
live rule cannot live in the archive; headings verbatim, so the anchors did not move); a section of a HANDOFF for a decision made in a session. Normalizing them would be large,
low-value churn and would break the `✅ RULED` convention §3 is organized around. The defect was never
the formats — it was **findability**: [`fractal/ISSUES.md`](fractal/ISSUES.md) cites *"KD's ruling,
W3 Q3"* and *"W3 Q4"* with nothing to click.

**This index is self-guarding.** Every *Where the text is* cell is a markdown link with a heading
anchor, and `scripts/check-doc-links.mjs` resolves anchors. A ruling whose heading is re-worded or
whose file moves breaks the one check this repo has. That is enforcement for zero new machinery, per
`CLAUDE.md` — *markdown is not code*.

**Scope.** Built forward from 2026-09-07, plus every ruling already cited by name elsewhere. No
archaeology. **A ruling that is not indexed here is a defect** — append it to `fractal/ISSUES.md`.

---

| Date | Id | What it decided | Where the text is | Status |
|---|---|---|---|---|
| 2026-08-31 | `2026-08-31-rituals-cadence` | `9b` Rituals and `9c` Cadence are separate components; `C-7` is narrowed, not reversed. Layer 9 keeps six | [CROSSWALK §3.1](components/CROSSWALK.md#31--ruled-2026-08-31--9b-rituals-and-9c-cadence-are-separate-components) | PERMANENT |
| 2026-08-31 | `2026-08-31-anti-fragile` | `9d` Anti-fragile Lifecycle is the closed loop, a peer of Learning / Rituals / Cadence, not their umbrella | [CROSSWALK §3.2](components/CROSSWALK.md#32--ruled-2026-08-31--9d-anti-fragile-lifecycle-is-the-closed-loop) | PERMANENT |
| 2026-09-01 | `2026-09-01-warp-threads` | `O-6` — the Grid's warp threads are the 12 layers; the 33 components are drill-down | [CROSSWALK §3.7](components/CROSSWALK.md#37--ruled-2026-09-01--o-6-the-grids-warp-threads-are-the-12-layers-the-33-are-drill-down) | PERMANENT |
| 2026-09-01 | `2026-09-01-decision-ledger` | The decision ledger is the governed tier of `5b` Team Memory. No new component; the count stays 33 | [CROSSWALK §3.9](components/CROSSWALK.md#39--ruled-2026-09-01--the-decision-ledger-is-the-governed-tier-of-5b-team-memory) | PERMANENT |
| 2026-09-01 | `2026-09-01-layers-navigation` | Lineage Ruling 1 reconciled: the layers are navigation, the components are the primitive set | [CROSSWALK §3.10](components/CROSSWALK.md#310--ruled-2026-09-01--lineage-ruling-1-reconciled-the-layers-are-navigation-the-components-are-the-primitive-set) | PERMANENT |
| 2026-09-01 | `2026-09-01-component-named` | The gradeable unit is named `component`; `sub-layer` retires | [CROSSWALK §3.12](components/CROSSWALK.md#312--ruled-2026-09-01--the-gradeable-unit-is-named-component-and-sub-layer-retires) | PERMANENT |
| 2026-09-02 | `2026-09-02-spinout` | The harness framework spins out of LoomWarp into this repo; a maturity spectrum and a primitive catalog are un-fused | [`RULING-2026-09-02-spinout.md`](RULING-2026-09-02-spinout.md) | PERMANENT |
| 2026-09-03 | `2026-09-03-original-twelve` | The 13-layer renumber proposed in the consolidated guide §1 is **struck**. Component IDs stay the original twelve layers | [`CLAUDE.md`](CLAUDE.md) · [`index.md`](index.md#4-the-layers) | PERMANENT |
| 2026-09-04 | `2026-09-04-w3-q3` | An UNDERCOUNT is flagged in the vocabulary ledger; the profile is corrected when it is next re-read, not retro-fitted | [W3 HANDOFF · KD's rulings](fractal/workstreams/W3-vocabulary-ledger-HANDOFF.md#kds-rulings-the-corrections-log) | PERMANENT |
| 2026-09-04 | `2026-09-04-w3-q4` | An unnamed `●` in a grid becomes `◐` with a dated note — a correction, not a re-score. `0a` keeps `●` under the stated convention | [W3 HANDOFF · KD's rulings](fractal/workstreams/W3-vocabulary-ledger-HANDOFF.md#kds-rulings-the-corrections-log) | PERMANENT |
| 2026-09-04 | `2026-09-04-template-v2` | Profiles take Template v2: card → system map → workflows → `●◐○` matrix → primitives → collapsed details. Coverage marks and source marks never share a table | [`skills/harness-teardown/SKILL.md`](skills/harness-teardown/SKILL.md) · [W8 PRD](fractal/workstreams/W8-template-v2.md) | PERMANENT |
| 2026-09-04 | `2026-09-04-layout-b` | A `<details>` may not contain a heading — GitHub scrolls to an anchor inside a collapsed block without opening it. Headings stay outside; only the body collapses | [W8 HANDOFF · the render check](fractal/workstreams/W8-template-v2-HANDOFF.md#the-render-check-deliverable-4) | PERMANENT |
| 2026-09-07 | `2026-09-07-dx-scorecard` | Seven DX dimensions are added as an authored headline layer over the ten axes, never computed. DX-5 Ecosystem is admitted as the one graded dimension | [`spectrums/01-scorecard.md` §1](spectrums/01-scorecard.md#1-requirements--four-rules-on-top-of-r1r7) | PERMANENT |
| 2026-09-07 | `2026-09-07-dx-revision` | The seven DX dimensions are revised after the first scoring pass. Four ids retired and superseded (`operator-scale`→`org-scale`, `constraint-form`→`weight-class`, `footprint`→`surfaces-extendability`, `domain-breadth`→`domain-specialization`, `cost-visibility`→`cost-controls`); **DX-4's polarity is reversed** general→specific; DX-5 is narrowed to adoption so it stops colliding with DX-3 on identical evidence | [`spectrums/01-scorecard.md` §7](spectrums/01-scorecard.md#7-dated-revision--2026-09-07) | PERMANENT |
| 2026-09-07 | `2026-09-07-drafted-until-verified` | **R11.** Every position states what it was derived from — the developer's explanations, docs and marketing, grounded against observable code — and carries a **drafted** banner until a human review pass sets `verified: true`. Nothing else clears it | [`spectrums/01-scorecard.md` §1 R11](spectrums/01-scorecard.md#r11--drafted-until-verified) | PERMANENT |
| 2026-09-07 | `2026-09-07-positioning-rename` | `spectrums/positions.md` → **`spectrums/positioning.md`**; the page describes a harness's shape relative to the industry, not only its scores. **`postures.md` was considered and rejected**: `posture` already has three referents (Permission posture, QM's primitive, axis VII Control posture) and a fourth would break the standing rule against borrowing a word. The `positions/` folder and the YAML `positions:` key are unchanged — they hold position blocks, which is still accurate | [`spectrums/positioning.md` §0](spectrums/positioning.md#0-how-these-positions-were-derived--read-this-first) | PERMANENT |
| 2026-09-07 | `2026-09-07-alignment-reference` | `comparisons/04-harness-alignment.md` §1 is superseded as a rubric by the DX scorecard, and **kept as a reference** — the prose inventory and findings-generator. Not re-headed, not archived | [`comparisons/04-harness-alignment.md` §1](comparisons/04-harness-alignment.md#1-who-they-are-and-whether-they-are-peers) | PERMANENT |
| 2026-09-07 | `2026-09-07-axis-vii-polar` | Axis VII *Control posture* is **`polar`**, not `centred`. The axis asked to be falsified by a harness that is unambiguously autonomous-by-default; Pi is that harness, and `centred` scores its defended design choice as a two-notch defect. No score changes — `0` and `+2` read the same under either shape; what changes is what the number claims | [`spectrums/00-README.md` §3 VII](spectrums/00-README.md#vii--control-posture--what-may-run-unattended-polar--shape-ruled-2026-09-07) | PERMANENT |
| 2026-09-07 | `2026-09-07-split-before-anchor` | **Re-read the anchor before recording a `split:`.** R10 stands, but it is reached too early: the anchors describe observable states, and in most apparent splits one anchor already covers both halves. A `split:` is for two states **simultaneously true at different anchors**, not for a scorer's uncertainty between them. Interim, pending the fuller R10 fix in ISSUE-011 | [`fractal/ISSUES.md` ISSUE-011](fractal/ISSUES.md) | PERMANENT |
| 2026-09-07 | `2026-09-07-openclaw-permissions-not-tenancy` | OpenClaw's session owner, participant and per-scope roles are **permissions on a messaging gateway, not tenancy.** KD: *"initially it's ranked more as an individual agent, and the gateway messaging is permissions."* Axis I and DX-1 re-scored `+1` → `0`. A mechanism does know a second person exists, which keeps it off `−3`; what it knows is a permission scope, which keeps it off `+1`. **A team version shipped after the 2026-09-02 read and is the corpus's strongest re-read candidate** | [`fractal/ISSUES.md` ISSUE-015](fractal/ISSUES.md) | PERMANENT |
| 2026-09-07 | `2026-09-07-dx4-context` | **DX-4 becomes `context`** — *what does it remember about my project, and what can it look up?* — reading `5a` `5b` `5c` with axis **II state-durability** as its axis input. `domain-specialization` retires: it read `0` on seven of ten because a domain is authored **into** a harness, and R3 requires a dimension be derivable from the harness profile. Layer 5 was read by no dimension at all and takes **six distinct values**. Detail-only axes drop from four to three | [`spectrums/01-scorecard.md` DX-4](spectrums/01-scorecard.md#dx-4--context--what-does-it-remember-about-my-project-and-what-can-it-look-up-polar) | PERMANENT |

---

## Open — awaiting a ruling

| Raised | Question | Where the argument is |
|---|---|---|
| 2026-09-07 | **`spectrum` names two instruments.** Four files call the *maturity* framework "the spectrum"; `spectrums/00-README.md` §0 silently renamed it *"the maturity range"* with no ruling and no ledger row. Retire `spectrum` from maturity in favour of `range`, or keep the collision and record it? | [`vocabulary.md` §1.1](vocabulary.md#11-collisions--one-row-per-referent) |
| 2026-08-31 | Six gaps in `CROSSWALK` §3 carry no `✅` — the Briefing has no component, `OPEN-9` stewardship, RBAC over context, dispositions carried in, `AC-3`'s length floor, and the two gaps recorded 2026-09-01 | [CROSSWALK §3](components/CROSSWALK.md#3-recorded-gaps) |
