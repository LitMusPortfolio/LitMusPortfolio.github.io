import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
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
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const About: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/about"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Works: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/works"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Voicebank: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/voicebank"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export const Contact: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/contact"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};
