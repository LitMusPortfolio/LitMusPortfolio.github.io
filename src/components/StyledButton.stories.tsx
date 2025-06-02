import type { Meta, StoryObj } from "@storybook/react";
import { ButtonNoUnderline, StyledButton } from "./StyledButton";

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
