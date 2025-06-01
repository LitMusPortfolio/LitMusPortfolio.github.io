import type { Meta, StoryObj } from "@storybook/react";
import VoicebankPage from "./index";

const meta = {
  title: "Pages/Voicebank/VoicebankPage",
  component: VoicebankPage,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof VoicebankPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
