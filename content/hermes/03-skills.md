---
status: DRAFT
title: "Skills — the format, the tiers, and the eight install sources"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/skills · .../configuration · .../reference/skills-catalog"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Skills — the format, the tiers, and the eight install sources

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

*"Skills are on-demand knowledge documents the agent can load when needed."* This document covers the
static surface: what a skill file is, where skills come from, and what governs loading one. The
agent **writing** its own is [`04`](./04-the-learning-loop.md); what happens to one that stops being
used is [`06`](./06-curator.md).

---

## 1. Progressive disclosure — three levels

The loading pattern, with the vendor's own cost annotation:

```
Level 0: skills_list()           → [{name, description, category}, ...]   (~3k tokens)
Level 1: skill_view(name)        → Full content + metadata                (varies)
Level 2: skill_view(name, path)  → Specific reference file                (varies)
```

Only Level 0 is resident. This is what makes a hundred-skill library affordable, and what makes
`references/` files free until a question needs one.

## 2. `SKILL.md`

```yaml
---
name: my-skill
description: Brief description of what this skill does
version: 1.0.0
platforms: [macos, linux]          # optional — restrict to specific OS platforms
metadata:
  hermes:
    tags: [python, automation]
    category: devops
    fallback_for_toolsets: [web]   # conditional activation
    requires_toolsets: [terminal]  # conditional activation
    config:                        # config.yaml settings this skill declares
      - key: my.setting
        description: "What this controls"
        default: "value"
        prompt: "Prompt for setup"
---
```

The body follows a fixed section order: `# Skill Title`, `## When to Use`, `## Procedure`,
`## Pitfalls`, `## Verification`.

**House authoring standards**, named where `/learn` cites them: *"≤60-char description, the standard
section order, Hermes-tool framing, no invented commands."*

### `platforms`

| Value | Matches |
|---|---|
| `macos` | macOS (Darwin) |
| `linux` | Linux |
| `windows` | Windows |

*"When set, the skill is automatically hidden from the system prompt, `skills_list()`, and slash
commands on incompatible platforms. If omitted, the skill loads on all platforms."*

### Declared environment variables

```yaml
required_environment_variables:
  - name: TENOR_API_KEY
    prompt: Tenor API key
    help: Get a key from https://developers.google.com/tenor
    required_for: full functionality
```

Hermes asks *"securely only when the skill is actually loaded in the local CLI"*; the setup can be
skipped and the skill still used. **Messaging surfaces never ask for secrets in chat** — they redirect
to `hermes setup` or `~/.hermes/.env`. Once set, declared vars are *"automatically passed through to
`execute_code` and `terminal` sandboxes."*

### Declared config settings

Non-secret settings land under `skills.config` in `config.yaml`. `hermes config migrate` prompts for
unconfigured ones; `hermes config show` displays them; *"When a skill loads, its resolved config values
are injected into the context so the agent knows the configured values automatically."*

## 3. Directory layout

```text
~/.hermes/skills/                  # Single source of truth
├── mlops/                         # Category directory
│   └── axolotl/
│       ├── SKILL.md               # Main instructions (required)
│       ├── references/            # Additional docs
│       ├── templates/             # Output formats
│       ├── scripts/               # Helper scripts callable from the skill
│       ├── examples/              # Referenced example outputs
│       └── assets/                # Supplementary files
├── .hub/                          # Skills Hub state
│   ├── lock.json
│   ├── quarantine/
│   ├── taps.json
│   └── audit.log
├── .usage.json                    # Curator telemetry — see 06
├── .archive/                      # Curator archive — see 06
└── .bundled_manifest              # Tracks seeded bundled skills
```

## 4. Where skills are found, and which wins

Precedence, stated as a three-tier ladder: **`project → local (~/.hermes/skills/) → external_dirs`**.

| Tier | Path | Notes |
|---|---|---|
| Project | `<project-root>/.hermes/skills/` and `<project-root>/.agents/skills/` | Project root is *"the nearest ancestor directory containing `.git` (worktrees and submodules count)"*. Tagged `[project]` in the skill index |
| Local | `~/.hermes/skills/` | The profile's own library |
| External | `skills.external_dirs` | Repo-owned; the curator never modifies them |
| Bundles | `~/.hermes/skill-bundles/` | YAML files grouping skills under one slash command |

*"A project skill named `deploy` overrides a same-named profile or bundled skill for sessions inside
that repo."*

`skills.create_dir` redirects where **new** agent-created skills land — *"a shared 'brain' directory, a
git-tracked repo, or a fleet-wide skills volume"*. The tool description and prompt text render the
configured directory dynamically, so the agent is told the right path. Bundled sync, the hub and the
curator keep operating on the profile-local directory.

### Project skills are trust-gated, then scan-gated

Two independent gates, and the second is the one that survives a `git pull`:

1. **Repo trust, once.** *"Hermes does **not** auto-load them from arbitrary cloned repos."* The banner
   shows `◆ 3 project skill(s) found … but not loaded — run 'hermes skills trust' to enable them.`
   Trusted roots persist in `skills.trusted_project_dirs`; `skills.project_discovery: false` turns the
   whole feature off.
2. **Content scan, every change.** *"Trust is a repo-level decision, but a repo's skill content changes
   with every `git pull`."* Every project skill is scanned with the hub scanner before entering the
   index. A **dangerous** verdict quarantines it — invisible in the index, in `skills_list`, in slash
   commands, and it *"refuses to load by name with an explanatory error."* Scans are content-hash
   cached at `~/.hermes/cache/project_skill_scans/` — *"never inside your repo"*.

**Non-interactive surfaces inherit, never decide**: *"Cron jobs and other non-interactive surfaces
inherit your interactive trust decision — they never prompt and never auto-trust."* A cron job's
project root resolves from its `workdir`.

