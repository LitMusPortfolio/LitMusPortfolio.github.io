import { useMemo, useState } from "react";
import styled from "styled-components";
import { Tab, TabContainer } from "@/components/CardGrid";
import DownloadModal from "@/components/DownloadModal";
import { Container, Section, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { cardHoverEffect, glassmorphism } from "@/styles/utils";
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
// レスポンシブグリッドコンテナ（Worksと同じスタイル）
const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const DownloadCard = styled.article`
  ${glassmorphism}
  border-radius: 12px;
  overflow: hidden;
  ${cardHoverEffect}
  cursor: pointer;
`;

// サムネイル表示エリア（16:9アスペクト比）
const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 アスペクト比 */
  background: #000;
  overflow: hidden;
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// デフォルトのサムネイル（画像がない場合）
const DefaultThumbnail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a0a3e 0%, #2d1b69 50%, #3e2980 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CardInfo = styled.div`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
`;

const CardTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  margin: 0.5rem 0;
  font-weight: 600;
  line-height: 1.4;
`;

const CardDescription = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin: 0.5rem 0;
`;

const CardStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
`;

const CardStatus = styled.span<{ $free?: boolean }>`
  font-weight: bold;
  color: ${(props) => (props.$free ? "#4CAF50" : theme.colors.primary.light)};
`;

// カテゴリー別の色設定（categoryColorsのように色情報を持つ）
const CATEGORY_COLORS: Record<string, { primary: string; secondary: string }> =
  {
    トークソフト: { primary: "#00BCD4", secondary: "#0097A7" },
    UTAUソングライブラリ: { primary: "#9C27B0", secondary: "#7B1FA2" },
    画像素材: { primary: "#FF6B6B", secondary: "#EE5A6F" },
    音声素材: { primary: "#4CAF50", secondary: "#388E3C" },
    "3Dモデル": { primary: "#FF9800", secondary: "#F57C00" },
  };

// カテゴリータグコンポーネント（Worksと同じスタイル）
const CategoryTag = styled.span<{ $category: string }>`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: ${({ $category }) => {
    const colors = CATEGORY_COLORS[$category] || {
      primary: "#8a61ff",
      secondary: "#a78bff",
    };
    return `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`;
  }};
  border-radius: 15px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.05em;
`;

// ダウンロードアイテムカードコンポーネント
interface DownloadItemCardProps {
  item: DownloadItem;
  onClick: () => void;
}

const DownloadItemCard = ({ item, onClick }: DownloadItemCardProps) => (
  <DownloadCard onClick={onClick}>
    <ThumbnailWrapper>
      {item.image ? (
        <ThumbnailImage src={item.image} alt={item.name} />
      ) : (
        <DefaultThumbnail />
      )}
    </ThumbnailWrapper>
    <CardInfo>
      <CategoryTag $category={item.category}>{item.category}</CategoryTag>
      <CardTitle>{item.name}</CardTitle>
      <CardDescription>{item.description}</CardDescription>
      <CardStats>
        <CardStatus $free={item.status === "free"}>
          {item.status === "free" ? "FREE" : item.price}
        </CardStatus>
        <span>Download</span>
      </CardStats>
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

          <DownloadGrid>
            {filteredItems.map((item) => (
              <DownloadItemCard
                key={item.id}
                item={item}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </DownloadGrid>
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
