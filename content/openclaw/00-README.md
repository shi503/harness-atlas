---
title: "OpenClaw — surface reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
status: ACTIVE
verification:
  derived_from:
    - "openclaw/openclaw @ v2026.9.3 (released 2026-09-08T14:15:53Z; repo HEAD pushed 2026-09-08T17:43:50Z) — the release tarball's docs/ tree, 863 markdown files, plus README.md, VISION.md, SECURITY.md, package.json, extensions/, skills/"
    - "docs.openclaw.ai — read 2026-09-08 for the clawhub/* tree, which has no repository counterpart at this tag"
    - "the repository README pitch, VISION.md, docs/index.md and docs/start/why-openclaw.md as product and positioning copy — captured 2026-09-08"
  grounded_against:
    - "the profile at ../openclaw.md, read against v2026.8.2 on 2026-09-02"
    - "docs/docs.json at v2026.9.3 (684 nav routes) diffed against the same file on the main branch (705), to separate the tag from HEAD"
    - "the generated inventories opened directly: docs/channels/index.md, docs/plugins/plugin-inventory.md, docs/maturity/taxonomy.md"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Exhaustive) and scope (the Gateway
    daemon and everything it hosts, including the mechanism by which it hosts other harnesses'
    runtimes) arrived in the dispatch, agreed with KD before reading, per the harness-deep-read
    skill's step one. This is the first Exhaustive run of that skill.
---

# OpenClaw — surface reference set

