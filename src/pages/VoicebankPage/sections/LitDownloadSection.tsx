import { useMemo, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Grid from "@/components/Grid";
import { Container, Section, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { Tab, TabContainer } from "@/components/TabComponents";
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

          <Grid
            items={filteredItems}
            renderItem={(item) => (
              <DownloadItemCard item={item} onClick={() => openModal(item)} />
            )}
            keyExtractor={(item) => item.id}
          />
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
          content={modalContent || undefined}
        />
      </ErrorBoundary>
    </>
  );
}
