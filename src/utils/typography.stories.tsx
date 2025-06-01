import type { Meta, StoryObj } from "@storybook/react";
import { wrapAlphanumeric } from "./typography";

const meta = {
  title: "Other/wrapAlphanumeric",
  component: wrapAlphanumeric,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Child content",
    },
  },
} satisfies Meta<typeof wrapAlphanumeric>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: "2rem", color: "white" }}>Content goes here</div>
    ),
  },
};
