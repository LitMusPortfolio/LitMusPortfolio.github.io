import { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardDescription,
  CardGrid,
  CardHeader,
  CardInfo,
  CardTag,
  CardTitle,
  Modal,
  ModalCloseButton,
  ModalContent,
} from "../../../components/CardGrid";
import SectionTitle from "../../../components/SectionTitle";
import { theme } from "../../../styles/theme";

// カスタムスタイル
const DownloadSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: url("/LitBG.webp") no-repeat center center;
  position: relative;
  overflow: hidden;

  /* 背景の幾何学模様 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, rgba(139, 92, 246, 0.1) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(139, 92, 246, 0.1) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(139, 92, 246, 0.1) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(139, 92, 246, 0.1) 75%);
    background-size: 30px 30px;
    background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  padding: 0 2rem;
`;

const SideDecoration = styled.div`
  position: absolute;
  left: -100px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  img {
    height: 200px;
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// カスタムカードコンポーネント
const DownloadCard = styled(Card)`
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid transparent;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: ${theme.colors.primary.main};
    box-shadow: 
      0 10px 30px rgba(139, 92, 246, 0.3),
      inset 0 0 20px rgba(139, 92, 246, 0.1);
  }
`;

const CardSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: 1rem;
  opacity: 0.8;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
`;

const CardStatus = styled.span<{ $free?: boolean }>`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => (props.$free ? "#4CAF50" : theme.colors.primary.light)};
`;

// モーダル内部のスタイル
const ModalImage = styled.div`
  flex: 0 0 300px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(92, 246, 246, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 200px;
  }
`;

const ModalInfo = styled.div`
  flex: 1;
  padding: 3rem;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: ${theme.colors.primary.main};
`;

const ModalDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
  
  p {
    margin-bottom: 1rem;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalButton = styled.a<{ $primary?: boolean }>`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${(props) => (props.$primary ? theme.colors.primary.main : "rgba(255, 255, 255, 0.1)")};
  color: ${theme.colors.text.primary};
  border: 2px solid ${(props) => (props.$primary ? "transparent" : "rgba(255, 255, 255, 0.2)")};
  border-radius: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${(props) => (props.$primary ? theme.colors.primary.dark : "rgba(255, 255, 255, 0.2)")};
    box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
  }
`;

// データ型定義
interface DownloadItem {
  id: number;
  type: "voicevox" | "utau" | "music";
  name: string;
  subtitle?: string;
  description: string;
  status: "free" | "paid";
  price?: string;
  image?: string;
  links: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
    tertiary?: { text: string; url: string };
  };
  modalContent?: {
    detailedDescription: string[];
    notes?: string[];
  };
}

// ダウンロードデータ
const downloadItems: DownloadItem[] = [
  {
    id: 1,
    type: "voicevox",
    name: "VOICEVOX 離途",
    subtitle: "オーディナリ",
    description: "無料で使える中品質音声テキスト読み上げソフトウェア",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
      secondary: {
        text: "VOICEVOXを先にダウンロード",
        url: "https://voicevox.hiroshiba.jp/",
      },
    },
    modalContent: {
      detailedDescription: [
        "VOICEVOXは無料で使える中品質音声合成ソフトウェアです。",
        "商用・非商用問わず無料で、イントネーションの調整も可能。",
        "プラグイン機能でキャラクターも追加でき、音声ファイルの作成も簡単です。",
      ],
    },
  },
  {
    id: 2,
    type: "utau",
    name: "UTAU 離途 -FLOW-",
    subtitle: "ソングライブラリ",
    description: "柔らかな歌唱適性で聴いた人に大容量のFLOW提供",
    status: "free",
    links: {
      primary: { text: "無料ダウンロード", url: "#" },
    },
  },
  {
    id: 3,
    type: "utau",
    name: "UTAU 離途 -HABIT-",
    subtitle: "ソングライブラリ",
    description: "強めなる歌声をメンタルとした音声サウンド音源",
    status: "paid",
    price: "¥3,000",
    links: {
      primary: { text: "BOOTHで購入", url: "https://booth.pm/" },
      secondary: {
        text: "VOICEVOXを先にダウンロード",
        url: "https://voicevox.hiroshiba.jp/",
      },
      tertiary: { text: "無料ダウンロード", url: "#" },
    },
    modalContent: {
      detailedDescription: [
        "合成音源ライブラリ。限定。",
        "UTAU用音源カラクシダウンロライブラリです。",
        "耳いと腹のちを民夏を詳細して仕様した高品。",
        "製品で表現いては感激こもくしており音声ライブラリ...の記録管理されてます。",
      ],
      notes: [
        "※音素データのみの配布となります。",
        "パッケージのDLカード等の物理商品の販売ではありません。",
      ],
    },
  },
  {
    id: 4,
    type: "music",
    name: "消えたいと願うだけで",
    subtitle: "LitPlus",
    description: "自主制作、歌曲、イラスト、残録素材",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  // 残りのLitPlus楽曲
  {
    id: 5,
    type: "music",
    name: "消えたいと願うだけで",
    subtitle: "LitPlus",
    description: "自主制作、歌曲、イラスト、残録素材",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 6,
    type: "music",
    name: "消えたいと願うだけで",
    subtitle: "LitPlus",
    description: "自主制作、歌曲、イラスト、残録素材",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 7,
    type: "music",
    name: "消えたいと願うだけで",
    subtitle: "LitPlus",
    description: "自主制作、歌曲、イラスト、残録素材",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 8,
    type: "music",
    name: "消えたいと願うだけで",
    subtitle: "LitPlus",
    description: "自主制作、歌曲、イラスト、残録素材",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
];

export default function LitDownloadSection() {
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "voicevox":
        return "VOICEVOX";
      case "utau":
        return "UTAU";
      case "music":
        return "MUSIC";
      default:
        return type.toUpperCase();
    }
  };

  return (
    <>
      <DownloadSection id="downloads">
        <SideDecoration>
          <img src="/010_PageSideTitleSvg/DOWNLOAD.svg" alt="DOWNLOAD" />
        </SideDecoration>

        <Container>
          <SectionTitle>DOWNLOAD</SectionTitle>

          <CardGrid>
            {downloadItems.map((item) => (
              <DownloadCard key={item.id} onClick={() => setSelectedItem(item)}>
                <CardHeader>
                  <CardTag>{getTypeLabel(item.type)}</CardTag>
                </CardHeader>
                <CardInfo>
                  <CardTitle>{item.name}</CardTitle>
                  {item.subtitle && (
                    <CardSubtitle>{item.subtitle}</CardSubtitle>
                  )}
                  <CardDescription>{item.description}</CardDescription>
                  <CardFooter>
                    <CardStatus $free={item.status === "free"}>
                      {item.status === "free" ? "FREE" : item.price}
                    </CardStatus>
                  </CardFooter>
                </CardInfo>
              </DownloadCard>
            ))}
          </CardGrid>
        </Container>
      </DownloadSection>

      {/* モーダル */}
      <Modal $isOpen={!!selectedItem}>
        {selectedItem && (
          <ModalContent>
            <ModalCloseButton onClick={() => setSelectedItem(null)}>
              ×
            </ModalCloseButton>

            {selectedItem.image && (
              <ModalImage>
                <img src={selectedItem.image} alt={selectedItem.name} />
              </ModalImage>
            )}

            <ModalInfo>
              <ModalTitle>{selectedItem.name}</ModalTitle>

              <ModalDescription>
                {selectedItem.modalContent?.detailedDescription ? (
                  selectedItem.modalContent.detailedDescription.map(
                    (text, idx) => (
                      <p key={`desc-${selectedItem.id}-${idx}`}>{text}</p>
                    ),
                  )
                ) : (
                  <>
                    <p>{selectedItem.description}</p>
                    {selectedItem.status === "paid" && (
                      <p>価格: {selectedItem.price}</p>
                    )}
                  </>
                )}

                {selectedItem.modalContent?.notes && (
                  <div
                    style={{
                      marginTop: "2rem",
                      fontSize: "0.9rem",
                      opacity: 0.8,
                    }}
                  >
                    {selectedItem.modalContent.notes.map((note, idx) => (
                      <p key={`note-${selectedItem.id}-${idx}`}>{note}</p>
                    ))}
                  </div>
                )}
              </ModalDescription>

              <ModalButtons>
                {selectedItem.links.primary && (
                  <ModalButton
                    href={selectedItem.links.primary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    $primary
                  >
                    {selectedItem.links.primary.text}
                  </ModalButton>
                )}

                {selectedItem.links.secondary && (
                  <ModalButton
                    href={selectedItem.links.secondary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedItem.links.secondary.text}
                  </ModalButton>
                )}

                {selectedItem.links.tertiary && (
                  <ModalButton
                    href={selectedItem.links.tertiary.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {selectedItem.links.tertiary.text}
                  </ModalButton>
                )}
              </ModalButtons>
            </ModalInfo>
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
