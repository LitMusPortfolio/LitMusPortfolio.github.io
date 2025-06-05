import type React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

// 基本セクションコンポーネント
export const Section = styled.section`
  min-height: 100vh;
  padding: ${theme.space["2xl"]} 0;
  position: relative;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

// コンテナコンポーネント
export const Container = styled.div`
  margin: 0 auto;
  padding: 2% 4%;
  width: 85%;
  position: relative;
  z-index: ${theme.zIndex.content};
`;

// サイドデコレーションコンポーネント
export const SideDecoration: React.FC<{ svgPath?: string }> = ({ svgPath }) => {
  if (!svgPath) return null;

  return (
    <>
      {/* 右側に配置 - 下半分を表示 */}
      <div
        style={{
          position: "fixed",
          right: "-20vw",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          width: "40vw",
          height: "15vh",
          zIndex: -200,
          pointerEvents: "none",
        }}
      >
        <img
          src={svgPath}
          alt=""
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "100%",
            width: "auto",
            opacity: 0.8,
            clipPath: "inset(0 0 50% 0)", // 上半分をクリップ（下半分を表示）
          }}
        />
      </div>

      {/* 左側に配置 - 上半分を表示 */}
      <div
        style={{
          position: "fixed",
          left: "-20vw",
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          width: "40vw",
          height: "15vh",
          zIndex: -50,
          pointerEvents: "none",
        }}
      >
        <img
          src={svgPath}
          alt=""
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            height: "100%",
            width: "auto",
            opacity: 0.8,
            clipPath: "inset(50% 0 0 0)", // 下半分をクリップ（上半分を表示）
          }}
        />
      </div>
    </>
  );
};

// グリッドコンテナ
interface GridContainerProps {
  $columns?: string;
  $gap?: string;
  $mobileColumns?: string;
}

export const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns || "1fr"};
  gap: ${(props) => props.$gap || `${theme.space.lg}`};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: ${(props) => props.$mobileColumns || "1fr"};
  }
`;
