# カードコレクション・ゲーミフィケーション 設計ドキュメント

> 施工事例・お役立ち情報の**滞在時間 / 回遊 / 再訪 / 来店**を伸ばすための、
> 「散らばったカードを集めてブックを完成させる」体験の設計書。
> HUNTER×HUNTER グリードアイランド編の「ブック」から着想。
> このドキュメントは**設計フェーズの成果物**であり、実装コードは含みません。

- ステータス: ドラフト（実装前レビュー用）
- 対象ブランチ: `claude/card-collection-gamification-4el3p3`
- カード設置先（初期）: **施工事例（gallery）** と **お役立ち情報（useful）**
- 前提スタック: Next.js App Router + Supabase + 既存の管理画面（`/admin`）

---

## 1. 目的とKPI

### 狙い
1. **滞在時間の増加** — 記事や事例を"最後まで読む"動機（カードは本文中に潜む）。
2. **回遊の増加** — 別ページにも別のカードがある → サイト内を巡る。
3. **再訪の増加** — コンプ手前で止めておく設計 + 期間限定カード → また来る。
4. **来店/CVの増加** — マイルストーン報酬をクーポン/LINE特典に接続し、来店・予約へ橋渡し。

### 計測するKPI（Phase 3で本格計測、Phase 1でも簡易ログは残す）
| KPI | 取り方 |
| --- | --- |
| カード付き記事の平均滞在時間 | GA4 等の `engagement_time` を設置有無で比較 |
| カード取得率（記事到達→取得） | `card_collected` イベント / 記事PV |
| ブックページ到達率・コンプ率 | `/book` PV、コンプユーザー数 |
| クーポン発行→使用率 | 発行コード数 / 店頭・LINEでの消込数 |
| 再訪率 | 取得ユーザーの7日/30日以内再訪 |

---

## 2. 体験フロー（ユーザー視点）

```
施工事例 / お役立ち記事を閲覧
        │  本文中に「キラッと光るカード」が潜んでいる
        ▼
カードをタップ → 取得アニメ → 「◯◯を手に入れた！」トースト
        │  (端末内に保存。Phase2でLINEに紐付け)
        ▼
ヘッダー/フッターに「ブック ▐▐▐ 7/24」進捗バッジが増える
        │
        ▼
/book（ブック）を開く
   ├─ 取得済み: カード表面＋めくると「洗車お役立ち要約(Tip)」が読める
   ├─ 未取得 : シルエット＋「どのあたりにありそう」ヒント → 該当ページへ回遊
   └─ 進捗   : 「あと3枚でシルバー特典」など次の報酬を提示
        │
        ▼
マイルストーン到達 → クーポンコード表示 / LINE特典へ誘導 → 来店・予約
```

「集めたカードを後から開くと洗車お役立ち情報の要約が読める」= 各カードの `tip_summary`。
**ゲーム目的で来た人にも実利（知識）と来店動機が残る**のが本施策の肝。

---

## 3. カードの世界観・仕様

### レアリティ（例）
| ランク | 位置づけ | 出現の主戦場 |
| --- | --- | --- |
| N（ノーマル） | 基本の洗車Tip | お役立ち情報の各記事 |
| R（レア） | 事例に紐づく施工ノウハウ | 施工事例（Before/After） |
| SR | 季節・キャンペーン限定 | 期間限定で各所 |
| SS（シークレット） | 隠し・イベント | トップの隠し要素など（将来） |

### 1枚のカードが持つ情報
- コード（例: `WASH-01`）／名前／レアリティ／カテゴリ
- ビジュアル（画像 or カラー。既存 gallery と同様に画像未設定でも成立させる）
- **`tip_summary`**: ブックで開いたときに読める「洗車お役立ち要約」（1〜3行）
- **`hint`**: 未取得時にブックへ出す「ありそうな場所」ヒント（回遊誘導）
- 掲載元（どの記事/事例に紐づくか）＝取得地点

> 添付ネタの「薄っぺらな嘘（ドッキリテクスチャー）」は、カードの**キラッと光る質感**として
> CSSのシマー/ホログラム風エフェクトで表現する（世界観の遊び）。

---

## 4. データモデル（Supabase）

既存テーブル（`gallery_cases`, `useful_articles` など）と同じ流儀で追加する。
**公開列は RLS で anon 読み取り可**、書き込みは service-role（管理API）のみ。

