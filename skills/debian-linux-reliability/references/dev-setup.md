# Development Setup Module

Use this module for setting up or repairing development environments on Debian/Linux: Node.js, pnpm, Python, pipx, uv, Rust, Go, C/C++, Docker/Podman clients, Git, and build dependencies.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-DEV-001 | Inspect installed language/toolchain versions |
| DLR-DEV-002 | Inspect Python environment and package-management boundary |
| DLR-DEV-003 | Verify Debian development packages and headers |
| DLR-DEV-004 | Identify Node/Corepack/package-manager ownership |
| DLR-DEV-005 | Separate user-local toolchains from system packages |

## Required Checks

Run:

```bash
scripts/dev-probe.sh
```

Also use the APT module before recommending Debian package installation.

## Rules

- Prefer Debian packages for system dependencies and headers.
- Prefer user-level language toolchains when they avoid mutating system Python or system libraries.
- Do not recommend `sudo pip install` into system Python.
- For Python, prefer `python3 -m venv`, `pipx`, or `uv` depending on task.
- For Node.js, detect whether the user already uses Debian packages, NodeSource, nvm, fnm, asdf, or corepack. Do not mix managers casually.
- For pnpm, prefer Corepack when compatible with the user's Node setup.
- For Rust, prefer the user's existing rustup/cargo setup unless they want Debian-packaged Rust.
- For C/C++, verify `build-essential`, `pkg-config`, and exact `-dev` packages.

## Mutating Boundary

Before installation commands:

1. Verify package names with `inspect-apt.sh`.
2. Show a simulation command when using APT.
3. Explain whether the change is system-wide or user-local.
4. Avoid changing shell startup files without showing the exact line.

## Common Debian Pitfalls

- Missing `python3-venv` causes venv creation failures.
- Missing `pkg-config` or `*-dev` packages causes native builds to fail.
- Node packages with native extensions require compiler and header packages.
- System Python is managed by Debian; direct global pip writes can break package-managed files.
