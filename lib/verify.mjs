/**
 * Verify the Caboodle installation and print a summary.
 */

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { bold, dim, green, yellow, red, cyan } from "./colors.mjs";

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

  const ok = (label) => `${green("✓")} ${label}`;
  const warn = (label) => `${yellow("⚠")} ${label}`;
  const fail = (label) => `${red("✗")} ${label}`;

  // Print summary
  console.log();
  console.log(`  ${bold("Installation Summary")}`);
  console.log(dim("  ─────────────────────────────────────────────────"));
  console.log();
  console.log(`  Skills      ${skillCount === 18 ? ok(`${skillCount}/18`) : warn(`${skillCount}/18`)}`);
  console.log(`  Rules       ${ruleCount === 7 ? ok(`${ruleCount}/7`) : warn(`${ruleCount}/7`)}`);
  console.log(`  AGENTS.md   ${agentsOk ? ok("installed") : fail("missing")}`);
  console.log(`  Quickstart  ${quickstartOk ? ok("installed") : dim("- skipped")}`);
  console.log(`  Site        ${siteOk ? ok("initialized") : dim("- not yet")}`);
  console.log();

  if (issues.length > 0) {
    console.log(`  ${bold(yellow("Warnings"))}`);
    for (const issue of issues) {
      console.log(`    ${yellow("⚠")} ${issue}`);
    }
    console.log();
  }

  if (skillCount > 0) {
    console.log(`  ${bold("What's next?")}`);
    console.log(dim("  ─────────────────────────────────────────────────"));
    console.log();
    console.log(`  Open your AI assistant and try:`);
    console.log();
    console.log(`    ${cyan('"Plan an ORCA workflow for [your project]"')}`);
    console.log(`    ${cyan('"Help me discover the objects in [your feature]"')}`);
    console.log(`    ${cyan('"Build an Object Guide for [object name]"')}`);
    console.log();
    console.log(`  ${dim("Preview your resource site:")}  ${cyan("cd site && npm install && npm start")}`);
    console.log(`  ${dim("Full skill reference:")}        ${cyan("CABOODLE_QUICKSTART.md")}`);
    console.log(`  ${dim("Update / uninstall:")}          ${cyan("caboodle update")} ${dim("|")} ${cyan("caboodle uninstall")}`);
    console.log();
  }
}
