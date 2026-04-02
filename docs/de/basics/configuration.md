---
title: Systemkonfiguration
description: Anleitung zur Konfiguration und Anpassung von Debian 13
---

# Debian 13 Systemkonfiguration

## Paketverwaltung konfigurieren

```bash
# APT-Quellen bearbeiten
sudo nano /etc/apt/sources.list

# Empfohlene Quellen für Debian 13
deb http://deb.debian.org/debian/ trixie main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian/ trixie-updates main contrib non-free non-free-firmware
```

## Häufig benötigte Pakete installieren

```bash
# Entwicklungswerkzeuge
sudo apt install build-essential git vim -y

# Grafische Umgebung (falls nötig)
sudo apt install task-gnome-desktop -y

# Proprietäre Treiber
sudo apt install firmware-linux-nonfree -y
```

## Firewall konfigurieren

```bash
# UFW installieren
sudo apt install ufw -y

# Firewall aktivieren
sudo ufw enable

# SSH erlauben (falls nötig)
sudo ufw allow ssh

# Status prüfen
sudo ufw status
```

## Systemzeit konfigurieren

```bash
# Zeitzone setzen
sudo timedatectl set-timezone Europe/Berlin

# NTP-Synchronisierung aktivieren
sudo timedatectl set-ntp true

# Zeitkonfiguration prüfen
timedatectl status
```

## Nächste Schritte

- [Desktop-Umgebungen](/de/basics/desktop-environments)
- [Einführung in Debian](/de/basics/introduction)
