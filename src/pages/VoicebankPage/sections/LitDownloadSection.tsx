import { useCallback, useMemo, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import FilterTabs from "@/components/FilterTabs";
import Grid from "@/components/Grid";
import { Container, Section, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
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

  // タブ変更ハンドラーをメモ化
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId as TabId);
  }, []);

  // グリッドアイテムのレンダリング関数をメモ化
  const renderGridItem = useCallback((item: typeof DOWNLOAD_ITEMS[0]) => (
    <DownloadItemCard item={item} onClick={() => openModal(item)} />
  ), [openModal]);

  // キー抽出関数をメモ化
  const keyExtractor = useCallback((item: typeof DOWNLOAD_ITEMS[0]) => item.id, []);

  return (
    <>
      <Section id="downloads">
        <SideDecoration>
          <img src="/010_PageSideTitleSvg/DOWNLOAD.svg" alt="DOWNLOAD" />
        </SideDecoration>

        <Container>
          <SectionTitle isPurple>DOWNLOAD</SectionTitle>

          <FilterTabs
            tabs={[...TABS]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            ariaLabel="Filter downloads by category"
          />

          <Grid
            items={filteredItems}
            renderItem={renderGridItem}
            keyExtractor={keyExtractor}
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
