---
layout: page
title: Debian Release Support Cycle (EOL)
description: "Learn about the End-of-Life (EOL) information for each Debian release, including end-of-support dates for stable, old-stable, and Long Term Support (LTS) versions."
---

# Debian Release Support Cycle (End-of-Life)

Understanding the lifecycle of each Debian release is crucial for planning your system upgrades and maintenance. When a release reaches its EOL (End-of-Life) date, it will no longer receive any security updates from the official security team.

## Debian Support Policy

- **Stable Release**:
  - Each Debian stable release receives regular support from the official security team for **approximately 3 years** after its release.
  - After this period, it transitions to the **Long Term Support (LTS)** phase.

- **Long Term Support (LTS)**:
  - LTS is supported by a separate team of volunteers and sponsors, independent of the Debian Security team.
  - LTS provides security updates for the release for an **additional period of about 2 years**.
  - Therefore, a Debian release receives a total of **approximately 5 years** of support from its initial release until the end of its LTS period.

## Release Support Status

The table below summarizes the lifecycle status of recent Debian releases.

| Codename | Release Date | End of Regular Support (EOL) | End of Long Term Support (LTS EOL) | Current Status |
| :------- | :----------- | :--------------------------- | :------------------------------- | :------------- |
| **Debian 13 (Trixie)** | ~ 2025       | ~ 2028                       | ~ 2030                           | `Testing` |
| **Debian 12 (Bookworm)** | 2023-06-10   | ~ 2026                       | ~ 2028                           | **`Stable`** |
| **Debian 11 (Bullseye)** | 2021-08-14   | Est. 2024-08-15              | 2026-06-30                       | **`Oldstable` (in LTS)** |
| **Debian 10 (Buster)** | 2019-07-06   | 2022-09-10                   | 2024-06-30                       | `LTS` (Ended) |
| **Debian 9 (Stretch)** | 2017-06-17   | 2020-07-06                   | 2022-06-30                       | `EOL` (End of Life) |

*Data source: [Debian Wiki Releases](https://wiki.debian.org/DebianReleases)*

## What should I do?

- **If you are using Debian 11 (Bullseye)**:
  - Your system is currently in the LTS support phase. It is recommended to plan an upgrade to Debian 12 (Bookworm) in the near future to continue receiving the most comprehensive support.

- **If you are using Debian 10 (Buster) or an earlier version**:
  - **Your system is no longer receiving any security updates and is at serious security risk!** Please plan to upgrade or migrate to a supported stable version (Debian 12) immediately.

- **For new installations**:
  - It is always recommended to install the current **stable** release, which is Debian 12 (Bookworm). 