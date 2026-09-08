---
status: DRAFT
title: "OpenCode — the consolidated guide"
tier: reference
project: harness-atlas
source: "anomalyco/opencode @ v1.18.29 · https://opencode.ai/docs"
version_at_capture: "v1.18.29"
source_verified: "2026-09-08"
---

# OpenCode — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `anomalyco/opencode` and `opencode.ai/docs` at **v1.18.29**, **2026-09-08**.

One pass over the configurable surface, for a reader with ten minutes. Every claim here is sourced in
a numbered document; this page carries the shape, not the field names.

---

## 1. The mental model

**Everything is one merged JSON object, and the tool call is where it bites.** OpenCode has no
sandbox, no policy engine outside itself, and no separate enforcement daemon. It has a configuration
chain that resolves to a single `Config`, and a check that runs between the model asking for a tool
and the tool running. Almost every question about OpenCode's behaviour reduces to *what does the
merged config say*, and *what does the tool pass to the matcher*.

**Two vocabularies that sound alike and are not.** The vendor separates them explicitly:

> *"Policies are separate from permissions. Permissions control what tools can do during a session,
> while policies control whether OpenCode may use a resource such as an LLM provider."*

A third word, `tools`, is a deprecated boolean layer that is converted into permissions at load time.
Three words, one destination — [`02`](./02-permissions.md), [`03`](./03-policies.md).

**Config merges; rules select.** `opencode.json` sources are *"merged together, not replaced"*, so
every rung contributes. `AGENTS.md` resolution is *"The first matching file wins in each category"*,
so a project `AGENTS.md` suppresses the `CLAUDE.md` beside it rather than layering over it.
— [`01`](./01-config-and-rules.md)

---

## 2. The five rules that matter most

1. **Last matching rule wins, so the catch-all goes first.** Permissions, agent task rules and
   policies all evaluate this way. A `"*": "deny"` written last denies everything.
   — [`02`](./02-permissions.md), [`03`](./03-policies.md)
2. **`--auto` does not touch `deny`.** *"Explicit `"deny"` rules are still enforced. Auto mode only
   changes requests that would otherwise ask for approval."* — [`02`](./02-permissions.md) §5
3. **Policies invert the chain's direction.** For everything else, project beats global. For
   `experimental.policies`, *"your global policy takes priority over the project policy."*
   — [`03`](./03-policies.md) §4
4. **A permission key is a wildcard against a tool name, and the set is open.** The schema's
   `additionalProperties` is what makes `"mymcp_*": "deny"` work, and what means an inventory of
   fifteen keys is not the whole story. — [`02`](./02-permissions.md) §2
5. **A plugin can decide a permission.** `permission.ask` returns `allow`/`ask`/`deny`, and
   `tool.execute.before` blocks by throwing. Enforcement is not only declarative.
   — [`07`](./07-plugins-hooks-and-events.md) §3

---

## 3. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| State standing expectations in prose | `AGENTS.md`, or `instructions` | [`01`](./01-config-and-rules.md) |
| Set behaviour mechanically | `opencode.json` | [`01`](./01-config-and-rules.md) |
| Gate what a tool call may do | `permission` | [`02`](./02-permissions.md) |
| Stop a provider being usable at all | `experimental.policies` | [`03`](./03-policies.md) |
| Run a task with a different model, prompt or permission set | Agent | [`04`](./04-agents.md) |
| Give the model a new tool | Custom tool · MCP server · plugin `tool` | [`05`](./05-the-tool-registry.md) |
| Package instructions the model chooses to load | Skill | [`06`](./06-skills-and-commands.md) |
| Package a prompt the operator types | Command | [`06`](./06-skills-and-commands.md) |
| Act on a lifecycle moment, or override a decision | Plugin hook | [`07`](./07-plugins-hooks-and-events.md) |
| Enforce across an organisation | Managed settings · macOS MDM · remote `.well-known/opencode` | [`01`](./01-config-and-rules.md) §2 |

---

## 4. Enforcement, ordered

Four checks a tool call passes, in order, each a different kind of thing:

1. **Does the tool exist?** `tools.<name>: false` and `experimental.primary_tools` decide what is in
   the registry at all. A removed tool is not refused; it is absent.
2. **Is the model allowed to see it?** A `deny` on `permission.task` *"removes the subagent from the
   Task tool description entirely"*; a `deny` on `permission.skill` hides the skill from
   `<available_skills>`. Withholding precedes refusing.
3. **Does the permission ladder allow the call?** Wildcard match against the tool's own input, last
   rule wins, agent rules over global rules.
4. **Does a plugin override it?** `permission.ask` may return a different action;
   `tool.execute.before` may throw.

**All four run inside the OpenCode process.** No step in that list is enforced by the operating
system, and no documentation page read for this set states a threat model for any of them — checked
`/docs/permissions/`, `/docs/tools/`, `/docs/config/`, `/docs/enterprise/`, `/docs/network/`.
Recorded as an absence in what was read.

**The one control that is not about a tool call** sits above all four: `experimental.policies`
removes a provider from selection before a session can use it.

---

## 5. What an organisation can fix, and where it stops

The chain ends in two rungs a user cannot write to — a managed config directory requiring root, and
the macOS `ai.opencode.managed` preference domain deployed by MDM, of which the config page says
*"highest priority, not user-overridable"* and *"enforced automatically."* `opencode debug config` is
the stated way to confirm what landed.

