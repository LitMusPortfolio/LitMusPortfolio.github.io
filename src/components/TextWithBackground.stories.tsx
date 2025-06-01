import type { Meta, StoryObj } from "@storybook/react";
import TextWithBackground from "./TextWithBackground";

const meta = {
  title: "Components/TextWithBackground",
  component: TextWithBackground,
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
} satisfies Meta<typeof TextWithBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: "2rem", color: "white" }}>Content goes here</div>
    ),
  },
};
