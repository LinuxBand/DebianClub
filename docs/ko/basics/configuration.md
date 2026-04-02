---
title: 시스템 구성
description: Debian 13 시스템 구성 및 사용자 정의 가이드
---

# Debian 13 시스템 구성

## 패키지 소스 관리

```bash
# APT 소스 편집
sudo nano /etc/apt/sources.list

# Debian 13 권장 소스
deb http://deb.debian.org/debian/ trixie main contrib non-free non-free-firmware
deb http://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
deb http://deb.debian.org/debian/ trixie-updates main contrib non-free non-free-firmware
```

## 일반적인 패키지 설치

```bash
# 개발 도구
sudo apt install build-essential git vim -y

# 그래픽 환경 (필요한 경우)
sudo apt install task-gnome-desktop -y

# 독점 드라이버
sudo apt install firmware-linux-nonfree -y
```

## 방화벽 구성

```bash
# UFW 설치
sudo apt install ufw -y

# 방화벽 활성화
sudo ufw enable

# SSH 허용 (필요한 경우)
sudo ufw allow ssh

# 상태 확인
sudo ufw status
```

## 시스템 시간 설정

```bash
# 시간대 설정
sudo timedatectl set-timezone Asia/Seoul

# NTP 동기화 활성화
sudo timedatectl set-ntp true

# 시간 설정 확인
timedatectl status
```

## 다음 단계

- [데스크톱 환경](/ko/basics/desktop-environments)
- [Debian 소개](/ko/basics/introduction)
