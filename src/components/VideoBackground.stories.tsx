import type { Meta, StoryObj } from "@storybook/react";
import { VideoBackground } from "./VideoBackground";

const meta = {
  title: "Components/VideoBackground",
  component: VideoBackground,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Story />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "3rem",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          コンテンツ
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof VideoBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

const videoSources = [
  { src: "/001_top/LitMusHPTopMovie.mp4", type: "video/mp4" },
  { src: "/001_top/LitMusHPTopMovie.webm", type: "video/webm" },
];

export const Default: Story = {
  args: {
    sources: videoSources,
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
  },
};

export const WithOpacity: Story = {
  args: {
    sources: videoSources,
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    opacity: 0.5,
  },
};
