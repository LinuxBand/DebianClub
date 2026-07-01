#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROMPTS_FILE="$ROOT_DIR/tests/evaluation-prompts.md"
REQUIRE_CORE_MODULES=1

failures=0
prompt_count=0
coverage_count=0
max_prompt=0

declare -A prompts
declare -A coverage
declare -A module_seen

fail() {
  printf 'FAILED: %s\n' "$1"
  failures=$((failures + 1))
}

usage() {
  cat <<'USAGE'
Usage:
  test-evaluation-prompts.sh [--prompts FILE] [--no-core-modules]

Checks numbered prompt files for consecutive prompt IDs, matching Expected
Coverage rows, and known module names. By default, also requires the prompt set
to cover every core module.
USAGE
}

trim() {
  local value="$1"
  value="${value#"${value%%[![:space:]]*}"}"
  value="${value%"${value##*[![:space:]]}"}"
  printf '%s' "$value"
}

normalize_module() {
  case "$1" in
    env | env-detect) printf 'env-detect' ;;
    apt-safe) printf 'apt-safe' ;;
    command-safety) printf 'command-safety' ;;
    systemd | systemd-troubleshoot) printf 'systemd-troubleshoot' ;;
    network-debug) printf 'network-debug' ;;
    dev-setup) printf 'dev-setup' ;;
    gpu-drivers) printf 'gpu-drivers' ;;
    containers) printf 'containers' ;;
    debian-packaging) printf 'debian-packaging' ;;
    security-audit) printf 'security-audit' ;;
    *) return 1 ;;
  esac
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    -h | --help)
      usage
      exit 0
      ;;
    --prompts)
      if [ "$#" -lt 2 ]; then
        printf 'ERROR: --prompts requires a file.\n' >&2
        exit 2
      fi
      PROMPTS_FILE="$2"
      shift 2
      ;;
    --no-core-modules)
      REQUIRE_CORE_MODULES=0
      shift
      ;;
    *)
      printf 'ERROR: unknown argument: %s\n' "$1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [ ! -f "$PROMPTS_FILE" ]; then
  printf 'ERROR: prompts file not found: %s\n' "$PROMPTS_FILE" >&2
  exit 1
fi

while IFS= read -r line; do
  if [[ "$line" =~ ^([0-9]+)\. ]]; then
    number="${BASH_REMATCH[1]}"
    prompts["$number"]=1
    prompt_count=$((prompt_count + 1))
    if [ "$number" -gt "$max_prompt" ]; then
      max_prompt="$number"
    fi
    continue
  fi

  if [[ "$line" == "| "* ]]; then
    IFS='|' read -r _ prompt_column coverage_column _ <<< "$line"
    prompt_column="$(trim "${prompt_column:-}")"
    coverage_column="$(trim "${coverage_column:-}")"

    if [[ "$prompt_column" =~ ^[0-9]+$ ]]; then
      if [ -n "${coverage[$prompt_column]+set}" ]; then
        fail "duplicate expected coverage row for prompt $prompt_column"
      fi
      coverage["$prompt_column"]="$coverage_column"
      coverage_count=$((coverage_count + 1))
    fi
  fi
done < "$PROMPTS_FILE"

if [ "$prompt_count" -eq 0 ]; then
  fail "no numbered prompts found"
fi

if [ "$prompt_count" -ne "$coverage_count" ]; then
  fail "prompt count ($prompt_count) does not match expected coverage count ($coverage_count)"
fi

for ((number = 1; number <= max_prompt; number++)); do
  if [ -z "${prompts[$number]+set}" ]; then
    fail "missing prompt $number"
  fi

  if [ -z "${coverage[$number]+set}" ]; then
    fail "missing expected coverage row for prompt $number"
    continue
  fi

  IFS=',' read -r -a modules <<< "${coverage[$number]}"
  if [ "${#modules[@]}" -eq 0 ]; then
    fail "empty module coverage for prompt $number"
    continue
  fi

  for module_entry in "${modules[@]}"; do
    module_entry="$(trim "$module_entry")"
    module_name="${module_entry%% *}"
    normalized="$(normalize_module "$module_name")" || {
      fail "unknown module '$module_name' in prompt $number coverage"
      continue
    }
    module_seen["$normalized"]=1
  done
done

if [ "$REQUIRE_CORE_MODULES" -eq 1 ]; then
  for required_module in \
    env-detect \
    apt-safe \
    command-safety \
    systemd-troubleshoot \
    network-debug \
    dev-setup \
    gpu-drivers \
    containers \
    debian-packaging \
    security-audit; do
    if [ -z "${module_seen[$required_module]+set}" ]; then
      fail "expected prompts do not cover $required_module"
    fi
  done
fi

if [ "$failures" -gt 0 ]; then
  printf '%d evaluation prompt check(s) failed.\n' "$failures"
  exit 1
fi

printf 'evaluation prompt coverage checks passed.\n'
