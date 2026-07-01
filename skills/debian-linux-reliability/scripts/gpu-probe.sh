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

section "Kernel"
run "uname -a" uname -a

section "Graphics hardware"
if has lspci; then
  run "lspci -nnk graphics excerpt" sh -c "lspci -nnk | grep -EA4 'VGA|3D|Display'"
else
  printf 'lspci not found; install pciutils to inspect PCI GPUs.\n'
fi

section "Loaded graphics modules"
if has lsmod; then
  run "lsmod graphics excerpt" sh -c "lsmod | grep -E 'nvidia|nouveau|amdgpu|radeon|i915|xe|drm' || true"
fi

section "Display stack"
printf 'XDG_SESSION_TYPE=%s\n' "${XDG_SESSION_TYPE:-unknown}"
printf 'WAYLAND_DISPLAY=%s\n' "${WAYLAND_DISPLAY:-}"
printf 'DISPLAY=%s\n' "${DISPLAY:-}"

if has glxinfo; then
  run "glxinfo -B" glxinfo -B
fi

if has nvidia-smi; then
  run "nvidia-smi" nvidia-smi
fi

if has mokutil; then
  run "mokutil --sb-state" mokutil --sb-state
fi

section "Relevant Debian packages"
if has dpkg-query; then
  dpkg-query -W -f='${Package} ${Status} ${Version}\n' \
    'nvidia-*' 'xserver-xorg-video-nouveau' 'mesa-*' 'firmware-*' 2>/dev/null | sed -n '1,160p' || true
fi
