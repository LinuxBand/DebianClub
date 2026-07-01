#!/usr/bin/env bash
set -u

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
    printf '%s\n' "$output"
  fi
  if [ "$status" -ne 0 ]; then
    printf '[command failed: exit %s]\n' "$status"
  fi
}

has() {
  command -v "$1" >/dev/null 2>&1
}

section "Security audit tool availability"
if has lynis; then
  printf 'lynis=present\n'
  run "lynis show version" lynis show version
else
  printf 'lynis=missing\n'
fi

if has systemd-detect-virt; then
  run "systemd-detect-virt" systemd-detect-virt
fi

section "Recommended next commands"
if has lynis; then
  cat <<'EOF'
# Non-remediating audit, user-approved because it may enumerate sensitive system details
# and writes audit logs/reports by default when permitted:
sudo lynis audit system --no-colors

# Avoid default log writes if the user wants terminal output only:
sudo lynis audit system --no-colors --no-log

# Or write audit artifacts to explicit reviewable paths:
sudo lynis audit system --no-colors --log-file ./lynis.log --report-file ./lynis-report.dat

# Less privileged but less complete:
lynis audit system --no-colors
EOF
else
  cat <<'EOF'
# Verify package availability before installing:
apt-cache policy lynis
apt -s install lynis
EOF
fi
