---
title: Netzwerkkonfiguration
description: Debian 13 Netzwerkkonfigurationsanleitung, einschließlich kabelgebundener Netzwerke, WiFi, Firewall und Netzwerk-Fehlerbehebung
---

# Debian 13 Netzwerkkonfiguration

Dieses Tutorial beschreibt detailliert, wie Netzwerkverbindungen in Debian 13 konfiguriert und verwaltet werden, einschließlich kabelgebundener Netzwerke, drahtloser Netzwerke, Netzwerkdiensten und Fehlerbehebung.

## 🌐 Grundlagen der Netzwerkverwaltung

### NetworkManager

NetworkManager ist das am häufigsten verwendete Netzwerkverwaltungstool bei Desktop-Installationen (automatisch installiert durch Tasks wie `task-gnome-desktop`), aber Debian zwingt es nicht als einzige Option auf – Server und Minimalinstallationen verwenden typischerweise `ifupdown` (`/etc/network/interfaces`) oder `systemd-networkd`:

```bash
# NetworkManager-Status überprüfen
systemctl status NetworkManager

# NetworkManager neu starten
sudo systemctl restart NetworkManager

# Netzwerkgeräte anzeigen
nmcli device status

# Netzwerkverbindungen anzeigen
nmcli connection show
```

### Traditionelle Netzwerktools

```bash
# Netzwerkschnittstellen anzeigen
ip addr show
ifconfig  # erfordert Installation von net-tools

# Routing-Tabelle anzeigen
ip route show
route -n  # erfordert Installation von net-tools

# Netzwerkkonnektivität testen
ping google.com
traceroute google.com
```

## 🔌 Kabelgebundene Netzwerkkonfiguration

### Automatische Konfiguration (DHCP)

Die meisten kabelgebundenen Netzwerke verwenden DHCP, um automatisch eine IP-Adresse zu beziehen:

```bash
# Kabelgebundene Verbindungen anzeigen
nmcli connection show --active

# Kabelgebundene Verbindung erstellen
sudo nmcli connection add type ethernet con-name "Wired" ifname eth0

# Verbindung aktivieren
sudo nmcli connection up "Wired"

# IP-Adresse neu beziehen
sudo nmcli connection down "Wired" && sudo nmcli connection up "Wired"
```

### Statische IP-Konfiguration

```bash
# Statische IP-Verbindung erstellen
sudo nmcli connection add type ethernet con-name "Static" ifname eth0 \
    ip4 192.168.1.100/24 gw4 192.168.1.1

# DNS-Server festlegen
sudo nmcli connection modify "Static" ipv4.dns "8.8.8.8,8.8.4.4"

# Manuelle Konfiguration festlegen
sudo nmcli connection modify "Static" ipv4.method manual

# Verbindung aktivieren
sudo nmcli connection up "Static"
```

### Netzwerkschnittstellen-Namensgebung

```bash
# Netzwerkschnittstellennamen anzeigen
ip link show

# Persistente Netzwerkschnittstellennamen anzeigen
ls /sys/class/net/

# Schnittstellennamen ändern (optional)
sudo nano /etc/systemd/network/10-eth0.link
```

## 📶 WiFi-Netzwerkkonfiguration

### Grafische Oberflächenkonfiguration

In GNOME:
1. Klicken Sie auf das Netzwerksymbol oben rechts
2. Wählen Sie das WiFi-Netzwerk
3. Geben Sie das Passwort ein, um sich zu verbinden

### Kommandozeilenkonfiguration

```bash
# WiFi-Netzwerke scannen
nmcli device wifi list

# Mit WiFi-Netzwerk verbinden
sudo nmcli device wifi connect "WiFi-Name" password "Passwort"

# Mit verstecktem Netzwerk verbinden
sudo nmcli device wifi connect "WiFi-Name" password "Passwort" hidden yes

# Gespeicherte WiFi-Verbindungen anzeigen
nmcli connection show

# WiFi-Verbindung löschen
sudo nmcli connection delete "WiFi-Name"
```

### WiFi-Hotspot-Erstellung

```bash
# WiFi-Hotspot erstellen
sudo nmcli device wifi hotspot ifname wlan0 ssid "MyHotspot" password "mypassword"

# Hotspot-Status anzeigen
nmcli device status

# Hotspot stoppen
sudo nmcli device disconnect wlan0
```

### WiFi-Treiberprobleme

```bash
# WiFi-Geräte überprüfen
lspci | grep -i wifi
lsusb | grep -i wifi

# Drahtlosmodule überprüfen
lsmod | grep wifi
iwconfig

# Zusätzliche WiFi-Treiber installieren
sudo apt install firmware-iwlwifi  # Intel-Netzwerkkarten
sudo apt install firmware-realtek  # Realtek-Netzwerkkarten
sudo apt install firmware-atheros  # Atheros-Netzwerkkarten

# Netzwerkmodule neu laden
sudo modprobe -r iwlwifi && sudo modprobe iwlwifi
```

