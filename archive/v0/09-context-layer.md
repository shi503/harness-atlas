---
title: "The context layer — F3 specified as a pluggable function"
tier: spec
project: harness-atlas
created: "2026-08-27"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# The context layer

**What this is.** The first **function spec**: one function of the harness, specified precisely enough
that a provider can be plugged in, and that a check can tell you whether one satisfies it.

> **The context layer is a function of the harness, not a product you buy.** This specifies the
> function so that **gbrain**, an **OKF** wiki, a **decision ledger**, or the harness's own memory can
> each satisfy it — and so that a team can tell which parts none of them satisfy.

**Why it is first.** `F3` is the function where LoomWarp's differentiation claim lives (the Briefing),
where its largest recorded gap lives (the individual/team boundary,
[`../../references/comparisons/01-concepts.md`](../../comparisons/01-concepts.md) §3.6 —
*"the largest single gap this analysis found"*), and where it already runs 1,428 lines of code that no
document grades. Three reasons pointing at one function.

**Genre note.** If a second function spec is ever written, both move to `specs/v0/functions/`. One file
does not earn a directory.

---

## 1. The function

> **`F3 Context` — what the agent knows.** Layered, owned, versioned knowledge served to an agent as a
> resolvable bundle with provenance and freshness — not a folder it happens to be able to read.

Two systems, at very different maturity, which is why
[`02-functions.md`](./02-functions.md) `C-11` grades them separately and rolls up as the minimum:

| System | What it is | Stage |
|---|---|---|
| **The Context Fabric** | the authored layers — org → domain → repo → package | native is good here |
| **The Briefing** | the per-*run* resolved bundle: hashes, versions, owners, joined to that run's outcome | **does not exist** |

### 1.1 The constraint that shapes the whole contract

> ⚠️ **More context is not better. More *constraint* is.**
>
> Gloaguen, Mündler, Müller, Raychev, Vechev (ETH Zürich), *Evaluating AGENTS.md*: context files do
> **not** generally improve success and add **20%+ inference cost**; **repository overviews are
> specifically unhelpful**, while **instructions are well followed**.
>
> ⚠️ Two briefs gave different arXiv IDs (`2602.11988` vs `2604.21090`) —
> [`99-source-hygiene.md`](../../comparisons/2026-08-research/99-source-hygiene.md) §2.
> **Confirm before either number enters an externally published document.** The finding itself is
> load-bearing and is not in doubt.

This is a requirement, not a caveat. **A provider that serves coverage is worse than no provider**: it
costs 20% more per run and does not raise success. Every MUST in §6 is about *scoping* and
*constraining* what reaches the window, and none is about breadth.

---

## 2. The method set — four verbs

Adopted from **Lance Martin's** decomposition with **Anthropic's** techniques as the fill, already in
[`02-functions.md`](./02-functions.md) §5. This section gives each verb a signature and a failure mode,
which the decomposition did not have.

**The crossing rule is the important column.** Only one verb crosses the individual/team boundary —
which is precisely why the boundary belongs to `write` and why `J2 Remember` is where the gap was
recorded.

| Verb | Signature | Failure mode when absent | May cross scope? |
|---|---|---|:--:|
| **write** | `write(scope, fact, provenance) → id` | Team-relevant facts land in a per-user store no teammate's agent can read — **a shadow source of truth** | **Yes — this is the only verb that routes between cells.** §4 governs it |
| **select** | `select(scope[], job) → bundle` | The agent begins ignorant every session, or is handed a repository overview that costs 20% and helps nothing | No — reads across cells, writes to none |
| **compress** | `compress(bundle, budget) → bundle` | The window fills with tool results and the run degrades mid-task | No |
| **isolate** | `isolate(scope[], bounds) → view` | Everything the store knows is reachable from every task — **`F6`'s blast-radius problem, §5** | No — it *enforces* cell boundaries |

**`select` returns a bundle, not a string.** The bundle is the Briefing: an addressable object with a
manifest, not a concatenation. That distinction is the whole of §6's per-run obligations, and it is what
makes `F7 Evidence`'s join to `F3` possible at all.

---

## 3. The scope model

**Individual-vs-team and project-vs-org are two axes, not one spectrum.** The 2×2 from
[`02-functions.md`](./02-functions.md) §0.3, applied:

