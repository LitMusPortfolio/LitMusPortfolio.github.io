import type { StorybookConfig } from "@storybook/react-vite";
import { storybookViewportsPlugin } from "../src/vite-plugin-storybook-viewports";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-viewport",
  ],
  features: {
    autodocs: true,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins?.push(storybookViewportsPlugin());
    return config;
  },
};

export default config;
