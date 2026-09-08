---
title: "The standards layer — current state, and five corrections to our documents"
tier: reference
project: loomwarp
created: "2026-08-25"
status: DRAFT
owner: KD
---

# The standards layer, as of 2026-08-25

**What this is.** The current state of the shared substrate every system in this landscape rides, and the corrections it forces in `specs/v0/references.md` and `comparisons/systems/90-short-profiles.md`.

**Why it needs its own document.** Our standards claims were written in early August and were already wrong in five places. This layer moves faster than any other part of the landscape, and it is the layer where a stale claim is most likely to be repeated back to us by a reader who follows it.

---

## 1. Agentic AI Foundation

Formed under the Linux Foundation **2025-12-09**. Founding projects: **MCP** (Anthropic), **AGENTS.md** (OpenAI), **goose** (Block).

| | Then (our documents) | **Now** (2026-08-13) |
|---|---|---|
| Members | "170+" | **247** — +57 in three months |
| Hosted projects | 3 | **5** — MCP · goose · AGENTS.md · **agentgateway** · **A2A** |
| Notable Gold members | — | **Visa, Wells Fargo, Alibaba** — heavy financial-services and APAC tilt |

**A2A joined 2026-08-19**, transferred in from being a standalone LF project; v1.0 shipped March 2026 with multi-protocol bindings, multi-tenancy and cryptographically signed agent cards. Our documents list it as *"on the roadmap."*

**AAIF now also publishes a taxonomy** — see [`02-harness-taxonomies.md`](./02-harness-taxonomies.md) §1 for the Harness entry and the unfilled `broaderTerm` field.

**The AAIF has no memory working group.** Its eight groups are Accuracy & Reliability · Observability & Traceability · Identity & Trust · Security & Privacy · Governance, Risk & Regulatory Alignment · Agentic Commerce · Workflows & Process Integration · Taxonomy & Landscape. Notably, *Accuracy & Reliability* is scoped to include *"failure management, SLA definition, and **recovery protocols**"* —
the only published decomposition naming recovery as first-class.

---

## 2. MCP — there is no "v2", and the July spec changes our reasoning

**Our documents say *"MCP v2 (streaming, improved auth, resource pagination)"* is on the roadmap. That is wrong twice over.** MCP does not use semver for the spec; it is date-versioned. The current spec is **2026-07-28**, and it is the **largest revision to date**:

- The protocol went **from bidirectional and stateful to request/response and stateless** — each   request self-contained, deployable behind ordinary load balancers with no shared storage.
- A **formal extensions framework**: Tasks (long-running work), MCP Apps (server-rendered UI) and   Enterprise Managed Authorization are now *extensions*, not core.
- **Multi Round-Trip Requests** replace server-initiated requests over held-open streams. - Header-based routing, cacheable list results, OAuth/OIDC-aligned authorization hardening.

**The consequence that matters to `F3`:** the spec is now explicitly hostile to hidden session state —

> *"If your server needs to carry state across calls, mint an explicit handle from a tool and have the > model pass it back as an argument."*

**MCP has deliberately closed the door on being a memory substrate.** Any design that assumed MCP would
grow into team memory needs to assume otherwise.

> A new MCP roadmap was published **2026-08-22** and was **not** read in this pass. Read it before
> finalising anything that depends on MCP's direction.

---

## 3. AGENTS.md — v1.0, and evidence that cuts against mandating it

Formalized as an open spec August 2025, donated to AAIF December 2025. **v1.0 defines no frontmatter
and no required fields** — plain Markdown. A 1.1 revision adding optional `description` and `tags` is
**proposed, not shipped**. Adoption is cited as 60,000+ repos and 20+ tools, but that figure carries no
date on the spec site and should be treated as stale.

**The counter-evidence belongs next to the adoption number**, because it bears directly on `F3`: the
ETH Zürich study finds context files do **not** generally improve task success and add 20%+ inference
cost, with **repository overviews specifically unhelpful** while instructions are well followed. See
[`04-primitives-ontology-platform.md`](./04-primitives-ontology-platform.md) §1.

---

## 4. Memory interop — the gap we identified is now being worked

Our documents state there is no "MCP for memory." **That has changed**, though nothing is adopted yet.

**W3C AI Agent Memory Interoperability Community Group** — launched **2026-06-03**, charter adopted
2026-06-19, **21 participants**. Mission: *"make AI agent memory portable and verifiable across
vendors, models, agent frameworks, and tool ecosystems."* In scope: memory cell formats, post-quantum
identity binding, encryption envelopes, **audit trails**, sharing contracts, cryptographic erasure
aligned to GDPR Art. 17, and regulatory crosswalks to NIST AI RMF, ISO/IEC and the EU AI Act.
Explicitly **out** of scope: blockchain, vector DBs, agent runtime semantics.

An **IETF independent submission** (`draft-saihm-memory-protocol`) concluded **2026-07-29**. Academic
backing: *Portable Agent Memory* ([arXiv:2605.11032](https://arxiv.org/abs/2605.11032), May 2026) —
content-addressable entries in a **Merkle-DAG provenance graph** with capability-based selective
disclosure, positioning the stack as *MCP for tools + A2A for coordination + PAM for memory*.

**Honest read:** a 21-person community group and an independent submission are early. No vendor has
adopted a memory interop standard and AAIF has not taken it up. **Memory portability is still something
a team must design itself** — but the vacuum is no longer empty, and the audit-trail and
provenance-graph framing is close enough to our own claim that it belongs on the re-check schedule.

Supporting the same point, from the governance literature: MCP and A2A *"are stateless communication
standards that do not track what an agent did, what data it accessed, or how its outputs were used"*
([arXiv:2606.31498](https://arxiv.org/pdf/2606.31498)).

---

## 5. The five corrections

| Where | Says | Should say |
|---|---|---|
| `specs/v0/references.md:98`, `systems/90-short-profiles.md:93` | AAIF "170+ members" | **247**, as of 2026-08-13 |
| `specs/v0/references.md:100`, `comparisons/00-README.md:220` | "MCP v2 … on the roadmap" | **No such thing.** Date-versioned; current spec **2026-07-28**, a stateless-core rewrite |
| `systems/90-short-profiles.md:85` | MCP "110M+ monthly downloads" | Keep the figure, **stamp the date** (~April 2026) |
| `comparisons/00-README.md:220` | A2A "on the AAIF roadmap" | **Landed** — v1.0 March 2026; joined AAIF 2026-08-19 |
| *(absent everywhere)* | — | AAIF has **no memory working group**; interop sits at W3C and IETF |

**The standing conclusion still holds and gets stronger.** *The formats are commoditized* — riding the
standards is cheap, and nobody wins by owning a file format. What the July MCP revision adds is that
**the standards are also deliberately declining to solve state and memory**, which is precisely where
`F3` and `F7` live.

---

*Companion: [`03-agentos-harness-multiplayer.md`](./03-agentos-harness-multiplayer.md) ·
[`99-source-hygiene.md`](./99-source-hygiene.md)*
