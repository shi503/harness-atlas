---
status: DRAFT
title: "Multi-agent orchestration — subagents, teams, workflows, worktrees"
tier: reference
project: loomwarp
source: "https://code.claude.com/docs/en/agents, /agent-teams, /workflows, /worktrees, /cross-session-messaging"
source_verified: "2026-08-10"
---

# Multi-agent orchestration

Four ways to run agents in parallel, plus three supporting mechanisms. This is the area that changed
most between LoomWarp's architecture being set and today, so it deserves careful reading.

---

## The four approaches

| Approach | What it gives you | Use when |
|---|---|---|
| **Subagents** | Delegated workers inside one session; own context, return a summary | A side task would flood your conversation with output you won't reference again |
| **Agent view** | One screen to dispatch and monitor background sessions — `claude agents`. *Research preview* | Several independent tasks you hand off and check back on |
| **Agent teams** | Coordinated sessions with a shared task list and peer messaging, managed by a lead. *Experimental, off by default* | Claude should split a project into pieces, assign them, and keep workers in sync |
| **Dynamic workflows** | A script running many subagents with cross-checked results | A job outgrows a handful of subagents, or findings need verifying against each other |

Supporting mechanisms that are not themselves a way to run agents:

- **Worktrees** — a separate git checkout per session or subagent, so parallel work never edits the
  same files.
- **Cross-session messaging** — Claude can list and message your *other* Claude Code sessions on
  this machine, another machine, or Claude Code on the web.
- **`/batch`** — a bundled skill that splits one large change into 5–30 worktree-isolated subagents
  that each open a PR. A packaged use of subagents and worktrees, not a separate style.

### The decision, framed correctly

The docs frame it as **who holds the plan**:

| | Subagents | Skills | Agent teams | Workflows |
|---|---|---|---|---|
| What it is | A worker Claude spawns | Instructions Claude follows | A lead supervising peer sessions | A script the runtime executes |
| Who decides what runs next | Claude, turn by turn | Claude, following the prompt | The lead, turn by turn | **The script** |
| Where intermediate results live | Claude's context window | Claude's context window | A shared task list | **Script variables** |
| What's repeatable | The worker definition | The instructions | The team definition | **The orchestration itself** |
| Scale | A few per turn | Same | A handful of long-running peers | **Dozens to hundreds per run** |
| Interruption | Restarts the turn | Restarts the turn | Teammates keep running | Resumable in the same session |

Three follow-up questions settle most cases:

1. **Who coordinates?** Claude in one conversation → subagents. You, checking back → agent view. A
   lead supervising peers → agent teams. A script → workflows.
2. **Do workers need to talk to each other?** Only agent teams (and cross-session messaging between
   independent sessions) support this. Subagents report only to their caller.
3. **Do tasks touch the same files?** Isolate with worktrees. **Agent teams do not isolate
   teammates in worktrees** — partition the work so each teammate owns different files.

---

## Agent teams

**Experimental and disabled by default.** Enable with `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` in
the environment or `settings.json`:

```json
{ "env": { "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1" } }
```

Without it, no team is set up, no team directories are written, and Claude does not spawn or propose
teammates.

### Architecture

| Component | Role |
|---|---|
| **Team lead** | The main session — spawns teammates and coordinates |
| **Teammates** | Separate Claude Code instances working on assigned tasks |
| **Task list** | Shared work items teammates claim and complete |
| **Mailbox** | Messaging between agents |

State lives on disk under a **session-derived** name (`session-` + first eight characters of the
session ID):

- Team config: `~/.claude/teams/{team-name}/config.json` — **removed when the session ends**
- Mailboxes: `~/.claude/teams/{team-name}/inboxes/{agent-name}.json`
- Task list: `~/.claude/tasks/{team-name}/` — **persists locally, never uploaded**, so resumed
  sessions keep tasks. Retention follows `cleanupPeriodDays`

The team config holds runtime state (session IDs, tmux pane IDs). **Do not hand-edit or pre-author
it** — it is overwritten on the next state update. There is no project-level equivalent; a
`.claude/teams/teams.json` in your project is treated as an ordinary file, not configuration.

The config's `members` array carries each member's name and agent ID; the lead always has agent type
`team-lead`. Teammates can read this file to discover each other.

### Task dependencies

