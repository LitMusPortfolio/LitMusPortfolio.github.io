import { type ReactNode, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import { glassmorphism } from "@/styles/utils";

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
}

// モーダルオーバーレイ（背景）
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

// モーダルコンテナ
const ModalContainer = styled.div<{
  $maxWidth?: string;
  $hasImage?: boolean;
  $variant?: string;
}>`
  position: relative;
  border-radius: 20px;
  max-width: ${(props) => props.$maxWidth || "900px"};
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: ${(props) => (props.$hasImage ? "flex" : "block")};
  
  ${(props) => {
    switch (props.$variant) {
      case "glass":
        return css`
          ${glassmorphism}
          border-radius: 20px;
        `;
      case "download":
        return css`
          background: rgba(20, 20, 30, 0.98);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(138, 97, 255, 0.3);
        `;
      default:
        return css`
          background: rgba(20, 20, 30, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(139, 92, 246, 0.3);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(139, 92, 246, 0.1),
            inset 0 0 50px rgba(139, 92, 246, 0.05);
        `;
    }
  }}
  
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "768px"}) {
    flex-direction: column;
    max-height: 95vh;
  }
`;

// 閉じるボタン
const CloseButton = styled.button<{ $variant?: string }>`
  position: absolute;
  top: ${(props) => (props.$variant === "download" ? "-15px" : "1.5rem")};
  right: ${(props) => (props.$variant === "download" ? "-15px" : "1.5rem")};
  width: 40px;
  height: 40px;
  background: rgba(139, 92, 246, 0.2);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: ${theme.colors.primary.main};
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 5px 20px rgba(139, 92, 246, 0.5);
  }
`;

// モーダルコンテンツエリア
export const ModalContent = styled.div<{ $variant?: string }>`
  padding: ${(props) => (props.$variant === "download" ? "2.5rem" : "3rem")};
  overflow-y: auto;
  max-height: ${(props) => (props.$variant === "download" ? "calc(90vh - 60px)" : "100%")};
  
  ${(props) =>
    props.$variant === "download" &&
    css`
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(138, 97, 255, 0.3);
      border-radius: 4px;
      
      &:hover {
        background: rgba(138, 97, 255, 0.5);
      }
    }
  `}
  
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "768px"}) {
    padding: 2rem;
  }
`;

// モーダルタイトル
export const ModalTitle = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.primary.main};
  
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "768px"}) {
    font-size: 2rem;
  }
`;

// モーダル画像エリア（オプション）
export const ModalImageSection = styled.div`
  flex: 0 0 350px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(92, 246, 246, 0.1)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "768px"}) {
    flex: 0 0 200px;
  }
`;

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
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick} ref={modalRef}>
      <ModalContainer
        onClick={(e) => e.stopPropagation()}
        $maxWidth={maxWidth}
        $hasImage={hasImage || !!imageUrl}
        $variant={variant}
      >
        <CloseButton onClick={onClose} $variant={variant}>
          ×
        </CloseButton>
        {(hasImage || imageUrl) && (
          <ModalImageSection>
            {imageUrl && <img src={imageUrl} alt={title || "Modal image"} />}
          </ModalImageSection>
        )}
        {variant === "download" && title ? (
          <ModalContent $variant={variant}>
            <ModalTitle>{title}</ModalTitle>
            {children}
          </ModalContent>
        ) : (
          children
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}
