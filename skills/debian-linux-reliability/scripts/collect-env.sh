#!/usr/bin/env bash
set -u

section() {
  printf '\n## %s\n' "$1"
}

run() {
  local label="$1"
  shift
  printf '\n$ %s\n' "$label"
  "$@" 2>&1 || printf '[command failed: exit %s]\n' "$?"
}

has() {
  command -v "$1" >/dev/null 2>&1
}

section "Debian/Linux environment facts"
printf 'timestamp_utc=%s\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || true)"
printf 'effective_uid=%s\n' "$(id -u 2>/dev/null || printf unknown)"
printf 'shell=%s\n' "${SHELL:-unknown}"

section "OS release"
if [ -r /etc/os-release ]; then
  sed -n '1,80p' /etc/os-release
else
  printf '/etc/os-release not readable\n'
fi

if [ -r /etc/debian_version ]; then
  printf '\n/etc/debian_version=%s\n' "$(cat /etc/debian_version)"
fi

section "Kernel and architecture"
run "uname -a" uname -a
if has dpkg; then
  run "dpkg --print-architecture" dpkg --print-architecture
  run "dpkg --print-foreign-architectures" dpkg --print-foreign-architectures
else
  printf 'dpkg not found\n'
fi

section "Runtime context"
if has systemd-detect-virt; then
  run "systemd-detect-virt" systemd-detect-virt
  run "systemd-detect-virt --container" systemd-detect-virt --container
  run "systemd-detect-virt --vm" systemd-detect-virt --vm
fi

if [ -f /.dockerenv ]; then
  printf 'dockerenv=present\n'
fi

if grep -qi microsoft /proc/version 2>/dev/null; then
  printf 'wsl=likely\n'
else
  printf 'wsl=not_detected\n'
fi

if [ -r /proc/1/comm ]; then
  printf 'pid1=%s\n' "$(cat /proc/1/comm)"
fi

section "Systemd availability"
if has systemctl; then
  run "systemctl is-system-running" systemctl is-system-running
  run "systemctl --version" systemctl --version
else
  printf 'systemctl not found\n'
fi

section "Privilege helpers"
for tool in sudo doas su pkexec; do
  if has "$tool"; then
    printf '%s=present\n' "$tool"
  else
    printf '%s=missing\n' "$tool"
  fi
done

section "Core tools"
for tool in apt apt-cache apt-file dpkg journalctl ip ss nft ufw nmcli networkctl resolvectl git curl wget; do
  if has "$tool"; then
    printf '%s=%s\n' "$tool" "$(command -v "$tool")"
  fi
done
