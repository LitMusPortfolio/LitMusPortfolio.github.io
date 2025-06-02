import styled from "styled-components";
import { theme } from "@/styles/theme";

export const GlassCard = styled.div`
  ${theme.effects.glassmorphism}
  padding: ${theme.space.lg};
  border-radius: ${theme.borders.radius.lg};
  transition: transform ${theme.animation.duration.base} ${theme.animation.easing.ease};
  
  &:hover {
    transform: translateY(-4px);
  }
`;
