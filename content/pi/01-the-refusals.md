---
status: DRAFT
title: "The refusals — what Pi will not ship, and what ships instead"
tier: reference
project: harness-atlas
source: "earendil-works/pi @ v0.85.1 · packages/coding-agent/README.md §Philosophy · examples/extensions/ · mariozechner.at post 2025-11-30"
version_at_capture: "v0.85.1"
source_verified: "2026-09-08"
---

# The refusals — what Pi will not ship, and what ships instead

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `earendil-works/pi` at **v0.85.1**, **2026-09-08**.

Pi publishes six refusals on its landing page and in `CA/README.md` §Philosophy. Five of the six have
a **shipped example extension** in the same repository that supplies the refused thing. That
relationship — refused as a built-in, provided as an example — is not assembled anywhere in Pi's own
documentation: the refusal list links to `#extensions` generically, and the examples table is
organised by API rather than by what it restores. This page is that assembly.

---

## 1. The list, in two voices

**The shipped voice**, `CA/README.md` §Philosophy and `pi.dev`, identical wording in both:

> *"**No MCP.** … **No sub-agents.** … **No permission popups.** … **No plan mode.** … **No built-in
> to-dos.** … **No background bash.**"*

The site frames the same six under a heading of what Pi *"Does Not Ship With"*, beneath
*"Primitives, not features"* and *"Change the harness, not your workflow"*.

**The rationale voice** is the maintainer's post of **2025-11-30**, which `CA/README.md` links as
*"the full rationale"*. It is stronger than the README in two places — it says **"does not and will
not"** where the README says only "no" — and it states the reason per refusal:

| Refusal | The stated reason, verbatim (2025-11-30) |
|---|---|
| To-dos | *"to-do lists generally confuse models more than they help. They add state that the model has to track and update, which introduces more opportunities for things to go wrong."* |
| Plan mode | *"Telling the agent to think through a problem together with you, without modifying files or executing commands, is generally sufficient."* |
| MCP | *"MCP servers are overkill for most use cases, and they come with significant context overhead."* — with token figures for two named servers and *"That's 7-9% of your context window gone before you even start working."* |
| Background bash | *"Background process management adds complexity: you need process tracking, output buffering, cleanup on exit, and ways to send input to running processes."* |
| Sub-agents | *"You have zero visibility into what that sub-agent does. It's a black box within a black box."* … *"If you need pi to spawn itself, just ask it to run itself via bash."* |
| Permission popups | *"pi runs in full YOLO mode and assumes you know what you're doing."* — the post's section is titled *"YOLO by default"* |

And the governing line: *"My philosophy in all of this was: if I don't need it, it won't be built.
And I don't need a lot of things."*

**The two voices are one year apart and they do not fully agree.** The post says pi *"does not and
will not have a built-in plan mode"*; the repository at v0.85.1 ships `examples/extensions/plan-mode/`.
Both are true — the refusal is about the *core*, and the example is not core — but the distinction is
the whole design and it is nowhere stated in one place. Recorded, not graded.

---

## 2. Refusal → what ships instead

Every path below is under `packages/coding-agent/examples/extensions/`, listed in
[`02-extensions.md`](./02-extensions.md) §5 as an examples tree that is not installed by default.

| Refusal | What `CA/README.md` says to do instead | Shipped example |
|---|---|---|
| **No plan mode** | *"Write plans to files, or build it with extensions, or install a package."* | `plan-mode/` — has a `README.md` |
| **No sub-agents** | *"Spawn pi instances via tmux, or build your own with extensions, or install a package that does it your way."* | `subagent/` — has a `README.md` |
| **No built-in to-dos** | *"They confuse models. Use a TODO.md file, or build your own with extensions."* | `todo.ts`, plus `/todos` inside `plan-mode/` |
| **No permission popups** | *"Run in a container, or build your own confirmation flow with extensions inline with your environment and security requirements."* | `permission-gate.ts`, `protected-paths.ts`, `confirm-destructive.ts`, `timed-confirm.ts`, `project-trust.ts`; for OS-level isolation `sandbox/` and `gondolin/` |
| **No MCP** | *"Build CLI tools with READMEs (see Skills), or build an extension that adds MCP support."* | **none — see §3** |
| **No background bash** | *"Use tmux. Full observability, direct interaction."* | **none — see §3** |

