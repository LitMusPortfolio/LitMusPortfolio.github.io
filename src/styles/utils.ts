import { css } from "styled-components";

// グラデーション生成関数
export const createGradient = (
  color1: string,
  color2: string,
  angle = 45,
) => css`
  background: linear-gradient(${angle}deg, ${color1}, ${color2});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

// グラスモーフィズム効果
export const glassmorphism = css`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// ホバー効果
export const hoverEffect = css`
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(138, 97, 255, 0.3);
  }
`;

// カードホバー効果
export const cardHoverEffect = css`
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(138, 97, 255, 0.4);
    border-color: rgba(138, 97, 255, 0.5);
  }
`;

// レスポンシブヘルパー
export const responsive = {
  mobile: (content: string) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      ${content}
    }
  `,
  tablet: (content: string) => css`
    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      ${content}
    }
  `,
};

// フェードインアニメーション
export const fadeInAnimation = css`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.8s ease-out forwards;
  
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// セクションの共通スタイル
export const sectionStyle = css`
  min-height: 100vh;
  padding: 8rem 2rem 4rem;
  position: relative;
  
  ${responsive.mobile(`
    padding: 6rem 1rem 3rem;
  `)}
`;

// コンテナの共通スタイル
export const containerStyle = (maxWidth = "1200px") => css`
  max-width: ${maxWidth};
  margin: 0 auto;
  width: 100%;
`;
