import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Tab, TabContainer } from "@/components/CardGrid";
import { Container, Section } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/styles/theme";
import { categoryColors } from "@/types";
import { worksData } from "./WorksAssets";

const WorksSection = styled(Section)`
  background-image: url('/LitMusBG.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  padding-top: 6rem;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url('/001_top/LitMusBG.webp');
    z-index: 0;
  }
`;

const ContentWrapper = styled(Container)`
  position: relative;
  z-index: 1;
`;

const StickyHeader = styled.div`
  position: sticky;
  top: 95px; /* header + margin */
  z-index: 10;
  margin-bottom: 2rem;
  padding: 2rem;
  margin-left: -20px;
  margin-right: -20px;
  width: 100%;

  /* スムーズなトランジション */
  transition: all 0.3s ease;
  
  /* タイトルとタブの視認性を確保 */
  > * {
    position: relative;
    z-index: 1;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    top: 50px;
    padding: 1.5rem;
  }
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
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

const VideoThumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
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

export default function Works() {
  const [activeTab, setActiveTab] = useState("all");
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabs = ["all", "music", "illustration", "movie", "other"];

  const filteredWorks = useMemo(() => {
    return activeTab === "all"
      ? worksData
      : worksData.filter((work) => work.type === activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!tabsRef.current) return;

      const currentIndex = tabs.indexOf(activeTab);
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
        setActiveTab(tabs[newIndex]);
        const buttons = tabsRef.current.querySelectorAll('[role="tab"]');
        (buttons[newIndex] as HTMLElement)?.focus();
      }
    };

    const tabContainer = tabsRef.current;
    if (tabContainer) {
      tabContainer.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (tabContainer) {
        tabContainer.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [activeTab]);

  return (
    <WorksSection>
      <ContentWrapper>
        <StickyHeader>
          <SectionTitle>WORKS</SectionTitle>
          <TabContainer
            ref={tabsRef}
            role="tablist"
            aria-label="Filter works by category"
          >
            <Tab
              $active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
              role="tab"
              aria-selected={activeTab === "all"}
              aria-controls="works-grid"
              tabIndex={activeTab === "all" ? 0 : -1}
            >
              ALL
            </Tab>
            <Tab
              $active={activeTab === "music"}
              onClick={() => setActiveTab("music")}
              role="tab"
              aria-selected={activeTab === "music"}
              aria-controls="works-grid"
              tabIndex={activeTab === "music" ? 0 : -1}
            >
              MUSIC
            </Tab>
            <Tab
              $active={activeTab === "illustration"}
              onClick={() => setActiveTab("illustration")}
              role="tab"
              aria-selected={activeTab === "illustration"}
              aria-controls="works-grid"
              tabIndex={activeTab === "illustration" ? 0 : -1}
            >
              ILLUST
            </Tab>
            <Tab
              $active={activeTab === "movie"}
              onClick={() => setActiveTab("movie")}
              role="tab"
              aria-selected={activeTab === "movie"}
              aria-controls="works-grid"
              tabIndex={activeTab === "movie" ? 0 : -1}
            >
              MOVIE
            </Tab>
            <Tab
              $active={activeTab === "other"}
              onClick={() => setActiveTab("other")}
              role="tab"
              aria-selected={activeTab === "other"}
              aria-controls="works-grid"
              tabIndex={activeTab === "other" ? 0 : -1}
            >
              OTHER
            </Tab>
          </TabContainer>
        </StickyHeader>

        <WorksGrid id="works-grid" role="tabpanel" aria-label="Works grid">
          {filteredWorks.map((work) => (
            <WorkCard key={work.id}>
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
          ))}
        </WorksGrid>
      </ContentWrapper>
    </WorksSection>
  );
}
