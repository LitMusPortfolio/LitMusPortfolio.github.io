import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import { glassmorphism } from "@/styles/utils";

// モーダルコンテナ
export const ModalContainer = styled.div<{
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
          backdrop-filter: blur(30px) saturate(150%);
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
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    max-height: 95vh;
  }
`;

// 閉じるボタン
export const CloseButton = styled.button<{ $variant?: string }>`
  position: absolute;
  top: ${(props) => (props.$variant === "download" ? "-20px" : "1.5rem")};
  right: ${(props) => (props.$variant === "download" ? "-20px" : "1.5rem")};
  width: ${(props) => (props.$variant === "download" ? "45px" : "40px")};
  height: ${(props) => (props.$variant === "download" ? "45px" : "40px")};
  background: ${(props) =>
    props.$variant === "download"
      ? "linear-gradient(135deg, rgba(139, 92, 246, 0.9), rgba(92, 107, 192, 0.9))"
      : "rgba(139, 92, 246, 0.2)"};
  border: ${(props) =>
    props.$variant === "download"
      ? "2px solid rgba(255, 255, 255, 0.2)"
      : "1px solid rgba(139, 92, 246, 0.4)"};
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: ${(props) =>
    props.$variant === "download"
      ? "0 4px 20px rgba(139, 92, 246, 0.4)"
      : "none"};
  
  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: ${theme.colors.primary.main};
    border-color: ${theme.colors.primary.light};
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.6);
  }
  
  &:active {
    transform: rotate(90deg) scale(1.05);
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
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem;
  }
`;

// モーダルタイトル
export const ModalTitle = styled.h3<{ $variant?: string }>`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: ${(props) =>
    props.$variant === "download"
      ? `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.light})`
      : theme.colors.primary.main};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  letter-spacing: -0.02em;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${theme.colors.primary.main}, transparent);
    border-radius: 2px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
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
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex: 0 0 200px;
  }
`;
