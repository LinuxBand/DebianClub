---
title: Exigences système
description: Guide de vérification des exigences matérielles et de compatibilité avant l'installation de Debian 13
---

# Vérification des exigences système

Avant d'installer Debian 13, il est très important de s'assurer que votre ordinateur répond aux exigences de base. Cette page vous aidera à vérifier la compatibilité matérielle et les exigences système.

## 🖥️ Exigences matérielles

### Configuration système minimale

| Composant | Exigence minimale | Description |
|------|----------|------|
| **Processeur** | 1 cœur à 1 GHz | Architecture amd64 (recommandée) ou arm64 |
| **Mémoire** | 2 Go de RAM | Les environnements de bureau nécessitent plus de mémoire |
| **Stockage** | 25 Go | Inclut le système de base et les applications |
| **Carte graphique** | Support 1024×768 | Carte graphique intégrée suffit |
| **Réseau** | Filaire ou sans fil | Configuration des dépôts logiciels après installation |

### Configuration recommandée

| Composant | Configuration recommandée | Avantage |
|------|----------|------|
| **Processeur** | Double cœur 2 GHz+ | Multitâche plus fluide |
| **Mémoire** | 8 Go de RAM+ | Supporte plusieurs applications simultanées |
| **Stockage** | 50 Go SSD | Démarrage et réactivité plus rapides |
| **Carte graphique** | Carte graphique dédiée | Support de l'accélération matérielle et des jeux |

::: tip 💡 Astuce pour débutants
Si vous n'êtes pas sûr de votre configuration matérielle, vous pouvez appuyer sur <span class="kbd">Win + R</span> dans Windows, puis saisir `dxdiag` pour voir les informations système.
:::

## 🔍 Vérification de la compatibilité matérielle

### 1. Vérification de l'architecture du processeur

Debian 13 prend en charge plusieurs architectures de processeur :

#### Architectures prises en charge
- **amd64** (64 bits) - Processeurs Intel/AMD 64 bits (recommandation principale)
- **arm64** - Processeurs ARM 64 bits (nouveaux Mac, Raspberry Pi 4, etc.)
- **armhf** - Processeurs ARM 32 bits (anciens Raspberry Pi, etc.)
- **riscv64** - Processeurs RISC-V 64 bits (🆕 Nouveau dans Debian 13)
- **ppc64el** - Processeurs IBM Power 64 bits petit-boutiste
- **s390x** - Processeurs IBM z/Architecture 64 bits

::: warning État du support i386 (32 bits)
Debian 13 (Trixie) **ne propose plus i386 comme architecture d'installation standard**. Il n'y a pas de noyau d'installation officiel i386, ni de Debian Installer pour i386. L'utilité d'i386 dans Debian est conservée pour : exécuter d'anciennes applications 32 bits en mode multi-architecture (multiarch) sur un système amd64, et non pour installer un système i386 complet de manière autonome. Si votre matériel ne prend en charge que le 32 bits, veuillez consulter des distributions comme antiX Linux qui maintiennent encore une version d'installation i386.
:::

#### Comment vérifier votre architecture

**Sous Windows :**
```cmd
# Appuyez sur Win + R, saisissez cmd, puis exécutez :
wmic computersystem get systemtype
```

**Sous un système Linux existant :**
```bash
# Voir l'architecture du processeur
uname -m
```

### 2. Vérification de la mémoire

#### Besoins en mémoire selon l'environnement de bureau

| Environnement de bureau | Mémoire minimale | Mémoire recommandée | Caractéristiques |
|----------|----------|----------|------|
| **GNOME** | 4 Go | 8 Go | Moderne, riche en fonctionnalités |
| **KDE Plasma** | 4 Go | 8 Go | Hautement personnalisable |
| **Xfce** | 2 Go | 4 Go | Léger, adapté aux vieilles machines |
| **LXDE** | 1 Go | 2 Go | Minimaliste et léger |
| **Ligne de commande** | 512 Mo | 1 Go | Interface texte uniquement |

::: warning ⚠️ Impact d'un manque de mémoire
Si la mémoire est insuffisante, le système peut utiliser fréquemment l'espace d'échange (swap), entraînant une baisse significative des performances.
:::

### 3. Vérification de l'espace de stockage

#### Recommandations de partitionnement de l'espace disque

```bash
# Schéma de partitionnement recommandé (50 Go d'espace total)
/          # Partition racine : 25 Go
/home      # Répertoire utilisateur : 20 Go  
swap       # Partition d'échange : 4 Go (égale à la taille de la mémoire)
/boot/efi  # Partition EFI : 1 Go (système UEFI)
```

#### Besoins en espace selon l'usage

| Usage | Espace minimal | Espace recommandé | Description |
|------|----------|----------|------|
| **Système de base** | 10 Go | 20 Go | Système cœur uniquement |
| **Usage bureau** | 25 Go | 50 Go | Inclut les logiciels de bureau |
| **Environnement de développement** | 50 Go | 100 Go | Inclut les outils de développement |
| **Travail multimédia** | 100 Go | 500 Go+ | Montage vidéo, etc. |

## 🔧 Compatibilité matérielle

