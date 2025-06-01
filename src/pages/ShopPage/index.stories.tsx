import type { Meta, StoryObj } from "@storybook/react";
import ShopPage from "./index";

const meta = {
  title: "Pages/Shop/ShopPage",
  component: ShopPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ShopPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
