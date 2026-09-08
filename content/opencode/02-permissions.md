---
status: DRAFT
title: "Permissions — the allow/ask/deny ladder"
tier: reference
project: harness-atlas
source: "https://opencode.ai/docs/permissions · https://opencode.ai/docs/agents#permissions · https://opencode.ai/config.json"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# Permissions — the `allow`/`ask`/`deny` ladder

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `opencode.ai/docs` and `anomalyco/opencode` at **v1.18.29**, **2026-09-08**.

> *"OpenCode uses the `permission` config to decide whether a given action should run automatically,
> prompt you, or be blocked."*

**A permission is a rule about a tool call, keyed by tool name and matched against that tool's own
input.** Not a filesystem boundary and not a process sandbox: the pattern in a `bash` rule is matched
against *"parsed commands like `git status --porcelain`"*, the pattern in an `edit` rule against the
file path, the pattern in a `skill` rule against the skill name. What a rule can express is therefore
bounded by what the tool passes in.

---

## 1. The three actions

| Action | Meaning, verbatim |
|---|---|
| `"allow"` | *"run without approval"* |
| `"ask"` | *"prompt for approval"* |
| `"deny"` | *"block the action"* |

---

## 2. The key inventory, reconciled across three sources

The three published inventories do not agree, so all three are given.

**`/docs/permissions#available-permissions` lists thirteen**, *"keyed by tool name, plus a couple of
safety guards"*. **`/docs/agents#permissions` lists fifteen** in a table of key → *"Tools it gates"*.
**The published `config.json` schema names the same fifteen** as properties of `PermissionConfig`.

| Key | Gates (agents page wording) | On the permissions page | Accepts an object |
|---|---|:-:|:-:|
| `read` | `read` | yes | yes |
| `edit` | `write`, `edit`, `apply_patch` | yes | yes |
| `glob` | `glob` | yes | yes |
| `grep` | `grep` | yes | yes |
| `list` | `list` | **no** | yes |
| `bash` | `bash` | yes | yes |
| `task` | `task` | yes | yes |
| `external_directory` | *"Any tool that reads or writes files outside the project worktree"* | yes | yes |
| `lsp` | `lsp` | yes — *"currently non-granular"* | yes, per the schema |
| `skill` | `skill` | yes | yes |
| `todowrite` | `todowrite`, `todoread` | **no** | no |
| `question` | `question` | yes | no |
| `webfetch` | `webfetch` | yes | no |
| `websearch` | `websearch` | yes | no |
| `doom_loop` | *"Recovery prompts when an agent appears stuck"* | yes — *"triggered when the same tool call repeats 3 times with identical input"* | no |

**The fifteen are not a closed set.** `PermissionConfig` carries
`"additionalProperties": {"$ref": "#/$defs/PermissionRuleConfig"}`, and *"Permission keys are matched
as wildcard patterns against the underlying tool name, so the same syntax works for built-ins, custom
tools, and MCP tools."* `"mymcp_*": "deny"` and `"mymcp_search": "ask"` are the documented examples.

**One key disagrees with itself.** The permissions page calls `lsp` *"currently non-granular"*; the
schema types it as `PermissionRuleConfig`, which admits the object form.

---

## 3. Pattern matching

*"Permission patterns use simple wildcard matching"*: `*` matches zero or more characters, `?`
matches exactly one, *"All other characters match literally."* There is no regex form.

**`~` and `$HOME`** expand at the start of a pattern — `~/projects/*` becomes
`/Users/username/projects/*`. Expansion is textual only: *"It does not make an external path part of
the current workspace, so paths outside the working directory must still be allowed via
`external_directory`."*

**Rules are evaluated by pattern match, with the last matching rule winning.** *"A common pattern is
to put the catch-all `"*"` rule first, and more specific rules after it."* This is the reverse of a
first-match system, and the docs repeat the warning on the agents page.

**A single string replaces the whole object** — `"permission": "allow"` sets everything at once.

---

## 4. Defaults

> *"If you don't specify anything, OpenCode starts from permissive defaults."*

- Most permissions default to `"allow"`.
- `doom_loop` and `external_directory` default to `"ask"`.
- `read` is `"allow"` with an env carve-out shipped as rules, not as a special case:

```json
{ "permission": { "read": {
  "*": "allow", "*.env": "deny", "*.env.*": "deny", "*.env.example": "allow"
} } }
```

The fourth rule re-allows `*.env.example` because it would otherwise be caught by `*.env.*` — the
worked example of last-match-wins in the shipped defaults.

