#!/usr/bin/env node

/**
 * Caboodle — CLI
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
import { initSite, createProjectPlaceholders } from "../lib/init-site.mjs";
import { verify } from "../lib/verify.mjs";
import { confirm } from "../lib/prompts.mjs";
import { bold, dim, green, yellow, red, cyan } from "../lib/colors.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

function getVersion() {
  const pkgPath = join(PACKAGE_ROOT, "package.json");
  if (existsSync(pkgPath)) {
    return JSON.parse(readFileSync(pkgPath, "utf-8")).version;
  }
  return null;
}

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

function isCaboodleRepo(dir) {
  return (
    existsSync(join(dir, "skills")) &&
    existsSync(join(dir, "templates")) &&
    existsSync(join(dir, "bin", "cli.js")) &&
    existsSync(join(dir, "lib", "copy-skills.mjs"))
  );
}

function copyTemplateFile(templateName, destPath, destName) {
  const srcPath = join(PACKAGE_ROOT, "templates", templateName);
  if (!existsSync(srcPath)) {
    console.log(`  ${yellow("⚠")} Template ${templateName} not found, skipping`);
    return false;
  }
  const content = readFileSync(srcPath, "utf-8");
  writeFileSync(destPath, content, "utf-8");
  console.log(`  ${green("✓")} ${destName || templateName}`);
  return true;
}

function printBanner(title) {
  const ver = getVersion();
  const vLabel = ver ? dim(` v${ver}`) : "";
  console.log();
  console.log(`  ${bold("Caboodle")}${vLabel} ${dim("—")} ${title}`);
  console.log(dim("  ─────────────────────────────────────────────────"));
  console.log();
}

// ─── Commands ──────────────────────────────────────────────

async function install(targetDir) {
  printBanner("Install");
  console.log(`  ${dim("Project")}  ${targetDir}`);
  console.log();

  // 1. Copy skills
  console.log(`  ${bold("Skills")} ${dim("(.cursor/rules/caboodle-*.md)")}`);
  const skills = copySkills(targetDir);
  console.log(`  ${green("✓")} ${skills.copied.length} skill(s) installed`);
  if (skills.skipped.length > 0) {
    console.log(`  ${yellow("⚠")} ${skills.skipped.length} skill(s) skipped (no SKILL.md found)`);
  }

  // 2. Copy rules
  console.log();
  console.log(`  ${bold("Rules")} ${dim("(.cursor/rules/caboodle-*.mdc)")}`);
  const rules = copyRules(targetDir);
  console.log(`  ${green("✓")} ${rules.copied.length} rule(s) installed`);

  // 3. Copy AGENTS.md
  console.log();
  console.log(`  ${bold("AGENTS.md")}`);
  const agentsPath = join(targetDir, "AGENTS.md");
  if (existsSync(agentsPath)) {
    const shouldOverwrite = nonInteractive || await confirm("  AGENTS.md already exists. Overwrite?", false);
    if (shouldOverwrite) {
      copyTemplateFile("AGENTS.md", agentsPath, "AGENTS.md (overwritten)");
    } else {
      console.log(`  ${dim("—")} AGENTS.md kept as-is`);
    }
  } else {
    copyTemplateFile("AGENTS.md", agentsPath, "AGENTS.md");
  }

  // 4. Copy quickstart
  console.log();
  console.log(`  ${bold("CABOODLE_QUICKSTART.md")}`);
  const quickstartPath = join(targetDir, "CABOODLE_QUICKSTART.md");
  copyTemplateFile("CABOODLE_QUICKSTART.md", quickstartPath, "CABOODLE_QUICKSTART.md");

  // 5. Initialize resource site
  console.log();
  console.log(`  ${bold("Resource Site")} ${dim("(site/)")}`);
  const site = initSite(targetDir);
  if (site.created.length > 0) {
    console.log(`  ${green("✓")} ${site.created.length} site file(s) created`);
  }
  if (site.skipped.length > 0) {
    console.log(`  ${dim("—")} ${site.skipped.length} site file(s) already exist (kept as-is)`);
  }

  // 6. Verify
  verify(targetDir);
}

async function uninstall(targetDir) {
  printBanner("Uninstall");
  console.log(`  ${dim("Project")}  ${targetDir}`);
  console.log();

  const shouldProceed = nonInteractive || await confirm("  Remove all Caboodle skills, rules, and AGENTS.md?");
  if (!shouldProceed) {
    console.log("  Cancelled.");
    return;
  }

  // Remove skills
  const removedSkills = removeSkills(targetDir);
  console.log(`  ${green("✓")} ${removedSkills.length} skill file(s) removed`);

  // Remove rules
  const removedRules = removeRules(targetDir);
  console.log(`  ${green("✓")} ${removedRules.length} rule file(s) removed`);

  // Remove AGENTS.md
  const agentsPath = join(targetDir, "AGENTS.md");
  if (existsSync(agentsPath)) {
    const content = readFileSync(agentsPath, "utf-8");
    if (content.includes("Caboodle") || (content.includes("OOUX") && content.includes("ORCA"))) {
      unlinkSync(agentsPath);
      console.log(`  ${green("✓")} AGENTS.md removed`);
    } else {
      console.log(`  ${dim("—")} AGENTS.md kept (doesn't appear to be Caboodle-generated)`);
    }
  }

  // Remove quickstart
  const quickstartPath = join(targetDir, "CABOODLE_QUICKSTART.md");
  if (existsSync(quickstartPath)) {
    unlinkSync(quickstartPath);
    console.log(`  ${green("✓")} CABOODLE_QUICKSTART.md removed`);
  }

  console.log();
  console.log(`  ${green("Done.")} All Caboodle skill and rule files removed.`);
  console.log(`  ${dim("Note:")} The site/ directory was NOT removed. Delete it manually if desired.`);
  console.log();
}

/**
 * Patch site/docusaurus.config.js to add missing critical settings
 * without overwriting user customizations.
 */
