---
title: "Von Debian 12 auf Debian 13 upgraden"
description: "Vollständige Schritte für ein reibungsloses Upgrade von Debian 12 Bookworm auf Debian 13 Trixie, inklusive Migration zu deb822 und Überprüfung nach dem Upgrade"
---

# Von Debian 12 auf Debian 13 upgraden

Der Major-Upgrade-Prozess von Debian ist sehr zuverlässig, dennoch ist Vorsicht geboten. Dieser Artikel führt Sie durch ein reibungsloses Upgrade von **Debian 12 "Bookworm"** auf **Debian 13 "Trixie"**.

::: warning Wichtige Hinweise vor dem Upgrade
- **Sichern Sie unbedingt wichtige Daten** (mindestens `/home` und `/etc`).
- Führen Sie das Upgrade in einer stabilen Netzwerk- und Stromversorgungsumgebung durch, schließen Sie Laptops an die Stromversorgung an.
- Es wird empfohlen, den gesamten Artikel zuerst zu lesen, bevor Sie beginnen. Handelt es sich um einen Produktionsserver, führen Sie zuerst einen Test in einer Testumgebung durch.
:::

## Schritt 1: Aktuelles System vollständig aktualisieren

Aktualisieren Sie das vorhandene Debian 12 auf den neuesten Stand, um Konflikte während des Upgrades zu minimieren:

```bash
sudo apt update
sudo apt upgrade --without-new-pkgs
sudo apt full-upgrade
sudo apt autoremove
```

Bestätigen Sie, dass es sich tatsächlich um Debian 12 handelt:

```bash
lsb_release -a
# Sollte anzeigen: Release: 12, Codename: bookworm
```

## Schritt 2: Installierte Drittanbieter-Quellen prüfen und notieren

Drittanbieter-Quellen (wie Repos von Docker, Chrome) können bei Major-Upgrades inkompatibel sein. Es wird empfohlen, sie vorübergehend zu **deaktivieren** und nach dem Upgrade nach und nach wieder zu aktivieren:

```bash
# Alle Quelldateien anzeigen
ls /etc/apt/sources.list.d/
```

Sie können die Drittanbieter-Dateien `.list` / `.sources` vorübergehend verschieben und nur die offiziellen Debian-Quellen für das Upgrade behalten.

## Schritt 3: Softwarequellen auf trixie ändern

Dies ist der wichtigste Schritt – ändern Sie den Distributions-Codename von `bookworm` zu `trixie`.

**Falls Sie die traditionelle `sources.list` verwenden:**

```bash
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
```

**Falls Sie das deb822-Format verwenden** (Debian 12 kann auch `/etc/apt/sources.list.d/debian.sources` verwenden):

```bash
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list.d/debian.sources
```

::: tip Hinweis zur Änderung des Sicherheits-Paketnamens
Die alte Sicherheitsquelle hieß `bookworm-security`, die neue entsprechend `trixie-security`. Der obige Befehl ersetzt dies gleich mit. Öffnen Sie die Datei zur Überprüfung, ob alle `bookworm*` zu `trixie*` geändert wurden.
:::

Vergessen Sie nicht, auch die anderen offiziellen Quelldateien unter `/etc/apt/sources.list.d/` zu überprüfen und zu ersetzen.

## Schritt 4: Upgrade durchführen

```bash
# 1. Paketliste mit den neuen trixie-Quellen aktualisieren
sudo apt update

# 2. Minimales Upgrade (zuerst Kernpakete upgraden, geringeres Konfliktrisiko)
sudo apt upgrade --without-new-pkgs

# 3. Vollständiges Upgrade (neuen Kernel installieren, Abhängigkeitsänderungen behandeln, neue Pakete installieren)
sudo apt full-upgrade
```

Das vollständige Upgrade lädt viele Dateien herunter und dauert länger. Währenddessen können Konflikte bei Konfigurationsdateien auftreten. **In der Regel ist es sicher, die Version des Paketbetreuers zu installieren** (es sei denn, Sie haben die Konfiguration tatsächlich manuell geändert).

## Schritt 5: Neustart und Überprüfung

```bash
sudo reboot
```

Nach dem Neustart überprüfen:

```bash
lsb_release -a
# Sollte anzeigen: Release: 13, Codename: trixie

uname -r
# Kernel sollte die Serie 6.12 sein
```

## Schritt 6: Aufräumen und Abschluss nach dem Upgrade

```bash
# Alte Pakete aus dem Upgrade entfernen
sudo apt autoremove --purge

# Optional: Quellen in das standardmäßige deb822-Format von Debian 13 migrieren
sudo apt modernize-sources
```

Stellen Sie anschließend nacheinander die zuvor deaktivierten Drittanbieter-Quellen wieder her und bestätigen Sie, dass sie eine trixie- (oder kompatible) Version anbieten. Weitere Informationen zu deb822 finden Sie unter [deb822-Quellenformat](/de/administration/deb822).

## Häufige Fragen

- **Unterbrochenes Upgrade / Netzwerkausfall**: Nach Wiederherstellung der Netzwerkverbindung `sudo apt full-upgrade` erneut ausführen; APT setzt fort.
- **Einige Pakete werden zurückgehalten (kept back)**: Normalerweise löst `sudo apt full-upgrade` das Problem.
- **Mehrere Major-Versionen überspringen** (z.B. von Debian 11): **Nicht überspringen**, sondern zuerst auf Debian 12 und dann auf Debian 13 upgraden.

## Zusammenfassung

1. Aktuelles System aktualisieren → 2. Drittanbieter-Quellen behandeln → 3. Quell-Codename `bookworm`→`trixie` → 4. `update` + `upgrade` + `full-upgrade` → 5. Neustart und Überprüfung → 6. Aufräumen und Migration zu deb822.

Weiterführende Literatur: [deb822-Quellenformat](/de/administration/deb822) · [APT-Paketverwaltung](/de/administration/packages)