|  | **project** — this codebase | **org** — everywhere |
|---|---|---|
| **individual** | my notes on this repo · scratch · what I tried yesterday | my preferences and working style, everywhere |
| **team** | this squad's conventions, decisions, and canon for this repo | the org's standards, policy, and shared knowledge |

**Every provider MUST declare which cells it serves.** Serving one cell is legal and common. Being
unable to say which cell is not — that is the condition under which `write` silently misroutes.

### 3.1 What the peers actually do, and why the disagreement matters

| System | Scope primitive | Cells |
|---|---|---|
| **gbrain** | `brain × source` — a *brain* is a database instance (personal **or** team); a *source* is a git repo inside it | all four, as two clean axes |
| **QM** | `scope` — `user:` · `channel:` · `project:`, each with its own memory, files, keychain, permissions, crons, sandbox | three flat values |
| **Indigo HQ** | `core/` vs `personal/`, skip-on-collision symlinks | two, as an overlay |
| **generic-cerebro** | `projects/<p>/decision-log/` (team) vs `_dev/<username>/` (individual, gitignored) | two, by directory |
| **gstack** | `~/.gstack/projects/<slug>/`, slug resolved by walking to the **outermost** repo root | one — individual by default, team by opt-in sync |
| **SageOx** | the shared Ledger, per-repo and cross-machine | team; a personal scope is not stated |

**No two agree.** `gbrain` is the only one whose model is actually two axes;
`QM`'s three values collapse the 2×2 and cannot express *individual × org*; `gstack` has one store and
makes sharing a transport concern. **A model that treats scope as a property of a store cannot
represent that spread. One that treats scope as an axis can** — and can then say, precisely, which cells
a given deployment leaves empty.

### 3.2 Where LoomWarp is

**`context/memory/decision-ledger/` serves no cell, because it has no concept of one.**
`storage/config.ts` hardcodes `DEFAULT_STORE_DIR = path.resolve(__dirname, "../store")`. There is one
store, at one path, for everybody and every project.

The seam already exists — `StorageOptions.storeDir` is defined and unused. **1,428 lines of working,
schema-validated, lock-guarded code are one parameter away from being scope-aware.** That is
`GAP-24`, and it is the cheapest P0 in the corpus.

---

## 4. Routing — where a fact goes

Adopted **verbatim** from `generic-cerebro`, which
[`05-context-and-the-librarian.md`](../../comparisons/systems/kd-built-frameworks/05-context-and-the-librarian.md)
§5 flags as *"the piece to take verbatim… short, mechanism-shaped, addresses a failure every agent
system has, and LoomWarp has no equivalent."* It has been sitting unclaimed since 2026-08-11.

> **Would another teammate's agent need this to be correct about the project?**

| Answer | Destination |
|---|---|
| No — it is about the user, their preferences, or how to work with them | **Personal memory** |
| Yes — it is shared knowledge or synthesis | **The knowledge base** |
| Yes, **and** it is change-managed with named ownership | **The decision log, via promotion** |

**The failure it prevents, stated by the source:** the agent reaches for personal memory *because it is
auto-loaded every session and zero-friction to write* — and that store is per-user, outside git,
invisible to every teammate's agent.

Two rules travel with it:

- **The smell test.** *A `type: project` memory is almost always a promotion smell.* Personal-identity
  and working-preference memories are the legitimate residents of the individual cells; project facts
  belong in a team cell.
- **Precedence.** When copies disagree, **the ledger wins.** A memory may cache a decision; the decision
  log is canonical.

**Promotion is a ceremony, not a copy.** Moving a fact from a knowledge base into a decision log
acquires an owner, a status, and an audit entry. A provider that lets `write` reach the decision log
directly has not implemented routing — it has implemented a third store.

---

## 5. Access control and blast radius

**This is the section the corpus does not have, and its absence is a finding.** Every prior treatment of
the individual/team boundary in this corpus — §3.6, the routing doctrine, `J2`, `OPEN-5` — frames it as
**ownership and routing**. None frames it as **access control**. Those are different problems with
different failure modes, and only one of them is a breach.

**Tanmai Gopal (PromptQL)**, AI Engineer World's Fair 2026, `Claws & Personal Agents` Track 1
([`data/aie-worldsfair-2026-schedule.md`](../../comparisons/2026-08-research/data/aie-worldsfair-2026-schedule.md),
p. 34), deployed at Fortune 100 banks:

