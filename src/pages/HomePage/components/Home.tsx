import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Section } from "../../../components/Layout";
import LazyImage from "../../../components/LazyImage";
import LazyVideo from "../../../components/LazyVideo";
import { SocialLinks as SocialLinksComponent } from "../../../components/SocialLinks";
import TextWithBackground from "../../../components/TextWithBackground";

const HomeSection = styled(Section)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 0;
  min-height: 100vh;
`;

const HomeContent = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.space.xl};
  bottom: ${({ theme }) => theme.space["4xl"]};
  z-index: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.text.primary};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    left: ${({ theme }) => theme.space.lg};
    bottom: ${({ theme }) => theme.space["4xl"]};
  }
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(${({ theme }) => theme.typography.fontSize["3xl"]}, 8vw, 8rem);
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
  margin-top: ${({ theme }) => theme.space["2xl"]};
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
  bottom: ${({ theme }) => theme.space["4xl"]};
  z-index: 10;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.space.lg};
    bottom: ${({ theme }) => theme.space["4xl"]};
  }
`;

const VoicevoxBanner = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.space.xl};
  top: ${({ theme }) => theme.space["3xl"]};
  backdrop-filter: ${({ theme }) => theme.effects.glassmorphism.backdropFilter};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.glassmorphism.backdropFilter};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.space.lg};
    top: ${({ theme }) => theme.space["3xl"]};
  }
`;

const NewsBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: ${({ theme }) => theme.effects.glassmorphism.background};
  backdrop-filter: ${({ theme }) => theme.effects.glassmorphism.backdropFilter};
  -webkit-backdrop-filter: ${({ theme }) => theme.effects.glassmorphism.backdropFilter};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.xl};
  display: flex;
  gap: ${({ theme }) => theme.space.lg};
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.lg};
    gap: ${({ theme }) => theme.space.sm};
  }
`;

const NewsText = styled.span`
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
  const navigate = useNavigate();

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
            <TextWithBackground>#VOCALOIDPRODUCE</TextWithBackground>
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

      <VoicevoxBanner
        onClick={() => {
          navigate("/voicebank#downloads");
        }}
      >
        <LazyImage src="/001_top/離途バナー_差し替え予定.webp" alt="VOICEVOX" />
      </VoicevoxBanner>

      <SocialLinksWrapper>
        <SocialLinksComponent size="large" />
      </SocialLinksWrapper>

      <NewsBar>
        <NewsText>××× 2025/06/06 VOICEVOX離途 がリリース！ ×××</NewsText>
      </NewsBar>
    </HomeSection>
  );
}
