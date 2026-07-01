#!/usr/bin/env bash
set -u

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# shellcheck source=skills/debian-linux-reliability/scripts/lib-redact.sh
. "$ROOT_DIR/scripts/lib-redact.sh"

input='Environment=API_TOKEN=abc123 PASSWORD=hunter2
https://user:pass@example.com/repo
PrivateKey = supersecret
client-secret: value123
Authorization: Bearer abc.def.ghi
Authorization: Basic dXNlcjpwYXNz
ExecStart=/opt/app --token cli-token --password=hunter2 --client-secret cli-secret
DATABASE_URL=postgres://dbuser:dbpass@db/app
--database-url mysql://user:pass@db/app'

output="$(printf '%s\n' "$input" | redact_sensitive)"

for secret in abc123 hunter2 'user:pass' supersecret value123 'abc.def.ghi' dXNlcjpwYXNz cli-token cli-secret dbuser dbpass; do
  if printf '%s\n' "$output" | grep -Fq -- "$secret"; then
    printf 'FAILED redaction: secret still present: %s\nOutput:\n%s\n' "$secret" "$output"
    exit 1
  fi
done

for expected in \
  'API_TOKEN=<redacted>' \
  'PASSWORD=<redacted>' \
  'https://<redacted>:<redacted>@example.com/repo' \
  'PrivateKey = <redacted>' \
  'client-secret: <redacted>' \
  'Authorization: Bearer <redacted>' \
  'Authorization: Basic <redacted>' \
  '--token <redacted>' \
  '--password=<redacted>' \
  '--client-secret <redacted>' \
  'DATABASE_URL=<redacted>' \
  '--database-url <redacted>'; do
  if ! printf '%s\n' "$output" | grep -Fq -- "$expected"; then
    printf 'FAILED redaction: expected text missing: %s\nOutput:\n%s\n' "$expected" "$output"
    exit 1
  fi
done

printf 'redaction regression cases passed.\n'
