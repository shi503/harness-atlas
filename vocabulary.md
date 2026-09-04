---
title: "Vocabulary — the term ledger"
status: DRAFT
owner: KD
created: "2026-09-02"
updated: "2026-09-04"
provenance: OBSERVED
---

# Vocabulary

**Why this file exists.** Two systems doing the same thing under different names are unclassifiable
without it; one word doing two jobs is worse. Filled in W3 (`fractal/workstreams/W3-vocabulary-ledger.md`)
from every profile's primitive table and every `●` in the two grids.

**Rule.** The *concept* column is the vendor's words, cited. The *component* column is our
classification, by the 33 IDs in `index.md` §3. Never let the two swap.

**How to read a row.** `Where` names the profile and section the quote lives in (a profile is a primary
read; `↪` marks a short teardown or a draft, not yet a Template profile). Flags: **COLLISION** one word,
two referents · **SYNONYM** two words, one referent · **ORPHAN** one of the five nouns no grid has a row
for · **UNDERCOUNT** the vendor names it, our profile's §C did not · **DRAFT** the only source is a draft.

**Two standing lines.** `workspace` and `session` are collisions at four and five referents; **neither
may name a future component.** `harness` is this atlas's category noun and an altitude
(`comparisons/04-harness-alignment.md` §4.1); a vendor that uses it as a primitive gets its own row and
does not move the category.

---

## 1. Concepts

### 1.1 Collisions — one row per referent

