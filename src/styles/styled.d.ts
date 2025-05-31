import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        light: string;
        dark: string;
        gradient: string;
      };
      purple: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      background: {
        dark: string;
        darker: string;
        gradient: {
          main: string;
          blue: string;
        };
      };
      text: {
        primary: string;
        secondary: string;
        muted: string;
      };
    };
    shadows: {
      glow: {
        small: string;
        medium: string;
        large: string;
      };
      text: string;
      button: string;
      buttonHover: string;
    };
    effects: {
      glassmorphism: {
        background: string;
        border: string;
        borderRadius: string;
        backdropFilter: string;
      };
    };
    breakpoints?: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    spacing?: {
      sectionPadding: string;
      titleMargin: string;
      containerMaxWidth: string;
    };
  }
}
