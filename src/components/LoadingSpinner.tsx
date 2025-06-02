import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.colors.purple[600]};
`;

const Spinner = styled.div`
  width: ${theme.sizes.button.lg};
  height: ${theme.sizes.button.lg};
  border: ${theme.borders.width.thick} solid ${`rgba(139, 92, 246, ${theme.opacity[20]})`};
  border-radius: ${theme.borders.radius.circle};
  border-top-color: ${theme.colors.primary.main};
  animation: ${spin} ${theme.animation.duration.slow} ${theme.animation.easing.easeInOut} infinite;
`;

export default function LoadingSpinner() {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
}
