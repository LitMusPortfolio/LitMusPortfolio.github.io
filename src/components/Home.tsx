import { useEffect, useRef } from "react";
import styled from "styled-components";

const HomeSection = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  opacity: 0.5;
`;

const HomeContent = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 10rem;
  z-index: 1;
  text-align: left;
  color: #fff;
  
  @media (max-width: 768px) {
    left: 2rem;
    bottom: 8rem;
  }
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(3rem, 8vw, 8rem);
  font-weight: 900;
  letter-spacing: 0.15em;
  margin: 0;
  line-height: 1;
`;

const SubTitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.7rem, 1.5vw, 1rem);
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-top: 0.5rem;
  opacity: 0.9;
`;

const TagLine = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  
  span {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.8;
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 10rem;
  display: flex;
  gap: 1.5rem;
  z-index: 10;
  
  @media (max-width: 768px) {
    right: 2rem;
    bottom: 10rem;
  }
  
  a {
    opacity: 0.8;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
  
  img {
    width: 24px;
    height: 24px;
  }
`;

const VoicevoxLogo = styled.div`
  position: absolute;
  right: 3rem;
  top: 6rem;
  
  @media (max-width: 768px) {
    right: 2rem;
    top: 5rem;
  }
  
  img {
    width: 120px;
    opacity: 0.9;
  }
  
  p {
    font-size: 0.7rem;
    opacity: 0.7;
    margin-top: 0.5rem;
    text-align: right;
  }
`;

const NewsBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  padding: 1rem 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    gap: 1rem;
  }
`;

const NewsText = styled.span`
  font-size: 0.9rem;
  opacity: 0.9;
  white-space: nowrap;
  animation: scroll 20s linear infinite;
  
  @keyframes scroll {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <HomeSection>
      <VideoBackground ref={videoRef} autoPlay loop muted playsInline>
        <source src="/001_top/LitMusHPTopMovie.webm" type="video/webm" />
        <source src="/001_top/LitMusHPTopMovie.mp4" type="video/mp4" />
      </VideoBackground>

      <HomeContent>
        <MainTitle>LITMUS</MainTitle>
        <SubTitle>#MUSIC #EVOCALOID #PRODUCE</SubTitle>
        <TagLine>
          <span>#ILLUSTRATION</span>
          <span>#DESIGN</span>
          <span>#3D</span>
          <span>#MOVIE</span>
          <span>#SYNTHETIC VOICE</span>
        </TagLine>
      </HomeContent>

      <VoicevoxLogo>
        <img src="/001_top/voicevox_banner.svg" alt="VOICEVOX" />
        <p>無料エデュケーションライセンス</p>
      </VoicevoxLogo>

      <SocialLinks>
        <a
          href="https://twitter.com/litmus9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/001_top/icon_X.svg" alt="X (Twitter)" />
        </a>
        <a
          href="https://www.youtube.com/@litmus9"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/001_top/icon_youtube.svg" alt="YouTube" />
        </a>
        <a
          href="https://www.nicovideo.jp/user/12345678"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/001_top/icon_niconico.svg" alt="niconico" />
        </a>
      </SocialLinks>

      <NewsBar>
        <NewsText>
          2025.06.09 新曲「VOICEVOX楽曲 001」を公開しました | 2025.05.30
          Webサイトをリニューアルしました
        </NewsText>
      </NewsBar>
    </HomeSection>
  );
}
