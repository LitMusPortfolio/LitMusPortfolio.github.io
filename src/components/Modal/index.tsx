import { type ReactNode, useRef } from "react";
import {
  CloseButton,
  ModalContainer,
  ModalContent,
  ModalImageSection,
  ModalTitle,
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
}: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  // フォーカス管理とESCキー処理
  useModalFocusManager({ isOpen, modalRef, onClose });

  // スクロールロック
  useScrollLock(isOpen);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // モーダルを常にレンダリングして、isOpenで表示/非表示を制御
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
        <CloseButton
          onClick={onClose}
          $variant={variant}
          aria-label="Close modal"
          type="button"
        >
          ×
        </CloseButton>
        {(hasImage || imageUrl) && (
          <ModalImageSection>
            {imageUrl && <img src={imageUrl} alt={title || "Modal image"} />}
          </ModalImageSection>
        )}
        {variant === "download" && title ? (
          <ModalContent $variant={variant}>
            <ModalTitle $variant={variant}>{title}</ModalTitle>
            {children}
          </ModalContent>
        ) : (
          children
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}
