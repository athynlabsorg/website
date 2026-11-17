#!/bin/bash
# smoke-test.sh — Verify the Athyn Labs website is in a working state (< 30s).
# Critical flow: the homepage renders with the hero and a working primary CTA.

FAILED=0
PASS="✓"
FAIL="✗"
PORT="${PORT:-3100}"
URL="http://localhost:$PORT"

check() {
  local name="$1"
  local cmd="$2"
  if eval "$cmd" > /dev/null 2>&1; then
    echo "$PASS $name"
  else
    echo "$FAIL $name"
    FAILED=1
  fi
}

echo "=== Smoke Test ==="

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

check "Next.js app scaffolded (package.json)" "test -f '$SCRIPT_DIR/package.json'"
check "Homepage responds 200 at $URL" "curl -sf '$URL'"
check "Hero headline renders ('pays attention')" "curl -sf '$URL' | grep -qi 'pays'"
check "Primary CTA 'Start a project' present" "curl -sf '$URL' | grep -q 'Start a project'"
check "Typecheck passes" "cd '$SCRIPT_DIR' && npx --no-install tsc --noEmit"

# --- Harness: progress log is up to date ---
PROGRESS_FILE="$SCRIPT_DIR/claude-progress.txt"

find_unlogged() {
  local hashes count best=""
  hashes=$(grep -oE 'last-logged: *[0-9a-f]{7,}' "$PROGRESS_FILE" | grep -oE '[0-9a-f]{7,}' || true)
  if [ -z "$hashes" ]; then
    hashes=$(grep -oE '\b[0-9a-f]{7,40}\b' "$PROGRESS_FILE" || true)
  fi
  while IFS= read -r h; do
    [ -z "$h" ] && continue
    count=$(git -C "$SCRIPT_DIR" rev-list --count "${h}..HEAD" 2>/dev/null || true)
    [ -z "$count" ] && continue
    if [ -z "$best" ] || [ "$count" -lt "$best" ]; then best="$count"; fi
  done <<< "$hashes"
  printf '%s' "$best"
}

if [ -f "$PROGRESS_FILE" ]; then
  UNLOGGED=$(find_unlogged)
  if [ -z "$UNLOGGED" ]; then
    echo "⚠ No resolvable commit hash in claude-progress.txt — log commits to enable tracking"
  elif [ "$UNLOGGED" -gt 3 ]; then
    echo "$FAIL Progress log stale ($UNLOGGED commits since last update)"
    echo "  → Update claude-progress.txt before starting new work"
    FAILED=1
  elif [ "$UNLOGGED" -gt 0 ]; then
    echo "⚠ Progress log slightly behind ($UNLOGGED commits since last update)"
  else
    echo "$PASS Progress log up to date"
  fi
else
  echo "$FAIL claude-progress.txt missing"
  FAILED=1
fi

echo ""
if [ $FAILED -eq 0 ]; then
  echo "SMOKE TEST: PASS — environment is healthy"
  exit 0
else
  echo "SMOKE TEST: FAIL — fix the failures above before starting new work"
  echo "  - App not scaffolded: build feature setup-001 first"
  echo "  - Server not running: run ./init.sh"
  echo "  - Progress log stale: update claude-progress.txt with recent commit hashes"
  exit 1
fi
