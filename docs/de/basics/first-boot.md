---
title: Erster Start
description: Ersteinrichtung nach der Installation von Debian 13
---

# Erster-Start-Einrichtung

## Willkommen bei Debian!

Herzlichen Glückwunsch zur erfolgreichen Installation von Debian 13!

## Erste Anmeldung

```bash
# Falls ohne Desktop-Umgebung installiert
debian login: benutzername
Password: [Passwort eingeben]
```

## Netzwerk konfigurieren

```bash
# WLAN über Kommandozeile einrichten
nmcli dev wifi list
nmcli dev wifi connect "WLAN-Name" password "Ihr-Passwort"

# Verbindung prüfen
ping -c 3 debian.org
```

## System aktualisieren

```bash
# Paketliste aktualisieren
sudo apt update

# Alle Pakete aktualisieren
sudo apt upgrade -y

# Vollständiges Distribution-Upgrade
sudo apt full-upgrade -y
```

## sudo einrichten

```bash
# sudo installieren falls nötig
su -c "apt install sudo"

# Benutzer zur sudo-Gruppe hinzufügen
su -c "usermod -aG sudo ihr_benutzername"
```

## Wichtige Tools installieren

```bash
# Grundlegende Werkzeuge
sudo apt install curl wget git vim htop -y

# Multimedia-Codecs
sudo apt install ffmpeg vlc -y
```

## Nächste Schritte

- [Systemkonfiguration](/de/basics/configuration)
- [Desktop-Umgebungen](/de/basics/desktop-environments)
