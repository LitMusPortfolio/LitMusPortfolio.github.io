import type { Meta, StoryObj } from "@storybook/react";
import LitDownloadSection from "./LitDownloadSection";

const meta = {
  title: "Pages/Voicebank/Components/LitDownloadSection",
  component: LitDownloadSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof LitDownloadSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
