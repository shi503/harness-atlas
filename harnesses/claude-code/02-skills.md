---
status: DRAFT
title: "Skills — full reference"
tier: reference
project: loomwarp
source: "https://code.claude.com/docs/en/skills"
source_verified: "2026-08-10"
---

# Skills — full reference

A skill is a `SKILL.md` file containing instructions, knowledge, or a workflow. You invoke it with
`/skill-name`, or Claude loads it automatically when the description matches your task.

**Custom commands have been merged into skills.** `.claude/commands/deploy.md` and
`.claude/skills/deploy/SKILL.md` both create `/deploy` and behave the same way. Existing
`commands/` files keep working; skills add a directory for supporting files, frontmatter for
invocation control, and automatic model invocation. If a skill and a command share a name, **the
skill wins**.

Claude Code skills follow the [Agent Skills](https://agentskills.io) open standard and extend it.
See [Portability](#portability-outside-claude-code) — this matters if you plan to distribute.

---

## Where skills live

| Location | Path | Applies to |
|---|---|---|
| Enterprise | Managed settings directory | All users in the organization |
| Personal | `~/.claude/skills/<name>/SKILL.md` | All your projects |
| Project | `.claude/skills/<name>/SKILL.md` | This project |
| Plugin | `<plugin>/skills/<name>/SKILL.md` | Wherever the plugin is enabled |

**Precedence: enterprise > personal > project.** Note that *personal beats project* — the opposite
of subagents. Any level overrides a bundled skill of the same name. Plugin skills are namespaced
`plugin-name:skill-name` and cannot collide.

### Discovery rules

- **Upward**: project skills load from `.claude/skills/` in the launch directory and every parent up
  to the repo root.
- **Downward, lazily**: skills in nested `.claude/skills/` below the launch directory load the first
  time Claude reads or edits a file in that subtree, then stay available. Until then they do not
  appear in autocomplete and cannot be invoked.
- **`--add-dir`**: `.claude/skills/` inside an added directory **is** loaded — skills are the
  documented exception to `--add-dir` granting file access only. The `permissions.additionalDirectories`
  *setting* grants file access and does **not** load skills.
- **Symlinks**: a `<skill-name>` entry can be a symlink to a directory elsewhere; Claude follows it
  and deduplicates if the same target is reachable from more than one location.
- **Live change detection**: edits to `SKILL.md` under watched directories are picked up mid-session
  with no restart. Creating a *top-level skills directory that did not exist at session start*
  requires a restart. For skill folders that are also plugins, changes to `hooks/`, `.mcp.json`,
  `agents/`, and `output-styles/` need `/reload-plugins`.

### Name collisions in nested directories

With `deploy` at the project root and another at `apps/web/.claude/skills/`:

- The nested one appears as `/apps/web:deploy`, with a description naming its directory.
- `/deploy` runs the root skill — and Claude Code appends the list of directory-qualified variants
  to its content with an instruction to also invoke any whose directory holds the files in play
  (v2.1.203+).

---

## Frontmatter reference

All fields are optional; only `description` is recommended. Booleans accept `yes/no/on/off/1/0` in
any case as well as `true/false` (v2.1.218+).

| Field | Description |
|---|---|
| `name` | Display name in listings. Defaults to the directory name. **In a plugin skill it sets the last segment of the command**; in a personal/project skill it is display-only — the command still comes from the directory name |
| `description` | What the skill does and when to use it. Claude matches against this. Combined with `when_to_use`, truncated at **1,536 characters** in the listing |
| `when_to_use` | Extra trigger phrases or example requests. Appended to `description`; counts toward the 1,536 cap |
| `argument-hint` | Autocomplete hint, e.g. `[issue-number]` or `[filename] [format]` |
| `arguments` | Named positional arguments for `$name` substitution. Space-separated string or YAML list; names map to positions in order |
| `disable-model-invocation` | `true` = only you can invoke it. Removes it from Claude's context entirely. Also prevents preloading into subagents and prevents a scheduled task firing it (v2.1.196+). Default `false` |
| `user-invocable` | `false` = hidden from the `/` menu; only Claude invokes it. Default `true` |
| `allowed-tools` | Tools pre-approved **for the turn that invokes the skill**. Grant clears on your next message. Does not restrict — every tool stays callable |
| `disallowed-tools` | Tools removed from the pool while the skill is active. Clears on your next message. Cannot remove `EndConversation` while any other tool remains |
| `model` | Model while this skill is active, for the rest of the current turn. Same values as `/model`, or `inherit`. With `context: fork`, sets the *forked subagent's* model |
| `effort` | `low` \| `medium` \| `high` \| `xhigh` \| `max`. Overrides session effort |
| `context` | `fork` — run in a forked subagent context |
| `agent` | Which subagent type to use when `context: fork` is set. Defaults to `general-purpose` |
| `background` | Only with `context: fork`. `false` = wait for the result in the invoking turn. Default `true` (v2.1.218+) |
| `hooks` | Hooks scoped to this skill's lifecycle. Same format as `settings.json` |
| `paths` | Glob patterns limiting automatic activation. Same format as path-specific rules |
| `shell` | `bash` (default) or `powershell` for `` !`cmd` `` and ` ```! ` blocks |
| `metadata` | Free-form YAML map for your own tooling. Claude Code does not act on it; drops non-map values |
| `license` | Agent Skills spec field. Accepted, not acted on |
| `compatibility` | Agent Skills spec field, string ≤500 chars. Accepted, not acted on |

**LoomWarp note:** `metadata` is the hook for capability provenance. It is a documented, ignored-by-
the-harness key-value map read by your own tooling — exactly the right place to carry
`owner`, `source_sha`, `version`, and `risk_tier` on a distributed skill.

### Invocation control matrix

| Frontmatter | You invoke | Claude invokes | Context |
|---|---|---|---|
| (default) | Yes | Yes | Description always in context; body on invoke |
| `disable-model-invocation: true` | Yes | No | Description **not** in context; body on invoke |
| `user-invocable: false` | No | Yes | Description always in context; body on invoke |

Use `disable-model-invocation: true` for anything with side effects — `/commit`, `/deploy`,
`/send-slack-message`. If Claude tries anyway, Claude Code blocks the call and instructs it not to
reproduce the steps another way.

---

## String substitutions

| Variable | Expands to |
|---|---|
| `$ARGUMENTS` | All arguments as typed. If absent from the body, arguments are appended as `ARGUMENTS: <value>` |
| `$ARGUMENTS[N]` | Argument by 0-based index |
| `$N` | Shorthand for `$ARGUMENTS[N]` |
| `$name` | Named argument declared in the `arguments` frontmatter list |
| `${CLAUDE_SESSION_ID}` | Current session ID — useful for logging and correlating output with sessions |
| `${CLAUDE_EFFORT}` | `low` \| `medium` \| `high` \| `xhigh` \| `max`. Ultracode reports as `xhigh` |
| `${CLAUDE_SKILL_DIR}` | Directory containing this `SKILL.md`. For plugin skills, the skill's subdirectory, not the plugin root |
| `${CLAUDE_PROJECT_DIR}` | Project root — same value hooks and MCP servers receive (v2.1.196+) |

`${CLAUDE_SKILL_DIR}` and `${CLAUDE_PROJECT_DIR}` are substituted in **both** the body **and** Bash
rules in `allowed-tools`. That pairing is the documented way to run a bundled script without a
permission prompt:

```yaml
---
name: render-chart
description: Render a chart from a CSV file
allowed-tools: Bash(${CLAUDE_SKILL_DIR}/scripts/render.sh *)
---

Run `${CLAUDE_SKILL_DIR}/scripts/render.sh <csv-file>` to render the chart.
```

Indexed arguments use shell-style quoting: `/my-skill "hello world" second` → `$0` = `hello world`,
`$1` = `second`. An indexed placeholder with no argument stays literal; a *named* placeholder with no
argument expands to empty. Escape a literal `$` before a digit or name with a backslash: `\$1.00`.

### Stacking

Several skills can be stacked at the start of one message: `/write-tests /fix-issue 123` loads both
and passes `123` to each (v2.1.199+). Claude Code expands the first skill plus up to **five** more.
Expansion stops at the first token that is not an inline user-invocable skill — a forked skill such
as `/code-review`, or one whose arguments may themselves start with a slash such as `/loop`, ends
the run there and everything after becomes argument text.

---

## Progressive disclosure — supporting files

```text
my-skill/
├── SKILL.md          # required — overview and navigation
├── reference.md      # detailed API docs, loaded when needed
├── examples.md       # usage examples, loaded when needed
└── scripts/
    └── helper.py     # executed, not loaded into context
```

Reference supporting files from `SKILL.md` so Claude knows what each contains and when to load it.
**Keep `SKILL.md` under 500 lines**; move detail into siblings.

---

## Dynamic context injection

`` !`<command>` `` runs a shell command **before** the skill content reaches Claude, and the output
replaces the placeholder. This is preprocessing — Claude never sees the command, only the result.

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

Mechanics and limits:

- Substitution runs **once** over the original file. Command output is inserted as plain text and is
  not re-scanned, so a command cannot emit a placeholder for a later pass.
- The inline form is only recognized when `!` starts a line or follows whitespace. `` KEY=!`cmd` ``
  is left literal.
- For multi-line commands use a fenced block opened with ` ```! `.
- **Policy control:** `"disableSkillShellExecution": true` in settings replaces each command with
  `[shell command execution disabled by policy]`. It affects user, project, plugin, and
  additional-directory sources; **bundled and managed skills are exempt**. Most useful in managed
  settings, where users cannot override it.

Including the word `ultrathink` anywhere in a skill body requests deeper reasoning for that run.

---

## Running a skill in a subagent — `context: fork`

`context: fork` makes the skill content the *prompt* that drives a subagent. It does not inherit
your conversation history.

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:
1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

The fork runs in the **background** by default; set `background: false` to block the invoking turn.
Claude Code waits regardless in these cases:

- Non-interactive mode (`-p` or the Agent SDK)
- `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS=1`
- An earlier invocation of the same skill is still running
- A scheduled task fired the skill as its prompt

Two sharp edges:

- A **backgrounded** fork runs with the narrower background-subagent tool set. If your steps need a
  tool outside that set, use `background: false`.
- A backgrounded fork's edits land **outside your session's checkpoints**, so `/rewind` will not undo
  them. Use git.

`context: fork` only makes sense for skills with an explicit task. A skill of guidelines with no
action gives the subagent nothing to do.

### The two directions, compared

| Approach | System prompt | Task | Also loads |
|---|---|---|---|
| Skill with `context: fork` | From the agent type | `SKILL.md` content | CLAUDE.md, except for `Explore`/`Plan` |
| Subagent with `skills:` field | The subagent's markdown body | Claude's delegation message | Preloaded skills + CLAUDE.md |

---

## Restricting skill access

Three mechanisms, in increasing order of authority:

**1. Permission rules** (`/permissions` or settings):
```text
Skill(commit)        # exact match
Skill(review-pr *)   # prefix match with any arguments
Skill(deploy *)      # in deny: blocks it
Skill                # in deny: disables all skills
```

**2. Frontmatter** — `disable-model-invocation: true` removes the skill from Claude's context.

**3. `skillOverrides` in settings** — controls visibility without editing a skill you don't own.
The `/skills` menu writes it for you (Space cycles states, Enter saves to
`.claude/settings.local.json`).

| Value | Listed to Claude | In `/` menu |
|---|---|---|
| `"on"` (default when absent) | Name and description | Yes |
| `"name-only"` | Name only | Yes |
| `"user-invocable-only"` | Hidden | Yes |
| `"off"` | Hidden | Hidden |

```json
{ "skillOverrides": { "legacy-context": "name-only", "deploy": "off" } }
```

As of v2.1.199, `"off"` also hides the skill from Remote Control clients and Agent SDK callers, not
just the terminal menu. **Plugin skills are not affected by `skillOverrides`** — manage those via
`/plugin`.

---

## Bundled skills

Claude Code ships prompt-based skills available in every session: `/doctor`, `/code-review`,
`/batch`, `/debug`, `/loop`, `/claude-api`, `/run`, `/verify`, `/run-skill-generator`,
`/deep-research`, `/security-review`, `/init`.

- `/verify` and `/code-review` run **only when you invoke them** (v2.1.215+); Claude cannot start
  them on its own. `/code-review` runs as a forked subagent from v2.1.218.
- Disable them all with `disableBundledSkills` — except `/doctor`, which stays typable (v2.1.205+).
  Hide `/doctor` with `DISABLE_DOCTOR_COMMAND` or `skillOverrides: {"doctor": "off"}`.

**`/run-skill-generator` is worth knowing about.** It gets your app running from a clean environment,
captures what worked (install commands, env vars, launch script), and commits it as
`.claude/skills/run-<name>/`. After that, `/run`, `/verify`, and any other agent in the repo follow
the recorded recipe. `/verify` can also record its own at `.claude/skills/verify/SKILL.md`
(v2.1.200+), and only edits it when a run was actually steered wrong — so the file is commit-safe
without per-session diffs (v2.1.205+).

---

## Evaluating a skill

The docs are unusually direct here, and it is a point LoomWarp's evaluation doctrine should absorb:

> Seeing a skill trigger tells you Claude found it, not that it did what you intended.

Measure two things **separately**: whether Claude invokes it on the prompts it should, and whether
the output is right when it does. The check for both is a baseline comparison — run realistic
prompts in a fresh session with the skill available and again with it disabled, and compare. A fresh
session matters, because leftover context from authoring the skill masks gaps in the written
instructions.

### The `skill-creator` plugin

```text
/plugin install skill-creator@claude-plugins-official
```

It automates the loop inside Claude Code:

| Capability | Artifact |
|---|---|
| Test cases — prompts, input files, expected behavior | `evals/evals.json` in the skill directory |
| Isolated runs — one subagent per case, clean context, token count and duration recorded | — |
| Grading — each assertion checked, pass/fail with evidence | `grading.json` |
| Benchmark — pass rate, time, tokens for with-skill vs without | `benchmark.json` |
| Version comparison — blind A/B between two skill versions | — |
| Description tuning — generates should-trigger and should-not-trigger prompts, measures hit rate, proposes description edits | — |
| Review viewer — HTML report with qualitative feedback the next iteration reads | — |

**LoomWarp note:** this is a working, shipped implementation of the agent-work evaluation loop that
`standards/evaluation-doctrine.md` describes and that LoomWarp's E7 element lists as DESIGNED ONLY.
The eval pyramid it implements — isolated runs → assertion grading → aggregate benchmark → blind A/B
— is the same shape. Adopting it for LoomWarp's own distributed skills is strictly cheaper than
building it, and it produces exactly the corpus of evaluated outcomes E7 says it needs.

---

## Portability outside Claude Code

Claude Code accepts every field above. Other distribution paths do not.

| Distribution path | Allowed frontmatter |
|---|---|
| Claude Code skills at any level, including plugin skills | Every field |
| claude.ai uploads, the Skills API, `package_skill.py` from `anthropics/skills` | `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools` |

Including a disallowed field is a **hard error**, not a silently-ignored field:

```
Unexpected key(s) in SKILL.md frontmatter: argument-hint. Allowed properties are:
allowed-tools, compatibility, description, license, metadata, name
```

Claude Code-only *body* features — dynamic context injection above all — do not function in
claude.ai chat or through the API.

**LoomWarp note:** if LoomWarp ever wants its skills usable outside Claude Code, the six-field subset
is the compatibility contract, and `metadata` is the only structured extension point inside it. A
skill written to those six fields loads unchanged in Claude Code. That is a cheap constraint to
adopt now and an expensive one to retrofit.

---

## Skills in Cowork and cloud sessions

Cowork and cloud sessions — including **routines** — do **not** read `~/.claude/skills/` on your
machine. A personal-only skill reports as not found when a routine invokes it, because each routine
run is a fresh remote session.

- Cowork and cloud: enable the skill for your claude.ai account.
- Cloud only: commit it to the repo's `.claude/skills/`, or ship it in a plugin declared in the
  repo's `.claude/settings.json` — repo-declared plugins install at session start; plugins enabled
  only in user settings do not transfer.
- Desktop scheduled tasks run locally and load skills like any local session.
