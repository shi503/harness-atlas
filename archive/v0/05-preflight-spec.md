---
title: "v0-05 — Pre-flight: the install config generator"
tier: spec
project: harness-atlas
created: "2026-08-11"
status: ARCHIVED
owner: KD
provenance: AUTHORED
---

# Pre-flight — the install config generator

**What it is.** A single self-contained HTML page a team runs together. It walks the decision bands,
records what the team chooses, and emits a config that drives installation.

**What it is not.** A funnel. For most functions, on most teams, the right answer is a capability that
already exists natively — and the generator must say so plainly. See §6.

**Status: spec only.** No HTML in this pass. This document is written so the build is mechanical.

---

## 1. Why a generator rather than a README

The problem with documenting a framework is that a framework is a *set of choices*, and prose has to present all of them to everyone. A team reading a twelve-function spec has to work out which parts apply to them, in what order, and what they can skip — which is the hardest part of adoption and the part documentation is worst at.

Three properties make the generator worth building over more prose:

- **It is a team artifact, not a reading exercise.** You run it in a room, together, once. The
  arguments happen where they should — at the decision, not six weeks later at the consequence.
- **It records decisions, not just selections.** The output includes *who owns each function* and
  *where the artifact lives*, which is the thing that actually goes stale in a README.
- **It can be honest about omission.** Prose describing twelve functions implies you need twelve. A
  generator can say "you are at stage 2; skip F8 entirely, come back in two quarters."

---

## 2. Shape

| Property | Decision |
|---|---|
| **Format** | Single self-contained `.html` — no network, no CDN, no build step |
| **Where it lives** | `projects/loomwarp/artifacts/preflight.html`, plus published as a shareable artifact |
| **Runtime** | Opens from disk or a link. All state in-page; nothing transmitted |
| **Session length** | Target 20–30 minutes for a team, ~5 for an individual doing a first pass |
| **Persistence** | Answers encode into the URL fragment so a partial session is shareable and resumable |

**Why HTML and not a CLI.** The audience for this includes people who will not run a CLI — a PM, a lead, a security reviewer. The output *feeds* a CLI; the input should not require one.

---

## 3. The flow

Five phases, walking `04-decision-layers.md` §4 sequencing.

```
  ┌─ 0 · WHERE ARE YOU ────────────────────────────────────┐
  │  Team size · repo count · current maturity self-grade   │
  │  Target stage per band  ← imports from 03-maturity JSON │
  └────────────────────────────────────────────────────────┘
                            ↓  gates everything below
  ┌─ 1 · GROUND ───────────────────────────────────────────┐
  │  F0 Which harness · portability posture                 │
  │  F1 Which surfaces · WHICH IS SOURCE OF TRUTH           │
  └────────────────────────────────────────────────────────┘
                            ↓
  ┌─ 2 · STRUCTURE ────────────────────────────────────────┐
  │  F2 Repo topology · registry yes/no                     │
  │  F3 Context layering · briefing yes/no                  │
  └────────────────────────────────────────────────────────┘
                            ↓
  ┌─ 3 · TRUST (early, per sequencing) ────────────────────┐
  │  F6 Enforcement layer · risk posture                    │
  └────────────────────────────────────────────────────────┘
                            ↓
  ┌─ 4 · MOTION ───────────────────────────────────────────┐
  │  F4 Control model · F5 standards + catalog              │
  └────────────────────────────────────────────────────────┘
                            ↓
  ┌─ 5 · TRUST (rest) ─────────────────────────────────────┐
  │  F7 Evidence · F8 Learning (often "not yet")            │
  └────────────────────────────────────────────────────────┘
                            ↓
  ┌─ OUTPUT ───────────────────────────────────────────────┐
  │  Decision record · file manifest · install commands     │
  │  Copy to clipboard · download .md / .json               │
  └────────────────────────────────────────────────────────┘
```

**Phase 0 gates everything.** A team targeting stage 3 is shown a materially shorter questionnaire
than one targeting stage 5. Questions for functions above the target stage are collapsed with a note explaining why they were skipped — visible, so nothing feels hidden.

---

## 4. The question set

