import styled from "styled-components";
import { theme } from "../../styles/theme";

interface StyledButtonProps {
  $active?: boolean;
  $underlineOnActive?: boolean;
  $variant?: "default" | "primary" | "secondary" | "ghost";
  $size?: "sm" | "md" | "lg";
}

export const StyledButton = styled.button<StyledButtonProps>`
  font-family: ${theme.typography.body.fontFamily};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.body.fontWeight};
  color: ${(props) =>
    props.$active ? theme.colors.primary : theme.colors.text.primary};
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
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${theme.colors.primary};
      transform: scaleX(${props.$active ? 1 : 0});
      transition: transform ${theme.animation.duration.base} ease;
    }
  `}
  
  &:hover {
    color: ${theme.colors.primary};
  }
  
  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
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
      props.$active ? theme.colors.primary : "transparent"};
    color: ${(props) => (props.$active ? "#fff" : theme.colors.text.primary)};
    border: 1px solid ${theme.colors.primary};
    
    &:hover {
      background: ${theme.colors.primary};
      color: #fff;
    }
  `,

  // ラウンドボタン
  Rounded: styled(StyledButton)`
    border-radius: 9999px;
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
    border: 1px solid ${theme.colors.primary};
    
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: ${theme.colors.primary};
    }
  `,
};
