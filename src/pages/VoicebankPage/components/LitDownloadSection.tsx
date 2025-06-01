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
import { Container, Section, SideDecoration } from "../../../components/Layout";
import SectionTitle from "../../../components/SectionTitle";
import { theme } from "../../../styles/theme";
import { DOWNLOAD_ITEMS } from "./LitDownloadAssets";

// 型定義
type ItemType = "talk" | "sing" | "other";
type ItemStatus = "free" | "paid";
type TabId = "all" | ItemType;

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

// 定数
const TABS = [
  { id: "all" as const, label: "ALL" },
  { id: "talk" as const, label: "TALK" },
  { id: "sing" as const, label: "SING" },
  { id: "other" as const, label: "OTHER" },
];

// スタイルコンポーネント
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

// ダウンロードアイテムカードコンポーネント
interface DownloadItemCardProps {
  item: DownloadItem;
  onClick: () => void;
}

const DownloadItemCard = ({ item, onClick }: DownloadItemCardProps) => (
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

// モーダル内容コンポーネント
interface ModalContentProps {
  item: DownloadItem;
}

const ModalContent = ({ item }: ModalContentProps) => {
  const hasDetailedDescription = item.modalContent?.detailedDescription;
  const hasNotes = item.modalContent?.notes;

  const renderLinks = () => {
    const linkEntries = Object.entries(item.links).filter(
      ([_, link]) => link,
    ) as [string, DownloadLink][];

    return linkEntries.map(([key, link]) => (
      <ModalButton
        key={key}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        $primary={key === "primary"}
      >
        {link.text}
      </ModalButton>
    ));
  };

  return (
    <>
      <ModalDescription>
        {hasDetailedDescription ? (
          item.modalContent?.detailedDescription.map((text, idx) => (
            <p key={`desc-${item.id}-${idx}`}>{text}</p>
          ))
        ) : (
          <>
            <p>{item.description}</p>
            {item.status === "paid" && <p>価格: {item.price}</p>}
          </>
        )}
      </ModalDescription>

      {hasNotes && (
        <ModalNotes>
          {item.modalContent?.notes?.map((note, idx) => (
            <p key={`note-${item.id}-${idx}`}>{note}</p>
          ))}
        </ModalNotes>
      )}

      <ModalButtons>{renderLinks()}</ModalButtons>
    </>
  );
};

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
  
  p {
    margin-bottom: 0.5rem;
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
  const filteredItems = useMemo(
    () =>
      activeTab === "all"
        ? DOWNLOAD_ITEMS
        : DOWNLOAD_ITEMS.filter((item) => item.type === activeTab),
    [activeTab],
  );

  const handleItemClick = (item: DownloadItem) => {
    setSelectedItem(item);
  };

  const handleModalClose = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Section id="downloads">
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
                onClick={() => handleItemClick(item)}
              />
            ))}
          </CardGrid>
        </Container>
      </Section>

      <DownloadModal
        isOpen={!!selectedItem}
        onClose={handleModalClose}
        image={selectedItem?.image}
        title={selectedItem?.name || ""}
      >
        {selectedItem && <ModalContent item={selectedItem} />}
      </DownloadModal>
    </>
  );
}
