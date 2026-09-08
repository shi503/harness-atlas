---
status: DRAFT
title: "Non-interactive execution and CI"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/non-interactive-mode"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Non-interactive execution and CI

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` at **rust-v0.153.4**, **2026-09-08**.

`codex exec` runs Codex from scripts and pipelines with no terminal UI.

```bash
codex exec "<task-prompt>"
```

---

## 1. Flags

| Flag | Effect |
|---|---|
| `--ephemeral` | Does not persist session rollout files to disk |
| `--sandbox` | Permission level: `workspace-write`, `danger-full-access` |
| `--json` | JSON Lines event stream on stdout |
| `--output-schema <path>` | Constrains the response to a JSON Schema |
| `-o`, `--output-last-message <path>` | Writes the final message to a file |
| `--ignore-user-config` | Skips `$CODEX_HOME/config.toml` |
| `--ignore-rules` | **Bypasses user and project execution policy rules** |
| `--skip-git-repo-check` | Permits running outside a Git repository |

**`--ignore-rules` and `--ignore-user-config` are two different bypasses.** The first skips
[execpolicy](./07-execpolicy.md); the second skips configuration. Neither implies the other, and
neither touches the managed layers, which remain a floor — see
[`01`](./01-agents-md-and-configuration.md) §2.

**`--ephemeral` also disables the memory pipeline**, which requires a non-ephemeral session — see
[`09-memory-and-session-state.md`](./09-memory-and-session-state.md).

---

## 2. Output

**Default.** Progress streams to **stderr**; the final agent message goes to **stdout**. The split is
what makes `codex exec … | next-tool` work without filtering.

**`--json`.** One JSON object per line. Event types include `thread.started`, `turn.started`,
`item.*`, `turn.completed`, and `error`.

**`--output-schema <path>`.** The response is constrained to a supplied JSON Schema. This is the
difference between parsing prose and receiving a record.

---

## 3. Input

| Form | Behaviour |
|---|---|
| Prompt argument + piped stdin | The argument instructs; the piped data is context |
| `codex exec -`, or no prompt argument | The entire prompt is read from stdin |

```bash
npm test 2>&1 | codex exec "summarize failures"
```

---

## 4. Resuming

```bash
codex exec resume --last "<next-task>"
codex exec resume <SESSION_ID>
```

Sessions persist as rollouts — [`09`](./09-memory-and-session-state.md) — which is what makes a CI
step resumable rather than only repeatable. `--ephemeral` forgoes this.

---

## 5. CI

- **`CODEX_API_KEY`** authenticates. The docs direct that it be set inline only.
- The **[Codex GitHub Action](https://github.com/openai/codex-action)** is the recommended path for
  GitHub workflows rather than invoking the binary directly.
- Set the **minimum** sandbox: `workspace-write` where edits are needed, read-only otherwise.

**Exit-code semantics were not documented on the page read.** Checked: the non-interactive mode page
and the repository's `docs/exec.md`, which is a stub redirecting to it. A pipeline gating on `$?`
should establish the mapping empirically rather than assume the conventional one.
