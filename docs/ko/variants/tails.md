---
title: Tails — Debian 파생 배포판
description: 개인정보 보호와 익명성을 위해 구축된 기억 상실 라이브 OS — 모든 트래픽을 Tor를 통해 라우팅하고 종료 후 흔적을 남기지 않습니다
---

# Tails

Tails — **The Amnesic Incognito Live System**의 약자 — 는 Debian stable 기반의 라이브 운영체제로, 개인정보 보호와 익명성을 보장하는 것을 주요 목표로 설계되었습니다. USB 드라이브에서 부팅되도록 설계되어 전적으로 RAM에서 실행되며, 종료 후 호스트 컴퓨터에 흔적을 남기지 않습니다.

## 기본 정보

| 속성 | 세부 사항 |
|---|---|
| 기반 | Debian stable |
| 릴리스 주기 | 약 6–8주마다 보안 업데이트 |
| 기본 데스크톱 | GNOME (커스터마이즈, 간소화) |
| 대상 사용자 | 언론인, 활동가, 개인정보 중시 사용자, 고위험 개인 |
| 웹사이트 | [https://tails.boum.org](https://tails.boum.org) |

## 주요 기능

- **설계부터 기억 상실**: 시스템이 RAM에서 실행됩니다. 종료 시 모든 임시 파일, 탐색 기록, 메타데이터가 메모리에서 제거되며 내부 하드 드라이브에는 아무것도 기록되지 않습니다.
- **필수 Tor 라우팅**: 모든 네트워크 연결이 Tor를 통해 라우팅됩니다. Tor 외부로 연결을 시도하는 애플리케이션은 자동으로 차단됩니다.
- **개인정보 도구 스위트**: Tor Browser, OpenPGP 이메일 암호화가 포함된 Thunderbird, OnionShare, KeePassXC.
- **암호화된 지속 저장소**: USB 드라이브의 선택적 암호화 파티션으로 세션 간 문서 저장 가능.

## 시작하기

```bash
# Tails는 USB 드라이브에서 실행해야 합니다 (최소 8GB)

# 1단계 — 이미지 다운로드:
# https://tails.boum.org/install/

# 2단계 — USB에 쓰기:
# 첫 설치: balenaEtcher 사용 (https://www.balena.io/etcher/)

# 참고: 가상 머신에서 Tails를 실행하면 보안 보장이 크게 약화됩니다.
# 물리적 USB 부팅이 권장 방법입니다.
```

::: warning 제한 사항
Tails는 세션 중 개인정보를 보호하지만, 하드웨어 수준의 감시(BIOS 임플란트, 물리적 키로거 등)나 사용자 실수에 대응할 수 없습니다.
:::

## 관련 링크

- 웹사이트: [https://tails.boum.org](https://tails.boum.org)
- 설치 가이드: [https://tails.boum.org/install/](https://tails.boum.org/install/)

---

## 다음 단계

[Debian 파생 배포판 개요](/ko/variants/)로 돌아가기.
