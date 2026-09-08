---
status: DRAFT
title: "Profiles and SOUL.md — the container and the identity"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/profiles · .../features/personality · .../which-file-does-what · NousResearch/hermes-agent SOUL.md"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Profiles and SOUL.md — the container and the identity

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` and `NousResearch/hermes-agent` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

Everything else in this set is scoped by one of these two. The **profile** is the directory that
owns all state; **`SOUL.md`** is the one file inside it that occupies the top of the prompt.

---

## 1. The profile

*"A profile is a separate Hermes home directory. Each profile gets its own directory containing its
own `config.yaml`, `.env`, `SOUL.md`, memories, sessions, skills, cron jobs, and state database."*

The mechanism is a single environment variable:

> *"Profiles use the `HERMES_HOME` environment variable. When you run `coder chat`, the wrapper script
> sets `HERMES_HOME=~/.hermes/profiles/coder` before launching hermes. Since 119+ files in the
> codebase resolve paths via `get_hermes_home()`, Hermes state automatically scopes to the profile's
> directory."*

| Fact | Value |
|---|---|
| Default profile | `~/.hermes` itself — *"No migration needed."* |
| Named profile | `~/.hermes/profiles/<name>/` |
| Creation | `hermes profile create <name>` — *"it automatically becomes its own command"*, so `coder chat`, `coder setup`, `coder gateway start` all exist |
| Selection | `-p <name>` per invocation, or `hermes profile use <name>` for a sticky default |
| Cloning | `--clone` (config only), `--clone-all` (everything), or `--clone-from <profile>` |
| Sharing | `/export` packs one `.tar.gz` — *"skills, memory, persona, crons, plugins, settings"* — with API keys stripped; `/import` unpacks it. `hermes profile install <git repo>` installs a distribution and *"keeps your memories + .env"* on update |

### `HERMES_HOME` is not `HOME`

The two are deliberately separated, and the separation has a switch:

> *"On host installs, tool subprocesses keep your real OS-user `HOME` by default so existing CLI
> credentials under `~` keep working across profiles. Profile data is isolated by `HERMES_HOME`, not by
> changing `HOME`."*

`terminal.home_mode: profile` flips that — tool subprocesses then get `HOME={HERMES_HOME}/home`, and
the operator must populate that home's `~/.ssh`, `~/.gitconfig`, cloud CLI auth and npm state
themselves. `HERMES_REAL_HOME` is exposed to subprocesses either way. Container backends always use
`{HERMES_HOME}/home`.

### Three things a profile is not

The documentation separates these explicitly, because they are the common confusion:

| | What it controls |
|---|---|
| **Profile** | The Hermes state directory (`config.yaml`, `.env`, `SOUL.md`, sessions, memory, logs, cron jobs, gateway state) |
| **Workspace / working directory** | Where terminal commands start — `terminal.cwd`, set separately |
| **Sandbox** | Filesystem limits — *"Profiles do **not** sandbox the agent."* |

> *"On the default `local` terminal backend, the agent still has the same filesystem access as your
> user account. A profile does not stop it from accessing folders outside the profile directory."*

And the isolation test the documentation says does not work: *"Asking the model 'what directory are
you in?' is not a reliable isolation test."*

### One writer per profile

Stated twice, in the profiles page and again in the memory page, because the failure is silent:

> *"Never point two agent processes at the same profile (the same Hermes home). Both write memory
> automatically, and each loads the other's writes into its system prompt at session start — so two
> writers on one home compound each other's state until it stops being anything you configured."*

The prescribed fix is a second profile; shared memory is an [external provider](./05-memory.md#8-external-providers),
not a shared home.

---

## 2. `SOUL.md`

> *"`SOUL.md` is the **primary identity** — it's the first thing in the system prompt and defines who
> the agent is."* · *"It occupies slot #1 in the system prompt, replacing the hardcoded default
> identity."*

| Behaviour | Detail |
|---|---|
| Location | `$HERMES_HOME/SOUL.md` — *"Hermes loads `SOUL.md` only from `HERMES_HOME`"*, and *"does not look in the current working directory"* |
| Seeding | *"Hermes creates a starter `SOUL.md` automatically if one does not exist yet"*; *"Existing user `SOUL.md` files are never overwritten"* |
| Injection | *"the content is injected verbatim after security scanning and truncation"* — no wrapper language is added |
| Empty or unreadable | Falls back to a built-in default identity. The same fallback applies *"when `skip_context_files` is set (e.g., in subagent/delegation contexts)"* |
| Not duplicated | *"SOUL.md is **not** duplicated in the context files section — it appears only once, as the identity"* |
| Truncation | Bounded by `context_file_max_chars` — see [`02`](./02-context-files.md#4-truncation-and-read-timeout) |

**Why `HERMES_HOME` only**, in the vendor's words: *"If Hermes loaded `SOUL.md` from whatever directory
you happened to launch it in, your personality could change unexpectedly between projects. By loading
only from `HERMES_HOME`, the personality belongs to the Hermes instance itself."*

### The shipped default

The repository ships a root `SOUL.md`, and it is one paragraph. It is also the built-in fallback text
quoted on the personality page:

> *"You are Hermes Agent, built by Nous Research. Be direct: match the length of your reply to the
> weight of the ask — a one-line question gets a one-line answer, and finished work gets a short report
> of what changed, what's verified, and what's left, never a replay of the process. No filler ('Great
> question,' 'I'd be happy to'), no restating the request back, no re-summarizing what you already
> said, no narrating tool calls the user can see. Plain claims over adjectives; when unsure, say so
> plainly. Agree because it's right, not because the user said it. Depth is earned — give it when the
> user asks for detail, teaches, or the stakes demand it, not by default."*
> — `NousResearch/hermes-agent`, `SOUL.md` at `v2026.9.7`

---

## 3. The prompt stack

The personality page states the assembly order. This is what "slot #1" means:

| Slot | Content |
|---|---|
| 1 | **`SOUL.md`** (agent identity — or the built-in fallback if unavailable) |
| 2 | tool-aware behavior guidance |
| 3 | memory / user context — [`05`](./05-memory.md) |
| 4 | skills guidance — [`03`](./03-skills.md) |
| 5 | context files (`AGENTS.md`, `.cursorrules`) — [`02`](./02-context-files.md) |
| 6 | timestamp |
| 7 | platform-specific formatting hints |
| 8 | optional system-prompt overlays such as `/personality` |

---

## 4. `SOUL.md` versus `/personality` versus `agent.system_prompt`

Three ways to shape voice, and they do not compose the way the names suggest:

| Surface | Scope | Stored at |
|---|---|---|
| `SOUL.md` | Durable, per-instance baseline | `$HERMES_HOME/SOUL.md` |
| `/personality <name>` | *"a session-level overlay that changes or supplements the current system prompt"* | the selected name in `display.personality` |
| `agent.system_prompt` | A manual system prompt the operator writes | `config.yaml` |

> *"Personalities never touch `agent.system_prompt` — that field is reserved for a manual system prompt
> you write yourself, and it applies only when no personality is selected."*

`/personality none`, `/personality default` and `/personality neutral` all clear the selection, taking
effect on the next message. On the first run after upgrading, *"any saved personality selection is
reset to `none` once"* — a stated one-time migration.

**Fourteen built-in personalities** ship and are *"always available on every surface"*: `helpful`,
`concise`, `technical`, `creative`, `teacher`, `kawaii`, `catgirl`, `pirate`, `shakespeare`, `surfer`,
`noir`, `uwu`, `philosopher`, `hype`. Custom ones — or overrides reusing a built-in name — go under
`agent.personalities` in `config.yaml`.

**Voice is not appearance.** `display.skin` and `/skin` control terminal presentation and are a
separate axis from all three of the above.

---

## 5. Which file does what

The documentation carries a one-page map, and its distinctions are the ones worth holding:

| File | Who writes it | When the agent sees it | Where |
|---|---|---|---|
| `SOUL.md` | **You** (seeded once, never overwritten) | Slot #1, at session start | `$HERMES_HOME/SOUL.md` |
| `USER.md` | **The agent**, via the `memory` tool | Frozen snapshot at session start | `~/.hermes/memories/` |
| `MEMORY.md` | **The agent**, via the `memory` tool | Frozen snapshot at session start | `~/.hermes/memories/` |
| `AGENTS.md` | You, or the project's author | System prompt at startup; nested copies discovered progressively | Project directory and subdirectories |
| `.hermes.md` / `HERMES.md` | You | System prompt at startup, first match wins over `AGENTS.md` | Project — discovery walks up to the git root |

The stated mix-up this table exists to prevent: *"`SOUL.md` and `USER.md` are separate systems that
never feed each other."* Editing `SOUL.md` does not populate memory; memory entries do not change the
persona.
