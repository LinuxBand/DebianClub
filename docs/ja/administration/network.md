---
title: ネットワーク設定
description: Debian 13 ネットワーク設定ガイド、有線ネットワーク、WiFi、ファイアウォール、ネットワークトラブルシューティングを含む
---

# Debian 13 ネットワーク設定

このチュートリアルでは、Debian 13 でのネットワーク接続の設定と管理方法を詳細に説明します。有線ネットワーク、無線ネットワーク、ネットワークサービス、トラブルシューティングを含みます。

## 🌐 ネットワーク管理の基礎

### NetworkManager

NetworkManager はデスクトップインストールで最も一般的なネットワーク管理ツールです（`task-gnome-desktop` などのタスクを通じて自動インストールされます）が、Debian はこれを唯一のオプションとして強制しません——サーバーや最小限のインストールでは通常 `ifupdown`（`/etc/network/interfaces`）または `systemd-networkd` を使用します：

```bash
# NetworkManager の状態を確認
systemctl status NetworkManager

# NetworkManager を再起動
sudo systemctl restart NetworkManager

# ネットワークデバイスを表示
nmcli device status

# ネットワーク接続を表示
nmcli connection show
```

### 従来のネットワークツール

```bash
# ネットワークインターフェースを表示
ip addr show
ifconfig  # net-tools のインストールが必要

# ルーティングテーブルを表示
ip route show
route -n  # net-tools のインストールが必要

# ネットワーク接続性をテスト
ping google.com
traceroute google.com
```

## 🔌 有線ネットワーク設定

### 自動設定 (DHCP)

ほとんどの有線ネットワークは DHCP を使用して IP アドレスを自動取得します：

```bash
# 有線接続を表示
nmcli connection show --active

# 有線接続を作成
sudo nmcli connection add type ethernet con-name "Wired" ifname eth0

# 接続を有効化
sudo nmcli connection up "Wired"

# IP アドレスを再取得
sudo nmcli connection down "Wired" && sudo nmcli connection up "Wired"
```

### 静的 IP 設定

```bash
# 静的 IP 接続を作成
sudo nmcli connection add type ethernet con-name "Static" ifname eth0 \
    ip4 192.168.1.100/24 gw4 192.168.1.1

# DNS サーバーを設定
sudo nmcli connection modify "Static" ipv4.dns "8.8.8.8,8.8.4.4"

# 手動設定を設定
sudo nmcli connection modify "Static" ipv4.method manual

# 接続を有効化
sudo nmcli connection up "Static"
```

### ネットワークインターフェース命名

```bash
# ネットワークインターフェース名を表示
ip link show

# 永続的なネットワークインターフェース名を表示
ls /sys/class/net/

# インターフェース名を変更（オプション）
sudo nano /etc/systemd/network/10-eth0.link
```

## 📶 WiFi ネットワーク設定

### グラフィカルインターフェース設定

GNOME では：
1. 右上のネットワークアイコンをクリック
2. WiFi ネットワークを選択
3. パスワードを入力して接続

### コマンドライン設定

```bash
# WiFi ネットワークをスキャン
nmcli device wifi list

# WiFi ネットワークに接続
sudo nmcli device wifi connect "WiFi名称" password "パスワード"

# 非表示ネットワークに接続
sudo nmcli device wifi connect "WiFi名称" password "パスワード" hidden yes

# 保存済みの WiFi 接続を表示
nmcli connection show

# WiFi 接続を削除
sudo nmcli connection delete "WiFi名称"
```

### WiFi ホットスポット作成

```bash
# WiFi ホットスポットを作成
sudo nmcli device wifi hotspot ifname wlan0 ssid "MyHotspot" password "mypassword"

# ホットスポットの状態を表示
nmcli device status

# ホットスポットを停止
sudo nmcli device disconnect wlan0
```

### WiFi ドライバー問題

```bash
# WiFi デバイスを確認
lspci | grep -i wifi
lsusb | grep -i wifi

# 無線モジュールを確認
lsmod | grep wifi
iwconfig

# 追加の WiFi ドライバーをインストール
sudo apt install firmware-iwlwifi  # Intel ネットワークカード
sudo apt install firmware-realtek  # Realtek ネットワークカード
sudo apt install firmware-atheros  # Atheros ネットワークカード

# ネットワークモジュールを再読み込み
sudo modprobe -r iwlwifi && sudo modprobe iwlwifi
```

## 🔧 高度なネットワーク設定

### ネットワークブリッジ

