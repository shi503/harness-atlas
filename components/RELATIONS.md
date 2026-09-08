---
title: "Component relations — the `requires` graph, cited"
tier: components
status: ACTIVE
provenance: INHERITED
created: "2026-08-31"
updated: "2026-09-08"
owner: KD
---

# `requires` — the model

**What this is.** The dependency graph over the 33 components: **thirteen edges, each one a sentence
somebody already wrote**, plus seven more that are structurally obvious and that nobody has argued.
It is the source for the `requires:` frontmatter each component page carries.

**Why it is here and not in the archive.** Same seam as [`CROSSWALK.md`](CROSSWALK.md): this is a live
register the component pages cite, so it left `spec/v1-framework/06-relations.md` on 2026-09-08 when
the specification was archived. The other nine sections of that file — the six relation types, the
`performs` and `records-in` models, the loop overlay, and the session's own open questions — argue
for a structure already settled, so they read as history and went with it. Headings are carried
**verbatim**, so any anchor into §3 still resolves; only the path changed.

**The finding this graph is, before it is a tool.** Thirteen edges over thirty-three nodes is sparse,
and the sparseness is the result rather than a gap in the survey: **the corpus states *contrasts* far
more often than it states *dependencies*.** Every component page carries a *What this layer is not*
paragraph; almost none carries a *what this layer cannot work without*. A team's grade being its
weakest component matters much less on a graph this thin — a weak node has almost nothing hanging off
it — which is itself worth knowing before anyone builds a maturity argument on top of it.

The roster of the 33 is [`00-README.md`](00-README.md). The retired relation model and the session
that produced it are in
[`../archive/spec/v1-framework/06-relations.md`](../spec/v1-framework/06-relations.md).

---

## 3. `requires` — the model

### 3.1 Cited edges — a sentence in the corpus asserts each one

| From | requires | Because | Cited at |
|---|---|---|---|
| `2a` | `1a` | *"one **adapter** per system declared at `1a`"* — and the preflight forces the order: *"you cannot write an adapter for a system you have not declared"* | [`2a`](./2a-adapters-and-middleware.md) · [`05-preflight.md`](../spec/v1-framework/05-preflight.md) §3 |
| `3b` | `10a` | *"A resolver is only as good as the list it resolves against, and that list is `10a` Roster."* **The published upward edge**, drawn dashed in `img/000-the-twelve-layers.svg` | [`3b`](./3b-routing.md) |
| `3a` | `7a` | *"The gradeable object is the work contract the resolver reads… A team does not configure a resolver; it configures the contract."* Control's machinery is inert without the primitive one layer up | [`3a`](./3a-control.md) |
| `3a` | `10b` | *"An escalation needs a destination, and this is it… what `3a` cannot supply is"* the named authority | [`10b`](./10b-org.md) |
| `2c` | `3a` | *"`3a` declares the bound"*, and *"comprehensive enforcement over bounds nobody named"* is named as a failure rather than as immaturity | [`2c`](./2c-enforcement.md) · [`3a`](./3a-control.md) |
| `3c` | `2a` | *"It is not `2a`, which enumerates the insertion points a harness **offers**; this decides which of them a given agent **uses**."* | [`3c`](./3c-composition.md) |
| `6b` | `1a` | *"`1a` says the system exists; `6b` is where a copy of it is stood up so work can happen against it."* | [`6b`](./6b-infrastructure.md) |
| `8b` | `5b` | *"`8b`'s unbuilt join runs **to** this ledger, which must exist for the join to have a destination."* | [`5b`](./5b-team-memory.md) |
| `8d` | `8c` | *"It is not `8d`, which reads the same stream for **cost** rather than for sequence."* One stream, two readings; the reading requires the stream | [`8c`](./8c-observability.md) · [`8d`](./8d-efficiency.md) |
| `9f` | `8d` | *"It is not `8d` Efficiency, which produces the reading this consumes"* — and `9f` *"states its own dependency on this job explicitly"* | [`9f`](./9f-diagnose-the-bottleneck.md) |
| `9f` | `9c` | *"The dependency is stated from `9f`'s side"* — without a scheduled refresh, *"a Grid computes a bottleneck that nothing refreshes"* | [`9c`](./9c-cadence.md) |
| `9a` | `8a` | *"It is not `8a`, which produces the finding this consumes."* | [`9a`](./9a-learning.md) |
| `9e` | `9f` | *"It is not `9e`, which acts on what this finds."* | [`9f`](./9f-diagnose-the-bottleneck.md) |

**Thirteen cited edges over 33 nodes.** That is a sparse graph, and the sparseness is a finding rather
than an omission in this file: the corpus states *contrasts* far more often than it states
*dependencies*. Every component file carries a **What this layer is not** paragraph; almost none
carries a *what this layer cannot work without*. See §9.

### 3.2 Proposed edges — structurally obvious, nowhere written

`AC-2` is explicit: *"an edge nobody can cite is deleted in session, not kept as decoration."* These
are staged for that decision, not asserted.

| From | requires | The argument nobody has written | Disposition |
|---|---|---|---|
| `4b` | `4a` | A grant over a capability presumes the capability exists | confirm or delete |
| `4b` | `10a` | A grant is made *to an actor*, and the actor list is the roster | confirm or delete |
| `10b` | `10a` | *Who answers* presumes *who exists* — `10a` notes *"the org-chart metaphor `3b` is built on presumes that the chart exists"* but says it about `3b`, not about `10b` | confirm or delete |
| `6d` | `6b` | Delivery needs an environment the change lands in | confirm or delete |
| `2a` | `0a` | An adapter runs inside a chosen harness — though `2a`'s own claim is the **opposite**, that it insulates from `0a` | **likely delete** — argue it |
| `9f` | `8b` | The `⟳` falsifier says `8b`'s ledger *"feeds forward… as measurement, into `9f` diagnosis and `9c` cadence"* — which is a feed, and may not be a requirement | confirm, weaken, or delete |
| `5b` | `5a` | *"A fact arriving from `5a` needs an owner"* describes a **promotion path**, not a dependency; `5b` plainly works with no `5a` at all | **likely delete** |

---
