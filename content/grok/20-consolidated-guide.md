---
status: DRAFT
title: "Grok Build and Grok Bot — the consolidated guide"
tier: reference
project: harness-atlas
product: "Grok Build and Grok Bot — both, read as a pair"
source: "xai-org/grok-build @ 7581004 · docs.x.ai/grok-bot · x.ai/news"
version_at_capture: "Build: commit 7581004, no tags · Bot: beta, unversioned"
source_verified: "2026-09-08"
---

# Grok Build and Grok Bot — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `xai-org/grok-build` at commit `7581004` (no tags) and `docs.x.ai/grok-bot` (beta,
unversioned), **2026-09-08**.

One pass over both products, for a reader with ten minutes. **Every section below says which product
it is about.** Field names and exact quotes live in the numbered documents; this page carries the
shape.

---

## 1. Two products, and the line between them

One vendor ships both. **No primary source resolves them into one system**, and this set found none
either — see §7.

| | **Grok Build** | **Grok Bot** |
|---|---|---|
| What it is | a terminal coding agent you run | a hosted teammate you talk to |
| Licence | Apache-2.0, source published | closed, no repository |
| Where it runs | your machine, or a server you run | a Firecracker microVM in Cursor's cloud |
| Unit of work | a **session** on disk | a **task** given to a named **Bot** |
| Configuration | three TOML files, eight layers | a Bot description, dashboard team rules |
| Enforcement | permission rules, modes, a kernel sandbox | an approval card, a model-based reviewer |
| Extension | skills, plugins, hooks, MCP, subagents | skills, connectors, routines |
| Embedding | ACP over stdio, WebSocket, relay | none published |
| Loop visibility | you run it | not user-visible |

**Three words collide across the pair**, and each names a different object:

- **Skill.** Build: a directory with a `SKILL.md` and fifteen documented frontmatter fields
  ([`05`](./05-build-skills-plugins-and-mcp.md)). Bot: a saved set of instructions with **no documented
  file format** ([`10`](./10-bot-skills-routines-and-automations.md)).
- **Plugin.** Build: a bundle of skills, commands, agents, hooks and MCP servers from a git
  marketplace. Bot: what the app calls a **connector** to a hosted service
  ([`09`](./09-bot-bots-and-the-agent-computer.md) §6).
- **Computer.** Build has none — it runs where you are. Bot's is a per-account VM shared by every Bot
  on that account.

A reader who carries a mechanism across the line is not extrapolating; they are describing a different
product.

---

## 2. Grok Build's mental model

**Configuration resolves down; instructions accumulate up.** `config.toml` resolves through eight
layers with a per-key `pin`/`fleet` override table; `AGENTS.md` and its five aliases concatenate from
repo root to cwd, and a deeper file wins *because the model reads it last*. The first is mechanical.
The second is ordering. — [`02`](./02-build-configuration-and-project-rules.md)

**Authorization is a five-step pipeline, and always-approve cuts it after step two.** Hook → rule →
remembered grant → built-in read-only list → mode policy. `deny` wins *"regardless of order or
source."* — [`04`](./04-build-permissions-and-sandbox.md)

**Only one control is enforced outside the process.** The Landlock/Seatbelt sandbox is kernel-enforced
and unbypassable by any mode — and ships `off`. Everything else is the harness deciding about itself.

**Compatibility is a first-class discovery source, not an import step.** Six `[compat]` cells per
vendor, all defaulting to on, read foreign skills, rules, agents, MCP and hooks **live** at every
session. — [`01`](./01-build-harness-compatibility.md)

---

## 3. Grok Build — the five things most likely to surprise

1. **Hooks fail open, and an untrusted project hook is silently skipped.** *"All failures fail open"*;
   only an explicit `deny` blocks. And a project hook in an untrusted folder does not error — it does
   not run. Enforcement built on a hook has no signal in either case.
   — [`03`](./03-build-hooks.md) §2, §4
2. **`ask` is stronger than `allow`.** A hook's `allow` means *"not blocked"* and never auto-approves;
   a hook's `ask` overrides always-approve, auto mode and saved grants. Under `dontAsk`, an `ask`
   becomes a denial. — [`03`](./03-build-hooks.md) §5
