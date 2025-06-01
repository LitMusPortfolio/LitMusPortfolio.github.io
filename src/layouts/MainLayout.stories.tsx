import type { Meta, StoryObj } from "@storybook/react";
import MainLayout from "./MainLayout";

const meta = {
  title: "Layouts/MainLayout",
  component: MainLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MainLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
