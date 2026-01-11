---
paths:
  - "src/components/**/*"
  - "src/pages/**/*"
---

# コンポーネントガイドライン

## 設計原則

1. **テーマ駆動設計**: 全てのスタイリングは `theme.ts` の値を使用
2. **コンポジション重視**: 小さな部品を組み合わせて複雑な UI を構築
3. **型安全性**: 全コンポーネントに Props 型を定義
4. **レスポンシブ対応**: モバイルファーストで設計

## Props 型定義

`interface` ではなく `type` を使用すること:

```typescript
// Good
type ButtonProps = {
  label: string;
  onClick: () => void;
  $variant?: "primary" | "secondary";
};

// Bad - interface は使用禁止
interface ButtonProps {
  label: string;
}
```

## Storybook ストーリー

コンポーネント作成時は必ず Storybook ストーリーを作成:

- ファイル名: `ComponentName.stories.tsx`
- 主要な状態・バリエーションをストーリー化
- `pnpm generate-stories` で自動生成可能

## コンポーネント作成チェックリスト

- [ ] Props 型を `type` で定義
- [ ] テーマの値を使用してスタイリング
- [ ] Storybook ストーリーを作成
- [ ] レスポンシブ対応を確認
