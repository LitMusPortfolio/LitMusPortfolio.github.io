import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FilterTabs, { type TabItem } from "./FilterTabs";

const meta = {
  title: "Components/FilterTabs",
  component: FilterTabs,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    tabs: {
      description: "タブのデータ配列",
    },
    activeTab: {
      description: "現在アクティブなタブのID",
    },
    onTabChange: {
      description: "タブが変更されたときのコールバック",
    },
    ariaLabel: {
      description: "タブリストのアクセシビリティラベル",
    },
    ariaControls: {
      description: "タブがコントロールする要素のID",
    },
  },
} satisfies Meta<typeof FilterTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

// 基本的な使用例
const BasicTabs: TabItem[] = [
  { id: "all", label: "すべて" },
  { id: "active", label: "アクティブ" },
  { id: "completed", label: "完了" },
];

export const Default: Story = {
  args: {
    tabs: BasicTabs,
    activeTab: "all",
    onTabChange: () => {},
    ariaLabel: "フィルターオプション",
  },
  render: function Render(args) {
    const [activeTab, setActiveTab] = useState(args.activeTab);

    return (
      <FilterTabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />
    );
  },
};

// Worksページで使用されているタブ
const WorkTabs: TabItem[] = [
  { id: "all", label: "ALL" },
  { id: "music", label: "MUSIC" },
  { id: "illustration", label: "ILLUST" },
  { id: "movie", label: "MOVIE" },
  { id: "other", label: "OTHER" },
];

export const WorksExample: Story = {
  args: {
    tabs: WorkTabs,
    activeTab: "all",
    onTabChange: () => {},
    ariaLabel: "Filter works by category",
    ariaControls: "works-grid",
  },
  render: function Render(args) {
    const [activeTab, setActiveTab] = useState(args.activeTab);

    return (
      <FilterTabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />
    );
  },
};

// ダウンロードページで使用されているタブ
const DownloadTabs: TabItem[] = [
  { id: "all", label: "ALL" },
  { id: "voicebank", label: "VOICEBANK" },
  { id: "resource", label: "RESOURCE" },
  { id: "other", label: "OTHER" },
];

export const DownloadExample: Story = {
  args: {
    tabs: DownloadTabs,
    activeTab: "all",
    onTabChange: () => {},
    ariaLabel: "Filter downloads by category",
  },
  render: function Render(args) {
    const [activeTab, setActiveTab] = useState(args.activeTab);

    return (
      <FilterTabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />
    );
  },
};

// 2つのタブのみ
const MinimalTabs: TabItem[] = [
  { id: "option1", label: "オプション1" },
  { id: "option2", label: "オプション2" },
];

export const Minimal: Story = {
  args: {
    tabs: MinimalTabs,
    activeTab: "option1",
    onTabChange: () => {},
  },
  render: function Render(args) {
    const [activeTab, setActiveTab] = useState(args.activeTab);

    return (
      <FilterTabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />
    );
  },
};

// 多数のタブ（レスポンシブ確認用）
const ManyTabs: TabItem[] = [
  { id: "tab1", label: "タブ1" },
  { id: "tab2", label: "タブ2" },
  { id: "tab3", label: "タブ3" },
  { id: "tab4", label: "タブ4" },
  { id: "tab5", label: "タブ5" },
  { id: "tab6", label: "タブ6" },
  { id: "tab7", label: "タブ7" },
  { id: "tab8", label: "タブ8" },
];

export const ManyTabsExample: Story = {
  args: {
    tabs: ManyTabs,
    activeTab: "tab1",
    onTabChange: () => {},
    ariaLabel: "多数のタブの例",
  },
  render: function Render(args) {
    const [activeTab, setActiveTab] = useState(args.activeTab);

    return (
      <FilterTabs {...args} activeTab={activeTab} onTabChange={setActiveTab} />
    );
  },
};
