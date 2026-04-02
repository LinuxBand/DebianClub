---
title: 보안 관리
description: 사용자 접근 제어, 방화벽 구성, 자동 업데이트 및 침입 탐지 등 Debian 시스템의 보안을 관리하는 방법을 학습합니다.
---

# 보안 관리

Debian 시스템의 보안을 보장하는 것은 시스템 관리의 핵심 과제입니다. 이 가이드는 시스템을 강화하고 잠재적 위협으로부터 보호하는 데 도움이 되는 몇 가지 주요 영역을 소개합니다.

## 🔐 사용자 및 접근 제어

시스템에 대한 접근을 제한하는 것은 보안의 첫 번째 방어선입니다.

### 강력한 비밀번호 정책 강제 적용

`libpam-pwquality` 모듈을 사용하여 사용자가 더 안전한 비밀번호를 생성하도록 강제할 수 있습니다.

1.  **모듈 설치**:
    ```bash
    sudo apt update
    sudo apt install libpam-pwquality
    ```

2.  **정책 구성**:
    `/etc/security/pwquality.conf` 파일을 편집하여 비밀번호 규칙을 정의합니다.
    ```ini
    # 예제 구성:
    minlen = 10                  # 최소 길이 10
    dcredit = -1                 # 최소 1개의 숫자 포함
    ucredit = -1                 # 최소 1개의 대문자 포함
    lcredit = -1                 # 최소 1개의 소문자 포함
    ocredit = -1                 # 최소 1개의 특수 문자 포함
    difok = 3                    # 새 비밀번호에 이전 비밀번호와 최소 3개의 문자가 달라야 함
    ```

### SSH 보안 강화

서버에 원격으로 접근하는 가장 일반적인 방법은 SSH입니다. 다음은 몇 가지 강화 권장 사항입니다:

1.  **SSH 구성 파일 편집**:
    ```bash
    sudo nano /etc/ssh/sshd_config
    ```

2.  **권장 구성**:
    - **root 로그인 비활성화**: `PermitRootLogin no`
    - **비밀번호 인증 비활성화 (키 사용 권장)**: `PasswordAuthentication no`
    - **공개 키 인증 활성화**: `PubkeyAuthentication yes`
    - **기본 포트 변경 (선택 사항)**: `Port 2222`

3.  **SSH 서비스 재시작**:
    ```bash
    sudo systemctl restart sshd
    ```

## 🔥 방화벽 구성 (UFW)

Debian은 기본적으로 방화벽을 활성화하지 않습니다. `UFW` (Uncomplicated Firewall)는 사용자 친화적인 프론트엔드 도구입니다. Debian 13에서 UFW는 내부적으로 `nftables` 프레임워크를 사용합니다 (이전 `iptables` 구문과 호환됨).

1.  **UFW 설치**:
    ```bash
    sudo apt install ufw
    ```

2.  **기본 규칙 구성**:
    ```bash
    sudo ufw default deny incoming   # 모든 인바운드 연결 거부
    sudo ufw default allow outgoing  # 모든 아웃바운드 연결 허용
    sudo ufw allow ssh               # SSH 연결 허용 (또는 변경한 포트)
    sudo ufw allow http              # 웹 서버인 경우 HTTP 허용
    sudo ufw allow https             # HTTPS 허용
    ```

3.  **UFW 활성화**:
    ```bash
    sudo ufw enable
    ```
    시스템은 이 작업이 기존 SSH 연결을 끊을 수 있다고 경고합니다. 확인하세요.

4.  **상태 확인**:
    ```bash
    sudo ufw status verbose
    ```

## 🔄 자동 보안 업데이트

시기적절한 보안 패치 적용은 매우 중요합니다. `unattended-upgrades`는 보안 업데이트를 자동으로 설치할 수 있습니다.

1.  **설치**:
    ```bash
    sudo apt install unattended-upgrades
    ```

2.  **활성화**:
    구성 마법사를 실행하면 기본 구성 파일이 생성됩니다.
    ```bash
    sudo dpkg-reconfigure -plow unattended-upgrades
    ```
    표시되는 대화 상자에서 "예"를 선택하세요.

3.  **구성 미세 조정 (선택 사항)**:
    `/etc/apt/apt.conf.d/50unattended-upgrades` 파일을 편집하여 자동 재시작 활성화와 같은 업데이트 동작을 사용자 정의할 수 있습니다.

## 🛡️ 침입 방지 (Fail2Ban)

`Fail2Ban`은 로그 파일을 모니터링하고 의심스러운 행동(예: 여러 번의 실패한 로그인 시도)에 따라 방화벽 규칙을 자동으로 업데이트하여 IP 주소를 차단할 수 있습니다.

1.  **Fail2Ban 설치**:
    ```bash
    sudo apt install fail2ban
    ```

2.  **로컬 구성 파일 생성**:
    `.conf` 파일을 직접 수정하지 말고, `.local` 파일을 생성하여 덮어쓰세요.
    ```bash
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    sudo nano /etc/fail2ban/jail.local
    ```

3.  **SSH 보호 구성**:
    `jail.local`에서 `[sshd]` 섹션을 찾아 `enabled = true`인지 확인하세요. `maxretry` (최대 시도 횟수) 및 `bantime` (차단 시간)을 조정할 수 있습니다.
    ```ini
    [sshd]
    enabled = true
    port    = ssh
    maxretry = 3
    bantime = 3600  # 1시간 동안 차단
    ```

4.  **서비스 재시작**:
    ```bash
    sudo systemctl restart fail2ban
    ```

## 📝 로그 관리 및 감사

시스템 로그를 정기적으로 확인하는 것은 비정상적인 활동을 발견하는 핵심입니다.

- **`journalctl`을 사용하여 로그 보기**:
  ```bash
  # 모든 로그 보기 (오래된 것부터 최신 순)
  journalctl

  # 로그 실시간 모니터링
  journalctl -f

  # 특정 서비스(예: sshd)의 로그 보기
  journalctl -u sshd.service

  # 커널 로그 보기
  journalctl -k
  ```