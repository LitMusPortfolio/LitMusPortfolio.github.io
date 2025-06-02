import type { Meta, StoryObj } from "@storybook/react";
import App from "./App";

const meta = {
  title: "App/FullApplication",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

// ホームページ
export const HomePage: Story = {};

// 他のページのStoryは、react-router-storybookを使うか、
// もしくはページコンポーネントを直接表示するStoriesファイルを作成する方が良い
