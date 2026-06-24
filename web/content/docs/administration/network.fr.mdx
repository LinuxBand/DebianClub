---
title: Configuration réseau
description: Guide de configuration réseau pour Debian 13, incluant réseau filaire, WiFi, pare-feu et dépannage réseau
---

# Configuration réseau Debian 13

Ce tutoriel détaille comment configurer et gérer les connexions réseau dans Debian 13, incluant le réseau filaire, le réseau sans fil, les services réseau et le dépannage.

## 🌐 Bases de la gestion réseau

### NetworkManager

NetworkManager est l'outil de gestion réseau le plus courant dans les installations de bureau (installé automatiquement via des tâches comme `task-gnome-desktop`), mais Debian ne l'impose pas comme seule option — les serveurs et les installations minimales utilisent généralement `ifupdown` (`/etc/network/interfaces`) ou `systemd-networkd` :

```bash
# Vérifier l'état de NetworkManager
systemctl status NetworkManager

# Redémarrer NetworkManager
sudo systemctl restart NetworkManager

# Voir les périphériques réseau
nmcli device status

# Voir les connexions réseau
nmcli connection show
```

### Outils réseau traditionnels

```bash
# Voir les interfaces réseau
ip addr show
ifconfig  # nécessite l'installation de net-tools

# Voir la table de routage
ip route show
route -n  # nécessite l'installation de net-tools

# Tester la connectivité réseau
ping google.com
traceroute google.com
```

## 🔌 Configuration réseau filaire

### Configuration automatique (DHCP)

La plupart des réseaux filaires utilisent DHCP pour obtenir automatiquement une adresse IP :

```bash
# Voir les connexions filaires
nmcli connection show --active

# Créer une connexion filaire
sudo nmcli connection add type ethernet con-name "Wired" ifname eth0

# Activer la connexion
sudo nmcli connection up "Wired"

# Renouveler l'adresse IP
sudo nmcli connection down "Wired" && sudo nmcli connection up "Wired"
```

### Configuration IP statique

```bash
# Créer une connexion IP statique
sudo nmcli connection add type ethernet con-name "Static" ifname eth0 \
    ip4 192.168.1.100/24 gw4 192.168.1.1

# Définir les serveurs DNS
sudo nmcli connection modify "Static" ipv4.dns "8.8.8.8,8.8.4.4"

# Définir la configuration manuelle
sudo nmcli connection modify "Static" ipv4.method manual

# Activer la connexion
sudo nmcli connection up "Static"
```

### Nommage des interfaces réseau

```bash
# Voir les noms des interfaces réseau
ip link show

# Voir les noms d'interface réseau persistants
ls /sys/class/net/

# Modifier le nom d'interface (optionnel)
sudo nano /etc/systemd/network/10-eth0.link
```

## 📶 Configuration WiFi

### Configuration via interface graphique

Dans GNOME :
1. Cliquez sur l'icône réseau en haut à droite
2. Sélectionnez le réseau WiFi
3. Entrez le mot de passe pour vous connecter

### Configuration en ligne de commande

```bash
# Scanner les réseaux WiFi
nmcli device wifi list

# Se connecter à un réseau WiFi
sudo nmcli device wifi connect "NomWiFi" password "motdepasse"

# Se connecter à un réseau caché
sudo nmcli device wifi connect "NomWiFi" password "motdepasse" hidden yes

# Voir les connexions WiFi enregistrées
nmcli connection show

# Supprimer une connexion WiFi
sudo nmcli connection delete "NomWiFi"
```

### Création d'un point d'accès WiFi

```bash
# Créer un point d'accès WiFi
sudo nmcli device wifi hotspot ifname wlan0 ssid "MonHotspot" password "monmotdepasse"

# Voir l'état du point d'accès
nmcli device status

# Arrêter le point d'accès
sudo nmcli device disconnect wlan0
```

### Problèmes de pilotes WiFi

```bash
# Vérifier le périphérique WiFi
lspci | grep -i wifi
lsusb | grep -i wifi

# Vérifier les modules sans fil
lsmod | grep wifi
iwconfig

# Installer des pilotes WiFi supplémentaires
sudo apt install firmware-iwlwifi  # Cartes Intel
sudo apt install firmware-realtek  # Cartes Realtek
sudo apt install firmware-atheros  # Cartes Atheros

# Recharger les modules réseau
sudo modprobe -r iwlwifi && sudo modprobe iwlwifi
```

## 🔧 Configuration réseau avancée

