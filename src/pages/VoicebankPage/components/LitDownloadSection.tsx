import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardDescription,
  CardHeader,
  CardInfo,
  CardTag,
  CardTitle,
  Tab,
  TabContainer,
} from "@/components/CardGrid";
import DownloadModal from "@/components/DownloadModal";
import { Container, Section, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { DOWNLOAD_ITEMS } from "./LitDownloadAssets";
import { type DownloadItem, ModalContent } from "./LitDownloadModal";

// 型定義
type ItemType = "talk" | "sing" | "other";
type TabId = "all" | ItemType;

// 定数
const TABS = [
  { id: "all" as const, label: "ALL" },
  { id: "talk" as const, label: "TALK" },
  { id: "sing" as const, label: "SING" },
  { id: "other" as const, label: "OTHER" },
];

// スタイルコンポーネント
// レスポンシブグリッドコンテナ（最大4カラム）
const ResponsiveCardGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  /* デフォルト: 1カラム */
  grid-template-columns: 1fr;
  
  /* スマホ横向き以上: 2カラム */
  @media (min-width: ${theme.breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* タブレット以上: 3カラム */
  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  /* デスクトップ以上: 4カラム（最大） */
  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
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

          <ResponsiveCardGrid>
            {filteredItems.map((item) => (
              <DownloadItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </ResponsiveCardGrid>
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
