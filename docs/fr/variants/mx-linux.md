---
title: MX Linux — Dérivé Debian
description: Un favori perenne de DistroWatch combinant la fiabilité de Debian stable avec MX Tools et une base antiX.
---

# MX Linux

MX Linux est une distribution de bureau collaborative développée par les communautés antiX et ex-MEPIS. Construite sur Debian stable, elle superpose la suite MX Tools sur une base antiX pour offrir un système stable, capable et accueillant.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian stable (avec composants de base antiX) |
| Cycle de publication | Suit Debian stable ; versions majeures environ tous les 2 ans |
| Bureau par défaut | Xfce (phare), KDE Plasma, Fluxbox |
| Utilisateurs cibles | Utilisateurs intermédiaires, propriétaires de vieux matériel |
| Site web | [https://mxlinux.org](https://mxlinux.org) |

## Fonctionnalités clés

- **Suite MX Tools** : MX Package Installer, MX Snapshot (créer un ISO bootable du système en cours), MX Boot Options, et plus.
- **Support dual init** : Offre systemd et sysvinit au moment de l'installation.
- **Modérément léger** : L'édition Xfce tourne généralement à 500–700 Mo de RAM.
- **Environnement Live puissant** : Mode live avec stockage persistant, MX Snapshot peut repackager la session.

## Pour commencer

```bash
# Télécharger depuis : https://mxlinux.org/mx-iso-torrents/

# Après installation, mettre à jour
sudo apt update && sudo apt upgrade -y

# Ouvrir MX Package Installer (graphique)
mx-packageinstaller

# Créer un instantané système
sudo mx-snapshot
```

## Liens utiles

- Site web : [https://mxlinux.org](https://mxlinux.org)
- Forums communautaires : [https://forum.mxlinux.org](https://forum.mxlinux.org)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
