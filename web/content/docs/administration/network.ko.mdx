---
title: 네트워크 구성
description: Debian 13 네트워크 구성 가이드, 유선 네트워크, WiFi, 방화벽 및 네트워크 문제 해결 포함
---

# Debian 13 네트워크 구성

이 튜토리얼은 Debian 13에서 유선 네트워크, 무선 네트워크, 네트워크 서비스 및 문제 해결을 포함한 네트워크 연결 구성 및 관리 방법을 상세히 설명합니다.

## 🌐 네트워크 관리 기초

### NetworkManager

NetworkManager는 데스크톱 설치에서 가장 일반적인 네트워크 관리 도구입니다(`task-gnome-desktop` 등의 작업을 통해 자동 설치). 그러나 Debian은 이를 유일한 옵션으로 강제하지 않습니다 — 서버 및 최소 설치에서는 일반적으로 `ifupdown`(`/etc/network/interfaces`) 또는 `systemd-networkd`를 사용합니다:

```bash
# NetworkManager 상태 확인
systemctl status NetworkManager

# NetworkManager 재시작
sudo systemctl restart NetworkManager

# 네트워크 장치 확인
nmcli device status

# 네트워크 연결 확인
nmcli connection show
```

### 전통적인 네트워크 도구

```bash
# 네트워크 인터페이스 확인
ip addr show
ifconfig  # net-tools 설치 필요

# 라우팅 테이블 확인
ip route show
route -n  # net-tools 설치 필요

# 네트워크 연결성 테스트
ping google.com
traceroute google.com
```

## 🔌 유선 네트워크 구성

### 자동 구성 (DHCP)

대부분의 유선 네트워크는 DHCP를 사용하여 IP 주소를 자동으로 획득합니다:

```bash
# 유선 연결 확인
nmcli connection show --active

# 유선 연결 생성
sudo nmcli connection add type ethernet con-name "Wired" ifname eth0

# 연결 활성화
sudo nmcli connection up "Wired"

# IP 주소 재획득
sudo nmcli connection down "Wired" && sudo nmcli connection up "Wired"
```

### 고정 IP 구성

```bash
# 고정 IP 연결 생성
sudo nmcli connection add type ethernet con-name "Static" ifname eth0 \
    ip4 192.168.1.100/24 gw4 192.168.1.1

# DNS 서버 설정
sudo nmcli connection modify "Static" ipv4.dns "8.8.8.8,8.8.4.4"

# 수동 구성 설정
sudo nmcli connection modify "Static" ipv4.method manual

# 연결 활성화
sudo nmcli connection up "Static"
```

### 네트워크 인터페이스 명명

```bash
# 네트워크 인터페이스 이름 확인
ip link show

# 영구 네트워크 인터페이스 이름 확인
ls /sys/class/net/

# 인터페이스 이름 수정 (선택 사항)
sudo nano /etc/systemd/network/10-eth0.link
```

## 📶 WiFi 네트워크 구성

### 그래픽 인터페이스 구성

GNOME에서:
1. 오른쪽 상단 네트워크 아이콘 클릭
2. WiFi 네트워크 선택
3. 비밀번호 입력 후 연결

### 명령줄 구성

```bash
# WiFi 네트워크 스캔
nmcli device wifi list

# WiFi 네트워크 연결
sudo nmcli device wifi connect "WiFi이름" password "비밀번호"

# 숨겨진 네트워크 연결
sudo nmcli device wifi connect "WiFi이름" password "비밀번호" hidden yes

# 저장된 WiFi 연결 확인
nmcli connection show

# WiFi 연결 삭제
sudo nmcli connection delete "WiFi이름"
```

### WiFi 핫스팟 생성

```bash
# WiFi 핫스팟 생성
sudo nmcli device wifi hotspot ifname wlan0 ssid "MyHotspot" password "mypassword"

# 핫스팟 상태 확인
nmcli device status

# 핫스팟 중지
sudo nmcli device disconnect wlan0
```

### WiFi 드라이버 문제

```bash
# WiFi 장치 확인
lspci | grep -i wifi
lsusb | grep -i wifi

# 무선 모듈 확인
lsmod | grep wifi
iwconfig

# 추가 WiFi 드라이버 설치
sudo apt install firmware-iwlwifi  # Intel 네트워크 카드
sudo apt install firmware-realtek  # Realtek 네트워크 카드
sudo apt install firmware-atheros  # Atheros 네트워크 카드

# 네트워크 모듈 재로드
sudo modprobe -r iwlwifi && sudo modprobe iwlwifi
```

