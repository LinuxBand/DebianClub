# Command Safety Module

Use this module before running or recommending shell commands that may modify a Linux system.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-RISK-000 | Privilege escalation or user context switch |
| DLR-RISK-001 | Destructive or recursive deletion |
| DLR-RISK-002 | Disk, filesystem, partition, or block metadata mutation |
| DLR-RISK-003 | Mount state changes |
| DLR-RISK-004 | Permission or ownership changes |
| DLR-RISK-005 | Remote code download and execution |
| DLR-RISK-006 | Writes to system configuration or package-managed paths |
| DLR-RISK-007 | Package database mutation |
| DLR-RISK-008 | Service state or unit mutation |
| DLR-RISK-009 | Firewall policy mutation |
| DLR-RISK-010 | Bootloader mutation |
| DLR-RISK-011 | Encrypted block device mutation |

## Review First

Check commands with:

```bash
scripts/risk-check.sh -- "command"
```

This script is static analysis only. It does not execute the command.

The script emits structured fields: affected scope, mutates system, reversibility, safer first check, highest risk, check IDs, and approval requirement.

## High-Risk Patterns

Treat these as high risk:

- Recursive or forced deletion: `rm -rf`, `find ... -delete`
- Raw disk writes: `dd of=`, `cat image > /dev/...`
- Filesystem creation: `mkfs.*`
- Partitioning: `fdisk`, `parted`, `sgdisk`
- Recursive permissions or ownership: `chmod -R`, `chown -R`
- Remote code execution: `curl | sh`, `wget | bash`
- System config writes under `/etc`, `/boot`, `/usr`, `/lib`, `/var/lib`
- Firewall changes: `nft add/delete/flush`, `ufw enable/deny/reset`
- Bootloader changes: `grub-install`, `update-grub`

## Safer Alternatives

Prefer:

- `ls`, `find -print`, `du`, `stat`, `readlink -f` before deletion
- `rsync --dry-run` before copy/sync changes
- `apt -s` before package changes
- `systemctl status` and `journalctl` before restart
- `nft list ruleset` before firewall edits
- File backups before in-place edits

## Response Rule

If the user asks for a risky command, do not simply refuse. Provide:

1. What the command would affect
2. A read-only inspection step
3. A safer or narrower command if available
4. A rollback or backup path
5. A clear approval boundary before execution