## 5. The eight install sources

| Source | Example identifier |
|---|---|
| `official` | `official/security/1password` — *"Optional skills shipped with Hermes"* |
| `skills-sh` | `skills-sh/vercel-labs/agent-skills/vercel-react-best-practices` |
| `well-known` | `well-known:https://mintlify.com/docs/.well-known/skills/mintlify` — from a site's `/.well-known/skills/index.json` |
| `url` | `https://sharethis.chat/SKILL.md` — direct `SKILL.md` plus *"explicitly referenced support files"* |
| `github` | `openai/skills/k8s` — direct repo/path installs and custom taps |
| `clawhub` | source-specific identifiers |
| `lobehub` | source-specific identifiers |
| `browse-sh` | source-specific identifiers |

Name resolution for a `url` install runs **frontmatter → URL slug → interactive prompt → `--name`
flag**.

What an install actually copies: *"`SKILL.md` plus the exact local files it references under
`references/`, `templates/`, `scripts/`, `assets/`, and `examples/`. Unreferenced repository files are
not copied."* The recorded provenance is *"the source URL, exact content hash, scanner version,
findings, timestamp, and fresh-or-cached status"* in `skills/.hub/lock.json`.

### Taps

A tap is *"any GitHub repository other Hermes users add with `hermes skills tap add <owner/repo>`. No
server, no registry sign-up, no release pipeline."* Taps live in `~/.hermes/skills/.hub/taps.json`.
*"New taps are assigned `community` trust by default"*; raising a repo's tier requires adding it to
`TRUSTED_REPOS` in `tools/skills_guard.py`, which the docs state *"requires a Hermes core PR"*.

## 6. Trust levels

| Level | Source | Policy |
|---|---|---|
| `builtin` | Ships with Hermes | Always trusted |
| `official` | `optional-skills/` in the repo | Built-in trust, no third-party warning |
| `trusted` | *"Trusted registries/repos such as `openai/skills`, `anthropics/skills`, `huggingface/skills`, `NVIDIA/skills`"* | More permissive policy than community sources |
| `community` | *"Everything else"* | Non-dangerous findings overridable with `--force`; `dangerous` verdicts stay blocked |

**`--force` has a hard ceiling.** *"`--force` can override policy blocks for caution/warn-style
findings"* but *"does **not** override a `dangerous` scan verdict."*

A second, advisory scanner runs alongside: **NVIDIA SkillEvaluator Tier 1** checks — *"deterministic
and keyless — PII detection (leaked emails, personal paths, connection strings), unicode-smuggling
detection, script lint, license"* — reported as a second opinion, not as install policy.

## 7. Update lifecycle

```bash
hermes skills check                  # report which installed hub skills changed upstream
hermes skills update                 # reinstall only those with updates
hermes skills update react --force   # overwrite a skill you have edited locally
hermes skills audit                  # re-scan all hub skills for security
```

Drift is detected from *"the stored source identifier plus the current upstream bundle content hash."*

**Local edits are protected by default**: a skill whose on-disk content no longer matches the hash
recorded at install *"are **skipped** by `hermes skills update` so your changes are never silently
overwritten."*

Two statuses that skip the network entirely: `orphaned` (missing or non-directory install) and
`invalid_install` (unsafe or unresolvable recorded path). *"No entries are removed automatically"* —
`orphaned` clears with `hermes skills uninstall <name>`; `invalid_install` requires repairing
`skills/.hub/lock.json` by hand.

**There is no total deadline on an update check**: *"an unreachable or slow source for an existing
install can still delay later entries."*

### Bundled skills and `hermes skills reset`

Bundled skills sync from the repo's `skills/` into `~/.hermes/skills/` on install and on every
`hermes update`, with the origin hash recorded in `~/.hermes/skills/.bundled_manifest`. A locally
edited bundled skill sticks as user-modified; `hermes skills reset <name>` clears the manifest entry
and re-baselines while preserving the local copy, and `--restore` deletes the local copy and re-copies
the bundled version.

## 8. Bundles

Skill bundles are *"tiny YAML files that group several skills under a single slash command"*, at
`~/.hermes/skill-bundles/<slug>.yaml`:

```yaml
name: backend-dev          # optional — defaults to the filename stem; normalized to a hyphen slug
description: Backend feature work — review, test, PR workflow.   # optional
skills:                    # required, non-empty — names or paths relative to the skills directory
  - github-code-review
  - test-driven-development
instruction: |             # optional — prepended to the loaded skill content
  Always start by writing failing tests, then implement.
```

Managed with `hermes bundles list / show / create / delete / reload`; `/bundles` lists them in chat.

Four stated behaviours:

- **Bundles win slug collisions against individual skills** — *"This is intentional — you opted into
  the bundle by naming it."*
- **Missing skills are skipped, not fatal** — the bundle loads what resolves and the agent gets a note
  listing what was skipped.
- **They work on every surface** — CLI, TUI, dashboard chat, every gateway platform — *"because
  dispatch is centralized in the same place as individual skill commands."*
- **They do not invalidate the prompt cache** — *"They generate a fresh user message at invocation
  time … no system prompt mutation."*

*"A bundle is just a YAML alias — it doesn't install skills for you."*

## 9. Conditional activation

Two frontmatter keys under `metadata.hermes` gate a skill on the session's toolsets rather than on the
platform:

- `requires_toolsets: [terminal]` — the skill is only offered when those toolsets are present.
- `fallback_for_toolsets: [web]` — the skill stands in when that toolset is absent.

Toolsets themselves are configured per platform and per surface — see
[`11`](./11-plugins-and-extension-points.md).
