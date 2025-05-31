import { useEffect, useRef } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

// モーダルのプロップス型定義
interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: string;
  title: string;
  children: React.ReactNode;
}

// モーダルオーバーレイ（背景）
const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: pointer;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

// モーダルコンテナ
const ModalContainer = styled.div`
  position: relative;
  background: rgba(20, 20, 30, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 85vh;
  overflow: hidden;
  display: flex;
  cursor: default;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 100px rgba(139, 92, 246, 0.1),
    inset 0 0 50px rgba(139, 92, 246, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-height: 90vh;
  }
`;

// 閉じるボタン
const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  background: ${theme.colors.primary.main};
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 5px 20px rgba(139, 92, 246, 0.5);
  
  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: ${theme.colors.primary.dark};
  }
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
  }
`;

// 左側の画像エリア
const ModalImageSection = styled.div`
  flex: 0 0 350px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.1),
    rgba(92, 246, 246, 0.1)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(139, 92, 246, 0.1) 0%,
      transparent 70%
    );
    animation: rotate 20s linear infinite;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  img {
    position: relative;
    width: 80%;
    height: 80%;
    object-fit: contain;
    z-index: 1;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 200px;
  }
`;

// デフォルト画像（画像がない場合）
const DefaultImage = styled.div`
  width: 200px;
  height: 200px;
  background: linear-gradient(
    135deg,
    ${theme.colors.primary.main},
    ${theme.colors.primary.light}
  );
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
  font-weight: bold;
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3);
`;

// 右側のコンテンツエリア
const ModalContent = styled.div`
  flex: 1;
  padding: 3rem;
  overflow-y: auto;
  
  /* カスタムスクロールバー */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 4px;
    
    &:hover {
      background: rgba(139, 92, 246, 0.7);
    }
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

// モーダルタイトル
const ModalTitle = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.primary.main};
  text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export default function DownloadModal({
  isOpen,
  onClose,
  image,
  title,
  children,
}: DownloadModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESCキーで閉じる
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      // モーダルが開いているときはbodyのスクロールを無効化
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // オーバーレイクリックで閉じる
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // モーダルコンテナクリックでイベント伝播を停止
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalOverlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef} onClick={handleContainerClick}>
        <CloseButton onClick={onClose} aria-label="閉じる">
          ×
        </CloseButton>

        <ModalImageSection>
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <DefaultImage>{title.charAt(0)}</DefaultImage>
          )}
        </ModalImageSection>

        <ModalContent>
          <ModalTitle>{title}</ModalTitle>
          {children}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}
