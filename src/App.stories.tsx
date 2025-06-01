import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

const meta = {
  title: "App/FullApplication",
  component: App,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

// ホームページ
export const HomePage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// Aboutページ
export const AboutPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/about"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// Worksページ
export const WorksPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/works"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// Voicebankページ（離途）
export const VoicebankPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/voicebank"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// Shopページ
export const ShopPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/shop"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

// Contactページ
export const ContactPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/contact"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};
