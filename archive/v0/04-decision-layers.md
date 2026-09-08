---
title: "v0-04 — Decision layers"
tier: spec
project: harness-atlas
created: "2026-08-11"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# Decision layers

**What this is for.** `02-functions.md` says *what* the systems are. This says **who decides, when,
what records the decision, and what it costs to change your mind.** It is the architect's and team
lead's view, and it is the input the pre-flight generator reads.

**The framing problem it solves.** "Implement the twelve functions" is not actionable, because the twelve
are not one kind of decision. Some are made once by one person and constrain everything after them.
Some are made continuously by whoever is working. Treating them uniformly is why adoption plans stall
— they present a foundational choice and a routine one at the same altitude.

---

## 1. The four bands, as decisions

| Band | The decision is | Who | Cadence | Reversibility | Failure mode |
|---|---|---|---|---|---|
| **Ground** | *What we run on* | Platform owner / eng lead | Once; revisit yearly | **Very low** — everything sits on it | Lock-in |
| **Structure** | *What we work in* | Architect | Per quarter / per repo | Low — migrations | Sprawl |
| **Motion** | *How work moves* | The team | Per epic / per workstream | **High** — cheap to change | Inconsistency |
| **Trust** | *Why we trust it* | Lead + org | Per action / continuous | High to add, **impossible to add retroactively** | "It said it was done" |

**The inversion that matters.** Cost-to-reverse falls as you descend. Cost-of-omission rises.

- Getting **Ground** wrong is expensive to fix and *obvious immediately* — everyone feels it.
- Skipping **Trust** is cheap to fix and *invisible until it isn't*. There is no feedback signal
  telling you Policy is missing, right up until an agent does something it shouldn't.

That asymmetry is why teams reliably over-invest in Ground and under-invest in Trust, and why the
minimum rule in `03-maturity.md` exists.

**One-way and two-way doors.** Ground and Structure are close to one-way: you can change them, but
you pay in migration. Motion and Trust are two-way — you can try a control model for one epic and
abandon it. **Spend deliberation proportional to reversibility.** Most adoption plans do the
opposite: they agonize over which control framework to use (two-way) and default their way into a
harness and a source of truth (one-way).

---

## 2. Decision table

One row per function. `Reverse` is the cost of changing your mind after six months of use.

### Ground

| | `F0 Substrate` | `F1 Surfaces` |
|---|---|---|
| **The decision** | Which harness, and how portable do we stay | Which surfaces we use, and **which one is the source of truth** |
| **Decided by** | Platform owner / eng lead | Team lead, with the whole team |
| **When** | Before anything else | Immediately after |
| **Recorded in** | `.claude/settings.json`, install script, a written portability constraint | A written SoT decision; MCP config; stated flow direction |
| **Reverse** | **Very high.** Every capability written to one harness's features | **Very high.** History and decisions accumulate in whatever you chose |
| **Signal you got it wrong** | "It works on Sam's machine"; capability can't move | An agent confidently gives a stale answer because it read the wrong place |
| **Default if you don't decide** | Whatever each person installed | Slack — the worst possible SoT, chosen by accident |

> **The `F1` default is the important line in this table.** Nobody decides Slack is the source of
> truth. It becomes the source of truth because decisions happen there and nothing moves them
> anywhere else. This is the most common unforced error in the whole model, and the fix is a
> paragraph in a file.

### Structure

| | `F2 Estate` | `F3 Context` |
|---|---|---|
| **The decision** | Which repos, who owns them, how they interface | What the agent knows, at what layer, owned by whom |
| **Decided by** | Architect | Architect + per-repo owners |
| **When** | Per quarter; per new repo | Continuously, reviewed per quarter |
| **Recorded in** | Registry; per-package settings | `CLAUDE.md`, `.claude/rules/`, the briefing manifest |
| **Reverse** | Moderate — repo splits are painful but bounded | **Low** — context is text; rewrite it |
| **Signal you got it wrong** | Nobody knows which repo a change belongs in | Agents repeat corrections you have already given twice |
| **Default if you don't decide** | Repos found by memory | One giant `CLAUDE.md` nobody reads and everybody pays for |

### Motion

| | `F4 Control` | `F5 Capability` |
|---|---|---|
| **The decision** | How work is decomposed, sequenced, dispatched | What gets packaged as reusable, and what "good" means |
| **Decided by** | The team | The team; standards by senior IC / architect |
| **When** | Per epic | Per repeated task; standards per quarter |
| **Recorded in** | Blueprint, workflow script, task graph | `standards/`, skills, plugin manifests |
| **Reverse** | **High** — try it for one epic | **High** for skills; **moderate** for standards, which accrete dependents |
| **Signal you got it wrong** | Work stalls waiting on undeclared dependencies; two people do the same thing differently | The third time someone pastes the same checklist into chat |
| **Default if you don't decide** | Ad hoc prompting | Tribal knowledge; capability trapped in individuals |

