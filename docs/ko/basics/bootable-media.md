---
title: 부팅 가능한 미디어 만들기
description: Debian 13을 설치하기 위한 부팅 가능한 USB 드라이브 또는 DVD 만들기
---

# 부팅 가능한 미디어 만들기

## 권장 방법: USB 드라이브

### 사용 가능한 도구

#### Windows
- **Rufus** (권장): [https://rufus.ie/](https://rufus.ie/)
- **Balena Etcher**: [https://www.balena.io/etcher/](https://www.balena.io/etcher/)

#### Linux/macOS
```bash
# dd 명령어 (/dev/sdX를 USB 드라이브로 교체)
sudo dd if=debian-13.4.0-amd64-netinst.iso of=/dev/sdX bs=4M status=progress
sync
```

### Rufus 사용 단계 (Windows)
1. USB 드라이브 삽입 (8GB 이상)
2. Debian ISO 파일 선택
3. GPT 파티션 구성표 선택
4. UEFI 대상 시스템 선택
5. 시작 클릭

## 다음 단계

- [설치 가이드](/ko/basics/installation)
- [BIOS/UEFI 설정](/ko/basics/bios-settings)
