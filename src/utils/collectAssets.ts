// 画像・ビデオの拡張子パターン
const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|gif|svg|ico)$/i;
const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|avi)$/i;

// アセットを分類する関数
export function categorizeAssets(paths: string[]): {
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

// オブジェクトから全ての文字列値を再帰的に抽出
export function extractPathsFromObject(
  obj: unknown,
  paths: Set<string> = new Set(),
): Set<string> {
  if (typeof obj === "string" && obj.startsWith("/")) {
    // パスっぽい文字列を収集
    paths.add(obj);
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => extractPathsFromObject(item, paths));
  } else if (obj && typeof obj === "object") {
    Object.values(obj).forEach((value) => extractPathsFromObject(value, paths));
  }
  return paths;
}

// React Componentのpropsからアセットパスを抽出
export function extractAssetsFromProps(props: Record<string, unknown>): {
  images: string[];
  videos: string[];
} {
  const paths = extractPathsFromObject(props);
  return categorizeAssets(Array.from(paths));
}

// 動的インポートでコンポーネントのデータを取得してアセットを抽出
export async function extractAssetsFromModule(
  moduleLoader: () => Promise<{ default?: unknown; [key: string]: unknown }>,
): Promise<{ images: string[]; videos: string[] }> {
  try {
    const module = await moduleLoader();
    const paths = new Set<string>();

    // モジュール全体からパスを抽出
    Object.values(module).forEach((value) => {
      extractPathsFromObject(value, paths);
    });

    return categorizeAssets(Array.from(paths));
  } catch (error) {
    console.error("Failed to extract assets from module:", error);
    return { images: [], videos: [] };
  }
}

// ページごとのアセット収集関数
export function collectHomePageAssets(): {
  images: string[];
  videos: string[];
} {
  // HomePageで使用されているアセットを動的に収集
  const paths = new Set<string>();

  // 静的に定義されているパス
  paths.add("/001_top/LitMus9_logo.webp");
  paths.add("/001_top/nameBG.webp");
  paths.add("/001_top/nameBG_small.webp");
  paths.add("/001_top/離途バナー_差し替え予定.webp");
  paths.add("/001_top/icon_X.svg");
  paths.add("/001_top/icon_youtube.svg");
  paths.add("/001_top/icon_niconico.svg");
  paths.add("/001_top/LitMusHPTopMovie.mp4");
  paths.add("/001_top/LitMusHPTopMovie.webm");

  return categorizeAssets(Array.from(paths));
}

export function collectAboutPageAssets(): {
  images: string[];
  videos: string[];
} {
  const paths = new Set<string>();

  paths.add("/002_about/LitMusIcon.webp");
  paths.add("/LitMusBG.webp");

  return categorizeAssets(Array.from(paths));
}

export async function collectWorksPageAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  // WorksAssetsを動的にインポート
  const { worksData } = await import(
    "@/pages/WorksPage/components/WorksAssets"
  );

  const paths = new Set<string>();
  extractPathsFromObject(worksData, paths);

  return categorizeAssets(Array.from(paths));
}

export function collectVoicebankPageAssets(): {
  images: string[];
  videos: string[];
} {
  const paths = new Set<string>();

  // VoicebankPageで使用されているアセット
  paths.add("/101_Lit/Litlogo.webp");
  paths.add("/101_Lit/LitA_差し替え前提.webp");
  paths.add("/101_Lit/LitB_差し替え前提.webp");
  paths.add("/101_Lit/LitDummy.png");
  paths.add("/LitBG.webp");
  paths.add("/010_PageSideTitleSvg/Character.svg");
  paths.add("/010_PageSideTitleSvg/DOWNLOAD.svg");
  paths.add("/010_PageSideTitleSvg/RULES.svg");
  paths.add("/101_Lit/LitTopMovie.mp4");
  paths.add("/101_Lit/LitTopMovie.webm");

  return categorizeAssets(Array.from(paths));
}

// 動的にダウンロードアセットを収集
export async function collectDownloadAssets(): Promise<{
  images: string[];
  videos: string[];
}> {
  const { DOWNLOAD_ITEMS } = await import(
    "@/pages/VoicebankPage/data/LitDownloadAssets"
  );

  const paths = new Set<string>();
  extractPathsFromObject(DOWNLOAD_ITEMS, paths);

  return categorizeAssets(Array.from(paths));
}
