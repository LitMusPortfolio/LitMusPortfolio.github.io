import { forwardRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TabItem<T extends string = string> = {
  id: T;
  label: string;
};

type FilterTabsProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  ariaLabel?: string;
  ariaControls?: string;
};

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
    return (
      <Tabs value={activeTab} onValueChange={onTabChange}>
        <TabsList ref={ref} variant="filter" aria-label={ariaLabel}>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              variant="styled"
              underlineOnActive
              aria-controls={ariaControls}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    );
  },
);

FilterTabs.displayName = "FilterTabs";

export default FilterTabs;
