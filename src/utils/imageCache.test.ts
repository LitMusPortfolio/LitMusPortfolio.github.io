import { beforeEach, describe, expect, it, vi } from "vitest";
import { imageCache } from "./imageCache";

describe("ImageCacheManager", () => {
  beforeEach(() => {
    // 各テストの前にキャッシュをクリア
    imageCache.clearCache();
    vi.clearAllMocks();
  });

  describe("isLoaded", () => {
    it("ロードされていない画像はfalseを返す", () => {
      expect(imageCache.isLoaded("/test.jpg")).toBe(false);
    });

    it("ロード済みの画像はtrueを返す", () => {
      imageCache.markAsLoaded("/test.jpg");
      expect(imageCache.isLoaded("/test.jpg")).toBe(true);
    });
  });

  describe("markAsLoaded", () => {
    it("画像をロード済みとしてマークできる", () => {
      expect(imageCache.isLoaded("/image.png")).toBe(false);
      imageCache.markAsLoaded("/image.png");
      expect(imageCache.isLoaded("/image.png")).toBe(true);
    });

    it("同じ画像を複数回マークしても問題ない", () => {
      imageCache.markAsLoaded("/same.jpg");
      imageCache.markAsLoaded("/same.jpg");
      expect(imageCache.isLoaded("/same.jpg")).toBe(true);
    });
  });

  describe("preloadImage", () => {
    beforeEach(() => {
      // Imageコンストラクタのモック
      global.Image = vi.fn().mockImplementation(() => ({
        onload: null,
        onerror: null,
        src: "",
      }));
    });

    it("新しい画像をプリロードする", async () => {
      const mockImage = {
        onload: null as any,
        onerror: null as any,
        src: "",
      };

      global.Image = vi.fn().mockImplementation(() => mockImage);

      const promise = imageCache.preloadImage("/new.jpg");

      // srcが設定されていることを確認
      expect(mockImage.src).toBe("/new.jpg");

      // onloadを呼び出して成功をシミュレート
      mockImage.onload?.();

      await promise;
      expect(imageCache.isLoaded("/new.jpg")).toBe(true);
    });

    it("すでにキャッシュされている画像は即座に解決する", async () => {
      imageCache.markAsLoaded("/cached.jpg");

      const promise = imageCache.preloadImage("/cached.jpg");
      await expect(promise).resolves.toBeUndefined();

      // Imageコンストラクタが呼ばれていないことを確認
      expect(global.Image).not.toHaveBeenCalled();
    });

    it("同じ画像の重複読み込みでImageコンストラクタは1回のみ呼ばれる", async () => {
      const mockImage = {
        onload: null as any,
        onerror: null as any,
        src: "",
      };

      global.Image = vi.fn().mockImplementation(() => mockImage);

      const promise1 = imageCache.preloadImage("/duplicate.jpg");
      const promise2 = imageCache.preloadImage("/duplicate.jpg");

      // Imageコンストラクタが1回だけ呼ばれることを確認
      expect(global.Image).toHaveBeenCalledTimes(1);

      // 両方のPromiseが同じ結果になることを確認
      mockImage.onload?.();
      await expect(Promise.all([promise1, promise2])).resolves.toEqual([
        undefined,
        undefined,
      ]);
    });

    it("読み込みエラー時は適切にエラーを返す", async () => {
      const mockImage = {
        onload: null as any,
        onerror: null as any,
        src: "",
      };

      global.Image = vi.fn().mockImplementation(() => mockImage);

      const promise = imageCache.preloadImage("/error.jpg");

      // onerrorを呼び出してエラーをシミュレート
      mockImage.onerror?.();

      await expect(promise).rejects.toThrow("Failed to load image: /error.jpg");
      expect(imageCache.isLoaded("/error.jpg")).toBe(false);
    });
  });

  describe("preloadImages", () => {
    beforeEach(() => {
      // preloadImageメソッドをモック
      vi.spyOn(imageCache, "preloadImage");
    });

    it("複数の画像を一度にプリロードできる", async () => {
      const sources = ["/img1.jpg", "/img2.jpg", "/img3.jpg"];

      // 成功をシミュレート
      vi.mocked(imageCache.preloadImage).mockResolvedValue(undefined);

      await imageCache.preloadImages(sources);

      expect(imageCache.preloadImage).toHaveBeenCalledTimes(3);
      sources.forEach((src) => {
        expect(imageCache.preloadImage).toHaveBeenCalledWith(src);
      });
    });

    it("一部の画像が失敗しても他の画像は処理される", async () => {
      const sources = ["/success1.jpg", "/fail.jpg", "/success2.jpg"];

      vi.mocked(imageCache.preloadImage)
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(new Error("Failed"))
        .mockResolvedValueOnce(undefined);

      // エラーをキャッチしてログに出力することを確認
      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation();

      await imageCache.preloadImages(sources);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Failed to preload image: /fail.jpg",
        expect.any(Error),
      );

      consoleWarnSpy.mockRestore();
    });

    it("空の配列を渡しても問題ない", async () => {
      await expect(imageCache.preloadImages([])).resolves.toBeUndefined();
      expect(imageCache.preloadImage).not.toHaveBeenCalled();
    });
  });

  describe("clearCache", () => {
    it("すべてのキャッシュをクリアする", () => {
      // 複数の画像をキャッシュに追加
      imageCache.markAsLoaded("/img1.jpg");
      imageCache.markAsLoaded("/img2.jpg");
      imageCache.markAsLoaded("/img3.jpg");

      expect(imageCache.isLoaded("/img1.jpg")).toBe(true);
      expect(imageCache.isLoaded("/img2.jpg")).toBe(true);
      expect(imageCache.isLoaded("/img3.jpg")).toBe(true);

      // キャッシュをクリア
      imageCache.clearCache();

      expect(imageCache.isLoaded("/img1.jpg")).toBe(false);
      expect(imageCache.isLoaded("/img2.jpg")).toBe(false);
      expect(imageCache.isLoaded("/img3.jpg")).toBe(false);
    });
  });
});
