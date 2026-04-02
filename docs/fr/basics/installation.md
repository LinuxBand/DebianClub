---
title: Guide d'installation
description: Guide d'installation complet étape par étape pour Debian 13
---

# Guide d'installation de Debian 13

## Préparation avant l'installation

- ✅ Support de démarrage créé
- ✅ Données importantes sauvegardées
- ✅ Connexion réseau disponible (recommandée)

::: warning Important
L'installation fraîche **effacera complètement** les données du disque dur ! Sauvegardez vos fichiers importants.
:::

## Démarrage de l'installateur

### Accéder aux paramètres BIOS/UEFI

Touches communes :
- **Dell** : F2 ou F12
- **HP** : F10 ou F9
- **Lenovo** : F1 ou F12
- **ASUS** : F2 ou Del

### Étapes d'installation

1. **Sélectionner la langue** — Français ou votre langue préférée
2. **Configurer le réseau** — Connexion filaire recommandée
3. **Partitionner le disque** — Utiliser le partitionnement guidé pour les débutants
4. **Installer le système de base** — Téléchargement automatique
5. **Sélectionner les logiciels** — Choisir l'environnement de bureau
6. **Installer le chargeur d'amorçage GRUB** — Installer sur le disque principal
7. **Terminer l'installation** — Redémarrer

## Partitionnement recommandé

| Partition | Taille | Système de fichiers | Notes |
|-----------|--------|---------------------|-------|
| `/boot/efi` | 512 Mo | FAT32 | Systèmes UEFI uniquement |
| `/` | 20-50 Go | ext4 | Partition racine |
| `swap` | 2-8 Go | swap | Mémoire virtuelle |
| `/home` | Espace restant | ext4 | Données utilisateur |

## Résolution des problèmes courants

```bash
# Vérifier si le démarrage UEFI est activé
ls /sys/firmware/efi

# Réinstaller GRUB si nécessaire
sudo grub-install /dev/sda
sudo update-grub
```

## Étapes suivantes

- [Premier démarrage](/fr/basics/first-boot)
- [Configuration du système](/fr/basics/configuration)
