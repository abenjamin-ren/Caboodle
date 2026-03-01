#!/bin/bash
# Caboodle — Installer
# Usage: bash install.sh
# Or via curl: bash <(curl -fsSL https://raw.githubusercontent.com/abenjamin-ren/Caboodle/main/install.sh)

set -e

REPO="https://github.com/abenjamin-ren/Caboodle.git"
TMP_DIR="$(mktemp -d)"
CLONE_DIR="$TMP_DIR/Caboodle"

echo ""
echo "  ==================================================="
echo "  Caboodle — Installer"
echo "  ==================================================="
echo ""

# Check for Node.js
if ! command -v node &>/dev/null; then
  echo "  ERROR: Node.js is required but not installed."
  echo "  Install it from https://nodejs.org (version 18 or later)"
  exit 1
fi

NODE_MAJOR=$(node -e "process.stdout.write(process.versions.node.split('.')[0])")
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo "  ERROR: Node.js 18 or later is required (found v$(node -v))."
  exit 1
fi

# Check for git
if ! command -v git &>/dev/null; then
  echo "  ERROR: git is required but not installed."
  exit 1
fi

echo "  Downloading Caboodle from GitHub..."
git clone --depth=1 "$REPO" "$CLONE_DIR" 2>/dev/null || {
  echo ""
  echo "  ERROR: Could not clone $REPO"
  echo "  Make sure the repository exists and is accessible."
  exit 1
}

echo "  Running installer..."
echo ""
node "$CLONE_DIR/bin/cli.js" install

# Cleanup
rm -rf "$TMP_DIR"
