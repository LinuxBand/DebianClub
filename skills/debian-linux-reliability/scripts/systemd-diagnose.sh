#!/usr/bin/env bash
set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=skills/debian-linux-reliability/scripts/lib-redact.sh
. "$SCRIPT_DIR/lib-redact.sh"

section() {
  printf '\n## %s\n' "$1"
}

run() {
  local label="$1"
  local output status
  shift
  printf '\n$ %s\n' "$label"
  output="$("$@" 2>&1)"
  status=$?
  if [ -n "$output" ]; then
    printf '%s\n' "$output" | redact_sensitive
  fi
  if [ "$status" -ne 0 ]; then
    printf '[command failed: exit %s]\n' "$status"
  fi
}

if ! command -v systemctl >/dev/null 2>&1; then
  printf 'systemctl not found; this system may not use systemd.\n'
  exit 0
fi

section "Systemd host state"
run "systemctl is-system-running" systemctl is-system-running
run "systemctl --version" systemctl --version

if [ "$#" -eq 0 ]; then
  section "Failed units"
  run "systemctl --failed --no-pager" systemctl --failed --no-pager
  printf '\nPass one or more unit names to inspect logs and unit files.\n'
  exit 0
fi

for unit in "$@"; do
  section "Unit: $unit"
  run "systemctl status --no-pager --full $unit" systemctl status --no-pager --full "$unit"
  run "systemctl show selected properties $unit" systemctl show "$unit" \
    -p Id -p LoadState -p ActiveState -p SubState -p UnitFileState \
    -p FragmentPath -p DropInPaths -p ExecMainStatus -p ExecMainCode \
    -p Result -p NRestarts -p MainPID -p User -p Group
  run "systemctl cat $unit" systemctl cat "$unit"
  if command -v journalctl >/dev/null 2>&1; then
    run "journalctl -u $unit -b -n 120 --no-pager" journalctl -u "$unit" -b -n 120 --no-pager
  fi
done
