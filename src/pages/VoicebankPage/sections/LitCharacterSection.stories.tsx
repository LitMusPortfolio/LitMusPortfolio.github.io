import type { Meta, StoryObj } from "@storybook/react";
import { CHARACTER_PRESETS } from "../config/characterConfig";
import LitCharacterSection from "./LitCharacterSection";

const meta = {
  title: "Pages/Voicebank/Components/LitCharacterSection",
  component: LitCharacterSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
キャラクターセクションコンポーネント。

## サイズ調整システム

### プリセットサイズ
- **default**: 標準サイズ（高さ95%、最大幅600px、スペーサー40%）
- **large**: 大きめ（高さ100%、最大幅700px、スペーサー45%）
- **small**: 小さめ（高さ85%、最大幅500px、スペーサー35%）
- **compact**: コンパクト（高さ80%、最大幅450px、スペーサー30%、モバイル表示対応）

### カスタマイズ方法
\`\`\`tsx
// プリセットを使用
<LitCharacterSection sizePreset="large" />

// カスタム設定で上書き
<LitCharacterSection 
  sizePreset="default"
  customConfig={{
    desktop: { height: "90%", maxWidth: "550px" }
  }}
/>
\`\`\`

### レスポンシブ対応
- デスクトップ・タブレット・モバイルで異なるサイズ設定
- LeftSpacerとキャラクター画像サイズが連動
- スムーズなトランジション効果
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    sizePreset: {
      control: { type: "select" },
      options: Object.keys(CHARACTER_PRESETS),
      description: "プリセットサイズ設定",
      table: {
        defaultValue: { summary: "default" },
      },
    },
    customConfig: {
      control: { type: "object" },
      description: "カスタムサイズ設定（プリセットを上書き）",
    },
  },
} satisfies Meta<typeof LitCharacterSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sizePreset: "default",
  },
};

export const Large: Story = {
  args: {
    sizePreset: "large",
  },
  parameters: {
    docs: {
      description: {
        story: "大きめサイズのプリセット。画面を最大限活用して表示。",
      },
    },
  },
};

export const Small: Story = {
  args: {
    sizePreset: "small",
  },
  parameters: {
    docs: {
      description: {
        story: "小さめサイズのプリセット。コンテンツとのバランスを重視。",
      },
    },
  },
};

export const Compact: Story = {
  args: {
    sizePreset: "compact",
  },
  parameters: {
    docs: {
      description: {
        story: "コンパクトサイズ。モバイルでも表示される設定。",
      },
    },
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const CustomSize: Story = {
  args: {
    sizePreset: "default",
    customConfig: {
      desktop: {
        height: "90%",
        maxWidth: "550px",
        spacerWidth: "38%",
      },
      tablet: {
        height: "80%",
        maxWidth: "380px",
        spacerWidth: "33%",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "カスタム設定でサイズを細かく調整した例。",
      },
    },
  },
};

export const WithDifferentPosition: Story = {
  args: {
    sizePreset: "default",
    customConfig: {
      desktop: {
        height: "95%",
        maxWidth: "600px",
        spacerWidth: "40%",
        imagePosition: "center bottom",
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: "画像の位置を変更した例。`object-position`を調整。",
      },
    },
  },
};

export const ResponsiveComparison: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ color: "white", marginBottom: "1rem" }}>Desktop View</h3>
        <div style={{ height: "600px", position: "relative" }}>
          <LitCharacterSection sizePreset="default" />
        </div>
      </div>
      <div>
        <h3 style={{ color: "white", marginBottom: "1rem" }}>Tablet View</h3>
        <div
          style={{ maxWidth: "768px", height: "500px", position: "relative" }}
        >
          <LitCharacterSection sizePreset="default" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "デスクトップとタブレットでのレスポンシブ表示の比較。",
      },
    },
  },
};
