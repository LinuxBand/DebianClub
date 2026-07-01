#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CASES_FILE="$ROOT_DIR/tests/risk-check-cases.tsv"
SCRIPT="$ROOT_DIR/scripts/risk-check.sh"

failures=0

while IFS=$'\t' read -r command expected_level expected_text expected_id expected_mutates expected_approval; do
  [ -n "${command:-}" ] || continue

  output="$("$SCRIPT" -- "$command" 2>&1)"

  if ! printf '%s\n' "$output" | grep -Fq -- "$expected_level:"; then
    printf 'FAILED level: %s\nExpected level: %s\nOutput:\n%s\n' "$command" "$expected_level" "$output"
    failures=$((failures + 1))
    continue
  fi

  if ! printf '%s\n' "$output" | grep -Fq -- "$expected_text"; then
    printf 'FAILED text: %s\nExpected text: %s\nOutput:\n%s\n' "$command" "$expected_text" "$output"
    failures=$((failures + 1))
  fi

  if [ "${expected_id:-}" = "none" ]; then
    if ! printf '%s\n' "$output" | grep -Fq -- 'Check IDs: none'; then
      printf 'FAILED check id summary: %s\nExpected ID: none\nOutput:\n%s\n' "$command" "$output"
      failures=$((failures + 1))
    fi
  elif ! printf '%s\n' "$output" | grep -Fq -- "$expected_id"; then
    printf 'FAILED check id: %s\nExpected ID: %s\nOutput:\n%s\n' "$command" "$expected_id" "$output"
    failures=$((failures + 1))
  fi

  if ! printf '%s\n' "$output" | grep -Fq -- "Mutates system: ${expected_mutates:-no}"; then
    printf 'FAILED mutation summary: %s\nExpected mutates: %s\nOutput:\n%s\n' "$command" "${expected_mutates:-no}" "$output"
    failures=$((failures + 1))
  fi

  if ! printf '%s\n' "$output" | grep -Fq -- "Approval required: ${expected_approval:-no}"; then
    printf 'FAILED approval summary: %s\nExpected approval: %s\nOutput:\n%s\n' "$command" "${expected_approval:-no}" "$output"
    failures=$((failures + 1))
  fi
done < "$CASES_FILE"

if [ "$failures" -gt 0 ]; then
  printf '%d risk-check case(s) failed.\n' "$failures"
  exit 1
fi

printf 'risk-check regression cases passed.\n'
