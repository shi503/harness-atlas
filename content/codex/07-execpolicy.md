---
status: DRAFT
title: "Execpolicy — the Starlark rule language"
tier: reference
project: harness-atlas
source: "openai/codex codex-rs/execpolicy/README.md · https://learn.chatgpt.com/docs/exec-policy"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# Execpolicy — the Starlark rule language

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `openai/codex` at **rust-v0.153.4**, **2026-09-08**.

*"Policy engine and CLI built around `prefix_rule(pattern=[...], decision?, justification?, match?,
not_match?)` plus `host_executable(name=..., paths=[...])."*

**This surface is documented in a crate README, not in the hosted docs**, and the hosted page for it is
a redirect target of a repository stub. It earns its own document because it is a small language with
real semantics — and because the vendor states it is unfinished: *"This release covers the prefix-rule
subset of the execpolicy language plus host executable metadata; a richer language will follow."*

---

## 1. `prefix_rule`

Rules are written in **Starlark**:

```starlark
prefix_rule(
    pattern = ["cmd", ["alt1", "alt2"]], # ordered tokens; a list entry denotes alternatives
    decision = "prompt",                 # allow | prompt | forbidden; defaults to allow
    justification = "explain why this rule exists",
    match = [["cmd", "alt1"], "cmd alt2"],       # examples that MUST match
    not_match = [["cmd", "oops"], "cmd alt3"],   # examples that must NOT match
)
```

| Field | Semantics |
|---|---|
| `pattern` | Tokens matched **in order**. Any element may be a list, denoting alternatives |
| `decision` | `allow`, `prompt`, `forbidden`. **Defaults to `allow`** |
| `justification` | Human-readable rationale, surfaceable in approval prompts and rejection messages |
| `match` / `not_match` | Example invocations **validated at load time** |

**`decision` defaulting to `allow` is the sharp edge.** A rule written to describe a command, with the
decision omitted, permits it.

**`match` / `not_match` are unit tests for policy** — *"think of them as unit tests"* — validated when
the policy loads, so a rule that stopped matching its own example fails at load rather than at
execution. Examples may be token arrays or strings; strings are tokenised with `shlex`.

The docs give the intended use of `justification` under denial: *"When `decision = "forbidden"` is
used, include a recommended alternative in the `justification`, when appropriate"* — the example given
is `` "Use `jj` instead of `git`." ``

---

## 2. `host_executable` and basename fallback

```starlark
host_executable(
    name = "git",
    paths = ["/opt/homebrew/bin/git", "/usr/bin/git"],
)
```

Matching semantics, in order:

1. **Exact first-token match is always tried first.**
2. With host-executable resolution **disabled**, `/usr/bin/git status` matches only a rule whose first
   token is literally `/usr/bin/git`.
3. With resolution **enabled** and no exact match, evaluation may fall back from `/usr/bin/git` to a
   basename rule for `git`.
4. If a `host_executable(name="git", …)` entry exists, **basename fallback is allowed only for the
   listed absolute paths**.
5. If **no** `host_executable()` entry exists for a basename, basename fallback is allowed.

Rules 4 and 5 invert in a way worth restating: declaring a `host_executable` **restricts** fallback to
an enumerated set, while declaring nothing leaves fallback open. Adding the entry tightens; omitting
it does not.

---

## 3. Output, and bypass

The CLI *"always prints the JSON serialization of the evaluation result"* — evaluation is inspectable
without running the command.

`codex exec --ignore-rules` **bypasses user and project execution policy rules** — see
[`08-non-interactive-and-ci.md`](./08-non-interactive-and-ci.md). Any assumption that a policy file
constrains automated runs has to account for that flag.
