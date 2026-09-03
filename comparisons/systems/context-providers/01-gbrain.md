---
title: "Teardown — gbrain as a context provider (Garry Tan)"
tier: reference
project: loomwarp
created: "2026-08-27"
status: DRAFT
owner: KD
---

# gbrain — the typed knowledge store

**What it is.** A knowledge and retrieval engine over a markdown corpus held in git and indexed into
Postgres or PGLite, with a **forkable, versioned type system** — *schema packs* — governing what a page
may be and which verbs may connect it. Local copy read at `/Users/…/gbrain`, **v0.42**.

**Why it is in this corpus.** It is the most complete implementation of a context layer in the
landscape, and the only one that treats its own type vocabulary as a governed artifact rather than a
convention. It is also the source of the single best empirical argument for why that matters — see
*Credibility check*.

> Scored against the provider contract at
> [`../../../../specs/v0/09-context-layer.md`](../../../archive/v0/09-context-layer.md) §6.
> The general-purpose teardown of gstack + gbrain as *systems* is
> [`../gstack-gbrain.md`](../gstack-gbrain.md); this one reads gbrain only as an `F3` provider.

---

## Architecture

| Layer | Implementation |
|---|---|
| **Schema** | `gbrain-base-v2.yaml` — **14 canonical page types plus `note` as a catch-all** |
| **Type root** | **Five closed primitives** — `entity` · `media` · `temporal` · `concept` · `annotation`. *"Packs CANNOT add new primitives, only types that extend them"* |
| **Extension** | A pack adds types, subtypes, aliases and path prefixes. It cannot add a primitive |
| **Links** | 12 verbs, defaulted per primitive (`entity` → `works_at`, `founded`, `mentions`, `invested_in`, `advises`, `attended`) |
| **Claims** | `takes_kinds: [fact, take, bet, hunch]` — the store distinguishes what it *knows* from what it *thinks* |
| **Two graphs** | **primitive = the defaults graph · aliases = the query-closure graph.** Deliberately separate |
| **Scope** | `brain × source` — a *brain* is a database instance (personal **or** team); a *source* is a git repo inside it |
| **Write path** | An 8-step skeleton: bundled-guard → per-pack lock → read → mutate → file-plane lint → atomic write → audit log → cache invalidation |
| **Migration** | `migration_from` + `mapping_rules`: `retype` · `page_to_link` · `page_to_alias` · a catch-all `*unknown*` → `note` preserving `frontmatter.legacy_type` for rollback |
| **Validation** | **Two planes.** File-plane (duplicates, missing prefixes) and data-plane via `--with-db` (`stored_type_is_alias`, `stored_type_undeclared`) |
| **Security** | `subtype_field` restricted to an allowlist so a third-party pack cannot inject `title`, `slug` or `type`; `op-trust-gate.ts` |
| **Retrieval** | Vector + BM25 + typed edges |
| **Surface** | 18 `gbrain schema` subcommands, including `detect`, `suggest`, `review-orphans`, `lint`, `explain`, `downgrade` |

**The two-graph split is the subtle part**, and the code says why:

> *"Primitives drive INHERITANCE DEFAULTS only — NOT query closure… Run `gbrain whoknows expert` and
> you'd expect to find person + researcher + cofounder, **NOT adversary-profile** (also entity
> primitive). Per-type `aliases: [person]` is the opt-in; primitive sharing is not."*

Sharing a primitive must not mean appearing in each other's searches. **Build one graph and use it for
both, and every query silently over-matches forever.**

---

## Primitives it names

| Primitive | What it is | Function it implements | Scope it serves |
|---|---|---|---|
| **brain** | A database instance, personal or team | `F3` — the store | **individual × org** or **team × org** |
| **source** | A git repo inside a brain | `F3` — the partition | **× project** |
| **schema pack** | The forkable, versioned type system | `F3 write`/`select` — the vocabulary | team × org |
| **primitive** (5, closed) | The type root | `F3` — bounded vocabulary | — |
| **alias** | Query closure | `F3 select` | — |
| **subtype** | Frontmatter-declared variation, allowlisted | `F3 write` | — |

**`brain × source` is the most valuable primitive in this corpus for `F3`.** It is the individual/team
boundary expressed as **two axes rather than one**, which is the only peer model that can represent all
four cells of [`09-context-layer.md`](../../../archive/v0/09-context-layer.md) §3's 2×2.

---

