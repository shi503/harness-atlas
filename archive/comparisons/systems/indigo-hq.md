---
title: "Teardown — Indigo HQ"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
source_analysis: "prior first-party PM analysis of Indigo HQ, 2026-06-04 (held outside this repo)"
---

# Indigo HQ

**What it is.** A filesystem-based shared context layer that sits *underneath* coding agents: a
structured `~/HQ` directory, a canonical charter file (`AGENTS.md` symlinked to `.claude/CLAUDE.md`),
a hook suite, a skill and worker registry, a local-first secrets vault, and a Rust/Tauri menubar sync
app. Open-source core with a paid cloud-sync and services attach. Seed stage.

**Why it is in this corpus.** It is the closest structural analogue to LoomWarp — same category,
same bet on riding open standards, same instinct that policy belongs in hooks rather than prose — and
it is far enough along to show what that architecture looks like when it meets a real customer.

> Derived from a prior first-party analysis (June 2026) of the getindigo.ai site, PDFs, and the live
> `hq-core/.claude/CLAUDE.md`. Figures below are as of that analysis and are **two months stale** —
> treat traction numbers as directional.

---

## Architecture

| Layer | Implementation |
|---|---|
| **Context injection** | One canonical charter: root `AGENTS.md` → symlink → `.claude/CLAUDE.md`. Read natively by Claude Code, Codex, Cursor |
| **Skills** | `.claude/skills/{name}/SKILL.md`; Codex reads via `.agents/skills`. Slash commands consolidated *into* skills — no separate commands tree |
| **Guardrails** | Hooks on `PreToolUse`/`PostToolUse`/`PreCompact`/`SessionStart`/`Stop`: auto-commit of HQ edits, mechanical block on git mutation at HQ root, pre-compact checkpointing, 50%-context warnings. **Hook profiles: minimal / standard / strict** |
| **Layout** | `companies/` (isolated tenants) · `repos/{public,private}/` · `core/` (release-shipped, replaced wholesale by `/update-hq`) · `personal/` (overlay, symlinked, cannot override core) · `workspace/` (threads, handoffs, locks) |
| **Multi-tenancy** | Company inferred from working directory → loads that company's policies and infra manifest. Cross-company credential bleed is classified a *"category-1 bug"* |
| **Orchestration** | The **Ralph loop**: plan from PRD → execute one task in fresh agent context → review with typecheck/build/test as back-pressure → checkpoint/learn → iterate. Feature branches only; HQ root is pull-only |
| **Workers** | YAML-defined (`worker.yaml`): Code/Content/Social/Ops/Research; auto-generated registry; invoked `/run {worker} {skill}` |
| **Secrets** | `yokotoken` (MIT) — local-first encrypted vault, XSalsa20-Poly1305 + Argon2id, Ed25519 identity, org/project scoping. Agents exec via `hq run` and **never see raw credentials** |
| **Search** | `qmd` (third-party) — BM25 + vector + hybrid rerank, collections per company |
| **Sync** | `hq-sync` — Rust + Tauri 2 + Svelte menubar app, bidirectional, conflict resolution |
| **Sharing** | `/deploy` (signed-URL artifacts behind DNS) · `/hq-share` (encrypted single-use 15-minute URLs treated as capabilities) |

---

## What it forces you to decide

1. **The `core/` versus `personal/` overlay split** — what the vendor owns and replaces wholesale
   versus what you customize. This is the cleanest answer in the landscape to the
   vendor-updates-versus-user-customization problem, and it is a decision `05-preflight-spec.md` does
   not ask about.
2. **Hook profile: minimal, standard or strict** — the third independent three-level
   human-in-the-loop posture in this corpus.
3. **Whether tenancy is a directory or a deployment.**

---

## What it does well

**The symlink as a portability strategy.** One charter file serving both the `CLAUDE.md` and
`AGENTS.md` conventions is the cheapest possible multi-vendor abstraction, and it means HQ rides the
standards rather than fighting them. QM reaches the same place from the other direction with a
written divergence protocol.

