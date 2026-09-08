# HANDOFF — FeatureLead-Codex (W4 #1)

**Completed:** 2026-09-03
**Epic:** harness-atlas — the re-cut
**Workstream PRD:** `fractal/workstreams/W4-teardowns.md` (amended block, 2026-09-03), for harness
**Codex** (OpenAI Codex CLI, `openai/codex` @ `rust-v0.153.2` / commit `79016fc`).
**Procedure:** `skills/harness-teardown/SKILL.md`, full run (not `--sanity`). Read first, in full, per
the dispatch: `CLAUDE.md`, `W4-teardowns.md`, the skill, `docs/agents/issue-tracker.md`, and
`W0-alignment-HANDOFF.md` §7 (sanity-run findings).

## Summary of Work Completed

1. **`content/codex.md`** — full Template-A profile. Frontmatter pinned to `rust-v0.153.2` (79016fc),
   read date 2026-09-03. Opener (three paragraphs), legend, §A Identity (13-field table, three-question
   inclusion test answered per-layer per Rule 7, loop question, primitive preview, structured-output
   line), a `## Diagram` section, §B (all 33 rows, fixed order), §C (primitive table + count/verdict),
   §D (six grouped quote blocks), §E (primary/secondary sources, every `gh api` command and every docs
   URL fetched), §F (nine non-empty bullets, including a disclosure about WebFetch-mediated quotes).
2. **`assets/projects/codex/basic-ui-flow.mmd`** — the "Basic UI Flow" sequence diagram from
   `codex-rs/docs/protocol_v1.md` (a design doc in the tree, source-only, not in the docs nav; a second
   diagram, "Task Interrupt," in the same file is listed, not redrawn, per the diagram rule for multiple
   diagrams). Redrawn as a house-notation `flowchart TD`; embedded as a copy in the profile between §A
   and §B, matching the placement convention in `content/gas-city-draft.md`.
3. **`comparisons/systems/90-short-profiles.md`** §1 — the Codex CLI row updated in place (not
   duplicated) with *"Torn down 2026-09-03"*, linking to `content/codex.md`, and a one-line summary.
4. **`components/ALIGNMENT.md`** §2 — a Codex column added to the 33-row table (header,
   all 33 rows, and the "Column totals" line: **14 / 13 / 6**), plus a dated addition note before the
   table. Every existing cell in Hermes/Pi/OpenClaw/OpenCode/Grok is byte-identical to before this run;
   only new cells were added.
5. **`components/MATRIX.md`** §1 — a Codex column added to the main 18-row grid (placed
   with the runtime/harness block, before `gstack / gbrain`), a Codex row added to "The primitive sets
   themselves" table, and a Codex line added to §5 "Ratings marked as inferred" (Secrets `◐?`, honestly
   flagged rather than guessed). A dated addition note precedes the table, matching the existing
   convention for the five 2026-09-02 harness columns.
6. `node scripts/check-doc-links.mjs` — **PASS** (1429 links checked; one broken relative link I
   introduced, `./content/codex.md` from `comparisons/`, was caught and fixed to `../content/codex.md`
   before this HANDOFF).

## AC evidence (per `W4-teardowns.md`)

