---
title: MX Linux — Debian 파생 배포판
description: Debian stable의 신뢰성과 MX Tools 및 antiX 기반을 결합한 DistroWatch의 지속적인 인기 배포판
---

# MX Linux

MX Linux는 antiX와 구 MEPIS 커뮤니티가 공동 개발한 데스크톱 배포판입니다. 2014년 첫 릴리스 이후 DistroWatch 다운로드 차트 상위권을 지속적으로 유지하고 있습니다.

## 기본 정보

| 속성 | 세부 사항 |
|---|---|
| 기반 | Debian stable (antiX 기반 컴포넌트 포함) |
| 릴리스 주기 | Debian stable 추종; 약 2년마다 주요 릴리스 |
| 기본 데스크톱 | Xfce (주력), KDE Plasma, Fluxbox |
| 대상 사용자 | 중급 사용자, 구형 하드웨어 소유자, 안정성 추구자 |
| 웹사이트 | [https://mxlinux.org](https://mxlinux.org) |

## 주요 기능

- **MX Tools 스위트**: MX Package Installer, MX Snapshot(실행 중인 시스템의 부팅 가능한 ISO 생성), MX Boot Options 등.
- **이중 init 시스템 지원**: 설치 시 systemd와 sysvinit 중 선택 가능.
- **적당히 경량**: Xfce 에디션은 일반적으로 500–700MB RAM에서 유휴 상태.
- **강력한 라이브 환경**: 지속 저장소가 있는 라이브 모드, MX Snapshot으로 세션 재패키징 가능.

## 시작하기

```bash
# https://mxlinux.org/mx-iso-torrents/ 에서 다운로드

# 설치 후 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# MX Package Installer (그래픽) 실행
mx-packageinstaller

# 시스템 스냅샷 생성
sudo mx-snapshot
```

## 관련 링크

- 웹사이트: [https://mxlinux.org](https://mxlinux.org)
- 커뮤니티 포럼: [https://forum.mxlinux.org](https://forum.mxlinux.org)

---

## 다음 단계

[Debian 파생 배포판 개요](/ko/variants/)로 돌아가기.
