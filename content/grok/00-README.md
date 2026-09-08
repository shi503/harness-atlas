---
title: "Grok Build / Grok Bot — extensibility reference set"
tier: reference
project: harness-atlas
provenance: OBSERVED
created: "2026-09-08"
source_verified: "2026-09-08"
claims_captured: "2026-09-08"
docs_root: "xai-org/grok-build (in-tree user guide) · https://docs.x.ai/grok-bot"
version_at_capture: "Build: commit 7581004, no tags · Bot: beta, unversioned"
status: ACTIVE
verification:
  derived_from:
    - "xai-org/grok-build @ 7581004 (pushed 2026-09-08; SOURCE_REV eb4a894; no tags, no releases) — all 28 files of crates/codegen/xai-grok-pager/docs/user-guide/, docs/custom-hooks.md, docs/hooks-and-plugins.md, docs/tutorial/01-coming-from-another-tool.md, README.md, CONTRIBUTING.md, SECURITY.md"
    - "docs.x.ai/grok-bot — overview, get-started, bots, skills-routines-and-automations, computer-and-apps, approvals-security-and-privacy, teams-and-enterprises, identity-and-access, private-networks, security, security-faq, mobile, settings-and-notifications, faq — read 2026-09-08"
    - "product and launch copy — x.ai/news/grok-build-open-source, x.ai/news/introducing-grok-bot, docs.x.ai/build/overview, the GitHub repository description — captured 2026-09-08"
  grounded_against:
    - "the profile at ../grok.md, read against 72a6125 (2026-09-01) and docs.x.ai/grok-bot on 2026-09-02"
    - "repository state re-pinned with gh api on 2026-09-08: tags 0, releases 0, HEAD 7581004"
    - "HTTP status probed on every documentation URL cited here, 2026-09-08"
  drafted_by: "claude-opus-5"
  drafted_on: "2026-09-08"
  verified: false
  verified_by: ~
  verified_on: ~
  note: >
    drafted_by is CAPTURED at write time, not attested. Depth (Standard) and scope (BOTH products, read
    as a pair) were agreed before reading, per the harness-deep-read skill's step one. Every numbered
    document names its product in its title and again in its first line, because the two products share
    a vendor and a name and share no codebase.
---

# Grok Build / Grok Bot — extensibility reference set

**This folder is the deep read for the Template v2 profile at [`../grok.md`](../grok.md).**
Start there; open these documents when a detail row's `Ships`/`Path`/`Source` needs more grain.

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

**What this is.** A reading of two products from one vendor, organised by **the surfaces each one
names** — for Grok Build, harness compatibility, configuration, project rules, hooks, permissions, the
sandbox, skills, plugins, MCP, sessions, memory, subagents, plan mode, headless mode and agent mode;
for Grok Bot, Bots, the Agent Computer, skills, routines, approvals, Auto Review and team policy.

**Why it exists.** A profile answers *what is this and how does it compare*. It cannot answer *how does
this surface actually work* in a paragraph. This folder is that grain: the fourteen documented
compatibility divergences, the eight-layer config chain, the fifteen hook events and their four-step
resolution, the five-step authorization pipeline, and the exact wording of what Grok Bot's Auto Review
does and does not promise.

---

## 1. The one thing to know before reading anything here

**Two products. One vendor. One name. No shared codebase, and no primary source that resolves them
into one system.**

- **Grok Build** is an **Apache-2.0 Rust runtime** you install and run. Its documentation is 28
  markdown files **inside the repository**.
- **Grok Bot** is a **closed, hosted product** in beta since 2026-08-11. Its documentation is sixteen
  vendor-hosted pages — fourteen of them read for this set — and there is no repository.

Every document in this folder is about **one** of them, and says which in its filename, its title, its
frontmatter `product:` field, and its opening line. Where a surface exists in both under the same word
— *skill*, *plugin*, *computer* — the difference is stated at the point of collision, in
[`20`](./20-consolidated-guide.md) §1 and in each document's opening line.

**Whether Grok Bot's agent loop is Grok Build is not established here, and this set did not try to
establish it.** No page under `docs.x.ai/grok-bot` mentions Grok Build, `grok`, ACP, or a shared
runtime; no page under `docs.x.ai/build` mentions Grok Bot other than as a sibling navigation entry.
Checked the fourteen Bot pages read for this set, `docs.x.ai/build/{overview, enterprise,
modes-and-commands}`, both launch posts, and the repository's `README.md` and `CONTRIBUTING.md`. The
profile records a shared `bot.*` relay protocol in the repository as unresolved; this set adds nothing
to it.

