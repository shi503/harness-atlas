---
name: wiki-nav
description: Maintain wiki-style navigation across the corpus — a regenerable footer block naming a page's parent, siblings and related categories, plus a folder index per content directory. Idempotent by construction, so it is safe to run after every workstream.
argument-hint: [path or directory, default: every eligible tree] [--check]
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash(node scripts/check-doc-links.mjs), Bash(git status *), Bash(git diff *)
---

# wiki-nav — the navigation the tree cannot hold

A reader who arrives at `components/2b-hooks.md` from a search result has no idea what else is there.
The tree knows; the page does not say. This skill makes the page say it, in a block it can rewrite
without touching a word anyone authored.

**The property that makes this safe is idempotence.** Running it twice produces no diff. Verify that
before you believe a run — `--check` regenerates into memory and reports what *would* change, and a
second consecutive run reporting changes is a defect in this skill, not in the corpus.

---

## 1. The footer block

Appended at the foot of an eligible file, between two markers that are the whole contract:

```markdown
<!-- wiki-nav:start -->
---

**[↑ Components](00-README.md)** · Layer 2 · Agent Harness

**Siblings** — [`2a` Adapters & Middleware](2a-adapters-and-middleware.md) · **`2b` Hooks** · [`2c` Enforcement](2c-enforcement.md)

**Related** — [the grid](../comparisons/02-component-matrix.md) · [`requires` graph](RELATIONS.md) · [every profile's `2b` detail](../index.md#1-the-instrument)
<!-- wiki-nav:end -->
```

**Everything between the markers is owned by this skill and rewritten wholesale.** Everything outside
them is authored and never touched. If a file has no markers, the block is appended; if it has them,
the content between is replaced. That is the entire mechanism, and it is why this is safe to re-run.

**The current page appears in its own sibling list, unlinked and bold.** A reader needs to know where
they are, and a self-link is a dead beat.

---

## 2. Which files get one — and the ones that never do

| Tree | Footer? | Why |
|---|---|---|
| `components/**` | **yes** | 33 siblings and no other way to move between them |
| `comparisons/**` | **yes** | Deep, uneven, and the easiest place to get lost |
| `spectrums/**` | **yes** | Three pages that constantly reference each other |
| `content/<name>/**` | **yes** | A deep read's documents are a set and should read as one |
| `content/*.md` | **no** | The profile's own §`1b. Contents` **is** that page's navigation. A second block on the same page is two answers to one question |
| `README.md`, `index.md` | **never** | Tier 0 and Tier 1 are hand-authored. **The manifesto is not generated** |
| `archive/**` | **never** | Frozen. A footer implies maintenance, and the archive's whole claim is that it is not maintained |
| `fractal/workstreams/**` | **never** | A PRD is not a wiki page |
| `skills/**` | **never** | A distributable skill cites guides by name, never by path — a generated path block would break that on the first copy |

> **Two of these were open decisions in W10's PRD and are recorded here as taken, with the reasoning
> above rather than silently:** no footer on `content/*.md` profiles, and no footer on Tier 0/1. Both
> follow the standing recommendation in the PRD. **A person may still overrule either.**

---

## 3. The folder index

Every eligible directory carries a `00-README.md` listing its documents, one line each. Where one
already exists — `components/00-README.md`, `archive/00-README.md` — **it is authored, not generated:
this skill checks that every file in the directory appears in it and reports what is missing.** It
never rewrites an authored index.

That asymmetry is deliberate. A footer is navigation and can be mechanical. An index says *what is
here and why it matters*, which is a sentence somebody has to write.

---

## 4. Idempotence, concretely

Three rules, and breaking any one of them breaks the skill:

1. **Derive every line from the tree and the frontmatter**, never from the previous block. Reading
   your own output is how a generator drifts.
2. **Fix the order.** Siblings sort by the same rule every run — for `components/` that is layer then
   letter, from `sublayer:`, not filename order.
3. **Emit no timestamp, no run id, no count that changes for a reason a reader cannot see.** A
   generated "last updated" makes every run a diff and trains everyone to ignore the diff.

**Verification is one command, and it is the acceptance criterion for this skill:**

```bash
node scripts/check-doc-links.mjs && git diff --quiet && echo "idempotent"
```

Run the skill, commit, run it again: the second run must leave the tree clean.

---

## 5. Steps

1. **Resolve scope** from the argument, or every eligible tree per §2.
2. **Build the model first** — for each file: its directory, its siblings in fixed order, its parent
   index, and its related links. Read frontmatter (`sublayer:`, `layer:`, `title:`) rather than
   guessing from filenames.
3. **Render each block** from the model alone.
4. **Splice** between the markers, appending them if absent. Touch nothing outside.
5. **Report missing index entries** for authored `00-README.md` files. Do not fix them.
6. **Run the checker, then run yourself again** and confirm a clean tree.

## Do NOT

- Write inside `archive/`, `README.md`, `index.md`, `fractal/`, or `skills/`.
- Touch a single character outside the markers.
- Rewrite an authored `00-README.md` — report, never fix.
- Emit anything that changes between two runs over an unchanged tree.
- Add a footer to a `content/*.md` profile. `1b. Contents` is that page's navigation.
