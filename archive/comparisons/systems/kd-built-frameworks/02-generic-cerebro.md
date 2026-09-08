---
title: "Teardown — generic-cerebro, the system"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# generic-cerebro — the system

**What it is.** A planning-and-tooling repository that functions as a team's centralized context layer: one canonical surface every agent in every sibling repo retrieves from, plus the orchestration framework, decision store, skill library and standards that surround it. It holds no product code by explicit decision, and rejecting product code is one of its named failure modes.

**Category.** Process layer, single-hub with sibling-repo reach. It is the direct predecessor of LoomWarp and the source of several things LoomWarp currently believes are its own.

**Scale.** 1,445 markdown files across a knowledge base (319), project surfaces (403), the agent configuration tree (344), an archive (229) and a legacy spec tree (59). Two git commits — this is a working-copy mirror; the source repository had no history at any depth, which is itself a finding.

---

## Architecture

| Layer | Implementation |
|---|---|
| **Identity** | Root `CLAUDE.md` — what the repo is, what it is not, output discipline, a forbidden-pattern table |
| **Context routing** | 9 rule files under `.claude/rules/`, each with a `paths:` glob, auto-loaded on match |
| **Intent** | `STRATEGIST-*.md` — Tier-0 mandate, principles, phased DoD, failure-mode register, autonomy table |
| **Orchestration** | `.claude/FRACTAL/` — `router.py` (411 L), 27 blueprints, 130 workstream dirs, 121 PRDs, 81 handoffs, 4 evaluation templates, an append-only issue register |
| **Capability** | `.claude/plugins/` — 6 plugins, 39 skills, 4 agents, distributed via a marketplace manifest |
| **Knowledge** | `wiki/` — a librarian tier with a raw → sources → synthesis pipeline, plus 13 compounding review finding-classes |
| **Decisions** | `tools/decision-ledger/` — YAML-declared schema, atomic writes, optimistic locking, append-only audit, 242 entries across two stores |
| **Standards** | `standards/` — 849 lines across 6 guides, with an inheritance contract into project-level references |
| **Retrieval** | A 279-document lexical index, queried by a vendored CLI; the semantic path is disabled team-wide |
| **Runners** | `tools/scheduled-fractal-runner/` — a scheduled review loop with state guarding and evidence artifacts |
| **Enforcement** | **None.** No settings file, no hooks, no validators |

---

## Primitives it names

| Primitive | What it is | Nearest LoomWarp function |
|---|---|---|
| **Tier** | Four agent tiers — intent, decomposition, workstream, atomic task — each with a model assignment | Control |
| **Blueprint → workstream → handoff** | The decomposition, its unit, and its gate | Control / Evidence |
| **PULSE** | Append-only JSON heartbeat, checkable without a model | Evidence |
| **Rule file** | Instructions attached to a `paths:` glob rather than a directory | Context |
| **Librarian tier** | A frontmatter-declared editorial tier over the knowledge base, with its own concurrency model | Learning · **Stewardship** |
| **Decision entry** | A schema-valid, RACI-attributed, hash-verified record with one sanctioned write path | Evidence · **Decision record** |
| **Finding-class** | A hardened, reusable review defect pattern that compounds and can promote into standards | Learning |
| **Standards tier** | Framework-agnostic canon that project guides inherit from and may tighten but not contradict | Capability |
| **Storage tier** | Where a fact lives — canonical-static, compounding-dynamic, project, or personal | Context / Capability |
| **Maturity rubric** | An 18-row, six-stage self-grading instrument with evidence-cited scores | *(no function — see [`07`](./07-transfer-manifest.md))* |

---

## What it forces you to decide

1. **Whether the hub holds product code.** This system answers no, in the identity file, in the failure-mode register, and in a forbidden-pattern table — and instructs the agent to surface the error rather than comply. The decision is cheap to state and expensive to reverse; making it explicit is what keeps a context hub from silently becoming a monorepo.
2. **Which tier a given fact belongs to.** Personal memory, team knowledge, or a change-managed decision. The system has a rule file whose entire job is this routing, and it names the failure it exists to prevent: the agent reaches for personal memory because it is auto-loaded and zero-friction, and team-relevant facts written there become a shadow source of truth invisible to everyone else's agent.
3. **Whether guardrails are prose or enforcement.** This system chose prose, documented the choice as a gap, specced the fix, and did not build it. The choice is visible in every grade it gives itself.

---

## What it does well

**The tier-routing doctrine is the sharpest thing in the repository.** One question — *would another teammate's agent need this to be correct about the project?* — resolves where a fact is written. No means personal memory. Yes means it belongs in team knowledge or the decision log, and the personal copy reduces to a pointer. The rule then names its own smell test: a `type: project` memory *"is almost always a promotion smell."* This is a genuinely rare artifact — a memory policy that assumes the agent will get it wrong and tells you what wrong looks like.

**The compounding review loop closes.** A review finds a defect; the defect class is written up as a reusable finding-class in the knowledge base; the class is consulted by later reviews; a class that hardens promotes into the standards tier. Thirteen classes exist. This is the Learning loop LoomWarp grades at Stage 1 and labels DESIGNED ONLY, running.