> **Four questions added 2026-08-27**, closing the two gaps
> [`../../references/components/MATRIX.md`](../../components/MATRIX.md)
> §2 flagged as *"cheap questions with expensive defaults"* and nobody added: the **individual/team
> memory boundary** and the **project board**. Gas City forces *beads or Linear*; QM forces the scope
> boundary; we forced neither. The answer set for the `F3` questions is
> [`09-context-layer.md`](./09-context-layer.md) §3 and §4.

Per function: one required question, plus conditionals. Every question has a **recommended default** so a team can accept the whole thing in two minutes and refine later.

### Phase 0 — Where are you

| Q                         | Type     | Notes                                                                 |
| ------------------------- | -------- | --------------------------------------------------------------------- |
| Team size                 | number   | Drives whether Surfaces integrations matter                           |
| Repos in scope            | number   | 1 repo skips most of F2                                               |
| Current stage per function | 1–6 grid | Import from the maturity artifact's JSON, or grade inline             |
| Target stage              | 1–6      | Default: current + 1 on the **minimum** function, not across the board |
| Delivery maturity         | 1–6      | Triggers the fast-slop warning if AI target exceeds it by ≥2          |

### Phase 1 — Ground

| Q | Options | Default |
|---|---|---|
| **F0** Primary harness | Claude Code · Codex · OpenCode · Cursor · other · several | Claude Code |
| **F0** Portability posture | Single-harness (use everything) · Portable-where-cheap · Strictly portable (six-field skills only) | **Portable-where-cheap** |
| **F0** Second person installs how | Manual README · script · plugin/marketplace · not solved yet | Plugin/marketplace |
| **F1** Which surfaces are in play | ☑ GitHub ☑ Slack ☐ Gmail ☐ Drive ☐ Linear ☐ Jira ☐ Confluence ☐ wiki ☐ other | — |
| **F1** **Which is the source of truth** | Repo markdown · Linear/Jira · Confluence/wiki · Slack · "we haven't decided" | **Repo markdown** |
| **F1** **Work tracking** | Repo-native JSON (beads-style) · Linear · Jira · GitHub Issues · not decided | **Repo-native** if the SoT is repo markdown |
| **F1** Flow direction | SoT → views (one-way) · bidirectional sync · manual | SoT → views |

> The SoT question is the highest-value question in the generator. If a team answers *"we haven't
> decided"*, the output leads with that as finding #1 — it is the cheapest high-impact fix available
> to most teams.

### Phase 2 — Structure

| Q | Options | Default |
|---|---|---|
| **F2** Topology | Single repo · monorepo · multi-repo estate | — *(from Phase 0 repo count)* |
| **F2** Registry needed? | Yes — routing and impact analysis · No — native config suffices | **No** below 4 repos |
| **F3** **Which scope cells do you keep?** | ☑ individual × project ☑ individual × org ☑ team × project ☐ team × org | **team × project** + **individual × org** |
| **F3** **Where does a fact go?** | We have a written routing rule · we do not | **Adopt the rule** — [`09-context-layer.md`](./09-context-layer.md) §4 |
| **F3** **Context provider** | native fabric only · + gbrain · + an OKF bundle · + a decision ledger | **native** + a decision ledger |
| **F3** Context layering | Single root file · root + per-package · + path-scoped rules | Root + per-package |
| **F3** Briefing / provenance manifest | Yes · Not yet | **Not yet** below target stage 4 |

### Phase 3 — Trust (early)

| Q | Options | Default |
|---|---|---|
| **F6** Enforcement layer | Documentation only · deny rules · deny + hooks · + managed settings · + sandbox | **Deny + hooks** |
| **F6** Risk posture | Permissive · standard · locked-down | Standard |
| **F6** Never-allowed list | free text → generates deny rules | Secrets, force-push to main, production |

### Phase 4 — Motion

| Q | Options | Default |
|---|---|---|
| **F4** Control model | Ad hoc · native subagents · agent teams · dynamic workflows · external orchestrator | **Native subagents** |
| **F4** Durable across process death? | Needed · not needed | Not needed |
| **F5** Standards tier | Adopt LoomWarp's · write our own · none yet | Adopt and adapt |
| **F5** Distribution | Copy by hand · plugin from a marketplace · gstack-style multi-host install | **Plugin/marketplace** at ≥2 repos |

### Phase 5 — Trust (rest)

