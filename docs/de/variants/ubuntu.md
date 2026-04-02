---
title: Ubuntu — Debian-Derivat
description: Die weltweit beliebteste Debian-basierte Linux-Distribution, gepflegt von Canonical Ltd.
---

# Ubuntu

Ubuntu ist die am weitesten verbreitete Desktop-Linux-Distribution der Welt, gegründet von Canonical Ltd. im Jahr 2004. Aufgebaut auf der Paketinfrastruktur von Debian, zielt sie darauf ab, gewöhnlichen Nutzern und Unternehmensservern gleichermaßen eine sofort einsatzbereite Erfahrung zu bieten. Ubuntu veröffentlicht alle sechs Monate eine neue Version, mit einer LTS-Version (Long-Term Support) alle zwei Jahre.

## Grundlegende Informationen

| Eigenschaft | Details |
|---|---|
| Basiert auf | Debian unstable / testing |
| Veröffentlichungszyklus | Alle 6 Monate (April/Oktober); LTS alle 2 Jahre |
| Standard-Desktop | GNOME (Haupt), mit offiziellen Varianten: KDE, Xfce, MATE, LXQt |
| Zielgruppe | Desktop-Nutzer, Entwickler, Unternehmensserver |
| Website | [https://ubuntu.com](https://ubuntu.com) |

## Hauptmerkmale

- **Riesiges Ökosystem**: Die APT-Repositorien enthalten Zehntausende von Paketen, und der Snap Store ergänzt dies für nahezu jeden denkbaren Anwendungsfall.
- **Langzeitunterstützung**: LTS-Versionen erhalten 5 Jahre Standard-Updates (erweiterbar auf 10 Jahre mit Ubuntu Pro), was ihren Einsatz in Produktionsumgebungen sehr verbreitet macht.
- **Offizielle Varianten**: Kubuntu (KDE), Xubuntu (Xfce), Lubuntu (LXQt), Ubuntu MATE und weitere — jede bietet einen anderen Desktop bei gemeinsamer Ubuntu-Basis.
- **Erstklassige Cloud-Unterstützung**: Ubuntu ist das beliebteste Linux-Image auf AWS, Azure und GCP sowie eine primäre Basis für offizielle Docker-Images.
- **Reichhaltige Community-Ressourcen**: Ask Ubuntu, offizielle Foren und umfangreiche Drittanbieter-Dokumentation machen die Hilfesuche unkompliziert.

## Beziehung zu Debian

Ubuntu synchronisiert Pakete aus Debians unstable (Sid) und testing-Zweigen und beginnt etwa fünf Monate vor jeder Veröffentlichung mit einem Einfrieren der Pakete. Canonical wendet Ubuntu-spezifische Patches an — insbesondere beim Kernel und den Hardware-Unterstützungsschichten — und pflegt separate Paket-Repositorien. Viele Ubuntu-Verbesserungen werden als Beitrag an Debian weitergegeben. Aufgrund unterschiedlicher Veröffentlichungszyklen kann die Version eines bestimmten Pakets zwischen Ubuntu und Debian abweichen.

## Erste Schritte

```bash
# Laden Sie das ISO von ubuntu.com herunter und schreiben Sie es auf einen USB-Stick
# Oder aktualisieren Sie ein bestehendes Ubuntu-System:

# Aktuelle Version prüfen
lsb_release -a

# Auf die nächste LTS-Version aktualisieren
sudo do-release-upgrade -d

# Alle Pakete auf einem laufenden System aktualisieren
sudo apt update && sudo apt upgrade -y

# Gängige Entwicklungswerkzeuge installieren
sudo apt install build-essential curl wget git -y
```

ISO-Images können Sie von [https://ubuntu.com/download](https://ubuntu.com/download) herunterladen und mit Rufus (Windows) oder `dd` (Linux/macOS) auf einen USB-Stick schreiben.

## Für wen ist es geeignet?

- Nutzer, die zum ersten Mal von Windows oder macOS zu Linux wechseln
- Entwickler, die eine stabile, gut dokumentierte Umgebung benötigen
- Enterprise-Systemadministratoren, die Langzeitunterstützung und kommerziellen Rückhalt benötigen
- Alle, die schnell und unkompliziert mit Linux beginnen möchten

## Weiterführende Links

- Website: [https://ubuntu.com](https://ubuntu.com)
- Download: [https://ubuntu.com/download](https://ubuntu.com/download)
- Dokumentation: [https://help.ubuntu.com](https://help.ubuntu.com)
- Ask Ubuntu: [https://askubuntu.com](https://askubuntu.com)
- Community-Foren: [https://ubuntuforums.org](https://ubuntuforums.org)

---

## Nächste Schritte

Kehren Sie zur [Übersicht der Debian-Derivate](/de/variants/) zurück, um andere Debian-basierte Distributionen zu erkunden.
