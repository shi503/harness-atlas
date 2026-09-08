---
title: "Codex CLI — extensibility reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "https://learn.chatgpt.com/docs"
version_at_capture: "rust-v0.153.4"
status: ACTIVE
verification:
  derived_from:
    - "openai/codex @ rust-v0.153.4 (released 2026-09-04; repo HEAD pushed 2026-09-08) — docs/, codex-rs/ crate READMEs, README.md"
    - "learn.chatgpt.com/docs, reached via 308 redirects from developers.openai.com/codex — read 2026-09-08"
    - "product and repository copy — github.com/openai/codex, chatgpt.com/codex — captured 2026-09-08"
  grounded_against:
    - "the profile at ../codex.md, read against rust-v0.153.2 (79016fc) on 2026-09-03"
    - "crate READMEs opened directly: execpolicy, memories, thread-store, app-server, network-proxy"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. This is the first deep read produced under
    the amended harness-deep-read skill; depth (Standard) and scope (CLI/runtime plus the cloud and
    IDE surfaces) were agreed with KD before reading, per that skill's step one.
---

# Codex CLI — extensibility reference set

**This folder is the deep read for the Template v2 profile at [`../codex.md`](../codex.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of Codex's own documentation and crate sources, organised by **the
surfaces Codex names** — `AGENTS.md`, `config.toml`, skills, plugins, hooks, subagents, MCP, the
app-server, the sandbox, execpolicy, `codex exec`, memories. Cut by Codex's vocabulary rather than by
this atlas's 33 components, which is what makes it the profile's complement rather than a second copy
of it.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot answer
*how does this surface actually work* without becoming something nobody reads in thirty seconds. This
folder is that grain: the execpolicy grammar, the memory pipeline's two phases, the twelve hook
events, the five configuration layers and which of them is a floor.

---

## Scope — and one place it is wider than the profile

**Depth: Standard.** Eleven surface documents, plus this index and the guide. Surfaces the vendor
documents adequately in one page are linked rather than restated.

**Scope: the CLI and runtime, plus the cloud and IDE surfaces.** Documents `01`–`10` describe
`codex` and `codex-rs`, which is the boundary the profile draws — its §7 states that *"Every claim in
this profile is about the CLI/runtime only"*, because "Codex" names several OpenAI products.

**[`11-beyond-the-cli.md`](./11-beyond-the-cli.md) goes past that boundary**, by commission, covering
Codex cloud, the IDE extension, and the desktop and web surfaces. **It has no counterpart in the
profile's §6**, so nothing links out to it from there and nothing in it should be read as scoring or
comparison. It is listed here so the surface inventory matches the vendor's own *"Available on"*
grouping rather than ours.

**The shape found, and why it is not ours.** Codex publishes three different outlines: the repository's
`docs/`, cut by CLI surface; `learn.chatgpt.com`'s Codex tree, cut by product; and ~120 Rust crates,
several of which document surfaces the other two do not mention. This set follows the first, borrows
from the third where it is the only source — execpolicy and the memory pipeline are documented **only**
in crate READMEs — and takes the second only for `11`.

---

## What OpenAI says Codex is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing the
vendor is the sole authority on — recorded as claims, never as findings.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §8 walks them against the mechanisms this set
documents.

| Claim | Source | Captured |
|---|---|---|
| *"**Codex CLI** is a coding agent from OpenAI that runs locally on your computer."* | `github.com/openai/codex` README | 2026-09-08 |
| *"Lightweight coding agent that runs in your terminal"* | `github.com/openai/codex`, repository description | 2026-09-08 |
| *"Run coding tasks in parallel cloud environments"* · *"work in parallel, and start work from the web, GitHub, GitLab, Linear, or Slack"* | `learn.chatgpt.com/docs/cloud` | 2026-09-08 |
| *"Give each task dedicated environments and let them continue while you work on something else."* | `learn.chatgpt.com/docs/cloud` | 2026-09-08 |
| *"Codex reads `AGENTS.md` files before doing any work. By layering global guidance with project-specific overrides, you can start each task with consistent expectations, no matter which repository you open."* | `learn.chatgpt.com/docs/agent-configuration/agents-md` | 2026-09-08 |
| *"Use agent skills to extend ChatGPT and Codex with task-specific capabilities. A skill packages instructions, resources, and optional scripts so either product can follow a workflow reliably."* | `learn.chatgpt.com/docs/build-skills` | 2026-09-08 |
| *"A plugin is an installable package that can include skills, an MCP server, or both."* | `learn.chatgpt.com/docs/build-plugins` | 2026-09-08 |
| *"Hooks are an extensibility framework for Codex… enabling features such as: Send the chat to a custom logging/analytics engine"* | `learn.chatgpt.com/docs/hooks` | 2026-09-08 |
| *"you can additionally define custom agents with different model configurations and instructions for different tasks"* | `learn.chatgpt.com/docs/agent-configuration/subagents` | 2026-09-08 |
| *"The sandbox defines technical boundaries. The approval policy decides when the agent must stop and ask before crossing them."* | `learn.chatgpt.com/docs/sandboxing` | 2026-09-08 |
| *"Work with Codex beside your code. Bring open files and selections into the prompt, review edits in place, and hand off longer work without breaking your flow."* | `learn.chatgpt.com/docs/codex/ide` | 2026-09-08 |

---

## Provenance and freshness

> **Read against `learn.chatgpt.com/docs` and `openai/codex` at `rust-v0.153.4`, 2026-09-08. A surface
> that has shipped since is not here.**

`rust-v0.153.4` was released 2026-09-04; the repository was last pushed 2026-09-08, so the working
tree is ahead of the tag. Nothing here rests on unreleased commits.

**The profile is one read behind and one read older.** [`../codex.md`](../codex.md) was read against
`rust-v0.153.2` (`79016fc`) on 2026-09-03. Where the two differ, this set is newer — the visible
example is hooks, which the profile records as **11** lifecycle events and which the documentation now
lists as **12**. Neither is wrong; they are five days apart.

**Where the documentation lives, and a caution.** The repository's `docs/` directory is now **stubs** —
`agents_md.md`, `sandbox.md`, `execpolicy.md`, `skills.md`, `slash_commands.md`, `exec.md`,
`authentication.md` each contain a heading and a link to `developers.openai.com/codex/…`, which
**308-redirects** to `learn.chatgpt.com/docs/…`. Two redirects separate a reader starting at the
repository from the current text, and one stub (`config.md`) carries a setting the hosted reference
does not. Crate `README.md` files under `codex-rs/` remain substantive and are the **only** source for
execpolicy's grammar and the memory pipeline's phases.

**Refresh protocol.**

```bash
# The current tag, and whether the tree has moved past it.
gh api repos/openai/codex/releases/latest --jq '.tag_name + "  " + .published_at'

# The stub set — a stub gaining content, or a new file, is a surface changing.
gh api repos/openai/codex/contents/docs --jq '.[].name'

# Crate READMEs are the primary source for execpolicy and memories.
gh api repos/openai/codex/contents/codex-rs/execpolicy/README.md --jq '.content' | base64 -d
```

When you refresh, update `source_verified` and `version_at_capture` in each file's frontmatter. A
reference doc with a stale date is more dangerous than no reference doc, because it will be trusted.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-agents-md-and-configuration.md`](./01-agents-md-and-configuration.md) | The `AGENTS.md` chain and its 32 KiB ceiling; `config.toml`'s five layers, the administrative floor, and every top-level section |
| 02 | [`02-skills-and-plugins.md`](./02-skills-and-plugins.md) | `SKILL.md` fields, the six-scope discovery ladder and its no-shadowing rule, `agents/openai.yaml`, plugin packaging |
| 03 | [`03-hooks.md`](./03-hooks.md) | All twelve lifecycle events, the four config locations, the decision protocol including `updatedInput`, and the trust rule |
| 04 | [`04-subagents.md`](./04-subagents.md) | The three built-in roles, custom agent TOML, model/effort resolution, concurrency caps, and what nesting the docs do not state |
| 05 | [`05-mcp-and-the-app-server.md`](./05-mcp-and-the-app-server.md) | MCP transports and tool-level approval modes; the app-server as the embedding surface and its ownership rule |
| 06 | [`06-sandboxing-and-permissions.md`](./06-sandboxing-and-permissions.md) | Seatbelt / `bubblewrap` / Windows sandbox, `sandbox_mode`, `approval_policy`, `approvals_reviewer`, named permission profiles |
| 07 | [`07-execpolicy.md`](./07-execpolicy.md) | The Starlark rule language — `prefix_rule`, `host_executable`, basename-fallback semantics, and load-time rule tests |
| 08 | [`08-non-interactive-and-ci.md`](./08-non-interactive-and-ci.md) | `codex exec`, every flag, the stdout/stderr split, JSON Lines and `--output-schema`, resume, CI patterns |
| 09 | [`09-memory-and-session-state.md`](./09-memory-and-session-state.md) | The thread store and its history/metadata separation; the two-phase memory pipeline, its locks, leases and git baseline |
| 10 | [`10-administration-and-enterprise.md`](./10-administration-and-enterprise.md) | `requirements.toml` as a floor, the administratively-only keys, feature gating, and the silent-failure case |
| 11 | [`11-beyond-the-cli.md`](./11-beyond-the-cli.md) | **Past the profile's boundary** — Codex cloud, the IDE extension, desktop and web |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, five rules, enforcement ordered — and the claims above walked against what this set documented** |

Read **20** if you have ten minutes. The numbered references are lookup material; read them when you
need an exact field name.

---

## How to read these

- **Exact names are preserved verbatim.** Config keys, hook event names, flags and TOML paths are
  quoted as the source spells them. Where two surfaces use different conventions for the same idea —
  skills discover under `.agents/skills`, everything else under `.codex/` — that is called out.
- **Absences name what was checked.** Four appear across this set, collected in
  [`20`](./20-consolidated-guide.md) §7. None says "appears to lack".
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
