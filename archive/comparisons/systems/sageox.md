---
title: "Teardown — SageOx / Ox CLI"
tier: reference
project: loomwarp
created: "2026-08-11"
status: DRAFT
owner: KD
---

# SageOx / Ox — *the closest competitor to `F3`*

**What it is.** Agentic context infrastructure: a system that captures a team's decisions and
discussions, stores them in a queryable Ledger, and injects them into every coding-agent session before the agent writes a line. Seattle-based, launched January 2026, $15M seed in May 2026 led by Canaan. The `ox` CLI is MIT and open source; the console and capture hardware are the commercial product. Steve Yegge is a contributor.

**Why it matters to us more than anything else in this corpus.** `specs/v0/02-elements.md` names the
Briefing — the per-job resolved context bundle — as *"LoomWarp only — does not exist yet."*
`ox agent prime` is that capability, shipping, across a dozen harnesses, funded. Our claim has to
narrow. See §6.

---

## Architecture

| Layer | Implementation |
|---|---|
| **Capture — automatic** | Hooks on session start/end, prompts, tool calls, and compaction events |
| **Capture — manual** | Recording discussions and decisions at sageox.ai |
| **Capture — physical** | **Ox Dot**, a hardware device for in-person discussion |
| **Storage** | `.sageox/` per-repo configuration; a centralized **Ledger** accessible across machines |
| **Distillation** | **Knowledge Bubbles** — team context distilled from discussions and decisions |
| **Injection** | `ox agent prime` — injects conventions, security requirements, architectural decisions and prior sessions into the agent before execution |
| **Surfaces** | **Ox Console** (team dashboard) · **Ox MCP** (connector for assistants) · **Ox CLI** |
| **Harness support** | Primary and best-tested: Claude Code. Also Codex CLI, Gemini CLI, Droid, OpenCode, Amp, Pi, Aider, goose; instruction-file support for Cursor, Windsurf, Cline, Copilot. Detects via process ancestry rather than environment variables |

**The loop:** discussion → capture → Knowledge Bubbles → `ox agent prime` → agent session →
automatic capture back to Ledger.

---

## Primitives it names

| Primitive | What it is | Nearest LoomWarp function |
|---|---|---|
| **Knowledge Bubbles** | Distilled team context | `F3` Context Fabric |
| **Ledger** | Per-repo queryable record; captures sessions automatically | `F7` Evidence |
| **Agent Prime** | Context injection before execution | **`F3` The Briefing** |
| **Team Context** | Conventions, security requirements, architectural decisions | `F3` |
| **Coworker** | The agent, framed as a colleague | `F5` Capability |

CLI surface: `ox login` · `ox init` · `ox doctor` · `ox status` · `ox query` · `ox murmur` ·
`ox agent prime` · `ox session list` · `ox plan enrich` · `ox code insights` · `ox coworker load`.

---

## What it forces you to decide

1. **What counts as a decision worth capturing** — and whether that judgment is automatic or reviewed.
2. **Whether capture is ambient.** The Ox Dot is a bet that meaningful decisions happen in rooms, not
   in tickets. Adopting it is a cultural decision, not a technical one.
3. **Where the Ledger lives**, given it is cross-machine and centralized.

---

## What it does well

**The problem statement is the sharpest in the landscape.**

> *"AI agents are missing all the discussions your team is having."*
> *"Every agent session starts with everything your team already knows."*
> *"Your assistants stop being strangers. They know what your team knows."*
> *"Conversations don't disappear. They become team memory."*

**Automatic capture is the real differentiator.** Everyone in this corpus has a capture loop and
almost everyone's is manual — Indigo's `/learn`, gstack's *"skillify what it did"*, our `F8`. SageOx
treats manual capture as the failure mode and engineered around it, including in hardware. That is
the single most defensible thing about the product.

**Process-ancestry harness detection** rather than environment-variable sniffing is a small,
genuinely better engineering choice for a tool that must work under a dozen runtimes.

**Breadth of harness support without an adapter framework.** Hooks where hooks exist, plugins where
plugins exist, instruction files where neither does. Pragmatic tiering rather than a lowest common
denominator.

---

## What it does not claim

No standards tier · no policy enforcement · no maturity diagnosis · no multi-repo estate routing ·
no orchestration or task decomposition beyond `ox plan enrich`.

**Critically: no provenance.** Nothing in the published documentation evidences content hashing,
version pinning, owner attribution, or the ability to reconstruct which context set produced a
specific past result. It holds both ends of the join and does not appear to make the join.

---

## Credibility check

| | |
|---|---|
| **License** | MIT (`ox` CLI). Console and Dot are commercial |
| **Funding** | $15M seed, May 2026, led by Canaan; A.Capital, Pioneer Square Labs, Founders' Co-op |
| **Stage** | Launched January 2026. Repo: 679 commits, 47 stars, 7 open issues as of access date |
| **Traction signal** | Stars are low relative to funding — consistent with an early commercial product where the CLI is the on-ramp, not the product |
| **Stated limitation** | *"Claude Code represents the primary, most-tested implementation; other agents show varying maturity levels in context priming/recording capabilities."* Honest, and worth imitating |
| **Inferred, not verified** | Whether a personal-versus-team scope distinction exists inside the Ledger |

---

## 6. What this does to LoomWarp's claim

`02-functions.md` §6 lists the Briefing as one of four rows carrying LoomWarp's differentiation, and
`references.md` §3 claims context provenance is unclaimed. Half of that survives.

| Claim | Status |
|---|---|
| *Context assembly per job is LoomWarp-only* | ❌ **False.** `ox agent prime` ships it |
| *A hashed, versioned, owner-attributed manifest, reconstructable after the fact and joined to outcome, is unclaimed* | ✅ **Holds** — and SageOx is the system best positioned to close it |

**The rewrite this forces**, for the function-model pass:

> Context assembly is shipping and well funded. Context **provenance** — knowing what the agent saw,
> at which version, from which owner, and being able to reconstruct it against that work's outcome —
> is still unclaimed by everyone in this corpus.

**Falsifier, stated so it can be checked:** if SageOx adds version pinning and per-run manifest
reconstruction to the Ledger, LoomWarp's remaining `F3`/`F7` claim is gone. That is a plausible next
feature for them, not a distant one. **Re-check by 2026-12-01.**

---

## What to steal

| # | Pattern | For |
|---|---|---|
| 1 | **Automatic capture via hooks** on session/prompt/tool/compaction events | `F8` — our capture loop is manual and this is the cheapest fix |
| 2 | **`prime` as a named verb** | `F3` — "the Briefing" is a noun nobody can act on; `prime` is a command |
| 3 | **Process-ancestry harness detection** | `F0` — more robust than env-var sniffing |
| 4 | **Tiered harness support** (hooks → plugins → instruction files) | `F0` — a realistic portability posture |
| 5 | **The stated-limitation register** | Everything — matches QM's honesty and our own `STRATEGIST` §2.4 |

---

## Sources

- <https://github.com/sageox/ox> — MIT · accessed 2026-08-11
- <https://sageox.ai/product> · accessed 2026-08-11
- [VentureBeat — agentic context infrastructure](https://venturebeat.com/technology/ai-agents-are-missing-all-the-discussions-your-team-is-having-sageox-has-an-answer-agentic-context-infrastructure) · accessed 2026-08-11
- [GeekWire — $15M seed](https://www.geekwire.com/2026/seattles-sageox-lands-15m-to-help-humans-and-ai-agents-work-in-lockstep/) · accessed 2026-08-11
