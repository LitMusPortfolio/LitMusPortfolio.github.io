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
      primary: "#eeeeee",
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
    sectionPadding: "2rem 2rem",
    titleMargin: "2rem",
    containerMaxWidth: "90%",
    headerHeight: "95px",
    headerHeightMobile: "50px",
  },
  typography: {
    heading: {
      fontFamilyJa: "'Source Han Sans JP', 'Noto Sans JP', sans-serif",
      fontFamilyEn: "'Montserrat', sans-serif",
      fontWeight: 600,
      letterSpacingJa: "0.07em", // 字間0.7
      letterSpacingEn: "0.1em", // 字間1.0
    },
    body: {
      fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
      fontWeight: 600,
      letterSpacing: "0.06em", // 字間0.6
      lineHeight: 1.8,
    },
    // フォントサイズ
    fontSize: {
      xs: "0.7rem", // 極小
      sm: "0.85rem", // 小
      base: "1.1rem", // 基本
      lg: "1.5rem", // 大
      xl: "2rem", // 特大
      h1: "4rem",
      h2: "2.2rem",
      h3: "1.5rem",
    },
  },
  // スペーシング（余白）
  space: {
    xs: "0.5rem", // 極小
    sm: "1rem", // 小
    md: "1.5rem", // 中
    lg: "2rem", // 大
    xl: "3rem", // 特大
    "2xl": "4rem", // 超特大
    "3xl": "6rem", // 巨大
    "4xl": "8rem", // 超巨大
  },
  // 境界線
  borders: {
    width: {
      thin: "1px",
      base: "2px",
      thick: "4px",
    },
    radius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "20px",
      "2xl": "30px",
      full: "9999px",
      circle: "50%",
    },
  },
  // 透明度
  opacity: {
    5: 0.05,
    10: 0.1,
    20: 0.2,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    80: 0.8,
    90: 0.9,
    95: 0.95,
  },
  // アニメーション
  animation: {
    duration: {
      fast: "0.3s",
      normal: "0.6s",
      slow: "1s",
      scrolling: "20s",
      // Legacy names for backward compatibility
      base: "0.3s",
      slower: "1s",
      slowest: "3s",
    },
    easing: {
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      linear: "linear",
    },
  },
  // z-index
  zIndex: {
    behind: -1,
    base: 0,
    content: 1,
    front: 2,
    dropdown: 10,
    sticky: 50,
    fixed: 100,
    modalBackdrop: 1000,
    modal: 1050,
    popover: 1100,
    tooltip: 1200,
    max: 9999,
  },
  // サイズ
  sizes: {
    icon: {
      sm: "16px",
      md: "24px",
      lg: "32px",
      xl: "40px",
    },
    avatar: {
      sm: "32px",
      md: "48px",
      lg: "64px",
      xl: "96px",
    },
    button: {
      sm: "32px",
      md: "40px",
      lg: "48px",
      xl: "56px",
    },
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1400px",
    },
  },
  // アスペクト比
  aspectRatio: {
    video: "56.25%", // 16:9
    thumbnail: "75%", // 4:3
    square: "100%", // 1:1
    portrait: "133.33%", // 3:4
  },
} as const;