function patchSiteConfig(targetDir) {
  const configPath = join(targetDir, "site", "docusaurus.config.js");
  if (!existsSync(configPath)) {
    console.log(`  ${dim("—")} site/docusaurus.config.js not found, skipping`);
    return;
  }

  let src = readFileSync(configPath, "utf-8");
  let changed = false;

  // Remove broken favicon reference (points to a file that doesn't exist)
  if (src.includes("favicon:")) {
    src = src.replace(/\s*favicon:\s*['"][^'"]*['"],?\n?/g, "\n");
    changed = true;
  }

  // Add staticDirectories: [] if missing (prevents empty-glob webpack error)
  if (!src.includes("staticDirectories")) {
    src = src.replace(
      /(onBrokenMarkdownLinks:\s*['"][^'"]*['"],?)/,
      "$1\n  staticDirectories: [],"
    );
    changed = true;
  }

  if (changed) {
    writeFileSync(configPath, src, "utf-8");
    console.log(`  ${green("✓")} site/docusaurus.config.js patched`);
  } else {
    console.log(`  ${dim("—")} site/docusaurus.config.js already up to date`);
  }
}

/**
 * Patch site/package.json to add npm overrides for known vulnerable
 * transitive dependencies in Docusaurus's webpack stack.
 */
function patchSitePackageJson(targetDir) {
  const pkgPath = join(targetDir, "site", "package.json");
  if (!existsSync(pkgPath)) {
    console.log(`  ${dim("—")} site/package.json not found, skipping`);
    return;
  }

  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  const overrides = pkg.overrides || {};
  let changed = false;

  if (!overrides.minimatch) {
    overrides.minimatch = "^3.1.5";
    changed = true;
  }
  if (!overrides["serialize-javascript"]) {
    overrides["serialize-javascript"] = "^7.0.3";
    changed = true;
  }

  if (changed) {
    pkg.overrides = overrides;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n", "utf-8");
    console.log(`  ${green("✓")} site/package.json overrides added — run ${cyan("npm install")} in site/`);
  } else {
    console.log(`  ${dim("—")} site/package.json already up to date`);
  }
}

async function update(targetDir) {
  printBanner("Update");
  console.log(`  ${dim("Project")}  ${targetDir}`);
  console.log();

  // 1. Re-copy skills
  console.log(`  ${bold("Skills")}`);
  const skills = copySkills(targetDir);
  console.log(`  ${green("✓")} ${skills.copied.length} skill(s) updated`);

  // 2. Re-copy rules
  console.log();
  console.log(`  ${bold("Rules")}`);
  const rules = copyRules(targetDir);
  console.log(`  ${green("✓")} ${rules.copied.length} rule(s) updated`);

  // 3. Update AGENTS.md
  console.log();
  console.log(`  ${bold("AGENTS.md")}`);
  const agentsPath = join(targetDir, "AGENTS.md");
  copyTemplateFile("AGENTS.md", agentsPath, "AGENTS.md");

  // 4. Update quickstart
  console.log();
  console.log(`  ${bold("CABOODLE_QUICKSTART.md")}`);
  const quickstartPath = join(targetDir, "CABOODLE_QUICKSTART.md");
  copyTemplateFile("CABOODLE_QUICKSTART.md", quickstartPath, "CABOODLE_QUICKSTART.md");

  // 5. Patch site config and package.json for known issues
  console.log();
  console.log(`  ${bold("Site fixes")}`);
  patchSiteConfig(targetDir);
  patchSitePackageJson(targetDir);

  // 6. Verify
  verify(targetDir);
}