This is the part most relevant to LoomWarp. Tasks have three states — pending, in progress,
completed — and **tasks can depend on other tasks**. A pending task with unresolved dependencies
cannot be claimed until those dependencies complete, and when a teammate completes a task others
depend on, the dependents unblock automatically.

**Task claiming uses file locking** to prevent races when multiple teammates claim simultaneously.

The lead can assign explicitly, or a teammate self-claims the next unassigned, unblocked task after
finishing one.

### Reusing subagent definitions as teammate roles

You can reference a subagent type from any scope (project, user, plugin, CLI) when spawning a
teammate:

```text
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

The teammate honors that definition's `tools` allowlist and `model`, and the **body is appended to
the teammate's system prompt as additional instructions rather than replacing it**.

> **The `skills` and `mcpServers` frontmatter fields are NOT applied when a definition runs as a
> teammate.** Teammates load skills and MCP servers from project and user settings like a regular
> session.

Team coordination tools — `SendMessage` and the task tools — are always available to a teammate even
when `tools` restricts everything else.

### Plan approval

Teammates can be required to plan before implementing:

```text
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

The teammate works in read-only plan mode, submits a plan, and the **lead approves or rejects
autonomously** — this is the designed exception to permission prompts reaching you. If rejected, the
teammate revises in plan mode and resubmits. Influence the lead's judgment by giving it criteria in
your prompt ("only approve plans that include test coverage").

### Quality gates

| Hook | Exit 2 effect |
|---|---|
| `TeammateIdle` | Sends feedback and keeps the teammate working |
| `TaskCreated` | Prevents creation and sends feedback |
| `TaskCompleted` | Prevents completion and sends feedback |

### Permissions

Teammates start with the lead's permission settings. If the lead runs `--dangerously-skip-permissions`,
all teammates do. You can change individual modes after spawning but **not at spawn time**. Teammate
permission prompts appear in the lead session.

Messages between agents are treated as coming from another Claude session, not from you: a teammate
cannot approve a permission prompt on your behalf, and a denied teammate cannot relay the action to
another teammate to bypass the check. In **auto mode** the classifier additionally treats a relayed
approval claim as untrusted input and reviews every message — including structured protocol
messages — before delivery.

### Display modes

`teammateMode` in `~/.claude/settings.json`, or `--teammate-mode` (experimental, not in `--help`):

- `"in-process"` (**default** since v2.1.179) — all teammates in your terminal. Arrow keys select,
  Enter opens a transcript and messages directly, Esc interrupts, `x` stops, Ctrl+T toggles the task
  list. Works in any terminal.
- `"auto"` — split panes when already in tmux or in iTerm2 with `it2`, else in-process.
- `"tmux"` — split panes, auto-detecting tmux vs iTerm2.
- `"iterm2"` (v2.1.186+) — iTerm2 native split panes; requires the `it2` CLI.

Split panes are **not supported** in VS Code's integrated terminal, Windows Terminal, or Ghostty.

### Sizing

Start with **3–5 teammates**. Token cost scales linearly; coordination overhead grows; returns
diminish. With 15 independent tasks, three teammates is a good starting point. Aim for **5–6 tasks
per teammate**. Teammates do **not** inherit the lead's `/model` — set **Default teammate model** in
`/config`, or specify in the prompt. They **do** inherit the lead's effort level.

### Limitations (as documented)

- **No session resumption with in-process teammates** — `/resume` and `/rewind` do not restore them.
- **Task status can lag** — teammates sometimes fail to mark tasks complete, blocking dependents.
- **Shutdown can be slow** — teammates finish the current request or tool call first.
- **One team per session**, scoped to that session. No named teams, no sharing across sessions.
- **No nested teams** — teammates cannot spawn teammates.
- **No background subagents from in-process teammates** — a teammate's background work cannot
  outlive the lead's process; requesting one returns an error.
- **Lead is fixed** — no promotion or transfer.
- **Permissions set at spawn.**

---

## Dynamic workflows

Requires **v2.1.154+**, available on all paid plans, the Anthropic API, Bedrock, Google Cloud's
Agent Platform, and Microsoft Foundry. On Pro, enable from the Dynamic workflows row in `/config`.

A workflow is a **JavaScript script** that orchestrates subagents at scale. Claude writes the script
for the task you describe; a runtime executes it in the background while your session stays
responsive.

### Starting one

