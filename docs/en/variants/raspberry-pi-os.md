---
title: Raspberry Pi OS — Debian Derivative
description: The official operating system for Raspberry Pi hardware, based on Debian and optimized for ARM processors.
---

# Raspberry Pi OS

Raspberry Pi OS (formerly Raspbian) is the operating system developed and recommended by the Raspberry Pi Foundation. Based on Debian and deeply optimized for the ARM processors found in Raspberry Pi hardware, it is the default choice for Pi-based projects — from education and coding to home automation and media centers.

## Basic Information

| Attribute | Details |
|---|---|
| Based on | Debian (tracks Debian release cadence) |
| Release cycle | Follows Debian stable; periodic updated images released |
| Default desktop | LXDE (customized as the Pixel desktop); Lite edition is headless |
| Target users | Raspberry Pi owners, students, educators, embedded developers |
| Website | [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/) |

## Key Features

- **Deep ARM optimization**: Recompiled for ARM Cortex-A processors, with GPU hardware acceleration and VideoCore driver support built in to fully utilize Pi hardware capabilities.
- **Multiple editions**: Desktop (with Pixel GUI), Lite (minimal, headless), and Full (Desktop plus recommended software) editions serve different needs — from a fully-featured desktop to a lean server image.
- **Raspberry Pi Imager**: The official flashing tool lets you browse, download, and write OS images to a microSD card in one step. It also supports pre-configuring Wi-Fi credentials, SSH, hostname, and user accounts before first boot.
- **Education-focused software**: Pre-installed Scratch 3, Thonny Python IDE, and Wolfram Mathematica (free for non-commercial use) make it an ideal platform for STEM education.
- **GPIO library support**: Built-in RPi.GPIO and pigpio libraries make it easy to interact with the 40-pin GPIO header from Python or other languages.

## Relationship to Debian

Raspberry Pi OS closely tracks Debian, with the current release based on Debian 12 Bookworm. It uses the standard Debian APT package management system, so the vast majority of Debian packages install without modification. On top of Debian, the Raspberry Pi Foundation applies ARM-specific kernel patches, proprietary VideoCore GPU firmware, dedicated hardware drivers, and the Pixel desktop customizations.

## Getting Started

```bash
# Recommended: use Raspberry Pi Imager (GUI tool)
# Download at: https://www.raspberrypi.com/software/

# Command-line alternative (Linux/macOS):
wget https://downloads.raspberrypi.com/raspios_lite_arm64/images/latest/raspios_lite_arm64.img.xz
xz -d raspios_lite_arm64.img.xz
sudo dd if=raspios_lite_arm64.img of=/dev/sdX bs=4M status=progress
sync

# After first boot, update the system
sudo apt update && sudo apt full-upgrade -y

# Configure interfaces (camera, SPI, I2C, SSH, etc.)
sudo raspi-config
```

## Who Is It For?

- Anyone who owns a Raspberry Pi — from the original Model B to the Pi 5
- Students and teachers looking for an affordable, hands-on Linux and programming environment
- Makers and hobbyists building IoT, robotics, or home automation projects
- Users who want a low-power, low-cost Linux server or media center

## Related Links

- Website: [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
- Documentation: [https://www.raspberrypi.com/documentation/](https://www.raspberrypi.com/documentation/)
- GPIO reference: [https://www.raspberrypi.com/documentation/computers/raspberry-pi.html](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)
- Community forums: [https://forums.raspberrypi.com](https://forums.raspberrypi.com)

---

## Next Steps

Return to the [Debian Derivatives overview](/en/variants/) to explore other Debian-based distributions.
