import type { Meta, StoryObj } from "@storybook/react";
import { TabContainer } from "./TabComponents";

const meta = {
  title: "Components/TabComponents",
  component: TabContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TabContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TabContainer>Tab content here</TabContainer>,
};
