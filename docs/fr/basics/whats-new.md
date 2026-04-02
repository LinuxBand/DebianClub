---
title: Quoi de neuf dans Debian 13
description: Nouvelles fonctionnalités, améliorations et changements importants dans Debian 13 (Trixie)
---

# Quoi de neuf dans Debian 13 (Trixie)

Debian 13 sous le nom de code "Trixie" a été officiellement publiée en août 2025 et est la version stable actuelle. Depuis mars 2026, la dernière version de point est **13.4**.

## Principales nouvelles fonctionnalités

### Mises à jour des paquets logiciels

| Logiciel | Version Debian 13 | Version Debian 12 | Améliorations clés |
|----------|------------------|------------------|---------------------|
| **Noyau Linux** | 6.12 | 6.1 | Meilleur support matériel, optimisation des performances |
| **Python** | 3.13 | 3.11 | Exécution plus rapide, nouvelles fonctionnalités du langage |
| **GCC** | 14.2 | 12.2 | Dernière technologie de compilation, support C++23 |
| **GNOME** | 43 | 43 | Interface moderne, expérience utilisateur améliorée |
| **KDE Plasma** | 5.27 | 5.27 | Fonctionnalités améliorées, stabilité accrue |
| **Firefox ESR** | 115+ | 102 | Protection de la vie privée et performances améliorées |

### Support d'architectures

- **RISC-V 64 bits** (riscv64) — Premier support officiel
- **amd64**, **arm64**, **armhf**, **ppc64el**, **s390x** continuent d'être supportés

### Changements dans les dépôts

```bash
# Nouvelle structure de composants
main contrib non-free-firmware

# Remplace l'ancien
main contrib non-free
```

## Calendrier des versions

| Version | Date | Statut |
|---------|------|--------|
| Debian 13.0 | 2025-08-09 | Version initiale |
| Debian 13.1 | 2025-10-11 | Version de point |
| Debian 13.2 | 2025-11-08 | Version de point |
| Debian 13.3 | 2026-01-10 | Version de point |
| Debian 13.4 | 2026-03-08 | Version de point actuelle |

## Liens utiles

- Notes de publication : [https://www.debian.org/releases/trixie/releasenotes](https://www.debian.org/releases/trixie/releasenotes)
- Téléchargement : [/fr/basics/download](/fr/basics/download)
