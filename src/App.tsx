import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import LoadingSpinner from "./components/LoadingSpinner";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import { preloadCriticalAssets } from "./utils/preloadAssets";

// Lazy load page components
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WorksPage = lazy(() => import("./pages/WorksPage"));
const VoicebankPage = lazy(() => import("./pages/VoicebankPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function App() {
  // アプリ起動時に重要なアセットをプリロード
  useEffect(() => {
    preloadCriticalAssets();
  }, []);

  return (
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
  );
}

export default App;
