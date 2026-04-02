---
title: Installationsanleitung
description: Vollständige Schritt-für-Schritt Installationsanleitung für Debian 13
---

# Debian 13 Installationsanleitung

## Vorbereitung vor der Installation

- ✅ Bootfähiges Medium erstellt
- ✅ Wichtige Daten gesichert
- ✅ Netzwerkverbindung verfügbar (empfohlen)

::: warning Wichtig
Eine Neuinstallation **löscht alle Daten** auf der Festplatte! Sichern Sie wichtige Dateien.
:::

## Den Installer starten

### BIOS/UEFI-Einstellungen aufrufen

Übliche Tasten:
- **Dell**: F2 oder F12
- **HP**: F10 oder F9
- **Lenovo**: F1 oder F12
- **ASUS**: F2 oder Del

### Installationsschritte

1. **Sprache wählen** — Deutsch oder Ihre bevorzugte Sprache
2. **Netzwerk konfigurieren** — Kabelverbindung empfohlen
3. **Festplatte partitionieren** — Geführte Partitionierung für Anfänger
4. **Basissystem installieren** — Automatischer Download
5. **Software auswählen** — Desktop-Umgebung wählen
6. **GRUB-Bootloader installieren** — Auf Hauptfestplatte installieren
7. **Installation abschließen** — Neustart

## Empfohlenes Partitionierungsschema

| Partition | Größe | Dateisystem | Hinweise |
|-----------|-------|-------------|---------|
| `/boot/efi` | 512 MB | FAT32 | Nur UEFI-Systeme |
| `/` | 20-50 GB | ext4 | Root-Partition |
| `swap` | 2-8 GB | swap | Virtueller Speicher |
| `/home` | Verbleibender Platz | ext4 | Benutzerdaten |

## Nächste Schritte

- [Erster Start](/de/basics/first-boot)
- [Systemkonfiguration](/de/basics/configuration)
