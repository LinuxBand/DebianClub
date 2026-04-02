---
title: Systemanforderungen
description: Hardwareanforderungsprüfung und Kompatibilitätsleitfaden vor der Installation von Debian 13
---

# Systemanforderungen prüfen

Bevor Sie Debian 13 installieren, ist es sehr wichtig sicherzustellen, dass Ihr Computer die grundlegenden Anforderungen erfüllt. Diese Seite hilft Ihnen, die Hardwarekompatibilität und Systemanforderungen zu überprüfen.

## 🖥️ Hardwareanforderungen

### Minimale Systemanforderungen

| Komponente | Mindestanforderung | Erläuterung |
|------------|-------------------|-------------|
| **Prozessor** | 1 GHz Single-Core | amd64-Architektur (empfohlen) oder arm64 |
| **Arbeitsspeicher** | 2 GB RAM | Desktop-Umgebung benötigt mehr RAM |
| **Speicher** | 25 GB | Enthält Basissystem und Anwendungen |
| **Grafikkarte** | Unterstützt 1024×768 | Integrierte Grafik reicht aus |
| **Netzwerk** | Kabelgebunden oder WLAN | Softwarequellen nach der Installation konfigurieren |

### Empfohlene Konfiguration

| Komponente | Empfohlene Konfiguration | Vorteile |
|------------|--------------------------|----------|
| **Prozessor** | Dual-Core 2 GHz+ | Flüssigeres Multitasking |
| **Arbeitsspeicher** | 8 GB RAM+ | Unterstützt gleichzeitiges Ausführen mehrerer Apps |
| **Speicher** | 50 GB SSD | Schnellerer Start und bessere Reaktionszeiten |
| **Grafikkarte** | Dedizierte Grafikkarte | Unterstützt Hardwarebeschleunigung und Spiele |

::: tip 💡 Tipp für Einsteiger
Wenn Sie sich bei Ihrer Hardwarekonfiguration unsicher sind, können Sie in Windows <span class="kbd">Win + R</span> drücken und `dxdiag` eingeben, um Systeminformationen anzuzeigen.
:::

## 🔍 Hardwarekompatibilität prüfen

### 1. Prozessorarchitektur prüfen

Debian 13 unterstützt mehrere Prozessorarchitekturen:

#### Unterstützte Architekturen
- **amd64** (64-Bit) - Intel/AMD 64-Bit-Prozessoren (Hauptempfehlung)
- **arm64** - ARM 64-Bit-Prozessoren (neue Macs, Raspberry Pi 4 usw.)
- **armhf** - ARM 32-Bit-Prozessoren (ältere Raspberry Pis usw.)
- **riscv64** - RISC-V 64-Bit-Prozessoren (🆕 Neu in Debian 13)
- **ppc64el** - IBM Power Little-Endian 64-Bit-Prozessoren
- **s390x** - IBM z/Architecture 64-Bit-Prozessoren

::: warning i386 (32-Bit) Unterstützungsstatus
Debian 13 (Trixie) **bietet i386 nicht mehr als reguläre Installationsarchitektur**. Es gibt keinen offiziellen i386-Installationskernel und keinen Debian Installer für i386. i386 bleibt in Debian für den Zweck erhalten: 32-Bit-Anwendungen im Multiarch-Modus auf einem amd64-System auszuführen, nicht für die eigenständige Installation eines vollständigen i386-Systems. Wenn Ihre Hardware wirklich nur 32-Bit unterstützt, ziehen Sie Distributionen wie antiX Linux in Betracht, die weiterhin i386-Installationsversionen pflegen.
:::

#### So prüfen Sie Ihre Architektur

**Unter Windows:**
```cmd
# Drücken Sie Win + R, geben Sie cmd ein und führen Sie dann aus:
wmic computersystem get systemtype
```

**Auf einem bestehenden Linux-System:**
```bash
# Prozessorarchitektur anzeigen
uname -m
```

### 2. Arbeitsspeicher prüfen

#### Speicherbedarf verschiedener Desktop-Umgebungen

| Desktop-Umgebung | Mindestspeicher | Empfohlener Speicher | Merkmale |
|------------------|-----------------|----------------------|----------|
| **GNOME** | 4 GB | 8 GB | Modern, funktionsreich |
| **KDE Plasma** | 4 GB | 8 GB | Hochgradig anpassbar |
| **Xfce** | 2 GB | 4 GB | Leichtgewichtig, geeignet für alte Rechner |
| **LXDE** | 1 GB | 2 GB | Äußerst minimalistisch und leicht |
| **Kommandozeile** | 512 MB | 1 GB | Nur Textoberfläche |

::: warning ⚠️ Auswirkungen von zu wenig Arbeitsspeicher
Bei unzureichendem Arbeitsspeicher nutzt das System möglicherweise häufig den Auslagerungsspeicher, was zu erheblichen Leistungseinbußen führt.
:::

### 3. Speicherplatz prüfen

#### Empfehlungen zur Festplattenplatzaufteilung

```bash
# Empfohlenes Partitionierungsschema (50 GB Gesamtspeicher)
/          # Root-Partition: 25 GB
/home      # Benutzerverzeichnis: 20 GB  
swap       # Swap-Partition: 4 GB (entspricht der RAM-Größe)
/boot/efi  # EFI-Partition: 1 GB (UEFI-System)
```

#### Speicherplatzbedarf für verschiedene Zwecke

| Zweck | Mindestspeicher | Empfohlener Speicher | Erläuterung |
|-------|-----------------|----------------------|-------------|
| **Basissystem** | 10 GB | 20 GB | Nur Kernsystem |
| **Desktop-Nutzung** | 25 GB | 50 GB | Enthält Bürosoftware |
| **Entwicklungsumgebung** | 50 GB | 100 GB | Enthält Entwicklungswerkzeuge |
| **Multimedia-Arbeit** | 100 GB | 500 GB+ | Videobearbeitung usw. |

