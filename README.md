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
