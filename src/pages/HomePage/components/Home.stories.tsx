import type { Meta, StoryObj } from "@storybook/react";
import Home from "./Home";

const meta = {
  title: "Pages/Home/Components/Home",
  component: Home,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Home>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
