---
status: DRAFT
title: "Extension surfaces — the map"
tier: reference
project: harness-atlas
source: "https://code.claude.com/docs/en/features-overview"
source_verified: "2026-08-10"
---

# Extension surfaces — the map

> **Drafted 2026-08-10 by `claude-opus-5`, not yet verified.** Attested, not captured — see [`00-README.md`](./00-README.md).

Claude Code's built-in tools cover most coding work. The extension layer is what you add to change
what Claude knows, what it can reach, what it may do, and how work is split across agents. There are
nine surfaces. They plug into different points of the agentic loop, and picking the wrong one is the
most common configuration mistake.

---

## The nine surfaces

| Surface | What it is | Plugs in at | Docs |
|---|---|---|---|
| **CLAUDE.md** | Persistent instructions loaded every session | Session start, as a user message after the system prompt | `/docs/en/memory` |
| **`.claude/rules/`** | Modular instructions, optionally scoped to file globs | Session start, or when a matching file is read | `/docs/en/memory#organize-rules-with-claude/rules/` |
| **Skills** | Reusable knowledge or invocable workflows in `SKILL.md` | On demand — you type `/name`, or Claude matches the description | `/docs/en/skills` |
| **Subagents** | Isolated workers with their own context window and system prompt | When spawned via the Agent tool, `@`-mention, or `--agent` | `/docs/en/sub-agents` |
| **Agent teams** | Multiple independent sessions with a shared task list and peer messaging | Lead session spawns teammates | `/docs/en/agent-teams` |
| **Dynamic workflows** | A JavaScript script that orchestrates dozens–hundreds of subagents | Runtime executes it in the background | `/docs/en/workflows` |
| **Hooks** | A script, HTTP request, MCP tool, prompt, or subagent fired at a lifecycle event | 29 lifecycle events | `/docs/en/hooks` |
| **MCP** | Protocol connection to external services, tools, and data | Session start (names), on demand (schemas) | `/docs/en/mcp` |
| **Plugins / marketplaces** | The packaging and distribution layer for all of the above | Install time; components load when enabled | `/docs/en/plugins` |

Two more that behave like extensions but are not user-authored in the same way:

- **Code intelligence (LSP)** — installed as a plugin, gives symbol-level navigation and live
  diagnostics. Reduces net context because symbol lookups replace file reads.
- **Artifacts** — publishes session output as a private, interactive web page on claude.ai.

---

## When each one loads, and what it costs

This table is the single most useful thing on this page. Context cost is the real constraint on how
much configuration a repo can carry.

| Surface | When it loads | What loads | Recurring cost |
|---|---|---|---|
| CLAUDE.md | Session start | Full content, all levels (managed + user + project + local) | **Every request** |
| `.claude/rules/` | Session start, or on matching file read | Full content of the rule file | Every request once loaded |
| Skills | Descriptions at start; body when used | Name + description always; full body on invocation | Low — descriptions only, until used |
| MCP servers | Session start | Tool **names**; JSON schemas deferred | Low — tool search is on by default |
| Code intelligence | After edits, and on symbol lookup | Diagnostics; definition/reference info | Low; often net-negative |
| Subagents | On spawn | Fresh isolated window | **Isolated** from main session |
| Hooks | On their event | Nothing, unless the hook returns output | **Zero** by default |

Three consequences worth internalizing:

1. **CLAUDE.md is the only surface that costs you on every single request.** The docs target is
   **under 200 lines per file**. Beyond that, adherence drops as well as budget.
2. **Skill descriptions are not free at scale.** The combined `description` + `when_to_use` is
   truncated at **1,536 characters** in the listing. In a repo with hundreds of skills, descriptions
   get shortened and the keywords Claude matches on can be stripped. Lead the description with the
   words a real request would contain.
3. **Hooks are the only zero-context enforcement mechanism.** This is why the guardrail question is
   always "hook or prompt", never "how strongly do I word the instruction".

### Once a skill loads, it stays loaded

The rendered `SKILL.md` enters the conversation as one message and **persists for the rest of the
session**. Claude Code does not re-read the file on later turns. Two implications:

- Write standing instructions, not one-time steps.
- Every line in a skill body is a recurring token cost for the remainder of the session.

Re-invoking a skill whose rendered content is unchanged adds a short "already loaded" note rather
than a second copy (v2.1.202+). Auto-compaction re-attaches the most recent invocation of each
skill, keeping the **first 5,000 tokens** of each within a shared **25,000-token** budget, filled
most-recent-first — so older skills can be dropped entirely after a compaction.

