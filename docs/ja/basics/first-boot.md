---
title: 初回起動設定
description: Debian 13インストール後の初期設定
---

# 初回起動設定

## Debianへようこそ！

Debian 13のインストールに成功しました！

## 初回ログイン

```bash
# デスクトップ環境なしでインストールした場合
debian login: ユーザー名
Password: [パスワードを入力]
```

## ネットワーク設定

```bash
# コマンドラインでWiFiを設定
nmcli dev wifi list
nmcli dev wifi connect "WiFi名" password "パスワード"

# 接続を確認
ping -c 3 debian.org
```

## システムの更新

```bash
# パッケージリストを更新
sudo apt update

# すべてのパッケージをアップグレード
sudo apt upgrade -y

# 完全なディストリビューションアップグレード
sudo apt full-upgrade -y
```

## sudoの設定

```bash
# 必要に応じてsudoをインストール
su -c "apt install sudo"

# ユーザーをsudoグループに追加
su -c "usermod -aG sudo あなたのユーザー名"

# 変更を適用するためにログアウトして再ログイン
```

## 必須ツールのインストール

```bash
# 基本ツール
sudo apt install curl wget git vim htop -y

# マルチメディアコーデック
sudo apt install ffmpeg vlc -y
```

## 次のステップ

- [システム設定](/ja/basics/configuration)
- [デスクトップ環境](/ja/basics/desktop-environments)
