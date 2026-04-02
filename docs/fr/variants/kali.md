---
title: Kali Linux — Dérivé Debian
description: La distribution de tests de pénétration et de cybersécurité de référence, avec plus de 600 outils de sécurité préinstallés.
---

# Kali Linux

Kali Linux est la distribution Linux axée sur la sécurité la plus reconnue, publiée par Offensive Security en 2013. Basée sur Debian testing avec un modèle de publication continue, elle est livrée avec plus de 600 outils préinstallés pour les tests de pénétration, la criminalistique numérique et la rétro-ingénierie.

## Informations de base

| Attribut | Détails |
|---|---|
| Basé sur | Debian testing (rolling) |
| Cycle de publication | Publication continue |
| Bureau par défaut | Xfce (depuis 2019) ; GNOME, KDE disponibles |
| Utilisateurs cibles | Professionnels de la sécurité, pentesters, joueurs CTF |
| Site web | [https://www.kali.org](https://www.kali.org) |

## Fonctionnalités clés

- **600+ outils de sécurité** : Nmap, Metasploit, Burp Suite, Wireshark, Aircrack-ng, John the Ripper, et des centaines d'autres.
- **Modèle de publication continue** : Suit Debian testing, les outils sont continuellement mis à jour.
- **Support multi-plateforme** : x86_64, ARM, WSL, Docker, images Raspberry Pi dédiées.
- **Mode Live** : Démarrage direct depuis une clé USB sans installation.
- **Mode Kali Undercover** : Transformation en un clic du bureau pour ressembler à Windows 10.

## Relation avec Debian

Kali Linux est basé sur Debian testing. Offensive Security ajoute des correctifs de noyau personnalisés et maintient un dépôt séparé d'outils de sécurité.

## Pour commencer

```bash
# Télécharger depuis : https://www.kali.org/get-kali/

# Après installation, mettre à jour le système
sudo apt update && sudo apt full-upgrade -y

# Installer la suite d'outils complète
sudo apt install kali-linux-everything -y

# Installer seulement les 10 outils les plus utilisés
sudo apt install kali-tools-top10 -y
```

::: warning Avertissement légal
Les outils inclus dans Kali Linux ne doivent être utilisés que contre des systèmes que vous possédez ou pour lesquels vous avez une autorisation écrite explicite.
:::

## Liens utiles

- Site web : [https://www.kali.org](https://www.kali.org)
- Téléchargement : [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)

---

## Étapes suivantes

Retour à l'[aperçu des dérivés Debian](/fr/variants/).
