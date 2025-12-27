import { lazy, useEffect, useState } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import MainLayout from "./components/MainLayout";
import { MobileNotice } from "./components/MobileNotice";
import { setupGlobalErrorHandlers } from "./utils/errorReporting";
import { preloadCriticalAssets } from "./utils/preloadAssets";

// モバイル判定フック（このコンポーネントでのみ使用）
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        (window as Window & { opera?: string }).opera ||
        "";
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(userAgent);
      const isMobileWidth = window.innerWidth <= 768;

      setIsMobile(isMobileUA || isMobileWidth);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

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
