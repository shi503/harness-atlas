---
title: "Teardown — Claude Code (by reference)"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# Claude Code — Anthropic

> **This is a pointer, not a teardown.** The full analysis is 13 documents in
> [`../../claude-code/`](../../harnesses/claude-code), read from the official docs on 2026-08-10 and covering
> the extension layer through v2.1.224. That work is not duplicated here.

**Category.** A **harness** — the only entry in this corpus that is one. Everything else in
`systems/` is a process layer installed into it or into a peer.

---

## What it provides, in one screen

| Component | Native capability |
|---|---|
| **Skills** | Subsume custom commands; can fork into subagents; open `SKILL.md` standard |
| **Hooks** | 29 lifecycle events with a real permission-decision protocol; can deny **and rewrite input** |
| **Subagents** | Isolated context, `memory:` scopes, worktree support |
| **Orchestration** | Agent teams (task dependencies, file-locked claiming, automatic unblocking); dynamic workflows (`pipeline()`, resumable, 16 concurrent / 1,000 per run) |
| **Context** | Per-directory `CLAUDE.md` with lazy nested loading, path-scoped rules, `claudeMdExcludes`, auto memory, `InstructionsLoaded` hook |
| **Estate** | `additionalDirectories`, `--add-dir`, `worktree.sparsePaths`, `symlinkDirectories`, upward discovery |
| **Policy** | Permission `deny` rules → `PreToolUse` hooks → managed settings → sandbox. A four-rung enforcement ladder |
| **Distribution** | Plugins, marketplaces, SHA pinning, semver dependencies, `validate --strict`, `renames` |
| **Evidence** | OpenTelemetry metrics/events/spans attributed by `agent.name`, `skill.name`, `plugin.name`, `marketplace.name`, `mcp_server.name`; permission audit trail via `claude_code.tool_decision`; beta distributed traces with `agent_id`/`parent_agent_id` |
| **Learning** | `skill-creator` eval loop — isolated per-case runs, assertion grading with evidence, with/without benchmarking, blind A/B |

---

## What it does not provide

The boundary every process layer in this corpus is built on: **a versioned, hashed, owner-attributed
manifest of the context an agent actually saw, joined to that work's outcome.**

The building blocks exist — `InstructionsLoaded` reports which instruction files loaded and why,
`plugin_loaded` reports versions, the OTel stream carries `session_id` / `prompt_id` / `agent_id` /
`workflow.run_id` correlation keys. Nothing writes or reconstructs the joined record.

Also absent: **durable execution across process death.** Workflows resume only within a session;
agent teams do not restore in-process teammates on `/resume`. That is a real gap and it is the
legitimate argument for an external control plane.

---

## Two constraints that break control-plane designs

1. **Project settings in `.claude/settings.json` load only from the starting directory** and are not
   inherited from parent directories the way `CLAUDE.md` files are.
2. **Portable skills get six frontmatter fields** (`name`, `description`, `license`,
   `compatibility`, `metadata`, `allowed-tools`) and a disallowed field is a hard error, not a
   warning. Every Claude-Code-only feature used — `context: fork`, dynamic context injection, `paths`
   scoping — is capability chosen over portability.

---

## Register worth imitating

Anthropic's docs describe managed settings as *"a client-side control, not a security boundary."*
QM makes the same move about its command policy. Both are the honest register this project's
`STRATEGIST` §2.4 asks for.

---

## Sources

Docs: <https://code.claude.com/docs/en/> · index at `/docs/llms.txt` · any page's raw markdown by
appending `.md`. Full reading: [`../../claude-code/`](../../harnesses/claude-code) (13 documents, 2026-08-10)
and the function-by-function gap analysis at
[`../../claude-code/30-gap-analysis-loomwarp.md`](https://github.com/shi503/loomwarp-team-system/blob/master/projects/loomwarp/references/claude-code/30-gap-analysis-loomwarp.md).
