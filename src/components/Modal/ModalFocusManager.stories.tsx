import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useModalFocusManager } from "./ModalFocusManager";

// デモ用のモーダルコンポーネント
const DemoModal = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const DemoButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  
  &:hover {
    background: #f0f0f0;
  }
`;

// デモコンポーネント
const ModalFocusManagerDemo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setIsOpen(false);

  useModalFocusManager({
    isOpen,
    modalRef: modalRef as React.RefObject<HTMLDivElement>,
    onClose: handleClose,
  });

  return (
    <>
      <DemoButton onClick={() => setIsOpen(true)}>Open Modal</DemoButton>
      <Overlay isOpen={isOpen} onClick={handleClose} />
      <DemoModal ref={modalRef} isOpen={isOpen}>
        <h2>Modal with Focus Management</h2>
        <p>This modal demonstrates focus management features:</p>
        <ul>
          <li>Focus moves to the modal when opened</li>
          <li>Tab key cycles through focusable elements</li>
          <li>ESC key closes the modal</li>
          <li>Focus returns to the trigger button when closed</li>
        </ul>
        <div>
          <DemoButton>First Button</DemoButton>
          <DemoButton>Second Button</DemoButton>
          <DemoButton onClick={handleClose}>Close Modal</DemoButton>
        </div>
      </DemoModal>
    </>
  );
};

const meta = {
  title: "Components/useModalFocusManager",
  component: ModalFocusManagerDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ModalFocusManagerDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
