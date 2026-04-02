---
title: Gestion des paquets APT
description: Maîtrisez le système de gestion de paquets APT de Debian 13, apprenez à installer, mettre à jour et gérer les paquets logiciels
---

# Système de gestion de paquets APT

APT (Advanced Package Tool) est l'outil central de gestion des paquets du système Debian. Ce tutoriel vous apprendra à utiliser APT pour installer, mettre à jour et supprimer des paquets logiciels.

## 🎯 Concepts de base d'APT

### Qu'est-ce qu'APT ?

APT est l'outil de gestion des paquets du système Debian, responsable de :
- 📦 **Installation des paquets** : Téléchargement et installation des logiciels depuis les dépôts
- 🔄 **Gestion des dépendances** : Résolution automatique des dépendances entre paquets
- ⬆️ **Mise à jour du système** : Mise à niveau des paquets déjà installés
- 🗑️ **Suppression des logiciels** : Désinstallation sécurisée des logiciels non nécessaires

### Dépôts logiciels (Repository)

Les dépôts logiciels sont des entrepôts de stockage des paquets :

```bash
# Types principaux de dépôts logiciels
main        # Logiciels libres maintenus officiellement par Debian
contrib     # Logiciels libres dépendant de logiciels non libres
non-free    # Logiciels non libres
security    # Mises à jour de sécurité
updates     # Mises à jour de la version stable
```

## 🔧 Commandes de base d'APT

### Mettre à jour la liste des paquets

Avant d'utiliser APT, mettez d'abord à jour la liste des paquets :

```bash
# Mettre à jour la liste des paquets (recommandé avant chaque utilisation)
sudo apt update

# Exemple de sortie :
# Atteint:1 http://deb.debian.org/debian bookworm InRelease
# Récupéré:2 http://security.debian.org/debian-security bookworm-security InRelease [48.0 kB]
# Lecture des listes de paquets... Fait
```

::: tip 💡 Astuce pour débutants
`apt update` ne fait que mettre à jour la liste des paquets, sans installer ni mettre à niveau aucun logiciel. Cette commande est similaire à "actualiser le catalogue des produits d'un magasin".
:::

### Installer des paquets

#### Installer un paquet unique

```bash
# Commande d'installation de base
sudo apt install nom_du_paquet

# Exemple : installer un éditeur de texte
sudo apt install vim

# Installer avec affichage détaillé
sudo apt install -v firefox-esr
```

#### Installer plusieurs paquets

```bash
# Installer plusieurs paquets en une fois
sudo apt install git curl wget

# Installer une version spécifique
sudo apt install python3=3.11.2-1

# Réinstaller (réparer une installation corrompue)
sudo apt install --reinstall firefox-esr
```

#### Installer les paquets suggérés

```bash
# Inclure les paquets suggérés lors de l'installation
sudo apt install --install-suggests libreoffice

# Ne pas installer les paquets suggérés (comportement par défaut)
sudo apt install --no-install-suggests gimp
```

### Rechercher des paquets

#### Recherche basique

```bash
# Rechercher dans les noms et descriptions des paquets
apt search mot_clé

# Exemple : rechercher un éditeur
apt search editor

# Rechercher une fonctionnalité spécifique
apt search "media player"
```

#### Recherche précise

```bash
# Rechercher uniquement dans les noms des paquets
apt search --names-only firefox

# Rechercher avec des expressions régulières
apt search '^python3-'
```

### Afficher les informations des paquets

```bash
# Afficher les informations détaillées d'un paquet
apt show nom_du_paquet

# Exemple
apt show firefox-esr

# Afficher les informations de version installée
apt list --installed firefox-esr

# Afficher les versions disponibles
apt list firefox-esr
```

### Mettre à niveau le système

#### Mettre à niveau les paquets installés

```bash
# Mettre à niveau tous les paquets pouvant être mis à jour
sudo apt upgrade

# Mettre à niveau un paquet spécifique
sudo apt upgrade firefox-esr

# Mise à niveau complète (incluant la suppression des paquets conflictuels)
sudo apt full-upgrade
```

#### Mises à jour de sécurité

```bash
# Installer uniquement les mises à jour de sécurité
sudo apt upgrade -s | grep security
sudo apt install $(apt list --upgradable 2>/dev/null | grep security | cut -d/ -f1)
```

