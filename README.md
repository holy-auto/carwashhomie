# CarWashHomie

> **愛車にも、美容整形を。**
> ローライダー × オレンジ × 美容外科 コンセプトのカーディテーリングサロン。

The Auto Aesthetic Clinic by Homies. ローライダー専門の洗車・ディテーリング
クリニックとしてのブランドサイト（Next.js + TypeScript + Tailwind CSS）。

## コンセプト

- **美容外科**: 信頼感・高級感・Before/Afterによる効果訴求
- **ローライダー**: チカーノカルチャーへのリスペクト、ピンストライプ、クローム、低アングル
- **オレンジ**: サンセットのような温度感、親しみやすさ、キャンディペイント

## 技術スタック

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Fonts**: Playfair Display / Monoton / Noto Sans JP

## セクション構成

1. **Hero** — キャンディペイント背景とキャッチコピー
2. **施術メニュー** — 美容クリニック風カルテで洗車サービスを提示
3. **Before / After** — ドラッグで比較できるスライダー
4. **Dr. ホーミー** — 職人を"主治医"として紹介
5. **お客様の声** — レビューカード
6. **カウンセリング予約** — クリニック風フォーム
7. **フッター** — ピンストライプ装飾

## セットアップ

```bash
npm install
npm run dev
```

→ http://localhost:3000 を開く

## カラーパレット

| Token | Hex | 用途 |
| ----- | --- | ---- |
| sunset | `#FF6B1A` | プライマリ |
| sunset-light | `#FFB347` | アクセント |
| midnight | `#1A0F08` | 背景 |
| cream | `#FFF8F0` | 明るい背景・テキスト |
| chrome | `#E8E8EC` | クローム（装飾） |

## コンテンツ管理（クライアント自身で編集）

店舗オーナーが **施術メニュー（コーティング料金・洗車サービス）/
施術事例 / お知らせ / お客様の声** を自分で追加・編集できる
管理画面を `/admin` に用意しています。

※ 手洗い洗車メニューはサイト上から削除済み（DB 上は「非公開」で
保持しているため、管理画面からいつでも再公開・編集できます。
洗車メニューが 1 件も公開されていない間は、/menu の洗車サービス
欄ごと非表示になります）。

- **公開ページ** は Supabase から「公開」状態の行を読み取って表示
  （未設定時は組み込みのサンプルにフォールバック）。
- **管理画面** はパスワードログインで保護。書き込みはサーバー経由
  （service-role）で行うため、ブラウザ側に秘密鍵は出ません。
- 画像は Supabase Storage の公開バケット `media` にアップロード。

### データ構成（Supabase）

| テーブル | 内容 |
| --- | --- |
| `body_coatings` | ボディコーティング料金プラン（クラス・星・料金・特徴・表示順） |
| `wash_services` | 洗車サービスメニュー（名前・説明・料金・アイコン・表示順） |
| `gallery_cases` | 施術事例（Before/After 画像・色・説明・表示順） |
| `news_posts` | お知らせ・更新（タイトル・本文・画像・公開日時） |
| `testimonials` | お客様の声（名前・車種・評価・本文・表示順） |

匿名ユーザーは RLS により「公開」行の閲覧のみ可能。作成・更新・削除は
すべて `/api/admin/*`（middleware で保護）経由。

### セットアップ

1. `.env.example` を参考に環境変数を設定（ローカルは `.env.local`、
   本番は Vercel の Environment Variables）。
   - `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`（**秘密** / Supabase → Settings → API）
   - `ADMIN_PASSWORD`（ログインパスワード）
   - `ADMIN_SESSION_SECRET`（`openssl rand -hex 32` で生成）
2. `/admin` を開きパスワードでログイン → 各セクションを編集。
3. 「公開する」をオフにすると下書きとしてサイトに表示されません。
