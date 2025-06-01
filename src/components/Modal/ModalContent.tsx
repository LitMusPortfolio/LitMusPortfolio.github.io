import type React from "react";
import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import { glassmorphism } from "@/styles/utils";

// モーダルコンテンツエリア
interface ModalContentProps {
  $variant?: string;
  title?: string;
  children: React.ReactNode;
}

export const ModalContentContainer = styled.div<{ $variant?: string }>`
  padding: ${(props) => (props.$variant === "download" ? "2.5rem" : "3rem")};
`;

export const ModalContent = ({
  $variant,
  title,
  children,
}: ModalContentProps) => (
  <ModalContentContainer $variant={$variant}>
    {title && <ModalTitle $variant={$variant}>{title}</ModalTitle>}
    {children}
  </ModalContentContainer>
);

// モーダルタイトルコンテナ
const ModalTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 2rem;
`;

// モーダルタイトル
const ModalTitleText = styled.h2<{ $variant?: string }>`
  font-size: 2rem;
  color: #ffffff;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
`;

// モーダルタイトル罫線
const ModalTitleLine = styled.div`
  flex: 1;
  height: ${theme.borders.width.base};
  background: ${theme.colors.text.primary};
  opacity: ${theme.opacity[80]};
  margin-left: ${theme.space.sm};
`;

// モーダルタイトル（コンポーネント）
export const ModalTitle = ({
  $variant,
  children,
}: {
  $variant?: string;
  children: React.ReactNode;
}) => (
  <ModalTitleContainer>
    <ModalTitleText $variant={$variant}>{children}</ModalTitleText>
    <ModalTitleLine />
  </ModalTitleContainer>
);

// モーダル画像エリア（オプション）
export const ModalImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// モーダルコンテナ
export const ModalContainer = styled.div<{
  $maxWidth?: string;
  $hasImage?: boolean;
  $variant?: string;
}>`
  position: relative;
  border-radius: 5px;
  padding: 2rem;
  width: 80%;
  height: 70%;
  overflow: hidden;
  display: ${(props) => (props.$hasImage ? "grid" : "block")};
  grid-template-columns: ${(props) => (props.$hasImage ? "2fr 3fr" : "1fr")};
  transform: scale(0.95);
  opacity: 0;
  animation: modalFadeIn 0.3s ease forwards;
  
  @keyframes modalFadeIn {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  ${(props) => {
    switch (props.$variant) {
      case "glass":
        return css`
          ${glassmorphism}
          border-radius: 20px;
        `;
      case "download":
        return css`
          background: linear-gradient(
            135deg,
            rgba(20, 20, 30, 0.98) 0%,
            rgba(30, 20, 40, 0.98) 100%
          );
          border: 1px solid rgba(138, 97, 255, 0.2);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.5),
            0 0 120px rgba(139, 92, 246, 0.15),
            inset 0 0 60px rgba(139, 92, 246, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
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
`;
