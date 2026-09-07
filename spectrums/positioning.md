---
title: "Positioning — where each harness sits, and how we decided"
tier: reference
project: harness-atlas
created: "2026-09-07"
updated: "2026-09-07"
status: DRAFT
owner: KD
provenance: DERIVED
---

# Positioning

**Where a harness sits, and what shape it is, relative to the industry around it.** Seven dimensions,
one card per harness. **The YAML files in [`positions/`](positions) are the source of truth**;
everything below is rendered from them by hand and carries no claim the YAML does not.

**How to read a row.** `−3…+3`, and **neither end is better** — except `5 Ecosystem`, marked `†`,
which is the one dimension admitted as graded (ruling `2026-09-07-dx-scorecard`, see
[`01-scorecard.md`](01-scorecard.md) §1 R9). Polar rows show a **position** `───●───`, seven cells,
the `●` at `value + 3`. The graded row shows a **fill** `▰▰▰▰▱`, six cells, `value + 3` filled. The
seven dimensions are read over ten axes; the ten are in [`00-README.md`](00-README.md) and four of them
deliberately feed no cell here.

---

## 0. How these positions were derived — read this first

> **⚠️ Drafted, not yet verified.** Every card on this page is at `verified: false`.
> The positions were drafted by a model and **no person has yet re-read them against the
> profiles**. Treat them as a first pass under review, not as findings.

**What a position is derived from.** How the harness presents itself — the developer's own
explanations, the documentation, the release notes and the marketing copy — **grounded against the
code and configuration the profile could actually observe.** Where positioning and artifact disagree,
the observed artifact wins and the disagreement is recorded on the card rather than resolved silently.

**What that means for a reader.** Positioning material is written to persuade. A harness that calls
itself *enterprise-ready* is evidence about its intent, not about its tenancy model. Half of what a
scorer reads here is a vendor describing itself, and the other half is what the profile could verify —
so a card names both, and says which one it scored.

**One rule bounds the research.** No vendor source is opened at scoring time
([`00-README.md`](00-README.md) §1 R3). A question the profile cannot answer becomes a recorded
`gap:` on the card, never a fresh search — which is why some cells carry a gap rather than a
confident value.

**How the banner comes off.** A person re-reads a harness's seven values against its profile, then
sets `verified: true`, `verified_by` and `verified_on` in `positions/<harness>.yaml`. **That review
pass is the only thing that clears it** — not age, not a re-render, not a second model. The rule is
[`01-scorecard.md`](01-scorecard.md) §1 **R11**; ruling `2026-09-07-drafted-until-verified`.

---

## 1. The corpus

