// 型定義
type ItemType = "talk" | "sing" | "other";
type ItemStatus = "free" | "paid";

interface DownloadLink {
  text: string;
  url: string;
}

interface DownloadItem {
  id: number;
  type: ItemType;
  category: string;
  name: string;
  description: string;
  status: ItemStatus;
  price?: string;
  image?: string;
  links: {
    primary?: DownloadLink;
    secondary?: DownloadLink;
    tertiary?: DownloadLink;
  };
  modalContent?: {
    detailedDescription: string[];
    notes?: string[];
  };
}

// ダウンロードデータ
export const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: 1,
    type: "talk",
    category: "トークソフト",
    name: "VOICEVOX 離途",
    description: "無料で使える中品質なテキスト読み上げソフトウェア",
    status: "free",
    image: "/101_Lit/Litlogo.webp",
    links: {
      primary: {
        text: "ダウンロード (Windows版)",
        url: "https://example.com/download/windows",
      },
      secondary: {
        text: "ダウンロード (Mac版)",
        url: "https://example.com/download/mac",
      },
    },
    modalContent: {
      detailedDescription: [
        "VOICEVOX 離途は、無料で使える中品質なテキスト読み上げソフトウェアです。",
        "商用・非商用問わず利用可能で、豊富な音声パラメータで感情表現が可能です。",
      ],
      notes: [
        "※ 音声の二次利用は禁止されています",
        "※ クレジット表記が必要です",
        "※ 個人利用・商用利用ともに無料",
      ],
    },
  },
  {
    id: 2,
    type: "sing",
    category: "UTAUソングライブラリ",
    name: "離途 -FLOW-",
    description: "豊かな声色で感情的な歌唱が可能な大容量のライブラリ",
    status: "free",
    image: "/101_Lit/LitA_差し替え前提.webp",
    links: {
      primary: { text: "無料ダウンロード", url: "#" },
    },
  },
  {
    id: 3,
    type: "sing",
    category: "UTAUソングライブラリ",
    name: "離途 -HABIT-",
    description: "癖と勢いのある発音をコンセプトとした有料アペンドライブラリ",
    status: "paid",
    price: "¥3,000",
    image: "/101_Lit/LitB_差し替え前提.webp",
    links: {
      primary: { text: "BOOTHで購入", url: "https://booth.pm/" },
    },
  },
  {
    id: 4,
    type: "sing",
    category: "UTAUソングライブラリ",
    name: "離途 -ORIGINAL V2-",
    description: "LitMusが収録した無加工の音声のみを収録したレガシーライブラリ",
    status: "free",
    links: {
      primary: { text: "無料ダウンロード", url: "#" },
    },
  },
  {
    id: 5,
    type: "talk",
    category: "トークソフト",
    name: "MYCOEIROINK 離途",
    description: "寂しさと吐息感を意識して収録したトーク用レガシーライブラリ",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 6,
    type: "other",
    category: "画像素材",
    name: "離途立ち絵イラスト",
    description: "これまでの離途の立ち絵イラストを一括でダウンロード",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 7,
    type: "other",
    category: "画像素材",
    name: "離途ちびキャライラストPSD",
    description: "PSDTool対応の差分ありのちびキャライラスト",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 8,
    type: "other",
    category: "音声素材",
    name: "離途エクストラボイス素材",
    description: "CVを担当するLitMus本人が、離途をイメージして収録したボイス集",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 9,
    type: "other",
    category: "3Dモデル",
    name: "ちびりとすりーでぃー",
    description: "ローポリゴンのかわいらしい３Dモデル",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
];
