---
status: DRAFT
title: "MCP and the app-server"
tier: reference
project: harness-atlas
source: "https://learn.chatgpt.com/docs/extend/mcp · openai/codex codex-rs/app-server/README.md"
version_at_capture: "rust-v0.153.4"
source_verified: "2026-09-08"
---

# MCP and the app-server

> **Drafted 2026-09-08 by `claude-opus-5`, not yet verified.**

Read against `learn.chatgpt.com/docs` and `openai/codex` at **rust-v0.153.4**, **2026-09-08**.

**Two directions that share a page in most people's heads and should not.** MCP is how Codex
**calls out** to tools. The app-server is how something else **drives Codex**. One is the harness as
client; the other is the harness as library.

---

## 1. MCP — Codex as client

Servers are declared as `[mcp_servers.<name>]` tables in `config.toml`.

**STDIO — a local process:**

| Field | Required | Purpose |
|---|:-:|---|
| `command` | ✓ | The command that starts the server |
| `args`, `env`, `cwd` | | Process configuration |
| `env_vars` | | Environment variables to allow and forward |

**Streamable HTTP — a remote server:**

| Field | Required | Purpose |
|---|:-:|---|
| `url` | ✓ | Server address |
| `auth` | | Authentication strategy — **defaults to `oauth`** |
| `bearer_token_env_var`, `http_headers`, `http_headers_helper` | | Credential methods |

Both transports also take `startup_timeout_sec`, `tool_timeout_sec`, `enabled`, and `required`.
`required` is the one that changes failure behaviour: a required server that does not start is a
session problem rather than a missing tool.

### Tool-level policy

| Key | Effect |
|---|---|
| `enabled_tools` | Allow list |
| `disabled_tools` | Deny list — **applied after the allow list**, so it wins |
| `default_tools_approval_mode` | `auto`, `prompt`, `writes`, `approve` |
| `tools.<tool>.approval_mode` | Per-tool override |

`writes` is the mode worth noticing: approval scoped to whether a tool mutates, rather than to the
tool's identity.

### CLI

```bash
codex mcp add <name> [options] -- <command>   # register
codex mcp list                                # inspect
codex mcp login <name>                        # OAuth
```

HTTP servers support bearer tokens, OAuth (with CIMD/DCR), and ChatGPT session authentication for
trusted first-party servers. STDIO servers pass credentials through forwarded environment variables.

---

## 2. The app-server — Codex as the thing being driven

The app-server exposes the session over **JSON-RPC**, naming the same objects the CLI runs on:
`Thread`, `Turn`, `Item`. A terminal user and an embedding IDE address identical objects, which is
why [`11-beyond-the-cli.md`](./11-beyond-the-cli.md) is a surface list rather than a second runtime.

**Ownership is enforced at the protocol.** From the crate's own README:

> *"`thread/archive` and `thread/delete` reject attempts to remove a live internal worker with
> JSON-RPC error `-32600`. The worker's owner controls its shutdown. For example, a Guardian reviewer
> remains available to its parent conversation after a client tries to archive or delete it."*

A client cannot delete a thread another component is using. *"After the owner releases the worker, its
saved conversation can be archived or deleted normally."* This is the one place the protocol asserts a
lifecycle rule against its own callers.

**`codex mcp-server` is deprecated** in favour of the app-server. Both exposed Codex to an external
driver; only one is current.

For the full method list and the SDK wrappers, the vendor's pages are the source that stays correct:
[Build with Codex](https://learn.chatgpt.com/docs/build-with-codex).
