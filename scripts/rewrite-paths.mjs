#!/usr/bin/env node
/**
 * rewrite-paths — one-shot migration helper, run 2026-09-02 when this repo was cut from
 * loomwarp-team-system/projects/loomwarp. Kept as evidence for RULING-2026-09-02-spinout.md.
 * NOT idempotent: it resolves links against each file's OLD location, so run it once, on a
 * fresh copy. Optional argv[2] restricts the run to one path prefix.
 */
import { readdirSync, statSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve, relative, posix } from "node:path";

const REPO = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const SRC = "/Users/kevindeng/Googlyeye-Monsters/loomwarp-team-system/projects/loomwarp";
const SRC_REPO = "/Users/kevindeng/Googlyeye-Monsters/loomwarp-team-system";
const GH = "https://github.com/shi503/loomwarp-team-system/blob/master";
const SKIP = new Set(["node_modules", ".git", ".obsidian"]);
const ONLY = process.argv[2];

const EXTERNAL = [
  "references/comparisons/systems/loomwarp.md",
  "references/comparisons/systems/fractal.md",
  "references/comparisons/systems/kd-built-frameworks/ENRICHMENT-PLAN.md",
  "references/claude-code/30-gap-analysis-loomwarp.md",
  "specs/v1/", "00-MAP.md", "plan.md",
];
// old (relative to SRC) -> new (relative to REPO). Specific entries before the prefixes that contain them.
const TABLE = [
  ["NEXT-STEPS-framework-spinout.md", "archive/sessions/NEXT-STEPS-framework-spinout.md"],
  ["NEXT-STEPS.md", "archive/sessions/NEXT-STEPS.md"],
  ["SESSION-2026-08-28-respec.md", "archive/sessions/SESSION-2026-08-28-respec.md"],
  ["SESSION-2026-08-28-v0-framework-architecture-rebuild.md", "archive/sessions/SESSION-2026-08-28-v0-framework-architecture-rebuild.md"],
  ["SESSION-2026-08-31-framework-v1.md", "archive/sessions/SESSION-2026-08-31-framework-v1.md"],
  ["references/comparisons/systems/harnesses/", "harnesses/"],
  ["references/comparisons/", "comparisons/"],
  ["references/claude-code/", "harnesses/claude-code/"],
  ["references/architect-craft/", "craft/"],
  ["references/kd-drafts/AI-Native Organizational Maturity Framework (1).md", "maturity/drafts/AI-Native-Organizational-Maturity-Framework-draft-1.md"],
  ["references/kd-drafts/AI-Native Organizational Maturity Framework (2).md", "maturity/drafts/AI-Native-Organizational-Maturity-Framework-draft-2.md"],
  ["references/kd-drafts/AI-Native Organizational Maturity Framework (3).md", "maturity/drafts/AI-Native-Organizational-Maturity-Framework-draft-3.md"],
  ["references/grid.html", "maturity/grid.html"],
  ["references/AI-Native Organizational Maturity Framework.md", "maturity/AI-Native-Organizational-Maturity-Framework.md"],
  ["references/elements.md", "archive/elements.md"],
  ["specs/v1-framework/", "spec/v1-framework/"],
  ["specs/archive/", "archive/"],
  ["specs/v0/", "archive/v0/"],
  ["EXPLAINER-PLAN.md", "spec/EXPLAINER-PLAN.md"],
];
const stripSlash = (s) => s.replace(/\/$/, "");
function mapOldToNew(oldRel) {
  for (const [o, n] of TABLE) {
    if (oldRel === o || oldRel + "/" === o) return stripSlash(n);
    if (o.endsWith("/") && oldRel.startsWith(o)) return n + oldRel.slice(o.length);
  }
  return null;
}
function mapNewToOld(newRel) {
  for (const [o, n] of TABLE) {
    if (newRel === n) return o;
    if (n.endsWith("/") && newRel.startsWith(n)) return o + newRel.slice(n.length);
  }
  return null;
}
function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (SKIP.has(e)) continue;
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out); else if (p.endsWith(".md")) out.push(p);
  }
  return out;
}
const stats = { files: 0, links: 0, rewritten: 0, external: 0, unmapped: [], fm: 0 };
for (const file of walk(REPO)) {
  const newRel = relative(REPO, file);
  if (ONLY && !newRel.startsWith(ONLY)) continue;
  const oldRel = mapNewToOld(newRel);
  if (!oldRel) continue;
  stats.files++;
  const oldAbsDir = dirname(join(SRC, oldRel));
  let text = readFileSync(file, "utf8");
  const before = text;
  text = text.replace(/\]\(([^)\s]+)\)/g, (m, target) => {
    if (/^(https?:|mailto:|#)/.test(target)) return m;
    stats.links++;
    const i = target.indexOf("#");
    const path = i >= 0 ? target.slice(0, i) : target;
    const hash = i >= 0 ? target.slice(i) : "";
    const abs = resolve(oldAbsDir, decodeURIComponent(path));
    const srcRel = relative(SRC, abs);
    if (srcRel.startsWith("..")) {
      const repoRel = relative(SRC_REPO, abs);
      if (repoRel.startsWith("..")) { stats.unmapped.push(`${newRel}: ${target}`); return m; }
      stats.external++;
      return `](${GH}/${repoRel}${hash})`;
    }
    if (EXTERNAL.some((x) => srcRel === x || srcRel.startsWith(x))) {
      stats.external++;
      return `](${GH}/projects/loomwarp/${srcRel}${hash})`;
    }
    const mapped = mapOldToNew(srcRel);
    if (!mapped) { stats.unmapped.push(`${newRel}: ${target}`); return m; }
    let rel = posix.relative(posix.dirname(newRel), mapped);
    if (!rel.startsWith(".")) rel = "./" + rel;
    stats.rewritten++;
    return `](${rel.replace(/ /g, "%20")}${hash})`;
  });
  text = text.replace(/^(\s*(?:extends|superseded_by|supersedes|source|canonical):\s*)(projects\/loomwarp\/[^\s#]+)(.*)$/gm, (m, k, p, rest) => {
    const mapped = mapOldToNew(p.slice("projects/loomwarp/".length));
    if (!mapped) return m;
    stats.fm++;
    return `${k}${mapped}${rest}`;
  });
  if (text !== before) writeFileSync(file, text);
}
console.log(JSON.stringify({ ...stats, unmapped: stats.unmapped.length }));
if (stats.unmapped.length) console.log("UNMAPPED:\n" + stats.unmapped.join("\n"));
