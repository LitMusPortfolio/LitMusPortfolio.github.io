import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </>
  );
}
