---
status: DRAFT
title: "Grok Bot — approvals, Auto Review, and team policy"
tier: reference
project: harness-atlas
product: "Grok Bot"
source: "docs.x.ai/grok-bot — approvals-security-and-privacy, security, security-faq, teams-and-enterprises, identity-and-access, private-networks"
version_at_capture: "beta, unversioned — no release number is published"
source_verified: "2026-09-08"
---

# Grok Bot — approvals, Auto Review, and team policy

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Bot**, the closed, hosted teammate. **Not Grok Build.** There is no permission rule, no
mode, no sandbox profile and no `requirements.toml` here; the whole enforcement story is an approval
card, a model-based reviewer, and dashboard-set policy. Grok Build's is
[`04`](./04-build-permissions-and-sandbox.md).

Read against `docs.x.ai/grok-bot`, **2026-09-08**. **No version identifier is published.**

---

## 1. Team rules — the closest thing to configuration

Set on the Grok Bot dashboard page by a **team admin**. *"Rules are always required and cannot be made
optional, and you scope each rule to Cursor, Grok Bot, or both."*

The vendor's own guidance is to keep them thin: *"short and few, like 'never move company data to
personal accounts'"* — and for anything stricter, to use Auto Review instructions instead.

**There is no file, no version, no diff.** A Bot's own description is the second instruction surface,
and it too is a field in an app. Compare [`02`](./02-build-configuration-and-project-rules.md), where
three files with three authors and eight layers do this work.

---

## 2. Approvals and Auto Review

### The approval card

*"An approval controls the proposed action. It does not reverse work already completed."* The card
shows *"the proposed operation and its inputs"*; desktop offers **Allow once** / **Deny**, mobile
**Approve once** / **Deny**.

**One-shot by default.** The named buttons approve a single action; there is no documented "always
allow this" on the card itself — that is what an Auto Review rule is for.

### Auto Review rules

At **Settings → General → Auto-review**, two rule kinds:

| Rule | Behaviour, verbatim |
|---|---|
| **Require Approval** | *"always stop matching actions for you"* |
| **Always Allow** | *"let matching actions proceed only when the automated review does not identify another reason to stop"* |

*"If both kinds of rule match, **Require Approval** wins."*

**Read the Always Allow definition carefully.** It is not an allowlist: it removes the stop *only when a
model-based reviewer independently agrees*. A rule that matches does not guarantee the action runs.
This is the inverse of Grok Build's `allow` rule, which approves the call outright
([`04`](./04-build-permissions-and-sandbox.md) §2).

**The vendor scopes its own mechanism.** *"Auto Review is model-based and should complement, not
replace, least privilege."* The guidance is to write *"narrow rules around a known action and scope."*

**And Auto Review cannot be locked by an org.** *"Organization-level lock is not available"* for Auto
Review — a member's rules are the member's.

### The local-computer policy

Settings → General → Agent → **Execution on Local Computer**: always required for approval, always
allowed, or never allowed. Default *"Ask every time."* This is the one control that gates the boundary
between the hosted VM and the member's own machine.

---

## 3. What the vendor says is and is not a boundary

**Stated as boundaries:**

- explicit action restrictions written into the request
- *"secure handoffs via password entry"* — for *"login, two-factor, and payment steps, the Bot hands
  the computer to the member rather than typing credentials"*
- per-user compute isolation: *"Each user gets a dedicated computer with hardware-level separation"*,
  via Firecracker microVMs
- credential custody: *"Connector tokens stay on Cursor's backend. Bots invoke tools without receiving
  OAuth tokens, and tokens are never stored on the computer"*

**Stated as *not* boundaries:**

- *"Do not use separate Bots as a security boundary."*
- *"Sharing a Bot is not a security boundary."*
- *"Auto Review is model-based and should complement, not replace, least privilege and explicit
  approval boundaries."*

**Identity is the member's, not the Bot's.** *"A Bot has no identity or credentials of its own"* and
*"Bots act as the signed-in member."* Every action a Bot takes is attributable to a person, and only to
a person.

**On prompt injection, the claim is layered and explicitly bounded.** *"Grok Bot layers defenses: Auto
Review checks Bot actions against the member's request when enforcement is on, and beneath it sit
controls that do not depend on any model's judgment."* Then, in the same section: *"These controls
reduce, but do not eliminate, risk from malicious content."* The controls that *"do not depend on any
model's judgment"* are not enumerated on that page.

---

## 4. Team and organization administration

**Two admin tiers, and the split is stated with its reason.**

| Role | May do |
|---|---|
| **Team admin** | Team Rules, Cloud Agent delegation, public template sharing |
| **Organization admin** | computer management — *"because a computer spans every team the member belongs to"* |

