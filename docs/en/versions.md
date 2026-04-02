---
title: Version Comparison
description: Detailed comparison and selection guide for Debian 11, 12, and 13
---

# Debian Version Comparison Guide

::: info About this page
This page provides a detailed comparison of the main differences between Debian 13 (Trixie), Debian 12 (Bookworm), and Debian 11 (Bullseye) to help you choose the most suitable version.
:::

## 📋 Version Overview

| Version Info | Debian 13 (Trixie) | Debian 12 (Bookworm) | Debian 11 (Bullseye) |
|---|---|---|---|
| **Release Status** | Current Stable | Old Stable | LTS |
| **Release Date** | August 2025 | June 2023 | August 2021 |
| **Latest Point Release** | 13.4 (2026-03-08) | 12.13 (2026-01-10) | — |
| **End of Support** | ~2030 (incl. LTS) | ~June 2028 | June 2026 |
| **Linux Kernel** | 6.12 | 6.1 LTS | 5.10 LTS |
| **GNOME Version**| 48 | 43 | 3.38 |

## ⚙️ Core Components & Dev Tools

| Software/Tool | Trixie (Debian 13) | Bookworm (Debian 12) | Bullseye (Debian 11) |
|---|---|---|---|
| **GCC** | 14.2 | 12.2 | 10.2 |
| **LLVM/Clang** | 16+ | 14.0 | 11.0 |
| **Python** | 3.13 | 3.11 | 3.9 |
| **Node.js** | 20.x | 18.13 | 12.22 |
| **Go** | 1.21+ | 1.19 | 1.15 |
| **Rust** | 1.70+ | 1.63 | 1.48 |
| **PHP** | 8.3 | 8.2 | 7.4 |

## 🎯 Version Selection Guide

### By Use Case

- **🖥️ Desktop User**:
  - **Recommended**: Choose **Debian 13 (Trixie)**. It is the current stable release with the latest GNOME 48 / KDE Plasma 6.3 desktop environments.
  - **Conservative Choice**: **Debian 12 (Bookworm)** as oldstable is still maintained, suitable for users who prefer not to migrate immediately.

- **💻 Developer**:
  - **Modern App Development**: Choose **Debian 13 (Trixie)**. It includes GCC 14.2, Python 3.13, PHP 8.3 and the latest toolchains.
  - **Compatibility First**: **Debian 12 (Bookworm)** is still receiving security updates, suitable for projects requiring an oldstable environment.

- **🖧 Server Administrator**:
  - **New Deployments**: Highly recommend **Debian 13 (Trixie)**. As the current stable release, it has the latest security patches and a full support cycle.
  - **Maintaining Old Systems**: **Debian 12 (Bookworm)** as oldstable is still maintained (until ~2028). **Debian 11 (Bullseye)** LTS support ends June 2026 — plan your upgrade soon.

### Upgrade Path

- **From Debian 11**: Upgrade to **Debian 12** first, then to **Debian 13**. Cross-version upgrades should be done step by step.
- **From Debian 12**: Recommended to upgrade to **Debian 13**. With multiple point releases (13.4), it is well-matured.

---

**Want to check a specific software version?** [Visit packages.debian.org](https://packages.debian.org/) | [View Installation Guide →](/en/basics/installation) 