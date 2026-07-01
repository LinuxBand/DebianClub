#!/usr/bin/env bash
set -u

usage() {
  cat <<'USAGE'
Usage:
  risk-check.sh -- "command to review"
  printf '%s\n' "command" | risk-check.sh

This script does not execute the command. It only flags risk patterns.
USAGE
}

collect_input() {
  if [ "$#" -gt 0 ]; then
    if [ "${1:-}" = "--" ]; then
      shift
    fi
    printf '%s\n' "$*"
  else
    cat
  fi
}

risk_rank() {
  case "$1" in
    HIGH) printf '3' ;;
    MEDIUM) printf '2' ;;
    LOW) printf '1' ;;
    *) printf '0' ;;
  esac
}

append_id() {
  local id="$1"
  case ",$check_ids," in
    *",$id,"*) ;;
    *) check_ids="${check_ids:+$check_ids, }$id" ;;
  esac
}

flag() {
  local level="$1"
  local id="$2"
  local reason="$3"
  local scope="$4"
  local mutates="$5"
  local reversible="$6"
  local safer_check="$7"
  local approval="$8"

  printf '%s: %s %s\n' "$level" "$id" "$reason"
  printf '  Affected scope: %s\n' "$scope"
  printf '  Mutates system: %s\n' "$mutates"
  printf '  Reversible: %s\n' "$reversible"
  printf '  Safer first check: %s\n' "$safer_check"

  findings=$((findings + 1))
  append_id "$id"

  if [ "$(risk_rank "$level")" -gt "$(risk_rank "$highest_level")" ]; then
    highest_level="$level"
  fi

  case "$mutates" in
    yes)
      mutates_system="yes"
      ;;
    depends)
      if [ "$mutates_system" != "yes" ]; then
        mutates_system="depends"
      fi
      ;;
  esac

  if [ "$approval" = "yes" ]; then
    approval_required="yes"
  fi
}

check() {
  local regex="$1"
  local level="$2"
  local id="$3"
  local reason="$4"
  local scope="$5"
  local mutates="$6"
  local reversible="$7"
  local safer_check="$8"
  local approval="${9:-yes}"

  if printf '%s\n' "$input" | grep -Eiq -- "$regex"; then
    flag "$level" "$id" "$reason" "$scope" "$mutates" "$reversible" "$safer_check" "$approval"
  fi
}

if [ "${1:-}" = "-h" ] || [ "${1:-}" = "--help" ]; then
  usage
  exit 0
fi

input="$(collect_input "$@")"
if [ -z "$input" ]; then
  usage
  exit 2
fi

findings=0
highest_level="LOW"
mutates_system="no"
approval_required="no"
check_ids=""

printf 'Command under review:\n%s\n\n' "$input"
printf 'Findings:\n'

check '(^|[;&|[:space:]])sudo[[:space:]]+' \
  'MEDIUM' 'DLR-RISK-000' \
  'uses elevated privileges; require purpose, scope, and approval' \
  'privileged command context' 'depends' 'not applicable for read-only commands; depends on subcommand if mutating' \
  'run the non-privileged inspection command first when possible'

check '(^|[;&|[:space:]])su[[:space:]-]' \
  'MEDIUM' 'DLR-RISK-000' \
  'switches user or root context; require target user, scope, and approval' \
  'privileged shell or alternate user context' 'depends' 'depends on commands run in that context' \
  'verify the target user and command before switching context'

check '(^|[;&|[:space:]])rm[[:space:]].*(-r|-R|--recursive)' \
  'HIGH' 'DLR-RISK-001' \
  'recursive removal; inspect target and prefer dry-run/list first' \
  'filesystem paths matched by the command' 'yes' 'usually not reversible without backup or snapshot' \
  'list targets with ls, find -print, or du before deletion'

check '(^|[;&|[:space:]])rm[[:space:]].*(-f|--force)' \
  'HIGH' 'DLR-RISK-001' \
  'forced removal; inspect target first' \
  'filesystem paths matched by the command' 'yes' 'usually not reversible without backup or snapshot' \
  'list targets with ls, find -print, or du before deletion'

check '(^|[;&|[:space:]])find[[:space:]].*(-delete|-[[:space:]]*exec[[:space:]]+rm[[:space:]])' \
  'HIGH' 'DLR-RISK-001' \
  'find deletion pattern; inspect matches with find -print first' \
  'all filesystem paths matched by find predicates' 'yes' 'usually not reversible without backup or snapshot' \
  'replace deletion action with -print and review the matched paths'

