---
title: Gestion de la sécurité
description: Apprenez à gérer la sécurité d'un système Debian, y compris le contrôle d'accès utilisateur, la configuration du pare-feu, les mises à jour automatiques et la détection d'intrusion.
---

# Gestion de la sécurité

Assurer la sécurité d'un système Debian est une tâche centrale de l'administration système. Ce guide couvre plusieurs domaines clés pour vous aider à renforcer votre système et à vous protéger contre les menaces potentielles.

## 🔐 Utilisateurs et contrôle d'accès

Limiter l'accès au système constitue la première ligne de défense en matière de sécurité.

### Imposer une politique de mots de passe robuste

Le module `libpam-pwquality` permet de forcer les utilisateurs à créer des mots de passe plus sécurisés.

1.  **Installer le module** :
    ```bash
    sudo apt update
    sudo apt install libpam-pwquality
    ```

2.  **Configurer la politique** :
    Modifiez le fichier `/etc/security/pwquality.conf` pour définir les règles de mot de passe.
    ```ini
    # Exemple de configuration :
    minlen = 10                  # Longueur minimale de 10 caractères
    dcredit = -1                 # Doit contenir au moins 1 chiffre
    ucredit = -1                 # Doit contenir au moins 1 lettre majuscule
    lcredit = -1                 # Doit contenir au moins 1 lettre minuscule
    ocredit = -1                 # Doit contenir au moins 1 caractère spécial
    difok = 3                    # Au moins 3 caractères doivent différer de l'ancien mot de passe
    ```

### Renforcer la sécurité SSH

L'accès à distance au serveur se fait le plus souvent via SSH. Voici quelques recommandations pour le renforcer :

1.  **Modifier le fichier de configuration SSH** :
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2.  **Configuration recommandée** :
    - **Désactiver la connexion root** : `PermitRootLogin no`
    - **Désactiver l'authentification par mot de passe (privilégier les clés)** : `PasswordAuthentication no`
    - **Activer l'authentification par clé publique** : `PubkeyAuthentication yes`
    - **Changer le port par défaut (optionnel)** : `Port 2222`

3.  **Redémarrer le service SSH** :
    ```bash
    sudo systemctl restart sshd
    ```

## 🔥 Configuration du pare-feu (UFW)

Debian n'active pas de pare-feu par défaut. `UFW` (Uncomplicated Firewall) est un outil frontal convivial. Dans Debian 13, UFW utilise en arrière-plan le framework `nftables` (compatible avec l'ancienne syntaxe `iptables`).

1.  **Installer UFW** :
    ```bash
    sudo apt install ufw
    ```

2.  **Configurer les règles de base** :
    ```bash
    sudo ufw default deny incoming   # Refuser toutes les connexions entrantes
    sudo ufw default allow outgoing  # Autoriser toutes les connexions sortantes
    sudo ufw allow ssh               # Autoriser les connexions SSH (ou le port que vous avez modifié)
    sudo ufw allow http              # Si c'est un serveur web, autoriser HTTP
    sudo ufw allow https             # Autoriser HTTPS
    ```

3.  **Activer UFW** :
    ```bash
    sudo ufw enable
    ```
    Le système vous avertira que cela pourrait interrompre les connexions SSH existantes, confirmez.

4.  **Vérifier l'état** :
    ```bash
    sudo ufw status verbose
    ```

## 🔄 Mises à jour de sécurité automatiques

Appliquer les correctifs de sécurité en temps opportun est crucial. `unattended-upgrades` peut installer automatiquement les mises à jour de sécurité.

1.  **Installation** :
    ```bash
    sudo apt install unattended-upgrades
    ```

2.  **Activation** :
    Exécutez l'assistant de configuration, il créera un fichier de configuration de base.
    ```bash
    sudo dpkg-reconfigure -plow unattended-upgrades
    ```
    Sélectionnez "Oui" dans la boîte de dialogue qui s'affiche.

3.  **Ajuster la configuration (optionnel)** :
    Vous pouvez modifier le fichier `/etc/apt/apt.conf.d/50unattended-upgrades` pour personnaliser le comportement des mises à jour, par exemple activer le redémarrage automatique.

## 🛡️ Protection contre les intrusions (Fail2Ban)

`Fail2Ban` surveille les fichiers journaux et met automatiquement à jour les règles du pare-feu pour bloquer les adresses IP en fonction de comportements suspects (comme de multiples tentatives de connexion échouées).

1.  **Installer Fail2Ban** :
    ```bash
    sudo apt install fail2ban
    ```

2.  **Créer un fichier de configuration local** :
    Ne modifiez pas directement les fichiers `.conf`, créez plutôt un fichier `.local` pour les surcharger.
    ```bash
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    sudo nano /etc/fail2ban/jail.local
    ```

3.  **Configurer la protection SSH** :
    Dans `jail.local`, trouvez la section `[sshd]` et assurez-vous que `enabled = true`. Vous pouvez ajuster `maxretry` (nombre maximum de tentatives) et `bantime` (durée du bannissement).
    ```ini
    [sshd]
    enabled = true
    port    = ssh
    maxretry = 3
    bantime = 3600  # Bannir pendant 1 heure
    ```

4.  **Redémarrer le service** :
    ```bash
    sudo systemctl restart fail2ban
    ```

## 📝 Gestion et audit des journaux

Vérifier régulièrement les journaux système est essentiel pour détecter les activités anormales.

- **Utiliser `journalctl` pour consulter les journaux** :
  ```bash
  # Voir tous les journaux (du plus ancien au plus récent)
  journalctl

  # Surveiller les journaux en temps réel
  journalctl -f

  # Voir les journaux d'un service spécifique, par exemple sshd
  journalctl -u sshd.service

  # Voir les journaux du noyau
  journalctl -k
  ```