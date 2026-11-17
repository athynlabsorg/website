#!/bin/bash
# init.sh — Start the Athyn Labs website dev environment.
# Idempotent: safe to run repeatedly. Agents run this at the start of every session.

set -e
cd "$(dirname "${BASH_SOURCE[0]}")"

PORT="${PORT:-3100}"
LOG=/tmp/athynlabs-website-dev.log

echo "=== Athyn Labs website: init ==="

command -v node >/dev/null || { echo "ERROR: node not found. Install Node 20+."; exit 1; }
NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
[ "$NODE_MAJOR" -ge 20 ] || { echo "ERROR: Node 20+ required (found $(node -v))."; exit 1; }
echo "✓ Node $(node -v)"

if [ ! -f package.json ]; then
  echo "⚠ No package.json yet — the Next.js app has not been scaffolded (feature setup-001)."
  echo "=== Init complete (nothing to start yet) ==="
  exit 0
fi

if [ -f .env.local ]; then echo "✓ .env.local present"; fi

npm install --silent
echo "✓ Dependencies installed"

if curl -sf "http://localhost:$PORT" >/dev/null 2>&1; then
  echo "✓ Dev server already running at http://localhost:$PORT"
else
  nohup npm run dev -- --port "$PORT" >"$LOG" 2>&1 &
  echo "Starting dev server (logs: $LOG)..."
  for i in $(seq 1 30); do
    if curl -sf "http://localhost:$PORT" >/dev/null 2>&1; then
      echo "✓ Dev server responding at http://localhost:$PORT"
      break
    fi
    if [ "$i" -eq 30 ]; then
      echo "ERROR: dev server not responding after 30s. See $LOG"
      exit 1
    fi
    sleep 1
  done
fi

echo "=== Init complete. Run ./smoke-test.sh ==="
