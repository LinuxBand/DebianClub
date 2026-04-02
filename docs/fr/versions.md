---
title: Comparaison des versions
description: Guide comparatif détaillé et aide au choix entre Debian 11, 12 et 13
---

# Guide comparatif des versions Debian

::: info À propos de cette page
Cette page fournit une comparaison détaillée des principales différences entre Debian 13 (Trixie), Debian 12 (Bookworm) et Debian 11 (Bullseye) pour vous aider à choisir la version la mieux adaptée à vos besoins.
:::

## 📋 Vue d'ensemble des versions

| Informations | Debian 13 (Trixie) | Debian 12 (Bookworm) | Debian 11 (Bullseye) |
|---|---|---|---|
| **Statut de publication** | Stable actuel | Ancien stable | LTS |
| **Date de publication** | Août 2025 | Juin 2023 | Août 2021 |
| **Dernière version ponctuelle** | 13.4 (2026-03-08) | 12.13 (2026-01-10) | — |
| **Fin de support** | ~2030 (LTS inclus) | ~Juin 2028 | Juin 2026 |
| **Noyau Linux** | 6.12 | 6.1 LTS | 5.10 LTS |
| **Version GNOME** | 48 | 43 | 3.38 |

## ⚙️ Composants principaux et outils de développement

| Logiciel/Outil | Trixie (Debian 13) | Bookworm (Debian 12) | Bullseye (Debian 11) |
|---|---|---|---|
| **GCC** | 15.x | 12.2 | 10.2 |
| **LLVM/Clang** | 16+ | 14.0 | 11.0 |
| **Python** | 3.12 | 3.11 | 3.9 |
| **Node.js** | 20.x | 18.13 | 12.22 |
| **Go** | 1.21+ | 1.19 | 1.15 |
| **Rust** | 1.70+ | 1.63 | 1.48 |
| **PHP** | 8.3 | 8.2 | 7.4 |

## 🎯 Guide de sélection des versions

### Par cas d'utilisation

- **🖥️ Utilisateur de bureau** :
  - **Recommandé** : Choisissez **Debian 13 (Trixie)**. C'est la version stable actuelle avec les derniers environnements de bureau GNOME 48 / KDE Plasma 6.3.
  - **Choix conservateur** : **Debian 12 (Bookworm)** en tant qu'ancien stable est toujours maintenu, convenant aux utilisateurs qui ne souhaitent pas migrer immédiatement.

- **💻 Développeur** :
  - **Développement d'applications modernes** : Choisissez **Debian 13 (Trixie)**. Il inclut GCC 14.2, Python 3.13, PHP 8.3 et les dernières chaînes d'outils.
  - **Compatibilité en priorité** : **Debian 12 (Bookworm)** reçoit toujours des mises à jour de sécurité, adapté aux projets nécessitant un environnement ancien stable.

- **🖧 Administrateur de serveur** :
  - **Nouveaux déploiements** : Nous recommandons fortement **Debian 13 (Trixie)**. En tant que version stable actuelle, il bénéficie des derniers correctifs de sécurité et d'un cycle de support complet.
  - **Maintenance des anciens systèmes** : **Debian 12 (Bookworm)** en tant qu'ancien stable est toujours maintenu (jusqu'à ~2028). Le support LTS de **Debian 11 (Bullseye)** se termine en juin 2026 — planifiez votre mise à niveau rapidement.

### Chemin de mise à niveau

- **Depuis Debian 11** : Mettez d'abord à niveau vers **Debian 12**, puis vers **Debian 13**. Les mises à niveau entre versions doivent se faire étape par étape.
- **Depuis Debian 12** : Il est recommandé de mettre à niveau vers **Debian 13**. Avec plusieurs versions ponctuelles (13.4), il est bien mature.

---

**Vous souhaitez vérifier une version logicielle spécifique ?** [Visiter packages.debian.org](https://packages.debian.org/) | [Voir le guide d'installation →](/fr/basics/installation)
