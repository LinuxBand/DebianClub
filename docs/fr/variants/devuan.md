---
title: Devuan — Dérivé Debian
description: Un fork de Debian qui remplace systemd par sysvinit, runit ou OpenRC, préservant la liberté du système init.
---

# Devuan

Devuan (prononcé "dev-one") est un fork de Debian initié par le collectif Veteran Unix Admins en 2015, en réponse à l'adoption de systemd par Debian 8 Jessie. La mission principale de Devuan est simple : fournir une distribution basée sur Debian qui ne dépend pas de systemd.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian (dépendances systemd supprimées/remplacées) |
| Cycle de publication | S'aligne sur les versions stables Debian |
| Bureau par défaut | Xfce (par défaut), GNOME, KDE, LXQt disponibles |
| Utilisateurs cibles | Utilisateurs préférant l'init traditionnel, sysadmins |
| Site web | [https://www.devuan.org](https://www.devuan.org) |

## Fonctionnalités clés

- **Liberté du système init** : Choisissez sysvinit (traditionnel), runit (rapide, léger), ou OpenRC au moment de l'installation.
- **Compatibilité presque complète avec Debian** : Seuls les paquets avec des dépendances systemd dures sont corrigés ou remplacés.
- **Parité de version avec Debian** : Devuan 5 Daedalus = Debian 12 Bookworm.
- **Adapté aux conteneurs et embarqué** : Environnement sans systemd utilisant moins de ressources dans Docker/LXC.

## Pour commencer

```bash
# Télécharger depuis : https://www.devuan.org/get-devuan

# Après installation, mettre à jour
sudo apt update && sudo apt full-upgrade -y

# Vérifier quel système init est en cours d'exécution
cat /proc/1/comm
# Devrait afficher : init (sysvinit), runit ou openrc-init

# Gestion des services avec sysvinit
sudo service nginx start
sudo update-rc.d nginx enable
```

## Liens utiles

- Site web : [https://www.devuan.org](https://www.devuan.org)
- Téléchargement : [https://www.devuan.org/get-devuan](https://www.devuan.org/get-devuan)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
