import { useMemo, useState } from "react";
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

// スタイルコンポーネント
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

// カテゴリー別の色設定
const CATEGORY_COLORS: Record<string, string> = {
  トークソフト: "linear-gradient(135deg, #00BCD4, #0097A7)",
  UTAUソングライブラリ: "linear-gradient(135deg, #9C27B0, #7B1FA2)",
  画像素材: "linear-gradient(135deg, #FF6B6B, #EE5A6F)",
  音声素材: "linear-gradient(135deg, #4CAF50, #388E3C)",
  "3Dモデル": "linear-gradient(135deg, #FF9800, #F57C00)",
};

// カテゴリータグコンポーネント
const CategoryTag = styled(CardTag)<{ $category: string }>`
  background: ${(props) =>
    CATEGORY_COLORS[props.$category] || theme.colors.primary.main};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
`;

// ダウンロードデータ
const DOWNLOAD_ITEMS: DownloadItem[] = [
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

// タブの定義
const TABS = [
  { id: "all", label: "ALL" },
  { id: "talk", label: "TALK" },
  { id: "sing", label: "SING" },
  { id: "other", label: "OTHER" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ダウンロードアイテムカードコンポーネント
interface DownloadItemCardProps {
  item: DownloadItem;
  onClick: () => void;
}

function DownloadItemCard({ item, onClick }: DownloadItemCardProps) {
  return (
    <DownloadCard onClick={onClick}>
      <CardHeader>
        <CategoryTag $category={item.category}>{item.category}</CategoryTag>
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
  );
}

// モーダル内容コンポーネント
interface ModalContentProps {
  item: DownloadItem;
}

function ModalContent({ item }: ModalContentProps) {
  return (
    <>
      <ModalDescription>
        {item.modalContent?.detailedDescription ? (
          item.modalContent.detailedDescription.map((text, idx) => (
            <p key={`desc-${item.id}-${idx}`}>{text}</p>
          ))
        ) : (
          <>
            <p>{item.description}</p>
            {item.status === "paid" && <p>価格: {item.price}</p>}
          </>
        )}

        {item.modalContent?.notes && (
          <ModalNotes>
            {item.modalContent.notes.map((note, idx) => (
              <p key={`note-${item.id}-${idx}`}>{note}</p>
            ))}
          </ModalNotes>
        )}
      </ModalDescription>

      <ModalButtons>
        {item.links.primary && (
          <ModalButton
            href={item.links.primary.url}
            target="_blank"
            rel="noopener noreferrer"
            $primary
          >
            {item.links.primary.text}
          </ModalButton>
        )}
        {item.links.secondary && (
          <ModalButton
            href={item.links.secondary.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.links.secondary.text}
          </ModalButton>
        )}
        {item.links.tertiary && (
          <ModalButton
            href={item.links.tertiary.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.links.tertiary.text}
          </ModalButton>
        )}
      </ModalButtons>
    </>
  );
}

// モーダル用スタイル
const ModalDescription = styled.div`
  margin-bottom: 2rem;
  line-height: 1.8;
  color: ${theme.colors.text.secondary};
  
  p {
    margin-bottom: 1rem;
  }
`;

const ModalNotes = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalButton = styled.a<{ $primary?: boolean }>`
  display: inline-block;
  padding: 1rem 2rem;
  background: ${(props) =>
    props.$primary ? theme.colors.primary.main : "rgba(255, 255, 255, 0.1)"};
  color: ${theme.colors.text.primary};
  border: 2px solid ${(props) =>
    props.$primary ? "transparent" : "rgba(255, 255, 255, 0.2)"};
  border-radius: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${(props) =>
      props.$primary ? theme.colors.primary.dark : "rgba(255, 255, 255, 0.2)"};
    box-shadow: 0 5px 20px rgba(139, 92, 246, 0.3);
  }
`;

// メインコンポーネント
export default function LitDownloadSection() {
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("all");

  // フィルタリングされたアイテムをメモ化
  const filteredItems = useMemo(() => {
    if (activeTab === "all") {
      return DOWNLOAD_ITEMS;
    }
    return DOWNLOAD_ITEMS.filter((item) => item.type === activeTab);
  }, [activeTab]);

  return (
    <>
      <DownloadSection id="downloads">
        <SideDecoration>
          <img src="/010_PageSideTitleSvg/DOWNLOAD.svg" alt="DOWNLOAD" />
        </SideDecoration>

        <Container>
          <SectionTitle>DOWNLOAD</SectionTitle>

          <TabContainer>
            {TABS.map((tab) => (
              <Tab
                key={tab.id}
                $active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Tab>
            ))}
          </TabContainer>

          <CardGrid>
            {filteredItems.map((item) => (
              <DownloadItemCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </CardGrid>
        </Container>
      </DownloadSection>

      <DownloadModal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        image={selectedItem?.image}
        title={selectedItem?.name || ""}
      >
        {selectedItem && <ModalContent item={selectedItem} />}
      </DownloadModal>
    </>
  );
}
