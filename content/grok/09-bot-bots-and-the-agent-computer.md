---
status: DRAFT
title: "Grok Bot — the Bot, and the Agent Computer it shares"
tier: reference
project: harness-atlas
product: "Grok Bot"
source: "docs.x.ai/grok-bot — overview, bots, computer-and-apps, get-started, mobile, faq"
version_at_capture: "beta, unversioned — no release number is published"
source_verified: "2026-09-08"
---

# Grok Bot — the Bot, and the Agent Computer it shares

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Bot**, the closed, hosted teammate. **Not Grok Build.** Nothing here is a file on your
disk, a config key, or a repository object; there is no public source. Every statement below is the
vendor's documentation, read as documentation.

Read against `docs.x.ai/grok-bot`, **2026-09-08**. **No version identifier is published** — the product
launched 2026-08-11 as *"Early beta"* and the docs carry no release number, changelog, or dated
revision. Anything below may have changed without a visible marker.

---

## 1. The two objects, and how they relate

*"Bots are AI teammates you can give real work to. Bots can sign and use apps and websites just like
you do on a persistent cloud computer."*

*"In the Docs and in the Grok Bot app, a Bot = a single persistent, named agent or one AI teammate."*
And: *"A Bot is a durable AI teammate with a name, a job, its own conversation, and working context
that develops over time."*

**The computer is per-account, not per-Bot** — and this is the single most consequential fact on this
page. *"Each Bot runs on a persistent cloud VM with a browser, filesystem, and terminal"*, but *"The
computer is isolated to your account, not to an individual Bot."* Stated again from the team side:
*"all of that user's Bots share one computer, and Bots isolate personalities and workspaces, not
compute."*

Which is why the vendor states, twice: *"Do not use separate Bots as a security boundary."*

### Bot profile

Set from the Bot menu: *"name, title, description, and avatar."* The description is the durable
instruction surface — Grok Bot's nearest equivalent to a rules file, with no file behind it.

---

## 2. The Agent Computer

*"Open **Agent Computer** from a conversation to view the shared desktop."*

**Shared workspace:** *"The computer has a shared workspace at `/workspace`. Ask Bots to keep durable
project files there and use clear project folders."*

**Browser state is shared too:** *"Browser sessions persist so you usually do not need to sign in for
each task"*, and sessions are shared across the account's Bots.

**Three lifecycle operations, under Settings → Beta:**

| Operation | Effect |
|---|---|
| **Update Agent Computer** | *"rebuilds with the latest image while preserving durable state"* |
| **Recover Agent Computer** | *"replaces an unreachable computer while preserving durable state"* |
| **Reset Agent Computer** | *"returns to the most recent durable snapshot and can discard recent unsaved work"* |

**Concurrency:** *"One Bot can run one computer-use task on its screen at a time."*

**Execution on the member's own machine is a separate, gated capability.** *"A Bot only runs commands
on your local computer when that capability is enabled and you approve it under your local-computer
policy"* — Settings → General → Agent → **Execution on Local Computer**, defaulting to *"Ask every
time"*, with always-required / always-allowed / never-allowed as the alternatives.

---

## 3. What a Bot remembers, and what it does not

*"A Bot can retain stable working preferences, important facts, and summaries from its work."* Also:
*"named Bots keep memory, files, browser sessions, and preferences across turns."*

The stated limit: *"Memory is not a substitute for an authoritative source."*

**Format and location are not documented.** Checked `overview`, `bots`, `computer-and-apps`,
`approvals-security-and-privacy`, `security`, `security-faq`, `faq`, `settings-and-notifications`.
Files land in `/workspace`; memory does not have a named home. Contrast
[`06`](./06-build-sessions-and-memory.md), where Grok Build's memory is a documented directory tree.

**Duplication copies configuration, never history.** *"The copy is named `<name> copy` and carries the
profile, settings, enabled skills, routines, and avatar"*, excluding *"conversation history, learned
memory, or chat attachments."*

**Sharing copies configuration too, and is explicitly not a boundary.** A share link lets a recipient
*"preview it on x.ai"* and *"Add to Grok Bot"*; *"They do not get your computer, logins, or
conversation history."* The vendor's own warning: *"Remove API keys, internal URLs, customer data, and
anything else you would not put in a public document before you share."* And: *"Sharing a Bot is not a
security boundary."*

