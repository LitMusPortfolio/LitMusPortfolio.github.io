import styled from "styled-components";
import { theme } from "@/styles/theme";

// 基本セクションコンポーネント
export const Section = styled.section`
  min-height: 100vh;
  padding: 4rem 0;
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

// コンテナコンポーネント
export const Container = styled.div`
  margin: 0 auto;
  padding: 2% 4%;
  position: relative;
  z-index: 1;
`;

// サイドデコレーションコンポーネント
interface SideDecorationProps {
  $side?: "left" | "right";
}

export const SideDecoration = styled.div<SideDecorationProps>`
  position: absolute;
  ${(props) => (props.$side === "right" ? "right" : "left")}: -100px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  img {
    height: 200px;
    opacity: 0.3;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

// グリッドコンテナ
interface GridContainerProps {
  $columns?: string;
  $gap?: string;
  $mobileColumns?: string;
}

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns || "1fr"};
  gap: ${(props) => props.$gap || "2rem"};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: ${(props) => props.$mobileColumns || "1fr"};
  }
`;

// コンテンツコンテナ
export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 2rem;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    align-items: center;
  }
`;
