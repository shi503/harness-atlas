---
title: "Capability and standards — distribution, inheritance, compounding"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# Capability and standards

**What this settles.** [`../../00-README.md`](../../00-README.md) §F-5 states that the standards tier is *"one row where LoomWarp stands alone with a `●`"* and that *"zero of seven peers ship what good looks like as a versioned, owned, inherited artifact."*

**That claim is false, and it is false in the most awkward way available: the eighth system is the author's own, it shipped the tier first, and LoomWarp's version inherited the idea.** The correction is not fatal to the positioning — see §5 — but it has to be made, because a comparison corpus that overstates its author's uniqueness is the thing the corpus itself warns against.

---

## 1. The capability layer

| | |
|---|---|
| Plugins | 6 |
| Skills | 39, each a `SKILL.md` in its own directory |
| Agents | 4 in the plugin tree, 4 at repository scope (with drift between them) |
| Distribution | A marketplace manifest at the spec-mandated location, installed from a local checkout |
| Commands | **Zero.** Every plugin ships skills; the older command format was abandoned |

Plugins are cut by **audience**, not by function: tooling every repo gets, planning tools for the hub, orchestration for repos adopting it, knowledge tools for repos with the substrate, a scheduled runner, and a review bundle. That is the right axis — it makes "who should have this" a property of the package rather than a per-skill judgement, and it makes the governance table below possible.

**Governance is explicit and asymmetric.** Adding to the team-wide plugin requires review; adding to the hub-only plugin is owner-only; adding to a personal namespace at user scope is *"never reviewed."* Promotion from personal to team-shared is a pull request with a polished skill definition, references and examples. The personal namespace lives at user scope rather than repo scope for a stated reason: personal skills belong to the user, auto-load across all their repos, and carry no review burden. A repo-scoped personal namespace blurs ownership.

**Two spec disciplines worth carrying:**

*Triggering is the description field alone.* An audit pass removed a non-existent `trigger-phrases` key from 16 skill definitions — the harness never read it, so every skill carrying one had degraded triggering that nobody could see. The doctrine that replaced it: write the description as *what it does + when to use it*, ending in the literal phrases a user would say.

*Side-effecting skills disable model invocation.* Any skill that writes, posts, publishes, or touches orchestration state sets `disable-model-invocation: true`, so it never self-fires on a passing mention while remaining explicitly invocable. The list is specified as a floor, not a ceiling.

**And one drift to avoid reproducing.** Agent definitions exist in two places — plugin tree and repository scope — and the copies are not byte-identical. The harness resolves by frontmatter `name:`, not filename, so both load and the winner depends on load order. Their own handoff documents this and leaves it open. If capability lives in a plugin, it should live *only* in the plugin.

## 2. The standards tier

Six guides, 849 lines: engineering principles, architecture patterns, a coding-guidelines map, a definition of done, and a process-improvement model, behind a README that fixes the tier model and the inheritance contract.

**The inheritance contract, in two rules:**

> **Reference, never copy.** **Tighten, never contradict.**

A project-level guide points at the team standard and adds only what is specific to that project; it may impose a stricter bar and may not impose a different one. This is the same contract LoomWarp's `standards/README.md` states. It arrived here first.

The chain: framework-agnostic canon → project references → (future) per-application-repo references.

## 3. The half LoomWarp does not have

Standards here are split into **static** and **compounding**, and the split is the interesting part.

| Tier | Nature | Changes by |
|---|---|---|
| Canonical static | authored canon | pull request |
| **Compounding dynamic** | **living memory** | **any review pass may append** |

The compounding tier is 13 hardened review finding-classes — named, reusable defect patterns extracted from real reviews: audit-trail gaps on error paths, unstable idempotency keys, missing scope filters, silent exception swallowing, type escape hatches, vacuous test assertions, validity predicates in application code rather than in the query, and others.

**The loop:** a review finds a defect → the class is written up → later reviews consult it → a class that hardens **promotes into the static standards tier.**

That is Learning, running. LoomWarp grades Learning at Stage 1 and its architecture diagram labels it DESIGNED ONLY. The mechanism that would move it is thirteen files and a promotion rule, and it is sitting in the predecessor.

## 4. The distribution rule, and the break that produced it

> **A marketplace-distributed skill must never hard-depend on a hub filesystem path.** It inlines its checklist and cites the canonical guide *by name*.

The origin is a real break, described in kind: a review skill was promoted into the team-wide plugin while still pointing at a hub-relative guide path. The path did not exist in any repository the plugin installed into. The skill loaded, referenced a file that was not there, and degraded silently.

The resulting model names exactly **two channels** that reach a sibling repository — a walk-up reference from that repo's own instruction file to the hub's, and a marketplace install carrying skills plus their bundled references — and then states the consequence plainly: **the standards tier and project references are reachable by neither.** Naming what your distribution mechanism cannot deliver is rarer and more useful than naming what it can.

This is direct, evidenced support for the clause already written into Capability — *"no hard dependency on the hub's filesystem"* — which currently reads as a design preference and can now be sourced to an incident.

## 5. So what happens to F-5?

The claim narrows and, narrowed, it survives.

**What is false:** that zero of seven peers ship a standards tier, and that LoomWarp's is the only entry in that row. `generic-cerebro` shipped 849 lines behind the same inheritance contract, plus a compounding tier LoomWarp lacks. The row becomes two `●`s — and the second one is *stronger*.

**What remains true and is worth leading with instead:** no system in the corpus that a stranger can adopt ships a standards tier. `generic-cerebro` is an internal corpus with no licence, no releases, and a bus factor of one; it is prior art, not a competitor. Among *adoptable* process layers the row still has one entry.

**And the honest addition:** the row's real content is not "we have a standards folder." It is the **inheritance contract plus the compounding loop** — reference-never-copy, tighten-never-contradict, and finding-classes that promote. LoomWarp currently has the first half. The second half is what makes the tier a system rather than a document set, and it is available.

## 6. What to take

| Take | Effort | Note |
|---|---|---|
| Compounding finding-class tier + promotion rule | Days | The missing half; moves Learning off Stage 1 |
| Distribution rule — no hub-path dependency | Hours | One paragraph in `standards/`; prevents a break that already happened once |
| Naming what distribution *cannot* reach | Hours | Same document |
| Audience-cut plugins + asymmetric governance table | Hours | Cheap, and it makes "who gets this" a package property |
| Personal namespace at user scope, never reviewed | Hours | Removes review burden from experiments |
| Triggering-is-the-description + `disable-model-invocation` floor | Hours | Both are one-line-per-skill disciplines |
| Two copies of an agent definition | — | **Do not take.** §1 |

---

*Companion: [`05-context-and-the-librarian.md`](./05-context-and-the-librarian.md) — where finding-classes live · [`07-transfer-manifest.md`](./07-transfer-manifest.md) · [`../../00-README.md`](../../00-README.md) §F-5 — the claim this corrects*
