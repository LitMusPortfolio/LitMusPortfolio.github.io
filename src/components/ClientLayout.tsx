"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MobileNotice } from "@/components/MobileNotice";
import { useIsMobile } from "@/hooks/useIsMobile";
import { setupGlobalErrorHandlers } from "@/utils/errorReporting";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setupGlobalErrorHandlers();
  }, []);

  if (isMobile) {
    return <MobileNotice />;
  }

  return (
    <ErrorBoundary>
      <Header />
      <main>{children}</main>
      {!isHomePage && <Footer />}
    </ErrorBoundary>
  );
}
