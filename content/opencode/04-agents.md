---
status: DRAFT
title: "Agents — primaries, subagents and the option set"
tier: reference
project: harness-atlas
source: "https://opencode.ai/docs/agents · https://opencode.ai/docs/config#agents · https://opencode.ai/config.json"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# Agents — primaries, subagents and the option set

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `opencode.ai/docs` at **v1.18.29**, **2026-09-08**.

> *"Agents are specialized AI assistants that can be configured for specific tasks and workflows.
> They allow you to create focused tools with custom prompts, models, and tool access."*

**An agent is a named configuration overlay with a system prompt attached.** It is not a separate
process and not a separate session store: what distinguishes one agent from another is its model, its
prompt, its permission block and whether the operator or the model may select it.

---

## 1. Two types, and the selector

> *"There are two types of agents in OpenCode; primary agents and subagents."*

**Primary agents** are *"the main assistants you interact with directly"*, cycled with **Tab** or the
`switch_agent` keybind. **Subagents** are *"specialized assistants that primary agents can invoke for
specific tasks"*, also invocable *"by @ mentioning them in your messages."*

`mode` is the field that decides which: `primary`, `subagent`, or `all`. *"If no `mode` is specified,
it defaults to `all`."*

**Subagent work opens child sessions**, navigated by keybind: `session_child_first`
(**\<Leader>+Down**) to enter the first child, `session_child_cycle` (**Right**) and
`session_child_cycle_reverse` (**Left**) between children, `session_parent` (**Up**) to return.

---

## 2. The built-ins

| Name | Mode | Description, verbatim |
|---|---|---|
| **build** | `primary` | *"the **default** primary agent with all tools enabled"* |
| **plan** | `primary` | *"A restricted agent designed for planning and analysis"* — see [`02`](./02-permissions.md) §4 for the two vendor sources' differing accounts of its defaults |
| **general** | `subagent` | *"researching complex questions and executing multi-step tasks. Has full tool access (except todo)"* |
| **explore** | `subagent` | *"A fast, read-only agent for exploring codebases. Cannot modify files."* |
| **scout** | `subagent` | *"A read-only agent for external docs and dependency research"* — *"clone a dependency repository into OpenCode's managed cache, inspect library source"* |
| **compaction** | `primary` | *"Hidden system agent that compacts long context into a smaller summary"* |
| **title** | `primary` | *"Hidden system agent that generates short session titles"* |
| **summary** | `primary` | *"Hidden system agent that creates session summaries"* |

The last three are *"not selectable in the UI"* and run automatically.

**Scout is behind a flag.** `OPENCODE_EXPERIMENTAL_SCOUT` appears in the CLI reference's experimental
environment table as *"Enable Scout subagent"*, while the agents page lists Scout among the
built-ins without qualification. Both recorded as read.

---

## 3. The two authoring forms

**JSON**, under `agent.<name>` in `opencode.json`. **Markdown**, in `~/.config/opencode/agents/` or
`.opencode/agents/`, where *"The markdown file name becomes the agent name"* and the body is the
system prompt. The frontmatter takes the same keys as the JSON form.

`opencode agent create` runs a wizard that asks scope and description, *"Generate an appropriate
system prompt and identifier"*, and *"Let you select which permissions the agent should be allowed
(anything you don't select is denied)."*

---

## 4. Every option

| Key | Required | Behaviour |
|---|:-:|---|
| `description` | **yes** | *"a brief description of what the agent does and when to use it"* — also what a primary agent selects a subagent on |
| `mode` | | `primary` · `subagent` · `all` (default `all`) |
| `model` | | `provider/model-id`. Unset: primaries use the global model, *"while subagents will use the model of the primary agent that invoked the subagent"* |
| `prompt` | | A system prompt string, or `{file:...}` — *"relative to where the config file is located"* |
| `temperature` | | Response randomness |
| `top_p` | | Nucleus sampling |
| `steps` | | *"the maximum number of agentic iterations an agent can perform before being forced to respond with text only"*. Unset: *"the agent will continue to iterate until the model chooses to stop or the user interrupts"*. On hitting it the agent gets *"a special system prompt instructing it to respond with a summarization of its work and recommended remaining tasks"*. Legacy `maxSteps` is deprecated |
| `permission` | | Per-agent rules, merged over the global block — [`02`](./02-permissions.md) §6 |
| `tools` | | **Deprecated** in favour of `permission`. `true` is equivalent to `{"*": "allow"}`, `false` to `{"*": "deny"}`; wildcards work, e.g. `"mymcp_*": false` |
| `disable` | | `true` removes the agent |
| `hidden` | | Hides a subagent from `@` autocomplete. *"Hidden agents can still be invoked by the model via the Task tool if permissions allow."* Applies only to `mode: subagent` |
| `color` | | A hex value or one of `primary`, `secondary`, `accent`, `success`, `warning`, `error`, `info` |
| *anything else* | | *"passed through directly to the provider as model options"* — the documented example is `reasoningEffort` and `textVerbosity` on `openai/gpt-5` |

---

## 5. Delegation, and its two limits

**`subagent_depth`** is global, not per agent. *"The default is `1`, which allows primary agents to
launch subagents but prevents those subagents from launching additional subagents. Set it to `2` to
allow one additional level… or `0` to prevent all subagent launches."*

**`permission.task`** decides which subagents may be launched, by glob against the subagent type, and
a `deny` *"removes the subagent from the Task tool description entirely"* — see
[`02`](./02-permissions.md) §6, including the carve-out that leaves `@` mention unaffected.

**`default_agent`** picks the agent used when none is named. *"The default agent must be a primary
agent (not a subagent)"*, and *"If the specified agent doesn't exist or is a subagent, OpenCode will
fall back to `"build"` with a warning."* It applies *"across all interfaces: TUI, CLI (`opencode
run`), desktop app, and GitHub Action."*

**Background subagents are behind a flag.** `OPENCODE_EXPERIMENTAL_BACKGROUND_SUBAGENTS` — *"Enable
background subagent tasks"* — appears only in the CLI reference's experimental table; no page
describes the behaviour. Checked `/docs/agents/`, `/docs/cli/` and `/docs/config/`.

---

## 6. The legacy `mode` object

A `mode.<name>` block is still read. In `packages/opencode/src/config/config.ts` each entry is folded
into `agent` with `mode: "primary"` forced, and the schema marks the key
`@deprecated Use \`agent\` field instead`. `/docs/modes/` returns **404** (checked 2026-09-08), while
a `modes/` subdirectory remains on the config page's list of accepted plural directory names — see
[`01`](./01-config-and-rules.md) §1.
