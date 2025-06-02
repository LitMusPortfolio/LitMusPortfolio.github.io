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

export const Default: Story = {
  args: {
    item: {
      id: 1,
      type: "talk",
      category: "トークソフト",
      name: "UTAUインストーラー",
      description: "UTAU音声合成ソフトウェアの最新版インストーラー",
      image: "/101_Lit/LitA_差し替え前提.webp",
    },
    onClick: () => console.log("Download card clicked"),
  },
};
