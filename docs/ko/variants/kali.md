---
title: Kali Linux — Debian 파생 배포판
description: 600개 이상의 보안 도구가 기본 탑재된 업계 표준 침투 테스트 및 사이버보안 배포판
---

# Kali Linux

Kali Linux는 2013년 Offensive Security가 BackTrack Linux의 후계자로 출시한 가장 잘 알려진 보안 중심 리눅스 배포판입니다. Debian testing 기반의 롤링 릴리스 모델로 침투 테스트, 디지털 포렌식, 역공학을 위한 600개 이상의 사전 설치 도구를 제공합니다.

## 기본 정보

| 속성 | 세부 사항 |
|---|---|
| 기반 | Debian testing (rolling) |
| 릴리스 주기 | 롤링 릴리스 |
| 기본 데스크톱 | Xfce (2019년부터); GNOME, KDE 사용 가능 |
| 대상 사용자 | 보안 전문가, 침투 테스터, CTF 플레이어 |
| 웹사이트 | [https://www.kali.org](https://www.kali.org) |

## 주요 기능

- **600개 이상의 보안 도구**: Nmap, Metasploit, Burp Suite, Wireshark, Aircrack-ng, John the Ripper 등.
- **롤링 릴리스 모델**: Debian testing을 추적하여 도구가 지속적으로 업데이트됩니다.
- **멀티플랫폼 지원**: x86_64, ARM, WSL, Docker, Raspberry Pi 전용 이미지.
- **라이브 모드**: 디스크 설치 없이 USB에서 직접 부팅.
- **Kali Undercover 모드**: 공공장소에서 유용한 Windows 10 유사 데스크톱으로 원클릭 변환.

## 시작하기

```bash
# https://www.kali.org/get-kali/ 에서 다운로드

# 설치 후 시스템 업데이트
sudo apt update && sudo apt full-upgrade -y

# 전체 도구 스위트 설치
sudo apt install kali-linux-everything -y

# 상위 10개 도구만 설치
sudo apt install kali-tools-top10 -y
```

::: warning 법적 주의사항
Kali Linux에 포함된 도구는 소유하거나 명시적 서면 허가를 받은 시스템에만 사용해야 합니다. 무단 침투 테스트 도구 사용은 대부분의 국가에서 불법입니다.
:::

## 관련 링크

- 웹사이트: [https://www.kali.org](https://www.kali.org)
- 다운로드: [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)

---

## 다음 단계

[Debian 파생 배포판 개요](/ko/variants/)로 돌아가기.