check '(^|[;&|[:space:]])dd[[:space:]].*of=' \
  'HIGH' 'DLR-RISK-002' \
  'raw block write; can destroy disks or filesystems' \
  'output file or block device named by of=' 'yes' 'usually not reversible without image backup' \
  'run lsblk, blkid, and file on inputs; confirm target device path'

check '(^|[;&|[:space:]])mkfs(\.|[[:space:]])' \
  'HIGH' 'DLR-RISK-002' \
  'formats a filesystem' \
  'target block device or image file' 'yes' 'not reversible without full backup' \
  'run lsblk -f and confirm the exact target device'

check '(^|[;&|[:space:]])(wipefs|blkdiscard)[[:space:]]' \
  'HIGH' 'DLR-RISK-002' \
  'destroys filesystem or block device metadata' \
  'target block device' 'yes' 'not reliably reversible without metadata backup' \
  'run lsblk -f and wipefs --no-act where available'

check '(^|[;&|[:space:]])fdisk[[:space:]]|(^|[;&|[:space:]])parted[[:space:]]|(^|[;&|[:space:]])sgdisk[[:space:]]' \
  'HIGH' 'DLR-RISK-002' \
  'modifies or inspects partition tables; confirm target disk' \
  'partition table of the named disk' 'yes' 'depends on saved partition table backup' \
  'run lsblk, blkid, and sfdisk --dump before changes'

check '(^|[;&|[:space:]])mount[[:space:]]|(^|[;&|[:space:]])umount[[:space:]]' \
  'MEDIUM' 'DLR-RISK-003' \
  'changes mount state; verify device and mountpoint' \
  'mount namespace and target mountpoint' 'yes' 'usually reversible by mount/umount if data is intact' \
  'run findmnt and lsblk -f first'

check '(^|[;&|[:space:]])chmod[[:space:]].*(-R|--recursive)' \
  'HIGH' 'DLR-RISK-004' \
  'recursive permissions change' \
  'all filesystem paths under target directories' 'yes' 'hard to reverse without prior permissions record' \
  'inspect with find -printf or stat before changing permissions'

check '(^|[;&|[:space:]])chmod[[:space:]]+([^[:space:]]+[[:space:]]+)*(777|666|[augo]*[+=][rwx,]*w)' \
  'HIGH' 'DLR-RISK-004' \
  'broad writable permissions; prefer least privilege' \
  'target files or directories' 'yes' 'reversible only if original permissions are known' \
  'inspect current permissions with stat or ls -ld'

check '(^|[;&|[:space:]])chown[[:space:]].*(-R|--recursive)' \
  'HIGH' 'DLR-RISK-004' \
  'recursive ownership change' \
  'all filesystem paths under target directories' 'yes' 'hard to reverse without prior ownership record' \
  'inspect current owners with find -printf or stat'

check '(^|[;&|[:space:]])chown[[:space:]]+' \
  'MEDIUM' 'DLR-RISK-004' \
  'ownership change; verify target and user/group' \
  'target files or directories' 'yes' 'reversible only if original ownership is known' \
  'inspect current owners with stat or ls -ld'

check '(^|[;&|[:space:]])curl[[:space:]].*(\|[[:space:]]*(sudo[[:space:]]+)?(sh|bash))' \
  'HIGH' 'DLR-RISK-005' \
  'downloads and executes remote shell code' \
  'arbitrary commands from the remote script' 'yes' 'unknown; depends on downloaded script behavior' \
  'download to a file, inspect it, verify source and checksum, then run only if trusted'

check '(^|[;&|[:space:]])wget[[:space:]].*(\|[[:space:]]*(sudo[[:space:]]+)?(sh|bash))' \
  'HIGH' 'DLR-RISK-005' \
  'downloads and executes remote shell code' \
  'arbitrary commands from the remote script' 'yes' 'unknown; depends on downloaded script behavior' \
  'download to a file, inspect it, verify source and checksum, then run only if trusted'

check '(^|[^0-9])>{1,2}[[:space:]]*/(etc|boot|usr|lib|var/lib)/' \
  'HIGH' 'DLR-RISK-006' \
  'redirects output into system paths' \
  'system configuration or package-managed paths' 'yes' 'reversible if a backup exists' \
  'show the target file and create a backup before writing'

