import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { preloadAssetsForPage } from "@/utils/preloadAssets";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
