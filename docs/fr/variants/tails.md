---
title: Tails — Dérivé Debian
description: Un OS live amnésique conçu pour la vie privée et l'anonymat — route tout le trafic via Tor et ne laisse aucune trace après extinction.
---

# Tails

Tails — acronyme de **The Amnesic Incognito Live System** — est un système d'exploitation live construit sur Debian stable, conçu avec un objectif principal : protéger votre vie privée et votre anonymat. Il est conçu pour être démarré depuis une clé USB, fonctionne entièrement en RAM et ne laisse aucune trace sur l'ordinateur hôte.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian stable |
| Cycle de publication | Mises à jour de sécurité environ toutes les 6–8 semaines |
| Bureau par défaut | GNOME (personnalisé, allégé) |
| Utilisateurs cibles | Journalistes, militants, utilisateurs soucieux de la vie privée |
| Site web | [https://tails.boum.org](https://tails.boum.org) |

## Fonctionnalités clés

- **Amnésique par conception** : Le système fonctionne en RAM. À l'extinction, tous les fichiers temporaires et l'historique de navigation sont effacés — rien n'est écrit sur le disque dur interne.
- **Routage Tor obligatoire** : Chaque connexion réseau passe par Tor. Toute application tentant de se connecter en dehors de Tor est automatiquement bloquée.
- **Suite d'outils de confidentialité** : Tor Browser, Thunderbird avec chiffrement OpenPGP, OnionShare, KeePassXC.
- **Stockage persistant chiffré** : Partition chiffrée optionnelle sur la clé USB pour stocker des documents entre les sessions.

## Pour commencer

```bash
# Tails doit être exécuté depuis une clé USB (minimum 8 Go)

# Étape 1 — Télécharger l'image :
# https://tails.boum.org/install/

# Étape 2 — Écrire sur la clé USB :
# Première installation : utiliser balenaEtcher (https://www.balena.io/etcher/)

# Note : Exécuter Tails dans une machine virtuelle affaiblit considérablement
# ses garanties de sécurité. Le démarrage USB physique est la méthode recommandée.
```

::: warning Limitations
Tails protège votre vie privée pendant une session, mais ne peut pas défendre contre la surveillance au niveau matériel ou les erreurs de l'utilisateur.
:::

## Liens utiles

- Site web : [https://tails.boum.org](https://tails.boum.org)
- Guide d'installation : [https://tails.boum.org/install/](https://tails.boum.org/install/)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
