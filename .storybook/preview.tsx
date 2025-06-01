import type { Preview } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../src/styles/GlobalStyles";
import { theme } from "../src/styles/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        mobile320: {
          name: "Mobile 320px",
          styles: {
            width: "320px",
            height: "568px",
          },
        },
        mobile375: {
          name: "Mobile 375px (iPhone SE)",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        mobile414: {
          name: "Mobile 414px (iPhone Plus)",
          styles: {
            width: "414px",
            height: "896px",
          },
        },
        tablet768: {
          name: "Tablet 768px (iPad)",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        tablet1024: {
          name: "Tablet 1024px (iPad Pro)",
          styles: {
            width: "1024px",
            height: "1366px",
          },
        },
        desktop1280: {
          name: "Desktop 1280px",
          styles: {
            width: "1280px",
            height: "800px",
          },
        },
        desktop1440: {
          name: "Desktop 1440px",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
        desktop1920: {
          name: "Desktop 1920px (Full HD)",
          styles: {
            width: "1920px",
            height: "1080px",
          },
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    ),
  ],
};

export default preview;
