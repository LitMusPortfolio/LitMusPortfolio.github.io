import { imageCache } from "./imageCache";
import { videoCache } from "./videoCache";

// ============================================
// アセット分類
// ============================================

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|svg|ico)$/i;
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|avi)$/i;

function categorizeAssets(paths: string[]): {
  images: string[];
  videos: string[];
} {
  const images: string[] = [];
  const videos: string[] = [];

  for (const path of paths) {
    if (IMAGE_EXTENSIONS.test(path)) {
      images.push(path);
    } else if (VIDEO_EXTENSIONS.test(path)) {
      videos.push(path);
    }
  }

  return { images, videos };
}

// ============================================
// ページ別アセット定義
// ============================================

const PAGE_ASSETS = {
  home: {
    images: [
      "/001_top/icon_X.svg",
      "/001_top/icon_youtube.svg",
      "/001_top/icon_niconico.svg",
      "/001_top/離途バナー_差し替え予定.webp",
      "/LitMusBG.webp",
    ],
    videos: ["/001_top/LitMusHPTopMovie.mp4", "/001_top/LitMusHPTopMovie.webm"],
  },
  about: {
    images: ["/002_about/LitMusIcon.webp", "/010_PageSideTitleSvg/ABOUT.svg"],
    videos: [],
  },
  works: {
    images: ["/LitMusBG.webp", "/010_PageSideTitleSvg/WORKS.svg"],
    videos: [],
  },
  voicebank: {
    images: [
      "/101_Lit/Litlogo.webp",
      "/101_Lit/LitA_差し替え前提.webp",
      "/101_Lit/LitB_差し替え前提.webp",
      "/LitBG.webp",
      "/010_PageSideTitleSvg/Character.svg",
      "/010_PageSideTitleSvg/DOWNLOAD.svg",
      "/010_PageSideTitleSvg/RULES.svg",
    ],
    videos: ["/101_Lit/LitTopMovie.mp4", "/101_Lit/LitTopMovie.webm"],
  },
  contact: {
    images: ["/010_PageSideTitleSvg/CONTACT.svg"],
    videos: [],
  },
  critical: {
    images: [
      "/001_top/LitMus9_logo.webp",
      "/001_top/nameBG.webp",
      "/002_about/LitMusIcon.webp",
    ],
    videos: [],
  },
} as const;

// ============================================
// ダウンロードアセット収集（動的）
// ============================================

async function collectDownloadAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  try {
    const module = await import(
      "@/pages/VoicebankPage/LitDownloadSection/data"
    );
    const { DOWNLOAD_ITEMS } = module;
    const paths: string[] = [];

    for (const item of DOWNLOAD_ITEMS) {
      if (item.image) {
        paths.push(item.image);
      }
    }

    return categorizeAssets(paths);
  } catch (error) {
    console.error("Failed to collect download assets:", error);
    return { images: [], videos: [] };
  }
}

// ============================================
// ランタイムアセット収集（フォールバック）
// ============================================

function collectRuntimeAssets(): { images: string[]; videos: string[] } {
  const paths = new Set<string>();

  document.querySelectorAll("img[src]").forEach((img) => {
    const src = img.getAttribute("src");
    if (src?.startsWith("/")) {
      paths.add(src);
    }
  });

  document.querySelectorAll("video source[src]").forEach((source) => {
    const src = source.getAttribute("src");
    if (src?.startsWith("/")) {
      paths.add(src);
    }
  });

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

// ============================================
// プリロード実行
// ============================================

async function preloadAssets(assets: {
  readonly images: readonly string[];
  readonly videos: readonly string[];
}): Promise<void> {
  await Promise.all([
    imageCache.preloadImages([...assets.images]),
    videoCache.preloadVideos([...assets.videos]),
  ]);
}

// ============================================
// 公開API
// ============================================

export async function preloadCriticalAssets(): Promise<void> {
  console.log("Preloading critical assets...");
  await imageCache.preloadImages(PAGE_ASSETS.critical.images);
}

export async function preloadAssetsForPage(currentPath: string): Promise<void> {
  const pageKey =
    currentPath === "/"
      ? "home"
      : (currentPath.slice(1) as keyof typeof PAGE_ASSETS);
  const assets = PAGE_ASSETS[pageKey];

  if (assets) {
    console.log(`Preloading ${pageKey} page assets...`);
    await preloadAssets(assets);

    // voicebankページはダウンロードアセットも追加
    if (pageKey === "voicebank") {
      const downloadAssets = await collectDownloadAssets();
      await preloadAssets(downloadAssets);
    }
  } else {
    // 未知のページの場合、実行時にDOMからアセットを収集
    console.log(`Collecting runtime assets for ${currentPath}...`);
    const runtimeAssets = collectRuntimeAssets();
    await preloadAssets(runtimeAssets);
  }

  // 他のページのアセットをバックグラウンドでロード
  setTimeout(() => {
    preloadNextPageAssets(currentPath);
  }, 1000);
}

async function preloadNextPageAssets(currentPath: string): Promise<void> {
  switch (currentPath) {
    case "/":
      await Promise.all([
        preloadAssets(PAGE_ASSETS.about),
        preloadAssets(PAGE_ASSETS.works),
      ]);
      break;
    case "/about":
      await Promise.all([
        preloadAssets(PAGE_ASSETS.works),
        preloadAssets(PAGE_ASSETS.voicebank),
      ]);
      break;
    case "/works":
      await preloadAssets(PAGE_ASSETS.voicebank);
      break;
  }
}
