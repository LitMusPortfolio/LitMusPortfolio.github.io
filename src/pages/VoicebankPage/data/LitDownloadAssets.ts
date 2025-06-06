import type { DownloadItem } from "../types";

// ダウンロードデータ
export const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: 1,
    type: "talk",
    category: "トークソフト",
    name: "VOICEVOX 離途",
    description: "無料で使える中品質なテキスト読み上げソフトウェア",
    image: "/102_DOWNLOAD/01_VOICEVOX.png",
    modalContent: {
      description: [
        ["商用・非商用問わず無料で使用可能。すぐに使えるソフトウェアです。"],
        ["優しさと吐息が香る、穏やかな男声で読み上げます。"],
        [
          "使用する際には「VOICEVOX 離途」のクレジット表記を必ず行ってください。",
        ],
      ],
      links: [
        { text: "VOICEVOX公式サイトへ", url: "https://voicevox.hiroshiba.jp" }, // TODO: 変える
      ],
    },
  },
  {
    id: 2,
    type: "sing",
    category: "UTAUソングライブラリ",
    name: "離途 -FLOW-",
    description: "豊かな声色で感情的な歌唱が可能な大容量のライブラリ",
    image: "/102_DOWNLOAD/02_UTAU_Flow.png",
    links: {
      primary: { text: "無料ダウンロード", url: "#" },
    },
    modalContent: {
      description: [
        [
          "優しさと吐息が香る、男声UTAUライブラリ。",
          "AIによる音声補間技術を使用し、大容量の音源数で表情豊かに歌い上げます。",
        ],
        [
          "連続音+VC音素切り出しで細やかな調声が可能。OpenUtau対応。",
          "A#2、F3、A#3、D4、F4、A#4の6音階を搭載し、",
          "NORMAL、DARK、SOLLOW、SOLID、POWERFULの",
          "5つの声色を使い分けることが可能。",
        ],
        [
          "有料アペンドライブラリの「離途 - HABIT-」を追加することで",
          "さらなる表現も可能になります。",
        ],
      ],
      links: [
        {
          text: "無料ダウンロード",
          url: "https://drive.google.com/drive/folders/1t5JduvLjoz1r-MwR8FmM_KhBWalYQlrq?usp=drive_link",
        }, // TODO: 変える
      ],
    },
  },
  {
    id: 3,
    type: "sing",
    category: "UTAUソングライブラリ",
    name: "離途 -HABIT-",
    description: "癖と勢いのある発音をコンセプトとした有料アペンドライブラリ",
    image: "/102_DOWNLOAD/03_UTAU_Habit.png",
    modalContent: {
      description: [
        [
          "癖と勢いのある発音をコンセプトとした有料アペンドライブラリ。",
          "語尾音は4種類収録。様々な人間的歌唱表現を可能とします。",
        ],
        [
          "連続音+VC音素切り出し済み。",
          "D4の1音階を収録したデータの他、",
          "AI補間によりA#2、F3、A#3、D4、F4、A#4の6音階に拡張したデータを同梱。",
        ],
        [
          "離途-HABIT-単体でも動作しますが、",
          "「離途 -FLOW-」と併用することを推奨しています。",
        ],
      ],
      links: [
        { text: "BOOTHで購入", url: "https://litmus9.booth.pm/items/6193924" }, // TODO: 変える
      ],
    },
  },
  {
    id: 4,
    type: "sing",
    category: "UTAUソングライブラリ",
    name: "離途 -ORIGINAL V2-",
    description: "LitMusが収録した無加工の音声のみを収録したレガシーライブラリ",
    image: "/102_DOWNLOAD/04_UTAU_OliginalV2.png",
    modalContent: {
      description: [
        [
          "LitMusが収録した無加工の音声のみを収録したレガシーライブラリ。",
          "現在は「離途FLOW」の使用を推奨しています。",
        ],
        ["連続音+VC音素切り出し済み。", "A#2、F3、A#3、F4の4音階を収録。"],
      ],
      links: [
        { text: "無料ダウンロード", url: "https://bowlroll.net/file/310978" }, // TODO: 変える
      ],
    },
  },
  {
    id: 5,
    type: "talk",
    category: "トークソフト",
    name: "MYCOEIROINK 離途",
    description: "寂しさと吐息感を意識して収録したトーク用レガシーライブラリ",
    image: "/102_DOWNLOAD/05_MYCOEIROINK.png",
    modalContent: {
      description: [
        [
          "無料で使用可能な合成音声。レガシーライブラリ。",
          "現在は「VOICEVOX 離途」の使用を推奨しています。",
          "優しさと吐息が香る、穏やかな男声で読み上げます。",
        ],
        [
          "使用する際には「MYCOEIROINK 離途」のクレジット表記を必ず行ってください。",
        ],
      ],
    },
    links: [
      { text: "無料ダウンロード", url: "https://bowlroll.net/file/314288" }, // TODO: 変える
    ],
  },
  {
    id: 6,
    type: "other",
    category: "画像素材",
    name: "離途立ち絵イラスト",
    description: "これまでの離途の立ち絵イラストを一括でダウンロード",
    image: "/102_DOWNLOAD/06_ALL_Illust.png",
    modalContent: {
      description: [
        [
          "これまでの離途の立ち絵イラストを一括でダウンロード。",
          "使用する際には利用規約に則ってご使用ください。",
        ],
        [
          "収録内容 : ",
          "離途UTAU、離途VOICEVOX、離途 -ORIGINAL-、離途 -ORIGINAL V2-、離途 -FLOW-",
        ],
      ],
      links: [
        { text: "無料ダウンロード", url: "https://bowlroll.net/file/337131" }, // TODO: 変える
      ],
    },
  },
  {
    id: 7,
    type: "other",
    category: "画像素材",
    name: "離途ちびキャライラストPSD",
    description: "PSDTool対応の差分ありのちびキャライラスト",
    image: "/102_DOWNLOAD/07_tibi_psd.png",
    modalContent: {
      description: [
        [
          "読み上げ動画での使用を想定した、",
          "PSDTool対応の差分ありのちびキャライラストです。",
          "レイヤー分けされた差分で、様々な表情やポーズをカスタマイズ。",
        ],
        ["使用する際には利用規約に則ってご使用ください。"],
      ],
    },
    links: [
      { text: "無料ダウンロード", url: "https://bowlroll.net/file/337132" },
    ], // TODO: 変える
  },
  {
    id: 8,
    type: "other",
    category: "音声素材",
    name: "離途エクストラボイス素材",
    description: "CVを担当するLitMus本人が、離途をイメージして収録したボイス集",
    image: "/102_DOWNLOAD/08_Extra_voice.png",
    modalContent: {
      description: [
        [
          "CVを担当するLitMus本人が、離途をイメージして収録したボイス集。",
          "挨拶や掛け声、感情表現のほか、",
          "さつまいもの品種を42種類読み上げた音声などを収録。",
        ],
        ["使用する際には利用規約に則ってご使用ください。"],
      ],
      links: [
        { text: "無料ダウンロード", url: "https://bowlroll.net/file/337133" }, // TODO: 変える
      ],
    },
  },
  {
    id: 9,
    type: "other",
    category: "3Dモデル",
    name: "ちびりと3D",
    description: "ローポリゴンのかわいらしい3Dモデル",
    image: "/102_DOWNLOAD/09_tibi_3D.png",
    modalContent: {
      description: [
        [
          "ローポリゴンで表現された、ちび3Dモデル。",
          "ちいさな手足でいっしょうけんめい踊ります。",
        ],
        [
          "fbx形式と、MMDでの使用を想定したpmx形式を収録。",
          "モデリング：林津子（@Ri2g_）",
        ],
        ["使用する際には利用規約に則ってご使用ください。"],
      ],
      links: [
        { text: "無料ダウンロード", url: "https://bowlroll.net/file/337134" }, // TODO: 変える
      ],
    },
  },
];
