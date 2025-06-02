import type { Meta, StoryObj } from "@storybook/react";
import { BackgroundSection } from "./BackgroundSection";

const meta = {
  title: "Components/BackgroundSection",
  component: BackgroundSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof BackgroundSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
