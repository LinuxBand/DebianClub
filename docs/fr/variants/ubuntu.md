---
title: Ubuntu — Dérivé Debian
description: La distribution Linux de bureau la plus populaire au monde, maintenue par Canonical Ltd.
---

# Ubuntu

Ubuntu est la distribution Linux de bureau la plus utilisée au monde, fondée par Canonical Ltd. en 2004. Construite sur l'infrastructure de paquets Debian, elle vise à offrir une expérience prête à l'emploi pour les utilisateurs ordinaires et les serveurs d'entreprise. Ubuntu publie une nouvelle version tous les six mois, avec une version Long-Term Support (LTS) tous les deux ans.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian unstable / testing |
| Cycle de publication | Tous les 6 mois (avril/octobre) ; LTS tous les 2 ans |
| Bureau par défaut | GNOME (principal), avec Flavors officiels : KDE, Xfce, MATE, LXQt |
| Utilisateurs cibles | Utilisateurs de bureau, développeurs, serveurs d'entreprise |
| Site web | [https://ubuntu.com](https://ubuntu.com) |

## Fonctionnalités clés

- **Écosystème massif** : Les dépôts APT contiennent des dizaines de milliers de paquets, et le Snap Store en ajoute davantage, couvrant pratiquement tous les cas d'usage imaginables.
- **Support à long terme** : Les versions LTS reçoivent 5 ans de mises à jour standard (extensible à 10 ans avec Ubuntu Pro), ce qui les rend très utilisées en environnements de production.
- **Flavors officiels** : Kubuntu (KDE), Xubuntu (Xfce), Lubuntu (LXQt), Ubuntu MATE, et plus — chacun offrant un bureau différent tout en partageant le même noyau Ubuntu.
- **Support cloud de première classe** : Ubuntu est l'image Linux la plus populaire sur AWS, Azure et GCP, et une base principale pour les images Docker officielles.
- **Ressources communautaires riches** : Ask Ubuntu, forums officiels et une documentation tierce étendue rendent l'obtention d'aide simple.

## Relation avec Debian

Ubuntu synchronise les paquets depuis les branches unstable (Sid) et testing de Debian, en commençant un gel environ cinq mois avant chaque publication. Canonical applique des correctifs spécifiques à Ubuntu et maintient des dépôts de paquets séparés.

## Pour commencer

```bash
# Vérifier votre version actuelle
lsb_release -a

# Mettre à niveau vers la prochaine version LTS
sudo do-release-upgrade -d

# Mettre à jour tous les paquets
sudo apt update && sudo apt upgrade -y

# Installer des outils de développement courants
sudo apt install build-essential curl wget git -y
```

## Pour qui ?

- Utilisateurs migrant de Windows ou macOS vers Linux pour la première fois
- Développeurs souhaitant un environnement stable et bien documenté
- Administrateurs système d'entreprise ayant besoin de support à long terme

## Liens utiles

- Site web : [https://ubuntu.com](https://ubuntu.com)
- Téléchargement : [https://ubuntu.com/download](https://ubuntu.com/download)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
