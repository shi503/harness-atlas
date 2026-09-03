---
status: DRAFT
title: "Context and memory — CLAUDE.md, rules, auto memory, monorepos"
tier: reference
project: loomwarp
source: "https://code.claude.com/docs/en/memory, /large-codebases, /context-window"
source_verified: "2026-08-10"
---

# Context and memory

Two mechanisms carry knowledge across sessions: **CLAUDE.md files** you write, and **auto memory**
Claude writes itself. Both load at the start of every conversation, and — the critical framing —
**both are context, not enforced configuration**:

> To block an action regardless of what Claude decides, use a `PreToolUse` hook instead.

---

## CLAUDE.md

### Locations, in load order

| Scope | Location | Purpose |
|---|---|---|
| **Managed policy** | macOS `/Library/Application Support/ClaudeCode/CLAUDE.md` · Linux/WSL `/etc/claude-code/CLAUDE.md` · Windows `C:\Program Files\ClaudeCode\CLAUDE.md` | Organization-wide, cannot be excluded |
| **User** | `~/.claude/CLAUDE.md` | Personal preferences, all projects |
| **Project** | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Team-shared, committed |
| **Local** | `./CLAUDE.local.md` | Personal project preferences; gitignore it |

Managed content can also be embedded directly in `managed-settings.json` via the **`claudeMd`** key —
same precedence as a managed file. It is honored **only** in managed/policy settings; setting it in
user, project, or local settings has no effect.

### How they load

Claude Code walks **up** the directory tree from cwd, checking each directory for `CLAUDE.md` and
`CLAUDE.local.md`. All discovered files are **concatenated, not overridden**. Ordering runs from the
filesystem root down to cwd — so instructions closest to where you launched are read **last**. Within
each directory, `CLAUDE.local.md` is appended after `CLAUDE.md`.

Files in **subdirectories** below cwd are not loaded at launch; they load when Claude reads a file in
that subdirectory.

Two behaviors worth knowing:

- **Block-level HTML comments (`<!-- notes -->`) are stripped** before injection. Use them for human
  maintainer notes at zero token cost. Comments inside code blocks are preserved, and they remain
  visible when you open the file with the Read tool.
- **CLAUDE.md is delivered as a user message after the system prompt**, not as part of the system
  prompt. There is no guarantee of strict compliance. For system-prompt-level instructions use
  `--append-system-prompt` (must be passed every invocation — better for scripts than interactive
  use).

### Writing effective instructions

- **Size: target under 200 lines per file.** Longer files consume more context *and reduce
  adherence*.
- **Specificity:** "Use 2-space indentation" beats "Format code properly". "Run `npm test` before
  committing" beats "Test your changes".
- **Consistency:** contradictory rules get picked arbitrarily. Review nested files and rules
  periodically.

### `@` imports

```text
See @README for project overview and @package.json for available npm commands.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

- Relative paths resolve against **the file containing the import**, not cwd.
- Recursive, **max depth four hops**.
- **Import parsing skips code spans and fenced blocks** — write `` `@README` `` in backticks to
  mention a path without importing it.
- **Imports do not reduce context.** Imported files load at launch alongside the importer. They help
  organization, not budget. Use path-scoped rules for budget.
- **External imports** — a path in a *project-level* memory file resolving outside the working
  directory — trigger a one-time approval dialog listing the files. Decline and they stay disabled
  permanently. Imports in *user-scope* files load without the dialog.

### `AGENTS.md`

**Claude Code reads `CLAUDE.md`, not `AGENTS.md`.** Two supported bridges:

```markdown
<!-- CLAUDE.md -->
@AGENTS.md

