import { useState } from "react";
import styled from "styled-components";
import { Tab, TabContainer } from "@/components/CardGrid";
import { Container, Section } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { glassmorphism } from "@/styles/utils";
import { categoryColors } from "@/types";
import { worksData } from "./WorksAssets";

const WorksSection = styled(Section)`
  background-image: url('/LitMusBG.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  
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
  
  @media (max-width: ${(props) => props.theme.breakpoints?.mobile || "768px"}) {
    padding-top: 100px;
  }
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const WorkCard = styled.article`
  ${glassmorphism}
  border-radius: 12px;
  overflow: hidden;
  cursor: default;
  pointer-events: none;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 アスペクト比 */
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
  margin: 0.5rem 0;
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

  const filteredWorks =
    activeTab === "all"
      ? worksData
      : worksData.filter((work) => work.type === activeTab);

  return (
    <>
      <WorksSection>
        <ContentWrapper>
          <SectionTitle>WORKS</SectionTitle>

          <TabContainer>
            <Tab
              $active={activeTab === "all"}
              onClick={() => setActiveTab("all")}
            >
              ALL
            </Tab>
            <Tab
              $active={activeTab === "music"}
              onClick={() => setActiveTab("music")}
            >
              MUSIC
            </Tab>
            <Tab
              $active={activeTab === "illustration"}
              onClick={() => setActiveTab("illustration")}
            >
              ILLUST
            </Tab>
            <Tab
              $active={activeTab === "movie"}
              onClick={() => setActiveTab("movie")}
            >
              MOVIE
            </Tab>
            <Tab
              $active={activeTab === "other"}
              onClick={() => setActiveTab("other")}
            >
              OTHER
            </Tab>
          </TabContainer>

          <WorksGrid>
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
    </>
  );
}