## 🔧 Erweiterte Netzwerkkonfiguration

### Netzwerkbrücken

```bash
# Bridge-Tools installieren
sudo apt install bridge-utils

# Netzwerkbrücke erstellen
sudo nmcli connection add type bridge con-name br0 ifname br0
sudo nmcli connection add type bridge-slave con-name br0-eth0 ifname eth0 master br0

# Bridge-IP konfigurieren
sudo nmcli connection modify br0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify br0 ipv4.gateway 192.168.1.1
sudo nmcli connection modify br0 ipv4.dns 8.8.8.8
sudo nmcli connection modify br0 ipv4.method manual

# Bridge aktivieren
sudo nmcli connection up br0
```

### VLAN-Konfiguration

```bash
# VLAN-Schnittstelle erstellen
sudo nmcli connection add type vlan con-name vlan100 ifname eth0.100 \
    dev eth0 id 100

# VLAN-IP konfigurieren
sudo nmcli connection modify vlan100 ipv4.addresses 192.168.100.10/24
sudo nmcli connection modify vlan100 ipv4.method manual

# VLAN aktivieren
sudo nmcli connection up vlan100
```

### Netzwerk-Bonding

```bash
# Bonding-Schnittstelle erstellen
sudo nmcli connection add type bond con-name bond0 ifname bond0 \
    bond.options "mode=active-backup,miimon=1000"

# Bonding-Slave-Schnittstellen hinzufügen
sudo nmcli connection add type bond-slave con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type bond-slave con-name bond0-eth1 ifname eth1 master bond0

# Bonding-IP konfigurieren
sudo nmcli connection modify bond0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify bond0 ipv4.method manual

# Bonding aktivieren
sudo nmcli connection up bond0
```

## 🌍 DNS-Konfiguration

### systemd-resolved

`systemd-resolved` ist der von systemd bereitgestellte DNS-Auflösungsdienst, der mit NetworkManager zusammenarbeiten kann, ist aber **in Debian nicht standardmäßig installiert und aktiviert**. Wenn Sie eine Desktop-Umgebung verwenden und NetworkManager läuft, wird `/etc/resolv.conf` normalerweise direkt von NetworkManager verwaltet. Wenn Sie sich entscheiden, systemd-resolved zu aktivieren:

```bash
# DNS-Status anzeigen
systemctl status systemd-resolved

# DNS-Konfiguration anzeigen
resolvectl status

# DNS-Statistiken anzeigen
resolvectl statistics

# DNS-Cache leeren
sudo resolvectl flush-caches
```

### Manuelle DNS-Konfiguration

```bash
# DNS temporär ändern (verfällt nach Neustart)
sudo nano /etc/resolv.conf

# DNS-Server hinzufügen
nameserver 8.8.8.8
nameserver 8.8.4.4

# DNS dauerhaft ändern (über NetworkManager)
sudo nmcli connection modify "Verbindungsname" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "Verbindungsname"
```

### Benutzerdefinierter DNS-Server

```bash
# dnsmasq installieren
sudo apt install dnsmasq

# dnsmasq konfigurieren
sudo nano /etc/dnsmasq.conf

# Grundkonfiguration
listen-address=127.0.0.1
bind-interfaces
cache-size=1000

# dnsmasq aktivieren
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## 🔒 Netzwerksicherheit

### Firewall-Konfiguration

```bash
# UFW installieren und aktivieren
sudo apt install ufw
sudo ufw enable

# Grundregeln
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Bestimmte Ports erlauben
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# Bestimmte IP erlauben
sudo ufw allow from 192.168.1.100

# Regeln anzeigen
sudo ufw status verbose
```

### Netzwerküberwachung

```bash
# Netzwerküberwachungstools installieren
sudo apt install nethogs iftop nload

# Netzwerkverkehr überwachen
sudo nethogs    # Pro-Prozess-Überwachung
sudo iftop      # Echtzeit-Verkehrsüberwachung
nload           # Netzwerklastüberwachung

# Netzwerkverbindungen anzeigen
ss -tuln        # Lauschende Ports anzeigen
netstat -tuln   # erfordert Installation von net-tools
```

### VPN-Konfiguration

#### OpenVPN-Client

```bash
# OpenVPN installieren
sudo apt install openvpn

# Konfigurationsdatei importieren
sudo cp client.ovpn /etc/openvpn/client.conf

# VPN starten
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client

# VPN über NetworkManager verwalten
sudo apt install network-manager-openvpn-gnome
```

#### WireGuard VPN

```bash
# WireGuard installieren
sudo apt install wireguard

# Schlüsselpaar generieren
wg genkey | tee privatekey | wg pubkey > publickey

# Konfigurationsdatei erstellen
sudo nano /etc/wireguard/wg0.conf

