---
title: Environnements de bureau
description: Guide des environnements de bureau disponibles pour Debian 13
---

# Environnements de bureau pour Debian 13

Debian propose une grande variété d'environnements de bureau. Voici les plus populaires.

## GNOME (Recommandé pour les débutants)

Interface moderne et intuitive, c'est l'environnement par défaut de Debian.

```bash
sudo apt install task-gnome-desktop -y
```

**Avantages** : Moderne, nombreuses applications intégrées, grande communauté  
**Inconvénients** : Utilisation élevée de la RAM (600-800 Mo+)

## KDE Plasma

Environnement hautement personnalisable avec un aspect Windows-like.

```bash
sudo apt install task-kde-desktop -y
```

**Avantages** : Très personnalisable, riche en fonctionnalités  
**Inconvénients** : Complexe, utilisation élevée de la RAM

## Xfce (Recommandé pour les anciens PC)

Environnement léger et rapide.

```bash
sudo apt install task-xfce-desktop -y
```

**Avantages** : Léger (300-400 Mo de RAM), rapide, stable  
**Inconvénients** : Interface moins moderne

## MATE

Fork de GNOME 2, interface classique et familière.

```bash
sudo apt install task-mate-desktop -y
```

## LXQt / LXDE

Ultra-légers, idéaux pour le vieux matériel (256-512 Mo de RAM).

```bash
sudo apt install task-lxde-desktop -y
# ou
sudo apt install task-lxqt-desktop -y
```

## Tableau de comparaison

| Environnement | RAM | Adapté pour |
|---------------|-----|-------------|
| GNOME | 600+ Mo | PC modernes |
| KDE Plasma | 500+ Mo | Utilisateurs avancés |
| Xfce | 300 Mo | PC modérément anciens |
| MATE | 350 Mo | Environnement classique |
| LXQt | 250 Mo | Très vieux matériel |

## Changer d'environnement de bureau

```bash
# Installer un nouveau bureau
sudo apt install task-kde-desktop -y

# Sélectionner le bureau par défaut
sudo update-alternatives --config x-session-manager
```
