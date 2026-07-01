# Debian Linux Reliability Skill 日本語説明

このファイルはメンテナーと日本語ユーザー向けの説明です。実際の `SKILL.md` は、AI agent が安定して検出して実行できるよう英語のままにします。

## 目的

`debian-linux-reliability` は、Debian/Linux の開発、運用、トラブルシューティング向けの信頼性 skill です。AI に知識を暗記させるのではなく、まずシステムの事実を収集し、モジュール化された手順に沿って提案させることを目的とします。

## 既定の境界

- 既定では読み取り専用の診断だけを行う。
- 既定ではパッケージをインストールしない、ファイルを削除しない、システム設定を編集しない、サービスを再起動しない、ファイアウォールやディスクパーティションを変更しない。
- ユーザーが明示的に変更を求めた場合は、実行前にリスク、影響範囲、検証方法、ロールバック方法を説明する。

## サブ機能

- 環境検出：ディストリビューション、リリース、アーキテクチャ、WSL、コンテナ、systemd、権限。
- APT 安全性：パッケージ名検証、リポジトリ確認、backports、サードパーティリポジトリのリスク。
- コマンド安全性：`rm -rf`、`dd`、`mkfs`、`curl | sh` などの高リスクコマンドを検出。
- systemd トラブルシューティング：サービス状態、unit ファイル、journal ログ、起動失敗。
- ネットワーク診断：DNS、ルーティング、ポート、ファイアウォール、NetworkManager、systemd-networkd。
- 開発環境：Node、Python、Rust、Go、C/C++、Git、ビルド依存関係。
- GPU ドライバー：NVIDIA、AMD、Intel、Mesa、Wayland/X11、Secure Boot、DKMS。
- コンテナ：Podman、Docker、rootless、Compose、volume 権限、cgroup v2。
- Debian パッケージング：`debian/control`、`sbuild`、`lintian`、backports パッケージング。
- セキュリティ監査：Lynis の有無、監査出力の解釈、段階的な hardening 計画。

## DebianClub との連携

DebianClub に該当する内容がある場合、AI はまずリポジトリ内の DebianClub ページを参照し、そのうえでユーザーのマシンから得た読み取り専用の診断結果と組み合わせて回答します。DebianClub 文書は説明と学習に使い、リアルタイムのパッケージ名、バージョン、サービス状態はユーザー環境での検査結果を基準にします。
