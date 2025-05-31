import { useEffect, useRef } from "react";
import styled from "styled-components";

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
`;

const MainTitle = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(3rem, 10vw, 10rem);
  font-weight: 900;
  letter-spacing: 0.15em;
  margin: 0;
  text-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
  animation: glow 2s ease-in-out infinite alternate;
  line-height: 1;
  
  @keyframes glow {
    from {
      text-shadow: 0 0 30px rgba(0, 191, 255, 0.5);
    }
    to {
      text-shadow: 0 0 50px rgba(0, 191, 255, 0.8), 0 0 70px rgba(0, 191, 255, 0.6);
    }
  }
`;

const SubTitle = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.8rem, 2vw, 1.2rem);
  font-weight: 900;
  letter-spacing: 0.3em;
  margin-top: 1rem;
  opacity: 0.8;
`;

const TagLine = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  
  span {
    font-family: 'Montserrat Black', sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.7;
  }
`;

const CharacterImage = styled.img`
  position: absolute;
  right: 5%;
  bottom: 0;
  height: 70vh;
  object-fit: contain;
  animation: float 6s ease-in-out infinite;
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  
  a {
    opacity: 0.7;
    transition: opacity 0.3s ease;
    
    &:hover {
      opacity: 1;
    }
  }
  
  img {
    width: 30px;
    height: 30px;
  }
`;

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <HeroSection>
      <VideoBackground ref={videoRef} autoPlay loop muted playsInline>
        <source src="/001_top/LitMusHPTopMovie.webm" type="video/webm" />
        <source src="/001_top/LitMusHPTopMovie.mp4" type="video/mp4" />
      </VideoBackground>

      <HeroContent>
        <MainTitle>LITMUS</MainTitle>
        <SubTitle>#MUSIC #EVOCALOID #PRODUCE</SubTitle>
        <TagLine>
          <span>#ILLUSTRATION</span>
          <span>#DESIGN</span>
          <span>#3D</span>
          <span>#MOVIE</span>
          <span>#SYNTHETIC VOICE</span>
        </TagLine>
      </HeroContent>

      <CharacterImage
        src="/101_Lit/LitA_差し替え前提.webp"
        alt="Lit Character"
      />

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
    </HeroSection>
  );
}
