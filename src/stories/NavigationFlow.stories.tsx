import type { Meta, StoryObj } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "../App";
import { GlobalStyles } from "../styles/GlobalStyles";
import { theme } from "../styles/theme";

// 完全なアプリケーション環境を再現
const FullApp = () => {
  return (
    <BrowserRouter basename="/LitMusPortfolio.github.io">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
};

const meta = {
  title: "App/NavigationFlow",
  component: FullApp,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
実際のアプリケーションと同じナビゲーション体験ができます。

### 使い方
- ヘッダーのナビゲーションリンクをクリックして各ページに移動できます
- ブラウザの戻る/進むボタンも動作します
- 実際のプロダクション環境と同じ見た目と動作を確認できます

### 各ページへのリンク
- **Home**: トップページ
- **About**: アバウトページ
- **Works**: 作品一覧ページ
- **Voicebank**: 音声ライブラリページ（離途）
- **Shop**: ショップページ
- **Contact**: お問い合わせページ
        `,
      },
    },
  },
} satisfies Meta<typeof FullApp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "フルアプリケーション",
};