**Grok Bot launched 2026-08-11 as a beta.** Vendor statements about it are treated here as **claims
about intent**, quarantined in §3 below, never as findings about mechanism.

---

## 2. Scope and shape

**Depth: Standard.** Eleven surface documents, plus this index and the guide. Surfaces the vendor
documents adequately in one page are linked rather than restated.

**Scope: both products, read as a pair** — matching the profile, which does exactly this. Neither
product is subordinate to the other here, and neither is scored.

**The shape found, and why it is not ours.** The two products do not decompose the same way, so this
folder does not force one outline over both:

- **Grok Build publishes a 27-file numbered user guide inside the repository**, cut by the thing you
  configure. Documents `01`–`08` follow that cut, merging where one of our documents needs two of its
  pages (sessions + memory; subagents + plan mode; headless + agent mode) and splitting nothing.
- **Grok Bot publishes sixteen hosted pages** cut by product concept. Documents `09`–`11` follow that
  cut almost one-to-one.
- **One document has no counterpart in either outline.**
  [`01-build-harness-compatibility.md`](./01-build-harness-compatibility.md) assembles a surface the
  vendor documents in ten places and indexes in none. That assembly is this set's largest single
  contribution.

Documents are prefixed `build-` or `bot-` rather than named by the vendor's page titles alone. That
prefix is ours, added because a reader who cannot tell which product a mechanism belongs to has been
actively misled.

---

## 3. What SpaceXAI says each product is for

Verbatim, with source and capture date. These are **claims about intent**, which is the one thing a
vendor is the sole authority on — recorded as claims, never as findings.
[`20-consolidated-guide.md`](./20-consolidated-guide.md) §8 walks them against the mechanisms this set
documents, separately per product.

### Grok Build

| Claim | Source | Captured |
|---|---|---|
| *"**Grok Build** is SpaceXAI's terminal-based AI coding agent. It runs as a full-screen TUI that understands your codebase, edits files, executes shell commands, searches the web, and manages long-running tasks — interactively, headlessly for scripting/CI, or embedded in editors via the Agent Client Protocol (ACP)."* | `github.com/xai-org/grok-build`, `README.md` | 2026-09-08 |
| *"SpaceXAI's coding agent harness and TUI. Fullscreen, mouse interactive, extensible."* | the repository description | 2026-09-08 |
| *"Grok Build is a powerful and extensible coding agent."* | `docs.x.ai/build/overview` | 2026-09-08 |
| *"Publishing the code is the most direct way to build toward a robust and reliable harness."* | `x.ai/news/grok-build-open-source` | 2026-09-08 |
| open-sourcing *"makes the harness easier to explore and extend"* for those working with *"skills, plugins, hooks, MCP servers, or subagents"* | `x.ai/news/grok-build-open-source` | 2026-09-08 |
| *"Grok Build can now run fully local-first: compile it yourself, point it at your own local inference."* | `x.ai/news/grok-build-open-source` | 2026-09-08 |
| *"Fear not — your settings, rules, and skills come with you. Grok Build reads the same project conventions other agents use, and imports the rest."* | in-tree `docs/tutorial/01-coming-from-another-tool.md` | 2026-09-08 |
| *"The public tree is published for source transparency and local builds."* · *"External contributions are not accepted."* | `CONTRIBUTING.md` | 2026-09-08 |

### Grok Bot

| Claim | Source | Captured |
|---|---|---|
| *"Bots are AI teammates you can give real work to. Bots can sign and use apps and websites just like you do on a persistent cloud computer."* | `docs.x.ai/grok-bot/overview` | 2026-09-08 |
| *"Grok Bot is your team of always-on agents. They have their own computer, work inside tools and apps like you do, and keep working 24/7."* | `x.ai/news/introducing-grok-bot` (dated 2026-08-11) | 2026-09-08 |
| *"Grok Bot is in beta and available today for SuperGrok, SuperGrok Plus, and SuperGrok Heavy; Cursor Pro, Pro+, and Ultra; and Cursor Teams Standard and Premium subscribers on desktop and iOS."* | `x.ai/news/introducing-grok-bot` | 2026-09-08 |
| *"A Bot is a durable AI teammate with a name, a job, its own conversation, and working context that develops over time."* | `docs.x.ai/grok-bot/bots` | 2026-09-08 |
| *"Each Bot runs on a persistent cloud VM with a browser, filesystem, and terminal."* | `docs.x.ai/grok-bot/computer-and-apps` | 2026-09-08 |
| *"A skill is a reusable set of instructions for how to do a task."* | `docs.x.ai/grok-bot/skills-routines-and-automations` | 2026-09-08 |
| *"Grok Bot layers defenses: Auto Review checks Bot actions against the member's request when enforcement is on, and beneath it sit controls that do not depend on any model's judgment."* | `docs.x.ai/grok-bot/security` | 2026-09-08 |

