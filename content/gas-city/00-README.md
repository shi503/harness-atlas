---
title: "Gas City — orchestration reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "https://docs.gascity.com"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
status: ACTIVE
verification:
  derived_from:
    - "gastownhall/gascity @ 042e965f0be01710bb6d45393052df80196c6dca (main/edge, pushed 2026-09-08) — docs/, engdocs/, README.md, CHANGELOG.md, SECURITY.md"
    - "https://docs.gascity.com, reached via a 301 from docs.gascityhall.com — read 2026-09-08"
    - "product and repository copy — gascity.com, github.com/gastownhall/gascity — captured 2026-09-08"
  grounded_against:
    - "the profile at ../gas-city.md, read against 4071143 on 2026-09-03"
    - "the deletion commit dd90ac0a, resolved directly via the GitHub commits API"
    - "docs/reference/cli.md and docs/reference/config.md, the generated references, opened directly"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Standard) and scope (the gascity Go
    orchestration SDK, matching the profile's boundary) arrived in the dispatch, already agreed with
    KD, per the harness-deep-read skill's step one.
---

# Gas City — orchestration reference set

**This folder is the deep read for the Template v2 profile at [`../gas-city.md`](../gas-city.md).**
Start there; open these documents when a §6 detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of Gas City's two in-repo documentation trees and its generated
references, organised by **Gas City's own six primitives** — Agent, Bead, Formula, Rig, Pack,
Event — plus the three surfaces that sit beneath or beside them: runtimes and exec providers, the
skills/mail/MCP materializations, and trust boundaries. Cut by the vendor's vocabulary rather than
by this atlas's 33 components, which is what makes it the profile's complement rather than a second
copy of it.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot
answer *how does this surface actually work* without becoming something nobody reads in thirty
seconds. This folder is that grain: the fifty-one event types with their emitters, the seventeen
runtime-protocol operations, the pack loading order, the five agent axes and the word `provider`
meaning three different things, the identity encoding that has its own specification, and the
admission test with its published verdicts.

---

## Scope, depth, and the shape found

**Depth: Standard.** Ten surface documents, plus this index and the guide. Surfaces the vendor
documents adequately on one page are linked rather than restated.

**Scope: the `gascity` Go orchestration SDK** — the boundary the profile draws. Two things the
vendor's own landing page markets alongside it are therefore **outside this set**: `beads`, a
separate repository and CLI (`gastownhall/beads`) whose surface was not read, and **Beads Team
Server** / **Gasworks**, separate products. Where a captured claim reaches past the boundary,
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §8 says so and marks it as scope, never as
an absence. **No document here has a counterpart-free scope**; every one of `01`–`10` maps to at
least one §6 detail row in the profile.

**The shape found, and why it is the vendor's and not ours.** Gas City publishes a six-primitive
model in one page and says it is canonical — *"The authoritative user-facing model is the six
primitives … Read that first"* — so this set is cut by those six, in the order that page introduces
them, rather than by the documentation's Diátaxis navigation (Getting Started · Tutorials · Guides ·
Troubleshooting · Reference), which organises by *reader intent* and would have produced five
documents about nothing in particular. Three additional documents cover what the six do not:
runtimes and exec providers (`08`), the materializations that reach down into other coding agents
(`09`), and trust boundaries (`10`).

### Two documentation trees, and the rule that separates them

Gas City ships **two** doc trees in one repository, and the split is itself documented — at
`engdocs/contributors/docs-organization.md`, which is a contributor guide to the published tree:

> *"`docs/` is the source tree for the published Mintlify site (docs.gascityhall.com). `engdocs/` is
> GitHub-only contributor material — architecture, design, and contributor guides — and is **never
> published**. Normative **user-facing** specifications (pack and formula specs) live under
> `docs/reference/specs/` and ship to readers; **internal** architecture invariants and subsystem
> docs live under `engdocs/architecture/`. There is no repo-root `specs/` tree."*

