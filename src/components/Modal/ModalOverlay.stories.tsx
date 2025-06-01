import type { Meta, StoryObj } from "@storybook/react";
import { ModalOverlay } from "./ModalOverlay";

const meta = {
  title: "Components/ModalOverlay",
  component: ModalOverlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ModalOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
