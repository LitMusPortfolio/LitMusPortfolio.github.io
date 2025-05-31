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
  background: linear-gradient(135deg, #1a0a3e 0%, #2d1b69 50%, #3e2980 100%);
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 30% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%);
    z-index: 0;
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
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    max-width: 800px;
    height: 90vh;
    object-fit: contain;
    filter: drop-shadow(0 0 50px rgba(139, 92, 246, 0.5));
  }
  
  @media (max-width: 968px) {
    height: 60vh;
    
    img {
      height: 60vh;
      max-width: 500px;
    }
  }
`;

const Logo = styled.div`
  font-size: 6rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: #8b5cf6;
  text-shadow: 0 4px 20px rgba(139, 92, 246, 0.8);
  font-family: "Noto Serif JP", serif;
  letter-spacing: 0.2em;
  
  @media (max-width: 768px) {
    font-size: 4rem;
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
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 10px;
  padding: 2rem;
  margin: 2rem 0;
  backdrop-filter: blur(10px);
  
  p {
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FreeDownloadButton = styled.button`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  padding: 1.2rem 3rem;
  background: #8035F6;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  animation: ${float} 3s ease-in-out infinite;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(128, 53, 246, 0.4);
  
  &:hover {
    animation: none;
    transform: scale(1);
    background: #8035F6;
    color: #FF91E9;
    box-shadow: 0 10px 30px rgba(128, 53, 246, 0.6);
  }
  
  @media (max-width: 968px) {
    position: static;
    margin-top: 2rem;
  }
`;

export default function LitMainSection() {
  return (
    <MainSection>
      <MainContainer>
        <MainContent>
          <Logo>離途</Logo>
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

        <MainCharacterVisual>
          <img
            src="/101_Lit/LitA_差し替え前提.webp"
            alt="離途 メインビジュアル"
          />
          <FreeDownloadButton
            onClick={() => {
              window.location.href = "#downloads";
            }}
          >
            FREE DL
          </FreeDownloadButton>
        </MainCharacterVisual>
      </MainContainer>
    </MainSection>
  );
}