```bash
# ブリッジツールをインストール
sudo apt install bridge-utils

# ネットワークブリッジを作成
sudo nmcli connection add type bridge con-name br0 ifname br0
sudo nmcli connection add type bridge-slave con-name br0-eth0 ifname eth0 master br0

# ブリッジ IP を設定
sudo nmcli connection modify br0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify br0 ipv4.gateway 192.168.1.1
sudo nmcli connection modify br0 ipv4.dns 8.8.8.8
sudo nmcli connection modify br0 ipv4.method manual

# ブリッジを有効化
sudo nmcli connection up br0
```

### VLAN 設定

```bash
# VLAN インターフェースを作成
sudo nmcli connection add type vlan con-name vlan100 ifname eth0.100 \
    dev eth0 id 100

# VLAN IP を設定
sudo nmcli connection modify vlan100 ipv4.addresses 192.168.100.10/24
sudo nmcli connection modify vlan100 ipv4.method manual

# VLAN を有効化
sudo nmcli connection up vlan100
```

### ネットワークボンディング (Bonding)

```bash
# ボンディングインターフェースを作成
sudo nmcli connection add type bond con-name bond0 ifname bond0 \
    bond.options "mode=active-backup,miimon=1000"

# ボンディングスレーブインターフェースを追加
sudo nmcli connection add type bond-slave con-name bond0-eth0 ifname eth0 master bond0
sudo nmcli connection add type bond-slave con-name bond0-eth1 ifname eth1 master bond0

# ボンディング IP を設定
sudo nmcli connection modify bond0 ipv4.addresses 192.168.1.100/24
sudo nmcli connection modify bond0 ipv4.method manual

# ボンディングを有効化
sudo nmcli connection up bond0
```

## 🌍 DNS 設定

### systemd-resolved

`systemd-resolved` は systemd が提供する DNS 解決サービスで、NetworkManager と連携できますが、**Debian ではデフォルトでインストール・有効化されていません**。デスクトップ環境を使用しており NetworkManager が実行されている場合、`/etc/resolv.conf` は通常 NetworkManager によって直接管理されます。systemd-resolved を有効化することを選択した場合：

```bash
# DNS 状態を確認
systemctl status systemd-resolved

# DNS 設定を確認
resolvectl status

# DNS 統計を確認
resolvectl statistics

# DNS キャッシュをクリア
sudo resolvectl flush-caches
```

### 手動 DNS 設定

```bash
# 一時的に DNS を変更（再起動後に失効）
sudo nano /etc/resolv.conf

# DNS サーバーを追加
nameserver 8.8.8.8
nameserver 8.8.4.4

# 永続的に DNS を変更（NetworkManager 経由）
sudo nmcli connection modify "接続名" ipv4.dns "8.8.8.8,8.8.4.4"
sudo nmcli connection up "接続名"
```

### カスタム DNS サーバー

```bash
# dnsmasq をインストール
sudo apt install dnsmasq

# dnsmasq を設定
sudo nano /etc/dnsmasq.conf

# 基本設定
listen-address=127.0.0.1
bind-interfaces
cache-size=1000

# dnsmasq を有効化
sudo systemctl enable dnsmasq
sudo systemctl start dnsmasq
```

## 🔒 ネットワークセキュリティ

### ファイアウォール設定

```bash
# UFW をインストールして有効化
sudo apt install ufw
sudo ufw enable

# 基本ルール
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 特定のポートを許可
sudo ufw allow 22        # SSH
sudo ufw allow 80        # HTTP
sudo ufw allow 443       # HTTPS

# 特定の IP を許可
sudo ufw allow from 192.168.1.100

# ルールを表示
sudo ufw status verbose
```

### ネットワーク監視

```bash
# ネットワーク監視ツールをインストール
sudo apt install nethogs iftop nload

# ネットワークトラフィックを監視
sudo nethogs    # プロセスごとに監視
sudo iftop      # リアルタイムトラフィック監視
nload           # ネットワーク負荷監視

# ネットワーク接続を表示
ss -tuln        # リスニングポートを表示
netstat -tuln   # net-tools のインストールが必要
```

### VPN 設定

#### OpenVPN クライアント

```bash
# OpenVPN をインストール
sudo apt install openvpn

# 設定ファイルをインポート
sudo cp client.ovpn /etc/openvpn/client.conf

# VPN を起動
sudo systemctl start openvpn@client
sudo systemctl enable openvpn@client

# NetworkManager で VPN を管理
sudo apt install network-manager-openvpn-gnome
```

#### WireGuard VPN

```bash
# WireGuard をインストール
sudo apt install wireguard

# 鍵ペアを生成
wg genkey | tee privatekey | wg pubkey > publickey

# 設定ファイルを作成
sudo nano /etc/wireguard/wg0.conf

# 設定例
[Interface]
PrivateKey = あなたの秘密鍵
Address = 10.0.0.2/24
DNS = 8.8.8.8

[Peer]
PublicKey = サーバーの公開鍵
Endpoint = サーバーIP:ポート
AllowedIPs = 0.0.0.0/0

# WireGuard を起動
sudo wg-quick up wg0
sudo systemctl enable wg-quick@wg0
```

