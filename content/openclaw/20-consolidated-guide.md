---
status: DRAFT
title: "OpenClaw — the consolidated guide"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# OpenClaw — the consolidated guide

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

One pass over nineteen surfaces, for a reader with fifteen minutes. Every claim here is sourced in a
numbered document; this page carries the shape, not the field names.

---

## 1. The mental model

**One process owns the connections; everything else is a subsystem or a client.** *"A single
long-lived Gateway owns all messaging surfaces… The Gateway owns channel connections, config,
credentials, and the control-plane API."* The CLI, the Control UI, the macOS menu-bar app, an iOS
node and a headless node all speak **one WebSocket protocol** with a declared role and scope; the
three HTTP APIs multiplex onto the same port.

**A turn arrives, is routed, is executed by something, and is delivered back.** The four steps are
owned by four different mechanisms and they can be reasoned about separately:

| Step | Owner | Document |
|---|---|---|
| Arrive | A channel's admission policy — pairing, allowlist, account rules | [`03`](./03-channels-and-bindings.md) |
| Route | `bindings[]`, a nine-tier specificity ladder producing a session key | [`03`](./03-channels-and-bindings.md) |
| Execute | An **agent runtime** — the embedded loop, a plugin harness, a CLI backend, or an external ACP process | [`04`](./04-agent-runtimes-and-hosted-harnesses.md) · [`05`](./05-acp-and-external-harness-sessions.md) |
| Deliver | Always OpenClaw | [`04`](./04-agent-runtimes-and-hosted-harnesses.md) |

**The defining move is that the third step is pluggable and the fourth is not.** Whatever runs the
loop, OpenClaw keeps the channel, the credentials and the transcript. The runtime-ownership matrix in
[`04`](./04-agent-runtimes-and-hosted-harnesses.md) §3 is the exact accounting of what it gives up in
exchange: canonical thread state becomes a mirror, dynamic tools become a bridge, context assembly
becomes a projection — and channel delivery stays put.

---

## 2. Configuration resolves in two buckets and reloads in three classes

*"root siblings hold infrastructure and cross-agent defaults, while `agents.defaults` holds
agent-loop behavior."* Under a **strict schema**: unknown keys stop the Gateway from starting.

Reload planning classifies each changed path as `restart`, `hot`, or `none`, by **longest matching
prefix** — and *"a path that matches no rule defaults to a Gateway restart."* Plugin-supplied rules
apply *"only while that plugin is loaded"*, so unloading a plugin can change a key's reload class.

Almost everything is hot. Two categories are not: the `gateway.*` server settings (port, bind, auth
mode, roles, TLS) and the infrastructure set (`plugins.load`, `plugins.installs`,
`secrets.egressProxy`, MCP Apps listener). — [`01`](./01-the-gateway-and-configuration.md)

---

## 3. Seven rules that are easy to get wrong

1. **An omitted `accountId` in a binding matches only the default account.** `"*"` is the
   channel-wide fallback, and the ninth routing tier is a *fallback owner*, not a default agent:
   *"Multiple agents without an owner require a matching binding."* — [`03`](./03-channels-and-bindings.md)
2. **ACP harnesses run outside the sandbox.** *"OpenClaw's sandbox policy does **not** wrap ACP harness
   execution."* Sandbox-enforced delegation means `runtime: "subagent"`. — [`05`](./05-acp-and-external-harness-sessions.md)
3. **Tool policy filters by name, not by effect.** *"If `exec` is allowed, denying `write`, `edit`, or
   `apply_patch` does not make shell commands read-only."* — [`13`](./13-tool-policy-approvals-and-sandboxing.md)
4. **A hook timeout bounds an await; it does not cancel the handler.** *"The hook dispatch can release
   its Gateway admission while that plugin work is still in progress."* Enforcement therefore belongs
   on a fail-closed gate, never on an observation hook. — [`11`](./11-hooks-internal-and-plugin.md)
5. **A condition-trigger script runs unattended with the owning agent's full tool policy, including
   `exec`.** So does a script payload, and a stream schedule keeps an operator command running. One
   switch turns all three off: `cron.triggers.enabled: false`. — [`14`](./14-automations-tasks-and-goals.md)
