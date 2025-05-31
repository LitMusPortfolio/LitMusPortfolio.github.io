import { useState } from "react";
import styled from "styled-components";

const WorksSection = styled.section`
  min-height: 100vh;
  padding: 8rem 2rem;
  background: #050505;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 900;
  letter-spacing: 0.1em;
  margin-bottom: 4rem;
  text-align: center;
  background: linear-gradient(45deg, #ff00ff, #00ffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.8rem 2rem;
  background: ${(props) => (props.$active ? "rgba(255, 0, 255, 0.2)" : "transparent")};
  border: 2px solid ${(props) => (props.$active ? "#ff00ff" : "rgba(255, 255, 255, 0.2)")};
  border-radius: 30px;
  color: ${(props) => (props.$active ? "#ff00ff" : "#fff")};
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 0, 255, 0.1);
    border-color: #ff00ff;
  }
`;

const WorksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const WorkCard = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(255, 0, 255, 0.3);
    
    img {
      transform: scale(1.1);
    }
    
    .overlay {
      opacity: 1;
    }
  }
`;

const WorkImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const WorkInfo = styled.div`
  padding: 1.5rem;
`;

const WorkTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const WorkCategory = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 0, 255, 0.2);
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

const WorkDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  span {
    font-size: 1.2rem;
    font-weight: 600;
    color: #ff00ff;
  }
`;

const SideDecoration = styled.div`
  position: absolute;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  
  img {
    height: 200px;
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

interface Work {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  image: string;
  link?: string;
}

const worksData: Work[] = [
  {
    id: 1,
    title: "離途 - VOICEVOX楽曲",
    category: "音楽制作",
    type: "music",
    description: "VOICEVOX「四国めたん」を使用したオリジナル楽曲",
    image: "/001_top/離途バナー_差し替え予定.webp",
  },
  {
    id: 2,
    title: "Lit キャラクターデザイン",
    category: "イラスト",
    type: "illustration",
    description: "UTAUボイスライブラリ「Lit」のキャラクターデザイン",
    image: "/101_Lit/Litlogo.webp",
  },
  {
    id: 3,
    title: "MV制作 - Digital Dreams",
    category: "映像制作",
    type: "movie",
    description: "オリジナル楽曲のミュージックビデオ制作",
    image: "/001_top/Moviedummy.png",
  },
  {
    id: 4,
    title: "3DCGモデリング",
    category: "3DCG",
    type: "3d",
    description: "Blenderを使用したキャラクターモデリング",
    image: "/101_Lit/LitDummy.png",
  },
];

export default function Works() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredWorks =
    activeTab === "all"
      ? worksData
      : worksData.filter((work) => work.type === activeTab);

  return (
    <WorksSection id="works">
      <SideDecoration>
        <img src="/010_PageSideTitleSvg/WORKS.svg" alt="WORKS" />
      </SideDecoration>

      <Container>
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
            ILLUSTRATION
          </Tab>
          <Tab
            $active={activeTab === "movie"}
            onClick={() => setActiveTab("movie")}
          >
            MOVIE
          </Tab>
          <Tab $active={activeTab === "3d"} onClick={() => setActiveTab("3d")}>
            3D
          </Tab>
        </TabContainer>

        <WorksGrid>
          {filteredWorks.map((work) => (
            <WorkCard key={work.id}>
              <WorkImage src={work.image} alt={work.title} />
              <WorkInfo>
                <WorkCategory>{work.category}</WorkCategory>
                <WorkTitle>{work.title}</WorkTitle>
                <WorkDescription>{work.description}</WorkDescription>
              </WorkInfo>
              <Overlay className="overlay">
                <span>VIEW MORE</span>
              </Overlay>
            </WorkCard>
          ))}
        </WorksGrid>
      </Container>
    </WorksSection>
  );
}
