import { cn } from "@/lib/utils";

type ModalOverlayProps = {
  isOpen: boolean;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

export function ModalOverlay({ isOpen, onClick, children }: ModalOverlayProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn("fixed inset-0 z-[9999] bg-black/80 backdrop-blur-[10px]")}
    >
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-0 h-full w-full cursor-default border-none bg-transparent"
        aria-label="モーダルを閉じる"
      />
      {children}
    </div>
  );
}
