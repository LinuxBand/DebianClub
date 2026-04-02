---
title: 첫 번째 부팅 설정
description: Debian 13 설치 후 초기 설정
---

# 첫 번째 부팅 설정

## Debian에 오신 것을 환영합니다!

Debian 13 설치에 성공하셨습니다!

## 초기 로그인

```bash
# 데스크톱 환경 없이 설치한 경우
debian login: 사용자이름
Password: [비밀번호 입력]
```

## 네트워크 구성

```bash
# 명령줄에서 WiFi 설정
nmcli dev wifi list
nmcli dev wifi connect "WiFi-이름" password "비밀번호"

# 연결 확인
ping -c 3 debian.org
```

## 시스템 업데이트

```bash
# 패키지 목록 업데이트
sudo apt update

# 모든 패키지 업그레이드
sudo apt upgrade -y

# 전체 배포판 업그레이드
sudo apt full-upgrade -y
```

## sudo 설정

```bash
# 필요한 경우 sudo 설치
su -c "apt install sudo"

# 사용자를 sudo 그룹에 추가
su -c "usermod -aG sudo 사용자이름"
```

## 필수 도구 설치

```bash
# 기본 도구
sudo apt install curl wget git vim htop -y

# 멀티미디어 코덱
sudo apt install ffmpeg vlc -y
```

## 다음 단계

- [시스템 구성](/ko/basics/configuration)
- [데스크톱 환경](/ko/basics/desktop-environments)
