---
title: デスクトップ環境
description: Debian 13で利用可能なデスクトップ環境ガイド
---

# Debian 13のデスクトップ環境

Debianはさまざまなデスクトップ環境を提供しています。

## GNOME（初心者に推奨）

モダンで直感的なインターフェース、Debianのデフォルト環境。

```bash
sudo apt install task-gnome-desktop -y
```

**長所**: モダン、多くの組み込みアプリ、大きなコミュニティ  
**短所**: 高いRAM使用量（600-800MB+）

## KDE Plasma

Windowsに似た高度にカスタマイズ可能な環境。

```bash
sudo apt install task-kde-desktop -y
```

## Xfce（古いPCに推奨）

軽量で高速な環境。

```bash
sudo apt install task-xfce-desktop -y
```

**長所**: 軽量（300-400MB RAM）、高速、安定  
**短所**: あまりモダンでないインターフェース

## MATE

GNOME 2のフォーク、クラシックで使い慣れたインターフェース。

```bash
sudo apt install task-mate-desktop -y
```

## LXQt / LXDE

超軽量、古いハードウェアに最適（256-512MB RAM）。

```bash
sudo apt install task-lxde-desktop -y
```

## 比較表

| 環境 | RAM | 適した用途 |
|------|-----|-----------|
| GNOME | 600+ MB | 最新PC |
| KDE Plasma | 500+ MB | 上級ユーザー |
| Xfce | 300 MB | やや古いPC |
| MATE | 350 MB | クラシック環境 |
| LXQt | 250 MB | 非常に古いハードウェア |
