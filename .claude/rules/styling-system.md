---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# スタイリングシステム

## Tailwind CSS v4 テーマ設定

テーマは `src/globals.css` の `@theme` ディレクティブで定義。CSS変数として利用可能。

### 主要なCSS変数

**カラー:**
- `--color-primary` - メインカラー
- `--color-text-primary` - テキストカラー
- `--color-bg-dark` - 背景カラー

**シャドウ:**
- `--shadow-glow-sm/md/lg` - グローエフェクト
- `--shadow-button` - ボタン用シャドウ

**Glassmorphism:**
- `--glass-bg` - ガラス背景
- `--glass-border` - ガラスボーダー
- `--glass-blur` - ブラー効果

**ブレークポイント:**
- `--breakpoint-xs` - 600px
- `--breakpoint-sm` - 768px
- `--breakpoint-md` - 968px

**Z-Index:**
- `--z-content`, `--z-dropdown`, `--z-modal`

## 使用例

```css
.element {
  color: var(--color-text-primary);
  background: var(--color-bg-dark);
  box-shadow: var(--shadow-glow-sm);
}
```

## カスタムユーティリティクラス

```tsx
// Glassmorphism
<div className="glass p-4 rounded-lg">

// ホバーエフェクト
<div className="card-hover">
```

## 禁止事項

- 直接的なカラーコード（`#ffffff`）の使用禁止
- 直接的なピクセル値の使用は最小限に
- インラインスタイルの使用は避ける
