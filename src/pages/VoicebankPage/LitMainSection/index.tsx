import styled, { keyframes } from "styled-components";
import { Section } from "@/components/Layout";
import LazyImage from "@/components/LazyImage";
import { VideoBackground } from "@/components/VideoBackground";
import { theme } from "@/styles/theme";

// アニメーション定義
const floatAnimation = keyframes`
  0%, 100% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.9);
  }
`;

const gradientMoveAnimation = keyframes`
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(90deg) scale(1.1); }
  50% { transform: rotate(180deg) scale(1); }
  75% { transform: rotate(270deg) scale(1.1); }
`;

// メインセクション（離途紹介）
const MainSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  overflow: hidden;
  padding: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(92, 246, 246, 0.2) 0%, transparent 30%),
      radial-gradient(circle at 60% 80%, rgba(246, 92, 246, 0.2) 0%, transparent 40%);
    animation: ${gradientMoveAnimation} 20s ease-in-out infinite;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><filter id="noiseFilter"><feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="2" result="turbulence"/><feColorMatrix in="turbulence" type="saturate" values="0"/></filter></defs><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.05"/></svg>');
    z-index: 0;
  }
`;

// 統合コンテナ
const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 2rem;
    align-items: center;
  }
`;

// ロゴ画像
const Logo = styled(LazyImage)`
  max-height: 37vh;
  width: auto;
  margin-bottom: 2rem;
  
  img {
    height: 100%;
    width: auto;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 20vw;
    
    img {
      max-height: 20vw;
    }
  }
`;

// テキストコンテナ
const TextWrapper = styled.div`
  display: flex;
  margin-left: 11rem;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    align-items: center;
    max-width: 90%;
  }
`;

// キャラクター画像
const CharacterImage = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 95%; // ← ここを変更でサイズ調整
  width: auto;
  z-index: 1;
  pointer-events: none;
`;

// キャラクター画像スタイル
const StyledCharacterImage = styled(LazyImage)`
  height: 100%;
  width: auto;
  
  img {
    height: 100%;
    width: auto;
    object-fit: contain;
    filter: drop-shadow(${theme.shadows.glow.small});
  }
`;

// メインテキスト
const MainTagline = styled.div`
  margin-bottom: 1.5rem;
`;

// 説明テキスト
const DescriptionText = styled.div`
  color: rgba(255, 255, 255, 0.95);
  
  p {
    margin: 0 0 0.9rem 0;
    line-height: 1.5;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

// 背景付きテキスト
const HighlightedText = styled.h2`
  background: ${theme.colors.primary.main};
  display: inline;
  line-height: 1.6;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  white-space: nowrap;  
`;

// ダウンロードボタン
const DownloadButton = styled.button`
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  padding: 8rem 2rem;
  background: ${theme.colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 9999px;
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${floatAnimation} 3s ease-in-out infinite;
  transition: all 0.3s ease;
  box-shadow: 
    ${theme.shadows.button},
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 10;
  
  &:hover {
    animation: none;
    transform: scale(1.05) translateY(-2px);
    background: linear-gradient(135deg, #9d5ff6 0%, #8035F6 100%);
    box-shadow: 
      ${theme.shadows.buttonHover},
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    position: absolute;
    bottom: 2rem;
    right: 50%;
    transform: translateX(50%);
  }
`;

export default function LitMainSection() {
  const videoSources = [
    { src: "/101_Lit/LitTopMovie.mp4", type: "video/mp4" },
    { src: "/101_Lit/LitTopMovie.webm", type: "video/webm" },
  ];

  return (
    <MainSection id="main">
      <VideoBackground
        sources={videoSources}
        autoPlay
        loop
        muted
        playsInline
        opacity={0.5}
      />
      <ContentContainer>
        <Logo src="/101_Lit/Litlogo.webp" alt="離途" />
        <TextWrapper>
          <MainTagline>
            <HighlightedText>
              優しさと吐息が香る
              <br />
              穏やかな男声ソフトウェア。
            </HighlightedText>
          </MainTagline>
          <DescriptionText>
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
          </DescriptionText>
        </TextWrapper>
      </ContentContainer>
      <CharacterImage>
        <StyledCharacterImage
          src="/201_Lit立ち絵/LitA.webp"
          alt="離途 メインビジュアル"
        />
      </CharacterImage>
      <DownloadButton
        onClick={() => {
          const element = document.getElementById("downloads");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        FREE DL
      </DownloadButton>
    </MainSection>
  );
}
