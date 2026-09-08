---
status: DRAFT
title: "Skills, mail and MCP — what Gas City puts inside another agent's conventions"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/guides/capabilities-for-coding-agent-users.md · docs/reference/cli.md · docs/reference/config.md · engdocs/proposals/skill-materialization.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Skills, mail and MCP — what Gas City puts inside another agent's conventions

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

Most of Gas City sits above the coding agents it runs. Three things reach *down into* them: skills
placed into each provider's own directory convention, hooks installed into agent working
directories, and an MCP configuration projected into provider-native form. This documents those,
plus mail — the channel that exists because separate sessions cannot otherwise talk.

---

## 1. Skills — authored once at a scope, symlinked into each provider's sink

*"You author a skill once at a scope, and Gas City materializes it to every eligible agent — no
per-agent allow-lists, and the model decides when a skill applies."*
— `docs/guides/capabilities-for-coding-agent-users.md`

**Two scopes, with a stated collision rule:**

| Scope | Path | Visible to |
|---|---|---|
| Pack level | `skills/<name>/` | *"**every** agent in the city"* |
| Role level | `agents/<role>/skills/<name>/` | *"only agents of that role (and all its pooled instances)"* |

*"On a name collision, the role-local skill wins."*

**The sinks.** *"At startup Gas City **symlinks** the pack level and role level skill directories
into each agent's provider-specific skill sink — `.claude/skills/`, `.agents/skills/` (codex),
`.gemini/skills/`, `.opencode/skills/`."* The `gc skill` reference gives the general form as
`<scope-root>/.<vendor>/skills/`.

**Two refusals, both explicit:**

> *"It **places** the files into each provider's own convention; **it doesn't translate them.**
> Providers whose convention isn't confirmed (copilot, cursor, pi, omp) are skipped for now."*

> *"No framework *around* skills: no per-agent allow-lists. Within a scope every eligible agent gets
> every skill; the model decides when one applies."*

**`gc skill list` is diagnostic, not predictive**, and the reference is unusually careful to say so:

> *"The listing is a diagnostic view of what's *available*. It does not collapse precedence, filter
> to agents whose provider has a vendor sink, or predict exactly which entries the materializer will
> pick on name collision. For the materialized set, inspect the `<scope-root>/.<vendor>/skills/`
> sink after `gc start` or run `gc doctor` to surface collisions."*

Its output covers *"City pack skills … Imported pack shared skills (binding-qualified, e.g.
`ops.code-review`) … Compatibility bootstrap skills, when legacy implicit imports still exist"*,
and with `--agent`/`--session`, that agent's own catalog.

**The old config keys are tombstones.** `agent.skills` and `agent.mcp` (and `mcp_append`) are
*"tombstone field[s] retained for v0.15.1 backwards compatibility. Accepted during parse for
migration visibility, but attachment-list fields are accepted but ignored by the active
materializer."* Two of the six tombstone rows add *"Deprecated: removed in v0.16"* and point at
`engdocs/proposals/skill-materialization.md`. **Skills are no longer attached per agent; they are
materialized by scope.**

An agent's prompt can be told about what it got: `inject_assigned_skills` appends an appendix
*"partitioned into (assigned-to-you, shared-with-every-agent), so agents sharing a scope-root sink
can tell which skills are their specialization vs which are the city-wide set."*

---

## 2. Hooks installed into the agent's working directory

Skills and hooks are separate materializations with **different provider coverage**, which is easy
to miss because both are described as things Gas City installs.

`workspace.install_agent_hooks` *"lists provider names whose hooks should be installed into agent
working directories. Agent-level overrides workspace-level (**replace, not additive**)."*
Fourteen supported: `claude`, `codex`, `gemini`, `antigravity`, `kiro`, `opencode`, `mimocode`,
`groq`, `cerebras`, `copilot`, `cursor`, `pi`, `omp`, `kimi`.

That set includes all four providers the *skill* materializer skips. Whatever a Gas City hook needs
from a provider, it is available in `copilot`, `cursor`, `pi` and `omp`; a confirmed *skill
directory convention* is not.

