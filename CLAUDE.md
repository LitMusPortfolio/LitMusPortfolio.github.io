# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発環境

- 開発サーバーは既に起動しています: http://localhost:5173/
- 新たに開発サーバーを起動しようとすると他の作業ができなくなるため、必ず既存の開発サーバーが立ち上がっていることを確認してください

## 共通コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# リント
npm run lint

# プレビュー
npm run preview
```

## プロジェクト構成

### 技術スタック
- Vite + React + TypeScript
- styled-components（CSS-in-JS）
- React Router DOM（ルーティング）
- Biome（リンター・フォーマッター）

### アーキテクチャ
- **Pages**: 各ルートに対応するページコンポーネント（`src/pages/`）
- **Components**: 再利用可能なUIコンポーネント（`src/components/`）
- **Layouts**: ページ共通のレイアウト（`src/layouts/MainLayout.tsx`）
- **Styles**: テーマとグローバルスタイル（`src/styles/`）

### ルーティング構成
```
/ (HomePage)
/about (AboutPage)  
/works (WorksPage)
/voicebank (VoicebankPage)
/shop (ShopPage)
/contact (ContactPage)
```

### スタイリング規約
- テーマシステム（`src/styles/theme.ts`）を使用
- 紫をベースとしたカラーパレット
- グラスモーフィズムデザインパターン
- レスポンシブデザイン対応

## デプロイ

- GitHub Actions による自動デプロイ
- mainブランチへのpush時に自動実行
- GitHub Pagesにデプロイ

## Git Hooks

- **pre-commit**: Biomeによるlintチェック
- **pre-push**: ビルドテスト実行

## プロジェクトドキュメント

### .claude/docs/
プロジェクトの設計資料とアセットが配置されています：

- **pages/**: 各ページのデザイン仕様書（PDF形式）
  - TopPage_and_header.pdf
  - About.pdf, Contact.pdf, Works.pdf
  - Lit_UTAU.pdf（UTAUキャラクター関連ページ）
  - extracted/: デザインから抽出された画像素材

- **hp-assets/**: Webサイト用の画像・動画アセット
  - 001_top/: トップページ用素材（ロゴ、動画、アイコン等）
  - 002_about/: Aboutページ用素材
  - 010_PageSideTitleSvg/: ページタイトル用SVG
  - 101_Lit/: Litキャラクター関連素材