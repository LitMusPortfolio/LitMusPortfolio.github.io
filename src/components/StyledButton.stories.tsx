import type { Meta, StoryObj } from "@storybook/react";
import {
  ButtonNoUnderline,
  ButtonVariants,
  StyledButton,
} from "./StyledButton";

const meta = {
  title: "Components/Common/StyledButton",
  component: StyledButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    $active: {
      control: "boolean",
      description: "アクティブ状態",
    },
    $underlineOnActive: {
      control: "boolean",
      description: "アクティブ時に下線を表示",
    },
    disabled: {
      control: "boolean",
      description: "無効状態",
    },
    children: {
      control: "text",
      description: "ボタンのテキスト",
    },
  },
} satisfies Meta<typeof StyledButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 基本的な使用例
export const Default: Story = {
  args: {
    children: "Button",
    $active: false,
    $underlineOnActive: true,
  },
};

// アクティブ状態
export const Active: Story = {
  args: {
    children: "Active Button",
    $active: true,
    $underlineOnActive: true,
  },
};

// 無効状態
export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

// 下線なし
export const NoUnderline: Story = {
  render: (args) => (
    <ButtonNoUnderline {...args}>No Underline</ButtonNoUnderline>
  ),
  args: {
    $active: true,
  },
};

// プライマリバリアント
export const PrimaryVariant: Story = {
  render: (args) => (
    <ButtonVariants.Primary {...args}>Primary Button</ButtonVariants.Primary>
  ),
  args: {
    $active: false,
  },
};

// ラウンドバリアント
export const RoundedVariant: Story = {
  render: (args) => (
    <ButtonVariants.Rounded {...args}>Rounded Button</ButtonVariants.Rounded>
  ),
  args: {
    $active: false,
  },
};

// アイコン付きバリアント
export const WithIconVariant: Story = {
  render: (args) => (
    <ButtonVariants.WithIcon {...args}>
      <span>📁</span>
      With Icon
    </ButtonVariants.WithIcon>
  ),
  args: {
    $active: false,
  },
};

// ゴーストバリアント
export const GhostVariant: Story = {
  render: (args) => (
    <ButtonVariants.Ghost {...args}>Ghost Button</ButtonVariants.Ghost>
  ),
  args: {
    $active: false,
  },
};

// タブグループとしての使用例
export const TabGroup: Story = {
  render: () => (
    <div
      style={{ display: "flex", gap: "1rem", borderBottom: "2px solid #666" }}
    >
      <StyledButton $active={true}>タブ1</StyledButton>
      <StyledButton $active={false}>タブ2</StyledButton>
      <StyledButton $active={false}>タブ3</StyledButton>
      <StyledButton $active={false} disabled>
        無効なタブ
      </StyledButton>
    </div>
  ),
};

// 様々なバリエーション
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "flex-start",
      }}
    >
      <StyledButton>Default Button</StyledButton>
      <ButtonVariants.Primary>Primary Button</ButtonVariants.Primary>
      <ButtonVariants.Ghost>Ghost Button</ButtonVariants.Ghost>
      <ButtonVariants.Rounded>Rounded Button</ButtonVariants.Rounded>
      <ButtonVariants.WithIcon>
        <span>✨</span>
        With Icon
      </ButtonVariants.WithIcon>
    </div>
  ),
};
