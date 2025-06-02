import type { Meta, StoryObj } from "@storybook/react";
import { Route, Routes } from "react-router-dom";
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
export const AllRoutes: Story = {
  name: "All Routes (Navigate manually)",
};

// 以下は個別のルートを表示するStory（もしルーティングのテストが必要な場合）
// ただし、Storybookの制約上、これらは正しく動作しない可能性があります
export const HomeRoute: Story = {
  name: "Home (/) Route",
  parameters: {
    docs: {
      description: {
        story: "Shows the home page route. Use the navigation to test routing.",
      },
    },
  },
};

export const AboutRoute: Story = {
  name: "About Route",
  parameters: {
    docs: {
      description: {
        story:
          "Shows the about page route. Use the navigation to test routing.",
      },
    },
  },
};

export const WorksRoute: Story = {
  name: "Works Route",
  parameters: {
    docs: {
      description: {
        story:
          "Shows the works page route. Use the navigation to test routing.",
      },
    },
  },
};

export const VoicebankRoute: Story = {
  name: "Voicebank Route",
  parameters: {
    docs: {
      description: {
        story:
          "Shows the voicebank page route. Use the navigation to test routing.",
      },
    },
  },
};

export const ContactRoute: Story = {
  name: "Contact Route",
  parameters: {
    docs: {
      description: {
        story:
          "Shows the contact page route. Use the navigation to test routing.",
      },
    },
  },
};
