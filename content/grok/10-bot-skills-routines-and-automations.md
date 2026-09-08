---
status: DRAFT
title: "Grok Bot — skills, routines and automations"
tier: reference
project: harness-atlas
product: "Grok Bot"
source: "docs.x.ai/grok-bot — skills-routines-and-automations, faq, mobile, settings-and-notifications"
version_at_capture: "beta, unversioned — no release number is published"
source_verified: "2026-09-08"
---

# Grok Bot — skills, routines and automations

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**Product: Grok Bot**, the closed, hosted teammate. **A Grok Bot skill is not a Grok Build skill.**
Grok Build's is a directory containing a `SKILL.md` with fifteen documented frontmatter fields
([`05`](./05-build-skills-plugins-and-mcp.md) §1). Grok Bot's has **no documented file format at all**.
Same word, different object, same vendor.

Read against `docs.x.ai/grok-bot`, **2026-09-08**. **No version identifier is published.**

---

## 1. Skill

*"A skill is a reusable set of instructions for how to do a task."* Its content is *"steps, decision
rules, expected output, and safety boundaries."*

**Two ways to create one, and the second is the distinctive mechanism:**

1. **By asking.** Request the Bot to save a process as a skill, in natural language.
2. **By demonstration.** *"When Teach a task is available, you can demonstrate a browser workflow
   instead of describing every step."*

**Teaching has a hard bound and a review step.** *"Teaching records visible computer interaction for up
to ten minutes."* The output is a draft the person reviews before it is saved — capture from doing,
then human approval. Availability is not universal: *"The rollout may be gradual, and the recording is
limited to ten minutes."*

**Skills are enabled per Bot** (Settings → Plugins → Yours), while connectors are account-wide
([`09`](./09-bot-bots-and-the-agent-computer.md) §6). The two scopes differ and the docs say so.

**No file format, no export, no import.** Checked `skills-routines-and-automations`, `bots`,
`computer-and-apps`, `settings-and-notifications`, `faq`, `security-faq`. Whether a skill is
`SKILL.md`-shaped underneath is never stated, and no page offers a way to move one in or out.

---

## 2. Routine

*"A routine tells one Bot when to run a workflow — on a schedule or, where supported, after an event."*

| Trigger | Example given |
|---|---|
| Schedule | *"Every weekday at 8:00 AM, run the Daily customer-risk skill"* |
| Event | *"When a message in `#customer-escalations` contains a support ticket link"* |

**Named event sources: Slack and GitHub.** *"where supported"* is the qualifier, and no page enumerates
the full supported set.

**Two stated limits:**

- *"A Bot can own up to 50 routines"*
- *"the app keeps the 20 most recent run records for each routine"*

**Schedules use one timezone**, set per account: Timezone is *"which routines use for schedules"*
(Settings → General).

**Routines run detached.** The launch framing is that Bots *"keep working 24/7"*; the product surface
for this is the routine, and the mobile app can toggle one Active without the desktop.

**Managing a routine is desktop-only.** *"Editing the schedule or instruction, viewing run history,
testing, and deleting a routine currently require the desktop app."* Mobile can only pause and resume.

---

## 3. Test before enabling — the one gate, and what it is not

*"A test run performs real work. It can navigate websites, change files, and call connected tools. Use
safe inputs and keep write actions behind approval."*

**This is the whole of the pre-enable check**, and it is a person running the thing once, not a harness
evaluating it. There is no dry-run mode, no assertion, no pass/fail record. The controls that make a
test survivable are the approval layer's, not the routine's —
[`11`](./11-bot-approvals-security-and-teams.md).

---

## 4. Failure policy is authored, not configured

The documented approach to a routine hitting missing data is to **write the policy into the skill's
instructions**: a *"no-data and stale-data policy"*, so the Bot handles missing source data explicitly
*"rather than using outdated information."*

There is no retry setting, no failure-notification setting, and no dead-letter surface. What exists is
the general notification control: *"Turn on **Notifications** in a Bot's settings to receive an
operating-system or mobile notification when that Bot finishes or needs input"*, with the caveat that
*"Notifications are normally suppressed while Grok Bot is focused"* and *"Both device permission and
the Bot's notification setting must allow the notification."* In-app errors appear *"above the composer
under **Notifications**."*

---

## 5. Absences on this surface

Each names what was checked. All pages read 2026-09-08.

- **No skill file format, storage location, or portability.** Checked the six pages named in §1.
- **No enumeration of supported event sources.** Slack and GitHub are exemplified; *"where supported"*
  is not resolved into a list. Checked `skills-routines-and-automations`, `computer-and-apps`,
  `teams-and-enterprises`, `settings-and-notifications`.
- **No retry, backoff, or failure-escalation mechanism.** Checked
  `skills-routines-and-automations`, `settings-and-notifications`, `faq`.
- **No cap on skills per Bot.** Routines are capped at 50; skills are not. Checked
  `skills-routines-and-automations`, `bots`, `settings-and-notifications`.
