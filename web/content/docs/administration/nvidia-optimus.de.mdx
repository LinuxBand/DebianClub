---
title: "NVIDIA Optimus Dual-Grafikkarten-Konfiguration"
description: "Konfiguration von NVIDIA Optimus Hybrid-Grafik auf einem Debian 13 Laptop, Treiberinstallation und Nutzung von PRIME Render Offload"
---

# NVIDIA Optimus Dual-Grafikkarten-Konfiguration

Viele Laptops sind gleichzeitig mit **Intel/AMD integrierter Grafik** und **NVIDIA dedizierter Grafik** ausgestattet. Diese Technologie nennt NVIDIA **Optimus**. Im Alltag steuert die stromsparende integrierte Grafik den Bildschirm, bei Bedarf an hoher Leistung (Spiele, Rendering, CUDA) wird auf die dedizierte Grafik umgeschaltet. Dieser Artikel beschreibt die korrekte Treiberinstallation und Nutzung von PRIME Render Offload unter Debian 13.

## Schritt 1: Hardware identifizieren

```bash
# Alle Grafikkarten auflisten und gleichzeitiges Vorhandensein von Intel/AMD und NVIDIA bestätigen
lspci | grep -E "VGA|3D"
```

Wenn zwei Grafikkarten sichtbar sind (z. B. eine Intel und eine NVIDIA), handelt es sich um eine Optimus-Hybrid-Architektur.

## Schritt 2: Non-free-firmware- und Non-free-Quellen aktivieren

Die proprietären NVIDIA-Treiber befinden sich in der Komponente `non-free`. Stellen Sie sicher, dass die Paketquellen `non-free` und `non-free-firmware` enthalten (die standardmäßige deb822-Schreibweise von Debian 13 finden Sie unter [deb822-Quellformat](/de/administration/deb822)):

```text
Components: main contrib non-free non-free-firmware
```

Nach der Änderung ausführen:

```bash
sudo apt update
```

## Schritt 3: NVIDIA-Treiber installieren

Die offiziellen Debian-Repositorien enthalten getestete NVIDIA-Treiber. **Verwenden Sie bevorzugt die offiziellen Pakete** anstelle des `.run`-Installers von der NVIDIA-Website:

```bash
# Kernel-Header installieren (für die Kompilierung der Treibermodule erforderlich)
sudo apt install linux-headers-amd64

# NVIDIA-Treiber und PRIME-Unterstützung installieren
sudo apt install nvidia-driver firmware-misc-nonfree

# Neustart zum Laden des Treibers
sudo reboot
```

Der Installationsprozess kompiliert die Module automatisch über DKMS für den aktuellen Kernel. Das Debian-Paket `nvidia-driver` ist standardmäßig für PRIME konfiguriert: Der Desktop wird beim Start weiterhin von der integrierten Grafik gesteuert, die dedizierte Grafik wird bei Bedarf aktiviert – genau das stromsparende Verhalten, das Laptops benötigen.

## Schritt 4: Überprüfung

```bash
# Dedizierten Grafikstatus anzeigen (bei korrektem Treiber wird GPU-Info aufgelistet)
nvidia-smi

# Aktuellen OpenGL-Renderer bestätigen (standardmäßig sollte Intel/AMD integrierte Grafik angezeigt werden)
glxinfo | grep "OpenGL renderer"
```

`glxinfo` stammt aus dem Paket `mesa-utils` (`sudo apt install mesa-utils`).

## Schritt 5: Programme bei Bedarf mit dedizierter Grafik ausführen (PRIME Render Offload)

Im Alltag mit integrierter Grafik stromsparend arbeiten und nur bei Bedarf **einzelne Programme** an die dedizierte Grafik übergeben – das nennt man **PRIME Render Offload**:

```bash
# Ein Programm mit dedizierter Grafik ausführen
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia <Programmname>

# Beispiel: glxgears-Test mit dedizierter Grafik ausführen
__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia glxgears
```

Zur Vereinfachung kann ein Alias in `~/.bashrc` definiert werden:

```bash
alias nv-run='__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia'
# Danach: nv-run blender
```

Desktop-Umgebungen (GNOME/KDE) bieten normalerweise im Rechtsklick-Menü einer Anwendung die Option "Mit dedizierter Grafikkarte ausführen", die im Hintergrund genau diesen Mechanismus nutzt.

## CUDA / Rechenzwecke

Wenn Sie nur CUDA-Berechnungen ausführen (z. B. KI-Inferenz) und keine Grafik rendern müssen, reicht es aus, wenn `nvidia-smi` die dedizierte Grafikkarte nach der Treiberinstallation erkennt – PRIME Offload ist nicht erforderlich. Installation des CUDA-Toolkits:

```bash
sudo apt install nvidia-cuda-toolkit
```

## Wayland und häufige Probleme

- **Wayland**: Neuere NVIDIA-Treiber unterstützen Wayland recht gut. Bei Grafikfehlern oder Problemen beim Anmelden wechseln Sie auf dem Anmeldebildschirm zur **Xorg**-Sitzung, um die Ursache einzugrenzen.
- **Schwarzer Bildschirm / Nicht in den Desktop gelangen**: Fügen Sie in den GRUB-Startoptionen am Ende der `linux`-Zeile temporär `nomodeset` hinzu, um in einen Desktop mit niedriger Auflösung zu gelangen, und überprüfen Sie dann die Treiberinstallation.
- **`nvidia-smi` meldet "No devices found"**: Meistens wurde der Treiber nicht erfolgreich für den aktuellen Kernel kompiliert. Überprüfen Sie, ob `linux-headers-amd64` installiert ist, und führen Sie erneut `sudo apt install --reinstall nvidia-driver` aus.

## Zusammenfassung

- `non-free`-Quelle aktivieren → `linux-headers-amd64` + `nvidia-driver` installieren → Neustart.
- Standardmäßig verwendet die integrierte Grafik Stromsparmodus, die dedizierte Grafik wird bei Bedarf mit `__NV_PRIME_RENDER_OFFLOAD=1 __GLX_VENDOR_LIBRARY_NAME=nvidia` aufgerufen.
- Bevorzugt die offiziellen Debian-Treiberpakete verwenden, den `.run`-Installer der offiziellen Website vermeiden.

Weiterführende Lektüre: [Hardware-Kompatibilität](/en/basics/hardware-compatibility) · [deb822-Quellformat](/de/administration/deb822)
