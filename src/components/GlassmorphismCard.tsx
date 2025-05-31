import styled from "styled-components";
import { cardHoverEffect, glassmorphism } from "@/styles/utils";

interface GlassmorphismCardProps {
  children: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const StyledCard = styled.div<{ $clickable?: boolean }>`
  ${glassmorphism}
  border-radius: 16px;
  padding: 2rem;
  ${({ $clickable }) => $clickable && cardHoverEffect}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1.5rem;
  }
`;

export const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  clickable = false,
  onClick,
  className,
}) => {
  return (
    <StyledCard $clickable={clickable} onClick={onClick} className={className}>
      {children}
    </StyledCard>
  );
};