### Supprimer des paquets

#### Supprimer des paquets

```bash
# Supprimer un paquet (conserver les fichiers de configuration)
sudo apt remove nom_du_paquet

# Exemple
sudo apt remove firefox-esr

# Supprimer complètement (incluant les fichiers de configuration)
sudo apt purge nom_du_paquet

# Supprimer automatiquement les dépendances non nécessaires
sudo apt autoremove
```

#### Nettoyer le système

```bash
# Nettoyer le cache des fichiers de paquets téléchargés
sudo apt clean

# Nettoyer uniquement les fichiers de paquets obsolètes
sudo apt autoclean

# Supprimer les paquets orphelins
sudo apt autoremove --purge
```

## 📋 Paquets recommandés couramment utilisés

### Outils de développement

```bash
# Outils de développement de base
sudo apt install build-essential

# Contrôle de version Git
sudo apt install git

# Éditeurs de code
sudo apt install vim nano code

# Langages de programmation
sudo apt install python3 python3-pip nodejs npm
```

### Outils multimédias

```bash
# Lecteurs audio
sudo apt install audacity rhythmbox

# Lecteurs vidéo
sudo apt install vlc mpv

# Édition d'images
sudo apt install gimp inkscape

# Codecs audio/vidéo
sudo apt install ubuntu-restricted-extras
```

### Outils réseau

```bash
# Diagnostic réseau
sudo apt install net-tools curl wget

# Outils de téléchargement
sudo apt install aria2 youtube-dl

# Navigateurs
sudo apt install firefox-esr chromium
```

### Logiciels bureautiques

```bash
# Suite bureautique LibreOffice
sudo apt install libreoffice

# Lecteurs PDF
sudo apt install evince okular

# Logiciel de cartes mentales
sudo apt install freemind
```

## ⚙️ Gestion des dépôts logiciels

### Voir les dépôts actuels

```bash
# Voir la configuration des dépôts
cat /etc/apt/sources.list

# Voir les dépôts supplémentaires
ls /etc/apt/sources.list.d/
```

### Modifier les dépôts

```bash
# Modifier le fichier principal des dépôts
sudo nano /etc/apt/sources.list

# Configuration complète des dépôts pour Debian 13 (Trixie) (incluant les logiciels non libres et les micrologiciels) :
deb http://deb.debian.org/debian trixie main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie main contrib non-free non-free-firmware

deb http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb-src http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware

deb http://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware
deb-src http://deb.debian.org/debian trixie-updates main contrib non-free non-free-firmware
```

::: tip Différence entre non-free et non-free-firmware
- `non-free-firmware` : Micrologiciels matériels (WiFi, carte graphique, Bluetooth, etc.), composant dédié nouvellement ajouté dans Debian 13
- `non-free` : Autres logiciels non libres (comme les pilotes NVIDIA, polices propriétaires, etc.)

Si vous avez besoin d'installer des logiciels non libres comme les pilotes NVIDIA (`nvidia-driver`), vous devez conserver le composant `non-free`.
:::

### Utiliser des miroirs chinois

Pour améliorer la vitesse de téléchargement, vous pouvez utiliser des miroirs chinois :

```bash
# Sauvegarder le fichier original
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# Modifier les dépôts
sudo nano /etc/apt/sources.list
```

**Miroir de l'Université Tsinghua :**
```bash
# Miroir de l'Université Tsinghua
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security trixie-security main contrib non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free-firmware
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free-firmware
```

**Miroir de l'USTC :**
```bash
# Miroir de l'USTC
deb https://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian/ trixie main contrib non-free-firmware

deb https://mirrors.ustc.edu.cn/debian-security/ trixie-security main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian-security/ trixie-security main contrib non-free-firmware

deb https://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free-firmware
deb-src https://mirrors.ustc.edu.cn/debian/ trixie-updates main contrib non-free-firmware
```

### Ajouter des dépôts tiers

#### Ajouter des clés GPG

```bash
# Télécharger et ajouter une clé GPG
wget -qO - https://example.com/key.gpg | sudo apt-key add -

# Méthode moderne (recommandée)
wget -qO - https://example.com/key.gpg | sudo gpg --dearmor -o /usr/share/keyrings/example-keyring.gpg
```

#### Ajouter des dépôts

