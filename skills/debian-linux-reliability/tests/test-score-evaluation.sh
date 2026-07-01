#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT="$ROOT_DIR/../scripts/score-evaluation.sh"
RESPONSES="$ROOT_DIR/tests/fixtures/evaluation-responses"

output="$("$SCRIPT" --responses "$RESPONSES" 2>&1)"

if ! printf '%s\n' "$output" | grep -Fq -- 'Overall score:'; then
  printf 'FAILED: missing overall score\nOutput:\n%s\n' "$output"
  exit 1
fi

if ! printf '%s\n' "$output" | grep -Fq -- 'Responses found: 30'; then
  printf 'FAILED: expected fixture response count\nOutput:\n%s\n' "$output"
  exit 1
fi

if ! printf '%s\n' "$output" | grep -Fq -- 'Missing responses: 0'; then
  printf 'FAILED: expected no missing fixture responses\nOutput:\n%s\n' "$output"
  exit 1
fi

if ! printf '%s\n' "$output" | grep -Fq -- 'Overall score: 300/300 (100.0%)'; then
  printf 'FAILED: expected full fixture score\nOutput:\n%s\n' "$output"
  exit 1
fi

if ! printf '%s\n' "$output" | grep -Fq -- '| 1 | 10/10 |'; then
  printf 'FAILED: expected prompt 1 fixture to score 10/10\nOutput:\n%s\n' "$output"
  exit 1
fi

if ! printf '%s\n' "$output" | grep -Fq -- '| 30 | 10/10 |'; then
  printf 'FAILED: expected prompt 30 fixture to score 10/10\nOutput:\n%s\n' "$output"
  exit 1
fi

printf 'evaluation score report checks passed.\n'
