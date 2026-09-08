---
status: DRAFT
title: "Context files — first match wins, then the chain"
tier: reference
project: harness-atlas
source: "hermes-agent.nousresearch.com/docs/user-guide/features/context-files · .../which-file-does-what · .../configuration"
version_at_capture: "v0.21.1 (tag v2026.9.7)"
source_verified: "2026-09-08"
---

# Context files — first match wins, then the chain

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `hermes-agent.nousresearch.com/docs` at **v0.21.1 (tag `v2026.9.7`)**, **2026-09-08**.

Two rules govern project context, and they operate in sequence. **Selection is exclusive** — one file
*type* wins. **Assembly is cumulative** — the winning type is then merged along the directory chain.
Reading only the first rule, or only the second, produces the wrong mental model.

---

## 1. The seven files, and the discovery each uses

| File | Purpose | Discovery |
|---|---|---|
| `.hermes.md` / `HERMES.md` | Project instructions (highest priority) | Walks to git root |
| `AGENTS.override.md` | *"Personal, per-directory override of AGENTS.md (typically gitignored)"* | CWD at startup + subdirectories progressively |
| `AGENTS.md` | Project instructions, conventions, architecture | CWD at startup + subdirectories progressively |
| `CLAUDE.md` | *"Claude Code context files (also detected)"* | CWD at startup + subdirectories progressively |
| `SOUL.md` | Identity — see [`01`](./01-profiles-and-soul.md#2-soulmd) | `HERMES_HOME/SOUL.md` **only** |
| `.cursorrules` | Cursor IDE coding conventions | CWD only |
| `.cursor/rules/*.mdc` | Cursor IDE rule modules | CWD only |

## 2. Rule one — exclusive selection

> *"Only **one** project context type is loaded per session (first match wins): `.hermes.md` →
> `AGENTS.override.md` → `AGENTS.md` → `CLAUDE.md` → `.cursorrules`. **SOUL.md** is always loaded
> independently as the agent identity (slot #1)."*

`AGENTS.override.md` is the interesting rung: when it sits beside an `AGENTS.md`, *"the override is
loaded **instead of** the committed file"* — the intended use is a gitignored personal file that
diverges from the tracked one without editing it.

**Two pages state the chain with different memberships.** `features/context-files` lists five rungs
including `AGENTS.override.md`; `which-file-does-what` lists four and omits it. Both were read
2026-09-08. Recorded, not resolved — the five-rung list is the one on the page that documents the
feature.

## 3. Rule two — the git-root-downward chain

Once `AGENTS.md` has won selection, it is not a single file:

> *"When your working directory sits inside a git repository, Hermes loads a **merged chain** of
> `AGENTS.md` files at session start: the git-root `AGENTS.md` first, then the `AGENTS.md` in every
> intermediate directory down to your working directory. Deeper files appear later in the prompt, so
> more specific guidance takes precedence."*

Each file carries its own provenance header (`## ../../AGENTS.md`), and *"identical copies along the
chain are deduplicated."*

**Outside a git repository the chain does not exist**: *"only the working directory itself is checked
— parents are never consulted, so an `AGENTS.md` planted in `/tmp` or `$HOME` can't leak into
unrelated sessions."*

### Progressive subdirectory discovery

Startup loads only the working directory's file. As the agent navigates — *"via `read_file`,
`terminal`, `search_files`, etc."* — it discovers context files in those directories and *"injects
them into the conversation at the moment they become relevant."*

- Each subdirectory is checked **at most once per session**.
- Discovery **also walks up**: reading `backend/src/main.py` finds `backend/AGENTS.md` even when
  `backend/src/` has none.
- The two stated reasons are *"No system prompt bloat"* and *"Prompt cache preservation — the system
  prompt stays stable across turns."*
- Subdirectory files go through the same security scan as startup files.

## 4. Truncation and read timeout

Both apply to every automatic context file — `SOUL.md`, `.hermes.md`, `AGENTS.md`, `CLAUDE.md`,
`.cursorrules` — and to **none** of the `read_file` tool's reads.

```yaml
context_file_max_chars: null        # default — dynamic cap scaled to the model's context window
                                    # (floor 20K, ceiling 500K chars); a positive integer pins it
context_file_read_timeout: 5.0      # seconds; a slower file is skipped with a warning
```

The timeout exists for a named case: *"typically on a network-backed filesystem such as iCloud Drive,
OneDrive or NFS — is skipped with a warning so the rest of the system prompt still loads."* A skipped
context file is therefore a possible silent cause of an agent that "forgot" a convention.

## 5. Context is assembled at session start

The consequence stated on `which-file-does-what`, and the reason the memory page's frozen-snapshot rule
generalises:

> *"context is assembled at session start, so restart the session to pick up changes."*

That covers edits made mid-session to `SOUL.md` and `AGENTS.md` as well as to memory.

## 6. Injection scanning

Context files are scanned for prompt injection before inclusion, at startup and on progressive
discovery. `SOUL.md` is scanned on the same path: *"`SOUL.md` is scanned like other context-bearing
files for prompt injection patterns before inclusion."* What the scanner is — and what the project says
it is not — is in [`08`](./08-approvals-and-write-safety.md).