**This folder is the deep read for the Template v2 profile at [`../openclaw.md`](../openclaw.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of OpenClaw's own documentation, organised by **the surfaces OpenClaw
names** — the Gateway and `openclaw.json`, agents and workspaces, channels and bindings, agent
runtimes, ACP, sessions, memory, skills, plugins, ClawHub, hooks, tools, sandboxing, automations,
sub-agents, the Gateway protocol, roles, nodes, audit. Cut by OpenClaw's vocabulary rather than by
this atlas's 33 components, which is what makes it the profile's complement rather than a second copy
of it.

**Why it exists.** A profile answers *what is this harness, and how does it compare*. It cannot answer
*how does this surface actually work* without becoming something nobody reads in thirty seconds. This
folder is that grain: the nine-tier routing ladder, the runtime-ownership matrix, the memory system's
two gates and two recall lanes, the forty-two plugin hooks with their failure policies, the exec
allowlist's field table, the eight operator scopes.

---

## Scope and depth

**Depth: Exhaustive.** Nineteen surface documents plus this index and the guide, with full field,
event and attribute tables. This is the first Exhaustive run of the `harness-deep-read` skill.

**Scope: the Gateway daemon and everything it hosts** — including its role as a host for other
harnesses' runtimes, because that hosting relationship is OpenClaw's defining move and belongs in its
own surface set. [`04`](./04-agent-runtimes-and-hosted-harnesses.md) and
[`05`](./05-acp-and-external-harness-sessions.md) therefore describe the **hosting mechanism**: what
OpenClaw keeps, what it mirrors, what it bridges, and where it stops. They do not describe or evaluate
the harnesses on the other side; the ids and contracts named in them are OpenClaw's own vocabulary.

**One document is deliberately absent.** There is no CLI or Control UI reference here. `cli/index`
lists 66 command pages in a navigable table with global flags, and `web/control-ui` fans out to ten
sub-pages; a document restating either would be replaced by a link, which is the deletion test's
first rule. The Control UI, TUI, WebChat and CLI appear where they own a mechanism — approval
surfaces in [`13`](./13-tool-policy-approvals-and-sandboxing.md), ownership chrome in
[`17`](./17-operators-roles-and-multi-user.md), the ledger in
[`19`](./19-audit-observability-and-recovery.md).

**The shape found.** OpenClaw publishes one outline, and it is a good one: `docs/docs.json`, a
machine-readable Mintlify navigation tree of **684 page routes across twelve tabs**, shipped in the
repository beside the pages themselves. This set follows it, merging tabs where OpenClaw's own
grouping is presentational rather than architectural (the Models tab is 70 provider pages behind one
capability; the Platforms tab folds into nodes). Two departures from the tree are recorded below,
both about pages the tree does not reach.

---

## What OpenClaw says it is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing the
vendor is the sole authority on — recorded as claims, never as findings.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §8 walks them against the mechanisms this set
documents.

| Claim | Source | Captured |
|---|---|---|
| *"OpenClaw is an open-source AI assistant that runs on your own computer and meets you in the channels you already use"* | `README.md` @ `v2026.9.3` | 2026-09-08 |
| *"The AI that really does things. Any OS. Any Platform. The lobster way. 🦞"* | `github.com/openclaw/openclaw`, repository description | 2026-09-08 |
| *"OpenClaw is the AI that actually does things. It runs on your devices, in your channels, with your rules."* | `VISION.md` @ `v2026.9.3` | 2026-09-08 |
| *"Yours, with no catch. State, memory, and credentials live on your hardware."* | `README.md` | 2026-09-08 |
| *"Models and agent harnesses … are plugins you can swap without changing anything else."* | `README.md` | 2026-09-08 |
| *"One Gateway runs it as a personal assistant on a laptop or as a shared team deployment; configuration is the only difference."* | `README.md` | 2026-09-08 |
| *"by default OpenClaw itself phones home for nothing but a daily version check, anonymous feature statistics are opt-in"* | `README.md` | 2026-09-08 |
| *"Your AI assistant, on your own hardware, in every chat app you already use. One Gateway. Any model. Any device. No hosted service in the middle."* | `docs/index.md` | 2026-09-08 |
| *"Developed in the open by the OpenClaw Foundation, an independent 501(c)(3). No paid tier, no telemetry by default beyond a version check you can turn off, no lab owns it."* | `docs/index.md` | 2026-09-08 |
| *"The architecture case — trusted gateway, untrusted execution, deterministic policy — is in Why OpenClaw."* | `README.md` | 2026-09-08 |
| *"OpenClaw can separate a trusted Gateway from untrusted, movable execution. Policy is enforced in code, and state is versioned and migrated, so a deployment is replaceable."* | `docs/start/why-openclaw.md` | 2026-09-08 |
| *"A good harness spans the whole range: the same product runs as a personal assistant on one laptop and as a hardened team deployment, with configuration as the only difference. There is no enterprise edition."* | `docs/start/why-openclaw.md` | 2026-09-08 |
| *"Core stays lean; optional capabilities should usually ship as plugins."* | `VISION.md` | 2026-09-08 |
| *"OpenClaw sends no usage analytics, tracking identifiers, or telemetry attribution to the project unless the operator turned that on themselves."* | `VISION.md` | 2026-09-08 |
| *"A practical view of what is ready, what is proven, and what still needs work."* | `docs/maturity/scorecard.md` | 2026-09-08 |
| *"ClawHub is the public registry for OpenClaw skills and plugins."* | `docs.openclaw.ai/clawhub` | 2026-09-08 |

---

## Provenance and freshness

> **Read against `openclaw/openclaw` `docs/` and `docs.openclaw.ai` at `v2026.9.3`, 2026-09-08. A
> surface that has shipped since is not here.**

`v2026.9.3` was published **2026-09-08T14:15:53Z**; the repository was last pushed
**2026-09-08T17:43:50Z**, so the working tree is a few hours ahead of the tag. Everything here is read
at the tag. The `main` branch's `docs.json` already carries **21 routes the tag does not** — a
`releases/2026.9.3` page, seven `gateway/doctor/*` children, six `help/testing/*` children, five
`plugins/sdk-provider-plugins/*` children, and two `install/*-compatibility` pages. Nothing in this
set rests on those.

### The profile is one release behind and six days older

[`../openclaw.md`](../openclaw.md) was read against **`v2026.8.2` on 2026-09-02**. Where the two
differ, this set is newer. Both figures are carried, with both dates, in the §6 rows that link out.
The visible differences:

| Figure | Profile, 2026-09-02 @ `v2026.8.2` | This set, 2026-09-08 @ `v2026.9.3` |
|---|---|---|
| Documentation size | *"590 pages"* | **684 nav page routes**; 863 markdown and MDX files in `docs/` |
| ACP harness targets | *"eleven-plus"* | **17 named coding-harness ids**, plus `pi` as a registered non-coding target |
| Plugin lifecycle hooks | *"~45 named events"* | **42 in the catalogue**, in seven groups |
| Internal hook events | not counted | **15** |
| Bundled plugins | *"~160 in `extensions/`"* | **153 in the generated inventory** (59 core · 91 official external · 3 source-only); 154 directories under `extensions/` |
| Channels | *"~30"* | **32 entries** in the generated catalog |
| Operator scopes | 7 | **8** — `operator.talk.secrets` added |
| Routing ladder tier 9 | *"default"* | *"Fallback owner"* — *"Multiple agents without an owner require a matching binding"* |
| Task states | `queued→running→succeeded/failed/timed_out/cancelled/lost` | Same, plus **`blocked` as a terminal outcome** distinct from status |
| ClawHub publishing gate | *"publish gated by GitHub account age"* | **No account-age gate is documented** — checked `clawhub/publishing`, `clawhub/how-it-works` and the CLI auth section |
| Foundation legal status | listed unverified — *"Whether the Foundation is a legal entity was not checked"* | Stated in `docs/index.md` and `start/why-openclaw` as *"an independent 501(c)(3)"* |
| Node engines | *"Node `>=22.22.3<23 \|\| >=24.15.0<25 \|\| >=25.9.0`"* | `README.md` states **Node 24.16+ or 26.1+** |

**One drift the corpus predicted.** Ruling `2026-09-07-openclaw-permissions-not-tenancy` records that
a team version shipped after the 2026-09-02 read. It is present at this read:
**named operator roles** bind authenticated profiles to four closed policies — `sessions.others`
(`none`/`view`/`suggest`/`write`), an `agents` allowlist, a maximum scope set, and
`sandbox: "inherit"|"required"` — assigned with `users.setRole`, with `gateway.roles.default`
required whenever roles are configured. Configuring roles also **narrows authentication**: device and
bootstrap tokens are rejected for operator connections because *"those tokens are not bound to a
person and could bypass the role ceiling."* Documented in
[`17`](./17-operators-roles-and-multi-user.md) at the **2026-09-08** read date; the profile's §10b is
older and is not re-read here.

### Where the documentation actually lives

Three facts a reader starting at the repository will otherwise rediscover:

1. **The ClawHub tab is hosted-only.** Fourteen `clawhub/*` routes ship in `docs.json` at `v2026.9.3`
   with **no corresponding files under `docs/clawhub/`**. [`10`](./10-clawhub.md) is read entirely
   from `docs.openclaw.ai` and says so in its header.
2. **194 of 863 markdown and MDX files are outside the navigation tree**, and **152 of them are the
   per-plugin `plugins/reference/<id>` pages** — reachable from the generated inventory's links, not
   by browsing. Also orphaned: `plugins/copilot` (linked from `concepts/agent-runtimes`),
   `concepts/mantis`, `concepts/subagent-yield-handoff`, `security/incident-response`,
   `cli/transcripts`, `channels/bot-loop-protection`, `channels/qa-channel`,
   `reference/templates/TOOLS`, `specs/codex-supervision`, and eighteen `releases/2026.8.1/*` parts.
3. **`/gateway/configuration-reference` is mostly a redirect map.** Its section headings are `Moved
   to …` lines carrying anchor stubs so old fragment links resolve; the field text lives in twelve
   sibling `config-*` pages and eight `config-agents/*` grandchildren.

Three of the largest pages are **generated and must not be hand-edited**: the channel catalog
(`pnpm channels:catalog:gen`), the plugin inventory (`pnpm plugins:inventory:gen`), and both maturity
pages (`pnpm maturity:render`, with `pnpm maturity:check` failing while stale).

### Refresh protocol

```bash
# The current tag, and whether the tree has moved past it.
gh api repos/openclaw/openclaw/releases/latest --jq '.tag_name + "  " + .published_at'
gh api repos/openclaw/openclaw --jq '.pushed_at'

# The navigation tree is the outline. Diff it to find new or renamed surfaces.
curl -sL https://codeload.github.com/openclaw/openclaw/tar.gz/refs/tags/<tag> -o oc.tgz
tar xzf oc.tgz 'openclaw-*/docs' 'openclaw-*/README.md' 'openclaw-*/VISION.md'

# The three generated inventories carry the counts this set quotes.
#   docs/channels/index.md · docs/plugins/plugin-inventory.md · docs/maturity/taxonomy.md

# The ClawHub tree has no repository counterpart; read it from the hosted site.
```

When you refresh, update `source_verified` and `version_at_capture` in every file's frontmatter. A
reference doc with a stale date is more dangerous than no reference doc, because it will be trusted.

---

## The documents

| # | Document | Covers |
|---|---|---|
| 01 | [`01-the-gateway-and-configuration.md`](./01-the-gateway-and-configuration.md) | The strict-schema startup gate, the two-bucket rule, the twelve-page field reference, hot reload's three outcomes, env and SecretRef precedence |
| 02 | [`02-agents-workspaces-and-the-context-engine.md`](./02-agents-workspaces-and-the-context-engine.md) | Workspace resolution and its multi-agent trap, the nine bootstrap files with budgets, the agent entry, the context engine's four lifecycle points |
| 03 | [`03-channels-and-bindings.md`](./03-channels-and-bindings.md) | The 32-entry channel catalog by install route, the nine-tier routing ladder, session key shapes, DM route pinning, broadcast groups |
| 04 | [`04-agent-runtimes-and-hosted-harnesses.md`](./04-agent-runtimes-and-hosted-harnesses.md) | **The defining move** — runtime families, four-step resolution, the ownership matrix, the eight-question compatibility contract, the native hook relay, CLI backends |
| 05 | [`05-acp-and-external-harness-sessions.md`](./05-acp-and-external-harness-sessions.md) | 17 harness ids, the sandbox-boundary warning, binding shapes, `sessions_spawn` for ACP, delivery paths and the A2A echo guard, the `/acp` control surface |
| 06 | [`06-sessions-compaction-and-pruning.md`](./06-sessions-compaction-and-pruning.md) | Where state lives, four reset modes, the recovery budget, maintenance's disposable/protected split, safeguard compaction, cache-TTL pruning |
| 07 | [`07-memory-dreaming-and-the-knowledge-wiki.md`](./07-memory-dreaming-and-the-knowledge-wiki.md) | Five tiers, closed provenance sets, dreaming's two gates, two recall lanes with thresholds, project scoping, the user model, standing intents, the security model |
| 08 | [`08-skills-and-the-skill-workshop.md`](./08-skills-and-the-skill-workshop.md) | The seven-tier loading ladder, `SKILL.md` frontmatter, `metadata.openclaw` gating, allowlists, env injection, the Workshop's proposal rules, self-learning modes, Custodian's five sections |
| 09 | [`09-plugins-and-the-plugin-sdk.md`](./09-plugins-and-the-plugin-sdk.md) | The 153-plugin inventory, the pre-runtime manifest and its seven children, seventeen capability types, two exclusive slots, 22 infrastructure registrars, the in-process trust model |
| 10 | [`10-clawhub.md`](./10-clawhub.md) | **Hosted-only** — two CLIs, four package families, the `clawhub` command surface, publishing rules, the three audit scales |
| 11 | [`11-hooks-internal-and-plugin.md`](./11-hooks-internal-and-plugin.md) | 15 internal events with wait behaviour, discovery precedence, selection rules, the five bundled hooks; 42 plugin hooks in seven groups, six execution contracts, the timeout table |
| 12 | [`12-tools-and-the-tool-catalog.md`](./12-tools-and-the-tool-catalog.md) | Built-in categories, the tool/skill/plugin test, Tool Search and Code Mode, provider-backed surfaces, MCP as a tool source |
| 13 | [`13-tool-policy-approvals-and-sandboxing.md`](./13-tool-policy-approvals-and-sandboxing.md) | Three controls kept apart, thirteen tool groups, five exec modes, the allowlist field table and `argPattern`, standing grants, sandbox modes/scopes/backends, role-required sandboxing, elevated |
| 14 | [`14-automations-tasks-and-goals.md`](./14-automations-tasks-and-goals.md) | Five schedule kinds, stream sources and condition scripts with their unattended-execution warning, task sources and the `blocked` outcome, eight flow statuses, six goal statuses, heartbeat |
| 15 | [`15-subagents-swarm-and-delegation.md`](./15-subagents-swarm-and-delegation.md) | Context modes, the native `sessions_spawn` parameters, the depth table and its live tool policy, the announce chain, Swarm's collectors and limits, the delegate tiers |
| 16 | [`16-the-gateway-protocol-and-apis.md`](./16-the-gateway-protocol-and-apis.md) | Frames and limits, roles and the eight scopes, protocol v4 with the N-1 node window, RPC families, the ledger RPCs, three HTTP surfaces and their auth modes, `mcp serve` |
| 17 | [`17-operators-roles-and-multi-user.md`](./17-operators-roles-and-multi-user.md) | The trust statement, named roles' four closed policies, the three ownership layers, public access, presence and mentions, turn attribution's limits, team ingress |
| 18 | [`18-nodes-and-companion-devices.md`](./18-nodes-and-companion-devices.md) | Pairing and its scope escalation, the two command gates and platform allowlists, node-hosted MCP and skills, host stats, macOS node mode |
| 19 | [`19-audit-observability-and-recovery.md`](./19-audit-observability-and-recovery.md) | The metadata-only ledger and its stated coverage limits, pseudonyms, OTel spans and metrics, telemetry defaults, what restart does and does not resume, doctor, the maturity scorecard |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **The synthesis: the mental model, seven rules, enforcement ordered, what runs on its own — and the claims above walked against what this set documented** |

Read **20** if you have fifteen minutes. The numbered references are lookup material; read them when
you need an exact field name.

---

## How to read these

- **Exact names are preserved verbatim.** Config keys, hook event names, tool ids, scopes and slash
  commands are quoted as the source spells them. Where two surfaces use different conventions for the
  same idea — `tools.exec.host` chooses *where*, `tools.exec.mode` chooses *how approved* — that is
  called out.
- **Absences name what was checked.** Four appear across this set, collected in
  [`20`](./20-consolidated-guide.md) §7. None says "appears to lack".
- **Counts are dated.** Every figure in the drift table above is a reading of a generated inventory at
  `v2026.9.3`, not a stable property.
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
