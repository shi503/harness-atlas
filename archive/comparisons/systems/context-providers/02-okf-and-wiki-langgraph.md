---
title: "Teardown — OKF v0.2 (Google) and wiki-langgraph (varunyn)"
tier: reference
project: loomwarp
created: "2026-08-27"
status: DRAFT
owner: KD
---

# OKF and wiki-langgraph — the portable context bundle

> **Attribution, because it is easy to get backwards.** **OKF — the Open Knowledge Format — is
> Google's**, published at `GoogleCloudPlatform/knowledge-catalog/okf/SPEC.md`, currently **v0.2**.
> **`github.com/varunyn/wiki-langGraph` is not Google's** — it is an independent LangGraph
> implementation of that spec by a single author, v0.4.0. Both cite Karpathy's LLM-wiki post as their
> origin, which is why they get conflated. **A schema requirement is OKF's; a pipeline behaviour is the
> implementation's.** Recorded in
> [`../../2026-08-research/99-source-hygiene.md`](../../2026-08-research/99-source-hygiene.md) §1.3.

**What it is.** A vendor-neutral specification for packaging knowledge as a directory of markdown files
with YAML frontmatter, cross-linked into a graph an agent can read — plus a reference pipeline that
compiles a raw corpus into one.

**Why it matters to us more than anything else in this folder.** **OKF v0.2 is the only artifact in this
corpus that specifies context provenance as a schema.** It is the direct test of LoomWarp's
differentiation claim, and §6 below runs that test.

> Scored against [`../../../../specs/v0/09-context-layer.md`](../../../v0/09-context-layer.md) §6.

---

## Architecture

| Layer | **OKF v0.2** (the spec) | **wiki-langgraph v0.4.0** (an implementation) |
|---|---|---|
| **Unit** | A UTF-8 markdown file with YAML frontmatter. **`type` is the only always-required field — an open string with no vocabulary** | A compiled concept note, `type: Note` |
| **Recommended** | `title` · `description` · `resource` · `tags` | — |
| **Registry** | `index.md` reserved; **only the bundle root may declare `okf_version`** | Generated with note metadata and graph counts |
| **History** | `log.md` reserved | — |
| **Links** | Absolute bundle-relative (`/…`, recommended) or relative | Standard markdown; **authored Backlinks kept distinct from semantic See also** |
| **Provenance** | **`sources[]`** — `resource` (required) · `id` · `author` · `usage_count` over `usage_window` · `last_modified` | `compiled_from:` frontmatter |
| **Generation** | **`generated: {by, at}`** | — |
| **Trust** | **`verified: [{by, at}]`** → derived tiers **unverified → machine-confirmed → human-reviewed** | Risk-based review queue for LLM candidates |
| **Lifecycle** | **`status: draft \| stable \| deprecated`** · **`stale_after`** (ISO-8601) | — |
| **Attestation** | **Attested Computation** type: `runtime` · `parameters` · `computation` · **`executor: {resource, receipt}`** · **`attester: {resource}`** | — |
| **Actors** | `<producer>/<version>` for agents · **`human:<id>`** · **`process:<id>`** | — |
| **Pipeline** | — | `ingest → compile_wiki → index → lint`, LangGraph nodes with per-node timeouts |
| **Cache** | — | Manifest of SHA-256 stripped-body hashes; skips LLM/QMD calls on unchanged bodies |
| **Gate** | — | **Lint exits 1** on unresolved wikilinks, orphan notes, stale output, `index.md` drift, OKF docs missing `type` |
| **Agent** | — | Bounded `inspect → plan → act → verify → replan`, **2 iterations default**; warnings non-blocking, lint errors blocking |

---

## Primitives it names

| Primitive | What it is | Function it implements | Scope it serves |
|---|---|---|---|
| **bundle** | A directory of markdown + frontmatter, portable across tools | `F3` — the store | **any cell; the spec is silent on scope** |
| **concept doc** | One file, one `type` | `F3 write` | — |
| **`index.md`** | Reserved registry, progressive disclosure | `F3 select` | — |
| **`sources[]`** | Per-item provenance with credibility signals | `F3 write` → **`P-10`** | — |
| **`verified[]`** | Confirmation events → trust tier | `F3 write` → **`P-12`** | — |
| **`stale_after`** | An explicit staleness instant | `F3 select` → **`P-13`** | — |
| **Attested Computation** | A computation with an executor receipt and a deterministic attester | `F7` more than `F3` | — |

**OKF declares no scope model at all.** That is the one contract axis it does not touch — `P-1` through
`P-4` are unaddressed. A bundle is portable; who may read it is somebody else's problem.

---

## What it forces you to decide

1. **Is this document generated, verified, or neither** — the trust tier is derived, so you cannot skip
   the question.
2. **When does this go stale** — `stale_after` is an instant, not a heuristic.
3. **Who is the actor** — and the convention makes you distinguish an agent, a human and a process.
4. **Is your knowledge portable** — the whole spec is an argument that a context bundle should outlive
   the tool that built it.

---

## What it does well

**It makes provenance a schema rather than a practice.** `sources[]` with per-source `author`,
`usage_count` and `last_modified` is per-claim attribution written down. Nobody else in this corpus has
this at the document level.

**The actor convention is Chan et al.'s *Attribution* made concrete.** `human:<id>` ·
`process:<id>` · `<producer>/<version>` is identity binding as a three-line convention rather than an
infrastructure programme.

**Trust as a derived tier, not a stored flag.** `unverified → machine-confirmed → human-reviewed` falls
out of `generated` and `verified[]` rather than being asserted. **A stored trust flag rots; a derived
one cannot.**

