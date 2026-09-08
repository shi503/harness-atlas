---
status: DRAFT
title: "ClawHub — the registry"
tier: reference
project: harness-atlas
source: "https://docs.openclaw.ai/clawhub · openclaw/openclaw @ v2026.9.3"
version_at_capture: "v2026.9.3 (hosted docs; no repository counterpart)"
source_verified: "2026-09-08"
---

# ClawHub — the registry

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `docs.openclaw.ai/clawhub` on **2026-09-08**, alongside `openclaw/openclaw` at
**v2026.9.3**.

*"ClawHub is the public registry for OpenClaw skills and plugins."*

**This document has no repository source.** The fourteen `clawhub/*` routes are in the navigation tree
shipped at `v2026.9.3` but **no corresponding files exist under `docs/clawhub/`** in the repository at
that tag. Everything below was read from the hosted site. That is a fact about where the
documentation lives, recorded here rather than inferred — see
[`00-README.md`](./00-README.md).

---

## 1. Two CLIs, one registry

The split is the first thing to get right, because both exist and they do different jobs:

| CLI | Owns |
|---|---|
| `openclaw` | Searching, installing and updating skills and plugins **from** ClawHub |
| `clawhub` | Registry **authentication, publishing and deletion** workflows |

Native install paths:

```bash
openclaw skills install @openclaw/demo
openclaw plugins install clawhub:<package>
```

The `clawhub` CLI keeps its own config outside the OpenClaw state directory —
`~/Library/Application Support/clawhub/config.json` on macOS,
`$XDG_CONFIG_HOME/clawhub/config.json` or `~/.config/clawhub/config.json` on Linux,
`%APPDATA%\clawhub\config.json` on Windows — storing the API token and a cached registry URL.

A lockfile at **`.clawhub/lock.json`** records installed skill versions for the `clawhub` CLI's direct
registry workflows.

---

## 2. What it hosts — three package families, four `--family` values

Skills are *"versioned text bundles"* centred on `SKILL.md`; code plugins are OpenClaw plugin
packages with compatibility metadata; bundle plugins are packaged bundles for distribution. The
registry tracks *"semver versions, tags, changelogs, downloads, stars, and security scan
summaries."*

| `--family` | Meaning |
|---|---|
| `skill` | Skills — the default for top-level search |
| `code-plugin` | External code plugins |
| `bundle-plugin` | Bundle plugins, including the foreign bundle layouts in [`09`](./09-plugins-and-the-plugin-sdk.md) |
| `claw` | *"Experimental Claws (publish-only)"* |

---

## 3. The `clawhub` command surface

**Auth** — `login` / `auth login` (device flow or token), `whoami` (verifies via `/api/v1/whoami`),
`token` (prints the stored token).

**Discovery** — `search <query…>` with `--prefix`, `--exact`, `--cursor`; `explore` with `--sort`
(`newest|updated|rating|downloads|trending`) and `--limit`; `inspect @owner/slug` for metadata,
versions and files **without installing**.

**Skill lifecycle** — `install @owner/slug` (*"refuses overwrite of pinned skills"*), `uninstall`
(needs `--yes` non-interactively), `list`, `pin <skill> [--reason]`, `unpin`,
`update [@owner/slug] | --all` (skips pinned; `--force` overwrites), `sync` (scan the workdir and
publish new or changed skills, `--bump minor|major`, `--dry-run`, `--owner`).

**Publishing and ownership** — `skill publish <path>` (`--version`, `--dry-run`, `--owner`,
`--categories`, `--topics`), `skill tag <skill> <version>` (default tag `latest`), `skill rename`
(creates a redirect alias), `skill merge <source> <target>` (source becomes a redirect),
`delete`/`hide` and `undelete`/`unhide` (soft delete; `--version` withdraws or restores one release),
`transfer request|list|accept|reject|cancel`, `publisher create <handle>`.

**Packages** — `package explore` (filters `--family`, `--official`, `--os`, `--arch`, …),
`package inspect`, `package download` (**SHA-256 verified**), `package verify <file>` (*"Compute and
validate ClawHub SHA-256, npm integrity, shasum"*), `package validate <source>` (runs the Plugin
Inspector locally; `--runtime`, `--allow-execute`, `--no-mock-sdk`), `package publish <source>`
(folder, `.tgz`, GitHub repo or URL; `--family`, `--wait`), `package delete`/`undelete`,
`package transfer --to <owner>`, `package report --reason`, `package moderation-status`,
`package readiness`, `package migration-status`.

