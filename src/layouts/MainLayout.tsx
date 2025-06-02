import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { preloadAssetsForPage } from "@/utils/preloadAssets";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { SkipLinks } from "../components/SkipLinks";

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // パスが変更されたときにプリロードを実行
  useEffect(() => {
    preloadAssetsForPage(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SkipLinks />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </>
  );
}
