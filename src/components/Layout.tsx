import { cn } from "@/lib/utils";

// 基本セクションコンポーネント
type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen bg-cover bg-center bg-fixed py-16",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

// コンテナコンポーネント
type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "relative z-[var(--z-content)] mx-auto w-[85%] px-[4%] py-[2%]",
        className,
      )}
    >
      {children}
    </div>
  );
}

// サイドデコレーションコンポーネント
type SideDecorationProps = {
  svgPath?: string;
};

export function SideDecoration({ svgPath }: SideDecorationProps) {
  if (!svgPath) return null;

  return (
    <>
      {/* 右側に配置 - 下半分を表示 */}
      <div className="pointer-events-none fixed -right-[20vw] top-1/2 z-[-200] h-[15vh] w-[40vw] -translate-y-1/2 -rotate-90">
        <img
          src={svgPath}
          alt=""
          className="absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 opacity-80 [clip-path:inset(0_0_50%_0)]"
        />
      </div>

      {/* 左側に配置 - 上半分を表示 */}
      <div className="pointer-events-none fixed -left-[20vw] top-1/2 z-[-50] h-[15vh] w-[40vw] -translate-y-1/2 -rotate-90">
        <img
          src={svgPath}
          alt=""
          className="absolute left-1/2 top-1/2 h-full w-auto -translate-x-1/2 -translate-y-1/2 opacity-80 [clip-path:inset(50%_0_0_0)]"
        />
      </div>
    </>
  );
}

// グリッドコンテナ
type GridContainerProps = {
  children: React.ReactNode;
  columns?: string;
  gap?: string;
  mobileColumns?: string;
  className?: string;
};

export function GridContainer({
  children,
  columns = "1fr",
  gap = "2rem",
  mobileColumns = "1fr",
  className,
}: GridContainerProps) {
  return (
    <div
      className={cn("grid", className)}
      style={
        {
          gridTemplateColumns: columns,
          gap,
          "--mobile-columns": mobileColumns,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