### 4.1 `collectible_cards` — カードマスタ（管理画面で編集）
| 列 | 型 | 説明 |
| --- | --- | --- |
| `id` | uuid pk | |
| `code` | text unique | 表示/参照コード（例 `WASH-01`）。**取得判定のキー** |
| `name` | text | カード名 |
| `rarity` | text | `N` / `R` / `SR` / `SS` |
| `category` | text null | 分類（例: 洗車, コーティング, 内装…） |
| `tip_summary` | text null | ブックで開くと読める要約 |
| `hint` | text null | 未取得時のヒント |
| `image_url` | text null | 画像。未設定なら色で描画 |
| `accent_color` | text null | 画像なし時の背景色 |
| `series` | text null | セット名（季節/キャンペーン等。コンプ判定単位に使える） |
| `sort_order` | int | 並び順 |
| `published` | bool | 公開/非公開 |
| `created_at` | timestamptz default now() | |

### 4.2 カードの「設置」— 既存コンテンツへの紐付け
既存の `gallery_cases` / `useful_articles` に**設置用の列を1つ足す**方式を基本とする
（新テーブルを増やさず、管理画面の1フィールド追加で済む）。

- `gallery_cases.card_code` text null … その事例に潜ませるカードの `code`
- `useful_articles.card_code` text null … その記事に潜ませるカードの `code`

> 1記事に複数枚潜ませたくなったら、後で中間テーブル
> `content_card_placements(content_type, content_id, card_code, position)` に拡張可能。
> 初期は1コンテンツ=最大1枚のシンプル運用で開始する。

### 4.3 進捗の保存

- **Phase 1**: サーバーに保存しない。**ブラウザの localStorage** に取得済み `code` の配列を保存。
  - 例: `chw:collection = { codes: ["WASH-01","CASE-03"], updatedAt: ... }`
  - メリット: 実装が軽い / ログイン不要で即遊べる。
  - 割り切り: 端末をまたげない・Cookie消去でリセット。**本物の報酬原資は乗せない**（後述）。
- **Phase 2**: LINEログインで本人を識別し、下記テーブルへ移送。

#### `user_collections`（Phase 2で導入）
| 列 | 説明 |
| --- | --- |
| `id` uuid pk | |
| `line_user_id` text | LINEログインで得た本人ID |
| `card_code` text | 取得カード |
| `collected_at` timestamptz | 取得日時（不正検知・分析用） |
| unique(`line_user_id`,`card_code`) | 二重取得防止 |

---

## 5. 管理画面への組み込み

既存の**ホワイトリスト方式**（`lib/admin-resources.ts` の `RESOURCES`）にリソースを1つ追加するだけで、
`/admin` の汎用エディタ（`components/admin/ResourceEditor.tsx`）にそのまま乗る。

```
cards: {
  table: "collectible_cards",
  fields: ["code","name","rarity","category","tip_summary","hint",
           "image_url","accent_color","series","sort_order","published"],
  numericFields: ["sort_order"],
  booleanFields: ["published"],
  order: { column: "sort_order", ascending: true },
  label: "コレクションカード",
}
```

加えて、既存の `gallery` / `useful` リソースの `fields` に `card_code` を足せば、
**「この事例/記事にどのカードを潜ませるか」を管理画面から選べる**ようになる。

`lib/content.ts` には `getCards()`（公開カード一覧）を、既存 fetcher と同じ
`getPublicClient()` → 失敗時デフォルトのパターンで追加する。

---

## 6. フロントエンド構成

### 6.1 カードを潜ませる `<CardDrop code="WASH-01" />`
- 施工事例ページ（`app/gallery/page.tsx` → `components/BeforeAfter.tsx` 付近）と
  お役立ち記事（`components/Useful.tsx`）の本文レンダリング内に差し込む。
- 表示: 小さめの光るカード。ホバー/タップで取得。
- クリック時: localStorage に `code` を追記 → トースト表示 → 進捗バッジ更新。
- 取得済みなら「取得済み」表示に切り替え（再取得しない）。

### 6.2 進捗バッジ（グローバル）
- `Navbar.tsx` か固定フッターに `ブック n/N` を常時表示 → `/book` への導線。
- クライアント状態は軽量な React Context（`CollectionProvider`）で共有。

### 6.3 ブックページ `/book`
- グリッドのバインダー風UI（添付のブック見開きイメージに寄せる）。
- 取得済み: 表面＋タップで**裏返って `tip_summary`**（洗車お役立ち要約）を表示。
- 未取得: シルエット＋`hint` → 「探しに行く」ボタンで該当カテゴリのページへ。
- 上部に進捗ゲージと「次の報酬まであと◯枚」。
- シリーズ別タブ（季節/キャンペーン）でコンプ単位を提示。

### 6.4 状態管理・SSRの扱い
- 既存の公開ページは `export const dynamic = "force-dynamic"` のServer Component。
- カードマスタ（`getCards()`）は**サーバー取得**、取得済み状態は**クライアント（localStorage）**。
  → ハイドレーション後に「取得済み/未取得」を反映（サーバーは未取得前提で描画してチラつき回避）。

---

## 7. 報酬設計（ここが事業リスクの分水嶺）

