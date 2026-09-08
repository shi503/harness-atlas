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

| Harness | 1 Org | 2 Weight | 3 Surfaces | 4 Domain | 5 Eco † | 6 Own | 7 Cost | Verified |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| [Claude Code](#2-claude-code) | +1 | +1 | +3 | +2 | +2 | −3 | +3 | ⚠️ no |
| [Pi](#3-pi) | −1 | −2 | +2 | 0 | +2 | +3 | +1 | ⚠️ no |
| [Hermes](#4-hermes) | 0 | +2 | +3 | −3 | +2 | +3 | +2 | ⚠️ no |
| [OpenClaw](#5-openclaw) | +1 | +2 | +3 | 0 | +1 | +3 | +2 | ⚠️ no |
| [OpenCode](#6-opencode) | +1 | +1 | +2 | 0 | +2 | +2 | +1 | ⚠️ no |
| [Codex CLI](#7-codex-cli) | +1 | +2 | +3 | 0 | +2 | +1 | 0 | ⚠️ no |
| [Grok (Build)](#8-grok-build) | +1 | +1 | +2 | −3 | 0 | +3 | +1 | ⚠️ no |
| [Gas City](#9-gas-city) | −1 | +1 | +2 | 0 | −1 | +2 | −2 | ⚠️ no |
| [LoomWarp](#10-loomwarp) | −2 | −1 | −3 | 0 | −3 | −3 | −2 | ⚠️ no |
| [FRACTAL](#11-fractal) | −2 | +2 | −1 | 0 | −3 | +2 | −3 | ⚠️ no |

All ten scored 2026-09-07, all **drafted and unverified** — see §0. The fingerprint, the seven
values as one line, heads each harness's own section below; it is not repeated as a column here,
because at nine columns it wrapped and stopped being a fingerprint (checked 2026-09-07).

> **R6 is satisfied.** Every dimension takes at least three distinct values across the corpus —
> `cost-controls` takes six, `ecosystem` five, four dimensions take four. The sheet discriminates,
> which two harnesses could not have shown and ten can. **One dimension is close to flat:**
> `domain-specialization` reads `0` on **seven of ten** with nothing at `+3` — see §4.

---

## 2. Claude Code

`+1 · +1 · +3 · +2 · +2† · −3 · +3`

[`content/claude-code.md`](../content/claude-code.md#1-at-a-glance) · scored 2026-09-07 · [`positions/claude-code.yaml`](positions/claude-code.yaml) · back: [§1a](../content/claude-code.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `────●──` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `─────●─` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `●──────` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `──────●` | observability, efficiency, routing |

**Ten axes beneath.** `I +1` · `II 0` · `III +3` · `IV +3` · `V 0` · `VI +1` · `VII 0` · `VIII 0` · `IX 0` · `X +3`

---

## 3. Pi

`−1 · −2 · +2 · 0 · +2† · +3 · +1`

[`content/pi.md`](../content/pi.md#1-at-a-glance) · scored 2026-09-07 · [`positions/pi.yaml`](positions/pi.yaml) · back: [§1a](../content/pi.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `──●────` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─●─────` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `────●──` | observability, efficiency, routing |

**Ten axes beneath.** `I −1` · `II 0` · `III −1` · `IV +3` · `V +2` · `VI −2` · `VII +2` · `VIII +1` · `IX 0` · `X +1`

---

## 4. Hermes

`0 · +2 · +3 · −3 · +2† · +3 · +2`

[`content/hermes.md`](../content/hermes.md#1-at-a-glance) · scored 2026-09-07 · [`positions/hermes.yaml`](positions/hermes.yaml) · back: [§1a](../content/hermes.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `───●───` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─────●─` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `●──────` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `─────●─` | observability, efficiency, routing |

**Ten axes beneath.** `I 0` · `II +1` · `III +3` · `IV +3` · `V +3` · `VI +1` · `VII 0` · `VIII +1` · `IX +3` · `X +1`

---

## 5. OpenClaw

`+1 · +2 · +3 · 0 · +1† · +3 · +2`

[`content/openclaw.md`](../content/openclaw.md#1-at-a-glance) · scored 2026-09-07 · [`positions/openclaw.yaml`](positions/openclaw.yaml) · back: [§1a](../content/openclaw.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─────●─` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `─────●─` | observability, efficiency, routing |

**Ten axes beneath.** `I +1` · `II +2` · `III +3` · `IV 0` · `V +3` · `VI +3` · `VII 0` · `VIII 0` · `IX +2` · `X +2`

---

## 6. OpenCode

`+1 · +1 · +2 · 0 · +2† · +2 · +1`

[`content/opencode.md`](../content/opencode.md#1-at-a-glance) · scored 2026-09-07 · [`positions/opencode.yaml`](positions/opencode.yaml) · back: [§1a](../content/opencode.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `────●──` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `─────●─` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `────●──` | observability, efficiency, routing |

**Ten axes beneath.** `I +1` · `II +1` · `III +2` · `IV +3` · `V +3` · `VI +2` · `VII +2` · `VIII 0` · `IX −2` · `X +1`

---

## 7. Codex CLI

`+1 · +2 · +3 · 0 · +2† · +1 · 0`

[`content/codex.md`](../content/codex.md#1-at-a-glance) · scored 2026-09-07 · [`positions/codex.yaml`](positions/codex.yaml) · back: [§1a](../content/codex.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─────●─` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──────●` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▰▰▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `────●──` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `───●───` | observability, efficiency, routing |

**Ten axes beneath.** `I +1` · `II 0` · `III +3` · `IV +3` · `V +1` · `VI +1` · `VII 0` · `VIII +1` · `IX +2` · `X 0`

---

## 8. Grok (Build)

`+1 · +1 · +2 · −3 · 0† · +3 · +1`

[`content/grok.md`](../content/grok.md#1-at-a-glance) · scored 2026-09-07 · [`positions/grok.yaml`](positions/grok.yaml) · back: [§1a](../content/grok.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `────●──` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `●──────` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▰▱▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `──────●` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `────●──` | observability, efficiency, routing |

**Ten axes beneath.** `I +1` · `II 0` · `III 0` · `IV +3` · `V +2` · `VI +1` · `VII 0` · `VIII +2` · `IX 0` · `X +2`

---

## 9. Gas City

`−1 · +1 · +2 · 0 · −1† · +2 · −2`

[`content/gas-city.md`](../content/gas-city.md#1-at-a-glance) · scored 2026-09-07 · [`positions/gas-city.yaml`](positions/gas-city.yaml) · back: [§1a](../content/gas-city.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `──●────` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `────●──` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `─────●─` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▰▰▱▱▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `─────●─` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `─●─────` | observability, efficiency, routing |

**Ten axes beneath.** `I −1` · `II +3` · `III −2` · `IV 0` · `V +2` · `VI 0` · `VII +2` · `VIII +2` · `IX 0` · `X −3`

---

## 10. LoomWarp

`−2 · −1 · −3 · 0 · −3† · −3 · −2`

[`content/loomwarp.md`](../content/loomwarp.md#1-at-a-glance) · scored 2026-09-07 · [`positions/loomwarp.yaml`](positions/loomwarp.yaml) · back: [§1a](../content/loomwarp.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `─●─────` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `──●────` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `●──────` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▱▱▱▱▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `●──────` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `─●─────` | observability, efficiency, routing |

**Ten axes beneath.** `I −2` · `II 0` · `III 0` · `IV −3` · `V −3` · `VI +3` · `VII +1` · `VIII +1` · `IX 0` · `X −2`

---

## 11. FRACTAL

`−2 · +2 · −1 · 0 · −3† · +2 · −3`

[`content/fractal.md`](../content/fractal.md#1-at-a-glance) · scored 2026-09-07 · [`positions/fractal.yaml`](positions/fractal.yaml) · back: [§1a](../content/fractal.md#1a-positioning-stats)

> **⚠️ Drafted, not verified.** No person has re-read these values. See §0.

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Org scale | single operator | `─●─────` | multi-tenant, many teams |
| **2** | Weight class | light-weight | `─────●─` | heavy-weight |
| **3** | Surfaces & extendability | one surface | `──●────` | many surfaces, environments, a platform |
| **4** | Domain specialization | general-purpose | `───●───` | one named domain, with workflows to match |
| **5** | Ecosystem **†** | tribal, low adoption | `▱▱▱▱▱▱` | wide adoption, longevity, network economies |
| **6** | Ownership | rented | `─────●─` | yours |
| **7** | Cost controls & efficiency | unmetered, unrestricted | `●──────` | observability, efficiency, routing |

**Ten axes beneath.** `I −2` · `II 0` · `III −2` · `IV −3` · `V −2` · `VI 0` · `VII 0` · `VIII +3` · `IX 0` · `X −3`

---

## 12. Findings

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

## 13. The R3 falsification check

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
