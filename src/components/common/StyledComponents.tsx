import styled from "styled-components";
import { theme } from "../../styles/theme";
import { cardHoverEffect, glassmorphism } from "../../styles/utils";

// グラスモーフィズムカード
export const GlassCard = styled.div`
  ${glassmorphism}
  border-radius: 12px;
  overflow: hidden;
`;

// ホバー効果付きグラスカード
export const GlassCardWithHover = styled(GlassCard)`
  ${cardHoverEffect}
`;

// レスポンシブグリッド
export const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// 中央配置コンテナ
export const CenteredContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

// セクションコンテナ
export const SectionContainer = styled.section`
  padding: 4rem 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 2rem 1rem;
  }
`;

// フレックスボックス（横並び）
export const FlexRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// フレックスボックス（縦並び）
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// ビデオレスポンシブコンテナ
export const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
  
  video,
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// モーダルオーバーレイ
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

// ボタンベーススタイル
export const BaseButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// プライマリボタン
export const PrimaryButton = styled(BaseButton)`
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: white;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(138, 97, 255, 0.3);
  }
`;

// セカンダリボタン
export const SecondaryButton = styled(BaseButton)`
  background: transparent;
  color: ${theme.colors.primary};
  border: 2px solid ${theme.colors.primary};
  
  &:hover:not(:disabled) {
    background: ${theme.colors.primary};
    color: white;
  }
`;
