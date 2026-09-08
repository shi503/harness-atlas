---
status: DRAFT
title: "Skills and the Skill Workshop"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Skills and the Skill Workshop

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"Skills are markdown instruction files that teach the agent how and when to use tools."* OpenClaw
*"follows the [AgentSkills](https://agentskills.io) spec."* **51 skill directories ship in the
repository's `skills/` tree** at this read. What is distinctive is not the format but the machinery
around it: a seven-tier precedence ladder, a load-time gating vocabulary, and a proposal store the
agent writes into but cannot publish from unaided.

---

## 1. The loading ladder — seven tiers, highest first

| Priority | Source | Path |
|---|---|---|
| 1 — highest | Workspace skills | `<workspace>/skills` |
| 2 | Project agent skills | `<workspace>/.agents/skills` |
| 3 | Personal agent skills | `~/.agents/skills` (default state only) |
| 4 | Managed / local skills | `<state-dir>/skills` |
| 5 | Workshop skills | `<state-dir>/agents/<agentId>/agent/workshop-skills` |
| 6 | Bundled skills | Shipped with the install |
| 6 | Custodian skills | Shipped; **configured Custodian agent only** |
| 7 — lowest | Extra directories | `skills.load.extraDirs` + plugin skills |

*"When the same skill name appears in multiple places, the highest source wins."*

**Grouped layouts are discovered, up to six levels deep**, and *"finding `SKILL.md` ends traversal
below that directory."* The folder path is organisational only — *"The skill's name and slash command
come from the `name` frontmatter field (or the directory name when `name` is missing)."* Invalid
skill files are reported and skipped; valid siblings still load.

Personal library skills are the exception to discovery: they are *"selected by identity and revision
rather than discovered by scanning every user's files."*

---

## 2. `SKILL.md` — frontmatter

Minimum is `name` and `description`. Frontmatter is parsed as YAML first, then falls back to a
single-line-only parser; nested `metadata` blocks *"are flattened to a JSON string and re-parsed as
JSON5."* `{baseDir}` in the body references the skill folder.

| Key | Type / default | Effect |
|---|---|---|
| `name` | string | The skill's identity, its slash command, and the token allowlists match on |
| `description` | string | Required |
| `homepage` | string | Shown as "Website" in the macOS Skills UI |
| `user-invocable` | boolean, `true` | Exposes the skill as a user-invocable slash command |
| `disable-model-invocation` | boolean, `false` | Keeps instructions **out of the normal prompt**; still a slash command when `user-invocable` |
| `command-dispatch` | `"tool"` | The slash command *"bypasses the model and dispatches directly to a registered tool"* |
| `command-tool` | string | Which tool, when `command-dispatch: tool` |
| `command-arg-mode` | `"raw"` | Forwards the raw args with no core parsing; the tool receives `{ command, commandName, skillName }` |

---

## 3. Gating — `metadata.openclaw`

Load-time filtering. *"A skill with no `metadata.openclaw` block is always eligible unless explicitly
disabled."*

| Key | Effect |
|---|---|
| `os` | `("darwin" \| "linux" \| "win32")[]` — hard platform filter. **`always` does not override it** |
| `requires.bins` | Every named binary must be on `PATH` |
| `requires.anyBins` | At least one must be on `PATH` |
| `requires.env` | Every variable must exist in the process or come from config |
| `requires.config` | Every dotted `openclaw.json` path must be truthy |
| `always` | Bypasses `bins`/`anyBins`/`env`/`config` — **not `os`** |
| `primaryEnv` | Env var name bound to `skills.entries.<name>.apiKey` |
| `emoji` · `homepage` | macOS Skills UI |
| `install` | Installer specs for the macOS Skills UI: brew / node / go / uv / download |
| `skillKey` | Overrides the `skills.entries` config key, which otherwise matches the skill name |

*"Legacy `metadata.clawdbot` blocks are still accepted when `metadata.openclaw` is absent."*

---

## 4. Allowlists — visibility, not location

