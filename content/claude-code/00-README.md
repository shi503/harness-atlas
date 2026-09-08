---
title: "Claude Code — extensibility reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-08-10"
source_verified: "2026-08-10"
docs_root: "https://code.claude.com/docs/en/"
status: ACTIVE
---

# Claude Code — extensibility reference set

**This folder is the deep read for the Template v2 profile at [`../claude-code.md`](../claude-code.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` links out here.

**What this is.** A reading of Anthropic's official Claude Code documentation, organised by the
**extension layer** — the surfaces you use to change what Claude Code knows, what it can reach, what
it is allowed to do, and how work gets orchestrated across agents. Cut by Claude Code's own surface
vocabulary rather than by this atlas's 33 components, which is what makes it the profile's
complement rather than a second copy of it.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot
answer *how does this surface actually work* without becoming something nobody reads in thirty
seconds. This folder is that grain: the tables too long for a detail row, the surfaces the vendor
documents across four scattered pages, and the caveats stated once in a changelog.

> **Re-headed 2026-09-08.** This file previously opened as a *"LoomWarp-oriented reading"* framed
> around what one consumer should build, adopt or delete — pre-spin-out framing that violates the
> standing rule *a profile describes its harness and nothing else*. The consumer-specific analysis it
> pointed at, `30-gap-analysis-loomwarp.md`, correctly left with that consumer at the spin-out and is
> not reachable from here. The generalised form of this folder is now
> [`skills/harness-deep-read/SKILL.md`](../../skills/harness-deep-read/SKILL.md), which reserves the
> `30-` slot and forbids filling it.

---

## Provenance and freshness

Everything here was read from the official docs on **2026-08-10** via
`https://code.claude.com/docs/llms.txt` and the per-page `.md` sources. No third-party blogs,
tutorials, or LLM recall were used as a source of fact; the one blog link that appears is one the
official docs themselves cite.

Claude Code ships weekly. The docs carry per-version behavior notes (`Requires v2.1.x or later`,
`Before v2.1.y, …`) and these documents preserve those notes wherever behavior changed recently,
because a claim that is true on `v2.1.224` and false on `v2.1.180` is a claim that needs its version
attached. The most recent version referenced anywhere in the source docs at capture time was
**v2.1.224** (Week 32, August 3–7 2026).

**Refresh protocol.** These are a snapshot, not a live mirror. Re-verify before acting on anything
load-bearing:

```bash
# The canonical index of every docs page. Diff it to find new pages.
curl -s https://code.claude.com/docs/llms.txt

# Any page's raw markdown source — append .md to the doc URL.
curl -s https://code.claude.com/docs/en/hooks.md

# The weekly digest — the fastest read for "what changed since I last looked".
curl -s https://code.claude.com/docs/en/whats-new/index.md
```

When you refresh, update `source_verified` in each file's frontmatter. A reference doc with a stale
date is more dangerous than no reference doc, because it will be trusted.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-extension-surfaces.md`](./01-extension-surfaces.md) | The nine extension surfaces, what loads when, context cost, layering and precedence, and how to pick between them |
| 02 | [`02-skills.md`](./02-skills.md) | `SKILL.md` — full frontmatter reference, discovery and precedence, progressive disclosure, `context: fork`, dynamic context injection, evaluation |
| 03 | [`03-hooks.md`](./03-hooks.md) | All 29 lifecycle events, five handler types, the decision/exit-code protocol, matchers, enterprise controls |
| 04 | [`04-subagents.md`](./04-subagents.md) | Subagent frontmatter reference, scope and precedence, tool filters, permission modes, persistent memory, forks, nesting and concurrency limits |
| 05 | [`05-multi-agent-orchestration.md`](./05-multi-agent-orchestration.md) | Choosing between subagents, agent view, agent teams, dynamic workflows, and worktrees — plus the workflow scripting model |
| 06 | [`06-plugins-and-distribution.md`](./06-plugins-and-distribution.md) | Plugin anatomy, `plugin.json` and `marketplace.json` schemas, source types and pinning, versioning, dependencies, private distribution |
| 07 | [`07-context-and-memory.md`](./07-context-and-memory.md) | CLAUDE.md load order, `@` imports, `.claude/rules/` and path scoping, auto memory, monorepo and multi-package layering |
| 08 | [`08-policy-and-governance.md`](./08-policy-and-governance.md) | Permission rule syntax, permission modes, managed and server-managed settings, managed-only keys, sandboxing, workspace trust |
| 09 | [`09-telemetry-and-evidence.md`](./09-telemetry-and-evidence.md) | OpenTelemetry metrics, events, and distributed traces — the native evidence substrate, with full attribute lists |
| 10 | [`10-programmatic-and-sdk.md`](./10-programmatic-and-sdk.md) | `claude -p`, `--bare`, structured output, stream-json, CI gating, and the Agent SDK |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: current best practice for building on Claude Code, as one opinionated read** |
| **30** | `loomwarp-team-system` `references/claude-code/30-gap-analysis-loomwarp.md` (private) | **Overlap and coverage against LoomWarp's seven elements — build, adopt, or delete** |

Read **20** if you have ten minutes. Read **30** if you are deciding what to work on next. The
numbered references are lookup material; read them when you need an exact field name.

---

## How to read these

Three conventions used throughout:

- **Exact names are preserved verbatim.** Frontmatter fields, settings keys, hook event names, env
  vars, and metric names are quoted exactly as the docs spell them. Where a name is easy to get
  wrong (`disable-model-invocation` vs `disableModelInvocation` — skills use kebab-case, subagents
  use camelCase) that is called out.
- **Version-sensitive behavior carries its version.** If a document says something changed in
  `v2.1.198`, that is from the source docs, not inference.
- **Editorial judgment is marked.** Lines beginning **`LoomWarp note:`** are our reading, not
  Anthropic's documentation. Everything else is the docs.

---

## The two-sentence summary

Claude Code's extension layer is now substantially more capable than it was when LoomWarp's
architecture was set: skills subsume custom commands and can fork into subagents, hooks expose 29
lifecycle events with a real permission-decision protocol, plugins and marketplaces provide
SHA-pinned versioned capability distribution, agent teams and dynamic workflows provide dependency-
aware multi-agent orchestration, and OpenTelemetry emits per-agent, per-skill, per-plugin cost and
outcome attribution.

**What it still does not provide is a versioned, hashed, owner-attributed manifest of the context an
agent actually saw, joined to that unit of work's outcome** — which is precisely LoomWarp's stated
differentiating claim, and which the `InstructionsLoaded` hook plus the OTel event stream now make
substantially cheaper to build than when the claim was first written.
