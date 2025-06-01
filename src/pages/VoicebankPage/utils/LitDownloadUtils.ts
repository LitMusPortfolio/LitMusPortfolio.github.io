import type { DownloadItem } from "../types";

// 型定義
type ItemType = "talk" | "sing" | "other";
export type TabId = "all" | ItemType;

// 定数
export const TABS = [
  { id: "all" as const, label: "ALL" },
  { id: "talk" as const, label: "TALK" },
  { id: "sing" as const, label: "SING" },
  { id: "other" as const, label: "OTHER" },
] as const;

// カテゴリー別の色設定
export const CATEGORY_COLORS: Record<
  string,
  { primary: string; secondary: string }
> = {
  トークソフト: { primary: "#00BCD4", secondary: "#0097A7" },
  UTAUソングライブラリ: { primary: "#9C27B0", secondary: "#7B1FA2" },
  画像素材: { primary: "#FF6B6B", secondary: "#EE5A6F" },
  音声素材: { primary: "#4CAF50", secondary: "#388E3C" },
  "3Dモデル": { primary: "#FF9800", secondary: "#F57C00" },
};

// ユーティリティ関数
export const filterItemsByTab = (
  items: DownloadItem[],
  tab: TabId,
): DownloadItem[] => {
  return tab === "all" ? items : items.filter((item) => item.type === tab);
};

const transformLinksForModal = (links: DownloadItem["links"]) => {
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
};

export const prepareModalContent = (item: DownloadItem | null) => {
  if (!item) return null;

  const links = transformLinksForModal(item.links);

  return {
    description: item.modalContent?.detailedDescription || [item.description],
    notes: item.modalContent?.notes || [],
    links: links,
  };
};