## 🔧 Hardwarekompatibilität

### Grafikkartenkompatibilität

#### NVIDIA-Grafikkarten
```bash
# NVIDIA-Unterstützung in Debian
✅ Open-Source-Treiber: nouveau (Standard)
✅ Offizielle Treiber: nvidia-driver (muss zusätzlich installiert werden)
⚠️  Ältere Modelle möglicherweise eingeschränkt unterstützt
```

#### AMD-Grafikkarten
```bash
# AMD-Grafikkartenunterstützung
✅ Open-Source-Treiber: radeon/amdgpu (Standard)
✅ Offizielle Treiber: amdgpu-pro (optional)
✅ Die meisten Modelle gut unterstützt
```

#### Intel-Integrierte Grafik
```bash
# Intel-Grafikunterstützung
✅ Open-Source-Treiber: i915 (Standard)
✅ Hervorragende Unterstützung, funktioniert sofort
✅ Gute Hardwarebeschleunigungsunterstützung
```

### Netzwerkgerätekompatibilität

#### Wi-Fi-Chipsätze
Die meisten modernen Wi-Fi-Chipsätze werden gut unterstützt, einige benötigen jedoch nicht-freie Firmware:

| Hersteller | Unterstützung | Hinweise |
|------------|---------------|----------|
| **Intel** | ✅ Hervorragend | Benötigt Firmware-Pakete |
| **Broadcom** | ⚠️  Mittel | Einige Modelle benötigen proprietäre Treiber |
| **Realtek** | ✅ Gut | Die meisten Modelle unterstützt |
| **Atheros** | ✅ Hervorragend | Gute Open-Source-Treiberunterstützung |

#### Kabelgebundenes Netzwerk
Nahezu alle kabelgebundenen Netzwerkschnittstellen werden vollständig unterstützt.

## 📋 Checkliste vor der Installation

### Obligatorische Prüfpunkte

- [ ] **Prozessor**: Architektur bestätigen (amd64/arm64, für moderne PCs amd64 empfohlen)
- [ ] **Arbeitsspeicher**: Mindestens 2 GB, empfohlen 8 GB+
- [ ] **Speicher**: Mindestens 25 GB freier Speicherplatz
- [ ] **Netzwerk**: Netzwerkverbindung verfügbar bestätigen
- [ ] **Startmethode**: UEFI oder Legacy BIOS bestätigen

### Empfohlene Prüfungen

- [ ] **Grafikkarte**: Modell überprüfen, entsprechende Treiber vorbereiten
- [ ] **Wi-Fi**: Chipsatzmodell notieren
- [ ] **Drucker**: Marke und Modell überprüfen
- [ ] **Bluetooth**: Bestätigen, ob benötigt
- [ ] **Soundkarte**: Wird generell unterstützt

## 🔬 Systeminformationen sammeln

### Hardwareinformationen sammeln

Wenn Sie detaillierte Hardwareinformationen wünschen, können Sie folgende Methoden verwenden:

#### Unter Windows
1. Drücken Sie <span class="kbd">Win + R</span>
2. Geben Sie `msinfo32` ein und drücken Sie Enter
3. "Systemübersicht"-Informationen anzeigen

#### Mit Live-USB
```bash
# Nach dem Start von Debian Live USB ausführen
sudo lshw -short          # Hardwareübersicht
lscpu                     # CPU-Informationen
free -h                   # Speicherinformationen
lsblk                     # Speichergeräte
lspci                     # PCI-Geräte
lsusb                     # USB-Geräte
```

## ⚡ Leistungsoptimierungsempfehlungen

### SSD vs HDD

| Speichertyp | Vorteile | Nachteile | Anwendungsfall |
|-------------|----------|-----------|----------------|
| **SSD** | Schnell, geräuschlos | Teurer | Empfohlen als Systemfestplatte |
| **HDD** | Günstig, große Kapazität | Langsam, geräuschvoll | Geeignet für Dateispeicherung |

### Empfohlene Dual-Festplatten-Konfiguration
```bash
SSD (120GB+) → System + Programme
HDD (1TB+)   → Dokumente + Mediendateien
```

## 🆘 Kompatibilitätsprobleme lösen

### Häufige Probleme

#### Wi-Fi funktioniert nicht
**Lösung:**
1. Prüfen, ob nicht-freie Firmware benötigt wird
2. Firmware-Pakete über kabelgebundenes Netzwerk installieren
3. USB-Wi-Fi-Adapter in Betracht ziehen

#### Grafikkartentreiberprobleme
**Lösung:**
1. Zuerst Open-Source-Treiber verwenden
2. Nach Systemstabilisierung proprietäre Treiber installieren
3. Integrierte Grafik als Backup vorbereiten

#### Kein Tonausgang
**Lösung:**
1. ALSA-Konfiguration überprüfen
2. PulseAudio installieren
3. Kernel-Update kann das Problem beheben

## Nächste Schritte

Nach der Hardwareprüfung können Sie fortfahren mit:

1. [Virtuelle Maschine testen](/basics/virtual-machine) - Debian zuerst risikofrei in einer VM ausprobieren
2. [Debian 13-Image herunterladen](/basics/download) - Installationsdateien erhalten
3. [Startmedium erstellen](/basics/bootable-media) - Installationsmedium vorbereiten
4. [Installationsprozess starten](/basics/installation) - System offiziell installieren

---

**Hardwarekompatibilität bestätigt?** [Debian 13 herunterladen →](/basics/download)