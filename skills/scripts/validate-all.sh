#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VALIDATOR="${SKILL_VALIDATOR:-$HOME/.codex/skills/.system/skill-creator/scripts/quick_validate.py}"

failures=0

run_check() {
  local label="$1"
  shift
  printf '\n## %s\n' "$label"
  if "$@"; then
    printf 'OK\n'
  else
    printf 'FAILED\n'
    failures=$((failures + 1))
  fi
}

if [ -d "$ROOT_DIR/scripts" ]; then
  while IFS= read -r script; do
    run_check "bash -n: ${script#"$ROOT_DIR"/}" bash -n "$script"
  done < <(find "$ROOT_DIR/scripts" -maxdepth 1 -type f -name '*.sh' | sort)
fi

if [ -f "$ROOT_DIR/registry.json" ] && [ -f "$ROOT_DIR/scripts/validate-registry.sh" ]; then
  run_check "registry: registry.json" "$ROOT_DIR/scripts/validate-registry.sh" "$ROOT_DIR/registry.json"
fi

for skill_dir in "$ROOT_DIR"/*; do
  [ -d "$skill_dir" ] || continue
  [ -f "$skill_dir/SKILL.md" ] || continue

  skill_name="$(basename "$skill_dir")"

  if [ -f "$VALIDATOR" ]; then
    run_check "quick_validate: $skill_name" python3 "$VALIDATOR" "$skill_dir"
  elif [ "${ALLOW_MISSING_SKILL_VALIDATOR:-0}" = "1" ]; then
    printf '\n## quick_validate: %s\nSKIPPED: SKILL_VALIDATOR not found and ALLOW_MISSING_SKILL_VALIDATOR=1\n' "$skill_name"
  else
    printf '\n## quick_validate: %s\nFAILED: set SKILL_VALIDATOR or install skill-creator validator\n' "$skill_name"
    failures=$((failures + 1))
  fi

  if [ -d "$skill_dir/scripts" ]; then
    while IFS= read -r script; do
      run_check "bash -n: ${script#"$ROOT_DIR"/}" bash -n "$script"
    done < <(find "$skill_dir/scripts" -type f -name '*.sh' | sort)
  fi

  if [ -d "$skill_dir/tests" ]; then
    while IFS= read -r test_script; do
      run_check "bash -n: ${test_script#"$ROOT_DIR"/}" bash -n "$test_script"
      run_check "test: ${test_script#"$ROOT_DIR"/}" "$test_script"
    done < <(find "$skill_dir/tests" -type f -name '*.sh' | sort)
  fi
done

if [ "$failures" -gt 0 ]; then
  printf '\n%d check(s) failed.\n' "$failures"
  exit 1
fi

printf '\nAll skill checks passed.\n'
