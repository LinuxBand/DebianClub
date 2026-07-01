# APT Safety Module

Use this module for package installation, repository configuration, backports, package conflicts, held packages, and third-party `.deb` files.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-APT-001 | Confirm distro, codename, architecture, and package tooling |
| DLR-APT-002 | Inspect active APT source files and repository origins |
| DLR-APT-003 | Inspect APT policy, priorities, and candidate versions |
| DLR-APT-004 | Verify requested package names before recommending installation |
| DLR-APT-005 | Inspect pinning and held packages |
| DLR-APT-006 | Verify backports availability and explicit target release |
| DLR-APT-007 | Review third-party repository trust, signing, and rollback |

## Required Checks

Run or ask for:

```bash
scripts/inspect-apt.sh package-name
```

Use the output to verify:

- Current distribution and codename
- Active `.list` and `.sources` entries
- APT pinning under `/etc/apt/preferences*`
- Package candidate version and repository origin
- Held packages
- Architecture and foreign architectures

## Package Name Rules

- Verify package names with `apt-cache policy`, `apt-cache show`, or `apt search --names-only`.
- If a package is not found in the current release, say it is not verified. Do not invent names.
- For development headers, verify `-dev` package names instead of assuming language or library naming conventions.
- Prefer Debian package names over upstream installer names when Debian packages exist.

## Repository Rules

- Do not recommend Ubuntu PPAs for Debian by default.
- Do not mix Ubuntu codenames with Debian sources.
- Do not mix Debian stable/testing/unstable without an explicit pinning plan.
- Prefer deb822 `.sources` guidance when the system already uses deb822 files.
- For third-party repositories, explain trust, signing key location, suite compatibility, and removal/rollback.
- Do not recommend `apt-key`; prefer a keyring file referenced by `Signed-By`.

## Backports Rules

- Treat backports as opt-in.
- Require an explicit target such as `-t <codename>-backports`.
- Explain that only selected packages should come from backports unless the user has a pinning policy.
- Verify that the requested package exists in backports before recommending installation.

## Mutating Commands

Before any mutating command, provide a read-only or simulation step:

```bash
apt-cache policy package
apt -s install package
apt -s full-upgrade
```

Only propose `sudo apt install`, `sudo apt remove`, `sudo apt full-upgrade`, source edits, or keyring changes after risk and rollback are stated.
