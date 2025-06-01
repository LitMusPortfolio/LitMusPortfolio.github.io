import type { Meta, StoryObj } from "@storybook/react";
import DownloadModal from "./DownloadModal";

const meta = {
  title: "Components/DownloadModal",
  component: DownloadModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Child content",
    },
  },
} satisfies Meta<typeof DownloadModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Download Modal",
    children: (
      <div style={{ padding: "2rem", color: "white" }}>Content goes here</div>
    ),
  },
};