## 🔧 고급 네트워크 구성

### 네트워크 브리징

```bash
# 브리징 도구 설치
sudo apt install bridge-utils

# 네트워크 브리지 생성
sudo nmcli connection add type bridge con-name br0 ifname br0
sudo nmcli connection add type bridge-slave con-name br0-eth0 ifname eth0 master br0

# 브리지 IP 구성
sudo nmcli connection modify br0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify br0 ipv4.gateway 192.168.1.1
sudo nmcli connection modify br0 ipv4.dns 8.8.8.8
sudo nmcli connection modify br0 ipv4.method manual

# 브리지 활성화
sudo nmcli connection up br0
```

### VLAN 구성

```bash
# VLAN 인터페이스 생성
sudo nmcli connection add type vlan con-name vlan100 ifname eth0.100 \
    dev eth0 id 100

# VLAN IP 구성
sudo nmcli connection modify vlan100 ipv4.addresses 192.168.100.10/24
sudo nmcli connection modify vlan100 ipv4.method manual

# VLAN 활성화
sudo nmcli connection up vlan100
```

### 네트워크 본딩 (Bonding)

```bash
# 본딩 인터페이스 생성
sudo nmcli connection add type bond con-name bond0 ifname bond0 \
    bond.options "mode=active-backup,miimon=1000"

# 본딩 슬레이브 인터페이스 추가
sudo nmcli connection add type bond-slave con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type bond-slave con-name bond0-eth1 ifname eth1 master bond0

# 본딩 IP 구성
sudo nmcli connection modify bond0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify bond0 ipv4.method manual

# 본딩 활성화
sudo nmcli connection up bond0
```

## 🌍 DNS 구성

### systemd-resolved

`systemd-resolved`는 systemd가 제공하는 DNS 해석 서비스로, NetworkManager와 함께 사용할 수 있습니다. 그러나 **Debian에서는 기본적으로 설치 및 활성화되어 있지 않습니다**. 데스크톱 환경을 사용하고 NetworkManager가 실행 중인 경우, `/etc/resolv.conf`는 일반적으로 NetworkManager에 의해 직접 관리됩니다. systemd-resolved를 활성화하려는 경우:

```bash
# DNS 상태 확인
systemctl status systemd-resolved

# DNS 구성 확인
resolvectl status

# DNS 통계 확인
resolvectl statistics

# DNS 캐시 비우기
sudo resolvectl flush-caches
```

### 수동 DNS 구성

```bash
# DNS 임시 수정 (재시작 후 소멸)
sudo nano /etc/resolv.conf

# DNS 서버 추가
nameserver 8.8.8.8
nameserver 8.8.4.4

# DNS 영구 수정 (NetworkManager 통해)
sudo nmcli connection modify "연결이름" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "연결이름"
```

### 사용자 정의 DNS 서버

```bash
# dnsmasq 설치
sudo apt install dnsmasq

# dnsmasq 구성
sudo nano /etc/dnsmasq.conf

# 기본 구성
listen-address=127.0.0.1
bind-interfaces
cache-size=1000

# dnsmasq 활성화
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## 🔒 네트워크 보안

### 방화벽 구성

```bash
# UFW 설치 및 활성화
sudo apt install ufw
sudo ufw enable

# 기본 규칙
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 특정 포트 허용
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# 특정 IP 허용
sudo ufw allow from 192.168.1.100

# 규칙 확인
sudo ufw status verbose
```

### 네트워크 모니터링

```bash
# 네트워크 모니터링 도구 설치
sudo apt install nethogs iftop nload

# 네트워크 트래픽 모니터링
sudo nethogs    # 프로세스별 모니터링
sudo iftop      # 실시간 트래픽 모니터링
nload           # 네트워크 부하 모니터링

# 네트워크 연결 확인
ss -tuln        # 수신 포트 확인
netstat -tuln   # net-tools 설치 필요
```

### VPN 구성

#### OpenVPN 클라이언트

```bash
# OpenVPN 설치
sudo apt install openvpn

# 구성 파일 가져오기
sudo cp client.ovpn /etc/openvpn/client.conf

# VPN 시작
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client

# NetworkManager를 통한 VPN 관리
sudo apt install network-manager-openvpn-gnome
```

#### WireGuard VPN

```bash
# WireGuard 설치
sudo apt install wireguard

# 키 쌍 생성
wg genkey | tee privatekey | wg pubkey > publickey