**The examples README groups them differently again**, under *"Lifecycle & Safety"*, *"Custom Tools"*
and *"Commands & UI"*, and its one-line descriptions are not the same text as the docs table in
`DOCS/extensions.md` §Examples Reference. Two descriptions exist for most examples; where they differ,
the examples README is the more current — `sandbox/` is described there as *"OS-level sandboxing using
`@anthropic-ai/sandbox-runtime` with per-project config"* and in the docs table only as *"Sandboxed
tool execution"*.

---

## 3. The two refusals with nothing shipped behind them

**No MCP — no example extension exists.** Checked: the 78-row examples table in
`DOCS/extensions.md` §Examples Reference, the grouped tables in `examples/extensions/README.md`, and
the directory listing of `packages/coding-agent/examples/extensions/` at v0.85.1 (78 entries, none
named for MCP). The refusal's own instruction — *"build an extension that adds MCP support"* — is left
to the reader; `CA/README.md` links a third-party route instead, and the 2025-11-30 post names an
external wrapper tool for the same purpose. The package gallery lists third-party MCP adapters; none
is in this repository.

**No background bash — no example extension exists.** Checked: the same three listings. The nearest
shipped thing is `interactive-shell.ts`, described as *"Persistent shell session"* and reached through
the `user_bash` event, which is not background execution. The instruction *"Use tmux"* points outside
Pi entirely; `DOCS/tmux.md` is a platform-setup page for running Pi under tmux, not for backgrounding
work from inside it.

---

## 4. What the two documented examples actually give you

The profile's §6 names both. This is the grain under them.

### `plan-mode/` — read-only exploration, then execution

Two modes in one extension. In plan mode the built-in `edit` and `write` tools are disabled while
other active tools remain, and bash is filtered through an **allowlist stated in the example's own
README**:

- allowed — `cat`, `head`, `tail`, `less`, `more`; `grep`, `find`, `rg`, `fd`; `ls`, `pwd`, `tree`;
  `git status`, `git log`, `git diff`, `git branch`; `npm list`, `npm outdated`, `yarn info`;
  `uname`, `whoami`, `date`, `uptime`
- blocked — `rm`, `mv`, `cp`, `mkdir`, `touch`; `git add`, `git commit`, `git push`;
  `npm install`, `yarn add`, `pip install`; `sudo`, `kill`, `reboot`; `vim`, `nano`, `code`

Surfaces: `/plan`, `/todos`, `Ctrl+Alt+P`, a `--plan` flag. Plans are extracted as numbered steps under
a literal `Plan:` header; execution restores full tool access and tracks completion through `[DONE:n]`
markers in the model's output, shown in a progress widget. State survives resume.

**This is prompt-and-allowlist enforcement inside the harness process**, not an OS boundary — the same
bound `DOCS/security.md` places on everything Pi does short of a container.

### `subagent/` — a separate `pi` process per delegate

*"Each subagent runs in a separate `pi` process."* Three tool modes, with the caps stated only in the
example's README:

| Mode | Parameter shape | Caps |
|---|---|---|
| Single | `{ agent, task }` | — |
| Parallel | `{ tasks: [...] }` | *"max 8, 4 concurrent"*; model-visible output *"capped at 50 KB per task"* |
| Chain | `{ chain: [...] }` | `{previous}` placeholder; *"Stops at first failing step"* |

Agents are Markdown with YAML frontmatter (`name`, `description`, `tools`, `model`) at
`~/.pi/agent/agents/*.md` (always loaded) and `.pi/agents/*.md` (**off by default**; needs
`agentScope: "project"` or `"both"`, and prompts for confirmation in untrusted projects unless
`confirmProjectAgents: false`). *"When `model` is omitted, the subagent inherits the dispatching
session's active model and thinking level."* Four sample agents ship — `scout` (Haiku), `planner`,
`reviewer`, `worker` — with three workflow prompt templates, `/implement`, `/scout-and-plan`,
`/implement-and-review`.

**Installation is manual symlinking.** The README's instructions are `ln -sf` commands into
`~/.pi/agent/extensions/subagent/`, `~/.pi/agent/agents/` and `~/.pi/agent/prompts/`. There is no
`pi install` path for an in-repo example.

---

## 5. What follows from the shape

An example is **not installed, not versioned as a package, and not covered by the update path**. `pi
update --all` reconciles installed packages ([`03`](./03-resources-scope-and-trust.md) §4); an example
copied or symlinked out of the repository is a file the operator now owns. Two of the five
replacements (`sandbox/`, `gondolin/`) carry their own `package.json` and lockfile and no README;
their behaviour is documented only by the one-line entries quoted in §2.
