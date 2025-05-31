import styled from "styled-components";
import { createGradient } from "@/styles/utils";

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
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  ${({ $gradientColors }) =>
    $gradientColors
      ? createGradient($gradientColors.color1, $gradientColors.color2)
      : createGradient("#8a61ff", "#87ceeb")};
  
  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || "768px"}) {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    margin-bottom: 2rem;
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
