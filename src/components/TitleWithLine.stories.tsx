import type { Meta, StoryObj } from "@storybook/react";
import TitleWithLine from "./TitleWithLine";

const meta = {
  title: "Components/TitleWithLine",
  component: TitleWithLine,
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
} satisfies Meta<typeof TitleWithLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: "2rem", color: "white" }}>Content goes here</div>
    ),
  },
};