6. **`POST /tools/invoke` is a full operator-access surface.** A shared-secret caller gets full
   operator defaults *"even if the caller sends a narrower `x-openclaw-scopes` header."* — [`16`](./16-the-gateway-protocol-and-apis.md)
7. **Depth changes a sub-agent's tool set, and the policy is live.** Lowering `maxSpawnDepth` removes
   orchestration tools from **existing** sessions: *"The current depth policy is authoritative."* — [`15`](./15-subagents-swarm-and-delegation.md)

---

## 4. Choosing a surface

| You want to… | Use | Document |
|---|---|---|
| State standing expectations in prose | `AGENTS.md`, `SOUL.md`, `USER.md` | [`02`](./02-agents-workspaces-and-the-context-engine.md) |
| Set behaviour mechanically | `openclaw.json` | [`01`](./01-the-gateway-and-configuration.md) |
| Reach people where they are | A channel plus a binding | [`03`](./03-channels-and-bindings.md) |
| Run a turn on a different loop | `agentRuntime.id` | [`04`](./04-agent-runtimes-and-hosted-harnesses.md) |
| Run an external coding harness with session controls | ACP | [`05`](./05-acp-and-external-harness-sessions.md) |
| Keep something across sessions | Memory tiers and dreaming | [`07`](./07-memory-dreaming-and-the-knowledge-wiki.md) |
| Package a repeatable workflow | A skill | [`08`](./08-skills-and-the-skill-workshop.md) |
| Add a capability with code | A plugin | [`09`](./09-plugins-and-the-plugin-sdk.md) |
| Distribute either | ClawHub | [`10`](./10-clawhub.md) |
| Observe or block a lifecycle moment | An internal or plugin hook | [`11`](./11-hooks-internal-and-plugin.md) |
| Carry a catalog too large for a prompt | Tool Search or Code Mode | [`12`](./12-tools-and-the-tool-catalog.md) |
| Constrain what may run at all | Tool policy + approvals + sandbox | [`13`](./13-tool-policy-approvals-and-sandboxing.md) |
| Run work later, repeatedly, or detached | Automations, tasks, flows | [`14`](./14-automations-tasks-and-goals.md) |
| Delegate to another agent run | Sub-agent or Swarm | [`15`](./15-subagents-swarm-and-delegation.md) |
| Drive OpenClaw from your own program | Gateway WS, the HTTP APIs, or `mcp serve` | [`16`](./16-the-gateway-protocol-and-apis.md) |
| Bound what a teammate may do | Named operator roles | [`17`](./17-operators-roles-and-multi-user.md) |
| Put a capability on another device | A node | [`18`](./18-nodes-and-companion-devices.md) |
| Find out what actually happened | The audit ledger, OTel, doctor | [`19`](./19-audit-observability-and-recovery.md) |

---

## 5. Enforcement, ordered

Five layers, and they are different kinds of thing:

1. **Tool policy** decides which tools exist for this turn. `deny` wins; a non-empty `allow` blocks
   everything else. It is the hard stop — *"`/exec` cannot override a denied `exec` tool."*
2. **Exec approvals** decide which commands the `exec` tool may then run, over two dimensions
   (`security` × `ask`) collapsed into five modes. Approvals *"can only tighten config-derived
   security/ask, never loosen them"*, and the host's local approvals document tightens further.
3. **The sandbox** decides where a permitted command runs. Docker/Podman/SSH/OpenShell, with
   `network: "none"` by default on Docker.
4. **The role-required sandbox** decides whether an agent-level `mode: "off"` may apply at all. It
   overrides agent mode, is immutable for the session, cannot be escaped by elevated execution, caps
   `rw` at `ro`, and **fails closed**: *"backend failure never falls back to host execution."*
5. **Elevated** is the deliberate hole in layer 3 — exec-only, gated by `enabled` plus a sender
   allowlist, and *"cannot bypass a creator role's required sandbox."*

**Two layers are enforced outside the process** (the container or remote host in layer 3, and the OS
underneath it). The rest is the Gateway deciding about itself — which is why the vendor's own
statement that *"One gateway is one trust domain"* is the frame for reading all five.

**And one whole path sits outside the stack:** ACP harness execution, which layers 3–5 do not wrap.

---

## 6. What the system does on its own

Four background actors, each with a different safety design:

