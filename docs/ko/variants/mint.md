---
title: Linux Mint / LMDE — Debian 파생 배포판
description: 초보자에게 친화적인 데스크톱 리눅스 배포판; LMDE 에디션은 Debian stable을 직접 기반으로 합니다.
---

# Linux Mint / LMDE

Linux Mint는 "자유에서 우아함이 탄생했다"는 모토를 중심으로 구축된 가장 접근하기 쉬운 리눅스 데스크톱 배포판 중 하나입니다. 기본 에디션은 Ubuntu 기반이며, **LMDE(Linux Mint Debian Edition)**는 Debian stable을 직접 기반으로 합니다.

## 기본 정보

| 속성 | 세부 사항 |
|---|---|
| 기반 | Ubuntu (기본 에디션) / Debian stable (LMDE) |
| 릴리스 주기 | Ubuntu LTS 추종 (기본) ; Debian stable 추종 (LMDE) |
| 기본 데스크톱 | Cinnamon (주력), MATE, Xfce |
| 대상 사용자 | 데스크톱 초보자, Windows 이주 사용자 |
| 웹사이트 | [https://linuxmint.com](https://linuxmint.com) |

## 주요 기능

- **즉시 사용 가능한 무마찰 경험**: 멀티미디어 코덱, 폰트 조정, 일반 애플리케이션이 사전 설치됨.
- **Cinnamon 데스크톱**: 전통적인 Windows 레이아웃을 반영하는 환경 — 작업 표시줄, 시작 메뉴, 시스템 트레이.
- **Mint Tools**: Timeshift(시스템 스냅샷 및 복원), Update Manager(위험 수준 표시기 포함), Driver Manager.
- **보수적인 업데이트 정책**: Update Manager는 기본적으로 보안 패치와 저위험 업데이트만 적용합니다.

## 시작하기

```bash
# 기본 에디션: https://linuxmint.com/download.php
# LMDE: https://linuxmint.com/download_lmde.php

# 설치 후 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# 시스템 백업용 Timeshift 설치 (보통 사전 설치됨)
sudo apt install timeshift -y
```

## 관련 링크

- 웹사이트: [https://linuxmint.com](https://linuxmint.com)
- 다운로드 (기본): [https://linuxmint.com/download.php](https://linuxmint.com/download.php)
- LMDE 다운로드: [https://linuxmint.com/download_lmde.php](https://linuxmint.com/download_lmde.php)

---

## 다음 단계

[Debian 파생 배포판 개요](/ko/variants/)로 돌아가기.
