---
title: Debian-Derivate
description: Eine Übersicht der bekanntesten Linux-Distributionen, die auf Debian basieren
---

# Debian-Derivate

Debian dient als Upstream-Grundlage für Hunderte bekannter Linux-Distributionen. Dank seines robusten Paket-Ökosystems, strenger Qualitätsstandards und des ausgereiften APT-Paketmanagers bauen zahlreiche Projekte auf Debian auf, um unterschiedliche Zielgruppen und Anwendungsfälle zu bedienen.

Im Folgenden finden Sie eine kuratierte Übersicht von zehn der bekanntesten Debian-Derivate — von Desktop-Nutzbarkeit über Penetrationstests und Datenschutz bis hin zu extrem ressourcenschonenden Umgebungen.

## Vergleichstabelle

| Distribution | Basiert auf | Desktop | Zielgruppe | Highlights |
|---|---|---|---|---|
| [Ubuntu](/de/variants/ubuntu) | Debian unstable/testing | GNOME | Allgemeine Nutzer | Beliebtestes Desktop-Linux |
| [Kali Linux](/de/variants/kali) | Debian testing | Xfce | Sicherheitsforscher | 600+ Pentesting-Werkzeuge |
| [Linux Mint / LMDE](/de/variants/mint) | Ubuntu / Debian stable | Cinnamon | Einsteiger | Äußerst benutzerfreundlich |
| [MX Linux](/de/variants/mx-linux) | Debian stable | Xfce | Fortgeschrittene | Leichtgewichtig, stabil, gut ausgestattet |
| [Raspberry Pi OS](/de/variants/raspberry-pi-os) | Debian | LXDE/Pixel | Pi-Hardware-Nutzer | ARM-optimiert, offiziell |
| [Tails](/de/variants/tails) | Debian stable | GNOME | Datenschutz-Nutzer | Tor-Routing, hinterlässt keine Spuren |
| [Parrot OS](/de/variants/parrot) | Debian testing | MATE/KDE | Sicherheit/Entwickler | Sicherheitswerkzeuge + täglicher Einsatz |
| [Deepin](/de/variants/deepin) | Debian stable | DDE | Chinesische & internationale Nutzer | Schöne Oberfläche, eigener Desktop |
| [Devuan](/de/variants/devuan) | Debian | Xfce/andere | Anti-systemd-Nutzer | Ersetzt systemd durch sysvinit |
| [antiX](/de/variants/antix) | Debian stable | IceWM | Nutzer älterer Hardware | Läuft mit 256 MB RAM |

## Einzelne Distributionen im Überblick

### [Ubuntu](/de/variants/ubuntu)
Die weltweit beliebteste Desktop-Linux-Distribution, gepflegt von Canonical Ltd. Sie erscheint alle sechs Monate mit einer LTS-Version (Long-Term Support) alle zwei Jahre. Ubuntu verfügt über ein riesiges Ökosystem und starke Community-Unterstützung.

### [Kali Linux](/de/variants/kali)
Speziell für Penetrationstests und Cybersicherheitsforschung entwickelt, mit über 600 vorinstallierten Sicherheitswerkzeugen. Gepflegt von Offensive Security, folgt einem Rolling-Release-Modell auf Basis von Debian testing.

### [Linux Mint / LMDE](/de/variants/mint)
Bekannt für seine Einfachheit und Zugänglichkeit. Die Hauptversion basiert auf Ubuntu; LMDE (Linux Mint Debian Edition) basiert direkt auf Debian stable. Eine Top-Wahl für Nutzer, die von Windows wechseln.

### [MX Linux](/de/variants/mx-linux)
Ein dauerhafter DistroWatch-Favorit, der Debian stables Zuverlässigkeit mit der MX-Tools-Suite und dem leichtgewichtigen antiX-Unterbau kombiniert. Bietet eine ausgezeichnete Balance zwischen Leistung und Bedienbarkeit.

### [Raspberry Pi OS](/de/variants/raspberry-pi-os)
Das offiziell empfohlene Betriebssystem für Raspberry-Pi-Hardware, basierend auf Debian und tiefgehend für ARM-Prozessoren optimiert. Erhältlich in Desktop- und Lite-Editionen (ohne grafische Oberfläche).

### [Tails](/de/variants/tails)
Ein amnesisches Live-System, das von Grund auf für Datenschutz und Anonymität konzipiert wurde. Der gesamte Netzwerkverkehr wird über Tor geleitet, und das System hinterlässt nach dem Herunterfahren keine Spuren auf dem Hostrechner.

### [Parrot OS](/de/variants/parrot)
Entwickelt vom italienischen Frozenbox-Team, vereint Parrot OS Sicherheitswerkzeuge mit alltäglicher Desktop-Nutzung. Es bietet Security-, Home- und HTB-Editionen für verschiedene Arbeitsabläufe.

### [Deepin](/de/variants/deepin)
Entwickelt von Wuhan Deepin Technology (China), zeichnet sich Deepin durch die beeindruckende DDE (Deepin Desktop Environment) aus, die weithin als einer der optisch ausgefeiltesten Linux-Desktops gilt.

### [Devuan](/de/variants/devuan)
Ein Fork von Debian, der systemd durch traditionelle Init-Systeme (sysvinit, runit oder OpenRC) ersetzt. Die Versionsnummern orientieren sich an Debian — Devuan 5 Daedalus entspricht Debian 12 Bookworm.

### [antiX](/de/variants/antix)
Ein extrem leichtgewichtiges Debian-Derivat, das problemlos mit nur 256 MB RAM läuft. Es verwendet sysvinit statt systemd und unterstützt ältere 32-Bit-Hardware, was es ideal macht, um alten Rechnern neues Leben einzuhauchen.

---

::: tip Wie wähle ich die richtige Distribution?
- Alltäglicher Desktop, reiches Ökosystem → **Ubuntu** oder **Linux Mint**
- Penetrationstests / Sicherheitsforschung → **Kali Linux** oder **Parrot OS**
- Datenschutz und Anonymität → **Tails**
- Raspberry-Pi-Projekte → **Raspberry Pi OS**
- Alte oder schwache Hardware → **antiX** oder **MX Linux**
- Schöne Oberfläche → **Deepin**
- Kein systemd → **Devuan** oder **antiX**
:::