An organization admin can *"look up any member's computer, see when it was created and last active, and
terminate it."* Termination is not deletion: it keeps *"the durable disk"* and starts *"a fresh computer
on the member's next session."*

**Connector policy is inherited, not separate.** *"Grok Bot inherits your team's Cursor connector
policy. There is no separate Grok Bot connector list."* A blocked connector shows as **"Disabled by
team admin."** The MCP allowlist is **Enterprise-only**.

**The model allowlist carries a stated enforcement caveat, and it is unusually frank:** *"The team model
allowlist is Enterprise only, and enforcement is not guaranteed; onboarding presents an acknowledgement
that Grok Bot may not follow the list."* A policy control the vendor documents as advisory, with a
consent screen attached.

**Audit logs are Enterprise-only** and cover *"Admin, security, and authentication events."* Note the
scope: this is administrative auditing, not a per-action record of what a Bot did.

**Availability:** individuals — *"Included with paid Cursor plans or trial"*; teams — *"Included; every
member has access"*; enterprise — *"Contact account team to enable"*, and *"Enterprise access is
rolling out."*

**Identity plumbing** is Cursor's throughout: *"Grok Bot uses your Cursor account, so there is no
separate Grok Bot app in Okta or Entra ID."* SSO is *"SAML 2.0 and works with Okta, Microsoft Entra,
Google Workspace, and OneLogin"*; SCIM 2.0 provisioning is Enterprise-plan, *"and deprovisioning is
automatic."*

**One documented friction, worth knowing before a rollout:** an IdP rule *"that requires FastPass, a
registered or managed device, a compliant device, or a phishing-resistant factor only FastPass can
satisfy fails in the computer browser."* Admins must add an exception path — password plus a secondary
factor, or a passkey from a password manager.

---

## 5. Network reach

*"Grok Bot computers run in Cursor's cloud and reach the internet through shared static egress IP
addresses."* The stated consequence: *"Dedicated per-customer IPs are not available, so treat the ranges
as identifying Grok Bot traffic rather than your team alone."*

**The product control is a destination allowlist**, not a source-IP editor.

**Private-network reach is the customer's own client, installed on the VM.** Two documented options:
Tailscale — *"Run Tailscale on each computer and route through an exit node inside your network"* — and
Cloudflare Tunnel via `cloudflared`, reaching services *"published through Cloudflare's edge, protected
by Cloudflare Access."* Deployed *"on every team computer through Team Setup."*

Three limits stated alongside:

- *"The Grok Bot network policy is a separate layer that still applies; private network reach does not
  replace your destination allowlist."*
- *"Regular internet traffic still egresses through Cursor's shared static IP ranges unless you route
  it through your own network."*
- *"There is no fleet view of script results today."*

And from the security FAQ: *"Cursor does not operate a VPN, tunnel, or private link into your network."*
The tunnel is the customer's; the product hosts the endpoint.

---

## 6. Data, residency and compliance, as stated

- **Location:** *"Where do Grok Bot computers run? In the United States today."*
- **Privacy mode:** *"Legacy Privacy Mode is not supported."* Grok Bot *"uses Cursor authentication and
  account data settings"*, and training opt-out follows those settings.
- **Retention:** *"Backend retention follows the applicable Cursor terms."* On termination, *"The
  durable disk is kept."*
- **Certifications:** *"Anysphere holds ISO/IEC 27001 and ISO/IEC 42001 certifications, issued by
  Schellman, and Grok Bot is included in the current ISO scope."*
- **Subprocessors:** *"If your contract restricts subprocessors, contact your account team."*

**Explicitly not supported:** *"On-premises deployment, deployment inside your own perimeter, and
bring-your-own-image deployment are not supported."* *"Per-organization retention policy and
customer-managed point-in-time restore… are not available."* *"Provisioning connectors to members… is
not available."*

---

## 7. Absences on this surface

Each names what was checked. All pages read 2026-09-08.

- **No per-action audit trail for Bots.** Audit logs cover *"Admin, security, and authentication
  events."* Checked `teams-and-enterprises`, `security`, `security-faq`,
  `approvals-security-and-privacy`. The profile's 2026-09-02 read records *"an audit view of Bot
  actions is coming"*; that sentence was **not found** on any page today, and the Enterprise audit-log
  entry now present covers a different scope. Both stand with their dates — see
  [`../grok.md`](../grok.md) §6 `8b`.
- **No enumeration of the non-model controls** the security page says sit beneath Auto Review.
  Checked `security`, `security-faq`, `approvals-security-and-privacy`.
- **No spend cap.** Usage and billing show consumption; no page describes a limit that stops work.
  Checked `teams-and-enterprises`, `settings-and-notifications`, `security-faq`, `faq`.
