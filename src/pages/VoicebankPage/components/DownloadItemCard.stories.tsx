import type { Meta, StoryObj } from "@storybook/react";
import DownloadItemCard from "./DownloadItemCard";

const meta = {
  title: "Pages/Voicebank/Components/DownloadItemCard",
  component: DownloadItemCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DownloadItemCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