---

## Layering and precedence

Different surfaces resolve conflicts differently. Getting this wrong produces the "why isn't my
override taking effect" class of bug.

| Surface | Conflict resolution | Order |
|---|---|---|
| **CLAUDE.md / rules** | **Additive** — all levels contribute simultaneously | Filesystem root → cwd; `CLAUDE.local.md` after `CLAUDE.md` at each level. Claude reconciles conflicts by judgment |
| **Skills** | **Override by name** | managed > user > project. Any level overrides a bundled skill of the same name. Plugin skills are namespaced (`plugin:skill`) and never collide |
| **Subagents** | **Override by name** | managed > `--agents` CLI flag > project > user > plugin |
| **MCP servers** | **Override by name** | local > project > user |
| **Hooks** | **Merge** — every registered hook fires | All sources; identical handlers deduplicate (plugin copies stay separate) |
| **Settings** | **Override by key**, permissions merge | managed > CLI args > local > project > user |

Two asymmetries that catch people:

- **Skills** are `managed > user > project` — *user beats project*. **Subagents** are
  `managed > CLI > project > user` — *project beats user*. These are opposite. Do not assume.
- **Deny always wins, from any scope.** A user-level deny blocks a project-level allow and vice
  versa; deny rules are evaluated before allow rules regardless of level.

### Nested discovery

Both skills and subagents are discovered by walking **up** from the working directory to the repo
root, and skills additionally load **downward on demand**: when Claude reads a file under
`packages/web/`, skills in `packages/web/.claude/skills/` become available for the rest of the
session. A nested skill that collides by name gets a directory-qualified name
(`/apps/web:deploy`), and invoking the unqualified name appends the qualified variants with an
instruction to also invoke whichever matches the files in play (v2.1.203+).

For nested project **subagents** with the same `name`, the definition **closest to the working
directory** wins (v2.1.178+). Within a single directory tree, duplicate names resolve by filesystem
read order — which is to say, unpredictably. `/doctor` reports these.

---

## Choosing between them

The docs frame this as a set of triggers rather than a taxonomy, which is the right way round.

| Trigger | Reach for |
|---|---|
| Claude gets a convention wrong twice | CLAUDE.md |
| You keep typing the same prompt to start a task | A user-invocable skill |
| You've pasted the same playbook three times | A skill |
| You keep copying data from a tab Claude can't see | An MCP server |
| Claude reads many files to find a symbol | A code intelligence plugin |
| A side task floods your conversation with output | A subagent |
| It must happen every time, without asking | A hook |
| A second repository needs the same setup | A plugin |

### The distinctions that actually matter

**Skill vs subagent.** A skill is *content you load into a context*; a subagent is *an isolated
worker*. They compose in both directions: a subagent can preload skills (`skills:` field, full
content injected at startup), and a skill can run in a forked subagent (`context: fork`).

**Hook vs skill — the enforcement distinction.** From the docs, near-verbatim because it is the
single most important sentence in the extension documentation:

> An instruction like "never edit `.env`" in CLAUDE.md or a skill is a **request, not a guarantee**.
> A `PreToolUse` hook that blocks the edit is **enforcement**. If a rule must hold every time, make
> it a hook rather than a prompt instruction.

**Subagent vs agent team.** Subagents report to their caller and never talk to each other. Teammates
share a task list, claim work, and message each other directly. Teams cost meaningfully more tokens.

**Agent team vs workflow.** The distinguishing question is *who holds the plan*. In a team, the lead
agent decides turn by turn and intermediate results live in a shared task list. In a workflow, a
**script** holds the loop, the branching, and the intermediate results — so Claude's context holds
only the final answer, and the orchestration itself becomes the repeatable artifact.

**MCP vs skill.** MCP gives Claude *purpose-built tools* for an external system. A skill gives
Claude *knowledge of how to use them well*. An MCP server connects to your database; a skill teaches
your schema and query patterns. They are complements, not alternatives.

---

## Common combinations

| Pattern | Mechanism |
|---|---|
| Skill + MCP | MCP provides the connection, a skill documents the schema and query patterns |
| Skill + subagent | An `/audit` skill spawns security, performance, and style subagents in isolated context |
| CLAUDE.md + skills | CLAUDE.md holds the always-on rule ("follow our API conventions"); a skill holds the full style guide |
| Hook + MCP | A `PostToolUse` hook fires an MCP tool — e.g. Slack notification when a critical file changes |
| Subagent + worktree | `isolation: worktree` gives a subagent its own checkout so parallel edits can't collide |
