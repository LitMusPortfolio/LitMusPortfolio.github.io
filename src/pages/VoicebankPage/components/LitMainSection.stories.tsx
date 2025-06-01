import type { Meta, StoryObj } from "@storybook/react";
import LitMainSection from "./LitMainSection";

const meta = {
  title: "Pages/Voicebank/Components/LitMainSection",
  component: LitMainSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LitMainSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
