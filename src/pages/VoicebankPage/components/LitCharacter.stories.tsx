import type { Meta, StoryObj } from "@storybook/react";
import LitCharacter from "./LitCharacter";

const meta = {
  title: "Pages/Voicebank/Components/LitCharacter",
  component: LitCharacter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LitCharacter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