## Claude Code
Use plan mode for changes under `src/billing/`.
```

or a symlink, when you need no Claude-specific content:

```bash
ln -s AGENTS.md CLAUDE.md
```

On **Windows**, symlinks require Administrator or Developer Mode — use the `@AGENTS.md` import there.
Verify either way by running `/context` and confirming `CLAUDE.md` appears under **Memory files**.

`/init` reads Cursor rules (`.cursor/rules/`, `.cursorrules`) and Copilot rules
(`.github/copilot-instructions.md`). With `CLAUDE_CODE_NEW_INIT=1` it also reads `AGENTS.md`,
`.devin/rules/`, `.windsurf/rules/`, `.windsurfrules`, and `.clinerules`, and runs an interactive
multi-phase flow that explores the codebase with a subagent and presents a reviewable proposal before
writing anything. `/import` (v2.1.213+) brings another agent's configuration in wholesale — instruction
files, MCP servers, commands, subagents, and skills.

**LoomWarp note:** this resolves AC-4 of `FeatureLead-FractalRegrounding` — the cross-runtime
portability requirement — with a documented answer and a documented Windows caveat. The symlink
approach works; the divergence protocol (replace the symlink with a real file in the commit that
introduces the deviation) is a LoomWarp convention layered on top, not something the harness enforces.

---

## `.claude/rules/`

Modular instruction files, optionally scoped to file globs.

```text
your-project/
├── .claude/
│   ├── CLAUDE.md
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       └── security.md
```

All `.md` files are discovered **recursively**, so `frontend/` and `backend/` subdirectories work.
Rules **without** `paths` frontmatter load at launch with the same priority as `.claude/CLAUDE.md`.
User-level rules live in `~/.claude/rules/` and load **before** project rules, giving project rules
higher priority.

### Path-scoped rules

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- All API endpoints must include input validation
- Use the standard error response format
```

These load **only when Claude works with matching files** — the primary context-budget tool for a
large repo. Matching triggers when Claude *reads* a matching file, not on every tool use. As of
v2.1.198 it also works through symlinked paths into the project directory.

Brace expansion is supported (`src/**/*.{ts,tsx}`) with a budget: a rule's whole `paths` list shares
**1,000 expanded patterns and 4 MiB**. Patterns exceeding the budget are used unexpanded, and their
literal braces then match nothing. Glob `[` starts a bracket expression — `photos [2024/**` is
invalid and matches nothing (escape it as `photos \[2024/**`); the rule's other patterns keep
working.

### Sharing rules across projects

```bash
ln -s ~/shared-claude-rules       .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```

Symlinks are resolved and loaded normally; circular symlinks are detected and handled.

**Rules vs skills:** rules load every session (or on matching files); skills load only when invoked
or judged relevant. For task-specific instructions that need not be resident, use a skill.

---

## `claudeMdExcludes`

Skip specific CLAUDE.md and rules files by path or glob:

```json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

Patterns match against **absolute** paths — start relative-style patterns with `**/` to match
anywhere. Configurable at any settings layer; **arrays merge across layers**, so a team can set
project defaults while individuals add local overrides. **Managed policy CLAUDE.md files cannot be
excluded.**

The exclusion list is static, not a per-task switch. To focus on one package today and another
tomorrow, start Claude from that package's directory instead.

---

## Auto memory

Claude writes its own notes across sessions — build commands, debugging insights, architecture notes,
style preferences, workflow habits. On by default.

| | CLAUDE.md | Auto memory |
|---|---|---|
| Who writes it | You | Claude |
| Contains | Instructions and rules | Learnings and patterns |
| Scope | Project, user, or org | **Per repository, shared across worktrees** |
| Loaded | Every session | Every session (first 200 lines or 25KB) |

**Storage:** `~/.claude/projects/<project>/memory/`, where `<project>` derives from the git
repository — so all worktrees and subdirectories of one repo share a single memory directory.
Machine-local; not shared across machines or cloud environments.

```text
~/.claude/projects/<project>/memory/
├── MEMORY.md          # concise index, loaded every session
├── debugging.md       # topic file, read on demand
└── api-conventions.md
```

**The limit applies only to `MEMORY.md`**: the first **200 lines or 25KB**, whichever comes first.
Content beyond is dropped on the next load. After a write, Claude Code measures the file and reminds
Claude to shorten it if near a limit, or returns an error telling Claude to rewrite the index if
over. The check measures **only what loads** — YAML frontmatter and block-level HTML comments are
stripped first and do not count (v2.1.211+). Topic files are not loaded at startup; Claude reads them
on demand.

Configuration:

| Key | Effect |
|---|---|
| `autoMemoryEnabled` | Default `true`. Toggle in `/memory` or per project |
| `autoMemoryDirectory` | Custom location; absolute or `~/`-prefixed. From project/local settings, honored **only after workspace trust** — the same gate as hooks |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | Environment override |

When Claude writes a memory file starting with YAML frontmatter, Claude Code records the write time
in a `modified` field as an ISO 8601 timestamp (v2.1.214+) — showing how current the fact is, to you
and to Claude when it reads the memory back. Files without frontmatter never get one added.

**The main conversation's auto memory is not loaded into subagents** — the exception is a fork, which
inherits the parent conversation. A subagent's own auto memory (`memory` field) is a separate
directory.

---

## Monorepos and large codebases

The full guide is `/docs/en/large-codebases`. The settings layer rather than replace each other.

### Where you start Claude determines everything

| Start from | File access | CLAUDE.md at launch | Use when |
|---|---|---|---|
| Repository root | Every file | Root only; subdirectories on demand | Tasks span packages |
| A subdirectory | That subtree until you grant more | That directory's **plus every ancestor's** | Work scoped to one package |

> **Project settings in `.claude/settings.json` load only from your starting directory and are NOT
> inherited from parents the way CLAUDE.md files are.** A root `.claude/settings.json` applies only
> when you start from the root. This is the single most surprising rule in the monorepo guide.

### The recommended layout

```text
monorepo/
  CLAUDE.md                              # repository-wide rules
  .claude/settings.json                  # deny rules for worktree sessions
  packages/
    api/
      CLAUDE.md                          # API-specific conventions
      .claude/settings.json              # worktree, additionalDirectories, deny rules
      .claude/skills/api-testing/SKILL.md
    web/
      CLAUDE.md
      .claude/skills/component-patterns/SKILL.md
    shared/
      CLAUDE.md
