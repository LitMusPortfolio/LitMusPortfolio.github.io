import type { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import "../globals.css";

export const metadata: Metadata = {
  title: "LitMus9 - LitMus Official Website",
  description:
    "LitMusの公式ウェブサイトです。ポートフォリオのほか、合成音声ライブラリ「離途」のVOICEVOX、UTAU音源を配布しています。",
  keywords: "LitMus,離途,Lit,UTAU,VOICEVOX,音楽制作,イラスト,動画制作,合成音声",
  authors: [{ name: "LitMus" }],
  openGraph: {
    type: "website",
    url: "https://litmus9.com/",
    title: "LitMus9 - LitMus Official Website",
    description:
      "LitMusの公式ウェブサイトです。ポートフォリオのほか、合成音声ライブラリ「離途」のVOICEVOX、UTAU音源を配布しています。",
    images: ["/OGP_Main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "LitMus9 - LitMus Official Website",
    description:
      "LitMusの公式ウェブサイトです。ポートフォリオのほか、合成音声ライブラリ「離途」のVOICEVOX、UTAU音源を配布しています。",
    images: ["/OGP_Main.png"],
  },
  icons: {
    icon: { url: "/favicon.webp", type: "image/webp" },
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* 見出し用フォント */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap"
          rel="stylesheet"
        />
        {/* 本文用フォント */}
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@900&display=swap"
          rel="stylesheet"
        />
        {/* 旧ハッシュURL → クリーンURL へのリダイレクト */}
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static redirect script, no user input
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var hash = window.location.hash;
                if (hash && hash.startsWith('#/')) {
                  var path = hash.slice(1);
                  if (path !== '/') {
                    window.location.replace(window.location.origin + path);
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