- **Bundled:** `/deep-research <question>` — fans out web searches across angles, cross-checks
  sources, votes on each claim, returns a cited report with unsurvived claims filtered out. Runs only
  when you invoke it (v2.1.218+). As of v2.1.196, claims the verifiers *cannot* check (rate limit,
  API error) are listed as **unverified** rather than counted as refuted.
- **Per-prompt:** include the keyword `ultracode`, or just ask ("use a workflow"). The keyword is
  an opt-in **only in a prompt you type yourself** — it does not trigger from `-p`, an unstamped SDK
  prompt, a scheduled task, a webhook payload, or a PR comment (v2.1.210+).
- **Session-wide:** `/effort ultracode` (or `claude --effort ultracode`, v2.1.203+) combines `xhigh`
  reasoning with automatic workflow orchestration for every substantive task. Resets on a new session.

### The script model

```javascript
export const meta = {
  name: 'audit-routes',
  description: 'Audit every route handler for missing auth checks',
}

const found = await agent('List every .ts file under src/routes/.', {
  schema: { type: 'object', required: ['files'],
            properties: { files: { type: 'array', items: { type: 'string' } } } },
})

const audits = await pipeline(found.files, file =>
  agent(`Audit ${file} for missing authentication checks.`, { label: file }),
)

return audits.filter(Boolean)
```

- Plain JavaScript with top-level `await`.
- `agent()` spawns one subagent; `pipeline()` runs one per item in a list.
- `agent()` resolves to **`null`** if you stop it mid-run or it hits an unrecoverable API error.
  `pipeline()` keeps the `null` — hence `.filter(Boolean)`.
- A saved workflow reads invocation input from a global named `args`, passed as structured data
  (so array and object methods work directly). `undefined` if omitted.

### Runtime constraints

| Constraint | Why |
|---|---|
| **No mid-run user input** — only agent permission prompts pause a run | For sign-off between stages, run each stage as its own workflow |
| **No direct filesystem or shell access from the script itself** | Agents read, write, and run commands; the script coordinates |
| **No module loading** — a script containing `import()` fails before the run starts | Put library work inside an agent's task |
| **Up to 16 concurrent agents**, fewer on limited-CPU machines | Bounds local resource use |
| **1,000 agents total per run** | Prevents runaway loops |

### Permissions during a run

Your permission mode controls **only the launch prompt**. The subagents a workflow spawns always run
in **`acceptEdits`** mode and inherit your tool allowlist, regardless of the session's mode — file
edits are auto-approved. Shell commands, web fetches, and MCP tools not in your allowlist can still
prompt mid-run; add them to the allowlist before a long run.

Launch prompting by mode:

| Mode | Prompted |
|---|---|
| Default, accept edits | Every run, unless "don't ask again" was selected for that workflow in that project |
| Auto | First launch only; any Yes records consent in user settings. Skipped entirely under ultracode |
| Bypass permissions, `claude -p`, Agent SDK | Never — the run starts immediately |

### Saving and distributing

`/workflows` → select the run → `s`. Two locations, Tab toggles:

- `.claude/workflows/` — shared with everyone who clones the repo
- `~/.claude/workflows/` — every project, only you (honors `CLAUDE_CONFIG_DIR`)

Project workflows win over personal ones of the same name. In a monorepo, saving to the project
location writes to the **closest existing** `.claude/workflows/` between cwd and the repo root
(v2.1.178+), and project workflows load from every such directory along the path with the closest
winning. Claude Code refuses to write through symlinks (v2.1.216+).

**Distribute in a plugin**: place scripts in `workflows/` at the plugin root, or point at another
location with the `workflows` manifest field. Namespaced by plugin — a script whose `meta.name` is
`release-audit` in plugin `acme-tools` runs as `/acme-tools:release-audit`.

### Resume semantics — read this before relying on it

Two rules decide what survives a stop:

1. An agent still **running** when you stopped is not saved and starts over.
2. **Replay follows the order agents started.** Cached results stop at the first agent that did not
   finish, and **every agent that started after that one runs again**, even if it completed.

So if a script starts A, B, C, D in that order and you stop while B is going: A returns from cache;
B reruns; **C and D rerun too**, despite having completed.

The practical consequence, stated in the docs: *a workflow that fans work out across many small
agents preserves more progress than one long agent.* Resume works **within the same session** — exit
Claude Code and the next session starts the workflow fresh.

### Cost controls

