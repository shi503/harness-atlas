---
status: DRAFT
title: "Channels and bindings"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Channels and bindings

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"OpenClaw can talk to you on any chat app you already use. Each channel connects via the Gateway."*
The channel decides whether a message is admitted; the binding decides which agent answers it; the
session key decides what context it lands in. Those are three separate mechanisms and the docs are
explicit that they are not interchangeable.

---

## 1. The catalog, and what "supported" means

The channel list at `/channels` is **generated** (`pnpm channels:catalog:gen`) and carries **32
entries** at this read, each tagged with an install route:

| Route | Meaning | Examples |
|---|---|---|
| **included in core** | Ships in the `openclaw` npm package, no install | WebChat |
| **bundled plugin** | Ships with the core install | A2A, Reef, Telegram |
| **official plugin** | `openclaw plugins install @openclaw/<id>` + Gateway restart | Discord, Slack, WhatsApp, Signal, iMessage, Matrix, Teams, IRC, SMS, LINE, Mattermost, Nextcloud Talk, Nostr, QQ bot, Raft, Synology Chat, Tlon, Twitch, Zalo, Zalo personal, Feishu, Google Chat |
| **external plugin** | Maintained outside the OpenClaw repo | WeChat, WeCom, Yuanbao, Zalo ClawBot |

*"Text is supported everywhere; media and reactions vary by channel."* The five channels with the
deepest sub-trees in the navigation are Slack (11 pages), Matrix (4), Discord (2), iMessage (2) and
Telegram; Slack's tree alone splits transports, Enterprise Grid, manifest and scopes, access control,
threads and sessions, media, rich messages and events.

**Group join introductions** are on by default for Discord, LINE, Matrix, Slack and Telegram — one
room-specific introduction when the bot joins an allowed group. `channels.<channel>.joinIntro: false`
or the per-account override turns it off; *"There is no per-room switch, because a room is only
configurable after the bot has already joined it."* Channels that never read the option **reject**
it rather than accepting a setting they ignore.

---

## 2. The nine-tier routing ladder

Routing picks **one agent** per inbound message. The full tier order, most specific first:

| # | Tier | Match |
|---|---|---|
| 1 | Exact peer | `bindings[].match.peer.kind` + `peer.id` |
| 2 | Parent peer | thread inheritance |
| 3 | Peer wildcard | `peer.id: "*"` for a peer kind |
| 4 | Guild + roles | Discord `guildId` + `roles` |
| 5 | Guild | Discord `guildId` |
| 6 | Team | Slack `teamId` |
| 7 | Account | `accountId` on the channel |
| 8 | Channel | `accountId: "*"` |
| 9 | Fallback owner | a caller-supplied owner, otherwise the sole configured agent or a retained legacy owner |

Tier 9 is stricter than a default: *"Multiple agents without an owner require a matching binding;
routing does not pick the first roster entry."*

Within a tier, **first binding in config order wins** — narrow rules before broad ones. When a
binding names several match fields, *"all provided fields must match."*

**Bindings pick the agent; they do not grant access.** *"a binding is consulted only after the
channel has already accepted the message through its normal pairing, allowlist, and account rules."*

Two mistakes the vendor names: an omitted `accountId` matches **only the channel's default account**
(use `"*"` for a channel-wide fallback), and bindings are not access control.

Optional per-binding fields: `session.dmScope` and `session.groupScope` override session scoping for
matched peers; `comment` documents the rule. A binding may also carry `type: "acp"` — a different
identity contract, covered in [`05`](./05-acp-and-external-harness-sessions.md).

---

## 3. Session key shapes

The routing decision produces a key, and the key is what holds context and bounds concurrency.

| Shape | When |
|---|---|
| `agent:<agentId>:main` | Direct messages, default `session.dmScope: "main"` (or `global` when `session.scope` is `"global"`) |
| `agent:<agentId>:<channel>:group:<id>` | Groups, default `session.groupScope: "per-group"` |
| `agent:<agentId>:<channel>:channel:<id>` | Channels and rooms |
| `…:thread:<threadId>` | Slack and Discord threads, appended to the base key |
| `…:topic:<topicId>` | Telegram forum topics, embedded in the group key |

`session.dmScope` accepts `main`, `per-peer`, `per-channel-peer`, `per-account-channel-peer`.
`session.groupScope` accepts `per-group` or `main`.

**Even when DM history is shared with main, sandbox and tool policy use a derived per-account
direct-chat runtime key** *"so channel-originated messages are not treated like local main-session
runs."* This matters for `sandbox.mode: "non-main"`, where group and channel keys are never main and
are therefore always sandboxed.

**Main DM route pinning.** With `dmScope: "main"`, OpenClaw infers a pinned owner from `allowFrom`
when that list has exactly one non-wildcard entry that normalises to a concrete sender id. A DM from
anyone else still records session metadata but *"skips updating the main session `lastRoute`"* — so a
non-owner cannot silently redirect the main session's replies.

**Guarded inbound recording.** A channel plugin may mark a record `createIfMissing: false`, in which
case metadata and `lastRoute` update for an existing session but *"it does not create a route-only
session entry just because a message was observed."*

---

## 4. Outbound targets

Explicit targets may carry a provider prefix (`telegram:123`, `tg:123`). The prefix is *"a
channel-selection hint only when the selected channel is `last` or otherwise unresolved, and only
when the loaded plugin advertises that prefix."* Cross-channel combinations fail before
normalisation. Target-kind prefixes — `channel:<id>`, `user:<id>`, `room:<id>`, `thread:<id>`,
`imessage:<handle>`, `sms:<number>` — *"stay inside the selected channel's grammar. They do not
select the provider by themselves."*

`channels.<channel>.defaultAccount` picks the account for outbound paths that name none. With two or
more accounts and no explicit default, *"fallback routing may pick the first normalized account ID."*

---

## 5. Broadcast groups

`broadcast` runs **multiple agents** for the same peer, but only *"when OpenClaw would normally
reply"* — after mention and activation gating:

```json5
{ broadcast: { strategy: "parallel", "120363403215116621@g.us": ["alfred", "baerbel"] } }
```

A configured ACP binding is exempt: *"Channel broadcast fan-out does not replace the configured ACP
session for a matched binding."*

---

## 6. Adjacent channel configuration surfaces

`channels/pairing`, `channels/access-groups`, `channels/group-messages`, `channels/groups`,
`channels/ambient-room-events`, `channels/broadcast-groups`, `channels/location`, and
`channels/troubleshooting`.

Two channel pages exist as files in the repository's `docs/channels/` directory but are **not in the
navigation tree** at this read: `bot-loop-protection` and `qa-channel`. They are reachable by URL,
not by browsing — see [`00-README.md`](./00-README.md) for the full orphan count.
