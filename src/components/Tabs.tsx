import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { StyledButton } from "./StyledButton";

// Interfaceの定義
interface TabConfig {
  value: string;
  label: string;
}

interface TabsProps<T> {
  tabs: TabConfig[];
  items: T[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  getTabValue: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
}

const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  gap: ${theme.space.md};
  margin-bottom: ${theme.space.lg};
  border-bottom: 2px solid ${theme.colors.text.primary};
  overflow-x: auto;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary}40;
    border-radius: 2px;
  }
`;

// StyledButtonをタブ用にカスタマイズ
const TabButton = StyledButton;

const TabPanel = styled.div`
  width: 100%;
  animation: fadeIn ${theme.animation.duration.base} ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export function Tabs<T extends { id?: string | number }>({
  tabs,
  items,
  activeTab,
  onTabChange,
  getTabValue,
  renderItem,
}: TabsProps<T>) {
  const filteredItems = items.filter((item) => getTabValue(item) === activeTab);

  return (
    <TabsContainer>
      <TabList role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.value}
            role="tab"
            aria-selected={activeTab === tab.value}
            aria-controls={`tabpanel-${tab.value}`}
            $active={activeTab === tab.value}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      <TabPanel
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {filteredItems.map((item, index) => {
          const key = item.id ? String(item.id) : `tab-item-${index}`;
          return <React.Fragment key={key}>{renderItem(item)}</React.Fragment>;
        })}
      </TabPanel>
    </TabsContainer>
  );
}
