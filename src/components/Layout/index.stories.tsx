import type { Meta, StoryObj } from "@storybook/react";
import { Container, Section } from "./index";

const meta = {
  title: "Components/Layout/Section",
  component: Section,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <Container>
        <h1 style={{ color: "white" }}>Section Content</h1>
        <p style={{ color: "white" }}>This is a layout section component.</p>
      </Container>
    ),
  },
};
