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
  background: linear-gradient(135deg, #4a1a8a 0%, #2a0a5a 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -20%;
    width: 80%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
    filter: blur(100px);
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
    max-width: 600px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 0 50px rgba(139, 92, 246, 0.5));
  }
  
  @media (max-width: 968px) {
    height: 50vh;
  }
`;

const Logo = styled.img`
  width: 400px;
  margin-bottom: 2rem;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
  
  @media (max-width: 768px) {
    width: 300px;
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

const Description = styled.div`
  margin-bottom: 3rem;
  
  p {
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
  }
`;

const InfoSection = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  margin: 3rem 0;
  backdrop-filter: blur(10px);
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #fff;
  }
  
  p {
    font-size: 0.9rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1rem;
  }
  
  .divider {
    width: 50%;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin: 2rem 0;
  }
  
  .small-text {
    font-size: 0.8rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.6);
  }
  
  a {
    color: #8b5cf6;
    text-decoration: underline;
    
    &:hover {
      color: #a78bfa;
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
          <Logo src="/101_Lit/Litlogo.webp" alt="離途" />
          <Tagline>優しさと吐息が香る穏やかな男声ソフトウェア。</Tagline>

          <InfoSection>
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

            <div className="divider" />

            <div className="small-text">
              <p>
                FREE DLの円をふわふわさせてほしいです
                <br />
                パラメイトのオマケページの
                <br />
                トラウマまでの円の拡大縮小もよろしょうだけるーく主張弱い感じて
                <br />
                光に80%を90%でらふわさせてほしい
                <br />
                マウスオーバーしたら100%になってほしい
                <br />
                背景色に丸文字から、マウスオーバーしたら色変更
                <br />円 #8035F6 文字 #FF91E9
                <br />
                このボタンはキャラクターページも加調の形を変えて再利用お願いします
              </p>
              <p>
                <a
                  href="https://paradoxlive.jp/character/bae/allen.php?c=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://paradoxlive.jp/character/bae/allen.php?c=1
                </a>
              </p>
            </div>
          </InfoSection>

          <Description>
            <p>
              優しさと吐息が香る
              <br />
              穏やかな男声ソフトウェア。
            </p>
          </Description>
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
