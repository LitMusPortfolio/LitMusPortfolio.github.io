# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

デプロイ先 URL: https://litmus9.com/#/

必ず chrome-devtools mcp を使用してデバッグしながら作業を進めること。

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動 (http://localhost:5173)
pnpm dev

# ビルド
pnpm build

# プレビュー（ビルド後の確認）
pnpm preview

# コード品質チェック（コミット前に実行推奨）
pnpm lint          # Biomeによるリント
pnpm typecheck     # TypeScriptの型チェック
pnpm knip          # 未使用コード/依存関係の検出
```

## アーキテクチャ概要

### 技術スタック

- **Vite + React 19 + TypeScript**: 高速な開発環境と型安全性
- **Tailwind CSS v4 + shadcn/ui**: ユーティリティファーストCSS + Radixベースのアクセシブルコンポーネント
- **React Router v7 (HashRouter)**: GitHub Pages対応ルーティング
- **Biome**: 統一されたリンター/フォーマッター
- **Storybook**: コンポーネントカタログとビジュアルテスト

### ルーティング構成

HashRouterを使用（GitHub Pages対応）。全ページはReact.lazy()で遅延読み込み。

| パス | ページ |
|------|--------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/works` | WorksPage |
| `/voicebank` | VoicebankPage（離途キャラクターページ） |
| `/contact` | ContactPage |

### ページ構成パターン

```
pages/
└── [PageName]/
    ├── index.tsx           # ページエントリーポイント
    ├── index.stories.tsx   # Storybookストーリー
    ├── components/         # ページ固有コンポーネント
    ├── sections/           # セクション分割（大規模ページ用）
    ├── data/               # 静的データ定義
    └── ...
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
| `LazyImage` / `LazyVideo` | IntersectionObserver による遅延読み込み |
| `Modal` | Dialog のラッパー（後方互換性用） |
| `SectionTitle` / `TitleWithLine` | セクション見出しスタイル |
| `TextWithBackground` | 背景画像付きテキスト（SectionTitleで使用） |
| `BackgroundSection` | 固定背景付きセクション |
| `VideoBackground` | LazyVideoをラップした背景動画レイアウト |
| `StyledButton` | Button のラッパー（後方互換性用） |
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
- PRでビジュアル回帰テスト実行
- GitHub Pages + カスタムドメイン（https://litmus9.com）で公開
