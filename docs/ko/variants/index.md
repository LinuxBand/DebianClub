---
title: Debian 파생 배포판
description: Debian에서 파생된 가장 주목할 만한 리눅스 배포판 개요
---

# Debian 파생 배포판

Debian은 수백 개의 잘 알려진 리눅스 배포판의 업스트림 기반으로 사용됩니다. 강력한 패키지 생태계, 엄격한 품질 기준, 성숙한 APT 패키지 관리자 덕분에 다양한 프로젝트들이 Debian을 기반으로 서로 다른 사용자와 사용 사례를 위한 배포판을 만들고 있습니다.

아래는 데스크톱 사용성, 침투 테스트, 개인정보 보호, 초경량 환경 등 다양한 분야에서 가장 주목받는 10개의 Debian 파생 배포판을 정리한 목록입니다.

## 비교표

| 배포판 | 기반 | 데스크톱 | 대상 사용자 | 특징 |
|---|---|---|---|---|
| [Ubuntu](/ko/variants/ubuntu) | Debian unstable/testing | GNOME | 일반 사용자 | 가장 인기 있는 데스크톱 리눅스 |
| [Kali Linux](/ko/variants/kali) | Debian testing | Xfce | 보안 연구자 | 600+ 침투 테스트 도구 |
| [Linux Mint / LMDE](/ko/variants/mint) | Ubuntu / Debian stable | Cinnamon | 초보자 | 매우 사용자 친화적 |
| [MX Linux](/ko/variants/mx-linux) | Debian stable | Xfce | 중급 사용자 | 경량, 안정적, 도구 풍부 |
| [Raspberry Pi OS](/ko/variants/raspberry-pi-os) | Debian | LXDE/Pixel | Pi 하드웨어 사용자 | ARM 최적화, 공식 |
| [Tails](/ko/variants/tails) | Debian stable | GNOME | 개인정보 중시 사용자 | Tor 라우팅, 흔적 없음 |
| [Parrot OS](/ko/variants/parrot) | Debian testing | MATE/KDE | 보안/개발자 | 보안 도구 + 일상 사용 |
| [Deepin](/ko/variants/deepin) | Debian stable | DDE | 중국 및 전 세계 사용자 | 아름다운 UI, 커스텀 데스크톱 |
| [Devuan](/ko/variants/devuan) | Debian | Xfce/기타 | anti-systemd 사용자 | systemd를 sysvinit으로 대체 |
| [antiX](/ko/variants/antix) | Debian stable | IceWM | 구형 하드웨어 사용자 | 256MB RAM으로 실행 가능 |

## 개별 배포판 요약

### [Ubuntu](/ko/variants/ubuntu)
Canonical Ltd.가 관리하는 세계에서 가장 인기 있는 데스크톱 리눅스 배포판. 6개월마다 새 버전이 출시되며 2년마다 LTS(장기 지원) 버전이 출시됩니다.

### [Kali Linux](/ko/variants/kali)
침투 테스트 및 사이버 보안 연구를 위해 특별히 제작된 배포판으로 600개 이상의 보안 도구를 기본 제공. Offensive Security가 관리하며 Debian testing 기반의 롤링 릴리스 모델을 따릅니다.

### [Linux Mint / LMDE](/ko/variants/mint)
단순성과 접근성으로 유명합니다. 기본 에디션은 Ubuntu 기반이며, LMDE(Linux Mint Debian Edition)는 Debian stable을 직접 기반으로 합니다. Windows에서 전환하는 사용자에게 최선의 선택입니다.

### [MX Linux](/ko/variants/mx-linux)
Debian stable의 신뢰성과 MX Tools 스위트, antiX의 경량 기반을 결합한 DistroWatch 지속적 인기 배포판. 성능과 사용성 간의 뛰어난 균형을 보여줍니다.

### [Raspberry Pi OS](/ko/variants/raspberry-pi-os)
Raspberry Pi 하드웨어를 위한 공식 권장 운영체제로 Debian 기반이며 ARM 프로세서에 최적화되어 있습니다. Desktop과 Lite(헤드리스) 에디션으로 제공됩니다.

### [Tails](/ko/variants/tails)
개인정보 보호와 익명성을 위해 처음부터 설계된 기억 상실 라이브 시스템. 모든 네트워크 트래픽이 Tor를 통해 라우팅되며, 종료 후 호스트 머신에 흔적을 남기지 않습니다.

### [Parrot OS](/ko/variants/parrot)
이탈리아 Frozenbox 팀이 개발한 Parrot OS는 보안 도구와 일상적인 데스크톱 사용을 균형 있게 제공. 다양한 워크플로를 위한 Security, Home, HTB 에디션을 제공합니다.

### [Deepin](/ko/variants/deepin)
중국 우한 Deepin Technology가 개발한 배포판으로, 시각적으로 가장 세련된 리눅스 데스크톱 중 하나로 평가받는 DDE(Deepin Desktop Environment)가 특징입니다.

### [Devuan](/ko/variants/devuan)
systemd를 전통적인 init 시스템(sysvinit, runit 또는 OpenRC)으로 대체하는 Debian 포크. 버전 번호는 Debian 릴리스와 일치합니다.

### [antiX](/ko/variants/antix)
256MB RAM으로 편안하게 실행되는 초경량 Debian 파생 배포판. systemd 대신 sysvinit을 사용하며 레거시 32비트 하드웨어를 지원합니다.

---

::: tip 어떻게 선택할까요?
- 일상적인 데스크톱, 풍부한 생태계 → **Ubuntu** 또는 **Linux Mint**
- 침투 테스트 / 보안 연구 → **Kali Linux** 또는 **Parrot OS**
- 개인정보 보호 및 익명성 → **Tails**
- Raspberry Pi 프로젝트 → **Raspberry Pi OS**
- 구형 또는 저사양 하드웨어 → **antiX** 또는 **MX Linux**
- 아름다운 UI → **Deepin**
- systemd 없이 → **Devuan** 또는 **antiX**
:::
