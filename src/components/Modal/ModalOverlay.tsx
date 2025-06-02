import styled from "styled-components";

// モーダルオーバーレイ（背景）
export const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
  backdrop-filter: blur(10px);
`;