`agent.hooks_installed` overrides the automatic detection: *"Set to true when hooks are manually
installed (e.g. merged into the project's own hook config) … When true, the agent is treated as
hook-enabled for startup behavior: no prime instruction in beacon and no delayed nudge."*

The `core` pack supplies *"per-provider hook and instruction overlays for supported coding agents"*
(`docs/reference/system-packs.md`).

What the installed hook calls back into is `gc hook` — the work-discovery and claim door, covered in
[`02-agent.md`](./02-agent.md) §4b.

---

## 3. MCP — two vendor pages disagree at this read

`docs/guides/capabilities-for-coding-agent-users.md` states:

> *"MCP is list-only today (`gc mcp list` shows what's catalogued; you wire the servers yourself)."*

The generated CLI reference states something different for the same command:

> *"`gc mcp` — Inspect the **projected** MCP catalog for a concrete target. Projected MCP is
> target-specific. Use `gc mcp list --agent <name>` when the agent has a single deterministic
> projection target from config, or `gc mcp list --session <id>` for a live session target."*
>
> *"`gc mcp list` — Show the **precedence-resolved** MCP servers that Gas City **would project into
> the provider-native config** for one agent or session target."*

Projecting a precedence-resolved set into provider-native config is not the same claim as
*"you wire the servers yourself."* Both pages were current at this read.

**Which one to weigh.** `engdocs/contributors/docs-organization.md` states that
`docs/reference/cli.md` is **generated** — *"Never edit the markdown — edit the Go source and
regenerate"*, from *"cobra `Use`/`Short`/`Long`/`Example` strings in `cmd/gc/`"* — and that
`.githooks/pre-commit` regenerates it on any staged Go change, with a `TestCLIDocsFreshness` gate.
The guide is hand-written and carries no last-verified date. This set records the disagreement
rather than resolving it; the design record is `engdocs/proposals/mcp-materialization.md` and
`mcp-materialization-implementation-plan.md`, neither of which was opened at this read.

---

## 4. Mail and nudge

Two channels, and the distinction is durability:

| Channel | Durable? | What it is | Send with |
|---|:-:|---|---|
| **Mail** | Yes — *"a bead (type `message`)"* | *"Sender, recipient, subject, body; threads and waits in an inbox until read. Agents typically pull new mail into context each turn via a hook"* | `gc mail` |
| **Nudge** | No | *"A direct poke into a live session — text typed straight into a running agent to wake or redirect it now"* | `gc session nudge <agent> "msg"` |

*"Mail derivation: `beads.Store.Create(Bead{Type:"message"})` → message is a bead. Inbox = query
open message beads by assignee. Archive = close the bead. Nudge derivation:
`runtime.Provider.Nudge(text)` → text typed into the agent's session. Fire-and-forget."*
— `engdocs/architecture/nine-concepts.md` §6, which adds: *"**Proof**: Mail uses only Bead Store
(primitive 2). Nudge uses only Session (primitive 1). No new infrastructure."*

The `gc mail` surface is twelve subcommands — `send`, `inbox`, `read`, `peek`, `reply`, `thread`,
`archive`, `delete`, `count`, `check`, `mark-read`, `mark-unread` — and seven of the fifty-one event
types are `mail.*` ([`07-event.md`](./07-event.md) §1). `gc nudge` and `gc nudge status`
*"Inspect and deliver deferred nudges."*

**A separate external fabric exists.** `gc extmsg bind` / `unbind` / `handoff` plus the seven
`extmsg.*` events and the `ExtMsgConfig` / `ExtMsgDefaultRoute` config sections carry inbound and
outbound adapters to systems outside the city. Its design notes are
`engdocs/design/external-messaging-fabric.md` and `external-messaging-shared-threads.md`; the
adapters themselves were not opened at this read, and
`engdocs/architecture/invariants.md` §7 places *"Outbound HTTP (`internal/extmsg/http_adapter.go`
…)"* out of the typed-wire scope: *"we consume someone else's contract."*

---

## 5. Identity and history, as an agent experiences them

The capabilities guide's opening table is the vendor's own map of what changes when a single-agent
feature becomes shared infrastructure. Three rows are documented elsewhere in this set; the two that
are not:

**History is three layers, each read by a different tool:**

| Layer | What it records | Read with |
|---|---|---|
| **Bead history** | *"Each work item's create → update → close trail, independent of any session"* | `bd`, `gc` |
| **Session logs** | *"One agent's conversation: your prompts, the model's replies, its tool calls"* | `gc session logs <agent>` (`-f` to follow) |
| **Event log** | *"An append-only, city-wide feed of system activity"* | `gc events` |

**Context is seeded, not assembled.** *"It starts from the agent's **role**: a prompt template
rendered with deployment data … Its current **work items** and **mail** — all beads — flow in live
as it works."* The guide's own diagram caption states the coordination rule: *"no arrow connects two
agents directly. A nudge can wake a live session, but the work itself only ever moves through
beads."*
