import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import FilterTabs, { type TabItem } from "@/components/FilterTabs";
import Grid from "@/components/Grid";
import { Container, SideDecoration } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { type Category, worksData } from "../data/WorksAssets";

const ContentWrapper = styled(Container)`
  position: relative;
  z-index: ${theme.zIndex.content};
`;

const StickyHeader = styled.div`
  position: sticky;
  z-index: ${theme.zIndex.dropdown};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: ${theme.spacing.headerHeightMobile};
    padding: ${theme.space.md};
  }
`;

const WorkCard = styled.article`
  background: ${theme.effects.glassmorphism.background};
  backdrop-filter: ${theme.effects.glassmorphism.backdropFilter};
  -webkit-backdrop-filter: ${theme.effects.glassmorphism.backdropFilter};
  border: ${theme.effects.glassmorphism.border};
  border-radius: ${theme.effects.glassmorphism.borderRadius};
  overflow: hidden;
  cursor: default;
  pointer-events: none;
  height: 22rem;
  display: flex;
  flex-direction: column;
`;

const VideoWrapper = styled.div`
  display: flex;
  padding: ${theme.space.sm};
`;

const WorkInfo = styled.div`
  padding: ${theme.space.sm};
  padding-bottom: ${theme.space.md};
  background: rgba(0, 0, 0, ${theme.opacity[50]});
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2rem;
`;

const WorkRequester = styled.p`
  font-size: ${theme.typography.fontSize.xs};
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
    <BackgroundSection backgroundImage="/LitMusBG.webp">
      <SideDecoration svgPath="/010_PageSideTitleSvg/WORKS.svg" />
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
    </BackgroundSection>
  );
}
