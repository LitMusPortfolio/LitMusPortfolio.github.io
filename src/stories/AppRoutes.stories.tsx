import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import VoicebankPage from "../pages/VoicebankPage";
import WorksPage from "../pages/WorksPage";

// 実際のルーティング構造を再現するためのコンポーネント
const AppWithRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="works" element={<WorksPage />} />
        <Route path="voicebank" element={<VoicebankPage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

const meta = {
  title: "App/Routes",
  component: AppWithRoute,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppWithRoute>;

export default meta;

type Story = StoryObj<typeof meta>;

// 各ルートのストーリー
export const Home: Story = {
  args: {
    initialPath: "/",
  },
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[args.initialPath]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const About: Story = {
  args: {
    initialPath: "/about",
  },
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[args.initialPath]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Works: Story = {
  args: {
    initialPath: "/works",
  },
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[args.initialPath]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Voicebank: Story = {
  args: {
    initialPath: "/voicebank",
  },
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[args.initialPath]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Shop: Story = {
  args: {
    initialPath: "/shop",
  },
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[args.initialPath]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};

export const Contact: Story = {
  args: {
    initialPath: "/contact",
  },
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={[args.initialPath]}>
        <Story {...args} />
      </MemoryRouter>
    ),
  ],
};
