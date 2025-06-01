import { useCallback, useState } from "react";
import type { DownloadItem } from "../types";

export const useDownloadModal = () => {
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
};