```bash
# Créer un nouveau fichier de dépôt
echo "deb [signed-by=/usr/share/keyrings/example-keyring.gpg] https://example.com/debian stable main" | sudo tee /etc/apt/sources.list.d/example.list

# Mettre à jour la liste des paquets
sudo apt update
```

## 🔍 Opérations APT avancées

### Dépendances des paquets

```bash
# Voir les dépendances d'un paquet
apt depends nom_du_paquet

# Voir quels paquets dépendent de ce paquet
apt rdepends nom_du_paquet

# Simuler une installation (sans installer réellement)
sudo apt install -s nom_du_paquet
```

### Opérations sur les fichiers de paquets

```bash
# Télécharger un fichier de paquet sans l'installer
apt download nom_du_paquet

# Voir la liste des fichiers dans un paquet
dpkg -L nom_du_paquet

# Trouver à quel paquet appartient un fichier
dpkg -S /chemin/vers/fichier

# Voir les scripts d'installation d'un paquet
apt-get source nom_du_paquet
```

### Contrôle de version

```bash
# Verrouiller la version d'un paquet (empêcher la mise à niveau)
sudo apt-mark hold nom_du_paquet

# Déverrouiller la version
sudo apt-mark unhold nom_du_paquet

# Voir les paquets verrouillés
apt-mark showhold

# Rétrograder un paquet (nécessite une ancienne version disponible)
sudo apt install nom_du_paquet=numéro_de_version
```

## 🛡️ Sécurité et bonnes pratiques

### Mises à jour de sécurité

```bash
# Configurer les mises à jour automatiques de sécurité
sudo apt install unattended-upgrades

# Configurer les mises à jour automatiques
sudo dpkg-reconfigure unattended-upgrades

# Vérifier manuellement les mises à jour de sécurité
sudo unattended-upgrade --dry-run
```

### Maintenance du système

```bash
# Commandes de maintenance régulière (recommandé d'exécuter chaque semaine)
sudo apt update && sudo apt upgrade
sudo apt autoremove
sudo apt autoclean

# Vérifier l'intégrité du système
sudo apt check

# Réparer les paquets corrompus
sudo apt install -f
```

### Sauvegarde et restauration

```bash
# Exporter la liste des paquets installés
dpkg --get-selections > installed-packages.txt

# Restaurer la liste des paquets
sudo dpkg --set-selections < installed-packages.txt
sudo apt-get dselect-upgrade
```

## 🆘 Dépannage

### Problèmes courants

#### Erreur de clé GPG
```bash
# Problème : erreur NO_PUBKEY
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ID_de_la_clé

# Ou utiliser la méthode moderne
wget -qO - https://keyserver.ubuntu.com/pks/lookup?op=get&search=0xID_de_la_clé | sudo gpg --dearmor -o /usr/share/keyrings/package-keyring.gpg
```

#### Problèmes de dépendances de paquets
```bash
# Réparer les dépendances corrompues
sudo apt install -f

# Nettoyer et reconfigurer
sudo dpkg --configure -a

# Forcer la suppression d'un paquet problématique
sudo dpkg --remove --force-remove-reinstreq nom_du_paquet
```

#### Espace disque insuffisant
```bash
# Nettoyer le cache des paquets
sudo apt clean

# Supprimer les paquets non nécessaires
sudo apt autoremove --purge

# Trouver les fichiers volumineux
sudo du -h /var/cache/apt/archives/
```

## 📱 Gestion graphique des paquets

### Gestionnaire de paquets Synaptic

```bash
# Installer le gestionnaire de paquets graphique
sudo apt install synaptic

# Exécuter Synaptic
sudo synaptic
```

### Centre logiciel GNOME

```bash
# Installer le centre logiciel GNOME
sudo apt install gnome-software

# Démarrer le centre logiciel
gnome-software
```

## Prochaines étapes

Après avoir maîtrisé la gestion des paquets APT, vous pouvez continuer à apprendre :

1. [Gestion des services système](/administration/services) - Gérer les services système
2. [Gestion des permissions utilisateur](/administration/users) - Configuration des utilisateurs et permissions
3. [Configuration réseau](/administration/network) - Paramètres et gestion réseau

---

**Vous voulez apprendre plus de techniques d'administration système ?** [Continuer à apprendre les services système →](/administration/services)