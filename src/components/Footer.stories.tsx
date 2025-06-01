import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./Footer";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    // storycapで複数のビューポートでスクリーンショットを撮る
    viewport: {
      viewports: ["mobile375", "tablet768", "desktop1280", "desktop1920"],
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile375",
      viewports: ["mobile320", "mobile375", "mobile414"],
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet768",
      viewports: ["tablet768", "tablet1024"],
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop1280",
      viewports: ["desktop1280", "desktop1440", "desktop1920"],
    },
  },
};
