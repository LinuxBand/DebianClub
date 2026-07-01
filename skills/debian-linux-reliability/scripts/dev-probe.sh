#!/usr/bin/env bash
set -u
set -o pipefail

section() {
  printf '\n## %s\n' "$1"
}

run_version() {
  local tool="$1"
  shift
  if command -v "$tool" >/dev/null 2>&1; then
    printf '\n$ %s %s\n' "$tool" "$*"
    "$tool" "$@" 2>&1 | sed -n '1,20p' || printf '[command failed: exit %s]\n' "$?"
  else
    printf '%s=missing\n' "$tool"
  fi
}

section "Development tool versions"
run_version git --version
run_version node --version
run_version npm --version
run_version corepack --version
run_version pnpm --version
run_version yarn --version
run_version python3 --version
run_version pipx --version
run_version uv --version
run_version rustc --version
run_version cargo --version
run_version go version
run_version gcc --version
run_version g++ --version
run_version make --version
run_version pkg-config --version
run_version cmake --version
run_version docker --version
run_version podman --version

section "Python environment"
printf 'VIRTUAL_ENV=%s\n' "${VIRTUAL_ENV:-}"
printf 'CONDA_PREFIX=%s\n' "${CONDA_PREFIX:-}"
if command -v python3 >/dev/null 2>&1; then
  python3 - <<'PY'
import site, sys
print("python_executable=" + sys.executable)
print("python_prefix=" + sys.prefix)
print("user_site=" + site.getusersitepackages())
PY
fi

section "Debian development packages"
if command -v dpkg-query >/dev/null 2>&1; then
  for package in build-essential pkg-config ca-certificates curl git python3-venv pipx; do
    dpkg-query -W -f='${Package} ${Status} ${Version}\n' "$package" 2>/dev/null || printf '%s not-installed\n' "$package"
  done
fi
