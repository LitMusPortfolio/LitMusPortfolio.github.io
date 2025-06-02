import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import FilterTabs, { type TabItem } from "@/components/FilterTabs";
import Grid from "@/components/Grid";
import { Container, Section } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { type Category, worksData } from "../data/WorksAssets";

const WorksSection = styled(Section)`
  background-image: url('/LitMusBG.webp');
`;

const ContentWrapper = styled(Container)`
  position: relative;
  z-index: 1;
`;

const StickyHeader = styled.div`
  position: sticky;
  z-index: 10;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 50px;
    padding: 1.5rem;
  }
`;

const WorkCard = styled.article`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: default;
  pointer-events: none;
  height: 22rem;
  display: flex;
  flex-direction: column;
`;

const VideoWrapper = styled.div`
  display: flex;
  padding: 1em;
`;

const WorkInfo = styled.div`
  padding: 1rem;
  padding-bottom: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2rem;
`;

const WorkRequester = styled.p`
  font-size: 0.7rem;
`;

type TabId = Category | "all";

const WORK_TABS: TabItem<TabId>[] = [
  { id: "all", label: "ALL" },
  { id: "music", label: "MUSIC" },
  { id: "illustration", label: "ILLUST" },
  { id: "movie", label: "MOVIE" },
  { id: "other", label: "OTHER" },
];

export default function Works() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredWorks = useMemo(() => {
    return activeTab === "all"
      ? worksData
      : worksData.filter((work) => work.category.includes(activeTab));
  }, [activeTab]);

  return (
    <WorksSection>
      <ContentWrapper>
        <StickyHeader>
          <SectionTitle>WORKS</SectionTitle>
          <FilterTabs
            ref={tabsRef}
            tabs={WORK_TABS}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as TabId)}
            ariaLabel="Filter works by category"
            ariaControls="works-grid"
          />
        </StickyHeader>

        <Grid
          items={filteredWorks}
          renderItem={(work) => (
            <WorkCard>
              <VideoWrapper>
                <LazyImage src={work.thumbnailPath} alt={work.title} />
              </VideoWrapper>
              <WorkInfo>
                <WorkRequester>{work.requester}</WorkRequester>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </WorkInfo>
            </WorkCard>
          )}
          keyExtractor={(work) => work.title}
          id="works-grid"
          role="tabpanel"
          aria-label="Works grid"
        />
      </ContentWrapper>
    </WorksSection>
  );
}
