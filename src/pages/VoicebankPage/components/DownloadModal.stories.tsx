import type { Meta, StoryObj } from "@storybook/react";
import DownloadModal from "./DownloadModal";

const meta = {
  title: "Pages/Voicebank/Components/DownloadModal",
  component: DownloadModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Whether the modal is open",
    },
    title: {
      control: "text",
      description: "Modal title",
    },
    image: {
      control: "text",
      description: "Image URL for the modal",
    },
  },
} satisfies Meta<typeof DownloadModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Download Modal",
    children: (
      <div style={{ padding: "2rem", color: "white" }}>
        <p>This is a simple download modal with custom content.</p>
        <button
          type="button"
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Download
        </button>
      </div>
    ),
  },
};

export const Structured: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "VOICEVOX 離途",
    image: "/101_Lit/LitA_差し替え前提.webp",
    content: {
      description: [
        "無料で使える中品質なテキスト読み上げソフトウェア",
        "商用・非商用問わず利用可能です。",
        "豊富な音声パラメータで感情表現が可能",
        "※ 音声の二次利用は禁止されています",
        "※ クレジット表記が必要です",
        "※ 個人利用・商用利用ともに無料",
      ],
      links: [
        {
          text: "ダウンロード (Windows版)",
          url: "#",
          primary: true,
        },
        {
          text: "ダウンロード (Mac版)",
          url: "#",
          primary: false,
        },
        {
          text: "利用規約を確認する",
          url: "#",
          primary: false,
        },
      ],
    },
  },
};

export const WithCustomImage: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Custom Image Modal",
    image: "/001_top/nameBG.webp",
    children: (
      <div style={{ padding: "2rem", color: "white" }}>
        <p>This modal has a custom image.</p>
      </div>
    ),
  },
};

export const WithDefaultImage: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: "Default Image Modal",
    children: (
      <div style={{ padding: "2rem", color: "white" }}>
        <p>This modal uses the default placeholder image.</p>
      </div>
    ),
  },
};