> *"Everyone wants a shared 'company brain' … But it's nearly impossible to build one, because **the
> moment AI scrapes everyone's data into one place, a single wrong answer to the wrong person is a
> breach.** … Ergo, company brain projects can only ever ship to the few people who already had access
> to everything, or stay hobbled with strictly public information."*

His four sub-problems become four requirements on this function:

| # | Requirement | What it means here |
|---|---|---|
| **AC-1** | **Permissions for shared data and tools** | A scope cell is an authorization boundary, not just a directory. `select` MUST filter by the caller's grants, not only by the requested scope |
| **AC-2** | **A shared context layer with its own access control** | Access control belongs to the context layer, **not inherited from the filesystem.** A store readable because the repo is cloneable has no access control |
| **AC-3** | **Scoping the blast radius of wrong context** | The damage from one bad fact is bounded by how many cells can reach it. This is `isolate`, and it is why `isolate` is a first-class verb rather than a retrieval tuning knob |
| **AC-4** | **Auto-learning without auto-leaking** | The capture loop is the leak path. A fact promoted from an individual cell to a team cell **changes who can read it** — so promotion is an authorization decision, not a file move |

### 5.1 What this does to the model

**`AC-3` and `AC-4` are `F3 isolate` × `F6 Policy`, and that intersection currently has no owner.**
[`03-jtbd.md`](../../comparisons/03-jtbd.md) §4 asked the question — *"Is permission-aware
context one job or two?"* — named it as whitespace, and left it unassigned.

**This spec answers it: one function, `F3`, with the enforcement point in `F6`.** Context decides *what
may be reachable*; policy enforces *that it is not reached*. The split follows the same rule as `C-4`
(adapters are a property of `F0`, not a peer function): **the decision belongs to the function that owns
the object; the enforcement belongs to the function that owns the gate.**

Recorded as `OPEN-13`, because the alternative — widening `F6` to own context ACLs outright — is
defensible and has not been argued out.

### 5.2 The uncomfortable consequence