| Harness | 1 Org scale | 2 Weight | 3 Surfaces | 4 Domain | 5 Eco † | 6 Ownership | 7 Cost | Scored | Verified |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|:-:|
| [Claude Code](#2-claude-code) | +1 | +1 | +3 | +2 | +2 | −3 | +3 | 2026-09-07 | ⚠️ no |
| [Pi](#3-pi) | −1 | −2 | +2 | 0 | +2 | **+3** | +1 | 2026-09-07 | ⚠️ no |
| Hermes · OpenClaw · OpenCode · Grok · Codex · Gas City · LoomWarp · FRACTAL | | | | | | | | **not yet** — scored as W8b restructures each profile to Template v2 | |

The fingerprint — the seven values as one line, `+1 · +1 · +3 · +2 · +2† · −3 · +3` — heads each
harness's own section below. It is not repeated as a column here: at nine columns it wrapped to four
lines on github.com and stopped being a fingerprint (checked 2026-09-07).

**Nine of eleven are unscored, and that is a scope statement, not an absence.** The remaining profiles
are Template A; W8b renumbers their sections, which would invalidate every evidence path written now.

> **R6 is untestable at two harnesses**, but it is no longer untested. A dimension earns its place by
> taking ≥3 distinct values across the corpus. **Two is not three** — nothing below is validated as
> discriminating yet. What two does prove is that the sheet is not flat: Claude Code and Pi differ on
> **all seven**, and are at opposite ends of DX-6 Ownership (`−3` against `+3`). The corpus finding
> still waits for W8b.

---

## 2. Claude Code

`+1 · +1 · +3 · +2 · +2† · −3 · +3`

[`content/claude-code.md`](../content/claude-code.md#1-at-a-glance) · profile read 2026-09-04 ·
scored 2026-09-07 · re-scored 2026-09-07 against the revised seven ·
[`positions/claude-code.yaml`](positions/claude-code.yaml) ·
back: [§1a Positioning stats](../content/claude-code.md#1a-positioning-stats)

> **⚠️ Drafted 2026-09-07 by `claude-opus-5`. Not verified.** Derived from Anthropic's documentation
> at `code.claude.com/docs/en/`, the `anthropics/claude-code` README and tag history, and the product
> page — **grounded against** the profile's 33-row component matrix, its eight primitives and its
> identity table. Positioning and artifact disagreed twice and the artifact won both times: the repo
> description and the docs give different self-descriptions (§7 records both, the docs win by rule 5a),
> and GitHub reports the language as Python while the root tree carries no application source (§7
> marks the repo's status ⚠️ unverified). Neither disagreement moved a value. §0 says how to clear
> this banner.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `────●──` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `─────●─` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `●──────` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `──────●` | observability, efficiency, routing |

**†** `5 Ecosystem` is the one **graded** dimension — it has a good end, admitted by ruling. Every
other row is a position, not a score. See [`01-scorecard.md`](01-scorecard.md) §1 R9.

<details>
<summary>Why each — evidence and reasoning</summary>

| | Why | Read from |
|---|---|---|
| **1** `+1` | Managed settings and named org roles are enforced over sessions; no tenancy, scope or room object exists. **Split** — scored at the org-policy layer; the session layer alone is `−3` | §7 Q2 · `10b` `10a` `3d` `4b` |
| **2** `+1` | Real machinery, unenforced rigor. Eight named units, 33 hook events, four execution environments — but `8a`'s verification pipeline is *"explicitly non-blocking"* and nothing requires an artifact per unit. **Split** — machinery scored, rigor alone is `0` | axis VIII `0` **direct** · axis VI `+1` **bulk only** · §5 count · §1 Structured output · `2b` `2c` `8a` `8b` |
| **3** `+3` | Six first-party surfaces on one engine, four execution environments, hooks and MCP and plugin bundling as published extension points, CI and Code Review, telemetry out | `11a` `6b` `6d` `8c` `1a` `2b` `2a` `4a` · probation `surface-breadth +3` |
| **4** `+2` | Positioned **and** built for one domain — *"an agentic coding tool"* in its own first sentence, plus a hosted Code Review service and monorepo/worktree handling. Not `+3`: it refuses no adjacent use | §7 self-description · the `Genre` row · `6d` `6c` · §5 (no refusal list) |
| **5** `+2` **†** | 144,088 stars and 18 months with 213 tags carry adoption and longevity. The third clause does not: no third-party author or plugin count exists anywhere in the profile, and `9e`'s marketplace is *"curated official"* | §7 Stars · created · 213 tags · `9e` |
| **6** `−3` | No OSS licence, a compiled binary, one vendor's model family — all three anchors met. **Split** — where it runs is portable; what runs is not ownable | §7 License (`license: null`) · §7 Install · `0a` `6b` |
| **7** `+3` | All three thirds shipped, and `8d` carries them in one row: `/usage` attributes cost per skill, subagent, plugin and MCP server; prompt-cache stats and effort levels are the efficiency half; spend limits, `modelPricing` and per-role model assignment are the control half | axis X `+3` · probation `routing-determinism −1` · `8d` `8c` `3b` |

**The ten axes beneath.** `I +1 · II 0 · III +3 · IV +3 · V 0 · VI +1 · VII 0 · VIII 0 · IX 0 · X +3`.
Probation, excluded from the fingerprint: `surface-breadth +3 · routing-determinism −1 ·
knowledge-depth −1`. Four axes — `II` `IV` `VII` `IX` — feed no cell above by design
([`01-scorecard.md`](01-scorecard.md) §3); they are scored regardless. **Axis VIII is no longer among
them**: DX-2 Weight class reads it directly.

**Four recorded `gap:` entries** — questions the profile cannot answer that would each move a score
by a notch or more: whether `bypassPermissions` defeats the OS sandbox (axis III), whether the CLI runs
a non-Anthropic model (axis V), how many plugins the marketplaces actually hold (DX-3), and how many
third-party authors have published for it (DX-5, the one that separates `+2` from `+3`). **No vendor
source was opened to resolve any of them** — see §4.

**What the 2026-09-07 revision changed here.** Two values moved.

| | Was | Is | Why |
|:-:|:-:|:-:|---|
| **4** | `−2` domain-breadth | `+2` domain-specialization | **Polarity reversed.** One observation, two signs — not a re-score |
| **5** | `+3` ecosystem | `+2` ecosystem | **The anchors narrowed.** The old `+3` rested on marketplaces, MCP and a co-published standard, all of which are DX-3 now |

The superseded fingerprint `+1 · +1 · +3 · −2 · +3† · −3 · +3` is kept in the YAML under
`superseded_scorecard:`, not deleted. [`01-scorecard.md`](01-scorecard.md) §7 is the full revision.

</details>

---

## 3. Pi

`−1 · −2 · +2 · 0 · +2† · +3 · +1`

[`content/pi.md`](../content/pi.md#1-at-a-glance) · profile read 2026-09-02 · restructured and
scored 2026-09-07 · [`positions/pi.yaml`](positions/pi.yaml) ·
back: [§1a Positioning stats](../content/pi.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** Derived from Pi's README, docs and RFC index and the maintainer's
> post — grounded against §4, §5 and §7. No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `──●────` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─●─────` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `────●──` | observability, efficiency, routing |

<details>
<summary>Why each — evidence and reasoning</summary>

| | Why | Read from |
|---|---|---|
| **1** `−1` | Stated single-operator posture against a shareable project settings file. **Split** — the posture is `−3`, the mechanism is `0` | §7 Q2 · `10a` `10b` `5b` `3d` |
| **2** `−2` | Subtraction is the design: no plan mode, no to-dos, no sub-agents, no gate a unit must clear. Session receipts and an evals package keep it off the floor | axis VIII `+1` · axis VI `−2` **bulk only** · §5 · `2c` `8b` `8a` |
| **3** `+2` | A platform on the extension side — ~40 typed events, a four-type package format, a registry showing 5,618 packages, four execution environments. Held off `+3` by no delivery and telemetry that ships contracts without an exporter | `2b` `4a` `2a` `6b` `11a` `8c` `6d` |
| **4** `0` | Names coding in its first sentence and ships nothing domain-specific — the `0` anchor verbatim. Its refusals are about structure, not domain | §7 self-description · `Genre` · §3 · §5 |
| **5** `+2` **†** | Large adoption and a real third-party ecosystem, against thirteen months of history and an ownership change in month nine — longevity is what is unproven | §7 Stars 100,782 · created 2025-08-09 · `4a` |
| **6** `+3` | MIT and stated to stay MIT, no CLA, 31 providers, self-hostable, and the maintainer names the fork button as a feature | §7 License · §8 governance · `0a` `6b` |
| **7** `+1` | Compaction, cache retention and thinking budgets, plus per-entry cost in the session tree — but no spend bound and no routing to pull on | axis X `+1` · probation `routing-determinism 0` · `8d` `8c` `3b` |

**The ten axes beneath.** `I −1 · II 0 · III −1 · IV +3 · V +2 · VI −2 · VII +2 · VIII +1 · IX 0 · X +1`.
Probation: `surface-breadth 0 · routing-determinism 0 · knowledge-depth −3`.

**Five `split:` entries and three `gap:` entries** — the most on any harness so far. Pi is a system
defined by what it refuses, and a refusal reads differently as a *posture* than as a *mechanism*;
R10 fired on axes I, III, V, VII and IX for exactly that reason.

</details>

---

## 4. Findings

1. **The DX-3/DX-5 collision was real, and narrowing it moved a score.** Before the revision, the same
   sentence — *marketplaces with SHA pinning, a co-published open standard, MCP* — was the evidence for
   both `3 Footprint +3` and `5 Ecosystem +3`. [`01-scorecard.md`](01-scorecard.md) §6 names exactly
   that as a falsifier. Assigning extension **points** to DX-3 and extension **adopters** to DX-5 drops
   Ecosystem to `+2`, because what remains is stars and tags — attention and longevity, with no count
   of anyone who actually built.
2. **Axis X's R6 exemption is falsified on its first data point.** [`00-README.md`](00-README.md) §3 X
   predicts *"near-total clustering at `−3`"* and retains the axis on the argument that *"the emptiness
   is the result."* Claude Code scores **`+3`**. One point does not overturn a prediction, but the
   prediction must now be **re-checked rather than repeated**.
3. **DX-2's re-referent gave axis VIII a headline home.** *Proof ceremony* was detail-only on the
   argument that no DX reader arrives with *how is completion known*. A weight-class reader arrives
   with exactly that, in different words. Detail-only drops from five axes to four.
4. **Axis VII's contested shape now has its test case, and the test says `polar`.** It read `0` on
   Claude Code under either reading, so the first harness settled nothing. **Pi scores `+2`** — no
   permission system, no popups, no plan mode, nothing gated by default. Under `centred` that reads as
   *two notches from healthy*, i.e. a failure; but Pi's docs defend it at length as a deliberate
   position — *"This is intentional… A partial in-process sandbox would be easy to misunderstand as a
   security boundary."* An axis that scores a defended design choice as a defect has the wrong shape.
   **Recommend retiring the `centred` marking on axis VII.** KD's ruling; the argument is now on the
   record rather than hypothetical.
5. **Pi is the corpus's first `+3` on DX-6 Ownership, against Claude Code's `−3`.** Two harnesses, both
   poles of one dimension, on the same evidence field — §7's licence row. That is R1 (*two live poles,
   named in this corpus*) satisfied for DX-6 by observation rather than by assertion.
6. **R10 fired five times on Pi alone**, on axes I, III, V, VII and IX. The pattern is not random: a
   harness defined by what it *refuses* reads differently as a **posture** than as a **mechanism**, and
   every one of those five splits is that same distinction. **Pi suggests R10 is under-specified** — it
   says *score the half the profile states most directly*, which is ambiguous when a vendor states both
   halves equally clearly, as Pi does. A rule that says *which* half wins by default would help.
7. **Five `split:` entries on Claude Code** — axes I and V, plus DX-1, DX-2 and DX-6, and the
   probation axis `routing-determinism`. R10 was written for a hypothetical and has now met eleven
   real cases across two harnesses.
8. **`+1` twice on DX-2 is a coincidence, not a mapping.** The superseded `constraint-form` scored `+1`
   and `weight-class` scores `+1`, from different reads answering different questions. Recorded because
   the next reader will assume the dimension was merely renamed.

---

## 5. The R3 falsification check

[`00-README.md`](00-README.md) §6: *"If backfilling a profile requires opening a vendor source, R3 is
violated and that axis is a component request in disguise."*

**Result, 2026-09-07: zero violations, across both the original scoring pass and the re-score.** Four
questions arose; each was answered by scoring what the profile states and recording the unanswered half
as a `gap:`, not by opening a source.

| Axis | The question the profile could not answer | What was done |
|---|---|---|
| **III** Binding force | Does `bypassPermissions` defeat the OS sandbox? | Scored `+3` on managed settings, which §7 states verbatim. Gap recorded |
| **V** Substrate portability | Does the CLI run a non-Anthropic model? | Scored `0` on the `0a` row — five hosts, one model family. Gap recorded |
| **DX-3** Surfaces | How many plugins do the marketplaces hold? | Scored `+3` on the extension points themselves, which `2b` `2a` `4a` state. Gap recorded and re-homed from DX-5 |
| **DX-5** Ecosystem | How many third parties have published for it? | Scored `+2` — adoption and longevity met, third-party building unevidenced. **This gap is now load-bearing**: it is the whole distance between `+2` and `+3` |

**This pass produced a schema change.** R5 was all-or-nothing — score it, or `null` with
`pages_checked` — with no way to say *"I scored it, and here is the question that would move it."*
Dropping that silently is inference by omission, which the repo's standing rule forbids. The optional
**`gap:`** field is now in [`00-README.md`](00-README.md) §2.3, and **a `gap:` recurring on the same
axis across three harnesses is an R3 warning** that routes to
[`../docs/agents/intake.md`](../docs/agents/intake.md) as a candidate component.

---

*Companions: [`01-scorecard.md`](01-scorecard.md) — the seven dimensions, their anchors, and the
2026-09-07 revision at §7 · [`00-README.md`](00-README.md) — the ten axes beneath them ·
[`../comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2 — the 33-component
grid these compress.*