- **Size guideline** (v2.1.202+): `unrestricted` / `small` (<5 agents) / `medium` (<15) / `large`
  (<50). Default `medium` (v2.1.219+). Set via `/config`, `/config workflowSizeGuideline=small`, or
  the `workflowSizeGuideline` settings key (which takes precedence and hides the `/config` row).
  It is **advice to Claude, not a cap**.
- **Large-run warning** (v2.1.203+): a `Large workflow` warning appears when a run schedules more
  than 25 agents or projects past 1.5M tokens. Advisory only. A chosen size guideline replaces the
  25-agent threshold; ultracode sessions never show it.
- Every agent uses the session model unless the script routes a stage elsewhere or
  `CLAUDE_CODE_SUBAGENT_MODEL` is set (which overrides both).

Every run writes its script to a file under the session's directory in `~/.claude/projects/`, and
Claude receives the path — so you can read the orchestration, diff it against a previous run, or edit
it and ask Claude to relaunch from the edited version.

### Turning workflows off

Per user: `/config`, `"disableWorkflows": true` in `~/.claude/settings.json`, or
`CLAUDE_CODE_DISABLE_WORKFLOWS=1`. Organization-wide: `"disableWorkflows": true` in managed settings,
or the toggle on the Claude Code admin settings page. When disabled, bundled workflow commands
disappear, `ultracode` no longer triggers a run, and `ultracode` is removed from the `/effort` menu.

---

## Checking on running work

| Approach | Command |
|---|---|
| Background sessions | `claude agents` (agent view) |
| Subagents in the current session | Named background subagents appear in the `@`-mention typeahead with status |
| Anything backgrounded in this session | `/tasks` — check on, attach to, or stop; includes finished subagents |
| Dynamic workflows | `/workflows` — running and completed runs, phase, agents finished |

The `/workflows` progress view shows each phase with agent counts, token totals, and elapsed time.
Keys: `↑`/`↓` select · `Enter`/`→` drill in · `Esc`/`←` back out · `j`/`k` scroll · `f` filter by
status · `p` pause/resume · `x` stop agent or whole run · `r` restart a running agent · `s` save.

---

## LoomWarp notes

**This section is the single largest source of overlap with LoomWarp's existing build.**

- **`fractal/router.py` + `control/dispatch.py` implement a dependency-resolving orchestrator over
  subprocess `claude` invocations.** Agent teams' shared task list implements task dependencies with
  automatic unblocking and **file-locked claiming**; dynamic workflows implement the same thing as a
  resumable script with `pipeline()` and 16-way concurrency. Both are native, both handle the
  concurrency and race conditions LoomWarp would otherwise have to write.
- **GAP-08 / GAP-10 — "zero dependency edges ever exercised" — has a native answer.** The
  `BLUEPRINT-LoomWarp-V1.yaml` epic has 11 dependency edges and running it is stated as exit-evidence
  E3. Agent-team task dependencies and workflow `pipeline()` both exercise real dependency edges
  today, with locking, without LoomWarp writing a scheduler.
- **ISSUE-002 (one global `.state.json` across all blueprints) does not have an analogue natively.**
  Workflow runs write per-run script and state under the session directory; team task lists are keyed
  by session-derived name. Whatever LoomWarp keeps, it should key state per-epic, not per-router.
- **The workflow resume rule is a real design constraint worth adopting regardless of mechanism.**
  "Prefer several small workstreams over one large one" already appears in
  `specs/loom-warp-consolidation/02-remaining.md` as an operational note learned the expensive way.
  The workflow runtime encodes the same rule and explains exactly why: replay follows start order.
- **Agent teams' `TaskCompleted` hook is the handoff gate.** LoomWarp classifies terminal state by
  regexing a markdown HANDOFF file (GAP-18, ISSUE-001). `TaskCompleted` + exit 2 rejects a completion
  that fails its acceptance criteria and returns feedback to the agent, at the moment of completion,
  with no filesystem convention involved.
- **Caution on maturity.** Agent teams are explicitly **experimental, off by default**, with
  documented limitations including no session resumption for in-process teammates and lagging task
  status. Dynamic workflows are GA-ish (all paid plans) but resume only within a session. Neither is
  a drop-in replacement for a control plane that must survive process death — which is a real
  argument for LoomWarp retaining *something*. The argument it does not support is retaining a
  hand-rolled dependency resolver.
