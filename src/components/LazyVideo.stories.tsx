import type { Meta, StoryObj } from "@storybook/react";
import LazyVideo from "./LazyVideo";

const meta = {
  title: "Components/LazyVideo",
  component: LazyVideo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LazyVideo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
