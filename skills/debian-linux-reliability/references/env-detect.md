# Environment Detection Module

Use this module before Debian/Linux guidance that depends on distribution, release, architecture, privileges, init system, or runtime context.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-ENV-001 | Identify distribution, release, codename, and Debian base |
| DLR-ENV-002 | Identify architecture and foreign architectures |
| DLR-ENV-003 | Identify kernel and runtime context: bare metal, VM, container, WSL |
| DLR-ENV-004 | Identify init system and systemd availability |
| DLR-ENV-005 | Identify effective UID and available privilege helpers |

## Required Facts

Collect these facts before giving release-specific or system-level advice:

- Distribution identity from `/etc/os-release`
- Debian base indicator from `/etc/debian_version`, if present
- Release codename and version
- CPU architecture from `dpkg --print-architecture`
- Foreign architectures from `dpkg --print-foreign-architectures`
- Kernel from `uname -a`
- PID 1 and systemd availability
- WSL, container, VM, or bare-metal context
- Effective UID and available privilege helpers

Use `scripts/collect-env.sh` for a read-only fact report.

## Interpretation Rules

- Do not treat Ubuntu, Linux Mint, Kali, Devuan, Raspberry Pi OS, or other derivatives as Debian unless the user explicitly asks for derivative-specific guidance.
- Do not assume systemd exists. Containers, WSL, Devuan, and minimal images may not have a working systemd userland.
- Do not assume `amd64`. Package names, repository availability, GPU drivers, and foreign architecture instructions can differ by architecture.
- Do not assume root access. Provide unprivileged checks first and mark privileged commands separately.
- Treat missing tools as facts. Recommend installing diagnostic tools only after explaining why they are needed.

## Output

Summarize environment facts in a compact block:

```text
Environment facts:
- Distro/release:
- Architecture:
- Runtime:
- Init system:
- Privilege:
```

If facts conflict, name the conflict instead of choosing silently.