The consequence for a reader: **the mechanism is frequently in `engdocs/` and only the mechanism's
name is in `docs/`.** The event-type catalogue, the code-layering map, the admission test, the order
dispatcher's timeouts, and the deletion of the former Agent Protocol are all `engdocs/`-only. This
set reads both, and every citation names which tree it came from.

Three of the largest `docs/` pages are **generated from Go source and must never be hand-edited** —
`reference/cli.md`, `reference/config.md`, and everything under `reference/schema/` except its
`index.md`. `.githooks/pre-commit` regenerates and stages them on any staged Go change, backed by
`TestSchemaFreshness`, `TestCLIDocsFreshness` and `TestOpenAPISpecInSync`. Where a generated page
and a hand-written one disagree, that provenance is the relevant fact —
[`20`](./20-consolidated-guide.md) §6 records two such disagreements.

---

## What Gas City says it is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing
the vendor is the sole authority on — recorded as claims, never as findings.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §8 walks them against the mechanisms this
set documents.

| Claim | Source | Captured |
|---|---|---|
| *"Orchestration-builder SDK for multi-agent coding workflows"* | `github.com/gastownhall/gascity`, repository description | 2026-09-08 |
| *"Composable orchestration infrastructure for multi-agent coding workflows."* | `README.md`, the banner line | 2026-09-08 |
| *"Gas City is an orchestration-builder SDK for multi-agent systems. It extracts the reusable infrastructure from Gas Town into a configurable toolkit with runtime providers, work routing, formulas, orders, health patrol, and a declarative city configuration."* | `README.md` | 2026-09-08 |
| *"Gas City is the platform for building software factories — write down how a job gets done once, and an orchestrator runs it across a fleet of agents, reliably, without you in the loop."* | `docs/index.mdx`, frontmatter description | 2026-09-08 |
| *"An interactive session gives you a faster pair of hands; a software factory is what gets you production quality at machine speed."* | `docs/index.mdx` | 2026-09-08 |
| *"you describe a feature once and come back to a finished branch"* | `docs/index.mdx` | 2026-09-08 |
| *"because no role is hardwired into the binary, the same engine runs your local configuration, the one you share with your team, or the ones shared by the community"* | `docs/index.mdx` | 2026-09-08 |
| *"Gas City **orchestrates fleets of coding agents** through real engineering work … **This orchestration is the point.**"* | `docs/getting-started/how-gas-city-works.md` | 2026-09-08 |
| *"the orchestrator hardcodes **zero roles** — no built-in 'manager' or 'reviewer.' Every role is configuration supplied through a **Pack** … so the same engine becomes Gas Town, Ralph, or whatever you configure."* | `docs/getting-started/how-gas-city-works.md` | 2026-09-08 |
| *"Sixteen built-in harnesses … Agents run under the logins or API keys you already have, and each agent picks its own harness, so a mixed fleet is just configuration."* | `docs/getting-started/faq.md` | 2026-09-08 |
| *"Everything user-facing is configuration … A 'reviewer' or 'planner' is a prompt you wrote, not a plugin you compiled."* | `docs/getting-started/faq.md` | 2026-09-08 |
| *"Gas City is MIT-licensed and free … The only spend is the model usage of the agents you run, billed through the harness credentials you already use."* | `docs/getting-started/faq.md` | 2026-09-08 |
| *"Every reusable capability in Gas City comes from a pack."* | `docs/guides/understanding-packs.md` | 2026-09-08 |
| *"**Gas City**"* [heading] *"The open software factory platform that runs on Beads. Orchestrate agents through repeatable workflows and automations with factory configuration you own—configured, not coded."* | `gascity.com`, product section | 2026-09-08 |
| *"The Beads-native agent orchestration stack. Agent work that lasts. A factory your team can improve."* | `gascity.com`, hero | 2026-09-08 |

**Two further landing-page claims are recorded but out of scope** — *"Beads Team Server makes the
work shared, governed, and visible"* and *"Gasworks — The multi-operator factory platform"*, the
latter marked *"Coming soon"* by the vendor at capture. Both are separate products of Gas City,
Inc.; the agreed scope here is the `gascity` SDK. [`20`](./20-consolidated-guide.md) §8 marks them
as scope rather than as absences.

