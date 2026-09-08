---
title: "9b · Rituals"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "9 IMPROVE"
sublayer: "9b"
function: "new ⚠️"
job: "J11"
horizon: "emerging"
graded: true
requires: []
---

[← 00-README](../spec/v1-framework/00-README.md) — the twelve layers, read bottom-up · [CROSSWALK](../spec/v1-framework/CROSSWALK.md) — the derivation and supersession arguments for every component

### 9b · Rituals

**Layer 9 IMPROVE** · function `new ⚠️` · job `J11`

> **Who is in the loop, and what are they there to do?**
>
> A ritual is **a recurring practice with a person in it** and a **named seat for the agent** —
> review, retro, planning, handoff. It is graded on three things: that the seat is named, that the
> practice **leaves an artifact**, and that the person's attention is spent where it is worth most.

> **Ruled 2026-08-31 — `9b` is separate from `9c`.** `9c` Cadence is **the schedule** — cron, hooks,
> triggers. `9b` is **the human practice the schedule serves** — a loop with a person in it.
> `C-7` is **narrowed, not reversed**: its reframe covers the scheduled half; the half it did not
> address — who is in the loop and what they are there to do — is this component.
> Argument at [`../spec/v1-framework/CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §3.1.

**The distinction is narrow and it is the only one that survives, so it has to be used precisely.**
[`9c`](./9c-cadence.md) answers *what runs without being asked*. This answers *what a person
is for once it has.* The two fail apart in both directions: a team with immaculate scheduled checks
and no named human seat gets reports nobody acts on, and a team with rich meetings and no schedule
gets a practice that lapses the first busy week. **Neither failure is visible in the other's row.**

**The strongest published content for this component is an ordering, not a ceremony.** Review the
research, then the plan, then the code — because *"a bad line of code is a bad line of code. But a bad
line of a **plan** could lead to hundreds of bad lines of code. And a bad line of **research** could
land you with thousands"*
([`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §2). **That is a
placement decision, and placement is what this row grades** — our own posture has historically asked
*how much autonomy*, and *at which artifact* is the better question.

**The seat that does not get automated is the one the framework names.** Facilitation, tech lead,
developer and reviewer are all seats an agent can hold; **the product owner — deciding what to build
and accepting it — is the boundary.** *"The agent runs the interview; it does not answer it"*
([`00-the-framework-from-agile.md`](../archive/v0/00-the-framework-from-agile.md) §4). Every other seat is
a question of how much evidence the team requires before it stops watching.

**And the honest ladder tells you when to skip.** The one peer that publishes its effort distribution
says ~40% of tasks are one-shot, medium tasks get one document and no phases, and only large things
get the whole ladder. **A ritual set with no stated exit is a ritual set that gets abandoned
entirely**, which is the failure mode a maturity model should name rather than the one it usually
does.

**What this layer is not.** It is not [`11a`](./11a-surfaces.md) Surfaces — a channel is
**where** people meet, this is **what they are doing there**, and `J11` lands in both for that reason
([`CROSSWALK.md`](../spec/v1-framework/CROSSWALK.md) §1). It is not [`9a`](./9a-learning.md), which is what
happens to a finding a ritual produced.

**How do we work?** *"Review, retro and planning each have a scheduled slot and a stated place the agent participates — and each one leaves an artifact behind."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | **`○`, and correctly so.** It ships no named ritual, no seat and no phase set. The extension points a practice would attach to are graded in the rows that own them; **nothing in this one is a harness's to fill**, which makes the empty cell a statement about the division of labour rather than about the vendor | [`systems/claude-code.md`](../comparisons/systems/claude-code.md) §*What it provides, in one screen* |
| **Deep Agents** | The human seat exists and is **anonymous**: its own teardown names the limit exactly — it *"interrupts **a** human, not a named one."* **A seat without an occupant**, which is precisely the difference this row grades: naming the moment a person is needed is cheap, and naming *which* person and *what they are deciding* is the whole practice | [`systems/langchain-deepagents.md`](../comparisons/systems/langchain-deepagents.md) §8 |
| **MCP** | **Nothing here.** A connection mechanism has no notion of a recurring practice or a participant. The near-miss worth declining is a human-approval server — **an approval is a moment, not a practice**, and counting one as the other is how a ritual row gets filled by a tool | [`07-verified-inventories.md`](../comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | **The strongest instance in the corpus, and it is the product.** RPI — research → plan → implement — is a named, shipped, documented, skill-distributed phase set with a published prompt and an artifact per phase, a human checkpoint at each, and stated variants. ⚠️ It also carries the corpus's clearest vocabulary drift: the keynote names four phases, the docs three, the marketing site six. **Three phase vocabularies from one company inside one quarter** | [`systems/humanlayer.md`](../comparisons/systems/humanlayer.md) §3, §6 |
| **LoomWarp** | The **HANDOFF** gate — a real ritual with a required artifact, arrived at independently by three peers, and *"three peers reached it independently"* is the strongest structural signal in the corpus after the adapter finding. ⚠️ And the exact inverse of gstack: high control, no retro. It ships a gate between tiers and no recurring practice around it | [`fractal.md`](../content/fractal.md#9b-rituals) · [`NEXT-STEPS.md`](../archive/sessions/NEXT-STEPS.md) §4 `B-3` |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 0 · ◐ 4 · ○ 6** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#9b-rituals) | ◐ | Code Review triggers on PR open/push as an automated review ritual |
| [Codex](../content/codex.md#9b-rituals) | ○ | Nothing encoded; dogfood review skills are examples, not rituals |
| [FRACTAL](../content/fractal.md#9b-rituals) | ○ | Nothing here — no recurring human-practice object of its own |
| [Gas City](../content/gas-city.md#9b-rituals) | ○ | Nothing here; Gas Town's role ladder is a sibling-product example |
| [Grok](../content/grok.md#9b-rituals) | ◐ | `review-changes` workflow; use-case templates, not rituals |
| [Hermes](../content/hermes.md#9b-rituals) | ◐ | Bundled rituals-as-skills (weekly-review, sdlc-review); no standup object |
| [LoomWarp](../content/loomwarp.md#9b-rituals) | ○ | No cron, standup, or retro object of its own |
| [OpenClaw](../content/openclaw.md#9b-rituals) | ◐ | Bootstrap ritual + heartbeat + Custodian playbook; no human rituals |
| [OpenCode](../content/opencode.md#9b-rituals) | ○ | Nothing shipped; users encode as [**Command**](../content/opencode.md#5-primitives)s or agents |
| [Pi](../content/pi.md#9b-rituals) | ○ | Nothing encoded; user-authored prompt templates only |

**Horizon:** `emerging` — four peers ship a named ritual set under four names, and none share vocabulary: gstack's sprint loop · Indigo's Ralph loop · FRACTAL's HANDOFF · HumanLayer's **RPI** (`systems/humanlayer.md` §3), which is sold as the product

**The consequence.** What a team loses without this row is not culture but **placement**. Human
attention is finite and it drains toward the artifact that is easiest to review — the diff, at the
end, where a bad decision has already become a thousand lines. **No amount of scheduling corrects
that**, because a schedule knows when something runs and not who is in the room or what they came to
decide, and the review that felt thorough is the one that arrived far too late to be cheap.
