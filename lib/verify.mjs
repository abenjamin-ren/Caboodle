/**
 * Verify the Caboodle installation and print a summary.
 */

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Verify that all expected files are in place and print a summary.
 * @param {string} targetDir - The project root
 */
export function verify(targetDir) {
  const rulesDir = join(targetDir, ".cursor", "rules");
  const agentsPath = join(targetDir, "AGENTS.md");
  const quickstartPath = join(targetDir, "CABOODLE_QUICKSTART.md");
  const siteDir = join(targetDir, "site");

  const issues = [];
  let skillCount = 0;
  let ruleCount = 0;

  // Check skills
  if (existsSync(rulesDir)) {
    const files = readdirSync(rulesDir);
    skillCount = files.filter((f) => f.startsWith("caboodle-") && f.endsWith(".md") && !f.endsWith(".mdc")).length;
    ruleCount = files.filter((f) => f.startsWith("caboodle-") && f.endsWith(".mdc")).length;
  }

  if (skillCount === 0) {
    issues.push("No skill files found in .cursor/rules/");
  } else if (skillCount < 18) {
    issues.push(`Only ${skillCount}/18 skill files found in .cursor/rules/`);
  }

  if (ruleCount === 0) {
    issues.push("No rule files (.mdc) found in .cursor/rules/");
  } else if (ruleCount < 7) {
    issues.push(`Only ${ruleCount}/7 rule files found in .cursor/rules/`);
  }

  // Check AGENTS.md
  const agentsOk = existsSync(agentsPath);
  if (!agentsOk) {
    issues.push("AGENTS.md not found in project root");
  }

  // Check quickstart
  const quickstartOk = existsSync(quickstartPath);

  // Check site
  const siteOk = existsSync(siteDir) && existsSync(join(siteDir, "docusaurus.config.js"));

  // Print summary
  console.log();
  console.log("  ═══════════════════════════════════════════════════");
  console.log("  Caboodle — Installation Summary");
  console.log("  ═══════════════════════════════════════════════════");
  console.log();
  console.log(`  Skills installed:   ${skillCount}/18  ${skillCount === 18 ? "✓" : "⚠"}`);
  console.log(`  Rules installed:    ${ruleCount}/7   ${ruleCount === 7 ? "✓" : "⚠"}`);
  console.log(`  AGENTS.md:          ${agentsOk ? "✓ installed" : "✗ missing"}`);
  console.log(`  Quick Reference:    ${quickstartOk ? "✓ installed" : "— skipped"}`);
  console.log(`  Resource Site:      ${siteOk ? "✓ initialized" : "— not yet (run: caboodle init-site)"}`);
  console.log();

  if (issues.length > 0) {
    console.log("  Warnings:");
    for (const issue of issues) {
      console.log(`    ⚠ ${issue}`);
    }
    console.log();
  }

  if (skillCount > 0) {
    console.log("  ───────────────────────────────────────────────────");
    console.log("  Get Started");
    console.log("  ───────────────────────────────────────────────────");
    console.log();
    console.log("  Open Cursor and try one of these prompts:");
    console.log();
    console.log('    "Plan an ORCA workflow for [your project]"');
    console.log('    "What is OOUX?"');
    console.log('    "Help me discover the objects in [your feature]"');
    console.log('    "Build an Object Guide for [object name]"');
    console.log();
    console.log("  To preview your resource site:");
    console.log("    cd site && npm install && npm start");
    console.log();
    console.log("  To update or uninstall:");
    console.log("    node ~/Caboodle/bin/install.mjs update");
    console.log("    node ~/Caboodle/bin/install.mjs uninstall");
    console.log();
    console.log("  For the full skill list and ORCA journey:");
    console.log("    See CABOODLE_QUICKSTART.md in your project root");
    console.log();
    console.log("  ═══════════════════════════════════════════════════");
  }
}
