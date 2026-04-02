---
title: Debian 13의 새로운 기능
description: Debian 13 (Trixie)의 새로운 기능, 개선 사항 및 중요 변경 사항
---

# Debian 13 (Trixie)의 새로운 기능

코드명 "Trixie"인 Debian 13은 2025년 8월에 공식 출시되어 현재 안정 버전입니다. 2026년 3월 기준 최신 포인트 릴리스는 **13.4**입니다.

## 주요 새 기능

### 소프트웨어 패키지 업데이트

| 소프트웨어 | Debian 13 버전 | Debian 12 버전 | 주요 개선 사항 |
|-----------|--------------|--------------|-------------|
| **리눅스 커널** | 6.12 | 6.1 | 더 나은 하드웨어 지원, 성능 최적화 |
| **Python** | 3.13 | 3.11 | 더 빠른 실행 속도, 새로운 언어 기능 |
| **GCC** | 14.2 | 12.2 | 최신 컴파일러 기술, C++23 지원 |
| **GNOME** | 43 | 43 | 현대적인 인터페이스, 향상된 사용자 경험 |
| **KDE Plasma** | 5.27 | 5.27 | 향상된 기능, 개선된 안정성 |
| **Firefox ESR** | 115+ | 102 | 향상된 개인정보 보호 및 성능 |

### 아키텍처 지원

- **RISC-V 64비트** (riscv64) — 첫 공식 지원
- **amd64**, **arm64**, **armhf**, **ppc64el**, **s390x** 계속 지원

### 저장소 변경 사항

```bash
# 새 컴포넌트 구조
main contrib non-free-firmware

# 이전 구조 대체
main contrib non-free
```

## 버전 타임라인

| 버전 | 날짜 | 상태 |
|------|------|------|
| Debian 13.0 | 2025-08-09 | 초기 릴리스 |
| Debian 13.1 | 2025-10-11 | 포인트 릴리스 |
| Debian 13.2 | 2025-11-08 | 포인트 릴리스 |
| Debian 13.3 | 2026-01-10 | 포인트 릴리스 |
| Debian 13.4 | 2026-03-08 | 현재 포인트 릴리스 |

## 관련 링크

- 릴리스 노트: [https://www.debian.org/releases/trixie/releasenotes](https://www.debian.org/releases/trixie/releasenotes)
- 다운로드: [/ko/basics/download](/ko/basics/download)
