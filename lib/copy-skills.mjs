/**
 * Copy SKILL.md files into the target project's .cursor/rules/ directory.
 *
 * Files are named: caboodle-{skill-id}.md
 * Example: caboodle-01-object-discovery.md
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");
const SKILLS_DIR = join(PACKAGE_ROOT, "skills");

/**
 * Copy all SKILL.md files to the target project's .cursor/rules/ directory.
 * Sources directly from skills/<id>/SKILL.md - no build step required.
 * @param {string} targetDir - The project root where .cursor/rules/ should be created
 * @returns {{ copied: string[], skipped: string[] }}
 */
export function copySkills(targetDir) {
  const rulesDir = join(targetDir, ".cursor", "rules");
  mkdirSync(rulesDir, { recursive: true });

  const copied = [];
  const skipped = [];

  if (!existsSync(SKILLS_DIR)) {
    console.error(`  ✗ skills/ directory not found at ${SKILLS_DIR}`);
    return { copied, skipped };
  }

  const skillDirs = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name !== "." && d.name !== "..")
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const dir of skillDirs) {
    const srcFile = join(SKILLS_DIR, dir.name, "SKILL.md");
    const destFile = join(rulesDir, `caboodle-${dir.name}.md`);

    if (!existsSync(srcFile)) {
      skipped.push(dir.name);
      continue;
    }

    const content = readFileSync(srcFile, "utf-8");
    writeFileSync(destFile, content, "utf-8");
    copied.push(dir.name);
  }

  return { copied, skipped };
}

/**
 * Remove all caboodle-*.md skill files from .cursor/rules/.
 * @param {string} targetDir - The project root
 * @returns {string[]} List of removed file names
 */
export function removeSkills(targetDir) {
  const rulesDir = join(targetDir, ".cursor", "rules");
  const removed = [];

  if (!existsSync(rulesDir)) return removed;

  const files = readdirSync(rulesDir).filter(
    (f) => f.startsWith("caboodle-") && f.endsWith(".md") && !f.endsWith(".mdc")
  );

  for (const file of files) {
    const filePath = join(rulesDir, file);
    unlinkSync(filePath);
    removed.push(file);
  }

  return removed;
}
