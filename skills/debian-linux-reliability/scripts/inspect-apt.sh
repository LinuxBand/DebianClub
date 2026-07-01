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

has() {
  command -v "$1" >/dev/null 2>&1
}

section "APT environment"
if [ -r /etc/os-release ]; then
  sed -n '1,80p' /etc/os-release | redact_sensitive
fi

if has apt; then
  run "apt --version" apt --version
else
  printf 'apt not found\n'
fi

if has dpkg; then
  run "dpkg --print-architecture" dpkg --print-architecture
  run "dpkg --print-foreign-architectures" dpkg --print-foreign-architectures
fi

section "APT source files"
find /etc/apt -maxdepth 3 \( -name '*.list' -o -name '*.sources' \) -type f -print 2>/dev/null | sort || true

section "Active repository entries"
while IFS= read -r file; do
  [ -r "$file" ] || continue
  printf '\n# %s\n' "$file"
  sed -n '/^[[:space:]]*#/d;/^[[:space:]]*$/d;p' "$file" 2>/dev/null | sed -n '1,120p' | redact_sensitive
done < <(find /etc/apt -maxdepth 3 \( -name '*.list' -o -name '*.sources' \) -type f -print 2>/dev/null | sort)

section "APT policy"
if has apt-cache; then
  run "apt-cache policy" apt-cache policy
else
  printf 'apt-cache not found\n'
fi

if [ "$#" -gt 0 ] && has apt-cache; then
  section "Requested package checks"
  for package in "$@"; do
    printf '\n### %s\n' "$package"
    run "apt-cache policy $package" apt-cache policy "$package"
    run "apt-cache show --no-all-versions $package" apt-cache show --no-all-versions "$package"
  done
fi

section "APT pinning"
find /etc/apt/preferences /etc/apt/preferences.d -maxdepth 1 -type f -print 2>/dev/null | sort | while IFS= read -r file; do
  [ -r "$file" ] || continue
  printf '\n# %s\n' "$file"
  sed -n '/^[[:space:]]*#/d;/^[[:space:]]*$/d;p' "$file" 2>/dev/null | sed -n '1,120p' | redact_sensitive
done

section "Held packages"
if has apt-mark; then
  run "apt-mark showhold" apt-mark showhold
fi
