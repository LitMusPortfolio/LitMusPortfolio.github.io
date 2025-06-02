/**
 * エラー情報を構造化して報告用に整形
 */
export function formatErrorInfo(error: Error, errorInfo?: React.ErrorInfo) {
  const errorDetails = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    componentStack: errorInfo?.componentStack,
  };

  // 開発環境ではコンソールに詳細を出力
  if (import.meta.env.DEV) {
    console.error("Error Details:", errorDetails);
  }

  return errorDetails;
}

/**
 * エラーをユーザーフレンドリーなメッセージに変換
 */
export function getErrorMessage(error: unknown) {
  // ネットワークエラー
  if (error instanceof TypeError && error.message.includes("fetch")) {
    return "ネットワーク接続に問題が発生しました。インターネット接続を確認してください。";
  }

  // 画像・動画の読み込みエラー
  if (error instanceof Error && error.message.includes("Failed to load")) {
    return "メディアファイルの読み込みに失敗しました。ページを再読み込みしてください。";
  }

  // チャンクロードエラー（コード分割）
  if (error instanceof Error && error.message.includes("Loading chunk")) {
    return "アプリケーションの一部が読み込めませんでした。ページを再読み込みしてください。";
  }

  // デフォルトメッセージ
  return "予期しないエラーが発生しました。時間をおいて再度お試しください。";
}

/**
 * グローバルなエラーハンドラーを設定
 */
export function setupGlobalErrorHandlers() {
  // 未処理のPromise拒否をキャッチ
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
    event.preventDefault();
  });

  // グローバルエラーをキャッチ
  window.addEventListener("error", (event) => {
    console.error("Global error:", event.error);
  });
}
