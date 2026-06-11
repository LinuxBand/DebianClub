---
title: "Debian 12에서 Debian 13으로 업그레이드"
description: "Debian 12 Bookworm에서 Debian 13 Trixie로의 원활한 업그레이드를 위한 완벽한 단계, deb822 마이그레이션 및 업그레이드 후 점검 포함"
---

# Debian 12에서 Debian 13으로 업그레이드

Debian의 주요 버전 업그레이드 과정은 매우 신뢰할 수 있지만, 신중하게 진행해야 합니다. 이 문서에서는 **Debian 12 "Bookworm"** 을 **Debian 13 "Trixie"** 로 원활하게 업그레이드하는 방법을 안내합니다.

::: warning 업그레이드 전 필독
- **중요 데이터는 반드시 백업하세요** (최소한 `/home`과 `/etc`는 백업).
- 안정적인 네트워크와 전원 환경에서 진행하며, 노트북은 전원을 연결하세요.
- 먼저 전체 내용을 읽어본 후 진행하는 것이 좋습니다. 프로덕션 서버인 경우 테스트 환경에서 먼저 연습하세요.
:::

## 1단계: 현재 시스템 완전 업데이트

먼저 기존 Debian 12를 최신 상태로 업데이트하여 업그레이드 시 충돌을 줄입니다:

```bash
sudo apt update
sudo apt upgrade --without-new-pkgs
sudo apt full-upgrade
sudo apt autoremove
```

현재 시스템이 Debian 12인지 확인합니다:

```bash
lsb_release -a
# Release: 12, Codename: bookworm이 표시되어야 함
```

## 2단계: 설치된 타사 저장소 확인 및 기록

타사 저장소(예: Docker, Chrome 저장소)는 주요 버전 업그레이드 시 호환되지 않을 수 있으므로, 먼저 **일시적으로 비활성화**한 후 업그레이드가 완료되면 하나씩 복원하는 것이 좋습니다:

```bash
# 모든 소스 파일 확인
ls /etc/apt/sources.list.d/
```

타사 `.list` / `.sources` 파일을 임시로 이동시키고, 업그레이드 시 Debian 공식 저장소만 사용할 수 있습니다.

## 3단계: 소스 리스트를 trixie로 변경

이것이 업그레이드의 핵심 단계입니다 — 배포판 코드명을 `bookworm`에서 `trixie`로 변경합니다.

**전통적인 `sources.list`를 사용하는 경우:**

```bash
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list
```

**deb822 형식을 사용하는 경우** (Debian 12에서도 `/etc/apt/sources.list.d/debian.sources`를 사용할 수 있음):

```bash
sudo sed -i 's/bookworm/trixie/g' /etc/apt/sources.list.d/debian.sources
```

::: tip 보안 스위트 이름 변경 참고
이전 버전의 보안 소스는 `bookworm-security`로 작성되며, 새 버전은 `trixie-security`에 해당합니다. 위의 대체 작업이 함께 처리됩니다. 파일을 열어 모든 `bookworm*`이 `trixie*`로 변경되었는지 확인하세요.
:::

`/etc/apt/sources.list.d/` 아래의 다른 공식 소스 파일도 확인하여 함께 대체하는 것을 잊지 마세요.

## 4단계: 업그레이드 실행

```bash
# 1. 새 trixie 소스로 패키지 목록 새로 고침
sudo apt update

# 2. 최소 업그레이드 (먼저 핵심 패키지를 업그레이드하여 충돌 위험 감소)
sudo apt upgrade --without-new-pkgs

# 3. 전체 업그레이드 (새 커널 설치, 종속성 변경 처리, 새 패키지 설치)
sudo apt full-upgrade
```

전체 업그레이드는 많은 파일을 다운로드하고 시간이 오래 걸릴 수 있습니다. 도중에 구성 파일 충돌 메시지가 나타날 수 있으며, **일반적으로「패키지 유지 관리자 버전 설치」를 선택하는 것이 안전합니다** (해당 구성을 직접 수정하지 않은 경우).

## 5단계: 재부팅 및 확인

```bash
sudo reboot
```

재부팅 후 확인:

```bash
lsb_release -a
# Release: 13, Codename: trixie가 표시되어야 함

uname -r
# 커널은 6.12 시리즈여야 함
```

## 6단계: 업그레이드 후 정리 및 마무리

```bash
# 업그레이드 후 남은 구 버전 패키지 정리
sudo apt autoremove --purge

# 선택 사항: 소스를 Debian 13 기본 deb822 형식으로 마이그레이션
sudo apt modernize-sources
```

그런 다음 일시적으로 비활성화한 타사 저장소를 하나씩 복원하고, trixie(또는 호환) 버전을 제공하는지 확인하세요. deb822에 대한 자세한 내용은 [deb822 소스 형식](/ko/administration/deb822)을 참조하세요.

## 자주 묻는 질문

- **업그레이드 중단 / 네트워크 끊김**: 네트워크가 복구되면 `sudo apt full-upgrade`를 다시 실행하면 APT가 이어서 완료합니다.
- **일부 패키지가 "보류(kept back)"됨**: `sudo apt full-upgrade`를 실행하면 일반적으로 해결됩니다.
- **여러 주요 버전 건너뛰기** (예: Debian 11에서): **버전을 건너뛰지 말고**, 먼저 Debian 12로 업그레이드한 후 Debian 13으로 업그레이드하세요.

## 요약

1. 현재 시스템 업데이트 → 2. 타사 저장소 처리 → 3. 소스 코드명 `bookworm`→`trixie` → 4. `update` + `upgrade` + `full-upgrade` → 5. 재부팅 및 확인 → 6. 정리 및 deb822 마이그레이션.

추가 자료: [deb822 소스 형식](/ko/administration/deb822) · [APT 패키지 관리](/ko/administration/packages)
