import { css } from "styled-components";

// グラスモーフィズム効果
export const glassmorphism = css`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