**`executor: {resource, receipt}`.** This is the run receipt — the thing
[`../../2026-08-research/01-worldsfair-2026-vocabulary.md`](../../2026-08-research/01-worldsfair-2026-vocabulary.md)
§4 records as new vocabulary from OpenAI — shipped as a field.

**The implementation's lint is a real gate.** `run` exits 1 on unresolved wikilinks, orphans, stale
output and index drift. **Compile fails on a broken graph**, which is more than any of the three
decision ledgers does.

**The bounded agent is Factor `IX` reached independently.** `inspect → plan → act → verify → replan`,
two iterations, *"when no safe automatic next action exists, it stops for review rather than retrying
indefinitely."* Same rule as `generic-cerebro`'s bounded-at-two, in ~200 lines of Python.

---

## What it does not claim

Scope or access control · per-*run* resolution · a manifest joined to a work outcome · a controlled type
vocabulary · ownership or RACI · injection defence.

---

## Credibility check

| | |
|---|---|
| **License / governance** | OKF published by Google Cloud as an open, vendor-neutral spec. wiki-langgraph is MIT-licensed by an individual |
| **Stage** | OKF **v0.2**, superseding v0.1 — *"makes provenance, trust, lifecycle, and attestation first-class while keeping the format minimally opinionated"*. Implementation at v0.4.0 |
| **Scale evidence** | **None published for either.** No adoption numbers, no corpus sizes |
| **Measured quality** | None |
| **Caveat** | The spec was read via a fetch of `SPEC.md` on 2026-08-27, not a full local checkout. Field lists are near-verbatim; **re-pull before any of it enters an externally published document**, per the standing caveat |

---

## 6. What this does to LoomWarp's claim

The claim under test, from `loomwarp-team-system` `specs/v1/01-gap-analysis.md` (private):
*"Claude Code has session transcripts but no versioned context manifest; **nobody in the landscape has
provenance. This is the whitespace. Opportunity, not gap.**"*

| Claim | Status |
|---|---|
| *Nobody in the landscape has context provenance* | ❌ **False.** OKF v0.2 specifies it, with a Google-backed open spec and a working implementation |
| *Context provenance is unclaimed whitespace* | ❌ **False as written.** It is a named category with an attested vocabulary — `context layer` occurs 13 times in the World's Fair corpus, outranking `provenance` at 9 |
| *A per-**run** resolved bundle, hashed and owner-attributed, reconstructable after the fact and **joined to that run's outcome**, is unclaimed* | ✅ **Holds.** OKF specifies **per-document** provenance and trust. The Briefing is **per-run resolution.** Different objects |

**The claim narrows for a third time, and it survives better than it did.** Before OKF, the claim was
*"nobody has done this"* — a claim that ages badly and just did. After OKF, it is *"there is a published
schema for the document layer, and nothing for the run layer"* — **which gives us something to be
compatible with rather than something to out-claim.** `P-10` through `P-14` should be satisfied *by
adopting OKF frontmatter*, not by inventing a competing schema. That is a strictly better position.

> **Falsifier, dated.** The claim dies if **OKF v0.3 or any successor adds a per-run resolution
> receipt** — an object recording what a specific agent run resolved, at which versions, with hashes.
> The Attested Computation type is one step away from this: it already has an `executor.receipt`.
> **Re-check 2026-12-01**, aligned with the existing re-check clock in
> [`../../02-component-matrix.md`](../../../../components/MATRIX.md) §3.

---

## The adjacency argument

**Read this teardown immediately after [`01-gbrain.md`](./01-gbrain.md), because together they are the
argument for `P-19`.**

OKF's only required field is `type`, **an open string with no vocabulary.** That is precisely the
condition that produced gbrain's 94 type values across 186,000 pages. OKF is right to leave it open — a
portability spec that dictates your types is a spec nobody adopts — but **a bundle that grows past a few
thousand documents and has no closed root will sprawl, and OKF supplies no mechanism to stop it.**

**Portability and consistency are in tension, and the two documents are the two horns.** The contract
resolves it by requiring both at different layers: adopt OKF's frontmatter for interchange (`P-10`–`P-14`),
and impose a closed type root locally (`P-19`).

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **`sources[]` · `generated` · `verified[]` · `stale_after` · `status`** — adopt the frontmatter verbatim | `P-10`, `P-12`, `P-13`, `P-14`. **Do not invent a competing schema** |
| 2 | **The actor convention** — `human:` · `process:` · `<producer>/<version>` | `P-11`. Three lines, and it closes identity binding |
| 3 | **Trust as a derived tier** | `P-12`. Derived cannot rot; stored can |
| 4 | **`executor: {resource, receipt}`** | `F7`. The run receipt as a field, not a slogan |
| 5 | **Reserved `index.md` / `log.md`** | `F3 select`. Progressive disclosure with a stable entry point |
| 6 | **Lint that fails the compile** on graph integrity | `P-18`, `P-22`. The only gate in this folder that runs on the corpus rather than on a write |
| 7 | **The bounded agent** — 2 iterations, stops for review rather than retrying | Factor `IX`. Independent confirmation of `generic-cerebro`'s bounded-at-two |
| 8 | **Authored backlinks kept distinct from semantic suggestions** | `F3 select`. Conflating them is how a graph stops being trustworthy |

---

## Sources

- **OKF v0.2 spec** — <https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md> · fetched 2026-08-27
- Google Cloud, *How the Open Knowledge Format can improve data sharing* · <https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing>
- **wiki-langgraph** — local copy at `wiki-langGraph`, v0.4.0: `README.md`, `docs/ARCHITECTURE.md`,
  `src/wiki_langgraph/` · read 2026-08-27 · <https://github.com/varunyn/wiki-langGraph>
- Karpathy, the LLM-wiki post and idea gist, cited by both as origin
