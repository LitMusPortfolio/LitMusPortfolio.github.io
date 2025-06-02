import {
  collectAboutPageAssets,
  collectContactPageAssets,
  collectDownloadAssets,
  collectHomePageAssets,
  collectRuntimeAssets,
  collectVoicebankPageAssets,
  collectWorksPageAssets,
} from "./collectDynamicAssets";
import { imageCache } from "./imageCache";
import { videoCache } from "./videoCache";

// ページ別のプリロード関数
export async function preloadHomePage(): Promise<void> {
  console.log("Preloading home page assets...");
  const assets = collectHomePageAssets();
  await Promise.all([
    imageCache.preloadImages(assets.images),
    videoCache.preloadVideos(assets.videos),
  ]);
}

export async function preloadAboutPage(): Promise<void> {
  console.log("Preloading about page assets...");
  const assets = collectAboutPageAssets();
  await imageCache.preloadImages(assets.images);
}

export async function preloadWorksPage(): Promise<void> {
  console.log("Preloading works page assets...");
  const assets = await collectWorksPageAssets();
  await imageCache.preloadImages(assets.images);
}

export async function preloadVoicebankPage(): Promise<void> {
  console.log("Preloading voicebank page assets...");
  const [voicebankAssets, downloadAssets] = await Promise.all([
    Promise.resolve(collectVoicebankPageAssets()),
    collectDownloadAssets(),
  ]);

  const allImages = [...voicebankAssets.images, ...downloadAssets.images];
  const allVideos = [...voicebankAssets.videos, ...downloadAssets.videos];

  await Promise.all([
    imageCache.preloadImages(allImages),
    videoCache.preloadVideos(allVideos),
  ]);
}

// 全ページのアセットをプリロード（必要に応じて）
export async function preloadAllAssets(): Promise<void> {
  console.log("Preloading all assets...");

  // 各ページのアセットを動的に収集
  const [
    homeAssets,
    aboutAssets,
    worksAssets,
    voicebankAssets,
    downloadAssets,
  ] = await Promise.all([
    Promise.resolve(collectHomePageAssets()),
    Promise.resolve(collectAboutPageAssets()),
    collectWorksPageAssets(),
    Promise.resolve(collectVoicebankPageAssets()),
    collectDownloadAssets(),
  ]);

  const allImages = [
    ...homeAssets.images,
    ...aboutAssets.images,
    ...worksAssets.images,
    ...voicebankAssets.images,
    ...downloadAssets.images,
  ];

  const allVideos = [
    ...homeAssets.videos,
    ...aboutAssets.videos,
    ...worksAssets.videos,
    ...voicebankAssets.videos,
    ...downloadAssets.videos,
  ];

  await Promise.all([
    imageCache.preloadImages(allImages),
    videoCache.preloadVideos(allVideos),
  ]);
}

// 優先度の高いアセットのみプリロード
export async function preloadCriticalAssets(): Promise<void> {
  console.log("Preloading critical assets...");
  // ホームページとロゴなど、最初に表示される重要なアセットのみ
  const criticalImages = [
    "/001_top/LitMus9_logo.webp",
    "/001_top/nameBG.webp",
    "/002_about/LitMusIcon.webp",
  ];

  await imageCache.preloadImages(criticalImages);
}

// 次のページのアセットを予測してプリロード
export async function preloadNextPageAssets(
  currentPath: string,
): Promise<void> {
  switch (currentPath) {
    case "/":
      // ホームページからは About や Works に行く可能性が高い
      await Promise.all([preloadAboutPage(), preloadWorksPage()]);
      break;
    case "/about":
      // About からは Works や Voicebank に行く可能性
      await Promise.all([preloadWorksPage(), preloadVoicebankPage()]);
      break;
    case "/works":
      // Works からは Voicebank に行く可能性
      await preloadVoicebankPage();
      break;
    default:
      break;
  }
}

// 現在のページのアセットを優先的にロードし、その後他のページをロード
export async function preloadAssetsForPage(currentPath: string): Promise<void> {
  // まず現在のページのアセットをロード
  switch (currentPath) {
    case "/":
      await preloadHomePage();
      break;
    case "/about":
      await preloadAboutPage();
      break;
    case "/works":
      await preloadWorksPage();
      break;
    case "/voicebank":
      await preloadVoicebankPage();
      break;
    case "/contact":
      await preloadContactPage();
      break;
    default: {
      // 未知のページの場合、実行時にDOMからアセットを収集
      console.log(`Collecting runtime assets for ${currentPath}...`);
      const runtimeAssets = collectRuntimeAssets();
      await Promise.all([
        imageCache.preloadImages(runtimeAssets.images),
        videoCache.preloadVideos(runtimeAssets.videos),
      ]);
    }
  }

  // 現在のページのロードが完了したら、他のページのアセットをバックグラウンドでロード
  // setTimeoutを使って非同期に実行し、現在のページの描画をブロックしない
  setTimeout(async () => {
    await preloadNextPageAssets(currentPath);
  }, 1000); // 1秒後に他のページのプリロードを開始
}

// ContactPage用のプリロード関数
export async function preloadContactPage(): Promise<void> {
  console.log("Preloading contact page assets...");
  const assets = await collectContactPageAssets();
  await imageCache.preloadImages(assets.images);
}
