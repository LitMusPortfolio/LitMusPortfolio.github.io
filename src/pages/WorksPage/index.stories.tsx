import type { Meta, StoryObj } from "@storybook/react";
import WorksPage from "./index";

const meta = {
  title: "Pages/Works/WorksPage",
  component: WorksPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof WorksPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
