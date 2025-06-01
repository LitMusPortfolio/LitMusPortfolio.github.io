import styled from "styled-components";
import { createGradient } from "@/styles/utils";
import { theme } from "../styles/theme";

interface PageTitleProps {
  children: React.ReactNode;
  gradientColors?: {
    color1: string;
    color2: string;
  };
}

const StyledPageTitle = styled.h1<{
  $gradientColors?: PageTitleProps["gradientColors"];
}>`
  font-size: clamp(${theme.typography.fontSize.xl}, 5vw, ${theme.typography.fontSize["4xl"]});
  font-weight: 800;
  text-align: center;
  margin-bottom: ${theme.space["2xl"]};
  ${({ $gradientColors }) =>
    $gradientColors
      ? createGradient($gradientColors.color1, $gradientColors.color2)
      : createGradient(theme.colors.primary.main, theme.colors.primary.light)};
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || "768px"}) {
    font-size: clamp(${theme.typography.fontSize.lg}, 4vw, ${theme.typography.fontSize["2xl"]});
    margin-bottom: ${theme.space.lg};
  }
`;

export const PageTitle: React.FC<PageTitleProps> = ({
  children,
  gradientColors,
}) => {
  return (
    <StyledPageTitle $gradientColors={gradientColors}>
      {children}
    </StyledPageTitle>
  );
};
