module.exports = {
  // StorybookのURL設定
  url: "http://localhost:6006",

  // スクリーンショットの出力先
  outDir: ".reg/actual",

  // ビューポート設定（Storybookのビューポートと一致させる）
  viewports: {
    // モバイル
    mobile320: {
      width: 320,
      height: 568,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    mobile375: {
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    mobile414: {
      width: 414,
      height: 896,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    },
    // タブレット
    tablet768: {
      width: 768,
      height: 1024,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    tablet1024: {
      width: 1024,
      height: 768,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    },
    // デスクトップ
    desktop1280: {
      width: 1280,
      height: 720,
      deviceScaleFactor: 1,
    },
    desktop1440: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    },
    desktop1920: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    },
  },

  // Puppeteer の起動オプション
  puppeteerLaunchOptions: {
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  },

  // キャプチャオプション
  captureTimeout: 5000,
  captureMaxRetryCount: 3,

  // ページ読み込み時の待機設定
  waitAssets: true,
  waitImages: true,

  // スクリーンショット前の遅延時間（アニメーション等の待機）
  delay: 1000,

  // ストーリーのフィルタリング
  include: ["**/*.stories.*"],
  exclude: [],

  // Storybookのビューポート設定を使用
  storybookEndpoint: "http://localhost:6006",
};
