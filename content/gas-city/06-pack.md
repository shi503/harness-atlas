---
status: DRAFT
title: "Pack — the loading order, the binding, and secret-by-pointer"
tier: reference
project: harness-atlas
source: "gastownhall/gascity @ 042e965 · docs/guides/understanding-packs.md · docs/reference/specs/pack-spec.md · docs/reference/system-packs.md · docs/reference/config.md"
version_at_capture: "main/edge 042e965 (v1.4.1 is the latest release, 2026-08-15)"
source_verified: "2026-09-08"
---

# Pack — the loading order, the binding, and secret-by-pointer

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `gastownhall/gascity` at **`042e965`**, **2026-09-08**.

*"A pack is what configures the system — a directory with a `pack.toml` that declares agents,
formulas, and orders, plus the support files they need. The local (root) pack is your **City** …
The same engine becomes a different orchestrator purely by swapping which packs it loads."*
— `docs/getting-started/how-gas-city-works.md`

`nine-concepts.md` states the consequence as an invariant: *"**Pack config IS the feature flag.**
An empty `city.toml` gives Level 0-1. Adding sections activates capabilities. No feature flags, no
capability flags — the config presence is sufficient."*

---

## 1. The progressive capability model

Capabilities activate on config-section presence. Nine levels, from `nine-concepts.md`:

| Level | Config required | Adds |
|---|---|---|
| 0-1 | `[workspace]` + `[[agent]]` | Session + tasks |
| 2 | `[daemon]` | Task loop (controller) |
| 3 | `[[agent]]` with `[agent.pool]` | Multiple agents + pool |
| 4 | `[mail]` | Messaging |
| 5 | Formula files + `[formulas]` | Formulas |
| 6 | `[daemon]` health fields | Health monitoring |
| 7 | `orders/` directories | Orders |
| 8 | All sections | Full orchestration |

A pack is *"a directory with a `pack.toml` file. Only `pack.toml` is required."* If the loader
*"cannot understand a pack's `schema`, it rejects the whole pack rather than loading part of it."*

---

## 2. The loading order

The single most load-bearing table in the pack model, verbatim from
`docs/guides/understanding-packs.md`:

```text
city.toml + city pack
  → imported packs (+ their pack-level patches)
  → city-level imports → city-level patches
  → rig-level imports (stamp rig agents) → rig overrides
  → pack globals
  → city agent defaults (blank fields only)
```

*"The later operation wins for replacement-style fields. Defaults run last but only fill blanks, so
they never override an explicit value from an earlier layer."*

**Defaults and patches are different operations.** *"A patch changes an agent that already exists.
It does not create a new agent."* Defaults *"fill in blanks after packs have loaded"* — *"explicit
agent fields win, bound imports preserve inherited pack defaults, and unbound legacy includes yield
to root city defaults."*

Where to put a change, from the guide's own decision table:

| If you want to… | Put it here |
|---|---|
| Reuse another pack | `[imports.<binding>]` with `source` and optional `version` |
| Make a city-wide local policy | `city.toml` defaults or patches |
| Change one city-level imported agent | `city.toml` `[[patches.agent]]` |
| Change one rig-level imported agent | the rig's `[[rigs.overrides]]`, or a targeted city patch with `dir` |
| Ship reusable behavior | the pack's own definitions and support files |
| Pin an exact resolved dependency | *"The lockfile, not the authored import"* |

---

## 3. The binding qualifies the name — and that is what prevents collisions

*"Because the import binding qualifies every imported agent name (as `gascity.planner`), you address
imported agents by that qualified name — not bare `planner` — in patches, targets, and commands,
**and the imported pack's own name never overrides the binding**."*

The consequence: *"Two imports that define agents with the same local name therefore coexist:
`build.worker` and `review.worker` do not collide. Config load fails only when two source
directories produce the same qualified name on the same surface — for example, two unbound legacy
includes that both define a city-level `reviewer`."*

Legacy `workspace.includes` — the V1 mechanism — is the *unbound* case that can still collide, and
it is deprecated in favour of `[imports.*]`: *"Run `gc doctor` to inspect; `gc doctor --fix` handles
the safe mechanical rewrites available in this release wave."*

---

## 4. Handle versus source

A registry handle and a durable source are different values with different lifetimes, and the guide
separates them explicitly:

| Value | Example | Used in |
|---|---|---|
| **Registry handle** | `main:gascity` | `gc pack registry` commands. *"`main` is this machine's registry name — another machine could call it `work`"* |
| **Durable source** | `https://github.com/gastownhall/gascity-packs/tree/main/gascity` | *"Checked-in import TOML. Independent of any machine's registry name or cache"* |

The registry is *"discovery only"* — *"Registry commands … never sync the authored import graph."*
`gc pack registry show` prints paste-ready import commands built *"from the `Source` line and the
selected `version` — the registry handle stays out of the file."*

