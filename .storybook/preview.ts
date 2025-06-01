import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import type { Preview } from "@storybook/react";

const customViewports = {
  iphone6: {
    name: "iPhone 6",
    styles: {
      width: "375px",
      height: "667px",
    },
  },
  iphone12: {
    name: "iPhone 12",
    styles: {
      width: "390px",
      height: "844px",
    },
  },
  ipad: {
    name: "iPad",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  desktop: {
    name: "Desktop",
    styles: {
      width: "1280px",
      height: "800px",
    },
  },
  fullhd: {
    name: "Full HD",
    styles: {
      width: "1920px",
      height: "1080px",
    },
  },
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...customViewports,
        ...INITIAL_VIEWPORTS,
      },
      defaultViewport: "desktop",
    },
  },
};

export default preview;
