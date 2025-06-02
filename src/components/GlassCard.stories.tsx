import type { Meta, StoryObj } from "@storybook/react";
import { GlassCard } from "./GlassCard";

const meta = {
  title: "Components/GlassCard",
  component: GlassCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof GlassCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
