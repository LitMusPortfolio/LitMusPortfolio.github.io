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
  height: 23rem;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 55%; /* 16:9 アスペクト比 */
  background: #000;
  overflow: hidden;
`;

const VideoThumbnail = styled(LazyImage)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WorkInfo = styled.div`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
`;

const WorkTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
`;

const WORK_TABS: TabItem<Category | "all">[] = [
  { id: "all", label: "ALL" },
  { id: "music", label: "MUSIC" },
  { id: "illustration", label: "ILLUST" },
  { id: "movie", label: "MOVIE" },
  { id: "other", label: "OTHER" },
];

export default function Works() {
  const [activeTab, setActiveTab] = useState("all");
  const tabsRef = useRef<HTMLDivElement>(null);

  const filteredWorks = useMemo(() => {
    return activeTab === "all"
      ? worksData
      : worksData.filter((work) =>
          work.category.includes(activeTab as Category),
        );
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
            onTabChange={setActiveTab}
            ariaLabel="Filter works by category"
            ariaControls="works-grid"
          />
        </StickyHeader>

        <Grid
          items={filteredWorks}
          renderItem={(work) => (
            <WorkCard>
              <VideoWrapper>
                <VideoThumbnail src={work.thumbnailPath} alt={work.title} />
              </VideoWrapper>
              <WorkInfo>
                <WorkTitle>{work.title}</WorkTitle>
                <p>{work.description}</p>
                <p>{work.requester}</p>
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
