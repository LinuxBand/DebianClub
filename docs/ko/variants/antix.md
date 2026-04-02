---
title: antiX — Debian 파생 배포판
description: 256MB RAM만으로 실행 가능한 초경량 Debian 파생 배포판으로 sysvinit을 사용하고 구형 하드웨어에 새 생명을 불어넣습니다
---

# antiX

antiX는 그리스 개발자 anticapitalista가 이끄는 극도로 경량화된 Debian stable 파생 배포판으로, 구형 컴퓨터와 저자원 하드웨어를 위해 특별히 설계되었습니다. systemd 없이(대신 sysvinit 사용) 실행되며 256MB RAM만으로도 편안하게 동작합니다. MX Linux가 구축된 기반 레이어이기도 합니다.

## 기본 정보

| 속성 | 세부 사항 |
|---|---|
| 기반 | Debian stable |
| 릴리스 주기 | Debian stable 추종; 주기적 업데이트 릴리스 |
| 기본 데스크톱 | IceWM (기본), Fluxbox, JWM, Herbstluftwm |
| 대상 사용자 | 구형 하드웨어 소유자, 미니멀리스트, anti-systemd 사용자 |
| 웹사이트 | [https://antixlinux.com](https://antixlinux.com) |

## 주요 기능

- **극도로 경량화**: 전체 antiX 데스크톱이 150–200MB RAM에서 유휴 상태.
- **systemd 없음**: antiX는 init 시스템으로 sysvinit을 사용합니다.
- **4가지 설치 에디션**: Full(전체 앱), Base(경량, 최소 소프트웨어), Core(명령줄만), Net(네트워크 설치).
- **레거시 32비트 지원**: PAE 커널 지원 이전의 하드웨어에서도 실행 가능한 32비트 이미지를 제공하는 몇 안 되는 배포판 중 하나.

## 시작하기

```bash
# https://antixlinux.com/download/ 에서 다운로드
# Full, Base, Core, Net 에디션으로 제공 — 32비트와 64비트

# 설치 후 시스템 업데이트
sudo apt update && sudo apt upgrade -y

# RAM 사용량 확인
free -h

# sysvinit으로 서비스 관리
sudo service <서비스명> start
sudo update-rc.d <서비스명> enable
```

::: tip antiX vs. MX Linux
antiX는 더 극단적인 선택 — 더 가볍고 명령줄에 더 가깝습니다. MX Linux는 antiX를 기반으로 하지만 그래픽 도구와 더 친화적인 인터페이스를 추가합니다.
:::

## 관련 링크

- 웹사이트: [https://antixlinux.com](https://antixlinux.com)
- 다운로드: [https://antixlinux.com/download/](https://antixlinux.com/download/)
- 커뮤니티 포럼: [https://www.antixforum.com](https://www.antixforum.com)

---

## 다음 단계

[Debian 파생 배포판 개요](/ko/variants/)로 돌아가기.