### Pont réseau (Bridging)

```bash
# Installer les outils de pont
sudo apt install bridge-utils

# Créer un pont réseau
sudo nmcli connection add type bridge con-name br0 ifname br0
sudo nmcli connection add type bridge-slave con-name br0-eth0 ifname eth0 master br0

# Configurer l'IP du pont
sudo nmcli connection modify br0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify br0 ipv4.gateway 192.168.1.1
sudo nmcli connection modify br0 ipv4.dns 8.8.8.8
sudo nmcli connection modify br0 ipv4.method manual

# Activer le pont
sudo nmcli connection up br0
```

### Configuration VLAN

```bash
# Créer une interface VLAN
sudo nmcli connection add type vlan con-name vlan100 ifname eth0.100 \
    dev eth0 id 100

# Configurer l'IP du VLAN
sudo nmcli connection modify vlan100 ipv4.addresses 192.168.100.10/24
sudo nmcli connection modify vlan100 ipv4.method manual

# Activer le VLAN
sudo nmcli connection up vlan100
```

### Agrégation de liens (Bonding)

```bash
# Créer une interface d'agrégation
sudo nmcli connection add type bond con-name bond0 ifname bond0 \
    bond.options "mode=active-backup,miimon=1000"

# Ajouter des interfaces esclaves à l'agrégation
sudo nmcli connection add type bond-slave con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type bond-slave con-name bond0-eth1 ifname eth1 master bond0

# Configurer l'IP de l'agrégation
sudo nmcli connection modify bond0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify bond0 ipv4.method manual

# Activer l'agrégation
sudo nmcli connection up bond0
```

## 🌍 Configuration DNS

### systemd-resolved

`systemd-resolved` est le service de résolution DNS fourni par systemd, qui peut fonctionner avec NetworkManager, mais **il n'est pas installé et activé par défaut dans Debian**. Si vous utilisez un environnement de bureau et que NetworkManager est en cours d'exécution, `/etc/resolv.conf` est généralement géré directement par NetworkManager. Si vous choisissez d'activer systemd-resolved :

```bash
# Voir l'état DNS
systemctl status systemd-resolved

# Voir la configuration DNS
resolvectl status

# Voir les statistiques DNS
resolvectl statistics

# Vider le cache DNS
sudo resolvectl flush-caches
```

### Configuration DNS manuelle

```bash
# Modifier temporairement le DNS (perdu au redémarrage)
sudo nano /etc/resolv.conf

# Ajouter des serveurs DNS
nameserver 8.8.8.8
nameserver 8.8.4.4

# Modifier définitivement le DNS (via NetworkManager)
sudo nmcli connection modify "NomConnexion" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "NomConnexion"
```

### Serveur DNS personnalisé

```bash
# Installer dnsmasq
sudo apt install dnsmasq

# Configurer dnsmasq
sudo nano /etc/dnsmasq.conf

# Configuration de base
listen-address=127.0.0.1
bind-interfaces
cache-size=1000

# Activer dnsmasq
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## 🔒 Sécurité réseau

### Configuration du pare-feu

```bash
# Installer et activer UFW
sudo apt install ufw
sudo ufw enable

# Règles de base
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Autoriser des ports spécifiques
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# Autoriser une IP spécifique
sudo ufw allow from 192.168.1.100

# Voir les règles
sudo ufw status verbose
```

### Surveillance réseau

```bash
# Installer des outils de surveillance réseau
sudo apt install nethogs iftop nload

# Surveiller le trafic réseau
sudo nethogs    # surveillance par processus
sudo iftop      # surveillance du trafic en temps réel
nload           # surveillance de la charge réseau

# Voir les connexions réseau
ss -tuln        # voir les ports en écoute
netstat -tuln   # nécessite l'installation de net-tools
```

### Configuration VPN

#### Client OpenVPN

```bash
# Installer OpenVPN
sudo apt install openvpn

# Importer le fichier de configuration
sudo cp client.ovpn /etc/openvpn/client.conf

# Démarrer le VPN
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client

# Gérer le VPN via NetworkManager
sudo apt install network-manager-openvpn-gnome
```

#### VPN WireGuard

```bash
# Installer WireGuard
sudo apt install wireguard

# Générer une paire de clés
wg genkey | tee privatekey | wg pubkey > publickey

# Créer le fichier de configuration
sudo nano /etc/wireguard/wg0.conf

