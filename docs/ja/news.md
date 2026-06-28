---
title: Debian 最新ニュース
description: Debian プロジェクトの最近の更新、コミュニティイベント、リリース情報
---

# Debian 最新ニュース

このページでは、Debian プロジェクトの最近の重要な更新をまとめています。バージョンのメンテナンス状況、コミュニティイベント、プロジェクトガバナンスについての最新情報をお届けします。

## 2026 年の更新情報

### バージョンリリース

#### Debian 12（Bookworm）が LTS フェーズに移行（2026-06-10）

2026 年 6 月 10 日、Debian 12（Bookworm）はセキュリティチームによる通常のセキュリティサポートを終了し、正式に**長期サポート（LTS）**フェーズへ移行しました。今後のセキュリティ更新は Debian LTS チーム（ボランティアと企業）が担当し、**2028 年 6 月 30 日**まで継続される予定です。

- Debian 12 を引き続き使用しているシステムもセキュリティ更新を受け取れますが、Debian 13（Trixie）へのアップグレードを計画することを推奨します。
- [Debian LTS について](https://wiki.debian.org/LTS)
- [Debian 13 へのアップグレード手順](/ja/basics/upgrade)
- [リリースのサポート終了（EOL）](/ja/eol)

#### Debian 13.5 と 12.14 リリース（2026-05-16）

2026 年 5 月 16 日、Debian は 2 つのポイントリリースを同時に公開しました：
- **Debian 13.5**：現行安定版（Trixie）の第 5 回ポイントリリース。セキュリティ修正と重大なバグ修正を含みます
- **Debian 12.14**：旧安定版（oldstable、Bookworm）の定例ポイントリリース

- [公式アナウンス](https://www.debian.org/News/2026/2026051602)
- [Debian 13.5 をダウンロード](/ja/download)

#### Debian 13.4 リリース（2026-03-14）

Debian 13 (Trixie) の 4 番目のポイントアップデート **13.4** がリリースされました。このアップデートはセキュリティ修正と重要なバグ修正を中心とし、更新されたインストールイメージも提供されます。

- [公式アナウンス](https://www.debian.org/News/2026/20260314)
- [Debian 13.4 をダウンロード](/ja/download)

#### Debian 13.3 および 12.13 リリース（2026-01-10）

2026 年 1 月 10 日、Debian は同時にリリースしました：
- **Debian 13.3**: セキュリティ修正とバグ修正を含む安定版ポイントアップデート
- **Debian 12.13**: 以前にリリースされたセキュリティ修正を統合した oldstable の定期ポイントアップデート

#### 今後のリリーススケジュール

| 予定日 | バージョン |
|--------|-----------|
| 2026-07-11 | Debian 12.15 + 13.6 |

*日程は変更される場合があります。最新情報は [release.debian.org](https://release.debian.org/) をご確認ください。*

---

### コミュニティイベント

#### DebConf26 — アルゼンチン・サンタフェ

- **DebCamp**: 2026 年 7 月 13〜19 日
- **DebConf26**: 2026 年 7 月 20〜25 日
- **会場**: アルゼンチン・サンタフェ
- **ステータス**: 参加登録と発表募集が開始。基本的な参加は無料
- [詳細](https://bits.debian.org/2025/12/debconf26_dates.html)

#### Outreachy インターン（2025 年 12 月〜2026 年 3 月）

Debian は **OpenQA を使った Debian イメージテスト** に取り組む新たな Outreachy インターンを迎えました。テストインフラとコミュニティの人材育成への継続的な投資が続いています。

---

### プロジェクトガバナンス

#### 2026 年 DPL 選挙：Sruthi Chandran 氏が当選

2026 年の DPL 選挙は終了し、**Sruthi Chandran** 氏が新しい Debian プロジェクトリーダーに当選しました。任期は **2026 年 4 月 21 日** に始まり、2 期務めた Andreas Tille 氏の後任となります。今年唯一の候補者で、289 票対 50 票（None of the above）で当選しました。

| フェーズ | 日程 |
|---------|------|
| 候補者募集期間 | 3 月 7〜13 日 |
| キャンペーン期間 | 3 月 14 日〜4 月 3 日 |
| 投票期間 | 4 月 4〜17 日 |
| 新任期開始 | 4 月 21 日 |

- [選挙結果の発表](https://bits.debian.org/2026/04/dpl-elections-2026.html)
- [選挙の詳細](https://www.debian.org/vote/2026/vote_001)

#### 新メンバー

Debian は引き続き新メンバーを歓迎しています：
- 2025 年 11〜12 月の新 Debian 開発者/メンテナー（[アナウンス](https://bits.debian.org/2026/01/new-developers-2026-01.html)）
- 2026 年 1〜2 月の新メンバー（[アナウンス](https://bits.debian.org/2026/03/new-developers-2026-03.html)）

---

### セキュリティメンテナンス

Debian セキュリティチームは DSA（Debian セキュリティアドバイザリー）と DLA（Debian LTS アドバイザリー）の通知を継続的に公開しています。最近の対象パッケージには incus、lxd、libpng1.6、awstats などが含まれます。

- 安定版（Debian 13）はセキュリティチームによってメンテナンスされています
- Debian 12（Bookworm）は 2026-06-10 から LTS チームがメンテナンスを担当しています。Debian 11（Bullseye）の LTS サポートは 2026-08-31 に終了します
- [セキュリティアドバイザリー](https://www.debian.org/security/)

---

## 関連リンク

- [Debian 公式ニュース](https://www.debian.org/News/)
- [Bits from Debian ブログ](https://bits.debian.org/)
- [Debian セキュリティ情報](https://www.debian.org/security/)
- [Debian リリース管理](https://release.debian.org/)
- [リリースのサポート終了（EOL）](/ja/eol)
