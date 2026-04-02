---
title: Premier démarrage
description: Configuration initiale après l'installation de Debian 13
---

# Configuration du premier démarrage

## Bienvenue dans Debian !

Félicitations pour avoir installé Debian 13 avec succès !

## Connexion initiale

```bash
# Si vous avez installé sans environnement de bureau
debian login: nom_utilisateur
Password: [entrez votre mot de passe]
```

## Configuration du réseau

```bash
# Configurer le WiFi en ligne de commande
nmcli dev wifi list
nmcli dev wifi connect "Nom-WiFi" password "votre-mot-de-passe"

# Vérifier la connexion
ping -c 3 debian.org
```

## Mise à jour du système

```bash
# Mettre à jour la liste des paquets
sudo apt update

# Mettre à niveau tous les paquets
sudo apt upgrade -y

# Mise à niveau complète de la distribution
sudo apt full-upgrade -y
```

## Configuration de sudo

```bash
# Installer sudo si nécessaire
su -c "apt install sudo"

# Ajouter l'utilisateur au groupe sudo
su -c "usermod -aG sudo votre_nom_utilisateur"

# Se déconnecter et se reconnecter pour appliquer les changements
```

## Installation des outils essentiels

```bash
# Outils de base
sudo apt install curl wget git vim htop -y

# Codecs multimédia
sudo apt install ffmpeg vlc -y

# Pilotes supplémentaires
sudo apt install firmware-linux-nonfree -y
```

## Étapes suivantes

- [Configuration du système](/fr/basics/configuration)
- [Environnements de bureau](/fr/basics/desktop-environments)
