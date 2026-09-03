---
title: "Source hygiene — what failed, what is unverified, and two fabrications found in the wild"
tier: reference
project: loomwarp
created: "2026-08-25"
status: DRAFT
owner: KD
---

# Source hygiene

**What this is.** The register of what this research could **not** establish, and of two circulating
claims that are demonstrably false. It exists because a research corpus that publishes only its
successes is exactly the failure mode the comparison corpus diagnoses in competitors.

**The rule this enforces.** Nothing listed here may appear as fact in `specs/` or in the comparison
documents. Where a finding rests on a relayed source rather than a direct read, the citing document
says so.

---

## 1. Two fabrications found in circulation

These matter beyond this pass: they are `FM-3` documentation drift occurring in the wild, in sources a
careless reader would cite.

### 1.1 A survey paper that does not appear to exist

An unattributed page at `agentic-ai.readthedocs.io` publishes a seven-layer harness taxonomy
("ETCLOVG") and cites two surveys. One — *"Agent Harness Engineering: A Survey, Picrew et al.,
submitted to TMLR, 2026"* — **could not be located anywhere.** The same page mis-cites its other source,
attributing Meng et al.'s survey to an arXiv ID that actually belongs to a different paper on scaling
laws. The acronym appears nowhere else and is most likely an unattributed derivative of
`H = (E,T,C,S,L,V)`.

**Do not cite that page.** It is the most plausible-looking wrong source encountered in this research.

### 1.2 A maturity model attributed to Anthropic that is not in the document

A widely-circulated secondary presents *"Shift 1–8"* titles and a **"conductor → orchestrator" maturity
progression** attributed to Anthropic's *2026 Agentic Coding Trends Report*. The word **"conductor"
appears zero times in the actual PDF**, confirmed twice independently by full-text extraction. A grep
for `maturity|level|tier|stage|readiness|capability model` returns only *"Traditional SDLC stages
remain"* and *"from the earliest stages."* **The report contains no maturity model.**

### 1.3 An attribution that is easy to get backwards

**OKF — the Open Knowledge Format — is Google's**, published at
`GoogleCloudPlatform/knowledge-catalog/okf/SPEC.md`, currently **v0.2**.
**`github.com/varunyn/wiki-langGraph` is not Google's** — it is an independent LangGraph implementation
of that spec by a single author, v0.4.0.

Both cite Karpathy's LLM-wiki post as their origin and both compile a markdown wiki, which makes them
easy to conflate in either direction. **State which one a claim rests on.** A schema requirement is
OKF's; a pipeline behaviour (`ingest → compile_wiki → index → lint`, the bounded agent, the review
queue) is the implementation's.

Recorded here because misattributing a vendor specification to an individual's repository — or an
individual's design decisions to Google — is the class of error that survives into a published document.

---

## 2. Unverified — do not state as fact

| Claim | Status |
|---|---|
| **`arXiv:2604.21090` vs `arXiv:2602.11988`** for the context-file study | **Two briefs gave different IDs.** The second carries authors (Gloaguen, Mündler, Müller, Raychev, Vechev, ETH Zürich) and verbatim quotes, so it is the more likely correct one — but **fetch and confirm before either number enters prose.** This finding is load-bearing against `F3` |
| Fiserv agentOS general availability | Target was August 2026; GA not confirmed |
| OpenClaw star count | Three sources give 247k / 387.6k / ~30k. Use none |
| The PFF talk's metrics (*"25x more deploys"*, *"10x output"*) | Relayed from a machine summary; nobody read the talk |
| Emil Eifrem's actual argument | Only the verbatim title and slot are confirmed; the talk has **no abstract** in the schedule and the recording was not watched |
| Superconductor's *"99.9% of PRs agent-generated"* | Vendor claim, unverified |
| MCP "110M+ monthly downloads" | Real but dated ~April 2026 — stamp the date |
| AAIF Momentum Report layer counts | The report is **internally inconsistent** (says one layer has "the most projects" while listing another higher), and the LFX dashboard says *"100 projects across 11 ecosystem layers"* against the report's 116 across 5 |
| Anthropic's *"Effective context engineering"* post date | No date on page; search suggests Sept 2025 |
| Tessl's *"Skills are the new code"* reframe date | Third-party attribution |
| "Agent = Model + Harness popularized by Mitchell Hashimoto" | Wikipedia's attribution conflicts with Osmani's explicit credit to Trivedy |
| Garry Tan's *"keep the harness thin"* quote | Search summary of an X post, not the post itself |

---

## 3. Contradictions caught between research passes

Recorded because they show why single-source research is unsafe.

1. **A delegated agent reported that the `Harness Engineering`, `Context Engineering` and `Agentic
   Engineering` tracks did not exist**, from a partial page fetch. Its supervisor overturned this
   against the schedule PDF, and it was then confirmed a third time directly against
   [ai.engineer/worldsfair/2026](https://www.ai.engineer/worldsfair/2026). **All three are tracks.**
2. **The same agent reported "no Tessl source pushes harness engineering."** Two Tessl speakers do.
3. **"Loopcraft" as swyx's keynote title** — the official schedule gives his Day 2 opener as *"The
   Highest Loop."* Loopcraft is a June essay and a separate workshop. Several recaps conflate them.
4. **AAIF publishes two incompatible stack taxonomies simultaneously** — a five-layer Momentum Report
   and a seven-category Ecosystem Architecture Map.

---

## 4. Failed fetches

**Systematic:** YouTube watch and playlist pages return navigation chrome only — worked around via
oEmbed and RSS. Large PDFs cannot be summarised by the fetch tool — worked around by downloading and
extracting locally, which is how the schedule corpus was obtained.

**403 / blocked:** `preprints.org` (Meng et al. — worked around via the authors' companion repo, so
those definitions are repo-sourced, not paper-sourced) · all `blog.palantir.com` direct fetches
(worked around via a text proxy — flagged as an extra hop) · several Medium articles · `writer.com` ·
`sourcegraph.com/blog/agentic-coding` · Gartner doc 6825634 · Cloud Security Alliance · `x.com`.

**Dead / moved:** `illumex.ai` — NXDOMAIN following acquisition · `cloud.google.com/transform/ai-agent-maturity-model`
— 404 · `dora.dev/research/2026/roi-report/` — 404.

**Budget exhausted:** the session hit 200/200 web searches partway through. Searches not run, and
therefore **absence of evidence rather than evidence of absence**: cloud-vendor agent-platform
reference architectures; engineering posts from Sierra, Factory.ai, Cognition, Modal, Temporal,
Cloudflare, Vercel; post-mortems on failed coding-agent ontology deployments; "bitter lesson applied to
ontologies" arguments.

**Never returned:** the shared-primitives / internal-developer-platform thread. `beads` (Gas City),
QM's `scope` primitive, the current MCP primitive list, and Backstage/Port/Cortex/Humanitec positioning
remain unverified from this pass.

---

## 5. Standing caveat on quotation

Most quotes in this folder passed through a summarising fetch layer rather than a raw read. They are
high-confidence and near-verbatim. **Anything destined for an externally published document should be
re-pulled from the raw source first.** The exception is the schedule corpus, which was extracted
locally and is committed at [`data/`](./data) — quotes traced to it are exact.

---

*Companion: [`00-README.md`](./00-README.md) — what the research changed*
