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

section "Container runtime versions"
if has podman; then
  run "podman --version" podman --version
fi
if has docker; then
  run "docker --version" docker --version
fi
if has docker-compose; then
  run "docker-compose version" docker-compose version
fi
if has docker && docker compose version >/dev/null 2>&1; then
  run "docker compose version" docker compose version
fi

section "Cgroup and namespace context"
if [ -r /proc/filesystems ]; then
  grep -E 'cgroup2?' /proc/filesystems || true
fi
if [ -r /proc/self/cgroup ]; then
  printf '\n$ sed -n 1,40p /proc/self/cgroup\n'
  sed -n '1,40p' /proc/self/cgroup
fi

section "Rootless prerequisites"
printf 'uid=%s\n' "$(id -u 2>/dev/null || printf unknown)"
for file in /etc/subuid /etc/subgid; do
  if [ -r "$file" ]; then
    printf '\n# %s entries for current user\n' "$file"
    grep -E "^$(id -un 2>/dev/null):" "$file" || true
  fi
done

section "Podman host info"
if has podman; then
  run "podman info --format selected" podman info --format 'host.os={{.Host.OS}} host.arch={{.Host.Arch}} rootless={{.Host.Security.Rootless}} cgroup={{.Host.CgroupVersion}} graph={{.Store.GraphRoot}} runroot={{.Store.RunRoot}}'
fi

section "Docker host info"
if has docker; then
  run "docker info selected" sh -c "docker info --format 'ServerVersion={{.ServerVersion}} CgroupDriver={{.CgroupDriver}} CgroupVersion={{.CgroupVersion}} Rootless={{.SecurityOptions}} DockerRootDir={{.DockerRootDir}}' 2>/dev/null"
fi
