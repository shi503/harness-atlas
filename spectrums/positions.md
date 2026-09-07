---
title: "Positions — the scored corpus, and one character sheet per harness"
tier: reference
project: harness-atlas
created: "2026-09-07"
updated: "2026-09-07"
status: DRAFT
owner: KD
provenance: DERIVED
---

# Positions

The scored corpus. **The YAML files in [`positions/`](positions) are the source of truth**; everything
below is rendered from them by hand and carries no claim the YAML does not.

**How to read a row.** `−3…+3`, and **neither end is better** — except `5 Ecosystem`, marked `†`,
which is the one dimension admitted as graded (ruling `2026-09-07-dx-scorecard`, see
[`01-scorecard.md`](01-scorecard.md) §1 R9). Polar rows show a **position** `───●───`; the graded row
shows a **fill** `▰▰▰▰▱`. The seven dimensions are read over ten axes; the ten are in
[`00-README.md`](00-README.md) and five of them deliberately feed no cell here.

---

## 1. The corpus

| Harness | 1 Operator | 2 Constraint | 3 Footprint | 4 Domain | 5 Eco † | 6 Ownership | 7 Cost | Scored |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|---|
| [Claude Code](#2-claude-code) | +1 | +1 | +3 | −2 | +3 | −3 | +3 | 2026-09-07 |
| Pi · Hermes · OpenClaw · OpenCode · Grok · Codex · Gas City · LoomWarp · FRACTAL | | | | | | | | **not yet** — scored as W8b restructures each profile to Template v2 |

The fingerprint — the seven values as one line, `+1 · +1 · +3 · −2 · +3† · −3 · +3` — heads each
harness's own section below. It is not repeated as a column here: at nine columns it wrapped to four
lines on github.com and stopped being a fingerprint (checked 2026-09-07).

**Ten of eleven are unscored, and that is a scope statement, not an absence.** The remaining profiles
are Template A; W8b renumbers their sections, which would invalidate every evidence path written now.

> **R6 is untestable at one harness.** An axis earns its place by taking ≥3 distinct values across the
> scored corpus. **Nothing below has been validated as discriminating** — this pass proves the
> procedure, not the instrument. The corpus finding waits for W8b.

---

## 2. Claude Code

`+1 · +1 · +3 · −2 · +3† · −3 · +3`

[`content/claude-code.md`](../content/claude-code.md#1-at-a-glance) · profile read 2026-09-04 ·
scored 2026-09-07 · [`positions/claude-code.yaml`](positions/claude-code.yaml)

| | | | | |
|:-:|---|---:|:-:|---|
| **1** | Operator scale | single operator | `────●──` | multi-tenant, many teams |
| **2** | Constraint form | prose-led | `────●──` | machine-led |
| **3** | Footprint | one surface | `──────●` | many surfaces, environments, deployments |
| **4** | Domain breadth | one named use case | `─●─────` | general-purpose |
| **5** | Ecosystem **†** | tribal, proprietary | `▰▰▰▰▰` | wide adoption, extensive plugins |
| **6** | Ownership | rented | `●──────` | yours |
| **7** | Cost visibility | unmetered | `──────●` | attributed to the unit of work |

**†** `5 Ecosystem` is the one **graded** dimension — it has a good end, admitted by ruling. Every
other row is a position, not a score. See [`01-scorecard.md`](01-scorecard.md) §1 R9.

<details>
<summary>Why each — evidence and reasoning</summary>

| | Why | Read from |
|---|---|---|
| **1** `+1` | Managed settings and named org roles are enforced over sessions; no tenancy, scope or room object exists. **Split** — scored at the org-policy layer; the session layer alone is `−3` | §7 Q2 · `10b` `10a` `3d` `4b` |
| **2** `+1` | Mechanical at the tool-call boundary, prose everywhere upstream of it — *"context, not enforced configuration"* | axis III `+3` · axis VI `+1` **inverted** · `2c` `3a` `2b` `3e` · §7 Q3 |
| **3** `+3` | Six first-party surfaces on one engine, four execution environments, CI and review, telemetry out | `11a` `6b` `6d` `8c` `1a` · probation `surface-breadth +3` |
| **4** `−2` | Names one domain in its own first sentence — *"an agentic coding tool"* — but refuses no adjacent use, so not `−3` | §7 self-description · the `Genre` row · §5 (no refusal list) |
| **5** `+3` **†** | Marketplaces with SHA pinning, a co-published open standard, MCP, 144,088 stars at the read date | §7 Stars · created · 213 tags · `4a` `2a` `3e` |
| **6** `−3` | No OSS licence, a compiled binary, one vendor's model family — all three anchors met. **Split** — where it runs is portable; what runs is not ownable | §7 License (`license: null`) · §7 Install · `0a` `6b` |
| **7** `+3` | `/usage` attributes cost per skill, subagent, plugin and MCP server; OTel spans join spend to the run | axis X `+3` · `8d` `8c` |

**The ten axes beneath.** `I +1 · II 0 · III +3 · IV +3 · V 0 · VI +1 · VII 0 · VIII 0 · IX 0 · X +3`.
Probation, excluded from the fingerprint: `surface-breadth +3 · routing-determinism −1 ·
knowledge-depth −1`. Five axes — `II` `IV` `VII` `VIII` `IX` — feed no cell above by design
([`01-scorecard.md`](01-scorecard.md) §3); they are scored regardless.

**Three recorded `gap:` entries** — questions the profile cannot answer that would each move a score
by a notch or more: whether `bypassPermissions` defeats the OS sandbox (axis III), whether the CLI runs
a non-Anthropic model (axis V), and how many plugins the marketplaces actually hold (DX-5). **No
vendor source was opened to resolve any of them** — see §3.

</details>

---

## 3. The R3 falsification check

[`00-README.md`](00-README.md) §6: *"If backfilling a profile requires opening a vendor source, R3 is
violated and that axis is a component request in disguise."*

**Result, 2026-09-07: zero violations.** Three questions arose during scoring; each was answered by
scoring what the profile states and recording the unanswered half as a `gap:`, not by opening a source.

| Axis | The question the profile could not answer | What was done |
|---|---|---|
| **III** Binding force | Does `bypassPermissions` defeat the OS sandbox? | Scored `+3` on managed settings, which §7 states verbatim. Gap recorded |
| **V** Substrate portability | Does the CLI run a non-Anthropic model? | Scored `0` on the `0a` row — five hosts, one model family. Gap recorded |
| **DX-5** Ecosystem | How many plugins do the marketplaces hold? | Scored `+3` on stars, tags, standard co-publication and marketplace existence. Gap recorded |

**This pass produced a schema change.** R5 was all-or-nothing — score it, or `null` with
`pages_checked` — with no way to say *"I scored it, and here is the question that would move it."*
Dropping that silently is inference by omission, which the repo's standing rule forbids. The optional
**`gap:`** field is now in [`00-README.md`](00-README.md) §2.3, and **a `gap:` recurring on the same
axis across three harnesses is an R3 warning** that routes to
[`../docs/agents/intake.md`](../docs/agents/intake.md) as a candidate component.

---

## 4. Findings

1. **Axis X's R6 exemption is falsified on its first data point.** [`00-README.md`](00-README.md) §3 X
   predicts *"near-total clustering at `−3`"* and retains the axis on the argument that *"the emptiness
   is the result."* Claude Code scores **`+3`** — per-skill, per-subagent, per-plugin and per-MCP-server
   attribution, joined to a span tree. One point does not overturn a prediction, but the prediction must
   now be **re-checked rather than repeated**.
2. **Axis VII's contested shape survives untested.** `polar` and `centred` both read `0` on this
   harness. Settling it needs one that is unambiguously autonomous-by-default.
3. **Two axes needed `split:` on the very first harness scored** — I and V, plus DX-6 and the probation
   axis `routing-determinism`. R10 was written for a hypothetical and met four real cases immediately.
4. **The one revision to the planned scores.** Axis V was drafted `−1` and scored **`0`**: the `0a` row
   states five providers swappable in configuration, which is the `0` anchor verbatim. `−3` requires
   *one model family, one host*; only the first half holds.

---

*Companions: [`01-scorecard.md`](01-scorecard.md) — the seven dimensions and their anchors ·
[`00-README.md`](00-README.md) — the ten axes beneath them ·
[`../comparisons/04-harness-alignment.md`](../comparisons/04-harness-alignment.md) §2 — the 33-component
grid these compress.*
