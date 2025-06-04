// キャラクター表示設定の一元管理
export interface CharacterDisplayConfig {
  desktop: {
    height: string;
    maxWidth: string;
    spacerWidth: string;
    imagePosition?: string; // "left bottom" など
    zIndex?: number;
  };
  tablet: {
    height: string;
    maxWidth: string;
    spacerWidth: string;
  };
  mobile: {
    display: "none" | "block";
  };
}

// デフォルト設定
const DEFAULT_CHARACTER_CONFIG: CharacterDisplayConfig = {
  desktop: {
    height: "95%",
    maxWidth: "600px",
    spacerWidth: "40%",
    imagePosition: "left bottom",
    zIndex: 1,
  },
  tablet: {
    height: "85%",
    maxWidth: "400px",
    spacerWidth: "35%",
  },
  mobile: {
    display: "none",
  },
};

// プリセット設定（異なる表示パターン）
export const CHARACTER_PRESETS = {
  default: DEFAULT_CHARACTER_CONFIG,

  // より大きく表示
  large: {
    desktop: {
      height: "100%",
      maxWidth: "700px",
      spacerWidth: "45%",
      imagePosition: "left bottom",
      zIndex: 1,
    },
    tablet: {
      height: "90%",
      maxWidth: "450px",
      spacerWidth: "40%",
    },
    mobile: {
      display: "none" as const,
    },
  },

  // より小さく表示
  small: {
    desktop: {
      height: "85%",
      maxWidth: "500px",
      spacerWidth: "35%",
      imagePosition: "left bottom",
      zIndex: 1,
    },
    tablet: {
      height: "75%",
      maxWidth: "350px",
      spacerWidth: "30%",
    },
    mobile: {
      display: "none" as const,
    },
  },

  // コンパクト（モバイルでも表示）
  compact: {
    desktop: {
      height: "80%",
      maxWidth: "450px",
      spacerWidth: "30%",
      imagePosition: "left bottom",
      zIndex: 1,
    },
    tablet: {
      height: "70%",
      maxWidth: "300px",
      spacerWidth: "25%",
    },
    mobile: {
      display: "block" as const,
    },
  },
} as const;

// 設定を取得するユーティリティ
export function getCharacterConfig(
  preset: keyof typeof CHARACTER_PRESETS = "default",
): CharacterDisplayConfig {
  return CHARACTER_PRESETS[preset] || DEFAULT_CHARACTER_CONFIG;
}
