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
    "$tool" "$@" 2>&1 | sed -n '1,40p' || printf '[command failed: exit %s]\n' "$?"
  else
    printf '%s=missing\n' "$tool"
  fi
}

section "Debian packaging tool versions"
run_version dpkg-buildpackage --version
run_version debuild --version
run_version sbuild --version
run_version lintian --version
run_version dch --version
run_version uscan --version
run_version gbp --version
run_version apt-cache --version

section "Package tree"
if [ -d debian ]; then
  find debian -maxdepth 2 -type f | sort | sed -n '1,200p'
else
  printf 'No debian/ directory in current working directory.\n'
fi

section "Control metadata excerpt"
if [ -r debian/control ]; then
  sed -n '1,220p' debian/control
fi

if [ -r debian/changelog ]; then
  section "Changelog head"
  sed -n '1,80p' debian/changelog
fi

section "Build dependencies dry inspection"
if command -v dpkg-checkbuilddeps >/dev/null 2>&1 && [ -r debian/control ]; then
  printf '\n$ dpkg-checkbuilddeps\n'
  dpkg-checkbuilddeps 2>&1 || printf '[missing build dependencies or command failed: exit %s]\n' "$?"
fi
