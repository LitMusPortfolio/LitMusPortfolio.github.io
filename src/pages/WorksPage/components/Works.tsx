import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import FilterTabs, { type TabItem } from "@/components/FilterTabs";
import Grid from "@/components/Grid";
import { Container, Section } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { categoryColors } from "@/types";
import { worksData } from "./WorksAssets";

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
`;

const WorkCategory = styled.span<{ $category: string }>`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: ${({ $category }) => {
    const colors = categoryColors[$category] || {
      primary: "#8a61ff",
      secondary: "#a78bff",
    };
    return `linear-gradient(135deg, ${colors.primary}40, ${colors.secondary}40)`;
  }};
  border-radius: 15px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: 0.05em;
`;

const WorkTitle = styled.h3`
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
`;

const WorkStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.8rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
`;

const WORK_TABS: TabItem[] = [
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
      : worksData.filter((work) => work.type === activeTab);
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
                <VideoThumbnail src={work.image} alt={work.title} />
              </VideoWrapper>
              <WorkInfo>
                <WorkCategory $category={work.category}>
                  {work.category}
                </WorkCategory>
                <WorkTitle>{work.title}</WorkTitle>
                <WorkStats>
                  <span>{work.views}</span>
                  <span>{work.date}</span>
                </WorkStats>
              </WorkInfo>
            </WorkCard>
          )}
          keyExtractor={(work) => work.id}
          id="works-grid"
          role="tabpanel"
          aria-label="Works grid"
        />
      </ContentWrapper>
    </WorksSection>
  );
}
