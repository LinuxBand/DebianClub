---
title: Télécharger Debian 13
description: Télécharger les images d'installation de Debian 13
---

# Télécharger Debian 13

::: tip Téléchargement interactif
Visitez la [page de téléchargement interactive](/fr/download) pour sélectionner votre région et miroir.
:::

## Choisir votre téléchargement

| Cas d'usage | Téléchargement recommandé | Taille |
|-------------|--------------------------|--------|
| **La plupart des utilisateurs** | DVD-1 (Bureau complet) | ~3,7 Go |
| **Installation minimale** | netinst (Installation réseau) | ~400 Mo |
| **Installation hors ligne** | Ensemble DVD complet | ~20 Go |

## Sources de téléchargement officielles

- **Site principal** : [debian.org/download](https://www.debian.org/download)
- **Images CD** : [cdimage.debian.org](https://cdimage.debian.org/)
- **Liste des miroirs** : [debian.org/mirror/list](https://www.debian.org/mirror/list)

## Vérifier votre téléchargement

```bash
# Vérifier l'intégrité du fichier SHA256
sha256sum debian-13.4.0-amd64-netinst.iso

# Comparer avec le fichier de sommes de contrôle officiel
# Télécharger SHA256SUMS depuis cdimage.debian.org
```

## Étapes suivantes

- [Créer un support de démarrage](/fr/basics/bootable-media)
- [Guide d'installation](/fr/basics/installation)
