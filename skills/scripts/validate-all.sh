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

validate_skill_metadata() {
  python3 - "$1" <<'PY'
import pathlib
import re
import sys

skill_dir = pathlib.Path(sys.argv[1])
skill_path = skill_dir / "SKILL.md"
text = skill_path.read_text(encoding="utf-8")
lines = text.splitlines()
errors = []

if not lines or lines[0] != "---":
    errors.append("missing opening YAML frontmatter marker")
else:
    try:
        end = lines.index("---", 1)
    except ValueError:
        errors.append("missing closing YAML frontmatter marker")
    else:
        frontmatter = {}
        for line in lines[1:end]:
            if not line.strip():
                continue
            if ":" not in line:
                errors.append(f"invalid frontmatter line: {line}")
                continue
            key, value = line.split(":", 1)
            frontmatter[key.strip()] = value.strip().strip('"').strip("'")

        extra_keys = sorted(set(frontmatter) - {"name", "description"})
        if extra_keys:
            errors.append(f"unexpected frontmatter keys: {', '.join(extra_keys)}")

        name = frontmatter.get("name", "")
        description = frontmatter.get("description", "")
        if name != skill_dir.name:
            errors.append(f"name must match directory: expected {skill_dir.name}, got {name or '<missing>'}")
        if not re.fullmatch(r"[a-z0-9-]{1,63}", name):
            errors.append("name must be lowercase letters, digits, and hyphens")
        if not description:
            errors.append("description is required")

if errors:
    for error in errors:
        print(f"FAILED: {error}")
    sys.exit(1)

print("basic skill metadata checks passed.")
PY
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
  else
    run_check "metadata fallback: $skill_name" validate_skill_metadata "$skill_dir"
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
