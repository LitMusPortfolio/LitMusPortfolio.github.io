import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import Grid from "./Grid";

// サンプルアイテムの型定義
interface SampleItem {
  id: number;
  title: string;
  color: string;
  height: number;
}

// サンプルカードコンポーネント
const SampleCard = styled.div<{ $color: string; $height: number }>`
  background: ${({ $color }) => $color};
  height: ${({ $height }) => $height}px;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// サンプルデータ
const sampleItems: SampleItem[] = [
  { id: 1, title: "Item 1", color: "#6B46C1", height: 200 },
  { id: 2, title: "Item 2", color: "#8B5CF6", height: 250 },
  { id: 3, title: "Item 3", color: "#A78BFA", height: 180 },
  { id: 4, title: "Item 4", color: "#C4B5FD", height: 220 },
  { id: 5, title: "Item 5", color: "#6B46C1", height: 200 },
  { id: 6, title: "Item 6", color: "#8B5CF6", height: 260 },
];

const meta = {
  title: "Components/Grid",
  component: Grid<SampleItem>,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    items: {
      description: "表示するアイテムの配列",
    },
    renderItem: {
      description: "各アイテムをレンダリングする関数",
    },
    keyExtractor: {
      description: "各アイテムのキーを生成する関数",
    },
    columns: {
      description: "グリッドの列設定",
      control: { type: "object" },
    },
    gap: {
      description: "グリッドアイテム間の間隔",
      control: { type: "object" },
    },
  },
} satisfies Meta<typeof Grid<SampleItem>>;

export default meta;

type Story = StoryObj<typeof meta>;

// デフォルトのグリッド表示
export const Default: Story = {
  args: {
    items: sampleItems,
    renderItem: (item) => (
      <SampleCard $color={item.color} $height={item.height}>
        {item.title}
      </SampleCard>
    ),
    keyExtractor: (item) => item.id,
  },
};

// カスタム列設定
export const CustomColumns: Story = {
  args: {
    items: sampleItems,
    renderItem: (item) => (
      <SampleCard $color={item.color} $height={item.height}>
        {item.title}
      </SampleCard>
    ),
    keyExtractor: (item) => item.id,
    columns: {
      default: "repeat(3, 1fr)",
      mobile: "1fr",
    },
  },
};

// カスタム間隔
export const CustomGap: Story = {
  args: {
    items: sampleItems,
    renderItem: (item) => (
      <SampleCard $color={item.color} $height={item.height}>
        {item.title}
      </SampleCard>
    ),
    keyExtractor: (item) => item.id,
    gap: {
      default: "3rem",
      mobile: "1rem",
    },
  },
};

// 小さいカード用のグリッド
export const SmallCards: Story = {
  args: {
    items: sampleItems,
    renderItem: (item) => (
      <SampleCard $color={item.color} $height={100}>
        {item.title}
      </SampleCard>
    ),
    keyExtractor: (item) => item.id,
    columns: {
      default: "repeat(auto-fill, minmax(150px, 1fr))",
      mobile: "repeat(2, 1fr)",
    },
    gap: {
      default: "1rem",
      mobile: "0.5rem",
    },
  },
};

// 空の状態
export const EmptyState: Story = {
  args: {
    items: [],
    renderItem: () => <div>No items</div>,
  },
};

// 実際のWorksページのような使用例
const WorkCard = styled.article`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  padding: 1.5rem;
  min-height: 250px;
`;

interface WorkItem {
  id: string;
  title: string;
  category: string;
}

const workItems: WorkItem[] = [
  { id: "1", title: "Project Alpha", category: "Music" },
  { id: "2", title: "Design Beta", category: "Illustration" },
  { id: "3", title: "Video Gamma", category: "Movie" },
  { id: "4", title: "Sound Delta", category: "Music" },
];

// WorksExampleは独自のmetaを使用
const worksExampleMeta: Meta<typeof Grid<WorkItem>> = {
  title: "Components/Grid",
  component: Grid<WorkItem>,
  parameters: {
    layout: "padded",
  },
};

export const WorksExample: StoryObj<typeof worksExampleMeta> = {
  args: {
    items: workItems,
    renderItem: (item: WorkItem) => (
      <WorkCard>
        <h3>{item.title}</h3>
        <p>{item.category}</p>
      </WorkCard>
    ),
    keyExtractor: (item: WorkItem) => item.id,
    id: "works-grid",
    role: "tabpanel",
    "aria-label": "Works grid",
  },
};
