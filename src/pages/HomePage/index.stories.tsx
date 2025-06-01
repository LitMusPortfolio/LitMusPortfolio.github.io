import type { Meta, StoryObj } from "@storybook/react";
import HomePage from "./index";

const meta = {
  title: "Pages/Home/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
