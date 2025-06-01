import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";
import TextWithBackground from "./TextWithBackground";

const Container = styled.div`
  background-color: #1a1a2e;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: normal;
  margin: 0;
`;

const TagLine = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const meta = {
  title: "Components/TextWithBackground",
  component: TextWithBackground,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} satisfies Meta<typeof TextWithBackground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "LITMUS",
  },
  render: (args) => (
    <Title>
      <TextWithBackground {...args} />
    </Title>
  ),
};

export const MultipleWords: Story = {
  args: {
    children: "LITMUS",
  },
  render: () => (
    <>
      <Title>
        <TextWithBackground>LITMUS</TextWithBackground>
      </Title>
      <Subtitle>
        <TextWithBackground>Creative Studio</TextWithBackground>
      </Subtitle>
    </>
  ),
};

export const Tags: Story = {
  args: {
    children: "#MUSIC",
  },
  render: () => (
    <TagLine>
      <TextWithBackground>#MUSIC</TextWithBackground>
      <TextWithBackground>#VOCALOID</TextWithBackground>
      <TextWithBackground>#PRODUCE</TextWithBackground>
    </TagLine>
  ),
};

export const LongText: Story = {
  args: {
    children: "SYNTHETIC VOICE PRODUCTION",
  },
  render: () => (
    <Subtitle>
      <TextWithBackground>SYNTHETIC VOICE PRODUCTION</TextWithBackground>
    </Subtitle>
  ),
};
