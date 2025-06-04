import type { Meta, StoryObj } from "@storybook/react";
import EmailProtected from "./EmailProtected";

const meta = {
  title: "Components/EmailProtected",
  component: EmailProtected,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof EmailProtected>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    email: "example@example.com",
  },
};

export const CustomButtonText: Story = {
  args: {
    email: "test@test.com",
    showButtonText: "Show Email",
  },
};

export const LitMusEmail: Story = {
  args: {
    email: "6litmus9@gmail.com",
  },
};
