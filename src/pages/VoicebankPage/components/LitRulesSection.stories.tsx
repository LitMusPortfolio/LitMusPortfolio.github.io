import type { Meta, StoryObj } from "@storybook/react";
import LitRulesSection from "./LitRulesSection";

const meta = {
  title: "Pages/Voicebank/Components/LitRulesSection",
  component: LitRulesSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LitRulesSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
