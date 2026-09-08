---
title: "Pi — extensibility reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "github.com/earendil-works/pi · packages/coding-agent/docs"
version_at_capture: "v0.85.1"
status: ACTIVE
verification:
  derived_from:
    - "earendil-works/pi @ v0.85.1 (released 2026-09-05; repo HEAD pushed 2026-09-08) — packages/coding-agent/docs, packages/coding-agent/README.md, packages/coding-agent/examples/extensions/, CHANGELOG.md, root README.md"
    - "pi.dev landing page and pi.dev/packages gallery — captured 2026-09-08"
    - "the maintainer's rationale post, mariozechner.at/posts/2025-11-30-pi-coding-agent/ — captured 2026-09-08"
  grounded_against:
    - "the profile at ../pi.md, read against v0.84.4 on 2026-09-02"
    - "opened directly: docs/extensions.md in full, docs/{index,security,settings,packages,skills,prompt-templates,themes,quickstart,sessions,session-format,compaction,json,environment-variables}.md, docs.json, examples/extensions/README.md, examples/extensions/{plan-mode,subagent}/README.md, the v0.85.1 directory listing of examples/extensions/, packages/coding-agent/package.json"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Standard) and scope (the pi coding
    agent, CLI/runtime only) arrived in the dispatch, already agreed, per the harness-deep-read
    skill's step one. The set was deliberately commissioned as a test of that skill's floor: Pi
    publishes a refusal list and carries the corpus's thinnest coverage, and an Index read was
    explicitly permitted. What was found is recorded under "Scope, depth, and the shape found" below.
---

# Pi — extensibility reference set