3. **Three settings are silent no-ops in the wrong file.**
   `[ui] disable_bypass_permissions_mode` and `features.image_edit` are `requirements.toml`-only; an
   unverifiable `requirements.toml` starts anyway unless `fail_closed = true` — which lives in the
   same unverified file. — [`02`](./02-build-configuration-and-project-rules.md) §2,
   [`04`](./04-build-permissions-and-sandbox.md) §1
4. **A present-but-empty policy list is a lockdown, not a no-op.** `allowed_mcp_servers = []` blocks
   every server the file binds; `strict_known_marketplaces = []` refuses every add. *"Leave the key
   out"* is the unrestricted state. — [`05`](./05-build-skills-plugins-and-mcp.md) §3
5. **Plan mode does not cover shell writes or subagents.** It blocks the edit tools, *"not shell
   redirection"*, and *"each subagent starts with a fresh plan-mode tracker."*
   — [`07`](./07-build-subagents-and-plan-mode.md) §5

---

## 4. Grok Build — choosing a surface

| You want to… | Use | Document |
|---|---|---|
| State standing conventions in prose | `AGENTS.md` / `.grok/rules/` | [`02`](./02-build-configuration-and-project-rules.md) |
| Set behaviour mechanically | `config.toml` | [`02`](./02-build-configuration-and-project-rules.md) |
| Enforce across a fleet | `managed_config.toml`, signed `requirements.toml` | [`02`](./02-build-configuration-and-project-rules.md) |
| Package a repeatable procedure | Skill | [`05`](./05-build-skills-plugins-and-mcp.md) |
| Ship skills, commands, agents, hooks and MCP together | Plugin + marketplace | [`05`](./05-build-skills-plugins-and-mcp.md) |
| Act on a lifecycle moment, or rewrite a tool call | Hook | [`03`](./03-build-hooks.md) |
| Decide what may run at all | Permission rules + modes | [`04`](./04-build-permissions-and-sandbox.md) |
| Constrain the process itself | Sandbox profile | [`04`](./04-build-permissions-and-sandbox.md) |
| Delegate with different tools or a worktree | Subagent + persona + role | [`07`](./07-build-subagents-and-plan-mode.md) |
| Gate work behind an approved plan | Plan mode | [`07`](./07-build-subagents-and-plan-mode.md) |
| Run it in a pipeline | `grok -p` | [`08`](./08-build-headless-and-agent-mode.md) |
| Drive it from your own program or editor | `grok agent` + ACP | [`08`](./08-build-headless-and-agent-mode.md) |
| Carry another agent's configuration in | `[compat.*]`, `/import-claude` | [`01`](./01-build-harness-compatibility.md) |

---

## 5. Grok Bot's mental model

**One computer per member, many Bots on it.** A Bot is a personality, a conversation and a working
context; it is **not** an isolation unit. *"Bots isolate personalities and workspaces, not compute."*
Which is why the docs say twice not to use separate Bots as a security boundary.
— [`09`](./09-bot-bots-and-the-agent-computer.md)

**A Bot has no identity of its own.** *"Bots act as the signed-in member."* Connector tokens stay on
the backend and never reach the VM; for logins, two-factor and payment, the Bot hands the screen back
to the person. — [`11`](./11-bot-approvals-security-and-teams.md) §3

**Enforcement is a card plus a model.** An approval card names the action and its inputs; Auto Review
rules decide which actions stop. Its **Always Allow** rule is not an allowlist — matching actions
proceed *"only when the automated review does not identify another reason to stop."* Require Approval
always wins. — [`11`](./11-bot-approvals-security-and-teams.md) §2

**Capability arrives by demonstration.** A ten-minute browser recording becomes a draft skill a person
reviews; a routine then attaches it to a schedule or an event. That path — do it, review it, schedule
it — is Grok Bot's distinctive mechanism, and it has no counterpart in Grok Build, whose
`/create-skill` drafts from a description.
— [`10`](./10-bot-skills-routines-and-automations.md)

---

## 6. Grok Bot — the four things most likely to surprise

1. **"Always Allow" does not always allow.** It defers to a model-based reviewer that may still stop
   the action.
2. **Auto Review cannot be locked by an organization.** *"Organization-level lock is not available."*
   A member's approval rules are the member's.
