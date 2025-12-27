import { useCallback, useMemo, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import FilterTabs from "@/components/FilterTabs";
import Grid from "@/components/Grid";
import { Container, Section } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import DownloadItemCard from "./DownloadItemCard";
import DownloadModal from "./DownloadModal";
import { DOWNLOAD_ITEMS, type DownloadItem } from "./data";

// ============================================
// 型定義
// ============================================

type ItemType = "talk" | "sing" | "other";
type TabId = "all" | ItemType;

// ============================================
// 定数
// ============================================

const TABS = [
  { id: "all" as const, label: "ALL" },
  { id: "talk" as const, label: "TALK" },
  { id: "sing" as const, label: "SING" },
  { id: "other" as const, label: "OTHER" },
] as const;

// ============================================
// フック
// ============================================

function useDownloadModal() {
  const [selectedItem, setSelectedItem] = useState<DownloadItem | null>(null);

  const openModal = useCallback((item: DownloadItem) => {
    setSelectedItem(item);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedItem(null);
  }, []);

  return {
    selectedItem,
    openModal,
    closeModal,
    isOpen: selectedItem !== null,
  };
}

// ============================================
// ユーティリティ
// ============================================

function filterItemsByTab(items: DownloadItem[], tab: TabId): DownloadItem[] {
  return tab === "all" ? items : items.filter((item) => item.type === tab);
}

function transformLinksForModal(links: DownloadItem["links"]) {
  if (!links) return [];

  return Object.entries(links)
    .filter(([_, link]) => link !== undefined && link !== null)
    .map(([key, link]) => {
      if (!link) return null;
      return {
        text: link.text || "",
        url: link.url || "",
        primary: key === "primary",
      };
    })
    .filter(
      (item): item is { text: string; url: string; primary: boolean } =>
        item !== null && Boolean(item.text) && Boolean(item.url),
    );
}

function prepareModalContent(item: DownloadItem | null) {
  if (!item) return null;

  let links: { text: string; url: string; primary: boolean }[] = [];

  if (item.modalContent?.links && Array.isArray(item.modalContent.links)) {
    links = item.modalContent.links.map((link, index) => ({
      text: link.text,
      url: link.url,
      primary: index === 0,
    }));
  } else if (Array.isArray(item.links)) {
    links = item.links.map((link, index) => ({
      text: link.text,
      url: link.url,
      primary: index === 0,
    }));
  } else if (item.links && typeof item.links === "object") {
    links = transformLinksForModal(item.links);
  }

  const description = item.modalContent?.description
    ? item.modalContent.description.map((paragraph) => paragraph.join(" "))
    : [item.description];

  return {
    description,
    links,
  };
}

// ============================================
// コンポーネント
// ============================================

export default function LitDownloadSection() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const { selectedItem, openModal, closeModal, isOpen } = useDownloadModal();

  const filteredItems = useMemo(
    () => filterItemsByTab(DOWNLOAD_ITEMS, activeTab),
    [activeTab],
  );

  const modalContent = useMemo(
    () => prepareModalContent(selectedItem),
    [selectedItem],
  );

  return (
    <Section id="downloads">
      <Container>
        <SectionTitle isPurple>DOWNLOAD</SectionTitle>

        <FilterTabs
          tabs={[...TABS]}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as TabId)}
          ariaLabel="Filter downloads by category"
        />

        <Grid
          items={filteredItems}
          renderItem={(item) => (
            <DownloadItemCard item={item} onClick={() => openModal(item)} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Container>

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
    </Section>
  );
}