**A team context layer that a whole org can read is not a team context layer; it is a public one.** By
`AC-2`, LoomWarp's `context/` tree today has **no access control at all** — everything in it is readable
by anyone who can clone. That is correct and harmless while the corpus is public by design
([`STRATEGIST-loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/fractal/STRATEGIST-loomwarp.md) §4). It stops being harmless the
first time an adopting team puts something in a team cell that not all of them may read.

**This is why `AC-2` is a MUST in §6 even though nothing today violates it.** The constraint has to exist
before the first adopter, not after.

---

## 6. The provider contract ‡

**What a pluggable context provider must supply.** Each row cites the peer that demonstrates it — every
obligation here is implemented by somebody, so none is speculative.

> **Scoring rule.** Each row is scoreable `●` implemented · `◐` partial · `○` absent, against any
> provider, **without editing this table.** A row that cannot be scored that way is prose, not a
> contract, and must be rewritten or deleted.

### 6.1 Identity and scope

| # | | Obligation | Demonstrated by |
|---|:--:|---|---|
| **P-1** | MUST | Declare which **scope cells** (§3) it serves | gbrain `brain × source` |
| **P-2** | MUST | `list_scopes()` — enumerate its cells at runtime, not only in documentation | QM `scope` |
| **P-3** | MUST | **Fail conservative on an unknown scope.** An unrecognised scope resolves to *no match*, never to *all* | gstack `filterByScope()` — *"fail conservative, don't leak into every context"* |
| **P-4** | SHOULD | Resolve a project's identity deterministically and identically from any subdirectory | gstack's walk to the **outermost** repo root |

### 6.2 The verbs

| # | | Obligation | Demonstrated by |
|---|:--:|---|---|
| **P-5** | MUST | `write(scope, fact, provenance) → id` with the scope **explicit at the call site** | all three ledgers |
| **P-6** | MUST | `select(scope[], job) → bundle` returning an **addressable bundle**, not a concatenated string | ‡ nobody — this is the Briefing |
| **P-7** | MUST | Apply the §4 routing question at `write`, or expose a hook where the harness can | generic-cerebro's routing doctrine |
| **P-8** | SHOULD | `compress(bundle, budget)` with a declared discard order | native compaction |
| **P-9** | MUST | `isolate(scope[], bounds) → view` — a caller can be given strictly less than the store holds | Indigo `core/`÷`personal/` · path-scoped rules |

### 6.3 Provenance, trust, freshness

| # | | Obligation | Demonstrated by |
|---|:--:|---|---|
| **P-10** | MUST | **Per-item provenance** — what this fact derives from, who produced it, when | OKF v0.2 `sources[]` |
| **P-11** | MUST | **Actor identity on every write**, distinguishing human from agent from process | OKF `human:<id>` · `process:<id>` · `<producer>/<version>` |
| **P-12** | SHOULD | **Trust tier** derivable from the record: unverified → machine-confirmed → human-reviewed | OKF `generated` + `verified[]` |
| **P-13** | SHOULD | **Freshness** — an explicit staleness instant, not a mtime heuristic | OKF `stale_after` |
| **P-14** | SHOULD | **Lifecycle status** — `draft` / `stable` / `deprecated` | OKF `status` |
| **P-15** | MUST | **Per-run manifest** — for a given run, what was resolved, at which version, with hashes | ‡ nobody — the Briefing |

### 6.4 Integrity and change

| # | | Obligation | Demonstrated by |
|---|:--:|---|---|
| **P-16** | MUST | **Ownership** on any record that is change-managed | decision-ledger RACI |
| **P-17** | MUST | **Supersession that retains history** — never a silent overwrite | gstack append-only log · cerebro conflict sidecars |
| **P-18** | MUST | **Referential integrity on supersession pointers.** A pointer to a nonexistent record fails validation | ‡ **nobody** — cerebro's `superseded_by` and `cross_refs` are unchecked |
| **P-19** | SHOULD | **A closed type root with an open subtype set** — extensible without unbounded vocabulary growth | gbrain: 5 closed primitives, `subtype_field` allowlist |
| **P-20** | SHOULD | **Migration under a live corpus** — retype existing records without a dump-and-reload | gbrain `migration_from` + `mapping_rules` |
| **P-21** | MUST | **Redaction that expunges from every read path**, not only from the active view | gstack `redact` |

### 6.5 Enforcement and safety

| # | | Obligation | Demonstrated by |
|---|:--:|---|---|
| **P-22** | MUST | **A write gate the model cannot reach.** A convention in a prompt is not a gate | cerebro's git pre-commit hook |
| **P-23** | MUST | **Treat stored context as data, never as instructions, at the render boundary** | gstack `datamark()` |
| **P-24** | MUST | **Fail closed on secrets and PII at write time** | gstack: *"this store is NON-INTERACTIVE and syncs cross-machine, so there is no confirm path — fail closed"* |
| **P-25** | MUST | **`AC-2`** — access control owned by the context layer, not inherited from the filesystem | ‡ **nobody in this corpus** |

> **`P-23` deserves its own sentence.** Everything a context layer returns was written by somebody, and
> in a team store *somebody* includes people outside the current session. gstack strips C0/C1 controls,
> collapses code fences, neutralises `---` banner sentinels, and inserts zero-width spaces into `<|`,
> `|>`, `<system>` and `Human:`/`Assistant:` turn prefixes — **at render, not at write**, on the
> explicit reasoning that a write-time denylist cannot cover records written before a pattern existed.
> **A shared context layer without this is a prompt-injection channel with an audit trail.**

### 6.6 What LoomWarp owes

`‡` marks **specified, not built** — five obligations have no implementation anywhere in this corpus,
and four of the five are where the differentiation claim lives:

| Obligation | State |
|---|---|
| `P-6` `P-15` the Briefing | ‡ **The claim.** Per-*run* resolution and its manifest |
| `P-18` referential integrity | ‡ Unimplemented by every provider examined |
| `P-25` context-owned ACL | ‡ Unimplemented by every provider examined |
| `P-1`…`P-4` scope | ‡ in LoomWarp's ledger; **implemented by three peers** |

---

## 7. The conformance surface

**Why this specification is checkable and the predecessor's `F3` was not.**
[`02-functions.md`](./02-functions.md) §5 states the principle: *"An insertion point is mechanically
checkable in a way an abstract noun is not."* Binding each verb to a named point in the loop is what
converts §6 from a wishlist into a test plan.

| Insertion point | Verb | Native emission point | What can be asserted |
|---|---|---|---|
| before the agent is invoked | `select` | **`InstructionsLoaded`** | The resolved set is enumerable **at the moment it is loaded** — `P-6`, `P-15` |
| before each model call | `compress` | — | Discard order is declared and applied — `P-8` |
| wrapping the model call | `select`, `isolate` | — | No cell outside the declared scope appears in the window — `P-1`, `P-9` |
| wrapping the tool call | `write`, `isolate` | `PreToolUse` | Every write carries scope, actor and provenance — `P-5`, `P-10`, `P-11`; the gate is outside the prompt — `P-22` |

**`InstructionsLoaded` already fires.**
[`03-hooks.md`](../../content/claude-code/03-hooks.md) names it *"the load-bearing event for
LoomWarp's context-provenance manifest"*, and
[`20-consolidated-guide.md`](../../content/claude-code/20-consolidated-guide.md) records the hole it
would fill: *"**No context provenance.** Nothing records which instruction files, skills, and rules were
in the window."*

> **The Briefing does not need to be invented. It needs to be emitted from an event that already
> exists.** That reclassifies `P-15` from an unbuilt design to **an integration** — the same move
> [`02-component-matrix.md`](../../comparisons/02-component-matrix.md) §1 makes for the `F7`
> join: *"for everyone else the join is a build; here it is an integration."* Second function, same
> sentence.

**The doctrine row.** [`architecture-patterns.md`](https://github.com/shi503/loomwarp-team-system/blob/master/standards/architecture-patterns.md) §4:
*"Every external system is reached through exactly one adapter that owns all calls to it… **an adapter
that leaks its vendor's types into the domain has failed at its only job.**"* A context provider adapter
that returns gbrain page types, or OKF frontmatter, to the rest of the harness has failed this test. The
bundle is the domain type.

---

## 8. Why a context adapter is legitimate

Pre-empting the objection, because the corpus contains it in writing.

[`07-the-map.md`](../07-the-map.md) says: *"**You do not write an adapter for the thing you
are.**"* That is the argument for why LoomWarp does not build a harness adapter — we *are* a process
layer installed into a harness, and `C-4` resolved adapters as a property of `F0`.

**It does not transfer to `F3`, for one reason: we are not the context layer.** `F3`'s Fabric provider
is explicitly `native`, and the three named alternatives are other people's products. **We resolve
against a context layer; we do not implement one.** Writing an adapter for a thing you are not is
exactly when an adapter is correct.

**The evidence that nobody has done this:** `02-component-matrix.md`'s first row is `Harness adapter`.
There is no `Context adapter` row anywhere in the corpus — not for us, not for any peer. **Adding that
row is the finding**, and `GAP-25` is where it lands.

---

## 9. Not specified here

Named so the boundary is not mistaken for coverage.

- **Retrieval quality.** No P@k target, no ranking requirement, no embedding choice. gbrain publishes
  P@5 = 49.1%; we have no number and should not invent one.
- **Storage engine.** Markdown, SQLite, Postgres, or a graph store are all conformant.
- **Sync and federation transport.** How a team cell reaches a second machine is out of scope.
- **The librarian.** Who or what curates the knowledge base is `F8 Learning`.
- **The other eleven functions.** They carry provider *names*, not contracts. Do not describe them as
  pluggable until each has a §6.

---

## 10. Open

| # | Question | Why it is not settled here |
|---|---|---|
| **`OPEN-13`** | Does `F6 Policy` widen to own RBAC-over-context, or does `F3 isolate` own the decision with `F6` owning only the gate? | §5.1 takes the second position. The first is defensible and has not been argued out. `03-jtbd.md` §4 raised it and left it unassigned |
| **`OPEN-14`** | Is the Briefing (`P-6`, `P-15`) a **provider obligation**, or a LoomWarp layer that sits *above* any provider? | If it is a provider obligation, no current provider is conformant and the contract is aspirational. If it is a layer above, `P-6`/`P-15` should move out of §6 into `F7`. **This decides whether we integrate or build** |

---

*Model: [`02-functions.md`](./02-functions.md) — the ruling, the scope axis, the provider definition ·
Providers: `references/comparisons/systems/context-providers/` — the five teardowns ·
Grading: [`10-context-gap-analysis.md`](./10-context-gap-analysis.md)*
