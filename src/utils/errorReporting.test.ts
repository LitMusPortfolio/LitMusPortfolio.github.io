import { beforeEach, describe, expect, it, vi } from "vitest";
import { formatErrorInfo, getErrorMessage, setupGlobalErrorHandlers } from "./errorReporting";

describe("errorReporting", () => {
  describe("formatErrorInfo", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("エラー情報を正しくフォーマットする", () => {
      const error = new Error("Test error");
      const errorInfo = {
        componentStack: "\n    at TestComponent\n    at ErrorBoundary",
      };

      const result = formatErrorInfo(error, errorInfo);

      expect(result).toMatchObject({
        message: "Test error",
        stack: expect.any(String),
        timestamp: expect.any(String),
        userAgent: expect.any(String),
        url: expect.any(String),
        componentStack: errorInfo.componentStack,
      });
    });

    it("開発環境ではコンソールに出力する", () => {
      // 開発環境をシミュレート
      vi.stubEnv("DEV", true);

      const error = new Error("Dev error");
      formatErrorInfo(error);

      expect(console.error).toHaveBeenCalledWith(
        "Error Details:",
        expect.objectContaining({
          message: "Dev error",
        })
      );

      vi.unstubAllEnvs();
    });
  });

  describe("getErrorMessage", () => {
    it("ネットワークエラーに対して適切なメッセージを返す", () => {
      const error = new TypeError("Failed to fetch");
      const message = getErrorMessage(error);
      
      expect(message).toBe("ネットワーク接続に問題が発生しました。インターネット接続を確認してください。");
    });

    it("メディア読み込みエラーに対して適切なメッセージを返す", () => {
      const error = new Error("Failed to load image: test.jpg");
      const message = getErrorMessage(error);
      
      expect(message).toBe("メディアファイルの読み込みに失敗しました。ページを再読み込みしてください。");
    });

    it("チャンクロードエラーに対して適切なメッセージを返す", () => {
      const error = new Error("Loading chunk 123 failed");
      const message = getErrorMessage(error);
      
      expect(message).toBe("アプリケーションの一部が読み込めませんでした。ページを再読み込みしてください。");
    });

    it("不明なエラーに対してデフォルトメッセージを返す", () => {
      const error = new Error("Unknown error");
      const message = getErrorMessage(error);
      
      expect(message).toBe("予期しないエラーが発生しました。時間をおいて再度お試しください。");
    });

    it("エラーオブジェクト以外でもデフォルトメッセージを返す", () => {
      const message = getErrorMessage("string error");
      
      expect(message).toBe("予期しないエラーが発生しました。時間をおいて再度お試しください。");
    });
  });

  describe("setupGlobalErrorHandlers", () => {
    it("グローバルエラーハンドラーを設定する", () => {
      const addEventListenerSpy = vi.spyOn(window, "addEventListener");
      
      setupGlobalErrorHandlers();
      
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "unhandledrejection",
        expect.any(Function)
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "error",
        expect.any(Function)
      );
      
      addEventListenerSpy.mockRestore();
    });

    it("未処理のPromise拒否をキャッチする", () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      const preventDefaultSpy = vi.fn();
      
      setupGlobalErrorHandlers();
      
      const event = new Event("unhandledrejection") as PromiseRejectionEvent;
      Object.defineProperty(event, "reason", { value: new Error("Promise rejection") });
      Object.defineProperty(event, "preventDefault", { value: preventDefaultSpy });
      
      window.dispatchEvent(event);
      
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Unhandled promise rejection:",
        expect.any(Error)
      );
      expect(preventDefaultSpy).toHaveBeenCalled();
      
      consoleErrorSpy.mockRestore();
    });
  });
});