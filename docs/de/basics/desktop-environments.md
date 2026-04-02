---
title: Desktop-Umgebungen
description: Leitfaden zu verfügbaren Desktop-Umgebungen für Debian 13
---

# Desktop-Umgebungen für Debian 13

Debian bietet eine große Auswahl an Desktop-Umgebungen.

## GNOME (Empfohlen für Einsteiger)

Modernes und intuitives Interface, die Standard-Umgebung von Debian.

```bash
sudo apt install task-gnome-desktop -y
```

**Vorteile**: Modern, viele integrierte Apps, große Community  
**Nachteile**: Hoher RAM-Verbrauch (600-800 MB+)

## KDE Plasma

Hochgradig anpassbare Windows-ähnliche Umgebung.

```bash
sudo apt install task-kde-desktop -y
```

## Xfce (Empfohlen für ältere PCs)

Leichte und schnelle Umgebung.

```bash
sudo apt install task-xfce-desktop -y
```

**Vorteile**: Leicht (300-400 MB RAM), schnell, stabil  
**Nachteile**: Weniger modernes Interface

## MATE

Fork von GNOME 2, klassisches und vertrautes Interface.

```bash
sudo apt install task-mate-desktop -y
```

## LXQt / LXDE

Ultra-leicht, ideal für alte Hardware (256-512 MB RAM).

```bash
sudo apt install task-lxde-desktop -y
```

## Vergleichstabelle

| Umgebung | RAM | Geeignet für |
|----------|-----|--------------|
| GNOME | 600+ MB | Moderne PCs |
| KDE Plasma | 500+ MB | Fortgeschrittene Nutzer |
| Xfce | 300 MB | Ältere PCs |
| MATE | 350 MB | Klassische Umgebung |
| LXQt | 250 MB | Sehr alte Hardware |
