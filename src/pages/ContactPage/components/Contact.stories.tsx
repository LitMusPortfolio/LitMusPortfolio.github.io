import type { Meta, StoryObj } from "@storybook/react";
import Contact from "./Contact";

const meta = {
  title: "Pages/Contact/Components/Contact",
  component: Contact,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Contact>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
