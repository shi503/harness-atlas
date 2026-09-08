---
title: "Claude Code — extensibility reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-08-10"
source_verified: "2026-08-10"
claims_captured: "2026-09-08"
docs_root: "https://code.claude.com/docs/en/"
status: ACTIVE
verification:
  derived_from:
    - "Anthropic's official Claude Code documentation at https://code.claude.com/docs/en/ — read 2026-08-10 via llms.txt and the per-page .md sources"
    - "product and repository copy — claude.com/product/claude-code, github.com/anthropics/claude-code — captured 2026-09-08"
  grounded_against:
    - "the profile at ../claude-code.md, read against v2.1.261 (d7dbd9a) on 2026-09-04"
    - "per-version behaviour notes carried in the source docs at capture (most recent referenced: v2.1.224)"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-08-10"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is an ATTESTATION, not a capture. This set was written before the corpus recorded
    authorship; KD attested opus on 2026-09-08 under ruling 2026-09-08-authorship-provenance, which
    also requires this sentence. The mechanism documents are a 2026-08-10 snapshot; only the claim
    ledger below was captured 2026-09-08.
---

# Claude Code — extensibility reference set

**This folder is the deep read for the Template v2 profile at [`../claude-code.md`](../claude-code.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` links out here.

> **Drafted 2026-08-10 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of Anthropic's official Claude Code documentation, organised by the
**extension layer** — the surfaces you use to change what Claude Code knows, what it can reach, what
it is allowed to do, and how work gets orchestrated across agents. Cut by Claude Code's own surface
vocabulary rather than by this atlas's 33 components, which is what makes it the profile's
complement rather than a second copy of it.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot
answer *how does this surface actually work* without becoming something nobody reads in thirty
seconds. This folder is that grain: the tables too long for a detail row, the surfaces the vendor
documents across four scattered pages, and the caveats stated once in a changelog.

---

## What Anthropic says Claude Code is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing the
vendor is the sole authority on — they are recorded as claims, never as findings.

| Claim | Source | Captured |
|---|---|---|
| *"Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Available in your terminal, IDE, desktop app, and browser."* | `code.claude.com/docs/en/overview` | 2026-09-08 |
| *"Claude Code is an AI-powered coding assistant that helps you build features, fix bugs, and automate development tasks. It understands your entire codebase and can work across multiple files and tools to get things done."* | `code.claude.com/docs/en/overview` | 2026-09-08 |
| *"Claude Code is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows -- all through natural language commands. Use it in your terminal, IDE, or tag @claude on Github."* | `github.com/anthropics/claude-code` README and repository description | 2026-09-08 |
| *"Work with Claude directly in your codebase. Build, debug, and ship from your terminal, IDE, Slack, web, and more."* | `claude.com/product/claude-code`, headline | 2026-09-08 |
| *"Create what's exciting. Maintain what's essential."* | `claude.com/product/claude-code`, tagline | 2026-09-08 |
| *"Claude Code is composable and follows the Unix philosophy."* | `code.claude.com/docs/en/overview`, "Pipe, script, and automate with the CLI" | 2026-09-08 |
| *"Each surface connects to the same underlying Claude Code engine, so your repo's CLAUDE.md files, settings, and MCP servers work across all of them."* | `code.claude.com/docs/en/overview`, "Use Claude Code everywhere" | 2026-09-08 |

[`20-consolidated-guide.md`](./20-consolidated-guide.md) closes by walking these against the
mechanisms this set documents.

---

## Provenance and freshness

**The claims above were captured 2026-09-08. Everything else here was read on 2026-08-10** from
`https://code.claude.com/docs/llms.txt` and the per-page `.md` sources. No third-party blogs,
tutorials, or LLM recall were used as a source of fact; the one blog link that appears is one the
official docs themselves cite.

> **Read against `https://code.claude.com/docs/en/` at v2.1.224, 2026-08-10. A surface that has
> shipped since is not here.** The profile that cites this folder was read against v2.1.261 on
> 2026-09-04 — roughly forty releases later. Where the two disagree, the profile is newer.

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
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: current best practice for building on Claude Code, read as one system — and the claims above, walked against what this set documented** |

**Twelve documents, and that is the whole set.** Read **20** if you have ten minutes. The numbered
references are lookup material; read them when you need an exact field name.

---

## How to read these

Two conventions used throughout:

- **Exact names are preserved verbatim.** Frontmatter fields, settings keys, hook event names, env
  vars, and metric names are quoted exactly as the docs spell them. Where a name is easy to get
  wrong (`disable-model-invocation` vs `disableModelInvocation` — skills use kebab-case, subagents
  use camelCase) that is called out.
- **Version-sensitive behavior carries its version.** If a document says something changed in
  `v2.1.198`, that is from the source docs, not inference.

---

## The two-sentence summary

Claude Code's extension layer is nine surfaces over one engine: skills subsume custom commands and
can fork into subagents, hooks expose 29 lifecycle events with a real permission-decision protocol,
plugins and marketplaces provide SHA-pinned versioned capability distribution, agent teams and
dynamic workflows provide dependency-aware multi-agent orchestration, and OpenTelemetry emits
per-agent, per-skill, per-plugin cost and outcome attribution.

The layering rule is the thing to learn first: everything upstream of the tool-call boundary —
`CLAUDE.md`, auto memory, skills — shapes behaviour by prose, and only permissions, hooks and the
sandbox bind mechanically. [`01-extension-surfaces.md`](./01-extension-surfaces.md) is where that
distinction is drawn, and it is the page to read before any of the others.

---

> **Re-headed and stripped 2026-09-08.** This folder was written before the harness framework spun out
> of one consumer's repository, and every document carried that consumer's framing — a
> *"LoomWarp-oriented reading"* header, a `LoomWarp note:` convention, nine trailing `## LoomWarp
> notes` sections and an appendix auditing that consumer's own policy files. All of it violated the
> standing rule that *a page describes its harness and nothing else*, and all of it is gone. The
> consumer-specific gap analysis those notes pointed at, `30-gap-analysis-loomwarp.md`, correctly left
> with that consumer at the spin-out; its former row in the table above is removed, because a row
> naming a file no reader can open is not a contents entry. The generalised form of this folder is
> [`skills/harness-deep-read/SKILL.md`](../../skills/harness-deep-read/SKILL.md), which reserves the
> `30-` slot and forbids filling it.