**Trusted publishing** — `package trusted-publisher get|set|delete`, where `set` requires
`--repository` and `--workflow-filename` with optional `--environment`.

**Scanning** — `scan --slug <slug>` runs *"ClawHub ClawScan"* asynchronously (`--update` writes
results, `--output <file.zip>` downloads the report); `scan download <name>` needs `--version`, and
`--kind plugin` for plugins.

**Global flags** — `--workdir`, `--dir` (default `skills`), `--site` (default `https://clawhub.ai`),
`--registry` (discovered, else the same), `--no-input`, `--yes`.

**Environment** — `CLAWHUB_SITE`, `CLAWHUB_REGISTRY`, `CLAWHUB_WORKDIR`, `CLAWHUB_CONFIG_PATH` (each
with a legacy `CLAWDHUB_*` alias), `CLAWHUB_DISABLE_TELEMETRY=1`, plus `HTTPS_PROXY` / `HTTP_PROXY` /
`NO_PROXY`.

---

## 4. Publishing rules

**Scope must match the owner.** *"The scope must match the selected publish owner"* — a scoped
package can *"only be published as `@owner`"*, and a mismatch means *"Rename the package so the scope
matches the owner you can publish as."* *"A code plugin's manifest `id` must be unique within that
publisher's packages."* Disputed namespaces go through an *"Org / Namespace Claim issue"* with
*"public, non-sensitive proof."*

**Versions.** *"A new skill starts at `1.0.0`"*; *"Later changes automatically publish the next patch
version"*; `--version` is for explicit choices only.

**What a package must carry.** Skills: a folder with metadata, name, slug and owner. Plugins:
`openclaw.plugin.json`, a scoped package name, and source repository/commit metadata. Code plugins
additionally need `package.json` with `openclaw.compat.pluginApi` and `openclaw.build.openclawVersion`.

**Trusted publishing** is two-step: an initial manual publish, then `clawhub package
trusted-publisher set`. The GitHub Actions environment claim *"must match configured name exactly"*
and the workflow needs `id-token: write`.

---

## 5. Security audits — three independent vocabularies

*"ClawHub is open to publishing, but releases are still subject to upload gates, automated checks,
user reports, and moderator action."*

**What is scanned:** *"skill instructions or plugin metadata"*, *"declared environment variables and
permissions"*, *"install instructions and package metadata"*, *"included files and file manifests"*,
*"compatibility and capability metadata."* The audit runs **before installation** and checks
*"coherence: do the name, summary, metadata, requested authority, and actual content line up with
what users would reasonably expect?"*

Three scales, and they are not the same axis:

| Scale | Values |
|---|---|
| **Audit status** — how to react | `Pass` · `Review` · `Warn` · `Malicious` · `Pending` · `Error` |
| **Risk level** — blast radius | `Low` · `Medium` · `High` |
| **Finding severity** | `Info` · `Low` · `Medium` · `High` · `Critical` |

The rollup combines *"SkillSpector, A.I.G, VirusTotal results, and internal risk analysis"*, published
at `/<owner>/skills/<slug>/security-audit`. *"Low-confidence findings are hidden from the public audit
rollup."* Each finding carries *"what it means," "why it was flagged," "the relevant skill or plugin
content," and "a recommendation."*

**Publication is held during review.** *"Expect new releases to stay out of public install surfaces
until automated security checks and verification finish"*, and *"New releases may also stay out of
normal install and download surfaces until review finishes."*

The vendor's own guidance to installers is advisory, not mechanical: *"Install only content you
understand and trust"* and *"Always use judgment before granting sensitive access."*

---

## 6. What blocks an install locally

Registry gates are not the only ones. On the OpenClaw side, `plugins.allow` is a restrictive
inventory when set, `skills.entries.<key>.allowBundled` restricts bundled skills, per-agent
`skills` allowlists control visibility, and the `before_install` plugin hook can inspect *"staged
skill or plugin install material"* and block it — fail-closed on a thrown error or a 15-second
timeout. See [`08`](./08-skills-and-the-skill-workshop.md),
[`09`](./09-plugins-and-the-plugin-sdk.md) and [`11`](./11-hooks-internal-and-plugin.md).

---

## 7. Absences at this read

- **No account-age or identity-verification gate is documented for publishing.** Checked
  `clawhub/publishing`, `clawhub/auth` (via the CLI page) and `clawhub/how-it-works`; the pages
  describe token-based sign-in and say nothing about a minimum account age.
- **No package size limit is stated.** Checked `clawhub/publishing`.
