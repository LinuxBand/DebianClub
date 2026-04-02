---
title: Parrot OS — Debian Derivative
description: A Debian-based rolling release that balances security research tools with a capable everyday desktop, offering Security, Home, and HTB editions.
---

# Parrot OS

Parrot OS (also known as ParrotSec) is a Debian-based rolling release distribution developed by the Italian Frozenbox team. Unlike purely security-focused distributions, Parrot OS is designed to be both a capable security research platform and a comfortable daily-use desktop. It provides several distinct editions to serve different workflows.

## Basic Information

| Attribute | Details |
|---|---|
| Based on | Debian testing (rolling) |
| Release cycle | Rolling release |
| Default desktop | MATE (Security/Home), KDE Plasma (optional) |
| Target users | Security researchers, developers, privacy-conscious desktop users |
| Website | [https://parrotsec.org](https://parrotsec.org) |

## Key Features

- **Multiple purpose-built editions**: Security (full pentesting toolkit), Home (lightweight daily desktop), HTB (pre-configured for Hack The Box), and Cloud/Docker editions for server and container use.
- **Lighter than Kali**: The MATE desktop combined with Parrot's kernel tweaks keeps RAM usage lower than Kali Linux. The system runs comfortably on 2 GB of RAM.
- **Built-in privacy tools**: AnonSurf (one-click Tor routing for all traffic), Firejail application sandboxing, and OnionShare are included, giving everyday users strong privacy controls without extra configuration.
- **Developer-friendly Home edition**: The Home edition ships without heavy security tools but includes popular programming runtimes and development utilities, making it a viable daily driver for programmers.
- **Rolling updates**: Based on Debian testing, software stays current without periodic reinstalls.

## Relationship to Debian

Parrot OS is based on Debian testing and sources most packages directly from that branch, supplemented by the Parrot repository (containing security tools, proprietary software, and version-bumped packages). The Parrot team maintains security-hardened kernel patches and their own tooling repository. Because it tracks Debian testing rather than stable, software versions are more current but system stability is slightly lower than stable-based distributions.

## Getting Started

```bash
# Download the appropriate edition ISO from: https://parrotsec.org/download/

# After installation, update using the Parrot upgrade command
sudo parrot-upgrade
# Equivalent to:
sudo apt update && sudo apt full-upgrade -y

# Enable AnonSurf to route all traffic through Tor
sudo anonsurf start
sudo anonsurf status
sudo anonsurf stop

# Install additional security tools as needed
sudo apt install metasploit-framework burpsuite -y
```

## Who Is It For?

- Security practitioners who want an environment that doubles as a daily-use desktop
- Students on Hack The Box, TryHackMe, or similar platforms (the HTB edition is pre-configured)
- Privacy-aware users who want one-click Tor routing without a live-only system
- Developers who want a modern rolling-release Debian base with built-in privacy tooling

::: tip Parrot OS vs. Kali Linux
Kali Linux prioritizes completeness of its security tool library and is tightly focused on professional pentesting. Parrot OS is a better fit if you want a general-purpose workstation that also handles security work, especially on lower-spec hardware.
:::

## Related Links

- Website: [https://parrotsec.org](https://parrotsec.org)
- Download: [https://parrotsec.org/download/](https://parrotsec.org/download/)
- Documentation: [https://parrotsec.org/docs/](https://parrotsec.org/docs/)
- GitLab (source): [https://gitlab.com/parrotsec](https://gitlab.com/parrotsec)

---

## Next Steps

Return to the [Debian Derivatives overview](/en/variants/) to explore other Debian-based distributions.
