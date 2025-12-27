---
paths:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# 型定義ガイドライン

## 配置ルール

| 型の種類 | 配置場所 |
|---------|---------|
| 共通型（複数箇所で使用） | `src/types/` |
| ページ固有の型 | `src/pages/[PageName]/types/` |
| コンポーネント固有の型 | 同一ファイル内 or `types.ts` |

## 型定義の書き方

`interface` ではなく `type` を使用:

```typescript
// Good
type User = {
  id: string;
  name: string;
};

// Bad
interface User {
  id: string;
  name: string;
}
```

## エクスポート

- 共通型は `src/types/index.ts` から再エクスポート
- ページ固有の型はそのページ内でのみ使用
