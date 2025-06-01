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

export const Default: Story = {
  args: {
    item: {
      id: 1,
      type: "talk",
      category: "トークソフト",
      name: "VOICEVOX 離途",
      description: "無料で使える中品質なテキスト読み上げソフトウェア",
      status: "free",
      links: {
        primary: { text: "ダウンロード", url: "#" },
      },
    },
  },
};
