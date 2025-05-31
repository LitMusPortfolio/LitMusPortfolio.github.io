import styled from "styled-components";

// 基本セクションコンポーネント
export const Section = styled.section`
  min-height: 100vh;
  padding: ${(props) => props.theme.spacing?.sectionPadding || "8rem 2rem"};
  position: relative;
`;

// コンテナコンポーネント
export const Container = styled.div`
  max-width: ${(props) => props.theme.spacing?.containerMaxWidth || "1400px"};
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
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
  
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "768px"}) {
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
  
  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "968px"}) {
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
  
  @media (max-width: ${(props) => props.theme.breakpoints?.tablet || "968px"}) {
    align-items: center;
  }
`;