- **AC-1** (§A–F present, §F non-empty, every `○` in §B names pages checked): met. Every absence row in
  §B names what was checked (e.g. row 3e: "checked `README.md`, `AGENTS.md`… `LEARN/codex/build-skills`,
  `LEARN/codex/build-plugins`, `LEARN/docs/config-file/config-reference`"). §F carries nine bullets.
- **AC-2** (row in `90-short-profiles.md`, column in `04-harness-alignment.md` §2, column in
  `02-component-matrix.md` §1, all in this HANDOFF): met — items 3, 4, 5 above.
- **AC-3** (§C counts and gives the verdict): met — **8 primitives, 4 supporting; verdict `⚠️ contestable`,
  nearer 5–7 healthy than 12+ accommodation failure but not settled**, with the two pieces of primary
  evidence for "not settled" (`sandbox_mode`/`[permissions]` coexistence; `codex mcp-server` deprecated
  while an in-tree doc for the same interface still says "experimental").
- **AC-4** (the `structured output` line, one artifact not a list): met — **the Thread** (Turns of
  Items), the app-server's persisted/forkable conversation record, quoted from `codex-rs/app-server/README.md`.

## Summary of Work Not Completed

- `docs/exec.md` / `codex exec`'s flag surface and `docs/slash_commands.md`'s command list were not
  read — both 404 in-repo and on the docs site as of 2026-09-03 (§F). Row 6d and the `/agent` mention in
  3c rest on thinner sourcing than the rest of the profile as a result.
- `LEARN/codex/enterprise/roles-and-workspace-permissions` (referenced from the `enterprise/skills`
  page) was not itself fetched; row 10b's Org answer rests on `admin-setup` and
  `managed-configuration` only.
- Whether Hermes and OpenClaw in fact embed the Codex app-server (used in the altitude argument) was
  reused from this corpus's own prior `04-harness-alignment.md` read, not re-verified against Hermes's
  or OpenClaw's source this pass.
- `codex-rs/secrets` and `codex-rs/keyring-store` crate contents were not read — listing only. Flagged
  in the profile's §F and added as an inferred (`◐?`) rating in `02-component-matrix.md` §5 rather than
  guessed silently.

All other acceptance criteria and manifest items: **met**.

## Technical Debt

- None introduced in the repo. The profile itself documents two things *inside Codex* that read as
  technical debt at the vendor (the `sandbox_mode`/`[permissions]` coexistence and the
  deprecated-vs-experimental `mcp-server` documentation mismatch) — these are findings about Codex, not
  shortcuts taken in this workstream.

## Key Decisions

- **Primitive count reported as `⚠️ contestable`, range 7–9, settled headline of 8** — OpenAI publishes
  no primitive list (unlike Pi's refusal list or OpenClaw's typed hook tiers). Per the skill's rule 4,
  this was disclosed rather than forced to a clean number.
- **WebFetch-mediated vendor-docs reads marked ✅, with a disclosure in §F** — this repo's existing
  precedent (`content/pi.md`'s `pi.dev/packages "via WebFetch"` citation) marks a directed fetch of a
  primary URL as ✅ even when the tool returns a processed summary rather than raw HTML. I followed that
  precedent but added an explicit §F bullet naming the residual paraphrase risk, since several §C/§D
  quotes came back inside quotation marks from a summarizing intermediary rather than from a raw-HTML
  read I performed myself. Re-fetches with an explicit "quote verbatim, do not paraphrase" instruction
  were used for every primitive definition and every §D quote to reduce this risk before relying on it.
- **`codex mcp-server` and the app-server were both scored under 2a/11a rather than treated as a single
  row** — they are documented as two states of one migration (deprecated → current), and collapsing them
  would have hidden the finding.
- **Rule 8 (sibling vocabulary) applied to "Codex" itself** — noted in §A's "Prior names / homes" row
  that "Codex" also names the unrelated hosted product Codex Web and OpenAI's retired 2021 code model,
  so every claim in the profile is scoped to the CLI/runtime only.
- No deviation from the PRD's file manifest. No new project guides were needed beyond the skill itself
  (a docs/teardown workstream matches the skill's own "Applies To" scope).

## New Dependencies Added

None.

## Verification Evidence

| Gate | Command | Result | Notes |
|------|---------|--------|-------|
| Doc-link check | `node scripts/check-doc-links.mjs` | **PASS** | 177 files scanned, 1429 links checked |
| Manifest scope | `git status --short` | **PASS** | Only `content/codex.md`, `assets/projects/codex/basic-ui-flow.mmd`, and the three named comparison files changed; no other harness profile, `spec/`, or `components/` touched |
| Quality pass | `git diff` review | **PASS** | No AI slop found to remove: no dead scaffolding, no `console.log`-equivalent, no files over 300 lines relative to this doc genre (profile is long by design — the skill's own "one page per harness" rule is about page *count*, not a line cap, and the two 2026-09-02 example profiles read for precedent are of comparable length) |
| Secrets scan | `grep -n 'password\|secret\|api_key\|token\|credential' <changed files> \| grep -iv 'test\|mock\|example\|type\|interface'` | **PASS, hits reviewed** | 16 hits, all reviewed individually: vendor terminology in prose (`8d` "token" usage/budget rows in `04-harness-alignment.md`, pre-existing `02-component-matrix.md` Secrets rows), and this profile's own documentation of Codex's named config surface (`secrets`/`keyring-store` crate names, `restricted-token backend`, `apps.*`/`skills.config` keys, "redacts secrets" describing the memory pipeline's own behavior). No credential, key, or password value is present anywhere in the diff |
| Personal-data scan | `grep -n 'email\|ssn\|date_of_birth\|full_name' <changed files> \| grep -iv 'test\|mock\|type\|interface'` | **PASS** | Zero hits |
| Environment-value scan | `grep -n 'localhost:\|127\.0\.0\.1\|0\.0\.0\.0' <changed files> \| grep -iv 'test\|\.env\|config\.example'` | **PASS** | Zero hits (the `127.0.0.1:3128`/`8081` proxy defaults quoted in `RS/network-proxy/README.md` were paraphrased rather than quoted verbatim in the profile's row 1a, so the literal strings don't appear in the diff) |
| CI gate (this repo) | N/A — docs-only workstream | **N/A** | Per `CLAUDE.md` and the skill: "Markdown is not code... The whole bar is: links resolve... and git is clean." No `npm run build`/`tsc`/`lint`/`test` gate applies to this repo |

## Skill findings (for the Architect — this is a real run, not `--sanity`, but the PRD asked for
anything the skill got wrong for Codex)

- **The diagram rule's "redraw the one nearest the loop question, list the rest" worked cleanly here**
  (one file, two diagrams, both in the same doc) — easier than Claude Code's four-diagram case in the
  W0 sanity findings. No change needed.
- **Rule 4's `(supporting)` carve-out was load-bearing again**, this time for a genuinely automatic,
  non-authored capability: the memory pipeline. It is clearly first-class and shipped, but nobody
  *authors* it — a subagent writes to it. The rule as written (user-authored vs. harness-owned) handled
  this correctly, but the skill could say explicitly that "shipped but not authored" is a third bucket
  worth naming, since Individual Memory (5a) is scored `●` for Codex in the concept matrix while the
  memory pipeline itself is `(supporting)` in §C — the two are not contradictory, but a reader comparing
  the two tables cold could think they disagree.
- **No rule currently covers "one interface, two contradictory docs pages."** `codex mcp-server` is
  called "deprecated" on the current docs site and "experimental" in an in-tree design doc for the same
  binary command. Rule 5's marks (✅/◐/⚠️) classify a claim's *source*, not a *disagreement between two
  primary sources about the same claim*. I resolved it by quoting both in §D rather than picking one,
  but the skill has no named slot for "two primary sources disagree" the way it has one for
  "specified but not shipped" (`◐ (proposal)`). Worth a rule 5 addendum, e.g. `⚠️ (disputed)`.
- **WebFetch as the primary research tool (no raw-HTML read available) is not addressed by Rule 6.**
  Rule 6 assumes "you opened" a page. This run opened every vendor docs URL through a summarizing
  fetch tool rather than reading raw HTML, which the skill's ✅/◐ marks don't cleanly separate from a
  genuine secondary source. I treated it as ✅ per this corpus's own `content/pi.md` precedent and
  disclosed the residual risk in §F, but a future teardown run without WebFetch access (or with one that
  returns raw HTML) would not have this ambiguity — worth naming in the skill so the next agent doesn't
  have to invent the convention independently.
- **The "sibling vocabulary" rule (Rule 8) needed extending to a single vendor's own naming, not just
  two shipped products.** Rule 8 as written covers "Gas Town / Gas City; Grok Bot / Grok Build" — two
  *products*. "Codex" naming three things (this CLI, Codex Web, and a retired 2021 model) inside *one*
  company is the same hazard at one more remove. Handled it the same way rule 8 already prescribes
  (name which product every claim is about), so no rule change is strictly required — flagging only
  because the rule's own examples might make a future runner think it's scoped to sibling *products*
  under different names, not one *name* covering unrelated things.
- **No framework/process defect found** — nothing rose to the bar in `docs/agents/issue-tracker.md`
  ("append to `fractal/ISSUES.md`"); the items above are skill-content findings, appropriately reported
  here per the PRD, not process bugs.

## Router / process notes

Per `CLAUDE.md` §Workstreams, this repo runs **un-routed**: no `router.py`, no BLUEPRINT YAML, no
`.state.json`. No router command was run. This HANDOFF is the completion signal for W4 #1; per
`W4-teardowns.md`'s Session shape, the architect reviews and the queue proceeds to W4 #2 (Gas City).
