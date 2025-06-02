import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
  ],
  docs: {
    autodocs: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
