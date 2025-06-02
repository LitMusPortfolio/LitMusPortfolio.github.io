// 画像・ビデオの拡張子パターン
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|svg|ico)$/i;
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|avi)$/i;

// アセットを分類する関数
function categorizeAssets(paths: string[]): {
  images: string[];
  videos: string[];
} {
  const images: string[] = [];
  const videos: string[] = [];

  paths.forEach((path) => {
    if (IMAGE_EXTENSIONS.test(path)) {
      images.push(path);
    } else if (VIDEO_EXTENSIONS.test(path)) {
      videos.push(path);
    }
  });

  return { images, videos };
}

// ページコンポーネントのローダー定義
const pageLoaders = {
  home: () => import("@/pages/HomePage/components/Home"),
  about: () => import("@/pages/AboutPage/components/About"),
  works: () => import("@/pages/WorksPage/components/Works"),
  voicebank: () => import("@/pages/VoicebankPage"),
  contact: () => import("@/pages/ContactPage/components/Contact"),
};

// 静的に定義されているアセットパスを解析
function extractStaticAssets(module: unknown): Set<string> {
  const paths = new Set<string>();

  // オブジェクトを再帰的に探索してパスを抽出
  function traverse(obj: unknown, visited = new WeakSet()): void {
    if (!obj || typeof obj !== "object" || visited.has(obj)) return;
    visited.add(obj);

    if (typeof obj === "string") {
      if (obj.startsWith("/") && (obj.includes(".") || obj.includes("/"))) {
        paths.add(obj);
      }
    } else if (Array.isArray(obj)) {
      obj.forEach((item) => traverse(item, visited));
    } else {
      Object.values(obj).forEach((value) => traverse(value, visited));
    }
  }

  traverse(module);
  return paths;
}

// HomePage用の動的アセット収集
export async function collectHomePageAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  try {
    const module = await pageLoaders.home();
    const paths = new Set<string>();

    // コンポーネントから静的パスを抽出
    extractStaticAssets(module);

    // Home.tsxで使用されている既知のアセット
    const knownAssets = [
      "/001_top/LitMusHPTopMovie.mp4",
      "/001_top/LitMusHPTopMovie.webm",
      "/001_top/icon_X.svg",
      "/001_top/icon_youtube.svg",
      "/001_top/icon_niconico.svg",
      "/001_top/離途バナー_差し替え予定.webp",
      "/LitMusBG.webp", // HomePageの背景画像
    ];

    knownAssets.forEach((asset) => paths.add(asset));

    return categorizeAssets(Array.from(paths));
  } catch (error) {
    console.error("Failed to collect HomePage assets:", error);
    return { images: [], videos: [] };
  }
}

// AboutPage用の動的アセット収集
export async function collectAboutPageAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  try {
    const module = await pageLoaders.about();
    const paths = new Set<string>();

    extractStaticAssets(module);

    // About.tsxで使用されている既知のアセット
    paths.add("/002_about/LitMusIcon.webp");
    paths.add("/010_PageSideTitleSvg/ABOUT.svg");

    return categorizeAssets(Array.from(paths));
  } catch (error) {
    console.error("Failed to collect AboutPage assets:", error);
    return { images: [], videos: [] };
  }
}

// WorksPage用の動的アセット収集
export async function collectWorksPageAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  try {
    const _module = await pageLoaders.works();
    const paths = new Set<string>();

    // WorksAssets.tsからデータを取得
    const worksModule = await import("@/pages/WorksPage/data/WorksAssets");
    const { worksData } = worksModule;

    // 各作品のサムネイルパスを収集
    worksData.forEach((work) => {
      if (work.thumbnailPath) {
        paths.add(work.thumbnailPath);
      }
    });

    // 背景画像とSVG
    paths.add("/LitMusBG.webp");
    paths.add("/010_PageSideTitleSvg/WORKS.svg");

    return categorizeAssets(Array.from(paths));
  } catch (error) {
    console.error("Failed to collect WorksPage assets:", error);
    return { images: [], videos: [] };
  }
}

// VoicebankPage用の動的アセット収集
export async function collectVoicebankPageAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  try {
    const paths = new Set<string>();

    // キャラクターセクションのアセット
    const characterAssets = [
      "/101_Lit/LitTopMovie.mp4",
      "/101_Lit/LitTopMovie.webm",
      "/101_Lit/Litlogo.webp",
      "/101_Lit/LitA_差し替え前提.webp",
      "/101_Lit/LitB_差し替え前提.webp",
      "/LitBG.webp",
    ];

    // サイドデコレーションSVG
    const sideDecorations = [
      "/010_PageSideTitleSvg/Character.svg",
      "/010_PageSideTitleSvg/DOWNLOAD.svg",
      "/010_PageSideTitleSvg/RULES.svg",
    ];

    [...characterAssets, ...sideDecorations].forEach((asset) =>
      paths.add(asset),
    );

    return categorizeAssets(Array.from(paths));
  } catch (error) {
    console.error("Failed to collect VoicebankPage assets:", error);
    return { images: [], videos: [] };
  }
}

// ContactPage用の動的アセット収集
export async function collectContactPageAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  try {
    const paths = new Set<string>();

    paths.add("/010_PageSideTitleSvg/CONTACT.svg");

    return categorizeAssets(Array.from(paths));
  } catch (error) {
    console.error("Failed to collect ContactPage assets:", error);
    return { images: [], videos: [] };
  }
}

// ダウンロードアセットの動的収集
export async function collectDownloadAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  try {
    const module = await import("@/pages/VoicebankPage/data/LitDownloadAssets");
    const { DOWNLOAD_ITEMS } = module;
    const paths = new Set<string>();

    // 各ダウンロードアイテムの画像を収集
    DOWNLOAD_ITEMS.forEach((item) => {
      if (item.image) {
        paths.add(item.image);
      }
    });

    return categorizeAssets(Array.from(paths));
  } catch (error) {
    console.error("Failed to collect download assets:", error);
    return { images: [], videos: [] };
  }
}

// 実行時にDOMから動的にアセットを収集（フォールバック用）
export function collectRuntimeAssets(): { images: string[]; videos: string[] } {
  const paths = new Set<string>();

  // img要素
  document.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");
    if (src?.startsWith("/")) {
      paths.add(src);
    }
  });

  // video source要素
  document.querySelectorAll("video source[src]").forEach((source) => {
    const src = source.getAttribute("src");
    if (src?.startsWith("/")) {
      paths.add(src);
    }
  });

  // 計算されたスタイルから背景画像を抽出
  document.querySelectorAll("*").forEach((el) => {
    const computedStyle = window.getComputedStyle(el);
    const bgImage = computedStyle.backgroundImage;
    if (bgImage && bgImage !== "none") {
      const match = bgImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (match?.[1]?.startsWith("/")) {
        paths.add(match[1]);
      }
    }
  });

  return categorizeAssets(Array.from(paths));
}
