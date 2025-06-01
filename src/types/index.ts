// 共通の型定義

// プロフィールデータの型定義
export interface ProfileData {
  label: string;
  value: string;
}

export interface Work {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  image: string;
  link?: string;
  videoId?: string;
  views?: string;
  date?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// カテゴリーの色定義
export const categoryColors: Record<
  string,
  { primary: string; secondary: string }
> = {
  オリジナル曲: { primary: "#FF6B6B", secondary: "#FF8E8E" },
  カバー: { primary: "#4ECDC4", secondary: "#6FE3DB" },
  "3DMV": { primary: "#FFB74D", secondary: "#FFC870" },
  イラスト: { primary: "#9575CD", secondary: "#B39DDB" },
  その他: { primary: "#64B5F6", secondary: "#87C3FC" },
};
