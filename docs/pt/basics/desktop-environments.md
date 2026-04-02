---
title: Ambientes desktop
description: Guia dos ambientes desktop disponíveis para o Debian 13
---

# Ambientes desktop para Debian 13

O Debian oferece uma grande variedade de ambientes desktop.

## GNOME (Recomendado para iniciantes)

Interface moderna e intuitiva, o ambiente padrão do Debian.

```bash
sudo apt install task-gnome-desktop -y
```

**Vantagens**: Moderno, muitos apps integrados, grande comunidade  
**Desvantagens**: Alto uso de RAM (600-800 MB+)

## KDE Plasma

Ambiente altamente personalizável com visual semelhante ao Windows.

```bash
sudo apt install task-kde-desktop -y
```

## Xfce (Recomendado para PCs antigos)

Ambiente leve e rápido.

```bash
sudo apt install task-xfce-desktop -y
```

**Vantagens**: Leve (300-400 MB RAM), rápido, estável  
**Desvantagens**: Interface menos moderna

## MATE

Fork do GNOME 2, interface clássica e familiar.

```bash
sudo apt install task-mate-desktop -y
```

## LXQt / LXDE

Ultra-leves, ideais para hardware antigo (256-512 MB RAM).

```bash
sudo apt install task-lxde-desktop -y
```

## Tabela de comparação

| Ambiente | RAM | Adequado para |
|----------|-----|--------------|
| GNOME | 600+ MB | PCs modernos |
| KDE Plasma | 500+ MB | Usuários avançados |
| Xfce | 300 MB | PCs moderadamente antigos |
| MATE | 350 MB | Ambiente clássico |
| LXQt | 250 MB | Hardware muito antigo |
