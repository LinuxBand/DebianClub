---
title: Release End-of-Life (EOL)
description: Learn about the lifecycle and end-of-life dates for each Debian release.
---

# Debian Release End-of-Life (EOL)

Understanding the lifecycle of the Debian version you are using is crucial to ensure your system continues to receive security updates and technical support.

## Debian Release Models

Debian primarily has three release branches:

-   **Stable**: This is the official release and is recommended for production environments. It has undergone extensive testing and offers the highest stability and security.
-   **Testing**: This branch contains packages that are slated for the next stable release. It is relatively stable but not as reliable as the `stable` version. It's suitable for developers and advanced users who want newer software.
-   **Unstable (codename Sid)**: This is the active development branch for Debian packages. It contains the latest software but may have stability issues and is not recommended for mission-critical systems.

## Long-Term Support (LTS)

After its official release, each Debian stable version receives about 3 years of security support from the Debian Security Team.

Following this period, an independent team of volunteers and companies takes over to provide additional Long-Term Support (LTS), typically for another 2 years. This means each Debian stable release gets a total of approximately 5 years of security updates.

## EOL Quick-Reference Table

The table below lists the release dates and End-of-Life (EOL) dates for recent Debian versions.

| Codename                 | Release Date | End of Regular Support | End of Long-Term Support (LTS) |
| :----------------------- | :----------- | :--------------------- | :----------------------------- |
| **Debian 12 (Bookworm)** | 2023-06-10   | ~ June 2026            | ~ June 2028                    |
| **Debian 11 (Bullseye)** | 2021-08-14   | July 2024              | 2026-06-30                     |
| **Debian 10 (Buster)**   | 2019-07-06   | 2022-09-10             | 2024-06-30                     |
| **Debian 9 (Stretch)**   | 2017-06-17   | 2020-07-06             | 2022-06-30                     |
| **Debian 8 (Jessie)**    | 2015-04-25   | 2018-06-17             | 2020-06-30                     |

::: tip
Dates marked with `~` are estimates and may be subject to minor changes. Please follow official Debian announcements for the most accurate information.
:::

It is highly recommended that you plan and upgrade to a newer stable version before your current version's LTS period ends to ensure your system remains secure. 