import type { Meta, StoryObj } from "@storybook/react";
import LazyImage from "./LazyImage";

const meta = {
  title: "Components/LazyImage",
  component: LazyImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LazyImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
