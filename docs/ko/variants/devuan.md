---
title: Devuan — Debian 파생 배포판
description: systemd를 sysvinit, runit 또는 OpenRC로 대체하여 init 시스템 자유를 보장하는 Debian 포크
---

# Devuan

Devuan("dev-one"으로 발음)은 Debian 8 Jessie가 systemd를 기본 init 시스템으로 채택한 것에 반응하여 2015년 Veteran Unix Admins 집단이 시작한 Debian 포크입니다. Devuan의 핵심 목표는 간단합니다: systemd에 의존하지 않는 Debian 기반 배포판을 제공하는 것입니다.

## 기본 정보

| 속성 | 세부 사항 |
|---|---|
| 기반 | Debian (systemd 의존성 제거/대체) |
| 릴리스 주기 | Debian stable 릴리스와 일치 |
| 기본 데스크톱 | Xfce (기본), GNOME, KDE, LXQt 사용 가능 |
| 대상 사용자 | 전통적인 init 선호 사용자, 시스템 관리자 |
| 웹사이트 | [https://www.devuan.org](https://www.devuan.org) |

## 주요 기능

- **Init 시스템 자유**: 설치 시 sysvinit(전통적), runit(빠르고 경량), 또는 OpenRC 선택 가능.
- **거의 완전한 Debian 호환성**: 하드 systemd 의존성이 있는 패키지만 패치되거나 대체됩니다.
- **Debian과 버전 일치**: Devuan 5 Daedalus = Debian 12 Bookworm.
- **컨테이너 및 임베디드 친화적**: systemd 없는 환경은 Docker/LXC에서 더 적은 리소스를 사용합니다.

## 시작하기

```bash
# https://www.devuan.org/get-devuan 에서 다운로드

# 설치 후 시스템 업데이트
sudo apt update && sudo apt full-upgrade -y

# 어떤 init 시스템이 실행 중인지 확인
cat /proc/1/comm
# 출력되어야 할 내용: init (sysvinit), runit 또는 openrc-init

# sysvinit으로 서비스 관리
sudo service nginx start
sudo update-rc.d nginx enable
```

## 관련 링크

- 웹사이트: [https://www.devuan.org](https://www.devuan.org)
- 다운로드: [https://www.devuan.org/get-devuan](https://www.devuan.org/get-devuan)

---

## 다음 단계

[Debian 파생 배포판 개요](/ko/variants/)로 돌아가기.
