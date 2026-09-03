#!/usr/bin/env node
/**
 * check-doc-links — a markdown link may not point at a document that does not exist.
 *
 * Why this exists, and why it is separate from check-referenced-artifacts.
 *
 * That check catches a document asserting a *mechanism* exists — a script, a schema, a config — when
 * no such file was ever committed. It deliberately matches only code-and-config extensions, because
 * naming `resolve-context-bundle.cjs` is a claim about enforcement while naming a concept is not.
 *
 * This one catches a different failure with the same shape: a document promising a *reader* a
 * destination that was never written. A reading order that dead-ends is the navigational form of
 * FM-3 — documentation outrunning what exists — and until now nothing checked it.
 *
 * It was found the honest way. A forward reference written on 2026-08-27 to `08-providers.md`, a
 * file scheduled but not yet authored, resolved to nothing and no check complained. The precedent
 * for taking that seriously is specs/v1, which listed `03-open-decisions.md` in two tables and
 * `references/positioning.md` in two more; neither was ever written, and both were then cited
 * elsewhere as though they held the argument. See the note below on why those two are still not
 * caught.
 *
 * What it checks: inline markdown links `[text](target)` in every .md under the repo root, resolved relative to the
 * linking file. External links, anchors and mailto are skipped — this is about local navigation.
 *
 * Exits non-zero when a link dead-ends. Run: node scripts/check-doc-links.mjs
 */

import { readdirSync, statSync, existsSync } from "node:fs";
import { readFileSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const ROOT = REPO;
const SKIP_DIRS = new Set(["node_modules", ".git", ".venv", "vendor", "repos", ".obsidian"]);

/**
 * Deliberately NOT checked: backtick-quoted .md paths in prose, e.g. `03-open-decisions.md`.
 *
 * That was tested on 2026-08-27 before writing this, and rejected on evidence. Matching every
 * backticked .md path across projects/** yields 777 candidates and 98 non-resolving, of which the
 * overwhelming majority are legitimate:
 *
 *   - harness-owned filenames a team creates, not files we ship — CLAUDE.md (34), AGENTS.md (19),
 *     SKILL.md (17), HANDOFF.md, PULSE.md, MEMORY.md
 *   - other systems' files described in a teardown — THIN_HARNESS_FAT_SKILLS.md, references/slack.md
 *   - bare filenames referring to documents that DO exist elsewhere in the tree, cited by name
 *     rather than by path — 01-concepts.md (16), plan.md (14), elements.md (8)
 *
 * A check with a ~90% false-positive rate trains a reader to ignore it, which is the failure
 * 01-the-composition-contract.md C-5 names about review without a false-positive register. The same
 * reasoning is already recorded in check-element-vocabulary.mjs, which declines to flag bare `E3`.
 *
 * An inline link is different in kind: `[text](path)` is a promise of a destination, is unambiguous,
 * and cannot be prose about a concept. That is what this checks.
 *
 * Two genuine phantom documents are therefore NOT caught here, and this is stated so nobody assumes
 * a green run means they were fixed: specs/v1/03-open-decisions.md and references/positioning.md are
 * both referenced as prose paths in several tables and neither was ever written. They are tracked in
 * projects/loomwarp/00-MAP.md section 5 and by specs/v1/00-README.md's own 30-day delete rule, which
 * fires 2026-09-03.
 */
const EXEMPT = [];

const exemptReason = (p) => EXEMPT.find(([re]) => re.test(p))?.[1];

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".md")) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
const broken = [];
const debts = new Map();
let checked = 0;

for (const file of files) {
  const rel = relative(REPO, file);
  const lines = readFileSync(file, "utf8").split("\n");

  lines.forEach((line, i) => {
    for (const m of line.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      let target = m[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      target = decodeURIComponent(target.split("#")[0]);
      if (!target) continue;
      checked++;

      const abs = resolve(dirname(file), target);
      if (existsSync(abs)) continue;

      const reason = exemptReason(target);
      if (reason) {
        debts.set(target, reason);
        continue;
      }
      broken.push({ file: rel, line: i + 1, target });
    }
  });
}

console.log(`Scanned ${files.length} markdown file(s) under the repo root`);
console.log(`Checked ${checked} local link(s).`);

if (debts.size) {
  console.log(`\nRecorded debts (${debts.size}), not failures:`);
  for (const [t, why] of debts) console.log(`  ${t}\n    ${why}`);
}

if (broken.length) {
  console.error(`\nFAIL — ${broken.length} link(s) point at a document that does not exist:\n`);
  for (const b of broken) console.error(`  ${b.file}:${b.line}\n    -> ${b.target}`);
  console.error(
    "\nEither write the document, or stop promising it. A reading order that dead-ends is the\n" +
      "navigational form of documentation outrunning what exists."
  );
  process.exit(1);
}

console.log("\nPASS — every local markdown link resolves.");
