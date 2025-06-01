import type { Meta, StoryObj } from "@storybook/react";
import { SocialLinks } from "./SocialLinks";

const meta = {
  title: "Components/SocialLinks",
  component: SocialLinks,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof SocialLinks>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    links: [
      { platform: "x", url: "https://x.com/example", icon: "/icon_X.svg" },
      {
        platform: "youtube",
        url: "https://youtube.com/example",
        icon: "/icon_youtube.svg",
      },
    ],
    size: "medium",
  },
};
