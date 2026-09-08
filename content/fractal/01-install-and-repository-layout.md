---
status: DRAFT
title: "FRACTAL — install and repository layout"
tier: reference
project: harness-atlas
source: "shi503/fractal-agent-system @ 6398f6db059598e381336601b21609928cf24034"
version_at_capture: "6398f6db (2026-04-20)"
source_verified: "2026-09-08"
---

# Install and repository layout

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `github.com/shi503/fractal-agent-system` at **`6398f6db`** (2026-04-20), **2026-09-08**.

---

## 1. The install

Two commands, no package manager, no version:

```bash
git clone https://github.com/shi503/fractal-agent-system.git
cp -r ./example-claude ./.claude
```

Optionally, project context is copied into the Strategist's intake folder. One runtime dependency:
PyYAML, listed in neither `package.json` nor any requirements file — the README's step 4 verifies it
by hand with `python3 -c "import yaml; print('ok')"`, and *"Known Gotchas"* #3 says
*"`pip install pyyaml` if `import yaml` fails. Not in package.json."*

There are **no releases and no tags** (`gh api …/releases` → `0`, `…/tags` → `0`, 2026-09-08), so an
install is pinned by commit or not at all.

---

## 2. The payload is `example-claude/`, and it is not the tree the repository runs

The repository contains **two** parallel FRACTAL trees:

| Tree | Role | Contains |
|---|---|---|
| `.claude/` | what the repository itself runs | 4 agents, **7** skills, `fractal/` with the router, two BLUEPRINTs, six workstream PRDs, `ISSUES.md`, `EVAL_TEMPLATES/`, `intake/` |
| `example-claude/` | what the install step copies | 4 agents, **6** skills, `FRACTAL/` with the router, one BLUEPRINT, three example workstream PRDs, `ISSUES.md`, `EVAL_TEMPLATES/`, `intake/` |

**Three things exist in the repository's own tree and are not installed.** Verified by diffing the two
directories at the pinned commit:

1. **`claude-md-audit`** — the seventh skill. It lives only at `.claude/skills/claude-md-audit/`, and
   its own "Context Files (Read First)" step requires `docs/claude-md-rubric.md` and
   `docs/research-claude-code-harness.md`, both under a `docs/` directory the README's *"Repository
   Structure"* marks *"(not installable)"*. It instructs the reader to *"halt and report 'rubric not
   found'"* if the rubric is missing — which is what a project that installed only `example-claude/`
   would hit, if the skill were there to hit it.
2. **The four permission-tier JSON files** — `docs/permission-templates/tier-{1,2,3,4-auto}.json`, with
   `docs/permissions-guide.md`. They sit under `docs/`, not under `example-claude/`, so the copy step
   never places them and nothing else installs them.
3. **The TaskFlow demo project** — `app/`, `components/`, `lib/`, `prisma/`, and the two
   `.claude/fractal/BLUEPRINT-M1-*.yaml` / `workstreams/m1-*.md` files that plan it. The repository is
   simultaneously the framework and a Next.js demo application the framework was exercised on.

Two skills also differ in frontmatter shape from the other five. `claude-md-audit` and `gap-analysis`
carry `user-invocable: true` and **no `name:` field**; `fractal-init`, `pulse`, `handoff`,
`quality-pass` and `commit-summarize` carry `name:` plus `disable-model-invocation: true`.
`BEST-PRACTICES.md` §6 explains the latter value and instructs against changing it: *"Do NOT flip
`disable-model-invocation: false` on these skills. That would spawn a fresh context, discarding all
session state."*

---

## 3. The payload's directory is `FRACTAL/`; 58 references inside it say `fractal/`

Git tracks the installable payload as `example-claude/FRACTAL/` — uppercase. After
`cp -r ./example-claude ./.claude`, the framework directory on disk is therefore **`.claude/FRACTAL/`**.

Counted inside `example-claude/` at the pinned commit:

| Written as | Occurrences | Files |
|---|---|---|
| `.claude/fractal/` | **58** | `README.md`, `agents/{architect,feature-lead,strategist}.md`, `skills/{fractal-init,handoff,pulse,gap-analysis}/SKILL.md`, `FRACTAL/BLUEPRINT-Example.yaml` |
| `.claude/FRACTAL/` | **3** | `CLAUDE.md` only |

Every command a user is told to run after installing — `python3 .claude/fractal/router.py status` in
the README's step 5, the `mkdir -p ".claude/fractal/workstreams/${KEBAB}"` in `feature-lead.md`, the
`ls .claude/fractal/router.py` verification in `/fractal-init` — names the lowercase path. So does the
root `.gitignore` entry `.claude/fractal/.state.json`.

On a case-insensitive filesystem (macOS default, Windows) this resolves and nothing is noticed. On a
case-sensitive filesystem it does not. The repository's own `.claude/` tree is lowercase `fractal/`,
so the layout the framework is developed against is not the layout its installer produces.

---

## 4. Three copies of `router.py`

`.claude/fractal/router.py`, `ROUTING_LOGIC/router.py` and `example-claude/FRACTAL/router.py` are
**byte-identical at the pinned commit** (322 lines each; `diff` reports no difference). The README
names `ROUTING_LOGIC/router.py` *"(canonical source)"*.

`BEST-PRACTICES.md` §8 lists the arrangement as an anti-pattern against itself:

> Keep duplicate `router.py` in multiple locations · **Why It's Harmful:** They diverge independently —
> the canonical source falls behind the working version · **Correct Approach:** One canonical source
> (`ROUTING_LOGIC/router.py`), copy to `.claude/fractal/` per the setup guide

Nothing enforces the copy. The divergence the entry warns about has not happened at this commit.

---

## 5. What is gitignored, and what that costs

`example-claude/FRACTAL/.gitignore` (identical to `.claude/fractal/.gitignore`):

```
.state.json
workstreams/*/PULSE.md
workstreams/*/HANDOFF.md
intake/*
!intake/README.md
```

So **the two artifacts the design treats as the audit trail are excluded from version control by
default**, alongside the state file. `BEST-PRACTICES.md` §6 asks for both in the same breath —
*"No PULSE artifacts = no escalation trail"*, and *"Stray HANDOFF.md files are runtime artifacts —
don't commit them. …Add `.claude/fractal/workstreams/*/HANDOFF.md` and
`.claude/fractal/workstreams/*/PULSE.md` to `.gitignore`."* The trail exists on the machine that ran
the workstream and nowhere else. Instance `R` resolves this differently — see
[`07`](./07-the-un-routed-instance.md) §3.

---

## 6. Platform support

| Platform | README status | What ships |
|---|---|---|
| Claude Code | *"First-class"* | `.claude/agents/*.md`, `.claude/skills/*/SKILL.md` — the native formats |
| Cursor | *"Community-supported"* | `SETUP-CURSOR.md` (230 lines), a prose guide for adapting the agent files into Cursor rules and writing the framework directory as `.fractal/` |

No adapter, protocol client or generated artifact accompanies the Cursor path; it is a translation
guide a human follows. `architect.md` carries the parenthetical *"(or `.fractal/` for Cursor)"* in two
places, which is the only place the alternate layout appears outside `SETUP-CURSOR.md`.

---

**Next:** [`02-the-four-tiers.md`](./02-the-four-tiers.md) — the role files the install places.