「HP上で集めたカード → LINEスタンプが自動で溜まる」の**自動連携は公式には用意されていない**。
LINE公式アカウントの「ショップカード」は無料だが、Webの行動で自動付与する仕組みが無いため、
**遊び（収集）と報酬（換金）を分離**して段階導入する。

### Phase 1（外部連携なし・すぐ回せる）
- マイルストーン到達（例: 5枚 / 10枚 / コンプ）で **クーポンコードを画面表示**。
  - コードは**汎用コード**（例: `HOMIE-BOOK10`）でよい。原資の大きい特典は乗せない。
  - 「スクショしてご来店 or LINEで提示」で店頭消込（人力運用）。
- または **LINEショップカードのQR/URLに誘導**（付与は店頭でスタッフが実施）。
- 割り切り: localStorage ベースなので**なりすまし可能**。よって Phase 1 の報酬は
  「割引の入口」程度に抑え、高額原資はコンプ＝来店を条件にする。

### Phase 2（本人紐付けで本格化）
- **LINEログイン**でコレクションをLINEユーザーに紐付け → `user_collections` に保存。
- サーバー側で取得を検証（同一 `line_user_id` の重複付与を防止）。
- Messaging API で**自動でクーポン/特典を配信**、消込もデジタル化。
- これで初めて「集める→自動で溜まる→特典」が破綻なく回る。

> 景品表示法・LINE公式アカウントガイドラインの観点で、特典条件（上限・期限・除外）は
> 事前に明記する。高額景品を"確率"で配る設計は避け、**達成型（コンプ=確定特典）**にする。

---

## 8. 不正対策・エッジケース

| 論点 | Phase 1の扱い | Phase 2の扱い |
| --- | --- | --- |
| Cookie消去で集め直し | 許容（報酬は軽い） | LINE本人紐付けで無効化 |
| 同一カード二重取得 | localStorageで重複排除 | DBの unique 制約 |
| 非公開/削除カードの取得済み表示 | 表示時に公開マスタと突合し無効分は隠す | 同左 |
| クーポン濫用 | 汎用コード＋店頭判断 | 個別コード＋消込管理 |
| SSRとの不整合（チラつき） | 初期は未取得で描画→ハイドレーション後に反映 | 同左 |

---

## 9. 段階的ロードマップ

### Phase 1 — MVP（外部連携なし）
- [ ] `collectible_cards` テーブル + RLS（公開読み取り） + シードデータ
- [ ] `gallery_cases.card_code` / `useful_articles.card_code` 列追加
- [ ] `admin-resources.ts` に `cards` 追加、`gallery`/`useful` に `card_code` 追加
- [ ] `lib/content.ts` に `getCards()` 追加
- [ ] `<CardDrop>` + `CollectionProvider`（localStorage）+ 進捗バッジ
- [ ] `/book` ページ（取得済み/未取得/Tip表示/回遊ヒント）
- [ ] マイルストーンでクーポンコード表示 / LINE QR 誘導
- [ ] 簡易イベントログ（`card_collected` 等）

### Phase 2 — 本人紐付け & LINE
- [ ] LINEログイン導入、`user_collections` へ移送
- [ ] Messaging API で特典自動配信・消込
- [ ] サーバー検証・不正対策強化

### Phase 3 — 拡張
- [ ] 季節/キャンペーン限定シリーズ、コンプ報酬
- [ ] 滞在/回遊のダッシュボード化、A/Bテスト

---

## 10. 影響ファイル早見表（実装時の着手点）

| 目的 | 触るファイル |
| --- | --- |
| カードマスタ取得 | `lib/content.ts`（`getCards()` 追加） |
| 管理画面リソース | `lib/admin-resources.ts`（`cards` 追加 / `gallery`・`useful` に `card_code`） |
| フォーム定義 | `lib/admin-forms.ts` |
| カード設置UI | `components/BeforeAfter.tsx`, `components/Useful.tsx`, 新規 `components/CardDrop.tsx` |
| グローバル進捗 | `components/Navbar.tsx` or `Footer.tsx`, 新規 `components/CollectionProvider.tsx` |
| ブックページ | 新規 `app/book/page.tsx`, `components/Book.tsx` |
| DBスキーマ | Supabase マイグレーション（`collectible_cards`, 列追加, RLS, seed） |

---

## 11. 未決事項（実装前に決めたい）

1. **報酬のライン**: Phase 1 のクーポン内容（割引率・条件・期限）。
2. **枚数設計**: 初期カード総数と、マイルストーン（何枚で何の特典か）。
3. **カードのビジュアル**: 画像を用意するか、当面はカラー＋コード表示で開始か。
4. **設置密度**: 1記事1枚で始めるか、人気記事は複数枚にするか。
5. **LINE連携の本気度**: Phase 2 でショップカード誘導止まりか、Messaging API 自動配信まで行くか。
