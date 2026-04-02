---
title: Parrot OS — Debian-Derivat
description: Eine Debian-basierte Rolling-Release-Distribution, die Sicherheitsforschungswerkzeuge mit einem leistungsfähigen Alltagsdesktop verbindet, in den Editionen Security, Home und HTB.
---

# Parrot OS

Parrot OS (auch als ParrotSec bekannt) ist eine Debian-basierte Rolling-Release-Distribution, die vom italienischen Frozenbox-Team entwickelt wird. Anders als rein sicherheitsorientierte Distributionen ist Parrot OS darauf ausgelegt, sowohl eine leistungsfähige Sicherheitsforschungsplattform als auch ein komfortabler Alltagsdesktop zu sein. Es bietet mehrere eigenständige Editionen für verschiedene Arbeitsabläufe.

## Grundlegende Informationen

| Eigenschaft | Details |
|---|---|
| Basiert auf | Debian testing (rolling) |
| Veröffentlichungszyklus | Rolling Release |
| Standard-Desktop | MATE (Security/Home), KDE Plasma (optional) |
| Zielgruppe | Sicherheitsforscher, Entwickler, datenschutzbewusste Desktop-Nutzer |
| Website | [https://parrotsec.org](https://parrotsec.org) |

## Hauptmerkmale

- **Mehrere zweckspezifische Editionen**: Security (vollständiges Pentesting-Toolkit), Home (leichtgewichtiger Alltagsdesktop), HTB (vorkonfiguriert für Hack The Box) sowie Cloud/Docker-Editionen für Server- und Container-Einsatz.
- **Leichter als Kali**: Der MATE-Desktop in Kombination mit Parrots Kernel-Optimierungen hält den RAM-Verbrauch niedriger als bei Kali Linux. Das System läuft komfortabel mit 2 GB RAM.
- **Eingebaute Datenschutz-Werkzeuge**: AnonSurf (Tor-Routing für den gesamten Datenverkehr per Mausklick), Firejail-Anwendungs-Sandboxing und OnionShare sind enthalten und bieten alltäglichen Nutzern starke Datenschutzkontrollen ohne zusätzliche Konfiguration.
- **Entwicklerfreundliche Home-Edition**: Die Home-Edition wird ohne schwere Sicherheitswerkzeuge ausgeliefert, enthält aber populäre Programmier-Laufzeitumgebungen und Entwicklungswerkzeuge — und ist damit ein geeigneter Alltagsrechner für Programmierer.
- **Rolling Updates**: Basierend auf Debian testing bleibt die Software aktuell ohne periodische Neuinstallationen.

## Beziehung zu Debian

Parrot OS basiert auf Debian testing und bezieht die meisten Pakete direkt aus diesem Zweig, ergänzt durch das Parrot-Repository (das Sicherheitswerkzeuge, proprietäre Software und Pakete in neueren Versionen enthält). Das Parrot-Team pflegt sicherheitsgehärtete Kernel-Patches und ein eigenes Werkzeug-Repository. Da es Debian testing statt stable folgt, sind Softwareversionen aktueller, aber die Systemstabilität ist etwas geringer als bei stable-basierten Distributionen.

## Erste Schritte

```bash
# Laden Sie das passende Editions-ISO von: https://parrotsec.org/download/ herunter

# Nach der Installation mit dem Parrot-Upgrade-Befehl aktualisieren
sudo parrot-upgrade
# Entspricht:
sudo apt update && sudo apt full-upgrade -y

# AnonSurf aktivieren, um den gesamten Datenverkehr über Tor zu leiten
sudo anonsurf start
sudo anonsurf status
sudo anonsurf stop

# Bei Bedarf zusätzliche Sicherheitswerkzeuge installieren
sudo apt install metasploit-framework burpsuite -y
```

## Für wen ist es geeignet?

- Sicherheitspraktiker, die eine Umgebung suchen, die auch als Alltagsdesktop taugt
- Studenten auf Hack The Box, TryHackMe oder ähnlichen Plattformen (die HTB-Edition ist vorkonfiguriert)
- Datenschutzbewusste Nutzer, die Tor-Routing per Mausklick ohne ein reines Live-System wünschen
- Entwickler, die eine moderne Rolling-Release-Debian-Basis mit eingebauten Datenschutz-Werkzeugen suchen

::: tip Parrot OS vs. Kali Linux
Kali Linux priorisiert die Vollständigkeit seiner Sicherheitswerkzeug-Bibliothek und ist eng auf professionelles Pentesting ausgerichtet. Parrot OS passt besser, wenn Sie eine Allzweck-Workstation suchen, die auch Sicherheitsarbeit übernimmt — insbesondere auf weniger leistungsstarker Hardware.
:::

## Weiterführende Links

- Website: [https://parrotsec.org](https://parrotsec.org)
- Download: [https://parrotsec.org/download/](https://parrotsec.org/download/)
- Dokumentation: [https://parrotsec.org/docs/](https://parrotsec.org/docs/)
- GitLab (Quellcode): [https://gitlab.com/parrotsec](https://gitlab.com/parrotsec)

---

## Nächste Schritte

Kehren Sie zur [Übersicht der Debian-Derivate](/de/variants/) zurück, um andere Debian-basierte Distributionen zu erkunden.
