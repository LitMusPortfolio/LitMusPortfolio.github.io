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
  width: 50px;
  height: 50px;
  border: 3px solid rgba(139, 92, 246, 0.2);
  border-radius: 50%;
  border-top-color: ${theme.colors.primary.main};
  animation: ${spin} 1s ease-in-out infinite;
`;

export default function LoadingSpinner() {
  return (
    <LoadingContainer>
      <Spinner />
    </LoadingContainer>
  );
}
