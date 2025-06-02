import React, { type ReactNode, useRef } from "react";
import LazyImage from "@/components/LazyImage";
import {
  ModalContainer,
  ModalContent,
  ModalImageSection,
} from "./ModalContent";
import { useModalFocusManager, useScrollLock } from "./ModalFocusManager";
import { ModalOverlay } from "./ModalOverlay";

// モーダルのプロップス型定義
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  hasImage?: boolean;
  title?: string;
  imageUrl?: string;
  variant?: "default" | "download" | "glass";
  ariaLabel?: string;
}

// メインモーダルコンポーネント
export default function Modal({
  isOpen,
  onClose,
  children,
  maxWidth,
  hasImage = false,
  title,
  imageUrl,
  variant = "default",
  ariaLabel,
}: ModalProps): React.JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  // フォーカス管理とESCキー処理
  useModalFocusManager({
    isOpen,
    modalRef: modalRef as React.RefObject<HTMLDivElement>,
    onClose,
  });

  // スクロールロック
  useScrollLock(isOpen);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // isOpenがfalseの場合は何もレンダリングしない
  if (!isOpen) {
    return <></>;
  }

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        $maxWidth={maxWidth}
        $hasImage={hasImage || !!imageUrl}
        $variant={variant}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel || title || "Modal dialog"}
        tabIndex={-1}
      >
        {(hasImage || imageUrl) && (
          <ModalImageSection>
            {imageUrl && (
              <LazyImage src={imageUrl} alt={title || "Modal image"} />
            )}
          </ModalImageSection>
        )}
        <ModalContent $variant={variant} title={title}>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}