**This folder is the deep read for the Template v2 profile at [`../pi.md`](../pi.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of Pi's own documentation, examples tree and rationale post, organised by
**the three things Pi's documentation leaves unassembled**: the refusal list against what ships instead
of each refused feature, the extension event contract, and the resource-and-trust model. Cut by Pi's
vocabulary rather than by this atlas's 33 components, which is what makes it the profile's complement
rather than a second copy of it.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot answer
*how does this surface actually work* without becoming something nobody reads in thirty seconds. This
folder is that grain: which of the thirty-six events can block, cancel or rewrite; the plan-mode
example's actual command allowlist; the four resource types against the six places each loads from;
which two refusals have nothing shipped behind them.

**Citation shorthand**, as used throughout — `REPO/` the repository root, `CA/` `packages/coding-agent/`,
`DOCS/` `packages/coding-agent/docs/`, `EX/` `packages/coding-agent/examples/extensions/`.

---

## Scope, depth, and the shape found

**Scope: the `pi` coding agent, CLI and runtime only** — the boundary the profile draws. The monorepo
publishes eleven packages; `pi-chat` is a separate repository. Nothing here is wider than the profile,
so every document has a §6 counterpart to link back to.

**Depth: Standard, and deliberately thin — three surface documents.** This set was commissioned as the
test of how far down the skill's floor goes, with an **Index** read (index and guide only) explicitly
permitted. It is not an Index read, and it is not ten documents. The reason is worth stating, because
it is the finding:

**Pi's documentation is good, and that is what caps this set's length.** Thirty markdown files under
`DOCS/`, a machine-readable `docs.json` nav across six sections, and a consistent shape per page. A
document here that re-tabulated `settings.md`, `themes.md`, `keybindings.md`, `session-format.md`, `sdk.md`,
`rpc.md` or `compaction.md` would be a rewrite of a page a link replaces — which the skill forbids and
which would have produced the ten-document set the thin-coverage score might have predicted. Coverage
measures how much of *our* component list a harness ships. It does not measure how much documentation
the vendor wrote, and Pi is the case that separates the two.

**Three things earn a page, and all three are assembly the vendor did not do:**

1. **The refusals are documented in three places that never meet** — the shipped list in
   `CA/README.md` §Philosophy and on `pi.dev`, the per-refusal reasoning in a post from a year earlier,
   and the examples that supply five of the six, indexed by API rather than by what they restore.
2. **`DOCS/extensions.md` is one file of 3,023 lines** holding the entire extension surface. Its
   lifecycle diagram says *when* an event fires; what a handler may *return* is spread over roughly six
   hundred lines below it, and no summary table exists.
3. **The four resource types each document their own locations on their own page**, in the same shape,
   and the trust gate that decides whether half of those locations load at all is on a sixth page.

**The shape is Pi's, not ours.** Pi's own top-level cut is Start here / Customization / Reference /
Programmatic Usage / Platform Setup / Development. This set follows the *Customization* branch, where
the assembly value is, and takes *Start here* only for `security.md` and `settings.md`, because trust
and scope cannot be described apart from the resources they gate. The **Programmatic Usage** branch —
SDK, RPC, JSON, TUI components — is left to the vendor's four pages and to the profile's §6 row; it is
excluded by depth, not absent.

---

## What Pi says it is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing the
vendor is the sole authority on — recorded as claims, never as findings.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §7 walks them against the mechanisms this set
documents.

| Claim | Source | Captured |
|---|---|---|
| *"There are many agent harnesses but this one is yours"* | `pi.dev`, headline | 2026-09-08 |
| *"Pi is a minimal agent harness. Adapt Pi to your workflows, not the other way around."* | `pi.dev`, tagline | 2026-09-08 |
| *"Primitives, not features"* · *"Change the harness, not your workflow"* | `pi.dev` | 2026-09-08 |
| **Six separate refusals, each a bold heading followed by its own prose** — *"No MCP."* · *"No sub-agents."* · *"No permission popups."* · *"No plan mode."* · *"No built-in to-dos."* · *"No background bash."* **Assembled, not quoted as a run-on:** the source never prints them as one list. | `CA/README.md` §Philosophy, and the same six on `pi.dev` | 2026-09-08 |
| *"Pi is a minimal terminal coding harness. Adapt pi to your workflows, not the other way around, without having to fork and modify pi internals."* | `CA/README.md` | 2026-09-08 |
| *"Pi ships with powerful defaults but skips features like sub agents and plan mode. Instead, you can ask pi to build what you want or install a third party pi package that matches your workflow."* | `CA/README.md` | 2026-09-08 |
| *"Pi is aggressively extensible so it doesn't have to dictate your workflow. Features that other tools bake in can be built with extensions, skills, or installed from third-party pi packages. This keeps the core minimal while letting you shape pi to fit how you work."* | `CA/README.md` §Philosophy | 2026-09-08 |
| *"Pi is a minimal terminal coding harness. It is designed to stay small at the core while being extended through TypeScript extensions, skills, prompt templates, themes, and pi packages."* | `DOCS/index.md` | 2026-09-08 |
| *"pi can create extensions. Ask it to build one for your use case."* | `DOCS/extensions.md`, the banner above the H1; four variants on `skills.md`, `prompt-templates.md`, `themes.md`, `packages.md` | 2026-09-08 |
| *"Pi packages bundle extensions, skills, prompt templates, and themes so you can share them through npm or git."* | `DOCS/packages.md` | 2026-09-08 |
| *"Pi does not include a built-in permission system for restricting filesystem, process, network, or credential access. By default, it runs with the permissions of the user and process that launched it."* | `REPO/README.md` §Permissions & Containerization | 2026-09-08 |
| *"My philosophy in all of this was: if I don't need it, it won't be built. And I don't need a lot of things."* | maintainer's post, 2025-11-30 | 2026-09-08 |
| *"pi does not and will not support built-in to-dos"* · *"pi does not and will not have a built-in plan mode"* · *"pi does not and will not support MCP"* | maintainer's post, 2025-11-30 | 2026-09-08 |

---

## Provenance and freshness

> **Read against `github.com/earendil-works/pi` and `packages/coding-agent/docs` at `v0.85.1`,
> 2026-09-08. A surface that has shipped since is not here.**

`v0.85.1` was released **2026-09-05**; the repository was last pushed **2026-09-08**, so the working
tree is ahead of the tag. Nothing here rests on unreleased commits.

**The profile is one tag behind and six days older.** [`../pi.md`](../pi.md) was read against
**v0.84.4** on **2026-09-02**. Three differences are visible and **both figures are carried, not
reconciled** — a profile is a dated read and this is a later one:

| | Profile, v0.84.4, 2026-09-02 | This set, v0.85.1, 2026-09-08 |
|---|---|---|
| Lifecycle events | *"~40 typed lifecycle events"* across *"seven groups"* | **36 named events in eight groups**, counted from the per-event headings |
| Package gallery | 5,618 packages | **5,536** |
| Stars | 100,782 | **103,107** |

Two changes landed in the tag gap and are recorded because they alter what the profile describes as
shipped surfaces. `0.85.0` added *"Restorable in-memory sessions"* and `SessionManager.inMemory()`.
`0.85.1` states that *"The experimental `client` and `experimental/plugin` subpaths and server/client
commands are now source-only through `pi-test.sh`"*, after they were *"unintentionally"* published in
`0.85.0` — the profile's experimental remote-protocol surface is therefore not an installable path at
this tag. Both are `CA/CHANGELOG.md`, and neither is documented under `DOCS/`.

**Where the documentation lives.** `DOCS/` in the repository is the source of truth and is substantive
— no stubs, no redirects. `pi.dev/docs/latest` mirrors it. `docs.json` is a machine-readable navigation
manifest with two declared redirects (`session.md` → `session-format.md`, `tree.md` → `sessions.md`).
Three things live **only** outside `DOCS/`: the refusal list's reasoning (the 2025-11-30 post), the
per-release record of when an event or setting appeared (`CA/CHANGELOG.md`), and the behaviour of the
`plan-mode` and `subagent` examples (their own READMEs). Two example directories, `sandbox/` and
`gondolin/`, have **no README at all** and are documented only by one-line table entries.

**Refresh protocol.**

```bash
# The current tag, and whether the tree has moved past it.
gh api repos/earendil-works/pi/releases/latest --jq '.tag_name + "  " + .published_at'
gh api repos/earendil-works/pi --jq '.pushed_at'

# The docs nav is machine-readable: a new path here is a new surface.
curl -sL https://raw.githubusercontent.com/earendil-works/pi/<tag>/packages/coding-agent/docs/docs.json

# The event inventory: per-event headings under docs/extensions.md §Events.
curl -sL https://raw.githubusercontent.com/earendil-works/pi/<tag>/packages/coding-agent/docs/extensions.md \
  | awk '/^### Startup Events/,/^## ExtensionContext/' | grep '^#### '

# The examples tree, against the docs table that indexes it.
gh api "repos/earendil-works/pi/contents/packages/coding-agent/examples/extensions?ref=<tag>" --jq '.[].name'
```

When you refresh, update `source_verified` and `version_at_capture` in each file's frontmatter. A
reference doc with a stale date is more dangerous than no reference doc, because it will be trusted.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-the-refusals.md`](./01-the-refusals.md) | The six refusals in both voices, each mapped to the example that supplies it; the two with nothing shipped; the plan-mode allowlist and the subagent caps in full |
| 02 | [`02-extensions.md`](./02-extensions.md) | All thirty-six events with what each handler may return; the ordering rules stated once each; the twenty-six `pi.*` methods and both context objects; the examples tree against the table that indexes it |
| 03 | [`03-resources-scope-and-trust.md`](./03-resources-scope-and-trust.md) | Four resource types × six sources; what project trust gates and what it never gates; the trust resolution order; package filtering, pinning and cross-scope dedup |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, five rules, enforcement ordered — and the claims above walked against what this set documented** |

Read **20** if you have ten minutes. The numbered references are lookup material; read them when you
need an exact event name, flag or path.

---

## How to read these

- **Exact names are preserved verbatim.** Event names, settings keys, flags and paths are quoted as the
  source spells them.
- **Absences name what was checked.** Six appear across this set, collected in
  [`20`](./20-consolidated-guide.md) §6. None says "appears to lack".
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
