---
status: DRAFT
title: "Nodes and companion devices"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Nodes and companion devices

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"A **node** is a companion device (macOS/iOS/watchOS/Android/headless) that connects to the Gateway
with `role: 'node'` and exposes a command surface… via `node.invoke`."*

**Nodes are peripherals, not gateways:** *"they don't run the gateway service, and channel messages
(Telegram, WhatsApp, etc.) land on the gateway, not on nodes."*

---

## 1. Pairing

Nodes use **device pairing**: *"A node presents a signed device identity during connect; the Gateway
creates a device pairing request for `role: node`."*

```bash
openclaw devices list / approve <requestId> / reject <requestId>
openclaw nodes status
openclaw nodes describe --node <idOrNameOrIp>
```

*"Pending pairing requests expire 5 minutes after the device's last retry — a device that keeps
reconnecting keeps its one pending request (and `requestId`) alive."* Changed auth details (role,
scopes, public key) **supersede** the pending request and mint a new `requestId`, with a
`device.pair.resolved` event for the superseded one.

**The pairing record is the durable contract.** *"Token rotation stays inside that contract; it cannot
upgrade a paired node into a role that pairing approval never granted."* There is *"no separate node
pairing store"* — device pairing owns both transport authentication and the durable node surface.

**Approval scope escalates with the declared commands:**

| Declared commands | Required scopes |
|---|---|
| None | `operator.pairing` |
| Ordinary commands | `operator.pairing` + `operator.write` |
| `system.run`, `system.run.prepare`, `system.which`, `browser.proxy`, `browser.proxy.upload.v1`, `fs.listDir`, `system.execApprovals.get/set` | `operator.pairing` + **`operator.admin`** |

Removal: `openclaw nodes remove --node <id\|name\|ip>` revokes the `node` role and disconnects that
device's node sessions — *"a mixed-role device keeps its row and only loses the `node` role, while a
node-only device row is deleted."* A device-token caller revoking its own node role on a mixed-role
device *"additionally needs `operator.admin`."*

Most nodes use the operator port over WebSocket. *"The optional direct Apple Watch node uses signed
HTTPS polling on that same port because watchOS blocks generic low-level networking for ordinary
apps"*, approved through an *"admin-minted, short-lived node-only setup code."*

---

## 2. Command policy — two gates, then a platform table

*"Node commands must pass two gates before they can be invoked"*:

1. *"The node must declare the command in its authenticated connect metadata (`connect.commands`)."*
2. *"The gateway's platform-and-approval-derived allowlist must include the declared command."*

### Default platform allowlists

| Platform | Allowed by default |
|---|---|
| **iOS** | `camera.list`, `location.get`, `device.info`, `device.status`, `contacts.search`, `calendar.events`, `reminders.list`, `photos.latest`, `motion.activity`, `motion.pedometer`, `system.notify` |
| **watchOS** | `device.info`, `device.status`, `system.notify` |
| **Android** | the iOS set plus `notifications.list`, `notifications.actions`, `device.permissions`, `device.health`, `device.apps`, `callLog.search`, `mobile.ui.observe`, `mobile.ui.act` |
| **macOS** | `camera.list`, `camera.ptz.status`, `location.get`, `device.info`, `device.status`, `device.apps`, `contacts.search`, `calendar.events`, `reminders.list`, `photos.latest`, `motion.activity`, `motion.pedometer`, `system.notify`, `computer.act` |
| **Windows** | `camera.list`, `location.get`, `device.info`, `device.status`, `system.notify`, `computer.act` |
| **Linux** | `system.notify`, `computer.act` |

*"These rows describe the Gateway policy ceiling, not the commands implemented by every node app."*
Android advertises mobile-UI commands only while Accessibility Control is enabled; desktop nodes
advertise `computer.act` only while their local Computer Control fulfiller is on; *"The current macOS
app does not declare the device and personal-data families listed in the macOS policy row."*

Plugin defaults extend the table only for their own surface — Canvas adds `canvas.present`,
`canvas.hide`, `canvas.navigate` on **macOS only**. `talk.ptt.start|stop|cancel|once` are allowed for
any node advertising the `talk` capability, *"independent of platform label."*

### The two escalation classes

**Approval-gated desktop host commands** are not in the static table at all: `system.run`,
`system.run.prepare`, `system.which`, `browser.proxy`, `browser.proxy.upload.v1`,
`mcp.tools.call.v1`, and `screen.snapshot` on macOS/Windows/Linux. *"They become available once the
operator approves a pairing request that declares them, after which the node's approved command set
carries them forward on reconnect."*

**One-time persistent opt-in via `gateway.nodes.commands.allow`**, *"even if a node declares them"*:
`camera.snap`, `camera.clip`, `camera.ptz.control`, `desktop.stream`, `screen.record`, `contacts.add`,
`calendar.add`, `reminders.add`, `health.summary`, `sms.send`, `sms.search`.

*"`gateway.nodes.commands.deny` always wins over defaults and extra allowlist entries."* A
plugin-owned node command may add a `registerNodeInvokePolicy` policy that *"runs after the allowlist
check and before forwarding to the node."*

---

## 3. Invoking