| Q | Options | Default |
|---|---|---|
| **F7** Evidence | Exit codes · structured results (`--json-schema`) · + OTel · + context join | **Structured results** |
| **F7** Telemetry destination | None · local · collector | Local |
| **F8** Learning | Not yet · eval corpus · + promotion gate | **Not yet** below target stage 5 |

---

## 5. Output

Three artifacts from one run.

**A. The decision record** — markdown, for the repo. This is the primary output.

```markdown
# How we work — <team>
Generated <date> · target stage 4 · delivery maturity 3

| Function | Choice | Provider | Owner | Recorded in |
|---|---|---|---|---|
| F0 Substrate | Claude Code, portable-where-cheap | native | @lead | .claude/settings.json |
| F1 Surfaces  | SoT = repo markdown → Linear, Slack | native MCP | @lead | docs/source-of-truth.md |
| F6 Policy    | deny + hooks, standard posture | native | @security | .claude/settings.json |
| F8 Learning  | NOT YET — revisit at stage 5 | — | — | — |

## What we deliberately are not doing yet
- F3 Briefing — target stage 4 does not require it
- F8 Learning — needs an evidence corpus first
```

**B. The file manifest** — what to create, with the commands.

**C. `preflight.json`** — machine-readable, consumed by an installer and re-importable to resume.

```json
{
  "version": "0",
  "generated": "2026-08-11",
  "target_stage": 4,
  "delivery_stage": 3,
  "functions": {
    "F0": { "harness": "claude-code", "portability": "portable-where-cheap",
            "provider": "native", "owner": "@lead" },
    "F1": { "source_of_truth": "repo-markdown", "surfaces": ["github","slack","linear"],
            "flow": "sot-to-views", "provider": "native-mcp", "owner": "@lead" },
    "F8": { "status": "deferred", "revisit_at_stage": 5 }
  }
}
```

---

## 6. Honesty requirements

Non-negotiable in the build. Without these it is a funnel, and a funnel is worse than no tool.

1. **"Native" is a first-class answer, and often the recommended one.** Nine of twelve functions default
   to a native provider. The generator must not treat that as a lesser outcome.
2. **Deferral is a valid outcome and must be visible.** The decision record has a *"what we are
   deliberately not doing yet"* section. A team leaving with three deferrals has succeeded.
3. **No function defaults to LoomWarp where a native capability exists.** Only four rows carry a
   LoomWarp recommendation, and each states what it costs.
4. **The fast-slop warning is mandatory.** If AI-native target exceeds delivery maturity by ≥2, the
   output leads with that and recommends raising delivery first.
5. **Every recommendation cites its source.** Provider claims link to a page in
   `references/claude-code/` or an entry in `references.md`. No unsourced claims about anyone's
   capabilities, ours or a competitor's.
6. **Nothing leaves the page.** No network calls, no analytics, no telemetry. A team's maturity
   self-grade is sensitive.

---

## 7. Build notes

| Concern | Approach |
|---|---|
| **Single file** | Inline all CSS/JS. No CDN — a strict CSP would block it anyway if published as an artifact |
| **Theme** | Must read in light and dark; define the full light palette on `:root`, override under `prefers-color-scheme` and `[data-theme]` |
| **Responsive** | Usable on a laptop in a meeting room; wide tables scroll inside their own container |
| **State** | In-page; encode to URL fragment for resume and sharing |
| **Import** | Accepts the maturity artifact's JSON to pre-fill Phase 0 |
| **Accessibility** | Keyboard-navigable throughout — it will be driven by one person on a shared screen |

**Sequencing with the maturity artifact.** Build `03-maturity.md`'s explorer first. It produces the
Phase 0 input and is useful standalone; pre-flight without it forces a cold self-grade in the middle
of a config session, which is the wrong place for that conversation.

---

## 8. Open questions

| # | Question |
|---|---|
| **PF-1** | Does the generator emit files directly, or only a manifest a human/agent applies? Draft assumes manifest — safer, and it keeps the artifact side-effect-free |
| **PF-2** | Does it need a "grade our current setup" mode that reads an existing repo, rather than only greenfield? Probably yes, later — and it would be a skill, not the HTML page |
| **PF-3** | How does the decision record stay current after install? Candidate: a `SessionStart` hook that flags drift between `preflight.json` and actual config |

---

*Back to [`00-README.md`](./00-README.md) · landscape in [`references.md`](./references.md)*