**Two inputs sit outside that account.** An active-organisation config is fetched from
`<account url>/api/config` and merged before the managed rungs without appearing in the numbered
precedence list. And `OPENCODE_PERMISSION`, an environment variable described only in the CLI
reference's table, is merged into the permission block after the MDM rung in
`packages/opencode/src/config/config.ts` at this version. Both recorded, neither adjudicated.
— [`01`](./01-config-and-rules.md) §§1, 4

---

## 6. Where the documentation stops

Absences and disagreements recorded across this set, each naming what was checked:

- **No threat model or OS-level isolation** is described for the permission ladder. Checked
  `/docs/permissions/`, `/docs/tools/`, `/docs/config/`, `/docs/enterprise/`, `/docs/network/`.
  [`02`](./02-permissions.md) §8
- **Three permission-key inventories disagree** — thirteen keys on the permissions page, fifteen on
  the agents page, fifteen in the published schema. [`02`](./02-permissions.md) §2
- **Two vendor sources disagree on the `plan` agent's defaults** — `ask` on the agents page, *"Denies
  file edits by default"* in the repository `README.md`. [`02`](./02-permissions.md) §4
- **The plugins page's event list and the SDK's `Event` union disagree** — 28 names against 32 types,
  three of the 28 being hook keys, and one (`permission.asked`) named in the source schema but not in
  the generated union. [`07`](./07-plugins-hooks-and-events.md) §4
- **Nine configuration keys and flags appear only in the schema or the CLI table**:
  `skills.paths`, `skills.urls`, `experimental.primary_tools`, `experimental.continue_loop_on_deny`,
  `experimental.batch_tool`, `experimental.mcp_timeout`, `tool_output.*`, `OPENCODE_PERMISSION`, and
  `OPENCODE_DISABLE_PROJECT_CONFIG` — the last of which appears in neither and is only in the source.
- **Collision behaviour between a custom tool and an MCP tool of the same name** is not stated.
  Checked `/docs/custom-tools/`, `/docs/mcp-servers/`, `/docs/tools/`, `/docs/plugins/`.
  [`05`](./05-the-tool-registry.md) §6
- **How `experimental.policies` resolves against `disabled_providers` and `enabled_providers`**, all
  three of which are current, is not stated. Checked `/docs/policies/`, `/docs/config/`,
  `/docs/providers/`. [`03`](./03-policies.md) §5

One structural note: the documentation site is generated from `packages/web/src/content/docs/*.mdx`
in the repository, so every page has a raw primary source at a pinned tag. `/docs/modes/` returns
**404** while `modes/` directories are still loaded — see [`04`](./04-agents.md) §6.

---

## 7. The claims, walked against what this set documented

The claim ledger in [`00-README.md`](./00-README.md) records what the vendor says OpenCode is for.
This walks each claim to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, records that
nothing was found and says what was checked, or says the claim falls outside this set's scope. There
is no verdict column and none is implied.

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"The open source AI coding agent."* | MIT licence, `anomalyco/opencode`, docs generated from the same tree — recorded in [`00`](./00-README.md), not a configurable surface |
| *"The AI coding agent built for the terminal."* | **Outside this set's scope.** The TUI, desktop, web, server, SDK, ACP, GitHub, GitLab and Slack surfaces were not opened; the agreed scope is the client-server agent's configurable surface |
| *"available as a terminal-based interface, desktop app, or IDE extension"* | **Outside this set's scope**, as above. `default_agent` is the one setting documented as applying *"across all interfaces"* — [`04`](./04-agents.md) §5 |
| *"decide whether a given action should run automatically, prompt you, or be blocked"* | The `allow`/`ask`/`deny` ladder in full — [`02`](./02-permissions.md) |
| *"control whether OpenCode may use configured resources like LLM providers"* | `experimental.policies` with one action, `provider.use` — [`03`](./03-policies.md) |
| *"specialized AI assistants… with custom prompts, models, and tool access"* | Agents as configuration overlays, JSON or Markdown, with a per-agent permission block — [`04`](./04-agents.md) |
| *"extend OpenCode by hooking into various events and customizing behavior"* | Twenty-one hook keys and a thirty-two-type event union — [`07`](./07-plugins-hooks-and-events.md) |
| *"reusable instructions that OpenCode discovers from your repository or home directory"* | Six discovery roots, a name regex, and load-on-demand through the `skill` tool — [`06`](./06-skills-and-commands.md) §1 |
| *"Automatically loads the right LSPs for the LLM"* | The `lsp` config key and the built-in server set; the `lsp` **tool** is separately flag-gated behind `OPENCODE_EXPERIMENTAL_LSP_TOOL` — [`05`](./05-the-tool-registry.md) §1. The loading behaviour itself is on `/docs/lsp/`, which this set does not restate |
| *"Start multiple agents in parallel on the same project"* | Subagents and child sessions, bounded by `subagent_depth` and `permission.task` — [`04`](./04-agents.md) §5 |
| *"Supports 75+ LLM providers through"* models.dev *"including local models"* | **Named, not mechanised in this set.** The provider catalogue is `/docs/providers/`, which was read for the policy interaction only. What this set documents is how a provider is *denied* — [`03`](./03-policies.md) |
| *"organizations that want to ensure that their code and data never leaves their infrastructure"* | The managed-settings and MDM rungs, plus provider denial — [`01`](./01-config-and-rules.md) §2, [`03`](./03-policies.md) §6. The claim's other half, *"does not store any of your code or context data"*, is a claim about what the vendor's servers do and has no mechanism in a configuration surface to point at |
| *"Share a link to any sessions for reference or to debug"* | **Outside this set's scope.** `share: "manual" \| "auto" \| "disabled"` is the switch, on `/docs/config/` and `/docs/share/`; the sharing service itself was not opened |
