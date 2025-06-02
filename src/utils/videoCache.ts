// ビデオメタデータの型定義
interface VideoMetadata {
  duration?: number;
  width?: number;
  height?: number;
}

// グローバルなビデオキャッシュマネージャー
class VideoCacheManager {
  private cache: Map<string, { loaded: boolean; metadata?: VideoMetadata }>;
  private loadingPromises: Map<string, Promise<void>>;

  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  // ビデオソースから一意のキーを生成
  private getCacheKey(
    src?: string,
    sources?: Array<{ src: string; type: string }>,
  ): string {
    if (src) {
      return src;
    }
    if (sources && sources.length > 0) {
      // 複数ソースの場合は最初のソースをキーとして使用
      return sources[0].src;
    }
    return "";
  }

  // ビデオがキャッシュされているかチェック
  isLoaded(
    src?: string,
    sources?: Array<{ src: string; type: string }>,
  ): boolean {
    const key = this.getCacheKey(src, sources);
    return this.cache.has(key) && this.cache.get(key)?.loaded === true;
  }

  // ビデオのメタデータをキャッシュに追加
  markAsLoaded(
    src?: string,
    sources?: Array<{ src: string; type: string }>,
    metadata?: VideoMetadata,
  ): void {
    const key = this.getCacheKey(src, sources);
    if (key) {
      this.cache.set(key, { loaded: true, metadata });
    }
  }

  // キャッシュされたメタデータを取得
  getMetadata(
    src?: string,
    sources?: Array<{ src: string; type: string }>,
  ): VideoMetadata | undefined {
    const key = this.getCacheKey(src, sources);
    return this.cache.get(key)?.metadata;
  }

  // ビデオのプリロード（必要に応じて）
  async preloadVideo(src: string): Promise<void> {
    if (this.isLoaded(src)) {
      return Promise.resolve();
    }

    const existingPromise = this.loadingPromises.get(src);
    if (existingPromise) {
      return existingPromise;
    }

    const loadPromise = new Promise<void>((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";

      video.addEventListener("loadedmetadata", () => {
        this.markAsLoaded(src, undefined, {
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
        });
        this.loadingPromises.delete(src);
        resolve();
      });

      video.addEventListener("error", () => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load video: ${src}`));
      });

      video.src = src;
    });

    this.loadingPromises.set(src, loadPromise);
    return loadPromise;
  }

  // キャッシュをクリア（必要に応じて）
  clearCache(): void {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

// シングルトンインスタンス
export const videoCache = new VideoCacheManager();
