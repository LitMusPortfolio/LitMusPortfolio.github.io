import type { Meta, StoryObj } from "@storybook/react";
import ContactPage from "./index";

const meta = {
  title: "Pages/Contact/ContactPage",
  component: ContactPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ContactPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
