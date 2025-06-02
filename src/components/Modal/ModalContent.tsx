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

const ContentContainer = styled.div<{ $variant?: string }>`
  padding: ${(props) => (props.$variant === "download" ? theme.space["2xl"] : theme.space.xl)};
`;

export const ModalContent = ({
  $variant,
  title,
  children,
}: ModalContentProps) => (
  <ContentContainer $variant={$variant}>
    {title && <TitleComponent $variant={$variant}>{title}</TitleComponent>}
    {children}
  </ContentContainer>
);

// モーダルタイトルコンテナ
const ModalTitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: ${theme.space.lg};
`;

// モーダルタイトル
const ModalTitleText = styled.h2<{ $variant?: string }>`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.primary};
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
const TitleComponent = ({
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
  padding: 2rem;
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
  border-radius: ${theme.borders.radius.md};
  padding: ${theme.space.lg};
  width: 80%;
  height: 70%;
  overflow: hidden;
  display: ${(props) => (props.$hasImage ? "grid" : "block")};
  grid-template-columns: ${(props) => (props.$hasImage ? "0.4fr 0.6fr" : "1fr")};
  transform: scale(0.95);
  opacity: 0;
  z-index: ${theme.zIndex.max};
  animation: modalFadeIn ${theme.animation.duration.fast} ${theme.animation.easing.ease} forwards;
  
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
          border-radius: ${theme.borders.radius.xl};
        `;
      case "download":
        return css`
          background: linear-gradient(
            135deg,
            rgba(20, 20, 30, 0.98) 0%,
            rgba(30, 20, 40, 0.98) 100%
          );
          border: ${theme.borders.width.thin} solid rgba(138, 97, 255, ${theme.opacity[20]});
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, ${theme.opacity[50]}),
            0 0 120px rgba(139, 92, 246, 0.15),
            inset 0 0 60px rgba(139, 92, 246, 0.08),
            inset 0 ${theme.borders.width.thin} 0 rgba(255, 255, 255, ${theme.opacity[10]});
        `;
      default:
        return css`
          background: rgba(20, 20, 30, ${theme.opacity[95]});
          backdrop-filter: blur(20px);
          border: ${theme.borders.width.thin} solid rgba(139, 92, 246, ${theme.opacity[30]});
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, ${theme.opacity[50]}),
            0 0 100px rgba(139, 92, 246, ${theme.opacity[10]}),
            inset 0 0 50px rgba(139, 92, 246, ${theme.opacity[5]});
        `;
    }
  }}
`;
