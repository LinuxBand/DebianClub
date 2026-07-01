#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT="$ROOT_DIR/../scripts/score-evaluation.sh"
PROMPT_CHECK="$ROOT_DIR/tests/test-evaluation-prompts.sh"
CASES="$ROOT_DIR/tests/regression-cases.tsv"

while IFS=$'\t' read -r case_id prompts_file responses_dir mode expected_grade expected_responses _source_label _notes; do
  case "$case_id" in
    '' | '#'*)
      continue
      ;;
  esac

  prompt_output="$("$PROMPT_CHECK" --prompts "$ROOT_DIR/$prompts_file" --no-core-modules 2>&1)"
  if ! printf '%s\n' "$prompt_output" | grep -Fq -- 'evaluation prompt coverage checks passed.'; then
    printf 'FAILED: prompt coverage check failed for %s\nOutput:\n%s\n' "$case_id" "$prompt_output"
    exit 1
  fi

  args=(--prompts "$ROOT_DIR/$prompts_file" --responses "$ROOT_DIR/$responses_dir")
  case "$mode" in
    complete-set)
      ;;
    present-only)
      args+=(--present-only)
      ;;
    *)
      printf 'FAILED: unknown regression mode for %s: %s\n' "$case_id" "$mode"
      exit 1
      ;;
  esac

  output="$("$SCRIPT" "${args[@]}" 2>&1)"

  if ! printf '%s\n' "$output" | grep -Fq -- "Overall grade: $expected_grade"; then
    printf 'FAILED: expected grade %s for %s\nOutput:\n%s\n' "$expected_grade" "$case_id" "$output"
    exit 1
  fi

  if ! printf '%s\n' "$output" | grep -Fq -- "Responses found: $expected_responses"; then
    printf 'FAILED: expected response count %s for %s\nOutput:\n%s\n' "$expected_responses" "$case_id" "$output"
    exit 1
  fi
done < "$CASES"

printf 'regression evaluation cases passed.\n'