```

### Reducing what Claude reads

Content searches already respect `.gitignore`. For **checked-in** paths — vendored SDKs, committed
generated code — use `Read` deny rules:

```json
{
  "permissions": {
    "deny": [
      "Read(./**/dist/**)",
      "Read(./**/build/**)",
      "Read(./**/*.generated.*)",
      "Read(./vendor/**)"
    ]
  }
}
```

These cover built-in file tools and recognized Bash file commands (`cat`, `head`, `grep`, `find`)
when a denied path is an argument. They do **not** filter denied paths out of a recursive search's
output, and do **not** cover arbitrary subprocesses that open files themselves. For OS-level
enforcement, enable the sandbox.

**Code intelligence plugins** replace exhaustive file scans with language-server lookups — often net
context-negative:

```text
/plugin install typescript-lsp@claude-plugins-official
```

### Worktree scoping

```json
{
  "worktree": {
    "sparsePaths": [".claude", "packages/api", "packages/shared"],
    "symlinkDirectories": ["node_modules"]
  }
}
```

`sparsePaths` uses git sparse-checkout to write only the listed directories plus root-level files —
worktrees start faster and use less space. Paths are relative to the **repository root** regardless
of where you start Claude. **List directories, not files.** Root-level *files* (`package.json`,
lock files) are always checked out; root-level *directories* are not — **include `.claude`** if you
want the root's settings, rules, or skills available inside the worktree.

This matters most for **subagent worktree isolation**: each subagent running in a worktree gets a
lightweight checkout instead of the full tree. All worktrees in a session share the same
`sparsePaths`, so list every package any subagent needs.

`symlinkDirectories` symlinks `node_modules/` back to the main repository rather than duplicating it.

Sparse checkout requires git to set `extensions.worktreeConfig` in the shared `.git/config`. Claude
Code removes it after the last worktree is removed, **but only if Claude Code added it** — it never
removes a value you set yourself.

> `sparsePaths` and `symlinkDirectories` are read from your *starting* directory before the worktree
> is created. Afterward the session's working directory is the worktree root, so project settings
> inside the worktree load from the worktree root's `.claude/settings.json`. Put permission rules
> and hooks you need inside worktrees in the **repository root's** settings file.

### Access across packages or repositories

```json
{ "permissions": { "additionalDirectories": ["../shared", "../web"] } }
```

or at runtime: `claude --add-dir ../shared`

| Added with | Loads CLAUDE.md and rules | Loads skills |
|---|---|---|
| `additionalDirectories` setting | **Never** | **Never** |
| `--add-dir` flag or `/add-dir` | Only with `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` | **Yes** |

This asymmetry is deliberate and frequently missed.

### Keeping skills discoverable at scale

Which skills are in scope depends on where you start:

- **From a subdirectory:** that directory, every parent to the repo root, plus user and enterprise.
- **From the repository root:** root skills plus every subdirectory Claude touches during the
  session — **which can accumulate into the hundreds**.
- **After `--add-dir`:** that sibling's skills too.

Names always load, but **descriptions are shortened when there are many**, which can strip the
keywords Claude matches on. Keep descriptions short and lead with words a real request would contain.
Shared skills belong in the repository root's `.claude/skills/`, or in a plugin when they need their
own version history or must work across repositories.

To find unused skills: enable the OTel logs exporter with `OTEL_LOG_TOOL_DETAILS=1` so skill names
are recorded verbatim, then read the `skill_activated` event's `skill.name` and `invocation_trigger`
attributes.

### When layering stops scaling

The documented escalation, in order: move conventions out of always-loaded CLAUDE.md into **skills**
(on demand), then **plugins** (versioned, centrally owned), then **MCP servers** (if you already run
a code search or RAG index, expose it as a tool so Claude queries it instead of reading files).

A `SessionStart` hook can print a plugin recommendation for the launch directory — anything the hook
prints to stdout is added to Claude's context before the first prompt.

### Keeping CLAUDE.md current

- Review CLAUDE.md edits in pull requests like any documentation change.
- **Revisit after major model releases** — an instruction working around an older model's limitation
  becomes pure overhead once a newer model handles the case.
- A `Stop` hook receives the session transcript path, so a script can review the session and propose
  CLAUDE.md updates while the gap it exposed is fresh.
- `/doctor` proposes trims for a checked-in CLAUDE.md (v2.1.206+): it cuts content Claude can derive
  from the codebase — directory layouts, dependency lists, architecture overviews — and keeps
  pitfalls, rationale, and conventions that differ from tool defaults.

---

## What survives compaction

**Project-root CLAUDE.md survives**: after `/compact`, Claude re-reads it from disk and re-injects
it. **Nested CLAUDE.md files and `paths:`-scoped rules are not re-injected** — they reload the next
time Claude reads a matching file. An instruction that disappeared after compaction was either
conversation-only, in a nested file, or in a path-scoped rule that has not re-matched.

Invoked **skills** are carried forward within a token budget: the most recent invocation of each is
re-attached after the summary, keeping the **first 5,000 tokens** of each within a shared
**25,000-token** budget filled most-recent-first.

---

## Debugging

| Symptom | Check |
|---|---|
| Instructions not followed | `/context` → **Memory files**. If a file is missing there, Claude cannot see it |
| Don't know what loaded, when, or why | The **`InstructionsLoaded` hook** — the documented tool for exactly this |
| Don't know what auto memory saved | `/memory` → open the auto memory folder. Plain markdown |
| CLAUDE.md too large | Path-scoped rules; `/doctor` trim proposals |
| Config not taking effect | `/doctor`, and `/docs/en/debug-your-config` |

---

## LoomWarp notes

- **`InstructionsLoaded` is the primitive LoomWarp's E2 element has been missing.** It fires with a
  matcher of `session_start`, `nested_traversal`, or `compact`, reporting which instruction files
  loaded and why. A hook on this event emitting a hashed, timestamped record is the shortest path
  from "the bundle resolver is a spike, not wired into dispatch" (GAP-05/GAP-06) to a real per-run
  context manifest. **What it does not give you is content hashing, version pinning, or owner
  attribution** — those remain LoomWarp's to add, and they are the differentiating part.
- **The monorepo guide is the native description of LoomWarp's "virtual monorepo" pattern (E1).**
  Per-directory CLAUDE.md, per-package skills, `additionalDirectories`, `worktree.sparsePaths`, and
  `claudeMdExcludes` cover most of what `registry/repositories.yaml` was going to resolve. The
  registry's remaining unique value is **routing and impact analysis across repos**, which the native
  layer genuinely does not do.
- **"Project settings load only from your starting directory"** is a hard constraint on any
  control-repo design that assumes settings inherit downward. They do not. Anything that must apply
  in a worktree has to be in the repository root's settings file.
- **`autoMemoryDirectory` from project settings requires workspace trust** — the same gate as hooks.
  Worth knowing if LoomWarp ever wants agent memory checked into the repo.
