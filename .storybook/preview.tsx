import type { Preview } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

const CUSTOM_VIEWPORTS = {
  mobile320: {
    name: "Mobile 320",
    styles: {
      width: "320px",
      height: "568px",
    },
  },
  mobile375: {
    name: "Mobile 375",
    styles: {
      width: "375px",
      height: "667px",
    },
  },
  mobile414: {
    name: "Mobile 414",
    styles: {
      width: "414px",
      height: "896px",
    },
  },
  tablet768: {
    name: "Tablet 768",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
  tablet1024: {
    name: "Tablet 1024",
    styles: {
      width: "1024px",
      height: "768px",
    },
  },
  desktop1280: {
    name: "Desktop 1280",
    styles: {
      width: "1280px",
      height: "720px",
    },
  },
  desktop1440: {
    name: "Desktop 1440",
    styles: {
      width: "1440px",
      height: "900px",
    },
  },
  desktop1920: {
    name: "Desktop 1920",
    styles: {
      width: "1920px",
      height: "1080px",
    },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: CUSTOM_VIEWPORTS,
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default preview;
