#!/usr/bin/env bash
set -eu

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILL_NAME="debian-linux-reliability"
TARGET_DIR="${CODEX_HOME:-$HOME/.codex}/skills"
REPLACE=0

usage() {
  cat <<'USAGE'
Usage:
  install-skill.sh [--target DIR] [--replace] [skill-name]

Installs a DebianClub skill from this repository into a user-local Codex skills
directory. Existing installs are left untouched unless --replace is provided.
With --replace, the existing destination is moved to a timestamped backup first.
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    -h | --help)
      usage
      exit 0
      ;;
    --target)
      if [ "$#" -lt 2 ]; then
        printf 'ERROR: --target requires a directory.\n' >&2
        exit 2
      fi
      TARGET_DIR="$2"
      shift 2
      ;;
    --replace)
      REPLACE=1
      shift
      ;;
    --*)
      printf 'ERROR: unknown option: %s\n' "$1" >&2
      usage >&2
      exit 2
      ;;
    *)
      SKILL_NAME="$1"
      shift
      ;;
  esac
done

SOURCE_DIR="$ROOT_DIR/$SKILL_NAME"
DEST_DIR="$TARGET_DIR/$SKILL_NAME"

if [ ! -f "$SOURCE_DIR/SKILL.md" ]; then
  printf 'ERROR: skill not found or missing SKILL.md: %s\n' "$SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"

TMP_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

cp -R "$SOURCE_DIR" "$TMP_DIR/$SKILL_NAME"

if [ -e "$DEST_DIR" ]; then
  if [ "$REPLACE" -ne 1 ]; then
    printf 'ERROR: destination already exists: %s\n' "$DEST_DIR" >&2
    printf 'Use --replace to move the existing install to a timestamped backup first.\n' >&2
    exit 1
  fi

  BACKUP_DIR="${DEST_DIR}.backup.$(date +%Y%m%d%H%M%S)"
  mv "$DEST_DIR" "$BACKUP_DIR"
  printf 'Backed up existing skill to: %s\n' "$BACKUP_DIR"
fi

mv "$TMP_DIR/$SKILL_NAME" "$DEST_DIR"
printf 'Installed %s to %s\n' "$SKILL_NAME" "$DEST_DIR"
