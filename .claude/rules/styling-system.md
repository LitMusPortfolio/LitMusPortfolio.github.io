---
paths:
  - "src/**/*.tsx"
  - "src/**/*.css"
---

# スタイリングシステム

## Tailwind CSS v4 テーマ設定

デザイントークンは `src/theme.css` に定義。`@theme` ブロック内のトークンはユーティリティクラスを自動生成し、`:root` ブロック内のトークンはCSS変数としてのみ利用可能。

グローバルスタイル（リセット・ユーティリティクラス）は `src/globals.css` に定義。

### 主要なCSS変数

**カラー:**
- `--color-primary` - メインカラー
- `--color-text-primary` - テキストカラー
- `--color-bg-dark` / `--color-bg-body` - 背景カラー
- `--color-surface-*` - サーフェス（ダイアログ、ヘッダー等）
- `--color-gradient-*` - グラデーション停止色
- `--color-scrollbar-*` - スクロールバー

**シャドウ:**
- `--shadow-glow-sm/md/lg` - グローエフェクト
- `--shadow-button` / `--shadow-button-hover` - ボタン用シャドウ
- `--shadow-card-*` - カードホバーシャドウ
- `--shadow-dialog` / `--shadow-dialog-download` - ダイアログシャドウ

**タイポグラフィ:**
- `font-medium/semibold/bold` - フォントウェイト（Tailwind デフォルト）
- `--tracking-body/heading/nav` - レタースペーシング（カスタム）
- `--leading-heading/body/snug/relaxed` - 行間（カスタム）

**Glassmorphism:**
- `--glass-bg` - ガラス背景
- `--glass-border` - ガラスボーダー
- `--glass-blur` - ブラー効果

**その他:**
- `--blur-sm/md` - ブラー値
- `ease-in-out/ease-out` - イージング（Tailwind デフォルト）
- `--breakpoint-xs/sm/md/lg` - ブレークポイント
- `--z-*` - Z-Index（13段階）

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
