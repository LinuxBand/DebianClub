---
title: 데스크톱 환경
description: Debian 13에서 사용 가능한 데스크톱 환경 가이드
---

# Debian 13 데스크톱 환경

Debian은 다양한 데스크톱 환경을 제공합니다.

## GNOME (초보자에게 권장)

현대적이고 직관적인 인터페이스, Debian의 기본 환경.

```bash
sudo apt install task-gnome-desktop -y
```

**장점**: 현대적, 많은 내장 앱, 큰 커뮤니티  
**단점**: 높은 RAM 사용량 (600-800MB+)

## KDE Plasma

Windows와 유사한 고도로 사용자 정의 가능한 환경.

```bash
sudo apt install task-kde-desktop -y
```

## Xfce (구형 PC에 권장)

가볍고 빠른 환경.

```bash
sudo apt install task-xfce-desktop -y
```

**장점**: 가벼움 (300-400MB RAM), 빠름, 안정적  
**단점**: 덜 현대적인 인터페이스

## MATE

GNOME 2의 포크, 클래식하고 친숙한 인터페이스.

```bash
sudo apt install task-mate-desktop -y
```

## LXQt / LXDE

초경량, 구형 하드웨어에 이상적 (256-512MB RAM).

```bash
sudo apt install task-lxde-desktop -y
```

## 비교표

| 환경 | RAM | 적합한 용도 |
|------|-----|-----------|
| GNOME | 600+ MB | 최신 PC |
| KDE Plasma | 500+ MB | 고급 사용자 |
| Xfce | 300 MB | 약간 구형 PC |
| MATE | 350 MB | 클래식 환경 |
| LXQt | 250 MB | 매우 구형 하드웨어 |
