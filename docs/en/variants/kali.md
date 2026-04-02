---
title: Kali Linux — Debian Derivative
description: The industry-standard penetration testing and cybersecurity distribution, shipping 600+ security tools out of the box.
---

# Kali Linux

Kali Linux is the most recognized security-focused Linux distribution, released by Offensive Security in 2013 as the successor to BackTrack Linux. Based on Debian testing and following a rolling release model, it ships with over 600 pre-installed tools for penetration testing, digital forensics, and reverse engineering.

## Basic Information

| Attribute | Details |
|---|---|
| Based on | Debian testing (rolling) |
| Release cycle | Rolling release |
| Default desktop | Xfce (since 2019); GNOME, KDE available |
| Target users | Security professionals, pentesters, CTF players |
| Website | [https://www.kali.org](https://www.kali.org) |

## Key Features

- **600+ security tools**: Nmap, Metasploit, Burp Suite, Wireshark, Aircrack-ng, John the Ripper, and hundreds more — all grouped by category and ready to use immediately after installation.
- **Rolling release model**: Tracks Debian testing, so tools are continuously updated without needing a full reinstall.
- **Multi-platform support**: Available for x86_64, ARM, WSL (Windows Subsystem for Linux), Docker, and dedicated Raspberry Pi images.
- **Live mode**: Boot directly from a USB drive without installing to disk, ideal for temporary assessments and fieldwork.
- **Kali Undercover mode**: One-click transformation of the desktop to resemble Windows 10, useful when working in public spaces.

## Relationship to Debian

Kali Linux is based on Debian testing, regularly syncing packages from that branch. Offensive Security adds custom kernel patches (such as wireless card injection support) and maintains a separate repository of security tools not found in Debian. Kali's package management is APT-compatible with Debian, but **mixing Debian or Ubuntu repositories into a Kali system is strongly discouraged** as it can break tool dependencies and system stability.

## Getting Started

```bash
# Download the ISO from: https://www.kali.org/get-kali/
# Recommended: the Installer edition for a full install, or Live for USB boot

# After installation, update the system
sudo apt update && sudo apt full-upgrade -y

# Install the complete tool suite
sudo apt install kali-linux-everything -y

# Install only the top 10 most-used tools
sudo apt install kali-tools-top10 -y

# Switch to GNOME desktop (optional)
sudo apt install kali-desktop-gnome -y
```

## Who Is It For?

- Professional penetration testers conducting authorized security assessments
- CTF (Capture The Flag) competitors and security challenge participants
- Students studying cybersecurity courses and certifications (OSCP, CEH, etc.)
- Digital forensics analysts and malware researchers

::: warning Legal Notice
The tools included in Kali Linux must only be used against systems you own or have explicit written permission to test. Unauthorized use of penetration testing tools is illegal in most jurisdictions.
:::

## Related Links

- Website: [https://www.kali.org](https://www.kali.org)
- Download: [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)
- Documentation: [https://www.kali.org/docs/](https://www.kali.org/docs/)
- Tool index: [https://www.kali.org/tools/](https://www.kali.org/tools/)
- Offensive Security training: [https://www.offsec.com](https://www.offsec.com)

---

## Next Steps

Return to the [Debian Derivatives overview](/en/variants/) to explore other Debian-based distributions.
