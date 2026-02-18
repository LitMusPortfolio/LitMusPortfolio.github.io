"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: globalThis.Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <h2 className="mb-4 text-[2rem] text-[var(--color-text-primary)]">
        エラーが発生しました
      </h2>
      <p className="mb-8 max-w-[600px] text-base text-[var(--color-text-secondary)]">
        予期しないエラーが発生しました。時間をおいて再度お試しください。
      </p>
      <div className="flex gap-6">
        <Button variant="gradient" className="px-8 py-4" onClick={reset}>
          もう一度試す
        </Button>
        <Button
          variant="gradient"
          className="px-8 py-4"
          onClick={() => window.location.reload()}
        >
          ページを再読み込み
        </Button>
      </div>
    </div>
  );
}
