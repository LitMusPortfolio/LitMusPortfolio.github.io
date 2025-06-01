# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要

- サーバーは常に起動しています。自分で起動する必要はありません。
- mcpサーバーを積極的に使用します。
- `git add -A` ではなく `git add {ファイル名}` を行います。
- 未使用変数は削除します。

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (http://localhost:5173)
npm run dev

# ビルド
npm run build

# リント実行
npm run lint

# プレビューサーバーの起動
npm run preview
```

## アーキテクチャ

### 技術スタック
- **Vite**: 高速なビルドツール
- **React 19**: UIライブラリ
- **TypeScript**: 型安全性
- **styled-components**: CSS-in-JSライブラリ
- **Biome**: リンター/フォーマッター

### ディレクトリ構造
```
src/
├── components/        # 再利用可能なコンポーネント
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProfileSection.tsx
│   └── TextWithBackground.tsx
├── pages/            # 各ページとそのコンポーネント
│   ├── HomePage/
│   │   ├── index.tsx
│   │   └── components/
│   ├── AboutPage/
│   ├── ContactPage/
│   ├── WorksPage/
│   ├── ShopPage/
│   └── VoicebankPage/
│       └── components/
│           ├── LitCharacter.tsx
│           ├── LitMainSection.tsx
│           ├── LitCharacterSection.tsx
│           └── LitDownloadSection.tsx
├── layouts/          # レイアウトコンポーネント
│   └── MainLayout.tsx
└── styles/           # スタイル関連
    ├── theme.ts      # テーマ定義
    └── GlobalStyles.ts
```

### 重要な設定
- **GitHub Pages対応**: `vite.config.ts`でbase pathが設定済み
- **Git hooks**: lefthookでpre-commit/pre-pushフックが設定済み
- **フォーマット**: スペース2文字インデント、ダブルクォート使用

## ルーティング構成

アプリケーションは`MainLayout`でラップされ、以下のルートが定義されています：

- `/` - HomePage
- `/about` - AboutPage  
- `/works` - WorksPage
- `/voicebank` - VoicebankPage（離途キャラクターページ）
- `/shop` - ShopPage
- `/contact` - ContactPage

## スタイリングシステム

`theme.ts`に定義された統一テーマを使用：
- カラーパレット: 紫系統を基調としたダークテーマ
- グラスモーフィズム効果
- レスポンシブ対応（ブレークポイント: 768px, 968px）

## デプロイ

GitHub Actionsによる自動デプロイが設定済み。`main`ブランチへのプッシュで自動的にGitHub Pagesにデプロイされます。

## 開発時の注意事項

1. コミット前に自動的にリントが実行されます
2. プッシュ前にビルドが実行されます
3. Biomeによるコードフォーマットが適用されます