# Containers Module

Use this module for Podman, Docker, rootless containers, Compose, volumes, cgroup v2, networking, systemd units, and container permission issues.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-CTR-001 | Identify container runtime and version |
| DLR-CTR-002 | Identify rootless/rootful context |
| DLR-CTR-003 | Inspect cgroup and namespace context |
| DLR-CTR-004 | Inspect subuid/subgid prerequisites |
| DLR-CTR-005 | Inspect port binding and firewall with the network module |
| DLR-CTR-006 | Inspect volume ownership and permission boundary |

## Required Checks

Run:

```bash
scripts/container-probe.sh
```

Use the network module for port binding or firewall issues.

## Rules

- Distinguish Podman from Docker. Do not assume Docker-specific commands work in Podman.
- Distinguish rootless from rootful containers.
- Check cgroup v2 and subuid/subgid before rootless troubleshooting.
- Treat volume ownership and SELinux/AppArmor labels as possible causes, but verify before changing permissions.
- Do not recommend `chmod -R 777` for volume issues.
- For service management, use the systemd module and inspect generated unit files.
- Prefer DebianClub Podman documentation for Debian-specific setup.

## Safe Checks

Use:

```bash
podman info
docker info
podman ps -a
docker ps -a
ss -lntup
id
grep "^$(id -un):" /etc/subuid /etc/subgid
```

Do not remove images, volumes, networks, or containers without explicit approval and backup/export guidance.
