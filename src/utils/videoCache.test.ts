import { beforeEach, describe, expect, it, vi } from "vitest";
import { videoCache } from "./videoCache";

describe("VideoCacheManager", () => {
  beforeEach(() => {
    videoCache.clearCache();
    vi.clearAllMocks();
  });

  describe("isLoaded", () => {
    it("ロードされていないビデオはfalseを返す", () => {
      expect(videoCache.isLoaded("/video.mp4")).toBe(false);
    });

    it("ロード済みのビデオはtrueを返す", () => {
      videoCache.markAsLoaded("/video.mp4");
      expect(videoCache.isLoaded("/video.mp4")).toBe(true);
    });

    it("sourcesからキャッシュキーを生成する", () => {
      const sources = [
        { src: "/video.webm", type: "video/webm" },
        { src: "/video.mp4", type: "video/mp4" },
      ];

      expect(videoCache.isLoaded(undefined, sources)).toBe(false);
      videoCache.markAsLoaded(undefined, sources);
      expect(videoCache.isLoaded(undefined, sources)).toBe(true);
    });

    it("空のソースでfalseを返す", () => {
      expect(videoCache.isLoaded()).toBe(false);
      expect(videoCache.isLoaded("")).toBe(false);
      expect(videoCache.isLoaded(undefined, [])).toBe(false);
    });
  });

  describe("markAsLoaded", () => {
    it("メタデータ付きでビデオをマークできる", () => {
      const metadata = {
        duration: 120,
        width: 1920,
        height: 1080,
      };

      videoCache.markAsLoaded("/video.mp4", undefined, metadata);
      expect(videoCache.isLoaded("/video.mp4")).toBe(true);
      expect(videoCache.getMetadata("/video.mp4")).toEqual(metadata);
    });

    it("メタデータなしでもマークできる", () => {
      videoCache.markAsLoaded("/video.mp4");
      expect(videoCache.isLoaded("/video.mp4")).toBe(true);
      expect(videoCache.getMetadata("/video.mp4")).toBeUndefined();
    });
  });

  describe("getMetadata", () => {
    it("保存されたメタデータを取得できる", () => {
      const metadata = { duration: 60, width: 1280, height: 720 };
      videoCache.markAsLoaded("/video.mp4", undefined, metadata);

      expect(videoCache.getMetadata("/video.mp4")).toEqual(metadata);
    });

    it("メタデータがない場合はundefinedを返す", () => {
      expect(videoCache.getMetadata("/nonexistent.mp4")).toBeUndefined();
    });

    it("sourcesからもメタデータを取得できる", () => {
      const sources = [{ src: "/video.webm", type: "video/webm" }];
      const metadata = { duration: 30 };

      videoCache.markAsLoaded(undefined, sources, metadata);
      expect(videoCache.getMetadata(undefined, sources)).toEqual(metadata);
    });
  });

  describe("preloadVideo", () => {
    let mockVideo: {
      preload: string;
      addEventListener: ReturnType<typeof vi.fn>;
      src: string;
      duration: number;
      videoWidth: number;
      videoHeight: number;
    };

    beforeEach(() => {
      mockVideo = {
        preload: "",
        addEventListener: vi.fn(),
        src: "",
        duration: 120,
        videoWidth: 1920,
        videoHeight: 1080,
      };

      vi.spyOn(document, "createElement").mockReturnValue(mockVideo);
    });

    it("新しいビデオをプリロードする", async () => {
      const promise = videoCache.preloadVideo("/new-video.mp4");

      expect(document.createElement).toHaveBeenCalledWith("video");
      expect(mockVideo.preload).toBe("metadata");
      expect(mockVideo.src).toBe("/new-video.mp4");

      // loadedmetadataイベントリスナーを取得して実行
      const loadedMetadataCall = mockVideo.addEventListener.mock.calls.find(
        (call) => call[0] === "loadedmetadata",
      );
      loadedMetadataCall[1]();

      await promise;

      expect(videoCache.isLoaded("/new-video.mp4")).toBe(true);
      expect(videoCache.getMetadata("/new-video.mp4")).toEqual({
        duration: 120,
        width: 1920,
        height: 1080,
      });
    });

    it("すでにキャッシュされているビデオは即座に解決する", async () => {
      videoCache.markAsLoaded("/cached-video.mp4");

      await videoCache.preloadVideo("/cached-video.mp4");

      expect(document.createElement).not.toHaveBeenCalled();
    });

    it("同じビデオの重複読み込みでcreateElementは1回のみ呼ばれる", async () => {
      const promise1 = videoCache.preloadVideo("/duplicate-video.mp4");
      const promise2 = videoCache.preloadVideo("/duplicate-video.mp4");

      // createElementが1回だけ呼ばれることを確認
      expect(document.createElement).toHaveBeenCalledTimes(1);

      // loadedmetadataを実行
      const loadedMetadataCall = mockVideo.addEventListener.mock.calls.find(
        (call) => call[0] === "loadedmetadata",
      );
      loadedMetadataCall[1]();

      // 両方のPromiseが同じ結果になることを確認
      await expect(Promise.all([promise1, promise2])).resolves.toEqual([
        undefined,
        undefined,
      ]);
    });

    it("エラー時は適切にエラーを返す", async () => {
      const promise = videoCache.preloadVideo("/error-video.mp4");

      // errorイベントリスナーを取得して実行
      const errorCall = mockVideo.addEventListener.mock.calls.find(
        (call) => call[0] === "error",
      );
      errorCall[1]();

      await expect(promise).rejects.toThrow(
        "Failed to load video: /error-video.mp4",
      );
      expect(videoCache.isLoaded("/error-video.mp4")).toBe(false);
    });
  });

  describe("preloadVideos", () => {
    beforeEach(() => {
      vi.spyOn(videoCache, "preloadVideo");
    });

    it("複数のビデオを一度にプリロードできる", async () => {
      const sources = ["/video1.mp4", "/video2.mp4", "/video3.mp4"];

      vi.mocked(videoCache.preloadVideo).mockResolvedValue(undefined);

      await videoCache.preloadVideos(sources);

      expect(videoCache.preloadVideo).toHaveBeenCalledTimes(3);
      sources.forEach((src) => {
        expect(videoCache.preloadVideo).toHaveBeenCalledWith(src);
      });
    });

    it("一部のビデオが失敗しても他のビデオは処理される", async () => {
      const sources = ["/success1.mp4", "/fail.mp4", "/success2.mp4"];

      vi.mocked(videoCache.preloadVideo)
        .mockResolvedValueOnce(undefined)
        .mockRejectedValueOnce(new Error("Failed"))
        .mockResolvedValueOnce(undefined);

      const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      await videoCache.preloadVideos(sources);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        "Failed to preload video: /fail.mp4",
        expect.any(Error),
      );

      consoleWarnSpy.mockRestore();
    });
  });

  describe("clearCache", () => {
    it("すべてのキャッシュをクリアする", () => {
      const metadata1 = { duration: 60 };
      const metadata2 = { duration: 120 };

      videoCache.markAsLoaded("/video1.mp4", undefined, metadata1);
      videoCache.markAsLoaded("/video2.mp4", undefined, metadata2);

      expect(videoCache.isLoaded("/video1.mp4")).toBe(true);
      expect(videoCache.isLoaded("/video2.mp4")).toBe(true);

      videoCache.clearCache();

      expect(videoCache.isLoaded("/video1.mp4")).toBe(false);
      expect(videoCache.isLoaded("/video2.mp4")).toBe(false);
      expect(videoCache.getMetadata("/video1.mp4")).toBeUndefined();
      expect(videoCache.getMetadata("/video2.mp4")).toBeUndefined();
    });
  });
});
