"use client";

import { useMemo, useRef, useState } from "react";
import { BackgroundSection } from "@/components/BackgroundSection";
import FilterTabs, { type TabItem } from "@/components/FilterTabs";
import Grid from "@/components/Grid";
import { Container, SideDecoration } from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { type Category, worksData } from "../data/WorksAssets";

type TabId = Category | "all";

// YouTubeとニコニコ動画のIDを抽出する関数
const getVideoInfo = (
  url: string,
): { type: "youtube" | "nicovideo" | "unknown"; id: string | null } => {
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|live\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/,
  );
  if (youtubeMatch) {
    return { type: "youtube", id: youtubeMatch[1] };
  }

  const nicovideoMatch = url.match(/nicovideo\.jp\/watch\/(sm\d+)/);
  if (nicovideoMatch) {
    return { type: "nicovideo", id: nicovideoMatch[1] };
  }

  return { type: "unknown", id: null };
};

// 動画プレビューコンポーネント
type VideoPreviewProps = {
  link: string;
};

function VideoPreview({ link }: VideoPreviewProps) {
  const { type, id } = getVideoInfo(link);

  if (type === "youtube" && id) {
    return (
      <>
        <img
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
          alt="YouTube thumbnail"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes("hqdefault")) {
              target.src = `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
            }
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-white opacity-80 [text-shadow:0_0_0.5em_black]">
          ▶
        </div>
      </>
    );
  }

  if (type === "nicovideo" && id) {
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

  return <div className="h-full w-full bg-black" />;
}

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
      <Container className="relative z-[var(--z-content)]">
        <div className="sticky z-[var(--z-dropdown)] max-sm:top-[50px] max-sm:p-6">
          <SectionTitle>WORKS</SectionTitle>
          <FilterTabs
            ref={tabsRef}
            tabs={WORK_TABS}
            activeTab={activeTab}
            onTabChange={(tabId) => setActiveTab(tabId as TabId)}
            ariaLabel="Filter works by category"
            ariaControls="works-grid"
          />
        </div>

        <Grid
          items={filteredWorks}
          renderItem={(work) => (
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex h-full cursor-pointer flex-col overflow-hidden text-inherit no-underline transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(139,92,246,0.3)]"
            >
              <div className="relative w-full overflow-hidden bg-black pb-[56.25%] [&_iframe]:pointer-events-none [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-none [&_img]:absolute [&_img]:inset-0 [&_img]:h-full [&_img]:w-full [&_img]:object-cover">
                <VideoPreview link={work.link} />
              </div>
              <div className="flex h-full flex-col items-center justify-between gap-[0.2rem] bg-black/50 px-4 pb-6 pt-4">
                <p className="text-[0.7rem]">{work.requester}</p>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
              </div>
            </a>
          )}
          keyExtractor={(work) => `${work.title}-${work.link}`}
          id="works-grid"
          role="tabpanel"
          aria-label="Works grid"
        />
      </Container>
    </BackgroundSection>
  );
}