# Beispielkonfiguration
[Interface]
PrivateKey = Ihr_privater_Schlüssel
Address = 10.0.0.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = Server_öffentlicher_Schlüssel
Endpoint = Server-IP:Port
AllowedIPs = 0.0.0.0/0

# WireGuard starten
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## 📊 Netzwerkleistungsoptimierung

### Netzwerkparameter-Optimierung

```bash
# Aktuelle Netzwerkparameter anzeigen
sysctl net.core.rmem_max
sysctl net.core.wmem_max

# Parameter temporär anpassen
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# Parameter dauerhaft anpassen
sudo nano /etc/sysctl.d/99-network-performance.conf

# Optimierungsparameter hinzufügen
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr

# Konfiguration anwenden
sudo sysctl -p /etc/sysctl.d/99-network-performance.conf
```

### Bandbreitentest

```bash
# Geschwindigkeitstest-Tool installieren
sudo apt install speedtest-cli

# Netzwerkgeschwindigkeit testen
speedtest-cli

# Mit iperf3 testen
sudo apt install iperf3

# Serverseite
iperf3 -s

# Client-Test
iperf3 -c Server-IP
```

## 🆘 Netzwerk-Fehlerbehebung

### Grundlegende Diagnose

```bash
# 1. Netzwerkschnittstellen überprüfen
ip link show

# 2. IP-Adressen überprüfen
ip addr show

# 3. Routing überprüfen
ip route show

# 4. DNS überprüfen
nslookup google.com
dig google.com

# 5. Konnektivität testen
ping -c 4 8.8.8.8        # Externes Netzwerk testen
ping -c 4 192.168.1.1    # Gateway testen
```

### Häufige Problembehebungen

#### Kann keine IP-Adresse beziehen

```bash
# Netzwerkdienst neu starten
sudo systemctl restart NetworkManager

# IP manuell beziehen
sudo dhclient eth0

# DHCP-Protokolle überprüfen
journalctl -u NetworkManager
```

#### DNS-Auflösung fehlgeschlagen

```bash
# DNS-Konfiguration überprüfen
cat /etc/resolv.conf

# DNS-Server testen
nslookup google.com 8.8.8.8

# DNS-Cache leeren
sudo resolvectl flush-caches

# DNS-Konfiguration zurücksetzen
sudo systemctl restart systemd-resolved
```

#### WiFi-Verbindungsprobleme

```bash
# WiFi-Gerätestatus überprüfen
nmcli radio wifi

# WiFi aktivieren
nmcli radio wifi on

# WiFi-Gerät neu starten
sudo nmcli device disconnect wlan0
sudo nmcli device connect wlan0

# Treiber überprüfen
dmesg | grep -i wifi
```

### Netzwerkdiagnoseskript

Netzwerkdiagnoseskript erstellen:

```bash
#!/bin/bash
# Netzwerkdiagnoseskript

echo "=== Netzwerkschnittstellenstatus ==="
ip link show

echo -e "\n=== IP-Adressinformationen ==="
ip addr show

echo -e "\n=== Routing-Tabelle ==="
ip route show

echo -e "\n=== DNS-Konfiguration ==="
cat /etc/resolv.conf

echo -e "\n=== Gateway-Konnektivitätstest ==="
ping -c 3 $(ip route | grep default | awk '{print $3}')

echo -e "\n=== Externe Netzwerkkonnektivitätstest ==="
ping -c 3 8.8.8.8

echo -e "\n=== DNS-Auflösungstest ==="
nslookup google.com

echo -e "\n=== Aktive Verbindungen ==="
nmcli connection show --active
```

## 📝 Netzwerkkonfigurationssicherung

### Netzwerkkonfiguration sichern

```bash
# NetworkManager-Konfiguration sichern
sudo tar -czf network-backup.tar.gz /etc/NetworkManager/

# Verbindungskonfiguration sichern
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-connections-backup/

# Netzwerkkonfiguration exportieren
nmcli -f all connection show > network-connections.txt
```

### Netzwerkkonfiguration wiederherstellen

```bash
# Konfigurationsdateien wiederherstellen
sudo tar -xzf network-backup.tar.gz -C /

# NetworkManager neu laden
sudo systemctl reload NetworkManager

# Netzwerk neu verbinden
nmcli connection reload
```

## Nächste Schritte

Nachdem Sie die Netzwerkkonfiguration beherrschen, können Sie weiterlernen:

1. [Firewall-Konfiguration](/administration/firewall) - Netzwerksicherheit verstärken
2. [Systemdienstverwaltung](/administration/services) - Netzwerkdienste verwalten
3. [Protokollverwaltung](/administration/logs) - Netzwerkprotokolle anzeigen

---

**Netzwerkkonfiguration abgeschlossen?** [Weiter zur Firewall-Konfiguration →](/administration/firewall)