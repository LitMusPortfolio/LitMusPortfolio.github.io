import type { Meta, StoryObj } from "@storybook/react";
import { ModalContainer } from "./ModalContent";

const meta = {
  title: "Components/ModalContainer",
  component: ModalContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ModalContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