- **Dreaming** is the only primary writer of durable memory. Two gates in sequence — a deterministic
  ranking gate that **structurally excludes** `untrusted` and `system` origin classes before any
  prompt is built, then a consolidation model turn whose output is accepted only if it validates,
  stays in budget, and *"does not lose more than a bounded fraction of existing entries."* Write
  safety is optimistic concurrency plus a stored pre-image and a `DREAMS.md` diary.
- **Self-learning** turns corrections into skill proposals — but *"Apply is the only live write"*, and
  proposals are hash-bound, scanner-gated and rollback-captured.
- **The heartbeat** runs periodic turns in the main session with a deliberately narrow default prompt
  that *"explicitly tells the agent **not** to infer or repeat old tasks from prior chats."*
- **Automations** run on five schedule kinds — and condition scripts and script payloads run with the
  agent's full tool policy, which is the one background actor whose blast radius is not narrowed by
  design.

The common pattern: **deterministic gates, model judgment inside them.** — [`07`](./07-memory-dreaming-and-the-knowledge-wiki.md), [`08`](./08-skills-and-the-skill-workshop.md), [`14`](./14-automations-tasks-and-goals.md)

---

## 7. Where the documentation stops

Absences recorded across this set, each naming what was checked:

- **No account-age or identity-verification gate for ClawHub publishing.** Checked
  `clawhub/publishing`, `clawhub/how-it-works`, and the CLI page's auth section. No package size limit
  is stated either. — [`10`](./10-clawhub.md) §7
- **No published refusal list.** Checked the docs index, `concepts/features`, `start/why-openclaw`,
  `SECURITY.md` and `VISION.md`. What exists instead is a *"What we do not claim"* section and a
  scorecard, both of which bound capability rather than enumerate refusals.
- **No user-facing PRD or delivery pipeline surface.** Checked the Capabilities and Gateway & Ops
  navigation, `tools/goal`, `plugins/workboard`, and `reference/pull-request-review-flow`, which is
  OpenClaw's own repository automation. Goals and the Workboard each disclaim the role in the
  vendor's own words.
- **No versioned rules-pack for user projects.** Checked `reference/AGENTS.default`,
  `reference/templates/*`, `concepts/soul` and `tools/custodian-skills`; templates and a default
  `AGENTS.md` exist, a distributable standards mechanism does not.

Two structural notes about where the text lives:

**The ClawHub tab has no repository counterpart.** Fourteen `clawhub/*` routes ship in the navigation
at `v2026.9.3` with **no files under `docs/clawhub/`**; that documentation exists only on the hosted
site.

**194 of 863 markdown and MDX files are not in the navigation tree**, and 152 of those are the per-plugin
`plugins/reference/<id>` pages — reachable from the generated inventory's links, not by browsing.
`plugins/copilot`, `concepts/mantis`, `security/incident-response`, `cli/transcripts`,
`channels/bot-loop-protection` and `channels/qa-channel` are among the rest.

**One page is a redirect map.** `/gateway/configuration-reference` is now mostly `Moved to …` lines
with anchor stubs; the field text lives in twelve sibling pages and eight grandchildren.

---

## 8. The claims, walked against what this set documented

The claim ledger in [`00-README.md`](./00-README.md) records what OpenClaw says it is for. This walks
each claim to the mechanism behind it.

**This maps; it does not grade.** A row names the document carrying the mechanism, or records that
nothing was found and says what was checked, or says the claim is outside this set's scope. There is
no verdict column and none is implied.

