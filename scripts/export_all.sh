#!/usr/bin/env bash
# Export all skills to both agentskills.io and Anthropic/Claude formats.
#
# Usage:
#   ./scripts/export_all.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "═══════════════════════════════════════════════════"
echo "  Caboodle — Export Pipeline"
echo "═══════════════════════════════════════════════════"
echo

python3 "$SCRIPT_DIR/export_agentskills.py"
echo
python3 "$SCRIPT_DIR/export_anthropic.py"
echo

echo "═══════════════════════════════════════════════════"
echo "  Export complete."
echo "  • dist/agentskills/  — agentskills.io packages"
echo "  • dist/anthropic/    — Anthropic/Claude packages"
echo "═══════════════════════════════════════════════════"