## What it forces you to decide

1. **Personal brain or team brain** — and gbrain makes you answer before you write anything.
2. **Which git repos are sources of which brain** — the project axis, made explicit.
3. **Which pack is active**, resolved through a 7-tier chain, so *"which vocabulary am I on"* always has
   an answer.
4. **Whether a new page type is a type, a subtype, or an alias.** Three different answers with three
   different consequences, and the CLI makes you pick.

---

## What it does well

**The closed root with the open extension set.** Five primitives, immovable; types, subtypes and
aliases, extensible. You get compile-time exhaustiveness on the thing that must never sprawl and
freedom on the thing that must grow. **This is the single most transferable design decision here.**

**Migration under a live corpus.** `mapping_rules` retype existing pages in place, convert edge-shaped
pages into real link rows, convert redirect-shaped pages into alias rows, and sweep everything
unrecognised into `note` **with `legacy_type` preserved for rollback**. Nobody else in this corpus can
change their vocabulary without a dump-and-reload.

**The ontology audits reality, not the other way round.** `schema detect` proposes types matching the
shape the corpus actually has; `review-orphans` surfaces pages no type claims. **The store tells you
where your model is wrong** rather than waiting to be asked.

**It treats its own type system as an untrusted input.** The `subtype_field` allowlist exists because a
third-party pack could otherwise rewrite `title`, `slug` or `type` across every page. **A forkable
schema is an attack surface**, and gbrain is the only system here that noticed.

**It publishes a retrieval number.** P@5 = 49.1%. Imperfect and stated, which is worth more than
silence.

---

## What it does not claim

Per-run resolution · a manifest joined to a work outcome · policy enforcement over context ·
render-boundary treatment of stored text as data · ownership or RACI on a record.

---

## Credibility check

| | |
|---|---|
| **License** | MIT |
| **Stage** | v0.42, actively developed, ~35 schema-pack modules and 30+ dedicated test files |
| **Scale evidence** | 155,795 indexed pages · 24,589 people · 5,340 companies |
| **Measured quality** | **P@5 = 49.1%**, published |
| **The postmortem** | **A production brain of 186,000 pages accreted 94 distinct `pages.type` values in 9 clusters of redundancy.** `--type article` missed 2,200 articles typed `media/article`, `sources/article`, `source/article`. Enrichment could not reach 80+ legacy types. 5,521 redirect pages inflated orphan counts |
| **Caveat** | Read locally at v0.42. Scale figures are the project's own published numbers, not independently verified |

> **The postmortem is the argument, and it should be cited as such.** The failure it describes is
> exactly the four-reasonable-choices problem: *"should it be `article`, `media/article`,
> `sources/article`, or `source/article`? Four reasonable choices, none of them right."* A human picks
> one and remembers. **An agent picks differently each session, or invents a fourth.** `gbrain-base-v2`
> is the response, and it is why `P-19` (closed root, open subtypes) is in the contract.

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **`brain × source`** — the individual/team boundary as two axes | `F3` §3. The only peer model that spans all four cells |
| 2 | **Closed type root, open subtype set** | `P-19`. The 94-type postmortem is the evidence |
| 3 | **`mapping_rules` + `legacy_type`** — vocabulary change under a live corpus, reversibly | `P-20`. We have already renamed a vocabulary three times with no such mechanism |
| 4 | **Two graphs, kept separate** — inheritance defaults ≠ query closure | `F3 select`. Cheap to honour up front, expensive to unpick later |
| 5 | **`detect` / `review-orphans`** — the model audits the corpus | `P-2`. Turns a schema from a rule into an instrument |
| 6 | **The `subtype_field` allowlist** — a forked schema is untrusted input | `P-25`, and `F6` more generally |
| 7 | **Publishing a retrieval number** | Credibility. We have none and should not invent one |

---

## Sources

- Local copy at `gbrain` v0.42 — `src/core/schema-pack/` (~35 modules), `base/gbrain-base-v2.yaml`,
  `primitives.ts`, `docs/architecture/schema-packs.md`, `docs/architecture/type-taxonomy.md`,
  `docs/schema-author-tutorial.md`, `docs/GBRAIN_RECOMMENDED_SCHEMA.md` · read 2026-08-27
- The 94-type postmortem: `docs/architecture/type-taxonomy.md`, issue #1479
- Scale and P@5: [`../gstack-gbrain.md`](../gstack-gbrain.md)
