---
title: "2c · Enforcement"
tier: spec
project: loomwarp
created: "2026-08-31"
status: DRAFT
owner: KD
layer: "2 Agent Harness"
sublayer: "2c"
function: "F6 (split)"
job: "J5 · J15"
horizon: "shipped"
img: img/050-enforcement.png
wave: W3
extends: spec/v1-framework/CROSSWALK.md
---

[← 00-README](../00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../CROSSWALK.md) — the derivation and supersession arguments for every component

### 2c · Enforcement

**Layer 2 Agent Harness** · function `F6 (split)` · job `J5 · J15`

> **Where does a rule stop being a request?**
>
> Enforcement is **the mechanism** — the point at which a decision made elsewhere binds somewhere the
> model cannot reach, and the record that it bound. It holds no opinions of its own. `3a` declares the
> bound, `4b` grants it per capability, `3e` says what good looks like and `8a` says whether the output
> cleared the bar. **This layer is where any of that becomes true.**

**One mechanism, two appearances, and every file in the framework has to say which one it is.**

| Appearance | Where it presents | When it acts | Graded at |
|---|---|---|---|
| **Guides** — help the agent write it correctly | `3e` Standards, stored in layer 5 | **pre-hoc** | `3e` |
| **Sensors / Evals** — check the work that was done | layer 8 Trust | **post-hoc** | `8a` |
| **The mechanism both run on** | **here, beside `2b` Hooks** | — | **`2c`** |

That is Böckeler's split, and the factor set already carries both halves as separate imperatives —
Factor `VII` *"The gate does not run on the model"* and Factor `VIII` *"Feedback is addressed to the
machine"* ([`EXPLAINER-PLAN.md`](../../EXPLAINER-PLAN.md) §3.1). The jobs record the same division
from the same author: *Guides* under `J5 bound`, *Sensors* under `J6 validate`
([`03-jtbd.md`](../../../comparisons/03-jtbd.md) §2).

> **Trust keeps exactly four components. Enforcement is not a fifth.** Layer 8 grades Evals, Evidence,
> Observability and Efficiency. The reason enforcement is not among them is that it is not a judgement —
> it is the thing a judgement runs on, and it sits in the harness whether or not anyone is judging.

**The mechanism, concretely.** `policy/tier-*.json`, permission deny rules, `PreToolUse` handlers,
managed settings, sandboxing — an enforcement **ladder**, cheapest first, where each rung binds more and
costs more to deploy. **Macedo makes the bottom rung a membership condition rather than a maturity
level:** *"at least one control mechanism independent of the model."* On that test a harness with none
is not an immature harness; it is not one of these systems at all.

**And hooks are one member of the set, not the set.** The correction is on the record and it was forced
by a peer: QM ships *no hooks at all*, and reaches genuinely unviolatable invariants through an
AST-level lint rule, route-auth conformance by enumeration, and tests that fail when the README stops
matching the code. **The mechanism is *enforcement points*, and some invariants are better served by a
lint rule than a hook — because a lint rule runs in CI for humans too**
([`04-benchmark-qm.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/specs/v1/04-benchmark-qm.md) §*The correction it forces on E5*).

**`J15 secure and harden` splits here and it splits honestly.** *Secure* — secrets, sandboxing,
credentials an agent never holds — is a mechanism and lands at `2c`. *Harden* — vulnerability surface
and the quality long tail — is a bar and lands at `8a`, with its pre-hoc half at `3e`. **Two failure
modes, two layers:** `J5` fails as a breach, visible and immediate; `J15` fails as a slow accumulation
nobody notices.

**How do we work?** *"At least one of our controls is something the agent cannot talk its way past, and every denial is recorded."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | The four-rung ladder, complete: permission `deny` rules → `PreToolUse` hooks → managed settings → sandbox. And the honest register the corpus asks for — its own docs call managed settings *"a client-side control, not a security boundary"* | [`systems/claude-code.md`](../../../comparisons/systems/claude-code.md) §*What it provides* — Policy row, §*Register worth imitating* |
| **Deep Agents** | `allow` \| `deny` \| `interrupt` as **one mode field on one rule** — a three-level posture that costs a value rather than three subsystems. ⚠️ And the corpus's **first counter-example to deny-wins**: resolution is *first-match-wins with an `allow` default*, so a permissive rule listed first silently defeats a later deny | [`systems/langchain-deepagents.md`](../../../comparisons/systems/langchain-deepagents.md) §2 *Permissions — a real policy primitive, and it is not deny-wins* |
| **MCP** | **Nothing here, and it is the reason enforcement cannot live at the connection layer.** MCP is *"external tool or data connections"*; what an agent may do with a connection is decided by the harness around it | [`07-verified-inventories.md`](../../../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | Enforcement as a **record rather than a bit**: approvals carry `ApproveToolCall(id, comment)` and `DenyToolCall(id, reason)`, with `resolved` as a distinct terminal state for approvals settled outside the system — the honest admission that a control plane never owns every channel | [`systems/humanlayer.md`](../../../comparisons/systems/humanlayer.md) §7 |
| **ours** | **Policy theatre, caught in our own repo.** Four tier files, risk tiers designed, **one wired** — and the only live run used `bypassPermissions`, which skips deny rules entirely, while the shipped diagram claimed otherwise | [`systems/loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/comparisons/systems/loomwarp.md) §*Architecture*, §*Credibility check* |

**Horizon:** `shipped` — `03-jtbd.md` §2 `J5` *"Who"* — Claude Code deny rules, hooks, managed settings, sandbox; Indigo hook profiles `minimal/standard/strict`; QM `strict/auto/dangerous` with monotonic narrowing

**The consequence.** This is the layer where enforcement is close to free and teams skip it anyway,
because nothing visibly breaks until something does — which makes it the most common thinnest thread in
the whole fabric. **And a control that has never been watched to deny is not known to be a control:**
our own four tier files were on disk for the entire run that bypassed them.
