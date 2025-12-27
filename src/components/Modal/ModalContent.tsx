import { forwardRef } from "react";
import { cn } from "@/lib/utils";

// モーダルコンテナ
type ModalContainerProps = {
  maxWidth?: string;
  hasImage?: boolean;
  variant?: "default" | "download" | "glass";
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const ModalContainer = forwardRef<HTMLDivElement, ModalContainerProps>(
  (
    { maxWidth, hasImage, variant = "default", children, onClick, ...props },
    ref,
  ) => {
    const variantClasses = {
      default:
        "bg-[rgba(20,20,30,0.95)] backdrop-blur-[20px] border border-purple-500/30 shadow-[0_25px_50px_rgba(0,0,0,0.5),0_0_100px_rgba(139,92,246,0.1),inset_0_0_50px_rgba(139,92,246,0.05)]",
      download:
        "bg-gradient-to-br from-[rgba(20,20,30,0.98)] to-[rgba(30,20,40,0.98)] border border-purple-500/20 shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_120px_rgba(139,92,246,0.15),inset_0_0_60px_rgba(139,92,246,0.08),inset_0_1px_0_rgba(255,255,255,0.1)]",
      glass: "glass rounded-xl",
    };

    return (
      <div
        ref={ref}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
          }
        }}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed left-1/2 top-1/2 z-[10000] h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl p-8",
          hasImage ? "grid grid-cols-[0.4fr_0.6fr]" : "block",
          variantClasses[variant],
        )}
        style={maxWidth ? { maxWidth } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ModalContainer.displayName = "ModalContainer";

// モーダル画像エリア
export function ModalImageSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center overflow-hidden p-8 [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
      {children}
    </div>
  );
}

// モーダルコンテンツエリア
type ModalContentProps = {
  variant?: string;
  title?: string;
  children: React.ReactNode;
};

export function ModalContent({ variant, title, children }: ModalContentProps) {
  return (
    <div className={cn(variant === "download" ? "p-16" : "p-12")}>
      {title && <TitleComponent>{title}</TitleComponent>}
      {children}
    </div>
  );
}

// モーダルタイトル
function TitleComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 flex w-full items-center">
      <h2 className="m-0 whitespace-nowrap text-[2rem] font-semibold text-[var(--color-text-primary)]">
        {children}
      </h2>
      <div className="ml-4 h-0.5 flex-1 bg-[var(--color-text-primary)] opacity-80" />
    </div>
  );
}
