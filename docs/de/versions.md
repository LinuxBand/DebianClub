---
title: Versions­vergleich
description: Detaillierter Vergleich und Auswahlhilfe für Debian 11, 12 und 13
---

# Debian-Versions­vergleichs­leitfaden

::: info Über diese Seite
Diese Seite bietet einen detaillierten Vergleich der wichtigsten Unterschiede zwischen Debian 13 (Trixie), Debian 12 (Bookworm) und Debian 11 (Bullseye), damit Sie die am besten geeignete Version auswählen können.
:::

## 📋 Versions­übersicht

| Versions­info | Debian 13 (Trixie) | Debian 12 (Bookworm) | Debian 11 (Bullseye) |
|---|---|---|---|
| **Release-Status** | Aktuelles Stable | Old Stable | LTS |
| **Veröffentlichungs­datum** | August 2025 | Juni 2023 | August 2021 |
| **Neuestes Point-Release** | 13.4 (2026-03-08) | 12.13 (2026-01-10) | — |
| **Support-Ende** | ~2030 (inkl. LTS) | ~Juni 2028 | Juni 2026 |
| **Linux-Kernel** | 6.12 | 6.1 LTS | 5.10 LTS |
| **GNOME-Version** | 48 | 43 | 3.38 |

## ⚙️ Kernkomponenten & Entwickler­werkzeuge

| Software/Werkzeug | Trixie (Debian 13) | Bookworm (Debian 12) | Bullseye (Debian 11) |
|---|---|---|---|
| **GCC** | 15.x | 12.2 | 10.2 |
| **LLVM/Clang** | 16+ | 14.0 | 11.0 |
| **Python** | 3.12 | 3.11 | 3.9 |
| **Node.js** | 20.x | 18.13 | 12.22 |
| **Go** | 1.21+ | 1.19 | 1.15 |
| **Rust** | 1.70+ | 1.63 | 1.48 |
| **PHP** | 8.3 | 8.2 | 7.4 |

## 🎯 Versions­auswahlhilfe

### Nach Anwendungs­fall

- **🖥️ Desktop-Benutzer**:
  - **Empfohlen**: Wählen Sie **Debian 13 (Trixie)**. Es ist das aktuelle Stable-Release mit den neuesten Desktop­umgebungen GNOME 48 / KDE Plasma 6.3.
  - **Konservative Wahl**: **Debian 12 (Bookworm)** wird als Oldstable weiterhin gepflegt und ist für Benutzer geeignet, die nicht sofort migrieren möchten.

- **💻 Entwickler**:
  - **Moderne Anwendungs­entwicklung**: Wählen Sie **Debian 13 (Trixie)**. Es enthält GCC 14.2, Python 3.13, PHP 8.3 und die neuesten Toolchains.
  - **Kompatibilität an erster Stelle**: **Debian 12 (Bookworm)** erhält weiterhin Sicherheits­updates und ist für Projekte geeignet, die eine Oldstable-Umgebung benötigen.

- **🖧 Server-Administrator**:
  - **Neue Deployments**: Wir empfehlen dringend **Debian 13 (Trixie)**. Als aktuelles Stable-Release verfügt es über die neuesten Sicherheits­patches und einen vollständigen Support-Zyklus.
  - **Wartung alter Systeme**: **Debian 12 (Bookworm)** wird als Oldstable weiterhin gepflegt (bis ~2028). Der LTS-Support für **Debian 11 (Bullseye)** endet im Juni 2026 — planen Sie Ihr Upgrade rechtzeitig.

### Upgrade-Pfad

- **Von Debian 11**: Zuerst auf **Debian 12** upgraden, dann auf **Debian 13**. Versions­übergreifende Upgrades sollten schrittweise durchgeführt werden.
- **Von Debian 12**: Empfohlen wird das Upgrade auf **Debian 13**. Mit mehreren Point-Releases (13.4) ist es gut ausgereift.

---

**Möchten Sie eine bestimmte Software­version prüfen?** [packages.debian.org besuchen](https://packages.debian.org/) | [Installations­anleitung ansehen →](/de/basics/installation)