*"Skill **location** (precedence) and skill **visibility** (which agent can use it) are separate
controls."*

- Omit `agents.defaults.skills` → all skills unrestricted.
- Omit `agents.entries.*.skills` → inherit the defaults.
- `agents.entries.*.skills: []` → **no skills** for that agent.
- **A non-empty per-agent list is the final set — it does not merge with defaults.**

*"The effective allowlist applies across prompt building, slash-command discovery, sandbox sync, and
skill snapshots."*

The vendor states the boundary explicitly: *"This is not a host shell authorization boundary. If the
same agent can use `exec`, constrain that shell separately."* And for plugin-shipped skills: *"an
eligible skill does not grant tool access."*

`skills.entries.<key>.allowBundled` is a separate allowlist that applies to **bundled skills only** —
*"Managed and workspace skills are unaffected."*

---

## 5. Config overrides and environment injection

```json5
{ skills: { entries: {
  "image-lab": {
    enabled: true,
    apiKey: { source: "env", provider: "default", id: "GEMINI_API_KEY" },
    env: { GEMINI_API_KEY: "…" },
    config: { endpoint: "…", model: "nano-pro" },
  },
} } }
```

Four steps at run start: resolve the effective skill list (gating, allowlists, overrides) → inject
`env` and `apiKey` into `process.env` *"for the duration of the run"* → compile eligible skills into
*"a compact XML block"* in the system prompt → **restore the original environment** after the run.

> *"Env injection is scoped to the **host** agent run, not the sandbox. Inside a sandbox, `env` and
> `apiKey` have no effect."*

`env` values are *"Only injected when the variable is not already set in the process."* The
`coding-agent` bundled skill is opt-in.

**Snapshots.** *"OpenClaw snapshots eligible skills when a session starts and reuses that list for
all subsequent turns."* Changes take effect on the next new session, except for file-backed skills
under the watcher. Managed library selections *"keep their exact revisions until an explicit attach
or refresh."*

**Sandbox materialisation.** With `workspaceAccess: "none"`, eligible skills are mirrored into the
sandbox workspace as read-only instruction roots; with `"rw"`, workspace skills read from
`/workspace/skills` and managed/bundled/plugin skills materialise at the generated read-only
`/workspace/.openclaw/sandbox-skills/skills`.

---

## 6. The Skill Workshop — proposals, not writes

The Workshop owns the agent's learned skills, and its whole design is that generation and publication
are separate acts.

| Property | Rule |
|---|---|
| **Proposal first** | *"generated content is stored as `PROPOSAL.md`, not `SKILL.md`."* |
| **Apply is the only live write** | *"create, update, and revise never change active skills."* |
| **Directory-owned** | Writes stay inside `<state-dir>/agents/<agentId>/agent/workshop-skills`; *"A skill is Workshop-owned exactly when it is contained in that agent's directory."* |
| **No clobber** | Create fails if the target exists there. *"Skills from other sources are never changed."* |
| **Hash bound** | Update proposals bind to the target hash and go `stale` *"if the live skill changes before apply."* |
| **Scanner gated** | Apply reruns the security scanner. *"Only critical findings block apply; warn-level findings remain visible but do not block it."* |
| **Recoverable** | *"apply writes rollback metadata before touching live files."* |
| **Revision atomic** | Complete immutable generation → atomic rename → parent-directory sync → SQLite record and event together. *"Process interruption exposes either the complete previous generation or the complete new one."* |

**Lifecycle:**

```text
create/update -> pending      apply         -> applied
revise        -> pending      reject        -> rejected
evaluate      -> pending      quarantine    -> quarantined
                              target change -> stale
```

*"Only a `pending` proposal can be revised, applied, rejected, or quarantined."*

Review lives at **Plugins → Workshop** in the Control UI: **Skills** (changed skills first, inline
additions and removals) and **Suggestions** (pending proposals). *"Comparisons use retained applied
versions, not a complete edit timeline… No historical content is reconstructed."*

