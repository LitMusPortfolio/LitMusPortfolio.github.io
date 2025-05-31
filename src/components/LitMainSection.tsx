import styled, { keyframes } from "styled-components";

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
  position: relative;
  background: linear-gradient(135deg, rgba(10, 22, 40, 0.8) 0%, rgba(26, 44, 78, 0.7) 30%, rgba(42, 74, 124, 0.6) 60%, rgba(58, 95, 149, 0.5) 100%);
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

const MainContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const MainContent = styled.div`
  text-align: left;
  
  @media (max-width: 968px) {
    text-align: center;
  }
`;

const MainCharacterVisual = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  
  img {
    width: auto;
    height: 95vh;
    max-height: 95vh;
    object-fit: contain;
    object-position: bottom right;
    filter: drop-shadow(0 0 50px rgba(139, 92, 246, 0.5));
  }
  
  @media (max-width: 968px) {
    position: relative;
    width: 100%;
    height: 70vh;
    justify-content: center;
    
    img {
      height: 100%;
      max-width: 100%;
    }
  }
`;

const Logo = styled.img`
  height: 180px;
  width: auto;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))
          drop-shadow(0 0 40px rgba(139, 92, 246, 0.6));
  
  @media (max-width: 768px) {
    height: 120px;
  }
`;

const Tagline = styled.p`
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 3rem;
  line-height: 1.6;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

// 下部のディスクリプションは削除（完成イメージにないため）

const InfoBox = styled.div`
  background: rgba(0, 20, 40, 0.4);
  border: 1px solid rgba(92, 246, 246, 0.3);
  border-radius: 15px;
  padding: 2.5rem;
  margin: 2rem 0;
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.95);
    margin-bottom: 1.2rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FreeDownloadButton = styled.button`
  position: absolute;
  bottom: 4rem;
  right: 4rem;
  padding: 1.5rem 4rem;
  background: linear-gradient(135deg, #8035F6 0%, #9d5ff6 100%);
  color: #fff;
  border: none;
  border-radius: 60px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${float} 3s ease-in-out infinite;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 30px rgba(128, 53, 246, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 10;
  
  &:hover {
    animation: none;
    transform: scale(1.05) translateY(-2px);
    background: linear-gradient(135deg, #9d5ff6 0%, #8035F6 100%);
    box-shadow: 
      0 15px 40px rgba(128, 53, 246, 0.7),
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
      <MainContainer>
        <MainContent>
          <Logo src="/101_Lit/Litlogo.webp" alt="離途" />
          <Tagline>優しさと吐息が香る穏やかな男声ソフトウェア。</Tagline>

          <InfoBox>
            <p>「離途」は、LitMusによるオリジナルキャラクター。</p>
            <p>
              読み上げ合成音声「VOICEVOX」
              <br />
              歌唱合成音声「UTAU」にて
              <br />
              無料で使用することができます。
            </p>
            <p>
              また、合成音声の権利にとらわれず
              <br />
              パーソナルシンガーとして
              <br />
              シャンルレスな活動を行っています。
            </p>
          </InfoBox>
        </MainContent>
      </MainContainer>
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
