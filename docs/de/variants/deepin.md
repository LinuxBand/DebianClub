---
title: Deepin — Debian-Derivat
description: Eine optisch beeindruckende Debian-basierte Distribution aus China, die die selbst entwickelte DDE (Deepin Desktop Environment) präsentiert.
---

# Deepin

Deepin ist eine Linux-Distribution, die von Wuhan Deepin Technology Co., Ltd. in China entwickelt und gepflegt wird. Auf Debian stable basierend, ist sie vor allem für die selbst entwickelte DDE (Deepin Desktop Environment) bekannt, die weithin als eine der optisch ausgefeiltesten und verfeinertsten Desktop-Umgebungen gilt, die auf einem Betriebssystem verfügbar ist. Die aktuelle Hauptversionsreihe ist deepin 23.

## Grundlegende Informationen

| Eigenschaft | Details |
|---|---|
| Basiert auf | Debian stable |
| Veröffentlichungszyklus | Folgt Debian stable; deepin 23 ist die aktuelle Hauptreihe |
| Standard-Desktop | DDE (Deepin Desktop Environment) |
| Zielgruppe | Chinesische und internationale Desktop-Nutzer, UI-orientierte Nutzer, Einsteiger |
| Website | [https://www.deepin.org](https://www.deepin.org) |

## Hauptmerkmale

- **Beeindruckende DDE-Oberfläche**: Flüssige Animationen, eine einheitliche visuelle Sprache, ein macOS-inspiriertes Dock und ein einheitliches Kontrollzentrum machen DDE zu einer der ästhetisch ansprechendsten Desktop-Umgebungen auf jeder Plattform.
- **Chinesisches Anwendungs-Ökosystem**: Der Deepin App Store enthält native Linux-Versionen von WeChat, WPS Office, NetEase Cloud Music, Baidu Netdisk und weiteren in China häufig genutzten Anwendungen — nach der Installation sofort einsatzbereit.
- **DDE ist auf anderen Distributionen verfügbar**: DDE wurde auf Arch Linux, Fedora, NixOS und weitere portiert, sodass Sie den Deepin-Desktop erleben können, ohne zur vollständigen Deepin-Distribution wechseln zu müssen.
- **Architekturverbesserungen in deepin 23**: Basierend auf Debian 12 Bookworm führt deepin 23 das Linglong-Anwendungsformat für verbesserte Sandbox-Funktion und distributionsübergreifende App-Kompatibilität ein.
- **Aktive Open-Source-Community**: DDE und die meisten Deepin-Kernanwendungen sind Open Source, auf GitHub gehostet, mit einer aktiven internationalen Mitwirkendenbasis.

## Beziehung zu Debian

Deepin basiert direkt auf Debian stable und bezieht Pakete aus offiziellen Debian-Repositorien sowie Deepins eigenen proprietären und Community-Repositorien. Die DDE-Desktop-Umgebung, Deepin File Manager, Deepin Terminal, Deepin Screenshot und weitere mitgelieferte Anwendungen sind vollständig selbst entwickelt und nicht von Debian bezogen. deepin 23 ist auf Debian 12 Bookworm abgestimmt und folgt Debians Sicherheits-Update-Pfad.

## Erste Schritte

```bash
# Laden Sie das ISO von: https://www.deepin.org/en/download/ herunter
# Standard-64-Bit-Edition unterstützt sowohl UEFI als auch Legacy-BIOS

# Nach der Installation das System aktualisieren
sudo apt update && sudo apt full-upgrade -y

# Den Deepin App Store installieren (normalerweise vorinstalliert)
sudo apt install deepin-appstore -y

# DDE auf einem bestehenden Debian-12-System installieren (um den Desktop auszuprobieren)
sudo apt install dde -y

# Native WeChat-Linux-Version installieren (über Deepin-Repository)
sudo apt install com.tencent.weixin -y
```

## Für wen ist es geeignet?

- Nutzer, die eine schöne, ausgefeilte Desktop-Erfahrung unter Linux priorisieren
- Chinesische Nutzer, die nativen Zugang zu WeChat, WPS und anderen lokalen Anwendungen benötigen
- Nutzer, die von Windows oder macOS wechseln und eine vertraute, optisch ansprechende Oberfläche wünschen
- Entwickler und Designer, die an Linux-Desktop-UI-Innovation interessiert sind

## Weiterführende Links

- Website: [https://www.deepin.org](https://www.deepin.org)
- Download: [https://www.deepin.org/en/download/](https://www.deepin.org/en/download/)
- Wiki: [https://wiki.deepin.org](https://wiki.deepin.org)
- DDE-Quellcode: [https://github.com/linuxdeepin](https://github.com/linuxdeepin)
- Community-Forum: [https://bbs.deepin.org](https://bbs.deepin.org)

---

## Nächste Schritte

Kehren Sie zur [Übersicht der Debian-Derivate](/de/variants/) zurück, um andere Debian-basierte Distributionen zu erkunden.
