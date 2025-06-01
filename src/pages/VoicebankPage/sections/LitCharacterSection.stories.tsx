import type { Meta, StoryObj } from "@storybook/react";
import LitCharacterSection from "./LitCharacterSection";

const meta = {
  title: "Pages/Voicebank/Components/LitCharacterSection",
  component: LitCharacterSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LitCharacterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
