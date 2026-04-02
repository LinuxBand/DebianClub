---
title: Linux Mint / LMDE — Debian Derivative
description: The beginner-friendly desktop Linux distribution; LMDE edition is based directly on Debian stable.
---

# Linux Mint / LMDE

Linux Mint is one of the most approachable Linux desktop distributions, built around the motto "from freedom came elegance." Maintained by a community team since 2006, its main edition is based on Ubuntu, while **LMDE (Linux Mint Debian Edition)** is based directly on Debian stable — offering the full Mint experience without the Ubuntu layer in between.

## Basic Information

| Attribute | Details |
|---|---|
| Based on | Ubuntu (main edition) / Debian stable (LMDE) |
| Release cycle | Follows Ubuntu LTS (main); follows Debian stable (LMDE) |
| Default desktop | Cinnamon (flagship), MATE, Xfce |
| Target users | Desktop beginners, Windows migrants |
| Website | [https://linuxmint.com](https://linuxmint.com) |

## Key Features

- **Zero friction out of the box**: Multimedia codecs, font rendering tweaks, and common applications are pre-installed. You can play videos and music immediately after installation without hunting down codecs.
- **Cinnamon desktop**: Linux Mint's own Cinnamon environment closely mirrors the traditional Windows layout — taskbar, Start menu, system tray — making the transition from Windows virtually seamless.
- **Mint Tools**: Timeshift (system snapshot and restore), Update Manager (with risk-level indicators), Driver Manager, and other utilities that simplify day-to-day system maintenance.
- **LMDE's value proposition**: LMDE removes the Ubuntu dependency layer entirely, pulling packages directly from Debian stable. This appeals to users who prefer fewer abstraction layers and closer alignment with Debian upstream.
- **Conservative update policy**: Update Manager defaults to applying only security patches and low-risk updates, keeping the system stable and predictable.

## Relationship to Debian

- **Main edition**: Built on Ubuntu LTS (which itself derives from Debian). Software comes from Ubuntu's repositories plus Linux Mint's own overlay repository, making it two layers away from Debian.
- **LMDE**: Directly based on Debian stable (LMDE 6 is based on Debian 12 Bookworm). Packages come from official Debian repositories plus the Mint overlay, with only one layer between you and Debian.

## Getting Started

```bash
# Download the ISO from the official site, then write it to a USB drive
# Main edition: https://linuxmint.com/download.php
# LMDE:         https://linuxmint.com/download_lmde.php

# After installation, update the system
sudo apt update && sudo apt upgrade -y

# Install Timeshift for system backups (usually pre-installed)
sudo apt install timeshift -y

# Set up Fcitx5 for CJK input (if needed)
sudo apt install fcitx5 fcitx5-chinese-addons -y
```

## Who Is It For?

- Users switching from Windows who want a familiar, polished desktop experience
- Anyone who values stability and doesn't want to tinker with the system
- Home and office users who need reliable everyday computing without a steep learning curve
- Intermediate users who prefer a pure Debian base with a friendly interface (choose LMDE)

## Related Links

- Website: [https://linuxmint.com](https://linuxmint.com)
- Download (main): [https://linuxmint.com/download.php](https://linuxmint.com/download.php)
- Download (LMDE): [https://linuxmint.com/download_lmde.php](https://linuxmint.com/download_lmde.php)
- User guide: [https://linuxmint.com/documentation.php](https://linuxmint.com/documentation.php)
- Community forums: [https://forums.linuxmint.com](https://forums.linuxmint.com)

---

## Next Steps

Return to the [Debian Derivatives overview](/en/variants/) to explore other Debian-based distributions.
