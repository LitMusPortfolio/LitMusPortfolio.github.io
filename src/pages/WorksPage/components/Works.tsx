import { useState } from "react";
import styled from "styled-components";
import {
  Card,
  CardDescription,
  CardGrid,
  CardGridLayout,
  CardImage,
  CardInfo,
  CardOverlay,
  CardTitle,
  Tab,
  TabContainer,
} from "../../../components/CardGrid";

const WorkCategory = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: rgba(255, 0, 255, 0.2);
  border-radius: 15px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
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
    <CardGridLayout
      title="WORKS"
      sideDecorationSrc="/010_PageSideTitleSvg/WORKS.svg"
    >
      <TabContainer>
        <Tab $active={activeTab === "all"} onClick={() => setActiveTab("all")}>
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

      <CardGrid>
        {filteredWorks.map((work) => (
          <Card key={work.id}>
            <CardImage src={work.image} alt={work.title} />
            <CardInfo>
              <WorkCategory>{work.category}</WorkCategory>
              <CardTitle>{work.title}</CardTitle>
              <CardDescription>{work.description}</CardDescription>
            </CardInfo>
            <CardOverlay className="overlay">
              <span>VIEW MORE</span>
            </CardOverlay>
          </Card>
        ))}
      </CardGrid>
    </CardGridLayout>
  );
}
