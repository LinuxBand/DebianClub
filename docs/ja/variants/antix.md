---
title: antiX — Debian派生ディストロ
description: わずか256MBのRAMで動作し、sysvinitを使用して古いハードウェアに新しい命を吹き込む超軽量Debian派生ディストロ
---

# antiX

antiXはギリシャの開発者anticapitalistaが率いる極めて軽量なDebian stable派生ディストロで、古いコンピューターや低リソースハードウェア向けに特別に設計されています。systemdなしで動作し（代わりにsysvinitを使用）、わずか256MBのRAMで快適に実行できます。MX Linuxの基盤となっているディストロでもあります。

## 基本情報

| 属性 | 詳細 |
|---|---|
| ベース | Debian stable |
| リリースサイクル | Debian stableに準拠；定期的な更新リリース |
| デフォルトデスクトップ | IceWM（デフォルト）、Fluxbox、JWM、Herbstluftwm |
| 対象ユーザー | 古いハードウェアのオーナー、ミニマリスト、anti-systemdユーザー |
| ウェブサイト | [https://antixlinux.com](https://antixlinux.com) |

## 主な特徴

- **超軽量フットプリント**: 完全なantiXデスクトップが150〜200MBのRAMでアイドル状態。
- **systemdなし**: antiXはinit systemとしてsysvinitを使用します。
- **4つのインストールエディション**: Full、Base、Core（コマンドラインのみ）、Net。
- **レガシー32ビットサポート**: まだ32ビットイメージを提供している数少ない積極的にメンテナンスされているディストロの一つ。

## はじめに

```bash
# https://antixlinux.com/download/ からダウンロード
# Full、Base、Core、Netエディションで提供 — 32ビットと64ビット

# インストール後、システムを更新
sudo apt update && sudo apt upgrade -y

# RAM使用量を確認
free -h

# sysvinitでのサービス管理
sudo service <サービス名> start
sudo update-rc.d <サービス名> enable
```

::: tip antiX vs. MX Linux
antiXはより極端な選択 — より軽量でコマンドラインに近い。MX LinuxはantiX上に構築されていますが、グラフィカルツールとより使いやすいインターフェースを追加しています。
:::

## 関連リンク

- ウェブサイト: [https://antixlinux.com](https://antixlinux.com)
- ダウンロード: [https://antixlinux.com/download/](https://antixlinux.com/download/)
- コミュニティフォーラム: [https://www.antixforum.com](https://www.antixforum.com)

---

## 次のステップ

[Debian派生ディストロの概要](/ja/variants/)に戻る。
