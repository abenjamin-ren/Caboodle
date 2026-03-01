#!/usr/bin/env node

/**
 * Caboodle — CLI Installer
 *
 * Usage:
 *   caboodle install     Install skills, rules, AGENTS.md, and resource site
 *   caboodle init-site   Initialize the Docusaurus resource site structure
 *   caboodle uninstall   Remove all Caboodle files
 *   caboodle update      Re-install skills and rules
 *   caboodle             Same as "install"
 *
 * Install via npm:
 *   npm install -g github:abenjamin-ren/Caboodle
 */

import { existsSync, readFileSync, writeFileSync, unlinkSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { copySkills, removeSkills } from "../lib/copy-skills.mjs";
import { copyRules, removeRules } from "../lib/copy-rules.mjs";
import { initSite } from "../lib/init-site.mjs";
import { verify } from "../lib/verify.mjs";
import { confirm } from "../lib/prompts.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

// ─── Helpers ───────────────────────────────────────────────

function findProjectRoot() {
  let dir = process.cwd();
  const root = dirname(dir);

  while (dir !== root) {
    if (
      existsSync(join(dir, ".git")) ||
      existsSync(join(dir, "package.json")) ||
      existsSync(join(dir, ".cursor"))
    ) {
      return dir;
    }
    dir = dirname(dir);
  }

  return process.cwd();
}

function copyTemplateFile(templateName, destPath, destName) {
  const srcPath = join(PACKAGE_ROOT, "templates", templateName);
  if (!existsSync(srcPath)) {
    console.log(`  ⚠ Template ${templateName} not found, skipping`);
    return false;
  }
  const content = readFileSync(srcPath, "utf-8");
  writeFileSync(destPath, content, "utf-8");
  console.log(`  ✓ ${destName || templateName}`);
  return true;
}

function printBanner(title) {
  console.log();
  console.log("  ═══════════════════════════════════════════════════");
  console.log(`  Caboodle — ${title}`);
  console.log("  ═══════════════════════════════════════════════════");
  console.log();
}

// ─── Commands ──────────────────────────────────────────────

async function install(targetDir) {
  printBanner("Install");
  console.log(`  Project root: ${targetDir}`);
  console.log();

  // 1. Copy skills
  console.log("  Installing skills (.cursor/rules/caboodle-*.md)...");
  const skills = copySkills(targetDir);
  console.log(`  ✓ ${skills.copied.length} skill(s) installed`);
  if (skills.skipped.length > 0) {
    console.log(`  ⚠ ${skills.skipped.length} skill(s) skipped (no SKILL.md found)`);
  }

  // 2. Copy rules
  console.log();
  console.log("  Installing rules (.cursor/rules/caboodle-*.mdc)...");
  const rules = copyRules(targetDir);
  console.log(`  ✓ ${rules.copied.length} rule(s) installed`);

  // 3. Copy AGENTS.md
  console.log();
  console.log("  Installing AGENTS.md...");
  const agentsPath = join(targetDir, "AGENTS.md");
  if (existsSync(agentsPath)) {
    const shouldOverwrite = nonInteractive || await confirm("  AGENTS.md already exists. Overwrite?", false);
    if (shouldOverwrite) {
      copyTemplateFile("AGENTS.md", agentsPath, "AGENTS.md (overwritten)");
    } else {
      console.log("  — AGENTS.md kept as-is");
    }
  } else {
    copyTemplateFile("AGENTS.md", agentsPath, "AGENTS.md");
  }

  // 4. Copy quickstart
  console.log();
  console.log("  Installing CABOODLE_QUICKSTART.md...");
  const quickstartPath = join(targetDir, "CABOODLE_QUICKSTART.md");
  copyTemplateFile("CABOODLE_QUICKSTART.md", quickstartPath, "CABOODLE_QUICKSTART.md");

  // 5. Initialize resource site
  console.log();
  console.log("  Initializing resource site (site/)...");
  const site = initSite(targetDir);
  if (site.created.length > 0) {
    console.log(`  ✓ ${site.created.length} site file(s) created`);
  }
  if (site.skipped.length > 0) {
    console.log(`  — ${site.skipped.length} site file(s) already exist (kept as-is)`);
  }

  // 6. Verify
  verify(targetDir);
}

async function uninstall(targetDir) {
  printBanner("Uninstall");
  console.log(`  Project root: ${targetDir}`);
  console.log();

  const shouldProceed = nonInteractive || await confirm("  Remove all Caboodle skills, rules, and AGENTS.md?");
  if (!shouldProceed) {
    console.log("  Cancelled.");
    return;
  }

  // Remove skills
  const removedSkills = removeSkills(targetDir);
  console.log(`  ✓ ${removedSkills.length} skill file(s) removed`);

  // Remove rules
  const removedRules = removeRules(targetDir);
  console.log(`  ✓ ${removedRules.length} rule file(s) removed`);

  // Remove AGENTS.md
  const agentsPath = join(targetDir, "AGENTS.md");
  if (existsSync(agentsPath)) {
    const content = readFileSync(agentsPath, "utf-8");
    if (content.includes("Caboodle") || (content.includes("OOUX") && content.includes("ORCA"))) {
      unlinkSync(agentsPath);
      console.log("  ✓ AGENTS.md removed");
    } else {
      console.log("  — AGENTS.md kept (doesn't appear to be Caboodle-generated)");
    }
  }

  // Remove quickstart
  const quickstartPath = join(targetDir, "CABOODLE_QUICKSTART.md");
  if (existsSync(quickstartPath)) {
    unlinkSync(quickstartPath);
    console.log("  ✓ CABOODLE_QUICKSTART.md removed");
  }

  console.log();
  console.log("  Done. All Caboodle skill and rule files removed.");
  console.log("  Note: The site/ directory was NOT removed. Delete it manually if desired.");
  console.log();
}

async function update(targetDir) {
  printBanner("Update");
  console.log(`  Project root: ${targetDir}`);
  console.log();
  console.log("  Re-installing skills and rules...");
  console.log();

  // 1. Re-copy skills
  console.log("  Updating skills...");
  const skills = copySkills(targetDir);
  console.log(`  ✓ ${skills.copied.length} skill(s) updated`);

  // 2. Re-copy rules
  console.log();
  console.log("  Updating rules...");
  const rules = copyRules(targetDir);
  console.log(`  ✓ ${rules.copied.length} rule(s) updated`);

  // 3. Update AGENTS.md
  console.log();
  console.log("  Updating AGENTS.md...");
  const agentsPath = join(targetDir, "AGENTS.md");
  copyTemplateFile("AGENTS.md", agentsPath, "AGENTS.md");

  // 4. Update quickstart
  console.log();
  console.log("  Updating CABOODLE_QUICKSTART.md...");
  const quickstartPath = join(targetDir, "CABOODLE_QUICKSTART.md");
  copyTemplateFile("CABOODLE_QUICKSTART.md", quickstartPath, "CABOODLE_QUICKSTART.md");

  // 5. Verify
  verify(targetDir);
}

async function initSiteCmd(targetDir) {
  printBanner("Initialize Resource Site");
  console.log(`  Project root: ${targetDir}`);
  console.log();

  const site = initSite(targetDir);
  console.log(`  ✓ ${site.created.length} file(s) created`);
  if (site.skipped.length > 0) {
    console.log(`  — ${site.skipped.length} file(s) already existed (kept as-is)`);
  }

  console.log();
  console.log("  To start the site locally:");
  console.log("    cd site && npm install && npm start");
  console.log();
}

// ─── Main ──────────────────────────────────────────────────

const args = process.argv.slice(2);
const nonInteractive = args.includes("--yes") || args.includes("-y");
const command = args.find((a) => !a.startsWith("-")) || "install";
const targetDir = findProjectRoot();

switch (command) {
  case "install":
    await install(targetDir);
    break;
  case "uninstall":
    await uninstall(targetDir);
    break;
  case "update":
    await update(targetDir);
    break;
  case "init-site":
    await initSiteCmd(targetDir);
    break;
  case "verify":
  case "check":
    printBanner("Verify Installation");
    console.log(`  Project root: ${targetDir}`);
    verify(targetDir);
    break;
  case "--version":
  case "-v": {
    const pkgPath = join(PACKAGE_ROOT, "package.json");
    if (existsSync(pkgPath)) {
      const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
      console.log(`Caboodle v${pkg.version}`);
    } else {
      console.log("Caboodle (version unknown)");
    }
    break;
  }
  case "--help":
  case "-h":
    console.log();
    console.log("  Caboodle — OOUX Agent Skills CLI");
    console.log();
    console.log("  Install:");
    console.log("    npm install -g github:abenjamin-ren/Caboodle");
    console.log();
    console.log("  Usage:");
    console.log("    caboodle install        Install skills, rules, and site scaffold");
    console.log("    caboodle update         Re-install latest skills and rules");
    console.log("    caboodle uninstall      Remove all Caboodle files");
    console.log("    caboodle init-site      Initialize the resource site only");
    console.log("    caboodle verify         Check your installation");
    console.log("    caboodle --version      Show version");
    console.log("    caboodle --help         Show this help");
    console.log();
    console.log("  Run from your project directory:");
    console.log("    cd /path/to/your/project && caboodle install");
    console.log();
    break;
  default:
    console.error(`  Unknown command: ${command}`);
    console.error(`  Run "caboodle --help" for usage.`);
    process.exit(1);
}
