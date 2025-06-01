import type { Meta, StoryObj } from "@storybook/react";
import { ModalContent } from "./LitDownloadModal";

const meta = {
  title: "Pages/Voicebank/Components/ModalContent",
  component: ModalContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ModalContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