**It grades itself honestly and in public.** The maturity rubric's self-grade is 18 rows, each carrying a current stage, a target, and a boundary annotation classifying the gap as internal-capability or externally-imposed. Every score cites the artifact that evidences it. Three rows carry explicit grader-uncertainty flags naming which scores would most move the mean if the team disagrees. The weighted result is 4.3 current against 4.9 target — and the document argues its own averages are the misleading number.

**Failure modes are numbered, and they get retired.** The register runs FM-1 through FM-12; one is marked RETIRED with the reason, one rescoped, three added in the current revision. A risk register that only grows is a wish list.

---

## What it does not claim

Product code · multi-repo dispatch · policy enforcement · context provenance joined to outcomes · runtime neutrality · more than one reliable operator · a working semantic retrieval path.

---

## Credibility check

| | |
|---|---|
| **Documentation vs. code** | Heavily documentation-weighted. The largest executable components are a 411-line router, a Python decision store with 78 tests, and a scheduled runner. Everything else is prose and configuration. |
| **Internal consistency** | **Fails its own audit.** The skill count reads 31 in the Tier-0 doc, ~31 in the product plan, and 39 in the compliance audit; the on-disk count is 39, so two surfaces are simply stale with nothing reconciling them. One plugin exists on disk and is absent from the marketplace manifest. Every manifest version trails its own `plugin.json`. |
| **Traction** | One reliable operator. A second-person onboarding path exists and was exercised; the clean unassisted install has not fully succeeded. The bus factor is a named failure mode with a defined trigger, which is better than most, and it has not moved. |
| **Blocking defect** | The decision that made the retrieval floor distributable is undermined by a gitignore rule. The decision record and the index README both describe a committed, zero-setup lexical index as the sanctioned team default; `.gitignore:69` excludes `bm25-index/*.sqlite` and `git ls-files` returns only the README. The 12 MB index is on disk and not in the repository. Every teammate must rebuild it, which is precisely the setup cost the decision existed to remove. |
| **Policy** | **Absent.** No `.claude/settings.json`, no hooks directory, no `"hooks"` key in any JSON — verified 2026-08-11. Guardrails are prose. The fix is specced and unbuilt. |
| **Provenance** | Strong on decisions — owner, RACI, timestamps, hash verification, a single write path. Absent on context: the system's own rubric names *"no one can answer what context this agent saw, from which source, when, and who approved it"* as its most-cited gap. |
| **Licence** | None. Internal corpus, mirrored to a working copy. |
| **Claim status** | The mechanisms are real and were run at volume. The claims about them are stated more confidently than the enforcement supports. |

---

## The unflattering summary

**It is an extremely well-authored set of instructions that nothing checks.** Every discipline in [`01-the-composition-contract.md`](./01-the-composition-contract.md) is a request. Eighty-one handoffs suggest the requests were honoured — but the requests were honoured by the person who wrote them, which is the weakest possible form of that evidence, and it is the same evidence LoomWarp has.

Three specific things are worse than they look. **The retrieval story inverts under inspection**: the team measured four backends and shipped the weakest one (F1 0.22 against 0.84 for full rerank) because it was the only distributable option — a defensible call — and then failed to actually distribute it. **The count drift is not cosmetic**; it is the exact symptom the corpus used to flag a competitor's marketing-versus-code gap, occurring here, in a repository whose Tier-0 document opens by instructing agents to verify recalled facts before acting. **And the archive is large** — 229 markdown files, 16% of the corpus — which is good hygiene and also the shape of a system that generates planning artifacts faster than it retires them. Its own register names that risk as FM-5.

What survives all of it: the contracts, the routing doctrine, the compounding loop, the ledger's guards, and the standards inheritance model. Those are portable and evidenced. The rest is a demonstration of what one disciplined operator can hold together without a harness holding them to it.

---

## What to steal from ourselves

Ranked, and expanded with sequencing in `loomwarp-team-system` `references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md` (private).

| # | Pattern | For |
|---|---|---|
| 1 | The composition contract — manifest, CI gate, session protocol, self-containment note | Control · the PRD template |
| 2 | Tier-routing doctrine — one question decides where a fact lives | Context · Learning |
| 3 | Compounding finding-class → standards promotion | Learning · the missing half of the standards story |
| 4 | Layered evaluation with only the bottom two blocking, and a false-positive register | Evidence |
| 5 | Librarian tier with a declared concurrency model per tier | Learning · Stewardship |
| 6 | Single sanctioned write path into the decision store | Evidence · governance |
| 7 | The distribution rule — a shipped skill never hard-depends on a hub path | Capability |
| 8 | `paths:`-scoped rules as context routing orthogonal to directory | Context |
| 9 | Append-only framework-defect register with a pre-decomposition triage gate | Control · Evidence |
| 10 | The maturity rubric as the Grid's fine-grained instrument | the diagnostic wedge |

---

*Companion: [`01-the-composition-contract.md`](./01-the-composition-contract.md) · [`07-transfer-manifest.md`](./07-transfer-manifest.md) · `loomwarp-team-system` `references/comparisons/systems/loomwarp.md` (private) — the successor's own unflattering summary*
