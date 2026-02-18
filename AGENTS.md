# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

デプロイ先 URL: https://litmus9.com/

必ず chrome-devtools mcp を使用してデバッグしながら作業を進めること。

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動 (http://localhost:3000)
pnpm dev

# ビルド
pnpm build

# プレビュー（ビルド後の確認）
pnpm start

# コード品質チェック（コミット前に実行推奨）
pnpm lint          # Biomeによるリント
pnpm typecheck     # TypeScriptの型チェック
pnpm knip          # 未使用コード/依存関係の検出
```

### Git Hooks (lefthook)

pre-commitで `knip --fix`, `lint --write`, `typecheck` が自動実行される。pre-pushではさらに `build` も実行される。

## アーキテクチャ概要

### 技術スタック

- **Next.js 15 (App Router) + React 19 + TypeScript**: `output: "export"` で静的HTML出力。パスエイリアス `@/` → `src/`
- **Tailwind CSS v4 + shadcn/ui**: テーマは `src/globals.css` の `@theme` で定義
- **App Router (static export)**: ファイルベースルーティング。`app/` にはルーティングファイルのみ配置し、`src/pages/` のコンポーネントを import する薄いラッパー構成
- **Biome**: リンター/フォーマッター（スペース2、ダブルクォート、未使用import/変数はエラー）

### モバイル対応

モバイルデバイスでは通常のルーティングではなく `MobileNotice` コンポーネントが表示される（`ClientLayout.tsx`）。デスクトップ専用サイト。

### ルーティング構成

| パス | ページ |
|------|--------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/works` | WorksPage |
| `/voicebank` | VoicebankPage（離途キャラクターページ） |
| `/contact` | ContactPage |

### ページ構成パターン

```
src/app/[route]/page.tsx    # "use client" 薄いラッパー → src/views/ を import

src/views/[PageName]/
├── index.tsx           # ページエントリーポイント
├── components/         # ページ固有コンポーネント
├── sections/           # セクション分割（大規模ページ用）
└── data/               # 静的データ定義
```

VoicebankPageはセクション分割パターンを採用（`LitMainSection/`, `LitCharacterSection/`等）。

## スタイリング

Tailwind CSS v4 を使用。テーマは `src/globals.css` の `@theme` ディレクティブで定義。

詳細は `.claude/rules/styling-system.md` を参照。

## コンポーネント

### shadcn/ui コンポーネント（`src/components/ui/`）

| コンポーネント | 説明 |
|---------------|------|
| `Button` | CVAベースのボタン（`styled`, `gradient`バリアントあり） |
| `Dialog` | Radix Dialogベースのモーダル |
| `Tabs` | Radix Tabsベースのタブ UI |
| `Card` | Radix Cardベース（CardHeader, CardTitle, CardContent等を含む） |
| `Separator` | Radix Separatorベースの区切り線 |

### カスタムコンポーネント（`src/components/`）

| コンポーネント | 説明 |
|---------------|------|
| `ClientLayout` | Header + main + Footer を統合したクライアントレイアウト |
| `LazyImage` / `LazyVideo` | IntersectionObserver による遅延読み込み |
| `Modal` | Dialog のラッパー（後方互換性用） |
| `SectionTitle` / `TitleWithLine` | セクション見出しスタイル |
| `TextWithBackground` | 背景画像付きテキスト（SectionTitleで使用） |
| `BackgroundSection` | 固定背景付きセクション |
| `VideoBackground` | LazyVideoをラップした背景動画レイアウト |
| `FilterTabs` | Tabs のラッパー（後方互換性用） |
| `Grid` | レスポンシブグリッドレイアウト |

## コーディング規約

### Biome設定

- インデント: スペース2つ
- クォート: ダブルクォート
- 未使用のインポート/変数はエラー
- import文は自動整理される

詳細なコーディング規約は `.claude/rules/` を参照。

## デプロイメント

GitHub Actionsによる自動デプロイ：

- mainブランチへのpushで自動デプロイ
- GitHub Pages + カスタムドメイン（https://litmus9.com）で公開
- `next build` で `out/` ディレクトリに静的HTML出力