**No launch or announcement post was opened at this read.** Checked: the repository README (which
links Discord, X and the docs site, but no announcement), `docs/index.mdx`, and `gascity.com`'s own
navigation, which offers a blog (*"The City Wire"*) whose posts were not opened. The profile above
this folder cites two third-party posts as secondary sources; none is relied on here.

---

## Provenance and freshness

> **Read against `gastownhall/gascity` at `042e965` (main/edge) and `docs.gascity.com`,
> 2026-09-08. A surface that has shipped since is not here.**

`v1.4.1` remains the latest release, published **2026-08-15**. `main` and the `edge` tag both point
at `042e965f0be01710bb6d45393052df80196c6dca`, committed **2026-09-08**, so the working tree is
well ahead of the released tag and this set reads the tree. Where a fact rests on unreleased work,
it says so — the `storage.binding.*` event family is described only in `CHANGELOG.md` under
`[Unreleased]` ([`07`](./07-event.md) §1a).

**The profile is one read behind, at a different commit.**
[`../gas-city.md`](../gas-city.md) was read against `4071143` on 2026-09-03, five days and 32-plus
commits earlier. Where the two differ, this set is newer, and neither is wrong. The visible
differences:

| | Profile, 2026-09-03 @ `4071143` | This set, 2026-09-08 @ `042e965` |
|---|---|---|
| Harnesses | *"15 named provider CLIs"* | **16**, per `harness-recipes.md` and the FAQ |
| Cost accounting | *"Nothing shipped"*; `usage-facts-v0.md` a proposal | **`gc costs` ships**, reading `.gc/usage.jsonl`; `[usage] provider` and `ModelPricing` are generated config. The hand-written command map still says *"no matching top-level cost accounting command today"* |
| Runtime backends | *"tmux/subprocess/exec/ACP/k8s/herdr"* as one list | ACP is now an agent **transport**, a different axis from the city-wide **runtime**; runtimes are `tmux`, `subprocess`, `k8s`, `ssh:user@host`, `exec:<script>`, `herdr` |
| Agent config framing | *"a `provider` field per agent"* | **five axes** — harness · model · upstream · transport · runtime — with the word `provider` flagged as overloaded by the vendor itself |
| MCP | *"catalog-only — list-only… you wire the servers yourself"* | Two current pages disagree; the generated CLI reference says `gc mcp list` shows what would be **projected into provider-native config** |
| Docs host | `docs.gascityhall.com` | **301-redirects to `docs.gascity.com`** |
| Stars / forks | 1,219 / 390 | 1,232 / 397 |

Two of the profile's §10 unverified items **resolve at this read**, and the resolutions are recorded
in the documents rather than in the profile:

- **The Agent Protocol deletion commit.** `dd90ac0a` resolves to
  `dd90ac0a1a42303b1424c8a8f5a48a31f6aa4aae`, 2026-03-08, 44 files, *"net -2794 LOC"* by its own
  message. — [`01`](./01-the-six-primitives-and-the-admission-test.md) §3
- **`identity-separator-contract-v1.md`.** Opened. It specifies the `/`→`--` and `.`→`__` encoding
  for qualified agent identities and bears on the **Agent** primitive, not on the org/tenancy model.
  — [`02`](./02-agent.md) §5

One does **not** resolve: the two-page disagreement about the primitive test's first condition was
still present at `042e965`, in both directions.
— [`01`](./01-the-six-primitives-and-the-admission-test.md) §2a

**Refresh protocol.**

```bash
# Where the tree actually is, versus the latest release.
gh api repos/gastownhall/gascity/commits/main --jq '.sha[0:7] + "  " + .commit.committer.date'
gh api repos/gastownhall/gascity/releases/latest --jq '.tag_name + "  " + .published_at'

# The published navigation is the outline; a new nav entry is a new surface.
gh api repos/gastownhall/gascity/contents/docs/docs.json --jq '.content' | base64 -d | jq '.navigation'

# The event catalogue and the code-layering map are engdocs-only.
gh api repos/gastownhall/gascity/contents/engdocs/architecture/event-bus.md --jq '.content' | base64 -d

# The generated references move whenever the Go source does.
gh api repos/gastownhall/gascity/contents/docs/reference --jq '.[] | .name + "  " + (.size|tostring)'
```

