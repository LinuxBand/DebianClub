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

section "Network interfaces"
if has ip; then
  run "ip -br link" ip -br link
  run "ip -br addr" ip -br addr
  run "ip route" ip route
  run "ip -6 route" ip -6 route
else
  printf 'ip command not found\n'
fi

section "DNS"
if has resolvectl; then
  run "resolvectl status" resolvectl status
fi
if [ -r /etc/resolv.conf ]; then
  run "readlink -f /etc/resolv.conf" readlink -f /etc/resolv.conf
  printf '\n$ sed -n 1,80p /etc/resolv.conf\n'
  sed -n '1,80p' /etc/resolv.conf 2>&1
fi

section "Listening sockets"
if has ss; then
  run "ss -lntup" ss -lntup
else
  printf 'ss command not found\n'
fi

section "Network managers"
if has nmcli; then
  run "nmcli general status" nmcli general status
  run "nmcli device status" nmcli device status
  run "nmcli connection show --active" nmcli connection show --active
fi

if has networkctl; then
  run "networkctl list" networkctl list
fi

section "Firewall state"
if has nft; then
  run "nft list ruleset" nft list ruleset
fi
if has ufw; then
  run "ufw status verbose" ufw status verbose
fi

section "Proxy environment names"
env | grep -Ei '^(http|https|all|no)_proxy=' | sed -E 's#=.+#=<redacted>#' || true
