---
title: BIOS/UEFI 설정
description: USB 미디어에서 부팅하기 위한 BIOS/UEFI 설정 방법
---

# BIOS/UEFI 설정

Debian 설치 미디어에서 부팅하려면 BIOS/UEFI 설정을 변경해야 할 수 있습니다.

## BIOS/UEFI 접근

부팅 시 제조사에 해당하는 키를 누르세요:

| 제조사 | BIOS 키 | 부팅 메뉴 키 |
|-------|--------|------------|
| Dell | F2 | F12 |
| HP | F10 | F9 |
| Lenovo | F1 / Enter | F12 |
| ASUS | F2 / Del | F8 |
| MSI | Del | F11 |
| Acer | F2 | F12 |

## 부팅 순서 변경

1. BIOS/UEFI 접근
2. "Boot" 또는 "시작" 섹션 찾기
3. "USB Drive"를 첫 번째 위치로 이동
4. 저장 및 재시작 (일반적으로 F10)

## 중요한 UEFI 설정

### Secure Boot 활성화/비활성화

```
UEFI → Security → Secure Boot → Disabled
```

::: tip 팁
Debian 13은 Secure Boot를 지원합니다. 일반적으로 비활성화할 필요가 없지만 일부 구형 시스템에서는 비활성화가 필요할 수 있습니다.
:::

## 설치 후

설치 후 부팅 순서를 원래 상태로 되돌리는 것을 잊지 마세요.
