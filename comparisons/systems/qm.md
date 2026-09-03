---
title: "Teardown — QM / Quartermaster (by reference)"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# QM (Quartermaster) — Y Combinator

> **Partial pointer.** A full source-level teardown already exists at
> [`../../../specs/v1/04-benchmark-qm.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/specs/v1/04-benchmark-qm.md) — 239,609 LOC read,
> with twelve patterns extracted in priority order and the correction it forced on `F5` Policy. This
> file covers only what that benchmark does not: QM as a *product design*, for the comparison tables.

**Category.** Process layer — a multiplayer org harness, self-described. MIT, v0.1.0, released late
July 2026, `@yc-software/qm`. No hosted SaaS; deployments run in customer-owned cloud accounts.

---

## The primitives

| Primitive | What it is |
|---|---|
| **Scope** | The headline. An individual user or a shared room, each with an isolated bundle: memory, files, keychain view, permissions, crons, web apps, durable sandbox |
| **Headless core** | Identity, policy and scheduling in one place — *"every turn runs through one central core"* |
| **Rooms** | Where several people and several agents share state |
| **Postures** | **strict / auto / dangerous**, where *narrower scopes can only tighten, never loosen* |
| **Surfaces** | Slack, web UI, admin panel, public portal — all optional plugins over one HTTP API |
| **Adapters** | Pi, OpenCode, Codex, Claude Code — selectable per user or per room |
| **Durable substrate** | Postgres — *"nothing important lives only in a model's context window"* |

Tool surface is deliberately tiny: primarily `execute` in a durable sandbox where installed packages
persist.

---

## The three ideas worth taking

**1. Scope as a first-class primitive.** It is how QM supports *"many isolated agent-workspaces that
can also meet in shared rooms"* without shared-state chaos. It cuts across what v0 calls `F1`, `F3`
and `F6` simultaneously, which is why open thread `R-2` asks whether v0 needs a scope concept.
[`../01-concepts.md`](../01-concepts.md) §3.6 concludes it does — scope is the individual-versus-team
memory boundary, and v0 has no name for it.

**2. Monotonic narrowing.** *Narrower scopes can only tighten, never loosen* is the same invariant
Claude Code encodes as *deny wins from any scope*. Two systems converging independently is strong
evidence it is the right invariant, and it should be a team norm rather than only a config behaviour.

**3. Surfaces as plugins.** *"Surfaces are plugins, not the product"* — with the same identity and
configuration carrying between Slack and the web app. This is the finding that produced `F1
Surfaces`. Note that QM's rooms also cover **communication**, which
[`../01-concepts.md`](../01-concepts.md) §3.9 identifies as having no v0 function at all.

---

## Honesty worth imitating

QM documents that *"the command policy is bypassable"* and classifies itself as *"a speed bump
against mistakes and injection, not a sandbox boundary."* It publishes known limitations — plaintext
sandbox credentials during use, admin access to unencrypted transcripts. And the operating principle:

> *"The agent acts as the person it's working for, with their credentials and their permissions, and
> everything it does is audited."*

**And the finding the benchmark surfaced that still stands:** QM's product has a rich three-posture
permission model and **applies none of it to the agents developing its own repo**. Everyone in this
comparison set has the same hole, LoomWarp included. That makes it an opportunity, not an excuse.

---

## What it does not claim

Process opinion · a standards tier · context provenance · maturity diagnosis · cross-repo impact
analysis.

---

## Sources

- [Inside QM: a system design teardown](https://atul4u.medium.com/inside-qm-a-system-design-teardown-of-y-combinators-multiplayer-agent-harness-d5482cd8d5d3) — the template this corpus's teardowns follow
- Source-level analysis: [`../../../specs/v1/04-benchmark-qm.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/specs/v1/04-benchmark-qm.md) (2026-08-04)
