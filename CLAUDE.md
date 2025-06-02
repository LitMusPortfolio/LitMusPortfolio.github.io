# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要

- サーバーは常に起動しています。自分で起動する必要はありません。
- StoryでUIコンポーネントの動作を確認できます: `npm run storybook`

## 開発コマンド

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (http://localhost:5173)
npm run dev

# ビルド
npm run build

# コード品質チェック（コミット前に実行推奨）
npm run lint          # Biomeによるリント
npm run typecheck     # TypeScriptの型チェック
npm run check-all     # 全チェック（knip + lint + typecheck）

# Storybook
npm run storybook     # Storybook起動
npm run build-storybook  # Storybookビルド

# ビジュアルテスト
npm run screenshot    # スクリーンショット生成
npm run visual-test   # ビジュアル回帰テスト実行
```

## アーキテクチャ概要

### 技術スタック
- **Vite + React 19 + TypeScript**: 高速な開発環境と型安全性
- **styled-components**: テーマベースのCSS-in-JS
- **React Router v7 (HashRouter)**: GitHub Pages対応ルーティング
- **Biome**: 統一されたリンター/フォーマッター
- **Storybook**: コンポーネントカタログとビジュアルテスト

### コンポーネント設計の原則

1. **テーマ駆動設計**: 全てのスタイリングは`theme.ts`の値を使用
2. **コンポジション重視**: 小さな部品を組み合わせて複雑なUIを構築
3. **型安全性**: 全コンポーネントにPropsインターフェースを定義
4. **レスポンシブ対応**: モバイルファーストで設計

## 共通コンポーネント構成

### レイアウトコンポーネント (`src/components/Layout/`)

基本的なレイアウトを構築するためのプリミティブコンポーネント群：

```typescript
// Section: フルビューポート高さのセクション
<Section>
  <Container>コンテンツ</Container>
</Section>

// Container: 最大幅制約付きコンテナ
<Container size="medium">  // small | medium | large
  コンテンツ
</Container>

// GridContainer: レスポンシブグリッド
<GridContainer columns={3} gap="medium">
  <div>アイテム1</div>
  <div>アイテム2</div>
  <div>アイテム3</div>
</GridContainer>
```

### UIコンポーネント

- **Modal System** (`src/components/Modal/`): 
  - `Modal`: メインコンポーネント
  - `ModalContent`: variant対応（default, download, glass）
  - `ModalFocusManager`: フォーカストラップとキーボード操作
  
- **LazyImage/LazyVideo**: 遅延読み込み対応メディアコンポーネント
- **TextWithBackground**: 背景画像付きテキスト表示
- **SocialLinks**: SNSリンクボタン群
- **Tabs**: タブ切り替えUI

### ページ構成パターン

各ページは以下の構造を持つ：
```
pages/
└── [PageName]/
    ├── index.tsx           # ページエントリーポイント
    ├── components/         # ページ固有コンポーネント
    ├── sections/           # セクション分割（大規模ページ用）
    ├── data/              # 静的データ定義
    ├── hooks/             # カスタムフック
    ├── types/             # 型定義
    └── index.stories.tsx  # Storybookストーリー
```

## スタイリングシステム

### テーマオブジェクト (`src/styles/theme.ts`)

```typescript
theme = {
  colors: {
    primary: "#6B46C1",     // メイン紫
    background: "#0F0F23",  // ダーク背景
    text: "#E5E5E5",       // テキスト
    // グラデーション定義も含む
  },
  typography: {
    fontFamily: {
      japanese: '"Noto Sans JP", sans-serif',
      english: '"Inter", sans-serif',
    },
    letterSpacing: {
      japanese: "0.05em",
      english: "0.02em",
    }
  },
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    // ... xl, 2xl, 3xl, 4xl
  },
  breakpoints: {
    small: "480px",
    mobile: "768px",
    tablet: "968px",
    desktop: "1200px",
  },
  effects: {
    glassmorphism: `...`, // ガラスモーフィズム効果
  }
}
```

### スタイリングパターン

独自のスタイル定義をすることは必要最低限とすること。基本的には GlobalStyle.ts にすべてまとまるようにする。

```typescript
// styled-componentsでのテーマ使用
const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

// Transient props（DOMに渡さない）
interface Props {
  $isActive?: boolean;  // $ prefix
}
```

## タイポグラフィシステム

日英混在テキストの処理：
```typescript
import { wrapAlphanumeric } from "@/utils/typography";

// 英数字を<span class="alphanumeric">でラップ
const formattedText = wrapAlphanumeric("離途 Lit 2024");
```

## ルーティング構成

HashRouterを使用（GitHub Pages対応）：
- `/` - HomePage
- `/about` - AboutPage  
- `/works` - WorksPage
- `/voicebank` - VoicebankPage（離途キャラクターページ）
- `/contact` - ContactPage
- `/shop` - BOOTHへの外部リンク

全ページはReact.lazy()で遅延読み込み。

## パフォーマンス最適化

1. **コード分割**: 各ページを個別バンドルに
2. **メディア最適化**: WebP画像、WebM動画を使用
3. **遅延読み込み**: LazyImage/LazyVideoコンポーネント
4. **固定背景**: パララックス効果で`background-attachment: fixed`

## デプロイメント

GitHub Actionsによる自動デプロイ：
- mainブランチへのpushで自動デプロイ
- PRでビジュアル回帰テスト実行
- GitHub Pages（https://litmusportfolio.github.io/）で公開

## 開発時の注意事項

1. **コミット前チェック**: lefthookにより自動実行
   - Biomeによるフォーマット
   - TypeScript型チェック

2. **画像/動画アセット**: 
   - `public/`以下に配置
   - 番号プレフィックスで整理（001_top/, 101_Lit/など）
   - 最適化フォーマット使用（WebP, WebM）

3. **コンポーネント作成時**:
   - 必ずStorybookストーリーを作成
   - Propsインターフェースを定義
   - テーマの値を使用してスタイリング

4. **型定義**:
   - 共通型は`src/types/`に配置
   - ページ固有の型は各ページの`types/`に配置