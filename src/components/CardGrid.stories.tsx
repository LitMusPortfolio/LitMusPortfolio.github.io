import type { Meta, StoryObj } from "@storybook/react";
import { Tab } from "./CardGrid";

const meta = {
  title: "Components/Tab",
  component: Tab,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    $active: false,
    children: "Tab Label",
  },
};
