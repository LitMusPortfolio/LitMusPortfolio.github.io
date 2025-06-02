// グローバルな画像キャッシュマネージャー
class ImageCacheManager {
  private cache: Set<string>;
  private loadingPromises: Map<string, Promise<void>>;

  constructor() {
    this.cache = new Set();
    this.loadingPromises = new Map();
  }

  // 画像がキャッシュされているかチェック
  isLoaded(src: string): boolean {
    return this.cache.has(src);
  }

  // 画像をキャッシュに追加
  markAsLoaded(src: string): void {
    this.cache.add(src);
  }

  // 画像の読み込みを開始（重複読み込みを防ぐ）
  async preloadImage(src: string): Promise<void> {
    // すでにキャッシュされている場合は即座に解決
    if (this.isLoaded(src)) {
      return Promise.resolve();
    }

    // すでに読み込み中の場合は、その Promise を返す
    const existingPromise = this.loadingPromises.get(src);
    if (existingPromise) {
      return existingPromise;
    }

    // 新しい読み込みを開始
    const loadPromise = new Promise<void>((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        this.markAsLoaded(src);
        this.loadingPromises.delete(src);
        resolve();
      };

      img.onerror = () => {
        this.loadingPromises.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };

      img.src = src;
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
export const imageCache = new ImageCacheManager();