| Word | Referent (vendor's words) | Who | Where | Component |
|---|---|---|---|---|
| `workspace` | "Directory containing `SOUL.md`, `AGENTS.md`, `USER.md`, and local files" — a per-agent config directory | OpenClaw | `content/openclaw.md` §C *Agent* | `3d` Configuration |
| `workspace` | "Files persist in a shared workspace at `/workspace`… All of your Bots use the same persistent cloud computer" — a shared VM filesystem root | Grok Bot | `content/grok.md` §C.2 | `6b` Infrastructure |
| `workspace` | "Trust is saved per workspace, keyed on the git repository root" — a trust gate | Claude Code | `content/claude-code/08-policy-and-governance.md` | `2c` Enforcement |
| `workspace` | `workspace/` holds "threads, handoffs, locks" — a coordination-state folder | Indigo HQ ↪ | `comparisons/systems/indigo-hq.md` *Layout* | `3a` Control |
| `workspace` | `experimental_workspace` — a plugin API for pluggable isolated execution environments | OpenCode | `content/opencode.md` §B `6b` | `6b` Infrastructure |
| `workspace` | `workspaces/<task-slug>/` bundles worktrees across N repos for one task | HumanLayer ↪ | `comparisons/systems/humanlayer.md` | `6b` Infrastructure · `7a` Workflow Tasks |
| `session` | "Sessions are stored as JSONL files with a tree structure… `id` and `parentId`, enabling in-place branching" — the transcript, which is also the run receipt | Pi | `content/pi.md` §C | `5a` Individual Memory · `8b` Evidence |
| `session` | "A conversation tied to your current directory, with its own independent context window… stored under `~/.claude/projects/`" | Claude Code | `content/claude-code-draft.md` §C **DRAFT** | `5a` · `8b` |
| `session` | "Session key is a routing selector, not an authorization token" — a routing key for a message stream | OpenClaw | `content/openclaw.md` §C | `3b` Routing |
| `session` | "When an agent is *running* it is a **session** — a live process the platform can start, stop, prompt, and observe" | Gas City | `content/gas-city.md` §C *(supporting)* | `6b` Infrastructure |
| `session` | The loop's own unit — `Codex` / `Session` / `Task` / `Turn`; the persisted record is the **Thread** | Codex | `content/codex.md` §A, §C | `2a` Adapters & Middleware (loop) · `8b` (Thread) |
| `agent` | A markdown file with frontmatter (`mode: primary \| subagent \| all`) — agent-as-file | OpenCode, Claude Code, Grok | `content/opencode.md` §C · `content/grok.md` §C.1 | `3c` Composition · `10a` Roster |
| `agent` | `agents.entries.<agentId>` with a `workspace` directory and an `agentDir` — agent-as-directory | OpenClaw | `content/openclaw.md` §C | `3c` · `10a` |
| `agent` | "WHO — a configured worker — name, provider, prompt template, scope — pure configuration" — agent-as-tuple | Gas City | `content/gas-city.md` §C | `3c` · `10a` |
| `command` | A slash-command template: frontmatter `template`, `$ARGUMENTS`, invoked `/name` | OpenCode | `content/opencode.md` §C | `4a` Capability |
| `command` | `hq run` — "Agents exec via `hq run` and never see raw credentials" — a credential-shielded execution wrapper | Indigo HQ ↪ | `comparisons/systems/indigo-hq.md` *Secrets* | `2c` Enforcement |
| `policies` | "Policies control whether OpenCode may use configured resources like LLM providers" — distinct from permissions | OpenCode | `content/opencode.md` §C *(experimental)* | `4b` Capability Permissions |
| `policies` | Company-level configuration loaded from the multi-tenancy layer | Indigo HQ ↪ | `comparisons/systems/indigo-hq.md` | `3d` Configuration · `10b` Org |
| `harness` | The category noun — a runtime, a gateway/host, a process layer, a hosted product | this atlas | `comparisons/04-harness-alignment.md` §4.1 | an altitude, not a component |
| `harness` | "The wiring between model and context" — a named primitive | gstack / gbrain ↪ | `comparisons/systems/gstack-gbrain.md` | `2a` Adapters & Middleware |
| `harness` | "the implementation that provides an agent runtime (code term)" — one level under the gateway | OpenClaw | `content/openclaw.md` §C *Agent runtime* | an altitude (runtime) |
| `bot` | "A Bot is a durable AI teammate with a name, a job, its own conversation, and working context" — a hosted product | Grok Bot | `content/grok.md` §C.2 | `10a` Roster |
| `bot` | "Bot Mode" — a roster of named Bots, each a profile | Hermes | `content/hermes.md` §B `10a` **UNDERCOUNT** | `10a` Roster |

### 1.2 Synonym sets — one row per concept

| Concept | The words, by system | Where | Component |
|---|---|---|---|
| **Instruction files** the loop reads at start | Pi `context file` (`AGENTS.md`/`CLAUDE.md`, concatenated up the tree) · Hermes `context file` · Grok Build `project rules` · OpenCode `rules` · OpenClaw `workspace bootstrap files` · Codex `AGENTS.md` (+ `AGENTS.override.md`) · Claude Code `CLAUDE.md` + `.claude/rules/` · generic-cerebro `rule file` (glob-scoped, kept distinct) | `content/{pi,hermes,grok,opencode,openclaw,codex}.md` §C · `content/claude-code/07-context-and-memory.md` · ↪ `comparisons/systems/kd-built-frameworks/02-generic-cerebro.md` | `3d` Configuration |
| **Skill** — the Agent Skills standard | Pi · OpenCode · Grok · Claude Code · Hermes · OpenClaw · Codex all say *skill*; Gas City symlinks skills into each provider's convention | every profile §C; `content/gas-city.md` §B `4a` | `4a` Capability |
| **Hooks** — named separately or folded | *Named*: Claude Code, Hermes, OpenClaw, Grok (fail-open), Codex (11 events) · *Folded into one extension object*: Pi `extension`, OpenCode `plugin`. A design disagreement, not a labelling one | `content/{hermes,openclaw,grok,codex}.md` §C · `content/pi.md` §C *Extension* · `content/opencode.md` §C *Plugin* | `2b` Hooks |
| **One container, many resource types** | Pi `pi package` · Claude Code `plugin` · Grok `plugin / marketplace` · OpenClaw `plugin` (ClawHub) · Hermes `plugin` · Codex `plugin` (bundles skills, MCP server) · Gas City `pack` ("the City *is* a pack") | profiles §C | `4a` Capability |
| **Permission posture** — three tiers under different names | Claude Code `permission mode` (default · acceptEdits · plan · auto · dontAsk · bypassPermissions) · OpenCode `permission` (allow · ask · deny; deny survives `--auto`) · Grok Build `permission rule / mode` · Grok Bot `approval / auto-review rule` · Codex `permission profile` (+ `sandbox_mode`, coexisting) · Hermes `toolset` · OpenClaw `tool policy / exec approvals` · QM `posture` (strict · auto · dangerous, monotonic narrowing) · Indigo HQ `hook profile` (minimal · standard · strict) | profiles §C · ↪ `comparisons/systems/{qm,indigo-hq}.md` | `2c` Enforcement · `4b` Capability Permissions |
| **Delegation object** | Claude Code `subagent` (+ `agent team`, experimental) · Codex `subagent` · Grok `agent / subagent / persona / role` (three objects where the row wants one) · Hermes `profile` · Pi: example only, not shipped (`EX/subagent`) | profiles §C | `3c` Composition |
| **Cadence** | Hermes `cron job` · OpenClaw `automation (cron) / heartbeat` · Grok Bot `routine` · Gas City `order` (supporting) | profiles §C | `9c` Cadence |
| **The unit of work, written down** | Gas City `bead` · Hermes `kanban task` ("owns lifecycle truth") · FRACTAL `workstream (PRD)` · generic-cerebro `blueprint → workstream → handoff` · Indigo HQ `ralph loop` · HumanLayer plan file · OpenClaw: **six** task-shaped objects at one row (background tasks · task flows · goals · standing orders · standing intents · workboard) — the accommodation failure `02-component-matrix.md` names | `content/{gas-city,hermes,fractal,openclaw}.md` · ↪ `comparisons/systems/{indigo-hq,humanlayer}.md` | `7a` Workflow Tasks |
| **Memory files** | Hermes `MEMORY.md` / `USER.md` (hard caps, frozen snapshot at start) · OpenClaw the same filenames ("by lineage") · Claude Code auto memory · Codex `memories/` (git-baselined, two-phase, no approval gate) | `content/{hermes,openclaw,codex}.md` §C · `content/claude-code/07-context-and-memory.md` | `5a` Individual Memory |
| **Identity file** | `SOUL.md` — Hermes ("slot #1 in the system prompt") and OpenClaw, same word, same slot | `content/{hermes,openclaw}.md` §C | `3d` Configuration |
| **The individual-vs-team boundary** | QM `scope` (user or room, each with an isolated bundle) · gbrain `brain × source` · Indigo HQ `core/` vs `personal/` · HumanLayer `thoughts` `alice/` vs `shared/` | ↪ `comparisons/systems/{qm,gstack-gbrain,indigo-hq,humanlayer}.md` | `5a` · `5b` Team Memory |
| **Capture loop** — work becomes a reusable procedure | gstack `skillify` · Hermes Curator (authors skills, ages them out) · OpenClaw Skill Workshop · Grok Bot teach-by-demonstration · generic-cerebro `librarian tier` · Codex memory pipeline (automatic) | `content/{hermes,openclaw,grok,codex}.md` · ↪ `comparisons/systems/gstack-gbrain.md`, `kd-built-frameworks/02-generic-cerebro.md` | `9a` Learning |
| **Pre-execution context injection** | SageOx `ox agent prime` ("injects conventions, security requirements, architectural decisions and prior sessions") · SageOx `knowledge bubble` · Indigo HQ charter injection · gbrain context selection | ↪ `comparisons/systems/{sageox,indigo-hq,gstack-gbrain}.md` | `5c` Knowledge |
| **The compounding knowledge corpus** | `llm-wiki` (concept, `01-concepts.md` §3.7) · Deep Agents `openwiki` (a machine-maintained code wiki) · gbrain "brain" · SageOx "hivemind" · Indigo HQ `companies/{co}/knowledge/` | ↪ `comparisons/01-concepts.md` §3.7 · `comparisons/systems/langchain-deepagents.md` §4 | `5c` Knowledge |
| **The adapter seam** — how a layer reaches a loop | QM `adapter` (per user, per room) · gstack `--host` · Indigo HQ the `AGENTS.md`↔`CLAUDE.md` symlink · OpenClaw `agent runtime` slot + ACP · Gas City `provider` (the "Factory Worker Protocol" the short profile named **does not exist** at source) | `content/{openclaw,gas-city}.md` · ↪ `comparisons/systems/{qm,gstack-gbrain,indigo-hq}.md` | `2a` Adapters & Middleware (`ᴴ` for hosts) |
| **The evidence record** | Gas City `event` ("fired, not polled") · SageOx `ledger` · generic-cerebro `decision entry` · FRACTAL `PULSE` · LoomWarp `control/events.jsonl` (13 lines, 3 types, no schema) · Claude Code OTel spans + `tool_decision` · Codex the Thread (rollout JSONL + SQLite) | profiles §A *structured output* · ↪ `comparisons/systems/sageox.md` | `8b` Evidence · `8c` Observability |
| **Trust gate on project-local config** | Pi `project trust` ("It is not a sandbox") · Claude Code `workspace trust` · OpenCode: project `.opencode` loads by default | `content/pi.md` §C · `content/claude-code/08-policy-and-governance.md` | `2c` Enforcement |

### 1.3 Orphans — the five nouns no grid has a row for

| Term | Concept (vendor's words) | Who | Where | Ruling |
|---|---|---|---|---|
| `gateway` | "A single long-lived Gateway owns all messaging surfaces… channel connections, config, credentials, and the control-plane API" | OpenClaw (primitive) · Hermes (`gateway.profile_routes`, never in its §C — **UNDERCOUNT**) | `content/openclaw.md` §C · `content/hermes.md` §B `3b` | **An altitude**, not a component (`04-harness-alignment.md` §4.1: *gateway / host*). Inside a profile the gateway's jobs land at `3b` Routing · `11a` Surfaces · `10b` Org |
| `runtime` | "owns one prepared model loop: it receives the prompt, drives model output, handles native tool calls, and returns the finished turn" | OpenClaw (primitive) · Grok Build (`xai-grok-shell`, a crate description) | `content/openclaw.md` §C · `content/grok.md` §A | **An altitude** (§4.1: *runtime*). The loop itself is `2a`; the model under it `0a` |
| `sandbox` | OS-level isolation — "Landlock on Linux, Seatbelt on macOS… The kernel enforces these limits for the process lifetime" (Grok); "not a perfect security boundary, but it materially limits filesystem and process access" (OpenClaw); "a separate layer from permission rules" (Claude Code); Codex Seatbelt · Landlock/bwrap · Windows token; QM "durable sandbox" per scope. **Refused** by Pi: "Run in a container, or build your own confirmation flow" | Grok Build · OpenClaw · Claude Code · Codex · QM ↪ · Pi (refusal) | `content/{grok,openclaw,codex,pi}.md` §C · `content/claude-code-draft.md` **DRAFT** | **A synonym set, absorbed**: `2c` Enforcement when kernel-enforced; `6b` Infrastructure for the container path |
| `session` | see §1.1 — five referents | | | **COLLISION**; may not name a component |
| `workspace` | see §1.1 — six referents | | | **COLLISION**; may not name a component |

### 1.4 Seeded terms

| Term | Concept (vendor's words) | Who | Where | Component |
|---|---|---|---|---|
| `bead` | "WHAT — one unit of work — ID, title, status, type — the universal substrate: tasks, mail, sessions, convoys are all beads differing only by `type`"; hash IDs, hierarchical, atomic claiming, typed relations | Gas City / Beads | `content/gas-city.md` §C | `7a` Workflow Tasks · `3a` Control (convoy, board) · `5a` via `bd remember` / `bd prime` |
| `thoughts` | A separate git repo mounted into every code repo, `repos/<project>/{alice,shared}` + `global/{alice,shared}`, with a `searchable/` hard-link tree and pre/post-commit hooks that keep it out of the code repo and synced | HumanLayer ↪ | `comparisons/systems/humanlayer.md` §4, §6 | `5a` (`alice/`) · `5b` (`shared/`) · the generated `thoughts/CLAUDE.md` → `3d` |
| `llm-wiki` / `openwiki` | see §1.2 *compounding knowledge corpus* | Deep Agents ↪ | | `5c` Knowledge |
| `ox agent prime` | see §1.2 *pre-execution context injection* | SageOx ↪ | | `5c` Knowledge |
| Indigo HQ's architecture | **Rewritten 2026-09-04 (KD).** The seed's "five pillars — Knowledge / Skills / Projects / Workers / Policies" has no source in this repo. What `indigo-hq.md` documents is **eleven rows**: Context injection · Skills · Guardrails · Layout · Multi-tenancy · Orchestration · Workers · Secrets · Search · Sync · Sharing — itself relayed from a PM analysis held outside the repo | Indigo HQ ↪ | `comparisons/systems/indigo-hq.md` *Architecture* | Context injection → `5c` · Skills → `4a` · Guardrails → `2c` · Layout → `3d` · Multi-tenancy → `10b` · Orchestration → `3c`/`7a` · Workers → `10a` · Secrets → `2c` · Search → `5c` · Sync/Sharing → `6d` |

### 1.5 Undercounts — named by the vendor, missed by our §C (ISSUE-007)

| Object | Vendor's words | Who | Where the profile leans on it | Component |
|---|---|---|---|---|
| `gateway` | `gateway.profile_routes`, `gateway-config.yaml`, "the gateway never opens an inbound port" | Hermes | `content/hermes.md` §B `3b` `3d` `6b` | `3b` Routing |
| `/goal` | a goal with a token budget and an independent evidence review | Hermes | `content/hermes.md` §B `3a` | `3a` Control |
| "Bot Mode" | a roster of named Bots | Hermes | `content/hermes.md` §B `10a` | `10a` Roster |
| audit ledger | "never stores prompts, message bodies, tool arguments, tool results" — metadata only | OpenClaw | `content/openclaw.md` §B `8b` | `8b` Evidence |
| operator roles | creator · owner · participant; session *owner* "in the style of a GitHub issue assignee" | OpenClaw | `content/openclaw.md` §B `10b` | `10b` Org |
| `rig` | "WHERE — an external project (usually a git repo) registered with the city" | Gas City | fixed in `content/gas-city.md` §C on 2026-09-03 | `6c` Estate |
| the count itself | 8 + 3 on 2026-09-02, 5 + 3 on 2026-09-03, same sources | Pi | `content/pi.md` vs `content/pi-draft.md` | rule 4 re-run pending (W8c) |

---

## 2. Index — system → primitive → component

Every `●` in the grids traces to a name here (AC-1). Cells the harvest could **not** name are in
ISSUE-008 and become `◐` under W6. `(s)` = supporting. Anchors into the profile's detail rows arrive
with Template v2 (`content/<name>.md#<id>-<slug>`); until a profile is restructured, `§C` is the row.

**Pi** — `content/pi.md` §C · 8 + 3 (re-run pending, ISSUE-007)
Extension `2a` `2b` · Skill `4a` · Prompt template `4a` · Theme `11a` · Pi package `4a` · Session (tree) `5a` `8b` · Settings `3d` · Context file `3d` · (s) Project trust `2c` · (s) Tool `4a` · (s) `models.json` `0a`. Refusal list: no MCP, no sub-agents, no permission popups, no plan mode, no built-in to-dos, no background bash → `2a` `3c` `2c` `3a` `7a` `○` by design.

**Hermes** — `content/hermes.md` §C · 10 + undercounts
Profile `3c` `10a` · `SOUL.md` `3d` · Skill `4a` · Memory (`MEMORY.md`/`USER.md`) `5a` · Toolset `4b` · Plugin `4a` · Hook `2b` · Cron job `9c` · Context file `3d` · Kanban task `7a` · *undercounted:* gateway `3b`, `/goal` `3a`, Bot Mode `10a`.

**OpenClaw** — `content/openclaw.md` §C · 12
Gateway (altitude) `3b` `11a` · Agent `3c` `10a` · Workspace bootstrap files `3d` · Channel + Binding `11a` `3b` · Skill `4a` · Plugin `4a` · Hook `2b` · Tool policy / Exec approvals / Sandbox `2c` `4b` `6b` · Automation (cron) / Heartbeat `9c` · Node `6b` · Session (routing key) `3b` · Agent runtime (altitude) `0a` `2a`ᴴ · *undercounted:* audit ledger `8b`, operator roles `10b` · *at `7a`:* six task-shaped objects, none first-class.

**OpenCode** — `content/opencode.md` §C
Agent `3c` `10a` · Command `4a` · Skill `4a` · Plugin `2b` `4a` · Tool (custom) `4a` · Permission `2c` `4b` · Rules `3d` · MCP server `2a` · Reference (newer) `6c` · Policy (experimental) `4b` · legacy Mode `3c`.

**Grok Build / Grok Bot** — `content/grok.md` §C.1 / §C.2 · 8 / 6
*Build:* Project rules (`AGENTS.md`) `3d` · Skill `4a` · Plugin / Marketplace `4a` · Hook `2b` · MCP server `2a` · Permission rule / mode `2c` `4b` · Sandbox profile `2c` `6b` · Agent / Subagent / Persona / Role `3c`. *Bot:* Bot `10a` · Computer (Agent Computer) `6b` · Skill `4a` · Routine `9c` · Plugin / Connector `4a` `2a` · Approval / Auto-review rule `2c` `4b`.

**Codex** — `content/codex.md` §C · 8 + 4 (⚠️ contestable)
`AGENTS.md` (alias `AGENTS.override.md`) `3d` · Skill `4a` · Plugin (bundles skills, MCP server) `4a` · Subagent `3c` · Hook `2b` · MCP server `2a` · Permission profile `2c` `4b` · Execpolicy rule `2c` · (s) `config.toml` / Settings `3d` · (s) Rollout (session store) `5a` `8b` · (s) Memory pipeline `5a` `9a` · (s) Thread / Turn / Item `8b` — the structured output.

**Gas City** — `content/gas-city.md` §C · 6 + 5 (healthy; own admission test; one documented deletion)
Agent `3c` `10a` · Bead `7a` `3a` `5a` · Formula `7a` `3c` · Rig `6c` · Pack `4a` · Event `8b` `8c` · (s) Order `9c` · (s) Convoy `7a` · (s) Session `6b` · (s) Provider `2a` · (s) Skill `4a`.

**FRACTAL** — `content/fractal.md` §C · 5 + 3, never stated as a set (⚠️ contestable)
STRATEGIST doc `3a` · BLUEPRINT `7a` `3c` · workstream (PRD) `7a` · HANDOFF `8b` — the structured output · PULSE `8c` `8b` · (s) `router.py` `3b` (absent in this repo's instance) · (s) tier-agent role files `10a` `3c` · (s) `ISSUES.md` `9d`. Fork additions genuinely new at `generic-cerebro`: dual blueprint-schema normalization `3d`, archive discipline `9d` (ISSUE-005).

**LoomWarp** — `content/loomwarp.md` §C · **0 named** — stated once in a superseded spec, then dropped
Candidates, not the vendor's current claim: work contract `7a` · capability package `4a` · context bundle `5c` · risk tier `8a` `2c` · evidence bundle `8b` · registry entry `6c`. Structured output `control/events.jsonl` `8b` — unvalidated.

**Claude Code** — `content/claude-code-draft.md` §C **DRAFT**; superseded by `content/claude-code.md` (W8, in progress)
`CLAUDE.md` + `.claude/rules/` `3d` · Skill `4a` · Plugin `4a` · Subagent `3c` · Agent team (experimental) `3c` `10a` · Dynamic workflow `3c` `7a` · Hook `2b` · MCP server `2a` · Permission mode `2c` `4b` · Settings layers `3d` · Sandboxing `2c` `6b` · auto memory `5a` · OTel + `tool_decision` `8b` `8c` — the structured output.

**Short teardowns, not yet on the template** (↪ `comparisons/systems/`)
- *QM* — scope `5a` `5b` · posture `2c` `4b` · adapter `2a`ᴴ · rooms `5b` `11a` · command policy `2c` (bypassable, by QM's own disclosure).
- *Indigo HQ* — worker (`worker.yaml`) `10a` `3c` · command (`hq run`) `2c` · `yokotoken` `2c` · ralph loop `7a` `3a` · hook profile `2c` `4b` · `/deploy` `6d` · `companies/{co}/knowledge/` `5c`.
- *SageOx* — `ox agent prime` `5c` · knowledge bubble `5c` · ledger `8b` · team context `5b` · `murmur` — **no verbatim definition found**, not classified.
- *gstack / gbrain* — harness (the wiring) `2a` · brain × source `5a` `5b` · resolver `3b` `7a` · skillify `9a` · `--host` `2a`.
- *generic-cerebro* — blueprint → workstream → handoff `7a` · pulse `8c` · rule file `3d` · librarian tier `9a` `3e` · decision entry `8b` · finding-class `9a` `9d` · standards tier `3e` · four agent tiers `10a` `3c` · `sub-agent` / `fl-worker` — an open collision inside one lineage (`03-fractal-as-iterated.md` §2), kept as its own row until resolved.
- *HumanLayer* — `thoughts` `5a` `5b` · plan file (compacted per verified phase) `7a` — the structured output · `workspaces/<task>/` `6b`.
- *LangChain Deep Agents* — `openwiki` `5c` · rubric verdict (`satisfied` / `failed` / `max_iterations`) + benchmark manifest `8a` `8b` — the structured output.