Resolution commands: `gc import install` *"resolves the declared imports, writes or repairs
`packs.lock`, and materializes the packs in the local cache"*; `gc import check` is *"a read-only
pass"*; `gc import why`, `status`, `list`, `prune`, `upgrade` complete the surface.

**Publishing enforces a scoped name.** Per `CHANGELOG.md` `[Unreleased]`, `gc pack registry publish`
*"now refuses an unscoped pack name unless you pass `--allow-unscoped-name`"*; new packs must set
`[pack].name = "<github-owner>/<pack>"`, the scope must be *"the lowercased GitHub owner of the
source repository"*, and `--name` *"can no longer rename a pack at publish time: the registry
byte-compares it with `[pack].name`."*

---

## 5. Private packs — secret-by-pointer

A pack whose source (or a transitive import) is private needs a git credential, and the mechanism is
worth stating exactly because it is not the obvious one:

> *"Credentials are never written into `pack.toml`, `packs.lock`, or `city.toml`; they live in a
> separate, never-committed `credentials.toml`, **secret-by-pointer** — the file records where to
> find the token, never the token itself."*

Four pointer kinds, exactly one required per rule:

```console
$ gc import credential add github.com/gascity --helper 'gh auth token'
$ gc import credential add github.com/gascity --token-file /var/run/secrets/git/token
$ gc import credential add github.com/gascity --token-env GC_GIT_TOKEN
$ gc import credential add github.com/gascity --ssh-key-file ~/.ssh/packbot_ed25519
```

Matching is *"a bare host or `host/path-prefix` (longest-prefix wins, so same-host different-org
credentials coexist)."* The default location is `<city>/.gc/credentials.toml` at mode `0600`;
`--global` writes `$GC_HOME/credentials.toml`.

**File modes are enforced, and the accepted set includes one specifically for Kubernetes:**
*"gc refuses to load a `credentials.toml` that is world-accessible or group-writable: the modes it
accepts are 0600/0400, plus the root-owned own-group 0440 that a Kubernetes Secret volume mounted
with `fsGroup` produces."*

---

## 6. Built-in packs are imports, not magic

`docs/reference/system-packs.md` is unusually careful about this, and the sentence is the point:

> *"Built-in packs are not implicit: nothing splices them into config composition at load time. They
> compose only through explicit pinned imports in `pack.toml`, which `gc init` writes for you."*

The binary *"pre-seeds the cache with its own embedded content at each pack's canonical pinned
commit, so the pinned imports below resolve offline"*, served from `$GC_HOME/cache/repos/`
(default `~/.gc/cache/repos/`). *"Nothing is materialized into the city."*

```toml
[imports.core]
source = "https://github.com/gastownhall/gascity.git//internal/bootstrap/packs/core"
version = "sha:<pinned commit>"
```

*"Pinning a bundled source at any other commit makes it an ordinary remote import"* — the pin
*"always does what it says."*

The bundled set: **`core`** (always), **`bd`** (*"written only for cities using the `bd` beads
provider"*, pulling `dolt` transitively), and **`gastown`** / **`gascity`**, which are
*"bundled but never required — they arrive via the templates that use them … or an explicit
import."*

`core` contributes skills (`gc-*`), default worker prompt assets, formulas (`mol-do-work`,
`mol-scoped-work`), housekeeping orders (including `beads-health`), the `core:check-binaries` doctor
check, and *"per-provider hook and instruction overlays for supported coding agents."*
**`core` ships no agents at all**, deliberately: *"Packs that need long-lived utility workers define
their own."*

`gc doctor` carries a fixable `builtin-pack-imports` check that migrates a legacy city off the
retired per-city `.gc/system/packs` tree.

The public registry (`gastownhall/gascity-packs`) is surveyed in `docs/guides/registry-showcase.md`;
authoring for distribution is `docs/guides/shareable-packs.md`; the normative format is
`docs/reference/specs/pack-spec.md` — *"Gas City Pack Specification"*, *"Authoritative
specification"*, last verified 2026-05-30, pack schema `2`, primary implementation
`internal/config/pack.go`, `compose.go`, `config.go`.

(A small stale citation, noted because a reader following the naming rule will hit it:
`engdocs/contributors/docs-organization.md` gives *"Gas City 1.0 Pack System (PackV2)"* as its
worked example of a spec title. The file's actual `title` at this read is *"Gas City Pack
Specification"*.)

**A pack can carry an upstream, and that is trusted configuration.** From
`docs/guides/configuring-an-agent.md`: *"A pack-carried `[upstreams.<name>]` (its `base_url`,
credential env-refs, and raw `[env]` block) is TRUSTED configuration — the same trust level as a
pack's `provider.command` — so only import packs you trust."* See
[`10-trust-boundaries.md`](./10-trust-boundaries.md) §1.