```bash
openclaw nodes invoke --node <id> --command device.info --params '{}'
```

**`nodes invoke` blocks `system.run` and `system.run.prepare`** — *"those commands only run through the
`exec` tool with `host=node`."*

Streaming commands use additive `node.invoke.progress` events carrying the invoke id, a zero-based
sequence number and a bounded UTF-8 chunk; *"the Gateway orders chunks before delivering them."*
`node.invoke.result` stays the single terminal response. A streaming caller may set an inactivity
deadline that *"starts with the first progress event and resets after later progress"* while the hard
timeout still applies. Cancellation emits `node.invoke.cancel` and *"the node host then terminates the
matching process tree."*

---

## 4. Node-hosted MCP servers

Configured **on the node machine**, under `nodeHost.mcp.servers`, not on the Gateway:

```json5
{ nodeHost: { mcp: { servers: {
  localDocs:   { command: "npx", args: ["-y", "…", "/srv/docs"], toolFilter: { include: ["read_*", "search"] } },
  internalApi: { url: "https://mcp.internal.example/mcp", transport: "streamable-http",
                 headers: { Authorization: "Bearer ${INTERNAL_MCP_TOKEN}" } },
} } } }
```

*"The headless node host starts these servers, lists their tools, and publishes the descriptors after
connecting. Tool calls return to that node through `mcp.tools.call.v1`; the Gateway does not need
matching MCP config or a JS plugin."* **OAuth MCP servers are not supported by this v1 path.**

Pairing does not need to be repeated for server changes — *"the approved command family is
unchanged"* — but *"the node host does not watch this config"*, so `openclaw node restart` is
required. Tool-list changes from a server apply live; on a closed transport or expired Streamable HTTP
session *"the node withdraws that server's stale tools and reconnects with bounded backoff. The failed
call that detects an expired session is not replayed."*

Gateway-side off switches: `gateway.nodes.pluginTools.enabled: false` ignores **all** agent-visible
tools published by paired nodes; `gateway.nodes.commands.deny: ["mcp.tools.call.v1"]` blocks execution.

---

## 5. Node-hosted skills

Installed under the node's active skills directory (`~/.openclaw/skills` by default, moved by
`OPENCLAW_STATE_DIR` / `OPENCLAW_HOME` / `OPENCLAW_CONFIG_PATH`). *"the Gateway adds them to agent
skill snapshots **only while that node remains connected**."* Each directory name must match the
`name` frontmatter field.

**Files stay on the node.** *"Skill files, referenced relative paths, and binaries remain on that
node."* The agent reads the advertised `node://…/SKILL.md` with the normal `read` tool; runtimes
without it can `cat SKILL.md` through `exec host=node node=<node-id>` using the advertised directory
as `workdir`.

**Two conditions gate the whole feature:** *"The publishing node must have approved `system.run`, and
the agent's exec policy must allow `host=node`; otherwise the skill stays out of that agent's
snapshot."*

Off switches: `nodeHost.skills.enabled: false` on the node; `gateway.nodes.allowSkills: false` on the
Gateway.

---

## 6. Host stats and presence

Connected CLI node hosts and the macOS app report CPU count, load averages, memory and home-volume
disk capacity **every 60 seconds**, surfaced as `hostStats` in `node.list` and `node.describe`. The
snapshot is saved on the paired record, *"so offline nodes keep showing last-known stats with the
original `updatedAtMs`."* Windows omits load averages.

A connected Mac can opt into coalesced physical-input activity (**Settings → Permissions → Active
computer detection**, Accessibility also required); the Gateway *"marks the freshest eligible Mac as
`active`, gives the agent a stable node-id hint, and routes node connection alerts there before a
delayed fallback."*

---

## 7. macOS in node mode

*"macOS can also run in **node mode**: the menu bar app connects to the Gateway's WS server as one
node."* It adds native widget-panel, camera, screen, notification and computer-control commands.

> *"Do not start a second CLI node on that Mac; the app runs the matching CLI node-host runtime as an
> internal worker and remains the sole Gateway connection and node identity."*

The `platforms/mac/*` tree documents setup (dev-setup, menu bar, icon, permissions, signing), runtime
(bundled gateway, health, logging, remote, XPC) and features (voicewake, voice overlay, WebChat,
canvas, skills, peekaboo). Other platform pages cover macOS, Linux, Windows, Android, ChromeOS, iOS
(plus HealthKit) and EasyRunner.

---

## 8. Headless identity state

Three separate records in shared SQLite:

| Table / key | Holds |
|---|---|
| `config_machine_state`, key `nodeHost.config` | Client instance id, display name, Gateway connection metadata |
| `device_identities`, key `primary` | The signed device keypair and derived cryptographic device id |
| `device_auth_tokens` | Paired device auth tokens, keyed by device id and role |

*"For a signed node, the Gateway uses the cryptographic device ID for pairing and node routing. The
client instance ID is only connection metadata."*

Related surfaces in this group: `nodes/presence`, `nodes/computer-use`, `nodes/talk`,
`nodes/voicewake`, `nodes/location-command`, and the media capabilities
(`media-understanding`, `media-playback`, `images`, `audio`, `camera`).