When you refresh, update `source_verified` and `version_at_capture` in each file's frontmatter. A
reference doc with a stale date is more dangerous than no reference doc, because it will be trusted.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-the-six-primitives-and-the-admission-test.md`](./01-the-six-primitives-and-the-admission-test.md) | The set in the vendor's own table; the three-condition admission test with its published verdicts; the verified deletion of the former Agent Protocol; where each primitive is documented, and the two that have no spec |
| 02 | [`02-agent.md`](./02-agent.md) | The five axes and the overloaded word `provider`; sixteen harnesses and what each reads; abstract-versus-raw upstreams and the hard error; pools, `scale_check`, `wake_mode`; the routing pair; `gc hook`'s claim protocol; the identity separator contract |
| 03 | [`03-bead.md`](./03-bead.md) | Everything is a bead, by type; one Dolt server with `issue_prefix` as a hard query filter; the four `endpoint_origin` values; store backends and their dependency floor |
| 04 | [`04-formula.md`](./04-formula.md) | v1 and v2 as peer contracts and the graph-only gate; cook / sling / order and the outcomes each produces; the compiled workflow shape and who executes control beads; orders — five triggers, two action kinds, `ScopedName`, the tracking bead |
| 05 | [`05-rig.md`](./05-rig.md) | What `gc rig add` does and its branch-detection ladder; prefix isolation; why the rig **name** is an identity prefix and the **path** is not; the eighteen rig fields; the three runbooks |
| 06 | [`06-pack.md`](./06-pack.md) | The progressive capability model; the loading order verbatim; binding-qualified names and what can still collide; handle versus durable source; `credentials.toml` secret-by-pointer and its enforced file modes; built-in packs as explicit pinned imports |
| 07 | [`07-event.md`](./07-event.md) | All fifty-one event types by prefix, including the two with no emitter; the mode × scope envelope matrix; the bus, its providers, and its best-effort write contract; the typed-wire invariant behind it |
| 08 | [`08-runtimes-and-exec-providers.md`](./08-runtimes-and-exec-providers.md) | The one exit-code contract shared by four subsystems and why exit `2` means success; the seventeen RPP operations including `provision`; pack-declared runtimes; herdr, and the per-agent pin it silently ignores |
| 09 | [`09-skills-mail-and-mcp.md`](./09-skills-mail-and-mcp.md) | Skill scopes and the four provider sinks; why hooks cover fourteen providers and skills four; the tombstoned attachment fields; the MCP disagreement; mail versus nudge; the three history layers |
| 10 | [`10-trust-boundaries.md`](./10-trust-boundaries.md) | The five input classes and twelve execution surfaces; the four things that actually bind; the four scoped refusal lists, and the general one that does not exist |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, the code-layering map, five rules, enforcement ordered, three in-repo disagreements — and the claims above walked against what this set documented** |

Read **20** if you have ten minutes. The numbered references are lookup material; read them when you
need an exact field name.

---

## How to read these

- **Exact names are preserved verbatim.** Config keys, event type constants, CLI flags, TOML paths
  and error strings are quoted as the source spells them. Where one word carries two meanings —
  `provider` selects a harness, a runtime backend, *or* a storage backend depending on the block —
  that is called out.
- **Absences name what was checked.** Five appear across this set, collected in
  [`20`](./20-consolidated-guide.md) §7. None says "appears to lack".
- **Disagreements are carried, not resolved.** Three pairs of current in-repo pages state different
  things; each is recorded with both quotations and, where it is decidable, with which page is
  generated from source. — [`20`](./20-consolidated-guide.md) §6
- **Nothing here scores.** No coverage marks, no primitive count as a grade, no comparison to
  another harness. The profile and the grids do that.
