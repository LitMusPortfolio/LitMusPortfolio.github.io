import type { Meta, StoryObj } from "@storybook/react";
import { lazy, Suspense } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import LoadingSpinner from "../components/LoadingSpinner";
import ScrollToTop from "../components/ScrollToTop";
import MainLayout from "../layouts/MainLayout";
import { GlobalStyles } from "../styles/GlobalStyles";
import { theme } from "../styles/theme";

// Lazy load page components
const HomePage = lazy(() => import("../pages/HomePage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const WorksPage = lazy(() => import("../pages/WorksPage"));
const VoicebankPage = lazy(() => import("../pages/VoicebankPage"));
const ShopPage = lazy(() => import("../pages/ShopPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));

// 完全なアプリケーション環境を再現
const FullApp = () => {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="works"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <WorksPage />
                </Suspense>
              }
            />
            <Route
              path="voicebank"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <VoicebankPage />
                </Suspense>
              }
            />
            <Route
              path="shop"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ShopPage />
                </Suspense>
              }
            />
            <Route
              path="contact"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ContactPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </MemoryRouter>
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
