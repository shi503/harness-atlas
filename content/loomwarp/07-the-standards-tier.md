---
status: DRAFT
title: "The standards tier"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `standards/README.md` and the seven guides beside it"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# The standards tier

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

`standards/` is 970 lines across eight files — a 43-line index and seven guides — and is the largest
authored body in the control plane. Its index states what it is and where it sits:

> Framework-agnostic engineering standards. This is the **team tier**: the canonical source that
> project-level and repo-level guides inherit from, and the substance behind LoomWarp's claim to
> provide *"clarity on how we work and what good looks like."*

None of it is loaded by code. Guides reach an agent one way: a path in a workstream's
`context_bundle`, chosen per workstream.

---

## 1. The seven guides

| Guide | Lines | Shape |
|---|--:|---|
| `engineering-principles.md` | 171 | 12 numbered principles, each written as a regression guard |
| `architecture-patterns.md` | 110 | 10 design-time patterns, ending at *"Deterministic control, probabilistic labor"* |
| `definition-of-done.md` | 120 | 7 sections — what done means, workflow states, two terminal states, *"When the implementer is a model"* |
| `testing-patterns.md` | 113 | 8 sections — the ladder, conformance tests, *"Agent-authored tests — the specific failure mode"* |
| `evaluation-doctrine.md` | 149 | 11 sections in two parts — see §3 |
| `ci-cd.md` | 135 | 9 sections — gate contract, supply chain, delivery, *"When the author is an agent"* |
| `process-improvement-model.md` | 129 | 8 sections — where a learning goes, the compounding review loop, intake, retrospection |

Each guide reserves a section for the case where the implementer is not a person —
`definition-of-done.md` §6, `testing-patterns.md` §8, `ci-cd.md` §8 — which is the seam that makes
this a harness's standards tier rather than a generic engineering handbook.

## 2. The inheritance contract — three rules

`standards/README.md` states a one-directional hierarchy: `standards/` → project tier → repo tier,
governed by three rules.

1. **Reference, never copy.** *"A lower-tier guide opens with an inheritance header pointing here,
   then adds only what is *specific*. If a rule is universal, it belongs here — not duplicated
   downstream."*
2. **Tighten, never contradict.** *"A project may add stricter checks or bind concrete tooling. It
   may not weaken a criterion below what this tier requires. If a team standard is wrong, fix it
   here."*
3. **The distribution rule — the one learned expensively.** *"A distributed skill must **never**
   hard-depend on a path in this repo… A distributable skill carries its operational checklist
   **inline** and **cites the canonical guide by name**. Keeping the two in sync is a deliberate
   maintenance step, not a live filesystem dependency."*

Rules 1 and 3 pull in opposite directions on purpose: a lower tier references upward, but a skill
that leaves the repository must carry its checklist inline, because the upward reference will not
resolve on a machine that has no `standards/`.

Two further rules head the index:

> **Reading is not verification — run it.** A claim that a build passes or tests pass, without pasted
> command output, is not evidence. This applies with more force to agent-authored work, not less: the
> context that produced a change already believes it is correct.

> **Prefer mechanical enforcement to prose.**… Every guide here marks which of its rules are
> mechanically enforceable and how. Where a rule is only prose, that is a known gap, not a finished
> state.

## 3. `evaluation-doctrine.md` — the split it protects

The guide's opening insists on a division:

> **Agent-work evaluation** gates *how we build*… This is function **F7 Evidence**, it is LoomWarp's
> own machinery, and §1–§4 cover it.
>
> **Product-AI evaluation** gates *what we ship* — is the LLM feature we built for users actually
> good? LoomWarp does **not** do this. It gives teams the doctrine and the pipeline shape to do it
> themselves. §5–§8 cover it.

Part I is the part the control plane is measured against elsewhere in this set: the three "never"
rules of §1, the five evaluation layers `L1`–`L5` of §2 with their four rules, the evidence-bundle
minimum fields of §3, and the `R0`–`R4` risk tiers of §4. Part II is doctrine about error analysis,
the eval pyramid, judge validation and datasets — five sections that describe a practice this
repository ships as advice rather than runs.

Its own closing line about wiring reads on the whole tier:

> **The honest failure mode to avoid.** It is common to build an excellent eval harness… and then
> never wire it into a pipeline, leaving it a manual command nobody runs. Fixtures and floors that
> nothing enforces are documentation. **An eval not in CI is not a gate.**

There is no `.github/` directory at this commit — no workflow runs the repository's five
`scripts/check-*.mjs` scripts or `scripts/verify-vendored.mjs` automatically.

## 4. Two references that do not resolve inside this scope

`standards/README.md` calls its contents *"function **F5 Capability** content"* and
`evaluation-doctrine.md` calls Part I *"function **F7 Evidence**."* Nothing in the agreed scope
defines the `F`-numbered function register — checked `standards/`, `README.md`, `docs/`, `fractal/`,
`control/`, `policy/`, `context/`, `registry/` and `vendor/`. The pointer given in
`fractal/STRATEGIST-loomwarp.md` §7 is `projects/loomwarp/references/elements.md`, in the
design-specification tree outside this set's scope, described there as *"7 functions, the Grid, the
self-grade."*

`standards/README.md`'s status line dates the tier — *"Authored 2026-08-04 as LoomWarp's initial
standards tier, closing GAP-14"* — and names its benchmark, `qm` (`yc-software/qm`). The `GAP-`
register is likewise outside this scope; `STRATEGIST-loomwarp.md` §7 places it at
`projects/loomwarp/specs/v1/01-gap-analysis.md` and describes it as *"23 GAP-IDs, 9 at P0."*
