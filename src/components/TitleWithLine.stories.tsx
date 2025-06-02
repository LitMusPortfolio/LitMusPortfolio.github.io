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
    title: {
      control: { type: "text" },
      description: "Title",
    },
  },
} satisfies Meta<typeof TitleWithLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
  },
};
