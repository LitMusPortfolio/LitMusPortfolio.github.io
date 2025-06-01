import type { Meta, StoryObj } from "@storybook/react";
import ProfileSection from "./ProfileSection";

const meta = {
  title: "Pages/Voicebank/Components/ProfileSection",
  component: ProfileSection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ProfileSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { label: "Name", value: "John Doe" },
      { label: "Role", value: "Developer" },
      { label: "Location", value: "Tokyo" },
    ],
  },
};
