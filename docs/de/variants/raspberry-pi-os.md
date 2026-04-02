---
title: Raspberry Pi OS — Debian-Derivat
description: Das offizielle Betriebssystem für Raspberry-Pi-Hardware, basierend auf Debian und optimiert für ARM-Prozessoren.
---

# Raspberry Pi OS

Raspberry Pi OS (früher Raspbian) ist das von der Raspberry Pi Foundation entwickelte und empfohlene Betriebssystem. Auf Debian basierend und tiefgehend für die ARM-Prozessoren in Raspberry-Pi-Hardware optimiert, ist es die Standardwahl für Pi-basierte Projekte — von Bildung und Programmierung bis hin zu Heimautomatisierung und Media-Centern.

## Grundlegende Informationen

| Eigenschaft | Details |
|---|---|
| Basiert auf | Debian (folgt dem Debian-Veröffentlichungszyklus) |
| Veröffentlichungszyklus | Folgt Debian stable; regelmäßige aktualisierte Images |
| Standard-Desktop | LXDE (angepasst als Pixel-Desktop); Lite-Edition ohne grafische Oberfläche |
| Zielgruppe | Raspberry-Pi-Besitzer, Studenten, Lehrende, Embedded-Entwickler |
| Website | [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/) |

## Hauptmerkmale

- **Tiefgehende ARM-Optimierung**: Neu kompiliert für ARM-Cortex-A-Prozessoren, mit GPU-Hardware-Beschleunigung und eingebauter VideoCore-Treiberunterstützung, um die Hardware-Fähigkeiten des Pi voll auszuschöpfen.
- **Mehrere Editionen**: Desktop- (mit Pixel-GUI), Lite- (minimal, ohne grafische Oberfläche) und Full-Editionen (Desktop plus empfohlene Software) bedienen unterschiedliche Anforderungen — vom voll ausgestatteten Desktop bis zum schlanken Server-Image.
- **Raspberry Pi Imager**: Das offizielle Flash-Werkzeug ermöglicht das Durchsuchen, Herunterladen und Schreiben von OS-Images auf eine microSD-Karte in einem Schritt. Es unterstützt auch die Vorab-Konfiguration von WLAN-Zugangsdaten, SSH, Hostname und Benutzerkonten vor dem ersten Start.
- **Bildungsorientierte Software**: Vorinstalliertes Scratch 3, Thonny Python IDE und Wolfram Mathematica (kostenlos für nichtkommerzielle Nutzung) machen es zu einer idealen Plattform für MINT-Bildung.
- **GPIO-Bibliotheksunterstützung**: Eingebaute RPi.GPIO- und pigpio-Bibliotheken ermöglichen eine einfache Interaktion mit dem 40-poligen GPIO-Header von Python oder anderen Sprachen aus.

## Beziehung zu Debian

Raspberry Pi OS folgt eng Debian, wobei die aktuelle Version auf Debian 12 Bookworm basiert. Es verwendet das standardmäßige Debian-APT-Paketverwaltungssystem, sodass die große Mehrheit der Debian-Pakete ohne Änderungen installiert werden kann. Auf Debian aufbauend, wendet die Raspberry Pi Foundation ARM-spezifische Kernel-Patches, proprietäre VideoCore-GPU-Firmware, dedizierte Hardware-Treiber und die Pixel-Desktop-Anpassungen an.

## Erste Schritte

```bash
# Empfohlen: Raspberry Pi Imager verwenden (GUI-Werkzeug)
# Download unter: https://www.raspberrypi.com/software/

# Kommandozeilen-Alternative (Linux/macOS):
wget https://downloads.raspberrypi.com/raspios_lite_arm64/images/latest/raspios_lite_arm64.img.xz
xz -d raspios_lite_arm64.img.xz
sudo dd if=raspios_lite_arm64.img of=/dev/sdX bs=4M status=progress
sync

# Nach dem ersten Start das System aktualisieren
sudo apt update && sudo apt full-upgrade -y

# Schnittstellen konfigurieren (Kamera, SPI, I2C, SSH usw.)
sudo raspi-config
```

## Für wen ist es geeignet?

- Alle, die einen Raspberry Pi besitzen — vom ursprünglichen Modell B bis zum Pi 5
- Studenten und Lehrende, die eine erschwingliche, praxisorientierte Linux- und Programmierumgebung suchen
- Maker und Hobbyisten, die IoT-, Robotik- oder Heimautomatisierungsprojekte entwickeln
- Nutzer, die einen stromsparenden, kostengünstigen Linux-Server oder ein Media-Center möchten

## Weiterführende Links

- Website: [https://www.raspberrypi.com/software/](https://www.raspberrypi.com/software/)
- Dokumentation: [https://www.raspberrypi.com/documentation/](https://www.raspberrypi.com/documentation/)
- GPIO-Referenz: [https://www.raspberrypi.com/documentation/computers/raspberry-pi.html](https://www.raspberrypi.com/documentation/computers/raspberry-pi.html)
- Community-Foren: [https://forums.raspberrypi.com](https://forums.raspberrypi.com)

---

## Nächste Schritte

Kehren Sie zur [Übersicht der Debian-Derivate](/de/variants/) zurück, um andere Debian-basierte Distributionen zu erkunden.
