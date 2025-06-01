import type { Meta, StoryObj } from "@storybook/react";
import Works from "./Works";

const meta = {
  title: "Pages/Works/Components/Works",
  component: Works,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Works>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
