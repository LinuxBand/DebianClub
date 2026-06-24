---
title: "Configuration des deux cartes graphiques NVIDIA Optimus"
description: "Configurer NVIDIA Optimus sur un ordinateur portable Debian 13, installer le pilote et utiliser le déchargement PRIME"
---

# Configuration des deux cartes graphiques NVIDIA Optimus

De nombreux ordinateurs portables sont équipés d'une **carte graphique intégrée Intel/AMD** et d'une **carte graphique dédiée NVIDIA**. NVIDIA appelle cette technologie **Optimus**. En utilisation normale, la carte intégrée économe pilote l'écran ; lorsque des performances élevées sont nécessaires (jeux, rendu, CUDA), on bascule sur la carte dédiée. Cet article explique comment installer correctement le pilote sur Debian 13 et utiliser le déchargement PRIME.

## Première étape : vérifier le matériel

```bash
# Lister toutes les cartes graphiques, vérifier la présence simultanée d'Intel/AMD et NVIDIA
lspci | grep -E "VGA|3D"
```

Si vous voyez deux cartes (par exemple une Intel et une NVIDIA), vous êtes dans une architecture hybride Optimus.

## Deuxième étape : activer les dépôts non-free-firmware et non-free

Le pilote propriétaire NVIDIA se trouve dans le composant `non-free`. Assurez-vous que vos dépôts contiennent `non-free` et `non-free-firmware` (la syntaxe deb822 par défaut de Debian 13 est décrite dans [Format des dépôts deb822](/fr/administration/deb822)) :

```text
Components: main contrib non-free non-free-firmware
```

Après modification, exécutez :

```bash
sudo apt update
```

## Troisième étape : installer le pilote NVIDIA

Le dépôt officiel Debian contient le pilote NVIDIA testé. **Utilisez de préférence le paquet officiel** plutôt que l'installateur `.run` du site NVIDIA :

```bash
# Installer les en-têtes du noyau (nécessaires pour compiler le module)
sudo apt install linux-headers-amd64

# Installer le pilote NVIDIA et le support PRIME
sudo apt install nvidia-driver firmware-misc-nonfree

# Redémarrer pour charger le pilote
sudo reboot
```

L'installation compile automatiquement le module pour le noyau actuel via DKMS. Le paquet `nvidia-driver` de Debian configure PRIME par défaut ; au démarrage, la carte intégrée pilote le bureau et la carte dédiée s'active à la demande – c'est le comportement souhaité pour économiser la batterie sur un ordinateur portable.

## Quatrième étape : vérification

```bash
# Voir l'état de la carte dédiée (le pilote affiche les infos GPU)
nvidia-smi

# Vérifier le rendu OpenGL actuel (normalement carte intégrée Intel/AMD)
glxinfo | grep "OpenGL renderer"
```

`glxinfo` provient du paquet `mesa-utils` (`sudo apt install mesa-utils`).

## Cinquième étape : exécuter des programmes avec la carte dédiée à la demande (déchargement PRIME)

En utilisation normale, la carte intégrée économise l'énergie. Lorsque vous souhaitez qu'un **programme spécifique** utilise la carte dédiée pour le rendu, on parle de **déchargement PRIME** :

```bash
# Exécuter un programme avec la carte dédiée
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia <nom_du_programme>

# Par exemple, exécuter glxgears avec la carte dédiée pour un test
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
```

Pour plus de commodité, vous pouvez définir un alias dans `~/.bashrc` :

```bash
alias nv-run='__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia'
# Ensuite, utilisez : nv-run blender
```

Les environnements de bureau (GNOME/KDE) proposent généralement une option « Exécuter avec la carte graphique dédiée » dans le menu contextuel des applications, qui utilise ce mécanisme en arrière-plan.

## CUDA / Utilisation pour le calcul

Si vous utilisez CUDA pour le calcul (par exemple pour l'inférence IA) plutôt que pour le rendu graphique, une fois le pilote installé et `nvidia-smi` capable de reconnaître la carte dédiée, cela suffit ; le déchargement PRIME n'est pas nécessaire. Installez la chaîne d'outils CUDA :

```bash
sudo apt install nvidia-cuda-toolkit
```

## Wayland et problèmes courants

- **Wayland** : Les pilotes NVIDIA récents gèrent plutôt bien Wayland. Si vous rencontrez des artefacts ou l'impossibilité de vous connecter, basculez sur une session **Xorg** dans l'écran de connexion pour diagnostiquer.
- **Écran noir / impossible d'accéder au bureau** : Ajoutez temporairement `nomodeset` à la fin de la ligne `linux` dans les options de démarrage GRUB pour entrer dans un bureau en basse résolution, puis vérifiez l'installation du pilote.
- **`nvidia-smi` indique « No devices found »** : Le module n'a probablement pas été compilé avec le noyau actuel. Vérifiez que `linux-headers-amd64` est installé et réinstallez avec `sudo apt install --reinstall nvidia-driver`.

## Résumé

- Activez le dépôt `non-free` → installez `linux-headers-amd64` + `nvidia-driver` → redémarrez.
- Par défaut, la carte intégrée économise l'énergie ; utilisez `__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia` pour invoquer la carte dédiée à la demande.
- Utilisez de préférence le paquet officiel Debian, évitez l'installateur `.run` du site NVIDIA.

Lectures complémentaires : [Compatibilité matérielle](/en/basics/hardware-compatibility) · [Format des dépôts deb822](/fr/administration/deb822)
