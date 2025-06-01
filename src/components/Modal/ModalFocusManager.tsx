import { useEffect, useRef } from "react";

interface ModalFocusManagerProps {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

export function useModalFocusManager({
  isOpen,
  modalRef,
  onClose,
}: ModalFocusManagerProps): void {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // 現在のフォーカス要素を保存
    previousActiveElement.current = document.activeElement as HTMLElement;

    // モーダル内の最初のフォーカス可能要素にフォーカス
    setTimeout(() => {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      // Tab キーでのフォーカストラップ
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // 元のフォーカス要素に戻す
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose, modalRef]);
}

export function useScrollLock(isOpen: boolean): void {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
}
