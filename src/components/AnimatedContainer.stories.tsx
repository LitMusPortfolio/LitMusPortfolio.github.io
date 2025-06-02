import type { Meta, StoryObj } from "@storybook/react";
import { AnimatedContainer } from "./AnimatedContainer";

const meta = {
  title: "Components/AnimatedContainer",
  component: AnimatedContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
