---
title: "10a · Roster"
tier: components
created: "2026-08-31"
status: DRAFT
provenance: INHERITED
owner: KD
layer: "10 Teams & Agents"
sublayer: "10a"
function: "F9"
job: "J14"
horizon: "emerging"
graded: true
requires: []
---

[← the roster](./00-README.md) — all 33, and the graded split · [CROSSWALK](./CROSSWALK.md) — recorded gaps and the rulings that closed them · [RELATIONS](./RELATIONS.md) — the `requires` graph

### 10a · Roster

**Layer 10 Teams & Agents** · function `F9` · job `J14`

> **Who is on this team?**
>
> The roster is **one list of every actor** — human and agent — with **a scope** for each and **an
> accountable human** behind it. One list is the whole design: a model that represents people and
> agents separately cannot answer the question the list exists to answer.

**The concept is well attested and the word is not, which is exactly what `emerging` records.**
`identity` scores **29** across the corpus; `org chart` scores 1 and `roster` scores **1**. Three
peers have built the object under three names — QM's per-scope identity with a central core for
identity, policy and audit; Factory's *"agents as employees"* with persistent identity, scoped
permissions, audit trail and escalation path; Indigo's worker registry
([`03-jtbd.md`](../archive/comparisons/03-jtbd.md) §2 `J14`).

**Identity is not the roster, and conflating them is why the gap survived.** The published work in this
space — Chan's *Identity Binding* and *Agent IDs*, AAIF's *Identity & Trust* working group — is
**authentication**: proving an actor is who it claims to be. A roster is **a team's model of who is on
it**, which is a different artifact with a different owner, and no amount of the first produces the
second. The peer-reviewed precedent is blunter: Hassan et al. make **actors** one of four foundational
pillars of agentic software engineering, alongside processes, tools and artifacts — **and ours was the
only one of the four with no home** ([`02-functions.md`](../archive/v0/02-functions.md) §6 `F9`).

**The gradeable property is that something resolves against it.** A list nobody reads is a document;
a list a resolver consults is infrastructure. That is the whole of why this row exists rather than
sitting inside `10b` — and it is why the published dependency runs the way it does: **the org-chart
metaphor [`3b`](./3b-routing.md) is built on presumes that the chart exists**, and nothing in
the inherited model said where it lived, who owned it, or how a human and an agent are represented in
one place. ⚠️ That dependency also points downward through seven layers, and the structural
observation it raises is recorded once, from the routing side, in the same file.

**One list means agents carry the same fields people do.** A scope — what this actor may work on — and
an accountable human, including for the agents, because an agent's accountability does not attach to
the agent. **A roster that names five people and twelve agent definitions has recorded seventeen
actors and zero accountability** if only the first five have owners, and that is the common state
rather than an edge case.

**What this layer is not.** It is not [`10b`](./10b-org.md) Org — this is *who exists*, that is
*who answers for the result and who may decide what*. `C-25` split them for that reason, and they fail
apart: a complete roster with no decision rights produces work that routes correctly and escalates
nowhere. It is not [`4b`](./4b-capability-permissions.md), which grants a capability to an
actor this list names.

**How do we work?** *"Every actor, human or agent, is in one list with a scope and an accountable human."*

**Peer implementations**

