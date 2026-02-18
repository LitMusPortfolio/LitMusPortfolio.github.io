import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
      <h2 className="mb-4 text-[2rem] text-[var(--color-text-primary)]">
        404 - ページが見つかりません
      </h2>
      <p className="mb-8 max-w-[600px] text-base text-[var(--color-text-secondary)]">
        お探しのページは存在しないか、移動された可能性があります。
      </p>
      <Button variant="gradient" className="px-8 py-4" asChild>
        <Link href="/">トップページへ戻る</Link>
      </Button>
    </div>
  );
}