### Trust

| | `F6 Policy` | `F7 Evidence` | `F8 Learning` |
|---|---|---|---|
| **The decision** | What agents may do, enforced where | What proves a claim | What promotes a change, and who approves |
| **Decided by** | Lead + org (+ security where it exists) | Lead | Lead + owners |
| **When** | Per action class; reviewed continuously | Once, then per gate | Once the corpus exists |
| **Recorded in** | Deny rules, hooks, managed settings | OTel config, result schemas, gates | Promotion record, eval corpus |
| **Reverse** | High to change; **cannot be applied retroactively** | High; **past runs are unrecoverable** | High |
| **Signal you got it wrong** | You find out what an agent could reach by it reaching it | "It said it was done" and it wasn't | The same class of bug is found a third time |
| **Default if you don't decide** | Whatever the agent can reach | Exit codes and vibes | Nothing persists |

> **The retroactivity property is what makes Trust different from Motion.** You can adopt a new
> control model tomorrow and it applies to tomorrow's work. You cannot adopt Evidence tomorrow and
> learn what happened last month. Trust decisions are cheap to *make* and impossible to
> *backdate* — which is the argument for making them early even when nothing is forcing you to.

---

## 3. Decision rights

Who has authority, and what each role can do without asking.

| Role | Owns outright | Consulted on | Cannot unilaterally change |
|---|---|---|---|
| **Platform owner / eng lead** | F0 Substrate | F1, F6 | Standards content (F16), team process (F4) |
| **Team lead** | F1 Surfaces, F4 Control | F0, F5, F8 | Enforcement policy (F6) |
| **Architect** | F2 Estate, F3 Context | F4, F5 | F0, F6 |
| **Senior IC** | F16 Standards | F3, F7 | F0, F1, F6 |
| **Security / org** | F6 Policy enforcement | F0, F7 | Anything in Process |
| **Any engineer** | Their own F5 skills; F3 within their package | — | Anything in Foundation or Trust |

**One rule worth stating explicitly:** *nobody unilaterally loosens Trust.* Adding a deny rule is
an individual decision. Removing one is not. This is the same monotonic-narrowing invariant QM
encodes as *narrower scopes can only tighten, never loosen*, and Claude Code encodes as
*deny wins from any scope*. Two systems converged on it independently; adopt it as a team norm, not
just a config behavior.

---

## 4. Sequencing

The order to make these decisions, and what each unlocks.

```
  1. F0 Substrate ──── you cannot configure anything before you know what you're configuring
       │
  2. F1 Surfaces  ──── you cannot decide what's authoritative until you know what exists
       │
  3. F2 Estate ─┬───── what code is in scope
       │        │
  4. F3 Context ┘      what the agent knows about it — needs the estate first
       │
  5. F6 Policy  ──── ⚠ EARLY, out of band order
       │
  6. F4 Control ──── now that boundaries exist, decide how work moves
       │
  7. F5 Capability ── package what you find yourself repeating
       │
  8. F7 Evidence ──── instrument before you need the history
       │
  9. F8 Learning ──── last; needs a corpus from 7
```

**Why Policy jumps the queue.** It reads as a Trust-band decision and belongs there
conceptually, but it must be *made* early because it cannot be applied retroactively and because
every Motion decision after it assumes a boundary. A team that sequences Policy last discovers its
boundaries by crossing them.

**Why Evidence is late but not last.** It needs something to observe, so it cannot be first. But it
must precede Learning, which is why F8 sits at the end — the evidential threshold in
`03-maturity.md` is exactly this dependency expressed as a maturity rule.

---

## 5. What the pre-flight generator reads from this

`05-preflight-spec.md` walks bands in the §4 order and, per function, asks three things:

| Asks | From |
|---|---|
| **Do you need this function yet?** | Target stage from `03-maturity.md`; not every team needs F8 on day one |
| **Who provides it?** | The provider column in `02-functions.md` — native / gstack / Gas City / QM / LoomWarp / you |
| **Who decides and where is it recorded?** | The §2 tables above — the answer becomes a line in the generated config |

The generated output is therefore not just a file manifest. It is a **decision record**: for each
function, what was chosen, who owns it, and where the artifact lives. That record is itself an F7
artifact — the install proves what was decided.

---

*Next: [`05-preflight-spec.md`](./05-preflight-spec.md) — the generator.*
