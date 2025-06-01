import type { Meta, StoryObj } from "@storybook/react";
import { StyledComponents } from "./StyledComponents";

const meta = {
  title: "Components/StyledComponents",
  component: StyledComponents,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof StyledComponents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
