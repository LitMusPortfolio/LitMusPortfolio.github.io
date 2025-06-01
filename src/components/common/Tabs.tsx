import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

// タブの設定型
export interface TabConfig {
  id: string;
  label: string;
  count?: number;
}

// Tabsコンポーネントのプロップス
interface TabsProps<T> {
  items: T[];
  tabs: TabConfig[];
  renderItem: (item: T) => React.ReactNode;
  filterFn: (item: T, activeTab: string) => boolean;
  defaultTab?: string;
  className?: string;
  onTabChange?: (tabId: string) => void;
}

// タブコンテナ
const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  position: relative;
  
  /* 右端まで伸びる罫線 */
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: rgba(255, 255, 255, 0.2);
    margin-left: 2rem;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-wrap: wrap;
    
    &::after {
      display: none;
    }
  }
`;

// タブボタン
const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.8rem 2rem;
  background: ${(props) => (props.$active ? "rgba(139, 92, 246, 0.2)" : "transparent")};
  border: 2px solid ${(props) => (props.$active ? theme.colors.primary.main : "rgba(255, 255, 255, 0.2)")};
  border-radius: 30px;
  color: ${(props) => (props.$active ? theme.colors.primary.main : "#fff")};
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(139, 92, 246, 0.1);
    border-color: ${theme.colors.primary.main};
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.4);
  }
  
  &:focus:not(:focus-visible) {
    box-shadow: none;
  }
`;

// タブパネル
const TabPanel = styled.div`
  width: 100%;
`;

// 汎用Tabsコンポーネント
export function Tabs<T extends { id?: string | number }>({
  items,
  tabs,
  renderItem,
  filterFn,
  defaultTab,
  className,
  onTabChange,
}: TabsProps<T>): JSX.Element {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "");

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  const filteredItems = items.filter((item) => filterFn(item, activeTab));

  return (
    <div className={className}>
      <TabContainer role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            $active={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
            {tab.count !== undefined && ` (${tab.count})`}
          </TabButton>
        ))}
      </TabContainer>

      <TabPanel
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {filteredItems.map((item, index) => {
          const key = item.id ? String(item.id) : `tab-item-${index}`;
          return <React.Fragment key={key}>{renderItem(item)}</React.Fragment>;
        })}
      </TabPanel>
    </div>
  );
}

// Named exports for backward compatibility
export { TabContainer, TabButton as Tab };