**`external_directory` allowances inherit workspace defaults.** *"Any directory allowed here inherits
the same defaults as the current workspace. Since `read` defaults to `allow`, reads are also allowed
for entries under `external_directory` unless overridden."* Narrowing a granted external path
requires a second rule on the specific tool.

**Two vendor sources disagree on the `plan` agent's defaults.** `/docs/agents#use-plan` says *"By
default, all of the following are set to `ask`"* — file edits and bash. The repository `README.md`
says plan *"Denies file edits by default"* and *"Asks permission before running bash commands"*.
Recorded as read at v1.18.29; not adjudicated here.

---

## 5. Auto mode, and what survives it

`opencode --auto`, and `opencode run --auto`, *"automatically approve permission requests that are
not explicitly denied."*

> *"Explicit `"deny"` rules are still enforced. Auto mode only changes requests that would otherwise
> ask for approval."*

Auto mode is also a runtime toggle: the TUI command palette carries **Enable auto-approve
permissions** / **Disable auto-approve permissions**, and *"the prompt displays a muted `auto`
indicator next to the current agent"* while it is on.

**What `ask` offers when it fires** — three outcomes:

| Outcome | Scope |
|---|---|
| `once` | this request |
| `always` | *"approve future requests matching the suggested patterns (for the rest of the current OpenCode session)"* |
| `reject` | deny the request |

*"The set of patterns that `always` would approve is provided by the tool"* — for `bash`, *"a safe
command prefix like `git status*`"*. An `always` never reaches disk and never outlives the session.

---

## 6. Per-agent overrides

*"Agent permissions are merged with the global config, and agent rules take precedence."* The
override may be written in JSON under `agent.<name>.permission` or in an agent Markdown file's
frontmatter under `permission:`. Both accept the same shorthand-or-object shape as the global block.

**`permission.task` gates delegation**, matched against the subagent type. *"When set to `deny`, the
subagent is removed from the Task tool description entirely, so the model won't attempt to invoke
it"* — a denied subagent is withheld from the model rather than refused at call time.

**And it has an explicit carve-out**: *"Users can always invoke any subagent directly via the `@`
autocomplete menu, even if the agent's task permissions would deny it."* `permission.task` binds the
model, not the operator.

**References are auto-allowed through the boundary.** *"OpenCode automatically allows reference
directories through its external-directory permission boundary. Normal tool permissions still apply;
for example, an agent that cannot edit files does not gain edit access because a directory is
configured as a reference."*

---

## 7. What else can change a decision

**The legacy `tools` block.** *"As of `v1.1.1`, the legacy `tools` boolean config is deprecated and
has been merged into `permission`."* In `config.ts` the conversion is
`result.permission = mergeDeep(perms, result.permission ?? {})` — `tools` entries become
`allow`/`deny` actions, `write`/`edit`/`patch` all collapse onto `edit`, and an explicit `permission`
rule wins over the converted value. On the agents page, `tools` is *"**deprecated**. Prefer the
agent's `permission` field."*

**A plugin hook.** `"permission.ask"` receives the `Permission` and an output of
`{ status: "ask" | "deny" | "allow" }`, so a plugin can decide a request the config left as `ask`.
`"tool.execute.before"` can also block by throwing. See [`07`](./07-plugins-hooks-and-events.md).

**An environment variable.** `OPENCODE_PERMISSION` merges an inline JSON permission block after the
rest of the chain has resolved — see [`01`](./01-config-and-rules.md) §4.

**A denied call need not end the turn.** `experimental.continue_loop_on_deny` is described in the
schema as *"Continue the agent loop when a tool call is denied"*. It appears in no documentation page
— checked `/docs/permissions/`, `/docs/config/` and `/docs/tools/`.

---

## 8. Where the ladder stops

**No sandbox or OS-level isolation is documented.** Checked `/docs/permissions/`, `/docs/tools/`,
`/docs/config/`, `/docs/enterprise/` and `/docs/network/`. Every control on this page is the harness
deciding about its own tool calls before it runs them; nothing described here is enforced by the
operating system, and the documentation states no threat model for the ladder — checked the same five
pages. Recorded as an absence in what was read.

**Two adjacent controls are documented elsewhere**, and neither is a permission:
`experimental.policies` governs whether a *resource* — currently an LLM provider — may be used at all
([`03`](./03-policies.md)), and `tools.<name>: false` removes a tool from the registry
([`05`](./05-the-tool-registry.md)).
