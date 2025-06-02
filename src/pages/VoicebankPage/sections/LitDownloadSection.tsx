import { useMemo, useState } from "react";
import styled from "styled-components";
import { Tab, TabContainer } from "@/components/CardGrid";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Container, Section, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import DownloadItemCard from "../components/DownloadItemCard";
import DownloadModal from "../components/DownloadModal";
import { DOWNLOAD_ITEMS } from "../data/LitDownloadAssets";
import { useDownloadModal } from "../hooks/useDownloadModal";
import {
  filterItemsByTab,
  prepareModalContent,
  TABS,
  type TabId,
} from "../utils/LitDownloadUtils";

// スタイルコンポーネント
// レスポンシブグリッドコンテナ（Worksと同じスタイル）
const DownloadGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// メインコンポーネント
export default function LitDownloadSection() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const { selectedItem, openModal, closeModal, isOpen } = useDownloadModal();

  // フィルタリングされたアイテムをメモ化
  const filteredItems = useMemo(
    () => filterItemsByTab(DOWNLOAD_ITEMS, activeTab),
    [activeTab],
  );

  // モーダルコンテンツの準備
  const modalContent = useMemo(
    () => prepareModalContent(selectedItem),
    [selectedItem],
  );

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
                onClick={() => openModal(item)}
              />
            ))}
          </DownloadGrid>
        </Container>
      </Section>

      <ErrorBoundary
        fallback={
          <div>
            ダウンロードモーダルでエラーが発生しました。
            コンソールを確認してください。
          </div>
        }
      >
        <DownloadModal
          isOpen={isOpen}
          onClose={closeModal}
          image={selectedItem?.image}
          title={selectedItem?.name || ""}
          content={modalContent}
        />
      </ErrorBoundary>
    </>
  );
}
