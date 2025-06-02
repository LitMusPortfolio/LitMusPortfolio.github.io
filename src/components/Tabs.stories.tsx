import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabs: [
      { value: "tab1", label: "Tab 1" },
      { value: "tab2", label: "Tab 2" },
      { value: "tab3", label: "Tab 3" },
    ],
    items: [{ id: "item1" }, { id: "item2" }, { id: "item3" }],
    activeTab: "tab1",
    onTabChange: (tab: string) => console.log("Tab changed to:", tab),
    getTabValue: (item: { id?: string | number }) => item.id?.toString() || "",
    renderItem: (item: { id?: string | number }) => (
      <div>Content for {item.id}</div>
    ),
  },
};
