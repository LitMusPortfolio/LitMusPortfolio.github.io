export function MobileNotice() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-bg-dark)] p-8 text-center">
      <div className="mb-12 text-[4rem] text-primary">💻</div>
      <h1 className="mb-8 text-2xl font-bold text-[var(--color-text-primary)] tracking-[0.06em]">
        PCでの閲覧を
        <br />
        お願いいたします
      </h1>
      <p className="mb-6 text-base leading-[1.8] text-[var(--color-text-secondary)] tracking-[0.06em]">
        申し訳ございません。
        <br />
        現在このサイトはスマートフォンに
        <br />
        対応しておりません。
      </p>
      <p className="text-sm text-[var(--color-text-muted)] tracking-[0.06em]">
        PCからアクセスしていただけますよう
        <br />
        お願いいたします。
      </p>
    </div>
  );
}