# Exemple de configuration
[Interface]
PrivateKey = votre_clé_privée
Address = 10.0.0.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = clé_publique_du_serveur
Endpoint = IP_du_serveur:port
AllowedIPs = 0.0.0.0/0

# Démarrer WireGuard
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## 📊 Optimisation des performances réseau

### Ajustement des paramètres réseau

```bash
# Voir les paramètres réseau actuels
sysctl net.core.rmem_max
sysctl net.core.wmem_max

# Ajuster temporairement les paramètres
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# Ajuster définitivement les paramètres
sudo nano /etc/sysctl.d/99-network-performance.conf

# Ajouter des paramètres d'optimisation
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr

# Appliquer la configuration
sudo sysctl -p /etc/sysctl.d/99-network-performance.conf
```

### Test de bande passante

```bash
# Installer l'outil de test de vitesse
sudo apt install speedtest-cli

# Tester la vitesse réseau
speedtest-cli

# Utiliser iperf3 pour tester
sudo apt install iperf3

# Côté serveur
iperf3 -s

# Test côté client
iperf3 -c IP_du_serveur
```

## 🆘 Dépannage réseau

### Diagnostic de base

```bash
# 1. Vérifier les interfaces réseau
ip link show

# 2. Vérifier les adresses IP
ip addr show

# 3. Vérifier le routage
ip route show

# 4. Vérifier le DNS
nslookup google.com
dig google.com

# 5. Tester la connectivité
ping -c 4 8.8.8.8        # tester Internet
ping -c 4 192.168.1.1    # tester la passerelle
```

### Résolution des problèmes courants

#### Impossible d'obtenir une adresse IP

```bash
# Redémarrer le service réseau
sudo systemctl restart NetworkManager

# Obtenir manuellement une IP
sudo dhclient eth0

# Vérifier les logs DHCP
journalctl -u NetworkManager
```

#### Échec de résolution DNS

```bash
# Vérifier la configuration DNS
cat /etc/resolv.conf

# Tester le serveur DNS
nslookup google.com 8.8.8.8

# Vider le cache DNS
sudo resolvectl flush-caches

# Réinitialiser la configuration DNS
sudo systemctl restart systemd-resolved
```

#### Problèmes de connexion WiFi

```bash
# Vérifier l'état du périphérique WiFi
nmcli radio wifi

# Activer le WiFi
nmcli radio wifi on

# Redémarrer le périphérique WiFi
sudo nmcli device disconnect wlan0
sudo nmcli device connect wlan0

# Vérifier les pilotes
dmesg | grep -i wifi
```

### Script de diagnostic réseau

Créer un script de diagnostic réseau :

```bash
#!/bin/bash
# Script de diagnostic réseau

echo "=== État des interfaces réseau ==="
ip link show

echo -e "\n=== Informations d'adresse IP ==="
ip addr show

echo -e "\n=== Table de routage ==="
ip route show

echo -e "\n=== Configuration DNS ==="
cat /etc/resolv.conf

echo -e "\n=== Test de connectivité vers la passerelle ==="
ping -c 3 $(ip route | grep default | awk '{print $3}')

echo -e "\n=== Test de connectivité vers Internet ==="
ping -c 3 8.8.8.8

echo -e "\n=== Test de résolution DNS ==="
nslookup google.com

echo -e "\n=== Connexions actives ==="
nmcli connection show --active
```

## 📝 Sauvegarde de la configuration réseau

### Sauvegarder la configuration réseau

```bash
# Sauvegarder la configuration NetworkManager
sudo tar -czf network-backup.tar.gz /etc/NetworkManager/

# Sauvegarder la configuration des connexions
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-connections-backup/

# Exporter la configuration réseau
nmcli -f all connection show > network-connections.txt
```

### Restaurer la configuration réseau

```bash
# Restaurer les fichiers de configuration
sudo tar -xzf network-backup.tar.gz -C /

# Recharger NetworkManager
sudo systemctl reload NetworkManager

# Reconnecter le réseau
nmcli connection reload
```

## Prochaines étapes

Après avoir maîtrisé la configuration réseau, vous pouvez continuer à apprendre :

1. [Configuration du pare-feu](/administration/firewall) - Renforcer la sécurité réseau
2. [Gestion des services système](/administration/services) - Gérer les services réseau
3. [Gestion des journaux](/administration/logs) - Consulter les journaux réseau

---

**Avez-vous terminé la configuration réseau ?** [Continuer à apprendre la configuration du pare-feu →](/administration/firewall)