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
  Tab,
  TabContainer,
} from "../../../components/CardGrid";
import DownloadModal from "../../../components/DownloadModal";
import SectionTitle from "../../../components/SectionTitle";
import { theme } from "../../../styles/theme";

// カスタムスタイル
const DownloadSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  position: relative;
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

// カテゴリー別のタグカラー
const CategoryTag = styled(CardTag)<{ $category: string }>`
  background: ${(props) => {
    switch (props.$category) {
      case "トークソフト":
        return "linear-gradient(135deg, #00BCD4, #0097A7)";
      case "UTAUソングライブラリ":
        return "linear-gradient(135deg, #9C27B0, #7B1FA2)";
      case "画像素材":
        return "linear-gradient(135deg, #FF6B6B, #EE5A6F)";
      case "音声素材":
        return "linear-gradient(135deg, #4CAF50, #388E3C)";
      case "3Dモデル":
        return "linear-gradient(135deg, #FF9800, #F57C00)";
      default:
        return theme.colors.primary.main;
    }
  }};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
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
  type: "talk" | "sing" | "other";
  category: string;
  name: string;
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
    type: "talk",
    category: "トークソフト",
    name: "VOICEVOX 離途",
    description: "無料で使える中品質なテキスト読み上げソフトウェア",
    status: "free",
    links: {
      primary: { text: "ダウンロード", url: "#" },
    },
  },
  {
    id: 2,
    type: "sing",
    category: "UTAUソングライブラリ",
    name: "離途 -FLOW-",
    description: "豊かな声色で感情的な歌唱が可能な大容量のライブラリ",
    status: "free",
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

export default function LitDownloadSection() {
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems =
    activeTab === "all"
      ? downloadItems
      : downloadItems.filter((item) => item.type === activeTab);

  return (
    <>
      <DownloadSection id="downloads">
        <SideDecoration>
          <img src="/010_PageSideTitleSvg/DOWNLOAD.svg" alt="DOWNLOAD" />
        </SideDecoration>

        <Container>
          <SectionTitle>DOWNLOAD</SectionTitle>

          <TabContainer>
            <Tab
              $active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            >
              ALL
            </Tab>
            <Tab
              $active={activeTab === "talk"}
              onClick={() => setActiveTab("talk")}
            >
              TALK
            </Tab>
            <Tab
              $active={activeTab === "sing"}
              onClick={() => setActiveTab("sing")}
            >
              SING
            </Tab>
            <Tab
              $active={activeTab === "other"}
              onClick={() => setActiveTab("other")}
            >
              OTHER
            </Tab>
          </TabContainer>

          <CardGrid>
            {filteredItems.map((item) => (
              <DownloadCard key={item.id} onClick={() => setSelectedItem(item)}>
                <CardHeader>
                  <CategoryTag $category={item.category}>
                    {item.category}
                  </CategoryTag>
                </CardHeader>
                <CardInfo>
                  <CardTitle>{item.name}</CardTitle>
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
      <DownloadModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        image={selectedItem?.image}
        title={selectedItem?.name || ""}
      >
        {selectedItem && (
          <>
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
          </>
        )}
      </DownloadModal>
    </>
  );
}
