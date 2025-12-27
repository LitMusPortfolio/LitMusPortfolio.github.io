import React, { type ReactNode, useRef } from "react";
import LazyImage from "@/components/LazyImage";
import {
  ModalContainer,
  ModalContent,
  ModalImageSection,
} from "./ModalContent";
import { useModalFocusManager, useScrollLock } from "./ModalFocusManager";
import { ModalOverlay } from "./ModalOverlay";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string;
  hasImage?: boolean;
  title?: string;
  imageUrl?: string;
  variant?: "default" | "download" | "glass";
  ariaLabel?: string;
};

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
}: ModalProps): React.JSX.Element | null {
  const modalRef = useRef<HTMLDivElement>(null);

  useModalFocusManager({
    isOpen,
    modalRef: modalRef as React.RefObject<HTMLDivElement>,
    onClose,
  });

  useScrollLock(isOpen);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        maxWidth={maxWidth}
        hasImage={hasImage || !!imageUrl}
        variant={variant}
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
        <ModalContent variant={variant} title={title}>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}
