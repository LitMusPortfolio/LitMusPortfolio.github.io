import type { Meta, StoryObj } from "@storybook/react";
import ScrollToTop from "./ScrollToTop";

const meta = {
  title: "Components/ScrollToTop",
  component: ScrollToTop,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ScrollToTop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
