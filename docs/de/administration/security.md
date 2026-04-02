---
title: Sicherheitsmanagement
description: Erfahren Sie, wie Sie die Sicherheit Ihres Debian-Systems verwalten, einschließlich Benutzerzugriffskontrolle, Firewall-Konfiguration, automatischen Updates und Eindringlingserkennung.
---

# Sicherheitsmanagement

Die Sicherung Ihres Debian-Systems ist eine Kernaufgabe der Systemadministration. Dieser Leitfaden behandelt mehrere Schlüsselbereiche, um Ihnen zu helfen, Ihr System zu härten und potenzielle Bedrohungen abzuwehren.

## 🔐 Benutzer und Zugriffskontrolle

Der Zugriff auf das System einzuschränken ist die erste Verteidigungslinie für die Sicherheit.

### Starke Passwortrichtlinien durchsetzen

Mit dem `libpam-pwquality`-Modul können Sie Benutzer zwingen, sicherere Passwörter zu erstellen.

1.  **Modul installieren**:
    ```bash
    sudo apt update
    sudo apt install libpam-pwquality
    ```

2.  **Richtlinie konfigurieren**:
    Bearbeiten Sie die Datei `/etc/security/pwquality.conf`, um Passwortregeln zu definieren.
    ```ini
    # Beispielkonfiguration:
    minlen = 10                  # Minimale Länge ist 10
    dcredit = -1                 # Mindestens 1 Ziffer enthalten
    ucredit = -1                 # Mindestens 1 Großbuchstabe enthalten
    lcredit = -1                 # Mindestens 1 Kleinbuchstabe enthalten
    ocredit = -1                 # Mindestens 1 Sonderzeichen enthalten
    difok = 3                    # Mindestens 3 Zeichen im neuen Passwort müssen sich vom alten unterscheiden
    ```

### SSH-Sicherheit härten

Der gebräuchlichste Weg, um remote auf einen Server zuzugreifen, ist SSH. Hier sind einige Härtungsempfehlungen:

1.  **SSH-Konfigurationsdatei bearbeiten**:
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2.  **Empfohlene Konfiguration**:
    - **Root-Login deaktivieren**: `PermitRootLogin no`
    - **Passwortauthentifizierung deaktivieren (Schlüssel empfohlen)**: `PasswordAuthentication no`
    - **Public-Key-Authentifizierung aktivieren**: `PubkeyAuthentication yes`
    - **Standardport ändern (optional)**: `Port 2222`

3.  **SSH-Dienst neu starten**:
    ```bash
    sudo systemctl restart sshd
    ```

## 🔥 Firewall-Konfiguration (UFW)

Debian hat standardmäßig keine aktivierte Firewall. `UFW` (Uncomplicated Firewall) ist ein benutzerfreundliches Frontend-Tool. In Debian 13 verwendet UFW im Hintergrund das `nftables`-Framework (kompatibel mit der alten `iptables`-Syntax).

1.  **UFW installieren**:
    ```bash
    sudo apt install ufw
    ```

2.  **Grundlegende Regeln konfigurieren**:
    ```bash
    sudo ufw default deny incoming   # Alle eingehenden Verbindungen ablehnen
    sudo ufw default allow outgoing  # Alle ausgehenden Verbindungen erlauben
    sudo ufw allow ssh               # SSH-Verbindungen erlauben (oder Ihren geänderten Port)
    sudo ufw allow http              # Wenn Webserver, HTTP erlauben
    sudo ufw allow https             # HTTPS erlauben
    ```

3.  **UFW aktivieren**:
    ```bash
    sudo ufw enable
    ```
    Das System warnt Sie, dass dies bestehende SSH-Verbindungen unterbrechen könnte. Bestätigen Sie dies.

4.  **Status überprüfen**:
    ```bash
    sudo ufw status verbose
    ```

## 🔄 Automatische Sicherheitsupdates

Die zeitnahe Anwendung von Sicherheitspatches ist entscheidend. `unattended-upgrades` kann Sicherheitsupdates automatisch installieren.

1.  **Installieren**:
    ```bash
    sudo apt install unattended-upgrades
    ```

2.  **Aktivieren**:
    Führen Sie den Konfigurationsassistenten aus, der eine grundlegende Konfigurationsdatei erstellt.
    ```bash
    sudo dpkg-reconfigure -plow unattended-upgrades
    ```
    Wählen Sie im Dialogfeld "Ja".

3.  **Konfiguration feinabstimmen (optional)**:
    Sie können die Datei `/etc/apt/apt.conf.d/50unattended-upgrades` bearbeiten, um das Update-Verhalten anzupassen, z. B. automatische Neustarts zu aktivieren.

## 🛡️ Eindringlingsschutz (Fail2Ban)

`Fail2Ban` kann Logdateien überwachen und basierend auf verdächtigem Verhalten (wie mehrfach fehlgeschlagenen Login-Versuchen) automatisch Firewall-Regeln aktualisieren, um IP-Adressen zu blockieren.

1.  **Fail2Ban installieren**:
    ```bash
    sudo apt install fail2ban
    ```

2.  **Lokale Konfigurationsdatei erstellen**:
    Ändern Sie nicht direkt die `.conf`-Datei, sondern erstellen Sie eine `.local`-Datei zur Überschreibung.
    ```bash
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    sudo nano /etc/fail2ban/jail.local
    ```

3.  **SSH-Schutz konfigurieren**:
    Suchen Sie im `jail.local` den Abschnitt `[sshd]` und stellen Sie sicher, dass `enabled = true`. Sie können `maxretry` (maximale Versuche) und `bantime` (Blockierdauer) anpassen.
    ```ini
    [sshd]
    enabled = true
    port    = ssh
    maxretry = 3
    bantime = 3600  # Für 1 Stunde blockieren
    ```

4.  **Dienst neu starten**:
    ```bash
    sudo systemctl restart fail2ban
    ```

## 📝 Logverwaltung und Überwachung

Die regelmäßige Überprüfung der Systemprotokolle ist entscheidend, um anomale Aktivitäten zu erkennen.

- **Logs mit `journalctl` anzeigen**:
  ```bash
  # Alle Logs anzeigen (von alt nach neu)
  journalctl

  # Logs in Echtzeit überwachen
  journalctl -f

  # Logs eines bestimmten Dienstes anzeigen, z. B. sshd
  journalctl -u sshd.service

  # Kernel-Logs anzeigen
  journalctl -k
  ```