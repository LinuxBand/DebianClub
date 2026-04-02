---
title: Kali Linux — Debianデリバティブ
description: 業界標準のペネトレーションテスト・サイバーセキュリティディストリビューション。600以上のセキュリティツールをデフォルトで搭載。
---

# Kali Linux

Kali Linuxは最も知名度の高いセキュリティ特化型Linuxディストリビューションです。2013年にOffensive SecurityによってBackTrack Linuxの後継として公開されました。Debian testingをベースにローリングリリースモデルを採用しており、ペネトレーションテスト、デジタルフォレンジクス、リバースエンジニアリングのための600以上のプリインストールツールを搭載しています。

## 基本情報

| 属性 | 詳細 |
|---|---|
| ベース | Debian testing（ローリング） |
| リリースサイクル | ローリングリリース |
| デフォルトデスクトップ | Xfce（2019年以降）；GNOME、KDEも利用可能 |
| 対象ユーザー | セキュリティプロフェッショナル、ペンテスター、CTF参加者 |
| ウェブサイト | [https://www.kali.org](https://www.kali.org) |

## 主な特徴

- **600以上のセキュリティツール**: Nmap、Metasploit、Burp Suite、Wireshark、Aircrack-ng、John the Ripperなど、カテゴリごとに整理されており、インストール直後からすぐに使用できます。
- **ローリングリリースモデル**: Debian testingを追跡するため、完全な再インストールなしにツールが継続的に更新されます。
- **マルチプラットフォームサポート**: x86_64、ARM、WSL（Windows Subsystem for Linux）、Docker、専用Raspberry PiイメージなどBuild多岐にわたります。
- **ライブモード**: ディスクにインストールせずにUSBドライブから直接起動可能。一時的な評価や現地作業に最適です。
- **Kali Underwaterカバーモード**: ワンクリックでデスクトップをWindows 10に似せることができ、公共の場所での作業に便利です。

## Debianとの関係

Kali LinuxはDebian testingをベースにしており、そのブランチからパッケージを定期的に同期しています。Offensive Securityはカスタムカーネルパッチ（ワイヤレスカードのインジェクションサポートなど）を追加し、Debianには含まれないセキュリティツールの独自リポジトリを維持しています。KaliのパッケージマネジメントはDebianのAPTと互換性がありますが、**DebianやUbuntuのリポジトリをKaliシステムに混在させることは強く推奨されません**。ツールの依存関係やシステムの安定性が損なわれる可能性があります。

## はじめに

```bash
# ISOのダウンロード先: https://www.kali.org/get-kali/
# 推奨: フルインストール用のInstallerエディション、またはUSBブート用のLive

# インストール後、システムを更新
sudo apt update && sudo apt full-upgrade -y

# 完全なツールスイートをインストール
sudo apt install kali-linux-everything -y

# 最もよく使われる上位10ツールのみインストール
sudo apt install kali-tools-top10 -y

# GNOMEデスクトップに切り替える（任意）
sudo apt install kali-desktop-gnome -y
```

## こんな方におすすめ

- 許可されたセキュリティ評価を行うプロフェッショナルなペネトレーションテスター
- CTF（Capture The Flag）競技者やセキュリティチャレンジ参加者
- サイバーセキュリティコースや認定資格（OSCP、CEHなど）を学ぶ学生
- デジタルフォレンジクスアナリストやマルウェア研究者

::: warning 法的注意事項
Kali Linuxに含まれるツールは、自分が所有しているシステム、または明示的な書面による許可を得たシステムに対してのみ使用してください。ペネトレーションテストツールの無断使用は、ほとんどの法域で違法です。
:::

## 関連リンク

- ウェブサイト：[https://www.kali.org](https://www.kali.org)
- ダウンロード：[https://www.kali.org/get-kali/](https://www.kali.org/get-kali/)
- ドキュメント：[https://www.kali.org/docs/](https://www.kali.org/docs/)
- ツールインデックス：[https://www.kali.org/tools/](https://www.kali.org/tools/)
- Offensive Securityトレーニング：[https://www.offsec.com](https://www.offsec.com)

---

## 次のステップ

[Debianデリバティブの概要](/ja/variants/)に戻って、他のDebianベースのディストリビューションを探索しましょう。
