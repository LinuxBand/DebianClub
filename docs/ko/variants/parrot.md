---
title: Parrot OS — Debian 파생 배포판
description: 보안 연구 도구와 일상적인 데스크톱 사용을 균형 있게 제공하는 Debian 기반 롤링 릴리스 배포판
---

# Parrot OS

Parrot OS는 이탈리아 Frozenbox 팀이 개발한 Debian 기반 롤링 릴리스 배포판입니다. 순수하게 보안에 집중하는 배포판과 달리, Parrot OS는 보안 연구 플랫폼이자 편안한 일상 데스크톱으로 모두 사용할 수 있도록 설계되었습니다.

## 기본 정보

| 속성 | 세부 사항 |
|---|---|
| 기반 | Debian testing (rolling) |
| 릴리스 주기 | 롤링 릴리스 |
| 기본 데스크톱 | MATE (Security/Home), KDE Plasma (선택적) |
| 대상 사용자 | 보안 연구자, 개발자, 개인정보 중시 데스크톱 사용자 |
| 웹사이트 | [https://parrotsec.org](https://parrotsec.org) |

## 주요 기능

- **목적별 다양한 에디션**: Security(전체 침투 테스트 툴킷), Home(경량 일상 데스크톱), HTB(Hack The Box용 사전 구성), Cloud/Docker 에디션.
- **Kali보다 가벼움**: MATE 데스크톱과 커널 조정으로 RAM 사용이 낮게 유지됩니다. 2GB RAM으로 편안하게 실행됩니다.
- **내장 개인정보 도구**: AnonSurf(원클릭 Tor 라우팅), Firejail 앱 샌드박싱, OnionShare.
- **개발자 친화적 Home 에디션**: 무거운 보안 도구 없이 인기 프로그래밍 런타임과 개발 유틸리티 포함.

## 시작하기

```bash
# https://parrotsec.org/download/ 에서 적절한 에디션 ISO 다운로드

# 설치 후 Parrot 업그레이드 명령어로 업데이트
sudo parrot-upgrade
# 동일한 효과:
sudo apt update && sudo apt full-upgrade -y

# AnonSurf로 모든 트래픽을 Tor를 통해 라우팅
sudo anonsurf start
sudo anonsurf status
sudo anonsurf stop
```

::: tip Parrot OS vs. Kali Linux
Kali Linux는 보안 도구 라이브러리의 완성도를 우선시하며 전문적인 침투 테스트에 집중합니다. Parrot OS는 보안 작업도 처리하는 범용 워크스테이션을 원한다면, 특히 저사양 하드웨어에서 더 적합합니다.
:::

## 관련 링크

- 웹사이트: [https://parrotsec.org](https://parrotsec.org)
- 다운로드: [https://parrotsec.org/download/](https://parrotsec.org/download/)

---

## 다음 단계

[Debian 파생 배포판 개요](/ko/variants/)로 돌아가기.
