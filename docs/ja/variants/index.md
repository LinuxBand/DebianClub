---
title: Debianの派生ディストリビューション
description: Debianをベースとした主要なLinuxディストリビューションの概要
---

# Debianの派生ディストリビューション

Debianは数百もの有名なLinuxディストリビューションのアップストリームとなっています。充実したパッケージエコシステム、厳格な品質基準、成熟したAPTパッケージマネージャーにより、さまざまなプロジェクトがDebianをベースにして各々の用途に特化したディストリビューションを構築しています。

以下は、デスクトップの使いやすさ、ペネトレーションテスト、プライバシー保護、超軽量環境など多岐にわたる10の主要なDebianデリバティブの厳選された概要です。

## 比較表

| ディストリビューション | ベース | デスクトップ | 対象ユーザー | 特徴 |
|---|---|---|---|---|
| [Ubuntu](/ja/variants/ubuntu) | Debian unstable/testing | GNOME | 一般ユーザー | 最も人気のあるデスクトップLinux |
| [Kali Linux](/ja/variants/kali) | Debian testing | Xfce | セキュリティ研究者 | 600以上のペネトレーションテストツール |
| [Linux Mint / LMDE](/ja/variants/mint) | Ubuntu / Debian stable | Cinnamon | 初心者 | 非常に使いやすい |
| [MX Linux](/ja/variants/mx-linux) | Debian stable | Xfce | 中級ユーザー | 軽量・安定・ツール充実 |
| [Raspberry Pi OS](/ja/variants/raspberry-pi-os) | Debian | LXDE/Pixel | Piハードウェアユーザー | ARM最適化・公式 |
| [Tails](/ja/variants/tails) | Debian stable | GNOME | プライバシー重視ユーザー | Torルーティング・痕跡を残さない |
| [Parrot OS](/ja/variants/parrot) | Debian testing | MATE/KDE | セキュリティ/開発者 | セキュリティツール＋日常利用 |
| [Deepin](/ja/variants/deepin) | Debian stable | DDE | 中国語・グローバルユーザー | 美しいUI・独自デスクトップ |
| [Devuan](/ja/variants/devuan) | Debian | Xfce/その他 | anti-systemdユーザー | systemdをsysvinitに置き換え |
| [antiX](/ja/variants/antix) | Debian stable | IceWM | 古いハードウェアユーザー | 256 MB RAMで動作 |

## 各ディストリビューションの概要

### [Ubuntu](/ja/variants/ubuntu)
Canonical Ltd.が開発・維持する、世界で最も人気のあるデスクトップLinuxディストリビューションです。6か月ごとにリリースされ、2年ごとにLTS（長期サポート）版が提供されます。巨大なエコシステムと強力なコミュニティサポートを誇ります。

### [Kali Linux](/ja/variants/kali)
ペネトレーションテストとサイバーセキュリティ研究のために特化して構築されており、600以上のセキュリティツールをデフォルトで搭載しています。Offensive Securityによって維持管理されており、Debian testingをベースとしたローリングリリースモデルを採用しています。

### [Linux Mint / LMDE](/ja/variants/mint)
シンプルさとアクセシビリティで有名です。メインエディションはUbuntuをベース、LMDE（Linux Mint Debian Edition）はDebian stableを直接ベースとしています。Windowsからの移行ユーザーに最適な選択肢です。

### [MX Linux](/ja/variants/mx-linux)
DistroWatchの常連1位で、Debian stableの信頼性とMX Toolsスイート、antiXの軽量基盤を組み合わせています。パフォーマンスと使いやすさの優れたバランスを実現しています。

### [Raspberry Pi OS](/ja/variants/raspberry-pi-os)
Raspberry Piハードウェア向けの公式推奨OSで、DebianをベースにARMプロセッサに深く最適化されています。デスクトップ版とLite（ヘッドレス）版が用意されています。

### [Tails](/ja/variants/tails)
プライバシーと匿名性を最優先に設計されたアムネシック（記憶消去型）ライブシステムです。すべてのネットワークトラフィックはTorを通じてルーティングされ、シャットダウン後にホストマシンに痕跡を残しません。

### [Parrot OS](/ja/variants/parrot)
イタリアのFrozenboxチームが開発したParrot OSは、セキュリティツールと日常のデスクトップ利用を両立しています。異なるワークフロー向けにSecurity、Home、HTBエディションを提供しています。

### [Deepin](/ja/variants/deepin)
中国の武漢Deepin Technology Co., Ltd.が開発したDeepinは、DDE（Deepin Desktop Environment）という美しいデスクトップ環境で知られており、Linux上で最も視覚的に洗練されたデスクトップ環境の一つとして広く認められています。

### [Devuan](/ja/variants/devuan)
systemdを従来のinitシステム（sysvinit、runit、またはOpenRC）に置き換えたDebianのフォークです。バージョン番号はDebianリリースと対応しており、Devuan 5 DaedalusはDebian 12 Bookwormと対応しています。

### [antiX](/ja/variants/antix)
わずか256 MBのRAMで快適に動作する超軽量Debianデリバティブです。systemdの代わりにsysvinitを使用し、レガシー32ビットハードウェアをサポートしており、古いマシンに新しい命を吹き込むのに最適です。

---

::: tip どれを選べばいいですか？
- 日常のデスクトップ・豊富なエコシステム → **Ubuntu** または **Linux Mint**
- ペネトレーションテスト・セキュリティ研究 → **Kali Linux** または **Parrot OS**
- プライバシーと匿名性 → **Tails**
- Raspberry Piプロジェクト → **Raspberry Pi OS**
- 古いまたは低スペックのハードウェア → **antiX** または **MX Linux**
- 美しいUI → **Deepin**
- systemd不使用 → **Devuan** または **antiX**
:::