**Hooks as mechanical enforcement, not prompt hopes.** Blocking git mutation at HQ root via a
`PreToolUse` hook is precisely `F6`'s principle: enforced at a point the model cannot reach. The
minimal/standard/strict profiles show real operational maturity.

**`core/` versus `personal/` with skip-on-collision symlinks.** A clean answer to a problem most
dotfile-shaped systems fumble.

**Secrets-as-execution-context.** `hq run` means the agent never holds the credential. This is the
correct security architecture for agentic execution and almost nobody else in the category has it.

**Fresh-context-per-task with CI back-pressure.** The Ralph loop uses typecheck/build/test as the
reviewer — the mechanical substitute for a human gate, and the same instinct as FRACTAL's completion
gate.

---

## What it does not claim

No RBAC · no audit trail · no context provenance · no maturity diagnosis · no standards tier · no
cross-repo impact analysis.

---

## Credibility check

**This is the most useful part of the teardown, because Indigo is a live example of the failure mode
`STRATEGIST-loomwarp.md` FM-1 and FM-3 name.**

| Signal | Finding |
|---|---|
| **Marketing vs. code drift** | The public technical guide describes a `.claude/commands/` tree with 35 commands and "no AppBar"; the live repo says commands were consolidated into skills and ships a menubar app. Worker/skill counts differ across surfaces (17/26 vs 28/44 vs 45/60+). The site is simultaneously ahead of and behind the code |
| **License gaps** | Flagship `hq-core` and `hq-sync` have **no license file**; only `open-hq`, `yokotoken`, `goclaw-agent`, `uicp` are confirmed MIT. For a self-described "open-source AI operating system" that is a material claim-vs-reality gap and an adoption blocker for any legal review |
| **Traction** | `hq-core`: 39 GitHub stars. Alpha: 26 users / 10K AI jobs. Funding: $125K (LAUNCH/Calacanis). Testimonials on the landing page appear to be internal alpha screenshots |
| **Prior pivot** | The 2024 Product Hunt launch was a prompt-library command palette, not this product |
| **Constraints** | 16GB Mac minimum, plus a $100–200/mo coding-agent subscription per seat. Windows/Linux "coming soon" |
| **Business model** | Services-heavy: engagements at $150–250K (10–12 wks) / $300–500K (16–20 wks). The OSS product is partly a lead magnet for the advisory business |

**The lesson for us is direct.** Indigo's architecture is good and its documentation outran its code
— the same FM-1 this project was re-founded to avoid. The visible symptom was inconsistent counts
across surfaces, which is exactly what our documentation-drift conformance test is supposed to catch.
It is worth noting that we would currently fail the same audit: `references/elements.md` says seven
elements, `specs/v0/` says nine, and nothing mechanical reconciles them.

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **`core/` vs `personal/` overlay**, skip-on-collision | `F3`/`F5` — vendor-vs-user customization, and the individual/team boundary |
| 2 | **The `AGENTS.md` ↔ `CLAUDE.md` symlink** | `F0` — cheapest possible portability move |
| 3 | **Hook profiles** minimal/standard/strict | `F6` — human-in-the-loop as a named posture |
| 4 | **Auto-generated worker registry** | `F5` — makes agents discoverable rather than remembered |
| 5 | **Secrets-as-execution-context** (`hq run`) | Noted as pattern only — out of scope for v1 |
| 6 | **Pre-compact checkpointing** | `F7` — cheap durability against context loss |
| 7 | **Their credibility gaps, as a checklist to run against ourselves** | FM-1, FM-3 |

---

## Sources

Primary analysis: a first-party PM analysis of Indigo HQ dated 2026-06-04, held outside this
repository, which cites getindigo.ai (landing, getting-started, technical-guide, research, labs,
blog), `github.com/indigoai-us` (`open-hq`, `hq-core`, `hq-sync`, `hq-installer`, `yokotoken`,
`goclaw-agent`, `indigo-sol`), and install.getindigo.ai v0.5.0. All public sources; the analysis is
cited for its reading of them.

**Staleness warning:** all figures are as of 2026-06-04 and are two months old at time of writing.
Re-verify before citing traction externally.
