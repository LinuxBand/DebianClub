---
title: antiX — Dérivé Debian
description: Un dérivé Debian ultra-léger qui fonctionne avec seulement 256 Mo de RAM, utilise sysvinit et redonne vie aux vieux matériels.
---

# antiX

antiX est un dérivé Debian stable extrêmement léger dirigé par le développeur grec anticapitalista, conçu spécifiquement pour les vieux ordinateurs et le matériel à ressources limitées. Il fonctionne sans systemd (utilisant sysvinit à la place) et peut fonctionner confortablement avec seulement 256 Mo de RAM. Il est également la couche de base sur laquelle MX Linux est construit.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian stable |
| Cycle de publication | Suit Debian stable ; publications mises à jour périodiques |
| Bureau par défaut | IceWM (par défaut), Fluxbox, JWM, Herbstluftwm |
| Utilisateurs cibles | Propriétaires de vieux matériel, minimalistes, utilisateurs anti-systemd |
| Site web | [https://antixlinux.com](https://antixlinux.com) |

## Fonctionnalités clés

- **Empreinte ultra-légère** : Un bureau antiX complet tourne à 150–200 Mo de RAM.
- **Sans systemd** : antiX utilise sysvinit comme système init.
- **Quatre éditions d'installation** : Full, Base, Core (ligne de commande uniquement), et Net.
- **Support 32 bits hérité** : L'une des rares distributions maintenues fournissant encore des images 32 bits.

## Pour commencer

```bash
# Télécharger depuis : https://antixlinux.com/download/
# Disponible en éditions Full, Base, Core et Net — 32 bits et 64 bits

# Après installation, mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Vérifier l'utilisation de la RAM
free -h

# Gestion des services avec sysvinit
sudo service <nom-service> start
sudo update-rc.d <nom-service> enable
```

::: tip antiX vs. MX Linux
antiX est le choix le plus extrême — plus léger, plus proche de la ligne de commande. MX Linux est construit sur antiX mais ajoute des outils graphiques et une interface plus conviviale.
:::

## Liens utiles

- Site web : [https://antixlinux.com](https://antixlinux.com)
- Téléchargement : [https://antixlinux.com/download/](https://antixlinux.com/download/)
- Forums communautaires : [https://www.antixforum.com](https://www.antixforum.com)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
