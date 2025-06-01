import type { Meta, StoryObj } from "@storybook/react";
import { useModalFocusManager } from "./ModalFocusManager";

const meta = {
  title: "Components/useModalFocusManager",
  component: useModalFocusManager,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof useModalFocusManager>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
