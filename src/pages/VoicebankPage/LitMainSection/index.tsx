import { Section } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import { Button } from "@/components/ui/button";
import { VideoBackground } from "@/components/VideoBackground";

export default function LitMainSection() {
  const videoSources = [
    { src: "/101_Lit/LitTopMovie.mp4", type: "video/mp4" },
    { src: "/101_Lit/LitTopMovie.webm", type: "video/webm" },
  ];

  return (
    <Section
      id="main"
      className="lit-main-section relative flex items-center justify-start overflow-hidden bg-transparent p-0"
    >
      <VideoBackground
        sources={videoSources}
        autoPlay
        loop
        muted
        playsInline
        opacity={0.5}
      />

      {/* Content Container */}
      <div className="relative z-[2] flex h-screen w-full flex-col items-start justify-center max-sm:items-center max-sm:px-8">
        {/* Logo */}
        <LazyImage
          src="/101_Lit/Litlogo.webp"
          alt="離途"
          className="mb-8 max-h-[37vh] w-auto max-sm:max-h-[20vw] [&_img]:h-full [&_img]:w-auto [&_img]:max-sm:max-h-[20vw]"
        />

        {/* Text Wrapper */}
        <div className="ml-44 flex flex-col items-start max-sm:ml-0 max-sm:max-w-[90%] max-sm:items-center">
          {/* Main Tagline */}
          <div className="mb-6">
            <h2 className="inline whitespace-nowrap bg-primary leading-[1.6] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
              優しさと吐息が香る
              <br />
              穏やかな男声ソフトウェア。
            </h2>
          </div>

          {/* Description */}
          <div className="text-white/95 max-sm:text-base [&_p:last-child]:mb-0 [&_p]:mb-[0.9rem] [&_p]:leading-[1.5]">
            <p>「離途」は、LitMusによるオリジナルキャラクター。</p>
            <p>
              読み上げ合成音声「VOICEVOX」
              <br />
              歌唱合成音声「UTAU」にて
              <br />
              無料で使用することができます。
            </p>
            <p>
              また、合成音声の枠組みにとらわれず
              <br />
              バーチャルシンガーとして
              <br />
              ジャンルレスな活動を行っています。
            </p>
          </div>
        </div>
      </div>

      {/* Character Image */}
      <div className="pointer-events-none absolute bottom-0 right-0 z-[1] h-[95%] w-auto">
        <LazyImage
          src="/201_Lit立ち絵/LitA.webp"
          alt="離途 メインビジュアル"
          className="h-full w-auto [&_img]:h-full [&_img]:w-auto [&_img]:object-contain [&_img]:drop-shadow-[var(--shadow-glow-sm)]"
        />
      </div>

      {/* Download Button */}
      <Button
        variant="gradient"
        onClick={() => {
          const element = document.getElementById("downloads");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-16 right-16 z-10 animate-float rounded-full px-8 py-32 text-5xl font-bold uppercase tracking-[0.1em] text-white shadow-[var(--shadow-button),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 hover:animate-none hover:bg-[linear-gradient(135deg,#9d5ff6_0%,#8035F6_100%)] hover:shadow-[var(--shadow-button-hover),inset_0_1px_0_rgba(255,255,255,0.3)] max-sm:bottom-8 max-sm:right-1/2 max-sm:translate-x-1/2"
      >
        FREE DL
      </Button>
    </Section>
  );
}
