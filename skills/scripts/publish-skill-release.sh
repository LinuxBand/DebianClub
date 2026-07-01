#!/usr/bin/env bash
set -eu

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REGISTRY_PATH="$ROOT_DIR/registry.json"
OUTPUT_DIR="$ROOT_DIR/dist"
SKILL_NAME="debian-linux-reliability"
REPO=""
DRY_RUN=0
VERIFY_TAG=0

usage() {
  cat <<'USAGE'
Usage:
  publish-skill-release.sh [--dry-run] [--verify-tag] [--repo OWNER/REPO] [--output DIR] [skill-name]

Validates, packages, and publishes a skill archive to GitHub Releases using gh.
The release tag format is:

  skills/<skill-name>/v<version>

Use --dry-run to build artifacts and print the release command without uploading.
Use --verify-tag in CI tag builds to require that the git tag already exists.
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    -h | --help)
      usage
      exit 0
      ;;
    --dry-run)
      DRY_RUN=1
      shift
      ;;
    --verify-tag)
      VERIFY_TAG=1
      shift
      ;;
    --repo)
      if [ "$#" -lt 2 ]; then
        printf 'ERROR: --repo requires OWNER/REPO.\n' >&2
        exit 2
      fi
      REPO="$2"
      shift 2
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
        print(skill["display_name"])
        break
else:
    raise SystemExit(f"skill not found in registry: {skill_name}")
PY
)"

VERSION="$(printf '%s\n' "$metadata" | sed -n '1p')"
DISPLAY_NAME="$(printf '%s\n' "$metadata" | sed -n '2p')"
TAG="skills/${SKILL_NAME}/v${VERSION}"
ARCHIVE_PATH="$OUTPUT_DIR/${SKILL_NAME}-${VERSION}.tgz"
MANIFEST_PATH="$OUTPUT_DIR/${SKILL_NAME}-${VERSION}.manifest.json"
NOTES_PATH="$OUTPUT_DIR/${SKILL_NAME}-${VERSION}.release-notes.md"

"$ROOT_DIR/scripts/validate-all.sh"
"$ROOT_DIR/scripts/package-skill.sh" --output "$OUTPUT_DIR" "$SKILL_NAME"

python3 - "$MANIFEST_PATH" "$DISPLAY_NAME" "$TAG" > "$NOTES_PATH" <<'PY'
import json
import pathlib
import sys

manifest_path = pathlib.Path(sys.argv[1])
display_name = sys.argv[2]
tag = sys.argv[3]
manifest = json.loads(manifest_path.read_text(encoding="utf-8"))

print(f"# {display_name} {manifest['version']}")
print()
print(f"- Tag: `{tag}`")
print(f"- Archive: `{manifest['archive']}`")
print(f"- SHA-256: `{manifest['sha256']}`")
print(f"- Size: `{manifest['size_bytes']}` bytes")
print()
print("Install from the archive only after verifying the checksum in the manifest.")
PY

if [ "$VERIFY_TAG" -eq 1 ] && ! git rev-parse -q --verify "refs/tags/$TAG" >/dev/null; then
  printf 'ERROR: expected git tag does not exist: %s\n' "$TAG" >&2
  exit 1
fi

if [ "$DRY_RUN" -eq 1 ]; then
  printf 'DRY RUN: built release artifacts for %s\n' "$TAG"
  printf 'Archive: %s\n' "$ARCHIVE_PATH"
  printf 'Manifest: %s\n' "$MANIFEST_PATH"
  printf 'Notes: %s\n' "$NOTES_PATH"
  printf 'Release command:\n'
  if [ -n "$REPO" ]; then
    printf '  gh release create %q %q %q --repo %q --title %q --notes-file %q\n' \
      "$TAG" "$ARCHIVE_PATH" "$MANIFEST_PATH" "$REPO" "$DISPLAY_NAME $VERSION" "$NOTES_PATH"
  else
    printf '  gh release create %q %q %q --title %q --notes-file %q\n' \
      "$TAG" "$ARCHIVE_PATH" "$MANIFEST_PATH" "$DISPLAY_NAME $VERSION" "$NOTES_PATH"
  fi
  exit 0
fi

if ! command -v gh >/dev/null 2>&1; then
  printf 'ERROR: gh CLI is required for remote publishing. Use --dry-run to build artifacts only.\n' >&2
  exit 1
fi

release_args=(release create "$TAG" "$ARCHIVE_PATH" "$MANIFEST_PATH" --title "$DISPLAY_NAME $VERSION" --notes-file "$NOTES_PATH")
if [ "$VERIFY_TAG" -eq 1 ]; then
  release_args+=(--verify-tag)
fi
if [ -n "$REPO" ]; then
  release_args+=(--repo "$REPO")
fi

gh "${release_args[@]}"
printf 'Published %s\n' "$TAG"
