import type { Meta, StoryObj } from "@storybook/react";
import { StyledHeading, wrapAlphanumeric } from "./typography";

// wrapAlphanumeric is a function, not a component, so we'll create a wrapper
const WrapAlphanumericDemo = ({ text }: { text: string }) => {
  return (
    <div style={{ padding: "2rem", color: "white", fontSize: "1.5rem" }}>
      {wrapAlphanumeric(text)}
    </div>
  );
};

const meta = {
  title: "Utils/Typography",
  component: WrapAlphanumericDemo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof WrapAlphanumericDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WrapAlphanumeric: Story = {
  args: {
    text: "これはABC123テストです。English text and 日本語 mixed together!",
  },
};

export const StyledHeadingExample: StoryObj<typeof StyledHeading> = {
  render: (args) => <StyledHeading {...args} />,
  args: {
    level: 2,
    children: "This is a HEADING テスト123",
  },
};