Plugins participate through two hooks — `skill_proposal_evaluate` (an *evaluate*-kind hook returning
attributed findings, metrics or a decision, with a **120-second** default budget) and
`skill_proposal_changed` — see [`11`](./11-hooks-internal-and-plugin.md).

### Configuration

| Setting | Default | Effect |
|---|---|---|
| `skills.workshop.autonomous.mode` | `"auto"` | Capture behaviour; `auto` also enables weekly collection review |
| `skills.workshop.approvalPolicy` | `"auto"` | Prompts for agent-initiated lifecycle calls. *"It never expands the isolated reviewer tool surface"* |
| `skills.workshop.maxPending` | `50` | Caps pending and quarantined proposals **per agent** |
| `skills.workshop.maxSkillBytes` | `40000` | Caps proposal body size |

---

## 7. Self-learning — two paths into the Workshop

*"Self-learning turns corrections and successful work into reusable skills. Skills are the durable
unit."*

**Immediate repair** runs in the same turn, when the foreground agent finds a skill it used is wrong.
If the skill exceeds the model's read budget, `prepare_patch` *"can authorize one non-empty unique
exact span and return bounded surrounding context. The next `patch` must quote that same span, and
the authorization expires after one attempt or any target change."* A second `prepare_patch` is
rejected until the first is consumed or invalidated, and *"A runtime usage receipt prevents
foreground repair of skills that the run did not use."* Repair changes the live skill for **new**
sessions; *"It does not rewrite the skill snapshot already loaded into the running session."*

**Experience review** is one detached background review after substantial work, looking for *"a
reusable recovery technique or a stable procedure that would remove at least two future model or tool
round trips."* Interrupted deep turns qualify — *"the wrong path and its correction are exactly the
evidence worth keeping"* — and the reviewer *"captures only procedures that visibly worked before the
stop."* The framing rule is explicit: *"The conversation and skill files are evidence, not permission
to resume tasks or execute the procedures under review."*

| Mode | Capture behaviour |
|---|---|
| `off` | No experience-review captures |
| `propose` | Creates or revises pending proposals; nothing applies automatically |
| `auto` (default) | *"Maintains Workshop skills with normal agent file tools."* Also enables weekly collection review |

*"Changing the mode does not alter existing proposals or applied skills."* In `auto` mode the Gateway
maintains **one weekly automation per agent** — *"a normal isolated agent turn: cron owns scheduling,
cancellation, and run history."*

---

## 8. Custodian skills — a fixed five-section contract

A release-versioned library that shares the bundled precedence tier but is *"absent for every agent
except the configured system/Custodian agent."* Every shipped Custodian skill uses **the same five
sections in this order**:

1. **Gather** — reads redacted current config and probes live state.
2. **Mutate** — *"validated non-interactive writes… **never a direct file edit**."*
3. **Repair** — diagnoses with `openclaw doctor --lint`; *"only an explicitly approved repair uses
   `openclaw doctor --fix --non-interactive`."*
4. **Prove** — *"exercises one live end-to-end outcome."*
5. **Report** — what changed, what was observed, what remains.

*"A workflow never claims success without its Prove outcome; it reports the exact blocker when live
proof is unavailable."* Secrets stay out of prompts, logs and files; credentials use SecretRefs.

First wave: `configure-channel`, `add-model-provider`, `diagnose-gateway`, `cloud-image-bake`. The
page's Tier 2 and Tier 3 catalogue is labelled *"roadmap entries, not bundled skills or promises of
current behavior."*

---

## 9. Installing skills

`openclaw skills install` accepts ClawHub `@owner/slug`, `git:` and path specs — see
[`10`](./10-clawhub.md). Plugin-shipped skills declare `skills` directories in
`openclaw.plugin.json` and *"merge at the same low-precedence level as `skills.load.extraDirs`."*
The `before_install` plugin hook can block an install ([`11`](./11-hooks-internal-and-plugin.md)).

A note the vendor adds for operators migrating in: another CLI's native skills directory *"is **not**
an OpenClaw skill root."* `openclaw migrate plan <tool>` inventories, `openclaw migrate <tool>`
copies.