3. **The Enterprise model allowlist is documented as unenforced.** *"Enforcement is not guaranteed;
   onboarding presents an acknowledgement that Grok Bot may not follow the list."*
4. **Approval is prospective only.** *"An approval controls the proposed action. It does not reverse
   work already completed."* — and the audit logs that exist cover *"Admin, security, and
   authentication events"*, not per-action Bot history.

---

## 7. Where the documentation stops

Absences recorded across this set, each naming what was checked. All reads 2026-09-08.

**Spanning both products**

- **No stated relationship between Grok Bot and Grok Build.** No page under `docs.x.ai/grok-bot`
  mentions Grok Build, `grok`, ACP, or a shared runtime; no page under `docs.x.ai/build` mentions Grok
  Bot other than as a sibling navigation entry. Checked the fourteen Bot pages read for this set,
  `docs.x.ai/build/{overview, enterprise, modes-and-commands}`, `x.ai/news` for both launch posts, and
  the repository's `README.md` and `CONTRIBUTING.md`.
  [`09`](./09-bot-bots-and-the-agent-computer.md) §7

**Grok Build**

- **No overall threat model.** Four scoped limits are stated (read-only list, fail-open hooks, sandbox
  off by default, macOS network no-op); no page states a boundary for the system. `SECURITY.md` is a
  seven-line HackerOne referral. Checked UG/18, UG/22, UG/09, `SECURITY.md`.
  [`04`](./04-build-permissions-and-sandbox.md) §5
- **No release identity.** No tags, no releases; the changelog at `x.ai/build/changelog` returns
  **403**. `SOURCE_REV` records a monorepo SHA (`eb4a894`) that resolves to nothing public. Checked
  `gh api …/tags`, `…/releases`, and the changelog URL. [`00`](./00-README.md) §4
- **No subagent concurrency cap**; depth is capped at one, breadth is not stated. Checked UG/16,
  UG/20, UG/26 §`subagents`. [`07`](./07-build-subagents-and-plan-mode.md) §7
- **No signing or provenance check on plugin contents.** `require_sha` pins a commit; nothing verifies
  the author. Checked UG/09, UG/08, `SECURITY.md`. [`05`](./05-build-skills-plugins-and-mcp.md) §5

**Grok Bot**

- **No memory format or location.** Checked `overview`, `bots`, `computer-and-apps`,
  `approvals-security-and-privacy`, `security`, `security-faq`, `faq`,
  `settings-and-notifications`. [`09`](./09-bot-bots-and-the-agent-computer.md) §7
- **No skill file format, and no import or export path.** Checked the six pages named in
  [`10`](./10-bot-skills-routines-and-automations.md) §1.
- **No model identity.** *"Model choice is fully managed by the product"*; no page names a model or a
  version. Checked `overview`, `faq`, `teams-and-enterprises`, `security-faq`.
- **No enumeration of the non-model controls** the security page places beneath Auto Review. Checked
  `security`, `security-faq`, `approvals-security-and-privacy`.
  [`11`](./11-bot-approvals-security-and-teams.md) §7

**Three documented self-disagreements**, carried rather than resolved: the foreign-session cells
("staged and inert" versus three working `/resume-*` skills), the config-layer chain (eight layers on
one page, seven on another, the project layer named only on the first), and the plugin `sha`'s home
(`marketplace.json` in one section, `plugin-index.json` in another). All three quoted in
[`01`](./01-build-harness-compatibility.md) §1, [`02`](./02-build-configuration-and-project-rules.md)
§2 and [`05`](./05-build-skills-plugins-and-mcp.md) §2.

---

## 8. The claims, walked against what this set documented

The two claim ledgers in [`00-README.md`](./00-README.md) record what SpaceXAI says each product is
for. This walks each claim to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, records that
nothing was found and says what was checked, or says the claim falls outside this set's scope. There
is no verdict column and none is implied.