---

## 4. Provenance and freshness

> **Read against `xai-org/grok-build` at commit `7581004` and `docs.x.ai/grok-bot` (beta,
> unversioned), 2026-09-08. A surface that has shipped since is not here.**

### Grok Build has no release identity, and still does not

Re-pinned on 2026-09-08 with `gh api`: **0 tags, 0 releases.** HEAD is `7581004`, pushed
2026-09-08T15:09Z, commit message *"Synced from monorepo"*. The repository is a periodic export —
*"It is synced periodically from the SpaceXAI monorepo"* — and `SOURCE_REV` records the upstream commit
`eb4a894da8fb7bcd8d8f398a9d909a7868a4fcf1`, which resolves to nothing public. The changelog the README
links, `x.ai/build/changelog`, returns **403**, as it did at the profile's read six days earlier.

**So there is no version number for this product**, only a commit. Stars 26,581 and forks 4,996 on
2026-09-08 (26,383 / 4,950 at the profile's read).

### Grok Bot has no version identity either

The docs carry no release number, no changelog and no dated revision. The only temporal anchors are the
launch post (2026-08-11) and its *"beta"* statement. **Anything on those pages may have changed since
the profile's read without a visible marker** — and §6 records two places where it has.

### Where the documentation actually lives

**Grok Build's real documentation is in the repository, not on the web.** The 27-file user guide at
`crates/codegen/xai-grok-pager/docs/user-guide/` is the substantive source, and it ships with the
binary: *"extracted to `~/.grok/docs/user-guide/` on launch."* The hosted `docs.x.ai/build/*` pages
exist and return `200`, but are thin by comparison; **`docs.x.ai/build` itself returns 404** while its
children resolve, so a reader who starts at the obvious index gets nothing.

Three in-tree pages sit **outside** the numbered guide and are easy to miss:
`docs/custom-hooks.md`, `docs/hooks-and-plugins.md`, and a nine-part `docs/tutorial/` whose first page
is the only orientation to the compatibility layer that exists anywhere.

**Grok Bot's documentation is entirely hosted.** Sixteen pages exist and all return `200`; **fourteen
were read for this set** — `use-cases` and `troubleshooting` were not opened. Four of the fourteen —
`security`, `security-faq`, `identity-and-access`, `private-networks` — are not in the profile's source
list; whether they are new or were simply unfetched on 2026-09-02 is not determinable from either
source. Two the profile lists as unfetched (`troubleshooting`, `settings-and-notifications`) were read
for this set.

### Refresh protocol

```bash
# Build: still no tags? has the tree moved?
gh api repos/xai-org/grok-build --jq '.pushed_at'
gh api repos/xai-org/grok-build/tags --jq 'length'
gh api repos/xai-org/grok-build/releases --jq 'length'
gh api repos/xai-org/grok-build/contents/SOURCE_REV --jq '.content' | base64 -d

# Build: the user guide IS the documentation. A new file is a new surface.
gh api repos/xai-org/grok-build/contents/crates/codegen/xai-grok-pager/docs/user-guide \
  --jq '.[] | .name + "  " + (.size|tostring)'

# Build: pages outside the numbered guide, historically easy to miss.
gh api repos/xai-org/grok-build/contents/crates/codegen/xai-grok-pager/docs --jq '.[].name'

# Bot: no version exists, so probe the page set. A new page is the only signal.
for p in overview get-started use-cases bots skills-routines-and-automations computer-and-apps \
         approvals-security-and-privacy teams-and-enterprises identity-and-access private-networks \
         security security-faq mobile settings-and-notifications troubleshooting faq; do
  printf '%-34s %s\n' "$p" "$(curl -s -o /dev/null -w '%{http_code}' -L "https://docs.x.ai/grok-bot/$p")"
done
```

When you refresh, update `source_verified` and `version_at_capture` in each file's frontmatter. A
reference doc with a stale date is more dangerous than no reference doc, because it will be trusted —
and for Grok Bot, where no version exists, the date is the *only* thing standing between a reader and
a silently changed page.

---

## 5. The documents

| # | Document | Product | Covers |
|---|---|---|---|
| 01 | [`01-build-harness-compatibility.md`](./01-build-harness-compatibility.md) | **Build** | The `[compat]` switchboard, five discovery surfaces, three mapping tables, fourteen documented divergences, native-versus-advisory policy, `/import-claude` |
| 02 | [`02-build-configuration-and-project-rules.md`](./02-build-configuration-and-project-rules.md) | **Build** | Three files and three authors, the eight-layer chain and its per-key overrides, the `GROK_CONFIG` allowlist, `AGENTS.md` discovery order |
| 03 | [`03-build-hooks.md`](./03-build-hooks.md) | **Build** | All fifteen events, ten config locations, folder trust, four-step resolution, the `allow`/`deny`/`ask`/`defer` vocabulary and `ask`'s exact ceiling |
| 04 | [`04-build-permissions-and-sandbox.md`](./04-build-permissions-and-sandbox.md) | **Build** | Six modes, the five-step authorization pipeline, the read-only lists and their carve-outs, five sandbox profiles, the global-hook write-deny |
| 05 | [`05-build-skills-plugins-and-mcp.md`](./05-build-skills-plugins-and-mcp.md) | **Build** | `SKILL.md` frontmatter, plugin contents and trust, marketplace pinning, `strict_known_marketplaces`, MCP entry fields and the lockdown-on-misconfiguration rule |
| 06 | [`06-build-sessions-and-memory.md`](./06-build-sessions-and-memory.md) | **Build** | The session directory file by file, memory's five-rung enablement, four writers (three silent), search weights, decay and MMR, pruning |
| 07 | [`07-build-subagents-and-plan-mode.md`](./07-build-subagents-and-plan-mode.md) | **Build** | Agents vs personas vs roles, capability modes, the I/O contract, resolution order, depth one, plan mode's four states and three enforcement edges, `/goal` |
| 08 | [`08-build-headless-and-agent-mode.md`](./08-build-headless-and-agent-mode.md) | **Build** | Every headless flag, four output formats and two stop-reason vocabularies, exit codes, three ACP transports, the `x.ai/*` method set |
| 09 | [`09-bot-bots-and-the-agent-computer.md`](./09-bot-bots-and-the-agent-computer.md) | **Bot** | The Bot object, the per-account computer, what a Bot remembers, duplication and sharing, surfaces, connectors |
| 10 | [`10-bot-skills-routines-and-automations.md`](./10-bot-skills-routines-and-automations.md) | **Bot** | Skills by asking and by ten-minute demonstration, routines and their triggers and caps, test-before-enabling, authored failure policy |
| 11 | [`11-bot-approvals-security-and-teams.md`](./11-bot-approvals-security-and-teams.md) | **Bot** | The approval card, Require Approval vs Always Allow, what is and is not a boundary, admin tiers, network reach, residency and compliance |
| **20** | [**`20-consolidated-guide.md`**](./20-consolidated-guide.md) | **both** | **The synthesis: the line between the products, each one's mental model, the surprises — and both claim ledgers walked against what this set documented** |

Read **20** if you have ten minutes. The numbered references are lookup material; open one when you
need an exact field name.

---

## 6. How to read these

- **Every document names its product** — in the filename, the title, the `product:` frontmatter field,
  and the first line under the drafted banner. Nothing here is safe to carry across that line.
- **Exact names are preserved verbatim.** Config keys, hook events, flags, TOML paths and UI paths are
  quoted as the source spells them.
- **Absences name what was checked.** Each numbered document closes with its own; the principal ones
  are collected in [`20`](./20-consolidated-guide.md) §7. None says "appears to lack".
- **Two figures drifted from the profile**, and both are carried with both dates rather than quietly
  matched: **Grok Bot's roster cap** (the profile records ≤50 Bots and group chats on 2026-09-02; no
  such number is on the `bots` page today) and **Grok Bot's audit story** (the profile records *"an
  audit view of Bot actions is coming"*; that sentence was not found today, and an Enterprise audit-log
  entry covering *"Admin, security, and authentication events"* is present instead). A profile is a
  dated read and this is a later one; a figure that changed between them is drift, not an error in
  either.
- **Three of the vendor's own pages disagree with each other**, and all three are carried rather than
  resolved — [`20`](./20-consolidated-guide.md) §7.
- **Nothing here scores.** No coverage marks, no primitive count, no comparison to another harness.
  The profile and the grids do that.
