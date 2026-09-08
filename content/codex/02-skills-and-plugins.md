---
status: DRAFT
title: "Skills and plugins"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/build-skills · https://learn.chatgpt.com/docs/build-plugins"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Skills and plugins

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` at **rust-v0.153.4**, **2026-09-08**.

*"Use agent skills to extend ChatGPT and Codex with task-specific capabilities. A skill packages
instructions, resources, and optional scripts so either product can follow a workflow reliably."*

**A skill is portable across two products.** The same `SKILL.md` is read by ChatGPT and by Codex,
which is why the metadata file below is namespaced `agents/openai.yaml` rather than something
Codex-specific. A plugin is the distribution wrapper: *"A plugin is an installable package that can
include skills, an MCP server, or both."*

---

## 1. `SKILL.md`

**Two required frontmatter fields:**

| Field | Purpose |
|---|---|
| `name` | The skill identifier |
| `description` | **When the skill should and should not trigger** |

The description carries the whole matching burden. The docs advise front-loading key use cases,
because descriptions are shortened for implicit matching — a skill whose distinguishing clause sits
in its last sentence may be matched on a truncated form that no longer contains it.

**Directory layout:**

```
my-skill/
├── SKILL.md            required
├── scripts/            optional executable code
├── references/         optional documentation
├── assets/             optional templates and resources
└── agents/openai.yaml  optional metadata
```

---

## 2. Discovery — six scopes, nearest first

| # | Scope | Path |
|---|---|---|
| 1 | REPO | `.agents/skills` in the current working directory |
| 2 | REPO | `.agents/skills` in parent directories, walking up |
| 3 | REPO | `.agents/skills` at the repository root |
| 4 | USER | `$HOME/.agents/skills` |
| 5 | ADMIN | `/etc/codex/skills` |
| 6 | SYSTEM | Bundled with Codex |

**Duplicate names do not merge and do not shadow.** *"If duplicate skill names exist, both appear in
selectors rather than merging."* This is the opposite of the config chain in
[`01`](./01-agents-md-and-configuration.md), where a nearer layer wins. Two skills named `review` from
different scopes both appear, and disambiguating them is the operator's problem.

Note the path: `.agents/skills`, not `.codex/skills`. Subagents, hooks and config use `.codex/`;
skills use `.agents/`, which is the cross-product namespace.

---

## 3. Invocation

- **Explicit** — `$skill` in Codex, `@skill` in ChatGPT.
- **Implicit** — the host selects a skill whose `description` matches the task.

Implicit invocation can be refused per-skill in metadata.

---

## 4. `agents/openai.yaml`

Optional, and the only place presentation and invocation policy can be set:

```yaml
interface:
  display_name: …
  short_description: …
  icon_small: …
  icon_large: …
  brand_color: …
  default_prompt: …
policy:
  allow_implicit_invocation: true   # false pins the skill to explicit $invocation
dependencies:
  tools: [ … ]                      # MCP server declarations
```

`dependencies.tools` is the join between a skill and [`05`](./05-mcp-and-the-app-server.md): a skill
can declare the MCP servers it needs rather than assuming they are already configured.

---

## 5. Plugins

A plugin is declared by `.codex-plugin/plugin.json` and bundles skills, an MCP server, or both.
Plugin-bundled **hooks** load from `hooks/hooks.json` inside the plugin directory — see
[`03-hooks.md`](./03-hooks.md), where the trust rule for non-managed hooks applies to bundled ones too.

**The vendor's page is better than a summary of it** for the packaging and submission steps, which
change with the marketplace rather than with the runtime:
[Build plugins](https://learn.chatgpt.com/docs/build-plugins).
