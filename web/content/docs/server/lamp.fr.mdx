---
title: Déploiement de serveurs web LAMP et LEMP
description: Apprenez à déployer et configurer rapidement les environnements classiques de serveurs web LAMP (Linux, Apache, MySQL, PHP) et LEMP (Linux, Nginx, MySQL, PHP) sur Debian.
---

# Guide de déploiement LAMP et LEMP

Ce guide détaille comment installer et configurer les serveurs web LAMP et LEMP sur un système Debian. Ces deux piles technologiques sont des solutions d'hébergement web éprouvées et très matures.

## Qu'est-ce que LAMP et LEMP ?

- **LAMP** signifie **L**inux / **A**pache / **M**ySQL / **P**HP.
- **LEMP** signifie **L**inux / **E**ngine-X (Nginx) / **M**ySQL / **P**HP.

La seule différence réside dans le logiciel serveur web utilisé : Apache est complet, avec un écosystème de configuration mature ; Nginx est léger, performant et excelle particulièrement dans la gestion de la haute concurrence et des fichiers statiques.

## Prérequis

- Un serveur avec Debian 13 (Trixie) déjà installé.
- Un utilisateur non root avec les permissions `sudo`.

---

## Déployer LAMP (Apache)

### Étape 1 : Mettre à jour la liste des paquets

Commencez par vous assurer que la liste des paquets de votre système est à jour.

```bash
sudo apt update
sudo apt upgrade
```

### Étape 2 : Installer Apache

Installez le serveur web Apache.

```bash
sudo apt install apache2
```

Une fois l'installation terminée, vous pouvez vérifier qu'Apache fonctionne en accédant à l'adresse IP de votre serveur dans un navigateur (`http://votre_ip_serveur`). Si vous voyez la page de bienvenue par défaut d'Apache, l'installation a réussi.

### Étape 3 : Installer MariaDB (MySQL)

MariaDB est un fork communautaire, entièrement compatible de MySQL, et c'est l'implémentation par défaut dans Debian.

```bash
sudo apt install mariadb-server
```

Après l'installation, il est recommandé d'exécuter le script de sécurité pour supprimer les paramètres par défaut non sécurisés.

```bash
sudo mysql_secure_installation
```
Suivez les invites pour définir un mot de passe root et répondre à une série de questions de sécurité.

### Étape 4 : Installer PHP

Installez PHP ainsi que les modules nécessaires pour sa communication avec Apache et MySQL.

```bash
sudo apt install php libapache2-mod-php php-mysql
```

- `php` : Le paquet cœur de PHP.
- `libapache2-mod-php` : Permet à Apache de traiter les fichiers PHP.
- `php-mysql` : Permet à PHP de se connecter aux bases de données MySQL/MariaDB.

### Étape 5 : Tester PHP

Pour vérifier qu'Apache peut traiter correctement les fichiers PHP, créons un simple fichier PHP.

```bash
sudo nano /var/www/html/info.php
```

Collez le contenu suivant dans l'éditeur :

```php
<?php
phpinfo();
?>
```

Enregistrez et fermez le fichier. Maintenant, accédez à `http://votre_ip_serveur/info.php` dans votre navigateur. Si vous voyez une page détaillant les informations PHP, alors la pile LAMP est déployée avec succès !

**Important** : Pour des raisons de sécurité, assurez-vous de supprimer ce fichier après les tests.
```bash
sudo rm /var/www/html/info.php
```

---

## Déployer LEMP (Nginx)

Si vous préférez utiliser Nginx, suivez les étapes ci-dessous.

### Étape 1 : Installer Nginx

```bash
sudo apt install nginx
```
De même, accédez à l'adresse IP de votre serveur (`http://votre_ip_serveur`). Si vous voyez la page de bienvenue de Nginx, l'installation est réussie.

### Étape 2 : Installer MariaDB

Cette étape est identique à l'installation LAMP. Si déjà installé, pas besoin de répéter.

```bash
sudo apt install mariadb-server
sudo mysql_secure_installation
```

### Étape 3 : Installer PHP-FPM

Contrairement à Apache, Nginx n'a pas de module intégré pour traiter PHP. Il a besoin d'un programme externe pour gérer les requêtes PHP, c'est `PHP-FPM` (FastCGI Process Manager).

```bash
sudo apt install php-fpm php-mysql
```

### Étape 4 : Configurer Nginx

C'est l'étape la plus cruciale du déploiement LEMP. Vous devez éditer le fichier de configuration du bloc serveur Nginx pour lui indiquer comment transmettre les requêtes de fichiers `.php` à PHP-FPM.

Ouvrez le fichier de configuration du bloc serveur par défaut :
```bash
sudo nano /etc/nginx/sites-available/default
```

Vous devez modifier le fichier pour qu'il ressemble à ce qui suit. Notez l'ajout de `index.php` et du bloc `location ~ \.php$`.

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.html index.htm index.php; # Ajouter index.php

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    # C'est la partie clé à décommenter ou ajouter
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        # Note : Le chemin peut varier selon la version de PHP
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
    }
}
```

Enregistrez et fermez le fichier. Ensuite, testez la configuration Nginx pour vérifier qu'il n'y a pas d'erreur de syntaxe.

```bash
sudo nginx -t
```
Si le message affiche `syntax is ok` et `test is successful`, vous pouvez redémarrer Nginx en toute sécurité pour appliquer les modifications.

```bash
sudo systemctl restart nginx
```

### Étape 5 : Tester PHP

Cette étape est similaire au test LAMP, créez un fichier `info.php`.

```bash
sudo nano /var/www/html/info.php
```

```php
<?php
phpinfo();
?>
```

Maintenant, accédez à `http://votre_ip_serveur/info.php`. Si vous voyez la page d'informations PHP, la pile LEMP est déployée avec succès !

**De même, assurez-vous de supprimer ce fichier après les tests.**
```bash
sudo rm /var/www/html/info.php
```

## Prochaines étapes

Vous disposez maintenant d'un environnement serveur web entièrement fonctionnel. Ensuite, vous pouvez envisager :
- Configurer des hôtes virtuels (Virtual Hosts) pour votre site.
- Activer HTTPS pour votre site avec Let's Encrypt.
- Déployer votre propre application ou installer un CMS comme WordPress.