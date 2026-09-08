---
title: "Hermes Agent — the learning-loop reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "https://hermes-agent.nousresearch.com/docs"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
status: ACTIVE
verification:
  derived_from:
    - "NousResearch/hermes-agent @ v0.21.1 (tag v2026.9.7, released 2026-09-07; repo HEAD pushed 2026-09-08) — website/docs/ markdown sources, README.md, SECURITY.md, SOUL.md"
    - "hermes-agent.nousresearch.com/docs — read 2026-09-08"
    - "product and repository copy — hermes-agent.nousresearch.com landing page, the GitHub repository description — captured 2026-09-08"
  grounded_against:
    - "the profile at ../hermes.md, read against v0.21.0 (tag v2026.8.31) on 2026-09-02"
    - "documentation sources opened directly: features/{memory,curator,skills,hooks,cron,kanban,kanban-worker-lanes,plugins,context-files,personality,overview}, user-guide/{security,profiles,configuration,which-file-does-what}"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Standard, leaning Exhaustive where the
    material supports it) and scope (the hermes-agent Python personal-agent harness, matching the
    profile's boundary) were agreed before reading, per the harness-deep-read skill's step one.
---

# Hermes Agent — the learning-loop reference set

**This folder is the deep read for the Template v2 profile at [`../hermes.md`](../hermes.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of Hermes Agent's own documentation and repository files, organised by
**the surfaces Hermes names** — profile, `SOUL.md`, context file, skill, `skill_manage`, memory,
Curator, hook, approval, kanban task, cron job, plugin. Cut by Hermes's vocabulary rather than by this
atlas's 33 components, which is what makes it the profile's complement rather than a second copy of it.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot answer
*how does this surface actually work* without becoming something nobody reads in thirty seconds. This
folder is that grain: the two memory character caps and what happens at the boundary, the Curator's
four thresholds and the three-condition test for whose skills it may touch, the deny-glob matching
semantics, every kanban event with its payload, and the security policy's own statement of what none of
it is.

---

## Scope and depth

**Depth: Standard, leaning Exhaustive where the material supports it.** Eleven surface documents plus
this index and the guide. Where a surface publishes a full field or event table scattered across
several pages — the kanban event reference, the gateway hook events, the approval trigger list — it is
assembled here in one place. Where the vendor documents something adequately on one page, this set
links rather than restates.

**Scope: the `hermes-agent` Python personal-agent harness**, which is the boundary the profile draws.
Every document has a counterpart in the profile's §6; nothing here is wider than the profile.

**Deliberately not documented here**, and named so their absence is not read as a finding: the
messaging gateway's 35 platform adapters, the desktop and TUI applications, the web dashboard, voice
and media surfaces, provider routing and model configuration, and deployment topology. These are
surfaces of the same product, covered at profile grain in `../hermes.md` §6, and none of them turns on
a mechanism this set's readers would come here for.

**The shape found, and why it is Hermes's rather than ours.** Hermes publishes three outlines that do
not nest. `website/docs/` — rendered as the hosted documentation site — is cut by feature and is the
substantive text. The repository's own `docs/` directory is a **different corpus entirely**: design
specs, RFCs, an ADR file, `profile-routing.md`, `session-lifecycle.md`, `state-db-recovery.md`,
observability and security notes, and a kanban design PDF. And the features page's own `overview.md`
is **not a complete index of the features directory** — the Curator and Kanban both have pages that
`overview.md` does not list. This set follows the first outline, adds the two unlisted surfaces, and
takes `SECURITY.md` and the root `SOUL.md` from the repository root where they are the only source.

---

## What Nous Research says Hermes is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing the
vendor is the sole authority on — recorded as claims, never as findings.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §8 walks them against the mechanisms this set
documents.

| Claim | Source | Captured |
|---|---|---|
| *"The Agent That Grows With You"* | `hermes-agent.nousresearch.com`, landing page headline | 2026-09-08 |
| *"The agent that grows with you"* | `github.com/NousResearch/hermes-agent`, repository description | 2026-09-08 |
| *"**The self-improving AI agent built by Nous Research.** It's the only agent with a built-in learning loop — it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions."* | repository `README.md` | 2026-09-08 |
| *"The self-improving AI agent built by Nous Research. The only agent with a built-in learning loop — it creates skills from experience, improves them during use, nudges itself to persist knowledge, and builds a deepening model of who you are across sessions."* | `hermes-agent.nousresearch.com/docs`, documentation introduction | 2026-09-08 |
| *"A closed learning loop — Agent-curated memory with periodic nudges. Autonomous skill creation after complex tasks. Skills self-improve during use. FTS5 session search with LLM summarization for cross-session recall."* | repository `README.md` | 2026-09-08 |
| *"Persistent Memory — It learns your projects, auto-generates skills, and never forgets how it solved a problem."* | `hermes-agent.nousresearch.com`, landing page | 2026-09-08 |
| *"Bounded, curated memory that persists across sessions. Hermes remembers your preferences, projects, environment, and things it has learned."* | `docs/user-guide/features/overview` | 2026-09-08 |
| *"On-demand knowledge documents the agent can load when needed. Skills follow a progressive disclosure pattern to minimize token usage."* | `docs/user-guide/features/overview` | 2026-09-08 |
| *"Fully customizable agent personality. `SOUL.md` is the primary identity file and primary element in system prompt"* | `docs/user-guide/features/overview` | 2026-09-08 |
| *"Run custom code at key lifecycle points for logging, alerts, webhooks, and tool interception."* | `docs/user-guide/features/overview` | 2026-09-08 |
| *"Add custom tools, hooks, and integrations without modifying core code through three plugin types"* | `docs/user-guide/features/overview` | 2026-09-08 |
| *"Built-in cron scheduler with delivery to any platform. Daily reports, nightly backups, weekly audits — all in natural language, running unattended."* | repository `README.md` | 2026-09-08 |
| *"Focused Automation — Natural-language scheduling for reports, backups, and briefings — running unattended through the gateway, focused every time."* | `hermes-agent.nousresearch.com`, landing page | 2026-09-08 |
| *"Isolated Sandboxing — Five backends — local, Docker, SSH, Singularity, Modal — with container hardening and namespace isolation."* | `hermes-agent.nousresearch.com`, landing page | 2026-09-08 |
| *"Seven terminal backends — local, Docker, SSH, Singularity, Modal, Daytona, and Vercel Sandbox."* | repository `README.md` | 2026-09-08 |
| *"Compatible with the agentskills.io open standard."* | repository `README.md` | 2026-09-08 |
| *"Run it on a $5 VPS, a GPU cluster, or serverless infrastructure that costs nearly nothing when idle. It's not tied to your laptop — talk to it from Telegram while it works on a cloud VM."* | repository `README.md` | 2026-09-08 |

**Note on the last two backend rows.** The landing page says five, the README says seven, and both were
captured the same day. Recorded as two claims, not reconciled.

---

## Provenance and freshness

> **Read against `hermes-agent.nousresearch.com/docs` and `NousResearch/hermes-agent` at
> `v0.21.1` (tag `v2026.9.7`), 2026-09-08. A surface that has shipped since is not here.**

`v2026.9.7` was released **2026-09-07**; the repository was last pushed **2026-09-08**, so the working
tree is ahead of the tag. Nothing here rests on unreleased commits.

The release itself declines to enumerate what it contains: *"Measured at commit `6178e9f4…`, the window
since v0.21.0 contains **5,139 non-merge commits** across **4,364 changed files** … This patch does not
attempt to enumerate or announce every feature in the window. **Full curated release notes for this
window will ship with v0.22.0.**"* A reader wanting a changelog between the profile's pin and this one
does not have one yet.

**The profile is one release behind and six days older.** [`../hermes.md`](../hermes.md) was read
against **v0.21.0 (tag `v2026.8.31`)** on **2026-09-02**; this set re-pins to **v0.21.1 (tag
`v2026.9.7`)** read **2026-09-08**. Where the two differ, this set is newer. Neither is wrong; they are
six days and one release apart. The visible differences:

| Fact | Profile, 2026-09-02 | This set, 2026-09-08 |
|---|---|---|
| Hook systems | *"Three hook systems"* plus outbound webhooks noted separately | *"four hook systems"*, with outbound webhooks counted as the fourth |
| Project context assembly | Files *"assembled under `# Project Context` header"* in priority order | *"Only **one** project context type is loaded per session (first match wins)"*, with a merged git-root-downward chain **within** the winning type; `AGENTS.override.md` and `.cursor/rules/*.mdc` are also listed |
| The plugin no-sandbox statement | *"No sandbox: Capabilities are trust/audit layers, not isolation; plugins run as native Python."* | *"Capabilities are a **consent and audit layer**, not isolation. Plugins run as regular in-process Python: a malicious plugin can ignore every gate here."* |
| The `SECURITY.md` refusal | *"nothing inside the agent process constitutes containment — not the approval gate, not output redaction, not any pattern scanner."* | The same sentence, extended: *"…, not any pattern scanner, **not any tool allowlist**."* — and preceded by *"**The only security boundary against an adversarial LLM is the operating system.**"* |

**Where the documentation lives.** The hosted site renders `website/docs/` from the repository; those
markdown sources were the primary text for this read. The repository's separate `docs/` directory is
design material, not the user guide — a reader who starts there will not find the surfaces documented
here. And `website/docs/user-guide/features/overview.md` omits at least two features that have their
own pages in the same directory (Curator, Kanban), so it should not be treated as the feature index.

**Refresh protocol.**

```bash
# The current tag, and whether the tree has moved past it.
gh api repos/NousResearch/hermes-agent/releases/latest --jq '.tag_name + "  " + .published_at'
gh api repos/NousResearch/hermes-agent --jq '.pushed_at'

# The docs source of truth — a new file here is a new surface.
gh api repos/NousResearch/hermes-agent/contents/website/docs/user-guide/features \
  --jq '.[] | .name + "  " + (.size|tostring)'

# The trust model, which is the one document that constrains how everything else reads.
gh api repos/NousResearch/hermes-agent/contents/SECURITY.md --jq '.content' | base64 -d
```

When you refresh, update `source_verified` and `version_at_capture` in each file's frontmatter. A
reference doc with a stale date is more dangerous than no reference doc, because it will be trusted.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-profiles-and-soul.md`](./01-profiles-and-soul.md) | The profile as `HERMES_HOME`, `HERMES_HOME` versus `HOME`, `SOUL.md`'s slot #1 and the eight-slot prompt stack, the fourteen personalities, the which-file-does-what map |
| 02 | [`02-context-files.md`](./02-context-files.md) | The seven context files, exclusive first-match selection, the git-root-downward merged chain, progressive subdirectory discovery, truncation and read timeout |
| 03 | [`03-skills.md`](./03-skills.md) | `SKILL.md` frontmatter and section order, progressive disclosure's three levels, the project→local→external precedence ladder, project trust and scan-time quarantine, the eight install sources, the four trust levels, bundles |
| 04 | [`04-the-learning-loop.md`](./04-the-learning-loop.md) | The three writers and why only one is curated, every `skill_manage` action, the advisory linter's two named rules, the background review's cadence, cost, cache parity and deferral, `/learn`, and both write gates |
| 05 | [`05-memory.md`](./05-memory.md) | The 2,200 and 1,375-character caps, the overflow error verbatim, the frozen-snapshot rule, the three tool actions and substring matching, three distinct off-states, `session_search`, `/journey` |
| 06 | [`06-curator.md`](./06-curator.md) | The four thresholds, the three-condition agent-created test, `created_by` as a policy flag, adoption, pinning and protected built-ins, the usage sidecar, and undo at three depths |
| 07 | [`07-hooks.md`](./07-hooks.md) | All four hook systems, every gateway event with its context keys, the plugin event catalogue and its timeout semantics, the shell-hook wire protocol including `modify`, fail-open versus fail-closed, the consent model and its stated gap |
| 08 | [`08-approvals-and-write-safety.md`](./08-approvals-and-write-safety.md) | Approval modes and the three headless defaults, the hardline blocklist, `approvals.deny`'s matching semantics, every approval trigger, protected write paths — and the security policy's refusal to call any of it a boundary |
| 09 | [`09-kanban.md`](./09-kanban.md) | The lifecycle it owns, three workspace kinds, the dispatcher's nine environment variables, the four lifecycle terminators, lane shapes, six handled failure modes, and every `task_events` kind with its payload |
| 10 | [`10-cron.md`](./10-cron.md) | The 60-second tick, model resolution and the drift guard, pre-dispatch validation, the attempt ledger and its replay limits, all five schedule formats, no-agent mode |
| 11 | [`11-plugins-and-extension-points.md`](./11-plugins-and-extension-points.md) | Every `ctx.*` registration point, five discovery sources and two opposite collision rules, what `plugins.enabled` does not gate, capability consent and update re-consent, the per-server MCP allowlist |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, six rules, the loop end to end, enforcement ordered — and the claims above walked against what this set documented** |

Read **20** if you have ten minutes. The numbered references are lookup material; read them when you
need an exact field name.

---

## How to read these

- **Exact names are preserved verbatim.** Config keys, event names, thresholds, CLI verbs and file
  paths are quoted as the source spells them. Where two of the vendor's own pages disagree, both are
  carried with their dates rather than reconciled.
- **Absences name what was checked.** They are collected in [`20`](./20-consolidated-guide.md) §7,
  alongside two places the vendor's own pages disagree with each other. None says "appears to lack".
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