## 📊 ネットワークパフォーマンス最適化

### ネットワークパラメータチューニング

```bash
# 現在のネットワークパラメータを表示
sysctl net.core.rmem_max
sysctl net.core.wmem_max

# 一時的にパラメータを調整
sudo sysctl -w net.core.rmem_max=134217728
sudo sysctl -w net.core.wmem_max=134217728

# 永続的にパラメータを調整
sudo nano /etc/sysctl.d/99-network-performance.conf

# 最適化パラメータを追加
net.core.rmem_max = 134217728
net.core.wmem_max = 134217728
net.core.netdev_max_backlog = 5000
net.ipv4.tcp_congestion_control = bbr

# 設定を適用
sudo sysctl -p /etc/sysctl.d/99-network-performance.conf
```

### 帯域幅テスト

```bash
# 速度テストツールをインストール
sudo apt install speedtest-cli

# ネットワーク速度をテスト
speedtest-cli

# iperf3 を使用してテスト
sudo apt install iperf3

# サーバー側
iperf3 -s

# クライアント側テスト
iperf3 -c サーバーIP
```

## 🆘 ネットワークトラブルシューティング

### 基本診断

```bash
# 1. ネットワークインターフェースを確認
ip link show

# 2. IP アドレスを確認
ip addr show

# 3. ルーティングを確認
ip route show

# 4. DNS を確認
nslookup google.com
dig google.com

# 5. 接続性をテスト
ping -c 4 8.8.8.8        # 外部ネットワークをテスト
ping -c 4 192.168.1.1    # ゲートウェイをテスト
```

### 一般的な問題解決

#### IP アドレスを取得できない

```bash
# ネットワークサービスを再起動
sudo systemctl restart NetworkManager

# 手動で IP を取得
sudo dhclient eth0

# DHCP ログを確認
journalctl -u NetworkManager
```

#### DNS 解決が失敗する

```bash
# DNS 設定を確認
cat /etc/resolv.conf

# DNS サーバーをテスト
nslookup google.com 8.8.8.8

# DNS キャッシュをクリア
sudo resolvectl flush-caches

# DNS 設定をリセット
sudo systemctl restart systemd-resolved
```

#### WiFi 接続問題

```bash
# WiFi デバイスの状態を確認
nmcli radio wifi

# WiFi を有効化
nmcli radio wifi on

# WiFi デバイスを再起動
sudo nmcli device disconnect wlan0
sudo nmcli device connect wlan0

# ドライバーを確認
dmesg | grep -i wifi
```

### ネットワーク診断スクリプト

ネットワーク診断スクリプトを作成：

```bash
#!/bin/bash
# ネットワーク診断スクリプト

echo "=== ネットワークインターフェース状態 ==="
ip link show

echo -e "\n=== IP アドレス情報 ==="
ip addr show

echo -e "\n=== ルーティングテーブル ==="
ip route show

echo -e "\n=== DNS 設定 ==="
cat /etc/resolv.conf

echo -e "\n=== ゲートウェイ接続性テスト ==="
ping -c 3 $(ip route | grep default | awk '{print $3}')

echo -e "\n=== 外部ネットワーク接続性テスト ==="
ping -c 3 8.8.8.8

echo -e "\n=== DNS 解決テスト ==="
nslookup google.com

echo -e "\n=== アクティブな接続 ==="
nmcli connection show --active
```

## 📝 ネットワーク設定のバックアップ

### ネットワーク設定のバックアップ

```bash
# NetworkManager 設定をバックアップ
sudo tar -czf network-backup.tar.gz /etc/NetworkManager/

# 接続設定をバックアップ
sudo cp -r /etc/NetworkManager/system-connections/ ~/network-connections-backup/

# ネットワーク設定をエクスポート
nmcli -f all connection show > network-connections.txt
```

### ネットワーク設定の復元

```bash
# 設定ファイルを復元
sudo tar -xzf network-backup.tar.gz -C /

# NetworkManager を再読み込み
sudo systemctl reload NetworkManager

# ネットワークを再接続
nmcli connection reload
```

## 次のステップ

ネットワーク設定をマスターしたら、次を学習できます：

1. [ファイアウォール設定](/administration/firewall) - ネットワークセキュリティを強化
2. [システムサービス管理](/administration/services) - ネットワークサービスを管理
3. [ログ管理](/administration/logs) - ネットワークログを表示

---

**ネットワーク設定は完了しましたか？** [ファイアウォール設定の学習を続ける →](/administration/firewall)