---
title: Tails — Debian Derivative
description: An amnesic live OS built for privacy and anonymity — routes all traffic through Tor and leaves no trace after shutdown.
---

# Tails

Tails — short for **The Amnesic Incognito Live System** — is a live operating system built on Debian stable, designed with one primary goal: protect your privacy and anonymity. It is meant to be booted from a USB drive, runs entirely in RAM, and leaves no trace on the host computer when you shut it down. All network traffic is forced through the Tor anonymity network.

## Basic Information

| Attribute | Details |
|---|---|
| Based on | Debian stable |
| Release cycle | Security updates approximately every 6–8 weeks |
| Default desktop | GNOME (customized, stripped-down) |
| Target users | Journalists, activists, privacy-conscious users, high-risk individuals |
| Website | [https://tails.boum.org](https://tails.boum.org) |

## Key Features

- **Amnesic by design**: The system runs in RAM. When you shut down, all temporary files, browsing history, and metadata are purged from memory — nothing is written to the internal hard drive.
- **Mandatory Tor routing**: Every network connection is routed through Tor. Any application attempting to connect outside Tor is automatically blocked, preventing accidental IP leaks.
- **Privacy tool suite**: Tor Browser, Thunderbird with OpenPGP email encryption, OnionShare (anonymous file sharing), KeePassXC (password manager), and more are included out of the box.
- **Encrypted persistent storage**: An optional encrypted partition on the USB drive can store documents, bookmarks, and cryptographic keys across sessions, without compromising the amnesic nature of the system.
- **Verified downloads**: Tails provides OpenPGP signatures and a browser extension to verify the integrity of downloaded images before use.

## Relationship to Debian

Tails is built on Debian stable and uses its package management and security update infrastructure. On top of Debian, the Tails team applies extensive hardening: disabling unnecessary services, tightening AppArmor profiles, tweaking kernel parameters to minimize information leakage, and integrating the full Tor Project software stack. The Tails team ships security updates roughly every six to eight weeks, closely following Debian's security advisories.

## Getting Started

```bash
# Tails must be run from a USB drive (minimum 8 GB)
# Official installation steps:

# Step 1 — Download the image:
# https://tails.boum.org/install/

# Step 2 — Write to USB:
# First install: use balenaEtcher (https://www.balena.io/etcher/)
# Subsequent installs: use the Tails Installer from within a running Tails session
# (cloning preserves the persistent storage partition)

# Step 3 — Verify the download (strongly recommended):
# The Tails website provides a browser extension and OpenPGP signatures
# to confirm the image has not been tampered with.

# Note: Running Tails inside a virtual machine significantly weakens its
# security guarantees. Physical USB boot is the recommended method.
```

## Who Is It For?

- Journalists and lawyers who need to communicate securely and protect sources
- Human rights activists working in high-risk environments
- Everyday users who want strong privacy on shared or untrusted computers
- Anyone who needs to bypass censorship or access .onion services

::: warning Limitations
Tails protects your privacy during a session, but it cannot defend against hardware-level surveillance (e.g., BIOS implants, physical keyloggers), or mistakes made by the user (such as logging into personal accounts while using Tails).
:::

## Related Links

- Website: [https://tails.boum.org](https://tails.boum.org)
- Installation guide: [https://tails.boum.org/install/](https://tails.boum.org/install/)
- Documentation: [https://tails.boum.org/doc/](https://tails.boum.org/doc/)
- Tor Project: [https://www.torproject.org](https://www.torproject.org)

---

## Next Steps

Return to the [Debian Derivatives overview](/en/variants/) to explore other Debian-based distributions.
