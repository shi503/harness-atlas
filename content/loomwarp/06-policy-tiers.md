---
status: DRAFT
title: "Policy tiers"
tier: reference
project: harness-atlas
source: "`loomwarp-team-system` @ `8844df6` (branch `master`, private) — `policy/tier-{1,2,3,4-auto}.json`, `vendor/manifest.json`, `control/dispatch.py`, `context/org/PRINCIPLES.md`, `standards/evaluation-doctrine.md`, `fractal/STRATEGIST-loomwarp.md`, `context/memory/decision-ledger/store/ADR-005.md`"
version_at_capture: "8844df6f4bc48f8a563340eb3163401792e000d5"
source_verified: "2026-09-08"
---

# Policy tiers

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `loomwarp-team-system` @ `8844df6` (private), **2026-09-08**.

`policy/` holds four JSON files shaped as Claude Code `settings.json` permission blocks. All four are
vendored byte-identical from `fractal-agent-system` @ `6398f6d` `docs/permission-templates/`
(verified at this read). They are templates a person copies into a target repository's own
`.claude/settings.json`; nothing in this repository loads them.

---

## 1. The four files

| File | `defaultMode` | allow | deny |
|---|---|--:|--:|
| `tier-1.json` | — | 12 | 4 |
| `tier-2.json` | — | 38 | 8 |
| `tier-3.json` | `acceptEdits` | 50 | 12 |
| `tier-4-auto.json` | `auto` | 50 | 10 |

**The ladder is a widening of the allow list.** Tier 1 permits build, typecheck, lint and test
commands and nothing else. Tier 2 adds installs, Prisma, filesystem basics, local git (`add`,
`commit`, `checkout`, `branch`, `stash`, `merge`, `rebase`) and `python3 *router.py *`. Tier 3
replaces several narrow entries with wildcards (`npm run *`, `npx prisma *`), and adds branch-scoped
pushes (`git push origin feat/*`, `fix/*`, `chore/*`), `gh pr`/`gh issue`/`gh api`, `WebSearch`, and
twelve `WebFetch(domain:…)` entries. Each rung's permissions are a functional superset of the rung
below, though not a literal string superset — tier 3's wildcards subsume tier 2's explicit entries
rather than repeating them.

**Tier 4 has the same allow list as tier 3 and a shorter deny list.** The two entries tier 3 denies
and tier 4 does not are `Bash(curl *)` and `Bash(wget *)`. Tier 4 also carries an `autoMode` block
absent from every other file, with an `environment` array and a `soft_deny` array of four prose
rules.

**Every deny list is anchored by the same four entries** — `Bash(rm -rf *)`, `Read(./.env)`,
`Read(./.env.*)`, `Read(./.env.local)` — present in all four files. Tiers 2–4 add
`Bash(git push …)` restrictions, `Bash(npm publish *)` and `Bash(npx prisma migrate reset)`.

**Tier 4's `autoMode.environment` describes the upstream project, not this one.** It reads
*"Organization: FRACTAL Agent System"* and *"Source control: github.com/shi503/fractal-agent-system"*,
because the file was vendored verbatim and never adapted. `soft_deny` is prose (*"Never force-push to
main or master"*, *"Never modify `.claude/settings.json` directly"*), stated in a JSON file that no
program in this repository reads.

## 2. Nothing in the control plane loads them

`control/dispatch.py` builds no `--settings` argument; `router.py` and `control/sync-skills.sh` do
not reference `policy/` at all. The only occurrences of the word `tier` in the control-plane code are
three comments in `dispatch.py`. Wiring is manual and is recorded in prose:
`docs/BUILD-LOG.md` states that `tier-3.json` was *"wired into
`notify-service/.claude/settings.json`"*, and `docs/DEMO-SCRIPT.md`'s governance beat is
`cat repos/notify-service/.claude/settings.json` — explicitly labelled *"**narrated diff**, not a live
denial attempt."*

## 3. The live dispatch bypasses them

`dispatch_headless` passes `--permission-mode bypassPermissions` as a literal
([`03-dispatch-and-outcome-classification.md`](./03-dispatch-and-outcome-classification.md) §3). The
decision is recorded as `ADR-005`, `layer: governance`:

> tier-3.json deny rules (no push to main, no rm -rf, no curl, no .env reads) are DESIGNED and wired
> into notify-service settings.json but are NOT enforced during tonight live headless run, since
> bypassPermissions skips all permission checks including deny rules. The correct production fix is
> workspace trust plus acceptEdits, not bypassPermissions -- this is a known, named limitation for
> tonight, not a solved problem.

`docs/BUILD-LOG.md` records the three experiments behind it: `acceptEdits` alone returned `UNKNOWN`
after 153s with all forty allow entries silently ignored; `bypassPermissions` completed in 31s at
$0.18; `acceptEdits` plus an explicit `--settings tier-3.json` was *"still blocked, identical
stderr."* The stated root cause is a Claude Code workspace-trust gate on a repository never opened
interactively.

## 4. Three statements in the tree about enforcement

| Source | Statement |
|---|---|
| `context/org/PRINCIPLES.md` §1, loaded into dispatched prompts | *"**Deny wins.** Policy enforcement (see `policy/`) is outside the prompt and cannot be weakened by a workstream, a repo, or an agent's own judgment."* |
| `fractal/STRATEGIST-loomwarp.md` §5, failure mode **FM-2** | Risk: *"**Policy theater** — controls that exist as configuration and are bypassed in execution."* Guard: *"A red test per enforcement rule; `bypassPermissions` banned by a mechanical check, not a convention."* |
| `standards/README.md` | *"**Prefer mechanical enforcement to prose.**… Where a rule is only prose, that is a known gap, not a finished state."* |

Neither the red test nor the mechanical `bypassPermissions` ban exists in the tree. The repository's
own `docs/BUILD-LOG.md` records the same conclusion in the first person — *"That is FM-2 (policy
theater) caught in our own repo"* is how the self-assessment puts it — and `BLUEPRINT-LoomWarp-V1.yaml`
carries the intended remedy as an unauthored workstream, `FeatureLead-PolicyEnforcement`, whose
comment states *"the red test that proves the deny path is the deliverable, not the rule itself."*

## 5. Two ladders named "tier"

`standards/evaluation-doctrine.md` §4 defines a five-rung risk ladder, `R0`–`R4`, indexed by action
class rather than by tool list:

| | `R0` | `R1` | `R2` | `R3` | `R4` |
|---|---|---|---|---|---|
| Action class | read non-sensitive | reversible local | shared reversible | consequential | irreversible |
| Default | autonomous | autonomous within declared paths | conditional | supervised | **deny by default** |

The doctrine states these are assessed *"per proposed action, not once per session."* The `policy/`
files are four whole-session permission sets numbered 1–4. **No document in the agreed scope maps one
onto the other**, and the counts differ (five rungs against four files) — checked in
`standards/evaluation-doctrine.md`, `standards/README.md`, `policy/*.json`, `context/org/PRINCIPLES.md`
and `fractal/STRATEGIST-loomwarp.md`. `STRATEGIST-loomwarp.md` §3 lists *"full R0–R4 risk tiering"*
under the **v1.x** gate, i.e. as not yet delivered.
