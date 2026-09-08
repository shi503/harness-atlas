---
status: DRAFT
title: "Beyond the CLI — cloud, IDE, desktop and web"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/cloud · https://learn.chatgpt.com/docs/codex/ide"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Beyond the CLI — cloud, IDE, desktop and web

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` at **rust-v0.153.4**, **2026-09-08**.

**Read the scope note in [`00-README.md`](./00-README.md) before this page.** Every other document in
this set describes the CLI and runtime, which is where the profile's boundary sits. This one covers
the surfaces around it, and has no counterpart in the profile's detail rows.

**What makes them one system** is the object model, not shared code: the app-server names `Thread`,
`Turn` and `Item`, and every surface here addresses those same objects —
[`05-mcp-and-the-app-server.md`](./05-mcp-and-the-app-server.md).

---

## 1. Codex cloud

*"Run coding tasks in parallel cloud environments"*, with work startable *"from the web, GitHub,
GitLab, Linear, or Slack."*

**The environment is the configured unit.** A repository is connected through GitHub or GitLab, and an
environment is defined for it: *"Configure the dependencies, tools, variables, and setup steps each
repository needs."* Tasks then run against that environment — *"Give each task dedicated environments
and let them continue while you work on something else."*

| Concern | Mechanism |
|---|---|
| Isolation | Per-task dedicated cloud environment |
| Setup | Dependencies, tools, environment variables, secrets, setup steps — defined per repository |
| Egress | *"Configure agent internet access"*, administratively controlled |
| Handoff | *"Start and review work from the web or Codex CLI"* |

**The trade against the local CLI is the sandbox.** Locally, isolation is the OS's — Seatbelt,
`bubblewrap`, the Windows sandbox ([`06`](./06-sandboxing-and-permissions.md)). In the cloud it is the
container plus an egress policy, and the local `sandbox_mode` vocabulary does not apply.

---

## 2. The IDE extension

*"Work with Codex beside your code. Bring open files and selections into the prompt, review edits in
place, and hand off longer work without breaking your flow."*

| Editor | Support |
|---|---|
| VS Code, and compatible editors — Cursor, Windsurf | Official extension |
| JetBrains IDEs | Built-in support |
| Xcode | Native integration |

What it adds over the terminal is context and review, not capability: open files and selections
enter the prompt directly, and diffs are inspected in place beside the source. Escalation is explicit
— *"keep quick iterations local, or connect Codex web when a task needs more time and room."*

**How it shares configuration was not established precisely.** The page states that the extension
shares configuration patterns with the CLI, without naming which files or scopes. Checked: the IDE
page and the configuration reference. **Recorded as an absence in the documentation.** The
`AGENTS.md` chain and `config.toml` layers in
[`01`](./01-agents-md-and-configuration.md) are repository-scoped and would apply to any client
opening that repository, but this was not confirmed on the page.

---

## 3. Desktop and web

The ChatGPT desktop application and `chatgpt.com/codex` are the remaining surfaces, both listed under
the documentation's own *"Available on"* grouping alongside the CLI, the IDE extension and cloud.
Neither was read in detail on this pass — they are product surfaces rather than configuration
surfaces, and nothing in them changes the mechanisms documented elsewhere in this set. **Named here so
the surface list is complete, and marked as unread rather than as absent.**

---

## 4. One naming caution

*"Codex"* names more than one thing, and the documentation does not always disambiguate: the CLI and
runtime described in this set, **Codex cloud**, the **IDE extension**, and OpenAI's retired 2021
code-completion model, which is unrelated. A claim found under the word should be checked for which
of these it is about.
