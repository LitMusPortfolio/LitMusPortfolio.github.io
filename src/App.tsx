import { lazy, useEffect } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { MobileNotice } from "./components/MobileNotice";
import { useIsMobile } from "./hooks/useIsMobile";
import MainLayout from "./layouts/MainLayout";
import { setupGlobalErrorHandlers } from "./utils/errorReporting";
import { preloadCriticalAssets } from "./utils/preloadAssets";

// Lazy load page components
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WorksPage = lazy(() => import("./pages/WorksPage"));
const VoicebankPage = lazy(() => import("./pages/VoicebankPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

const router = createHashRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "works",
        element: <WorksPage />,
      },
      {
        path: "voicebank",
        element: <VoicebankPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

function App() {
  const isMobile = useIsMobile();

  useEffect(() => {
    // グローバルエラーハンドラーをセットアップ
    setupGlobalErrorHandlers();
    // 重要なアセットをプリロード
    preloadCriticalAssets();
  }, []);

  return (
    <ErrorBoundary>
      {isMobile ? <MobileNotice /> : <RouterProvider router={router} />}
    </ErrorBoundary>
  );
}

export default App;