---

## 4. Composing more than one Bot

The guidance is conservative and stated as guidance, not mechanism: *"Give one Bot ownership of an
end-to-end outcome. Add another Bot only when the work has a stable specialist role."*

**Group chats are the visible-handoff surface.** *"Put Bots in a group chat when the handoff itself
needs to be visible."* Mobile confirms the addressing primitive: *"Mention another Bot or @everyone in
a group."*

**There is no router.** No page describes an object that selects which Bot handles a request; a person
addresses one. Checked `bots`, `overview`, `skills-routines-and-automations`,
`teams-and-enterprises`.

---

## 5. Surfaces

**Desktop:** macOS, Windows or Linux, downloaded from `x.ai/bot` — *"choose the download for your
computer"* with Apple silicon / Intel and x64 / Arm64 builds.

**Mobile:** *"iPhone with iOS 18 or later, or a phone with Android 9 or later."* Note this against the
launch post, which said desktop and iOS; **Android is documented as supported on the mobile page read
2026-09-08**, and the FAQ's unsupported-platform statement now reads *"iPad is not supported at initial
launch"* — with no mention of Android. Both pages read directly today.

Mobile can: send text, dictate, attach photos and files, mention a Bot or `@everyone`, reply in a
thread, react, create Bots and group chats, toggle a routine Active, and search prior work. The Agent
Computer view lets a member *"Watch browser or desktop work"*, *"Take over for a password, two-factor
code, or CAPTCHA"*, *"Inspect the current screen"*, and *"Return control to the Bot."*

**Mobile cannot:** *"Some advanced desktop controls and teach-by-demonstration workflows are not
available on mobile"*, and *"Editing the schedule or instruction, viewing run history, testing, and
deleting a routine currently require the desktop app."*

**Sign-in is Cursor's**: *"Sign In with Cursor from Settings. Finish authentication in the browser
window that opens."* Eligibility is by plan — *"SuperGrok Plus, SuperGrok Heavy, Cursor Pro+, Cursor
Ultra, or Cursor Teams Standard or Premium."*

**First run:** *"On first use, Grok Bot introduces Bots, the shared computer, and routines, then asks
which tools you use."*

**No API and no SDK is documented.** Checked the fourteen Bot pages read for this set, named in
[`00`](./00-README.md)'s `verification: derived_from`. The only programmatic edge is inbound: Slack and
GitHub as routine event sources ([`10`](./10-bot-skills-routines-and-automations.md) §2).

---

## 6. Connectors, which the app calls Plugins

*"Connectors give a Bot a structured way to work with supported services. Connectors are shown as
**Plugins** in the current app."* Added at **Settings → Plugins** → Browse → **Add** → *"Complete
authentication in your browser if requested."*

**They are account-wide, not per-Bot**, and the credential never reaches the machine: *"Connector
tokens stay on Cursor's backend. Bots invoke tools without receiving OAuth tokens, and tokens are never
stored on the computer."*

Policy over them is a team matter — [`11`](./11-bot-approvals-security-and-teams.md) §3.

---

## 7. Absences on this surface

Each names what was checked. All pages read 2026-09-08.

- **No memory format or location.** Checked the eight pages named in §3.
- **No model identity or selection.** *"Model choice is fully managed by the product."* No page names
  which model, or a version. Checked `overview`, `faq`, `teams-and-enterprises`, `security-faq`.
- **No stated relationship to Grok Build.** No page under `docs.x.ai/grok-bot` mentions Grok Build,
  `grok`, ACP, or a shared runtime; no page under `docs.x.ai/build` mentions Grok Bot other than as a
  sibling navigation entry. Checked the fourteen Bot pages read for this set and
  `docs.x.ai/build/{overview, enterprise,
  modes-and-commands}`.
- **No roster cap on this read.** The `bots` page gives qualitative guidance (*"Add another Bot only
  when the work has a stable specialist role"*) and no number; the only sidebar statement is *"Pin
  active Bots to keep them at the top of the sidebar."* Checked `bots`, `faq`,
  `settings-and-notifications`, `teams-and-enterprises`. **The profile records a cap of 50 Bots and
  group chats combined from its 2026-09-02 read**; no such number is on the page today. Both figures
  stand with their dates — see [`../grok.md`](../grok.md) §6 `10a`.
