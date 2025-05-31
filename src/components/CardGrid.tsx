import type { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

// カードグリッドコンテナ
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

// カード基本スタイル
export const Card = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
  }
`;

// カードヘッダー（オプション）
export const CardHeader = styled.div`
  padding: 1.5rem;
  background: rgba(139, 92, 246, 0.1);
  border-bottom: 1px solid rgba(139, 92, 246, 0.3);
`;

// カードタイプ/カテゴリータグ
export const CardTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: ${theme.colors.primary.main};
  color: white;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

// カード画像
export const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

// カード情報セクション
export const CardInfo = styled.div`
  padding: 1.5rem;
`;

// カードタイトル
export const CardTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text.primary};
`;

// カード説明文
export const CardDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
`;

// カードオーバーレイ
export const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${Card}:hover & {
    opacity: 1;
  }
  
  span {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${theme.colors.primary.main};
  }
`;

// モーダルコンポーネント
export const Modal = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
  z-index: 1000;
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const ModalContent = styled.div`
  background: ${theme.colors.background.dark};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: 20px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  position: relative;
  display: flex;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    opacity: 1;
    transform: rotate(90deg);
  }
`;

// タブコンポーネント
export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

export const Tab = styled.button<{ $active: boolean }>`
  padding: 0.8rem 2rem;
  background: ${(props) => (props.$active ? "rgba(139, 92, 246, 0.2)" : "transparent")};
  border: 2px solid ${(props) => (props.$active ? theme.colors.primary.main : "rgba(255, 255, 255, 0.2)")};
  border-radius: 30px;
  color: ${(props) => (props.$active ? theme.colors.primary.main : "#fff")};
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: ${theme.colors.primary.main};
  }
`;

// Props定義
interface CardGridLayoutProps {
  children: ReactNode;
  title: string;
  sideDecorationSrc?: string;
}

// レイアウトコンポーネント
export function CardGridLayout({
  children,
  title,
  sideDecorationSrc,
}: CardGridLayoutProps) {
  return (
    <Section>
      {sideDecorationSrc && (
        <SideDecoration>
          <img src={sideDecorationSrc} alt={title} />
        </SideDecoration>
      )}
      <Container>
        <SectionTitle>{title}</SectionTitle>
        {children}
      </Container>
    </Section>
  );
}

// レイアウト用スタイル
const Section = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  margin-bottom: 4rem;
  text-align: center;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SideDecoration = styled.div`
  position: absolute;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  img {
    height: 200px;
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;
