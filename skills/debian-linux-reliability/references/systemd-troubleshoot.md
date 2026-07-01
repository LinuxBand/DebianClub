# Systemd Troubleshooting Module

Use this module for failed services, unit files, timers, sockets, startup order, daemon reloads, and journal logs.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-SYS-001 | Confirm systemd host state and PID 1 context |
| DLR-SYS-002 | Inspect failed units and selected unit status |
| DLR-SYS-003 | Inspect effective unit files and drop-ins |
| DLR-SYS-004 | Inspect boot journal entries for the unit |
| DLR-SYS-005 | Check paths, users, groups, environment, sockets, and dependencies |
| DLR-SYS-006 | Define daemon-reload, restart, enable, or rollback boundary |

## Required Checks

Run:

```bash
scripts/systemd-diagnose.sh unit.service
```

For unknown failures, first run the script with no unit to list failed units.

## Diagnosis Order

1. Confirm systemd is available and PID 1 context makes sense.
2. Inspect `systemctl status --no-pager --full`.
3. Inspect selected properties with `systemctl show`.
4. Inspect the effective unit with `systemctl cat`.
5. Inspect boot logs with `journalctl -u unit -b`.
6. Check file paths, users/groups, environment variables, permissions, sockets, ports, and dependency ordering.

## Common Pitfalls

- Containers and WSL may have `systemctl` installed but no working system manager.
- Unit changes require `systemctl daemon-reload`.
- User units require `systemctl --user`, not system-level commands.
- Environment variables in interactive shells do not automatically apply to services.
- Relative paths in `ExecStart` are usually wrong.
- Services can fail because ports are occupied; use the network module to inspect sockets.
- Restart loops often hide the first error; inspect older journal entries.

## Mutating Boundary

Do not run `restart`, `enable`, `disable`, `mask`, `unmask`, `edit`, or write unit files without explaining:

- The exact unit affected
- The current state
- The intended change
- The verification command
- The rollback command
