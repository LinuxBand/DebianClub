---
title: Parrot OS — Dérivé Debian
description: Un dérivé Debian à publication continue qui équilibre les outils de recherche en sécurité avec un bureau quotidien capable.
---

# Parrot OS

Parrot OS est une distribution à publication continue basée sur Debian, développée par l'équipe italienne Frozenbox. Contrairement aux distributions purement axées sur la sécurité, Parrot OS est conçu pour être à la fois une plateforme de recherche en sécurité et un bureau quotidien confortable.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian testing (rolling) |
| Cycle de publication | Publication continue |
| Bureau par défaut | MATE (Sécurité/Home), KDE Plasma (optionnel) |
| Utilisateurs cibles | Chercheurs en sécurité, développeurs, utilisateurs soucieux de la vie privée |
| Site web | [https://parrotsec.org](https://parrotsec.org) |

## Fonctionnalités clés

- **Éditions à usages multiples** : Security (boîte à outils pentest complète), Home (bureau léger quotidien), HTB (pré-configuré pour Hack The Box).
- **Plus léger que Kali** : Le bureau MATE combiné aux ajustements du noyau maintient une utilisation RAM plus faible. Fonctionne confortablement avec 2 Go de RAM.
- **Outils de confidentialité intégrés** : AnonSurf (routage Tor en un clic), Firejail, OnionShare.
- **Édition Home orientée développeur** : Livrée sans outils de sécurité lourds mais avec des runtimes de programmation populaires.

## Pour commencer

```bash
# Télécharger l'édition ISO depuis : https://parrotsec.org/download/

# Après installation, mettre à jour via la commande Parrot
sudo parrot-upgrade
# Équivalent à :
sudo apt update && sudo apt full-upgrade -y

# Activer AnonSurf pour router tout le trafic via Tor
sudo anonsurf start
sudo anonsurf stop
```

::: tip Parrot OS vs. Kali Linux
Kali Linux priorise la complétude de sa bibliothèque d'outils de sécurité. Parrot OS convient mieux si vous voulez une station de travail généraliste qui gère aussi le travail de sécurité.
:::

## Liens utiles

- Site web : [https://parrotsec.org](https://parrotsec.org)
- Téléchargement : [https://parrotsec.org/download/](https://parrotsec.org/download/)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
