---
title: Raspberry Pi OS — Dérivé Debian
description: Le système d'exploitation officiel pour le matériel Raspberry Pi, basé sur Debian et optimisé pour les processeurs ARM.
---

# Raspberry Pi OS

Raspberry Pi OS (anciennement Raspbian) est le système d'exploitation développé et recommandé par la Raspberry Pi Foundation. Basé sur Debian et profondément optimisé pour les processeurs ARM des Raspberry Pi, c'est le choix par défaut pour les projets basés sur Pi.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian (suit le cadence de publication Debian) |
| Cycle de publication | Suit Debian stable ; images mises à jour périodiquement |
| Bureau par défaut | LXDE (personnalisé en bureau Pixel) ; édition Lite sans bureau |
| Utilisateurs cibles | Propriétaires de Raspberry Pi, étudiants, développeurs embarqués |
| Site web | [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/) |

## Fonctionnalités clés

- **Optimisation ARM profonde** : Recompilé pour les processeurs ARM Cortex-A avec accélération matérielle GPU.
- **Éditions multiples** : Desktop (avec Pixel GUI), Lite (minimal, headless), Full (Desktop plus logiciels recommandés).
- **Raspberry Pi Imager** : Outil officiel de flashage pour parcourir, télécharger et écrire des images OS sur une carte microSD.
- **Logiciels éducatifs** : Scratch 3, Thonny Python IDE et Wolfram Mathematica préinstallés.
- **Support bibliothèque GPIO** : Bibliothèques RPi.GPIO et pigpio intégrées.

## Pour commencer

```bash
# Recommandé : utiliser Raspberry Pi Imager
# Télécharger sur : https://www.raspberrypi.com/software/

# Alternative ligne de commande (Linux/macOS) :
wget https://downloads.raspberrypi.com/raspios_lite_arm64/images/latest/raspios_lite_arm64.img.xz
xz -d raspios_lite_arm64.img.xz
sudo dd if=raspios_lite_arm64.img of=/dev/sdX bs=4M status=progress
sync

# Après le premier démarrage, mettre à jour le système
sudo apt update && sudo apt full-upgrade -y

# Configurer les interfaces (caméra, SPI, I2C, SSH, etc.)
sudo raspi-config
```

## Liens utiles

- Site web : [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
- Documentation : [https://www.raspberrypi.com/documentation/](https://www.raspberrypi.com/documentation/)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
