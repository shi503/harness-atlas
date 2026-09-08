---
title: "OpenCode — configuration and extensibility reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "https://opencode.ai/docs"
version_at_capture: "v1.18.29"
status: ACTIVE
verification:
  derived_from:
    - "anomalyco/opencode @ v1.18.29 (released 2026-09-04; repo HEAD pushed 2026-09-08) — packages/web/src/content/docs/*.mdx, packages/plugin, packages/sdk, packages/opencode, packages/core, README.md"
    - "opencode.ai/docs — read 2026-09-08"
    - "the published schemas at opencode.ai/config.json — fetched 2026-09-08"
    - "product and repository copy — opencode.ai, github.com/anomalyco/opencode — captured 2026-09-08"
  grounded_against:
    - "the profile at ../opencode.md, read against v1.18.26 on 2026-09-02"
    - "source opened directly: packages/opencode/src/config/config.ts, packages/plugin/src/index.ts, packages/sdk/js/src/gen/types.gen.ts, packages/core/src/plugin/skill.ts, packages/schema/src/v1/permission.ts, packages/web/astro.config.mjs"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Standard) and scope (the opencode
    client-server coding agent's configurable surface) arrived in the dispatch, agreed with KD before
    reading, per the harness-deep-read skill's step one.
---

# OpenCode — configuration and extensibility reference set

**This folder is the deep read for the Template v2 profile at [`../opencode.md`](../opencode.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of OpenCode's own documentation, published schema and source, organised by
**the surfaces OpenCode names** — config, rules, permissions, policies, agents, tools, skills,
commands, plugins. Cut by the vendor's vocabulary rather than by this atlas's 33 components, which is
what makes it the profile's complement rather than a second copy of it.

**Why it exists.** Two of OpenCode's mechanisms are stated correctly on four or five pages each and
assembled on none: the **configuration chain**, whose numbered list of eight has three more loading
points documented or implemented elsewhere, and the **permission ladder**, whose key inventory is
published three times in three different lengths. Assembling those, with the exact keys and the
exact defaults, is what this folder is for.

**A caution on the words.** OpenCode uses common nouns — *agent*, *command*, *skill*, *plugin*,
*tool*, *permission*, *rules*, *policy* — for its own specific things, and the definitions here are
OpenCode's, quoted from OpenCode's pages. Where a word carries an unusual referent, that is called
out: a **permission** is a rule about one tool call's input, not a filesystem boundary; a **policy**
governs whether a resource may be used at all and resolves global-over-project, the reverse of every
other key; **rules** are the `AGENTS.md` chain, which selects a file rather than merging several.

---

## Scope and depth

**Depth: Standard.** Seven surface documents, plus this index and the guide. Surfaces the vendor
documents adequately in one page are linked rather than restated.

**Scope: the `opencode` client-server coding agent's configurable surface** — the boundary the profile
draws. Every document describes what an operator or an administrator configures, and what the runtime
does with it.

**Deliberately not covered**, and named so nothing here reads as an absence about them: the TUI,
desktop, web, server, SDK, ACP, IDE extension, GitHub Action, GitLab integration and Slack bot; the
provider catalogue and the Zen and Go gateways; formatters, LSP server configuration, themes and
keybinds; the share service. Each has its own well-organised vendor page, and a link to it is a
better document than a copy of it.

**The shape found.** OpenCode publishes one outline, not several: `opencode.ai/docs` is generated from
`packages/web/src/content/docs/*.mdx` in the repository, and the sidebar in
`packages/web/astro.config.mjs` groups the pages as **Usage**, **Configure** and **Develop**, with
config, providers, network, enterprise, troubleshooting and Windows above them. This set follows the
**Configure** group, which is the scope above, and reaches into the source for three things the
generated pages do not carry: the resolution order in `config.ts`, the `Hooks` interface, and the
SDK's `Event` union.

---

## What the vendor says OpenCode is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing the
vendor is the sole authority on — recorded as claims, never as findings.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §7 walks them against the mechanisms this set
documents.

| Claim | Source | Captured |
|---|---|---|
| *"The open source coding agent."* | `github.com/anomalyco/opencode`, repository description | 2026-09-08 |
| *"The open source AI coding agent."* | `README.md` @ `v1.18.29` | 2026-09-08 |
| *"The AI coding agent built for the terminal."* | `packages/web/src/content/i18n/en.json`, `app.lander.hero.title` — the landing-page hero at `opencode.ai` | 2026-09-08 |
| *"**OpenCode** is an open source AI coding agent. It's available as a terminal-based interface, desktop app, or IDE extension."* | `opencode.ai/docs/` | 2026-09-08 |
| *"LSP enabled"* · *"Automatically loads the right LSPs for the LLM."* | landing-page feature strings, `i18n/en.json` | 2026-09-08 |
| *"Multi-session"* · *"Start multiple agents in parallel on the same project."* | landing-page feature strings, `i18n/en.json` | 2026-09-08 |
| *"Shareable links"* · *"Share a link to any sessions for reference or to debug."* | landing-page feature strings, `i18n/en.json` | 2026-09-08 |
| *"Use any model"* · *"Supports 75+ LLM providers through"* models.dev *"including local models."* | landing-page feature strings, `i18n/en.json` | 2026-09-08 |
| *"OpenCode uses the `permission` config to decide whether a given action should run automatically, prompt you, or be blocked."* | `opencode.ai/docs/permissions` | 2026-09-08 |
| *"Policies control whether OpenCode may perform an action on a named resource."* | `opencode.ai/docs/policies` | 2026-09-08 |
| *"Agents are specialized AI assistants that can be configured for specific tasks and workflows. They allow you to create focused tools with custom prompts, models, and tool access."* | `opencode.ai/docs/agents` | 2026-09-08 |
| *"Plugins allow you to extend OpenCode by hooking into various events and customizing behavior."* | `opencode.ai/docs/plugins` | 2026-09-08 |
| *"Agent skills let OpenCode discover reusable instructions from your repo or home directory."* | `opencode.ai/docs/skills` | 2026-09-08 |
| *"OpenCode Enterprise is for organizations that want to ensure that their code and data never leaves their infrastructure. It can do this by using a centralized config that integrates with your SSO and internal AI gateway."* | `opencode.ai/docs/enterprise` | 2026-09-08 |
| *"OpenCode does not store your code or context data. All processing happens locally or through direct API calls to your AI provider."* | `opencode.ai/docs/enterprise` | 2026-09-08 |

---

## Provenance and freshness

> **Read against `opencode.ai/docs` and `anomalyco/opencode` at `v1.18.29`, 2026-09-08. A surface
> that has shipped since is not here.**

`v1.18.29` was released 2026-09-04; the repository was last pushed 2026-09-08, so the working tree is
ahead of the tag. Every source citation in this set is pinned to the tag; nothing rests on unreleased
commits. Repository facts at capture: MIT, default branch `dev`, **205,900** stars and 26,881 forks
per the GitHub API on 2026-09-08.

**The profile is one read behind and three releases older.** [`../opencode.md`](../opencode.md) was
read against `v1.18.26` on 2026-09-02. Where the two differ, this set is newer — the visible example
is plugin hooks, which the profile records as **20** typed keys and which
`packages/plugin/src/index.ts` now defines as **21**. Neither is wrong; they are six days apart.

**Where the documentation lives.** The hosted docs are the primary source and are generated from the
repository, so every page has a raw `.mdx` at a pinned tag under
`packages/web/src/content/docs/`. Twenty-two translated subdirectories sit beside the English files;
this set read only the English source. Two published JSON Schemas are separately authoritative —
`opencode.ai/config.json` for the server/runtime config and `opencode.ai/tui.json` for the TUI — and
each carries keys no page documents. `/docs/modes/` returns **404** while `modes/` directories are
still loaded.

**Pages read for this set:** `/docs/`, `/config/`, `/rules/`, `/permissions/`, `/policies/`,
`/agents/`, `/tools/`, `/custom-tools/`, `/mcp-servers/`, `/skills/`, `/commands/`, `/plugins/`,
`/references/`, `/enterprise/`, `/network/`, `/cli/`.

**Refresh protocol.**

```bash
# The current tag, and whether the tree has moved past it.
gh api repos/anomalyco/opencode/releases/latest --jq '.tag_name + "  " + .published_at'

# The docs outline is the sidebar; a new entry is a new surface.
gh api "repos/anomalyco/opencode/contents/packages/web/src/content/docs?ref=<tag>" --jq '.[].name'

# The two inventories that drift fastest.
gh api "repos/anomalyco/opencode/contents/packages/plugin/src/index.ts?ref=<tag>" --jq '.content' | base64 -d
curl -s https://opencode.ai/config.json
```

When you refresh, update `source_verified` and `version_at_capture` in each file's frontmatter. A
reference doc with a stale date is more dangerous than no reference doc, because it will be trusted.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-config-and-rules.md`](./01-config-and-rules.md) | The eight numbered config rungs and the three loading points outside them; merge semantics; managed settings and MDM; `{env:}`/`{file:}`; the `AGENTS.md` chain |
| 02 | [`02-permissions.md`](./02-permissions.md) | The `allow`/`ask`/`deny` ladder: three key inventories reconciled, pattern grammar, shipped defaults, `--auto`, per-agent merge, the `@`-mention carve-out |
| 03 | [`03-policies.md`](./03-policies.md) | `experimental.policies`, the one action, and the global-over-project inversion; what it replaces |
| 04 | [`04-agents.md`](./04-agents.md) | Primary agents and subagents, the eight built-ins, every option key, `subagent_depth` and the legacy `mode` object |
| 05 | [`05-the-tool-registry.md`](./05-the-tool-registry.md) | Four tool sources in one namespace: built-ins, `.opencode/tools/`, MCP, plugin tools — naming, collisions, gating, truncation |
| 06 | [`06-skills-and-commands.md`](./06-skills-and-commands.md) | Six skill discovery roots, the name regex, `<available_skills>`, skill permissions; command templates and their three substitutions |
| 07 | [`07-plugins-hooks-and-events.md`](./07-plugins-hooks-and-events.md) | All 21 hook keys, load order, the plugin context, and the 32-type event union against the docs' 28 names |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, five rules, enforcement ordered — and the claims above walked against what this set documented** |

Read **20** if you have ten minutes. The numbered references are lookup material; read them when you
need an exact key name.

---

## How to read these

- **Exact names are preserved verbatim.** Config keys, permission keys, hook keys, event `type`
  strings and environment variables are quoted as the source spells them.
- **Where two vendor sources disagree, both are carried.** Four such disagreements appear across this
  set, collected in [`20`](./20-consolidated-guide.md) §6. None is adjudicated here.
- **Absences name what was checked.** None says "appears to lack".
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
