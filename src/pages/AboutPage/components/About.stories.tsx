import type { Meta, StoryObj } from "@storybook/react";
import About from "./About";

const meta = {
  title: "Pages/About/Components/About",
  component: About,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof About>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
