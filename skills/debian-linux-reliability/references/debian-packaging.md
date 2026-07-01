# Debian Packaging Module

Use this module for Debian source packages, `debian/control`, `debian/rules`, changelogs, build dependencies, lintian, sbuild, gbp, uscan, and backports packaging.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-PKG-001 | Confirm source tree and `debian/` metadata presence |
| DLR-PKG-002 | Inspect `debian/control`, changelog, rules, and source format |
| DLR-PKG-003 | Check build dependencies |
| DLR-PKG-004 | Prefer clean build validation |
| DLR-PKG-005 | Interpret lintian output |
| DLR-PKG-006 | Review backports target and dependency availability |

## Required Checks

Run from the package source tree:

```bash
scripts/packaging-probe.sh
```

## Diagnosis Order

1. Confirm the tree has a `debian/` directory.
2. Inspect `debian/control`, `debian/changelog`, and `debian/rules`.
3. Check build dependency availability with `dpkg-checkbuilddeps`.
4. Identify source format and patch system if relevant.
5. Build in a clean environment when possible; prefer `sbuild` for serious validation.
6. Run `lintian` after a build.

## Rules

- Do not edit packaging metadata without explaining the package-level effect.
- Do not add build dependencies by guesswork. Connect each dependency to a build error or upstream requirement.
- For backports, document the target release, changelog suffix, dependency availability, and whether newer dependencies also need backporting.
- Keep Debian policy, reproducibility, and clean build behavior in mind.
- Prefer small packaging diffs over broad rewrites.

## Mutating Boundary

Before changing packaging files:

- Show the failing build or lintian evidence.
- State the exact file and field affected.
- Explain whether the change affects runtime dependencies, build dependencies, maintainer scripts, or package metadata.
