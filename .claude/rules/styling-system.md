---
paths:
  - "src/**/*.tsx"
---

# スタイリングシステム

## テーマオブジェクトの使用

全てのスタイリングは `src/styles/theme.ts` のテーマ値を使用すること。直接的なカラーコードやピクセル値の使用は禁止。

使用可能なテーマ値:
- `colors` - カラーパレット
- `typography` - フォント設定
- `space` - スペーシング
- `breakpoints` - ブレークポイント
- `effects` - エフェクト

## styled-components でのテーマ使用

```typescript
const StyledComponent = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => theme.space.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.space.sm};
  }
`;
```

## Transient Props

DOM に渡さない props には `$` プレフィックスを使用:

```typescript
type Props = {
  $isActive?: boolean;
};

const Button = styled.button<Props>`
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.5)};
`;
```

## GlobalStyle.ts

独自のスタイル定義は必要最低限とし、基本的には `GlobalStyle.ts` にまとめる。
