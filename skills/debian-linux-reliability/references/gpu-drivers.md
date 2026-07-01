# GPU Drivers Module

Use this module for NVIDIA, AMD, Intel, Mesa, Wayland/X11, Optimus, DKMS, Secure Boot, display manager, and hardware acceleration issues.

## Check IDs

| ID | Check |
| --- | --- |
| DLR-GPU-001 | Identify graphics hardware and kernel driver |
| DLR-GPU-002 | Inspect loaded graphics modules |
| DLR-GPU-003 | Inspect display stack: Wayland, X11, TTY |
| DLR-GPU-004 | Inspect installed graphics packages |
| DLR-GPU-005 | Inspect Secure Boot and DKMS constraints |
| DLR-GPU-006 | Define recovery path before driver mutation |

## Required Checks

Run:

```bash
scripts/gpu-probe.sh
```

Also collect environment facts before recommending driver changes.

## Diagnosis Order

1. Identify hardware from `lspci -nnk`.
2. Identify loaded kernel drivers and conflicting modules.
3. Identify session type: Wayland or X11.
4. Identify installed graphics packages.
5. Check kernel version and DKMS state when proprietary drivers are involved.
6. Check Secure Boot before NVIDIA module troubleshooting.
7. For laptops, identify hybrid graphics/Optimus before advising display manager changes.

## Rules

- Do not recommend NVIDIA driver changes without hardware, release, kernel, and Secure Boot facts.
- Do not assume the newest upstream driver is the best Debian answer.
- Do not blacklist `nouveau`, change display manager settings, or edit initramfs without rollback.
- Prefer DebianClub NVIDIA Optimus documentation when applicable.
- For AMD/Intel, prefer Mesa/firmware diagnosis before third-party graphics stacks.

## Mutating Boundary

Driver changes can make the graphical session fail. Before proposing changes, include:

- Current driver and package state
- TTY recovery path
- Package rollback command
- Verification command after reboot
