import { useNavigate } from "react-router-dom";
import { Section } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import { SocialLinks as SocialLinksComponent } from "@/components/SocialLinks";
import TextWithBackground from "@/components/TextWithBackground";
import { Button } from "@/components/ui/button";
import { VideoBackground } from "@/components/VideoBackground";

export default function Home() {
  const videoSources = [
    { src: "/001_top/LitMusHPTopMovie.mp4", type: "video/mp4" },
    { src: "/001_top/LitMusHPTopMovie.webm", type: "video/webm" },
  ];
  const navigate = useNavigate();

  return (
    <Section className="fixed inset-0 h-screen w-full overflow-hidden p-0">
      <VideoBackground sources={videoSources} autoPlay loop muted playsInline />

      {/* メインコンテンツ */}
      <div className="absolute bottom-32 left-12 z-[1] text-left text-[var(--color-text-primary)] max-sm:bottom-32 max-sm:left-8">
        <h1 className="m-0 leading-none text-[var(--color-text-primary)]">
          <TextWithBackground>LITMUS</TextWithBackground>
        </h1>
        <div className="mt-16 flex flex-col gap-4">
          <div className="flex flex-wrap justify-start gap-4 font-[Montserrat]">
            <TextWithBackground>#MUSIC</TextWithBackground>
            <TextWithBackground>#VOCALOIDPRODUCE</TextWithBackground>
          </div>
          <div className="flex flex-wrap justify-start gap-4 font-[Montserrat]">
            <TextWithBackground>#ILLUSTRATION</TextWithBackground>
            <TextWithBackground>#DESIGN</TextWithBackground>
          </div>
          <div className="flex flex-wrap justify-start gap-4 font-[Montserrat]">
            <TextWithBackground>#3D</TextWithBackground>
            <TextWithBackground>#MOVIE</TextWithBackground>
            <TextWithBackground>#SYNTHETIC VOICE</TextWithBackground>
          </div>
        </div>
      </div>

      {/* VOICEVOXバナー */}
      <Button
        variant="ghost"
        className="absolute right-12 top-24 h-auto p-0 backdrop-blur-[10px] max-sm:right-8 max-sm:top-24"
        onClick={() => navigate("/voicebank")}
        aria-label="VOICEVOX 離途のページへ移動"
      >
        <LazyImage src="/001_top/離途バナー.webp" alt="" aria-hidden="true" />
      </Button>

      {/* ソーシャルリンク */}
      <div className="absolute bottom-32 right-12 z-10 max-sm:bottom-32 max-sm:right-8">
        <SocialLinksComponent size="large" />
      </div>

      {/* ニュースバー */}
      <div className="absolute bottom-0 left-0 right-0 flex w-full gap-8 overflow-hidden bg-[var(--glass-bg)] px-12 py-4 backdrop-blur-[10px] max-sm:gap-4 max-sm:px-8">
        <span className="animate-scroll">
          ××× 2025/06/06 VOICEVOX離途 がリリース！ ×××
        </span>
      </div>
    </Section>
  );
}
