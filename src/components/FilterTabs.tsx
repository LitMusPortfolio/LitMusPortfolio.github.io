import { forwardRef, useEffect, useRef, useCallback } from "react";
import { StyledButton } from "./StyledButton";
import { TabContainer } from "./TabComponents";

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
}

interface FilterTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  ariaLabel?: string;
  ariaControls?: string;
}

// FilterTabsコンポーネント（タブのキーボードナビゲーション機能付き）
const FilterTabs = forwardRef<HTMLDivElement, FilterTabsProps>(
  (
    {
      tabs,
      activeTab,
      onTabChange,
      ariaLabel = "Filter content",
      ariaControls,
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const tabsRef = ref || internalRef;

    const handleTabClick = useCallback((tabId: string) => {
      onTabChange(tabId);
    }, [onTabChange]);

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        const container = typeof tabsRef === "object" && tabsRef?.current;
        if (!container) return;

        const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
        let newIndex = currentIndex;

        if (e.key === "ArrowRight") {
          e.preventDefault();
          newIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
        } else if (e.key === "Home") {
          e.preventDefault();
          newIndex = 0;
        } else if (e.key === "End") {
          e.preventDefault();
          newIndex = tabs.length - 1;
        }

        if (newIndex !== currentIndex) {
          onTabChange(tabs[newIndex].id);
          const buttons = container.querySelectorAll('[role="tab"]');
          (buttons[newIndex] as HTMLElement)?.focus();
        }
      };

      const container = typeof tabsRef === "object" && tabsRef?.current;
      if (container) {
        container.addEventListener("keydown", handleKeyDown);
      }

      return () => {
        if (container) {
          container.removeEventListener("keydown", handleKeyDown);
        }
      };
    }, [activeTab, tabs, onTabChange, tabsRef]);

    return (
      <TabContainer ref={tabsRef} role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab) => (
          <StyledButton
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={ariaControls}
            tabIndex={activeTab === tab.id ? 0 : -1}
          >
            {tab.label}
          </StyledButton>
        ))}
      </TabContainer>
    );
  },
);

export default FilterTabs;