### Compatibilité des cartes graphiques

#### Cartes graphiques NVIDIA
```bash
# Support de NVIDIA par Debian
✅ Pilote open source : nouveau (par défaut)
✅ Pilote officiel : nvidia-driver (nécessite une installation supplémentaire)
⚠️  Les modèles anciens peuvent avoir un support limité
```

#### Cartes graphiques AMD
```bash
# Support des cartes graphiques AMD
✅ Pilote open source : radeon/amdgpu (par défaut)
✅ Pilote officiel : amdgpu-pro (optionnel)
✅ Bon support pour la plupart des modèles
```

#### Cartes graphiques intégrées Intel
```bash
# Support des cartes graphiques Intel
✅ Pilote open source : i915 (par défaut)
✅ Support excellent, fonctionne immédiatement
✅ Bon support de l'accélération matérielle
```

### Compatibilité des périphériques réseau

#### Jeux de puces Wi-Fi
La plupart des jeux de puces Wi-Fi modernes sont bien pris en charge, mais certains nécessitent des micrologiciels non libres :

| Fabricant | Niveau de support | Remarque |
|------|----------|------|
| **Intel** | ✅ Excellent | Nécessite des paquets de micrologiciels |
| **Broadcom** | ⚠️ Moyen | Certains modèles nécessitent des pilotes propriétaires |
| **Realtek** | ✅ Bon | La plupart des modèles sont pris en charge |
| **Atheros** | ✅ Excellent | Bon support par les pilotes open source |

#### Réseau filaire
Presque toutes les interfaces réseau filaires sont entièrement prises en charge.

## 📋 Liste de contrôle avant installation

### Points de contrôle obligatoires

- [ ] **Processeur** : Confirmer l'architecture (amd64/arm64, amd64 recommandé pour les PC modernes)
- [ ] **Mémoire** : Au moins 2 Go, 8 Go+ recommandé
- [ ] **Stockage** : Au moins 25 Go d'espace libre
- [ ] **Réseau** : Confirmer que la connexion réseau est disponible
- [ ] **Mode de démarrage** : Confirmer UEFI ou Legacy BIOS

### Vérifications recommandées

- [ ] **Carte graphique** : Vérifier le modèle, préparer le pilote correspondant
- [ ] **Wi-Fi** : Noter le modèle du jeu de puces
- [ ] **Imprimante** : Vérifier la marque et le modèle
- [ ] **Bluetooth** : Confirmer si nécessaire
- [ ] **Carte son** : Généralement prise en charge

## 🔬 Collecte d'informations système

### Collecte d'informations matérielles

Si vous souhaitez des informations matérielles détaillées, vous pouvez utiliser les méthodes suivantes :

#### Sous Windows
1. Appuyez sur <span class="kbd">Win + R</span>
2. Saisissez `msinfo32` et appuyez sur Entrée
3. Consultez les informations du "Résumé système"

#### Utilisation d'une clé USB Live
```bash
# Exécutez après le démarrage de la clé USB Live Debian
sudo lshw -short          # Aperçu du matériel
lscpu                     # Informations CPU
free -h                   # Informations mémoire
lsblk                     # Périphériques de stockage
lspci                     # Périphériques PCI
lsusb                     # Périphériques USB
```

## ⚡ Recommandations d'optimisation des performances

### SSD vs HDD

| Type de stockage | Avantage | Inconvénient | Cas d'utilisation |
|----------|------|------|----------|
| **SSD** | Rapide, silencieux | Plus cher | Recommandé comme disque système |
| **HDD** | Bon marché, grande capacité | Lent, bruyant | Adapté au stockage de fichiers |

### Configuration recommandée à deux disques
```bash
SSD (120 Go+) → Système + programmes
HDD (1 To+)   → Documents + fichiers multimédias
```

## 🆘 Résolution des problèmes de compatibilité

### Problèmes courants

#### Wi-Fi inutilisable
**Solution :**
1. Vérifier si un micrologiciel non libre est nécessaire
2. Utiliser un réseau filaire pour installer les paquets de micrologiciels
3. Envisager d'utiliser un adaptateur Wi-Fi USB

#### Problèmes de pilote graphique
**Solution :**
1. Utiliser d'abord le pilote open source
2. Installer le pilote propriétaire une fois le système stable
3. Prévoir une carte graphique intégrée comme solution de secours

#### Aucun son
**Solution :**
1. Vérifier la configuration ALSA
2. Installer PulseAudio
3. Mettre à jour le noyau peut résoudre le problème

## Prochaines étapes

Une fois la vérification matérielle terminée, vous pouvez continuer avec :

1. [Essai en machine virtuelle](/basics/virtual-machine) - Tester Debian sans risque dans une machine virtuelle
2. [Télécharger l'image de Debian 13](/basics/download) - Obtenir les fichiers d'installation
3. [Créer un support de démarrage](/basics/bootable-media) - Préparer le support d'installation
4. [Commencer le processus d'installation](/basics/installation) - Installer le système officiellement

---

**Compatibilité matérielle confirmée ?** [Commencer le téléchargement de Debian 13 →](/basics/download)