| Peer | What it ships here | Cited at |
|---|---|---|
| **Claude Code** | `◐` — **agent definitions, no roster.** Subagents are first-class, carry isolated context and `memory:` scopes, and are discoverable as files; **none of them names an owner, and humans are not in the model at all.** A list of one kind of actor is not the list this row grades | [`systems/claude-code.md`](../archive/comparisons/systems/claude-code.md) §*What it provides* — Subagents row · [`03-jtbd.md`](../archive/comparisons/03-jtbd.md) §2 `J14` |
| **Deep Agents** | **`○`, and its own teardown states it in this row's words:** *"there is no notion of who else is on the team… `HumanInTheLoopMiddleware` interrupts a human, not a named one."* Notable because policy, evidence and distribution all arrived inside that harness in one release cycle and **this did not**, which is evidence about where the single-agent boundary actually falls | [`systems/langchain-deepagents.md`](../archive/comparisons/systems/langchain-deepagents.md) §5, §8 |
| **MCP** | **Nothing here.** It connects an agent to systems; it holds no model of *which* agent, and none of who is accountable for it. The identity in an MCP connection is the credential, which is authentication and not a roster | [`07-verified-inventories.md`](../archive/comparisons/2026-08-research/07-verified-inventories.md) §1 Table 1, row 8 |
| **HumanLayer** | **The only peer holding both halves of the list, in two systems that do not meet.** The agent half is a named set — enumerated at [`3b`](./3b-routing.md), where it is a routing destination — and the human half is the product's **seats**, priced and administered. Neither knows about the other, so nothing pairs an agent with the person accountable for it, which is the join this row is | [`systems/humanlayer.md`](../archive/comparisons/systems/humanlayer.md) §7, §8 |
| **LoomWarp** | `○` — **no list of any kind.** Agent definitions exist and score `●` in its own matrix, humans appear nowhere, and no artifact pairs an actor with an accountable person. The cost of that lands one row over and is recorded at [`3b`](./3b-routing.md); what belongs here is simply that **the chart the resolver presumes was never written** | [`02-component-matrix.md`](./MATRIX.md) §1 · [`loomwarp.md`](../content/loomwarp.md#10a-roster) |

**Across the corpus** — every scored harness on this component, its own mark and its own words.
**● 4 · ◐ 5 · ○ 1** of ten. Each row links to that harness's detail.

| Harness | | What it ships here |
|---|:-:|---|
| [Claude Code](../content/claude-code.md#10a-roster) | ◐ | Built-in subagents (Explore/Plan/general-purpose) + team `members` array — session-scoped |
| [Codex](../content/codex.md#10a-roster) | ◐ | `agent-roles` + `agent-identity`; three built-in roles — no unified roster doc |
| [FRACTAL](../content/fractal.md#10a-roster) | ◐ | Four tier-agent role files; no accountable-human-per-role field |
| [Gas City](../content/gas-city.md#10a-roster) | ● | [**Agent**](../content/gas-city.md#5-primitives) folder is the roster entry; Gastown pack ships an example roster |
| [Grok](../content/grok.md#10a-roster) | ● | [**Bot**](../content/grok.md#5-primitives) roster (≤50) + Build's agent dashboard |
| [Hermes](../content/hermes.md#10a-roster) | ● | Bot Mode — *"a roster of named Bots,"* one per profile |
| [LoomWarp](../content/loomwarp.md#10a-roster) | ◐ | Five role files; own field-level analysis calls the function unprovided by anyone |
| [OpenClaw](../content/openclaw.md#10a-roster) | ● | Named [**Agent**](../content/openclaw.md#5-primitives) identities + Custodian + default persona |
| [OpenCode](../content/opencode.md#10a-roster) | ◐ | Named agents (build/plan/general/explore/scout); no identity/registry beyond the name |
| [Pi](../content/pi.md#10a-roster) | ○ | Nothing built in; the subagent example uses Markdown personas |

**Horizon:** `emerging` — `03-jtbd.md` §2 `J14` *"Who"* — three peers, three names: QM's per-scope identity with a central core, Factory's *"agents as employees"*, Indigo's worker registry. `identity` 29 · `roster` 1 — the concept is attested, the word is not

**The consequence.** This is the cheapest row in the framework to fill — it is a file — and the most
consequential to have skipped, because it is what four other rows resolve against. **Without it,
routing degrades into a model picking an agent by name similarity**, permissions attach to action
classes instead of actors, and every escalation reaches whoever is nearest rather than whoever is
answerable.
