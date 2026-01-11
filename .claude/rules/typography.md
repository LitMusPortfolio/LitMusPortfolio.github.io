---
paths:
  - "src/**/*.tsx"
---

# タイポグラフィシステム

## 日英混在テキストの処理

日英混在テキストを表示する場合、`wrapAlphanumeric` ユーティリティを使用して英数字を適切にラップする。

```typescript
import { wrapAlphanumeric } from "@/utils/typography";

// 英数字を<span class="en">でラップ
const formattedText = wrapAlphanumeric("離途 Lit 2024");
// 結果: "離途 <span class=\"en\">Lit 2024</span>"
```

## 使用場面

- キャラクター名（例: 離途 Lit）
- 年号を含むテキスト
- 英単語を含む日本語テキスト

## 注意事項

- `dangerouslySetInnerHTML` と組み合わせて使用する必要がある
- XSS対策として、ユーザー入力には使用しないこと
