---
status: DRAFT
title: "Operators, roles, and multi-user"
tier: reference
project: harness-atlas
source: "openclaw/openclaw @ v2026.9.3 · https://docs.openclaw.ai"
version_at_capture: "v2026.9.3"
source_verified: "2026-09-08"
---

# Operators, roles, and multi-user

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openclaw/openclaw` `docs/` at **v2026.9.3**, **2026-09-08**.

*"A gateway is one trust domain."* Everything below sits **inside** that boundary. The docs repeat the
caveat in three separate places rather than once, and it governs how every mechanism here should be
read.

---

## 1. The trust statement

> *"Everyone who can operate an agent can make it do anything that agent can do. Session ownership,
> visibility in the sidebar, and presence indicators are usability features, not security
> boundaries."*
> *"If people must not access each other's sessions, tools, credentials, or files, give them separate
> agents or separate gateway/host trust boundaries."*
> *"session ownership, presence, and roles are collaboration guardrails inside the boundary, not
> isolation between adversaries."*

For mutually untrusted parties the answer is one Gateway per tenant —
`/gateway/multi-tenant-hosting`, with `openclaw fleet` as the experimental orchestrator.

---

## 2. Named operator roles

*"Team Gateways can bind authenticated user profiles to named operator roles. Each role combines
**four closed policies**: access to other people's sessions, agents available for session creation and
agent runs, a maximum set of operator scopes, and whether newly created sessions require
sandboxing."*

```json5
{ gateway: { roles: {
  default: "guest",
  definitions: {
    maintainer: {
      sessions: { others: "write" },
      agents: ["roboclaw"],
      scopes: ["operator.read", "operator.write", "operator.approvals"],
    },
    guest: {
      sessions: { others: "view" },
      agents: ["roboclaw"],
      scopes: ["operator.read", "operator.write"],
      sandbox: "required",
    },
  },
} } }
```

### `sessions.others`

| Value | Effect |
|---|---|
| `"none"` | *"hides foreign sessions from lists and targeted access, filters session-level usage to visible sessions, and denies Gateway-wide `usage.cost` because its aggregate can include hidden sessions"* |
| `"view"` | Read only, *"even when a session is otherwise shared"* |
| `"suggest"` | Viewing plus the suggestion flow |
| `"write"` | Participation in foreign sessions; *"draft and incognito restrictions remain in force"* |

*"A person always owns their own sessions."* Explicit membership can raise `view` or `suggest` for one
session; `operator.admin` retains administrative access.

### `agents`

`"*"` for every agent, a list for those ids, an empty array to disallow session creation and agent
runs. *"The allowlist also applies when a run targets an already-existing session."*

### `sandbox`

`"inherit"` (default) keeps the agent's mode. `"required"` sandboxes every new session created by that
role *"even when the agent's sandbox mode is `'off'`"* — with the four properties in
[`13`](./13-tool-policy-approvals-and-sandboxing.md) §6, including per-guest isolation and the `rw` → `ro`
clamp.

### Assignment, and what it changes about auth

`users.setRole` with `{ profileId, role }` assigns; `role: null` clears. *"Assignment changes
immediately invalidate and close that profile's active Gateway connections; reconnecting applies the
current role and scope ceiling."* `gateway.roles.default` is **required whenever roles are
configured** and must name an existing definition.

**Configuring roles narrows how a person may authenticate.** *"When roles are configured,
identity-authenticated operator connections do not receive reusable device or bootstrap tokens: those
tokens are not bound to a person and could bypass the role ceiling. Device-token or bootstrap-token
authentication without a verified user identity is rejected for operator Gateway connections and HTTP
requests."* Node connections, shared-secret access, and Gateways with no role configuration are
unaffected.

---

## 3. The three ownership layers

| Layer | Mutability | What it is |
|---|---|---|
| **Creator** | **Immutable** | A write-once `createdActor`, recorded *"when the creation path can prove who caused it"*. *"Sharing and visibility authority stays anchored on the creator, even after the owner changes"* |
| **Owner** | Assignable | *"the person or agent currently responsible for the session, in the style of a GitHub issue assignee."* Defaults to the creator; the assignment records who reassigned it and when |
| **Participants** | History | *"authenticated people, channel senders, and requesting agents whose accepted input targets the session."* The session's own agent and passive viewers are never recorded |

*"Only a profile creator can receive implicit creator access… Matching channel, agent, or system IDs do
not identify that person."*

**Participants are bounded at 32 identities per logical session.** *"Existing identities can continue
to contribute at that limit. Repair preserves already-retained larger histories."* Recording is
best-effort and background, *"so it never delays a turn."*

**Assignment is display and responsibility only.** *"It does not transfer sharing authority (which
stays with the creator) and does not grant or remove any access."* Both the Control UI menu and the
`sessions` tool's `action: "assign_owner"` (with `ownerType` `"human"`/`"agent"` and `ownerId`) call
`sessions.assignOwner`, requiring `operator.write` **and** an identified caller.

---

## 4. Public access is a separate authority

*"Authenticated teammate visibility and public transcript access are separate. Changing a session
between **Shared**, **Read-only**, **Suggest**, and **Draft** controls signed-in collaborators; none of
those settings creates a public link."*

Public access is enabled explicitly by the creator or a Gateway admin. *"Anyone with the resulting
bearer URL can then read existing and future conversation text without signing in, while tools,
reasoning, files, images, widgets, hidden messages, and internal metadata remain excluded. Assigning a
different owner does not transfer this authority."* Disabling revokes every URL for that publication —
*"remembering that downloaded copies cannot be recalled."*

---

## 5. Presence, mentions, and the Inbox

**Presence is visible to any reader.** *"People presence is shared with operators who have read access
(`operator.read`, also implied by `operator.write` or `operator.admin`). Those readers may see other
people's online and activity timing and reported time zone whether or not the person is watching a
session."* Node and pairing-only connections receive neither.

Presence timing facts are ephemeral and *"reset after the person's final connection closes or the
Gateway restarts."* Connection descriptions and time zones are *"client-reported hints, not verified
physical locations."*

**Watched-session references are filtered per recipient** using `sessions.list` visibility rules —
*"opening someone's card never borrows that person's session access."*

**Mentions** are selection-based: *"Typing or pasting `@name` without selecting a person sends ordinary
text and does not notify anyone."* Up to ten per message. *"A mention never adds session membership,
changes visibility, or grants access; the Gateway rechecks the recipient's current access when
creating and displaying it."* Unavailable in incognito, Goal, catalog, suggestion-only, command-send
and terminal-launch modes, where the composer *"blocks the send… It does not silently discard selected
recipients."*

**Mentions Inbox** retention: *"up to seven days, with at most 100 entries per profile and 10,000
across the Gateway."* *"Old transcript messages are not scanned to rebuild missing entries."*

**Drafts** keep work out of teammates' sidebars, but *"Drafts are never hidden from admins… This is a
coordination feature, not a security boundary."*

**Typing indicators** stream draft text between viewers and are *"never persisted, never enter the
session transcript or the model's context."*

**A single-user Gateway looks unchanged.** *"When the loaded session list contains fewer than two
distinct owner identities and no session has recorded outside participants, OpenClaw hides all
ownership and owner-filter chrome."*

---

## 6. Turn attribution — best-effort, and stated as such

*"Turn sender attribution is best-effort. Steering can merge input into an active turn, so the
transcript cannot always represent each person's contribution as a separate turn. Participant history
records that an actor prompted the session, not which words were theirs."*

*"An authenticated Gateway profile, an OpenClaw agent, and a remote sender remain distinct even when
their IDs match."* OpenClaw *"does not guess a profile from a sender ID, local account label, or UUID
shape"* — an unprovable identity stays an unresolved observation.

*"Synthetic runs, internal messages, and bot or ambient work do not establish personal profile
activity."* Write hooks *"can redact sender identity, but cannot replace it with another trusted
identity."*

**Historical data is not reconstructed.** *"OpenClaw does not rewrite those messages or reconstruct
their authors from UUIDs, profile lookups, or participant history. This can remove profile
presentation from an older message that really was profile-authored, because it did not record enough
evidence to establish that fact."*

**And the standing separation:** *"Transcript attribution, participant aggregates, and creator-based
access decisions remain separate contracts; attribution and participation never grant session
access."*

---

## 7. Getting a team onto one Gateway

The Gateway binds to loopback by default. Three ingress options, ordered by what they buy:

| Option | Identity |
|---|---|
| **Tailnet** (recommended) — Tailscale Serve plus `gateway.auth.allowTailscale` | Per-person; *"no shared secret to distribute"* |
| **Trusted proxy** — an identity-aware proxy such as Cloudflare Access | Per-person, injected headers |
| **Shared secret** — token or password | *"everyone uses one owner profile instead of per-person identity"* |

*"The identity-backed options are worth the setup: they are what turns 'someone did something' into
'who did what'."*

**Unidentified operators share one profile.** *"Single-user Gateways give unidentified operators one
shared owner profile, including device-token reconnects. With `gateway.roles` configured, this applies
only to token/password connections."*

### Working as a sandbox-required guest

*"A sandbox-required guest can work without an administrator role."* With the default
`workspaceAccess: "none"`, tools use a writable private workspace and managed skill instructions stay
read-only. *"Child sessions inherit the parent's sandbox requirement, even when the agent's default
sandbox mode is off."*

*"Local container sandboxes have no network by default."* Enabling `docker.network: "bridge"` for the
coding agent lets guests clone and install — and the vendor scopes what that grants: *"Network access
does not grant host execution or inject shared credentials… the read-only root filesystem still
prevents system package installation. Enabling egress allows requests to destinations reachable from
the container."*

### One admin authority worth knowing

*"An authenticated Control UI administrator with `operator.admin` can manage any automation
conversationally on that Gateway, including jobs created from another channel or by another person.
This authority comes from the admitted administrator turn, without matching channel identities to
Gateway profiles. It does not transfer the job's creator attribution or scheduled execution policy."*

### Git co-author credit

GitHub-backed sign-in through Cloudflare Access or Tailscale Serve verifies the account under
**Settings → Profile → Identity**. *"Public `Co-authored-by` credit remains a separate **Git co-author
credit** toggle, on by default for verified accounts."* Attribution uses that preference plus durable
participant records — *"not display names or the four-person facepile projection."*
