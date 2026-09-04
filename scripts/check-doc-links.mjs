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

/**
 * Anchors — added 2026-09-04 for Template v2 (W8). A link may carry `#fragment`; since v2 profiles
 * are cited per component (`content/<name>.md#2b-hooks`) and their at-a-glance card links within
 * the page (`#5-primitives`), a fragment that names no heading is a dead end of the same kind.
 * Slugs follow GitHub's rule: strip markdown markup from the heading text, lowercase, drop every
 * character that is not a letter, digit, space or hyphen, turn spaces into hyphens; a repeated
 * slug gets `-1`, `-2`… Headings inside <details> count. Still only "links resolve" — no content
 * guard, no count, no vocabulary.
 */
const slugCache = new Map();
function headingSlugs(absPath) {
  if (slugCache.has(absPath)) return slugCache.get(absPath);
  const seen = new Map();
  const slugs = new Set();
  let inFence = false;
  for (const raw of readFileSync(absPath, "utf8").split("\n")) {
    if (/^\s*(```|~~~)/.test(raw)) { inFence = !inFence; continue; }
    if (inFence) continue;
    const h = raw.match(/^#{1,6}\s+(.*?)\s*#*\s*$/);
    if (!h) continue;
    let text = h[1]
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/[`*_~]/g, "");
    let slug = text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, "")
      .replace(/\s/g, "-");
    const n = seen.get(slug) ?? 0;
    seen.set(slug, n + 1);
    if (n > 0) slug = `${slug}-${n}`;
    slugs.add(slug);
  }
  slugCache.set(absPath, slugs);
  return slugs;
}

const files = walk(ROOT);
const broken = [];
const badAnchors = [];
const debts = new Map();
let checked = 0;
let anchorsChecked = 0;

for (const file of files) {
  const rel = relative(REPO, file);
  const lines = readFileSync(file, "utf8").split("\n");

  // A link inside a fenced code block is an example, not a promise — skip it (paths and anchors
  // alike). The skill's page template is written in fences for exactly this reason.
  let fenced = false;
  lines.forEach((line, i) => {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; return; }
    if (fenced) return;
    for (const m of line.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const raw = m[1];
      if (/^(https?:|mailto:)/.test(raw)) continue;
      const [path, ...fragParts] = raw.split("#");
      const fragment = fragParts.length ? decodeURIComponent(fragParts.join("#")) : null;
      const target = decodeURIComponent(path);

      const abs = target ? resolve(dirname(file), target) : file;

      if (target) {
        checked++;
        if (!existsSync(abs)) {
          const reason = exemptReason(target);
          if (reason) debts.set(target, reason);
          else broken.push({ file: rel, line: i + 1, target });
          continue;
        }
      }

      if (fragment !== null && fragment !== "" && abs.endsWith(".md") && existsSync(abs)) {
        anchorsChecked++;
        if (!headingSlugs(abs).has(fragment.toLowerCase())) {
          badAnchors.push({ file: rel, line: i + 1, target: `${target || "(this file)"}#${fragment}` });
        }
      }
    }
  });
}

console.log(`Scanned ${files.length} markdown file(s) under the repo root`);
console.log(`Checked ${checked} local link(s) and ${anchorsChecked} anchor(s).`);

if (badAnchors.length) {
  console.error(`\nFAIL — ${badAnchors.length} anchor(s) name a heading that does not exist:\n`);
  for (const b of badAnchors) console.error(`  ${b.file}:${b.line}\n    -> ${b.target}`);
  console.error("\nA fragment is a promise of a heading. Fix the slug, or add the heading.");
  process.exit(1);
}

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
