export type Category = "music" | "illustration" | "movie" | "other";

interface Work {
  title: string;
  category: Category[];
  description: string;
  requester: string;
  thumbnailPath: string;
  link?: string;
}

export const worksData: Work[] = [
  {
    title: "消えたいと思うだけで",
    category: ["music", "movie"],
    description: "VOICEVOX「四国めたん」を使用したオリジナル楽曲",
    thumbnailPath: "/001_top/離途バナー_差し替え予定.webp",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    requester: "ユーザー",
  },
  {
    title: "夜明けの向こう側",
    category: ["music"],
    description: "VOICEVOX楽曲第2弾",
    thumbnailPath: "/001_top/Moviedummy.png",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    requester: "ユーザー",
  },
  {
    title: "Lit キャラクターイラスト",
    category: ["illustration"],
    description: "UTAUボイスライブラリ「Lit」のキャラクターデザイン",
    thumbnailPath: "/101_Lit/Litlogo.webp",
    requester: "ユーザー",
  },
  {
    title: "Digital Dreams MV",
    category: ["movie"],
    description: "オリジナル楽曲のミュージックビデオ制作",
    thumbnailPath: "/001_top/Moviedummy.png",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    requester: "ユーザー",
  },
  {
    title: "3Dキャラクターモデル",
    category: ["movie"],
    description: "Blenderを使用したキャラクターモデリング",
    thumbnailPath: "/101_Lit/LitDummy.png",
    requester: "ユーザー",
  },
  {
    title: "シンセティックボイス実験",
    category: ["other"],
    description: "AIボイスを使用した実験的作品",
    thumbnailPath: "/001_top/Moviedummy.png",
    requester: "ユーザー",
  },
  {
    title: "季節の移ろい",
    category: ["music"],
    description: "四季をテーマにした楽曲",
    thumbnailPath: "/001_top/離途バナー_差し替え予定.webp",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    requester: "ユーザー",
  },
  {
    title: "ファンタジーイラスト集",
    category: ["illustration"],
    description: "幻想的な世界観のイラスト作品",
    thumbnailPath: "/101_Lit/Litlogo.webp",
    requester: "ユーザー",
  },
  {
    title: "サイバーパンクMV",
    category: ["movie"],
    description: "近未来的な映像表現",
    thumbnailPath: "/001_top/Moviedummy.png",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    requester: "ユーザー",
  },
  {
    title: "ローポリキャラクター",
    category: ["movie"],
    description: "スタイライズされた3Dモデル",
    thumbnailPath: "/101_Lit/LitDummy.png",
    requester: "ユーザー",
  },
];