# 구성 파일 생성
sudo nano /etc/wireguard/wg0.conf

# 예시 구성
[Interface]
PrivateKey = 개인키
Address = 10.0.0.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = 서버 공개키
Endpoint = 서버IP:포트
AllowedIPs = 0.0.0.0/0

# WireGuard 시작
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## 📊 네트워크 성능 최적화

### 네트워크 매개변수 튜닝

```bash
# 현재 네트워크 매개변수 확인
sysctl net.core.rmem_max
sysctl net.core.wmem_max

# 매개변수 임시 조정
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# 매개변수 영구 조정
sudo nano /etc/sysctl.d/99-network-performance.conf

# 최적화 매개변수 추가
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr

# 구성 적용
sudo sysctl -p /etc/sysctl.d/99-network-performance.conf
```

### 대역폭 테스트

```bash
# 속도 테스트 도구 설치
sudo apt install speedtest-cli

# 네트워크 속도 테스트
speedtest-cli

# iperf3 사용 테스트
sudo apt install iperf3

# 서버 측
iperf3 -s

# 클라이언트 테스트
iperf3 -c 서버IP
```

## 🆘 네트워크 문제 해결

### 기본 진단

```bash
# 1. 네트워크 인터페이스 확인
ip link show

# 2. IP 주소 확인
ip addr show

# 3. 라우팅 확인
ip route show

# 4. DNS 확인
nslookup google.com
dig google.com

# 5. 연결성 테스트
ping -c 4 8.8.8.8        # 외부 네트워크 테스트
ping -c 4 192.168.1.1    # 게이트웨이 테스트
```

### 일반적인 문제 해결

#### IP 주소 획득 불가

```bash
# 네트워크 서비스 재시작
sudo systemctl restart NetworkManager

# 수동 IP 획득
sudo dhclient eth0

# DHCP 로그 확인
journalctl -u NetworkManager
```

#### DNS 해석 실패

```bash
# DNS 구성 확인
cat /etc/resolv.conf

# DNS 서버 테스트
nslookup google.com 8.8.8.8

# DNS 캐시 비우기
sudo resolvectl flush-caches

# DNS 구성 재설정
sudo systemctl restart systemd-resolved
```

#### WiFi 연결 문제

```bash
# WiFi 장치 상태 확인
nmcli radio wifi

# WiFi 활성화
nmcli radio wifi on

# WiFi 장치 재시작
sudo nmcli device disconnect wlan0
sudo nmcli device connect wlan0

# 드라이버 확인
dmesg | grep -i wifi
```

### 네트워크 진단 스크립트

네트워크 진단 스크립트 생성:

```bash
#!/bin/bash
# 네트워크 진단 스크립트

echo "=== 네트워크 인터페이스 상태 ==="
ip link show

echo -e "\n=== IP 주소 정보 ==="
ip addr show

echo -e "\n=== 라우팅 테이블 ==="
ip route show

echo -e "\n=== DNS 구성 ==="
cat /etc/resolv.conf

echo -e "\n=== 게이트웨이 연결성 테스트 ==="
ping -c 3 $(ip route | grep default | awk '{print $3}')

echo -e "\n=== 외부 네트워크 연결성 테스트 ==="
ping -c 3 8.8.8.8

echo -e "\n=== DNS 해석 테스트 ==="
nslookup google.com

echo -e "\n=== 활성 연결 ==="
nmcli connection show --active
```

## 📝 네트워크 구성 백업

### 네트워크 구성 백업

```bash
# NetworkManager 구성 백업
sudo tar -czf network-backup.tar.gz /etc/NetworkManager/

# 연결 구성 백업
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-connections-backup/

# 네트워크 구성 내보내기
nmcli -f all connection show > network-connections.txt
```

### 네트워크 구성 복원

```bash
# 구성 파일 복원
sudo tar -xzf network-backup.tar.gz -C /

# NetworkManager 재로드
sudo systemctl reload NetworkManager

# 네트워크 재연결
nmcli connection reload
```

## 다음 단계

네트워크 구성을 마스터한 후 다음을 계속 학습할 수 있습니다:

1. [방화벽 구성](/administration/firewall) - 네트워크 보안 강화
2. [시스템 서비스 관리](/administration/services) - 네트워크 서비스 관리
3. [로그 관리](/administration/logs) - 네트워크 로그 확인

---

**네트워크 구성 완료하셨나요?** [방화벽 구성 계속 학습하기 →](/administration/firewall)