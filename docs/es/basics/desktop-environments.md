---
title: Entornos de escritorio
description: Guía de entornos de escritorio disponibles para Debian 13
---

# Entornos de escritorio para Debian 13

Debian ofrece una gran variedad de entornos de escritorio.

## GNOME (Recomendado para principiantes)

Interfaz moderna e intuitiva, el entorno predeterminado de Debian.

```bash
sudo apt install task-gnome-desktop -y
```

**Ventajas**: Moderno, muchas apps integradas, gran comunidad  
**Desventajas**: Alto uso de RAM (600-800 MB+)

## KDE Plasma

Entorno altamente personalizable con aspecto Windows.

```bash
sudo apt install task-kde-desktop -y
```

## Xfce (Recomendado para PCs antiguos)

Entorno ligero y rápido.

```bash
sudo apt install task-xfce-desktop -y
```

**Ventajas**: Ligero (300-400 MB RAM), rápido, estable  
**Desventajas**: Interfaz menos moderna

## MATE

Fork de GNOME 2, interfaz clásica y familiar.

```bash
sudo apt install task-mate-desktop -y
```

## LXQt / LXDE

Ultra-ligeros, ideales para hardware antiguo (256-512 MB RAM).

```bash
sudo apt install task-lxde-desktop -y
```

## Tabla de comparación

| Entorno | RAM | Adecuado para |
|---------|-----|--------------|
| GNOME | 600+ MB | PCs modernos |
| KDE Plasma | 500+ MB | Usuarios avanzados |
| Xfce | 300 MB | PCs moderadamente antiguos |
| MATE | 350 MB | Entorno clásico |
| LXQt | 250 MB | Hardware muy antiguo |