async function initSiteCmd(targetDir) {
  printBanner("Initialize Resource Site");
  console.log(`  ${dim("Project")}  ${targetDir}`);
  console.log();

  const site = initSite(targetDir);
  console.log(`  ${green("✓")} ${site.created.length} file(s) created`);
  if (site.skipped.length > 0) {
    console.log(`  ${dim("—")} ${site.skipped.length} file(s) already existed (kept as-is)`);
  }

  console.log();
  console.log(`  ${bold("Next steps:")}`);
  console.log(`    ${cyan("cd site && npm install && npm start")}`);
  console.log();
}

async function initProjectCmd(targetDir, projectSlug) {
  if (!projectSlug) {
    console.error(`  ${red("ERROR")} Please provide a project name.`);
    console.error(`  Example: ${cyan("caboodle init-project my-project")}`);
    process.exit(1);
  }

  // Build a readable display name from the slug
  const projectName = projectSlug
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  printBanner("Initialize Project");
  console.log(`  ${dim("Project")}  ${projectName} ${dim(`(${projectSlug})`)}`);
  console.log(`  ${dim("Target")}   ${targetDir}`);
  console.log();

  const result = createProjectPlaceholders(targetDir, projectSlug, projectName);

  if (result.created.length > 0) {
    console.log(`  ${green("✓")} Created ${result.created.length} placeholder page(s):`);
    result.created.forEach((f) => console.log(`    ${dim("+")} ${f}`));
  }
  if (result.skipped.length > 0) {
    console.log(`  ${dim("—")} ${result.skipped.length} file(s) already existed (kept as-is)`);
  }

  console.log();
  console.log(`  ${bold("Next steps:")}`);
  console.log(`    Ask your AI assistant to start the ORCA workflow:`);
  console.log(`    ${cyan(`"Plan an ORCA workflow for ${projectName}"`)}`);
  console.log();
}

// ─── Main ──────────────────────────────────────────────────

const args = process.argv.slice(2);
const nonInteractive = args.includes("--yes") || args.includes("-y");
const forceFlag = args.includes("--force");

// Recognise --help / --version as commands even though they start with "-"
const FLAG_COMMANDS = ["--help", "-h", "--version", "-v"];
const command =
  FLAG_COMMANDS.find((f) => args.includes(f)) ||
  args.find((a) => !a.startsWith("-")) ||
  "install";

const targetDir = findProjectRoot();

// Guard: prevent installing into the Caboodle source repo itself
if (
  ["install", "update"].includes(command) &&
  isCaboodleRepo(targetDir) &&
  !forceFlag
) {
  console.error();
  console.error(`  ${red("ERROR")} You're inside the Caboodle source repo.`);
  console.error(`  Navigate to your project directory first, then run:`);
  console.error();
  console.error(`    ${cyan("cd /path/to/your/project")}`);
  console.error(`    ${cyan("caboodle install")}`);
  console.error();
  console.error(`  ${dim("To override this check, use --force.")}`);
  console.error();
  process.exit(1);
}

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
  case "init-project": {
    const projectSlug = args.find((a) => !a.startsWith("-") && a !== "init-project");
    await initProjectCmd(targetDir, projectSlug);
    break;
  }
  case "verify":
  case "check":
    printBanner("Verify Installation");
    console.log(`  ${dim("Project")}  ${targetDir}`);
    verify(targetDir);
    break;
  case "--version":
  case "-v": {
    const ver = getVersion();
    console.log(ver ? `Caboodle v${ver}` : "Caboodle (version unknown)");
    break;
  }
  case "--help":
  case "-h": {
    const ver = getVersion();
    const vLabel = ver ? dim(` v${ver}`) : "";
    console.log();
    console.log(`  ${bold("Caboodle")}${vLabel} ${dim("— OOUX Agent Skills CLI")}`);
    console.log();
    console.log(`  ${bold("Commands")}`);
    console.log(`    caboodle install               Install skills, rules, and site scaffold`);
    console.log(`    caboodle update                Re-install latest skills and rules`);
    console.log(`    caboodle uninstall             Remove all Caboodle files`);
    console.log(`    caboodle init-site             Initialize the resource site only`);
    console.log(`    caboodle init-project <name>   Create placeholder pages for a project`);
    console.log(`    caboodle verify                Check your installation`);
    console.log();
    console.log(`  ${bold("Options")}`);
    console.log(`    --yes, -y             Skip confirmation prompts`);
    console.log(`    --force               Allow install inside the Caboodle repo`);
    console.log(`    --version, -v         Show version`);
    console.log(`    --help, -h            Show this help`);
    console.log();
    console.log(`  ${bold("Install")}`);
    console.log(`    ${cyan("npm install -g github:abenjamin-ren/Caboodle")}`);
    console.log();
    break;
  }
  default:
    console.error(`  ${red("Unknown command:")} ${command}`);
    console.error(`  Run ${cyan("caboodle --help")} for usage.`);
    process.exit(1);
}
