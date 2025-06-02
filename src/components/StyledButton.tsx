import styled from "styled-components";
import { theme } from "../styles/theme";

interface StyledButtonProps {
  $active?: boolean;
  $underlineOnActive?: boolean;
  $variant?: "default" | "primary" | "secondary" | "ghost";
  $size?: "sm" | "md" | "lg";
}

export const StyledButton = styled.button<StyledButtonProps>`
  background: transparent;
  border: none;
  padding: ${theme.space.sm} ${theme.space.md};
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: color ${theme.animation.duration.base} ease;
  
  ${(props) =>
    props.$underlineOnActive !== false &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: -${theme.borders.width.base};
      left: 0;
      right: 0;
      height: ${theme.borders.width.base};
      background: ${theme.colors.primary.main};
      transform: scaleX(${props.$active ? 1 : 0});
      transition: transform ${theme.animation.duration.base} ease;
    }
  `}
  
  &:hover {
    color: ${theme.colors.primary.main};
  }
  
  &:focus-visible {
    outline: ${theme.borders.width.base} solid ${theme.colors.primary.main};
    outline-offset: ${theme.borders.width.base};
  }
  
  &:disabled {
    opacity: ${theme.opacity[60]};
    cursor: not-allowed;
  }
`;

// 下線なしバージョン
export const ButtonNoUnderline = styled(StyledButton)`
  &::after {
    display: none;
  }
`;

// よく使われるバリエーション
export const ButtonVariants = {
  // プライマリボタン（塗りつぶし）
  Primary: styled(StyledButton)`
    background: ${(props) =>
      props.$active ? theme.colors.primary.main : "transparent"};
    border: ${theme.borders.width.thin} solid ${theme.colors.primary.main};
    
    &:hover {
      background: ${theme.colors.primary.main};
      color: ${theme.colors.text.primary};
    }
  `,

  // ラウンドボタン
  Rounded: styled(StyledButton)`
    border-radius: ${theme.borders.radius.full};
    padding: ${theme.space.sm} ${theme.space.lg};
  `,

  // アイコン付きボタン用
  WithIcon: styled(StyledButton)`
    display: inline-flex;
    align-items: center;
    gap: ${theme.space.xs};
  `,

  // ゴーストボタン（枠線のみ）
  Ghost: styled(StyledButton)`
    background: transparent;
    border: ${theme.borders.width.thin} solid ${theme.colors.primary.main};
    
    &:hover {
      background: rgba(255, 255, 255, ${theme.opacity[5]});
      border-color: ${theme.colors.primary.main};
    }
  `,
};
