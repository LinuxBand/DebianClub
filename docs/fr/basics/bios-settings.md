---
title: Paramètres BIOS/UEFI
description: Configurer les paramètres BIOS/UEFI pour démarrer depuis un support USB
---

# Paramètres BIOS/UEFI

Pour démarrer depuis votre média d'installation Debian, vous devrez peut-être modifier les paramètres BIOS/UEFI.

## Accéder au BIOS/UEFI

Appuyez sur la touche correspondant à votre fabricant au démarrage :

| Fabricant | Touche BIOS | Touche Boot Menu |
|-----------|------------|-----------------|
| Dell | F2 | F12 |
| HP | F10 | F9 |
| Lenovo | F1 / Enter | F12 |
| ASUS | F2 / Del | F8 |
| MSI | Del | F11 |
| Acer | F2 | F12 |
| Gigabyte | Del | F12 |

## Modifier l'ordre de démarrage

1. Accéder au BIOS/UEFI
2. Trouver la section "Boot" ou "Démarrage"
3. Déplacer "USB Drive" en première position
4. Sauvegarder et redémarrer (généralement F10)

## Paramètres UEFI importants

### Activer/Désactiver Secure Boot

```
UEFI → Security → Secure Boot → Disabled
```

::: tip Conseil
Debian 13 supporte Secure Boot. Il n'est généralement pas nécessaire de le désactiver, mais certains systèmes plus anciens peuvent nécessiter sa désactivation.
:::

### Mode UEFI vs Legacy BIOS

Debian 13 fonctionne avec les deux modes. Le mode UEFI est recommandé pour les systèmes modernes.

## Après l'installation

Pensez à remettre l'ordre de démarrage à son état d'origine après l'installation.
