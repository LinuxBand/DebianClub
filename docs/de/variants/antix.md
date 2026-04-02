---
title: antiX — Debian-Derivat
description: Ein ultra-leichtes Debian-Derivat, das mit nur 256 MB RAM auskommt, sysvinit verwendet und altem Hardware neues Leben einhaucht.
---

# antiX

antiX ist ein extrem leichtgewichtiges Debian-Stable-Derivat unter der Leitung des griechischen Entwicklers anticapitalista, das speziell für alte Computer und ressourcenarme Hardware entwickelt wurde. Es läuft ohne systemd (verwendet stattdessen sysvinit) und kommt mit nur 256 MB RAM komfortabel aus. Es ist auch die Grundschicht, auf der MX Linux aufgebaut ist.

## Grundlegende Informationen

| Attribut | Details |
|---|---|
| Basiert auf | Debian stable |
| Veröffentlichungszyklus | Folgt Debian stable; periodische aktualisierte Releases |
| Standard-Desktop | IceWM (Standard), Fluxbox, JWM, Herbstluftwm |
| Zielgruppe | Besitzer alter Hardware, Minimalisten, Anti-systemd-Nutzer |
| Website | [https://antixlinux.com](https://antixlinux.com) |

## Hauptmerkmale

- **Radikal leichter Fußabdruck**: Ein vollständiger antiX-Desktop läuft mit 150–200 MB RAM im Leerlauf.
- **Kein systemd**: antiX verwendet sysvinit als Init-System.
- **Vier Installationseditionen**: Full, Base, Core (nur Kommandozeile) und Net.
- **Legacy 32-Bit-Unterstützung**: Eine der wenigen aktiv gepflegten Distributionen, die noch 32-Bit-Images bereitstellt.

## Erste Schritte

```bash
# Herunterladen von: https://antixlinux.com/download/
# Verfügbar in Full, Base, Core und Net Editionen — 32-Bit und 64-Bit

# Nach der Installation das System aktualisieren
sudo apt update && sudo apt upgrade -y

# RAM-Nutzung überprüfen
free -h

# Dienstverwaltung mit sysvinit
sudo service <dienstname> start
sudo update-rc.d <dienstname> enable
```

::: tip antiX vs. MX Linux
antiX ist die extremere Wahl — schlanker, näher an der Kommandozeile. MX Linux baut auf antiX auf, fügt aber grafische Werkzeuge und eine benutzerfreundlichere Oberfläche hinzu.
:::

## Verwandte Links

- Website: [https://antixlinux.com](https://antixlinux.com)
- Download: [https://antixlinux.com/download/](https://antixlinux.com/download/)
- Community-Foren: [https://www.antixforum.com](https://www.antixforum.com)

---

## Nächste Schritte

Zurück zur [Übersicht der Debian-Derivate](/de/variants/).
