#!/usr/bin/env bash
set -eu

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$ROOT_DIR/.." && pwd)"
REGISTRY_PATH="$ROOT_DIR/registry.json"
OUTPUT_DIR="$ROOT_DIR/dist"
SKILL_NAME="debian-linux-reliability"

usage() {
  cat <<'USAGE'
Usage:
  package-skill.sh [--output DIR] [skill-name]

Builds a versioned .tgz archive for a skill listed in skills/registry.json.
The archive contains the skill folder and a registry.json snapshot.
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    -h | --help)
      usage
      exit 0
      ;;
    --output)
      if [ "$#" -lt 2 ]; then
        printf 'ERROR: --output requires a directory.\n' >&2
        exit 2
      fi
      OUTPUT_DIR="$2"
      shift 2
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

metadata="$(
  python3 - "$REGISTRY_PATH" "$SKILL_NAME" <<'PY'
import json
import sys

registry_path, skill_name = sys.argv[1], sys.argv[2]
registry = json.load(open(registry_path, encoding="utf-8"))
for skill in registry.get("skills", []):
    if skill.get("name") == skill_name:
        print(skill["version"])
        print(skill["path"])
        break
else:
    raise SystemExit(f"skill not found in registry: {skill_name}")
PY
)"

VERSION="$(printf '%s\n' "$metadata" | sed -n '1p')"
SKILL_PATH="$(printf '%s\n' "$metadata" | sed -n '2p')"
SOURCE_DIR="$REPO_ROOT/$SKILL_PATH"

if [ ! -f "$SOURCE_DIR/SKILL.md" ]; then
  printf 'ERROR: skill source is missing SKILL.md: %s\n' "$SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"
WORK_DIR="$(mktemp -d)"
cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

PACKAGE_ROOT="$WORK_DIR/${SKILL_NAME}-${VERSION}"
mkdir -p "$PACKAGE_ROOT/skills"
cp -R "$SOURCE_DIR" "$PACKAGE_ROOT/skills/$SKILL_NAME"
cp "$REGISTRY_PATH" "$PACKAGE_ROOT/registry.json"

ARCHIVE_NAME="${SKILL_NAME}-${VERSION}.tgz"
ARCHIVE_PATH="$OUTPUT_DIR/$ARCHIVE_NAME"
MANIFEST_PATH="$OUTPUT_DIR/${SKILL_NAME}-${VERSION}.manifest.json"

tar --sort=name \
  --mtime='UTC 1970-01-01' \
  --owner=0 \
  --group=0 \
  --numeric-owner \
  -C "$WORK_DIR" \
  -czf "$ARCHIVE_PATH" \
  "${SKILL_NAME}-${VERSION}"

sha256="$(sha256sum "$ARCHIVE_PATH" | awk '{print $1}')"
size_bytes="$(wc -c < "$ARCHIVE_PATH" | tr -d '[:space:]')"

python3 - "$SKILL_NAME" "$VERSION" "$ARCHIVE_NAME" "$sha256" "$size_bytes" > "$MANIFEST_PATH" <<'PY'
import json
import sys

skill_name, version, archive_name, sha256, size_bytes = sys.argv[1:]
manifest = {
    "schema_version": 1,
    "name": skill_name,
    "version": version,
    "archive": archive_name,
    "sha256": sha256,
    "size_bytes": int(size_bytes),
}
print(json.dumps(manifest, indent=2, sort_keys=True))
PY

printf 'Built %s\n' "$ARCHIVE_PATH"
printf 'Wrote %s\n' "$MANIFEST_PATH"
