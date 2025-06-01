# litmus9.com

Vite + React + TypeScript + styled-components のプロジェクトです。

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プレビュー
npm run preview
```

## デプロイ

このプロジェクトは GitHub Actions を使用して自動的に GitHub Pages にデプロイされます。
`main` ブランチへのプッシュ時に自動的にビルドとデプロイが実行されます。

### GitHub Pages の設定

1. リポジトリの Settings > Pages に移動
2. Source を "GitHub Actions" に設定
3. `main` ブランチにプッシュすると自動的にデプロイされます

## 技術スタック

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [styled-components](https://styled-components.com/)
- [Biome](https://biomejs.dev/) (Linter/Formatter)
- [Storybook](https://storybook.js.org/) (コンポーネントカタログ)
- [storycap](https://github.com/reg-viz/storycap) (スクリーンショット撮影)
- [reg-suit](https://github.com/reg-viz/reg-suit) (ビジュアルリグレッションテスト)

## Storybook とビジュアルリグレッションテスト

### Storybook の起動

```bash
# Storybook の起動
npm run storybook
```

### ビジュアルリグレッションテスト

複数のビューポート（iPhone 6, iPhone 12, iPad, Desktop, Full HD）でスクリーンショットを撮影し、変更を検出します。

```bash
# スクリーンショットの撮影
npm run screenshot

# ビジュアルリグレッションテストの実行
npm run visual-test

# 期待値の更新（新しいスクリーンショットを正とする）
npm run visual-test:update
```

### ビューポート設定

各ストーリーで個別にビューポートを設定できます：

```typescript
export const MyStory: Story = {
  parameters: {
    viewport: {
      viewports: ["iPhone 6", "iPad", "Desktop"],
    },
  },
};
```