### Grok Build

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"terminal-based AI coding agent… full-screen TUI"* | The TUI is the default entry point; keyboard, theming and terminal-support surfaces are documented (UG/03, 06, 21) and **not covered by this set** — its scope is what a builder configures, not what a user sees. Recorded as scope |
| *"understands your codebase, edits files, executes shell commands, searches the web"* | The built-in toolset and its read-only classification — [`04`](./04-build-permissions-and-sandbox.md) §3; codebase indexing and memory search — [`06`](./06-build-sessions-and-memory.md) §4 |
| *"manages long-running tasks"* | Sessions on disk with resume, fork, rewind and compaction checkpoints — [`06`](./06-build-sessions-and-memory.md) §1; subagents with worktree isolation — [`07`](./07-build-subagents-and-plan-mode.md) §4 |
| *"interactively, headlessly for scripting/CI, or embedded in editors via ACP"* | All three, with flags, four output formats, exit codes and the `x.ai/*` method set — [`08`](./08-build-headless-and-agent-mode.md) |
| *"extensible"* (repo description) · *"easier to explore and extend"* for *"skills, plugins, hooks, MCP servers, or subagents"* | Each of the five named surfaces has a document: [`05`](./05-build-skills-plugins-and-mcp.md), [`03`](./03-build-hooks.md), [`07`](./07-build-subagents-and-plan-mode.md) |
| *"can now run fully local-first: compile it yourself, point it at your own local inference"* | Building from source is documented in `README.md`; the model layer is pluggable via `[model.<id>]` with three API backends. **The model layer is not documented in this set** — UG/11 was read only for its compatibility content. Recorded as scope, not absence |
| *"your settings, rules, and skills come with you… reads the same project conventions other agents use, and imports the rest"* | The whole of [`01`](./01-build-harness-compatibility.md): the `[compat]` switchboard, five discovery surfaces, three mapping tables, `/import-claude` — and §4's fourteen documented divergences, which is where "come with you" stops |
| *"the most direct way to build toward a robust and reliable harness"* (on publishing the code) | **A claim about why the source was published, not about a mechanism.** No mechanism is implied and none was sought |
| *"The public tree is published for source transparency and local builds"* · *"External contributions are not accepted"* | A limit the vendor states about its own repository; carried in the profile's §8. No mechanism in this set |

### Grok Bot

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"AI teammates you can give real work to"* | The Bot object — profile, conversation, enabled skills, routines — [`09`](./09-bot-bots-and-the-agent-computer.md) §1 |
| *"can sign and use apps and websites just like you do"* | The browser on the Agent Computer with persistent sessions, plus the secure handoff for credentials — [`09`](./09-bot-bots-and-the-agent-computer.md) §2, [`11`](./11-bot-approvals-security-and-teams.md) §3 |
| *"on a persistent cloud computer"* · *"a persistent cloud VM with a browser, filesystem, and terminal"* | The per-account Firecracker microVM, `/workspace`, and Update / Recover / Reset — [`09`](./09-bot-bots-and-the-agent-computer.md) §2, [`11`](./11-bot-approvals-security-and-teams.md) §3 |
| *"your team of always-on agents… keep working 24/7"* | Routines on a schedule or an event, running detached, 50 per Bot with 20 run records — [`10`](./10-bot-skills-routines-and-automations.md) §2 |
| *"a durable AI teammate with… working context that develops over time"* | Stated as a capability; **the mechanism is not documented**. Checked the eight pages named in [`09`](./09-bot-bots-and-the-agent-computer.md) §3 — no format, no location, no retention rule for a Bot's memory |
| *"a reusable set of instructions for how to do a task"* (skill) | Creation by asking and by ten-minute demonstration, with a human review step — [`10`](./10-bot-skills-routines-and-automations.md) §1. **The artifact itself is undocumented**: no file format, no export |
| *"Grok Bot layers defenses… beneath it sit controls that do not depend on any model's judgment"* | The model-dependent layer is Auto Review — [`11`](./11-bot-approvals-security-and-teams.md) §2. **The non-model layer is named but not enumerated**; checked `security`, `security-faq`, `approvals-security-and-privacy` |
| *"Grok Bot is in beta… on desktop and iOS"* (2026-08-11) | Platform support today reads *"iPhone with iOS 18 or later, or a phone with Android 9 or later"*, and the FAQ's exclusion is iPad — [`09`](./09-bot-bots-and-the-agent-computer.md) §5. Both read directly; the launch post is a dated statement, not a current one |
