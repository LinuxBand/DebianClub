#!/usr/bin/env bash

redact_sensitive() {
  sed -E \
    -e 's#([A-Za-z][A-Za-z0-9+.-]*://)[^/@[:space:]]+:[^/@[:space:]]+@#\1<redacted>:<redacted>@#g' \
    -e 's#(Authorization:[[:space:]]*(Bearer|Basic|Token|Digest)[[:space:]]+)[^[:space:]]+#\1<redacted>#Ig' \
    -e 's#(-{1,2}[^[:space:]=]*(token|password|passwd|secret|api[-_]?key|access[-_]?key|credential|private[-_]?key|client[-_]?secret|database[-_]?url)[^[:space:]=]*([=[:space:]]+))[^[:space:];,]+#\1<redacted>#Ig' \
    -e 's#([A-Za-z_][A-Za-z0-9_]*(TOKEN|PASSWORD|PASSWD|SECRET|API_KEY|ACCESS_KEY|AUTH|CREDENTIAL|PRIVATE_KEY|CLIENT_SECRET|DATABASE_URL)[A-Za-z0-9_]*[[:space:]]*=[[:space:]]*)[^[:space:];,]+#\1<redacted>#Ig' \
    -e 's#((token|password|passwd|secret|api[_-]?key|access[_-]?key|credential|private[_-]?key|client[_-]?secret|database[_-]?url)[^:=[:space:]]*[[:space:]]*[:=][[:space:]]*)[^[:space:];,]+#\1<redacted>#Ig'
}
