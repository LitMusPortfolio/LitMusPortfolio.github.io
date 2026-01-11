# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要

- サーバーは常に起動しています。自分で起動する必要はありません。
- StorybookでUIコンポーネントの動作を確認できます: `pnpm storybook`
- インポートには `@/` エイリアスを使用（例: `import { theme } from "@/styles/theme"`）

## 開発コマンド

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動 (http://localhost:5173)
pnpm dev

# ビルド
pnpm build

# コード品質チェック（コミット前に実行推奨）
pnpm lint          # Biomeによるリント
pnpm typecheck     # TypeScriptの型チェック
pnpm check-all     # 全チェック（knip + lint + typecheck + typecheck:stories）

# Storybook
pnpm storybook     # Storybook起動
pnpm build-storybook  # Storybookビルド

# ビジュアルテスト
pnpm screenshot    # スクリーンショット生成
pnpm visual-test   # ビジュアル回帰テスト実行

# ストーリー管理
pnpm generate-stories  # ストーリーファイルの自動生成
pnpm check-stories     # ストーリーの存在チェック
```

## アーキテクチャ概要

### 技術スタック

- **Vite + React 19 + TypeScript**: 高速な開発環境と型安全性
- **styled-components**: テーマベースのCSS-in-JS
- **React Router v7 (HashRouter)**: GitHub Pages対応ルーティング
- **Biome**: 統一されたリンター/フォーマッター
- **Storybook**: コンポーネントカタログとビジュアルテスト

### ページ構成パターン

```
pages/
└── [PageName]/
    ├── index.tsx           # ページエントリーポイント
    ├── index.stories.tsx   # Storybookストーリー
    ├── components/         # ページ固有コンポーネント
    ├── sections/           # セクション分割（大規模ページ用）
    ├── data/               # 静的データ定義
    ├── hooks/              # カスタムフック
    ├── types/              # 型定義
    ├── config/             # 設定値
    └── utils/              # ユーティリティ関数
```

## ルーティング構成

HashRouterを使用（GitHub Pages対応）：

| パス | ページ |
|------|--------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/works` | WorksPage |
| `/voicebank` | VoicebankPage（離途キャラクターページ） |
| `/contact` | ContactPage |

全ページはReact.lazy()で遅延読み込み。

## パフォーマンス最適化

- **コード分割**: 各ページを個別バンドルに
- **メディア最適化**: WebP画像、WebM動画を使用
- **遅延読み込み**: LazyImage/LazyVideoコンポーネント
- **固定背景**: パララックス効果で`background-attachment: fixed`

## デプロイメント

GitHub Actionsによる自動デプロイ：

- mainブランチへのpushで自動デプロイ
- PRでビジュアル回帰テスト実行
- GitHub Pages（https://litmusportfolio.github.io/）で公開

## 再利用可能コンポーネント

よく使うコンポーネント（`src/components/`）：

| コンポーネント | 説明 |
|---------------|------|
| `LazyImage` / `LazyVideo` | IntersectionObserver による遅延読み込み |
| `Modal` | フォーカス管理付きのアクセシブルなモーダル |
| `SectionTitle` / `TitleWithLine` | セクション見出しスタイル |
| `BackgroundSection` | 固定背景付きセクション |
| `StyledButton` | 統一されたボタンスタイル |
| `FilterTabs` / `TabComponents` | タブ UI |
| `Grid` | レスポンシブグリッドレイアウト |

## Biome設定

- インデント: スペース2つ
- クォート: ダブルクォート
- 未使用のインポート/変数はエラー
- import文は自動整理される
