---
title: "Backports 사용 가이드"
description: "Debian 13 안정 버전에서 trixie-backports를 통해 최신 버전 소프트웨어를 안전하게 설치하는 완벽 가이드"
---

# Backports 사용 가이드

Debian 안정 버전(Stable)은 '안정성'으로 유명하지만 소프트웨어 버전이 비교적 보수적입니다. **Backports**는 Debian 공식에서 제공하는 절충안으로, `testing`의 최신 소프트웨어를 현재 안정 버전에 **재컴파일**하여 Stable을 유지하면서 필요한 경우에만 개별 최신 소프트웨어를 설치할 수 있게 해줍니다.

Debian 13의 경우 해당 저장소는 **`trixie-backports`**입니다.

## Backports를 사용하는 경우

- ✅ 특정 소프트웨어의 최신 버전이 필요할 때 (예: 새 하드웨어 지원을 위한 새 커널, 최신 LibreOffice)
- ✅ 시스템 전체 안정성을 유지하면서 일부 소프트웨어만 업그레이드하고 싶을 때
- ❌ '모든 것을 새 버전으로' 사용하기 위해 모든 패키지를 backports로 설치하지 마세요. Stable의 안정성 이점을 잃게 됩니다.

> Backports의 소프트웨어는 **Debian 보안 팀의 일반적인 지원을 받지 않으며** 우선순위도 Stable보다 낮으므로 필요할 때만 설치하세요.

## trixie-backports 활성화

### 방법 1: deb822 형식 (권장)

`/etc/apt/sources.list.d/trixie-backports.sources` 파일을 새로 만듭니다:

```bash
sudo tee /etc/apt/sources.list.d/trixie-backports.sources > /dev/null <<'EOF'
Types: deb
URIs: http://deb.debian.org/debian
Suites: trixie-backports
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
EOF

sudo apt update
```

### 방법 2: 전통적인 한 줄 형식

또는 공식 `debian.sources`의 `Suites` 줄에 `Suites: trixie trixie-updates trixie-backports`와 같이 추가하거나 `sources.list`에 다음 줄을 추가할 수 있습니다:

```
deb http://deb.debian.org/debian trixie-backports main contrib non-free non-free-firmware
```

두 형식의 차이점은 [deb822 소스 형식](/ko/administration/deb822)을 참조하세요.

## backports 소프트웨어 설치

활성화 후 backports의 기본 우선순위는 Stable보다 **낮기** 때문에 일반적인 `apt install`은 **자동으로** backports에서 설치되지 않습니다. 반드시 `-t`(`--target-release`) 옵션을 명시적으로 사용해야 합니다:

```bash
# backports에서 최신 LibreOffice 설치
sudo apt install -t trixie-backports libreoffice

# 최신 커널 설치 (새 하드웨어에 유용)
sudo apt install -t trixie-backports linux-image-amd64
```

이후 `sudo apt upgrade`를 실행하면 이미 설치된 backports 소프트웨어는 backports의 새 버전으로 업그레이드되며, 나머지 소프트웨어는 Stable을 따릅니다.

## APT Pinning을 통한 세밀한 제어 (선택 사항)

특정 패키지를 **기본적으로** backports에서 설치하려면 `/etc/apt/preferences.d/backports` 파일을 만듭니다:

```
# backports의 기본 우선순위를 stable보다 낮게 설정하여 모든 패키지 자동 업그레이드 방지
Package: *
Pin: release n=trixie-backports
Pin-Priority: 400

# 커널 관련 패키지만 backports에서 우선 설치 (stable의 500보다 높은 우선순위)
Package: linux-image-* linux-headers-*
Pin: release n=trixie-backports
Pin-Priority: 501
```

- 우선순위 `< 500`: 명시적 `-t` 옵션이 있을 때만 설치
- 우선순위 `> 500`: 자동으로 backports 버전을 우선 사용

## 제거 및 롤백

backports 소프트웨어는 일반 패키지처럼 제거할 수 있습니다. Stable 버전으로 되돌리려면 버전을 지정하거나 제거 후 Stable에서 다시 설치하세요:

```bash
sudo apt install <패키지명>/trixie
```

## 요약

- Debian 13은 `trixie-backports`를 사용하여 최신 소프트웨어를 얻으면서 시스템 안정성을 유지합니다.
- 설치 시 반드시 `apt install -t trixie-backports <패키지명>`을 사용해야 하며, 자동 업그레이드되지 않습니다.
- 필요할 때만 활성화하고 필요한 패키지만 설치하세요. backports는 일반적인 보안 지원을 받지 않습니다.

추가 자료: [deb822 소스 형식](/ko/administration/deb822) · [APT 패키지 관리](/ko/administration/packages)
