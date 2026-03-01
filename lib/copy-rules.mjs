/**
 * Copy .mdc rule files into the target project's .cursor/rules/ directory.
 *
 * Files keep their original names (e.g., caboodle-overview.mdc).
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");
const RULES_SRC = join(PACKAGE_ROOT, "templates", "rules");

/**
 * Copy all .mdc rule files to the target .cursor/rules/ directory.
 * @param {string} targetDir - The project root where .cursor/rules/ should be created
 * @returns {{ copied: string[], skipped: string[] }}
 */
export function copyRules(targetDir) {
  const rulesDir = join(targetDir, ".cursor", "rules");
  mkdirSync(rulesDir, { recursive: true });

  const copied = [];
  const skipped = [];

  if (!existsSync(RULES_SRC)) {
    console.error(`  ✗ templates/rules/ not found at ${RULES_SRC}`);
    return { copied, skipped };
  }

  const ruleFiles = readdirSync(RULES_SRC).filter((f) => f.endsWith(".mdc"));

  for (const file of ruleFiles) {
    const srcFile = join(RULES_SRC, file);
    const destFile = join(rulesDir, file);

    const content = readFileSync(srcFile, "utf-8");
    writeFileSync(destFile, content, "utf-8");
    copied.push(file);
  }

  return { copied, skipped };
}

/**
 * Remove all caboodle-*.mdc rule files from .cursor/rules/.
 * @param {string} targetDir - The project root
 * @returns {string[]} List of removed file names
 */
export function removeRules(targetDir) {
  const rulesDir = join(targetDir, ".cursor", "rules");
  const removed = [];

  if (!existsSync(rulesDir)) return removed;

  const files = readdirSync(rulesDir).filter(
    (f) => f.startsWith("caboodle-") && f.endsWith(".mdc")
  );

  for (const file of files) {
    unlinkSync(join(rulesDir, file));
    removed.push(file);
  }

  return removed;
}
