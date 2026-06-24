---
title: "Gestion des conteneurs Podman"
description: "Installer et utiliser Podman sur Debian 13, un moteur de conteneurs sans démon, exécutable en mode rootless, compatible avec les commandes Docker"
---

# Gestion des conteneurs Podman

**Podman** est un moteur de conteneurs open source, hautement compatible avec Docker, avec deux avantages clés :

- **Sans démon (daemonless)** : contrairement à Docker qui dépend d'un démon root résident, Podman exécute les conteneurs directement en tant que processus normaux, réduisant la surface d'attaque.
- **Exécution rootless** : les utilisateurs normaux peuvent exécuter des conteneurs sans avoir besoin des privilèges root, offrant une sécurité accrue.

Les dépôts officiels de Debian 13 incluent Podman, l'installation est très simple, sans ajout de sources tierces.

## Installation

```bash
sudo apt update
sudo apt install podman

# Vérification
podman --version
```

Pour une orchestration de style `docker-compose`, installer en plus :

```bash
sudo apt install podman-compose
```

## Utilisation de base

La ligne de commande de Podman est presque identique à celle de Docker :

```bash
# Exécuter un conteneur
podman run -d --name web -p 8080:80 docker.io/library/nginx

# Afficher les conteneurs en cours d'exécution
podman ps

# Afficher tous les conteneurs (y compris arrêtés)
podman ps -a

# Afficher les images locales
podman images

# Afficher les journaux / entrer dans le conteneur
podman logs web
podman exec -it web bash

# Arrêter et supprimer
podman stop web
podman rm web
```

> Remarque : Par défaut, Podman écrit explicitement le préfixe du registre des images (par exemple `docker.io/library/nginx`). Vous pouvez également configurer les registres de recherche par défaut dans `/etc/containers/registries.conf`.

## Compatibilité avec les commandes Docker

Si vous êtes habitué à la commande `docker`, vous pouvez installer le paquet de compatibilité pour que `docker` devienne un alias de `podman` :

```bash
sudo apt install podman-docker
```

Ensuite, les commandes `docker run ...`, `docker ps`, etc. seront redirigées directement vers Podman.

## Conteneurs rootless

Un utilisateur normal exécute directement `podman` en mode rootless, sans configuration supplémentaire – c'est l'un des plus grands avantages de Podman par rapport à Docker. Vérification :

```bash
# Exécution en tant qu'utilisateur normal (pas sudo)
podman run --rm docker.io/library/alpine echo "Hello from rootless Podman"
```

Le mode rootless repose sur les espaces de noms utilisateur (user namespaces). Debian 13 l'active par défaut ; en cas d'erreur liée à `subuid/subgid`, vérifiez que `/etc/subuid` et `/etc/subgid` contiennent une entrée pour l'utilisateur actuel :

```bash
grep "$USER" /etc/subuid /etc/subgid
# Si absent, ajouter manuellement (généralement déjà configuré automatiquement lors de l'installation)
sudo usermod --add-subuids 100000-165535 --add-subgids 100000-165535 "$USER"
```

## Pod : gestion native par groupes

Le nom de Podman vient de **Pod** (concept identique au Pod de Kubernetes) – il permet de regrouper plusieurs conteneurs partageant le même espace réseau :

```bash
# Créer un pod et exposer un port
podman pod create --name mypod -p 8080:80

# Ajouter un conteneur au pod
podman run -d --pod mypod docker.io/library/nginx
```

## Gérer les conteneurs avec systemd (Quadlet)

Pour que les conteneurs démarrent automatiquement au démarrage et soient gérés par le système, il est recommandé d'utiliser **Quadlet**. Créez un fichier `.container` dans `~/.config/containers/systemd/` (rootless) ou `/etc/containers/systemd/` (système) :

```ini
# ~/.config/containers/systemd/web.container
[Container]
Image=docker.io/library/nginx
PublishPort=8080:80

[Install]
WantedBy=default.target
```

Rechargez et démarrez ensuite :

```bash
systemctl --user daemon-reload
systemctl --user start web
```

## Comparaison rapide Podman vs Docker

| Caractéristique | Podman | Docker |
|---|---|---|
| Démon | Aucun (daemonless) | Démon résident |
| Rootless | Prise en charge native par défaut | Configuration supplémentaire nécessaire |
| Ligne de commande | Compatible avec Docker | — |
| Intégration systemd | Quadlet natif | Encapsulation supplémentaire nécessaire |
| Installation sur Debian 13 | Installation depuis les dépôts officiels | Nécessite d'ajouter les dépôts officiels Docker |

## Résumé

- `sudo apt install podman` suffit, pas besoin de sources tierces.
- Les commandes sont compatibles avec Docker ; utilisez `podman-docker` pour que la commande `docker` soit redirigée directement.
- Les utilisateurs normaux exécutent en mode rootless, et les conteneurs peuvent être gérés par systemd via Quadlet.

Lectures complémentaires : [Installation et utilisation de Docker](/en/server/docker) · [Virtualisation](/en/server/virtualization)
