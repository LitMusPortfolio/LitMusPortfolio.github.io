import styled from "styled-components";

// モーダルオーバーレイ（背景）
export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, ${({ theme }) => theme.opacity[80]});
  backdrop-filter: blur(10px);
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.lg};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
  transition: opacity ${({ theme }) => theme.animation.duration.fast} ${({ theme }) => theme.animation.easing.ease}, visibility ${({ theme }) => theme.animation.duration.fast} ${({ theme }) => theme.animation.easing.ease};
`;
