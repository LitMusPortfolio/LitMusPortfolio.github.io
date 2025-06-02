import styled from "styled-components";
import LazyImage from "../../../components/LazyImage";
import LazyVideo from "../../../components/LazyVideo";
import { SocialLinks as SocialLinksComponent } from "../../../components/SocialLinks";
import TextWithBackground from "../../../components/TextWithBackground";

const HomeSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const HomeContent = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.space.xl};
  bottom: 10rem;
  z-index: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: ${({ theme }) => theme.space.lg};
    bottom: 8rem;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(${({ theme }) => theme.typography.fontSize['3xl']}, 8vw, 8rem);
  font-weight: 900;
  letter-spacing: 0.15em;
  margin: 0;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
  margin-top: 2.5rem;
`;

const TagLine = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.space.sm};
  flex-wrap: wrap;
  font-family: 'Montserrat', sans-serif;
`;

const SocialLinksWrapper = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.space.xl};
  bottom: 10rem;
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.space.lg};
    bottom: 10rem;
  }
`;

const VoicevoxBanner = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.space.xl};
  top: ${({ theme }) => theme.space['3xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.space.lg};
    top: 5rem;
  }
  
  opacity: ${({ theme }) => theme.opacity[90]};
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    opacity: ${({ theme }) => theme.opacity[70]};
    margin-top: ${({ theme }) => theme.space.xs};
    text-align: right;
  }
`;

const NewsBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => `rgba(0, 0, 0, ${theme.opacity[80]})`};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xl};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
    gap: ${({ theme }) => theme.space.sm};
  }
`;

const NewsText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  opacity: ${({ theme }) => theme.opacity[90]};
  white-space: nowrap;
  animation: scroll ${({ theme }) => theme.animation.duration.scrolling} linear infinite;
  
  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const VideoBackground = styled(LazyVideo)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Home() {
  const videoSources = [
    { src: "/001_top/LitMusHPTopMovie.mp4", type: "video/mp4" },
    { src: "/001_top/LitMusHPTopMovie.webm", type: "video/webm" },
  ];

  const socialLinks = [
    {
      platform: "X (Twitter)",
      url: "https://twitter.com/litmus9",
      icon: "/001_top/icon_X.svg",
    },
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@litmus9",
      icon: "/001_top/icon_youtube.svg",
    },
    {
      platform: "niconico",
      url: "https://www.nicovideo.jp/user/12345678",
      icon: "/001_top/icon_niconico.svg",
    },
  ];

  return (
    <HomeSection>
      <VideoBackground sources={videoSources} autoPlay loop muted playsInline />

      <HomeContent>
        <MainTitle>
          <TextWithBackground>LITMUS</TextWithBackground>
        </MainTitle>
        <TagsWrapper>
          <TagLine>
            <TextWithBackground>#MUSIC</TextWithBackground>
            <TextWithBackground>#VOCALOID</TextWithBackground>
            <TextWithBackground>#PRODUCE</TextWithBackground>
          </TagLine>
          <TagLine>
            <TextWithBackground>#ILLUSTRATION</TextWithBackground>
            <TextWithBackground>#DESIGN</TextWithBackground>
          </TagLine>
          <TagLine>
            <TextWithBackground>#3D</TextWithBackground>
            <TextWithBackground>#MOVIE</TextWithBackground>
            <TextWithBackground>#SYNTHETIC VOICE</TextWithBackground>
          </TagLine>
        </TagsWrapper>
      </HomeContent>

      <VoicevoxBanner>
        <LazyImage src="/001_top/離途バナー_差し替え予定.webp" alt="VOICEVOX" />
      </VoicevoxBanner>

      <SocialLinksWrapper>
        <SocialLinksComponent links={socialLinks} size="small" />
      </SocialLinksWrapper>

      <NewsBar>
        <NewsText>
          2025.06.09 新曲「VOICEVOX楽曲 001」を公開しました | 2025.05.30
          Webサイトをリニューアルしました
        </NewsText>
      </NewsBar>
    </HomeSection>
  );
}