| Claim, abbreviated | Mechanism, and where it is documented |
|---|---|
| *"an open-source AI assistant that runs on your own computer"* | The Gateway daemon plus local state — [`01`](./01-the-gateway-and-configuration.md); per-agent and shared SQLite plus workspace Markdown — [`06`](./06-sessions-compaction-and-pruning.md), [`07`](./07-memory-dreaming-and-the-knowledge-wiki.md) |
| *"meets you in the channels you already use"* | A generated 32-entry channel catalog and the binding ladder — [`03`](./03-channels-and-bindings.md) |
| *"Models and agent harnesses … are plugins you can swap without changing anything else"* | The capability model's `registerProvider` / `registerAgentHarness` / `registerCliBackend` — [`09`](./09-plugins-and-the-plugin-sdk.md); `agentRuntime.id` resolution and the ownership matrix — [`04`](./04-agent-runtimes-and-hosted-harnesses.md). The *"without changing anything else"* half is bounded by that matrix, which names what a hosted runtime takes over |
| *"State, memory, and credentials live on your hardware"* | Local SQLite and workspace files — [`02`](./02-agents-workspaces-and-the-context-engine.md), [`06`](./06-sessions-compaction-and-pruning.md); SecretRef sources — [`01`](./01-the-gateway-and-configuration.md) §5 |
| *"by default OpenClaw itself phones home for nothing but a daily version check"* | The update-check payload and the opt-in feature statistics, both inspectable with `openclaw telemetry show` — [`19`](./19-audit-observability-and-recovery.md) §3 |
| *"One Gateway runs it as a personal assistant on a laptop or as a shared team deployment; configuration is the only difference"* | Named operator roles with four closed policies, the three ownership layers, and the ingress options — [`17`](./17-operators-roles-and-multi-user.md) |
| *"a trusted gateway, untrusted execution, deterministic policy"* | The five enforcement layers in §5 — [`13`](./13-tool-policy-approvals-and-sandboxing.md); nodes and cloud workers as execution that is not the Gateway — [`18`](./18-nodes-and-companion-devices.md) |
| *"Policy is enforced in code, and state is versioned and migrated"* | Tool policy, exec modes and role-required sandboxing — [`13`](./13-tool-policy-approvals-and-sandboxing.md); the doctor migration contract and schema versioning — [`19`](./19-audit-observability-and-recovery.md) §5 |
| *"Core stays lean; optional capabilities should usually ship as plugins"* | 59 core / 91 official-external / 3 source-only, and seventeen registrable capability types — [`09`](./09-plugins-and-the-plugin-sdk.md) |
| *"OpenClaw is the AI that actually does things"* | The tool catalog and its two large-catalog carriers — [`12`](./12-tools-and-the-tool-catalog.md); automations, tasks and flows — [`14`](./14-automations-tasks-and-goals.md) |
| *"The model only remembers what gets saved to disk; there is no hidden state"* | The five-tier model, all of it plain files plus one SQLite index — [`07`](./07-memory-dreaming-and-the-knowledge-wiki.md) §1–2 |
| *"a practical view of what is ready, what is proven, and what still needs work"* | The generated scorecard: 50 surfaces, 280 capability areas, five bands, M0–M5 with promotion criteria — [`19`](./19-audit-observability-and-recovery.md) §6 |
| *"an independent 501(c)(3)"* with *"no paid tier, hosted service, or token"* | **Governance, not mechanism.** This set documents software surfaces; the Foundation's legal status and funding are outside its scope and were not verified here. Recorded as scope, not as an absence |
| *"the most mature, battle-tested agent for anyone, individual or enterprise, to build on"* | **Outside this set's scope.** A comparative maturity claim is not a surface; the vendor's own scorecard measures OpenClaw against its own taxonomy, not against other systems. Recorded as scope, not as an absence |

---

## 9. The vendor's own limits

`start/why-openclaw` carries a *"What we do not claim"* section, and it is the most useful page in the
documentation for calibrating everything above. Verbatim:

> *"Sandboxing and exec approvals are off by default. Default OpenClaw is a trusted single-operator
> assistant. Hardening is deliberate configuration."*
> *"One gateway is one trust domain… Tenancy means one gateway cell per tenant, and fleet is still
> experimental."*
> *"Native plugins run in-process and are not sandboxed."*
> *"Egress allowlisting covers cooperating traffic only… raw sockets from unsandboxed host exec answer
> to an operator-supplied proxy or host policy, not to OpenClaw… the sentinel design assumes bypass
> instead of trying to prevent it."*
> *"Promoted memories have no time-based retention bound… admission exclusions apply to dreaming
> ingestion and session backfill, not direct writes, hooks, or raw transcript indexing."*
> *"`gateway.roles` is present in the reviewed August 2026 source snapshot. Check your installed
> version before depending on it."*

And from `SECURITY.md`: *"Anyone who can operate an agent can make it do anything that agent can do.
Session ownership, visibility, and presence are usability features, not security boundaries."*

The page frames its architecture argument against a named single-process harness. That comparison is
the vendor's; it is not reproduced here.
