---
status: DRAFT
title: "Skills and commands"
tier: reference
project: harness-atlas
source: "https://opencode.ai/docs/skills · https://opencode.ai/docs/commands · anomalyco/opencode packages/core/src/plugin/skill.ts"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# Skills and commands

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `opencode.ai/docs` and `anomalyco/opencode` at **v1.18.29**, **2026-09-08**.

Two Markdown-authored surfaces with opposite triggers. **A skill is chosen by the model**, from a
list of names and descriptions it is shown. **A command is typed by the operator**, as `/name`. The
two never overlap: nothing lets the model invoke a command, and nothing lets the operator load a
skill directly.

---

## 1. Skills

> *"Agent skills let OpenCode discover reusable instructions from your repo or home directory.
> Skills are loaded on-demand via the native `skill` tool — agents see available skills and can load
> the full content when needed."*

### Six discovery roots

*"Create one folder per skill name and put a `SKILL.md` inside it."*

| Scope | Path |
|---|---|
| Project config | `.opencode/skills/<name>/SKILL.md` |
| Global config | `~/.config/opencode/skills/<name>/SKILL.md` |
| Project, Claude-compatible | `.claude/skills/<name>/SKILL.md` |
| Global, Claude-compatible | `~/.claude/skills/<name>/SKILL.md` |
| Project, agent-compatible | `.agents/skills/<name>/SKILL.md` |
| Global, agent-compatible | `~/.agents/skills/<name>/SKILL.md` |

*"For project-local paths, OpenCode walks up from your current working directory until it reaches the
git worktree."* Every match along the way is loaded, from all three project roots.

`OPENCODE_DISABLE_CLAUDE_CODE_SKILLS` disables the `.claude/skills` roots; `OPENCODE_DISABLE_CLAUDE_CODE`
disables them along with the rest of `.claude` support.

**Two more roots are configurable and undocumented on this page.** The published schema carries a
`skills` object with `paths` — *"Additional paths to skill folders"* — and `urls` — *"URLs to fetch
skills from (e.g., `https://example.com/.well-known/skills/`)"*. Neither appears on `/docs/skills/`
or `/docs/config/`; checked both.

### Frontmatter

*"Each `SKILL.md` must start with YAML frontmatter. Only these fields are recognized"* — `name`
(required), `description` (required), `license`, `compatibility`, `metadata` (a string-to-string
map). *"Unknown frontmatter fields are ignored."*

`name` must *"Be 1–64 characters"*, lowercase alphanumeric with single hyphen separators, must not
start or end with `-`, must not contain `--`, and must *"Match the directory name that contains
`SKILL.md`"*. Given as `^[a-z0-9]+(-[a-z0-9]+)*$`. `description` must be **1–1024 characters**.

### How the model sees them

The `skill` tool's description carries the inventory:

```xml
<available_skills>
  <skill>
    <name>git-release</name>
    <description>Create consistent releases and changelogs</description>
  </skill>
</available_skills>
```

and the model loads one with `skill({ name: "git-release" })`. **The description is the whole
selection surface** — nothing else about a skill reaches the model until it is loaded.

### Gating

`permission.skill` takes glob patterns, with the standard three actions:

| Permission | Behaviour, verbatim |
|---|---|
| `allow` | *"Skill loads immediately"* |
| `deny` | *"Skill hidden from agent, access rejected"* |
| `ask` | *"User prompted for approval before loading"* |

Per-agent overrides go in agent frontmatter or under `agent.<name>.permission.skill`.
`tools: { skill: false }` disables the surface outright, and *"When disabled, the
`<available_skills>` section is omitted entirely."*

### One skill ships in the binary

`packages/core/src/plugin/skill.ts` registers an **embedded** skill named `customize-opencode`, at
the synthetic location `/builtin/customize-opencode.md`, whose description begins *"Use ONLY when the
user is editing or creating opencode's own configuration"*. It is delivered as a default plugin, so
`OPENCODE_DISABLE_DEFAULT_PLUGINS` and `--pure` are what remove it. It is named on no documentation
page — checked `/docs/skills/`, `/docs/plugins/` and `/docs/cli/`.

### Troubleshooting, as the vendor states it

*"Verify `SKILL.md` is spelled in all caps"* · frontmatter carries `name` and `description` ·
*"Ensure skill names are unique across all locations"* · *"skills with `deny` are hidden from
agents."*

---

## 2. Commands

*"Create markdown files in the `commands/` directory"* — `.opencode/commands/<name>.md` or
`~/.config/opencode/commands/`, or a `command.<name>` object in `opencode.json`. *"Use the command by
typing `/` followed by the command name."*

### Options

| Key | Required | Behaviour |
|---|:-:|---|
| `template` | **yes** in JSON | The prompt. In a Markdown command the body is the template |
| `description` | | Shown in the command list |
| `agent` | | Which agent runs it |
| `model` | | *"override the default model for this command"* |
| `subtask` | | *"force the command to trigger a subagent invocation… even if `mode` is set to `primary` on the agent configuration"* — *"useful if you want the command to not pollute your primary context"* |

### Template syntax

Three substitutions, all resolved before the prompt is sent:

| Form | Behaviour |
|---|---|
| `$ARGUMENTS` | everything after the command name |
| `$1`, `$2`, `$3`, … | positional arguments |
| `` !`command` `` | *"inject bash command output into your prompt"*. *"Commands run in your project's root directory and their output becomes part of the prompt"* |
| `@path/to/file` | *"The file content gets included in the prompt automatically"* |

**The shell form runs at expansion time**, before the model sees anything — it is the operator's
shell, not a tool call, and so it is not matched against a `bash` permission rule. No page states
otherwise; checked `/docs/commands/`, `/docs/permissions/` and `/docs/tui/`.

### Built-ins, and overriding them

*"opencode includes several built-in commands like `/init`, `/undo`, `/redo`, `/share`, `/help`"*.
*"Custom commands can override built-in commands. If you define a custom command with the same name,
it will override the built-in command."*
