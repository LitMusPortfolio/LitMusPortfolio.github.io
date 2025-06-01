export const theme = {
  colors: {
    primary: {
      main: "#8b5cf6",
      light: "#a78bfa",
      dark: "#7c3aed",
      gradient: "linear-gradient(135deg, #8035F6 0%, #9d5ff6 100%)",
    },
    purple: {
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
    background: {
      dark: "#1a0a3e",
      darker: "#0a1628",
      gradient: {
        main: "linear-gradient(135deg, #1a0a3e 0%, #2d1b69 50%, #3e2980 100%)",
        blue: "linear-gradient(135deg, #0a1628 0%, #1a2c4e 30%, #2a4a7c 60%, #3a5f95 100%)",
      },
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.9)",
      muted: "rgba(255, 255, 255, 0.7)",
    },
  },
  shadows: {
    glow: {
      small: "0 0 20px rgba(139, 92, 246, 0.5)",
      medium: "0 0 40px rgba(139, 92, 246, 0.6)",
      large: "0 0 60px rgba(139, 92, 246, 0.7)",
    },
    text: "0 2px 8px rgba(0, 0, 0, 0.5)",
    button: "0 10px 30px rgba(128, 53, 246, 0.5)",
    buttonHover: "0 15px 40px rgba(128, 53, 246, 0.7)",
  },
  effects: {
    glassmorphism: {
      background: "rgba(0, 0, 0, 0.3)",
      border: "1px solid rgba(139, 92, 246, 0.3)",
      borderRadius: "15px",
      backdropFilter: "blur(10px)",
    },
  },
  breakpoints: {
    small: "600px", // スマホ横向き
    mobile: "768px",
    tablet: "968px",
    desktop: "1200px",
  },
  spacing: {
    sectionPadding: "8rem 2rem",
    titleMargin: "4rem",
    containerMaxWidth: "90%",
  },
  typography: {
    heading: {
      fontFamilyJa: "'Source Han Sans JP', 'Noto Sans JP', sans-serif",
      fontFamilyEn: "'Montserrat', sans-serif",
      fontWeight: 900,
      letterSpacingJa: "0.07em", // 字間0.7
      letterSpacingEn: "0.1em", // 字間1.0
    },
    body: {
      fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
      fontWeight: 900,
      letterSpacing: "0.06em", // 字間0.6
      lineHeight: 1.8,
    },
  },
} as const;
