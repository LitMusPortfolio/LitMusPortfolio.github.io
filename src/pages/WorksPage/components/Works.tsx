import { useState } from "react";
import styled from "styled-components";

const WorksSection = styled.section`
  min-height: 100vh;
  background-image: url('/LitMusBG.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(20, 0, 50, 0.8) 0%, rgba(40, 20, 80, 0.9) 100%);
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  padding: 120px 3rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 100px 1.5rem 1.5rem;
  }
`;

const PageTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 0.1em;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.8rem 2rem;
  background: ${(props) =>
    props.$active ? "rgba(147, 51, 234, 0.5)" : "rgba(255, 255, 255, 0.1)"};
  backdrop-filter: blur(10px);
  border: 1px solid ${(props) =>
    props.$active ? "rgba(147, 51, 234, 0.8)" : "rgba(255, 255, 255, 0.2)"};
  color: ${(props) => (props.$active ? "#fff" : "rgba(255, 255, 255, 0.8)")};
  border-radius: 30px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${(props) =>
      props.$active ? "rgba(147, 51, 234, 0.6)" : "rgba(255, 255, 255, 0.15)"};
    color: #fff;
    transform: translateY(-2px);
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    
    .play-button {
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
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

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: rgba(255, 0, 0, 0.8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    width: 0;
    height: 0;
    border-left: 20px solid white;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    margin-left: 5px;
  }
`;

const WorkInfo = styled.div`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.5);
`;

const WorkCategory = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(147, 51, 234, 0.3);
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

interface Work {
  id: number;
  title: string;
  category: string;
  type: string;
  description: string;
  image: string;
  link?: string;
  videoId?: string;
  views?: string;
  date?: string;
}

const worksData: Work[] = [
  {
    id: 1,
    title: "消えたいと思うだけで",
    category: "MUSIC",
    type: "music",
    description: "VOICEVOX「四国めたん」を使用したオリジナル楽曲",
    image: "/001_top/離途バナー_差し替え予定.webp",
    videoId: "dQw4w9WgXcQ", // 実際のYouTube IDに置き換えてください
    views: "1.2万回視聴",
    date: "2024.03.15",
  },
  {
    id: 2,
    title: "夜明けの向こう側",
    category: "MUSIC",
    type: "music",
    description: "VOICEVOX楽曲第2弾",
    image: "/001_top/Moviedummy.png",
    videoId: "dQw4w9WgXcQ",
    views: "8,542回視聴",
    date: "2024.02.28",
  },
  {
    id: 3,
    title: "Lit キャラクターイラスト",
    category: "ILLUST",
    type: "illustration",
    description: "UTAUボイスライブラリ「Lit」のキャラクターデザイン",
    image: "/101_Lit/Litlogo.webp",
    views: "5,234回視聴",
    date: "2024.01.20",
  },
  {
    id: 4,
    title: "Digital Dreams MV",
    category: "MOVIE",
    type: "movie",
    description: "オリジナル楽曲のミュージックビデオ制作",
    image: "/001_top/Moviedummy.png",
    videoId: "dQw4w9WgXcQ",
    views: "15,678回視聴",
    date: "2024.01.10",
  },
  {
    id: 5,
    title: "3Dキャラクターモデル",
    category: "3D",
    type: "3d",
    description: "Blenderを使用したキャラクターモデリング",
    image: "/101_Lit/LitDummy.png",
    views: "3,456回視聴",
    date: "2023.12.25",
  },
  {
    id: 6,
    title: "シンセティックボイス実験",
    category: "OTHER",
    type: "other",
    description: "AIボイスを使用した実験的作品",
    image: "/001_top/Moviedummy.png",
    views: "2,890回視聴",
    date: "2023.12.15",
  },
  {
    id: 7,
    title: "季節の移ろい",
    category: "MUSIC",
    type: "music",
    description: "四季をテーマにした楽曲",
    image: "/001_top/離途バナー_差し替え予定.webp",
    videoId: "dQw4w9WgXcQ",
    views: "9,876回視聴",
    date: "2023.11.30",
  },
  {
    id: 8,
    title: "ファンタジーイラスト集",
    category: "ILLUST",
    type: "illustration",
    description: "幻想的な世界観のイラスト作品",
    image: "/101_Lit/Litlogo.webp",
    views: "4,321回視聴",
    date: "2023.11.15",
  },
  {
    id: 9,
    title: "サイバーパンクMV",
    category: "MOVIE",
    type: "movie",
    description: "近未来的な映像表現",
    image: "/001_top/Moviedummy.png",
    videoId: "dQw4w9WgXcQ",
    views: "7,890回視聴",
    date: "2023.10.30",
  },
  {
    id: 10,
    title: "ローポリキャラクター",
    category: "3D",
    type: "3d",
    description: "スタイライズされた3Dモデル",
    image: "/101_Lit/LitDummy.png",
    views: "2,345回視聴",
    date: "2023.10.15",
  },
  {
    id: 11,
    title: "実験的サウンドスケープ",
    category: "OTHER",
    type: "other",
    description: "環境音を取り入れた音響作品",
    image: "/001_top/Moviedummy.png",
    views: "1,567回視聴",
    date: "2023.09.30",
  },
  {
    id: 12,
    title: "夏の終わりに",
    category: "MUSIC",
    type: "music",
    description: "夏の思い出を歌った楽曲",
    image: "/001_top/離途バナー_差し替え予定.webp",
    videoId: "dQw4w9WgXcQ",
    views: "11,234回視聴",
    date: "2023.09.15",
  },
];

export default function Works() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredWorks =
    activeTab === "all"
      ? worksData
      : worksData.filter((work) => work.type === activeTab);

  return (
    <WorksSection>
      <ContentWrapper>
        <PageTitle>WORKS</PageTitle>

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
                {work.videoId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${work.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <PlayButton className="play-button" />
                  </a>
                )}
              </VideoWrapper>
              <WorkInfo>
                <WorkCategory>{work.category}</WorkCategory>
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
