import type { Meta, StoryObj } from "@storybook/react";
import AboutPage from "./index";

const meta = {
  title: "Pages/About/AboutPage",
  component: AboutPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AboutPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