check '(^|[;&|[:space:]])tee[[:space:]].*/etc/' \
  'HIGH' 'DLR-RISK-006' \
  'writes system configuration under /etc' \
  'system configuration files under /etc' 'yes' 'reversible if a backup exists' \
  'show the target file and create a backup before writing'

check '(^|[;&|[:space:]])sed[[:space:]].*(-i|--in-place).* /etc/' \
  'HIGH' 'DLR-RISK-006' \
  'edits system configuration in place' \
  'system configuration files under /etc' 'yes' 'reversible if a backup exists' \
  'run sed without -i first and back up the file'

check '(^|[;&|[:space:]])(mv|cp|install)[[:space:]].*/(etc|boot|usr|lib|var/lib)/' \
  'HIGH' 'DLR-RISK-006' \
  'copies or moves files into system paths' \
  'system configuration or package-managed paths' 'yes' 'reversible if original files are backed up' \
  'inspect destination and back up existing files'

check '(^|[;&|[:space:]])(apt|apt-get|aptitude)[[:space:]]+(install|remove|purge|full-upgrade|dist-upgrade|autoremove)' \
  'MEDIUM' 'DLR-RISK-007' \
  'mutates package state; verify package names and simulate first' \
  'APT package database and installed packages' 'yes' 'usually reversible, but dependencies and config purges may be hard to restore' \
  'run apt-cache policy and apt -s before changing packages'

check '(^|[;&|[:space:]])dpkg[[:space:]]+-i[[:space:]]' \
  'MEDIUM' 'DLR-RISK-007' \
  'installs a local package outside normal dependency resolution' \
  'dpkg package database and installed files' 'yes' 'usually reversible with dpkg/apt if dependencies are recoverable' \
  'inspect package metadata with dpkg-deb -I first'

check '(^|[;&|[:space:]])systemctl[[:space:]]+(restart|stop|start|enable|disable|mask|unmask|edit)' \
  'MEDIUM' 'DLR-RISK-008' \
  'changes service state or unit configuration' \
  'systemd service state or unit files' 'yes' 'usually reversible if unit state and files are known' \
  'run systemctl status, systemctl cat, and journalctl before changes'

check '(^|[;&|[:space:]])nft[[:space:]].*(add|delete|flush|replace)' \
  'HIGH' 'DLR-RISK-009' \
  'changes firewall rules' \
  'nftables firewall ruleset' 'yes' 'reversible if current ruleset is saved' \
  'run nft list ruleset and save current rules before changes'

check '(^|[;&|[:space:]])ufw[[:space:]]+(enable|disable|allow|deny|delete|reset)' \
  'HIGH' 'DLR-RISK-009' \
  'changes firewall policy' \
  'UFW firewall policy' 'yes' 'reversible if current rules are recorded' \
  'run ufw status verbose before changes'

check '(^|[;&|[:space:]])grub-install([[:space:]]|$)|(^|[;&|[:space:]])update-grub([[:space:]]|$)' \
  'HIGH' 'DLR-RISK-010' \
  'changes bootloader configuration' \
  'bootloader installation or generated GRUB config' 'yes' 'can be difficult to recover without boot media' \
  'inspect /etc/default/grub, mounted boot partitions, and backup config first'

check '(^|[;&|[:space:]])cryptsetup[[:space:]].*(luksFormat|erase|remove)' \
  'HIGH' 'DLR-RISK-011' \
  'changes encrypted block device state' \
  'LUKS container metadata or mappings' 'yes' 'not reversible without header backup' \
  'run cryptsetup luksDump and confirm header backup before destructive operations'

if [ "$findings" -eq 0 ]; then
  printf 'LOW: no known high-risk pattern detected; still verify command context before running.\n'
  check_ids='none'
fi

printf '\nSummary:\n'
printf '  Highest risk: %s\n' "$highest_level"
printf '  Check IDs: %s\n' "$check_ids"
printf '  Mutates system: %s\n' "$mutates_system"
printf '  Approval required: %s\n' "$approval_required"

if [ "$findings" -gt 0 ]; then
  printf '\nRecommended response:\n'
  printf '%s\n' '- Explain the risk and affected paths/devices/services.'
  printf '%s\n' '- Provide read-only inspection or dry-run commands first.'
  printf '%s\n' '- Ask for explicit user approval before running privileged or mutating commands.'
fi
