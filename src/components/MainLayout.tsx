import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { preloadAssetsForPage } from "@/utils/preloadAssets";

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // パスが変更されたときにプリロードを実行
  useEffect(() => {
    preloadAssetsForPage(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <ScrollRestoration />
      <Header />
      <main>
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </>
  );
}
