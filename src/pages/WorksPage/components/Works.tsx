import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { BackgroundSection } from "@/components/BackgroundSection";
import FilterTabs, { type TabItem } from "@/components/FilterTabs";
import Grid from "@/components/Grid";
import { Container, SideDecoration } from "@/components/Layout";
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
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 アスペクト比 */
  background: #000;
  overflow: hidden;
  
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    pointer-events: none;
  }
`;

const WorkInfo = styled.div`
  padding: ${theme.space.sm};
  padding-bottom: ${theme.space.md};
  background: rgba(0, 0, 0, ${theme.opacity[50]});
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 0.2rem;
`;

const WorkRequester = styled.p`
  font-size: ${theme.typography.fontSize.xs};
`;

type TabId = Category | "all";

// YouTubeとニコニコ動画のIDを抽出する関数
const getVideoInfo = (
  url: string,
): { type: "youtube" | "nicovideo" | "unknown"; id: string | null } => {
  // YouTube URLパターン
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (youtubeMatch) {
    return { type: "youtube", id: youtubeMatch[1] };
  }

  // ニコニコ動画 URLパターン
  const nicovideoMatch = url.match(/nicovideo\.jp\/watch\/(sm\d+)/);
  if (nicovideoMatch) {
    return { type: "nicovideo", id: nicovideoMatch[1] };
  }

  return { type: "unknown", id: null };
};

// 動画プレビューコンポーネント
const VideoPreview: React.FC<{ link: string }> = ({ link }) => {
  const { type, id } = getVideoInfo(link);

  if (type === "youtube" && id) {
    // YouTubeはサムネイル表示
    return (
      <>
        <img
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
          alt="YouTube thumbnail"
          loading="lazy"
          onError={(e) => {
            // hqdefaultが存在しない場合はmqdefaultにフォールバック
            const target = e.target as HTMLImageElement;
            if (target.src.includes("hqdefault")) {
              target.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
            }
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            color: "white",
            textShadow: "0 0 0.5em black",
            opacity: 0.8,
            pointerEvents: "none",
          }}
        >
          ▶
        </div>
      </>
    );
  }

  if (type === "nicovideo" && id) {
    // ニコニコ動画は埋め込み表示
    return (
      <iframe
        key={`nicovideo-${id}`}
        src={`https://embed.nicovideo.jp/watch/${id}`}
        loading="lazy"
        title="Nicovideo player"
        allowFullScreen
      />
    );
  }

  // その他は黒背景に再生ボタンを表示
  return <div style={{ width: "100%", height: "100%", background: "#000" }} />;
};

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
            <WorkCard
              onClick={() =>
                window.open(work.link, "_blank", "noopener,noreferrer")
              }
            >
              <ThumbnailWrapper>
                <VideoPreview link={work.link} />
              </ThumbnailWrapper>
              <WorkInfo>
                <WorkRequester>{work.requester}</WorkRequester>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </WorkInfo>
            </WorkCard>
          )}
          keyExtractor={(work) => `${work.title}-${work.link}`}
          id="works-grid"
          role="tabpanel"
          aria-label="Works grid"
        />
      </ContentWrapper>
    </BackgroundSection>
  );
}
