import styled, { keyframes } from "styled-components";
import { theme } from "../styles/theme";

// アニメーション定義
const float = keyframes`
  0%, 100% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(0.9);
  }
`;

// メインセクション（離途紹介）
const MainSection = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background: transparent;
  overflow: hidden;
  
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
    animation: gradientMove 20s ease-in-out infinite;
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
  
  @keyframes gradientMove {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(90deg) scale(1.1); }
    50% { transform: rotate(180deg) scale(1); }
    75% { transform: rotate(270deg) scale(1.1); }
  }
`;

const Container = styled.div`
  width: fit-content;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  
  @media (max-width: 968px) {
    width: 100%;
    margin-left: 0;
    align-items: center;
  }
`;

const LogoImg = styled.img`
  height: 25vw;
  width: auto;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.9))
          drop-shadow(${theme.shadows.glow.large});
  
  @media (max-width: 768px) {
    height: 220px;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 7rem;
  
  @media (max-width: 968px) {
    align-items: center;
  }
`;

const MainCharacterVisual = styled.div`
  position: absolute;
  bottom: 0;
  right: -5%;
  height: 100vh;
  width: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  z-index: 1;
  
  img {
    width: auto;
    height: 90vh;
    max-height: none;
    object-fit: unset;
    filter: drop-shadow(${theme.shadows.glow.small});
  }
  
  @media (max-width: 968px) {
    position: relative;
    right: 0;
    width: 100%;
    height: 70vh;
    justify-content: center;
    
    img {
      height: 100%;
      max-width: 100%;
      transform: none;
    }
  }
`;

const Text = styled.p`
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 3rem;
  line-height: 1.0;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-shadow: ${theme.shadows.text};
  width: fit-content;
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const TaglineSpan = styled.span`
  background: ${theme.colors.primary.main};
  border-radius: 2px;
  font-size: 3rem;
  font-weight: bold;
  display: inline;
  line-height: 1.3;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
  
  br {
    line-height: 0.8;
  }
`;

const FreeDownloadButton = styled.button`
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  padding: 1.5rem 4rem;
  background: ${theme.colors.primary.gradient};
  color: #fff;
  border: none;
  border-radius: 60px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${float} 3s ease-in-out infinite;
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
  
  @media (max-width: 968px) {
    position: absolute;
    bottom: 2rem;
    right: 50%;
    transform: translateX(50%);
  }
`;

// 背景動画コンポーネント
const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: -1;
  object-fit: cover;
`;

export default function LitMainSection() {
  return (
    <MainSection>
      <BackgroundVideo autoPlay muted loop playsInline>
        <source src="/101_Lit/LitTopMovie.webm" type="video/webm" />
        <source src="/101_Lit/LitTopMovie.mp4" type="video/mp4" />
      </BackgroundVideo>
      <Container>
        <LogoImg src="/101_Lit/Litlogo.webp" alt="離途" />
        <TextContainer>
          <Text>
            <TaglineSpan>
              優しさと吐息が香る
              <br />
              穏やかな男声ソフトウェア。
            </TaglineSpan>
          </Text>
        </TextContainer>
      </Container>
      <MainCharacterVisual>
        <img
          src="/101_Lit/LitA_差し替え前提.webp"
          alt="離途 メインビジュアル"
        />
      </MainCharacterVisual>
      <FreeDownloadButton
        onClick={() => {
          window.location.href = "#downloads";
        }}
      >
        FREE DL
      </FreeDownloadButton>
    </MainSection>
  );
}
