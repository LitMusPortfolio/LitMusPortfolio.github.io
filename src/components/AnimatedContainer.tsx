import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

interface AnimatedContainerProps {
  animation?: "fadeIn" | "slideUp" | "slideIn";
  delay?: number;
  duration?: string;
}

export const AnimatedContainer = styled.div<AnimatedContainerProps>`
  animation: ${({ animation = "fadeIn" }) => {
    switch (animation) {
      case "fadeIn":
        return fadeIn;
      case "slideUp":
        return slideUp;
      case "slideIn":
        return slideIn;
      default:
        return fadeIn;
    }
  }} ${({ duration = theme.animation.duration.base }) => duration} ${theme.animation.easing.ease};
  animation-delay: ${({ delay = 0 }) => `${delay}ms`};
  animation-fill-mode: both;
`;
